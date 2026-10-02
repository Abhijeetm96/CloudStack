import React, { useState, useMemo } from 'react';
import { DOCKER_GLOSSARY, GlossaryTerm, searchGlossary } from '../../data/dockerGlossary';
import { Search, X, BookOpen, Lightbulb, Code2, AlertTriangle, Link2, Sparkles } from 'lucide-react';

interface DockerGlossaryModalProps {
  initialTerm?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DockerGlossaryModal: React.FC<DockerGlossaryModalProps> = ({
  initialTerm,
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTermKey, setSelectedTermKey] = useState<string>(() => {
    if (initialTerm) {
      const lower = initialTerm.toLowerCase().replace(/\s+/g, '-');
      if (DOCKER_GLOSSARY[lower]) return lower;
      const found = Object.keys(DOCKER_GLOSSARY).find((k) =>
        k.includes(lower) || DOCKER_GLOSSARY[k].term.toLowerCase().includes(initialTerm.toLowerCase())
      );
      if (found) return found;
    }
    return 'container';
  });

  // Sync initialTerm when prop changes
  React.useEffect(() => {
    if (initialTerm) {
      const lower = initialTerm.toLowerCase().replace(/\s+/g, '-');
      if (DOCKER_GLOSSARY[lower]) {
        setSelectedTermKey(lower);
      } else {
        const found = Object.keys(DOCKER_GLOSSARY).find((k) =>
          k.includes(lower) || DOCKER_GLOSSARY[k].term.toLowerCase().includes(initialTerm.toLowerCase())
        );
        if (found) setSelectedTermKey(found);
      }
    }
  }, [initialTerm]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return Object.values(DOCKER_GLOSSARY);
    }
    return searchGlossary(searchQuery);
  }, [searchQuery]);

  const activeTerm: GlossaryTerm | undefined = DOCKER_GLOSSARY[selectedTermKey] || searchResults[0];

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
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(5, 10, 20, 0.75)',
        backdropFilter: 'blur(8px)',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '85vh',
          background: '#0d131f',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(56, 189, 248, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#e2e8f0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(15, 23, 42, 0.6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
              }}
            >
              <BookOpen size={18} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>
                Docker Architecture Glossary
              </h2>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>
                Authoritative reference for 55+ Docker & Linux containerization terms
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close glossary modal"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#090d16',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '0.5rem 0.85rem',
            }}
          >
            <Search size={16} color="#64748b" />
            <input
              type="text"
              placeholder="Search any Docker term (e.g. layer, volume, cgroup, namespace, OCI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#f1f5f9',
                fontSize: '0.85rem',
                flex: 1,
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Modal Body: Left Term List, Right Term Detail */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          {/* Term List Sidebar */}
          <div
            style={{
              width: '260px',
              minWidth: '260px',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              overflowY: 'auto',
              background: 'rgba(9, 13, 22, 0.7)',
              padding: '0.5rem',
            }}
          >
            {searchResults.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>
                No glossary terms matching "{searchQuery}"
              </div>
            ) : (
              searchResults.map((t) => {
                const isSelected = activeTerm?.slug === t.slug;
                return (
                  <button
                    key={t.slug}
                    onClick={() => setSelectedTermKey(t.slug)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.55rem 0.75rem',
                      borderRadius: '8px',
                      background: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                      border: isSelected ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                      color: isSelected ? '#38bdf8' : '#cbd5e1',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: isSelected ? 700 : 500,
                      marginBottom: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{t.term}</span>
                    {isSelected && <Sparkles size={12} color="#38bdf8" />}
                  </button>
                );
              })
            )}
          </div>

          {/* Term Content Details */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {activeTerm ? (
              <>
                {/* Term Title & Pill */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>
                      {activeTerm.term}
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'monospace' }}>
                      slug: {activeTerm.slug}
                    </span>
                  </div>
                  <span
                    style={{
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      background: 'rgba(56, 189, 248, 0.12)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      color: '#38bdf8',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                    }}
                  >
                    Docker Primitives
                  </span>
                </div>

                {/* Simple Definition (ELI5) */}
                <div
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                    <Lightbulb size={16} color="#10b981" />
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>
                      Explain Like I'm New (Zero Jargon)
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.55 }}>
                    {activeTerm.simpleDefinition}
                  </p>
                </div>

                {/* Technical Definition */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                    <BookOpen size={16} color="#38bdf8" />
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                      Senior Engineer Technical Definition
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55, fontFamily: 'monospace' }}>
                    {activeTerm.technicalDefinition}
                  </p>
                </div>

                {/* Real-World Analogy */}
                <div
                  style={{
                    background: 'rgba(245, 158, 11, 0.08)',
                    border: '1px solid rgba(245, 158, 11, 0.25)',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                    <Sparkles size={16} color="#f59e0b" />
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase' }}>
                      Visual Metaphor & Analogy
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#fef3c7', lineHeight: 1.55 }}>
                    {activeTerm.analogy}
                  </p>
                </div>

                {/* Example Snippet */}
                {activeTerm.example && (
                  <div
                    style={{
                      background: '#090d16',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '0.85rem 1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                      <Code2 size={16} color="#a855f7" />
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase' }}>
                        Command Line Example
                      </span>
                    </div>
                    <code
                      style={{
                        display: 'block',
                        background: '#040711',
                        padding: '0.55rem 0.85rem',
                        borderRadius: '8px',
                        color: '#4ade80',
                        fontFamily: 'monospace',
                        fontSize: '0.82rem',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      $ {activeTerm.example}
                    </code>
                  </div>
                )}

                {/* Common Confusion / Gotcha */}
                {activeTerm.commonConfusion && (
                  <div
                    style={{
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      borderRadius: '12px',
                      padding: '0.85rem 1rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.35rem' }}>
                      <AlertTriangle size={16} color="#ef4444" />
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase' }}>
                        Common Beginner Confusion
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.84rem', color: '#fca5a5', lineHeight: 1.55 }}>
                      {activeTerm.commonConfusion}
                    </p>
                  </div>
                )}

                {/* Related Terms */}
                {activeTerm.relatedTerms && activeTerm.relatedTerms.length > 0 && (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
                      <Link2 size={15} color="#94a3b8" />
                      <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                        Related Concepts:
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {activeTerm.relatedTerms.map((rt) => {
                        const slug = rt.toLowerCase().replace(/\s+/g, '-');
                        return (
                          <button
                            key={rt}
                            onClick={() => {
                              if (DOCKER_GLOSSARY[slug]) setSelectedTermKey(slug);
                              else setSearchQuery(rt);
                            }}
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '6px',
                              padding: '0.3rem 0.65rem',
                              color: '#93c5fd',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {rt} →
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                Select a term to view definitions.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
