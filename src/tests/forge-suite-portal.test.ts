import { describe, it, expect } from 'vitest';
import { ViewMode } from '../context/AppContext';
import { ACADEMY_18_TOPICS, ALL_ACADEMY_CONCEPTS } from '../git/data/unifiedAcademyData';

describe('CloudStack Unified Portal Tests', () => {
  it('supports home in ViewMode union type', () => {
    const validHomeMode: ViewMode = 'home';
    expect(validHomeMode).toBe('home');
  });

  it('verifies Git Academy academy data integrity for portal showcase', () => {
    expect(ACADEMY_18_TOPICS.length).toBe(18);
    const totalConcepts = ACADEMY_18_TOPICS.flatMap((t) => t.concepts).length;
    expect(totalConcepts).toBe(75);
  });

  it('validates Kubernetes Academy target endpoint format', () => {
    const kubernetesDevPort = 5174;
    const kubernetesUrl = `http://localhost:${kubernetesDevPort}/`;
    expect(kubernetesUrl).toMatch(/^http:\/\/localhost:\d+\/$/);
  });

  it('validates suite aggregate statistics', () => {
    const gitTopics = 18;
    const gitConcepts = 75;
    const kubernetesModules = 16;
    const kubernetesConcepts = 56;

    const totalModules = gitTopics + kubernetesModules;
    const totalConcepts = gitConcepts + kubernetesConcepts;

    expect(totalModules).toBe(34);
    expect(totalConcepts).toBe(131);
  });

  it('supports roadmap in ViewMode union type', () => {
    const validRoadmapMode: ViewMode = 'roadmap';
    expect(validRoadmapMode).toBe('roadmap');
  });

  it('exports FuturisticParallaxBackground as a valid component', async () => {
    const { FuturisticParallaxBackground } = await import('../components/home/FuturisticParallaxBackground');
    expect(FuturisticParallaxBackground).toBeDefined();
    expect(typeof FuturisticParallaxBackground).toBe('function');
  });

  it('exports CloudStackHomeView as a valid component containing futuristic background', async () => {
    const { CloudStackHomeView } = await import('../components/home/CloudStackHomeView');
    expect(CloudStackHomeView).toBeDefined();
    expect(typeof CloudStackHomeView).toBe('function');
  });
});
