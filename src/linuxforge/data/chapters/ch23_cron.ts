import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 23: CRON & SCHEDULING (23.1 to 23.10)
// Deep Senior Engineer Curriculum Implementation
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
      badges: ['Automation', 'Scheduling', 'Reliability', 'Core'],
      difficulty: 'Beginner',
      quote: 'If a human has to remember to run a routine task every night at 3:00 AM, that task is guaranteed to fail.',
      whatIsIt: 'Task scheduling is fundamental to automated systems administration. Production workloads require recurring jobs executed at precise times: nightly database backups, log rotation, SSL/TLS certificate renewals (Certbot/Let\'s Encrypt), cache invalidation, security vulnerability updates, and database index maintenance. Linux provides background daemons (cron, anacron, systemd-timers) that wake up periodically, evaluate configured schedules against real-time clocks, spawn isolated execution environments, and record output.',
      inSimpleWords: 'Putting repetitive tasks on autopilot. You tell the computer: "Run the backup script every night at 2 AM", and the computer executes it automatically without needing human intervention.',
      whyDoYouNeedIt: 'Without automated scheduling, systems degrade quickly: logs consume 100% of hard drive space, database backups are missed, and SSL certificates expire, causing public website downtime.',
      realWorldScenario: 'An e-commerce business relies on daily automated database backups. At 02:00 every morning, when user traffic is minimal, a scheduled cron job dumps PostgreSQL tables, compresses them with zstd, and uploads the snapshot to an Amazon S3 bucket, ensuring disaster recovery readiness without requiring an engineer to be awake.',
      realWorldAnalogy: 'An alarm clock or automated sprinkler system: it waters the garden every morning at dawn without you having to wake up and turn the hose on.',
      withoutVsWith: {
        without: {
          title: 'Manual Task Execution and Human Forgetfulness',
          items: ['Engineers forgetting to take backups before major upgrades', 'SSL certificates silently expiring and causing public website browser warnings', 'Hard drives filling to 100% capacity because old logs were not rotated'],
          outcome: 'Production downtime caused by mundane, preventable human oversight.'
        },
        with: {
          title: 'Automated, Deterministic Task Scheduling',
          items: ['Scheduled jobs executing reliably 365 days a year with zero human effort', 'Off-peak execution minimizing performance impact on end users', 'Automatic error alerting when scheduled tasks fail'],
          outcome: 'High system reliability and peace of mind for engineering teams.'
        }
      },
      blockDiagram: {
        title: 'Task Scheduling Architecture',
        subtitle: 'How Linux coordinates scheduled execution:',
        nodes: [
          { id: 'schedule', label: '1. Schedule Table (crontab)', simpleDef: 'Configuration', techDef: 'Time specification (e.g. 0 2 * * *) and executable command line', badge: 'Config Table', color: '#10b981' },
          { id: 'daemon', label: '2. Scheduling Daemon (cron / systemd)', simpleDef: 'Background Timer', techDef: 'Wakes up every 60s, compares system clock to schedule entries', badge: 'Daemon', color: '#38bdf8' },
          { id: 'spawn', label: '3. Isolated Subshell & Logging', simpleDef: 'Executes Task', techDef: 'fork() and execve() run script; stdout/stderr captured to syslog or journal', badge: 'Job Execution', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Cron Daemon', simple: 'A background program that runs non-stop on Linux, checking every minute if it is time to run a scheduled job.', technical: 'Background process (crond or cron) sleeping in 60-second intervals and parsing spool tables.' },
        { term: 'Off-Peak Hours', simple: 'Times of day (like 2:00 AM to 5:00 AM) when website traffic is lowest, making it safe to run heavy backups.', technical: 'Window of minimal system load ideal for resource-heavy batch processing.' }
      ],
      syntaxCode: 'systemctl status cron',
      syntaxTokens: [
        { token: 'systemctl', role: 'command', explanation: 'Systemd service manager utility' },
        { token: 'status', role: 'argument', explanation: 'Query runtime operational status' },
        { token: 'cron', role: 'argument', explanation: 'The cron scheduling daemon service unit (crond on RHEL)' }
      ],
      variations: [
        { command: 'systemctl status crond', description: 'Check cron service status on Red Hat, CentOS, and Fedora systems' },
        { command: 'journalctl -u cron -n 20', description: 'View the last 20 log entries generated by the cron daemon' }
      ],
      expectedOutput: '● cron.service - Regular background program processing daemon\n     Loaded: loaded (/lib/systemd/system/cron.service; enabled; vendor preset: enabled)\n     Active: active (running) since Wed 2026-09-30 00:00:01 UTC; 2h ago\n   Main PID: 812 (cron)\n      Tasks: 1 (limit: 4614)\n     Memory: 2.4M\n        CPU: 120ms\n     CGroup: /system.slice/cron.service\n             └─812 /usr/sbin/cron -f',
      commonMistakes: [
        { mistake: 'Scheduling heavy database backups at 12:00 PM noon during peak customer traffic', whyWrong: 'Disk I/O and CPU spikes will saturate the server and cause user timeouts.', correctWay: 'Schedule heavy batch jobs during off-peak hours (e.g. 02:00 AM).' },
        { mistake: 'Assuming scheduled jobs run if the server was powered off during the scheduled time', whyWrong: 'Standard cron simply skips the missed job entirely if the machine was off!', correctWay: 'Use "anacron" or systemd Persistent=true timers for machines that are powered off periodically.' }
      ],
      safeRecovery: 'If cron stops running, restart it with "sudo systemctl restart cron" (or crond on RHEL).'
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
      badges: ['cron', 'Daemon', 'Background', 'Core'],
      difficulty: 'Beginner',
      quote: 'Cron is the silent clockwork of Linux: every 60 seconds it reads the spools, launches pending jobs, and goes back to sleep.',
      whatIsIt: '`cron` (derived from the Greek "Chronos" meaning time) is the standard Linux daemon that executes scheduled commands. Started during system boot, the daemon sleeps in an infinite loop using the `sleep(60)` system call. Exactly at the 00-second mark of every minute, the cron daemon wakes up, checks the modification timestamps of `/etc/crontab`, `/etc/cron.d/`, and `/var/spool/cron/crontabs/`, parses any modified tables, and spawns child processes for any jobs matching the current minute, hour, day, month, and day-of-week.',
      inSimpleWords: 'The clock worker daemon. It sleeps for 59 seconds, wakes up on the minute mark, checks if any job is scheduled for right now, runs it, and goes right back to sleep.',
      whyDoYouNeedIt: 'Understanding how cron evaluates jobs once per minute explains why sub-minute scheduling (like running every 5 seconds) is not supported by standard cron without loops.',
      realWorldScenario: 'An administrator notices automated reports stopped arriving. Running "ps aux | grep cron" reveals the cron daemon process was killed during an out-of-memory event earlier that morning. Restarting the systemd service restores automated job processing.',
      realWorldAnalogy: 'A night watchman who checks their pocket watch every 60 seconds to see if it is time to ring the bell.',
      withoutVsWith: {
        without: {
          title: 'Unmonitored Daemon State',
          items: ['Cron daemon silently dead after a crash with zero tasks executing', 'Assuming jobs are running when the daemon is actually disabled', 'Manual execution required for every routine script'],
          outcome: 'Silent failure of all scheduled background operations.'
        },
        with: {
          title: 'Verified Cron Daemon Execution',
          items: ['Continuous background execution enabled via systemd unit', 'Deterministic 60-second evaluation loop', 'Centralized execution tracking in syslog and journalctl'],
          outcome: 'Reliable, non-stop automated background processing.'
        }
      },
      blockDiagram: {
        title: 'Cron Daemon 60-Second Loop',
        subtitle: 'The internal execution cycle of the cron daemon:',
        nodes: [
          { id: 'sleep', label: '1. sleep(60)', simpleDef: 'Deep Sleep', techDef: 'Daemon sleeps in kernel wait queue until top of minute :00', badge: 'Sleeping', color: '#10b981' },
          { id: 'wake', label: '2. Check Tables & Clock', simpleDef: 'Table Inspection', techDef: 'Stat() checks /var/spool/cron/ and /etc/crontab for updates; matches against date/time', badge: 'Inspection', color: '#38bdf8' },
          { id: 'fork', label: '3. fork() & execve()', simpleDef: 'Launch Task', techDef: 'Spawns child shell: /bin/sh -c "your_command" under target user UID/GID', badge: 'Fork Task', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Spool Directory', simple: 'The system folder where user crontab files are stored (/var/spool/cron/crontabs/).', technical: 'Privileged directory containing individual per-user schedule definition files.' },
        { term: 'stat() Check', simple: 'A fast check to see if a file has changed without having to re-read the whole file.', technical: 'Syscall querying file inode modification time (mtime) to detect crontab edits.' }
      ],
      syntaxCode: 'ps aux | grep cron',
      syntaxTokens: [
        { token: 'ps aux', role: 'command', explanation: 'List all running processes across all users with full command line arguments' },
        { token: '| grep cron', role: 'operator', explanation: 'Filter process list for the cron or crond daemon process' }
      ],
      variations: [
        { command: 'pgrep -l cron', description: 'Look up process ID and name of the running cron daemon' },
        { command: 'sudo systemctl enable --now cron', description: 'Enable and start cron service immediately on Ubuntu/Debian' }
      ],
      expectedOutput: 'root         812  0.0  0.0  14520  2450 ?        Ss   00:00   0:00 /usr/sbin/cron -f\nubuntu      4210  0.0  0.0   6420   890 pts/0    S+   01:10   0:00 grep --color=auto cron',
      commonMistakes: [
        { mistake: 'Trying to schedule jobs to run every 10 seconds in crontab', whyWrong: 'Cron\'s smallest granularity is exactly 1 minute. Five asterisks (* * * * *) means every 60 seconds.', correctWay: 'Use a sleep loop in a bash script, or use a systemd timer with AccuracySec=1s.' },
        { mistake: 'Searching for "cron" on RHEL/CentOS systems', whyWrong: 'On Red Hat, Fedora, and CentOS, the service binary and daemon are named "crond" (with a d).', correctWay: 'Search for "crond" on RHEL-based operating systems.' }
      ],
      safeRecovery: 'If cron daemon is missing from ps aux, start it via "sudo systemctl start cron" (or crond).'
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
      badges: ['crontab', 'CLI', 'Scheduling', 'Core'],
      difficulty: 'Beginner',
      quote: 'crontab -l lets you inspect your scheduled jobs; never edit the spool file directly.',
      whatIsIt: '`crontab` (Cron Table) refers both to the table of scheduled commands and to the command-line utility used to manage them. Each user on a Linux system (including root) can have their own personal crontab file stored in `/var/spool/cron/crontabs/[username]` (or `/var/spool/cron/[username]` on RHEL). When a user\'s job runs, it executes under that user\'s UID and permissions. The command `crontab -l` lists the active crontab contents, while `crontab -r` removes it.',
      inSimpleWords: 'Viewing your scheduled tasks list. Running "crontab -l" prints out every job you have set up to run automatically.',
      whyDoYouNeedIt: 'Before making changes or debugging why an automated script fired, you run "crontab -l" to see the active schedule list for your user account.',
      realWorldScenario: 'A developer logs into an application server to verify that the nightly log archiving script is configured. Running "crontab -l" displays the active schedule: "0 1 * * * /opt/scripts/archive_logs.sh", confirming the job is active and scheduled for 01:00 AM daily.',
      realWorldAnalogy: 'Looking at your personal calendar or reminder list on your phone to see what alarms are set.',
      withoutVsWith: {
        without: {
          title: 'Manual Spool Directory Hunting',
          items: ['Attempting to "cat" protected files in /var/spool/cron/ requiring root', 'Risk of accidentally modifying spool files with wrong permissions', 'Uncertainty over which user owns which scheduled tasks'],
          outcome: 'Permission errors and broken cron spool permissions.'
        },
        with: {
          title: 'Standardized Crontab Management',
          items: ['Safe per-user inspection without requiring superuser root access', 'Listing other users\' crontabs securely via "sudo crontab -u username -l"', 'Clean separation of user tasks from system-wide daemons'],
          outcome: 'Simple, secure inspection of all scheduled automated tasks.'
        }
      },
      blockDiagram: {
        title: 'User vs System Crontabs',
        subtitle: 'Where different schedule files live in the filesystem:',
        nodes: [
          { id: 'user_cron', label: 'User Crontabs (/var/spool/cron/)', simpleDef: 'crontab -e / -l', techDef: 'Per-user tables executed with the specific user\'s UID and permissions', badge: 'User Space', color: '#10b981' },
          { id: 'sys_cron', label: 'System Table (/etc/crontab)', simpleDef: 'Global Table', techDef: 'Centralized system table with an extra "user" field specifying execution identity', badge: 'System Table', color: '#38bdf8' },
          { id: 'cron_d', label: 'Modular Drop-Ins (/etc/cron.d/)', simpleDef: 'Package Schedules', techDef: 'Package-managed crontabs (e.g. /etc/cron.d/certbot, sysstat)', badge: 'Drop-In Dir', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'crontab -l', simple: 'Command that lists all scheduled tasks for your current user.', technical: 'Reads and outputs the spool file corresponding to caller\'s getuid().' },
        { term: 'crontab -u', simple: 'Allows an administrator to inspect or edit another user\'s crontab.', technical: 'Option modifying target spool file to the specified username.' }
      ],
      syntaxCode: 'crontab -l',
      syntaxTokens: [
        { token: 'crontab', role: 'command', explanation: 'Maintain crontab files for individual users' },
        { token: '-l', role: 'flag', explanation: 'List the current crontab to standard output' }
      ],
      variations: [
        { command: 'sudo crontab -u www-data -l', description: 'List the crontab for a specific service user (www-data)' },
        { command: 'crontab -r', description: 'Remove/delete the current user\'s entire crontab (USE WITH CAUTION!)' }
      ],
      expectedOutput: '# Edit this file to introduce tasks to be run by cron.\n# m h  dom mon dow   command\n0 2 * * * /usr/local/bin/backup_database.sh >> /var/log/backup.log 2>&1\n30 4 * * 0 /usr/bin/certbot renew --quiet',
      commonMistakes: [
        { mistake: 'Typing "crontab -r" instead of "crontab -e"', whyWrong: 'The "r" key is right next to "e" on QWERTY keyboards! "crontab -r" instantly DELETES your entire crontab without confirmation!', correctWay: 'Keep a backup copy of your crontab in a Git repo or file (crontab -l > my_crontab.txt).' },
        { mistake: 'Thinking "sudo crontab -l" shows your normal user\'s jobs', whyWrong: '"sudo crontab -l" displays ROOT\'s crontab, not your personal user\'s crontab.', correctWay: 'Run "crontab -l" without sudo to inspect your own user\'s schedule.' }
      ],
      safeRecovery: 'Always back up your crontab before editing: run "crontab -l > ~/crontab.bak".'
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
      badges: ['Syntax', 'Cron', '5-Fields', 'Core'],
      difficulty: 'Beginner',
      quote: 'Minute, Hour, Day-of-month, Month, Day-of-week: master these 5 fields and you can schedule any event in time.',
      whatIsIt: 'Standard cron syntax consists of exactly 5 time-and-date fields separated by spaces, followed by the command to execute: `[Minute] [Hour] [Day of Month] [Month] [Day of Week] [Command]`. Wildcards and operators expand scheduling power: `*` means every value; `,` separates discrete values (e.g. 1,15); `-` specifies a range (e.g. 1-5 for Mon-Fri); and `/` specifies step increments (e.g. `*/15` means every 15 minutes, `0 */2 * * *` means every 2 hours). Special shortcuts like `@reboot`, `@daily`, and `@hourly` provide human-friendly alternatives.',
      inSimpleWords: 'The 5-number time code. Field 1 is minute (0-59), Field 2 is hour (0-23), Field 3 is day of the month (1-31), Field 4 is month (1-12), and Field 5 is day of the week (0-6, where 0 is Sunday).',
      whyDoYouNeedIt: 'Misunderstanding cron syntax causes scripts to execute at unexpected times (e.g. typing "* 3 * * *" causes the command to run EVERY SINGLE MINUTE between 3:00 AM and 3:59 AM, rather than once at 3:00 AM!).',
      realWorldScenario: 'An engineer wants to run a report every Monday at 08:30 AM. They write "30 8 * * 1 /usr/local/bin/report.sh". The cron daemon parses: Minute=30, Hour=8, Any Day of Month, Any Month, Day of Week=1 (Monday), executing the script precisely at 8:30 AM every Monday.',
      realWorldAnalogy: 'Setting a recurring recurring alarm on your smartphone: select 8:30 AM and check only the "Monday" box.',
      withoutVsWith: {
        without: {
          title: 'Syntax Guesswork and Accidental Flooding',
          items: ['Writing "* 2 * * *" and accidentally spawning 60 parallel jobs at 2:00 AM', 'Confusion over Sunday index (0 vs 7)', 'Scripts running at noon instead of midnight due to 24-hour clock confusion'],
          outcome: 'Server crashes caused by unintended job storms.'
        },
        with: {
          title: 'Deterministic 5-Field Scheduling',
          items: ['Precise step scheduling ("*/10" for every 10 minutes)', 'Clean range definitions ("1-5" for weekdays Monday through Friday)', 'Using "@reboot" to launch background daemons upon system boot'],
          outcome: 'Exact, predictable task execution at the intended moment.'
        }
      },
      blockDiagram: {
        title: 'The 5 Cron Time Fields',
        subtitle: 'The 5 position fields from left to right:',
        nodes: [
          { id: 'f1', label: 'Field 1: Minute (0 - 59)', simpleDef: 'Minute of the hour', techDef: 'Exact minute to trigger. * means every minute; 0 means top of the hour', badge: 'Minute', color: '#10b981' },
          { id: 'f2', label: 'Field 2: Hour (0 - 23)', simpleDef: 'Hour of the day', techDef: '24-hour military format (0 = midnight, 13 = 1 PM, 23 = 11 PM)', badge: 'Hour', color: '#38bdf8' },
          { id: 'f3', label: 'Field 3: Day of Month (1 - 31)', simpleDef: 'Calendar Day', techDef: 'Day of the calendar month (1 to 31)', badge: 'Day of Month', color: '#a855f7' },
          { id: 'f4', label: 'Field 4: Month (1 - 12)', simpleDef: 'Calendar Month', techDef: 'Month of the year (1 = Jan, 12 = Dec)', badge: 'Month', color: '#f59e0b' },
          { id: 'f5', label: 'Field 5: Day of Week (0 - 6)', simpleDef: 'Weekday', techDef: 'Day of week: 0 = Sun, 1 = Mon, 5 = Fri, 6 = Sat (7 is also Sunday in GNU cron)', badge: 'Day of Week', color: '#ef4444' }
        ]
      },
      terms: [
        { term: 'Step Value (/)', simple: 'A slash that means "every X intervals" (e.g. */5 in minute field means every 5 minutes).', technical: 'Step operator skipping values across the allowed range.' },
        { term: '@reboot', simple: 'A special cron keyword that runs a command once when the computer starts up.', technical: 'Special time specification running the job once at daemon startup after reboot.' }
      ],
      syntaxCode: 'echo "0 3 * * * /usr/local/bin/backup.sh"',
      syntaxTokens: [
        { token: '0 3', role: 'argument', explanation: 'At minute 0, hour 3 (03:00 AM daily)' },
        { token: '* * *', role: 'argument', explanation: 'Every day of month, every month, every day of week' },
        { token: '/usr/local/bin/backup.sh', role: 'command', explanation: 'Absolute path to target executable script' }
      ],
      variations: [
        { command: 'echo "*/15 * * * * /usr/bin/sync_data.sh"', description: 'Run command every 15 minutes (at minute 0, 15, 30, 45)' },
        { command: 'echo "0 0 1 * * /usr/bin/monthly_cleanup.sh"', description: 'Run command at midnight (00:00) on the 1st day of every month' }
      ],
      expectedOutput: '0 3 * * * /usr/local/bin/backup.sh',
      commonMistakes: [
        { mistake: 'Writing "* 3 * * *" meaning "run once at 3 AM"', whyWrong: 'The asterisk in the minute field means EVERY MINUTE. Your command will run 60 times between 3:00 AM and 3:59 AM!', correctWay: 'Always specify the exact minute: "0 3 * * *" to run once at 3:00 AM.' },
        { mistake: 'Using 12-hour AM/PM format (e.g. typing 3 for 3:00 PM)', whyWrong: 'Cron strictly uses 24-hour military time. "3" is 3:00 AM; "15" is 3:00 PM.', correctWay: 'Use "15" for 3:00 PM: "0 15 * * *".' }
      ],
      safeRecovery: 'Use an online tool like crontab.guru to double-check complex cron expressions before saving.'
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
      badges: ['crontab', 'Editor', 'Management', 'Core'],
      difficulty: 'Beginner',
      quote: 'crontab -e is the only safe way to edit schedules: it locks the table and checks syntax before installing.',
      whatIsIt: '`crontab -e` is the command used to edit the current user\'s crontab. It copies the user\'s spool file to a temporary location, sets up a lock to prevent concurrent edits, opens the temporary file in the user\'s `$VISUAL` or `$EDITOR` text editor (defaulting to nano or vi), and upon exiting, checks the file for syntax errors. If valid, it installs the file into `/var/spool/cron/crontabs/` with the correct ownership (user:crontab) and permissions (0600), signaling the cron daemon to reload schedules immediately.',
      inSimpleWords: 'The safe way to add, edit, or delete scheduled tasks. It opens your editor, lets you make changes, and makes sure you didn\'t make syntax mistakes before saving.',
      whyDoYouNeedIt: 'Directly editing `/var/spool/cron/crontabs/username` with sudo will break permissions and cause the cron daemon to ignore the file entirely. crontab -e handles permissions and daemon signaling automatically.',
      realWorldScenario: 'An administrator adds a new automated database pruning job. They type "crontab -e", paste the 5-field schedule and command, and save in nano. The terminal outputs "crontab: installing new crontab", confirming the syntax is valid and active immediately.',
      realWorldAnalogy: 'Submitting a flight plan: the flight control office verifies the document format before filing it into the active flight registry.',
      withoutVsWith: {
        without: {
          title: 'Direct Spool File Editing with sudo nano',
          items: ['Breaking file permissions (0600) causing cron daemon to ignore schedules', 'No syntax validation allowing corrupt time strings to be saved', 'Daemon unaware of changes until next restart'],
          outcome: 'Silent task failures and corrupted cron spool directories.'
        },
        with: {
          title: 'Protected Editing via crontab -e',
          items: ['Automatic temporary file creation with concurrency locks', 'Syntax checking preventing malformed cron strings from being installed', 'Immediate inotify/signal notification telling cron daemon to reload'],
          outcome: 'Zero permission errors and instant schedule activation.'
        }
      },
      blockDiagram: {
        title: 'crontab -e Validation Workflow',
        subtitle: 'How crontab -e safely installs new schedules:',
        nodes: [
          { id: 'temp', label: '1. Copy to /tmp/crontab.XXXXXX', simpleDef: 'Temp File', techDef: 'Copies active spool file to secure temporary directory', badge: 'Temp Copy', color: '#10b981' },
          { id: 'editor', label: '2. Launch $EDITOR', simpleDef: 'Interactive Edit', techDef: 'User modifies schedules in nano or vim', badge: 'User Space', color: '#38bdf8' },
          { id: 'install', label: '3. Syntax Check & Install', simpleDef: 'Safe Installation', techDef: 'Validates 5 fields; atomically renames to /var/spool/cron/crontabs/[user] with mode 0600', badge: 'Atomic Install', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'EDITOR / VISUAL', simple: 'Environment variables that tell Linux which text editor you want crontab -e to open (e.g. nano or vim).', technical: 'Standard POSIX environment variables specifying preferred interactive text editor.' },
        { term: 'Atomic Rename', simple: 'Replacing the old schedule file with the new one in a single instant so nothing gets corrupted.', technical: 'rename() syscall providing atomic filesystem replacement.' }
      ],
      syntaxCode: 'crontab -e',
      syntaxTokens: [
        { token: 'crontab', role: 'command', explanation: 'Maintain crontab files for individual users' },
        { token: '-e', role: 'flag', explanation: 'Edit the current user\'s crontab using default text editor' }
      ],
      variations: [
        { command: 'EDITOR=nano crontab -e', description: 'Force crontab -e to open using the simple nano text editor' },
        { command: 'sudo crontab -u www-data -e', description: 'Safely edit crontab for unprivileged service user www-data' }
      ],
      expectedOutput: 'crontab: installing new crontab',
      commonMistakes: [
        { mistake: 'Getting stuck in vim when running crontab -e for the first time', whyWrong: 'On minimal distributions, crontab -e defaults to vim. Beginners get stuck and cannot exit.', correctWay: 'Set nano as your default editor by running "select-editor" or "export EDITOR=nano".' },
        { mistake: 'Forgetting an empty newline at the end of the crontab file', whyWrong: 'Some legacy cron implementations fail to parse the final line if it does not end with a trailing newline character.', correctWay: 'Always press Enter to leave a blank line at the very bottom of the crontab.' }
      ],
      safeRecovery: 'If you made a mistake in the editor and want to cancel without saving, exit without saving (in nano: Ctrl+X then type "N").'
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
      badges: ['Environment', 'Gotchas', 'PATH', 'Core'],
      difficulty: 'Intermediate',
      quote: '"It worked when I ran it in the terminal!" — the most common bug in Linux, caused by Cron\'s stripped environment.',
      whatIsIt: 'The single most common source of cron failures is the Cron Execution Environment. When you log into an interactive shell, bash sources `/etc/profile`, `~/.bashrc`, sets your full `$PATH` (e.g. `/usr/local/bin`, `/home/user/.nvm/bin`), and sets variables like `$HOME` and `$USER`. In contrast, the cron daemon spawns jobs using a non-interactive, non-login `/bin/sh` shell with an extremely minimal environment: `PATH=/usr/bin:/bin`, `SHELL=/bin/sh`, and `HOME` set to the user\'s home directory. Any binary not in `/usr/bin` or `/bin` (like node, docker, aws, or python venvs) fails with "command not found".',
      inSimpleWords: 'Why scripts fail in cron. When you test a script yourself, your terminal knows all your shortcuts and settings. When cron runs it, it runs in a stripped-down, bare-bones shell with almost no settings loaded.',
      whyDoYouNeedIt: 'Understanding the cron environment saves hours of frustrating debugging. You learn to always use absolute paths (`/usr/local/bin/node`) and define explicit PATH variables at the top of your crontab.',
      realWorldScenario: 'A developer writes a backup script that uses `aws s3 cp`. The script runs perfectly when typed manually. But in crontab, it fails every night silently. Inspecting the error reveals the AWS CLI is installed in `/usr/local/bin/aws`, which is NOT in cron\'s default PATH. Adding `PATH=/usr/local/bin:/usr/bin:/bin` at the top of the crontab fixes it instantly.',
      realWorldAnalogy: 'Running a race with your running shoes on (interactive shell) vs running the race barefoot in the dark (cron environment).',
      withoutVsWith: {
        without: {
          title: 'Assuming Cron Matches Terminal Environment',
          items: ['Scripts failing silently with "command not found" errors', 'Relative paths resolving to the wrong directory because cron starts in $HOME', 'Environment variables like DATABASE_URL missing entirely in cron'],
          outcome: 'Failed automation scripts and hours of frustrating troubleshooting.'
        },
        with: {
          title: 'Hardened Cron Environment Architecture',
          items: ['Defining explicit PATH exports at the top of the crontab file', 'Always using absolute paths for binaries and file targets (/usr/bin/python3)', 'Redirecting stdout and stderr (>> /var/log/job.log 2>&1) for auditability'],
          outcome: 'Flawless automated script execution matching interactive behavior.'
        }
      },
      blockDiagram: {
        title: 'Interactive Shell vs Cron Environment',
        subtitle: 'Comparing environment variables between interactive login and cron:',
        nodes: [
          { id: 'interactive', label: 'Interactive Shell (Full Env)', simpleDef: 'Rich Environment', techDef: 'PATH includes /usr/local/bin, ~/.local/bin; loads ~/.bashrc, nvm, conda, cargo', badge: 'Interactive', color: '#10b981' },
          { id: 'cron_env', label: 'Cron Shell (Minimal Env)', simpleDef: 'Bare-Bones Env', techDef: 'PATH=/usr/bin:/bin; SHELL=/bin/sh; no ~/.bashrc loaded; minimal variables', badge: 'Cron Sandbox', color: '#ef4444' },
          { id: 'fix', label: 'Best Practice Fixes', simpleDef: 'Explicit Definitions', techDef: '1) Set PATH at top of crontab; 2) Use absolute paths; 3) Source environment files inside script', badge: 'Hardened', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'Absolute Path', simple: 'The complete path starting from root (e.g. /usr/local/bin/backup.sh instead of ./backup.sh).', technical: 'Fully qualified filesystem path starting with leading slash, avoiding $PATH resolution.' },
        { term: '2>&1', simple: 'A redirection shortcut that sends error messages (stderr) to the same place as normal output (stdout).', technical: 'Duplicating file descriptor 2 (stderr) to file descriptor 1 (stdout) so both streams are logged.' }
      ],
      syntaxCode: 'cat /etc/crontab',
      syntaxTokens: [
        { token: 'cat', role: 'command', explanation: 'Display file contents' },
        { token: '/etc/crontab', role: 'path', explanation: 'System-wide crontab defining default environment variables and system maintenance schedules' }
      ],
      variations: [
        { command: '* * * * * /usr/bin/env > /tmp/cron_env.txt', description: 'Schedule a temporary 1-minute test job to dump exact cron environment variables to file' },
        { command: '0 2 * * * /usr/bin/python3 /opt/app/script.py >> /var/log/script.log 2>&1', description: 'Production-ready crontab line with absolute binary path and full log redirection' }
      ],
      expectedOutput: '# /etc/crontab: system-wide crontab\nSHELL=/bin/sh\nPATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin\n\n# m h dom mon dow user  command\n17 *    * * *   root    cd / && run-parts --report /etc/cron.hourly\n25 6    * * *   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )',
      commonMistakes: [
        { mistake: 'Using relative paths in scripts executed by cron (e.g. "python script.py")', whyWrong: 'Cron starts in the user\'s $HOME directory; relative paths will look in $HOME and fail with "file not found".', correctWay: 'Always use absolute paths: "/usr/bin/python3 /opt/app/script.py".' },
        { mistake: 'Not redirecting output (stdout/stderr)', whyWrong: 'If an error occurs, cron attempts to send an email to root via local mail (sendmail/postfix). If local mail is not configured, the error is lost forever!', correctWay: 'Always append output to a log file: ">> /var/log/myjob.log 2>&1".' }
      ],
      safeRecovery: 'To see why a cron job failed, inspect syslog with "sudo grep CRON /var/log/syslog | tail -n 20".'
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
      badges: ['at', 'OneShot', 'Scheduling', 'Queuing'],
      difficulty: 'Beginner',
      quote: 'Cron is for recurring tasks; "at" is for one-shot future execution: fire once and forget.',
      whatIsIt: '`at` is the standard Linux utility for one-off job scheduling. Unlike cron which repeats endlessly according to a pattern, `at` executes a command queue exactly once at a specified future date and time (e.g. `at 04:00`, `at now + 2 hours`, `at 11:30 PM tomorrow`). The background daemon `atd` manages the job queue. Crucially, `at` captures the caller\'s CURRENT environment variables, umask, and working directory at the moment the job is queued, executing the task later with those exact preserved settings.',
      inSimpleWords: 'A one-time timer for Linux. Instead of a repeating schedule, you tell it: "Do this once tonight at 4:00 AM, and never do it again".',
      whyDoYouNeedIt: 'When you need to reboot a server during a 4:00 AM maintenance window, or kill a long-running benchmark in 3 hours, you use `at` instead of staying awake until 4:00 AM or remembering to delete a crontab entry afterwards.',
      realWorldScenario: 'An engineer applies a risky network firewall change remotely over SSH. To prevent accidental self-lockout, they queue an automatic rollback: `echo "ufw disable" | at now + 10 minutes`. If the firewall change succeeds, they cancel the at job. If they get locked out, the server automatically disables the firewall in 10 minutes, restoring access.',
      realWorldAnalogy: 'Setting a timer on your oven: it dings once after 45 minutes and turns off, rather than dinging every day.',
      withoutVsWith: {
        without: {
          title: 'Setting Alarms and Staying Awake Late at Night',
          items: ['Engineers waking up at 3:00 AM to manually reboot servers', 'Creating temporary crontabs and forgetting to delete them next day', 'Accidental self-lockout with no automatic fail-safe recovery'],
          outcome: 'Sleep deprivation, human error, and lingering unwanted cron jobs.'
        },
        with: {
          title: 'Automated One-Shot Execution with at',
          items: ['Effortless scheduling of maintenance window commands', 'Preserves current working environment and directory automatically', 'Perfect dead-man\'s switch for testing risky network configurations'],
          outcome: 'Automated off-peak execution and fail-safe network testing.'
        }
      },
      blockDiagram: {
        title: 'at Command Execution Pipeline',
        subtitle: 'How at preserves environment and triggers one-shot tasks:',
        nodes: [
          { id: 'queue', label: '1. Queue Job (at 04:00)', simpleDef: 'Saves Environment', techDef: 'Captures stdin commands, active $ENV, umask, and cwd into /var/spool/cron/atjobs/', badge: 'Spool Queue', color: '#10b981' },
          { id: 'atd', label: '2. atd Daemon', simpleDef: 'Background Timer', techDef: 'Monitors system clock; sleeps until scheduled timestamp arrives', badge: 'Daemon', color: '#38bdf8' },
          { id: 'execute', label: '3. Execute & Purge', simpleDef: 'One-Shot Run', techDef: 'Spawns shell, executes captured commands, and permanently removes job from queue', badge: 'Finished', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'atq', simple: 'Command that lists all pending one-shot "at" jobs currently waiting in line.', technical: 'Lists the user\'s pending jobs stored in the at spool directory.' },
        { term: 'atrm', simple: 'Command that cancels/deletes a pending "at" job before it runs.', technical: 'Removes the specified job ID from the at queue.' }
      ],
      syntaxCode: 'echo "systemctl restart nginx" | at 04:00',
      syntaxTokens: [
        { token: 'echo "..."', role: 'command', explanation: 'Command string to be executed in the future' },
        { token: '| at', role: 'operator', explanation: 'Pipe command into the "at" job scheduler' },
        { token: '04:00', role: 'argument', explanation: 'Target execution time in 24-hour military format' }
      ],
      variations: [
        { command: 'atq', description: 'List all currently queued pending "at" jobs and their scheduled execution times' },
        { command: 'atrm 4', description: 'Cancel and remove job ID 4 from the pending at queue' }
      ],
      expectedOutput: 'job 3 at Wed Sep 30 04:00:00 2026',
      commonMistakes: [
        { mistake: 'Using "at" without the "atd" daemon running', whyWrong: 'If the atd service is not active, jobs queue into the spool but will NEVER execute!', correctWay: 'Ensure the daemon is running with "sudo systemctl status atd".' },
        { mistake: 'Forgetting to cancel a safety rollback job after a successful change', whyWrong: 'Your safety rollback script (e.g. ufw disable) will fire later anyway unless explicitly cancelled with "atrm".', correctWay: 'Run "atq" and "atrm <job_id>" once your manual verification succeeds.' }
      ],
      safeRecovery: 'To see what commands are inside a queued job, run "at -c <job_id>".'
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
      difficulty: 'Intermediate',
      quote: 'Systemd timers are the modern evolution of cron: integrated logging, dependency ordering, and failure alerts out of the box.',
      whatIsIt: '`systemd timers` are systemd unit files (ending in `.timer`) that trigger `.service` units on a schedule. They represent the modern Linux standard for scheduling, replacing legacy cron in modern distributions. Timers come in two varieties: 1) Realtime/Calendar Timers (`OnCalendar=*-*-* 03:00:00`), equivalent to cron; 2) Monotonic Timers (`OnBootSec=15min`, `OnUnitActiveSec=1h`), triggering relative to system events. Timers provide massive advantages over cron: integrated journalctl logging, resource limits via cgroups, failure dependencies (OnFailure=alert.service), and millisecond precision.',
      inSimpleWords: 'The modern upgrade to cron. Instead of writing cryptic 5-star codes, you write clean systemd timer files that have built-in logging, can run relative to boot time, and tell you exactly when they will fire next.',
      whyDoYouNeedIt: 'Enterprise Linux distributions (Ubuntu, Debian, RHEL) use systemd timers for core system maintenance (e.g. `apt-daily.timer`, `fstrim.timer`, `logrotate.timer`). Mastering timers is essential for modern DevOps and SRE roles.',
      realWorldScenario: 'An SRE needs to run SSD TRIM maintenance every Sunday, but if the server was powered off on Sunday, it should run immediately upon boot. Using `fstrim.timer` with `Persistent=true`, systemd detects the missed schedule and executes TRIM immediately on Monday morning.',
      realWorldAnalogy: 'Upgrading from a wind-up mechanical alarm clock (cron) to a smart home automation hub (systemd timers) that logs everything and handles power outages gracefully.',
      withoutVsWith: {
        without: {
          title: 'Legacy Cron Limitations',
          items: ['Zero logging of script output unless manually redirected to files', 'Missed jobs when server is powered off during the scheduled time', 'No cgroup resource constraints: a rogue cron job can freeze the host'],
          outcome: 'Difficult troubleshooting and unconstrained resource consumption.'
        },
        with: {
          title: 'Modern Observability with systemd Timers',
          items: ['Integrated logging with "journalctl -u mytask.service"', 'Persistent=true ensures missed jobs catch up after reboots', 'Accurate time tracking with NEXT and LEFT countdowns in systemctl list-timers'],
          outcome: 'Enterprise-grade scheduling with complete observability and resource controls.'
        }
      },
      blockDiagram: {
        title: 'systemd Timer & Service Pair',
        subtitle: 'How a .timer unit activates its matching .service unit:',
        nodes: [
          { id: 'timer', label: '1. mytask.timer', simpleDef: 'Schedule Trigger', techDef: 'Defines OnCalendar=daily or OnBootSec=10m; triggers matching service unit', badge: 'Timer Unit', color: '#10b981' },
          { id: 'service', label: '2. mytask.service', simpleDef: 'Execution Logic', techDef: 'Defines ExecStart=/usr/local/bin/task.sh and cgroup CPU/Memory limits', badge: 'Service Unit', color: '#38bdf8' },
          { id: 'journal', label: '3. systemd Journal', simpleDef: 'Automatic Logging', techDef: 'Captures all stdout/stderr, start/stop timestamps, and exit codes in journald', badge: 'Journald', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Persistent=true', simple: 'A setting that makes sure missed jobs run immediately when the computer turns back on.', technical: 'Stores last trigger timestamp to disk; if elapsed while offline, runs immediately upon boot.' },
        { term: 'Monotonic Timer', simple: 'A timer that triggers based on elapsed time (like "10 minutes after boot") rather than a calendar date.', technical: 'Timer measuring time against a monotonic clock (CLOCK_MONOTONIC) such as OnBootSec or OnStartupSec.' }
      ],
      syntaxCode: 'systemctl list-timers',
      syntaxTokens: [
        { token: 'systemctl', role: 'command', explanation: 'Systemd service and unit manager' },
        { token: 'list-timers', role: 'argument', explanation: 'List all currently active timer units ordered by time to next trigger' }
      ],
      variations: [
        { command: 'systemctl list-timers --all', description: 'Show all timers including inactive and dormant timers' },
        { command: 'journalctl -u mytask.service', description: 'View complete execution logs for the scheduled service unit' }
      ],
      expectedOutput: 'NEXT                         LEFT          LAST                         PASSED       UNIT                         ACTIVATES\nWed 2026-09-30 02:00:00 UTC  45min left    Tue 2026-09-29 02:00:01 UTC  23h ago      backup.timer                 backup.service\nWed 2026-09-30 06:25:00 UTC  5h 10min left Tue 2026-09-29 06:25:12 UTC  19h ago      apt-daily.timer              apt-daily.service\nSun 2026-10-04 00:00:00 UTC  4 days left   Sun 2026-09-27 00:00:02 UTC  3 days ago   fstrim.timer                 fstrim.service',
      commonMistakes: [
        { mistake: 'Creating a .timer unit without creating the corresponding .service unit', whyWrong: 'The timer will trigger, but throw an error because there is no matching service file to execute!', correctWay: 'Always create both "name.timer" AND "name.service".' },
        { mistake: 'Enabling the .service instead of enabling the .timer', whyWrong: 'Enabling the service runs it once at boot; enabling the TIMER schedules it for recurring execution.', correctWay: 'Run "sudo systemctl enable --now mytask.timer".' }
      ],
      safeRecovery: 'To test if your scheduled service works immediately without waiting for the timer, run "sudo systemctl start mytask.service".'
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
      badges: ['Backups', 'Automation', 'flock', 'BestPractices'],
      difficulty: 'Intermediate',
      quote: 'If your backup takes 2 hours and runs every hour, you will crash the server: always protect scheduled jobs with flock.',
      whatIsIt: 'Scheduling production backups requires engineering safeguards against overlap and failure. If a scheduled backup takes longer than the scheduling interval (due to large database growth or slow network throughput), the next scheduled run will spawn concurrently, competing for disk I/O and RAM, creating a cascade that freezes the server. Robust backup scheduling uses `flock` (file lock) to guarantee mutual exclusion, logs stdout and stderr with timestamps, and alerts engineers upon non-zero exit codes.',
      inSimpleWords: 'Safely scheduling backups. You use a tool called "flock" to make sure that if a backup takes longer than expected, a second backup won\'t start at the same time and crash your computer.',
      whyDoYouNeedIt: 'Overlapping backup jobs are a classic cause of middle-of-the-night database outages. Using flock ensures that only one backup process can ever run at a time.',
      realWorldScenario: 'A database grows from 10GB to 500GB. The hourly backup script that used to take 5 minutes now takes 75 minutes. Because the engineer configured `flock -n /var/lock/backup.lock`, the second hourly job attempts to acquire the lock, sees the previous run is still active, and exits cleanly instead of crashing the database.',
      realWorldAnalogy: 'An occupied lock on a single-occupancy restroom door: if someone is already inside, you wait outside rather than forcing the door open.',
      withoutVsWith: {
        without: {
          title: 'Unprotected Backup Scheduling',
          items: ['Multiple backup scripts running concurrently and saturating disk I/O', 'Database lock contention causing customer transactions to fail', 'Zero notification when backups fail due to disk full errors'],
          outcome: 'Production slowdowns, corrupted backup archives, and failed disaster recovery.'
        },
        with: {
          title: 'Robust Backup Orchestration with flock',
          items: ['Strict mutual exclusion preventing duplicate overlapping executions', 'Clean non-blocking skip (-n) with warning logs when jobs overrun', 'Integrated logging to dedicated log files with automated rotation'],
          outcome: 'Rock-solid backup automation with zero risk of cascading job pile-ups.'
        }
      },
      blockDiagram: {
        title: 'flock Mutual Exclusion Mechanism',
        subtitle: 'How flock prevents duplicate concurrent backup runs:',
        nodes: [
          { id: 'cron', label: '1. Cron Trigger', simpleDef: 'Scheduled Start', techDef: 'Spawns: flock -n /var/lock/backup.lock /usr/local/bin/backup.sh', badge: 'Trigger', color: '#10b981' },
          { id: 'flock', label: '2. flock Advisory Lock', simpleDef: 'File Lock Check', techDef: 'Calls flock(fd, LOCK_EX | LOCK_NB) on lockfile in kernel VFS', badge: 'Kernel Lock', color: '#38bdf8' },
          { id: 'verdict', label: '3. Run or Clean Exit', simpleDef: 'Lock Result', techDef: 'Lock acquired: runs backup. Lock busy: exits immediately with code 1 without spawning backup', badge: 'Safe Result', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'flock', simple: 'A Linux command that puts a lock on a file so only one instance of a program can run at once.', technical: 'CLI utility managing advisory file locks via the flock(2) system call.' },
        { term: 'LOCK_NB (Non-Blocking)', simple: 'Tells flock: "If another backup is running, don\'t wait in line; just exit immediately".', technical: 'Non-blocking lock request flag returning EWOULDBLOCK if lock is held by another process.' }
      ],
      syntaxCode: 'crontab -l | grep backup',
      syntaxTokens: [
        { token: 'crontab', role: 'command', explanation: 'List user schedule table' },
        { token: '| grep backup', role: 'operator', explanation: 'Filter crontab lines for backup-related automation commands' }
      ],
      variations: [
        { command: '0 2 * * * /usr/bin/flock -n /var/lock/backup.lock /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1', description: 'Production crontab entry using flock to prevent overlapping runs' },
        { command: 'flock -n /tmp/test.lock sleep 10', description: 'Test flock behavior interactively in terminal' }
      ],
      expectedOutput: '0 2 * * * /usr/bin/flock -n /var/lock/backup.lock /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1',
      commonMistakes: [
        { mistake: 'Placing lockfiles in volatile directories that get cleared unexpectedly', whyWrong: 'Locks in /tmp may be purged by systemd-tmpfiles, leading to race conditions.', correctWay: 'Use dedicated lock directories like "/var/lock/" or "/run/lock/".' },
        { mistake: 'Not testing the backup recovery process', whyWrong: 'An untested backup is not a backup! You only find out the archive was corrupted when disaster strikes.', correctWay: 'Regularly automate test restores into a staging environment.' }
      ],
      safeRecovery: 'If a backup script crashed and left a stale lockfile, verify the process is truly dead before removing the lockfile with "rm -f /var/lock/backup.lock".'
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
      badges: ['Maintenance', 'anacron', 'Directories', 'Core'],
      difficulty: 'Beginner',
      quote: 'Drop an executable script into /etc/cron.daily and Linux handles the rest: no crontab editing required.',
      whatIsIt: 'Linux distributions provide preconfigured drop-in directories for recurring system maintenance: `/etc/cron.hourly/`, `/etc/cron.daily/`, `/etc/cron.weekly/`, and `/etc/cron.monthly/`. Any executable script placed into these directories is automatically discovered and executed by `run-parts` on schedule. On desktop systems or servers that may be shut down at night, `anacron` manages these directories, recording timestamps in `/var/spool/anacron/` and running missed jobs as soon as the system boots up.',
      inSimpleWords: 'Drop-in folders for maintenance. Instead of writing crontab lines, you just drop your script into "/etc/cron.daily" and Linux runs it every single day.',
      whyDoYouNeedIt: 'System packages (like logrotate, man-db, and apt) install their maintenance jobs into `/etc/cron.daily/`. Knowing this structure allows you to inspect what routine maintenance runs on your server.',
      realWorldScenario: 'An administrator needs to run a daily cleanup script that purges temporary uploaded files older than 7 days. Instead of managing individual user crontabs, they save the script to `/etc/cron.daily/purge_temp_uploads` and run `chmod +x`. The script runs automatically every day alongside standard system maintenance.',
      realWorldAnalogy: 'Dropping outgoing letters into the daily mail pickup tray: the postal worker empties the tray every afternoon without needing individual instructions.',
      withoutVsWith: {
        without: {
          title: 'Scattered Personal Crontabs for System Tasks',
          items: ['Maintenance scripts hidden inside random user crontabs', 'Lost scripts when employees leave the company and user accounts are deleted', 'Missed maintenance when machines are suspended or powered off'],
          outcome: 'Fragile, disorganized server maintenance scripts.'
        },
        with: {
          title: 'Centralized Maintenance Folders with anacron',
          items: ['Standardized, package-compatible directory structure (/etc/cron.daily)', 'Guaranteed execution even if machine was offline via anacron catch-up', 'Zero crontab syntax required: just drop in an executable script'],
          outcome: 'Clean, centralized, and robust system-wide maintenance.'
        }
      },
      blockDiagram: {
        title: '/etc/cron.* Maintenance Pipeline',
        subtitle: 'How run-parts executes maintenance scripts in batch:',
        nodes: [
          { id: 'dir', label: '1. /etc/cron.daily/', simpleDef: 'Script Directory', techDef: 'Directory containing executable shell scripts (logrotate, apt, custom)', badge: 'Drop-In Dir', color: '#10b981' },
          { id: 'run_parts', label: '2. run-parts Utility', simpleDef: 'Batch Executor', techDef: 'Discovers executable files with valid POSIX names; executes sequentially', badge: 'Executor', color: '#38bdf8' },
          { id: 'anacron', label: '3. anacron Catch-Up', simpleDef: 'Offline Catch-Up', techDef: 'Checks /var/spool/anacron/ timestamps; runs overdue jobs after boot', badge: 'Catch-Up', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'run-parts', simple: 'A tool that runs all executable scripts found inside a specific directory in alphabetical order.', technical: 'Helper utility executing all scripts or programs in a directory matching strict naming rules.' },
        { term: 'anacron', simple: 'A special version of cron designed for computers that are not running 24/7 (laptops/workstations).', technical: 'Daemon designed to execute commands at daily/weekly/monthly intervals on non-continuous systems.' }
      ],
      syntaxCode: 'ls -la /etc/cron.daily',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory contents' },
        { token: '-la', role: 'flag', explanation: 'Long format including hidden files and permission bits' },
        { token: '/etc/cron.daily', role: 'path', explanation: 'Directory containing daily system maintenance scripts' }
      ],
      variations: [
        { command: 'cat /etc/anacrontab', description: 'View anacron configuration file and execution delays for daily/weekly/monthly jobs' },
        { command: 'sudo run-parts --test /etc/cron.daily', description: 'Test and print which scripts in /etc/cron.daily would be executed without running them' }
      ],
      expectedOutput: 'total 36\ndrwxr-xr-x   2 root root 4096 Sep 30 00:00 .\ndrwxr-xr-x 135 root root 12288 Sep 30 00:00 ..\n-rwxr-xr-x   1 root root  1473 Jan 15  2024 apt-compat\n-rwxr-xr-x   1 root root   384 Feb 20  2024 logrotate\n-rwxr-xr-x   1 root root  1120 Mar 10  2024 man-db\n-rwxr-xr-x   1 root root   249 Sep 30 01:00 purge_temp_uploads',
      commonMistakes: [
        { mistake: 'Adding a filename with a dot (e.g. "myscript.sh") in /etc/cron.daily', whyWrong: 'By default, "run-parts" strictly IGNORES any filename containing a period (.) to avoid running backup or dpkg files!', correctWay: 'Name scripts WITHOUT file extensions (e.g. "myscript", not "myscript.sh").' },
        { mistake: 'Forgetting to make the script executable with "chmod +x"', whyWrong: 'run-parts only executes files with executable permissions; non-executable scripts are skipped silently.', correctWay: 'Always run "sudo chmod +x /etc/cron.daily/myscript".' }
      ],
      safeRecovery: 'To test if your script in /etc/cron.daily will be accepted by run-parts, run "run-parts --test /etc/cron.daily".'
    })
  ]
};
