import { DockerSubchapterLesson } from '../types/dockerCurriculumTypes';
import { UniversalDockerConcept, BlockDiagramData } from './unifiedDockerData';
import { ensureFullConceptData } from './conceptDataEnricher';
import { ALL_DOCKER_LESSONS, getDockerLessonById } from './index';

/**
 * Mapping from legacy Docker Academy concept IDs (from 14-topic curriculum)
 * to authoritative 68-chapter curriculum lesson IDs.
 */
export const DOCKER_LEGACY_TO_LESSON_MAP: Record<string, string> = {
  'c-what-are-containers': 'dk01-01-what-is-a-container',
  'c-why-need-containers': 'dk01-02-why-containers-exist',
  'c-baremetal-vm-containers': 'dk01-08-bare-metal-vs-virtual-machines-vs-containers',
  'c-docker-and-oci': 'dk03-01-oci-specifications',
  'c-linux-namespaces': 'dk32-01-linux-namespaces',
  'c-cgroups': 'dk31-01-cgroups-overview',
  'c-union-filesystems': 'dk33-01-union-filesystems-concept',
  'c-docker-desktop': 'dk04-01-docker-desktop-overview',
  'c-docker-engine-linux': 'dk05-01-docker-engine-architecture',
  'c-docker-run-basic': 'dk06-01-docker-run-fundamentals',
  'c-docker-exec': 'dk06-06-interactive-shells-with-docker-exec',
  'c-docker-stop-start': 'dk06-03-stopping-containers-sigterm-vs-sigkill',
  'c-docker-rm': 'dk06-05-removing-containers-and-pruning',
  'c-ephemeral-filesystem': 'dk37-01-container-writable-layer',
  'c-volume-mounts': 'dk37-02-docker-volumes-deep-dive',
  'c-bind-mounts': 'dk37-03-bind-mounts-deep-dive',
  'c-running-databases': 'dk48-01-running-databases-in-containers',
  'c-cli-utilities': 'dk48-02-cli-utilities-and-ephemeral-tools',
  'c-dockerfiles': 'dk10-01-dockerfile-anatomy-and-instructions',
  'c-layer-caching': 'dk11-01-docker-build-cache-mechanics',
  'c-image-size-security': 'dk12-01-multi-stage-build-architecture',
  'c-dockerhub': 'dk15-01-docker-hub-publishing-and-pulling',
  'c-image-tagging': 'dk16-01-docker-image-tagging-strategies',
  'c-cloud-registries': 'dk17-01-enterprise-and-cloud-registries',
  'c-docker-run-flags': 'dk06-02-docker-run-flags-and-switches',
  'c-docker-compose': 'dk34-01-docker-compose-overview',
  'c-container-logs': 'dk26-01-docker-logs-and-logging-drivers',
  'c-container-inspect-stats': 'dk27-01-docker-inspect-and-low-level-metadata',
  'c-cli-images': 'dk07-01-docker-image-cli-management',
  'c-cli-containers': 'dk08-01-docker-container-cli-management',
  'c-cli-volumes': 'dk38-01-docker-volume-cli-management',
  'c-cli-networks': 'dk20-01-docker-network-cli-management',
  'c-image-security': 'dk40-01-container-image-security-and-cves',
  'c-runtime-security': 'dk41-01-runtime-security-and-hardening',
  'c-hot-reloading': 'dk49-01-hot-reloading-in-local-development',
  'c-container-debuggers': 'dk49-02-container-debugging-and-ide-attach',
  'c-container-tests': 'dk49-03-running-test-suites-in-containers',
  'c-continuous-integration': 'dk50-01-docker-in-ci-cd-pipelines',
  'c-paas-options': 'dk57-01-cloud-container-platforms',
  'c-docker-swarm': 'dk55-01-docker-swarm-fundamentals',
  'c-kubernetes-intro': 'dk56-01-transitioning-from-docker-to-kubernetes',
  'c-nomad-options': 'dk58-01-hashicorp-nomad-and-containers',
};

/**
 * Resolves any lesson ID or legacy concept ID into an authoritative 68-chapter lesson ID.
 */
export function resolveDockerLessonId(queryId: string | null | undefined): string {
  if (!queryId) return ALL_DOCKER_LESSONS[0]?.id || 'dk01-01-what-is-a-container';

  // 1. Direct match in 68 chapters
  if (getDockerLessonById(queryId)) {
    return queryId;
  }

  // 2. Direct legacy map
  if (DOCKER_LEGACY_TO_LESSON_MAP[queryId]) {
    const mapped = DOCKER_LEGACY_TO_LESSON_MAP[queryId];
    if (getDockerLessonById(mapped)) return mapped;
  }

  // 3. Normalized slug search
  const clean = queryId.replace(/^c-/, '').toLowerCase();
  const matched = ALL_DOCKER_LESSONS.find(
    (l) =>
      l.id.toLowerCase().includes(clean) ||
      l.subchapterTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(clean)
  );

  if (matched) return matched.id;

  return ALL_DOCKER_LESSONS[0]?.id || 'dk01-01-what-is-a-container';
}

/**
 * Adapts a 68-chapter DockerSubchapterLesson into the UniversalDockerConcept
 * structure required by UniversalTeachingShell and UniversalDockerLessonView.
 */
export function adaptDockerLessonToUniversalConcept(lesson: DockerSubchapterLesson): UniversalDockerConcept {
  const diagram: BlockDiagramData = {
    title: `${lesson.subchapterTitle} Architecture`,
    subtitle: lesson.mentalModel,
    nodes: [
      {
        id: 'host-kernel',
        label: 'Host Linux Kernel',
        simpleDef: 'Core Linux subsystem',
        techDef: 'cgroups v2 · Namespaces · OverlayFS',
        color: '#3b82f6',
      },
      {
        id: 'docker-engine',
        label: 'Docker Engine',
        simpleDef: 'Container runtime daemon',
        techDef: 'dockerd · containerd · runc',
        color: '#0ea5e9',
      },
      {
        id: 'isolated-container',
        label: lesson.subchapterTitle,
        simpleDef: lesson.definition.slice(0, 45) + '...',
        techDef: lesson.technicalExplanation.slice(0, 60) + '...',
        color: '#10b981',
      },
    ],
  };

  const raw: any = {
    id: lesson.id,
    command: lesson.syntax.split('\n')[0] || `docker ${lesson.subchapterTitle.toLowerCase()}`,
    title: lesson.subchapterTitle,
    topicId: `ch-${String(lesson.chapterNumber).padStart(2, '0')}`,
    topicNumber: String(lesson.chapterNumber).padStart(2, '0'),
    topicTitle: lesson.chapterTitle,
    subtitle: lesson.definition,
    badges: [lesson.trackGroup, lesson.difficulty, `Ch ${lesson.chapterNumber}`],
    quote: lesson.mentalModel,
    difficulty: lesson.difficulty,

    whatIsIt: lesson.definition,
    inSimpleWords: lesson.beginnerExplanation,
    whyDoYouNeedIt: lesson.whyItExists,
    realWorldAnalogy: lesson.analogy,

    definition: lesson.definition,
    simpleExplanation: lesson.beginnerExplanation,
    technicalExplanation: lesson.technicalExplanation,

    why: {
      problem: lesson.problemSolved,
      beforeDocker: lesson.whyItExists,
      dockerSolution: lesson.whatActuallyHappens || lesson.definition,
      result: lesson.summary,
    },

    scenario: {
      title: 'Real-World Production Implementation',
      setup: lesson.simplestExample,
      problem: lesson.problemSolved,
      solution: lesson.practicalExample,
      productionContext: lesson.productionExample,
    },

    mentalModel: {
      metaphor: lesson.analogy,
      analogy: lesson.analogy,
      keyInsight: lesson.mentalModel,
    },

    architectureDiagram: diagram,

    syntaxCode: lesson.syntax,
    syntaxTokens: lesson.syntaxBreakdown.map((b) => ({
      token: b.token,
      role: 'Keyword / Option',
      explanation: b.purpose,
    })),

    variations: lesson.variations.map((v) => ({
      title: v,
      command: v,
      whatItDoes: v,
      whenToUse: 'When configuring container runtime parameters',
    })),

    terms: lesson.terminology.map((t) => ({
      term: t.term,
      simple: t.explanation,
      technical: t.explanation,
    })),

    whenToUse: lesson.whenToUse,
    whenNotToUse: lesson.whenNotToUse,

    expectedOutput: lesson.outputExplanation.map((o) => ({
      line: o.line,
      explanation: o.meaning,
      whyItAppears: 'Generated by Docker Engine runtime',
      whatToLookAt: o.line,
    })),

    safeFailure: {
      mistakeCommand: lesson.dangerousExample || 'docker run ...',
      mistakeTitle: 'Common Configuration Mistake',
      consequence: lesson.commonMistakes[0] || 'Container exits or fails',
      diagnosticQuestion: 'Why did this fail?',
      diagnosticAnswer: lesson.commonMisconceptions[0] || 'Check daemon logs and exit code',
    },

    recoverySteps: {
      hint1_conceptual: lesson.troubleshooting[0]?.cause || 'Check process exit code',
      hint2_object: lesson.troubleshooting[0]?.problem || 'Container lifecycle',
      hint3_commandFamily: 'docker ps / docker logs',
      hint4_syntaxStructure: lesson.syntax,
      hint5_exactCommand: lesson.safeExample || lesson.syntax,
    },

    challengeComprehensive: {
      title: `Mastery Challenge: ${lesson.subchapterTitle}`,
      objective: lesson.challenge.goal,
      scenario: lesson.challenge.scenario,
      requirements: [lesson.challenge.goal],
      solutionCommand: lesson.challenge.testVerification,
      validationRegex: '.*',
      hints: [lesson.challenge.hint],
      explanation: lesson.technicalExplanation,
    },

    commonMistakes: lesson.commonMistakes.map((m) => ({
      mistake: m,
      whyWrong: lesson.commonMisconceptions[0] || 'Violates Docker container isolation principles.',
      correctWay: lesson.safeExample || lesson.syntax.split('\n')[0] || 'Follow declarative Docker CLI patterns',
      dangerousConsequence: 'Runtime instability or unexpected exit code.',
    })),

    recapChecklist: lesson.bestPractices,
  };

  return ensureFullConceptData(raw);
}
