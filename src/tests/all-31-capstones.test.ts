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
  getAllCapstoneProgress,
  getCapstoneProgress,
  markTaskComplete,
  markTaskIncomplete,
  markFailureResolved,
  submitCapstone,
  resetCapstoneProgress,
  getCapstoneCompletionStats,
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

describe('Complete Capstone Project System Audit (All 31 Projects)', () => {
  beforeEach(() => {
    memoryStorage.clear();
  });

  describe('Global Project Count and Integrity', () => {
    it('verifies that exactly 31 capstones exist across the entire platform', () => {
      expect(TOTAL_CAPSTONE_PROJECTS).toBe(31);
      expect(ALL_CAPSTONES.length).toBe(31);
    });

    it('verifies all 31 capstone IDs and codes are completely unique', () => {
      const ids = ALL_CAPSTONES.map((c) => c.id);
      expect(new Set(ids).size).toBe(31);

      const codes = ALL_CAPSTONES.map((c) => c.code);
      expect(new Set(codes).size).toBe(31);
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

  describe('Academy Distribution and Project Identity Verification', () => {
    it('verifies Git Academy has exactly 4 capstones (GIT-01 to GIT-04)', () => {
      expect(GIT_CAPSTONES.length).toBe(4);
      const expectedGitCodes = ['GIT-01', 'GIT-02', 'GIT-03', 'GIT-04'];
      const actualGitCodes = GIT_CAPSTONES.map((c) => c.code);
      expect(actualGitCodes).toEqual(expectedGitCodes);
      expect(getCapstonesByAcademy('git').length).toBe(4);
    });

    it('verifies Linux Academy has exactly 5 capstones (LINUX-01 to LINUX-05)', () => {
      expect(LINUX_CAPSTONES.length).toBe(5);
      const expectedLinuxCodes = ['LINUX-01', 'LINUX-02', 'LINUX-03', 'LINUX-04', 'LINUX-05'];
      const actualLinuxCodes = LINUX_CAPSTONES.map((c) => c.code);
      expect(actualLinuxCodes).toEqual(expectedLinuxCodes);
      expect(getCapstonesByAcademy('linux').length).toBe(5);
    });

    it('verifies Docker Academy has exactly 5 capstones (DOCKER-01 to DOCKER-05)', () => {
      expect(DOCKER_CAPSTONES.length).toBe(5);
      const expectedDockerCodes = ['DOCKER-01', 'DOCKER-02', 'DOCKER-03', 'DOCKER-04', 'DOCKER-05'];
      const actualDockerCodes = DOCKER_CAPSTONES.map((c) => c.code);
      expect(actualDockerCodes).toEqual(expectedDockerCodes);
      expect(getCapstonesByAcademy('docker').length).toBe(5);
    });

    it('verifies DevOps Academy has exactly 5 capstones (DEVOPS-01 to DEVOPS-05)', () => {
      expect(DEVOPS_CAPSTONES.length).toBe(5);
      const expectedDevOpsCodes = ['DEVOPS-01', 'DEVOPS-02', 'DEVOPS-03', 'DEVOPS-04', 'DEVOPS-05'];
      const actualDevOpsCodes = DEVOPS_CAPSTONES.map((c) => c.code);
      expect(actualDevOpsCodes).toEqual(expectedDevOpsCodes);
      expect(getCapstonesByAcademy('devops').length).toBe(5);
    });

    it('verifies Terraform Academy has exactly 5 capstones (TERRAFORM-01 to TERRAFORM-05)', () => {
      expect(TERRAFORM_CAPSTONES.length).toBe(5);
      const expectedTfCodes = ['TERRAFORM-01', 'TERRAFORM-02', 'TERRAFORM-03', 'TERRAFORM-04', 'TERRAFORM-05'];
      const actualTfCodes = TERRAFORM_CAPSTONES.map((c) => c.code);
      expect(actualTfCodes).toEqual(expectedTfCodes);
      expect(getCapstonesByAcademy('terraform').length).toBe(5);
    });

    it('verifies Kubernetes Academy has exactly 6 capstones (K8S-01 to K8S-06)', () => {
      expect(KUBERNETES_CAPSTONES.length).toBe(6);
      const expectedK8sCodes = ['K8S-01', 'K8S-02', 'K8S-03', 'K8S-04', 'K8S-05', 'K8S-06'];
      const actualK8sCodes = KUBERNETES_CAPSTONES.map((c) => c.code);
      expect(actualK8sCodes).toEqual(expectedK8sCodes);
      expect(getCapstonesByAcademy('kubernetes').length).toBe(6);
    });

    it('verifies Ultimate Cross-Academy Capstone exists (ULTIMATE-01)', () => {
      expect(ULTIMATE_CAPSTONE).toBeDefined();
      expect(ULTIMATE_CAPSTONE.code).toBe('ULTIMATE-01');
      expect(ULTIMATE_CAPSTONE.title).toBe('Production Platform');
      expect(getCapstonesByAcademy('cross-academy').length).toBe(1);
    });
  });

  describe('Zero-Placeholder Quality and Pedagogy Audit', () => {
    it('verifies that no capstone contains placeholders, empty arrays, or placeholder text', () => {
      for (const p of ALL_CAPSTONES) {
        expect(p.title.trim().length, `${p.code} must have a valid title`).toBeGreaterThan(5);
        expect(p.overview.trim().length, `${p.code} must have a rich overview`).toBeGreaterThan(20);
        expect(p.startingState.description.trim().length, `${p.code} must have starting state documentation`).toBeGreaterThan(20);
        expect(p.startingState.environment.trim().length, `${p.code} must have an environment name`).toBeGreaterThan(5);
        expect(p.expectedOutcome.trim().length, `${p.code} must have expected outcome documentation`).toBeGreaterThan(20);

        // Disallow placeholder keywords
        const allText = `${p.title} ${p.overview} ${p.startingState.description} ${p.expectedOutcome}`.toLowerCase();
        expect(allText).not.toContain('coming soon');
        expect(allText).not.toContain('tbd');
        expect(allText).not.toContain('lorem ipsum');

        // Objectives
        expect(p.objectives.length, `${p.code} must have at least 3 objectives`).toBeGreaterThanOrEqual(3);
        p.objectives.forEach((obj, idx) => {
          expect(obj.trim().length, `${p.code} objective ${idx + 1} must be non-empty`).toBeGreaterThan(10);
        });

        // Requirements
        expect(p.requirements.length, `${p.code} must have at least 2 requirements`).toBeGreaterThanOrEqual(2);

        // Architecture
        expect(p.architecture.nodes.length, `${p.code} must have at least 3 architecture nodes`).toBeGreaterThanOrEqual(3);
        p.architecture.nodes.forEach((node) => {
          expect(node.id, `${p.code} architecture node must have an id`).toBeTruthy();
          expect(node.name, `${p.code} architecture node must have a name`).toBeTruthy();
          expect(node.role, `${p.code} architecture node must have a role`).toBeTruthy();
          expect(node.description, `${p.code} architecture node must have a description`).toBeTruthy();
        });

        // Tasks
        expect(p.tasks.length, `${p.code} must have at least 3 tasks`).toBeGreaterThanOrEqual(3);
        p.tasks.forEach((task, tIdx) => {
          expect(task.id, `${p.code} task ${tIdx} must have an ID`).toBeTruthy();
          expect(task.title.length, `${p.code} task ${task.id} title`).toBeGreaterThan(5);
          expect(task.objective.length, `${p.code} task ${task.id} objective`).toBeGreaterThan(10);
          expect(task.commandSnippet.length, `${p.code} task ${task.id} must have real commandSnippet`).toBeGreaterThan(5);
          expect(task.expectedOutput.length, `${p.code} task ${task.id} expected output`).toBeGreaterThan(5);
          expect(task.hints.length, `${p.code} task ${task.id} hints`).toBeGreaterThanOrEqual(1);
          expect(task.verificationCriteria.length, `${p.code} task ${task.id} verification criteria`).toBeGreaterThan(5);
          expect(task.explanation.length, `${p.code} task ${task.id} explanation`).toBeGreaterThan(10);
        });

        // Failure Scenarios & Troubleshooting
        expect(p.failureScenarios.length, `${p.code} must have failure scenarios`).toBeGreaterThanOrEqual(1);
        p.failureScenarios.forEach((fs) => {
          expect(fs.id, `${p.code} failure scenario id`).toBeTruthy();
          expect(fs.title.length, `${p.code} failure scenario title`).toBeGreaterThan(5);
          expect(fs.symptom.length, `${p.code} failure scenario symptom`).toBeGreaterThan(10);
          expect(fs.rootCause.length, `${p.code} failure scenario rootCause`).toBeGreaterThan(10);
          expect(fs.diagnosticCommand.length, `${p.code} failure scenario diagnosticCommand`).toBeGreaterThan(3);
          expect(fs.fixCommand.length, `${p.code} failure scenario fixCommand`).toBeGreaterThan(3);
          expect(fs.verification.length, `${p.code} failure scenario verification`).toBeGreaterThan(5);
          expect(fs.preventativeMeasures.length, `${p.code} failure scenario preventativeMeasures`).toBeGreaterThan(10);
        });

        // Automated Validation Checks
        expect(p.validationChecks.length, `${p.code} must have automated validation checks`).toBeGreaterThanOrEqual(3);
        p.validationChecks.forEach((vc) => {
          expect(vc.id, `${p.code} validation check id`).toBeTruthy();
          expect(vc.label.length, `${p.code} validation check label`).toBeGreaterThan(5);
          expect(vc.verificationCommand.length, `${p.code} validation check verificationCommand`).toBeGreaterThan(3);
          expect(vc.points, `${p.code} validation check points`).toBeGreaterThan(0);
        });

        // Mathematical Consistency: Points sum to 100 maxScore
        const checkPointsSum = p.validationChecks.reduce((sum, c) => sum + c.points, 0);
        expect(p.scoreMax, `${p.code} scoreMax must be 100`).toBe(100);
        expect(checkPointsSum, `${p.code} sum of validation check points must equal scoreMax 100`).toBe(100);
      }
    });
  });

  describe('Special Scenario Invariants', () => {
    it('verifies LINUX-04 is a comprehensive 8-problem troubleshooting lab', () => {
      const linux04 = getCapstoneById('LINUX-04')!;
      expect(linux04).toBeDefined();
      expect(linux04.tasks.length).toBe(8);

      const taskTitles = linux04.tasks.map((t) => t.title.toLowerCase());
      expect(taskTitles.some((t) => t.includes('cpu runaway'))).toBe(true);
      expect(taskTitles.some((t) => t.includes('memory exhaustion'))).toBe(true);
      expect(taskTitles.some((t) => t.includes('disk consuming'))).toBe(true);
      expect(taskTitles.some((t) => t.includes('systemd database service'))).toBe(true);
      expect(taskTitles.some((t) => t.includes('port 8080 conflict'))).toBe(true);
      expect(taskTitles.some((t) => t.includes('permissions on /tmp'))).toBe(true);
      expect(taskTitles.some((t) => t.includes('dns resolver'))).toBe(true);
      expect(taskTitles.some((t) => t.includes('zombie process'))).toBe(true);
    });

    it('verifies DOCKER-04 contains all 7 requested diagnosis tools in tasks and commands', () => {
      const docker04 = getCapstoneById('DOCKER-04')!;
      expect(docker04).toBeDefined();
      expect(docker04.tasks.length).toBe(7);

      const allCommands = docker04.tasks.map((t) => t.commandSnippet).join(' ');
      expect(allCommands).toContain('docker ps');
      expect(allCommands).toContain('docker logs');
      expect(allCommands).toContain('docker inspect');
      expect(allCommands).toContain('docker exec');
      expect(allCommands).toContain('docker stats');
      expect(allCommands).toContain('docker network');
      expect(allCommands).toContain('docker volume');
    });

    it('verifies K8S-04 contains all 9 requested Kubernetes failure scenarios as tasks', () => {
      const k8s04 = getCapstoneById('K8S-04')!;
      expect(k8s04).toBeDefined();
      expect(k8s04.tasks.length).toBe(9);

      const titles = k8s04.tasks.map((t) => t.title.toLowerCase()).join(' ');
      expect(titles).toContain('crashloopbackoff');
      expect(titles).toContain('imagepullbackoff');
      expect(titles).toContain('pending pod');
      expect(titles).toContain('readiness probe');
      expect(titles).toContain('liveness probe');
      expect(titles).toContain('service connectivity');
      expect(titles).toContain('dns failure');
      expect(titles).toContain('insufficient resources');
      expect(titles).toContain('configuration');
    });

    it('verifies ULTIMATE-01 has the complete 10-Incident Challenge', () => {
      const ultimate = ULTIMATE_CAPSTONE;
      expect(ultimate).toBeDefined();
      expect(ultimate.failureScenarios.length).toBe(10);

      const scenarioTitles = ultimate.failureScenarios.map((fs) => fs.title.toLowerCase());
      expect(scenarioTitles.some((s) => s.includes('bad docker image'))).toBe(true);
      expect(scenarioTitles.some((s) => s.includes('broken kubernetes deployment'))).toBe(true);
      expect(scenarioTitles.some((s) => s.includes('incorrect environment variable'))).toBe(true);
      expect(scenarioTitles.some((s) => s.includes('failed healthcheck probe'))).toBe(true);
      expect(scenarioTitles.some((s) => s.includes('broken service'))).toBe(true);
      expect(scenarioTitles.some((s) => s.includes('database connectivity failure'))).toBe(true);
      expect(scenarioTitles.some((s) => s.includes('terraform state drift'))).toBe(true);
      expect(scenarioTitles.some((s) => s.includes('git merge disaster'))).toBe(true);
      expect(scenarioTitles.some((s) => s.includes('ci pipeline failure'))).toBe(true);
      expect(scenarioTitles.some((s) => s.includes('resource exhaustion'))).toBe(true);
    });
  });

  describe('Search, Difficulty Filtering, and Progression', () => {
    it('searches capstones by keyword successfully', () => {
      const gitResults = searchCapstones('git');
      expect(gitResults.length).toBeGreaterThanOrEqual(4);

      const k8sResults = searchCapstones('kubernetes');
      expect(k8sResults.length).toBeGreaterThanOrEqual(6);

      const disasterResults = searchCapstones('disaster recovery');
      expect(disasterResults.length).toBeGreaterThanOrEqual(1);
    });

    it('filters capstones by difficulty tier accurately', () => {
      const beginners = filterCapstonesByDifficulty('Beginner');
      const intermediates = filterCapstonesByDifficulty('Intermediate');
      const advanced = filterCapstonesByDifficulty('Advanced');
      const production = filterCapstonesByDifficulty('Production');
      const experts = filterCapstonesByDifficulty('Expert');

      expect(beginners.length).toBeGreaterThan(0);
      expect(intermediates.length).toBeGreaterThan(0);
      expect(advanced.length).toBeGreaterThan(0);
      expect(production.length).toBeGreaterThan(0);
      expect(experts.length).toBeGreaterThan(0);

      expect(beginners.length + intermediates.length + advanced.length + production.length + experts.length).toBe(31);
    });
  });

  describe('Progress Persistence and Score Calculation', () => {
    it('manages task completion, scenario resolution, and score updates in localStorage', () => {
      const capstone = GIT_CAPSTONES[0];
      const taskId = capstone.tasks[0].id;

      // Initially empty
      const initial = getCapstoneProgress(capstone.id);
      expect(initial.completed).toBe(false);
      expect(initial.completedTasks.length).toBe(0);

      // Complete first task
      const afterTask = markTaskComplete(capstone.id, taskId);
      expect(afterTask.completedTasks).toContain(taskId);

      // Mark failure resolved
      const scenarioId = capstone.failureScenarios[0].id;
      const afterScenario = markFailureResolved(capstone.id, scenarioId);
      expect(afterScenario.resolvedFailures).toContain(scenarioId);

      // Submit capstone
      const allTaskIds = capstone.tasks.map((t) => t.id);
      const afterSubmit = submitCapstone(capstone.id, 100, allTaskIds);
      expect(afterSubmit.completed).toBe(true);
      expect(afterSubmit.score).toBe(100);

      // Check completion stats
      const stats = getCapstoneCompletionStats([capstone.id]);
      expect(stats.total).toBe(1);
      expect(stats.completed).toBe(1);
      expect(stats.percentage).toBe(100);
      expect(stats.totalScore).toBe(100);

      // Reset progress
      const reset = resetCapstoneProgress(capstone.id);
      expect(reset.completed).toBe(false);
      expect(reset.score).toBe(0);
      expect(reset.completedTasks.length).toBe(0);
    });
  });
});
