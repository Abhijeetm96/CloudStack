import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { HeaderNav } from './components/layout/HeaderNav';
import { PodAcademyView } from './components/academy/PodAcademyView';
import { PodConceptsUniverseView } from './components/universe/PodConceptsUniverseView';
import { EnterpriseKubeSimulator } from './components/simulators/EnterpriseKubeSimulator';
import { PodLabsHubView } from './components/labs/PodLabsHubView';
import { ClusterIdeView } from './components/ide/ClusterIdeView';
import { ClusterCanvas } from './components/visualizer/ClusterCanvas';
import { UniversalLessonRuntime } from '../platform/lesson-runtime/UniversalLessonRuntime';
import { KubeRuntimeAdapter, kubeLessonAdapter } from '../platform/adapters/kubeAdapter';
import { ViewMode } from '../context/AppContext';
import './styles/kubernetes.css';

interface KubernetesAcademyAppProps {
  initialConceptId?: string;
  onSwitchToSuite?: (mode: ViewMode) => void;
}

const KubernetesAcademyContent: React.FC<KubernetesAcademyAppProps> = ({ onSwitchToSuite, initialConceptId }) => {
  const { mode, setMode, activeConcept, setActiveConceptId, engine } = useApp();
  const prevInitialRef = React.useRef<string | undefined>(initialConceptId);

  React.useEffect(() => {
    if (initialConceptId && initialConceptId !== prevInitialRef.current) {
      prevInitialRef.current = initialConceptId;
      if (initialConceptId !== activeConcept.id) {
        setActiveConceptId(initialConceptId);
      }
      if (mode !== 'academy') {
        setMode('academy');
      }
    }
  }, [initialConceptId, activeConcept.id, mode, setActiveConceptId, setMode]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', overflow: 'hidden' }}>
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
        {mode === 'academy' && <PodAcademyView onSwitchToSuite={onSwitchToSuite} />}
        {mode === 'universe' && <PodConceptsUniverseView />}
        {mode === 'practice' && <EnterpriseKubeSimulator />}
        {(mode === 'lesson' || mode === 'guided-lesson') && (
          <UniversalLessonRuntime
            lesson={kubeLessonAdapter(activeConcept)}
            adapter={new KubeRuntimeAdapter(engine)}
            onNextLesson={() => setMode('academy')}
            onPrevLesson={() => setMode('academy')}
          />
        )}
        {mode === 'labs' && <PodLabsHubView />}
        {mode === 'ide' && <ClusterIdeView />}
        {mode === 'cluster' && <ClusterCanvas />}
      </main>
    </div>
  );
};

export const KubernetesAcademyApp: React.FC<KubernetesAcademyAppProps> = (props) => {
  return (
    <AppProvider>
      <KubernetesAcademyContent {...props} />
    </AppProvider>
  );
};
