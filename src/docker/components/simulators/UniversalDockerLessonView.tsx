import React, { useState } from 'react';
import { UniversalDockerConcept, SyntaxToken, ConceptVariation, ConceptTerm, BlockDiagramNode } from '../../data/unifiedDockerData';
import { useDocker } from '../../context/DockerContext';
import { DockerWorldSimulator } from './DockerWorldSimulator';
import { DockerGlossaryModal } from '../glossary/DockerGlossaryModal';
import { DockerCommandSearchModal } from '../search/DockerCommandSearchModal';
import {
  BookOpen,
  Box,
  Layers,
  Sparkles,
  Terminal as TerminalIcon,
  Play,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ChevronRight,
  Info,
  Shield,
  HelpCircle,
  Search,
  RotateCcw,
  Check,
  X,
  FileCode,
  Flame,
  Activity,
  Cpu,
  Database,
  Network,
  Eye,
  Award,
} from 'lucide-react';
import { DOCKER_CAPSTONES } from '../../../platform/capstones/data/dockerCapstones';
import { StandardCapstoneRunnerModal } from '../../../platform/capstones/StandardCapstoneRunnerModal';
import { StandardCapstoneProjectView } from '../../../platform/capstones/StandardCapstoneProjectView';
import { CapstoneProject } from '../../../platform/capstones/types';

interface UniversalDockerLessonViewProps {
  concept: UniversalDockerConcept;
  completedConceptIds: string[];
  markConceptComplete: (id: string) => void;
  executeCommand: (cmd: string) => void;
  showToast: (msg: string) => void;
  prevConcept?: { id: string; title: string } | null;
  nextConcept?: { id: string; title: string } | null;
  onSelectConcept?: (id: string) => void;
}

export const UniversalDockerLessonView: React.FC<UniversalDockerLessonViewProps> = ({
  concept,
  completedConceptIds,
  markConceptComplete,
  executeCommand,
  showToast,
  prevConcept,
  nextConcept,
  onSelectConcept,
}) => {
  // Navigation / Progressive Disclosure
  const [activeTab, setActiveTab] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'stepped' | 'full'>('stepped');

  // Modals
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [glossaryInitialTerm, setGlossaryInitialTerm] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeCapstone, setActiveCapstone] = useState<CapstoneProject | null>(null);

  // Section 5: Block Diagram Selection
  const [selectedDiagramNode, setSelectedDiagramNode] = useState<BlockDiagramNode | null>(
    concept.architectureDiagram?.nodes[0] || null
  );

  // Section 7: Syntax Token Selection
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(0);

  // Section 8: Variation Selection
  const [selectedVariationIndex, setSelectedVariationIndex] = useState<number>(0);

  // Section 11: Expected Output Clickable Line Selection
  const [selectedOutputLineIndex, setSelectedOutputLineIndex] = useState<number | null>(0);

  // Section 13: Safe Failure Quiz / Diagnostic
  const [safeFailureAnswered, setSafeFailureAnswered] = useState(false);

  // Section 14: Progressive Hints (1 to 5)
  const [revealedHintLevel, setRevealedHintLevel] = useState<number>(1);

  // Section 16: Live Terminal Sandbox
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ type: 'input' | 'output' | 'error'; text: string }>>([
    { type: 'output', text: '$ Docker Interactive Engine v2.4 (Simulated)' },
    { type: 'output', text: `$ Target: ${concept.command}` },
    { type: 'output', text: 'Type any Docker command below to test live execution:' },
  ]);

  // Section 17: Challenge State
  const [challengeInput, setChallengeInput] = useState('');
  const [challengeResult, setChallengeResult] = useState<'idle' | 'success' | 'incorrect'>('idle');
  const [challengeRevealedHints, setChallengeRevealedHints] = useState(0);

  const isCompleted = completedConceptIds.includes(concept.id);

  const handleOpenGlossaryTerm = (term: string) => {
    setGlossaryInitialTerm(term);
    setGlossaryOpen(true);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    setTerminalLogs((prev) => [...prev, { type: 'input', text: `$ ${cmd}` }]);

    try {
      executeCommand(cmd);
      setTerminalLogs((prev) => [...prev, { type: 'output', text: `✔ Executed: ${cmd}` }]);
      showToast(`Ran: ${cmd}`);
    } catch (err: any) {
      setTerminalLogs((prev) => [...prev, { type: 'error', text: `Error: ${err?.message || 'Execution error'}` }]);
    }
    setTerminalInput('');
  };

  const handleValidateChallenge = () => {
    const raw = challengeInput.trim();
    if (!raw) return;

    const challenge = concept.challengeComprehensive;
    const targetSolution = challenge?.solutionCommand || concept.command;
    const regexStr = challenge?.validationRegex;

    let isMatch = false;
    if (regexStr) {
      try {
        const reg = new RegExp(regexStr, 'i');
        isMatch = reg.test(raw);
      } catch {
        isMatch = raw.toLowerCase().includes(targetSolution.toLowerCase().replace(/\s+/g, ' '));
      }
    } else {
      isMatch = raw.toLowerCase() === targetSolution.toLowerCase();
    }

    if (isMatch) {
      setChallengeResult('success');
      markConceptComplete(concept.id);
      showToast(`🏆 Challenge Solved: ${concept.title}! Mastery recorded.`);
    } else {
      setChallengeResult('incorrect');
      showToast('❌ Not quite. Check the requirements or reveal a hint!');
    }
  };

  const renderSectionHeader = () => (
    <div
      style={{
        padding: '1.25rem 1.75rem',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 22, 0.95) 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <div style={{ flex: 1, minWidth: '280px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.45rem' }}>
          <span
            style={{
              padding: '0.2rem 0.55rem',
              borderRadius: '6px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8',
              fontSize: '0.72rem',
              fontWeight: 800,
              fontFamily: 'monospace',
            }}
          >
            TOPIC {concept.topicNumber} • LESSON {concept.id.replace('c-', '')}
          </span>
          <span
            style={{
              padding: '0.2rem 0.55rem',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.06)',
              color: '#cbd5e1',
              fontSize: '0.72rem',
              fontWeight: 700,
            }}
          >
            {concept.difficulty}
          </span>
          <span
            style={{
              padding: '0.2rem 0.55rem',
              borderRadius: '6px',
              background: 'rgba(168, 85, 247, 0.12)',
              color: '#c084fc',
              fontSize: '0.72rem',
              fontWeight: 700,
            }}
          >
            ~8-12 min
          </span>
          {isCompleted && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                fontSize: '0.72rem',
                fontWeight: 800,
              }}
            >
              <CheckCircle2 size={13} />
              MASTERED
            </span>
          )}
        </div>

        <h1 style={{ margin: '0 0 0.35rem', fontSize: '1.65rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.02em' }}>
          {concept.title}
        </h1>

        <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.45 }}>
          {concept.definition || concept.subtitle}
        </p>
      </div>

      {/* Quick Utility Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <button
          onClick={() => setSearchOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '9px',
            padding: '0.5rem 0.85rem',
            color: '#cbd5e1',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Search size={14} color="#38bdf8" />
          <span>Find Command</span>
        </button>

        <button
          onClick={() => handleOpenGlossaryTerm(concept.title)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '9px',
            padding: '0.5rem 0.85rem',
            color: '#38bdf8',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <BookOpen size={14} />
          <span>Glossary</span>
        </button>

        <button
          onClick={() => setViewMode(viewMode === 'stepped' ? 'full' : 'stepped')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '9px',
            padding: '0.5rem 0.85rem',
            color: '#94a3b8',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Eye size={14} />
          <span>{viewMode === 'stepped' ? 'All Sections' : 'Stepped View'}</span>
        </button>
      </div>
    </div>
  );

  const TABS = [
    { id: 1, label: '1. Concept & Why', desc: 'What it is & Developer problem' },
    { id: 2, label: '2. Architecture & Metaphor', desc: 'Mental model & Block diagram' },
    { id: 3, label: '3. Terminology & Syntax', desc: 'Clickable terms & Syntax tokens' },
    { id: 4, label: '4. Variations & State', desc: 'What changes & What does NOT' },
    { id: 5, label: '5. Output & Recovery', desc: 'Terminal lines & 5 Hints' },
    { id: 6, label: '6. Live Simulator', desc: 'Visual Docker World lab' },
    { id: 7, label: '7. Sandbox & Challenge', desc: 'Terminal practice & Evaluator' },
  ];

  const renderTabBar = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: '#090d16',
        overflowX: 'auto',
        padding: '0 1rem',
      }}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1rem',
              border: 'none',
              borderBottom: isActive ? '2px solid #38bdf8' : '2px solid transparent',
              background: 'transparent',
              color: isActive ? '#38bdf8' : '#94a3b8',
              fontSize: '0.8rem',
              fontWeight: isActive ? 800 : 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '2px',
              transition: 'all 0.15s ease',
            }}
          >
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );

  // SECTION 1: WHAT IS IT?
  const renderSection1 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '6px', height: '18px', background: '#38bdf8', borderRadius: '3px' }} />
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
          Section 1: What is {concept.title}?
        </h2>
      </div>

      {/* One-Sentence Definition */}
      <div
        style={{
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
        }}
      >
        <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
          Authoritative Definition (One Sentence)
        </span>
        <p style={{ margin: '0.35rem 0 0', fontSize: '0.95rem', fontWeight: 600, color: '#f1f5f9', lineHeight: 1.5 }}>
          {concept.definition || concept.whatIsIt}
        </p>
      </div>

      {/* Explain Like I'm New (Zero Jargon) */}
      <div
        style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
          <Lightbulb size={16} color="#10b981" />
          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>
            Explain Like I'm Completely New (Zero Jargon)
          </span>
        </div>
        <p style={{ margin: 0, fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.6 }}>
          {concept.simpleExplanation || concept.inSimpleWords}
        </p>
      </div>

      {/* Technical Breakdown */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
          <Cpu size={16} color="#c084fc" />
          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase' }}>
            Internal Linux & Docker Engine Architecture
          </span>
        </div>
        <p style={{ margin: 0, fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.6, fontFamily: 'monospace' }}>
          {concept.technicalExplanation || concept.quote}
        </p>
      </div>
    </div>
  );

  // SECTION 2: WHY DOES IT EXIST?
  const renderSection2 = () => {
    const why = concept.why || {
      problem: 'Environment inconsistencies and manual provisioning.',
      beforeDocker: 'Heavy VMs and fragile shell scripts.',
      dockerSolution: 'Standardized immutable container images.',
      result: 'Deterministic, sub-second execution everywhere.',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#f59e0b', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 2: Why Does It Exist?
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* 1. Problem */}
          <div style={{ background: '#0d131f', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '12px', padding: '1rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase' }}>
              1. The Painful Problem
            </span>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55 }}>
              {why.problem}
            </p>
          </div>

          {/* 2. Before Docker */}
          <div style={{ background: '#0d131f', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '12px', padding: '1rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase' }}>
              2. What Existed Before Docker
            </span>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55 }}>
              {why.beforeDocker}
            </p>
          </div>

          {/* 3. Docker Solution */}
          <div style={{ background: '#0d131f', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '1rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
              3. The Docker Solution
            </span>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55 }}>
              {why.dockerSolution}
            </p>
          </div>

          {/* 4. Result */}
          <div style={{ background: '#0d131f', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '12px', padding: '1rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase' }}>
              4. Concrete Engineering Result
            </span>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55 }}>
              {why.result}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // SECTION 3: REAL-WORLD SCENARIO
  const renderSection3 = () => {
    const sc = concept.scenario || {
      title: 'Realistic Developer Scenario',
      setup: 'A distributed engineering team collaborating across macOS, Windows, and Linux.',
      problem: 'Developer machine discrepancies causing unexpected runtime crashes.',
      solution: 'Standardizing container execution using explicit configuration flags.',
      productionContext: 'Automated CI/CD validation and cloud cluster rollout.',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#a855f7', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 3: Real-World Scenario
          </h2>
        </div>

        <div
          style={{
            background: 'rgba(168, 85, 247, 0.05)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={16} color="#c084fc" />
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc' }}>
              {sc.title}
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
                Setup & Context
              </span>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                {sc.setup}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase' }}>
                The Friction Point
              </span>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                {sc.problem}
              </p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.75rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase' }}>
              The Engineering Resolution
            </span>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: '#f1f5f9', lineHeight: 1.5 }}>
              {sc.solution}
            </p>
          </div>

          {sc.productionContext && (
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                ☁️ Staging & Production Parity:
              </span>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.45 }}>
                {sc.productionContext}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // SECTION 4: MENTAL MODEL
  const renderSection4 = () => {
    const mm = concept.mentalModel || {
      metaphor: 'IMAGE = Recipe | CONTAINER = Running Meal',
      analogy: 'An image is an immutable recipe; a container is the actual food prepared from it.',
      keyInsight: 'Modifying a running container never alters the base image recipe.',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#38bdf8', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 4: Mental Model & Visual Metaphor
          </h2>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(2, 132, 199, 0.04) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          <div
            style={{
              padding: '0.55rem 0.85rem',
              borderRadius: '8px',
              background: '#040711',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              fontWeight: 800,
              color: '#38bdf8',
            }}
          >
            {mm.metaphor}
          </div>

          <p style={{ margin: 0, fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.6 }}>
            {mm.analogy}
          </p>

          <div
            style={{
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              color: '#fbbf24',
              fontSize: '0.82rem',
              fontWeight: 600,
            }}
          >
            <strong>💡 Golden Rule:</strong> {mm.keyInsight}
          </div>
        </div>
      </div>
    );
  };

  // SECTION 5: BLOCK DIAGRAM
  const renderSection5 = () => {
    const diag = concept.architectureDiagram || concept.blockDiagram;
    if (!diag) return null;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#10b981', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 5: Interactive Architecture Diagram
          </h2>
        </div>

        <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8' }}>
          {diag.subtitle}
        </p>

        {/* Clickable Diagram Nodes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0.75rem',
          }}
        >
          {diag.nodes.map((node) => {
            const isSelected = selectedDiagramNode?.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedDiagramNode(node)}
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  background: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'rgba(15, 23, 42, 0.65)',
                  border: isSelected ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: node.color || '#38bdf8',
                      textTransform: 'uppercase',
                    }}
                  >
                    {node.badge || 'Component'}
                  </span>
                  {isSelected && <Sparkles size={13} color="#38bdf8" />}
                </div>

                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f8fafc' }}>
                  {node.label}
                </div>

                <div style={{ fontSize: '0.76rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  {node.simpleDef}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Technical Inspection Drawer */}
        {selectedDiagramNode && (
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              background: '#040711',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={15} color="#38bdf8" />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                Architecture Inspector: {selectedDiagramNode.label}
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.55, fontFamily: 'monospace' }}>
              {selectedDiagramNode.techDef}
            </div>
          </div>
        )}
      </div>
    );
  };

  // SECTION 6: TERMINOLOGY (CLICKABLE TERMS)
  const renderSection6 = () => {
    const terms = concept.terms || [];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#c084fc', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 6: Clickable Terminology
          </h2>
        </div>

        <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8' }}>
          Never encounter unexplained jargon. Click any term to inspect simple definitions, technical breakdowns, and common confusions:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
          {terms.map((t) => (
            <button
              key={t.term}
              onClick={() => handleOpenGlossaryTerm(t.term)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '9999px',
                padding: '0.45rem 0.85rem',
                color: '#38bdf8',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.2)';
                e.currentTarget.style.borderColor = '#38bdf8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
              }}
            >
              <span>{t.term}</span>
              <ArrowRight size={12} />
            </button>
          ))}
        </div>
      </div>
    );
  };

  // SECTION 7: SYNTAX & TOKEN EXPLORER
  const renderSection7 = () => {
    const tokens = concept.syntaxTokens || [];
    const activeToken = selectedTokenIndex !== null ? tokens[selectedTokenIndex] : null;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#38bdf8', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 7: Syntax & Interactive Token Explorer
          </h2>
        </div>

        <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8' }}>
          Every single token in the command has an explicit purpose. Click any token to inspect its role:
        </p>

        {/* Command Tokens Ribbon */}
        <div
          style={{
            background: '#040711',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {tokens.map((tok, idx) => {
            const isSelected = selectedTokenIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedTokenIndex(idx)}
                style={{
                  background: isSelected ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '0.45rem 0.75rem',
                  color: isSelected ? '#38bdf8' : '#e2e8f0',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{tok.token}</span>
                <span style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'sans-serif' }}>
                  {tok.role}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Token Detail Card */}
        {activeToken && (
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'monospace', fontWeight: 900, color: '#38bdf8', fontSize: '1rem' }}>
                {activeToken.token}
              </span>
              <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '4px', color: '#38bdf8', fontWeight: 800 }}>
                {activeToken.role}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.5 }}>
              {activeToken.explanation}
            </p>
          </div>
        )}
      </div>
    );
  };

  // SECTION 8: SYNTAX VARIATIONS
  const renderSection8 = () => {
    const variations = concept.variations || [];
    const activeVar = variations[selectedVariationIndex] || variations[0];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#f59e0b', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 8: Syntax Variations & Pragmatic Use Cases
          </h2>
        </div>

        <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8' }}>
          Compare real-world variations. Inspect when to use each flag, when NOT to use it, and potential risks:
        </p>

        {/* Variation Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {variations.map((v, idx) => {
            const isSelected = selectedVariationIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedVariationIndex(idx)}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: '8px',
                  background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isSelected ? '#fbbf24' : '#cbd5e1',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span>{v.title}</span>
                {isSelected && <Sparkles size={12} color="#f59e0b" />}
              </button>
            );
          })}
        </div>

        {/* Active Variation Card */}
        {activeVar && (
          <div
            style={{
              background: '#0d131f',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}
          >
            <code
              style={{
                display: 'block',
                background: '#040711',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                color: '#4ade80',
                fontFamily: 'monospace',
                fontSize: '0.86rem',
              }}
            >
              $ {activeVar.command || activeVar.syntax}
            </code>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                  What It Does
                </span>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                  {activeVar.whatItDoes}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase' }}>
                  When To Use
                </span>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                  {activeVar.whenToUse}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase' }}>
                  When NOT To Use
                </span>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                  {activeVar.whenNotToUse || 'When explicit production flags are required.'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase' }}>
                  Risk & Expected Result
                </span>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                  <strong>Risk:</strong> {activeVar.risk || 'Low risk.'}
                  <br />
                  <strong>Result:</strong> {activeVar.expectedResult || 'State updated.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // SECTION 9: WHAT CHANGES?
  const renderSection9 = () => {
    const before = concept.stateBefore || { images: 1, containers: 0, volumes: 0, networks: 1, details: ['Clean state'] };
    const after = concept.stateAfter || { images: 1, containers: 1, volumes: 0, networks: 1, details: ['Active state'], highlightedChanges: ['+1 Container'] };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#10b981', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 9: What Changes in Docker State?
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {/* Before */}
          <div style={{ background: '#0d131f', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '1rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
              Docker State: BEFORE Execution
            </span>
            <div style={{ display: 'flex', gap: '0.75rem', margin: '0.65rem 0' }}>
              <span style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>📦 Images: <strong>{before.images ?? 1}</strong></span>
              <span style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>⚙️ Containers: <strong>{before.containers ?? 0}</strong></span>
              <span style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>💾 Volumes: <strong>{before.volumes ?? 0}</strong></span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5 }}>
              {before.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div style={{ background: '#0d131f', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '1rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase' }}>
              Docker State: AFTER Execution (Highlighted)
            </span>
            <div style={{ display: 'flex', gap: '0.75rem', margin: '0.65rem 0' }}>
              <span style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>📦 Images: <strong>{after.images ?? 1}</strong></span>
              <span style={{ fontSize: '0.76rem', color: '#34d399' }}>⚙️ Containers: <strong>{after.containers ?? 1}</strong></span>
              <span style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>💾 Volumes: <strong>{after.volumes ?? 0}</strong></span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.78rem', color: '#a7f3d0', lineHeight: 1.5 }}>
              {(after.highlightedChanges || []).map((hc, i) => (
                <li key={i}><strong>{hc}</strong></li>
              ))}
              {after.details.map((d, i) => (
                <li key={'d-' + i} style={{ color: '#cbd5e1' }}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // SECTION 10: WHAT DOES NOT CHANGE? (MANDATORY SECTION!)
  const renderSection10 = () => {
    const unchanged = concept.stateUnchanged || [
      'The base container image is never modified (images are strictly read-only).',
      'No persistent volume is created unless explicitly specified with -v or --mount.',
      'No ports are published to your browser unless you pass -p HOST:CONTAINER.',
      'Host system files outside the container remain completely untouched.',
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#ef4444', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 10: What Does NOT Change? (Mandatory Invariant Rules)
          </h2>
        </div>

        <div
          style={{
            background: 'rgba(239, 68, 68, 0.06)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
            <AlertTriangle size={16} color="#ef4444" />
            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase' }}>
              Crucial Invariants to Prevent False Assumptions
            </span>
          </div>

          <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {unchanged.map((item, idx) => (
              <li key={idx} style={{ fontSize: '0.84rem', color: '#fca5a5', lineHeight: 1.5 }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // SECTION 11: EXPECTED TERMINAL OUTPUT
  const renderSection11 = () => {
    const outputs = concept.expectedOutput || [
      {
        line: `$ ${concept.command}`,
        explanation: 'Command executed by user in terminal.',
        whyItAppears: 'Terminal standard prompt echo.',
        whatToLookAt: 'Verify correct options and syntax.',
      },
    ];
    const activeLine = selectedOutputLineIndex !== null ? outputs[selectedOutputLineIndex] : null;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#38bdf8', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 11: Expected Terminal Output (Click Any Line)
          </h2>
        </div>

        <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8' }}>
          Click any output line below to understand what Docker is telling you and why it appears:
        </p>

        {/* Clickable Terminal Output Box */}
        <div
          style={{
            background: '#040711',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '12px',
            padding: '1rem',
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
          }}
        >
          {outputs.map((out, idx) => {
            const isSelected = selectedOutputLineIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedOutputLineIndex(idx)}
                style={{
                  padding: '0.45rem 0.65rem',
                  borderRadius: '6px',
                  background: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  border: isSelected ? '1px solid #38bdf8' : '1px solid transparent',
                  cursor: 'pointer',
                  color: out.type === 'success' ? '#4ade80' : out.type === 'header' ? '#38bdf8' : '#e2e8f0',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{out.line}</span>
                <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Inspect ℹ️</span>
              </div>
            );
          })}
        </div>

        {/* Selected Output Line Explanation Card */}
        {activeLine && (
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                What Docker is Telling You:
              </span>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#f1f5f9', lineHeight: 1.5 }}>
                {activeLine.explanation}
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem', marginTop: '0.25rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase' }}>
                  Why It Appears:
                </span>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  {activeLine.whyItAppears}
                </p>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase' }}>
                  What You Should Check:
                </span>
                <p style={{ margin: '0.15rem 0 0', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  {activeLine.whatToLookAt}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // SECTION 12: COMMON MISTAKES
  const renderSection12 = () => {
    const mistakes = concept.commonMistakes || [];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#ef4444', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 12: Common Pitfalls & Dangerous Mistakes
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {mistakes.map((m, idx) => (
            <div
              key={idx}
              style={{
                background: '#0d131f',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.45rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <AlertTriangle size={16} color="#ef4444" />
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fca5a5' }}>
                  Mistake: {m.mistake}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                <strong>Why it’s wrong:</strong> {m.whyWrong}
              </p>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#34d399', lineHeight: 1.5 }}>
                <strong>The Senior Engineer Way:</strong> {m.correctWay}
              </p>
              {m.dangerousConsequence && (
                <div style={{ fontSize: '0.76rem', color: '#f87171', background: 'rgba(239, 68, 68, 0.1)', padding: '0.35rem 0.65rem', borderRadius: '6px' }}>
                  ⚠️ <strong>Dangerous Consequence:</strong> {m.dangerousConsequence}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // SECTION 13: SAFE CONTROLLED FAILURE
  const renderSection13 = () => {
    const sf = concept.safeFailure || {
      mistakeCommand: 'docker run -d nginx',
      mistakeTitle: 'Running without port publishing',
      consequence: 'Container runs but browser cannot access port 80.',
      diagnosticQuestion: 'Why is the web app unreachable?',
      diagnosticAnswer: 'Port was not published with -p.',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#f59e0b', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 13: Safe Failure Diagnostic Lab
          </h2>
        </div>

        <div
          style={{
            background: 'rgba(245, 158, 11, 0.06)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase' }}>
              Controlled Failure Experiment: {sf.mistakeTitle}
            </span>
            <code
              style={{
                display: 'block',
                margin: '0.45rem 0',
                background: '#040711',
                padding: '0.55rem 0.85rem',
                borderRadius: '8px',
                color: '#f87171',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
              }}
            >
              $ {sf.mistakeCommand}
            </code>
          </div>

          <div style={{ fontSize: '0.84rem', color: '#fef3c7', lineHeight: 1.5 }}>
            <strong>Observed Consequence:</strong> {sf.consequence}
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.75rem' }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#f8fafc' }}>
              Diagnostic Question: {sf.diagnosticQuestion}
            </span>

            {!safeFailureAnswered ? (
              <div style={{ marginTop: '0.65rem' }}>
                <button
                  onClick={() => setSafeFailureAnswered(true)}
                  style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    borderRadius: '8px',
                    padding: '0.45rem 0.85rem',
                    color: '#fbbf24',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Reveal Diagnostic Explanation →
                </button>
              </div>
            ) : (
              <div
                style={{
                  marginTop: '0.65rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#34d399',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                }}
              >
                <strong>Root Cause Diagnosis:</strong> {sf.diagnosticAnswer}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // SECTION 14: STEP-BY-STEP RECOVERY (5 PROGRESSIVE HINTS)
  const renderSection14 = () => {
    const rec = concept.recoverySteps || {
      hint1_conceptual: 'Think about how containers isolate processes.',
      hint2_object: 'Inspect the relevant Docker object state.',
      hint3_commandFamily: 'Identify the main Docker subcommand.',
      hint4_syntaxStructure: 'Formulate flags and arguments.',
      hint5_exactCommand: concept.command,
    };

    const hints = [
      { level: 1, label: 'Hint 1: Conceptual Direction', text: rec.hint1_conceptual },
      { level: 2, label: 'Hint 2: Docker Object / Resource', text: rec.hint2_object },
      { level: 3, label: 'Hint 3: Command Subfamily', text: rec.hint3_commandFamily },
      { level: 4, label: 'Hint 4: Syntax Structure', text: rec.hint4_syntaxStructure },
      { level: 5, label: 'Hint 5: Authoritative Exact Command', text: rec.hint5_exactCommand, isCode: true },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#38bdf8', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 14: Step-by-Step Recovery (5 Progressive Hints)
          </h2>
        </div>

        <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8' }}>
          Never give away answers immediately. Progressively reveal hints from high-level concept down to the exact command:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {hints.map((h) => {
            const isRevealed = revealedHintLevel >= h.level;
            return (
              <div
                key={h.level}
                style={{
                  background: isRevealed ? '#0d131f' : 'rgba(255, 255, 255, 0.02)',
                  border: isRevealed ? '1px solid rgba(56, 189, 248, 0.25)' : '1px dashed rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: isRevealed ? '#38bdf8' : '#64748b', textTransform: 'uppercase' }}>
                    {h.label}
                  </span>
                  {isRevealed ? (
                    h.isCode ? (
                      <code style={{ display: 'block', margin: '0.35rem 0 0', color: '#4ade80', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        $ {h.text}
                      </code>
                    ) : (
                      <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.45 }}>
                        {h.text}
                      </p>
                    )
                  ) : (
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic' }}>
                      Locked. Reveal previous hint to unlock.
                    </p>
                  )}
                </div>

                {!isRevealed && revealedHintLevel === h.level - 1 && (
                  <button
                    onClick={() => setRevealedHintLevel(h.level)}
                    style={{
                      background: 'rgba(56, 189, 248, 0.12)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: '6px',
                      padding: '0.35rem 0.75rem',
                      color: '#38bdf8',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Unlock Hint {h.level}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // SECTION 15: INTERACTIVE SIMULATOR (DOCKER WORLD)
  const renderSection15 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '6px', height: '18px', background: '#38bdf8', borderRadius: '3px' }} />
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
          Section 15: Interactive Docker World Simulator
        </h2>
      </div>

      <DockerWorldSimulator
        concept={concept}
        showToast={showToast}
        onActionComplete={() => showToast('Simulation step completed!')}
      />
    </div>
  );

  // SECTION 16: TERMINAL PRACTICE
  const renderSection16 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '6px', height: '18px', background: '#10b981', borderRadius: '3px' }} />
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
          Section 16: Synchronized Terminal Practice
        </h2>
      </div>

      <p style={{ margin: 0, fontSize: '0.84rem', color: '#94a3b8' }}>
        Practice typing real Docker commands. The terminal is directly synchronized with the simulated Docker Engine:
      </p>

      {/* Terminal Sandbox */}
      <div
        style={{
          background: '#040711',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            padding: '0.5rem 1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontFamily: 'monospace' }}>
            bash - docker-sandbox
          </span>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
          </div>
        </div>

        {/* Logs Stream */}
        <div
          style={{
            padding: '1rem',
            maxHeight: '220px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
          }}
        >
          {terminalLogs.map((log, idx) => (
            <div
              key={idx}
              style={{
                color: log.type === 'error' ? '#f87171' : log.type === 'input' ? '#38bdf8' : '#cbd5e1',
              }}
            >
              {log.text}
            </div>
          ))}
        </div>

        {/* Prompt Input Form */}
        <form
          onSubmit={handleTerminalSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0.65rem 1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(0, 0, 0, 0.4)',
          }}
        >
          <span style={{ color: '#4ade80', fontFamily: 'monospace', marginRight: '0.5rem', fontWeight: 800 }}>
            $
          </span>
          <input
            type="text"
            placeholder={`Try typing: ${concept.command}`}
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
            }}
          />
          <button
            type="submit"
            style={{
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '6px',
              padding: '0.25rem 0.65rem',
              color: '#38bdf8',
              fontSize: '0.74rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );

  // SECTION 17: INDEPENDENT EVALUATED CHALLENGE
  const renderSection17 = () => {
    const ch = concept.challengeComprehensive || {
      title: `Hands-on Mastery Challenge: ${concept.title}`,
      objective: `Execute the authoritative command for ${concept.title}.`,
      scenario: 'Your team requires configuring this Docker capability following best practices.',
      requirements: [`Execute '${concept.command}' accurately`],
      solutionCommand: concept.command,
      hints: [`Start with: ${concept.command.split(' ')[0]}`],
      explanation: 'Executing this command satisfies all technical requirements.',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '6px', height: '18px', background: '#eab308', borderRadius: '3px' }} />
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
            Section 17: Independent Evaluated Challenge
          </h2>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.08) 0%, rgba(202, 138, 4, 0.03) 100%)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#fef08a' }}>
              {ch.title}
            </h3>
            <span
              style={{
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                background: 'rgba(234, 179, 8, 0.15)',
                color: '#facc15',
                fontSize: '0.72rem',
                fontWeight: 800,
              }}
            >
              Independent Test
            </span>
          </div>

          <p style={{ margin: 0, fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.5 }}>
            <strong>Objective:</strong> {ch.objective}
          </p>

          <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
            <strong>Scenario:</strong> {ch.scenario}
          </p>

          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#facc15', textTransform: 'uppercase' }}>
              Technical Requirements:
            </span>
            <ul style={{ margin: '0.25rem 0 0', paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#fef08a' }}>
              {ch.requirements.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          {/* Interactive Challenge Input Field */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input
              type="text"
              placeholder={`Enter full docker command (e.g. ${ch.solutionCommand.slice(0, 15)}...)`}
              value={challengeInput}
              onChange={(e) => setChallengeInput(e.target.value)}
              style={{
                flex: 1,
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                background: '#040711',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#4ade80',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
            <button
              onClick={handleValidateChallenge}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
                color: '#000',
                border: 'none',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              Evaluate Solution
            </button>
          </div>

          {/* Result Alert */}
          {challengeResult === 'success' && (
            <div
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                color: '#34d399',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 800 }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>Congratulations! You now thoroughly understand {concept.title}.</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#e2e8f0' }}>
                {ch.explanation}
              </p>
            </div>
          )}

          {challengeResult === 'incorrect' && (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid #ef4444',
                color: '#f87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>Not quite. Re-check the flags or reveal a progressive hint.</span>
              {ch.hints && challengeRevealedHints < ch.hints.length && (
                <button
                  onClick={() => setChallengeRevealedHints((p) => p + 1)}
                  style={{
                    background: 'transparent',
                    border: '1px solid #f87171',
                    borderRadius: '6px',
                    padding: '0.25rem 0.5rem',
                    color: '#f87171',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                  }}
                >
                  Show Hint ({challengeRevealedHints + 1}/{ch.hints.length})
                </button>
              )}
            </div>
          )}

          {challengeRevealedHints > 0 && ch.hints && (
            <div style={{ background: '#040711', borderRadius: '8px', padding: '0.65rem 0.85rem' }}>
              <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 800 }}>
                HINTS:
              </span>
              <ul style={{ margin: '0.25rem 0 0', paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#fef08a' }}>
                {ch.hints.slice(0, challengeRevealedHints).map((hint, i) => (
                  <li key={i}>{hint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        minHeight: 0,
        overflow: 'hidden',
        background: '#090d16',
        color: '#e2e8f0',
      }}
    >
      {/* 1. Header */}
      {renderSectionHeader()}

      {/* 2. Progressive Disclosure Tab Bar */}
      {viewMode === 'stepped' && renderTabBar()}

      {/* 3. Main Stage Content Scroll Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        {/* Chapter 68: Dedicated Real-World Capstone Projects Section */}
        {(concept.topicNumber === '68' || concept.topicId === 'ch-68') && (
          <div style={{ marginBottom: '1.5rem', width: '100%' }}>
            <StandardCapstoneProjectView academy="docker" initialProjectId={concept.id} isEmbedded={true} />
          </div>
        )}

        {viewMode === 'full' ? (
          /* Continuous Full Page Document */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {renderSection1()}
            {renderSection2()}
            {renderSection3()}
            {renderSection4()}
            {renderSection5()}
            {renderSection6()}
            {renderSection7()}
            {renderSection8()}
            {renderSection9()}
            {renderSection10()}
            {renderSection11()}
            {renderSection12()}
            {renderSection13()}
            {renderSection14()}
            {renderSection15()}
            {renderSection16()}
            {renderSection17()}
          </div>
        ) : (
          /* Stepped Progressive Disclosure Tabs */
          <div>
            {activeTab === 1 && (
              <>
                {renderSection1()}
                {renderSection2()}
                {renderSection3()}
                {renderSection4()}
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setActiveTab(2)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      borderRadius: '8px',
                      padding: '0.6rem 1.2rem',
                      color: '#38bdf8',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    <span>Next: Architecture & Diagram</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </>
            )}

            {activeTab === 2 && (
              <>
                {renderSection5()}
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setActiveTab(1)}
                    style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#94a3b8', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setActiveTab(3)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '8px', padding: '0.6rem 1.2rem', color: '#38bdf8', fontWeight: 800, cursor: 'pointer' }}
                  >
                    <span>Next: Terminology & Syntax</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </>
            )}

            {activeTab === 3 && (
              <>
                {renderSection6()}
                {renderSection7()}
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setActiveTab(2)}
                    style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#94a3b8', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setActiveTab(4)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '8px', padding: '0.6rem 1.2rem', color: '#38bdf8', fontWeight: 800, cursor: 'pointer' }}
                  >
                    <span>Next: Variations & State</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </>
            )}

            {activeTab === 4 && (
              <>
                {renderSection8()}
                {renderSection9()}
                {renderSection10()}
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setActiveTab(3)}
                    style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#94a3b8', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setActiveTab(5)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '8px', padding: '0.6rem 1.2rem', color: '#38bdf8', fontWeight: 800, cursor: 'pointer' }}
                  >
                    <span>Next: Output & Recovery</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </>
            )}

            {activeTab === 5 && (
              <>
                {renderSection11()}
                {renderSection12()}
                {renderSection13()}
                {renderSection14()}
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setActiveTab(4)}
                    style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#94a3b8', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setActiveTab(6)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '8px', padding: '0.6rem 1.2rem', color: '#38bdf8', fontWeight: 800, cursor: 'pointer' }}
                  >
                    <span>Next: Live Simulator</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </>
            )}

            {activeTab === 6 && (
              <>
                {renderSection15()}
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setActiveTab(5)}
                    style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#94a3b8', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setActiveTab(7)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '8px', padding: '0.6rem 1.2rem', color: '#38bdf8', fontWeight: 800, cursor: 'pointer' }}
                  >
                    <span>Next: Terminal & Challenge</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </>
            )}

            {activeTab === 7 && (
              <>
                {renderSection16()}
                {renderSection17()}
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => setActiveTab(6)}
                    style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#94a3b8', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    ← Previous
                  </button>
                  {nextConcept && (
                    <button
                      onClick={() => onSelectConcept && onSelectConcept(nextConcept.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', border: 'none', borderRadius: '8px', padding: '0.6rem 1.2rem', color: '#fff', fontWeight: 800, cursor: 'pointer' }}
                    >
                      <span>Proceed to Next Lesson: {nextConcept.title}</span>
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Global Modals */}
      <DockerGlossaryModal
        isOpen={glossaryOpen}
        initialTerm={glossaryInitialTerm}
        onClose={() => setGlossaryOpen(false)}
      />

      <DockerCommandSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectConcept={(cId) => {
          if (onSelectConcept) onSelectConcept(cId);
        }}
      />

      {/* Capstone Runner Modal */}
      {activeCapstone && (
        <StandardCapstoneRunnerModal
          project={activeCapstone}
          isOpen={true}
          onClose={() => setActiveCapstone(null)}
        />
      )}
    </div>
  );
};
