import { describe, it, expect } from 'vitest';
import { COMMITFORGE_35_CHAPTERS } from '../commitforge/data/unifiedAcademyData';
import {
  getCommitForgeConceptIcon,
  getCommitForgeConceptIconComponent,
} from '../commitforge/data/gitIcons';
import { getConceptIcon } from '../commitforge/components/academy/academyIcons';
import { Compass, GitFork, GitCommit, GitBranch, Rocket, LucideIcon } from 'lucide-react';
import React from 'react';

describe('CommitForge Icon Uniqueness & Relevance Audit', () => {
  it('assigns specific relevant icons to core foundational concepts', () => {
    const ch1 = COMMITFORGE_35_CHAPTERS[0];
    const c0101 = ch1.concepts.find((c) => c.id === 'c-01-01');
    expect(c0101).toBeDefined();

    const iconComp = getCommitForgeConceptIconComponent(c0101!);
    expect(iconComp).toBe(Compass);

    const ch10 = COMMITFORGE_35_CHAPTERS.find((ch) => ch.id === 'ch-10');
    expect(ch10).toBeDefined();
    const branchConcept = ch10?.concepts.find((c) => c.command === 'git branch');
    expect(branchConcept).toBeDefined();
    const branchIcon = getCommitForgeConceptIconComponent(branchConcept!);
    expect(branchIcon).toBe(GitBranch);
  });

  it('guarantees Chapter 1 has 100% unique, non-repetitive icons across all subchapters', () => {
    const ch1 = COMMITFORGE_35_CHAPTERS[0];
    expect(ch1.concepts.length).toBeGreaterThanOrEqual(10);

    const icons = ch1.concepts.map((c) => getCommitForgeConceptIconComponent(c));
    const uniqueIcons = new Set(icons);

    // Every single concept in chapter 1 has a unique, distinct icon
    expect(uniqueIcons.size).toBe(ch1.concepts.length);
  });

  it('provides a rich variety of at least 80 distinct Lucide icons across all 35 chapters', () => {
    const allIcons = new Set<LucideIcon>();

    COMMITFORGE_35_CHAPTERS.forEach((ch) => {
      ch.concepts.forEach((concept) => {
        allIcons.add(getCommitForgeConceptIconComponent(concept));
      });
    });

    expect(allIcons.size).toBeGreaterThanOrEqual(80);
  });

  it('renders React elements cleanly via getCommitForgeConceptIcon and getConceptIcon', () => {
    const ch35 = COMMITFORGE_35_CHAPTERS.find((ch) => ch.id === 'ch-35');
    const capstone1 = ch35?.concepts[0];
    expect(capstone1).toBeDefined();

    const el1 = getCommitForgeConceptIcon(capstone1!, 14, '#38bdf8');
    expect(React.isValidElement(el1)).toBe(true);

    const el2 = getConceptIcon('c-24-01', undefined, 14, '#c084fc');
    expect(React.isValidElement(el2)).toBe(true);
  });
});
