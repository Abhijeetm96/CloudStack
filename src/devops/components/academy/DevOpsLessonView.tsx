import React, { useState } from 'react';
import {
  DevOpsLesson,
  DevOpsChapter,
  DevOpsLevel,
} from '../../types/devopsCurriculumTypes';
import { DevOpsProgressStore } from '../../progress/devopsProgress';
import {
  CheckCircle2,
  Circle,
  Clock,
  Award,
  Zap,
  Play,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  AlertTriangle,
  Lightbulb,
  Terminal,
  Layers,
  ChevronDown,
  ChevronUp,
  Cpu,
  Target,
  Activity,
} from 'lucide-react';
import { DevOpsInteractiveSimulator, SimulatorType } from '../simulators/DevOpsInteractiveSimulator';

interface LessonViewProps {
  lesson: DevOpsLesson;
  chapter: DevOpsChapter;
  level?: DevOpsLevel;
  prevLesson?: DevOpsLesson;
  nextLesson?: DevOpsLesson;
  onNavigateLesson: (lessonId: string, chapterNumber: number) => void;
  progressStore: DevOpsProgressStore;
  onProgressUpdate: () => void;
  onOpenCapstone?: (capstoneId: string) => void;
}

export const DevOpsLessonView: React.FC<LessonViewProps> = ({
  lesson,
  chapter,
  level,
  prevLesson,
  nextLesson,
  onNavigateLesson,
  progressStore,
  onProgressUpdate,
  onOpenCapstone,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [showChallengeSolution, setShowChallengeSolution] = useState(false);
  const [activeSimulator, setActiveSimulator] = useState<SimulatorType | null>(null);

  const isCompleted = progressStore.isLessonCompleted(lesson.id);

  const handleToggleComplete = () => {
    progressStore.toggleLessonCompleted(lesson.id);
    onProgressUpdate();
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const simulatorId = (lesson.simulatorId || chapter.simulatorId) as SimulatorType | undefined;

  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-950 text-slate-200 custom-scrollbar">
      {/* Top Banner Navigation */}
      <div className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-mono text-cyan-400 font-semibold">
            LEVEL {level?.levelNumber || chapter.levelNumber}
          </span>
          <span>/</span>
          <span>Chapter {chapter.number}: {chapter.title}</span>
          <span>/</span>
          <span className="text-white font-medium">{lesson.subchapterCode}</span>
        </div>

        <div className="flex items-center gap-3">
          {simulatorId && (
            <button
              onClick={() => setActiveSimulator(simulatorId)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold shadow-sm transition"
            >
              <Zap size={14} className="text-cyan-400" />
              Launch Lab Simulator
            </button>
          )}

          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
              isCompleted
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 size={14} className="text-emerald-400" /> Completed
              </>
            ) : (
              <>
                <Circle size={14} className="text-slate-400" /> Mark Complete
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Lesson Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {lesson.subchapterCode}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                lesson.difficulty === 'Beginner'
                  ? 'bg-blue-500/20 text-blue-300'
                  : lesson.difficulty === 'Intermediate'
                  ? 'bg-amber-500/20 text-amber-300'
                  : lesson.difficulty === 'Advanced'
                  ? 'bg-purple-500/20 text-purple-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}
            >
              {lesson.difficulty}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={13} /> {lesson.estimatedMinutes} mins
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {lesson.title}
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Chapter {chapter.number}: {chapter.title} • {chapter.levelName}
          </p>
        </div>

        {/* Embedded Simulator Modal/Card if triggered */}
        {activeSimulator && (
          <div className="relative">
            <DevOpsInteractiveSimulator
              simulatorType={activeSimulator}
              onClose={() => setActiveSimulator(null)}
            />
          </div>
        )}

        {/* Dimension 1 & 2: What is it & Simple Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-2">
              <Zap size={16} /> 1. What is it?
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{lesson.whatIsIt}</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-2">
              <Lightbulb size={16} /> 2. Simple Explanation
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{lesson.simpleExplanation}</p>
          </div>
        </div>

        {/* Dimension 3 & 4: Why Needed & Where Used */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
              <Target size={16} /> 3. Why is it Needed?
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{lesson.whyNeeded}</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-2">
              <Cpu size={16} /> 4. Where is it Used?
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{lesson.whereUsed}</p>
          </div>
        </div>

        {/* Dimension 5 & 6: When to Use & When NOT to Use */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-3">
              <CheckCircle2 size={16} /> 5. When Should You Use It?
            </div>
            <ul className="space-y-2">
              {lesson.whenToUse.map((item, idx) => (
                <li key={idx} className="text-xs text-emerald-100/90 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/20">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm mb-3">
              <AlertTriangle size={16} /> 6. When Should You NOT Use It?
            </div>
            <ul className="space-y-2">
              {lesson.whenNotToUse.map((item, idx) => (
                <li key={idx} className="text-xs text-rose-100/90 flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dimension 7: How it works */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-3">
            <Layers size={16} /> 7. How Does It Work?
          </div>
          <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
            {lesson.howItWorks}
          </div>
        </div>

        {/* Dimension 8: Terminology */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-sm font-bold text-white mb-4">
            8. Essential Terminology
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lesson.terminology.map((t, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-mono text-cyan-400 text-xs font-bold block mb-1">
                  {t.term}
                </span>
                <span className="text-xs text-slate-400 leading-relaxed">{t.definition}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dimension 9: Syntax / Configuration */}
        {lesson.syntaxOrConfig && (
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Terminal size={16} className="text-amber-400" />
                9. Configuration & Code Specification
                {lesson.syntaxOrConfig.filename && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {lesson.syntaxOrConfig.filename}
                  </span>
                )}
              </div>

              <button
                onClick={() => handleCopyCode(lesson.syntaxOrConfig!.code)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
              >
                {copiedCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                {copiedCode ? 'Copied' : 'Copy Code'}
              </button>
            </div>

            <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{lesson.syntaxOrConfig.code}</code>
            </pre>

            <p className="mt-2 text-xs text-slate-400 italic">
              {lesson.syntaxOrConfig.explanation}
            </p>
          </div>
        )}

        {/* Dimension 10: Variations */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-sm font-bold text-white mb-3">
            10. Architectural Variations
          </div>
          <div className="space-y-2.5">
            {lesson.variations.map((v, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-xs font-semibold text-slate-200 block mb-0.5">
                  {v.name}
                </span>
                <span className="text-xs text-slate-400">{v.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dimension 11: Real-World Examples */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-sm font-bold text-white mb-3">
            11. Real-World Production Implementations
          </div>
          <ul className="space-y-2">
            {lesson.realWorldExamples.map((ex, idx) => (
              <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span dangerouslySetInnerHTML={{ __html: ex.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Dimension 12: Architecture / Flow Diagram */}
        {lesson.architectureDiagram && (
          <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
            <div className="text-sm font-bold text-white mb-3">
              12. Pipeline Architecture & Flow Diagram
            </div>
            <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-400 overflow-x-auto leading-relaxed">
              <code>{lesson.architectureDiagram}</code>
            </pre>
          </div>
        )}

        {/* Dimension 13: Common Mistakes */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-3">
            <ShieldAlert size={16} /> 13. Common Mistakes & Engineering Remediation
          </div>
          <div className="space-y-3">
            {lesson.commonMistakes.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-slate-950 border border-rose-900/30">
                <div className="text-xs font-semibold text-rose-300 mb-1">
                  ❌ Pitfall: {m.mistake}
                </div>
                <div className="text-xs text-emerald-300">
                  ✓ Fix: {m.fix}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dimension 14 & 15: Security & Production Considerations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-3">
              <ShieldAlert size={16} /> 14. Security Considerations
            </div>
            <ul className="space-y-2">
              {lesson.securityConsiderations.map((sec, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>{sec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-3">
              <Activity size={16} /> 15. Production Considerations
            </div>
            <ul className="space-y-2">
              {lesson.productionConsiderations.map((prod, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400">•</span>
                  <span>{prod}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dimension 16: Cross-Academy & Related Concepts */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-sm font-bold text-white mb-3">
            16. Related Concepts & Cross-Academy Integration
          </div>
          <p className="text-xs text-slate-400 mb-4">
            DevOps bridges multiple engineering disciplines. Navigate to specialized Academies for full deep dives:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lesson.relatedConcepts.map((rel, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white">{rel.name}</span>
                    {rel.academy && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-mono uppercase bg-slate-800 text-cyan-300 border border-slate-700">
                        {rel.academy} academy
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{rel.relationship}</p>
                </div>

                {rel.route && (
                  <a
                    href={rel.route}
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition"
                  >
                    {rel.linkText || 'Learn more →'}
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dimension 17: Prerequisites */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-sm font-bold text-white mb-2">17. Prerequisites</div>
          <div className="flex flex-wrap gap-2">
            {lesson.prerequisites.map((p, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Dimension 18: Hands-On Scenario */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-2">
            <Zap size={16} /> 18. Hands-On Scenario: {lesson.handsOnScenario.title}
          </div>
          <p className="text-xs text-slate-300 mb-3">{lesson.handsOnScenario.scenario}</p>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 mb-3">
            <span className="text-xs font-semibold text-white block mb-1">Mission Goal:</span>
            <span className="text-xs text-slate-400">{lesson.handsOnScenario.goal}</span>
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-200">Execution Steps:</span>
            {lesson.handsOnScenario.steps.map((st, idx) => (
              <div key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                <span className="font-mono text-cyan-400 font-bold">{idx + 1}.</span>
                <span>{st}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dimension 19: Practical Challenge */}
        <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award size={16} /> 19. Practical Challenge
            </div>
            <button
              onClick={() => setShowChallengeSolution(prev => !prev)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition"
            >
              {showChallengeSolution ? (
                <>
                  <ChevronUp size={13} /> Hide Solution
                </>
              ) : (
                <>
                  <ChevronDown size={13} /> Reveal Solution
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-200 font-medium mb-2">{lesson.practicalChallenge.task}</p>
          <p className="text-xs text-slate-400 italic mb-3">Hint: {lesson.practicalChallenge.hint}</p>

          {showChallengeSolution && (
            <div className="mt-3 p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-xs font-semibold text-emerald-400 block mb-1.5">
                Reference Solution:
              </span>
              <pre className="font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">
                <code>{lesson.practicalChallenge.solution}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Dimension 20: Key Takeaways */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-3">
            <CheckCircle2 size={16} /> 20. Key Engineering Takeaways
          </div>
          <ul className="space-y-2">
            {lesson.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Capstone link if attached */}
        {chapter.capstoneId && onOpenCapstone && (
          <div className="p-6 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-purple-400">
                Integrated Capstone Project
              </span>
              <h4 className="text-base font-bold text-white mt-1">
                Apply this in Capstone: {chapter.capstoneId.toUpperCase()}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Build real-world multi-stage architectures with automated evaluations.
              </p>
            </div>
            <button
              onClick={() => onOpenCapstone(chapter.capstoneId!)}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg shadow-purple-950 transition"
            >
              Open Capstone →
            </button>
          </div>
        )}

        {/* Bottom Previous / Next Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800 pb-12">
          {prevLesson ? (
            <button
              onClick={() => onNavigateLesson(prevLesson.id, prevLesson.chapterNumber)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-medium transition"
            >
              <ArrowLeft size={14} />
              <div className="text-left">
                <div className="text-[10px] text-slate-500">PREVIOUS</div>
                <div className="font-semibold">{prevLesson.subchapterCode} {prevLesson.title}</div>
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <button
              onClick={() => onNavigateLesson(nextLesson.id, nextLesson.chapterNumber)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs text-white font-semibold shadow-lg shadow-cyan-950 transition"
            >
              <div className="text-right">
                <div className="text-[10px] text-cyan-200">NEXT</div>
                <div className="font-semibold">{nextLesson.subchapterCode} {nextLesson.title}</div>
              </div>
              <ArrowRight size={14} />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
