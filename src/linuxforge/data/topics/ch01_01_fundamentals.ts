import { LinuxTopic } from '../unifiedLinuxData';

export const MODULE_01_FUNDAMENTALS: LinuxTopic = {
  id: 'ch01-01-fundamentals',
  number: '01.1',
  title: 'Linux Fundamentals',
  iconName: 'Terminal',
  description:
    'Core architecture of Linux: kernel vs operating system, Ring 0 vs Ring 3 CPU privilege rings, distribution package families, and root filesystem hierarchy (/etc, /var, /proc, /sys, /dev).',
  concepts: [
    {
      id: 'linux-architecture-distros',
      command: 'uname -a; cat /etc/os-release',
      title: 'What is Linux, Distributions & Kernel vs User Space',
      topicId: 'ch01-01-fundamentals',
      topicNumber: '01.1',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'Monolithic kernel execution, CPU privilege rings, and distribution families',
      badges: ['Foundations', 'Kernel', 'Architecture'],
      quote:
        'Linux is the monolithic kernel orchestrating hardware access, while the operating system encompasses GNU coreutils, system daemons, package managers, and user space runtimes.',
      difficulty: 'Beginner',
      whatIsIt:
        'Linux is an open-source, Unix-like monolithic kernel created by Linus Torvalds in 1991. The complete operating system pairs the Linux kernel with GNU utilities, systemd, and distribution-specific package managers (Debian/Ubuntu, RHEL/Fedora/Rocky, Arch, Alpine). Crucially, modern x86_64 CPUs enforce strict hardware privilege boundaries: User Space (Ring 3) where applications run safely, and Kernel Space (Ring 0) where the kernel controls physical RAM, CPU scheduling, and hardware drivers.',
      inSimpleWords:
        'Think of the Linux Kernel as the engine of a car and the Operating System as the entire car (including steering wheel, dashboard, and pedals). Programs you run cannot touch the engine directly; they must make formal requests called system calls (syscalls).',
      whyDoYouNeedIt:
        'Understanding user space vs kernel space is the single most important mental model in systems engineering. When your application crashes or runs out of memory, understanding who is responsible—the application process or the kernel scheduler/OOM killer—is essential for root-cause analysis.',
      realWorldAnalogy:
        'A restaurant where diners (User Space applications) cannot enter the kitchen (Kernel Space hardware). Diners must order through waiters (System Calls) who deliver food safely without diners burning down the kitchen.',
      withoutVsWith: {
        without: {
          title: 'Without Kernel/User Space Separation (DOS/Real Mode)',
          items: [
            'Any application bug can overwrite arbitrary memory, crashing the entire machine',
            'No hardware memory protection or process isolation',
            'Malicious software has direct, unrestricted access to disks and network cards',
          ],
          outcome: 'Single process freeze causes immediate blue screen or total system halt.',
        },
        with: {
          title: 'With Linux Ring 0/Ring 3 Hardware Isolation',
          items: [
            'User processes run in restricted virtual address spaces; segfaults terminate only that process',
            'All hardware I/O must pass through validated kernel system call interfaces',
            'Kernel enforces multi-tenancy, fair CPU scheduling, and access control',
          ],
          outcome: 'Rock-solid multi-user servers capable of years of uptime without rebooting.',
        },
      },
      blockDiagram: {
        title: 'Linux Operating System Architecture: Rings & Spaces',
        subtitle: 'Hardware isolation boundary between User Space (Ring 3) and Kernel Space (Ring 0)',
        nodes: [
          {
            id: 'n1',
            label: 'User Space (Ring 3)',
            simpleDef: 'Your applications, shells, and containers',
            techDef: 'Unprivileged execution mode without direct hardware I/O access',
            badge: 'Ring 3',
            color: '#38bdf8',
          },
          {
            id: 'n2',
            label: 'GNU C Library (glibc)',
            simpleDef: 'Standard API translation layer',
            techDef: 'Translates POSIX function calls into machine syscall instructions',
            badge: 'Syscall Wrapper',
            color: '#06b6d4',
          },
          {
            id: 'n3',
            label: 'Linux Kernel (Ring 0)',
            simpleDef: 'The brain managing memory, CPU, and drivers',
            techDef: 'Monolithic kernel: VFS, Memory Manager, Process Scheduler, Netfilter',
            badge: 'Ring 0',
            color: '#10b981',
          },
          {
            id: 'n4',
            label: 'Physical Hardware',
            simpleDef: 'CPU, RAM, Disks, NICs',
            techDef: 'Physical silicon, PCIe buses, storage controllers, and peripherals',
            badge: 'Hardware',
            color: '#f59e0b',
          },
        ],
      },
      terms: [
        {
          term: 'Kernel Space (Ring 0)',
          simple: 'The highest privilege CPU mode where the kernel has full access to hardware.',
          technical: 'Execution ring with unrestricted access to CPU instructions, MMU page tables, and I/O ports.',
        },
        {
          term: 'User Space (Ring 3)',
          simple: 'The protected sandbox where user applications run safely.',
          technical: 'Restricted CPU ring preventing direct hardware access; requires software interrupts (syscalls) for I/O.',
        },
        {
          term: 'Linux Distribution',
          simple: 'A packaged version of Linux including the kernel, package manager, and tools (e.g. Ubuntu, RHEL).',
          technical: 'A curated operating system distribution bundling the Linux kernel, GNU toolchain, systemd, and repositories.',
        },
      ],
      whenToUse: [
        'Checking kernel version and architecture (`uname -a`) before installing kernel modules or eBPF programs',
        'Detecting the Linux distribution family (`cat /etc/os-release`) in automated CI/CD provisioning scripts',
        'Debugging whether a crash is a user space segmentation fault or a kernel panic',
      ],
      whenNotToUse: [
        'Do not assume all Linux distros use the same paths; Debian uses `/etc/debian_version`, RHEL uses `/etc/redhat-release`',
      ],
      syntaxCode: 'uname -a\ncat /etc/os-release\ncat /proc/version',
      syntaxTokens: [
        { token: 'uname', role: 'Command', explanation: 'Print system information and kernel architecture' },
        { token: '-a', role: 'Flag', explanation: 'All: prints kernel name, network nodename, release, version, and machine' },
        { token: '/etc/os-release', role: 'Configuration', explanation: 'Standard freedesktop.org OS identification file' },
      ],
      variations: [
        { syntax: 'uname -r', title: 'Kernel Release', whatItDoes: 'Outputs exact kernel version string (e.g. 6.8.0-45-generic)', whenToUse: 'Verifying kernel compatibility' },
        { syntax: 'cat /etc/os-release', title: 'OS Identity', whatItDoes: 'Displays NAME, VERSION, ID, and ID_LIKE variables', whenToUse: 'Determining apt vs dnf vs apk in automation' },
        { syntax: 'hostnamectl', title: 'Host Overview', whatItDoes: 'Systemd overview of hostname, OS, kernel, and virtualization', whenToUse: 'Fast system audit' },
      ],
      internalFlow: [
        { step: 1, title: 'Process Issues uname()', desc: 'User space application invokes glibc uname() wrapper', why: 'Needs system metadata', techDetail: 'Places SYS_uname (syscall #63 on x86_64) into RAX register' },
        { step: 2, title: 'CPU Trap to Ring 0', desc: 'CPU executes `syscall` instruction, switching from Ring 3 to Ring 0', why: 'Privilege transition', techDetail: 'Saves user RIP and RSP, jumps to kernel entry point `entry_SYSCALL_64`' },
        { step: 3, title: 'Kernel Copies UTS Namespace', desc: 'Kernel retrieves `utsname` struct containing kernel release and hostname', why: 'Reads kernel memory safely', techDetail: 'Executes `copy_to_user()` to copy struct data into user space buffer' },
        { step: 4, title: 'Return to User Space', desc: 'Kernel executes `sysretq`, restoring Ring 3 CPU state', why: 'Resumes user process', techDetail: 'Process prints formatted string to stdout file descriptor (FD 1)' },
      ],
      sandbox: {
        initialCommands: ['# Check kernel release and operating system identification\nuname -a'],
        guidedSteps: [
          { instruction: 'Print the operating system release details', command: 'cat /etc/os-release', hint: 'Read the standard OS identification file in /etc' },
          { instruction: 'Inspect the running Linux kernel version', command: 'uname -r', hint: 'Use the -r flag with uname' },
        ],
        targetTask: 'Identify the active kernel release using uname -a',
        solutionCommands: ['uname -a'],
      },
      commonMistakes: [
        { mistake: 'Confusing Linux kernel with GNU/Linux distribution', whyWrong: 'The kernel is only the core hardware engine; distros supply userland packages and package managers.', correctWay: 'Understand that Ubuntu, Fedora, and Alpine share the same Linux kernel architecture but differ in libc and packaging.' },
        { mistake: 'Attempting to run kernel-space operations directly in user space', whyWrong: 'CPUs physically block user-space access to hardware I/O ports with General Protection Faults (#GP).', correctWay: 'Always use proper kernel APIs and system calls via glibc or POSIX interfaces.' },
      ],
      challenge: {
        question: 'Which CPU privilege ring does a standard user application execute in on modern Linux x86_64 systems?',
        options: [
          { label: 'Ring 0', isCorrect: false, explanation: 'Ring 0 is exclusively reserved for the privileged Linux Kernel.' },
          { label: 'Ring 3', isCorrect: true, explanation: 'User space applications run in unprivileged Ring 3, isolated from hardware.' },
          { label: 'Ring 1', isCorrect: false, explanation: 'Ring 1 is historically unused or used for hypervisor virtualization.' },
          { label: 'Ring 4', isCorrect: false, explanation: 'x86_64 architecture only defines privilege rings 0 through 3.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['uname -a', 'uname -r', 'cat /etc/os-release', 'hostnamectl'],
        bestPractices: [
          'Parse /etc/os-release using KEY=VALUE sourcing rather than brittle grep hacks',
          'Use uname -m to verify 64-bit (x86_64/aarch64) architecture before downloading binary assets',
        ],
      },
    },
    {
      id: 'linux-fhs-root-hierarchy',
      command: 'ls -la /; ls -l /etc /var /usr',
      title: 'Linux Filesystem Hierarchy Standard (FHS): /etc, /var, /home, /usr',
      topicId: 'ch01-01-fundamentals',
      topicNumber: '01.1',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'The single unified root tree structure: /etc, /var, /home, /usr, /opt, /tmp',
      badges: ['FHS', 'Storage', 'Filesystem'],
      quote:
        'In Unix and Linux, there are no drive letters (C:, D:). Everything stems from a single unified root directory (/).',
      difficulty: 'Beginner',
      whatIsIt:
        'The Filesystem Hierarchy Standard (FHS) defines the structure and purpose of every directory under root (`/`). Unlike Windows with separate drive letters, Linux mounts all physical drives, network shares, and virtual filesystems into a single unified inverted tree. Essential directories include: `/etc` (host-specific system configuration files), `/var` (variable data like runtime logs and spoolers), `/home` (personal user directories), `/usr` (user utilities, secondary read-only binaries and libraries), `/opt` (optional third-party software packages), and `/tmp` (ephemeral temporary storage cleared on reboot).',
      inSimpleWords:
        'Everything in Linux starts at `/` (the root). Configuration lives in `/etc`, logs and database data live in `/var`, your personal files live in `/home/<username>`, software binaries live in `/usr/bin`, and temporary junk goes into `/tmp`.',
      whyDoYouNeedIt:
        'Every DevOps engineer, SRE, and sysadmin must instantly know where configurations, logs, state files, and system binaries reside. Guessing paths wastes time during production outages.',
      realWorldAnalogy:
        'A corporate office building: `/etc` is the policy & rulebook room, `/var` is the active filing cabinet with changing papers, `/home` is individual employee desks, `/usr` is the common library of tools, and `/tmp` is the recycling bin.',
      withoutVsWith: {
        without: {
          title: 'Without Standardized Filesystem Hierarchy',
          items: [
            'Software packages dump configurations, data, and binaries randomly across disks',
            'System backups cannot isolate state (/var) from static software (/usr)',
            'Disaster recovery scripts fail because configuration locations are unpredictable',
          ],
          outcome: 'Unmaintainable server sprawl where software uninstall leaves orphan files everywhere.',
        },
        with: {
          title: 'With Filesystem Hierarchy Standard (FHS)',
          items: [
            'Predictable separation of static files (/usr) vs variable data (/var)',
            'Host-wide configs cleanly separated in /etc, safe to version-control',
            'Independent partitions can be mounted with specialized mount flags (e.g. noexec on /tmp)',
          ],
          outcome: 'Standardized layout across every Linux server, container, and cloud VM worldwide.',
        },
      },
      blockDiagram: {
        title: 'Linux Root Filesystem Hierarchy (FHS)',
        subtitle: 'The single unified tree branching from / into specialized functional directories',
        nodes: [
          { id: 'fhs-root', label: '/ (Root)', simpleDef: 'The top of the hierarchy', techDef: 'Mount point for root filesystem partition', badge: 'Root', color: '#38bdf8' },
          { id: 'fhs-etc', label: '/etc', simpleDef: 'Configuration files', techDef: 'Host-specific static system configurations (nginx, sshd, passwd)', badge: 'Config', color: '#06b6d4' },
          { id: 'fhs-var', label: '/var', simpleDef: 'Variable files & logs', techDef: 'Dynamic runtime data: /var/log, /var/lib/docker, /var/spool', badge: 'Variable Data', color: '#10b981' },
          { id: 'fhs-usr', label: '/usr', simpleDef: 'User binaries & libraries', techDef: 'Read-only secondary software hierarchy: /usr/bin, /usr/lib', badge: 'Binaries', color: '#8b5cf6' },
          { id: 'fhs-home', label: '/home', simpleDef: 'User personal files', techDef: 'User workspaces, personal settings, and SSH public/private keys', badge: 'User Data', color: '#f59e0b' },
          { id: 'fhs-tmp', label: '/tmp', simpleDef: 'Temporary scratch space', techDef: 'World-writable temporary files with sticky bit; cleared on boot', badge: 'Scratch Space', color: '#ef4444' },
        ],
      },
      terms: [
        { term: '/etc', simple: 'The central folder for system-wide configuration files.', technical: 'Contains editable configuration files; no binaries should ever be stored here.' },
        { term: '/var', simple: 'The folder for data that changes constantly, like logs and databases.', technical: 'Variable data directory storing spool directories, administrative and logging data, and runtime lock files.' },
        { term: '/usr', simple: 'User System Resources; where standard non-essential programs are installed.', technical: 'Secondary hierarchy for shareable, read-only data; contains user-facing commands (/usr/bin) and libraries (/usr/lib).' },
        { term: '/opt', simple: 'Where third-party standalone software packages are installed.', technical: 'Reserved for the installation of add-on application software packages (e.g. /opt/google/chrome).' },
      ],
      whenToUse: [
        'Finding and editing daemon configuration files in `/etc/nginx` or `/etc/ssh`',
        'Investigating server logs in `/var/log/messages`, `/var/log/syslog`, or `/var/log/journal`',
        'Placing multi-file third-party application bundles cleanly into `/opt/<app>`',
      ],
      whenNotToUse: [
        'Never store persistent application state in `/tmp`; it may be emptied on system reboot',
        'Never write application logs into `/etc`; `/etc` should remain strictly static config files',
      ],
      syntaxCode: 'ls -la /\nls -l /etc /var /home /usr /opt /tmp',
      syntaxTokens: [
        { token: 'ls', role: 'Command', explanation: 'List directory contents' },
        { token: '-la', role: 'Flags', explanation: 'Long format (-l) including hidden files (-a)' },
        { token: '/', role: 'Argument', explanation: 'Root directory of the unified filesystem' },
      ],
      variations: [
        { syntax: 'ls -la /', title: 'Root Inspection', whatItDoes: 'Displays all top-level directories and their permissions', whenToUse: 'Initial server orientation' },
        { syntax: 'df -h', title: 'Mount Overview', whatItDoes: 'Shows disk space and which physical drives are mounted to which FHS directories', whenToUse: 'Checking disk capacity per mount point' },
      ],
      internalFlow: [
        { step: 1, title: 'Kernel Mounts Rootfs', desc: 'During boot, the Linux kernel mounts the physical partition designated as root (/)', why: 'Establishes initial VFS root', techDetail: 'Mounts block device (e.g. /dev/nvme0n1p2) via ext4/xfs driver at VFS inode 2' },
        { step: 2, title: 'VFS Path Resolution', desc: 'VFS traverses dentry cache starting from root inode for path lookup', why: 'Resolves /etc or /var', techDetail: 'Checks path permissions and resolves directory entries to their respective inode numbers' },
        { step: 3, title: 'Mount Subsystem Bindings', desc: 'systemd mounts secondary filesystems (/home, /tmp) into designated tree positions', why: 'Populates FHS tree', techDetail: 'Executes mount operations specified in /etc/fstab' },
      ],
      sandbox: {
        initialCommands: ['# List all directories under the root filesystem\nls -la /'],
        guidedSteps: [
          { instruction: 'Inspect the root directory', command: 'ls -la /', hint: 'List root files' },
          { instruction: 'List the contents of /etc', command: 'ls /etc', hint: 'View system configs' },
          { instruction: 'List the contents of /var', command: 'ls /var', hint: 'View variable state' },
        ],
        targetTask: 'Explore the root directory structure using ls -la /',
        solutionCommands: ['ls -la /'],
      },
      commonMistakes: [
        { mistake: 'Writing persistent application databases to /tmp', whyWrong: '/tmp is mounted as tmpfs (RAM) on many modern distributions and is deleted upon system reboot.', correctWay: 'Store persistent data in /var/lib/<app> or dedicated mounted storage volumes.' },
        { mistake: 'Treating Linux paths with Windows backslashes (\\)', whyWrong: 'Linux strictly uses forward slashes (/) for path delimiters; backslashes are interpreted as escape characters.', correctWay: 'Always use forward slashes: /var/log/syslog.' },
      ],
      challenge: {
        question: 'Which Linux FHS directory is specifically designated for host-specific configuration files?',
        options: [
          { label: '/etc', isCorrect: true, explanation: '/etc contains all system-wide static configuration files.' },
          { label: '/var', isCorrect: false, explanation: '/var is designated for variable data like logs and caches.' },
          { label: '/usr', isCorrect: false, explanation: '/usr contains secondary binaries and shared libraries.' },
          { label: '/opt', isCorrect: false, explanation: '/opt is reserved for optional third-party software packages.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['ls -la /', 'ls -ld /etc', 'ls -lh /var/log', 'df -h'],
        bestPractices: [
          'Keep /etc under git version control (e.g. using etckeeper)',
          'Mount /var/log and /tmp on separate partitions to prevent rogue logs from filling the root partition',
        ],
      },
    },
    {
      id: 'linux-vfs-dev-proc-sys',
      command: 'cat /proc/meminfo; ls -l /dev /sys/class',
      title: 'Virtual & Device Filesystems: /proc, /sys & /dev',
      topicId: 'ch01-01-fundamentals',
      topicNumber: '01.1',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'Dynamic kernel interfaces and device nodes: procfs, sysfs, and devtmpfs',
      badges: ['Kernel', 'Virtual FS', 'Telemetry'],
      quote:
        'In Linux, everything is a file—even running processes, memory statistics, and physical hardware devices.',
      difficulty: 'Intermediate',
      whatIsIt:
        'Linux exposes kernel internal data structures and hardware devices as ordinary files and directories through three pseudo-filesystems: `/proc` (procfs: runtime process information and kernel statistics), `/sys` (sysfs: modern kernel device model, bus topology, and tunable parameters), and `/dev` (devtmpfs: device nodes representing physical and virtual hardware, like `/dev/sda` for disks, `/dev/null` for blackholes, and `/dev/urandom` for entropy). These files occupy 0 bytes on disk because they are dynamically synthesized in RAM by the kernel upon read/write.',
      inSimpleWords:
        'Files in `/proc`, `/sys`, and `/dev` do not actually exist on your hard drive! When you read `/proc/meminfo` or `/sys/class/net`, the Linux kernel generates that text on the fly directly from its internal memory.',
      whyDoYouNeedIt:
        'Every monitoring tool (Prometheus node_exporter, Datadog, `htop`, `free`, `iostat`) reads directly from `/proc` and `/sys`. Container runtimes (Docker, containerd) configure cgroups and namespaces directly through `/sys/fs/cgroup` and `/proc`.',
      realWorldAnalogy:
        'A car dashboard: speedometer gauges and diagnostic ports (OBD-II) do not store paper records; they display real-time sensor measurements directly from the engine computer.',
      withoutVsWith: {
        without: {
          title: 'Without Virtual Filesystems (Proprietary Opaque APIs)',
          items: [
            'Requires proprietary binary SDKs or complex binary drivers to inspect system memory and CPU state',
            'Standard text tools like cat, grep, and awk cannot inspect system telemetry',
            'No standard filesystem interface for tuning kernel parameters',
          ],
          outcome: 'Difficult observability and tight vendor lock-in.',
        },
        with: {
          title: 'With Linux /proc, /sys, and /dev Virtual Filesystems',
          items: [
            'Any shell command (cat, grep, awk) can read live kernel telemetry directly',
            'Sysadmins can tune kernel behaviors at runtime by writing text (echo 1 > /proc/sys/...)',
            'Unified Unix permission model applies to hardware devices and kernel internals',
          ],
          outcome: 'Universal transparency and infinite observability via standard Unix tools.',
        },
      },
      blockDiagram: {
        title: 'Virtual Filesystem Triad: /proc, /sys, /dev',
        subtitle: 'Dynamic in-memory pseudo-filesystems synthesized directly by the Linux kernel',
        nodes: [
          { id: 'vfs-proc', label: '/proc (procfs)', simpleDef: 'Process & memory telemetry', techDef: 'Per-PID directories (/proc/<PID>) + system metrics (/proc/meminfo, /proc/loadavg)', badge: 'procfs', color: '#06b6d4' },
          { id: 'vfs-sys', label: '/sys (sysfs)', simpleDef: 'Hardware & kernel subsystem tree', techDef: 'Unified device model: /sys/class/net, /sys/block, /sys/fs/cgroup', badge: 'sysfs', color: '#10b981' },
          { id: 'vfs-dev', label: '/dev (devtmpfs)', simpleDef: 'Device driver nodes', techDef: 'Block and character special files: /dev/sda, /dev/null, /dev/tty', badge: 'devtmpfs', color: '#f59e0b' },
          { id: 'vfs-kernel', label: 'Linux Kernel Core', simpleDef: 'Memory, CPU Scheduler, Drivers', techDef: 'Generates ASCII text payloads dynamically on read() system calls', badge: 'Ring 0', color: '#38bdf8' },
        ],
      },
      terms: [
        { term: '/proc', simple: 'A virtual folder providing live info about processes and system memory.', technical: 'Pseudo-filesystem (procfs) that provides an interface to kernel data structures rather than real disk files.' },
        { term: '/sys', simple: 'A virtual folder exposing devices, drivers, and kernel features.', technical: 'Pseudo-filesystem (sysfs) providing a clean hierarchical view of the kernel device model and cgroups.' },
        { term: '/dev', simple: 'Special files that represent physical and virtual hardware devices.', technical: 'Device filesystem (devtmpfs) populated with character (c) and block (b) device nodes with major/minor numbers.' },
        { term: '/dev/null', simple: 'The Linux black hole; discards all data written to it.', technical: 'Character device file that discards all written data and immediately returns EOF on read.' },
      ],
      whenToUse: [
        'Inspecting available system memory and swap usage (`cat /proc/meminfo`)',
        'Finding the command line of any running process (`cat /proc/<PID>/cmdline`)',
        'Redirecting unwanted command output to the void (`command > /dev/null 2>&1`)',
        'Tuning kernel parameters at runtime via `/proc/sys/` (or `sysctl`)',
      ],
      whenNotToUse: [
        'Never attempt to edit files in `/proc` or `/sys` with standard text editors like nano or vim; use `echo value > /path` or `sysctl`',
      ],
      syntaxCode: 'cat /proc/meminfo\ncat /proc/cpuinfo\nls -l /dev/null /dev/urandom\nls /sys/class/net',
      syntaxTokens: [
        { token: '/proc/meminfo', role: 'File', explanation: 'Detailed memory statistics generated live by kernel memory manager' },
        { token: '/proc/cpuinfo', role: 'File', explanation: 'Hardware specs of every logical CPU core detected' },
        { token: '/dev/null', role: 'Device Node', explanation: 'Character device (major 1, minor 3) that discards all inputs' },
      ],
      variations: [
        { syntax: 'cat /proc/loadavg', title: 'Load Averages', whatItDoes: 'Prints 1, 5, 15 minute system load averages and running tasks', whenToUse: 'Quick CPU saturation check' },
        { syntax: 'ls -l /proc/$$/fd', title: 'Current Process FDs', whatItDoes: 'Lists all open file descriptors for the current shell process', whenToUse: 'Troubleshooting file descriptor leaks' },
        { syntax: 'ls /sys/class/net', title: 'Network Interfaces', whatItDoes: 'Lists all active network device interfaces registered in the kernel', whenToUse: 'Hardware discovery' },
      ],
      internalFlow: [
        { step: 1, title: 'Process Calls open() on /proc', desc: 'Process opens /proc/meminfo for reading', why: 'Requests file access', techDetail: 'VFS recognizes procfs mount and delegates to procfs inode handlers' },
        { step: 2, title: 'Kernel Synthesizes ASCII Output', desc: 'Kernel memory manager queries internal page allocation counters', why: 'Generates live telemetry', techDetail: 'proc_meminfo_show() formats MemTotal, MemFree, Buffers into seq_file buffer' },
        { step: 3, title: 'Data Read into User Buffer', desc: 'Kernel copies formatted ASCII text into user process buffer', why: 'Satisfies read() call', techDetail: 'No disk I/O occurs; data generated strictly in RAM' },
      ],
      sandbox: {
        initialCommands: ['# Read kernel memory statistics\ncat /proc/meminfo | head -n 5'],
        guidedSteps: [
          { instruction: 'Inspect memory statistics in /proc', command: 'cat /proc/meminfo', hint: 'Read /proc/meminfo' },
          { instruction: 'Check system load averages', command: 'cat /proc/loadavg', hint: 'Read /proc/loadavg' },
          { instruction: 'List network devices in /sys', command: 'ls /sys/class/net', hint: 'Inspect /sys/class/net' },
        ],
        targetTask: 'Inspect live kernel memory info via /proc/meminfo',
        solutionCommands: ['cat /proc/meminfo'],
      },
      commonMistakes: [
        { mistake: 'Trying to measure disk space consumed by /proc with du', whyWrong: 'Files in /proc have zero size on disk; reading them causes du to query dynamic kernel interfaces unnecessarily.', correctWay: 'Understand that /proc and /sys reside purely in volatile RAM.' },
        { mistake: 'Backing up /proc, /sys, or /dev in tar archives', whyWrong: 'Archiving /proc can hang on infinite pseudo-streams or fill disks attempting to read /proc/kcore.', correctWay: 'Always exclude /proc, /sys, and /dev when generating filesystem backups.' },
      ],
      challenge: {
        question: 'Why do files in /proc and /sys report a size of 0 bytes when inspected with ls -l?',
        options: [
          { label: 'Because they are dynamic virtual files generated on-the-fly by the kernel in RAM', isCorrect: true, explanation: 'They have no physical blocks on disk; the kernel synthesizes their content upon read.' },
          { label: 'Because the files are corrupted or empty', isCorrect: false, explanation: 'They are fully functional virtual kernel interfaces.' },
          { label: 'Because user space does not have permissions to read their size', isCorrect: false, explanation: 'Their size is naturally 0 because no disk blocks are allocated.' },
          { label: 'Because systemd empties them every 10 seconds', isCorrect: false, explanation: 'systemd does not manage procfs or sysfs data generation.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['cat /proc/meminfo', 'cat /proc/cpuinfo', 'cat /proc/loadavg', 'ls -l /sys/class/net'],
        bestPractices: [
          'Use /dev/null for silencing noisy stdout/stderr in cron jobs: command > /dev/null 2>&1',
          'Use /proc/<PID>/status to inspect VmRSS and state of problematic processes',
        ],
      },
    },
  ],
};
