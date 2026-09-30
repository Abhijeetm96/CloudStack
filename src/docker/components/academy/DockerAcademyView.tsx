import React, { useState, useMemo } from 'react';
import { useDocker } from '../../context/DockerContext';
import { DOCKER_14_TOPICS } from '../../data/unifiedDockerData';
import { UniversalTeachingShell } from '../simulators/UniversalTeachingShell';
import {
  StandardAcademySidebar,
  StandardTopicItem,
} from '../../../platform/layout/StandardAcademySidebar';
import { StandardAcademyBottomBar } from '../../../platform/layout/StandardAcademyBottomBar';
import {
  Container,
  Box,
  Cpu,
  Download,
  Play,
  Database,
  Package,
  Hammer,
  Cloud,
  Sliders,
  Activity,
  Terminal,
  ShieldCheck,
  Workflow,
  Zap,
  ChevronDown,
  Sparkles,
  LucideIcon,
  Layers,
  Search,
  FileCode,
  Boxes,
  UploadCloud,
  TerminalSquare,
  ListOrdered,
  BarChart2,
  XCircle,
  ScrollText,
  Network,
  RefreshCw,
} from 'lucide-react';

const DOCKER_TOPIC_ICONS: Record<string, LucideIcon> = {
  Box,
  Cpu,
  Download,
  Play,
  Database,
  Package,
  Hammer,
  Cloud,
  Sliders,
  Activity,
  Terminal,
  Shield: ShieldCheck,
  Workflow,
  Zap,
};

function getDockerConceptIcon(command: string = '', title: string = '', id: string = ''): LucideIcon {
  const c = command.toLowerCase();
  const t = title.toLowerCase();

  if (c.includes('build') || c.includes('buildx') || t.includes('dockerfile')) return Hammer;
  if (c.includes('run') || c.includes('start') || t.includes('running')) return Play;
  if (c.includes('stop') || c.includes('kill') || c.includes(' rm ') || c.includes(' rmi ')) return XCircle;
  if (c.includes('compose') || t.includes('multi-container')) return Layers;
  if (c.includes('volume') || t.includes('volume') || t.includes('storage') || t.includes('persistence')) return Database;
  if (c.includes('network') || t.includes('network') || t.includes('port')) return Network;
  if (c.includes('logs') || t.includes('log')) return ScrollText;
  if (c.includes('inspect') || t.includes('inspect')) return Search;
  if (c.includes('exec') || c.includes('attach') || t.includes('shell')) return TerminalSquare;
  if (c.includes('ps') || t.includes('process')) return ListOrdered;
  if (c.includes('stats') || c.includes('top') || t.includes('resource') || t.includes('metrics')) return BarChart2;
  if (c.includes('pull') || t.includes('pull')) return Download;
  if (c.includes('push') || t.includes('registry') || t.includes('hub')) return UploadCloud;
  if (t.includes('security') || t.includes('scan') || t.includes('trivy') || t.includes('hardening')) return ShieldCheck;
  if (t.includes('swarm') || t.includes('kubernetes') || t.includes('orchestration')) return Boxes;
  if (t.includes('image') || c.includes('image')) return Package;
  if (t.includes('restart')) return RefreshCw;
  if (t.includes('cpu') || t.includes('cgroup') || t.includes('namespace')) return Cpu;
  if (t.includes('dockerfile') || t.includes('syntax')) return FileCode;
  return Container;
}

export const DockerAcademyView: React.FC = () => {
  const {
    activeTopicId,
    setActiveTopicId,
    activeConceptId,
    setActiveConceptId,
    currentConcept,
    completedConceptIds,
    markConceptComplete,
    executeCommand,
    setMode,
  } = useDocker();

  const [showMobileTopicsDrawer, setShowMobileTopicsDrawer] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage((curr) => (curr === msg ? null : curr)), 2500);
  };

  // Convert topics to StandardTopicItem list for StandardAcademySidebar
  const sidebarTopics: StandardTopicItem[] = useMemo(() => {
    return DOCKER_14_TOPICS.map((t) => {
      const IconComponent = DOCKER_TOPIC_ICONS[t.iconName] || Container;
      return {
        id: t.id,
        number: t.number,
        title: t.title,
        icon: IconComponent,
        concepts: t.concepts.map((c) => ({
          id: c.id,
          command: c.command,
          title: c.title,
          shortDesc: c.shortDesc,
          icon: getDockerConceptIcon(c.command, c.title, c.id),
        })),
      };
    });
  }, []);

  // Flattened concepts array for linear Previous / Next navigation
  const allConceptsFlat = useMemo(() => {
    return DOCKER_14_TOPICS.flatMap((t) =>
      t.concepts.map((c) => ({ ...c, topicId: t.id }))
    );
  }, []);

  const currentConceptIdx = allConceptsFlat.findIndex((c) => c.id === activeConceptId);
  const prevConcept = currentConceptIdx > 0 ? allConceptsFlat[currentConceptIdx - 1] : null;
  const nextConcept =
    currentConceptIdx >= 0 && currentConceptIdx < allConceptsFlat.length - 1
      ? allConceptsFlat[currentConceptIdx + 1]
      : null;

  const handleSelectConcept = (cId: string) => {
    setActiveConceptId(cId);
    const parentTopic = DOCKER_14_TOPICS.find((t) => t.concepts.some((c) => c.id === cId));
    if (parentTopic) {
      setActiveTopicId(parentTopic.id);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
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
          title="Docker Academy"
          subtitle="14 Topics • Your Docker Journey"
          icon={Container}
          accentColor="#38bdf8"
          topics={sidebarTopics}
          activeConceptId={activeConceptId}
          completedConceptIds={completedConceptIds}
          onSelectConcept={handleSelectConcept}
        />
      </aside>

      {/* ================================================================ */}
      {/* COLUMN 2: CENTER MAIN STAGE (Concept Teaching Experience)       */}
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
            <Container size={15} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Topics (14) • {currentConcept.title}
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
            <span>42 Concepts</span>
          </button>
        </div>

        {/* Center Canvas Body */}
        <div
          style={{
            flex: '1 1 0%',
            minHeight: 0,
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <UniversalTeachingShell
            concept={currentConcept}
            completedConceptIds={completedConceptIds}
            markConceptComplete={markConceptComplete}
            executeCommand={executeCommand}
            showToast={showToast}
            prevConcept={prevConcept}
            nextConcept={nextConcept}
            onSelectConcept={handleSelectConcept}
          />
        </div>

        {/* Standard Pinned Bottom Bar (Matching Git Academy) */}
        <StandardAcademyBottomBar
          prevConcept={prevConcept}
          nextConcept={nextConcept}
          onNavigate={handleSelectConcept}
          isCompleted={completedConceptIds.includes(activeConceptId)}
          onToggleComplete={() => markConceptComplete(activeConceptId)}
          accentGradient="linear-gradient(135deg, rgba(14, 165, 233, 0.45) 0%, rgba(2, 132, 199, 0.45) 100%)"
          accentColor="#38bdf8"
        />

        {/* Toast Notification Banner */}
        {toastMessage && (
          <div
            style={{
              position: 'fixed',
              bottom: '70px',
              right: '28px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              color: '#fff',
              padding: '0.65rem 1.25rem',
              borderRadius: '12px',
              boxShadow: '0 12px 30px rgba(14, 165, 233, 0.45)',
              fontWeight: 800,
              fontSize: '0.84rem',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Sparkles size={16} color="#fff" />
            <span>{toastMessage}</span>
          </div>
        )}
      </main>

      {/* ================================================================ */}
      {/* MOBILE TOPICS DRAWER                                             */}
      {/* ================================================================ */}
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
              title="Docker Academy"
              subtitle="14 Topics • Your Docker Journey"
              icon={Container}
              accentColor="#38bdf8"
              topics={sidebarTopics}
              activeConceptId={activeConceptId}
              completedConceptIds={completedConceptIds}
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
