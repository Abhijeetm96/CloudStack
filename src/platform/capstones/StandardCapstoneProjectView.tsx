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
  Maximize2,
  Minimize2,
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
import { CapstoneProject, CapstoneAcademy, CapstoneDifficulty } from './types';
import {
  getCapstoneBriefProgress,
  setCapstoneStatus,
  toggleChecklistItem,
  resetCapstoneBriefProgress,
} from './capstoneProgress';
import { getCapstonesByAcademy, ALL_CAPSTONES } from './data';
import './capstone.css';

export interface StandardCapstoneProjectViewProps {
  initialProject?: CapstoneProject;
  initialProjectId?: string;
  academy?: CapstoneAcademy;
  isEmbedded?: boolean;
  isFullPage?: boolean;
  onClose?: () => void;
  onCompleted?: () => void;
  onExitToCurriculum?: () => void;
}

type TabKey =
  | 'overview'
  | 'requirements'
  | 'architecture'
  | 'technologies'
  | 'resources'
  | 'guidance'
  | 'checklist';

import { findCapstone } from './capstoneUtils';

export const StandardCapstoneProjectView: React.FC<StandardCapstoneProjectViewProps> = ({
  initialProject,
  initialProjectId,
  academy,
  isEmbedded = false,
  isFullPage = false,
  onClose,
  onCompleted,
  onExitToCurriculum,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Resolve target academy
  const targetAcademy = useMemo(() => {
    return academy || initialProject?.academy || 'kubernetes';
  }, [academy, initialProject]);

  // Academy projects for difficulty progression
  const academyProjects = useMemo(() => {
    return getCapstonesByAcademy(targetAcademy);
  }, [targetAcademy]);

  // Active project state
  const [currentProject, setCurrentProject] = useState<CapstoneProject>(() => {
    if (initialProject) return initialProject;
    if (initialProjectId) {
      const resolved = findCapstone(academyProjects, initialProjectId, targetAcademy);
      if (resolved) return resolved;
    }
    // If devops and no explicit initialProjectId was provided, default to project 10 to match design mockup
    if (targetAcademy === 'devops' && !initialProjectId && academyProjects.length >= 10) {
      return academyProjects[9]; // index 9 is Project 10
    }
    return academyProjects[0] || ALL_CAPSTONES[0];
  });

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [briefProgress, setBriefProgress] = useState(() =>
    getCapstoneBriefProgress(currentProject.id)
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sync when initialProject or initialProjectId changes
  useEffect(() => {
    if (initialProject) {
      setCurrentProject(initialProject);
      setBriefProgress(getCapstoneBriefProgress(initialProject.id));
    } else if (initialProjectId) {
      const resolved = findCapstone(academyProjects, initialProjectId, targetAcademy);
      if (resolved && resolved.id !== currentProject.id) {
        setCurrentProject(resolved);
        setBriefProgress(getCapstoneBriefProgress(resolved.id));
      }
    }
  }, [initialProject, initialProjectId, academyProjects, targetAcademy]);

  // Always keep briefProgress updated when currentProject changes
  useEffect(() => {
    setBriefProgress(getCapstoneBriefProgress(currentProject.id));
  }, [currentProject.id]);

  const currentProjectIndex = useMemo(() => {
    const idx = academyProjects.findIndex((p) => p.id === currentProject.id);
    return idx >= 0 ? idx : 0;
  }, [academyProjects, currentProject.id]);

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

  // Dynamic project titles for progression list
  const getShortTitle = (proj: CapstoneProject, index: number) => {
    if (proj.projectOverview?.projectName) {
      return proj.projectOverview.projectName;
    }
    return proj.title;
  };

  // Extract lists for requirements with rich, domain-aware fallbacks
  const functionalList = useMemo(() => {
    if (currentProject.functionalRequirements && currentProject.functionalRequirements.length > 0) {
      return currentProject.functionalRequirements;
    }
    if (Array.isArray(currentProject.requirements?.functional) && currentProject.requirements.functional.length > 0) {
      return currentProject.requirements.functional;
    }
    return [
      `Deploy and operate ${currentProject.title} end-to-end according to standard specifications`,
      'Validate end-to-end integration and automated communication between all core application tiers',
      'Verify zero-downtime execution, healthcheck probes, and proper service lifecycle state',
    ];
  }, [currentProject]);

  const technicalList = useMemo(() => {
    if (currentProject.technicalRequirements && currentProject.technicalRequirements.length > 0) {
      return currentProject.technicalRequirements;
    }
    if (Array.isArray(currentProject.requirements?.technical) && currentProject.requirements.technical.length > 0) {
      return currentProject.requirements.technical;
    }
    return [
      `Build using production-grade standards with ${currentProject.technologies.slice(0, 3).join(', ')}`,
      'Configure deterministic environment variables and declarative configuration manifests',
      'Structure clean health probes, automated restart policies, and structured telemetry export',
    ];
  }, [currentProject]);

  const securityList = useMemo(() => {
    if (currentProject.securityRequirements && currentProject.securityRequirements.length > 0) {
      return currentProject.securityRequirements;
    }
    if (Array.isArray(currentProject.requirements?.security) && currentProject.requirements.security.length > 0) {
      return currentProject.requirements.security;
    }
    return [
      'Enforce least-privilege security controls and isolate sensitive runtime components',
      'Prevent hardcoding secrets, API tokens, or credentials within source and manifest files',
      'Conduct automated vulnerability scanning against container images and infrastructure configurations',
    ];
  }, [currentProject]);

  const objectivesList = useMemo(() => {
    if (currentProject.projectObjective && currentProject.projectObjective.length > 0) {
      return currentProject.projectObjective;
    }
    if (currentProject.objectives && currentProject.objectives.length > 0) {
      return currentProject.objectives;
    }
    return [
      `Design and author the full architecture for ${currentProject.title}`,
      `Configure and integrate ${currentProject.technologies.slice(0, 3).join(', ')} for production reliability`,
      'Execute validation checks and ensure all operational guardrails are satisfied',
      'Document architecture decisions and create automated verification steps',
    ];
  }, [currentProject]);


  const renderArchitectureVisualizer = () => {
    if (currentProject.id === 'devops-10') {
      return (
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
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#1e293b', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', color: '#fca5a5' }}>
                          <PrometheusOfficialIcon size={16} /> Prometheus
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#1e293b', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.72rem', color: '#fde047' }}>
                          <GrafanaOfficialIcon size={16} /> Grafana
                      </div>
                    </div>
                  </div>
                </div>
        </div>
      );
    }

    return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem' }}>
                    {/* Summary Description */}
                    <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.55' }}>
                      {currentProject.whatYouNeedToBuild?.description ||
                        currentProject.architecture?.summary ||
                        currentProject.overview}
                    </div>

                    {/* Component Architecture Grid */}
                    {currentProject.architecture?.components && currentProject.architecture.components.length > 0 && (
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                          gap: '0.65rem',
                        }}
                      >
                        {currentProject.architecture.components.map((comp, idx) => (
                          <div
                            key={idx}
                            style={{
                              background: 'rgba(15, 23, 42, 0.75)',
                              border: '1px solid rgba(51, 65, 85, 0.6)',
                              borderRadius: '8px',
                              padding: '0.65rem 0.85rem',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.35rem',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f8fafc' }}>
                                {comp.name}
                              </span>
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  color: '#38bdf8',
                                  fontFamily: 'monospace',
                                  background: 'rgba(56, 189, 248, 0.1)',
                                  border: '1px solid rgba(56, 189, 248, 0.25)',
                                  padding: '0.1rem 0.35rem',
                                  borderRadius: '4px',
                                }}
                              >
                                Layer {idx + 1}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: '1.35' }}>
                              {comp.role}
                            </div>
                            {comp.technologies && comp.technologies.length > 0 && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                                {comp.technologies.map((t, ti) => (
                                  <span
                                    key={ti}
                                    style={{
                                      fontSize: '0.66rem',
                                      fontWeight: 600,
                                      color: '#cbd5e1',
                                      background: 'rgba(30, 41, 59, 0.8)',
                                      border: '1px solid rgba(71, 85, 105, 0.4)',
                                      borderRadius: '4px',
                                      padding: '0.1rem 0.35rem',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '0.25rem',
                                    }}
                                  >
                                    {renderTechLogo(t, 11)}
                                    <span>{t}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Monospace Architecture Blueprint Canvas */}
                    {(currentProject.whatYouNeedToBuild?.diagram || currentProject.architecture?.diagram) && (
                      <div
                        style={{
                          background: '#040711',
                          border: '1px solid rgba(56, 189, 248, 0.25)',
                          borderRadius: '8px',
                          padding: '1rem',
                          overflowX: 'auto',
                          boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.7)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '0.5rem',
                            borderBottom: '1px solid rgba(51, 65, 85, 0.5)',
                            paddingBottom: '0.35rem',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                            <Terminal size={13} style={{ color: '#38bdf8' }} />
                            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace', fontWeight: 700 }}>
                              {currentProject.title} • Topology Blueprint
                            </span>
                          </div>
                          <span style={{ fontSize: '0.68rem', color: '#10b981', fontFamily: 'monospace', fontWeight: 700 }}>
                            ● SPEC CERTIFIED
                          </span>
                        </div>
                        <pre
                          style={{
                            margin: 0,
                            fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace",
                            fontSize: '0.76rem',
                            lineHeight: '1.45',
                            color: '#38bdf8',
                            whiteSpace: 'pre',
                          }}
                        >
                          {currentProject.whatYouNeedToBuild?.diagram || currentProject.architecture?.diagram}
                        </pre>
                      </div>
                    )}
                  </div>
    );
  };

  const containerClassName = isFullscreen
    ? 'capstone-fullscreen-overlay'
    : isFullPage
    ? 'capstone-fullpage-window'
    : isEmbedded
    ? 'capstone-embedded-container'
    : 'capstone-modal-window-2col';

  return (
    <div className={containerClassName}>
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
            {currentProject.overview ||
              currentProject.projectOverview?.shortDescription ||
              'Design, author, and validate an enterprise production platform.'}
          </p>

          {/* Metadata Row: Difficulty, Hours, Technologies pills */}
          <div className="capstone-metadata-row">
            {/* Difficulty Pill */}
            <span
              className="capstone-badge-difficulty"
              style={{
                background: diffStyle.bg,
                border: diffStyle.border,
                color: diffStyle.text,
              }}
            >
              {diffStyle.icon}
              <span>{currentProject.difficulty}</span>
            </span>

            {/* Estimated Hours */}
            <span className="capstone-badge-effort">
              <Clock size={12} style={{ color: '#94a3b8' }} />
              <span>{currentProject.estimatedTime || '15-20 hours'}</span>
            </span>

            {/* Top Technology Badges with Official Logos */}
            {currentProject.technologies.slice(0, 5).map((tech, i) => (
              <span key={i} className="capstone-badge-tech">
                {renderTechLogo(tech, 13)}
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Top-Right: Not Started / Status Banner Card + Optional Close */}
        <div className="capstone-header-right">
          <div
            className="capstone-status-card"
            style={{
              background:
                briefProgress.status === 'completed'
                  ? 'rgba(6, 78, 59, 0.4)'
                  : briefProgress.status === 'in_progress'
                  ? 'rgba(30, 64, 175, 0.3)'
                  : 'rgba(6, 78, 59, 0.3)',
              borderColor:
                briefProgress.status === 'completed'
                  ? '#10b981'
                  : briefProgress.status === 'in_progress'
                  ? '#38bdf8'
                  : '#10b981',
            }}
          >
            <div
              className="capstone-status-icon-circle"
              style={{
                background:
                  briefProgress.status === 'completed'
                    ? '#10b981'
                    : briefProgress.status === 'in_progress'
                    ? '#0284c7'
                    : '#10b981',
              }}
            >
              {briefProgress.status === 'completed' ? (
                <CheckCircle2 size={16} />
              ) : briefProgress.status === 'in_progress' ? (
                <Play size={14} fill="#fff" />
              ) : (
                <Check size={16} />
              )}
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

          {/* Action Buttons: SRE Lessons & Fullscreen */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            {onExitToCurriculum && (
              <button
                type="button"
                onClick={onExitToCurriculum}
                className="capstone-btn-curriculum-exit"
                title="Return to standard curriculum lessons"
              >
                <BookOpen size={14} />
                <span>SRE Lessons</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="capstone-btn-header-action"
              title={isFullscreen ? 'Exit Fullscreen' : 'Expand to Fullscreen'}
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Expand to Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </button>

            {/* Close Button if Modal Mode */}
            {!isEmbedded && onClose && (
              <button
                onClick={onClose}
                className="capstone-btn-close"
                title="Close modal (Esc)"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            )}
          </div>
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
              {/* ROW 1: 2-Column Grid Stack (Column 1: Overview + Problem Statement; Column 2: Scenario + Project Objective) */}
              <div className="capstone-row-grid-2">
                {/* COLUMN 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                          <TrendingUp size={12} style={{ color: '#64748b' }} /> Difficulty
                        </span>
                        <span style={{ color: '#ffffff', fontWeight: 600, textAlign: 'right' }}>
                          {currentProject.projectOverview?.difficulty || currentProject.difficulty}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(51, 65, 85, 0.5)', paddingBottom: '0.45rem' }}>
                        <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Clock size={12} style={{ color: '#64748b' }} /> Estimated Effort
                        </span>
                        <span style={{ color: '#ffffff', fontWeight: 600, textAlign: 'right' }}>
                          {currentProject.projectOverview?.estimatedEffort || currentProject.estimatedTime}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(51, 65, 85, 0.5)', paddingBottom: '0.45rem' }}>
                        <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Boxes size={12} style={{ color: '#64748b' }} /> Technologies
                        </span>
                        <span style={{ color: '#ffffff', fontWeight: 600, textAlign: 'right', maxWidth: '240px' }}>
                          {currentProject.technologies.slice(0, 5).join(', ')}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingTop: '0.2rem' }}>
                        <span style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <FileText size={12} style={{ color: '#64748b' }} /> Short Description
                        </span>
                        <span style={{ color: '#cbd5e1', lineHeight: '1.4', fontSize: '0.75rem' }}>
                          {currentProject.projectOverview?.shortDescription || currentProject.overview}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: 3. Problem Statement */}
                  <div className="capstone-card-box">
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
                        currentProject.projectOverview?.shortDescription ||
                        `Addresses critical operational bottlenecks and security constraints in ${currentProject.title} by standardizing on ${currentProject.technologies.slice(0, 3).join(', ')}.`}
                    </p>
                  </div>
                </div>

                {/* COLUMN 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Card 2: 2. Real-World Scenario */}
                  <div className="capstone-card-box">
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
                        currentProject.overview ||
                        `You have joined a platform engineering team implementing ${currentProject.title}. The engineering organization requires a standardized, reliable, and secure production implementation.`}
                    </p>
                  </div>

                  {/* Card 4: 4. Project Objective */}
                  <div className="capstone-card-box" style={{ flex: 1 }}>
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

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingRight: '0.25rem' }}>
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

                {/* Architecture Diagram Canvas: Specialized Jenkins Pipeline for devops-10, Dynamic Topology for all other projects */}
                {/* Architecture Diagram Canvas: Specialized Jenkins Pipeline for devops-10, Dynamic Topology for all other projects */}
                {renderArchitectureVisualizer()}
              </div>

              {/* ROW 3: 2-Column Grid (Functional Requirements, Technical Requirements, Security Requirements) */}
              {/* ROW 3: 2-Column Grid (Functional Requirements, Technical Requirements) */}
              <div className="capstone-row-grid-2">
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

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {functionalList.map((req, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
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

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {technicalList.map((req, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
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

              {/* Card 8: 8. Security Requirements (Full Width 2-Column Grid) */}
              <div className="capstone-card-box">
                <div className="capstone-card-header">
                  <div
                    className="capstone-card-icon"
                    style={{
                      background: 'rgba(234, 179, 8, 0.15)',
                      border: '1px solid rgba(234, 179, 8, 0.35)',
                      color: '#facc15',
                    }}
                  >
                    <Shield size={15} />
                  </div>
                  <h2 className="capstone-card-title">8. Security Requirements</h2>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.6rem 1.25rem',
                  }}
                >
                  {securityList.map((req, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.78rem', color: '#e2e8f0' }}>
                      <CheckCircle2
                        size={14}
                        style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }}
                      />
                      <span style={{ lineHeight: '1.4' }}>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* REQUIREMENTS TAB */}
          {activeTab === 'requirements' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="capstone-card-box">
                <div className="capstone-card-header">
                  <div className="capstone-card-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                    <Settings size={16} />
                  </div>
                  <h2 className="capstone-card-title">Detailed Functional Requirements</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {functionalList.map((req, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.5rem', background: '#0b1120', borderRadius: '8px', border: '1px solid rgba(51, 65, 85, 0.4)' }}>
                      <CheckCircle2 size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="capstone-card-box">
                <div className="capstone-card-header">
                  <div className="capstone-card-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
                    <Wrench size={16} />
                  </div>
                  <h2 className="capstone-card-title">Technical Specifications & Constraints</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {technicalList.map((req, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.5rem', background: '#0b1120', borderRadius: '8px', border: '1px solid rgba(51, 65, 85, 0.4)' }}>
                      <CheckCircle2 size={16} style={{ color: '#38bdf8', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="capstone-card-box">
                <div className="capstone-card-header">
                  <div className="capstone-card-icon" style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#facc15' }}>
                    <Shield size={16} />
                  </div>
                  <h2 className="capstone-card-title">Security & Compliance Guardrails</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {securityList.map((req, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.5rem', background: '#0b1120', borderRadius: '8px', border: '1px solid rgba(51, 65, 85, 0.4)' }}>
                      <CheckCircle2 size={16} style={{ color: '#facc15', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ARCHITECTURE TAB */}
          {activeTab === 'architecture' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="capstone-card-box">
                <div className="capstone-card-header">
                  <div className="capstone-card-icon" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
                    <Layers size={16} />
                  </div>
                  <h2 className="capstone-card-title">Architecture Blueprint & Component Map</h2>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
                  {currentProject.whatYouNeedToBuild?.description ||
                    'A complete production-grade distributed architecture. All components communicate via authenticated, TLS-encrypted endpoints with automated failover and telemetry export.'}
                </p>

                {currentProject.whatYouNeedToBuild?.diagram && (
                  <pre
                    style={{
                      background: '#030712',
                      border: '1px solid rgba(51, 65, 85, 0.7)',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      color: '#38bdf8',
                      fontFamily: 'monospace',
                      fontSize: '0.82rem',
                      lineHeight: '1.45',
                      overflowX: 'auto',
                    }}
                  >
                    {currentProject.whatYouNeedToBuild.diagram}
                  </pre>
                )}
              </div>
            </div>
          )}

          {/* TECHNOLOGIES TAB */}
          {activeTab === 'technologies' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {currentProject.technologies.map((tech, i) => (
                <div key={i} className="capstone-card-box" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#0b1120', border: '1px solid rgba(51, 65, 85, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {renderTechLogo(tech, 24)}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc' }}>{tech}</h3>
                    <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Core Enterprise Tool</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* RESOURCES TAB */}
          {activeTab === 'resources' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="capstone-card-box">
                <div className="capstone-card-header">
                  <div className="capstone-card-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                    <BookOpen size={16} />
                  </div>
                  <h2 className="capstone-card-title">Official Documentation & Reference Material</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {(currentProject.resources?.officialDocs || [
                    { title: 'Official Documentation & Guides', url: 'https://kubernetes.io/docs/' },
                  ]).map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        background: '#0b1120',
                        border: '1px solid rgba(51, 65, 85, 0.5)',
                        borderRadius: '8px',
                        color: '#38bdf8',
                        textDecoration: 'none',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                      }}
                    >
                      <span>{doc.title}</span>
                      <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GUIDANCE TAB */}
          {activeTab === 'guidance' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="capstone-card-box">
                <div className="capstone-card-header">
                  <div className="capstone-card-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                    <Compass size={16} />
                  </div>
                  <h2 className="capstone-card-title">Recommended Implementation Approach</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {(currentProject.recommendedApproach || [
                    '1. Review the architecture diagram and functional requirements thoroughly.',
                    '2. Provision foundation networking and compute infrastructure.',
                    '3. Implement pipeline stages incrementally, verifying each stage with unit tests.',
                    '4. Run integration and end-to-end verification checks.',
                    '5. Review telemetry, metrics, and security audit logs.',
                  ]).map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
                      <span style={{ fontWeight: 800, color: '#38bdf8' }}>{idx + 1}.</span>
                      <span>{typeof step === 'string' ? step.replace(/^\d+\.\s*/, '') : step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CHECKLIST TAB */}
          {activeTab === 'checklist' && (
            <div className="capstone-card-box">
              <div className="capstone-card-header" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div className="capstone-card-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                    <CheckSquare size={16} />
                  </div>
                  <h2 className="capstone-card-title">Project Completion Checklist</h2>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700 }}>
                  {checkedCount} of {checklistCount} Completed ({checklistPercentage}%)
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
                {checklistItems.map((item, idx) => {
                  const isChecked = checkedIndices.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => handleToggleCheck(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        background: isChecked ? 'rgba(16, 185, 129, 0.08)' : '#0b1120',
                        border: isChecked ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(51, 65, 85, 0.5)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        style={{ cursor: 'pointer', accentColor: '#10b981', width: '16px', height: '16px' }}
                      />
                      <span
                        style={{
                          fontSize: '0.84rem',
                          color: isChecked ? '#94a3b8' : '#f1f5f9',
                          textDecoration: isChecked ? 'line-through' : 'none',
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
        {/* RIGHT COLUMN: Sidebar Widgets (Progress, Technologies, Difficulty 1..10) */}
        {/* ----------------------------------------------------------------------- */}
        <div className="capstone-sidebar-right">
          {/* WIDGET 1: Project Progress */}
          <div className="capstone-sidebar-card">
            <div className="capstone-sidebar-title">
              <ListChecks size={16} />
              <span>Project Progress</span>
            </div>

            {/* Progress Bar & Percentage */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.15rem 0' }}>
              <div
                style={{
                  flex: 1,
                  height: '6px',
                  borderRadius: '999px',
                  background: '#1e293b',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${briefProgress.status === 'completed' ? 100 : checklistPercentage}%`,
                    background: '#2563eb',
                    borderRadius: '999px',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ffffff' }}>
                {briefProgress.status === 'completed' ? 100 : checklistPercentage}%
              </span>
            </div>

            {/* Blue Primary Button: Start Project */}
            <button
              type="button"
              onClick={() => handleStatusChange('in_progress')}
              className="capstone-btn-start"
            >
              <Play size={13} fill="#ffffff" color="#ffffff" />
              <span>{briefProgress.status === 'in_progress' ? 'Resume Project' : 'Start Project'}</span>
            </button>

            {/* Outlined Button: Mark as Completed */}
            <button
              type="button"
              onClick={() =>
                handleStatusChange(
                  briefProgress.status === 'completed' ? 'in_progress' : 'completed'
                )
              }
              className="capstone-btn-completed"
            >
              <Check size={14} />
              <span>{briefProgress.status === 'completed' ? 'Mark In Progress' : 'Mark as Completed'}</span>
            </button>
          </div>

          {/* WIDGET 2: Technologies */}
          <div className="capstone-sidebar-card">
            <div className="capstone-sidebar-title">
              <Boxes size={16} />
              <span>Technologies</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {currentProject.technologies.map((tech, i) => (
                <div
                  key={i}
                  className="capstone-tech-row"
                >
                  <div style={{ width: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {renderTechLogo(tech, 18)}
                  </div>
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WIDGET 3: Difficulty Progression (1 to 10) */}
          <div className="capstone-sidebar-card">
            <div className="capstone-sidebar-title">
              <Sliders size={16} />
              <span>Difficulty Progression</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {academyProjects.slice(0, 10).map((proj, idx) => {
                const isCurrent = proj.id === currentProject.id;
                const projectNum = idx + 1;
                const shortTitle = getShortTitle(proj, idx);
                const isExpert = proj.difficulty?.toLowerCase().includes('expert') || proj.difficulty?.toLowerCase().includes('production');

                return (
                  <div
                    key={proj.id}
                    onClick={() => handleSelectProject(proj)}
                    className={`capstone-prog-row ${isCurrent ? 'active' : ''}`}
                  >
                    {/* Circle with Step Number */}
                    <div className="capstone-prog-circle">
                      {projectNum}
                    </div>

                    {/* Project Title & Difficulty */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: isCurrent ? 800 : 600,
                          color: isCurrent ? '#ffffff' : '#cbd5e1',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {shortTitle}
                      </div>
                      <div
                        style={{
                          fontSize: '0.68rem',
                          color: isCurrent ? '#fca5a5' : isExpert ? '#f87171' : '#64748b',
                          fontWeight: 500,
                        }}
                      >
                        {proj.difficulty}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
