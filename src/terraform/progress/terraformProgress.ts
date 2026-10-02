import { TerraformProgressState } from '../types/terraformTypes';

const STORAGE_KEY = 'cloudstack_terraform_progress_v1';

const DEFAULT_STATE: TerraformProgressState = {
  completedLessons: [],
  completedExercises: [],
  challengeScores: {},
  simulatorInteractions: 0,
  lastVisitedLessonId: null,
  quizScores: {}
};

export function loadTerraformProgress(): TerraformProgressState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      completedExercises: Array.isArray(parsed.completedExercises) ? parsed.completedExercises : [],
      challengeScores: typeof parsed.challengeScores === 'object' && parsed.challengeScores !== null ? parsed.challengeScores : {},
      simulatorInteractions: typeof parsed.simulatorInteractions === 'number' ? parsed.simulatorInteractions : 0,
      lastVisitedLessonId: parsed.lastVisitedLessonId || null,
      quizScores: typeof parsed.quizScores === 'object' && parsed.quizScores !== null ? parsed.quizScores : {}
    };
  } catch (err) {
    console.warn('Failed to load Terraform progress, using defaults', err);
    return DEFAULT_STATE;
  }
}

export function saveTerraformProgress(state: TerraformProgressState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Failed to save Terraform progress', err);
  }
}

export function markLessonCompleted(lessonId: string): TerraformProgressState {
  const current = loadTerraformProgress();
  if (!current.completedLessons.includes(lessonId)) {
    const next = {
      ...current,
      completedLessons: [...current.completedLessons, lessonId],
      lastVisitedLessonId: lessonId
    };
    saveTerraformProgress(next);
    return next;
  }
  return current;
}

export function markExerciseCompleted(lessonId: string): TerraformProgressState {
  const current = loadTerraformProgress();
  if (!current.completedExercises.includes(lessonId)) {
    const next = {
      ...current,
      completedExercises: [...current.completedExercises, lessonId]
    };
    saveTerraformProgress(next);
    return next;
  }
  return current;
}

export function recordQuizScore(lessonId: string, score: number): TerraformProgressState {
  const current = loadTerraformProgress();
  const next = {
    ...current,
    quizScores: {
      ...current.quizScores,
      [lessonId]: Math.max(current.quizScores[lessonId] || 0, score)
    }
  };
  saveTerraformProgress(next);
  return next;
}

export function recordChallengeScore(lessonId: string, score: number): TerraformProgressState {
  const current = loadTerraformProgress();
  const next = {
    ...current,
    challengeScores: {
      ...current.challengeScores,
      [lessonId]: Math.max(current.challengeScores[lessonId] || 0, score)
    }
  };
  saveTerraformProgress(next);
  return next;
}

export function incrementSimulatorInteraction(): TerraformProgressState {
  const current = loadTerraformProgress();
  const next = {
    ...current,
    simulatorInteractions: current.simulatorInteractions + 1
  };
  saveTerraformProgress(next);
  return next;
}

export function setLastVisitedLesson(lessonId: string): void {
  const current = loadTerraformProgress();
  saveTerraformProgress({
    ...current,
    lastVisitedLessonId: lessonId
  });
}

export function resetTerraformProgress(): TerraformProgressState {
  saveTerraformProgress(DEFAULT_STATE);
  return DEFAULT_STATE;
}
