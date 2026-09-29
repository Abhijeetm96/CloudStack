import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  X,
  Search,
  ChevronRight,
  ShieldAlert,
  HardDrive,
  Server,
  Key,
  Database,
  Activity,
  Network,
  HelpCircle,
  Terminal,
  CheckCircle2,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export interface DiagnosticQuestion {
  question: string;
  command: string;
  whatToLookFor: string;
  interpretation: string;
}

export interface ProblemScenario {
  id: string;
  title: string;
  category: string;
  icon: any;
  symptom: string;
  rootCauses: string[];
  diagnosticSteps: DiagnosticQuestion[];
  recoveryPlan: {
    rule: string;
    safeCommand: string;
    explanation: string;
  };
  recommendedChapterId: string;
  recommendedConceptId: string;
  recommendedChapterTitle: string;
}

export const LINUX_PROBLEM_SCENARIOS: ProblemScenario[] = [
  {
    id: 'prob-perm-denied',
    title: 'My server says "Permission denied"',
    category: 'Permissions & Security',
    icon: ShieldAlert,
    symptom: 'Running a command, executing a script, or writing to a file fails with "Permission denied" or "Operation not permitted".',
    rootCauses: [
      'Missing execute bit (+x) on script file',
      'Non-root user attempting to write to system-owned directory (/var, /etc)',
      'Parent directory missing execute traversal bit for your group/others',
      'SELinux or AppArmor security profile blocking process syscall'
    ],
    diagnosticSteps: [
      {
        question: 'Who are you running as, and what groups do you belong to?',
        command: 'id && whoami',
        whatToLookFor: 'Look at your UID (e.g. 1000) and whether you belong to sudo, adm, or docker groups.',
        interpretation: 'If your UID != 0 and you need to modify root-owned paths, you will need sudo.'
      },
      {
        question: 'What are the exact permission bits on the target file?',
        command: 'ls -l <file>',
        whatToLookFor: 'Check user/group/other permissions: -rw-r--r-- vs -rwxr-xr-x.',
        interpretation: 'If trying to run a script, it MUST have execute (x). If modifying, you need write (w).'
      },
      {
        question: 'Can you traverse the parent directory path?',
        command: 'namei -m <file_path>',
        whatToLookFor: 'Verify that every parent directory from / downwards has "+x" execute permission.',
        interpretation: 'If even ONE parent directory denies execute traversal (x), Linux blocks all access.'
      },
      {
        question: 'Is SELinux or AppArmor enforcing mandatory access control?',
        command: 'sestatus 2>/dev/null || sudo aa-status',
        whatToLookFor: 'Check if status is "Enforcing" and inspect recent denials with dmesg or audit2why.',
        interpretation: 'Even root can be blocked if SELinux file labels (contexts) do not match the service type.'
      }
    ],
    recoveryPlan: {
      rule: 'Never run "chmod 777" blindly. Apply the minimum necessary permission change.',
      safeCommand: 'chmod u+x script.sh # or sudo chown $USER:$USER /target/path',
      explanation: 'Adds execute privilege strictly to the file owner, preserving system isolation without creating world-writable security holes.'
    },
    recommendedChapterId: 'ch-10',
    recommendedConceptId: 'c-10-16',
    recommendedChapterTitle: 'Chapter 10: File Permissions'
  },
  {
    id: 'prob-disk-full',
    title: 'My disk is full ("No space left on device")',
    category: 'Storage & Filesystems',
    icon: HardDrive,
    symptom: 'Applications crash, log writes fail, and commands abort with "No space left on device".',
    rootCauses: [
      'Application logs in /var/log consuming all available gigabytes',
      'Deleted files still held open by running processes (unlinked inodes)',
      'Inode exhaustion (100% inodes used while disk has free megabytes)',
      'Large Docker images, build caches, or core dump files'
    ],
    diagnosticSteps: [
      {
        question: 'Is it physical disk space or inode exhaustion?',
        command: 'df -h && df -i',
        whatToLookFor: 'Check "Use%" on both commands for the / root mount.',
        interpretation: 'If df -h shows free space but df -i shows 100% Use%, millions of tiny files have exhausted the inode table.'
      },
      {
        question: 'Are unlinked deleted files still held open by running processes?',
        command: 'sudo lsof +L1',
        whatToLookFor: 'Look for large files marked "(deleted)" held by daemons like nginx or node.',
        interpretation: 'Linux does NOT free disk blocks when you rm a file if a running process still holds an open file descriptor. Restart the daemon.'
      },
      {
        question: 'Which directory is consuming the most disk blocks?',
        command: 'sudo du -ah /var 2>/dev/null | sort -rh | head -n 15',
        whatToLookFor: 'Identify the exact subfolder (e.g. /var/log, /var/lib/docker) hogging gigabytes.',
        interpretation: 'Points directly to the rogue application or unrotated log file.'
      }
    ],
    recoveryPlan: {
      rule: 'Truncate active log files safely without breaking process file handles.',
      safeCommand: '> /var/log/app.log # Truncate in-place, then restart service',
      explanation: 'Using > file.log zeroes the file immediately on disk while keeping the inode valid for the running process.'
    },
    recommendedChapterId: 'ch-14',
    recommendedConceptId: 'c-14-17',
    recommendedChapterTitle: 'Chapter 14: Disks and Storage'
  },
  {
    id: 'prob-service-failed',
    title: 'My service won\'t start ("Active: failed")',
    category: 'Services & systemd',
    icon: Server,
    symptom: 'Running "systemctl start <service>" returns exit code 1 or enters a crash-loop state.',
    rootCauses: [
      'Syntax typo in application configuration file (/etc/service.conf)',
      'Port already bound by another process (EADDRINUSE)',
      'Service account lacks permission to read credentials or certificates',
      'Missing environment variables or incorrect ExecStart binary path'
    ],
    diagnosticSteps: [
      {
        question: 'What does systemd report as the exit code and failure cause?',
        command: 'systemctl status <service>.service',
        whatToLookFor: 'Inspect "Active: failed (Result: exit-code)" and the last 10 log lines.',
        interpretation: 'Reveals whether the process crashed immediately or timed out on startup.'
      },
      {
        question: 'What are the full stderr diagnostics from the journal?',
        command: 'journalctl -xeu <service>.service -n 50 --no-pager',
        whatToLookFor: 'Read the actual application stack trace, syntax error line, or missing file warning.',
        interpretation: 'Provides the exact failure line or unhandled runtime exception.'
      },
      {
        question: 'Is the required network port already occupied?',
        command: 'sudo ss -tulpn | grep :<port_number>',
        whatToLookFor: 'See if another PID is already listening on the service\'s target port.',
        interpretation: 'Two services cannot bind to the same IP:Port without SO_REUSEPORT.'
      }
    ],
    recoveryPlan: {
      rule: 'Validate configuration syntax before restarting systemd.',
      safeCommand: 'sudo nginx -t # (or app syntax check) && sudo systemctl restart <service>',
      explanation: 'Dry-run syntax checks catch typos before placing daemons into production boot loops.'
    },
    recommendedChapterId: 'ch-12',
    recommendedConceptId: 'c-12-14',
    recommendedChapterTitle: 'Chapter 12: Services and systemd'
  },
  {
    id: 'prob-ssh-failed',
    title: 'I cannot SSH into my server ("Permission denied (publickey)")',
    category: 'SSH & Remote Access',
    icon: Key,
    symptom: 'SSH connection attempt terminates with "Permission denied (publickey)" or hangs indefinitely.',
    rootCauses: [
      'Private key has insecure permissions (must be chmod 600, not 644 or 777)',
      'Remote ~/.ssh/authorized_keys file has incorrect permissions or missing public key',
      'Server firewall (ufw/iptables) or cloud security group blocking port 22',
      'sshd daemon listening on non-standard port or PasswordAuthentication disabled'
    ],
    diagnosticSteps: [
      {
        question: 'What does the SSH client handshake debug trace reveal?',
        command: 'ssh -vvv -i ~/.ssh/id_ed25519 user@server_ip',
        whatToLookFor: 'Look for "Offering public key" and whether the server sends "Authentications that can continue".',
        interpretation: 'Identifies whether failure is at TCP network handshake or cryptographic key presentation.'
      },
      {
        question: 'Is the SSH port reachable across the network?',
        command: 'nc -zv server_ip 22 || curl -v telnet://server_ip:22',
        whatToLookFor: 'Check if TCP connection is opened or times out.',
        interpretation: 'If it times out, a cloud security group or local firewall is dropping SYN packets.'
      },
      {
        question: 'Are local and remote ~/.ssh file permissions strictly locked down?',
        command: 'chmod 700 ~/.ssh && chmod 600 ~/.ssh/id_*',
        whatToLookFor: 'Ensure private keys are never group or world-readable.',
        interpretation: 'OpenSSH client and daemon automatically reject keys with permissive access rights.'
      }
    ],
    recoveryPlan: {
      rule: 'Enforce strict 700/600 permissions and verify authorized_keys entry.',
      safeCommand: 'ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server_ip',
      explanation: 'Transfers the public key and sets exact compliant POSIX permissions automatically.'
    },
    recommendedChapterId: 'ch-16',
    recommendedConceptId: 'c-16-16',
    recommendedChapterTitle: 'Chapter 16: SSH and Remote Access'
  },
  {
    id: 'prob-db-connect',
    title: 'My application cannot connect to the database',
    category: 'Networking & Databases',
    icon: Database,
    symptom: 'Application logs "Connection refused", "Operation timed out", or "Ident authentication failed".',
    rootCauses: [
      'Database daemon not running or bound to localhost (127.0.0.1) instead of 0.0.0.0',
      'Firewall blocking database port (5432 for Postgres, 3306 for MySQL)',
      'pg_hba.conf or MySQL user table restricting remote host IP ranges',
      'Incorrect database credentials or environment variable not loaded'
    ],
    diagnosticSteps: [
      {
        question: 'Is the database daemon active and listening on the network?',
        command: 'sudo ss -tulpn | grep -E "(5432|3306)"',
        whatToLookFor: 'Check whether it is listening on 127.0.0.1 (local only) or 0.0.0.0 (all interfaces).',
        interpretation: 'If bound only to 127.0.0.1, external containers or servers cannot connect.'
      },
      {
        question: 'Can the application server reach the database port via TCP?',
        command: 'nc -zv db_host 5432',
        whatToLookFor: '"Connection to db_host 5432 port [tcp/*] succeeded!" vs "Connection timed out".',
        interpretation: 'Differentiates network firewall issues from database authentication issues.'
      }
    ],
    recoveryPlan: {
      rule: 'Bind service to desired interface and configure host access rules.',
      safeCommand: 'sudo ufw allow from 10.0.0.0/24 to any port 5432 proto tcp',
      explanation: 'Whitelists the private application subnet to reach PostgreSQL without exposing it to the public internet.'
    },
    recommendedChapterId: 'ch-15',
    recommendedConceptId: 'c-15-20',
    recommendedChapterTitle: 'Chapter 15: Linux Networking'
  },
  {
    id: 'prob-high-cpu',
    title: 'My process is using too much CPU (100% Load)',
    category: 'System Performance',
    icon: Activity,
    symptom: 'Server becomes sluggish, SSH typing lags, load average climbs past CPU core count.',
    rootCauses: [
      'Infinite while loop in application code',
      'Crypto mining malware or compromised service account',
      'Database query performing unindexed full table scans',
      'High kernel I/O wait (%wa) saturating disk queues'
    ],
    diagnosticSteps: [
      {
        question: 'Which specific process PID and thread is burning CPU cycles?',
        command: 'top -b -n 1 -o %CPU | head -n 15',
        whatToLookFor: 'Look at the top row: PID, %CPU, COMMAND, and the CPU state row (%us vs %sy vs %wa).',
        interpretation: 'If %us is high, user application code is looping. If %wa is high, the CPU is waiting on slow disk I/O.'
      },
      {
        question: 'Is the system starving for CPU or just busy?',
        command: 'vmstat 1 5',
        whatToLookFor: 'Check the "r" (runqueue) column. If r > number of CPU cores, processes are queueing.',
        interpretation: 'Confirms CPU saturation.'
      }
    ],
    recoveryPlan: {
      rule: 'Lower process priority (renice) or terminate gracefully before force-killing.',
      safeCommand: 'sudo renice +10 -p <PID> # or kill -15 <PID>',
      explanation: 'Gives scheduler priority back to SSH and essential daemons while allowing the process to clean up.'
    },
    recommendedChapterId: 'ch-21',
    recommendedConceptId: 'c-21-12',
    recommendedChapterTitle: 'Chapter 21: System Performance'
  },
  {
    id: 'prob-dns-failing',
    title: 'My DNS isn\'t working ("Could not resolve host")',
    category: 'Linux Networking',
    icon: Network,
    symptom: 'curl, apt update, or ping fails with "Temporary failure in name resolution" or "Could not resolve host".',
    rootCauses: [
      'Missing or malformed nameserver entries in /etc/resolv.conf',
      'systemd-resolved stub listener (127.0.0.53) hung or crashed',
      'Outbound UDP port 53 traffic blocked by network firewall',
      'Local /etc/hosts file containing stale IP overrides'
    ],
    diagnosticSteps: [
      {
        question: 'Can you reach an external IP directly without DNS?',
        command: 'ping -c 2 1.1.1.1',
        whatToLookFor: 'Check if packets return with 0% packet loss.',
        interpretation: 'If ping to 1.1.1.1 succeeds, network routing is fine and the bug is strictly DNS resolution.'
      },
      {
        question: 'What nameservers are currently configured in the system resolver?',
        command: 'cat /etc/resolv.conf',
        whatToLookFor: 'Look for "nameserver 1.1.1.1" or "nameserver 127.0.0.53".',
        interpretation: 'If empty, no DNS servers are known to the kernel.'
      },
      {
        question: 'Does a direct DNS query to a public nameserver succeed?',
        command: 'dig @1.1.1.1 google.com +short',
        whatToLookFor: 'Returns valid IP addresses (e.g. 142.250.x.x).',
        interpretation: 'If direct query succeeds but normal lookup fails, systemd-resolved needs restarting.'
      }
    ],
    recoveryPlan: {
      rule: 'Restart resolver daemon or configure fallback upstream DNS.',
      safeCommand: 'sudo systemctl restart systemd-resolved',
      explanation: 'Clears stale resolver caches and re-initializes DNS listeners.'
    },
    recommendedChapterId: 'ch-15',
    recommendedConceptId: 'c-15-12',
    recommendedChapterTitle: 'Chapter 15: Linux Networking'
  },
  {
    id: 'prob-cmd-not-found',
    title: 'My command says "command not found"',
    category: 'Linux Command Line',
    icon: Terminal,
    symptom: 'Typing a command returns "bash: <command>: command not found".',
    rootCauses: [
      'Package containing the binary executable is not installed',
      'Binary installed in custom path (/usr/local/bin, ~/.local/bin) not included in $PATH',
      'Script missing executable permission bit or wrong shebang path',
      'Typo in command name or case sensitivity mismatch'
    ],
    diagnosticSteps: [
      {
        question: 'Is the command an alias, builtin, or filesystem executable?',
        command: 'type -a <command_name>',
        whatToLookFor: 'Checks all shells builtins, aliases, and searches $PATH.',
        interpretation: 'Shows whether the executable exists anywhere on the system.'
      },
      {
        question: 'What directories are in your current shell $PATH?',
        command: 'echo $PATH',
        whatToLookFor: 'Check if /usr/local/bin, /usr/bin, or ~/.local/bin is present.',
        interpretation: 'Linux only searches paths explicitly listed in $PATH.'
      },
      {
        question: 'Which package provides this missing command?',
        command: 'apt-file search bin/<command_name> 2>/dev/null || which <command_name>',
        whatToLookFor: 'Finds the package name needed to install the utility.',
        interpretation: 'Tells you which package to install with apt or dnf.'
      }
    ],
    recoveryPlan: {
      rule: 'Export required directory to $PATH or install the package.',
      safeCommand: 'export PATH="$HOME/.local/bin:$PATH" # and add to ~/.bashrc',
      explanation: 'Adds the directory to your active session and persists it across reboots in your dotfiles.'
    },
    recommendedChapterId: 'ch-17',
    recommendedConceptId: 'c-17-05',
    recommendedChapterTitle: 'Chapter 17: Environment Variables'
  }
];

export interface LinuxProblemSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToConcept?: (conceptId: string) => void;
}

export const LinuxProblemSolverModal: React.FC<LinuxProblemSolverModalProps> = ({
  isOpen,
  onClose,
  onNavigateToConcept,
}) => {
  const [search, setSearch] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<ProblemScenario | null>(
    LINUX_PROBLEM_SCENARIOS[0]
  );
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProblems = LINUX_PROBLEM_SCENARIOS.filter((prob) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      prob.title.toLowerCase().includes(q) ||
      prob.category.toLowerCase().includes(q) ||
      prob.symptom.toLowerCase().includes(q)
    );
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '90vh',
          background: '#0a0e17',
          border: '1px solid rgba(6, 182, 212, 0.35)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(6, 182, 212, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          color: '#f8fafc',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.15rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.12) 0%, rgba(15, 23, 42, 0.6) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(6, 182, 212, 0.2)',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#06b6d4',
              }}
            >
              <AlertTriangle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc' }}>
                Linux Problem Solver — "I HAVE A PROBLEM"
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Senior Engineer Reasoning & Diagnostic Triage Decision Tree
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '0.4rem',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search bar */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            background: '#0d131f',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <Search size={16} color="#06b6d4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symptoms: 'permission denied', 'disk full', 'cannot SSH', 'service failed'..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: '0.88rem',
              fontFamily: 'monospace',
            }}
          />
        </div>

        {/* 2-Column Body: Problems List on left, Diagnostic Walkthrough on right */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {/* Left: Problems List */}
          <div
            style={{
              width: '320px',
              minWidth: '320px',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              overflowY: 'auto',
              background: '#090d16',
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', padding: '0.35rem 0.5rem' }}>
              Common Emergency Scenarios ({filteredProblems.length})
            </div>

            {filteredProblems.map((prob) => {
              const Icon = prob.icon;
              const isSelected = selectedProblem?.id === prob.id;
              return (
                <button
                  key={prob.id}
                  onClick={() => {
                    setSelectedProblem(prob);
                    setActiveStepIndex(0);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.65rem 0.75rem',
                    borderRadius: '10px',
                    background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
                    color: isSelected ? '#38bdf8' : '#cbd5e1',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <Icon size={16} color={isSelected ? '#06b6d4' : '#64748b'} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {prob.title}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                      {prob.category}
                    </div>
                  </div>
                  <ChevronRight size={14} color={isSelected ? '#06b6d4' : '#475569'} />
                </button>
              );
            })}
          </div>

          {/* Right: Diagnostic Reasoning Engine */}
          {selectedProblem ? (
            <div
              style={{
                flex: 1,
                minWidth: 0,
                overflowY: 'auto',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                background: '#0a0e17',
              }}
            >
              {/* Scenario Overview */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#06b6d4', background: 'rgba(6, 182, 212, 0.15)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {selectedProblem.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Diagnostic Reasoning Guide</span>
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#f8fafc' }}>
                  {selectedProblem.title}
                </h2>
                <p style={{ fontSize: '0.84rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                  {selectedProblem.symptom}
                </p>
              </div>

              {/* Potential Root Causes */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '0.5rem' }}>
                  Hypothesis Checklist (Why This Happens):
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.4rem' }}>
                  {selectedProblem.rootCauses.map((cause, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                      <span style={{ color: '#06b6d4', fontWeight: 700 }}>•</span>
                      <span>{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Diagnostic Questions */}
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.75rem' }}>
                  Step-by-Step Diagnostic Investigation:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {selectedProblem.diagnosticSteps.map((step, idx) => {
                    const isStepActive = activeStepIndex === idx;
                    return (
                      <div
                        key={idx}
                        style={{
                          background: isStepActive ? 'rgba(6, 182, 212, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                          border: isStepActive ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.06)',
                          borderRadius: '10px',
                          padding: '0.85rem 1rem',
                          cursor: 'pointer',
                        }}
                        onClick={() => setActiveStepIndex(idx)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: isStepActive ? '#38bdf8' : '#e2e8f0' }}>
                            Question {idx + 1}: {step.question}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                            {isStepActive ? 'Active Diagnostic' : 'Click to inspect'}
                          </span>
                        </div>

                        {/* Diagnostic Command Box */}
                        <div
                          style={{
                            background: '#030712',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '6px',
                            padding: '0.45rem 0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontFamily: 'monospace',
                            fontSize: '0.8rem',
                            color: '#4ade80',
                            marginTop: '0.4rem',
                          }}
                        >
                          <span>$ {step.command}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(step.command);
                            }}
                            style={{
                              fontSize: '0.68rem',
                              background: 'rgba(255, 255, 255, 0.1)',
                              border: 'none',
                              color: '#fff',
                              borderRadius: '4px',
                              padding: '0.2rem 0.5rem',
                              cursor: 'pointer',
                            }}
                          >
                            {copiedCmd === step.command ? 'Copied!' : 'Copy'}
                          </button>
                        </div>

                        {/* What to look for & interpretation */}
                        {isStepActive && (
                          <div style={{ marginTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem' }}>
                            <div style={{ color: '#cbd5e1' }}>
                              <strong style={{ color: '#f59e0b' }}>What to look for: </strong>
                              {step.whatToLookFor}
                            </div>
                            <div style={{ color: '#94a3b8' }}>
                              <strong style={{ color: '#38bdf8' }}>Reasoning: </strong>
                              {step.interpretation}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guided Recovery Action Card */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '10px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4ade80', fontSize: '0.82rem', fontWeight: 800 }}>
                  <CheckCircle2 size={16} />
                  <span>Guided Recovery Action:</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                  {selectedProblem.recoveryPlan.rule}
                </div>
                <div
                  style={{
                    background: '#030712',
                    border: '1px solid rgba(34, 197, 94, 0.25)',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    fontFamily: 'monospace',
                    fontSize: '0.82rem',
                    color: '#86efac',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>$ {selectedProblem.recoveryPlan.safeCommand}</span>
                  <button
                    onClick={() => handleCopy(selectedProblem.recoveryPlan.safeCommand)}
                    style={{
                      fontSize: '0.68rem',
                      background: 'rgba(34, 197, 94, 0.2)',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                      color: '#4ade80',
                      borderRadius: '4px',
                      padding: '0.2rem 0.5rem',
                      cursor: 'pointer',
                    }}
                  >
                    {copiedCmd === selectedProblem.recoveryPlan.safeCommand ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {selectedProblem.recoveryPlan.explanation}
                </div>
              </div>

              {/* Jump to Academy Chapter Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateToConcept) {
                      onNavigateToConcept(selectedProblem.recommendedConceptId);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 1.15rem',
                    color: '#fff',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(6, 182, 212, 0.3)',
                  }}
                >
                  <BookOpen size={16} />
                  <span>Learn Complete Topic: {selectedProblem.recommendedChapterTitle}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
