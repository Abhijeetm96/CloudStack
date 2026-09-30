import React from 'react';
import { useDocker } from '../../context/DockerContext';
import { useApp } from '../../../context/AppContext';
import { StandardAcademyHeaderNav } from '../../../platform/layout/StandardAcademyHeaderNav';
import { Container } from 'lucide-react';
import { ViewMode } from '../../../context/AppContext';

interface HeaderNavProps {
  onSwitchToSuite?: (mode: ViewMode) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onSwitchToSuite }) => {
  const { mode, setMode, completedConceptIds } = useDocker();
  const rootApp = useApp();

  const handleSelectMode = (newMode: string) => {
    if (newMode === 'learn') setMode('academy');
    else if (newMode === 'universe') setMode('universe');
    else if (newMode === 'practice') setMode('practice');
    else if (newMode === 'labs') setMode('labs');
    else if (newMode === 'ide') setMode('ide');
    else if (newMode === 'reference' || newMode === 'visualizer') setMode('visualizer');
    else setMode(newMode as any);
  };

  // Map DockMode to standardized mode id
  const activeTabId =
    mode === 'academy'
      ? 'learn'
      : mode === 'universe'
      ? 'universe'
      : mode === 'practice'
      ? 'practice'
      : mode === 'labs'
      ? 'labs'
      : mode === 'ide'
      ? 'ide'
      : mode === 'visualizer'
      ? 'reference'
      : 'learn';

  return (
    <StandardAcademyHeaderNav
      academyId='docker'
      brandTitle="Docker Academy"
      brandTagline="Docker & Container Academy"
      brandIcon={Container}
      brandGradient="linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)"
      brandColor="#38bdf8"
      activeMode={activeTabId}
      onSelectMode={handleSelectMode}
      onSwitchToSuite={onSwitchToSuite}
      universeConceptCount={42}
      statusPill={{
        label: 'Daemon Active (v27.0)',
        dotColor: '#22c55e',
      }}
      masteredPill={{
        count: completedConceptIds.length,
        total: 42,
      }}
      onOpenProblemSearch={() => rootApp?.setShowProblemSearch(true)}
      theme={rootApp?.theme || 'dark'}
      onToggleTheme={() => rootApp?.setTheme(rootApp.theme === 'dark' ? 'light' : 'dark')}
    />
  );
};
