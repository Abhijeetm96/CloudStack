import { describe, it, expect } from 'vitest';
import { ALL_TERRAFORM_CHAPTERS, ALL_TERRAFORM_LESSONS, TERRAFORM_LESSON_MAP, searchTerraformLessons } from '../terraform/data';
import { TERRAFORM_CURRICULUM_SPEC } from '../terraform/data/curriculumStructure';

describe('Terraform Academy Curriculum & Lesson Integrity Audit', () => {
  it('contains exactly 50 chapters matching the curriculum specification', () => {
    expect(ALL_TERRAFORM_CHAPTERS).toHaveLength(50);
    expect(TERRAFORM_CURRICULUM_SPEC).toHaveLength(50);

    ALL_TERRAFORM_CHAPTERS.forEach((ch, idx) => {
      expect(ch.number).toBe(idx + 1);
      expect(ch.title).toBeTruthy();
      expect(ch.title.length).toBeGreaterThan(3);
      expect(ch.subchapterCount).toBe(ch.subchapters.length);
    });
  });

  it('contains all expected subchapters (over 670 total)', () => {
    expect(ALL_TERRAFORM_LESSONS.length).toBeGreaterThanOrEqual(670);
    expect(TERRAFORM_LESSON_MAP.size).toBe(ALL_TERRAFORM_LESSONS.length);
  });

  it('guarantees unique IDs across all lessons with no duplicates', () => {
    const ids = new Set<string>();
    for (const lesson of ALL_TERRAFORM_LESSONS) {
      expect(ids.has(lesson.id)).toBe(false);
      ids.add(lesson.id);
    }
  });

  it('verifies every single lesson contains the required 40 pedagogical items without placeholders', () => {
    const forbiddenPhrases = [
      'coming soon',
      'todo',
      'content will be added',
      'placeholder',
      'lorem ipsum'
    ];

    for (const lesson of ALL_TERRAFORM_LESSONS) {
      // 1-6 Foundations
      expect(lesson.whatIsIt).toBeTruthy();
      expect(lesson.beginnerDefinition).toBeTruthy();
      expect(lesson.simpleExplanation).toBeTruthy();
      expect(lesson.whyExists).toBeTruthy();
      expect(lesson.problemSolved).toBeTruthy();
      expect(lesson.whyTerraformNeedsIt).toBeTruthy();

      // 7-9 Models
      expect(lesson.realWorldAnalogy).toBeTruthy();
      expect(lesson.mentalModel.metaphor).toBeTruthy();
      expect(lesson.mentalModel.diagramText).toBeTruthy();
      expect(lesson.mentalModel.keyInsight).toBeTruthy();
      expect(lesson.technicalDefinition).toBeTruthy();

      // 10-14 Syntax & Terminology
      expect(lesson.terminology.length).toBeGreaterThanOrEqual(2);
      expect(lesson.terminologyExplanations).toBeTruthy();
      expect(lesson.syntax).toBeTruthy();
      expect(lesson.syntaxBreakdown.length).toBeGreaterThanOrEqual(2);
      expect(lesson.syntaxVariations.length).toBeGreaterThanOrEqual(1);

      // 15-17 Examples
      expect(lesson.minimalExample.code).toBeTruthy();
      expect(lesson.realWorldExample.code).toBeTruthy();
      expect(lesson.productionExample.code).toBeTruthy();

      // 18-24 Scenarios, Mistakes, Considerations
      expect(lesson.whenToUse.length).toBeGreaterThanOrEqual(2);
      expect(lesson.whenNotToUse.length).toBeGreaterThanOrEqual(2);
      expect(lesson.commonMistakes.length).toBeGreaterThanOrEqual(1);
      expect(lesson.commonMisconceptions.length).toBeGreaterThanOrEqual(1);
      expect(lesson.securityConsiderations.length).toBeGreaterThanOrEqual(2);
      expect(lesson.operationalConsiderations.length).toBeGreaterThanOrEqual(2);
      expect(lesson.costConsiderations.length).toBeGreaterThanOrEqual(1);

      // 25-28 Changes & Outputs
      expect(lesson.whatChanges.length).toBeGreaterThanOrEqual(1);
      expect(lesson.whatDoesNotChange.length).toBeGreaterThanOrEqual(1);
      expect(lesson.expectedOutput.terminalText).toBeTruthy();
      expect(lesson.outputExplanation.length).toBeGreaterThanOrEqual(1);

      // 29-35 Comparisons & Recovery
      expect(lesson.relatedConcepts.length).toBeGreaterThanOrEqual(2);
      expect(lesson.relatedCommands.length).toBeGreaterThanOrEqual(2);
      expect(lesson.comparisonWithSimilar.length).toBeGreaterThanOrEqual(1);
      expect(lesson.troubleshooting.length).toBeGreaterThanOrEqual(1);
      expect(lesson.recoveryProcedure.steps.length).toBeGreaterThanOrEqual(2);
      expect(lesson.bestPractices.length).toBeGreaterThanOrEqual(2);
      expect(lesson.antiPatterns.length).toBeGreaterThanOrEqual(1);

      // 36-40 Interactive, Challenges, Summary
      expect(lesson.guidedHandsOnExercise.task).toBeTruthy();
      expect(lesson.guidedHandsOnExercise.initialCode).toBeTruthy();
      expect(lesson.guidedHandsOnExercise.expectedCode).toBeTruthy();
      expect(lesson.interactiveSimulatorOpportunity.scenario).toBeTruthy();
      expect(lesson.independentChallenge.objective).toBeTruthy();
      expect(lesson.knowledgeCheck.length).toBeGreaterThanOrEqual(1);
      expect(lesson.summary.takeaways.length).toBeGreaterThanOrEqual(2);
      expect(lesson.summary.keyFormula).toBeTruthy();

      // Check for forbidden placeholder text
      const fullText = JSON.stringify(lesson).toLowerCase();
      for (const phrase of forbiddenPhrases) {
        expect(fullText).not.toContain(phrase);
      }
    }
  });

  it('searches across titles, definitions, syntax, and commands correctly', () => {
    const stateResults = searchTerraformLessons('state');
    expect(stateResults.length).toBeGreaterThan(0);

    const initResults = searchTerraformLessons('init');
    expect(initResults.length).toBeGreaterThan(0);

    const moduleResults = searchTerraformLessons('module');
    expect(moduleResults.length).toBeGreaterThan(0);

    const providerResults = searchTerraformLessons('provider');
    expect(providerResults.length).toBeGreaterThan(0);
  });
});
