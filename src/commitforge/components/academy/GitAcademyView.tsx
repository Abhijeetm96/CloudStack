import React, { useState, useMemo } from 'react';
import {
  COMMITFORGE_35_CHAPTERS,
  TOTAL_COMMITFORGE_CONCEPTS,
  ALL_COMMITFORGE_CONCEPTS,
  getUniversalConcept,
  UniversalConcept,
} from '../../data/unifiedAcademyData';
import { syncUrlWithMode } from '../../../platform/routing/urlRouter';
import { UniversalConceptView } from './UniversalConceptView';
import { AcademyConceptTab } from './UniversalConceptHero';
import { getConceptIcon, getTopicIcon } from './academyIcons';
import { getCommitForgeConceptIcon } from '../../data/gitIcons';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  X,
  Search,
  Terminal,
  Circle,
  ArrowRight,
  BookOpen,
  Code2,
  Target,
  Sparkles,
} from 'lucide-react';

interface Props {
  initialConceptId?: string;
}

function normalizeCommitForgeConceptId(id: string | null | undefined): string {
  if (!id) return 'c-01-01';
  if (ALL_COMMITFORGE_CONCEPTS[id]) return id;

  const legacyMap: Record<string, string> = {
    'c-git-commit': 'c-07-03',
    'c-git-status': 'c-04-01',
    'c-git-add': 'c-06-02',
    'c-git-init': 'c-03-01',
    'c-git-branch': 'c-10-03',
    'c-git-checkout': 'c-10-11',
    'c-git-switch': 'c-10-10',
    'c-git-merge': 'c-11-04',
    'c-git-rebase': 'c-12-03',
    'c-git-push': 'c-14-02',
    'c-git-pull': 'c-15-02',
    'c-git-fetch': 'c-15-01',
    'c-git-diff': 'c-05-02',
    'c-git-log': 'c-08-01',
    'c-git-reset': 'c-09-06',
    'c-git-revert': 'c-09-10',
    'c-git-restore': 'c-09-02',
    'c-git-restore-staged': 'c-06-11',
    'c-git-stash': 'c-18-08',
    'c-git-tag': 'c-18-04',
    'c-git-reflog': 'c-09-15',
    'c-git-cherry-pick': 'c-18-06',
    'c-git-clone': 'c-03-09',
    'c-git-remote': 'c-13-04',
    'c-git-blame': 'c-08-14',
    'c-git-bisect': 'c-08-15',
    'c-git-worktree': 'c-18-13',
    'c-actions-ci-cd': 'c-21-01',
    'c-actions-workflow-syntax': 'c-23-01',
    'c-actions-triggers': 'c-23-13',
    'c-actions-matrix-builds': 'c-23-20',
    'c-actions-artifacts': 'c-23-21',
    'c-actions-secrets': 'c-23-24',
    'c-actions-docker-ci': 'c-25-01',
    'c-actions-release-automation': 'c-31-08',
  };

  return legacyMap[id] || 'c-01-01';
}

export const GitAcademyView: React.FC<Props> = ({ initialConceptId }) => {
  const {
    completedLessonIds,
    markLessonComplete,
    setShowProblemSearch,
    mode,
    academyTab,
    setAcademyTab,
    activeLessonConcept,
    setActiveLessonConcept,
  } = useApp();

  // Concept ID state initialized from activeLessonConcept in context or initialConceptId prop
  const [localConceptId, setLocalConceptId] = useState<string>(() => {
    return normalizeCommitForgeConceptId(activeLessonConcept || initialConceptId);
  });

  // Effective active concept ID - single source of truth prioritizing context
  const activeConceptId = useMemo(() => {
    if (activeLessonConcept) {
      return normalizeCommitForgeConceptId(activeLessonConcept);
    }
    return localConceptId;
  }, [activeLessonConcept, localConceptId]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(() => {
    const norm = normalizeCommitForgeConceptId(activeLessonConcept || initialConceptId);
    const parent = COMMITFORGE_35_CHAPTERS.find((ch) =>
      ch.concepts.some((c) => c.id === norm)
    );
    return parent ? { [parent.id]: true } : { 'ch-01': true };
  });

  React.useEffect(() => {
    if (mode === 'visualize') {
      setAcademyTab('Visualize');
    }
  }, [mode, setAcademyTab]);

  // Keep local state in sync when initialConceptId prop changes externally (e.g. route change)
  React.useEffect(() => {
    if (initialConceptId) {
      const normalized = normalizeCommitForgeConceptId(initialConceptId);
      setLocalConceptId(normalized);
    }
  }, [initialConceptId]);

  // Expand parent chapter automatically whenever activeConceptId changes
  React.useEffect(() => {
    const parentChapter = COMMITFORGE_35_CHAPTERS.find((ch) =>
      ch.concepts.some((c) => c.id === activeConceptId)
    );
    if (parentChapter) {
      setExpandedTopics((prev) => ({
        ...prev,
        [parentChapter.id]: true,
      }));
    }
  }, [activeConceptId]);

  const [showMobileTopicsDrawer, setShowMobileTopicsDrawer] = useState<boolean>(false);

  const activeConcept: UniversalConcept = useMemo(() => {
    return getUniversalConcept(activeConceptId);
  }, [activeConceptId]);

  const toggleTopic = (chapterId: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const handleToggleOrSelectChapter = (chapter: (typeof COMMITFORGE_35_CHAPTERS)[0]) => {
    const isCurrentlyExpanded = !!expandedTopics[chapter.id];
    setExpandedTopics((prev) => ({
      ...prev,
      [chapter.id]: !isCurrentlyExpanded,
    }));

    const hasActiveChild = chapter.concepts.some((c) => c.id === activeConceptId);
    if (!hasActiveChild && chapter.concepts.length > 0) {
      handleSelectConcept(chapter.concepts[0].id);
    }
  };

  const handleExpandAll = () => {
    const allExp: Record<string, boolean> = {};
    COMMITFORGE_35_CHAPTERS.forEach((ch) => {
      allExp[ch.id] = true;
    });
    setExpandedTopics(allExp);
  };

  const handleCollapseAll = () => {
    setExpandedTopics({});
  };

  const handleSelectConcept = (cId: string, tab?: AcademyConceptTab) => {
    const normalized = normalizeCommitForgeConceptId(cId);
    setLocalConceptId(normalized);
    if (setActiveLessonConcept) {
      setActiveLessonConcept(normalized);
    }
    syncUrlWithMode('learn', normalized);
    if (tab) {
      setAcademyTab(tab);
    }
  };

  // Flattened concept list for Next / Previous navigation across all 35 chapters
  const allConceptList = useMemo(() => {
    return COMMITFORGE_35_CHAPTERS.flatMap((ch) => ch.concepts);
  }, []);

  const currentConceptIndex = useMemo(() => {
    return allConceptList.findIndex((c) => c.id === activeConceptId);
  }, [allConceptList, activeConceptId]);

  const prevConcept = currentConceptIndex > 0 ? allConceptList[currentConceptIndex - 1] : null;
  const nextConcept =
    currentConceptIndex >= 0 && currentConceptIndex < allConceptList.length - 1
      ? allConceptList[currentConceptIndex + 1]
      : null;

  const isConceptDone = completedLessonIds.includes(activeConceptId);

  const handleNavigateConcept = (cId: string) => {
    handleSelectConcept(cId);
  };

  // Progress metrics across all 481 subchapters
  const totalConcepts = TOTAL_COMMITFORGE_CONCEPTS;
  const completedCount = completedLessonIds.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalConcepts) * 100));

  // Search filter across all 35 chapters & 481 subchapters
  const displayedChapters = useMemo(() => {
    if (!searchQuery.trim()) return COMMITFORGE_35_CHAPTERS;
    const q = searchQuery.toLowerCase().trim();
    return COMMITFORGE_35_CHAPTERS.map((ch) => {
      const matchChapter =
        ch.title.toLowerCase().includes(q) ||
        ch.number.includes(q);
      const matchedConcepts = ch.concepts.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.command.toLowerCase().includes(q) ||
          (c.subChapterNum ? c.subChapterNum.toLowerCase().includes(q) : false) ||
          (c.shortDesc ? c.shortDesc.toLowerCase().includes(q) : false)
      );
      if (matchChapter) return ch;
      if (matchedConcepts.length > 0) return { ...ch, concepts: matchedConcepts };
      return null;
    }).filter(Boolean) as typeof COMMITFORGE_35_CHAPTERS;
  }, [searchQuery]);

  // Render concept icon with completion check
  const renderConceptIcon = (conceptId: string, command: string, isDone: boolean) => {
    if (isDone) {
      return <CheckCircle2 size={13} color="#22c55e" />;
    }
    return getConceptIcon(conceptId, command, 13);
  };

  const renderTopicIcon = (iconName: string) => {
    return getTopicIcon(iconName, 15);
  };

  const renderTopicsSidebar = (isDrawer = false) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      {/* Sidebar Header */}
      <div
        style={{
          padding: '1rem 1.15rem 0.85rem 1.15rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(139, 92, 246, 0.25) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
              }}
            >
              <GraduationCap size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.15, letterSpacing: '0.01em' }}>
                CommitForge Academy
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                35 Chapters • 481 Subchapters
              </div>
            </div>
          </div>

          {isDrawer && (
            <button
              onClick={() => setShowMobileTopicsDrawer(false)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-secondary)',
                padding: '0.3rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Close Topics Drawer"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Quick Filter Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'var(--bg-app)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '0.35rem 0.65rem',
          }}
        >
          <Search size={13} color="var(--text-muted)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chapters & lessons..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.74rem',
              width: '100%',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.7rem',
                padding: 0,
              }}
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Expand All / Collapse Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.66rem',
            color: 'var(--text-muted)',
            padding: '0 0.15rem',
          }}
        >
          <span>
            {searchQuery.trim()
              ? `Found ${displayedChapters.length} of ${COMMITFORGE_35_CHAPTERS.length} Chapters`
              : `All 35 Chapters`}
          </span>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              onClick={handleExpandAll}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#38bdf8',
                cursor: 'pointer',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: 0,
              }}
            >
              Expand All
            </button>
            <span>•</span>
            <button
              onClick={handleCollapseAll}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.65rem',
                fontWeight: 600,
                padding: 0,
              }}
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      {/* 35 Chapters Accordion List */}
      <div
        style={{
          flex: '1 1 0%',
          minHeight: 0,
          overflowY: 'auto',
          padding: '0.65rem 0.45rem 5rem 0.45rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}
      >
        {displayedChapters.map((chapter) => {
          const isExpanded = !!expandedTopics[chapter.id] || searchQuery.trim().length > 0;
          const hasActiveChild = chapter.concepts.some((c) => c.id === activeConceptId);
          const chNum = parseInt(chapter.number, 10);
          const isCiCd = chNum >= 21 && chNum <= 34;
          const isProject = chNum === 35;

          return (
            <div key={chapter.id} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Chapter Header Row */}
              <div
                onClick={() => handleToggleOrSelectChapter(chapter)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.65rem',
                  borderRadius: '7px',
                  cursor: 'pointer',
                  background: isProject
                    ? hasActiveChild || isExpanded
                      ? 'linear-gradient(90deg, rgba(234, 179, 8, 0.16) 0%, rgba(249, 115, 22, 0.12) 100%)'
                      : 'rgba(234, 179, 8, 0.05)'
                    : isCiCd
                    ? hasActiveChild || isExpanded
                      ? 'linear-gradient(90deg, rgba(139, 92, 246, 0.18) 0%, rgba(99, 102, 241, 0.12) 100%)'
                      : 'rgba(139, 92, 246, 0.05)'
                    : hasActiveChild && !isExpanded
                    ? 'rgba(56, 189, 248, 0.12)'
                    : 'transparent',
                  border: isProject
                    ? hasActiveChild || isExpanded
                      ? '1px solid rgba(234, 179, 8, 0.35)'
                      : '1px solid rgba(234, 179, 8, 0.15)'
                    : isCiCd
                    ? hasActiveChild || isExpanded
                      ? '1px solid rgba(168, 85, 247, 0.35)'
                      : '1px solid rgba(139, 92, 246, 0.15)'
                    : '1px solid transparent',
                  borderLeft: isProject
                    ? '3px solid #eab308'
                    : isCiCd
                    ? '3px solid #8b5cf6'
                    : hasActiveChild
                    ? '3px solid #38bdf8'
                    : undefined,
                  color: isProject
                    ? '#fef08a'
                    : isCiCd
                    ? hasActiveChild
                      ? '#f3e8ff'
                      : '#d8b4fe'
                    : hasActiveChild
                    ? 'var(--accent-primary)'
                    : 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                  userSelect: 'none',
                }}
                className="sidebar-topic-row"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0, flex: 1 }}>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: isProject ? '#fbbf24' : isCiCd ? '#c084fc' : 'var(--text-muted)',
                      width: '18px',
                      flexShrink: 0,
                    }}
                  >
                    {chapter.number}
                  </span>
                  <span
                    style={{
                      color: isProject
                        ? '#eab308'
                        : isCiCd
                        ? '#a855f7'
                        : hasActiveChild
                        ? 'var(--accent-primary)'
                        : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {renderTopicIcon(chapter.iconName)}
                  </span>
                  <span
                    style={{
                      fontSize: '0.79rem',
                      fontWeight: hasActiveChild || isCiCd || isProject ? 700 : 600,
                      color: isProject
                        ? '#fef08a'
                        : isCiCd
                        ? hasActiveChild
                          ? '#ffffff'
                          : '#e9d5ff'
                        : hasActiveChild
                        ? 'var(--accent-primary)'
                        : 'var(--text-primary)',
                      whiteSpace: 'normal',
                      lineHeight: 1.3,
                      wordBreak: 'break-word',
                    }}
                  >
                    {chapter.title}
                  </span>

                  {isCiCd && (
                    <span
                      style={{
                        fontSize: '0.55rem',
                        fontWeight: 800,
                        padding: '0.08rem 0.35rem',
                        borderRadius: '3px',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                        color: '#ffffff',
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                        marginLeft: 'auto',
                        marginRight: '0.2rem',
                        flexShrink: 0,
                      }}
                    >
                      CI/CD
                    </span>
                  )}

                  {isProject && (
                    <span
                      style={{
                        fontSize: '0.55rem',
                        fontWeight: 800,
                        padding: '0.08rem 0.35rem',
                        borderRadius: '3px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: '#ffffff',
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                        marginLeft: 'auto',
                        marginRight: '0.2rem',
                        flexShrink: 0,
                      }}
                    >
                      PROJECT
                    </span>
                  )}
                </div>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTopic(chapter.id);
                  }}
                  style={{
                    color: isProject ? '#fbbf24' : isCiCd ? '#c084fc' : 'var(--text-muted)',
                    flexShrink: 0,
                    padding: '0.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title={isExpanded ? "Collapse chapter" : "Expand chapter"}
                >
                  {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                </span>
              </div>

              {/* Sub-chapters List */}
              {isExpanded && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.15rem',
                    padding: '0.25rem 0.25rem 0.45rem 1.45rem',
                    borderLeft: isProject
                      ? '1px solid rgba(234, 179, 8, 0.25)'
                      : isCiCd
                      ? '1px solid rgba(139, 92, 246, 0.25)'
                      : '1px solid rgba(56, 189, 248, 0.2)',
                    marginLeft: '0.95rem',
                  }}
                >
                  {chapter.concepts.map((concept) => {
                    const isActive = concept.id === activeConceptId;
                    const isDone = completedLessonIds.includes(concept.id);

                    return (
                      <div key={concept.id} style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* Sub-chapter row */}
                        <div
                          onClick={() => {
                            handleSelectConcept(concept.id);
                            if (isDrawer) setShowMobileTopicsDrawer(false);
                          }}
                          className="sidebar-concept-row"
                          style={{
                            padding: '0.45rem 0.6rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            userSelect: 'none',
                            background: isActive
                              ? isProject
                                ? 'rgba(234, 179, 8, 0.16)'
                                : isCiCd
                                ? 'linear-gradient(90deg, rgba(139, 92, 246, 0.24) 0%, rgba(99, 102, 241, 0.14) 100%)'
                                : 'rgba(56, 189, 248, 0.14)'
                              : 'transparent',
                            border: isActive
                              ? isProject
                                ? '1px solid rgba(234, 179, 8, 0.4)'
                                : isCiCd
                                ? '1px solid rgba(168, 85, 247, 0.4)'
                                : '1px solid rgba(56, 189, 248, 0.35)'
                              : '1px solid transparent',
                            color: isActive
                              ? isProject
                                ? '#fef08a'
                                : isCiCd
                                ? '#ffffff'
                                : 'var(--accent-primary)'
                              : isDone
                              ? '#22c55e'
                              : isCiCd
                              ? '#cbd5e1'
                              : 'var(--text-primary)',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {/* Status symbol: Checkmark (✓) if done, Arrow (→) if active, subtle dot if pending */}
                          <span
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              width: '14px',
                            }}
                          >
                            {isDone ? (
                              <CheckCircle2 size={12} color="#22c55e" />
                            ) : isActive ? (
                              <ArrowRight size={12} color={isProject ? '#fbbf24' : isCiCd ? '#c084fc' : '#38bdf8'} />
                            ) : (
                              <Circle size={4} color="var(--text-muted)" style={{ opacity: 0.35 }} />
                            )}
                          </span>

                          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                              <span
                                title={`§ ${concept.subChapterNum || ''} • ${concept.title}`}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  color: isDone
                                    ? '#22c55e'
                                    : isActive
                                    ? isProject ? '#fbbf24' : isCiCd ? '#c084fc' : '#38bdf8'
                                    : isCiCd ? '#c084fc' : isProject ? '#fbbf24' : 'var(--accent-primary)',
                                  opacity: isActive || isDone ? 1 : 0.85,
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                {getCommitForgeConceptIcon(concept, 13)}
                              </span>
                              <span
                                title={concept.title}
                                style={{
                                  fontSize: '0.76rem',
                                  fontWeight: isActive ? 700 : 500,
                                  color: isActive
                                    ? isProject ? '#fef08a' : isCiCd ? '#ffffff' : 'var(--accent-primary)'
                                    : isCiCd ? '#cbd5e1' : 'var(--text-primary)',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {concept.title}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* If active, show nested LESSON / PRACTICE / CHALLENGE navigation */}
                        {isActive && (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              padding: '0.25rem 0.5rem 0.35rem 1.6rem',
                            }}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAcademyTab('Learn');
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.2rem',
                                padding: '0.15rem 0.45rem',
                                borderRadius: '4px',
                                fontSize: '0.66rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                border: academyTab === 'Learn' ? '1px solid #38bdf8' : '1px solid transparent',
                                background: academyTab === 'Learn' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                                color: academyTab === 'Learn' ? '#38bdf8' : 'var(--text-muted)',
                              }}
                              title="Lesson explanation and breakdown"
                            >
                              <BookOpen size={11} />
                              <span>Lesson</span>
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAcademyTab('Practice');
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.2rem',
                                padding: '0.15rem 0.45rem',
                                borderRadius: '4px',
                                fontSize: '0.66rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                border: academyTab === 'Practice' ? '1px solid #22c55e' : '1px solid transparent',
                                background: academyTab === 'Practice' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                                color: academyTab === 'Practice' ? '#22c55e' : 'var(--text-muted)',
                              }}
                              title="Interactive practice scenario"
                            >
                              <Code2 size={11} />
                              <span>Practice</span>
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAcademyTab('Explore');
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.2rem',
                                padding: '0.15rem 0.45rem',
                                borderRadius: '4px',
                                fontSize: '0.66rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                border: academyTab === 'Explore' ? '1px solid #c084fc' : '1px solid transparent',
                                background: academyTab === 'Explore' ? 'rgba(192, 132, 252, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                                color: academyTab === 'Explore' ? '#c084fc' : 'var(--text-muted)',
                              }}
                              title="Realistic challenge and edge cases"
                            >
                              <Target size={11} />
                              <span>Challenge</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Tracker Footer */}
      <div
        style={{
          flexShrink: 0,
          padding: '0.85rem 1.15rem',
          borderTop: '1px solid var(--border-color)',
          background: 'var(--bg-surface)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Your Progress
          </span>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8' }}>
            {progressPercent}%
          </span>
        </div>

        <div
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '999px',
            background: 'var(--border-color)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #38bdf8 0%, #22c55e 100%)',
              borderRadius: '999px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          {completedCount} of {totalConcepts} subchapters completed
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        height: '100%',
        maxHeight: '100%',
        minHeight: 0,
        background: 'var(--bg-app)',
        color: 'var(--text-primary)',
        overflow: 'hidden',
      }}
    >
      {/* ================================================================ */}
      {/* COLUMN 1: LEFT SIDEBAR (35 Chapters Accordion + Progress Tracker) */}
      {/* ================================================================ */}
      <aside
        className="academy-sidebar-desktop"
        style={{
          width: '260px',
          minWidth: '260px',
          maxWidth: '260px',
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '100%',
          minHeight: 0,
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {renderTopicsSidebar(false)}
      </aside>

      {/* ================================================================ */}
      {/* COLUMN 2: CENTER PANEL (Universal Concept Page)                   */}
      {/* ================================================================ */}
      <main
        className="academy-center-main"
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '100%',
          overflow: 'hidden',
          background: 'var(--bg-app)',
        }}
      >
        {/* Mobile & Tablet Top Bar (<1200px) */}
        <div
          className="academy-mobile-topbar"
          style={{
            flexShrink: 0,
            padding: '0.5rem 0.85rem',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          {/* Topics Drawer Toggle Button */}
          <button
            onClick={() => setShowMobileTopicsDrawer(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '8px',
              padding: '0.35rem 0.65rem',
              color: '#38bdf8',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              maxWidth: '65%',
            }}
          >
            <GraduationCap size={15} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Chapters (35) • {activeConcept.title}
            </span>
            <ChevronDown size={13} />
          </button>

          {/* Quick Sandbox / Problem Search on Mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button
              onClick={() => setAcademyTab('Sandbox')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: academyTab === 'Sandbox' ? 'rgba(34, 197, 94, 0.25)' : 'rgba(34, 197, 94, 0.1)',
                border: academyTab === 'Sandbox' ? '1px solid #22c55e' : '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '8px',
                padding: '0.35rem 0.6rem',
                color: '#22c55e',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <Terminal size={13} />
              <span>Sandbox</span>
            </button>
            <button
              onClick={() => setShowProblemSearch(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',
                height: '30px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
              title="Search problems & commands"
            >
              <Search size={14} />
            </button>
          </div>
        </div>

        <div
          style={{
            flex: '1 1 0%',
            minHeight: 0,
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <UniversalConceptView
            concept={activeConcept}
            activeTab={academyTab}
            onSelectTab={setAcademyTab}
            onSelectConcept={handleSelectConcept}
          />
        </div>

        {/* Pinned Center Footer Bar */}
        <div
          className="academy-bottom-bar"
          style={{
            flexShrink: 0,
            padding: '0.65rem 1.25rem',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            boxSizing: 'border-box',
          }}
        >
          {/* Previous Concept Button */}
          <button
            disabled={!prevConcept}
            onClick={() => prevConcept && handleNavigateConcept(prevConcept.id)}
            title={prevConcept ? `Go to ${prevConcept.title}` : 'No previous lesson'}
            style={{
              background: prevConcept ? 'var(--bg-card)' : 'transparent',
              border: prevConcept ? '1px solid var(--border-color)' : '1px solid transparent',
              color: prevConcept ? 'var(--text-primary)' : 'var(--text-muted)',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: prevConcept ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s ease',
            }}
          >
            <ChevronLeft size={14} />
            <span className="academy-bottom-label" style={{ maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {prevConcept ? `Prev: ${prevConcept.title}` : 'Start'}
            </span>
          </button>

          {/* Center: Mark Complete + Problem Search Shortcut */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => markLessonComplete(activeConceptId)}
              style={{
                background: isConceptDone
                  ? 'rgba(34, 197, 94, 0.15)'
                  : 'rgba(56, 189, 248, 0.12)',
                border: isConceptDone
                  ? '1px solid rgba(34, 197, 94, 0.35)'
                  : '1px solid rgba(56, 189, 248, 0.3)',
                color: isConceptDone ? '#22c55e' : '#38bdf8',
                padding: '0.42rem 0.95rem',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <CheckCircle2 size={14} />
              <span>{isConceptDone ? 'Completed' : 'Mark as Complete'}</span>
            </button>
          </div>

          {/* Next Concept Button */}
          <button
            disabled={!nextConcept}
            onClick={() => nextConcept && handleNavigateConcept(nextConcept.id)}
            title={nextConcept ? `Go to ${nextConcept.title}` : 'All subchapters completed'}
            style={{
              background: nextConcept
                ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(37, 99, 235, 0.35) 100%)'
                : 'transparent',
              border: nextConcept
                ? '1px solid rgba(56, 189, 248, 0.4)'
                : '1px solid transparent',
              color: nextConcept ? '#ffffff' : 'var(--text-muted)',
              padding: '0.45rem 0.95rem',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: nextConcept ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s ease',
            }}
          >
            <span className="academy-bottom-label" style={{ maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {nextConcept ? `Next: ${nextConcept.title}` : 'Completed!'}
            </span>
            <ChevronRight size={14} />
          </button>
        </div>
      </main>

      {/* Mobile Topics Drawer */}
      {showMobileTopicsDrawer && (
        <div
          className="academy-mobile-drawer-backdrop"
          onClick={() => setShowMobileTopicsDrawer(false)}
        >
          <div
            className="academy-mobile-drawer-content"
            onClick={(e) => e.stopPropagation()}
          >
            {renderTopicsSidebar(true)}
          </div>
        </div>
      )}
    </div>
  );
};
