import React, { useState, useMemo, useEffect } from 'react';
import { useDocker } from '../../context/DockerContext';
import { ALL_DOCKER_CHAPTERS, ALL_DOCKER_LESSONS, getDockerLessonById } from '../../data';
import { DockerSubchapterLesson } from '../../types/dockerCurriculumTypes';
import { DockForgeProgressStore } from '../../progress/dockerProgress';
import { DockerLessonView } from '../../../components/docker/DockerLessonView';
import { DockerConceptView } from '../../../components/docker/DockerConceptView';
import { DockerContainerSimulator } from '../../../components/docker/DockerContainerSimulator';
import { DockerImageSimulator } from '../../../components/docker/DockerImageSimulator';
import { DockerNetworkSimulator } from '../../../components/docker/DockerNetworkSimulator';
import { DockerVolumeSimulator } from '../../../components/docker/DockerVolumeSimulator';
import { DockerComposeSimulator } from '../../../components/docker/DockerComposeSimulator';
import { DockerBuildSimulator } from '../../../components/docker/DockerBuildSimulator';
import { DockerSecuritySimulator } from '../../../components/docker/DockerSecuritySimulator';
import { DockerDebugSimulator } from '../../../components/docker/DockerDebugSimulator';
import { DockerTerminal } from '../../../components/docker/DockerTerminal';
import { DockerSearchModal } from '../search/DockerSearchModal';

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
  Bug,
  Shield
} from 'lucide-react';

type StudioTab =
  | 'lesson'
  | 'concept'
  | 'container'
  | 'image'
  | 'network'
  | 'volume'
  | 'compose'
  | 'build'
  | 'security'
  | 'debug'
  | 'terminal';

export const DockerAcademyView: React.FC = () => {
  const { setMode } = useDocker();

  // Progress store
  const progressStore = DockForgeProgressStore.getInstance();
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    return progressStore.getState().completedLessons;
  });

  useEffect(() => {
    return progressStore.subscribe((state) => {
      setCompletedLessonIds(state.completedLessons);
    });
  }, [progressStore]);

  // Active lesson selection
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    const saved = progressStore.getState().lastVisitedLesson;
    if (saved && getDockerLessonById(saved)) return saved;
    return ALL_DOCKER_LESSONS[0]?.id || 'dk01-01-what-is-a-container';
  });

  const [activeStudioTab, setActiveStudioTab] = useState<StudioTab>('lesson');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileTopicsDrawer, setShowMobileTopicsDrawer] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage((curr) => (curr === msg ? null : curr)), 2500);
  };

  const currentLesson: DockerSubchapterLesson = useMemo(() => {
    return getDockerLessonById(activeLessonId) || ALL_DOCKER_LESSONS[0];
  }, [activeLessonId]);

  // Convert 68 chapters to StandardTopicItem for StandardAcademySidebar
  const sidebarTopics: StandardTopicItem[] = useMemo(() => {
    return ALL_DOCKER_CHAPTERS.map((ch) => ({
      id: ch.id,
      number: String(ch.number).padStart(2, '0'),
      title: ch.title,
      icon: Container,
      concepts: ch.lessons.map((lesson) => ({
        id: lesson.id,
        command: lesson.syntax.split('\n')[0] || `docker ${lesson.subchapterTitle.toLowerCase()}`,
        title: lesson.subchapterTitle,
        shortDesc: lesson.definition,
        subChapterNumber: lesson.subchapterNumber,
        icon: Container,
      })),
    }));
  }, []);

  // Linear previous / next navigation across 1,038 lessons
  const currentIdx = ALL_DOCKER_LESSONS.findIndex((l) => l.id === activeLessonId);
  const prevLesson = currentIdx > 0 ? ALL_DOCKER_LESSONS[currentIdx - 1] : null;
  const nextLesson = currentIdx >= 0 && currentIdx < ALL_DOCKER_LESSONS.length - 1 ? ALL_DOCKER_LESSONS[currentIdx + 1] : null;

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    progressStore.setLastVisitedLesson(lessonId);
    setActiveStudioTab('lesson');
  };

  const handleToggleComplete = (id: string) => {
    const isNowDone = progressStore.toggleLessonComplete(id);
    showToast(isNowDone ? 'Lesson completed! Great job!' : 'Lesson marked as uncompleted.');
  };

  const handleOpenSimulatorFromLesson = (simType: string) => {
    if (simType === 'container') setActiveStudioTab('container');
    else if (simType === 'image') setActiveStudioTab('image');
    else if (simType === 'network') setActiveStudioTab('network');
    else if (simType === 'volume') setActiveStudioTab('volume');
    else if (simType === 'compose') setActiveStudioTab('compose');
    else if (simType === 'security') setActiveStudioTab('security');
    else if (simType === 'build') setActiveStudioTab('build');
    else if (simType === 'debug') setActiveStudioTab('debug');
    else setActiveStudioTab('terminal');
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
          width: '260px',
          minWidth: '260px',
          maxWidth: '260px',
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
          subtitle="68 Chapters • 1,038 Lessons"
          icon={Container}
          accentColor="#38bdf8"
          topics={sidebarTopics}
          activeConceptId={activeLessonId}
          completedConceptIds={completedLessonIds}
          onSelectConcept={handleSelectLesson}
        />
      </aside>

      {/* ================================================================ */}
      {/* COLUMN 2: CENTER MAIN STAGE (Studio & 35-Item Lesson View)       */}
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
              68 Chapters • {currentLesson.subchapterTitle}
            </span>
            <ChevronDown size={13} />
          </button>

          <button
            onClick={() => setShowSearchModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '8px',
              padding: '0.35rem 0.65rem',
              color: '#38bdf8',
              fontSize: '0.76rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Search size={13} />
            <span>Search (⌘K)</span>
          </button>
        </div>

        {/* Studio Top Control Strip (Switch between Lesson, Concept, and 8 Simulators) */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-1.5 flex items-center justify-between shrink-0 overflow-x-auto gap-2">
          <div className="flex items-center gap-1 font-mono text-xs overflow-x-auto py-0.5">
            <button
              onClick={() => setActiveStudioTab('lesson')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeStudioTab === 'lesson'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" /> Lesson Curriculum
            </button>

            <button
              onClick={() => setActiveStudioTab('concept')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeStudioTab === 'concept'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" /> Concept Model
            </button>

            <span className="text-slate-700 mx-1">|</span>

            <button
              onClick={() => setActiveStudioTab('container')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeStudioTab === 'container'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Play className="w-3.5 h-3.5" /> Container Simulator
            </button>

            <button
              onClick={() => setActiveStudioTab('image')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeStudioTab === 'image'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Package className="w-3.5 h-3.5" /> Image & Layers
            </button>

            <button
              onClick={() => setActiveStudioTab('network')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeStudioTab === 'network'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Network className="w-3.5 h-3.5" /> Networks & DNS
            </button>

            <button
              onClick={() => setActiveStudioTab('volume')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeStudioTab === 'volume'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Database className="w-3.5 h-3.5" /> Volumes & Mounts
            </button>

            <button
              onClick={() => setActiveStudioTab('compose')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeStudioTab === 'compose'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Compose
            </button>

            <button
              onClick={() => setActiveStudioTab('security')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeStudioTab === 'security'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" /> Security
            </button>

            <button
              onClick={() => setActiveStudioTab('build')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeStudioTab === 'build'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Hammer className="w-3.5 h-3.5" /> BuildKit
            </button>

            <button
              onClick={() => setActiveStudioTab('debug')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeStudioTab === 'debug'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Bug className="w-3.5 h-3.5" /> SRE Debugging
            </button>

            <button
              onClick={() => setActiveStudioTab('terminal')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeStudioTab === 'terminal'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" /> CLI Terminal
            </button>
          </div>

          <button
            onClick={() => setShowSearchModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono rounded cursor-pointer shrink-0"
          >
            <Search className="w-3.5 h-3.5 text-blue-400" />
            <span>Search</span>
            <kbd className="px-1 py-0.2 bg-slate-900 rounded text-[10px] text-slate-400">⌘K</kbd>
          </button>
        </div>

        {/* Center Dynamic Content Area */}
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
          {activeStudioTab === 'lesson' && (
            <DockerLessonView
              lesson={currentLesson}
              isCompleted={completedLessonIds.includes(activeLessonId)}
              onToggleComplete={handleToggleComplete}
              onOpenSimulator={handleOpenSimulatorFromLesson}
              onNextLesson={nextLesson ? () => handleSelectLesson(nextLesson.id) : undefined}
              onPrevLesson={prevLesson ? () => handleSelectLesson(prevLesson.id) : undefined}
            />
          )}

          {activeStudioTab === 'concept' && (
            <div className="flex-1 p-6 overflow-y-auto">
              <DockerConceptView
                lesson={currentLesson}
                onOpenSimulator={() => handleOpenSimulatorFromLesson(currentLesson.recommendedSimulator || 'container')}
              />
            </div>
          )}

          {activeStudioTab === 'container' && (
            <div className="flex-1 p-4 overflow-hidden">
              <DockerContainerSimulator />
            </div>
          )}

          {activeStudioTab === 'image' && (
            <div className="flex-1 p-4 overflow-hidden">
              <DockerImageSimulator />
            </div>
          )}

          {activeStudioTab === 'network' && (
            <div className="flex-1 p-4 overflow-hidden">
              <DockerNetworkSimulator />
            </div>
          )}

          {activeStudioTab === 'volume' && (
            <div className="flex-1 p-4 overflow-hidden">
              <DockerVolumeSimulator />
            </div>
          )}

          {activeStudioTab === 'compose' && (
            <div className="flex-1 p-4 overflow-hidden">
              <DockerComposeSimulator />
            </div>
          )}

          {activeStudioTab === 'build' && (
            <div className="flex-1 p-4 overflow-hidden">
              <DockerBuildSimulator />
            </div>
          )}

          {activeStudioTab === 'security' && (
            <div className="flex-1 p-4 overflow-hidden">
              <DockerSecuritySimulator />
            </div>
          )}

          {activeStudioTab === 'debug' && (
            <div className="flex-1 p-4 overflow-hidden">
              <DockerDebugSimulator />
            </div>
          )}

          {activeStudioTab === 'terminal' && (
            <div className="flex-1 p-4 overflow-hidden">
              <DockerTerminal />
            </div>
          )}
        </div>

        {/* Standard Pinned Bottom Bar (Matching Git, K8s, Linux, Terraform Academies) */}
        <StandardAcademyBottomBar
          prevConcept={prevLesson ? { id: prevLesson.id, title: prevLesson.subchapterTitle } : null}
          nextConcept={nextLesson ? { id: nextLesson.id, title: nextLesson.subchapterTitle } : null}
          onNavigate={handleSelectLesson}
          isCompleted={completedLessonIds.includes(activeLessonId)}
          onToggleComplete={() => handleToggleComplete(activeLessonId)}
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
              subtitle="68 Chapters • 1,038 Lessons"
              icon={Container}
              accentColor="#38bdf8"
              topics={sidebarTopics}
              activeConceptId={activeLessonId}
              completedConceptIds={completedLessonIds}
              onSelectConcept={(id) => {
                handleSelectLesson(id);
                setShowMobileTopicsDrawer(false);
              }}
              isDrawer={true}
              onCloseDrawer={() => setShowMobileTopicsDrawer(false)}
            />
          </div>
        </div>
      )}

      {/* ⌘K Universal Search Modal */}
      <DockerSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectLesson={(lesson) => handleSelectLesson(lesson.id)}
      />
    </div>
  );
};
