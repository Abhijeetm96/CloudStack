import React, { useState, useMemo } from 'react';
import {
  DEVOPS_50_CHAPTERS,
  DEVOPS_10_LEVELS,
  ALL_DEVOPS_LESSONS,
} from '../../data/devopsCurriculumData';
import { DevOpsChapter, DevOpsLesson, DevOpsLevelId } from '../../types/devopsCurriculumTypes';
import { DevOpsProgressStore } from '../../progress/devopsProgress';
import {
  Search,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Terminal,
  Workflow,
  Container,
  Boxes,
  ShieldCheck,
  Activity,
  Layers,
  Code2,
  Award,
  Zap,
  RotateCcw,
  Sparkles,
  BookOpen,
} from 'lucide-react';

const LEVEL_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string; className?: string }>> = {
  Terminal,
  Workflow,
  Container,
  Boxes,
  ShieldCheck,
  Activity,
  Layers,
  Code2,
  Award,
  Zap,
};

interface SidebarProps {
  activeLessonId: string;
  onSelectLesson: (lessonId: string, chapterNumber: number) => void;
  progressStore: DevOpsProgressStore;
  onProgressUpdate: () => void;
}

export const DevOpsAcademySidebar: React.FC<SidebarProps> = ({
  activeLessonId,
  onSelectLesson,
  progressStore,
  onProgressUpdate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({
    'level-01-foundation': true,
  });
  const [expandedChapters, setExpandedChapters] = useState<Record<number, boolean>>({
    1: true,
  });

  const completionPercent = progressStore.getCompletionPercentage(ALL_DEVOPS_LESSONS.length);
  const completedIds = progressStore.getState().completedLessonIds;

  // Toggle level expansion
  const toggleLevel = (levelId: DevOpsLevelId) => {
    setExpandedLevels(prev => ({
      ...prev,
      [levelId]: !prev[levelId],
    }));
  };

  // Toggle chapter expansion
  const toggleChapter = (chapterNum: number) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterNum]: !prev[chapterNum],
    }));
  };

  // Toggle completion checkbox
  const handleToggleCompleted = (e: React.MouseEvent, lessonId: string) => {
    e.stopPropagation();
    progressStore.toggleLessonCompleted(lessonId);
    onProgressUpdate();
  };

  // Search filtering
  const filteredChapters = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return DEVOPS_50_CHAPTERS;

    return DEVOPS_50_CHAPTERS.filter(ch => {
      const chMatch =
        ch.title.toLowerCase().includes(q) ||
        String(ch.number).includes(q) ||
        ch.summary.toLowerCase().includes(q) ||
        ch.targetTechnologies.some(t => t.toLowerCase().includes(q));

      const subMatch = ch.subchapters.some(
        sub =>
          sub.title.toLowerCase().includes(q) ||
          sub.code.includes(q) ||
          sub.lesson.whatIsIt.toLowerCase().includes(q)
      );

      return chMatch || subMatch;
    });
  }, [searchQuery]);

  return (
    <aside className="w-80 lg:w-96 h-full flex flex-col bg-slate-900 border-r border-slate-800 shrink-0 select-none">
      {/* Sidebar Header & Overall Progress */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <BookOpen size={16} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide uppercase">
                DevOps Curriculum
              </h2>
              <p className="text-[11px] text-slate-400">50 Chapters • 895 Lessons</p>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm('Reset your DevOps Academy progress?')) {
                progressStore.reset();
                onProgressUpdate();
              }
            }}
            title="Reset progress"
            className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded transition"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
            <span>Course Progress</span>
            <span className="font-mono text-cyan-400 font-semibold">{completionPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
            <span>{completedIds.length} completed</span>
            <span>{ALL_DEVOPS_LESSONS.length - completedIds.length} remaining</span>
          </div>
        </div>

        {/* Search input */}
        <div className="relative mt-3">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search chapters, subchapters, tools..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition"
          />
        </div>
      </div>

      {/* Chapters Tree View (3-Tier: Level -> Chapter -> Subchapter/Lesson) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {DEVOPS_10_LEVELS.map(level => {
          const levelChapters = filteredChapters.filter(ch => ch.levelId === level.id);
          if (levelChapters.length === 0) return null;

          const isExpanded = !!expandedLevels[level.id] || !!searchQuery;
          const LevelIcon = LEVEL_ICONS[level.iconName] || Terminal;

          // Level completion count
          const levelLessons = levelChapters.flatMap(c => c.subchapters);
          const levelCompletedCount = levelLessons.filter(l =>
            completedIds.includes(l.lesson.id)
          ).length;
          const levelPercent =
            levelLessons.length > 0
              ? Math.round((levelCompletedCount / levelLessons.length) * 100)
              : 0;

          return (
            <div key={level.id} className="rounded-lg border border-slate-800/80 overflow-hidden bg-slate-950/40">
              {/* Level Accordion Header */}
              <button
                onClick={() => toggleLevel(level.id)}
                className="w-full px-3 py-2.5 flex items-center justify-between bg-slate-800/40 hover:bg-slate-800/70 transition border-b border-slate-800/60 text-left"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${level.color}20`, color: level.color }}
                  >
                    <LevelIcon size={13} />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      LEVEL {level.levelNumber} • {level.name}
                    </div>
                    <div className="text-[11px] text-slate-300 truncate font-medium">
                      {level.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    {levelPercent}%
                  </span>
                  {isExpanded ? (
                    <ChevronDown size={14} className="text-slate-400" />
                  ) : (
                    <ChevronRight size={14} className="text-slate-400" />
                  )}
                </div>
              </button>

              {/* Chapters under this Level */}
              {isExpanded && (
                <div className="p-1 space-y-1">
                  {levelChapters.map(ch => {
                    const isChapterExpanded =
                      expandedChapters[ch.number] ?? (ch.number === 1 || !!searchQuery);
                    const chCompleted = ch.subchapters.every(s => completedIds.includes(s.lesson.id));

                    return (
                      <div key={ch.number} className="rounded bg-slate-900/60 border border-slate-800/50">
                        {/* Chapter Accordion Item */}
                        <button
                          onClick={() => toggleChapter(ch.number)}
                          className={`w-full px-2.5 py-2 flex items-center justify-between text-left hover:bg-slate-800/50 rounded transition ${
                            isChapterExpanded ? 'bg-slate-800/30' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-[11px] font-mono text-cyan-400 font-bold shrink-0">
                              {String(ch.number).padStart(2, '0')}
                            </span>
                            <span className="text-xs font-semibold text-slate-200 truncate">
                              {ch.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            {chCompleted && (
                              <CheckCircle2 size={12} className="text-emerald-400" />
                            )}
                            <span className="text-[10px] text-slate-500">
                              {ch.subchapters.length}
                            </span>
                            {isChapterExpanded ? (
                              <ChevronDown size={12} className="text-slate-500" />
                            ) : (
                              <ChevronRight size={12} className="text-slate-500" />
                            )}
                          </div>
                        </button>

                        {/* Subchapters / Lessons under this Chapter */}
                        {isChapterExpanded && (
                          <div className="pl-3 pr-1 py-1 space-y-0.5 border-t border-slate-800/40">
                            {ch.subchapters.map(sub => {
                              const isActive = sub.lesson.id === activeLessonId;
                              const isCompleted = completedIds.includes(sub.lesson.id);

                              return (
                                <div
                                  key={sub.id}
                                  onClick={() => onSelectLesson(sub.lesson.id, ch.number)}
                                  className={`group flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition text-xs ${
                                    isActive
                                      ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30 font-medium'
                                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 truncate pr-2">
                                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                                      {sub.code}
                                    </span>
                                    <span className="truncate">{sub.title}</span>
                                  </div>

                                  <button
                                    onClick={e => handleToggleCompleted(e, sub.lesson.id)}
                                    title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                                    className="shrink-0 p-0.5 text-slate-600 hover:text-emerald-400 transition"
                                  >
                                    {isCompleted ? (
                                      <CheckCircle2 size={13} className="text-emerald-400" />
                                    ) : (
                                      <Circle size={13} className="group-hover:text-slate-400" />
                                    )}
                                  </button>
                                </div>
                              );
                            })}
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
    </aside>
  );
};
