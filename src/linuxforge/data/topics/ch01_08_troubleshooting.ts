import { LinuxTopic } from '../unifiedLinuxData';

export const MODULE_08_TROUBLESHOOTING: LinuxTopic = {
  id: 'ch01-08-troubleshooting',
  number: '01.8',
  title: 'Linux Production Troubleshooting',
  iconName: 'Wrench',
  description:
    'SRE triage and system diagnostics: compute & RAM saturation (CPU usage, load averages, memory, OOM killer, vmstat), storage bottlenecks (disk usage df/du, inode limits, disk I/O iostat), and system limits (service failures, permission errors, file descriptors ulimit/lsof).',
  concepts: [
    {
      id: 'linux-cpu-memory-troubleshooting',
      command: 'uptime; free -m; vmstat 1 5; dmesg | grep -i -E "oom|killed process"',
      title: 'CPU, Load Averages & Memory Exhaustion Triage: vmstat, free, OOM Killer',
      topicId: 'ch01-08-troubleshooting',
      topicNumber: '01.8',
      topicTitle: 'Linux Production Troubleshooting',
      subtitle: 'Load average analysis, buffer/cache memory breakdown, swap thrashing, and OOM killer forensics',
      badges: ['SRE', 'Troubleshooting', 'Performance'],
      quote:
        'Load average is not CPU percentage: it is the number of tasks queued for CPU plus tasks blocked waiting on disk I/O.',
      difficulty: 'Advanced',
      whatIsIt:
        'Triaging a slow Linux server begins with CPU and memory diagnostics. `uptime` reports the 1, 5, and 15-minute **Load Averages**. On Linux, load average counts both processes executing on CPU (or queued) AND processes in uninterruptible sleep (`state D`, waiting on disk/NFS I/O). A load average higher than your CPU core count indicates saturation. `free -m` (or `free -h`) breaks down RAM: total, used, free, shared, buff/cache, and available. Crucially, high "buff/cache" is healthy—Linux uses idle RAM to cache disk blocks and frees it instantly when applications need it. If physical RAM and swap are completely exhausted, the kernel’s **OOM Killer** (Out-Of-Memory) activates, calculating a badness score for every process and executing `kill -9` on the largest offender, logged in `dmesg`.',
      inSimpleWords:
        '`uptime` tells you if your computer has a traffic jam of work. `free -h` shows how much RAM is being used; don’t worry if "free" is low as long as "available" is high, because Linux uses spare RAM to make disk access faster. If you run out of memory completely, the kernel’s bouncer (the OOM Killer) abruptly shoots the biggest program in the head to save the server.',
      whyDoYouNeedIt:
        'When an API stops responding or a Kubernetes pod exits with exit code 137 (`OOMKilled`), you must immediately inspect `dmesg` to find the exact memory dump and optimize heap sizes.',
      realWorldAnalogy:
        'A highway toll booth: If you have 4 toll booths (4 CPU cores), a load average of 4.0 means the highway is running at 100% capacity with zero traffic delay. A load average of 12.0 means 8 cars are stuck in a traffic jam waiting to be processed.',
      withoutVsWith: {
        without: {
          title: 'Without Systematic CPU & Memory Triage (Guessing)',
          items: [
            'Rebooting servers blindly without diagnosing whether CPU, memory, or disk I/O caused the freeze',
            'Assuming high cache memory is a memory leak, leading to unnecessary server upgrades',
            'No visibility into why microservices suddenly vanish without application logs',
          ],
          outcome: 'Recurrent production outages and wasted cloud infrastructure spend.',
        },
        with: {
          title: 'With Linux Systematic Performance Triage',
          items: [
            'Instant differentiation between CPU-bound vs disk-I/O bound load averages using vmstat',
            'Accurate memory assessment using the "available" column in free -h',
            'Forensic confirmation of OOM kills via dmesg with exact memory page counts',
          ],
          outcome: 'Immediate root-cause identification and targeted performance tuning.',
        },
      },
      blockDiagram: {
        title: 'Memory Allocation & OOM Killer Pipeline',
        subtitle: 'From Page Cache allocation to Swap Thrashing and Kernel OOM Killer activation',
        nodes: [
          { id: 'mem-ram', label: 'Physical RAM Allocation', simpleDef: 'App anonymous memory + Page Cache', techDef: 'Kernel manages 4KB memory pages via buddy allocator', badge: 'RAM', color: '#38bdf8' },
          { id: 'mem-kswapd', label: 'kswapd Reclaim', simpleDef: 'Reclaims page cache to disk', techDef: 'Wakes when free pages hit watermarks; flushes dirty pages', badge: 'kswapd', color: '#06b6d4' },
          { id: 'mem-swap', label: 'Swap Thrashing', simpleDef: 'Paging memory to disk', techDef: 'High si/so rates in vmstat; system grinds to a halt', badge: 'Thrashing', color: '#f59e0b' },
          { id: 'mem-oom', label: 'OOM Killer Triggered', simpleDef: 'Kernel terminates biggest process', techDef: 'Invokes oom_kill_process(); sends SIGKILL (exit code 137); logs to dmesg', badge: 'OOM Killer', color: '#ef4444' },
        ],
      },
      terms: [
        { term: 'Available Memory', simple: 'The real amount of RAM you can actually launch new apps with.', technical: 'An estimate of how much memory is available for starting new applications without swapping, combining free RAM and reclaimable cache.' },
        { term: 'OOM Killer (Exit Code 137)', simple: 'When the kernel kills your process due to zero remaining RAM (128 + 9 = 137).', technical: 'Out-Of-Memory Killer; activates when page allocation fails and swap is exhausted; logs to dmesg.' },
        { term: 'vmstat si / so', simple: 'Swap In / Swap Out: indicates whether your server is choking by reading/writing to swap disk.', technical: 'Amount of memory swapped in from disk (si) or out to disk (so) per second; values > 0 indicate severe memory pressure.' },
      ],
      whenToUse: [
        'Checking if server is overloaded: `uptime` and compare load against `nproc` (CPU count)',
        'Diagnosing why a process suddenly crashed: `dmesg -T | grep -i oom`',
        'Watching live CPU, run-queue, and memory thrashing: `vmstat 1 5`',
      ],
      whenNotToUse: [
        'Do not calculate used memory as Total minus Free; always look at Total minus Available',
      ],
      syntaxCode: 'uptime\nfree -h\nvmstat 1 5\ndmesg -T | grep -i -E "oom|killed process"\ncat /proc/loadavg',
      syntaxTokens: [
        { token: 'uptime', role: 'Command', explanation: 'Print current time, uptime, user count, and 1, 5, 15 minute load averages' },
        { token: 'free -h', role: 'Flags', explanation: 'Display memory in human-readable gigabytes and megabytes' },
        { token: 'vmstat 1 5', role: 'Arguments', explanation: 'Sample virtual memory statistics every 1 second, 5 times' },
      ],
      variations: [
        { syntax: 'nproc', title: 'CPU Core Count', whatItDoes: 'Returns the number of processing cores available', whenToUse: 'Interpreting load averages' },
        { syntax: 'cat /proc/sys/vm/swappiness', title: 'Swappiness', whatItDoes: 'Checks kernel aggressiveness to swap (0-100)', whenToUse: 'Tuning database servers (swappiness=1)' },
      ],
      internalFlow: [
        { step: 1, title: 'CPU & Queue Tracking', desc: 'Kernel scheduler tracks tasks in TASK_RUNNING and TASK_UNINTERRUPTIBLE', why: 'Computes load average', techDetail: 'Averages active runnable and disk-waiting tasks over 1, 5, and 15 minute exponential decay' },
        { step: 2, title: 'RAM Allocation Failure', desc: 'Process requests memory page via brk() or mmap(); free pages drop below min watermark', why: 'Triggers reclaim', techDetail: 'kswapd attempts to free page cache buffers to satisfy allocation' },
        { step: 3, title: 'OOM Invocation', desc: 'If reclaim and swap fail, kernel invokes out_of_memory()', why: 'Saves OS from crashing', techDetail: 'Calculates oom_score for all processes; terminates highest score with SIGKILL' },
      ],
      sandbox: {
        initialCommands: ['# Check system load and memory status\nuptime\nfree -h'],
        guidedSteps: [
          { instruction: 'Inspect system uptime and load averages', command: 'uptime', hint: 'Run uptime' },
          { instruction: 'Inspect memory breakdown in human-readable format', command: 'free -h', hint: 'Run free -h' },
          { instruction: 'Check CPU core count', command: 'nproc', hint: 'Run nproc' },
        ],
        targetTask: 'Check system load and memory capacity with uptime and free -h',
        solutionCommands: ['uptime', 'free -h'],
      },
      commonMistakes: [
        { mistake: 'Panicking because "free" memory in free -m is only 100MB', whyWrong: 'Linux deliberately uses unused RAM as Page Cache to accelerate disk reads. If an app needs memory, the kernel evicts the cache in microseconds.', correctWay: 'Always look at the "available" column, which indicates truly usable RAM.' },
        { mistake: 'Assuming a load average of 5.0 is bad on a 64-core server', whyWrong: 'Load average must always be compared to the total CPU core count (nproc). On a 64-core machine, a load of 5.0 means the server is over 90% idle.', correctWay: 'Divide load average by nproc: < 1.0 means capacity is available; > 1.0 means queued backlog.' },
      ],
      challenge: {
        question: 'What is the primary indicator in `free -h` that tells you how much RAM is actually safe to allocate to new applications?',
        options: [
          { label: 'available', isCorrect: true, explanation: 'available estimates RAM that can be allocated without swapping, accounting for reclaimable cache.' },
          { label: 'free', isCorrect: false, explanation: 'free only counts completely untouched RAM, ignoring cache that can be reclaimed.' },
          { label: 'shared', isCorrect: false, explanation: 'shared represents tmpfs and shared memory segments.' },
          { label: 'total', isCorrect: false, explanation: 'total is the physical hardware capacity.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['uptime', 'free -h', 'nproc', 'vmstat 1 5', 'dmesg -T | grep -i oom'],
        bestPractices: [
          'Monitor the "available" memory metric in Prometheus rather than raw "free"',
          'Set vm.swappiness=1 on Elasticsearch and database servers to prevent premature disk swapping',
        ],
      },
    },
    {
      id: 'linux-disk-io-troubleshooting',
      command: 'df -h; df -i; du -sh /var/log/* | sort -rh | head -n 5; iostat -xz 1 3',
      title: 'Disk Usage, Inode Exhaustion & I/O Bottlenecks: df, du, iostat',
      topicId: 'ch01-08-troubleshooting',
      topicNumber: '01.8',
      topicTitle: 'Linux Production Troubleshooting',
      subtitle: 'Disk capacity triage, recursive directory breakdowns, inode depletion, and disk I/O saturation',
      badges: ['Disk', 'Inodes', 'iostat', 'Troubleshooting'],
      quote:
        'A disk can be "Full" with 500GB of free space if it runs out of Inodes. Always check df -i alongside df -h.',
      difficulty: 'Advanced',
      whatIsIt:
        'Storage failures take two distinct forms: capacity exhaustion and I/O latency bottlenecks. `df -h` inspects disk capacity per mount point. However, filesystems also have a fixed allocation of **Inodes** (index nodes); running `df -i` checks inode capacity. If an application generates millions of tiny 1-byte files (like a runaway mail queue or session cache), the disk runs out of inodes and throws "No space left on device", even with gigabytes of free disk space! To find what is consuming disk space, `du -sh <dir>/* | sort -rh | head` locates the largest culprit directories. For performance, `iostat -xz 1` analyzes physical disk throughput, checking `%util` (disk saturation percentage) and `await` (average I/O latency in milliseconds).',
      inSimpleWords:
        '`df -h` checks how many gigabytes of storage you have left. `df -i` checks if you ran out of file ID numbers (inodes). `du -sh` tells you which specific folders are hogging your space. `iostat -xz` tells you if your hard drive is sweating and struggling to read and write fast enough.',
      whyDoYouNeedIt:
        'A server throwing "No space left on device" when `df -h` says only 40% used is the classic Inode exhaustion trap. Running `df -i` immediately proves the theory.',
      realWorldAnalogy:
        'A parking garage: `df -h` is checking the physical square footage of the garage. `df -i` is checking how many parking tickets the attendant has left in their dispenser. Even if the garage is half-empty, if the attendant runs out of tickets, no more cars can enter!',
      withoutVsWith: {
        without: {
          title: 'Without Inode and I/O Diagnostic Tools',
          items: [
            'System reports "No space left on device", but df -h shows hundreds of gigabytes free',
            'Admins cannot explain why database queries take 30 seconds when CPU usage is low',
            'Manual guessing of which directory contains runaway log files',
          ],
          outcome: 'Production downtime from phantom disk full errors and undiagnosed disk thrashing.',
        },
        with: {
          title: 'With Linux Disk & Inode Diagnostics (df -i, du, iostat)',
          items: [
            'df -i instantly identifies inode exhaustion caused by millions of micro-files',
            'du -sh sorted pipelines drill down to the exact multi-gigabyte log folder in seconds',
            'iostat %util and await identify saturated SSDs and dying disk controllers',
          ],
          outcome: 'Rapid capacity recovery and instant identification of storage I/O bottlenecks.',
        },
      },
      blockDiagram: {
        title: 'Storage Capacity vs Inode Exhaustion Architecture',
        subtitle: 'Why filesystems require both free disk blocks AND free inode table entries',
        nodes: [
          { id: 'sb-blocks', label: 'Disk Data Blocks (df -h)', simpleDef: 'Physical storage sectors', techDef: 'Stores actual byte payloads; exhaustion prevents writing more bytes', badge: 'Data Blocks', color: '#38bdf8' },
          { id: 'sb-inodes', label: 'Inode Table (df -i)', simpleDef: 'Fixed index metadata slots', techDef: 'Pre-allocated on ext4 format; each file requires 1 inode regardless of size', badge: 'Inode Table', color: '#ef4444' },
          { id: 'sb-du', label: 'du -sh Directory Sizer', simpleDef: 'Finds largest directories', techDef: 'Recursively sums file sizes within directory tree branches', badge: 'Size Profiling', color: '#10b981' },
          { id: 'sb-iostat', label: 'iostat -xz (I/O Metrics)', simpleDef: 'Measures disk saturation', techDef: 'Reads /proc/diskstats: %util > 90% indicates I/O bottleneck; await > 15ms', badge: 'I/O Latency', color: '#f59e0b' },
        ],
      },
      terms: [
        { term: 'Inode Exhaustion', simple: 'Running out of file index slots even though free disk space remains.', technical: 'Condition where all pre-allocated inode structures on an ext4 filesystem are exhausted by millions of small files.' },
        { term: 'iostat %util', simple: 'Percentage of time the physical hard drive was busy doing work.', technical: 'Device saturation metric; values approaching 100% indicate storage queue saturation.' },
        { term: 'iostat await', simple: 'Average time (in milliseconds) for disk read/write requests to complete.', technical: 'Average time from I/O request dispatch to hardware completion; values > 20ms indicate disk latency bottleneck.' },
      ],
      whenToUse: [
        'Diagnosing "No space left on device" errors: run `df -h` and `df -i` immediately',
        'Finding which directory is filling up root: `du -sh /var/* | sort -rh | head -n 10`',
        'Investigating database write latency: `iostat -xz 1 5`',
      ],
      whenNotToUse: [
        'Never run `du -sh /` blindly on a multi-terabyte production database without nice; it causes heavy random disk read I/O',
      ],
      syntaxCode: 'df -h\ndf -i\ndu -sh /var/log/* | sort -rh | head -n 10\niostat -xz 1 3',
      syntaxTokens: [
        { token: 'df -h', role: 'Command & Flag', explanation: 'Disk free in human readable gigabytes/megabytes' },
        { token: 'df -i', role: 'Flag', explanation: 'Disk free in terms of available inode count' },
        { token: 'du -sh', role: 'Command & Flags', explanation: 'Disk usage summary (-s) in human readable format (-h)' },
        { token: 'iostat -xz', role: 'Flags', explanation: '-x (extended disk stats), -z (omit inactive disks with zero I/O)' },
      ],
      variations: [
        { syntax: 'find /var -type f -size +500M', title: 'Find Large Files', whatItDoes: 'Directly locates files larger than 500MB', whenToUse: 'Quick disk recovery' },
        { syntax: 'iotop -o', title: 'Interactive I/O Top', whatItDoes: 'Displays processes actively generating disk read/writes', whenToUse: 'Finding runaway disk write PIDs' },
      ],
      internalFlow: [
        { step: 1, title: 'Process Calls statvfs()', desc: 'df invokes statvfs() system call on filesystem mount points', why: 'Reads superblock', techDetail: 'Queries superblock counters: f_bfree (blocks free) and f_ffree (files/inodes free)' },
        { step: 2, title: 'du Directory Traversal', desc: 'du calls fstatat() recursively summing st_blocks on all inodes', why: 'Calculates directory size', techDetail: 'Multiplies 512-byte blocks by count to compute actual on-disk footprint' },
        { step: 3, title: 'iostat Samples /proc/diskstats', desc: 'iostat reads physical disk sector read/write counters', why: 'Measures I/O performance', techDetail: 'Computes delta over 1-second sample interval to derive r/s, w/s, await, and %util' },
      ],
      sandbox: {
        initialCommands: ['# Inspect filesystem disk space and inode availability\ndf -h\ndf -i'],
        guidedSteps: [
          { instruction: 'Inspect filesystem capacity in human readable format', command: 'df -h', hint: 'Run df -h' },
          { instruction: 'Inspect inode usage across filesystems', command: 'df -i', hint: 'Run df -i' },
        ],
        targetTask: 'Check disk space and inode capacity with df -h and df -i',
        solutionCommands: ['df -h', 'df -i'],
      },
      commonMistakes: [
        { mistake: 'Deleting a large log file with rm and wondering why df -h does not free disk space', whyWrong: 'If an active process (like Nginx) still holds the file open, the kernel preserves the disk blocks until the process closes the file descriptor or is restarted.', correctWay: 'Truncate the file instead: > /var/log/app.log or restart the holding daemon.' },
        { mistake: 'Checking only df -h when encountering "No space left on device"', whyWrong: 'Millions of 0-byte or tiny files consume 100% of available inodes while disk blocks remain 90% empty.', correctWay: 'Always execute df -i to verify inode capacity.' },
      ],
      challenge: {
        question: 'Why might a server throw "No space left on device" when `df -h` shows 200 GB of free disk space remaining?',
        options: [
          { label: 'The filesystem has exhausted its allocated Inodes (verified with `df -i`)', isCorrect: true, explanation: 'Every file requires an Inode; creating millions of tiny files can exhaust the inode table while disk space remains free.' },
          { label: 'The CPU cache has overheated', isCorrect: false, explanation: 'CPU temperature does not trigger filesystem space errors.' },
          { label: 'The network interface is saturated', isCorrect: false, explanation: 'Network throughput is unrelated to filesystem block allocation.' },
          { label: 'The operating system license expired', isCorrect: false, explanation: 'Linux has no software licenses that freeze disk writes.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['df -h', 'df -i', 'du -sh <dir>/*', 'iostat -xz 1 3', 'iotop -o'],
        bestPractices: [
          'If deleting a file does not free space in df -h, find the holding process with: lsof +L1',
          'Truncate open files without restarting processes: : > /var/log/runaway.log',
        ],
      },
    },
    {
      id: 'linux-service-fd-troubleshooting',
      command: 'systemctl --failed; ulimit -n; lsof -p 1 | head -n 10; cat /proc/sys/fs/file-nr',
      title: 'Service Failures, Permissions & File Descriptor Limits: ulimit, lsof',
      topicId: 'ch01-08-troubleshooting',
      topicNumber: '01.8',
      topicTitle: 'Linux Production Troubleshooting',
      subtitle: 'Triage of failed daemons, permission denied root-causes, open socket leaks, and file descriptor limits',
      badges: ['ulimit', 'lsof', 'SysAdmin', 'Troubleshooting'],
      quote:
        '"Too many open files" does not mean text files: in Linux, network sockets, pipes, and event loops are all file descriptors.',
      difficulty: 'Advanced',
      whatIsIt:
        'Three frequent operational failure modes strike production systems: failed services, permission denied errors, and resource limit exhaustion. `systemctl --failed` immediately lists all dead or crashing services across the machine. Permission failures often stem from missing directory execute bits, wrong ownership, or security policy blocks (SELinux/AppArmor). Finally, the infamous **"Too many open files" (EMFILE)** error occurs when a high-concurrency microservice or database exhausts its allocated **File Descriptors**. In Linux, every TCP socket, client connection, pipe, and file uses an integer file descriptor. `ulimit -n` shows the per-process limit (often defaulting to a low 1024), `/proc/sys/fs/file-nr` shows system-wide allocation, and `lsof` (List Open Files) identifies exactly which sockets and files are leaking.',
      inSimpleWords:
        '`systemctl --failed` lists all services that are dead. Permission denied means you don’t have the right keys or folder execute bits. "Too many open files" means your app has too many open web connections and hit its limit. `ulimit -n` checks your maximum limit, and `lsof` shows every open door.',
      whyDoYouNeedIt:
        'When an Nginx reverse proxy or Node.js API crashes under high Black Friday web traffic with "Too many open files (24: Too many open files)", you must increase `LimitNOFILE=65536` in the systemd service file and configure `/etc/security/limits.conf`.',
      realWorldAnalogy:
        'A telephone switchboard operator: Each phone call (TCP socket) occupies one phone line (file descriptor). If the building code says the operator can only hold 1,024 lines simultaneously, the 1,025th customer gets a busy signal ("Too many open files"), even if the building has plenty of electricity.',
      withoutVsWith: {
        without: {
          title: 'Without File Descriptor and Limits Triage',
          items: [
            'Web services drop high-volume traffic abruptly under load with mysterious 502/504 errors',
            'Admins spend hours debugging application code when the real issue was a default 1024 ulimit',
            'Cannot pinpoint which microservice is leaking unclosed database connections',
          ],
          outcome: 'Disastrous high-traffic outages and unscalable cloud services.',
        },
        with: {
          title: 'With Systemd Limits Tuning and lsof Forensics',
          items: [
            'Production systemd services configured with LimitNOFILE=65536 support massive scale',
            'lsof -p <PID> identifies unclosed connection leaks in minutes',
            'systemctl --failed immediately points engineers to broken system daemons',
          ],
          outcome: 'Bulletproof high-concurrency performance and rapid root-cause diagnosis.',
        },
      },
      blockDiagram: {
        title: 'File Descriptor Limits Hierarchy',
        subtitle: 'Process limit (ulimit -n) vs Systemd (LimitNOFILE) vs System-wide (/proc/sys/fs/file-nr)',
        nodes: [
          { id: 'fd-proc-table', label: 'Process FD Table (ulimit -n)', simpleDef: 'Per-process file descriptor limit', techDef: 'Soft and hard limit (RLIMIT_NOFILE); defaults to 1024 without tuning', badge: 'ulimit -n', color: '#38bdf8' },
          { id: 'fd-systemd', label: 'systemd LimitNOFILE', simpleDef: 'Service unit override', techDef: 'Configured in [Service] section: LimitNOFILE=65536 or LimitNOFILE=infinity', badge: 'LimitNOFILE', color: '#10b981' },
          { id: 'fd-system-wide', label: 'System Limit (file-nr)', simpleDef: '/proc/sys/fs/file-nr', techDef: 'Kernel-wide maximum allocated file handles across all users and processes', badge: 'Kernel Max', color: '#06b6d4' },
          { id: 'fd-lsof', label: 'lsof Diagnostics', simpleDef: 'Lists all open files & sockets', techDef: 'Scans /proc/<PID>/fd to inspect socket types, filenames, and leaked connections', badge: 'lsof Forensics', color: '#f59e0b' },
        ],
      },
      terms: [
        { term: 'File Descriptor (FD)', simple: 'An integer index used by programs to talk to files, sockets, and pipes.', technical: 'An unsigned integer index into the per-process kernel file descriptor table pointing to an open file description.' },
        { term: 'Too Many Open Files (EMFILE)', simple: 'Error thrown when an app tries to open more files or sockets than ulimit permits.', technical: 'Errno 24: per-process file descriptor limit reached; further openat() or accept() calls fail.' },
        { term: 'lsof (List Open Files)', simple: 'Command that shows every file and network socket currently in use by processes.', technical: 'Inspects kernel data structures and /proc/<PID>/fd to list open file descriptors, network ports, and devices.' },
      ],
      whenToUse: [
        'Finding all failed services after reboot or upgrade: `systemctl --failed`',
        'Checking active file descriptor limits: `ulimit -n` or `cat /proc/<PID>/limits`',
        'Counting how many files/sockets a process currently has open: `lsof -p <PID> | wc -l`',
        'Checking if the entire server is near global file descriptor limits: `cat /proc/sys/fs/file-nr`',
      ],
      whenNotToUse: [
        'Avoid running `lsof` without `-p` or `-i` on busy servers; scanning all PIDs takes seconds of CPU time',
      ],
      syntaxCode: 'systemctl --failed\nulimit -n\ncat /proc/sys/fs/file-nr\nlsof -p <PID>\nlsof -i :80',
      syntaxTokens: [
        { token: 'systemctl --failed', role: 'Command', explanation: 'List units that are currently in a failed state' },
        { token: 'ulimit -n', role: 'Command & Flag', explanation: 'Display or set maximum open file descriptor limit' },
        { token: 'lsof -i :80', role: 'Flags', explanation: 'List processes holding open sockets on port 80' },
      ],
      variations: [
        { syntax: 'cat /proc/$PID/limits', title: 'Process Limits', whatItDoes: 'Displays exact runtime soft and hard limits for running process', whenToUse: 'Verifying if systemd applied LimitNOFILE' },
        { syntax: 'lsof +L1', title: 'Deleted Open Files', whatItDoes: 'Finds deleted files that still hold disk space because a process has them open', whenToUse: 'Triage when df shows disk full after rm' },
      ],
      internalFlow: [
        { step: 1, title: 'Process Calls openat() or accept()', desc: 'Process attempts to open a file or accept an incoming TCP socket', why: 'Requests new FD', techDetail: 'Kernel checks current FD count against task_struct->rlim[RLIMIT_NOFILE]' },
        { step: 2, title: 'Limit Violation & EMFILE', desc: 'If active FDs exceed soft limit, kernel rejects call and returns -EMFILE', why: 'Enforces ceiling', techDetail: 'Socket accept drops; client receives connection timeout or 502' },
        { step: 3, title: 'lsof Traverses /proc/<PID>/fd', desc: 'lsof reads symbolic links in /proc/<PID>/fd pointing to inode descriptors', why: 'Extracts telemetry', techDetail: 'Resolves socket:[inode] to local and remote IP:port endpoints' },
      ],
      sandbox: {
        initialCommands: ['# Check for any failed services and inspect active ulimit\nsystemctl --failed\nulimit -n'],
        guidedSteps: [
          { instruction: 'Check if any services are in a failed state', command: 'systemctl --failed', hint: 'Run systemctl --failed' },
          { instruction: 'Inspect the active open file descriptor limit', command: 'ulimit -n', hint: 'Run ulimit -n' },
          { instruction: 'Check system-wide allocated file descriptors', command: 'cat /proc/sys/fs/file-nr', hint: 'Read /proc/sys/fs/file-nr' },
        ],
        targetTask: 'Check for failed services and view file descriptor limits',
        solutionCommands: ['systemctl --failed', 'ulimit -n'],
      },
      commonMistakes: [
        { mistake: 'Editing /etc/security/limits.conf and expecting systemd services to use the new limit', whyWrong: 'systemd does not read PAM limits.conf; services started by systemd bypass limits.conf completely.', correctWay: 'Configure LimitNOFILE=65536 directly inside the systemd unit file [Service] section or /etc/systemd/system.conf.' },
        { mistake: 'Assuming "Too many open files" only applies to files on disk', whyWrong: 'Every incoming network socket, client TCP connection, and database query uses a file descriptor.', correctWay: 'Inspect network sockets using lsof -i or ss -s when troubleshooting EMFILE errors.' },
      ],
      challenge: {
        question: 'Why does an Nginx or Node.js server throw the error "Too many open files" when handling thousands of simultaneous web clients?',
        options: [
          { label: 'Because in Linux, every incoming network TCP connection socket consumes a file descriptor, hitting the per-process ulimit -n limit', isCorrect: true, explanation: 'Sockets are file descriptors; high connection counts exhaust default limits unless LimitNOFILE is increased.' },
          { label: 'Because the hard drive ran out of physical megabytes', isCorrect: false, explanation: 'EMFILE is a process descriptor table limit, not a physical disk storage error.' },
          { label: 'Because someone opened too many files in vim', isCorrect: false, explanation: 'The error is generated by the application process itself.' },
          { label: 'Because Linux only allows 10 web requests per second', isCorrect: false, explanation: 'Linux can handle millions of requests when tuned properly.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['systemctl --failed', 'ulimit -n', 'cat /proc/sys/fs/file-nr', 'lsof -p <PID>', 'lsof -i :<port>'],
        bestPractices: [
          'Add LimitNOFILE=65536 to all production systemd service files handling network traffic',
          'Use lsof +L1 to find deleted unlinked files that are preventing disk space from being reclaimed',
        ],
      },
    },
  ],
};
