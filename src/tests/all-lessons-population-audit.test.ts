import { describe, it, expect } from 'vitest';
import { ACADEMY_18_TOPICS, getUniversalConcept } from '../commitforge/data/unifiedAcademyData';
import { DOCKER_14_TOPICS } from '../dockforge/data/unifiedDockerData';
import { ensureFullConceptData } from '../dockforge/data/conceptDataEnricher';
import { KUBE_CHAPTERS } from '../podforge/data/topics';
import { LINUX_15_TOPICS } from '../linuxforge/data/topics';

describe('Deep Curriculum & Lesson Population Audit Across All 3 Sections', () => {
  // =========================================================================
  // SECTION 1: COMMITFORGE (Git & Version Control Academy)
  // =========================================================================
  describe('CommitForge Lessons Population (18 Topics, 75 Concepts)', () => {
    it('verifies all 18 topics are populated with valid metadata and non-empty concept lists', () => {
      expect(ACADEMY_18_TOPICS.length).toBe(18);

      ACADEMY_18_TOPICS.forEach((topic) => {
        expect(topic.id).toBeTruthy();
        expect(topic.number).toBeTruthy();
        expect(topic.title).toBeTruthy();
        expect(topic.concepts.length).toBeGreaterThan(0);
      });
    });

    it('verifies every one of the 75 concepts is populated with complete teaching content', () => {
      const allConcepts = ACADEMY_18_TOPICS.flatMap((t) => t.concepts);
      expect(allConcepts.length).toBe(75);

      const missingFields: string[] = [];

      allConcepts.forEach((c) => {
        const fullConcept = getUniversalConcept(c.id);
        if (!fullConcept.id) missingFields.push(`${c.id}: missing id`);
        if (!fullConcept.command) missingFields.push(`${c.id}: missing command`);
        if (!fullConcept.title) missingFields.push(`${c.id}: missing title`);
        if (!fullConcept.subtitle) missingFields.push(`${c.id}: missing subtitle`);
        if (!fullConcept.badges || fullConcept.badges.length === 0) {
          missingFields.push(`${c.id}: missing badges`);
        }
        if (!fullConcept.whatIsIt) {
          missingFields.push(`${c.id}: missing whatIsIt`);
        }
        if (!fullConcept.whyDoYouNeedIt) {
          missingFields.push(`${c.id}: missing whyDoYouNeedIt`);
        }
        if (!fullConcept.challenge) {
          missingFields.push(`${c.id}: missing challenge`);
        }
        if (!fullConcept.reference) {
          missingFields.push(`${c.id}: missing reference`);
        }
      });

      expect(missingFields).toEqual([]);
    });

    it('verifies concepts contain rich explanations, analogies, and practice challenges', () => {
      const allConcepts = ACADEMY_18_TOPICS.flatMap((t) => t.concepts);

      allConcepts.forEach((c) => {
        const full = getUniversalConcept(c.id);
        expect(full.whatIsIt.length).toBeGreaterThan(20);
        expect(full.whyDoYouNeedIt.length).toBeGreaterThan(20);
        expect(full.challenge.title.length).toBeGreaterThan(3);
        const hasReferenceContent =
          Boolean(full.reference.syntaxCheatSheet && full.reference.syntaxCheatSheet.length > 0) ||
          Boolean(full.reference.synopsis && full.reference.synopsis.length > 0) ||
          Boolean(full.reference.options && full.reference.options.length > 0) ||
          Boolean(full.reference.officialDocUrl);
        expect(hasReferenceContent).toBe(true);
      });
    });
  });

  // =========================================================================
  // SECTION 2: DOCKFORGE (Docker & Containers Academy)
  // =========================================================================
  describe('DockForge Lessons Population (14 Topics, 42 Concepts)', () => {
    it('verifies all 14 topics are populated with valid numbers, titles, and icons', () => {
      expect(DOCKER_14_TOPICS.length).toBe(14);

      DOCKER_14_TOPICS.forEach((topic) => {
        expect(topic.id).toBeTruthy();
        expect(topic.number).toBeTruthy();
        expect(topic.title).toBeTruthy();
        expect(topic.iconName).toBeTruthy();
        expect(topic.concepts.length).toBeGreaterThanOrEqual(2);
      });
    });

    it('verifies every one of the 42 concepts has full 5-stage pedagogical data', () => {
      const allConcepts = DOCKER_14_TOPICS.flatMap((t) => t.concepts);
      expect(allConcepts.length).toBe(42);

      const invalidConcepts: string[] = [];

      allConcepts.forEach((raw) => {
        const c = ensureFullConceptData(raw);

        // Core metadata
        if (!c.id || !c.command || !c.title || !c.subtitle || !c.badges?.length || !c.difficulty) {
          invalidConcepts.push(`${raw.id}: core metadata incomplete`);
        }

        // Stage 1: Why You Need It (Without vs With)
        if (!c.withoutVsWith?.without?.items?.length || !c.withoutVsWith?.with?.items?.length) {
          invalidConcepts.push(`${raw.id}: withoutVsWith incomplete`);
        }

        // Stage 2: Technical Terms & Mental Model
        if (!c.terms || c.terms.length < 2) {
          invalidConcepts.push(`${raw.id}: terms missing or less than 2`);
        }

        // Stage 3: Syntax Token Breakdown & Variations
        if (!c.syntaxTokens || c.syntaxTokens.length < 2) {
          invalidConcepts.push(`${raw.id}: syntax tokens missing`);
        }
        if (!c.variations || c.variations.length < 2) {
          invalidConcepts.push(`${raw.id}: variations missing or less than 2`);
        }

        // Stage 4: Internal Flow Steps
        if (!c.internalFlow || c.internalFlow.length < 2) {
          invalidConcepts.push(`${raw.id}: internalFlow steps incomplete`);
        }

        // Stage 5: Terminal Sandbox & Common Mistakes & Quiz
        if (!c.sandbox?.targetTask || !c.sandbox?.solutionCommands?.length) {
          invalidConcepts.push(`${raw.id}: sandbox task or solution incomplete`);
        }
        if (!c.commonMistakes || c.commonMistakes.length < 1) {
          invalidConcepts.push(`${raw.id}: commonMistakes missing`);
        }
        if (!c.challenge?.question || !c.challenge?.options?.length) {
          invalidConcepts.push(`${raw.id}: challenge quiz incomplete`);
        }
      });

      expect(invalidConcepts).toEqual([]);
    });
  });

  // =========================================================================
  // SECTION 3: PODFORGE (Kubernetes & Cloud Native Academy)
  // =========================================================================
  describe('PodForge Lessons Population (15 Chapters, 71 Concepts)', () => {
    it('verifies all 15 chapters are populated with valid numbers, titles, and concepts', () => {
      expect(KUBE_CHAPTERS.length).toBe(15);

      KUBE_CHAPTERS.forEach((ch) => {
        expect(ch.id).toBeTruthy();
        expect(ch.number).toBeGreaterThan(0);
        expect(ch.title).toBeTruthy();
        expect(ch.concepts.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('verifies every one of the 71 concepts has full learning, YAML, CLI, and quiz data', () => {
      const allConcepts = KUBE_CHAPTERS.flatMap((ch) => ch.concepts);
      expect(allConcepts.length).toBe(71);

      const invalidKubeConcepts: string[] = [];

      allConcepts.forEach((c) => {
        if (!c.id) invalidKubeConcepts.push(`Concept missing id`);
        if (!c.number) invalidKubeConcepts.push(`${c.id}: missing number`);
        if (!c.title) invalidKubeConcepts.push(`${c.id}: missing title`);
        if (!c.commandPill) invalidKubeConcepts.push(`${c.id}: missing commandPill`);
        if (!c.description) invalidKubeConcepts.push(`${c.id}: missing description`);
        if (!c.explanation) invalidKubeConcepts.push(`${c.id}: missing explanation`);
        if (!c.badge) invalidKubeConcepts.push(`${c.id}: missing badge`);
        if (!c.difficulty) invalidKubeConcepts.push(`${c.id}: missing difficulty`);

        // Check YAML Snippet tab content
        if (!c.yamlSnippet || c.yamlSnippet.length < 10) {
          invalidKubeConcepts.push(`${c.id}: missing or trivial yamlSnippet`);
        }

        // Check CLI command practice
        if (!c.kubectlCommands || c.kubectlCommands.length === 0) {
          invalidKubeConcepts.push(`${c.id}: missing kubectlCommands`);
        }

        // Check Practice Challenge
        if (!c.practiceChallenge?.instructions || !c.practiceChallenge?.goalCommand) {
          invalidKubeConcepts.push(`${c.id}: missing practiceChallenge instructions or goalCommand`);
        }

        // Check Pitfalls & SRE troubleshooting
        if (!c.commonPitfalls || c.commonPitfalls.length === 0) {
          invalidKubeConcepts.push(`${c.id}: missing commonPitfalls`);
        }

        // Check Quiz Question
        if (!c.quizQuestion?.question || !c.quizQuestion?.options || c.quizQuestion.options.length < 3) {
          invalidKubeConcepts.push(`${c.id}: missing or incomplete quizQuestion`);
        }
      });

      expect(invalidKubeConcepts).toEqual([]);
    });

    it('verifies Kubernetes YAML snippets are non-trivial valid definitions or runbooks', () => {
      const allConcepts = KUBE_CHAPTERS.flatMap((ch) => ch.concepts);

      allConcepts.forEach((c) => {
        expect(c.yamlSnippet.trim().length).toBeGreaterThan(30);
      });
    });
  });

  // =========================================================================
  // SECTION 4: LINUXFORGE (Linux Systems, Kernel & SRE Academy)
  // =========================================================================
  describe('LinuxForge Lessons Population (8 Modules, 24 Concepts)', () => {
    it('verifies all 8 modules are populated with valid metadata and non-empty concept lists', () => {
      expect(LINUX_15_TOPICS.length).toBe(8);

      LINUX_15_TOPICS.forEach((topic) => {
        expect(topic.id).toBeTruthy();
        expect(topic.number).toBeTruthy();
        expect(topic.title).toBeTruthy();
        expect(topic.concepts.length).toBeGreaterThan(0);
      });
    });

    it('verifies every one of the 24 concepts is populated with complete teaching content', () => {
      const allConcepts = LINUX_15_TOPICS.flatMap((t) => t.concepts);
      expect(allConcepts.length).toBe(24);

      const missingFields: string[] = [];

      allConcepts.forEach((c) => {
        if (!c.id) missingFields.push(`${c.id}: missing id`);
        if (!c.command) missingFields.push(`${c.id}: missing command`);
        if (!c.title) missingFields.push(`${c.id}: missing title`);
        if (!c.whatIsIt) missingFields.push(`${c.id}: missing whatIsIt`);
        if (!c.whyDoYouNeedIt) missingFields.push(`${c.id}: missing whyDoYouNeedIt`);
        if (!c.withoutVsWith) missingFields.push(`${c.id}: missing withoutVsWith`);
        if (!c.blockDiagram) missingFields.push(`${c.id}: missing blockDiagram`);
        if (!c.syntaxCode) missingFields.push(`${c.id}: missing syntaxCode`);
        if (!c.sandbox) missingFields.push(`${c.id}: missing sandbox`);
        if (!c.challenge) missingFields.push(`${c.id}: missing challenge`);
        if (!c.commonMistakes || c.commonMistakes.length < 2) {
          missingFields.push(`${c.id}: missing commonMistakes`);
        }
      });

      expect(missingFields).toEqual([]);
    });
  });
});
