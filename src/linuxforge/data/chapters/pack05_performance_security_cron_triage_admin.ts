import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 21: SYSTEM PERFORMANCE (21.1 to 21.12)
// ============================================================================
export const CHAPTER_21: LinuxTopic = {
  id: 'ch-21',
  number: '21',
  title: 'System Performance',
  iconName: 'Gauge',
  description: 'Diagnose bottlenecks and saturation across CPU, RAM, disk I/O, and network using USE method (Utilization, Saturation, Errors).',
  concepts: [
    buildLinuxConcept({
      id: 'c-21-01',
      subChapterNumber: '21.1',
      command: 'mpstat -P ALL 1 1',
      title: 'CPU Usage',
      topicId: 'ch-21',
      topicNumber: '21',
      topicTitle: 'System Performance',
      subtitle: 'Quantifying processor cycles spent in userland vs kernel system calls vs waiting on disk I/O',
      badges: ['CPU', 'Performance', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-21-02',
      subChapterNumber: '21.2',
      command: 'vmstat -s | head -n 10',
      title: 'Memory Usage',
      topicId: 'ch-21',
      topicNumber: '21',
      topicTitle: 'System Performance',
      subtitle: 'Resident Set Size (RSS), anonymous memory, page cache buffers, and swapping behavior',
      badges: ['Memory', 'RAM'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-21-03',
      subChapterNumber: '21.3',
      command: 'uptime',
      title: 'Load Average',
      topicId: 'ch-21',
      topicNumber: '21',
      topicTitle: 'System Performance',
      subtitle: 'Exponentially decaying averages (1, 5, 15 min) of processes in R (running) and D (uninterruptible disk sleep) states',
      badges: ['LoadAvg', 'Telemetry', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-21-04',
      subChapterNumber: '21.4',
      command: 'top -o %CPU',
      title: 'top',
      topicId: 'ch-21',
      topicNumber: '21',
      topicTitle: 'System Performance',
      subtitle: 'Sorting real-time tasks by CPU usage (P) or Memory usage (M) to immediately spot runaway processes',
      badges: ['top', 'Monitoring'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-21-05',
      subChapterNumber: '21.5',
      command: 'vmstat 1 5',
      title: 'vmstat',
      topicId: 'ch-21',
      topicNumber: '21',
      topicTitle: 'System Performance',
      subtitle: 'Virtual Memory Statistics: instantaneous one-line reports of runqueue (r), swap (si/so), and context switches (cs)',
      badges: ['vmstat', 'Kernel', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-21-06',
      subChapterNumber: '21.6',
      command: 'iostat -xz 1 3',
      title: 'iostat',
      topicId: 'ch-21',
      topicNumber: '21',
      topicTitle: 'System Performance',
      subtitle: 'Input/Output Statistics: inspect read/write IOPS (r/s, w/s), await latency (ms), and %util saturation',
      badges: ['iostat', 'DiskIO', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-21-07',
      subChapterNumber: '21.7',
      command: 'free -h',
      title: 'free',
      topicId: 'ch-21',
      topicNumber: '21',
      topicTitle: 'System Performance',
      subtitle: 'Human-readable summary of physical RAM and swap allocation: total, used, free, and available',
      badges: ['free', 'RAM', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-21-08',
      subChapterNumber: '21.8',
      command: 'uptime -p',
      title: 'uptime',
      topicId: 'ch-21',
      topicNumber: '21',
      topicTitle: 'System Performance',
      subtitle: 'Pretty uptime: verify system continuous operational duration without unexpected reboots',
      badges: ['uptime', 'Reliability'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-21-09',
      subChapterNumber: '21.9',
      command: 'pidstat -d 1 3',
      title: 'Disk I/O',
      topicId: 'ch-21',
      topicNumber: '21',
      topicTitle: 'System Performance',
      subtitle: 'Per-process disk read/write throughput breakdown identifying exactly which daemon saturates the SSD',
      badges: ['DiskIO', 'pidstat'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-21-10',
      subChapterNumber: '21.10',
      command: 'nicstat 1 3',
      title: 'Network Performance',
      topicId: 'ch-21',
      topicNumber: '21',
      topicTitle: 'System Performance',
      subtitle: 'Network interface card saturation, packet drop rates, and TCP retransmission analysis',
      badges: ['Network', 'Throughput'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-21-11',
      subChapterNumber: '21.11',
      command: 'perf top',
      title: 'Finding Bottlenecks',
      topicId: 'ch-21',
      topicNumber: '21',
      topicTitle: 'System Performance',
      subtitle: 'Using Linux perf profiler and flame graphs to pinpoint exact CPU instruction hotspots and lock contention',
      badges: ['perf', 'Profiling', 'Advanced'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-21-12',
      subChapterNumber: '21.12',
      command: 'dmesg -T | grep -E "(OOM|throttled)"',
      title: 'Performance Troubleshooting',
      topicId: 'ch-21',
      topicNumber: '21',
      topicTitle: 'System Performance',
      subtitle: 'Brendan Gregg\'s 60-Second Linux Performance Checklist: uptime, dmesg, vmstat, mpstat, pidstat, iostat, free',
      badges: ['Troubleshooting', 'SRE', 'Core'],
      difficulty: 'Intermediate'
    })
  ]
};

// ============================================================================
// CHAPTER 22: LINUX SECURITY (22.1 to 22.15)
// ============================================================================
export const CHAPTER_22: LinuxTopic = {
  id: 'ch-22',
  number: '22',
  title: 'Linux Security',
  iconName: 'Shield',
  description: 'Harden servers: principle of least privilege, sudoers governance, firewalls (ufw/iptables), SSH keys, and SELinux/AppArmor.',
  concepts: [
    buildLinuxConcept({
      id: 'c-22-01',
      subChapterNumber: '22.1',
      command: 'cat /etc/security/limits.conf',
      title: 'Linux Security Model',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Discretionary Access Control (DAC), Mandatory Access Control (MAC), and POSIX security boundaries',
      badges: ['Security', 'DAC', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-22-02',
      subChapterNumber: '22.2',
      command: 'ps -eo user,comm | grep -v root | head -n 10',
      title: 'Least Privilege',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Running applications as unprivileged service accounts (nginx, postgres) rather than root',
      badges: ['LeastPrivilege', 'BestPractices', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-22-03',
      subChapterNumber: '22.3',
      command: 'sudo passwd -l root',
      title: 'root Security',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Locking direct root login (PermitRootLogin no) and requiring authenticated sudo delegation with auditing',
      badges: ['Root', 'Hardening'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-22-04',
      subChapterNumber: '22.4',
      command: 'sudo -l',
      title: 'sudo',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Superuser Do: execute commands with root privileges while logging user identity in auth.log',
      badges: ['sudo', 'Privilege', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-22-05',
      subChapterNumber: '22.5',
      command: 'sudo visudo',
      title: 'sudoers',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'The /etc/sudoers policy file safely edited via visudo with automatic syntax verification',
      badges: ['visudo', 'Config', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-22-06',
      subChapterNumber: '22.6',
      command: 'find / -perm -4000 2>/dev/null',
      title: 'File Permissions',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Auditing dangerous world-writable directories and unauthorized SUID/SGID binaries',
      badges: ['Audit', 'Permissions'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-22-07',
      subChapterNumber: '22.7',
      command: 'grep -E "^(PasswordAuthentication|PermitRootLogin)" /etc/ssh/sshd_config',
      title: 'SSH Hardening',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Enforcing key-only login (PasswordAuthentication no), non-standard ports, and Fail2ban integration',
      badges: ['SSH', 'Hardening', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-22-08',
      subChapterNumber: '22.8',
      command: 'sudo iptables -L -n -v',
      title: 'Firewall Concepts',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Netfilter packet filtering: INPUT, OUTPUT, and FORWARD chains inspecting incoming TCP/UDP connections',
      badges: ['Firewall', 'Netfilter'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-22-09',
      subChapterNumber: '22.9',
      command: 'sudo ufw status verbose',
      title: 'ufw',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Uncomplicated Firewall: intuitive CLI for default-deny ingress policies (ufw allow 22, 80, 443)',
      badges: ['ufw', 'Firewall', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-22-10',
      subChapterNumber: '22.10',
      command: 'sudo iptables -S',
      title: 'iptables',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Low-level Netfilter rules table manipulating raw packet states and NAT masquerading',
      badges: ['iptables', 'Netfilter'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-22-11',
      subChapterNumber: '22.11',
      command: 'sestatus',
      title: 'SELinux',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Security-Enhanced Linux (RHEL/CentOS): Mandatory Access Control (MAC) enforcing type enforcement labels',
      badges: ['SELinux', 'MAC', 'Enterprise'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-22-12',
      subChapterNumber: '22.12',
      command: 'sudo aa-status',
      title: 'AppArmor',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Path-based MAC security profiles standard on Ubuntu and Debian restricting program filesystem capabilities',
      badges: ['AppArmor', 'Ubuntu'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-22-13',
      subChapterNumber: '22.13',
      command: 'sudo apt list --upgradable | grep -i security',
      title: 'Security Updates',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Patching Common Vulnerabilities and Exposures (CVEs) with unattended-upgrades automation',
      badges: ['Patching', 'CVE', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-22-14',
      subChapterNumber: '22.14',
      command: 'sudo aureport --summary',
      title: 'Auditing',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Linux Audit Daemon (auditd): tracking file modifications, unauthorized syscalls, and user privilege escalation',
      badges: ['Audit', 'auditd'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-22-15',
      subChapterNumber: '22.15',
      command: 'sudo grep "Failed password" /var/log/auth.log | tail -n 10',
      title: 'Security Troubleshooting',
      topicId: 'ch-22',
      topicNumber: '22',
      topicTitle: 'Linux Security',
      subtitle: 'Analyzing intrusion attempts, blocked ports, and resolving SELinux denial events with audit2why',
      badges: ['Troubleshooting', 'Triage', 'Core'],
      difficulty: 'Intermediate'
    })
  ]
};

// ============================================================================
// CHAPTER 23: CRON & SCHEDULING (23.1 to 23.10)
// ============================================================================
export const CHAPTER_23: LinuxTopic = {
  id: 'ch-23',
  number: '23',
  title: 'Cron & Scheduling',
  iconName: 'Clock',
  description: 'Automate periodic tasks: cron daemon, crontab tables, 5-field syntax, environment gotchas, and systemd timers.',
  concepts: [
    buildLinuxConcept({
      id: 'c-23-01',
      subChapterNumber: '23.1',
      command: 'systemctl status cron',
      title: 'Why Scheduling Exists',
      topicId: 'ch-23',
      topicNumber: '23',
      topicTitle: 'Cron & Scheduling',
      subtitle: 'Automating off-peak database backups, SSL certificate renewals, and cache purges reliably at 3:00 AM',
      badges: ['Automation', 'Scheduling', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-23-02',
      subChapterNumber: '23.2',
      command: 'ps aux | grep cron',
      title: 'cron',
      topicId: 'ch-23',
      topicNumber: '23',
      topicTitle: 'Cron & Scheduling',
      subtitle: 'The background cron daemon (crond) waking up once per minute to evaluate scheduled jobs',
      badges: ['cron', 'Daemon'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-23-03',
      subChapterNumber: '23.3',
      command: 'crontab -l',
      title: 'crontab',
      topicId: 'ch-23',
      topicNumber: '23',
      topicTitle: 'Cron & Scheduling',
      subtitle: 'Cron Table: per-user configuration files stored in /var/spool/cron/crontabs/ defining job schedules',
      badges: ['crontab', 'CLI', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-23-04',
      subChapterNumber: '23.4',
      command: 'echo "0 3 * * * /usr/local/bin/backup.sh"',
      title: 'Cron Syntax',
      topicId: 'ch-23',
      topicNumber: '23',
      topicTitle: 'Cron & Scheduling',
      subtitle: 'The 5-field time specification: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), Day of Week (0-6)',
      badges: ['Syntax', 'Cron', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-23-05',
      subChapterNumber: '23.5',
      command: 'crontab -e',
      title: 'crontab -e',
      topicId: 'ch-23',
      topicNumber: '23',
      topicTitle: 'Cron & Scheduling',
      subtitle: 'Safe interactive crontab editor validating syntax before installing the schedule into the spool',
      badges: ['crontab', 'Editor'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-23-06',
      subChapterNumber: '23.6',
      command: 'cat /etc/crontab',
      title: 'Cron Environment',
      topicId: 'ch-23',
      topicNumber: '23',
      topicTitle: 'Cron & Scheduling',
      subtitle: 'The #1 Cron Gotcha: cron runs in a minimal environment with PATH=/usr/bin:/bin, requiring absolute paths',
      badges: ['Environment', 'Gotchas', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-23-07',
      subChapterNumber: '23.7',
      command: 'echo "systemctl restart nginx" | at 04:00',
      title: 'at',
      topicId: 'ch-23',
      topicNumber: '23',
      topicTitle: 'Cron & Scheduling',
      subtitle: 'One-shot job scheduler executing commands exactly once at a specified future timestamp',
      badges: ['at', 'OneShot'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-23-08',
      subChapterNumber: '23.8',
      command: 'systemctl list-timers',
      title: 'systemd timers',
      topicId: 'ch-23',
      topicNumber: '23',
      topicTitle: 'Cron & Scheduling',
      subtitle: 'Modern alternative to cron with millisecond accuracy, monotonic delays (OnBootSec), and integrated journal logging',
      badges: ['systemd', 'Timers', 'Modern', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-23-09',
      subChapterNumber: '23.9',
      command: 'crontab -l | grep backup',
      title: 'Scheduling Backups',
      topicId: 'ch-23',
      topicNumber: '23',
      topicTitle: 'Cron & Scheduling',
      subtitle: 'Configuring automated tar/rsync backup schedules with lock files (flock) to prevent overlapping runs',
      badges: ['Backups', 'Automation'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-23-10',
      subChapterNumber: '23.10',
      command: 'ls -la /etc/cron.daily',
      title: 'Scheduling Maintenance',
      topicId: 'ch-23',
      topicNumber: '23',
      topicTitle: 'Cron & Scheduling',
      subtitle: 'System maintenance folders (/etc/cron.daily, hourly, weekly, monthly) managed by anacron',
      badges: ['Maintenance', 'anacron'],
      difficulty: 'Beginner'
    })
  ]
};

// ============================================================================
// CHAPTER 24: FILESYSTEM & SYSTEM TROUBLESHOOTING (24.1 to 24.13)
// ============================================================================
export const CHAPTER_24: LinuxTopic = {
  id: 'ch-24',
  number: '24',
  title: 'Filesystem & System Troubleshooting',
  iconName: 'Wrench',
  description: 'Senior sysadmin incident triage: boot issues, disk full emergencies, permission denied, crash-looping services, and network breaks.',
  concepts: [
    buildLinuxConcept({
      id: 'c-24-01',
      subChapterNumber: '24.1',
      command: 'journalctl -xb',
      title: 'Boot Problems',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Recovering from GRUB errors, corrupted initramfs, missing root UUIDs, and Emergency Mode prompts',
      badges: ['Boot', 'Emergency', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-24-02',
      subChapterNumber: '24.2',
      command: 'df -h && df -i && lsof +L1',
      title: 'Disk Full',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Triaging 100% disk usage: finding large deleted unlinked files held open by running processes (lsof +L1)',
      badges: ['Storage', 'Triage', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-24-03',
      subChapterNumber: '24.3',
      command: 'namei -m /var/www/html/index.html',
      title: 'Permission Denied',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Using namei -m to trace directory traversal permissions step-by-step from root to leaf file',
      badges: ['Permissions', 'namei', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-24-04',
      subChapterNumber: '24.4',
      command: 'type -a command_name',
      title: 'Command Not Found',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Resolving missing package binaries, path exports, unquoted spaces, and non-executable script permissions',
      badges: ['PATH', 'Troubleshooting'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-24-05',
      subChapterNumber: '24.5',
      command: 'journalctl -xeu nginx.service',
      title: 'Service Not Starting',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Diagnosing systemd unit crash loops: syntax errors in config files, port conflicts, and permission bugs',
      badges: ['Services', 'systemd', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-24-06',
      subChapterNumber: '24.6',
      command: 'top -b -n 1 | head -n 15',
      title: 'High CPU',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Identifying runaway loop algorithms, CPU crypto miners, and high I/O wait thread locks',
      badges: ['CPU', 'Saturation'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-24-07',
      subChapterNumber: '24.7',
      command: 'dmesg -T | grep -i "invoked oom-killer"',
      title: 'High Memory',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Investigating Out-Of-Memory (OOM) killer incidents, memory leaks, and tuning vm.swappiness',
      badges: ['Memory', 'OOM', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-24-08',
      subChapterNumber: '24.8',
      command: 'ip route get 8.8.8.8',
      title: 'Network Failure',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Diagnosing link downs, missing default gateways, subnet mask mismatches, and MTU packet drops',
      badges: ['Network', 'Routing'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-24-09',
      subChapterNumber: '24.9',
      command: 'systemd-resolve --status || resolvectl status',
      title: 'DNS Failure',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Troubleshooting "Could not resolve host": /etc/resolv.conf, systemd-resolved stub listeners, and UDP 53 firewall blocks',
      badges: ['DNS', 'Resolv', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-24-10',
      subChapterNumber: '24.10',
      command: 'sudo dpkg --configure -a && sudo apt install -f',
      title: 'Broken Packages',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Repairing interrupted package manager locks, corrupted dpkg status files, and unresolved dependencies',
      badges: ['apt', 'Repair', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-24-11',
      subChapterNumber: '24.11',
      command: 'sudo fsck -f /dev/sdb1',
      title: 'Filesystem Problems',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Repairing corrupted ext4/XFS filesystems using fsck and analyzing read-only mount remounts',
      badges: ['fsck', 'Storage', 'Recovery'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-24-12',
      subChapterNumber: '24.12',
      command: 'grep -Ei "fail|error|crit" /var/log/syslog | tail -n 25',
      title: 'Log Investigation',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Mastering log forensics: correlating timestamps across application logs, syslog, and kernel dmesg',
      badges: ['Forensics', 'Logs', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-24-13',
      subChapterNumber: '24.13',
      command: 'echo "Isolate -> Hypothesize -> Test -> Verify -> Document"',
      title: 'Troubleshooting Methodology',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Senior Engineer Problem Solving: avoid random guessing; follow structured scientific root-cause elimination',
      badges: ['Methodology', 'SRE', 'Core'],
      difficulty: 'Intermediate'
    })
  ]
};

// ============================================================================
// CHAPTER 25: LINUX ADMINISTRATION (25.1 to 25.10)
// ============================================================================
export const CHAPTER_25: LinuxTopic = {
  id: 'ch-25',
  number: '25',
  title: 'Linux Administration',
  iconName: 'Server',
  description: 'Enterprise operations: identity governance, package baselines, storage provisioning, security auditing, and disaster recovery.',
  concepts: [
    buildLinuxConcept({
      id: 'c-25-01',
      subChapterNumber: '25.1',
      command: 'sudo useradd -D',
      title: 'User Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Enterprise user lifecycle: automated onboarding, SSH key provisioning, password aging, and offboarding',
      badges: ['Administration', 'Users', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-25-02',
      subChapterNumber: '25.2',
      command: 'getent group sudo',
      title: 'Group Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Role-Based Access Control (RBAC) mapping functional developer roles to filesystem and service permissions',
      badges: ['RBAC', 'Groups'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-25-03',
      subChapterNumber: '25.3',
      command: 'apt-mark showhold',
      title: 'Package Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Locking critical production packages (apt-mark hold) to prevent unexpected major-version breaking updates',
      badges: ['Packages', 'Stability'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-25-04',
      subChapterNumber: '25.4',
      command: 'systemctl daemon-reload',
      title: 'Service Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Standard operating procedures for managing high-availability system daemons and health checks',
      badges: ['systemd', 'Operations'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-25-05',
      subChapterNumber: '25.5',
      command: 'sudo lvextend -r -L +10G /dev/vg0/data',
      title: 'Storage Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Online filesystem expansion with LVM (lvextend -r) without requiring server reboots or downtime',
      badges: ['Storage', 'LVM', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-25-06',
      subChapterNumber: '25.6',
      command: 'nmcli device status || networkctl',
      title: 'Network Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Enterprise network configuration using NetworkManager (nmcli) or systemd-networkd',
      badges: ['Networking', 'Admin'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-25-07',
      subChapterNumber: '25.7',
      command: 'sudo lynis audit system',
      title: 'Security Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Running Lynis automated security audits, compliance scanning, and CIS benchmark verification',
      badges: ['Security', 'Audit', 'CIS'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-25-08',
      subChapterNumber: '25.8',
      command: 'logrotate -d /etc/logrotate.d/nginx',
      title: 'Log Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Configuring centralized log forwarding (rsyslog/Fluentd/Promtail) to Grafana Loki or Elasticsearch',
      badges: ['Observability', 'Logs'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-25-09',
      subChapterNumber: '25.9',
      command: 'restic backup /var/data',
      title: 'Backup Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'The 3-2-1 backup rule: encrypted off-site deduplicated snapshots using Restic or Borg Backup',
      badges: ['Backups', 'DisasterRecovery', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-25-10',
      subChapterNumber: '25.10',
      command: 'needrestart -b',
      title: 'System Maintenance',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Executing patch maintenance windows: kernel livepatching, detecting stale processes with needrestart, and reboots',
      badges: ['Maintenance', 'SRE', 'Core'],
      difficulty: 'Intermediate'
    })
  ]
};

export const PACK_05_CHAPTERS: LinuxTopic[] = [
  CHAPTER_21,
  CHAPTER_22,
  CHAPTER_23,
  CHAPTER_24,
  CHAPTER_25,
];
