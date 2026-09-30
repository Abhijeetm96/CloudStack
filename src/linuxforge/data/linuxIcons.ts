import {
  LucideIcon,
  Cpu,
  FolderTree,
  Folder,
  Compass,
  Files,
  FileCode,
  TerminalSquare,
  Workflow,
  Search,
  Users,
  Lock,
  Activity,
  Server,
  Package,
  HardDrive,
  Network,
  Key,
  Sliders,
  Code2,
  FileText,
  ScrollText,
  Gauge,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Settings,
  Laptop,
  Container,
  Binary,
  ShieldAlert,
  Rocket,
  FolderPlus,
  FolderMinus,
  FilePlus,
  Copy,
  Move,
  Trash2,
  BookOpen,
  ArrowDown,
  FileEdit,
  Scissors,
  Table,
  ArrowUpDown,
  Filter,
  Calculator,
  Repeat,
  GitFork,
  KeyRound,
  Shield,
  UserPlus,
  UserMinus,
  UserCheck,
  User,
  ListOrdered,
  BarChart2,
  XCircle,
  SlidersHorizontal,
  Zap,
  Boxes,
  PackageCheck,
  Box,
  Archive,
  FileArchive,
  PieChart,
  HardDriveDownload,
  Wrench,
  Wifi,
  Milestone,
  Radio,
  DownloadCloud,
  Globe,
  Globe2,
  Send,
  FileCheck,
  Tag,
  Timer,
  Flame,
  Stethoscope,
  GitBranch,
  Hammer,
  Power,
  Disc,
  Layers,
  Sparkles,
  Terminal,
  Scale,
  HeartHandshake,
  FolderOpen,
  FolderArchive,
  FileSearch,
  FileDiff,
  HelpCircle,
  History,
  Link,
  Link2,
  UploadCloud,
  Calendar,
  RefreshCw,
  Eye,
  Database,
  Split,
  BookMarked,
  ArrowRight,
  Play,
} from 'lucide-react';

/**
 * 30 High-Precision Curated Icons for each LinuxForge Chapter
 */
export const LINUX_CHAPTER_ICONS: Record<string, LucideIcon> = {
  '01': Cpu,              // Linux Fundamentals & Kernel Architecture
  '02': FolderTree,       // The Linux Filesystem & Hierarchy
  '03': Compass,          // Navigating Linux
  '04': Files,            // File Management
  '05': FileCode,         // Viewing & Editing Files
  '06': TerminalSquare,   // Linux Command Line & Shell Fundamentals
  '07': Workflow,         // Pipes, Redirection & Streams
  '08': Search,           // Searching & Pattern Matching
  '09': Users,            // Users, Groups & Identities
  '10': Lock,             // File Permissions & Access Control
  '11': Activity,         // Processes & Task Control
  '12': Server,           // Services, Daemons & systemd
  '13': Package,          // Package Management
  '14': HardDrive,        // Disks, Partitions & Filesystems
  '15': Network,          // Linux Networking & Sockets
  '16': Key,              // SSH & Remote Cryptographic Access
  '17': Sliders,          // Environment Variables & Shell Configuration
  '18': Code2,            // Shell Scripting & Automation
  '19': FileText,         // Text Processing & Data Pipelines
  '20': ScrollText,       // Logging, syslog & System Observability
  '21': Gauge,            // System Performance & Resource Optimization
  '22': ShieldCheck,      // Linux Security, Firewalls & Hardening
  '23': Clock,            // Cron, Timers & Task Scheduling
  '24': AlertTriangle,    // Troubleshooting, Debugging & Incident Recovery
  '25': Settings,         // Linux Administration & Core Maintenance
  '26': Laptop,           // Linux for Developers & Build Toolchains
  '27': Container,        // Linux for DevOps, Namespaces & cgroups
  '28': Binary,           // Advanced Linux, Kernel Modules & eBPF
  '29': ShieldAlert,      // Production Linux, Reliability & Resilience
  '30': Rocket,           // Real-World Capstone Projects
};

/**
 * Fallback icon lookup for named topic icons
 */
export const LINUX_ICON_NAME_REGISTRY: Record<string, LucideIcon> = {
  Cpu,
  FolderTree,
  Compass,
  Files,
  FileCode,
  TerminalSquare,
  Workflow,
  Search,
  Users,
  Lock,
  Activity,
  Server,
  Package,
  HardDrive,
  Network,
  Key,
  Sliders,
  Code2,
  FileText,
  ScrollText,
  Gauge,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Settings,
  Laptop,
  Container,
  Binary,
  ShieldAlert,
  Rocket,
  Terminal,
  Scale,
  HeartHandshake,
  FolderOpen,
  FolderArchive,
  FileSearch,
  FileDiff,
  HelpCircle,
  History,
  Link,
  Link2,
  UploadCloud,
  Calendar,
  RefreshCw,
  Eye,
  Database,
  Split,
  BookMarked,
  ArrowRight,
};

/**
 * Returns the distinct icon for a Linux Chapter
 */
export function getLinuxChapterIcon(topicNumber: string, iconName?: string): LucideIcon {
  const cleanNum = topicNumber.replace(/[^0-9]/g, '').padStart(2, '0');
  if (LINUX_CHAPTER_ICONS[cleanNum]) {
    return LINUX_CHAPTER_ICONS[cleanNum];
  }
  if (iconName && LINUX_ICON_NAME_REGISTRY[iconName]) {
    return LINUX_ICON_NAME_REGISTRY[iconName];
  }
  return Terminal;
}

/**
 * Curated high-precision pedagogical mapping for core concepts across chapters
 * Ensures every concept has a distinct, visually relevant Lucide icon.
 */
const EXACT_CONCEPT_ICONS: Record<string, LucideIcon> = {
  // Chapter 01: Linux Fundamentals
  'c-01-01': Cpu,              // What is Linux? (Kernel & hardware)
  'c-01-02': Layers,           // Linux vs Operating System (Kernel vs Userland architecture)
  'c-01-03': Sliders,          // Linux Kernel (Sysctl parameters)
  'c-01-04': Sparkles,         // GNU and Linux (Free software tools ecosystem)
  'c-01-05': Disc,             // Linux Distributions (Distro packaging)
  'c-01-06': Globe,            // Ubuntu, Debian, Fedora, RHEL, Arch
  'c-01-07': Laptop,           // Linux Desktop vs Server (GUI targets vs headless server)
  'c-01-08': Scale,            // Open Source and Linux (GPL v2 license, copyleft & governance)
  'c-01-09': Binary,           // Linux Architecture (Kernel modules & system call boundary)
  'c-01-10': ShieldCheck,      // User Space vs Kernel Space (CPU Ring 3 vs Ring 0 protection)
  'c-01-11': Power,            // The Linux Boot Process (BIOS -> GRUB -> initramfs -> systemd)
  'c-01-12': Rocket,           // Where Linux is Used (Supercomputers, cloud, mobile, aerospace)

  // Chapter 02: The Linux Filesystem & Hierarchy
  'c-02-01': FolderTree,       // Files and Directories ("Everything is a File")
  'c-02-02': Compass,          // Absolute vs Relative Paths
  'c-02-03': FolderOpen,       // Home Directory (~)
  'c-02-04': HardDrive,        // Root Directory (/)
  'c-02-05': FolderArchive,    // Filesystem Hierarchy Standard (FHS)
  'c-02-06': Binary,           // /bin and /usr/bin (Core binaries)
  'c-02-07': Wrench,           // /sbin and /usr/sbin (Admin binaries)
  'c-02-08': Settings,         // /etc (Static system configuration)
  'c-02-09': Database,         // /var (Variable runtime state & spool)
  'c-02-10': Timer,            // /tmp and /var/tmp (Temporary storage)
  'c-02-11': Cpu,              // /dev (Device nodes & character/block devices)
  'c-02-12': Activity,         // /proc (Kernel & process virtual filesystem)
  'c-02-13': Sliders,          // /sys (Kernel device tree & sysfs)
  'c-02-14': HardDriveDownload,// /mnt and /media (Mount points)
  'c-02-15': Package,          // /opt and /usr/local (Optional third-party software)

  // Chapter 03: Navigating Linux
  'c-03-01': Compass,          // pwd
  'c-03-02': FolderOpen,       // cd basics
  'c-03-03': Folder,           // cd shortcuts (~, -, .)
  'c-03-04': FolderTree,       // Directory tree traversal
  'c-03-05': Repeat,           // pushd and popd directory stack
  'c-03-06': FileSearch,       // Autocomplete and Tab navigation

  // Chapter 04: File Management
  'c-04-01': FilePlus,         // touch
  'c-04-02': FolderPlus,       // mkdir
  'c-04-03': Copy,             // cp
  'c-04-04': Move,             // mv
  'c-04-05': Trash2,           // rm
  'c-04-06': FolderMinus,      // rmdir
  'c-04-07': Link,             // ln -s symlinks
  'c-04-08': Link2,            // hard links
  'c-04-09': FileSearch,       // file type detection
  'c-04-10': FileCheck,        // stat metadata

  // Chapter 05: Viewing and Editing Files
  'c-05-01': FileText,         // cat
  'c-05-02': ArrowUpDown,      // tac reverse cat
  'c-05-03': BookOpen,         // less pagination
  'c-05-04': BookMarked,       // more
  'c-05-05': Eye,              // head preview
  'c-05-06': ArrowDown,        // tail stream
  'c-05-07': Activity,         // tail -f live log follow
  'c-05-08': FileEdit,         // nano text editor
  'c-05-09': FileCode,         // vim modal editing
  'c-05-10': Code2,            // vi fundamentals

  // Chapter 06: Linux Command Line
  'c-06-01': Terminal,         // Shell anatomy
  'c-06-02': TerminalSquare,   // CLI prompt
  'c-06-03': History,          // Shell history
  'c-06-04': Tag,              // alias and unalias
  'c-06-05': HelpCircle,       // man pages
  'c-06-06': BookOpen,         // info documentation
  'c-06-07': Search,           // whatis & apropos
  'c-06-08': Zap,              // Shell keyboard shortcuts

  // Chapter 07: Pipes and Redirection
  'c-07-01': Workflow,         // Standard Streams
  'c-07-02': ArrowRight,       // > redirect stdout
  'c-07-03': Copy,             // >> append stdout
  'c-07-04': ArrowDown,        // < redirect stdin
  'c-07-05': AlertTriangle,    // 2> redirect stderr
  'c-07-06': Split,            // &> redirect both
  'c-07-07': Workflow,         // | pipes
  'c-07-08': GitFork,          // tee split pipe
  'c-07-09': Repeat,           // xargs argument conversion
  'c-07-10': Trash2,           // /dev/null

  // Chapter 08: Searching and Pattern Matching
  'c-08-01': Search,           // grep regex
  'c-08-02': Compass,          // find filesystem search
  'c-08-03': Milestone,        // locate database index
  'c-08-04': Sparkles,         // which & whereis
  'c-08-05': Filter,           // regex character classes
  'c-08-06': FileSearch,       // search by size/date

  // Chapter 09: Users and Groups
  'c-09-01': User,             // whoami & id
  'c-09-02': Users,            // groups & /etc/group
  'c-09-03': UserPlus,         // useradd
  'c-09-04': UserCheck,        // usermod
  'c-09-05': UserMinus,        // userdel
  'c-09-06': KeyRound,         // passwd
  'c-09-07': ShieldAlert,      // sudo & /etc/sudoers
  'c-09-08': Shield,           // su switch user
  'c-09-09': FileText,         // /etc/passwd file
  'c-09-10': Lock,             // /etc/shadow file

  // Chapter 10: File Permissions
  'c-10-01': Lock,             // Why Permissions Exist (security boundary)
  'c-10-02': Eye,              // Read Permission (inspecting contents & listing dentries)
  'c-10-03': FileEdit,         // Write Permission (modifying bytes & modifying dentries)
  'c-10-04': Play,             // Execute Permission (execve & directory traversal)
  'c-10-05': Users,            // User / Group / Others (POSIX 3-tier matrix)
  'c-10-06': Sliders,          // chmod (changing mode bits)
  'c-10-07': Calculator,       // Numeric Permissions (octal 4-2-1 math)
  'c-10-08': Code2,            // Symbolic Permissions (u/g/o/a + / - / = syntax)
  'c-10-09': UserCheck,        // chown (changing user/group owner)
  'c-10-10': HeartHandshake,   // chgrp (group ownership assignment)
  'c-10-11': Shield,           // umask (creation mask)
  'c-10-12': Sparkles,         // Special Permissions (SUID, SGID, Sticky)
  'c-10-13': ShieldAlert,      // SUID (executing with owner effective UID)
  'c-10-14': KeyRound,         // SGID (group inheritance on directory)
  'c-10-15': Tag,              // Sticky Bit (/tmp deletion protection)
  'c-10-16': Stethoscope,      // Permission Troubleshooting (namei traversal & ACL diagnosis)
};

/**
 * Smart resolver to give EVERY Sub-Chapter / Concept a unique, relevant Lucide icon
 */
export function getLinuxConceptIcon(concept: {
  id?: string;
  command?: string;
  title?: string;
  subtitle?: string;
  subChapterNumber?: string;
}): LucideIcon {
  const id = (concept.id || '').toLowerCase();

  // 1. Direct Curated Map Check (Guarantees 100% uniqueness in key chapters)
  if (EXACT_CONCEPT_ICONS[id]) {
    return EXACT_CONCEPT_ICONS[id];
  }

  const rawCmd = (concept.command || '').trim().toLowerCase();
  const title = (concept.title || '').toLowerCase();
  const sub = (concept.subtitle || '').toLowerCase();

  // Strip command wrappers (sudo, nohup, time, exec) to evaluate the actual underlying tool
  let cmd = rawCmd;
  if (cmd.startsWith('sudo ')) {
    const afterSudo = cmd.replace(/^sudo\s+(-[a-zA-Z0-9_-]+\s+)*(-u\s+\S+\s+)?/, '').trim();
    if (afterSudo && !afterSudo.startsWith('su') && !afterSudo.includes('sudoers') && !afterSudo.startsWith('visudo')) {
      cmd = afterSudo;
    }
  }

  // 2. Context-Aware File Inspection Commands (cat, head, tail, less, more)
  if (cmd.startsWith('cat') || cmd.startsWith('tac') || cmd.startsWith('head') || cmd.startsWith('tail') || cmd.startsWith('less') || cmd.startsWith('more')) {
    if (cmd.includes('license') || cmd.includes('gpl') || cmd.includes('copying') || title.includes('license') || title.includes('open source')) return Scale;
    if (cmd.includes('os-release') || cmd.includes('issue') || cmd.includes('release')) return Disc;
    if (cmd.includes('cpuinfo')) return Cpu;
    if (cmd.includes('meminfo')) return Gauge;
    if (cmd.includes('/etc/passwd')) return User;
    if (cmd.includes('/etc/group')) return Users;
    if (cmd.includes('/etc/shadow')) return KeyRound;
    if (cmd.includes('/etc/fstab') || cmd.includes('partitions')) return HardDriveDownload;
    if (cmd.includes('/etc/hosts') || cmd.includes('/etc/resolv.conf')) return Globe;
    if (cmd.includes('pid_max') || cmd.includes('sysctl') || cmd.includes('swappiness')) return Sliders;
    if (cmd.includes('tainted')) return AlertTriangle;
    if (cmd.includes('/var/log') || cmd.includes('.log')) return ScrollText;
    if (cmd.includes('/etc/crontab') || cmd.includes('cron')) return Clock;
    if (cmd.startsWith('less') || cmd.startsWith('more')) return BookOpen;
    if (cmd.startsWith('head') || cmd.startsWith('tail')) return Eye;
    return FileText;
  }

  // 3. Disambiguate 'ls' and list tools
  if (cmd.startsWith('lsmod')) return Binary;
  if (cmd.startsWith('lscpu')) return Cpu;
  if (cmd.startsWith('lsblk')) return HardDrive;
  if (cmd.startsWith('lsof')) return Radio;
  if (cmd.startsWith('lspci') || cmd.startsWith('lsusb')) return Cpu;
  if (cmd.startsWith('ls -l /bin/sh') || title.includes('link') || title.includes('symlink')) return Link;
  if (cmd === 'ls' || cmd.startsWith('ls ') || cmd.startsWith('tree') || cmd.startsWith('dir')) return FolderTree;

  // 4. System Query & Identification
  if (cmd.startsWith('uname') || cmd.startsWith('arch')) return Cpu;
  if (cmd.startsWith('hostnamectl')) return Globe;
  if (cmd.startsWith('sysctl')) return Sliders;
  if (cmd.startsWith('dmesg') || cmd.startsWith('journalctl')) return ScrollText;
  if (cmd.startsWith('curl') || cmd.startsWith('wget')) return DownloadCloud;

  // 5. Shell Discovery & Utilities
  if (cmd.startsWith('which') || cmd.startsWith('whereis')) {
    if (title.includes('gnu') || title.includes('free software')) return Sparkles;
    return Compass;
  }
  if (cmd.startsWith('history')) return History;
  if (cmd.startsWith('man') || cmd.startsWith('info') || cmd.startsWith('whatis') || cmd.startsWith('apropos')) return HelpCircle;
  if (cmd.startsWith('alias') || cmd.startsWith('unalias')) return Tag;
  if (cmd.startsWith('echo') || cmd.startsWith('printf')) return Terminal;

  // 6. Navigation & File Management
  if (cmd.startsWith('pwd') || cmd.startsWith('realpath')) return Compass;
  if (cmd.startsWith('cd') || cmd.startsWith('pushd') || cmd.startsWith('popd')) return FolderOpen;
  if (cmd.startsWith('mkdir')) return FolderPlus;
  if (cmd.startsWith('rmdir')) return FolderMinus;
  if (cmd.startsWith('touch')) return FilePlus;
  if (cmd.startsWith('cp')) return Copy;
  if (cmd.startsWith('mv')) return Move;
  if (cmd.startsWith('rm')) return Trash2;
  if (cmd.startsWith('ln')) return Link;
  if (cmd.startsWith('file') || cmd.startsWith('stat')) return FileSearch;

  // 7. Text Editing & Processing
  if (cmd.startsWith('nano')) return FileEdit;
  if (cmd.startsWith('vim') || cmd.startsWith('vi')) return FileCode;
  if (cmd.startsWith('grep') || cmd.startsWith('egrep') || cmd.startsWith('rg')) return Search;
  if (cmd.startsWith('find') || cmd.startsWith('locate')) return Compass;
  if (cmd.startsWith('sed')) return Scissors;
  if (cmd.startsWith('awk')) return Table;
  if (cmd.startsWith('cut')) return Scissors;
  if (cmd.startsWith('sort')) return ArrowUpDown;
  if (cmd.startsWith('uniq')) return Filter;
  if (cmd.startsWith('wc')) return Calculator;
  if (cmd.startsWith('tr')) return Repeat;
  if (cmd.startsWith('tee')) return GitFork;
  if (cmd.startsWith('xargs')) return Workflow;
  if (cmd.startsWith('diff') || cmd.startsWith('patch')) return FileDiff;

  // 8. Users, Groups & Privilege Management
  if (cmd.startsWith('chmod')) return Lock;
  if (cmd.startsWith('chown') || cmd.startsWith('chgrp')) return KeyRound;
  if (cmd.startsWith('umask')) return Shield;
  if (cmd.startsWith('getfacl') || cmd.startsWith('setfacl')) return ShieldCheck;
  if (cmd.startsWith('useradd') || cmd.startsWith('adduser')) return UserPlus;
  if (cmd.startsWith('userdel')) return UserMinus;
  if (cmd.startsWith('usermod')) return UserCheck;
  if (cmd.startsWith('passwd')) return KeyRound;
  if (cmd.startsWith('groupadd') || cmd.startsWith('groupdel') || cmd.startsWith('groups')) return Users;
  if (cmd.startsWith('id') || cmd.startsWith('whoami') || cmd.startsWith('who') || cmd === 'w') return User;
  if (rawCmd.startsWith('sudo') || rawCmd.startsWith('su') || rawCmd.includes('/etc/sudoers') || rawCmd.startsWith('visudo')) return ShieldAlert;

  // 9. Processes & Performance
  if (cmd.startsWith('ps')) return ListOrdered;
  if (cmd.startsWith('top') || cmd.startsWith('htop') || cmd.startsWith('btop')) return BarChart2;
  if (cmd.startsWith('kill') || cmd.startsWith('pkill') || cmd.startsWith('killall')) return XCircle;
  if (cmd.startsWith('nice') || cmd.startsWith('renice')) return SlidersHorizontal;
  if (cmd.startsWith('uptime') || cmd.startsWith('free')) return Gauge;
  if (cmd.startsWith('vmstat') || cmd.startsWith('iostat') || cmd.startsWith('sar') || cmd.startsWith('mpstat')) return Activity;
  if (cmd.startsWith('strace') || cmd.startsWith('ltrace') || cmd.startsWith('sosreport')) return Stethoscope;

  // 10. Services & Boot
  if (cmd.startsWith('systemctl get-default') || cmd.includes('target')) return Laptop;
  if (cmd.startsWith('systemctl restart') || cmd.startsWith('systemctl reload')) return RefreshCw;
  if (cmd.startsWith('systemctl') || cmd.startsWith('service')) return Server;
  if (cmd.startsWith('reboot') || cmd.startsWith('shutdown') || cmd.startsWith('poweroff')) return Power;

  // 11. Package Management & Archiving
  if (cmd.startsWith('apt') || cmd.startsWith('dpkg')) return Package;
  if (cmd.startsWith('dnf') || cmd.startsWith('yum') || cmd.startsWith('rpm')) return Boxes;
  if (cmd.startsWith('pacman')) return PackageCheck;
  if (cmd.startsWith('snap') || cmd.startsWith('flatpak')) return Box;
  if (cmd.startsWith('tar')) return Archive;
  if (cmd.startsWith('gzip') || cmd.startsWith('gunzip') || cmd.startsWith('zip') || cmd.startsWith('unzip') || cmd.startsWith('xz')) return FileArchive;

  // 12. Disks, Mounts & Hardware
  if (cmd.startsWith('df') || cmd.startsWith('du')) return PieChart;
  if (cmd.startsWith('fdisk') || cmd.startsWith('parted') || cmd.startsWith('blkid')) return HardDrive;
  if (cmd.startsWith('mount') || cmd.startsWith('umount')) return HardDriveDownload;
  if (cmd.startsWith('mkfs') || cmd.startsWith('fsck')) return Wrench;

  // 13. Networking & SSH
  if (cmd.startsWith('ip route') || cmd.startsWith('traceroute') || cmd.startsWith('tracepath') || cmd.startsWith('mtr')) return Milestone;
  if (cmd.startsWith('ip') || cmd.startsWith('ifconfig')) return Network;
  if (cmd.startsWith('ping')) return Wifi;
  if (cmd.startsWith('ss') || cmd.startsWith('netstat')) return Radio;
  if (cmd.startsWith('dig') || cmd.startsWith('nslookup') || cmd.startsWith('host')) return Globe2;
  if (cmd.startsWith('ssh-keygen') || cmd.startsWith('ssh-copy-id')) return KeyRound;
  if (cmd.startsWith('ssh')) return Key;
  if (cmd.startsWith('scp') || cmd.startsWith('sftp')) return UploadCloud;
  if (cmd.startsWith('rsync')) return Send;

  // 14. Shell Config & Scripting
  if (cmd.startsWith('export') || cmd.startsWith('env') || cmd.startsWith('printenv')) return Sliders;
  if (cmd.startsWith('source') || cmd.includes('.bashrc') || cmd.includes('.profile')) return FileCheck;
  if (cmd.startsWith('crontab') || cmd.startsWith('anacron')) return Clock;
  if (cmd.startsWith('at') || cmd.startsWith('batch')) return Timer;
  if (cmd.startsWith('date') || cmd.startsWith('timedatectl')) return Calendar;

  // 15. Security & Firewalls
  if (cmd.startsWith('firewall-cmd') || cmd.startsWith('ufw') || cmd.startsWith('iptables') || cmd.startsWith('nft')) return Flame;
  if (cmd.startsWith('getenforce') || cmd.startsWith('setenforce') || cmd.includes('selinux') || cmd.includes('apparmor')) return ShieldCheck;

  // 16. Developer, Containers & Kernel
  if (cmd.startsWith('git')) return GitBranch;
  if (cmd.startsWith('make') || cmd.startsWith('gcc') || cmd.startsWith('g++') || cmd.startsWith('clang')) return Hammer;
  if (cmd.startsWith('modprobe') || cmd.startsWith('insmod') || cmd.startsWith('rmmod')) return Binary;
  if (cmd.startsWith('docker') || cmd.startsWith('podman') || cmd.startsWith('unshare') || cmd.startsWith('chroot')) return Container;

  // 17. Semantic Keyword Fallbacks (Title, Subtitle & Domain context)
  if (title.includes('license') || title.includes('open source') || title.includes('gpl')) return Scale;
  if (title.includes('community') || title.includes('collaboration')) return HeartHandshake;
  if (title.includes('kernel') || sub.includes('kernel')) return Cpu;
  if (title.includes('architecture') || title.includes('layers')) return Layers;
  if (title.includes('distribution') || title.includes('ubuntu') || title.includes('debian') || title.includes('arch')) return Disc;
  if (title.includes('desktop') || title.includes('gui')) return Laptop;
  if (title.includes('boot') || title.includes('grub')) return Power;
  if (title.includes('filesystem') || title.includes('hierarchy')) return FolderTree;
  if (title.includes('path') || title.includes('relative') || title.includes('absolute')) return Compass;
  if (title.includes('symlink') || title.includes('hard link')) return Link;
  if (title.includes('permission') || title.includes('suid') || title.includes('sgid')) return Lock;
  if (title.includes('pipe') || title.includes('redirect') || title.includes('stream')) return Workflow;
  if (title.includes('search') || title.includes('pattern') || title.includes('regex')) return Search;
  if (title.includes('user') || title.includes('group')) return Users;
  if (title.includes('process') || title.includes('signal') || title.includes('job')) return Activity;
  if (title.includes('service') || title.includes('daemon') || title.includes('systemd')) return Server;
  if (title.includes('package') || title.includes('install')) return Package;
  if (title.includes('disk') || title.includes('storage') || title.includes('partition')) return HardDrive;
  if (title.includes('network') || title.includes('socket')) return Network;
  if (title.includes('ssh') || title.includes('crypto')) return Key;
  if (title.includes('variable') || title.includes('environment')) return Sliders;
  if (title.includes('script') || title.includes('bash') || title.includes('automation')) return Code2;
  if (title.includes('log') || title.includes('journal') || title.includes('observability')) return ScrollText;
  if (title.includes('performance') || title.includes('cpu') || title.includes('memory')) return Gauge;
  if (title.includes('security') || title.includes('firewall') || title.includes('hardening')) return ShieldCheck;
  if (title.includes('cron') || title.includes('schedule') || title.includes('timer')) return Clock;
  if (title.includes('troubleshoot') || title.includes('debug') || title.includes('incident')) return AlertTriangle;
  if (title.includes('admin') || title.includes('maintenance')) return Settings;
  if (title.includes('devops') || title.includes('container') || title.includes('namespace')) return Container;
  if (title.includes('project') || title.includes('capstone') || title.includes('production')) return Rocket;

  return TerminalSquare;
}
