import { describe, it, expect } from 'vitest';
import {
  mapSegmentToMode,
  mapModeToSegment,
  getUrlForMode,
  getTitleForMode,
  getBaseUrl,
} from '../platform/routing/urlRouter';

describe('CloudStack Unified SPA URL Router & Deep-Linking', () => {
  it('correctly maps URL path segments to ViewModes with /cloudstack/* and aliases', () => {
    // Canonical /cloudstack/* routes
    expect(mapSegmentToMode('cloudstack')).toBe('home');
    expect(mapSegmentToMode('cloudstack/git')).toBe('learn');
    expect(mapSegmentToMode('cloudstack/docker')).toBe('docker');
    expect(mapSegmentToMode('cloudstack/kubernetes')).toBe('kubernetes');
    expect(mapSegmentToMode('cloudstack/linux')).toBe('linuxforge');
    expect(mapSegmentToMode('cloudstack/devops')).toBe('devops');
    expect(mapSegmentToMode('cloudstack/roadmap')).toBe('roadmap');
    expect(mapSegmentToMode('cloudstack/universe')).toBe('universe');

    // Direct and legacy aliases
    expect(mapSegmentToMode('kubernetes')).toBe('kubernetes');
    expect(mapSegmentToMode('k8s')).toBe('kubernetes');
    expect(mapSegmentToMode('kubernetes')).toBe('kubernetes');

    expect(mapSegmentToMode('docker')).toBe('docker');
    expect(mapSegmentToMode('docker')).toBe('docker');

    expect(mapSegmentToMode('linuxforge')).toBe('linuxforge');
    expect(mapSegmentToMode('linux')).toBe('linuxforge');

    expect(mapSegmentToMode('git')).toBe('learn');
    expect(mapSegmentToMode('git')).toBe('learn');
    expect(mapSegmentToMode('learn')).toBe('learn');

    expect(mapSegmentToMode('roadmap')).toBe('roadmap');
    expect(mapSegmentToMode('practice')).toBe('practice');
    expect(mapSegmentToMode('labs')).toBe('labs');
    expect(mapSegmentToMode('ide')).toBe('ide');
    expect(mapSegmentToMode('home')).toBe('home');
    expect(mapSegmentToMode('')).toBe('home');
  });

  it('correctly maps ViewModes to canonical CloudStack URL path segments', () => {
    expect(mapModeToSegment('kubernetes')).toBe('cloudstack/kubernetes');
    expect(mapModeToSegment('docker')).toBe('cloudstack/docker');
    expect(mapModeToSegment('linuxforge')).toBe('cloudstack/linux');
    expect(mapModeToSegment('learn')).toBe('cloudstack/git');
    expect(mapModeToSegment('devops')).toBe('cloudstack/devops');
    expect(mapModeToSegment('universe')).toBe('cloudstack/universe');
    expect(mapModeToSegment('roadmap')).toBe('cloudstack/roadmap');
    expect(mapModeToSegment('practice')).toBe('cloudstack/practice');
    expect(mapModeToSegment('home')).toBe('cloudstack');
  });

  it('generates correct URLs with base path and optional concept deep-link parameter', () => {
    const base = getBaseUrl();

    expect(getUrlForMode('home')).toBe(`${base}cloudstack`);
    expect(getUrlForMode('kubernetes')).toBe(`${base}cloudstack/kubernetes`);
    expect(getUrlForMode('docker')).toBe(`${base}cloudstack/docker`);
    expect(getUrlForMode('learn')).toBe(`${base}cloudstack/git`);

    // With concept deep-link
    expect(getUrlForMode('kubernetes', 'c-k8s-pods')).toBe(`${base}cloudstack/kubernetes?concept=c-k8s-pods`);
    expect(getUrlForMode('docker', 'c-dockerfile')).toBe(`${base}cloudstack/docker?concept=c-dockerfile`);
  });

  it('generates distinct branded titles for each academy', () => {
    expect(getTitleForMode('kubernetes')).toContain('Kubernetes');
    expect(getTitleForMode('kubernetes')).toContain('CloudStack');
    expect(getTitleForMode('docker')).toContain('Docker');
    expect(getTitleForMode('docker')).toContain('CloudStack');
    expect(getTitleForMode('learn')).toContain('Git');
    expect(getTitleForMode('learn')).toContain('CloudStack');
    expect(getTitleForMode('linuxforge')).toContain('Linux');
    expect(getTitleForMode('linuxforge')).toContain('CloudStack');
    expect(getTitleForMode('roadmap')).toContain('Roadmap');
    expect(getTitleForMode('home')).toContain('CloudStack');

    // With concept prefix
    expect(getTitleForMode('kubernetes', 'Pod Lifecycle')).toBe('Pod Lifecycle | Kubernetes Academy | CloudStack');
  });
});
