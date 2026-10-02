import React, { useState } from 'react';
import { ALL_DOCKER_CHAPTERS } from '../data';
import { DockerSubchapterLesson, DockerChapter } from '../types/dockerCurriculumTypes';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Search,
  BookOpen,
  Filter,
  Layers,
  Sparkles,
  Award
} from 'lucide-react';

interface DockerSidebarProps {
  activeLessonId: string;
  onSelectLesson: (lesson: DockerSubchapterLesson) => void;
  completedLessonIds: string[];
  onOpenSearch: () => void;
}

export const DockerSidebar: React.FC<DockerSidebarProps> = ({
  activeLessonId,
  onSelectLesson,
  completedLessonIds,
  onOpenSearch,
}) => {
  const [filterText, setFilterText] = useState('');
  const [expandedChapterNums, setExpandedChapterNums] = useState<number[]>([1]); // Chapter 1 open by default
  const [selectedTrack, setSelectedTrack] = useState<string>('all');

  const tracks = [
    { id: 'all', label: 'All 68 Chapters' },
    { id: 'Foundation', label: 'Foundation' },
    { id: 'Images & Builds', label: 'Images & Builds' },
    { id: 'Storage & Network', label: 'Storage & Network' },
    { id: 'Runtime & Diagnostics', label: 'Runtime & SRE' },
    { id: 'Compose & Architecture', label: 'Compose' },
    { id: 'Security & Enterprise', label: 'Security' },
    { id: 'Production & Masterclass', label: 'Production' },
  ];

  const toggleChapter = (num: number) => {
    setExpandedChapterNums((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const expandAll = () => {
    setExpandedChapterNums(ALL_DOCKER_CHAPTERS.map((c) => c.number));
  };

  const collapseAll = () => {
    setExpandedChapterNums([]);
  };

  // Filter logic
  const filteredChapters = ALL_DOCKER_CHAPTERS.filter((ch) => {
    if (selectedTrack !== 'all' && !ch.trackGroup.toLowerCase().includes(selectedTrack.toLowerCase())) {
      return false;
    }
    if (!filterText.trim()) return true;
    const q = filterText.toLowerCase();
    const titleMatch = ch.title.toLowerCase().includes(q);
    const subMatch = ch.lessons.some((l) => l.subchapterTitle.toLowerCase().includes(q));
    return titleMatch || subMatch;
  });

  const totalLessons = 1038;
  const completedCount = completedLessonIds.length;
  const progressPct = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="w-80 h-full bg-slate-950 border-r border-slate-800 flex flex-col font-sans text-slate-200 select-none shrink-0">
      {/* Academy Title & Universal Search Bar */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-900/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-900/40">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                Docker Academy
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                  68 Ch
                </span>
              </h2>
              <div className="text-[11px] text-slate-400 font-mono">
                {completedCount} / {totalLessons} lessons ({progressPct}%)
              </div>
            </div>
          </div>

          <button
            onClick={onOpenSearch}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all cursor-pointer"
            title="Search curriculum (Cmd+K)"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Quick Filter Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter chapters or subchapters..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        {/* Expand / Collapse Controls */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
          <button onClick={expandAll} className="hover:text-blue-400 cursor-pointer">
            Expand All
          </button>
          <span>·</span>
          <button onClick={collapseAll} className="hover:text-blue-400 cursor-pointer">
            Collapse All
          </button>
        </div>
      </div>

      {/* Chapters & Subchapters Tree */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filteredChapters.map((chapter) => {
          const isExpanded = expandedChapterNums.includes(chapter.number) || Boolean(filterText.trim());
          const chapterCompletedCount = chapter.lessons.filter((l) =>
            completedLessonIds.includes(l.id)
          ).length;
          const isChapterFinished =
            chapterCompletedCount === chapter.lessons.length && chapter.lessons.length > 0;

          return (
            <div key={chapter.id} className="rounded-lg overflow-hidden">
              {/* Chapter Header Item */}
              <button
                onClick={() => toggleChapter(chapter.number)}
                className={`w-full p-2 rounded-md flex items-center justify-between text-left transition-all cursor-pointer ${
                  isExpanded ? 'bg-slate-900/90 text-white' : 'hover:bg-slate-900/50 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  )}
                  <span className="font-mono text-xs font-bold text-blue-400 shrink-0">
                    {String(chapter.number).padStart(2, '0')}.
                  </span>
                  <span className="text-xs font-semibold truncate">{chapter.title}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pl-1 font-mono text-[10px]">
                  {isChapterFinished ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="text-slate-500">
                      {chapterCompletedCount}/{chapter.lessons.length}
                    </span>
                  )}
                </div>
              </button>

              {/* Subchapters List */}
              {isExpanded && (
                <div className="pl-6 pr-1 py-1 space-y-0.5 border-l border-slate-800/80 ml-3.5 my-0.5">
                  {chapter.lessons.map((lesson) => {
                    const isSelected = lesson.id === activeLessonId;
                    const isLessonDone = completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`w-full p-1.5 rounded-md flex items-center justify-between text-left text-xs transition-all cursor-pointer font-mono ${
                          isSelected
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 font-semibold'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[10px] text-slate-500 shrink-0">
                            {lesson.subchapterNumber}.
                          </span>
                          <span className="truncate">{lesson.subchapterTitle}</span>
                        </div>

                        {isLessonDone && (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 ml-1" />
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
  );
};
