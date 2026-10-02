import React, { useState } from 'react';
import {
  BookOpen, Code, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft,
  Copy, Check, Play, RefreshCw, Terminal, Layers, Info, DollarSign, Lightbulb, Award
} from 'lucide-react';
import { UniversalTerraformLesson } from '../types/terraformTypes';
import { TERRAFORM_CAPSTONES } from '../../platform/capstones/data/terraformCapstones';
import { StandardCapstoneRunnerModal } from '../../platform/capstones/StandardCapstoneRunnerModal';
import { CapstoneProject } from '../../platform/capstones/types';
import { markLessonCompleted, markExerciseCompleted, recordQuizScore } from '../progress/terraformProgress';
import { TerraformSimulator } from './simulators/TerraformSimulator';
import { TerraformFailureArena } from './simulators/TerraformFailureArena';
import { TerraformPlanVisualizer } from './simulators/TerraformPlanVisualizer';
import { TerraformStateVisualizer } from './simulators/TerraformStateVisualizer';
import { TerraformGraphVisualizer } from './simulators/TerraformGraphVisualizer';
import { TerraformTerminal } from './simulators/TerraformTerminal';

interface TerraformLessonViewProps {
  lesson: UniversalTerraformLesson;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
}

export const TerraformLessonView: React.FC<TerraformLessonViewProps> = ({
  lesson,
  isCompleted,
  onToggleComplete,
  onNavigatePrev,
  onNavigateNext
}) => {
  const [activeTab, setActiveTab] = useState<'teaching' | 'syntax' | 'considerations' | 'mistakes' | 'practice'>('teaching');
  const [activeCapstone, setActiveCapstone] = useState<CapstoneProject | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [exerciseCode, setExerciseCode] = useState(lesson.guidedHandsOnExercise.initialCode);
  const [showExerciseSolution, setShowExerciseSolution] = useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSelectQuizOption = (qIdx: number, oIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitQuiz = () => {
    setShowQuizResults(true);
    let correct = 0;
    lesson.knowledgeCheck.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) correct++;
    });
    const score = Math.round((correct / lesson.knowledgeCheck.length) * 100);
    recordQuizScore(lesson.id, score);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
        background: '#090d16',
        color: '#e2e8f0',
        fontFamily: 'Inter, system-ui, sans-serif',
        padding: '1.5rem 2rem',
        gap: '1.5rem'
      }}
    >
      {/* Lesson Header Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '1.25rem'
        }}
      >
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                background: 'rgba(132, 79, 186, 0.25)',
                color: '#d8b4fe',
                border: '1px solid rgba(132, 79, 186, 0.4)'
              }}
            >
              Chapter {String(lesson.chapterNumber).padStart(2, '0')}: {lesson.chapterTitle}
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#94a3b8'
              }}
            >
              {lesson.difficulty}
            </span>
          </div>

          <h1
            style={{
              margin: '0.35rem 0',
              fontSize: '1.65rem',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#f8fafc'
            }}
          >
            {lesson.subchapterNumber}. {lesson.title}
          </h1>

          <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5 }}>
            {lesson.beginnerDefinition}
          </p>
        </div>

        {/* Action Controls & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={onToggleComplete}
            style={{
              background: isCompleted ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${isCompleted ? '#10b981' : 'rgba(255, 255, 255, 0.15)'}`,
              color: '#fff',
              padding: '0.5rem 0.9rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem'
            }}
          >
            <CheckCircle2 size={16} color={isCompleted ? '#fff' : '#94a3b8'} />
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </button>

          {onNavigatePrev && (
            <button
              onClick={onNavigatePrev}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#cbd5e1',
                padding: '0.5rem 0.65rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              title="Previous lesson"
            >
              <ChevronLeft size={16} />
            </button>
          )}

          {onNavigateNext && (
            <button
              onClick={onNavigateNext}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#cbd5e1',
                padding: '0.5rem 0.65rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              title="Next lesson"
            >
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Chapter 50: Dedicated Real-World Capstone Projects Section */}
      {(lesson.chapterNumber === 50 || lesson.id.startsWith('ch50')) && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(132, 79, 186, 0.18) 0%, rgba(99, 102, 241, 0.14) 100%)',
            border: '1.5px solid rgba(192, 132, 252, 0.4)',
            borderRadius: '14px',
            padding: '1.35rem 1.6rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.15rem',
            boxShadow: '0 10px 30px rgba(132, 79, 186, 0.15)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)',
                }}
              >
                <Award size={22} color="#fff" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#f8fafc' }}>
                    Terraform Academy Capstone Projects (Chapter 50)
                  </h3>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#fbbf24', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                    5 REAL-WORLD LABS
                  </span>
                </div>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  The culmination of the 50-chapter curriculum: Build cloud infrastructure from scratch, modularize architectures, deploy multi-environment state, triage catastrophic state drift, and automate GitOps CI/CD.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
            {TERRAFORM_CAPSTONES.map((cap) => (
              <div
                key={cap.id}
                onClick={() => setActiveCapstone(cap)}
                style={{
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.6)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#c084fc', fontFamily: 'monospace' }}>
                      {cap.code}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(132, 79, 186, 0.25)', color: '#d8b4fe' }}>
                      {cap.difficulty}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.3rem' }}>
                    {cap.title}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94a3b8', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {cap.overview}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.6rem' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    {cap.tasks.length} Tasks · {cap.estimatedTime}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCapstone(cap);
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #844fba, #6366f1)',
                      border: 'none',
                      color: '#fff',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.76rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <span>Launch</span>
                    <Play size={12} fill="#fff" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progressive Disclosure Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '0.5rem',
          overflowX: 'auto'
        }}
      >
        {[
          { id: 'teaching', label: '1. Core Foundations', icon: BookOpen },
          { id: 'syntax', label: '2. HCL Syntax & Architecture', icon: Code },
          { id: 'considerations', label: '3. Production Considerations', icon: ShieldCheck },
          { id: 'mistakes', label: '4. Traps & Troubleshooting', icon: AlertTriangle },
          { id: 'practice', label: '5. Interactive Lab & Simulator', icon: Terminal }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: activeTab === tab.id ? 'rgba(132, 79, 186, 0.25)' : 'transparent',
              border: activeTab === tab.id ? '1px solid #844fba' : '1px solid transparent',
              color: activeTab === tab.id ? '#e9d5ff' : '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              whiteSpace: 'nowrap'
            }}
          >
            <tab.icon size={14} color={activeTab === tab.id ? '#c084fc' : '#64748b'} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Core Teaching */}
      {activeTab === 'teaching' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Section 1-3: What is it & Simple Explanation */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 0.5rem 0' }}>
              1. {lesson.title.toLowerCase().startsWith('what') ? lesson.title : `What is ${lesson.title}?`}
            </h2>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#cbd5e1', margin: 0 }}>
              {lesson.whatIsIt}
            </p>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#94a3b8', marginTop: '0.5rem' }}>
              {lesson.simpleExplanation}
            </p>
          </div>

          {/* Section 4-6: Why it exists & Problems solved */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <Lightbulb size={16} color="#fbbf24" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>Why Does It Exist?</span>
              </div>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.55, color: '#cbd5e1', margin: 0 }}>
                {lesson.whyExists}
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <ShieldCheck size={16} color="#34d399" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>What Problem Does It Solve?</span>
              </div>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.55, color: '#cbd5e1', margin: 0 }}>
                {lesson.problemSolved}
              </p>
            </div>
          </div>

          {/* Section 7-8: Real-World Analogy & Mental Model */}
          <div style={{ background: 'rgba(132, 79, 186, 0.1)', border: '1px solid rgba(132, 79, 186, 0.3)', padding: '1.25rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.45rem' }}>
              <Info size={16} color="#c084fc" />
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e9d5ff' }}>
                Real-World Analogy: {lesson.mentalModel.metaphor}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#e2e8f0', margin: '0 0 0.75rem 0' }}>
              {lesson.realWorldAnalogy}
            </p>
            <div
              style={{
                background: '#030712',
                padding: '0.65rem 0.85rem',
                borderRadius: '6px',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.78rem',
                color: '#38bdf8'
              }}
            >
              {lesson.mentalModel.diagramText}
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#cbd5e1', fontStyle: 'italic' }}>
              Key Insight: {lesson.mentalModel.keyInsight}
            </div>
          </div>

          {/* Section 9-11: Technical Definition & Terminology */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 0.5rem 0' }}>
              Technical Specification &amp; Terminology
            </h3>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#cbd5e1', margin: '0 0 0.75rem 0' }}>
              {lesson.technicalDefinition}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.6rem' }}>
              {lesson.terminology.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>{t.term}</span>
                    {t.role && (
                      <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>{t.role}</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>{t.explanation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HCL Syntax & Architecture */}
      {activeTab === 'syntax' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Canonical Syntax & Breakdown */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                Canonical HCL Declaration Syntax
              </span>
              <button
                onClick={() => copyToClipboard(lesson.syntax, 'canon')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem'
                }}
              >
                {copiedCode === 'canon' ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
                {copiedCode === 'canon' ? 'Copied' : 'Copy'}
              </button>
            </div>

            <pre
              style={{
                background: '#030712',
                padding: '1rem',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.8rem',
                lineHeight: 1.5,
                color: '#d8b4fe',
                overflowX: 'auto',
                margin: 0
              }}
            >
              {lesson.syntax}
            </pre>

            {/* Token Breakdown Table */}
            <div style={{ marginTop: '0.85rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Syntax Token Breakdown
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.4rem' }}>
                {lesson.syntaxBreakdown.map((tk, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '0.35rem 0.6rem',
                      borderRadius: '4px'
                    }}
                  >
                    <code style={{ color: '#38bdf8', fontWeight: 700, minWidth: '100px' }}>{tk.token}</code>
                    <span style={{ color: '#64748b', minWidth: '100px', fontSize: '0.7rem' }}>[{tk.role}]</span>
                    <span style={{ color: '#cbd5e1' }}>{tk.explanation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Syntax Variations */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
            {lesson.syntaxVariations.map((v, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>{v.title}</span>
                  <span style={{ fontSize: '0.65rem', color: '#c084fc' }}>{v.whenToUse}</span>
                </div>
                <pre
                  style={{
                    background: '#030712',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '0.75rem',
                    color: '#bae6fd',
                    margin: 0,
                    overflowX: 'auto'
                  }}
                >
                  {v.code}
                </pre>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{v.explanation}</div>
              </div>
            ))}
          </div>

          {/* Real-World & Production Examples */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <div>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                  Production Architecture Blueprint
                </span>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: '#34d399' }}>
                  {lesson.productionExample.architectureContext}
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(lesson.productionExample.code, 'prod')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem'
                }}
              >
                {copiedCode === 'prod' ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
                {copiedCode === 'prod' ? 'Copied' : 'Copy'}
              </button>
            </div>

            <pre
              style={{
                background: '#030712',
                padding: '1rem',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.78rem',
                lineHeight: 1.5,
                color: '#a7f3d0',
                overflowX: 'auto',
                margin: 0
              }}
            >
              {lesson.productionExample.code}
            </pre>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem', margin: '0.5rem 0 0 0' }}>
              {lesson.productionExample.explanation}
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: Production Considerations */}
      {activeTab === 'considerations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* When to use vs when NOT to use */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>✓ When to Use</span>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                {lesson.whenToUse.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '0.35rem' }}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f87171' }}>✗ When NOT to Use</span>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                {lesson.whenNotToUse.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '0.35rem' }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Security, Operational, Cost */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c084fc' }}>Security Considerations</span>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                {lesson.securityConsiderations.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '0.3rem' }}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>Operational Considerations</span>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                {lesson.operationalConsiderations.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '0.3rem' }}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24' }}>Cost Impact &amp; Sizing</span>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                {lesson.costConsiderations.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '0.3rem' }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* State Changes vs Invariants */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 0.5rem 0' }}>
              State Transitions &amp; Invariants
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399' }}>What Changes</span>
                <ul style={{ margin: '0.4rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {lesson.whatChanges.map((c, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{c}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8' }}>What Does NOT Change</span>
                <ul style={{ margin: '0.4rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {lesson.whatDoesNotChange.map((c, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Traps & Troubleshooting */}
      {activeTab === 'mistakes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Common Mistakes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f87171' }}>
              Common Traps &amp; Anti-Patterns
            </span>

            {lesson.commonMistakes.map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  padding: '1rem',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fca5a5' }}>
                  Trap: {m.mistake}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                  <strong>Why Wrong:</strong> {m.whyWrong}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#a7f3d0' }}>
                  <strong>Correct Approach:</strong> {m.fix}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  <strong>Prevention:</strong> {m.prevention}
                </div>
              </div>
            ))}
          </div>

          {/* Troubleshooting Scenarios */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
              Troubleshooting &amp; Error Diagnostic Guide
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
              {lesson.troubleshooting.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#030712',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}
                >
                  <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.75rem', color: '#f87171' }}>
                    {t.symptom}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                    <strong>Root Cause:</strong> {t.cause}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#34d399' }}>
                    <strong>Resolution:</strong> {t.resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disaster Recovery Procedure */}
          <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '1.25rem', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8' }}>
              Disaster Recovery Runbook
            </span>
            <ol style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              {lesson.recoveryProcedure.steps.map((s, idx) => (
                <li key={idx} style={{ marginBottom: '0.3rem' }}>{s}</li>
              ))}
            </ol>
            {lesson.recoveryProcedure.warning && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#fca5a5', fontWeight: 600 }}>
                ⚠️ Warning: {lesson.recoveryProcedure.warning}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: Interactive Lab & Simulator */}
      {activeTab === 'practice' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Guided Hands-on Exercise */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                Guided Hands-On Exercise
              </span>
              <button
                onClick={() => {
                  setShowExerciseSolution(!showExerciseSolution);
                  markExerciseCompleted(lesson.id);
                }}
                style={{
                  padding: '0.35rem 0.65rem',
                  borderRadius: '5px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: showExerciseSolution ? 'rgba(16, 185, 129, 0.2)' : 'rgba(132, 79, 186, 0.2)',
                  border: `1px solid ${showExerciseSolution ? '#10b981' : '#844fba'}`,
                  color: showExerciseSolution ? '#a7f3d0' : '#e9d5ff',
                  cursor: 'pointer'
                }}
              >
                {showExerciseSolution ? 'Hide Solution' : 'Reveal Solution'}
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: '0 0 0.5rem 0' }}>
              {lesson.guidedHandsOnExercise.task}
            </p>

            <ul style={{ margin: '0 0 0.75rem 0', paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#94a3b8' }}>
              {lesson.guidedHandsOnExercise.instructions.map((inst, idx) => (
                <li key={idx} style={{ marginBottom: '0.2rem' }}>{inst}</li>
              ))}
            </ul>

            <textarea
              value={showExerciseSolution ? lesson.guidedHandsOnExercise.expectedCode : exerciseCode}
              onChange={(e) => setExerciseCode(e.target.value)}
              rows={6}
              style={{
                width: '100%',
                background: '#030712',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                padding: '0.75rem',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.78rem',
                color: showExerciseSolution ? '#a7f3d0' : '#f8fafc',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />

            {showExerciseSolution && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#a7f3d0' }}>
                ✓ {lesson.guidedHandsOnExercise.solutionExplanation}
              </div>
            )}
          </div>

          {/* Embedded Interactive Simulator */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
              <Play size={16} color="#c084fc" />
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                Interactive Simulator: {lesson.interactiveSimulatorOpportunity.scenario}
              </span>
            </div>
            <TerraformSimulator />
          </div>

          {/* Safe Failure Arena */}
          <div>
            <TerraformFailureArena />
          </div>

          {/* Knowledge Check Quiz */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
              Knowledge Check &amp; Mastery Assessment
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.85rem' }}>
              {lesson.knowledgeCheck.map((q, qIdx) => (
                <div key={qIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0' }}>
                    {qIdx + 1}. {q.question}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[qIdx] === oIdx;
                      const isCorrect = oIdx === q.correctIndex;

                      let optBg = 'rgba(255, 255, 255, 0.03)';
                      let optBorder = 'rgba(255, 255, 255, 0.08)';
                      let optColor = '#cbd5e1';

                      if (showQuizResults) {
                        if (isCorrect) {
                          optBg = 'rgba(16, 185, 129, 0.2)';
                          optBorder = '#10b981';
                          optColor = '#a7f3d0';
                        } else if (isSelected && !isCorrect) {
                          optBg = 'rgba(239, 68, 68, 0.2)';
                          optBorder = '#ef4444';
                          optColor = '#fca5a5';
                        }
                      } else if (isSelected) {
                        optBg = 'rgba(132, 79, 186, 0.2)';
                        optBorder = '#844fba';
                        optColor = '#e9d5ff';
                      }

                      return (
                        <div
                          key={oIdx}
                          onClick={() => !showQuizResults && handleSelectQuizOption(qIdx, oIdx)}
                          style={{
                            padding: '0.5rem 0.75rem',
                            borderRadius: '6px',
                            background: optBg,
                            border: `1px solid ${optBorder}`,
                            color: optColor,
                            fontSize: '0.78rem',
                            cursor: showQuizResults ? 'default' : 'pointer'
                          }}
                        >
                          {opt}
                        </div>
                      );
                    })}
                  </div>

                  {showQuizResults && (
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem', fontStyle: 'italic' }}>
                      Explanation: {q.explanation}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={handleSubmitQuiz}
                disabled={showQuizResults}
                style={{
                  alignSelf: 'flex-start',
                  background: showQuizResults ? 'rgba(255, 255, 255, 0.05)' : 'linear-gradient(135deg, #844fba, #6366f1)',
                  border: 'none',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: showQuizResults ? 'default' : 'pointer',
                  marginTop: '0.5rem'
                }}
              >
                {showQuizResults ? 'Quiz Evaluated' : 'Submit Answers'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Capstone Project Runner Modal */}
      {activeCapstone && (
        <StandardCapstoneRunnerModal
          project={activeCapstone}
          onClose={() => setActiveCapstone(null)}
        />
      )}
    </div>
  );
};
