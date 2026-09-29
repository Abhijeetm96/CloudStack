import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 11: PROCESSES (11.1 to 11.18)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_11: LinuxTopic = {
  id: 'ch-11',
  number: '11',
  title: 'Processes',
  iconName: 'Cpu',
  description: 'Master Linux process management: PIDs, parent/child trees, signals (SIGTERM, SIGKILL), ps, top, htop, jobs, and scheduling priority (nice/renice).',
  concepts: [
    buildLinuxConcept({
      id: 'c-11-01',
      subChapterNumber: '11.1',
      command: 'ps -ef | head -n 10',
      title: 'What is a Process?',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'A program in execution: memory address space, threads, file descriptors, and CPU scheduling context',
      badges: ['Processes', 'Kernel', 'Core'],
      difficulty: 'Beginner',
      quote: 'A program is passive code sitting on a disk; a process is that code brought to life in active computer memory.',
      whatIsIt: 'A Process is an instance of an executing computer program. It possesses its own private virtual memory address space (managed by the MMU), registers, execution stack, open file descriptors, security credentials (UID/GID), signal handlers, and one or more threads of execution scheduled by the Linux CFS (Completely Fair Scheduler). In the Linux kernel, every process is represented by a "task_struct" struct in memory.',
      inSimpleWords: 'Think of a recipe in a cookbook as a program (passive on the shelf). When a chef stands at the stove actually cooking the meal, that chef and hot kitchen is the process (active in memory).',
      whyDoYouNeedIt: 'Understanding processes is essential to diagnosing high CPU usage, memory leaks, runaway web workers, and thread lockups.',
      realWorldScenario: 'A Node.js backend freezes and stops responding to API requests. You inspect active processes using "ps" to discover the process is trapped in an infinite CPU loop, consuming 100% of a CPU core.',
      realWorldAnalogy: 'A blueprint of an airplane (program on disk) versus the airplane flying in the sky with fuel, passengers, and active pilots (process in RAM).',
      withoutVsWith: {
        without: {
          title: 'System Without Process Isolation',
          items: ['Programs overwrite each other\'s memory and variables', 'One crashed app crashes the whole operating system', 'No ability to monitor CPU or memory usage per program'],
          outcome: 'Constant blue-screens, zero multi-tenancy, and security chaos.'
        },
        with: {
          title: 'Linux Process Architecture',
          items: ['Hardware MMU memory isolation prevents cross-process tampering', 'Preemptive multitasking shares CPU cores fairly between thousands of processes', 'Detailed real-time telemetry on CPU, memory, and open sockets'],
          outcome: 'Rock-solid multi-user uptime, high scalability, and isolated failures.'
        }
      },
      blockDiagram: {
        title: 'Linux Process Memory Layout (Virtual Address Space)',
        subtitle: 'Protected user space memory map managed by kernel MMU:',
        nodes: [
          { id: 'stack', label: 'Stack Memory', simpleDef: 'Function call frames and local variables', techDef: 'Grows downward toward heap; thread local storage', badge: 'Stack', color: '#38bdf8' },
          { id: 'heap', label: 'Heap Memory (malloc)', simpleDef: 'Dynamic application memory allocations', techDef: 'Grows upward via brk() and mmap() syscalls', badge: 'Heap', color: '#a855f7' },
          { id: 'data', label: 'Data & BSS Segments', simpleDef: 'Global and static variables', techDef: 'Initialized (.data) and uninitialized (.bss) binary data', badge: 'Data', color: '#10b981' },
          { id: 'text', label: 'Text Segment (Code)', simpleDef: 'Read-only compiled machine instructions', techDef: 'Read-only executable machine code pages', badge: 'Code', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'task_struct', simple: 'The master kernel data structure representing a running process.', technical: 'The C struct in include/linux/sched.h holding PID, state, mm_struct, files_struct, and signal_struct.' },
        { term: 'Context Switch', simple: 'The CPU saving one process\'s state and loading another process.', technical: 'Saving hardware CPU registers and updating CR3 page table register in milliseconds.' }
      ],
      syntaxCode: 'ps -ef',
      syntaxTokens: [
        { token: 'ps', role: 'command', explanation: 'Process status report' },
        { token: '-ef', role: 'flag', explanation: 'Every process (-e) with full details format (-f)' }
      ],
      variations: [
        { syntax: 'ls -ld /proc/$$', title: 'Inspect Active Shell Process', whatItDoes: 'Exposes procfs virtual directory for current shell process ($$)', whenToUse: 'Direct kernel process memory inspection' },
        { syntax: 'cat /proc/loadavg', title: 'Check System Load Average', whatItDoes: 'Displays running and runnable process queue averages over 1, 5, 15 minutes', whenToUse: 'Capacity monitoring' }
      ],
      beforeAfter: {
        before: '$ ps -p 1\n[Querying Process ID 1...]',
        after: '    PID TTY          TIME CMD\n      1 ?        00:00:02 systemd',
        explanation: 'Confirms PID 1 (systemd) is the root ancestor of all user space processes.'
      },
      expectedOutput: 'PID TTY TIME CMD\n1 ? 00:00:02 systemd',
      whatChanges: ['Reads process table from kernel memory (/proc).'],
      whatDoesNotChange: ['Running processes are untouched.'],
      safeRecovery: '100% safe read-only query.',
      commonMistakes: [
        { mistake: 'Thinking threads and processes are completely separate in Linux', whyItHappens: 'Other OSs use distinct primitives.', howToFix: 'In Linux, threads are simply lightweight processes (tasks) that share the same memory space (CLONE_VM).' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-02',
      subChapterNumber: '11.2',
      command: 'echo $$',
      title: 'Process IDs',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Unique numeric integers identifying every active task on the system',
      badges: ['PID', 'Process', 'Core'],
      difficulty: 'Beginner',
      quote: 'PID 1 is the father of all processes; every other program on the computer is its child or grandchild.',
      whatIsIt: 'A Process ID (PID) is a unique positive integer assigned sequentially by the Linux kernel to each newly spawned process. PIDs range from 1 to a configurable maximum (/proc/sys/kernel/pid_max, default 4,194,304 on 64-bit systems). PID 1 is permanently reserved for the init system (systemd), which boots the machine and adopts orphaned processes.',
      inSimpleWords: 'A PID is like a passport number for a running program. If you have 5 different instances of Google Chrome open, each one has its own distinct PID number so Linux knows which one is which.',
      whyDoYouNeedIt: 'You need PIDs to target specific programs when killing hung services ("kill 1420"), monitoring CPU consumption, or inspecting memory.',
      realWorldScenario: 'A rogue background script is eating 100% CPU. You run "top" and observe it has PID 4521. You run "kill 4521" to terminate that exact process without affecting any other services.',
      realWorldAnalogy: 'A tracking number on an Amazon package.',
      terms: [
        { term: 'PID (Process ID)', simple: 'The unique integer identifying a process.', technical: 'Allocated by kernel pidmap bitmap allocator; unique in the active PID namespace.' },
        { term: '$$ Variable', simple: 'Special Bash variable that outputs the PID of your current terminal shell.', technical: 'Shell parameter expanding to the getpid() return value of the calling shell.' }
      ],
      syntaxCode: 'echo $$',
      syntaxTokens: [
        { token: 'echo', role: 'command', explanation: 'Print value' },
        { token: '$$', role: 'argument', explanation: 'Special shell variable expanding to current shell PID' }
      ],
      variations: [
        { syntax: 'pgrep nginx', title: 'Find PIDs by Program Name', whatItDoes: 'Returns the integer PIDs of all processes named nginx', whenToUse: 'Script automation without manual parsing' },
        { syntax: 'pidof nginx', title: 'List All PIDs of Daemon', whatItDoes: 'Outputs space-separated PIDs of all running instances', whenToUse: 'Service health checks' }
      ],
      beforeAfter: {
        before: '$ echo $$\n[Querying active shell PID...]',
        after: '28401',
        explanation: 'Your active bash shell process is identified by PID 28401.'
      },
      expectedOutput: '28401',
      whatChanges: ['Queries in-memory PID.'],
      whatDoesNotChange: ['System remains intact.'],
      safeRecovery: 'Non-destructive inspection.',
      commonMistakes: [
        { mistake: 'Assuming PIDs are permanent across server reboots', whyItHappens: 'Thinking PIDs are static numbers like MAC addresses.', howToFix: 'PIDs are assigned dynamically on startup; never hardcode PIDs in configuration files.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-03',
      subChapterNumber: '11.3',
      command: 'pstree -p',
      title: 'Parent and Child Processes',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'The hierarchical process tree: PPID, fork()/clone(), zombie processes, and orphan adoption',
      badges: ['PPID', 'ProcessTree', 'Kernel'],
      difficulty: 'Intermediate',
      quote: 'No process creates itself; every process is forked by a parent process (PPID).',
      whatIsIt: 'In Linux, processes form a strict hierarchical tree originating at PID 1. Every process has a Parent Process ID (PPID). New processes are created using the fork() (or clone()) system call, creating an exact copy of the parent, followed by execve() to load the new binary. When a child terminates, it remains in a "Zombie" state until the parent reads its exit status with waitpid(). If a parent dies before its child, the child becomes an "Orphan" and is automatically adopted by PID 1 (systemd).',
      inSimpleWords: 'It is a family tree of software. Systemd (the grandparent) launches SSH (the parent). When you log in, SSH launches Bash (the child). When you type "ls", Bash launches ls (the grandchild).',
      whyDoYouNeedIt: 'Understanding PPIDs is critical when killing rogue applications: killing a child worker process is useless if the master parent process immediately respawns a new worker. You must kill the parent.',
      realWorldScenario: 'An Nginx web server has 1 master process and 4 worker processes. If a worker process crashes or is killed, the master parent process immediately detects it and forks a replacement worker in 1 millisecond.',
      realWorldAnalogy: 'A company hierarchy: CEO (PID 1) $\rightarrow$ VP of Engineering (PPID) $\rightarrow$ Software Engineer (Child process).',
      terms: [
        { term: 'PPID (Parent PID)', simple: 'The ID of the parent process that created this child process.', technical: 'Field in task_struct holding pointer to parent struct task_struct.' },
        { term: 'Zombie Process (Z)', simple: 'A dead process whose parent has not yet collected its exit code.', technical: 'Process that called exit() but retains task_struct entry because parent hasn\'t called wait().' },
        { term: 'Orphan Process', simple: 'A running process whose parent died while it was still executing.', technical: 'Re-parented to init_task / PID 1 or subreaper.' }
      ],
      syntaxCode: 'pstree [OPTIONS] [PID]',
      syntaxTokens: [
        { token: 'pstree', role: 'command', explanation: 'Display a tree of processes' },
        { token: '-p', role: 'flag', explanation: 'Show process IDs in parentheses' }
      ],
      variations: [
        { syntax: 'ps -o pid,ppid,comm', title: 'Display PID and Parent PPID', whatItDoes: 'Prints custom columns showing child PID and parent PPID', whenToUse: 'Mapping parent-child relationships' },
        { syntax: 'ps aux | grep "Z"', title: 'Find Zombie Processes', whatItDoes: 'Filters process list for status "Z" (defunct/zombie)', whenToUse: 'Investigating memory leaks' }
      ],
      beforeAfter: {
        before: '$ pstree -p 1\n[Traversing process tree from systemd...]',
        after: 'systemd(1)───sshd(1040)───sshd(2800)───bash(2801)───pstree(2850)',
        explanation: 'Visually depicts the full parentage chain from systemd down to the running pstree command.'
      },
      expectedOutput: 'systemd(1)───sshd(1040)───bash(2801)',
      whatChanges: ['Reads process table hierarchy.'],
      whatDoesNotChange: ['Processes remain intact.'],
      safeRecovery: 'Read-only inspection.',
      commonMistakes: [
        { mistake: 'Trying to kill a Zombie process with "kill -9 <PID>"', whyItHappens: 'A zombie is ALREADY dead; you cannot kill a corpse!', howToFix: 'Zombies take zero RAM/CPU. To remove a zombie, kill its parent process so PID 1 adopts and reaps it.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-04',
      subChapterNumber: '11.4',
      command: 'ps aux',
      title: 'ps',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Process Status: static snapshot of all active processes, resource utilization, and states',
      badges: ['ps', 'Processes', 'Core'],
      difficulty: 'Beginner',
      quote: 'ps aux is the most famous status snapshot in Unix: a = all users, u = user-oriented, x = include daemons.',
      whatIsIt: 'ps ("Process Status") provides a static point-in-time snapshot of currently running processes. The standard BSD-style flags "ps aux" display: "a" (processes of all users), "u" (user-oriented format with CPU%, MEM%, and start time), and "x" (processes without an attached controlling terminal, e.g. background daemons).',
      inSimpleWords: 'Typing "ps aux" is like taking a panoramic photograph of everything happening inside your computer at this exact microsecond.',
      whyDoYouNeedIt: 'ps is the primary tool used in shell scripts and terminal investigations to find process IDs, check execution arguments, and verify if a service is alive.',
      realWorldScenario: 'You deploy a new Python microservice in the background. You type "ps aux | grep \'python main.py\'" to verify that the service is actively running and observe its CPU and RAM footprint.',
      realWorldAnalogy: 'A printed roster showing every employee currently clocked in at the factory today.',
      terms: [
        { term: 'STAT Codes', simple: 'Letters showing process health: R (Running), S (Sleeping), D (Uninterruptible Sleep/Disk), Z (Zombie).', technical: 'Process execution state flags in task_struct (__state).' },
        { term: 'RSS (Resident Set Size)', simple: 'The actual non-swapped physical RAM memory the process is using right now.', technical: 'Exact physical pages allocated in RAM for this process in Kilobytes.' }
      ],
      syntaxCode: 'ps aux',
      syntaxTokens: [
        { token: 'ps', role: 'command', explanation: 'Report a snapshot of the current processes' },
        { token: 'aux', role: 'flag', explanation: 'All users (a), user-oriented format (u), without controlling terminal (x)' }
      ],
      variations: [
        { syntax: 'ps -ef', title: 'Standard POSIX Style', whatItDoes: 'Full listing format showing UID, PID, PPID, and command', whenToUse: 'Standard Unix systems' },
        { syntax: 'ps aux --sort=-%cpu | head -n 6', title: 'Top CPU Consumers', whatItDoes: 'Sorts processes by CPU percentage descending', whenToUse: 'Quick CPU bottleneck triage' }
      ],
      beforeAfter: {
        before: '$ ps aux | head -n 3\n[Reading process table snapshot...]',
        after: 'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1 168400 12800 ?        Ss   10:00   0:01 /sbin/init\nwww-data  1402  0.2  0.4 245000 32000 ?        S    10:15   0:04 nginx: worker',
        explanation: 'Outputs complete telemetry: user, PID, CPU%, memory%, RSS RAM, state, and binary command line.'
      },
      expectedOutput: 'USER PID %CPU %MEM COMMAND',
      whatChanges: ['Reads process states.'],
      whatDoesNotChange: ['Processes remain running.'],
      safeRecovery: '100% safe read-only tool.',
      commonMistakes: [
        { mistake: 'Confusing VSZ (Virtual Memory) with RSS (Real Physical RAM)', whyItHappens: 'VSZ can be 50GB for a database while real physical RSS is only 2GB.', howToFix: 'Always look at RSS (Resident Set Size) to determine actual RAM consumption.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-05',
      subChapterNumber: '11.5',
      command: 'top',
      title: 'top',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'The dynamic real-time system monitor: live CPU load, memory pressure, and process ranking',
      badges: ['Monitoring', 'Top', 'Core'],
      difficulty: 'Beginner',
      quote: 'top is the live ICU heart monitor of Linux: updating every 3 seconds with real-time vitals.',
      whatIsIt: 'top provides an interactive, real-time dynamic view of a running Linux system. It refreshes every 3 seconds (configurable), displaying summary telemetry at the top (uptime, load averages, CPU breakdown across user/system/idle/iowait, physical memory, and swap) followed by an automatically updating list of processes ranked by CPU usage.',
      inSimpleWords: 'While "ps" is a static photograph, "top" is a live video stream. You sit back and watch processes move up and down as they consume CPU and memory in real time. Press "q" to exit.',
      whyDoYouNeedIt: 'When a server slows to a crawl, typing "top" immediately shows you whether the bottleneck is high CPU (%usr), kernel overhead (%sys), waiting for slow hard drives (%wa / iowait), or running out of RAM.',
      realWorldScenario: 'Users complain an API is sluggish. You SSH in and type "top". You look at the CPU summary line: "%Cpu(s): 0.2 us, 0.1 sy, 98.2 wa". CPU usage is almost zero, but 98% is spent in "wa" (iowait)! The server is not CPU bound; its hard drive is bottlenecked.',
      realWorldAnalogy: 'The Task Manager in Windows or Activity Monitor on macOS.',
      terms: [
        { term: 'Load Average', simple: 'The number of processes waiting for CPU or disk over 1, 5, and 15 minutes.', technical: 'Exponentially damped moving average of uninterruptible (D) and runnable (R) tasks.' },
        { term: '%wa (I/O Wait)', simple: 'Percentage of time the CPU was sitting idle waiting for a slow disk.', technical: 'CPU cycle percentage blocked on pending disk read/write requests.' }
      ],
      syntaxCode: 'top [OPTIONS]',
      syntaxTokens: [
        { token: 'top', role: 'command', explanation: 'Display Linux processes in real-time dynamic view' },
        { token: '[options]', role: 'flag', explanation: 'Optional flags: -b (batch mode for scripts), -d 1 (1s refresh)' }
      ],
      variations: [
        { syntax: 'top -b -n 1 | head -n 20', title: 'Batch Mode Snapshot', whatItDoes: 'Runs top once non-interactively and outputs text to stdout', whenToUse: 'Logging top output in cron or scripts' },
        { syntax: 'top -p 1420', title: 'Monitor Single PID', whatItDoes: 'Restricts live monitoring exclusively to PID 1420', whenToUse: 'Profiling a specific application' }
      ],
      beforeAfter: {
        before: '$ top\n[Opens dynamic live telemetry screen...]',
        after: 'top - 11:20:00 up 12 days,  load average: 0.15, 0.08, 0.02\nTasks: 180 total,   1 running, 179 sleeping,   0 stopped,   0 zombie\n%Cpu(s):  2.4 us,  1.0 sy,  0.0 ni, 96.5 id,  0.1 wa\nMiB Mem :  16000.0 total,   4200.0 free,   8500.0 used,   3300.0 buff/cache\n[Press "q" to exit]',
        explanation: 'Provides live updating telemetry across CPU cores, memory caches, and processes.'
      },
      expectedOutput: '[Dynamic interactive dashboard. Press "q" to exit.]',
      whatChanges: ['Continuously polls /proc metrics.'],
      whatDoesNotChange: ['System remains intact.'],
      safeRecovery: 'Press "q" to exit top.',
      commonMistakes: [
        { mistake: 'Panicking when top shows memory is 95% used', whyItHappens: 'Linux uses free RAM for disk caching (buff/cache) to make the computer fast; it releases this RAM instantly if an app needs it!', howToFix: 'Check "available" memory, not "free" memory.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-06',
      subChapterNumber: '11.6',
      command: 'htop',
      title: 'htop',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'The modern colorful interactive process viewer with visual CPU gauges and mouse navigation',
      badges: ['htop', 'Monitoring', 'Interactive'],
      difficulty: 'Beginner',
      quote: 'htop takes the power of top and makes it intuitive: colorized per-core gauges, scrolling, and function keys.',
      whatIsIt: 'htop is an advanced, colorized, ncurses-based interactive process monitor. Unlike classic top, htop displays dedicated visual percentage bars for every individual CPU core, separate color gauges for RAM vs Buffers/Cache vs Swap, supports vertical AND horizontal scrolling through long command lines, and lets you kill or renice processes using on-screen Function keys (F9 Kill, F7/F8 Nice) or mouse clicks.',
      inSimpleWords: 'htop is top on steroids. It is beautiful, colorful, shows every CPU core with its own progress bar, and lets you scroll with your arrow keys or click with your mouse.',
      whyDoYouNeedIt: 'On modern multi-core servers (32 or 64 cores), top only shows a single blended CPU number. htop visually shows you if one single CPU core is pinned at 100% while others sit idle.',
      realWorldScenario: 'You are profiling a multi-threaded web application. You open htop and observe that Core 0 is red at 100%, while Cores 1-7 are green at 5%. This visual insight immediately proves your application is running on a single thread and failing to utilize multi-core parallelism.',
      realWorldAnalogy: 'Upgrading from a black-and-white analog dashboard to a full digital color touchscreen cockpit in a sports car.',
      terms: [
        { term: 'Per-Core Gauge', simple: 'A visual progress bar showing the load on each individual CPU core.', technical: 'Multi-core CPU utilization percentage breakdown displayed via ncurses bar widgets.' },
        { term: 'Tree View (F5)', simple: 'Displays parent and child processes indented like branches in htop.', technical: 'Toggles hierarchical process tree rendering based on PPID.' }
      ],
      syntaxCode: 'htop [OPTIONS]',
      syntaxTokens: [
        { token: 'htop', role: 'command', explanation: 'Interactive process viewer' },
        { token: '[options]', role: 'flag', explanation: 'Optional flags: -u username (filter by user), -d 10 (tenth-second refresh)' }
      ],
      variations: [
        { syntax: 'htop -u www-data', title: 'Filter by User', whatItDoes: 'Shows only processes owned by web server user www-data', whenToUse: 'Profiling web workers' },
        { syntax: 'htop -t', title: 'Start in Tree Mode', whatItDoes: 'Launches htop with parent-child process tree active by default', whenToUse: 'Process lineage analysis' }
      ],
      beforeAfter: {
        before: '$ htop\n[Opens full-color ncurses terminal dashboard]',
        after: '[CPU gauges 1-8 visualized in green/blue/red]\n[Memory bar showing RAM + Cache allocation]\n[Press F9 to kill, F10 to quit]',
        explanation: 'Provides interactive mouse-supported process management canvas.'
      },
      expectedOutput: '[Interactive colorful process dashboard. Press F10 to exit.]',
      whatChanges: ['Polls /proc and renders ncurses UI.'],
      whatDoesNotChange: ['System remains intact.'],
      safeRecovery: 'Press F10 or "q" to exit htop.',
      commonMistakes: [
        { mistake: 'Assuming htop is pre-installed on minimal server images', whyItHappens: 'Minimal distros omit htop to save disk space.', howToFix: 'Install it via "sudo apt install htop" or use built-in "top".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-07',
      subChapterNumber: '11.7',
      command: 'jobs -l',
      title: 'jobs',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Shell job control: inspect running, stopped, and background tasks in current session',
      badges: ['Jobs', 'Shell', 'Core'],
      difficulty: 'Beginner',
      quote: 'PIDs belong to the operating system; Job IDs ([1], [2]) belong to your active shell session.',
      whatIsIt: 'Job Control is a shell feature that manages multiple programs running under the same terminal session. The "jobs" builtin lists all tasks started by your current shell: their Job Number (e.g. [1], [2]), whether they are "Running" in the background or "Stopped" (suspended), their PID (-l), and the command string.',
      inSimpleWords: 'When you pause a program with Ctrl+Z or send it to the background with "&", typing "jobs" lists those paused tasks so you can resume them.',
      whyDoYouNeedIt: 'You need job control to multitask in a single terminal window without opening multiple SSH sessions.',
      realWorldScenario: 'You are editing code in vim. You need to check a log file. Instead of quitting vim and losing your cursor position, you hit Ctrl+Z to suspend vim. You run "jobs" to see "[1]+ Stopped vim". You check your log, and then resume vim with "fg".',
      realWorldAnalogy: 'Minimizing an application window to your desktop taskbar so you can do something else, then clicking it to bring it back.',
      terms: [
        { term: 'Job ID ([N])', simple: 'The bracketed number assigned by the shell to a background task.', technical: 'Shell session task identifier used by fg, bg, and kill (e.g. %1, %2).' },
        { term: 'Stopped State', simple: 'A process paused by Ctrl+Z waiting for a SIGCONT signal.', technical: 'Process placed in TASK_STOPPED state via SIGTSTP signal.' }
      ],
      syntaxCode: 'jobs [OPTIONS]',
      syntaxTokens: [
        { token: 'jobs', role: 'command', explanation: 'List active shell jobs' },
        { token: '-l', role: 'flag', explanation: 'List process IDs in addition to normal information' }
      ],
      variations: [
        { syntax: 'kill %1', title: 'Kill Job by Job Number', whatItDoes: 'Sends SIGTERM to Job #1 using percent symbol prefix (%)', whenToUse: 'Terminating background tasks cleanly' }
      ],
      beforeAfter: {
        before: '$ jobs -l\n[Querying active shell session jobs...]',
        after: '[1]+ 24102 Stopped                 vim app.py\n[2]- 24105 Running                 ./backup.sh &',
        explanation: 'Shows Job [1] (vim) is suspended and Job [2] (backup.sh) is running in the background.'
      },
      expectedOutput: '[1]+ Running command &',
      whatChanges: ['Reads shell job control table.'],
      whatDoesNotChange: ['Job execution states are unmodified.'],
      safeRecovery: 'Non-destructive inspection.',
      commonMistakes: [
        { mistake: 'Opening a new terminal window and wondering why "jobs" is empty', whyItHappens: 'Job control is strictly LOCAL to the specific shell session that created the job.', howToFix: 'In a new terminal window, use "ps aux | grep script" to find processes by PID.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-08',
      subChapterNumber: '11.8',
      command: 'fg %1',
      title: 'fg',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Foreground: bring background or suspended jobs back to the interactive terminal foreground',
      badges: ['Jobs', 'Foreground', 'Core'],
      difficulty: 'Beginner',
      quote: 'fg reconnects your keyboard and screen to a paused background task.',
      whatIsIt: 'fg ("Foreground") brings a background or suspended job into the terminal foreground, restoring its connection to terminal standard input (fd 0) and terminal signals (Ctrl+C, Ctrl+Z). If the job was suspended (Stopped), fg sends the SIGCONT signal to resume its execution.',
      inSimpleWords: 'If you paused a program with Ctrl+Z to do something else, typing "fg" brings that program right back onto your screen so you can continue working.',
      whyDoYouNeedIt: 'You need fg to resume suspended text editors (vim/nano), interactive python shells, or debugging sessions.',
      realWorldScenario: 'You are editing /etc/nginx/nginx.conf in vim. You press Ctrl+Z to test the configuration with "nginx -t". The test passes. You type "fg" $\rightarrow$ vim reappears instantly on your screen at the exact cursor line where you left off.',
      realWorldAnalogy: 'Restoring a minimized application window back to full screen.',
      terms: [
        { term: 'Terminal Controlling Process', simple: 'The single foreground process allowed to receive keyboard inputs.', technical: 'Process group possessing the terminal foreground process group ID (tcsetpgrp).' }
      ],
      syntaxCode: 'fg [%JOB_NUMBER]',
      syntaxTokens: [
        { token: 'fg', role: 'command', explanation: 'Move job to the foreground' },
        { token: '%1', role: 'argument', explanation: 'Target Job Number 1 (defaults to most recent job if omitted)' }
      ],
      variations: [
        { syntax: 'fg', title: 'Resume Most Recent Job', whatItDoes: 'Brings the job marked with "+" in "jobs" to the foreground', whenToUse: 'Quickest way to resume work' }
      ],
      beforeAfter: {
        before: '$ jobs\n[1]+ Stopped vim config.py\n$ fg',
        after: '[vim resumes instantly on screen at line 42]',
        explanation: 'The shell restored vim to the foreground and sent SIGCONT to resume execution.'
      },
      expectedOutput: '[Target job brought to interactive foreground]',
      whatChanges: ['Transfers terminal control and sends SIGCONT signal.'],
      whatDoesNotChange: ['Job memory and state are preserved.'],
      safeRecovery: 'If you bring the wrong job to foreground, press Ctrl+Z to pause it again.',
      commonMistakes: [
        { mistake: 'Typing "fg 1" without the percent sign on some shells', whyItHappens: 'Some shells require "%1" to designate a job ID.', howToFix: 'Always use the percent prefix: "fg %1".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-09',
      subChapterNumber: '11.9',
      command: 'bg %1',
      title: 'bg',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Background: resume a paused suspended job so it runs silently in the background',
      badges: ['Jobs', 'Background', 'Core'],
      difficulty: 'Beginner',
      quote: 'bg lets long-running jobs continue working while giving you back your command prompt.',
      whatIsIt: 'bg ("Background") sends a SIGCONT signal to a suspended (Stopped) job, instructing it to resume execution silently in the background while immediately returning control of the terminal prompt to the user.',
      inSimpleWords: 'You started a huge file download or backup, but forgot to put "&" at the end, so it locked up your terminal. Press Ctrl+Z to pause it, then type "bg". The backup continues running in the background and you get your prompt back!',
      whyDoYouNeedIt: 'You need bg when you accidentally launch a long-running process in the foreground and want to reclaim your terminal without killing the job.',
      realWorldScenario: 'You start compressing a 100GB database dump: "tar -czf db.tar.gz /var/lib/mysql". You realize it will take 45 minutes and your terminal is locked. You press Ctrl+Z (pausing the job), then type "bg". The tar compression resumes silently in the background, freeing your terminal immediately.',
      realWorldAnalogy: 'Telling a worker: "Step out into the hallway and finish packing those boxes while I use this desk for something else".',
      terms: [
        { term: 'SIGCONT', simple: 'The signal that tells a paused process to continue running.', technical: 'Signal 18 waking process from TASK_STOPPED state back to TASK_RUNNING.' }
      ],
      syntaxCode: 'bg [%JOB_NUMBER]',
      syntaxTokens: [
        { token: 'bg', role: 'command', explanation: 'Move job to the background' },
        { token: '%1', role: 'argument', explanation: 'Target job number to resume in background' }
      ],
      variations: [
        { syntax: './heavy_task.sh &', title: 'Launch in Background Directly', whatItDoes: 'Trailing ampersand (&) starts process in background immediately', whenToUse: 'When you know in advance the job is long-running' }
      ],
      beforeAfter: {
        before: '$ jobs\n[1]+ Stopped tar -czf backup.tar.gz /data\n$ bg %1',
        after: '[1]+ tar -czf backup.tar.gz /data &\n$ [Prompt returned immediately; tar runs in background]',
        explanation: 'Resumed the paused compression task in the background and unlocked the prompt.'
      },
      expectedOutput: '[1]+ command &',
      whatChanges: ['Sends SIGCONT and detaches stdin from terminal.'],
      whatDoesNotChange: ['Process execution continues uninterrupted.'],
      safeRecovery: 'Bring back to foreground anytime with "fg %1".',
      commonMistakes: [
        { mistake: 'Running "bg" on an interactive program that requires typing (like vim or nano)', whyItHappens: 'Interactive programs cannot run in the background because they have no terminal input.', howToFix: 'Interactive programs must be in the foreground (fg).' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-10',
      subChapterNumber: '11.10',
      command: 'kill -l',
      title: 'Process Signals',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Asynchronous software interrupts: communication protocol controlling process lifecycles',
      badges: ['Signals', 'IPC', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Signals are the asynchronous taps on the shoulder that tell processes to reload, pause, or die.',
      whatIsIt: 'A Signal is an asynchronous notification sent by the Linux kernel to a process to notify it that an event occurred (software interrupt). Standard POSIX defines 31 basic signals (e.g. SIGTERM, SIGKILL, SIGINT, SIGHUP, SIGQUIT). Processes can choose to catch and handle signals (e.g. running cleanup code before exiting), ignore them, or let the kernel apply the default action (termination or core dump).',
      inSimpleWords: 'Signals are how you send urgent messages to running programs. You can whisper "Please finish your work and close down" (SIGTERM), press Ctrl+C to say "Cancel what you are doing" (SIGINT), or drop an anvil on it to destroy it instantly (SIGKILL).',
      whyDoYouNeedIt: 'Signals are the standard protocol for graceful service reloads (SIGHUP), container shutdowns in Docker and Kubernetes (SIGTERM), and terminating hung processes.',
      realWorldScenario: 'Kubernetes is scaling down a microservice pod. It sends SIGTERM to the container. The application catches SIGTERM, stops accepting new HTTP requests, finishes processing in-flight database transactions for 10 seconds, and exits cleanly with zero data corruption.',
      realWorldAnalogy: 'Fire alarms, stop signs, and emergency stop buttons on an industrial factory floor.',
      terms: [
        { term: 'Signal Handler', simple: 'A custom function inside a program that runs when a signal is received.', technical: 'Registered via sigaction() system call to intercept signals.' },
        { term: 'Uncatchable Signals', simple: 'SIGKILL (9) and SIGSTOP (19) can NEVER be caught, blocked, or ignored.', technical: 'Handled directly by the kernel scheduler; execution stops immediately.' }
      ],
      syntaxCode: 'kill -l',
      syntaxTokens: [
        { token: 'kill', role: 'command', explanation: 'Send signal to processes' },
        { token: '-l', role: 'flag', explanation: 'List all available signal names and numbers' }
      ],
      variations: [
        { syntax: 'kill -s SIGHUP $(pidof nginx)', title: 'Graceful Config Reload', whatItDoes: 'Tells Nginx to reload configs without dropping connections', whenToUse: 'Live web server configuration updates' }
      ],
      beforeAfter: {
        before: '$ kill -l | head -n 4\n[Querying kernel signal table...]',
        after: ' 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL\n 5) SIGTRAP      6) SIGABRT      7) SIGBUS       8) SIGFPE\n 9) SIGKILL     10) SIGUSR1     11) SIGSEGV     12) SIGUSR2\n13) SIGPIPE     14) SIGALRM     15) SIGTERM     16) SIGSTKFLT',
        explanation: 'Lists standard POSIX signal numbers: 15=SIGTERM, 9=SIGKILL, 2=SIGINT, 1=SIGHUP.'
      },
      expectedOutput: '1) SIGHUP 2) SIGINT 9) SIGKILL 15) SIGTERM',
      whatChanges: ['Outputs signal catalog.'],
      whatDoesNotChange: ['Processes remain running.'],
      safeRecovery: '100% safe read-only inspection.',
      commonMistakes: [
        { mistake: 'Assuming "kill" always kills processes', whyItHappens: 'Name confusion.', howToFix: 'The command is named "kill", but it actually sends ANY signal (e.g. SIGHUP reloads without killing).' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-11',
      subChapterNumber: '11.11',
      command: 'kill -15 1420',
      title: 'SIGTERM',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Signal 15: the polite, catchable request for graceful application termination',
      badges: ['Signals', 'SIGTERM', 'Graceful'],
      difficulty: 'Beginner',
      quote: 'ALWAYS try SIGTERM (kill -15) first: give the process a chance to save files and close database connections.',
      whatIsIt: 'SIGTERM (Signal 15) is the standard termination signal sent by the default "kill" command. It politely requests that a process terminate. Because SIGTERM can be caught and handled by application code, the process can gracefully close open database connections, flush memory buffers to disk, remove temporary lockfiles, and cleanly exit.',
      inSimpleWords: 'SIGTERM is like tapping someone on the shoulder and saying "Excuse me, it is time to pack up your desk and go home". They can save their files, close their laptop, and leave cleanly.',
      whyDoYouNeedIt: 'Terminating databases or services abruptly corrupts data files. SIGTERM ensures zero data corruption.',
      realWorldScenario: 'You are shutting down a PostgreSQL database server. You send SIGTERM. PostgreSQL flushes the write-ahead log (WAL) to disk, cleanly terminates active client connections, and shuts down safely with zero database corruption.',
      realWorldAnalogy: 'Clicking "Shut Down" on your computer. It asks open apps to save their work before closing.',
      terms: [
        { term: 'Graceful Termination', simple: 'Closing open files, releasing locks, and finishing active jobs before quitting.', technical: 'Application signal handler intercepting SIGTERM to execute teardown routines before calling exit(0).' }
      ],
      syntaxCode: 'kill -15 [PID]',
      syntaxTokens: [
        { token: 'kill', role: 'command', explanation: 'Send signal' },
        { token: '-15', role: 'flag', explanation: 'Signal number 15 (SIGTERM - default if omitted)' },
        { token: '1420', role: 'argument', explanation: 'Target Process ID' }
      ],
      variations: [
        { syntax: 'kill 1420', title: 'Default Kill', whatItDoes: 'Sends SIGTERM automatically without needing "-15"', whenToUse: 'Everyday process termination' },
        { syntax: 'kill -TERM 1420', title: 'Named Signal', whatItDoes: 'Explicitly sends SIGTERM by name', whenToUse: 'Self-documenting scripts' }
      ],
      beforeAfter: {
        before: '$ ps -p 1820\n  PID TTY TIME CMD\n 1820 ?   00:00:01 node server.js\n$ kill 1820',
        after: '$ ps -p 1820\n[Process terminated cleanly after saving state]',
        explanation: 'The application caught SIGTERM, flushed buffers, and exited cleanly.'
      },
      expectedOutput: '[Process terminates gracefully]',
      whatChanges: ['Delivers signal 15 to target process signal queue.'],
      whatDoesNotChange: ['Other processes are untouched.'],
      safeRecovery: 'If process ignores SIGTERM after 10 seconds, escalate to SIGKILL (-9).',
      commonMistakes: [
        { mistake: 'Jumping straight to "kill -9" without trying "kill" (SIGTERM) first', whyItHappens: 'Impatience.', howToFix: 'Always try default kill first; kill -9 leaves behind stale lockfiles and corrupts open files.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-12',
      subChapterNumber: '11.12',
      command: 'kill -9 9410',
      title: 'SIGKILL',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Signal 9: the uncatchable, unignorable nuclear option enforced directly by the kernel scheduler',
      badges: ['Signals', 'SIGKILL', 'Danger'],
      difficulty: 'Beginner',
      quote: 'SIGKILL is the nuclear option: the process never sees it coming; the kernel instantly frees its memory.',
      whatIsIt: 'SIGKILL (Signal 9) is the ultimate, non-negotiable process termination signal. The Linux kernel explicitly forbids processes from catching, blocking, or ignoring SIGKILL. When delivered, the kernel scheduler immediately stops executing the process, frees its memory pages, closes all open file descriptors, and terminates the task unconditionally.',
      inSimpleWords: 'SIGKILL is pulling the electrical power plug from the wall. The program does not get a chance to save its work, say goodbye, or close files. It is erased from memory instantly.',
      whyDoYouNeedIt: 'When a process is completely frozen, trapped in an infinite memory allocation loop, or ignoring SIGTERM, SIGKILL is the only weapon that guarantees destruction.',
      realWorldScenario: 'A Java application suffers a severe deadlock: all threads are permanently locked waiting on mutexes, completely ignoring normal "kill" requests. You execute "kill -9 9410". The Linux kernel eradicates the frozen process instantly.',
      realWorldAnalogy: 'A guillotine. It does not ask for permission; termination is immediate and absolute.',
      terms: [
        { term: 'Uncatchable Signal', simple: 'A signal the application cannot intercept or ignore.', technical: 'Handled directly by kernel complete_signal() without invoking userland signal frames.' }
      ],
      syntaxCode: 'kill -9 [PID]',
      syntaxTokens: [
        { token: 'kill', role: 'command', explanation: 'Send signal' },
        { token: '-9', role: 'flag', explanation: 'Signal number 9 (SIGKILL)' },
        { token: '9410', role: 'argument', explanation: 'Target Process ID to eradicate' }
      ],
      variations: [
        { syntax: 'kill -KILL 9410', title: 'Named SIGKILL', whatItDoes: 'Sends SIGKILL by name', whenToUse: 'Scripting' }
      ],
      beforeAfter: {
        before: '$ kill 9410\n[Process is frozen and ignores SIGTERM... still running]\n$ kill -9 9410',
        after: '$ ps -p 9410\n[Process completely eradicated from process table]',
        explanation: 'The kernel immediately freed the process memory and unlinked its PID.'
      },
      expectedOutput: '[Process destroyed immediately by kernel]',
      whatChanges: ['Frees all virtual memory pages and file descriptors of target process.'],
      whatDoesNotChange: ['Files already written to disk remain.'],
      safeRecovery: 'SIGKILL is irreversible. Only use it when standard kill (-15) fails.',
      commonMistakes: [
        { mistake: 'Using "kill -9" on database processes (MySQL, PostgreSQL)', whyItHappens: 'Impatience to stop the database.', howToFix: 'kill -9 corrupts database tables, requiring lengthy crash recovery on reboot. Use proper service stop commands!' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-13',
      subChapterNumber: '11.13',
      command: 'kill -2 4120',
      title: 'SIGINT',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Signal 2: the terminal interrupt signal triggered by pressing Ctrl+C',
      badges: ['Signals', 'SIGINT', 'Interactive'],
      difficulty: 'Beginner',
      quote: 'Every time you press Ctrl+C in a terminal, you are sending a SIGINT signal.',
      whatIsIt: 'SIGINT (Signal 2, Interrupt) is the terminal interrupt signal generated by the terminal line discipline whenever a user presses "Ctrl+C" on their keyboard. It instructs foreground programs to cancel their current operation and exit cleanly back to the shell prompt.',
      inSimpleWords: 'Ctrl+C is the universal "Stop what you are doing!" button in Linux. If ping is running infinitely or a script is taking too long, pressing Ctrl+C sends SIGINT to stop it.',
      whyDoYouNeedIt: 'It allows interactive terminal users to gracefully abort runaway commands without closing their terminal window.',
      realWorldScenario: 'You run "ping 8.8.8.8". Unlike Windows which stops after 4 pings, Linux ping runs forever until interrupted. You press Ctrl+C. Ping catches SIGINT, prints the aggregate packet loss statistics summary, and exits cleanly.',
      realWorldAnalogy: 'Pressing the "Cancel" button on an ATM screen while a transaction is processing.',
      terms: [
        { term: 'Ctrl+C (VINTR)', simple: 'The keyboard shortcut sending signal 2.', technical: 'Terminal driver termios c_cc[VINTR] control character generating SIGINT to foreground process group.' }
      ],
      syntaxCode: 'kill -2 [PID]',
      syntaxTokens: [
        { token: 'kill', role: 'command', explanation: 'Send signal' },
        { token: '-2', role: 'flag', explanation: 'Signal number 2 (SIGINT)' },
        { token: '4120', role: 'argument', explanation: 'Target PID' }
      ],
      variations: [
        { syntax: 'kill -INT 4120', title: 'Named SIGINT', whatItDoes: 'Sends SIGINT by name', whenToUse: 'Script automation' }
      ],
      beforeAfter: {
        before: '$ ping 8.8.8.8\n64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=12 ms\n^C',
        after: '--- 8.8.8.8 ping statistics ---\n1 packets transmitted, 1 received, 0% packet loss',
        explanation: 'Pressing Ctrl+C sent SIGINT; ping printed statistics and returned to prompt.'
      },
      expectedOutput: '[Operation cancelled, prompt returned]',
      whatChanges: ['Interrupts active foreground task.'],
      whatDoesNotChange: ['System remains intact.'],
      safeRecovery: '100% safe interactive cancel.',
      commonMistakes: [
        { mistake: 'Pressing Ctrl+Z when you meant Ctrl+C', whyItHappens: 'Ctrl+C CANCELS the program; Ctrl+Z SUSPENDS it in the background, keeping memory allocated!', howToFix: 'Use Ctrl+C to cancel; use "jobs" and "kill %1" if you accidentally used Ctrl+Z.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-14',
      subChapterNumber: '11.14',
      command: 'kill 5120',
      title: 'kill',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'The fundamental signal dispatcher delivering signals to target PIDs',
      badges: ['kill', 'Processes', 'Core'],
      difficulty: 'Beginner',
      quote: 'kill does not mean "terminate"; kill means "deliver a signal to this PID".',
      whatIsIt: 'The "kill" command invokes the kill() system call to deliver any specified signal to a process, process group, or thread. By default, if no signal is specified, kill sends SIGTERM (Signal 15). Unprivileged users can only kill processes they own; root can send signals to any process on the system.',
      inSimpleWords: 'Typing "kill 1234" tells process 1234 to shut down. You target the program using its PID number.',
      whyDoYouNeedIt: 'You need kill to stop hung processes, reload daemon configurations without restarting, and control background jobs.',
      realWorldScenario: 'A background worker process is stuck. You find its PID (5120) with pgrep. You run "kill 5120". The process terminates cleanly in 100 milliseconds.',
      realWorldAnalogy: 'Sending a formal certified letter to an exact postal address (PID).',
      terms: [
        { term: 'kill() Syscall', simple: 'The kernel operation that delivers a signal to a PID.', technical: 'POSIX system call verifying caller EUID matches target process UID before queuing signal.' }
      ],
      syntaxCode: 'kill [OPTIONS] PID...',
      syntaxTokens: [
        { token: 'kill', role: 'command', explanation: 'Send signal to process' },
        { token: '5120', role: 'argument', explanation: 'Target Process ID' }
      ],
      variations: [
        { syntax: 'kill -9 5120', title: 'Force Kill (SIGKILL)', whatItDoes: 'Sends uncatchable SIGKILL to force immediate termination', whenToUse: 'When standard kill fails' },
        { syntax: 'kill -HUP 5120', title: 'Send SIGHUP', whatItDoes: 'Sends Hangup signal (often triggers config reload)', whenToUse: 'Daemon reloads' }
      ],
      beforeAfter: {
        before: '$ ps -p 5120\n  PID TTY TIME CMD\n 5120 ?   00:00:05 python worker.py\n$ kill 5120',
        after: '$ ps -p 5120\n[Process terminated]',
        explanation: 'SIGTERM delivered to PID 5120; process terminated cleanly.'
      },
      expectedOutput: '[Signal delivered to target PID]',
      whatChanges: ['Delivers signal to target process.'],
      whatDoesNotChange: ['Unrelated processes are untouched.'],
      safeRecovery: 'Verify PID with "ps" before running kill to avoid killing the wrong process.',
      commonMistakes: [
        { mistake: 'Typing the wrong PID and accidentally killing your own SSH session', whyItHappens: 'Typo in PID number.', howToFix: 'Always verify the PID with "ps -p <PID>" or "pgrep" before executing kill.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-15',
      subChapterNumber: '11.15',
      command: 'killall nginx',
      title: 'killall',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Terminate all active processes matching a specified binary program name at once',
      badges: ['killall', 'Processes', 'Batch'],
      difficulty: 'Beginner',
      quote: 'kill targets a single PID; killall targets every running instance of a program name.',
      whatIsIt: 'killall sends a signal (default SIGTERM) to all processes running any of the specified commands. Instead of manually looking up 10 individual PIDs for 10 worker threads, typing "killall worker" terminates all 10 instances simultaneously.',
      inSimpleWords: 'If you have 8 different tabs or workers running for "chrome" or "node", you don\'t have to kill each one by hand. "killall chrome" shuts down all 8 at the exact same time.',
      whyDoYouNeedIt: 'You need killall for batch cleanup: shutting down clusters of workers, cleaning up runaway test processes, and stopping stuck daemons.',
      realWorldScenario: 'An automated test suite spawned 25 orphaned "chromedriver" processes that were left running in the background, consuming 4GB of RAM. You type "killall -9 chromedriver". All 25 processes are wiped out in 1 second.',
      realWorldAnalogy: 'Calling an all-hands meeting over the building loudspeaker telling all contractors to clock out.',
      terms: [
        { term: 'Process Name Matching', simple: 'Matching the binary name in /proc/<PID>/comm.', technical: 'Scans procfs comparing comm field against target string.' }
      ],
      syntaxCode: 'killall [OPTIONS] PROCESS_NAME...',
      syntaxTokens: [
        { token: 'killall', role: 'command', explanation: 'Kill processes by name' },
        { token: 'nginx', role: 'argument', explanation: 'Target binary name to terminate across all instances' }
      ],
      variations: [
        { syntax: 'killall -u username', title: 'Kill All Processes of User', whatItDoes: 'Terminates all running processes owned by a specific user', whenToUse: 'Forcefully logging out suspended users' },
        { syntax: 'killall -w nginx', title: 'Wait for Processes to Die', whatItDoes: 'Waits until all killed processes have fully exited before returning', whenToUse: 'Safe deployment scripts' }
      ],
      beforeAfter: {
        before: '$ pgrep nginx | wc -l\n5\n$ sudo killall nginx',
        after: '$ pgrep nginx | wc -l\n0',
        explanation: 'All 5 active Nginx master and worker instances were terminated simultaneously.'
      },
      expectedOutput: '[All matching processes terminated]',
      whatChanges: ['Delivers signal to all matching processes.'],
      whatDoesNotChange: ['Processes with different names are untouched.'],
      safeRecovery: 'Use "killall -i" (interactive) to ask for confirmation before killing each process.',
      commonMistakes: [
        { mistake: 'Running "killall" on Solaris or AIX systems', whyItHappens: 'ON SOLARIS/UNIX, "killall" KILLS EVERY SINGLE PROCESS ON THE ENTIRE OPERATING SYSTEM AND REBOOTS THE SERVER! (On Linux it is safe and only kills matching names).', howToFix: 'On non-Linux Unix systems, use "pkill" instead of "killall".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-16',
      subChapterNumber: '11.16',
      command: 'ps -eo pid,ni,pri,comm | head -n 10',
      title: 'Process Priority',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'CPU scheduling priority: CFS nice levels (-20 highest priority to +19 lowest priority)',
      badges: ['Priority', 'Scheduling', 'Core'],
      difficulty: 'Intermediate',
      quote: 'A "nice" process is polite: it yields CPU time to other processes. The higher the nice value, the less CPU it gets.',
      whatIsIt: 'Linux uses the Completely Fair Scheduler (CFS). Every process has a Priority (PRI) and a Nice Value (NI) ranging from -20 (highest priority, least nice to others, gets maximum CPU) to +19 (lowest priority, very nice to others, only gets CPU when nobody else wants it). Default priority for normal programs is 0.',
      inSimpleWords: 'Think of "nice" as politeness. If a program is "very nice" (+19), it stands at the back of the buffet line and lets everyone else eat first. If a program is "not nice" (-20), it cuts straight to the front of the line.',
      whyDoYouNeedIt: 'You need process priority to prevent heavy background jobs (like video encoding, database backups, or machine learning) from slowing down your live web server or freezing your SSH terminal.',
      realWorldScenario: 'You are running a heavy 4-hour database compression job on a live production server. To ensure the compression job does not slow down live customer web requests, you launch it with maximum politeness: "nice -n 19 tar -czf backup.tar.gz /data". Web requests stay fast and snappy.',
      realWorldAnalogy: 'VIP express lane passes (-20) versus standby economy tickets (+19) at an airport.',
      terms: [
        { term: 'Nice Value (-20 to +19)', simple: 'The number determining CPU priority. Lower means faster.', technical: 'Scheduling weight factor in Linux Completely Fair Scheduler (CFS).' },
        { term: 'CFS (Completely Fair Scheduler)', simple: 'The Linux kernel engine that divides CPU time fairly among all running tasks.', technical: 'Red-black tree scheduling algorithm balancing vruntime across active tasks.' }
      ],
      syntaxCode: 'ps -eo pid,ni,pri,comm',
      syntaxTokens: [
        { token: 'ps', role: 'command', explanation: 'Process status' },
        { token: '-eo pid,ni,pri,comm', role: 'flag', explanation: 'Display PID, Nice value (ni), Priority (pri), and command name' }
      ],
      variations: [
        { syntax: 'top', title: 'Inspect NI in Top', whatItDoes: 'Top displays "NI" column alongside CPU usage', whenToUse: 'Live priority monitoring' }
      ],
      beforeAfter: {
        before: '$ ps -eo pid,ni,comm | grep -E "nginx|backup"\n[Querying priority...]',
        after: ' 1402   0 nginx\n 8920  19 backup.sh',
        explanation: 'nginx runs with normal priority (0); backup runs with low background priority (19).'
      },
      expectedOutput: 'PID NI COMMAND\n1402 0 nginx',
      whatChanges: ['Reads scheduling priority fields.'],
      whatDoesNotChange: ['Priorities are unmodified.'],
      safeRecovery: 'Non-destructive inspection.',
      commonMistakes: [
        { mistake: 'Thinking +19 means highest priority because 19 is a big number', whyItHappens: 'Counter-intuitive naming.', howToFix: 'Remember: +19 is VERY NICE (yields to everyone); -20 is NOT NICE (demands all CPU).' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-17',
      subChapterNumber: '11.17',
      command: 'nice -n 10 ./data_batch.sh',
      title: 'nice',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Launch a new program with an altered scheduling nice level',
      badges: ['nice', 'Scheduling', 'Performance'],
      difficulty: 'Beginner',
      quote: 'nice sets the priority BEFORE the program starts; renice changes the priority while it is running.',
      whatIsIt: 'nice runs a command with an adjusted scheduling priority. Normal users can only make their processes nicer (positive numbers 1 to 19). Only root can assign negative nice numbers (-1 to -20) to grant high-priority CPU privileges.',
      inSimpleWords: 'Typing "nice -n 19 command" starts that command in the background with low priority so your computer never freezes up while it works.',
      whyDoYouNeedIt: 'You use nice in cron jobs and batch scripts to ensure scheduled tasks never spike server CPU latency for live users.',
      realWorldScenario: 'You configure a nightly log compression cron job. You prefix the command with nice: "nice -n 15 tar -czf /backup/logs.tar.gz /var/log/". Even while compressing 50GB of logs, the web server maintains sub-50ms response times.',
      realWorldAnalogy: 'Setting a dishwasher to run quietly in eco-mode overnight rather than during peak power hours.',
      terms: [
        { term: 'nice() Syscall', simple: 'The kernel operation setting task scheduling weight.', technical: 'POSIX system call updating task_struct->static_prio.' }
      ],
      syntaxCode: 'nice -n [NICE_VALUE] COMMAND',
      syntaxTokens: [
        { token: 'nice', role: 'command', explanation: 'Run a program with modified scheduling priority' },
        { token: '-n 10', role: 'flag', explanation: 'Nice increment value (10)' },
        { token: './data_batch.sh', role: 'path', explanation: 'Target program to launch' }
      ],
      variations: [
        { syntax: 'sudo nice -n -10 ./realtime_audio', title: 'High Priority Launch', whatItDoes: 'Launches program with elevated CPU priority (root only)', whenToUse: 'Latency-sensitive audio or trading engines' }
      ],
      beforeAfter: {
        before: '$ nice -n 15 ./heavy_job.sh &\n$ ps -o pid,ni,comm -p $!',
        after: '  PID  NI COMMAND\n29410  15 heavy_job.sh',
        explanation: 'The background job was launched with polite nice value 15.'
      },
      expectedOutput: 'PID NI COMMAND\n29410 15 heavy_job.sh',
      whatChanges: ['Launches new process with specified nice level.'],
      whatDoesNotChange: ['Other processes are untouched.'],
      safeRecovery: 'Adjust priority of running process with "renice".',
      commonMistakes: [
        { mistake: 'Trying to run "nice -n -5 command" without sudo', whyItHappens: 'Regular users cannot grant themselves higher CPU priority.', howToFix: 'Negative nice values (-1 to -20) strictly require "sudo".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-11-18',
      subChapterNumber: '11.18',
      command: 'sudo renice -n 5 -p 18420',
      title: 'renice',
      topicId: 'ch-11',
      topicNumber: '11',
      topicTitle: 'Processes',
      subtitle: 'Alter the scheduling priority of an already-running process on the fly',
      badges: ['renice', 'Scheduling', 'Tuning'],
      difficulty: 'Intermediate',
      quote: 'renice lets you dial down a runaway process on the fly without stopping its progress.',
      whatIsIt: 'renice alters the scheduling priority of one or more running processes identified by PID (-p), user (-u), or process group (-g) using the setpriority() system call. If an existing job is consuming too much CPU, renice throttles it dynamically without killing it.',
      inSimpleWords: 'If a program is already running and making your computer slow, you don\'t have to kill it and restart it. "renice" lets you dial down its CPU speed right now while it keeps running.',
      whyDoYouNeedIt: 'You need renice during high-load production incidents to calm down heavy batch jobs without aborting hours of completed computation.',
      realWorldScenario: 'A data scientist launches a machine learning model training script with PID 18420. The server CPU hits 100%, causing SSH latency for other engineers. Rather than killing their 3-hour job, you run: "sudo renice -n 19 -p 18420". The job drops to low priority, CPU pressure eases immediately, and SSH is responsive again.',
      realWorldAnalogy: 'Telling a noisy power tool operator on a construction site to dial down the motor speed while an executive meeting is happening next door.',
      terms: [
        { term: 'setpriority() Syscall', simple: 'The kernel operation that changes a running task\'s priority.', technical: 'Updates static_prio and normal_prio in active task_struct.' }
      ],
      syntaxCode: 'sudo renice -n [NICE_VALUE] -p [PID]',
      syntaxTokens: [
        { token: 'sudo renice', role: 'command', explanation: 'Alter priority of running processes with root authority' },
        { token: '-n 5', role: 'flag', explanation: 'New absolute nice value to assign' },
        { token: '-p 18420', role: 'flag', explanation: 'Target Process ID' }
      ],
      variations: [
        { syntax: 'sudo renice -n 10 -u developer', title: 'Renice All User Processes', whatItDoes: 'Applies lower priority to all processes owned by user developer', whenToUse: 'Throttling runaway user workloads' }
      ],
      beforeAfter: {
        before: '$ ps -o pid,ni -p 18420\n  PID  NI\n18420   0\n$ sudo renice -n 10 -p 18420',
        after: '18420 (process ID) old priority 0, new priority 10\n$ ps -o pid,ni -p 18420\n  PID  NI\n18420  10',
        explanation: 'Dynamically adjusted nice value from 0 to 10 without restarting the process.'
      },
      expectedOutput: 'old priority 0, new priority 10',
      whatChanges: ['Modifies task priority in kernel scheduler queue.'],
      whatDoesNotChange: ['Process memory and execution state are untouched.'],
      safeRecovery: 'Non-destructive. Can be reniced back to 0 anytime with sudo.',
      commonMistakes: [
        { mistake: 'Trying to lower the nice number (increase priority) as a normal user without sudo', whyItHappens: 'Regular users can only degrade priority (make nicer), never increase it.', howToFix: 'Increasing priority requires sudo.' }
      ]
    })
  ]
};
