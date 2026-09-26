import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export interface StandardAcademyBottomBarProps {
  prevConcept?: { id: string; command?: string; title: string } | null;
  nextConcept?: { id: string; command?: string; title: string } | null;
  onNavigate: (conceptId: string) => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
  accentGradient?: string;
  accentColor?: string;
}

export const StandardAcademyBottomBar: React.FC<StandardAcademyBottomBarProps> = ({
  prevConcept,
  nextConcept,
  onNavigate,
  isCompleted,
  onToggleComplete,
  accentGradient = 'linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(37, 99, 235, 0.35) 100%)',
  accentColor = '#38bdf8',
}) => {
  return (
    <div
      className="academy-bottom-bar"
      style={{
        flexShrink: 0,
        padding: '0.65rem 1.25rem',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
        boxSizing: 'border-box',
        height: '56px',
        minHeight: '56px',
        maxHeight: '56px',
      }}
    >
      {/* Previous Concept Button */}
      <button
        disabled={!prevConcept}
        onClick={() => prevConcept && onNavigate(prevConcept.id)}
        title={prevConcept ? `Go to ${prevConcept.command || prevConcept.title}` : 'No previous concept'}
        style={{
          background: prevConcept ? 'var(--bg-card)' : 'transparent',
          border: prevConcept ? '1px solid var(--border-color)' : '1px solid transparent',
          color: prevConcept ? 'var(--text-primary)' : 'var(--text-muted)',
          padding: '0.45rem 0.85rem',
          borderRadius: '8px',
          fontSize: '0.78rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          cursor: prevConcept ? 'pointer' : 'not-allowed',
          transition: 'all 0.15s ease',
        }}
      >
        <ChevronLeft size={14} />
        <span
          className="academy-bottom-label"
          style={{
            maxWidth: '170px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {prevConcept ? `Prev: ${prevConcept.command || prevConcept.title}` : 'Start'}
        </span>
      </button>

      {/* Center: Mark Complete Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={onToggleComplete}
          style={{
            background: isCompleted ? 'rgba(34, 197, 94, 0.15)' : `${accentColor}18`,
            border: isCompleted ? '1px solid rgba(34, 197, 94, 0.35)' : `1px solid ${accentColor}40`,
            color: isCompleted ? '#22c55e' : accentColor,
            padding: '0.42rem 0.95rem',
            borderRadius: '8px',
            fontSize: '0.78rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <CheckCircle2 size={14} />
          <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
        </button>
      </div>

      {/* Next Concept Button */}
      <button
        disabled={!nextConcept}
        onClick={() => nextConcept && onNavigate(nextConcept.id)}
        title={nextConcept ? `Go to ${nextConcept.command || nextConcept.title}` : 'All concepts completed'}
        style={{
          background: nextConcept ? accentGradient : 'transparent',
          border: nextConcept ? `1px solid ${accentColor}60` : '1px solid transparent',
          color: nextConcept ? '#ffffff' : 'var(--text-muted)',
          padding: '0.45rem 0.95rem',
          borderRadius: '8px',
          fontSize: '0.78rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          cursor: nextConcept ? 'pointer' : 'not-allowed',
          transition: 'all 0.15s ease',
          boxShadow: nextConcept ? `0 2px 10px ${accentColor}30` : 'none',
        }}
      >
        <span
          className="academy-bottom-label"
          style={{
            maxWidth: '170px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {nextConcept ? `Next: ${nextConcept.command || nextConcept.title}` : 'Completed!'}
        </span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
};
