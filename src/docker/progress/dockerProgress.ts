// src/docker/progress/dockerProgress.ts
export interface DockForgeProgressV1 {
  version: 1;
  completedLessons: string[];
  completedChapters: number[];
  completedExercises: string[];
  challengeResults: Record<string, { passed: boolean; score: number; completedAt: string }>;
  quizResults: Record<string, { passed: boolean; selectedIndex: number; timestamp: string }>;
  simulatorProgress: Record<string, { completedSteps: number[]; lastState: string }>;
  lastVisitedLesson: string;
  lessonNotes: Record<string, string>;
  lessonAttempts: Record<string, number>;
  updatedAt: string;
}

const STORAGE_KEY = 'dockforge_progress_v1';
const LEGACY_STORAGE_KEY = 'dockforge:progress';

export class DockForgeProgressStore {
  private static instance: DockForgeProgressStore;

  private state: DockForgeProgressV1 = {
    version: 1,
    completedLessons: [],
    completedChapters: [],
    completedExercises: [],
    challengeResults: {},
    quizResults: {},
    simulatorProgress: {},
    lastVisitedLesson: 'dk01-01-what-is-a-container',
    lessonNotes: {},
    lessonAttempts: {},
    updatedAt: new Date().toISOString(),
  };

  private listeners: Array<(state: DockForgeProgressV1) => void> = [];

  private constructor() {
    this.load();
  }

  public static getInstance(): DockForgeProgressStore {
    if (!DockForgeProgressStore.instance) {
      DockForgeProgressStore.instance = new DockForgeProgressStore();
    }
    return DockForgeProgressStore.instance;
  }

  public getState(): DockForgeProgressV1 {
    return { ...this.state };
  }

  public load(): DockForgeProgressV1 {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.version === 1) {
          this.state = {
            ...this.state,
            ...parsed,
          };
          return this.state;
        }
      }

      // Check legacy migration
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        const legacyParsed = JSON.parse(legacyRaw);
        if (Array.isArray(legacyParsed)) {
          this.state.completedLessons = legacyParsed;
          this.save();
        }
      }
    } catch (e) {
      console.warn('[DockForgeProgress] Failed to read progress from storage, resetting to default.', e);
    }
    return this.state;
  }

  public save(): void {
    try {
      this.state.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      this.notify();
    } catch (e) {
      console.warn('[DockForgeProgress] Failed to write progress to storage.', e);
    }
  }

  public markLessonComplete(lessonId: string): void {
    if (!this.state.completedLessons.includes(lessonId)) {
      this.state.completedLessons = [...this.state.completedLessons, lessonId];
      this.save();
    }
  }

  public isLessonCompleted(lessonId: string): boolean {
    return this.state.completedLessons.includes(lessonId);
  }

  public saveChallengeResult(lessonId: string, passed: boolean, score: number = 100): void {
    this.recordChallenge(lessonId, passed, score);
  }

  public reset(): void {
    this.state = {
      version: 1,
      completedLessons: [],
      completedChapters: [],
      completedExercises: [],
      challengeResults: {},
      quizResults: {},
      simulatorProgress: {},
      lastVisitedLesson: 'dk01-01-what-is-a-container',
      lessonNotes: {},
      lessonAttempts: {},
      updatedAt: new Date().toISOString(),
    };
    this.save();
  }

  public toggleLessonComplete(lessonId: string): boolean {
    const exists = this.state.completedLessons.includes(lessonId);
    if (exists) {
      this.state.completedLessons = this.state.completedLessons.filter((id) => id !== lessonId);
    } else {
      this.state.completedLessons = [...this.state.completedLessons, lessonId];
    }
    this.save();
    return !exists;
  }

  public recordChallenge(lessonId: string, passed: boolean, score: number = 100): void {
    this.state.challengeResults = {
      ...this.state.challengeResults,
      [lessonId]: {
        passed,
        score,
        completedAt: new Date().toISOString(),
      },
    };
    if (passed) {
      this.markLessonComplete(lessonId);
    } else {
      this.recordAttempt(lessonId);
      this.save();
    }
  }

  public recordQuiz(lessonId: string, passed: boolean, selectedIndex: number): void {
    this.state.quizResults = {
      ...this.state.quizResults,
      [lessonId]: {
        passed,
        selectedIndex,
        timestamp: new Date().toISOString(),
      },
    };
    if (passed) {
      this.markLessonComplete(lessonId);
    }
    this.save();
  }

  public recordExercise(lessonId: string): void {
    if (!this.state.completedExercises.includes(lessonId)) {
      this.state.completedExercises = [...this.state.completedExercises, lessonId];
      this.save();
    }
  }

  public markChapterComplete(chapterNumber: number): void {
    if (!this.state.completedChapters.includes(chapterNumber)) {
      this.state.completedChapters = [...this.state.completedChapters, chapterNumber];
      this.save();
    }
  }

  public getOverallProgress(totalLessons: number = 1038): { completedLessons: number; totalLessons: number; percent: number } {
    const completed = this.state.completedLessons.length;
    const percent = Math.min(100, Math.round((completed / totalLessons) * 100));
    return { completedLessons: completed, totalLessons, percent };
  }

  public recordAttempt(lessonId: string): void {
    const current = this.state.lessonAttempts[lessonId] || 0;
    this.state.lessonAttempts = {
      ...this.state.lessonAttempts,
      [lessonId]: current + 1,
    };
    this.save();
  }

  public recordSimulatorStep(lessonId: string, stepIndex: number, lastState: string = 'running'): void {
    const existing = this.state.simulatorProgress[lessonId] || { completedSteps: [], lastState: 'initial' };
    const steps = Array.from(new Set([...existing.completedSteps, stepIndex]));
    this.state.simulatorProgress = {
      ...this.state.simulatorProgress,
      [lessonId]: {
        completedSteps: steps,
        lastState,
      },
    };
    this.save();
  }

  public setLastVisitedLesson(lessonId: string): void {
    this.state.lastVisitedLesson = lessonId;
    this.save();
  }

  public saveNote(lessonId: string, note: string): void {
    this.state.lessonNotes = {
      ...this.state.lessonNotes,
      [lessonId]: note,
    };
    this.save();
  }

  public subscribe(listener: (state: DockForgeProgressV1) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error('[DockForgeProgress] Listener error:', err);
      }
    }
  }
}
