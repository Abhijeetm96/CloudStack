import { describe, it, expect } from 'vitest';
import { LINUX_PRACTICE_SCENARIOS, ALL_PRACTICE_SCENARIOS } from '../linuxforge/components/practice/LinuxPracticeView';
import { TOTAL_LINUX_CONCEPTS } from '../linuxforge/data/topics';

describe('LinuxPracticeView Exhaustive 436 Scenarios & Dynamic Feedback Audit', () => {
  it('verifies all 436 canonical concepts are fully populated as practice scenarios', () => {
    expect(LINUX_PRACTICE_SCENARIOS.length).toBe(TOTAL_LINUX_CONCEPTS);
    expect(ALL_PRACTICE_SCENARIOS.length).toBe(436);
  });

  it('verifies all 30 chapters are represented in practice scenarios', () => {
    const chapters = new Set(ALL_PRACTICE_SCENARIOS.map((s) => parseInt(s.topicNumber, 10)));
    expect(chapters.size).toBe(30);

    for (let i = 1; i <= 30; i++) {
      expect(chapters.has(i)).toBe(true);
    }
  });

  it('verifies Chapter 30 projects (e.g. c-30-01) are present and fully configured', () => {
    const c3001 = ALL_PRACTICE_SCENARIOS.find((s) => s.id === 'c-30-01');
    expect(c3001).toBeDefined();
    expect(c3001?.title).toBe('Build a Linux Web Server');
    expect(c3001?.topicNumber).toBe('30');
    expect(c3001?.solutionCommands.length).toBeGreaterThan(0);
    expect(c3001?.targetTask).toBeTruthy();
    expect(c3001?.conceptBrushUp.coreConcept.length).toBeGreaterThan(20);
    expect(c3001?.conceptBrushUp.whyItMatters.length).toBeGreaterThan(20);
  });

  it('ensures every single one of the 436 scenarios has valid task, solutions, hints, and brush-up', () => {
    ALL_PRACTICE_SCENARIOS.forEach((scenario) => {
      expect(scenario.id).toBeTruthy();
      expect(scenario.title).toBeTruthy();
      expect(scenario.command).toBeTruthy();
      expect(scenario.targetTask).toBeTruthy();
      expect(scenario.solutionCommands.length).toBeGreaterThan(0);
      expect(scenario.hint).toBeTruthy();
      expect(scenario.advancedHint).toBeTruthy();

      const brushUp = scenario.conceptBrushUp;
      expect(brushUp).toBeDefined();
      expect(brushUp.coreConcept).toBeTruthy();
      expect(brushUp.whyItMatters).toBeTruthy();
      expect(brushUp.productionGotcha).toBeTruthy();
      expect(brushUp.keyTakeaway).toBeTruthy();
    });
  });

  it('verifies difficulty distribution spans all levels', () => {
    const difficulties = new Set(ALL_PRACTICE_SCENARIOS.map((s) => s.difficulty.toLowerCase()));
    expect(difficulties.has('beginner')).toBe(true);
    expect(difficulties.has('intermediate')).toBe(true);
    expect(difficulties.has('advanced')).toBe(true);
  });
});
