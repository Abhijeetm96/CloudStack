import React, { useState, useMemo } from 'react';
import { useLinux } from '../../context/LinuxContext';
import {
  Terminal,
  BookOpen,
  Search,
  Copy,
  Check,
  ExternalLink,
  Tag,
  ShieldAlert,
  Code2,
  FolderTree,
  FileCode,
  ShieldCheck,
  Cpu,
  Server,
  Activity,
} from 'lucide-react';

interface LinuxCommandDoc {
  name: string;
  category: 'files' | 'text' | 'perms' | 'procs' | 'services' | 'bash' | 'troubleshoot';
  moduleCode: string;
  synopsis: string;
  description: string;
  options: Array<{ flag: string; desc: string; example: string }>;
  pitfall: string;
  kernelContext?: string;
}

const LINUX_COMMAND_DOCS: LinuxCommandDoc[] = [
  {
    name: 'find',
    category: 'files',
    moduleCode: '01.2',
    synopsis: 'find [path...] [expression]',
    description: 'Recursively walks the directory tree matching files by name, type, modification time, size, or permissions.',
    options: [
      { flag: '-name "*.log"', desc: 'Match file names by glob pattern', example: 'find /var/log -name "*.log"' },
      { flag: '-type f / -type d', desc: 'Filter by file type (f=regular file, d=directory)', example: 'find /tmp -type f' },
      { flag: '-mtime -7', desc: 'Files modified less than 7 days ago', example: 'find /data -mtime -7' },
      { flag: '-size +100M', desc: 'Files larger than 100 megabytes', example: 'find /var -size +100M' },
      { flag: '-exec rm {} +', desc: 'Execute command on all matched files safely', example: 'find /tmp -name "*.tmp" -exec rm {} +' },
    ],
    pitfall: 'Avoid using `find ... | xargs rm` on filenames containing spaces; use `find ... -print0 | xargs -0 rm` instead.',
    kernelContext: 'Uses getdents64 syscall to traverse filesystem inodes without opening file descriptors.',
  },
  {
    name: 'stat',
    category: 'files',
    moduleCode: '01.2',
    synopsis: 'stat [OPTION]... FILE...',
    description: 'Displays comprehensive file or filesystem status including Inode number, size, device ID, exact permissions, and atime/mtime/ctime timestamps.',
    options: [
      { flag: '-c "%a %n"', desc: 'Custom format output (e.g. octal permissions)', example: 'stat -c "%a %n" /etc/passwd' },
      { flag: '-f', desc: 'Display filesystem status instead of file status', example: 'stat -f /' },
    ],
    pitfall: 'ctime represents inode metadata modification time (e.g. chmod/chown), not file creation time.',
    kernelContext: 'Issues the statx or fstatat64 system calls directly to the VFS layer.',
  },
  {
    name: 'grep',
    category: 'text',
    moduleCode: '01.3',
    synopsis: 'grep [OPTIONS] PATTERN [FILE...]',
    description: 'Searches input streams or files for lines matching regular expressions, with high-performance Boyer-Moore search algorithms.',
    options: [
      { flag: '-E, --extended-regexp', desc: 'Interpret PATTERN as an extended regular expression (ERE)', example: 'grep -E "404|500" /var/log/nginx/access.log' },
      { flag: '-i, --ignore-case', desc: 'Ignore case distinctions in patterns and input data', example: 'grep -i "error" app.log' },
      { flag: '-r, --recursive', desc: 'Read all files under each directory, recursively', example: 'grep -rn "API_KEY" src/' },
      { flag: '-v, --invert-match', desc: 'Invert the sense of matching, to select non-matching lines', example: 'grep -v "^#" /etc/hosts' },
    ],
    pitfall: 'Searching without quotes around patterns containing spaces or metacharacters can cause shell expansion bugs.',
    kernelContext: 'Uses memory-mapped IO (mmap) on modern Linux for high-throughput searching.',
  },
  {
    name: 'awk',
    category: 'text',
    moduleCode: '01.3',
    synopsis: "awk 'pattern { action }' [file]",
    description: 'Turing-complete pattern scanning and stream processing language designed for column-oriented structured log analysis.',
    options: [
      { flag: "-F ':'", desc: 'Define field separator character (default is whitespace)', example: "awk -F: '{print $1, $7}' /etc/passwd" },
      { flag: "'$9 >= 500'", desc: 'Conditional filtering on specific columns', example: "awk '$9 >= 500 {print $1, $7, $9}' access.log" },
      { flag: "'{sum += $1} END {print sum}'", desc: 'Running numerical aggregation across input lines', example: "awk '{sum += $1} END {print sum}' numbers.txt" },
    ],
    pitfall: 'Remember that $0 represents the entire line, while $1, $2, ... represent individual columns.',
  },
  {
    name: 'sed',
    category: 'text',
    moduleCode: '01.3',
    synopsis: "sed [OPTION] 's/find/replace/flags' [file]",
    description: 'Stream editor for filtering and transforming text in a single pass without opening files interactively.',
    options: [
      { flag: "-i, --in-place", desc: 'Edit files in place instead of writing to standard output', example: "sed -i 's/localhost/127.0.0.1/g' config.yaml" },
      { flag: "'s/foo/bar/g'", desc: 'Global substitution on every occurrence in each line', example: "sed 's/http/https/g' urls.txt" },
      { flag: "'/pattern/d'", desc: 'Delete all lines matching the specified pattern', example: "sed '/^$/d' input.txt" },
    ],
    pitfall: 'Running `sed -i` without a backup suffix (`sed -i.bak`) can permanently corrupt configuration files if the regex is wrong.',
  },
  {
    name: 'chmod',
    category: 'perms',
    moduleCode: '01.4',
    synopsis: 'chmod [OPTION]... MODE[,MODE]... FILE...',
    description: 'Changes file access permissions using either symbolic mode (u/g/o +/- rwx) or octal numeric representation (e.g. 755, 644).',
    options: [
      { flag: '-R, --recursive', desc: 'Change files and directories recursively', example: 'chmod -R 755 /var/www/html' },
      { flag: '755 (rwxr-xr-x)', desc: 'Owner has full control; group and others can read and execute', example: 'chmod 755 deploy.sh' },
      { flag: '600 (rw-------)', desc: 'Only owner can read/write; private keys and secrets', example: 'chmod 600 ~/.ssh/id_rsa' },
      { flag: '+x', desc: 'Add execute permission for all users', example: 'chmod +x test.sh' },
      { flag: '4755 (SUID)', desc: 'Execute with permissions of file owner (Setuid bit)', example: 'chmod 4755 /usr/bin/passwd' },
    ],
    pitfall: 'Never run `chmod -R 777 /` as it removes all security boundaries and breaks programs like sshd.',
    kernelContext: 'Modifies the i_mode bitmask on the VFS inode structure.',
  },
  {
    name: 'umask',
    category: 'perms',
    moduleCode: '01.4',
    synopsis: 'umask [-S] [mask]',
    description: 'Sets or displays the shell calling process file mode creation mask, subtracting permissions from 666 (files) and 777 (dirs).',
    options: [
      { flag: '(no args)', desc: 'Print the current octal umask', example: 'umask' },
      { flag: '-S', desc: 'Print the current mask in symbolic form', example: 'umask -S' },
      { flag: '0027', desc: 'Deny others all access; allow group read/execute', example: 'umask 0027' },
    ],
    pitfall: 'umask only subtracts permissions; it cannot grant permissions not requested by open().',
  },
  {
    name: 'ps',
    category: 'procs',
    moduleCode: '01.5',
    synopsis: 'ps [options]',
    description: 'Reports a snapshot of the current active processes, displaying PID, PPID, user, CPU%, memory%, and command line arguments.',
    options: [
      { flag: 'aux (BSD syntax)', desc: 'View all processes running on system with owner username', example: 'ps aux | grep nginx' },
      { flag: '-ef (POSIX syntax)', desc: 'Full-format listing of every system process with PPID', example: 'ps -ef --forest' },
      { flag: '--sort=-%mem', desc: 'Sort processes by memory consumption descending', example: 'ps aux --sort=-%mem | head -n 10' },
    ],
    pitfall: '`ps aux` uses BSD syntax (no leading dash), while `ps -ef` uses standard UNIX options.',
    kernelContext: 'Reads from /proc/[pid]/stat, /proc/[pid]/status, and /proc/[pid]/cmdline.',
  },
  {
    name: 'kill',
    category: 'procs',
    moduleCode: '01.5',
    synopsis: 'kill [-s SIGNAL | -SIGNAL] PID...',
    description: 'Sends a UNIX signal to specified process IDs or process groups. Defaults to SIGTERM (15) for graceful termination.',
    options: [
      { flag: '-15, -SIGTERM', desc: 'Request graceful shutdown allowing processes to clean up sockets', example: 'kill -15 1234' },
      { flag: '-9, -SIGKILL', desc: 'Uncatchable kernel termination; destroys process immediately', example: 'kill -9 1234' },
      { flag: '-1, -SIGHUP', desc: 'Hangup signal; prompts daemons to reload configuration without restart', example: 'kill -1 $(pgrep nginx)' },
    ],
    pitfall: 'Always send SIGTERM first; jumping directly to SIGKILL prevents database flushes and lock file cleanup.',
  },
  {
    name: 'systemctl',
    category: 'services',
    moduleCode: '01.6',
    synopsis: 'systemctl [COMMAND] [UNIT...]',
    description: 'Control the systemd init system, managing unit lifecycle, service status, startup dependencies, and cgroups.',
    options: [
      { flag: 'status <unit>', desc: 'Show runtime status, PID, memory, and recent journal logs', example: 'systemctl status nginx' },
      { flag: 'start / stop / restart', desc: 'Trigger unit activation or deactivation', example: 'sudo systemctl restart nginx' },
      { flag: 'enable / disable', desc: 'Create or remove symlinks in /etc/systemd/system for boot start', example: 'sudo systemctl enable nginx' },
      { flag: '--failed', desc: 'List all units that entered a degraded or failed state', example: 'systemctl --failed' },
    ],
    pitfall: '`systemctl enable` does not start the service immediately unless `--now` is specified.',
  },
  {
    name: 'journalctl',
    category: 'services',
    moduleCode: '01.6',
    synopsis: 'journalctl [OPTIONS...]',
    description: 'Query and filter the systemd journal structured binary logging daemon (systemd-journald).',
    options: [
      { flag: '-u <unit>', desc: 'Show logs generated by a specific service unit', example: 'journalctl -u nginx --no-pager' },
      { flag: '-f', desc: 'Follow new log messages in real-time (like tail -f)', example: 'journalctl -u nginx -f' },
      { flag: '-p err', desc: 'Filter by syslog priority (emerg, alert, crit, err, warning)', example: 'journalctl -p err -b' },
      { flag: '--since "1 hour ago"', desc: 'Show entries not older than the specified time offset', example: 'journalctl --since "1 hour ago"' },
    ],
    pitfall: 'By default, journalctl pipes into `less`; use `--no-pager` in automated bash scripts.',
  },
  {
    name: 'df',
    category: 'troubleshoot',
    moduleCode: '01.8',
    synopsis: 'df [OPTION]... [FILE]...',
    description: 'Reports filesystem disk space usage, mount points, available blocks, and inode capacity.',
    options: [
      { flag: '-h, --human-readable', desc: 'Print sizes in powers of 1024 (e.g., 1024M, 24G)', example: 'df -h' },
      { flag: '-i, --inodes', desc: 'List inode availability instead of block usage (diagnoses "No space left on device")', example: 'df -i' },
      { flag: '-T, --print-type', desc: 'Print filesystem type (ext4, xfs, overlay, btrfs)', example: 'df -hT' },
    ],
    pitfall: 'A disk can be 100% full even if `df -h` shows gigabytes free if `df -i` shows 100% inode exhaustion.',
  },
  {
    name: 'lsof',
    category: 'troubleshoot',
    moduleCode: '01.8',
    synopsis: 'lsof [options]',
    description: 'Lists open file descriptors held by active processes, including network sockets, regular files, pipes, and unix domain sockets.',
    options: [
      { flag: '-i :<port>', desc: 'Find process listening or communicating on a specific TCP/UDP port', example: 'lsof -i :80' },
      { flag: '-p <pid>', desc: 'List all files and sockets currently open by PID', example: 'lsof -p 1044' },
      { flag: '+D <dir>', desc: 'Recursively search for processes accessing files in directory', example: 'lsof +D /var/log' },
    ],
    pitfall: 'lsof requires root / sudo permissions to inspect file descriptors owned by other user accounts.',
  },
  {
    name: 'ulimit',
    category: 'troubleshoot',
    moduleCode: '01.8',
    synopsis: 'ulimit [-SHa...] [limit]',
    description: 'Controls shell process resource limits including open file descriptors (nofile), maximum processes (nproc), and stack size.',
    options: [
      { flag: '-n [number]', desc: 'View or set the maximum number of open file descriptors', example: 'ulimit -n' },
      { flag: '-u [number]', desc: 'View or set the maximum user process limit', example: 'ulimit -u' },
      { flag: '-a', desc: 'Display all resource limits in one view', example: 'ulimit -a' },
    ],
    pitfall: 'Non-root users can only lower hard limits, not increase them past limits configured in `/etc/security/limits.conf`.',
  },
];

export const LinuxReferenceView: React.FC = () => {
  const { setMode } = useLinux();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Commands' },
    { id: 'files', label: 'Files & Dirs (01.2)' },
    { id: 'text', label: 'Text Streams (01.3)' },
    { id: 'perms', label: 'Permissions (01.4)' },
    { id: 'procs', label: 'Processes (01.5)' },
    { id: 'services', label: 'Services (01.6)' },
    { id: 'troubleshoot', label: 'Troubleshooting (01.8)' },
  ];

  const filteredDocs = useMemo(() => {
    return LINUX_COMMAND_DOCS.filter((doc) => {
      const matchesCat = selectedCategory === 'all' || doc.category === selectedCategory;
      if (!matchesCat) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        doc.name.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q) ||
        doc.synopsis.toLowerCase().includes(q) ||
        doc.options.some((o) => o.flag.toLowerCase().includes(q) || o.desc.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd((curr) => (curr === text ? null : curr)), 2000);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        background: 'var(--bg-app)',
        color: 'var(--text-primary)',
        overflowY: 'auto',
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          padding: '1.25rem 2rem',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <BookOpen size={20} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              Linux POSIX &amp; SRE Command Atlas
            </h1>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0.15rem 0 0 0' }}>
              Full command reference, flags, syntax breakdowns, and kernel mechanics for Chapter 01
            </p>
          </div>
        </div>

        <button
          onClick={() => setMode('academy')}
          style={{
            padding: '0.45rem 0.95rem',
            borderRadius: '8px',
            background: 'rgba(6, 182, 212, 0.15)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            color: '#06b6d4',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Back to Lessons
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          padding: '1rem 2rem',
          background: 'rgba(0, 0, 0, 0.2)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search Linux command, flag or concept (e.g. find, stat, umask, kill, lsof)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 1rem 0.5rem 2.2rem',
                borderRadius: '8px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '0.84rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  background: selectedCategory === c.id ? '#06b6d4' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedCategory === c.id ? '#000' : 'var(--text-secondary)',
                  fontWeight: selectedCategory === c.id ? 800 : 600,
                  fontSize: '0.75rem',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Commands Grid */}
      <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredDocs.map((doc) => (
          <div
            key={doc.name}
            style={{
              background: 'var(--bg-surface)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: '#06b6d4',
                  }}
                >
                  {doc.name}
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: 'rgba(6, 182, 212, 0.12)',
                    color: '#38bdf8',
                    border: '1px solid rgba(6, 182, 212, 0.25)',
                  }}
                >
                  Mod {doc.moduleCode}
                </span>
                {doc.kernelContext && (
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    ⚙️ {doc.kernelContext}
                  </span>
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <code style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>{doc.synopsis}</code>
                <button
                  onClick={() => copyToClipboard(doc.synopsis)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Copy synopsis"
                >
                  {copiedCmd === doc.synopsis ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Description */}
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {doc.description}
            </div>

            {/* Options Table */}
            <div
              style={{
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                background: 'rgba(0, 0, 0, 0.25)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr 280px',
                  padding: '0.45rem 0.85rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                <div>Flag / Option</div>
                <div>Purpose &amp; Description</div>
                <div>Example Usage</div>
              </div>

              {doc.options.map((opt, oIdx) => (
                <div
                  key={oIdx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr 280px',
                    padding: '0.55rem 0.85rem',
                    borderBottom: oIdx === doc.options.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.05)',
                    fontSize: '0.8rem',
                    alignItems: 'center',
                  }}
                >
                  <code style={{ color: '#38bdf8', fontWeight: 700 }}>{opt.flag}</code>
                  <div style={{ color: '#cbd5e1', paddingRight: '0.5rem' }}>{opt.desc}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <code style={{ color: '#a7f3d0', fontSize: '0.76rem' }}>{opt.example}</code>
                    <button
                      onClick={() => copyToClipboard(opt.example)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title="Copy example command"
                    >
                      {copiedCmd === opt.example ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pitfall / SRE Alert */}
            {doc.pitfall && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  fontSize: '0.78rem',
                  color: '#fca5a5',
                }}
              >
                <ShieldAlert size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong style={{ color: '#f87171' }}>SRE Pitfall:</strong> {doc.pitfall}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
