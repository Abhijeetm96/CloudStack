import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Footer } from '../layout/Footer';
import { FuturisticParallaxBackground } from './FuturisticParallaxBackground';
import {
  Flame,
  Boxes,
  ArrowRight,
  Terminal,
  GitBranch,
  ShieldAlert,
  Zap,
  Sparkles,
  Layers,
  Cpu,
  Code2,
  BookOpen,
  Container,
  Cloud,
  Activity,
  ShieldCheck,
  Clock,
  Play,
  CheckCircle2,
  AlertTriangle,
  Database,
} from 'lucide-react';

interface UpcomingTool {
  id: string;
  name: string;
  domain: string;
  techStack: string;
  quarter: string;
  color: string;
  bgGlow: string;
  icon: React.ElementType;
  description: string;
  coreConcepts: string[];
}

const UPCOMING_TOOLS: UpcomingTool[] = [
  {
    id: 'helm',
    name: 'Helm & Kustomize',
    domain: 'Kubernetes Package Management',
    techStack: 'Helm & Kustomize',
    quarter: 'Q4 2026',
    color: '#0ea5e9',
    bgGlow: 'rgba(14, 165, 233, 0.15)',
    icon: Container,
    description: 'Master cloud-native package management. Template Kubernetes manifests with Helm charts, values overrides, and Kustomize overlays.',
    coreConcepts: ['Helm Chart Templates & Values', 'Kustomize Overlays & Patches', 'Chart Repository Distribution', 'Release Rollbacks & History', 'Subcharts & Dependencies'],
  },
  {
    id: 'ansible',
    name: 'Ansible',
    domain: 'Configuration Management',
    techStack: 'Ansible Playbooks',
    quarter: 'Q4 2026',
    color: '#ef4444',
    bgGlow: 'rgba(239, 68, 68, 0.15)',
    icon: Cpu,
    description: 'Automate infrastructure provisioning, server fleet drift prevention, SSH configuration playbooks, and enterprise role hierarchies.',
    coreConcepts: ['YAML Playbooks & Tasks', 'Inventory & Dynamic Groups', 'Idempotency & Handlers', 'Ansible Vault Secret Management', 'Molecule Automated Testing'],
  },
  {
    id: 'observability',
    name: 'Prometheus & Grafana',
    domain: 'Monitoring & Observability',
    techStack: 'Prometheus & Grafana',
    quarter: 'Q1 2027',
    color: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
    icon: Activity,
    description: 'Instrument full-stack telemetry and triage 3 AM production outages with Prometheus, Grafana, OpenTelemetry tracing, and Loki logs.',
    coreConcepts: ['PromQL Metrics & Alert Rules', 'Distributed Tracing with OTel', 'Loki Log Aggregation', 'SLI/SLO Error Budget Burn', 'Production Pager Incident Triage'],
  },
  {
    id: 'security',
    name: 'HashiCorp Vault',
    domain: 'Secrets Management & Security',
    techStack: 'HashiCorp Vault & Trivy',
    quarter: 'Q2 2027',
    color: '#f43f5e',
    bgGlow: 'rgba(244, 63, 94, 0.15)',
    icon: ShieldCheck,
    description: 'Hardening modern cloud infrastructure. Orchestrate HashiCorp Vault secrets, automated container CVE scanning, and supply-chain attestations.',
    coreConcepts: ['Vault Dynamic Secret Leasing', 'Container CVE Scanning (Trivy)', 'Cloud IAM Least-Privilege', 'SBOMs & Cosign Signatures', 'Kubernetes Network Policies'],
  },
];

export const CloudStackHomeView: React.FC = () => {
  const { setMode, setActiveLessonConcept } = useApp();
  const [notifiedTools, setNotifiedTools] = useState<Record<string, boolean>>({});

  const handleNotifyToggle = (toolId: string) => {
    setNotifiedTools((prev) => ({
      ...prev,
      [toolId]: !prev[toolId],
    }));
  };

  const handleNavigateKubernetes = (initialMode: 'academy' | 'labs' | 'ide' | 'cluster') => {
    try {
      localStorage.setItem('kubernetes_initial_mode', initialMode);
    } catch {}
    setMode('kubernetes');
  };

  const handleNavigateDocker = (initialMode: 'academy' | 'labs' | 'ide' | 'visualizer') => {
    try {
      localStorage.setItem('docker_initial_mode', initialMode);
    } catch {}
    setMode('docker');
  };

  const handleNavigateLinuxForge = (initialMode: 'academy' | 'universe' | 'practice') => {
    try {
      localStorage.setItem('linuxforge_initial_mode', initialMode);
    } catch {}
    setMode('linuxforge');
  };

  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        minHeight: '100%',
        background: '#030712',
        color: '#f8fafc',
        padding: '2.5rem 1.5rem 4rem',
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      <FuturisticParallaxBackground />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1240px', margin: '0 auto' }}>
        {/* Top Suite Hero */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.9rem',
              borderRadius: '999px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              color: '#38bdf8',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Sparkles size={14} className="text-sky-400" />
            CloudStack &bull; Interactive Cloud &amp; DevOps Academies
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
              margin: '0 0 1rem',
              background: 'linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Master the Modern Cloud Stack.
          </h1>

          <p
            style={{
              fontSize: '1.1rem',
              color: '#94a3b8',
              maxWidth: '680px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
            }}
          >
            High-fidelity, in-browser developer simulators. Real command engines, visual DAGs, live cluster topologies, and SRE incident triage. Zero slides. Zero fluff.
          </p>

          {/* Quick Suite Stats Bar */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.75rem',
              padding: '0.85rem 1.75rem',
              borderRadius: '16px',
              background: 'rgba(15, 23, 42, 0.65)',
              border: '1px solid rgba(148, 163, 184, 0.15)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                <strong style={{ color: '#fff' }}>63</strong> Live Curriculum Modules
              </span>
            </div>
            <div style={{ width: '1px', height: '18px', background: 'rgba(148, 163, 184, 0.2)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={15} color="#eab308" />
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                <strong style={{ color: '#fff' }}>232+</strong> Interactive Concepts
              </span>
            </div>
            <div style={{ width: '1px', height: '18px', background: 'rgba(148, 163, 184, 0.2)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={15} color="#38bdf8" />
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                <strong style={{ color: '#fff' }}>4</strong> Live Execution Engines
              </span>
            </div>
            <div style={{ width: '1px', height: '18px', background: 'rgba(148, 163, 184, 0.2)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={15} color="#a855f7" />
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                <strong style={{ color: '#fff' }}>5</strong> Academies Coming Soon
              </span>
            </div>
          </div>

          {/* Master 29-Chapter DevOps Academy CTA */}
          <div style={{ marginTop: '1.5rem' }}>
            <button
              onClick={() => setMode('devops')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 1.4rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                color: '#f8fafc',
                fontSize: '0.86rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 20px rgba(168, 85, 247, 0.25)',
              }}
            >
              <BookOpen size={16} color="#c084fc" />
              <span>Explore Master 29-Chapter DevOps &amp; Cloud Academy</span>
              <ArrowRight size={14} color="#38bdf8" />
            </button>
          </div>
        </div>

        <div id="academies" style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: '0.84rem', fontWeight: 700, letterSpacing: '0.01em', color: '#cbd5e1' }}>
            Live Available Academies
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.75rem',
            marginBottom: '4.5rem',
          }}
        >
          {/* ========================================================================= */}
          {/* CARD 1: CLOUDSTACK (GIT & CI/CD ACADEMY) */}
          {/* ========================================================================= */}
          <div
            style={{
              background: 'linear-gradient(170deg, rgba(20, 27, 45, 0.72) 0%, rgba(10, 15, 28, 0.88) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(240, 80, 51, 0.25)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px -10px rgba(240, 80, 51, 0.08)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(240, 80, 51, 0.6)';
              e.currentTarget.style.boxShadow = '0 24px 50px -12px rgba(240, 80, 51, 0.22), 0 0 20px rgba(240, 80, 51, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'rgba(240, 80, 51, 0.25)';
              e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px -10px rgba(240, 80, 51, 0.08)';
            }}
          >
            {/* Top Laser Accent Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #f05033 0%, #ea580c 50%, #f97316 100%)',
              }}
            />

            {/* Corner Ambient Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '160px',
                height: '160px',
                background: 'radial-gradient(circle, rgba(240, 80, 51, 0.2) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Brand Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #f05033 0%, #c2410c 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 6px 18px rgba(240, 80, 51, 0.45)',
                  }}
                >
                  <Flame size={24} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0, color: '#fff', letterSpacing: '-0.02em' }}>
                      Git
                    </h2>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.12rem 0.45rem', borderRadius: '4px', background: 'rgba(240, 80, 51, 0.15)', border: '1px solid rgba(240, 80, 51, 0.35)', color: '#fb923c' }}>
                      Git Academy
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#fb923c', fontWeight: 600, letterSpacing: '0.01em', marginTop: '0.15rem' }}>
                    Version Control &amp; CI/CD Academy
                  </div>
                </div>
              </div>

              {/* Engine Status Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                  background: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#4ade80',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                <span>Engine Ready</span>
              </div>
            </div>

            {/* Summary */}
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 1.25rem', minHeight: '44px' }}>
              Deconstruct Git from the inside out. Master DAG graphs, object internals, three-way merge resolution, rebase forensics, and complete GitHub Actions CI/CD pipelines.
            </p>

            {/* LIVE SIMULATION TEASER RIG (DAG GRAPH PREVIEW) */}
            <div
              style={{
                background: 'rgba(5, 8, 17, 0.8)',
                border: '1px solid rgba(240, 80, 51, 0.2)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#fb923c', fontWeight: 600 }}>
                  <Terminal size={12} />
                  <span>Interactive Git DAG Simulation</span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>v2.44 Engine</span>
              </div>
              {/* Mini Visual Pipeline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', overflowX: 'auto', padding: '0.2rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }} />
                  <span>init</span>
                </div>
                <span style={{ color: '#475569' }}>──►</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f05033' }} />
                  <span>c-commit</span>
                </div>
                <span style={{ color: '#475569' }}>──►</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.4)', color: '#e9d5ff' }}>
                  <Sparkles size={11} color="#c084fc" />
                  <span>HEAD main</span>
                </div>
              </div>
            </div>

            {/* Core Metrics Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <GitBranch size={15} color="#f05033" />
                <span><strong>18 Topics</strong> &bull; 75 Concepts</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <ShieldAlert size={15} color="#f05033" />
                <span>Disaster Recovery Labs</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <Terminal size={15} color="#f05033" />
                <span>Real In-Browser Git CLI</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.3)', fontSize: '0.8rem', color: '#f3e8ff' }}>
                <Zap size={14} color="#a855f7" />
                <span style={{ fontWeight: 600 }}>GitHub Actions CI/CD</span>
              </div>
            </div>

            {/* Launch Actions */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => {
                  setActiveLessonConcept(null);
                  setMode('learn');
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #f05033 0%, #ea580c 100%)',
                  color: '#fff',
                  border: 'none',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(240, 80, 51, 0.35)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 22px rgba(240, 80, 51, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(240, 80, 51, 0.35)';
                }}
              >
                <span>Launch Git Academy</span>
                <ArrowRight size={17} />
              </button>

              {/* Sub-Route Navigation Dock */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
                <button
                  onClick={() => setMode('practice')}
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <BookOpen size={12} />
                  Practice
                </button>
                <button
                  onClick={() => setMode('labs')}
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <ShieldAlert size={12} />
                  Labs
                </button>
                <button
                  onClick={() => setMode('ide')}
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <Terminal size={12} />
                  IDE
                </button>
                <button
                  onClick={() => {
                    setActiveLessonConcept('c-actions-workflow');
                    setMode('learn');
                  }}
                  title="Jump to GitHub Actions CI/CD Pipeline Track"
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(139, 92, 246, 0.16)',
                    border: '1px solid rgba(139, 92, 246, 0.35)',
                    color: '#e9d5ff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.28)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.16)';
                    e.currentTarget.style.color = '#e9d5ff';
                  }}
                >
                  <Zap size={12} color="#a855f7" />
                  CI/CD
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 2: KUBERNETES (KUBERNETES & CLOUD-NATIVE ACADEMY) */}
          {/* ========================================================================= */}
          <div
            style={{
              background: 'linear-gradient(170deg, rgba(20, 27, 45, 0.72) 0%, rgba(10, 15, 28, 0.88) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px -10px rgba(56, 189, 248, 0.08)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.6)';
              e.currentTarget.style.boxShadow = '0 24px 50px -12px rgba(56, 189, 248, 0.22), 0 0 20px rgba(56, 189, 248, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
              e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px -10px rgba(56, 189, 248, 0.08)';
            }}
          >
            {/* Top Laser Accent Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 50%, #2563eb 100%)',
              }}
            />

            {/* Corner Ambient Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '160px',
                height: '160px',
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Brand Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #0284c7 0%, #1d4ed8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 6px 18px rgba(56, 189, 248, 0.45)',
                  }}
                >
                  <Boxes size={24} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0, color: '#fff', letterSpacing: '-0.02em' }}>
                      Kubernetes
                    </h2>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.12rem 0.45rem', borderRadius: '4px', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.35)', color: '#38bdf8' }}>
                      Kubernetes Academy
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600, letterSpacing: '0.01em', marginTop: '0.15rem' }}>
                    Container Orchestration &amp; Cloud-Native Academy
                  </div>
                </div>
              </div>

              {/* Engine Status Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                  background: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#4ade80',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                <span>Engine Ready</span>
              </div>
            </div>

            {/* Summary */}
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 1.25rem', minHeight: '44px' }}>
              Deploy, break, and orchestrate containers. Live multi-node topology mesh, self-healing deployment controller, virtual kubectl engine, and SRE triage clinics.
            </p>

            {/* LIVE SIMULATION TEASER RIG (CLUSTER MESH PREVIEW) */}
            <div
              style={{
                background: 'rgba(5, 8, 17, 0.8)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#38bdf8', fontWeight: 600 }}>
                  <Boxes size={12} />
                  <span>Interactive Cluster Topology Mesh</span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>k8s v1.30</span>
              </div>
              {/* Mini Visual Pipeline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', overflowX: 'auto', padding: '0.2rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }} />
                  <span>control-plane</span>
                </div>
                <span style={{ color: '#475569' }}>──►</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                  <span>worker-01 (3 pods)</span>
                </div>
                <span style={{ color: '#475569' }}>──►</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.2)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#bae6fd' }}>
                  <Activity size={11} color="#38bdf8" />
                  <span>svc :80</span>
                </div>
              </div>
            </div>

            {/* Core Metrics Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <Layers size={15} color="#38bdf8" />
                <span><strong>16 Modules</strong> &bull; 71 Concepts</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <ShieldAlert size={15} color="#38bdf8" />
                <span>CrashLoop &amp; OOM Clinics</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <Terminal size={15} color="#38bdf8" />
                <span>Virtual Kubectl Engine</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', fontSize: '0.8rem', color: '#e0f2fe' }}>
                <Boxes size={14} color="#38bdf8" />
                <span style={{ fontWeight: 600 }}>Multi-Node Mesh</span>
              </div>
            </div>

            {/* Launch Actions */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => setMode('kubernetes')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                  color: '#fff',
                  border: 'none',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(56, 189, 248, 0.35)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 22px rgba(56, 189, 248, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(56, 189, 248, 0.35)';
                }}
              >
                <span>Launch Kubernetes Academy</span>
                <ArrowRight size={17} />
              </button>

              {/* Sub-Route Navigation Dock */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
                <button
                  onClick={() => handleNavigateKubernetes('academy')}
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <BookOpen size={12} />
                  Modules
                </button>
                <button
                  onClick={() => handleNavigateKubernetes('labs')}
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <ShieldAlert size={12} />
                  Labs
                </button>
                <button
                  onClick={() => handleNavigateKubernetes('ide')}
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <Terminal size={12} />
                  IDE
                </button>
                <button
                  onClick={() => handleNavigateKubernetes('cluster')}
                  title="Jump to Kubernetes Cluster Topology Mesh"
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(56, 189, 248, 0.16)',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    color: '#bae6fd',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(56, 189, 248, 0.28)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(56, 189, 248, 0.16)';
                    e.currentTarget.style.color = '#bae6fd';
                  }}
                >
                  <Boxes size={12} color="#38bdf8" />
                  Mesh
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 3: DOCKER (DOCKER & CONTAINER ENGINE ACADEMY) */}
          {/* ========================================================================= */}
          <div
            style={{
              background: 'linear-gradient(170deg, rgba(20, 27, 45, 0.72) 0%, rgba(10, 15, 28, 0.88) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(14, 165, 233, 0.25)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px -10px rgba(14, 165, 233, 0.08)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.6)';
              e.currentTarget.style.boxShadow = '0 24px 50px -12px rgba(14, 165, 233, 0.22), 0 0 20px rgba(14, 165, 233, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.25)';
              e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px -10px rgba(14, 165, 233, 0.08)';
            }}
          >
            {/* Top Laser Accent Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #0ea5e9 0%, #06b6d4 50%, #0284c7 100%)',
              }}
            />

            {/* Corner Ambient Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '160px',
                height: '160px',
                background: 'radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Brand Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 6px 18px rgba(14, 165, 233, 0.45)',
                  }}
                >
                  <Container size={24} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0, color: '#fff', letterSpacing: '-0.02em' }}>
                      Docker
                    </h2>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.12rem 0.45rem', borderRadius: '4px', background: 'rgba(14, 165, 233, 0.15)', border: '1px solid rgba(14, 165, 233, 0.35)', color: '#38bdf8' }}>
                      Docker Academy
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600, letterSpacing: '0.01em', marginTop: '0.15rem' }}>
                    Containers, Compose &amp; Engine Academy
                  </div>
                </div>
              </div>

              {/* Engine Status Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                  background: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#4ade80',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                <span>Engine Ready</span>
              </div>
            </div>

            {/* Summary */}
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 1.25rem', minHeight: '44px' }}>
              Master containerization from the ground up. 14 topics covering Linux namespaces, cgroups, OverlayFS, volume mounts, multi-stage builds, and Docker Compose orchestration.
            </p>

            {/* LIVE SIMULATION TEASER RIG (CONTAINER LAYER & COMPOSE PREVIEW) */}
            <div
              style={{
                background: 'rgba(5, 8, 17, 0.8)',
                border: '1px solid rgba(14, 165, 233, 0.2)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#0ea5e9', fontWeight: 600 }}>
                  <Container size={12} />
                  <span>Interactive Container Runtime Simulation</span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>engine v26.1</span>
              </div>
              {/* Mini Visual Pipeline */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', overflowX: 'auto', padding: '0.2rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0ea5e9' }} />
                  <span>Dockerfile</span>
                </div>
                <span style={{ color: '#475569' }}>──►</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                  <span>cache:hit</span>
                </div>
                <span style={{ color: '#475569' }}>──►</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(14, 165, 233, 0.2)', border: '1px solid rgba(14, 165, 233, 0.4)', color: '#bae6fd' }}>
                  <Activity size={11} color="#38bdf8" />
                  <span>app:3000 (up)</span>
                </div>
              </div>
            </div>

            {/* Core Metrics Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <Layers size={15} color="#0ea5e9" />
                <span><strong>14 Topics</strong> &bull; 42 Concepts</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <ShieldAlert size={15} color="#0ea5e9" />
                <span>SRE Incident Clinics</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <Terminal size={15} color="#0ea5e9" />
                <span>Virtual Docker Engine CLI</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(14, 165, 233, 0.12)', border: '1px solid rgba(14, 165, 233, 0.3)', fontSize: '0.8rem', color: '#e0f2fe' }}>
                <Code2 size={14} color="#0ea5e9" />
                <span style={{ fontWeight: 600 }}>Compose &amp; Mesh IDE</span>
              </div>
            </div>

            {/* Launch Actions */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => setMode('docker')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  color: '#fff',
                  border: 'none',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(14, 165, 233, 0.35)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 22px rgba(14, 165, 233, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(14, 165, 233, 0.35)';
                }}
              >
                <span>Launch Docker Academy</span>
                <ArrowRight size={17} />
              </button>

              {/* Sub-Route Navigation Dock */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem' }}>
                <button
                  onClick={() => handleNavigateDocker('academy')}
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <BookOpen size={12} />
                  Topics
                </button>
                <button
                  onClick={() => handleNavigateDocker('labs')}
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <ShieldAlert size={12} />
                  Labs
                </button>
                <button
                  onClick={() => handleNavigateDocker('ide')}
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#cbd5e1',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <Terminal size={12} />
                  IDE
                </button>
                <button
                  onClick={() => handleNavigateDocker('visualizer')}
                  title="Jump to Container Mesh Visualizer"
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(14, 165, 233, 0.16)',
                    border: '1px solid rgba(14, 165, 233, 0.35)',
                    color: '#bae6fd',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(14, 165, 233, 0.28)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(14, 165, 233, 0.16)';
                    e.currentTarget.style.color = '#bae6fd';
                  }}
                >
                  <Container size={12} color="#0ea5e9" />
                  Mesh
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 4: LINUXFORGE (LINUX SYSTEMS, KERNEL & SRE ACADEMY) */}
          {/* ========================================================================= */}
          <div
            style={{
              background: 'linear-gradient(170deg, rgba(20, 27, 45, 0.72) 0%, rgba(10, 15, 28, 0.88) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(6, 182, 212, 0.25)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px -10px rgba(6, 182, 212, 0.08)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.6)';
              e.currentTarget.style.boxShadow = '0 24px 50px -12px rgba(6, 182, 212, 0.22), 0 0 20px rgba(6, 182, 212, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.25)';
              e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px -10px rgba(6, 182, 212, 0.08)';
            }}
          >
            {/* Top Laser Accent Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #06b6d4 0%, #0891b2 50%, #38bdf8 100%)',
              }}
            />

            {/* Corner Ambient Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '160px',
                height: '160px',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Brand Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 4px 18px rgba(6, 182, 212, 0.4)',
                    flexShrink: 0,
                  }}
                >
                  <Terminal size={24} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.02em', margin: 0, color: '#fff' }}>
                      LinuxForge
                    </h3>
                    <span
                      style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: '999px',
                        background: 'rgba(6, 182, 212, 0.15)',
                        border: '1px solid rgba(6, 182, 212, 0.35)',
                        color: '#06b6d4',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      LIVE ACADEMY
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0.15rem 0 0' }}>
                    Linux Systems, Kernel &amp; SRE Academy
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
              Master the operating system foundation of cloud infrastructure. From terminal navigation, pipes, and file permissions to systemd unit authoring, sysctl tuning, eBPF telemetry, and container namespaces.
            </p>

            {/* Metric Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.25)', borderRadius: '6px', padding: '0.25rem 0.55rem' }}>
                15 Curriculum Topics
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.25)', borderRadius: '6px', padding: '0.25rem 0.55rem' }}>
                46 Mastery Concepts
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a855f7', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: '6px', padding: '0.25rem 0.55rem' }}>
                Kernel 6.8 Shell
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: '6px', padding: '0.25rem 0.55rem' }}>
                eBPF &amp; cgroups
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={() => handleNavigateLinuxForge('academy')}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                  border: 'none',
                  color: '#042f2e',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(6, 182, 212, 0.35)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(6, 182, 212, 0.35)';
                }}
              >
                <span>Launch Linux Academy</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                <button
                  onClick={() => handleNavigateLinuxForge('universe')}
                  title="Explore all 46 Linux concepts"
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    color: '#cbd5e1',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  <BookOpen size={12} />
                  46 Concepts
                </button>
                <button
                  onClick={() => handleNavigateLinuxForge('practice')}
                  title="Interactive Terminal Sandbox Practice"
                  style={{
                    padding: '0.45rem 0.35rem',
                    borderRadius: '7px',
                    background: 'rgba(6, 182, 212, 0.16)',
                    border: '1px solid rgba(6, 182, 212, 0.35)',
                    color: '#a5f3fc',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.28)';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(6, 182, 212, 0.16)';
                    e.currentTarget.style.color = '#a5f3fc';
                  }}
                >
                  <Terminal size={12} color="#06b6d4" />
                  Terminal
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 5: TERRAFORM (INFRASTRUCTURE AS CODE ACADEMY) */}
          {/* ========================================================================= */}
          <div
            style={{
              background: 'linear-gradient(170deg, rgba(20, 27, 45, 0.72) 0%, rgba(10, 15, 28, 0.88) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(132, 79, 186, 0.3)',
              borderRadius: '20px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px -10px rgba(132, 79, 186, 0.1)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.6)';
              e.currentTarget.style.boxShadow = '0 24px 50px -12px rgba(132, 79, 186, 0.25), 0 0 20px rgba(132, 79, 186, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'rgba(132, 79, 186, 0.3)';
              e.currentTarget.style.boxShadow = '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px -10px rgba(132, 79, 186, 0.1)';
            }}
          >
            {/* Top Laser Accent Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #844fba 0%, #c084fc 50%, #6366f1 100%)',
              }}
            />

            {/* Corner Ambient Glow */}
            <div
              style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '160px',
                height: '160px',
                background: 'radial-gradient(circle, rgba(132, 79, 186, 0.25) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Brand Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #844fba 0%, #6366f1 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 6px 18px rgba(132, 79, 186, 0.45)',
                  }}
                >
                  <Layers size={24} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 800, margin: 0, color: '#fff', letterSpacing: '-0.02em' }}>
                      Terraform
                    </h2>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.12rem 0.45rem', borderRadius: '4px', background: 'rgba(132, 79, 186, 0.15)', border: '1px solid rgba(132, 79, 186, 0.35)', color: '#d8b4fe' }}>
                      Terraform Academy
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#c084fc', fontWeight: 600, letterSpacing: '0.01em', marginTop: '0.15rem' }}>
                    Infrastructure as Code (IaC) Academy
                  </div>
                </div>
              </div>

              {/* Engine Status Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '999px',
                  background: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#4ade80',
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                <span>Engine Ready</span>
              </div>
            </div>

            {/* Summary */}
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 1.25rem', minHeight: '44px' }}>
              Master declarative cloud engineering from first principles. 50 chapters, 694 subchapters, state diff visualizers, DAG dependency graphs, safe failure arena, and enterprise platforms.
            </p>

            {/* LIVE SIMULATION TEASER RIG (PLAN & STATE RECONCILER) */}
            <div
              style={{
                background: 'rgba(5, 8, 17, 0.8)',
                border: '1px solid rgba(132, 79, 186, 0.2)',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#c084fc', fontWeight: 600 }}>
                  <Play size={12} />
                  <span>Execution &amp; State Reconciler</span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', color: '#94a3b8' }}>v1.8.0</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', overflowX: 'auto', padding: '0.2rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#844fba' }} />
                  <span>HCL Code</span>
                </div>
                <span style={{ color: '#475569' }}>──►</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: '#cbd5e1' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }} />
                  <span>DAG:Graph</span>
                </div>
                <span style={{ color: '#475569' }}>──►</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#a7f3d0' }}>
                  <CheckCircle2 size={11} color="#34d399" />
                  <span>Plan (+5, ~0, -0)</span>
                </div>
              </div>
            </div>

            {/* Core Metrics Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <BookOpen size={14} color="#c084fc" />
                <span><strong>50</strong> Chapters</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <Code2 size={14} color="#38bdf8" />
                <span><strong>694</strong> Lessons</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <AlertTriangle size={14} color="#ef4444" />
                <span><strong>16</strong> Failure Labs</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', padding: '0.45rem 0.65rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.8rem', color: '#cbd5e1' }}>
                <Database size={14} color="#10b981" />
                <span>State Visualizer</span>
              </div>
            </div>

            {/* Launchers */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button
                onClick={() => setMode('terraform')}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #844fba 0%, #6366f1 100%)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(132, 79, 186, 0.35)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(132, 79, 186, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(132, 79, 186, 0.35)';
                }}
              >
                <span>Launch Terraform Academy</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: THE DEVOPS & CLOUD COMPUTING ECOSYSTEM ROADMAP (COMING SOON) */}
        <div id="devops-stack" data-section="roadmap-section" style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <Clock size={16} color="#a855f7" />
                <span style={{ fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c084fc' }}>
                  Ecosystem Roadmap &bull; Coming Soon
                </span>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.025em', margin: 0, color: '#fff' }}>
                Upcoming DevOps Technologies
              </h2>
              <p style={{ fontSize: '0.92rem', color: '#94a3b8', margin: '0.35rem 0 0', maxWidth: '640px' }}>
                Hands-on interactive simulators for the rest of the modern cloud engineering and infrastructure automation stack.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setMode('roadmap')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
                  border: '1px solid rgba(234, 179, 8, 0.45)',
                  color: '#fef08a',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(234, 179, 8, 0.15)',
                  transition: 'all 0.15s ease',
                }}
              >
                <Sparkles size={15} color="#facc15" />
                <span>Open Full Interactive Roadmap &rarr;</span>
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(168, 85, 247, 0.1)',
                  border: '1px solid rgba(168, 85, 247, 0.25)',
                  fontSize: '0.78rem',
                  color: '#e9d5ff',
                  fontWeight: 600,
                }}
              >
                <Sparkles size={14} color="#c084fc" />
                <span>Vote for upcoming engines</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {UPCOMING_TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isNotified = notifiedTools[tool.id];

              return (
                <div
                  key={tool.id}
                  style={{
                    background: 'linear-gradient(145deg, rgba(20, 27, 45, 0.6) 0%, rgba(10, 15, 26, 0.8) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: `1px solid rgba(148, 163, 184, 0.15)`,
                    borderRadius: '20px',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = tool.color;
                    e.currentTarget.style.boxShadow = `0 12px 30px -10px ${tool.bgGlow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Subtle Background Glow */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '130px',
                      height: '130px',
                      background: `radial-gradient(circle, ${tool.bgGlow} 0%, transparent 70%)`,
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Header Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '10px',
                          background: `linear-gradient(135deg, ${tool.color} 0%, rgba(15, 23, 42, 0.9) 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          boxShadow: `0 4px 12px ${tool.bgGlow}`,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                            {tool.name}
                          </span>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: tool.color,
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: `1px solid ${tool.color}40`,
                              borderRadius: '4px',
                              padding: '0.15rem 0.5rem',
                              letterSpacing: '0.01em',
                            }}
                          >
                            {tool.techStack}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, marginTop: '0.15rem' }}>
                          {tool.domain}
                        </div>
                      </div>
                    </div>

                    {/* Coming Soon Pill */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '999px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: '#cbd5e1',
                        letterSpacing: '0.04em',
                      }}
                    >
                      <Clock size={11} color={tool.color} />
                      <span>{tool.quarter}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 1.25rem', minHeight: '40px' }}>
                    {tool.description}
                  </p>

                  {/* Concept Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {tool.coreConcepts.map((concept, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.78rem',
                          padding: '0.22rem 0.55rem',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: '#cbd5e1',
                        }}
                      >
                        {concept}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Notification / Priority Action */}
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(148, 163, 184, 0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#64748b' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7' }} />
                      <span>In Active Curriculum Design</span>
                    </div>

                    <button
                      onClick={() => handleNotifyToggle(tool.id)}
                      aria-label={isNotified ? `Voted for ${tool.name}` : `Upvote priority for ${tool.name}`}
                      title={isNotified ? "You voted for priority release" : "Upvote priority release"}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '6px',
                        background: isNotified ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                        border: isNotified ? '1px solid rgba(34, 197, 94, 0.35)' : '1px solid rgba(148, 163, 184, 0.2)',
                        color: isNotified ? '#4ade80' : '#cbd5e1',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span style={{ fontSize: '0.68rem', transform: 'translateY(-1px)' }}>▲</span>
                      <span>{isNotified ? 'Voted' : 'Upvote'}</span>
                      <span style={{ fontSize: '0.72rem', color: isNotified ? '#4ade80' : '#94a3b8' }}>
                        {isNotified ? '143' : '142'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: PHILOSOPHY & ARCHITECTURE SYNERGY BANNER */}
        <div
          id="why-suite"
          style={{
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
            borderRadius: '16px',
            padding: '2.5rem 2.25rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <Zap size={22} color="#eab308" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#fff', letterSpacing: '-0.01em' }}>
              The Forge Pedagogical Standard
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              marginTop: '1.5rem',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                1. Sandboxed In-Browser Runtimes
              </div>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.65, margin: 0 }}>
                Every command executes against real data structures — DAGs, trees, and controller loops — without requiring local container daemons or cloud accounts.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                2. Disaster-Recovery First
              </div>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.65, margin: 0 }}>
                Anyone can follow happy paths. We intentionally drop you into corrupted indexes, detached heads, CrashLoopBackOffs, and OOMKilled pods so you learn how to fix real outages.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                3. Unified Visual Mental Models
              </div>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.65, margin: 0 }}>
                Every action immediately mirrors into real-time visual stages — DAG commit graphs, working tree stages, node cluster topologies, and pod network routes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
