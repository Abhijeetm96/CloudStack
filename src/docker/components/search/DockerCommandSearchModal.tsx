import React, { useState, useMemo, useEffect, useRef } from 'react';
import { searchDockerCommands, CommandSearchResult } from '../../data/dockerCommandReference';
import { Search, X, Terminal, ArrowRight, Sparkles, BookOpen, Layers } from 'lucide-react';

interface DockerCommandSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConcept: (conceptId: string) => void;
}

export const DockerCommandSearchModal: React.FC<DockerCommandSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectConcept,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const results: CommandSearchResult[] = useMemo(() => {
    return searchDockerCommands(query);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh',
        background: 'rgba(5, 10, 20, 0.75)',
        backdropFilter: 'blur(8px)',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '75vh',
          background: '#0d131f',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(56, 189, 248, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#e2e8f0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(15, 23, 42, 0.7)',
          }}
        >
          <Search size={20} color="#38bdf8" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type what you want to do (e.g. 'run a container', 'map a port', 'see logs', 'clean images')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: '1rem',
              fontWeight: 600,
              flex: 1,
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
            >
              <X size={16} />
            </button>
          )}
          <span
            style={{
              padding: '0.2rem 0.5rem',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#94a3b8',
              fontSize: '0.72rem',
              fontFamily: 'monospace',
            }}
          >
            ESC to close
          </span>
        </div>

        {/* Results List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1.5rem', color: '#64748b' }}>
              <Terminal size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#94a3b8' }}>
                No commands matching "{query}"
              </p>
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.78rem' }}>
                Try natural questions like "how to stop containers", "docker build", or "ports"
              </p>
            </div>
          ) : (
            results.map((res) => (
              <div
                key={res.conceptId + res.command}
                onClick={() => {
                  onSelectConcept(res.conceptId);
                  onClose();
                }}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(56, 189, 248, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span
                      style={{
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        background: 'rgba(56, 189, 248, 0.15)',
                        color: '#38bdf8',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        fontFamily: 'monospace',
                      }}
                    >
                      TOPIC {res.topicNumber}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                      {res.conceptTitle}
                    </span>
                  </div>

                  <code
                    style={{
                      display: 'block',
                      color: '#4ade80',
                      fontFamily: 'monospace',
                      fontSize: '0.82rem',
                      marginBottom: '0.2rem',
                    }}
                  >
                    {res.command}
                  </code>

                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.76rem',
                      color: '#94a3b8',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {res.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: '#38bdf8',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  <span>Learn</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer Quick Shortcuts */}
        <div
          style={{
            padding: '0.65rem 1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(9, 13, 22, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.72rem',
            color: '#64748b',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={12} color="#f59e0b" />
            <span>Search understands natural language intent across all 42 lessons</span>
          </div>
          <span>{results.length} matching commands</span>
        </div>
      </div>
    </div>
  );
};
