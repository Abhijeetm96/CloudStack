import React, { useState } from 'react';
import {
  Server,
  FolderTree,
  Activity,
  Network,
  ShieldCheck,
  HardDrive,
  Users,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Lock,
  Cpu
} from 'lucide-react';

export interface VisualFileSystemItem {
  name: string;
  type: 'dir' | 'file';
  perms: string;
  owner: string;
  size: string;
  children?: VisualFileSystemItem[];
}

export interface VisualProcess {
  pid: number;
  comm: string;
  user: string;
  cpu: number;
  mem: number;
  status: 'R' | 'S' | 'Z' | 'DEAD';
}

export interface VisualService {
  name: string;
  desc: string;
  status: 'ACTIVE' | 'INACTIVE' | 'FAILED';
  enabled: boolean;
}

export interface VisualSystemState {
  users: string[];
  currentUser: string;
  hostname: string;
  currentPath: string;
  fs: VisualFileSystemItem[];
  processes: VisualProcess[];
  services: VisualService[];
  network: {
    interface: string;
    ip: string;
    mac: string;
    gateway: string;
    dns: string;
    listeningPorts: number[];
  };
  lastAction?: {
    command: string;
    consequence: string;
    isSafeFailure?: boolean;
    recoveryHint?: string;
  };
}

export const INITIAL_VISUAL_SYSTEM_STATE: VisualSystemState = {
  users: ['root', 'forge', 'www-data', 'nginx'],
  currentUser: 'forge',
  hostname: 'linuxforge-prod-01',
  currentPath: '/home/forge',
  fs: [
    {
      name: '/',
      type: 'dir',
      perms: 'drwxr-xr-x',
      owner: 'root',
      size: '4.0K',
      children: [
        {
          name: 'etc',
          type: 'dir',
          perms: 'drwxr-xr-x',
          owner: 'root',
          size: '4.0K',
          children: [
            { name: 'passwd', type: 'file', perms: '-rw-r--r--', owner: 'root', size: '1.4K' },
            { name: 'shadow', type: 'file', perms: '-rw-r-----', owner: 'root', size: '890B' },
            { name: 'hosts', type: 'file', perms: '-rw-r--r--', owner: 'root', size: '210B' },
            { name: 'resolv.conf', type: 'file', perms: '-rw-r--r--', owner: 'root', size: '85B' },
          ]
        },
        {
          name: 'home',
          type: 'dir',
          perms: 'drwxr-xr-x',
          owner: 'root',
          size: '4.0K',
          children: [
            {
              name: 'forge',
              type: 'dir',
              perms: 'drwxr-xr-x',
              owner: 'forge',
              size: '4.0K',
              children: [
                { name: 'deploy.sh', type: 'file', perms: '-rwxr-xr-x', owner: 'forge', size: '240B' },
                { name: 'server.js', type: 'file', perms: '-rw-r--r--', owner: 'forge', size: '1.2K' },
                { name: 'notes.txt', type: 'file', perms: '-rw-r--r--', owner: 'forge', size: '95B' },
              ]
            }
          ]
        },
        {
          name: 'var',
          type: 'dir',
          perms: 'drwxr-xr-x',
          owner: 'root',
          size: '4.0K',
          children: [
            {
              name: 'log',
              type: 'dir',
              perms: 'drwxr-xr-x',
              owner: 'root',
              size: '4.0K',
              children: [
                { name: 'syslog', type: 'file', perms: '-rw-r-----', owner: 'syslog', size: '64K' },
                { name: 'auth.log', type: 'file', perms: '-rw-r-----', owner: 'syslog', size: '12K' },
              ]
            }
          ]
        }
      ]
    }
  ],
  processes: [
    { pid: 1, comm: 'systemd', user: 'root', cpu: 0.1, mem: 1.2, status: 'S' },
    { pid: 482, comm: 'sshd', user: 'root', cpu: 0.0, mem: 0.8, status: 'S' },
    { pid: 814, comm: 'nginx: master', user: 'root', cpu: 0.2, mem: 2.1, status: 'S' },
    { pid: 815, comm: 'nginx: worker', user: 'www-data', cpu: 0.5, mem: 3.4, status: 'S' },
    { pid: 1234, comm: 'node /app/server.js', user: 'forge', cpu: 2.4, mem: 6.8, status: 'R' },
    { pid: 2048, comm: 'bash', user: 'forge', cpu: 0.0, mem: 0.5, status: 'S' },
  ],
  services: [
    { name: 'nginx.service', desc: 'Nginx HTTP and reverse proxy server', status: 'ACTIVE', enabled: true },
    { name: 'ssh.service', desc: 'OpenSSH server daemon', status: 'ACTIVE', enabled: true },
    { name: 'cron.service', desc: 'Regular background program processing daemon', status: 'ACTIVE', enabled: true },
    { name: 'systemd-resolved.service', desc: 'Network Name Resolution', status: 'ACTIVE', enabled: true },
  ],
  network: {
    interface: 'eth0',
    ip: '192.168.1.50/24',
    mac: '52:54:00:12:34:56',
    gateway: '192.168.1.1',
    dns: '1.1.1.1',
    listeningPorts: [22, 80, 443, 3000],
  }
};

export interface LinuxVisualSystemSimulatorProps {
  systemState: VisualSystemState;
  onResetSystem: () => void;
  accentColor?: string;
}

export const LinuxVisualSystemSimulator: React.FC<LinuxVisualSystemSimulatorProps> = ({
  systemState,
  onResetSystem,
  accentColor = '#06b6d4'
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'fs' | 'proc' | 'services' | 'net' | 'perms'>('overview');

  return (
    <div
      style={{
        background: '#090d16',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Visual System Header Bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, #0d1527 0%, #090d16 100%)',
          padding: '0.65rem 1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 8px #22c55e',
            }}
          />
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f8fafc' }}>
            Linux System Visualizer
          </span>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>
            ({systemState.hostname} · {systemState.currentUser}@{systemState.network.ip.split('/')[0]})
          </span>
        </div>

        <button
          onClick={onResetSystem}
          title="Reset simulated machine state to clean baseline"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            padding: '0.25rem 0.55rem',
            color: '#94a3b8',
            fontSize: '0.68rem',
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={12} />
          <span>Reset State</span>
        </button>
      </div>

      {/* Simulator Context Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.35rem 0.75rem',
          background: '#070a12',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          overflowX: 'auto',
        }}
      >
        {[
          { id: 'overview', label: 'Overview', icon: Server },
          { id: 'fs', label: 'Filesystem', icon: FolderTree },
          { id: 'proc', label: 'Processes', icon: Activity },
          { id: 'services', label: 'systemd Services', icon: Zap },
          { id: 'net', label: 'Network', icon: Network },
          { id: 'perms', label: 'Permissions Matrix', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.65rem',
                borderRadius: '6px',
                background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                border: isActive ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
                color: isActive ? '#38bdf8' : '#64748b',
                fontSize: '0.72rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon size={13} color={isActive ? '#38bdf8' : '#64748b'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Safe Failure / Action Feedback Banner */}
      {systemState.lastAction && (
        <div
          style={{
            padding: '0.6rem 1rem',
            background: systemState.lastAction.isSafeFailure
              ? 'rgba(239, 68, 68, 0.12)'
              : 'rgba(6, 182, 212, 0.08)',
            borderBottom: `1px solid ${
              systemState.lastAction.isSafeFailure ? 'rgba(239, 68, 68, 0.3)' : 'rgba(6, 182, 212, 0.2)'
            }`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            fontSize: '0.76rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {systemState.lastAction.isSafeFailure ? (
              <AlertTriangle size={15} color="#ef4444" />
            ) : (
              <CheckCircle2 size={15} color="#06b6d4" />
            )}
            <div>
              <span style={{ fontFamily: 'monospace', color: '#f8fafc', fontWeight: 700 }}>
                $ {systemState.lastAction.command}
              </span>
              <span style={{ color: '#cbd5e1', marginLeft: '0.5rem' }}>
                → {systemState.lastAction.consequence}
              </span>
            </div>
          </div>

          {systemState.lastAction.recoveryHint && (
            <span style={{ color: '#f59e0b', fontWeight: 600 }}>
              💡 {systemState.lastAction.recoveryHint}
            </span>
          )}
        </div>
      )}

      {/* Simulator Content Panels */}
      <div style={{ padding: '1rem', minHeight: '180px', maxHeight: '300px', overflowY: 'auto' }}>
        {/* TAB 1: SYSTEM OVERVIEW */}
        {activeTab === 'overview' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {/* Box 1: Users */}
            <div style={{ background: '#0d131f', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#06b6d4', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                <Users size={14} />
                <span>Active Users ({systemState.users.length})</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {systemState.users.map((u) => (
                  <span
                    key={u}
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'monospace',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      background: u === systemState.currentUser ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.04)',
                      color: u === systemState.currentUser ? '#38bdf8' : '#94a3b8',
                      border: u === systemState.currentUser ? '1px solid #06b6d4' : '1px solid transparent',
                    }}
                  >
                    {u} {u === systemState.currentUser ? '★' : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Box 2: Processes */}
            <div style={{ background: '#0d131f', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                <Activity size={14} />
                <span>Running Processes ({systemState.processes.filter(p => p.status !== 'DEAD').length})</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontFamily: 'monospace', fontSize: '0.72rem' }}>
                {systemState.processes.slice(0, 4).map((p) => (
                  <div key={p.pid} style={{ display: 'flex', justifyContent: 'space-between', color: p.status === 'DEAD' ? '#64748b' : '#cbd5e1' }}>
                    <span>PID {p.pid}: {p.comm}</span>
                    <span style={{ color: p.status === 'R' ? '#4ade80' : '#64748b' }}>[{p.status}]</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 3: Services */}
            <div style={{ background: '#0d131f', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                <Zap size={14} />
                <span>systemd Units ({systemState.services.length})</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontFamily: 'monospace', fontSize: '0.72rem' }}>
                {systemState.services.map((s) => (
                  <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#cbd5e1' }}>{s.name}</span>
                    <span style={{ color: s.status === 'ACTIVE' ? '#4ade80' : s.status === 'FAILED' ? '#ef4444' : '#64748b', fontWeight: 700 }}>
                      ● {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 4: Network */}
            <div style={{ background: '#0d131f', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#a855f7', fontSize: '0.74rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                <Network size={14} />
                <span>Network Interfaces</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontFamily: 'monospace', fontSize: '0.72rem', color: '#cbd5e1' }}>
                <div>IP: <strong style={{ color: '#38bdf8' }}>{systemState.network.ip}</strong></div>
                <div>Gateway: {systemState.network.gateway}</div>
                <div>Ports: {systemState.network.listeningPorts.join(', ')}</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FILESYSTEM TREE */}
        {activeTab === 'fs' && (
          <div style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#cbd5e1' }}>
            <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>
              Virtual Directory Hierarchy (Root /):
            </div>
            {/* Tree Render */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingLeft: '0.5rem' }}>
              <div>📁 / <span style={{ color: '#64748b' }}>[drwxr-xr-x root]</span></div>
              <div style={{ paddingLeft: '1.25rem' }}>├── 📁 etc/ <span style={{ color: '#64748b' }}>[drwxr-xr-x root]</span></div>
              <div style={{ paddingLeft: '2.5rem' }}>├── 📄 passwd <span style={{ color: '#64748b' }}>[-rw-r--r-- root]</span></div>
              <div style={{ paddingLeft: '2.5rem' }}>└── 📄 hosts <span style={{ color: '#64748b' }}>[-rw-r--r-- root]</span></div>
              <div style={{ paddingLeft: '1.25rem' }}>├── 📁 home/ <span style={{ color: '#64748b' }}>[drwxr-xr-x root]</span></div>
              <div style={{ paddingLeft: '2.5rem' }}>└── 📁 forge/ <span style={{ color: '#38bdf8' }}>[drwxr-xr-x forge]</span> ★ CURRENT</div>
              <div style={{ paddingLeft: '3.75rem' }}>├── 📜 deploy.sh <span style={{ color: '#4ade80' }}>[-rwxr-xr-x forge]</span></div>
              <div style={{ paddingLeft: '3.75rem' }}>├── 📄 server.js <span style={{ color: '#64748b' }}>[-rw-r--r-- forge]</span></div>
              <div style={{ paddingLeft: '3.75rem' }}>└── 📄 notes.txt <span style={{ color: '#64748b' }}>[-rw-r--r-- forge]</span></div>
              <div style={{ paddingLeft: '1.25rem' }}>└── 📁 var/log/ <span style={{ color: '#64748b' }}>[drwxr-xr-x root]</span></div>
            </div>
          </div>
        )}

        {/* TAB 3: PROCESS MONITOR */}
        {activeTab === 'proc' && (
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: '0.74rem' }}>
              <thead>
                <tr style={{ color: '#64748b', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th style={{ padding: '0.35rem 0.5rem' }}>PID</th>
                  <th style={{ padding: '0.35rem 0.5rem' }}>USER</th>
                  <th style={{ padding: '0.35rem 0.5rem' }}>%CPU</th>
                  <th style={{ padding: '0.35rem 0.5rem' }}>%MEM</th>
                  <th style={{ padding: '0.35rem 0.5rem' }}>STATUS</th>
                  <th style={{ padding: '0.35rem 0.5rem' }}>COMMAND</th>
                </tr>
              </thead>
              <tbody>
                {systemState.processes.map((proc) => (
                  <tr key={proc.pid} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', color: proc.status === 'DEAD' ? '#475569' : '#cbd5e1' }}>
                    <td style={{ padding: '0.35rem 0.5rem', color: '#06b6d4' }}>{proc.pid}</td>
                    <td style={{ padding: '0.35rem 0.5rem' }}>{proc.user}</td>
                    <td style={{ padding: '0.35rem 0.5rem' }}>{proc.cpu.toFixed(1)}</td>
                    <td style={{ padding: '0.35rem 0.5rem' }}>{proc.mem.toFixed(1)}</td>
                    <td style={{ padding: '0.35rem 0.5rem' }}>
                      <span style={{ color: proc.status === 'R' ? '#4ade80' : proc.status === 'DEAD' ? '#ef4444' : '#f59e0b' }}>
                        {proc.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.35rem 0.5rem' }}>{proc.comm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: SYSTEMD SERVICES */}
        {activeTab === 'services' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {systemState.services.map((srv) => (
              <div
                key={srv.name}
                style={{
                  background: '#0d131f',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '8px',
                  padding: '0.65rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc', fontFamily: 'monospace' }}>
                    {srv.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{srv.desc}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.45rem',
                      borderRadius: '4px',
                      background: srv.status === 'ACTIVE' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: srv.status === 'ACTIVE' ? '#4ade80' : '#ef4444',
                      border: srv.status === 'ACTIVE' ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                    }}
                  >
                    ● {srv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: NETWORKING */}
        {activeTab === 'net' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
            <div style={{ background: '#0d131f', padding: '0.75rem', borderRadius: '8px' }}>
              <div style={{ color: '#06b6d4', fontWeight: 700, marginBottom: '0.35rem' }}>Layer 2 / 3 (Interface)</div>
              <div>Device: {systemState.network.interface}</div>
              <div>MAC: {systemState.network.mac}</div>
              <div>IPv4: {systemState.network.ip}</div>
            </div>
            <div style={{ background: '#0d131f', padding: '0.75rem', borderRadius: '8px' }}>
              <div style={{ color: '#10b981', fontWeight: 700, marginBottom: '0.35rem' }}>Routing & DNS</div>
              <div>Gateway: {systemState.network.gateway}</div>
              <div>Nameserver: {systemState.network.dns}</div>
            </div>
            <div style={{ background: '#0d131f', padding: '0.75rem', borderRadius: '8px' }}>
              <div style={{ color: '#f59e0b', fontWeight: 700, marginBottom: '0.35rem' }}>Listening Sockets</div>
              {systemState.network.listeningPorts.map((port) => (
                <div key={port}>TCP 0.0.0.0:{port} (LISTEN)</div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: PERMISSION MATRIX */}
        {activeTab === 'perms' && (
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
              POSIX 9-Bit Permission Matrix for active target: <strong style={{ color: '#f8fafc' }}>deploy.sh (-rwxr-xr-x / 755)</strong>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontFamily: 'monospace', fontSize: '0.76rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', color: '#64748b' }}>
                  <th style={{ padding: '0.4rem' }}>Target</th>
                  <th style={{ padding: '0.4rem' }}>Read (r / 4)</th>
                  <th style={{ padding: '0.4rem' }}>Write (w / 2)</th>
                  <th style={{ padding: '0.4rem' }}>Execute (x / 1)</th>
                  <th style={{ padding: '0.4rem' }}>Octal Sum</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#38bdf8' }}>
                  <td style={{ padding: '0.4rem', fontWeight: 700 }}>Owner (u: forge)</td>
                  <td style={{ color: '#4ade80' }}>✔ YES (4)</td>
                  <td style={{ color: '#4ade80' }}>✔ YES (2)</td>
                  <td style={{ color: '#4ade80' }}>✔ YES (1)</td>
                  <td style={{ fontWeight: 800 }}>7</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#a855f7' }}>
                  <td style={{ padding: '0.4rem', fontWeight: 700 }}>Group (g: forge)</td>
                  <td style={{ color: '#4ade80' }}>✔ YES (4)</td>
                  <td style={{ color: '#ef4444' }}>✘ NO (0)</td>
                  <td style={{ color: '#4ade80' }}>✔ YES (1)</td>
                  <td style={{ fontWeight: 800 }}>5</td>
                </tr>
                <tr style={{ color: '#f59e0b' }}>
                  <td style={{ padding: '0.4rem', fontWeight: 700 }}>Others (o: world)</td>
                  <td style={{ color: '#4ade80' }}>✔ YES (4)</td>
                  <td style={{ color: '#ef4444' }}>✘ NO (0)</td>
                  <td style={{ color: '#4ade80' }}>✔ YES (1)</td>
                  <td style={{ fontWeight: 800 }}>5</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
