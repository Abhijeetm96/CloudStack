import React, { useState, useEffect } from 'react';
import {
  Boxes,
  ChevronDown,
  Flame,
  Container,
  Compass,
  Sparkles,
  Search,
  CheckCircle2,
  LucideIcon,
  Sun,
  Moon,
  Activity,
  Layers,
  Database,
  Terminal,
  BookOpen,
} from 'lucide-react';
import { ViewMode } from '../../context/AppContext';

export interface StandardAcademyNavTab {
  id: string;
  label: string;
  isUniverse?: boolean;
  conceptCount?: number;
  icon?: LucideIcon;
}

export interface StandardAcademyHeaderNavProps {
  academyId: 'git' | 'docker' | 'kubernetes' | string;
  brandTitle: string;
  brandTagline: string;
  brandIcon: LucideIcon;
  brandGradient?: string;
  brandColor?: string;
  activeMode: string;
  onSelectMode: (mode: string) => void;
  onSwitchToSuite?: (mode: ViewMode) => void;
  universeConceptCount?: number;
  statusPill?: {
    label: string;
    dotColor?: string;
  };
  masteredPill?: {
    count: number;
    total: number;
  };
  onOpenProblemSearch?: () => void;
  tabs?: StandardAcademyNavTab[];
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const StandardAcademyHeaderNav: React.FC<StandardAcademyHeaderNavProps> = ({
  academyId,
  brandTitle,
  brandTagline,
  brandIcon: BrandIcon,
  brandGradient = 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
  brandColor = '#38bdf8',
  activeMode,
  onSelectMode,
  onSwitchToSuite,
  universeConceptCount,
  statusPill,
  masteredPill,
  onOpenProblemSearch,
  tabs,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [showSuiteMenu, setShowSuiteMenu] = useState(false);

  useEffect(() => {
    const handleGlobalClick = () => setShowSuiteMenu(false);
    if (showSuiteMenu) {
      window.addEventListener('click', handleGlobalClick);
      return () => window.removeEventListener('click', handleGlobalClick);
    }
  }, [showSuiteMenu]);

  // Default standard 6 tabs if not customized
  const standardTabs: StandardAcademyNavTab[] = tabs || [
    { id: 'learn', label: 'Learn' },
    ...(universeConceptCount
      ? [
          {
            id: 'universe',
            label: `${universeConceptCount} Concepts`,
            isUniverse: true,
            conceptCount: universeConceptCount,
          },
        ]
      : []),
    { id: 'practice', label: 'Practice' },
    { id: 'labs', label: 'Labs' },
    { id: 'ide', label: 'IDE' },
    { id: 'reference', label: 'Reference' },
  ];

  return (
    <header
      className="header-nav standard-academy-header"
      style={{
        height: '60px',
        minHeight: '60px',
        maxHeight: '60px',
        flexShrink: 0,
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        position: 'sticky',
        top: 0,
        zIndex: 60,
        maxWidth: '100vw',
        boxSizing: 'border-box',
      }}
    >
      {/* ================================================================ */}
      {/* LEFT: BRAND & SUITE SWITCHER                                    */}
      {/* ================================================================ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
        {/* Quick Return to CloudStack Portal */}
        {onSwitchToSuite && (
          <button
            onClick={() => onSwitchToSuite('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.55rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              color: '#cbd5e1',
              fontSize: '0.74rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#38bdf8';
              e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#cbd5e1';
              e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
            }}
            title="Return to CloudStack Portal"
          >
            <Boxes size={13} color="#38bdf8" />
            <span className="header-lost-label">Suite Home</span>
          </button>
        )}

        {/* Brand Logo & Tagline */}
        <div
          onClick={() => onSelectMode('learn')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: brandGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: `0 2px 10px ${brandColor}55`,
              flexShrink: 0,
            }}
          >
            <BrandIcon size={18} />
          </div>
          <div>
            <div
              style={{
                fontSize: '1.05rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#f8fafc',
                lineHeight: 1.1,
              }}
            >
              {brandTitle}
            </div>
            <div
              className="header-tagline"
              style={{
                fontSize: '0.62rem',
                fontWeight: 600,
                color: brandColor,
                letterSpacing: '0.02em',
              }}
            >
              {brandTagline}
            </div>
          </div>
        </div>

        {/* Suite Switcher Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowSuiteMenu(!showSuiteMenu);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.28rem 0.55rem',
              borderRadius: '8px',
              background: showSuiteMenu ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              color: '#cbd5e1',
              fontSize: '0.74rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title="Switch Academy (CloudStack)"
          >
            <Boxes size={13} color="#38bdf8" />
            <span>Suite</span>
            <ChevronDown size={12} />
          </button>

          {showSuiteMenu && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: '36px',
                left: 0,
                width: '280px',
                background: 'rgba(15, 23, 42, 0.98)',
                border: '1px solid rgba(148, 163, 184, 0.25)',
                borderRadius: '12px',
                padding: '0.75rem',
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(16px)',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '0 0.25rem',
                }}
              >
                CloudStack Academies
              </div>

              {/* Item 0: DevOps Master Academy */}
              <button
                onClick={() => {
                  setShowSuiteMenu(false);
                  onSwitchToSuite?.('devops');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.5rem 0.65rem',
                  borderRadius: '8px',
                  background: 'rgba(168, 85, 247, 0.12)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <BookOpen size={14} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>DevOps Academy</div>
                  <div style={{ fontSize: '0.68rem', color: '#c084fc' }}>Master 29-Chapter Syllabus</div>
                </div>
              </button>

              {/* Item 1: Git Academy */}
              <button
                onClick={() => {
                  setShowSuiteMenu(false);
                  onSwitchToSuite?.('learn');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.5rem 0.65rem',
                  borderRadius: '8px',
                  background: academyId === 'git' ? 'rgba(240, 80, 51, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: academyId === 'git' ? '1px solid rgba(240, 80, 51, 0.35)' : '1px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #f05033, #ea580c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <Flame size={14} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Git Academy</div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Git &amp; Version Control</div>
                </div>
                {academyId === 'git' && (
                  <div style={{ fontSize: '0.65rem', color: '#4ade80', fontWeight: 700 }}>Active</div>
                )}
              </button>

              {/* Item 2: Docker Academy */}
              <button
                onClick={() => {
                  setShowSuiteMenu(false);
                  onSwitchToSuite?.('docker');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.5rem 0.65rem',
                  borderRadius: '8px',
                  background: academyId === 'docker' ? 'rgba(14, 165, 233, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: academyId === 'docker' ? '1px solid rgba(14, 165, 233, 0.35)' : '1px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <Container size={14} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Docker Academy</div>
                  <div style={{ fontSize: '0.68rem', color: '#38bdf8' }}>Docker &amp; Containers</div>
                </div>
                {academyId === 'docker' && (
                  <div style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: 700 }}>Active</div>
                )}
              </button>

              {/* Item 3: Kubernetes Academy */}
              <button
                onClick={() => {
                  setShowSuiteMenu(false);
                  onSwitchToSuite?.('kubernetes');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.5rem 0.65rem',
                  borderRadius: '8px',
                  background: academyId === 'kubernetes' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: academyId === 'kubernetes' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <Compass size={14} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Kubernetes Academy</div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Kubernetes Academy</div>
                </div>
                {academyId === 'kubernetes' && (
                  <div style={{ fontSize: '0.65rem', color: '#4ade80', fontWeight: 700 }}>Active</div>
                )}
              </button>

              {/* Item 4: LinuxForge */}
              <button
                onClick={() => {
                  setShowSuiteMenu(false);
                  onSwitchToSuite?.('linuxforge');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.5rem 0.65rem',
                  borderRadius: '8px',
                  background: academyId === 'linuxforge' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: academyId === 'linuxforge' ? '1px solid rgba(6, 182, 212, 0.35)' : '1px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <Terminal size={14} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>LinuxForge</div>
                  <div style={{ fontSize: '0.68rem', color: '#06b6d4' }}>Systems, Kernel &amp; SRE</div>
                </div>
                {academyId === 'linuxforge' && (
                  <div style={{ fontSize: '0.65rem', color: '#06b6d4', fontWeight: 700 }}>Active</div>
                )}
              </button>

              <div style={{ height: '1px', background: 'rgba(148, 163, 184, 0.15)', margin: '0.15rem 0' }} />

              {/* CloudStack Home Portal */}
              <button
                onClick={() => {
                  setShowSuiteMenu(false);
                  onSwitchToSuite?.('home');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.5rem 0.65rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    background: 'rgba(56, 189, 248, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38bdf8',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={14} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>CloudStack Portal</div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Unified platform gateway</div>
                </div>
              </button>

              {/* DevOps & Cloud Roadmap */}
              <button
                onClick={() => {
                  setShowSuiteMenu(false);
                  onSwitchToSuite?.('roadmap');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.5rem 0.65rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    background: 'rgba(234, 179, 8, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#facc15',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={14} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>DevOps Roadmap</div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>9-stage engineering path</div>
                </div>
              </button>

              <div style={{ height: '1px', background: 'rgba(148, 163, 184, 0.15)', margin: '0.2rem 0' }} />
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '0 0.25rem',
                }}
              >
                Coming Soon (DevOps Roadmap)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem' }}>
                {[
                  { name: 'HelmCraft', tag: 'Helm & Charts', color: '#0ea5e9' },
                  { name: 'PipelinePilot', tag: 'CI/CD & Actions', color: '#f59e0b' },
                  { name: 'TerraStack', tag: 'Terraform & IaC', color: '#a855f7' },
                  { name: 'ObserveIQ', tag: 'Prometheus & SRE', color: '#10b981' },
                  { name: 'DevSecShield', tag: 'DevSecOps & Vault', color: '#f43f5e' },
                  { name: 'LinuxCore', tag: 'Linux Kernel', color: '#06b6d4' },
                ].map((item) => (
                  <div
                    key={item.name}
                    onClick={() => {
                      setShowSuiteMenu(false);
                      onSwitchToSuite?.('home');
                    }}
                    style={{
                      padding: '0.35rem 0.5rem',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      cursor: 'pointer',
                    }}
                    title={`${item.name} (${item.tag}) - Coming Soon! Click to view on Home`}
                  >
                    <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#cbd5e1' }}>{item.name}</div>
                    <div style={{ fontSize: '0.62rem', color: item.color }}>{item.tag}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================================================================ */}
      {/* CENTER: STANDARDIZED NAVIGATION TABS (Git Academy Identical)   */}
      {/* ================================================================ */}
      <nav className="header-nav-tabs" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        {standardTabs.map((tab) => {
          const isActive =
            activeMode === tab.id ||
            (tab.id === 'learn' &&
              ['learn', 'academy', 'first10', 'dashboard', 'visualize', 'community'].includes(activeMode)) ||
            (tab.id === 'labs' &&
              ['labs', 'break-it', 'undo-lab', 'conflict-arena', 'hospital', 'two-dev', 'capstone', 'config-lab', 'discover'].includes(activeMode));

          if (tab.isUniverse) {
            return (
              <button
                key={tab.id}
                onClick={() => onSelectMode(tab.id)}
                style={{
                  background: isActive ? 'rgba(245, 158, 11, 0.14)' : 'none',
                  border: isActive ? '1px solid rgba(245, 158, 11, 0.35)' : '1px solid transparent',
                  color: isActive ? '#f59e0b' : '#94a3b8',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 800 : 600,
                  padding: '0.4rem 0.75rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.15s ease',
                }}
                title={`Explore all ${tab.conceptCount || ''} concepts in the Universe curriculum catalog`}
              >
                <Sparkles size={13} color={isActive ? '#f59e0b' : '#94a3b8'} />
                <span>{tab.label}</span>
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: '15%',
                      right: '15%',
                      height: '2px',
                      background: '#f59e0b',
                      borderRadius: '999px',
                      boxShadow: '0 0 8px #f59e0b',
                    }}
                  />
                )}
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => onSelectMode(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                color: isActive ? '#38bdf8' : '#94a3b8',
                fontSize: '0.86rem',
                fontWeight: isActive ? 800 : 600,
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '20%',
                    right: '20%',
                    height: '2px',
                    background: '#38bdf8',
                    borderRadius: '999px',
                    boxShadow: '0 0 8px #38bdf8',
                  }}
                />
              )}
            </button>
          );
        })}

        {/* Universal Problem Solver Trigger Button */}
        {onOpenProblemSearch && (
          <button
            onClick={onOpenProblemSearch}
            style={{
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              color: '#38bdf8',
              fontSize: '0.82rem',
              fontWeight: 700,
              padding: '0.38rem 0.75rem',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.15s ease',
              marginLeft: '0.35rem',
            }}
            title="Open Natural-Language Problem Solver (⌘K)"
          >
            <Search size={13} color="#38bdf8" />
            <span>Problem Solver</span>
            <kbd
              style={{
                background: 'rgba(56, 189, 248, 0.18)',
                border: '1px solid rgba(56, 189, 248, 0.28)',
                borderRadius: '4px',
                padding: '0.1rem 0.35rem',
                fontSize: '0.65rem',
                fontFamily: 'monospace',
                color: '#e0f2fe',
              }}
            >
              ⌘K
            </kbd>
          </button>
        )}
      </nav>

      {/* ================================================================ */}
      {/* RIGHT: LIVE STATUS, MASTERY PILL, THEME TOGGLE & AVATAR         */}
      {/* ================================================================ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexShrink: 0 }}>
        {/* Status Pill */}
        {statusPill && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.28rem 0.65rem',
              borderRadius: '999px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#4ade80',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: statusPill.dotColor || '#22c55e',
                boxShadow: `0 0 6px ${statusPill.dotColor || '#22c55e'}`,
              }}
            />
            <span className="header-lost-label">{statusPill.label}</span>
          </div>
        )}

        {/* Mastered Count Pill */}
        {masteredPill && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.74rem',
              color: 'var(--text-secondary)',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              padding: '0.28rem 0.65rem',
              borderRadius: '8px',
              fontWeight: 600,
            }}
          >
            <CheckCircle2 size={13} color="#22c55e" />
            <span className="header-lost-label">
              {masteredPill.count}/{masteredPill.total} Mastered
            </span>
          </div>
        )}

        {/* Theme Toggle Button */}
        {onToggleTheme && (
          <button
            onClick={onToggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              color: '#cbd5e1',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'dark' ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} color="#38bdf8" />}
          </button>
        )}

        {/* Profile Avatar */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: brandGradient,
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 2px 8px ${brandColor}40`,
            cursor: 'default',
            userSelect: 'none',
          }}
          title="Active Engineer Workspace"
        >
          {brandTitle.charAt(0)}
        </div>
      </div>
    </header>
  );
};
