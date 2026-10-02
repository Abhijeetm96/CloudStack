import React, { useState } from 'react';
import { GitBranch, Layers, ArrowDown, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface GraphNode {
  id: string;
  name: string;
  stage: number;
  type: string;
  dependsOn: string[];
}

const GRAPH_NODES: GraphNode[] = [
  { id: 'provider-aws', name: 'provider["aws"]', stage: 1, type: 'Provider Config', dependsOn: [] },
  { id: 'aws-vpc', name: 'aws_vpc.main', stage: 2, type: 'Network Core', dependsOn: ['provider-aws'] },
  { id: 'aws-subnet-a', name: 'aws_subnet.public_a', stage: 3, type: 'Network Tier', dependsOn: ['aws-vpc'] },
  { id: 'aws-subnet-b', name: 'aws_subnet.private_b', stage: 3, type: 'Network Tier', dependsOn: ['aws-vpc'] },
  { id: 'aws-sg', name: 'aws_security_group.web', stage: 3, type: 'Firewall', dependsOn: ['aws-vpc'] },
  { id: 'aws-ec2', name: 'aws_instance.web', stage: 4, type: 'Compute Host', dependsOn: ['aws-subnet-a', 'aws-sg'] },
  { id: 'aws-rds', name: 'aws_db_instance.db', stage: 4, type: 'Stateful Database', dependsOn: ['aws-subnet-b', 'aws-sg'] }
];

export const TerraformGraphVisualizer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GraphNode>(GRAPH_NODES[1]);
  const [simulateCycle, setSimulateCycle] = useState(false);

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
            <GitBranch size={17} color="#c084fc" />
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
              Dependency Directed Acyclic Graph (DAG)
            </span>
          </div>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
            Terraform automatically calculates topological sorting, parallel branch creation, and safe destruction ordering.
          </p>
        </div>

        <button
          onClick={() => setSimulateCycle(!simulateCycle)}
          style={{
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 600,
            background: simulateCycle ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.04)',
            border: `1px solid ${simulateCycle ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
            color: simulateCycle ? '#fca5a5' : '#94a3b8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          {simulateCycle ? <AlertTriangle size={13} /> : <Layers size={13} />}
          {simulateCycle ? 'Cycle Injected (Broken DAG)' : 'Simulate Dependency Cycle'}
        </button>
      </div>

      {simulateCycle && (
        <div
          style={{
            padding: '0.65rem 0.85rem',
            borderRadius: '6px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            fontSize: '0.75rem',
            color: '#fca5a5',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <AlertTriangle size={15} color="#ef4444" />
          <span>
            <strong>Error: Cycle:</strong> aws_instance.web -&gt; aws_db_instance.db -&gt; aws_instance.web. Terraform Core cannot resolve execution order.
          </span>
        </div>
      )}

      {/* Visual DAG Stages */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.75rem',
          background: 'rgba(15, 23, 42, 0.5)',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          overflowX: 'auto'
        }}
      >
        {[1, 2, 3, 4].map((stageNum) => {
          const stageNodes = GRAPH_NODES.filter((n) => n.stage === stageNum);
          const stageNames = ['Roots / Config', 'Network Fabric', 'Tiers & Security', 'Compute & Database'];

          return (
            <div key={stageNum} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.35rem' }}>
                <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase' }}>
                  Stage {stageNum}
                </span>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c084fc' }}>
                  {stageNames[stageNum - 1]}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {stageNodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  const isDependencyOfSelected = selectedNode.dependsOn.includes(node.id);

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      style={{
                        padding: '0.55rem',
                        borderRadius: '6px',
                        background: isSelected
                          ? 'rgba(132, 79, 186, 0.25)'
                          : isDependencyOfSelected
                          ? 'rgba(56, 189, 248, 0.15)'
                          : 'rgba(255, 255, 255, 0.02)',
                        border: `1px solid ${
                          isSelected ? '#844fba' : isDependencyOfSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)'
                        }`,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.15rem'
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f8fafc' }}>
                        {node.name}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{node.type}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Inspector */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '6px',
          padding: '0.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <div>
          <span style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Selected Node:</span>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
            {selectedNode.name} ({selectedNode.type})
          </div>
        </div>

        <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
          Upstream Dependencies: {selectedNode.dependsOn.length > 0 ? (
            <span style={{ color: '#38bdf8', fontWeight: 600 }}>{selectedNode.dependsOn.join(', ')}</span>
          ) : (
            <span style={{ color: '#64748b' }}>None (Root node)</span>
          )}
        </div>
      </div>
    </div>
  );
};
