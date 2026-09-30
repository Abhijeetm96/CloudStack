import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Play,
  RotateCw,
  AlertTriangle,
  Shield,
  Terminal,
  Server,
  Layers,
  FileCode,
  ArrowRight,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

export type PipelineStageId = 'commit' | 'build' | 'test' | 'scan' | 'package' | 'staging' | 'deploy' | 'production';

export interface StageDetail {
  id: PipelineStageId;
  name: string;
  status: 'success' | 'failed' | 'running' | 'pending';
  duration: string;
  icon: any;
  summary: string;
  runnerInfo: {
    os: string;
    runtime: string;
    jobName: string;
  };
  tasks: {
    name: string;
    command: string;
    status: 'success' | 'failed' | 'running' | 'pending';
    logSnippet: string;
  }[];
  failurePrompt?: {
    title: string;
    scenario: string;
    question: string;
    options: {
      key: string;
      label: string;
      consequence: string;
      isRecommended: boolean;
      verdict: 'safe' | 'dangerous' | 'ineffective';
    }[];
  };
}

interface Props {
  initialFailureMode?: boolean;
  onOpenRecoveryLesson?: (conceptId: string) => void;
}

export const CiCdPipelineSimulator: React.FC<Props> = ({
  initialFailureMode = false,
  onOpenRecoveryLesson,
}) => {
  const [pipelineRunId, setPipelineRunId] = useState<number>(142);
  const [activeStageId, setActiveStageId] = useState<PipelineStageId>('scan');
  const [failureMode, setFailureMode] = useState<boolean>(true);
  const [selectedFailureOption, setSelectedFailureOption] = useState<string | null>(null);
  const [showLiveTerminal, setShowLiveTerminal] = useState<boolean>(true);

  // Stages configuration for PIPELINE #142
  const stages: StageDetail[] = [
    {
      id: 'commit',
      name: 'Commit',
      status: 'success',
      duration: '1.2s',
      icon: Terminal,
      summary: 'Triggered by git push to refs/heads/main (SHA: c4a89f2)',
      runnerInfo: { os: 'GitHub Webhook', runtime: 'Event Bus', jobName: 'event:push' },
      tasks: [
        { name: 'Evaluate webhook payload', command: 'git rev-parse HEAD', status: 'success', logSnippet: 'Verified commit c4a89f2 by alex-chen. Triggering workflow "CI / Release Pipeline".' },
        { name: 'Check branch protection rules', command: 'gh api protection', status: 'success', logSnippet: 'Branch protection satisfied: 1 approval recorded, 0 changes requested.' },
      ],
    },
    {
      id: 'build',
      name: 'Build',
      status: 'success',
      duration: '24s',
      icon: Server,
      summary: 'Hermetic TypeScript compilation & multi-stage Docker build',
      runnerInfo: { os: 'ubuntu-latest (x86_64)', runtime: 'Node 20.12.0', jobName: 'job:build' },
      tasks: [
        { name: 'actions/checkout@v4', command: 'git checkout c4a89f2', status: 'success', logSnippet: 'Synchronized working tree at commit c4a89f2 (Depth: 1).' },
        { name: 'Clean install dependencies', command: 'npm ci', status: 'success', logSnippet: 'Audited 412 packages in 4.2s. 0 vulnerabilities.' },
        { name: 'Compile production bundle', command: 'npm run build', status: 'success', logSnippet: 'Vite v8.3.0 built client environment in 1.18s. Artifact size: 482 kB.' },
      ],
    },
    {
      id: 'test',
      name: 'Test',
      status: 'success',
      duration: '18s',
      icon: CheckCircle2,
      summary: '232 automated unit & integration assertions passed',
      runnerInfo: { os: 'ubuntu-latest (x86_64)', runtime: 'Vitest 3.0.7', jobName: 'job:test' },
      tasks: [
        { name: 'Run unit test suite', command: 'npx vitest run', status: 'success', logSnippet: 'Test Files: 41 passed (41). Tests: 232 passed (232). Duration: 3.42s.' },
        { name: 'Generate code coverage report', command: 'vitest --coverage', status: 'success', logSnippet: 'Coverage: 91.4% Statements | 88.2% Branches | 94.1% Functions. Threshold: PASS.' },
      ],
    },
    {
      id: 'scan',
      name: 'Security Scan',
      status: failureMode ? 'failed' : 'success',
      duration: '12s',
      icon: Shield,
      summary: failureMode ? 'CRITICAL ALERT: Secret leaked in commit history' : 'All security gates passed (0 critical CVEs, 0 secrets)',
      runnerInfo: { os: 'ubuntu-latest', runtime: 'Gitleaks / Trivy', jobName: 'job:security-scan' },
      tasks: [
        { name: 'Audit third-party dependencies', command: 'npm audit --audit-level=high', status: 'success', logSnippet: 'Scanned 412 dependencies. 0 high/critical CVEs identified.' },
        {
          name: 'Gitleaks secret scanner',
          command: 'gitleaks detect --verbose',
          status: failureMode ? 'failed' : 'success',
          logSnippet: failureMode
            ? '❌ LEAK DETECTED:\nRule: GitHub Personal Access Token\nFile: config/runtime.env.js:14\nFingerprint: ghp_99214abx994821a8...\nCommit: c4a89f2 (feat: add cloud backup)'
            : '✓ Secret scan completed. 0 credentials or private tokens detected in git diff.',
        },
      ],
      failurePrompt: failureMode
        ? {
            title: 'Security Gate Tripped: Leaked Secret Detected',
            scenario: 'Gitleaks found an active GitHub PAT hardcoded into `config/runtime.env.js`. The pipeline has halted execution before packaging or deploying.',
            question: 'What is the correct, professional SRE response?',
            options: [
              {
                key: 'A',
                label: 'Ignore the warning and force deploy anyway.',
                consequence: 'DANGEROUS: Bots continuously scrape GitHub. The token will be exploited within 90 seconds to compromise production repositories.',
                isRecommended: false,
                verdict: 'dangerous',
              },
              {
                key: 'B',
                label: 'Delete the file in a new commit and push again.',
                consequence: 'INEFFECTIVE: The secret remains permanently in Git commit history (accessible via `git show` or `git checkout HEAD~1`). Attackers scrape historical commits.',
                isRecommended: false,
                verdict: 'ineffective',
              },
              {
                key: 'C',
                label: 'Immediately revoke/rotate the secret, purge from Git history using `git-filter-repo`, and inject via GitHub Secrets.',
                consequence: 'CORRECT: 1. Invalidate compromised token immediately. 2. Remove from Git history. 3. Inject safely at runtime via `${{ secrets.API_TOKEN }}`.',
                isRecommended: true,
                verdict: 'safe',
              },
              {
                key: 'D',
                label: 'Make the repository private so nobody can see it.',
                consequence: 'DANGEROUS: Security through obscurity. Any team member with read access can exfiltrate credentials, and audit compliance fails.',
                isRecommended: false,
                verdict: 'dangerous',
              },
            ],
          }
        : undefined,
    },
    {
      id: 'package',
      name: 'Package',
      status: failureMode ? 'pending' : 'success',
      duration: failureMode ? '0s' : '15s',
      icon: Layers,
      summary: failureMode ? 'Blocked: Waiting for security stage to pass' : 'OCI image pushed to ghcr.io with SHA digest',
      runnerInfo: { os: 'ubuntu-latest', runtime: 'Docker Buildx', jobName: 'job:package' },
      tasks: [
        { name: 'Build multi-stage OCI image', command: 'docker buildx build -t ghcr.io/org/app:${{ github.sha }} .', status: failureMode ? 'pending' : 'success', logSnippet: failureMode ? 'Waiting for prerequisite jobs...' : 'Successfully built image sha256:88fa12c9...' },
        { name: 'Push to GitHub Container Registry', command: 'docker push ghcr.io/org/app:${{ github.sha }}', status: failureMode ? 'pending' : 'success', logSnippet: failureMode ? 'Job halted.' : 'Pushed to ghcr.io. Digest pinned.' },
      ],
    },
    {
      id: 'deploy',
      name: 'Deploy',
      status: failureMode ? 'pending' : 'success',
      duration: failureMode ? '0s' : '32s',
      icon: Server,
      summary: failureMode ? 'Blocked by failed upstream pipeline gates' : 'Rolling deployment to Production cluster completed (Zero downtime)',
      runnerInfo: { os: 'Production Cluster', runtime: 'Kubernetes / ArgoCD', jobName: 'job:deploy-prod' },
      tasks: [
        { name: 'Verify staging health check', command: 'curl -f https://staging.app.com/healthz', status: failureMode ? 'pending' : 'success', logSnippet: failureMode ? 'Skipped.' : 'HTTP 200 OK. Latency: 42ms.' },
        { name: 'Rolling update production deployment', command: 'kubectl set image deployment/web app=ghcr.io/org/app:v1.2', status: failureMode ? 'pending' : 'success', logSnippet: failureMode ? 'Skipped.' : 'Deployment "web" successfully rolled out. 4/4 pods healthy.' },
      ],
    },
  ];

  const activeStage = stages.find((s) => s.id === activeStageId) || stages[0];

  const handleResolveAndRerun = () => {
    setFailureMode(false);
    setSelectedFailureOption(null);
    setActiveStageId('deploy');
    setPipelineRunId((prev) => prev + 1);
  };

  const handleSimulateFailure = () => {
    setFailureMode(true);
    setSelectedFailureOption(null);
    setActiveStageId('scan');
    setPipelineRunId((prev) => prev + 1);
  };

  return (
    <div
      style={{
        background: '#090d16',
        border: '1px solid rgba(148, 163, 184, 0.15)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.7)',
      }}
    >
      {/* Simulator Control Center Header */}
      <div
        style={{
          background: 'linear-gradient(90deg, #0d1527 0%, #111b33 100%)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: failureMode ? '#ef4444' : '#10b981',
              boxShadow: failureMode ? '0 0 10px #ef4444' : '0 0 10px #10b981',
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                PIPELINE #{pipelineRunId}
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                  background: failureMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  color: failureMode ? '#f87171' : '#34d399',
                  border: `1px solid ${failureMode ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
                }}
              >
                {failureMode ? 'GATE FAILED' : 'ALL CHECKS PASSED'}
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              Branch: <code style={{ color: '#38bdf8' }}>main</code> • Trigger: <code style={{ color: '#c084fc' }}>push (c4a89f2)</code> • Event: GitHub Actions
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {failureMode ? (
            <button
              onClick={handleResolveAndRerun}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.45rem 0.9rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
              }}
              title="Apply fix: Revoke secret and re-trigger pipeline"
            >
              <RotateCw size={14} />
              Resolve &amp; Re-run
            </button>
          ) : (
            <button
              onClick={handleSimulateFailure}
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                color: '#f87171',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '0.45rem 0.9rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
              title="Simulate controlled pipeline failure"
            >
              <AlertTriangle size={14} />
              Simulate Failure Lab
            </button>
          )}
        </div>
      </div>

      {/* Interactive Horizontal Pipeline Stage Bar */}
      <div
        style={{
          padding: '1.25rem',
          background: 'rgba(15, 23, 42, 0.5)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
          overflowX: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            minWidth: '680px',
            position: 'relative',
          }}
        >
          {stages.map((stage, idx) => {
            const isActive = stage.id === activeStageId;
            const isLast = idx === stages.length - 1;

            return (
              <React.Fragment key={stage.id}>
                {/* Stage Button Card */}
                <button
                  onClick={() => setActiveStageId(stage.id)}
                  style={{
                    flex: '1',
                    background: isActive
                      ? 'rgba(56, 189, 248, 0.12)'
                      : 'rgba(30, 41, 59, 0.5)',
                    border: isActive
                      ? '1px solid #38bdf8'
                      : stage.status === 'failed'
                      ? '1px solid rgba(239, 68, 68, 0.4)'
                      : '1px solid rgba(148, 163, 184, 0.15)',
                    borderRadius: '10px',
                    padding: '0.65rem 0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isActive ? '#38bdf8' : '#e2e8f0' }}>
                      {stage.name}
                    </span>
                    {stage.status === 'success' && <CheckCircle2 size={15} color="#10b981" />}
                    {stage.status === 'failed' && <XCircle size={15} color="#ef4444" />}
                    {stage.status === 'pending' && <Clock size={15} color="#64748b" />}
                  </div>
                  <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>
                    {stage.status === 'pending' ? 'Blocked' : stage.duration}
                  </span>
                </button>

                {/* Connecting arrow */}
                {!isLast && (
                  <div style={{ padding: '0 0.35rem', color: 'rgba(148, 163, 184, 0.3)', display: 'flex', alignItems: 'center' }}>
                    <ArrowRight size={16} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail & Diagnostic View */}
      <div
        style={{
          padding: '1.25rem',
          display: 'grid',
          gridTemplateColumns: activeStage.failurePrompt ? '1fr 1fr' : '1fr',
          gap: '1.25rem',
        }}
      >
        {/* Left: Runner details & Live Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f8fafc' }}>
                Stage: {activeStage.name}
              </span>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                Runner: {activeStage.runnerInfo.os}
              </span>
            </div>

            <button
              onClick={() => setShowLiveTerminal((prev) => !prev)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#38bdf8',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <Terminal size={13} />
              {showLiveTerminal ? 'Hide Console Logs' : 'View Console Logs'}
            </button>
          </div>

          <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
            {activeStage.summary}
          </div>

          {/* Sequential Tasks inside this job */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {activeStage.tasks.map((task, tIdx) => (
              <div
                key={tIdx}
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: task.status === 'failed' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(148, 163, 184, 0.1)',
                  borderRadius: '8px',
                  padding: '0.65rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e2e8f0' }}>
                    {tIdx + 1}. {task.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: '0.7rem',
                      color: task.status === 'failed' ? '#f87171' : task.status === 'success' ? '#34d399' : '#94a3b8',
                    }}
                  >
                    `{task.command}`
                  </span>
                </div>

                {showLiveTerminal && (
                  <pre
                    style={{
                      margin: 0,
                      background: '#050811',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: '0.72rem',
                      color: task.status === 'failed' ? '#fca5a5' : '#93c5fd',
                      whiteSpace: 'pre-wrap',
                      lineHeight: 1.45,
                    }}
                  >
                    {task.logSnippet}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Controlled Failure Simulation Lab (if stage has failure prompt) */}
        {activeStage.failurePrompt && (
          <div
            style={{
              background: 'rgba(30, 18, 56, 0.5)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f87171',
                }}
              >
                <AlertTriangle size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f8fafc' }}>
                  {activeStage.failurePrompt.title}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#c084fc' }}>
                  Failure Recovery Lab &bull; Interactive Diagnostic
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              {activeStage.failurePrompt.scenario}
            </div>

            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>
              {activeStage.failurePrompt.question}
            </div>

            {/* Multiple Choice Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {activeStage.failurePrompt.options.map((opt) => {
                const isSelected = selectedFailureOption === opt.key;

                return (
                  <button
                    key={opt.key}
                    onClick={() => setSelectedFailureOption(opt.key)}
                    style={{
                      background: isSelected
                        ? opt.isRecommended
                          ? 'rgba(16, 185, 129, 0.15)'
                          : 'rgba(239, 68, 68, 0.15)'
                        : 'rgba(15, 23, 42, 0.6)',
                      border: isSelected
                        ? opt.isRecommended
                          ? '1px solid #10b981'
                          : '1px solid #ef4444'
                        : '1px solid rgba(148, 163, 184, 0.15)',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          background: isSelected ? (opt.isRecommended ? '#10b981' : '#ef4444') : 'rgba(255,255,255,0.1)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                        }}
                      >
                        {opt.key}
                      </span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f8fafc' }}>
                        {opt.label}
                      </span>
                    </div>

                    {isSelected && (
                      <div
                        style={{
                          fontSize: '0.72rem',
                          lineHeight: 1.5,
                          color: opt.isRecommended ? '#6ee7b7' : '#fca5a5',
                          paddingTop: '0.3rem',
                          borderTop: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        <strong>Consequence:</strong> {opt.consequence}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedFailureOption === 'C' && (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                }}
              >
                <div style={{ fontSize: '0.75rem', color: '#6ee7b7' }}>
                  ✓ Outstanding reasoning! You prioritized secret revocation and permanent history excision.
                </div>
                <button
                  onClick={handleResolveAndRerun}
                  style={{
                    background: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Apply Fix &amp; Resume
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
