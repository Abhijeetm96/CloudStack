import React, { useState } from 'react';
import { UniversalDockerConcept } from '../../data/unifiedDockerData';
import { useDocker } from '../../context/DockerContext';
import {
  Box,
  Layers,
  Network,
  Database,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Server,
  Activity,
  Cpu,
  Shield,
  FileCode,
  HardDrive,
  Radio,
} from 'lucide-react';

interface DockerWorldSimulatorProps {
  concept: UniversalDockerConcept;
  onActionComplete?: () => void;
  showToast: (msg: string) => void;
}

export const DockerWorldSimulator: React.FC<DockerWorldSimulatorProps> = ({
  concept,
  onActionComplete,
  showToast,
}) => {
  const { containers, images, volumes, networks, executeCommand } = useDocker();

  // Prediction State (SEE -> THINK -> ACT -> OBSERVE -> EXPLAIN)
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationCompleted, setSimulationCompleted] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const config = concept.simulatorConfig || {
    mode: 'default',
    initialObjects: { images: ['nginx:latest'], containers: [] },
    actionPrompt: `Simulating ${concept.title}`,
    predictionOptions: [
      { text: 'Docker will execute the command inside isolated Linux namespaces.', isCorrect: true, explanation: 'Correct! Docker guarantees complete process isolation.' },
      { text: 'The entire host operating system will reboot.', isCorrect: false, explanation: 'Incorrect. Containers share the host kernel and never reboot the host.' },
      { text: 'All previous images will be permanently erased.', isCorrect: false, explanation: 'Incorrect. Images are immutable and preserved.' },
    ],
    stateTransition: {
      triggerCommand: concept.command,
      visualConsequence: 'State updated in the simulated Docker Engine.',
      explanation: 'The Docker daemon validated parameters and updated container state.',
    },
  };

  const handlePredict = (index: number) => {
    setSelectedPrediction(index);
    setPredictionSubmitted(true);
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationLog([]);

    const cmd = config.stateTransition.triggerCommand || concept.command;
    setSimulationLog((prev) => [...prev, `[CLI] Executing: ${cmd}`]);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        '[Daemon] Handshake over /var/run/docker.sock... OK',
        '[Storage] OverlayFS mount point verified.',
      ]);
    }, 400);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        `[Kernel] Cloned PID/Net namespaces. Target: ${concept.title}`,
        `[Consequence] ${config.stateTransition.visualConsequence}`,
      ]);
      executeCommand(cmd);
      setIsSimulating(false);
      setSimulationCompleted(true);
      if (onActionComplete) onActionComplete();
      showToast(`🟢 Visual simulation executed: ${cmd}`);
    }, 900);
  };

  const handleResetSimulation = () => {
    setSelectedPrediction(null);
    setPredictionSubmitted(false);
    setIsSimulating(false);
    setSimulationCompleted(false);
    setSimulationLog([]);
    showToast('Simulation state reset.');
  };

  const chosenOption = selectedPrediction !== null ? config.predictionOptions[selectedPrediction] : null;

  return (
    <div
      style={{
        background: '#090d16',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Top Header: Docker Desktop / Host Banner */}
      <div
        style={{
          padding: '0.85rem 1.25rem',
          background: 'rgba(15, 23, 42, 0.85)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              background: 'rgba(56, 189, 248, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
            }}
          >
            <Server size={16} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc' }}>
                Docker Desktop / Host Machine Simulation
              </span>
              <span
                style={{
                  padding: '0.15rem 0.45rem',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                }}
              >
                ● LIVE DOCKER WORLD
              </span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
              Mode: {config.mode.toUpperCase()} • Synchronized with Docker Engine State
            </span>
          </div>
        </div>

        <button
          onClick={handleResetSimulation}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '8px',
            padding: '0.35rem 0.65rem',
            color: '#cbd5e1',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={13} />
          <span>Reset Stage</span>
        </button>
      </div>

      {/* PHASE 1: PREDICTION PROMPT (SEE -> THINK -> ACT -> OBSERVE -> EXPLAIN) */}
      <div
        style={{
          padding: '1rem 1.25rem',
          background: 'rgba(14, 165, 233, 0.04)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Sparkles size={16} color="#38bdf8" />
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
            Phase 1: Prediction Challenge (Think Before You Act)
          </span>
        </div>
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.86rem', color: '#f1f5f9', fontWeight: 600 }}>
          {config.actionPrompt}
        </p>

        {/* 3 Choices */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {config.predictionOptions.map((opt, idx) => {
            const isChosen = selectedPrediction === idx;
            let border = '1px solid rgba(255, 255, 255, 0.1)';
            let bg = 'rgba(255, 255, 255, 0.03)';
            let color = '#cbd5e1';

            if (predictionSubmitted) {
              if (opt.isCorrect) {
                border = '1px solid #10b981';
                bg = 'rgba(16, 185, 129, 0.12)';
                color = '#34d399';
              } else if (isChosen && !opt.isCorrect) {
                border = '1px solid #ef4444';
                bg = 'rgba(239, 68, 68, 0.12)';
                color = '#f87171';
              }
            } else if (isChosen) {
              border = '1px solid #38bdf8';
              bg = 'rgba(56, 189, 248, 0.12)';
              color = '#38bdf8';
            }

            return (
              <button
                key={idx}
                onClick={() => handlePredict(idx)}
                style={{
                  textAlign: 'left',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  border,
                  background: bg,
                  color,
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>
                  <strong>Option {String.fromCharCode(65 + idx)}:</strong> {opt.text}
                </span>
                {predictionSubmitted && opt.isCorrect && <CheckCircle2 size={16} color="#10b981" />}
                {predictionSubmitted && isChosen && !opt.isCorrect && <AlertCircle size={16} color="#ef4444" />}
              </button>
            );
          })}
        </div>

        {/* Feedback explanation after selection */}
        {predictionSubmitted && chosenOption && (
          <div
            style={{
              marginTop: '0.75rem',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              background: chosenOption.isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
              border: `1px solid ${chosenOption.isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
              fontSize: '0.8rem',
              color: chosenOption.isCorrect ? '#34d399' : '#fbbf24',
              lineHeight: 1.5,
            }}
          >
            <strong>{chosenOption.isCorrect ? '🎯 Accurate!' : '💡 Senior Engineer Insight:'}</strong>{' '}
            {chosenOption.explanation}
          </div>
        )}
      </div>

      {/* PHASE 2: VISUAL DOCKER WORLD CANVAS */}
      <div
        style={{
          padding: '1.25rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          background: '#060a12',
        }}
      >
        {/* PANEL 1: IMAGE LIBRARY */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.65rem' }}>
            <Layers size={16} color="#38bdf8" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f1f5f9', textTransform: 'uppercase' }}>
              Image Library ({images.length})
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
            {images.map((img) => (
              <div
                key={img.id}
                style={{
                  background: 'rgba(56, 189, 248, 0.06)',
                  border: '1px solid rgba(56, 189, 248, 0.2)',
                  borderRadius: '8px',
                  padding: '0.5rem 0.65rem',
                  fontSize: '0.76rem',
                }}
              >
                <div style={{ fontWeight: 700, color: '#38bdf8' }}>
                  {img.repository}:{img.tag}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px' }}>
                  ID: {img.id.slice(0, 10)} • {img.sizeMb}MB • Read-only
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 2: CONTAINERS */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.65rem' }}>
            <Box size={16} color="#10b981" />
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f1f5f9', textTransform: 'uppercase' }}>
              Containers ({containers.length})
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
            {containers.length === 0 ? (
              <div
                style={{
                  padding: '1.25rem',
                  textAlign: 'center',
                  color: '#64748b',
                  fontSize: '0.76rem',
                  border: '1px dashed rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                }}
              >
                No active containers. Run simulation to spawn.
              </div>
            ) : (
              containers.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: 'rgba(16, 185, 129, 0.06)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.65rem',
                    fontSize: '0.76rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 800, color: '#f8fafc' }}>{c.name}</span>
                    <span
                      style={{
                        padding: '0.1rem 0.35rem',
                        borderRadius: '4px',
                        background: c.status === 'running' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: c.status === 'running' ? '#34d399' : '#f87171',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      ● {c.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px' }}>
                    {c.imageName || c.imageId} {c.ports?.length ? `• Port ${c.ports[0].hostPort}→${c.ports[0].containerPort}` : ''}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* PANEL 3: NETWORK & VOLUMES */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {/* Networks */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
              <Network size={15} color="#a855f7" />
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#f1f5f9', textTransform: 'uppercase' }}>
                Networks ({networks.length})
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {networks.map((net) => (
                <span
                  key={net.id}
                  style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: '6px',
                    background: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    color: '#c084fc',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                  }}
                >
                  {net.name} ({net.driver})
                </span>
              ))}
            </div>
          </div>

          {/* Volumes */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
              <Database size={15} color="#f59e0b" />
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#f1f5f9', textTransform: 'uppercase' }}>
                Volumes ({volumes.length})
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {volumes.length === 0 ? (
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>No persistent volumes attached</span>
              ) : (
                volumes.map((vol) => (
                  <span
                    key={vol.name}
                    style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      color: '#fbbf24',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                    }}
                  >
                    💾 {vol.name}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PHASE 3: EXECUTION ACTION BAR */}
      <div
        style={{
          padding: '0.85rem 1.25rem',
          background: 'rgba(15, 23, 42, 0.9)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <code
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '6px',
              background: '#040711',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#4ade80',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
            }}
          >
            $ {config.stateTransition.triggerCommand || concept.command}
          </code>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.45rem 1rem',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: isSimulating ? 'not-allowed' : 'pointer',
            opacity: isSimulating ? 0.7 : 1,
            boxShadow: '0 4px 15px rgba(14, 165, 233, 0.35)',
          }}
        >
          <Play size={14} fill="#fff" />
          <span>{isSimulating ? 'Simulating...' : 'Execute Simulation Transition'}</span>
        </button>
      </div>

      {/* Simulation Log Stream */}
      {simulationLog.length > 0 && (
        <div
          style={{
            padding: '0.75rem 1.25rem',
            background: '#02050c',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            fontFamily: 'monospace',
            fontSize: '0.74rem',
            color: '#94a3b8',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {simulationLog.map((log, i) => (
            <div key={i} style={{ color: log.includes('Consequence') ? '#38bdf8' : '#cbd5e1' }}>
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
