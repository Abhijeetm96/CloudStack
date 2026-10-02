import React, { useState } from 'react';
import { DockerSubchapterLesson } from '../../docker/types/dockerCurriculumTypes';
import {
  BookOpen,
  Terminal,
  Cpu,
  Shield,
  Activity,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  Flame,
  Award,
  Layers,
  ArrowRight,
  HardDrive
} from 'lucide-react';

interface DockerLessonViewProps {
  lesson: DockerSubchapterLesson;
  isCompleted?: boolean;
  onToggleComplete?: (lessonId: string) => void;
  onOpenSimulator?: (simType: string) => void;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

export const DockerLessonView: React.FC<DockerLessonViewProps> = ({
  lesson,
  isCompleted = false,
  onToggleComplete,
  onOpenSimulator,
  onNextLesson,
  onPrevLesson,
}) => {
  const [activeTab, setActiveTab] = useState<'foundations' | 'syntax' | 'internals' | 'operations' | 'practice'>('foundations');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Challenge reveal
  const [revealSolution, setRevealSolution] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 1500);
  };

  const handleQuizSelect = (idx: number) => {
    setSelectedQuizOption(idx);
    setQuizSubmitted(true);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Top Sticky Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Chapter {String(lesson.chapterNumber).padStart(2, '0')} · Subchapter {lesson.subchapterNumber}
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-400">
              {lesson.trackGroup}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                lesson.difficulty === 'Beginner'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : lesson.difficulty === 'Intermediate'
                  ? 'bg-blue-500/20 text-blue-300'
                  : lesson.difficulty === 'Advanced'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}
            >
              {lesson.difficulty}
            </span>
          </div>

          <h1 className="text-xl font-bold text-white tracking-tight">{lesson.subchapterTitle}</h1>
          <p className="text-xs text-slate-400 mt-0.5 font-mono">{lesson.definition}</p>
        </div>

        <div className="flex items-center gap-2">
          {onToggleComplete && (
            <button
              onClick={() => onToggleComplete(lesson.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isCompleted ? 'Completed' : 'Mark Complete'}
            </button>
          )}

          {lesson.recommendedSimulator && onOpenSimulator && (
            <button
              onClick={() => onOpenSimulator(lesson.recommendedSimulator!)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-md shadow-blue-900/30 transition-all"
            >
              <Activity className="w-3.5 h-3.5" /> Open Simulator
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation (5 Progressive Disclosure Tabs) */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-4 flex items-center gap-1 overflow-x-auto shrink-0 font-mono text-xs">
        <button
          onClick={() => setActiveTab('foundations')}
          className={`py-2.5 px-3.5 border-b-2 font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'foundations'
              ? 'border-blue-500 text-blue-400 bg-blue-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> 1. Foundations
        </button>

        <button
          onClick={() => setActiveTab('syntax')}
          className={`py-2.5 px-3.5 border-b-2 font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'syntax'
              ? 'border-blue-500 text-blue-400 bg-blue-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" /> 2. Syntax & CLI
        </button>

        <button
          onClick={() => setActiveTab('internals')}
          className={`py-2.5 px-3.5 border-b-2 font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'internals'
              ? 'border-blue-500 text-blue-400 bg-blue-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" /> 3. Internals & Storage
        </button>

        <button
          onClick={() => setActiveTab('operations')}
          className={`py-2.5 px-3.5 border-b-2 font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'operations'
              ? 'border-blue-500 text-blue-400 bg-blue-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-3.5 h-3.5" /> 4. SRE & Troubleshooting
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`py-2.5 px-3.5 border-b-2 font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'practice'
              ? 'border-blue-500 text-blue-400 bg-blue-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" /> 5. Hands-on & Quiz
        </button>
      </div>

      {/* Main Tab Content View */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-5xl mx-auto w-full">
        {/* TAB 1: FOUNDATIONS */}
        {activeTab === 'foundations' && (
          <div className="space-y-6">
            {/* Beginner & Technical Explanations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl">
                <div className="text-xs font-mono text-emerald-400 font-bold mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Beginner Explanation
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{lesson.beginnerExplanation}</p>
              </div>

              <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl">
                <div className="text-xs font-mono text-blue-400 font-bold mb-2 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> Technical Explanation
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{lesson.technicalExplanation}</p>
              </div>
            </div>

            {/* Why It Exists & Problem Solved */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                <div className="text-xs font-mono text-amber-400 font-bold mb-1.5">Why It Exists</div>
                <p className="text-xs text-slate-300 leading-relaxed">{lesson.whyItExists}</p>
              </div>

              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                <div className="text-xs font-mono text-cyan-400 font-bold mb-1.5">Problem Solved</div>
                <p className="text-xs text-slate-300 leading-relaxed">{lesson.problemSolved}</p>
              </div>
            </div>

            {/* Analogy & Mental Model */}
            <div className="p-4 bg-blue-950/20 border border-blue-500/30 rounded-xl space-y-3">
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold block mb-1">REAL-WORLD ANALOGY</span>
                <p className="text-xs text-slate-200 leading-relaxed">{lesson.analogy}</p>
              </div>
              <div className="pt-3 border-t border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">MENTAL MODEL</span>
                <p className="text-xs text-slate-200 leading-relaxed">{lesson.mentalModel}</p>
              </div>
            </div>

            {/* Terminology Checklist */}
            <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl">
              <div className="text-xs font-mono text-slate-400 font-bold mb-3">CRITICAL TERMINOLOGY SPECIFICATION</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {lesson.terminology.map((t, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                    <div className="text-white font-bold text-xs mb-1 font-mono">{t.term}</div>
                    <div className="text-slate-400 text-[11px] leading-relaxed">{t.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SYNTAX & CLI */}
        {activeTab === 'syntax' && (
          <div className="space-y-6">
            {/* Syntax block */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 font-bold">SYNTAX SPECIFICATION</span>
                <button
                  onClick={() => handleCopy(lesson.syntax, 'syntax')}
                  className="flex items-center gap-1 text-[11px] font-mono text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  {copiedSnippet === 'syntax' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSnippet === 'syntax' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto">
                {lesson.syntax}
              </pre>

              {/* Tokens breakdown */}
              <div className="mt-4">
                <span className="text-xs font-mono text-slate-400 font-bold block mb-2">SYNTAX TOKENS EXPLAINED</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                  {lesson.syntaxBreakdown.map((t, idx) => (
                    <div key={idx} className="p-2 bg-slate-950 rounded border border-slate-800 flex items-start gap-2">
                      <span className="text-blue-400 font-bold shrink-0">{t.token}</span>
                      <span className="text-slate-400 text-[11px]">{t.purpose}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Variations */}
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-slate-400 font-bold block mb-2">SYNTAX VARIATIONS & FLAGS</span>
              <ul className="space-y-1.5 text-xs font-mono text-slate-300">
                {lesson.variations.map((v, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <ChevronRight className="w-3 h-3 text-blue-400 shrink-0" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4 Tiered Examples: Simplest, Practical, Real-World, Production */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-slate-400 font-bold">PRACTICAL PROGRESSIVE EXAMPLES</div>

              {/* 1. Simplest */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-cyan-400 font-bold">1. Simplest Minimal Example</span>
                  <button
                    onClick={() => handleCopy(lesson.simplestExample, 'simp')}
                    className="text-[11px] font-mono text-slate-400 hover:text-white"
                  >
                    Copy
                  </button>
                </div>
                <pre className="p-2.5 bg-slate-950 rounded border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                  {lesson.simplestExample}
                </pre>
              </div>

              {/* 2. Practical */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-blue-400 font-bold">2. Practical Day-to-Day Example</span>
                  <button
                    onClick={() => handleCopy(lesson.practicalExample, 'prac')}
                    className="text-[11px] font-mono text-slate-400 hover:text-white"
                  >
                    Copy
                  </button>
                </div>
                <pre className="p-2.5 bg-slate-950 rounded border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                  {lesson.practicalExample}
                </pre>
              </div>

              {/* 3. Real World */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-amber-400 font-bold">3. Real-World Application Scenario</span>
                  <button
                    onClick={() => handleCopy(lesson.realWorldExample, 'real')}
                    className="text-[11px] font-mono text-slate-400 hover:text-white"
                  >
                    Copy
                  </button>
                </div>
                <pre className="p-2.5 bg-slate-950 rounded border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                  {lesson.realWorldExample}
                </pre>
              </div>

              {/* 4. Production */}
              <div className="p-4 bg-slate-900/80 rounded-xl border border-emerald-500/40">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" /> 4. Production Hardened Spec
                  </span>
                  <button
                    onClick={() => handleCopy(lesson.productionExample, 'prod')}
                    className="text-[11px] font-mono text-slate-400 hover:text-white"
                  >
                    Copy
                  </button>
                </div>
                <pre className="p-2.5 bg-slate-950 rounded border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                  {lesson.productionExample}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INTERNALS & STORAGE */}
        {activeTab === 'internals' && (
          <div className="space-y-6">
            {/* What actually happens */}
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-mono text-blue-400 font-bold">WHAT DOCKER ACTUALLY DOES</div>
              <p className="text-xs text-slate-300 leading-relaxed">{lesson.whatActuallyHappens}</p>
            </div>

            {/* Changes on Disk vs Docker State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-xs font-mono text-emerald-400 font-bold mb-1.5 flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4" /> Changes on Disk
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{lesson.whatChangesOnDisk}</p>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-xs font-mono text-purple-400 font-bold mb-1.5 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" /> Changes in Docker Daemon
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{lesson.whatChangesInDocker}</p>
              </div>
            </div>

            {/* Internal Mechanics */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <div className="text-xs font-mono text-amber-400 font-bold mb-1.5">
                INTERNAL MECHANICS (NAMESPACES / CGROUPS / STORAGE DRIVER)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{lesson.internalMechanics}</p>
            </div>

            {/* Expected Output & Line-by-Line Breakdown */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <div className="text-xs font-mono text-slate-400 font-bold mb-2">EXPECTED TERMINAL OUTPUT</div>
              <pre className="p-3 bg-slate-950 rounded border border-slate-800 font-mono text-xs text-emerald-300 mb-3 overflow-x-auto">
                {lesson.expectedOutput}
              </pre>

              <div className="space-y-1.5 font-mono text-xs">
                {lesson.outputExplanation.map((lineExp, idx) => (
                  <div key={idx} className="p-2 bg-slate-950/60 rounded border border-slate-800/80 flex items-start gap-2">
                    <span className="text-blue-400 shrink-0 font-bold">{lineExp.line}</span>
                    <span className="text-slate-400 text-[11px]">{lineExp.meaning}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safe vs Dangerous Usage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl">
                <div className="text-xs font-mono text-emerald-400 font-bold mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Safe Recommended Usage
                </div>
                <div className="font-mono text-xs text-slate-200">{lesson.safeExample}</div>
              </div>

              <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-xl">
                <div className="text-xs font-mono text-rose-400 font-bold mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Dangerous Usage / Anti-Pattern
                </div>
                <div className="font-mono text-xs text-slate-200">{lesson.dangerousExample}</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SRE & TROUBLESHOOTING */}
        {activeTab === 'operations' && (
          <div className="space-y-6">
            {/* When to use vs When not to use */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-2">WHEN TO USE</span>
                <ul className="space-y-1 text-xs text-slate-300 font-mono">
                  {lesson.whenToUse.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-rose-400 font-bold block mb-2">WHEN NOT TO USE</span>
                <ul className="space-y-1 text-xs text-slate-300 font-mono">
                  {lesson.whenNotToUse.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Common Mistakes & Misconceptions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-amber-400 font-bold block mb-2">COMMON MISTAKES</span>
                <ul className="space-y-1 text-xs text-slate-300 font-mono">
                  {lesson.commonMistakes.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-purple-400 font-bold block mb-2">COMMON MISCONCEPTIONS</span>
                <ul className="space-y-1 text-xs text-slate-300 font-mono">
                  {lesson.commonMisconceptions.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-purple-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Security & Performance Considerations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-2">SECURITY CONSIDERATIONS</span>
                <ul className="space-y-1 text-xs text-slate-300 font-mono">
                  {lesson.securityConsiderations.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-2">PERFORMANCE CONSIDERATIONS</span>
                <ul className="space-y-1 text-xs text-slate-300 font-mono">
                  {lesson.performanceConsiderations.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Activity className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SRE Troubleshooting Matrix */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <div className="text-xs font-mono text-rose-400 font-bold mb-3 flex items-center gap-1.5">
                <Flame className="w-4 h-4" /> SRE TROUBLESHOOTING & INCIDENT RESPONSE
              </div>
              <div className="space-y-3 font-mono text-xs">
                {lesson.troubleshooting.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <div className="text-white font-bold mb-1">Issue: {item.problem}</div>
                    <div className="text-amber-300 text-[11px] mb-1">Symptom: {item.symptom}</div>
                    <div className="text-slate-400 text-[11px] mb-1">Root Cause: {item.cause}</div>
                    <div className="text-emerald-400 text-[11px]">Fix: {item.fix}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: HANDS-ON & QUIZ */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {/* Guided exercise */}
            <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-400 font-bold flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> GUIDED EXERCISE: {lesson.guidedExercise.title}
                </span>
                <span className="text-[11px] font-mono text-slate-400">Step-by-Step Lab</span>
              </div>
              <p className="text-xs text-slate-300">{lesson.guidedExercise.objective}</p>

              <div className="space-y-2 mt-3">
                {lesson.guidedExercise.steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 font-bold shrink-0 text-[11px]">
                      {i + 1}
                    </span>
                    <span className="mt-0.5">{st}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">Initial Snippet / Command:</span>
                <pre className="p-2.5 bg-slate-950 rounded font-mono text-xs text-emerald-300 overflow-x-auto">
                  {lesson.guidedExercise.initialSnippet}
                </pre>
              </div>
            </div>

            {/* Independent Challenge */}
            <div className="p-5 bg-purple-950/20 border border-purple-500/30 rounded-xl space-y-3 font-mono">
              <div className="text-xs text-purple-400 font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4" /> INDEPENDENT CHALLENGE
              </div>
              <div className="text-xs text-white font-semibold">{lesson.challenge.scenario}</div>
              <p className="text-xs text-slate-300">{lesson.challenge.goal}</p>

              <div className="text-[11px] text-slate-400">
                Verification test: <span className="text-emerald-400">{lesson.challenge.testVerification}</span>
              </div>

              <div className="pt-2">
                {!revealSolution ? (
                  <button
                    onClick={() => setRevealSolution(true)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-purple-300 rounded text-xs cursor-pointer"
                  >
                    Reveal Solution Hint
                  </button>
                ) : (
                  <div className="p-3 bg-slate-950 rounded border border-purple-500/40 text-xs text-purple-200">
                    <span className="font-bold block mb-1">Solution Hint:</span>
                    {lesson.challenge.hint}
                  </div>
                )}
              </div>
            </div>

            {/* Knowledge Check Quiz */}
            <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> KNOWLEDGE CHECK QUIZ
                </span>
                <span className="text-[11px] font-mono text-slate-400">1 Question Assessment</span>
              </div>

              <div className="text-sm font-semibold text-white">{lesson.knowledgeCheck.question}</div>

              <div className="space-y-2">
                {lesson.knowledgeCheck.options.map((opt, idx) => {
                  const isSelected = selectedQuizOption === idx;
                  const isCorrect = idx === lesson.knowledgeCheck.correctIndex;

                  let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';
                  if (quizSubmitted) {
                    if (isCorrect) {
                      style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                    } else if (isSelected) {
                      style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    style = 'bg-blue-950/60 border-blue-500 text-white';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizSelect(idx)}
                      className={`w-full p-3 rounded-lg border text-left text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {quizSubmitted && isSelected && !isCorrect && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                  <span className="font-bold text-blue-400 block mb-1">Explanation:</span>
                  {lesson.knowledgeCheck.explanation}
                </div>
              )}
            </div>

            {/* Lesson Summary */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-slate-400 font-bold block mb-1">LESSON SUMMARY</span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{lesson.summary}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Controls */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between shrink-0 font-mono text-xs">
        <button
          onClick={onPrevLesson}
          disabled={!onPrevLesson}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 rounded cursor-pointer disabled:cursor-not-allowed"
        >
          ← Previous Lesson
        </button>

        <span className="text-slate-500 text-[11px]">
          {lesson.chapterTitle}
        </span>

        <button
          onClick={onNextLesson}
          disabled={!onNextLesson}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white rounded font-semibold cursor-pointer disabled:cursor-not-allowed"
        >
          Next Lesson →
        </button>
      </div>
    </div>
  );
};
