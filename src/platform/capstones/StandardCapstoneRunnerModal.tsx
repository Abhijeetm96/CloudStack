import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ShieldCheck,
  Award,
  Clock,
  RotateCcw,
  Sparkles,
  FileCode,
  Check,
  Copy,
  ExternalLink,
  Target,
  AlertOctagon,
  Boxes,
  Compass,
  BookOpen,
  Terminal,
  ListChecks,
  TrendingUp,
  Cpu,
  BookmarkCheck,
  Play,
  LayoutDashboard,
  Settings,
  Wrench,
  Shield,
  Activity,
  User,
  HardDrive,
  Cloud,
  Sliders,
  CheckSquare,
  FileText,
  ArrowRight,
  GitBranch,
  Rocket,
  ShieldAlert,
} from 'lucide-react';
import {
  GitOfficialIcon,
  DockerOfficialIcon,
  KubernetesOfficialIcon,
  LinuxOfficialIcon,
  TerraformOfficialIcon,
  DevOpsOfficialIcon,
  JenkinsOfficialIcon,
  PrometheusOfficialIcon,
  GrafanaOfficialIcon,
} from '../../components/common/TechnologyIcons';
import { CapstoneProject, CapstoneDifficulty } from './types';
import {
  getCapstoneBriefProgress,
  setCapstoneStatus,
  toggleChecklistItem,
  resetCapstoneBriefProgress,
} from './capstoneProgress';
import { getCapstonesByAcademy } from './data';
import './capstone.css';

export interface StandardCapstoneRunnerModalProps {
  project: CapstoneProject;
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: () => void;
}

type TabKey =
  | 'overview'
  | 'requirements'
  | 'architecture'
  | 'technologies'
  | 'resources'
  | 'guidance'
  | 'checklist';

export const StandardCapstoneRunnerModal: React.FC<StandardCapstoneRunnerModalProps> = ({
  project: initialProject,
  isOpen,
  onClose,
  onCompleted,
}) => {
  // Allow switching projects within the same academy from the sidebar
  const [currentProject, setCurrentProject] = useState<CapstoneProject>(initialProject);
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [briefProgress, setBriefProgress] = useState(() =>
    getCapstoneBriefProgress(initialProject.id)
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sync when initialProject changes
  useEffect(() => {
    setCurrentProject(initialProject);
    setBriefProgress(getCapstoneBriefProgress(initialProject.id));
  }, [initialProject.id, isOpen]);

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

  // Academy projects for difficulty progression
  const academyProjects = useMemo(() => {
    return getCapstonesByAcademy(currentProject.academy);
  }, [currentProject.academy]);

  const currentProjectIndex = useMemo(() => {
    const idx = academyProjects.findIndex((p) => p.id === currentProject.id);
    return idx >= 0 ? idx : 0;
  }, [academyProjects, currentProject.id]);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2000);
  };

  const checklistItems = currentProject.completionChecklist || [];
  const checkedIndices = briefProgress.checkedChecklistIndices || [];
  const checklistCount = checklistItems.length;
  const checkedCount = checkedIndices.length;
  const checklistPercentage =
    checklistCount > 0 ? Math.round((checkedCount / checklistCount) * 100) : 0;

  const handleStatusChange = (status: 'not_started' | 'in_progress' | 'completed') => {
    const updated = setCapstoneStatus(currentProject.id, status);
    setBriefProgress({ ...updated });
    if (status === 'completed' && onCompleted) {
      onCompleted();
    }
  };

  const handleToggleCheck = (index: number) => {
    const updated = toggleChecklistItem(currentProject.id, index);
    setBriefProgress({ ...updated });
    if (updated.status === 'completed' && onCompleted) {
      onCompleted();
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your progress for this project?')) {
      const reset = resetCapstoneBriefProgress(currentProject.id);
      setBriefProgress({ ...reset });
    }
  };

  const handleSelectProject = (proj: CapstoneProject) => {
    setCurrentProject(proj);
    setBriefProgress(getCapstoneBriefProgress(proj.id));
  };

  // Helper for technology logos
  const renderTechLogo = (techName: string, size = 18) => {
    const lower = techName.toLowerCase();
    if (lower === 'git' || (lower.includes('git') && !lower.includes('github') && !lower.includes('gitops'))) {
      return <GitOfficialIcon size={size} />;
    }
    if (lower.includes('jenkins')) {
      return <JenkinsOfficialIcon size={size} />;
    }
    if (lower.includes('docker') || lower.includes('container') || lower.includes('ghcr')) {
      return <DockerOfficialIcon size={size} />;
    }
    if (lower.includes('terraform') || lower.includes('iac')) {
      return <TerraformOfficialIcon size={size} />;
    }
    if (lower.includes('kuber') || lower.includes('k8s')) {
      return <KubernetesOfficialIcon size={size} />;
    }
    if (lower.includes('prometh')) {
      return <PrometheusOfficialIcon size={size} />;
    }
    if (lower.includes('grafan')) {
      return <GrafanaOfficialIcon size={size} />;
    }
    if (lower.includes('linux') || lower.includes('bash') || lower.includes('shell')) {
      return <LinuxOfficialIcon size={size} />;
    }
    if (lower.includes('devops') || lower.includes('argo') || lower.includes('ci/cd') || lower.includes('pipeline')) {
      return <DevOpsOfficialIcon size={size} />;
    }
    return <Cpu size={size} style={{ color: '#38bdf8' }} />;
  };

  // Difficulty badge styling
  const getDifficultyPill = (diff: CapstoneDifficulty) => {
    switch (diff) {
      case 'Expert':
      case 'Expert / Production':
      case 'Production':
      case 'Production Grade':
        return {
          bg: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          text: '#fca5a5',
          icon: <ShieldAlert size={13} style={{ color: '#f87171' }} />,
        };
      case 'Advanced':
      case 'Advanced+':
        return {
          bg: 'rgba(168, 85, 247, 0.15)',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          text: '#d8b4fe',
          icon: <ShieldCheck size={13} style={{ color: '#c084fc' }} />,
        };
      case 'Intermediate':
      case 'Intermediate+':
      case 'Lower Intermediate':
        return {
          bg: 'rgba(56, 189, 248, 0.15)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          text: '#7dd3fc',
          icon: <Activity size={13} style={{ color: '#38bdf8' }} />,
        };
      default:
        return {
          bg: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          text: '#6ee7b7',
          icon: <CheckCircle2 size={13} style={{ color: '#34d399' }} />,
        };
    }
  };

  const diffStyle = getDifficultyPill(currentProject.difficulty);

  // Short labels for progression list
  const getShortTitle = (title: string, index: number) => {
    if (currentProject.academy === 'devops') {
      const devopsShortTitles = [
        'Basic CI Pipeline',
        'Automated Testing',
        'Docker CI Pipeline',
        'Docker Registry Pipeline',
        'Application Deployment',
        'Infrastructure CI/CD',
        'Secure CI/CD Pipeline',
        'Multi-Environment CI/CD',
        'Production Deployment',
        'Production Grade Platform',
      ];
      return devopsShortTitles[index] || title;
    }
    return title.length > 28 ? title.slice(0, 26) + '...' : title;
  };

  // Extract lists for requirements
  const functionalList =
    currentProject.functionalRequirements ||
    (Array.isArray(currentProject.requirements?.functional)
      ? currentProject.requirements.functional
      : []);

  const technicalList =
    currentProject.technicalRequirements ||
    (Array.isArray(currentProject.requirements?.technical)
      ? currentProject.requirements.technical
      : []);

  const securityList =
    currentProject.securityRequirements ||
    (Array.isArray(currentProject.requirements?.security)
      ? currentProject.requirements.security
      : []);

  const objectivesList =
    currentProject.projectObjective || currentProject.objectives || [];

  return (
    <div className="capstone-modal-backdrop-fixed" onClick={onClose}>
      <div className="capstone-modal-window-2col" onClick={(e) => e.stopPropagation()}>
        {/* ========================================================================= */}
        {/* HEADER SECTION: Title, Magenta Pill, Metadata, and Top-Right Status Card  */}
        {/* ========================================================================= */}
        <div className="capstone-header-wrapper">
          <div className="capstone-header-left">
            {/* Top Magenta Pill: Capstone Project X of 10 */}
            <div className="capstone-purple-pill">
              Capstone Project {currentProjectIndex + 1} of {academyProjects.length}
            </div>

            {/* Main Title */}
            <h1 className="capstone-main-title">{currentProject.title}</h1>

            {/* Subtitle */}
            <p className="capstone-summary-text">
              {currentProject.overview || currentProject.projectOverview?.shortDescription}
            </p>

            {/* Metadata Pills Row */}
            <div className="capstone-metadata-row">
              {/* Difficulty pill */}
              <span
                className="capstone-badge-difficulty"
                style={{
                  background: diffStyle.bg,
                  border: diffStyle.border,
                  color: diffStyle.text,
                }}
              >
                {diffStyle.icon}
                {currentProject.difficulty}
              </span>

              {/* Time Estimate pill */}
              <span className="capstone-badge-effort">
                <Clock size={13} style={{ color: '#94a3b8' }} />
                {currentProject.estimatedTime ||
                  currentProject.projectOverview?.estimatedEffort ||
                  '20-30 hours'}
              </span>

              {/* Technology badges */}
              {currentProject.technologies?.slice(0, 5).map((tech, i) => (
                <span key={i} className="capstone-badge-tech">
                  {renderTechLogo(tech, 14)}
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Top Right Status Card & Close Button */}
          <div className="capstone-header-right">
            {/* Rounded Status Card */}
            <div className="capstone-status-card">
              <div className="capstone-status-icon-circle">
                <CheckCircle2 size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="capstone-status-title">
                  {briefProgress.status === 'completed'
                    ? 'Completed'
                    : briefProgress.status === 'in_progress'
                    ? 'In Progress'
                    : 'Not Started'}
                </span>
                <span className="capstone-status-sub">
                  {briefProgress.status === 'completed'
                    ? 'Project completed!'
                    : briefProgress.status === 'in_progress'
                    ? 'Currently working on project'
                    : 'Start working on this project'}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="capstone-btn-close"
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TABS ROW: Overview, Requirements, Architecture, Technologies, etc.        */}
        {/* ========================================================================= */}
        <div className="capstone-tabs-nav">
          {[
            { key: 'overview', label: 'Overview', icon: LayoutDashboard },
            { key: 'requirements', label: 'Requirements', icon: ListChecks },
            { key: 'architecture', label: 'Architecture', icon: Layers },
            { key: 'technologies', label: 'Technologies', icon: Boxes },
            { key: 'resources', label: 'Resources', icon: BookOpen },
            { key: 'guidance', label: 'Guidance', icon: Compass },
            { key: 'checklist', label: 'Checklist', icon: CheckSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as TabKey)}
                className={`capstone-pill-tab ${isActive ? 'active' : ''}`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* MAIN BODY: 2-Column Split (Left ~75% content, Right ~25% sidebar)         */}
        {/* ========================================================================= */}
        <div className="capstone-body-layout">
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT COLUMN: Main Content Area                                          */}
          {/* ----------------------------------------------------------------------- */}
          <div className="capstone-content-left">
            {/* OVERVIEW TAB CONTENT */}
            {activeTab === 'overview' && (
              <>
                {/* ROW 1: 3-Column Grid (Project Overview, Scenario & Problem, Objective) */}
                <div className="capstone-row-grid-3">
                  {/* Card 1: 1. Project Overview */}
                  <div className="capstone-card-box">
                    <div className="capstone-card-header">
                      <div
                        className="capstone-card-icon"
                        style={{
                          background: 'rgba(168, 85, 247, 0.15)',
                          border: '1px solid rgba(168, 85, 247, 0.35)',
                          color: '#c084fc',
                        }}
                      >
                        <Sliders size={15} />
                      </div>
                      <h2 className="capstone-card-title">1. Project Overview</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.78rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(51, 65, 85, 0.5)', paddingBottom: '0.45rem' }}>
                        <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Wrench size={12} style={{ color: '#64748b' }} /> Project Name
                        </span>
                        <span style={{ color: '#ffffff', fontWeight: 600, textAlign: 'right' }}>
                          {currentProject.projectOverview?.projectName || currentProject.title}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(51, 65, 85, 0.5)', paddingBottom: '0.45rem' }}>
                        <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Cloud size={12} style={{ color: '#64748b' }} /> Academy
                        </span>
                        <span style={{ color: '#ffffff', fontWeight: 600, textTransform: 'capitalize', textAlign: 'right' }}>
                          {currentProject.academy}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(51, 65, 85, 0.5)', paddingBottom: '0.45rem' }}>
                        <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Activity size={12} style={{ color: '#64748b' }} /> Difficulty
                        </span>
                        <span style={{ color: '#ffffff', fontWeight: 600, textAlign: 'right' }}>
                          {currentProject.difficulty}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(51, 65, 85, 0.5)', paddingBottom: '0.45rem' }}>
                        <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Clock size={12} style={{ color: '#64748b' }} /> Estimated Effort
                        </span>
                        <span style={{ color: '#ffffff', fontWeight: 600, textAlign: 'right' }}>
                          {currentProject.estimatedTime || currentProject.projectOverview?.estimatedEffort || '20-30 hours'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', borderBottom: '1px solid rgba(51, 65, 85, 0.5)', paddingBottom: '0.45rem' }}>
                        <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Cpu size={12} style={{ color: '#64748b' }} /> Technologies
                        </span>
                        <span style={{ color: '#cbd5e1', lineHeight: '1.4' }}>
                          {currentProject.technologies?.join(', ')}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', paddingTop: '0.1rem' }}>
                        <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <FileText size={12} style={{ color: '#64748b' }} /> Short Description
                        </span>
                        <span style={{ color: '#cbd5e1', fontSize: '0.74rem', lineHeight: '1.45' }}>
                          {currentProject.projectOverview?.shortDescription || currentProject.overview}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: 2. Real-World Scenario & 3. Problem Statement */}
                  <div className="capstone-card-box" style={{ justifyContent: 'space-between' }}>
                    {/* Section 2: Real-World Scenario */}
                    <div>
                      <div className="capstone-card-header" style={{ marginBottom: '0.5rem' }}>
                        <div
                          className="capstone-card-icon"
                          style={{
                            background: 'rgba(56, 189, 248, 0.15)',
                            border: '1px solid rgba(56, 189, 248, 0.35)',
                            color: '#38bdf8',
                          }}
                        >
                          <FileText size={15} />
                        </div>
                        <h2 className="capstone-card-title">2. Real-World Scenario</h2>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                        {currentProject.scenario ||
                          'You have joined a platform engineering team at a growing company. The development teams need a standardized, secure and automated CI/CD platform to build, test and deploy their applications to Kubernetes across multiple environments.'}
                      </p>
                    </div>

                    {/* Section 3: Problem Statement */}
                    <div style={{ paddingTop: '0.75rem', borderTop: '1px solid rgba(51, 65, 85, 0.5)' }}>
                      <div className="capstone-card-header" style={{ marginBottom: '0.45rem' }}>
                        <div
                          className="capstone-card-icon"
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.35)',
                            color: '#ef4444',
                          }}
                        >
                          <AlertTriangle size={15} />
                        </div>
                        <h2 className="capstone-card-title">3. Problem Statement</h2>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                        {currentProject.problemStatement ||
                          'Currently, deployments are manual, inconsistent and error-prone. Infrastructure is created manually, there is no automated testing or security scanning, and deployments take hours. The organization wants a fully automated, production-grade CI/CD platform.'}
                      </p>
                    </div>
                  </div>

                  {/* Card 3: 4. Project Objective */}
                  <div className="capstone-card-box">
                    <div className="capstone-card-header" style={{ marginBottom: '0.35rem' }}>
                      <div
                        className="capstone-card-icon"
                        style={{
                          background: 'rgba(168, 85, 247, 0.15)',
                          border: '1px solid rgba(168, 85, 247, 0.35)',
                          color: '#c084fc',
                        }}
                      >
                        <Target size={15} />
                      </div>
                      <h2 className="capstone-card-title">4. Project Objective</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', overflowY: 'auto', maxHeight: '280px', paddingRight: '0.25rem' }}>
                      {objectivesList.map((obj, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
                          <CheckCircle2
                            size={14}
                            style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }}
                          />
                          <span style={{ lineHeight: '1.4' }}>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ROW 2: Card 5: Full-Width Visual High-Level Architecture Diagram */}
                <div className="capstone-card-box">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <div className="capstone-card-header">
                      <div
                        className="capstone-card-icon"
                        style={{
                          background: 'rgba(168, 85, 247, 0.15)',
                          border: '1px solid rgba(168, 85, 247, 0.35)',
                          color: '#c084fc',
                        }}
                      >
                        <Boxes size={15} />
                      </div>
                      <h2 className="capstone-card-title">
                        5. What You Need to Build (High-Level Architecture)
                      </h2>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'monospace' }}>
                      Production Native Architecture
                    </span>
                  </div>

                  {/* Architecture Diagram Canvas */}
                  <div className="capstone-arch-canvas">
                    {/* Top Flow: Developer -> Git -> CI/CD Jenkins -> Container Registry -> K8s */}
                    <div className="capstone-arch-row">
                      {/* Node 1: Developer */}
                      <div
                        className="capstone-arch-node-box"
                        style={{ width: '85px', height: '70px', padding: '0.35rem' }}
                      >
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#1e293b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '2px',
                            color: '#cbd5e1',
                          }}
                        >
                          <User size={14} />
                        </div>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#ffffff' }}>
                          Developer
                        </span>
                      </div>

                      {/* Arrow: Push Code */}
                      <div className="capstone-arch-arrow-block" style={{ minWidth: '30px' }}>
                        <span className="capstone-arch-arrow-label">Push Code</span>
                        <div className="capstone-arch-line-wrap">
                          <div className="capstone-arch-line-fill"></div>
                          <ArrowRight size={11} style={{ color: '#94a3b8', marginLeft: '-2px' }} />
                        </div>
                      </div>

                      {/* Node 2: Git Repository */}
                      <div
                        className="capstone-arch-node-box"
                        style={{
                          width: '105px',
                          height: '70px',
                          background: 'rgba(240, 80, 50, 0.08)',
                          border: '1px solid rgba(240, 80, 50, 0.5)',
                          padding: '0.35rem',
                        }}
                      >
                        <GitOfficialIcon size={20} style={{ marginBottom: '3px' }} />
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ffffff' }}>
                          Git Repository
                        </span>
                      </div>

                      {/* Arrow to Jenkins */}
                      <div className="capstone-arch-arrow-block" style={{ minWidth: '20px' }}>
                        <div className="capstone-arch-line-wrap">
                          <div className="capstone-arch-line-fill"></div>
                          <ArrowRight size={11} style={{ color: '#94a3b8', marginLeft: '-2px' }} />
                        </div>
                      </div>

                      {/* Node 3: CI/CD Pipeline (Jenkins) */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        {/* Automated Testing Badge Group */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.15rem 0.45rem',
                            border: '1px dashed rgba(71, 85, 105, 0.7)',
                            background: 'rgba(15, 23, 42, 0.7)',
                            borderRadius: '6px',
                            marginBottom: '4px',
                          }}
                        >
                          <span style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginRight: '2px' }}>
                            Automated Testing
                          </span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              padding: '0.1rem 0.3rem',
                              borderRadius: '4px',
                              background: 'rgba(16, 185, 129, 0.15)',
                              border: '1px solid rgba(16, 185, 129, 0.4)',
                              color: '#6ee7b7',
                              fontSize: '0.6rem',
                              fontWeight: 600,
                            }}
                          >
                            <Check size={8} style={{ color: '#10b981' }} /> Unit Tests
                          </span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              padding: '0.1rem 0.3rem',
                              borderRadius: '4px',
                              background: 'rgba(168, 85, 247, 0.15)',
                              border: '1px solid rgba(168, 85, 247, 0.4)',
                              color: '#d8b4fe',
                              fontSize: '0.6rem',
                              fontWeight: 600,
                            }}
                          >
                            <ShieldCheck size={8} style={{ color: '#a855f7' }} /> Security Scan
                          </span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              padding: '0.1rem 0.3rem',
                              borderRadius: '4px',
                              background: 'rgba(56, 189, 248, 0.15)',
                              border: '1px solid rgba(56, 189, 248, 0.4)',
                              color: '#7dd3fc',
                              fontSize: '0.6rem',
                              fontWeight: 600,
                            }}
                          >
                            <Boxes size={8} style={{ color: '#38bdf8' }} /> Build Images
                          </span>
                        </div>

                        {/* Jenkins Card */}
                        <div
                          className="capstone-arch-node-box"
                          style={{
                            width: '145px',
                            height: '62px',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '0.5rem',
                            padding: '0.35rem 0.55rem',
                          }}
                        >
                          <JenkinsOfficialIcon size={24} />
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ffffff' }}>
                              CI/CD Pipeline
                            </div>
                            <div style={{ fontSize: '0.62rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                              (Jenkins)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Arrow: Push Image */}
                      <div className="capstone-arch-arrow-block" style={{ minWidth: '30px' }}>
                        <span className="capstone-arch-arrow-label">Push Image</span>
                        <div className="capstone-arch-line-wrap">
                          <div className="capstone-arch-line-fill"></div>
                          <ArrowRight size={11} style={{ color: '#94a3b8', marginLeft: '-2px' }} />
                        </div>
                      </div>

                      {/* Node 4: Container Registry */}
                      <div
                        className="capstone-arch-node-box"
                        style={{
                          width: '110px',
                          height: '70px',
                          background: 'rgba(36, 150, 237, 0.08)',
                          border: '1px solid rgba(36, 150, 237, 0.45)',
                          padding: '0.35rem',
                        }}
                      >
                        <DockerOfficialIcon size={20} style={{ marginBottom: '3px' }} />
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ffffff', textAlign: 'center' }}>
                          Container Registry
                        </span>
                      </div>

                      {/* Arrow: Deploy */}
                      <div className="capstone-arch-arrow-block" style={{ minWidth: '25px' }}>
                        <span className="capstone-arch-arrow-label">Deploy</span>
                        <div className="capstone-arch-line-wrap">
                          <div className="capstone-arch-line-fill"></div>
                          <ArrowRight size={11} style={{ color: '#94a3b8', marginLeft: '-2px' }} />
                        </div>
                      </div>

                      {/* Node 5: Kubernetes Cluster with Environments above */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                        {/* Environments Badge Group */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.15rem 0.45rem',
                            border: '1px dashed rgba(71, 85, 105, 0.7)',
                            background: 'rgba(15, 23, 42, 0.7)',
                            borderRadius: '6px',
                            marginBottom: '4px',
                          }}
                        >
                          <span style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginRight: '2px' }}>
                            Environments
                          </span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              padding: '0.1rem 0.3rem',
                              borderRadius: '4px',
                              background: 'rgba(16, 185, 129, 0.15)',
                              border: '1px solid rgba(16, 185, 129, 0.4)',
                              color: '#6ee7b7',
                              fontSize: '0.6rem',
                              fontWeight: 600,
                            }}
                          >
                            <User size={8} style={{ color: '#10b981' }} /> Development
                          </span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              padding: '0.1rem 0.3rem',
                              borderRadius: '4px',
                              background: 'rgba(56, 189, 248, 0.15)',
                              border: '1px solid rgba(56, 189, 248, 0.4)',
                              color: '#7dd3fc',
                              fontSize: '0.6rem',
                              fontWeight: 600,
                            }}
                          >
                            <Layers size={8} style={{ color: '#38bdf8' }} /> Staging
                          </span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.2rem',
                              padding: '0.1rem 0.3rem',
                              borderRadius: '4px',
                              background: 'rgba(168, 85, 247, 0.15)',
                              border: '1px solid rgba(168, 85, 247, 0.4)',
                              color: '#d8b4fe',
                              fontSize: '0.6rem',
                              fontWeight: 600,
                            }}
                          >
                            <Rocket size={8} style={{ color: '#a855f7' }} /> Production
                          </span>
                        </div>

                        {/* K8s Card */}
                        <div
                          className="capstone-arch-node-box"
                          style={{
                            width: '145px',
                            height: '62px',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '0.5rem',
                            background: 'rgba(50, 108, 229, 0.12)',
                            border: '1px solid rgba(50, 108, 229, 0.5)',
                            padding: '0.35rem 0.55rem',
                          }}
                        >
                          <KubernetesOfficialIcon size={22} />
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ffffff' }}>
                            Kubernetes Cluster
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Flow: Terraform + Cloud Infrastructure (Left) & Monitoring (Right) */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid rgba(51, 65, 85, 0.5)',
                        minWidth: '920px',
                      }}
                    >
                      {/* Left: Terraform -> Provision Infrastructure -> Cloud Infrastructure */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {/* Terraform Node */}
                        <div
                          className="capstone-arch-node-box"
                          style={{
                            width: '135px',
                            height: '62px',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '0.5rem',
                            background: 'rgba(132, 79, 186, 0.12)',
                            border: '1px solid rgba(132, 79, 186, 0.5)',
                          }}
                        >
                          <TerraformOfficialIcon size={24} />
                          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffffff' }}>
                            Terraform
                          </span>
                        </div>

                        {/* Arrow */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span className="capstone-arch-arrow-label">Provision Infrastructure</span>
                          <div style={{ display: 'flex', alignItems: 'center', width: '130px' }}>
                            <div className="capstone-arch-line-fill"></div>
                            <ArrowRight size={13} style={{ color: '#94a3b8', marginLeft: '-2px' }} />
                          </div>
                        </div>

                        {/* Cloud Infrastructure container */}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.4rem',
                            padding: '0.5rem 0.85rem',
                            background: '#111827',
                            border: '1px solid rgba(71, 85, 105, 0.7)',
                            borderRadius: '10px',
                          }}
                        >
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700, textAlign: 'center' }}>
                            Cloud Infrastructure
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#1e293b', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', color: '#fde68a' }}>
                              <Cloud size={13} style={{ color: '#f59e0b' }} /> VPC
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#1e293b', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', color: '#fed7aa' }}>
                              <Cpu size={13} style={{ color: '#f97316' }} /> Compute
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#1e293b', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', color: '#a7f3d0' }}>
                              <GitBranch size={13} style={{ color: '#10b981' }} /> Load Balancer
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: '#1e293b', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', color: '#bae6fd' }}>
                              <HardDrive size={13} style={{ color: '#38bdf8' }} /> Storage
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Monitoring & Logging under K8s */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.4rem',
                          padding: '0.5rem 0.85rem',
                          background: '#111827',
                          border: '1px solid rgba(71, 85, 105, 0.7)',
                          borderRadius: '10px',
                          minWidth: '200px',
                        }}
                      >
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700, textAlign: 'center' }}>
                          Monitoring & Logging
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#ffffff', fontWeight: 600 }}>
                            <PrometheusOfficialIcon size={16} /> Prometheus
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#ffffff', fontWeight: 600 }}>
                            <GrafanaOfficialIcon size={16} /> Grafana
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ROW 3: 3-Column Grid (Functional, Technical, Security Requirements) */}
                <div className="capstone-row-grid-3">
                  {/* Card 6: 6. Functional Requirements */}
                  <div className="capstone-card-box">
                    <div className="capstone-card-header">
                      <div
                        className="capstone-card-icon"
                        style={{
                          background: 'rgba(56, 189, 248, 0.15)',
                          border: '1px solid rgba(56, 189, 248, 0.35)',
                          color: '#38bdf8',
                        }}
                      >
                        <Settings size={15} />
                      </div>
                      <h2 className="capstone-card-title">6. Functional Requirements</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', overflowY: 'auto', maxHeight: '250px' }}>
                      {functionalList.map((req, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
                          <CheckCircle2
                            size={14}
                            style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }}
                          />
                          <span style={{ lineHeight: '1.4' }}>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 7: 7. Technical Requirements */}
                  <div className="capstone-card-box">
                    <div className="capstone-card-header">
                      <div
                        className="capstone-card-icon"
                        style={{
                          background: 'rgba(168, 85, 247, 0.15)',
                          border: '1px solid rgba(168, 85, 247, 0.35)',
                          color: '#c084fc',
                        }}
                      >
                        <Wrench size={15} />
                      </div>
                      <h2 className="capstone-card-title">7. Technical Requirements</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', overflowY: 'auto', maxHeight: '250px' }}>
                      {technicalList.map((req, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
                          <CheckCircle2
                            size={14}
                            style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }}
                          />
                          <span style={{ lineHeight: '1.4' }}>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 8: 8. Security Requirements */}
                  <div className="capstone-card-box">
                    <div className="capstone-card-header">
                      <div
                        className="capstone-card-icon"
                        style={{
                          background: 'rgba(245, 158, 11, 0.15)',
                          border: '1px solid rgba(245, 158, 11, 0.35)',
                          color: '#fbbf24',
                        }}
                      >
                        <Shield size={15} />
                      </div>
                      <h2 className="capstone-card-title">8. Security Requirements</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', overflowY: 'auto', maxHeight: '250px' }}>
                      {securityList.map((req, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
                          <CheckCircle2
                            size={14}
                            style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }}
                          />
                          <span style={{ lineHeight: '1.4' }}>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* REQUIREMENTS TAB */}
            {activeTab === 'requirements' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                  <div className="capstone-card-box">
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                      <Settings size={16} /> Functional Requirements
                    </h3>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
                      {functionalList.map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <CheckCircle2 size={13} style={{ color: '#10b981', marginTop: '2px', flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="capstone-card-box">
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                      <Wrench size={16} /> Technical Requirements
                    </h3>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
                      {technicalList.map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <CheckCircle2 size={13} style={{ color: '#10b981', marginTop: '2px', flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                  <div className="capstone-card-box">
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                      <Shield size={16} /> Security Requirements
                    </h3>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
                      {securityList.map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <CheckCircle2 size={13} style={{ color: '#10b981', marginTop: '2px', flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="capstone-card-box">
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                      <AlertOctagon size={16} /> Constraints & Guardrails
                    </h3>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                      {(currentProject.constraints || []).map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <AlertTriangle size={13} style={{ color: '#f59e0b', marginTop: '2px', flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ARCHITECTURE TAB */}
            {activeTab === 'architecture' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="capstone-card-box">
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <Layers size={16} /> Architectural Design & System Topology
                  </h3>
                  <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                    {currentProject.architecture?.summary ||
                      'Production-grade topology incorporating high-availability, infrastructure-as-code, and automated observability.'}
                  </p>

                  {/* Component Breakdown Table */}
                  {currentProject.architecture?.components && (
                    <div style={{ overflowX: 'auto', border: '1px solid rgba(51, 65, 85, 0.7)', borderRadius: '8px' }}>
                      <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#090d18', color: '#94a3b8', textTransform: 'uppercase', fontSize: '0.68rem', fontWeight: 700, borderBottom: '1px solid rgba(51, 65, 85, 0.7)' }}>
                          <tr>
                            <th style={{ padding: '0.6rem 0.85rem' }}>Component</th>
                            <th style={{ padding: '0.6rem 0.85rem' }}>Role</th>
                            <th style={{ padding: '0.6rem 0.85rem' }}>Technologies</th>
                          </tr>
                        </thead>
                        <tbody style={{ color: '#cbd5e1' }}>
                          {currentProject.architecture.components.map((comp, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid rgba(51, 65, 85, 0.4)' }}>
                              <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#ffffff' }}>
                                {comp.name}
                              </td>
                              <td style={{ padding: '0.6rem 0.85rem' }}>{comp.role}</td>
                              <td style={{ padding: '0.6rem 0.85rem', color: '#38bdf8', fontFamily: 'monospace' }}>
                                {comp.technologies?.join(', ')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* ASCII Diagram representation */}
                {(currentProject.architecture?.diagram || currentProject.whatYouNeedToBuild?.diagram) && (
                  <div className="capstone-card-box">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                        <Terminal size={15} /> Topology ASCII Specification
                      </h3>
                      <button
                        onClick={() =>
                          handleCopy(
                            currentProject.architecture?.diagram ||
                              currentProject.whatYouNeedToBuild?.diagram ||
                              '',
                            'arch-ascii'
                          )
                        }
                        style={{
                          fontSize: '0.72rem',
                          color: '#cbd5e1',
                          background: '#1e293b',
                          border: '1px solid rgba(71, 85, 105, 0.6)',
                          borderRadius: '6px',
                          padding: '0.3rem 0.6rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                        }}
                      >
                        {copiedKey === 'arch-ascii' ? <Check size={12} style={{ color: '#10b981' }} /> : <Copy size={12} />}
                        {copiedKey === 'arch-ascii' ? 'Copied' : 'Copy Diagram'}
                      </button>
                    </div>
                    <pre
                      style={{
                        margin: 0,
                        padding: '1rem',
                        borderRadius: '8px',
                        background: '#090d18',
                        border: '1px solid rgba(51, 65, 85, 0.7)',
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        color: '#cbd5e1',
                        overflowX: 'auto',
                        lineHeight: '1.5',
                        whiteSpace: 'pre',
                      }}
                    >
                      {currentProject.architecture?.diagram || currentProject.whatYouNeedToBuild?.diagram}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* TECHNOLOGIES TAB */}
            {activeTab === 'technologies' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                <div className="capstone-card-box">
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <CheckCircle2 size={16} /> Required Technologies
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {(currentProject.technologyRequirements?.required || currentProject.technologies || []).map(
                      (t, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '0.6rem 0.85rem',
                            borderRadius: '8px',
                            background: '#111827',
                            border: '1px solid rgba(51, 65, 85, 0.7)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.65rem',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          {renderTechLogo(t, 18)}
                          <span>{t}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="capstone-card-box">
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <Sparkles size={16} /> Optional Enhancements
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {(currentProject.technologyRequirements?.optional || [
                      'HashiCorp Vault secret leasing',
                      'Argo Rollouts progressive delivery',
                      'Slack webhook alert notifications',
                    ]).map((t, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '0.6rem 0.85rem',
                          borderRadius: '8px',
                          background: '#111827',
                          border: '1px solid rgba(51, 65, 85, 0.7)',
                          color: '#cbd5e1',
                          fontSize: '0.78rem',
                        }}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="capstone-card-box">
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <AlertOctagon size={16} /> Out of Scope
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {(currentProject.technologyRequirements?.outOfScope || [
                      'Legacy bare-metal mainframes',
                      'Manual server installations',
                    ]).map((t, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '0.6rem 0.85rem',
                          borderRadius: '8px',
                          background: '#111827',
                          border: '1px solid rgba(51, 65, 85, 0.7)',
                          color: '#94a3b8',
                          fontSize: '0.78rem',
                        }}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* RESOURCES TAB */}
            {activeTab === 'resources' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                  {/* Academy Lessons */}
                  <div className="capstone-card-box">
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                      <BookOpen size={16} /> Academy Curriculum Links
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {(currentProject.resources?.academyLessons || []).map((l, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            if (l.route) window.location.href = l.route;
                          }}
                          style={{
                            padding: '0.75rem',
                            borderRadius: '8px',
                            background: '#111827',
                            border: '1px solid rgba(51, 65, 85, 0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                          }}
                        >
                          <span style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 600 }}>{l.title}</span>
                          <ExternalLink size={13} style={{ color: '#94a3b8' }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Official Docs */}
                  <div className="capstone-card-box">
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                      <ExternalLink size={16} /> Official Documentation & References
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {(currentProject.resources?.officialDocs || []).map((d, i) => (
                        <a
                          key={i}
                          href={d.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '0.75rem',
                            borderRadius: '8px',
                            background: '#111827',
                            border: '1px solid rgba(51, 65, 85, 0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            textDecoration: 'none',
                          }}
                        >
                          <span style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 600 }}>{d.title}</span>
                          <ExternalLink size={13} style={{ color: '#94a3b8' }} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Essential Commands */}
                {currentProject.resources?.usefulCommands && (
                  <div className="capstone-card-box">
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                      <Terminal size={16} /> Essential CLI Commands
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem' }}>
                      {currentProject.resources.usefulCommands.map((cmd, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '0.6rem 0.85rem',
                            borderRadius: '8px',
                            background: '#090d18',
                            border: '1px solid rgba(51, 65, 85, 0.7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <code style={{ fontSize: '0.75rem', color: '#6ee7b7', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '0.5rem' }}>
                            {cmd}
                          </code>
                          <button
                            onClick={() => handleCopy(cmd, `cmd-${i}`)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#94a3b8',
                              cursor: 'pointer',
                              padding: '2px',
                            }}
                            title="Copy command"
                          >
                            {copiedKey === `cmd-${i}` ? <Check size={13} style={{ color: '#10b981' }} /> : <Copy size={13} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* GUIDANCE TAB */}
            {activeTab === 'guidance' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="capstone-card-box">
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    <Compass size={16} /> 10-Step Implementation Roadmap
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {(currentProject.recommendedApproach || []).map((step, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          background: '#111827',
                          border: '1px solid rgba(51, 65, 85, 0.7)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                        }}
                      >
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'rgba(168, 85, 247, 0.2)',
                            color: '#d8b4fe',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '1px',
                          }}
                        >
                          {i + 1}
                        </div>
                        <p style={{ margin: 0, fontSize: '0.78rem', color: '#e2e8f0', lineHeight: '1.5' }}>
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                  <div className="capstone-card-box">
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                      <Target size={16} /> Architectural Considerations
                    </h3>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                      {(currentProject.importantConsiderations || []).map((c, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <Check size={13} style={{ color: '#38bdf8', marginTop: '2px', flexShrink: 0 }} />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="capstone-card-box">
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                      <AlertTriangle size={16} /> Common Pitfalls & Anti-Patterns
                    </h3>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.78rem', color: '#cbd5e1' }}>
                      {(currentProject.commonPitfalls || []).map((p, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                          <X size={13} style={{ color: '#f87171', marginTop: '2px', flexShrink: 0 }} />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* CHECKLIST TAB */}
            {activeTab === 'checklist' && (
              <div className="capstone-card-box">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(51, 65, 85, 0.7)', paddingBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                      <CheckSquare size={16} /> Project Completion Checklist
                    </h3>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
                      Check off items as you build and test your platform components.
                    </p>
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10b981', fontFamily: 'monospace' }}>
                    {checklistPercentage}% Completed
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginTop: '0.5rem' }}>
                  {checklistItems.map((item, i) => {
                    const isChecked = checkedIndices.includes(i);
                    return (
                      <div
                        key={i}
                        onClick={() => handleToggleCheck(i)}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: isChecked ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(51, 65, 85, 0.7)',
                          background: isChecked ? 'rgba(16, 185, 129, 0.1)' : '#111827',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          cursor: 'pointer',
                        }}
                      >
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: isChecked ? '1px solid #10b981' : '1px solid #64748b',
                            background: isChecked ? '#10b981' : '#1e293b',
                            color: '#020617',
                          }}
                        >
                          {isChecked && <Check size={14} strokeWidth={3} />}
                        </div>
                        <span
                          style={{
                            fontSize: '0.78rem',
                            color: isChecked ? '#a7f3d0' : '#e2e8f0',
                            textDecoration: isChecked ? 'line-through' : 'none',
                            opacity: isChecked ? 0.8 : 1,
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT SIDEBAR: Fixed Widgets (Progress, Technologies, Progression)       */}
          {/* ----------------------------------------------------------------------- */}
          <div className="capstone-sidebar-right">
            {/* Sidebar Card 1: Project Progress */}
            <div className="capstone-sidebar-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}>
                <BookmarkCheck size={16} style={{ color: '#94a3b8' }} />
                <h3 className="capstone-card-title">Project Progress</h3>
              </div>

              {/* Progress Bar & Percentage */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ flex: 1, height: '8px', background: '#1e293b', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      background: '#2563eb',
                      width: `${briefProgress.status === 'completed' ? 100 : checklistPercentage}%`,
                      transition: 'width 0.3s ease',
                    }}
                  ></div>
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', width: '38px', textAlign: 'right', fontFamily: 'monospace' }}>
                  {briefProgress.status === 'completed' ? '100%' : `${checklistPercentage}%`}
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {briefProgress.status === 'not_started' ? (
                  <button
                    onClick={() => handleStatusChange('in_progress')}
                    className="capstone-btn-primary-blue"
                  >
                    <Play size={14} style={{ fill: '#ffffff' }} />
                    Start Project
                  </button>
                ) : briefProgress.status === 'in_progress' ? (
                  <button
                    onClick={() => handleStatusChange('completed')}
                    className="capstone-btn-primary-blue"
                    style={{ background: '#10b981' }}
                  >
                    <CheckCircle2 size={14} />
                    Mark as Completed
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="capstone-btn-secondary-dark"
                  >
                    <RotateCcw size={13} />
                    Reset Progress
                  </button>
                )}

                {briefProgress.status !== 'completed' && (
                  <button
                    onClick={() => handleStatusChange('completed')}
                    className="capstone-btn-secondary-dark"
                  >
                    <Check size={14} />
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar Card 2: Technologies */}
            <div className="capstone-sidebar-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}>
                <Boxes size={16} style={{ color: '#94a3b8' }} />
                <h3 className="capstone-card-title">Technologies</h3>
              </div>

              {/* Vertical list of technologies with colored official logos */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', paddingTop: '0.2rem' }}>
                {currentProject.technologies?.map((tech, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 600 }}>
                    <div style={{ flexShrink: 0 }}>{renderTechLogo(tech, 20)}</div>
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Card 3: Difficulty Progression */}
            <div className="capstone-sidebar-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0' }}>
                <TrendingUp size={16} style={{ color: '#94a3b8' }} />
                <h3 className="capstone-card-title">Difficulty Progression</h3>
              </div>

              {/* Numbered 1 to 10 progression list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', paddingTop: '0.2rem' }}>
                {academyProjects.map((p, idx) => {
                  const isActive = p.id === currentProject.id;
                  const itemNumber = idx + 1;
                  const shortTitle = getShortTitle(p.title, idx);

                  return (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProject(p)}
                      className={`capstone-progression-item ${isActive ? 'active' : ''}`}
                    >
                      {/* Circle Number */}
                      <div className={`capstone-progression-circle ${isActive ? 'active' : ''}`}>
                        {itemNumber}
                      </div>

                      {/* Title & Difficulty */}
                      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                        <span
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: isActive ? 800 : 500,
                            color: isActive ? '#ffffff' : '#cbd5e1',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {shortTitle}
                        </span>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            color: isActive ? '#fca5a5' : '#64748b',
                            fontWeight: isActive ? 700 : 400,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {p.difficulty}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
