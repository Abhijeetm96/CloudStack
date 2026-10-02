import React, { useState } from 'react';
import {
  Play,
  Square,
  RefreshCw,
  Trash2,
  Terminal,
  FileText,
  Search,
  Activity,
  Plus,
  Cpu,
  Server,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Flame
} from 'lucide-react';

export interface SimContainer {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'paused' | 'exited';
  ports: string;
  ip: string;
  memoryLimit: string;
  cpuQuota: string;
  uptime: string;
  env: string[];
  logs: string[];
}

const INITIAL_CONTAINERS: SimContainer[] = [
  {
    id: 'c-app-web-01',
    name: 'web-frontend',
    image: 'nginx:1.25-alpine',
    status: 'running',
    ports: '8080:80/tcp',
    ip: '172.18.0.2',
    memoryLimit: '256m',
    cpuQuota: '0.50',
    uptime: '14 minutes',
    env: ['NODE_ENV=production', 'PORT=80'],
    logs: [
      '[notice] 1#1: using the "epoll" event method',
      '[notice] 1#1: nginx/1.25.3 started successfully',
      '192.168.1.10 - GET /index.html 200 4521 "-" "Mozilla/5.0"',
      '192.168.1.10 - GET /assets/app.js 200 12891 "-" "Mozilla/5.0"',
    ],
  },
  {
    id: 'c-app-db-01',
    name: 'postgres-db',
    image: 'postgres:16-alpine',
    status: 'running',
    ports: '5432:5432/tcp',
    ip: '172.18.0.3',
    memoryLimit: '512m',
    cpuQuota: '1.00',
    uptime: '38 minutes',
    env: ['POSTGRES_DB=production_app', 'POSTGRES_USER=dockadmin'],
    logs: [
      'LOG:  starting PostgreSQL 16.1 on x86_64-pc-linux-musl',
      'LOG:  database system was shut down at 2026-10-02 08:30:12 UTC',
      'LOG:  database system is ready to accept connections',
      'LOG:  autovacuum launcher started',
    ],
  },
  {
    id: 'c-app-cache-01',
    name: 'redis-cache',
    image: 'redis:7.2-alpine',
    status: 'stopped',
    ports: '6379:6379/tcp',
    ip: '172.18.0.4',
    memoryLimit: '128m',
    cpuQuota: '0.25',
    uptime: 'Stopped (exited with code 0)',
    env: ['MAXMEMORY=100mb', 'MAXMEMORY_POLICY=allkeys-lru'],
    logs: [
      '1:M 02 Oct 2026 09:12:00.123 * Running mode=standalone, port=6379.',
      '1:M 02 Oct 2026 09:12:00.124 # Server initialized',
      '1:signal-handler (1727856720) Received SIGTERM scheduling shutdown...',
      '1:M 02 Oct 2026 09:45:10.991 # User requested shutdown...',
      '1:M 02 Oct 2026 09:45:10.992 * Saving DB to disk.',
      '1:M 02 Oct 2026 09:45:11.001 # Bye!',
    ],
  },
];

export const DockerContainerSimulator: React.FC = () => {
  const [containers, setContainers] = useState<SimContainer[]>(INITIAL_CONTAINERS);
  const [selectedId, setSelectedId] = useState<string>('c-app-web-01');
  const [activeTab, setActiveTab] = useState<'inspect' | 'logs' | 'exec'>('logs');
  const [execInput, setExecInput] = useState('');
  const [execHistory, setExecHistory] = useState<string[]>([
    '$ uname -a\nLinux 6.8.0-docker #1 SMP PREEMPT_DYNAMIC x86_64 Linux',
    '$ cat /etc/os-release | grep PRETTY_NAME\nPRETTY_NAME="Alpine Linux v3.19"',
  ]);
  const [newImage, setNewImage] = useState('nginx:alpine');
  const [newName, setNewName] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const selectedContainer = containers.find((c) => c.id === selectedId) || containers[0];

  const handleStart = (id: string) => {
    setContainers((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'running',
              uptime: 'Just started',
              logs: [...c.logs, `[system] Container started at ${new Date().toLocaleTimeString()}`],
            }
          : c
      )
    );
  };

  const handleStop = (id: string) => {
    setContainers((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'stopped',
              uptime: 'Stopped (exited with code 0)',
              logs: [...c.logs, `[system] Received SIGTERM - Container graceful stop completed.`],
            }
          : c
      )
    );
  };

  const handleRestart = (id: string) => {
    handleStop(id);
    setTimeout(() => handleStart(id), 400);
  };

  const handleKill = (id: string) => {
    setContainers((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'exited',
              uptime: 'Exited (code 137 SIGKILL)',
              logs: [...c.logs, `[kernel] Process terminated immediately via SIGKILL (kill -9).`],
            }
          : c
      )
    );
  };

  const handleRemove = (id: string) => {
    setContainers((prev) => prev.filter((c) => c.id !== id));
    if (selectedId === id && containers.length > 1) {
      setSelectedId(containers.find((c) => c.id !== id)!.id);
    }
  };

  const handleCreate = () => {
    const name = newName.trim() || `container-${Math.floor(Math.random() * 1000)}`;
    const newCont: SimContainer = {
      id: `c-${Date.now().toString(36)}`,
      name,
      image: newImage,
      status: 'running',
      ports: newImage.includes('postgres') ? '5433:5432/tcp' : '8088:80/tcp',
      ip: `172.18.0.${containers.length + 5}`,
      memoryLimit: '512m',
      cpuQuota: '1.00',
      uptime: 'Just started',
      env: ['ENV=production'],
      logs: [`[init] Starting container ${name} from image ${newImage}...`, `[ready] Process initialized.`],
    };
    setContainers((prev) => [...prev, newCont]);
    setSelectedId(newCont.id);
    setShowCreateModal(false);
    setNewName('');
  };

  const handleExecSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!execInput.trim()) return;
    const cmd = execInput.trim();
    let res = '';
    if (cmd === 'ps aux' || cmd === 'ps') {
      res = 'PID   USER     TIME  COMMAND\n    1 root      0:01  ' + selectedContainer.image.split(':')[0] + '\n   12 root      0:00  sh';
    } else if (cmd.startsWith('cat /etc/hosts')) {
      res = `127.0.0.1\tlocalhost\n::1\tlocalhost ip6-localhost ip6-loopback\n${selectedContainer.ip}\t${selectedContainer.name}`;
    } else if (cmd.startsWith('env')) {
      res = selectedContainer.env.join('\n') + `\nHOSTNAME=${selectedContainer.id.slice(0, 12)}\nHOME=/root`;
    } else if (cmd === 'df -h') {
      res = 'Filesystem      Size  Used Avail Use% Mounted on\noverlay          50G  4.2G   44G   9% /\ntmpfs            64M     0   64M   0% /dev';
    } else {
      res = `Executing '${cmd}' in container ${selectedContainer.name} [PID 1 isolated]`;
    }
    setExecHistory((prev) => [...prev, `$ ${cmd}\n${res}`]);
    setExecInput('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden font-sans">
      {/* Top Banner */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Docker Container Engine Simulator
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                dockerd · containerd · runc
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Host Linux Kernel · cgroups v2 · Namespaces (PID, NET, MNT, IPC, UTS)
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-blue-900/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Run New Container
        </button>
      </div>

      {/* Host Machine Visual Map */}
      <div className="p-4 bg-slate-900/40 border-b border-slate-800/80">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
          <span>Host Machine Isolation Topology</span>
          <span className="text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Docker Engine Active (bridge: 172.18.0.1)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {containers.map((cont) => {
            const isSelected = cont.id === selectedId;
            return (
              <div
                key={cont.id}
                onClick={() => setSelectedId(cont.id)}
                className={`relative p-3 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-950/40 border-blue-500 shadow-md shadow-blue-950/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        cont.status === 'running'
                          ? 'bg-emerald-500 animate-pulse'
                          : cont.status === 'stopped'
                          ? 'bg-slate-500'
                          : 'bg-rose-500'
                      }`}
                    />
                    <span className="font-semibold text-sm text-white">{cont.name}</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">
                    {cont.status.toUpperCase()}
                  </span>
                </div>

                <div className="text-xs text-slate-400 font-mono space-y-0.5">
                  <div className="truncate text-blue-300">Image: {cont.image}</div>
                  <div className="text-[11px]">Ports: {cont.ports}</div>
                  <div className="text-[11px]">IP: {cont.ip} · Mem: {cont.memoryLimit}</div>
                </div>

                {isSelected && (
                  <div className="absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 bg-blue-500 rounded-full ring-4 ring-blue-500/20" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Container Controller & Inspection Panel */}
      {selectedContainer && (
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          {/* Left: Container Detail & Operations */}
          <div className="w-full md:w-80 border-r border-slate-800 p-4 flex flex-col justify-between overflow-y-auto bg-slate-900/30">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400">CONTAINER CONTROLS</span>
                <span className="text-[11px] font-mono text-blue-400 truncate max-w-[120px]">
                  {selectedContainer.id}
                </span>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {selectedContainer.status !== 'running' ? (
                  <button
                    onClick={() => handleStart(selectedContainer.id)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600/90 hover:bg-emerald-500 text-white rounded text-xs font-medium cursor-pointer transition-all"
                  >
                    <Play className="w-3.5 h-3.5" /> Start
                  </button>
                ) : (
                  <button
                    onClick={() => handleStop(selectedContainer.id)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-600/90 hover:bg-amber-500 text-white rounded text-xs font-medium cursor-pointer transition-all"
                  >
                    <Square className="w-3.5 h-3.5" /> Stop (SIGTERM)
                  </button>
                )}

                <button
                  onClick={() => handleRestart(selectedContainer.id)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium cursor-pointer transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Restart
                </button>

                <button
                  onClick={() => handleKill(selectedContainer.id)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-950/50 hover:bg-rose-900/80 text-rose-300 border border-rose-800/40 rounded text-xs font-medium cursor-pointer transition-all"
                >
                  <Flame className="w-3.5 h-3.5" /> Kill (SIGKILL)
                </button>

                <button
                  onClick={() => handleRemove(selectedContainer.id)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 bg-red-600/90 hover:bg-red-500 text-white rounded text-xs font-medium cursor-pointer transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" /> docker rm
                </button>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-2 text-xs font-mono bg-slate-950/80 p-3 rounded border border-slate-800">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Name:</span>
                  <span className="text-slate-200">{selectedContainer.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Status:</span>
                  <span className={selectedContainer.status === 'running' ? 'text-emerald-400' : 'text-slate-400'}>
                    {selectedContainer.status}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Image:</span>
                  <span className="text-blue-300 truncate max-w-[150px]">{selectedContainer.image}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">IP Address:</span>
                  <span className="text-amber-300">{selectedContainer.ip}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">CPU Quota:</span>
                  <span className="text-slate-300">{selectedContainer.cpuQuota} cores</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Memory Limit:</span>
                  <span className="text-slate-300">{selectedContainer.memoryLimit}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-400" />
              Isolated under cgroup: /docker/{selectedContainer.id.slice(0, 8)}
            </div>
          </div>

          {/* Right: Output Tabs (Logs, Exec, Inspect) */}
          <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
            {/* Tab header */}
            <div className="flex items-center border-b border-slate-800 px-4 bg-slate-900/60">
              <button
                onClick={() => setActiveTab('logs')}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'logs'
                    ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> docker logs
              </button>
              <button
                onClick={() => setActiveTab('exec')}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'exec'
                    ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> docker exec -it
              </button>
              <button
                onClick={() => setActiveTab('inspect')}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'inspect'
                    ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Search className="w-3.5 h-3.5" /> docker inspect
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-slate-950">
              {activeTab === 'logs' && (
                <div className="space-y-1.5">
                  <div className="text-slate-500 text-[11px] mb-2">
                    # STDOUT / STDERR stream for container {selectedContainer.name}
                  </div>
                  {selectedContainer.logs.map((line, i) => (
                    <div key={i} className="text-slate-300 leading-relaxed break-all">
                      <span className="text-slate-600 mr-2">[{i + 1}]</span>
                      {line}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'exec' && (
                <div className="h-full flex flex-col justify-between">
                  <div className="space-y-3 overflow-y-auto mb-4">
                    <div className="text-emerald-400 text-[11px]">
                      Connected to {selectedContainer.name} (sh session - PID 1 child)
                    </div>
                    {execHistory.map((item, idx) => (
                      <div key={idx} className="whitespace-pre-wrap text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                        {item}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleExecSubmit} className="flex gap-2">
                    <div className="flex-1 flex items-center bg-slate-900 border border-slate-700 rounded px-2.5">
                      <span className="text-blue-400 mr-2 font-bold">$</span>
                      <input
                        type="text"
                        value={execInput}
                        onChange={(e) => setExecInput(e.target.value)}
                        placeholder="Try: ps aux, cat /etc/hosts, env, df -h"
                        className="w-full bg-transparent py-2 text-white outline-none font-mono text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer transition-all"
                    >
                      Execute
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'inspect' && (
                <pre className="text-emerald-400 bg-slate-900/80 p-3 rounded border border-slate-800/80 overflow-x-auto">
                  {JSON.stringify(
                    {
                      Id: selectedContainer.id,
                      Created: '2026-10-02T08:00:00.000Z',
                      Path: '/entrypoint.sh',
                      Args: [selectedContainer.image.split(':')[0]],
                      State: {
                        Status: selectedContainer.status,
                        Running: selectedContainer.status === 'running',
                        Paused: false,
                        Restarting: false,
                        OOMKilled: false,
                        Dead: false,
                        Pid: selectedContainer.status === 'running' ? 24510 : 0,
                        ExitCode: 0,
                      },
                      Image: selectedContainer.image,
                      HostConfig: {
                        Memory: selectedContainer.memoryLimit,
                        NanoCpus: 500000000,
                        PortBindings: { '80/tcp': [{ HostPort: '8080' }] },
                        NetworkMode: 'bridge',
                      },
                      NetworkSettings: {
                        IPAddress: selectedContainer.ip,
                        Gateway: '172.18.0.1',
                        MacAddress: '02:42:ac:12:00:02',
                      },
                    },
                    null,
                    2
                  )}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal for Creating new container */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-5 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Play className="w-4 h-4 text-blue-400" /> Run New Container (docker run -d)
            </h3>

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Image Reference</label>
                <select
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded p-2 text-xs font-mono"
                >
                  <option value="nginx:alpine">nginx:alpine (Web Server)</option>
                  <option value="postgres:16-alpine">postgres:16-alpine (Database)</option>
                  <option value="redis:7-alpine">redis:7-alpine (In-Memory Cache)</option>
                  <option value="node:20-alpine">node:20-alpine (JavaScript Engine)</option>
                  <option value="python:3.11-slim">python:3.11-slim (Python Web App)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Container Name (--name)</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. payment-service"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded p-2 text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer"
              >
                docker run -d {newImage}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
