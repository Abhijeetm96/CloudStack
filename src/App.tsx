import React, { Suspense } from 'react';
import { AppProvider, useApp, ViewMode } from './context/AppContext';
import { SuiteHeaderNav } from './components/layout/SuiteHeaderNav';
import { CloudStackHomeView } from './components/home/CloudStackHomeView';
import { Agentation } from 'agentation';

import { TechnologyType } from './platform/lesson-runtime/types';
import { ProgressProvider, ProgressSettingsModal } from './progress';
import { SuiteErrorBoundary } from './platform/errors/SuiteErrorBoundary';

import { lazyWithRetry } from './platform/utils/lazyWithRetry';

// Code-split heavy academy engines and secondary views with automated chunk-retry on deployment
const GitAcademyApp = lazyWithRetry(() =>
  import('./git/GitAcademyApp').then((m) => ({ default: m.GitAcademyApp }))
);
const KubernetesAcademyApp = lazyWithRetry(() =>
  import('./kubernetes/KubernetesAcademyApp').then((m) => ({ default: m.KubernetesAcademyApp }))
);
const DockerAcademyApp = lazyWithRetry(() =>
  import('./docker/DockerAcademyApp').then((m) => ({ default: m.DockerAcademyApp }))
);
const LinuxForgeApp = lazyWithRetry(() =>
  import('./linuxforge/LinuxForgeApp').then((m) => ({ default: m.LinuxForgeApp }))
);
const DevOpsRoadmapView = lazyWithRetry(() =>
  import('./components/roadmap/DevOpsRoadmapView').then((m) => ({ default: m.DevOpsRoadmapView }))
);
const DevOpsAcademyMasterView = lazyWithRetry(() =>
  import('./devops/components/DevOpsAcademyMasterView').then((m) => ({ default: m.DevOpsAcademyMasterView }))
);
const UniversalProblemSolver = lazyWithRetry(() =>
  import('./platform/search/UniversalProblemSolver').then((m) => ({ default: m.UniversalProblemSolver }))
);

const ViewLoadingFallback: React.FC<{ label?: string }> = ({ label = 'Loading Academy Engine...' }) => (
  <div
    style={{
      flex: 1,
      minHeight: 'calc(100vh - 60px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at top, #0f172a 0%, #030712 100%)',
      color: '#94a3b8',
      gap: '1rem',
    }}
  >
    <div
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: '3px solid rgba(56, 189, 248, 0.2)',
        borderTopColor: '#38bdf8',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.02em', color: '#cbd5e1' }}>
      {label}
    </span>
  </div>
);

const AppContent: React.FC = () => {
  const { mode, setMode, showProblemSearch, setShowProblemSearch, activeLessonConcept } = useApp();

  // Global ⌘K / Ctrl+K keyboard shortcut opens the Universal Problem Solver
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowProblemSearch(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setShowProblemSearch]);

  const handleSelectLessonFromSolver = (tech: TechnologyType, lessonId: string) => {
    if (tech === 'git') setMode('learn', lessonId);
    else if (tech === 'docker') setMode('docker', lessonId);
    else if (tech === 'kubernetes') setMode('kubernetes', lessonId);
  };

  const renderActiveView = () => {
    if (mode === 'home') {
      return (
        <>
          <SuiteHeaderNav />
          <main
            className="main-content"
            style={{
              flex: '1 1 0%',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              height: 'calc(100vh - 60px)',
              maxHeight: 'calc(100vh - 60px)',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            <CloudStackHomeView />
          </main>
        </>
      );
    }

    if (mode === 'roadmap') {
      return (
        <>
          <SuiteHeaderNav />
          <main
            className="main-content"
            style={{
              flex: '1 1 0%',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              height: 'calc(100vh - 60px)',
              maxHeight: 'calc(100vh - 60px)',
              overflow: 'hidden',
            }}
          >
            <Suspense fallback={<ViewLoadingFallback label="Loading DevOps Roadmap..." />}>
              <DevOpsRoadmapView />
            </Suspense>
          </main>
        </>
      );
    }

    if (mode === 'devops') {
      return (
        <>
          <SuiteHeaderNav />
          <main
            className="main-content"
            style={{
              flex: '1 1 0%',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 0,
              height: 'calc(100vh - 60px)',
              maxHeight: 'calc(100vh - 60px)',
              overflow: 'hidden',
            }}
          >
            <Suspense fallback={<ViewLoadingFallback label="Loading DevOps Academy..." />}>
              <DevOpsAcademyMasterView />
            </Suspense>
          </main>
        </>
      );
    }

    if (mode === 'kubernetes') {
      return (
        <SuiteErrorBoundary fallbackTitle="Kubernetes Academy Error">
          <Suspense fallback={<ViewLoadingFallback label="Booting Kubernetes Engine..." />}>
            <KubernetesAcademyApp
              initialConceptId={activeLessonConcept || undefined}
              onSwitchToSuite={(newMode: ViewMode) => setMode(newMode)}
            />
          </Suspense>
        </SuiteErrorBoundary>
      );
    }

    if (mode === 'docker') {
      return (
        <SuiteErrorBoundary fallbackTitle="Docker Academy Error">
          <Suspense fallback={<ViewLoadingFallback label="Starting Docker Daemon..." />}>
            <DockerAcademyApp
              initialConceptId={activeLessonConcept || undefined}
              onSwitchToSuite={(newMode: ViewMode) => setMode(newMode)}
            />
          </Suspense>
        </SuiteErrorBoundary>
      );
    }

    if (mode === 'linuxforge') {
      return (
        <SuiteErrorBoundary fallbackTitle="LinuxForge Linux Systems Academy Error">
          <Suspense fallback={<ViewLoadingFallback label="Booting Linux Kernel 6.8..." />}>
            <LinuxForgeApp
              initialConceptId={activeLessonConcept || undefined}
              onSwitchToSuite={(newMode: ViewMode) => setMode(newMode)}
            />
          </Suspense>
        </SuiteErrorBoundary>
      );
    }

    return (
      <SuiteErrorBoundary fallbackTitle="Git Academy Error">
        <Suspense fallback={<ViewLoadingFallback label="Initializing Git Academy..." />}>
          <GitAcademyApp onSwitchToSuite={(newMode: ViewMode) => setMode(newMode)} />
        </Suspense>
      </SuiteErrorBoundary>
    );
  };

  return (
    <>
      {renderActiveView()}
      {showProblemSearch && (
        <Suspense fallback={null}>
          <UniversalProblemSolver
            isOpen={showProblemSearch}
            onClose={() => setShowProblemSearch(false)}
            onSelectLesson={handleSelectLessonFromSolver}
          />
        </Suspense>
      )}
      <ProgressSettingsModal />
      <Agentation />
    </>
  );
};

export default function App() {
  return (
    <ProgressProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ProgressProvider>
  );
}
