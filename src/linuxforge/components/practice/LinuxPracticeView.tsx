import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLinux } from '../../context/LinuxContext';
import { LINUX_30_CHAPTERS, ALL_LINUX_CONCEPTS } from '../../data/topics';
import {
  Terminal,
  Play,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FolderTree,
  FileCode,
  ShieldCheck,
  Cpu,
  Server,
  Activity,
  Layers,
  Search,
  HardDrive,
  Network,
  Globe,
  Clock,
  Archive,
  Flame,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Check,
  ChevronRight,
  Filter,
} from 'lucide-react';

export interface ConceptBrushUp {
  coreConcept: string;
  whyItMatters: string;
  productionGotcha: string;
  keyTakeaway: string;
}

export interface PracticeScenario {
  id: string;
  conceptId: string;
  topicId: string;
  topicNumber: string;
  topicTitle: string;
  moduleCode: string;
  title: string;
  command: string;
  icon: React.ReactNode;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
  targetTask: string;
  solutionCommands: string[];
  hint: string;
  advancedHint?: string;
  conceptBrushUp: ConceptBrushUp;
  initialDirectory?: string;
}

// Map chapter topic numbers to visually distinct domain icons
const getScenarioIcon = (topicNumber: string) => {
  const num = parseInt(topicNumber, 10);
  if (num === 1 || num === 2) return <FolderTree size={16} color="#06b6d4" />;
  if (num === 3 || num === 8) return <Search size={16} color="#38bdf8" />;
  if (num === 4 || num === 17) return <Archive size={16} color="#eab308" />;
  if (num === 5 || num === 19) return <FileCode size={16} color="#a855f7" />;
  if (num === 6 || num === 18) return <Terminal size={16} color="#22c55e" />;
  if (num === 7) return <Layers size={16} color="#38bdf8" />;
  if (num === 9 || num === 10 || num === 22) return <ShieldCheck size={16} color="#10b981" />;
  if (num === 11 || num === 28) return <Cpu size={16} color="#f59e0b" />;
  if (num === 12 || num === 25 || num === 27 || num === 29) return <Server size={16} color="#ec4899" />;
  if (num === 13) return <Archive size={16} color="#6366f1" />;
  if (num === 14) return <HardDrive size={16} color="#f97316" />;
  if (num === 15) return <Network size={16} color="#06b6d4" />;
  if (num === 16) return <Globe size={16} color="#3b82f6" />;
  if (num === 20 || num === 21 || num === 24) return <Activity size={16} color="#ef4444" />;
  if (num === 23) return <Clock size={16} color="#06b6d4" />;
  if (num === 26) return <FileCode size={16} color="#8b5cf6" />;
  if (num === 30) return <Sparkles size={16} color="#f59e0b" />;
  return <Terminal size={16} color="#06b6d4" />;
};

/**
 * EXHAUSTIVE 436-SCENARIO CURRICULUM GENERATOR
 * Generates an interactive practice scenario for every single concept across all 30 chapters
 */
export const ALL_PRACTICE_SCENARIOS: PracticeScenario[] = ALL_LINUX_CONCEPTS.map((concept, idx) => {
  const moduleCode = concept.subChapterNumber
    ? concept.subChapterNumber.replace(/[§\s]/g, '').trim()
    : `${concept.topicNumber}.${(idx % 15) + 1}`;

  const solutions: string[] = [concept.command];
  if (concept.sandbox?.solutionCommands?.length) {
    concept.sandbox.solutionCommands.forEach((cmd) => {
      if (cmd && !solutions.includes(cmd)) solutions.push(cmd);
    });
  }
  if (concept.variations?.length) {
    concept.variations.forEach((v) => {
      const vCmd = v.syntax || (v as any).command;
      if (vCmd && !solutions.includes(vCmd)) solutions.push(vCmd);
    });
  }

  // Also include base command if concept.command has flags or sudo
  const parts = concept.command.split(/\s+/);
  const baseCmd = parts[0] === 'sudo' && parts.length > 1 ? parts[1] : parts[0];
  if (baseCmd && !solutions.includes(baseCmd)) {
    solutions.push(baseCmd);
  }

  const targetTask =
    concept.sandbox?.targetTask ||
    `Execute "${concept.command}" with appropriate options to inspect ${concept.title.toLowerCase()} in Chapter ${concept.topicNumber}: ${concept.topicTitle}.`;

  const hint =
    concept.sandbox?.guidedSteps?.[0]?.hint ||
    `Try running "${concept.command}" in the terminal to inspect ${concept.title}. ${
      concept.whenToUse && concept.whenToUse.length > 0 ? 'When to use: ' + concept.whenToUse[0] : ''
    }`;

  const advancedHint =
    `Syntax: "${concept.syntaxCode || concept.command}". ${
      concept.commonMistakes && concept.commonMistakes.length > 0
        ? 'Watch out: ' + concept.commonMistakes[0].mistake + ' -> ' + (concept.commonMistakes[0].correctWay || '')
        : 'Run with --help or man pages for detailed option flags.'
    }`;

  const conceptBrushUp: ConceptBrushUp = {
    coreConcept:
      concept.whatIsIt ||
      concept.inSimpleWords ||
      `The "${concept.command}" command is an essential Linux utility for ${concept.title.toLowerCase()}.`,
    whyItMatters:
      concept.whyDoYouNeedIt ||
      (concept.whenToUse && concept.whenToUse.length > 0
        ? concept.whenToUse.join('. ')
        : 'Crucial for Linux systems administration, cloud container orchestration, and SRE triage.'),
    productionGotcha:
      concept.commonMistakes?.[0]?.whyWrong ||
      concept.commonMistakes?.[0]?.mistake ||
      (concept.safeRecovery as any)?.failureScenario ||
      'Always verify command options before running with elevated permissions in production.',
    keyTakeaway:
      concept.realWorldScenario ||
      concept.realWorldAnalogy ||
      concept.quote ||
      `Mastering ${concept.command} establishes a strong, reliable Linux systems foundation.`,
  };

  return {
    id: concept.id,
    conceptId: concept.id,
    topicId: concept.topicId,
    topicNumber: concept.topicNumber,
    topicTitle: concept.topicTitle,
    moduleCode,
    title: concept.title,
    command: concept.command,
    icon: getScenarioIcon(concept.topicNumber),
    category: concept.topicTitle,
    difficulty: (concept.difficulty as any) || 'Intermediate',
    description: concept.subtitle || concept.whatIsIt || concept.inSimpleWords || '',
    targetTask,
    solutionCommands: solutions,
    hint,
    advancedHint,
    conceptBrushUp,
  };
});

// Alias for backwards compatibility
export const LINUX_PRACTICE_SCENARIOS = ALL_PRACTICE_SCENARIOS;

const STORAGE_KEY_SOLVED = 'forgesuite:linux_practice_solved_v1';

export const LinuxPracticeView: React.FC = () => {
  const { activeConceptId, executeCommand, setMode } = useLinux();

  // Find initial scenario matching activeConceptId, or default to c-30-01 if on ch30, or first scenario
  const initialScenario = useMemo(() => {
    if (activeConceptId) {
      const match = ALL_PRACTICE_SCENARIOS.find((s) => s.id === activeConceptId);
      if (match) return match;
    }
    return ALL_PRACTICE_SCENARIOS[0];
  }, [activeConceptId]);

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(initialScenario.id);
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unsolved' | 'solved'>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const [commandInput, setCommandInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; stdout: string[]; stderr: string[]; exitCode: number }>>([
    {
      command: 'uname -a',
      stdout: ['Linux linuxforge 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux'],
      stderr: [],
      exitCode: 0,
    },
    {
      command: 'pwd',
      stdout: ['/home/forge'],
      stderr: [],
      exitCode: 0,
    },
  ]);

  // Load and persist solved scenarios
  const [solvedScenarioIds, setSolvedScenarioIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SOLVED);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [attemptsCount, setAttemptsCount] = useState<Record<string, number>>({});
  const [lastAttemptStatus, setLastAttemptStatus] = useState<Record<string, 'none' | 'incorrect' | 'correct'>>({});
  const [lastAttemptCmd, setLastAttemptCmd] = useState<Record<string, string>>({});
  const [showHintMap, setShowHintMap] = useState<Record<string, boolean>>({});
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scenarioItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeScenario = ALL_PRACTICE_SCENARIOS.find((s) => s.id === selectedScenarioId) || ALL_PRACTICE_SCENARIOS[0];
  const isSolved = solvedScenarioIds.includes(activeScenario.id);
  const currentStatus = lastAttemptStatus[activeScenario.id] || (isSolved ? 'correct' : 'none');
  const currentAttempts = attemptsCount[activeScenario.id] || 0;
  const isHintVisible = showHintMap[activeScenario.id] || currentStatus === 'incorrect';

  // If activeConceptId changes externally, update selected scenario
  useEffect(() => {
    if (activeConceptId) {
      const match = ALL_PRACTICE_SCENARIOS.find((s) => s.id === activeConceptId);
      if (match && match.id !== selectedScenarioId) {
        setSelectedScenarioId(match.id);
      }
    }
  }, [activeConceptId]);

  // Persist solved scenario state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SOLVED, JSON.stringify(solvedScenarioIds));
    } catch {
      // ignore storage quota errors
    }
  }, [solvedScenarioIds]);

  // Filter 436 scenarios based on chapter, difficulty, status, and search query
  const filteredScenarios = useMemo(() => {
    return ALL_PRACTICE_SCENARIOS.filter((scen) => {
      // Chapter filter
      if (selectedChapter !== 'all' && scen.topicId !== selectedChapter) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'all' && scen.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }
      // Status filter
      const isScenSolved = solvedScenarioIds.includes(scen.id);
      if (statusFilter === 'unsolved' && isScenSolved) return false;
      if (statusFilter === 'solved' && !isScenSolved) return false;

      // Text search
      const q = searchFilter.trim().toLowerCase();
      if (!q) return true;

      return (
        scen.title.toLowerCase().includes(q) ||
        scen.command.toLowerCase().includes(q) ||
        scen.moduleCode.toLowerCase().includes(q) ||
        scen.category.toLowerCase().includes(q) ||
        scen.topicTitle.toLowerCase().includes(q) ||
        scen.targetTask.toLowerCase().includes(q)
      );
    });
  }, [selectedChapter, selectedDifficulty, statusFilter, searchFilter, solvedScenarioIds]);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const isCommandSolution = (inputCmd: string, scenario: PracticeScenario): boolean => {
    const cleanInput = inputCmd.trim().toLowerCase();
    return scenario.solutionCommands.some((sol) => {
      const cleanSol = sol.trim().toLowerCase();
      const inputNoSudo = cleanInput.startsWith('sudo ') ? cleanInput.slice(5).trim() : cleanInput;
      const solNoSudo = cleanSol.startsWith('sudo ') ? cleanSol.slice(5).trim() : cleanSol;

      // Match exact, includes, base command match, or without sudo
      return (
        cleanInput === cleanSol ||
        inputNoSudo === solNoSudo ||
        cleanInput.includes(cleanSol) ||
        cleanSol.includes(cleanInput) ||
        inputNoSudo.includes(solNoSudo) ||
        (cleanInput.split(' ')[0] === cleanSol.split(' ')[0] && cleanInput.split(' ')[0] !== '')
      );
    });
  };

  const runCmd = (cmdToRun: string) => {
    const trimmed = cmdToRun.trim();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    }

    const res = executeCommand(trimmed);
    const correct = isCommandSolution(trimmed, activeScenario);

    const extraOutputLines: string[] = [];
    if (correct) {
      extraOutputLines.push(`[✓ SUCCESS] Scenario objective accomplished!`);
      extraOutputLines.push(`[BRUSH-UP] ${activeScenario.conceptBrushUp.coreConcept}`);
    } else {
      extraOutputLines.push(`[💡 HINT] You ran "${trimmed}". Not quite! ${activeScenario.hint}`);
    }

    setTerminalHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        stdout: [...res.stdout, ...extraOutputLines],
        stderr: res.stderr,
        exitCode: res.exitCode,
      },
    ]);

    setCommandInput('');
    setHistoryIndex(null);
    setLastAttemptCmd((prev) => ({ ...prev, [activeScenario.id]: trimmed }));

    if (correct) {
      setLastAttemptStatus((prev) => ({ ...prev, [activeScenario.id]: 'correct' }));
      if (!solvedScenarioIds.includes(activeScenario.id)) {
        setSolvedScenarioIds((prev) => [...prev, activeScenario.id]);
      }
    } else {
      setLastAttemptStatus((prev) => ({ ...prev, [activeScenario.id]: 'incorrect' }));
      setAttemptsCount((prev) => ({ ...prev, [activeScenario.id]: (prev[activeScenario.id] || 0) + 1 }));
    }
  };

  const handleNextScenario = () => {
    const list = filteredScenarios.length > 0 ? filteredScenarios : ALL_PRACTICE_SCENARIOS;
    const currentIndex = list.findIndex((s) => s.id === activeScenario.id);
    const nextScenario = list[(currentIndex + 1) % list.length];
    if (nextScenario) {
      setSelectedScenarioId(nextScenario.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCmd(commandInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const executedCmds = terminalHistory.map((h) => h.command);
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (executedCmds.length === 0) return;
      const nextIdx = historyIndex === null ? executedCmds.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setCommandInput(executedCmds[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= executedCmds.length) {
        setHistoryIndex(null);
        setCommandInput('');
      } else {
        setHistoryIndex(nextIdx);
        setCommandInput(executedCmds[nextIdx] || '');
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        height: '100%',
        minHeight: 0,
        background: 'var(--bg-app)',
        color: 'var(--text-primary)',
        overflow: 'hidden',
      }}
    >
      {/* ================================================================ */}
      {/* LEFT COLUMN: EXHAUSTIVE 436 SCENARIOS LIST WITH FILTERS         */}
      {/* ================================================================ */}
      <aside
        style={{
          width: '360px',
          minWidth: '360px',
          maxWidth: '360px',
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Header & Overall Stats */}
        <div
          style={{
            padding: '1rem 1.1rem 0.75rem 1.1rem',
            borderBottom: '1px solid var(--border-color)',
            background: 'rgba(6, 182, 212, 0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 2px 8px rgba(6, 182, 212, 0.3)',
              }}
            >
              <Terminal size={17} />
            </div>
            <div>
              <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#fff' }}>Linux Practice Drills</div>
              <div style={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 600 }}>
                {ALL_PRACTICE_SCENARIOS.length} Exhaustive Practice Scenarios
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            <span>Progress: <strong style={{ color: '#fff' }}>{solvedScenarioIds.length}</strong> of {ALL_PRACTICE_SCENARIOS.length} solved</span>
            <span style={{ color: '#06b6d4', fontWeight: 700 }}>
              {Math.round((solvedScenarioIds.length / ALL_PRACTICE_SCENARIOS.length) * 100)}%
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: '5px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.1)',
              marginTop: '0.35rem',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(solvedScenarioIds.length / ALL_PRACTICE_SCENARIOS.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #06b6d4, #10b981)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Filter Controls: Chapter Dropdown, Search, Difficulty, Status */}
        <div style={{ padding: '0.65rem 0.85rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {/* Chapter Selector Dropdown */}
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            style={{
              width: '100%',
              padding: '0.4rem 0.55rem',
              borderRadius: '6px',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-color)',
              color: '#e2e8f0',
              fontSize: '0.75rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">All 30 Chapters ({ALL_PRACTICE_SCENARIOS.length} Scenarios)</option>
            {LINUX_30_CHAPTERS.map((ch) => (
              <option key={ch.id} value={ch.id}>
                Ch {ch.number}: {ch.title} ({ch.concepts.length} drills)
              </option>
            ))}
          </select>

          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <Search size={13} color="var(--text-muted)" style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder={`Search ${filteredScenarios.length} drills (e.g. nginx, chmod, iptables)...`}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.38rem 0.6rem 0.38rem 2rem',
                borderRadius: '6px',
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '0.76rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Quick Filters: Difficulty & Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              {(['all', 'Beginner', 'Intermediate', 'Advanced'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  style={{
                    padding: '0.2rem 0.4rem',
                    borderRadius: '4px',
                    fontSize: '0.66rem',
                    fontWeight: selectedDifficulty === diff ? 700 : 500,
                    background: selectedDifficulty === diff ? 'rgba(6, 182, 212, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    border: selectedDifficulty === diff ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid transparent',
                    color: selectedDifficulty === diff ? '#38bdf8' : 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  {diff === 'all' ? 'All' : diff.slice(0, 3)}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              {(['all', 'unsolved', 'solved'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  style={{
                    padding: '0.2rem 0.4rem',
                    borderRadius: '4px',
                    fontSize: '0.66rem',
                    fontWeight: statusFilter === st ? 700 : 500,
                    background: statusFilter === st ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    border: statusFilter === st ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid transparent',
                    color: statusFilter === st ? '#86efac' : 'var(--text-muted)',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scenarios Scrollable List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.65rem' }}>
          {filteredScenarios.length === 0 ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              No practice drills match your filter criteria.
            </div>
          ) : (
            filteredScenarios.map((scen) => {
              const isSelected = scen.id === selectedScenarioId;
              const isScenSolved = solvedScenarioIds.includes(scen.id);

              return (
                <button
                  key={scen.id}
                  ref={(el) => {
                    scenarioItemRefs.current[scen.id] = el;
                  }}
                  onClick={() => setSelectedScenarioId(scen.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.75rem 0.85rem',
                    borderRadius: '8px',
                    marginBottom: '0.45rem',
                    background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid rgba(6, 182, 212, 0.45)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.65rem',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ marginTop: '2px' }}>{scen.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#06b6d4' }}>
                        § {scen.moduleCode}
                      </span>
                      {isScenSolved ? (
                        <span style={{ fontSize: '0.65rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 700 }}>
                          <CheckCircle2 size={12} /> Solved
                        </span>
                      ) : (
                        <span
                          style={{
                            fontSize: '0.62rem',
                            padding: '1px 5px',
                            borderRadius: '4px',
                            background:
                              scen.difficulty === 'Beginner'
                                ? 'rgba(16, 185, 129, 0.15)'
                                : scen.difficulty === 'Intermediate'
                                ? 'rgba(245, 158, 11, 0.15)'
                                : 'rgba(239, 68, 68, 0.15)',
                            color:
                              scen.difficulty === 'Beginner'
                                ? '#34d399'
                                : scen.difficulty === 'Intermediate'
                                ? '#fbbf24'
                                : '#f87171',
                            fontWeight: 700,
                          }}
                        >
                          {scen.difficulty}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: isSelected ? '#fff' : 'var(--text-primary)',
                        marginTop: '0.2rem',
                        lineHeight: 1.25,
                      }}
                    >
                      {scen.title}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      Ch {scen.topicNumber}: {scen.topicTitle}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* ================================================================ */}
      {/* RIGHT COLUMN: SCENARIO DETAILS, DYNAMIC FEEDBACK & TERMINAL     */}
      {/* ================================================================ */}
      <section
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minWidth: 0,
          background: 'var(--bg-app)',
        }}
      >
        {/* Top Scenario Banner */}
        <div
          style={{
            padding: '1rem 1.4rem',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  color: '#06b6d4',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                }}
              >
                Chapter {activeScenario.topicNumber} • § {activeScenario.moduleCode}
              </div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                {activeScenario.title}
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setShowHintMap((prev) => ({ ...prev, [activeScenario.id]: !prev[activeScenario.id] }))}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '6px',
                  background: isHintVisible ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  border: isHintVisible ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-color)',
                  color: isHintVisible ? '#fbbf24' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
                title="Toggle helpful hint"
              >
                <Lightbulb size={13} /> {isHintVisible ? 'Hide Hint' : 'Show Hint'}
              </button>
              <button
                onClick={() => setTerminalHistory([])}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <RotateCcw size={13} /> Clear Screen
              </button>
              <button
                onClick={() => setMode('academy')}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '6px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  color: '#06b6d4',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Back to Lessons
              </button>
            </div>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            {activeScenario.description}
          </div>

          {/* Task Action Bar */}
          <div
            style={{
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              background: 'rgba(6, 182, 212, 0.08)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#06b6d4' }}>🎯 TASK:</span>
              <span style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600 }}>{activeScenario.targetTask}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Quick test:</span>
              {activeScenario.solutionCommands.slice(0, 2).map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => runCmd(cmd)}
                  style={{
                    padding: '0.22rem 0.55rem',
                    borderRadius: '4px',
                    background: 'rgba(6, 182, 212, 0.2)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    color: '#38bdf8',
                    fontFamily: 'monospace',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                  title="Click to execute in terminal"
                >
                  <Play size={10} /> {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC FEEDBACK 1: USER IS WRONG -> SHOW GUIDED HINTS */}
          {currentStatus === 'incorrect' && (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontSize: '0.82rem', fontWeight: 800 }}>
                  <AlertTriangle size={15} />
                  <span>Not quite! Here is a hint:</span>
                </div>
                {lastAttemptCmd[activeScenario.id] && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Attempt #{currentAttempts} ({lastAttemptCmd[activeScenario.id]})
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#fde68a', lineHeight: 1.45 }}>
                💡 <strong>Hint: </strong> {activeScenario.hint}
              </div>
              {currentAttempts >= 2 && activeScenario.advancedHint && (
                <div style={{ fontSize: '0.76rem', color: '#cbd5e1', background: 'rgba(0,0,0,0.25)', padding: '0.4rem 0.6rem', borderRadius: '5px', marginTop: '0.2rem' }}>
                  <strong>Detailed guidance: </strong> {activeScenario.advancedHint}
                </div>
              )}
            </div>
          )}

          {/* DYNAMIC FEEDBACK 2: USER IS CORRECT OR SOLVED -> CONCEPT BRUSH-UP */}
          {(currentStatus === 'correct' || isSolved) && (
            <div
              style={{
                padding: '0.85rem 1.15rem',
                borderRadius: '8px',
                background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10b981',
                    }}
                  >
                    <CheckCircle2 size={15} />
                  </div>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#34d399' }}>
                    Challenge Complete! Concept Brush-Up:
                  </span>
                </div>

                <button
                  onClick={handleNextScenario}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '6px',
                    background: 'rgba(16, 185, 129, 0.2)',
                    border: '1px solid rgba(16, 185, 129, 0.5)',
                    color: '#86efac',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  <span>Next Drill</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              {/* Core Concept Breakdown */}
              <div style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                <strong style={{ color: '#38bdf8' }}>Core Mechanism: </strong>
                {activeScenario.conceptBrushUp.coreConcept}
              </div>

              {/* SRE / Production Impact */}
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                <strong style={{ color: '#a78bfa' }}>Why it matters in Production: </strong>
                {activeScenario.conceptBrushUp.whyItMatters}
              </div>

              {/* Production Gotcha */}
              <div style={{ fontSize: '0.76rem', color: '#fbbf24', lineHeight: 1.4, background: 'rgba(0,0,0,0.25)', padding: '0.35rem 0.65rem', borderRadius: '5px' }}>
                <strong>⚠️ SRE Gotcha: </strong>
                {activeScenario.conceptBrushUp.productionGotcha}
              </div>
            </div>
          )}

          {/* MANUAL HINT CARD (When requested via Show Hint button) */}
          {isHintVisible && currentStatus !== 'incorrect' && (
            <div
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                fontSize: '0.78rem',
                color: '#fde68a',
                lineHeight: 1.45,
              }}
            >
              💡 <strong>Hint: </strong> {activeScenario.hint}
            </div>
          )}
        </div>

        {/* Live Terminal Output Area */}
        <div
          onClick={() => inputRef.current?.focus()}
          style={{
            flex: 1,
            background: '#090d16',
            padding: '1rem 1.4rem',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '0.86rem',
            color: '#e2e8f0',
            lineHeight: 1.5,
            cursor: 'text',
          }}
        >
          <div style={{ color: '#64748b', marginBottom: '0.85rem', fontSize: '0.78rem' }}>
            LinuxForge POSIX Shell v6.8.0-45-generic · User: forge (uid=1000) · Host: linuxforge · Type &apos;clear&apos; to reset or test commands
          </div>

          {terminalHistory.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#06b6d4', fontWeight: 700 }}>forge@linuxforge:~$</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{item.command}</span>
              </div>

              {item.stdout.map((line, lIdx) => {
                const isSuccessLine = line.startsWith('[✓ SUCCESS]');
                const isBrushUpLine = line.startsWith('[BRUSH-UP]');
                const isHintLine = line.startsWith('[💡 HINT]');

                let lineColor = '#cbd5e1';
                if (isSuccessLine) lineColor = '#22c55e';
                else if (isBrushUpLine) lineColor = '#38bdf8';
                else if (isHintLine) lineColor = '#f59e0b';

                return (
                  <div key={lIdx} style={{ color: lineColor, whiteSpace: 'pre-wrap' }}>
                    {line}
                  </div>
                );
              })}

              {item.stderr.map((line, lIdx) => (
                <div key={lIdx} style={{ color: '#f87171', whiteSpace: 'pre-wrap' }}>
                  {line}
                </div>
              ))}
            </div>
          ))}

          {/* Active Terminal Input Row */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
            <span style={{ color: '#06b6d4', fontWeight: 700 }}>forge@linuxforge:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="Enter Linux command (e.g. ps aux, df -h, free -h, cat /proc/cpuinfo)..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#fff',
                fontFamily: 'monospace',
                fontSize: '0.86rem',
                fontWeight: 600,
              }}
            />
          </form>
          <div ref={terminalBottomRef} />
        </div>
      </section>
    </div>
  );
};
