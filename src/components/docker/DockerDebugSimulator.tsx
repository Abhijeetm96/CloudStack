import React, { useState } from 'react';
import {
  AlertTriangle,
  Terminal,
  Search,
  CheckCircle2,
  RefreshCw,
  Bug,
  Activity,
  FileText,
  HelpCircle,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface IncidentScenario {
  id: string;
  title: string;
  category: string;
  symptom: string;
  psOutput: string;
  psAllOutput: string;
  logsOutput: string;
  inspectOutput: string;
  solutionCommand: string;
  explanation: string;
}

const INCIDENTS: IncidentScenario[] = [
  {
    id: 'exit-immediately',
    title: 'Container Immediately Exits (Exit Code 0)',
    category: 'Process PID 1',
    symptom: 'Container runs with docker run -d ubuntu, but docker ps returns nothing.',
    psOutput: 'CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES',
    psAllOutput: 'a1b2c3d4e5f6   ubuntu:22.04   "/bin/bash"   12 seconds ago   Exited (0) 11 seconds ago   quizzical_morse',
    logsOutput: '# (No output in logs because bash finished immediately without an interactive TTY)',
    inspectOutput: '"State": {\n  "Status": "exited",\n  "Running": false,\n  "ExitCode": 0,\n  "OOMKilled": false,\n  "Error": ""\n}',
    solutionCommand: 'docker run -dit ubuntu:22.04',
    explanation: 'Containers exit as soon as PID 1 terminates. A shell like /bin/bash requires interactive STDIN (-i) and pseudo-TTY (-t) or a long-running foreground daemon, otherwise it reads EOF and cleanly exits with status 0.',
  },
  {
    id: 'port-conflict',
    title: 'Port Conflict: 0.0.0.0:8080 Already in Use',
    category: 'Networking',
    symptom: 'Starting nginx fails with driver failed programming external connectivity.',
    psOutput: 'CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS     NAMES\n99aa88bb77cc   apache:alpine  "httpd-foreground"       2 hours ago     Up 2 hours     0.0.0.0:8080->80/tcp   existing_web',
    psAllOutput: '445566778899   nginx:alpine   "/docker-entrypoint…"   3 seconds ago   Created                  new_nginx',
    logsOutput: 'docker: Error response from daemon: failed to bind host port 0.0.0.0:8080: address already in use.',
    inspectOutput: '"PortBindings": { "80/tcp": [{ "HostPort": "8080" }] } -> CONFLICT with PID 4120',
    solutionCommand: 'docker run -d -p 8081:80 nginx:alpine',
    explanation: 'Two different containers or host processes cannot listen on the exact same host port. Map to an unused host port like -p 8081:80 or terminate the conflicting container.',
  },
  {
    id: 'oom-killed',
    title: 'Out of Memory (OOMKilled - Exit Code 137)',
    category: 'Resources',
    symptom: 'Application crashes abruptly under traffic spikes without any application stack trace.',
    psOutput: 'CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES',
    psAllOutput: '778899aabbcc   data-pipeline:latest   "python worker.py"   2 minutes ago   Exited (137) 10 seconds ago   fast_worker',
    logsOutput: 'Loading batch of 500,000 parquet records into pandas dataframe...\nKilled',
    inspectOutput: '"State": {\n  "Status": "exited",\n  "Running": false,\n  "ExitCode": 137,\n  "OOMKilled": true,\n  "Error": ""\n}',
    solutionCommand: 'docker run -d --memory=2g data-pipeline:latest',
    explanation: 'Exit code 137 represents 128 + 9 (SIGKILL). When OOMKilled is true in docker inspect, the Linux kernel cgroups memory subsystem killed the container process because memory exceeded the configured limit (--memory).',
  },
  {
    id: 'permission-denied',
    title: 'Non-Root Permission Denied on Mounted Volume',
    category: 'Storage',
    symptom: 'Node.js application fails to create logs or upload files inside mounted folder.',
    psOutput: 'CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES',
    psAllOutput: '112233445566   node-app:secure   "node server.js"   30 seconds ago   Exited (1) 28 seconds ago   api_worker',
    logsOutput: 'Error: EACCES: permission denied, open \'/app/uploads/avatar.png\'\n    at Object.openSync (fs.js:498:3)',
    inspectOutput: '"User": "10001:10001",\n"Mounts": [{ "Source": "/data/uploads", "Destination": "/app/uploads", "RW": true }]',
    solutionCommand: 'chown -R 10001:10001 /data/uploads',
    explanation: 'The container runs under non-root USER 10001 for security, but the host bind-mount directory /data/uploads was owned by host root (UID 0:0 with mode 755). Change host ownership to UID 10001.',
  },
];

export const DockerDebugSimulator: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('exit-immediately');
  const [selectedCommand, setSelectedCommand] = useState<'ps' | 'ps-a' | 'logs' | 'inspect'>('ps');
  const [learnerAnswer, setLearnerAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; msg: string } | null>(null);

  const scenario = INCIDENTS.find((s) => s.id === activeScenarioId) || INCIDENTS[0];

  const handleTestDiagnosis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnerAnswer.trim()) return;

    const ans = learnerAnswer.trim().toLowerCase();
    const isCorrect =
      ans.includes(scenario.solutionCommand.toLowerCase().slice(0, 15)) ||
      (scenario.id === 'exit-immediately' && (ans.includes('-it') || ans.includes('foreground') || ans.includes('tail -f') || ans.includes('tty'))) ||
      (scenario.id === 'port-conflict' && (ans.includes('8081') || ans.includes('port') || ans.includes('stop'))) ||
      (scenario.id === 'oom-killed' && (ans.includes('memory') || ans.includes('--memory') || ans.includes('2g') || ans.includes('1g'))) ||
      (scenario.id === 'permission-denied' && (ans.includes('chown') || ans.includes('10001') || ans.includes('chmod')));

    if (isCorrect) {
      setFeedback({
        correct: true,
        msg: `Exact diagnosis verified! Solution: ${scenario.solutionCommand}. ${scenario.explanation}`,
      });
    } else {
      setFeedback({
        correct: false,
        msg: `Not quite. Examine the output of "docker inspect" and "docker logs" to locate the root cause. Target fix is: ${scenario.solutionCommand}`,
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden font-sans">
      {/* Top Banner */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30">
            <Bug className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Docker Controlled Incident & Diagnostic Simulator
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                SRE Troubleshooting Masterclass
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Systematic Triaging: docker ps → docker ps -a → docker logs → docker inspect → PID 1 & Exit Codes
            </p>
          </div>
        </div>
      </div>

      {/* Incident Switcher */}
      <div className="p-3 bg-slate-900/50 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-mono">
        <span className="text-slate-400 shrink-0">FAILURES:</span>
        {INCIDENTS.map((inc) => (
          <button
            key={inc.id}
            onClick={() => {
              setActiveScenarioId(inc.id);
              setFeedback(null);
              setLearnerAnswer('');
            }}
            className={`px-3 py-1.5 rounded transition-all shrink-0 cursor-pointer ${
              inc.id === activeScenarioId
                ? 'bg-rose-950/80 border border-rose-600 text-rose-200 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {inc.title}
          </button>
        ))}
      </div>

      {/* Main Split: Terminal Investigation vs Diagnostic Workspace */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Left: Interactive Diagnostic Terminal */}
        <div className="w-full md:w-1/2 border-r border-slate-800 p-4 flex flex-col justify-between bg-slate-900/20">
          <div>
            <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
              <span>SRE INVESTIGATION TOOLS</span>
              <span className="text-rose-400 font-bold">{scenario.category}</span>
            </div>

            {/* Diagnostic Command Buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                onClick={() => setSelectedCommand('ps')}
                className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer ${
                  selectedCommand === 'ps' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                docker ps
              </button>
              <button
                onClick={() => setSelectedCommand('ps-a')}
                className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer ${
                  selectedCommand === 'ps-a' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                docker ps -a
              </button>
              <button
                onClick={() => setSelectedCommand('logs')}
                className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer ${
                  selectedCommand === 'logs' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                docker logs &lt;cid&gt;
              </button>
              <button
                onClick={() => setSelectedCommand('inspect')}
                className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer ${
                  selectedCommand === 'inspect' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                docker inspect &lt;cid&gt;
              </button>
            </div>

            {/* Terminal Window */}
            <div className="bg-slate-950 rounded-lg border border-slate-800 p-3 font-mono text-xs overflow-x-auto min-h-[160px]">
              <div className="text-slate-500 mb-2 pb-1 border-b border-slate-800/80">
                $ docker {selectedCommand === 'ps-a' ? 'ps -a' : selectedCommand === 'logs' ? 'logs 778899' : selectedCommand === 'inspect' ? 'inspect 778899 | jq .State' : 'ps'}
              </div>
              <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                {selectedCommand === 'ps' && scenario.psOutput}
                {selectedCommand === 'ps-a' && scenario.psAllOutput}
                {selectedCommand === 'logs' && scenario.logsOutput}
                {selectedCommand === 'inspect' && scenario.inspectOutput}
              </pre>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-900 rounded border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="text-amber-300 font-bold">Observed Symptom: </span>
            {scenario.symptom}
          </div>
        </div>

        {/* Right: Diagnosis & Recovery Challenge */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between bg-slate-950 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-400" /> Root Cause Analysis
              </span>
              <span className="text-emerald-400">Recovery Step</span>
            </div>

            <form onSubmit={handleTestDiagnosis} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Enter the remedial Docker command or resolution flag:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={learnerAnswer}
                    onChange={(e) => setLearnerAnswer(e.target.value)}
                    placeholder="e.g. docker run -dit ubuntu or --memory=2g"
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs font-mono text-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold cursor-pointer transition-all"
                  >
                    Verify Fix
                  </button>
                </div>
              </div>

              {feedback && (
                <div
                  className={`p-3 rounded-lg border font-mono text-xs space-y-1.5 ${
                    feedback.correct
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500/60 text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {feedback.correct ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                    )}
                    <span>{feedback.correct ? 'Incident Resolved!' : 'Needs Revision'}</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">{feedback.msg}</p>
                </div>
              )}
            </form>
          </div>

          <div className="mt-4 p-3 bg-slate-900/80 rounded border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="text-white font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Golden Triage Sequence:
            </span>
            <ol className="list-decimal list-inside space-y-0.5 mt-1 text-slate-300">
              <li>Run `docker ps` to see if it is running at all</li>
              <li>Run `docker ps -a` to see exit codes (e.g. 0, 1, 137)</li>
              <li>Run `docker logs &lt;cid&gt;` for stdout/stderr panic traces</li>
              <li>Run `docker inspect &lt;cid&gt;` for OOMKilled, Ports, and Environment</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
