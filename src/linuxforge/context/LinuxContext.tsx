import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import {
  LINUX_15_TOPICS,
  ALL_LINUX_CONCEPTS,
  UniversalLinuxConcept,
  LinuxTopic,
  getLinuxConceptById,
} from '../data/topics';
import { defaultLinuxSimulator, LinuxExecutionResult } from '../data/linuxSimulatorEngine';

export type LinuxMode = 'academy' | 'universe' | 'practice' | 'reference';

export interface TerminalEntry {
  command?: string;
  stdout?: string[];
  stderr?: string[];
  exitCode?: number;
}

export interface LinuxContextType {
  mode: LinuxMode;
  setMode: (m: LinuxMode) => void;

  // Curriculum state
  activeTopicId: string;
  setActiveTopicId: (id: string) => void;
  activeConceptId: string;
  setActiveConceptId: (id: string) => void;
  currentConcept: UniversalLinuxConcept;
  completedConceptIds: string[];
  markConceptComplete: (id: string) => void;

  // Terminal & Command Pipeline
  terminalHistory: TerminalEntry[];
  executeCommand: (cmd: string) => LinuxExecutionResult;
  clearTerminal: () => void;
}

const LinuxContext = createContext<LinuxContextType | null>(null);

const STORAGE_KEY_COMPLETED = 'linuxforge_completed_concepts';
const STORAGE_KEY_LAST_CONCEPT = 'linuxforge_active_concept';

export const LinuxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<LinuxMode>(() => {
    try {
      const saved = localStorage.getItem('linuxforge_initial_mode') as LinuxMode;
      if (saved && ['academy', 'universe', 'practice', 'reference'].includes(saved)) {
        localStorage.removeItem('linuxforge_initial_mode');
        return saved;
      }
    } catch {
      // ignore
    }
    return 'academy';
  });

  const [activeConceptId, setActiveConceptIdState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LAST_CONCEPT);
      if (saved && ALL_LINUX_CONCEPTS.some((c) => c.id === saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return ALL_LINUX_CONCEPTS[0]?.id || 'c-unix-philosophy';
  });

  const [activeTopicId, setActiveTopicIdState] = useState<string>(() => {
    const concept = getLinuxConceptById(activeConceptId);
    return concept?.topicId || LINUX_15_TOPICS[0]?.id || 'topic-01';
  });

  const [completedConceptIds, setCompletedConceptIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [terminalHistory, setTerminalHistory] = useState<TerminalEntry[]>([
    {
      stdout: [
        'LinuxForge SRE Academy Shell v6.8',
        'Kernel 6.8.0-45-generic x86_64 · Type "help" or run concept commands.',
      ],
    },
  ]);

  const setActiveConceptId = useCallback((id: string) => {
    setActiveConceptIdState(id);
    try {
      localStorage.setItem(STORAGE_KEY_LAST_CONCEPT, id);
    } catch {
      // ignore
    }
    const concept = getLinuxConceptById(id);
    if (concept && concept.topicId) {
      setActiveTopicIdState(concept.topicId);
    }
  }, []);

  const setActiveTopicId = useCallback((id: string) => {
    setActiveTopicIdState(id);
    const topic = LINUX_15_TOPICS.find((t) => t.id === id);
    if (topic && topic.concepts.length > 0) {
      setActiveConceptIdState(topic.concepts[0].id);
      try {
        localStorage.setItem(STORAGE_KEY_LAST_CONCEPT, topic.concepts[0].id);
      } catch {
        // ignore
      }
    }
  }, []);

  const markConceptComplete = useCallback((id: string) => {
    setCompletedConceptIds((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const executeCommand = useCallback((cmd: string): LinuxExecutionResult => {
    const result = defaultLinuxSimulator.execute(cmd);
    setTerminalHistory((prev) => [
      ...prev,
      {
        command: cmd,
        stdout: result.stdout,
        stderr: result.stderr,
        exitCode: result.exitCode,
      },
    ]);
    return result;
  }, []);

  const clearTerminal = useCallback(() => {
    setTerminalHistory([]);
  }, []);

  const currentConcept = useMemo(() => {
    return getLinuxConceptById(activeConceptId) || ALL_LINUX_CONCEPTS[0];
  }, [activeConceptId]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      activeTopicId,
      setActiveTopicId,
      activeConceptId,
      setActiveConceptId,
      currentConcept,
      completedConceptIds,
      markConceptComplete,
      terminalHistory,
      executeCommand,
      clearTerminal,
    }),
    [
      mode,
      activeTopicId,
      setActiveTopicId,
      activeConceptId,
      setActiveConceptId,
      currentConcept,
      completedConceptIds,
      markConceptComplete,
      terminalHistory,
      executeCommand,
      clearTerminal,
    ]
  );

  return <LinuxContext.Provider value={value}>{children}</LinuxContext.Provider>;
};

export const useLinux = (): LinuxContextType => {
  const context = useContext(LinuxContext);
  if (!context) {
    throw new Error('useLinux must be used within a LinuxProvider');
  }
  return context;
};
