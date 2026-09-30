import React from 'react';
import { useApp } from '../../context/AppContext';
import { useApp as useRootApp, ViewMode } from '../../../context/AppContext';
import { StandardAcademyHeaderNav } from '../../../platform/layout/StandardAcademyHeaderNav';
import { Compass } from 'lucide-react';

interface HeaderNavProps {
  onSwitchToSuite?: (mode: ViewMode) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onSwitchToSuite }) => {
  const { mode, setMode, clusterState, completedConcepts } = useApp();
  const rootApp = useRootApp();

  const nodeCount = Object.keys(clusterState.nodes).length;
  const podCount = Object.keys(clusterState.pods).length;

  const handleSelectMode = (newMode: string) => {
    if (newMode === 'learn') setMode('academy');
    else if (newMode === 'universe') setMode('universe');
    else if (newMode === 'practice') setMode('practice');
    else if (newMode === 'labs') setMode('labs');
    else if (newMode === 'ide') setMode('ide');
    else if (newMode === 'reference' || newMode === 'visualizer') setMode('cluster');
    else setMode(newMode as any);
  };

  // Map Kubernetes Academy AppMode to standardized tab id
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
      : mode === 'cluster'
      ? 'reference'
      : 'learn';

  return (
    <StandardAcademyHeaderNav
      academyId='kubernetes'
      brandTitle="Kubernetes Academy"
      brandTagline="Kubernetes & Cloud-Native Academy"
      brandIcon={Compass}
      brandGradient="linear-gradient(135deg, #326ce5 0%, #1e40af 100%)"
      brandColor="#60a5fa"
      activeMode={activeTabId}
      onSelectMode={handleSelectMode}
      onSwitchToSuite={onSwitchToSuite}
      universeConceptCount={71}
      statusPill={{
        label: `Cluster Active (${nodeCount} Nodes, ${podCount} Pods)`,
        dotColor: '#10b981',
      }}
      masteredPill={{
        count: completedConcepts.length,
        total: 71,
      }}
      onOpenProblemSearch={() => rootApp?.setShowProblemSearch(true)}
      theme={rootApp?.theme || 'dark'}
      onToggleTheme={() => rootApp?.setTheme(rootApp.theme === 'dark' ? 'light' : 'dark')}
    />
  );
};
