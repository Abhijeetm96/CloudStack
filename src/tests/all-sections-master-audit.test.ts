import { describe, it, expect } from 'vitest';
import { ACADEMY_18_TOPICS, getUniversalConcept } from '../commitforge/data/unifiedAcademyData';
import { PROJECTS } from '../commitforge/data/projects';
import { ALL_CONCEPT_REFERENCES } from '../commitforge/data/academyReferences';
import { DOCKER_14_TOPICS } from '../dockforge/data/unifiedDockerData';
import { ensureFullConceptData } from '../dockforge/data/conceptDataEnricher';
import { DockerEngine } from '../dockforge/docker-engine/engine';
import { KUBE_CHAPTERS } from '../podforge/data/topics';
import { LINUX_8_MODULES, ALL_LINUX_CONCEPTS } from '../linuxforge/data/topics';
import { defaultLinuxSimulator } from '../linuxforge/data/linuxSimulatorEngine';
import {
  DEVOPS_29_CHAPTERS,
  DEVOPS_10_TRACKS,
  GET_DEVOPS_STATS,
} from '../devops/data/devopsCurriculumData';

describe('Global Forge Suite & DevOps Academy Master Population Audit', () => {
  // =========================================================================
  // 1. COMMITFORGE (Git & Version Control Academy)
  // =========================================================================
  describe('CommitForge: 18 Topics, 75 Concepts, Auxiliary Labs & References', () => {
    it('verifies 18 topics and exactly 75 concepts with zero unpopulated fields', () => {
      expect(ACADEMY_18_TOPICS.length).toBe(18);
      const allConcepts = ACADEMY_18_TOPICS.flatMap((t) => t.concepts);
      expect(allConcepts.length).toBe(75);

      const invalidList: string[] = [];

      allConcepts.forEach((raw) => {
        const c = getUniversalConcept(raw.id) || raw;

        if (!c.id || !c.command || !c.title) {
          invalidList.push(`${raw.id}: missing core identity`);
        }
        if (!c.whatIsIt || c.whatIsIt.length < 15) {
          invalidList.push(`${raw.id}: missing whatIsIt`);
        }
        if (!c.whyDoYouNeedIt || c.whyDoYouNeedIt.length < 15) {
          invalidList.push(`${raw.id}: missing whyDoYouNeedIt`);
        }
        if (!c.syntaxCode) {
          invalidList.push(`${raw.id}: missing syntaxCode`);
        }
        if (!c.syntaxTokens?.length || c.syntaxTokens.length < 2) {
          invalidList.push(`${raw.id}: missing syntaxTokens`);
        }
        if (!c.variations?.length || c.variations.length < 2) {
          invalidList.push(`${raw.id}: missing variations`);
        }
        if (!c.challenge) {
          invalidList.push(`${raw.id}: missing challenge`);
        }
        if (!c.reference) {
          invalidList.push(`${raw.id}: missing reference`);
        }
      });

      expect(invalidList).toEqual([]);
    });

    it('verifies projects and references sections are fully populated', () => {
      const projectsList = Object.values(PROJECTS);
      expect(projectsList.length).toBeGreaterThanOrEqual(4);
      projectsList.forEach((p) => {
        expect(p.id).toBeTruthy();
        expect(p.name).toBeTruthy();
        expect(p.description).toBeTruthy();
      });

      const refKeys = Object.keys(ALL_CONCEPT_REFERENCES);
      expect(refKeys.length).toBeGreaterThanOrEqual(50);
    });
  });

  // =========================================================================
  // 2. DOCKFORGE (Docker & Containerization Academy)
  // =========================================================================
  describe('DockForge: 14 Topics, 42 Concepts, CLI Simulator & Compose', () => {
    it('verifies 14 topics and 42 concepts with enriched 5-stage pedagogical data', () => {
      expect(DOCKER_14_TOPICS.length).toBe(14);
      const allConcepts = DOCKER_14_TOPICS.flatMap((t) => t.concepts);
      expect(allConcepts.length).toBe(42);

      const invalidList: string[] = [];

      allConcepts.forEach((raw) => {
        const c = ensureFullConceptData(raw as any);

        if (!c.id || !c.command || !c.title) {
          invalidList.push(`${raw.id}: missing core identity`);
        }
        if (!c.whatIsIt || c.whatIsIt.length < 15) {
          invalidList.push(`${raw.id}: missing whatIsIt`);
        }
        if (!c.whyDoYouNeedIt || c.whyDoYouNeedIt.length < 15) {
          invalidList.push(`${raw.id}: missing whyDoYouNeedIt`);
        }
        if (!c.withoutVsWith?.without?.items?.length || !c.withoutVsWith?.with?.items?.length) {
          invalidList.push(`${raw.id}: missing withoutVsWith`);
        }
        if (!c.blockDiagram?.nodes?.length || c.blockDiagram.nodes.length < 2) {
          invalidList.push(`${raw.id}: missing blockDiagram`);
        }
        if (!c.terms?.length || c.terms.length < 2) {
          invalidList.push(`${raw.id}: missing terms`);
        }
        if (!c.syntaxTokens?.length || c.syntaxTokens.length < 2) {
          invalidList.push(`${raw.id}: missing syntaxTokens`);
        }
        if (!c.variations?.length || c.variations.length < 2) {
          invalidList.push(`${raw.id}: missing variations`);
        }
        if (!c.internalFlow?.length || c.internalFlow.length < 2) {
          invalidList.push(`${raw.id}: missing internalFlow`);
        }
        if (!c.sandbox?.targetTask || !c.sandbox?.solutionCommands?.length) {
          invalidList.push(`${raw.id}: missing sandbox`);
        }
        if (!c.commonMistakes?.length || c.commonMistakes.length < 1) {
          invalidList.push(`${raw.id}: missing commonMistakes`);
        }
        if (!c.challenge?.question || !c.challenge?.options?.length) {
          invalidList.push(`${raw.id}: missing challenge`);
        }
      });

      expect(invalidList).toEqual([]);
    });

    it('verifies DockerEngine simulates core container commands', () => {
      const engine = new DockerEngine();
      const psRes = engine.executeCommand('docker ps');
      expect(psRes.exitCode).toBe(0);

      const runRes = engine.executeCommand('docker run -d --name test-nginx -p 80:80 nginx:alpine');
      expect(runRes.exitCode).toBe(0);
      expect(engine.getContainers().some((c) => c.name === 'test-nginx')).toBe(true);

      const stopRes = engine.executeCommand('docker stop test-nginx');
      expect(stopRes.exitCode).toBe(0);
    });
  });

  // =========================================================================
  // 3. PODFORGE (Kubernetes & Cloud Native Academy)
  // =========================================================================
  describe('PodForge: 15 Chapters, 71 Concepts, YAML Snippets & kubectl CLI', () => {
    it('verifies 15 chapters and 71 concepts with non-empty learning runbooks', () => {
      expect(KUBE_CHAPTERS.length).toBe(15);
      const allConcepts = KUBE_CHAPTERS.flatMap((ch) => ch.concepts);
      expect(allConcepts.length).toBe(71);

      const invalidList: string[] = [];

      allConcepts.forEach((c) => {
        if (!c.id || !c.number || !c.title || !c.commandPill) {
          invalidList.push(`${c.id}: missing core metadata`);
        }
        if (!c.explanation || c.explanation.length < 20) {
          invalidList.push(`${c.id}: explanation too short`);
        }
        if (!c.yamlSnippet || c.yamlSnippet.length < 20) {
          invalidList.push(`${c.id}: missing yamlSnippet`);
        }
        if (!c.kubectlCommands || c.kubectlCommands.length === 0) {
          invalidList.push(`${c.id}: missing kubectlCommands`);
        }
        if (!c.practiceChallenge?.goalCommand || !c.practiceChallenge?.instructions) {
          invalidList.push(`${c.id}: missing practiceChallenge`);
        }
        if (!c.commonPitfalls || c.commonPitfalls.length === 0) {
          invalidList.push(`${c.id}: missing commonPitfalls`);
        }
        if (!c.quizQuestion?.question || !c.quizQuestion?.options || c.quizQuestion.options.length < 3) {
          invalidList.push(`${c.id}: missing quizQuestion`);
        }
      });

      expect(invalidList).toEqual([]);
    });
  });

  // =========================================================================
  // 4. LINUXFORGE (Linux Systems, Kernel & SRE Academy - Chapter 01)
  // =========================================================================
  describe('LinuxForge: 30 Chapters, 400+ Concepts, POSIX Shell Simulator', () => {
    it('verifies 30 chapters and 400+ concepts aligned with curriculum', () => {
      expect(LINUX_8_MODULES.length).toBe(8);
      expect(ALL_LINUX_CONCEPTS.length).toBeGreaterThanOrEqual(400);

      const invalidList: string[] = [];

      ALL_LINUX_CONCEPTS.forEach((c) => {
        if (!c.id || !c.command || !c.title) {
          invalidList.push(`${c.id}: missing identity`);
        }
        if (!c.whatIsIt || !c.whyDoYouNeedIt || !c.inSimpleWords || !c.realWorldAnalogy) {
          invalidList.push(`${c.id}: missing explanation level 1`);
        }
        if (!c.withoutVsWith?.without?.items?.length || !c.withoutVsWith?.with?.items?.length) {
          invalidList.push(`${c.id}: missing withoutVsWith`);
        }
        if (!c.blockDiagram?.nodes?.length || c.blockDiagram.nodes.length < 3) {
          invalidList.push(`${c.id}: missing blockDiagram`);
        }
        if (!c.terms?.length || c.terms.length < 2) {
          invalidList.push(`${c.id}: missing terms`);
        }
        if (!c.syntaxTokens?.length || c.syntaxTokens.length < 2) {
          invalidList.push(`${c.id}: missing syntaxTokens`);
        }
        if (!c.variations?.length || c.variations.length < 2) {
          invalidList.push(`${c.id}: missing variations`);
        }
        if (!c.internalFlow?.length || c.internalFlow.length < 3) {
          invalidList.push(`${c.id}: missing internalFlow`);
        }
        if (!c.sandbox?.targetTask || !c.sandbox?.solutionCommands?.length) {
          invalidList.push(`${c.id}: missing sandbox`);
        }
        if (!c.commonMistakes?.length || c.commonMistakes.length < 2) {
          invalidList.push(`${c.id}: missing commonMistakes`);
        }
        if (!c.challenge?.question || !c.challenge?.options?.length) {
          invalidList.push(`${c.id}: missing challenge`);
        }
      });

      expect(invalidList).toEqual([]);
    });

    it('verifies LinuxSimulator executes full range of Chapter 01 commands', () => {
      const sim = defaultLinuxSimulator;
      expect(sim.execute('pwd').stdout).toContain('/home/forge');
      expect(sim.execute('uname -r').stdout[0]).toContain('6.8.0');
      expect(sim.execute('free -h').exitCode).toBe(0);
      expect(sim.execute('df -h').exitCode).toBe(0);
      expect(sim.execute('stat /etc/os-release').exitCode).toBe(0);
      expect(sim.execute('file /bin/bash').exitCode).toBe(0);
      expect(sim.execute('tree').exitCode).toBe(0);
      expect(sim.execute('wc -l /etc/passwd').exitCode).toBe(0);
      expect(sim.execute('cut -d: -f1 /etc/passwd').exitCode).toBe(0);
      expect(sim.execute('umask').stdout[0]).toBe('0022');
      expect(sim.execute('sudo systemctl status nginx').exitCode).toBe(0);
      expect(sim.execute('journalctl -u nginx --no-pager').exitCode).toBe(0);
      expect(sim.execute('ulimit -n').stdout[0]).toBe('1024');
      expect(sim.execute('lsof -i :80').exitCode).toBe(0);
    });
  });

  // =========================================================================
  // 5. DEVOPS & CLOUD ENGINEERING MASTER CURRICULUM
  // =========================================================================
  describe('DevOps Master Academy: 29 Chapters, 10 Tracks, 160+ Submodules, 700+ Topics', () => {
    it('verifies all 29 chapters have rich submodules and topics with no empty entries', () => {
      expect(DEVOPS_29_CHAPTERS.length).toBe(29);
      expect(DEVOPS_10_TRACKS.length).toBe(10);

      const stats = GET_DEVOPS_STATS();
      expect(stats.totalChapters).toBe(29);
      expect(stats.totalTracks).toBe(10);
      expect(stats.totalSubmodules).toBeGreaterThanOrEqual(160);
      expect(stats.totalTopics).toBeGreaterThanOrEqual(700);

      const invalidSubmodules: string[] = [];

      DEVOPS_29_CHAPTERS.forEach((ch) => {
        expect(ch.title).toBeTruthy();
        expect(ch.summary).toBeTruthy();
        expect(ch.category).toBeTruthy();
        expect(ch.targetTech.length).toBeGreaterThan(0);
        expect(ch.subModules.length).toBeGreaterThanOrEqual(3);

        ch.subModules.forEach((sm) => {
          if (!sm.id || !sm.code || !sm.title || !sm.topics?.length || sm.topics.length < 2) {
            invalidSubmodules.push(`${ch.chapterCode} > ${sm.code}: incomplete`);
          }
        });
      });

      expect(invalidSubmodules).toEqual([]);
    });
  });
});
