import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useProgress } from '../../progress';
import { Boxes, Sparkles, Search, Database, Menu, X } from 'lucide-react';
import {
  GitOfficialIcon,
  DockerOfficialIcon,
  KubernetesOfficialIcon,
  LinuxOfficialIcon,
  TerraformOfficialIcon,
  DevOpsOfficialIcon,
  RoadmapOfficialIcon,
} from '../common/TechnologyIcons';
import './suiteHeaderNav.css';

export const SuiteHeaderNav: React.FC = () => {
  const { mode, setMode, setShowProblemSearch } = useApp();
  const { openSettings } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="header-nav suite-header-nav">
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => {
            setMode('home');
            setMobileMenuOpen(false);
          }}
          className="suite-brand-btn"
          aria-label="CloudStack Home"
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(14, 165, 233, 0.35)',
            }}
          >
            <Boxes size={18} color="#fff" />
          </div>
          <span className="suite-brand-title" style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Cloud<span style={{ color: '#38bdf8' }}>Stack</span>
          </span>
          <span className="suite-brand-badge">
            Cloud &amp; DevOps Academies
          </span>
        </button>
      </div>

      {/* Academy Switcher Buttons (Desktop & Tablet) */}
      <div className="suite-nav-links">
        <button
          onClick={() => setMode('devops')}
          className="suite-nav-btn"
          style={{
            background: mode === 'devops' ? 'rgba(168, 85, 247, 0.28)' : 'rgba(168, 85, 247, 0.1)',
            border: mode === 'devops' ? '1px solid rgba(168, 85, 247, 0.65)' : '1px solid rgba(168, 85, 247, 0.25)',
            boxShadow: mode === 'devops' ? '0 0 14px rgba(168, 85, 247, 0.35)' : 'none',
          }}
          title="DevOps Academy (29 Chapters)"
          aria-label="DevOps Academy"
        >
          <DevOpsOfficialIcon size={22} />
          <span className="suite-nav-text">DevOps</span>
        </button>

        <button
          onClick={() => setMode('learn')}
          className="suite-nav-btn"
          style={{
            background: mode === 'learn' ? 'rgba(240, 80, 51, 0.28)' : 'rgba(240, 80, 51, 0.1)',
            border: mode === 'learn' ? '1px solid rgba(240, 80, 51, 0.65)' : '1px solid rgba(240, 80, 51, 0.25)',
            boxShadow: mode === 'learn' ? '0 0 14px rgba(240, 80, 51, 0.35)' : 'none',
          }}
          title="Git Academy"
          aria-label="Git Academy"
        >
          <GitOfficialIcon size={22} />
          <span className="suite-nav-text">Git</span>
        </button>

        <button
          onClick={() => setMode('docker')}
          className="suite-nav-btn"
          style={{
            background: mode === 'docker' ? 'rgba(36, 150, 237, 0.28)' : 'rgba(36, 150, 237, 0.1)',
            border: mode === 'docker' ? '1px solid rgba(36, 150, 237, 0.65)' : '1px solid rgba(36, 150, 237, 0.25)',
            boxShadow: mode === 'docker' ? '0 0 14px rgba(36, 150, 237, 0.35)' : 'none',
          }}
          title="Docker Academy"
          aria-label="Docker Academy"
        >
          <DockerOfficialIcon size={22} />
          <span className="suite-nav-text">Docker</span>
        </button>

        <button
          onClick={() => setMode('kubernetes')}
          className="suite-nav-btn"
          style={{
            background: mode === 'kubernetes' ? 'rgba(50, 108, 229, 0.28)' : 'rgba(50, 108, 229, 0.1)',
            border: mode === 'kubernetes' ? '1px solid rgba(50, 108, 229, 0.65)' : '1px solid rgba(50, 108, 229, 0.25)',
            boxShadow: mode === 'kubernetes' ? '0 0 14px rgba(50, 108, 229, 0.35)' : 'none',
          }}
          title="Kubernetes Academy"
          aria-label="Kubernetes Academy"
        >
          <KubernetesOfficialIcon size={22} />
          <span className="suite-nav-text">Kubernetes</span>
        </button>

        <button
          onClick={() => setMode('linuxforge')}
          className="suite-nav-btn"
          style={{
            background: mode === 'linuxforge' ? 'rgba(252, 198, 36, 0.24)' : 'rgba(252, 198, 36, 0.08)',
            border: mode === 'linuxforge' ? '1px solid rgba(252, 198, 36, 0.6)' : '1px solid rgba(252, 198, 36, 0.22)',
            boxShadow: mode === 'linuxforge' ? '0 0 14px rgba(252, 198, 36, 0.3)' : 'none',
          }}
          title="Linux Academy"
          aria-label="Linux Academy"
        >
          <LinuxOfficialIcon size={22} />
          <span className="suite-nav-text">Linux</span>
        </button>

        <button
          onClick={() => setMode('terraform')}
          className="suite-nav-btn"
          style={{
            background: mode === 'terraform' ? 'rgba(132, 79, 186, 0.3)' : 'rgba(132, 79, 186, 0.1)',
            border: mode === 'terraform' ? '1px solid rgba(132, 79, 186, 0.65)' : '1px solid rgba(132, 79, 186, 0.25)',
            boxShadow: mode === 'terraform' ? '0 0 14px rgba(132, 79, 186, 0.35)' : 'none',
          }}
          title="Terraform Academy (50 Chapters)"
          aria-label="Terraform Academy"
        >
          <TerraformOfficialIcon size={22} />
          <span className="suite-nav-text">Terraform</span>
        </button>

        <button
          onClick={() => setMode('roadmap')}
          className="suite-nav-btn"
          style={{
            background: mode === 'roadmap' ? 'rgba(234, 179, 8, 0.22)' : 'transparent',
            border: mode === 'roadmap' ? '1px solid rgba(234, 179, 8, 0.6)' : '1px solid var(--border-color)',
            boxShadow: mode === 'roadmap' ? '0 0 14px rgba(234, 179, 8, 0.3)' : 'none',
          }}
          title="Cloud & DevOps Engineering Roadmap"
          aria-label="Cloud & DevOps Engineering Roadmap"
        >
          <RoadmapOfficialIcon size={22} />
          <span className="suite-nav-text">Roadmap</span>
        </button>
      </div>

      {/* Right Controls */}
      <div className="suite-right-controls">
        <button
          onClick={openSettings}
          className="suite-control-btn"
          title="Backup & Restore Learning Progress"
          aria-label="Backup & Restore Learning Progress"
        >
          <Database size={13} color="#38bdf8" />
          <span className="suite-control-text">Progress</span>
        </button>

        <button
          onClick={() => setShowProblemSearch(true)}
          className="suite-control-btn"
          title="Search all concepts (Ctrl+K or ⌘K)"
          aria-label="Search all concepts"
        >
          <Search size={13} />
          <span className="suite-control-text">Search</span>
          <kbd
            className="suite-control-kbd"
            style={{
              padding: '0.1rem 0.3rem',
              borderRadius: '3px',
              background: 'var(--bg-surface-elevated)',
              fontSize: '0.65rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            ⌘K
          </kbd>
        </button>

        {/* Mobile Hamburger Toggle (< 640px) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="suite-mobile-toggle-btn"
          title={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer (< 640px) */}
      {mobileMenuOpen && (
        <div className="suite-mobile-drawer">
          <button
            onClick={() => {
              setMode('devops');
              setMobileMenuOpen(false);
            }}
            className="suite-mobile-item"
            style={{ borderLeft: '3px solid #c084fc' }}
          >
            <DevOpsOfficialIcon size={20} />
            <div>
              <div style={{ color: '#c084fc', fontWeight: 700 }}>DevOps Academy (29 Ch)</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Master DevOps &amp; Cloud Curriculum</div>
            </div>
          </button>

          <button
            onClick={() => {
              setMode('learn');
              setMobileMenuOpen(false);
            }}
            className="suite-mobile-item"
            style={{ borderLeft: '3px solid var(--git-orange)' }}
          >
            <GitOfficialIcon size={20} />
            <div>
              <div style={{ color: 'var(--git-orange)', fontWeight: 700 }}>Git Academy</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Interactive Git Graph &amp; CI/CD Academy</div>
            </div>
          </button>

          <button
            onClick={() => {
              setMode('docker');
              setMobileMenuOpen(false);
            }}
            className="suite-mobile-item"
            style={{ borderLeft: '3px solid #38bdf8' }}
          >
            <DockerOfficialIcon size={20} />
            <div>
              <div style={{ color: '#38bdf8', fontWeight: 700 }}>Docker Academy</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Docker &amp; Containerization Engine</div>
            </div>
          </button>

          <button
            onClick={() => {
              setMode('kubernetes');
              setMobileMenuOpen(false);
            }}
            className="suite-mobile-item"
            style={{ borderLeft: '3px solid #60a5fa' }}
          >
            <KubernetesOfficialIcon size={20} />
            <div>
              <div style={{ color: '#60a5fa', fontWeight: 700 }}>Kubernetes Academy</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Kubernetes Orchestration Academy</div>
            </div>
          </button>

          <button
            onClick={() => {
              setMode('linuxforge');
              setMobileMenuOpen(false);
            }}
            className="suite-mobile-item"
            style={{ borderLeft: '3px solid #06b6d4' }}
          >
            <LinuxOfficialIcon size={20} />
            <div>
              <div style={{ color: '#06b6d4', fontWeight: 700 }}>Linux Academy</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Linux Systems, Kernel &amp; SRE</div>
            </div>
          </button>

          <button
            onClick={() => {
              setMode('terraform');
              setMobileMenuOpen(false);
            }}
            className="suite-mobile-item"
            style={{ borderLeft: '3px solid #c084fc' }}
          >
            <TerraformOfficialIcon size={20} />
            <div>
              <div style={{ color: '#c084fc', fontWeight: 700 }}>Terraform Academy</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Infrastructure as Code (50 Chapters)</div>
            </div>
          </button>

          <button
            onClick={() => {
              setMode('roadmap');
              setMobileMenuOpen(false);
            }}
            className="suite-mobile-item"
            style={{ borderLeft: '3px solid #facc15' }}
          >
            <RoadmapOfficialIcon size={20} />
            <div>
              <div style={{ color: '#facc15', fontWeight: 700 }}>Cloud &amp; DevOps Roadmap</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>9-Stage Engineering Curriculum</div>
            </div>
          </button>

          <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.2rem 0' }} />

          <button
            onClick={() => {
              openSettings();
              setMobileMenuOpen(false);
            }}
            className="suite-mobile-item"
          >
            <Database size={16} color="#38bdf8" />
            <span>Backup & Restore Progress</span>
          </button>

          <button
            onClick={() => {
              setShowProblemSearch(true);
              setMobileMenuOpen(false);
            }}
            className="suite-mobile-item"
          >
            <Search size={16} />
            <span>Search Concept Database (⌘K)</span>
          </button>
        </div>
      )}
    </header>
  );
};
