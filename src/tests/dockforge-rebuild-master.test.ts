import { describe, it, expect, beforeEach } from 'vitest';
import { DOCKER_14_TOPICS, DOCKER_UNIVERSAL_CONCEPTS } from '../docker/data/unifiedDockerData';
import { ensureFullConceptData } from '../docker/data/conceptDataEnricher';
import { DOCKER_GLOSSARY, getGlossaryTerm, searchGlossary } from '../docker/data/dockerGlossary';
import { searchDockerCommands } from '../docker/data/dockerCommandReference';
import { DockForgeProgressStore } from '../docker/progress/dockerProgress';
import { DockerEngine } from '../docker/docker-engine/engine';

import { vi } from 'vitest';

describe('DockForge Master Rebuild: 17-Section Architecture & Engine Verification', () => {
  let mockStore: Record<string, string> = {};

  beforeEach(() => {
    mockStore = {};
    const storageMock = {
      getItem: (key: string) => mockStore[key] || null,
      setItem: (key: string, value: string) => { mockStore[key] = value; },
      removeItem: (key: string) => { delete mockStore[key]; },
      clear: () => { mockStore = {}; },
    };
    vi.stubGlobal('localStorage', storageMock);
    DockForgeProgressStore.getInstance().reset();
  });

  // ==========================================================================
  // 1. CURRICULUM INTEGRITY: Exactly 14 Topics and 42 Authoritative Concepts
  // ==========================================================================
  it('strictly adheres to the authoritative 14 topics without extra or missing topics', () => {
    expect(DOCKER_14_TOPICS.length).toBe(14);
    const expectedTopicTitles = [
      'Introduction to Containers',
      'Underlying Linux Technologies',
      'Installation / Setup',
      'Basics of Docker',
      'Data Persistence',
      'Using 3rd Party Container Images',
      'Building Container Images',
      'Container Registries',
      'Runtime Configuration & Compose',
      'Running & Managing Containers',
      'Docker CLI Mastery',
      'Container Security',
      'Developer Experience',
      'Deploying Containers',
    ];

    DOCKER_14_TOPICS.forEach((t, i) => {
      expect(t.title).toBe(expectedTopicTitles[i]);
      expect(t.number).toBe(String(i + 1).padStart(2, '0'));
    });
  });

  it('strictly contains exactly 42 numbered concepts without inventing arbitrary extras', () => {
    const allConcepts = DOCKER_14_TOPICS.flatMap((t) => t.concepts);
    expect(allConcepts.length).toBe(42);

    // Verify all concepts exist in DOCKER_UNIVERSAL_CONCEPTS map
    allConcepts.forEach((c) => {
      expect(DOCKER_UNIVERSAL_CONCEPTS[c.id]).toBeDefined();
    });
  });

  // ==========================================================================
  // 2. EXHAUSTIVE 17-SECTION LESSON ARCHITECTURE VALIDATION
  // ==========================================================================
  it('guarantees EVERY single one of the 42 lessons satisfies all 17 sections', () => {
    const allConcepts = DOCKER_14_TOPICS.flatMap((t) => t.concepts);
    const failures: string[] = [];

    allConcepts.forEach((raw) => {
      const full = ensureFullConceptData(DOCKER_UNIVERSAL_CONCEPTS[raw.id] || raw);

      // Section 1: What is it? (Definition, Simple zero-jargon, Technical)
      if (!full.definition || full.definition.length < 15) {
        failures.push(`${full.id}: Section 1 definition missing or too short`);
      }
      if (!full.simpleExplanation || full.simpleExplanation.length < 20) {
        failures.push(`${full.id}: Section 1 simpleExplanation (ELI5) missing or too short`);
      }
      if (!full.technicalExplanation || full.technicalExplanation.length < 20) {
        failures.push(`${full.id}: Section 1 technicalExplanation missing or too short`);
      }

      // Section 2: Why does it exist? (Problem, Before Docker, Docker solution, Result)
      if (!full.why) {
        failures.push(`${full.id}: Section 2 why missing`);
      } else {
        if (!full.why.problem || full.why.problem.length < 20) failures.push(`${full.id}: why.problem missing`);
        if (!full.why.beforeDocker || full.why.beforeDocker.length < 20) failures.push(`${full.id}: why.beforeDocker missing`);
        if (!full.why.dockerSolution || full.why.dockerSolution.length < 20) failures.push(`${full.id}: why.dockerSolution missing`);
        if (!full.why.result || full.why.result.length < 15) failures.push(`${full.id}: why.result missing`);
      }

      // Section 3: Real-World Scenario
      if (!full.scenario && !full.developerScenario) {
        failures.push(`${full.id}: Section 3 scenario missing`);
      }

      // Section 4: Mental Model (Metaphor, Analogy, Key Insight)
      if (!full.mentalModel) {
        failures.push(`${full.id}: Section 4 mentalModel missing`);
      } else {
        if (!full.mentalModel.metaphor) failures.push(`${full.id}: mentalModel.metaphor missing`);
        if (!full.mentalModel.analogy) failures.push(`${full.id}: mentalModel.analogy missing`);
        if (!full.mentalModel.keyInsight) failures.push(`${full.id}: mentalModel.keyInsight missing`);
      }

      // Section 5: Block Diagram
      if (!full.architectureDiagram && !full.blockDiagram) {
        failures.push(`${full.id}: Section 5 architectureDiagram missing`);
      } else {
        const diag = full.architectureDiagram || full.blockDiagram;
        if (!diag?.nodes || diag.nodes.length < 2) {
          failures.push(`${full.id}: block diagram requires at least 2 nodes`);
        }
      }

      // Section 6: Terminology (Clickable terms)
      if (!full.terms || full.terms.length < 2) {
        failures.push(`${full.id}: Section 6 terms must have >= 2 items`);
      } else {
        full.terms.forEach((t) => {
          if (!t.term || !t.simple || !t.technical) {
            failures.push(`${full.id}: incomplete term object for ${t.term}`);
          }
        });
      }

      // Section 7: Syntax (Code + Tokens)
      if (!full.syntaxCode) failures.push(`${full.id}: Section 7 syntaxCode missing`);
      if (!full.syntaxTokens || full.syntaxTokens.length < 2) {
        failures.push(`${full.id}: Section 7 syntaxTokens must have >= 2 tokens`);
      }

      // Section 8: Syntax Variations (with command, whatItDoes, whenToUse, whenNotToUse, risk, expectedResult)
      if (!full.variations || full.variations.length < 2) {
        failures.push(`${full.id}: Section 8 variations must have >= 2 items`);
      } else {
        full.variations.forEach((v) => {
          if (!v.command && !v.syntax) failures.push(`${full.id}: variation missing command`);
          if (!v.whenToUse) failures.push(`${full.id}: variation missing whenToUse`);
          if (!v.whenNotToUse) failures.push(`${full.id}: variation missing whenNotToUse`);
          if (!v.risk) failures.push(`${full.id}: variation missing risk`);
          if (!v.expectedResult) failures.push(`${full.id}: variation missing expectedResult`);
        });
      }

      // Section 9: What Changes? (stateBefore & stateAfter)
      if (!full.stateBefore || !full.stateAfter) {
        failures.push(`${full.id}: Section 9 stateBefore or stateAfter missing`);
      }

      // Section 10: What Does NOT Change? (MANDATORY SECTION!)
      if (!full.stateUnchanged || full.stateUnchanged.length < 2) {
        failures.push(`${full.id}: Section 10 stateUnchanged (mandatory) must have >= 2 items`);
      }

      // Section 11: Expected Output (Clickable lines)
      if (!full.expectedOutput || full.expectedOutput.length < 1) {
        failures.push(`${full.id}: Section 11 expectedOutput missing`);
      } else {
        full.expectedOutput.forEach((eo) => {
          if (!eo.line || !eo.explanation || !eo.whyItAppears || !eo.whatToLookAt) {
            failures.push(`${full.id}: expectedOutput item missing clickable explanation details`);
          }
        });
      }

      // Section 12: Common Mistakes
      if (!full.commonMistakes || full.commonMistakes.length < 1) {
        failures.push(`${full.id}: Section 12 commonMistakes missing`);
      }

      // Section 13: Safe Controlled Failure
      if (!full.safeFailure) {
        failures.push(`${full.id}: Section 13 safeFailure missing`);
      } else {
        if (!full.safeFailure.mistakeCommand) failures.push(`${full.id}: safeFailure.mistakeCommand missing`);
        if (!full.safeFailure.diagnosticQuestion) failures.push(`${full.id}: safeFailure.diagnosticQuestion missing`);
        if (!full.safeFailure.diagnosticAnswer) failures.push(`${full.id}: safeFailure.diagnosticAnswer missing`);
      }

      // Section 14: Step-by-Step Recovery (5 Progressive Hints)
      if (!full.recoverySteps) {
        failures.push(`${full.id}: Section 14 recoverySteps missing`);
      } else {
        if (!full.recoverySteps.hint1_conceptual) failures.push(`${full.id}: recovery hint 1 missing`);
        if (!full.recoverySteps.hint2_object) failures.push(`${full.id}: recovery hint 2 missing`);
        if (!full.recoverySteps.hint3_commandFamily) failures.push(`${full.id}: recovery hint 3 missing`);
        if (!full.recoverySteps.hint4_syntaxStructure) failures.push(`${full.id}: recovery hint 4 missing`);
        if (!full.recoverySteps.hint5_exactCommand) failures.push(`${full.id}: recovery hint 5 missing`);
      }

      // Section 15: Interactive Simulator Config (SEE -> THINK -> ACT -> OBSERVE -> EXPLAIN)
      if (!full.simulatorConfig) {
        failures.push(`${full.id}: Section 15 simulatorConfig missing`);
      } else {
        if (!full.simulatorConfig.predictionOptions || full.simulatorConfig.predictionOptions.length < 3) {
          failures.push(`${full.id}: simulatorConfig.predictionOptions must have >= 3 choices`);
        }
        const hasCorrectPrediction = full.simulatorConfig.predictionOptions.some((o) => o.isCorrect);
        if (!hasCorrectPrediction) {
          failures.push(`${full.id}: simulatorConfig has no correct prediction option`);
        }
      }

      // Section 16: Terminal Sandbox Practice
      if (!full.sandbox) {
        failures.push(`${full.id}: Section 16 sandbox missing`);
      }

      // Section 17: Independent Challenge
      if (!full.challengeComprehensive && !full.challenge) {
        failures.push(`${full.id}: Section 17 challenge missing`);
      }
    });

    expect(failures).toEqual([]);
  });

  // ==========================================================================
  // 3. DOCKER GLOSSARY VERIFICATION (55+ Terms, Zero Jargon, Real Examples)
  // ==========================================================================
  it('contains comprehensive coverage of at least 50 core Docker and containerization terms', () => {
    const termCount = Object.keys(DOCKER_GLOSSARY).length;
    expect(termCount).toBeGreaterThanOrEqual(50);

    const essentialTerms = [
      'docker', 'docker-engine', 'docker-cli', 'docker-daemon', 'container', 'image',
      'image-layer', 'container-layer', 'registry', 'repository', 'tag', 'digest',
      'dockerfile', 'build-context', 'volume', 'bind-mount', 'network', 'bridge-network',
      'host-network', 'overlay-network', 'port-mapping', 'entrypoint', 'cmd', 'workdir',
      'copy', 'add', 'run', 'from', 'expose', 'user', 'arg', 'env', 'containerd',
      'runc', 'oci', 'namespace', 'cgroup', 'overlayfs', 'compose', 'swarm', 'pod',
      'kubernetes', 'build-cache', 'multi-stage-build', 'capabilities', 'cve',
    ];

    essentialTerms.forEach((slug) => {
      const term = getGlossaryTerm(slug);
      expect(term).toBeDefined();
      expect(term?.simpleDefinition.length).toBeGreaterThan(15);
      expect(term?.technicalDefinition.length).toBeGreaterThan(15);
      expect(term?.analogy.length).toBeGreaterThan(10);
      expect(term?.commonConfusion.length).toBeGreaterThan(10);
    });
  });

  it('performs accurate natural language search within the Docker Glossary', () => {
    const results = searchGlossary('storage');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.slug === 'volume' || r.slug === 'bind-mount')).toBe(true);

    const layerResults = searchGlossary('copy-on-write');
    expect(layerResults.some((r) => r.slug === 'overlayfs' || r.slug === 'container-layer')).toBe(true);
  });

  // ==========================================================================
  // 4. NATURAL LANGUAGE COMMAND REFERENCE SEARCH
  // ==========================================================================
  it('correctly parses natural language user intentions into authoritative Docker lessons', () => {
    const testCases: Array<{ query: string; expectedConceptId: string }> = [
      { query: 'run a container', expectedConceptId: 'c-docker-run-basic' },
      { query: 'stop container', expectedConceptId: 'c-docker-stop-start' },
      { query: 'delete container', expectedConceptId: 'c-docker-rm' },
      { query: 'see containers', expectedConceptId: 'c-cli-containers' },
      { query: 'see images', expectedConceptId: 'c-cli-images' },
      { query: 'map a port', expectedConceptId: 'c-docker-run-flags' },
      { query: 'save data', expectedConceptId: 'c-volume-mounts' },
      { query: 'clean unused images', expectedConceptId: 'c-cli-images' },
      { query: 'multi-stage build', expectedConceptId: 'c-image-size-security' },
      { query: 'run multiple services', expectedConceptId: 'c-docker-compose' },
    ];

    testCases.forEach(({ query, expectedConceptId }) => {
      const searchResults = searchDockerCommands(query);
      expect(searchResults.length).toBeGreaterThan(0);
      const topMatch = searchResults[0];
      expect(topMatch.conceptId).toBe(expectedConceptId);
    });
  });

  // ==========================================================================
  // 5. PROGRESS TRACKING SCHEMA: dockforge_progress_v1 & Persistence
  // ==========================================================================
  it('manages versioned dockforge_progress_v1 with schema guarantees and persistence', () => {
    const store = DockForgeProgressStore.getInstance();
    const state = store.getState();
    expect(state.version).toBe(1);
    expect(Array.isArray(state.completedLessons)).toBe(true);

    store.markLessonComplete('c-docker-run-basic');
    expect(store.isLessonCompleted('c-docker-run-basic')).toBe(true);

    // Verify localStorage item exists
    const raw = localStorage.getItem('dockforge_progress_v1');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(parsed.version).toBe(1);
    expect(parsed.completedLessons).toContain('c-docker-run-basic');

    // Toggle off
    store.toggleLessonComplete('c-docker-run-basic');
    expect(store.isLessonCompleted('c-docker-run-basic')).toBe(false);

    // Save Challenge Result
    store.saveChallengeResult('c-docker-run-basic', true, 100);
    const updated = store.getState();
    expect(updated.challengeResults['c-docker-run-basic']?.passed).toBe(true);
  });

  // ==========================================================================
  // 6. SIMULATED DOCKER ENGINE: State Modeling & Transition Integrity
  // ==========================================================================
  it('correctly models container lifecycle, ports, and volumes in the DockerEngine', () => {
    const engine = new DockerEngine();

    // 1. Initial State
    const initialImages = engine.getImages();
    expect(initialImages.length).toBeGreaterThanOrEqual(3);
    const initialContainers = engine.getContainers();
    expect(initialContainers.length).toBe(3);

    // 2. docker run
    const runResult = engine.executeCommand('docker run -d --name web -p 8080:80 nginx:1.25-alpine');
    expect(runResult.exitCode).toBe(0);
    expect(engine.getContainers().length).toBe(4);
    const runningContainer = engine.getContainers().find((c) => c.name === 'web');
    expect(runningContainer).toBeDefined();
    expect(runningContainer?.status).toBe('running');
    expect(runningContainer?.ports[0].hostPort).toBe(8080);
    expect(runningContainer?.ports[0].containerPort).toBe(80);

    // 3. docker stop
    const stopResult = engine.executeCommand('docker stop web');
    expect(stopResult.exitCode).toBe(0);
    const stoppedContainer = engine.getContainers().find((c) => c.name === 'web');
    expect(stoppedContainer?.status).toBe('stopped');

    // 4. docker rm
    const rmResult = engine.executeCommand('docker rm web');
    expect(rmResult.exitCode).toBe(0);
    expect(engine.getContainers().length).toBe(3);
    // Base image must remain completely untouched
    expect(engine.getImages().length).toBe(initialImages.length);
  });
});
