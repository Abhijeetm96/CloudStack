import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  AlertOctagon,
  Zap,
  HardDrive,
  Copy,
  Terminal,
  RefreshCw,
  FileCode,
  ArrowDown
} from 'lucide-react';

interface ImageLayerItem {
  id: string;
  instruction: string;
  command: string;
  size: string;
  status: 'cached' | 'built' | 'failed';
  hash: string;
}

const DEFAULT_DOCKERFILE = `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`;

export const DockerImageSimulator: React.FC = () => {
  const [dockerfileText, setDockerfileText] = useState(DEFAULT_DOCKERFILE);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [layers, setLayers] = useState<ImageLayerItem[]>([
    { id: 'l-01', instruction: 'FROM', command: 'node:20-alpine', size: '178MB', status: 'cached', hash: 'sha256:d8b2e34fa091' },
    { id: 'l-02', instruction: 'WORKDIR', command: '/app', size: '0B', status: 'cached', hash: 'sha256:4c18ab93ec71' },
    { id: 'l-03', instruction: 'COPY', command: 'package*.json ./', size: '4.2KB', status: 'cached', hash: 'sha256:7f01ca8b329a' },
    { id: 'l-04', instruction: 'RUN', command: 'npm install --production', size: '38.4MB', status: 'cached', hash: 'sha256:91bc7829ac40' },
    { id: 'l-05', instruction: 'COPY', command: '. .', size: '1.2MB', status: 'cached', hash: 'sha256:e320f78199b0' },
    { id: 'l-06', instruction: 'CMD', command: '["node", "server.js"]', size: '0B', status: 'cached', hash: 'sha256:56a1004bc8d1' }
  ]);

  const [cacheBusterIndex, setCacheBusterIndex] = useState<number | null>(null);

  const simulateBuild = (bustIndex?: number) => {
    setIsBuilding(true);
    setBuildLogs(['[+] Building 0.0s (0/7) FINISHED', '[+] [internal] load build definition from Dockerfile']);

    const lines = dockerfileText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.startsWith('#'));

    const bIndex = bustIndex !== undefined ? bustIndex : (cacheBusterIndex ?? -1);

    setTimeout(() => {
      const newLayers: ImageLayerItem[] = lines.map((line, idx) => {
        const parts = line.split(' ');
        const instruction = parts[0].toUpperCase();
        const cmd = parts.slice(1).join(' ');
        const isMiss = bIndex >= 0 && idx >= bIndex;

        let size = '0B';
        if (instruction === 'FROM') size = '178MB';
        else if (instruction === 'RUN' && cmd.includes('install')) size = '38.4MB';
        else if (instruction === 'COPY' && cmd.includes('.')) size = '1.2MB';
        else if (instruction === 'COPY') size = '4.2KB';

        return {
          id: `layer-${idx + 1}`,
          instruction,
          command: cmd,
          size,
          status: isMiss ? 'built' : 'cached',
          hash: `sha256:${Math.random().toString(16).slice(2, 14)}`,
        };
      });

      setLayers(newLayers);
      setIsBuilding(false);

      const logLines = newLayers.map((l, i) =>
        `#${i + 1} [${l.instruction} ${l.command}] ${
          l.status === 'cached' ? 'CACHED' : 'DONE ' + l.size + ' in 1.4s'
        }`
      );
      logLines.push('Successfully built sha256:a9f82d1c045b');
      logLines.push('Successfully tagged my-node-app:latest');
      setBuildLogs(logLines);
    }, 600);
  };

  const handleSimulateCodeChange = () => {
    // Invalidate from COPY . .
    setCacheBusterIndex(4);
    simulateBuild(4);
  };

  const handleSimulateDependencyChange = () => {
    // Invalidate from COPY package*.json
    setCacheBusterIndex(2);
    simulateBuild(2);
  };

  const totalSize = '217.6MB';

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden font-sans">
      {/* Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Docker Image & Layer Cache Simulator
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                BuildKit Engine
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Read-Only Immutable Layers · OverlayFS Content Addressable Hashes · Cache Tree
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCacheBusterIndex(null);
              simulateBuild(-1);
            }}
            disabled={isBuilding}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isBuilding ? 'animate-spin' : ''}`} /> docker build -t my-app .
          </button>
        </div>
      </div>

      {/* Main Split: Dockerfile Editor vs Visual Layer Stack */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Left: Dockerfile Editor & Cache Trigger Actions */}
        <div className="w-full md:w-1/2 border-r border-slate-800 p-4 flex flex-col justify-between bg-slate-900/20">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-blue-400" /> Dockerfile
              </span>
              <span className="text-[11px] text-slate-500">Edit or trigger layer cache invalidation</span>
            </div>

            <textarea
              value={dockerfileText}
              onChange={(e) => setDockerfileText(e.target.value)}
              rows={9}
              className="w-full font-mono text-xs p-3 bg-slate-950 border border-slate-700 rounded-lg text-emerald-300 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
            />

            {/* Invalidation Scenarios */}
            <div className="mt-4">
              <span className="text-xs font-mono text-slate-400 block mb-2">CACHE MECHANICS DEMONSTRATION</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleSimulateCodeChange}
                  className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded text-left transition-all cursor-pointer"
                >
                  <div className="text-xs font-semibold text-blue-300 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" /> Modify app.js
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Invalidates only `COPY . .`. npm dependencies reuse 100% cache. Fast!
                  </div>
                </button>

                <button
                  onClick={handleSimulateDependencyChange}
                  className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded text-left transition-all cursor-pointer"
                >
                  <div className="text-xs font-semibold text-amber-300 flex items-center gap-1">
                    <AlertOctagon className="w-3 h-3 text-rose-400" /> Edit package.json
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Busts cache at `COPY package*.json`. Forces `npm install` to re-run.
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Terminal Logs */}
          <div className="mt-4 bg-slate-950 rounded-lg border border-slate-800 p-3 font-mono text-[11px]">
            <div className="text-slate-400 flex items-center gap-1.5 pb-2 border-b border-slate-800 mb-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" /> BuildKit Console Output
            </div>
            <div className="space-y-1 max-h-36 overflow-y-auto">
              {buildLogs.map((log, i) => (
                <div
                  key={i}
                  className={
                    log.includes('CACHED')
                      ? 'text-emerald-400'
                      : log.includes('DONE')
                      ? 'text-blue-300'
                      : 'text-slate-400'
                  }
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Immutable Layer Stack Visualizer */}
        <div className="w-full md:w-1/2 p-4 flex flex-col bg-slate-950 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" /> Image Layer Graph (Read-Only Stack)
            </span>
            <span className="text-xs font-mono text-blue-400 flex items-center gap-1">
              <HardDrive className="w-3.5 h-3.5" /> Total Size: {totalSize}
            </span>
          </div>

          <div className="space-y-2 flex-1">
            {/* Top Writable Container Layer representation */}
            <div className="p-3 rounded-lg border border-dashed border-amber-500/60 bg-amber-950/20 text-xs font-mono">
              <div className="flex items-center justify-between text-amber-300 font-semibold mb-1">
                <span>[Writable Container Layer] (R/W - Copy-on-Write)</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-amber-500/20 rounded">Created on docker run</span>
              </div>
              <p className="text-[11px] text-amber-400/80">
                Container runtime changes (e.g. /tmp files, logs) live here. Destroyed when container is deleted.
              </p>
            </div>

            <div className="flex justify-center text-slate-600">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Read-Only Image Layers */}
            {layers.slice().reverse().map((layer, idx) => {
              const isCached = layer.status === 'cached';
              return (
                <div
                  key={layer.id}
                  className={`p-3 rounded-lg border transition-all ${
                    isCached
                      ? 'bg-slate-900/90 border-slate-700/80'
                      : 'bg-blue-950/40 border-blue-500/80 shadow-md shadow-blue-950/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs px-2 py-0.5 bg-slate-800 rounded text-blue-400 border border-slate-700">
                        {layer.instruction}
                      </span>
                      <span className="text-xs font-mono text-white font-medium truncate max-w-[200px]">
                        {layer.command}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded flex items-center gap-1 ${
                          isCached
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}
                      >
                        {isCached ? <CheckCircle2 className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                        {isCached ? 'CACHE HIT' : 'REBUILT'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{layer.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-800/80">
                    <span>Hash: {layer.hash}</span>
                    <span>OverlayFS: LowerDir {layers.length - idx}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
