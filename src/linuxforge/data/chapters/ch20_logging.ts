import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 20: SYSTEM LOGGING & AUDITING (20.1 to 20.14)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_20: LinuxTopic = {
  id: 'ch-20',
  number: '20',
  title: 'System Logging & Auditing',
  iconName: 'FileText',
  description: 'Master enterprise Linux observability: /var/log architecture, systemd-journald binary journals (journalctl queries, priority filtering, follow streams), rsyslog, log facilities/severities, custom logger injection, logrotate lifecycle, and kernel auditd.',
  concepts: [
    buildLinuxConcept({
      id: 'c-20-01',
      subChapterNumber: '20.1',
      command: 'ls -la /var/log | head -n 10',
      title: 'Linux Logging Architecture (/var/log, syslog, journald)',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'The Linux telemetry spine: traditional plaintext syslog vs modern binary structured journald',
      badges: ['Logging', 'Architecture', 'syslog', 'journald'],
      difficulty: 'Beginner',
      quote: 'If a server crashes in the woods and nobody is logged in, the logs are the black box recorder that tells you why.',
      whatIsIt: 'In Linux, all system services, kernel events, authentication attempts, and background daemons record operational events under the "/var/log" directory tree. Modern Linux utilizes a dual-layer logging architecture: 1) "systemd-journald" acts as the primary telemetry ingestion daemon, intercepting kernel ring buffer messages (/dev/kmsg), stdout/stderr from systemd services, and syslog API calls, storing them in structured, indexed binary journal files; 2) Traditional syslog daemons (like "rsyslog") consume logs forwarded from journald to write plain-text human-readable log files.',
      inSimpleWords: 'The flight data recorder for Linux. Everything that happens—failed logins, crashes, disk errors, or service restarts—gets written down in the /var/log folder so you can investigate what happened.',
      whyDoYouNeedIt: 'Post-incident analysis, security breach investigation, and operational debugging depend entirely on logs. Without logging, system crashes and security incidents are completely invisible.',
      realWorldScenario: 'A production API crashed at 3:14 AM on Sunday. The engineer opens /var/log, reviews the journald entries around 3:14 AM, and discovers the kernel Out-Of-Memory (OOM) killer terminated the database process due to a runaway query.',
      realWorldAnalogy: 'The black box flight recorder on a commercial airplane: continuously recording sensor telemetry, cockpit conversations, and system alerts.',
      withoutVsWith: {
        without: {
          title: 'Unlogged Ephemeral Servers',
          items: ['Crashes leave zero trace, making root-cause analysis completely impossible', 'Security compromises and unauthorized root access go completely undetected', 'Developers blaming "mystery server glitches" with zero diagnostic evidence'],
          outcome: 'Unsolved recurring outages and severe security blindspots.'
        },
        with: {
          title: 'Structured Logging Architecture',
          items: ['Indisputable chronological audit trail of all system, service, and kernel events', 'Structured metadata: query by service unit, PID, severity, or exact millisecond timestamp', 'Compliance with SOC2, PCI-DSS, and ISO27001 audit logging mandates'],
          outcome: 'Instant root-cause diagnosis, tamper-evident security, and full observability.'
        }
      },
      blockDiagram: {
        title: 'Linux Dual Logging Architecture',
        subtitle: 'From event generation to storage files:',
        nodes: [
          { id: 'src', label: 'Event Sources (Kernel, Daemons, Apps)', simpleDef: 'Where logs originate', techDef: '/dev/kmsg, /dev/log socket, and stdout/stderr from systemd units', badge: 'Sources', color: '#38bdf8' },
          { id: 'journald', label: 'systemd-journald (Primary Ingestion)', simpleDef: 'Master log engine', techDef: 'Ingests, parses metadata (UID, PID, Unit), writes binary journal', badge: 'journald', color: '#10b981' },
          { id: 'storage', label: 'Storage: /var/log/journal/*.journal', simpleDef: 'Binary indexed storage', techDef: 'Fast indexed storage queried with journalctl', badge: 'Binary Journal', color: '#a855f7' },
          { id: 'rsyslog', label: 'rsyslog -> /var/log/syslog', simpleDef: 'Plaintext file exports', techDef: 'Forwards text logs to /var/log/syslog, auth.log, or remote SIEM', badge: 'Plaintext', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'syslog', simple: 'The classic Unix standard protocol and format for sending system logs.', technical: 'RFC 5424 protocol defining facility, severity, timestamp, and message format.' },
        { term: 'journald', simple: 'The modern systemd logging service that captures logs in fast, searchable binary format.', technical: 'System service collecting and storing logging data in append-only binary journal files.' }
      ],
      syntaxCode: 'ls -la /var/log | head -n 10',
      syntaxTokens: [
        { token: 'ls -la', role: 'command', explanation: 'List directory entries with detailed file attributes' },
        { token: '/var/log', role: 'path', explanation: 'Standard Linux system log directory root' },
        { token: '| head -n 10', role: 'argument', explanation: 'Limit output display to first 10 files and folders' }
      ],
      variations: [
        { command: 'ls -la /var/log', description: 'List all system log files, directories, and rotated archives' },
        { command: 'du -sh /var/log', description: 'Measure total disk space consumed by system logs' }
      ],
      expectedOutput: 'total 1450\ndrwxr-xr-x 11 root   root    4096 Sep 30 00:00 .\ndrwxr-xr-x 14 root   root    4096 Jan  1  2024 ..\n-rw-r--r--  1 root   root   45120 Sep 30 00:00 alternatives.log\ndrwxr-x---  2 root   adm     4096 Sep 30 00:00 apache2\n-rw-r-----  1 syslog adm   125042 Sep 30 00:00 auth.log\n-rw-r--r--  1 root   root   32104 Sep 30 00:00 dpkg.log\ndrwxr-sr-x+ 3 root   systemd-journal 4096 Jan 1 2024 journal\n-rw-r-----  1 syslog adm   892104 Sep 30 00:00 syslog',
      commonMistakes: [
        { mistake: 'Deleting log files with "rm" to free disk space while services are writing to them', whyWrong: 'Open file descriptors prevent space from being freed; the disk remains full until the daemon restarts!', correctWay: 'Truncate files safely without breaking handles: "sudo truncate -s 0 /var/log/syslog".' },
        { mistake: 'Assuming logs are plaintext and trying to open journal files directly with "cat"', whyWrong: 'Files in /var/log/journal/ are binary; running "cat" dumps terminal-scrambling binary noise.', correctWay: 'Use "journalctl" to read and query journald binary files.' }
      ],
      safeRecovery: 'To check disk usage of logs safely, run "sudo journalctl --disk-usage".'
    }),

    buildLinuxConcept({
      id: 'c-20-02',
      subChapterNumber: '20.2',
      command: 'ls -la /var/log/syslog /var/log/auth.log 2>/dev/null || ls -la /var/log/messages /var/log/secure 2>/dev/null',
      title: 'Key System Log Files (/var/log/syslog, auth.log, dmesg)',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'The essential log file map: Debian/Ubuntu vs RHEL log paths, authentication, and kernel dmesg',
      badges: ['Log Files', 'auth.log', 'syslog', 'messages'],
      difficulty: 'Beginner',
      quote: 'Know where to look: Debian puts authentication in auth.log; Red Hat puts it in /var/log/secure.',
      whatIsIt: 'Different Linux distributions map syslog facilities to specific standard files under /var/log: 1) System Activity: Debian/Ubuntu logs general events to "/var/log/syslog", while RHEL/CentOS/Rocky logs them to "/var/log/messages"; 2) Authentication & Security: Debian/Ubuntu logs SSH, sudo, and logins to "/var/log/auth.log", while RHEL logs to "/var/log/secure"; 3) Kernel Buffer: "dmesg" (and /var/log/dmesg) records early hardware initialization, memory detection, and PCIe errors directly from the kernel ring buffer.',
      inSimpleWords: 'The directory map of who writes where. Ubuntu puts login attempts in "auth.log", while Red Hat puts them in "secure". General events go in "syslog" on Ubuntu and "messages" on Red Hat.',
      whyDoYouNeedIt: 'When triaging unauthorized SSH logins or checking who ran a sudo command, jumping straight to the correct authentication log file is mandatory for security audits.',
      realWorldScenario: 'An auditor asks for proof of all sudo commands executed by engineers over the past month. On an Ubuntu server, you inspect "/var/log/auth.log"; on Rocky Linux, you query "/var/log/secure".',
      realWorldAnalogy: 'Different departments in a company: Human Resources records (auth.log) are kept separate from general building maintenance records (syslog).',
      withoutVsWith: {
        without: {
          title: 'Searching Random Files for Security Events',
          items: ['Typing "cat /var/log/auth.log" on Red Hat and failing because the file doesn\'t exist', 'Unaware of kernel hardware panic logs stored in dmesg', 'Missing critical security incident alerts buried in the wrong log file'],
          outcome: 'Wasted troubleshooting time and missed security breaches.'
        },
        with: {
          title: 'Cross-Distribution Log Navigation',
          items: ['Instant knowledge of Ubuntu paths (syslog / auth.log) vs RHEL paths (messages / secure)', 'Direct access to hardware and driver crash diagnostics with "dmesg -T"', 'Accurate security reporting for SOC2 and ISO compliance audits'],
          outcome: 'Rapid incident triage and complete security auditability.'
        }
      },
      blockDiagram: {
        title: 'Linux Distribution Log Path Map',
        subtitle: 'Comparing Ubuntu/Debian vs RHEL/Rocky logging paths:',
        nodes: [
          { id: 'deb_sys', label: 'Ubuntu: /var/log/syslog', simpleDef: 'General System Logs', techDef: 'Consolidated systemd and daemon operational logs', badge: 'Debian/Ubuntu', color: '#ef4444' },
          { id: 'rhel_sys', label: 'RHEL: /var/log/messages', simpleDef: 'General System Logs', techDef: 'Standard non-auth system telemetry file', badge: 'RHEL/Rocky', color: '#38bdf8' },
          { id: 'deb_auth', label: 'Ubuntu: /var/log/auth.log', simpleDef: 'Security & Logins', techDef: 'Facility auth, authpriv: sshd, sudo, su, PAM', badge: 'Debian Auth', color: '#f87171' },
          { id: 'rhel_auth', label: 'RHEL: /var/log/secure', simpleDef: 'Security & Logins', techDef: 'Facility auth, authpriv: sshd, sudo, su, PAM', badge: 'RHEL Auth', color: '#60a5fa' }
        ]
      },
      terms: [
        { term: 'auth.log / secure', simple: 'The log file where all logins, SSH connections, and sudo commands are recorded.', technical: 'Syslog file destination for auth and authpriv facility messages.' },
        { term: 'dmesg', simple: 'Driver Message: displays messages printed by the Linux kernel itself.', technical: 'Utility interrogating and controlling the kernel ring buffer (/dev/kmsg).' }
      ],
      syntaxCode: 'ls -la /var/log/syslog /var/log/auth.log 2>/dev/null || ls -la /var/log/messages /var/log/secure 2>/dev/null',
      syntaxTokens: [
        { token: 'ls -la /var/log/syslog ...', role: 'command', explanation: 'Check Debian/Ubuntu system and authentication log files' },
        { token: '||', role: 'operator', explanation: 'Fallback operator if files do not exist' },
        { token: 'ls -la /var/log/messages ...', role: 'command', explanation: 'Check Red Hat / Rocky system and security log files' }
      ],
      variations: [
        { command: 'sudo tail -n 20 /var/log/auth.log', description: 'View the last 20 authentication events on Ubuntu' },
        { command: 'sudo tail -n 20 /var/log/secure', description: 'View the last 20 security events on RHEL/Rocky' },
        { command: 'dmesg -T | grep -i oom', description: 'Check kernel ring buffer with human timestamps for Out-Of-Memory events' }
      ],
      expectedOutput: '-rw-r----- 1 syslog adm 125042 Sep 30 00:00 /var/log/auth.log\n-rw-r----- 1 syslog adm 892104 Sep 30 00:00 /var/log/syslog',
      commonMistakes: [
        { mistake: 'Running "dmesg" without "-T" and trying to decode raw epoch timestamps', whyWrong: 'Default dmesg displays seconds since system boot (e.g. [ 12345.678901]), making it hard to match real clock time.', correctWay: 'Always use "dmesg -T" for human-readable calendar dates and times.' },
        { mistake: 'Trying to read auth.log or secure without sudo', whyWrong: 'Security logs are restricted (permissions 640 root:adm) to prevent unprivileged users from reading usernames or passwords.', correctWay: 'Execute with sudo: "sudo less /var/log/auth.log".' }
      ],
      safeRecovery: 'To check who ran sudo commands recently, run: "sudo grep \'sudo:\' /var/log/auth.log 2>/dev/null || sudo grep \'sudo:\' /var/log/secure".'
    }),

    buildLinuxConcept({
      id: 'c-20-03',
      subChapterNumber: '20.3',
      command: 'journalctl -n 5',
      title: 'systemd-journald Architecture',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'The modern binary journal: structured metadata indexing, append-only integrity, and sealing',
      badges: ['journald', 'journalctl', 'systemd'],
      difficulty: 'Intermediate',
      quote: 'journald solved syslog\'s 30-year flaw: logs are no longer dumb flat text, but rich structured objects indexed by metadata.',
      whatIsIt: '"systemd-journald" is the native logging daemon built into systemd. Unlike legacy syslog (which treated logs as unindexed flat text strings), journald treats log messages as structured, key-value objects. Every log entry automatically records rich metadata: the originating systemd unit (_SYSTEMD_UNIT=nginx.service), process PID (_PID=1204), user UID (_UID=1000), executable path (_EXE=/usr/sbin/nginx), boot ID (_BOOT_ID), and monotonic timestamps. Log files are stored in optimized binary format, enabling microsecond queries without grep.',
      inSimpleWords: 'The modern database of Linux logs. Instead of dumping words into a text file, journald indexes every entry with the program\'s name, process ID, and time, making searching instantaneous.',
      whyDoYouNeedIt: 'On servers running dozens of microservices and Docker containers, flat text syslog mixes messages into an unreadable mess. journalctl allows you to isolate logs for a single service in 10 milliseconds.',
      realWorldScenario: 'Nginx failed to restart. Instead of opening a 500MB syslog file and searching for "nginx", you run "journalctl -u nginx.service -n 50" to view the exact 50 lines produced by Nginx without any other service noise.',
      realWorldAnalogy: 'Searching a digital library database with filters for Author, Year, and Title vs flipping through 10,000 loose paper pages by hand.',
      withoutVsWith: {
        without: {
          title: 'Legacy Flat-Text Syslog',
          items: ['Multi-megabyte files that must be scanned sequentially with slow grep commands', 'No standardized metadata: timestamps and process names vary across applications', 'Vulnerable to tampering: attackers can easily edit or delete lines with sed/vi'],
          outcome: 'Slow search latency and vulnerable, unindexed log data.'
        },
        with: {
          title: 'Structured Binary journald Architecture',
          items: ['Instant indexing by service unit, PID, UID, and priority level', 'Cryptographic Forward Secure Sealing (FSS) preventing retrospective tampering', 'Automatic capture of standard output (stdout/stderr) from all systemd services'],
          outcome: 'Microsecond query speed, tamper-proof logs, and native systemd integration.'
        }
      },
      blockDiagram: {
        title: 'journald Structured Object Record',
        subtitle: 'Key metadata fields stored with every log line:',
        nodes: [
          { id: 'msg', label: 'MESSAGE="Connection accepted"', simpleDef: 'Log text', techDef: 'Payload log message string', badge: 'Payload', color: '#38bdf8' },
          { id: 'unit', label: '_SYSTEMD_UNIT=sshd.service', simpleDef: 'Owning Service', techDef: 'Systemd service unit name associated with process cgroup', badge: 'Unit', color: '#10b981' },
          { id: 'pid', label: '_PID=782 | _UID=0', simpleDef: 'Process & User ID', techDef: 'Process table credentials verified by kernel at socket transmission', badge: 'Identity', color: '#a855f7' },
          { id: 'time', label: '_SOURCE_REALTIME_TIMESTAMP', simpleDef: 'Microsecond Time', techDef: 'Monotonic and realtime microsecond clock timestamps', badge: 'Timestamp', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'journalctl', simple: 'The command-line tool used to query, view, and filter logs from journald.', technical: 'CLI query utility parsing binary systemd journal files.' },
        { term: 'Forward Secure Sealing (FSS)', simple: 'A security feature that seals logs with cryptography so attackers cannot alter past logs.', technical: 'Cryptographic sealing of journal files preventing historical alteration even with root access.' }
      ],
      syntaxCode: 'journalctl -n 5',
      syntaxTokens: [
        { token: 'journalctl', role: 'command', explanation: 'Query the systemd journal' },
        { token: '-n 5', role: 'option', explanation: 'Show only the most recent 5 journal entries (like tail -n 5)' }
      ],
      variations: [
        { command: 'journalctl -n 20 --no-pager', description: 'Display the 20 most recent log entries without launching less pager' },
        { command: 'journalctl --disk-usage', description: 'Display current total disk space consumed by binary journal files' }
      ],
      expectedOutput: 'Sep 30 00:00:01 ubuntu-server CRON[1402]: (root) CMD (test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily ))\nSep 30 00:00:02 ubuntu-server systemd[1]: Starting Daily apt download activities...\nSep 30 00:00:04 ubuntu-server systemd[1]: apt-daily.service: Deactivated successfully.\nSep 30 00:00:04 ubuntu-server systemd[1]: Finished Daily apt download activities.\nSep 30 00:01:00 ubuntu-server systemd[1]: Starting Clean php session files...',
      commonMistakes: [
        { mistake: 'Trying to grep binary files in /var/log/journal/ directly', whyWrong: 'Journal files are compiled binary trees; grep will fail or return "Binary file matches".', correctWay: 'Use "journalctl -g \'pattern\'" to search within journald.' },
        { mistake: 'Forgetting "--no-pager" in automation scripts and having the script hang', whyWrong: 'By default, journalctl launches "less"; inside scripts, this blocks execution waiting for human keystrokes.', correctWay: 'Always add "--no-pager" when calling journalctl in scripts.' }
      ],
      safeRecovery: 'To check overall journal health and disk space, run "journalctl --disk-usage".'
    }),

    buildLinuxConcept({
      id: 'c-20-04',
      subChapterNumber: '20.4',
      command: 'journalctl -u ssh -n 10 --no-pager',
      title: 'Querying Logs with journalctl',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'Targeted service filtering: inspecting specific units (-u), executable paths, and reverse ordering (-r)',
      badges: ['journalctl', 'Filtering', 'Services'],
      difficulty: 'Beginner',
      quote: 'journalctl -u <service> is the SRE\'s fastest reflex: instant, noise-free logs for any systemd service.',
      whatIsIt: 'The true power of journalctl is precise metadata filtering. Rather than wading through millions of unrelated log lines, the "-u <unit_name>" option isolates logs generated strictly by that specific systemd service unit and all child worker processes inside its control group (cgroup). You can combine "-u" with "-n <lines>" to limit output length, "-r" to reverse order (displaying the newest logs at the top), and "-o json-pretty" to export structured JSON objects.',
      inSimpleWords: 'A spotlight for a single program. If your web server is acting up, you tell journalctl: "Only show me the last 10 lines from the web server, and ignore everything else."',
      whyDoYouNeedIt: 'Whenever a service fails to start (e.g. systemctl start nginx returns an error), running "journalctl -u nginx -e" jumps straight to the failure explanation at the bottom of the log.',
      realWorldScenario: 'PostgreSQL fails to start during a maintenance upgrade. You run "journalctl -u postgresql -n 20 --no-pager" and immediately see the exact startup error: "FATAL: lock file \'postmaster.pid\' already exists".',
      realWorldAnalogy: 'Filtering your email inbox by "From: Boss" so you can see important messages without being distracted by 500 newsletter emails.',
      withoutVsWith: {
        without: {
          title: 'Searching Consolidated Text Logs with grep',
          items: ['Running "grep nginx /var/log/syslog" and matching cron jobs, file paths, and random noise', 'Missing multi-line stack traces because grep only captures matching lines', 'Slow file scanning across gigabytes of unindexed text'],
          outcome: 'Noisy search results and slow incident triage.'
        },
        with: {
          title: 'Targeted Unit Filtering with journalctl -u',
          items: ['Strict cgroup-level isolation: captures 100% of logs and child output for that unit', 'Preserves complete multi-line stack traces and JSON payloads intact', 'Instant response time powered by binary B-tree indexing'],
          outcome: 'Zero noise, sub-second queries, and complete diagnostic clarity.'
        }
      },
      blockDiagram: {
        title: 'cgroup-Level Log Aggregation',
        subtitle: 'How journalctl -u captures all child processes:',
        nodes: [
          { id: 'cgroup', label: 'systemd cgroup: nginx.service', simpleDef: 'Service Sandbox', techDef: 'cgroup v2 slice containing master and 4 worker PIDs', badge: 'cgroup', color: '#38bdf8' },
          { id: 'stdout', label: 'stdout/stderr from workers', simpleDef: 'Process output', techDef: 'Pipes connected to journald socket via systemd supervisor', badge: 'Streams', color: '#10b981' },
          { id: 'query', label: 'journalctl -u nginx', simpleDef: 'Instant query', techDef: 'Indexes matching _SYSTEMD_UNIT=nginx.service', badge: 'Query Result', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'journalctl -u', simple: 'Filter logs by systemd service unit name (e.g. -u ssh, -u docker).', technical: 'Filters journal entries where _SYSTEMD_UNIT matches the specified unit name.' },
        { term: 'Reverse Mode (-r)', simple: 'Shows the newest, most recent logs first at the top of your screen.', technical: 'Outputs journal records in reverse chronological order.' }
      ],
      syntaxCode: 'journalctl -u ssh -n 10 --no-pager',
      syntaxTokens: [
        { token: 'journalctl', role: 'command', explanation: 'Query systemd journal' },
        { token: '-u ssh', role: 'option', explanation: 'Filter logs specifically for the "ssh" unit service' },
        { token: '-n 10', role: 'option', explanation: 'Limit output to the last 10 entries' },
        { token: '--no-pager', role: 'option', explanation: 'Print directly to terminal standard output without launching less' }
      ],
      variations: [
        { command: 'journalctl -u nginx -r -n 10', description: 'Show the 10 newest Nginx logs in reverse order (newest first)' },
        { command: 'journalctl _PID=1204', description: 'Filter logs generated by a specific Process ID' },
        { command: 'journalctl /usr/sbin/sshd', description: 'Filter logs generated by a specific executable binary path' }
      ],
      expectedOutput: 'Sep 30 00:00:00 ubuntu-server sshd[782]: Server listening on 0.0.0.0 port 22.\nSep 30 00:00:00 ubuntu-server sshd[782]: Server listening on :: port 22.\nSep 30 00:05:12 ubuntu-server sshd[1204]: Accepted publickey for ubuntu from 192.168.1.100 port 45892 ssh2: ED25519',
      commonMistakes: [
        { mistake: 'Forgetting the ".service" suffix if a unit name is ambiguous', whyWrong: 'If there is both a timer and a service named "backup", typing "-u backup" might match the wrong one.', correctWay: 'Specify explicitly: "journalctl -u backup.service".' },
        { mistake: 'Running journalctl without sudo and missing system logs', whyWrong: 'Unprivileged users can only view their own user session logs; system daemon logs require sudo or membership in the "systemd-journal" group.', correctWay: 'Run with sudo: "sudo journalctl -u nginx".' }
      ],
      safeRecovery: 'To jump straight to the end of a service\'s logs in interactive less mode, run "journalctl -u <service> -e".'
    }),

    buildLinuxConcept({
      id: 'c-20-05',
      subChapterNumber: '20.5',
      command: 'journalctl -p err -b --no-pager | head -n 10',
      title: 'Filtering by Time, Unit, and Priority',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'Surgical log queries: boot filtering (-b), time ranges (--since/--until), and syslog priority levels (-p)',
      badges: ['Time Filters', 'Priorities', 'Boot ID'],
      difficulty: 'Intermediate',
      quote: 'Time and severity are the two axes of triage: journalctl --since "1 hour ago" -p err finds all critical bugs instantly.',
      whatIsIt: 'journalctl provides multi-dimensional filtering across time, boot sessions, and severity: 1) Boot filtering: "-b" (current boot only) or "-b -1" (the previous boot prior to reboot); 2) Time-range filtering: "--since \"2026-09-30 00:00:00\"" or human-friendly relative strings like "--since \"1 hour ago\"" and "--until \"10 minutes ago\""; 3) Priority filtering: "-p <level>" filters by standard syslog severity (0=emerg, 1=alert, 2=crit, 3=err, 4=warning, 5=notice, 6=info, 7=debug). Setting "-p err" displays all errors, critical, and emergency messages while suppressing normal informational noise.',
      inSimpleWords: 'Time travel and emergency filters. You can ask journalctl: "Only show me errors (-p err) that happened during the last 30 minutes (--since \'30 min ago\') since the last reboot (-b)."',
      whyDoYouNeedIt: 'When a server reboots unexpectedly in the middle of the night, "journalctl -b -1 -p err" reveals the fatal errors that occurred right before the system went down.',
      realWorldScenario: 'An outage occurred between 02:00 and 02:30 AM. You run "journalctl --since \'02:00\' --until \'02:30\' -p err" to isolate the exact errors generated during that 30-minute window.',
      realWorldAnalogy: 'A security guard reviewing surveillance footage: fast-forwarding to between 2:00 AM and 2:30 AM, and filtering only for video clips where the motion alarm tripped.',
      withoutVsWith: {
        without: {
          title: 'Manual Regex Timestamp Parsing',
          items: ['Writing complex sed and awk regexes to match date and time strings in text files', 'Logs from previous boots overwritten or mixed into monolithic files', 'Sifting through 100,000 "info" lines to find 2 critical error lines'],
          outcome: 'Slow, frustrating log searching and missed crash indicators.'
        },
        with: {
          title: 'Surgical Filtering with journalctl',
          items: ['Instant boot isolation: inspect previous failed boots with "-b -1"', 'Natural language time queries: --since "30 minutes ago"', 'Severity filtering (-p err) suppressing 99% of normal operational noise'],
          outcome: 'Rapid incident triage and instant isolation of fatal errors.'
        }
      },
      blockDiagram: {
        title: 'journalctl 3-Axis Filtering',
        subtitle: 'Combining Boot, Time, and Severity parameters:',
        nodes: [
          { id: 'boot', label: '1. Boot Filter (-b 0)', simpleDef: 'Current boot only', techDef: 'Filters records matching active _BOOT_ID', badge: 'Boot Axis', color: '#38bdf8' },
          { id: 'time', label: '2. Time (--since "1h ago")', simpleDef: 'Time window', techDef: 'Binary search on monotonic microsecond timestamps', badge: 'Time Axis', color: '#10b981' },
          { id: 'prio', label: '3. Severity (-p err)', simpleDef: 'Errors & above (0-3)', techDef: 'PRIORITY <= 3 (emerg, alert, crit, err)', badge: 'Severity Axis', color: '#ef4444' }
        ]
      },
      terms: [
        { term: 'Boot ID (-b)', simple: 'A unique identifier assigned to each system startup; "-b -1" inspects the previous boot.', technical: '128-bit random UUID generated by kernel at boot tracking reboot cycles.' },
        { term: 'Priority (-p)', simple: 'Syslog severity level from 0 (system unusable) to 7 (debug noise).', technical: 'Standard numerical log level hierarchy: emerg(0), alert(1), crit(2), err(3), warning(4), notice(5), info(6), debug(7).' }
      ],
      syntaxCode: 'journalctl -p err -b --no-pager | head -n 10',
      syntaxTokens: [
        { token: 'journalctl', role: 'command', explanation: 'Query systemd journal' },
        { token: '-p err', role: 'option', explanation: 'Filter by priority: show only errors and higher severities (emerg, alert, crit, err)' },
        { token: '-b', role: 'option', explanation: 'Limit to current boot session only' },
        { token: '--no-pager', role: 'option', explanation: 'Print directly to terminal without pager' },
        { token: '| head -n 10', role: 'argument', explanation: 'Limit output display to first 10 error lines' }
      ],
      variations: [
        { command: 'journalctl -b -1 -e', description: 'Inspect the final lines of the PREVIOUS boot session before the last reboot' },
        { command: 'journalctl --since "1 hour ago" -u nginx', description: 'Show Nginx logs from the past 60 minutes' },
        { command: 'journalctl --since "yesterday" --until "today"', description: 'Query logs generated strictly during the previous day' },
        { command: 'journalctl -p warning..err', description: 'Show messages in the range between warning and err' }
      ],
      expectedOutput: 'Sep 30 00:00:01 ubuntu-server kernel: ACPI Error: AE_NOT_FOUND, During name lookup/catalog (20210730/psobject-220)\nSep 30 00:00:01 ubuntu-server kernel: ACPI BIOS Error (bug): Failure creating named object',
      commonMistakes: [
        { mistake: 'Forgetting that "-p err" includes emerg, alert, and crit automatically', whyWrong: 'In syslog hierarchy, specifying a priority matches that level AND all higher severities above it.', correctWay: 'Use "-p err" to capture all serious problems (levels 0 through 3).' },
        { mistake: 'Using date formats that journalctl cannot parse', whyWrong: 'Unrecognized date formats cause journalctl to fail with "Failed to parse timestamp".', correctWay: 'Use standard "YYYY-MM-DD HH:MM:SS" or relative terms like "1 hour ago", "yesterday", "today".' }
      ],
      safeRecovery: 'To see a list of all recorded historical boots on the server, run "journalctl --list-boots".'
    }),

    buildLinuxConcept({
      id: 'c-20-06',
      subChapterNumber: '20.6',
      command: 'journalctl -f -n 0 & sleep 1 && kill $! 2>/dev/null || echo "log stream"',
      title: 'Live Log Streaming (journalctl -f, tail -f)',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'Real-time observability: streaming live events as they occur (-f / follow) for instant feedback',
      badges: ['Follow', 'Streaming', 'Real-Time'],
      difficulty: 'Beginner',
      quote: 'Live log streaming is your system pulse: watch incoming requests and errors hit the wire in real time.',
      whatIsIt: 'When debugging live issues, reproducing bugs, or monitoring a deployment rollout, administrators need to observe log messages the exact millisecond they are generated. Both "journalctl -f" and the classic "tail -f" provide live streaming Follow Mode: they display recent lines and keep the file stream open, printing new lines in real time as processes append them. Combining "journalctl -f -u <service>" isolates live stream output to a single application.',
      inSimpleWords: 'Watching live TV instead of reading yesterday\'s newspaper. As people click on your website or errors happen, the lines scroll across your screen in real time.',
      whyDoYouNeedIt: 'You just deployed a new software update. You keep "journalctl -u my-app -f" open in a terminal window to watch for startup errors or unexpected crashes the second traffic arrives.',
      realWorldScenario: 'You are testing an API webhook from Stripe. You run "sudo journalctl -u api-server -f" in your terminal, trigger a test payment on Stripe\'s dashboard, and watch the API server receive and process the webhook live.',
      realWorldAnalogy: 'Watching a live seismograph needle move during an earthquake vs reviewing the paper charts the next day.',
      withoutVsWith: {
        without: {
          title: 'Manual Repeated Log Checking',
          items: ['Typing "cat" or "less" over and over again to see if new errors appeared', 'Missing transient error spikes that occur between manual command runs', 'Slow feedback loop during API webhook and authentication testing'],
          outcome: 'Frustrating, slow testing and delayed incident reaction.'
        },
        with: {
          title: 'Real-Time Live Streaming (-f)',
          items: ['Instant visual feedback the exact millisecond an event occurs', 'Filtered live streams: watch only errors with "journalctl -f -p err"', 'Targeted live streams: watch only a single service with "journalctl -fu nginx"'],
          outcome: 'Sub-second incident awareness and rapid development testing.'
        }
      },
      blockDiagram: {
        title: 'Live Log Streaming Loop',
        subtitle: 'How follow mode streams events in real time:',
        nodes: [
          { id: 'app', label: 'App / Kernel Event', simpleDef: 'Generates log event', techDef: 'Daemon writes message to /dev/log or stdout', badge: 'Event', color: '#38bdf8' },
          { id: 'inotify', label: 'inotify / Poll Event', simpleDef: 'Detects file append', techDef: 'Kernel inotify subsystem signals journald append', badge: 'Kernel Poll', color: '#10b981' },
          { id: 'term', label: 'Terminal Screen (-f)', simpleDef: 'Prints immediately', techDef: 'Streams new formatted record to terminal emulator stdout', badge: 'Live Stream', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'Follow Mode (-f)', simple: 'Keeps the log open and prints new lines as they are written in real time.', technical: 'Monitors file descriptor for append events using inotify or polling loop.' },
        { term: 'tail -f vs tail -F', simple: '"tail -F" keeps watching even if the file is rotated or replaced; "-f" loses the file on rotation.', technical: '"-F" tracks by filename and retries on rename; "-f" tracks by file descriptor.' }
      ],
      syntaxCode: 'journalctl -f -n 0 & sleep 1 && kill $! 2>/dev/null || echo "log stream"',
      syntaxTokens: [
        { token: 'journalctl -f', role: 'command', explanation: 'Follow (stream) new journal entries in real time' },
        { token: '-n 0', role: 'option', explanation: 'Do not show past logs; only show new incoming events from this moment forward' },
        { token: '& sleep 1 && kill $!', role: 'operator', explanation: 'Background and terminate demonstration stream safely after 1 second' }
      ],
      variations: [
        { command: 'journalctl -fu nginx', description: 'Stream live logs for the Nginx service in real time' },
        { command: 'journalctl -kf', description: 'Stream live kernel messages (like live dmesg)' },
        { command: 'tail -f /var/log/nginx/access.log', description: 'Classic streaming of plaintext web server log' },
        { command: 'tail -F /var/log/syslog', description: 'Stream plaintext log with automatic tracking across logrotate file renames' }
      ],
      expectedOutput: 'log stream',
      commonMistakes: [
        { mistake: 'Running "tail -f" on a log file right when it gets rotated by logrotate', whyWrong: '"tail -f" tracks the old inode; when logrotate renames the file, tail keeps watching the old dead file!', correctWay: 'Use "tail -F" (capital F) which follows by filename and re-opens the file after rotation.' },
        { mistake: 'Leaving an unconstrained "journalctl -f" running on a 10,000 req/sec web server', whyWrong: 'Streaming 10,000 logs/sec into a terminal will lock up your SSH session with text flooding.', correctWay: 'Filter by service (-u) or severity (-p err) before starting follow mode.' }
      ],
      safeRecovery: 'To stop a live streaming log session at any time, press Ctrl+C.'
    }),

    buildLinuxConcept({
      id: 'c-20-07',
      subChapterNumber: '20.7',
      command: 'ls -d /var/log/journal 2>/dev/null || echo "Transient journal"',
      title: 'Persistent Journal Storage (/var/log/journal)',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'Configuring journal persistence: /run/log/journal (RAM volatile) vs /var/log/journal (disk persistent)',
      badges: ['journald', 'Persistence', 'Storage'],
      difficulty: 'Intermediate',
      quote: 'If /var/log/journal does not exist, your logs vanish into thin air upon reboot: make journald persistent.',
      whatIsIt: 'By default on some minimal distributions, systemd-journald operates in "volatile" mode: logs are stored in RAM under /run/log/journal/. In this mode, every log is permanently erased when the machine reboots or loses power! To make logs persistent across server reboots, the directory "/var/log/journal/" must exist (or Storage=persistent configured in /etc/systemd/journald.conf). In persistent mode, journald writes to indexed files on disk, automatically capping its disk usage to prevent filling root partitions.',
      inSimpleWords: 'Saving logs to the hard drive instead of RAM. If you don\'t turn this on, all your logs get wiped clean every time your computer restarts.',
      whyDoYouNeedIt: 'Post-mortem debugging of unexpected server reboots or kernel panics requires historical logs from previous boots ("journalctl -b -1"). Without persistent storage, those logs are lost forever.',
      realWorldScenario: 'An AWS EC2 instance reboots unexpectedly at 4:00 AM. You SSH in and run "journalctl -b -1" to see why it crashed, but it outputs "No such boot". You realize journald was in volatile mode. You enable persistent logging immediately.',
      realWorldAnalogy: 'Writing notes on a dry-erase whiteboard (RAM volatile) vs writing in an archival bound notebook (disk persistent).',
      withoutVsWith: {
        without: {
          title: 'Volatile RAM-Only Logging (/run/log/journal)',
          items: ['Every log entry completely erased upon server reboot or power failure', 'Cannot investigate why a server crashed after an unexpected reboot', 'Zero compliance audit history preserved across maintenance windows'],
          outcome: 'Lost forensic evidence and impossible post-mortem debugging.'
        },
        with: {
          title: 'Persistent Disk Logging (/var/log/journal)',
          items: ['Complete historical log archive preserved across dozens of historical boots', 'Ability to compare metrics between past reboots: journalctl -b -1 vs -b -2', 'Automatic disk cap (SystemMaxUse=1G) preventing logs from filling disk'],
          outcome: 'Permanent forensic audit trail and reliable post-mortem triage.'
        }
      },
      blockDiagram: {
        title: 'journald Storage Modes',
        subtitle: 'Volatile RAM vs Persistent Disk storage paths:',
        nodes: [
          { id: 'vol', label: 'Storage=volatile (/run/log/journal/)', simpleDef: 'RAM-Only (Temporary)', techDef: 'Stored in tmpfs; erased on unmount/reboot', badge: 'Volatile', color: '#ef4444' },
          { id: 'pers', label: 'Storage=persistent (/var/log/journal/)', simpleDef: 'Disk Storage (Permanent)', techDef: 'Stored in persistent filesystem; survives reboots', badge: 'Persistent', color: '#10b981' },
          { id: 'cap', label: 'SystemMaxUse=2G', simpleDef: 'Disk Space Cap', techDef: 'Automatically prunes oldest archive files when limit is reached', badge: 'Safety Cap', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'Storage=persistent', simple: 'Setting in /etc/systemd/journald.conf that forces logs to be saved to disk.', technical: 'journald configuration directive enforcing persistent on-disk journal storage.' },
        { term: 'SystemMaxUse', simple: 'The maximum amount of hard drive space journald is allowed to take up.', technical: 'Directive capping total filesystem space allocated to journal files before auto-vacuuming.' }
      ],
      syntaxCode: 'ls -d /var/log/journal 2>/dev/null || echo "Transient journal"',
      syntaxTokens: [
        { token: 'ls -d /var/log/journal', role: 'command', explanation: 'Check if persistent journal directory exists on disk' },
        { token: '2>/dev/null', role: 'operator', explanation: 'Suppress error if directory is missing' },
        { token: '|| echo "Transient journal"', role: 'operator', explanation: 'Fallback message indicating volatile RAM logging mode' }
      ],
      variations: [
        { command: 'sudo mkdir -p /var/log/journal && sudo systemctl restart systemd-journald', description: 'Enable persistent journal logging immediately' },
        { command: 'sudo journalctl --vacuum-size=500M', description: 'Prune journal files to reclaim disk space, keeping total size under 500MB' },
        { command: 'sudo journalctl --vacuum-time=30d', description: 'Delete journal files older than 30 days' }
      ],
      expectedOutput: '/var/log/journal',
      commonMistakes: [
        { mistake: 'Letting persistent journals grow uncontrolled on a small 10GB cloud disk', whyWrong: 'Default journald settings can consume up to 10% of the filesystem (or 4GB), filling up small cloud disks.', correctWay: 'Configure "SystemMaxUse=1G" in /etc/systemd/journald.conf to enforce strict disk caps.' },
        { mistake: 'Deleting journal files manually with "rm -rf /var/log/journal/*"', whyWrong: 'Manual deletion can corrupt active memory maps and lock journald.', correctWay: 'Use the official cleanup tool: "sudo journalctl --vacuum-size=500M".' }
      ],
      safeRecovery: 'To safely shrink journal disk usage immediately, run "sudo journalctl --vacuum-size=200M".'
    }),

    buildLinuxConcept({
      id: 'c-20-08',
      subChapterNumber: '20.8',
      command: 'cat /etc/rsyslog.conf 2>/dev/null | head -n 10 || echo "rsyslog config"',
      title: 'Rsyslog Configuration (/etc/rsyslog.conf, /etc/rsyslog.d/)',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'The enterprise logging router: rules, selector lines, templates, and remote forwarding',
      badges: ['rsyslog', 'Syslog', 'Forwarding'],
      difficulty: 'Intermediate',
      quote: 'rsyslog is the postal sorting station of Linux logs: filter by facility, format with templates, and forward over the network.',
      whatIsIt: '"rsyslog" (Rocket-Fast System for Log Processing) is the enterprise syslog implementation default on RHEL, Debian, and Ubuntu. Configured via "/etc/rsyslog.conf" and drop-in files in "/etc/rsyslog.d/*.conf", rsyslog parses incoming log streams and routes them according to Selector Rules formatted as "facility.severity action". For example, "auth,authpriv.* /var/log/auth.log" directs security logs to auth.log. Crucially, rsyslog can forward logs over TCP/UDP/TLS to remote centralized log servers (e.g. "*.* @@logserver.corp.com:514").',
      inSimpleWords: 'A smart mailroom for your computer. It reads every message, looks at who sent it (facility) and how important it is (severity), and routes it to the right file or mails it over the network to a central log server.',
      whyDoYouNeedIt: 'In enterprise environments, logs cannot stay trapped on individual servers. rsyslog routes logs off the machine to centralized security platforms (SIEM, Splunk, Elastic) in real time.',
      realWorldScenario: 'PCI-DSS compliance requires forwarding all authentication events to an external immutable log vault. You add "*.* @@siem.internal:514" to /etc/rsyslog.d/50-remote.conf, ensuring all security events are instantly backed up remotely.',
      realWorldAnalogy: 'A postal sorting machine reading the zip code on envelopes and sorting them into local delivery bags or international airmail cargo bins.',
      withoutVsWith: {
        without: {
          title: 'Unconfigured Isolated Logs',
          items: ['Logs trapped on local disks; lost forever if a cloud instance is terminated or drive fails', 'An attacker who gains root can delete local log files to hide their tracks', 'No centralized search or correlation across server clusters'],
          outcome: 'Lost incident evidence and audit compliance failure.'
        },
        with: {
          title: 'Configured Enterprise rsyslog Routing',
          items: ['Real-time streaming of all events to remote SIEM / Elasticsearch clusters', 'Tamper-proof security: logs forwarded instantly before an attacker can wipe local disks', 'Fine-grained routing rules directing noisy daemons to dedicated separate files'],
          outcome: 'Centralized observability, forensic immutability, and enterprise compliance.'
        }
      },
      blockDiagram: {
        title: 'rsyslog Rule Syntax Breakdown',
        subtitle: 'Deconstructing: "auth,authpriv.*   /var/log/auth.log"',
        nodes: [
          { id: 'fac', label: 'Facility: auth,authpriv', simpleDef: 'Subsystem', techDef: 'Specifies subsystem generating message (auth, cron, mail, daemon)', badge: 'Facility', color: '#38bdf8' },
          { id: 'dot', label: '.', simpleDef: 'Separator', techDef: 'Period joins facility and severity level', badge: 'Separator', color: '#64748b' },
          { id: 'sev', label: 'Severity: * (All)', simpleDef: 'Priority level', techDef: 'Matches all priorities (*), or specific levels (err, warning, info)', badge: 'Severity', color: '#10b981' },
          { id: 'act', label: 'Action: /var/log/auth.log', simpleDef: 'Destination', techDef: 'Target file path, pipe, or remote network destination (@@host)', badge: 'Action', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'Facility', simple: 'The category of program that created the log (like mail, auth, kernel, cron).', technical: 'Syslog message categorization code (0-23) defining originating subsystem.' },
        { term: 'Remote Forwarding (@@)', simple: 'Tells rsyslog to send logs across the network using TCP (@@) or UDP (@).', technical: 'Target action syntax: "@host" specifies UDP; "@@host" specifies reliable TCP transport.' }
      ],
      syntaxCode: 'cat /etc/rsyslog.conf 2>/dev/null | head -n 10 || echo "rsyslog config"',
      syntaxTokens: [
        { token: 'cat', role: 'command', explanation: 'Display file contents' },
        { token: '/etc/rsyslog.conf', role: 'path', explanation: 'Main rsyslog daemon configuration file' },
        { token: '| head -n 10', role: 'argument', explanation: 'Display first 10 lines' }
      ],
      variations: [
        { command: 'cat /etc/rsyslog.d/50-default.conf', description: 'View default Ubuntu/Debian selector rules and file mappings' },
        { command: 'rsyslogd -N 1', description: 'Validate rsyslog configuration syntax and report errors before restarting' }
      ],
      expectedOutput: '# /etc/rsyslog.conf configuration file for rsyslog.\n#\n# For more information see\n# /usr/share/doc/rsyslog-doc/html/configuration/index.html\n#\n#################\n#### MODULES ####\n#################\n\nmodule(load="imuxsock") # provides support for local system logging',
      commonMistakes: [
        { mistake: 'Restarting rsyslog after editing config without running "rsyslogd -N 1"', whyWrong: 'A syntax error in rsyslog.conf will prevent the daemon from starting, silently halting all file logging.', correctWay: 'ALWAYS test configuration syntax with "sudo rsyslogd -N 1" before restarting.' },
        { mistake: 'Using UDP (@host) instead of TCP (@@host) for remote forwarding on unreliable networks', whyWrong: 'UDP drops packets silently during network congestion; TCP guarantees delivery.', correctWay: 'Use "@@" for reliable TCP forwarding.' }
      ],
      safeRecovery: 'Always test rsyslog syntax before reloading: "sudo rsyslogd -N 1".'
    }),

    buildLinuxConcept({
      id: 'c-20-09',
      subChapterNumber: '20.9',
      command: 'logger -p auth.notice "Git Academy security audit test"',
      title: 'Log Facilities and Severity Levels',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'The RFC 5424 standard: 8 severity levels and 24 functional subsystem facilities',
      badges: ['Facilities', 'Severities', 'RFC5424'],
      difficulty: 'Intermediate',
      quote: 'Log levels are not suggestions: knowing the difference between Warning and Error prevents alert fatigue.',
      whatIsIt: 'The syslog standard (RFC 5424) classifies every log message using two coordinates: Facility and Severity. The Facility represents the originating subsystem: kern (0), user (1), mail (2), daemon (3), auth (4), syslog (5), lpr (6), news (7), cron (9), authpriv (10), and local0 through local7 (16-23 reserved for custom applications). The Severity represents urgency on an 8-level scale: 0 (Emergency), 1 (Alert), 2 (Critical), 3 (Error), 4 (Warning), 5 (Notice), 6 (Informational), and 7 (Debug).',
      inSimpleWords: 'The two labels attached to every message: WHO sent it (Facility, like "auth" or "mail") and HOW URGENT it is (Severity, from "Notice" up to "Emergency").',
      whyDoYouNeedIt: 'Monitoring systems like Datadog or Prometheus page on-call engineers when Severity is Critical (2) or Error (3), but ignore Informational (6) messages. Proper severity tagging prevents 3:00 AM false alarms.',
      realWorldScenario: 'You are writing an automated payment processing script. A network retry is logged as "warning", but a failure to charge a credit card is logged as "err", ensuring the on-call team is alerted only when transactions actually fail.',
      realWorldAnalogy: 'Hospital triage: a papercut is given low priority (Informational), while chest pain is marked code red (Emergency).',
      withoutVsWith: {
        without: {
          title: 'Unclassified Log Messages',
          items: ['Every log message dumped at the same priority, creating deafening alert fatigue', 'On-call engineers paged at 2:00 AM for harmless routine informational messages', 'Real production outages missed because genuine error alerts were drowned in noise'],
          outcome: 'Alert fatigue, slow incident response, and engineer burnout.'
        },
        with: {
          title: 'Standardized Facility & Severity Tagging',
          items: ['Accurate routing to dedicated log files based on facility (auth -> auth.log)', 'Automated alerting triggered only on high-severity thresholds (severity <= err)', 'Clean filtering during post-incident investigations: journalctl -p err'],
          outcome: 'Zero alert fatigue, actionable on-call pages, and rapid triage.'
        }
      },
      blockDiagram: {
        title: 'Syslog Severity Hierarchy (RFC 5424)',
        subtitle: 'The 8 standardized severity levels (0 = Most Urgent, 7 = Least Urgent):',
        nodes: [
          { id: 'e0', label: '0: Emergency (emerg)', simpleDef: 'System unusable', techDef: 'Kernel panic, system shutdown imminent', badge: 'Level 0', color: '#ef4444' },
          { id: 'e1', label: '1: Alert (alert)', simpleDef: 'Immediate action needed', techDef: 'Corrupted database, primary link down', badge: 'Level 1', color: '#f87171' },
          { id: 'e3', label: '3: Error (err)', simpleDef: 'Error condition', techDef: 'Non-fatal application or transaction failure', badge: 'Level 3', color: '#f59e0b' },
          { id: 'e6', label: '6: Informational (info)', simpleDef: 'Normal operational message', techDef: 'Service started, user logged in, cron finished', badge: 'Level 6', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'Facility', simple: 'What part of the system generated the log (e.g. auth, cron, mail, daemon).', technical: 'Functional category identifier defined in RFC 5424.' },
        { term: 'local0 - local7', simple: '8 custom categories reserved for your own scripts and company software.', technical: 'User-defined facilities available for custom application logging.' }
      ],
      syntaxCode: 'logger -p auth.notice "Git Academy security audit test"',
      syntaxTokens: [
        { token: 'logger', role: 'command', explanation: 'A shell command interface to the syslog system log module' },
        { token: '-p auth.notice', role: 'option', explanation: 'Set facility to "auth" and severity to "notice"' },
        { token: '"Git Academy security audit test"', role: 'argument', explanation: 'Message string injected into system logs' }
      ],
      variations: [
        { command: 'logger -p local0.err "Database connection lost"', description: 'Inject error message tagged with custom local0 facility' },
        { command: 'logger -p daemon.info "Worker process restarted normally"', description: 'Inject informational message under daemon facility' }
      ],
      expectedOutput: '(logger injects message silently into syslog; verify with "sudo tail -n 1 /var/log/auth.log" or "journalctl -t logger")',
      commonMistakes: [
        { mistake: 'Logging routine informational messages at "err" or "crit" level', whyWrong: 'External monitoring systems will treat every routine message as an emergency outage, waking up engineers.', correctWay: 'Reserve "err" and "crit" strictly for actionable failures; use "info" or "notice" for normal milestones.' },
        { mistake: 'Using non-standard facility names', whyWrong: 'Syslog only understands official facilities (auth, cron, daemon, local0-7); custom names will fail.', correctWay: 'Use "local0" through "local7" for custom internal applications.' }
      ],
      safeRecovery: 'To verify where your test message landed, query journalctl: "journalctl -p notice --since \'1 minute ago\'".'
    }),

    buildLinuxConcept({
      id: 'c-20-10',
      subChapterNumber: '20.10',
      command: 'logger -t CLOUDSTACK "Manual diagnostic entry"',
      title: 'Generating Custom Log Entries (logger)',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'Shell script telemetry: injecting tagged, structured log entries directly into systemd-journald and syslog',
      badges: ['logger', 'Scripts', 'Telemetry'],
      difficulty: 'Beginner',
      quote: 'Don\'t write custom file-logging in bash: the logger command routes your script output directly into systemd-journald.',
      whatIsIt: '"logger" is a shell command interface to the syslog system log module. It allows shell scripts, automation pipelines, and CLI operators to inject messages directly into the system logging subsystem (/dev/log socket and systemd-journald). Using flags like "-t <tag>" (sets the process tag/name) and "-p <facility.priority>", scripts can log events that are automatically timestamped, indexed, rotated, and forwarded to central SIEMs alongside native system services.',
      inSimpleWords: 'A megaphone for your scripts. Instead of writing your own complicated logging code, you use "logger" to send messages straight into Linux\'s official master logbook.',
      whyDoYouNeedIt: 'Writing custom logs to "/tmp/my_log.txt" is bad practice: those files are never rotated, never indexed by journalctl, and never forwarded to central monitoring. "logger" integrates your scripts into the official operating system telemetry.',
      realWorldScenario: 'You wrote a night-time database backup script. When the backup finishes, the script runs: "logger -t DB_BACKUP -p local0.info \'Backup completed: 42 GB in 18 minutes\'", allowing the whole SRE team to monitor backups via journalctl.',
      realWorldAnalogy: 'Making an official entry into a company logbook with your department stamp, rather than writing a note on a random scrap of paper.',
      withoutVsWith: {
        without: {
          title: 'Writing Custom Log Files (>> /tmp/script.log)',
          items: ['Ad-hoc log files scattered across the system, never rotated, eventually filling up disks', 'Unformatted timestamps that cannot be parsed by central monitoring tools', 'No integration with journalctl, remote syslog, or security auditing'],
          outcome: 'Unmanaged log clutter, disk fill risks, and poor observability.'
        },
        with: {
          title: 'Injecting with logger',
          items: ['Native integration into systemd-journald and /var/log/syslog', 'Automatic rotation, disk capping, and remote forwarding via rsyslog/SIEM', 'Searchable by custom tag: journalctl -t DB_BACKUP'],
          outcome: 'Enterprise-grade script observability with zero maintenance overhead.'
        }
      },
      blockDiagram: {
        title: 'logger Ingestion Flow',
        subtitle: 'From shell script to central journal storage:',
        nodes: [
          { id: 'cmd', label: 'logger -t APP "Message"', simpleDef: 'Script invokes logger', techDef: 'logger CLI utility formats RFC 5424 syslog frame', badge: 'Command', color: '#38bdf8' },
          { id: 'sock', label: 'UNIX Socket: /dev/log', simpleDef: 'Injected into socket', techDef: 'Transmits datagram over AF_UNIX /run/systemd/journal/dev-log', badge: 'Socket', color: '#10b981' },
          { id: 'journal', label: 'systemd-journald', simpleDef: 'Indexed in journal', techDef: 'Indexes entry with SYSLOG_IDENTIFIER="APP"', badge: 'Storage', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'logger', simple: 'A command to write messages directly into Linux\'s official system logs.', technical: 'Userland command-line tool connecting to syslog socket interface.' },
        { term: 'Tag (-t)', simple: 'The program name attached to the message so you can search for it later.', technical: 'Sets the SYSLOG_IDENTIFIER header field on the syslog record.' }
      ],
      syntaxCode: 'logger -t CLOUDSTACK "Manual diagnostic entry"',
      syntaxTokens: [
        { token: 'logger', role: 'command', explanation: 'Syslog injection command' },
        { token: '-t CLOUDSTACK', role: 'option', explanation: 'Tag the entry with the identifier "CLOUDSTACK"' },
        { token: '"Manual diagnostic entry"', role: 'argument', explanation: 'Message payload string' }
      ],
      variations: [
        { command: 'logger -t BACKUP -p local0.info "Backup finished successfully"', description: 'Log tagged message with specific facility and severity' },
        { command: 'logger -s "Console alert"', description: 'Output message to stderr in addition to writing to system logs (-s)' },
        { command: 'journalctl -t CLOUDSTACK', description: 'Query all logs generated with the "CLOUDSTACK" tag' }
      ],
      expectedOutput: '(Injects entry silently; verify with "journalctl -t CLOUDSTACK -n 1 --no-pager")',
      commonMistakes: [
        { mistake: 'Writing custom logging functions in bash that write to unrotated text files', whyWrong: 'Unrotated text files grow indefinitely until they consume 100% of the server\'s disk space.', correctWay: 'Use "logger -t MY_SCRIPT" and let systemd and logrotate manage log lifecycle.' },
        { mistake: 'Logging sensitive passwords or API tokens with logger', whyWrong: 'Messages passed to logger are recorded in system logs and forwarded to central SIEMs, exposing secrets to all log readers.', correctWay: 'Sanitize strings to ensure tokens are never logged.' }
      ],
      safeRecovery: 'To test logger and view the result immediately: "logger -t TEST \'hello\' && journalctl -t TEST -n 1".'
    }),

    buildLinuxConcept({
      id: 'c-20-11',
      subChapterNumber: '20.11',
      command: 'cat /etc/logrotate.conf | head -n 10',
      title: 'Log Rotation Concepts and logrotate',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'Disk capacity defense: rotating, compressing (gzip), age retention, and postrotate signals',
      badges: ['logrotate', 'Rotation', 'Storage'],
      difficulty: 'Intermediate',
      quote: 'Without logrotate, every Linux server is a ticking disk-full time bomb: logrotate prunes the past to protect the present.',
      whatIsIt: '"logrotate" is the system maintenance utility designed to prevent log files from consuming all available disk space. Running as a daily cron job or systemd timer (logrotate.service / logrotate.timer), logrotate inspects configured log files. When criteria are met (daily, weekly, or file size > 100M), logrotate: 1) Rotates the file (e.g. app.log becomes app.log.1); 2) Compresses older archives using gzip (app.log.2.gz); 3) Deletes archives older than the retention limit (e.g. rotate 14); and 4) Signals the active daemon to reopen its log handle (postrotate).',
      inSimpleWords: 'The trash collector for log files. Every night, it compresses yesterday\'s logs into small zip files and deletes logs older than two weeks so your hard drive never runs out of room.',
      whyDoYouNeedIt: 'A busy web server generates 5 to 20 Gigabytes of access logs every week. Without logrotate, the root partition will hit 100% capacity within a month, crashing the entire operating system.',
      realWorldScenario: 'An e-commerce server runs smoothly for 6 months, then abruptly crashes on a Saturday night because a custom microservice was logging to /var/log/app.log without a logrotate rule, filling the 50GB disk.',
      realWorldAnalogy: 'Archiving last month\'s paper bank statements into storage boxes in the attic, and shredding statements older than 7 years.',
      withoutVsWith: {
        without: {
          title: 'Unrotated Log Files',
          items: ['Log files grow infinitely into 50GB monsters that crash text editors when opened', 'Root disk partition fills to 100%, causing emergency production outages', 'Manual panic deletions by admins accidentally breaking running services'],
          outcome: 'Disk-full outages and stressful emergency disk cleanup incidents.'
        },
        with: {
          title: 'Automated Lifecycle Management with logrotate',
          items: ['Predictable disk utilization with automated size and time thresholds', 'Dramatically reduced disk footprint through background gzip compression (compress)', 'Reliable daemon log reopening via postrotate signals preventing orphaned file handles'],
          outcome: 'Stable disk headroom, automated archiving, and zero disk-full outages.'
        }
      },
      blockDiagram: {
        title: 'logrotate Rotation Lifecycle',
        subtitle: 'How logrotate cycles files over time (rotate 4):',
        nodes: [
          { id: 'live', label: '1. app.log (Active)', simpleDef: 'Current active log', techDef: 'Live file being written to by running daemon', badge: 'Active', color: '#10b981' },
          { id: 'r1', label: '2. app.log.1 (Uncompressed)', simpleDef: 'Yesterday\'s log', techDef: 'Renamed; daemon signaled via postrotate (HUP)', badge: 'Rotated', color: '#38bdf8' },
          { id: 'r2', label: '3. app.log.2.gz (Compressed)', simpleDef: 'Compressed archives', techDef: 'Gzipped in background (delaycompress)', badge: 'Gzip Archive', color: '#a855f7' },
          { id: 'del', label: '4. app.log.5.gz (Purged)', simpleDef: 'Exceeds retention limit', techDef: 'Deleted permanently from disk to reclaim space', badge: 'Purged', color: '#ef4444' }
        ]
      },
      terms: [
        { term: 'logrotate', simple: 'A tool that automatically rotates, compresses, and deletes old log files.', technical: 'System utility designed to administer systems that generate large numbers of log files.' },
        { term: 'postrotate', simple: 'A script block that tells the daemon: "I just renamed your log file, please open a fresh new file now."', technical: 'Directive defining shell commands executed after log files are rotated (typically sending SIGHUP).' }
      ],
      syntaxCode: 'cat /etc/logrotate.conf | head -n 10',
      syntaxTokens: [
        { token: 'cat', role: 'command', explanation: 'Display file contents' },
        { token: '/etc/logrotate.conf', role: 'path', explanation: 'Global logrotate configuration file' },
        { token: '| head -n 10', role: 'argument', explanation: 'Display first 10 configuration lines' }
      ],
      variations: [
        { command: 'cat /etc/logrotate.conf', description: 'Inspect global default log rotation parameters' },
        { command: 'sudo logrotate -d /etc/logrotate.conf', description: 'Debug mode (-d): simulate rotation and print verbose decisions without touching files' },
        { command: 'sudo logrotate -f /etc/logrotate.conf', description: 'Force mode (-f): force immediate rotation of all logs right now' }
      ],
      expectedOutput: '# see "man logrotate" for details\n\n# global options do not affect preceding include directives\n\n# rotate log files weekly\nweekly\n\n# use the adm group by default, since this is the owning group\n# of /var/log/syslog.\nsu root adm\n\n# keep 4 weeks worth of backlogs\nrotate 4',
      commonMistakes: [
        { mistake: 'Forgetting "postrotate" when rotating daemons that keep files open (like Nginx)', whyWrong: 'Nginx holds the file descriptor open; after renaming, Nginx continues writing into "app.log.1" instead of the new file!', correctWay: 'Always add a postrotate block sending a reload/reopen signal to the daemon.' },
        { mistake: 'Testing logrotate in production with "-f" (force) instead of "-d" (debug)', whyWrong: '"-f" immediately rotates all files on the system; "-d" safely simulates the run and prints diagnostic output.', correctWay: 'ALWAYS test with "sudo logrotate -d <config>" first.' }
      ],
      safeRecovery: 'Always test custom logrotate configurations safely using debug mode: "sudo logrotate -d /etc/logrotate.d/my_app".'
    }),

    buildLinuxConcept({
      id: 'c-20-12',
      subChapterNumber: '20.12',
      command: 'ls -la /etc/logrotate.d/ | head -n 10',
      title: 'Configuring Custom Log Rotation (/etc/logrotate.d/)',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'Writing production rotation recipes: size thresholds, copytruncate, and daily rotations',
      badges: ['logrotate.d', 'Custom Rules', 'Production'],
      difficulty: 'Intermediate',
      quote: 'Every new production service needs a logrotate recipe: define size limits, compression, and copytruncate.',
      whatIsIt: 'In Linux, package managers and administrators place modular, per-application rotation configurations into "/etc/logrotate.d/". A standard logrotate stanza targets one or more log paths (e.g. /var/log/myapp/*.log) and specifies: rotation frequency (daily/weekly), retention count (rotate 7), compression (compress, delaycompress), missing file handling (missingok), empty file handling (notifempty), and "copytruncate" (truncates the original log in-place, essential for applications that cannot reopen logs on SIGHUP).',
      inSimpleWords: 'Creating a custom cleanup rule for your application. You create a short text file in /etc/logrotate.d/ saying: "Keep 7 days of logs for my app, compress them with gzip, and delete anything older."',
      whyDoYouNeedIt: 'When deploying internal proprietary apps (Node.js, Go, Python, Java) that write logs to /var/log, you must create an /etc/logrotate.d/ rule to manage their disk footprint.',
      realWorldScenario: 'You deploy a custom Node.js backend writing to /var/log/node-app/access.log. Because Node cannot easily handle SIGHUP log reopening, you configure "copytruncate" in /etc/logrotate.d/node-app, ensuring smooth rotation without restarts.',
      realWorldAnalogy: 'Setting up an automatic recurring trash pickup schedule specifically for your office building.',
      withoutVsWith: {
        without: {
          title: 'Unmanaged Custom Application Logs',
          items: ['Custom application logs grow unchecked until the server crashes from a full disk', 'Developers manually running "rm" and accidentally breaking active logging', 'Inconsistent rotation policies across different internal microservices'],
          outcome: 'Disk full crashes and lost historical application logs.'
        },
        with: {
          title: 'Configured /etc/logrotate.d/ Recipes',
          items: ['Automatic daily or size-based rotation (maxsize 100M) capping disk usage', 'Safe "copytruncate" handling for applications that don\'t support log reopening', 'Uniform 14-day or 30-day compliance retention across all services'],
          outcome: 'Bulletproof disk protection and automated log archiving.'
        }
      },
      blockDiagram: {
        title: 'Production logrotate Stanza Anatomy',
        subtitle: 'Key directives in a custom /etc/logrotate.d/ rule:',
        nodes: [
          { id: 'path', label: '/var/log/myapp/*.log', simpleDef: 'Target files', techDef: 'Path pattern targeting log files to rotate', badge: 'Target', color: '#38bdf8' },
          { id: 'sched', label: 'daily & rotate 14', simpleDef: 'Frequency & Retention', techDef: 'Rotates once daily; keeps maximum 14 rotated archives', badge: 'Schedule', color: '#10b981' },
          { id: 'comp', label: 'compress & delaycompress', simpleDef: 'gzip compression', techDef: 'Compresses archives with gzip; delays compression of .1 until next cycle', badge: 'Compression', color: '#a855f7' },
          { id: 'trunc', label: 'copytruncate', simpleDef: 'In-place truncation', techDef: 'Copies file and truncates original in-place for daemons lacking SIGHUP', badge: 'Truncation', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'copytruncate', simple: 'A trick that copies the log file and empties the original so programs can keep writing without restarting.', technical: 'Truncates the original log file in place after creating a copy, instead of moving the old file.' },
        { term: 'delaycompress', simple: 'Waits until the next rotation cycle before compressing a file, avoiding file-in-use errors.', technical: 'Postpones compression of previous log file to the next rotation cycle.' }
      ],
      syntaxCode: 'ls -la /etc/logrotate.d/ | head -n 10',
      syntaxTokens: [
        { token: 'ls -la', role: 'command', explanation: 'List directory contents with attributes' },
        { token: '/etc/logrotate.d/', role: 'path', explanation: 'Directory containing modular log rotation configurations' },
        { token: '| head -n 10', role: 'argument', explanation: 'Limit output display to first 10 items' }
      ],
      variations: [
        { command: 'cat /etc/logrotate.d/nginx 2>/dev/null || cat /etc/logrotate.d/rsyslog', description: 'Inspect an existing production logrotate configuration recipe' },
        { command: 'sudo logrotate -d /etc/logrotate.d/nginx', description: 'Simulate rotation of a specific service rule in debug mode' }
      ],
      expectedOutput: 'total 56\ndrwxr-xr-x   2 root root 4096 Sep 30 00:00 .\ndrwxr-xr-x 130 root root 4096 Sep 30 00:00 ..\n-rw-r--r--   1 root root  120 Sep 30 00:00 alternatives\n-rw-r--r--   1 root root  173 Sep 30 00:00 apt\n-rw-r--r--   1 root root  384 Sep 30 00:00 dpkg\n-rw-r--r--   1 root root  356 Sep 30 00:00 nginx\n-rw-r--r--   1 root root  501 Sep 30 00:00 rsyslog',
      commonMistakes: [
        { mistake: 'Using "copytruncate" on massive multi-gigabyte log files', whyWrong: 'Between the time the file is copied and the time it is truncated, new incoming logs written during that second can be lost.', correctWay: 'Rotate by size (maxsize 100M) so files remain small, or configure native daemon log reopening.' },
        { mistake: 'Leaving wrong file permissions on files inside /etc/logrotate.d/', whyWrong: 'logrotate will refuse to execute rules that are world-writable or not owned by root.', correctWay: 'Ensure config files are owned by root with 644 permissions: "sudo chmod 644 /etc/logrotate.d/*".' }
      ],
      safeRecovery: 'Test your custom configuration file syntax safely anytime with: "sudo logrotate -d /etc/logrotate.d/<your_config>".'
    }),

    buildLinuxConcept({
      id: 'c-20-13',
      subChapterNumber: '20.13',
      command: 'which auditd ausearch aureport 2>/dev/null || echo "Audit framework"',
      title: 'Linux Audit Subsystem (auditd, ausearch, aureport)',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'Kernel-level security monitoring: auditing file modifications, syscall tracking, and compliance trails',
      badges: ['auditd', 'Security', 'Compliance', 'Kernel'],
      difficulty: 'Intermediate',
      quote: 'syslog tells you what applications decided to log; auditd monitors the kernel directly: who touched what file and when.',
      whatIsIt: 'The Linux Audit Framework (auditd) is a high-security kernel subsystem that tracks security-relevant events directly at the system call layer. Unlike syslog (which depends on applications voluntarily writing log messages), auditd intercepts kernel syscalls (open, unlink, execve, chmod) to record: 1) Exactly which user UID and terminal executed a command; 2) What files were read, modified, or deleted; and 3) Network socket connections. Events are logged to /var/log/audit/audit.log and queried using "ausearch" and "aureport".',
      inSimpleWords: 'A security camera wired directly into the operating system\'s brain. Even if a user turns off regular logging, auditd catches every file they touch and every command they run.',
      whyDoYouNeedIt: 'Regulatory compliance standards (SOC2, PCI-DSS, HIPAA, FedRAMP) mandate immutable audit trails tracking who touched sensitive files like /etc/shadow or SSL private keys.',
      realWorldScenario: 'An unauthorized modification was made to /etc/sudoers. Running "ausearch -f /etc/sudoers -i" outputs the exact timestamp, process name, and user ID that modified the file.',
      realWorldAnalogy: 'A security guard with a logbook who writes down the name and ID of every person who opens the company safe.',
      withoutVsWith: {
        without: {
          title: 'Application-Only Logging',
          items: ['Users can modify /etc/shadow or wipe files without leaving any trace in syslog', 'No proof of which physical human account performed a destructive action', 'Instant failure of PCI-DSS and SOC2 security compliance audits'],
          outcome: 'Zero security accountability and failed compliance audits.'
        },
        with: {
          title: 'Kernel Auditing with auditd',
          items: ['Tamper-evident kernel syscall monitoring (file access, permission changes, executions)', 'Unambiguous user identification tracking the original login UID (auid) across sudo sessions', 'Pre-built compliance reports using aureport (failed logins, modified files, syscalls)'],
          outcome: 'Indisputable security accountability and complete audit compliance.'
        }
      },
      blockDiagram: {
        title: 'Linux Kernel Audit Pipeline',
        subtitle: 'From kernel syscall interception to audit logs:',
        nodes: [
          { id: 'user', label: 'User Action (open /etc/shadow)', simpleDef: 'User touches file', techDef: 'Process invokes openat() system call in Ring 3', badge: 'Action', color: '#38bdf8' },
          { id: 'kernel', label: 'Kernel Audit Filter Engine', simpleDef: 'Intercepts syscall', techDef: 'Kernel audit hook matches rule (auditctl -w /etc/shadow)', badge: 'Kernel Hook', color: '#10b981' },
          { id: 'auditd', label: 'auditd Daemon', simpleDef: 'Writes audit log', techDef: 'Netlink socket receives event and appends to /var/log/audit/audit.log', badge: 'Audit Daemon', color: '#a855f7' },
          { id: 'query', label: 'ausearch / aureport', simpleDef: 'Audit investigation tools', techDef: 'CLI tools parsing raw audit records into human reports', badge: 'Report', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'auditd', simple: 'The background daemon responsible for writing kernel audit records to disk.', technical: 'Userspace component of the Linux Auditing System.' },
        { term: 'auid (Audit UID)', simple: 'The original user ID who logged in, even if they later switched to root with sudo.', technical: 'Login UID immutable identifier set by pam_loginuid preserving user attribution.' }
      ],
      syntaxCode: 'which auditd ausearch aureport 2>/dev/null || echo "Audit framework"',
      syntaxTokens: [
        { token: 'which', role: 'command', explanation: 'Locate binary executable paths' },
        { token: 'auditd ausearch aureport', role: 'argument', explanation: 'Core utilities comprising the Linux Audit Subsystem' },
        { token: '|| echo "Audit framework"', role: 'operator', explanation: 'Fallback message' }
      ],
      variations: [
        { command: 'sudo auditctl -l', description: 'List all active kernel audit rules currently monitoring files and syscalls' },
        { command: 'sudo auditctl -w /etc/passwd -p wa -k passwd_changes', description: 'Monitor /etc/passwd for writes (w) and attribute changes (a) with tag "passwd_changes"' },
        { command: 'sudo aureport --summary', description: 'Generate high-level summary report of all security audit events' }
      ],
      expectedOutput: 'Audit framework',
      commonMistakes: [
        { mistake: 'Adding too many broad audit rules (e.g. auditing every read syscall on /var)', whyWrong: 'Auditing high-frequency syscalls creates massive log floods that can overwhelm disk I/O and degrade system performance.', correctWay: 'Target specific sensitive files (/etc/passwd, /etc/sudoers, /etc/ssh) and key system calls.' },
        { mistake: 'Using "auditctl" to add rules and expecting them to persist across reboots', whyWrong: 'Rules added with auditctl exist in kernel RAM only; upon reboot they are lost.', correctWay: 'Write persistent rules into /etc/audit/rules.d/audit.rules.' }
      ],
      safeRecovery: 'To search audit logs for recent file modifications, run: "sudo ausearch -f /path/to/file -i".'
    }),

    buildLinuxConcept({
      id: 'c-20-14',
      subChapterNumber: '20.14',
      command: 'echo "Centralized logging telemetry"',
      title: 'Centralized Logging Concepts (ELK, Loki, Fluentd, Syslog Forwarding)',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'System Logging & Auditing',
      subtitle: 'Fleet-wide observability: shippers (Fluentd, Promtail, Vector), aggregators (Loki, Elasticsearch), and Grafana dashboards',
      badges: ['ELK', 'Loki', 'Fluentd', 'Centralized'],
      difficulty: 'Intermediate',
      quote: 'In production you never SSH into 500 servers to read logs: logs flow continuously to a centralized telemetry lake.',
      whatIsIt: 'In enterprise cloud and microservice architectures, managing logs locally on individual servers is unviable. Centralized Logging streams logs from hundreds of servers and Kubernetes containers into a central, searchable data lake. Modern architectures consist of three tiers: 1) Shippers / Collectors (Vector, Promtail, Fluent Bit, Filebeat) tail local logs and forward them; 2) Storage & Indexing Engines: Elasticsearch/OpenSearch (full-text inverted index) or Grafana Loki (metadata-indexed, highly cost-effective); and 3) Visualization: Grafana or Kibana dashboards for fleet-wide search and anomaly alerting.',
      inSimpleWords: 'Putting all server logs in one central control room. Instead of logging into 50 different servers to find an error, you open one webpage dashboard (like Grafana) and search across all servers at the same time.',
      whyDoYouNeedIt: 'In auto-scaling cloud environments (like AWS EC2 Auto Scaling or Kubernetes), servers are ephemeral: instances are terminated and destroyed automatically. If logs are not shipped off-instance in real time, all diagnostic data is permanently lost.',
      realWorldScenario: 'A customer reports a payment error on your website. Your cluster has 40 web servers. Using a Grafana Loki dashboard, you search "transaction_id=987123" across all 40 servers simultaneously and locate the exact failed request in 0.2 seconds.',
      realWorldAnalogy: 'A centralized hospital monitoring room where a single nurse sits in front of a bank of screens monitoring heart rates from 50 patient rooms at the same time.',
      withoutVsWith: {
        without: {
          title: 'Siloed Local Server Logging',
          items: ['Must SSH into 20 different servers one-by-one to grep for a customer\'s error', 'Logs destroyed permanently when cloud instances scale down or auto-terminate', 'No fleet-wide alerting or real-time anomaly detection'],
          outcome: 'Blind cloud operations and lost forensic data.'
        },
        with: {
          title: 'Centralized Fleet-Wide Telemetry',
          items: ['Single web dashboard querying millions of log lines across all servers in seconds', 'Logs preserved permanently in long-term object storage (S3/GCS) regardless of VM lifecycle', 'Automated anomaly detection triggering Slack/PagerDuty alerts on error spikes'],
          outcome: 'Instant fleet-wide visibility, fast MTTR, and permanent audit compliance.'
        }
      },
      blockDiagram: {
        title: 'Centralized Logging Architecture',
        subtitle: 'The 3-tier shipping, indexing, and visualization pipeline:',
        nodes: [
          { id: 'nodes', label: 'Fleet Nodes (Web, DB, K8s)', simpleDef: 'Server instances', techDef: 'systemd-journald and container stdout streams', badge: 'Tier 1: Nodes', color: '#38bdf8' },
          { id: 'shipper', label: 'Log Shippers (Vector / Fluent Bit)', simpleDef: 'Local collectors', techDef: 'Tails journals, attaches metadata labels, streams over TLS', badge: 'Tier 2: Shippers', color: '#10b981' },
          { id: 'storage', label: 'Data Lake (Grafana Loki / OpenSearch)', simpleDef: 'Centralized storage', techDef: 'Indexes labels and chunks logs into object storage (S3)', badge: 'Tier 3: Storage', color: '#a855f7' },
          { id: 'dash', label: 'Grafana / Kibana UI', simpleDef: 'Central dashboard', techDef: 'Web UI for fleet-wide logQL querying, metric alerts, and triage', badge: 'Dashboard', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Log Shipper', simple: 'A small, fast agent (like Fluent Bit or Promtail) that sends logs from a server to the central cluster.', technical: 'Lightweight agent tailing log sources and forwarding structured streams over HTTP/gRPC.' },
        { term: 'Loki / OpenSearch', simple: 'The central database that stores and indexes logs from thousands of servers.', technical: 'Horizontally scalable log aggregation databases optimized for high-volume ingestion.' }
      ],
      syntaxCode: 'echo "Centralized logging telemetry"',
      syntaxTokens: [
        { token: 'echo', role: 'command', explanation: 'Print text to terminal' },
        { token: '"Centralized logging telemetry"', role: 'argument', explanation: 'Display demonstration summary string' }
      ],
      variations: [
        { command: 'systemctl status vector 2>/dev/null || echo "Vector log shipper"', description: 'Check status of high-performance Vector log shipper' },
        { command: 'systemctl status promtail 2>/dev/null || echo "Promtail Loki shipper"', description: 'Check status of Promtail agent forwarding logs to Grafana Loki' }
      ],
      expectedOutput: 'Centralized logging telemetry',
      commonMistakes: [
        { mistake: 'Shipping unparsed, raw multiline logs without structured labels', whyWrong: 'Centralized databases become expensive and slow to search if logs lack consistent metadata labels.', correctWay: 'Attach structured labels (environment=prod, service=payment, region=us-east) at the shipper stage.' },
        { mistake: 'Forwarding logs over public networks unencrypted without TLS', whyWrong: 'Plaintext syslog broadcasts user emails, IP addresses, and error details across the public internet.', correctWay: 'Always enforce TLS encryption when streaming logs across public networks.' }
      ],
      safeRecovery: 'Ensure your log shipping agent includes disk-backed queuing (e.g. Vector on-disk buffer) so logs are not lost if the central server is temporarily offline.'
    })
  ]
};
