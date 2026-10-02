import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Layers,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
  ArrowRight,
  RotateCcw,
  GraduationCap,
  LucideIcon,
  LayoutGrid,
  List,
  Filter,
  Maximize2,
  X,
} from 'lucide-react';

export interface UniverseConceptItem {
  id: string;
  command: string;
  title: string;
  subtitle?: string;
  subChapterNumber?: string;
  badges?: string[];
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

export interface CurriculumPackFilter {
  id: string;
  title: string;
  range: [number, number];
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
  curriculumPacks?: CurriculumPackFilter[];
}

type ViewMode = 'grid' | 'cards' | 'table';

// Standard 6-Pack Curriculum groupings for large curriculums (e.g. LinuxForge 30 chapters)
const CURRICULUM_PACKS = [
  { id: 'all', title: 'All Chapters', range: [1, 30] },
  { id: 'pack-1', title: 'Pack 1: Foundations', range: [1, 5] },
  { id: 'pack-2', title: 'Pack 2: CLI & Perms', range: [6, 10] },
  { id: 'pack-3', title: 'Pack 3: Systems & Storage', range: [11, 15] },
  { id: 'pack-4', title: 'Pack 4: Net & Scripting', range: [16, 20] },
  { id: 'pack-5', title: 'Pack 5: Security & Observability', range: [21, 25] },
  { id: 'pack-6', title: 'Pack 6: DevOps & Projects', range: [26, 30] },
];

export const StandardConceptsUniverse: React.FC<StandardConceptsUniverseProps> = ({
  academyName,
  totalConceptCount,
  topics,
  concepts,
  accentColor = '#38bdf8',
  accentGradient = 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
  onLaunchLesson,
  brandIcon: BrandIcon = GraduationCap,
  curriculumPacks = CURRICULUM_PACKS,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  const [selectedPackId, setSelectedPackId] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [pageSize, setPageSize] = useState<number | 'all'>(totalConceptCount <= 100 ? 'all' : 50);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const chipsContainerRef = useRef<HTMLDivElement>(null);
  const [modalConcept, setModalConcept] = useState<UniverseConceptItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalConcept) {
        setModalConcept(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalConcept]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTopicId, selectedPackId, selectedDifficulty, searchQuery, pageSize]);

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
    setCollapsedMap((prev) => {
      const currentlyCollapsed = prev[conceptId] !== undefined ? prev[conceptId] : true;
      if (currentlyCollapsed) {
        // At any point in time, only one card can be expanded.
        // If there is an attempt to expand another card, the previously expanded card will collapse to its original position.
        return {
          [conceptId]: false,
        };
      } else {
        // Collapse this card back to its original position
        return {
          [conceptId]: true,
        };
      }
    });
  };

  const handleExpandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    concepts.forEach((c) => {
      allExpanded[c.id] = false;
    });
    setCollapsedMap(allExpanded);
  };

  const handleCollapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    concepts.forEach((c) => {
      allCollapsed[c.id] = true;
    });
    setCollapsedMap(allCollapsed);
  };

  // Map concept counts per topic for dropdown and chips
  const topicConceptCountMap = useMemo(() => {
    const counts: Record<string, number> = {};
    concepts.forEach((c) => {
      counts[c.topicId] = (counts[c.topicId] || 0) + 1;
    });
    return counts;
  }, [concepts]);

  // Filter topics displayed in chips based on selected pack
  const visibleTopicChips = useMemo(() => {
    if (topics.length < 15 || selectedPackId === 'all') {
      return topics;
    }
    const pack = curriculumPacks.find((p) => p.id === selectedPackId);
    if (!pack) return topics;
    return topics.filter((t) => {
      const num = parseInt(t.number, 10);
      return !isNaN(num) && num >= pack.range[0] && num <= pack.range[1];
    });
  }, [topics, selectedPackId, curriculumPacks]);

  // Filtered concepts based on pack, topic, difficulty, and multi-field search
  const filteredConcepts = useMemo(() => {
    let list = concepts;

    // 1. Pack Filter
    if (topics.length >= 15 && selectedPackId !== 'all') {
      const pack = curriculumPacks.find((p) => p.id === selectedPackId);
      if (pack) {
        list = list.filter((c) => {
          const num = parseInt(c.topicNumber, 10);
          return !isNaN(num) && num >= pack.range[0] && num <= pack.range[1];
        });
      }
    }

    // 2. Specific Topic / Chapter Filter
    if (selectedTopicId !== 'all') {
      list = list.filter((c) => c.topicId === selectedTopicId);
    }

    // 3. Difficulty Filter
    if (selectedDifficulty !== 'all') {
      list = list.filter((c) => (c.difficulty || '').toLowerCase() === selectedDifficulty.toLowerCase());
    }

    // 4. Comprehensive Multi-field Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((c) => {
        const matchCmd = (c.command || '').toLowerCase().includes(q);
        const matchTitle = (c.title || '').toLowerCase().includes(q);
        const matchSub = (c.subtitle || '').toLowerCase().includes(q);
        const matchId = (c.id || '').toLowerCase().includes(q);
        const matchSubCh = (c.subChapterNumber || '').toLowerCase().includes(q);
        const matchTopicNum = (c.topicNumber || '').toLowerCase().includes(q);
        const matchTopicTitle = (c.topicTitle || '').toLowerCase().includes(q);
        const matchDiff = (c.difficulty || '').toLowerCase().includes(q);
        const matchWhat = (c.whatIsIt || '').toLowerCase().includes(q);
        const matchWhy = (c.whyDoWeNeedIt || '').toLowerCase().includes(q);
        const matchBadges = c.badges?.some((b) => b.toLowerCase().includes(q));
        const matchVars = c.variations?.some(
          (v) =>
            (v.syntax && v.syntax.toLowerCase().includes(q)) ||
            (v.title && v.title.toLowerCase().includes(q)) ||
            (v.whatItDoes && v.whatItDoes.toLowerCase().includes(q))
        );
        return (
          matchCmd ||
          matchTitle ||
          matchSub ||
          matchId ||
          matchSubCh ||
          matchTopicNum ||
          matchTopicTitle ||
          matchDiff ||
          matchWhat ||
          matchWhy ||
          matchBadges ||
          matchVars
        );
      });
    }

    return list;
  }, [concepts, topics.length, selectedPackId, selectedTopicId, selectedDifficulty, searchQuery, curriculumPacks]);

  // Compute live dynamic counts for difficulties based on current topic & pack filters
  const difficultyCounts = useMemo(() => {
    let base = concepts;
    if (topics.length >= 15 && selectedPackId !== 'all') {
      const pack = curriculumPacks.find((p) => p.id === selectedPackId);
      if (pack) {
        base = base.filter((c) => {
          const num = parseInt(c.topicNumber, 10);
          return !isNaN(num) && num >= pack.range[0] && num <= pack.range[1];
        });
      }
    }
    if (selectedTopicId !== 'all') {
      base = base.filter((c) => c.topicId === selectedTopicId);
    }
    return {
      all: base.length,
      beginner: base.filter((c) => (c.difficulty || '').toLowerCase() === 'beginner').length,
      intermediate: base.filter((c) => (c.difficulty || '').toLowerCase() === 'intermediate').length,
      advanced: base.filter((c) => (c.difficulty || '').toLowerCase() === 'advanced').length,
      expert: base.filter((c) => (c.difficulty || '').toLowerCase() === 'expert').length,
    };
  }, [concepts, topics.length, selectedPackId, selectedTopicId, curriculumPacks]);

  // Pagination calculations
  const totalPages = pageSize === 'all' ? 1 : Math.max(1, Math.ceil(filteredConcepts.length / Number(pageSize)));
  const paginatedConcepts = useMemo(() => {
    if (pageSize === 'all') {
      return filteredConcepts;
    }
    const size = Number(pageSize);
    const start = (currentPage - 1) * size;
    return filteredConcepts.slice(start, start + size);
  }, [filteredConcepts, pageSize, currentPage]);

  const scrollChips = (direction: 'left' | 'right') => {
    if (chipsContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      chipsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSelectPack = (packId: string) => {
    setSelectedPackId(packId);
    setSelectedTopicId('all');
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    if (topicId !== 'all') {
      const topic = topics.find((t) => t.id === topicId);
      if (topic) {
        const num = parseInt(topic.number, 10);
        const matchingPack = CURRICULUM_PACKS.find(
          (p) => p.id !== 'all' && num >= p.range[0] && num <= p.range[1]
        );
        if (matchingPack && selectedPackId !== 'all' && selectedPackId !== matchingPack.id) {
          setSelectedPackId(matchingPack.id);
        }
      }
    }
  };

  const handleClearFilters = () => {
    setSelectedTopicId('all');
    setSelectedPackId('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedTopicId !== 'all' ||
    selectedPackId !== 'all' ||
    selectedDifficulty !== 'all' ||
    searchQuery.trim() !== '';

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
          padding: '1.75rem 2.25rem 1.25rem 2.25rem',
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.96) 0%, rgba(8, 12, 20, 0.98) 100%)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.15rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
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
                <h1 style={{ margin: 0, fontSize: '1.65rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.02em' }}>
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
              <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                Comprehensive curriculum catalog • Browse all core architectures, command syntaxes, real-world scenarios, and recovery patterns.
              </p>
            </div>
          </div>

          {/* Action Buttons: View Mode Switcher + Expand/Collapse */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {/* View Mode Toggle: Grid, Cards, Table */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '2px',
                gap: '2px',
              }}
            >
              <button
                onClick={() => setViewMode('grid')}
                title="Responsive Grid Layout"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  background: viewMode === 'grid' ? `${accentColor}30` : 'transparent',
                  border: viewMode === 'grid' ? `1px solid ${accentColor}70` : '1px solid transparent',
                  color: viewMode === 'grid' ? '#fff' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <LayoutGrid size={13} />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                title="Detailed Stream View"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  background: viewMode === 'cards' ? `${accentColor}30` : 'transparent',
                  border: viewMode === 'cards' ? `1px solid ${accentColor}70` : '1px solid transparent',
                  color: viewMode === 'cards' ? '#fff' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <Layers size={13} />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                title="Compact Matrix Table View"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  background: viewMode === 'table' ? `${accentColor}30` : 'transparent',
                  border: viewMode === 'table' ? `1px solid ${accentColor}70` : '1px solid transparent',
                  color: viewMode === 'table' ? '#fff' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                <List size={13} />
                <span>Table</span>
              </button>
            </div>

            <button
              onClick={handleExpandAll}
              style={{
                padding: '0.38rem 0.75rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: '#cbd5e1',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Expand All
            </button>
            <button
              onClick={handleCollapseAll}
              style={{
                padding: '0.38rem 0.75rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: '#cbd5e1',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Search Bar + Quick Chapter Jump Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', flex: '1 1 380px' }}>
            <Search
              size={15}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder={`Search all ${totalConceptCount} concepts (e.g. "c-30-01", "30.1", "chmod", "nginx", "docker", "storage")...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.62rem 2.4rem 0.62rem 2.5rem',
                borderRadius: '9px',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '0.86rem',
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
                title="Clear search"
              >
                <RotateCcw size={13} />
              </button>
            )}
          </div>

          {/* Quick Chapter Selector Dropdown */}
          <div style={{ minWidth: '280px', flex: '0 1 340px' }}>
            <select
              aria-label="Jump directly to chapter"
              value={selectedTopicId}
              onChange={(e) => handleSelectTopic(e.target.value)}
              style={{
                width: '100%',
                padding: '0.62rem 1rem',
                borderRadius: '9px',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid var(--border-color)',
                color: '#e2e8f0',
                fontSize: '0.82rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="all">
                📚 All Chapters ({topics.length} Chapters · {concepts.length} Concepts)
              </option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  Chapter {t.number}: {t.title} ({topicConceptCountMap[t.id] || 0} concepts)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Chips: Curriculum Packs, Difficulty, and Topics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {/* Curriculum Packs Bar (for large curriculums >= 15 topics like LinuxForge) */}
          {topics.length >= 15 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginRight: '0.2rem' }}>
                CURRICULUM PACKS:
              </span>
              {curriculumPacks.map((pack) => {
                const isSelected = selectedPackId === pack.id;
                return (
                  <button
                    key={pack.id}
                    onClick={() => handleSelectPack(pack.id)}
                    style={{
                      padding: '0.22rem 0.58rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: isSelected ? 800 : 600,
                      background: isSelected ? `${accentColor}25` : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? `1px solid ${accentColor}` : '1px solid var(--border-color)',
                      color: isSelected ? accentColor : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {pack.title}
                  </button>
                );
              })}
            </div>
          )}

          {/* Difficulty Chips with Live Dynamic Counts */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginRight: '0.2rem' }}>
              DIFFICULTY:
            </span>
            {[
              { id: 'all', label: `All (${difficultyCounts.all})` },
              { id: 'beginner', label: `Beginner (${difficultyCounts.beginner})` },
              { id: 'intermediate', label: `Intermediate (${difficultyCounts.intermediate})` },
              { id: 'advanced', label: `Advanced (${difficultyCounts.advanced})` },
              { id: 'expert', label: `Expert (${difficultyCounts.expert})` },
            ].map((diff) => {
              const isSelected = selectedDifficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  style={{
                    padding: '0.22rem 0.6rem',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: isSelected ? 800 : 600,
                    background: isSelected ? `${accentColor}25` : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? `1px solid ${accentColor}70` : '1px solid var(--border-color)',
                    color: isSelected ? accentColor : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {diff.label}
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                style={{
                  marginLeft: 'auto',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '6px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#f87171',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <RotateCcw size={11} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Topic Chips with Left/Right Scroll Controls */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => scrollChips('left')}
              title="Scroll left"
              style={{
                position: 'absolute',
                left: 0,
                zIndex: 2,
                height: '100%',
                padding: '0 0.35rem',
                background: 'linear-gradient(90deg, rgba(8, 12, 20, 0.95) 0%, rgba(8, 12, 20, 0) 100%)',
                border: 'none',
                color: '#cbd5e1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ChevronLeft size={16} />
            </button>

            <div
              ref={chipsContainerRef}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                overflowX: 'auto',
                padding: '0.15rem 1.75rem 0.25rem 1.75rem',
                width: '100%',
                scrollbarWidth: 'thin',
              }}
            >
              <button
                onClick={() => handleSelectTopic('all')}
                style={{
                  padding: '0.22rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.73rem',
                  fontWeight: selectedTopicId === 'all' ? 800 : 600,
                  background: selectedTopicId === 'all' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: selectedTopicId === 'all' ? '1px solid #38bdf8' : '1px solid var(--border-color)',
                  color: selectedTopicId === 'all' ? '#38bdf8' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                All Chapters ({visibleTopicChips.length})
              </button>
              {visibleTopicChips.map((t) => {
                const isSelected = selectedTopicId === t.id;
                const count = topicConceptCountMap[t.id] || 0;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTopic(t.id)}
                    style={{
                      padding: '0.22rem 0.65rem',
                      borderRadius: '6px',
                      fontSize: '0.73rem',
                      fontWeight: isSelected ? 800 : 600,
                      background: isSelected ? `${accentColor}25` : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? `1px solid ${accentColor}70` : '1px solid var(--border-color)',
                      color: isSelected ? accentColor : 'var(--text-secondary)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <span>{t.number}. {t.title}</span>
                    <span
                      style={{
                        fontSize: '0.66rem',
                        padding: '0.05rem 0.35rem',
                        borderRadius: '999px',
                        background: isSelected ? `${accentColor}40` : 'rgba(255, 255, 255, 0.08)',
                        color: isSelected ? '#fff' : 'var(--text-muted)',
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => scrollChips('right')}
              title="Scroll right"
              style={{
                position: 'absolute',
                right: 0,
                zIndex: 2,
                height: '100%',
                padding: '0 0.35rem',
                background: 'linear-gradient(270deg, rgba(8, 12, 20, 0.95) 0%, rgba(8, 12, 20, 0) 100%)',
                border: 'none',
                color: '#cbd5e1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* 2. RESULTS STREAM: Status Bar, Pagination & Concepts Content    */}
      {/* ================================================================ */}
      <div
        style={{
          padding: '1.5rem 2.25rem 4rem 2.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          maxWidth: '100%',
          width: '100%',
          boxSizing: 'border-box',
          margin: '0 auto',
        }}
      >
        {/* Results Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>
              Showing <strong style={{ color: '#fff' }}>{paginatedConcepts.length}</strong> of{' '}
              <strong style={{ color: '#fff' }}>{filteredConcepts.length}</strong> concepts (filtered from {totalConceptCount} total)
            </span>
            {hasActiveFilters && (
              <span style={{ fontSize: '0.74rem', color: accentColor }}>
                • Active Filters applied
              </span>
            )}
          </div>

          {/* Page Size Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.74rem' }}>Per page:</span>
            {[25, 50, 100, 'all'].map((size) => {
              const isSelected = pageSize === size;
              return (
                <button
                  key={String(size)}
                  onClick={() => setPageSize(size as any)}
                  style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: '5px',
                    fontSize: '0.72rem',
                    fontWeight: isSelected ? 800 : 500,
                    background: isSelected ? `${accentColor}30` : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? `1px solid ${accentColor}70` : '1px solid var(--border-color)',
                    color: isSelected ? accentColor : 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  {size === 'all' ? 'All' : size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Zero Results State */}
        {filteredConcepts.length === 0 && (
          <div
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              background: 'var(--bg-card)',
              border: '1px dashed var(--border-color)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Filter size={32} color="var(--text-muted)" />
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
              No concepts match your filter criteria
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '450px' }}>
              Try adjusting your search query, switching difficulty, or selecting "All Chapters" to inspect the full curriculum.
            </p>
            <button
              onClick={handleClearFilters}
              style={{
                marginTop: '0.5rem',
                padding: '0.45rem 1rem',
                borderRadius: '8px',
                background: `${accentColor}25`,
                border: `1px solid ${accentColor}60`,
                color: accentColor,
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* VIEW MODE 1: RESPONSIVE GRID VIEW */}
        {viewMode === 'grid' && filteredConcepts.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gridAutoFlow: 'dense',
              gap: '1rem',
              width: '100%',
            }}
          >
            {paginatedConcepts.map((concept, idx) => {
              const isCollapsed = collapsedMap[concept.id] !== undefined ? collapsedMap[concept.id] : true;
              const prevConcept = idx > 0 ? paginatedConcepts[idx - 1] : null;
              const isNewChapter = !prevConcept || prevConcept.topicId !== concept.topicId;
              const chapterCount = topicConceptCountMap[concept.topicId] || 0;

              return (
                <React.Fragment key={concept.id}>
                  {isNewChapter && (
                    <div
                      style={{
                        gridColumn: '1 / -1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1.25rem',
                        marginTop: idx > 0 ? '1.5rem' : '0.25rem',
                        marginBottom: '0.25rem',
                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                        border: '1px solid var(--border-color)',
                        borderLeft: `4px solid ${accentColor}`,
                        borderRadius: '10px',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            color: accentColor,
                            background: `${accentColor}18`,
                            border: `1px solid ${accentColor}35`,
                            padding: '0.15rem 0.5rem',
                            borderRadius: '5px',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          Chapter {concept.topicNumber}
                        </span>
                        <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                          {concept.topicTitle}
                        </h2>
                      </div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '0.15rem 0.55rem',
                          borderRadius: '999px',
                        }}
                      >
                        {chapterCount} {chapterCount === 1 ? 'Sub-chapter' : 'Sub-chapters'}
                      </span>
                    </div>
                  )}

                  <div
                    key={concept.id}
                  style={{
                    gridColumn: isCollapsed ? 'auto' : '1 / -1',
                    background: isCollapsed
                      ? 'var(--bg-card)'
                      : 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(8, 12, 20, 0.99) 100%)',
                    border: isCollapsed ? '1px solid var(--border-color)' : `1px solid ${accentColor}80`,
                    boxShadow: isCollapsed ? 'none' : `0 12px 36px rgba(0,0,0,0.6), 0 0 0 1px ${accentColor}30`,
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
                  }}
                >
                  {/* Card Top Header */}
                  <div
                    style={{
                      padding: '0.85rem 1.15rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderBottom: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0, flex: 1 }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: accentColor,
                          background: `${accentColor}15`,
                          border: `1px solid ${accentColor}30`,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '5px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '180px',
                        }}
                        title={concept.command}
                      >
                        {concept.command}
                      </span>
                      <button
                        onClick={() => handleCopy(concept.command)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
                        title="Copy command"
                      >
                        {copiedSnippet === concept.command ? <Check size={12} color="#22c55e" /> : <Copy size={12} />}
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                      {concept.subChapterNumber && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            color: accentColor,
                            background: `${accentColor}15`,
                            border: `1px solid ${accentColor}35`,
                            padding: '0.1rem 0.45rem',
                            borderRadius: '4px',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          Sub-chapter {concept.subChapterNumber}
                        </span>
                      )}
                      <span
                        style={{
                          fontSize: '0.66rem',
                          fontWeight: 700,
                          padding: '0.12rem 0.45rem',
                          borderRadius: '999px',
                          background: 'rgba(255, 255, 255, 0.06)',
                          color: 'var(--text-secondary)',
                          textTransform: 'capitalize',
                        }}
                      >
                        {concept.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '1rem 1.15rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.6rem' }}>
                    <div>
                      <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.3, display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                        {concept.subChapterNumber && (
                          <span
                            style={{
                              fontSize: '0.86rem',
                              fontFamily: 'var(--font-mono)',
                              color: accentColor,
                              fontWeight: 800,
                              flexShrink: 0,
                            }}
                          >
                            {concept.subChapterNumber}
                          </span>
                        )}
                        <span>{concept.title}</span>
                      </div>
                      <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        Chapter {concept.topicNumber}: {concept.topicTitle}
                      </div>
                      {concept.badges && concept.badges.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.35rem' }}>
                          {concept.badges.map((b, bIdx) => (
                            <span
                              key={bIdx}
                              style={{
                                fontSize: '0.64rem',
                                fontWeight: 600,
                                padding: '0.1rem 0.38rem',
                                borderRadius: '4px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                color: '#94a3b8',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                              }}
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {concept.subtitle && (
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: '#cbd5e1',
                          lineHeight: 1.45,
                          display: '-webkit-box',
                          WebkitLineClamp: isCollapsed ? 2 : undefined,
                          WebkitBoxOrient: 'vertical',
                          overflow: isCollapsed ? 'hidden' : 'visible',
                        }}
                      >
                        {concept.subtitle}
                      </div>
                    )}

                    {/* Expanded Details inside Grid Tile - Full Width Layout */}
                    {!isCollapsed && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1.15rem',
                          marginTop: '0.65rem',
                          borderTop: '1px solid var(--border-color)',
                          paddingTop: '1rem',
                        }}
                      >
                        {/* Definition / Explanation */}
                        {concept.whatIsIt && (
                          <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                            {concept.whatIsIt}
                          </div>
                        )}

                        {/* Why Do You Need It */}
                        {concept.whyDoWeNeedIt && (
                          <div
                            style={{
                              fontSize: '0.82rem',
                              color: '#94a3b8',
                              lineHeight: 1.5,
                              background: 'rgba(0, 0, 0, 0.2)',
                              padding: '0.65rem 0.85rem',
                              borderRadius: '8px',
                              borderLeft: `3px solid ${accentColor}`,
                            }}
                          >
                            <strong style={{ color: '#e2e8f0' }}>Why you need it: </strong>
                            {concept.whyDoWeNeedIt}
                          </div>
                        )}

                        {/* Complete Variations Grid across Full Width */}
                        {concept.variations && concept.variations.length > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                            <div
                              style={{
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                              }}
                            >
                              Command Variations &amp; Usage ({concept.variations.length})
                            </div>
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: '0.65rem',
                              }}
                            >
                              {concept.variations.map((v, vIdx) => (
                                <div
                                  key={vIdx}
                                  style={{
                                    background: 'rgba(0, 0, 0, 0.25)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    padding: '0.75rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.4rem',
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>
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
                                        fontSize: '0.75rem',
                                        background: 'rgba(0, 0, 0, 0.4)',
                                        padding: '0.3rem 0.5rem',
                                        borderRadius: '5px',
                                        color: accentColor,
                                      }}
                                    >
                                      {v.syntax}
                                    </div>
                                  )}

                                  {v.whatItDoes && (
                                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
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

                        {/* Interactive Scenario Checks */}
                        {concept.scenarios && concept.scenarios.length > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                            <div
                              style={{
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                color: 'var(--text-secondary)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.04em',
                              }}
                            >
                              Interactive Scenario Check
                            </div>
                            {concept.scenarios.map((sc, scIdx) => {
                              const scKey = `grid-${concept.id}-sc-${scIdx}`;
                              const selectedOpt = selectedAnswers[scKey];

                              return (
                                <div
                                  key={scIdx}
                                  style={{
                                    background: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    padding: '0.85rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.55rem',
                                  }}
                                >
                                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#f8fafc' }}>
                                    {sc.title}
                                  </div>
                                  {sc.context && (
                                    <div style={{ fontSize: '0.76rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                                      {sc.context}
                                    </div>
                                  )}
                                  {sc.question && (
                                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: accentColor }}>
                                      {sc.question}
                                    </div>
                                  )}

                                  {sc.options && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.45rem', marginTop: '0.2rem' }}>
                                      {sc.options.map((opt, optIdx) => {
                                        const isChosen = selectedOpt === optIdx;
                                        const showFeedback = selectedOpt !== undefined;

                                        return (
                                          <button
                                            key={optIdx}
                                            onClick={() => handleSelectOption(scKey, optIdx)}
                                            style={{
                                              textAlign: 'left',
                                              padding: '0.55rem 0.75rem',
                                              borderRadius: '6px',
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
                                              gap: '0.2rem',
                                            }}
                                          >
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                              <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#f8fafc' }}>
                                                {opt.label}
                                              </span>
                                              {showFeedback && isChosen && (
                                                opt.isCorrect ? <CheckCircle2 size={13} color="#22c55e" /> : <XCircle size={13} color="#ef4444" />
                                              )}
                                            </div>
                                            {showFeedback && isChosen && (
                                              <span style={{ fontSize: '0.68rem', color: opt.isCorrect ? '#86efac' : '#fca5a5', marginTop: '0.15rem' }}>
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
                        )}

                        {/* Common Pitfalls Section */}
                        {concept.mistakes && concept.mistakes.length > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <AlertTriangle size={13} />
                              <span>Common Pitfalls &amp; Mistakes</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                              {concept.mistakes.map((m, mIdx) => (
                                <div
                                  key={mIdx}
                                  style={{
                                    background: 'rgba(245, 158, 11, 0.05)',
                                    borderLeft: '3px solid #f59e0b',
                                    padding: '0.55rem 0.75rem',
                                    borderRadius: '0 6px 6px 0',
                                    fontSize: '0.74rem',
                                    lineHeight: 1.4,
                                  }}
                                >
                                  <div style={{ fontWeight: 700, color: '#fde047' }}>❌ {m.mistake}</div>
                                  <div style={{ color: '#cbd5e1', marginTop: '0.15rem' }}>{m.whyWrong}</div>
                                  <div style={{ color: '#86efac', marginTop: '0.15rem', fontWeight: 600 }}>✅ Correct: {m.correctWay}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Comparisons / Bridge Section */}
                        {concept.comparisons && concept.comparisons.length > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                            <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                              Architectural Comparison
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                              {concept.comparisons.map((cmp, cIdx) => (
                                <div
                                  key={cIdx}
                                  style={{
                                    background: 'rgba(56, 189, 248, 0.06)',
                                    borderLeft: '3px solid #38bdf8',
                                    padding: '0.55rem 0.75rem',
                                    borderRadius: '0 6px 6px 0',
                                    fontSize: '0.74rem',
                                    lineHeight: 1.4,
                                  }}
                                >
                                  <div style={{ fontWeight: 700, color: '#bae6fd' }}>
                                    {cmp.itemA} ➔ {cmp.itemB}
                                  </div>
                                  <div style={{ color: '#cbd5e1', marginTop: '0.15rem' }}>{cmp.difference}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div
                    style={{
                      padding: '0.75rem 1.15rem',
                      background: 'rgba(0, 0, 0, 0.25)',
                      borderTop: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={() => toggleCollapse(concept.id)}
                        style={{
                          background: isCollapsed ? 'transparent' : `${accentColor}20`,
                          border: isCollapsed ? '1px solid transparent' : `1px solid ${accentColor}60`,
                          color: isCollapsed ? 'var(--text-muted)' : accentColor,
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '6px',
                        }}
                        title={isCollapsed ? 'Expand card across full width of screen' : 'Collapse back to tile'}
                      >
                        <span>{isCollapsed ? 'Details' : 'Collapse Details'}</span>
                        {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                      </button>

                      <button
                        onClick={() => setModalConcept(concept)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-muted)',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.25rem 0.4rem',
                          borderRadius: '4px',
                        }}
                        title="View in full-screen modal"
                      >
                        <Maximize2 size={12} />
                        <span>Full View</span>
                      </button>
                    </div>

                    <button
                      onClick={() => onLaunchLesson(concept.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
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
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* VIEW MODE 2: CARDS STREAM VIEW (Full Width Expandable Cards) */}
        {viewMode === 'cards' && filteredConcepts.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {paginatedConcepts.map((concept, idx) => {
              const isCollapsed = collapsedMap[concept.id] !== undefined ? collapsedMap[concept.id] : true;
              const prevConcept = idx > 0 ? paginatedConcepts[idx - 1] : null;
              const isNewChapter = !prevConcept || prevConcept.topicId !== concept.topicId;
              const chapterCount = topicConceptCountMap[concept.topicId] || 0;

              return (
                <React.Fragment key={concept.id}>
                  {isNewChapter && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1.25rem',
                        marginTop: idx > 0 ? '1.5rem' : '0.25rem',
                        marginBottom: '0.25rem',
                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                        border: '1px solid var(--border-color)',
                        borderLeft: `4px solid ${accentColor}`,
                        borderRadius: '10px',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            color: accentColor,
                            background: `${accentColor}18`,
                            border: `1px solid ${accentColor}35`,
                            padding: '0.15rem 0.5rem',
                            borderRadius: '5px',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          Chapter {concept.topicNumber}
                        </span>
                        <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                          {concept.topicTitle}
                        </h2>
                      </div>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: 'var(--text-muted)',
                          background: 'rgba(255, 255, 255, 0.05)',
                          padding: '0.15rem 0.55rem',
                          borderRadius: '999px',
                        }}
                      >
                        {chapterCount} {chapterCount === 1 ? 'Sub-chapter' : 'Sub-chapters'}
                      </span>
                    </div>
                  )}

                  <div
                    key={concept.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  {/* Concept Card Header */}
                  <div
                    onClick={() => toggleCollapse(concept.id)}
                    style={{
                      padding: '1rem 1.35rem',
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.96rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.2 }}>
                            {concept.subChapterNumber && (
                              <span style={{ color: accentColor, marginRight: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                                {concept.subChapterNumber}
                              </span>
                            )}
                            {concept.title}
                          </span>
                          {concept.subChapterNumber && (
                            <span
                              style={{
                                fontSize: '0.68rem',
                                fontWeight: 800,
                                color: accentColor,
                                background: `${accentColor}15`,
                                border: `1px solid ${accentColor}35`,
                                padding: '0.1rem 0.45rem',
                                borderRadius: '4px',
                                fontFamily: 'var(--font-mono)',
                              }}
                            >
                              Sub-chapter {concept.subChapterNumber}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          Chapter {concept.topicNumber}: {concept.topicTitle}
                          {concept.subtitle && ` — ${concept.subtitle}`}
                        </div>
                        {concept.badges && concept.badges.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.35rem' }}>
                            {concept.badges.map((b, bIdx) => (
                              <span
                                key={bIdx}
                                style={{
                                  fontSize: '0.64rem',
                                  fontWeight: 600,
                                  padding: '0.1rem 0.38rem',
                                  borderRadius: '4px',
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  color: '#94a3b8',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                }}
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
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
                    <div style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                      {/* Definition / Explanation */}
                      {concept.whatIsIt && (
                        <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                          {concept.whatIsIt}
                        </div>
                      )}

                      {/* Why Do You Need It */}
                      {concept.whyDoWeNeedIt && (
                        <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, background: 'rgba(0, 0, 0, 0.2)', padding: '0.65rem 0.85rem', borderRadius: '8px', borderLeft: `3px solid ${accentColor}` }}>
                          <strong style={{ color: '#e2e8f0' }}>Why you need it: </strong>
                          {concept.whyDoWeNeedIt}
                        </div>
                      )}

                      {/* Variations Grid */}
                      {concept.variations && concept.variations.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Command Variations &amp; Usage
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.65rem' }}>
                            {concept.variations.map((v, vIdx) => (
                              <div
                                key={vIdx}
                                style={{
                                  background: 'rgba(0, 0, 0, 0.25)',
                                  border: '1px solid var(--border-color)',
                                  borderRadius: '8px',
                                  padding: '0.75rem',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '0.4rem',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>
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
                                      fontSize: '0.75rem',
                                      background: 'rgba(0, 0, 0, 0.4)',
                                      padding: '0.3rem 0.5rem',
                                      borderRadius: '5px',
                                      color: accentColor,
                                    }}
                                  >
                                    {v.syntax}
                                  </div>
                                )}

                                {v.whatItDoes && (
                                  <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Interactive Scenario Check
                          </div>
                          {concept.scenarios.map((sc, scIdx) => {
                            const scKey = `${concept.id}-sc-${scIdx}`;
                            const selectedOpt = selectedAnswers[scKey];

                            return (
                              <div
                                key={scIdx}
                                style={{
                                  background: 'rgba(255, 255, 255, 0.02)',
                                  border: '1px solid var(--border-color)',
                                  borderRadius: '8px',
                                  padding: '0.85rem',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '0.55rem',
                                }}
                              >
                                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#f8fafc' }}>
                                  {sc.title}
                                </div>
                                {sc.context && (
                                  <div style={{ fontSize: '0.76rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                                    {sc.context}
                                  </div>
                                )}
                                {sc.question && (
                                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: accentColor }}>
                                    {sc.question}
                                  </div>
                                )}

                                {sc.options && (
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.45rem', marginTop: '0.2rem' }}>
                                    {sc.options.map((opt, optIdx) => {
                                      const isChosen = selectedOpt === optIdx;
                                      const showFeedback = selectedOpt !== undefined;

                                      return (
                                        <button
                                          key={optIdx}
                                          onClick={() => handleSelectOption(scKey, optIdx)}
                                          style={{
                                            textAlign: 'left',
                                            padding: '0.55rem 0.75rem',
                                            borderRadius: '6px',
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
                                            gap: '0.2rem',
                                          }}
                                        >
                                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#f8fafc' }}>
                                              {opt.label}
                                            </span>
                                            {showFeedback && isChosen && (
                                              opt.isCorrect ? <CheckCircle2 size={13} color="#22c55e" /> : <XCircle size={13} color="#ef4444" />
                                            )}
                                          </div>
                                          {showFeedback && isChosen && (
                                            <span style={{ fontSize: '0.68rem', color: opt.isCorrect ? '#86efac' : '#fca5a5', marginTop: '0.15rem' }}>
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
                      )}

                      {/* Common Pitfalls Section */}
                      {concept.mistakes && concept.mistakes.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <AlertTriangle size={13} />
                            <span>Common Pitfalls &amp; Mistakes</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {concept.mistakes.map((m, mIdx) => (
                              <div
                                key={mIdx}
                                style={{
                                  background: 'rgba(245, 158, 11, 0.05)',
                                  borderLeft: '3px solid #f59e0b',
                                  padding: '0.55rem 0.75rem',
                                  borderRadius: '0 6px 6px 0',
                                  fontSize: '0.74rem',
                                  lineHeight: 1.4,
                                }}
                              >
                                <div style={{ fontWeight: 700, color: '#fde047' }}>❌ {m.mistake}</div>
                                <div style={{ color: '#cbd5e1', marginTop: '0.15rem' }}>{m.whyWrong}</div>
                                <div style={{ color: '#86efac', marginTop: '0.15rem', fontWeight: 600 }}>✅ Correct: {m.correctWay}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Comparisons / Bridge Section */}
                      {concept.comparisons && concept.comparisons.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                          <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Architectural Comparison
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {concept.comparisons.map((cmp, cIdx) => (
                              <div
                                key={cIdx}
                                style={{
                                  background: 'rgba(56, 189, 248, 0.06)',
                                  borderLeft: '3px solid #38bdf8',
                                  padding: '0.55rem 0.75rem',
                                  borderRadius: '0 6px 6px 0',
                                  fontSize: '0.74rem',
                                  lineHeight: 1.4,
                                }}
                              >
                                <div style={{ fontWeight: 700, color: '#bae6fd' }}>
                                  {cmp.itemA} ➔ {cmp.itemB}
                                </div>
                                <div style={{ color: '#cbd5e1', marginTop: '0.15rem' }}>{cmp.difference}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* VIEW MODE 3: COMPACT MATRIX TABLE VIEW */}
        {viewMode === 'table' && filteredConcepts.length > 0 && (
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700, width: '70px' }}>Sub</th>
                    <th style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700, width: '220px' }}>Command</th>
                    <th style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700 }}>Concept Title &amp; Core Purpose</th>
                    <th style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700, width: '180px' }}>Chapter</th>
                    <th style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700, width: '110px' }}>Difficulty</th>
                    <th style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)', fontWeight: 700, width: '130px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedConcepts.map((concept, idx) => {
                    const prevConcept = idx > 0 ? paginatedConcepts[idx - 1] : null;
                    const isNewChapter = !prevConcept || prevConcept.topicId !== concept.topicId;
                    const chapterCount = topicConceptCountMap[concept.topicId] || 0;

                    return (
                      <React.Fragment key={concept.id}>
                        {isNewChapter && (
                          <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid var(--border-color)', borderTop: idx > 0 ? '2px solid rgba(255, 255, 255, 0.08)' : 'none' }}>
                            <td colSpan={6} style={{ padding: '0.65rem 1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: accentColor, background: `${accentColor}18`, border: `1px solid ${accentColor}35`, padding: '0.12rem 0.45rem', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                                    Chapter {concept.topicNumber}
                                  </span>
                                  <span style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.86rem' }}>
                                    {concept.topicTitle}
                                  </span>
                                </div>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                  {chapterCount} {chapterCount === 1 ? 'Sub-chapter' : 'Sub-chapters'}
                                </span>
                              </div>
                            </td>
                          </tr>
                        )}
                        <tr
                          key={concept.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.01)',
                      }}
                    >
                      <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        {concept.subChapterNumber || concept.id}
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              color: accentColor,
                              background: `${accentColor}15`,
                              padding: '0.2rem 0.45rem',
                              borderRadius: '4px',
                              maxWidth: '190px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              display: 'inline-block',
                            }}
                            title={concept.command}
                          >
                            {concept.command}
                          </span>
                          <button
                            onClick={() => handleCopy(concept.command)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
                            title="Copy command"
                          >
                            {copiedSnippet === concept.command ? <Check size={11} color="#22c55e" /> : <Copy size={11} />}
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ fontWeight: 700, color: '#f8fafc' }}>
                          {concept.subChapterNumber && (
                            <span style={{ color: accentColor, marginRight: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                              {concept.subChapterNumber}
                            </span>
                          )}
                          {concept.title}
                        </div>
                        {concept.subtitle && (
                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.1rem', maxWidth: '420px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {concept.subtitle}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)', fontSize: '0.76rem' }}>
                        <div>Ch {concept.topicNumber}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{concept.topicTitle}</div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.45rem',
                            borderRadius: '999px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: 'var(--text-secondary)',
                            textTransform: 'capitalize',
                          }}
                        >
                          {concept.difficulty}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => onLaunchLesson(concept.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '5px',
                            background: `${accentColor}20`,
                            border: `1px solid ${accentColor}50`,
                            color: accentColor,
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          <span>Launch</span>
                          <ArrowRight size={11} />
                        </button>
                      </td>
                    </tr>
                    </React.Fragment>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination Bar (when pageSize !== 'all') */}
        {totalPages > 1 && (
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '0.65rem 1.25rem',
              fontSize: '0.8rem',
            }}
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: currentPage === 1 ? 'var(--text-muted)' : '#cbd5e1',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontWeight: 600,
              }}
            >
              <ChevronLeft size={14} />
              <span>Previous</span>
            </button>

            <span style={{ color: 'var(--text-secondary)' }}>
              Page <strong style={{ color: '#fff' }}>{currentPage}</strong> of <strong style={{ color: '#fff' }}>{totalPages}</strong>
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: currentPage === totalPages ? 'var(--text-muted)' : '#cbd5e1',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontWeight: 600,
              }}
            >
              <span>Next</span>
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Full-Screen Focus Modal */}
      {modalConcept && (
        <div
          onClick={() => setModalConcept(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            boxSizing: 'border-box',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '1280px',
              maxHeight: '92vh',
              background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.99) 0%, rgba(8, 12, 20, 0.99) 100%)',
              border: `1px solid ${accentColor}60`,
              borderRadius: '16px',
              boxShadow: `0 25px 60px rgba(0, 0, 0, 0.85), 0 0 0 1px ${accentColor}30`,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1.25rem 1.75rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(255, 255, 255, 0.02)',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', minWidth: 0, flex: 1 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    color: accentColor,
                    background: `${accentColor}18`,
                    border: `1px solid ${accentColor}40`,
                    padding: '0.3rem 0.75rem',
                    borderRadius: '6px',
                    flexShrink: 0,
                  }}
                >
                  {modalConcept.command}
                </span>

                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#f8fafc', lineHeight: 1.2 }}>
                      {modalConcept.subChapterNumber && (
                        <span style={{ color: accentColor, marginRight: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                          {modalConcept.subChapterNumber}
                        </span>
                      )}
                      {modalConcept.title}
                    </h2>
                    {modalConcept.subChapterNumber && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: '#94a3b8',
                          background: 'rgba(255, 255, 255, 0.06)',
                          padding: '0.12rem 0.45rem',
                          borderRadius: '4px',
                        }}
                      >
                        {modalConcept.subChapterNumber}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Chapter {modalConcept.topicNumber}: {modalConcept.topicTitle}
                    {modalConcept.subtitle && ` — ${modalConcept.subtitle}`}
                  </div>
                  {modalConcept.badges && modalConcept.badges.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.35rem' }}>
                      {modalConcept.badges.map((b, bIdx) => (
                        <span
                          key={bIdx}
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 600,
                            padding: '0.12rem 0.45rem',
                            borderRadius: '4px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: '#94a3b8',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'var(--text-secondary)',
                    textTransform: 'capitalize',
                  }}
                >
                  {modalConcept.difficulty}
                </span>

                <button
                  onClick={() => {
                    const cid = modalConcept.id;
                    setModalConcept(null);
                    onLaunchLesson(cid);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 1rem',
                    borderRadius: '8px',
                    background: `${accentColor}25`,
                    border: `1px solid ${accentColor}60`,
                    color: accentColor,
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  <span>Launch Lesson</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => setModalConcept(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '0.4rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Close (Esc)"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
              {modalConcept.whatIsIt && (
                <div style={{ fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                  {modalConcept.whatIsIt}
                </div>
              )}

              {modalConcept.whyDoWeNeedIt && (
                <div
                  style={{
                    fontSize: '0.88rem',
                    color: '#94a3b8',
                    lineHeight: 1.55,
                    background: 'rgba(0, 0, 0, 0.25)',
                    padding: '0.85rem 1.15rem',
                    borderRadius: '10px',
                    borderLeft: `4px solid ${accentColor}`,
                  }}
                >
                  <strong style={{ color: '#f8fafc' }}>Why you need it: </strong>
                  {modalConcept.whyDoWeNeedIt}
                </div>
              )}

              {modalConcept.variations && modalConcept.variations.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Command Variations &amp; Usage ({modalConcept.variations.length})
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '0.75rem' }}>
                    {modalConcept.variations.map((v, vIdx) => (
                      <div
                        key={vIdx}
                        style={{
                          background: 'rgba(0, 0, 0, 0.3)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '10px',
                          padding: '0.85rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.45rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
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
                                fontSize: '0.72rem',
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
                              fontSize: '0.8rem',
                              background: 'rgba(0, 0, 0, 0.45)',
                              padding: '0.35rem 0.6rem',
                              borderRadius: '6px',
                              color: accentColor,
                            }}
                          >
                            {v.syntax}
                          </div>
                        )}

                        {v.whatItDoes && (
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                            {v.whatItDoes}
                          </div>
                        )}

                        {v.whenToUse && (
                          <div style={{ fontSize: '0.74rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <span>💡 When:</span>
                            <span>{v.whenToUse}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalConcept.scenarios && modalConcept.scenarios.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Interactive Scenario Check
                  </div>
                  {modalConcept.scenarios.map((sc, scIdx) => {
                    const scKey = `modal-${modalConcept.id}-sc-${scIdx}`;
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
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>
                          {sc.title}
                        </div>
                        {sc.context && (
                          <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                            {sc.context}
                          </div>
                        )}
                        {sc.question && (
                          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: accentColor }}>
                            {sc.question}
                          </div>
                        )}

                        {sc.options && (
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.55rem', marginTop: '0.35rem' }}>
                            {sc.options.map((opt, optIdx) => {
                              const isChosen = selectedOpt === optIdx;
                              const showFeedback = selectedOpt !== undefined;

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectOption(scKey, optIdx)}
                                  style={{
                                    textAlign: 'left',
                                    padding: '0.65rem 0.85rem',
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
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>
                                      {opt.label}
                                    </span>
                                    {showFeedback && isChosen && (
                                      opt.isCorrect ? <CheckCircle2 size={14} color="#22c55e" /> : <XCircle size={14} color="#ef4444" />
                                    )}
                                  </div>
                                  {showFeedback && isChosen && (
                                    <span style={{ fontSize: '0.72rem', color: opt.isCorrect ? '#86efac' : '#fca5a5', marginTop: '0.15rem' }}>
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
              )}

              {modalConcept.mistakes && modalConcept.mistakes.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <AlertTriangle size={15} />
                    <span>Common Pitfalls &amp; Mistakes</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {modalConcept.mistakes.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        style={{
                          background: 'rgba(245, 158, 11, 0.05)',
                          borderLeft: '4px solid #f59e0b',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '0 8px 8px 0',
                          fontSize: '0.78rem',
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

              {modalConcept.comparisons && modalConcept.comparisons.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Architectural Comparison
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {modalConcept.comparisons.map((cmp, cIdx) => (
                      <div
                        key={cIdx}
                        style={{
                          background: 'rgba(56, 189, 248, 0.06)',
                          borderLeft: '4px solid #38bdf8',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '0 8px 8px 0',
                          fontSize: '0.78rem',
                          lineHeight: 1.45,
                        }}
                      >
                        <div style={{ fontWeight: 700, color: '#bae6fd' }}>
                          {cmp.itemA} ➔ {cmp.itemB}
                        </div>
                        <div style={{ color: '#cbd5e1', marginTop: '0.2rem' }}>{cmp.difference}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
