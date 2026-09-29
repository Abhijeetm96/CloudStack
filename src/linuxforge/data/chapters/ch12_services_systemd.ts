import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 12: SERVICES AND SYSTEMD (12.1 to 12.14)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_12: LinuxTopic = {
  id: 'ch-12',
  number: '12',
  title: 'Services and systemd',
  iconName: 'Server',
  description: 'Master systemd: PID 1, systemctl control commands, unit files, boot targets, journalctl logging, and service troubleshooting.',
  concepts: [
    buildLinuxConcept({
      id: 'c-12-01',
      subChapterNumber: '12.1',
      command: 'systemctl list-units --type=service',
      title: 'What is a Service?',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Background daemons running silently without an attached user terminal to provide persistent capabilities',
      badges: ['Services', 'Daemons', 'Core'],
      difficulty: 'Beginner',
      quote: 'A service (daemon) is a background sentinel that runs silently, listening for events even when no human is logged in.',
      whatIsIt: 'A Service (traditionally called a Daemon in Unix) is a long-running background process that operates detached from any controlling interactive terminal. Daemons typically end with the letter "d" (sshd, systemd, crond, dockerd). They start during system boot, listen for incoming network connections or timer triggers, handle background requests, and automatically restart if they crash.',
      inSimpleWords: 'When you close your laptop or log out of SSH, your terminal session dies. But a Service is immortal: it keeps running in the background 24 hours a day, 365 days a year, serving web pages or answering database queries.',
      whyDoYouNeedIt: 'Web servers (Nginx), databases (PostgreSQL), SSH servers (sshd), and background workers must stay alive continuously regardless of which users log in or out.',
      realWorldScenario: 'You are hosting an API. If you run "node server.js" directly in your terminal, the API dies the second you close your laptop. Managing it as a systemd Service ensures it starts automatically on server boot, restarts if it crashes, and runs silently in the background.',
      realWorldAnalogy: 'The central heating furnace in an apartment building. Nobody sits in the basement watching it; it runs automatically in the background to provide continuous warmth.',
      withoutVsWith: {
        without: {
          title: 'Managing Programs Without Services',
          items: ['Programs die whenever an SSH terminal session disconnects', 'Manual human reboot required whenever a program crashes', 'No standardized log aggregation or dependency management'],
          outcome: 'Unreliable applications, downtime on server reboots, and high manual maintenance.'
        },
        with: {
          title: 'Managing Programs With systemd Services',
          items: ['Automatic background execution decoupled from user sessions', 'Automated crash restarts with Restart=always and backoff timers', 'Ordered startup dependencies (e.g. wait for network before starting web server)'],
          outcome: 'Production high availability, self-healing architecture, and enterprise reliability.'
        }
      },
      blockDiagram: {
        title: 'Linux Service Supervision Architecture',
        subtitle: 'PID 1 systemd lifecycle management:',
        nodes: [
          { id: 'systemd', label: 'systemd (PID 1)', simpleDef: 'Master process supervisor', techDef: 'Init system orchestrating cgroups and sockets', badge: 'Supervisor', color: '#38bdf8' },
          { id: 'cgroup', label: 'Service Control Group', simpleDef: 'Sandbox tracking all child worker processes', techDef: 'cgroup v2 slice isolating CPU and memory', badge: 'cgroup', color: '#a855f7' },
          { id: 'workers', label: 'Worker Daemons', simpleDef: 'Nginx, PostgreSQL, Docker', techDef: 'Detached background process execution', badge: 'Daemons', color: '#10b981' },
          { id: 'journal', label: 'systemd-journald', simpleDef: 'Captures all stdout/stderr from service', techDef: 'Structured binary journal logging', badge: 'Logs', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Daemon', simple: 'A background process ending in "d" with no controlling terminal.', technical: 'Process running in its own session (setsid) with stdio redirected to /dev/null or journal.' },
        { term: 'cgroup (Control Group)', simple: 'How systemd tracks all processes belonging to a service so none escape.', technical: 'Linux kernel subsystem grouping process hierarchy for resource accounting.' }
      ],
      syntaxCode: 'systemctl list-units --type=service',
      syntaxTokens: [
        { token: 'systemctl', role: 'command', explanation: 'Control the systemd system and service manager' },
        { token: 'list-units', role: 'argument', explanation: 'List loaded systemd units in memory' },
        { token: '--type=service', role: 'flag', explanation: 'Filter specifically to service unit types (.service)' }
      ],
      variations: [
        { syntax: 'systemctl list-units --type=service --state=running', title: 'Running Services Only', whatItDoes: 'Filters to show only active currently running services', whenToUse: 'Auditing active background services' },
        { syntax: 'systemctl list-unit-files --type=service', title: 'Installed Service Files', whatItDoes: 'Lists all service files on disk and whether they are enabled for boot', whenToUse: 'Boot audit' }
      ],
      beforeAfter: {
        before: '$ systemctl is-active nginx\n[Checking service state...]',
        after: 'active\n[Nginx daemon is running in the background]',
        explanation: 'Confirms Nginx service is actively running and supervised by systemd.'
      },
      expectedOutput: 'nginx.service loaded active running A high performance web server',
      whatChanges: ['Reads active systemd unit states.'],
      whatDoesNotChange: ['Services continue running uninterrupted.'],
      safeRecovery: '100% safe read-only inspection.',
      commonMistakes: [
        { mistake: 'Running background processes using "nohup cmd &" in production instead of creating a systemd service', whyItHappens: 'Quick shortcut to keep a command alive.', howToFix: 'nohup does not auto-restart on crashes or survive server reboots; always write a proper systemd service file.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-12-02',
      subChapterNumber: '12.2',
      command: 'systemctl --version',
      title: 'systemd',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'The modern Linux init system and service supervisor running as PID 1',
      badges: ['systemd', 'Init', 'Core'],
      difficulty: 'Beginner',
      quote: 'systemd replaced 30-year-old SysVinit shell scripts with parallelized boot and cgroup supervision.',
      whatIsIt: 'systemd is the modern software suite that provides an init system and service manager for Linux, running as Process ID 1 (PID 1). Created by Lennart Poettering and Kay Sievers, systemd replaced legacy SysVinit scripts with parallel service startup, socket-activated on-demand daemons, aggressive cgroup process tracking, declarative unit configuration files, and unified binary logging (journald).',
      inSimpleWords: 'systemd is the master conductor of the Linux operating system. When the kernel boots up, it starts systemd. Systemd then turns on networking, mounts your hard drives, starts the firewall, launches the SSH server, and supervises all background programs.',
      whyDoYouNeedIt: 'Over 99% of modern Linux distributions (Ubuntu, Debian, RHEL, CentOS, Fedora, Arch, SUSE) use systemd. Mastering it is mandatory for system administration.',
      realWorldScenario: 'A server boots. In older Linux (SysVinit), services started sequentially one-by-one, taking 60 seconds to boot. With systemd, disk, network, and independent services start in parallel across multiple CPU cores, booting the server in 4 seconds.',
      realWorldAnalogy: 'The master property manager of an office building who turns on the master power grid, unlocks all doors, verifies safety systems, and oversees building maintenance.',
      terms: [
        { term: 'Init System (PID 1)', simple: 'The very first program started by the Linux kernel.', technical: 'The root of the process tree adopting orphaned child processes and handling SIGCHLD.' },
        { term: 'Socket Activation', simple: 'Starting a service only when the first network packet arrives.', technical: 'Systemd binds listening socket early; on first connect, spawns daemon and passes open fd.' }
      ],
      syntaxCode: 'systemctl [COMMAND] [UNIT]',
      syntaxTokens: [
        { token: 'systemctl', role: 'command', explanation: 'Primary CLI interface for inspecting and controlling systemd' },
        { token: '--version', role: 'flag', explanation: 'Print systemd version and compiled features' }
      ],
      variations: [
        { syntax: 'systemd-analyze', title: 'Analyze Boot Speed', whatItDoes: 'Reports exact seconds spent in kernel, initrd, and userspace during boot', whenToUse: 'When optimizing server startup times' },
        { syntax: 'systemd-analyze blame', title: 'Identify Slowest Boot Services', whatItDoes: 'Ranks services by how many seconds each took to initialize during boot', whenToUse: 'Diagnosing slow boot times' }
      ],
      beforeAfter: {
        before: '$ systemctl --version | head -n 2\n[Querying systemd version...]',
        after: 'systemd 255 (255.4-1ubuntu8.4)\n+PAM +AUDIT +SELINUX +APPARMOR +CGROUP_V2',
        explanation: 'Reports systemd release version and active compiled kernel integration flags.'
      },
      expectedOutput: 'systemd 255',
      whatChanges: ['Outputs version metadata.'],
      whatDoesNotChange: ['System remains intact.'],
      safeRecovery: 'Non-destructive.',
      commonMistakes: [
        { mistake: 'Trying to kill PID 1 with "kill -9 1"', whyItHappens: 'Testing limits of root.', howToFix: 'The Linux kernel explicitly ignores SIGKILL directed at PID 1; systemd cannot be accidentally killed.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-12-03',
      subChapterNumber: '12.3',
      command: 'systemctl status nginx',
      title: 'systemctl',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'The primary command-line tool for controlling the systemd system and service manager',
      badges: ['systemctl', 'Admin', 'Core'],
      difficulty: 'Beginner',
      quote: 'systemctl is your universal control steering wheel for services: start, stop, restart, enable, disable, and status.',
      whatIsIt: 'systemctl is the primary command-line utility used to introspect and control the state of systemd. It communicates with the systemd PID 1 daemon over the system D-Bus IPC bus, sending instructions to start, stop, reload, restart, enable, disable, mask, and query the status of system units.',
      inSimpleWords: 'Whenever you want to do anything with a background service in Linux, you type "systemctl". Want to start Nginx? "systemctl start nginx". Want to check if it is running? "systemctl status nginx".',
      whyDoYouNeedIt: 'It standardizes service management across all modern Linux distributions. You don\'t need separate tools for different services; systemctl controls everything uniformly.',
      realWorldScenario: 'You deploy a new configuration to a PostgreSQL database. You need to verify its health. You type "systemctl status postgresql". In one screen, it tells you if it is active, its PID, its memory usage, and recent log lines.',
      realWorldAnalogy: 'The master remote control that can turn on, turn off, or check the settings of every device in your home theater.',
      terms: [
        { term: 'D-Bus', simple: 'The message highway systemd uses to communicate between CLI tools and PID 1.', technical: 'Inter-process communication bus (/run/dbus/system_bus_socket) delivering RPC calls to org.freedesktop.systemd1.' }
      ],
      syntaxCode: 'systemctl [ACTION] [UNIT_NAME]',
      syntaxTokens: [
        { token: 'systemctl', role: 'command', explanation: 'Systemd control interface' },
        { token: 'status', role: 'argument', explanation: 'Action verb (start, stop, restart, status, enable, disable)' },
        { token: 'nginx', role: 'argument', explanation: 'Target unit name (.service extension optional)' }
      ],
      variations: [
        { syntax: 'systemctl daemon-reload', title: 'Reload Systemd Manager Config', whatItDoes: 'Re-reads all unit files from disk after you edit a .service file', whenToUse: 'Mandatory after editing service files' },
        { syntax: 'systemctl is-active ssh', title: 'Script Status Check', whatItDoes: 'Outputs "active" or "inactive" with exit code 0 or 3', whenToUse: 'Automated health check scripts' }
      ],
      beforeAfter: {
        before: '$ systemctl is-active docker\n[Checking state...]',
        after: 'active',
        explanation: 'Confirms Docker engine daemon is active and healthy.'
      },
      expectedOutput: 'active',
      whatChanges: ['Sends DBus RPC query to PID 1.'],
      whatDoesNotChange: ['Service state is unchanged in query mode.'],
      safeRecovery: '100% safe query command.',
      commonMistakes: [
        { mistake: 'Editing a .service file and wondering why systemctl ignores the changes', whyItHappens: 'systemd caches unit files in memory.', howToFix: 'You must run "sudo systemctl daemon-reload" to reload unit files into memory.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-12-04',
      subChapterNumber: '12.4',
      command: 'sudo systemctl start nginx',
      title: 'Start Service',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Activate and launch a stopped service in the background immediately',
      badges: ['systemctl', 'Start', 'Admin'],
      difficulty: 'Beginner',
      quote: 'start launches the service RIGHT NOW; enable configures it to start on BOOT.',
      whatIsIt: 'systemctl start activates the specified service unit immediately in the current running session. Systemd resolves all dependencies defined in the unit file (After=, Requires=, Wants=), starts required prerequisites, sets up cgroups, executes the ExecStart= binary, and monitors its process ID.',
      inSimpleWords: '"systemctl start nginx" is like pressing the power button on the web server right now. It wakes up and starts serving pages immediately.',
      whyDoYouNeedIt: 'You need start to launch installed services, recover stopped daemons, and test new applications.',
      realWorldScenario: 'You install Redis on a server: "sudo apt install redis-server". The service is installed but currently stopped. You launch it immediately with: "sudo systemctl start redis".',
      realWorldAnalogy: 'Turning the ignition key in a car to start the engine.',
      terms: [
        { term: 'ExecStart', simple: 'The exact binary command line executed to start the service.', technical: 'Directive in [Service] section specifying absolute binary path and startup flags.' }
      ],
      syntaxCode: 'sudo systemctl start [UNIT]',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Root privileges' },
        { token: 'systemctl start', role: 'command', explanation: 'Activate unit immediately' },
        { token: 'nginx', role: 'argument', explanation: 'Target service unit name' }
      ],
      variations: [
        { syntax: 'sudo systemctl start service1 service2', title: 'Start Multiple Services', whatItDoes: 'Starts both services simultaneously', whenToUse: 'Multi-service deployment' }
      ],
      beforeAfter: {
        before: '$ systemctl is-active nginx\ninactive\n$ sudo systemctl start nginx',
        after: '$ systemctl is-active nginx\nactive',
        explanation: 'Service state transitioned from inactive to active.'
      },
      expectedOutput: '[Service started silently with exit status 0]',
      whatChanges: ['Spawns service process within new systemd cgroup slice.'],
      whatDoesNotChange: ['Boot persistence is NOT set (use enable for boot persistence).'],
      safeRecovery: 'Stop service anytime with "sudo systemctl stop unit".',
      commonMistakes: [
        { mistake: 'Assuming "systemctl start" configures the service to start automatically after a reboot', whyItHappens: 'Confusing "start" (now) with "enable" (boot persistence).', howToFix: 'Use "systemctl enable --now service" to BOTH start now and enable on boot.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-12-05',
      subChapterNumber: '12.5',
      command: 'sudo systemctl stop nginx',
      title: 'Stop Service',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Gracefully deactivate and terminate a running service and its subordinate processes',
      badges: ['systemctl', 'Stop', 'Admin'],
      difficulty: 'Beginner',
      quote: 'systemctl stop sends SIGTERM to the entire cgroup: no rogue child processes escape.',
      whatIsIt: 'systemctl stop deactivates a running service. Systemd executes any ExecStop= commands configured in the unit file, sends SIGTERM (or KillSignal=) to all processes in the service\'s control group (cgroup), waits for TimeoutStopSec= (default 90s) for graceful shutdown, and escalates to SIGKILL if processes refuse to terminate.',
      inSimpleWords: 'Typing "systemctl stop nginx" gracefully shuts down the web server. It tells all worker processes to finish what they are doing and exit cleanly.',
      whyDoYouNeedIt: 'You need stop during maintenance windows, before upgrading databases, or to free up system memory and network ports.',
      realWorldScenario: 'You are performing a major upgrade on a PostgreSQL database. To prevent incoming write transactions from corrupting tables during the file migration, you stop the database: "sudo systemctl stop postgresql".',
      realWorldAnalogy: 'Turning off an industrial machine at the end of the shift.',
      terms: [
        { term: 'TimeoutStopSec', simple: 'The grace period systemd gives a service to shut down before killing it.', technical: 'Configurable unit timeout (default 90 seconds) before sending SIGKILL.' }
      ],
      syntaxCode: 'sudo systemctl stop [UNIT]',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Root privileges' },
        { token: 'systemctl stop', role: 'command', explanation: 'Deactivate service unit' },
        { token: 'nginx', role: 'argument', explanation: 'Target service name' }
      ],
      variations: [
        { syntax: 'sudo systemctl kill nginx', title: 'Send Signal Directly', whatItDoes: 'Sends a signal (default SIGTERM) to all processes in the service cgroup without stopping the unit state', whenToUse: 'Advanced process signaling' }
      ],
      beforeAfter: {
        before: '$ systemctl is-active nginx\nactive\n$ sudo systemctl stop nginx',
        after: '$ systemctl is-active nginx\ninactive',
        explanation: 'Service was cleanly stopped and removed from the active process table.'
      },
      expectedOutput: '[Service stopped cleanly]',
      whatChanges: ['Terminates processes in service cgroup and marks unit inactive.'],
      whatDoesNotChange: ['Boot enable status is unchanged.'],
      safeRecovery: 'Restart with "sudo systemctl start unit".',
      commonMistakes: [
        { mistake: 'Killing the service PID with "kill -9" instead of "systemctl stop"', whyItHappens: 'Not knowing systemd is supervising the process.', howToFix: 'If Restart=always is configured, systemd will IMMEDIATELY restart the process! Always use "systemctl stop".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-12-06',
      subChapterNumber: '12.6',
      command: 'sudo systemctl restart nginx',
      title: 'Restart Service',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Stop and immediately reactivate a service: restart vs reload tradeoffs',
      badges: ['systemctl', 'Restart', 'Admin'],
      difficulty: 'Beginner',
      quote: 'restart drops all active client connections; reload applies new configs with ZERO downtime.',
      whatIsIt: 'systemctl restart completely stops the service and immediately starts it again. This terminates all active connections, clears in-memory caches, and reads new configuration files from scratch. For web servers and proxies that support graceful in-place configuration reloading, "systemctl reload" should be preferred over restart to prevent dropping live client traffic.',
      inSimpleWords: '"restart" turns the machine completely off and right back on again. It is great when software is stuck, but drops any active users connected at that moment.',
      whyDoYouNeedIt: 'You need restart after major software updates, when clearing frozen memory states, or after updating settings that cannot be dynamically reloaded.',
      realWorldScenario: 'You updated the listening port in Nginx configuration. You test the syntax with "nginx -t". Because port changes require rebinding network sockets, reload is insufficient; you execute "sudo systemctl restart nginx".',
      realWorldAnalogy: 'Power-cycling a home Wi-Fi router.',
      terms: [
        { term: 'Reload vs Restart', simple: 'Reload reads configs with zero downtime; restart kills all connections and reboots.', technical: 'Reload sends SIGHUP or ExecReload without killing master process; restart invokes ExecStop then ExecStart.' }
      ],
      syntaxCode: 'sudo systemctl restart [UNIT]',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Root privileges' },
        { token: 'systemctl restart', role: 'command', explanation: 'Stop and start unit' },
        { token: 'nginx', role: 'argument', explanation: 'Target service' }
      ],
      variations: [
        { syntax: 'sudo systemctl reload nginx', title: 'Zero Downtime Graceful Reload', whatItDoes: 'Applies new configs without dropping active client HTTP connections', whenToUse: 'Standard production configuration changes' },
        { syntax: 'sudo systemctl reload-or-restart nginx', title: 'Smart Reload or Restart', whatItDoes: 'Attempts reload if supported; falls back to restart if reload fails', whenToUse: 'Automated deployment pipelines' }
      ],
      beforeAfter: {
        before: '$ ps -o pid,comm -C nginx\n 1402 nginx\n$ sudo systemctl restart nginx',
        after: '$ ps -o pid,comm -C nginx\n 1940 nginx',
        explanation: 'The old process was terminated and a fresh instance was spawned with new PID 1940.'
      },
      expectedOutput: '[Service restarted successfully]',
      whatChanges: ['Terminates old process and spawns new PID.'],
      whatDoesNotChange: ['Boot enable status is untouched.'],
      safeRecovery: 'If service fails to start after restart, check logs with "journalctl -u unit -e".',
      commonMistakes: [
        { mistake: 'Restarting a web server during peak business hours instead of reloading', whyItHappens: 'Habit of typing restart.', howToFix: 'Always use "systemctl reload" for web servers and proxies to prevent dropping live users!' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-12-07',
      subChapterNumber: '12.7',
      command: 'sudo systemctl enable nginx',
      title: 'Enable Service',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Configure a service to launch automatically during system boot by creating target symlinks',
      badges: ['systemctl', 'Enable', 'Boot'],
      difficulty: 'Beginner',
      quote: 'systemctl enable does not start the service right now; it creates a symlink so it boots next time.',
      whatIsIt: 'systemctl enable configures a service to start automatically during system boot. It does this by reading the [Install] section of the unit file (e.g. WantedBy=multi-user.target) and creating a symbolic link in "/etc/systemd/system/multi-user.target.wants/" pointing to the unit file in "/lib/systemd/system/".',
      inSimpleWords: 'Enabling a service is setting an alarm clock. It tells Linux: "Every time the computer turns on in the morning, start this service automatically".',
      whyDoYouNeedIt: 'If a server reboots unexpectedly due to a power outage or kernel patch, you want your database, web server, and monitoring agents to come back online automatically without human intervention.',
      realWorldScenario: 'You set up a new production database server. You start it with "systemctl start postgresql". Two weeks later, the cloud provider reboots the host for hardware maintenance. The database does NOT start because you forgot to "enable" it! Always run "systemctl enable postgresql".',
      realWorldAnalogy: 'Adding an application to the "Startup Programs" list in Windows settings.',
      terms: [
        { term: 'WantedBy', simple: 'The boot target that pulls this service in during startup.', technical: 'Directive in [Install] section creating symlink inside <target>.wants/ directory.' }
      ],
      syntaxCode: 'sudo systemctl enable [OPTIONS] [UNIT]',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Root privileges' },
        { token: 'systemctl enable', role: 'command', explanation: 'Enable unit for automatic boot' },
        { token: 'nginx', role: 'argument', explanation: 'Target service' }
      ],
      variations: [
        { syntax: 'sudo systemctl enable --now nginx', title: 'Enable and Start in One Shot', whatItDoes: 'Creates boot symlink AND starts the service immediately right now', whenToUse: 'Best practice when setting up new services' }
      ],
      beforeAfter: {
        before: '$ sudo systemctl enable nginx\n[Creating boot dependency symlink...]',
        after: 'Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service → /lib/systemd/system/nginx.service.',
        explanation: 'systemd created the target symlink guaranteeing Nginx starts on multi-user boot.'
      },
      expectedOutput: 'Created symlink /etc/systemd/system/multi-user.target.wants/nginx.service',
      whatChanges: ['Creates symlink in /etc/systemd/system/.'],
      whatDoesNotChange: ['Does NOT start the service immediately unless --now is passed.'],
      safeRecovery: 'Disable anytime with "sudo systemctl disable unit".',
      commonMistakes: [
        { mistake: 'Assuming "systemctl enable" started the service right now', whyItHappens: 'Believing enable implies start.', howToFix: 'Always use "systemctl enable --now service" to do both at once.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-12-08',
      subChapterNumber: '12.8',
      command: 'sudo systemctl disable nginx',
      title: 'Disable Service',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Remove boot startup symlinks so the service does not launch automatically upon reboot',
      badges: ['systemctl', 'Disable', 'Boot'],
      difficulty: 'Beginner',
      quote: 'systemctl disable removes the boot symlink; it does NOT stop the currently running service.',
      whatIsIt: 'systemctl disable prevents a service from starting automatically during system boot. It removes the symbolic link from "/etc/systemd/system/*.wants/". It does NOT stop the currently running service; the service will continue running until manually stopped or until the next reboot.',
      inSimpleWords: 'Disabling a service is turning off the alarm clock. It won\'t start tomorrow morning when the computer boots up, but if it is running right now, it stays running.',
      whyDoYouNeedIt: 'You need disable when deprecating old services, reducing memory consumption on reboot, or preventing conflicting services from starting.',
      realWorldScenario: 'You are switching from Apache to Nginx. You install Nginx, and want to ensure Apache never boots up again. You run "sudo systemctl disable --now apache2". Apache is stopped immediately and barred from starting on future reboots.',
      realWorldAnalogy: 'Removing an app from your phone\'s auto-startup list.',
      terms: [
        { term: 'Masking (systemctl mask)', simple: 'A stronger version of disable that links the unit to /dev/null so it CANNOT be started by anyone.', technical: 'Creates symlink in /etc/systemd/system targeting /dev/null, preventing manual and dependent launches.' }
      ],
      syntaxCode: 'sudo systemctl disable [OPTIONS] [UNIT]',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Root privileges' },
        { token: 'systemctl disable', role: 'command', explanation: 'Disable unit boot startup' },
        { token: 'nginx', role: 'argument', explanation: 'Target service' }
      ],
      variations: [
        { syntax: 'sudo systemctl disable --now apache2', title: 'Disable and Stop Immediately', whatItDoes: 'Stops running service and removes boot symlink at the same time', whenToUse: 'Retiring services cleanly' },
        { syntax: 'sudo systemctl mask bad_service', title: 'Hard Mask Service', whatItDoes: 'Completely bricks the service so it cannot be started manually or by other services', whenToUse: 'Preventing rogue services from ever running' }
      ],
      beforeAfter: {
        before: '$ sudo systemctl disable nginx\n[Removing boot symlink...]',
        after: 'Removed /etc/systemd/system/multi-user.target.wants/nginx.service.',
        explanation: 'Symlink unlinked; service will not start on next system boot.'
      },
      expectedOutput: 'Removed /etc/systemd/system/multi-user.target.wants/nginx.service',
      whatChanges: ['Unlinks boot symlink in /etc/systemd/system/.'],
      whatDoesNotChange: ['If service is currently active, it continues running until stopped.'],
      safeRecovery: 'Re-enable anytime with "sudo systemctl enable unit".',
      commonMistakes: [
        { mistake: 'Running "systemctl disable" and expecting the service to stop immediately', whyItHappens: 'Disable only affects boot persistence.', howToFix: 'Use "sudo systemctl disable --now <service>" to both stop it now and disable it on boot.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-12-09',
      subChapterNumber: '12.9',
      command: 'systemctl status nginx',
      title: 'Service Status',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'The comprehensive health audit: state, PID, memory, uptime, cgroups, and recent log traces',
      badges: ['systemctl', 'Status', 'Triage'],
      difficulty: 'Beginner',
      quote: 'When anything goes wrong with a service, "systemctl status" is the very first command you must type.',
      whatIsIt: 'systemctl status provides an all-in-one comprehensive diagnostic health report for a unit. It displays: 1. Unit file path and loaded state, 2. Active status (active running vs failed), 3. Main PID and start timestamp, 4. Memory footprint and CPU consumption, 5. Control group (cgroup) tree showing all child worker threads, and 6. The 10 most recent journal log lines emitted by the service.',
      inSimpleWords: 'Typing "systemctl status service" is like taking a patient\'s vital signs. In one quick glance, it shows if the program is alive (green dot), how much RAM it is using, its process ID, and the last 10 error messages it printed.',
      whyDoYouNeedIt: 'It tells you instantly whether a service is healthy, and if it crashed, shows the exact fatal error message directly on your screen without opening log files.',
      realWorldScenario: 'You restart Nginx and it fails. You type "systemctl status nginx". The bottom two lines immediately reveal: "nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)". You instantly know port 80 is conflicted.',
      realWorldAnalogy: 'A patient\'s medical chart in a hospital displaying heart rate, blood pressure, and recent doctor notes.',
      terms: [
        { term: 'Active (running)', simple: 'Service is alive and healthy.', technical: 'Unit state active with active substate running.' },
        { term: 'Failed', simple: 'Service crashed or exited with non-zero status.', technical: 'Unit state failed; inspect Result: exit-code or core-dump.' }
      ],
      syntaxCode: 'systemctl status [UNIT]',
      syntaxTokens: [
        { token: 'systemctl', role: 'command', explanation: 'Systemd control interface' },
        { token: 'status', role: 'argument', explanation: 'Query unit status' },
        { token: 'nginx', role: 'argument', explanation: 'Target service name' }
      ],
      variations: [
        { syntax: 'systemctl status nginx -l --no-pager', title: 'Full Unwrapped Status', whatItDoes: 'Does not truncate long log lines and outputs directly to screen', whenToUse: 'When error messages are cut off' }
      ],
      beforeAfter: {
        before: '$ systemctl status nginx\n[Querying unit telemetry...]',
        after: '● nginx.service - A high performance web server\n     Loaded: loaded (/lib/systemd/system/nginx.service; enabled)\n     Active: active (running) since Sat 2024-09-28 10:00:00 UTC; 2h ago\n   Main PID: 1402 (nginx)\n      Tasks: 5 (limit: 4661)\n     Memory: 32.4M\n        CPU: 1.250s\n     CGroup: /system.slice/nginx.service\n             ├─1402 "nginx: master process /usr/sbin/nginx"\n             └─1403 "nginx: worker process"',
        explanation: 'Displays complete operational health telemetry in a single structured view.'
      },
      expectedOutput: 'Active: active (running)',
      whatChanges: ['Queries systemd daemon via DBus.'],
      whatDoesNotChange: ['Service state is completely untouched.'],
      safeRecovery: '100% safe read-only inspection.',
      commonMistakes: [
        { mistake: 'Ignoring the bottom log lines of "systemctl status" and wondering why the service failed', whyItHappens: 'Looking only at the top half of the screen.', howToFix: 'The bottom 10 lines display the exact error that caused the failure!' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-12-10',
      subChapterNumber: '12.10',
      command: 'journalctl -u nginx.service -e',
      title: 'journalctl',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Query the centralized, indexed systemd binary journal for service and kernel logs',
      badges: ['journalctl', 'Logs', 'Core'],
      difficulty: 'Beginner',
      quote: 'systemd catches everything written to stdout and stderr; journalctl is how you read it.',
      whatIsIt: 'journalctl queries and formats logs from the systemd-journald service. Unlike classic plain text syslog, the systemd journal stores structured binary logs with indexed metadata (timestamp, service unit, PID, UID, kernel boots). It captures all standard output (stdout), standard error (stderr), kernel events, and syslog calls automatically.',
      inSimpleWords: 'If a program prints anything to the screen, systemd catches it and files it into journalctl. Typing "journalctl -u servicename" shows you every single word that service has ever printed.',
      whyDoYouNeedIt: 'Modern applications in containers and systemd don\'t need custom file loggers; they simply write to stdout/stderr. journalctl indexes and stores them automatically.',
      realWorldScenario: 'An application is crashing randomly once every two hours. You run: "journalctl -u myapp.service -f". You watch the logs live in real time as the crash happens, catching the unhandled stack trace.',
      realWorldAnalogy: 'A centralized digital security black box recording all conversations and flight data on an airplane.',
      terms: [
        { term: 'systemd-journald', simple: 'The systemd daemon that collects and indexes logs in /var/log/journal.', technical: 'Service listening on /run/systemd/journal/socket receiving structured log records.' },
        { term: '-u Flag (Unit)', simple: 'Filters logs to show only messages from a specific service.', technical: 'Filters journal entries matching field _SYSTEMD_UNIT=unit.service.' }
      ],
      syntaxCode: 'journalctl [OPTIONS]',
      syntaxTokens: [
        { token: 'journalctl', role: 'command', explanation: 'Query the systemd journal' },
        { token: '-u nginx.service', role: 'flag', explanation: 'Filter logs by specific systemd unit' },
        { token: '-e', role: 'flag', explanation: 'Jump immediately to the end of the journal (most recent logs)' }
      ],
      variations: [
        { syntax: 'journalctl -u nginx -f', title: 'Live Stream Follow (-f)', whatItDoes: 'Follows new log lines in real time (like tail -f)', whenToUse: 'Live debugging' },
        { syntax: 'journalctl -b', title: 'Current Boot Logs Only', whatItDoes: 'Shows logs generated since the most recent reboot', whenToUse: 'Post-reboot troubleshooting' },
        { syntax: 'journalctl -u app --since "1 hour ago"', title: 'Time-Window Filter', whatItDoes: 'Filters logs to the last 60 minutes', whenToUse: 'Incident triage' }
      ],
      beforeAfter: {
        before: '$ journalctl -u nginx -n 2\n[Querying journal entries...]',
        after: 'Sep 28 10:00:00 prod systemd[1]: Starting Nginx web server...\nSep 28 10:00:01 prod systemd[1]: Started Nginx web server.',
        explanation: 'Displays structured chronological log events recorded for nginx.service.'
      },
      expectedOutput: 'Started Nginx web server.',
      whatChanges: ['Reads indexed binary journal files.'],
      whatDoesNotChange: ['Logs and services are unmodified.'],
      safeRecovery: 'Press "q" to exit journalctl pager at any time.',
      commonMistakes: [
        { mistake: 'Running "journalctl" with no flags and getting overwhelmed by 500,000 lines', whyItHappens: 'Without flags, journalctl dumps the whole system history from the beginning of time.', howToFix: 'Always filter with "-u servicename -e" or "-b" (current boot).' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-12-11',
      subChapterNumber: '12.11',
      command: 'systemctl list-unit-files',
      title: 'systemd Units',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'The 11 unit types: .service, .socket, .target, .timer, .mount, .path, .slice, .device',
      badges: ['Units', 'Architecture', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Everything in systemd is a Unit: services are just one unit type among timers, sockets, and targets.',
      whatIsIt: 'In systemd, all system resources and tasks are standardized as "Units". There are 11 unit types identifiable by their file extension: 1. .service (daemons), 2. .socket (IPC/network sockets for socket activation), 3. .target (grouping milestones like boot targets), 4. .timer (cron-like job schedulers), 5. .mount (filesystem mount points), 6. .automount (on-demand mounts), 7. .path (inotify file watchers), 8. .slice (cgroup resource limits), 9. .scope (transient process groups), 10. .device (udev hardware), 11. .swap (swap partitions).',
      inSimpleWords: 'systemd doesn\'t just manage programs. It treats timers (cron), hard drive mounts, network sockets, and boot levels as standard blocks that can plug into each other.',
      whyDoYouNeedIt: 'Understanding unit types lets you replace cron with systemd timers (.timer), trigger backups when a USB drive is plugged in (.path), and mount network shares on-demand (.automount).',
      realWorldScenario: 'You want a backup script to run every night at 3 AM. Instead of using legacy crontab, you create a systemd timer unit "backup.timer" paired with "backup.service". Systemd logs execution in journalctl and prevents overlapping runs.',
      realWorldAnalogy: 'Lego bricks with different specialized functions (gears, wheels, motors) sharing the exact same universal connector studs.',
      terms: [
        { term: 'Unit Type Extension', simple: 'The suffix (.service, .timer, .socket) defining the unit\'s role.', technical: 'Determines the parsing schema and lifecycle state machine applied by systemd.' }
      ],
      syntaxCode: 'systemctl list-units --type=[TYPE]',
      syntaxTokens: [
        { token: 'systemctl', role: 'command', explanation: 'Systemd control interface' },
        { token: 'list-units', role: 'argument', explanation: 'List active units' },
        { token: '--type=timer', role: 'flag', explanation: 'Filter to timer units (.timer)' }
      ],
      variations: [
        { syntax: 'systemctl list-timers', title: 'List Active Timers', whatItDoes: 'Shows next execution time and last run for all systemd timers', whenToUse: 'Auditing scheduled jobs' },
        { syntax: 'systemctl list-sockets', title: 'List Active Sockets', whatItDoes: 'Displays listening sockets and their associated services', whenToUse: 'Auditing socket-activated daemons' }
      ],
      beforeAfter: {
        before: '$ systemctl list-timers | head -n 3\n[Querying timer units...]',
        after: 'NEXT                         LEFT          LAST PASSED       UNIT                         ACTIVATES\nSat 2024-09-28 12:00:00 UTC  45min left    -    -            logrotate.timer              logrotate.service',
        explanation: 'Shows logrotate.timer will automatically trigger logrotate.service in 45 minutes.'
      },
      expectedOutput: 'logrotate.timer activates logrotate.service',
      whatChanges: ['Queries unit registry.'],
      whatDoesNotChange: ['Units remain intact.'],
      safeRecovery: '100% safe read-only inspection.',
      commonMistakes: [
        { mistake: 'Trying to start a timer unit with "systemctl start service.service"', whyItHappens: 'Starting the service runs it once; starting the timer (.timer) schedules it recurringly.', howToFix: 'Start and enable the .timer unit: "systemctl enable --now backup.timer".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-12-12',
      subChapterNumber: '12.12',
      command: 'cat /etc/systemd/system/myapp.service',
      title: 'Service Files',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Authoring declarative unit files: [Unit], [Service], and [Install] configuration sections',
      badges: ['ServiceFiles', 'DevOps', 'Essential'],
      difficulty: 'Intermediate',
      quote: 'Writing a systemd service file takes 10 lines of clean declarative INI text: no messy bash scripts.',
      whatIsIt: 'A systemd Service File is a declarative plain-text configuration file (INI format) ending in ".service" that instructs systemd how to run and supervise a daemon. It is structured into three mandatory sections: 1. [Unit] (metadata, description, dependencies like After=network.target), 2. [Service] (command execution: ExecStart=, User=, Restart=always, Environment=), and 3. [Install] (boot integration: WantedBy=multi-user.target). Custom service files are placed in "/etc/systemd/system/".',
      inSimpleWords: 'A service file is an employment contract for your program. It tells Linux: "Here is the command to run, run it as this user, and if it crashes, restart it immediately".',
      whyDoYouNeedIt: 'Every developer and DevOps engineer must know how to package their Python, Node.js, Go, or Java app as a production systemd service.',
      realWorldScenario: 'You wrote a Python API backend. You create "/etc/systemd/system/api.service". You set "ExecStart=/usr/bin/python3 /app/main.py", "User=appuser", and "Restart=always". You run "systemctl daemon-reload && systemctl enable --now api". Your API is now a resilient production service.',
      realWorldAnalogy: 'A flight plan submitted by a pilot before takeoff, outlining destination, cruising altitude, and emergency protocols.',
      terms: [
        { term: 'Restart=always', simple: 'Tells systemd to restart the program automatically if it ever crashes.', technical: 'Directive restarting service regardless of clean exit status or abnormal termination.' },
        { term: 'daemon-reload', simple: 'Tells systemd to re-read service files from disk.', technical: 'Signals PID 1 to re-parse /etc/systemd/system and rebuild unit dependency graphs.' }
      ],
      syntaxCode: 'nano /etc/systemd/system/myapp.service',
      syntaxTokens: [
        { token: 'nano', role: 'command', explanation: 'Text editor' },
        { token: '/etc/systemd/system/myapp.service', role: 'path', explanation: 'Canonical directory for custom systemd service files' }
      ],
      variations: [
        { syntax: 'systemctl cat nginx.service', title: 'Inspect Active Service File', whatItDoes: 'Dumps the full unit file text of a service directly to stdout', whenToUse: 'Reading service configurations' },
        { syntax: 'systemctl edit myapp.service', title: 'Create Service Override', whatItDoes: 'Creates an atomic drop-in override snippet in /etc/systemd/system/myapp.service.d/', whenToUse: 'Customizing packaged services' }
      ],
      beforeAfter: {
        before: '$ cat /etc/systemd/system/demo.service\n[File does not exist]',
        after: '[Unit]\nDescription=My Demo Service\nAfter=network.target\n\n[Service]\nExecStart=/usr/bin/node /opt/demo/server.js\nRestart=always\nUser=www-data\n\n[Install]\nWantedBy=multi-user.target',
        explanation: 'A clean, declarative production service definition ready for systemd supervision.'
      },
      expectedOutput: '[Unit] [Service] [Install]',
      whatChanges: ['Creates unit file in /etc/systemd/system/.'],
      whatDoesNotChange: ['Does not take effect until daemon-reload is executed.'],
      safeRecovery: 'Edit file, run "systemctl daemon-reload", and restart service.',
      commonMistakes: [
        { mistake: 'Using relative paths in ExecStart (e.g. ExecStart=node server.js)', whyItHappens: 'systemd does not use your user $PATH; it requires absolute binary paths!', howToFix: 'Always use absolute paths: "ExecStart=/usr/bin/node /opt/app/server.js".' },
        { mistake: 'Forgetting to run "systemctl daemon-reload" after modifying a service file', whyItHappens: 'systemd runs from cached memory.', howToFix: 'Always run "sudo systemctl daemon-reload" after saving edits.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-12-13',
      subChapterNumber: '12.13',
      command: 'systemctl get-default',
      title: 'Boot Targets',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'The modern replacement for SysV runlevels: multi-user.target, graphical.target, rescue.target',
      badges: ['Targets', 'Boot', 'Systemd'],
      difficulty: 'Intermediate',
      quote: 'Targets are system milestones: multi-user.target is server CLI; graphical.target is desktop GUI.',
      whatIsIt: 'A Target (.target) is a systemd unit used to group other units together into coherent synchronization points and operational milestones during boot. Targets replaced legacy Unix "runlevels". The primary targets are: 1. "multi-user.target" (headless server with CLI networking, equivalent to runlevel 3), 2. "graphical.target" (full desktop GUI, equivalent to runlevel 5), 3. "rescue.target" (single-user root maintenance shell, runlevel 1), and 4. "emergency.target" (minimal initramfs root shell).',
      inSimpleWords: 'A Target is a boot state. On a server, you want "multi-user.target" (pure command line, zero GUI waste). On a laptop, you want "graphical.target" (loads the screen and login desktop).',
      whyDoYouNeedIt: 'You need targets to switch servers to headless mode to save memory, or boot into rescue mode to fix broken filesystems.',
      realWorldScenario: 'You are provisioning a cloud compute node that accidentally has a desktop environment installed. To free up 1.5GB of RAM, you set the default target to headless: "sudo systemctl set-default multi-user.target". On next reboot, the server uses zero memory for graphics.',
      realWorldAnalogy: 'Flight modes on an airplane: Taxi mode, Takeoff mode, Cruising mode, and Emergency landing mode.',
      terms: [
        { term: 'Runlevels', simple: 'The legacy Unix numbers (0 to 6) representing boot modes.', technical: 'SysVinit states: 0=halt, 1=single, 3=multi-user, 5=graphical, 6=reboot.' },
        { term: 'isolate', simple: 'Switch to a different target immediately without rebooting.', technical: 'Stops all units not wanted by target and starts units required by target.' }
      ],
      syntaxCode: 'systemctl get-default',
      syntaxTokens: [
        { token: 'systemctl', role: 'command', explanation: 'Systemd control interface' },
        { token: 'get-default', role: 'argument', explanation: 'Query current boot default target' }
      ],
      variations: [
        { syntax: 'sudo systemctl set-default multi-user.target', title: 'Set Headless Boot Target', whatItDoes: 'Configures server to boot into command-line mode without GUI', whenToUse: 'Server optimization' },
        { syntax: 'sudo systemctl isolate rescue.target', title: 'Switch to Rescue Shell', whatItDoes: 'Stops normal daemons and drops into single-user root maintenance shell', whenToUse: 'Disk repair maintenance' }
      ],
      beforeAfter: {
        before: '$ systemctl get-default\ngraphical.target\n$ sudo systemctl set-default multi-user.target',
        after: 'Removed /etc/systemd/system/default.target.\nCreated symlink /etc/systemd/system/default.target → /lib/systemd/system/multi-user.target.\n$ systemctl get-default\nmulti-user.target',
        explanation: 'Default boot state successfully updated to lightweight multi-user server mode.'
      },
      expectedOutput: 'multi-user.target',
      whatChanges: ['Updates symlink /etc/systemd/system/default.target.'],
      whatDoesNotChange: ['Running services are untouched until next reboot or isolate command.'],
      safeRecovery: 'Revert with "sudo systemctl set-default graphical.target".',
      commonMistakes: [
        { mistake: 'Setting default target to reboot.target or emergency.target by accident', whyItHappens: 'Typo in target name causes an infinite reboot loop!', howToFix: 'Override at GRUB bootloader prompt by appending "systemd.unit=multi-user.target".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-12-14',
      subChapterNumber: '12.14',
      command: 'systemctl --failed',
      title: 'Troubleshooting Failed Services',
      topicId: 'ch-12',
      topicNumber: '12',
      topicTitle: 'Services and systemd',
      subtitle: 'Diagnostic triage: identify failed units, analyze journal errors, check port collisions, and reset state',
      badges: ['Troubleshooting', 'Triage', 'Production'],
      difficulty: 'Intermediate',
      quote: 'When services fail: 1. check "systemctl --failed", 2. run "systemctl status", 3. inspect "journalctl -xeu service".',
      whatIsIt: 'Troubleshooting Failed Services is the disciplined 4-step diagnostic protocol for recovering dead services: 1. Identify what failed with "systemctl --failed", 2. Check service exit code and recent logs with "systemctl status <unit>", 3. View the complete unclipped error trace with "journalctl -xeu <unit>", and 4. Check for common root causes: syntax errors in configs, port collisions (e.g. port 80 already bound), missing directories, or permission denials.',
      inSimpleWords: 'When a service refuses to start, don\'t panic and don\'t guess. Follow the 3 magic commands: "systemctl --failed", "systemctl status service", and "journalctl -xeu service". The exact error will be right there in plain English.',
      whyDoYouNeedIt: 'Production servers run dozens of interdependent services. Knowing the systematic triage workflow resolves outages in 2 minutes instead of 2 hours.',
      realWorldScenario: 'An Apache service fails to start after an update. You run "systemctl --failed" $\rightarrow$ shows "apache2.service failed". You run "journalctl -xeu apache2" $\rightarrow$ reveals "(98)Address already in use: AH00072: make_sock: could not bind to address 0.0.0.0:80". You run "ss -tulpn | grep :80" and discover Nginx was already running on port 80.',
      realWorldAnalogy: 'An airplane mechanic following a standardized flight fault diagnostic checklist instead of guessing which wire to jiggle.',
      terms: [
        { term: 'systemctl --failed', simple: 'Lists all services currently in a crashed or failed state.', technical: 'Queries units with load/active/sub state == failed.' },
        { term: 'systemctl reset-failed', simple: 'Clears the red "failed" error flag after fixing the problem.', technical: 'Resets the failure counter and transitions unit out of failed state.' }
      ],
      syntaxCode: 'systemctl --failed',
      syntaxTokens: [
        { token: 'systemctl', role: 'command', explanation: 'Systemd control interface' },
        { token: '--failed', role: 'flag', explanation: 'List only units in failed error state' }
      ],
      variations: [
        { syntax: 'journalctl -xeu nginx.service', title: 'Deep Error Log Trace', whatItDoes: 'Displays extended explanations (-x), jumps to end (-e), filtered by unit (-u)', whenToUse: 'Detailed failure investigation' },
        { syntax: 'sudo systemctl reset-failed', title: 'Reset Failure State', whatItDoes: 'Clears the failed status marker for all resolved units', whenToUse: 'After fixing the underlying service error' }
      ],
      beforeAfter: {
        before: '$ systemctl --failed\n  UNIT          LOAD   ACTIVE SUB    DESCRIPTION\n● nginx.service loaded failed failed A high performance web server\n1 loaded units listed.',
        after: '[Identified exact broken service, ready for journalctl -xeu nginx]',
        explanation: 'systemctl --failed instantly isolated the single broken service on the server.'
      },
      expectedOutput: '0 loaded units listed. [When system is 100% healthy]',
      whatChanges: ['Queries failed unit list.'],
      whatDoesNotChange: ['System remains intact.'],
      safeRecovery: 'Fix the underlying configuration error, then run "sudo systemctl restart unit".',
      commonMistakes: [
        { mistake: 'Trying to restart a failed service 20 times without reading the logs', whyItHappens: 'Hoping it will magically fix itself.', howToFix: 'If it failed once, it will fail 20 times. Read "journalctl -xeu unit" to read the error reason first!' }
      ]
    })
  ]
};
