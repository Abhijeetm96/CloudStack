import { describe, it, expect } from 'vitest';
import { LINUX_15_TOPICS, getLinuxConceptById } from '../linuxforge/data/topics';

describe('LinuxForge Chapter & Sub-Chapter Navigation Audit', () => {
  it('verifies every single chapter (01 to 30) contains valid sub-chapters with IDs and titles', () => {
    expect(LINUX_15_TOPICS.length).toBe(30);

    LINUX_15_TOPICS.forEach((chapter) => {
      expect(chapter.concepts.length).toBeGreaterThan(0);
      chapter.concepts.forEach((concept) => {
        expect(concept.id).toBeTruthy();
        expect(concept.title).toBeTruthy();
        expect(concept.command).toBeTruthy();
        expect(concept.subChapterNumber).toBeTruthy();
        expect(concept.topicId).toBe(chapter.id);

        // Verify resolver can lookup this concept cleanly
        const resolved = getLinuxConceptById(concept.id);
        expect(resolved).toBeDefined();
        expect(resolved?.id).toBe(concept.id);
      });
    });
  });

  it('verifies each chapter can resolve its first concept cleanly', () => {
    LINUX_15_TOPICS.forEach((chapter) => {
      const firstConcept = chapter.concepts[0];
      expect(firstConcept).toBeDefined();
      expect(firstConcept.id.startsWith('c-')).toBe(true);
    });
  });

  it('verifies concept switching resolves the correct parent topic', () => {
    const c0108 = getLinuxConceptById('c-01-08');
    expect(c0108?.topicId).toBe('ch-01');

    const c0201 = getLinuxConceptById('c-02-01');
    expect(c0201?.topicId).toBe('ch-02');

    const c1501 = getLinuxConceptById('c-15-01');
    expect(c1501?.topicId).toBe('ch-15');
  });
});
