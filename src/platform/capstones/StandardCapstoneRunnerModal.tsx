import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Terminal,
  ShieldCheck,
  Award,
  ChevronRight,
  ChevronDown,
  Info,
  Clock,
  RotateCcw,
  Sparkles,
  Flame,
  FileCode,
  Zap,
} from 'lucide-react';
import { CapstoneProject, ArchitectureNode } from './types';
import {
  getCapstoneProgress,
  markTaskComplete,
  markTaskIncomplete,
  submitCapstone,
  resetCapstoneProgress,
} from './capstoneProgress';

interface StandardCapstoneRunnerModalProps {
  project: CapstoneProject;
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: () => void;
}

export const StandardCapstoneRunnerModal: React.FC<StandardCapstoneRunnerModalProps> = ({
  project,
  isOpen,
  onClose,
  onCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'requirements' | 'tasks' | 'failures' | 'validation'>('architecture');
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(
    project.architecture.nodes[0] || null
  );
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});
  const [terminalOutput, setTerminalOutput] = useState<string>(
    `[CloudStack Terminal] Environment: ${project.startingState.environment}\nType commands or click "Run in Terminal" for any task.\n`
  );
  const [progress, setProgress] = useState(() => getCapstoneProgress(project.id));
  const [validationRun, setValidationRun] = useState(false);
  const [activeFile, setActiveFile] = useState<string>(
    Object.keys(project.startingState.startingFiles || {})[0] || ''
  );

  useEffect(() => {
    setProgress(getCapstoneProgress(project.id));
    if (project.architecture.nodes.length > 0) {
      setSelectedNode(project.architecture.nodes[0]);
    }
    const files = Object.keys(project.startingState.startingFiles || {});
    if (files.length > 0) {
      setActiveFile(files[0]);
    }
  }, [project]);

  if (!isOpen) return null;

  const handleToggleHint = (taskId: string) => {
    setExpandedHints((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleToggleTask = (taskId: string) => {
    if (progress.completedTasks.includes(taskId)) {
      const updated = markTaskIncomplete(project.id, taskId);
      setProgress(updated);
    } else {
      const updated = markTaskComplete(project.id, taskId);
      setProgress(updated);
    }
  };

  const handleRunTask = (command: string, expectedOutput: string, taskId: string) => {
    setTerminalOutput((prev) => `${prev}\n$ ${command}\n${expectedOutput}\n✔ [Exit Code: 0]\n`);
    const updated = markTaskComplete(project.id, taskId);
    setProgress(updated);
  };

  const handleRunAllValidation = () => {
    setValidationRun(true);
    const allTaskIds = project.tasks.map((t) => t.id);
    const updated = submitCapstone(project.id, project.scoreMax, allTaskIds);
    setProgress(updated);
    if (onCompleted) onCompleted();
  };

  const handleReset = () => {
    const reset = resetCapstoneProgress(project.id);
    setProgress(reset);
    setValidationRun(false);
    setTerminalOutput(
      `[CloudStack Terminal] Reset completed. Environment: ${project.startingState.environment}\n`
    );
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return '#10b981';
      case 'Intermediate':
        return '#38bdf8';
      case 'Advanced':
        return '#a855f7';
      case 'Production':
        return '#f59e0b';
      case 'Expert':
        return '#ef4444';
      default:
        return '#38bdf8';
    }
  };

  const startingFiles = project.startingState.startingFiles || {};
  const completedCount = progress.completedTasks.length;
  const totalTasks = project.tasks.length;
  const percentComplete = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <div className="capstone-modal-backdrop" onClick={onClose}>
      <div className="capstone-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="capstone-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                color: '#38bdf8',
                fontWeight: 800,
                fontSize: '0.85rem',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                letterSpacing: '0.04em',
              }}
            >
              {project.code}
            </span>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
              {project.title}
            </h2>
            <span
              style={{
                background: `${getDifficultyColor(project.difficulty)}22`,
                color: getDifficultyColor(project.difficulty),
                border: `1px solid ${getDifficultyColor(project.difficulty)}55`,
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.2rem 0.5rem',
                borderRadius: '999px',
                textTransform: 'uppercase',
              }}
            >
              {project.difficulty}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                color: '#94a3b8',
                fontSize: '0.8rem',
              }}
            >
              <Clock size={13} /> {project.estimatedTime}
            </span>
            {progress.completed && (
              <span
                style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#10b981',
                  border: '1px solid #10b981',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <CheckCircle2 size={13} /> COMPLETED ({progress.score}/{project.scoreMax} pts)
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleReset}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(71, 85, 105, 0.5)',
                color: '#94a3b8',
                padding: '0.4rem 0.75rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
              title="Reset Project Progress"
            >
              <RotateCcw size={13} /> Reset
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '0.4rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="capstone-modal-tabs">
          <button
            className={`capstone-modal-tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            <Layers size={16} /> Architecture &amp; Diagram
          </button>
          <button
            className={`capstone-modal-tab-btn ${activeTab === 'requirements' ? 'active' : ''}`}
            onClick={() => setActiveTab('requirements')}
          >
            <Info size={16} /> Requirements &amp; Files
          </button>
          <button
            className={`capstone-modal-tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <Terminal size={16} /> Tasks &amp; Playground ({completedCount}/{totalTasks})
          </button>
          <button
            className={`capstone-modal-tab-btn ${activeTab === 'failures' ? 'active' : ''}`}
            onClick={() => setActiveTab('failures')}
          >
            <Flame size={16} /> Failure Scenarios ({project.failureScenarios.length})
          </button>
          <button
            className={`capstone-modal-tab-btn ${activeTab === 'validation' ? 'active' : ''}`}
            onClick={() => setActiveTab('validation')}
          >
            <Award size={16} /> Validation &amp; Submission
          </button>
        </div>

        {/* Modal Body */}
        <div className="capstone-modal-body">
          {/* TAB 1: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#f8fafc', fontSize: '1.15rem' }}>
                  System Architecture &amp; Dataflow
                </h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {project.architecture.summary}
                </p>
              </div>

              {/* Interactive Visual Node Diagram */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600 }}>
                  CLICK ANY COMPONENT TO INSPECT ITS ROLE AND ARCHITECTURAL RESPONSIBILITY:
                </div>
                <div className="arch-diagram-flow">
                  {project.architecture.nodes.map((node, index) => {
                    const isSelected = selectedNode?.id === node.id;
                    return (
                      <React.Fragment key={node.id}>
                        <div
                          className={`arch-node-chip ${isSelected ? 'selected' : ''}`}
                          onClick={() => setSelectedNode(node)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>
                              #{index + 1}
                            </span>
                            <span
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: node.status === 'degraded' ? '#ef4444' : '#10b981',
                                boxShadow: `0 0 6px ${node.status === 'degraded' ? '#ef4444' : '#10b981'}`,
                              }}
                            />
                          </div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f1f5f9' }}>
                            {node.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                            {node.role}
                          </div>
                        </div>
                        {index < project.architecture.nodes.length - 1 && (
                          <span className="arch-arrow">➔</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Selected Node Inspector Detail */}
              {selectedNode && (
                <div
                  style={{
                    background: 'rgba(30, 41, 59, 0.7)',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, color: '#38bdf8', fontSize: '1rem', fontWeight: 700 }}>
                      Component Inspector: {selectedNode.name}
                    </h4>
                    <span
                      style={{
                        background: 'rgba(15, 23, 42, 0.8)',
                        color: '#cbd5e1',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      Role: {selectedNode.role}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 0.75rem 0', color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {selectedNode.description}
                  </p>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {selectedNode.technologies.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(56, 189, 248, 0.25)',
                          color: '#38bdf8',
                          fontSize: '0.75rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Architectural Description */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.5)',
                  border: '1px solid rgba(51, 65, 85, 0.5)',
                  borderRadius: '10px',
                  padding: '1rem',
                }}
              >
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, marginBottom: '0.35rem' }}>
                  DATAFLOW SEQUENCING
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.88rem', lineHeight: '1.6' }}>
                  {project.architecture.flowDescription}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REQUIREMENTS & FILES */}
          {activeTab === 'requirements' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#f8fafc', fontSize: '1.15rem' }}>
                  Project Objectives &amp; Requirements
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>
                  {project.overview}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(51, 65, 85, 0.6)',
                      borderRadius: '10px',
                      padding: '1rem',
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.5rem' }}>
                      KEY OBJECTIVES
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6' }}>
                      {project.objectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgba(51, 65, 85, 0.6)',
                      borderRadius: '10px',
                      padding: '1rem',
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.5rem' }}>
                      TECHNICAL PREREQUISITES
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6' }}>
                      {project.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Starting Files Viewer */}
              {Object.keys(startingFiles).length > 0 && (
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#f1f5f9', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileCode size={16} color="#38bdf8" /> Initial Starting Files
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(51, 65, 85, 0.6)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    {/* File list sidebar */}
                    <div
                      style={{
                        width: '200px',
                        borderRight: '1px solid rgba(51, 65, 85, 0.6)',
                        padding: '0.5rem',
                        background: 'rgba(10, 15, 29, 0.9)',
                      }}
                    >
                      {Object.keys(startingFiles).map((filename) => (
                        <button
                          key={filename}
                          onClick={() => setActiveFile(filename)}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            background: activeFile === filename ? 'rgba(56, 189, 248, 0.15)' : 'none',
                            color: activeFile === filename ? '#38bdf8' : '#94a3b8',
                            border: 'none',
                            padding: '0.4rem 0.6rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontFamily: 'monospace',
                            display: 'block',
                            marginBottom: '0.2rem',
                          }}
                        >
                          {filename}
                        </button>
                      ))}
                    </div>

                    {/* File content viewer */}
                    <div style={{ flex: 1, padding: '1rem', background: '#070b14', overflowX: 'auto' }}>
                      <pre
                        style={{
                          margin: 0,
                          fontSize: '0.82rem',
                          color: '#e2e8f0',
                          fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                        }}
                      >
                        {startingFiles[activeFile] || '// Select a file to view content'}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TASKS & TERMINAL PLAYGROUND */}
          {activeTab === 'tasks' && (
            <div>
              {/* Progress Tracker */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(51, 65, 85, 0.6)',
                  borderRadius: '10px',
                  padding: '0.85rem 1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f8fafc' }}>
                    Challenge Progression: {completedCount} of {totalTasks} Tasks Verified
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Complete each step or click &quot;Run in Terminal&quot; to test execution.
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '180px' }}>
                  <div
                    style={{
                      flex: 1,
                      height: '8px',
                      background: 'rgba(51, 65, 85, 0.5)',
                      borderRadius: '999px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${percentComplete}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #0ea5e9, #10b981)',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8' }}>
                    {percentComplete}%
                  </span>
                </div>
              </div>

              {/* Two Column: Tasks Checklist on Left, Terminal Simulator on Right */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
                {/* Left: Task List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {project.tasks.map((task, idx) => {
                    const isDone = progress.completedTasks.includes(task.id);
                    const showHints = expandedHints[task.id];

                    return (
                      <div
                        key={task.id}
                        style={{
                          background: isDone ? 'rgba(16, 185, 129, 0.08)' : 'rgba(30, 41, 59, 0.5)',
                          border: isDone
                            ? '1px solid rgba(16, 185, 129, 0.35)'
                            : '1px solid rgba(51, 65, 85, 0.6)',
                          borderRadius: '10px',
                          padding: '1rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <button
                            onClick={() => handleToggleTask(task.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: isDone ? '#10b981' : '#64748b',
                              cursor: 'pointer',
                              padding: 0,
                              marginTop: '2px',
                            }}
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                              <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: isDone ? '#10b981' : '#f1f5f9' }}>
                                Task {idx + 1}: {task.title}
                              </h4>
                              <button
                                onClick={() => handleRunTask(task.commandSnippet, task.expectedOutput, task.id)}
                                style={{
                                  background: 'rgba(56, 189, 248, 0.15)',
                                  border: '1px solid rgba(56, 189, 248, 0.4)',
                                  color: '#38bdf8',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  padding: '0.2rem 0.5rem',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.3rem',
                                }}
                              >
                                <Play size={11} /> Run in Terminal
                              </button>
                            </div>

                            <p style={{ margin: '0 0 0.5rem 0', color: '#cbd5e1', fontSize: '0.85rem' }}>
                              {task.objective}
                            </p>

                            {/* Command Syntax Box */}
                            <div
                              style={{
                                background: '#070b14',
                                border: '1px solid rgba(51, 65, 85, 0.5)',
                                borderRadius: '6px',
                                padding: '0.5rem 0.75rem',
                                marginBottom: '0.5rem',
                                fontFamily: 'Consolas, monospace',
                                fontSize: '0.78rem',
                                color: '#38bdf8',
                                overflowX: 'auto',
                              }}
                            >
                              <code>{task.commandSnippet}</code>
                            </div>

                            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
                              <strong style={{ color: '#cbd5e1' }}>Verification:</strong> {task.verificationCriteria}
                            </div>

                            {/* Hints Accordion */}
                            {task.hints && task.hints.length > 0 && (
                              <div>
                                <button
                                  onClick={() => handleToggleHint(task.id)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#64748b',
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                  }}
                                >
                                  {showHints ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                                  {showHints ? 'Hide Hints' : `Show Hints (${task.hints.length})`}
                                </button>
                                {showHints && (
                                  <ul
                                    style={{
                                      margin: '0.4rem 0 0 0',
                                      paddingLeft: '1.25rem',
                                      fontSize: '0.78rem',
                                      color: '#94a3b8',
                                    }}
                                  >
                                    {task.hints.map((h, i) => (
                                      <li key={i}>{h}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right: Interactive Terminal Simulator */}
                <div>
                  <div
                    style={{
                      background: '#040711',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      height: '100%',
                      minHeight: '480px',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        padding: '0.5rem 0.75rem',
                        background: 'rgba(15, 23, 42, 0.9)',
                        borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '0.5rem', fontWeight: 600 }}>
                          Interactive Command Playground
                        </span>
                      </div>
                      <button
                        onClick={() => setTerminalOutput(`[CloudStack Terminal] Cleared.\n`)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#64748b',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                        }}
                      >
                        Clear
                      </button>
                    </div>

                    <div style={{ flex: 1, padding: '0.75rem', overflowY: 'auto' }}>
                      <pre
                        style={{
                          margin: 0,
                          color: '#10b981',
                          fontSize: '0.78rem',
                          fontFamily: 'Consolas, Monaco, monospace',
                          whiteSpace: 'pre-wrap',
                          lineHeight: '1.5',
                        }}
                      >
                        {terminalOutput}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAILURE SCENARIOS & TROUBLESHOOTING */}
          {activeTab === 'failures' && (
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#f8fafc', fontSize: '1.15rem' }}>
                  Failure Scenarios &amp; Disaster Recovery Runbooks
                </h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
                  Real-world catastrophic conditions tested in this project. Study the symptoms, diagnostic commands, and immediate fixes:
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {project.failureScenarios.map((failure) => (
                  <div
                    key={failure.id}
                    style={{
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '1px solid rgba(239, 68, 68, 0.35)',
                      borderRadius: '12px',
                      padding: '1.25rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <AlertTriangle size={18} color="#ef4444" />
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#f87171' }}>
                        {failure.title}
                      </h4>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.2rem' }}>
                          OBSERVED SYMPTOM
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#f1f5f9' }}>
                          {failure.symptom}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.2rem' }}>
                          ROOT CAUSE
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#f1f5f9' }}>
                          {failure.rootCause}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.2rem' }}>
                        DIAGNOSTIC COMMAND
                      </div>
                      <div
                        style={{
                          background: '#070b14',
                          padding: '0.4rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontFamily: 'monospace',
                          color: '#38bdf8',
                        }}
                      >
                        {failure.diagnosticCommand}
                      </div>
                    </div>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', marginBottom: '0.2rem' }}>
                        RECOVERY &amp; FIX COMMAND
                      </div>
                      <div
                        style={{
                          background: '#070b14',
                          padding: '0.4rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontFamily: 'monospace',
                          color: '#10b981',
                        }}
                      >
                        {failure.fixCommand}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      <strong style={{ color: '#cbd5e1' }}>Preventative Measure:</strong> {failure.preventativeMeasures}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: VALIDATION & FINAL SUBMISSION */}
          {activeTab === 'validation' && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#f8fafc', fontSize: '1.15rem' }}>
                  Automated Checkpoints &amp; Capstone Submission
                </h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
                  Verify that all measurable criteria pass before submitting your final solution for official scoring.
                </p>
              </div>

              {/* Validation Criteria Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {project.validationChecks.map((check, idx) => {
                  const passed = validationRun || progress.completed;

                  return (
                    <div
                      key={check.id}
                      style={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: passed
                          ? '1px solid rgba(16, 185, 129, 0.5)'
                          : '1px solid rgba(51, 65, 85, 0.6)',
                        borderRadius: '10px',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <CheckCircle2 size={20} color={passed ? '#10b981' : '#64748b'} />
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: passed ? '#f1f5f9' : '#cbd5e1' }}>
                            {idx + 1}. {check.label}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>
                            {check.verificationCommand}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          background: 'rgba(56, 189, 248, 0.12)',
                          color: '#38bdf8',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                        }}
                      >
                        +{check.points} pts
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#f8fafc', fontSize: '1.05rem', fontWeight: 800 }}>
                    Final Score Evaluation: {progress.completed ? project.scoreMax : validationRun ? project.scoreMax : 0} / {project.scoreMax} Points
                  </h4>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                    {progress.completed
                      ? 'Capstone officially mastered and logged in browser storage.'
                      : 'Run automated checks to verify all criteria and award your badge.'}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={handleRunAllValidation}
                    style={{
                      background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                      border: 'none',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      padding: '0.65rem 1.25rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      boxShadow: '0 4px 14px rgba(14, 165, 233, 0.4)',
                    }}
                  >
                    <Sparkles size={16} /> Run Automated Checks &amp; Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
