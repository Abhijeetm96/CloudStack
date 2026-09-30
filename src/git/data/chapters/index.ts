import { AcademyTopic, UniversalConcept } from '../unifiedAcademyData';
import { PACK_01_CHAPTERS } from './pack01_git_foundations';
import { PACK_02_CHAPTERS } from './pack02_commits_history_branches';
import { PACK_03_CHAPTERS } from './pack03_collaboration_internals_triage';
import { PACK_04_CHAPTERS } from './pack04_cicd_foundations_actions';
import { PACK_05_CHAPTERS } from './pack05_docker_artifacts_security';
import { PACK_06_CHAPTERS } from './pack06_deployment_releases_advanced';
import { PACK_07_CHAPTERS } from './pack07_real_world_projects';

/**
 * GIT MASTER 35-CHAPTER CURRICULUM
 * 
 * Pack 01: Chapters 01 to 06 (Git Foundations, Setup, Repos, Tracking, Diff, Staging)
 * Pack 02: Chapters 07 to 12 (Commits, History, Undoing, Branches, Merging, Rebase)
 * Pack 03: Chapters 13 to 20 (Remotes, Pushing, Fetch/Pull, GitHub, Workflows, Advanced, Internals, Triage)
 * Pack 04: Chapters 21 to 24 (CI/CD Fundamentals, Pipelines, GitHub Actions, Practical CI)
 * Pack 05: Chapters 25 to 28 (Docker CI/CD, Artifacts & Registries, Security, Testing)
 * Pack 06: Chapters 29 to 34 (Deployment, Strategies, Releases, Troubleshooting, Advanced CI/CD, Production)
 * Pack 07: Chapter 35 (12 Real-World Projects)
 */
export const GIT_35_CHAPTERS: AcademyTopic[] = [
  ...PACK_01_CHAPTERS,
  ...PACK_02_CHAPTERS,
  ...PACK_03_CHAPTERS,
  ...PACK_04_CHAPTERS,
  ...PACK_05_CHAPTERS,
  ...PACK_06_CHAPTERS,
  ...PACK_07_CHAPTERS,
];

export const TOTAL_GIT_CHAPTERS = GIT_35_CHAPTERS.length;

// Pre-build index of all 481 concepts for O(1) retrieval
export const ALL_GIT_CONCEPTS: Record<string, UniversalConcept> = {};

for (const chapter of GIT_35_CHAPTERS) {
  for (const concept of chapter.concepts as any[]) {
    ALL_GIT_CONCEPTS[concept.id] = concept;
  }
}

export const TOTAL_GIT_CONCEPTS = Object.keys(ALL_GIT_CONCEPTS).length;

export function getGitConcept(conceptId: string): UniversalConcept | undefined {
  return ALL_GIT_CONCEPTS[conceptId];
}

export function findChapterForConcept(conceptId: string): AcademyTopic | undefined {
  return GIT_35_CHAPTERS.find((ch) => ch.concepts.some((c) => c.id === conceptId));
}

// Backward-compatibility aliases for open IDE tabs & buffers
export const COMMITFORGE_35_CHAPTERS = GIT_35_CHAPTERS;
export const TOTAL_COMMITFORGE_CHAPTERS = TOTAL_GIT_CHAPTERS;
export const ALL_COMMITFORGE_CONCEPTS = ALL_GIT_CONCEPTS;
export const TOTAL_COMMITFORGE_CONCEPTS = TOTAL_GIT_CONCEPTS;
export const getCommitForgeConcept = getGitConcept;

