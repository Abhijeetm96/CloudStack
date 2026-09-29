import React, { useState, useMemo } from 'react';
import { useLinux } from '../../context/LinuxContext';
import { LINUX_15_TOPICS } from '../../data/topics';
import { LinuxTeachingEngine } from './LinuxTeachingEngine';
import {
  StandardAcademySidebar,
  StandardTopicItem,
} from '../../../platform/layout/StandardAcademySidebar';
import { StandardAcademyBottomBar } from '../../../platform/layout/StandardAcademyBottomBar';
import {
  Terminal,
  Cpu,
  Layers,
  Activity,
  Shield,
  Server,
  Package,
  HardDrive,
  Network,
  Lock,
  Workflow,
  Sparkles,
  ChevronDown,
  LucideIcon,
  FolderGit2,
  FolderTree,
  FileText,
  FileCode,
  ShieldCheck,
  TerminalSquare,
  Wrench,
  Code2,
  Users,
  Database,
  AlertTriangle,
} from 'lucide-react';

import { ViewMode } from '../../../context/AppContext';
import { DEVOPS_29_CHAPTERS } from '../../../devops/data/devopsCurriculumData';

const LINUX_TOPIC_ICONS: Record<string, LucideIcon> = {
  Cpu,
  Terminal,
  Lock,
  Workflow,
  Layers,
  Activity,
  Server,
  HardDrive,
  Network,
  Package,
  Shield,
  FolderGit2,
  FolderTree,
  FileText,
  FileCode,
  ShieldCheck,
  TerminalSquare,
  Wrench,
  Code2,
  Users,
  Database,
  AlertTriangle,
};

function getLinuxTopicIcon(iconName?: string, topicNumber?: string): LucideIcon {
  if (iconName && LINUX_TOPIC_ICONS[iconName]) {
    return LINUX_TOPIC_ICONS[iconName];
  }
  switch (topicNumber) {
    case '01.1': return Terminal;
    case '01.2': return FolderGit2;
    case '01.3': return FileText;
    case '01.4': return ShieldCheck;
    case '01.5': return Activity;
    case '01.6': return Server;
    case '01.7': return TerminalSquare;
    case '01.8': return Wrench;
    default: return Terminal;
  }
}

interface LinuxAcademyViewProps {
  onSwitchToSuite?: (mode: ViewMode) => void;
}

export const LinuxAcademyView: React.FC<LinuxAcademyViewProps> = ({ onSwitchToSuite }) => {
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
  } = useLinux();

  const [showMobileTopicsDrawer, setShowMobileTopicsDrawer] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage((curr) => (curr === msg ? null : curr)), 2500);
  };

  const activeChapterNum = useMemo(() => {
    const parentTopic = LINUX_15_TOPICS.find((t) => t.concepts.some((c) => c.id === activeConceptId));
    if (parentTopic) {
      return parseInt(parentTopic.number, 10) || 1;
    }
    return 1;
  }, [activeConceptId]);

  const handleSelectChapter = (chapterNum: number) => {
    const targetTopic = LINUX_15_TOPICS[chapterNum - 1];
    if (targetTopic && targetTopic.concepts.length > 0) {
      handleSelectConcept(targetTopic.concepts[0].id);
    }
  };

  // Convert topics to StandardTopicItem format with full syllabus subtopics
  const sidebarTopics: StandardTopicItem[] = useMemo(() => {
    return LINUX_15_TOPICS.map((t, idx) => {
      const IconComponent = getLinuxTopicIcon(t.iconName, t.number);
      const formattedNum = String(idx + 1).padStart(2, '0');

      return {
        id: t.id,
        number: formattedNum,
        title: t.title,
        icon: IconComponent,
        subtopics: t.concepts.map((c) => c.title),
        concepts: t.concepts.map((c) => ({
          id: c.id,
          command: c.command,
          title: c.title,
          shortDesc: c.subtitle,
        })),
      };
    });
  }, []);

  // Linear concepts array for navigation
  const allConceptsFlat = useMemo(() => {
    return LINUX_15_TOPICS.flatMap((t) =>
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
    const parentTopic = LINUX_15_TOPICS.find((t) => t.concepts.some((c) => c.id === cId));
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
          title="LINUXFORGE"
          subtitle="Understand Linux. Control the System."
          icon={Terminal}
          accentColor="#06b6d4"
          topics={sidebarTopics}
          activeConceptId={activeConceptId}
          completedConceptIds={completedConceptIds}
          onSelectConcept={handleSelectConcept}
          currentChapterNumber={activeChapterNum}
          onSelectChapter={handleSelectChapter}
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
          <button
            onClick={() => setShowMobileTopicsDrawer(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(6, 182, 212, 0.12)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '8px',
              padding: '0.35rem 0.65rem',
              color: '#06b6d4',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Terminal size={14} />
            <span>Chapter 01 Modules (8)</span>
            <ChevronDown size={12} />
          </button>

          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Module {currentConcept.topicNumber}: {currentConcept.title}
          </div>
        </div>

        {/* Center Stage Teaching Engine */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <LinuxTeachingEngine
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

        {/* Standard Pinned Bottom Bar (Matching CommitForge) */}
        <StandardAcademyBottomBar
          prevConcept={prevConcept}
          nextConcept={nextConcept}
          onNavigate={handleSelectConcept}
          isCompleted={completedConceptIds.includes(activeConceptId)}
          onToggleComplete={() => markConceptComplete(activeConceptId)}
          accentGradient="linear-gradient(135deg, rgba(6, 182, 212, 0.45) 0%, rgba(8, 145, 178, 0.45) 100%)"
          accentColor="#06b6d4"
        />
      </main>

      {/* ================================================================ */}
      {/* MOBILE TOPICS DRAWER MODAL                                      */}
      {/* ================================================================ */}
      {showMobileTopicsDrawer && (
        <div
          className="academy-mobile-drawer-backdrop"
          onClick={() => setShowMobileTopicsDrawer(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
          }}
        >
          <div
            className="academy-mobile-drawer-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '80%',
              maxWidth: '320px',
              height: '100%',
              background: 'var(--bg-surface)',
              borderRight: '1px solid var(--border-color)',
            }}
          >
            <StandardAcademySidebar
              title="LINUXFORGE"
              subtitle="Understand Linux. Control the System."
              icon={Terminal}
              accentColor="#06b6d4"
              topics={sidebarTopics}
              activeConceptId={activeConceptId}
              completedConceptIds={completedConceptIds}
              onSelectConcept={(cId) => {
                handleSelectConcept(cId);
                setShowMobileTopicsDrawer(false);
              }}
              isDrawer={true}
              onCloseDrawer={() => setShowMobileTopicsDrawer(false)}
              currentChapterNumber={activeChapterNum}
              onSelectChapter={(chNum) => {
                setShowMobileTopicsDrawer(false);
                handleSelectChapter(chNum);
              }}
            />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '64px',
            right: '24px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            color: '#f8fafc',
            borderRadius: '10px',
            padding: '0.65rem 1rem',
            fontSize: '0.82rem',
            fontWeight: 700,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            zIndex: 150,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Sparkles size={14} color="#06b6d4" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
