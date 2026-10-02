import React, { useState, useEffect, useRef } from 'react';
import { searchDockerLessons, ALL_DOCKER_LESSONS } from '../../data';
import { DockerSubchapterLesson } from '../../types/dockerCurriculumTypes';
import { Search, X, Terminal, BookOpen, ChevronRight, Layers } from 'lucide-react';

interface DockerSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lesson: DockerSubchapterLesson) => void;
}

export const DockerSearchModal: React.FC<DockerSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DockerSubchapterLesson[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(ALL_DOCKER_LESSONS.slice(0, 8)); // quick suggestions
      return;
    }
    const res = searchDockerLessons(query);
    setResults(res.slice(0, 30));
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center pt-16 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across all 68 chapters, subchapters, CLI flags, Dockerfile instructions..."
            className="flex-1 bg-transparent text-white outline-none font-mono text-sm placeholder:text-slate-500"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1 bg-slate-900/90">
          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs">
              No lessons found matching "{query}". Try "docker run", "multi-stage", "volumes", or "healthcheck".
            </div>
          ) : (
            results.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson);
                  onClose();
                }}
                className="w-full p-3 rounded-lg hover:bg-slate-800/80 transition-all text-left flex items-start justify-between cursor-pointer border border-transparent hover:border-slate-700"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
                      Ch {String(lesson.chapterNumber).padStart(2, '0')}.{lesson.subchapterNumber}
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {lesson.subchapterTitle}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {lesson.chapterTitle}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-1">
                    {lesson.definition}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 text-[11px] font-mono text-slate-400">
                    <span className="text-blue-300">{lesson.syntax.split('\n')[0].slice(0, 45)}</span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-500 mt-2 shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>{results.length} lessons shown</span>
          <div className="flex items-center gap-3">
            <span>ESC to close</span>
            <span>⌘K to trigger</span>
          </div>
        </div>
      </div>
    </div>
  );
};
