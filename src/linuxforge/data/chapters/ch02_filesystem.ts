import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 02: THE LINUX FILESYSTEM (02.1 to 02.15)
// Deep Senior Engineer Curriculum Implementation
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
      title: 'Files and Directories',
      topicId: 'ch-02',
      topicNumber: '02',
      topicTitle: 'The Linux Filesystem',
      subtitle: 'In Unix and Linux, Everything is a File: regular files, directories, sockets, and devices',
      badges: ['Filesystem', 'FHS', 'Core'],
      difficulty: 'Beginner',
      quote: 'In Linux, everything is either a file or a running process. Directories are simply special files listing other file pointers.',
      whatIsIt: 'The foundational philosophy of Linux is "Everything is a File". Regular text documents, binary programs, directories (folders), hardware devices (/dev/sda), process telemetry (/proc/1), and network connections are all exposed through uniform POSIX file paths.',
      inSimpleWords: 'Unlike Windows which divides your computer into separate drive letters (C:\\, D:\\, E:\\), Linux has only ONE single unified tree. The very top is called "/" (root). Every drive, USB stick, or network share is plugged into a branch of this single tree.',
      whyDoYouNeedIt: 'Because everything is a file, you can inspect hardware, tune kernel settings, read network logs, and configure databases using the exact same simple tools: cat, grep, echo, and redirection operators.',
      realWorldScenario: 'You need to know how many CPU cores a server has. Instead of calling a complex Windows API, you simply read a file: "cat /proc/cpuinfo". To send data over a serial port, you write to a file: "echo text > /dev/ttyS0".',
      realWorldAnalogy: 'A single universal library filing cabinet. Whether a document is a paper letter, a photograph, an audio tape, or a keycard, the library assigns it an index card and file drawer location.',
      withoutVsWith: {
        without: {
          title: 'Without the Everything is a File Abstraction',
          items: ['Every hardware peripheral requires proprietary diagnostic SDKs', 'No piping between utilities and hardware devices', 'Configuration fragmented across binary registries and proprietary APIs'],
          outcome: 'Incompatible tooling, complex vendor lock-in, and fragile automation.'
        },
        with: {
          title: 'With the Everything is a File Abstraction',
          items: ['Unified POSIX system calls (open, read, write, close) across all data sources', 'Direct piping of streams into disk files, sockets, and device nodes', 'Human-readable plain text configuration files in /etc'],
          outcome: 'Maximum composability, auditable configurations, and predictable scripting.'
        }
      },
      blockDiagram: {
        title: 'Linux Universal VFS (Virtual Filesystem) Tree',
        subtitle: 'Every resource branches from the single "/" root node:',
        nodes: [
          { id: 'root', label: '/ (Root Directory)', simpleDef: 'The parent of all directories on the system', techDef: 'Inode 2 on root filesystem mountpoint', badge: 'Apex', color: '#f59e0b' },
          { id: 'etc', label: '/etc (Configuration)', simpleDef: 'Text configuration files for services', techDef: 'Host-specific static configuration', badge: 'Config', color: '#38bdf8' },
          { id: 'var', label: '/var (Variable Data)', simpleDef: 'Logs, databases, runtime spools', techDef: 'Dynamic runtime application state', badge: 'Logs', color: '#a855f7' },
          { id: 'dev', label: '/dev (Device Nodes)', simpleDef: 'Hard drives, serial ports, /dev/null', techDef: 'Virtual filesystem of device major/minor nodes', badge: 'Hardware', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'VFS (Virtual Filesystem)', simple: 'The kernel layer that makes all filesystems behave identically.', technical: 'Kernel abstraction providing standard file_operations struct for ext4, XFS, NFS, and Btrfs.' },
        { term: 'Directory', simple: 'A folder that holds files.', technical: 'A special file containing a list of filename-to-inode mappings.' }
      ],
      syntaxCode: 'ls -ld /',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory contents' },
        { token: '-ld', role: 'flag', explanation: 'Long format (-l) and directory itself (-d) rather than its contents' },
        { token: '/', role: 'path', explanation: 'Filesystem apex root directory' }
      ],
      variations: [
        { syntax: 'file /dev/sda', title: 'Inspect Device File Type', whatItDoes: 'Identifies /dev/sda as a block special device file', whenToUse: 'When verifying whether a path is a regular file, directory, or device' },
        { syntax: 'stat /', title: 'Show Inode Metadata', whatItDoes: 'Displays Inode number, permissions, block count, and timestamps for root', whenToUse: 'When inspecting low-level filesystem metadata' }
      ],
      beforeAfter: {
        before: '$ ls -ld /\n[Querying root inode...]',
        after: 'drwxr-xr-x 19 root root 4096 Sep 12 12:00 /',
        explanation: 'Linux outputs the directory permission bits ("d" for directory), ownership by root, and 4KB inode block size.'
      },
      expectedOutput: 'drwxr-xr-x 19 root root 4096 /',
      whatChanges: ['Reads directory metadata of / via stat system call.'],
      whatDoesNotChange: ['Filesystem contents and permissions remain untouched.'],
      safeRecovery: 'ls -ld is read-only. 100% safe.',
      commonMistakes: [
        { mistake: 'Looking for a "C: drive" in Linux', whyItHappens: 'Habit from Windows operating systems.', howToFix: 'In Linux, all physical disks are mounted into directories within the single "/" tree (e.g., /mnt/drive or /data).' },
        { mistake: 'Deleting a directory with regular rm command', whyItHappens: 'Linux protects directories from accidental file deletion.', howToFix: 'Use "rmdir" for empty directories or "rm -r" for directories with contents.' }
      ]
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
      difficulty: 'Beginner',
      quote: 'An absolute path tells you where a file is from the root of the universe; a relative path tells you where it is from where you stand.',
      whatIsIt: 'An Absolute Path always begins with a forward slash "/" and describes the exact location from the root directory (e.g., /var/log/nginx/access.log). A Relative Path does NOT start with "/" and depends entirely on your Current Working Directory (e.g., ../nginx/access.log or ./config.json).',
      inSimpleWords: 'Imagine giving directions. Absolute: "Drive to 1600 Pennsylvania Ave, Washington DC" (unambiguous anywhere on Earth). Relative: "Walk two doors down on the right" (only works if you are standing in the exact same hallway).',
      whyDoYouNeedIt: 'Using the wrong path type in automated scripts or cron jobs causes catastrophic failures because cron executes in /root or /home without your current shell context.',
      realWorldScenario: 'You write a backup cron script that executes "tar -czf backup.tar.gz data/". The backup fails at 2 AM with "data/: No such file" because cron runs with cwd=/root instead of your project directory. Rewriting it with absolute paths ("/var/backups/data/") solves it permanently.',
      realWorldAnalogy: 'GPS coordinates (37.7749° N, 122.4194° W - absolute) versus "turn left past the coffee shop" (relative).',
      terms: [
        { term: 'Absolute Path', simple: 'A path starting with / that works from any directory.', technical: 'A canonical path resolved directly from the root inode regardless of process current working directory (CWD).' },
        { term: 'Relative Path', simple: 'A path starting without / that works relative to where you are.', technical: 'A path evaluated against the task_struct->fs->pwd pointer of the current process.' }
      ],
      syntaxCode: 'realpath [RELATIVE_PATH]',
      syntaxTokens: [
        { token: 'realpath', role: 'command', explanation: 'Resolve and print canonical absolute path' },
        { token: 'config/app.yml', role: 'argument', explanation: 'Relative path evaluated against current working directory' }
      ],
      variations: [
        { syntax: 'pwd -P', title: 'Physical Working Directory', whatItDoes: 'Resolves all symbolic links to show the true physical absolute path', whenToUse: 'When navigating symlinked directories' },
        { syntax: 'cd -', title: 'Toggle Previous Directory', whatItDoes: 'Swaps current directory to previous directory ($OLDPWD)', whenToUse: 'When quickly toggling between two folders' }
      ],
      beforeAfter: {
        before: '$ pwd\n/var/www/html\n$ realpath ../log',
        after: '/var/www/log',
        explanation: 'Linux evaluates the relative parent reference ".." against the current directory "/var/www/html" to compute the absolute path.'
      },
      expectedOutput: '/var/www/log',
      whatChanges: ['Translates relative path tokens in memory.'],
      whatDoesNotChange: ['No files or directory pointers are modified.'],
      safeRecovery: 'If you get lost in relative navigation, type "cd ~" to return to your home directory or "cd /" to go to root.',
      commonMistakes: [
        { mistake: 'Writing relative paths inside systemd service files or cron jobs', whyItHappens: 'Assuming the daemon will run from the directory where you wrote the script.', howToFix: 'Always use absolute paths in systemd Unit files and crontab definitions.' },
        { mistake: 'Typing "cd /home/user/projects" when you meant relative "cd projects"', whyItHappens: 'Over-specifying paths or omitting the leading slash accidentally.', howToFix: 'Use tab completion to verify whether the path exists before hitting Enter.' }
      ]
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
      difficulty: 'Beginner',
      quote: 'The root directory "/" is the ancestor of every file and folder in the operating system.',
      whatIsIt: 'The Root Directory, denoted by a single slash "/", is the top-level directory of the Linux filesystem hierarchy. Every partition, external drive, virtual filesystem, and system directory (/etc, /var, /usr, /home) is mounted as a subordinate node beneath "/".',
      inSimpleWords: 'Think of a tree trunk. The root "/" is the base of the trunk planted in the ground. Every branch, twig, and leaf on the entire tree connects back to this single trunk.',
      whyDoYouNeedIt: 'Understanding "/" prevents confusing the root directory ("/") with the root user account ("/root", the home directory of the superuser).',
      realWorldScenario: 'A developer runs "rm -rf /*" thinking it only cleans the current folder. Because "/" is the root of the entire system, this command begins wiping the operating system, corrupting the server permanently.',
      realWorldAnalogy: 'The foundation slab of a skyscraper. Every floor, elevator shaft, and office suite rests on top of this single foundation.',
      terms: [
        { term: 'Root Directory (/)', simple: 'The top folder of the entire computer.', technical: 'The root mountpoint represented by filesystem inode 2, mounted read-only during early boot then remounted read-write.' },
        { term: 'Root User (/root)', simple: 'The super administrator\'s private home folder.', technical: 'The home directory of UID 0, intentionally placed outside /home so it is accessible if /home partition fails to mount.' }
      ],
      syntaxCode: 'ls -la /',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory entries' },
        { token: '-la', role: 'flag', explanation: 'Long format list (-l) showing all hidden dotfiles (-a)' },
        { token: '/', role: 'path', explanation: 'Target root directory' }
      ],
      variations: [
        { syntax: 'df -h /', title: 'Check Root Partition Usage', whatItDoes: 'Shows disk space, used space, and percentage full for root partition', whenToUse: 'When auditing server storage health' },
        { syntax: 'find / -maxdepth 1 -type d', title: 'List Top-Level Root Folders', whatItDoes: 'Shows only the direct subdirectories branching off /', whenToUse: 'Quick architectural overview of top-level directories' }
      ],
      beforeAfter: {
        before: '$ ls -la /\n[Reading root filesystem directory table...]',
        after: 'drwxr-xr-x  19 root root  4096 Sep 12 10:00 .\ndrwxr-xr-x  19 root root  4096 Sep 12 10:00 ..\nlrwxrwxrwx   1 root root     7 Apr 22 10:00 bin -> usr/bin\ndrwxr-xr-x   4 root root  4096 Sep 12 10:01 boot\ndrwxr-xr-x  18 root root  4200 Sep 28 08:00 dev\ndrwxr-xr-x 135 root root 12288 Sep 28 09:30 etc\ndrwxr-xr-x   3 root root  4096 Sep 12 10:05 home',
        explanation: 'Displays the standardized top-level directories branching directly from the root inode.'
      },
      expectedOutput: 'bin -> usr/bin\nboot\ndev\netc\nhome\nvar',
      whatChanges: ['Reads directory entries of /.'],
      whatDoesNotChange: ['No files or mounts are altered.'],
      safeRecovery: 'ls is read-only. Never execute "rm -rf /" or "chmod -R 777 /".',
      commonMistakes: [
        { mistake: 'Confusing / (root directory) with /root (root user home)', whyItHappens: 'Both use the word "root" in spoken conversation.', howToFix: 'Remember: "/" is for the whole system; "/root" is the private workspace of the superuser.' },
        { mistake: 'Storing user applications or large downloads directly inside /', whyItHappens: 'Lack of discipline in organizing server files.', howToFix: 'Follow FHS guidelines: put apps in /opt or /var/www, not in the root directory.' }
      ]
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
      difficulty: 'Beginner',
      quote: '/home is the personal sanctuary for standard users where they have full read and write permissions without sudo.',
      whatIsIt: '/home is the designated directory holding personal workspaces for regular users on the system (e.g., /home/abhijeet, /home/ubuntu). Each user owns their directory and stores their personal configuration dotfiles (.bashrc, .ssh, .gitconfig), documents, code repositories, and downloaded files.',
      inSimpleWords: 'Think of /home as the residential apartment building of the server. Every user gets their own private apartment (folder) with their own key. User Alice cannot walk into User Bob\'s apartment unless Bob gives explicit permission.',
      whyDoYouNeedIt: 'Separating user data into /home allows system administrators to place /home on a dedicated encrypted disk partition or network storage, ensuring user data survives operating system re-installations.',
      realWorldScenario: 'You log in as a developer to a shared Linux workstation. You want to install a Python virtual environment and clone a git repo. You do this in your /home directory without needing root permissions or sudo rights.',
      realWorldAnalogy: 'Private lockers in a gym. The building manager runs the gym (root), but your personal clothes and gear remain in your private locker (/home/user).',
      terms: [
        { term: 'Home Directory (~)', simple: 'Your private folder represented by the tilde symbol.', technical: 'The path designated in field 6 of /etc/passwd and expanded by the $HOME shell variable.' },
        { term: 'Dotfile', simple: 'A configuration file starting with a period that is hidden by default.', technical: 'Files like ~/.bashrc or ~/.profile whose first character is ASCII 46, ignored by default ls.' }
      ],
      syntaxCode: 'ls -la /home/[USERNAME]',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory entries' },
        { token: '-la', role: 'flag', explanation: 'Show details including hidden dotfiles' },
        { token: '/home', role: 'path', explanation: 'Standard parent directory for user homes' }
      ],
      variations: [
        { syntax: 'echo $HOME', title: 'Print Active User Home', whatItDoes: 'Outputs current user home directory path', whenToUse: 'Inside automation scripts' },
        { syntax: 'cd ~', title: 'Jump to Home', whatItDoes: 'Instantly navigates current shell to user home directory', whenToUse: 'Quick return to base workspace' }
      ],
      beforeAfter: {
        before: '$ ls -la /home\n[Listing user workspaces...]',
        after: 'drwxr-xr-x  3 root root 4096 Sep 12 10:00 .\ndrwxr-xr-x 19 root root 4096 Sep 12 10:00 ..\ndrwxr-x--- 14 dev  dev  4096 Sep 28 11:20 dev',
        explanation: 'Shows user "dev" owns their directory /home/dev with permissions restricting other users.'
      },
      expectedOutput: 'drwxr-x--- dev dev /home/dev',
      whatChanges: ['Reads directory entries in /home.'],
      whatDoesNotChange: ['User files are untouched.'],
      safeRecovery: 'If your user permissions in /home get corrupted, root can fix them with "sudo chown -R user:user /home/user".',
      commonMistakes: [
        { mistake: 'Running "sudo npm install" or "sudo git clone" inside your /home directory', whyItHappens: 'Habit of using sudo unnecessarily.', howToFix: 'Never use sudo inside /home; it creates root-owned files that your normal user cannot edit or delete.' },
        { mistake: 'Expecting /home to contain the root user\'s home directory', whyItHappens: 'Assuming all users live in /home.', howToFix: 'The superuser root lives in /root, not /home/root.' }
      ]
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
      difficulty: 'Beginner',
      quote: 'If you want to understand how a Linux server is configured, 95% of the answers live in plain text files inside /etc.',
      whatIsIt: '/etc holds all host-specific system-wide configuration files and directories. Web server configs (nginx.conf), network interfaces (netplan), SSH server keys and policies (sshd_config), user account databases (passwd, shadow), and systemd service configs all reside here as human-readable plain text.',
      inSimpleWords: 'Think of /etc as the master settings control panel of your operating system. Instead of hidden binary registry keys like Windows, Linux uses transparent text files. Want to change SSH ports? Edit /etc/ssh/sshd_config with a text editor.',
      whyDoYouNeedIt: 'Because configurations in /etc are plain text, administrators can back them up, put them into Git repositories (etckeeper), and automate them using Ansible, Puppet, or Terraform.',
      realWorldScenario: 'You need to harden an Nginx web server against SSL vulnerabilities. You open /etc/nginx/nginx.conf, disable TLS 1.0 and 1.1, test the configuration with "nginx -t", and reload the service. All changes took place in /etc.',
      realWorldAnalogy: 'The wiring and fuse box blueprint in the basement of an office building. Every circuit, switch, and breaker policy is labeled on paper in that box.',
      terms: [
        { term: '/etc (Editable Text Configuration)', simple: 'The folder storing all server configuration files.', technical: 'Historically "etcetera", now codified in FHS as host-specific static configuration files.' },
        { term: 'Syntax Validation', simple: 'Testing a configuration file for errors before restarting a service.', technical: 'Running service-specific linters (e.g. nginx -t, sshd -t) to prevent crashing live daemons.' }
      ],
      syntaxCode: 'ls -la /etc',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory contents' },
        { token: '-la', role: 'flag', explanation: 'Show long format and hidden files' },
        { token: '/etc', role: 'path', explanation: 'System configuration directory' }
      ],
      variations: [
        { syntax: 'ls -l /etc/nginx', title: 'Inspect Nginx Configs', whatItDoes: 'Lists virtual host configurations and modules', whenToUse: 'When deploying web applications' },
        { syntax: 'cat /etc/hosts', title: 'Inspect Local DNS Overrides', whatItDoes: 'Reads static IP-to-hostname mappings', whenToUse: 'When testing local network resolution' }
      ],
      beforeAfter: {
        before: '$ ls -d /etc/*.conf | head -n 4\n[Querying system configuration files...]',
        after: '/etc/deluser.conf\n/etc/fuse.conf\n/etc/gai.conf\n/etc/host.conf',
        explanation: 'Lists plain text system configuration files governing system behavior.'
      },
      expectedOutput: '/etc/hosts\n/etc/resolv.conf\n/etc/fstab',
      whatChanges: ['Reads directory contents of /etc.'],
      whatDoesNotChange: ['Configurations remain unaltered.'],
      safeRecovery: 'Always create a backup copy before editing any file in /etc: "sudo cp /etc/app.conf /etc/app.conf.bak".',
      commonMistakes: [
        { mistake: 'Editing files in /etc without making a backup copy first', whyItHappens: 'Overconfidence when making quick edits.', howToFix: 'Always run "sudo cp file.conf file.conf.orig" before modifying production configs.' },
        { mistake: 'Restarting a production service without validating the config syntax first', whyItHappens: 'Typo in /etc/nginx/nginx.conf causes the service to fail to start, causing immediate outage.', howToFix: 'Always run "nginx -t" or "sshd -t" before reloading.' }
      ]
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
      difficulty: 'Beginner',
      quote: '/var is the dynamic runtime storehouse: logs grow here, databases write here, and caches accumulate here.',
      whatIsIt: '/var ("variable") stores data expected to change constantly during normal system operation. Key subdirectories include /var/log (system and service logs), /var/lib (persistent database state, e.g. PostgreSQL, Docker containers), /var/cache (package manager download caches), and /var/spool (queued print jobs or cron batches).',
      inSimpleWords: 'If /etc is the recipe book (static configuration), /var is the kitchen counter where cooking actually happens (spilled flour, dirty dishes, food in the oven). It changes every second the computer runs.',
      whyDoYouNeedIt: 'Because /var grows dynamically, production servers often allocate /var to a separate disk partition. If an application goes rogue and fills /var with logs, the root filesystem ("/") does not fill up, preventing the OS from crashing.',
      realWorldScenario: 'An e-commerce site experiences a denial-of-service attack. Nginx writes 50GB of error logs in two hours. Because logs live in /var/log, only the /var partition fills up; the kernel and SSH daemon stay alive, allowing sysadmins to log in and remediate.',
      realWorldAnalogy: 'The transaction ledger and filing room of a bank. Every deposit, withdrawal, and receipt is stamped and filed here as customers conduct business.',
      terms: [
        { term: '/var/log', simple: 'The primary folder where all application and system logs are written.', technical: 'Standard FHS directory where rsyslog, journald, and standalone daemons write operational audit records.' },
        { term: 'Log Rotation', simple: 'Compressing and deleting old logs so the hard drive does not fill up.', technical: 'The automated logrotate daemon that rotates, compresses (.gz), and prunes logs based on age or size.' }
      ],
      syntaxCode: 'ls -lh /var/log',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory entries' },
        { token: '-lh', role: 'flag', explanation: 'Long format (-l) with human-readable file sizes (-h)' },
        { token: '/var/log', role: 'path', explanation: 'System log directory' }
      ],
      variations: [
        { syntax: 'du -sh /var/log', title: 'Check Total Log Size', whatItDoes: 'Calculates aggregate disk space consumed by logs', whenToUse: 'When diagnosing disk full alerts' },
        { syntax: 'ls -la /var/lib/docker', title: 'Inspect Docker Storage', whatItDoes: 'Shows container images, layers, and volumes managed by Docker engine', whenToUse: 'When managing container storage footprints' }
      ],
      beforeAfter: {
        before: '$ du -sh /var/log\n[Calculating directory usage...]',
        after: '248M\t/var/log',
        explanation: 'Reports that system logs are currently consuming 248 Megabytes of storage on /var.'
      },
      expectedOutput: 'syslog\nauth.log\njournal\nnginx',
      whatChanges: ['Reads directory contents of /var/log.'],
      whatDoesNotChange: ['Logs and database files remain intact.'],
      safeRecovery: 'Never run "rm -rf /var/log" to free space; services holding open file descriptors will not release disk space. Instead truncate with "truncate -s 0 /var/log/file.log".',
      commonMistakes: [
        { mistake: 'Deleting an active log file with "rm /var/log/app.log" when disk is full', whyItHappens: 'Hoping to free space immediately.', howToFix: 'The running process still holds the inode open, so disk space is NOT freed. Use "> /var/log/app.log" to truncate it safely.' },
        { mistake: 'Not monitoring /var/lib/docker or /var/lib/mysql growth', whyItHappens: 'Containers and database tables grow invisibly over time.', howToFix: 'Set up monitoring alerts on /var disk percentage (df -h /var).' }
      ]
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
      difficulty: 'Beginner',
      quote: '/usr is not for user personal files; it stands for User System Resources, housing all installed software binaries and libraries.',
      whatIsIt: '/usr ("User System Resources") is the secondary hierarchy holding all user-accessible executable programs (/usr/bin), shared libraries (/usr/lib), system architecture headers (/usr/include), and shared read-only application data and documentation (/usr/share). In modern Linux distros, /bin and /sbin are symbolic links pointing directly into /usr/bin.',
      inSimpleWords: 'Think of /usr as the "Program Files" directory of Linux. When you install Python, Git, Node.js, or Nginx through your package manager, their executable binaries are stored in /usr/bin and their shared libraries go into /usr/lib.',
      whyDoYouNeedIt: 'The /usr directory is designed to be shareable and read-only. In large corporate networks or container clusters, multiple Linux nodes can mount the exact same /usr partition over the network, ensuring identical software across hundreds of servers.',
      realWorldScenario: 'You run "which python3" and get "/usr/bin/python3". You check its shared libraries using "ldd /usr/bin/python3" and see that it dynamically links against standard C libraries inside "/usr/lib/x86_64-linux-gnu/".',
      realWorldAnalogy: 'The central municipal library in a city. Citizens (users) can visit and read all books, reference manuals, and maps, but they do not edit or deface the public books.',
      terms: [
        { term: '/usr/bin', simple: 'The primary folder containing all standard commands and installed programs.', technical: 'FHS directory containing non-essential and essential user binary executables.' },
        { term: 'Shared Library (.so)', simple: 'The Linux version of a Windows DLL file.', technical: 'Dynamic Shared Object loaded into process memory by the dynamic linker (ld.so) at runtime.' }
      ],
      syntaxCode: 'ls -la /usr/bin',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory entries' },
        { token: '-la', role: 'flag', explanation: 'Show long format details' },
        { token: '/usr/bin', role: 'path', explanation: 'Standard system user binary executable directory' }
      ],
      variations: [
        { syntax: 'ls /usr/local/bin', title: 'Local Custom Binaries', whatItDoes: 'Lists custom software installed by the local administrator outside the package manager', whenToUse: 'When finding hand-compiled or custom scripts' },
        { syntax: 'dpkg -S /usr/bin/git', title: 'Find Owning Package', whatItDoes: 'Identifies which Debian package installed a specific binary in /usr/bin', whenToUse: 'When auditing package origins' }
      ],
      beforeAfter: {
        before: '$ which git\n[Searching $PATH directories...]',
        after: '/usr/bin/git',
        explanation: 'Confirms git is installed as a standard package binary inside /usr/bin.'
      },
      expectedOutput: '/usr/bin/curl\n/usr/bin/git\n/usr/bin/python3',
      whatChanges: ['Reads directory contents of /usr/bin.'],
      whatDoesNotChange: ['Binaries remain intact and unexecutable.'],
      safeRecovery: 'Non-destructive read operation.',
      commonMistakes: [
        { mistake: 'Assuming /usr is where "users" store personal files', whyItHappens: 'Name confusion ("usr" vs "user").', howToFix: 'User files live in /home/username. /usr is for User System Resources (installed programs).' },
        { mistake: 'Manually putting custom shell scripts into /usr/bin', whyItHappens: 'Wanting scripts to be accessible globally.', howToFix: 'Put custom non-packaged scripts in /usr/local/bin or ~/.local/bin so package updates do not overwrite them.' }
      ]
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
      difficulty: 'Beginner',
      quote: '/bin contains basic commands for all users; /sbin contains administrative power tools intended for system operators.',
      whatIsIt: 'Historically, /bin held essential user binaries needed in single-user mode (sh, ls, cp), while /sbin held system/admin binaries required for system boot and disaster recovery (fdisk, reboot, iptables, fsck). In modern Linux distributions (via the "UsrMerge" initiative), /bin and /sbin are symlinks pointing directly to /usr/bin.',
      inSimpleWords: '/bin was the everyday toolkit everyone could use. /sbin was the restricted cabinet with chainsaws and blowtorches that only the building manager (root) was supposed to touch. Today, they are merged for simplicity.',
      whyDoYouNeedIt: 'Understanding the distinction explains why normal users can run "ip" or "ping" from /bin, but commands like "fdisk" or "iptables" historically lived in /sbin and were absent from a regular user\'s default $PATH.',
      realWorldScenario: 'A developer logs in and types "fdisk -l" to inspect disks. Bash reports "fdisk: command not found". The tool IS installed in /sbin/fdisk, but /sbin was not in the developer\'s unprivileged $PATH variable.',
      realWorldAnalogy: 'Standard tools in an office kitchen (forks, microwave - /bin) versus the high-voltage electrical breakers locked behind the maintenance door (/sbin).',
      terms: [
        { term: '/bin', simple: 'Essential command binaries for every user.', technical: 'Historically binaries available before /usr was mounted; now symlinked to /usr/bin.' },
        { term: '/sbin', simple: 'System binaries for superuser administration.', technical: 'System admin binaries requiring root privileges (e.g. init, mkfs, iptables).' },
        { term: 'UsrMerge', simple: 'The modern modernization merging /bin, /sbin, and /lib into /usr.', technical: 'Distribution standard where /bin -> /usr/bin, eliminating duplicate directory trees.' }
      ],
      syntaxCode: 'ls -ld /bin /sbin',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory file entries' },
        { token: '-ld', role: 'flag', explanation: 'Long format for directories themselves' },
        { token: '/bin', role: 'path', explanation: 'Essential binary directory' },
        { token: '/sbin', role: 'path', explanation: 'System administrative binary directory' }
      ],
      variations: [
        { syntax: 'echo $PATH', title: 'Inspect Executable Search Path', whatItDoes: 'Prints colon-delimited directories searched by shell for commands', whenToUse: 'When commands return "command not found"' },
        { syntax: 'readlink -f /bin', title: 'Resolve UsrMerge Symlink', whatItDoes: 'Shows target canonical path (/usr/bin)', whenToUse: 'When verifying UsrMerge adoption on current distro' }
      ],
      beforeAfter: {
        before: '$ ls -ld /bin /sbin\n[Checking directory symlinks...]',
        after: 'lrwxrwxrwx 1 root root 7 Apr 22 10:00 /bin -> usr/bin\nlrwxrwxrwx 1 root root 7 Apr 22 10:00 /sbin -> usr/bin',
        explanation: 'Confirms modern UsrMerge architecture where /bin and /sbin link into /usr/bin.'
      },
      expectedOutput: '/bin -> usr/bin\n/sbin -> usr/bin',
      whatChanges: ['Reads directory symlink status.'],
      whatDoesNotChange: ['File targets remain unchanged.'],
      safeRecovery: 'Never delete or unlink /bin or /sbin! Doing so breaks almost every command on the system.',
      commonMistakes: [
        { mistake: 'Assuming commands in /sbin cannot be executed by normal users', whyItHappens: 'Thinking the folder location acts as a security permission gate.', howToFix: 'Folder location is not security; file permissions are. Non-root users can execute /sbin/ip or /sbin/fdisk if execute bits permit, though privileged actions will fail without sudo.' },
        { mistake: 'Accidentally deleting the /bin symlink', whyItHappens: 'Mistaken cleanup script execution.', howToFix: 'Use LD_PRELOAD or busybox static binary to restore "ln -s usr/bin /bin".' }
      ]
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
      difficulty: 'Beginner',
      quote: '/tmp is the public scratchpad of Linux: everyone can write to it, but only you can delete your own files.',
      whatIsIt: '/tmp is the designated directory for temporary scratch files created by users, compilers, and running applications. It features a unique POSIX permission setting: the Sticky Bit (mode 1777: "drwxrwxrwt"). This allows ANY user to create files in /tmp, but prevents users from deleting or renaming files created by others.',
      inSimpleWords: 'Think of /tmp as a public whiteboard in a conference room. Anyone can walk up and write notes. But a special magic rule (the sticky bit) prevents people from erasing someone else\'s notes.',
      whyDoYouNeedIt: 'Applications constantly need temporary scratchpad files (compiling C code, image processing, session caches). /tmp provides a guaranteed writable location without requiring admin rights.',
      realWorldScenario: 'On modern Linux servers, /tmp is mounted as a "tmpfs" in-memory filesystem. Writing temporary files to /tmp means writing directly to RAM at 10 Gigabytes per second with zero disk wear, and files are automatically erased upon system reboot.',
      realWorldAnalogy: 'A public park picnic table. Anyone can sit and eat their lunch, but you are not allowed to throw away another person\'s backpack.',
      terms: [
        { term: 'Sticky Bit (t)', simple: 'A permission preventing users from deleting other users\' files in a shared folder.', technical: 'Special permission bit (chmod +t or octal 1000) enforcing that only the file owner or root can unlink files in that directory.' },
        { term: 'tmpfs', simple: 'A temporary filesystem that lives in RAM memory instead of a hard disk.', technical: 'Virtual memory filesystem dynamically allocating pages from RAM and swap.' }
      ],
      syntaxCode: 'ls -ld /tmp',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory entry' },
        { token: '-ld', role: 'flag', explanation: 'Long format of the directory itself' },
        { token: '/tmp', role: 'path', explanation: 'Temporary scratch directory' }
      ],
      variations: [
        { syntax: 'mktemp', title: 'Create Secure Temp File', whatItDoes: 'Creates an unguessable unique file in /tmp with mode 0600', whenToUse: 'In shell scripts to prevent symlink race conditions' },
        { syntax: 'df -h /tmp', title: 'Check /tmp Filesystem Type', whatItDoes: 'Checks if /tmp is backed by physical disk or RAM tmpfs', whenToUse: 'When optimizing high-throughput temporary I/O' }
      ],
      beforeAfter: {
        before: '$ ls -ld /tmp\n[Inspecting /tmp permission bits...]',
        after: 'drwxrwxrwt 22 root root 4096 Sep 28 12:00 /tmp',
        explanation: 'Note the trailing "t" in permissions: mode 1777 with the sticky bit actively enforced.'
      },
      expectedOutput: 'drwxrwxrwt root root /tmp',
      whatChanges: ['Reads directory attributes.'],
      whatDoesNotChange: ['Existing temporary files are unaffected.'],
      safeRecovery: 'If someone removes the sticky bit from /tmp, restore it with "sudo chmod 1777 /tmp".',
      commonMistakes: [
        { mistake: 'Storing persistent database or production application files inside /tmp', whyItHappens: 'Convenience of writable permissions.', howToFix: 'Never store persistent data in /tmp; systemd-tmpfiles and reboots purge /tmp automatically.' },
        { mistake: 'Changing permissions on /tmp to 755 or 777 without sticky bit', whyItHappens: 'Troubleshooting permissions poorly.', howToFix: 'Always maintain 1777 (drwxrwxrwt); without the sticky bit, any user can delete other users\' sockets.' }
      ]
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
      difficulty: 'Beginner',
      quote: '/opt is reserved for self-contained third-party software packages that do not scatter files across the filesystem.',
      whatIsIt: '/opt ("optional") is the FHS directory designated for installing self-contained, add-on third-party software packages. Unlike native Linux packages (which split their files across /usr/bin, /usr/lib, and /etc), software installed in /opt stores all its binaries, libraries, configs, and assets inside a single dedicated folder (e.g. /opt/google/chrome, /opt/gitlab, /opt/docker).',
      inSimpleWords: 'Think of /opt as the "self-contained suite" hotel. Instead of unpacking and scattering clothes in every room across the house, a guest in /opt keeps everything neatly inside their single suitcase.',
      whyDoYouNeedIt: 'Uninstalling vendor software in /opt is as simple as deleting one folder ("rm -rf /opt/vendor-app"), with zero leftover files or broken dependencies scattered across your operating system.',
      realWorldScenario: 'You are deploying an enterprise monitoring agent (Datadog or Splunk) from a vendor tarball. Rather than mixing its proprietary libraries with your Ubuntu system libraries in /usr/lib, you extract it cleanly into /opt/datadog-agent.',
      realWorldAnalogy: 'Portable desktop software on a flash drive versus a program that installs registry keys and system DLLs everywhere.',
      terms: [
        { term: '/opt', simple: 'Directory for self-contained third-party applications.', technical: 'FHS standardized hierarchy for static add-on application software packages.' },
        { term: 'Self-Contained Package', simple: 'A program that bundles all its required libraries in its own folder.', technical: 'Binaries utilizing RPATH or relative shared object paths to run independent of system glibc/libs.' }
      ],
      syntaxCode: 'ls -la /opt',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory entries' },
        { token: '-la', role: 'flag', explanation: 'Show long format and hidden files' },
        { token: '/opt', role: 'path', explanation: 'Optional software directory' }
      ],
      variations: [
        { syntax: 'du -sh /opt/*', title: 'Audit Vendor App Sizes', whatItDoes: 'Calculates storage used by each vendor software package', whenToUse: 'When auditing server disk usage' },
        { syntax: 'ls -l /opt/google/chrome', title: 'Inspect Chrome Install', whatItDoes: 'Shows bundled chrome binary, locales, and sandbox drivers', whenToUse: 'When inspecting vendor package structures' }
      ],
      beforeAfter: {
        before: '$ ls -la /opt\n[Inspecting optional software packages...]',
        after: 'drwxr-xr-x  4 root root 4096 Sep 12 10:00 .\ndrwxr-xr-x 19 root root 4096 Sep 12 10:00 ..\ndrwxr-xr-x  3 root root 4096 Sep 15 14:00 google\ndrwxr-xr-x  5 root root 4096 Sep 20 09:12 gitlab',
        explanation: 'Displays standalone third-party software packages installed under /opt.'
      },
      expectedOutput: 'google\ngitlab',
      whatChanges: ['Reads directory entries in /opt.'],
      whatDoesNotChange: ['Software packages remain intact.'],
      safeRecovery: 'Non-destructive query.',
      commonMistakes: [
        { mistake: 'Confusing /opt with /usr/local', whyItHappens: 'Both hold software outside default distro repositories.', howToFix: '/usr/local follows standard subdirectories (/usr/local/bin, lib, share). /opt holds self-contained single-folder bundles (/opt/appname/...).' },
        { mistake: 'Forgetting to add /opt/app/bin to your user $PATH', whyItHappens: 'Wondering why typing the app name says "command not found".', howToFix: 'Create a symlink in /usr/local/bin (ln -s /opt/app/bin/app /usr/local/bin/app) or export PATH in ~/.bashrc.' }
      ]
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
      difficulty: 'Intermediate',
      quote: '/dev is not on your hard drive; it is a live synthetic filesystem populated by udev representing physical and virtual hardware devices.',
      whatIsIt: '/dev ("devices") is a pseudo-filesystem (devtmpfs) populated dynamically by the Linux kernel and the udev daemon. It contains Special Device Files: Block Devices (disks like /dev/sda, /dev/nvme0n1 that transfer blocks of data), Character Devices (keyboards, serial ports that transfer data character-by-character), and Pseudo-Devices (/dev/null, /dev/zero, /dev/urandom).',
      inSimpleWords: 'In Linux, hardware devices are treated like files. Want to read random cryptographic numbers? Read the file /dev/urandom. Want to discard useless terminal output? Throw it into the black hole file /dev/null.',
      whyDoYouNeedIt: 'Understanding /dev allows you to partition disks (fdisk /dev/nvme0n1), wipe drives securely (dd if=/dev/zero of=/dev/sdX), test audio hardware, and silence command output.',
      realWorldScenario: 'You are writing an automation script that outputs hundreds of noisy lines you do not care about. You redirect stdout to the bit-bucket: "command > /dev/null 2>&1". Linux silently consumes and discards the bytes at zero CPU cost.',
      realWorldAnalogy: 'Electrical outlets on the wall. The wall looks uniform, but plugging into Outlet A connects to high-voltage power (/dev/sda), while Outlet B connects to telephone lines (/dev/ttyS0).',
      terms: [
        { term: 'Block Device (b)', simple: 'A hardware storage device transferring chunks (blocks) of data (hard drives, SSDs).', technical: 'Device supporting random access buffered I/O through the kernel page cache.' },
        { term: 'Character Device (c)', simple: 'A stream device transferring bytes one-by-one (keyboards, serial terminals).', technical: 'Unbuffered sequential device driver streaming un-cached bytes.' },
        { term: '/dev/null', simple: 'The Linux trash can black hole: anything written to it vanishes.', technical: 'Virtual device that discards all write data and immediately returns EOF on reads.' }
      ],
      syntaxCode: 'ls -l /dev/[DEVICE]',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory entries' },
        { token: '-l', role: 'flag', explanation: 'Show long format to inspect device type (b or c) and major/minor numbers' },
        { token: '/dev', role: 'path', explanation: 'Device directory mount' }
      ],
      variations: [
        { syntax: 'lsblk', title: 'List Block Devices', whatItDoes: 'Visualizes hard drives, partitions, and mountpoints in a tree', whenToUse: 'When inspecting storage devices' },
        { syntax: 'cat /dev/urandom | head -c 16 | xxd', title: 'Generate Random Hex', whatItDoes: 'Reads 16 bytes of high-entropy cryptographic randomness from kernel CPRNG', whenToUse: 'When generating secure passwords or tokens' }
      ],
      beforeAfter: {
        before: '$ ls -l /dev/null /dev/sda\n[Inspecting device nodes...]',
        after: 'crw-rw-rw- 1 root root  1, 3 Sep 28 08:00 /dev/null\nbrw-rw---- 1 root disk  8, 0 Sep 28 08:00 /dev/sda',
        explanation: '"c" marks /dev/null as a character device (major 1, minor 3). "b" marks /dev/sda as a block storage device (major 8, minor 0).'
      },
      expectedOutput: 'crw-rw-rw- /dev/null\nbrw-rw---- /dev/sda',
      whatChanges: ['Reads device metadata from devtmpfs.'],
      whatDoesNotChange: ['Hardware devices and files are untouched.'],
      safeRecovery: 'Never run "dd of=/dev/sda" without knowing the exact disk! Writing to block devices directly overwrites partition tables.',
      commonMistakes: [
        { mistake: 'Writing directly to a raw block device instead of a partition', whyItHappens: 'Confusing /dev/sda (whole disk) with /dev/sda1 (first partition).', howToFix: 'Format and mount partitions (sda1, sda2), not the raw disk block device unless building software RAID.' },
        { mistake: 'Accidentally deleting /dev/null', whyItHappens: 'Running a rogue script that overwrote or unlinked /dev/null.', howToFix: 'Recreate it with root: "sudo mknod -m 666 /dev/null c 1 3".' }
      ]
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
      difficulty: 'Intermediate',
      quote: '/proc takes 0 bytes on your hard disk; it is pure live kernel memory materialized as plain text files.',
      whatIsIt: '/proc is a virtual pseudo-filesystem (procfs) generated on-the-fly by the Linux kernel. It occupies zero bytes of physical disk space. It provides a real-time window into kernel data structures, hardware telemetry (/proc/cpuinfo, /proc/meminfo), and every active process on the machine (each PID gets a folder, e.g. /proc/1234/).',
      inSimpleWords: 'Imagine your car dashboard with speedometers, engine temperature dials, and oil pressure gauges. /proc is that exact dashboard for Linux. When you look inside /proc, the kernel generates real-time telemetry instantly.',
      whyDoYouNeedIt: 'System monitoring tools like top, ps, free, and uptime do not perform magic; they simply read text files inside /proc and format them nicely for you.',
      realWorldScenario: 'A process is misbehaving and you want to know what executable it is running and what files it has open. You navigate to "/proc/<PID>/" and inspect the symlinks "exe" and "fd/". The kernel reveals all open network sockets and files instantly.',
      realWorldAnalogy: 'An MRI scan of the human body. It does not create new organs; it gives doctors a transparent real-time view into heartbeats, blood flow, and brain activity.',
      terms: [
        { term: 'procfs', simple: 'The virtual filesystem mapping kernel data to text files.', technical: 'In-memory filesystem driver dynamically constructing VFS inodes from kernel struct pointers on read().' },
        { term: '/proc/[PID]', simple: 'A folder for every running program containing its live memory state.', technical: 'Per-process directory exposing task_struct information: status, cmdline, fd, maps, and environ.' }
      ],
      syntaxCode: 'cat /proc/[METRIC_FILE]',
      syntaxTokens: [
        { token: 'cat', role: 'command', explanation: 'Read and display file' },
        { token: '/proc/cpuinfo', role: 'path', explanation: 'Kernel CPU architecture and core topology virtual file' }
      ],
      variations: [
        { syntax: 'cat /proc/meminfo | head -n 5', title: 'Live Memory Telemetry', whatItDoes: 'Outputs total RAM, free RAM, available RAM, and cache memory', whenToUse: 'When auditing memory pressure' },
        { syntax: 'ls -l /proc/$$/fd', title: 'Current Shell Open Files', whatItDoes: 'Lists all file descriptors currently held open by active shell ($$)', whenToUse: 'When debugging file descriptor leaks' }
      ],
      beforeAfter: {
        before: '$ cat /proc/meminfo | head -n 3\n[Reading kernel memory allocator metrics...]',
        after: 'MemTotal:       16384000 kB\nMemFree:         4120000 kB\nMemAvailable:   12450000 kB',
        explanation: 'Reports exact memory state directly from the Linux kernel page allocator in RAM.'
      },
      expectedOutput: 'processor\t: 0\nmodel name\t: Intel(R) Xeon(R) CPU',
      whatChanges: ['Executes kernel callback to serialize memory data into text buffer.'],
      whatDoesNotChange: ['Disk storage is untouched.'],
      safeRecovery: 'Files in /proc are safe to read. Files under /proc/sys can be written to by root to tune kernel parameters.',
      commonMistakes: [
        { mistake: 'Trying to backup /proc with "tar -czf backup.tar.gz /proc"', whyItHappens: 'Not realizing files in /proc represent infinite streams and live kernel memory.', howToFix: 'Always exclude /proc, /sys, /dev, and /tmp when taking system filesystem backups.' },
        { mistake: 'Wondering why "ls -l /proc/cpuinfo" reports file size 0 bytes', whyItHappens: 'Virtual files do not have disk blocks allocated.', howToFix: 'Files in /proc are generated dynamically when opened by a process; size 0 is completely normal.' }
      ]
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
      difficulty: 'Intermediate',
      quote: '/sys is the structured object model of your hardware, buses, and kernel drivers.',
      whatIsIt: '/sys is a virtual filesystem (sysfs) exported by the Linux kernel that organizes all discovered hardware devices, buses (PCI, USB), block storage queues, and power management subsystems into a clean, hierarchical tree of attributes.',
      inSimpleWords: 'If /proc is the live health dashboard, /sys is the engineering blueprint and control knobs. It lets you see which PCI slot has which network card, inspect battery charge percentages, and control LED lights or fan speeds.',
      whyDoYouNeedIt: 'Modern hardware management tools (udev, systemd, ip, ethtool) rely on /sys to detect plugged devices, configure network speeds, and tune NVMe SSD read-ahead queues.',
      realWorldScenario: 'A server network interface drops packets. You check its physical hardware link state and duplex speed directly from the kernel by reading "/sys/class/net/eth0/operstate" and "/sys/class/net/eth0/speed".',
      realWorldAnalogy: 'The settings and device manager app on a phone showing battery health percentage, connected Bluetooth devices, and screen refresh rate.',
      terms: [
        { term: 'sysfs', simple: 'A virtual folder structuring kernel hardware objects.', technical: 'RAM-based pseudo-filesystem representing kernel kobjects, ksets, and attributes.' },
        { term: '/sys/class', simple: 'Hardware grouped by type (net, block, power_supply, sound).', technical: 'Device class abstraction providing unified symlinks to underlying bus devices.' }
      ],
      syntaxCode: 'cat /sys/class/[CLASS]/[DEVICE]/[ATTRIBUTE]',
      syntaxTokens: [
        { token: 'cat', role: 'command', explanation: 'Read attribute file' },
        { token: '/sys/class/net', role: 'path', explanation: 'Network device class sysfs hierarchy' }
      ],
      variations: [
        { syntax: 'cat /sys/class/net/lo/operstate', title: 'Check Loopback Link State', whatItDoes: 'Returns "unknown" or "up"', whenToUse: 'When checking interface state programmatically' },
        { syntax: 'cat /sys/block/sda/queue/rotational', title: 'Check if Disk is SSD or HDD', whatItDoes: 'Returns 0 for SSD (non-rotational) and 1 for spinning HDD', whenToUse: 'When tuning disk schedulers for SSDs' }
      ],
      beforeAfter: {
        before: '$ cat /sys/block/sda/queue/rotational\n[Querying disk hardware attributes...]',
        after: '0',
        explanation: '"0" proves the storage device is a solid-state drive (SSD), allowing flash optimizations.'
      },
      expectedOutput: '0',
      whatChanges: ['Reads kernel kobject attribute into stdout.'],
      whatDoesNotChange: ['Hardware settings remain unchanged.'],
      safeRecovery: 'Read-only query. Safe on all systems.',
      commonMistakes: [
        { mistake: 'Including /sys in rsync or backup archives', whyItHappens: 'Backing up the whole root folder indiscriminately.', howToFix: 'Exclude /sys using "--exclude=/sys" flag in rsync and tar.' },
        { mistake: 'Writing arbitrary strings to /sys control attributes', whyItHappens: 'Invalid syntax causes kernel driver errors.', howToFix: 'Only write documented valid parameters (e.g. echo 1 > /sys/class/...) as root.' }
      ]
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
      difficulty: 'Intermediate',
      quote: 'If /boot is corrupted or runs out of disk space, your server will fail to boot on the next restart.',
      whatIsIt: '/boot holds all static files required by the computer firmware (UEFI/BIOS) and bootloader (GRUB) to bootstrap the operating system. Key files include the compressed Linux kernel binary (vmlinuz), the initial RAM filesystem (initrd.img / initramfs), the kernel symbol map (System.map), and GRUB configuration files (/boot/grub/grub.cfg).',
      inSimpleWords: 'Think of /boot as the emergency medical kit and jumper cables stored in your car trunk. You do not touch it while driving down the highway, but when you turn the key in the ignition in the morning, the car cannot start without it.',
      whyDoYouNeedIt: 'On servers with encrypted hard drives (LUKS) or software RAID/LVM, the bootloader cannot read the encrypted root disk initially. /boot is placed on an unencrypted separate partition so the bootloader can load the kernel and prompt you for the encryption passphrase.',
      realWorldScenario: 'An automated update installs three new kernel versions, but old kernels were never pruned. The /boot partition reaches 100% full. The next apt upgrade fails midway, leaving initramfs ungenerated. Understanding /boot lets you safely remove old kernels with "apt autoremove --purge".',
      realWorldAnalogy: 'The ignition key and starter motor of a diesel generator. If the starter battery is dead, the 1000-horsepower generator cannot crank to life.',
      terms: [
        { term: 'vmlinuz', simple: 'The compressed executable file containing the Linux kernel.', technical: 'Bootable compressed Linux kernel binary (header + zImage/bzImage payload).' },
        { term: 'initrd / initramfs', simple: 'A temporary RAM disk containing storage drivers needed to unlock your hard drive.', technical: 'Gzip/CPIO archive extracted by bootloader into RAM containing minimal rootfs and drivers.' }
      ],
      syntaxCode: 'ls -lh /boot',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory contents' },
        { token: '-lh', role: 'flag', explanation: 'Long format with human-readable file sizes' },
        { token: '/boot', role: 'path', explanation: 'Bootloader and kernel image directory' }
      ],
      variations: [
        { syntax: 'df -h /boot', title: 'Check /boot Partition Space', whatItDoes: 'Shows disk space available on boot partition', whenToUse: 'Before performing major kernel or distribution upgrades' },
        { syntax: 'ls -lh /boot/vmlinuz*', title: 'List Installed Kernels', whatItDoes: 'Displays all installed kernel binary versions', whenToUse: 'When auditing installed kernels' }
      ],
      beforeAfter: {
        before: '$ ls -l /boot/vmlinuz*\n[Querying installed kernel images...]',
        after: '-rw------- 1 root root 14680000 Sep 12 10:00 /boot/vmlinuz-6.8.0-45-generic',
        explanation: 'Shows the 14MB compressed monolithic Linux kernel image ready for GRUB boot execution.'
      },
      expectedOutput: 'vmlinuz-6.8.0-45-generic\ninitrd.img-6.8.0-45-generic\ngrub',
      whatChanges: ['Reads directory contents of /boot.'],
      whatDoesNotChange: ['Boot files remain unchanged.'],
      safeRecovery: 'If /boot fills up, free space safely with "sudo apt autoremove --purge". Never delete vmlinuz manually without updating GRUB.',
      commonMistakes: [
        { mistake: 'Letting /boot fill up to 100% disk usage', whyItHappens: 'Debian/Ubuntu retains old kernels indefinitely unless pruned.', howToFix: 'Run "sudo apt autoremove" regularly to prune old kernel binaries.' },
        { mistake: 'Deleting the active running kernel image from /boot', whyItHappens: 'Cleaning files with wildcards accidentally.', howToFix: 'Always check "uname -r" first; never remove the kernel version currently running!' }
      ]
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
      difficulty: 'Beginner',
      quote: 'The Filesystem Hierarchy Standard ensures that a Linux software package works predictably on Ubuntu, Red Hat, Debian, or SUSE.',
      whatIsIt: 'The Filesystem Hierarchy Standard (FHS) is the formal industry specification managed by the Linux Foundation that defines the directory structure and directory contents in Linux distributions. It mandates that /etc is for configs, /bin is for binaries, /var is for variable data, and /home is for users, ensuring cross-distribution software compatibility.',
      inSimpleWords: 'Think of FHS as the standardized building code for Linux. Just like all commercial buildings require exit doors to push outward and water pipes to meet specific plumbing standards, all Linux distros agree on where files must live.',
      whyDoYouNeedIt: 'Because of FHS, a software developer can write an installer script that places configs into /etc/app.conf and logs into /var/log/app.log, confident that it will work seamlessly across Ubuntu, RHEL, Arch, or Fedora.',
      realWorldScenario: 'You are auditing a newly hired engineer\'s deployment script. The script creates "/my-database" directly in the root directory. You refer to the FHS standard and guide them to relocate it to "/var/lib/my-database" for persistence and security compliance.',
      realWorldAnalogy: 'The standardized layout of an airplane cockpit. Altitude gauges, throttle levers, and radio switches are placed in standard locations so pilots can transition between aircraft without relearning basic navigation.',
      terms: [
        { term: 'FHS (Filesystem Hierarchy Standard)', simple: 'The official rulebook defining where files belong in Linux.', technical: 'Specification maintained by Linux Foundation standardizing top-level Unix directory semantics.' },
        { term: 'man hier', simple: 'The built-in manual page describing the complete Linux directory hierarchy.', technical: 'Manual section documenting the description of the filesystem hierarchy.' }
      ],
      syntaxCode: 'man hier',
      syntaxTokens: [
        { token: 'man', role: 'command', explanation: 'Format and display system manual pages' },
        { token: 'hier', role: 'argument', explanation: 'Filesystem hierarchy specification manual topic' }
      ],
      variations: [
        { syntax: 'man 7 hier', title: 'Section 7 Overview', whatItDoes: 'Opens section 7 (miscellaneous conventions) documentation for hier', whenToUse: 'When reading detailed architectural standards' },
        { syntax: 'ls -l /', title: 'Verify FHS Conformance', whatItDoes: 'Lists top-level directories to visually inspect compliance with FHS', whenToUse: 'When auditing a new minimal Linux distribution' }
      ],
      beforeAfter: {
        before: '$ man hier | head -n 12\n[Loading filesystem standard manual...]',
        after: 'HIER(7)                Linux Programmer\'s Manual               HIER(7)\n\nNAME\n       hier - Description of the filesystem hierarchy\n\nDESCRIPTION\n       A typical Linux system has, among others, the following\n       directories:\n\n       /      This is the root directory.  This is where the\n              whole tree starts.',
        explanation: 'Displays the canonical POSIX and Linux documentation defining every system directory purpose.'
      },
      expectedOutput: 'HIER(7)\nhier - Description of the filesystem hierarchy',
      whatChanges: ['Formats and renders manual documentation.'],
      whatDoesNotChange: ['System remains unaltered.'],
      safeRecovery: 'Press "q" to exit man page viewer. 100% safe.',
      commonMistakes: [
        { mistake: 'Creating non-standard directories in the root filesystem (e.g. /data, /scripts, /myapp)', whyItHappens: 'Lack of awareness of FHS guidelines.', howToFix: 'Follow FHS: use /opt for third-party apps, /srv for site data, /var for dynamic state, /usr/local for custom binaries.' },
        { mistake: 'Hardcoding paths that violate FHS inside public open-source software', whyItHappens: 'Assuming your personal machine layout is universal.', howToFix: 'Adhere strictly to FHS and respect standard $XDG_CONFIG_HOME environment conventions.' }
      ]
    })
  ]
};
