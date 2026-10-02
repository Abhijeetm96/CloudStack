import React, { useState } from 'react';
import {
  Network,
  Share2,
  Globe,
  Radio,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Shield,
  Layers,
  Terminal,
  Activity
} from 'lucide-react';

interface NetworkDef {
  id: string;
  name: string;
  driver: 'bridge' | 'host' | 'none' | 'overlay';
  subnet: string;
  gateway: string;
  containers: string[];
}

interface NodeContainer {
  id: string;
  name: string;
  ip: string;
  ports: string;
  dnsAlias: string;
}

const INITIAL_NETWORKS: NetworkDef[] = [
  {
    id: 'net-bridge-default',
    name: 'bridge (default)',
    driver: 'bridge',
    subnet: '172.17.0.0/16',
    gateway: '172.17.0.1',
    containers: ['container-c'],
  },
  {
    id: 'net-app-custom',
    name: 'app-tier (user-defined)',
    driver: 'bridge',
    subnet: '172.20.0.0/16',
    gateway: '172.20.0.1',
    containers: ['container-a', 'container-b'],
  },
];

const CONTAINERS: Record<string, NodeContainer> = {
  'container-a': {
    id: 'container-a',
    name: 'frontend-web',
    ip: '172.20.0.2',
    ports: '8080:80',
    dnsAlias: 'web',
  },
  'container-b': {
    id: 'container-b',
    name: 'backend-api',
    ip: '172.20.0.3',
    ports: '3000:3000',
    dnsAlias: 'api',
  },
  'container-c': {
    id: 'container-c',
    name: 'legacy-worker',
    ip: '172.17.0.2',
    ports: 'none',
    dnsAlias: 'worker',
  },
};

export const DockerNetworkSimulator: React.FC = () => {
  const [networks, setNetworks] = useState<NetworkDef[]>(INITIAL_NETWORKS);
  const [selectedNetworkId, setSelectedNetworkId] = useState<string>('net-app-custom');
  const [fromContainer, setFromContainer] = useState<string>('container-a');
  const [targetQuery, setTargetQuery] = useState<string>('backend-api');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; hops: string[] } | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [newNetName, setNewNetName] = useState('');

  const selectedNet = networks.find((n) => n.id === selectedNetworkId) || networks[0];

  const handleTestConnectivity = () => {
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setIsTesting(false);
      const sourceCont = CONTAINERS[fromContainer];
      // Target could be container name, dns alias, or IP
      let targetCont: NodeContainer | undefined;
      Object.values(CONTAINERS).forEach((c) => {
        if (c.name === targetQuery || c.dnsAlias === targetQuery || c.ip === targetQuery) {
          targetCont = c;
        }
      });

      if (!targetCont) {
        setTestResult({
          success: false,
          message: `curl: (6) Could not resolve host: ${targetQuery}. Embedded DNS 127.0.0.11 returned NXDOMAIN.`,
          hops: [`From: ${sourceCont.name} (${sourceCont.ip})`, `DNS Query: 127.0.0.11 -> NOT FOUND`],
        });
        return;
      }

      // Check if both are on at least one shared network
      const sharedNetwork = networks.find(
        (n) => n.containers.includes(sourceCont.id) && n.containers.includes(targetCont!.id)
      );

      if (sharedNetwork) {
        setTestResult({
          success: true,
          message: `HTTP/1.1 200 OK - Connection to ${targetCont.name} (${targetCont.ip}) succeeded via bridge '${sharedNetwork.name}'.`,
          hops: [
            `From: ${sourceCont.name} (${sourceCont.ip})`,
            `Docker Embedded DNS (127.0.0.11): Resolved '${targetQuery}' -> ${targetCont.ip}`,
            `Virtual Ethernet veth -> Bridge (${sharedNetwork.gateway}) -> Destination (${targetCont.ip})`,
          ],
        });
      } else {
        setTestResult({
          success: false,
          message: `Network Isolation Block: ${sourceCont.name} and ${targetCont.name} reside on different networks with no bridge route. Connection timed out.`,
          hops: [
            `From: ${sourceCont.name} (${sourceCont.ip})`,
            `DNS Lookup: Resolved ${targetCont.name}`,
            `iptables filter DROP: No inter-network bridge forward rule allowed between subnets.`,
          ],
        });
      }
    }, 450);
  };

  const toggleContainerAttachment = (networkId: string, containerId: string) => {
    setNetworks((prev) =>
      prev.map((net) => {
        if (net.id !== networkId) return net;
        const exists = net.containers.includes(containerId);
        return {
          ...net,
          containers: exists ? net.containers.filter((c) => c !== containerId) : [...net.containers, containerId],
        };
      })
    );
  };

  const handleCreateNetwork = () => {
    if (!newNetName.trim()) return;
    const count = networks.length + 1;
    const newNet: NetworkDef = {
      id: `net-user-${Date.now().toString(36)}`,
      name: newNetName.trim(),
      driver: 'bridge',
      subnet: `172.${20 + count}.0.0/16`,
      gateway: `172.${20 + count}.0.1`,
      containers: [],
    };
    setNetworks((prev) => [...prev, newNet]);
    setSelectedNetworkId(newNet.id);
    setNewNetName('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 rounded-xl border border-slate-800 overflow-hidden font-sans">
      {/* Top Banner */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Docker Network & Embedded DNS Simulator
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                Linux Network Namespaces · veth pairs · iptables
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              User-Defined Bridge vs Default Bridge · Automatic Service Discovery (127.0.0.11)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newNetName}
            onChange={(e) => setNewNetName(e.target.value)}
            placeholder="docker network create <name>"
            className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded text-xs text-white font-mono placeholder:text-slate-500"
          />
          <button
            onClick={handleCreateNetwork}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Create
          </button>
        </div>
      </div>

      {/* Main Grid: Network Topology & DNS Diagnostics */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Left: Networks & Connected Containers */}
        <div className="w-full md:w-1/2 border-r border-slate-800 p-4 flex flex-col overflow-y-auto bg-slate-900/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">CONFIGURED DOCKER NETWORKS</span>
            <span className="text-xs font-mono text-blue-400">docker network ls</span>
          </div>

          <div className="space-y-3 mb-5">
            {networks.map((net) => {
              const isSelected = net.id === selectedNetworkId;
              return (
                <div
                  key={net.id}
                  onClick={() => setSelectedNetworkId(net.id)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-950/40 border-blue-500 shadow-md shadow-blue-950/40'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-blue-400" />
                      <span className="font-semibold text-sm text-white">{net.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Driver: {net.driver}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-slate-400 grid grid-cols-2 gap-2 mb-3">
                    <div>Subnet: {net.subnet}</div>
                    <div>Gateway: {net.gateway}</div>
                  </div>

                  {/* Attached containers */}
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center justify-between">
                      <span>Attached Containers ({net.containers.length}):</span>
                      <span className="text-[10px] text-blue-300">Click badge to toggle</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Object.values(CONTAINERS).map((c) => {
                        const isAttached = net.containers.includes(c.id);
                        return (
                          <button
                            key={c.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleContainerAttachment(net.id, c.id);
                            }}
                            className={`px-2 py-1 rounded text-[11px] font-mono transition-all flex items-center gap-1 cursor-pointer ${
                              isAttached
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                                : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                            }`}
                          >
                            {isAttached ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3" />}
                            {c.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive DNS & Port Connectivity Tester */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between bg-slate-950 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-400" /> Inter-Container DNS & Traffic Test
              </span>
              <span className="text-xs font-mono text-slate-500">docker exec curl / ping</span>
            </div>

            {/* Test form */}
            <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-800 space-y-3 mb-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Source Container (Client)</label>
                <select
                  value={fromContainer}
                  onChange={(e) => setFromContainer(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded p-2 text-xs font-mono"
                >
                  {Object.values(CONTAINERS).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (IP: {c.ip})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Target Hostname, Alias, or IP (curl)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={targetQuery}
                    onChange={(e) => setTargetQuery(e.target.value)}
                    placeholder="e.g. backend-api or api or 172.20.0.3"
                    className="flex-1 bg-slate-800 border border-slate-700 text-white rounded px-3 py-2 text-xs font-mono"
                  />
                  <button
                    onClick={handleTestConnectivity}
                    disabled={isTesting}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Activity className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} /> Test Ping / Curl
                  </button>
                </div>
              </div>
            </div>

            {/* Diagnostic results */}
            {testResult && (
              <div
                className={`p-4 rounded-lg border font-mono text-xs space-y-2.5 ${
                  testResult.success
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-500/50 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  )}
                  <span>{testResult.success ? 'Connectivity Succeeded' : 'Connectivity Failed'}</span>
                </div>

                <p className="leading-relaxed">{testResult.message}</p>

                <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-300">
                  <div className="text-slate-400 font-bold uppercase text-[10px]">Packet Hop Trace:</div>
                  {testResult.hops.map((hop, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <ArrowRight className="w-3 h-3 text-blue-400 shrink-0" />
                      <span>{hop}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Architecture Summary Note */}
          <div className="mt-4 p-3 bg-slate-900/90 rounded border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" /> Embedded DNS Rule of Thumb:
            </div>
            <p>
              User-defined bridge networks enable automatic container name resolution via Docker's embedded 127.0.0.11 DNS.
              The default `bridge` network does NOT resolve by name unless legacy `--link` is used.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
