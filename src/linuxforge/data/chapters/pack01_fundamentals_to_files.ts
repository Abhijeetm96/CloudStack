import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 01: LINUX FUNDAMENTALS (01.1 to 01.12)
// ============================================================================
export const CHAPTER_01: LinuxTopic = {
  id: 'ch-01',
  number: '01',
  title: 'Linux Fundamentals',
  iconName: 'Terminal',
  description: 'Understand what Linux is, how the kernel coordinates hardware, distributions, architecture, privilege rings, and the boot sequence.',
  concepts: [
    buildLinuxConcept({
      id: 'c-01-01',
      subChapterNumber: '01.1',
      command: 'uname -a',
      title: 'What is Linux?',
      topicId: 'ch-01',
      topicNumber: '01',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'The open-source Unix-like kernel powering the modern internet and cloud',
      badges: ['Foundations', 'Kernel', 'Core'],
      difficulty: 'Beginner',
      quote: 'Linux is not an entire operating system by itself; it is the master kernel orchestrating software requests to physical hardware.',
      whatIsIt: 'Linux is a free, open-source, Unix-like monolithic operating system kernel conceived by Linus Torvalds in 1991. Paired with GNU system utilities, user runtimes, and systemd, it forms the foundation of modern cloud infrastructure, Android devices, supercomputers, and enterprise servers.',
      inSimpleWords: 'Think of Linux as the chief conductor of an orchestra. Your applications want to play music (store files, talk to the network, use memory), but they cannot touch the instruments directly. The Linux kernel mediates every single interaction fairly and safely.',
      whyDoYouNeedIt: 'Without a kernel like Linux, every application would need custom drivers for every hard drive, network card, and CPU on Earth, with zero security boundaries between programs.',
      realWorldScenario: 'You are deploying a web service to AWS or an on-premise server. You log in via SSH and need to immediately verify the kernel version, CPU architecture, and hostname before starting software installations.',
      realWorldAnalogy: 'The engine of a high-performance jetliner. Passengers (applications) sit safely inside the cabin without worrying about fuel injection or turbine speed, because the engine flight management system (kernel) handles physics.',
      withoutVsWith: {
        without: {
          title: 'Without Linux Kernel Architecture',
          items: ['Every software program must write custom disk and memory drivers', 'One bug crashes the entire computer hardware', 'No multi-user permissions or network protocol stacks'],
          outcome: 'Constant crashes, zero security boundaries, and software tied to single hardware models.'
        },
        with: {
          title: 'With Linux Kernel Architecture',
          items: ['Uniform POSIX API across x86, ARM, and RISC-V hardware', 'Preemptive multitasking ensuring no single rogue app locks up the system', 'Robust TCP/IP network stack handling millions of concurrent requests'],
          outcome: 'Rock-solid multi-tenant security, portability, and enterprise uptime.'
        }
      },
      blockDiagram: {
        title: 'Linux Operating System Architecture Layers',
        subtitle: 'Click components to inspect hardware privilege isolation:',
        nodes: [
          { id: 'apps', label: 'User Applications', simpleDef: 'Web servers, databases, bash shell, CLI tools', techDef: 'Ring 3 unprivileged process execution space', badge: 'Ring 3', color: '#38bdf8' },
          { id: 'glibc', label: 'GNU C Library (glibc)', simpleDef: 'The translation bridge between apps and kernel', techDef: 'POSIX system call wrapper library', badge: 'Library', color: '#a855f7' },
          { id: 'kernel', label: 'Linux Kernel Space', simpleDef: 'Memory paging, CPU scheduler, device drivers', techDef: 'Ring 0 privileged supervisor execution mode', badge: 'Ring 0', color: '#10b981' },
          { id: 'hardware', label: 'Physical Hardware', simpleDef: 'CPU cores, RAM memory, NVMe SSDs, NICs', techDef: 'Underlying bare-metal compute hardware', badge: 'Physical', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Kernel', simple: 'The core program with full hardware control.', technical: 'Ring 0 privileged supervisor software managing CPU, memory, and devices.' },
        { term: 'POSIX', simple: 'A standardized rulebook so commands work across all Unix systems.', technical: 'Portable Operating System Interface IEEE standard defining syscall APIs.' }
      ],
      syntaxCode: 'uname [OPTIONS]',
      syntaxTokens: [
        { token: 'uname', role: 'command', explanation: 'Print system information and kernel details' },
        { token: '-a', role: 'flag', explanation: 'All: print kernel name, network nodename, release, version, machine architecture' }
      ],
      variations: [
        { syntax: 'uname -r', title: 'Kernel Release Only', whatItDoes: 'Prints exact kernel version string (e.g., 6.8.0-45-generic)', whenToUse: 'When verifying driver or module compatibility' },
        { syntax: 'uname -m', title: 'Machine Hardware Architecture', whatItDoes: 'Prints x86_64, aarch64, or arm64', whenToUse: 'When downloading binary packages' }
      ],
      beforeAfter: {
        before: '$ uname -a\n[Awaiting execution...]',
        after: '$ uname -a\nLinux prod-server-01 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
        explanation: 'Linux outputs the complete node identity, kernel version, compilation timestamp, and CPU architecture.'
      },
      expectedOutput: 'Linux prod-server-01 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
      whatChanges: ['No filesystem state changes; prints hardware/kernel metadata to stdout.'],
      whatDoesNotChange: ['System configuration, disk storage, and user credentials remain unaffected.'],
      safeRecovery: 'uname is read-only and 100% safe. If an invalid flag is passed, run "uname --help" to see valid switches.'
    }),
    buildLinuxConcept({
      id: 'c-01-02',
      subChapterNumber: '01.2',
      command: 'cat /etc/os-release',
      title: 'Linux vs Operating System',
      topicId: 'ch-01',
      topicNumber: '01',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'Distinguishing the core kernel from a complete userland distribution',
      badges: ['Foundations', 'Architecture'],
      difficulty: 'Beginner',
      quote: 'Linux is technically just the kernel; an Operating System is the kernel plus system libraries, utilities, and a shell.',
      whatIsIt: 'Strictly speaking, Linux is solely the kernel program created by Linus Torvalds. A functional Operating System requires userland software: the GNU Coreutils (ls, cp, rm), the C standard library (glibc), an init system (systemd), package managers (apt, dnf), and a shell (Bash). Together they form a GNU/Linux OS.',
      inSimpleWords: 'Think of an automobile. The engine is the Linux kernel. But you cannot drive an engine down the freeway without a steering wheel, pedals, seats, and tires (GNU userland utilities and system libraries). Together, they make a complete car (Ubuntu, Fedora, Debian).',
      whyDoYouNeedIt: 'Understanding this distinction prevents severe architectural mistakes, such as assuming all Linux distributions behave identically or mistaking shell builtins for kernel system calls.',
      realWorldScenario: 'You are writing an automated deployment pipeline. A script works on Ubuntu but fails on Alpine Linux because Alpine uses musl libc and busybox instead of GNU Coreutils. Understanding the difference between the kernel and OS prevents silent production breaks.',
      realWorldAnalogy: 'The heart and circulatory system (kernel) versus the complete human body (operating system).',
      beforeAfter: {
        before: '$ cat /etc/os-release\n[Querying distribution identity...]',
        after: 'NAME="Ubuntu"\nVERSION="24.04 LTS (Noble Numbat)"\nID=ubuntu\nID_LIKE=debian\nPRETTY_NAME="Ubuntu 24.04 LTS"',
        explanation: 'The system reads the standard POSIX release identity file detailing the distribution brand and base.'
      },
      expectedOutput: 'NAME="Ubuntu"\nVERSION="24.04 LTS"\nID=ubuntu',
      whatChanges: ['Reads /etc/os-release from the filesystem and outputs to stdout.'],
      whatDoesNotChange: ['No system parameters or files are modified.']
    }),
    buildLinuxConcept({
      id: 'c-01-03',
      subChapterNumber: '01.3',
      command: 'sysctl kernel.version',
      title: 'Linux Kernel',
      topicId: 'ch-01',
      topicNumber: '01',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'The privileged heart managing memory, CPU scheduling, interrupts, and I/O',
      badges: ['Kernel', 'Architecture', 'Ring 0'],
      difficulty: 'Intermediate',
      quote: 'The kernel is the only software on your computer running in full hardware supervisor mode.',
      whatIsIt: 'The Linux kernel is a monolithic, modular kernel with full preemptive scheduling, virtual memory management (VFS/MMU), network stacks, and hardware device drivers. It runs in privileged CPU Ring 0.',
      inSimpleWords: 'When your code asks for 4 Megabytes of RAM or wants to send a network packet to Google, it knocks on the kernel\'s door via a "system call". The kernel inspects permissions, allocates memory pages, and sends electrons across the network card.',
      whyDoYouNeedIt: 'The kernel prevents programs from spying on each other or corrupting each other\'s memory, ensuring complete process isolation and multi-tenant security.'
    }),
    buildLinuxConcept({
      id: 'c-01-04',
      subChapterNumber: '01.4',
      command: 'which bash grep coreutils',
      title: 'GNU and Linux',
      topicId: 'ch-01',
      topicNumber: '01',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'The marriage of Richard Stallman\'s GNU tools and Linus Torvalds\' kernel',
      badges: ['History', 'GNU', 'Open Source'],
      difficulty: 'Beginner',
      quote: 'Richard Stallman founded GNU in 1983 to create a completely free Unix-like system. In 1991, Linux provided the missing kernel.'
    }),
    buildLinuxConcept({
      id: 'c-01-05',
      subChapterNumber: '01.5',
      command: 'cat /etc/issue',
      title: 'Linux Distributions',
      topicId: 'ch-01',
      topicNumber: '01',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'How distros package the kernel, userland, packages, and defaults into a unified product',
      badges: ['Distributions', 'Ecosystem'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-01-06',
      subChapterNumber: '01.6',
      command: 'hostnamectl',
      title: 'Ubuntu, Debian, Fedora, RHEL, Arch',
      topicId: 'ch-01',
      topicNumber: '01',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'Comparative analysis of the primary enterprise and community distribution families',
      badges: ['Distros', 'Debian', 'RedHat', 'Arch'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-01-07',
      subChapterNumber: '01.7',
      command: 'systemctl get-default',
      title: 'Linux Desktop vs Server',
      topicId: 'ch-01',
      topicNumber: '01',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'GUI display servers (Wayland/X11) vs headless cloud compute nodes',
      badges: ['Server', 'Desktop', 'Targets'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-01-08',
      subChapterNumber: '01.8',
      command: 'cat /usr/share/common-licenses/GPL-2',
      title: 'Open Source and Linux',
      topicId: 'ch-01',
      topicNumber: '01',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'GPL v2, community governance, Linus Torvalds, and collaborative enterprise development',
      badges: ['OpenSource', 'GPL', 'Governance'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-01-09',
      subChapterNumber: '01.9',
      command: 'lsmod | head -n 10',
      title: 'Linux Architecture',
      topicId: 'ch-01',
      topicNumber: '01',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'Layered architecture: Hardware -> Kernel -> System Calls -> Shell -> Applications',
      badges: ['Architecture', 'Layers', 'Syscalls'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-01-10',
      subChapterNumber: '01.10',
      command: 'cat /proc/sys/kernel/pid_max',
      title: 'User Space vs Kernel Space',
      topicId: 'ch-01',
      topicNumber: '01',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'CPU privilege protection: Ring 3 unprivileged mode vs Ring 0 supervisor mode',
      badges: ['Security', 'Kernel', 'Rings'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-01-11',
      subChapterNumber: '01.11',
      command: 'dmesg | head -n 20',
      title: 'The Linux Boot Process',
      topicId: 'ch-01',
      topicNumber: '01',
      topicTitle: 'Linux Fundamentals',
      subtitle: 'UEFI/BIOS -> GRUB Bootloader -> Kernel Decompression -> initramfs -> systemd (PID 1)',
      badges: ['Boot', 'GRUB', 'systemd'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-01-12',
      subChapterNumber: '01.12',
      command: 'curl -I https://google.com',
      title: 'Where Linux is Used',
      topicId: 'ch-01',
      topicNumber: '01',
      topicTitle: 'Linux Fundamentals',
      subtitle: '100% of top 500 supercomputers, 96% of cloud servers, Android, rockets, and IoT devices',
      badges: ['Cloud', 'Production', 'SRE'],
      difficulty: 'Beginner'
    })
  ]
};

// ============================================================================
// CHAPTER 02: THE LINUX FILESYSTEM (02.1 to 02.15)
// ============================================================================
export const CHAPTER_02: LinuxTopic = {
  id: 'ch-02',
  number: '02',
  title: 'The Linux Filesystem',
  iconName: 'FolderTree',
  description: 'Master the single-rooted hierarchical filesystem tree, absolute vs relative paths, and every standard FHS top-level directory.',
  concepts: [
    buildLinuxConcept({
      id: 'c-02-01',
      subChapterNumber: '02.1',
      command: 'ls -ld /',
      title: 'Files romantic and Directories',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'In Unix and Linux, Everything is a File: regular files, directories, sockets, and devices',
      badges: ['Filesystem', 'FHS', 'Core'],
      difficulty: 'Beginner',
      quote: 'In Linux, everything is either a file or a running process. Directories are simply special files listing other file pointers.',
      whatIsIt: 'The foundational philosophy of Linux is "Everything is a File". Disk files, directories, serial ports, network connections, and even running process memory are exposed as file paths in a single unified hierarchical tree.',
      inSimpleWords: 'Unlike Windows which has separate drive letters (C:\\, D:\\, E:\\), Linux has one single root directory called "/". Every disk, USB stick, or network share is plugged (mounted) somewhere into this single tree.',
      whyDoYouNeedIt: 'This unified abstraction allows standard tools like cat, grep, and echo to read hardware data, configure network drivers, and inspect memory without specialized APIs.'
    }),
    buildLinuxConcept({
      id: 'c-02-02',
      subChapterNumber: '02.2',
      command: 'pwd',
      title: 'Absolute vs Relative Paths',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'Paths starting from root "/" vs paths relative to current working directory "."',
      badges: ['Navigation', 'Paths'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-02-03',
      subChapterNumber: '02.3',
      command: 'ls -la /',
      title: '/ Root Directory',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'The top of the hierarchy: where all filesystems, devices, and directories originate',
      badges: ['Root', 'FHS'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-02-04',
      subChapterNumber: '02.4',
      command: 'ls -la /home',
      title: '/home',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'User personal workspaces, configuration dotfiles, documents, and code repositories',
      badges: ['Users', 'Workspace'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-02-05',
      subChapterNumber: '02.5',
      command: 'ls -la /etc | head -n 25',
      title: '/etc',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'Host-specific static system configurations and service configuration files',
      badges: ['Config', 'System', 'Admin'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-02-06',
      subChapterNumber: '02.6',
      command: 'ls -la /var/log',
      title: '/var',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'Variable data: persistent application logs, databases, spool caches, and transient mail',
      badges: ['Logs', 'Storage', 'Variable'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-02-07',
      subChapterNumber: '02.7',
      command: 'ls -la /usr/bin | head -n 20',
      title: '/usr',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'Universal system resources: shared read-only user binaries, libraries, and documentation',
      badges: ['Binaries', 'Libraries'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-02-08',
      subChapterNumber: '02.8',
      command: 'ls -l /bin /sbin',
      title: '/bin and /sbin',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'Essential user binaries (/bin) vs superuser administrative system binaries (/sbin)',
      badges: ['Binaries', 'Admin', 'Symlinks'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-02-09',
      subChapterNumber: '02.9',
      command: 'ls -ld /tmp',
      title: '/tmp',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'Scratch space for temporary files with world-writeable sticky bit (1777)',
      badges: ['Temporary', 'Permissions', 'StickyBit'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-02-10',
      subChapterNumber: '02.10',
      command: 'ls -la /opt',
      title: '/opt',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'Optional third-party standalone vendor software installations (Google Chrome, Docker)',
      badges: ['Software', 'Vendor', 'Packages'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-02-11',
      subChapterNumber: '02.11',
      command: 'ls -l /dev | head -n 25',
      title: '/dev',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'Special device node files: block devices (sda, nvme0n1), characters, /dev/null, /dev/urandom',
      badges: ['Devices', 'Hardware', 'Kernel'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-02-12',
      subChapterNumber: '02.12',
      command: 'cat /proc/cpuinfo | head -n 20',
      title: '/proc',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'Pseudo-filesystem providing live window into kernel memory, process table, and hardware state',
      badges: ['VirtualFS', 'Kernel', 'Processes'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-02-13',
      subChapterNumber: '02.13',
      command: 'ls -la /sys/class/net',
      title: '/sys',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'sysfs virtual filesystem exposing kernel device tree, buses, and hardware power states',
      badges: ['Kernel', 'Hardware', 'sysfs'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-02-14',
      subChapterNumber: '02.14',
      command: 'ls -la /boot',
      title: '/boot',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'Static bootloader files: vmlinuz Linux kernel image, initrd ramdisk, and GRUB configs',
      badges: ['Boot', 'GRUB', 'Kernel'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-02-15',
      subChapterNumber: '02.15',
      command: 'man hier',
      title: 'Filesystem Hierarchy Standard',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'FHS 3.0 specification defining standardized directory purpose across all distributions',
      badges: ['Standards', 'FHS', 'POSIX'],
      difficulty: 'Beginner'
    })
  ]
};

// ============================================================================
// CHAPTER 03: NAVIGATING LINUX (03.1 to 03.11)
// ============================================================================
export const CHAPTER_03: LinuxTopic = {
  id: 'ch-03',
  number: '03',
  title: 'Navigating Linux',
  iconName: 'Compass',
  description: 'Traverse directories effortlessly with pwd, ls, cd, shortcuts, tab completion, command history, and discovery.',
  concepts: [
    buildLinuxConcept({
      id: 'c-03-01',
      subChapterNumber: '03.1',
      command: 'pwd',
      title: 'pwd',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Print Working Directory: output current absolute location in the directory tree',
      badges: ['Navigation', 'Core', 'Builtin'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-03-02',
      subChapterNumber: '03.2',
      command: 'ls -la',
      title: 'ls',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'List directory contents with permissions, ownership, size, and modification timestamps',
      badges: ['Navigation', 'Files', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-03-03',
      subChapterNumber: '03.3',
      command: 'cd /var/log',
      title: 'cd',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Change Directory: navigate into directories using absolute or relative paths',
      badges: ['Navigation', 'Shell', 'Builtin'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-03-04',
      subChapterNumber: '03.4',
      command: 'cd /etc/nginx/sites-available',
      title: 'Absolute Navigation',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Navigating by specifying the full path from the filesystem root "/"',
      badges: ['Navigation', 'Paths'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-03-05',
      subChapterNumber: '03.5',
      command: 'cd ../../var/log',
      title: 'Relative Navigation',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Navigating based on your current location using ".", "..", and child directory names',
      badges: ['Navigation', 'Paths'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-03-06',
      subChapterNumber: '03.6',
      command: 'ls -a',
      title: '. and ..',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Current directory (.) and parent directory (..) pointers present in every folder',
      badges: ['Navigation', 'Inodes'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-03-07',
      subChapterNumber: '03.7',
      command: 'cd ~',
      title: '~ Home Directory',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'The tilde shortcut expanding to the active user home path ($HOME)',
      badges: ['Navigation', 'Shortcuts'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-03-08',
      subChapterNumber: '03.8',
      command: 'read -e -p "Tab to auto-complete: "',
      title: 'Tab Completion',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Save typing and eliminate path typos with readline automatic completion',
      badges: ['Productivity', 'Bash'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-03-09',
      subChapterNumber: '03.9',
      command: 'history | tail -n 15',
      title: 'Command History',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Inspect prior executed commands, replay with "!", and reverse search with Ctrl+R',
      badges: ['History', 'Bash', 'Productivity'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-03-10',
      subChapterNumber: '03.10',
      command: 'clear',
      title: 'clear',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Reset the terminal viewport canvas (or Ctrl+L) without wiping scrollback memory',
      badges: ['Terminal', 'Productivity'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-03-11',
      subChapterNumber: '03.11',
      command: 'tree -L 2',
      title: 'File and Directory Discovery',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Visual tree exploration and spatial discovery of nested directory structures',
      badges: ['Discovery', 'Tree'],
      difficulty: 'Beginner'
    })
  ]
};

// ============================================================================
// CHAPTER 04: FILE MANAGEMENT (04.1 to 04.13)
// ============================================================================
export const CHAPTER_04: LinuxTopic = {
  id: 'ch-04',
  number: '04',
  title: 'File Management',
  iconName: 'Copy',
  description: 'Create, organize, move, copy, link, and safely delete files and directories.',
  concepts: [
    buildLinuxConcept({
      id: 'c-04-01',
      subChapterNumber: '04.1',
      command: 'touch app.config',
      title: 'touch',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Create empty files or update access and modification timestamps on existing files',
      badges: ['Files', 'Creation'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-04-02',
      subChapterNumber: '04.2',
      command: 'mkdir -p project/{src,bin,docs}',
      title: 'mkdir',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Create new directory nodes, including nested parent structures with -p',
      badges: ['Directories', 'Creation'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-04-03',
      subChapterNumber: '04.3',
      command: 'cp -r src/ backup/',
      title: 'cp',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Copy files and directories recursively while preserving metadata and permissions',
      badges: ['Files', 'Copy'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-04-04',
      subChapterNumber: '04.4',
      command: 'mv old_name.txt new_name.txt',
      title: 'mv',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Move files across paths or rename in-place via atomic directory inode updates',
      badges: ['Files', 'Move'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-04-05',
      subChapterNumber: '04.5',
      command: 'rm test.log',
      title: 'rm',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Unlink files from directory inodes and mark data blocks as free for re-allocation',
      badges: ['Files', 'Deletion'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-04-06',
      subChapterNumber: '04.6',
      command: 'rm -ri temp_dir/',
      title: 'rm -r',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Recursive deletion of directory trees; safe practices and avoiding catastrophic loss',
      badges: ['Safety', 'Deletion'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-04-07',
      subChapterNumber: '04.7',
      command: 'ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/app',
      title: 'ln',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Link creation utility connecting filesystem paths to existing file data',
      badges: ['Links', 'Inodes'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-04-08',
      subChapterNumber: '04.8',
      command: 'ls -l /etc/nginx/sites-enabled/',
      title: 'Symbolic Links',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Soft links: pointer files storing the textual path of target files or directories',
      badges: ['Symlinks', 'Pointers'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-04-09',
      subChapterNumber: '04.9',
      command: 'ln original.txt hardlink.txt && ls -li',
      title: 'Hard Links',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Direct inode references pointing to identical underlying disk data blocks',
      badges: ['HardLinks', 'Inodes'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-04-10',
      subChapterNumber: '04.10',
      command: 'ls *.log',
      title: 'Wildcards',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Shell wildcard characters: * (any string), ? (single character), and [abc] (character set)',
      badges: ['Wildcards', 'Bash'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-04-11',
      subChapterNumber: '04.11',
      command: 'ls [a-z]*.{txt,md}',
      title: 'Globbing',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'How the shell expands filename matching patterns prior to passing arguments to commands',
      badges: ['Globbing', 'Expansion'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-04-12',
      subChapterNumber: '04.12',
      command: 'touch "clean-file-name-v1.txt"',
      title: 'File Naming',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Linux naming conventions: case sensitivity, avoiding spaces and special shell characters',
      badges: ['BestPractices', 'Naming'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-04-13',
      subChapterNumber: '04.13',
      command: 'rm -i dangerous_file.txt',
      title: 'Safe File Deletion',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'No trash can in CLI: confirmation flags (-i), trash-cli, and immutable attributes (chattr +i)',
      badges: ['Safety', 'Admin'],
      difficulty: 'Intermediate'
    })
  ]
};

// ============================================================================
// CHAPTER 05: VIEWING AND EDITING FILES (05.1 to 05.12)
// ============================================================================
export const CHAPTER_05: LinuxTopic = {
  id: 'ch-05',
  number: '05',
  title: 'Viewing and Editing Files',
  iconName: 'FileText',
  description: 'Inspect, paginate, stream, edit, and analyze text files in the terminal.',
  concepts: [
    buildLinuxConcept({
      id: 'c-05-01',
      subChapterNumber: '05.1',
      command: 'cat /etc/hosts',
      title: 'cat',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Concatenate and display entire file contents directly to standard output',
      badges: ['Viewing', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-05-02',
      subChapterNumber: '05.2',
      command: 'less /var/log/syslog',
      title: 'less',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Fast, memory-efficient pager allowing forward/backward navigation and search without loading entire file',
      badges: ['Pager', 'Logs', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-05-03',
      subChapterNumber: '05.3',
      command: 'more /var/log/syslog',
      title: 'more',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Legacy Unix pager advancing page by page through file output',
      badges: ['Pager', 'Legacy'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-05-04',
      subChapterNumber: '05.4',
      command: 'head -n 15 /etc/passwd',
      title: 'head',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Display the first N lines (default 10) of a file or incoming pipeline stream',
      badges: ['Filtering', 'Streams'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-05-05',
      subChapterNumber: '05.5',
      command: 'tail -n 20 /var/log/syslog',
      title: 'tail',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Display the last N lines (default 10) of files for recent error inspection',
      badges: ['Logs', 'Filtering'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-05-06',
      subChapterNumber: '05.6',
      command: 'tail -f /var/log/nginx/access.log',
      title: 'tail -f',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Follow mode: continuously stream newly appended lines in real-time as logs are written',
      badges: ['Observability', 'Realtime', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-05-07',
      subChapterNumber: '05.7',
      command: 'wc -l /etc/passwd',
      title: 'wc',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Word count: tally lines (-l), words (-w), and byte count (-c) in files or streams',
      badges: ['Metrics', 'Text'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-05-08',
      subChapterNumber: '05.8',
      command: 'file /bin/bash /etc/passwd',
      title: 'file',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Determine file type by reading header magic numbers instead of trusting file extensions',
      badges: ['Discovery', 'MagicNumbers'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-05-09',
      subChapterNumber: '05.9',
      command: 'nano config.yaml',
      title: 'nano',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Beginner-friendly terminal text editor with on-screen keyboard shortcuts',
      badges: ['Editors', 'Nano'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-05-10',
      subChapterNumber: '05.10',
      command: 'vim server.conf',
      title: 'vim Basics',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Modal editing: Normal mode, Insert mode (i), Command mode (:wq), and visual selection',
      badges: ['Vim', 'ModalEditing', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-05-11',
      subChapterNumber: '05.11',
      command: 'which vi vim',
      title: 'vi vs vim',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'The historic Bill Joy Vi editor vs Vim (Vi IMproved) with syntax highlighting and undo branches',
      badges: ['Vim', 'History'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-05-12',
      subChapterNumber: '05.12',
      command: 'sudoedit /etc/ssh/sshd_config',
      title: 'Editing Configuration Files',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Safe sysadmin editing: backup before edit (.bak), sudoedit, syntax checks, and service reload',
      badges: ['Admin', 'Security', 'BestPractices'],
      difficulty: 'Intermediate'
    })
  ]
};

export const PACK_01_CHAPTERS: LinuxTopic[] = [
  CHAPTER_01,
  CHAPTER_02,
  CHAPTER_03,
  CHAPTER_04,
  CHAPTER_05,
];
