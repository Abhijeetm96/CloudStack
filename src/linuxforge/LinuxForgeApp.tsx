import React, { useEffect } from 'react';
import { LinuxProvider, useLinux } from './context/LinuxContext';
import { HeaderNav } from './components/layout/HeaderNav';
import { LinuxAcademyView } from './components/academy/LinuxAcademyView';
import { LinuxConceptsUniverseView } from './components/universe/LinuxConceptsUniverseView';
import { LinuxPracticeView } from './components/practice/LinuxPracticeView';
import { LinuxReferenceView } from './components/reference/LinuxReferenceView';
import { StandardCapstoneHubView } from '../platform/capstones/StandardCapstoneHubView';
import { ViewMode } from '../context/AppContext';

interface LinuxForgeAppProps {
  initialConceptId?: string;
  onSwitchToSuite?: (mode: ViewMode) => void;
}

const LinuxForgeContent: React.FC<LinuxForgeAppProps> = ({ onSwitchToSuite, initialConceptId }) => {
  const { mode, setMode, activeConceptId, setActiveConceptId } = useLinux();
  const prevInitialRef = React.useRef<string | undefined>(initialConceptId);

  useEffect(() => {
    // Only synchronize when the initialConceptId prop itself changes from outside (e.g. from parent router/problem solver)
    if (initialConceptId && initialConceptId !== prevInitialRef.current) {
      prevInitialRef.current = initialConceptId;
      if (initialConceptId !== activeConceptId) {
        setActiveConceptId(initialConceptId);
      }
      if (mode !== 'academy') {
        setMode('academy');
      }
    }
  }, [initialConceptId, activeConceptId, mode, setActiveConceptId, setMode]);

  return (
    <div
      className="linuxforge-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        background: 'var(--bg-app)',
      }}
    >
      <HeaderNav onSwitchToSuite={onSwitchToSuite} />
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          height: 'calc(100vh - 60px)',
          maxHeight: 'calc(100vh - 60px)',
          overflow: 'hidden',
        }}
      >
        {mode === 'capstones' && <StandardCapstoneHubView initialAcademy="linux" />}
        {mode === 'universe' && <LinuxConceptsUniverseView />}
        {mode === 'practice' && <LinuxPracticeView />}
        {mode === 'reference' && <LinuxReferenceView />}
        {(mode === 'academy' || (mode !== 'capstones' && mode !== 'universe' && mode !== 'practice' && mode !== 'reference')) && (
          <LinuxAcademyView onSwitchToSuite={onSwitchToSuite} />
        )}
      </main>
    </div>
  );
};

export const LinuxForgeApp: React.FC<LinuxForgeAppProps> = (props) => {
  return (
    <LinuxProvider>
      <LinuxForgeContent {...props} />
    </LinuxProvider>
  );
};

export default LinuxForgeApp;
