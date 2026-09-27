import { LinuxTopic } from '../unifiedLinuxData';

export const TOPIC_10_12: LinuxTopic[] = [
  // =========================================================================
  // TOPIC 10: SERVICE MANAGEMENT WITH SYSTEMD
  // =========================================================================
  {
    id: 'topic-10',
    number: '10',
    title: 'Systemd & Service Units',
    iconName: 'Server',
    description: 'Service lifecycle (systemctl), custom unit authoring, journalctl logging, and systemd timers.',
    concepts: [
      {
        id: 'c-systemd-systemctl',
        command: 'sudo systemctl status nginx',
        title: 'Service Lifecycle: systemctl',
        topicId: 'topic-10',
        topicNumber: '10',
        topicTitle: 'Systemd & Service Units',
        subtitle: 'Managing services with start, stop, restart, reload, status, enable, and disable.',
        badges: ['Intermediate', 'Systemd', 'Services'],
        quote: 'Systemd is PID 1—the master parent process that boots and supervises all other services on modern Linux.',
        difficulty: 'Intermediate',
        whatIsIt: '`systemd` is the universal init system and service manager for Linux. As Process ID 1 (PID 1), it initializes the system, parallelizes daemon startup, monitors process health, and restarts failed services. The primary control tool is `systemctl`.',
        inSimpleWords: 'Think of `systemd` as the factory manager running the whole plant. `systemctl start nginx` tells it to start the web server. `systemctl enable nginx` tells it to make sure the web server boots up automatically every time the computer is turned on.',
        whyDoYouNeedIt: 'Modern production services (Nginx, Docker, PostgreSQL, Redis, custom Node/Python apps) are all managed as systemd services on Linux.',
        realWorldAnalogy: 'A building manager. When a light bulb goes out (a service crashes), the building manager automatically replaces it (auto-restart). When the building opens in the morning (boot time), the manager unlocks all doors and turns on the AC (`enable`).',
        withoutVsWith: {
          without: {
            title: 'WITHOUT SYSTEMD SERVICE MANAGEMENT (Raw Bash Scripts)',
            items: [
              'If a service crashes at 3 AM, it stays dead until an engineer manually logs in to restart it',
              'Services do not start automatically after server reboots',
              'Sequencing nightmares: app starts before database is ready, failing immediately',
              'No standardized way to query service status across different tools',
            ],
            outcome: '🚨 3 AM production outages and unmonitored dead server processes',
          },
          with: {
            title: 'WITH SYSTEMD SUPERVISION (Restart=always)',
            items: [
              'Automatic self-healing: if an app crashes, systemd restarts it in 100 milliseconds',
              'systemctl enable creates symlinks ensuring services launch automatically on boot',
              'Dependency-aware parallel startup (After=network.target postgresql.service)',
              'Resource constraints: limit CPU and RAM directly inside the service unit',
            ],
            outcome: '🛡️ Self-healing resilience, automated boot sequencing, and 99.99% uptime',
          },
        },
        blockDiagram: {
          title: 'systemd (PID 1) Process Tree & Service Supervision',
          subtitle: 'Click any component to inspect systemd supervision and restart loops:',
          nodes: [
            { id: 'sd-init', label: 'systemd (PID 1)', simpleDef: 'The master init process spawned directly by the Linux kernel.', techDef: 'Initial process executed by kernel; adopts orphaned processes, supervises cgroups.', badge: 'PID 1 (Init)', color: '#38bdf8' },
            { id: 'sd-units', label: 'Service Units (.service)', simpleDef: 'The configuration recipes defining how services run.', techDef: 'Declarative unit files located in /etc/systemd/system/ and /lib/systemd/system/.', badge: 'Unit Config', color: '#10b981' },
            { id: 'sd-daemons', label: 'Supervised Daemons (Nginx, DB)', simpleDef: 'Your background applications running in dedicated cgroups.', techDef: 'Processes tracked in systemd cgroups; monitored for unexpected SIGCHLD exit events.', badge: 'Live Services', color: '#a855f7' },
          ],
        },
        terms: [
          { term: 'systemctl enable vs start', simple: '"start" runs it right now; "enable" makes it boot automatically on next reboot.', technical: 'start initiates the service job immediately; enable creates symlinks in /etc/systemd/system/multi-user.target.wants/.', analogy: '"Start" turns on the stove; "Enable" sets your alarm clock for tomorrow morning.' },
          { term: 'systemctl daemon-reload', simple: 'Tells systemd to re-read service files after you edit them on disk.', technical: 'Forces systemd to rescan all unit files and re-generate the dependency graph.', analogy: 'Reloading a webpage after editing the HTML code.' },
          { term: 'Restart=always', simple: 'Directive telling systemd to immediately restart the service if it crashes.', technical: 'Supervision policy: if process exits with non-zero status or signal, systemd respawns it after RestartSec.', analogy: 'A punching dummy that bounces right back up when knocked down.' },
        ],
        whenToUse: [
          '✓ When starting, stopping, or restarting a service (sudo systemctl restart nginx)',
          '✓ When verifying if a service is healthy and checking its recent logs (systemctl status postgresql)',
          '✓ When configuring a service to start on system boot (sudo systemctl enable docker)',
        ],
        whenNotToUse: [
          '✕ Never run legacy "service nginx restart" or "/etc/init.d/nginx restart" on modern Linux (use systemctl)',
        ],
        syntaxCode: 'sudo systemctl enable --now nginx',
        syntaxTokens: [
          { token: 'systemctl', role: 'Command', explanation: 'Control the systemd system and service manager.' },
          { token: 'enable', role: 'Action', explanation: 'Configure service to start automatically on system boot.' },
          { token: '--now', role: 'Convenience Flag', explanation: 'Also start the service immediately right now in the same command.' },
          { token: 'nginx', role: 'Unit Name', explanation: 'Target service unit (nginx.service).' },
        ],
        variations: [
          { syntax: 'systemctl status nginx', title: 'Check Service Status', whatItDoes: 'Shows active status (active/running), PID, memory, and recent journal logs.', whenToUse: 'Triage when a service fails.' },
          { syntax: 'sudo systemctl restart nginx', title: 'Restart Service', whatItDoes: 'Stops and re-starts the process.', whenToUse: 'Applying new service configurations.' },
          { syntax: 'sudo systemctl reload nginx', title: 'Hot Reload', whatItDoes: 'Sends SIGHUP to reload config without dropping live client connections.', whenToUse: 'Zero-downtime Nginx config reloads.' },
          { syntax: 'systemctl is-active app', title: 'Script Health Check', whatItDoes: 'Prints "active" or "inactive" and returns exit code 0 if healthy.', whenToUse: 'Health check scripts.' },
        ],
        internalFlow: [
          { step: 1, title: 'CLI Sends D-Bus Message', desc: 'systemctl sends method call message to systemd over system D-Bus (/run/systemd/private).', why: 'Secure inter-process communication with PID 1.', techDetail: 'org.freedesktop.systemd1.Manager.StartUnit' },
          { step: 2, title: 'Resolve Dependency Graph', desc: 'systemd checks Requires= and After= directives, starting prerequisites first.', why: 'Ensures correct boot ordering.', techDetail: 'Traverses directed acyclic graph (DAG)' },
          { step: 3, title: 'Spawn Process in Dedicated cgroup', desc: 'systemd creates new Linux cgroup (/sys/fs/cgroup/system.slice/nginx.service) and forks process.', why: 'Isolates and tracks all child worker processes.', techDetail: 'clone() and writes PID into cgroup.procs' },
          { step: 4, title: 'Supervise & Monitor', desc: 'systemd listens for SIGCHLD signals to detect if process crashes.', why: 'Triggers automatic restart if configured.', techDetail: 'Monitors process state' },
        ],
        sandbox: {
          initialCommands: [
            'systemctl is-active cron',
            'systemctl status cron',
          ],
          guidedSteps: [
            { instruction: 'Check if the cron service is currently active', command: 'systemctl is-active cron', hint: 'Run systemctl is-active cron' },
            { instruction: 'View the detailed systemctl status output for cron', command: 'systemctl status cron', hint: 'Run systemctl status cron' },
          ],
          targetTask: 'Inspect system service status and lifecycle states.',
          solutionCommands: [
            'systemctl is-active cron',
            'systemctl status cron',
          ],
        },
        commonMistakes: [
          { mistake: 'Editing a service file in /etc/systemd/system/ and forgetting to run "systemctl daemon-reload".', whyWrong: 'systemd keeps service configurations in RAM; it will ignore your edits on disk until daemon-reload is executed!', correctWay: 'Always run "sudo systemctl daemon-reload" immediately after editing any .service file.' },
          { mistake: 'Using `systemctl enable` and assuming the service has also started running.', whyWrong: '`systemctl enable` only creates the boot symlink; it does NOT start the service in the current session unless you pass `--now`.', correctWay: 'Use `sudo systemctl enable --now <service>` to simultaneously start the service and enable it for system boot.' },
        ],
        challenge: {
          question: 'What does the "--now" flag do in the command "sudo systemctl enable --now app"?',
          options: [
            { label: 'It enables the service for boot AND starts it immediately in a single command', isCorrect: true, explanation: 'Correct! "enable --now" combines enable and start together.' },
            { label: 'It forces the service to start even if it has syntax errors', isCorrect: false, explanation: 'Incorrect.' },
            { label: 'It restarts the server immediately', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://www.freedesktop.org/software/systemd/man/systemctl.html',
          syntaxCheatSheet: [
            'systemctl status [UNIT]        # View state, PID, memory, and recent logs',
            'sudo systemctl start [UNIT]   # Start service now',
            'sudo systemctl stop [UNIT]    # Stop service',
            'sudo systemctl restart [UNIT] # Restart service',
            'sudo systemctl reload [UNIT]  # Hot-reload config without dropping traffic',
            'sudo systemctl enable --now [UNIT] # Enable on boot and start immediately',
            'sudo systemctl daemon-reload  # Re-read unit files after editing on disk',
          ],
          bestPractices: [
            'Always verify with "systemctl status [service]" after restarting to confirm it transitioned to "active (running)".',
          ],
        },
      },
      {
        id: 'c-systemd-custom-units',
        command: 'cat /etc/systemd/system/myapp.service',
        title: 'Authoring systemd Service Units',
        topicId: 'topic-10',
        topicNumber: '10',
        topicTitle: 'Systemd & Service Units',
        subtitle: 'Creating production-grade unit files with [Unit], [Service], [Install], User=, and Restart=always.',
        badges: ['Advanced', 'Systemd', 'Production'],
        quote: 'A clean 15-line systemd service unit turns any Python, Node.js, or Go script into an enterprise daemon.',
        difficulty: 'Advanced',
        whatIsIt: 'Authoring declarative `.service` unit files inside `/etc/systemd/system/`. A service unit defines dependencies (`[Unit]`), execution parameters, environment variables, working directories, unprivileged user identities, and restart policies (`[Service]`), and boot target hooks (`[Install]`).',
        inSimpleWords: 'When you build a Node.js or Python backend, you don\'t run it by typing `node server.js` in a terminal window. You write a small configuration file in `/etc/systemd/system/myapp.service` that tells Linux: "Run this app as user `appuser`, restart it if it crashes, and start it automatically when the computer boots."',
        whyDoYouNeedIt: 'Deploying custom microservices, background workers, and web applications reliably without relying on third-party process managers like PM2 or supervisor.',
        realWorldAnalogy: 'Writing a job description for a new employee: what time they report for duty (`After=network.target`), which uniform they wear (`User=appuser`), what tasks they perform (`ExecStart=...`), and what to do if they stumble (`Restart=always`).',
        withoutVsWith: {
          without: {
            title: 'WITHOUT STANDARDIZED SERVICE UNITS (Raw nohup or PM2)',
            items: [
              'Running custom web apps under screen or tmux sessions that vanish when the server reboots',
              'Apps run as root user because developers didn\'t know how to drop privileges',
              'No centralized log management: logs written to random un-rotated text files',
              'Third-party process managers add unnecessary memory overhead and security vulnerabilities',
            ],
            outcome: '💥 Services drop offline on reboot and run with dangerous root permissions',
          },
          with: {
            title: 'WITH NATIVE SYSTEMD SERVICE UNITS',
            items: [
              'Native kernel integration with zero third-party dependencies',
              'Enforce least-privilege: specify User=appuser and Group=appuser directly',
              'Automatic restart policies (Restart=always, RestartSec=3s)',
              'Standardized logging automatically streamed into journalctl',
            ],
            outcome: '🛡️ Enterprise-grade reliability, automated self-healing, and least-privilege security',
          },
        },
        blockDiagram: {
          title: 'systemd Service Unit Section Architecture',
          subtitle: 'Click any section to inspect declarative directives:',
          nodes: [
            { id: 'sec-unit', label: '[Unit] Section', simpleDef: 'Metadata and dependencies: Description, After=network.target.', techDef: 'Defines unit description and ordering dependencies in the boot DAG.', badge: '[Unit]', color: '#38bdf8' },
            { id: 'sec-service', label: '[Service] Section', simpleDef: 'Execution details: ExecStart, User, WorkingDirectory, Restart=always.', techDef: 'Configures process execution parameters, sandbox security flags, and supervision.', badge: '[Service]', color: '#10b981' },
            { id: 'sec-install', label: '[Install] Section', simpleDef: 'Boot attachment: WantedBy=multi-user.target.', techDef: 'Defines target dependency when enabled with systemctl enable.', badge: '[Install]', color: '#a855f7' },
          ],
        },
        terms: [
          { term: 'ExecStart', simple: 'The exact command and absolute path that launches your application.', technical: 'Mandatory directive specifying binary path and arguments (must use absolute paths, e.g. /usr/bin/node).', analogy: 'The starting ignition key.' },
          { term: 'WantedBy=multi-user.target', simple: 'Tells Linux to start this service when the system reaches normal multi-user operational mode.', technical: 'Creates symlink inside /etc/systemd/system/multi-user.target.wants/ upon enable.', analogy: 'Attaching an item to the daily morning checklist.' },
          { term: 'RestartSec=5s', simple: 'Waits 5 seconds before restarting the process after a crash.', technical: 'Backoff timer preventing rapid crash-loop spin from exhausting CPU.', analogy: 'Taking a 5-second breath before trying again.' },
        ],
        whenToUse: [
          '✓ When deploying custom web applications (Go, Node, Python, Java) as background services',
          '✓ When converting a shell script into an auto-starting system daemon',
          '✓ When applying memory or CPU quotas to a specific application service',
        ],
        whenNotToUse: [
          '✕ Never use relative paths in ExecStart (always use full paths like /usr/bin/python3, not just python3)',
        ],
        syntaxCode: '[Unit]\nDescription=My Web App\nAfter=network.target\n\n[Service]\nUser=appuser\nWorkingDirectory=/var/www/app\nExecStart=/usr/bin/node server.js\nRestart=always\nRestartSec=3\n\n[Install]\nWantedBy=multi-user.target',
        syntaxTokens: [
          { token: '[Unit]', role: 'Section', explanation: 'Defines description and ordering.' },
          { token: 'After=network.target', role: 'Directive', explanation: 'Wait for network stack to initialize before starting.' },
          { token: 'User=appuser', role: 'Security Directive', explanation: 'Run process as unprivileged user.' },
          { token: 'ExecStart=...', role: 'Execution', explanation: 'Absolute binary path and startup arguments.' },
          { token: 'Restart=always', role: 'Resilience', explanation: 'Auto-restart process if it crashes.' },
          { token: 'WantedBy=multi-user.target', role: 'Boot Hook', explanation: 'Standard multi-user runlevel target.' },
        ],
        variations: [
          { syntax: 'EnvironmentFile=/etc/myapp.env', title: 'Load Environment Variables', whatItDoes: 'Loads environment variables from file into service.', whenToUse: 'Injecting database secrets and port settings.' },
          { syntax: 'MemoryMax=512M', title: 'Enforce Memory Limit', whatItDoes: 'Caps service memory in cgroups v2; OOM kills only this service if exceeded.', whenToUse: 'Preventing memory leaks from crashing the server.' },
          { syntax: 'StandardOutput=journal', title: 'Stream Logs to journald', whatItDoes: 'Captures application stdout/stderr directly into journalctl.', whenToUse: 'Centralized log aggregation.' },
        ],
        internalFlow: [
          { step: 1, title: 'Admin Creates Unit File', desc: 'Writes unit configuration to /etc/systemd/system/myapp.service.', why: 'User-defined units override system defaults.', techDetail: 'File permissions 0644 owned by root:root' },
          { step: 2, title: 'Execute daemon-reload', desc: 'systemctl daemon-reload forces systemd to parse new unit file.', why: 'Compiles unit into active dependency graph.', techDetail: 'Parses INI format into internal unit structs' },
          { step: 3, title: 'systemctl enable Creates Symlink', desc: 'Creates symlink in /etc/systemd/system/multi-user.target.wants/myapp.service.', why: 'Hooks unit into multi-user.target boot tree.', techDetail: 'symlink() syscall' },
          { step: 4, title: 'systemctl start Launches Process', desc: 'systemd forks process under specified User= with clean cgroup.', why: 'Service is now active and supervised.', techDetail: 'setuid(appuser) and execve(ExecStart)' },
        ],
        sandbox: {
          initialCommands: [
            'cat << \'EOF\' > /tmp/sample.service\n[Unit]\nDescription=Demo Service\nAfter=network.target\n\n[Service]\nExecStart=/bin/sleep 3600\nRestart=always\n\n[Install]\nWantedBy=multi-user.target\nEOF',
            'cat /tmp/sample.service',
          ],
          guidedSteps: [
            { instruction: 'Generate a clean systemd service unit template', command: 'cat << \'EOF\' > /tmp/sample.service\n[Unit]\nDescription=Demo Service\nAfter=network.target\n\n[Service]\nExecStart=/bin/sleep 3600\nRestart=always\n\n[Install]\nWantedBy=multi-user.target\nEOF', hint: 'Generate template file' },
            { instruction: 'Inspect the generated unit file structure', command: 'cat /tmp/sample.service', hint: 'Run cat /tmp/sample.service' },
          ],
          targetTask: 'Author and examine declarative systemd service unit files.',
          solutionCommands: [
            'cat << \'EOF\' > /tmp/sample.service\n[Unit]\nDescription=Demo Service\nAfter=network.target\n\n[Service]\nExecStart=/bin/sleep 3600\nRestart=always\n\n[Install]\nWantedBy=multi-user.target\nEOF',
            'cat /tmp/sample.service',
          ],
        },
        commonMistakes: [
          { mistake: 'Using a relative path in ExecStart (e.g. "ExecStart=node index.js").', whyWrong: 'systemd does not use the user\'s $PATH variable; it will fail with "executable path is not absolute"!', correctWay: 'Always use full absolute paths: "ExecStart=/usr/bin/node /var/www/app/index.js".' },
          { mistake: 'Running background custom services as root without specifying User=.', whyWrong: 'If your application has a vulnerability, attackers immediately gain full root control of the host.', correctWay: 'Always define a dedicated non-root user (e.g. User=appuser).' },
        ],
        challenge: {
          question: 'Where should custom system-wide systemd service unit files be created on Linux?',
          options: [
            { label: '/etc/systemd/system/', isCorrect: true, explanation: 'Correct! /etc/systemd/system/ is the designated directory for administrator-created service units.' },
            { label: '/lib/systemd/system/', isCorrect: false, explanation: 'Incorrect. /lib/systemd/system/ is reserved for distro packages.' },
            { label: '/var/log/systemd/', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://www.freedesktop.org/software/systemd/man/systemd.service.html',
          syntaxCheatSheet: [
            '/etc/systemd/system/[NAME].service # Path for custom service units',
            'After=network.target             # Wait for network stack before starting',
            'User=[USERNAME]                   # Run service as non-root user',
            'Restart=always                    # Automatically restart on crash',
            'RestartSec=3s                     # Wait 3s before restart attempts',
            'sudo systemctl daemon-reload      # Reload units after editing file',
          ],
          bestPractices: [
            'Always specify Restart=always and RestartSec=3s to make your application resilient against transient crashes.',
          ],
        },
      },
      {
        id: 'c-systemd-journalctl',
        command: 'sudo journalctl -u nginx.service -f',
        title: 'Centralized Logging: journalctl',
        topicId: 'topic-10',
        topicNumber: '10',
        topicTitle: 'Systemd & Service Units',
        subtitle: 'Inspecting systemd journal logs by unit (-u), live streaming (-f), boot session (-b), and priority (-p err).',
        badges: ['Intermediate', 'Systemd', 'Logging'],
        quote: 'journalctl indexes structured binary logs, letting you filter millions of events by service or timestamp in milliseconds.',
        difficulty: 'Intermediate',
        whatIsIt: '`journalctl` is the query interface for `systemd-journald`, the centralized logging daemon in modern Linux. It captures kernel messages, service stdout/stderr, syslog events, and audit traces in an indexed, tamper-evident binary journal.',
        inSimpleWords: 'In the past, every program wrote to a different text file in `/var/log`. `journalctl` brings everything into one central, super-fast search engine. `journalctl -u nginx -f` lets you watch Nginx logs live, and `journalctl -p err -b` shows only the errors that happened since the last reboot.',
        whyDoYouNeedIt: 'Debugging why a service failed to start (`systemctl status` points you to `journalctl -xeu`), filtering logs by exact timestamps during outage forensics, and tracking kernel hardware events.',
        realWorldAnalogy: 'A centralized digital security database that logs badge swipes, video timestamps, and alarm triggers in a single searchable search engine, instead of flipping through paper logbooks.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT JOURNALCTL CENTRALIZATION',
            items: [
              'Hunting through 50 different text files in /var/log trying to find which service threw an error',
              'If a service crashes before writing to its log file, its crash trace is lost forever',
              'Cannot correlate kernel hardware panics with application service errors',
              'Manual rotation and compression required or text logs fill the disk',
            ],
            outcome: '⏳ Slow incident triage, scattered logs, and lost crash traces',
          },
          with: {
            title: 'WITH JOURNALCTL INDEXED LOGGING',
            items: [
              'journalctl -u [service] aggregates stdout, stderr, and systemd state transitions in one place',
              '-f provides real-time log streaming identical to tail -f',
              '-b filters logs strictly for the current boot session',
              '-p err instantly filters out noise, showing only errors and critical alerts',
            ],
            outcome: '⚡ Instant root-cause identification and unified full-system log correlation',
          },
        },
        blockDiagram: {
          title: 'systemd-journald Central Log Aggregation Architecture',
          subtitle: 'Click any component to inspect log ingestion and binary journal indexing:',
          nodes: [
            { id: 'jrn-src', label: 'Log Sources (stdout, syslog, kernel)', simpleDef: 'Application stdout/stderr, /dev/log syslog, and kernel dmesg.', techDef: 'Processes writing to stdout or /run/systemd/journal/socket UNIX datagram.', badge: 'Log Ingestion', color: '#38bdf8' },
            { id: 'jrn-daemon', label: 'systemd-journald Daemon', simpleDef: 'The centralized logging service.', techDef: 'Ingests logs, enriches with metadata (PID, UID, cgroup, timestamp), and compresses.', badge: 'Journal Daemon', color: '#10b981' },
            { id: 'jrn-store', label: 'Binary Journal Store (/var/log/journal)', simpleDef: 'Indexed, tamper-evident binary log files.', techDef: 'Memory-mapped binary journal files with CRC checksums and indexed fields.', badge: 'Binary Storage', color: '#a855f7' },
            { id: 'jrn-query', label: 'journalctl Query Tool', simpleDef: 'The CLI tool you use to search and filter logs.', techDef: 'Binary search over journal indices; outputs formatted text to pager.', badge: 'CLI Query', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'journalctl -u [service]', simple: 'Filters logs strictly for a specific service unit.', technical: 'Matches metadata field _SYSTEMD_UNIT=unit.service in binary journal index.', analogy: 'Filtering an inbox to show emails from a single person.' },
          { term: 'journalctl -xe', simple: 'Shows the end of the log with explanatory help text.', technical: '-x adds explanatory catalog messages; -e jumps to the end of the journal in less.', analogy: 'Opening the last page of a book with an explanation glossary attached.' },
          { term: 'journalctl -p err', simple: 'Filters for errors only (skips debug and info messages).', technical: 'Filters by syslog priority: 0 (emerg), 1 (alert), 2 (crit), 3 (err).', analogy: 'Setting an alert to notify you only when the fire alarm sounds.' },
        ],
        whenToUse: [
          '✓ When a service fails to start and systemctl tells you to check logs (journalctl -xeu [service])',
          '✓ When live streaming service logs during troubleshooting (journalctl -u [service] -f)',
          '✓ When checking for system errors since last boot (journalctl -p err -b)',
        ],
        whenNotToUse: [
          '✕ Never run plain "journalctl" without flags on a busy server (dumps gigabytes of history)',
        ],
        syntaxCode: 'sudo journalctl -u nginx.service -f --since "1 hour ago"',
        syntaxTokens: [
          { token: 'journalctl', role: 'Command', explanation: 'Query the systemd journal.' },
          { token: '-u nginx.service', role: 'Unit Filter', explanation: 'Only show logs from the nginx service.' },
          { token: '-f', role: 'Follow Flag', explanation: 'Live stream new entries in real time.' },
          { token: '--since "1 hour ago"', role: 'Time Filter', explanation: 'Filter events starting from 1 hour ago.' },
        ],
        variations: [
          { syntax: 'sudo journalctl -b', title: 'Current Boot Only', whatItDoes: 'Shows logs generated since the most recent system reboot.', whenToUse: 'Ignoring old historical logs.' },
          { syntax: 'sudo journalctl -p err -b', title: 'Errors Since Boot', whatItDoes: 'Filters for error-level messages since last boot.', whenToUse: 'Quick system health audits.' },
          { syntax: 'sudo journalctl --vacuum-size=1G', title: 'Clean Old Journal Logs', whatItDoes: 'Deletes oldest logs until journal size drops below 1GB.', whenToUse: 'Freeing up disk space in /var/log/journal.' },
        ],
        internalFlow: [
          { step: 1, title: 'Process Emits Log Line', desc: 'Application writes "Connection refused" to stdout or /dev/log.', why: 'Standard logging action.', techDetail: 'write(1, "...", len)' },
          { step: 2, title: 'journald Captures & Enriches', desc: 'systemd-journald receives log over UNIX socket; attaches PID, UID, unit name, and timestamp.', why: 'Creates structured log record.', techDetail: 'Appends metadata fields (_PID, _SYSTEMD_UNIT)' },
          { step: 3, title: 'Append to Binary Journal', desc: 'Writes compressed record to /var/log/journal/[machine-id]/system.journal.', why: 'Persists log with indexed fields.', techDetail: 'mmap() and zstd compression' },
          { step: 4, title: 'journalctl Queries Index', desc: 'journalctl queries index for _SYSTEMD_UNIT=nginx and outputs to pager.', why: 'Fast sub-millisecond retrieval.', techDetail: 'Pipes formatted text into less' },
        ],
        sandbox: {
          initialCommands: [
            'journalctl -n 10',
            'journalctl -u cron -n 5',
          ],
          guidedSteps: [
            { instruction: 'Inspect the last 10 entries in the system journal', command: 'journalctl -n 10', hint: 'Run journalctl -n 10' },
            { instruction: 'Filter specifically for the cron service logs', command: 'journalctl -u cron -n 5', hint: 'Run journalctl -u cron -n 5' },
          ],
          targetTask: 'Query and filter system logs using journalctl.',
          solutionCommands: [
            'journalctl -n 10',
            'journalctl -u cron -n 5',
          ],
        },
        commonMistakes: [
          { mistake: 'Running plain "journalctl" and getting overwhelmed by 2,000,000 lines of old logs.', whyWrong: 'Without filters, journalctl displays the entire history from the dawn of the system installation.', correctWay: 'Always use "-b" (current boot), "-n 50" (last 50 lines), or "-u [service]".' },
          { mistake: 'Forgetting to specify `-u` when querying service logs and grep-ing stdout instead.', whyWrong: 'Plain journalctl grep is slow and misses structured metadata fields indexed by systemd.', correctWay: 'Use indexed unit filters: `journalctl -u nginx --since "1 hour ago" -p err`.' },
        ],
        challenge: {
          question: 'Which journalctl command live streams new log lines from the Nginx service in real time?',
          options: [
            { label: 'sudo journalctl -u nginx -f', isCorrect: true, explanation: 'Correct! -u specifies the unit and -f follows newly appended lines in real time.' },
            { label: 'sudo journalctl --live nginx', isCorrect: false, explanation: 'Incorrect.' },
            { label: 'sudo journalctl -tail nginx', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://www.freedesktop.org/software/systemd/man/journalctl.html',
          syntaxCheatSheet: [
            'sudo journalctl -u [UNIT] -f    # Live follow logs for a service',
            'sudo journalctl -xeu [UNIT]    # View end of log with explanatory text',
            'sudo journalctl -b             # Show logs from current boot session only',
            'sudo journalctl -p err -b      # Show error-level logs from current boot',
            'sudo journalctl --since "1h ago" # Logs from the past hour',
            'sudo journalctl --vacuum-size=1G # Cap journal disk size to 1GB',
          ],
          bestPractices: [
            'When diagnosing a service crash, run "journalctl -xeu [service]" to see the exact exit code and crash error.',
          ],
        },
      },
    ],
  },

  // =========================================================================
  // TOPIC 11: PACKAGE MANAGEMENT & SOFTWARE INSTALLATION
  // =========================================================================
  {
    id: 'topic-11',
    number: '11',
    title: 'Package Management (apt, dnf)',
    iconName: 'Package',
    description: 'Debian/Ubuntu package management (apt, dpkg), RHEL/CentOS (dnf, rpm), and compiling from tarballs.',
    concepts: [
      {
        id: 'c-packages-apt-dpkg',
        command: 'sudo apt update && sudo apt install -y nginx',
        title: 'Debian & Ubuntu: apt & dpkg',
        topicId: 'topic-11',
        topicNumber: '11',
        topicTitle: 'Package Management (apt, dnf)',
        subtitle: 'Repository sources (/etc/apt/sources.list), package index caching, apt vs dpkg, and dependency resolution.',
        badges: ['Intermediate', 'Packages', 'Debian'],
        quote: 'apt update downloads the package index catalog; apt upgrade installs the newer software versions.',
        difficulty: 'Intermediate',
        whatIsIt: 'The package management suite for Debian and Ubuntu Linux: `apt` (Advanced Package Tool) is the high-level tool that resolves dependencies and downloads packages over HTTPS; `dpkg` is the low-level engine that actually unpacks and installs `.deb` files onto the filesystem.',
        inSimpleWords: '`apt` is the app store on your phone. When you say "install Nginx", `apt` checks the app catalog (`apt update`), downloads Nginx plus all the helper libraries it needs, and installs them all automatically. `dpkg` is the underlying tool that opens the box and places the files where they belong.',
        whyDoYouNeedIt: 'Installing development tools, automated security patching, maintaining Docker container packages, and managing software lifecycles.',
        realWorldAnalogy: 'Ordering a ready-to-assemble piece of furniture from an online store (`apt`): the store ensures all screws and tools are included in the shipment. The courier delivering and opening the box is `dpkg`.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT REPOSITORY PACKAGE MANAGEMENT',
            items: [
              'Must hunt down source code on GitHub and compile every single library manually',
              '"Dependency Hell": Library A requires Library B v1.2, but Library C requires Library B v1.4',
              'No automated security patches: software runs with known vulnerabilities for years',
              'Uninstalling leaves thousands of orphaned libraries cluttering the filesystem',
            ],
            outcome: '⏳ Days spent fighting dependency hell and zero security updates',
          },
          with: {
            title: 'WITH APT REPOSITORY AUTOMATION',
            items: [
              'One-line installation: apt install -y nginx resolves all 12 dependencies automatically',
              'Cryptographically signed repositories (GPG keys) prevent malware tampering',
              'apt upgrade patches hundreds of system security vulnerabilities in 2 minutes',
              'Clean uninstallation: apt autoremove purges unused orphaned dependencies',
            ],
            outcome: '⚡ Fast, secure, and automated software lifecycle management',
          },
        },
        blockDiagram: {
          title: 'apt and dpkg Architecture & Repository Flow',
          subtitle: 'Click any component to inspect package download and installation flow:',
          nodes: [
            { id: 'apt-repos', label: 'Remote Repositories (/etc/apt/sources.list)', simpleDef: 'Cloud servers hosting thousands of pre-compiled .deb packages.', techDef: 'Debian/Ubuntu mirror network serving InRelease, Packages.gz, and .deb files.', badge: 'Remote Repo', color: '#38bdf8' },
            { id: 'apt-cache', label: 'Local Package Cache (/var/lib/apt/lists)', simpleDef: 'The local catalog of available software downloaded by "apt update".', techDef: 'In-memory / on-disk cache populated by apt update containing version metadata.', badge: 'Local Index', color: '#10b981' },
            { id: 'apt-resolver', label: 'apt Dependency Solver', simpleDef: 'The smart engine calculating which libraries must be downloaded.', techDef: 'Computes directed dependency graph, resolving Conflicts, Depends, and Recommends.', badge: 'Dependency Engine', color: '#a855f7' },
            { id: 'dpkg-installer', label: 'dpkg Engine (/var/lib/dpkg/status)', simpleDef: 'The low-level installer writing files to disk.', techDef: 'Unpacks .deb ar/tar archive, runs preinst/postinst scripts, and records state in status database.', badge: 'dpkg Core', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'apt update vs apt upgrade', simple: '"update" refreshes the catalog of available versions; "upgrade" actually downloads and installs the updates.', technical: 'update downloads Release/Packages indexes from repositories; upgrade replaces packages with newer versions.', analogy: 'Downloading a new restaurant menu (update) vs actually eating the food (upgrade).' },
          { term: 'apt autoremove', simple: 'Removes unused helper libraries that were installed for apps you have since deleted.', technical: 'Purges packages marked as auto-installed that no longer have reverse dependencies.', analogy: 'Throwing away the instruction manual and packaging after building a desk.' },
          { term: 'dpkg -i', simple: 'Installs a local .deb file directly without checking online repositories.', technical: 'Low-level Debian package manager. Unpacks and configures local .deb file without dependency resolution.', analogy: 'Installing an app from a USB thumb drive.' },
        ],
        whenToUse: [
          '✓ When refreshing package lists before installing software (sudo apt update)',
          '✓ When installing packages non-interactively in scripts (sudo apt install -y curl git)',
          '✓ When querying which package owns a specific file on disk (dpkg -S /usr/bin/python3)',
        ],
        whenNotToUse: [
          '✕ Never run "apt install" in automation scripts without the "-y" flag (it will hang waiting for human confirmation)',
        ],
        syntaxCode: 'sudo apt update && sudo apt install -y nginx',
        syntaxTokens: [
          { token: 'apt update', role: 'Catalog Sync', explanation: 'Downloads latest package metadata from mirrors.' },
          { token: '&&', role: 'Operator', explanation: 'Only proceed if update succeeds.' },
          { token: 'apt install', role: 'Installer', explanation: 'Download and install package.' },
          { token: '-y', role: 'Non-interactive Flag', explanation: 'Automatically answer Yes to prompts.' },
          { token: 'nginx', role: 'Package Name', explanation: 'Target software package.' },
        ],
        variations: [
          { syntax: 'sudo apt upgrade -y', title: 'Upgrade All Packages', whatItDoes: 'Installs newest versions of all currently installed packages.', whenToUse: 'Security maintenance.' },
          { syntax: 'sudo apt autoremove -y', title: 'Clean Orphaned Packages', whatItDoes: 'Purges unneeded dependency packages.', whenToUse: 'Freeing disk space.' },
          { syntax: 'dpkg -l | grep nginx', title: 'Check If Installed', whatItDoes: 'Queries local dpkg database to check installed package version.', whenToUse: 'Package verification.' },
          { syntax: 'dpkg -L nginx', title: 'List Files in Package', whatItDoes: 'Lists every file and directory installed by the package.', whenToUse: 'Finding where config files were placed.' },
        ],
        internalFlow: [
          { step: 1, title: 'Fetch Release Index', desc: 'apt update fetches InRelease files over HTTPS and verifies GPG signature.', why: 'Guarantees package authenticity.', techDetail: 'gpgv validates repository signature' },
          { step: 2, title: 'Resolve Dependencies', desc: 'apt install parses dependency tree, finding required shared libraries (.so).', why: 'Guarantees application will not fail on missing libraries.', techDetail: 'Computes install plan' },
          { step: 3, title: 'Download .deb Archives', desc: 'Downloads packages into /var/cache/apt/archives/.', why: 'Stages files locally.', techDetail: 'HTTP GET with SHA256 checksum verification' },
          { step: 4, title: 'dpkg Unpacks & Configures', desc: 'dpkg extracts binaries into /usr/bin and configs into /etc, running post-install scripts.', why: 'Completes installation.', techDetail: 'Updates /var/lib/dpkg/status database' },
        ],
        sandbox: {
          initialCommands: [
            'dpkg -l | head -n 10',
            'which grep && dpkg -S $(which grep)',
          ],
          guidedSteps: [
            { instruction: 'Inspect the local dpkg installed packages table', command: 'dpkg -l | head -n 10', hint: 'Run dpkg -l | head -n 10' },
            { instruction: 'Find which package owns the grep binary using dpkg -S', command: 'which grep && dpkg -S $(which grep)', hint: 'Run which grep && dpkg -S $(which grep)' },
          ],
          targetTask: 'Query package metadata and ownership using dpkg.',
          solutionCommands: [
            'dpkg -l | head -n 10',
            'which grep && dpkg -S $(which grep)',
          ],
        },
        commonMistakes: [
          { mistake: 'Running "apt install" without running "apt update" first.', whyWrong: 'If your local package list is outdated, apt will try to download old package URLs that no longer exist on mirrors (HTTP 404 Not Found)!', correctWay: 'Always run "sudo apt update" before installing packages.' },
          { mistake: 'Using "apt" in scripts instead of "apt-get" or without "-y".', whyWrong: 'apt produces non-stable CLI warnings and prompts for user input, freezing automated CI/CD runners.', correctWay: 'Use "sudo apt-get install -y" or "apt-get install -qq -y" in scripts.' },
        ],
        challenge: {
          question: 'What is the primary difference between "apt" and "dpkg"?',
          options: [
            { label: 'apt handles remote repository downloads and dependency resolution; dpkg is the low-level tool that unpacks local .deb files', isCorrect: true, explanation: 'Correct! apt is the high-level manager with dependency resolution; dpkg is the low-level installer.' },
            { label: 'apt is for Red Hat; dpkg is for Ubuntu', isCorrect: false, explanation: 'Incorrect. Both are for Debian/Ubuntu.' },
            { label: 'dpkg has been replaced by npm', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://wiki.debian.org/Apt',
          syntaxCheatSheet: [
            'sudo apt update               # Refresh package index catalog',
            'sudo apt install -y [PKG]     # Install package with auto-yes',
            'sudo apt upgrade -y           # Upgrade all installed packages',
            'sudo apt remove [PKG]         # Uninstall package (keeps configs)',
            'sudo apt purge [PKG]          # Uninstall package AND delete configs',
            'dpkg -S /path/to/file         # Find which package owns a file',
            'dpkg -L [PKG]                 # List all files installed by package',
          ],
          bestPractices: [
            'In Dockerfiles, always combine update and install in a single layer: "apt-get update && apt-get install -y --no-install-recommends pkg && rm -rf /var/lib/apt/lists/*" to keep images minimal.',
          ],
        },
      },
      {
        id: 'c-packages-dnf-rpm',
        command: 'sudo dnf install -y nginx',
        title: 'Red Hat & Fedora: dnf & rpm',
        topicId: 'topic-11',
        topicNumber: '11',
        topicTitle: 'Package Management (apt, dnf)',
        subtitle: 'Enterprise RPM package management, repository configurations (/etc/yum.repos.d/), and dnf vs yum.',
        badges: ['Intermediate', 'Packages', 'RHEL'],
        quote: 'dnf is the modern, SAT-solver-powered package manager for the Red Hat enterprise ecosystem.',
        difficulty: 'Intermediate',
        whatIsIt: 'The package management suite for Red Hat Enterprise Linux (RHEL), Rocky Linux, AlmaLinux, and Fedora: `dnf` (Dandified YUM) is the high-level tool resolving dependencies using libsolv; `rpm` (Red Hat Package Manager) is the low-level engine that unpacks `.rpm` archives.',
        inSimpleWords: 'Just like Ubuntu uses `apt` to install `.deb` files, Red Hat systems use `dnf` to install `.rpm` files. The commands are almost identical (`dnf install -y nginx`), making it easy to transition between distros.',
        whyDoYouNeedIt: 'RHEL and its clones power over 70% of Fortune 500 enterprise servers and major enterprise Kubernetes distributions like OpenShift.',
        realWorldAnalogy: 'The metric system vs the imperial system: different measuring units (`.deb` vs `.rpm`), but both serve the exact same purpose of delivering packaged goods.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT MODERN DNF PACKAGE MANAGEMENT (Old YUM)',
            items: [
              'YUM had slow, memory-intensive Python dependency resolution that bogged down servers',
              'Poor performance when searching through enterprise repositories with 50,000+ packages',
              'Weak API for integration with automated infrastructure provisioning tools',
            ],
            outcome: '🐌 Sluggish package operations and high memory consumption on RHEL servers',
          },
          with: {
            title: 'WITH DNF SAT-SOLVER DEPENDENCY MANAGEMENT',
            items: [
              'C-based libsolv SAT algorithm resolves complex dependencies in milliseconds',
              'Built-in module streams (dnf module) allowing side-by-side versions of Node, Python, and DBs',
              'Transactional history rollback: undo problematic updates with "dnf history undo"',
              'Universal enterprise standard across RHEL, Rocky, Alma, and Amazon Linux 2023',
            ],
            outcome: '⚡ High-performance enterprise package lifecycle and transactional rollback safety',
          },
        },
        blockDiagram: {
          title: 'dnf and rpm Architecture & Repository Flow',
          subtitle: 'Click any component to inspect RHEL package resolution and RPM database:',
          nodes: [
            { id: 'dnf-repos', label: 'RPM Repositories (/etc/yum.repos.d/)', simpleDef: 'Enterprise cloud repositories serving RPMs and metadata.', techDef: 'repomd.xml and sqlite/zchunk metadata repositories signed by vendor GPG keys.', badge: 'YUM Repos', color: '#38bdf8' },
            { id: 'dnf-solver', label: 'dnf / libsolv Engine', simpleDef: 'The fast dependency calculator.', techDef: 'C-based boolean satisfiability (SAT) solver computing dependency transaction plan.', badge: 'libsolv SAT', color: '#10b981' },
            { id: 'rpm-db', label: 'RPM Database (/var/lib/rpm)', simpleDef: 'The local database tracking all installed software.', techDef: 'Berkeley DB / BDB/NDB database tracking every file, hash, and installed package.', badge: 'RPM Database', color: '#a855f7' },
          ],
        },
        terms: [
          { term: 'dnf vs yum', simple: 'dnf is the modern replacement for yum (faster, smarter dependency solving).', technical: 'dnf (YUM v4) replaced legacy YUM in RHEL 8 and RHEL 9; symlinked to yum for backward compatibility.', analogy: 'A smartphone replacing a flip phone.' },
          { term: 'dnf history undo', simple: 'Rolls back a package installation or update as if it never happened.', technical: 'Reverses transactions recorded in dnf history database, restoring previous package states.', analogy: 'Ctrl+Z for server software installations.' },
          { term: 'EPEL (Extra Packages for Enterprise Linux)', simple: 'The official Fedora community repository providing extra packages for RHEL/Rocky.', technical: 'High-quality add-on package repository for enterprise Linux (dnf install epel-release).', analogy: 'An expanded department store section with specialty items.' },
        ],
        whenToUse: [
          '✓ When provisioning RHEL, Rocky, AlmaLinux, or Amazon Linux 2023 servers (sudo dnf install -y [pkg])',
          '✓ When rolling back a failed package update (sudo dnf history undo last)',
          '✓ When installing community packages on RHEL (sudo dnf install -y epel-release)',
        ],
        whenNotToUse: [
          '✕ Never run dnf commands on Ubuntu or Debian systems (use apt)',
        ],
        syntaxCode: 'sudo dnf install -y nginx',
        syntaxTokens: [
          { token: 'dnf', role: 'Command', explanation: 'Next-generation package manager for RPM distributions.' },
          { token: 'install', role: 'Action', explanation: 'Install package and dependencies.' },
          { token: '-y', role: 'Non-interactive Flag', explanation: 'Answer yes to all prompts.' },
          { token: 'nginx', role: 'Package Name', explanation: 'Target RPM package.' },
        ],
        variations: [
          { syntax: 'sudo dnf check-update', title: 'Check Available Updates', whatItDoes: 'Lists available updates without installing them.', whenToUse: 'Security update audits.' },
          { syntax: 'sudo dnf update -y', title: 'Apply All Updates', whatItDoes: 'Updates all installed packages to latest versions.', whenToUse: 'Patch maintenance.' },
          { syntax: 'rpm -qa | grep nginx', title: 'Query All RPMs', whatItDoes: 'Queries RPM database for installed packages.', whenToUse: 'Fast local package verification.' },
          { syntax: 'rpm -ql nginx', title: 'List Files in RPM', whatItDoes: 'Lists all files installed by the package.', whenToUse: 'Finding binary and config paths.' },
        ],
        internalFlow: [
          { step: 1, title: 'Download repomd.xml', desc: 'dnf reads /etc/yum.repos.d/*.repo and downloads repository metadata.', why: 'Syncs package catalogue.', techDetail: 'Checks GPG signatures' },
          { step: 2, title: 'SAT Dependency Solving', desc: 'libsolv creates SAT equation representing all dependencies and resolves conflict-free plan.', why: 'Guarantees reliable dependency graph.', techDetail: 'C-based boolean satisfiability solver' },
          { step: 3, title: 'Download .rpm Payloads', desc: 'Fetches RPM packages into cache.', why: 'Prepares local files.', techDetail: 'Checksum verification via SHA256' },
          { step: 4, title: 'RPM Transaction Execution', desc: 'rpm unpacks files and commits transaction to /var/lib/rpm database.', why: 'Software is ready for execution.', techDetail: 'Atomic transaction commit' },
        ],
        sandbox: {
          initialCommands: [
            'echo "dnf package management standard on RHEL/Fedora/Rocky/Amazon Linux"',
            'rpm --version || echo "RPM package ecosystem"',
          ],
          guidedSteps: [
            { instruction: 'Verify package management ecosystem awareness', command: 'echo "dnf package management standard on RHEL/Fedora/Rocky/Amazon Linux"', hint: 'Run echo statement' },
            { instruction: 'Query RPM version if present', command: 'rpm --version || echo "RPM package ecosystem"', hint: 'Run rpm query' },
          ],
          targetTask: 'Understand the enterprise RPM and dnf package ecosystem.',
          solutionCommands: [
            'echo "dnf package management standard on RHEL/Fedora/Rocky/Amazon Linux"',
            'rpm --version || echo "RPM package ecosystem"',
          ],
        },
        commonMistakes: [
          { mistake: 'Trying to install Ubuntu .deb packages on RHEL using alien or manual extractions.', whyWrong: 'Library dependencies (glibc, systemd, libcrypto) have different names and ABI versions, causing runtime crashes.', correctWay: 'Always use native .rpm packages from official RHEL/EPEL repositories.' },
          { mistake: 'Installing third-party RPMs directly with `rpm -i` instead of `dnf install`.', whyWrong: 'Raw `rpm -i` does not automatically fetch or resolve required dependencies, leaving broken packages on disk.', correctWay: 'Always use `dnf install ./package.rpm` so dnf can fetch missing dependencies from configured repositories.' },
        ],
        challenge: {
          question: 'What powerful feature does "dnf history undo" provide on enterprise Linux systems?',
          options: [
            { label: 'It rolls back a previous package transaction (uninstalling packages installed in that transaction)', isCorrect: true, explanation: 'Correct! dnf tracks transactional history, allowing clean rollbacks.' },
            { label: 'It reverts Git commits in the home directory', isCorrect: false, explanation: 'Incorrect.' },
            { label: 'It restores the Linux kernel to factory default', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://dnf.readthedocs.io/en/latest/',
          syntaxCheatSheet: [
            'sudo dnf install -y [PKG]      # Install package and dependencies',
            'sudo dnf update -y            # Apply all system security updates',
            'sudo dnf remove [PKG]         # Uninstall package',
            'sudo dnf history list         # View past package transactions',
            'sudo dnf history undo [ID]    # Roll back a specific transaction',
            'rpm -qa                       # List all installed packages',
            'rpm -ql [PKG]                 # List all files installed by package',
          ],
          bestPractices: [
            'Enable EPEL on RHEL/Rocky servers (sudo dnf install epel-release) to access popular utilities like htop, nginx, and certbot.',
          ],
        },
      },
    ],
  },

  // =========================================================================
  // TOPIC 12: BASH SCRIPTING & AUTOMATION
  // =========================================================================
  {
    id: 'topic-12',
    number: '12',
    title: 'Bash Scripting & Cron',
    iconName: 'Code',
    description: 'Strict mode (set -euo pipefail), conditionals ($?), loops, functions, and automated cron scheduling.',
    concepts: [
      {
        id: 'c-bash-script-foundations',
        command: 'set -euo pipefail',
        title: 'Bash Foundations & Strict Mode',
        topicId: 'topic-12',
        topicNumber: '12',
        topicTitle: 'Bash Scripting & Cron',
        subtitle: 'The shebang (#!/bin/bash), variables, positional parameters ($1, $@), and defensive strict mode.',
        badges: ['Intermediate', 'Bash', 'Automation'],
        quote: 'Always add "set -euo pipefail" to the top of every production bash script to prevent silent catastrophic failures.',
        difficulty: 'Intermediate',
        whatIsIt: 'The architectural foundations of reliable Shell scripting: the shebang (`#!/usr/bin/env bash`), variable declaration, positional parameters (`$1`, `$2`, `$@`, `$#`), and the defensive "Unofficial Bash Strict Mode" (`set -euo pipefail`) that forces scripts to exit immediately upon encountering errors or uninitialized variables.',
        inSimpleWords: 'By default, Bash is careless: if line 2 of your script fails with a huge error, Bash ignores it and blindly executes line 3 anyway! `set -euo pipefail` forces Bash to act like a real programming language: if anything goes wrong, it stops immediately so it doesn\'t destroy your server.',
        whyDoYouNeedIt: 'Preventing disastrous bugs like `rm -rf $UNSET_VARIABLE/*` (which deletes `/` if the variable is blank), creating reliable CI/CD pipelines, and writing professional automation scripts.',
        realWorldAnalogy: 'A circuit breaker in a house. By default, a short circuit causes a fire. The circuit breaker (`set -e`) cuts power instantly the moment an electrical fault is detected, keeping your house safe.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT BASH STRICT MODE (Default Careless Bash)',
            items: [
              'A script fails to download an archive, but keeps running and tries to unpack an empty file',
              'A typo in a variable (e.g. $TARGT_DIR) causes rm -rf /* to wipe the root drive',
              'A failure in the first command of a pipeline is hidden because the last command exited with 0',
              'Silent errors lead to corrupt data in production databases',
            ],
            outcome: '🚨 Catastrophic accidental file deletion and silent pipeline failures',
          },
          with: {
            title: 'WITH DEFENSIVE STRICT MODE (set -euo pipefail)',
            items: [
              'set -e: Script exits immediately if ANY command returns a non-zero exit code',
              'set -u: Script crashes with an error if you reference an uninitialized variable',
              'set -o pipefail: Catches errors even if they occur inside pipelines (cmdA | cmdB)',
              'Standardized shebang (#!/usr/bin/env bash) ensures portable execution anywhere',
            ],
            outcome: '🛡️ Crash-safe scripts, immediate error visibility, and zero data loss',
          },
        },
        blockDiagram: {
          title: 'Bash Strict Mode (set -euo pipefail) Safety Boundary',
          subtitle: 'Click any safety flag to inspect its error-prevention mechanism:',
          nodes: [
            { id: 'bash-e', label: 'set -e (errexit)', simpleDef: 'Exits immediately if any command returns an error.', techDef: 'Causes shell to immediately exit if a pipeline returns non-zero status (unless handled in if/while).', badge: 'errexit', color: '#ef4444' },
            { id: 'bash-u', label: 'set -u (nounset)', simpleDef: 'Crashes if you use an undefined or blank variable.', techDef: 'Treats unset variables and parameters as an error when performing parameter expansion.', badge: 'nounset', color: '#f59e0b' },
            { id: 'bash-pipe', label: 'set -o pipefail', simpleDef: 'Catches errors inside pipes even if the last command succeeds.', techDef: 'Return value of pipeline is status of last command to exit with non-zero status.', badge: 'pipefail', color: '#a855f7' },
          ],
        },
        terms: [
          { term: 'Shebang (#!/usr/bin/env bash)', simple: 'The very first line of a script telling the operating system which interpreter to run.', technical: 'Kernel execve() reads first 2 bytes (0x23 0x21). Uses env in /usr/bin to locate bash in $PATH portably.', analogy: 'The label on a medicine bottle telling you which doctor wrote the prescription.' },
          { term: '$@ vs $1', simple: '$1 is the first argument; $@ represents ALL arguments passed to the script.', technical: 'Positional parameters. "$@" expands to separate quoted strings ("$1" "$2" ...), preserving spaces.', analogy: 'A roll call reading the first name vs all names on the list.' },
          { term: 'Exit Code ($?)', simple: 'The number a command gives back when it finishes: 0 means SUCCESS, anything else means ERROR.', technical: '8-bit status integer (0-255) returned by child process upon termination.', analogy: 'A thumbs up (0) or thumbs down (1-255).' },
        ],
        whenToUse: [
          '✓ At the very top of every single production bash script (set -euo pipefail)',
          '✓ When passing arguments into automated deployment scripts (SERVER_IP="$1")',
          '✓ When ensuring shell variables cannot cause accidental directory wipes',
        ],
        whenNotToUse: [
          '✕ Do not use set -e in interactive terminal sessions (it will close your terminal window if a command fails!)',
        ],
        syntaxCode: '#!/usr/bin/env bash\nset -euo pipefail\n\nAPP_NAME="${1:-myapp}"\necho "Deploying: ${APP_NAME}"',
        syntaxTokens: [
          { token: '#!/usr/bin/env bash', role: 'Shebang', explanation: 'Specifies the bash interpreter.' },
          { token: 'set -euo pipefail', role: 'Strict Mode', explanation: 'Enforce error exit, unset variable checks, and pipe error propagation.' },
          { token: '"${1:-myapp}"', role: 'Default Value', explanation: 'Uses argument 1, or defaults to "myapp" if not provided.' },
        ],
        variations: [
          { syntax: 'echo "Exit code: $?"', title: 'Check Exit Code', whatItDoes: 'Prints the return code of the most recently executed command.', whenToUse: 'Debugging command outcomes.' },
          { syntax: 'CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"', title: 'Self-Locating Script Path', whatItDoes: 'Determines the exact folder where the script itself lives.', whenToUse: 'Loading relative configuration files.' },
        ],
        internalFlow: [
          { step: 1, title: 'Kernel Reads Shebang', desc: 'Kernel execve() reads #! and spawns /usr/bin/env bash.', why: 'Loads correct interpreter.', techDetail: 'Bypasses default /bin/sh' },
          { step: 2, title: 'Apply Strict Mode Flags', desc: 'Bash sets internal flags errexit, nounset, and pipefail.', why: 'Arms safety boundaries.', techDetail: 'Updates shell internal flags structure' },
          { step: 3, title: 'Parameter Expansion', desc: 'Expands positional arguments ($1) with fallback defaults.', why: 'Validates inputs.', techDetail: 'Safe expansion' },
          { step: 4, title: 'Fault Interception', desc: 'If any command returns non-zero, trap triggers and script halts immediately.', why: 'Prevents damage cascade.', techDetail: 'exit(status)' },
        ],
        sandbox: {
          initialCommands: [
            'bash -c \'set -euo pipefail; echo "Safe Execution"; exit 0\'',
            'bash -c \'echo "Exit Code Test"; echo "Status: $?"\'',
          ],
          guidedSteps: [
            { instruction: 'Test bash strict mode execution in subshell', command: 'bash -c \'set -euo pipefail; echo "Safe Execution"; exit 0\'', hint: 'Run subshell test' },
            { instruction: 'Inspect the $? exit code variable', command: 'bash -c \'echo "Exit Code Test"; echo "Status: $?"\'', hint: 'Run exit code inspection' },
          ],
          targetTask: 'Understand bash strict mode and exit code reporting.',
          solutionCommands: [
            'bash -c \'set -euo pipefail; echo "Safe Execution"; exit 0\'',
            'bash -c \'echo "Exit Code Test"; echo "Status: $?"\'',
          ],
        },
        commonMistakes: [
          { mistake: 'Using unquoted variables like "rm -rf $DIR/*".', whyWrong: 'If $DIR is empty or contains spaces, this command turns into "rm -rf /*" or deletes unintended files!', correctWay: 'Always quote your variables: "rm -rf "${DIR:?}"/*" and use strict mode.' },
          { mistake: 'Omitting `set -o pipefail` in scripts with pipelines like `curl ... | grep ...`.', whyWrong: 'By default, bash returns the exit code of only the LAST command in a pipeline, concealing earlier failures.', correctWay: 'Always start mission-critical automation scripts with `set -euo pipefail`.' },
        ],
        challenge: {
          question: 'What does "set -u" do when placed in a bash script?',
          options: [
            { label: 'It causes the script to immediately exit with an error if any uninitialized variable is referenced', isCorrect: true, explanation: 'Correct! "nounset" treats empty/unset variable references as fatal errors.' },
            { label: 'It runs the script as the root user', isCorrect: false, explanation: 'Incorrect.' },
            { label: 'It uninstalls the bash package', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://www.gnu.org/software/bash/manual/bash.html',
          syntaxCheatSheet: [
            '#!/usr/bin/env bash   # Portable bash shebang',
            'set -euo pipefail     # Unofficial bash strict mode',
            '$?                    # Exit code of previous command (0 = success)',
            '$1, $2, ...           # Positional script arguments',
            '"$@"                  # All arguments as separate quoted words',
            '${VAR:-default}       # Use default value if VAR is unset',
          ],
          bestPractices: [
            'Add "set -euo pipefail" as the second line of every shell script you ever write.',
          ],
        },
      },
      {
        id: 'c-cron-scheduling',
        command: 'crontab -l',
        title: 'Task Scheduling: cron & crontab',
        topicId: 'topic-12',
        topicNumber: '12',
        topicTitle: 'Bash Scripting & Cron',
        subtitle: 'The 5-field cron time expression (minute, hour, dom, month, dow), crontab -e, and /etc/cron.*.',
        badges: ['Intermediate', 'Automation', 'Cron'],
        quote: 'Cron is the heartbeat of Linux server automation—running backups, certificate renewals, and cleanups on schedule.',
        difficulty: 'Intermediate',
        whatIsIt: 'The traditional Linux time-based job scheduler. The `cron` daemon (`crond` or `cron.service`) wakes up every minute to check `/etc/crontab` and user crontabs (`crontab -e`), executing scheduled commands according to a 5-field time format.',
        inSimpleWords: 'Cron is an automated alarm clock for commands. You say: "Run my backup script every night at 2:00 AM" (`0 2 * * * /backup.sh`), and the computer will faithfully wake up and run it every night without you touching a button.',
        whyDoYouNeedIt: 'Automating database backups, rotating logs, renewing Let\'s Encrypt SSL certificates (certbot renew), and purging temporary files.',
        realWorldAnalogy: 'Setting a recurring alarm on your phone: "Ring every Monday at 8:00 AM".',
        withoutVsWith: {
          without: {
            title: 'WITHOUT AUTOMATED TASK SCHEDULING',
            items: [
              'Human engineers must remember to log into servers manually at midnight to run backups',
              'SSL certificates expire because someone forgot the quarterly renewal date',
              'Log files grow indefinitely until disks fill and servers crash',
              'Database maintenance is skipped for months',
            ],
            outcome: '😵 Human forgetfulness, expired certificates, and lost backups',
          },
          with: {
            title: 'WITH CRON RECURRING AUTOMATION',
            items: [
              'Daily backups execute automatically at 2:00 AM when user traffic is lowest',
              'Certbot cron automatically renews SSL certificates before they expire',
              'Nightly cleanup scripts purge /tmp and old session files',
              'Consistent, automated system hygiene requiring zero human intervention',
            ],
            outcome: '⏰ 100% automated reliability, automated backups, and peace of mind',
          },
        },
        blockDiagram: {
          title: 'The 5-Field Cron Time Expression Anatomy',
          subtitle: 'Click any field to inspect its valid ranges and wildcards:',
          nodes: [
            { id: 'cron-min', label: 'Field 1: Minute (0-59)', simpleDef: 'The exact minute of the hour.', techDef: 'Integer 0-59, or */15 for every 15 minutes.', badge: 'Minute (0-59)', color: '#38bdf8' },
            { id: 'cron-hr', label: 'Field 2: Hour (0-23)', simpleDef: 'Hour of the day in 24-hour military time.', techDef: 'Integer 0-23 (0 = midnight, 14 = 2 PM).', badge: 'Hour (0-23)', color: '#10b981' },
            { id: 'cron-dom', label: 'Field 3: Day of Month (1-31)', simpleDef: 'Calendar day of the month.', techDef: 'Integer 1-31.', badge: 'DOM (1-31)', color: '#a855f7' },
            { id: 'cron-mon', label: 'Field 4: Month (1-12)', simpleDef: 'Month of the year.', techDef: 'Integer 1-12 or JAN-DEC.', badge: 'Month (1-12)', color: '#f59e0b' },
            { id: 'cron-dow', label: 'Field 5: Day of Week (0-6)', simpleDef: '0 = Sunday, 1 = Monday, ..., 6 = Saturday.', techDef: 'Integer 0-6 (or 7 for Sun) or SUN-SAT.', badge: 'DOW (0-6)', color: '#ef4444' },
          ],
        },
        terms: [
          { term: 'Asterisk (*)', simple: 'Means "every" or "any" (e.g. * in the month field means every month).', technical: 'Wildcard matching all valid values for that field.', analogy: 'An all-you-can-eat pass.' },
          { term: 'Step Operator (*/5)', simple: 'Means "every 5 units" (e.g. */5 in minute field means every 5 minutes).', technical: 'Step value: divides range by interval (0, 5, 10, 15...).', analogy: 'A metronome clicking every 5 seconds.' },
          { term: 'crontab -e', simple: 'The command used to edit your personal user crontab schedule safely.', technical: 'Opens user crontab in $EDITOR, validating syntax before placing it in /var/spool/cron/crontabs/.', analogy: 'Opening your personal digital calendar.' },
        ],
        whenToUse: [
          '✓ When scheduling nightly database backups (0 2 * * * /scripts/backup.sh)',
          '✓ When checking for security patches every Sunday night (0 3 * * 0 apt update)',
          '✓ When running health check pings every 5 minutes (*/5 * * * * /healthcheck.sh)',
        ],
        whenNotToUse: [
          '✕ Never assume cron has your user $PATH or environment variables (always use absolute paths inside cron commands!)',
        ],
        syntaxCode: '0 2 * * * /usr/local/bin/backup.sh > /var/log/backup.log 2>&1',
        syntaxTokens: [
          { token: '0 2', role: 'Time', explanation: 'Minute 0, Hour 2 (2:00 AM every night).' },
          { token: '* * *', role: 'Date', explanation: 'Every day of month, every month, every day of week.' },
          { token: '/usr/local/bin/backup.sh', role: 'Command', explanation: 'Absolute path to script.' },
          { token: '> /var/log/... 2>&1', role: 'Redirection', explanation: 'Capture output and errors.' },
        ],
        variations: [
          { syntax: 'crontab -l', title: 'List Crontab', whatItDoes: 'Prints current user\'s scheduled cron jobs.', whenToUse: 'Verifying scheduled tasks.' },
          { syntax: '*/15 * * * * /sync.sh', title: 'Every 15 Minutes', whatItDoes: 'Runs command every 15 minutes of every hour.', whenToUse: 'Frequent synchronization tasks.' },
          { syntax: '0 0 1 * * /report.sh', title: 'First of Every Month', whatItDoes: 'Runs at midnight on the 1st of each month.', whenToUse: 'Monthly reporting jobs.' },
        ],
        internalFlow: [
          { step: 1, title: 'cron Daemon Sleeps on Timer', desc: 'cron daemon sleeps on a 60-second timer, waking at the top of every minute.', why: 'Synchronizes with minute boundaries.', techDetail: 'sleep() until next minute boundary' },
          { step: 2, title: 'Scan Crontab Files', desc: 'Scans /var/spool/cron/crontabs and /etc/cron.d/ for jobs matching current time.', why: 'Evaluates time matrix.', techDetail: 'Compares min, hr, dom, mon, dow' },
          { step: 3, title: 'Fork Shell with Minimal Environment', desc: 'Forks /bin/sh with minimal environment ($HOME, $USER, $SHELL, minimal $PATH=/usr/bin:/bin).', why: 'Isolates execution environment.', techDetail: 'setuid(owner) and execve("/bin/sh")' },
          { step: 4, title: 'Execute Command & Mail Output', desc: 'Executes command; if output is not redirected, mails output to local mailbox.', why: 'Completes job.', techDetail: 'Output to pipe /usr/lib/sendmail' },
        ],
        sandbox: {
          initialCommands: [
            'crontab -l || echo "No crontab for current user"',
            'ls -la /etc/cron.*',
          ],
          guidedSteps: [
            { instruction: 'List the active user crontab schedule', command: 'crontab -l || echo "No crontab for current user"', hint: 'Run crontab -l' },
            { instruction: 'Inspect the system cron directories in /etc', command: 'ls -la /etc/cron.*', hint: 'Run ls -la /etc/cron.*' },
          ],
          targetTask: 'Inspect cron configuration files and scheduled tasks.',
          solutionCommands: [
            'crontab -l || echo "No crontab for current user"',
            'ls -la /etc/cron.*',
          ],
        },
        commonMistakes: [
          { mistake: 'Using relative commands like "python3 script.py" in crontab.', whyWrong: 'cron runs with a barebones $PATH and does not know where your script or python binary lives!', correctWay: 'Always use full absolute paths: "/usr/bin/python3 /home/user/script.py".' },
          { mistake: 'Forgetting to redirect output in crontab entries.', whyWrong: 'Un-redirected output causes cron to try sending local email, clogging mail queues.', correctWay: 'Always append "> /path/to/log.log 2>&1" or "> /dev/null 2>&1".' },
        ],
        challenge: {
          question: 'What exact schedule does the cron expression "*/10 * * * *" represent?',
          options: [
            { label: 'Every 10 minutes, all day, every day', isCorrect: true, explanation: 'Correct! Step operator */10 in the minute field runs at minute 0, 10, 20, 30, 40, 50.' },
            { label: 'At 10:00 AM once a day', isCorrect: false, explanation: 'Incorrect. That would be "0 10 * * *".' },
            { label: 'On the 10th day of every month', isCorrect: false, explanation: 'Incorrect. That would be "* * 10 * *".' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man5/crontab.5.html',
          syntaxCheatSheet: [
            'crontab -l            # List scheduled jobs for current user',
            'crontab -e            # Edit scheduled jobs with syntax checking',
            'crontab -r            # Delete entire crontab (CAUTION)',
            '* * * * *             # Every minute',
            '0 * * * *             # Every hour on the hour',
            '0 0 * * *             # Every midnight',
            '0 0 * * 0             # Every Sunday at midnight',
          ],
          bestPractices: [
            'Always define explicit paths in cron: "PATH=/usr/local/bin:/usr/bin:/bin" at the top of your crontab.',
          ],
        },
      },
    ],
  },
];
