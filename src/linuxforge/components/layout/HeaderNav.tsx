import React from 'react';
import { useLinux } from '../../context/LinuxContext';
import { useApp } from '../../../context/AppContext';
import { StandardAcademyHeaderNav } from '../../../platform/layout/StandardAcademyHeaderNav';
import { Terminal } from 'lucide-react';
import { ViewMode } from '../../../context/AppContext';
import { TOTAL_LINUX_CONCEPTS } from '../../data/topics';

interface HeaderNavProps {
  onSwitchToSuite?: (mode: ViewMode) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onSwitchToSuite }) => {
  const { mode, setMode, completedConceptIds } = useLinux();
  const rootApp = useApp();

  const handleSelectMode = (newMode: string) => {
    if (newMode === 'learn') setMode('academy');
    else if (newMode === 'universe') setMode('universe');
    else if (newMode === 'practice') setMode('practice');
    else if (newMode === 'reference') setMode('reference');
    else setMode(newMode as any);
  };

  const activeTabId =
    mode === 'academy'
      ? 'learn'
      : mode === 'universe'
      ? 'universe'
      : mode === 'practice'
      ? 'practice'
      : mode === 'reference'
      ? 'reference'
      : 'learn';

  return (
    <StandardAcademyHeaderNav
      academyId="linuxforge"
      brandTitle="LinuxForge"
      brandTagline="Linux Systems, Kernel & DevOps Academy"
      brandIcon={Terminal}
      brandGradient="linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
      brandColor="#06b6d4"
      activeMode={activeTabId}
      onSelectMode={handleSelectMode}
      onSwitchToSuite={onSwitchToSuite}
      universeConceptCount={TOTAL_LINUX_CONCEPTS}
      statusPill={{
        label: 'Kernel 6.8 · Active Shell',
        dotColor: '#22c55e',
      }}
      masteredPill={{
        count: completedConceptIds.length,
        total: TOTAL_LINUX_CONCEPTS,
      }}
      tabs={[
        { id: 'learn', label: 'Learn' },
        {
          id: 'universe',
          label: `${TOTAL_LINUX_CONCEPTS} Concepts`,
          isUniverse: true,
          conceptCount: TOTAL_LINUX_CONCEPTS,
        },
        { id: 'practice', label: 'Practice' },
        { id: 'reference', label: 'Reference' },
      ]}
      theme={rootApp.theme}
      onToggleTheme={() => rootApp.setTheme(rootApp.theme === 'dark' ? 'light' : 'dark')}
    />
  );
};
