import { describe, it, expect } from 'vitest';
import { LINUX_30_CHAPTERS, ALL_LINUX_CONCEPTS, TOTAL_LINUX_CONCEPTS } from '../linuxforge/data/topics';

describe('LinuxForge Concept Universe Count Audit', () => {
  it('counts all chapters and concepts in LinuxForge', () => {
    let total = 0;
    LINUX_30_CHAPTERS.forEach((ch) => {
      total += ch.concepts.length;
    });
    expect(total).toBe(TOTAL_LINUX_CONCEPTS);
    expect(ALL_LINUX_CONCEPTS.length).toBe(TOTAL_LINUX_CONCEPTS);
  });

  it('checks topicId matching and difficulties across all concepts', () => {
    const difficulties = new Set<string>();
    const mismatchedTopicIds: string[] = [];
    const missingFields: string[] = [];

    LINUX_30_CHAPTERS.forEach((ch) => {
      ch.concepts.forEach((c) => {
        difficulties.add(c.difficulty);
        if (c.topicId !== ch.id) {
          mismatchedTopicIds.push(`${c.id}: c.topicId=${c.topicId} !== ch.id=${ch.id}`);
        }
        if (!c.id || !c.command || !c.title) {
          missingFields.push(`${c.id || 'unknown'}: missing basic fields`);
        }
      });
    });

    expect(difficulties.size).toBeGreaterThan(0);
    expect(mismatchedTopicIds).toEqual([]);
    expect(missingFields).toEqual([]);
  });
});
