import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, Database, Server, Cloud, ArrowRight, Shield, Layers } from 'lucide-react';
import { incrementSimulatorInteraction } from '../../progress/terraformProgress';

interface SimulatedResource {
  id: string;
  name: string;
  type: string;
  provider: 'aws' | 'azure' | 'gcp' | 'kubernetes';
  status: 'planned_add' | 'active' | 'drifted' | 'planned_update' | 'planned_destroy' | 'destroyed';
  details: string;
  tier: 'Network' | 'Compute' | 'Storage' | 'Security';
}

const INITIAL_RESOURCES: SimulatedResource[] = [
  { id: 'res-vpc', name: 'aws_vpc.production', type: 'VPC (10.0.0.0/16)', provider: 'aws', status: 'planned_add', details: 'DNS enabled, 2 AZs', tier: 'Network' },
  { id: 'res-subnet', name: 'aws_subnet.public_a', type: 'Public Subnet (10.0.1.0/24)', provider: 'aws', status: 'planned_add', details: 'us-east-1a, auto-assign public IP', tier: 'Network' },
  { id: 'res-sg', name: 'aws_security_group.web', type: 'Security Group (Port 443/80)', provider: 'aws', status: 'planned_add', details: 'TLS HTTPS ingress, VPC bound', tier: 'Security' },
  { id: 'res-ec2', name: 'aws_instance.app_server', type: 'EC2 t3.large (Ubuntu 22.04)', provider: 'aws', status: 'planned_add', details: 'Nginx + Node API cluster', tier: 'Compute' },
  { id: 'res-rds', name: 'aws_db_instance.postgres', type: 'RDS PostgreSQL 15.4', provider: 'aws', status: 'planned_add', details: 'Multi-AZ, KMS encrypted at rest', tier: 'Storage' }
];

export const TerraformSimulator: React.FC = () => {
  const [pipelineStep, setPipelineStep] = useState<'idle' | 'planning' | 'planned' | 'applying' | 'converged' | 'drifted' | 'destroying'>('idle');
  const [resources, setResources] = useState<SimulatedResource[]>(INITIAL_RESOURCES);
  const [terminalLog, setTerminalLog] = useState<string[]>([
    'Initializing Terraform Engine v1.8.0...',
    'Found 5 declarative resource blocks in main.tf',
    'Ready. Click [Run terraform plan] to generate the execution DAG.'
  ]);
  const [stateSerial, setStateSerial] = useState(1);

  const addLog = (msg: string) => {
    setTerminalLog((prev) => [...prev.slice(-30), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handlePlan = () => {
    incrementSimulatorInteraction();
    setPipelineStep('planning');
    addLog('Executing: terraform plan -out=tfplan');
    addLog('Analyzing provider schemas and fetching remote state lock...');

    setTimeout(() => {
      setPipelineStep('planned');
      setResources((prev) =>
        prev.map((r) => ({
          ...r,
          status: r.status === 'drifted' ? 'planned_update' : r.status === 'destroyed' ? 'planned_add' : 'planned_add'
        }))
      );
      addLog('Plan generated: 5 to add, 0 to change, 0 to destroy.');
      addLog('Execution plan saved to binary file: tfplan');
    }, 700);
  };

  const handleApply = () => {
    incrementSimulatorInteraction();
    setPipelineStep('applying');
    addLog('Executing: terraform apply tfplan');
    addLog('Acquiring state lock on DynamoDB table [terraform-locks]...');
    addLog('Dispatched parallel creation graph walkers (-parallelism=10)...');

    setTimeout(() => {
      setPipelineStep('converged');
      setStateSerial((s) => s + 1);
      setResources((prev) =>
        prev.map((r) => ({
          ...r,
          status: 'active'
        }))
      );
      addLog('Apply complete! Resources: 5 added, 0 changed, 0 destroyed.');
      addLog(`Updated terraform.tfstate (Serial: ${stateSerial + 1}, Lock released).`);
      addLog('Outputs: vpc_id = "vpc-0abc1234", app_endpoint = "https://app.cloudstack.io"');
    }, 900);
  };

  const handleInjectDrift = () => {
    incrementSimulatorInteraction();
    setPipelineStep('drifted');
    setResources((prev) =>
      prev.map((r) =>
        r.id === 'res-sg'
          ? { ...r, status: 'drifted', details: 'DRIFT DETECTED: Port 22 SSH opened to 0.0.0.0/0 manually in AWS Console!' }
          : r
      )
    );
    addLog('⚠️ SIMULATION EVENT: An engineer manually altered Security Group in AWS Console.');
    addLog('Current Cloud Reality has diverged from declared HCL code.');
    addLog('Run [Detect & Reconcile Drift] to restore desired state.');
  };

  const handleReconcileDrift = () => {
    incrementSimulatorInteraction();
    setPipelineStep('planning');
    addLog('Executing: terraform plan -refresh-only');
    addLog('Refreshing state against AWS API endpoints...');

    setTimeout(() => {
      setPipelineStep('converged');
      setResources((prev) =>
        prev.map((r) =>
          r.id === 'res-sg'
            ? { ...r, status: 'active', details: 'Reconciled: Port 22 SSH rule revoked. Desired TLS HTTPS restored.' }
            : r
        )
      );
      addLog('Terraform reconciled drift: Out-of-band rule removed. Cloud reality aligned with code.');
    }, 800);
  };

  const handleDestroy = () => {
    incrementSimulatorInteraction();
    setPipelineStep('destroying');
    addLog('Executing: terraform destroy -auto-approve');
    addLog('Walking dependency graph in REVERSE order: EC2 -> SG -> Subnet -> VPC...');

    setTimeout(() => {
      setPipelineStep('idle');
      setStateSerial((s) => s + 1);
      setResources((prev) =>
        prev.map((r) => ({
          ...r,
          status: 'destroyed'
        }))
      );
      addLog('Destroy complete! Resources: 5 destroyed.');
      addLog(`State file emptied (Serial: ${stateSerial + 1}). All cloud assets cleanly deprovisioned.`);
    }, 900);
  };

  const handleReset = () => {
    setPipelineStep('idle');
    setResources(INITIAL_RESOURCES);
    setTerminalLog(['Simulator reset. Ready for new plan execution.']);
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
        gap: '1.25rem',
        color: '#e2e8f0',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: pipelineStep === 'converged' ? '#10b981' : pipelineStep === 'drifted' ? '#ef4444' : '#844fba',
                boxShadow: `0 0 10px ${pipelineStep === 'converged' ? '#10b981' : '#844fba'}`
              }}
            />
            <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#f8fafc' }}>
              Interactive Terraform Execution &amp; State Reconciler
            </span>
          </div>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
            Visualizes: Code ➔ Plan Diff ➔ Apply Engine ➔ Live Infrastructure ➔ State Ledger ➔ Drift Detection
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={handlePlan}
            disabled={pipelineStep === 'planning' || pipelineStep === 'applying'}
            style={{
              background: 'rgba(132, 79, 186, 0.2)',
              border: '1px solid #844fba',
              color: '#d8b4fe',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Play size={13} />
            terraform plan
          </button>

          <button
            onClick={handleApply}
            disabled={pipelineStep !== 'planned'}
            style={{
              background: pipelineStep === 'planned' ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(16, 185, 129, 0.1)',
              border: '1px solid #10b981',
              color: '#fff',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: pipelineStep === 'planned' ? 'pointer' : 'not-allowed',
              opacity: pipelineStep === 'planned' ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <CheckCircle size={13} />
            terraform apply
          </button>

          <button
            onClick={handleInjectDrift}
            disabled={pipelineStep !== 'converged'}
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              color: '#fca5a5',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: pipelineStep === 'converged' ? 'pointer' : 'not-allowed',
              opacity: pipelineStep === 'converged' ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
            title="Inject an unauthorized out-of-band console change"
          >
            <AlertTriangle size={13} />
            Simulate Drift
          </button>

          {pipelineStep === 'drifted' && (
            <button
              onClick={handleReconcileDrift}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                border: '1px solid #60a5fa',
                color: '#fff',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <RotateCcw size={13} />
              Reconcile Drift
            </button>
          )}

          <button
            onClick={handleDestroy}
            disabled={pipelineStep !== 'converged'}
            style={{
              background: 'rgba(100, 116, 139, 0.2)',
              border: '1px solid #64748b',
              color: '#cbd5e1',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: pipelineStep === 'converged' ? 'pointer' : 'not-allowed',
              opacity: pipelineStep === 'converged' ? 1 : 0.5
            }}
          >
            destroy
          </button>

          <button
            onClick={handleReset}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94a3b8',
              padding: '0.45rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
            title="Reset simulator"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Visual Mental Model Flow Ribbon */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '0.5rem',
          background: 'rgba(15, 23, 42, 0.6)',
          padding: '0.75rem',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        {[
          { label: 'HCL Code (*.tf)', desc: 'Desired State in Git', icon: Layers, active: true },
          { label: 'Plan Engine', desc: 'DAG Diff Calculation', icon: ArrowRight, active: pipelineStep === 'planning' || pipelineStep === 'planned' },
          { label: 'Apply Worker', desc: 'Cloud API Dispatch', icon: Play, active: pipelineStep === 'applying' },
          { label: 'Cloud Infrastructure', desc: 'Real VPC/VM/RDS', icon: Cloud, active: pipelineStep === 'converged' },
          { label: 'State Ledger', desc: `terraform.tfstate (s:${stateSerial})`, icon: Database, active: pipelineStep === 'converged' || pipelineStep === 'drifted' }
        ].map((stage, idx) => (
          <div
            key={idx}
            style={{
              padding: '0.5rem',
              borderRadius: '6px',
              background: stage.active ? 'rgba(132, 79, 186, 0.15)' : 'rgba(255, 255, 255, 0.02)',
              border: stage.active ? '1px solid rgba(132, 79, 186, 0.5)' : '1px solid transparent',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <stage.icon size={13} color={stage.active ? '#c084fc' : '#64748b'} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: stage.active ? '#f1f5f9' : '#94a3b8' }}>
                {stage.label}
              </span>
            </div>
            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{stage.desc}</span>
          </div>
        ))}
      </div>

      {/* Grid: Resources State on Left, Terminal Output on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '1rem' }}>
        {/* Left: Resource Infrastructure Stage */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
              Simulated Infrastructure Resources ({resources.length})
            </span>
            <span style={{ fontSize: '0.7rem', color: '#c084fc', fontWeight: 600 }}>
              State Lineage: 8a4c-9f12 (Serial {stateSerial})
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: '280px', overflowY: 'auto' }}>
            {resources.map((res) => {
              const isAdded = res.status === 'planned_add';
              const isActive = res.status === 'active';
              const isDrift = res.status === 'drifted';
              const isDestroyed = res.status === 'destroyed';

              return (
                <div
                  key={res.id}
                  style={{
                    background: isDrift
                      ? 'rgba(239, 68, 68, 0.15)'
                      : isActive
                      ? 'rgba(16, 185, 129, 0.08)'
                      : isAdded
                      ? 'rgba(132, 79, 186, 0.1)'
                      : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${
                      isDrift ? '#ef4444' : isActive ? 'rgba(16, 185, 129, 0.3)' : isAdded ? 'rgba(132, 79, 186, 0.3)' : 'rgba(255, 255, 255, 0.05)'
                    }`,
                    borderRadius: '6px',
                    padding: '0.6rem 0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: isDrift ? '#f87171' : isActive ? '#34d399' : isAdded ? '#c084fc' : '#64748b'
                        }}
                      >
                        {isAdded ? '+ CREATE' : isActive ? '✓ SYNCED' : isDrift ? '⚠️ DRIFT' : '- DESTROYED'}
                      </span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>{res.name}</span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#94a3b8'
                      }}
                    >
                      {res.tier}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{res.type}</div>
                  <div style={{ fontSize: '0.68rem', color: isDrift ? '#fca5a5' : '#64748b' }}>{res.details}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Live Terminal Log Console */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
              Execution Stream
            </span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>bash / terraform-cli</span>
          </div>

          <div
            style={{
              background: '#030712',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '0.75rem',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              fontSize: '0.75rem',
              lineHeight: 1.45,
              height: '280px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}
          >
            {terminalLog.map((log, i) => (
              <div
                key={i}
                style={{
                  color: log.includes('Executing:')
                    ? '#c084fc'
                    : log.includes('Plan generated:') || log.includes('Apply complete!')
                    ? '#34d399'
                    : log.includes('DRIFT DETECTED') || log.includes('SIMULATION')
                    ? '#f87171'
                    : '#94a3b8'
                }}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
