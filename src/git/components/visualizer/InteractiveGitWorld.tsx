import React, { useState } from 'react';
import {
  FileText,
  Package,
  Camera,
  Cloud,
  Laptop,
  ArrowRight,
  ArrowDown,
  RotateCcw,
  Check,
  Terminal,
} from 'lucide-react';

export interface VisualFile {
  name: string;
  status: 'working' | 'staged' | 'committed' | 'pushed';
}

export interface VisualCommit {
  id: string;
  message: string;
  isRemote?: boolean;
}

export const InteractiveGitWorld: React.FC = () => {
  const [workingFiles, setWorkingFiles] = useState<string[]>(['index.html', 'style.css']);
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [localCommits, setLocalCommits] = useState<VisualCommit[]>([
    { id: 'C1', message: 'Initial commit' },
    { id: 'C2', message: 'Add layout shell' },
  ]);
  const [remoteCommits, setRemoteCommits] = useState<VisualCommit[]>([
    { id: 'C1', message: 'Initial commit' },
    { id: 'C2', message: 'Add layout shell' },
  ]);
  const [activeHeadBranch, setActiveHeadBranch] = useState<string>('main');
  const [lastAction, setLastAction] = useState<string>('Ready for interactive exploration.');

  const handleGitAdd = (fileName: string) => {
    if (!workingFiles.includes(fileName)) return;
    setWorkingFiles((prev) => prev.filter((f) => f !== fileName));
    setStagedFiles((prev) => [...prev, fileName]);
    setLastAction(`Executed: git add ${fileName} (Moved from Working Tree to Staging Area)`);
  };

  const handleGitAddAll = () => {
    if (workingFiles.length === 0) return;
    setStagedFiles((prev) => [...prev, ...workingFiles]);
    setWorkingFiles([]);
    setLastAction(`Executed: git add . (Moved all files to Staging Area)`);
  };

  const handleGitCommit = () => {
    if (stagedFiles.length === 0) {
      setLastAction('Error: Nothing staged to commit. Run `git add` first.');
      return;
    }
    const nextCommitNum = localCommits.length + 1;
    const newCommitId = `C${nextCommitNum}`;
    const newCommit: VisualCommit = {
      id: newCommitId,
      message: `Update ${stagedFiles.join(', ')}`,
    };

    setLocalCommits((prev) => [...prev, newCommit]);
    setStagedFiles([]);
    setLastAction(`Executed: git commit -m "${newCommit.message}" (Snapshot ${newCommitId} created, HEAD advanced)`);
  };

  const handleGitPush = () => {
    if (localCommits.length === remoteCommits.length) {
      setLastAction('Everything up-to-date: Remote already matches local repository.');
      return;
    }
    setRemoteCommits([...localCommits]);
    setLastAction(`Executed: git push origin main (Transmitted local commits over network to GitHub)`);
  };

  const handleResetWorld = () => {
    setWorkingFiles(['index.html', 'style.css']);
    setStagedFiles([]);
    setLocalCommits([
      { id: 'C1', message: 'Initial commit' },
      { id: 'C2', message: 'Add layout shell' },
    ]);
    setRemoteCommits([
      { id: 'C1', message: 'Initial commit' },
      { id: 'C2', message: 'Add layout shell' },
    ]);
    setLastAction('Interactive world reset to clean baseline.');
  };

  const unpushedCount = localCommits.length - remoteCommits.length;

  return (
    <div
      style={{
        background: '#090d16',
        border: '1px solid rgba(148, 163, 184, 0.15)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(90deg, #0d1527 0%, #151d38 100%)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Laptop size={18} color="#38bdf8" />
          <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f8fafc' }}>
            The Interactive Git Physical Model
          </span>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            &bull; Working Tree &rarr; Staging &rarr; Commits &rarr; Remote ☁ GitHub
          </span>
        </div>

        <button
          onClick={handleResetWorld}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            color: '#cbd5e1',
            fontSize: '0.72rem',
            padding: '0.3rem 0.65rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          <RotateCcw size={12} />
          Reset Demo
        </button>
      </div>

      {/* Cloud Remote Header Container */}
      <div
        style={{
          padding: '1rem 1.25rem',
          background: 'rgba(15, 23, 42, 0.6)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cloud size={18} color="#818cf8" />
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#c7d2fe' }}>
              REMOTE: ☁ GitHub (origin/main)
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            {unpushedCount > 0 ? (
              <span style={{ color: '#f59e0b', fontWeight: 700 }}>
                &uarr; {unpushedCount} unpushed commit{unpushedCount > 1 ? 's' : ''} waiting
              </span>
            ) : (
              <span style={{ color: '#34d399', fontWeight: 700 }}>
                &bull; In sync with local repository
              </span>
            )}
          </span>
        </div>

        {/* Remote commits trail */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', overflowX: 'auto', padding: '0.2rem 0' }}>
          {remoteCommits.map((c) => (
            <div
              key={c.id}
              style={{
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '6px',
                padding: '0.25rem 0.5rem',
                fontSize: '0.72rem',
                color: '#c7d2fe',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <Camera size={12} color="#818cf8" />
              <strong>{c.id}</strong>: {c.message}
            </div>
          ))}
        </div>
      </div>

      {/* Network transmission indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.35rem',
          background: 'rgba(0, 0, 0, 0.3)',
          color: '#64748b',
          fontSize: '0.7rem',
          gap: '0.5rem',
        }}
      >
        <span>&uarr; git push</span>
        <span>&bull;</span>
        <span>&darr; git fetch / git pull</span>
      </div>

      {/* Local PC Container */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: '#040711',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.05em' }}>
            LOCAL MACHINE (YOUR LAPTOP)
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              fontFamily: 'ui-monospace, monospace',
              color: '#34d399',
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            HEAD &rarr; {activeHeadBranch} ({localCommits[localCommits.length - 1]?.id || 'init'})
          </span>
        </div>

        {/* The Three Local Zones */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          {/* Zone 1: Working Tree */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(148, 163, 184, 0.15)',
              borderRadius: '10px',
              padding: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={15} color="#f59e0b" />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f8fafc' }}>
                  Working Tree (📄)
                </span>
              </div>
              <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                {workingFiles.length} file{workingFiles.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div style={{ minHeight: '60px', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {workingFiles.map((f) => (
                <div
                  key={f}
                  style={{
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '6px',
                    padding: '0.35rem 0.6rem',
                    fontSize: '0.72rem',
                    color: '#fde68a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{f} (modified)</span>
                  <button
                    onClick={() => handleGitAdd(f)}
                    style={{
                      background: '#f59e0b',
                      color: '#000',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.15rem 0.4rem',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    + stage
                  </button>
                </div>
              ))}
              {workingFiles.length === 0 && (
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontStyle: 'italic', padding: '0.5rem 0' }}>
                  Working tree clean.
                </div>
              )}
            </div>

            {workingFiles.length > 0 && (
              <button
                onClick={handleGitAddAll}
                style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: '#fbbf24',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '6px',
                  padding: '0.35rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                git add . (Stage All)
              </button>
            )}
          </div>

          {/* Zone 2: Staging Area */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: stagedFiles.length > 0 ? '1px solid #10b981' : '1px solid rgba(148, 163, 184, 0.15)',
              borderRadius: '10px',
              padding: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Package size={15} color="#10b981" />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f8fafc' }}>
                  Staging Area (📦)
                </span>
              </div>
              <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                {stagedFiles.length} staged
              </span>
            </div>

            <div style={{ minHeight: '60px', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {stagedFiles.map((f) => (
                <div
                  key={f}
                  style={{
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '6px',
                    padding: '0.35rem 0.6rem',
                    fontSize: '0.72rem',
                    color: '#6ee7b7',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <Check size={12} color="#10b981" />
                  <span>{f} (ready for commit)</span>
                </div>
              ))}
              {stagedFiles.length === 0 && (
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontStyle: 'italic', padding: '0.5rem 0' }}>
                  Staging index empty.
                </div>
              )}
            </div>

            {stagedFiles.length > 0 && (
              <button
                onClick={handleGitCommit}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.35rem',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(16, 185, 129, 0.25)',
                }}
              >
                git commit (Save Snapshot)
              </button>
            )}
          </div>

          {/* Zone 3: Commit History */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(148, 163, 184, 0.15)',
              borderRadius: '10px',
              padding: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Camera size={15} color="#38bdf8" />
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f8fafc' }}>
                  Commit Snapshots (📸)
                </span>
              </div>
              <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                {localCommits.length} commits
              </span>
            </div>

            <div style={{ minHeight: '60px', display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '110px', overflowY: 'auto' }}>
              {localCommits.map((c, idx) => {
                const isHead = idx === localCommits.length - 1;
                return (
                  <div
                    key={c.id}
                    style={{
                      background: isHead ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: isHead ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      padding: '0.3rem 0.55rem',
                      fontSize: '0.72rem',
                      color: isHead ? '#bae6fd' : '#cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span><strong>{c.id}</strong>: {c.message}</span>
                    {isHead && (
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#38bdf8' }}>HEAD</span>
                    )}
                  </div>
                );
              })}
            </div>

            {unpushedCount > 0 && (
              <button
                onClick={handleGitPush}
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.35rem',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(99, 102, 241, 0.25)',
                }}
              >
                git push origin main (&uarr; {unpushedCount})
              </button>
            )}
          </div>
        </div>

        {/* Live Action Status Bar */}
        <div
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            borderRadius: '8px',
            padding: '0.55rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.75rem',
            fontFamily: 'ui-monospace, monospace',
            color: '#a5f3fc',
          }}
        >
          <Terminal size={14} color="#38bdf8" />
          <span>{lastAction}</span>
        </div>
      </div>
    </div>
  );
};
