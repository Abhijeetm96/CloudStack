import { describe, it, expect } from 'vitest';
import { LINUX_30_CHAPTERS, ALL_LINUX_CONCEPTS, TOTAL_LINUX_CONCEPTS } from '../linuxforge/data/topics';

describe('LinuxForge Concept Universe Count Audit', () => {
  it('counts all chapters and concepts in LinuxForge', () => {
    console.log('Chapters count:', LINUX_30_CHAPTERS.length);
    console.log('ALL_LINUX_CONCEPTS count:', ALL_LINUX_CONCEPTS.length);
    console.log('TOTAL_LINUX_CONCEPTS:', TOTAL_LINUX_CONCEPTS);
    
    let total = 0;
    LINUX_30_CHAPTERS.forEach((ch, idx) => {
      console.log(`Ch ${idx + 1} (${ch.number} - ${ch.title}): ${ch.concepts.length} concepts`);
      total += ch.concepts.length;
    });
    console.log('Sum of ch concepts:', total);
    expect(total).toBe(TOTAL_LINUX_CONCEPTS);
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

    console.log('Unique difficulties:', Array.from(difficulties));
    console.log('Mismatched topic IDs count:', mismatchedTopicIds.length);
    if (mismatchedTopicIds.length > 0) {
      console.log('Sample mismatches:', mismatchedTopicIds.slice(0, 10));
    }

    expect(mismatchedTopicIds).toEqual([]);
    expect(missingFields).toEqual([]);
  });
});
