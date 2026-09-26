import React, { useState, useMemo, useEffect } from 'react';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  X,
  Search,
  LucideIcon,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Terminal,
  Network,
  GitBranch,
  Container,
  Package,
  Boxes,
  Share2,
  Layers,
  Workflow,
  FileCode,
  Cloud,
  Wifi,
  Database,
  Activity,
  Gauge,
  ShieldCheck,
  GitPullRequest,
  Cpu,
  Sliders,
  Server,
  Code2,
  Archive,
  CheckSquare,
  LifeBuoy,
  DollarSign,
  FolderGit2,
  AlertTriangle,
  Briefcase,
  Award,
  FileText,
  TerminalSquare,
  Wrench,
} from 'lucide-react';
import {
  DEVOPS_29_CHAPTERS,
  DevOpsChapter,
  DevOpsSubModule,
} from '../../devops/data/devopsCurriculumData';

export interface StandardConceptItem {
  id: string;
  command?: string;
  title: string;
  shortDesc?: string;
  icon?: LucideIcon | React.ReactNode;
}

export interface StandardTopicItem {
  id: string;
  number: string;
  title: string;
  icon?: LucideIcon | React.ReactNode;
  concepts: StandardConceptItem[];
  subtopics?: string[];
}

export interface StandardAcademySidebarProps {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  accentColor?: string;
  topics: StandardTopicItem[];
  activeConceptId: string;
  completedConceptIds: string[];
  onSelectConcept: (conceptId: string) => void;
  isDrawer?: boolean;
  onCloseDrawer?: () => void;
  currentChapterNumber?: number;
  onSelectChapter?: (chapterNumber: number) => void;
}

const CHAPTER_ICONS: Record<number, LucideIcon> = {
  1: Terminal,
  2: Network,
  3: GitBranch,
  4: Container,
  5: Package,
  6: Boxes,
  7: Share2,
  8: Layers,
  9: Workflow,
  10: FileCode,
  11: Cloud,
  12: Wifi,
  13: Database,
  14: Activity,
  15: Gauge,
  16: ShieldCheck,
  17: GitPullRequest,
  18: Cpu,
  19: Sliders,
  20: Server,
  21: Code2,
  22: Archive,
  23: CheckSquare,
  24: LifeBuoy,
  25: DollarSign,
  26: FolderGit2,
  27: AlertTriangle,
  28: Briefcase,
  29: Award,
};

function getSubmoduleTopicIcon(chapterNumber: number, code: string, title: string, size = 13): React.ReactElement {
  const lowerTitle = title.toLowerCase();
  const iconProps = { size };

  if (lowerTitle.includes('network') || lowerTitle.includes('tcp') || lowerTitle.includes('ip') || lowerTitle.includes('dns') || lowerTitle.includes('http') || lowerTitle.includes('socket')) {
    return <Network {...iconProps} />;
  }
  if (lowerTitle.includes('git') || lowerTitle.includes('branch') || lowerTitle.includes('merge') || lowerTitle.includes('commit') || lowerTitle.includes('vcs')) {
    return <GitBranch {...iconProps} />;
  }
  if (lowerTitle.includes('docker') || lowerTitle.includes('container') || lowerTitle.includes('podman') || lowerTitle.includes('image')) {
    return <Container {...iconProps} />;
  }
  if (lowerTitle.includes('kubernetes') || lowerTitle.includes('k8s') || lowerTitle.includes('cluster') || lowerTitle.includes('helm')) {
    return <Boxes {...iconProps} />;
  }
  if (lowerTitle.includes('pipeline') || lowerTitle.includes('action') || lowerTitle.includes('ci/cd') || lowerTitle.includes('jenkins') || lowerTitle.includes('workflow')) {
    return <Workflow {...iconProps} />;
  }
  if (lowerTitle.includes('terraform') || lowerTitle.includes('ansible') || lowerTitle.includes('iac') || lowerTitle.includes('yaml')) {
    return <FileCode {...iconProps} />;
  }
  if (lowerTitle.includes('aws') || lowerTitle.includes('azure') || lowerTitle.includes('gcp') || lowerTitle.includes('cloud')) {
    return <Cloud {...iconProps} />;
  }
  if (lowerTitle.includes('database') || lowerTitle.includes('sql') || lowerTitle.includes('postgres') || lowerTitle.includes('storage') || lowerTitle.includes('volume') || lowerTitle.includes('redis')) {
    return <Database {...iconProps} />;
  }
  if (lowerTitle.includes('monitor') || lowerTitle.includes('metric') || lowerTitle.includes('prometheus') || lowerTitle.includes('grafana') || lowerTitle.includes('log') || lowerTitle.includes('alert')) {
    return <Activity {...iconProps} />;
  }
  if (lowerTitle.includes('security') || lowerTitle.includes('auth') || lowerTitle.includes('tls') || lowerTitle.includes('ssl') || lowerTitle.includes('vault') || lowerTitle.includes('iam') || lowerTitle.includes('permission')) {
    return <ShieldCheck {...iconProps} />;
  }
  if (lowerTitle.includes('process') || lowerTitle.includes('cpu') || lowerTitle.includes('memory') || lowerTitle.includes('kernel') || lowerTitle.includes('performance')) {
    return <Cpu {...iconProps} />;
  }
  if (lowerTitle.includes('service') || lowerTitle.includes('systemd') || lowerTitle.includes('daemon') || lowerTitle.includes('server')) {
    return <Server {...iconProps} />;
  }
  if (lowerTitle.includes('shell') || lowerTitle.includes('bash') || lowerTitle.includes('script') || lowerTitle.includes('cli') || lowerTitle.includes('terminal')) {
    return <TerminalSquare {...iconProps} />;
  }
  if (lowerTitle.includes('file') || lowerTitle.includes('dir') || lowerTitle.includes('text')) {
    return <FileText {...iconProps} />;
  }
  if (lowerTitle.includes('troubleshoot') || lowerTitle.includes('debug') || lowerTitle.includes('incident') || lowerTitle.includes('error')) {
    return <Wrench {...iconProps} />;
  }
  if (lowerTitle.includes('cost') || lowerTitle.includes('finops') || lowerTitle.includes('budget')) {
    return <DollarSign {...iconProps} />;
  }
  if (lowerTitle.includes('interview') || lowerTitle.includes('career') || lowerTitle.includes('resume')) {
    return <Briefcase {...iconProps} />;
  }
  if (lowerTitle.includes('cert') || lowerTitle.includes('exam') || lowerTitle.includes('architect')) {
    return <Award {...iconProps} />;
  }

  // Fallback to chapter icon
  const ChIcon = CHAPTER_ICONS[chapterNumber] || Layers;
  return <ChIcon {...iconProps} />;
}

export const StandardAcademySidebar: React.FC<StandardAcademySidebarProps> = ({
  title,
  subtitle,
  icon: HeaderIcon = GraduationCap,
  accentColor = '#38bdf8',
  topics,
  activeConceptId,
  completedConceptIds,
  onSelectConcept,
  isDrawer = false,
  onCloseDrawer,
  currentChapterNumber = 1,
  onSelectChapter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Expand state for the 29 chapters.
  // The active chapter is expanded by default.
  const [expandedChapters, setExpandedChapters] = useState<Record<number, boolean>>({
    [currentChapterNumber]: true,
  });

  // Expand state for topics under chapters.
  // The topic containing activeConceptId is expanded by default.
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    const parentTopic = topics.find((t) => t.concepts.some((c) => c.id === activeConceptId));
    if (parentTopic) {
      initial[parentTopic.id] = true;
    } else if (topics.length > 0) {
      initial[topics[0].id] = true;
    }
    return initial;
  });

  // Automatically expand parent chapter and topic when active concept changes
  useEffect(() => {
    const parentTopic = topics.find((t) => t.concepts.some((c) => c.id === activeConceptId));
    if (parentTopic) {
      setExpandedTopics((prev) => ({ ...prev, [parentTopic.id]: true }));
      setExpandedChapters((prev) => ({ ...prev, [currentChapterNumber]: true }));
    }
  }, [activeConceptId, topics, currentChapterNumber]);

  const toggleChapter = (chapterNum: number) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterNum]: !prev[chapterNum],
    }));
  };

  const toggleTopic = (topicKey: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicKey]: !prev[topicKey],
    }));
  };

  const handleExpandAll = () => {
    const allCh: Record<number, boolean> = {};
    const allTop: Record<string, boolean> = {};
    DEVOPS_29_CHAPTERS.forEach((ch) => {
      allCh[ch.number] = true;
      ch.subModules.forEach((sm) => {
        allTop[`ch${ch.number}-${sm.code}`] = true;
      });
    });
    topics.forEach((t) => {
      allTop[t.id] = true;
    });
    setExpandedChapters(allCh);
    setExpandedTopics(allTop);
  };

  const handleCollapseAll = () => {
    setExpandedChapters({});
    setExpandedTopics({});
  };

  // Progress metrics for active chapter
  const totalConcepts = useMemo(() => {
    return topics.reduce((acc, t) => acc + t.concepts.length, 0);
  }, [topics]);

  const completedCount = useMemo(() => {
    const allConceptIds = new Set(topics.flatMap((t) => t.concepts.map((c) => c.id)));
    return completedConceptIds.filter((id) => allConceptIds.has(id)).length;
  }, [topics, completedConceptIds]);

  const progressPercent = totalConcepts > 0 ? Math.min(100, Math.round((completedCount / totalConcepts) * 100)) : 0;

  // Filtered 29 chapters based on search query
  const filteredChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return DEVOPS_29_CHAPTERS;

    return DEVOPS_29_CHAPTERS.filter((ch) => {
      const matchChapter =
        ch.title.toLowerCase().includes(q) ||
        ch.chapterCode.toLowerCase().includes(q) ||
        ch.trackName.toLowerCase().includes(q);

      if (matchChapter) return true;

      const matchSub = ch.subModules.some((sm) => {
        return (
          sm.title.toLowerCase().includes(q) ||
          sm.code.toLowerCase().includes(q) ||
          sm.topics.some((st) => st.toLowerCase().includes(q))
        );
      });

      if (matchSub) return true;

      if (ch.number === currentChapterNumber) {
        return topics.some(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.number.toLowerCase().includes(q) ||
            t.concepts.some(
              (c) =>
                c.title.toLowerCase().includes(q) ||
                (c.command && c.command.toLowerCase().includes(q)) ||
                (c.shortDesc && c.shortDesc.toLowerCase().includes(q))
            )
        );
      }

      return false;
    });
  }, [searchQuery, currentChapterNumber, topics]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        background: 'var(--bg-surface)',
        width: isDrawer ? '100%' : '240px',
        minWidth: isDrawer ? '100%' : '240px',
        maxWidth: isDrawer ? '100%' : '240px',
        boxSizing: 'border-box',
      }}
    >
      {/* ================================================================ */}
      {/* 1. SIDEBAR HEADER (CommitForge Design: 32x32 Icon + Title + Sub) */}
      {/* ================================================================ */}
      <div
        style={{
          padding: '1.15rem 1.15rem 0.95rem 1.15rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flex: 1 }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: `${accentColor}18`,
              border: `1px solid ${accentColor}35`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: accentColor,
              flexShrink: 0,
            }}
          >
            <HeaderIcon size={18} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontSize: '0.96rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.15,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              29 Chapters • All Topics
            </div>
          </div>
        </div>

        {isDrawer && onCloseDrawer && (
          <button
            onClick={onCloseDrawer}
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
              flexShrink: 0,
            }}
            title="Close Drawer"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* ================================================================ */}
      {/* 2. SEARCH & EXPAND CONTROLS (CommitForge Compact Bar)            */}
      {/* ================================================================ */}
      <div
        style={{
          padding: '0.65rem 0.85rem 0.45rem 0.85rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          flexShrink: 0,
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search
            size={13}
            color="var(--text-muted)"
            style={{ position: 'absolute', left: '0.55rem', pointerEvents: 'none' }}
          />
          <input
            type="text"
            placeholder="Search 29 chapters & topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.36rem 1.6rem 0.36rem 1.85rem',
              borderRadius: '7px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              fontSize: '0.74rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '0.4rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0.1rem',
              }}
            >
              <X size={11} />
            </button>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.15rem 0.2rem',
            fontSize: '0.66rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>All 29 Chapters</span>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              onClick={handleExpandAll}
              style={{
                background: 'transparent',
                border: 'none',
                color: accentColor,
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

      {/* ================================================================ */}
      {/* 3. ALL 29 CHAPTERS ACCORDION LIST (With Topics Under Each)       */}
      {/* ================================================================ */}
      <div
        style={{
          flex: '1 1 0%',
          minHeight: 0,
          overflowY: 'auto',
          padding: '0.4rem 0.45rem 4.5rem 0.45rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
        }}
      >
        {filteredChapters.map((ch) => {
          const isCurrentChapter = ch.number === currentChapterNumber;
          const isChapterExpanded = !!expandedChapters[ch.number] || searchQuery.trim().length > 0;
          const ChapterIcon = CHAPTER_ICONS[ch.number] || Terminal;
          const chCodeStr = ch.number < 10 ? `0${ch.number}` : `${ch.number}`;

          // Live suite detection for quick actions
          const isLiveSuite = ch.status === 'live';

          return (
            <div key={ch.id} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* ========================================================== */}
              {/* CHAPTER HEADER ROW (Level 1 Accordion)                    */}
              {/* ========================================================== */}
              <div
                onClick={() => toggleChapter(ch.number)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: isCurrentChapter
                    ? isChapterExpanded
                      ? `${accentColor}18`
                      : `${accentColor}10`
                    : isChapterExpanded
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'transparent',
                  border: isCurrentChapter
                    ? `1px solid ${accentColor}40`
                    : isChapterExpanded
                    ? '1px solid rgba(255, 255, 255, 0.08)'
                    : '1px solid transparent',
                  color: isCurrentChapter ? '#ffffff' : 'var(--text-primary)',
                  transition: 'all 0.15s ease',
                  userSelect: 'none',
                }}
                className="sidebar-topic-row"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flex: 1 }}>
                  <span
                    style={{
                      fontFamily: 'ui-monospace, monospace',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: isCurrentChapter ? accentColor : 'var(--text-muted)',
                      width: '20px',
                      flexShrink: 0,
                    }}
                  >
                    {chCodeStr}
                  </span>

                  <span
                    style={{
                      color: isCurrentChapter ? accentColor : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ChapterIcon size={16} />
                  </span>

                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: isCurrentChapter || isChapterExpanded ? 700 : 600,
                      color: isCurrentChapter ? '#ffffff' : 'var(--text-primary)',
                      whiteSpace: 'normal',
                      lineHeight: 1.35,
                      wordBreak: 'break-word',
                    }}
                  >
                    {ch.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                  {isCurrentChapter ? (
                    <span
                      style={{
                        fontSize: '0.58rem',
                        fontWeight: 800,
                        color: accentColor,
                        background: `${accentColor}25`,
                        padding: '0.1rem 0.35rem',
                        borderRadius: '4px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      ACTIVE
                    </span>
                  ) : isLiveSuite ? (
                    <span
                      style={{
                        fontSize: '0.58rem',
                        fontWeight: 800,
                        color: '#4ade80',
                        background: 'rgba(34, 197, 94, 0.15)',
                        padding: '0.1rem 0.35rem',
                        borderRadius: '4px',
                        letterSpacing: '0.04em',
                      }}
                    >
                      LIVE
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: '0.6rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        padding: '0.1rem 0.3rem',
                        borderRadius: '4px',
                      }}
                    >
                      {ch.subModules.length} Topics
                    </span>
                  )}

                  <span style={{ color: isCurrentChapter ? accentColor : 'var(--text-muted)' }}>
                    {isChapterExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </span>
                </div>
              </div>

              {/* ========================================================== */}
              {/* TOPICS UNDER EACH CHAPTER (Level 2 Accordion)              */}
              {/* ========================================================== */}
              {isChapterExpanded && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    padding: '0.25rem 0.2rem 0.45rem 1.15rem',
                    borderLeft: `2px solid ${isCurrentChapter ? `${accentColor}40` : 'rgba(255, 255, 255, 0.07)'}`,
                    marginLeft: '0.85rem',
                  }}
                >
                  {/* Suite Launcher Shortcut (for Live Forge Suites: Git, Docker, Kubernetes) */}
                  {!isCurrentChapter && isLiveSuite && onSelectChapter && (
                    <div
                      onClick={() => {
                        onSelectChapter(ch.number);
                        if (isDrawer && onCloseDrawer) onCloseDrawer();
                      }}
                      style={{
                        padding: '0.4rem 0.6rem',
                        borderRadius: '6px',
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        color: '#4ade80',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.25rem',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>Launch Interactive {ch.title.split(' ')[0]} Suite</span>
                      <ExternalLink size={12} />
                    </div>
                  )}

                  {/* If this is Chapter 01 (the active interactive chapter in LinuxForge),
                      render its rich interactive topics and lessons */}
                  {isCurrentChapter
                    ? topics.map((topic) => {
                        const isTopicExpanded = !!expandedTopics[topic.id] || searchQuery.trim().length > 0;
                        const hasActiveChild = topic.concepts.some((c) => c.id === activeConceptId);
                        const topicDoneCount = topic.concepts.filter((c) =>
                          completedConceptIds.includes(c.id)
                        ).length;

                        return (
                          <div key={topic.id} style={{ display: 'flex', flexDirection: 'column' }}>
                            {/* Topic Header Row */}
                            <div
                              onClick={() => toggleTopic(topic.id)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.45rem 0.65rem',
                                borderRadius: '7px',
                                cursor: 'pointer',
                                background: hasActiveChild && !isTopicExpanded ? `${accentColor}14` : 'transparent',
                                border: hasActiveChild && !isTopicExpanded ? `1px solid ${accentColor}35` : '1px solid transparent',
                                color: hasActiveChild ? accentColor : 'var(--text-secondary)',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', minWidth: 0, flex: 1 }}>
                                <span
                                  style={{
                                    fontFamily: 'ui-monospace, monospace',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    color: 'var(--text-muted)',
                                    width: '26px',
                                    flexShrink: 0,
                                  }}
                                >
                                  {topic.number}
                                </span>
                                <span
                                  style={{
                                    color: hasActiveChild ? accentColor : 'var(--text-muted)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                  }}
                                >
                                  {React.isValidElement(topic.icon) ? (
                                    topic.icon
                                  ) : typeof topic.icon === 'function' ? (
                                    React.createElement(topic.icon as LucideIcon, { size: 14 })
                                  ) : (
                                    <Terminal size={14} />
                                  )}
                                </span>
                                <span
                                  style={{
                                    fontSize: '0.8rem',
                                    fontWeight: hasActiveChild ? 700 : 600,
                                    color: hasActiveChild ? accentColor : 'var(--text-primary)',
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {topic.title}
                                </span>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
                                {topicDoneCount > 0 && (
                                  <span
                                    style={{
                                      fontSize: '0.6rem',
                                      fontWeight: 700,
                                      color: topicDoneCount === topic.concepts.length ? '#22c55e' : accentColor,
                                      background: 'rgba(255, 255, 255, 0.05)',
                                      padding: '0.1rem 0.3rem',
                                      borderRadius: '4px',
                                    }}
                                  >
                                    {topicDoneCount}/{topic.concepts.length}
                                  </span>
                                )}
                                <span style={{ color: 'var(--text-muted)' }}>
                                  {isTopicExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                                </span>
                              </div>
                            </div>

                            {/* Sub-Concepts & Lessons Under Topic */}
                            {isTopicExpanded && (
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '0.2rem',
                                  padding: '0.2rem 0.35rem 0.4rem 1.6rem',
                                }}
                              >
                                {topic.concepts.map((concept) => {
                                  const isActive = concept.id === activeConceptId;
                                  const isDone = completedConceptIds.includes(concept.id);

                                  return (
                                    <div
                                      key={concept.id}
                                      onClick={() => {
                                        onSelectConcept(concept.id);
                                        if (isDrawer && onCloseDrawer) onCloseDrawer();
                                      }}
                                      style={{
                                        padding: '0.5rem 0.65rem',
                                        borderRadius: '7px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: isActive ? `${accentColor}18` : 'transparent',
                                        border: isActive ? `1px solid ${accentColor}40` : '1px solid transparent',
                                        color: isActive ? accentColor : isDone ? '#22c55e' : 'var(--text-primary)',
                                        transition: 'all 0.15s ease',
                                      }}
                                    >
                                      <span
                                        style={{
                                          color: isDone ? '#22c55e' : isActive ? accentColor : 'var(--text-muted)',
                                          display: 'flex',
                                          alignItems: 'center',
                                          flexShrink: 0,
                                        }}
                                      >
                                        {isDone ? (
                                          <CheckCircle2 size={13} color="#22c55e" />
                                        ) : concept.icon ? (
                                          React.isValidElement(concept.icon) ? (
                                            concept.icon
                                          ) : typeof concept.icon === 'function' ? (
                                            React.createElement(concept.icon as LucideIcon, { size: 13 })
                                          ) : null
                                        ) : (
                                          <div
                                            style={{
                                              width: '5px',
                                              height: '5px',
                                              borderRadius: '50%',
                                              background: isActive ? accentColor : '#64748b',
                                            }}
                                          />
                                        )}
                                      </span>

                                      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                                        <span
                                          title={concept.command || concept.title}
                                          style={{
                                            fontFamily: 'ui-monospace, monospace',
                                            fontSize: '0.78rem',
                                            fontWeight: isActive ? 800 : 600,
                                            color: isActive ? accentColor : 'var(--text-primary)',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                          }}
                                        >
                                          {concept.command || concept.title}
                                        </span>
                                        {concept.shortDesc && (
                                          <span
                                            style={{
                                              fontSize: '0.7rem',
                                              color: isActive ? `${accentColor}cc` : 'var(--text-secondary)',
                                              lineHeight: 1.25,
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                              whiteSpace: 'nowrap',
                                            }}
                                          >
                                            {concept.shortDesc}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}

                                {/* Full Syllabus Subtopics Checklist */}
                                {topic.subtopics && topic.subtopics.length > 0 && (
                                  <div
                                    style={{
                                      marginTop: '0.3rem',
                                      padding: '0.45rem 0.55rem',
                                      background: 'rgba(0, 0, 0, 0.25)',
                                      border: '1px solid rgba(255, 255, 255, 0.06)',
                                      borderRadius: '6px',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '0.2rem',
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontSize: '0.6rem',
                                        fontWeight: 800,
                                        color: accentColor,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.04em',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.3rem',
                                      }}
                                    >
                                      <Sparkles size={10} />
                                      Syllabus Subtopics ({topic.subtopics.length})
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                                      {topic.subtopics.map((st, sIdx) => (
                                        <div
                                          key={sIdx}
                                          style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0.35rem',
                                            fontSize: '0.65rem',
                                            color: '#cbd5e1',
                                            lineHeight: 1.3,
                                          }}
                                        >
                                          <span style={{ color: accentColor, fontWeight: 800 }}>•</span>
                                          <span>{st}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })
                    : /* For all other 28 chapters, render their submodules (topics) and subtopics directly */
                      ch.subModules.map((sm: DevOpsSubModule) => {
                        const smKey = `ch${ch.number}-${sm.code}`;
                        const isSmExpanded = !!expandedTopics[smKey] || searchQuery.trim().length > 0;

                        return (
                          <div key={sm.id} style={{ display: 'flex', flexDirection: 'column' }}>
                            {/* Topic Header Row under chapter */}
                            <div
                              onClick={() => toggleTopic(smKey)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.45rem 0.6rem',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                background: isSmExpanded ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                                border: isSmExpanded ? '1px solid rgba(255, 255, 255, 0.07)' : '1px solid transparent',
                                color: isSmExpanded ? '#ffffff' : 'var(--text-secondary)',
                                transition: 'all 0.15s ease',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0, flex: 1 }}>
                                <span
                                  style={{
                                    fontFamily: 'ui-monospace, monospace',
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    color: '#94a3b8',
                                    width: '26px',
                                    flexShrink: 0,
                                  }}
                                >
                                  {sm.code}
                                </span>
                                <span
                                  style={{
                                    color: isSmExpanded ? (accentColor || '#38bdf8') : '#94a3b8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                  }}
                                >
                                  {getSubmoduleTopicIcon(ch.number, sm.code, sm.title, 13)}
                                </span>
                                <span
                                  style={{
                                    fontSize: '0.78rem',
                                    fontWeight: 600,
                                    color: isSmExpanded ? '#ffffff' : '#cbd5e1',
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {sm.title}
                                </span>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
                                <span
                                  style={{
                                    fontSize: '0.58rem',
                                    color: 'var(--text-muted)',
                                    background: 'rgba(255, 255, 255, 0.04)',
                                    padding: '0.1rem 0.3rem',
                                    borderRadius: '4px',
                                  }}
                                >
                                  {sm.topics.length}
                                </span>
                                <span style={{ color: 'var(--text-muted)' }}>
                                  {isSmExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                </span>
                              </div>
                            </div>

                            {/* Subtopics bullet list under submodule */}
                            {isSmExpanded && (
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '0.2rem',
                                  padding: '0.3rem 0.4rem 0.4rem 1.6rem',
                                }}
                              >
                                {sm.topics.map((st: string, sIdx: number) => (
                                  <div
                                    key={sIdx}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: '0.35rem',
                                      fontSize: '0.66rem',
                                      color: '#94a3b8',
                                      lineHeight: 1.3,
                                    }}
                                  >
                                    <span style={{ color: '#64748b', fontWeight: 800 }}>•</span>
                                    <span>{st}</span>
                                  </div>
                                ))}
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

      {/* ================================================================ */}
      {/* 4. PINNED PROGRESS FOOTER (Standard CommitForge Progress Box)    */}
      {/* ================================================================ */}
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
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: accentColor }}>
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
              background: `linear-gradient(90deg, ${accentColor} 0%, #22c55e 100%)`,
              borderRadius: '999px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          {completedCount} of {totalConcepts} concepts completed in Chapter {currentChapterNumber < 10 ? `0${currentChapterNumber}` : currentChapterNumber}
        </div>
      </div>
    </div>
  );
};
