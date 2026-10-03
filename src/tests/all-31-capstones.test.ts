import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  ALL_CAPSTONES,
  TOTAL_CAPSTONE_PROJECTS,
  GIT_CAPSTONES,
  LINUX_CAPSTONES,
  DOCKER_CAPSTONES,
  DEVOPS_CAPSTONES,
  TERRAFORM_CAPSTONES,
  KUBERNETES_CAPSTONES,
  ULTIMATE_CAPSTONE,
  getCapstoneById,
  getCapstonesByAcademy,
  searchCapstones,
  filterCapstonesByDifficulty,
} from '../platform/capstones/data';
import {
  getAllCapstoneBriefProgress,
  getCapstoneBriefProgress,
  setCapstoneStatus,
  toggleChecklistItem,
  resetCapstoneBriefProgress,
  getCapstoneCompletionStats,
  getAllCapstoneProgress,
  getCapstoneProgress,
  markTaskComplete,
  submitCapstone,
  resetCapstoneProgress,
} from '../platform/capstones/capstoneProgress';

// In-memory mock for localStorage in Node/Vitest environment
const createMemoryStorage = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
};

const memoryStorage = createMemoryStorage();
vi.stubGlobal('localStorage', memoryStorage);
vi.stubGlobal('window', { localStorage: memoryStorage });

describe('Complete Capstone Project System Audit (All 61 Production-Grade Projects)', () => {
  beforeEach(() => {
    memoryStorage.clear();
  });

  describe('Global Project Count and Integrity', () => {
    it('verifies that exactly 61 capstones exist across the entire platform', () => {
      expect(TOTAL_CAPSTONE_PROJECTS).toBe(61);
      expect(ALL_CAPSTONES.length).toBe(61);
    });

    it('verifies all 61 capstone IDs and codes are completely unique', () => {
      const ids = ALL_CAPSTONES.map((c) => c.id);
      expect(new Set(ids).size).toBe(61);

      const codes = ALL_CAPSTONES.map((c) => c.code);
      expect(new Set(codes).size).toBe(61);
    });

    it('verifies every single capstone is retrievable by getCapstoneById using both id and code', () => {
      for (const capstone of ALL_CAPSTONES) {
        const byId = getCapstoneById(capstone.id);
        expect(byId, `Capstone ${capstone.id} must be found by id`).toBeDefined();
        expect(byId?.id).toBe(capstone.id);

        const byCode = getCapstoneById(capstone.code);
        expect(byCode, `Capstone ${capstone.code} must be found by code`).toBeDefined();
        expect(byCode?.code).toBe(capstone.code);
      }
    });
  });

  describe('Academy Distribution and Strict 10-Project Progression Verification', () => {
    it('verifies Git Academy has exactly 10 capstones (GIT-01 to GIT-10)', () => {
      expect(GIT_CAPSTONES.length).toBe(10);
      const expectedGitCodes = [
        'GIT-01', 'GIT-02', 'GIT-03', 'GIT-04', 'GIT-05',
        'GIT-06', 'GIT-07', 'GIT-08', 'GIT-09', 'GIT-10',
      ];
      const actualGitCodes = GIT_CAPSTONES.map((c) => c.code);
      expect(actualGitCodes).toEqual(expectedGitCodes);
      expect(getCapstonesByAcademy('git').length).toBe(10);
    });

    it('verifies Linux Academy has exactly 10 capstones (LINUX-01 to LINUX-10)', () => {
      expect(LINUX_CAPSTONES.length).toBe(10);
      const expectedLinuxCodes = [
        'LINUX-01', 'LINUX-02', 'LINUX-03', 'LINUX-04', 'LINUX-05',
        'LINUX-06', 'LINUX-07', 'LINUX-08', 'LINUX-09', 'LINUX-10',
      ];
      const actualLinuxCodes = LINUX_CAPSTONES.map((c) => c.code);
      expect(actualLinuxCodes).toEqual(expectedLinuxCodes);
      expect(getCapstonesByAcademy('linux').length).toBe(10);
    });

    it('verifies Docker Academy has exactly 10 capstones (DOCKER-01 to DOCKER-10)', () => {
      expect(DOCKER_CAPSTONES.length).toBe(10);
      const expectedDockerCodes = [
        'DOCKER-01', 'DOCKER-02', 'DOCKER-03', 'DOCKER-04', 'DOCKER-05',
        'DOCKER-06', 'DOCKER-07', 'DOCKER-08', 'DOCKER-09', 'DOCKER-10',
      ];
      const actualDockerCodes = DOCKER_CAPSTONES.map((c) => c.code);
      expect(actualDockerCodes).toEqual(expectedDockerCodes);
      expect(getCapstonesByAcademy('docker').length).toBe(10);
    });

    it('verifies DevOps Academy has exactly 10 capstones (DEVOPS-01 to DEVOPS-10)', () => {
      expect(DEVOPS_CAPSTONES.length).toBe(10);
      const expectedDevOpsCodes = [
        'DEVOPS-01', 'DEVOPS-02', 'DEVOPS-03', 'DEVOPS-04', 'DEVOPS-05',
        'DEVOPS-06', 'DEVOPS-07', 'DEVOPS-08', 'DEVOPS-09', 'DEVOPS-10',
      ];
      const actualDevOpsCodes = DEVOPS_CAPSTONES.map((c) => c.code);
      expect(actualDevOpsCodes).toEqual(expectedDevOpsCodes);
      expect(getCapstonesByAcademy('devops').length).toBe(10);
    });

    it('verifies Terraform Academy has exactly 10 capstones (TERRAFORM-01 to TERRAFORM-10)', () => {
      expect(TERRAFORM_CAPSTONES.length).toBe(10);
      const expectedTfCodes = [
        'TERRAFORM-01', 'TERRAFORM-02', 'TERRAFORM-03', 'TERRAFORM-04', 'TERRAFORM-05',
        'TERRAFORM-06', 'TERRAFORM-07', 'TERRAFORM-08', 'TERRAFORM-09', 'TERRAFORM-10',
      ];
      const actualTfCodes = TERRAFORM_CAPSTONES.map((c) => c.code);
      expect(actualTfCodes).toEqual(expectedTfCodes);
      expect(getCapstonesByAcademy('terraform').length).toBe(10);
    });

    it('verifies Kubernetes Academy has exactly 10 capstones (K8S-01 to K8S-10)', () => {
      expect(KUBERNETES_CAPSTONES.length).toBe(10);
      const expectedK8sCodes = [
        'K8S-01', 'K8S-02', 'K8S-03', 'K8S-04', 'K8S-05',
        'K8S-06', 'K8S-07', 'K8S-08', 'K8S-09', 'K8S-10',
      ];
      const actualK8sCodes = KUBERNETES_CAPSTONES.map((c) => c.code);
      expect(actualK8sCodes).toEqual(expectedK8sCodes);
      expect(getCapstonesByAcademy('kubernetes').length).toBe(10);
    });

    it('verifies Ultimate Cross-Academy Capstone exists (ULTIMATE-01)', () => {
      expect(ULTIMATE_CAPSTONE).toBeDefined();
      expect(ULTIMATE_CAPSTONE.code).toBe('ULTIMATE-01');
      expect(ULTIMATE_CAPSTONE.title).toBe('Production Platform');
      expect(getCapstonesByAcademy('cross-academy').length).toBe(1);
    });
  });

  describe('Standard 22-Section Professional Project Brief Audit (Zero-Placeholder Invariant)', () => {
    it('verifies that all 61 capstones contain all 22 required brief sections with zero placeholders', () => {
      for (const p of ALL_CAPSTONES) {
        // Section 1: Project Overview
        expect(p.title.trim().length, `${p.code} must have a valid title`).toBeGreaterThan(5);
        expect(p.overview.trim().length, `${p.code} must have an overview`).toBeGreaterThan(20);
        expect(p.projectOverview, `${p.code} must have projectOverview object`).toBeDefined();
        expect(p.projectOverview?.projectName).toBe(p.title);
        expect(p.projectOverview?.academy).toBe(p.academy);
        expect(p.projectOverview?.difficulty).toBe(p.difficulty);
        expect(p.projectOverview?.technologies.length, `${p.code} technologies`).toBeGreaterThanOrEqual(1);

        // Section 2: Real-World Scenario
        expect(p.scenario, `${p.code} must have a scenario`).toBeDefined();
        expect(p.scenario!.trim().length, `${p.code} scenario must be substantial`).toBeGreaterThan(20);

        // Section 3: Problem Statement
        expect(p.problemStatement, `${p.code} must have a problemStatement`).toBeDefined();
        expect(p.problemStatement!.trim().length, `${p.code} problemStatement must be substantial`).toBeGreaterThan(20);

        // Section 4: Project Objective
        const objectives = p.projectObjective || p.objectives || [];
        expect(objectives.length, `${p.code} must have at least 3 objectives`).toBeGreaterThanOrEqual(3);

        // Section 5: What You Need To Build
        expect(p.whatYouNeedToBuild, `${p.code} must have whatYouNeedToBuild`).toBeDefined();
        expect(p.whatYouNeedToBuild!.description.length, `${p.code} whatYouNeedToBuild description`).toBeGreaterThan(15);
        expect(p.whatYouNeedToBuild!.diagram?.length, `${p.code} whatYouNeedToBuild diagram`).toBeGreaterThan(15);

        // Section 6: Requirements
        expect(p.requirements, `${p.code} must have requirements`).toBeDefined();
        const reqObj = typeof p.requirements === 'object' && !Array.isArray(p.requirements) ? p.requirements : null;
        if (reqObj) {
          expect(reqObj.functional.length, `${p.code} functional requirements`).toBeGreaterThanOrEqual(1);
          expect(reqObj.technical.length, `${p.code} technical requirements`).toBeGreaterThanOrEqual(1);
          expect(reqObj.security.length, `${p.code} security requirements`).toBeGreaterThanOrEqual(1);
        }

        // Section 7: Architecture
        expect(p.architecture, `${p.code} must have architecture`).toBeDefined();
        expect(p.architecture.summary.length, `${p.code} architecture summary`).toBeGreaterThan(20);
        expect(p.architecture.diagram || p.whatYouNeedToBuild?.diagram, `${p.code} architecture diagram`).toBeDefined();

        // Section 8: Technology Requirements
        expect(p.technologyRequirements, `${p.code} must have technologyRequirements`).toBeDefined();
        expect(p.technologyRequirements!.required.length, `${p.code} required technologies`).toBeGreaterThanOrEqual(1);
        expect(p.technologyRequirements!.optional.length, `${p.code} optional technologies`).toBeGreaterThanOrEqual(1);
        expect(p.technologyRequirements!.outOfScope.length, `${p.code} outOfScope technologies`).toBeGreaterThanOrEqual(1);

        // Section 9: Functional Requirements
        expect(p.functionalRequirements?.length, `${p.code} functionalRequirements`).toBeGreaterThanOrEqual(3);

        // Section 10: Technical Requirements
        expect(p.technicalRequirements?.length, `${p.code} technicalRequirements`).toBeGreaterThanOrEqual(2);

        // Section 11: Security Requirements
        expect(p.securityRequirements?.length, `${p.code} securityRequirements`).toBeGreaterThanOrEqual(1);

        // Section 12: Constraints
        expect(p.constraints?.length, `${p.code} constraints`).toBeGreaterThanOrEqual(2);

        // Section 13: Expected Outcome
        expect(p.expectedOutcome.length, `${p.code} expectedOutcome`).toBeGreaterThan(20);

        // Section 14: Deliverables
        expect(p.deliverables?.length, `${p.code} deliverables`).toBeGreaterThanOrEqual(3);

        // Section 15: Suggested Project Structure
        expect(p.suggestedProjectStructure?.length, `${p.code} suggestedProjectStructure`).toBeGreaterThan(15);

        // Section 16: Required Concepts
        expect(p.requiredConcepts?.length, `${p.code} requiredConcepts`).toBeGreaterThanOrEqual(2);
        p.requiredConcepts?.forEach((c) => {
          expect(c.name).toBeTruthy();
          expect(c.lessonId).toBeTruthy();
          expect(c.academyRoute).toBeTruthy();
        });

        // Section 17: Resources
        expect(p.resources, `${p.code} must have resources`).toBeDefined();
        expect(p.resources!.academyLessons.length, `${p.code} academyLessons`).toBeGreaterThanOrEqual(1);
        expect(p.resources!.officialDocs.length, `${p.code} officialDocs`).toBeGreaterThanOrEqual(1);
        expect(p.resources!.referenceMaterial.length, `${p.code} referenceMaterial`).toBeGreaterThanOrEqual(1);
        expect(p.resources!.usefulCommands.length, `${p.code} usefulCommands`).toBeGreaterThanOrEqual(2);

        // Section 18: Recommended Approach
        expect(p.recommendedApproach?.length, `${p.code} recommendedApproach`).toBeGreaterThanOrEqual(5);

        // Section 19: Important Considerations
        expect(p.importantConsiderations?.length, `${p.code} importantConsiderations`).toBeGreaterThanOrEqual(2);

        // Section 20: Common Pitfalls
        expect(p.commonPitfalls?.length, `${p.code} commonPitfalls`).toBeGreaterThanOrEqual(2);

        // Section 21: Optional Enhancements
        expect(p.optionalEnhancements, `${p.code} optionalEnhancements`).toBeDefined();
        expect(p.optionalEnhancements!.beginner.length, `${p.code} beginner enhancements`).toBeGreaterThanOrEqual(1);
        expect(p.optionalEnhancements!.intermediate.length, `${p.code} intermediate enhancements`).toBeGreaterThanOrEqual(1);
        expect(p.optionalEnhancements!.advanced.length, `${p.code} advanced enhancements`).toBeGreaterThanOrEqual(1);
        expect(p.optionalEnhancements!.expert.length, `${p.code} expert enhancements`).toBeGreaterThanOrEqual(1);

        // Section 22: Completion Checklist
        expect(p.completionChecklist?.length, `${p.code} completionChecklist`).toBeGreaterThanOrEqual(5);

        // Zero-Placeholder check
        const textToAudit = `${p.title} ${p.overview} ${p.scenario} ${p.problemStatement} ${p.expectedOutcome}`.toLowerCase();
        expect(textToAudit).not.toContain('coming soon');
        expect(textToAudit).not.toContain('tbd');
        expect(textToAudit).not.toContain('lorem ipsum');
      }
    });
  });

  describe('Search, Difficulty Filtering, and Progression', () => {
    it('searches capstones by keyword successfully', () => {
      const gitResults = searchCapstones('git');
      expect(gitResults.length).toBeGreaterThanOrEqual(10);

      const k8sResults = searchCapstones('kubernetes');
      expect(k8sResults.length).toBeGreaterThanOrEqual(10);

      const dockerResults = searchCapstones('docker');
      expect(dockerResults.length).toBeGreaterThanOrEqual(10);

      const tfResults = searchCapstones('terraform');
      expect(tfResults.length).toBeGreaterThanOrEqual(10);
    });

    it('filters capstones by difficulty tier accurately summing to 61', () => {
      const beginners = filterCapstonesByDifficulty('Beginner');
      const beginnersPlus = filterCapstonesByDifficulty('Beginner+');
      const lowerIntermediates = filterCapstonesByDifficulty('Lower Intermediate');
      const intermediates = filterCapstonesByDifficulty('Intermediate');
      const intermediatesPlus = filterCapstonesByDifficulty('Intermediate+');
      const advanced = filterCapstonesByDifficulty('Advanced');
      const advancedPlus = filterCapstonesByDifficulty('Advanced+');
      const experts = filterCapstonesByDifficulty('Expert');
      const expertProduction = filterCapstonesByDifficulty('Expert / Production');
      const productionGrade = filterCapstonesByDifficulty('Production Grade');

      const allFiltered = [
        ...beginners,
        ...beginnersPlus,
        ...lowerIntermediates,
        ...intermediates,
        ...intermediatesPlus,
        ...advanced,
        ...advancedPlus,
        ...experts,
        ...expertProduction,
        ...productionGrade,
      ];

      expect(beginners.length).toBeGreaterThan(0);
      expect(intermediates.length).toBeGreaterThan(0);
      expect(advanced.length).toBeGreaterThan(0);
      expect(experts.length).toBeGreaterThan(0);
      expect(productionGrade.length).toBeGreaterThan(0);

      expect(allFiltered.length).toBe(61);
    });
  });

  describe('Learner-Controlled Progress and Self-Check Checklist Persistence', () => {
    it('manages learner status (not_started, in_progress, completed) and checklist items', () => {
      const capstone = GIT_CAPSTONES[0];

      // Initially not_started
      const initial = getCapstoneBriefProgress(capstone.id);
      expect(initial.status).toBe('not_started');
      expect(initial.checkedChecklistIndices.length).toBe(0);

      // Start project
      const inProgress = setCapstoneStatus(capstone.id, 'in_progress');
      expect(inProgress.status).toBe('in_progress');
      expect(inProgress.startedAt).toBeDefined();

      // Toggle checklist items
      const afterCheck0 = toggleChecklistItem(capstone.id, 0);
      expect(afterCheck0.checkedChecklistIndices).toContain(0);

      const afterCheck1 = toggleChecklistItem(capstone.id, 1);
      expect(afterCheck1.checkedChecklistIndices).toEqual([0, 1]);

      // Uncheck item 0
      const afterUncheck0 = toggleChecklistItem(capstone.id, 0);
      expect(afterUncheck0.checkedChecklistIndices).toEqual([1]);

      // Mark completed
      const completed = setCapstoneStatus(capstone.id, 'completed');
      expect(completed.status).toBe('completed');
      expect(completed.completedAt).toBeDefined();

      // Check stats
      const stats = getCapstoneCompletionStats([capstone.id]);
      expect(stats.total).toBe(1);
      expect(stats.completed).toBe(1);
      expect(stats.percentage).toBe(100);

      // Reset
      const reset = resetCapstoneBriefProgress(capstone.id);
      expect(reset.status).toBe('not_started');
      expect(reset.checkedChecklistIndices.length).toBe(0);
    });
  });
});
