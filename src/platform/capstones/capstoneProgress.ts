import { CapstoneProgress } from './types';

const STORAGE_KEY = 'cloudstack_capstone_progress';

function isLocalStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function getAllCapstoneProgress(): Record<string, CapstoneProgress> {
  if (!isLocalStorageAvailable()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse capstone progress from localStorage:', e);
    return {};
  }
}

export function getCapstoneProgress(projectId: string): CapstoneProgress {
  const all = getAllCapstoneProgress();
  return (
    all[projectId] || {
      projectId,
      completed: false,
      score: 0,
      completedTasks: [],
      resolvedFailures: [],
      lastVisitedTimestamp: Date.now(),
    }
  );
}

export function saveCapstoneProgress(progress: CapstoneProgress): void {
  if (!isLocalStorageAvailable()) return;
  try {
    const all = getAllCapstoneProgress();
    all[progress.projectId] = {
      ...progress,
      lastVisitedTimestamp: Date.now(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (e) {
    console.warn('Failed to save capstone progress to localStorage:', e);
  }
}

export function markTaskComplete(projectId: string, taskId: string): CapstoneProgress {
  const current = getCapstoneProgress(projectId);
  if (!current.completedTasks.includes(taskId)) {
    current.completedTasks.push(taskId);
  }
  saveCapstoneProgress(current);
  return current;
}

export function markTaskIncomplete(projectId: string, taskId: string): CapstoneProgress {
  const current = getCapstoneProgress(projectId);
  current.completedTasks = current.completedTasks.filter((id) => id !== taskId);
  saveCapstoneProgress(current);
  return current;
}

export function markFailureResolved(projectId: string, failureId: string): CapstoneProgress {
  const current = getCapstoneProgress(projectId);
  if (!current.resolvedFailures.includes(failureId)) {
    current.resolvedFailures.push(failureId);
  }
  saveCapstoneProgress(current);
  return current;
}

export function submitCapstone(
  projectId: string,
  score: number,
  allTaskIds: string[]
): CapstoneProgress {
  const current = getCapstoneProgress(projectId);
  current.completed = true;
  current.score = score;
  current.completedTasks = Array.from(new Set([...current.completedTasks, ...allTaskIds]));
  saveCapstoneProgress(current);
  return current;
}

export function resetCapstoneProgress(projectId: string): CapstoneProgress {
  const reset: CapstoneProgress = {
    projectId,
    completed: false,
    score: 0,
    completedTasks: [],
    resolvedFailures: [],
    lastVisitedTimestamp: Date.now(),
  };
  saveCapstoneProgress(reset);
  return reset;
}

export function getCapstoneCompletionStats(totalProjectIds: string[]): {
  total: number;
  completed: number;
  percentage: number;
  totalScore: number;
} {
  const all = getAllCapstoneProgress();
  let completed = 0;
  let totalScore = 0;

  totalProjectIds.forEach((id) => {
    if (all[id]?.completed) {
      completed++;
      totalScore += all[id].score || 0;
    }
  });

  const percentage = totalProjectIds.length > 0 ? Math.round((completed / totalProjectIds.length) * 100) : 0;

  return {
    total: totalProjectIds.length,
    completed,
    percentage,
    totalScore,
  };
}
