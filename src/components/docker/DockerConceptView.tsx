import React from 'react';
import { DockerSubchapterLesson } from '../../docker/types/dockerCurriculumTypes';
import {
  Box,
  Layers,
  Cpu,
  Shield,
  Server,
  ArrowRight,
  BookOpen,
  Terminal,
  Activity,
  CheckCircle2,
  HardDrive
} from 'lucide-react';

interface DockerConceptViewProps {
  lesson: DockerSubchapterLesson;
  onOpenSimulator?: () => void;
}

export const DockerConceptView: React.FC<DockerConceptViewProps> = ({ lesson, onOpenSimulator }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 font-sans space-y-5">
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Chapter {String(lesson.chapterNumber).padStart(2, '0')} · {lesson.subchapterNumber}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-400">
              {lesson.trackGroup}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/20 text-emerald-300">
              {lesson.difficulty}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white">{lesson.subchapterTitle}</h2>
          <p className="text-xs text-slate-400 mt-1">{lesson.definition}</p>
        </div>

        {onOpenSimulator && lesson.recommendedSimulator && (
          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer shadow-md shadow-blue-900/40 transition-all shrink-0"
          >
            <Activity className="w-3.5 h-3.5" /> Launch {lesson.recommendedSimulator} Simulator
          </button>
        )}
      </div>

      {/* Mental Model & Analogy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-lg">
          <div className="text-xs font-mono text-blue-400 font-bold mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> Real-World Analogy
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{lesson.analogy}</p>
        </div>

        <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-lg">
          <div className="text-xs font-mono text-emerald-400 font-bold mb-1.5 flex items-center gap-1.5">
            <Cpu className="w-4 h-4" /> Core Mental Model
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{lesson.mentalModel}</p>
        </div>
      </div>

      {/* Syntax & Command Spec */}
      <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
        <div className="text-xs font-mono text-slate-400 font-bold mb-2 flex items-center gap-1.5">
          <Terminal className="w-4 h-4 text-blue-400" /> Syntax Specification
        </div>
        <div className="bg-slate-900 p-2.5 rounded font-mono text-xs text-emerald-300 overflow-x-auto border border-slate-800">
          {lesson.syntax}
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          {lesson.syntaxBreakdown.map((token, i) => (
            <div key={i} className="flex items-start gap-2 p-1.5 bg-slate-900/60 rounded border border-slate-800/80">
              <span className="text-blue-400 font-bold shrink-0">{token.token}</span>
              <span className="text-slate-400 text-[11px]">{token.purpose}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Terminology Checklist */}
      <div>
        <div className="text-xs font-mono text-slate-400 font-bold mb-2">CRITICAL TERMINOLOGY</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
          {lesson.terminology.map((t, idx) => (
            <div key={idx} className="p-2.5 bg-slate-950 rounded border border-slate-800">
              <div className="text-white font-bold mb-1 text-[11px]">{t.term}</div>
              <div className="text-slate-400 text-[10px] leading-relaxed">{t.explanation}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
