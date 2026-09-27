import { LinuxTopic } from '../unifiedLinuxData';

export const MODULE_06_SERVICES: LinuxTopic = {
  id: 'ch01-06-services',
  number: '01.6',
  title: 'Services & Systemd',
  iconName: 'Cpu',
  description:
    'Init systems and background daemons: systemd architecture & unit files (.service), service lifecycle management (systemctl start, stop, restart, enable, status), and centralized log investigation (journalctl).',
  concepts: [
    {
      id: 'linux-systemd-architecture',
      command: 'systemctl list-unit-files --type=service; cat /lib/systemd/system/ssh.service',
      title: 'systemd Architecture & Unit Configuration (.service)',
      topicId: 'ch01-06-services',
      topicNumber: '01.6',
      topicTitle: 'Services & Systemd',
      subtitle: 'PID 1 init system, cgroups integration, target levels, and unit file anatomy',
      badges: ['systemd', 'Architecture', 'SysAdmin'],
      quote:
        'systemd is the modern Linux init system: it boots the kernel into user space, supervises background daemons, and isolates resources using cgroups.',
      difficulty: 'Intermediate',
      whatIsIt:
        '`systemd` is the premier init system and system manager across modern Linux distributions (Ubuntu, Debian, RHEL, CentOS, Fedora, Arch). Running as PID 1, it replaces legacy SysVinit scripts with declarative, parallelized dependency management. Everything managed by systemd is a **Unit**, categorized into `.service` (daemons), `.target` (boot runlevels, e.g. `multi-user.target`), `.socket` (socket-activated on-demand daemons), `.timer` (cron replacements), and `.mount` (filesystem mount points). A standard service unit file contains three primary sections: `[Unit]` (metadata and dependencies like `After=network.target`), `[Service]` (execution parameters like `ExecStart`, `Restart=always`, `User=deploy`, `LimitNOFILE=65536`), and `[Install]` (boot enablement hooks like `WantedBy=multi-user.target`).',
      inSimpleWords:
        '`systemd` is the master manager of your server. When the computer turns on, systemd starts all your background servers (web server, database, firewall) in parallel and makes sure that if any server crashes, it restarts automatically.',
      whyDoYouNeedIt:
        'Writing production systemd service files is standard practice for deploying backend Node.js, Python, or Go microservices. Configuring `Restart=always` ensures your service self-heals after crashes without human intervention.',
      realWorldAnalogy:
        'The facilities manager of an office building: systemd unlocks doors, turns on electricity, starts elevators, hires security guards, and if an elevator breaks down, immediately resets and restarts it.',
      withoutVsWith: {
        without: {
          title: 'Without systemd (Legacy SysVinit Shell Scripts)',
          items: [
            'Sequential, slow boot processes running brittle hundreds-of-lines bash scripts',
            'No automated restart capability when a daemon crashes due to memory leaks',
            'Processes escape shutdown by double-forking into orphan processes',
          ],
          outcome: 'Slow boot times, silent server crashes, and zombie background processes.',
        },
        with: {
          title: 'With systemd Declarative Units and Supervision',
          items: [
            'Blazing fast parallelized daemon startup with dependency resolution graphs',
            'Automatic cgroups tracking: killing a service kills 100% of its child threads reliably',
            'Built-in watchdog timers, restart policies (Restart=on-failure), and resource limits',
          ],
          outcome: 'Self-healing infrastructure with complete daemon lifecycle supervision.',
        },
      },
      blockDiagram: {
        title: 'systemd Declarative Unit Architecture',
        subtitle: 'Anatomy of an enterprise .service unit file managing background daemons',
        nodes: [
          { id: 'unit-meta', label: '[Unit] Metadata', simpleDef: 'Description & Dependencies', techDef: 'Requires=, Wants=, After=network.target, Documentation=', badge: '[Unit]', color: '#38bdf8' },
          { id: 'unit-service', label: '[Service] Execution', simpleDef: 'What binary to run and how', techDef: 'ExecStart=, ExecReload=, User=, Restart=always, EnvironmentFile=', badge: '[Service]', color: '#10b981' },
          { id: 'unit-install', label: '[Install] Boot Hook', simpleDef: 'When to start on system boot', techDef: 'WantedBy=multi-user.target (enables symlink in /etc/systemd/system/)', badge: '[Install]', color: '#06b6d4' },
          { id: 'unit-cgroup', label: 'cgroup Slice', simpleDef: 'Resource isolation sandbox', techDef: 'Tracks every child process; MemoryMax=, CPUQuota=, TasksMax=', badge: 'cgroup v2', color: '#f59e0b' },
        ],
      },
      terms: [
        { term: 'Unit File', simple: 'A declarative configuration file ending in .service or .timer defining a daemon.', technical: 'Plain-text INI-format configuration parsed by systemd stored in /etc/systemd/system/ or /lib/systemd/system/.' },
        { term: 'WantedBy=multi-user.target', simple: 'Tells systemd to start this service during normal multi-user command-line boot.', technical: 'Creates a symlink in /etc/systemd/system/multi-user.target.wants/ when systemctl enable is run.' },
        { term: 'Restart=always', simple: 'Automatically restarts the service if it crashes, is killed, or exits.', technical: 'Supervision policy: systemd automatically respawns process after RestartSec duration.' },
      ],
      whenToUse: [
        'Creating background daemons for web apps: `/etc/systemd/system/myapp.service`',
        'Auditing installed services across the OS: `systemctl list-unit-files --type=service`',
        'Replacing cron with reliable microsecond timers: creating a `.timer` unit',
      ],
      whenNotToUse: [
        'Never edit files in `/lib/systemd/system/` directly; override them cleanly in `/etc/systemd/system/` or use `systemctl edit <unit>`',
      ],
      syntaxCode: '[Unit]\nDescription=My Web App\nAfter=network.target\n\n[Service]\nExecStart=/usr/bin/node /app/server.js\nRestart=always\nUser=deploy\n\n[Install]\nWantedBy=multi-user.target',
      syntaxTokens: [
        { token: 'ExecStart', role: 'Directive', explanation: 'Absolute path to binary and arguments executed on service start' },
        { token: 'Restart=always', role: 'Directive', explanation: 'Configures systemd to resurrect daemon whenever it terminates' },
        { token: 'WantedBy', role: 'Directive', explanation: 'Target runlevel that triggers service startup during boot sequence' },
      ],
      variations: [
        { syntax: 'systemctl daemon-reload', title: 'Reload Unit Files', whatItDoes: 'Reloads systemd manager configuration after editing unit files', whenToUse: 'Mandatory after editing any .service file' },
        { syntax: 'systemctl edit --full myapp', title: 'Interactive Edit', whatItDoes: 'Creates override or copies unit file to /etc/systemd/system for safe editing', whenToUse: 'Customizing vendor services' },
      ],
      internalFlow: [
        { step: 1, title: 'systemctl daemon-reload', desc: 'systemd parses unit files in /etc/systemd/system and /lib/systemd/system', why: 'Rebuilds dependency graph', techDetail: 'Compiles in-memory Directed Acyclic Graph (DAG) of all units and dependencies' },
        { step: 2, title: 'cgroup Allocation', desc: 'When service starts, systemd allocates a dedicated cgroup (e.g. system.slice/myapp.service)', why: 'Tracks processes', techDetail: 'Any process forked by the service is trapped inside this cgroup' },
        { step: 3, title: 'Process Supervision & Restart', desc: 'Kernel notifies systemd via pidfd or SIGCHLD when process exits', why: 'Monitors health', techDetail: 'If exit was unexpected, checks Restart policy and triggers respawn timer' },
      ],
      sandbox: {
        initialCommands: ['# List all loaded active service units\nsystemctl list-units --type=service --state=running | head -n 8'],
        guidedSteps: [
          { instruction: 'List running services', command: 'systemctl list-units --type=service', hint: 'Run systemctl list-units' },
          { instruction: 'Inspect how systemd reloads unit files', command: 'systemctl daemon-reload', hint: 'Run systemctl daemon-reload' },
        ],
        targetTask: 'List active services and run systemctl daemon-reload',
        solutionCommands: ['systemctl list-units --type=service', 'systemctl daemon-reload'],
      },
      commonMistakes: [
        { mistake: 'Forgetting to run systemctl daemon-reload after editing a service file', whyWrong: 'systemd caches unit definitions in RAM; your edits on disk will be ignored until daemon-reload is executed.', correctWay: 'Always execute sudo systemctl daemon-reload immediately after modifying any unit file.' },
        { mistake: 'Using relative paths in ExecStart (e.g. ExecStart=node app.js)', whyWrong: 'systemd strictly requires absolute paths for all executable binaries in ExecStart.', correctWay: 'Always specify the absolute path: ExecStart=/usr/bin/node /opt/app/app.js.' },
      ],
      challenge: {
        question: 'Which directory is the designated location for custom administrator-created systemd unit files that override default vendor units?',
        options: [
          { label: '/etc/systemd/system/', isCorrect: true, explanation: '/etc/systemd/system/ has the highest priority and is reserved for administrator custom units and overrides.' },
          { label: '/lib/systemd/system/', isCorrect: false, explanation: '/lib/systemd/system/ is managed by OS package managers and is overwritten during package upgrades.' },
          { label: '/var/log/systemd/', isCorrect: false, explanation: '/var/log/ contains log files, not unit definitions.' },
          { label: '/usr/local/bin/', isCorrect: false, explanation: '/usr/local/bin/ contains executable binary scripts, not systemd unit files.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['systemctl daemon-reload', 'systemctl list-unit-files --type=service', 'systemctl cat <service>', 'systemctl edit <service>'],
        bestPractices: [
          'Always set Restart=on-failure or Restart=always for production background daemons',
          'Use LimitNOFILE=65536 in service files to prevent "Too many open files" errors under load',
        ],
      },
    },
    {
      id: 'linux-systemctl-lifecycle',
      command: 'sudo systemctl status nginx; sudo systemctl start nginx; sudo systemctl restart nginx; sudo systemctl enable --now nginx',
      title: 'Service Lifecycle: systemctl (start, stop, restart, enable, status)',
      topicId: 'ch01-06-services',
      topicNumber: '01.6',
      topicTitle: 'Services & Systemd',
      subtitle: 'Complete daemon operational management: start, stop, restart, reload, enable, disable, and status analysis',
      badges: ['systemctl', 'SysAdmin', 'Operations'],
      quote:
        'Starting a service runs it right now; enabling a service ensures it will resurrect automatically after a machine reboot.',
      difficulty: 'Beginner',
      whatIsIt:
        '`systemctl` is the primary command-line tool for controlling the systemd system and service manager. Operational actions include: `start` (spawns daemon immediately), `stop` (sends SIGTERM to shut down), `restart` (stops and re-starts), `reload` (sends SIGHUP to reload config without dropping connections), and `status` (inspects real-time state, PID, memory, uptime, and recent journal log entries). Crucially, **Starting** vs **Enabling** are distinct concepts: `enable` creates symlinks in target directories so the service starts on boot, while `disable` removes boot symlinks. The modern flag `--now` combines both operations in a single step (e.g. `systemctl enable --now docker`).',
      inSimpleWords:
        '`systemctl start` turns the app on right now. `systemctl stop` turns it off. `systemctl restart` turns it off and on again. `systemctl enable` sets the alarm clock so it wakes up when the computer boots up. `systemctl status` asks the app "How are you feeling right now?"',
      whyDoYouNeedIt:
        'Whenever you install Nginx, Docker, PostgreSQL, or deploy a new release, you must start or reload the daemon and ensure it is enabled across reboot cycles.',
      realWorldAnalogy:
        'Turning on a TV with the remote (`start`), switching the breaker switch so it turns on whenever the house power is restored (`enable`), and checking the diagnostic screen for error codes (`status`).',
      withoutVsWith: {
        without: {
          title: 'Without Unified Service Lifecycle Tools (Manual Shell Scripts)',
          items: [
            'Admins forget to configure startup scripts, leaving servers dead after a reboot',
            'No standardized command to inspect service health, uptime, or memory usage',
            'Services restarted by killing PIDs manually, risking data corruption',
          ],
          outcome: 'Unreliable reboots and chaotic manual service management.',
        },
        with: {
          title: 'With systemctl Unified Lifecycle Management',
          items: [
            'Identical standard commands (start, stop, restart, status) across every modern distro',
            'systemctl enable --now ensures automatic persistence across system reboots',
            'status output immediately surfaces active state, PID, memory footprint, and fatal errors',
          ],
          outcome: 'Predictable, robust daemon operations and rapid failure diagnosis.',
        },
      },
      blockDiagram: {
        title: 'Start vs Enable: Operational vs Boot Lifecycle',
        subtitle: 'Comparing immediate runtime process execution vs persistent symlink creation',
        nodes: [
          { id: 'ctl-start', label: 'systemctl start', simpleDef: 'Spawns process NOW', techDef: 'Executes ExecStart command; allocates PID & cgroup immediately in RAM', badge: 'Active (Running)', color: '#10b981' },
          { id: 'ctl-enable', label: 'systemctl enable', simpleDef: 'Starts on NEXT REBOOT', techDef: 'Creates symlink: /etc/systemd/system/multi-user.target.wants/app.service -> /lib/...', badge: 'Persistent Boot', color: '#06b6d4' },
          { id: 'ctl-status', label: 'systemctl status', simpleDef: 'Health dashboard', techDef: 'Queries D-Bus API for ActiveState, MainPID, Memory, Tasks, and journal snippet', badge: 'Telemetry', color: '#38bdf8' },
        ],
      },
      terms: [
        { term: 'Active (Running) vs Loaded', simple: 'Loaded means the config file is valid; Active (Running) means the program is running right now.', technical: 'Loaded: systemd parsed the unit file into memory. ActiveState: running, exited, failed, or inactive.' },
        { term: 'enable --now', simple: 'Enables the service for boot AND starts it right now in a single command.', technical: 'Atomically creates boot target symlinks and transitions unit to active state.' },
        { term: 'systemctl reload', simple: 'Tells the service to reload its configuration without restarting or dropping traffic.', technical: 'Executes the ExecReload directive (usually SIGHUP) without terminating MainPID.' },
      ],
      whenToUse: [
        'Checking if web server is healthy and viewing error snippet: `systemctl status nginx`',
        'Reloading SSL certificates with zero downtime: `sudo systemctl reload nginx`',
        'Enabling a new database across reboots: `sudo systemctl enable --now postgresql`',
      ],
      whenNotToUse: [
        'Avoid running `systemctl restart` if the service supports zero-downtime `reload`; restart drops active TCP sockets',
      ],
      syntaxCode: 'systemctl status nginx\nsudo systemctl start nginx\nsudo systemctl stop nginx\nsudo systemctl restart nginx\nsudo systemctl enable --now nginx',
      syntaxTokens: [
        { token: 'systemctl status', role: 'Action', explanation: 'Query the operational status and recent logs of a unit' },
        { token: 'restart', role: 'Action', explanation: 'Stop then start the specified service' },
        { token: 'enable --now', role: 'Flags', explanation: 'Enable boot persistence and start unit immediately' },
      ],
      variations: [
        { syntax: 'systemctl is-active myapp', title: 'Active Check', whatItDoes: 'Returns string "active" or "inactive" with exit code 0/1', whenToUse: 'Health-check scripts' },
        { syntax: 'systemctl is-enabled myapp', title: 'Enabled Check', whatItDoes: 'Returns string "enabled" or "disabled"', whenToUse: 'Provisioning audits' },
      ],
      internalFlow: [
        { step: 1, title: 'systemctl Sends D-Bus Message', desc: 'systemctl connects to systemd manager via D-Bus IPC socket', why: 'Issues command', techDetail: 'Calls org.freedesktop.systemd1.Manager.StartUnit() method' },
        { step: 2, title: 'systemd Spawns Process', desc: 'systemd forks worker process, configures environment, drops privileges to User=', why: 'Spawns daemon', techDetail: 'Executes execve() with ExecStart path; adds PID to unit cgroup' },
        { step: 3, title: 'Status Query', desc: 'systemctl status collects cgroup metrics (tasks, memory) and queries journald', why: 'Formats dashboard', techDetail: 'Displays formatted colored status output with last 10 log rows' },
      ],
      sandbox: {
        initialCommands: ['# Check status of an essential system service\nsystemctl status sshd || systemctl status ssh'],
        guidedSteps: [
          { instruction: 'Query status of the SSH service', command: 'systemctl status ssh', hint: 'Run systemctl status ssh' },
          { instruction: 'Check if the service is active using is-active', command: 'systemctl is-active ssh', hint: 'Run systemctl is-active ssh' },
        ],
        targetTask: 'Check the status of the SSH service with systemctl status',
        solutionCommands: ['systemctl status ssh'],
      },
      commonMistakes: [
        { mistake: 'Running systemctl start and assuming it will survive a reboot', whyWrong: 'start only runs the service in the current session; if the server reboots, the service will remain dead unless enabled.', correctWay: 'Always run systemctl enable --now <service> for persistent services.' },
        { mistake: 'Running systemctl restart on production proxies when reload would suffice', whyWrong: 'restart terminates the master process, immediately severing all active client TCP connections.', correctWay: 'Use systemctl reload <service> to gracefully reload configurations without dropping connections.' },
      ],
      challenge: {
        question: 'What is the key difference between `systemctl start` and `systemctl enable`?',
        options: [
          { label: 'start runs the service immediately in the current session, while enable configures it to start automatically on system boot', isCorrect: true, explanation: 'start creates runtime processes; enable creates boot target symlinks.' },
          { label: 'start is for background services, while enable is for desktop GUI apps', isCorrect: false, explanation: 'Both manage systemd units regardless of GUI/CLI.' },
          { label: 'start requires root, but enable can be run by any unprivileged user', isCorrect: false, explanation: 'Both modify system state and typically require root privileges.' },
          { label: 'There is no difference; they are aliases', isCorrect: false, explanation: 'They perform fundamentally different operations.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['systemctl status <service>', 'systemctl start <service>', 'systemctl stop <service>', 'systemctl restart <service>', 'systemctl enable --now <service>'],
        bestPractices: [
          'Use systemctl is-active --quiet <service> in monitoring scripts to return clean exit codes (0 = active, 3 = inactive)',
          'Always test configuration syntax (e.g. nginx -t) before executing systemctl reload',
        ],
      },
    },
    {
      id: 'linux-journalctl-logging',
      command: 'journalctl -u nginx.service -f; journalctl -xe; journalctl --since "1 hour ago" -p err',
      title: 'Centralized Log Inspection: journalctl & systemd-journald',
      topicId: 'ch01-06-services',
      topicNumber: '01.6',
      topicTitle: 'Services & Systemd',
      subtitle: 'Structured binary logging, real-time follow streams, boot isolation, and priority filtering',
      badges: ['Logging', 'journalctl', 'Troubleshooting'],
      quote:
        'journalctl indexes logs natively: filter by service unit (-u), boot (-b), priority (-p err), and time (--since) in seconds.',
      difficulty: 'Intermediate',
      whatIsIt:
        '`systemd-journald` is the centralized, structured logging daemon that captures standard output, standard error, kernel messages (`dmesg`), and syslog messages across all services. Instead of plain text files scattered across `/var/log`, journald stores logs in indexed binary journals under `/var/log/journal/`. The `journalctl` query tool provides ultra-fast filtering without complex grep pipelines: filter by service unit (`-u <name>`), stream in real time (`-f`), filter by current boot (`-b`), filter by priority (`-p err`), and filter by human-readable time windows (`--since "30 minutes ago"`). The `-xe` flag explains errors with catalog messages and jumps straight to the end of the log.',
      inSimpleWords:
        '`journalctl` is the universal search engine for all server logs. Instead of guessing which file in `/var/log` has your errors, you run `journalctl -u myapp -f` to see your app’s output, or `journalctl -xe` to see why a service just failed to start.',
      whyDoYouNeedIt:
        'When `systemctl start myapp` fails with "Job for myapp.service failed", running `journalctl -xeu myapp.service` is the immediate, mandatory troubleshooting step that reveals the exact fatal exception.',
      realWorldAnalogy:
        'A courtroom transcript: Every service speaks into a microphone, and the court reporter (journald) records who spoke, the exact timestamp, the department, and whether it was an urgent warning or normal conversation into an indexed searchable ledger.',
      withoutVsWith: {
        without: {
          title: 'Without Centralized Structured Logging (Plain Text Logs)',
          items: [
            'Logs split unpredictably across /var/log/messages, /var/log/syslog, and app folders',
            'Filtering by time requires writing complex custom awk regex scripts',
            'Service stdout/stderr is lost completely if the process does not write to a file',
          ],
          outcome: 'Lost error traces and slow, painful log searching during outages.',
        },
        with: {
          title: 'With journalctl Structured Indexing',
          items: [
            'Captures stdout and stderr automatically for every container and systemd service',
            'Instant filtering by service unit: journalctl -u nginx.service -f',
            'Structured metadata filtering by priority level (-p err) and time windows (--since)',
          ],
          outcome: 'Immediate root-cause identification in seconds.',
        },
      },
      blockDiagram: {
        title: 'systemd-journald Ingestion & Query Architecture',
        subtitle: 'How stdout/stderr and kernel logs are captured into binary journals and queried via journalctl',
        nodes: [
          { id: 'log-sources', label: 'Log Sources', simpleDef: 'App stdout/stderr, syslog(), dmesg', techDef: 'Processes write to stdout (FD 1), stderr (FD 2), or /dev/log socket', badge: 'Log Streams', color: '#38bdf8' },
          { id: 'log-journald', label: 'systemd-journald', simpleDef: 'Indexes logs with metadata', techDef: 'Attaches PID, UID, GID, unit name, timestamp, and cgroup to journal entry', badge: 'journald', color: '#10b981' },
          { id: 'log-journal', label: 'Binary Journal Storage', simpleDef: '/var/log/journal/', techDef: 'Compressed, indexed binary files preventing tamper and maximizing search speed', badge: 'Binary Logs', color: '#06b6d4' },
          { id: 'log-ctl', label: 'journalctl Query Tool', simpleDef: 'Filter by -u, -p, -f, --since', techDef: 'Decodes binary entries and filters by indexed fields with color highlighting', badge: 'Query CLI', color: '#f59e0b' },
        ],
      },
      terms: [
        { term: 'journalctl -xe', simple: 'Jumps to the end of the log (-e) and includes helpful diagnostic explanations (-x).', technical: '-x shows message catalog explanations; -e scrolls immediately to end in pager.' },
        { term: 'Priority (-p err)', simple: 'Filters logs to show only Errors, Critical, Alerts, and Emergencies.', technical: 'Syslog severity levels 0 (emerg) through 7 (debug); -p err filters levels 0..3.' },
        { term: '--vacuum-size', simple: 'Cleans up and purges old archived journals when disk space runs low.', technical: 'Instructs journald to delete oldest archived journal files until disk usage is below threshold.' },
      ],
      whenToUse: [
        'Investigating why a service failed to start: `journalctl -xeu <service>`',
        'Streaming live production logs from a web proxy: `journalctl -u nginx -f`',
        'Finding all system errors since yesterday: `journalctl -p err --since yesterday`',
        'Reclaiming disk space from runaway logs: `sudo journalctl --vacuum-size=500M`',
      ],
      whenNotToUse: [
        'Avoid running raw `journalctl` without `-n` or `--since` on servers with months of logs; it will dump millions of lines',
      ],
      syntaxCode: 'journalctl -u nginx.service -f\njournalctl -xe\njournalctl -b 0\njournalctl --since "1 hour ago" -p err\nsudo journalctl --vacuum-size=1G',
      syntaxTokens: [
        { token: '-u nginx', role: 'Flag', explanation: 'Filter by specific systemd service unit' },
        { token: '-f', role: 'Flag', explanation: 'Follow: real-time streaming of new log entries' },
        { token: '-p err', role: 'Flag', explanation: 'Filter by syslog priority level (emerg..err)' },
        { token: '--since', role: 'Flag', explanation: 'Filter logs occurring after the specified time string' },
      ],
      variations: [
        { syntax: 'journalctl -k', title: 'Kernel Ring Buffer', whatItDoes: 'Displays only kernel messages (equivalent to dmesg)', whenToUse: 'Hardware or driver troubleshooting' },
        { syntax: 'journalctl -o json-pretty', title: 'JSON Output', whatItDoes: 'Outputs full structured log metadata in JSON format', whenToUse: 'Exporting logs to OpenSearch/Datadog' },
      ],
      internalFlow: [
        { step: 1, title: 'Process Emits Log Line', desc: 'Daemon prints error string to its stdout or stderr file descriptor', why: 'Logs event', techDetail: 'FD 1/2 is a socket connected directly to systemd-journald' },
        { step: 2, title: 'journald Enriches Metadata', desc: 'journald reads socket and queries kernel for SO_PEERCRED', why: 'Attaches trusted context', techDetail: 'Attaches _SYSTEMD_UNIT, _PID, _UID, _COMM, and monotonic timestamp' },
        { step: 3, title: 'Binary Journal Append', desc: 'Writes compressed entry into active journal file in /var/log/journal/', why: 'Stores safely', techDetail: 'Indexes field hashes in B-tree for sub-millisecond retrieval' },
      ],
      sandbox: {
        initialCommands: ['# Inspect the last 10 system journal entries\njournalctl -n 10 --no-pager'],
        guidedSteps: [
          { instruction: 'View the last 10 log entries without a pager', command: 'journalctl -n 10 --no-pager', hint: 'Run journalctl -n 10 --no-pager' },
          { instruction: 'Inspect kernel logs using journalctl -k', command: 'journalctl -k -n 5 --no-pager', hint: 'Run journalctl -k -n 5 --no-pager' },
        ],
        targetTask: 'Inspect recent journal logs using journalctl -n 10',
        solutionCommands: ['journalctl -n 10 --no-pager'],
      },
      commonMistakes: [
        { mistake: 'Running plain journalctl on an old server without filters', whyWrong: 'Attempts to load months of logs containing gigabytes of text, flooding the terminal session.', correctWay: 'Always scope your search: use -u <service>, -n 50, or --since "1 hour ago".' },
        { mistake: 'Letting systemd journals consume 100% of server disk space', whyWrong: 'Uncapped journals grow until the root filesystem fills, causing services to crash.', correctWay: 'Configure SystemMaxUse=2G in /etc/systemd/journald.conf and vacuum old logs with journalctl --vacuum-size.' },
      ],
      challenge: {
        question: 'Which journalctl command combination is optimal for streaming live logs from a service while inspecting only error-level messages?',
        options: [
          { label: 'journalctl -u myapp.service -f -p err', isCorrect: true, explanation: '-u scopes to myapp, -f follows in real time, and -p err filters to priority error or higher.' },
          { label: 'journalctl myapp > /dev/null', isCorrect: false, explanation: 'This silences all output completely.' },
          { label: 'cat /var/log/myapp.log | grep err', isCorrect: false, explanation: 'This does not stream new entries in real time and misses journald metadata.' },
          { label: 'systemctl status myapp -f', isCorrect: false, explanation: 'systemctl status does not support -f streaming; journalctl must be used.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['journalctl -u <service> -f', 'journalctl -xe', 'journalctl -p err', 'journalctl --since "2 hours ago"', 'journalctl --vacuum-size=1G'],
        bestPractices: [
          'Run journalctl -xeu <service> immediately when a service fails to start',
          'Use journalctl -b 0 to see only logs generated since the current server boot',
        ],
      },
    },
  ],
};
