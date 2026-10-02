import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, Trash2, HelpCircle } from 'lucide-react';

interface HistoryEntry {
  command: string;
  output: string;
  isError?: boolean;
}

const WELCOME_BANNER = `Docker Engine Community v26.1.4 (Linux 6.8.0-docker x86_64)
Type 'docker --help' or 'help' to see available commands.
Try: 'docker run -d -p 8080:80 nginx', 'docker ps', 'docker images', 'docker stats'`;

export const DockerTerminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: '', output: WELCOME_BANNER }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [pastCommands, setPastCommands] = useState<string[]>([]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      setHistory((prev) => [...prev, { command: '', output: '' }]);
      return;
    }

    setPastCommands((prev) => [...prev, trimmed]);
    setCmdIndex(-1);

    const parts = trimmed.split(/\s+/);
    const main = parts[0].toLowerCase();
    const sub = parts[1]?.toLowerCase();

    let output = '';
    let isError = false;

    if (main === 'clear') {
      setHistory([]);
      return;
    }

    if (main === 'help' || (main === 'docker' && (!sub || sub === '--help' || sub === 'help'))) {
      output = `Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Common Commands:
  run         Create and run a new container from an image
  ps          List containers
  images      List images
  build       Build an image from a Dockerfile
  pull        Download an image from a registry
  push        Upload an image to a registry
  stop        Stop one or more running containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  logs        Fetch the logs of a container
  exec        Execute a command in a running container
  network     Manage networks (ls, create, inspect)
  volume      Manage volumes (ls, create, inspect)
  compose     Docker Compose multi-container application platform
  info        Display system-wide information
  version     Show the Docker version information`;
    } else if (main === 'docker') {
      switch (sub) {
        case 'version':
          output = `Client: Docker Engine - Community
 Version:           26.1.4
 API version:       1.45
 Go version:        go1.22.4
 Git commit:        5650f9b
 Built:             Wed Jun 05 18:03:22 2026
 OS/Arch:           linux/amd64

Server: Docker Engine - Community
 Engine:
  Version:          26.1.4
  API version:      1.45 (minimum version 1.24)
  Go version:       go1.22.4
  Git commit:       de5c9cf
  Built:            Wed Jun 05 18:03:22 2026
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          v1.7.17
 runc:
  Version:          1.1.12
 docker-init:
  Version:          0.19.0`;
          break;

        case 'info':
          output = `Client:
 Context:    default
 Debug Mode: false

Server:
 Containers: 3
  Running: 2
  Paused: 0
  Stopped: 1
 Images: 6
 Server Version: 26.1.4
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: true
  Using metacopy: false
 Logging Driver: json-file
 Cgroup Driver: systemd
 Cgroup Version: 2
 Security Options:
  apparmor
  seccomp
   Profile: builtin
  cgroupns
 Kernel Version: 6.8.0-40-generic
 Operating System: Ubuntu 24.04 LTS
 OSType: linux
 Architecture: x86_64
 CPUs: 8
 Total Memory: 15.62GiB
 Docker Root Dir: /var/lib/docker`;
          break;

        case 'ps':
          if (parts.includes('-a') || parts.includes('-all')) {
            output = `CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                       PORTS                  NAMES
f4a1c028e9b1   nginx:alpine          "/docker-entrypoint…"   12 minutes ago   Up 12 minutes                0.0.0.0:8080->80/tcp   web-frontend
99b2e31a04d2   postgres:16-alpine    "docker-entrypoint.s…"   45 minutes ago   Up 45 minutes (healthy)      0.0.0.0:5432->5432     postgres-db
11e8a901ff23   redis:7-alpine        "docker-entrypoint.s…"   2 hours ago      Exited (0) 25 minutes ago                           redis-cache`;
          } else {
            output = `CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                    PORTS                  NAMES
f4a1c028e9b1   nginx:alpine          "/docker-entrypoint…"   12 minutes ago   Up 12 minutes             0.0.0.0:8080->80/tcp   web-frontend
99b2e31a04d2   postgres:16-alpine    "docker-entrypoint.s…"   45 minutes ago   Up 45 minutes (healthy)   0.0.0.0:5432->5432     postgres-db`;
          }
          break;

        case 'images':
          output = `REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        alpine    91b2e340a1b2   2 weeks ago    42.6MB
postgres     16-alpine 44e09f81a7d3   3 weeks ago    379MB
redis        7-alpine  12c98a00ee12   1 month ago    35.2MB
node         20-alpine 88a123f4b001   1 month ago    178MB
golang       1.22      55c102a99182   2 months ago   820MB`;
          break;

        case 'run':
          const img = parts.find((p) => !p.startsWith('-') && p !== 'docker' && p !== 'run') || 'container';
          const generatedId = Math.random().toString(16).slice(2, 14);
          output = `${generatedId}\nContainer started in background (detached). Status: Running (PID 1 isolated)`;
          break;

        case 'stop':
          const target = parts[2] || 'container';
          output = `${target}\nContainer stopped gracefully (SIGTERM sent).`;
          break;

        case 'rm':
          const rmTarget = parts[2] || 'container';
          output = `${rmTarget}\nContainer removed from disk.`;
          break;

        case 'logs':
          output = `[2026-10-02T10:00:12Z] Server listening on port 80\n[2026-10-02T10:00:15Z] HTTP GET /api/v1/health 200 OK - 1.2ms\n[2026-10-02T10:01:04Z] Worker pool initialized with 4 concurrency threads`;
          break;

        case 'exec':
          output = `Connected to container shell (PID 1 child):\nLinux 6.8.0-docker #1 SMP PREEMPT_DYNAMIC x86_64 Linux\n$ exit`;
          break;

        case 'network':
          if (parts[2] === 'ls' || !parts[2]) {
            output = `NETWORK ID     NAME      DRIVER    SCOPE
e1a2b3c4d5e6   bridge    bridge    local
f6e5d4c3b2a1   host      host      local
0a9b8c7d6e5f   none      null      local
44cc33bb22aa   app-net   bridge    local`;
          } else {
            output = `Network action completed.`;
          }
          break;

        case 'volume':
          if (parts[2] === 'ls' || !parts[2]) {
            output = `DRIVER    VOLUME NAME
local     db_data
local     redis_cache
local     prometheus_data`;
          } else {
            output = `Volume action completed.`;
          }
          break;

        case 'compose':
          output = `[+] Running 4/4\n ✔ Network app-net        Created\n ✔ Volume db-data         Created\n ✔ Container postgres-db  Started\n ✔ Container web-frontend Started`;
          break;

        default:
          output = `docker: '${sub}' is not a docker command.\nSee 'docker --help'`;
          isError = true;
          break;
      }
    } else {
      output = `bash: ${main}: command not found. (Use Docker commands or 'help')`;
      isError = true;
    }

    setHistory((prev) => [...prev, { command: raw, output, isError }]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      if (pastCommands.length > 0) {
        const nextIdx = cmdIndex === -1 ? pastCommands.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInputVal(pastCommands[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (cmdIndex >= 0) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx < pastCommands.length) {
          setCmdIndex(nextIdx);
          setInputVal(pastCommands[nextIdx]);
        } else {
          setCmdIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
      {/* Top Banner */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-white">Docker Interactive Terminal CLI</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory([])}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        </div>
      </div>

      {/* Terminal Output Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 leading-relaxed">
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            {entry.command && (
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <span className="text-emerald-400">user@docker-host:~$</span>
                <span>{entry.command}</span>
              </div>
            )}
            {entry.output && (
              <pre
                className={`whitespace-pre-wrap ${
                  entry.isError ? 'text-rose-400' : 'text-slate-300'
                }`}
              >
                {entry.output}
              </pre>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
        <span className="text-emerald-400 font-bold shrink-0">user@docker-host:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="docker ps, docker run -d nginx, docker images..."
          className="flex-1 bg-transparent text-white outline-none font-mono text-xs"
          autoFocus
        />
      </div>
    </div>
  );
};
