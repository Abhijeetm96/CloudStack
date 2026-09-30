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
  Terminal,
} from 'lucide-react';

export interface StandardConceptItem {
  id: string;
  command?: string;
  title: string;
  subChapterNumber?: string;
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

function renderSidebarIcon(
  icon: LucideIcon | React.ReactNode | undefined,
  size: number,
  fallback: LucideIcon = Terminal
): React.ReactNode {
  if (!icon) return React.createElement(fallback, { size });
  if (React.isValidElement(icon)) return icon;
  return React.createElement(icon as any, { size });
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
  showSyllabusCoverage?: boolean;
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
  showSyllabusCoverage = false,
  currentChapterNumber,
  onSelectChapter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Expand state for chapters (topics).
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

  // Automatically expand parent chapter when active concept changes
  useEffect(() => {
    const parentTopic = topics.find((t) => t.concepts.some((c) => c.id === activeConceptId));
    if (parentTopic) {
      setExpandedTopics((prev) => ({ ...prev, [parentTopic.id]: true }));
    }
  }, [activeConceptId, topics]);

  const toggleTopic = (topicKey: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicKey]: !prev[topicKey],
    }));
  };

  const handleExpandAll = () => {
    const allTop: Record<string, boolean> = {};
    topics.forEach((t) => {
      allTop[t.id] = true;
    });
    setExpandedTopics(allTop);
  };

  const handleCollapseAll = () => {
    setExpandedTopics({});
  };

  // Progress metrics across all chapters in this academy
  const totalConcepts = useMemo(() => {
    return topics.reduce((acc, t) => acc + t.concepts.length, 0);
  }, [topics]);

  const completedCount = useMemo(() => {
    const allConceptIds = new Set(topics.flatMap((t) => t.concepts.map((c) => c.id)));
    return completedConceptIds.filter((id) => allConceptIds.has(id)).length;
  }, [topics, completedConceptIds]);

  const progressPercent = totalConcepts > 0 ? Math.min(100, Math.round((completedCount / totalConcepts) * 100)) : 0;

  // Intent-based semantic search mappings
  const filteredTopics = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return topics;

    const INTENT_SEARCH_SYNONYMS: Record<string, string[]> = {
      'permission denied': ['chmod', 'chown', 'groups', 'sudo', 'file permissions', 'selinux', 'umask', 'permission'],
      'permission': ['chmod', 'chown', 'groups', 'sudo', 'umask', 'suid', 'sgid', 'permissions'],
      'disk full': ['df', 'du', 'find', 'log cleanup', 'disk troubleshooting', 'storage', 'partition', 'swap'],
      'server not responding': ['ping', 'ip', 'ss', 'curl', 'dns', 'firewall', 'routing', 'traceroute', 'network troubleshooting', 'sshd'],
      'offline': ['ping', 'ip', 'ss', 'network', 'gateway', 'dns'],
      'run command automatically': ['cron', 'crontab', 'systemd timers', 'shell scripting', 'at', 'scheduling', 'scheduling backups'],
      'schedule': ['cron', 'crontab', 'systemd timers', 'at', 'cron syntax'],
      'command not found': ['path', 'export', 'environment', 'which', 'whereis', 'bashrc'],
      'service won\'t start': ['systemctl', 'journalctl', 'service', 'failed', 'daemon'],
      'high cpu': ['top', 'htop', 'kill', 'nice', 'load average', 'process', 'ps'],
      'out of memory': ['free', 'top', 'dmesg', 'oom', 'swap', 'vmstat'],
      'cannot ssh': ['ssh', 'sshd_config', 'authorized_keys', 'known_hosts', 'ssh-keygen', 'port 22'],
    };

    // Gather active query terms + matching intent synonyms
    const searchTerms = [q];
    for (const [intentKey, synonyms] of Object.entries(INTENT_SEARCH_SYNONYMS)) {
      if (q.includes(intentKey) || intentKey.includes(q)) {
        searchTerms.push(...synonyms);
      }
    }

    return topics.filter((t) => {
      const matchTitle = searchTerms.some((term) => t.title.toLowerCase().includes(term));
      const matchNumber = t.number.toLowerCase().includes(q);
      const matchConcepts = t.concepts.some((c) =>
        searchTerms.some(
          (term) =>
            c.title.toLowerCase().includes(term) ||
            (c.command && c.command.toLowerCase().includes(term)) ||
            (c.shortDesc && c.shortDesc.toLowerCase().includes(term)) ||
            c.id.toLowerCase().includes(term)
        )
      );
      const matchSubtopics = t.subtopics?.some((st) => searchTerms.some((term) => st.toLowerCase().includes(term)));
      return matchTitle || matchNumber || matchConcepts || matchSubtopics;
    });
  }, [searchQuery, topics]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        background: 'var(--bg-surface)',
        width: isDrawer ? '100%' : '260px',
        minWidth: isDrawer ? '100%' : '260px',
        maxWidth: isDrawer ? '100%' : '260px',
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
              title={subtitle || `${topics.length} Chapters • ${totalConcepts} Concepts`}
            >
              {subtitle || `${topics.length} Chapters • ${totalConcepts} Concepts`}
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
            aria-label="Close Drawer"
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
            placeholder={`Search ${topics.length} chapters & concepts...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.36rem 1.6rem 0.36rem 1.85rem',
              borderRadius: '7px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
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
              title="Clear Search"
              aria-label="Clear Search"
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
          <span>
            {searchQuery.trim()
              ? `Found ${filteredTopics.length} of ${topics.length} Chapters`
              : `All ${topics.length} Chapters`}
          </span>
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
      {/* 3. CHAPTERS & SUB-CHAPTERS ACCORDION LIST                        */}
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
        {filteredTopics.length === 0 ? (
          <div
            style={{
              padding: '2.5rem 1rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-muted)',
            }}
          >
            <Search size={22} style={{ opacity: 0.4 }} />
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              No chapters or concepts found
            </div>
            <div style={{ fontSize: '0.72rem' }}>
              No matches for &ldquo;{searchQuery}&rdquo;
            </div>
            <button
              onClick={() => setSearchQuery('')}
              style={{
                marginTop: '0.5rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '6px',
                background: `${accentColor}18`,
                border: `1px solid ${accentColor}35`,
                color: accentColor,
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reset Filter
            </button>
          </div>
        ) : (
          filteredTopics.map((topic) => {
            const isTopicExpanded = !!expandedTopics[topic.id] || searchQuery.trim().length > 0;
            const hasActiveChild = topic.concepts.some((c) => c.id === activeConceptId);
            const topicDoneCount = topic.concepts.filter((c) => completedConceptIds.includes(c.id)).length;
            const isAllDone = topic.concepts.length > 0 && topicDoneCount === topic.concepts.length;

            return (
              <div key={topic.id} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Chapter Header Row */}
                <div
                  onClick={() => {
                    toggleTopic(topic.id);
                    if (!hasActiveChild && topic.concepts.length > 0) {
                      const chNum = parseInt(topic.number, 10);
                      if (onSelectChapter && !isNaN(chNum)) {
                        onSelectChapter(chNum);
                      } else if (onSelectConcept) {
                        onSelectConcept(topic.concepts[0].id);
                      }
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: hasActiveChild && !isTopicExpanded
                      ? `${accentColor}18`
                      : isTopicExpanded
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'transparent',
                    border: hasActiveChild && !isTopicExpanded
                      ? `1px solid ${accentColor}40`
                      : isTopicExpanded
                      ? '1px solid rgba(255, 255, 255, 0.08)'
                      : '1px solid transparent',
                    color: hasActiveChild ? accentColor : 'var(--text-primary)',
                    transition: 'all 0.15s ease',
                    userSelect: 'none',
                  }}
                  className="sidebar-topic-row"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flex: 1 }}>
                    <span
                      style={{
                        fontFamily: 'ui-monospace, monospace',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: hasActiveChild ? accentColor : 'var(--text-muted)',
                        minWidth: '24px',
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
                        flexShrink: 0,
                      }}
                    >
                      {renderSidebarIcon(topic.icon, 16)}
                    </span>

                    <span
                      style={{
                        fontSize: '0.84rem',
                        fontWeight: hasActiveChild || isTopicExpanded ? 700 : 600,
                        color: hasActiveChild ? '#ffffff' : 'var(--text-primary)',
                        whiteSpace: 'normal',
                        lineHeight: 1.35,
                        wordBreak: 'break-word',
                      }}
                    >
                      {topic.title}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                    {topicDoneCount > 0 ? (
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: 800,
                          color: isAllDone ? '#22c55e' : accentColor,
                          background: isAllDone ? 'rgba(34, 197, 94, 0.15)' : `${accentColor}18`,
                          padding: '0.1rem 0.4rem',
                          borderRadius: '4px',
                        }}
                      >
                        {topicDoneCount}/{topic.concepts.length}
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: 600,
                          color: 'var(--text-muted)',
                          background: 'rgba(255, 255, 255, 0.04)',
                          padding: '0.1rem 0.35rem',
                          borderRadius: '4px',
                        }}
                      >
                        {topic.concepts.length}
                      </span>
                    )}

                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTopic(topic.id);
                      }}
                      style={{
                        color: hasActiveChild ? accentColor : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.15rem',
                        borderRadius: '4px',
                      }}
                      title={isTopicExpanded ? 'Collapse' : 'Expand'}
                      role="button"
                    >
                      {isTopicExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                  </div>
                </div>

                {/* Sub-Chapters / Concepts Under Chapter */}
                {isTopicExpanded && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem',
                      padding: '0.25rem 0.35rem 0.45rem 1.25rem',
                      borderLeft: `2px solid ${hasActiveChild ? `${accentColor}40` : 'rgba(255, 255, 255, 0.08)'}`,
                      marginLeft: '0.95rem',
                    }}
                  >
                    {topic.concepts.map((concept) => {
                      const isActive = concept.id === activeConceptId;
                      const isDone = completedConceptIds.includes(concept.id);

                      // Determine primary and secondary display text
                      const primaryText = concept.title || concept.command || concept.id;
                      const hasDistinctCommand = concept.command && concept.command !== concept.title;
                      const secondaryText = hasDistinctCommand ? concept.command : concept.shortDesc;

                      return (
                        <div
                          key={concept.id}
                          onClick={() => {
                            onSelectConcept(concept.id);
                            if (isDrawer && onCloseDrawer) onCloseDrawer();
                          }}
                          style={{
                            padding: '0.45rem 0.65rem',
                            borderRadius: '7px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: isActive ? `${accentColor}18` : 'transparent',
                            border: isActive ? `1px solid ${accentColor}45` : '1px solid transparent',
                            boxShadow: isActive ? `0 0 10px ${accentColor}25` : undefined,
                            color: isActive ? '#ffffff' : isDone ? '#22c55e' : 'var(--text-primary)',
                            transition: 'all 0.15s ease',
                          }}
                          className="sidebar-concept-row"
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
                            ) : (
                              renderSidebarIcon(concept.icon, 13)
                            )}
                          </span>

                          {/* Sub-Chapter Number Badge (e.g. 01.3) */}
                          {concept.subChapterNumber && (
                            <span
                              style={{
                                fontFamily: 'ui-monospace, monospace',
                                fontSize: '0.64rem',
                                fontWeight: 800,
                                color: isActive ? accentColor : 'var(--text-muted)',
                                background: isActive ? `${accentColor}25` : 'rgba(255, 255, 255, 0.05)',
                                border: isActive ? `1px solid ${accentColor}40` : '1px solid rgba(255, 255, 255, 0.06)',
                                padding: '0.08rem 0.32rem',
                                borderRadius: '4px',
                                flexShrink: 0,
                                letterSpacing: '0.02em',
                              }}
                            >
                              {concept.subChapterNumber}
                            </span>
                          )}

                          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                            <span
                              title={primaryText}
                              style={{
                                fontSize: '0.78rem',
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? '#ffffff' : isDone ? '#22c55e' : 'var(--text-primary)',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                lineHeight: 1.3,
                              }}
                            >
                              {primaryText}
                            </span>
                            {secondaryText && (
                              <span
                                title={secondaryText}
                                style={{
                                  fontFamily: hasDistinctCommand ? 'ui-monospace, monospace' : 'inherit',
                                  fontSize: '0.66rem',
                                  color: isActive ? `${accentColor}dd` : 'var(--text-muted)',
                                  lineHeight: 1.2,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {secondaryText}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* Curated Syllabus Subtopics Checklist (only if explicitly enabled) */}
                    {showSyllabusCoverage && topic.subtopics && topic.subtopics.length > 0 && (
                      <div
                        style={{
                          marginTop: '0.3rem',
                          padding: '0.45rem 0.55rem',
                          background: 'rgba(0, 0, 0, 0.22)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
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
                          Syllabus Coverage ({topic.subtopics.length})
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
                                color: '#94a3b8',
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
        )}
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
          {completedCount} of {totalConcepts} concepts completed
        </div>
      </div>
    </div>
  );
};
