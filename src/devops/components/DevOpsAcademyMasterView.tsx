import React, { useState, useMemo } from 'react';
import {
  DEVOPS_29_CHAPTERS,
  DEVOPS_10_TRACKS,
  DevOpsChapter,
  DevOpsTrackCategory,
  TOTAL_DEVOPS_CHAPTERS,
  TOTAL_DEVOPS_SUBMODULES,
  TOTAL_DEVOPS_TOPICS,
} from '../data/devopsCurriculumData';
import { useApp, ViewMode } from '../../context/AppContext';
import {
  Terminal,
  Container,
  Boxes,
  Workflow,
  Cloud,
  Activity,
  ShieldCheck,
  Layers,
  Code2,
  Award,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Compass,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Terminal,
  Container,
  Boxes,
  Workflow,
  Cloud,
  Activity,
  ShieldCheck,
  Layers,
  Code2,
  Award,
};

export const DevOpsAcademyMasterView: React.FC = () => {
  const { setMode } = useApp();
  const [activeTab, setActiveTab] = useState<'tracks' | 'chapters'>('tracks');
  const [selectedCategory, setSelectedCategory] = useState<DevOpsTrackCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChapterIds, setExpandedChapterIds] = useState<Record<string, boolean>>({
    'ch01-linux': true,
    'ch02-networking': false,
    'ch03-git': false,
    'ch04-docker': false,
    'ch06-kubernetes-fundamentals': false,
  });

  const toggleChapter = (id: string) => {
    setExpandedChapterIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLaunchLive = (action: DevOpsChapter['liveAction']) => {
    if (!action) return;
    if (action.route === '/linuxforge') setMode('linuxforge');
    else if (action.route === '/commitforge') setMode('learn');
    else if (action.route === '/dockforge') setMode('dockforge');
    else if (action.route === '/podforge') setMode('podforge');
    else if (action.route === '/solver') setMode('hospital');
    else setMode('home');
  };

  const filteredChapters = useMemo(() => {
    return DEVOPS_29_CHAPTERS.filter((ch) => {
      const matchesCategory = selectedCategory === 'all' || ch.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = ch.title.toLowerCase().includes(q) || ch.chapterCode.toLowerCase().includes(q);
      const matchSummary = ch.summary.toLowerCase().includes(q);
      const matchTech = ch.targetTech.some((t) => t.toLowerCase().includes(q));
      const matchSub = ch.subModules.some(
        (sm) =>
          sm.title.toLowerCase().includes(q) ||
          sm.topics.some((top) => top.toLowerCase().includes(q))
      );
      return matchTitle || matchSummary || matchTech || matchSub;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        overflowY: 'auto',
        background: '#030712',
        color: '#f8fafc',
        padding: '2.5rem 1.5rem 5rem',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* ============================================================ */}
        {/* HERO BANNER                                                  */}
        {/* ============================================================ */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              color: '#06b6d4',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
            }}
          >
            <Sparkles size={14} />
            <span>Master Syllabus • 29 Chapters • 10 Learning Tracks</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: '0 0 1rem 0',
              background: 'linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            DevOps & Cloud Engineering Academy
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#94a3b8',
              maxWidth: '820px',
              margin: '0 auto 2rem',
              lineHeight: 1.6,
            }}
          >
            A complete, production-grade curriculum from fundamental Linux primitives to
            hyperscaler multi-region orchestration, GitOps automation, and high-stakes 3 AM
            incident response.
          </p>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              padding: '1rem 1.5rem',
              borderRadius: '16px',
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#38bdf8' }}>
                {TOTAL_DEVOPS_CHAPTERS}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                Master Chapters
              </div>
            </div>
            <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#06b6d4' }}>
                {DEVOPS_10_TRACKS.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                Learning Tracks
              </div>
            </div>
            <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#10b981' }}>
                {TOTAL_DEVOPS_SUBMODULES}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                Detailed Submodules
              </div>
            </div>
            <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }} />
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f59e0b' }}>
                {TOTAL_DEVOPS_TOPICS}+
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                Curated Topics
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* VIEW SELECTOR & SEARCH                                       */}
        {/* ============================================================ */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          {/* Tabs: Learning Tracks vs 29 Chapters */}
          <div
            style={{
              display: 'inline-flex',
              padding: '0.3rem',
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <button
              onClick={() => setActiveTab('tracks')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'tracks' ? '#06b6d4' : 'transparent',
                color: activeTab === 'tracks' ? '#0f172a' : '#94a3b8',
                fontWeight: 800,
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <Compass size={15} />
              <span>10 Learning Tracks</span>
            </button>
            <button
              onClick={() => setActiveTab('chapters')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'chapters' ? '#06b6d4' : 'transparent',
                color: activeTab === 'chapters' ? '#0f172a' : '#94a3b8',
                fontWeight: 800,
                fontSize: '0.84rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <BookOpen size={15} />
              <span>All 29 Chapters</span>
            </button>
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', minWidth: '280px', flex: '1 1 300px', maxWidth: '420px' }}>
            <Search
              size={16}
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
              placeholder="Search chapters, commands, topics (e.g. umask, CNI, OOM, Terraform)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.4rem',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#f8fafc',
                fontSize: '0.84rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* ============================================================ */}
        {/* VIEW 1: 10 LEARNING TRACKS                                    */}
        {/* ============================================================ */}
        {activeTab === 'tracks' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {DEVOPS_10_TRACKS.map((track) => {
              const TrackIcon = ICON_MAP[track.iconName] || Terminal;
              const trackChapters = DEVOPS_29_CHAPTERS.filter((ch) =>
                track.chapterNumbers.includes(ch.number)
              );

              return (
                <div
                  key={track.id}
                  style={{
                    borderRadius: '20px',
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '1.75rem',
                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  {/* Track Header */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          background: `rgba(${parseInt(track.color.slice(1, 3), 16)}, ${parseInt(track.color.slice(3, 5), 16)}, ${parseInt(track.color.slice(5, 7), 16)}, 0.15)`,
                          border: `1px solid ${track.color}40`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: track.color,
                        }}
                      >
                        <TrackIcon size={22} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            color: track.color,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}
                        >
                          TRACK {track.trackNumber}
                        </div>
                        <h2 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
                          {track.title}
                        </h2>
                      </div>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.86rem', color: '#94a3b8', maxWidth: '520px' }}>
                      {track.description}
                    </p>
                  </div>

                  {/* Chapters within Track */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    {trackChapters.map((ch) => (
                      <div
                        key={ch.id}
                        style={{
                          borderRadius: '14px',
                          background: 'rgba(2, 6, 23, 0.55)',
                          border:
                            ch.status === 'live'
                              ? `1px solid ${track.color}50`
                              : '1px solid rgba(255, 255, 255, 0.06)',
                          padding: '1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          position: 'relative',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBottom: '0.5rem',
                            }}
                          >
                            <span
                              style={{
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                color: '#94a3b8',
                                letterSpacing: '0.05em',
                              }}
                            >
                              {ch.chapterCode}
                            </span>
                            {ch.status === 'live' ? (
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  fontWeight: 800,
                                  padding: '0.15rem 0.5rem',
                                  borderRadius: '999px',
                                  background: 'rgba(16, 185, 129, 0.15)',
                                  border: '1px solid rgba(16, 185, 129, 0.3)',
                                  color: '#10b981',
                                }}
                              >
                                ● LIVE ACADEMY
                              </span>
                            ) : (
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  fontWeight: 700,
                                  padding: '0.15rem 0.5rem',
                                  borderRadius: '999px',
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  color: '#64748b',
                                }}
                              >
                                {ch.subModules.length} Modules
                              </span>
                            )}
                          </div>

                          <h3
                            style={{
                              margin: '0 0 0.5rem 0',
                              fontSize: '1rem',
                              fontWeight: 800,
                              color: '#f8fafc',
                            }}
                          >
                            {ch.title}
                          </h3>

                          <p
                            style={{
                              fontSize: '0.8rem',
                              color: '#94a3b8',
                              margin: '0 0 1rem 0',
                              lineHeight: 1.5,
                            }}
                          >
                            {ch.summary}
                          </p>

                          {/* Tech Pills */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                            {ch.targetTech.slice(0, 4).map((tech) => (
                              <span
                                key={tech}
                                style={{
                                  fontSize: '0.7rem',
                                  fontWeight: 600,
                                  padding: '0.15rem 0.45rem',
                                  borderRadius: '6px',
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  color: '#cbd5e1',
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Action */}
                        {ch.status === 'live' && ch.liveAction ? (
                          <button
                            onClick={() => handleLaunchLive(ch.liveAction)}
                            style={{
                              width: '100%',
                              padding: '0.55rem',
                              borderRadius: '10px',
                              border: 'none',
                              background: `linear-gradient(135deg, ${track.color} 0%, #0891b2 100%)`,
                              color: '#0f172a',
                              fontWeight: 800,
                              fontSize: '0.8rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.45rem',
                              boxShadow: `0 4px 14px ${track.color}35`,
                            }}
                          >
                            <span>{ch.liveAction.label}</span>
                            <ArrowRight size={14} />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveTab('chapters');
                              setExpandedChapterIds((prev) => ({ ...prev, [ch.id]: true }));
                            }}
                            style={{
                              width: '100%',
                              padding: '0.5rem',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              background: 'transparent',
                              color: '#94a3b8',
                              fontWeight: 700,
                              fontSize: '0.78rem',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.35rem',
                            }}
                          >
                            <span>View Full Syllabus ({ch.subModules.length} Modules)</span>
                            <ChevronRight size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: ALL 29 CHAPTERS (DEEP SYLLABUS EXPANSION)            */}
        {/* ============================================================ */}
        {activeTab === 'chapters' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredChapters.map((ch) => {
              const isExpanded = !!expandedChapterIds[ch.id];

              return (
                <div
                  key={ch.id}
                  style={{
                    borderRadius: '16px',
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {/* Chapter Accordion Bar */}
                  <div
                    onClick={() => toggleChapter(ch.id)}
                    style={{
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      cursor: 'pointer',
                      background: isExpanded ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '280px' }}>
                      <button
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: 'none',
                          color: '#94a3b8',
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </button>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#38bdf8' }}>
                            {ch.chapterCode}
                          </span>
                          <span style={{ fontSize: '0.74rem', color: '#64748b' }}>•</span>
                          <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>
                            {ch.trackName}
                          </span>
                          {ch.status === 'live' && (
                            <span
                              style={{
                                fontSize: '0.68rem',
                                fontWeight: 800,
                                padding: '0.1rem 0.5rem',
                                borderRadius: '999px',
                                background: 'rgba(16, 185, 129, 0.15)',
                                color: '#10b981',
                              }}
                            >
                              LIVE
                            </span>
                          )}
                        </div>
                        <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>
                          {ch.title}
                        </h3>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {ch.status === 'live' && ch.liveAction && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLaunchLive(ch.liveAction);
                          }}
                          style={{
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#06b6d4',
                            color: '#0f172a',
                            fontWeight: 800,
                            fontSize: '0.76rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                          }}
                        >
                          <span>{ch.liveAction.label}</span>
                          <ExternalLink size={13} />
                        </button>
                      )}
                      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                        {ch.subModules.length} Modules
                      </span>
                    </div>
                  </div>

                  {/* Expanded Submodules Content */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: '1rem 1.5rem 1.75rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        background: 'rgba(0, 0, 0, 0.25)',
                      }}
                    >
                      <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                        {ch.summary}
                      </p>

                      {/* Submodule Grid */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                          gap: '1rem',
                        }}
                      >
                        {ch.subModules.map((sm) => (
                          <div
                            key={sm.id}
                            style={{
                              borderRadius: '12px',
                              background: 'rgba(15, 23, 42, 0.6)',
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                              padding: '1rem 1.15rem',
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.75rem',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 800,
                                  color: '#06b6d4',
                                  background: 'rgba(6, 182, 212, 0.1)',
                                  padding: '0.15rem 0.45rem',
                                  borderRadius: '6px',
                                }}
                              >
                                {sm.code}
                              </span>
                              <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: '#f1f5f9' }}>
                                {sm.title}
                              </h4>
                            </div>

                            <ul
                              style={{
                                margin: 0,
                                paddingLeft: '1.25rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.35rem',
                              }}
                            >
                              {sm.topics.map((t, idx) => (
                                <li
                                  key={idx}
                                  style={{
                                    fontSize: '0.78rem',
                                    color: '#94a3b8',
                                    lineHeight: 1.45,
                                  }}
                                >
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
