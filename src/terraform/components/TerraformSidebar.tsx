import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Search, BookOpen, Layers, X } from 'lucide-react';
import { ALL_TERRAFORM_CHAPTERS } from '../data';
import { TerraformChapter, UniversalTerraformLesson } from '../types/terraformTypes';

interface TerraformSidebarProps {
  activeLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  completedLessonIds: string[];
}

export const TerraformSidebar: React.FC<TerraformSidebarProps> = ({
  activeLessonId,
  onSelectLesson,
  completedLessonIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChapterIds, setExpandedChapterIds] = useState<Record<string, boolean>>(() => {
    // Default open chapter containing active lesson, or Chapter 1
    const initial: Record<string, boolean> = { 'ch-01': true };
    for (const ch of ALL_TERRAFORM_CHAPTERS) {
      if (ch.subchapters.some((s) => s.id === activeLessonId)) {
        initial[ch.id] = true;
      }
    }
    return initial;
  });

  const toggleChapter = (chapterId: string) => {
    setExpandedChapterIds((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    ALL_TERRAFORM_CHAPTERS.forEach((ch) => { next[ch.id] = true; });
    setExpandedChapterIds(next);
  };

  const collapseAll = () => {
    setExpandedChapterIds({});
  };

  // Filtered chapters & subchapters based on search query
  const filteredChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ALL_TERRAFORM_CHAPTERS;

    return ALL_TERRAFORM_CHAPTERS.map((ch) => {
      const matchChapter = ch.title.toLowerCase().includes(q) || String(ch.number).includes(q);
      const filteredSubs = ch.subchapters.filter(
        (s) => s.title.toLowerCase().includes(q) || s.commandOrConcept.toLowerCase().includes(q)
      );

      if (matchChapter) return ch;
      if (filteredSubs.length > 0) {
        return {
          ...ch,
          subchapters: filteredSubs
        };
      }
      return null;
    }).filter(Boolean) as TerraformChapter[];
  }, [searchQuery]);

  const totalLessons = ALL_TERRAFORM_CHAPTERS.reduce((acc, c) => acc + c.subchapters.length, 0);
  const completedCount = completedLessonIds.length;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <aside
      className="terraform-sidebar"
      style={{
        width: '340px',
        minWidth: '340px',
        maxWidth: '340px',
        height: '100%',
        background: '#070b13',
        borderRight: '1px solid rgba(132, 79, 186, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden'
      }}
    >
      {/* Brand & Progress Bar */}
      <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #844fba, #6366f1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Layers size={15} color="#fff" />
            </div>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Terraform <span style={{ color: '#c084fc' }}>Academy</span>
            </span>
          </div>

          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
            {completedCount}/{totalLessons} ({progressPct}%)
          </span>
        </div>

        {/* Progress Fill Track */}
        <div
          style={{
            height: '4px',
            width: '100%',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #844fba, #10b981)',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>

      {/* Search & Collapse Controls */}
      <div style={{ padding: '0.65rem 1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '6px',
            padding: '0.35rem 0.6rem',
            gap: '0.4rem'
          }}
        >
          <Search size={13} color="#64748b" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 50 chapters & lessons..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '0.78rem',
              color: '#f8fafc'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: 0 }}
            >
              <X size={12} />
            </button>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem', fontSize: '0.7rem', color: '#64748b' }}>
          <span>50 Chapters • 694 Subchapters</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={expandAll}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, fontSize: '0.7rem' }}
            >
              Expand All
            </button>
            <span>•</span>
            <button
              onClick={collapseAll}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, fontSize: '0.7rem' }}
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      {/* Chapters & Subchapters Tree View */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0.5rem 0.5rem 2rem 0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.2rem'
        }}
      >
        {filteredChapters.map((ch) => {
          const isExpanded = !!expandedChapterIds[ch.id] || searchQuery.length > 0;
          const chapterCompletedCount = ch.subchapters.filter((s) => completedLessonIds.includes(s.id)).length;
          const isChapterFullyComplete = chapterCompletedCount === ch.subchapters.length;

          return (
            <div key={ch.id} style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Chapter Header Accordion */}
              <div
                onClick={() => toggleChapter(ch.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.45rem 0.6rem',
                  borderRadius: '6px',
                  background: isExpanded ? 'rgba(132, 79, 186, 0.12)' : 'transparent',
                  cursor: 'pointer',
                  color: isExpanded ? '#f8fafc' : '#cbd5e1',
                  transition: 'background 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflow: 'hidden' }}>
                  {isExpanded ? <ChevronDown size={14} color="#c084fc" /> : <ChevronRight size={14} color="#64748b Gamb" />}
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c084fc', minWidth: '22px' }}>
                    {String(ch.number).padStart(2, '0')}.
                  </span>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {ch.title}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: '0.65rem',
                    color: isChapterFullyComplete ? '#10b981' : '#64748b',
                    padding: '0.1rem 0.35rem',
                    borderRadius: '4px',
                    background: isChapterFullyComplete ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)'
                  }}
                >
                  {ch.subchapters.length}
                </span>
              </div>

              {/* Subchapters Nested List */}
              {isExpanded && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '1.25rem',
                    marginLeft: '0.6rem',
                    borderLeft: '1px solid rgba(132, 79, 186, 0.25)',
                    gap: '0.15rem',
                    marginTop: '0.2rem',
                    marginBottom: '0.4rem'
                  }}
                >
                  {ch.subchapters.map((sub) => {
                    const isActive = sub.id === activeLessonId;
                    const isCompleted = completedLessonIds.includes(sub.id);

                    return (
                      <div
                        key={sub.id}
                        onClick={() => onSelectLesson(sub.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.35rem 0.55rem',
                          borderRadius: '5px',
                          background: isActive
                            ? 'rgba(132, 79, 186, 0.28)'
                            : 'transparent',
                          border: isActive ? '1px solid rgba(132, 79, 186, 0.5)' : '1px solid transparent',
                          cursor: 'pointer',
                          color: isActive ? '#f8fafc' : '#94a3b8'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflow: 'hidden' }}>
                          <span style={{ fontSize: '0.7rem', color: '#64748b', minWidth: '18px' }}>
                            {sub.subchapterNumber}
                          </span>
                          <span
                            style={{
                              fontSize: '0.74rem',
                              fontWeight: isActive ? 600 : 400,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {sub.title}
                          </span>
                        </div>

                        {isCompleted && (
                          <CheckCircle2 size={12} color="#10b981" />
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
    </aside>
  );
};
