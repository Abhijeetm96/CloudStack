import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useDocker } from '../../context/DockerContext';
import { ALL_DOCKER_CHAPTERS, ALL_DOCKER_LESSONS, getDockerLessonById } from '../../data';
import { DockerSubchapterLesson } from '../../types/dockerCurriculumTypes';
import { DockForgeProgressStore } from '../../progress/dockerProgress';
import { UniversalTeachingShell } from '../simulators/UniversalTeachingShell';
import {
  adaptDockerLessonToUniversalConcept,
  resolveDockerLessonId,
} from '../../data/dockerLessonAdapter';
import { DockerSearchModal } from '../search/DockerSearchModal';
import { parseCurrentRoute, syncUrlWithMode } from '../../../platform/routing/urlRouter';
import {
  StandardAcademySidebar,
  StandardTopicItem,
} from '../../../platform/layout/StandardAcademySidebar';
import { StandardAcademyBottomBar } from '../../../platform/layout/StandardAcademyBottomBar';
import {
  Container,
  ChevronDown,
  Sparkles,
  Search,
} from 'lucide-react';

export const DockerAcademyView: React.FC = () => {
  const { executeCommand } = useDocker();

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

  // Active lesson selection initialized from URL route or stored progress
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    try {
      const { conceptId } = parseCurrentRoute();
      if (conceptId) {
        return resolveDockerLessonId(conceptId);
      }
    } catch {}
    const saved = progressStore.getState().lastVisitedLesson;
    if (saved && getDockerLessonById(saved)) return saved;
    return ALL_DOCKER_LESSONS[0]?.id || 'dk01-01-what-is-a-container';
  });

  // Watch URL route changes (e.g. browser back/forward or deep-link navigation)
  useEffect(() => {
    const handlePopState = () => {
      try {
        const { conceptId } = parseCurrentRoute();
        if (conceptId) {
          const resolved = resolveDockerLessonId(conceptId);
          setActiveLessonId(resolved);
        }
      } catch {}
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showMobileTopicsDrawer, setShowMobileTopicsDrawer] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage((curr) => (curr === msg ? null : curr)), 2500);
  }, []);

  const currentLesson: DockerSubchapterLesson = useMemo(() => {
    return getDockerLessonById(activeLessonId) || ALL_DOCKER_LESSONS[0];
  }, [activeLessonId]);

  // Convert 68 chapters to StandardTopicItem for StandardAcademySidebar
  const sidebarTopics: StandardTopicItem[] = useMemo(() => {
    return ALL_DOCKER_CHAPTERS.map((ch) => {
      const isCapstoneChapter = ch.number === 68;
      return {
        id: ch.id,
        number: String(ch.number).padStart(2, '0'),
        title: isCapstoneChapter ? `${ch.title} 🏆 CAPSTONES` : ch.title,
        icon: Container,
        concepts: ch.lessons.map((lesson) => ({
          id: lesson.id,
          command: lesson.syntax.split('\n')[0] || `docker ${lesson.subchapterTitle.toLowerCase()}`,
          title: lesson.subchapterTitle,
          shortDesc: lesson.definition,
          subChapterNumber: lesson.subchapterNumber,
          icon: Container,
        })),
      };
    });
  }, []);

  // Linear previous / next navigation across 1,038 lessons
  const currentIdx = ALL_DOCKER_LESSONS.findIndex((l) => l.id === activeLessonId);
  const prevLesson = currentIdx > 0 ? ALL_DOCKER_LESSONS[currentIdx - 1] : null;
  const nextLesson =
    currentIdx >= 0 && currentIdx < ALL_DOCKER_LESSONS.length - 1
      ? ALL_DOCKER_LESSONS[currentIdx + 1]
      : null;

  const handleSelectLesson = useCallback((lessonId: string) => {
    const resolved = resolveDockerLessonId(lessonId);
    setActiveLessonId(resolved);
    progressStore.setLastVisitedLesson(resolved);
    syncUrlWithMode('docker', resolved);
  }, [progressStore]);

  const handleToggleComplete = useCallback((id: string) => {
    const isNowDone = progressStore.toggleLessonComplete(id);
    showToast(isNowDone ? 'Lesson completed! Great job!' : 'Lesson marked as uncompleted.');
  }, [progressStore, showToast]);

  // Adapt current lesson into UniversalTeachingShell concept data
  const universalConcept = useMemo(() => {
    return adaptDockerLessonToUniversalConcept(currentLesson);
  }, [currentLesson]);

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
      {/* COLUMN 1: LEFT SIDEBAR (Standard 260px Accordion Sidebar)       */}
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
      {/* COLUMN 2: CENTER MAIN STAGE (Universal Docker Teaching Experience) */}
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

        {/* Center Main Stage (Native Universal Docker Teaching Shell) */}
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
            concept={universalConcept}
            completedConceptIds={completedLessonIds}
            markConceptComplete={handleToggleComplete}
            executeCommand={executeCommand}
            showToast={showToast}
            prevConcept={prevLesson ? { id: prevLesson.id, title: prevLesson.subchapterTitle } : null}
            nextConcept={nextLesson ? { id: nextLesson.id, title: nextLesson.subchapterTitle } : null}
            onSelectConcept={handleSelectLesson}
          />
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
