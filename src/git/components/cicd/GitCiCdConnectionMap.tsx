import React, { useState } from 'react';
import {
  Code,
  GitBranch,
  GitCommit,
  GitPullRequest,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Package,
  Server,
  Activity,
  RotateCcw,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export interface PipelineStageNode {
  id: string;
  name: string;
  icon: any;
  category: 'local' | 'collaboration' | 'ci' | 'artifact' | 'cd' | 'sre';
  whatHappens: string;
  whyItHappens: string;
  controllingTool: string;
  onFailureAction: string;
}

const LIFECYCLE_NODES: PipelineStageNode[] = [
  {
    id: 'ide',
    name: '1. IDE / Code',
    icon: Code,
    category: 'local',
    whatHappens: 'Developer edits source files and runs local experiments in VS Code.',
    whyItHappens: 'Solving business user stories or fixing customer-reported bugs.',
    controllingTool: 'IDE / Editor',
    onFailureAction: 'Fix syntax and local compiler errors.',
  },
  {
    id: 'branch',
    name: '2. Feature Branch',
    icon: GitBranch,
    category: 'local',
    whatHappens: 'Isolated branch created (`feat/login-flow`) branching off stable `main`.',
    whyItHappens: 'Prevents unfinished experiments from breaking colleagues\' work.',
    controllingTool: 'git switch -c <branch>',
    onFailureAction: 'Rebase or reset branch locally.',
  },
  {
    id: 'commit',
    name: '3. Atomic Commit',
    icon: GitCommit,
    category: 'local',
    whatHappens: 'Staged changes packaged into an immutable cryptographically hashed snapshot.',
    whyItHappens: 'Creating a discrete, revertible milestone with Conventional Commit message.',
    controllingTool: 'git add -p && git commit -m',
    onFailureAction: 'Use `git commit --amend` or `git reset` (if unpushed).',
  },
  {
    id: 'pr',
    name: '4. Pull Request',
    icon: GitPullRequest,
    category: 'collaboration',
    whatHappens: 'Local commits pushed to GitHub (`git push -u origin <branch>`); PR opened.',
    whyItHappens: 'Formal invitation for automated CI testing and team peer code audit.',
    controllingTool: 'gh pr create / GitHub UI',
    onFailureAction: 'Push corrective commits to branch; PR updates automatically.',
  },
  {
    id: 'review',
    name: '5. Peer Review',
    icon: CheckCircle2,
    category: 'collaboration',
    whatHappens: 'Team engineers inspect diffs, test edge cases, and leave inline suggestions.',
    whyItHappens: 'Maintains codebase quality, catches design defects, and shares context.',
    controllingTool: 'GitHub Code Review (CODEOWNERS)',
    onFailureAction: 'Author addresses comments, commits fixes, and requests re-review.',
  },
  {
    id: 'ci_test',
    name: '6. CI Test & Build',
    icon: Cpu,
    category: 'ci',
    whatHappens: 'GitHub Actions spins up clean runner VMs, runs linters, unit & integration tests.',
    whyItHappens: 'Machine verification that new code does not break existing application behavior.',
    controllingTool: '.github/workflows/ci.yml',
    onFailureAction: 'Inspect failing job logs; fix code locally; re-push.',
  },
  {
    id: 'security',
    name: '7. Security Gate',
    icon: ShieldCheck,
    category: 'ci',
    whatHappens: 'Automated secret scanning (Gitleaks), dependency CVE audits, and SAST.',
    whyItHappens: 'Guarantees zero leaked credentials or known vulnerabilities reach production.',
    controllingTool: 'Trivy / CodeQL / Dependabot',
    onFailureAction: 'Rotate leaked token; upgrade vulnerable dependencies.',
  },
  {
    id: 'artifact',
    name: '8. Package Artifact',
    icon: Package,
    category: 'artifact',
    whatHappens: 'Compiled code packaged into immutable container image tagged with commit SHA.',
    whyItHappens: 'Hermetic deployable unit pushed to GitHub Container Registry (ghcr.io).',
    controllingTool: 'docker buildx / ghcr.io',
    onFailureAction: 'Fix Dockerfile multi-stage build errors.',
  },
  {
    id: 'staging',
    name: '9. Staging Pre-Prod',
    icon: Server,
    category: 'cd',
    whatHappens: 'Container deployed to staging cluster; automated database migrations run.',
    whyItHappens: 'Final integration verification on production-identical cloud topology.',
    controllingTool: 'ArgoCD / Kubernetes',
    onFailureAction: 'Smoke tests fail; deployment halted before live production.',
  },
  {
    id: 'production',
    name: '10. Production Rollout',
    icon: Activity,
    category: 'cd',
    whatHappens: 'Canary (5%) or rolling cutover to live customer-facing server pods.',
    whyItHappens: 'Delivering validated value to real end-users with zero downtime.',
    controllingTool: 'Canary Controller / Ingress',
    onFailureAction: 'Readiness probes fail; router keeps traffic on old version.',
  },
  {
    id: 'monitoring',
    name: '11. Live Telemetry',
    icon: Activity,
    category: 'sre',
    whatHappens: 'Real-time observability of HTTP 5xx error rates, P99 latencies, and CPU metrics.',
    whyItHappens: 'Detecting subtle regressions (memory leaks, deadlocks) under real load.',
    controllingTool: 'Datadog / Prometheus',
    onFailureAction: 'Alert threshold breached (>1% error rate).',
  },
  {
    id: 'rollback',
    name: '12. Rollback Circuit',
    icon: RotateCcw,
    category: 'sre',
    whatHappens: 'Automated or one-click traffic diversion back to previous certified container digest.',
    whyItHappens: 'Emergency customer protection: restore uptime in 30s; debug safely later.',
    controllingTool: 'kubectl rollout undo / ArgoCD',
    onFailureAction: 'Post-mortem incident review and prevention task added.',
  },
];

export const GitCiCdConnectionMap: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('pr');
  const activeNode = LIFECYCLE_NODES.find((n) => n.id === selectedNodeId) || LIFECYCLE_NODES[0];

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'local': return '#38bdf8';
      case 'collaboration': return '#818cf8';
      case 'ci': return '#c084fc';
      case 'artifact': return '#f59e0b';
      case 'cd': return '#10b981';
      case 'sre': return '#f43f5e';
      default: return '#94a3b8';
    }
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
      }}
    >
      {/* Title Header */}
      <div
        style={{
          background: 'linear-gradient(90deg, #0d1527 0%, #151d38 100%)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Sparkles size={18} color="#38bdf8" />
          <div>
            <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#f8fafc' }}>
              The Complete Developer Journey: How Software Moves
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              From IDE code edits all the way to automated CI, cloud artifact registries, production canary, and SRE rollback
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Horizontal Lifecycle Stage Nodes */}
      <div
        style={{
          padding: '1.25rem',
          background: 'rgba(15, 23, 42, 0.5)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
          overflowX: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', minWidth: '980px', gap: '0.4rem' }}>
          {LIFECYCLE_NODES.map((node, idx) => {
            const isSelected = node.id === selectedNodeId;
            const nodeColor = getCategoryColor(node.category);
            const Icon = node.icon;
            const isLast = idx === LIFECYCLE_NODES.length - 1;

            return (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => setSelectedNodeId(node.id)}
                  style={{
                    background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(30, 41, 59, 0.6)',
                    border: isSelected ? `2px solid ${nodeColor}` : '1px solid rgba(148, 163, 184, 0.15)',
                    borderRadius: '8px',
                    padding: '0.55rem 0.65rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Icon size={14} color={nodeColor} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isSelected ? '#f8fafc' : '#cbd5e1' }}>
                    {node.name}
                  </span>
                </button>

                {!isLast && (
                  <ArrowRight size={13} color="rgba(148, 163, 184, 0.3)" style={{ flexShrink: 0 }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Lifecycle Stage Inspection Card */}
      <div
        style={{
          padding: '1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          background: 'rgba(11, 17, 33, 0.7)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>
            What is happening?
          </span>
          <span style={{ fontSize: '0.84rem', color: '#f8fafc', lineHeight: 1.5 }}>
            {activeNode.whatHappens}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#c084fc', textTransform: 'uppercase' }}>
            Why does it happen?
          </span>
          <span style={{ fontSize: '0.84rem', color: '#f8fafc', lineHeight: 1.5 }}>
            {activeNode.whyItHappens}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase' }}>
            What command / config controls it?
          </span>
          <code
            style={{
              fontSize: '0.78rem',
              color: '#6ee7b7',
              background: '#040711',
              padding: '0.35rem 0.55rem',
              borderRadius: '6px',
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            {activeNode.controllingTool}
          </code>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f87171', textTransform: 'uppercase' }}>
            What happens if it fails?
          </span>
          <span style={{ fontSize: '0.84rem', color: '#fca5a5', lineHeight: 1.5 }}>
            {activeNode.onFailureAction}
          </span>
        </div>
      </div>
    </div>
  );
};
