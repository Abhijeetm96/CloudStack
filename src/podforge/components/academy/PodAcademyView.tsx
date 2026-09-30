import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { KUBE_CHAPTERS } from '../../data/topics';
import { getConceptIcon, getChapterIcon } from './podIcons';
import { PodConceptOverviewTab } from './PodConceptOverviewTab';
import { PodYamlSpecTab } from './PodYamlSpecTab';
import { PodPracticeTab } from './PodPracticeTab';
import { PodVisualizerTab } from './PodVisualizerTab';
import { PodPitfallsTab } from './PodPitfallsTab';
import { PodQuizTab } from './PodQuizTab';
import { KubeFlowDiagram } from '../diagrams/KubeFlowDiagram';
import {
  StandardAcademySidebar,
  StandardTopicItem,
} from '../../../platform/layout/StandardAcademySidebar';
import { StandardAcademyBottomBar } from '../../../platform/layout/StandardAcademyBottomBar';
import {
  BookOpen,
  Activity,
  Code2,
  FileCode,
  CheckCircle2,
  ChevronRight,
  Boxes,
  Flame,
  AlertTriangle,
  Award,
  Workflow,
  Compass,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

import { ViewMode } from '../../../context/AppContext';
import { conceptRequiresVisualizer } from '../../data/topics/visualizerScope';

type AcademyTab = 'learn' | 'diagram' | 'spec' | 'practice' | 'visualize' | 'pitfalls' | 'quiz';

interface PodAcademyViewProps {
  onSwitchToSuite?: (mode: ViewMode) => void;
}

export const PodAcademyView: React.FC<PodAcademyViewProps> = ({ onSwitchToSuite }) => {
  const { activeConcept, setActiveConceptId, completedConcepts, markConceptComplete, setMode } = useApp();
  const [activeTab, setActiveTab] = useState<AcademyTab>('learn');
  const [showMobileTopicsDrawer, setShowMobileTopicsDrawer] = useState<boolean>(false);

  const currentChapter = KUBE_CHAPTERS.find((ch) => ch.concepts.some((c) => c.id === activeConcept.id));

  // Determine if this concept requires/supports an interactive visualizer or simulator
  const hasVisualizer = useMemo(() => conceptRequiresVisualizer(activeConcept), [activeConcept]);

  // Derived effective tab - fallback to learn if current concept has no visualizer
  const currentTab = activeTab === 'visualize' && !hasVisualizer ? 'learn' : activeTab;

  // Flatten all concepts for linear previous / next navigation
  const allConcepts = useMemo(() => KUBE_CHAPTERS.flatMap((ch) => ch.concepts), []);
  const currentIndex = allConcepts.findIndex((c) => c.id === activeConcept.id);
  const prevConcept = currentIndex > 0 ? allConcepts[currentIndex - 1] : null;
  const nextConcept = currentIndex < allConcepts.length - 1 ? allConcepts[currentIndex + 1] : null;

  const isCompleted = completedConcepts.includes(activeConcept.id);

  // Map KUBE_CHAPTERS to StandardTopicItem for StandardAcademySidebar
  const sidebarTopics: StandardTopicItem[] = useMemo(() => {
    return KUBE_CHAPTERS.map((ch) => {
      const IconComponent = getChapterIcon(ch.number);
      return {
        id: ch.id,
        number: String(ch.number).padStart(2, '0'),
        title: ch.title,
        icon: IconComponent,
        concepts: ch.concepts.map((c) => ({
          id: c.id,
          command: c.commandPill || `kubectl get ${c.id.replace('c-k8s-', '')}`,
          title: c.title,
          shortDesc: c.description,
          icon: getConceptIcon(c.id),
        })),
      };
    });
  }, []);

  const handleSelectConcept = (conceptId: string) => {
    setActiveConceptId(conceptId);
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        minHeight: 0,
        background: 'var(--bg-app)',
        color: 'var(--text-primary)',
        overflow: 'hidden',
      }}
    >
      {/* ================================================================ */}
      {/* COLUMN 1: LEFT SIDEBAR (Standard 240px Accordion Sidebar)       */}
      {/* ================================================================ */}
      <aside
        className="academy-sidebar-desktop"
        style={{
          width: '240px',
          minWidth: '240px',
          maxWidth: '240px',
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '100%',
          minHeight: 0,
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <StandardAcademySidebar
          title="PodForge Academy"
          subtitle={`${KUBE_CHAPTERS.length} Chapters • Your K8s Journey`}
          icon={Compass}
          accentColor="#60a5fa"
          topics={sidebarTopics}
          activeConceptId={activeConcept.id}
          completedConceptIds={completedConcepts}
          onSelectConcept={handleSelectConcept}
        />
      </aside>

      {/* ================================================================ */}
      {/* COLUMN 2: CENTER PANEL (Learning & Practice Experience)          */}
      {/* ================================================================ */}
      <main
        className="academy-center-main"
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '100%',
          overflow: 'hidden',
          background: 'var(--bg-app)',
        }}
      >
        {/* Mobile & Tablet Top Bar (<1200px) */}
        <div
          className="academy-mobile-topbar"
          style={{
            flexShrink: 0,
            padding: '0.5rem 0.85rem',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          {/* Topics Drawer Toggle */}
          <button
            onClick={() => setShowMobileTopicsDrawer(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '8px',
              padding: '0.35rem 0.65rem',
              color: '#38bdf8',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              maxWidth: '65%',
            }}
          >
            <Compass size={15} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Chapters ({KUBE_CHAPTERS.length}) • {activeConcept.title}
            </span>
            <ChevronDown size={13} />
          </button>

          {/* Quick Universe Catalog Shortcut on Mobile */}
          <button
            onClick={() => setMode('universe')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '8px',
              padding: '0.35rem 0.65rem',
              color: '#f59e0b',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Sparkles size={13} />
            <span>71 Concepts</span>
          </button>
        </div>

        {/* Scrollable Center Body */}
        <div
          style={{
            flex: '1 1 0%',
            overflowY: 'auto',
            padding: '1.25rem 2rem 5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            boxSizing: 'border-box',
          }}
        >
          {/* Interactive Routed Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.8rem',
              color: '#64748b',
              flexWrap: 'wrap',
            }}
          >
            {/* Breadcrumb 1: Forge Suite Portal */}
            <button
              type="button"
              onClick={() => onSwitchToSuite?.('home')}
              title="Navigate to Forge Suite Homepage"
              style={{
                background: 'transparent',
                border: 'none',
                padding: '0.2rem 0.4rem',
                borderRadius: '6px',
                color: '#94a3b8',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Flame size={13} color="#f05033" />
              <span>Forge Suite</span>
            </button>

            <ChevronRight size={12} color="#475569" />

            {/* Breadcrumb 2: PodForge Academy */}
            <button
              type="button"
              onClick={() => {
                setActiveConceptId('c-k8s-overview');
                setActiveTab('learn');
              }}
              title="Return to PodForge Academy"
              style={{
                background: 'transparent',
                border: 'none',
                padding: '0.2rem 0.4rem',
                borderRadius: '6px',
                color: '#cbd5e1',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#38bdf8';
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#cbd5e1';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Boxes size={13} color="#38bdf8" />
              <span>PodForge Academy</span>
            </button>

            <ChevronRight size={12} color="#475569" />

            {/* Breadcrumb 3: Chapter */}
            {currentChapter && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    if (currentChapter.concepts[0]) {
                      setActiveConceptId(currentChapter.concepts[0].id);
                      setActiveTab('learn');
                    }
                  }}
                  title={`Jump to ${currentChapter.title}`}
                  style={{
                    background: 'transparent',
                    border: '1px solid transparent',
                    padding: '0.2rem 0.45rem',
                    borderRadius: '6px',
                    color: '#cbd5e1',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#38bdf8';
                    e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#cbd5e1';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {React.createElement(getChapterIcon(currentChapter.number), { size: 13, color: '#38bdf8' })}
                  <span>{currentChapter.title}</span>
                </button>

                <ChevronRight size={12} color="#475569" />
              </>
            )}

            {/* Breadcrumb 4: Current Concept Active Pill */}
            <span
              style={{
                background: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                color: '#38bdf8',
                fontSize: '0.78rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 0 8px rgba(56, 189, 248, 0.2)',
              }}
            >
              {React.createElement(getConceptIcon(activeConcept.id), { size: 13, color: '#38bdf8' })}
              <span>{activeConcept.number} {activeConcept.title}</span>
            </span>
          </nav>

          {/* Concept Hero Header Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(9, 14, 26, 0.9) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1.35rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#60a5fa', background: 'rgba(50, 108, 229, 0.15)', border: '1px solid rgba(50, 108, 229, 0.3)', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                  {activeConcept.badge}
                </span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
                  {activeConcept.difficulty}
                </span>
              </div>

              <button
                onClick={() => markConceptComplete(activeConcept.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  background: isCompleted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  border: isCompleted ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '0.4rem 0.85rem',
                  color: isCompleted ? '#10b981' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <CheckCircle2 size={14} color={isCompleted ? '#10b981' : 'var(--text-muted)'} />
                <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
              </button>
            </div>

            {/* Concept Hero with Thematic Icon */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.15rem' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '13px',
                  background: 'linear-gradient(135deg, rgba(50, 108, 229, 0.35) 0%, rgba(56, 189, 248, 0.2) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8',
                  boxShadow: '0 6px 20px rgba(50, 108, 229, 0.3)',
                  flexShrink: 0,
                }}
              >
                {React.createElement(getConceptIcon(activeConcept.id), { size: 26 })}
              </div>

              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
                  {activeConcept.number} {activeConcept.title}
                </h1>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '0.35rem 0 0 0', lineHeight: 1.55 }}>
                  {activeConcept.description}
                </p>
              </div>
            </div>

            {/* Target Commands Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)' }}>Target CLI:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                $ {activeConcept.commandPill}
              </span>
            </div>

            {/* Docker Bridge (Chapters 1 & 2) */}
            {(currentChapter?.number === 1 || currentChapter?.number === 2) && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(50, 108, 229, 0.08) 100%)',
                  border: '1px solid rgba(14, 165, 233, 0.3)',
                  borderRadius: '10px',
                  padding: '0.65rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.65rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', background: 'rgba(14, 165, 233, 0.2)', padding: '0.15rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                    Docker &rarr; K8s Bridge
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    In Docker, containers run standalone via <code style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>docker run</code>. In Kubernetes, they reside inside <strong>Pods</strong> sharing networking and storage volumes.
                  </span>
                </div>

                {onSwitchToSuite && (
                  <button
                    onClick={() => onSwitchToSuite('dockforge')}
                    style={{
                      background: 'rgba(14, 165, 233, 0.15)',
                      border: '1px solid rgba(14, 165, 233, 0.35)',
                      color: '#38bdf8',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>DockForge Docker Academy</span>
                    <ChevronRight size={12} />
                  </button>
                )}
              </div>
            )}

            {/* Sub-Tabs Navigation Strip with Glowing Underline */}
            <div
              className="academy-subtabs-bar"
              style={{
                display: 'flex',
                gap: '0.4rem',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '0.85rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { id: 'learn' as AcademyTab, label: 'Concept Overview', icon: BookOpen },
                { id: 'diagram' as AcademyTab, label: 'Block & Flow Diagram', icon: Workflow },
                { id: 'spec' as AcademyTab, label: 'Declarative YAML', icon: FileCode },
                { id: 'practice' as AcademyTab, label: 'Terminal Sandbox', icon: Code2 },
                ...(hasVisualizer
                  ? [{ id: 'visualize' as AcademyTab, label: 'Live Visualizer', icon: Activity }]
                  : []),
                { id: 'pitfalls' as AcademyTab, label: 'Pitfalls & SRE', icon: AlertTriangle },
                { id: 'quiz' as AcademyTab, label: 'Scenario Quiz', icon: Award },
              ].map((tab) => {
                const isActive = currentTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '6px',
                      fontSize: '0.84rem',
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? '#38bdf8' : 'var(--text-secondary)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-4px',
                          left: '15%',
                          right: '15%',
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
            </div>
          </div>

          {/* TAB 1: LEARN (CONCEPT OVERVIEW) */}
          {currentTab === 'learn' && (
            <PodConceptOverviewTab concept={activeConcept} />
          )}

          {/* TAB: FLOW & BLOCK DIAGRAM */}
          {currentTab === 'diagram' && (
            <div style={{ padding: '0.25rem 0' }}>
              <KubeFlowDiagram concept={activeConcept} />
            </div>
          )}

          {/* TAB 2: DECLARATIVE YAML & SYNTAX */}
          {currentTab === 'spec' && (
            <PodYamlSpecTab concept={activeConcept} />
          )}

          {/* TAB 3: HANDS-ON PRACTICE SANDBOX */}
          {currentTab === 'practice' && (
            <PodPracticeTab concept={activeConcept} />
          )}

          {/* TAB 4: LIVE CLUSTER VISUALIZER */}
          {currentTab === 'visualize' && (
            <PodVisualizerTab concept={activeConcept} />
          )}

          {/* TAB 5: PITFALLS & SRE RECOVERY */}
          {currentTab === 'pitfalls' && (
            <PodPitfallsTab concept={activeConcept} />
          )}

          {/* TAB 6: SCENARIO KNOWLEDGE CHECK QUIZ */}
          {currentTab === 'quiz' && (
            <PodQuizTab concept={activeConcept} />
          )}
        </div>

        {/* Standard Pinned Bottom Bar (Matching CommitForge) */}
        <StandardAcademyBottomBar
          prevConcept={
            prevConcept
              ? {
                  id: prevConcept.id,
                  command: prevConcept.commandPill,
                  title: prevConcept.title,
                }
              : null
          }
          nextConcept={
            nextConcept
              ? {
                  id: nextConcept.id,
                  command: nextConcept.commandPill,
                  title: nextConcept.title,
                }
              : null
          }
          onNavigate={(id) => setActiveConceptId(id)}
          isCompleted={isCompleted}
          onToggleComplete={() => markConceptComplete(activeConcept.id)}
          accentGradient="linear-gradient(135deg, rgba(50, 108, 229, 0.45) 0%, rgba(30, 64, 175, 0.45) 100%)"
          accentColor="#60a5fa"
        />
      </main>

      {/* Mobile Topics Drawer */}
      {showMobileTopicsDrawer && (
        <div
          className="academy-mobile-drawer-backdrop"
          onClick={() => setShowMobileTopicsDrawer(false)}
        >
          <div
            className="academy-mobile-drawer-content"
            onClick={(e) => e.stopPropagation()}
          >
            <StandardAcademySidebar
              title="PodForge Academy"
              subtitle={`${KUBE_CHAPTERS.length} Chapters • Your K8s Journey`}
              icon={Compass}
              accentColor="#60a5fa"
              topics={sidebarTopics}
              activeConceptId={activeConcept.id}
              completedConceptIds={completedConcepts}
              onSelectConcept={(id) => {
                handleSelectConcept(id);
                setShowMobileTopicsDrawer(false);
              }}
              isDrawer={true}
              onCloseDrawer={() => setShowMobileTopicsDrawer(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
