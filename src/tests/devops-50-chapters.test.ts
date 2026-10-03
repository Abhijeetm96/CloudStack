import { describe, it, expect } from 'vitest';
import {
  DEVOPS_50_CHAPTERS,
  DEVOPS_10_LEVELS,
  ALL_DEVOPS_LESSONS,
  getDevOpsLessonById,
  getDevOpsChapterByNumber,
  getDevOpsLevelById,
  getAdjacentDevOpsLessons,
} from '../devops/data/devopsCurriculumData';
import { DevOpsProgressStore } from '../devops/progress/devopsProgress';

describe('DevOps Academy 50-Chapter Exhaustive Curriculum Audit', () => {
  it('verifies all 50 chapters exist with sequential numbering 1 to 50', () => {
    expect(DEVOPS_50_CHAPTERS.length).toBe(50);
    DEVOPS_50_CHAPTERS.forEach((ch, idx) => {
      expect(ch.number).toBe(idx + 1);
      expect(ch.id).toMatch(/^ch\d{2}-/);
      expect(ch.title).toBeTruthy();
      expect(ch.summary).toBeTruthy();
      expect(ch.levelId).toBeTruthy();
      expect(ch.levelName).toBeTruthy();
      expect(ch.levelNumber).toBeGreaterThanOrEqual(1);
      expect(ch.levelNumber).toBeLessThanOrEqual(10);
      expect(ch.subchapters.length).toBeGreaterThanOrEqual(12);
    });
  });

  it('verifies all 10 learning progression levels exist and cover all 50 chapters', () => {
    expect(DEVOPS_10_LEVELS.length).toBe(10);
    const coveredChapters = new Set<number>();
    DEVOPS_10_LEVELS.forEach(level => {
      expect(level.id).toBeTruthy();
      expect(level.name).toBeTruthy();
      expect(level.subtitle).toBeTruthy();
      expect(level.chapterRange).toBeTruthy();
      expect(level.chapterNumbers.length).toBeGreaterThanOrEqual(1);
      level.chapterNumbers.forEach(n => coveredChapters.add(n));
    });

    expect(coveredChapters.size).toBe(50);
    for (let i = 1; i <= 50; i++) {
      expect(coveredChapters.has(i)).toBe(true);
    }
  });

  it('verifies all 890+ subchapters exist and are fully populated with 20 pedagogical dimensions', () => {
    expect(ALL_DEVOPS_LESSONS.length).toBeGreaterThanOrEqual(880);

    const FORBIDDEN_STRINGS = ['coming soon', 'todo', 'placeholder', 'dummy lesson', 'content will be added later'];

    ALL_DEVOPS_LESSONS.forEach(lesson => {
      expect(lesson.id).toMatch(/^devops-\d{2}-\d{2}$/);
      expect(lesson.chapterNumber).toBeGreaterThanOrEqual(1);
      expect(lesson.chapterNumber).toBeLessThanOrEqual(50);
      expect(lesson.subchapterCode).toMatch(/^\d+\.\d+$/);
      expect(lesson.title.trim().length).toBeGreaterThan(0);
      expect(lesson.estimatedMinutes).toBeGreaterThan(0);

      // Dimension 1: What is it
      expect(lesson.whatIsIt.length).toBeGreaterThan(30);
      // Dimension 2: Simple explanation
      expect(lesson.simpleExplanation.length).toBeGreaterThan(30);
      // Dimension 3: Why needed
      expect(lesson.whyNeeded.length).toBeGreaterThan(30);
      // Dimension 4: Where used
      expect(lesson.whereUsed.length).toBeGreaterThan(20);
      // Dimension 5: When to use
      expect(lesson.whenToUse.length).toBeGreaterThanOrEqual(2);
      // Dimension 6: When not to use
      expect(lesson.whenNotToUse.length).toBeGreaterThanOrEqual(2);
      // Dimension 7: How it works
      expect(lesson.howItWorks.length).toBeGreaterThan(40);
      // Dimension 8: Terminology
      expect(lesson.terminology.length).toBeGreaterThanOrEqual(2);
      lesson.terminology.forEach(t => {
        expect(t.term).toBeTruthy();
        expect(t.definition).toBeTruthy();
      });
      // Dimension 9: Syntax/Config
      expect(lesson.syntaxOrConfig).toBeDefined();
      if (lesson.syntaxOrConfig) {
        expect(lesson.syntaxOrConfig.code.length).toBeGreaterThan(15);
        expect(lesson.syntaxOrConfig.explanation.length).toBeGreaterThan(15);
      }
      // Dimension 10: Variations
      expect(lesson.variations.length).toBeGreaterThanOrEqual(2);
      // Dimension 11: Real-world examples
      expect(lesson.realWorldExamples.length).toBeGreaterThanOrEqual(2);
      // Dimension 12: Architecture diagram
      expect(lesson.architectureDiagram).toBeDefined();
      // Dimension 13: Common mistakes
      expect(lesson.commonMistakes.length).toBeGreaterThanOrEqual(2);
      lesson.commonMistakes.forEach(m => {
        expect(m.mistake).toBeTruthy();
        expect(m.fix).toBeTruthy();
      });
      // Dimension 14: Security considerations
      expect(lesson.securityConsiderations.length).toBeGreaterThanOrEqual(2);
      // Dimension 15: Production considerations
      expect(lesson.productionConsiderations.length).toBeGreaterThanOrEqual(2);
      // Dimension 16: Related concepts & cross-academy links
      expect(lesson.relatedConcepts.length).toBeGreaterThanOrEqual(2);
      // Dimension 17: Prerequisites
      expect(lesson.prerequisites.length).toBeGreaterThanOrEqual(2);
      // Dimension 18: Hands-on scenario
      expect(lesson.handsOnScenario.title).toBeTruthy();
      expect(lesson.handsOnScenario.steps.length).toBeGreaterThanOrEqual(3);
      // Dimension 19: Practical challenge
      expect(lesson.practicalChallenge.task).toBeTruthy();
      expect(lesson.practicalChallenge.solution).toBeTruthy();
      // Dimension 20: Key takeaways
      expect(lesson.keyTakeaways.length).toBeGreaterThanOrEqual(3);

      // Verify no forbidden placeholder content
      const fullText = JSON.stringify(lesson).toLowerCase();
      FORBIDDEN_STRINGS.forEach(forbidden => {
        expect(fullText.includes(forbidden)).toBe(false);
      });
    });
  });

  it('verifies cross-academy links reference valid Academy routes', () => {
    let crossAcademyCount = 0;
    ALL_DEVOPS_LESSONS.forEach(lesson => {
      lesson.relatedConcepts.forEach(rel => {
        if (rel.academy && rel.academy !== 'devops') {
          crossAcademyCount++;
          expect(['git', 'linux', 'docker', 'kubernetes', 'terraform']).toContain(rel.academy);
          expect(rel.route).toMatch(/^\/cloudstack\/(git|linux|docker|kubernetes|terraform)/);
          expect(rel.linkText).toBeTruthy();
        }
      });
    });
    expect(crossAcademyCount).toBeGreaterThan(200);
  });

  it('verifies helper lookup functions work accurately', () => {
    const firstLesson = getDevOpsLessonById('devops-01-01');
    expect(firstLesson).toBeDefined();
    expect(firstLesson?.title).toBe('What is DevOps?');

    const ch50 = getDevOpsChapterByNumber(50);
    expect(ch50).toBeDefined();
    expect(ch50?.title).toBe('End-to-End Production DevOps');

    const level01 = getDevOpsLevelById('level-01-foundation');
    expect(level01).toBeDefined();
    expect(level01?.name).toBe('FOUNDATION');

    const adj = getAdjacentDevOpsLessons('devops-01-01');
    expect(adj.prev).toBeUndefined();
    expect(adj.next).toBeDefined();
    expect(adj.next?.id).toBe('devops-01-02');
  });

  it('verifies progress tracking store functionality', () => {
    const store = DevOpsProgressStore.getInstance();
    store.reset();

    expect(store.isLessonCompleted('devops-01-01')).toBe(false);
    expect(store.getCompletionPercentage(ALL_DEVOPS_LESSONS.length)).toBe(0);

    store.toggleLessonCompleted('devops-01-01');
    expect(store.isLessonCompleted('devops-01-01')).toBe(true);

    store.setActiveLesson('devops-01-02', 1);
    expect(store.getState().activeLessonId).toBe('devops-01-02');
    expect(store.getState().activeChapterNumber).toBe(1);

    store.reset();
    expect(store.isLessonCompleted('devops-01-01')).toBe(false);
  });
});
