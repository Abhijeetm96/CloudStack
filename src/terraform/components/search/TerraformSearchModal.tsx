import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Code, Terminal, AlertTriangle, ArrowRight } from 'lucide-react';
import { searchTerraformLessons, TerraformSearchResult } from '../../data';

interface TerraformSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const TerraformSearchModal: React.FC<TerraformSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TerraformSearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const res = searchTerraformLessons(query, 25);
    setResults(res);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(3, 7, 18, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '640px',
          background: '#090d16',
          border: '1px solid rgba(132, 79, 186, 0.4)',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(132, 79, 186, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          color: '#e2e8f0',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        {/* Search Header Input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            gap: '0.75rem'
          }}
        >
          <Search size={18} color="#c084fc" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search state, modules, count, for_each, providers, drift, import..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '0.95rem',
              color: '#f8fafc'
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: 'none',
              borderRadius: '4px',
              padding: '0.25rem',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Quick Suggestions */}
        {!query && (
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Common Searches
            </span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {['state', 'remote state', 'module', 'for_each', 'count', 'provider', 'drift', 'import', 'dependency', 'lifecycle'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '6px',
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.75rem',
                    color: '#c084fc',
                    cursor: 'pointer'
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Container */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.5rem' }}>
          {results.map((res, i) => (
            <div
              key={i}
              onClick={() => {
                onSelectLesson(res.lesson.id);
                onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 0.85rem',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
                gap: '0.75rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.03)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(132, 79, 186, 0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span style={{ fontSize: '0.68rem', color: '#c084fc', fontWeight: 700 }}>
                    Ch {String(res.lesson.chapterNumber).padStart(2, '0')}.{res.lesson.subchapterNumber}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                    {res.lesson.title}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  [{res.matchedField}] {res.matchedSnippet}
                </div>
              </div>

              <ArrowRight size={14} color="#64748b" />
            </div>
          ))}

          {query && results.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
              No lessons found matching &quot;{query}&quot;. Try searching for &quot;state&quot;, &quot;plan&quot;, or &quot;provider&quot;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
