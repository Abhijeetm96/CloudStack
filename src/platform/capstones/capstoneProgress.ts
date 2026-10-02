import { CapstoneBriefProgress, CapstoneBriefStatus, CapstoneProgress } from './types';

const STORAGE_KEY = 'cloudstack_capstone_brief_progress_v2';
const LEGACY_STORAGE_KEY = 'cloudstack_capstone_progress';

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

export function getAllCapstoneBriefProgress(): Record<string, CapstoneBriefProgress> {
  if (!isLocalStorageAvailable()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse capstone brief progress from localStorage:', e);
    return {};
  }
}

export function getCapstoneBriefProgress(projectId: string): CapstoneBriefProgress {
  const all = getAllCapstoneBriefProgress();
  if (all[projectId]) {
    return all[projectId];
  }

  // Fallback to legacy progress if available
  if (isLocalStorageAvailable()) {
    try {
      const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        const legacyAll = JSON.parse(legacyRaw);
        if (legacyAll[projectId]) {
          const leg = legacyAll[projectId];
          return {
            projectId,
            status: leg.completed ? 'completed' : 'in_progress',
            checkedChecklistIndices: [],
            lastVisitedTimestamp: leg.lastVisitedTimestamp || Date.now(),
          };
        }
      }
    } catch {}
  }

  return {
    projectId,
    status: 'not_started',
    checkedChecklistIndices: [],
    lastVisitedTimestamp: Date.now(),
  };
}

export function saveCapstoneBriefProgress(progress: CapstoneBriefProgress): void {
  if (!isLocalStorageAvailable()) return;
  try {
    const all = getAllCapstoneBriefProgress();
    all[progress.projectId] = {
      ...progress,
      lastVisitedTimestamp: Date.now(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (e) {
    console.warn('Failed to save capstone brief progress to localStorage:', e);
  }
}

export function setCapstoneStatus(
  projectId: string,
  status: CapstoneBriefStatus
): CapstoneBriefProgress {
  const current = getCapstoneBriefProgress(projectId);
  const now = Date.now();
  current.status = status;
  if (status === 'in_progress' && !current.startedAt) {
    current.startedAt = now;
  }
  if (status === 'completed') {
    current.completedAt = now;
  }
  if (status === 'not_started') {
    current.startedAt = undefined;
    current.completedAt = undefined;
    current.checkedChecklistIndices = [];
  }
  saveCapstoneBriefProgress(current);
  return current;
}

export function toggleChecklistItem(
  projectId: string,
  itemIndex: number
): CapstoneBriefProgress {
  const current = getCapstoneBriefProgress(projectId);
  const exists = current.checkedChecklistIndices.includes(itemIndex);
  if (exists) {
    current.checkedChecklistIndices = current.checkedChecklistIndices.filter(
      (idx) => idx !== itemIndex
    );
  } else {
    current.checkedChecklistIndices = [...current.checkedChecklistIndices, itemIndex].sort(
      (a, b) => a - b
    );
    if (current.status === 'not_started') {
      current.status = 'in_progress';
      current.startedAt = Date.now();
    }
  }
  saveCapstoneBriefProgress(current);
  return current;
}

export function resetCapstoneBriefProgress(projectId: string): CapstoneBriefProgress {
  const reset: CapstoneBriefProgress = {
    projectId,
    status: 'not_started',
    checkedChecklistIndices: [],
    lastVisitedTimestamp: Date.now(),
  };
  saveCapstoneBriefProgress(reset);
  return reset;
}

// =========================================================================
// Legacy Support Helpers (for seamless backward compatibility)
// =========================================================================
export function getAllCapstoneProgress(): Record<string, CapstoneProgress> {
  const briefAll = getAllCapstoneBriefProgress();
  const legacyMap: Record<string, CapstoneProgress> = {};
  Object.keys(briefAll).forEach((pId) => {
    const brief = briefAll[pId];
    legacyMap[pId] = {
      projectId: pId,
      completed: brief.status === 'completed',
      score: brief.status === 'completed' ? 100 : 0,
      completedTasks: [],
      resolvedFailures: [],
      lastVisitedTimestamp: brief.lastVisitedTimestamp,
    };
  });
  return legacyMap;
}

export function getCapstoneCompletionStats(projectIds: string[]): {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  percentage: number;
  totalScore: number;
} {
  const briefAll = getAllCapstoneBriefProgress();
  const total = projectIds.length;
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;

  projectIds.forEach((id) => {
    const p = briefAll[id];
    if (!p || p.status === 'not_started') {
      notStarted++;
    } else if (p.status === 'completed') {
      completed++;
    } else if (p.status === 'in_progress') {
      inProgress++;
    }
  });

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const totalScore = completed * 100;

  return {
    total,
    completed,
    inProgress,
    notStarted,
    percentage,
    totalScore,
  };
}

export function getCapstoneProgress(projectId: string): CapstoneProgress {
  const brief = getCapstoneBriefProgress(projectId);
  return {
    projectId,
    completed: brief.status === 'completed',
    score: brief.status === 'completed' ? 100 : 0,
    completedTasks: [],
    resolvedFailures: [],
    lastVisitedTimestamp: brief.lastVisitedTimestamp,
  };
}

export function saveCapstoneProgress(progress: CapstoneProgress): void {
  const brief = getCapstoneBriefProgress(progress.projectId);
  brief.status = progress.completed ? 'completed' : 'in_progress';
  saveCapstoneBriefProgress(brief);
}

export function markTaskComplete(projectId: string, _taskId: string): CapstoneProgress {
  setCapstoneStatus(projectId, 'in_progress');
  return getCapstoneProgress(projectId);
}

export function markTaskIncomplete(projectId: string, _taskId: string): CapstoneProgress {
  return getCapstoneProgress(projectId);
}

export function markFailureResolved(projectId: string, _failureId: string): CapstoneProgress {
  return getCapstoneProgress(projectId);
}

export function submitCapstone(
  projectId: string,
  _score: number,
  _allTaskIds: string[]
): CapstoneProgress {
  setCapstoneStatus(projectId, 'completed');
  return getCapstoneProgress(projectId);
}

export function resetCapstoneProgress(projectId: string): CapstoneProgress {
  resetCapstoneBriefProgress(projectId);
  return getCapstoneProgress(projectId);
}
