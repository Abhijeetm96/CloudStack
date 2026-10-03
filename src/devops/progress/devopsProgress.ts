import { DevOpsProgressState } from '../types/devopsCurriculumTypes';

const STORAGE_KEY = 'cloudstack_devops_progress_v1';

const DEFAULT_STATE: DevOpsProgressState = {
  completedLessonIds: [],
  activeLessonId: 'devops-01-01',
  activeChapterNumber: 1,
  lastVisitedTimestamp: Date.now(),
};

export class DevOpsProgressStore {
  private static instance: DevOpsProgressStore;
  private state: DevOpsProgressState;

  private constructor() {
    this.state = this.loadState();
  }

  public static getInstance(): DevOpsProgressStore {
    if (!DevOpsProgressStore.instance) {
      DevOpsProgressStore.instance = new DevOpsProgressStore();
    }
    return DevOpsProgressStore.instance;
  }

  private loadState(): DevOpsProgressState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : [],
          activeLessonId: typeof parsed.activeLessonId === 'string' ? parsed.activeLessonId : 'devops-01-01',
          activeChapterNumber: typeof parsed.activeChapterNumber === 'number' ? parsed.activeChapterNumber : 1,
          lastVisitedTimestamp: parsed.lastVisitedTimestamp || Date.now(),
        };
      }
    } catch {
      // Fallback
    }
    return { ...DEFAULT_STATE };
  }

  private saveState(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // Storage unavailable
    }
  }

  public getState(): DevOpsProgressState {
    return { ...this.state };
  }

  public isLessonCompleted(lessonId: string): boolean {
    return this.state.completedLessonIds.includes(lessonId);
  }

  public toggleLessonCompleted(lessonId: string): boolean {
    const idx = this.state.completedLessonIds.indexOf(lessonId);
    let isCompleted = false;
    if (idx >= 0) {
      this.state.completedLessonIds.splice(idx, 1);
      isCompleted = false;
    } else {
      this.state.completedLessonIds.push(lessonId);
      isCompleted = true;
    }
    this.saveState();
    return isCompleted;
  }

  public setLessonCompleted(lessonId: string, completed: boolean): void {
    const exists = this.state.completedLessonIds.includes(lessonId);
    if (completed && !exists) {
      this.state.completedLessonIds.push(lessonId);
    } else if (!completed && exists) {
      this.state.completedLessonIds = this.state.completedLessonIds.filter(id => id !== lessonId);
    }
    this.saveState();
  }

  public setActiveLesson(lessonId: string, chapterNumber: number): void {
    this.state.activeLessonId = lessonId;
    this.state.activeChapterNumber = chapterNumber;
    this.state.lastVisitedTimestamp = Date.now();
    this.saveState();
  }

  public getCompletionPercentage(totalLessons: number): number {
    if (totalLessons <= 0) return 0;
    const completed = this.state.completedLessonIds.length;
    return Math.min(100, Math.round((completed / totalLessons) * 100));
  }

  public reset(): void {
    this.state = {
      completedLessonIds: [],
      activeLessonId: 'devops-01-01',
      activeChapterNumber: 1,
      lastVisitedTimestamp: Date.now(),
    };
    this.saveState();
  }
}
