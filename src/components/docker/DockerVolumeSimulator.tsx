import React, { useState } from 'react';
import {
  Database,
  HardDrive,
  Trash2,
  Plus,
  RefreshCw,
  Folder,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowDown
} from 'lucide-react';

interface StorageType {
  mode: 'named-volume' | 'bind-mount' | 'tmpfs' | 'ephemeral';
  title: string;
  hostPath: string;
  containerPath: string;
  isReadOnly: boolean;
}

interface StoredFile {
  name: string;
  content: string;
  size: string;
}

export const DockerVolumeSimulator: React.FC = () => {
  const [mountMode, setMountMode] = useState<'named-volume' | 'bind-mount' | 'tmpfs' | 'ephemeral'>('named-volume');
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [containerAlive, setContainerAlive] = useState(true);

  // Storage files
  const [persistedFiles, setPersistedFiles] = useState<StoredFile[]>([
    { name: 'app.db', content: 'SQLite format 3: customers table, 14,200 rows', size: '2.4MB' },
    { name: 'audit_log.json', content: '{"timestamp": "2026-10-02T08:00:00Z", "event": "ORDER_PLACED"}', size: '18KB' },
  ]);

  const [ephemeralFiles, setEphemeralFiles] = useState<StoredFile[]>([
    { name: 'session_cache.tmp', content: 'auth_tokens_in_memory_only', size: '4KB' },
  ]);

  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [writeError, setWriteError] = useState<string | null>(null);

  const handleWriteFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!containerAlive) {
      setWriteError('Error: Cannot write into dead container. Container has exited.');
      return;
    }

    if (isReadOnly && (mountMode === 'named-volume' || mountMode === 'bind-mount')) {
      setWriteError('Error response from daemon: Read-only file system (EROFS: Operation not permitted :ro).');
      return;
    }

    if (!newFileName.trim()) return;

    const file: StoredFile = {
      name: newFileName.trim(),
      content: newFileContent || 'Sample data written to disk',
      size: `${(Math.random() * 10 + 1).toFixed(1)}KB`,
    };

    if (mountMode === 'ephemeral' || mountMode === 'tmpfs') {
      setEphemeralFiles((prev) => [...prev, file]);
    } else {
      setPersistedFiles((prev) => [...prev, file]);
    }

    setNewFileName('');
    setNewFileContent('');
    setWriteError(null);
  };

  const handleKillAndRecreateContainer = () => {
    setContainerAlive(false);
    setTimeout(() => {
      // Ephemeral and tmpfs data is lost on container destruction!
      setEphemeralFiles([]);
      setContainerAlive(true);
      setWriteError(null);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden font-sans">
      {/* Top Banner */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Docker Volume & Persistence Simulator
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Data Lifecycle
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Named Volumes vs Host Bind Mounts vs tmpfs in-memory vs Ephemeral Container Layer
            </p>
          </div>
        </div>

        <button
          onClick={handleKillAndRecreateContainer}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded transition-all cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" /> Recreate Container (docker rm -f && docker run)
        </button>
      </div>

      {/* Mode Selector */}
      <div className="p-3 bg-slate-900/40 border-b border-slate-800 flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-slate-400 mr-2">STORAGE STRATEGY:</span>
        <button
          onClick={() => {
            setMountMode('named-volume');
            setWriteError(null);
          }}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
            mountMode === 'named-volume'
              ? 'bg-blue-600 text-white font-semibold'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Named Volume (-v db_data:/var/lib/data)
        </button>

        <button
          onClick={() => {
            setMountMode('bind-mount');
            setWriteError(null);
          }}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
            mountMode === 'bind-mount'
              ? 'bg-blue-600 text-white font-semibold'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Bind Mount (-v /host/app:/container/app)
        </button>

        <button
          onClick={() => {
            setMountMode('tmpfs');
            setWriteError(null);
          }}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
            mountMode === 'tmpfs'
              ? 'bg-blue-600 text-white font-semibold'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          tmpfs Mount (--tmpfs /dev/shm)
        </button>

        <button
          onClick={() => {
            setMountMode('ephemeral');
            setWriteError(null);
          }}
          className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
            mountMode === 'ephemeral'
              ? 'bg-rose-950/70 border border-rose-600 text-rose-300 font-semibold'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          No Volume (Ephemeral Container Layer)
        </button>

        <label className="flex items-center gap-1.5 ml-auto text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={isReadOnly}
            onChange={(e) => setIsReadOnly(e.target.checked)}
            className="rounded bg-slate-800 border-slate-700"
          />
          <Lock className="w-3 h-3 text-amber-400" /> Read-Only (:ro)
        </label>
      </div>

      {/* Main Visual: Storage Pipeline */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Left: Storage Flow & Interactive File Creator */}
        <div className="w-full md:w-1/2 border-r border-slate-800 p-4 flex flex-col justify-between bg-slate-900/30 overflow-y-auto">
          <div>
            <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
              <span>STORAGE TOPOLOGY FLOW</span>
              <span className="text-[11px] text-blue-400">
                {mountMode === 'named-volume' && 'Managed by Docker Engine (/var/lib/docker/volumes)'}
                {mountMode === 'bind-mount' && 'Direct Host Filesystem Binding'}
                {mountMode === 'tmpfs' && 'Host RAM-backed Temporary Filesystem'}
                {mountMode === 'ephemeral' && 'Copy-on-Write Layer (Lost on container deletion!)'}
              </span>
            </div>

            {/* Architecture diagram boxes */}
            <div className="space-y-3 font-mono text-xs">
              {/* Host Machine Layer */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between text-blue-400 font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4" /> HOST FILESYSTEM
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {mountMode === 'named-volume' && '/var/lib/docker/volumes/pgdata/_data'}
                    {mountMode === 'bind-mount' && '/home/user/project/src'}
                    {mountMode === 'tmpfs' && 'Host RAM (tmpfs)'}
                    {mountMode === 'ephemeral' && '/var/lib/docker/overlay2/<id>/diff'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {mountMode === 'ephemeral' ? (
                    <span className="text-rose-400 font-bold">
                      Warning: No host persistence! When container is removed, this diff directory is deleted.
                    </span>
                  ) : (
                    <span>
                      Host persistent storage survives container crash, upgrade, and removal.
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-center text-slate-600">
                <ArrowDown className="w-4 h-4" />
              </div>

              {/* Container Layer */}
              <div
                className={`p-3 rounded-lg border transition-all ${
                  containerAlive
                    ? 'bg-slate-900 border-emerald-500/60'
                    : 'bg-rose-950/40 border-rose-600/80 animate-pulse'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold flex items-center gap-1.5 text-white">
                    <Folder className="w-4 h-4 text-emerald-400" /> CONTAINER MOUNT POINT
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                      containerAlive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {containerAlive ? 'CONTAINER RUNNING (PID 1)' : 'CONTAINER TERMINATED'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300">
                  Mounted inside container at: <span className="text-blue-300">/var/lib/postgresql/data</span>
                  {isReadOnly && <span className="text-amber-400 ml-2">[READ ONLY :ro]</span>}
                </div>
              </div>
            </div>

            {/* Write Form */}
            <form onSubmit={handleWriteFile} className="mt-5 p-3.5 bg-slate-900/80 rounded-lg border border-slate-800 space-y-2.5">
              <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-blue-400" /> Write File into Mounted Directory
              </div>

              <div>
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="File name (e.g. orders_oct2026.sqlite)"
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono text-white"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={newFileContent}
                  onChange={(e) => setNewFileContent(e.target.value)}
                  placeholder="File content payload"
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs font-mono text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer transition-all"
              >
                Write to Container Storage
              </button>

              {writeError && (
                <div className="p-2 bg-rose-950/50 border border-rose-500/50 rounded text-rose-300 text-xs font-mono flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>{writeError}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right: Persisted vs Lost Storage Explorer */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between bg-slate-950 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" /> Stored Files on Disk
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                {mountMode === 'ephemeral' || mountMode === 'tmpfs' ? (
                  <span className="text-amber-400">Ephemeral Storage</span>
                ) : (
                  <span className="text-emerald-400">Persistent Storage</span>
                )}
              </span>
            </div>

            {/* File List */}
            <div className="space-y-2">
              {(mountMode === 'ephemeral' || mountMode === 'tmpfs' ? ephemeralFiles : persistedFiles).length === 0 ? (
                <div className="p-6 text-center text-slate-500 font-mono text-xs border border-dashed border-slate-800 rounded-lg">
                  No files found! Data was wiped when the container was destroyed because no volume was mounted.
                </div>
              ) : (
                (mountMode === 'ephemeral' || mountMode === 'tmpfs' ? ephemeralFiles : persistedFiles).map((file, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-900/80 rounded border border-slate-800 flex items-start justify-between font-mono text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-blue-400" /> {file.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{file.content}</div>
                    </div>
                    <span className="text-[10px] text-slate-500 px-2 py-0.5 bg-slate-800 rounded">
                      {file.size}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Golden Rule Callout */}
          <div className="mt-4 p-3 bg-slate-900 rounded border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Persistence Guarantee:
            </div>
            <p>
              Production databases (PostgreSQL, MySQL, MongoDB, Redis RDB) MUST mount a Docker Volume.
              Never write state directly into the container filesystem layer!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
