import { describe, it, expect } from 'vitest';
import { GIT_35_CHAPTERS } from '../git/data/unifiedAcademyData';
import {
  getGitConceptIcon,
  getGitConceptIconComponent,
} from '../git/data/gitIcons';
import { getConceptIcon } from '../git/components/academy/academyIcons';
import { Compass, GitFork, GitCommit, GitBranch, Rocket, LucideIcon } from 'lucide-react';
import React from 'react';

describe('Git Academy Icon Uniqueness & Relevance Audit', () => {
  it('assigns specific relevant icons to core foundational concepts', () => {
    const ch1 = GIT_35_CHAPTERS[0];
    const c0101 = ch1.concepts.find((c) => c.id === 'c-01-01');
    expect(c0101).toBeDefined();

    const iconComp = getGitConceptIconComponent(c0101!);
    expect(iconComp).toBe(Compass);

    const ch10 = GIT_35_CHAPTERS.find((ch) => ch.id === 'ch-10');
    expect(ch10).toBeDefined();
    const branchConcept = ch10?.concepts.find((c) => c.command === 'git branch');
    expect(branchConcept).toBeDefined();
    const branchIcon = getGitConceptIconComponent(branchConcept!);
    expect(branchIcon).toBe(GitBranch);
  });

  it('guarantees Chapter 1 has 100% unique, non-repetitive icons across all subchapters', () => {
    const ch1 = GIT_35_CHAPTERS[0];
    expect(ch1.concepts.length).toBeGreaterThanOrEqual(10);

    const icons = ch1.concepts.map((c) => getGitConceptIconComponent(c));
    const uniqueIcons = new Set(icons);

    // Every single concept in chapter 1 has a unique, distinct icon
    expect(uniqueIcons.size).toBe(ch1.concepts.length);
  });

  it('provides a rich variety of at least 80 distinct Lucide icons across all 35 chapters', () => {
    const allIcons = new Set<LucideIcon>();

    GIT_35_CHAPTERS.forEach((ch) => {
      ch.concepts.forEach((concept) => {
        allIcons.add(getGitConceptIconComponent(concept));
      });
    });

    expect(allIcons.size).toBeGreaterThanOrEqual(80);
  });

  it('renders React elements cleanly via getGitConceptIcon and getConceptIcon', () => {
    const ch35 = GIT_35_CHAPTERS.find((ch) => ch.id === 'ch-35');
    const capstone1 = ch35?.concepts[0];
    expect(capstone1).toBeDefined();

    const el1 = getGitConceptIcon(capstone1!, 14, '#38bdf8');
    expect(React.isValidElement(el1)).toBe(true);

    const el2 = getConceptIcon('c-24-01', undefined, 14, '#c084fc');
    expect(React.isValidElement(el2)).toBe(true);
  });
});
