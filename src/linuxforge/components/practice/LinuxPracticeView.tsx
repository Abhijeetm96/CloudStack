import React, { useState, useRef, useEffect } from 'react';
import { useLinux } from '../../context/LinuxContext';
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
} from 'lucide-react';

interface PracticeScenario {
  id: string;
  moduleCode: string;
  title: string;
  icon: React.ReactNode;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  targetTask: string;
  solutionCommands: string[];
  hint: string;
  initialDirectory?: string;
}

const LINUX_PRACTICE_SCENARIOS: PracticeScenario[] = [
  {
    id: 'scen-01-fhs',
    moduleCode: '01.1',
    title: 'Inspect Virtual Filesystems (/proc & /sys)',
    icon: <FolderTree size={16} color="#06b6d4" />,
    category: 'Linux Fundamentals',
    difficulty: 'Beginner',
    description: 'Kernel virtual filesystems /proc and /sys expose runtime kernel data structures as text files.',
    targetTask: 'Display CPU hardware info and active kernel version using virtual files in /proc.',
    solutionCommands: ['cat /proc/cpuinfo', 'uname -a'],
    hint: 'Use `cat /proc/cpuinfo` to inspect logical CPUs, and `cat /proc/version` or `uname -a`.',
  },
  {
    id: 'scen-02-files',
    moduleCode: '01.2',
    title: 'Deep File Search & Metadata (find & stat)',
    icon: <Search size={16} color="#38bdf8" />,
    category: 'Files & Directories',
    difficulty: 'Intermediate',
    description: 'Locate configuration files and check filesystem inode metadata without reading file content.',
    targetTask: 'Find all .conf files under /etc and inspect inode metadata for /etc/os-release.',
    solutionCommands: ['find /etc -name "*.conf"', 'stat /etc/os-release'],
    hint: 'Run `find /etc -name "*.conf"` and `stat /etc/os-release` to view inode and permissions.',
  },
  {
    id: 'scen-03-streams',
    moduleCode: '01.3',
    title: 'Text Pipeline & Filtering (grep, cut, sort, uniq)',
    icon: <FileCode size={16} color="#a855f7" />,
    category: 'Text Processing',
    difficulty: 'Intermediate',
    description: 'Extract system users from /etc/passwd, sort alphabetically, and count total accounts.',
    targetTask: 'Extract usernames (field 1 delimited by :) from /etc/passwd and count total lines with wc.',
    solutionCommands: ['cut -d: -f1 /etc/passwd', 'wc -l /etc/passwd'],
    hint: 'Use `cut -d: -f1 /etc/passwd` to extract usernames and `wc -l /etc/passwd` to count them.',
  },
  {
    id: 'scen-04-perms',
    moduleCode: '01.4',
    title: 'Permission Hardening (chmod, umask & chown)',
    icon: <ShieldCheck size={16} color="#10b981" />,
    category: 'Permissions',
    difficulty: 'Intermediate',
    description: 'Audit the default shell file creation mask and restrict sensitive configuration files.',
    targetTask: 'Check current umask and set read/write permissions for owner only (600) on a private key.',
    solutionCommands: ['umask', 'chmod 600 /etc/ssh/ssh_host_ed25519_key.pub'],
    hint: 'Run `umask` to view default octal mask, then `chmod 600 /etc/ssh/ssh_host_ed25519_key.pub`.',
  },
  {
    id: 'scen-05-procs',
    moduleCode: '01.5',
    title: 'Process Triage & Signals (ps, top & kill)',
    icon: <Cpu size={16} color="#f59e0b" />,
    category: 'Processes',
    difficulty: 'Advanced',
    description: 'A rogue background process is consuming resources. Investigate active PIDs and terminate it.',
    targetTask: 'List all running processes with full details and terminate a runaway process with SIGKILL (9).',
    solutionCommands: ['ps aux', 'kill -9 1234'],
    hint: 'Use `ps aux` to list PIDs, then run `kill -9 1234` or `pkill` to terminate.',
  },
  {
    id: 'scen-06-systemd',
    moduleCode: '01.6',
    title: 'systemd Service & Journal Logs (systemctl & journalctl)',
    icon: <Server size={16} color="#ec4899" />,
    category: 'Services',
    difficulty: 'Intermediate',
    description: 'Check Nginx reverse proxy service health and stream systemd journal diagnostics.',
    targetTask: 'Inspect systemctl status for nginx and check recent journalctl logs.',
    solutionCommands: ['sudo systemctl status nginx', 'journalctl -u nginx --no-pager'],
    hint: 'Execute `sudo systemctl status nginx` followed by `journalctl -u nginx --no-pager`.',
  },
  {
    id: 'scen-07-troubleshoot',
    moduleCode: '01.8',
    title: 'System SRE Triage (free, df, ulimit & lsof)',
    icon: <Activity size={16} color="#ef4444" />,
    category: 'Troubleshooting',
    difficulty: 'Advanced',
    description: 'Server response latency spiked. Check memory availability, disk inodes, and open network sockets.',
    targetTask: 'Check available RAM, disk inode usage, file descriptor limits, and ports in LISTEN state.',
    solutionCommands: ['free -h', 'df -h', 'ulimit -n', 'lsof -i :80'],
    hint: 'Run `free -h`, `df -h`, `ulimit -n`, and `lsof -i :80` to diagnose resource exhaustion.',
  },
];

export const LinuxPracticeView: React.FC = () => {
  const { executeCommand, setMode } = useLinux();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(LINUX_PRACTICE_SCENARIOS[0].id);
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
  const [solvedScenarioIds, setSolvedScenarioIds] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeScenario = LINUX_PRACTICE_SCENARIOS.find((s) => s.id === selectedScenarioId) || LINUX_PRACTICE_SCENARIOS[0];

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const runCmd = (cmdToRun: string) => {
    const trimmed = cmdToRun.trim();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    }

    const res = executeCommand(trimmed);
    setTerminalHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        stdout: res.stdout,
        stderr: res.stderr,
        exitCode: res.exitCode,
      },
    ]);
    setCommandInput('');
    setHistoryIndex(null);

    // Check if command matches active scenario solution
    const isSolution = activeScenario.solutionCommands.some(
      (sol) => trimmed.toLowerCase().includes(sol.toLowerCase()) || sol.toLowerCase().includes(trimmed.toLowerCase())
    );
    if (isSolution && !solvedScenarioIds.includes(activeScenario.id)) {
      setSolvedScenarioIds((prev) => [...prev, activeScenario.id]);
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
      {/* LEFT COLUMN: SCENARIOS LIST (280px)                              */}
      {/* ================================================================ */}
      <aside
        style={{
          width: '320px',
          minWidth: '320px',
          maxWidth: '320px',
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1rem 1.1rem',
            borderBottom: '1px solid var(--border-color)',
            background: 'rgba(6, 182, 212, 0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <Terminal size={15} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>Linux Practice Drills</div>
              <div style={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 600 }}>Chapter 01 Hands-On Labs</div>
            </div>
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
            Solved {solvedScenarioIds.length} of {LINUX_PRACTICE_SCENARIOS.length} scenarios
          </div>
          <div
            style={{
              width: '100%',
              height: '4px',
              borderRadius: '2px',
              background: 'rgba(255, 255, 255, 0.1)',
              marginTop: '0.35rem',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(solvedScenarioIds.length / LINUX_PRACTICE_SCENARIOS.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #06b6d4, #10b981)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0.65rem' }}>
          {LINUX_PRACTICE_SCENARIOS.map((scen) => {
            const isSelected = scen.id === selectedScenarioId;
            const isSolved = solvedScenarioIds.includes(scen.id);

            return (
              <button
                key={scen.id}
                onClick={() => setSelectedScenarioId(scen.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 0.85rem',
                  borderRadius: '8px',
                  marginBottom: '0.45rem',
                  background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: isSelected ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid var(--border-color)',
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
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#06b6d4' }}>MOD {scen.moduleCode}</span>
                    {isSolved ? (
                      <span style={{ fontSize: '0.65rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 700 }}>
                        <CheckCircle2 size={12} /> Solved
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: '0.62rem',
                          padding: '1px 5px',
                          borderRadius: '4px',
                          background: scen.difficulty === 'Beginner' ? 'rgba(16, 185, 129, 0.15)' : scen.difficulty === 'Intermediate' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: scen.difficulty === 'Beginner' ? '#34d399' : scen.difficulty === 'Intermediate' ? '#fbbf24' : '#f87171',
                          fontWeight: 700,
                        }}
                      >
                        {scen.difficulty}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: isSelected ? '#fff' : 'var(--text-primary)',
                      marginTop: '0.2rem',
                      lineHeight: 1.25,
                    }}
                  >
                    {scen.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* ================================================================ */}
      {/* RIGHT COLUMN: TERMINAL & TASK DETAILS                            */}
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
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
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
                Module {activeScenario.moduleCode}
              </div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                {activeScenario.title}
              </h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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

          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            {activeScenario.description}
          </div>

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
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#06b6d4', marginRight: '0.5rem' }}>🎯 TASK:</span>
              <span style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600 }}>{activeScenario.targetTask}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
              {activeScenario.solutionCommands.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => runCmd(cmd)}
                  style={{
                    padding: '0.25rem 0.6rem',
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
                    gap: '0.3rem',
                  }}
                  title="Click to execute in terminal"
                >
                  <Play size={10} /> {cmd}
                </button>
              ))}
            </div>
          </div>
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
            LinuxForge POSIX Shell v6.8.0-45-generic · User: forge (uid=1000) · Host: linuxforge · Type &apos;help&apos; or test commands
          </div>

          {terminalHistory.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#06b6d4', fontWeight: 700 }}>forge@linuxforge:~$</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{item.command}</span>
              </div>

              {item.stdout.map((line, lIdx) => (
                <div key={lIdx} style={{ color: '#cbd5e1', whiteSpace: 'pre-wrap' }}>
                  {line}
                </div>
              ))}

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
              placeholder="Enter Linux command (e.g. ls -la, cat /etc/os-release, ps aux)..."
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
