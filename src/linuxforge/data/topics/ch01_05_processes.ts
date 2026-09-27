import { LinuxTopic } from '../unifiedLinuxData';

export const MODULE_05_PROCESSES: LinuxTopic = {
  id: 'ch01-05-processes',
  number: '01.5',
  title: 'Process Management & Control',
  iconName: 'Activity',
  description:
    'Runtime execution lifecycle: process fundamentals (PID, PPID, states), inspection (ps, top, htop), signal control (kill, killall, pkill, SIGTERM, SIGKILL, SIGHUP), and job backgrounding (jobs, fg, bg, nohup).',
  concepts: [
    {
      id: 'linux-process-inspection',
      command: 'ps aux | grep nginx; ps -ef --forest; top -b -n 1; htop',
      title: 'Process Fundamentals & Inspection: PID, PPID, ps, top, htop',
      topicId: 'ch01-05-processes',
      topicNumber: '01.5',
      topicTitle: 'Process Management & Control',
      subtitle: 'Process tree hierarchies, parent-child inheritance, zombie processes, and live resource monitors',
      badges: ['Processes', 'Inspection', 'Performance'],
      quote:
        'Every process in Linux is a branch of PID 1 (systemd). Master ps and htop to inspect CPU consumption and identify zombie tasks.',
      difficulty: 'Beginner',
      whatIsIt:
        'A process is an executing instance of a program in memory with its own virtual address space, file descriptor table, and security context. Every process is identified by a unique Process ID (**PID**) and tracks its Parent Process ID (**PPID**), forming a hierarchical tree rooted at PID 1 (`systemd` or `init`). Process states include Running (`R`), Sleeping (`S`), Uninterruptible Sleep (`D` - usually waiting on disk I/O), Stopped (`T`), and Zombie (`Z` - terminated process whose parent has not yet read its exit code via `wait()`). `ps` snapshots running processes (BSD style `ps aux` or POSIX style `ps -ef --forest`), while `top` and `htop` provide real-time interactive dashboards of CPU, memory, load averages, and thread trees.',
      inSimpleWords:
        'A program is a file on disk; a process is that program running in memory. The computer gives each process an ID badge (PID) and tracks who created it (PPID). `ps` takes a still photo of all running processes; `top` and `htop` show live streaming video of what is hogging your CPU.',
      whyDoYouNeedIt:
        'When a web server slows to a crawl or CPU hits 100%, you must immediately find which PID is consuming compute (`top` or `ps aux --sort=-%cpu`), inspect its parent process, and take corrective action.',
      realWorldAnalogy:
        'A family tree: The great-grandparent is PID 1 (`systemd`). Parents spawn children. If a parent dies without cleaning up, children become orphans adopted by PID 1; if a child finishes its task but the parent ignores the report card, the child becomes a "Zombie".',
      withoutVsWith: {
        without: {
          title: 'Without Process Visibility and Inspection Tools',
          items: [
            'Rogue processes consume 100% CPU invisibly in the background',
            'Zombie processes leak memory table slots until the system hits PID limits and cannot fork',
            'No way to verify which user or cgroup launched a suspicious command',
          ],
          outcome: 'Unexplained server lockups, fork failures, and untraceable runaway workloads.',
        },
        with: {
          title: 'With Linux Process Inspection Tools (ps, top, htop)',
          items: [
            'ps -ef --forest visualizes complete parent-child process ancestry',
            'top/htop highlights real-time CPU and memory hogs with color-coded alerts',
            'Instant detection of zombie (Z) or uninterruptible sleep (D) bottlenecked tasks',
          ],
          outcome: 'Complete operational visibility and rapid bottleneck diagnosis.',
        },
      },
      blockDiagram: {
        title: 'Linux Process Tree & States Lifecycle',
        subtitle: 'From fork/execve to Running (R), Sleeping (S), Zombie (Z), and wait() reap',
        nodes: [
          { id: 'proc-pid1', label: 'PID 1: systemd', simpleDef: 'Root parent of all processes', techDef: 'Spawned directly by Linux kernel; adopts all orphan processes', badge: 'PID 1', color: '#38bdf8' },
          { id: 'proc-running', label: 'Running / Runnable (R)', simpleDef: 'Actively executing on CPU', techDef: 'Scheduled in CPU runqueue; consuming processor cycles', badge: 'State R', color: '#10b981' },
          { id: 'proc-sleep', label: 'Interruptible Sleep (S)', simpleDef: 'Waiting for event or timer', techDef: 'Process sleeping on socket or timer; wakes up on signal', badge: 'State S', color: '#06b6d4' },
          { id: 'proc-zombie', label: 'Zombie State (Z)', simpleDef: 'Dead process awaiting reap', techDef: 'Task struct preserved in kernel until parent calls waitpid()', badge: 'State Z', color: '#ef4444' },
        ],
      },
      terms: [
        { term: 'PID & PPID', simple: 'PID is the Process ID; PPID is the Parent Process ID that created it.', technical: 'Positive integers identifying the task in the kernel task table; PPID references parent task struct.' },
        { term: 'Zombie Process', simple: 'A finished process whose parent has not collected its exit code.', technical: 'A terminated process (state Z) with no memory allocated, but retaining an entry in the kernel process table.' },
        { term: 'Uninterruptible Sleep (D)', simple: 'A process waiting on disk hardware that cannot be killed even with kill -9.', technical: 'State D: task is blocked waiting on hardware I/O; signals cannot wake it until I/O completes or times out.' },
      ],
      whenToUse: [
        'Finding which processes are consuming the most memory: `ps aux --sort=-%mem | head -n 10`',
        'Viewing live CPU consumption interactively: run `htop` or `top`',
        'Tracing the entire process tree structure: `ps -ef --forest`',
      ],
      whenNotToUse: [
        'Do not panic if you see a process in state S (Sleep); 95% of server processes spend their time sleeping waiting for incoming network requests',
      ],
      syntaxCode: 'ps aux | grep node\nps -ef --forest\ntop\nhtop',
      syntaxTokens: [
        { token: 'ps aux', role: 'Flags', explanation: 'a (all users), u (display user-oriented format), x (processes without a controlling tty)' },
        { token: '--forest', role: 'Flag', explanation: 'ASCII visual tree showing which process spawned which child' },
        { token: 'top', role: 'Command', explanation: 'Interactive real-time process viewer and system summary' },
      ],
      variations: [
        { syntax: 'ps -eo pid,ppid,cmd,%cpu,%mem --sort=-%cpu', title: 'Custom Columns', whatItDoes: 'Displays specific metrics sorted by CPU usage', whenToUse: 'Targeted scripting and monitoring' },
        { syntax: 'pgrep -u root nginx', title: 'Find PIDs by Name', whatItDoes: 'Returns PIDs of processes matching user and name', whenToUse: 'Automated script PID lookups' },
      ],
      internalFlow: [
        { step: 1, title: 'Process Spawns via fork()', desc: 'Parent process duplicates its address space using clone() / fork() syscall', why: 'Creates child task', techDetail: 'Allocates new PID and kernel task_struct sharing page tables via Copy-On-Write (COW)' },
        { step: 2, title: 'Child Invokes execve()', desc: 'Child replaces its memory image with target executable binary', why: 'Loads program code', techDetail: 'Kernel clears old stack/heap, loads ELF segments, and starts execution at main()' },
        { step: 3, title: 'Process Terminating & Exit', desc: 'Process calls exit_group(); kernel frees memory but leaves task_struct', why: 'Prepares exit status', techDetail: 'Sends SIGCHLD to parent; becomes Zombie until parent executes waitpid()' },
      ],
      sandbox: {
        initialCommands: ['# List all processes with full hierarchy\nps -ef | head -n 8'],
        guidedSteps: [
          { instruction: 'Inspect top running processes using ps aux', command: 'ps aux', hint: 'Run ps aux' },
          { instruction: 'Find the PID of systemd or init', command: 'ps -p 1', hint: 'Run ps -p 1' },
        ],
        targetTask: 'Inspect the root systemd process with PID 1 using ps -p 1',
        solutionCommands: ['ps -p 1'],
      },
      commonMistakes: [
        { mistake: 'Trying to kill a Zombie process with kill -9', whyWrong: 'A zombie is already dead; it has no memory or execution thread to receive signals.', correctWay: 'You must kill or restart the parent process so PID 1 adopts and automatically reaps the zombie.' },
        { mistake: 'Confusing State D (Uninterruptible Sleep) with a frozen user application', whyWrong: 'State D means the process is waiting in kernel space for disk or network I/O; kill signals are deferred until hardware responds.', correctWay: 'Investigate underlying disk I/O, NFS mounts, or storage health with iostat.' },
      ],
      challenge: {
        question: 'What is a "Zombie" process in Linux?',
        options: [
          { label: 'A process that has completed execution, but its exit code has not yet been collected by its parent process', isCorrect: true, explanation: 'It consumes no CPU or RAM, only occupying an entry in the kernel process table.' },
          { label: 'A malicious malware process that resurrects automatically after being deleted', isCorrect: false, explanation: 'Zombie is a standard POSIX process lifecycle state, not malware.' },
          { label: 'A process consuming 100% of CPU memory', isCorrect: false, explanation: 'A process using high CPU is in state R (Running).' },
          { label: 'A process that has been put into the background with &', isCorrect: false, explanation: 'Background processes run normally without controlling the foreground terminal.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['ps aux', 'ps -ef --forest', 'top -b -n 1', 'htop', 'pgrep <name>'],
        bestPractices: [
          'Use htop for interactive manual triage and ps aux in non-interactive scripts',
          'Audit high numbers of zombie processes with ps aux | awk \'$8=="Z"\'',
        ],
      },
    },
    {
      id: 'linux-process-signals',
      command: 'kill -15 1234; kill -9 1234; killall -HUP nginx; pkill -f "python worker.py"',
      title: 'Signals & Process Termination: kill, killall, pkill, SIGTERM, SIGKILL, SIGHUP',
      topicId: 'ch01-05-processes',
      topicNumber: '01.5',
      topicTitle: 'Process Management & Control',
      subtitle: 'POSIX software interrupts, graceful vs forceful shutdowns, and configuration reloads',
      badges: ['Signals', 'Termination', 'Process Control'],
      quote:
        'Always try SIGTERM (15) before SIGKILL (9): give processes a chance to close database connections and flush disk buffers.',
      difficulty: 'Intermediate',
      whatIsIt:
        'Signals are asynchronous software interrupts sent by the Linux kernel to notify a process of an event. Common signals include: **SIGTERM** (Signal 15 - polite termination request; the process can catch it, flush cache to disk, close network sockets, and exit cleanly); **SIGKILL** (Signal 9 - uncatchable immediate termination; the kernel abruptly destroys the process without saving state); and **SIGHUP** (Signal 1 - Hangup; used by daemons like Nginx or Apache to reload configuration files without dropping active connections). Commands to deliver signals include `kill <PID>`, `killall <binary_name>` (kills all processes matching exact name), and `pkill -f <pattern>` (matches full command line strings).',
      inSimpleWords:
        'Signals are like shouting instructions to a process. `SIGTERM` (15) is saying "Please finish what you are doing and shut down gracefully." `SIGKILL` (9) is pulling the power plug from the wall. `SIGHUP` (1) tells a server to re-read its settings without rebooting.',
      whyDoYouNeedIt:
        'Container orchestrators (Docker, Kubernetes) always send SIGTERM first when stopping a pod, giving it 30 seconds (terminationGracePeriodSeconds) before issuing SIGKILL. Understanding signals prevents database corruption and dropped user requests.',
      realWorldAnalogy:
        '`SIGTERM` is politely asking guests to leave a party so they can put on their coats and say goodbye; `SIGKILL` is a bouncer throwing everyone out the window immediately; `SIGHUP` is handing the bartender an updated drink menu without closing the bar.',
      withoutVsWith: {
        without: {
          title: 'Without Understanding Signal Mechanics (Using kill -9 for everything)',
          items: [
            'Databases crash with half-written transactions, corrupting disk state',
            'Temporary lock files (/var/run/app.pid) are left behind, preventing clean restarts',
            'Web services drop thousands of active customer connections abruptly',
          ],
          outcome: 'Data corruption, prolonged service outages, and manual database recovery required.',
        },
        with: {
          title: 'With Proper Signal Discipline (SIGTERM -> Wait -> SIGKILL)',
          items: [
            'Applications close network connections, finish active requests, and commit data',
            'SIGHUP reloads SSL certificates and configuration with zero downtime',
            'SIGKILL used strictly as a last resort for completely frozen processes',
          ],
          outcome: 'Clean, reliable deployments with zero dropped customer transactions.',
        },
      },
      blockDiagram: {
        title: 'Linux Kernel Signal Delivery Pipeline',
        subtitle: 'How signals are dispatched, intercepted, or enforced directly by the kernel',
        nodes: [
          { id: 'sig-sender', label: 'Signal Dispatcher', simpleDef: 'kill / pkill / systemd', techDef: 'Issues kill() syscall specifying target PID and signal number', badge: 'Trigger', color: '#38bdf8' },
          { id: 'sig-kernel', label: 'Kernel Signal Hub', simpleDef: 'Checks process permissions', techDef: 'Sets pending signal bit in target task_struct', badge: 'Kernel Ring 0', color: '#06b6d4' },
          { id: 'sig-term', label: 'SIGTERM (15) / SIGHUP (1)', simpleDef: 'Caught by process handler', techDef: 'Process executes custom cleanup handler in user space', badge: 'Graceful', color: '#10b981' },
          { id: 'sig-kill', label: 'SIGKILL (9)', simpleDef: 'Bypasses process completely', techDef: 'Kernel terminates task immediately; cannot be caught or ignored', badge: 'Uncatchable', color: '#ef4444' },
        ],
      },
      terms: [
        { term: 'SIGTERM (Signal 15)', simple: 'The polite request to terminate cleanly.', technical: 'Standard termination signal; can be caught or ignored, allowing processes to clean up resources.' },
        { term: 'SIGKILL (Signal 9)', simple: 'The forceful termination signal that cannot be blocked or ignored.', technical: 'Handled directly by the kernel; terminates process immediately without notifying the application.' },
        { term: 'SIGHUP (Signal 1)', simple: 'Hangup signal; conventionally tells daemons to reload their configuration.', technical: 'Historically triggered on terminal disconnect; standard convention for online configuration reloading.' },
      ],
      whenToUse: [
        'Gracefully stopping an application: `kill -15 <PID>` (or standard `kill <PID>`)',
        'Reloading Nginx configuration with zero downtime: `sudo kill -HUP $(cat /var/run/nginx.pid)`',
        'Killing a frozen process that ignores SIGTERM: `kill -9 <PID>`',
        'Stopping all Python workers matching a regex: `pkill -f "python worker.py"`',
      ],
      whenNotToUse: [
        'Never jump straight to `kill -9` without trying `kill -15` first, especially on databases (PostgreSQL, MySQL)',
      ],
      syntaxCode: 'kill 1234\nkill -15 1234\nkill -9 1234\nkillall nginx\npkill -f "node server.js"',
      syntaxTokens: [
        { token: 'kill', role: 'Command', explanation: 'Send a signal to a process by PID' },
        { token: '-15', role: 'Signal', explanation: 'SIGTERM (default if no signal is specified)' },
        { token: '-9', role: 'Signal', explanation: 'SIGKILL (forceful immediate termination)' },
        { token: 'pkill -f', role: 'Command & Flag', explanation: 'Kill processes matching full command line pattern' },
      ],
      variations: [
        { syntax: 'kill -l', title: 'List Signals', whatItDoes: 'Prints all 64 POSIX signal names and numbers', whenToUse: 'Checking signal integers' },
        { syntax: 'pkill -u deploy', title: 'Kill by User', whatItDoes: 'Terminates all processes owned by the user deploy', whenToUse: 'Clearing user sessions' },
      ],
      internalFlow: [
        { step: 1, title: 'kill() Syscall Issued', desc: 'Calling process invokes kill(pid, sig)', why: 'Dispatches signal', techDetail: 'Kernel verifies sender UID matches target UID or sender has CAP_KILL' },
        { step: 2, title: 'Pending Signal Bitmask', desc: 'Kernel marks signal bit in target task_struct->pending', why: 'Queues signal', techDetail: 'Wakes target process if it was sleeping in interruptible state (S)' },
        { step: 3, title: 'Context Switch & Handler', desc: 'When target process returns to user space, kernel redirects execution to signal handler', why: 'Runs user handler', techDetail: 'If signal is SIGKILL, kernel invokes do_group_exit() immediately in Ring 0' },
      ],
      sandbox: {
        initialCommands: ['# List all available Linux signals and their numbers\nkill -l | head -n 8'],
        guidedSteps: [
          { instruction: 'Display list of all signal names', command: 'kill -l', hint: 'Run kill -l' },
          { instruction: 'Check how to terminate a process gracefully with SIGTERM', command: 'kill -15 1', hint: 'Verify SIGTERM syntax' },
        ],
        targetTask: 'List all available signals using kill -l',
        solutionCommands: ['kill -l'],
      },
      commonMistakes: [
        { mistake: 'Using kill -9 as the default way to stop processes', whyWrong: 'Bypasses application cleanup hooks, corrupting database indexes and leaving orphan locks on disk.', correctWay: 'Always issue standard kill (SIGTERM), wait a few seconds, and only escalate to kill -9 if it fails to exit.' },
        { mistake: 'Running pkill pattern without checking pgrep pattern first', whyWrong: 'An overly broad pattern like pkill -f python could inadvertently kill system daemons or other users’ tasks.', correctWay: 'Always test your pattern with pgrep -fl pattern first to see exactly which processes match.' },
      ],
      challenge: {
        question: 'Which signal CANNOT be caught, blocked, or ignored by any user application process?',
        options: [
          { label: 'SIGKILL (Signal 9)', isCorrect: true, explanation: 'The Linux kernel intercepts SIGKILL directly in Ring 0; it cannot be caught or handled by user space.' },
          { label: 'SIGTERM (Signal 15)', isCorrect: false, explanation: 'SIGTERM can be caught and handled with custom cleanup logic.' },
          { label: 'SIGHUP (Signal 1)', isCorrect: false, explanation: 'SIGHUP can be caught and is commonly used for reloading configs.' },
          { label: 'SIGINT (Signal 2)', isCorrect: false, explanation: 'SIGINT (Ctrl+C) can be intercepted and handled by programs.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['kill <PID>', 'kill -15 <PID>', 'kill -9 <PID>', 'killall <name>', 'pkill -f "<pattern>"'],
        bestPractices: [
          'In Dockerfiles and containers: ensure your app process receives PID 1 signals or use an init like dumb-init or tini',
          'Use SIGHUP for zero-downtime reloads of proxies (nginx -s reload or killall -HUP nginx)',
        ],
      },
    },
    {
      id: 'linux-jobs-backgrounding',
      command: 'nohup ./long_task.sh > task.log 2>&1 &; jobs -l; fg %1; bg %1',
      title: 'Job Control & Daemons: Background, Foreground, Jobs, nohup',
      topicId: 'ch01-05-processes',
      topicNumber: '01.5',
      topicTitle: 'Process Management & Control',
      subtitle: 'Managing asynchronous shell execution, terminal disconnection persistence, and job switching',
      badges: ['Job Control', 'nohup', 'Automation'],
      quote:
        'Backgrounding with & runs a task asynchronously; wrapping it with nohup prevents it from dying when your SSH session closes.',
      difficulty: 'Intermediate',
      whatIsIt:
        'Job control is the shell’s ability to manage multiple simultaneous tasks from a single terminal session. Appending `&` to any command launches it as an asynchronous **background job**, returning prompt control immediately. The `jobs` command lists active background jobs with their job IDs (`%1`, `%2`). Pressing `Ctrl+Z` suspends the active foreground process (`SIGTSTP`), which can then be resumed in the background with `bg` or brought back to the foreground with `fg`. Crucially, when an SSH session disconnects, the shell sends `SIGHUP` to all child processes, terminating them. `nohup` (No Hangup) shields commands from `SIGHUP` and redirects unhandled output to `nohup.out`, allowing tasks to run continuously after logout.',
      inSimpleWords:
        'Normally, a command takes over your terminal until it finishes. Adding `&` lets it run behind the scenes so you can keep typing. Pressing `Ctrl+Z` pauses a program; `bg` lets it continue in the background; `fg` brings it back. `nohup` keeps it running even after you log out of the server.',
      whyDoYouNeedIt:
        'Running a 4-hour database backup or migration over SSH: if your Wi-Fi blinks, the SSH session drops and the migration dies midway. Wrapping it with `nohup` or running it inside `tmux`/`screen` ensures it finishes safely.',
      realWorldAnalogy:
        'Starting the laundry: Instead of standing in front of the washing machine for 45 minutes staring at it (foreground), you press start and walk away to do other chores (background `&`). `nohup` ensures the washing machine keeps running even if you leave the house.',
      withoutVsWith: {
        without: {
          title: 'Without nohup and Job Control',
          items: [
            'Terminal is locked during long-running builds, backups, or migrations',
            'Dropping an SSH connection abruptly aborts multi-hour operations midway',
            'Opening 5 separate terminal SSH windows just to run 5 concurrent commands',
          ],
          outcome: 'Wasted engineering time and corrupted migrations caused by dropped connections.',
        },
        with: {
          title: 'With Linux Job Control and nohup',
          items: [
            'Asynchronous execution (&) frees the terminal immediately for further work',
            'nohup redirects stdout/stderr and intercepts SIGHUP, surviving SSH disconnects',
            'Seamless switching between foreground and background with Ctrl+Z, bg, and fg',
          ],
          outcome: 'Resilient long-running automation and effortless multi-tasking in a single shell.',
        },
      },
      blockDiagram: {
        title: 'Job Lifecycle: Foreground vs Background & nohup',
        subtitle: 'How Ctrl+Z pauses tasks and nohup intercepts SIGHUP upon terminal closure',
        nodes: [
          { id: 'job-fg', label: 'Foreground Process', simpleDef: 'Owns terminal input', techDef: 'Receives keyboard interrupts (Ctrl+C = SIGINT, Ctrl+Z = SIGTSTP)', badge: 'Foreground', color: '#38bdf8' },
          { id: 'job-ctrlz', label: 'Ctrl+Z (SIGTSTP)', simpleDef: 'Suspends execution', techDef: 'Transitions task to state T (Stopped); returns prompt control', badge: 'Suspended', color: '#f59e0b' },
          { id: 'job-bg', label: 'bg %1 / command &', simpleDef: 'Runs in background', techDef: 'Sends SIGCONT; executes asynchronously without terminal stdin', badge: 'Background', color: '#10b981' },
          { id: 'job-nohup', label: 'nohup Command', simpleDef: 'Ignores SSH disconnects', techDef: 'Masks SIGHUP and redirects stdout/stderr to nohup.out', badge: 'Persistent', color: '#06b6d4' },
        ],
      },
      terms: [
        { term: 'nohup', simple: 'Runs a command immune to hangups, allowing it to survive terminal closure.', technical: 'Sets signal disposition of SIGHUP to SIG_IGN and redirects stdout/stderr if targeting a tty.' },
        { term: 'Ctrl+Z and bg', simple: 'Ctrl+Z pauses a program; bg tells it to resume in the background.', technical: 'Ctrl+Z sends SIGTSTP (20); bg sends SIGCONT (18) to the process group in background mode.' },
        { term: 'Job ID (%1)', simple: 'The number assigned by your current shell to a background task.', technical: 'Shell-internal job identifier, distinct from the global system PID.' },
      ],
      whenToUse: [
        'Running long-running scripts over SSH: `nohup ./backup.sh > backup.log 2>&1 &`',
        'Temporarily pausing a text editor to run a shell command: `Ctrl+Z`, run command, then `fg`',
        'Launching multiple background worker tasks simultaneously: `./worker.sh &`',
      ],
      whenNotToUse: [
        'Do not use `nohup` for production microservices; use `systemd` service units or container runtimes instead',
      ],
      syntaxCode: 'command &\njobs -l\nfg %1\nbg %1\nnohup ./deploy.sh > deploy.log 2>&1 &',
      syntaxTokens: [
        { token: '&', role: 'Operator', explanation: 'Run command in the background asynchronously' },
        { token: 'jobs -l', role: 'Command', explanation: 'List active background jobs with their PIDs' },
        { token: 'fg %1', role: 'Command', explanation: 'Bring job %1 back into the foreground' },
        { token: 'nohup', role: 'Command', explanation: 'Run immune to hangups (SIGHUP)' },
      ],
      variations: [
        { syntax: 'disown -h %1', title: 'Disown Running Job', whatItDoes: 'Protects an already-running job from SIGHUP before logging out', whenToUse: 'When you forgot to use nohup initially' },
        { syntax: 'wait %1', title: 'Wait for Job', whatItDoes: 'Pauses script execution until background job %1 finishes', whenToUse: 'Parallelizing script steps' },
      ],
      internalFlow: [
        { step: 1, title: 'Shell Forks with &', desc: 'Shell forks child process and calls execve() without calling waitpid()', why: 'Leaves task asynchronous', techDetail: 'Terminal remains connected to the interactive shell session' },
        { step: 2, title: 'Terminal Disconnect (SIGHUP)', desc: 'When SSH disconnects, kernel sends SIGHUP to all processes attached to the controlling pty', why: 'Notifies terminal hangup', techDetail: 'Standard processes terminate immediately unless SIGHUP is ignored' },
        { step: 3, title: 'nohup Intercepts SIGHUP', desc: 'Processes started with nohup ignore SIGHUP (SIG_IGN)', why: 'Survives logout', techDetail: 'Process continues executing in the background, reparented to PID 1' },
      ],
      sandbox: {
        initialCommands: ['# Check active shell background jobs\njobs -l'],
        guidedSteps: [
          { instruction: 'List current active background jobs', command: 'jobs -l', hint: 'Run jobs -l' },
          { instruction: 'Inspect nohup syntax for persistent execution', command: 'echo "nohup cmd > out.log 2>&1 &"', hint: 'View nohup syntax' },
        ],
        targetTask: 'Check active shell jobs using jobs -l',
        solutionCommands: ['jobs -l'],
      },
      commonMistakes: [
        { mistake: 'Running a long task with & alone and disconnecting SSH', whyWrong: 'The & operator runs the task in the background of that shell; when you exit SSH, the shell sends SIGHUP and kills the task.', correctWay: 'Use nohup command & or run it inside a tmux/screen session.' },
        { mistake: 'Forgetting to redirect output when using nohup', whyWrong: 'nohup will dump all stdout and stderr into a file named nohup.out in the current directory, which can fill up disk space unexpectedly.', correctWay: 'Explicitly redirect output: nohup ./script.sh > /var/log/script.log 2>&1 &.' },
      ],
      challenge: {
        question: 'What happens to a command running in the background with `&` when an SSH session closes, if nohup was NOT used?',
        options: [
          { label: 'The closing terminal sends SIGHUP to the session process group, terminating the background job', isCorrect: true, explanation: 'Unless SIGHUP is masked or disowned, the kernel terminates all child processes when the controlling pty closes.' },
          { label: 'The background job continues running forever without interruption', isCorrect: false, explanation: 'Standard background jobs receive SIGHUP upon logout.' },
          { label: 'The job is automatically paused with SIGSTOP', isCorrect: false, explanation: 'It is terminated, not paused.' },
          { label: 'systemd converts the job into a systemd service unit', isCorrect: false, explanation: 'systemd does not convert ad-hoc shell jobs into services.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['<command> &', 'jobs -l', 'fg %<id>', 'bg %<id>', 'nohup <cmd> > out.log 2>&1 &'],
        bestPractices: [
          'Use tmux or screen for interactive persistent sessions across SSH disconnections',
          'Use systemd unit files instead of nohup for real production services and APIs',
        ],
      },
    },
  ],
};
