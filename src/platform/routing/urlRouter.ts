// src/platform/routing/urlRouter.ts
import type { ViewMode } from '../../context/AppContext';

export interface RouteState {
  mode: ViewMode;
  conceptId?: string | null;
}

/**
 * Normalizes the base URL configured by Vite (e.g. '/Git Academy/' or '/')
 */
export function getBaseUrl(): string {
  const base = import.meta.env.BASE_URL || '/';
  if (!base.startsWith('/')) return `/${base.endsWith('/') ? base : base + '/'}`;
  return base.endsWith('/') ? base : `${base}/`;
}

/**
 * Extracts the route segment and search query from either pathname or hash.
 * Handles both HTML5 History pushState routes:
 *   https://abhijeetm96.github.io/Git Academy/kubernetes
 * and Hash fallback routes:
 *   https://abhijeetm96.github.io/Git Academy/#/kubernetes
 */
export function parseCurrentRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { mode: 'home' };
  }

  const base = getBaseUrl();
  let path = window.location.pathname;

  // Strip base prefix (case-insensitive)
  if (path.toLowerCase().startsWith(base.toLowerCase())) {
    path = path.slice(base.length);
  } else if (path.startsWith('/')) {
    path = path.slice(1);
  }

  // Remove trailing slashes
  path = path.replace(/\/+$/, '').toLowerCase();

  // If path is empty, check if hash contains a route
  if (!path && window.location.hash) {
    const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    const [hashPath] = rawHash.split('?');
    path = hashPath.replace(/\/+$/, '');
  }

  // Check query params for concept deep-linking
  const searchParams = new URLSearchParams(
    window.location.search || (window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '')
  );
  const conceptId = searchParams.get('concept') || searchParams.get('id') || null;

  const mode = mapSegmentToMode(path);
  return { mode, conceptId };
}

export function mapSegmentToMode(segment: string): ViewMode {
  let seg = segment.toLowerCase().trim();

  // Strip leading slash if any
  if (seg.startsWith('/')) {
    seg = seg.slice(1).trim();
  }

  // Support /cloudstack/* prefixed routes
  if (seg.startsWith('cloudstack/')) {
    seg = seg.slice('cloudstack/'.length).trim();
  }

  switch (seg) {
    case 'cloudstack':
    case 'home':
    case '':
      return 'home';

    case 'kubernetes':
    case 'k8s':
      return 'kubernetes';

    case 'docker':
      return 'docker';

    case 'linuxforge':
    case 'linux':
    case 'kernel':
      return 'linuxforge';

    case 'terraform':
    case 'tf':
    case 'iac':
      return 'terraform';

    case 'git':
    case 'learn':
    case 'academy':
      return 'learn';

    case 'universe':
    case 'concepts':
      return 'universe';

    case 'devops':
    case 'curriculum':
    case 'master-syllabus':
    case 'syllabus':
      return 'devops';

    case 'roadmap':
      return 'roadmap';

    case 'practice':
    case 'challenges':
      return 'practice';

    case 'labs':
      return 'labs';

    case 'ide':
    case 'workspace':
      return 'ide';

    case 'conflict-arena':
    case 'hospital':
    case 'break-it':
    case 'two-dev':
    case 'undo-lab':
    case 'capstone':
    case 'config-lab':
    case 'discover':
    case 'lesson':
    case 'guided-lesson':
      return seg as ViewMode;

    default:
      return 'home';
  }
}

export function mapModeToSegment(mode: ViewMode): string {
  switch (mode) {
    case 'kubernetes':
      return 'cloudstack/kubernetes';
    case 'docker':
      return 'cloudstack/docker';
    case 'linuxforge':
      return 'cloudstack/linux';
    case 'terraform':
      return 'cloudstack/terraform';
    case 'learn':
      return 'cloudstack/git';
    case 'devops':
      return 'cloudstack/devops';
    case 'universe':
      return 'cloudstack/universe';
    case 'roadmap':
      return 'cloudstack/roadmap';
    case 'practice':
      return 'cloudstack/practice';
    case 'labs':
      return 'cloudstack/labs';
    case 'ide':
      return 'cloudstack/ide';
    case 'conflict-arena':
    case 'hospital':
    case 'break-it':
    case 'two-dev':
    case 'undo-lab':
    case 'capstone':
    case 'config-lab':
    case 'discover':
    case 'lesson':
    case 'guided-lesson':
      return `cloudstack/${mode}`;
    case 'home':
    default:
      return 'cloudstack';
  }
}

/**
 * Returns the target document title for each mode.
 */
export function getTitleForMode(mode: ViewMode, conceptTitle?: string | null): string {
  const prefix = conceptTitle ? `${conceptTitle} | ` : '';
  switch (mode) {
    case 'devops':
      return `${prefix}DevOps Academy (29 Chapters) | CloudStack`;
    case 'terraform':
      return `${prefix}Terraform Academy (50 Chapters) | CloudStack`;
    case 'kubernetes':
      return `${prefix}Kubernetes Academy | CloudStack`;
    case 'docker':
      return `${prefix}Docker Academy | CloudStack`;
    case 'linuxforge':
      return `${prefix}Linux Academy | CloudStack`;
    case 'learn':
      return `${prefix}Git Academy | CloudStack`;
    case 'universe':
      return `${prefix}Concepts Universe | CloudStack`;
    case 'roadmap':
      return `${prefix}Cloud & DevOps Engineering Roadmap | CloudStack`;
    case 'practice':
      return `${prefix}Practice Challenges | CloudStack`;
    case 'labs':
      return `${prefix}Simulation Labs | CloudStack`;
    case 'ide':
      return `${prefix}Developer Workspace | CloudStack`;
    case 'home':
    default:
      return 'CloudStack | Interactive Cloud, DevOps & Engineering Academies';
  }
}

/**
 * Returns the absolute path including Vite BASE_URL for the given mode.
 */
export function getUrlForMode(mode: ViewMode, conceptId?: string | null): string {
  const base = getBaseUrl();
  const segment = mapModeToSegment(mode);
  let target = segment ? `${base}${segment}` : base;

  if (conceptId) {
    target += `?concept=${encodeURIComponent(conceptId)}`;
  }

  return target;
}

/**
 * Synchronizes the browser address bar and history with the active view mode.
 */
export function syncUrlWithMode(mode: ViewMode, conceptId?: string | null, replace: boolean = false): void {
  if (typeof window === 'undefined') return;

  const targetUrl = getUrlForMode(mode, conceptId);
  const currentUrl = `${window.location.pathname}${window.location.search}`;

  if (targetUrl !== currentUrl) {
    if (replace) {
      window.history.replaceState({ mode, conceptId }, '', targetUrl);
    } else {
      window.history.pushState({ mode, conceptId }, '', targetUrl);
    }
  }

  document.title = getTitleForMode(mode);
}
