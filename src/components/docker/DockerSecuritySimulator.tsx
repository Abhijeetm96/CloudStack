import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Activity,
  Cpu,
  Layers,
  Network
} from 'lucide-react';

export const DockerSecuritySimulator: React.FC = () => {
  // Security controls toggle state
  const [runAsRoot, setRunAsRoot] = useState(true);
  const [privilegedMode, setPrivilegedMode] = useState(false);
  const [dropCapabilities, setDropCapabilities] = useState(false);
  const [readOnlyRootFs, setReadOnlyRootFs] = useState(false);
  const [noNewPrivileges, setNoNewPrivileges] = useState(false);
  const [seccompDefault, setSeccompDefault] = useState(true);
  const [hasResourceLimits, setHasResourceLimits] = useState(false);
  const [isolatedNetwork, setIsolatedNetwork] = useState(true);

  // Attack simulator
  const [attackScenario, setAttackScenario] = useState<string>('root-escape');
  const [attackReport, setAttackReport] = useState<string | null>(null);

  // Calculate security rating
  let securityScore = 100;
  if (runAsRoot) securityScore -= 25;
  if (privilegedMode) securityScore -= 40;
  if (!dropCapabilities) securityScore -= 10;
  if (!readOnlyRootFs) securityScore -= 10;
  if (!noNewPrivileges) securityScore -= 5;
  if (!seccompDefault) securityScore -= 10;
  if (!hasResourceLimits) securityScore -= 10;
  if (!isolatedNetwork) securityScore -= 10;
  securityScore = Math.max(5, Math.min(100, securityScore));

  const runAttackTest = (attack: string) => {
    setAttackScenario(attack);
    if (attack === 'root-escape') {
      if (privilegedMode) {
        setAttackReport('🚨 ESCAPE SUCCESSFUL: With --privileged=true, container gained full kernel capabilities, mounted host /dev/sda1, and accessed host root filesystem.');
      } else if (runAsRoot && !dropCapabilities) {
        setAttackReport('⚠️ PARTIAL RISK: Container runs as root (UID 0). If an unpatched kernel vulnerability exists in namespace isolation, privilege escalation is possible.');
      } else {
        setAttackReport('🛡️ ESCAPE BLOCKED: Container runs as non-root (USER 10001) with dropped capabilities and active seccomp filters. Kernel exploit denied.');
      }
    } else if (attack === 'cryptominer-oom') {
      if (!hasResourceLimits) {
        setAttackReport('🚨 RESOURCE EXHAUSTION: No memory or CPU limits set. Malicious payload consumed 100% of host RAM and CPU, starving host processes until Linux OOM panic.');
      } else {
        setAttackReport('🛡️ MITIGATED: cgroups v2 strictly capped memory to 256MB. OOM Killer terminated only the container (Exit Code 137). Host remains completely unaffected.');
      }
    } else if (attack === 'filesystem-tamper') {
      if (readOnlyRootFs) {
        setAttackReport('🛡️ BLOCKED: --read-only enforced. Malicious script attempted to download binary to /bin/malware; kernel rejected write with EROFS (Read-only filesystem).');
      } else {
        setAttackReport('⚠️ TAMPERED: Container filesystem was writable. Malware modified /bin/sh and injected malicious persistence in container layer.');
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden font-sans">
      {/* Top Banner */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Docker Container Hardening & Security Layer Simulator
              <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full border ${
                securityScore >= 80
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : securityScore >= 50
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}>
                Security Score: {securityScore}/100
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Least Privilege · Linux Capabilities (cap-drop) · Seccomp Profiles · Read-Only Rootfs
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            // Apply recommended secure settings
            setRunAsRoot(false);
            setPrivilegedMode(false);
            setDropCapabilities(true);
            setReadOnlyRootFs(true);
            setNoNewPrivileges(true);
            setSeccompDefault(true);
            setHasResourceLimits(true);
            setIsolatedNetwork(true);
            setAttackReport('🛡️ Production Hardening Profile Applied: Maximum isolation achieved.');
          }}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded transition-all cursor-pointer"
        >
          Apply CIS Production Hardening
        </button>
      </div>

      {/* Main Split: Security Switches vs Threat Simulation Engine */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Left: Security Control Switches */}
        <div className="w-full md:w-1/2 border-r border-slate-800 p-4 flex flex-col overflow-y-auto bg-slate-900/30">
          <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
            <span>CONTAINER ISOLATION CONTROLS</span>
            <span className="text-slate-500">Toggle to observe threat defense</span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {/* Run as root */}
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-blue-400" /> Container User (UID)
                </div>
                <div className="text-[11px] text-slate-400">
                  {runAsRoot ? 'Running as root (UID 0 - Dangerous default)' : 'Running as non-root (USER 10001:10001)'}
                </div>
              </div>
              <button
                onClick={() => setRunAsRoot(!runAsRoot)}
                className={`px-3 py-1 rounded text-xs cursor-pointer font-semibold ${
                  runAsRoot ? 'bg-rose-950/80 text-rose-300 border border-rose-700' : 'bg-emerald-950/80 text-emerald-300 border border-emerald-600'
                }`}
              >
                {runAsRoot ? 'ROOT (UID 0)' : 'NON-ROOT (10001)'}
              </button>
            </div>

            {/* Privileged mode */}
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Unlock className="w-4 h-4 text-amber-400" /> Privileged Mode (--privileged)
                </div>
                <div className="text-[11px] text-slate-400">
                  {privilegedMode ? 'Enabled: Grants all kernel capabilities + device access' : 'Disabled: Standard container namespace confinement'}
                </div>
              </div>
              <button
                onClick={() => setPrivilegedMode(!privilegedMode)}
                className={`px-3 py-1 rounded text-xs cursor-pointer font-semibold ${
                  privilegedMode ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {privilegedMode ? 'DANGER: PRIVILEGED' : 'STANDARD'}
              </button>
            </div>

            {/* Linux Capabilities */}
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Linux Capabilities (--cap-drop=ALL)
                </div>
                <div className="text-[11px] text-slate-400">
                  {dropCapabilities ? 'Dropped all capabilities (Only re-add explicitly needed ones)' : 'Default 14 capabilities retained (e.g. CHOWN, NET_RAW)'}
                </div>
              </div>
              <button
                onClick={() => setDropCapabilities(!dropCapabilities)}
                className={`px-3 py-1 rounded text-xs cursor-pointer font-semibold ${
                  dropCapabilities ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {dropCapabilities ? 'CAP_DROP=ALL' : 'DEFAULT CAPS'}
              </button>
            </div>

            {/* Read-only Root Filesystem */}
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-cyan-400" /> Read-Only Root Filesystem (--read-only)
                </div>
                <div className="text-[11px] text-slate-400">
                  {readOnlyRootFs ? 'Rootfs mounted immutable :ro (Write only to explicit tmpfs /tmp)' : 'Writable container layer enabled'}
                </div>
              </div>
              <button
                onClick={() => setReadOnlyRootFs(!readOnlyRootFs)}
                className={`px-3 py-1 rounded text-xs cursor-pointer font-semibold ${
                  readOnlyRootFs ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {readOnlyRootFs ? 'READ-ONLY' : 'WRITABLE'}
              </button>
            </div>

            {/* Resource limits */}
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-blue-400" /> cgroups Resource Quotas (--memory, --cpus)
                </div>
                <div className="text-[11px] text-slate-400">
                  {hasResourceLimits ? 'Restricted to 256MB RAM and 0.5 CPU' : 'Unrestricted: can consume all host memory'}
                </div>
              </div>
              <button
                onClick={() => setHasResourceLimits(!hasResourceLimits)}
                className={`px-3 py-1 rounded text-xs cursor-pointer font-semibold ${
                  hasResourceLimits ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {hasResourceLimits ? 'ENFORCED' : 'NO LIMITS'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Threat Simulator & Attack Surface Analysis */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between bg-slate-950 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Automated Penetration Test Scenarios
              </span>
              <span className="text-xs font-mono text-slate-500">Adversary simulation</span>
            </div>

            {/* Test buttons */}
            <div className="grid grid-cols-1 gap-2 mb-4">
              <button
                onClick={() => runAttackTest('root-escape')}
                className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded text-left transition-all cursor-pointer font-mono"
              >
                <div className="text-xs font-semibold text-rose-300 flex items-center justify-between">
                  <span>1. Kernel Privilege Escalation & Container Breakout</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-rose-950 text-rose-400 rounded">Simulate</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tests if container PID 1 can manipulate host kernel devices or escape namespaces.
                </p>
              </button>

              <button
                onClick={() => runAttackTest('cryptominer-oom')}
                className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded text-left transition-all cursor-pointer font-mono"
              >
                <div className="text-xs font-semibold text-amber-300 flex items-center justify-between">
                  <span>2. DoS Fork-Bomb / Cryptomining RAM Exhaustion</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-amber-950 text-amber-400 rounded">Simulate</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tests if an unbounded container can trigger Linux Host Kernel OOM panics.
                </p>
              </button>

              <button
                onClick={() => runAttackTest('filesystem-tamper')}
                className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded text-left transition-all cursor-pointer font-mono"
              >
                <div className="text-xs font-semibold text-blue-300 flex items-center justify-between">
                  <span>3. Binary Tampering & Rootkit Injection</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-blue-950 text-blue-400 rounded">Simulate</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Tests if malicious processes can overwrite /bin/sh or inject executable scripts.
                </p>
              </button>
            </div>

            {/* Attack Report Box */}
            {attackReport && (
              <div className="p-3.5 bg-slate-900/90 rounded-lg border border-slate-700 font-mono text-xs">
                <div className="text-slate-400 text-[10px] uppercase font-bold mb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-400" /> Defense Verdict:
                </div>
                <div className="text-slate-200 leading-relaxed">{attackReport}</div>
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-slate-900 rounded border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="text-blue-400 font-bold">Hardened Command: </span>
            <div className="mt-1 text-slate-300 break-all">
              docker run -d --user 10001:10001 --read-only --cap-drop=ALL --security-opt=no-new-privileges --memory=256m --cpus=0.5 my-app
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
