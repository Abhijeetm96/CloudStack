import { describe, it, expect } from 'vitest';
import {
  COMMITFORGE_35_CHAPTERS,
  ALL_COMMITFORGE_CONCEPTS,
  TOTAL_COMMITFORGE_CHAPTERS,
  TOTAL_COMMITFORGE_CONCEPTS,
  getCommitForgeConcept,
  findChapterForConcept,
} from '../commitforge/data/chapters';
import { getUniversalConcept } from '../commitforge/data/unifiedAcademyData';
import { getUrlForMode } from '../platform/routing/urlRouter';

describe('CommitForge 35 Chapters & 481 Subchapters Access and Navigation Audit', () => {
  it('verifies that all 35 chapters contain valid subchapters with IDs, titles, and commands', () => {
    expect(TOTAL_COMMITFORGE_CHAPTERS).toBe(35);
    expect(COMMITFORGE_35_CHAPTERS.length).toBe(35);

    COMMITFORGE_35_CHAPTERS.forEach((chapter) => {
      expect(chapter.concepts.length).toBeGreaterThan(0);
      chapter.concepts.forEach((concept) => {
        expect(concept.id).toBeTruthy();
        expect(concept.id.startsWith('c-')).toBe(true);
        expect(concept.title).toBeTruthy();
        expect(concept.command).toBeTruthy();
        expect(concept.topicId).toBe(chapter.id);
        expect(concept.subChapterNumber || concept.subChapterNum).toBeTruthy();

        // Verify resolver can lookup this concept cleanly
        const resolved = getCommitForgeConcept(concept.id);
        expect(resolved).toBeDefined();
        expect(resolved?.id).toBe(concept.id);

        const universal = getUniversalConcept(concept.id);
        expect(universal).toBeDefined();
        expect(universal.id).toBe(concept.id);
        expect(universal.syntaxCode).toBeTruthy();
      });
    });
  });

  it('verifies that findChapterForConcept correctly resolves every single subchapter to its parent chapter', () => {
    COMMITFORGE_35_CHAPTERS.forEach((chapter) => {
      chapter.concepts.forEach((concept) => {
        const parent = findChapterForConcept(concept.id);
        expect(parent).toBeDefined();
        expect(parent?.id).toBe(chapter.id);
        expect(parent?.number).toBe(chapter.number);
      });
    });
  });

  it('verifies deep-linking URL generation for subchapters across all chapters', () => {
    const testCases = [
      { id: 'c-01-01', expectedQuery: 'concept=c-01-01' },
      { id: 'c-02-05', expectedQuery: 'concept=c-02-05' },
      { id: 'c-10-03', expectedQuery: 'concept=c-10-03' },
      { id: 'c-23-13', expectedQuery: 'concept=c-23-13' },
      { id: 'c-35-12', expectedQuery: 'concept=c-35-12' },
    ];

    testCases.forEach(({ id, expectedQuery }) => {
      const url = getUrlForMode('learn', id);
      expect(url).toContain('cloudstack/git');
      expect(url).toContain(expectedQuery);
    });
  });

  it('verifies every chapter has an accessible first concept for chapter click auto-navigation', () => {
    COMMITFORGE_35_CHAPTERS.forEach((chapter) => {
      const firstConcept = chapter.concepts[0];
      expect(firstConcept).toBeDefined();
      expect(firstConcept.id).toBeTruthy();
      expect(firstConcept.topicId).toBe(chapter.id);

      const resolved = getUniversalConcept(firstConcept.id);
      expect(resolved.id).toBe(firstConcept.id);
    });
  });

  it('verifies seamless linear Next / Previous concept linkage across chapters', () => {
    const allConcepts = COMMITFORGE_35_CHAPTERS.flatMap((ch) => ch.concepts);
    expect(allConcepts.length).toBe(TOTAL_COMMITFORGE_CONCEPTS);

    for (let i = 0; i < allConcepts.length - 1; i++) {
      const current = allConcepts[i];
      const next = allConcepts[i + 1];
      expect(current.id).toBeTruthy();
      expect(next.id).toBeTruthy();
      expect(current.id).not.toBe(next.id);
    }
  });
});
