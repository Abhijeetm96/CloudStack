import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 11: PROCESSES (11.1 to 11.18)
// ============================================================================
export const CHAPTER_11: LinuxTopic = {
  id: 'ch-11',
  number: '11',
  title: 'Processes',
  iconName: 'Activity',
  description: 'Understand programs in execution: PIDs, process trees, ps, top/htop, job control, signals (SIGTERM, SIGKILL), and nice priorities.',
  concepts: [
    buildLinuxConcept({
      id: 'c-11-01',
      subChapterNumber: '11.1',
      command: 'ps -ef | head -n 15',
      title: 'What is a Process?',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'A program in active execution with its own virtual memory address space, threads, and file descriptors',
      badges: ['Processes', 'Kernel', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-11-02',
      subChapterNumber: '11.2',
      command: 'echo $$',
      title: 'Process IDs',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'PID integers uniquely identifying every running process in the kernel process table',
      badges: ['PID', 'Kernel'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-11-03',
      subChapterNumber: '11.3',
      command: 'pstree -p',
      title: 'Parent and Child Processes',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'The process hierarchy: every process is created by a parent via fork() branching from PID 1 (systemd)',
      badges: ['Fork', 'Tree', 'PPID'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-11-04',
      subChapterNumber: '11.4',
      command: 'ps aux | grep nginx',
      title: 'ps',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Process Status: snapshot current running processes, CPU/memory usage, and state codes',
      badges: ['Processes', 'CLI', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-11-05',
      subChapterNumber: '11.5',
      command: 'top -b -n 1 | head -n 20',
      title: 'top',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Interactive real-time task manager displaying CPU load, memory breakdown, and top consumers',
      badges: ['Monitoring', 'Observability', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-11-06',
      subChapterNumber: '11.6',
      command: 'htop',
      title: 'htop',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Modern colorized interactive process viewer with per-core CPU meters and mouse support',
      badges: ['Monitoring', 'UI'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-11-07',
      subChapterNumber: '11.7',
      command: 'jobs -l',
      title: 'jobs',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Inspect processes currently managed by the active shell session in background or suspended states',
      badges: ['JobControl', 'Shell'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-11-08',
      subChapterNumber: '11.8',
      command: 'fg %1',
      title: 'fg',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Foreground: bring a background or paused job back into interactive terminal focus',
      badges: ['JobControl', 'Shell'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-11-09',
      subChapterNumber: '11.9',
      command: 'bg %1',
      title: 'bg',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Background: resume execution of a suspended job (Ctrl+Z) without blocking the shell',
      badges: ['JobControl', 'Shell'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-11-10',
      subChapterNumber: '11.10',
      command: 'kill -l',
      title: 'Process Signals',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Asynchronous software interrupts delivered by the kernel to inform processes of system events',
      badges: ['Signals', 'Kernel', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-11-11',
      subChapterNumber: '11.11',
      command: 'kill -15 1234',
      title: 'SIGTERM',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Signal 15: graceful termination request allowing the application to close connections and flush caches',
      badges: ['Signals', 'Graceful', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-11-12',
      subChapterNumber: '11.12',
      command: 'kill -9 1234',
      title: 'SIGKILL',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Signal 9: uncatchable immediate destruction handled directly by kernel scheduler (nuclear option)',
      badges: ['Signals', 'ForceKill'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-11-13',
      subChapterNumber: '11.13',
      command: 'kill -2 1234',
      title: 'SIGINT',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Signal 2 (Ctrl+C): interactive terminal interrupt politely requesting process to halt execution',
      badges: ['Signals', 'Keyboard'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-11-14',
      subChapterNumber: '11.14',
      command: 'kill 1234',
      title: 'kill',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Send specified signal (default SIGTERM 15) to target Process ID (PID)',
      badges: ['Signals', 'CLI', 'Core'],
      difficulty: 'Beginner',
      beforeAfter: {
        before: 'PID 1234 (node /app/server.js) running with 14% CPU',
        after: 'PID 1234 terminated cleanly; process table slot reclaimed',
        explanation: 'SIGTERM delivered to PID 1234, gracefully releasing sockets and exiting.'
      }
    }),
    buildLinuxConcept({
      id: 'c-11-15',
      subChapterNumber: '11.15',
      command: 'killall nginx',
      title: 'killall',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Terminate all running process instances matching a specific executable binary name',
      badges: ['Signals', 'Batch'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-11-16',
      subChapterNumber: '11.16',
      command: 'ps -eo pid,ni,comm | head -n 15',
      title: 'Process Priority',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'CFS (Completely Fair Scheduler) priority: nice values from -20 (highest) to +19 (lowest)',
      badges: ['Scheduling', 'Kernel'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-11-17',
      subChapterNumber: '11.17',
      command: 'nice -n 10 ./heavy_backup.sh',
      title: 'nice',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Launch a new process with adjusted scheduling priority to prevent starving web traffic',
      badges: ['Scheduling', 'Priorities'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-11-18',
      subChapterNumber: '11.18',
      command: 'sudo renice -n -5 -p 1234',
      title: 'renice',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Dynamically alter the nice scheduling priority of an already-running process',
      badges: ['Scheduling', 'LiveTuning'],
      difficulty: 'Intermediate'
    })
  ]
};

// ============================================================================
// CHAPTER 12: SERVICES AND SYSTEMD (12.1 to 12.14)
// ============================================================================
export const CHAPTER_12: LinuxTopic = {
  id: 'ch-12',
  number: '12',
  title: 'Services and systemd',
  iconName: 'Server',
  description: 'Master systemd: manage daemons with systemctl, inspect logs with journalctl, create unit files, and configure boot targets.',
  concepts: [
    buildLinuxConcept({
      id: 'c-12-01',
      subChapterNumber: '12.1',
      command: 'systemctl list-units --type=service --state=running | head -n 15',
      title: 'What is a Service?',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Background daemons running continuously without an interactive terminal window (Nginx, SSHD, MySQL)',
      badges: ['Services', 'Daemons', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-12-02',
      subChapterNumber: '12.2',
      command: 'ps -p 1',
      title: 'systemd',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'The Linux init system and service manager running as PID 1, orchestrating system boot and daemons',
      badges: ['systemd', 'PID1', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-12-03',
      subChapterNumber: '12.3',
      command: 'systemctl --version',
      title: 'systemctl',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Primary command-line control tool for inspecting and managing systemd units and states',
      badges: ['systemctl', 'CLI', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-12-04',
      subChapterNumber: '12.4',
      command: 'sudo systemctl start nginx',
      title: 'Start Service',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Transition service from inactive to active/running state in the current session',
      badges: ['Lifecycle', 'Start'],
      difficulty: 'Beginner',
      beforeAfter: {
        before: 'nginx.service: inactive (dead)',
        after: 'nginx.service: active (running) with worker processes bound to port 80',
        explanation: 'systemd executed ExecStart binary, verified socket creation, and marked unit active.'
      }
    }),
    buildLinuxConcept({
      id: 'c-12-05',
      subChapterNumber: '12.5',
      command: 'sudo systemctl stop nginx',
      title: 'Stop Service',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Send SIGTERM to service daemon and transition unit state to inactive',
      badges: ['Lifecycle', 'Stop'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-12-06',
      subChapterNumber: '12.6',
      command: 'sudo systemctl restart nginx',
      title: 'Restart Service',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Completely stop and re-launch daemon (or "reload" to apply configs with zero downtime)',
      badges: ['Lifecycle', 'Restart'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-12-07',
      subChapterNumber: '12.7',
      command: 'sudo systemctl enable nginx',
      title: 'Enable Service',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Create symlink in /etc/systemd/system/ multi-user target to automatically start service at boot',
      badges: ['Boot', 'Enable', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-12-08',
      subChapterNumber: '12.8',
      command: 'sudo systemctl disable nginx',
      title: 'Disable Service',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Remove auto-start boot symlinks so the service does not launch during system initialization',
      badges: ['Boot', 'Disable'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-12-09',
      subChapterNumber: '12.9',
      command: 'systemctl status nginx',
      title: 'Service Status',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Inspect live health status: Loaded, Active, Main PID, memory usage, and recent journal log entries',
      badges: ['Diagnostics', 'Status', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-12-10',
      subChapterNumber: '12.10',
      command: 'journalctl -u nginx.service -n 50 --no-pager',
      title: 'journalctl',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Query the centralized binary systemd-journald database by unit (-u), boot (-b), or follow (-f)',
      badges: ['Logging', 'journalctl', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-12-11',
      subChapterNumber: '12.11',
      command: 'systemctl list-unit-files --type=service | head -n 15',
      title: 'systemd Units',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Configuration objects representing services (.service), timers (.timer), sockets (.socket), and mounts',
      badges: ['systemd', 'Units'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-12-12',
      subChapterNumber: '12.12',
      command: 'cat /etc/systemd/system/myapp.service',
      title: 'Service Files',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Declarative INI-style unit files with [Unit], [Service] (ExecStart, Restart=always), and [Install]',
      badges: ['Config', 'systemd', 'DevOps'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-12-13',
      subChapterNumber: '12.13',
      command: 'systemctl get-default',
      title: 'Boot Targets',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Modern replacement for legacy Runlevels: multi-user.target (headless CLI) vs graphical.target (GUI desktop)',
      badges: ['Targets', 'Boot'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-12-14',
      subChapterNumber: '12.14',
      command: 'systemctl --failed',
      title: 'Troubleshooting Failed Services',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Diagnose crash-looping services using systemctl --failed, journalctl -xeu, and exit status codes',
      badges: ['Troubleshooting', 'Triage', 'Core'],
      difficulty: 'Intermediate'
    })
  ]
};

// ============================================================================
// CHAPTER 13: PACKAGE MANAGEMENT (13.1 to 13.17)
// ============================================================================
export const CHAPTER_13: LinuxTopic = {
  id: 'ch-13',
  number: '13',
  title: 'Package Management',
  iconName: 'Package',
  description: 'Install, update, remove, and verify software across Debian/Ubuntu (apt/dpkg) and RedHat/Fedora (dnf/rpm) ecosystems.',
  concepts: [
    buildLinuxConcept({
      id: 'c-13-01',
      subChapterNumber: '13.1',
      command: 'which apt dnf',
      title: 'Why Package Managers Exist',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Eliminating "dependency hell" by automating software compilation, library resolution, and security patches',
      badges: ['Packages', 'Foundations', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-13-02',
      subChapterNumber: '13.2',
      command: 'file package.deb',
      title: 'Packages',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Compressed archive bundles (.deb or .rpm) containing precompiled binaries, config files, and metadata',
      badges: ['Packages', 'Archives'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-13-03',
      subChapterNumber: '13.3',
      command: 'cat /etc/apt/sources.list',
      title: 'Repositories',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Cryptographically signed remote servers hosting authenticated package indexes and downloads',
      badges: ['Repositories', 'Security'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-13-04',
      subChapterNumber: '13.4',
      command: 'apt --version',
      title: 'apt',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Advanced Package Tool: the unified CLI package frontend for Debian, Ubuntu, and Linux Mint',
      badges: ['apt', 'Debian', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-13-05',
      subChapterNumber: '13.5',
      command: 'sudo apt update',
      title: 'apt update',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Refresh local metadata cache from remote repository servers without installing or modifying software',
      badges: ['apt', 'Metadata', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-13-06',
      subChapterNumber: '13.6',
      command: 'sudo apt upgrade -y',
      title: 'apt upgrade',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Install latest authenticated security patches and updates for all currently installed packages',
      badges: ['apt', 'Updates', 'Security'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-13-07',
      subChapterNumber: '13.7',
      command: 'sudo apt install -y curl nginx git',
      title: 'apt install',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Automatically resolve dependencies, download packages, and install binaries with systemd integration',
      badges: ['apt', 'Install', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-13-08',
      subChapterNumber: '13.8',
      command: 'sudo apt remove nginx',
      title: 'apt remove',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Delete package binaries and libraries while safely leaving configuration files in /etc intact',
      badges: ['apt', 'Removal'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-13-09',
      subChapterNumber: '13.9',
      command: 'sudo apt purge nginx',
      title: 'apt purge',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Completely eliminate software binaries AND purge all associated configuration files from /etc',
      badges: ['apt', 'Purge', 'Cleanup'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-13-10',
      subChapterNumber: '13.10',
      command: 'apt search postgresql',
      title: 'apt search',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Query local repository metadata cache for available software packages matching keyword',
      badges: ['apt', 'Search'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-13-11',
      subChapterNumber: '13.11',
      command: 'apt show nginx',
      title: 'apt show',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Display package details: version, maintainer, download size, dependencies, and official description',
      badges: ['apt', 'Inspection'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-13-12',
      subChapterNumber: '13.12',
      command: 'dpkg -l | grep ssl',
      title: 'dpkg',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Low-level Debian package manager handling local .deb archive unpacking without network fetching',
      badges: ['dpkg', 'LowLevel'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-13-13',
      subChapterNumber: '13.13',
      command: 'rpm -qa | head -n 15',
      title: 'RPM',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Red Hat Package Manager: low-level package database format used by RHEL, CentOS, and Fedora',
      badges: ['RPM', 'RedHat'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-13-14',
      subChapterNumber: '13.14',
      command: 'sudo dnf install -y nginx',
      title: 'dnf',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Dandified YUM: modern next-generation repository frontend for Fedora, RHEL 8+, and Rocky Linux',
      badges: ['dnf', 'RedHat', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-13-15',
      subChapterNumber: '13.15',
      command: 'yum check-update',
      title: 'yum',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Legacy package manager on RHEL/CentOS 7 (now symlinked to dnf on modern releases)',
      badges: ['yum', 'Legacy'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-13-16',
      subChapterNumber: '13.16',
      command: 'apt-cache depends nginx',
      title: 'Package Dependencies',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Dependency resolution algorithms ensuring required shared libraries (libssl, libc) exist before installation',
      badges: ['Dependencies', 'Architecture'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-13-17',
      subChapterNumber: '13.17',
      command: 'ls -la /etc/apt/sources.list.d/',
      title: 'Repository Configuration',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Adding third-party repositories securely using GPG keyring files in /etc/apt/keyrings/',
      badges: ['GPG', 'Security', 'Admin'],
      difficulty: 'Intermediate'
    })
  ]
};

// ============================================================================
// CHAPTER 14: DISKS AND STORAGE (14.1 to 14.19)
// ============================================================================
export const CHAPTER_14: LinuxTopic = {
  id: 'ch-14',
  number: '14',
  title: 'Disks and Storage',
  iconName: 'HardDrive',
  description: 'Understand storage architecture: block devices, partition tables (GPT/MBR), ext4/XFS filesystems, mounting, fstab, and LVM.',
  concepts: [
    buildLinuxConcept({
      id: 'c-14-01',
      subChapterNumber: '14.1',
      command: 'lsblk',
      title: 'Block Devices',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Hardware storage devices that read and write fixed-size blocks (512B/4KB) located in /dev (sda, nvme0n1)',
      badges: ['Storage', 'BlockDevices', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-14-02',
      subChapterNumber: '14.2',
      command: 'cat /sys/block/sda/queue/rotational',
      title: 'HDD vs SSD',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Spinning mechanical platters (rotational=1) vs solid-state NVMe NAND flash (rotational=0) and I/O schedulers',
      badges: ['Hardware', 'Performance'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-14-03',
      subChapterNumber: '14.3',
      command: 'lsblk -f',
      title: 'lsblk',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'List Block Devices: tree visualization showing disks, partitions, filesystem types (FSTYPE), and mount points',
      badges: ['Discovery', 'lsblk', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-14-04',
      subChapterNumber: '14.4',
      command: 'sudo fdisk -l /dev/sda',
      title: 'fdisk',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Interactive CLI utility for viewing and creating MBR and GPT disk partition tables',
      badges: ['Partitions', 'fdisk'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-14-05',
      subChapterNumber: '14.5',
      command: 'sudo parted /dev/sdb print',
      title: 'parted',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Advanced partitioning utility supporting drives larger than 2TB with GUID Partition Tables (GPT)',
      badges: ['GPT', 'Partitions'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-14-06',
      subChapterNumber: '14.6',
      command: 'cat /proc/partitions',
      title: 'Disk Partitions',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Logical boundaries carving physical drives into isolated sections (/dev/sda1, /dev/sda2)',
      badges: ['Storage', 'Partitions'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-14-07',
      subChapterNumber: '14.7',
      command: 'df -T',
      title: 'Filesystems',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Data structures organizing raw disk sectors into directories, filenames, timestamps, and permissions',
      badges: ['Filesystems', 'Architecture'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-14-08',
      subChapterNumber: '14.8',
      command: 'tune2fs -l /dev/sda1 | head -n 15',
      title: 'ext4',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Fourth Extended Filesystem: reliable journaling filesystem standard across Ubuntu and Debian',
      badges: ['ext4', 'Journaling', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-14-09',
      subChapterNumber: '14.9',
      command: 'xfs_info /',
      title: 'XFS',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'High-performance 64-bit journaling filesystem default on RHEL, optimized for large parallel enterprise I/O',
      badges: ['XFS', 'Enterprise'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-14-10',
      subChapterNumber: '14.10',
      command: 'sudo mkfs.ext4 /dev/sdb1',
      title: 'mkfs',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Make Filesystem: formats a raw partition with superblock, inode tables, and journal blocks',
      badges: ['Formatting', 'mkfs'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-14-11',
      subChapterNumber: '14.11',
      command: 'findmnt',
      title: 'Mounting',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Attaching a formatted disk partition to an empty directory node in the single Linux root tree',
      badges: ['Mounting', 'VFS', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-14-12',
      subChapterNumber: '14.12',
      command: 'sudo mount /dev/sdb1 /mnt/data',
      title: 'mount',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Command to attach storage devices to target directory mount points with specified options',
      badges: ['mount', 'Storage', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-14-13',
      subChapterNumber: '14.13',
      command: 'sudo umount /mnt/data',
      title: 'umount',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Safely flush pending writes and detach mounted filesystems (fails safely if files are in use)',
      badges: ['umount', 'Safety'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-14-14',
      subChapterNumber: '14.14',
      command: 'cat /etc/fstab',
      title: '/etc/fstab',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Filesystem Table: declarative configuration mounting partitions by UUID automatically at boot',
      badges: ['fstab', 'Boot', 'Admin', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-14-15',
      subChapterNumber: '14.15',
      command: 'df -h',
      title: 'df',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Disk Free: report filesystem disk space usage, available gigabytes, and inode consumption (-i)',
      badges: ['Monitoring', 'df', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-14-16',
      subChapterNumber: '14.16',
      command: 'du -sh /var/log/*',
      title: 'du',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Disk Usage: calculate actual filesystem block space consumed by directory trees and files',
      badges: ['Monitoring', 'du', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-14-17',
      subChapterNumber: '14.17',
      command: 'du -ah /var | sort -rh | head -n 10',
      title: 'Disk Usage Analysis',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'SRE triage techniques for identifying disk hogs during "Disk Full" production emergencies',
      badges: ['Triage', 'Troubleshooting'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-14-18',
      subChapterNumber: '14.18',
      command: 'swapon --show',
      title: 'Swap',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Virtual memory disk backing store paging out idle memory pages during RAM exhaustion',
      badges: ['Memory', 'Swap', 'Performance'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-14-19',
      subChapterNumber: '14.19',
      command: 'sudo vgs && sudo lvs',
      title: 'LVM',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Disks and Storage',
      subtitle: 'Logical Volume Manager: dynamic volume pooling, online disk resizing, and snapshot backups',
      badges: ['LVM', 'AdvancedStorage'],
      difficulty: 'Advanced'
    })
  ]
};

// ============================================================================
// CHAPTER 15: LINUX NETWORKING (15.1 to 15.20)
// ============================================================================
export const CHAPTER_15: LinuxTopic = {
  id: 'ch-15',
  number: '15',
  title: 'Linux Networking',
  iconName: 'Network',
  description: 'Understand TCP/IP, network interfaces, IP routing, DNS resolution, port sockets with ss, ping, curl, and network triage.',
  concepts: [
    buildLinuxConcept({
      id: 'c-15-01',
      subChapterNumber: '15.1',
      command: 'ip link show',
      title: 'Network Fundamentals',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'The Linux kernel TCP/IP network stack: OSI model layers, packet sockets, and routing table',
      badges: ['Networking', 'TCP/IP', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-02',
      subChapterNumber: '15.2',
      command: 'hostname -I',
      title: 'IP Addresses',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Network layer logical addresses identifying hosts and routing packets across interconnected networks',
      badges: ['IP', 'Networking'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-03',
      subChapterNumber: '15.3',
      command: 'ip -4 addr',
      title: 'IPv4',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: '32-bit dotted-decimal addresses (e.g. 192.168.1.1) and CIDR subnet masks (/24)',
      badges: ['IPv4', 'CIDR'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-04',
      subChapterNumber: '15.4',
      command: 'ip -6 addr',
      title: 'IPv6',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: '128-bit hexadecimal next-generation addresses solving address exhaustion (e.g. 2001:db8::1)',
      badges: ['IPv6', 'NextGen'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-15-05',
      subChapterNumber: '15.5',
      command: 'ip link | grep ether',
      title: 'MAC Addresses',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Layer 2 Media Access Control hardware physical addresses burned into network interface cards (NICs)',
      badges: ['Ethernet', 'Layer2'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-06',
      subChapterNumber: '15.6',
      command: 'ip link',
      title: 'Network Interfaces',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Kernel network devices: loopback (lo), Ethernet (eth0/enp3s0), wireless (wlan0), and virtual bridges',
      badges: ['Interfaces', 'Kernel'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-07',
      subChapterNumber: '15.7',
      command: 'ip addr show',
      title: 'ip addr',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Display and configure IPv4/IPv6 addresses assigned to all network interfaces (replaces ifconfig)',
      badges: ['iproute2', 'CLI', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-08',
      subChapterNumber: '15.8',
      command: 'ip link set eth0 up',
      title: 'ip link',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Manage Layer 2 state (up/down), MTU sizes, and MAC address attributes of network devices',
      badges: ['Layer2', 'iproute2'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-15-09',
      subChapterNumber: '15.9',
      command: 'ip route show',
      title: 'ip route',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Inspect and modify the kernel IP routing table determining packet gateway forwarding',
      badges: ['Routing', 'iproute2', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-10',
      subChapterNumber: '15.10',
      command: 'route -n',
      title: 'Routing Table',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'The kernel rulebook matching packet destination IPs to specific network interfaces and gateways',
      badges: ['Routing', 'Kernel'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-15-11',
      subChapterNumber: '15.11',
      command: 'ip route | grep default',
      title: 'Default Gateway',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'The router IP address (0.0.0.0/0) handling all traffic destined outside the local subnet',
      badges: ['Gateway', 'Router'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-12',
      subChapterNumber: '15.12',
      command: 'cat /etc/resolv.conf',
      title: 'DNS',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Domain Name System: resolving human names (api.github.com) to machine IP addresses via nameservers',
      badges: ['DNS', 'Resolv', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-13',
      subChapterNumber: '15.13',
      command: 'cat /etc/hosts',
      title: '/etc/hosts',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Static local host-to-IP resolution file checked before querying external DNS servers',
      badges: ['Hosts', 'Config', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-14',
      subChapterNumber: '15.14',
      command: 'ping -c 4 8.8.8.8',
      title: 'ping',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Test IP reachability and measure round-trip latency using ICMP ECHO_REQUEST packets',
      badges: ['ICMP', 'Diagnostics', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-15',
      subChapterNumber: '15.15',
      command: 'traceroute 1.1.1.1',
      title: 'traceroute',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Map each intermediate router hop across the internet by incrementing packet TTL (Time-To-Live)',
      badges: ['Hops', 'Diagnostics'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-15-16',
      subChapterNumber: '15.16',
      command: 'curl -I https://httpbin.org/get',
      title: 'curl',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Swiss-army CLI network client supporting HTTP/HTTPS, REST APIs, TLS inspection, and headers',
      badges: ['HTTP', 'APIs', 'curl', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-17',
      subChapterNumber: '15.17',
      command: 'wget -c https://example.com/archive.tar.gz',
      title: 'wget',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Non-interactive network downloader capable of resuming broken downloads (-c) and recursive web mirroring',
      badges: ['Downloads', 'CLI'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-18',
      subChapterNumber: '15.18',
      command: 'ss -tulpn',
      title: 'ss',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Socket Statistics: modern ultra-fast tool listing open listening ports (TCP/UDP) and process owners',
      badges: ['Sockets', 'Ports', 'ss', 'Core'],
      difficulty: 'Beginner',
      beforeAfter: {
        before: 'Unsure which application is holding port 8080 and causing connection refusal',
        after: 'LISTEN 0 128 *:8080 users:(("node",pid=4120,fd=19))',
        explanation: 'ss identified exact process PID holding port 8080 and socket queue capacity.'
      }
    }),
    buildLinuxConcept({
      id: 'c-15-19',
      subChapterNumber: '15.19',
      command: 'netstat -tuln',
      title: 'netstat',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Legacy networking utility (from net-tools package, now replaced by ss from iproute2)',
      badges: ['Legacy', 'Sockets'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-15-20',
      subChapterNumber: '15.20',
      command: 'ping -c 2 1.1.1.1 && dig google.com +short',
      title: 'Network Troubleshooting',
      topicId: 'ch-15',
      topicNumber: '15',
      topicTitle: 'Linux Networking',
      subtitle: 'Step-by-step diagnostic model: Physical -> Interface -> IP -> Gateway -> DNS -> Port socket',
      badges: ['Troubleshooting', 'Triage', 'Core'],
      difficulty: 'Intermediate'
    })
  ]
};

export const PACK_03_CHAPTERS: LinuxTopic[] = [
  CHAPTER_11,
  CHAPTER_12,
  CHAPTER_13,
  CHAPTER_14,
  CHAPTER_15,
];
