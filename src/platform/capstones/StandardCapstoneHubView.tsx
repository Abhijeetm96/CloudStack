import React, { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle2,
  Trophy,
  Layers,
  ArrowRight,
  Clock,
  Flame,
  Award,
  BookOpen,
} from 'lucide-react';
import {
  ALL_CAPSTONES,
  CAPSTONE_COUNTS_BY_ACADEMY,
  TOTAL_CAPSTONE_PROJECTS,
} from './data';
import { CapstoneProject, CapstoneAcademy, CapstoneDifficulty } from './types';
import { getAllCapstoneBriefProgress, getCapstoneCompletionStats } from './capstoneProgress';
import { StandardCapstoneRunnerModal } from './StandardCapstoneRunnerModal';
import './capstone.css';

export interface StandardCapstoneHubViewProps {
  initialAcademy?: CapstoneAcademy | 'all';
  onSwitchToSuite?: (mode: any) => void;
}

export const StandardCapstoneHubView: React.FC<StandardCapstoneHubViewProps> = ({
  initialAcademy = 'all',
  onSwitchToSuite,
}) => {
  const [selectedAcademy, setSelectedAcademy] = useState<CapstoneAcademy | 'all'>(initialAcademy);
  const [selectedDifficulty, setSelectedDifficulty] = useState<CapstoneDifficulty | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<CapstoneProject | null>(null);
  const [progressVersion, setProgressVersion] = useState(0);

  const allBriefProgress = useMemo(() => {
    return getAllCapstoneBriefProgress();
  }, [progressVersion]);

  const stats = useMemo(() => {
    return getCapstoneCompletionStats(ALL_CAPSTONES.map((p) => p.id));
  }, [allBriefProgress]);

  const filteredProjects = useMemo(() => {
    let result = ALL_CAPSTONES;

    if (selectedAcademy !== 'all') {
      result = result.filter((p) => p.academy === selectedAcademy);
    }

    if (selectedDifficulty !== 'all') {
      result = result.filter((p) => p.difficulty === selectedDifficulty);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.overview.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return result;
  }, [selectedAcademy, selectedDifficulty, searchQuery]);

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

  const getAcademyBadge = (academy: CapstoneAcademy) => {
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
        return { label: 'Cross-Academy Master', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' };
      default:
        return { label: academy, color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' };
    }
  };

  return (
    <div className="capstone-hub-container">
      {/* Hero Banner */}
      <div className="capstone-hero-banner">
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '0.25rem 0.65rem',
              borderRadius: '999px',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            <Trophy size={14} /> Production Engineering Capstone Hub
          </div>
          <h1
            style={{
              margin: '0 0 0.5rem 0',
              fontSize: '2rem',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CloudStack Capstone Engineering Suite
          </h1>
          <p
            style={{
              margin: 0,
              color: '#94a3b8',
              fontSize: '0.95rem',
              maxWidth: '750px',
              lineHeight: '1.6',
            }}
          >
            61 production-grade engineering capstones spanning Git, Linux, Docker, DevOps, Terraform, and Kubernetes, culminating in the Ultimate Cross-Academy Production Platform. Explore realistic project briefs, follow recommended architectures, and track your completion milestones independently in your local development environment.
          </p>
        </div>

        {onSwitchToSuite && (
          <button
            onClick={() => onSwitchToSuite('home')}
            style={{
              background: 'rgba(30, 41, 59, 0.7)',
              border: '1px solid rgba(71, 85, 105, 0.6)',
              color: '#cbd5e1',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            Back to Suite
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="capstone-stats-grid">
        <div className="capstone-stat-card">
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(56, 189, 248, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
            }}
          >
            <Layers size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f8fafc' }}>
              {TOTAL_CAPSTONE_PROJECTS}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Total Capstone Projects</div>
          </div>
        </div>

        <div className="capstone-stat-card">
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981',
            }}
          >
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10b981' }}>
              {stats.completed} / {stats.total}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Completed Projects ({stats.percentage}%)</div>
          </div>
        </div>

        <div className="capstone-stat-card">
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f59e0b',
            }}
          >
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f59e0b' }}>
              {stats.inProgress}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>In Progress Projects</div>
          </div>
        </div>

        <div className="capstone-stat-card">
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(236, 72, 153, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ec4899',
            }}
          >
            <Flame size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f43f5e' }}>
              6 × 10 + 1
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>60 Academy + 1 Master Platform</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="capstone-filter-bar">
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#64748b',
            }}
          />
          <input
            type="text"
            className="capstone-search-input"
            placeholder="Search all 61 capstones by keyword, title, tag, or code (e.g. K8S-10, GIT-05, TERRAFORM-08)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Academy Filter Pills */}
        <div className="capstone-pill-group">
          <span style={{ fontSize: '0.8rem', color: '#64748b', alignSelf: 'center', marginRight: '0.25rem' }}>
            Academy:
          </span>
          {(
            [
              { id: 'all', label: `All Academies (${TOTAL_CAPSTONE_PROJECTS})` },
              { id: 'git', label: `Git (${CAPSTONE_COUNTS_BY_ACADEMY.git})` },
              { id: 'linux', label: `Linux (${CAPSTONE_COUNTS_BY_ACADEMY.linux})` },
              { id: 'docker', label: `Docker (${CAPSTONE_COUNTS_BY_ACADEMY.docker})` },
              { id: 'devops', label: `DevOps (${CAPSTONE_COUNTS_BY_ACADEMY.devops})` },
              { id: 'terraform', label: `Terraform (${CAPSTONE_COUNTS_BY_ACADEMY.terraform})` },
              { id: 'kubernetes', label: `Kubernetes (${CAPSTONE_COUNTS_BY_ACADEMY.kubernetes})` },
              { id: 'cross-academy', label: `Master Platform (1)` },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              className={`capstone-filter-pill ${selectedAcademy === item.id ? 'active' : ''}`}
              onClick={() => setSelectedAcademy(item.id as CapstoneAcademy | 'all')}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Difficulty Filter Pills */}
        <div className="capstone-pill-group">
          <span style={{ fontSize: '0.8rem', color: '#64748b', alignSelf: 'center', marginRight: '0.25rem' }}>
            Difficulty:
          </span>
          {(['all', 'Beginner', 'Intermediate', 'Advanced', 'Production', 'Expert'] as const).map((diff) => (
            <button
              key={diff}
              className={`capstone-filter-pill ${selectedDifficulty === diff ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty(diff)}
              style={
                selectedDifficulty === diff && diff !== 'all'
                  ? { borderColor: getDifficultyColor(diff as CapstoneDifficulty), color: getDifficultyColor(diff as CapstoneDifficulty) }
                  : {}
              }
            >
              {diff === 'all' ? 'All Difficulties' : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="capstones-card-grid">
        {filteredProjects.map((project) => {
          const brief = allBriefProgress[project.id];
          const status = brief?.status || 'not_started';
          const isCompleted = status === 'completed';
          const isInProgress = status === 'in_progress';
          const checkedCount = brief?.checkedChecklistIndices?.length || 0;
          const totalChecklist = project.completionChecklist?.length || 10;
          const badge = getAcademyBadge(project.academy);
          const techs = project.technologies || project.projectOverview?.technologies || [];

          return (
            <div
              key={project.id}
              className={`capstone-card ${isCompleted ? 'completed' : ''}`}
            >
              {/* Card Header */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      background: badge.bg,
                      color: badge.color,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '6px',
                    }}
                  >
                    {badge.label}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {isCompleted && (
                      <span
                        style={{
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#10b981',
                          border: '1px solid rgba(16, 185, 129, 0.35)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.45rem',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        <CheckCircle2 size={11} /> Done
                      </span>
                    )}

                    {isInProgress && (
                      <span
                        style={{
                          background: 'rgba(56, 189, 248, 0.15)',
                          color: '#38bdf8',
                          border: '1px solid rgba(56, 189, 248, 0.35)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.45rem',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                        }}
                      >
                        <Clock size={11} /> In Progress
                      </span>
                    )}

                    <span
                      style={{
                        background: `${getDifficultyColor(project.difficulty)}18`,
                        color: getDifficultyColor(project.difficulty),
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '999px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {project.difficulty}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.9rem' }}>
                    {project.code}
                  </span>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                    {project.title}
                  </h3>
                </div>

                <p
                  style={{
                    color: '#94a3b8',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    margin: '0 0 0.85rem 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {project.projectOverview?.shortDescription || project.overview}
                </p>

                {/* Technologies tags */}
                {techs.length > 0 && (
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
                    {techs.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          background: 'rgba(30, 41, 59, 0.6)',
                          color: '#94a3b8',
                          fontSize: '0.72rem',
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(71, 85, 105, 0.4)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {techs.length > 4 && (
                      <span style={{ fontSize: '0.7rem', color: '#64748b', alignSelf: 'center' }}>
                        +{techs.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                {/* Key stats row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    fontSize: '0.78rem',
                    color: '#64748b',
                    marginBottom: '1rem',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} /> {project.estimatedTime}
                  </span>
                  <span>•</span>
                  <span>{checkedCount} / {totalChecklist} self-checks</span>
                  <span>•</span>
                  <span>22 Specs Brief</span>
                </div>
              </div>

              {/* Card Footer */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(51, 65, 85, 0.5)',
                }}
              >
                <div style={{ fontSize: '0.8rem', color: isCompleted ? '#10b981' : isInProgress ? '#38bdf8' : '#64748b' }}>
                  {isCompleted ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700 }}>
                      <CheckCircle2 size={14} /> Completed
                    </span>
                  ) : isInProgress ? (
                    <span>In Progress ({checkedCount} checked)</span>
                  ) : (
                    <span>Not Started</span>
                  )}
                </div>

                <button
                  onClick={() => setActiveProject(project)}
                  style={{
                    background: isCompleted
                      ? 'rgba(30, 41, 59, 0.8)'
                      : 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                    border: isCompleted ? '1px solid rgba(16, 185, 129, 0.4)' : 'none',
                    color: '#f8fafc',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    padding: '0.45rem 0.9rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: isCompleted ? 'none' : '0 4px 12px rgba(14, 165, 233, 0.35)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isCompleted ? 'Review Brief' : 'Open Project Brief'} <ArrowRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div
          style={{
            padding: '3rem',
            textAlign: 'center',
            color: '#94a3b8',
            background: 'rgba(15, 23, 42, 0.5)',
            borderRadius: '12px',
            border: '1px dashed rgba(51, 65, 85, 0.6)',
          }}
        >
          <Search size={32} style={{ marginBottom: '0.75rem', opacity: 0.5 }} />
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#f1f5f9' }}>No Capstone Projects Match Your Filters</h3>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            Try clearing your search query or switching academy/difficulty filters.
          </p>
        </div>
      )}

      {/* Project Brief Viewer Modal */}
      {activeProject && (
        <StandardCapstoneRunnerModal
          project={activeProject}
          isOpen={!!activeProject}
          onClose={() => setActiveProject(null)}
          onCompleted={() => setProgressVersion((v) => v + 1)}
        />
      )}
    </div>
  );
};
