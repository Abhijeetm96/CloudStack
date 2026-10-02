import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ShieldCheck,
  Award,
  ChevronRight,
  Clock,
  RotateCcw,
  Sparkles,
  FileCode,
  Check,
  Copy,
  ExternalLink,
  Target,
  Briefcase,
  AlertOctagon,
  Boxes,
  Compass,
  BookOpen,
  Terminal,
  FolderTree,
  ListChecks,
  TrendingUp,
  Cpu,
  BookmarkCheck,
  Play,
} from 'lucide-react';
import { CapstoneProject, CapstoneAcademy, CapstoneDifficulty } from './types';
import {
  getCapstoneBriefProgress,
  setCapstoneStatus,
  toggleChecklistItem,
  resetCapstoneBriefProgress,
} from './capstoneProgress';

export interface StandardCapstoneRunnerModalProps {
  project: CapstoneProject;
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: () => void;
}

type TabKey =
  | 'all'
  | 'overview'
  | 'architecture'
  | 'requirements'
  | 'structure'
  | 'guide'
  | 'checklist';

export const StandardCapstoneRunnerModal: React.FC<StandardCapstoneRunnerModalProps> = ({
  project,
  isOpen,
  onClose,
  onCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [briefProgress, setBriefProgress] = useState(() => getCapstoneBriefProgress(project.id));
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    setBriefProgress(getCapstoneBriefProgress(project.id));
  }, [project.id, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2000);
  };

  const checklistItems = project.completionChecklist || [];
  const checkedIndices = briefProgress.checkedChecklistIndices || [];
  const checklistCount = checklistItems.length;
  const checkedCount = checkedIndices.length;
  const checklistPercentage =
    checklistCount > 0 ? Math.round((checkedCount / checklistCount) * 100) : 0;

  const handleStatusChange = (status: 'not_started' | 'in_progress' | 'completed') => {
    const updated = setCapstoneStatus(project.id, status);
    setBriefProgress({ ...updated });
    if (status === 'completed' && onCompleted) {
      onCompleted();
    }
  };

  const handleToggleCheck = (index: number) => {
    const updated = toggleChecklistItem(project.id, index);
    setBriefProgress({ ...updated });
    if (updated.status === 'completed' && onCompleted) {
      onCompleted();
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your progress for this project?')) {
      const reset = resetCapstoneBriefProgress(project.id);
      setBriefProgress({ ...reset });
    }
  };

  const getAcademyDetails = (academy: CapstoneAcademy) => {
    switch (academy) {
      case 'git':
        return { label: 'Git Academy', color: '#f05032', bg: 'rgba(240, 80, 50, 0.12)' };
      case 'linux':
        return { label: 'Linux Academy', color: '#eab308', bg: 'rgba(234, 179, 8, 0.12)' };
      case 'docker':
        return { label: 'Docker Academy', color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.12)' };
      case 'devops':
        return { label: 'DevOps Academy', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.12)' };
      case 'terraform':
        return { label: 'Terraform Academy', color: '#844fba', bg: 'rgba(132, 79, 186, 0.12)' };
      case 'kubernetes':
        return { label: 'Kubernetes Academy', color: '#326ce5', bg: 'rgba(50, 108, 229, 0.12)' };
      case 'cross-academy':
        return { label: 'Cross-Academy Platform', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' };
      default:
        return { label: academy, color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' };
    }
  };

  const getDifficultyColor = (diff: CapstoneDifficulty) => {
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

  const academyInfo = getAcademyDetails(project.academy);
  const diffColor = getDifficultyColor(project.difficulty);

  // Normalize requirements data
  const reqFunctional = Array.isArray(project.requirements)
    ? project.requirements
    : project.requirements.functional || [];
  const reqTechnical = Array.isArray(project.requirements)
    ? []
    : project.requirements.technical || [];
  const reqSecurity = Array.isArray(project.requirements)
    ? []
    : project.requirements.security || [];
  const reqOperational = Array.isArray(project.requirements)
    ? []
    : project.requirements.operational || [];

  return (
    <div className="capstone-modal-backdrop" onClick={onClose}>
      <div
        className="capstone-modal-window"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1240px',
          height: '92vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#090d16',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.12)',
        }}
      >
        {/* ========================================================================= */}
        {/* MODAL HEADER: Project Brief Title Bar                                      */}
        {/* ========================================================================= */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(9, 13, 22, 0.98) 100%)',
            borderBottom: '1px solid rgba(51, 65, 85, 0.7)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1.5rem',
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  background: academyInfo.bg,
                  color: academyInfo.color,
                  border: `1px solid ${academyInfo.color}40`,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {academyInfo.label}
              </span>

              <span
                style={{
                  background: `${diffColor}18`,
                  color: diffColor,
                  border: `1px solid ${diffColor}40`,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  textTransform: 'uppercase',
                }}
              >
                {project.difficulty}
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: '#94a3b8',
                  fontSize: '0.75rem',
                  background: 'rgba(30, 41, 59, 0.6)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(71, 85, 105, 0.4)',
                }}
              >
                <Clock size={12} /> {project.estimatedTime}
              </span>

              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#38bdf8',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  background: 'rgba(56, 189, 248, 0.1)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                }}
              >
                {project.code}
              </span>
            </div>

            <h2
              style={{
                margin: '0 0 0.4rem 0',
                fontSize: '1.45rem',
                fontWeight: 900,
                color: '#f8fafc',
                letterSpacing: '-0.02em',
              }}
            >
              {project.title}
            </h2>

            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.5', maxWidth: '880px' }}>
              {project.projectOverview?.shortDescription || project.overview}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(71, 85, 105, 0.6)',
                color: '#94a3b8',
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
              }}
              title="Close (Esc)"
              aria-label="Close project brief"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STATUS & PROGRESS BAR (Self-Directed Learner Controls)                     */}
        {/* ========================================================================= */}
        <div
          style={{
            padding: '0.85rem 1.75rem',
            background: 'rgba(15, 23, 42, 0.65)',
            borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Status buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Project Status:</span>

            <div style={{ display: 'flex', gap: '0.35rem', background: 'rgba(2, 6, 23, 0.6)', padding: '0.25rem', borderRadius: '8px', border: '1px solid rgba(51, 65, 85, 0.6)' }}>
              <button
                onClick={() => handleStatusChange('not_started')}
                style={{
                  background: briefProgress.status === 'not_started' ? 'rgba(71, 85, 105, 0.5)' : 'transparent',
                  color: briefProgress.status === 'not_started' ? '#f1f5f9' : '#94a3b8',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                Not Started
              </button>

              <button
                onClick={() => handleStatusChange('in_progress')}
                style={{
                  background: briefProgress.status === 'in_progress' ? 'rgba(14, 165, 233, 0.25)' : 'transparent',
                  color: briefProgress.status === 'in_progress' ? '#38bdf8' : '#94a3b8',
                  border: briefProgress.status === 'in_progress' ? '1px solid rgba(56, 189, 248, 0.4)' : 'none',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                In Progress
              </button>

              <button
                onClick={() => handleStatusChange('completed')}
                style={{
                  background: briefProgress.status === 'completed' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                  color: briefProgress.status === 'completed' ? '#10b981' : '#94a3b8',
                  border: briefProgress.status === 'completed' ? '1px solid rgba(16, 185, 129, 0.4)' : 'none',
                  borderRadius: '6px',
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <CheckCircle2 size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
                Completed
              </button>
            </div>

            {briefProgress.status === 'not_started' && (
              <button
                onClick={() => handleStatusChange('in_progress')}
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: '0 2px 8px rgba(14, 165, 233, 0.35)',
                }}
              >
                <Play size={13} /> Start Project
              </button>
            )}

            {briefProgress.status === 'in_progress' && (
              <button
                onClick={() => handleStatusChange('completed')}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
                }}
              >
                <CheckCircle2 size={14} /> Mark as Completed
              </button>
            )}

            <button
              onClick={handleReset}
              style={{
                background: 'transparent',
                color: '#64748b',
                border: '1px solid rgba(71, 85, 105, 0.3)',
                borderRadius: '6px',
                padding: '0.35rem 0.65rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
              title="Reset progress for this project"
            >
              <RotateCcw size={11} /> Reset
            </button>
          </div>

          {/* Checklist progress tracker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 600 }}>
                Self-Checklist: <strong style={{ color: '#38bdf8' }}>{checkedCount}</strong> / {checklistCount} items ({checklistPercentage}%)
              </div>
            </div>
            <div
              style={{
                width: '120px',
                height: '8px',
                background: 'rgba(30, 41, 59, 0.8)',
                borderRadius: '999px',
                overflow: 'hidden',
                border: '1px solid rgba(51, 65, 85, 0.6)',
              }}
            >
              <div
                style={{
                  width: `${checklistPercentage}%`,
                  height: '100%',
                  background: checklistPercentage === 100 ? '#10b981' : 'linear-gradient(90deg, #38bdf8 0%, #0ea5e9 100%)',
                  borderRadius: '999px',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NAVIGATION TABS / TABLE OF CONTENTS                                       */}
        {/* ========================================================================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(11, 17, 32, 0.95)',
            borderBottom: '1px solid rgba(51, 65, 85, 0.6)',
            padding: '0 1.25rem',
            overflowX: 'auto',
            gap: '0.25rem',
          }}
        >
          {[
            { id: 'all', label: 'Complete Project Brief' },
            { id: 'overview', label: '1. Overview & Scenario' },
            { id: 'architecture', label: '2. Architecture & Stack' },
            { id: 'requirements', label: '3. Requirements & Constraints' },
            { id: 'structure', label: '4. Structure & Deliverables' },
            { id: 'guide', label: '5. Approach & Resources' },
            { id: 'checklist', label: '6. Enhancements & Checklist' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabKey)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #38bdf8' : '2px solid transparent',
                color: activeTab === tab.id ? '#38bdf8' : '#94a3b8',
                padding: '0.75rem 1rem',
                fontSize: '0.84rem',
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* MODAL BODY: Structured Project Brief Sections                             */}
        {/* ========================================================================= */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.25rem',
            color: '#e2e8f0',
          }}
        >
          {/* NOTICE: Self-Directed Project Philosophy */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '10px',
              padding: '0.85rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              fontSize: '0.84rem',
              color: '#94a3b8',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Compass size={18} style={{ color: '#38bdf8', flexShrink: 0 }} />
              <span>
                <strong>Professional Engineering Brief:</strong> Execute this project independently in your local development environment. Check off items in the self-completion checklist as you build.
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap' }}>
              22 Structured Specifications
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 1: PROJECT OVERVIEW & METRICS                                     */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'overview') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={18} style={{ color: '#38bdf8' }} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                  1. Project Overview & Meta
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(51, 65, 85, 0.6)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                    Project Identifier
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8', marginTop: '0.2rem' }}>
                    {project.code}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                    Target Academy
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: academyInfo.color, marginTop: '0.2rem' }}>
                    {academyInfo.label}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                    Complexity Tier
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: diffColor, marginTop: '0.2rem' }}>
                    {project.difficulty}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                    Estimated Effort
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem' }}>
                    {project.estimatedTime}
                  </div>
                </div>
              </div>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Core Technologies:</span>
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        background: 'rgba(30, 41, 59, 0.7)',
                        border: '1px solid rgba(71, 85, 105, 0.5)',
                        color: '#cbd5e1',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 2: REAL-WORLD SCENARIO                                            */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'overview') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Briefcase size={18} style={{ color: '#eab308' }} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                  2. Real-World Scenario
                </h3>
              </div>
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(51, 65, 85, 0.6)',
                  borderLeft: '4px solid #eab308',
                  borderRadius: '10px',
                  padding: '1.25rem 1.5rem',
                  color: '#cbd5e1',
                  fontSize: '0.92rem',
                  lineHeight: '1.65',
                }}
              >
                {project.scenario || project.overview}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 3: PROBLEM STATEMENT                                              */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'overview') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} style={{ color: '#f59e0b' }} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                  3. Problem Statement
                </h3>
              </div>
              <div
                style={{
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '10px',
                  padding: '1.25rem 1.5rem',
                  color: '#fed7aa',
                  fontSize: '0.92rem',
                  lineHeight: '1.65',
                }}
              >
                {project.problemStatement ||
                  'Current infrastructure and operational workflows suffer from manual friction, drift, and lack of reproducible automation.'}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 4: PROJECT OBJECTIVE                                              */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'overview') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={18} style={{ color: '#10b981' }} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                  4. Project Objectives
                </h3>
              </div>
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(51, 65, 85, 0.6)',
                  borderRadius: '10px',
                  padding: '1.25rem 1.5rem',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(project.projectObjective || project.objectives || []).map((obj, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                      <CheckCircle2 size={16} style={{ color: '#10b981', marginTop: '0.2rem', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' }}>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 5: WHAT YOU NEED TO BUILD                                         */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'overview') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Boxes size={18} style={{ color: '#38bdf8' }} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                  5. What You Need To Build
                </h3>
              </div>
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(51, 65, 85, 0.6)',
                  borderRadius: '10px',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {project.whatYouNeedToBuild?.description ||
                    'Construct a production-grade implementation satisfying all architecture, security, and operational constraints.'}
                </p>

                {project.whatYouNeedToBuild?.diagram && (
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        zIndex: 2,
                      }}
                    >
                      <button
                        onClick={() => handleCopy(project.whatYouNeedToBuild!.diagram, 'diagram-5')}
                        style={{
                          background: 'rgba(30, 41, 59, 0.8)',
                          border: '1px solid rgba(71, 85, 105, 0.6)',
                          color: '#cbd5e1',
                          padding: '0.25rem 0.55rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        {copiedKey === 'diagram-5' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                        {copiedKey === 'diagram-5' ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    <pre
                      style={{
                        background: '#040711',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: '8px',
                        padding: '1.25rem',
                        color: '#38bdf8',
                        fontSize: '0.82rem',
                        fontFamily: 'monospace',
                        overflowX: 'auto',
                        lineHeight: '1.45',
                        margin: 0,
                      }}
                    >
                      {project.whatYouNeedToBuild.diagram}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 6: REQUIREMENTS (FUNCTIONAL, TECHNICAL, SECURITY, OPERATIONAL)    */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'requirements') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ListChecks size={18} style={{ color: '#a855f7' }} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                  6. Structured Requirements Summary
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem',
                }}
              >
                {/* Functional */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                    <Boxes size={15} /> Functional Requirements
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6' }}>
                    {reqFunctional.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Technical */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a855f7', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                    <Cpu size={15} /> Technical Requirements
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6' }}>
                    {(reqTechnical.length > 0 ? reqTechnical : project.technicalRequirements || ['Follow standardized command specifications']).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Security */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                    <ShieldCheck size={15} /> Security Requirements
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6' }}>
                    {(reqSecurity.length > 0 ? reqSecurity : project.securityRequirements || ['Zero credentials committed into version control']).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Operational */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                    <TrendingUp size={15} /> Operational Requirements
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6' }}>
                    {(reqOperational.length > 0 ? reqOperational : ['Sub-minute recovery upon service disruptions', 'Reproducible builds with zero manual side-effects']).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 7: ARCHITECTURE (SUMMARY, DIAGRAM, COMPONENTS)                    */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'architecture') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers size={18} style={{ color: '#38bdf8' }} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                  7. Architecture & System Flow
                </h3>
              </div>

              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(51, 65, 85, 0.6)',
                  borderRadius: '10px',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Architecture Summary
                  </div>
                  <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    {project.architecture.summary}
                  </p>
                </div>

                {project.architecture.diagram && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                        Topology Flow Diagram
                      </span>
                      <button
                        onClick={() => handleCopy(project.architecture.diagram!, 'arch-diagram')}
                        style={{
                          background: 'rgba(30, 41, 59, 0.8)',
                          border: '1px solid rgba(71, 85, 105, 0.6)',
                          color: '#cbd5e1',
                          padding: '0.25rem 0.55rem',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        {copiedKey === 'arch-diagram' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                        {copiedKey === 'arch-diagram' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre
                      style={{
                        background: '#040711',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        borderRadius: '8px',
                        padding: '1.25rem',
                        color: '#38bdf8',
                        fontSize: '0.82rem',
                        fontFamily: 'monospace',
                        overflowX: 'auto',
                        lineHeight: '1.45',
                        margin: 0,
                      }}
                    >
                      {project.architecture.diagram}
                    </pre>
                  </div>
                )}

                {/* Architecture Components Breakdown */}
                {project.architecture.components && project.architecture.components.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                      Component Breakdown
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
                      {project.architecture.components.map((comp, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: 'rgba(2, 6, 23, 0.6)',
                            border: '1px solid rgba(51, 65, 85, 0.6)',
                            borderRadius: '8px',
                            padding: '0.85rem 1rem',
                          }}
                        >
                          <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                            {comp.name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#38bdf8', marginBottom: '0.4rem', fontWeight: 600 }}>
                            {comp.role}
                          </div>
                          {comp.description && (
                            <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.45', marginBottom: '0.5rem' }}>
                              {comp.description}
                            </div>
                          )}
                          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                            {comp.technologies.map((t) => (
                              <span
                                key={t}
                                style={{
                                  background: 'rgba(30, 41, 59, 0.7)',
                                  color: '#cbd5e1',
                                  fontSize: '0.72rem',
                                  padding: '0.15rem 0.45rem',
                                  borderRadius: '4px',
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 8: TECHNOLOGY REQUIREMENTS (REQUIRED, OPTIONAL, OUT OF SCOPE)    */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'architecture') && project.technologyRequirements && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={18} style={{ color: '#0ea5e9' }} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                  8. Technology Requirements
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem',
                }}
              >
                {/* Required */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.75rem' }}>
                    Required Technologies
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6' }}>
                    {project.technologyRequirements.required.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Optional */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.75rem' }}>
                    Optional Technologies
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.6' }}>
                    {project.technologyRequirements.optional.map((opt, i) => (
                      <li key={i}>{opt}</li>
                    ))}
                  </ul>
                </div>

                {/* Out of Scope */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ color: '#f87171', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.75rem' }}>
                    Out of Scope
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.6' }}>
                    {project.technologyRequirements.outOfScope.map((oos, i) => (
                      <li key={i}>{oos}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTIONS 9, 10, 11, 12, 13: DETAILED REQUIREMENTS & CONSTRAINTS          */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'requirements') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* 9. Functional Requirements */}
              {project.functionalRequirements && project.functionalRequirements.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>
                    9. Detailed Functional Requirements
                  </h4>
                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.65)',
                      border: '1px solid rgba(51, 65, 85, 0.6)',
                      borderRadius: '10px',
                      padding: '1.25rem 1.5rem',
                    }}
                  >
                    <ol style={{ margin: 0, paddingLeft: '1.3rem', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.7' }}>
                      {project.functionalRequirements.map((fr, i) => (
                        <li key={i}>{fr}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}

              {/* 10. Technical Requirements */}
              {project.technicalRequirements && project.technicalRequirements.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>
                    10. Detailed Technical Requirements
                  </h4>
                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.65)',
                      border: '1px solid rgba(51, 65, 85, 0.6)',
                      borderRadius: '10px',
                      padding: '1.25rem 1.5rem',
                    }}
                  >
                    <ul style={{ margin: 0, paddingLeft: '1.3rem', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.7' }}>
                      {project.technicalRequirements.map((tr, i) => (
                        <li key={i}>{tr}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 11. Security Requirements */}
              {project.securityRequirements && project.securityRequirements.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>
                    11. Security & Compliance Requirements
                  </h4>
                  <div
                    style={{
                      background: 'rgba(239, 68, 68, 0.05)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      borderRadius: '10px',
                      padding: '1.25rem 1.5rem',
                    }}
                  >
                    <ul style={{ margin: 0, paddingLeft: '1.3rem', color: '#fca5a5', fontSize: '0.88rem', lineHeight: '1.7' }}>
                      {project.securityRequirements.map((sr, i) => (
                        <li key={i}>{sr}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 12. Constraints */}
              {project.constraints && project.constraints.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <AlertOctagon size={16} style={{ color: '#f59e0b' }} />
                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>
                      12. Technical Constraints & Non-Goals
                    </h4>
                  </div>
                  <div
                    style={{
                      background: 'rgba(245, 158, 11, 0.06)',
                      border: '1px solid rgba(245, 158, 11, 0.25)',
                      borderRadius: '10px',
                      padding: '1.25rem 1.5rem',
                    }}
                  >
                    <ul style={{ margin: 0, paddingLeft: '1.3rem', color: '#fde68a', fontSize: '0.88rem', lineHeight: '1.7' }}>
                      {project.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 13. Expected Outcome */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Award size={16} style={{ color: '#10b981' }} />
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>
                    13. Expected Outcome
                  </h4>
                </div>
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '10px',
                    padding: '1.25rem 1.5rem',
                    color: '#6ee7b7',
                    fontSize: '0.92rem',
                    lineHeight: '1.6',
                  }}
                >
                  {project.expectedOutcome}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTIONS 14 & 15: DELIVERABLES & SUGGESTED STRUCTURE                      */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'structure') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* 14. Deliverables */}
              {project.deliverables && project.deliverables.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookmarkCheck size={18} style={{ color: '#38bdf8' }} />
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                      14. Tangible Deliverables
                    </h3>
                  </div>
                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.65)',
                      border: '1px solid rgba(51, 65, 85, 0.6)',
                      borderRadius: '10px',
                      padding: '1.25rem 1.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {project.deliverables.map((deliv, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                          <FileCode size={15} style={{ color: '#38bdf8', marginTop: '0.2rem', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.5' }}>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 15. Suggested Project Structure */}
              {project.suggestedProjectStructure && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FolderTree size={18} style={{ color: '#eab308' }} />
                      <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                        15. Suggested Project Directory Structure
                      </h3>
                    </div>
                    <button
                      onClick={() => handleCopy(project.suggestedProjectStructure!, 'structure-15')}
                      style={{
                        background: 'rgba(30, 41, 59, 0.8)',
                        border: '1px solid rgba(71, 85, 105, 0.6)',
                        color: '#cbd5e1',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      {copiedKey === 'structure-15' ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                      {copiedKey === 'structure-15' ? 'Copied' : 'Copy Structure'}
                    </button>
                  </div>
                  <pre
                    style={{
                      background: '#040711',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      borderRadius: '8px',
                      padding: '1.25rem',
                      color: '#38bdf8',
                      fontSize: '0.84rem',
                      fontFamily: 'monospace',
                      overflowX: 'auto',
                      lineHeight: '1.5',
                      margin: 0,
                    }}
                  >
                    {project.suggestedProjectStructure}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTIONS 16 & 17: REQUIRED CONCEPTS & LEARNING RESOURCES                  */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'guide') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* 16. Required Concepts */}
              {project.requiredConcepts && project.requiredConcepts.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen size={18} style={{ color: '#38bdf8' }} />
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                      16. Required Concepts & Knowledge Prerequisites
                    </h3>
                  </div>
                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.65)',
                      border: '1px solid rgba(51, 65, 85, 0.6)',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      display: 'flex',
                      gap: '0.65rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    {project.requiredConcepts.map((concept, i) => (
                      <a
                        key={i}
                        href={`/cloudstack${concept.academyRoute.replace('/cloudstack', '')}?concept=${concept.lessonId}`}
                        style={{
                          background: 'rgba(30, 41, 59, 0.8)',
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                          color: '#38bdf8',
                          padding: '0.4rem 0.75rem',
                          borderRadius: '8px',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span>{concept.name}</span>
                        <ChevronRight size={13} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* 17. Learning Resources */}
              {project.resources && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={18} style={{ color: '#eab308' }} />
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                      17. Learning Resources & Reference Material
                    </h3>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    {/* Academy Lessons */}
                    {project.resources.academyLessons && project.resources.academyLessons.length > 0 && (
                      <div
                        style={{
                          background: 'rgba(15, 23, 42, 0.65)',
                          border: '1px solid rgba(51, 65, 85, 0.6)',
                          borderRadius: '10px',
                          padding: '1.25rem',
                        }}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.65rem' }}>
                          Academy Lessons
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {project.resources.academyLessons.map((l, i) => (
                            <a
                              key={i}
                              href={l.route}
                              style={{
                                color: '#cbd5e1',
                                fontSize: '0.84rem',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                              }}
                            >
                              <ChevronRight size={12} color="#38bdf8" /> {l.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Official Documentation */}
                    {project.resources.officialDocs && project.resources.officialDocs.length > 0 && (
                      <div
                        style={{
                          background: 'rgba(15, 23, 42, 0.65)',
                          border: '1px solid rgba(51, 65, 85, 0.6)',
                          borderRadius: '10px',
                          padding: '1.25rem',
                        }}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981', marginBottom: '0.65rem' }}>
                          Official Documentation
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {project.resources.officialDocs.map((doc, i) => (
                            <a
                              key={i}
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: '#cbd5e1',
                                fontSize: '0.84rem',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                              }}
                            >
                              <ExternalLink size={12} color="#10b981" /> {doc.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reference Material */}
                    {project.resources.referenceMaterial && project.resources.referenceMaterial.length > 0 && (
                      <div
                        style={{
                          background: 'rgba(15, 23, 42, 0.65)',
                          border: '1px solid rgba(51, 65, 85, 0.6)',
                          borderRadius: '10px',
                          padding: '1.25rem',
                        }}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b', marginBottom: '0.65rem' }}>
                          Reference Material
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.84rem', lineHeight: '1.5' }}>
                          {project.resources.referenceMaterial.map((ref, i) => (
                            <li key={i}>{ref}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Useful Commands */}
                    {project.resources.usefulCommands && project.resources.usefulCommands.length > 0 && (
                      <div
                        style={{
                          gridColumn: '1 / -1',
                          background: 'rgba(15, 23, 42, 0.65)',
                          border: '1px solid rgba(51, 65, 85, 0.6)',
                          borderRadius: '10px',
                          padding: '1.25rem',
                        }}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a855f7', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Terminal size={14} /> Useful Engineering Commands
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.5rem' }}>
                          {project.resources.usefulCommands.map((cmd, i) => (
                            <div
                              key={i}
                              style={{
                                background: '#040711',
                                border: '1px solid rgba(71, 85, 105, 0.5)',
                                borderRadius: '6px',
                                padding: '0.45rem 0.75rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '0.5rem',
                              }}
                            >
                              <code style={{ color: '#38bdf8', fontSize: '0.8rem', fontFamily: 'monospace', overflowX: 'auto' }}>
                                {cmd}
                              </code>
                              <button
                                onClick={() => handleCopy(cmd, `cmd-${i}`)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#64748b',
                                  cursor: 'pointer',
                                  padding: '0.15rem',
                                }}
                                title="Copy command"
                              >
                                {copiedKey === `cmd-${i}` ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTIONS 18, 19, 20: RECOMMENDED APPROACH & PITFALLS                      */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'guide') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* 18. Recommended Approach (10 Steps) */}
              {project.recommendedApproach && project.recommendedApproach.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TrendingUp size={18} style={{ color: '#10b981' }} />
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                      18. Recommended High-Level Approach
                    </h3>
                  </div>
                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.65)',
                      border: '1px solid rgba(51, 65, 85, 0.6)',
                      borderRadius: '10px',
                      padding: '1.25rem 1.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {project.recommendedApproach.map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                          <span
                            style={{
                              background: 'rgba(56, 189, 248, 0.15)',
                              color: '#38bdf8',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              borderRadius: '50%',
                              width: '22px',
                              height: '22px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              marginTop: '0.1rem',
                            }}
                          >
                            {idx + 1}
                          </span>
                          <span style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.55' }}>
                            {step.replace(/^\d+\.\s*/, '')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 19. Important Considerations */}
              {project.importantConsiderations && project.importantConsiderations.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>
                    19. Important Engineering Considerations
                  </h4>
                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.65)',
                      border: '1px solid rgba(51, 65, 85, 0.6)',
                      borderRadius: '10px',
                      padding: '1.25rem 1.5rem',
                    }}
                  >
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.6' }}>
                      {project.importantConsiderations.map((ic, i) => (
                        <li key={i}>{ic}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 20. Common Pitfalls */}
              {project.commonPitfalls && project.commonPitfalls.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <AlertOctagon size={16} style={{ color: '#ef4444' }} />
                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>
                      20. Common Pitfalls to Avoid
                    </h4>
                  </div>
                  <div
                    style={{
                      background: 'rgba(239, 68, 68, 0.05)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      borderRadius: '10px',
                      padding: '1.25rem 1.5rem',
                    }}
                  >
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#fca5a5', fontSize: '0.88rem', lineHeight: '1.6' }}>
                      {project.commonPitfalls.map((cp, i) => (
                        <li key={i}>{cp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 21: OPTIONAL ENHANCEMENTS (4 TIERS)                               */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'checklist') && project.optionalEnhancements && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} style={{ color: '#f59e0b' }} />
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                  21. Optional Project Enhancements (Tiered Challenges)
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1rem',
                }}
              >
                {/* Beginner */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ color: '#10b981', fontWeight: 800, fontSize: '0.84rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Beginner Extension
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.84rem', lineHeight: '1.5' }}>
                    {project.optionalEnhancements.beginner.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>

                {/* Intermediate */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.84rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Intermediate Extension
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.84rem', lineHeight: '1.5' }}>
                    {project.optionalEnhancements.intermediate.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>

                {/* Advanced */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ color: '#a855f7', fontWeight: 800, fontSize: '0.84rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Advanced Extension
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.84rem', lineHeight: '1.5' }}>
                    {project.optionalEnhancements.advanced.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>

                {/* Expert */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.84rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Expert Extension
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#cbd5e1', fontSize: '0.84rem', lineHeight: '1.5' }}>
                    {project.optionalEnhancements.expert.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 22: COMPLETION CHECKLIST (INTERACTIVE SELF-CHECK)                  */}
          {/* ========================================================================= */}
          {(activeTab === 'all' || activeTab === 'checklist') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#10b981' }} />
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                    22. Completion Checklist (Interactive Self-Check)
                  </h3>
                </div>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                  Completed: <strong style={{ color: '#10b981' }}>{checkedCount}</strong> / {checklistCount} ({checklistPercentage}%)
                </span>
              </div>

              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                }}
              >
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
                  Check off each milestone once you have implemented, verified, and committed it in your local environment:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {checklistItems.map((item, idx) => {
                    const isChecked = checkedIndices.includes(idx);
                    return (
                      <label
                        key={item.id || idx}
                        onClick={() => handleToggleCheck(idx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.85rem',
                          background: isChecked ? 'rgba(16, 185, 129, 0.08)' : 'rgba(2, 6, 23, 0.6)',
                          border: isChecked ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(51, 65, 85, 0.6)',
                          borderRadius: '8px',
                          padding: '0.75rem 1rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by container onClick
                          style={{
                            width: '18px',
                            height: '18px',
                            accentColor: '#10b981',
                            cursor: 'pointer',
                          }}
                        />
                        <span
                          style={{
                            fontSize: '0.88rem',
                            color: isChecked ? '#f1f5f9' : '#cbd5e1',
                            textDecoration: isChecked ? 'line-through' : 'none',
                            opacity: isChecked ? 0.9 : 1,
                            lineHeight: '1.5',
                          }}
                        >
                          {item.text}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {checklistPercentage === 100 && (
                  <div
                    style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      borderRadius: '8px',
                      padding: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Award size={22} style={{ color: '#10b981' }} />
                      <div>
                        <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.92rem' }}>
                          All Checklist Milestones Complete!
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#6ee7b7' }}>
                          You have satisfied every specification in this engineering brief.
                        </div>
                      </div>
                    </div>

                    {briefProgress.status !== 'completed' && (
                      <button
                        onClick={() => handleStatusChange('completed')}
                        style={{
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '0.5rem 1rem',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Mark Project Completed
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
