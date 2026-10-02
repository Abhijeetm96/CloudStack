import React, { useState, useEffect } from 'react';
import {
  Layers, Search, CheckCircle2, Play, GitBranch, Database, Terminal,
  AlertTriangle, BookOpen, RotateCcw, Home, Sparkles, Award
} from 'lucide-react';
import { StandardCapstoneHubView } from '../platform/capstones/StandardCapstoneHubView';
import { ALL_TERRAFORM_LESSONS, getTerraformLessonById, getNextTerraformLesson, getPrevTerraformLesson } from './data';
import { TerraformLessonView } from './components/TerraformLessonView';
import { TerraformSidebar } from './components/TerraformSidebar';
import { TerraformSearchModal } from './components/search/TerraformSearchModal';
import { TerraformConceptsUniverseView } from './components/universe/TerraformConceptsUniverseView';
import { TerraformSimulator } from './components/simulators/TerraformSimulator';
import { TerraformFailureArena } from './components/simulators/TerraformFailureArena';
import { TerraformGraphVisualizer } from './components/simulators/TerraformGraphVisualizer';
import { TerraformStateVisualizer } from './components/simulators/TerraformStateVisualizer';
import { TerraformTerminal } from './components/simulators/TerraformTerminal';
import { loadTerraformProgress, markLessonCompleted, setLastVisitedLesson, resetTerraformProgress } from './progress/terraformProgress';
import { ViewMode } from '../context/AppContext';

export interface TerraformAcademyAppProps {
  initialLessonId?: string;
  onSwitchToSuite?: (mode: ViewMode) => void;
}

export const TerraformAcademyApp: React.FC<TerraformAcademyAppProps> = ({
  initialLessonId,
  onSwitchToSuite
}) => {
  const [progress, setProgress] = useState(loadTerraformProgress);
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    if (initialLessonId && getTerraformLessonById(initialLessonId)) {
      return initialLessonId;
    }
    const saved = progress.lastVisitedLessonId;
    if (saved && getTerraformLessonById(saved)) {
      return saved;
    }
    return ALL_TERRAFORM_LESSONS[0]?.id || 'ch01-01-what-is-infrastructure';
  });

  const [activeStudioView, setActiveStudioView] = useState<'lesson' | 'universe' | 'simulator' | 'failure' | 'graph' | 'state' | 'terminal' | 'capstones'>('lesson');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (initialLessonId && getTerraformLessonById(initialLessonId)) {
      setActiveLessonId(initialLessonId);
    }
  }, [initialLessonId]);

  const activeLesson = getTerraformLessonById(activeLessonId) || ALL_TERRAFORM_LESSONS[0];

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveStudioView('lesson');
    setLastVisitedLesson(lessonId);
  };

  const handleToggleComplete = () => {
    const updated = markLessonCompleted(activeLesson.id);
    setProgress(updated);
  };

  const nextLesson = getNextTerraformLesson(activeLesson.id);
  const prevLesson = getPrevTerraformLesson(activeLesson.id);

  // Global ⌘K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="terraform-academy-root"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        background: '#040711',
        color: '#e2e8f0',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Top Navigation Header */}
      <header
        style={{
          height: '56px',
          minHeight: '56px',
          background: '#090d16',
          borderBottom: '1px solid rgba(132, 79, 186, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.25rem',
          gap: '1rem',
          zIndex: 40
        }}
      >
        {/* Left Brand & Return */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {onSwitchToSuite && (
            <button
              onClick={() => onSwitchToSuite('home')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                padding: '0.4rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title="Return to CloudStack Home"
            >
              <Home size={13} />
              Suite
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #844fba 0%, #6366f1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(132, 79, 186, 0.4)'
              }}
            >
              <Layers size={16} color="#fff" />
            </div>
            <div>
              <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                Terraform <span style={{ color: '#c084fc' }}>Academy</span>
              </span>
              <span style={{ marginLeft: '0.5rem', fontSize: '0.68rem', color: '#94a3b8' }}>
                50 Chapters • 694 Lessons
              </span>
            </div>
          </div>
        </div>

        {/* Center Studio View Switcher */}
        <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto' }}>
          {[
            { id: 'lesson', label: 'Curriculum', icon: BookOpen },
            { id: 'universe', label: '694 Concepts', icon: Sparkles },
            { id: 'simulator', label: 'Execution Engine', icon: Play },
            { id: 'failure', label: 'Failure Arena', icon: AlertTriangle },
            { id: 'graph', label: 'DAG Graph', icon: GitBranch },
            { id: 'state', label: 'State Ledger', icon: Database },
            { id: 'terminal', label: 'CLI Console', icon: Terminal }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveStudioView(view.id as any)}
              style={{
                background: activeStudioView === view.id ? 'rgba(132, 79, 186, 0.25)' : 'transparent',
                border: activeStudioView === view.id ? '1px solid #844fba' : '1px solid transparent',
                color: activeStudioView === view.id ? '#e9d5ff' : '#94a3b8',
                padding: '0.35rem 0.7rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                whiteSpace: 'nowrap'
              }}
            >
              <view.icon size={13} color={activeStudioView === view.id ? '#c084fc' : '#64748b'} />
              {view.label}
            </button>
          ))}
        </div>

        {/* Right Search Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setIsSearchOpen(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#94a3b8',
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Search size={13} />
            Search
            <kbd
              style={{
                fontSize: '0.65rem',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '0.1rem 0.35rem',
                borderRadius: '4px',
                color: '#cbd5e1'
              }}
            >
              ⌘K
            </kbd>
          </button>
        </div>
      </header>

      {/* Main Split Layout: Sidebar + Active Stage OR Fullscreen Universe OR Capstones */}
      {activeStudioView === 'capstones' ? (
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <StandardCapstoneHubView initialAcademy="terraform" />
        </div>
      ) : activeStudioView === 'universe' ? (
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <TerraformConceptsUniverseView onSelectLesson={handleSelectLesson} />
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
          <TerraformSidebar
            activeLessonId={activeLesson.id}
            onSelectLesson={handleSelectLesson}
            completedLessonIds={progress.completedLessons}
          />

          <main style={{ flex: 1, minWidth: 0, height: '100%', overflowY: 'auto' }}>
            {activeStudioView === 'lesson' && (
              <TerraformLessonView
                lesson={activeLesson}
                isCompleted={progress.completedLessons.includes(activeLesson.id)}
                onToggleComplete={handleToggleComplete}
                onNavigatePrev={prevLesson ? () => handleSelectLesson(prevLesson.id) : undefined}
                onNavigateNext={nextLesson ? () => handleSelectLesson(nextLesson.id) : undefined}
              />
            )}

          {activeStudioView === 'simulator' && (
            <div style={{ padding: '2rem' }}>
              <TerraformSimulator />
            </div>
          )}

          {activeStudioView === 'failure' && (
            <div style={{ padding: '2rem' }}>
              <TerraformFailureArena />
            </div>
          )}

          {activeStudioView === 'graph' && (
            <div style={{ padding: '2rem' }}>
              <TerraformGraphVisualizer />
            </div>
          )}

          {activeStudioView === 'state' && (
            <div style={{ padding: '2rem' }}>
              <TerraformStateVisualizer />
            </div>
          )}

          {activeStudioView === 'terminal' && (
            <div style={{ padding: '2rem' }}>
              <TerraformTerminal />
            </div>
          )}
        </main>
      </div>
    )}

      {/* Search Modal */}
      <TerraformSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={handleSelectLesson}
      />
    </div>
  );
};

export default TerraformAcademyApp;
