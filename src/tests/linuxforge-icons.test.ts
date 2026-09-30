import { describe, it, expect } from 'vitest';
import { LINUX_15_TOPICS } from '../linuxforge/data/topics';
import { getLinuxConceptIcon } from '../linuxforge/data/linuxIcons';
import { Scale, FileText } from 'lucide-react';

describe('LinuxForge Icon Uniqueness & Relevance Audit', () => {
  it('assigns the Scale icon to c-01-08 (Open Source and Linux) instead of generic FileText', () => {
    const ch1 = LINUX_15_TOPICS[0];
    const c0108 = ch1.concepts.find((c) => c.id === 'c-01-08');
    expect(c0108).toBeDefined();

    const icon = getLinuxConceptIcon(c0108!);
    expect(icon).toBe(Scale);
    expect(icon).not.toBe(FileText);
  });

  it('guarantees Chapter 1 has 100% unique, non-repetitive icons across all 12 concepts', () => {
    const ch1 = LINUX_15_TOPICS[0];
    expect(ch1.concepts.length).toBe(12);

    const icons = ch1.concepts.map((c) => getLinuxConceptIcon(c));
    const uniqueIcons = new Set(icons);

    // Every single concept in chapter 1 has a unique icon
    expect(uniqueIcons.size).toBe(12);
  });

  it('provides a rich variety of at least 70 distinct icons across the entire curriculum', () => {
    const allIcons = new Set<any>();

    LINUX_15_TOPICS.forEach((topic) => {
      topic.concepts.forEach((concept) => {
        allIcons.add(getLinuxConceptIcon(concept));
      });
    });

    expect(allIcons.size).toBeGreaterThanOrEqual(70);
  });
});
