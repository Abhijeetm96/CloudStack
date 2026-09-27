import { LinuxTopic } from '../unifiedLinuxData';

export const TOPIC_01_03: LinuxTopic[] = [
  // =========================================================================
  // TOPIC 01: LINUX ARCHITECTURE, PHILOSOPHY & FILE HIERARCHY
  // =========================================================================
  {
    id: 'topic-01',
    number: '01',
    title: 'Linux Architecture & Philosophy',
    iconName: 'Cpu',
    description: 'Kernel vs User Space, UNIX philosophy, system call interface, and the Filesystem Hierarchy Standard.',
    concepts: [
      {
        id: 'c-unix-philosophy',
        command: 'uname -a',
        title: 'The UNIX Philosophy & Architecture',
        topicId: 'topic-01',
        topicNumber: '01',
        topicTitle: 'Linux Architecture & Philosophy',
        subtitle: 'Everything is a file, modular single-purpose tools, and the separation of kernel and user space.',
        badges: ['Beginner', 'Architecture', 'Kernel'],
        quote: 'Write programs that do one thing and do it well. Write programs to work together. Write programs to handle text streams.',
        difficulty: 'Beginner',
        whatIsIt: 'The foundational architectural paradigm of Linux: user applications run in an unprivileged Ring 3 CPU mode, issuing system calls (syscalls) to the privileged Ring 0 Linux Kernel, which coordinates physical hardware, memory, and devices.',
        inSimpleWords: 'Linux separates programs from the actual hardware. Your programs talk to the Linux Kernel through a strict set of phone calls called system calls. Everything in Linux—from text files to hard drives and network cards—is represented as a file.',
        whyDoYouNeedIt: 'Without understanding the kernel/user-space barrier, developers cannot reason about system performance, crashes, permissions, or container isolation.',
        realWorldAnalogy: 'A restaurant where diners (User Space applications) cannot enter the kitchen (Hardware). They must place orders through waiters (System Calls) who talk to the Head Chef (Linux Kernel).',
        withoutVsWith: {
          without: {
            title: 'WITHOUT KERNEL ISOLATION (Monolithic Unprotected Execution)',
            items: [
              'A crash in a web browser corrupts memory across the entire machine',
              'Malicious applications can directly overwrite disk sectors and network packets',
              'No standardized hardware abstraction layer across different CPU architectures',
              'No multi-tenant process scheduling or memory protection',
            ],
            outcome: '💥 Constant system freezes, blue screens, and zero security boundaries',
          },
          with: {
            title: 'WITH LINUX RING 0/3 ARCHITECTURE & SYSTEM CALLS',
            items: [
              'Protected Virtual Memory: crashing processes die cleanly without harming other apps',
              'Hardware Abstraction: code runs portably across x86, ARM, and RISC-V hardware',
              'Standardized POSIX syscall interface (open, read, write, fork, execve)',
              'Foundational security boundary enabling modern containers and sandboxes',
            ],
            outcome: '🛡️ Enterprise stability, bulletproof isolation, and multi-tenant security',
          },
        },
        blockDiagram: {
          title: 'Linux System Architecture Layers',
          subtitle: 'Click any architectural boundary to inspect CPU privilege levels and interaction paths:',
          nodes: [
            { id: 'user-apps', label: 'User Space Applications (Ring 3)', simpleDef: 'Your shell, browser, Nginx web server, and Python scripts.', techDef: 'Unprivileged x86 Ring 3 / ARM EL0 execution mode with virtual memory isolation.', badge: 'User Mode', color: '#38bdf8' },
            { id: 'glibc-syscall', label: 'GNU C Library & System Call Interface', simpleDef: 'The translation bridge turning programming requests into kernel system calls.', techDef: 'glibc wrapper invoking x86-64 syscall instruction (registers %rax, %rdi, %rsi).', badge: 'Syscall API', color: '#a855f7' },
            { id: 'kernel-space', label: 'Linux Kernel Space (Ring 0)', simpleDef: 'The master orchestrator managing CPU schedules, memory paging, and drivers.', techDef: 'Privileged Ring 0 kernel executing process scheduling (CFS), VFS, and memory management.', badge: 'Kernel Core', color: '#10b981' },
            { id: 'hardware-layer', label: 'Physical Hardware', simpleDef: 'Physical CPU cores, RAM DIMMs, NVMe disks, and network interfaces.', techDef: 'Underlying hardware accessed via kernel device drivers and memory-mapped I/O.', badge: 'Hardware', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'Kernel Space (Ring 0)', simple: 'The master core of the operating system with unrestricted hardware access.', technical: 'Highest CPU privilege level executing kernel code, handling hardware interrupts and page tables.', analogy: 'The air traffic control tower.' },
          { term: 'User Space (Ring 3)', simple: 'The safe sandbox where all your regular programs run.', technical: 'Restricted CPU execution ring with virtual memory address translation enforcing process isolation.', analogy: 'The passenger cabin of an airplane.' },
          { term: 'System Call (Syscall)', simple: 'The official request a program makes when it needs kernel services like reading a file.', technical: 'A software interrupt or CPU instruction (e.g. syscall) triggering transition from user to kernel mode.', analogy: 'Calling room service in a hotel.' },
        ],
        whenToUse: [
          '✓ When verifying system architecture, kernel version, and CPU architecture',
          '✓ When debugging performance issues and evaluating whether overhead is in user space or kernel space',
          '✓ When compiling native drivers or kernel modules',
        ],
        whenNotToUse: [
          '✕ When looking for distribution version details (use /etc/os-release instead of uname)',
        ],
        syntaxCode: 'uname -a',
        syntaxTokens: [
          { token: 'uname', role: 'Binary', explanation: 'Print system information utility.' },
          { token: '-a', role: 'Flag', explanation: 'All: prints kernel name, network nodename, kernel release, kernel version, machine architecture.' },
        ],
        variations: [
          { syntax: 'uname -r', title: 'Kernel Release Only', whatItDoes: 'Prints exact kernel release version (e.g. 6.8.0-45-generic).', whenToUse: 'Checking compatibility with kernel headers and eBPF tools.' },
          { syntax: 'uname -m', title: 'Machine Architecture', whatItDoes: 'Prints hardware architecture (x86_64 or aarch64).', whenToUse: 'Downloading architecture-specific binary releases.' },
          { syntax: 'cat /etc/os-release', title: 'Distribution Identity', whatItDoes: 'Displays Linux distribution name, version ID, and codename.', whenToUse: 'Writing cross-distro automation scripts.' },
        ],
        internalFlow: [
          { step: 1, title: 'Shell Resolves Binary', desc: 'Shell searches $PATH and finds /usr/bin/uname.', why: 'Locates executable binary on disk.', techDetail: 'execve("/usr/bin/uname", ["uname", "-a"], environ)' },
          { step: 2, title: 'Uname Issues uname() Syscall', desc: 'The uname program invokes the uname() system call.', why: 'Queries kernel data structures for system metrics.', techDetail: 'System call number 63 on x86_64, passing struct utsname buffer' },
          { step: 3, title: 'Kernel Reads utsname Structure', desc: 'Kernel populates struct with sysname, nodename, release, version, and machine.', why: 'Retrieves active kernel boot parameters.', techDetail: 'Kernel reads utsname() static table in kernel data segment' },
          { step: 4, title: 'Output Written to stdout', desc: 'Program formats string and writes to file descriptor 1.', why: 'Displays kernel information on terminal screen.', techDetail: 'write(1, "Linux dev-box 6.8.0-generic ...\n", length)' },
        ],
        sandbox: {
          initialCommands: ['uname -a', 'cat /etc/os-release'],
          guidedSteps: [
            { instruction: 'Print complete system and kernel information', command: 'uname -a', hint: 'Run uname -a' },
            { instruction: 'Inspect the Linux distribution release details', command: 'cat /etc/os-release', hint: 'Run cat /etc/os-release' },
          ],
          targetTask: 'Verify kernel version and host distribution details.',
          solutionCommands: ['uname -a', 'cat /etc/os-release'],
        },
        commonMistakes: [
          { mistake: 'Confusing the Linux Kernel version with the Distribution release version.', whyWrong: 'Ubuntu 24.04 and Debian 12 can both run Linux kernel 6.8, but have different packages.', correctWay: 'Use uname -r for kernel version; use cat /etc/os-release for distro version.' },
          { mistake: 'Thinking user applications can talk directly to NVMe SSDs or network cards.', whyWrong: 'Direct hardware access is forbidden in user space Ring 3 for security and stability.', correctWay: 'Always issue system calls via libraries or standard streams.' },
        ],
        challenge: {
          question: 'What is the primary difference between Linux Kernel Space (Ring 0) and User Space (Ring 3)?',
          options: [
            { label: 'Kernel Space has unrestricted hardware access; User Space runs in isolated virtual memory with restricted CPU privileges', isCorrect: true, explanation: 'Correct! Ring 0 executes the privileged kernel, while Ring 3 isolates user applications.' },
            { label: 'User space is only for desktop GUI apps; Kernel space is for server CLI tools', isCorrect: false, explanation: 'Incorrect. Both GUI and CLI applications run in User Space.' },
            { label: 'Kernel space only exists on physical bare-metal servers, not in the cloud', isCorrect: false, explanation: 'Incorrect. Every Linux system, VM, or bare-metal host has a kernel.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://kernel.org/doc/html/latest/',
          syntaxCheatSheet: [
            'uname -a              # Print all kernel and system architecture metrics',
            'uname -r              # Kernel release version (e.g. 6.8.0)',
            'uname -m              # Machine architecture (x86_64, aarch64)',
            'cat /etc/os-release   # Linux distribution details and version ID',
          ],
          bestPractices: [
            'Always verify kernel release with uname -r before building kernel modules or compiling eBPF probes.',
            'Use standard system calls rather than building bespoke hardware wrappers.',
          ],
        },
      },
      {
        id: 'c-fhs-hierarchy',
        command: 'ls -la /',
        title: 'Filesystem Hierarchy Standard (FHS)',
        topicId: 'topic-01',
        topicNumber: '01',
        topicTitle: 'Linux Architecture & Philosophy',
        subtitle: 'The universal directory blueprint: /bin, /etc, /var, /home, /proc, /sys, /dev, and /tmp.',
        badges: ['Beginner', 'Filesystem', 'FHS'],
        quote: 'Unlike Windows drive letters (C:, D:), Linux organizes all physical and virtual resources under a single root directory tree (/).',
        difficulty: 'Beginner',
        whatIsIt: 'The Filesystem Hierarchy Standard (FHS) defines the canonical directory structure and contents in Linux systems. Everything stems from the single root directory `/`, unifying configuration, binaries, dynamic states, and virtual kernel interfaces.',
        inSimpleWords: 'In Windows, every drive has its own letter like C: or D:. In Linux, there is only one tree that starts at `/`. Even if you plug in 10 different hard drives, they are all attached inside folders under `/` (like `/mnt` or `/media`).',
        whyDoYouNeedIt: 'Knowing where files live prevents catastrophic mistakes (like putting logs in `/etc` or binaries in `/tmp`) and allows developers to locate configurations and logs instantly on any server.',
        realWorldAnalogy: 'A standardized city blueprint where every city places government offices in City Hall (/etc), public trash cans on corners (/tmp), libraries on Main Street (/usr/lib), and dynamic water meters in the basement (/var).',
        withoutVsWith: {
          without: {
            title: 'WITHOUT FHS DIRECTORY STANDARDS',
            items: [
              'Every application puts config files, database data, and logs wherever it wants',
              'System updates overwrite customized configuration files',
              'Backing up system configuration requires scanning thousands of random folders',
              'Security tools cannot isolate temporary writable folders from system binaries',
            ],
            outcome: '🍝 Total chaotic folder sprawl and broken server migrations',
          },
          with: {
            title: 'WITH STANDARDIZED FHS LAYOUT',
            items: [
              '/etc: 100% dedicated to host-specific configuration files',
              '/var: Dedicated to variable runtime data, caches, and logs',
              '/bin & /usr/bin: System executable binaries',
              '/proc & /sys: Virtual filesystems exposing live kernel metrics',
            ],
            outcome: '🗺️ Predictable server administration, clean backups, and reliable automation',
          },
        },
        blockDiagram: {
          title: 'Linux Root Directory (FHS) Anatomy',
          subtitle: 'Click any canonical top-level directory to inspect its strict purpose:',
          nodes: [
            { id: 'fhs-etc', label: '/etc (Configuration)', simpleDef: 'All configuration files for the system and installed services.', techDef: 'Host-specific, static configuration files. No binaries are stored here.', badge: 'Config', color: '#38bdf8' },
            { id: 'fhs-var', label: '/var (Variable Data)', simpleDef: 'Files that change frequently like database files and server logs.', techDef: 'Variable data: spool directories, administrative and logging data (/var/log).', badge: 'Dynamic', color: '#10b981' },
            { id: 'fhs-usr', label: '/usr & /bin (Binaries & Libraries)', simpleDef: 'Executable programs, shared libraries, and documentation.', techDef: 'User system resources; /bin is typically symlinked to /usr/bin on modern distros.', badge: 'Binaries', color: '#a855f7' },
            { id: 'fhs-proc-sys', label: '/proc & /sys (Virtual Kernel Trees)', simpleDef: 'Virtual folders representing live processes and kernel hardware settings.', techDef: 'procfs and sysfs: RAM-backed pseudo-filesystems exposing kernel internals.', badge: 'Virtual', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: '/etc', simple: 'The system settings folder.', technical: 'Host-specific system configuration files (e.g. /etc/passwd, /etc/hosts).', analogy: 'The control panel of a machine.' },
          { term: '/var/log', simple: 'The centralized diary where all system and app logs are written.', technical: 'Directory where system services write diagnostic event logs.', analogy: 'The flight recorder black box.' },
          { term: '/tmp', simple: 'Temporary scratchpad folder wiped on reboot.', technical: 'Temporary file repository, often mounted as tmpfs (in-memory RAM).', analogy: 'A whiteboard erased at the end of the day.' },
        ],
        whenToUse: [
          '✓ When locating service configuration files (/etc/nginx, /etc/ssh)',
          '✓ When checking system log files (/var/log/syslog, /var/log/messages)',
          '✓ When mounting external storage volumes (/mnt, /media)',
        ],
        whenNotToUse: [
          '✕ Never store persistent application data in /tmp (it can be erased on reboot or disk pressure)',
        ],
        syntaxCode: 'ls -la /',
        syntaxTokens: [
          { token: 'ls', role: 'Command', explanation: 'List directory contents.' },
          { token: '-l', role: 'Flag', explanation: 'Long format: shows permissions, owner, group, size, date.' },
          { token: '-a', role: 'Flag', explanation: 'All: includes hidden entries starting with a dot.' },
          { token: '/', role: 'Target', explanation: 'The root filesystem directory.' },
        ],
        variations: [
          { syntax: 'ls -l /etc', title: 'Inspect Configurations', whatItDoes: 'Lists configuration files and service directories.', whenToUse: 'Auditing installed server configurations.' },
          { syntax: 'ls -l /var/log', title: 'Inspect System Logs', whatItDoes: 'Displays service log files.', whenToUse: 'Investigating server incidents or service crashes.' },
          { syntax: 'df -h /', title: 'Root Disk Space', whatItDoes: 'Shows disk capacity and usage of the root filesystem partition.', whenToUse: 'Preventing disk full outages.' },
        ],
        internalFlow: [
          { step: 1, title: 'VFS Path Resolution', desc: 'Virtual Filesystem (VFS) receives request for path "/".', why: 'Resolves the root inode (inode number 2 on ext4/xfs).', techDetail: 'Kernel traverses superblock to mount root inode' },
          { step: 2, title: 'Read Directory Entries', desc: 'VFS reads directory blocks for inode 2.', why: 'Gathers directory entry list (dentry cache).', techDetail: 'Issues getdents64() system call to read dirent structures' },
          { step: 3, title: 'Stat Metadata Extraction', desc: 'Iterates through each dentry and fetches metadata (permissions, owner, size).', why: 'Populates long listing display columns.', techDetail: 'Invokes newfstatat() syscall for each child entry' },
          { step: 4, title: 'Format & Terminal Print', desc: 'Sorts entries alphabetically and prints formatted text to stdout.', why: 'Displays directory listing to user.', techDetail: 'Writes formatted buffer to stdout' },
        ],
        sandbox: {
          initialCommands: ['ls -la /', 'ls -ld /etc /var /tmp /home'],
          guidedSteps: [
            { instruction: 'Inspect the root directory tree', command: 'ls -la /', hint: 'Run ls -la /' },
            { instruction: 'Verify permissions of canonical FHS directories', command: 'ls -ld /etc /var /tmp /home', hint: 'Run ls -ld /etc /var /tmp /home' },
          ],
          targetTask: 'Explore canonical FHS directories and verify root filesystem layout.',
          solutionCommands: ['ls -la /', 'ls -ld /etc /var /tmp /home'],
        },
        commonMistakes: [
          { mistake: 'Storing persistent production files or certificates in /tmp.', whyWrong: 'Linux distributions wipe /tmp upon system reboot, and systemd-tmpfiles cleans old files periodically.', correctWay: 'Store persistent data in /var/lib or dedicated mount points in /srv or /opt.' },
          { mistake: 'Modifying files directly in /usr/bin instead of using package managers.', whyWrong: 'Package updates (apt, dnf) will overwrite your manual edits without warning.', correctWay: 'Place custom local scripts in /usr/local/bin.' },
        ],
        challenge: {
          question: 'Which Linux directory is strictly designated for host-specific configuration files?',
          options: [
            { label: '/etc', isCorrect: true, explanation: 'Correct! /etc is reserved strictly for configuration files.' },
            { label: '/var', isCorrect: false, explanation: 'Incorrect. /var is for variable dynamic data like logs and spool files.' },
            { label: '/bin', isCorrect: false, explanation: 'Incorrect. /bin is for essential executable command binaries.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html',
          syntaxCheatSheet: [
            'ls -la /              # Inspect the root directory structure',
            'ls -ld /tmp           # Check permissions of /tmp (should have sticky bit: drwxrwxrwt)',
            'cat /etc/fstab        # View filesystem mount table',
          ],
          bestPractices: [
            'Keep /etc strictly under Git version control (e.g. using etckeeper) to track server configuration drift.',
            'Separate /var and /home onto distinct partitions or volumes to prevent a runaway log file from filling the root filesystem.',
          ],
        },
      },
      {
        id: 'c-linux-distros',
        command: 'cat /etc/os-release',
        title: 'Distributions & Package Ecosystems',
        topicId: 'topic-01',
        topicNumber: '01',
        topicTitle: 'Linux Architecture & Philosophy',
        subtitle: 'Debian/Ubuntu (.deb) vs Red Hat/Fedora (.rpm) vs Alpine (apk) and release cadences.',
        badges: ['Beginner', 'Distributions', 'Ecosystems'],
        quote: 'Linux is the kernel; the distribution (distro) is the complete operating system bundled with tools, libraries, and package managers.',
        difficulty: 'Beginner',
        whatIsIt: 'A Linux Distribution (distro) combines the Linux kernel with GNU core utilities, package managers, default systemd services, and application repositories. The three major server families are Debian (Ubuntu), Red Hat (RHEL/Fedora/Rocky), and Alpine Linux.',
        inSimpleWords: 'The Linux kernel is like an automobile engine. A distribution is the complete car built around it. Ubuntu is like a family sedan with power steering, Red Hat is an enterprise truck with commercial support, and Alpine is an ultra-lightweight go-kart used in Docker containers.',
        whyDoYouNeedIt: 'Cloud engineers must work across multiple Linux distributions in production, knowing which package manager to use and how security updates are distributed.',
        realWorldAnalogy: 'Different versions of Android (Samsung OneUI vs Google Pixel): they all run the Android kernel underneath, but the user interface, pre-installed apps, and update stores differ.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT DISTRIBUTIONS (Compiling Everything from Scratch)',
            items: [
              'Must compile Linux kernel, glibc, shell, and compilers by hand',
              'No dependency management: installing one library requires hunting down 20 dependencies',
              'No automated security patches or vulnerability notifications',
              'Every server has a bespoke, irreproducible software combination',
            ],
            outcome: '⏳ Weeks wasted building basic tools and zero security patching',
          },
          with: {
            title: 'WITH STANDARDIZED ENTERPRISE DISTRIBUTIONS',
            items: [
              'Battle-tested binary packages with cryptographic signatures',
              'Automated dependency resolution (apt, dnf, apk)',
              'Predictable LTS (Long Term Support) security patch cycles (e.g. 5-10 years)',
              'Massive community support and pre-compiled software repositories',
            ],
            outcome: '⚡ Deploy complete production servers in seconds with verified security',
          },
        },
        blockDiagram: {
          title: 'Major Linux Distribution Families',
          subtitle: 'Click any distribution lineage to inspect package management and target environments:',
          nodes: [
            { id: 'distro-debian', label: 'Debian / Ubuntu Family', simpleDef: 'The most popular cloud and developer distro using apt and .deb packages.', techDef: 'Debian upstream with Ubuntu LTS releases; apt package manager, debconf, dpkg.', badge: 'apt / .deb', color: '#e11d48' },
            { id: 'distro-rhel', label: 'Red Hat Enterprise (RHEL / Rocky / Fedora)', simpleDef: 'Enterprise standard with commercial support and SELinux security policies.', techDef: 'RPM ecosystem using dnf/yum, strict SELinux mandatory access control policies.', badge: 'dnf / .rpm', color: '#38bdf8' },
            { id: 'distro-alpine', label: 'Alpine Linux (Container Standard)', simpleDef: 'Ultra-lightweight 5MB Linux distro used inside Docker images.', techDef: 'musl libc and busybox coreutils with apk package manager for tiny footprint.', badge: 'apk / musl', color: '#10b981' },
            { id: 'distro-arch', label: 'Arch Linux (Rolling Release)', simpleDef: 'Bleeding-edge rolling release distro beloved by power users.', techDef: 'Rolling release model with pacman and the Arch User Repository (AUR).', badge: 'pacman', color: '#a855f7' },
          ],
        },
        terms: [
          { term: 'LTS (Long Term Support)', simple: 'A version of Linux guaranteed to receive security updates for 5 or more years.', technical: 'Enterprise release branch maintaining ABI stability and backporting security CVE fixes.', analogy: 'A warranty guarantee for your car.' },
          { term: 'glibc vs musl', simple: 'The fundamental C library that all programs use to talk to the kernel.', technical: 'GNU C library (feature-rich, used in Ubuntu/RHEL) vs musl libc (minimalist, used in Alpine).', analogy: 'A full dictionary vs a pocket phrasebook.' },
          { term: 'Package Manager', simple: 'The app store for Linux (apt, dnf, apk).', technical: 'Software utility that automates package installation, dependency resolution, and signature verification.', analogy: 'An automated grocery delivery service.' },
        ],
        whenToUse: [
          '✓ When automating provisioning scripts that must adapt commands to Debian or RHEL',
          '✓ When choosing the base image for Docker containers (Alpine vs Ubuntu vs Distroless)',
          '✓ When verifying system compliance with enterprise security requirements',
        ],
        whenNotToUse: [
          '✕ Never run apt commands on RHEL/CentOS systems (use dnf/yum)',
        ],
        syntaxCode: 'cat /etc/os-release',
        syntaxTokens: [
          { token: 'cat', role: 'Command', explanation: 'Concatenate and print files.' },
          { token: '/etc/os-release', role: 'Target File', explanation: 'Standardized FHS file containing operating system identification data.' },
        ],
        variations: [
          { syntax: 'hostnamectl', title: 'System & Distro Overview', whatItDoes: 'Displays hostname, OS name, kernel, and hardware architecture.', whenToUse: 'Quick check of system properties via systemd.' },
          { syntax: 'lsb_release -a', title: 'LSB Info', whatItDoes: 'Prints Linux Standard Base distribution and release codename.', whenToUse: 'Legacy scripts requiring release codenames (e.g. jammy, bookworm).' },
        ],
        internalFlow: [
          { step: 1, title: 'Read /etc/os-release', desc: 'Application opens the key-value text file /etc/os-release.', why: 'Reads standardized metadata defined by systemd specification.', techDetail: 'openat(AT_FDCWD, "/etc/os-release", O_RDONLY)' },
          { step: 2, title: 'Parse Key-Value Pairs', desc: 'Parses NAME, VERSION, ID, and ID_LIKE variables.', why: 'Identifies distro family (e.g. ID_LIKE="rhel fedora").', techDetail: 'Parses key="value" string tokens into memory' },
          { step: 3, title: 'Script Conditionals', desc: 'Shell script branches based on detected ID.', why: 'Executes apt on Debian/Ubuntu, dnf on RHEL, or apk on Alpine.', techDetail: 'Shell evaluates if [ "$ID" = "ubuntu" ]' },
        ],
        sandbox: {
          initialCommands: ['cat /etc/os-release', 'uname -r'],
          guidedSteps: [
            { instruction: 'Examine host operating system identification file', command: 'cat /etc/os-release', hint: 'Run cat /etc/os-release' },
            { instruction: 'Verify the active kernel version', command: 'uname -r', hint: 'Run uname -r' },
          ],
          targetTask: 'Detect Linux distribution family and release metadata.',
          solutionCommands: ['cat /etc/os-release', 'uname -r'],
        },
        commonMistakes: [
          { mistake: 'Assuming all Linux distros use glibc.', whyWrong: 'Alpine Linux uses musl libc, which can cause missing symbol errors when running pre-compiled C/Go binaries built for glibc.', correctWay: 'Compile statically (CGO_ENABLED=0) or use gcompat when running glibc binaries on Alpine.' },
          { mistake: 'Hardcoding Debian/Ubuntu package names or service paths in automation scripts intended for Red Hat/CentOS/Fedora.', whyWrong: 'Distros name packages differently (e.g. `apache2` on Ubuntu vs `httpd` on RHEL, or `openssl-devel` vs `libssl-dev`).', correctWay: 'Inspect `/etc/os-release` dynamically or use cross-platform configuration managers (Ansible) with distro-conditional variable definitions.' },
        ],
        challenge: {
          question: 'Which lightweight C library is used in Alpine Linux containers instead of GNU glibc?',
          options: [
            { label: 'musl libc', isCorrect: true, explanation: 'Correct! Alpine Linux uses musl libc for minimal size and security.' },
            { label: 'uClibc', isCorrect: false, explanation: 'Incorrect. uClibc is mostly used in embedded routers.' },
            { label: 'Bionic', isCorrect: false, explanation: 'Incorrect. Bionic is the C library used in Android.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://www.freedesktop.org/software/systemd/man/os-release.html',
          syntaxCheatSheet: [
            'cat /etc/os-release   # Universal standard distro identity file',
            'hostnamectl          # Systemd system and OS status',
          ],
          bestPractices: [
            'In multi-distro bash scripts, source /etc/os-release and check $ID or $ID_LIKE to branch package manager calls safely.',
          ],
        },
      },
    ],
  },

  // =========================================================================
  // TOPIC 02: ESSENTIAL SHELL & TERMINAL NAVIGATION
  // =========================================================================
  {
    id: 'topic-02',
    number: '02',
    title: 'Essential Shell & Navigation',
    iconName: 'Terminal',
    description: 'Mastering directory traversal, file manipulation, and terminal text inspection tools.',
    concepts: [
      {
        id: 'c-navigating-filesystem',
        command: 'ls -lah',
        title: 'Navigating the Filesystem',
        topicId: 'topic-02',
        topicNumber: '02',
        topicTitle: 'Essential Shell & Navigation',
        subtitle: 'Mastering pwd, cd, and detailed listing with ls flags (-l, -a, -h, -t, -S).',
        badges: ['Beginner', 'CLI', 'Navigation'],
        quote: 'Your terminal cursor is an explorer standing at a specific coordinate in the filesystem tree.',
        difficulty: 'Beginner',
        whatIsIt: 'The fundamental commands to orient yourself (`pwd`), change location (`cd`), and inspect directory contents (`ls`) with human-readable sizes, timestamps, and hidden files.',
        inSimpleWords: '`pwd` tells you "Where am I right now?". `cd` moves you to a different folder. `ls -lah` shows you everything inside the folder with readable file sizes (like 12MB instead of 12582912 bytes).',
        whyDoYouNeedIt: 'Every single operation in Linux begins with knowing where you are and what files exist in your working directory.',
        realWorldAnalogy: 'GPS coordinates on your phone. `pwd` displays your current latitude/longitude; `cd` walks you down the street; `ls` opens your eyes to see the buildings around you.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT NAVIGATION MASTERY',
            items: [
              'Running commands in the wrong directory and modifying the wrong files',
              'Missing hidden dotfiles like .env, .git, and .bashrc',
              'Confusing relative paths (app/config) with absolute paths (/app/config)',
              'Getting stuck in deeply nested directory hierarchies',
            ],
            outcome: '💥 Accidental file deletion and confusion in deployment scripts',
          },
          with: {
            title: 'WITH SHELL NAVIGATION MASTERY',
            items: [
              'pwd prints current absolute working directory immediately',
              'cd - jumps instantly back to the previous working directory',
              'cd ~ jumps straight to your personal user home folder',
              'ls -lah reveals hidden dotfiles and human-readable sizes',
            ],
            outcome: '⚡ Lightning-fast directory movement and 100% path confidence',
          },
        },
        blockDiagram: {
          title: 'Linux Path Traversal Anatomy',
          subtitle: 'Click any path component to inspect absolute vs relative resolution:',
          nodes: [
            { id: 'path-root', label: 'Root Directory (/)', simpleDef: 'The top of the entire Linux filesystem.', techDef: 'Root inode from which all absolute paths originate.', badge: 'Absolute', color: '#38bdf8' },
            { id: 'path-home', label: 'Home Directory (~ or /home/user)', simpleDef: 'Your personal folder where you have full read/write permissions.', techDef: 'User directory referenced by $HOME environment variable.', badge: 'User Home', color: '#10b981' },
            { id: 'path-dot', label: 'Current Directory (.) & Parent (..)', simpleDef: '. means here; .. means the folder above.', techDef: 'Special hardlink entries present in every directory pointing to self and parent.', badge: 'Relative', color: '#a855f7' },
            { id: 'path-pwd', label: 'Working Directory Pointer (pwd)', simpleDef: 'The directory your terminal is currently positioned inside.', techDef: 'Per-process current working directory (cwd) stored in task_struct.', badge: 'Process State', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'Absolute Path', simple: 'A path starting from the very top root (/etc/nginx/nginx.conf).', technical: 'Complete path starting with a leading slash (/), resolved from root inode.', analogy: 'A full mailing address including Country, State, and Zip code.' },
          { term: 'Relative Path', simple: 'A path starting from where you are right now (./config.json).', technical: 'Path without leading slash, resolved relative to process current working directory (cwd).', analogy: 'Directions like "turn left at the next traffic light".' },
          { term: 'Hidden Dotfiles', simple: 'Files starting with a dot (like .env or .bashrc) that ls hides by default.', technical: 'Files beginning with ASCII period (.) filtered out by readdir unless -a flag is supplied.', analogy: 'Files placed in a locked drawer.' },
        ],
        whenToUse: [
          '✓ When verifying your exact directory location before running destructive commands (rm -rf)',
          '✓ When viewing hidden configuration files (.git, .env, .ssh)',
          '✓ When checking file sizes in human-readable megabytes and gigabytes',
        ],
        whenNotToUse: [
          '✕ Never run ls in shell scripts to parse filenames (use globbing or find instead)',
        ],
        syntaxCode: 'ls -lah',
        syntaxTokens: [
          { token: 'ls', role: 'Command', explanation: 'List directory entries.' },
          { token: '-l', role: 'Flag', explanation: 'Long listing format.' },
          { token: '-a', role: 'Flag', explanation: 'All entries including hidden dotfiles.' },
          { token: '-h', role: 'Flag', explanation: 'Human-readable sizes (K, M, G).' },
        ],
        variations: [
          { syntax: 'pwd', title: 'Print Working Directory', whatItDoes: 'Outputs full absolute path of the current directory.', whenToUse: 'Verifying location before operations.' },
          { syntax: 'cd -', title: 'Jump to Previous Directory', whatItDoes: 'Switches back to $OLDPWD.', whenToUse: 'Bouncing back and forth between two directories.' },
          { syntax: 'ls -lt', title: 'Sort by Modified Time', whatItDoes: 'Lists newest files first.', whenToUse: 'Finding the latest generated log or build artifact.' },
        ],
        internalFlow: [
          { step: 1, title: 'Fetch Process CWD', desc: 'pwd reads current working directory from process state.', why: 'Displays path to user.', techDetail: 'getcwd() system call returns path buffer' },
          { step: 2, title: 'Open Directory Stream', desc: 'ls issues opendir() syscall for target path.', why: 'Prepares directory reading.', techDetail: 'Kernel allocates file descriptor pointing to directory' },
          { step: 3, title: 'Read Directory Entries', desc: 'Loops getdents64() fetching file names and inode numbers.', why: 'Enumerates directory contents.', techDetail: 'Pulls struct linux_dirent64 records' },
          { step: 4, title: 'Stat Each File', desc: 'Invokes fstatat() to fetch sizes, timestamps, and permission bits.', why: 'Populates human-readable long listing.', techDetail: 'Formats output buffer with color escape codes' },
        ],
        sandbox: {
          initialCommands: ['pwd', 'ls -lah', 'cd /var/log && pwd && cd -'],
          guidedSteps: [
            { instruction: 'Print current working directory', command: 'pwd', hint: 'Run pwd' },
            { instruction: 'List files including hidden entries with human-readable sizes', command: 'ls -lah', hint: 'Run ls -lah' },
            { instruction: 'Switch to /var/log and quickly return using cd -', command: 'cd /var/log && pwd && cd -', hint: 'Run cd /var/log && pwd && cd -' },
          ],
          targetTask: 'Navigate the filesystem and inspect directory entries.',
          solutionCommands: ['pwd', 'ls -lah', 'cd /var/log && pwd && cd -'],
        },
        commonMistakes: [
          { mistake: 'Forgetting that dotfiles (.bashrc, .env) are hidden from default "ls".', whyWrong: 'Developers think their files are missing when they just forgot the -a flag.', correctWay: 'Always use ls -la to view all files.' },
          { mistake: 'Typing "cd /home" instead of "cd ~" when trying to go to personal user home.', whyWrong: '/home is the parent folder holding all user directories; ~ is your specific user directory.', correctWay: 'Use "cd ~" or just "cd" with no arguments to jump to home.' },
        ],
        challenge: {
          question: 'How do you instantly jump back to your previous working directory in Linux shell?',
          options: [
            { label: 'cd -', isCorrect: true, explanation: 'Correct! "cd -" switches to the previous directory ($OLDPWD).' },
            { label: 'cd ..', isCorrect: false, explanation: 'Incorrect. "cd .." moves up one directory level to parent.' },
            { label: 'cd ~', isCorrect: false, explanation: 'Incorrect. "cd ~" moves to your home directory.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://www.gnu.org/software/coreutils/manual/html_node/Directory-listing.html',
          syntaxCheatSheet: [
            'pwd                   # Print current working directory',
            'cd /path              # Change directory to absolute path',
            'cd ..                 # Move up one directory level',
            'cd -                  # Toggle back to previous directory ($OLDPWD)',
            'ls -lah               # Long listing with hidden files and human-readable sizes',
            'ls -lt                # Sort files by newest modification time first',
          ],
          bestPractices: [
            'Always run pwd before executing rm -rf to avoid deleting files in the wrong directory.',
          ],
        },
      },
      {
        id: 'c-file-operations',
        command: 'mkdir -p project/src && touch project/src/main.py',
        title: 'File & Directory Manipulation',
        topicId: 'topic-02',
        topicNumber: '02',
        topicTitle: 'Essential Shell & Navigation',
        subtitle: 'Creating, copying, moving, renaming, and safely deleting files (mkdir, touch, cp, mv, rm).',
        badges: ['Beginner', 'Files', 'CLI'],
        quote: 'Deleting a file with rm in Linux bypasses any Recycle Bin or Trash can—it unlinks the inode immediately.',
        difficulty: 'Beginner',
        whatIsIt: 'The core file creation, duplication, relocation, and deletion tools in the Linux terminal: `mkdir` (make directory), `touch` (create empty file/update timestamps), `cp` (copy), `mv` (move/rename), and `rm` (remove).',
        inSimpleWords: 'Creating new folders (`mkdir -p`), making new empty text files (`touch`), copying files (`cp`), moving or renaming files (`mv`), and deleting files (`rm`). Once you delete a file with `rm`, it is gone forever without a recycle bin!',
        whyDoYouNeedIt: 'File management is the foundation of script writing, application deployment, configuration management, and server housekeeping.',
        realWorldAnalogy: 'Working at a physical desk: creating a new folder in a filing cabinet (`mkdir`), pulling out a fresh sheet of paper (`touch`), photocopying a document (`cp`), moving a folder to another drawer (`mv`), and putting paper through a shredder (`rm`).',
        withoutVsWith: {
          without: {
            title: 'WITHOUT FILE OPERATION PRECISION',
            items: [
              'Creating nested folders one by one without the -p flag',
              'Accidentally running rm -rf / or rm -rf * in the wrong directory',
              'Overwriting files with cp without prompt warnings',
              'Failing to preserve file timestamps and permissions during backups',
            ],
            outcome: '💥 Catastrophic data loss and broken directory creation scripts',
          },
          with: {
            title: 'WITH ROBUST FILE MANIPULATION TECHNIQUES',
            items: [
              'mkdir -p creates full nested directory paths in a single command',
              'cp -a preserves exact permissions, ownership, and timestamps',
              'mv performs atomic instant renames on the same filesystem',
              'Safe rm practices prevent accidental system deletion',
            ],
            outcome: '⚡ Fast, reliable, and error-free file and folder automation',
          },
        },
        blockDiagram: {
          title: 'Linux Inode & File Deletion Mechanics',
          subtitle: 'Click any component to inspect what happens when you create or unlink a file:',
          nodes: [
            { id: 'op-dentry', label: 'Directory Entry (Filename)', simpleDef: 'The human-readable name of the file in a directory.', techDef: 'Directory entry (dentry) mapping a filename string to an inode number.', badge: 'Name Pointer', color: '#38bdf8' },
            { id: 'op-inode', label: 'Inode (Metadata & Link Count)', simpleDef: 'The file passport storing size, owner, permissions, and link count.', techDef: 'Kernel inode structure storing metadata and pointers to data blocks. Has link_count.', badge: 'Inode', color: '#a855f7' },
            { id: 'op-blocks', label: 'Data Blocks (Actual Content)', simpleDef: 'The physical sectors on the disk where your file bytes live.', techDef: 'Filesystem data blocks containing the actual binary or text payload.', badge: 'Data Disk', color: '#10b981' },
            { id: 'op-unlink', label: 'rm Unlink Operation', simpleDef: 'rm deletes the filename and decrements the inode link count.', techDef: 'unlink() syscall decrements link count. When count=0 and no processes hold file open, blocks are freed.', badge: 'Unlink Action', color: '#ef4444' },
          ],
        },
        terms: [
          { term: 'mkdir -p', simple: 'Creates parent directories automatically if they do not exist.', technical: 'mkdir flag preventing errors if directory exists and creating all intermediate path components.', analogy: 'Building the foundation and walls before adding the roof.' },
          { term: 'cp -a (Archive)', simple: 'Copies everything while keeping exact permissions, dates, and ownership.', technical: 'Equivalent to -dR --preserve=all; preserves hardlinks, symlinks, timestamps, and permissions.', analogy: 'A perfect 1:1 photographic clone.' },
          { term: 'Atomic Move (mv)', simple: 'Renaming a file on the same disk happens instantly, no matter how huge the file is.', technical: 'rename() syscall simply updates directory dentry pointer to existing inode; zero data bytes are copied.', analogy: 'Changing the label on a storage box without touching what is inside.' },
        ],
        whenToUse: [
          '✓ When bootstrapping new application directory trees (mkdir -p app/src app/tests)',
          '✓ When backing up configuration files before editing (cp -a config.conf config.conf.bak)',
          '✓ When moving build artifacts into deployment webroots',
        ],
        whenNotToUse: [
          '✕ Never run "rm -rf /*" or use unquoted variables like "rm -rf $DIR/*" in shell scripts',
        ],
        syntaxCode: 'mkdir -p project/{src,bin,config} && touch project/src/main.py',
        syntaxTokens: [
          { token: 'mkdir', role: 'Command', explanation: 'Create directory.' },
          { token: '-p', role: 'Flag', explanation: 'Parents: creates parents without error if existing.' },
          { token: '{src,bin,config}', role: 'Brace Expansion', explanation: 'Shell expands to multiple arguments.' },
          { token: 'touch', role: 'Command', explanation: 'Update timestamps or create new empty file.' },
        ],
        variations: [
          { syntax: 'cp -r src/ dest/', title: 'Recursive Copy', whatItDoes: 'Copies directory and all its contents recursively.', whenToUse: 'Copying folder structures.' },
          { syntax: 'cp -a src/ dest/', title: 'Archive Copy', whatItDoes: 'Preserves links, permissions, timestamps, and ownership.', whenToUse: 'System backups and configuration copying.' },
          { syntax: 'mv old.txt new.txt', title: 'Rename File', whatItDoes: 'Renames file in place instantly.', whenToUse: 'Renaming files or moving between folders.' },
          { syntax: 'rm -i file.txt', title: 'Interactive Removal', whatItDoes: 'Prompts for confirmation before deleting each file.', whenToUse: 'Safe deletion of sensitive files.' },
        ],
        internalFlow: [
          { step: 1, title: 'Parse Path & Flags', desc: 'mkdir parses path string and flags like -p.', why: 'Validates target syntax.', techDetail: 'Checks if parent inodes exist' },
          { step: 2, title: 'Allocate Inode', desc: 'Filesystem driver finds an empty inode in the inode table.', why: 'Prepares metadata structure for new directory.', techDetail: 'Invokes mkdir() system call with mode 0777 & ~umask' },
          { step: 3, title: 'Link . and .. Entries', desc: 'Kernel populates directory data block with . (self) and .. (parent).', why: 'Initializes directory navigation links.', techDetail: 'Increments parent inode hardlink count' },
          { step: 4, title: 'Sync Directory Entry', desc: 'Adds new entry to parent directory dentry cache.', why: 'Makes new directory visible to ls.', techDetail: 'Completes syscall return code 0' },
        ],
        sandbox: {
          initialCommands: ['mkdir -p /tmp/demo/{src,docs}', 'touch /tmp/demo/src/app.py', 'ls -R /tmp/demo'],
          guidedSteps: [
            { instruction: 'Create nested directory structure in /tmp/demo', command: 'mkdir -p /tmp/demo/{src,docs}', hint: 'Run mkdir -p /tmp/demo/{src,docs}' },
            { instruction: 'Create empty file inside the new directory', command: 'touch /tmp/demo/src/app.py', hint: 'Run touch /tmp/demo/src/app.py' },
            { instruction: 'Inspect the newly created directory tree', command: 'ls -R /tmp/demo', hint: 'Run ls -R /tmp/demo' },
          ],
          targetTask: 'Create nested directory structures and manage files.',
          solutionCommands: ['mkdir -p /tmp/demo/{src,docs}', 'touch /tmp/demo/src/app.py', 'ls -R /tmp/demo'],
        },
        commonMistakes: [
          { mistake: 'Using "rm -rf $VAR/*" in a script when $VAR is empty or unset.', whyWrong: 'If $VAR is empty, the command evaluates to "rm -rf /*" which destroys the entire operating system!', correctWay: 'Use "set -u" in bash scripts and check if variable is set before running rm.' },
          { mistake: 'Using "cp -r" instead of "cp -a" when backing up configs.', whyWrong: 'Plain cp changes file timestamps and can alter ownership to the current user.', correctWay: 'Use "cp -a" for backups to preserve original permissions, dates, and ownership.' },
        ],
        challenge: {
          question: 'What happens behind the scenes when you rename a 10GB file on the same filesystem using "mv"?',
          options: [
            { label: 'It completes instantly because it only updates the directory entry pointer to the existing inode', isCorrect: true, explanation: 'Correct! The rename() system call does not copy data blocks on the same filesystem.' },
            { label: 'It takes several minutes because it must copy all 10GB of data blocks to a new sector', isCorrect: false, explanation: 'Incorrect. mv on the same filesystem is an instant metadata operation.' },
            { label: 'It compresses the file before moving it', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://www.gnu.org/software/coreutils/manual/html_node/Basic-operations.html',
          syntaxCheatSheet: [
            'mkdir -p dir1/dir2    # Create directory and all intermediate parents',
            'touch file.txt        # Create empty file or update timestamp',
            'cp -a src/ dest/      # Archive copy preserving permissions and dates',
            'mv file.txt /new/     # Move or rename file',
            'rm -rf dir/           # Recursively force delete directory (USE WITH CAUTION)',
          ],
          bestPractices: [
            'Always test wildcard file matches with "ls *.log" before running "rm *.log".',
          ],
        },
      },
      {
        id: 'c-viewing-files',
        command: 'tail -n 50 -f /var/log/syslog',
        title: 'Viewing & Inspecting Files',
        topicId: 'topic-02',
        topicNumber: '02',
        topicTitle: 'Essential Shell & Navigation',
        subtitle: 'Viewing file contents with cat, less pagination, head, tail -f log streaming, and wc.',
        badges: ['Beginner', 'Inspection', 'Logs'],
        quote: 'Never open a 10GB production log file in a text editor like nano or vim—use less or tail -f instead.',
        difficulty: 'Beginner',
        whatIsIt: 'The fundamental suite of terminal text viewing commands: `cat` (dumps entire file to screen), `less` (memory-safe interactive pager), `head` (first N lines), `tail` (last N lines with `-f` live follow), and `wc` (word and line counter).',
        inSimpleWords: '`cat` spits out the whole file at once. `less` lets you scroll through huge files smoothly without crashing your server. `head` shows the top 10 lines. `tail -f` lets you watch new log entries pop up on your screen in real time as they happen!',
        whyDoYouNeedIt: 'Triage and debugging in Linux servers relies entirely on viewing configuration files and live streaming log streams.',
        realWorldAnalogy: 'Reading a massive book: `cat` drops all 1,000 pages on the floor at once; `less` lets you turn pages one by one; `head` reads the table of contents; `tail -f` sits waiting for the author to write the next sentence on the last page.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT STREAMING TOOLS (Using vim or cat on Huge Files)',
            items: [
              'Opening a 5GB log in vim consumes 5GB of server RAM and freezes the server',
              'cat prints 500,000 lines, flooding your terminal buffer and lagging your SSH session',
              'No way to watch live web traffic or database errors in real time',
              'Manual searching through thousands of lines of output',
            ],
            outcome: '🐌 Crashed terminal sessions and server memory exhaustion',
          },
          with: {
            title: 'WITH STREAM-BASED INSPECTION (less, tail -f, head)',
            items: [
              'less only loads the visible screenful of bytes into memory: instantaneous even for 50GB files',
              'tail -f watches the file descriptor in real time as events occur',
              'head -n 20 inspects file headers without printing entire documents',
              'wc -l counts millions of lines in milliseconds',
            ],
            outcome: '⚡ Sub-second log triage, zero memory risk, and live event streaming',
          },
        },
        blockDiagram: {
          title: 'Linux Log Streaming & Inotify Mechanics',
          subtitle: 'Click any component to inspect how tail -f monitors new file bytes in real time:',
          nodes: [
            { id: 'view-app', label: 'Logging Application (Nginx / App)', simpleDef: 'The program writing error and access logs.', techDef: 'Process issuing write() syscalls appending text to /var/log/app.log.', badge: 'App Writer', color: '#38bdf8' },
            { id: 'view-kernel', label: 'Kernel Inotify Subsystem', simpleDef: 'The kernel watcher alerting when files change.', techDef: 'Linux inotify kernel subsystem notifying tail process of IN_MODIFY events.', badge: 'Inotify Event', color: '#a855f7' },
            { id: 'view-tail', label: 'tail -f Process', simpleDef: 'The terminal watcher waiting for new bytes.', techDef: 'Process sleeping on poll/epoll, waking instantly when new data is appended.', badge: 'Tail Streamer', color: '#10b981' },
            { id: 'view-terminal', label: 'Terminal Screen', simpleDef: 'Your terminal displaying new log lines live.', techDef: 'Standard output stream displaying real-time lines to the operator.', badge: 'Terminal', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'tail -f', simple: 'Follow mode: keeps the file open and prints new lines as they are written.', technical: 'Monitors file descriptor for append events using inotify, polling for new bytes.', analogy: 'Watching live subtitles during a broadcast.' },
          { term: 'less', simple: 'Interactive pager that lets you scroll up and down through files safely.', technical: 'Terminal viewer that buffers only the displayed window, supporting regex searching (/pattern).', analogy: 'An e-reader that only loads the page you are reading.' },
          { term: 'wc -l', simple: 'Counts the exact number of lines in a file or stream.', technical: 'Word count utility scanning text for newline (\\n) characters.', analogy: 'A clicker counting people walking through a door.' },
        ],
        whenToUse: [
          '✓ When tailing live application logs during a deployment (tail -f /var/log/nginx/access.log)',
          '✓ When inspecting large configuration files without memory overhead (less /etc/config)',
          '✓ When verifying CSV or log line counts (wc -l data.csv)',
        ],
        whenNotToUse: [
          '✕ Never run cat on multi-gigabyte files (use less or tail instead)',
        ],
        syntaxCode: 'tail -n 50 -f /var/log/syslog',
        syntaxTokens: [
          { token: 'tail', role: 'Command', explanation: 'Output the last part of files.' },
          { token: '-n 50', role: 'Flag', explanation: 'Print the last 50 lines (default is 10).' },
          { token: '-f', role: 'Flag', explanation: 'Follow: output appended data as the file grows.' },
          { token: '/var/log/syslog', role: 'Target', explanation: 'System log file.' },
        ],
        variations: [
          { syntax: 'head -n 20 file.txt', title: 'View First 20 Lines', whatItDoes: 'Outputs the first 20 lines of a file.', whenToUse: 'Inspecting CSV headers or file format.' },
          { syntax: 'less file.log', title: 'Interactive Pager', whatItDoes: 'Opens file in paginated viewer (press q to quit, / to search).', whenToUse: 'Reading large files safely.' },
          { syntax: 'wc -l file.txt', title: 'Count Lines', whatItDoes: 'Prints number of lines in file.', whenToUse: 'Verifying dataset row counts.' },
          { syntax: 'cat -n file.txt', title: 'Print with Line Numbers', whatItDoes: 'Prints entire file with line numbers prefixed.', whenToUse: 'Small configuration file inspection.' },
        ],
        internalFlow: [
          { step: 1, title: 'Open File Descriptor', desc: 'tail opens target file in read-only mode.', why: 'Obtains file handle.', techDetail: 'openat(AT_FDCWD, path, O_RDONLY)' },
          { step: 2, title: 'Seek to End', desc: 'Calculates offset for last N lines from end of file.', why: 'Avoids reading whole file from start.', techDetail: 'lseek(fd, -offset, SEEK_END)' },
          { step: 3, title: 'Print Initial Lines', desc: 'Reads and writes last N lines to terminal stdout.', why: 'Displays starting context to user.', techDetail: 'write(1, buffer, len)' },
          { step: 4, title: 'Register Inotify Watch', desc: 'Registers file descriptor with kernel inotify for IN_MODIFY events.', why: 'Sleeps until new data is written to disk.', techDetail: 'inotify_add_watch(ifd, path, IN_MODIFY)' },
        ],
        sandbox: {
          initialCommands: ['head -n 5 /etc/passwd', 'tail -n 5 /etc/passwd', 'wc -l /etc/passwd'],
          guidedSteps: [
            { instruction: 'Inspect the first 5 lines of /etc/passwd', command: 'head -n 5 /etc/passwd', hint: 'Run head -n 5 /etc/passwd' },
            { instruction: 'Inspect the last 5 lines of /etc/passwd', command: 'tail -n 5 /etc/passwd', hint: 'Run tail -n 5 /etc/passwd' },
            { instruction: 'Count total accounts in /etc/passwd', command: 'wc -l /etc/passwd', hint: 'Run wc -l /etc/passwd' },
          ],
          targetTask: 'Inspect files using head, tail, and line counters.',
          solutionCommands: ['head -n 5 /etc/passwd', 'tail -n 5 /etc/passwd', 'wc -l /etc/passwd'],
        },
        commonMistakes: [
          { mistake: 'Opening a multi-gigabyte log in nano or vim to inspect the end.', whyWrong: 'Text editors try to load the whole file into RAM and create swap files, which can crash low-memory cloud servers.', correctWay: 'Always use "tail -n 100" or "less" to inspect large files.' },
          { mistake: 'Forgetting how to exit "less".', whyWrong: 'New Linux users often hit Ctrl+C, which does not close less.', correctWay: 'Press "q" to cleanly exit less.' },
        ],
        challenge: {
          question: 'Why is "less" safe to run on a 50GB database dump file, while "cat" or "nano" can freeze the system?',
          options: [
            { label: 'less only reads and buffers the bytes currently visible on your terminal screen, not the entire 50GB file', isCorrect: true, explanation: 'Correct! less is a streaming pager that never loads the whole file into RAM.' },
            { label: 'less automatically compresses the file by 99% in memory', isCorrect: false, explanation: 'Incorrect. less does not compress files.' },
            { label: 'less deletes the parts of the file you have already read', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man1/tail.1.html',
          syntaxCheatSheet: [
            'head -n [N] [FILE]    # Print first N lines of file',
            'tail -n [N] [FILE]    # Print last N lines of file',
            'tail -f [FILE]        # Live follow newly appended lines in real time',
            'less [FILE]           # Memory-safe interactive pager (q to exit, / to search)',
            'wc -l [FILE]          # Count total lines in file',
          ],
          bestPractices: [
            'When triaging production outages, run "tail -f" in one terminal window while triggering requests in another.',
          ],
        },
      },
    ],
  },

  // =========================================================================
  // TOPIC 03: FILE PERMISSIONS & SECURITY OWNERSHIP
  // =========================================================================
  {
    id: 'topic-03',
    number: '03',
    title: 'Permissions & Security Ownership',
    iconName: 'ShieldCheck',
    description: 'Linux permission model, chmod, chown, special permissions (SUID/SGID/Sticky bit), and umask.',
    concepts: [
      {
        id: 'c-basic-permissions',
        command: 'chmod 755 script.sh',
        title: 'File Permissions: chmod & Modes',
        topicId: 'topic-03',
        topicNumber: '03',
        topicTitle: 'Permissions & Security Ownership',
        subtitle: 'Read (4), Write (2), Execute (1) across Owner (u), Group (g), and Others (o).',
        badges: ['Beginner', 'Security', 'Permissions'],
        quote: 'Every file in Linux has an owner, a group, and a 9-bit permission mask governing who can read, write, or execute it.',
        difficulty: 'Beginner',
        whatIsIt: 'The fundamental POSIX file access control mechanism: 3 permission bits (Read = 4, Write = 2, Execute = 1) assigned across 3 entities (User Owner, Group Owner, Others), yielding numeric modes like 755 (`rwxr-xr-x`) and 644 (`rw-r--r--`).',
        inSimpleWords: 'Read (r=4) means you can open and read the file. Write (w=2) means you can edit or delete it. Execute (x=1) means you can run it as a program. When you see 755: the owner can do everything (4+2+1=7), while group and others can only read and run it (4+1=5).',
        whyDoYouNeedIt: 'Permissions protect system binaries from unauthorized tampering, shield private keys (chmod 600 id_rsa), and make scripts runnable.',
        realWorldAnalogy: 'A three-ring binder in an office. The Author (User) has full edit and write access (7); Colleagues in the department (Group) can read and run reports (5); Guests (Others) can only view the printed charts (5).',
        withoutVsWith: {
          without: {
            title: 'WITHOUT FILE PERMISSION RESTRICTIONS (chmod 777 Everything)',
            items: [
              'Any rogue process or low-privilege user can overwrite system scripts and web assets',
              'SSH rejects your private keys if permissions are too permissive (Permissions 0777 are too open!)',
              'Malicious web uploads can execute arbitrary binary payloads',
              'Database credentials leaked to all local accounts on the system',
            ],
            outcome: '🚨 Catastrophic security breaches, SSH lockouts, and malware execution',
          },
          with: {
            title: 'WITH LEAST-PRIVILEGE PERMISSION DESIGN',
            items: [
              'chmod 600 id_rsa: Only the private key owner can read SSH credentials',
              'chmod 644 config.json: Readable by services, writable only by root',
              'chmod 755 script.sh: Executable by team, editable only by author',
              'Prevent unauthorized script execution in upload directories',
            ],
            outcome: '🔒 Hardened server security, compliance ready, and safe execution',
          },
        },
        blockDiagram: {
          title: '9-Bit Permission Mask & Octal Calculation',
          subtitle: 'Click any permission triplet to inspect octal math and access rights:',
          nodes: [
            { id: 'perm-user', label: 'Owner Permissions (u) = 7 (rwx)', simpleDef: 'The creator and primary owner of the file.', techDef: 'Bits 8-6 of st_mode. r (4) + w (2) + x (1) = 7 (Full Access).', badge: 'User (Owner)', color: '#10b981' },
            { id: 'perm-group', label: 'Group Permissions (g) = 5 (r-x)', simpleDef: 'Members of the group assigned to the file.', techDef: 'Bits 5-3 of st_mode. r (4) + - (0) + x (1) = 5 (Read & Execute).', badge: 'Group', color: '#38bdf8' },
            { id: 'perm-others', label: 'Others Permissions (o) = 5 (r-x)', simpleDef: 'Everyone else with an account on the Linux system.', techDef: 'Bits 2-0 of st_mode. r (4) + - (0) + x (1) = 5 (Read & Execute).', badge: 'World (Others)', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'chmod (Change Mode)', simple: 'The command used to modify file permission bits.', technical: 'Issues chmod() system call modifying st_mode in inode.', analogy: 'Changing the key combinations on a padlock.' },
          { term: 'Read (r = 4)', simple: 'Permission to view file contents, or list directory contents with ls.', technical: 'Grants access to read() syscall on file; getdents() on directory.', analogy: 'Looking through a window.' },
          { term: 'Write (w = 2)', simple: 'Permission to edit/truncate a file, or create/delete files in a directory.', technical: 'Grants access to write() syscall on file; unlink/rename on directory.', analogy: 'Having a pen to write on the document.' },
          { term: 'Execute (x = 1)', simple: 'Permission to run a file as a program, or enter a directory with cd.', technical: 'Permits execve() syscall on file; permits directory traversal into child inodes.', analogy: 'Having a key to unlock the door.' },
        ],
        whenToUse: [
          '✓ When making a bash or Python script executable (chmod +x script.sh)',
          '✓ When securing SSH private keys (chmod 600 ~/.ssh/id_rsa)',
          '✓ When hardening web server document roots (chmod 644 for files, chmod 755 for directories)',
        ],
        whenNotToUse: [
          '✕ Never run "chmod 777" as a lazy troubleshooting shortcut in production (creates massive security holes)',
        ],
        syntaxCode: 'chmod 755 deploy.sh',
        syntaxTokens: [
          { token: 'chmod', role: 'Command', explanation: 'Change file mode bits.' },
          { token: '755', role: 'Octal Mode', explanation: 'rwxr-xr-x (User: 7, Group: 5, Others: 5).' },
          { token: 'deploy.sh', role: 'Target', explanation: 'File whose permissions are updated.' },
        ],
        variations: [
          { syntax: 'chmod +x script.sh', title: 'Make Executable', whatItDoes: 'Adds execute permission for all without changing read/write bits.', whenToUse: 'Quickly enabling script execution.' },
          { syntax: 'chmod 600 ~/.ssh/id_rsa', title: 'Secure Private Key', whatItDoes: 'Restricts file so ONLY the owner can read/write; zero access for group/others.', whenToUse: 'SSH keys and secret tokens.' },
          { syntax: 'chmod -R 755 /var/www/html', title: 'Recursive Mode Change', whatItDoes: 'Applies permission mode to directory and all contents recursively.', whenToUse: 'Standardizing web directory permissions.' },
        ],
        internalFlow: [
          { step: 1, title: 'CLI Resolves Path & Mode', desc: 'chmod parses octal number (755) or symbolic notation (u+x).', why: 'Computes new 9-bit mode integer.', techDetail: 'Translates 755 to bitmask S_IRWXU | S_IRGRP | S_IXGRP | S_IROTH | S_IXOTH' },
          { step: 2, title: 'Ownership Check', desc: 'Kernel checks if caller UID matches file owner UID (or if caller is root).', why: 'Only owner or superuser can change permissions.', techDetail: 'Kernel verifies current_euid() == inode->i_uid' },
          { step: 3, title: 'Inode Mode Update', desc: 'Kernel updates inode st_mode bits on disk.', why: 'Persists new permissions.', techDetail: 'Issues chmod() system call updating inode table entry' },
        ],
        sandbox: {
          initialCommands: ['touch /tmp/test.sh', 'chmod 644 /tmp/test.sh && ls -l /tmp/test.sh', 'chmod +x /tmp/test.sh && ls -l /tmp/test.sh'],
          guidedSteps: [
            { instruction: 'Create a test file', command: 'touch /tmp/test.sh', hint: 'Run touch /tmp/test.sh' },
            { instruction: 'Set read-write permissions for owner only (644)', command: 'chmod 644 /tmp/test.sh && ls -l /tmp/test.sh', hint: 'Run chmod 644 /tmp/test.sh && ls -l /tmp/test.sh' },
            { instruction: 'Add execute permission to make it runnable', command: 'chmod +x /tmp/test.sh && ls -l /tmp/test.sh', hint: 'Run chmod +x /tmp/test.sh && ls -l /tmp/test.sh' },
          ],
          targetTask: 'Manage file permissions using octal and symbolic chmod modes.',
          solutionCommands: ['touch /tmp/test.sh', 'chmod 644 /tmp/test.sh && ls -l /tmp/test.sh', 'chmod +x /tmp/test.sh && ls -l /tmp/test.sh'],
        },
        commonMistakes: [
          { mistake: 'Running "chmod 777" to fix permission denied errors in web applications.', whyWrong: 'Grants write access to every user and process on the machine, allowing attackers to overwrite code.', correctWay: 'Keep files 644 and directories 755; configure group ownership (chown -R www-data:www-data) instead.' },
          { mistake: 'Removing execute (x) permission from a directory.', whyWrong: 'Without the execute bit on a directory, no user can "cd" into it or access files inside, even if files are readable!', correctWay: 'Directories always need the execute bit (x) to allow traversal.' },
        ],
        challenge: {
          question: 'What exact octal permission number represents "Read & Write for Owner, Read-Only for Group, and No Access for Others"?',
          options: [
            { label: '640', isCorrect: true, explanation: 'Correct! Owner: 4+2=6, Group: 4=4, Others: 0=0 -> 640.' },
            { label: '755', isCorrect: false, explanation: 'Incorrect. 755 gives execute to everyone and read to others.' },
            { label: '644', isCorrect: false, explanation: 'Incorrect. 644 gives read access to others.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man1/chmod.1.html',
          syntaxCheatSheet: [
            'chmod 755 [FILE]       # Owner: rwx (7), Group: r-x (5), Others: r-x (5)',
            'chmod 644 [FILE]       # Owner: rw- (6), Group: r-- (4), Others: r-- (4)',
            'chmod 600 [FILE]       # Owner: rw- (6), Group: --- (0), Others: --- (0)',
            'chmod +x [FILE]        # Add executable permission for all users',
            'chmod -R [MODE] [DIR]  # Recursively change mode across directory tree',
          ],
          bestPractices: [
            'Never assign write permissions to "others" on sensitive directories.',
            'SSH private keys must always be chmod 600, or ssh will abort connection.',
          ],
        },
      },
      {
        id: 'c-ownership-groups',
        command: 'chown -R www-data:www-data /var/www/html',
        title: 'Ownership & Group Management: chown',
        topicId: 'topic-03',
        topicNumber: '03',
        topicTitle: 'Permissions & Security Ownership',
        subtitle: 'Changing user and group ownership of files and directories (chown, chgrp).',
        badges: ['Intermediate', 'Security', 'chown'],
        quote: 'Permissions define what can be done; ownership defines who is bound by each rule.',
        difficulty: 'Intermediate',
        whatIsIt: 'The `chown` (change owner) command reassigns the user owner and/or group owner of a file or directory. In modern multi-service Linux systems, service accounts (like `nginx`, `www-data`, or `postgres`) own runtime assets.',
        inSimpleWords: 'When you download or create a file, you own it. If you want a web server like Nginx or a team member to manage it, you use `chown newuser:newgroup filename` to transfer ownership.',
        whyDoYouNeedIt: 'Web servers and background services run under dedicated unprivileged system users for security. If assets are owned by the wrong user, services fail with "403 Forbidden" or "Permission Denied".',
        realWorldAnalogy: 'Transferring the deed of a house. Changing the names on the title document (`chown`) determines who has the master key and who pays the property taxes.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT PROPER USER/GROUP OWNERSHIP',
            items: [
              'Running web servers as root because of permission errors (massive security vulnerability)',
              'Web server cannot upload customer avatar images or write cache files',
              'Developers cannot collaborate on shared team project folders',
              'Databases fail to boot because data directories are owned by wrong user',
            ],
            outcome: '🚨 Broken web apps, 500 errors, or dangerous root service execution',
          },
          with: {
            title: 'WITH DISCIPLINED CHOWN OWNERSHIP STRATEGIES',
            items: [
              'Services run under locked, non-root accounts (e.g. www-data, postgres)',
              'Shared project folders owned by team group with SGID inheritance',
              'Root owns static code; service user owns only specific upload directories',
              'Clean audit trail identifying which user account created which asset',
            ],
            outcome: '🛡️ Principle of Least Privilege satisfied with zero application downtime',
          },
        },
        blockDiagram: {
          title: 'Linux UID and GID Ownership Mapping',
          subtitle: 'Click any component to inspect how usernames map to kernel numeric IDs:',
          nodes: [
            { id: 'chown-user', label: 'User Owner (UID)', simpleDef: 'The individual user who owns the file.', techDef: 'Numeric User ID (UID) stored in inode st_uid; resolved from /etc/passwd.', badge: 'UID', color: '#38bdf8' },
            { id: 'chown-group', label: 'Group Owner (GID)', simpleDef: 'The group of users sharing access to the file.', techDef: 'Numeric Group ID (GID) stored in inode st_gid; resolved from /etc/group.', badge: 'GID', color: '#10b981' },
            { id: 'chown-kernel', label: 'Kernel Security Check', simpleDef: 'The kernel comparing caller credentials with file ownership.', techDef: 'Kernel checks current_fsuid() == inode->i_uid before evaluating user permissions.', badge: 'Security Check', color: '#a855f7' },
          ],
        },
        terms: [
          { term: 'chown user:group', simple: 'Changes both the owner and group at the same time.', technical: 'Issues chown() syscall setting both uid and gid in inode.', analogy: 'Updating both the owner name and company name on a title deed.' },
          { term: 'chown -R', simple: 'Recursive mode: changes owner for the folder and all files inside it.', technical: 'Traverses directory tree applying chown syscall to every child inode.', analogy: 'Handing over the keys to an entire apartment building.' },
          { term: 'Service Account', simple: 'A system user created for background programs, not human logins.', technical: 'Non-login user account (shell: /usr/sbin/nologin) with dedicated UID/GID.', analogy: 'A badge assigned to an automated cleaning robot.' },
        ],
        whenToUse: [
          '✓ When configuring web server document roots (chown -R www-data:www-data /var/www/html)',
          '✓ When granting a service account ownership over a newly mounted database volume',
          '✓ When fixing files accidentally created by sudo back to the regular user account',
        ],
        whenNotToUse: [
          '✕ Never run chown -R on system directories like /etc, /usr, or / (will break sudo and systemd)',
        ],
        syntaxCode: 'chown -R www-data:www-data /var/www/html',
        syntaxTokens: [
          { token: 'chown', role: 'Command', explanation: 'Change file owner and group.' },
          { token: '-R', role: 'Flag', explanation: 'Operate on files and directories recursively.' },
          { token: 'www-data:www-data', role: 'Target Owner:Group', explanation: 'New user owner and group owner.' },
          { token: '/var/www/html', role: 'Directory', explanation: 'Target path.' },
        ],
        variations: [
          { syntax: 'chown bob file.txt', title: 'Change Owner Only', whatItDoes: 'Changes user owner, leaves group untouched.', whenToUse: 'Reassigning file to new author.' },
          { syntax: 'chown :developers file.txt', title: 'Change Group Only', whatItDoes: 'Changes group owner without altering user.', whenToUse: 'Sharing file with team group (equivalent to chgrp).' },
          { syntax: 'chown --reference=ref.txt target.txt', title: 'Copy Ownership from Reference', whatItDoes: 'Applies ownership of ref.txt to target.txt.', whenToUse: 'Cloning ownership settings during deployments.' },
        ],
        internalFlow: [
          { step: 1, title: 'Lookup User & Group IDs', desc: 'chown translates username and group name to numeric UID and GID.', why: 'Kernel inodes store numeric IDs, not text strings.', techDetail: 'Queries getpwnam() and getgrnam() in /etc/passwd and /etc/group' },
          { step: 2, title: 'Privilege Verification', desc: 'Kernel checks if calling process has CAP_CHOWN capability (root).', why: 'Regular users cannot give away files to other users.', techDetail: 'Verifies ns_capable(CAP_CHOWN)' },
          { step: 3, title: 'Inode UID/GID Mutation', desc: 'Kernel writes new UID and GID into inode structure.', why: 'Persists new ownership to filesystem.', techDetail: 'Invokes chown() syscall on inode' },
        ],
        sandbox: {
          initialCommands: ['touch /tmp/app.conf', 'ls -l /tmp/app.conf', 'chown :daemon /tmp/app.conf && ls -l /tmp/app.conf'],
          guidedSteps: [
            { instruction: 'Create a test file', command: 'touch /tmp/app.conf', hint: 'Run touch /tmp/app.conf' },
            { instruction: 'Inspect current owner and group', command: 'ls -l /tmp/app.conf', hint: 'Run ls -l /tmp/app.conf' },
            { instruction: 'Change group ownership to daemon', command: 'chown :daemon /tmp/app.conf && ls -l /tmp/app.conf', hint: 'Run chown :daemon /tmp/app.conf && ls -l /tmp/app.conf' },
          ],
          targetTask: 'Manage user and group ownership of files.',
          solutionCommands: ['touch /tmp/app.conf', 'ls -l /tmp/app.conf', 'chown :daemon /tmp/app.conf && ls -l /tmp/app.conf'],
        },
        commonMistakes: [
          { mistake: 'Running "chown -R 777" instead of "chmod -R 777".', whyWrong: 'chown changes user/group, not permissions. 777 is not a valid username, causing an error.', correctWay: 'Use chmod for permission numbers; use chown for usernames.' },
          { mistake: 'Trying to change file ownership as an unprivileged non-root user.', whyWrong: 'In modern Linux, unprivileged users cannot "give away" files to prevent quota fraud.', correctWay: 'Use sudo chown to reassign ownership.' },
        ],
        challenge: {
          question: 'Can a regular non-root user transfer ownership of one of their files to another user using "chown"?',
          options: [
            { label: 'No, only the root superuser (or process with CAP_CHOWN) can change file ownership in Linux', isCorrect: true, explanation: 'Correct! Linux restricts chown to root to prevent disk quota evasion and file hiding.' },
            { label: 'Yes, any user can give away files they own at any time', isCorrect: false, explanation: 'Incorrect.' },
            { label: 'Yes, but only if the file is chmod 777', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man1/chown.1.html',
          syntaxCheatSheet: [
            'chown [USER]:[GROUP] [FILE]   # Change both user and group owner',
            'chown [USER] [FILE]           # Change user owner only',
            'chown :[GROUP] [FILE]         # Change group owner only (or chgrp)',
            'chown -R [USER]:[GROUP] [DIR] # Recursively change ownership',
          ],
          bestPractices: [
            'Always verify with "ls -l" after running chown to confirm proper user and group assignments.',
          ],
        },
      },
      {
        id: 'c-special-permissions',
        command: 'chmod 4755 /usr/bin/passwd',
        title: 'Special Permissions: SUID, SGID & Sticky Bit',
        topicId: 'topic-03',
        topicNumber: '03',
        topicTitle: 'Permissions & Security Ownership',
        subtitle: 'Elevated execution (SUID/SGID) and deletion protection (Sticky Bit on /tmp).',
        badges: ['Advanced', 'Security', 'SUID'],
        quote: 'The Sticky Bit is why users can create files in /tmp without anyone else being able to delete them.',
        difficulty: 'Advanced',
        whatIsIt: 'Three special 12th, 11th, and 10th permission bits that extend standard read/write/execute: SUID (Set User ID = 4000), SGID (Set Group ID = 2000), and Sticky Bit (1000).',
        inSimpleWords: 'Normally, when you run a program, it runs with YOUR permissions. SUID (4xxx) lets regular users run a specific program with the ROOT owner permissions (like `/usr/bin/passwd` updating `/etc/shadow`). Sticky bit (1xxx, shown as `t` on `/tmp`) allows anyone to create files in a shared folder, but ONLY the creator can delete their own files!',
        whyDoYouNeedIt: 'SUID is crucial for utilities that need temporary root powers; Sticky bit prevents users on shared systems from deleting each other’s files in `/tmp`.',
        realWorldAnalogy: 'SUID is a notarized Power of Attorney letter: you are not the landlord, but the letter temporarily gives you authority to sign the lease. The Sticky Bit is an open community refrigerator where anyone can put in their lunch, but nobody can throw away someone else\'s lunch.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT SPECIAL PERMISSIONS',
            items: [
              'Regular users cannot change their passwords (cannot write to root-owned /etc/shadow)',
              'In shared folders like /tmp, User B can maliciously delete User A\'s database files',
              'Files created in team folders do not inherit group ownership, breaking collaboration',
            ],
            outcome: '💥 Password updates fail or shared folders suffer hostile file deletions',
          },
          with: {
            title: 'WITH SUID, SGID, AND STICKY BIT CONTROLS',
            items: [
              'SUID (chmod 4755): /usr/bin/passwd runs with root EUID to update password safely',
              'SGID on directories (chmod 2775): All new child files inherit the parent group automatically',
              'Sticky Bit (chmod 1777 /tmp): Only file owner or root can delete files in shared directories',
            ],
            outcome: '🛡️ Controlled privilege escalation and tamper-proof shared directories',
          },
        },
        blockDiagram: {
          title: 'Special Permission Bits Breakdown (12-Bit Mode Mask)',
          subtitle: 'Click any special bit to inspect its numeric value and runtime behavior:',
          nodes: [
            { id: 'spec-suid', label: 'SUID Bit (Octal 4000 / rws)', simpleDef: 'Runs the executable with the permissions of the file OWNER (typically root).', techDef: 'Sets process Effective UID (EUID) to file owner UID during execve(). Represented by "s" in owner execute column.', badge: 'SUID (4000)', color: '#ef4444' },
            { id: 'spec-sgid', label: 'SGID Bit (Octal 2000 / r-s)', simpleDef: 'Executables run with group permissions; on folders, child files inherit parent group.', techDef: 'On files: sets Effective GID (EGID). On directories: newly created files automatically inherit directory GID.', badge: 'SGID (2000)', color: '#a855f7' },
            { id: 'spec-sticky', label: 'Sticky Bit (Octal 1000 / rwt)', simpleDef: 'Protects files in shared writable folders so only the creator can delete them.', techDef: 'Restricts file unlinking and renaming in shared directory to file owner, directory owner, or root.', badge: 'Sticky Bit (1000)', color: '#10b981' },
          ],
        },
        terms: [
          { term: 'SUID (Set User ID)', simple: 'Executes binary with the privileges of the file owner instead of the caller.', technical: 'Octal 4000. Changes process EUID to st_uid upon execve().', analogy: 'Borrowing a master badge to unlock a specific door.' },
          { term: 'SGID (Set Group ID)', simple: 'Makes new files in a team folder inherit the group automatically.', technical: 'Octal 2000. Forces child files to inherit parent directory st_gid.', analogy: 'All letters written on company letterhead carry the company seal.' },
          { term: 'Sticky Bit', simple: 'Prevents users from deleting each other\'s files in shared folders like /tmp.', technical: 'Octal 1000 (S_ISVTX). Represented by "t" in others execute field (drwxrwxrwt).', analogy: 'A safety deposit locker in a public vault.' },
        ],
        whenToUse: [
          '✓ When creating a shared team collaboration directory (chmod 2775 /var/shared)',
          '✓ When configuring public writable upload or scratch directories (chmod 1777 /tmp)',
          '✓ When auditing systems for suspicious SUID binaries during security penetration tests',
        ],
        whenNotToUse: [
          '✕ Never set SUID on shell scripts (Linux kernel ignores SUID on interpreted scripts for security reasons)',
        ],
        syntaxCode: 'chmod 2775 /var/team_shared',
        syntaxTokens: [
          { token: 'chmod', role: 'Command', explanation: 'Change file mode.' },
          { token: '2775', role: 'Octal Mode', explanation: 'SGID (2000) + rwxrwxr-x (775).' },
          { token: '/var/team_shared', role: 'Directory', explanation: 'Target team collaboration directory.' },
        ],
        variations: [
          { syntax: 'chmod +t /shared', title: 'Set Sticky Bit', whatItDoes: 'Adds sticky bit (1000) preventing unauthorized deletion.', whenToUse: 'Shared drop-boxes and temporary directories.' },
          { syntax: 'chmod u+s /usr/local/bin/helper', title: 'Set SUID', whatItDoes: 'Adds SUID bit to binary.', whenToUse: 'Specialized helper utilities requiring root permissions.' },
          { syntax: 'find / -perm -4000 -type f 2>/dev/null', title: 'Audit SUID Binaries', whatItDoes: 'Finds all SUID root binaries on the entire machine.', whenToUse: 'Security audits and privilege escalation defense.' },
        ],
        internalFlow: [
          { step: 1, title: 'Execve Invokes Binary', desc: 'User launches binary with SUID bit (e.g. /usr/bin/passwd).', why: 'Kernel checks inode metadata during process loading.', techDetail: 'Kernel reads st_mode S_ISUID bit' },
          { step: 2, title: 'Set EUID to File Owner', desc: 'Kernel assigns Effective User ID (EUID) = 0 (root), while Real UID (RUID) remains the regular user.', why: 'Grants root access exclusively for this binary\'s duration.', techDetail: 'current->cred->euid = inode->i_uid' },
          { step: 3, title: 'Perform Privileged Action', desc: 'Binary writes new password hash into /etc/shadow.', why: 'Regular user could not do this directly.', techDetail: 'Kernel approves write because EUID is 0' },
          { step: 4, title: 'Process Exits', desc: 'Process terminates, and user returns to unprivileged shell.', why: 'Privileges are automatically dropped.', techDetail: 'Child process state is reaped' },
        ],
        sandbox: {
          initialCommands: ['ls -ld /tmp', 'mkdir -p /tmp/team && chmod 2775 /tmp/team && ls -ld /tmp/team'],
          guidedSteps: [
            { instruction: 'Examine sticky bit on /tmp (notice the "t" at the end)', command: 'ls -ld /tmp', hint: 'Run ls -ld /tmp' },
            { instruction: 'Create a team directory with SGID bit enabled (drwxrwsr-x)', command: 'mkdir -p /tmp/team && chmod 2775 /tmp/team && ls -ld /tmp/team', hint: 'Run mkdir -p /tmp/team && chmod 2775 /tmp/team && ls -ld /tmp/team' },
          ],
          targetTask: 'Inspect sticky bits and configure SGID collaboration directories.',
          solutionCommands: ['ls -ld /tmp', 'mkdir -p /tmp/team && chmod 2775 /tmp/team && ls -ld /tmp/team'],
        },
        commonMistakes: [
          { mistake: 'Thinking you can make a bash script SUID root to bypass sudo.', whyWrong: 'Modern Linux kernels intentionally disable the SUID bit on interpreted scripts (#!) to prevent race condition exploits.', correctWay: 'Use sudoers (visudo) with NOPASSWD directives for specific scripts instead.' },
          { mistake: 'Leaving unnecessary SUID binaries on production servers.', whyWrong: 'Attackers exploit bugs in SUID binaries to gain root access (privilege escalation).', correctWay: 'Audit SUID files regularly with "find / -perm -4000".' },
        ],
        challenge: {
          question: 'What is the primary function of the Sticky Bit (chmod +t) on the shared /tmp directory?',
          options: [
            { label: 'It allows any user to create files in /tmp, but only the file owner or root can delete or rename their own files', isCorrect: true, explanation: 'Correct! The sticky bit protects users from having their files deleted by peers in shared directories.' },
            { label: 'It forces all files in /tmp to stay in memory RAM forever', isCorrect: false, explanation: 'Incorrect.' },
            { label: 'It makes all files in /tmp read-only', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://en.wikipedia.org/wiki/Setuid',
          syntaxCheatSheet: [
            'chmod 4755 [BINARY]    # Set SUID (rwsr-xr-x)',
            'chmod 2775 [DIR]       # Set SGID on directory (drwxrwsr-x)',
            'chmod 1777 [DIR]       # Set Sticky bit on directory (drwxrwxrwt)',
            'find / -perm -4000     # Audit all SUID files on system',
          ],
          bestPractices: [
            'Regularly run SUID audits in CI/CD pipeline images to ensure zero unexpected SUID binaries exist.',
          ],
        },
      },
    ],
  },
];
