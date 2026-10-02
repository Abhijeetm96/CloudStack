import React, { useState, useEffect } from 'react';
import { UniversalLinuxConcept, BlockDiagramNode } from '../../data/unifiedLinuxData';
import {
  LinuxVisualSystemSimulator,
  INITIAL_VISUAL_SYSTEM_STATE,
  VisualSystemState
} from './LinuxVisualSystemSimulator';
import { LinuxProblemSolverModal } from './LinuxProblemSolverModal';
import {
  BookOpen,
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Layers,
  Sparkles,
  Info,
  Zap,
  Check,
  X,
  Workflow,
  Shield,
  Code2,
  Cpu,
  FolderTree,
  FolderGit2,
  Search,
  FileCode,
  FileText,
  Lock,
  Users,
  ShieldAlert,
  ShieldCheck,
  PlayCircle,
  Server,
  History,
  Share2,
  HardDrive,
  Network,
  Wrench,
  Key,
  Compass,
  FolderPlus,
  Copy,
  Trash2,
  ArrowUpDown,
  Clock,
  Gauge,
  Sliders,
  LucideIcon,
  Play,
  Award,
} from 'lucide-react';
import { getLinuxConceptIcon } from '../../data/linuxIcons';
import { LINUX_CAPSTONES } from '../../../platform/capstones/data/linuxCapstones';
import { StandardCapstoneRunnerModal } from '../../../platform/capstones/StandardCapstoneRunnerModal';
import { CapstoneProject } from '../../../platform/capstones/types';

export interface ChapterSubChapterItem {
  id: string;
  title: string;
  subChapterNumber?: string;
  command?: string;
  icon?: LucideIcon | React.ReactNode;
}

interface LinuxTeachingEngineProps {
  concept: UniversalLinuxConcept;
  completedConceptIds: string[];
  markConceptComplete: (id: string) => void;
  executeCommand: (cmd: string) => any;
  showToast: (msg: string) => void;
  prevConcept?: { id: string; title: string } | null;
  nextConcept?: { id: string; title: string } | null;
  onSelectConcept?: (id: string) => void;
  chapterConcepts?: ChapterSubChapterItem[];
}

export const LinuxTeachingEngine: React.FC<LinuxTeachingEngineProps> = ({
  concept,
  completedConceptIds,
  markConceptComplete,
  executeCommand,
  showToast,
  prevConcept,
  nextConcept,
  onSelectConcept,
  chapterConcepts,
}) => {
  // 5 Learning Stages
  const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [activeCapstone, setActiveCapstone] = useState<CapstoneProject | null>(null);

  // Stage 2: Block Diagram & Terms
  const [selectedDiagramNode, setSelectedDiagramNode] = useState<BlockDiagramNode | null>(
    concept.blockDiagram?.nodes[0] || null
  );
  const [termViewMode, setTermViewMode] = useState<Record<string, 'simple' | 'technical'>>({});

  // Stage 3: Syntax Token Explorer
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number | null>(0);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState<number>(0);

  // Stage 4: Internal Flow Step
  const [activeInternalStep, setActiveInternalStep] = useState<number>(1);
  const [inspectWhyStep, setInspectWhyStep] = useState<number | null>(null);

  // Problem Solver Modal State
  const [showProblemSolver, setShowProblemSolver] = useState<boolean>(false);

  // Live Visual System State (Reactive to terminal commands)
  const [visualSystemState, setVisualSystemState] = useState<VisualSystemState>(INITIAL_VISUAL_SYSTEM_STATE);

  // Stage 5: Terminal Sandbox State
  const [inputCommand, setInputCommand] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{ type: 'input' | 'output' | 'error' | 'hint'; text: string }>
  >([
    { type: 'output', text: '$ LinuxForge Kernel 6.8 Terminal Simulator' },
    { type: 'output', text: `Target Goal: ${concept.sandbox?.targetTask || 'Run command'}` },
  ]);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const isCompleted = completedConceptIds.includes(concept.id);

  // Reset interactive stage states when concept changes
  useEffect(() => {
    setSelectedDiagramNode(concept.blockDiagram?.nodes[0] || null);
    setSelectedTokenIndex(0);
    setSelectedVariationIndex(0);
    setActiveInternalStep(1);
    setInspectWhyStep(null);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);
    setInputCommand('');
    setTerminalHistory([
      { type: 'output', text: '$ LinuxForge Kernel 6.8 Terminal Simulator' },
      { type: 'output', text: `Target Goal: ${concept.sandbox?.targetTask || 'Run command'}` },
    ]);
  }, [concept.id, concept.blockDiagram, concept.sandbox?.targetTask]);

  const toggleTermMode = (termName: string) => {
    setTermViewMode((prev) => ({
      ...prev,
      [termName]: prev[termName] === 'technical' ? 'simple' : 'technical',
    }));
  };

  const resetVisualSystem = () => {
    setVisualSystemState(INITIAL_VISUAL_SYSTEM_STATE);
    showToast('Visual system simulator restored to clean state.');
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCommand.trim()) return;

    const cmd = inputCommand.trim();
    const newHistory = [...terminalHistory, { type: 'input' as const, text: `$ ${cmd}` }];

    const solutionCmds = concept.sandbox?.solutionCommands || [];
    const guidedSteps = concept.sandbox?.guidedSteps || [];
    const isExactSolution = solutionCmds.some((sol) => cmd === sol || cmd.includes(sol));
    const isGuidedCmd = guidedSteps.some((s) => cmd === s.command);

    // Call underlying simulator
    const simResult = executeCommand(cmd);

    if (simResult.stdout && simResult.stdout.length > 0) {
      simResult.stdout.forEach((line: string) => {
        newHistory.push({ type: 'output', text: line });
      });
    }

    if (simResult.stderr && simResult.stderr.length > 0) {
      simResult.stderr.forEach((line: string) => {
        newHistory.push({ type: 'error', text: line });
      });
    }

    // Reactive visual state transitions connected to terminal command execution:
    const trimmedLower = cmd.toLowerCase();
    if (trimmedLower.startsWith('mkdir')) {
      const dirName = cmd.split(/\s+/).slice(-1)[0] || 'projects';
      setVisualSystemState((prev) => ({
        ...prev,
        lastAction: {
          command: cmd,
          consequence: `Created directory node "${dirName}/" with mode 755 in ${prev.currentPath}`,
        }
      }));
    } else if (trimmedLower.startsWith('touch')) {
      const fileName = cmd.split(/\s+/).slice(-1)[0] || 'app.txt';
      setVisualSystemState((prev) => ({
        ...prev,
        lastAction: {
          command: cmd,
          consequence: `Allocated inode for file "${fileName}" with mode 644`,
        }
      }));
    } else if (trimmedLower.startsWith('chmod')) {
      const parts = cmd.split(/\s+/);
      const mode = parts[1] || '755';
      const target = parts[2] || 'file';
      setVisualSystemState((prev) => ({
        ...prev,
        lastAction: {
          command: cmd,
          consequence: `Updated POSIX permission bits of "${target}" to ${mode}`,
        }
      }));
    } else if (trimmedLower.startsWith('systemctl stop')) {
      const srv = cmd.split(/\s+/).slice(-1)[0] || 'nginx';
      setVisualSystemState((prev) => ({
        ...prev,
        services: prev.services.map((s) => s.name.includes(srv) ? { ...s, status: 'INACTIVE' } : s),
        lastAction: {
          command: cmd,
          consequence: `Sent SIGTERM to ${srv}. Unit state transitioned from ACTIVE to INACTIVE.`,
        }
      }));
    } else if (trimmedLower.startsWith('systemctl start')) {
      const srv = cmd.split(/\s+/).slice(-1)[0] || 'nginx';
      setVisualSystemState((prev) => ({
        ...prev,
        services: prev.services.map((s) => s.name.includes(srv) ? { ...s, status: 'ACTIVE' } : s),
        lastAction: {
          command: cmd,
          consequence: `Launched ${srv} daemon. Unit state transitioned to ACTIVE (running).`,
        }
      }));
    } else if (trimmedLower.startsWith('kill')) {
      const targetPid = parseInt(cmd.split(/\s+/).slice(-1)[0], 10) || 1234;
      setVisualSystemState((prev) => ({
        ...prev,
        processes: prev.processes.map((p) => p.pid === targetPid ? { ...p, status: 'DEAD' } : p),
        lastAction: {
          command: cmd,
          consequence: `Delivered signal to PID ${targetPid}. Process terminated and removed from runqueue.`,
        }
      }));
    } else if (trimmedLower.includes('rm -rf /') || (trimmedLower.startsWith('rm') && trimmedLower.includes('/etc'))) {
      setVisualSystemState((prev) => ({
        ...prev,
        lastAction: {
          command: cmd,
          consequence: 'Operation blocked by safety guardrail (--no-preserve-root required).',
          isSafeFailure: true,
          recoveryHint: 'What would you do? Never execute recursive removal on root filesystem trees.',
        }
      }));
    } else {
      setVisualSystemState((prev) => ({
        ...prev,
        lastAction: {
          command: cmd,
          consequence: simResult.stderr.length > 0 ? simResult.stderr[0] : 'Executed successfully with exit code 0.',
          isSafeFailure: simResult.exitCode !== 0,
        }
      }));
    }

    if (isExactSolution) {
      newHistory.push({
        type: 'output',
        text: `🟢 SUCCESS! Target completed: ${concept.sandbox.targetTask}`,
      });
      markConceptComplete(concept.id);
      showToast(`🎉 "${concept.title}" mastered!`);
    } else if (isGuidedCmd) {
      const step = guidedSteps.find((s) => cmd === s.command);
      newHistory.push({
        type: 'output',
        text: `✅ Step complete: ${step?.instruction || 'Command executed.'}`,
      });
    }

    setTerminalHistory(newHistory);
    setInputCommand('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        background: 'var(--bg-app)',
        color: 'var(--text-primary)',
      }}
    >
      {/* ================================================================ */}
      {/* 5-STAGE PEDAGOGICAL SUB-TABS (CloudStack Standard)             */}
      {/* ================================================================ */}
      <div
        style={{
          flexShrink: 0,
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-color)',
          padding: '0.4rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflowX: 'auto' }}>
          {[
            { id: 1, label: '1. Meaning', icon: BookOpen },
            { id: 2, label: '2. Architecture', icon: Workflow },
            { id: 3, label: '3. Syntax', icon: Code2 },
            { id: 4, label: '4. Kernel Flow', icon: Cpu },
            { id: 5, label: '5. Hands-on & Quiz', icon: Terminal },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = stage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setStage(item.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.45rem 0.8rem',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
                  color: isActive ? '#06b6d4' : 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={14} color={isActive ? '#06b6d4' : 'var(--text-muted)'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          {/* I HAVE A PROBLEM Diagnostic Trigger */}
          <button
            onClick={() => setShowProblemSolver(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#f87171',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.15)',
              whiteSpace: 'nowrap',
            }}
          >
            <AlertTriangle size={14} color="#ef4444" />
            <span>I HAVE A PROBLEM</span>
          </button>

          {/* Concept Mastered Toggle */}
          <button
            onClick={() => {
              markConceptComplete(concept.id);
              showToast(`Marked "${concept.title}" as complete!`);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              background: isCompleted ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              border: isCompleted ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid var(--border-color)',
              color: isCompleted ? '#4ade80' : 'var(--text-muted)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <CheckCircle2 size={14} color={isCompleted ? '#4ade80' : 'var(--text-muted)'} />
            <span>{isCompleted ? 'Mastered' : 'Mark Done'}</span>
          </button>
        </div>
      </div>

      {/* Linux Problem Solver Modal */}
      <LinuxProblemSolverModal
        isOpen={showProblemSolver}
        onClose={() => setShowProblemSolver(false)}
        onNavigateToConcept={(cId) => {
          if (onSelectConcept) onSelectConcept(cId);
        }}
      />

      {/* ================================================================ */}
      {/* SCROLLABLE STAGE CONTENT                                        */}
      {/* ================================================================ */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {/* Sub-Chapters Quick Switcher Strip */}
        {chapterConcepts && chapterConcepts.length > 1 && (
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '0.5rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.68rem',
                fontWeight: 800,
                color: '#06b6d4',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
                paddingRight: '0.55rem',
                borderRight: '1px solid var(--border-color)',
                flexShrink: 0,
              }}
            >
              <Layers size={13} />
              <span>Chapter {concept.topicNumber} Sub-Chapters ({chapterConcepts.length}):</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1, overflowX: 'auto' }}>
              {chapterConcepts.map((sc) => {
                const isCurrent = sc.id === concept.id;
                const isCompleted = completedConceptIds.includes(sc.id);
                return (
                  <button
                    key={sc.id}
                    onClick={() => onSelectConcept?.(sc.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '7px',
                      fontSize: '0.72rem',
                      fontWeight: isCurrent ? 700 : 500,
                      background: isCurrent
                        ? 'rgba(6, 182, 212, 0.22)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: isCurrent
                        ? '1px solid rgba(6, 182, 212, 0.55)'
                        : '1px solid var(--border-color)',
                      color: isCurrent
                        ? '#06b6d4'
                        : isCompleted
                        ? '#4ade80'
                        : 'var(--text-secondary)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                      flexShrink: 0,
                    }}
                    title={`${sc.subChapterNumber ? `${sc.subChapterNumber}: ` : ''}${sc.title}`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={12} color="#4ade80" />
                    ) : sc.icon ? (
                      React.isValidElement(sc.icon) ? (
                        sc.icon
                      ) : typeof sc.icon === 'function' ? (
                        React.createElement(sc.icon as LucideIcon, { size: 12 })
                      ) : null
                    ) : null}
                    <span
                      style={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        opacity: 0.9,
                      }}
                    >
                      {sc.subChapterNumber || sc.id}
                    </span>
                    <span>{sc.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Chapter 30: Dedicated Real-World Capstone Projects Section */}
        {(concept.topicNumber === '30' || concept.topicId === 'pack06-ch30' || concept.topicId.includes('ch30')) && (
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.18) 0%, rgba(15, 23, 42, 0.7) 100%)',
              border: '1.5px solid rgba(6, 182, 212, 0.45)',
              borderRadius: '14px',
              padding: '1.35rem 1.6rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.15rem',
              boxShadow: '0 10px 30px rgba(6, 182, 212, 0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 18px rgba(6, 182, 212, 0.4)',
                  }}
                >
                  <Award size={24} color="#fff" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: '#f8fafc' }}>
                      Linux Academy Capstone Projects (Chapter 30)
                    </h3>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#06b6d4', background: 'rgba(6, 182, 212, 0.2)', border: '1px solid rgba(6, 182, 212, 0.4)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      5 REAL-WORLD LABS
                    </span>
                  </div>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', color: '#cbd5e1' }}>
                    The culmination of Linux mastery: Configure high-availability web stacks, harden enterprise bastion hosts, tune kernel network buffers, triage catastrophic outages, and write self-healing SRE automation.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '0.85rem' }}>
              {LINUX_CAPSTONES.map((cap) => (
                <div
                  key={cap.id}
                  onClick={() => setActiveCapstone(cap)}
                  style={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.6)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#06b6d4', fontFamily: 'monospace' }}>
                        {cap.code}
                      </span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(6, 182, 212, 0.15)', color: '#67e8f9' }}>
                        {cap.difficulty}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.3rem' }}>
                      {cap.title}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {cap.overview}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.6rem' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      {cap.tasks.length} Tasks · {cap.estimatedTime}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCapstone(cap);
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #0891b2, #0284c7)',
                        border: 'none',
                        color: '#fff',
                        padding: '0.35rem 0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <Play size={12} fill="#fff" />
                      <span>Launch Capstone</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Concept Header Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(15, 23, 42, 0.6) 100%)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            borderRadius: '12px',
            padding: '1.15rem 1.35rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            boxShadow: '0 8px 24px -8px rgba(6, 182, 212, 0.2)',
          }}
        >
          {/* Top metadata row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                background: 'rgba(6, 182, 212, 0.22)',
                border: '1px solid rgba(6, 182, 212, 0.35)',
                color: '#06b6d4',
                padding: '0.22rem 0.6rem',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <span>Chapter {concept.topicNumber}</span>
              <span style={{ opacity: 0.4 }}>/</span>
              <span>Sub-Chapter {concept.subChapterNumber || `${concept.topicNumber}.1`}</span>
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-secondary)',
                padding: '0.22rem 0.55rem',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
              }}
            >
              {concept.topicTitle}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                background: 'rgba(148, 163, 184, 0.1)',
                color: '#94a3b8',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
              }}
            >
              {concept.difficulty}
            </span>
            {concept.badges.map((b) => (
              <span
                key={b}
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: 'var(--text-muted)',
                  padding: '0.2rem 0.45rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                }}
              >
                {b}
              </span>
            ))}
          </div>

          {/* Hero Row: 46x46 glowing icon box + Title/Command (Matching Git Academy) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 6px 20px rgba(6, 182, 212, 0.35)',
                flexShrink: 0,
              }}
            >
              {React.createElement(getLinuxConceptIcon(concept), { size: 24 })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: 0 }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#f8fafc', margin: 0, lineHeight: 1.15 }}>
                {concept.title}
              </h1>
              <div
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: '0.9rem',
                  color: '#38bdf8',
                  fontWeight: 600,
                }}
              >
                $ {concept.command}
              </div>
            </div>
          </div>

          {concept.quote && (
            <div
              style={{
                fontStyle: 'italic',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                borderLeft: '2px solid #06b6d4',
                paddingLeft: '0.65rem',
                marginTop: '0.1rem',
              }}
            >
              "{concept.quote}"
            </div>
          )}
        </div>

        {/* -------------------------------------------------------------- */}
        {/* STAGE 1: MEANING & MOTIVATION                                  */}
        {/* -------------------------------------------------------------- */}
        {stage === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1rem',
              }}
            >
              {/* Card 1: What is it? */}
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '1.1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                  <Info size={16} color="#06b6d4" />
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>What is it?</h3>
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                  {concept.whatIsIt}
                </p>
              </div>

              {/* Card 2: In Simple Words */}
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '1.1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                  <Sparkles size={16} color="#f59e0b" />
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>In Simple Words</h3>
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                  {concept.inSimpleWords}
                </p>
              </div>
            </div>

            {/* Real World Analogy */}
            <div
              style={{
                background: 'rgba(6, 182, 212, 0.05)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '10px',
                padding: '1rem 1.25rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                <Zap size={16} color="#06b6d4" />
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#06b6d4', margin: 0 }}>
                  Real-World Mental Analogy
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-primary)', margin: 0 }}>
                {concept.realWorldAnalogy}
              </p>
            </div>

            {/* Without vs With Comparison Matrix */}
            {concept.withoutVsWith && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1rem',
                }}
              >
                {/* Without */}
                <div
                  style={{
                    background: 'rgba(239, 68, 68, 0.05)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    borderRadius: '10px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ef4444', textTransform: 'uppercase' }}>
                    {concept.withoutVsWith.without.title}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {concept.withoutVsWith.without.items.map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 'auto', fontSize: '0.8rem', fontWeight: 600, color: '#fca5a5' }}>
                    {concept.withoutVsWith.without.outcome}
                  </div>
                </div>

                {/* With */}
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.05)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '10px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>
                    {concept.withoutVsWith.with.title}
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {concept.withoutVsWith.with.items.map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: 'auto', fontSize: '0.8rem', fontWeight: 600, color: '#86efac' }}>
                    {concept.withoutVsWith.with.outcome}
                  </div>
                </div>
              </div>
            )}

            {/* Real-World Production Scenario */}
            {concept.realWorldScenario && (
              <div
                style={{
                  background: 'rgba(56, 189, 248, 0.05)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  borderRadius: '10px',
                  padding: '1rem 1.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                  <Server size={16} color="#38bdf8" />
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', margin: 0 }}>
                    Real-World Production Scenario
                  </h4>
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                  {concept.realWorldScenario}
                </p>
              </div>
            )}

            {/* BEFORE / AFTER SYSTEM STATE TRANSITION (Section 8) */}
            {concept.beforeAfter && (
              <div
                style={{
                  background: '#090d16',
                  border: '1px solid rgba(6, 182, 212, 0.25)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    background: '#0f172a',
                    padding: '0.65rem 1rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowUpDown size={15} color="#06b6d4" />
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f8fafc' }}>
                      Before / After System State Transition
                    </span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Observable Kernel & Filesystem Impact</span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1px',
                    background: 'rgba(255, 255, 255, 0.06)',
                  }}
                >
                  {/* Before */}
                  <div style={{ background: '#090d16', padding: '1rem' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      [BEFORE] State:
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        fontFamily: 'monospace',
                        fontSize: '0.78rem',
                        color: '#cbd5e1',
                        background: '#030712',
                        padding: '0.65rem',
                        borderRadius: '6px',
                        overflowX: 'auto',
                        lineHeight: 1.45,
                      }}
                    >
                      {concept.beforeAfter.before}
                    </pre>
                  </div>

                  {/* After */}
                  <div style={{ background: '#090d16', padding: '1rem' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#4ade80', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      [AFTER] State:
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        fontFamily: 'monospace',
                        fontSize: '0.78rem',
                        color: '#86efac',
                        background: '#030712',
                        padding: '0.65rem',
                        borderRadius: '6px',
                        overflowX: 'auto',
                        lineHeight: 1.45,
                      }}
                    >
                      {concept.beforeAfter.after}
                    </pre>
                  </div>
                </div>

                {/* Explanation */}
                <div style={{ padding: '0.75rem 1rem', background: '#0d131f', fontSize: '0.8rem', color: '#94a3b8', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <strong style={{ color: '#38bdf8' }}>State Change Summary: </strong>
                  {concept.beforeAfter.explanation}
                </div>
              </div>
            )}

            {/* WHAT CHANGES VS WHAT DOES NOT CHANGE */}
            {(concept.whatChanges || concept.whatDoesNotChange) && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem',
                }}
              >
                {/* What Changes */}
                <div
                  style={{
                    background: 'rgba(6, 182, 212, 0.04)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    borderRadius: '10px',
                    padding: '0.85rem 1rem',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#06b6d4', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    What Changes on the System:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {(concept.whatChanges || ['Target resource state updates to match command parameters.']).map((ch, idx) => (
                      <li key={idx}>{ch}</li>
                    ))}
                  </ul>
                </div>

                {/* What Does Not Change */}
                <div
                  style={{
                    background: 'rgba(148, 163, 184, 0.04)',
                    border: '1px solid rgba(148, 163, 184, 0.15)',
                    borderRadius: '10px',
                    padding: '0.85rem 1rem',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    What Does NOT Change:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {(concept.whatDoesNotChange || ['Hardware configuration and isolated user files remain untouched.']).map((nc, idx) => (
                      <li key={idx}>{nc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* WHEN TO USE VS WHEN NOT TO USE */}
            {(concept.whenToUse || concept.whenNotToUse) && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem',
                }}
              >
                <div style={{ background: 'rgba(34, 197, 94, 0.04)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '10px', padding: '0.85rem 1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4ade80', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    ✔ When Should You Use This:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {(concept.whenToUse || ['During day-to-day administrative operations and troubleshooting']).map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', padding: '0.85rem 1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f87171', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    ✘ When Should You NOT Use This:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {(concept.whenNotToUse || ['When automated declarative configuration tools manage this layer']).map((nw, idx) => (
                      <li key={idx}>{nw}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* SAFE RECOVERY & TROUBLESHOOTING */}
            {concept.safeRecovery && (
              <div
                style={{
                  background: 'rgba(245, 158, 11, 0.05)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.35rem' }}>
                  <AlertTriangle size={15} />
                  <span>Safe Recovery Protocol:</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {concept.safeRecovery}
                </p>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------- */}
        {/* STAGE 2: ARCHITECTURE & MENTAL MODEL                           */}
        {/* -------------------------------------------------------------- */}
        {stage === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Interactive Block Diagram Nodes */}
            {concept.blockDiagram && (
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 0.25rem 0' }}>
                    {concept.blockDiagram.title}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {concept.blockDiagram.subtitle}
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '0.75rem',
                  }}
                >
                  {concept.blockDiagram.nodes.map((node) => {
                    const isSelected = selectedDiagramNode?.id === node.id;
                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedDiagramNode(node)}
                        style={{
                          background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                          border: isSelected ? '2px solid #06b6d4' : '1px solid var(--border-color)',
                          borderRadius: '10px',
                          padding: '0.85rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: node.color || '#38bdf8', marginBottom: '0.25rem' }}>
                          {node.badge || 'Component'}
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.35rem' }}>
                          {node.label}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                          {node.simpleDef}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Node Details Drawer */}
                {selectedDiagramNode && (
                  <div
                    style={{
                      background: 'rgba(6, 182, 212, 0.08)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      borderRadius: '8px',
                      padding: '0.85rem 1rem',
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#06b6d4', textTransform: 'uppercase' }}>
                      Deep Kernel Inspection: {selectedDiagramNode.label}
                    </div>
                    <div style={{ fontSize: '0.82rem', marginTop: '0.35rem', color: 'var(--text-secondary)' }}>
                      <strong>Technical Implementation:</strong> {selectedDiagramNode.techDef}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Essential Concepts Glossary */}
            {concept.terms && concept.terms.length > 0 && (
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                }}
              >
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 0.85rem 0' }}>
                  Key Terminology & Glossary
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {concept.terms.map((term) => {
                    const mode = termViewMode[term.term] || 'simple';
                    return (
                      <div
                        key={term.term}
                        style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          padding: '0.75rem 1rem',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.35rem',
                          }}
                        >
                          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f8fafc' }}>
                            {term.term}
                          </div>
                          <button
                            onClick={() => toggleTermMode(term.term)}
                            style={{
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              background: 'rgba(6, 182, 212, 0.1)',
                              border: '1px solid rgba(6, 182, 212, 0.3)',
                              color: '#06b6d4',
                              borderRadius: '6px',
                              padding: '0.15rem 0.5rem',
                              cursor: 'pointer',
                            }}
                          >
                            View {mode === 'simple' ? 'Technical' : 'Simple'}
                          </button>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {mode === 'simple' ? term.simple : term.technical}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------- */}
        {/* STAGE 3: SYNTAX & VARIATIONS                                   */}
        {/* -------------------------------------------------------------- */}
        {stage === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Interactive Syntax Token Explorer */}
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.25rem',
              }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>
                Command Syntax Breakdown
              </h3>
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  borderRadius: '8px',
                  padding: '0.85rem 1rem',
                  fontFamily: 'monospace',
                  fontSize: '0.95rem',
                  color: '#38bdf8',
                  marginBottom: '1rem',
                  overflowX: 'auto',
                }}
              >
                {concept.syntaxCode}
              </div>

              {/* Tokens */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {concept.syntaxTokens.map((tok, idx) => (
                  <div
                    key={tok.token}
                    onClick={() => setSelectedTokenIndex(idx)}
                    style={{
                      background: selectedTokenIndex === idx ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      border: selectedTokenIndex === idx ? '1px solid #06b6d4' : '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '0.65rem 0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}
                  >
                    <code style={{ fontSize: '0.82rem', fontWeight: 800, color: '#38bdf8', minWidth: '100px' }}>
                      {tok.token}
                    </code>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'var(--text-muted)',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                      }}
                    >
                      {tok.role}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', flex: 1 }}>
                      {tok.explanation}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Variations Cards */}
            {concept.variations && concept.variations.length > 0 && (
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                }}
              >
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 0.85rem 0' }}>
                  Real-World Flag Variations & Use Cases
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '0.85rem',
                  }}
                >
                  {concept.variations.map((v, idx) => (
                    <div
                      key={v.syntax}
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '0.85rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                      }}
                    >
                      <code style={{ fontSize: '0.8rem', fontWeight: 700, color: '#06b6d4' }}>
                        {v.syntax}
                      </code>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc' }}>
                        {v.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {v.whatItDoes}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 'auto' }}>
                        <strong>When:</strong> {v.whenToUse}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------- */}
        {/* STAGE 4: INTERNAL EXECUTION FLOW                               */}
        {/* -------------------------------------------------------------- */}
        {stage === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.25rem',
              }}
            >
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 0.25rem 0' }}>
                Kernel & Subsystem Execution Pipeline
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>
                Trace how the Linux kernel, system calls, and subsystems process this operation step-by-step:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {concept.internalFlow.map((step) => {
                  const isActive = activeInternalStep === step.step;
                  return (
                    <div
                      key={step.step}
                      onClick={() => setActiveInternalStep(step.step)}
                      style={{
                        background: isActive ? 'rgba(6, 182, 212, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                        border: isActive ? '1px solid #06b6d4' : '1px solid var(--border-color)',
                        borderRadius: '10px',
                        padding: '0.85rem 1rem',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: isActive ? '#06b6d4' : 'rgba(255, 255, 255, 0.1)',
                              color: isActive ? '#fff' : 'var(--text-muted)',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {step.step}
                          </span>
                          <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f8fafc' }}>
                            {step.title}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setInspectWhyStep(inspectWhyStep === step.step ? null : step.step);
                          }}
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            background: 'rgba(6, 182, 212, 0.1)',
                            border: '1px solid rgba(6, 182, 212, 0.3)',
                            color: '#06b6d4',
                            borderRadius: '6px',
                            padding: '0.2rem 0.55rem',
                            cursor: 'pointer',
                          }}
                        >
                          Why This Happens
                        </button>
                      </div>

                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.5rem 0 0 2rem', lineHeight: 1.5 }}>
                        {step.desc}
                      </p>

                      {/* Technical Detail or Why Accordion */}
                      {(isActive || inspectWhyStep === step.step) && (
                        <div
                          style={{
                            marginTop: '0.65rem',
                            marginLeft: '2rem',
                            background: 'rgba(15, 23, 42, 0.6)',
                            borderLeft: '2px solid #06b6d4',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '0 6px 6px 0',
                            fontSize: '0.78rem',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '0.2rem' }}>
                            Technical Implementation:
                          </div>
                          <div>{step.techDetail}</div>
                          <div style={{ color: '#f59e0b', fontWeight: 700, marginTop: '0.35rem', marginBottom: '0.2rem' }}>
                            Rationale:
                          </div>
                          <div>{step.why}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------- */}
        {/* STAGE 5: HANDS-ON PRACTICE & QUIZ                              */}
        {/* -------------------------------------------------------------- */}
        {stage === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Context-Aware Visual System Simulator Connected to Terminal (Section 5, 6, 10) */}
            <LinuxVisualSystemSimulator
              systemState={visualSystemState}
              onResetSystem={resetVisualSystem}
              accentColor="#06b6d4"
            />

            {/* Terminal Sandbox Shell */}
            <div
              style={{
                background: '#090d16',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  background: '#0f172a',
                  padding: '0.5rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Terminal size={14} color="#06b6d4" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1' }}>
                    LinuxForge Interactive Terminal Shell
                  </span>
                </div>
                <button
                  onClick={() => setTerminalHistory([{ type: 'output', text: '$ Shell reset.' }])}
                  style={{
                    fontSize: '0.68rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  Clear
                </button>
              </div>

              {/* Guided Steps Bar */}
              {concept.sandbox?.guidedSteps && concept.sandbox.guidedSteps.length > 0 && (
                <div
                  style={{
                    background: 'rgba(6, 182, 212, 0.06)',
                    padding: '0.5rem 0.85rem',
                    borderBottom: '1px solid rgba(6, 182, 212, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#06b6d4' }}>
                    Guided Practice Steps:
                  </div>
                  {concept.sandbox.guidedSteps.map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.75rem',
                      }}
                    >
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {idx + 1}. {step.instruction}
                      </span>
                      <button
                        onClick={() => setInputCommand(step.command)}
                        style={{
                          fontSize: '0.68rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid var(--border-color)',
                          color: '#38bdf8',
                          borderRadius: '4px',
                          padding: '0.1rem 0.4rem',
                          cursor: 'pointer',
                        }}
                      >
                        Copy: {step.command}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Console Output */}
              <div
                style={{
                  padding: '0.85rem',
                  fontFamily: 'monospace',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  minHeight: '160px',
                  maxHeight: '260px',
                  overflowY: 'auto',
                }}
              >
                {terminalHistory.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      color:
                        item.type === 'input'
                          ? '#f8fafc'
                          : item.type === 'error'
                          ? '#ef4444'
                          : '#a5f3fc',
                    }}
                  >
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Command Input Box */}
              <form
                onSubmit={handleTerminalSubmit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#030712',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '0.4rem 0.85rem',
                }}
              >
                <span style={{ color: '#06b6d4', marginRight: '0.5rem', fontFamily: 'monospace' }}>$</span>
                <input
                  type="text"
                  value={inputCommand}
                  onChange={(e) => setInputCommand(e.target.value)}
                  placeholder="Type Linux command (e.g. ls, uptime, systemctl status)..."
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#f8fafc',
                    fontFamily: 'monospace',
                    fontSize: '0.82rem',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#06b6d4',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#042f2e',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.3rem 0.65rem',
                    cursor: 'pointer',
                  }}
                >
                  Run
                </button>
              </form>
            </div>

            {/* Common Mistakes */}
            {concept.commonMistakes && concept.commonMistakes.length > 0 && (
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.85rem' }}>
                  <AlertTriangle size={16} color="#f59e0b" />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>
                    Common Pitfalls & Mistakes to Avoid
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {concept.commonMistakes.map((m, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(245, 158, 11, 0.05)',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        borderRadius: '8px',
                        padding: '0.85rem',
                      }}
                    >
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f59e0b' }}>
                        ❌ Mistake: {m.mistake}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                        <strong>Why it fails:</strong> {m.whyWrong}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#86efac', marginTop: '0.25rem' }}>
                        <strong>Correct approach:</strong> {m.correctWay}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Concept Quiz Challenge */}
            {concept.challenge && (
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                  <HelpCircle size={16} color="#06b6d4" />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0 }}>Concept Knowledge Check</h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {concept.challenge.question}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {concept.challenge.options.map((opt, idx) => {
                    const isSelected = quizSelectedOption === idx;
                    const showResult = quizSubmitted;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!quizSubmitted) setQuizSelectedOption(idx);
                        }}
                        style={{
                          background:
                            showResult && opt.isCorrect
                              ? 'rgba(34, 197, 94, 0.15)'
                              : showResult && isSelected && !opt.isCorrect
                              ? 'rgba(239, 68, 68, 0.15)'
                              : isSelected
                              ? 'rgba(6, 182, 212, 0.12)'
                              : 'rgba(255, 255, 255, 0.02)',
                          border:
                            showResult && opt.isCorrect
                              ? '1px solid #22c55e'
                              : showResult && isSelected && !opt.isCorrect
                              ? '1px solid #ef4444'
                              : isSelected
                              ? '1px solid #06b6d4'
                              : '1px solid var(--border-color)',
                          borderRadius: '8px',
                          padding: '0.75rem',
                          textAlign: 'left',
                          cursor: quizSubmitted ? 'default' : 'pointer',
                        }}
                      >
                        <div style={{ fontSize: '0.82rem', color: '#f8fafc', lineHeight: 1.4 }}>
                          {opt.label}
                        </div>
                        {showResult && (
                          <div
                            style={{
                              fontSize: '0.74rem',
                              marginTop: '0.35rem',
                              color: opt.isCorrect ? '#86efac' : '#fca5a5',
                            }}
                          >
                            {opt.explanation}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    onClick={() => {
                      if (quizSelectedOption !== null) {
                        setQuizSubmitted(true);
                        const isCorrect = concept.challenge.options[quizSelectedOption].isCorrect;
                        if (isCorrect) {
                          markConceptComplete(concept.id);
                          showToast('🎉 Correct answer! Concept mastered.');
                        }
                      }
                    }}
                    disabled={quizSelectedOption === null}
                    style={{
                      marginTop: '1rem',
                      background: quizSelectedOption !== null ? '#06b6d4' : 'rgba(255, 255, 255, 0.1)',
                      border: 'none',
                      borderRadius: '8px',
                      color: quizSelectedOption !== null ? '#042f2e' : 'var(--text-muted)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '0.5rem 1rem',
                      cursor: quizSelectedOption !== null ? 'pointer' : 'not-allowed',
                    }}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizSelectedOption(null);
                    }}
                    style={{
                      marginTop: '1rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '0.45rem 0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    Retry Quiz
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

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
