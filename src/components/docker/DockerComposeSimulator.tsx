import React, { useState } from 'react';
import {
  Layers,
  Play,
  Square,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowDown,
  Terminal,
  FileCode,
  Activity,
  Database,
  Globe,
  Server,
  Zap
} from 'lucide-react';

interface ComposeService {
  name: string;
  image: string;
  ports: string;
  dependsOn: string[];
  status: 'stopped' | 'starting' | 'healthy' | 'running';
  healthcheck: string;
}

const INITIAL_SERVICES: ComposeService[] = [
  {
    name: 'postgres',
    image: 'postgres:16-alpine',
    ports: '5432:5432',
    dependsOn: [],
    status: 'healthy',
    healthcheck: 'pg_isready -U postgres',
  },
  {
    name: 'redis',
    image: 'redis:7.2-alpine',
    ports: '6379:6379',
    dependsOn: [],
    status: 'healthy',
    healthcheck: 'redis-cli ping',
  },
  {
    name: 'backend',
    image: 'node:20-alpine',
    ports: '4000:4000',
    dependsOn: ['postgres', 'redis'],
    status: 'running',
    healthcheck: 'curl -f http://localhost:4000/health || exit 1',
  },
  {
    name: 'frontend',
    image: 'nginx:1.25-alpine',
    ports: '80:80',
    dependsOn: ['backend'],
    status: 'running',
    healthcheck: 'curl -f http://localhost:80/ || exit 1',
  },
];

const DEFAULT_COMPOSE_YAML = `services:
  frontend:
    image: nginx:1.25-alpine
    ports:
      - "80:80"
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - app-net

  backend:
    image: node:20-alpine
    ports:
      - "4000:4000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    environment:
      DATABASE_URL: postgres://user:pass@postgres:5432/app
      REDIS_URL: redis://redis:6379
    networks:
      - app-net

  postgres:
    image: postgres:16-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - app-net

  redis:
    image: redis:7.2-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
    networks:
      - app-net

volumes:
  db-data:

networks:
  app-net:
    driver: bridge`;

export const DockerComposeSimulator: React.FC = () => {
  const [yamlContent, setYamlContent] = useState(DEFAULT_COMPOSE_YAML);
  const [services, setServices] = useState<ComposeService[]>(INITIAL_SERVICES);
  const [isRunning, setIsRunning] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    'Network app-net Created',
    'Volume db-data Created',
    'Container postgres Created',
    'Container redis Created',
    'Container postgres Starting...',
    'Container redis Starting...',
    'Container postgres Healthy (pg_isready OK)',
    'Container redis Healthy (PONG)',
    'Container backend Starting...',
    'Container backend Started',
    'Container frontend Starting...',
    'Container frontend Started',
  ]);

  const handleComposeUp = () => {
    setIsRunning(true);
    setServices((prev) =>
      prev.map((s) => ({ ...s, status: 'starting' }))
    );
    setLogs(['[+] Running 4/4', '✔ Network app-net Created', '✔ Volume db-data Created']);

    // Step 1: Start DB & Redis
    setTimeout(() => {
      setServices((prev) =>
        prev.map((s) =>
          s.name === 'postgres' || s.name === 'redis' ? { ...s, status: 'healthy' } : s
        )
      );
      setLogs((l) => [
        ...l,
        '✔ Container postgres Healthy (pg_isready)',
        '✔ Container redis Healthy (PONG)',
      ]);
    }, 600);

    // Step 2: Start Backend
    setTimeout(() => {
      setServices((prev) =>
        prev.map((s) => (s.name === 'backend' ? { ...s, status: 'running' } : s))
      );
      setLogs((l) => [...l, '✔ Container backend Started (listening on :4000)']);
    }, 1200);

    // Step 3: Start Frontend
    setTimeout(() => {
      setServices((prev) =>
        prev.map((s) => (s.name === 'frontend' ? { ...s, status: 'running' } : s))
      );
      setLogs((l) => [...l, '✔ Container frontend Started (listening on :80)', 'All services operational!']);
    }, 1800);
  };

  const handleComposeDown = () => {
    setIsRunning(false);
    setServices((prev) => prev.map((s) => ({ ...s, status: 'stopped' })));
    setLogs((l) => [
      ...l,
      'Stopping frontend...',
      'Stopping backend...',
      'Stopping redis...',
      'Stopping postgres...',
      'Removing containers...',
      'Network app-net removed.',
    ]);
  };

  const getServiceStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'running':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {status.toUpperCase()}
          </span>
        );
      case 'starting':
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <Activity className="w-3 h-3 animate-spin" /> STARTING
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            STOPPED
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden font-sans">
      {/* Top Banner */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Docker Compose Multi-Container Orchestration Simulator
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                compose.yaml v2
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Dependency Graph (depends_on: condition) · Service Discovery · Volume & Network Wiring
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isRunning ? (
            <button
              onClick={handleComposeDown}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded transition-all cursor-pointer"
            >
              <Square className="w-3.5 h-3.5" /> docker compose down
            </button>
          ) : (
            <button
              onClick={handleComposeUp}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" /> docker compose up -d
            </button>
          )}
        </div>
      </div>

      {/* Main Split: YAML Editor vs Visual Dependency Graph */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Left: compose.yaml & Terminal */}
        <div className="w-full md:w-1/2 border-r border-slate-800 p-4 flex flex-col justify-between bg-slate-900/20">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-blue-400" /> compose.yaml
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Declarative Multi-Service Spec</span>
            </div>

            <textarea
              value={yamlContent}
              onChange={(e) => setYamlContent(e.target.value)}
              rows={14}
              className="w-full font-mono text-xs p-3 bg-slate-950 border border-slate-700 rounded-lg text-blue-200 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
            />
          </div>

          {/* Compose Logs */}
          <div className="mt-4 bg-slate-950 rounded-lg border border-slate-800 p-3 font-mono text-[11px]">
            <div className="text-slate-400 flex items-center gap-1.5 pb-2 border-b border-slate-800 mb-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" /> docker compose logs -f
            </div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {logs.map((log, i) => (
                <div key={i} className="text-slate-300">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Visual Architecture Topology */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between bg-slate-950 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Server className="w-4 h-4 text-emerald-400" /> Service Dependency Hierarchy
              </span>
              <span className="text-xs font-mono text-blue-400">Network: app-net (bridge)</span>
            </div>

            {/* Interactive Graph Box */}
            <div className="space-y-3 font-mono">
              {/* Frontend Node */}
              <div className="p-3.5 bg-slate-900 border border-slate-700 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-sm text-white">frontend</span>
                    <span className="text-xs text-slate-400">(Nginx Reverse Proxy)</span>
                  </div>
                  {getServiceStatusBadge(services.find((s) => s.name === 'frontend')?.status || 'stopped')}
                </div>
                <div className="text-xs text-slate-400 flex justify-between">
                  <span>Host Port: 80 -&gt; 80</span>
                  <span className="text-blue-300">depends_on: [backend: service_healthy]</span>
                </div>
              </div>

              <div className="flex justify-center text-blue-500">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Backend Node */}
              <div className="p-3.5 bg-slate-900 border border-slate-700 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-sm text-white">backend</span>
                    <span className="text-xs text-slate-400">(Node.js API)</span>
                  </div>
                  {getServiceStatusBadge(services.find((s) => s.name === 'backend')?.status || 'stopped')}
                </div>
                <div className="text-xs text-slate-400 flex justify-between">
                  <span>Port: 4000:4000</span>
                  <span className="text-blue-300">depends_on: [postgres, redis]</span>
                </div>
              </div>

              <div className="flex justify-center text-blue-500">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Storage & Cache Nodes */}
              <div className="grid grid-cols-2 gap-3">
                {/* Postgres */}
                <div className="p-3.5 bg-slate-900 border border-slate-700 rounded-xl shadow-md">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-blue-400" />
                      <span className="font-bold text-sm text-white">postgres</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    {getServiceStatusBadge(services.find((s) => s.name === 'postgres')?.status || 'stopped')}
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-0.5">
                    <div>Port: 5432</div>
                    <div className="text-emerald-400">Volume: db-data</div>
                  </div>
                </div>

                {/* Redis */}
                <div className="p-3.5 bg-slate-900 border border-slate-700 rounded-xl shadow-md">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-rose-400" />
                      <span className="font-bold text-sm text-white">redis</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    {getServiceStatusBadge(services.find((s) => s.name === 'redis')?.status || 'stopped')}
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-0.5">
                    <div>Port: 6379</div>
                    <div className="text-amber-300">In-Memory Cache</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-900 rounded border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="text-emerald-400 font-bold">Pro Tip: </span>
            Always use <code className="text-blue-300">condition: service_healthy</code> instead of simple
            <code className="text-blue-300"> depends_on</code> so dependent containers wait until the database is truly ready
            to accept connections, preventing startup crashes.
          </div>
        </div>
      </div>
    </div>
  );
};
