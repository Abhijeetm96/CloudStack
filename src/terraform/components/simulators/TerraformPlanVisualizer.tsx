import React, { useState } from 'react';
import { Eye, Plus, RefreshCw, Trash2, Shield, Code, Check } from 'lucide-react';

interface PlanDiffItem {
  id: string;
  action: 'create' | 'update' | 'replace' | 'destroy';
  address: string;
  type: string;
  provider: string;
  changes: Array<{ attribute: string; from?: string; to: string; sensitive?: boolean }>;
}

const SAMPLE_PLAN_DIFFS: PlanDiffItem[] = [
  {
    id: 'diff-1',
    action: 'create',
    address: 'aws_vpc.production',
    type: 'aws_vpc',
    provider: 'hashicorp/aws',
    changes: [
      { attribute: 'cidr_block', to: '"10.0.0.0/16"' },
      { attribute: 'enable_dns_hostnames', to: 'true' },
      { attribute: 'enable_dns_support', to: 'true' },
      { attribute: 'id', to: '(known after apply)' },
      { attribute: 'tags.Environment', to: '"production"' }
    ]
  },
  {
    id: 'diff-2',
    action: 'update',
    address: 'aws_security_group.ingress_web',
    type: 'aws_security_group',
    provider: 'hashicorp/aws',
    changes: [
      { attribute: 'description', from: '"HTTP only"', to: '"TLS HTTPS & HTTP Web Ingress"' },
      { attribute: 'ingress.0.cidr_blocks', from: '["10.0.0.0/8"]', to: '["0.0.0.0/0"]' }
    ]
  },
  {
    id: 'diff-3',
    action: 'replace',
    address: 'aws_instance.app_cluster',
    type: 'aws_instance',
    provider: 'hashicorp/aws',
    changes: [
      { attribute: 'ami', from: '"ami-0123456789"', to: '"ami-0987654321"', sensitive: false },
      { attribute: 'user_data_base64', from: '"sha256:1a2b..."', to: '"sha256:9z8y..."' }
    ]
  },
  {
    id: 'diff-4',
    action: 'destroy',
    address: 'aws_s3_bucket.legacy_logs',
    type: 'aws_s3_bucket',
    provider: 'hashicorp/aws',
    changes: [
      { attribute: 'bucket', to: '"corp-legacy-audit-2023"' },
      { attribute: 'id', to: '"corp-legacy-audit-2023"' }
    ]
  }
];

export const TerraformPlanVisualizer: React.FC = () => {
  const [selectedDiff, setSelectedDiff] = useState<PlanDiffItem>(SAMPLE_PLAN_DIFFS[0]);
  const [filterAction, setFilterAction] = useState<string>('all');

  const filteredDiffs = filterAction === 'all'
    ? SAMPLE_PLAN_DIFFS
    : SAMPLE_PLAN_DIFFS.filter((d) => d.action === filterAction);

  return (
    <div
      style={{
        background: '#090d16',
        border: '1px solid rgba(132, 79, 186, 0.3)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        color: '#e2e8f0',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Eye size={17} color="#a855f7" />
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
              Execution Plan Diff Inspector
            </span>
          </div>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
            Preview planned infrastructure mutations with color-coded diff symbols and attribute-level impact.
          </p>
        </div>

        {/* Action Filter Pills */}
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          {[
            { id: 'all', label: 'All Diffs' },
            { id: 'create', label: '+ 1 Add' },
            { id: 'update', label: '~ 1 Change' },
            { id: 'replace', label: '+/- 1 Replace' },
            { id: 'destroy', label: '- 1 Destroy' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterAction(f.id)}
              style={{
                padding: '0.3rem 0.6rem',
                borderRadius: '5px',
                fontSize: '0.72rem',
                fontWeight: 600,
                background: filterAction === f.id ? 'rgba(132, 79, 186, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${filterAction === f.id ? '#844fba' : 'rgba(255, 255, 255, 0.08)'}`,
                color: filterAction === f.id ? '#e9d5ff' : '#94a3b8',
                cursor: 'pointer'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Diff Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.4fr)', gap: '1rem' }}>
        {/* Left: Resource List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {filteredDiffs.map((d) => {
            const isSelected = selectedDiff.id === d.id;
            const badgeColor = d.action === 'create'
              ? '#10b981'
              : d.action === 'update'
              ? '#f59e0b'
              : d.action === 'replace'
              ? '#ef4444'
              : '#ef4444';

            return (
              <div
                key={d.id}
                onClick={() => setSelectedDiff(d)}
                style={{
                  padding: '0.65rem 0.75rem',
                  borderRadius: '6px',
                  background: isSelected ? 'rgba(132, 79, 186, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${isSelected ? '#844fba' : 'rgba(255, 255, 255, 0.06)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: badgeColor }}>
                      {d.action === 'create' ? '+' : d.action === 'update' ? '~' : d.action === 'replace' ? '+/-' : '-'}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>
                      {d.address}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                    {d.type} ({d.provider})
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '4px',
                    color: badgeColor,
                    background: `${badgeColor}1a`
                  }}
                >
                  {d.action}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Attribute Diff Detail */}
        <div
          style={{
            background: '#030712',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '0.85rem',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.75rem',
            lineHeight: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem'
          }}
        >
          <div style={{ color: '#c084fc', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.4rem' }}>
            # {selectedDiff.address} will be {selectedDiff.action.toUpperCase()}D:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {selectedDiff.changes.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ color: '#94a3b8', minWidth: '150px' }}>{c.attribute}:</span>
                {c.from && (
                  <span style={{ color: '#f87171', textDecoration: 'line-through' }}>
                    {c.from}
                  </span>
                )}
                {c.from && <span style={{ color: '#64748b' }}>=&gt;</span>}
                <span style={{ color: '#34d399', fontWeight: 600 }}>{c.to}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '0.5rem',
              padding: '0.5rem',
              borderRadius: '4px',
              background: 'rgba(255, 255, 255, 0.03)',
              fontSize: '0.7rem',
              color: '#94a3b8'
            }}
          >
            Plan summary: {selectedDiff.action === 'replace' ? '⚠️ Forces complete recreation of resource and dependent nodes.' : 'Safe transition adhering to target schema.'}
          </div>
        </div>
      </div>
    </div>
  );
};
