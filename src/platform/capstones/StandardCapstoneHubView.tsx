import React, { useState, useMemo } from 'react';
import {
  Rocket,
  Search,
  CheckCircle2,
  Trophy,
  Filter,
  Sparkles,
  Layers,
  ArrowRight,
  Clock,
  Flame,
  Award,
} from 'lucide-react';
import {
  ALL_CAPSTONES,
  CAPSTONE_COUNTS_BY_ACADEMY,
  TOTAL_CAPSTONE_PROJECTS,
} from './data';
import { CapstoneProject, CapstoneAcademy, CapstoneDifficulty } from './types';
import { getAllCapstoneProgress, getCapstoneCompletionStats } from './capstoneProgress';
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

  const allProgress = useMemo(() => {
    // re-evaluate when progressVersion bumps
    return getAllCapstoneProgress();
  }, [progressVersion]);

  const stats = useMemo(() => {
    return getCapstoneCompletionStats(ALL_CAPSTONES.map((p) => p.id));
  }, [allProgress]);

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
            <Trophy size={14} /> Official Capstone Project System
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
            31 exhaustive, production-grade hands-on capstones spanning Git, Linux, Docker, DevOps, Terraform, and Kubernetes, culminating in the Ultimate Cross-Academy Production Platform. Complete tasks, inspect architectures, recover from catastrophic failures, and earn your mastery score.
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
            <Award size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f59e0b' }}>
              {stats.totalScore} pts
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Earned Score</div>
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
              6 + 1
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Academies + Final Platform</div>
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
            placeholder="Search all 31 capstones by keyword, title, tag, or code (e.g. K8S-04, LINUX-02)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Academy Filter Pills */}
        <div className="capstone-pill-group">
          <button
            className={`capstone-filter-pill ${selectedAcademy === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedAcademy('all')}
          >
            All Academies ({TOTAL_CAPSTONE_PROJECTS})
          </button>
          <button
            className={`capstone-filter-pill ${selectedAcademy === 'git' ? 'active' : ''}`}
            onClick={() => setSelectedAcademy('git')}
          >
            Git ({CAPSTONE_COUNTS_BY_ACADEMY.git})
          </button>
          <button
            className={`capstone-filter-pill ${selectedAcademy === 'linux' ? 'active' : ''}`}
            onClick={() => setSelectedAcademy('linux')}
          >
            Linux ({CAPSTONE_COUNTS_BY_ACADEMY.linux})
          </button>
          <button
            className={`capstone-filter-pill ${selectedAcademy === 'docker' ? 'active' : ''}`}
            onClick={() => setSelectedAcademy('docker')}
          >
            Docker ({CAPSTONE_COUNTS_BY_ACADEMY.docker})
          </button>
          <button
            className={`capstone-filter-pill ${selectedAcademy === 'devops' ? 'active' : ''}`}
            onClick={() => setSelectedAcademy('devops')}
          >
            DevOps ({CAPSTONE_COUNTS_BY_ACADEMY.devops})
          </button>
          <button
            className={`capstone-filter-pill ${selectedAcademy === 'terraform' ? 'active' : ''}`}
            onClick={() => setSelectedAcademy('terraform')}
          >
            Terraform ({CAPSTONE_COUNTS_BY_ACADEMY.terraform})
          </button>
          <button
            className={`capstone-filter-pill ${selectedAcademy === 'kubernetes' ? 'active' : ''}`}
            onClick={() => setSelectedAcademy('kubernetes')}
          >
            Kubernetes ({CAPSTONE_COUNTS_BY_ACADEMY.kubernetes})
          </button>
          <button
            className={`capstone-filter-pill ${selectedAcademy === 'cross-academy' ? 'active' : ''}`}
            onClick={() => setSelectedAcademy('cross-academy')}
          >
            👑 Ultimate Capstone (1)
          </button>
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
          const isCompleted = allProgress[project.id]?.completed;
          const userScore = allProgress[project.id]?.score || 0;
          const badge = getAcademyBadge(project.academy);

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
                    margin: '0 0 1rem 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {project.overview}
                </p>

                {/* Key stats row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '0.78rem',
                    color: '#64748b',
                    marginBottom: '1rem',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} /> {project.estimatedTime}
                  </span>
                  <span>•</span>
                  <span>{project.tasks.length} Step Challenges</span>
                  <span>•</span>
                  <span>{project.failureScenarios.length} Failure Scenarios</span>
                </div>
              </div>

              {/* Card Footer */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(51, 65, 85, 0.5)',
                }}
              >
                <div>
                  {isCompleted ? (
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        color: '#10b981',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                      }}
                    >
                      <CheckCircle2 size={15} /> Completed ({userScore} pts)
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      Reward: <strong style={{ color: '#f59e0b' }}>{project.scoreMax} pts</strong>
                    </span>
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
                  {isCompleted ? 'Review Project' : 'Launch Project'} <ArrowRight size={13} />
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

      {/* Interactive Project Runner Modal */}
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
