import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  Terminal,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  GraduationCap,
  LucideIcon,
} from 'lucide-react';

export interface UniverseConceptItem {
  id: string;
  command: string;
  title: string;
  subtitle?: string;
  topicId: string;
  topicNumber: string;
  topicTitle: string;
  difficulty: string;
  whatIsIt?: string;
  whyDoWeNeedIt?: string;
  variations?: Array<{
    title: string;
    syntax?: string;
    whatItDoes?: string;
    example?: string;
    whenToUse?: string;
    warning?: string;
  }>;
  scenarios?: Array<{
    id?: string;
    title: string;
    context?: string;
    question?: string;
    options?: Array<{
      label: string;
      command: string;
      isCorrect: boolean;
      explanation: string;
    }>;
  }>;
  mistakes?: Array<{
    mistake: string;
    whyWrong: string;
    correctWay: string;
  }>;
  comparisons?: Array<{
    itemA: string;
    itemB: string;
    difference: string;
  }>;
}

export interface UniverseTopicFilter {
  id: string;
  number: string;
  title: string;
}

export interface StandardConceptsUniverseProps {
  academyName: string;
  totalConceptCount: number;
  topics: UniverseTopicFilter[];
  concepts: UniverseConceptItem[];
  accentColor?: string;
  accentGradient?: string;
  onLaunchLesson: (conceptId: string) => void;
  brandIcon?: LucideIcon;
}

export const StandardConceptsUniverse: React.FC<StandardConceptsUniverseProps> = ({
  academyName,
  totalConceptCount,
  topics,
  concepts,
  accentColor = '#38bdf8',
  accentGradient = 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
  onLaunchLesson,
  brandIcon: BrandIcon = GraduationCap,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(code);
    setTimeout(() => setCopiedSnippet(null), 1500);
  };

  const handleSelectOption = (scenarioKey: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [scenarioKey]: optionIdx,
    }));
  };

  const toggleCollapse = (conceptId: string) => {
    setCollapsedMap((prev) => ({
      ...prev,
      [conceptId]: !prev[conceptId],
    }));
  };

  const handleExpandAll = () => setCollapsedMap({});
  const handleCollapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    concepts.forEach((c) => {
      allCollapsed[c.id] = true;
    });
    setCollapsedMap(allCollapsed);
  };

  // Filtered concepts based on topic, difficulty, and search query
  const filteredConcepts = useMemo(() => {
    let list = concepts;

    if (selectedTopicId !== 'all') {
      list = list.filter((c) => c.topicId === selectedTopicId);
    }

    if (selectedDifficulty !== 'all') {
      list = list.filter((c) => c.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((c) => {
        const matchCmd = c.command.toLowerCase().includes(q);
        const matchTitle = c.title.toLowerCase().includes(q);
        const matchSub = (c.subtitle || '').toLowerCase().includes(q);
        const matchVars = c.variations?.some(
          (v) =>
            (v.syntax && v.syntax.toLowerCase().includes(q)) ||
            (v.title && v.title.toLowerCase().includes(q)) ||
            (v.whatItDoes && v.whatItDoes.toLowerCase().includes(q))
        );
        return matchCmd || matchTitle || matchSub || matchVars;
      });
    }

    return list;
  }, [concepts, selectedTopicId, selectedDifficulty, searchQuery]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        background: 'var(--bg-app)',
        color: 'var(--text-primary)',
        boxSizing: 'border-box',
      }}
    >
      {/* ================================================================ */}
      {/* 1. HERO BANNER: Universe Overview & Quick Filters               */}
      {/* ================================================================ */}
      <div
        style={{
          padding: '2rem 2.5rem 1.5rem 2.5rem',
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(8, 12, 20, 0.95) 100%)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: accentGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: `0 4px 16px ${accentColor}40`,
                flexShrink: 0,
              }}
            >
              <BrandIcon size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                  {academyName} Concepts Universe
                </h1>
                <span
                  style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.35)',
                    color: '#f59e0b',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <Sparkles size={11} color="#f59e0b" />
                  <span>{totalConceptCount} Canonical Concepts</span>
                </span>
              </div>
              <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                Comprehensive curriculum catalog • Browse all core architectures, command syntaxes, real-world scenarios, and recovery patterns.
              </p>
            </div>
          </div>

          {/* Action Buttons: Expand / Collapse All */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleExpandAll}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: '#cbd5e1',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Expand All
            </button>
            <button
              onClick={handleCollapseAll}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: '#cbd5e1',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
          <Search
            size={16}
            color="var(--text-muted)"
            style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            placeholder={`Search across all ${totalConceptCount} concepts, commands, syntax, or scenarios...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.6rem',
              borderRadius: '10px',
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              fontSize: '0.88rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={13} />
            </button>
          )}
        </div>

        {/* Filter Chips: Topics & Difficulty */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {/* Difficulty Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.25rem' }}>
              DIFFICULTY:
            </span>
            {['all', 'beginner', 'intermediate', 'advanced', 'expert'].map((diff) => {
              const isSelected = selectedDifficulty === diff;
              return (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: isSelected ? 800 : 600,
                    textTransform: 'capitalize',
                    background: isSelected ? `${accentColor}25` : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? `1px solid ${accentColor}60` : '1px solid var(--border-color)',
                    color: isSelected ? accentColor : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {diff}
                </button>
              );
            })}
          </div>

          {/* Topic Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            <button
              onClick={() => setSelectedTopicId('all')}
              style={{
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.74rem',
                fontWeight: selectedTopicId === 'all' ? 800 : 600,
                background: selectedTopicId === 'all' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: selectedTopicId === 'all' ? '1px solid #38bdf8' : '1px solid var(--border-color)',
                color: selectedTopicId === 'all' ? '#38bdf8' : 'var(--text-secondary)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              All Topics ({topics.length})
            </button>
            {topics.map((t) => {
              const isSelected = selectedTopicId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopicId(t.id)}
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: isSelected ? 800 : 600,
                    background: isSelected ? `${accentColor}22` : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? `1px solid ${accentColor}55` : '1px solid var(--border-color)',
                    color: isSelected ? accentColor : 'var(--text-secondary)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {t.number}. {t.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* 2. CONCEPTS STREAM: Interactive Concept Cards                   */}
      {/* ================================================================ */}
      <div
        style={{
          padding: '2rem 2.5rem 5rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '1300px',
          width: '100%',
          boxSizing: 'border-box',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          <span>Showing {filteredConcepts.length} of {totalConceptCount} concepts</span>
        </div>

        {filteredConcepts.map((concept) => {
          const isCollapsed = !!collapsedMap[concept.id];

          return (
            <div
              key={concept.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '14px',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {/* Concept Card Header */}
              <div
                onClick={() => toggleCollapse(concept.id)}
                style={{
                  padding: '1.15rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  cursor: 'pointer',
                  userSelect: 'none',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderBottom: isCollapsed ? 'none' : '1px solid var(--border-color)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0, flex: 1 }}>
                  {/* Monospace Command Pill */}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: accentColor,
                      background: `${accentColor}18`,
                      border: `1px solid ${accentColor}35`,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      flexShrink: 0,
                    }}
                  >
                    {concept.command}
                  </span>

                  {/* Title & Topic Meta */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.2 }}>
                      {concept.title}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      Topic {concept.topicNumber} • {concept.topicTitle}
                      {concept.subtitle && ` — ${concept.subtitle}`}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '999px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: 'var(--text-secondary)',
                      textTransform: 'capitalize',
                    }}
                  >
                    {concept.difficulty}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLaunchLesson(concept.id);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      background: `${accentColor}20`,
                      border: `1px solid ${accentColor}50`,
                      color: accentColor,
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <span>Launch Lesson</span>
                    <ArrowRight size={13} />
                  </button>

                  <div style={{ color: 'var(--text-muted)' }}>
                    {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                  </div>
                </div>
              </div>

              {/* Concept Card Expanded Body */}
              {!isCollapsed && (
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Definition / Explanation */}
                  {concept.whatIsIt && (
                    <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                      {concept.whatIsIt}
                    </div>
                  )}

                  {/* Variations Grid */}
                  {concept.variations && concept.variations.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Command Variations &amp; Usage
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0.75rem' }}>
                        {concept.variations.map((v, vIdx) => (
                          <div
                            key={vIdx}
                            style={{
                              background: 'rgba(0, 0, 0, 0.25)',
                              border: '1px solid var(--border-color)',
                              borderRadius: '8px',
                              padding: '0.85rem',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.45rem',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>
                                {v.title}
                              </span>
                              {v.syntax && (
                                <button
                                  onClick={() => handleCopy(v.syntax!)}
                                  style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: copiedSnippet === v.syntax ? '#22c55e' : 'var(--text-muted)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    fontSize: '0.7rem',
                                  }}
                                  title="Copy syntax"
                                >
                                  {copiedSnippet === v.syntax ? <Check size={12} /> : <Copy size={12} />}
                                </button>
                              )}
                            </div>

                            {v.syntax && (
                              <div
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '0.76rem',
                                  background: 'rgba(0, 0, 0, 0.4)',
                                  padding: '0.35rem 0.55rem',
                                  borderRadius: '5px',
                                  color: accentColor,
                                }}
                              >
                                {v.syntax}
                              </div>
                            )}

                            {v.whatItDoes && (
                              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                                {v.whatItDoes}
                              </div>
                            )}

                            {v.whenToUse && (
                              <div style={{ fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <span>💡 When:</span>
                                <span>{v.whenToUse}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Scenarios Section */}
                  {concept.scenarios && concept.scenarios.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Real-World Problem Scenarios
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {concept.scenarios.map((sc, scIdx) => {
                          const scKey = `${concept.id}-sc-${scIdx}`;
                          const selectedOpt = selectedAnswers[scKey];

                          return (
                            <div
                              key={scIdx}
                              style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '10px',
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.65rem',
                              }}
                            >
                              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#f8fafc' }}>
                                Scenario: {sc.title}
                              </div>
                              {sc.context && (
                                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                                  {sc.context}
                                </div>
                              )}
                              {sc.question && (
                                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: accentColor }}>
                                  {sc.question}
                                </div>
                              )}

                              {sc.options && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem', marginTop: '0.25rem' }}>
                                  {sc.options.map((opt, optIdx) => {
                                    const isChosen = selectedOpt === optIdx;
                                    const showFeedback = selectedOpt !== undefined;

                                    return (
                                      <button
                                        key={optIdx}
                                        onClick={() => handleSelectOption(scKey, optIdx)}
                                        style={{
                                          textAlign: 'left',
                                          padding: '0.6rem 0.8rem',
                                          borderRadius: '8px',
                                          background: isChosen
                                            ? opt.isCorrect
                                              ? 'rgba(34, 197, 94, 0.15)'
                                              : 'rgba(239, 68, 68, 0.15)'
                                            : 'rgba(0, 0, 0, 0.25)',
                                          border: isChosen
                                            ? opt.isCorrect
                                              ? '1px solid #22c55e'
                                              : '1px solid #ef4444'
                                            : '1px solid var(--border-color)',
                                          cursor: 'pointer',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          gap: '0.25rem',
                                        }}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f8fafc' }}>
                                            {opt.label}
                                          </span>
                                          {showFeedback && isChosen && (
                                            opt.isCorrect ? <CheckCircle2 size={14} color="#22c55e" /> : <XCircle size={14} color="#ef4444" />
                                          )}
                                        </div>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: accentColor }}>
                                          $ {opt.command}
                                        </span>
                                        {showFeedback && isChosen && (
                                          <span style={{ fontSize: '0.7rem', color: opt.isCorrect ? '#86efac' : '#fca5a5', marginTop: '0.2rem' }}>
                                            {opt.explanation}
                                          </span>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Common Pitfalls Section */}
                  {concept.mistakes && concept.mistakes.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <AlertTriangle size={14} />
                        <span>Common Pitfalls &amp; Mistakes</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        {concept.mistakes.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            style={{
                              background: 'rgba(245, 158, 11, 0.05)',
                              borderLeft: '3px solid #f59e0b',
                              padding: '0.65rem 0.85rem',
                              borderRadius: '0 8px 8px 0',
                              fontSize: '0.76rem',
                              lineHeight: 1.45,
                            }}
                          >
                            <div style={{ fontWeight: 700, color: '#fde047' }}>❌ {m.mistake}</div>
                            <div style={{ color: '#cbd5e1', marginTop: '0.2rem' }}>{m.whyWrong}</div>
                            <div style={{ color: '#86efac', marginTop: '0.2rem', fontWeight: 600 }}>✅ Correct: {m.correctWay}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
