import React, { useState } from 'react';
import { Database, FileText, Lock, ShieldCheck, Code, Copy, Check } from 'lucide-react';

const SAMPLE_TFSTATE = {
  version: 4,
  terraform_version: "1.8.0",
  serial: 14,
  lineage: "c8e2b109-77a4-4df1-8e01-9876543210ab",
  outputs: {
    vpc_id: {
      value: "vpc-0123456789abcdef0",
      type: "string",
      sensitive: false
    },
    database_endpoint: {
      value: "prod-postgres.cb8491823.us-east-1.rds.amazonaws.com:5432",
      type: "string",
      sensitive: false
    }
  },
  resources: [
    {
      mode: "managed",
      type: "aws_vpc",
      name: "production",
      provider: "provider[\"registry.terraform.io/hashicorp/aws\"]",
      instances: [
        {
          schema_version: 1,
          attributes: {
            arn: "arn:aws:ec2:us-east-1:123456789012:vpc/vpc-0123456789abcdef0",
            cidr_block: "10.0.0.0/16",
            enable_dns_hostnames: true,
            enable_dns_support: true,
            id: "vpc-0123456789abcdef0",
            tags: {
              Environment: "production",
              ManagedBy: "terraform",
              Project: "CloudStack"
            }
          },
          dependencies: [] as string[]
        }
      ]
    },
    {
      mode: "managed",
      type: "aws_subnet",
      name: "public_a",
      provider: "provider[\"registry.terraform.io/hashicorp/aws\"]",
      instances: [
        {
          schema_version: 1,
          attributes: {
            cidr_block: "10.0.1.0/24",
            id: "subnet-0987654321fedcba0",
            vpc_id: "vpc-0123456789abcdef0",
            availability_zone: "us-east-1a"
          },
          dependencies: ["aws_vpc.production"]
        }
      ]
    }
  ]
};

export const TerraformStateVisualizer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'structured' | 'json'>('structured');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(SAMPLE_TFSTATE, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Database size={17} color="#38bdf8" />
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
              State Ledger Explorer (terraform.tfstate)
            </span>
          </div>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
            The definitive single source of truth mapping your declarative code to live cloud IDs, serials, and dependencies.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          <button
            onClick={() => setViewMode('structured')}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: '5px',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: viewMode === 'structured' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${viewMode === 'structured' ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)'}`,
              color: viewMode === 'structured' ? '#bae6fd' : '#94a3b8',
              cursor: 'pointer'
            }}
          >
            Structured View
          </button>
          <button
            onClick={() => setViewMode('json')}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: '5px',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: viewMode === 'json' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${viewMode === 'json' ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)'}`,
              color: viewMode === 'json' ? '#bae6fd' : '#94a3b8',
              cursor: 'pointer'
            }}
          >
            Raw JSON
          </button>
          <button
            onClick={handleCopy}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: '5px',
              fontSize: '0.75rem',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            {copied ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* State Metadata Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.5rem',
          background: 'rgba(15, 23, 42, 0.6)',
          padding: '0.65rem',
          borderRadius: '6px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div>
          <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>State Schema Version</span>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>Version {SAMPLE_TFSTATE.version}</div>
        </div>
        <div>
          <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>Serial Counter</span>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>Serial: {SAMPLE_TFSTATE.serial}</div>
        </div>
        <div>
          <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>Engine Compatibility</span>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a855f7' }}>Terraform v{SAMPLE_TFSTATE.terraform_version}</div>
        </div>
        <div>
          <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>Lineage ID</span>
          <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#cbd5e1' }}>c8e2b109...ab</div>
        </div>
      </div>

      {/* Content View */}
      {viewMode === 'structured' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {SAMPLE_TFSTATE.resources.map((res, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>
                    {res.mode.toUpperCase()}:
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                    {res.type}.{res.name}
                  </span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'monospace' }}>
                  {res.provider}
                </span>
              </div>

              {res.instances.map((inst, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    Cloud Primary ID: <span style={{ color: '#34d399', fontWeight: 600 }}>{inst.attributes.id}</span>
                  </div>
                  {inst.dependencies && (
                    <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>
                      Dependencies: <span style={{ color: '#c084fc' }}>{inst.dependencies.join(', ')}</span>
                    </div>
                  )}
                  <pre
                    style={{
                      background: '#030712',
                      padding: '0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      color: '#cbd5e1',
                      margin: '0.4rem 0 0 0',
                      overflowX: 'auto'
                    }}
                  >
                    {JSON.stringify(inst.attributes, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <pre
          style={{
            background: '#030712',
            padding: '1rem',
            borderRadius: '6px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.75rem',
            lineHeight: 1.45,
            color: '#a5f3fc',
            fontFamily: 'ui-monospace, monospace',
            margin: 0,
            maxHeight: '360px',
            overflowY: 'auto'
          }}
        >
          {JSON.stringify(SAMPLE_TFSTATE, null, 2)}
        </pre>
      )}
    </div>
  );
};
