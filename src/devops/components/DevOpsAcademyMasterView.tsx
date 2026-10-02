import React, { useState, useMemo } from 'react';
import {
  DEVOPS_29_CHAPTERS,
  DEVOPS_10_TRACKS,
  DevOpsChapter,
  DevOpsLearningTrack,
  DevOpsTrackCategory,
  TOTAL_DEVOPS_CHAPTERS,
  TOTAL_DEVOPS_SUBMODULES,
  TOTAL_DEVOPS_TOPICS,
} from '../data/devopsCurriculumData';
import { useApp } from '../../context/AppContext';
import { StandardCapstoneHubView } from '../../platform/capstones/StandardCapstoneHubView';
import {
  Terminal,
  Container,
  Boxes,
  Workflow,
  Cloud,
  Activity,
  ShieldCheck,
  Layers,
  Code2,
  Award,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Compass,
  Play,
  Flame,
  Radio,
  Sliders,
  Filter,
  X,
  Zap,
  Server,
  Cpu,
  GitBranch,
  Shield,
  Clock,
  Eye,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Terminal,
  Container,
  Boxes,
  Workflow,
  Cloud,
  Activity,
  ShieldCheck,
  Layers,
  Code2,
  Award,
};

// DevOps Engineering Lifecycle Pipeline Stages
interface PipelineStage {
  id: string;
  name: string;
  shortDesc: string;
  trackId: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
  tools: string[];
}

const PIPELINE_STAGES: PipelineStage[] = [
  { id: 'stage-code', name: 'Code & OS', shortDesc: 'Linux & Git Primitives', trackId: 'track-foundation', icon: Terminal, color: '#06b6d4', tools: ['Linux', 'Bash', 'Git'] },
  { id: 'stage-package', name: 'Containerize', shortDesc: 'Docker & OCI Artifacts', trackId: 'track-containerization', icon: Container, color: '#38bdf8', tools: ['Docker', 'BuildKit', 'OCI'] },
  { id: 'stage-orchestrate', name: 'Orchestrate', shortDesc: 'Kubernetes & Control Plane', trackId: 'track-orchestration', icon: Boxes, color: '#a855f7', tools: ['K8s', 'Calico', 'Helm'] },
  { id: 'stage-automate', name: 'CI/CD & IaC', shortDesc: 'Pipelines & Terraform', trackId: 'track-automation', icon: Workflow, color: '#ec4899', tools: ['GitHub Actions', 'Terraform'] },
  { id: 'stage-cloud', name: 'Cloud & Mesh', shortDesc: 'Hyperscalers & Networking', trackId: 'track-cloud', icon: Cloud, color: '#3b82f6', tools: ['AWS', 'VPC', 'Postgres'] },
  { id: 'stage-observe', name: 'Observability', shortDesc: 'Prometheus & SRE Telemetry', trackId: 'track-operations', icon: Activity, color: '#10b981', tools: ['Prometheus', 'Grafana', 'SRE'] },
  { id: 'stage-secure', name: 'DevSecOps', shortDesc: 'Static CVE & Secrets Vault', trackId: 'track-security', icon: ShieldCheck, color: '#f59e0b', tools: ['Trivy', 'Vault', 'SBOM'] },
  { id: 'stage-triage', name: 'Troubleshoot', shortDesc: '3 AM Incident Solver', trackId: 'track-career', icon: Flame, color: '#ef4444', tools: ['Post-Mortem', 'Incident Lab'] },
];

export const DevOpsAcademyMasterView: React.FC = () => {
  const { setMode } = useApp();

  // Primary Views: 'command-center' (dual-pane) | 'pipeline' (lifecycle) | 'matrix' (all 29 chapters) | 'capstones' (5 projects)
  const [viewMode, setViewMode] = useState<'command-center' | 'pipeline' | 'matrix' | 'capstones'>('command-center');
  const [activeTrackId, setActiveTrackId] = useState<string>('track-foundation');
  const [categoryFilter, setCategoryFilter] = useState<DevOpsTrackCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Chapter inspection & accordion
  const [expandedChapterIds, setExpandedChapterIds] = useState<Record<string, boolean>>({
    'ch01-linux': true,
    'ch04-docker': true,
    'ch06-kubernetes-fundamentals': true,
  });

  // Modal for deep chapter syllabus preview
  const [inspectedChapter, setInspectedChapter] = useState<DevOpsChapter | null>(null);

  const toggleChapter = (id: string) => {
    setExpandedChapterIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLaunchLive = (action: DevOpsChapter['liveAction']) => {
    if (!action) return;
    if (action.route === '/linuxforge') setMode('linuxforge');
    else if (action.route === '/git') setMode('learn');
    else if (action.route === '/docker') setMode('docker');
    else if (action.route === '/kubernetes') setMode('kubernetes');
    else if (action.route === '/terraform') setMode('terraform');
    else if (action.route === '/solver') setMode('hospital');
    else setMode('home');
  };

  // Active track object
  const activeTrack = useMemo(() => {
    return DEVOPS_10_TRACKS.find((t) => t.id === activeTrackId) || DEVOPS_10_TRACKS[0];
  }, [activeTrackId]);

  // Chapters belonging to active track
  const activeTrackChapters = useMemo(() => {
    return DEVOPS_29_CHAPTERS.filter((ch) => activeTrack.chapterNumbers.includes(ch.number));
  }, [activeTrack]);

  // Global search filtering across all 29 chapters
  const filteredChapters = useMemo(() => {
    return DEVOPS_29_CHAPTERS.filter((ch) => {
      const matchesCategory = categoryFilter === 'all' || ch.category === categoryFilter;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = ch.title.toLowerCase().includes(q) || ch.chapterCode.toLowerCase().includes(q);
      const matchSummary = ch.summary.toLowerCase().includes(q);
      const matchTech = ch.targetTech.some((t) => t.toLowerCase().includes(q));
      const matchSub = ch.subModules.some(
        (sm) =>
          sm.title.toLowerCase().includes(q) ||
          sm.topics.some((top) => top.toLowerCase().includes(q))
      );
      return matchTitle || matchSummary || matchTech || matchSub;
    });
  }, [categoryFilter, searchQuery]);

  // Live academies count
  const liveCount = useMemo(() => {
    return DEVOPS_29_CHAPTERS.filter((ch) => ch.status === 'live').length;
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100%',
        minHeight: 0,
        overflow: 'hidden',
        background: '#040711',
        color: '#f8fafc',
      }}
    >
      {/* ================================================================ */}
      {/* 1. TOP COMMAND BAR: Cyber Glow Header, Metrics & View Toggles   */}
      {/* ================================================================ */}
      <header
        style={{
          flexShrink: 0,
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 22, 0.95) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Left: Brand Identity & Pulse */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#06b6d4',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.25)',
            }}
          >
            <Compass size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                DevOps & Cloud Engineering Academy
              </h1>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  color: '#34d399',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                }}
              >
                ● 29 CHAPTERS • 10 TRACKS
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.74rem', color: '#94a3b8' }}>
              From Linux kernel isolation & Git plumbing to multi-cloud Kubernetes orchestration and SRE telemetry.
            </p>
          </div>
        </div>

        {/* Center: Live Stats Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.35rem 0.85rem',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '9px',
            }}
          >
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#38bdf8' }}>{TOTAL_DEVOPS_CHAPTERS}</span>
              <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginLeft: '0.3rem' }}>Chapters</span>
            </div>
            <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>•</span>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#10b981' }}>{TOTAL_DEVOPS_SUBMODULES}</span>
              <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginLeft: '0.3rem' }}>Modules</span>
            </div>
            <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>•</span>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 900, color: '#a855f7' }}>{liveCount}</span>
              <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginLeft: '0.3rem' }}>Live Academies</span>
            </div>
          </div>

          {/* Right: View Mode Toggle Tabs */}
          <div
            style={{
              display: 'inline-flex',
              padding: '0.25rem',
              background: '#090d16',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <button
              onClick={() => setViewMode('command-center')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '7px',
                border: 'none',
                background: viewMode === 'command-center' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                color: viewMode === 'command-center' ? '#06b6d4' : '#94a3b8',
                fontWeight: 800,
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease',
              }}
            >
              <Sliders size={13} />
              <span>Command Center</span>
            </button>

            <button
              onClick={() => setViewMode('pipeline')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '7px',
                border: 'none',
                background: viewMode === 'pipeline' ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                color: viewMode === 'pipeline' ? '#c084fc' : '#94a3b8',
                fontWeight: 800,
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease',
              }}
            >
              <Workflow size={13} />
              <span>DevOps Pipeline</span>
            </button>

            <button
              onClick={() => setViewMode('matrix')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '7px',
                border: 'none',
                background: viewMode === 'matrix' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: viewMode === 'matrix' ? '#38bdf8' : '#94a3b8',
                fontWeight: 800,
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease',
              }}
            >
              <BookOpen size={13} />
              <span>All 29 Chapters</span>
            </button>

            <button
              onClick={() => setViewMode('capstones')}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '7px',
                border: 'none',
                background: viewMode === 'capstones' ? 'rgba(236, 72, 153, 0.25)' : 'transparent',
                color: viewMode === 'capstones' ? '#f472b6' : '#94a3b8',
                fontWeight: 800,
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease',
              }}
            >
              <Award size={13} />
              <span>Capstones (5 Projects)</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. INTERACTIVE DEVOPS LIFECYCLE PIPELINE RIBBON                  */}
      {/* ================================================================ */}
      <nav
        aria-label="DevOps Lifecycle Stages"
        style={{
          flexShrink: 0,
          background: 'rgba(9, 13, 22, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '0.5rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          overflowX: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.5rem', flexShrink: 0 }}>
          <Sparkles size={13} color="#f59e0b" />
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase' }}>
            Lifecycle Flow:
          </span>
        </div>

        {PIPELINE_STAGES.map((st, idx) => {
          const StageIcon = st.icon;
          const isCurrentTrack = activeTrackId === st.trackId;

          return (
            <button
              key={st.id}
              onClick={() => {
                setActiveTrackId(st.trackId);
                setViewMode('command-center');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.65rem',
                borderRadius: '8px',
                background: isCurrentTrack ? `rgba(${parseInt(st.color.slice(1, 3), 16)}, ${parseInt(st.color.slice(3, 5), 16)}, ${parseInt(st.color.slice(5, 7), 16)}, 0.2)` : 'rgba(255, 255, 255, 0.03)',
                border: isCurrentTrack ? `1px solid ${st.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                color: isCurrentTrack ? st.color : '#cbd5e1',
                fontSize: '0.72rem',
                fontWeight: isCurrentTrack ? 800 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                flexShrink: 0,
              }}
            >
              <StageIcon size={13} color={st.color} />
              <span>{st.name}</span>
              {idx < PIPELINE_STAGES.length - 1 && (
                <span style={{ color: '#475569', marginLeft: '0.2rem' }}>→</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ================================================================ */}
      {/* 3. MAIN WORKSPACE: DUAL-PANE COMMAND CENTER                      */}
      {/* ================================================================ */}
      {viewMode === 'command-center' && (
        <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {/* ================= LEFT RAIL: TRACK SELECTOR ================= */}
          <aside
            style={{
              width: '360px',
              minWidth: '320px',
              maxWidth: '380px',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(9, 13, 22, 0.95)',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            {/* Search Track Header */}
            <div style={{ padding: '0.85rem 1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#040711',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '0.45rem 0.75rem',
                }}
              >
                <Search size={15} color="#64748b" />
                <input
                  type="text"
                  placeholder="Filter tracks & skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#f8fafc',
                    fontSize: '0.8rem',
                    flex: 1,
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Track Items List */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '0.65rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.45rem',
              }}
            >
              {DEVOPS_10_TRACKS.map((track) => {
                const TrackIcon = ICON_MAP[track.iconName] || Terminal;
                const isSelected = activeTrackId === track.id;
                const trackChaps = DEVOPS_29_CHAPTERS.filter((ch) => track.chapterNumbers.includes(ch.number));
                const hasLive = trackChaps.some((ch) => ch.status === 'live');

                return (
                  <div
                    key={track.id}
                    onClick={() => setActiveTrackId(track.id)}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.02)',
                      border: isSelected ? `1.5px solid ${track.color}` : '1px solid rgba(255, 255, 255, 0.06)',
                      boxShadow: isSelected ? `0 0 25px ${track.color}25` : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '9px',
                        background: `rgba(${parseInt(track.color.slice(1, 3), 16)}, ${parseInt(track.color.slice(3, 5), 16)}, ${parseInt(track.color.slice(5, 7), 16)}, 0.18)`,
                        border: `1px solid ${track.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: track.color,
                        flexShrink: 0,
                      }}
                    >
                      <TrackIcon size={18} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: track.color, textTransform: 'uppercase' }}>
                          TRACK {track.trackNumber}
                        </span>
                        {hasLive && (
                          <span
                            style={{
                              fontSize: '0.62rem',
                              fontWeight: 800,
                              color: '#34d399',
                              background: 'rgba(16, 185, 129, 0.15)',
                              padding: '0.1rem 0.35rem',
                              borderRadius: '4px',
                            }}
                          >
                            ● LIVE
                          </span>
                        )}
                      </div>

                      <div style={{ fontSize: '0.86rem', fontWeight: 800, color: isSelected ? '#f8fafc' : '#cbd5e1', marginBottom: '0.25rem' }}>
                        {track.title}
                      </div>

                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {track.description}
                      </div>

                      <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.45rem' }}>
                        <span style={{ fontSize: '0.65rem', color: '#64748b' }}>
                          {track.chapterNumbers.length} Chapters • {trackChaps.reduce((acc, c) => acc + c.subModules.length, 0)} Modules
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* ================= RIGHT MAIN STAGE: CHAPTER WORKSPACE ================= */}
          <main
            style={{
              flex: 1,
              height: '100%',
              overflowY: 'auto',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              background: '#040711',
            }}
          >
            {/* Spotlight Banner for Active Track */}
            <div
              style={{
                borderRadius: '16px',
                background: `linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(${parseInt(activeTrack.color.slice(1, 3), 16)}, ${parseInt(activeTrack.color.slice(3, 5), 16)}, ${parseInt(activeTrack.color.slice(5, 7), 16)}, 0.1) 100%)`,
                border: `1px solid ${activeTrack.color}40`,
                padding: '1.5rem 1.75rem',
                boxShadow: `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 25px ${activeTrack.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ maxWidth: '680px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: activeTrack.color,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    ACTIVE TRACK {activeTrack.trackNumber} OF 10
                  </span>
                  <span style={{ color: '#64748b' }}>•</span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    {activeTrackChapters.length} Master Chapters
                  </span>
                </div>

                <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: 900, color: '#f8fafc' }}>
                  {activeTrack.title}
                </h2>

                <p style={{ margin: 0, fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                  {activeTrack.description}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: activeTrack.color }}>
                    {activeTrackChapters.reduce((acc, c) => acc + c.subModules.length, 0)}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>
                    Modules
                  </div>
                </div>

                <div
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#10b981' }}>
                    {activeTrackChapters.filter((c) => c.status === 'live').length}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>
                    Live Simulators
                  </div>
                </div>
              </div>
            </div>

            {/* Chapters Grid within Track */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>
                  Chapters in this Track ({activeTrackChapters.length})
                </h3>
                <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                  Click chapter to expand topics or launch interactive academy
                </span>
              </div>

              {activeTrackChapters.map((ch) => {
                const isExpanded = !!expandedChapterIds[ch.id];
                const isLive = ch.status === 'live';

                return (
                  <div
                    key={ch.id}
                    style={{
                      borderRadius: '14px',
                      background: isLive ? 'rgba(15, 23, 42, 0.75)' : 'rgba(15, 23, 42, 0.5)',
                      border: isLive ? '1.5px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: isLive ? '0 10px 30px rgba(56, 189, 248, 0.08)' : 'none',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {/* Chapter Card Header */}
                    <div
                      style={{
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        background: isExpanded ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, minWidth: '300px' }}>
                        <button
                          onClick={() => toggleChapter(ch.id)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.06)',
                            border: 'none',
                            color: '#94a3b8',
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            marginTop: '2px',
                          }}
                        >
                          {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </button>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                            <span
                              style={{
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                color: activeTrack.color,
                                fontFamily: 'monospace',
                              }}
                            >
                              {ch.chapterCode}
                            </span>
                            <span style={{ color: '#475569' }}>•</span>
                            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                              Chapter {ch.number} of 29
                            </span>
                            {isLive && (
                              <span
                                style={{
                                  fontSize: '0.66rem',
                                  fontWeight: 800,
                                  padding: '0.12rem 0.5rem',
                                  borderRadius: '999px',
                                  background: 'rgba(16, 185, 129, 0.15)',
                                  border: '1px solid rgba(16, 185, 129, 0.35)',
                                  color: '#34d399',
                                }}
                              >
                                ● LIVE SIMULATOR READY
                              </span>
                            )}
                          </div>

                          <h4 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                            {ch.title}
                          </h4>

                          <p style={{ margin: '0 0 0.65rem', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                            {ch.summary}
                          </p>

                          {/* Tech Pills */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                            {ch.targetTech.map((tech) => (
                              <span
                                key={tech}
                                style={{
                                  fontSize: '0.68rem',
                                  fontWeight: 600,
                                  padding: '0.15rem 0.45rem',
                                  borderRadius: '6px',
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  color: '#cbd5e1',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Launch / Action Area */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        {isLive && ch.liveAction ? (
                          <button
                            onClick={() => handleLaunchLive(ch.liveAction)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.45rem',
                              padding: '0.6rem 1.15rem',
                              borderRadius: '9px',
                              border: 'none',
                              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                              color: '#fff',
                              fontSize: '0.8rem',
                              fontWeight: 800,
                              cursor: 'pointer',
                              boxShadow: '0 4px 15px rgba(14, 165, 233, 0.4)',
                            }}
                          >
                            <Play size={14} fill="#fff" />
                            <span>{ch.liveAction.label}</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setInspectedChapter(ch)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              padding: '0.55rem 0.95rem',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.12)',
                              background: 'rgba(255, 255, 255, 0.04)',
                              color: '#cbd5e1',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            <Eye size={13} />
                            <span>Inspect Syllabus</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Submodules Accordion Content */}
                    {isExpanded && (
                      <div
                        style={{
                          padding: '1.25rem 1.5rem',
                          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                          background: 'rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                            Submodules & Curated Topics ({ch.subModules.length})
                          </span>
                          <button
                            onClick={() => setInspectedChapter(ch)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#38bdf8',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            Open Detailed Syllabus Modal →
                          </button>
                        </div>

                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '0.85rem',
                          }}
                        >
                          {ch.subModules.map((sm) => (
                            <div
                              key={sm.id}
                              style={{
                                borderRadius: '10px',
                                background: 'rgba(15, 23, 42, 0.6)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                padding: '0.85rem 1rem',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.45rem' }}>
                                <span
                                  style={{
                                    fontSize: '0.68rem',
                                    fontWeight: 800,
                                    color: activeTrack.color,
                                    background: 'rgba(255, 255, 255, 0.06)',
                                    padding: '0.1rem 0.4rem',
                                    borderRadius: '4px',
                                    fontFamily: 'monospace',
                                  }}
                                >
                                  {sm.code}
                                </span>
                                <h5 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#f1f5f9' }}>
                                  {sm.title}
                                </h5>
                              </div>

                              <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.76rem', color: '#94a3b8', lineHeight: 1.5 }}>
                                {sm.topics.slice(0, 4).map((top, tIdx) => (
                                  <li key={tIdx}>{top}</li>
                                ))}
                                {sm.topics.length > 4 && (
                                  <li style={{ color: activeTrack.color }}>+{sm.topics.length - 4} more topics...</li>
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      )}

      {/* ================================================================ */}
      {/* 4. PIPELINE VIEW: END-TO-END DEVOPS LIFECYCLE FLOW               */}
      {/* ================================================================ */}
      {viewMode === 'pipeline' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', background: '#040711' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 0.5rem', color: '#f8fafc' }}>
                End-to-End DevOps & Cloud Engineering Pipeline
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto' }}>
                The real-world production lifecycle: every single commit moves through automated container packaging, declarative infrastructure, orchestrators, and 24/7 observability.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {PIPELINE_STAGES.map((stage, idx) => {
                const StageIcon = stage.icon;
                const relatedTrack = DEVOPS_10_TRACKS.find((t) => t.id === stage.trackId);
                const relatedChapters = DEVOPS_29_CHAPTERS.filter((ch) => relatedTrack?.chapterNumbers.includes(ch.number));

                return (
                  <div
                    key={stage.id}
                    style={{
                      borderRadius: '16px',
                      background: 'rgba(15, 23, 42, 0.7)',
                      border: `1px solid ${stage.color}40`,
                      padding: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1.25rem',
                      boxShadow: `0 8px 30px rgba(0, 0, 0, 0.3), 0 0 20px ${stage.color}10`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '14px',
                          background: `rgba(${parseInt(stage.color.slice(1, 3), 16)}, ${parseInt(stage.color.slice(3, 5), 16)}, ${parseInt(stage.color.slice(5, 7), 16)}, 0.18)`,
                          border: `1px solid ${stage.color}50`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: stage.color,
                        }}
                      >
                        <StageIcon size={26} />
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: stage.color, textTransform: 'uppercase' }}>
                            STAGE {idx + 1}
                          </span>
                          <span style={{ color: '#475569' }}>•</span>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                            {relatedTrack?.title}
                          </span>
                        </div>

                        <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                          {stage.name}
                        </h3>

                        <p style={{ margin: 0, fontSize: '0.84rem', color: '#cbd5e1' }}>
                          {stage.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Tools and Action */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {stage.tools.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              padding: '0.2rem 0.55rem',
                              borderRadius: '6px',
                              background: 'rgba(255, 255, 255, 0.06)',
                              color: stage.color,
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setActiveTrackId(stage.trackId);
                          setViewMode('command-center');
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          padding: '0.55rem 1rem',
                          borderRadius: '8px',
                          border: `1px solid ${stage.color}60`,
                          background: `rgba(${parseInt(stage.color.slice(1, 3), 16)}, ${parseInt(stage.color.slice(3, 5), 16)}, ${parseInt(stage.color.slice(5, 7), 16)}, 0.15)`,
                          color: stage.color,
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        <span>Explore Chapters ({relatedChapters.length})</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 5. MATRIX VIEW: ALL 29 CHAPTERS SEARCHABLE CATALOG               */}
      {/* ================================================================ */}
      {viewMode === 'matrix' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 2rem', background: '#040711' }}>
          <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Filter Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                background: 'rgba(15, 23, 42, 0.7)',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '260px' }}>
                <Search size={16} color="#38bdf8" />
                <input
                  type="text"
                  placeholder="Filter all 29 chapters by tech, keyword, or module..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#f8fafc',
                    fontSize: '0.85rem',
                    flex: 1,
                  }}
                />
              </div>

              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Showing <strong>{filteredChapters.length}</strong> of {TOTAL_DEVOPS_CHAPTERS} Chapters
              </div>
            </div>

            {/* Chapters Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                gap: '1rem',
              }}
            >
              {filteredChapters.map((ch) => {
                const isLive = ch.status === 'live';

                return (
                  <div
                    key={ch.id}
                    style={{
                      borderRadius: '14px',
                      background: 'rgba(15, 23, 42, 0.65)',
                      border: isLive ? '1.5px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'monospace' }}>
                          {ch.chapterCode}
                        </span>
                        {isLive && (
                          <span
                            style={{
                              fontSize: '0.65rem',
                              fontWeight: 800,
                              color: '#34d399',
                              background: 'rgba(16, 185, 129, 0.15)',
                              padding: '0.1rem 0.45rem',
                              borderRadius: '999px',
                            }}
                          >
                            ● LIVE ACADEMY
                          </span>
                        )}
                      </div>

                      <h4 style={{ margin: '0 0 0.35rem', fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>
                        {ch.title}
                      </h4>

                      <p style={{ margin: '0 0 0.75rem', fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.45 }}>
                        {ch.summary}
                      </p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {ch.targetTech.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            style={{
                              fontSize: '0.65rem',
                              padding: '0.15rem 0.4rem',
                              borderRadius: '4px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: '#cbd5e1',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.65rem' }}>
                      <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                        {ch.subModules.length} Submodules
                      </span>

                      {isLive && ch.liveAction ? (
                        <button
                          onClick={() => handleLaunchLive(ch.liveAction)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '7px',
                            background: '#0ea5e9',
                            color: '#fff',
                            border: 'none',
                            fontSize: '0.76rem',
                            fontWeight: 800,
                            cursor: 'pointer',
                          }}
                        >
                          <span>{ch.liveAction.label}</span>
                          <Play size={12} fill="#fff" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setInspectedChapter(ch)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#38bdf8',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          View Syllabus →
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* 5.5 CAPSTONE PROJECTS SYSTEM                                    */}
      {/* ================================================================ */}
      {viewMode === 'capstones' && (
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <StandardCapstoneHubView initialAcademy="devops" />
        </div>
      )}

      {/* ================================================================ */}
      {/* 6. MODAL: DETAILED CHAPTER SYLLABUS INSPECTOR                    */}
      {/* ================================================================ */}
      {inspectedChapter && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 10, 20, 0.8)',
            backdropFilter: 'blur(8px)',
            padding: '1rem',
          }}
          onClick={() => setInspectedChapter(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '780px',
              maxHeight: '85vh',
              background: '#0d131f',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '16px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(56, 189, 248, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              color: '#e2e8f0',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(15, 23, 42, 0.8)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'monospace' }}>
                    {inspectedChapter.chapterCode}
                  </span>
                  <span style={{ color: '#64748b' }}>•</span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    {inspectedChapter.trackName}
                  </span>
                </div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                  {inspectedChapter.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectedChapter(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                {inspectedChapter.summary}
              </p>

              <div>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                  Target Production Technologies:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                  {inspectedChapter.targetTech.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        background: 'rgba(56, 189, 248, 0.1)',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        color: '#38bdf8',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#f8fafc', textTransform: 'uppercase' }}>
                  Detailed Curriculum Submodules ({inspectedChapter.subModules.length}):
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  {inspectedChapter.subModules.map((sm) => (
                    <div
                      key={sm.id}
                      style={{
                        borderRadius: '10px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        padding: '0.85rem 1rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            color: '#06b6d4',
                            background: 'rgba(6, 182, 212, 0.12)',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                          }}
                        >
                          {sm.code}
                        </span>
                        <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f1f5f9' }}>
                          {sm.title}
                        </span>
                      </div>

                      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5 }}>
                        {sm.topics.map((top, tIdx) => (
                          <li key={tIdx}>{top}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            {inspectedChapter.status === 'live' && inspectedChapter.liveAction && (
              <div
                style={{
                  padding: '1rem 1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'rgba(15, 23, 42, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Interactive live simulator available for this chapter
                </span>
                <button
                  onClick={() => {
                    handleLaunchLive(inspectedChapter.liveAction);
                    setInspectedChapter(null);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.55rem 1.15rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#0ea5e9',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  <span>Launch Live Simulator</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
