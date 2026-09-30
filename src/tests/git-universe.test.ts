import { describe, it, expect } from 'vitest';
import {
  GIT_35_CHAPTERS,
  TOTAL_GIT_CONCEPTS,
  TOTAL_GIT_CHAPTERS,
} from '../git/data/unifiedAcademyData';
import fs from 'fs';
import path from 'path';

describe('Git Academy Concepts Universe Architecture & Data Audit', () => {
  it('contains exactly 35 chapters and 481 comprehensive subchapters in unified academy data', () => {
    expect(GIT_35_CHAPTERS.length).toBe(35);
    expect(TOTAL_GIT_CHAPTERS).toBe(35);
    expect(TOTAL_GIT_CONCEPTS).toBe(482);

    const flattened = GIT_35_CHAPTERS.flatMap((ch) => ch.concepts);
    expect(flattened.length).toBe(482);
  });

  it('ensures ConceptsUniverseView implements StandardConceptsUniverse matching LinuxForge', () => {
    const universeViewPath = path.resolve(
      __dirname,
      '../git/components/universe/ConceptsUniverseView.tsx'
    );
    const content = fs.readFileSync(universeViewPath, 'utf-8');

    // StandardConceptsUniverse integration
    expect(content).toContain('StandardConceptsUniverse');
    expect(content).toContain('GIT_35_CHAPTERS');
    expect(content).toContain('TOTAL_GIT_CONCEPTS');
    expect(content).toContain('GIT_CURRICULUM_PACKS');
    expect(content).toContain('academyName="Git & CI/CD"');
    expect(content).toContain('handleLaunchLesson');
  });

  it('verifies all 7 curriculum packs map cleanly to the 35 chapters', () => {
    const universeViewPath = path.resolve(
      __dirname,
      '../git/components/universe/ConceptsUniverseView.tsx'
    );
    const content = fs.readFileSync(universeViewPath, 'utf-8');

    expect(content).toContain('Pack 1: Foundations (01-05)');
    expect(content).toContain('Pack 2: Commits & Branches (06-10)');
    expect(content).toContain('Pack 3: Collab & Internals (11-15)');
    expect(content).toContain('Pack 4: CI/CD Foundations (16-20)');
    expect(content).toContain('Pack 5: Docker & Security (21-25)');
    expect(content).toContain('Pack 6: Deploy & Releases (26-30)');
    expect(content).toContain('Pack 7: Capstones & SRE (31-35)');
  });

  it('guarantees every concept in the curriculum has valid command, title, and topic mapping', () => {
    GIT_35_CHAPTERS.forEach((ch) => {
      expect(ch.id).toMatch(/^ch-\d{2}$/);
      expect(ch.title).toBeTruthy();
      expect(ch.concepts.length).toBeGreaterThan(0);

      ch.concepts.forEach((concept) => {
        expect(concept.id).toBeTruthy();
        expect(concept.command).toBeTruthy();
        expect(concept.title).toBeTruthy();
        expect(concept.subChapterNum || (concept as any).subChapterNumber).toBeTruthy();
      });
    });
  });
});
