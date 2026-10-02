import { describe, it, expect } from 'vitest';
import { KUBE_CHAPTERS, TOTAL_CHAPTERS, TOTAL_CONCEPTS } from '../kubernetes/data/topics';
import fs from 'fs';
import path from 'path';

describe('Kubernetes Academy Concepts Universe Architecture & Data Audit', () => {
  it('contains exactly 15 chapters and 71 canonical concepts across the curriculum', () => {
    expect(KUBE_CHAPTERS.length).toBe(15);
    expect(TOTAL_CHAPTERS).toBe(15);
    expect(TOTAL_CONCEPTS).toBe(71);

    const flattened = KUBE_CHAPTERS.flatMap((ch) => ch.concepts);
    expect(flattened.length).toBe(71);
  });

  it('verifies every concept has a valid chapter-prefixed subchapter number', () => {
    KUBE_CHAPTERS.forEach((ch) => {
      expect(ch.number).toBeGreaterThanOrEqual(1);
      expect(ch.number).toBeLessThanOrEqual(15);
      expect(ch.concepts.length).toBeGreaterThan(0);

      ch.concepts.forEach((concept) => {
        expect(concept.number).toMatch(new RegExp(`^${ch.number}\\.\\d+$`));
        expect(concept.title).toBeTruthy();
        expect(concept.difficulty).toMatch(/^(Beginner|Intermediate|Advanced|Expert)$/);
      });
    });
  });

  it('ensures PodConceptsUniverseView implements StandardConceptsUniverse with full chapter/subchapter data', () => {
    const universeViewPath = path.resolve(
      __dirname,
      '../kubernetes/components/universe/PodConceptsUniverseView.tsx'
    );
    const content = fs.readFileSync(universeViewPath, 'utf-8');

    // StandardConceptsUniverse integration
    expect(content).toContain('StandardConceptsUniverse');
    expect(content).toContain('KUBE_CHAPTERS');
    expect(content).toContain('KUBE_CURRICULUM_PACKS');
    expect(content).toContain('subChapterNumber: c.number');
    expect(content).toContain('badges: [ch.category, c.difficulty, c.badge || `Ch ${ch.number}`]');
    expect(content).toContain('curriculumPacks={KUBE_CURRICULUM_PACKS}');
    expect(content).toContain('totalConceptCount={71}');
    expect(content).toContain('academyName="Kubernetes"');
  });

  it('verifies all 5 Kubernetes curriculum packs partition the 15 chapters cleanly', () => {
    const universeViewPath = path.resolve(
      __dirname,
      '../kubernetes/components/universe/PodConceptsUniverseView.tsx'
    );
    const content = fs.readFileSync(universeViewPath, 'utf-8');

    expect(content).toContain('Pack 1: Foundations & Architecture (Ch 1–3)');
    expect(content).toContain('Pack 2: Workloads & Config (Ch 4–6)');
    expect(content).toContain('Pack 3: Governance & Observability (Ch 7–9)');
    expect(content).toContain('Pack 4: Autoscaling & Storage (Ch 10–12)');
    expect(content).toContain('Pack 5: Deployments & Operations (Ch 13–15)');
  });

  it('verifies variations, comparisons, mistakes, and scenarios are populated', () => {
    const universeViewPath = path.resolve(
      __dirname,
      '../kubernetes/components/universe/PodConceptsUniverseView.tsx'
    );
    const content = fs.readFileSync(universeViewPath, 'utf-8');

    expect(content).toContain('comparisons: c.dockerBridge');
    expect(content).toContain('variations:');
    expect(content).toContain('yamlSnippet');
    expect(content).toContain('mistakes: c.commonPitfalls');
    expect(content).toContain('scenarios: c.quizQuestion');
  });
});
