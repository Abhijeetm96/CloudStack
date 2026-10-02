import { describe, it, expect } from 'vitest';
import {
  ALL_DOCKER_CHAPTERS,
  ALL_DOCKER_LESSONS,
  DOCKER_STATS,
  getDockerLessonById,
  searchDockerLessons
} from '../docker/data';

describe('Docker Academy Curriculum Complete Audit', () => {
  it('contains exactly 68 chapters', () => {
    expect(ALL_DOCKER_CHAPTERS.length).toBe(68);
    ALL_DOCKER_CHAPTERS.forEach((ch, idx) => {
      expect(ch.number).toBe(idx + 1);
      expect(ch.id).toBe(`ch-${String(idx + 1).padStart(2, '0')}`);
      expect(ch.title).toBeTruthy();
      expect(ch.description).toBeTruthy();
      expect(ch.lessons.length).toBeGreaterThan(0);
    });
  });

  it('contains all 1,038 subchapters without any gaps', () => {
    expect(ALL_DOCKER_LESSONS.length).toBe(1038);
    expect(DOCKER_STATS.totalChapters).toBe(68);
    expect(DOCKER_STATS.totalLessons).toBe(1038);
  });

  it('ensures all lesson IDs are unique and well-formed', () => {
    const ids = new Set<string>();
    ALL_DOCKER_LESSONS.forEach((lesson) => {
      expect(ids.has(lesson.id)).toBe(false);
      ids.add(lesson.id);
      expect(lesson.id).toMatch(/^dk\d{2}-\d{2}-.+$/);
    });
    expect(ids.size).toBe(ALL_DOCKER_LESSONS.length);
  });

  it('verifies that every single lesson contains all 35 mandatory pedagogical items without placeholders', () => {
    const placeholderRegex = /\b(TODO|coming soon|placeholder|TBD)\b/i;

    ALL_DOCKER_LESSONS.forEach((lesson) => {
      // 1. Definition
      expect(lesson.definition.length).toBeGreaterThan(15);
      expect(lesson.definition).not.toMatch(placeholderRegex);

      // 2. Beginner explanation
      expect(lesson.beginnerExplanation.length).toBeGreaterThan(20);

      // 3. Technical explanation
      expect(lesson.technicalExplanation.length).toBeGreaterThan(20);

      // 4. Why it exists
      expect(lesson.whyItExists.length).toBeGreaterThan(15);

      // 5. Problem solved
      expect(lesson.problemSolved.length).toBeGreaterThan(15);

      // 6. Analogy
      expect(lesson.analogy.length).toBeGreaterThan(15);

      // 7. Mental model
      expect(lesson.mentalModel.length).toBeGreaterThan(15);

      // 8 & 9. Terminology & explanations
      expect(lesson.terminology.length).toBeGreaterThanOrEqual(3);
      lesson.terminology.forEach(t => {
        expect(t.term).toBeTruthy();
        expect(t.explanation).toBeTruthy();
      });

      // 10 & 11. Syntax & breakdown
      expect(lesson.syntax.length).toBeGreaterThan(3);
      expect(lesson.syntaxBreakdown.length).toBeGreaterThan(0);

      // 12. Variations
      expect(lesson.variations.length).toBeGreaterThan(0);

      // 13, 14, 15, 16. Examples
      expect(lesson.simplestExample.length).toBeGreaterThan(5);
      expect(lesson.practicalExample.length).toBeGreaterThan(5);
      expect(lesson.realWorldExample.length).toBeGreaterThan(5);
      expect(lesson.productionExample.length).toBeGreaterThan(5);

      // 17 & 18. When to use & when not to use
      expect(lesson.whenToUse.length).toBeGreaterThan(0);
      expect(lesson.whenNotToUse.length).toBeGreaterThan(0);

      // 19 & 20. Mistakes & Misconceptions
      expect(lesson.commonMistakes.length).toBeGreaterThan(0);
      expect(lesson.commonMisconceptions.length).toBeGreaterThan(0);

      // 21, 22, 23. Security, Performance, Operational
      expect(lesson.securityConsiderations.length).toBeGreaterThan(0);
      expect(lesson.performanceConsiderations.length).toBeGreaterThan(0);
      expect(lesson.operationalConsiderations.length).toBeGreaterThan(0);

      // 24. Troubleshooting
      expect(lesson.troubleshooting.length).toBeGreaterThan(0);

      // 25 & 26. Best practices & Anti-patterns
      expect(lesson.bestPractices.length).toBeGreaterThan(0);
      expect(lesson.antiPatterns.length).toBeGreaterThan(0);

      // 27 & 28. Related concepts & commands
      expect(lesson.relatedConcepts.length).toBeGreaterThan(0);
      expect(lesson.relatedCommands.length).toBeGreaterThan(0);

      // 29 & 30. Expected output & explanation
      expect(lesson.expectedOutput.length).toBeGreaterThan(0);
      expect(lesson.outputExplanation.length).toBeGreaterThan(0);

      // 31. Guided exercise
      expect(lesson.guidedExercise.title).toBeTruthy();
      expect(lesson.guidedExercise.steps.length).toBeGreaterThan(0);

      // 32. Simulator
      expect(lesson.recommendedSimulator).toBeTruthy();

      // 33. Challenge
      expect(lesson.challenge.scenario).toBeTruthy();
      expect(lesson.challenge.goal).toBeTruthy();

      // 34. Knowledge check
      expect(lesson.knowledgeCheck.options.length).toBeGreaterThanOrEqual(3);
      expect(lesson.knowledgeCheck.correctIndex).toBeGreaterThanOrEqual(0);
      expect(lesson.knowledgeCheck.explanation).toBeTruthy();

      // 35. Summary
      expect(lesson.summary.length).toBeGreaterThan(20);

      // CLI Internals
      expect(lesson.whatActuallyHappens).toBeTruthy();
      expect(lesson.whatChangesOnDisk).toBeTruthy();
      expect(lesson.whatChangesInDocker).toBeTruthy();
      expect(lesson.internalMechanics).toBeTruthy();
      expect(lesson.safeExample).toBeTruthy();
      expect(lesson.dangerousExample).toBeTruthy();
    });
  });

  it('searches across lessons by title, definition, syntax, and related commands', () => {
    const results = searchDockerLessons('docker run');
    expect(results.length).toBeGreaterThan(0);
    const multiStage = searchDockerLessons('multi-stage');
    expect(multiStage.length).toBeGreaterThan(0);
    const compose = searchDockerLessons('compose');
    expect(compose.length).toBeGreaterThan(0);
  });

  it('finds lessons by ID accurately', () => {
    const firstLesson = getDockerLessonById('dk01-01-what-is-a-container');
    expect(firstLesson).toBeDefined();
    expect(firstLesson?.chapterNumber).toBe(1);
    expect(firstLesson?.subchapterTitle).toBe('What is a Container?');

    const lastLesson = ALL_DOCKER_CHAPTERS[67].lessons[ALL_DOCKER_CHAPTERS[67].lessons.length - 1];
    expect(lastLesson).toBeDefined();
    expect(lastLesson.chapterNumber).toBe(68);
    expect(getDockerLessonById(lastLesson.id)).toEqual(lastLesson);
  });
});
