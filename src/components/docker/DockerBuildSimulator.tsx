import React, { useState } from 'react';
import {
  Hammer,
  Zap,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRight,
  Shield,
  FileCode,
  HardDrive,
  Copy,
  Terminal,
  Activity
} from 'lucide-react';

interface BuildStep {
  id: string;
  stepNum: number;
  stage: 'builder' | 'runtime';
  instruction: string;
  args: string;
  status: 'hit' | 'miss' | 'executing' | 'pending';
  duration: string;
  size: string;
  cacheId: string;
}

const DEFAULT_BUILD_STEPS: BuildStep[] = [
  { id: 'b-01', stepNum: 1, stage: 'builder', instruction: 'FROM', args: 'golang:1.22-alpine AS builder', status: 'hit', duration: '0.0s', size: '280MB', cacheId: 'sha256:88a10f' },
  { id: 'b-02', stepNum: 2, stage: 'builder', instruction: 'WORKDIR', args: '/build', status: 'hit', duration: '0.0s', size: '0B', cacheId: 'sha256:77bc21' },
  { id: 'b-03', stepNum: 3, stage: 'builder', instruction: 'COPY', args: 'go.mod go.sum ./', status: 'hit', duration: '0.0s', size: '1.2KB', cacheId: 'sha256:99da12' },
  { id: 'b-04', stepNum: 4, stage: 'builder', instruction: 'RUN', args: 'go mod download', status: 'hit', duration: '0.1s', size: '42MB', cacheId: 'sha256:33de78' },
  { id: 'b-05', stepNum: 5, stage: 'builder', instruction: 'COPY', args: '. .', status: 'miss', duration: '0.4s', size: '8.4MB', cacheId: 'sha256:11bb02' },
  { id: 'b-06', stepNum: 6, stage: 'builder', instruction: 'RUN', args: 'CGO_ENABLED=0 go build -ldflags="-s -w" -o api', status: 'miss', duration: '2.8s', size: '18MB', cacheId: 'sha256:44cc33' },
  { id: 'b-07', stepNum: 7, stage: 'runtime', instruction: 'FROM', args: 'scratch', status: 'hit', duration: '0.0s', size: '0B', cacheId: 'scratch' },
  { id: 'b-08', stepNum: 8, stage: 'runtime', instruction: 'COPY', args: '--from=builder /build/api /api', status: 'miss', duration: '0.1s', size: '18MB', cacheId: 'sha256:ff0011' },
  { id: 'b-09', stepNum: 9, stage: 'runtime', instruction: 'ENTRYPOINT', args: '["/api"]', status: 'hit', duration: '0.0s', size: '0B', cacheId: 'sha256:ee9988' },
];

export const DockerBuildSimulator: React.FC = () => {
  const [steps, setSteps] = useState<BuildStep[]>(DEFAULT_BUILD_STEPS);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildDuration, setBuildDuration] = useState('3.4s');

  const triggerCleanBuild = () => {
    setIsBuilding(true);
    setSteps((prev) => prev.map((s) => ({ ...s, status: 'executing' })));

    setTimeout(() => {
      setSteps((prev) =>
        prev.map((s) => ({
          ...s,
          status: 'miss',
          duration: `${(Math.random() * 1.5 + 0.2).toFixed(1)}s`,
        }))
      );
      setIsBuilding(false);
      setBuildDuration('14.2s (No cache)');
    }, 800);
  };

  const triggerCachedBuild = () => {
    setIsBuilding(true);
    setTimeout(() => {
      setSteps(DEFAULT_BUILD_STEPS);
      setIsBuilding(false);
      setBuildDuration('0.6s (BuildKit Cache Hit)');
    }, 400);
  };

  const totalRuntimeSize = '18.0MB';
  const builderStageSize = '349.6MB';

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden font-sans">
      {/* Top Banner */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
            <Hammer className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              BuildKit Multi-Stage & Cache DAG Pipeline Simulator
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                DOCKER_BUILDKIT=1
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Parallel Graph Execution · Build Cache Trees · Multi-Stage Size Optimization
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerCleanBuild}
            disabled={isBuilding}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded transition-all cursor-pointer disabled:opacity-50"
          >
            docker build --no-cache
          </button>
          <button
            onClick={triggerCachedBuild}
            disabled={isBuilding}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded transition-all cursor-pointer disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5" /> docker build (Cached)
          </button>
        </div>
      </div>

      {/* Main Split: Multi-Stage Steps vs Output Size Comparison */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Left: Pipeline Steps */}
        <div className="w-full md:w-2/3 border-r border-slate-800 p-4 flex flex-col overflow-y-auto bg-slate-900/30">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-slate-400">BUILDKIT PIPELINE STAGES</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> Total Time: {buildDuration}
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {steps.map((step) => {
              const isHit = step.status === 'hit';
              const isMiss = step.status === 'miss';
              const isExec = step.status === 'executing';

              return (
                <div
                  key={step.id}
                  className={`p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                    isHit
                      ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                      : isMiss
                      ? 'bg-blue-950/40 border-blue-500/80 text-white'
                      : 'bg-amber-950/30 border-amber-600 animate-pulse text-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-slate-500 font-bold w-5">#{step.stepNum}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        step.stage === 'builder'
                          ? 'bg-purple-950/80 text-purple-300 border border-purple-800'
                          : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {step.stage.toUpperCase()}
                    </span>
                    <span className="font-bold text-blue-400 w-16">{step.instruction}</span>
                    <span className="text-xs truncate max-w-xs">{step.args}</span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] text-slate-500">{step.size}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded flex items-center gap-1 font-semibold ${
                        isHit
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : isMiss
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {isHit ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> CACHE HIT
                        </>
                      ) : isMiss ? (
                        <>
                          <XCircle className="w-3 h-3 text-rose-400" /> CACHE MISS
                        </>
                      ) : (
                        'EXECUTING...'
                      )}
                    </span>
                    <span className="text-[11px] text-slate-400 w-10 text-right">{step.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Multi-Stage Size Optimization & Distroless Visualizer */}
        <div className="w-full md:w-1/3 p-4 flex flex-col justify-between bg-slate-950 overflow-y-auto">
          <div>
            <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
              <span>IMAGE WEIGHT REDUCTION</span>
              <span className="text-emerald-400 font-bold">-95% Size</span>
            </div>

            {/* Comparison Cards */}
            <div className="space-y-3 font-mono text-xs">
              {/* Single stage without optimization */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center text-slate-400 mb-1">
                  <span>Single-Stage (Builder Included):</span>
                  <span className="text-rose-400 font-bold">{builderStageSize}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-full" />
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Contains Go SDK, compilers, header files, build tools. High CVE attack surface.
                </div>
              </div>

              {/* Multi-stage runtime */}
              <div className="p-3 bg-slate-900 rounded-lg border border-emerald-500/60 shadow-lg shadow-emerald-950/30">
                <div className="flex justify-between items-center text-white mb-1">
                  <span className="font-bold">Multi-Stage (Scratch / Minimal):</span>
                  <span className="text-emerald-400 font-bold">{totalRuntimeSize}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[5%]" />
                </div>
                <div className="text-[10px] text-emerald-300 mt-1">
                  Contains ONLY the statically compiled `/api` binary. Zero package managers, zero shell. Extremely secure!
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-900 rounded border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="text-blue-400 font-bold">Key Multi-Stage Pattern:</span>
            <p className="mt-1">
              `COPY --from=builder /build/api /api` extracts solely the final compiled artifact into a clean runtime stage,
              leaving all compiler dependencies behind.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
