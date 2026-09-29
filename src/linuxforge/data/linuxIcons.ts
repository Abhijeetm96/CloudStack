import {
  LucideIcon,
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
};

/**
 * Returns the distinct icon for a Linux Chapter
 */
export function getLinuxChapterIcon(topicNumber: string, iconName?: string): LucideIcon {
  // Normalize topicNumber (e.g. '1' -> '01', '01' -> '01')
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
 * Smart resolver to give EVERY Sub-Chapter / Concept a unique, relevant Lucide icon
 */
export function getLinuxConceptIcon(concept: {
  id?: string;
  command?: string;
  title?: string;
  subtitle?: string;
  subChapterNumber?: string;
}): LucideIcon {
  const cmd = (concept.command || '').trim().toLowerCase();
  const title = (concept.title || '').toLowerCase();
  const sub = (concept.subtitle || '').toLowerCase();
  const id = (concept.id || '').toLowerCase();

  // 1. Exact Command matching
  if (cmd.startsWith('uname') || cmd.startsWith('lscpu') || cmd.startsWith('arch')) return Cpu;
  if (cmd.includes('/etc/os-release') || cmd.includes('/etc/issue') || cmd.startsWith('hostnamectl')) return Globe;
  if (cmd.startsWith('sysctl')) return Sliders;
  if (cmd.startsWith('ls') || cmd.startsWith('tree') || cmd.startsWith('dir')) return FolderTree;
  if (cmd.startsWith('cd') || cmd.startsWith('pwd')) return Compass;
  if (cmd.startsWith('mkdir')) return FolderPlus;
  if (cmd.startsWith('rmdir')) return FolderMinus;
  if (cmd.startsWith('touch')) return FilePlus;
  if (cmd.startsWith('cp')) return Copy;
  if (cmd.startsWith('mv')) return Move;
  if (cmd.startsWith('rm')) return Trash2;
  if (cmd.startsWith('cat') || cmd.startsWith('tac')) return FileText;
  if (cmd.startsWith('less') || cmd.startsWith('more')) return BookOpen;
  if (cmd.startsWith('head') || cmd.startsWith('tail')) return ArrowDown;
  if (cmd.startsWith('nano')) return FileEdit;
  if (cmd.startsWith('vim') || cmd.startsWith('vi')) return FileCode;
  if (cmd.startsWith('grep') || cmd.startsWith('egrep') || cmd.startsWith('rg')) return Search;
  if (cmd.startsWith('find') || cmd.startsWith('locate') || cmd.startsWith('which') || cmd.startsWith('whereis')) return Compass;
  if (cmd.startsWith('sed')) return Scissors;
  if (cmd.startsWith('awk')) return Table;
  if (cmd.startsWith('cut')) return Scissors;
  if (cmd.startsWith('sort')) return ArrowUpDown;
  if (cmd.startsWith('uniq')) return Filter;
  if (cmd.startsWith('wc')) return Calculator;
  if (cmd.startsWith('tr')) return Repeat;
  if (cmd.startsWith('tee')) return GitFork;
  if (cmd.startsWith('xargs')) return Workflow;
  if (cmd.startsWith('chmod')) return Lock;
  if (cmd.startsWith('chown') || cmd.startsWith('chgrp')) return KeyRound;
  if (cmd.startsWith('umask')) return Shield;
  if (cmd.startsWith('getfacl') || cmd.startsWith('setfacl')) return ShieldCheck;
  if (cmd.startsWith('useradd') || cmd.startsWith('adduser')) return UserPlus;
  if (cmd.startsWith('userdel')) return UserMinus;
  if (cmd.startsWith('usermod')) return UserCheck;
  if (cmd.startsWith('groupadd') || cmd.startsWith('groupdel')) return Users;
  if (cmd.startsWith('id') || cmd.startsWith('whoami') || cmd.startsWith('who') || cmd === 'w') return User;
  if (cmd.startsWith('sudo') || cmd.startsWith('su') || cmd.includes('/etc/sudoers')) return ShieldAlert;
  if (cmd.startsWith('ps')) return ListOrdered;
  if (cmd.startsWith('top') || cmd.startsWith('htop') || cmd.startsWith('btop')) return BarChart2;
  if (cmd.startsWith('kill') || cmd.startsWith('pkill') || cmd.startsWith('killall')) return XCircle;
  if (cmd.startsWith('nice') || cmd.startsWith('renice')) return SlidersHorizontal;
  if (cmd.startsWith('systemctl') || cmd.startsWith('service')) return Server;
  if (cmd.startsWith('journalctl') || cmd.startsWith('dmesg')) return ScrollText;
  if (cmd.startsWith('apt') || cmd.startsWith('dpkg')) return Package;
  if (cmd.startsWith('dnf') || cmd.startsWith('yum') || cmd.startsWith('rpm')) return Boxes;
  if (cmd.startsWith('pacman')) return PackageCheck;
  if (cmd.startsWith('snap') || cmd.startsWith('flatpak')) return Box;
  if (cmd.startsWith('tar')) return Archive;
  if (cmd.startsWith('gzip') || cmd.startsWith('gunzip') || cmd.startsWith('zip') || cmd.startsWith('unzip') || cmd.startsWith('xz')) return FileArchive;
  if (cmd.startsWith('df') || cmd.startsWith('du')) return PieChart;
  if (cmd.startsWith('lsblk') || cmd.startsWith('fdisk') || cmd.startsWith('parted') || cmd.startsWith('blkid')) return HardDrive;
  if (cmd.startsWith('mount') || cmd.startsWith('umount') || cmd.includes('/etc/fstab')) return HardDriveDownload;
  if (cmd.startsWith('mkfs') || cmd.startsWith('fsck')) return Wrench;
  if (cmd.startsWith('ip') || cmd.startsWith('ifconfig')) return Network;
  if (cmd.startsWith('ping')) return Wifi;
  if (cmd.startsWith('traceroute') || cmd.startsWith('tracepath') || cmd.startsWith('mtr')) return Milestone;
  if (cmd.startsWith('ss') || cmd.startsWith('netstat') || cmd.startsWith('lsof')) return Radio;
  if (cmd.startsWith('curl') || cmd.startsWith('wget')) return DownloadCloud;
  if (cmd.startsWith('dig') || cmd.startsWith('nslookup') || cmd.startsWith('host')) return Globe2;
  if (cmd.startsWith('ssh-keygen') || cmd.startsWith('ssh-copy-id')) return KeyRound;
  if (cmd.startsWith('ssh')) return Key;
  if (cmd.startsWith('scp') || cmd.startsWith('sftp') || cmd.startsWith('rsync')) return Send;
  if (cmd.startsWith('export') || cmd.startsWith('env') || cmd.startsWith('printenv')) return Sliders;
  if (cmd.startsWith('source') || cmd.includes('.bashrc') || cmd.includes('.profile')) return FileCheck;
  if (cmd.startsWith('alias') || cmd.startsWith('unalias')) return Tag;
  if (cmd.startsWith('crontab') || cmd.startsWith('anacron')) return Clock;
  if (cmd.startsWith('at') || cmd.startsWith('batch')) return Timer;
  if (cmd.startsWith('firewall-cmd') || cmd.startsWith('ufw') || cmd.startsWith('iptables') || cmd.startsWith('nft')) return Flame;
  if (cmd.startsWith('getenforce') || cmd.startsWith('setenforce') || cmd.includes('selinux') || cmd.includes('apparmor')) return ShieldCheck;
  if (cmd.startsWith('strace') || cmd.startsWith('ltrace') || cmd.startsWith('sosreport')) return Stethoscope;
  if (cmd.startsWith('uptime') || cmd.startsWith('free')) return Gauge;
  if (cmd.startsWith('vmstat') || cmd.startsWith('iostat') || cmd.startsWith('sar')) return Activity;
  if (cmd.startsWith('git')) return GitBranch;
  if (cmd.startsWith('make') || cmd.startsWith('gcc')) return Hammer;
  if (cmd.startsWith('modprobe') || cmd.startsWith('lsmod') || cmd.startsWith('insmod')) return Binary;
  if (cmd.startsWith('reboot') || cmd.startsWith('shutdown') || cmd.startsWith('poweroff')) return Power;

  // 2. Semantic title & subtitle matching
  if (title.includes('kernel') || sub.includes('kernel')) return Cpu;
  if (title.includes('distribution') || title.includes('ubuntu') || title.includes('debian') || title.includes('arch')) return Disc;
  if (title.includes('desktop') || title.includes('gui')) return Laptop;
  if (title.includes('open source') || title.includes('gnu') || title.includes('gpl')) return Sparkles;
  if (title.includes('architecture') || title.includes('ring')) return Layers;
  if (title.includes('boot') || title.includes('grub') || title.includes('systemd')) return Power;
  if (title.includes('filesystem') || title.includes('hierarchy') || title.includes('/etc') || title.includes('/var')) return FolderTree;
  if (title.includes('path') || title.includes('relative') || title.includes('absolute')) return Compass;
  if (title.includes('permission') || title.includes('suid') || title.includes('sgid') || title.includes('sticky')) return Lock;
  if (title.includes('pipe') || title.includes('redirect') || title.includes('stdin') || title.includes('stdout')) return Workflow;
  if (title.includes('search') || title.includes('find') || title.includes('pattern') || title.includes('regex')) return Search;
  if (title.includes('user') || title.includes('account') || title.includes('group')) return Users;
  if (title.includes('process') || title.includes('signal') || title.includes('job') || title.includes('background')) return Activity;
  if (title.includes('service') || title.includes('daemon') || title.includes('target') || title.includes('unit')) return Server;
  if (title.includes('package') || title.includes('repository') || title.includes('install')) return Package;
  if (title.includes('disk') || title.includes('storage') || title.includes('partition') || title.includes('lvm') || title.includes('raid')) return HardDrive;
  if (title.includes('network') || title.includes('ip') || title.includes('dns') || title.includes('port') || title.includes('socket')) return Network;
  if (title.includes('ssh') || title.includes('crypto') || title.includes('public key')) return Key;
  if (title.includes('variable') || title.includes('environment') || title.includes('parameter')) return Sliders;
  if (title.includes('script') || title.includes('bash') || title.includes('function') || title.includes('loop')) return Code2;
  if (title.includes('text') || title.includes('regex') || title.includes('stream')) return FileText;
  if (title.includes('log') || title.includes('journal') || title.includes('audit')) return ScrollText;
  if (title.includes('performance') || title.includes('cpu') || title.includes('memory') || title.includes('bottleneck')) return Gauge;
  if (title.includes('security') || title.includes('firewall') || title.includes('selinux') || title.includes('harden')) return ShieldCheck;
  if (title.includes('cron') || title.includes('schedule') || title.includes('timer')) return Clock;
  if (title.includes('troubleshoot') || title.includes('panic') || title.includes('crash') || title.includes('rescue')) return AlertTriangle;
  if (title.includes('admin') || title.includes('sysadmin') || title.includes('maintenance')) return Settings;
  if (title.includes('devops') || title.includes('container') || title.includes('cgroup') || title.includes('namespace')) return Container;
  if (title.includes('developer') || title.includes('compiler') || title.includes('binary')) return Binary;
  if (title.includes('production') || title.includes('ha') || title.includes('cluster') || title.includes('sre')) return ShieldAlert;
  if (title.includes('project') || title.includes('capstone') || title.includes('scenario')) return Rocket;

  // Default fallback
  return TerminalSquare;
}
