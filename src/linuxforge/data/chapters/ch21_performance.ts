import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 21: SYSTEM PERFORMANCE (21.1 to 21.12)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_21: LinuxTopic = {
  id: 'ch-21',
  number: '21',
  title: 'System Performance',
  iconName: 'Gauge',
  description: 'Diagnose bottlenecks and saturation across CPU, RAM, disk I/O, and network using the USE method (Utilization, Saturation, Errors).',
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
      badges: ['CPU', 'Performance', 'USE Method', 'Core'],
      difficulty: 'Beginner',
      quote: 'High CPU is not a bug; high CPU with low throughput or stuck in iowait is the symptom of an architecture bottleneck.',
      whatIsIt: 'In Linux systems, CPU usage quantifies the percentage of clock cycles executing code across different privilege modes. Linux breaks CPU time down into categories: %usr (unprivileged user space application code), %sys (privileged kernel system calls and interrupts), %idle (processor doing nothing), %iowait (CPU idle because tasks are blocked waiting for disk or network I/O), %steal (virtualized CPU stolen by the hypervisor), and %softirq (processing software interrupts such as network packet arrivals).',
      inSimpleWords: 'Measuring what the brain of your computer is busy doing. Is it working hard on your code (%usr), running internal operating system tasks (%sys), or twiddling its thumbs waiting for a slow hard drive (%iowait)?',
      whyDoYouNeedIt: 'Understanding which CPU bucket is saturated tells you where to optimize. If %usr is 90%, your code algorithm needs tuning. If %sys is 70%, your app is making too many expensive syscalls (like rapid read/write loops). If %iowait is high, your SSD is choked.',
      realWorldScenario: 'An e-commerce API server slows down during Black Friday. "top" shows 95% CPU, but drilling down with "mpstat" reveals %sys is 80% with 200,000 context switches per second because the Node.js application is opening and closing database connections on every request instead of using a connection pool.',
      realWorldAnalogy: 'A chef in a kitchen: %usr is cooking food, %sys is refilling pans and washing dishes, %iowait is waiting for the delivery truck with ingredients, and %idle is taking a break.',
      withoutVsWith: {
        without: {
          title: 'Blindly Upgrading Virtual Machine Sizes',
          items: ['Paying thousands of dollars for 64-core instances when the real bottleneck was disk lock contention', 'Blaming application code when the hypervisor was stealing 40% of CPU cycles (%steal)', 'Unable to explain why an 8-core server is sluggish despite low average load'],
          outcome: 'Wasted cloud infrastructure budget without solving user latency.'
        },
        with: {
          title: 'Targeted CPU Bottleneck Triage',
          items: ['Immediate classification into user-bound, kernel-bound, or I/O-wait saturation', 'Core-by-core visibility with mpstat -P ALL to spot single-threaded thread pin bottlenecks', 'Telemetry-driven performance tuning using Brendan Gregg\'s USE method'],
          outcome: 'Sub-millisecond application response times and optimal resource utilization.'
        }
      },
      blockDiagram: {
        title: 'Linux CPU Execution Buckets',
        subtitle: 'Where processor clock ticks are accounted for in /proc/stat:',
        nodes: [
          { id: 'usr', label: '%usr / %nice', simpleDef: 'Application Code', techDef: 'User space Ring 3 computation (JVM, Python, Go, Node)', badge: 'User Space', color: '#10b981' },
          { id: 'sys', label: '%sys / %irq', simpleDef: 'Kernel System Calls', techDef: 'Privileged Ring 0 kernel syscalls, page faults, and hardware interrupts', badge: 'Kernel Ring 0', color: '#38bdf8' },
          { id: 'iowait', label: '%iowait', simpleDef: 'Waiting on Disk/Net', techDef: 'CPU has zero runnable tasks and at least one task blocked in disk I/O', badge: 'I/O Wait', color: '#f59e0b' },
          { id: 'steal', label: '%steal / %guest', simpleDef: 'Hypervisor Steal', techDef: 'Virtual CPU cycles taken by cloud hypervisor (KVM/Xen/VMware)', badge: 'Virtualization', color: '#ef4444' }
        ]
      },
      terms: [
        { term: '%usr (User Time)', simple: 'Time spent executing your program code.', technical: 'Percentage of CPU time spent in user space without nicing.' },
        { term: '%iowait', simple: 'Idle CPU waiting for storage drives to return data.', technical: 'Percentage of time that the CPU was idle during which the system had outstanding disk I/O requests.' }
      ],
      syntaxCode: 'mpstat -P ALL 1 1',
      syntaxTokens: [
        { token: 'mpstat', role: 'command', explanation: 'Multi-processor statistics tool from sysstat package' },
        { token: '-P ALL', role: 'flag', explanation: 'Report metrics individually for every CPU core plus global average' },
        { token: '1 1', role: 'argument', explanation: 'Interval in seconds (1s) and count of reports (1 time)' }
      ],
      variations: [
        { command: 'mpstat -P ALL 2 5', description: 'Sample all CPU cores every 2 seconds for 5 consecutive intervals' },
        { command: 'lscpu', description: 'Display CPU architecture, sockets, cores per socket, threads, and NUMA nodes' }
      ],
      expectedOutput: 'Linux 6.8.0-40-generic (linuxforge)   09/30/2026   _x86_64_   (8 CPU)\n\n01:00:01 AM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle\n01:00:02 AM  all    4.12    0.00    1.85    0.21    0.00    0.15    0.00    0.00    0.00   93.67\n01:00:02 AM    0   12.50    0.00    3.20    0.00    0.00    0.40    0.00    0.00    0.00   83.90',
      commonMistakes: [
        { mistake: 'Assuming 100% CPU on an 8-core server means all cores are busy', whyWrong: 'A single-threaded Python or Node.js program saturating 1 core shows only 12.5% global CPU in "top" while that specific thread is completely choked.', correctWay: 'Press "1" in top or use "mpstat -P ALL" to inspect each core individually.' },
        { mistake: 'Treating %iowait as active CPU consumption', whyWrong: '%iowait is actually IDLE time; the CPU is sitting idle because waiting tasks cannot progress until storage finishes writing.', correctWay: 'Inspect disk queues with "iostat -xz 1" to resolve the slow storage bottleneck.' }
      ],
      safeRecovery: 'If CPU spikes, run "top -b -n 1 -o %CPU | head -n 20" to immediately capture the offending process IDs.'
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
      badges: ['Memory', 'RAM', 'PageCache', 'Core'],
      difficulty: 'Beginner',
      quote: 'Unused RAM in Linux is wasted RAM: the kernel aggressively caches files until applications actually need memory.',
      whatIsIt: 'Linux memory management revolves around Virtual Memory and the Page Cache. Physical RAM is divided into 4KB pages. Applications allocate virtual memory, but physical RAM is only consumed when pages are written to (Resident Set Size - RSS). Unallocated RAM is not left empty; the Linux kernel uses it as Page Cache and Buffer Cache to accelerate disk reads. When applications request more memory, the kernel instantly evicts cached disk pages to fulfill the request. If physical memory is exhausted, the kernel pages anonymous memory out to Swap.',
      inSimpleWords: 'How your computer\'s memory works. Linux fills empty RAM with copies of recently read files so everything runs faster. If an app needs that RAM, Linux drops the cached files instantly.',
      whyDoYouNeedIt: 'Beginners frequently panic seeing "95% RAM used" and restart servers. Understanding the difference between "Used", "Cached/Buffers", and "Available" memory prevents unnecessary outages.',
      realWorldScenario: 'A junior administrator receives a monitoring alert that RAM usage is 98% on a production database and prepares to reboot. The senior SRE runs "free -h" and points out that 28GB of the 32GB is actually Page Cache, and "available" memory is 29GB with zero swap activity.',
      realWorldAnalogy: 'A library desk: having research books stacked on the table (Page Cache) doesn\'t mean the desk is full; you can push them aside instantly if someone brings in their laptop (App Memory).',
      withoutVsWith: {
        without: {
          title: 'False Memory Panic and Unneeded Restarts',
          items: ['Restarting healthy servers because page cache is mistaken for memory leaks', 'Ignorance of Swapping Out (so) leading to sudden 10x database latency spikes', 'Misinterpreting VIRT (Virtual) memory for physical RAM consumption'],
          outcome: 'Unnecessary downtime and false-positive monitoring alerts.'
        },
        with: {
          title: 'Precise Linux Memory Observability',
          items: ['Focusing on "MemAvailable" as the single true metric of memory health', 'Monitoring page-in / page-out rates (si/so in vmstat) to detect thrashing', 'Configuring vm.swappiness and OOM killer protection for mission-critical daemons'],
          outcome: 'Zero OOM crashes and high-performance in-memory caching.'
        }
      },
      blockDiagram: {
        title: 'Linux Physical Memory Distribution',
        subtitle: 'How the Linux kernel divides RAM across workloads:',
        nodes: [
          { id: 'app', label: 'App Anonymous RSS', simpleDef: 'Process Private RAM', techDef: 'Heap, stack, and malloc memory owned by running applications', badge: 'Cannot Evict', color: '#10b981' },
          { id: 'cache', label: 'Page Cache & Buffers', simpleDef: 'Cached Disk Data', techDef: 'Cached inodes and file blocks; kernel evicts immediately when apps need RAM', badge: 'Reclaimable', color: '#38bdf8' },
          { id: 'kernel', label: 'Kernel Slab & Drivers', simpleDef: 'Kernel Memory', techDef: 'dentries, inodes, socket buffers, and network ring buffers', badge: 'Kernel Ring 0', color: '#a855f7' },
          { id: 'swap', label: 'Swap Space (Disk)', simpleDef: 'Overflow Storage', techDef: 'Inactive anonymous memory pages written out to NVMe/SATA partition', badge: 'Disk Spillover', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'RSS (Resident Set Size)', simple: 'The actual physical RAM a process is holding right now.', technical: 'Portion of process memory held in real RAM; excludes swapped pages and uncommitted virtual space.' },
        { term: 'Available Memory', simple: 'The amount of RAM you can actually launch new programs with right now.', technical: 'Kernel estimation of memory available for starting new applications without swapping, combining free RAM and reclaimable page cache.' }
      ],
      syntaxCode: 'vmstat -s | head -n 10',
      syntaxTokens: [
        { token: 'vmstat', role: 'command', explanation: 'Virtual memory statistics utility' },
        { token: '-s', role: 'flag', explanation: 'Display summary table of memory counters and event statistics' },
        { token: '| head -n 10', role: 'argument', explanation: 'Limit output to top 10 memory allocation counters' }
      ],
      variations: [
        { command: 'cat /proc/meminfo | grep -E "MemTotal|MemFree|MemAvailable|Cached|Buffers"', description: 'Inspect low-level kernel memory statistics directly from /proc virtual filesystem' },
        { command: 'free -h', description: 'Display human-readable memory overview in gigabytes/megabytes' }
      ],
      expectedOutput: '     16335128 K total memory\n      4128456 K used memory\n      5892104 K active memory\n      3120140 K inactive memory\n      8214220 K free memory\n       340120 K buffer memory\n      3652332 K swap cache\n      8388604 K total swap',
      commonMistakes: [
        { mistake: 'Looking at "free" column instead of "available" in free -m', whyWrong: 'The "free" column only shows completely untouched RAM; "available" includes reclaimable page cache that is immediately usable.', correctWay: 'Always use the "available" column to judge memory headroom.' },
        { mistake: 'Disabling Swap completely on production servers', whyWrong: 'Without swap, the kernel cannot page out dead, dormant initialization memory, leaving less room for active page cache.', correctWay: 'Keep a small swap partition (2-4GB) with a low swappiness (e.g. vm.swappiness=10).' }
      ],
      safeRecovery: 'To immediately force the kernel to drop reclaimable page cache for testing, run "sync; echo 3 | sudo tee /proc/sys/vm/drop_caches".'
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
      difficulty: 'Beginner',
      quote: 'Load average of 8.0 on an 8-core CPU is 100% capacity; load average of 8.0 on a 1-core CPU is a traffic jam disaster.',
      whatIsIt: 'In Linux, Load Average represents the average number of processes in a runnable state (State R: executing or waiting on the CPU scheduler runqueue) PLUS processes in an uninterruptible sleep state (State D: typically waiting on disk or network filesystem I/O) over the last 1, 5, and 15 minutes. Unlike Unix systems which only measure CPU runqueue, Linux uniquely includes State D processes, meaning high load average can indicate either CPU exhaustion or a stalled storage subsystem.',
      inSimpleWords: 'The number of tasks waiting for service. If you have 4 CPU cores and a load of 4.0, your system is perfectly full. If load is 12.0 on a 4-core machine, 8 tasks are waiting in line.',
      whyDoYouNeedIt: 'Comparing the 1, 5, and 15-minute numbers tells you the system trajectory instantly: if load is 10.0, 5.0, 1.0, load is spiking rapidly. If load is 1.0, 5.0, 10.0, the crisis is recovering.',
      realWorldScenario: 'An NFS storage server loses connectivity. Immediately, web application servers jump from a load average of 1.2 to 85.0. CPU usage is 2%, but all worker threads entered State D waiting on the dead NFS mount.',
      realWorldAnalogy: 'Cars at a toll plaza: if you have 4 toll booths (cores) and 4 cars, there is no delay. If 12 cars arrive, 8 are waiting in line. If the toll gates freeze (State D), line piles up even if nobody is driving.',
      withoutVsWith: {
        without: {
          title: 'Interpreting Load Without Knowing CPU Core Count',
          items: ['Panicking over a load of 6.0 on a 32-core server (which is actually 80% idle)', 'Ignoring a load of 3.5 on a single-core cloud instance until it freezes', 'Assuming high load always means high CPU usage'],
          outcome: 'Misdiagnosed outages and inappropriate scaling decisions.'
        },
        with: {
          title: 'Contextual Load Average Analysis',
          items: ['Normalizing load average against nproc (Total Cores)', 'Spotting trend direction across 1, 5, and 15-minute moving windows', 'Checking process states (R vs D) in "ps" or "top" when load rises'],
          outcome: 'Accurate capacity planning and rapid triage of disk vs CPU stalls.'
        }
      },
      blockDiagram: {
        title: 'Linux Load Average Calculation',
        subtitle: 'The two process states that contribute to Linux load average:',
        nodes: [
          { id: 'r', label: 'State R (Running/Runnable)', simpleDef: 'CPU Tasks', techDef: 'Processes executing on CPU or queued in CFS runqueue', badge: 'CPU Bound', color: '#10b981' },
          { id: 'd', label: 'State D (Uninterruptible Sleep)', simpleDef: 'Disk/NFS Wait', techDef: 'Processes waiting on disk I/O, device locks, or network filesystems', badge: 'Disk Bound', color: '#f59e0b' },
          { id: 'calc', label: 'Exponential Decay Filter', simpleDef: '1, 5, 15 min Averages', techDef: 'Damped exponential smoothing updated by kernel scheduler every 5 seconds', badge: 'Kernel Scheduler', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'State R', simple: 'A process that is running on a core right now, or ready to run.', technical: 'TASK_RUNNING state in Linux task_struct.' },
        { term: 'State D', simple: 'A process stuck waiting for hardware (usually disk) that cannot be killed with kill -9.', technical: 'TASK_UNINTERRUPTIBLE sleep state waiting on page locks or hardware I/O.' }
      ],
      syntaxCode: 'uptime',
      syntaxTokens: [
        { token: 'uptime', role: 'command', explanation: 'Display current time, how long system has been running, user count, and load averages' },
        { token: '[options]', role: 'flag', explanation: 'Supports -p for pretty formatted duration or -s for exact boot timestamp' }
      ],
      variations: [
        { command: 'cat /proc/loadavg', description: 'Raw load numbers and current running/total process ratio (e.g. 2/450)' },
        { command: 'uptime -p', description: 'Pretty-print how long the system has been up (e.g. "up 3 weeks, 2 days")' }
      ],
      expectedOutput: ' 01:15:23 up 42 days, 14:10,  2 users,  load average: 0.85, 1.12, 1.05',
      commonMistakes: [
        { mistake: 'Evaluating load without checking "nproc"', whyWrong: 'A load of 4 is completely fine on an 8-core CPU (50% loaded) but completely saturated on a 2-core CPU (200% loaded).', correctWay: 'Always divide the load average by the number of CPU cores returned by "nproc".' },
        { mistake: 'Trying to kill -9 a process in State D to bring down load', whyWrong: 'State D processes are sleeping in kernel mode waiting on hardware; signals cannot be delivered until the hardware responds.', correctWay: 'Investigate the underlying storage/NFS mount or reboot the machine if hardware is dead.' }
      ],
      safeRecovery: 'To find all processes causing high load in State D, run "ps -eo state,pid,user,comm | grep \'^D\'".'
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
      badges: ['top', 'Monitoring', 'Interactive', 'Core'],
      difficulty: 'Beginner',
      quote: 'The universal sysadmin dashboard: top is preinstalled on every Linux system on Earth from embedded routers to supercomputers.',
      whatIsIt: '"top" (Table of Processes) is the standard real-time interactive process viewer in Linux. It reads /proc every few seconds to refresh two main areas: the System Summary Header (showing uptime, task states, CPU percentages, and RAM/swap statistics) and the Task List (displaying PID, User, PR, NI, VIRT, RES, SHR, %CPU, %MEM, and COMMAND). Within top, interactive keystrokes allow filtering, sorting, renicing, and terminating processes on the fly.',
      inSimpleWords: 'The task manager of Linux. Open it, see what is eating your CPU or RAM, sort by highest usage, and kill stuck processes without leaving the screen.',
      whyDoYouNeedIt: 'When a server slows to a crawl over SSH, "top" is the first command you execute. It gives an immediate heartbeat of the system and pinpoints the culprit PID in 3 seconds.',
      realWorldScenario: 'An automated testing worker goes wild and spawns 50 zombie Chrome instances. The engineer runs "top", presses "P" to sort by %CPU, locates the parent test runner PID, and presses "k" inside top to kill it immediately.',
      realWorldAnalogy: 'An airport control tower radar screen showing all incoming flights, their altitudes, and speeds in real time.',
      withoutVsWith: {
        without: {
          title: 'Static ps snapshots and Guesswork',
          items: ['Running static "ps aux" repeatedly and manually scanning hundreds of lines', 'Missing short-lived CPU burst spikes between manual commands', 'Unable to observe real-time system state changes as you apply fixes'],
          outcome: 'Slow incident diagnosis during high-pressure production outages.'
        },
        with: {
          title: 'Interactive Real-Time Triage with top',
          items: ['Instant sorting by CPU (P) or Memory (M) with a single keystroke', 'Toggling individual CPU core graphs with "1" key', 'Killing (k) or renicing (r) runaway processes directly from the UI'],
          outcome: 'Immediate containment of runaway processes within 30 seconds.'
        }
      },
      blockDiagram: {
        title: 'top Interface Breakdown',
        subtitle: 'Key visual sections of the top interactive display:',
        nodes: [
          { id: 'header', label: 'Summary Header', simpleDef: 'System Overview', techDef: 'Uptime, Load, Tasks (running, sleeping, zombie), %CPU modes, RAM/Swap', badge: 'Telemetry', color: '#38bdf8' },
          { id: 'tasks', label: 'Task Table', simpleDef: 'Process List', techDef: 'Sorted process rows parsed dynamically from /proc/[pid]/stat', badge: 'Processes', color: '#10b981' },
          { id: 'control', label: 'Interactive Shortcuts', simpleDef: 'Keyboard Controls', techDef: 'P (CPU sort), M (RAM sort), k (kill PID), 1 (per-CPU cores), q (quit)', badge: 'Interactive', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'RES (Resident Size)', simple: 'True physical RAM used by the process.', technical: 'Non-swapped physical memory in kilobytes that a task has used.' },
        { term: 'VIRT (Virtual Size)', simple: 'Total memory the process has mapped, including shared libraries and unallocated space.', technical: 'Total amount of virtual memory used by the task; includes code, data, shared libs, and swapped pages.' }
      ],
      syntaxCode: 'top -o %CPU',
      syntaxTokens: [
        { token: 'top', role: 'command', explanation: 'Real-time process monitor' },
        { token: '-o %CPU', role: 'flag', explanation: 'Order process list by the %CPU column descending' }
      ],
      variations: [
        { command: 'top -b -n 1', description: 'Batch mode: output a single non-interactive snapshot suitable for scripts or logs' },
        { command: 'top -u www-data', description: 'Filter and display only processes owned by the "www-data" user' }
      ],
      expectedOutput: 'top - 01:20:00 up 10 days,  3:15,  1 user,  load average: 0.15, 0.22, 0.18\nTasks: 185 total,   1 running, 184 sleeping,   0 stopped,   0 zombie\n%Cpu(s):  3.2 us,  1.1 sy,  0.0 ni, 95.2 id,  0.3 wa,  0.0 hi,  0.2 si,  0.0 st\nMiB Mem :  15952.1 total,   8120.4 free,   4120.2 used,   3711.5 buff/cache\n\n  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n 2410 mysql     20   0 2410212 1.204g  32410 S   8.5   7.7  14:20.12 mysqld\n 1850 nginx     20   0  145210  24150  12100 S   2.1   0.2   3:12.45 nginx',
      commonMistakes: [
        { mistake: 'Leaving top running continuously on heavily loaded systems', whyWrong: 'top itself consumes CPU cycles parsing hundreds of /proc directories every refresh interval.', correctWay: 'Inspect what you need, or increase the delay with "-d 5" (e.g. top -d 5).' },
        { mistake: 'Sorting by VIRT when hunting for memory leaks', whyWrong: 'VIRT is often massive (terabytes in Go or Java apps) because of virtual address reservation without consuming real RAM.', correctWay: 'Sort by RES (Resident Memory) by pressing "M" or using "top -o %MEM".' }
      ],
      safeRecovery: 'Press "q" to cleanly exit top, or "Ctrl+C" if the terminal is unresponsive.'
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
      badges: ['vmstat', 'Kernel', 'USE Method', 'Core'],
      difficulty: 'Intermediate',
      quote: 'If you only have 5 seconds to triage a Linux server, run vmstat 1: it reveals CPU saturation, swapping, and disk bottlenecks in one line.',
      whatIsIt: '"vmstat" (Virtual Memory Statistics) prints concise, streaming one-line summaries of system health across processes (r: runnable, b: blocked in uninterruptible sleep), memory (swpd, free, buff, cache), swap activity (si: swap-in, so: swap-out in KB/s), I/O block counts (bi: blocks in, bo: blocks out), system interrupts (in) and context switches (cs), and CPU percentages (us, sy, id, wa, st). The first line printed is always an average since server boot; subsequent lines reflect the exact interval duration.',
      inSimpleWords: 'A high-speed ECG for your server. Every second it prints one line telling you if processes are queuing (r), if the server is thrashing swap space (si/so), or if the CPU is choking on context switches (cs).',
      whyDoYouNeedIt: 'Unlike top, vmstat emits plain text streams that do not clear the screen, making it ideal for logging, piping, and capturing incident time-series data during outages.',
      realWorldScenario: 'A database query causes the server to freeze. Running "vmstat 1" shows column "r" (runnable queue) jump to 32 on an 8-core CPU, and "cs" (context switches) shoot to 150,000/sec, confirming the CPU scheduler is thrashing due to excessive thread contention.',
      realWorldAnalogy: 'A dashboard ticker tape showing cars passing through the intersection, cash moving in/out of the bank, and customer line lengths every minute.',
      withoutVsWith: {
        without: {
          title: 'Missing Instantaneous Thrashing Signals',
          items: ['Unable to tell if memory pressure is causing active swapping vs passive disk cache eviction', 'Missing high context switch rates that silently consume 50% of CPU time', 'Struggling with bulky full-screen UIs over slow, laggy SSH connections'],
          outcome: 'Delayed diagnosis of severe system thrashing.'
        },
        with: {
          title: 'Lightweight Real-Time System Telemetry',
          items: ['Instant detection of swap thrashing (si/so > 0)', 'Monitoring runqueue saturation (r > number of CPU cores)', 'Low-overhead streaming diagnostics suitable for scripts and background logs'],
          outcome: 'Lightning-fast identification of the exact bottleneck dimension.'
        }
      },
      blockDiagram: {
        title: 'vmstat Critical Columns',
        subtitle: 'The primary columns to watch during production triage:',
        nodes: [
          { id: 'r', label: 'Column r (Runqueue)', simpleDef: 'Tasks Waiting on CPU', techDef: 'Number of runnable processes waiting for CPU time. If r > CPU cores, CPU is saturated', badge: 'CPU Saturation', color: '#ef4444' },
          { id: 'siso', label: 'Columns si / so', simpleDef: 'Swap Thrashing', techDef: 'KB/s paged in from (si) or out to (so) swap disk. If > 0, system is out of RAM', badge: 'Memory Thrashing', color: '#f59e0b' },
          { id: 'cs', label: 'Column cs', simpleDef: 'Context Switches', techDef: 'Number of CPU context switches per second between process threads', badge: 'Concurrency', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'Runqueue (r)', simple: 'How many programs are waiting for their turn on the CPU.', technical: 'Count of processes in TASK_RUNNING state waiting for CPU scheduler slice.' },
        { term: 'Context Switch (cs)', simple: 'When the CPU stops working on one program and switches to another.', technical: 'Saving register state of one thread and loading state of another; costs ~1-5 microseconds.' }
      ],
      syntaxCode: 'vmstat 1 5',
      syntaxTokens: [
        { token: 'vmstat', role: 'command', explanation: 'Report virtual memory statistics' },
        { token: '1', role: 'argument', explanation: 'Sampling interval: 1 second between updates' },
        { token: '5', role: 'argument', explanation: 'Count: stop after printing 5 reports' }
      ],
      variations: [
        { command: 'vmstat -w 1', description: 'Wide mode: format columns cleanly with wider field widths so numbers do not run together' },
        { command: 'vmstat -d', description: 'Disk statistics mode: display reads, writes, and sectors for all attached block devices' }
      ],
      expectedOutput: 'procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----\n r  b   swpd   free   buff  cache   si   so    bi    bo   in    cs us sy id wa st\n 1  0      0 832104 340120 365233    0    0     4    25  120   450  3  1 96  0  0\n 2  0      0 831980 340120 365233    0    0     0    40  210   890  5  2 93  0  0\n 8  1      0 830500 340120 365233    0    0     0   120  450  1420 18  5 77  0  0',
      commonMistakes: [
        { mistake: 'Relying on the very first line of vmstat output', whyWrong: 'The first line of vmstat is historical: it displays cumulative averages since server boot, NOT what is happening right now.', correctWay: 'Look at the second line and subsequent lines for current real-time telemetry.' },
        { mistake: 'Ignoring non-zero "si" and "so" values', whyWrong: 'If si (swap-in) and so (swap-out) are consistently above zero, your NVMe/SSD is being hammered by memory thrashing, destroying performance.', correctWay: 'Add physical RAM, optimize memory leaks, or lower process concurrency.' }
      ],
      safeRecovery: 'Press "Ctrl+C" at any time to stop continuous vmstat monitoring.'
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
      badges: ['iostat', 'DiskIO', 'Storage', 'Core'],
      difficulty: 'Intermediate',
      quote: '100% disk utilization (%util) means your storage device is saturated; any additional I/O request will queue and suffer high latency.',
      whatIsIt: '"iostat" (part of the sysstat package) monitors system input/output device loading by observing storage device active times and average transfer rates. The "-xz" flags provide extended statistics while omitting inactive devices: displaying read requests per second (r/s), write requests (w/s), read/write throughput (rMB/s, wMB/s), average request size (areq-sz), average queue size (aqu-sz), average I/O latency in milliseconds (await, r_await, w_await), and percentage of CPU time during which I/O requests were issued (%util).',
      inSimpleWords: 'The speedometer and odometer for your hard drives and SSDs. It tells you how many reads/writes per second are happening, how many milliseconds each request takes, and if the drive is 100% maxed out.',
      whyDoYouNeedIt: 'Slow storage brings entire systems down. When your database starts timing out, "iostat -xz 1" confirms whether the disk hardware is keeping up or if transactions are waiting 50ms for disk writes.',
      realWorldScenario: 'A PostgreSQL database reports query latency jumped from 2ms to 200ms. Running "iostat -xz 1" reveals %util on nvme0n1 is 100% and "w_await" is 85ms because an unindexed batch INSERT job is saturating the SSD\'s write IOPS.',
      realWorldAnalogy: 'A single teller at a drive-thru bank window: r/s is how many cars arrive, await is how many minutes you wait in line, and %util is whether the teller is working non-stop without a breath.',
      withoutVsWith: {
        without: {
          title: 'Treating Disk as a Black Box',
          items: ['Assuming an SSD can never be saturated', 'Unaware of I/O wait latency spikes until databases crash', 'Unable to separate read-heavy workloads from write-heavy log flushes'],
          outcome: 'Severe application timeouts and storage starvation.'
        },
        with: {
          title: 'Deep Block-Device Observability',
          items: ['Clear visibility into read IOPS vs write IOPS', 'Instant tracking of average disk service latency (await in milliseconds)', 'Spotting hardware device saturation (%util approaching 100%)'],
          outcome: 'Proactive storage scaling and optimal database indexing.'
        }
      },
      blockDiagram: {
        title: 'iostat Critical Metrics Pipeline',
        subtitle: 'How Linux processes disk requests from VFS to physical controller:',
        nodes: [
          { id: 'vfs', label: 'VFS & Page Cache', simpleDef: 'Application I/O', techDef: 'read()/write() system calls and dirty page cache flushers', badge: 'Kernel VFS', color: '#10b981' },
          { id: 'queue', label: 'Block Layer Queue (aqu-sz)', simpleDef: 'Request Queue', techDef: 'I/O scheduler (mq-deadline/none) queuing pending block requests', badge: 'Queue Layer', color: '#f59e0b' },
          { id: 'device', label: 'Storage Device (%util / await)', simpleDef: 'NVMe / SSD / SAN', techDef: 'Physical controller servicing requests; await measures total round-trip latency', badge: 'Hardware', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'await', simple: 'Average time (in milliseconds) a disk read or write took to complete.', technical: 'Average time for I/O requests issued to the device to be served, including queue time and service time.' },
        { term: '%util', simple: 'Percentage of time the drive was busy doing work.', technical: 'Percentage of elapsed time during which I/O requests were issued to the device (bandwidth utilization).' }
      ],
      syntaxCode: 'iostat -xz 1 3',
      syntaxTokens: [
        { token: 'iostat', role: 'command', explanation: 'Report CPU statistics and input/output statistics for devices' },
        { token: '-x', role: 'flag', explanation: 'Display extended statistics (await, r_await, w_await, %util)' },
        { token: '-z', role: 'flag', explanation: 'Omit inactive devices that had zero activity during the sample' },
        { token: '1 3', role: 'argument', explanation: 'Sample every 1 second, printing 3 reports' }
      ],
      variations: [
        { command: 'iostat -h -p sda 2', description: 'Display statistics in human-readable units (MB/s) for specific drive sda' },
        { command: 'iotop -o', description: 'Interactive top-like interface showing per-process disk read/write throughput' }
      ],
      expectedOutput: 'Device   r/s     w/s     rMB/s   wMB/s   rrqm/s  wrqm/s  %rrqm  %wrqm  aqu-sz  rareq-sz  wareq-sz  await  r_await  w_await  %util\nnvme0n1  120.00  450.00  12.50   35.20    10.00   25.00   7.69   5.26    1.12     106.6     80.1   1.95     0.85     2.24  42.50\nsda        2.00   15.00   0.05    1.20     0.00    2.00   0.00  11.76    0.05      25.6     81.9   2.10     1.20     2.22   5.10',
      commonMistakes: [
        { mistake: 'Thinking %util means capacity in terms of throughput on modern NVMe SSDs', whyWrong: 'Modern NVMe drives have multiple parallel queues (e.g. 64 queues of 64k commands). A drive can show 100% util but still accept parallel requests if queue depth allows.', correctWay: 'Cross-reference %util with "await" (latency). If await is low (<2ms), the drive is healthy even if %util is high.' },
        { mistake: 'Running iostat without sysstat installed', whyWrong: 'iostat is not part of minimal coreutils; on fresh Ubuntu/Debian you must install sysstat.', correctWay: 'Install sysstat via "sudo apt install -y sysstat".' }
      ],
      safeRecovery: 'If a drive is 100% saturated, identify the culprit process using "sudo iotop -o -b -n 1".'
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
      badges: ['free', 'RAM', 'Memory', 'Core'],
      difficulty: 'Beginner',
      quote: 'Look at the "available" column, not the "free" column: in Linux, free memory is memory doing zero productive work.',
      whatIsIt: '"free" parses /proc/meminfo to present a clean, high-level summary of total, used, free, shared, buff/cache, and available memory across physical RAM and swap space. The "-h" flag formats numbers in powers of 1024 (KiB, MiB, GiB) for human readability. The single most important figure on modern Linux kernels is the "available" column: an estimate calculated by the kernel of how much RAM can be allocated to applications without forcing the system into swap.',
      inSimpleWords: 'The quick memory status command. Type "free -h" to see how much physical RAM you have, how much your programs are using, and how much is safely available for new apps.',
      whyDoYouNeedIt: 'It is the universally accepted 1-second check before launching resource-heavy containers, compiling code, or diagnosing out-of-memory errors.',
      realWorldScenario: 'Before running a Docker Compose cluster requiring 6GB of RAM on a 16GB server, the engineer runs "free -h" to verify the "available" column shows 9.2Gi, confirming the system has plenty of room.',
      realWorldAnalogy: 'Checking your available bank account balance: your total salary might be $5,000, but pending transactions leave $3,500 safely available to spend.',
      withoutVsWith: {
        without: {
          title: 'Misreading the "Free" Column',
          items: ['Believing a server with 200MB "free" is about to crash when it has 14GB "available"', 'Manually calculating buff/cache offsets because of old Linux 2.6 habits', 'Failing to notice swap is 100% full'],
          outcome: 'Incorrect capacity decisions and unnecessary server upgrades.'
        },
        with: {
          title: 'Modern Memory Telemetry with free -h',
          items: ['Instant assessment of true headroom using the "available" metric', 'Tracking Swap usage alongside physical RAM', 'Simple human-readable units (Gi/Mi) avoiding byte calculation mistakes'],
          outcome: 'Accurate, confident memory capacity management.'
        }
      },
      blockDiagram: {
        title: 'free -h Output Structure',
        subtitle: 'How physical RAM is categorized in the free output table:',
        nodes: [
          { id: 'total', label: 'total', simpleDef: 'Total Physical RAM', techDef: 'Total usable physical RAM detected by BIOS/UEFI minus kernel reserved boot memory', badge: 'Hardware', color: '#38bdf8' },
          { id: 'used', label: 'used', simpleDef: 'Application RAM', techDef: 'total - free - buff/cache (Anonymous memory allocated by user processes)', badge: 'Apps', color: '#10b981' },
          { id: 'avail', label: 'available', simpleDef: 'Safe Launch Headroom', techDef: 'Kernel estimation of free memory plus reclaimable page cache and slab', badge: 'Headroom', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'buff/cache', simple: 'Disk data stored in RAM to make reads lightning-fast.', technical: 'Buffers (in-flight block I/O) plus Page Cache (cached file data and mmap files).' },
        { term: 'available', simple: 'True usable memory for new programs without swapping.', technical: 'Amount of memory available for starting new applications without swapping, calculated via MemAvailable.' }
      ],
      syntaxCode: 'free -h',
      syntaxTokens: [
        { token: 'free', role: 'command', explanation: 'Display amount of free and used memory in the system' },
        { token: '-h', role: 'flag', explanation: 'Human-readable format: auto-scale units to B, Ki, Mi, Gi' }
      ],
      variations: [
        { command: 'free -m', description: 'Display all values strictly in megabytes (useful for shell script parsing)' },
        { command: 'free -h -s 3', description: 'Continuously refresh memory stats every 3 seconds' }
      ],
      expectedOutput: '               total        used        free      shared  buff/cache   available\nMem:            15Gi       4.2Gi       2.8Gi       150Mi       8.2Gi        10Gi\nSwap:          8.0Gi       120Mi       7.9Gi',
      commonMistakes: [
        { mistake: 'Confusing "free" with "available"', whyWrong: '"free" is unallocated, untouched memory. "available" includes page cache that will be freed on demand.', correctWay: 'Base all memory decisions on the "available" column.' },
        { mistake: 'Parsing free -h with regex scripts', whyWrong: 'Units change dynamically (Mi to Gi) making regex fragile.', correctWay: 'Use "free -b" (bytes) or "cat /proc/meminfo" for scripting.' }
      ],
      safeRecovery: 'If available memory drops below 200Mi, identify the largest memory consumers using "ps aux --sort=-%mem | head -n 10".'
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
      badges: ['uptime', 'Reliability', 'Telemetry'],
      difficulty: 'Beginner',
      quote: 'High uptime used to be a badge of honor; in modern cloud architecture, it reminds you how overdue you are for kernel security patches.',
      whatIsIt: '"uptime" reads /proc/uptime to display the total continuous duration since the Linux kernel completed its boot process. The "-p" flag formats the elapsed duration into human-readable English words (e.g. "up 3 weeks, 2 days, 4 hours, 12 minutes"). The "-s" flag displays the exact calendar date and timestamp when the server booted. Uptime is critical for verifying whether an unexpected server reboot or kernel panic occurred during an outage.',
      inSimpleWords: 'How long your computer has been running without a restart. It also tells you the exact time it booted.',
      whyDoYouNeedIt: 'When users say "the server crashed at 3 AM", the first thing you run is "uptime -s". If the boot time is 3:02 AM, the machine indeed rebooted (OOM, kernel panic, or host hypervisor crash).',
      realWorldScenario: 'An incident responder investigates a report that an internal web app became unreachable overnight. Running "uptime" shows "up 42 minutes", proving the physical VM was rebooted 42 minutes ago, leading the team to inspect /var/log/syslog for the reboot cause.',
      realWorldAnalogy: 'The trip odometer on a car: it resets to zero every time the engine turns on.',
      withoutVsWith: {
        without: {
          title: 'Unaware of Silent Server Restarts',
          items: ['Assuming a server has been running all week when it secretly crash-rebooted 20 minutes ago', 'Failing to identify cloud spot instance termination events', 'No record of exact kernel initialization time'],
          outcome: 'Prolonged incident investigation and missed kernel panic evidence.'
        },
        with: {
          title: 'Instant Reboot Verification with uptime',
          items: ['Immediate confirmation of whether a system rebooted or merely stalled', 'Exact boot timestamp lookup with "uptime -s"', 'Quick verification of maintenance window reboots'],
          outcome: 'Clear timeline reconstruction during incident post-mortems.'
        }
      },
      blockDiagram: {
        title: 'uptime Data Source',
        subtitle: 'How the kernel tracks uptime in /proc/uptime:',
        nodes: [
          { id: 'timer', label: 'Hardware Timer / TSC', simpleDef: 'CPU Clock Cycles', techDef: 'Time Stamp Counter (TSC) incrementing with CPU clock frequency', badge: 'Hardware Clock', color: '#10b981' },
          { id: 'kernel', label: '/proc/uptime', simpleDef: 'Kernel Seconds Counter', techDef: 'Two float values: total uptime seconds and idle seconds across all cores', badge: 'Virtual FS', color: '#38bdf8' },
          { id: 'uptime', label: 'uptime Utility', simpleDef: 'Formatted Output', techDef: 'Parses /proc/uptime and /proc/loadavg to render formatted duration', badge: 'User Space', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Kernel Uptime', simple: 'The number of seconds the Linux kernel has been awake since boot.', technical: 'First column in /proc/uptime represented as floating-point seconds.' },
        { term: 'Idle Time', simple: 'Total seconds all CPU cores combined have spent doing nothing.', technical: 'Second column in /proc/uptime summing idle cycles across all processors.' }
      ],
      syntaxCode: 'uptime -p',
      syntaxTokens: [
        { token: 'uptime', role: 'command', explanation: 'Show how long the system has been running' },
        { token: '-p', role: 'flag', explanation: 'Pretty: show uptime in human-readable words instead of default format' }
      ],
      variations: [
        { command: 'uptime -s', description: 'Show exact date and time the system was started (YYYY-MM-DD HH:MM:SS)' },
        { command: 'who -b', description: 'Display time of last system boot according to wtmp accounting records' }
      ],
      expectedOutput: 'up 3 weeks, 4 days, 12 hours, 18 minutes',
      commonMistakes: [
        { mistake: 'Believing a 2-year uptime is a positive sign in production', whyWrong: 'A 2-year uptime means the system is missing 2 years of critical Linux kernel security patches and CVE fixes.', correctWay: 'Regularly patch and reboot nodes using livepatching or automated rolling node updates.' },
        { mistake: 'Assuming uptime resets when you close your SSH session', whyWrong: 'Uptime tracks the operating system kernel, not your personal terminal session.', correctWay: 'Know that user logins and logouts do not affect system uptime.' }
      ],
      safeRecovery: 'To check why a system rebooted in the past, run "last reboot | head -n 5".'
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
      badges: ['DiskIO', 'pidstat', 'sysstat', 'Triage'],
      difficulty: 'Intermediate',
      quote: 'iostat tells you the disk is dying; pidstat -d points you to the exact process holding the smoking gun.',
      whatIsIt: '"pidstat" (part of the sysstat package) reports statistics for Linux tasks (processes and threads). When invoked with the "-d" flag, it monitors disk I/O activity per process: displaying kB_rd/s (kilobytes read per second), kB_wr/s (kilobytes written per second), kB_ccwr/s (kilobytes cancelled write: dirty pages overwritten before hitting disk), and iodelay (I/O delay in clock ticks). This immediately correlates global disk saturation from iostat down to the exact PID and command responsible.',
      inSimpleWords: 'Finding out which app is thrashing your hard drive. If your disk light is flashing red, pidstat tells you "It is PID 4092 running a database backup".',
      whyDoYouNeedIt: 'Global tools like iostat or top show high %iowait, but they do not tell you WHICH process is writing 500MB/s. pidstat -d gives you the exact process name and PID.',
      realWorldScenario: 'An application server reports severe disk I/O latency. The engineer runs "pidstat -d 1" and discovers a misconfigured logstash process writing 450MB/s of debug logs to /var/log/app.log.',
      realWorldAnalogy: 'A security guard inspecting everyone leaving a building to see who is carrying out all the heavy boxes.',
      withoutVsWith: {
        without: {
          title: 'Guessing Which Process Saturates Storage',
          items: ['Killing random background processes hoping disk I/O drops', 'Confusing high CPU processes with high disk I/O processes', 'Unable to capture historical per-process I/O trends'],
          outcome: 'Accidental termination of innocent services while the real culprit persists.'
        },
        with: {
          title: 'Pinpoint Per-Process I/O Attribution',
          items: ['Instant mapping of read/write KB/s to specific PIDs and users', 'Detecting cancelled writes and page cache buffer overwrites', 'Direct evidence for developers to optimize heavy file read loops'],
          outcome: 'Zero-guesswork resolution of disk saturation emergencies.'
        }
      },
      blockDiagram: {
        title: 'pidstat Disk Accounting Flow',
        subtitle: 'How Linux tracks I/O counters per process in /proc/[pid]/io:',
        nodes: [
          { id: 'proc', label: 'Process write() Syscall', simpleDef: 'Application I/O', techDef: 'Process passes buffer pointer to write() or pwrite64()', badge: 'Process', color: '#10b981' },
          { id: 'io', label: '/proc/[pid]/io', simpleDef: 'Task Accounting', techDef: 'Kernel increments read_bytes and write_bytes in task_struct', badge: 'Kernel Accounting', color: '#38bdf8' },
          { id: 'pidstat', label: 'pidstat -d Reporter', simpleDef: 'Per-Process Rates', techDef: 'Samples deltas in /proc/[pid]/io over interval and computes rates per second', badge: 'CLI Reporter', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'kB_rd/s', simple: 'Kilobytes per second read from disk by this process.', technical: 'Number of kilobytes the task has caused to be read from storage during interval.' },
        { term: 'kB_wr/s', simple: 'Kilobytes per second written to disk by this process.', technical: 'Number of kilobytes the task has caused to be written to storage during interval.' }
      ],
      syntaxCode: 'pidstat -d 1 3',
      syntaxTokens: [
        { token: 'pidstat', role: 'command', explanation: 'Report statistics for Linux tasks' },
        { token: '-d', role: 'flag', explanation: 'Report disk I/O statistics per process' },
        { token: '1 3', role: 'argument', explanation: 'Sample every 1 second, printing 3 intervals' }
      ],
      variations: [
        { command: 'pidstat -u 1 3', description: 'Report per-process CPU utilization (%usr, %system, %CPU)' },
        { command: 'pidstat -r 1 3', description: 'Report per-process memory page faults and memory utilization' }
      ],
      expectedOutput: 'Linux 6.8.0-40-generic (linuxforge)   09/30/2026   _x86_64_   (8 CPU)\n\n01:30:00 AM   UID       PID   kB_rd/s   kB_wr/s kB_ccwr/s iodelay  Command\n01:30:01 AM   1001     3412      0.00  48210.50      0.00      42  logstash\n01:30:01 AM    105     1240    120.00    250.00      0.00       2  postgres',
      commonMistakes: [
        { mistake: 'Assuming "top" shows disk I/O rates', whyWrong: 'Standard "top" does not display per-process disk read/write throughput columns by default.', correctWay: 'Use "pidstat -d" or "iotop" to inspect disk read/write throughput.' },
        { mistake: 'Ignoring kB_ccwr/s (cancelled writes)', whyWrong: 'High cancelled writes indicate an application repeatedly truncates or overwrites temporary files before the OS can flush them to disk.', correctWay: 'Inspect whether the application should write to tmpfs (RAM) instead of physical disk.' }
      ],
      safeRecovery: 'If a rogue process is thrashing disk, throttle its I/O priority safely with "sudo ionice -c 3 -p PID".'
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
      badges: ['Network', 'Throughput', 'Saturation', 'Core'],
      difficulty: 'Intermediate',
      quote: 'A 1Gbps network card saturates at ~118MB/s; beyond that, packet queues fill, latency spikes, and packets drop.',
      whatIsIt: 'Network performance on Linux involves monitoring bandwidth throughput (kilobytes or megabytes received/transmitted per second: rKB/s, wKB/s), packet rates (rPk/s, wPk/s), interface saturation (%Util), and error/drop rates. Utilities like "nicstat", "sar -n DEV", and "ip -s link" read /proc/net/dev to calculate bandwidth utilization against the physical interface link speed (e.g. 1000Mbps or 10Gbps). Concurrently, inspecting TCP retransmits with "netstat -s | grep retransmitted" identifies network congestion.',
      inSimpleWords: 'Measuring the highway traffic on your network cable. Is your network card maxed out at 100% capacity, and are data packets getting lost or dropped along the way?',
      whyDoYouNeedIt: 'Slow web applications are frequently blamed on slow code when the real issue is an overloaded network interface card or high packet drops on a switch port.',
      realWorldScenario: 'A database replication replica falls behind by hours. Running "sar -n DEV 1" reveals eth0 is transmitting 118MB/s on a 1Gbps NIC with %util at 99.8%. The network pipe is completely saturated, requiring upgrading the cloud instance to a 10Gbps enhanced networking tier.',
      realWorldAnalogy: 'A water pipe with a fixed diameter: if you pump more gallons than the pipe diameter allows, water pressure drops or overflows at the entrance.',
      withoutVsWith: {
        without: {
          title: 'Unaware of Network Pipe Saturation',
          items: ['Blaming slow database queries on bad indexes when network throughput is capped', 'Missing silent packet drops causing massive TCP retransmission latency', 'Unable to verify if high packet rates are DDoS attacks or legitimate traffic'],
          outcome: 'Frustrating performance troubleshooting and misallocated engineering effort.'
        },
        with: {
          title: 'Accurate Network Capacity Analysis',
          items: ['Real-time %Util tracking against physical link speed', 'Instant visibility into packet drops and CRC errors with "ip -s link"', 'Monitoring TCP retransmissions with "sar -n ETCP 1"'],
          outcome: 'Deterministic identification of network saturation and clean packet flow.'
        }
      },
      blockDiagram: {
        title: 'Linux Network Packet Pipeline',
        subtitle: 'How packets traverse from physical NIC to user space socket:',
        nodes: [
          { id: 'nic', label: 'Physical NIC (eth0)', simpleDef: 'Hardware Controller', techDef: 'Physical Ethernet MAC/PHY receiving frames into RX Ring Buffer', badge: 'Hardware', color: '#10b981' },
          { id: 'driver', label: 'Driver & NAPI / softirq', simpleDef: 'Kernel Ingestion', techDef: 'Polls ring buffer, creates sk_buff structures, raises NET_RX_SOFTIRQ', badge: 'Kernel Ring 0', color: '#38bdf8' },
          { id: 'stack', label: 'TCP/IP Stack & Sockets', simpleDef: 'Protocol Processing', techDef: 'Routing table lookup, TCP window verification, queuing to socket recv buffer', badge: 'Network Stack', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'NIC Saturation (%Util)', simple: 'How close the network card is to its maximum physical bandwidth limit.', technical: 'Ratio of current (rKB/s + wKB/s) to the interface speed reported by ethtool.' },
        { term: 'TCP Retransmission', simple: 'A packet was lost in transit and had to be resent, adding massive delay.', technical: 'Sender re-sending TCP segment because no ACK was received before RTO timeout.' }
      ],
      syntaxCode: 'nicstat 1 3',
      syntaxTokens: [
        { token: 'nicstat', role: 'command', explanation: 'Print network interface card statistics' },
        { token: '1', role: 'argument', explanation: 'Sampling interval of 1 second' },
        { token: '3', role: 'argument', explanation: 'Count: stop after 3 reports' }
      ],
      variations: [
        { command: 'sar -n DEV 1 3', description: 'Standard sysstat utility reporting network interface packet rates and bandwidth' },
        { command: 'ip -s link show eth0', description: 'Display total lifetime received/transmitted packet, error, and drop counters' }
      ],
      expectedOutput: '    Time      Int   rKB/s   wKB/s   rPk/s   wPk/s    rAvs    wAvs %Util    Sat\n01:35:01     eth0  1245.2  8912.4  1420.0  6210.0   897.2  1467.5  7.45   0.00\n01:35:02     eth0  1180.0  9200.1  1390.0  6400.0   869.1  1472.0  7.68   0.00',
      commonMistakes: [
        { mistake: 'Confusing Megabits per second (Mbps) with Megabytes per second (MB/s)', whyWrong: 'Network speed is marketed in bits (1Gbps), but files and Linux tools often report in bytes (125MB/s max). Expecting 1GB/s on a 1Gbps link is an 8x calculation error!', correctWay: 'Divide network bit ratings by 8 to determine realistic theoretical byte limits.' },
        { mistake: 'Ignoring packet drop counters in "ip -s link"', whyWrong: 'Non-zero drops mean the kernel RX ring buffer is full because CPU softirqs cannot process packets fast enough.', correctWay: 'Increase ring buffer size with "ethtool -G eth0 rx 4096".' }
      ],
      safeRecovery: 'To check if network errors are accumulating right now, run "netstat -s | grep -i retrans".'
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
      badges: ['perf', 'Profiling', 'Advanced', 'Hotspots'],
      difficulty: 'Advanced',
      quote: 'When high CPU cannot be explained by logs, perf top reads the hardware performance counters to show the exact C function consuming cycles.',
      whatIsIt: '"perf" is the official Linux kernel performance analyzing tool. It uses hardware Performance Monitoring Units (PMUs) and kernel tracepoints to profile software with near-zero overhead. "perf top" provides a real-time, interactive view of functions consuming CPU cycles across both user space applications and kernel space drivers. It resolves memory addresses into human-readable function symbols (e.g. "sha256_transform" or "spin_lock"), showing developers the exact code hotspot responsible for CPU saturation.',
      inSimpleWords: 'An X-ray machine for running code. It looks inside active processes and tells you the exact line or function in your software that is burning 90% of the CPU.',
      whyDoYouNeedIt: 'When your Go, C++, Rust, or Python service is consuming 100% CPU but your application logs look normal, "perf top" tells you whether it is stuck in a regular expression engine, JSON deserializer, or kernel lock.',
      realWorldScenario: 'A high-throughput payment processing engine uses 100% CPU on all 16 cores. The team runs "perf top" and discovers 65% of all cycles are spent in "pthread_mutex_lock", proving thread lock contention is the bottleneck rather than actual payment processing math.',
      realWorldAnalogy: 'A mechanic using a stethoscope to listen to an engine: instead of just saying "the engine is loud", they hear the exact misfiring valve.',
      withoutVsWith: {
        without: {
          title: 'Guessing and Adding Print Statements to Production Code',
          items: ['Adding verbose logging that changes timing and degrades performance further', 'Refactoring code blindly without knowing the true hot path', 'Inability to profile kernel time and system call overhead'],
          outcome: 'Wasted weeks of development time optimizing code that was not the bottleneck.'
        },
        with: {
          title: 'Deterministic Code Profiling with Linux perf',
          items: ['Real-time function symbol resolution across user and kernel space', 'Hardware PMU counter sampling (cycles, instructions, cache misses)', 'Generating Flame Graphs to visualize the entire call stack hierarchy'],
          outcome: 'Immediate identification and resolution of the critical code bottleneck.'
        }
      },
      blockDiagram: {
        title: 'Linux perf Profiling Architecture',
        subtitle: 'How perf samples CPU execution using hardware counters:',
        nodes: [
          { id: 'pmu', label: 'Hardware PMU Counters', simpleDef: 'CPU Silicon Counters', techDef: 'Hardware registers in Intel/AMD CPUs counting instructions and cache misses', badge: 'Silicon PMU', color: '#10b981' },
          { id: 'perf_event', label: 'perf_event_open() Syscall', simpleDef: 'Kernel Event Subsystem', techDef: 'Kernel rings interrupts on counter overflow and captures instruction pointers', badge: 'Kernel Event', color: '#38bdf8' },
          { id: 'top', label: 'perf top Dashboard', simpleDef: 'Symbol Resolution', techDef: 'Reads ELF symbol tables and DWARF debug info to map addresses to function names', badge: 'User Space', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'PMU (Performance Monitoring Unit)', simple: 'Special hardware counters inside your CPU chip.', technical: 'Hardware component of modern microprocessors dedicated to tracking micro-architectural parameters.' },
        { term: 'Flame Graph', simple: 'A visual diagram showing which functions take the most CPU time.', technical: 'Hierarchical visualization of profiled stack traces where box width represents frequency of sample.' }
      ],
      syntaxCode: 'perf top',
      syntaxTokens: [
        { token: 'perf', role: 'command', explanation: 'Linux kernel performance analyzing tool' },
        { token: 'top', role: 'argument', explanation: 'System profiling tool generating real-time function hotspot display' }
      ],
      variations: [
        { command: 'perf record -F 99 -p PID -g -- sleep 10', description: 'Record call graph stack traces at 99Hz for 10 seconds on a specific PID' },
        { command: 'perf report', description: 'Analyze and display recorded perf.data profiling results' }
      ],
      expectedOutput: 'Samples: 120K of event \'cycles\', 4000 Hz, Event count (approx.): 2410291410\nOverhead  Shared Object       Symbol\n  34.12%  libc.so.6           [.] __memmove_avx_unaligned_erms\n  18.45%  my_backend_service  [.] ProcessPaymentJson\n   8.12%  [kernel]            [k] copy_user_enhanced_fast_string\n   5.20%  my_backend_service  [.] ValidateChecksum',
      commonMistakes: [
        { mistake: 'Profiling stripped binaries without debug symbols', whyWrong: 'If binaries are stripped, perf can only display raw memory addresses (e.g. 0x00007fff) instead of function names.', correctWay: 'Compile with "-g" or install dbgsym/debuginfo debug symbol packages.' },
        { mistake: 'Running perf inside unprivileged containers without CAP_PERFMON', whyWrong: 'Kernel security prevents unprivileged processes from sampling system-wide hardware counters.', correctWay: 'Run perf on the host node or grant CAP_PERFMON / CAP_SYS_ADMIN privileges.' }
      ],
      safeRecovery: 'Press "q" or "Ctrl+C" to exit perf top without altering system configuration.'
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
      badges: ['Troubleshooting', 'SRE', 'Methodology', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Never guess in performance triage: follow Brendan Gregg\'s 60-second checklist to rule out CPU, memory, disk, and network in 10 commands.',
      whatIsIt: 'Performance troubleshooting on production Linux systems requires a structured, repeatable methodology rather than random command execution. Brendan Gregg\'s famous "Linux Performance Analysis in 60 Seconds" checklist runs 10 key tools in a disciplined order: 1) uptime (load averages), 2) dmesg -T (kernel panic/OOM errors), 3) vmstat 1 (runqueue and swap thrashing), 4) mpstat -P ALL 1 (individual core saturation), 5) pidstat 1 (per-process CPU), 6) iostat -xz 1 (disk latency and saturation), 7) free -m (available memory), 8) sar -n DEV 1 (network throughput), 9) sar -n TCP,ETCP 1 (TCP retransmissions), 10) top (general verification).',
      inSimpleWords: 'A doctor\'s 60-second trauma checkup for a dying server. You check pulse (uptime), internal bleeding (dmesg), breathing (vmstat), and blood pressure (iostat) in a strict order.',
      whyDoYouNeedIt: 'During high-severity production outages, panic causes engineers to jump to erroneous conclusions. Having a memorized 60-second checklist gives you absolute confidence and rules out 95% of bottlenecks immediately.',
      realWorldScenario: 'An SRE joins a high-severity incident bridge where 5 engineers are arguing over whether the database or backend code is broken. The SRE runs the 60-second checklist: uptime shows normal load, free shows 12GB available, but "dmesg -T" reveals CPU thermal throttling events, proving the physical server cooling fans failed in the datacenter.',
      realWorldAnalogy: 'An emergency room trauma doctor following the ABC protocol (Airway, Breathing, Circulation) before deciding on surgery.',
      withoutVsWith: {
        without: {
          title: 'Chaos and Random Command Trial-and-Error',
          items: ['Running random commands and restarting arbitrary services', 'Arguing over theories without concrete hardware and kernel metrics', 'Taking 45 minutes to discover a server ran out of memory 2 hours ago'],
          outcome: 'Prolonged downtime, unhappy customers, and engineer burnout.'
        },
        with: {
          title: 'Senior SRE 60-Second Methodical Triage',
          items: ['Structured sequence covering CPU, memory, storage, and networking', 'Concrete evidence generated within 60 seconds of logging in', 'Quick identification of the exact failing hardware or kernel subsystem'],
          outcome: 'Mean Time to Resolution (MTTR) reduced from hours to under 3 minutes.'
        }
      },
      blockDiagram: {
        title: 'Brendan Gregg 60-Second Checklist Workflow',
        subtitle: 'The 4-stage systematic triage order:',
        nodes: [
          { id: 'step1', label: '1. Overview (uptime, dmesg)', simpleDef: 'Pulse & Kernel Log', techDef: 'Checks load trends and critical kernel hardware/OOM errors', badge: 'Stage 1', color: '#10b981' },
          { id: 'step2', label: '2. CPU & Memory (vmstat, mpstat, free)', simpleDef: 'Runqueue & RAM', techDef: 'Checks runqueue length, core saturation, and available memory', badge: 'Stage 2', color: '#38bdf8' },
          { id: 'step3', label: '3. Storage & Network (iostat, sar)', simpleDef: 'I/O & Packets', techDef: 'Checks disk await latency, %util, and network interface drops', badge: 'Stage 3', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'USE Method', simple: 'A performance checklist: check Utilization, Saturation, and Errors for every hardware component.', technical: 'Methodology by Brendan Gregg: For every resource (CPU, memory, disk, bus), check Utilization (% busy), Saturation (queue depth), and Errors.' },
        { term: 'OOM Killer', simple: 'A kernel feature that terminates the biggest memory-hogging program when RAM is completely gone.', technical: 'Out-Of-Memory killer triggered by page allocation failure invoking oom_kill_process().' }
      ],
      syntaxCode: 'dmesg -T | grep -E "(OOM|throttled)"',
      syntaxTokens: [
        { token: 'dmesg', role: 'command', explanation: 'Print or control the kernel ring buffer' },
        { token: '-T', role: 'flag', explanation: 'Read human-readable real calendar timestamps instead of seconds since boot' },
        { token: '| grep -E', role: 'operator', explanation: 'Search for critical OOM or CPU throttling error signatures' }
      ],
      variations: [
        { command: 'dmesg -T -l err,crit,alert,emerg', description: 'Filter kernel ring buffer to display only errors, critical events, alerts, and emergencies' },
        { command: 'journalctl -k -p 3 -xb', description: 'Query systemd journal for kernel messages with priority error (3) for current boot' }
      ],
      expectedOutput: '[Wed Sep 30 01:40:12 2026] Out of memory: Killed process 4120 (java) total-vm:8451200kB, anon-rss:3912400kB, file-rss:0kB, shmem-rss:0kB, UID:1001 pgtables:8200kB oom_score_adj:0',
      commonMistakes: [
        { mistake: 'Restarting services before collecting performance triage telemetry', whyWrong: 'Restarting clears process memory state, process tables, and ephemeral telemetry, destroying root-cause evidence.', correctWay: 'Spend 60 seconds recording top, vmstat, and dmesg before executing restarts.' },
        { mistake: 'Assuming high load average always means CPU is the bottleneck', whyWrong: 'On Linux, load average includes State D (disk wait) processes; high load often means dead NFS or failing disk drives.', correctWay: 'Inspect vmstat column "b" and iostat to verify if the stall is storage-related.' }
      ],
      safeRecovery: 'If dmesg shows an OOM killer event, inspect which process was killed and why using "journalctl -k | grep -i oom".'
    })
  ]
};
