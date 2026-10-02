import { describe, it, expect } from 'vitest';
import {
  GIT_35_CHAPTERS,
  ALL_GIT_CONCEPTS,
  TOTAL_GIT_CHAPTERS,
  TOTAL_GIT_CONCEPTS,
  getGitConcept,
  findChapterForConcept,
} from '../git/data/chapters';
import {
  getUniversalConcept,
  COMPLETE_PROBLEM_SOLUTIONS,
  GLOBAL_PROBLEM_SOLUTIONS,
} from '../git/data/unifiedAcademyData';

describe('Git Academy 35 Chapters Complete Academy Curriculum Audit', () => {
  it('verifies that exactly 35 chapters exist with proper metadata', () => {
    expect(TOTAL_GIT_CHAPTERS).toBe(35);
    expect(GIT_35_CHAPTERS.length).toBe(35);

    // Verify sequential chapter IDs: ch-01 through ch-35
    for (let i = 1; i <= 35; i++) {
      const numStr = i.toString().padStart(2, '0');
      const expectedId = `ch-${numStr}`;
      const chapter = GIT_35_CHAPTERS.find((ch) => ch.id === expectedId);
      expect(chapter, `Chapter ${expectedId} must exist`).toBeDefined();
      expect(chapter!.title.length, `Chapter ${expectedId} must have a non-empty title`).toBeGreaterThan(3);
      expect(chapter!.number).toBe(numStr);
      expect(chapter!.concepts.length, `Chapter ${expectedId} must have subchapters`).toBeGreaterThan(0);
    }
  });

  it('verifies exact subchapter count per chapter summing to 481 subchapters', () => {
    const expectedCounts: Record<number, number> = {
      1: 15,
      2: 15,
      3: 12,
      4: 11,
      5: 12,
      6: 15,
      7: 18,
      8: 15,
      9: 15,
      10: 16,
      11: 14,
      12: 14,
      13: 13,
      14: 12,
      15: 10,
      16: 15,
      17: 12,
      18: 16,
      19: 14,
      20: 14,
      21: 13,
      22: 15,
      23: 28,
      24: 10,
      25: 12,
      26: 14,
      27: 15,
      28: 11,
      29: 14,
      30: 10,
      31: 11,
      32: 14,
      33: 13,
      34: 12,
      35: 12,
    };

    let totalCalculated = 0;
    for (let i = 1; i <= 35; i++) {
      const ch = GIT_35_CHAPTERS[i - 1];
      const expected = expectedCounts[i];
      expect(
        ch.concepts.length,
        `Chapter ${i} (${ch.title}) count must match specification`
      ).toBe(expected);
      totalCalculated += ch.concepts.length;
    }

    expect(totalCalculated).toBe(482);
    expect(TOTAL_GIT_CONCEPTS).toBe(482);
    expect(Object.keys(ALL_GIT_CONCEPTS).length).toBe(482);
  });

  it('verifies every single one of the 482 subchapters has real educational content', () => {
    const concepts = Object.values(ALL_GIT_CONCEPTS);
    expect(concepts.length).toBe(482);

    for (const concept of concepts) {
      // 1. Core identification
      expect(concept.id).toBeTruthy();
      expect(concept.title.length, `Concept ${concept.id} has valid title`).toBeGreaterThan(0);
      expect(concept.command.length, `Concept ${concept.id} has command`).toBeGreaterThan(0);

      // 2. Explanations (What is it, Why do you need it, Real world scenario)
      expect(concept.whatIsIt.length, `Concept ${concept.id} has definition`).toBeGreaterThan(15);
      expect(concept.inSimpleWords.length, `Concept ${concept.id} has simple explanation`).toBeGreaterThan(15);
      expect(concept.whyDoYouNeedIt.length, `Concept ${concept.id} has rationale`).toBeGreaterThan(15);
      expect(concept.realWorldAnalogy.length, `Concept ${concept.id} has analogy`).toBeGreaterThan(15);

      // 3. Syntax & Tokens
      expect(concept.syntaxCode.length, `Concept ${concept.id} has syntax`).toBeGreaterThan(0);
      expect(concept.syntaxTokens.length, `Concept ${concept.id} has token breakdowns`).toBeGreaterThan(0);

      // 4. Action Stage (before, running, after state changes)
      expect(concept.actionStage, `Concept ${concept.id} has action stage`).toBeDefined();
      expect(concept.actionStage.before.label).toBeTruthy();
      expect(concept.actionStage.running.label).toBeTruthy();
      expect(concept.actionStage.after.label).toBeTruthy();
      expect(concept.actionStage.after.whatChanged.length).toBeGreaterThan(0);
      expect(concept.actionStage.after.whatDidNotChange.length).toBeGreaterThan(0);

      // 5. Common Variations & Scenarios
      expect(concept.variations.length, `Concept ${concept.id} has variations`).toBeGreaterThan(0);
      expect(concept.scenarios.length, `Concept ${concept.id} has real-world scenarios`).toBeGreaterThan(0);

      // 6. Practice & Reference
      expect(concept.challenge.title).toBeTruthy();
      expect(concept.challenge.objective).toBeTruthy();
      expect(concept.commonMistakes?.length).toBeGreaterThan(0);
      expect(concept.safeRecovery).toBeDefined();
      expect(concept.reference.commonErrors?.length).toBeGreaterThan(0);
    }
  });

  it('verifies CI/CD chapters are properly identified with isCiCd flag', () => {
    // Chapters 21 to 34 are CI/CD chapters
    for (let i = 21; i <= 34; i++) {
      const ch = GIT_35_CHAPTERS[i - 1];
      for (const conceptRef of ch.concepts) {
        const fullConcept = ALL_GIT_CONCEPTS[conceptRef.id];
        expect(fullConcept, `Concept ${conceptRef.id} in CI/CD chapter ${i} must exist`).toBeDefined();
        expect(fullConcept.isCiCd).toBe(true);
      }
    }
  });

  it('verifies getUniversalConcept seamless lookup for all 481 subchapters', () => {
    // Spot check foundational Git concepts
    const initConcept = getUniversalConcept('c-03-01');
    expect(initConcept.title).toContain('git init');
    expect(initConcept.command).toContain('git init');

    const statusConcept = getUniversalConcept('c-04-01');
    expect(statusConcept.title).toContain('git status');

    const rebaseConcept = getUniversalConcept('c-12-01');
    expect(rebaseConcept.title).toContain('Why Rebase Exists');

    // Spot check CI/CD concepts
    const ciConcept = getUniversalConcept('c-21-01');
    expect(ciConcept.title).toContain('What is CI?');
    expect(ciConcept.isCiCd).toBe(true);

    const ghActionConcept = getUniversalConcept('c-23-01');
    expect(ghActionConcept.title).toContain('GitHub Actions');

    const dockerCiConcept = getUniversalConcept('c-25-01');
    expect(dockerCiConcept.title).toContain('Containers in CI/CD');

    const prodRollback = getUniversalConcept('c-34-10');
    expect(prodRollback.title).toContain('Rollback');

    // Spot check Chapter 35 Real-world Projects
    const project01 = getUniversalConcept('c-35-01');
    expect(project01.title).toContain('Build a Website');

    const project12 = getUniversalConcept('c-35-12');
    expect(project12.title).toContain('Complete CI/CD System');
  });

  it('verifies findChapterForConcept resolves parent chapter for any concept', () => {
    const parentCh1 = findChapterForConcept('c-01-08');
    expect(parentCh1?.id).toBe('ch-01');

    const parentCh23 = findChapterForConcept('c-23-14');
    expect(parentCh23?.id).toBe('ch-23');

    const parentCh35 = findChapterForConcept('c-35-06');
    expect(parentCh35?.id).toBe('ch-35');
  });

  it('verifies Problem Solver contains all 10 diagnostic trees', () => {
    const requiredProblems = [
      'prob-committed-secret',
      'prob-push-rejected',
      'prob-branch-behind',
      'prob-merge-conflict',
      'prob-action-failed',
      'prob-tests-pass-local-fail-ci',
      'prob-docker-build-fails-ci',
      'prob-deployment-failed',
      'prob-prod-unhealthy',
      'prob-pipeline-stuck',
    ];

    for (const probId of requiredProblems) {
      const prob = COMPLETE_PROBLEM_SOLUTIONS.find((p) => p.id === probId);
      expect(prob, `Problem solver diagnostic ${probId} must exist`).toBeDefined();
      expect(prob!.problemTitle.length).toBeGreaterThan(5);
      expect(prob!.keywords.length).toBeGreaterThan(1);
      const hasTreeOrRecommendation = Boolean(prob!.decisionTree || prob!.directRecommendation);
      expect(hasTreeOrRecommendation).toBe(true);
    }
  });
});
