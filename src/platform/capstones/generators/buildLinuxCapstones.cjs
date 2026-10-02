// Generator script for Linux Capstones 01 through 10
const fs = require('fs');
const path = require('path');

const linuxCapstones = [
  {
    id: 'linux-01',
    code: 'LINUX-01',
    title: 'Linux Personal Development Server',
    academy: 'linux',
    difficulty: 'Beginner',
    estimatedTime: '4-6 hours',
    technologies: ['Ubuntu / Debian', 'Bash CLI', 'SSH', 'File Management', 'APT / DNF'],
    overview: 'Provision and configure a personal Linux development environment from the command line, establishing directory hierarchies, user shell profiles, and essential CLI utilities.',
    tags: ['linux', 'cli', 'bash', 'dev-environment', 'file-management'],
    projectOverview: {
      projectName: 'Linux Personal Development Server',
      academy: 'linux',
      difficulty: 'Beginner',
      estimatedEffort: '4-6 hours',
      technologies: ['Ubuntu Linux', 'Bash', 'SSH', 'Package Managers (apt)'],
      shortDescription: 'Configure a clean, productive Linux development server from scratch with organized filesystem paths, editor tooling, and customized shell profiles.'
    },
    scenario: 'You have just spun up a fresh headless Linux server instance in the cloud. As a junior engineer on the infrastructure team, you are responsible for preparing this instance as a standardized developer workstation with developer tooling, custom dotfiles, and organized project directories.',
    problemStatement: 'Fresh Linux installations contain minimal default configurations, missing common developer tools, lacks user profile customizations, and has an unorganized home folder. You need to transform the raw system into an ergonomic, well-structured development environment.',
    projectObjective: [
      'Navigate and structure the Linux filesystem hierarchy following the FHS standard',
      'Install core developer packages (git, curl, build-essential, vim, tmux) via the system package manager',
      'Customize ~/.bashrc with helpful aliases, environment variables (EDITOR, PATH), and an expressive prompt',
      'Manage files, symlinks, and tar archives cleanly'
    ],
    whatYouNeedToBuild: {
      description: 'A customized, fully configured Linux developer home environment with organized directories, dotfiles, and system tooling.',
      diagram: `/home/developer/
├── .bashrc (Custom PS1, aliases, PATH exports)
├── .vimrc (Developer editor configurations)
├── bin/ (Personal utility scripts added to $PATH)
├── projects/ (Workspaces isolated by domain)
└── backups/ (Automated compressed archives)`
    },
    requirements: {
      functional: [
        'Developer home directory must have a standardized hierarchy (~/projects, ~/bin, ~/backups)',
        'Shell session must automatically load custom environment variables and productivity aliases',
        'System package cache must be updated and core developer utilities installed'
      ],
      technical: [
        'Adhere to POSIX and Filesystem Hierarchy Standard (FHS)',
        'Ensure custom scripts in ~/bin have executable bit set (chmod +x)',
        'Create a compressed tarball backup of configuration dotfiles'
      ],
      security: [
        'Do not execute everyday development tasks as the root user',
        'Verify file permissions on ~/.bashrc (rw-r--r--) and ~/.ssh (700 / 600)'
      ]
    },
    architecture: {
      summary: 'Linux single-node developer workstation architecture spanning user space, shell environment, and filesystem.',
      diagram: `User Login ──> Bash Shell (/bin/bash) ──> Environment (~/.bashrc) ──> Standardized Filesystem (~/projects, ~/bin)`,
      components: [
        { name: 'User Home (~/)', role: 'Isolated workspace for user configuration and project source code', technologies: ['ext4 / xfs'] },
        { name: 'Bash Environment', role: 'Interactive command interpreter configured via dotfiles', technologies: ['GNU Bash'] },
        { name: 'Package Manager (APT)', role: 'Upstream repository package installer and dependency resolver', technologies: ['APT / dpkg'] }
      ]
    },
    technologyRequirements: {
      required: ['Linux OS (Ubuntu 22.04 LTS or Debian 12)', 'Bash shell', 'Standard coreutils'],
      optional: ['tmux or screen for terminal multiplexing', 'zsh shell alternative'],
      outOfScope: ['GUI desktop environments (GNOME/KDE)', 'Container runtime orchestration']
    },
    functionalRequirements: [
      'Update system package repositories using sudo apt update',
      'Install curl, git, htop, jq, tmux, and build-essential',
      'Create directories: ~/projects/apps, ~/projects/scripts, ~/bin, and ~/backups',
      'Append custom aliases (ll, gs, update-sys) and export EDITOR=nano or vim to ~/.bashrc',
      'Write a backup shell script in ~/bin/backup-home.sh that creates a tar.gz archive in ~/backups'
    ],
    technicalRequirements: [
      'Ensure ~/.bashrc changes take effect immediately without requiring reboot',
      'Ensure ~/bin is appended to the user PATH variable',
      'Test script execution directly from any directory via $PATH'
    ],
    securityRequirements: [
      'Ensure home directory permissions prevent unauthorized world-readable access (chmod 750 /home/developer)'
    ],
    constraints: [
      'Never run commands as root that can be safely run as standard user',
      'Do not install desktop window managers or X11 packages'
    ],
    expectedOutcome: 'A standardized, clean Linux developer workstation equipped with essential utilities, customized dotfiles, and an automated backup script.',
    deliverables: [
      'Configured Linux developer environment',
      'Customized ~/.bashrc and ~/.profile',
      'Executable script ~/bin/backup-home.sh',
      'DEV_SERVER_SETUP.md documenting the installation steps'
    ],
    suggestedProjectStructure: `/home/developer/
├── .bashrc
├── .profile
├── bin/
│   └── backup-home.sh
├── projects/
│   ├── apps/
│   └── scripts/
└── DEV_SERVER_SETUP.md`,
    requiredConcepts: [
      { name: 'Linux Fundamentals', lessonId: 'c-01-01', academyRoute: '/linux' },
      { name: 'The Linux Filesystem', lessonId: 'c-02-01', academyRoute: '/linux' },
      { name: 'Navigating Linux', lessonId: 'c-03-01', academyRoute: '/linux' },
      { name: 'File Management & Coreutils', lessonId: 'c-04-01', academyRoute: '/linux' },
      { name: 'Environment Variables', lessonId: 'c-17-01', academyRoute: '/linux' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 01: Linux Fundamentals', route: '/cloudstack/linux?concept=c-01-01' },
        { title: 'Chapter 02: The Linux Filesystem', route: '/cloudstack/linux?concept=c-02-01' },
        { title: 'Chapter 17: Environment Variables', route: '/cloudstack/linux?concept=c-17-01' }
      ],
      officialDocs: [
        { title: 'Filesystem Hierarchy Standard (FHS)', url: 'https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html' },
        { title: 'Bash Reference Manual', url: 'https://www.gnu.org/software/bash/manual/' }
      ],
      referenceMaterial: ['Linux Command Line Basics by William Shotts'],
      usefulCommands: [
        'sudo apt update && sudo apt install -y curl git htop jq tmux',
        'mkdir -p ~/projects/{apps,scripts} ~/bin ~/backups',
        'chmod +x ~/bin/backup-home.sh',
        'source ~/.bashrc',
        'tar -czvf ~/backups/dotfiles-$(date +%F).tar.gz ~/.bashrc ~/.profile'
      ]
    },
    recommendedApproach: [
      '1. Log into the Linux server and inspect current OS version using cat /etc/os-release.',
      '2. Update package cache and install essential developer utilities using apt.',
      '3. Construct standard directory hierarchy in user home directory.',
      '4. Inspect current shell environment variables using printenv.',
      '5. Edit ~/.bashrc to add PATH="$HOME/bin:$PATH" and convenient productivity aliases.',
      '6. Reload shell profile with source ~/.bashrc and test new aliases.',
      '7. Author ~/bin/backup-home.sh script to archive important configuration files.',
      '8. Make the script executable using chmod +x and test invocation.',
      '9. Verify created archive contents with tar -tzvf.',
      '10. Document configuration steps in DEV_SERVER_SETUP.md.'
    ],
    importantConsiderations: [
      'What is the difference between ~/.bashrc and ~/.bash_profile in login vs non-login shells?',
      'Why is modifying system-wide /etc/profile discouraged for personal user customizations?',
      'How does the $PATH environment variable determine executable lookup precedence?'
    ],
    commonPitfalls: [
      'Syntax errors in ~/.bashrc that prevent successful shell login or execution.',
      'Overwriting $PATH rather than prepending or appending to it (e.g. export PATH=~/bin breaks standard commands).',
      'Forgetting to set chmod +x on scripts placed in ~/bin.'
    ],
    optionalEnhancements: {
      beginner: ['Configure customized Bash PS1 prompt displaying user@host:working_directory with color.'],
      intermediate: ['Configure a basic ~/.tmux.conf with mouse support and custom status bar.'],
      advanced: ['Manage your dotfiles in a Git repository and symlink them using GNU Stow.'],
      expert: ['Write an automated Ansible playbook to provision this workstation configuration on any new host.']
    },
    completionChecklist: [
      'System packages updated and developer tools installed',
      'Standard directory hierarchy created (~/projects, ~/bin, ~/backups)',
      '~/.bashrc updated with aliases and custom environment exports',
      '~/bin added to $PATH and verified',
      '~/bin/backup-home.sh created and tested',
      'Tarball backup generated in ~/backups',
      'DEV_SERVER_SETUP.md completed'
    ]
  },
  {
    id: 'linux-02',
    code: 'LINUX-02',
    title: 'Users, Groups and Permissions Security Matrix',
    academy: 'linux',
    difficulty: 'Beginner+',
    estimatedTime: '6-8 hours',
    technologies: ['useradd / usermod', 'groupadd', 'chmod / chown', 'Sudoers', 'Sticky Bit / SGID'],
    overview: 'Design and implement a multi-tenant user access control matrix on a shared Linux server, enforcing least privilege, group collaboration directories, SGID inheritance, and granular sudoers rules.',
    tags: ['linux', 'users', 'groups', 'permissions', 'sudoers', 'sgid'],
    projectOverview: {
      projectName: 'Users, Groups and Permissions Security Matrix',
      academy: 'linux',
      difficulty: 'Beginner+',
      estimatedEffort: '6-8 hours',
      technologies: ['useradd / usermod', 'chown / chmod', 'sudo / visudo', 'SGID Bit'],
      shortDescription: 'Configure multi-tier department access on a shared Linux server, establishing role-based groups, shared collaboration folders with SGID inheritance, and locked sudoers permissions.'
    },
    scenario: 'Your organization is deploying a shared build server used by developers, QA testers, and operations engineers. Each department must have private home directories, access to a shared project folder (/opt/builds) where any created file automatically inherits the department group, and strict sudo boundaries.',
    problemStatement: 'Currently, engineers share a single administrative account or frequently chmod 777 folders when facing permission errors. This compromises server security, violates audit compliance, and creates race conditions where developers delete each other\'s files.',
    projectObjective: [
      'Create structured system users with designated home directories and locked primary groups',
      'Configure department groups (developers, qateam, opsadmin) and assign secondary memberships',
      'Configure a shared collaboration directory using SGID (2775) so new files inherit group ownership',
      'Configure granular sudo privileges in /etc/sudoers.d/ without granting unrestricted root shells'
    ],
    whatYouNeedToBuild: {
      description: 'A multi-user Linux environment with department groups, shared workspace with SGID bit, and least-privilege sudo configuration.',
      diagram: `/opt/builds/ (drwxrws--- root:developers, SGID=2775)
    ├── Any file created here automatically gets GID 'developers'
    └── Members of 'developers' have read/write; others blocked

/etc/sudoers.d/developers
    └── Allows developers to restart web service without entering root password`
    },
    requirements: {
      functional: [
        'Users dev-alice and dev-bob belong to group developers and can collaborate in /opt/builds',
        'User qa-charlie belongs to group qateam and cannot write to /opt/builds',
        'Any file created inside /opt/builds by any user must automatically belong to group developers',
        'Developers must be permitted to run "systemctl restart nginx" via sudo without a password'
      ],
      technical: [
        'Use useradd -m -s /bin/bash and groupadd',
        'Apply chmod 2770 or 2775 on shared directories for SGID inheritance',
        'Use visudo -f /etc/sudoers.d/dev-policy to avoid corrupting sudoers file'
      ],
      security: [
        'User passwords must be set or accounts locked with SSH-only access',
        'No user other than opsadmin may have unrestricted NOPASSWD: ALL in sudoers'
      ]
    },
    architecture: {
      summary: 'Role-based access control architecture enforcing file permission modes (rwx, suid, sgid, sticky) and sudo policy engine.',
      diagram: `User Account (/etc/passwd) ──> Group Membership (/etc/group) ──> DAC Evaluation (rwx + SGID) ──> Sudo Policy (/etc/sudoers.d/)`,
      components: [
        { name: '/etc/passwd & /etc/shadow', role: 'System authentication identity and password hash store', technologies: ['POSIX Auth'] },
        { name: 'Discretionary Access Control (DAC)', role: 'Kernel-enforced permission triplets for User, Group, and Other', technologies: ['Linux VFS'] },
        { name: 'Special Bits (SGID)', role: 'Directory flag forcing group inheritance on child files', technologies: ['VFS Flags'] },
        { name: 'Sudo Policy Engine', role: 'Privileged execution gateway with command-level whitelisting', technologies: ['sudoers'] }
      ]
    },
    technologyRequirements: {
      required: ['Linux OS (Ubuntu, Debian, AlmaLinux, Rocky)', 'visudo', 'coreutils'],
      optional: ['POSIX Access Control Lists (ACLs - getfacl / setfacl)'],
      outOfScope: ['Active Directory / LDAP integration']
    },
    functionalRequirements: [
      'Create groups: developers and qateam',
      'Create users: dev-alice, dev-bob (in developers) and qa-charlie (in qateam)',
      'Create directory /opt/builds owned by root:developers with permissions 2775',
      'Demonstrate that when dev-alice creates /opt/builds/release.tar, its group is automatically "developers"',
      'Create /etc/sudoers.d/developers allowing members of %developers to run /bin/systemctl restart nginx'
    ],
    technicalRequirements: [
      'Verify permissions with ls -ld /opt/builds showing "drwxrwsr-x"',
      'Verify sudo syntax with visudo -c -f /etc/sudoers.d/developers',
      'Test sudo execution as dev-alice using sudo -l'
    ],
    securityRequirements: [
      'Ensure home directories for each user have mode 700 or 750 (prevent lateral snooping)',
      'Prevent developers from editing /etc/sudoers or executing arbitrary shell escapes'
    ],
    constraints: [
      'Do not use chmod 777 under any circumstance',
      'Do not edit /etc/sudoers directly: always use visudo or drop-in files in /etc/sudoers.d/'
    ],
    expectedOutcome: 'A securely configured multi-user Linux system with verified departmental group boundaries, SGID directory inheritance, and strict command-level sudo permissions.',
    deliverables: [
      'Configured users, groups, and home directories',
      'Collaboration directory /opt/builds with SGID configured',
      'Valid drop-in sudoers policy /etc/sudoers.d/developers',
      'ACCESS_CONTROL_MATRIX.md documenting users, groups, directories, and permitted sudo commands'
    ],
    suggestedProjectStructure: `/opt/builds/
├── (shared collaborative files)
/etc/sudoers.d/
└── developers
ACCESS_CONTROL_MATRIX.md`,
    requiredConcepts: [
      { name: 'Users and Groups', lessonId: 'c-09-01', academyRoute: '/linux' },
      { name: 'File Permissions & Octal Modes', lessonId: 'c-10-01', academyRoute: '/linux' },
      { name: 'Special Permissions (SUID, SGID, Sticky)', lessonId: 'c-10-08', academyRoute: '/linux' },
      { name: 'Sudo and Privileged Access', lessonId: 'c-09-10', academyRoute: '/linux' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 09: Users and Groups', route: '/cloudstack/linux?concept=c-09-01' },
        { title: 'Chapter 10: File Permissions & SGID', route: '/cloudstack/linux?concept=c-10-01' }
      ],
      officialDocs: [
        { title: 'Debian Wiki - Permissions and Access Control', url: 'https://wiki.debian.org/Permissions' },
        { title: 'Sudoers Manual', url: 'https://www.sudo.ws/docs/man/1.8.15/sudoers.man/' }
      ],
      referenceMaterial: ['Linux Security Cookbook: Chapter 2 - User Management'],
      usefulCommands: [
        'sudo groupadd developers',
        'sudo useradd -m -s /bin/bash -g developers dev-alice',
        'sudo usermod -aG developers dev-bob',
        'sudo mkdir -p /opt/builds && sudo chown root:developers /opt/builds',
        'sudo chmod 2775 /opt/builds',
        'sudo visudo -f /etc/sudoers.d/developers'
      ]
    },
    recommendedApproach: [
      '1. Map out users, primary groups, supplementary groups, and required privileges.',
      '2. Create groups developers and qateam using groupadd.',
      '3. Create user accounts dev-alice, dev-bob, and qa-charlie with useradd.',
      '4. Set initial passwords or install SSH authorized keys for each user.',
      '5. Create the shared collaboration directory /opt/builds.',
      '6. Set ownership to root:developers and set permissions to 2775 (SGID).',
      '7. Log in as dev-alice (su - dev-alice) and create a test file inside /opt/builds.',
      '8. Verify that the test file group ownership automatically inherits "developers".',
      '9. Author /etc/sudoers.d/developers using visudo and test sudo -l.',
      '10. Document all roles, paths, and permissions in ACCESS_CONTROL_MATRIX.md.'
    ],
    importantConsiderations: [
      'How does the SGID bit on a directory fundamentally differ from SGID on an executable binary?',
      'Why is granting sudo access to text editors like vim or nano a major security vulnerability (shell escape)?',
      'What happens when a user belongs to multiple groups when creating a file outside of an SGID folder?'
    ],
    commonPitfalls: [
      'Using useradd without -m, resulting in a user without a home directory.',
      'Using usermod -G instead of usermod -aG, which removes all previous supplementary groups from the user.',
      'Syntax errors in sudoers files that lock all administrators out of sudo access.'
    ],
    optionalEnhancements: {
      beginner: ['Configure password aging policies in /etc/login.defs (PASS_MAX_DAYS).'],
      intermediate: ['Configure POSIX ACLs with setfacl to grant read-only access to qateam on /opt/builds.'],
      advanced: ['Implement the sticky bit (+t) on /opt/builds/public so users cannot delete each other\'s files.'],
      expert: ['Audit all user logins and sudo invocations using Linux auditd rules.']
    },
    completionChecklist: [
      'Groups developers and qateam created',
      'Users dev-alice, dev-bob, and qa-charlie created with correct groups',
      'Directory /opt/builds configured with SGID (2775) and owned by :developers',
      'File creation test verifies group inheritance works automatically',
      'Sudo policy created in /etc/sudoers.d/ and validated with visudo -c',
      'User permissions tested and verified compliant',
      'ACCESS_CONTROL_MATRIX.md authored'
    ]
  },
  {
    id: 'linux-03',
    code: 'LINUX-03',
    title: 'Web Server Deployment & Linux Networking',
    academy: 'linux',
    difficulty: 'Lower Intermediate',
    estimatedTime: '8-10 hours',
    technologies: ['Nginx / Apache', 'Linux Networking (ip, ss, netstat)', 'UFW Firewall', 'Virtual Hosts', 'DNS / Hosts'],
    overview: 'Deploy and configure a production-ready Nginx web server, configure virtual hosts (server blocks), manage firewall rules via UFW, and troubleshoot network socket bindings using Linux CLI utilities.',
    tags: ['linux', 'nginx', 'networking', 'firewall', 'ufw', 'virtual-hosts'],
    projectOverview: {
      projectName: 'Web Server Deployment & Linux Networking',
      academy: 'linux',
      difficulty: 'Lower Intermediate',
      estimatedEffort: '8-10 hours',
      technologies: ['Nginx', 'UFW Firewall', 'ss / ip CLI', 'Virtual Hosts'],
      shortDescription: 'Deploy an Nginx web server hosting multiple virtual hosts, enforce strict port firewall policies, and inspect socket connections with Linux network tools.'
    },
    scenario: 'You are deploying an internal documentation and status website on a company Linux server. You must install Nginx, configure multiple virtual host server blocks on distinct domain names (docs.local and status.local), lock down exposed network ports with UFW firewall, and verify network connectivity.',
    problemStatement: 'The web server must host two separate sites on port 80 using virtual hosts while rejecting traffic on unapproved ports. The team needs verification that the web server binds correctly to network interfaces, runs under an unprivileged user, and is accessible across the local network.',
    projectObjective: [
      'Install and configure Nginx web server from upstream package repositories',
      'Configure two independent virtual hosts (server blocks) with dedicated document roots in /var/www/',
      'Configure and enable Uncomplicated Firewall (UFW) allowing only SSH (port 22) and HTTP (port 80)',
      'Use Linux networking utilities (ip addr, ss -tuln, curl) to verify socket bindings and response codes'
    ],
    whatYouNeedToBuild: {
      description: 'An Nginx web server serving two distinct websites with firewall protection and socket verification.',
      diagram: `External Request ──> UFW Firewall (Allows 22, 80; Blocks all else)
                          │
                          ▼
                    Nginx (Port 80)
                    ├── Host: docs.local   ──> /var/www/docs/index.html
                    └── Host: status.local ──> /var/www/status/index.html`
    },
    requirements: {
      functional: [
        'Nginx must serve distinct content for http://docs.local and http://status.local',
        'UFW firewall must be active, allowing only ports 22 and 80',
        'Nginx process must run as unprivileged user www-data'
      ],
      technical: [
        'Create server blocks in /etc/nginx/sites-available/ and symlink to /etc/nginx/sites-enabled/',
        'Validate Nginx configuration using nginx -t before restarting',
        'Inspect listening sockets using ss -tuln'
      ],
      security: [
        'Disable Nginx server tokens (server_tokens off;) to hide web server version from HTTP headers',
        'Document roots must be owned by www-data:www-data with secure permissions (chmod 755)'
      ]
    },
    architecture: {
      summary: 'Linux host network stack with Netfilter/iptables firewall, socket abstraction, and user-space Nginx reverse proxy.',
      diagram: `Network Interface (eth0) ──> Netfilter (UFW) ──> TCP Socket (0.0.0.0:80) ──> Nginx Master/Worker Processes`,
      components: [
        { name: 'UFW Firewall', role: 'Stateful packet filter blocking unapproved ingress ports', technologies: ['iptables / nftables'] },
        { name: 'Nginx Master Process', role: 'Root privileged process binding privileged ports (<1024)', technologies: ['C / POSIX'] },
        { name: 'Nginx Worker Process', role: 'Unprivileged worker (www-data) servicing HTTP requests', technologies: ['Event Loop (epoll)'] },
        { name: 'Document Roots', role: 'Static assets located under /var/www/', technologies: ['Filesystem'] }
      ]
    },
    technologyRequirements: {
      required: ['Linux OS (Ubuntu 22.04 LTS)', 'Nginx', 'UFW', 'curl'],
      optional: ['bind9-dnsutils for dig / nslookup testing'],
      outOfScope: ['Public Let\'s Encrypt TLS certificates (requires public DNS)']
    },
    functionalRequirements: [
      'Install Nginx and enable automatic startup on boot via systemctl enable nginx',
      'Create /var/www/docs/index.html and /var/www/status/index.html',
      'Create /etc/nginx/sites-available/docs.conf and /etc/nginx/sites-available/status.conf',
      'Enable sites via symbolic links into /etc/nginx/sites-enabled/',
      'Enable UFW allowing OpenSSH and "Nginx HTTP"',
      'Test both sites using curl -H "Host: docs.local" http://localhost'
    ],
    technicalRequirements: [
      'Inspect socket status: ss -tulnp | grep :80',
      'Verify firewall status: sudo ufw status verbose',
      'Inspect Nginx access and error logs in /var/log/nginx/'
    ],
    securityRequirements: [
      'Verify default Nginx welcome page is removed or disabled',
      'Ensure server_tokens off; is configured in /etc/nginx/nginx.conf'
    ],
    constraints: [
      'Do not disable the firewall or allow any ports other than 22 and 80',
      'Never run Nginx worker processes as root'
    ],
    expectedOutcome: 'A fully functional, firewall-protected Linux web server delivering multi-tenant websites with verified network socket binding.',
    deliverables: [
      'Configured Nginx server blocks for docs.local and status.local',
      'Active UFW firewall rules',
      'Static HTML landing pages in /var/www/',
      'WEB_DEPLOYMENT_VERIFICATION.md detailing curl tests, ss socket outputs, and firewall configuration'
    ],
    suggestedProjectStructure: `/etc/nginx/
├── nginx.conf
├── sites-available/
│   ├── docs.conf
│   └── status.conf
└── sites-enabled/
    ├── docs.conf -> ../sites-available/docs.conf
    └── status.conf -> ../sites-available/status.conf
/var/www/
├── docs/index.html
└── status/index.html`,
    requiredConcepts: [
      { name: 'Linux Networking Primitives', lessonId: 'c-15-01', academyRoute: '/linux' },
      { name: 'Services and systemd', lessonId: 'c-12-01', academyRoute: '/linux' },
      { name: 'Firewalls & Security', lessonId: 'c-22-01', academyRoute: '/linux' },
      { name: 'Viewing and Editing Files', lessonId: 'c-05-01', academyRoute: '/linux' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 15: Linux Networking', route: '/cloudstack/linux?concept=c-15-01' },
        { title: 'Chapter 12: Services & systemd', route: '/cloudstack/linux?concept=c-12-01' },
        { title: 'Chapter 22: Linux Security & Firewalls', route: '/cloudstack/linux?concept=c-22-01' }
      ],
      officialDocs: [
        { title: 'Nginx Documentation - Server Blocks', url: 'https://nginx.org/en/docs/http/server_names.html' },
        { title: 'Ubuntu Community Help - UFW', url: 'https://help.ubuntu.com/community/UFW' }
      ],
      referenceMaterial: ['High Performance Browser Networking - Ilya Grigorik'],
      usefulCommands: [
        'sudo apt install -y nginx ufw',
        'sudo nginx -t',
        'sudo systemctl restart nginx',
        'sudo ufw allow 22/tcp',
        'sudo ufw allow 80/tcp',
        'sudo ufw enable',
        'ss -tulnp | grep 80',
        'curl -I -H "Host: docs.local" http://127.0.0.1'
      ]
    },
    recommendedApproach: [
      '1. Install Nginx using apt and confirm service status via systemctl status nginx.',
      '2. Inspect default network listening ports using ss -tuln.',
      '3. Create web root directories /var/www/docs and /var/www/status and set permissions.',
      '4. Add unique HTML content to both index.html files.',
      '5. Create server block configuration files in /etc/nginx/sites-available/.',
      '6. Create symbolic links in /etc/nginx/sites-enabled/ and remove the default site.',
      '7. Test Nginx syntax with sudo nginx -t and reload configuration.',
      '8. Configure /etc/hosts on test machine to map docs.local and status.local to server IP.',
      '9. Configure and enable UFW firewall, allowing SSH and HTTP traffic.',
      '10. Verify both sites respond with HTTP 200 via curl and compile verification report.'
    ],
    importantConsiderations: [
      'Why does Nginx require root privileges to start, but drops privileges to www-data for worker processes?',
      'How does HTTP Host header routing allow multiple websites to share a single public IP address?',
      'What is the risk of enabling UFW without first explicitly allowing port 22 (SSH)?'
    ],
    commonPitfalls: [
      'Enabling UFW before opening SSH port 22, permanently locking oneself out of a remote cloud server.',
      'Forgetting to run nginx -t before restarting, causing the web server to fail to start due to typos.',
      'File permission mismatches where Nginx cannot read files under /var/www/ due to restrictive parent directory modes.'
    ],
    optionalEnhancements: {
      beginner: ['Configure custom 404 and 500 error pages in Nginx.'],
      intermediate: ['Configure HTTP gzip compression in /etc/nginx/nginx.conf.'],
      advanced: ['Create a self-signed SSL/TLS certificate with openssl and configure HTTPS on port 443.'],
      expert: ['Implement rate-limiting in Nginx to mitigate brute-force and denial-of-service traffic.']
    },
    completionChecklist: [
      'Nginx installed, running, and enabled on system boot',
      'Virtual hosts configured for docs.local and status.local',
      'Document roots created under /var/www/ and populated with test pages',
      'nginx -t passes with zero configuration syntax warnings',
      'UFW enabled with ports 22 and 80 allowed, and all unapproved ports dropped',
      'Socket verified listening on 0.0.0.0:80 using ss -tuln',
      'curl tests confirm correct site content returned per Host header',
      'WEB_DEPLOYMENT_VERIFICATION.md completed'
    ]
  },
  {
    id: 'linux-04',
    code: 'LINUX-04',
    title: 'Linux Service Management & systemd Daemon Engineering',
    academy: 'linux',
    difficulty: 'Intermediate',
    estimatedTime: '8-12 hours',
    technologies: ['systemd Unit Files', 'systemctl', 'journalctl', 'Daemonization', 'cgroups', 'Auto-Restart'],
    overview: 'Engineer, package, and operate production-grade systemd service units for custom backend applications, implementing auto-restart policies, dedicated service accounts, sandboxing, resource controls (cgroups), and structured journal logging.',
    tags: ['linux', 'systemd', 'service-management', 'journald', 'daemons', 'cgroups'],
    projectOverview: {
      projectName: 'Linux Service Management & systemd Daemon Engineering',
      academy: 'linux',
      difficulty: 'Intermediate',
      estimatedEffort: '8-12 hours',
      technologies: ['systemd', 'systemctl', 'journalctl', 'systemd.service(5)', 'cgroups'],
      shortDescription: 'Transform a raw Python/Node.js script into a hardened background daemon managed by systemd with auto-restart, resource limits, and sandboxing.'
    },
    scenario: 'A developer has written a critical telemetry ingestion worker script (telemetry-worker.py) that currently runs inside a developer\'s tmux session. If the server reboots or the process crashes, the worker dies silently. You have been tasked with packaging this application as an official Linux system daemon managed by systemd.',
    problemStatement: 'Running production processes in ad-hoc terminal sessions or nohup scripts lacks crash recovery, centralized log retention, boot-time startup, and resource constraints. The application needs a production-grade systemd unit file with security sandboxing and automated lifecycle management.',
    projectObjective: [
      'Author a production-grade systemd service unit (/etc/systemd/system/telemetry.service)',
      'Run the service under a dedicated unprivileged system account (telemetry)',
      'Configure automated crash restart policies (Restart=on-failure, RestartSec=5s)',
      'Enforce security sandboxing (ProtectSystem=strict, PrivateTmp=true, NoNewPrivileges=true)',
      'Query and filter structured application logs using journalctl'
    ],
    whatYouNeedToBuild: {
      description: 'A fully managed systemd service running a worker process with automated recovery, logging, and security isolation.',
      diagram: `systemd (PID 1)
   │
   ├── Manages: /etc/systemd/system/telemetry.service
   │     ├── ExecStart=/usr/bin/python3 /opt/telemetry/worker.py
   │     ├── User=telemetry
   │     ├── Restart=on-failure
   │     ├── MemoryMax=256M (cgroups v2)
   │     └── Security Sandboxing: PrivateTmp, ProtectSystem
   │
   └── Aggregates Logs ──> journald (journalctl -u telemetry.service)`
    },
    requirements: {
      functional: [
        'The telemetry service must start automatically on system boot',
        'If the process is killed (kill -9), systemd must detect failure and restart it within 5 seconds',
        'Application stdout/stderr must stream directly to systemd-journald'
      ],
      technical: [
        'Create dedicated system user: useradd --system --no-create-home --shell /usr/sbin/nologin telemetry',
        'Unit file must define [Unit], [Service], and [Install] sections',
        'Reload systemd configuration via systemctl daemon-reload before starting'
      ],
      security: [
        'Service must not run as root',
        'Apply systemd security directives: ProtectHome=true, PrivateTmp=true, ProtectSystem=strict'
      ]
    },
    architecture: {
      summary: 'systemd init system process supervisor architecture controlling process lifecycle, IPC sockets, cgroup resource trees, and journald log sinks.',
      diagram: `PID 1 (systemd) ──(fork/exec)──> CGroup Sandbox (/sys/fs/cgroup) ──> telemetry process ──(stdout/stderr)──> journald`,
      components: [
        { name: 'systemd (PID 1)', role: 'Core system and service manager managing state machine transitions', technologies: ['systemd'] },
        { name: 'Unit File', role: 'Declarative service definition file in /etc/systemd/system/', technologies: ['INI format'] },
        { name: 'cgroups v2', role: 'Kernel control group restricting CPU and memory consumption', technologies: ['Linux cgroups'] },
        { name: 'systemd-journald', role: 'High-performance structured logging daemon collecting service stdout', technologies: ['Journald'] }
      ]
    },
    technologyRequirements: {
      required: ['Linux system running systemd (Ubuntu 20.04+, Debian 11+, RHEL 8+)', 'Python 3 or Node.js'],
      optional: ['systemd-analyze to inspect boot timing and security exposure'],
      outOfScope: ['Docker container daemon management']
    },
    functionalRequirements: [
      'Deploy mock worker script to /opt/telemetry/worker.py',
      'Create system user telemetry',
      'Write /etc/systemd/system/telemetry.service with Type=simple',
      'Enable and start service: systemctl enable --now telemetry',
      'Simulate crash: kill -9 $(pgrep -f worker.py) and verify systemd automatically restarts it',
      'Inspect service logs with journalctl -u telemetry -n 50 --no-pager'
    ],
    technicalRequirements: [
      'Run systemd-analyze security telemetry to evaluate sandbox score',
      'Configure MemoryMax=256M and CPUQuota=50% in the unit file',
      'Configure environment variables using EnvironmentFile=/opt/telemetry/.env'
    ],
    securityRequirements: [
      'Verify service cannot write outside /opt/telemetry/data (ReadWritePaths=/opt/telemetry/data)',
      'Ensure NoNewPrivileges=true prevents setuid binary escalation'
    ],
    constraints: [
      'Do not set User=root',
      'Do not use Restart=always for services that should exit cleanly on code 0'
    ],
    expectedOutcome: 'A rock-solid system daemon managed natively by systemd with automatic crash recovery, resource limits, and structured observability.',
    deliverables: [
      'Complete unit file /etc/systemd/system/telemetry.service',
      'Deployed application in /opt/telemetry/',
      'Verification evidence showing automatic restart after kill -9',
      'SYSTEMD_SERVICE_RUNBOOK.md documenting maintenance, logs, and security sandboxing'
    ],
    suggestedProjectStructure: `/opt/telemetry/
├── worker.py
├── .env
└── data/
/etc/systemd/system/
└── telemetry.service
SYSTEMD_SERVICE_RUNBOOK.md`,
    requiredConcepts: [
      { name: 'Services and systemd', lessonId: 'c-12-01', academyRoute: '/linux' },
      { name: 'Processes & Process Trees', lessonId: 'c-11-01', academyRoute: '/linux' },
      { name: 'Logging & System Observability', lessonId: 'c-20-01', academyRoute: '/linux' },
      { name: 'Linux Security & Sandboxing', lessonId: 'c-22-01', academyRoute: '/linux' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 12: Services & systemd', route: '/cloudstack/linux?concept=c-12-01' },
        { title: 'Chapter 11: Processes & Signals', route: '/cloudstack/linux?concept=c-11-01' },
        { title: 'Chapter 20: Logging & journald', route: '/cloudstack/linux?concept=c-20-01' }
      ],
      officialDocs: [
        { title: 'systemd.service(5) Manual', url: 'https://www.freedesktop.org/software/systemd/man/systemd.service.html' },
        { title: 'systemd.exec(5) Sandboxing Directives', url: 'https://www.freedesktop.org/software/systemd/man/systemd.exec.html' }
      ],
      referenceMaterial: ['Lennart Poettering: systemd for Administrators'],
      usefulCommands: [
        'sudo systemctl daemon-reload',
        'sudo systemctl start telemetry',
        'sudo systemctl status telemetry',
        'sudo systemctl enable telemetry',
        'sudo journalctl -u telemetry -f',
        'systemd-analyze security telemetry'
      ]
    },
    recommendedApproach: [
      '1. Create the application directory /opt/telemetry and the sample Python worker script.',
      '2. Create dedicated system user and group telemetry with restricted shell.',
      '3. Create write directory /opt/telemetry/data owned by telemetry:telemetry.',
      '4. Test running the script manually as user telemetry using sudo -u telemetry python3 /opt/telemetry/worker.py.',
      '5. Draft /etc/systemd/system/telemetry.service with Unit, Service, and Install sections.',
      '6. Configure restart behavior (Restart=on-failure, RestartSec=5).',
      '7. Configure security sandboxing (PrivateTmp, ProtectSystem, ProtectHome).',
      '8. Execute systemctl daemon-reload, then enable and start the service.',
      '9. Test crash recovery by sending SIGKILL to the process and monitoring journalctl.',
      '10. Document management commands in SYSTEMD_SERVICE_RUNBOOK.md.'
    ],
    importantConsiderations: [
      'What is the difference between Type=simple and Type=forking in systemd?',
      'Why does systemd require daemon-reload whenever a unit file on disk is modified?',
      'How does systemd-journald correlate application logs with process UID and cgroups?'
    ],
    commonPitfalls: [
      'Specifying relative paths in ExecStart instead of absolute binary paths (/usr/bin/python3).',
      'Failing to run systemctl daemon-reload after updating unit files, leading to stale configuration execution.',
      'Over-restricting systemd sandboxing (ProtectSystem=strict) without defining ReadWritePaths, causing silent permission denials.'
    ],
    optionalEnhancements: {
      beginner: ['Add pre-start validation check using ExecStartPre.'],
      intermediate: ['Configure a systemd timer (telemetry-cleaner.timer) to rotate worker data files.'],
      advanced: ['Create a systemd socket activation unit (telemetry.socket) that launches the worker only on demand.'],
      expert: ['Inspect and tune cgroups v2 memory limits in /sys/fs/cgroup/system.slice/telemetry.service/.']
    },
    completionChecklist: [
      'telemetry system user created with locked shell',
      'Worker application deployed to /opt/telemetry/',
      'Unit file /etc/systemd/system/telemetry.service created and loaded',
      'Service enabled to launch automatically on boot',
      'Kill test performed and process verified restarted by systemd',
      'journalctl confirms application logging is captured',
      'Sandboxing directives active and verified with systemd-analyze',
      'SYSTEMD_SERVICE_RUNBOOK.md authored'
    ]
  },
  {
    id: 'linux-05',
    code: 'LINUX-05',
    title: 'Linux Security Hardening & Bastion Host Architecture',
    academy: 'linux',
    difficulty: 'Intermediate+',
    estimatedTime: '10-14 hours',
    technologies: ['SSH Hardening', 'Fail2ban', 'AppArmor / SELinux', 'Sysctl Kernel Tuning', 'Auditd'],
    overview: 'Execute a comprehensive security hardening benchmark on an exposed Linux server, hardening SSH daemon policies, installing Fail2ban intrusion prevention, configuring sysctl network stack protections, and locking down file permissions.',
    tags: ['linux', 'security', 'hardening', 'ssh', 'fail2ban', 'sysctl', 'apparmor'],
    projectOverview: {
      projectName: 'Linux Security Hardening & Bastion Host Architecture',
      academy: 'linux',
      difficulty: 'Intermediate+',
      estimatedEffort: '10-14 hours',
      technologies: ['OpenSSH Server', 'Fail2ban', 'Sysctl', 'AppArmor', 'Auditd'],
      shortDescription: 'Transform an unhardened Linux server into a secure bastion host following CIS Security Benchmarks, enforcing key-only SSH, brute-force bans, and kernel parameters.'
    },
    scenario: 'Your security operations center (SOC) flagged that several public-facing Linux jump boxes are receiving thousands of automated brute-force attacks per hour. You have been tasked with transforming a standard Linux server into a hardened bastion host adhering to CIS (Center for Internet Security) Level 1 benchmarks.',
    problemStatement: 'Default Linux installations permit password authentication over SSH, allow root logins, have permissive kernel TCP/IP stack settings vulnerable to SYN floods and IP spoofing, and lack automatic brute-force throttling. A multi-layered defense-in-depth hardening protocol is required.',
    projectObjective: [
      'Harden OpenSSH daemon configuration (/etc/ssh/sshd_config)',
      'Deploy and configure Fail2ban to automatically block malicious IP addresses via iptables/nftables',
      'Harden Linux kernel network parameters via /etc/sysctl.d/99-security.conf',
      'Audit and eliminate insecure SUID/SGID binaries across the filesystem',
      'Verify AppArmor security profiles are enforcing application containment'
    ],
    whatYouNeedToBuild: {
      description: 'A hardened Linux bastion host with locked SSH, active intrusion defense, hardened kernel stack, and auditing.',
      diagram: `External Network Attack (Brute Force / Port Scan)
                     │
                     ▼
             [Fail2ban Jail (sshd)] ──> [iptables/nftables DROP]
                     │
                     ▼ (Clean traffic)
         [Hardened OpenSSH (Port 2222)]
         ├── PermitRootLogin no
         ├── PasswordAuthentication no
         └── PubkeyAuthentication yes
                     │
                     ▼
         [Hardened Linux Kernel (/etc/sysctl.d/)]
         ├── net.ipv4.conf.all.rp_filter = 1 (Spoof protection)
         └── net.ipv4.tcp_syncookies = 1 (SYN flood protection)`
    },
    requirements: {
      functional: [
        'SSH root login and password authentication must be completely disabled',
        'SSH must listen on a non-standard port or enforce strict key-based authentication',
        'Fail2ban must ban any IP address that fails 3 consecutive SSH authentication attempts within 10 minutes',
        'Kernel must reject ICMP redirects and ignore broadcast ping requests'
      ],
      technical: [
        'Edit /etc/ssh/sshd_config.d/99-hardened.conf and validate with sshd -t',
        'Deploy /etc/fail2ban/jail.local with custom bantime and findtime',
        'Apply kernel parameters using sudo sysctl -p /etc/sysctl.d/99-security.conf'
      ],
      security: [
        'Never lock yourself out: verify active SSH connection before restarting sshd',
        'Find and audit all SUID binaries using find / -perm -4000 2>/dev/null'
      ]
    },
    architecture: {
      summary: 'Defense-in-depth security architecture layering network packet filtering, application-layer intrusion detection, and kernel security enforcement.',
      diagram: `Network Edge ──> Kernel Packet Filter (sysctl + iptables) ──> Daemon Intrusion Detection (Fail2ban) ──> AppArmor Boundary`,
      components: [
        { name: 'Hardened sshd', role: 'Cryptographically secured remote access gateway', technologies: ['OpenSSH'] },
        { name: 'Fail2ban Daemon', role: 'Log watcher monitoring /var/log/auth.log and dynamically injecting firewall drop rules', technologies: ['Python / Netfilter'] },
        { name: 'Kernel Sysctl Engine', role: 'Runtime kernel parameter configurator mitigating low-level TCP/IP attacks', technologies: ['procfs / sysctl'] },
        { name: 'AppArmor', role: 'Mandatory Access Control (MAC) confinement engine', technologies: ['LSM (Linux Security Module)'] }
      ]
    },
    technologyRequirements: {
      required: ['Linux OS (Ubuntu 22.04 LTS)', 'OpenSSH Server', 'Fail2ban', 'AppArmor'],
      optional: ['Lynis security auditing tool for CIS compliance scoring'],
      outOfScope: ['Hardware HSM key modules']
    },
    functionalRequirements: [
      'Configure SSH: PasswordAuthentication no, PermitRootLogin no, X11Forwarding no, MaxAuthTries 3',
      'Configure Fail2ban: enable sshd jail with maxretry = 3 and bantime = 1h',
      'Create /etc/sysctl.d/99-security.conf with TCP syncookies, IP forwarding disabled, and reverse path filtering',
      'Apply sysctl settings and verify with sysctl net.ipv4.tcp_syncookies',
      'Audit SUID binaries and document justifications for remaining setuid files'
    ],
    technicalRequirements: [
      'Simulate 3 failed SSH logins and verify IP ban in sudo fail2ban-client status sshd',
      'Ensure AppArmor status shows enforced profiles (sudo aa-status)',
      'Run security scan (lynis audit system or custom script) and document score'
    ],
    securityRequirements: [
      'Maintain strict 600 permissions on private keys and 644 on public keys',
      'Ensure /etc/shadow is mode 640 and owned by root:shadow'
    ],
    constraints: [
      'Do not disable AppArmor or SELinux',
      'Do not leave password authentication enabled as a fallback'
    ],
    expectedOutcome: 'A certified, hardened Linux bastion server resilient against automated credential brute forcing, SYN flooding, and unauthorized escalation.',
    deliverables: [
      'Hardened OpenSSH configuration file',
      'Configured /etc/fail2ban/jail.local',
      'Kernel hardening profile /etc/sysctl.d/99-security.conf',
      'SECURITY_HARDENING_AUDIT.md detailing CIS compliance checklist and verification logs'
    ],
    suggestedProjectStructure: `/etc/ssh/sshd_config.d/
└── 99-hardened.conf
/etc/fail2ban/
└── jail.local
/etc/sysctl.d/
└── 99-security.conf
SECURITY_HARDENING_AUDIT.md`,
    requiredConcepts: [
      { name: 'Linux Security', lessonId: 'c-22-01', academyRoute: '/linux' },
      { name: 'SSH and Remote Access', lessonId: 'c-16-01', academyRoute: '/linux' },
      { name: 'Linux Administration & Hardening', lessonId: 'c-25-01', academyRoute: '/linux' },
      { name: 'Logging & Observability', lessonId: 'c-20-01', academyRoute: '/linux' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 22: Linux Security & Hardening', route: '/cloudstack/linux?concept=c-22-01' },
        { title: 'Chapter 16: SSH & Remote Access', route: '/cloudstack/linux?concept=c-16-01' },
        { title: 'Chapter 25: Linux Administration', route: '/cloudstack/linux?concept=c-25-01' }
      ],
      officialDocs: [
        { title: 'CIS Ubuntu Linux Benchmarks', url: 'https://www.cisecurity.org/benchmark/ubuntu_linux' },
        { title: 'Fail2ban Configuration Documentation', url: 'https://www.fail2ban.org/wiki/index.php/MANUAL_0_8' }
      ],
      referenceMaterial: ['NSA Guide to the Secure Configuration of Red Hat Enterprise Linux'],
      usefulCommands: [
        'sudo sshd -t',
        'sudo systemctl reload ssh',
        'sudo fail2ban-client status sshd',
        'sudo fail2ban-client set sshd unbanip <IP>',
        'sudo sysctl -p /etc/sysctl.d/99-security.conf',
        'sudo aa-status',
        'find / -perm -4000 -type f 2>/dev/null'
      ]
    },
    recommendedApproach: [
      '1. Verify SSH public key authentication is functioning before altering sshd_config.',
      '2. Author /etc/ssh/sshd_config.d/99-hardened.conf to disable password auth and root login.',
      '3. Test SSH syntax using sudo sshd -t before reloading the SSH service.',
      '4. Keep existing SSH connection active while opening a second terminal to verify key login.',
      '5. Install and enable fail2ban, creating /etc/fail2ban/jail.local.',
      '6. Configure sshd jail with findtime = 600, maxretry = 3, and bantime = 3600.',
      '7. Author /etc/sysctl.d/99-security.conf with TCP syncookies and anti-spoofing settings.',
      '8. Apply kernel parameters using sysctl --system and verify values.',
      '9. Run SUID audit search and review active AppArmor profiles.',
      '10. Document all changes and test outputs in SECURITY_HARDENING_AUDIT.md.'
    ],
    importantConsiderations: [
      'Why must an engineer always keep an active SSH session open when modifying sshd_config?',
      'How does reverse path filtering (rp_filter) prevent IP address spoofing attacks?',
      'What is the operational impact of setting fail2ban bantime to permanent versus temporary?'
    ],
    commonPitfalls: [
      'Disabling password authentication without first installing a working authorized_keys file.',
      'Editing /etc/fail2ban/jail.conf directly (which gets overwritten on package upgrades) instead of jail.local.',
      'Failing to test sshd configuration with sshd -t before restarting the daemon.'
    ],
    optionalEnhancements: {
      beginner: ['Configure legal warning banner in /etc/issue.net displayed upon SSH connection.'],
      intermediate: ['Install Lynis (sudo apt install lynis) and achieve a hardening index > 70.'],
      advanced: ['Configure two-factor authentication (2FA) for SSH using libpam-google-authenticator.'],
      expert: ['Write custom AppArmor profiles for an internal custom Python daemon.']
    },
    completionChecklist: [
      'SSH public key authentication verified',
      'Password authentication and root login disabled in OpenSSH',
      'Fail2ban installed, enabled, and protecting SSH port',
      'Simulated failed logins trigger automated firewall IP ban',
      '/etc/sysctl.d/99-security.conf deployed and active',
      'SUID audit completed and documented',
      'AppArmor status verified active',
      'SECURITY_HARDENING_AUDIT.md published'
    ]
  },
  {
    id: 'linux-06',
    code: 'LINUX-06',
    title: 'Server Monitoring, Performance Tuning & Triage',
    academy: 'linux',
    difficulty: 'Advanced',
    estimatedTime: '10-14 hours',
    technologies: ['htop / atop', 'iostat / vmstat', 'sar (sysstat)', 'dmesg / journalctl', 'strace / lsof'],
    overview: 'Diagnose and resolve real-world Linux performance bottlenecks spanning CPU saturation, memory exhaustion (OOM killer), disk I/O wait, network packet drops, and locked file descriptors using standard Linux profiling utilities.',
    tags: ['linux', 'monitoring', 'performance', 'strace', 'sysstat', 'iostat', 'triage'],
    projectOverview: {
      projectName: 'Server Monitoring, Performance Tuning & Triage',
      academy: 'linux',
      difficulty: 'Advanced',
      estimatedEffort: '10-14 hours',
      technologies: ['sysstat (sar)', 'vmstat / iostat', 'strace', 'lsof', 'dmesg'],
      shortDescription: 'Triage and resolve live Linux production degradation scenarios spanning CPU starvation, memory leaks, I/O wait bottlenecks, and zombie processes.'
    },
    scenario: 'You are on call when an alert fires indicating that a core production database server is unresponsive. CPU load average has surged to 45.0 on an 8-core machine, application requests are timing out, and disk writes are stalling. You must log into the degraded host, diagnose the root cause without rebooting, and restore system health.',
    problemStatement: 'Engineers often jump to conclusions (e.g. rebooting or blindly adding RAM) when a server slows down. In reality, bottlenecks stem from specific subsystems: CPU run-queue saturation, disk wait (uninterruptible D-state processes), thrashing swap space, or leaked file descriptors. You must systematically isolate the bottleneck.',
    projectObjective: [
      'Employ the USE Method (Utilization, Saturation, and Errors) to evaluate CPU, memory, storage, and network',
      'Use vmstat, iostat, and htop to identify process states (R, S, D, Z) and differentiate CPU burn from I/O wait',
      'Use strace to trace system calls of a stalled process and identify blocking syscalls (read, futex, write)',
      'Diagnose out-of-memory (OOM) killer events in kernel ring buffer (dmesg)',
      'Inspect open file descriptors and socket leaks using lsof and /proc/<PID>/fd'
    ],
    whatYouNeedToBuild: {
      description: 'A comprehensive performance diagnostic playbook and simulated triage scenarios with root-cause resolutions.',
      diagram: `System Degradation Alert (Load Average: 45.0)
                 │
                 ▼
     [Triage Phase 1: High-Level USE Check]
     ├── uptime & top (Differentiate %usr, %sys, %iowait)
     ├── vmstat 1 5 (Check r run-queue and b blocked processes)
     └── free -m (Check available RAM vs active swap thrashing)
                 │
                 ▼
     [Triage Phase 2: Deep Component Isolation]
     ├── iostat -xz 1 (Identify saturated disk devices)
     ├── lsof -p <PID> (Check leaked file descriptors)
     └── strace -p <PID> -c (Profile blocking system calls)
                 │
                 ▼
     [Root Cause Remediation & Service Recovery]`
    },
    requirements: {
      functional: [
        'Identify whether a simulated spike is caused by compute saturation or I/O wait',
        'Locate a rogue process generating excessive unbuffered disk writes and throttle or terminate it',
        'Identify a simulated memory-leaking process before the kernel OOM killer terminates critical daemons'
      ],
      technical: [
        'Install and configure sysstat with 1-minute collection intervals',
        'Use strace -p <pid> to trace live process execution',
        'Extract historical system metrics using sar -u and sar -d'
      ],
      security: [
        'Exercise caution when attaching strace to production processes (avoid overhead and credential leakage)'
      ]
    },
    architecture: {
      summary: 'Linux kernel observability subsystem architecture spanning /proc, /sys, perf tracepoints, and user-space instrumentation.',
      diagram: `Kernel Subsystems (CPU Scheduler, VFS, Memory Subsystem, Network Stack)
                         │
        [Kernel Counters & Tracepoints (/proc, /sys)]
                         │
      ┌──────────────────┼──────────────────┐
      ▼                  ▼                  ▼
[vmstat / iostat]    [sar / sysstat]    [strace / lsof]`,
      components: [
        { name: '/proc filesystem', role: 'Virtual filesystem exposing kernel process tables and memory stats', technologies: ['procfs'] },
        { name: 'sysstat / sar', role: 'Background performance accounting engine sampling metrics periodically', technologies: ['sar / sadc'] },
        { name: 'strace / ptrace', role: 'Process tracer intercepting and recording system calls and signals', technologies: ['ptrace'] },
        { name: 'Kernel dmesg', role: 'Circular buffer recording hardware, driver, and OOM killer events', technologies: ['Kernel Ring Buffer'] }
      ]
    },
    technologyRequirements: {
      required: ['Linux OS (Ubuntu, Debian, RHEL)', 'sysstat', 'strace', 'lsof', 'htop'],
      optional: ['stress-ng or stress tool to generate controlled workloads'],
      outOfScope: ['Third-party SaaS agents (Datadog, New Relic)']
    },
    functionalRequirements: [
      'Install sysstat, htop, iotop, and strace',
      'Generate a synthetic CPU and I/O load using stress-ng or dd/yes commands',
      'Run vmstat 1 10 and interpret r (running), b (blocked), and wa (wait) columns',
      'Use iostat -xz 1 to measure %util and await on storage devices',
      'Attach strace to a busy process and summarize syscalls with strace -c -p <PID>',
      'Identify process holding deleted open files using lsof | grep deleted'
    ],
    technicalRequirements: [
      'Document difference between load average and CPU percentage',
      'Compile historical sar reports covering CPU, memory, and disk'
    ],
    securityRequirements: [
      'Ensure unprivileged users cannot execute ptrace on processes owned by other users (kernel.yama.ptrace_scope)'
    ],
    constraints: [
      'Do not solve performance issues by simply rebooting the server',
      'Do not leave continuous stress-ng workloads running indefinitely'
    ],
    expectedOutcome: 'Advanced capability to diagnose, trace, and remediate Linux performance degradation and resource starvation using native CLI tooling.',
    deliverables: [
      'Configured sysstat data collection service',
      'PERFORMANCE_TRIAGE_RUNBOOK.md documenting the 10-step emergency triage procedure',
      'INCIDENT_SIMULATION_REPORT.md analyzing three simulated bottleneck scenarios and resolutions'
    ],
    suggestedProjectStructure: `/opt/triage-lab/
├── scripts/
│   ├── simulate_cpu_burn.sh
│   ├── simulate_io_bottleneck.sh
│   └── simulate_fd_leak.sh
├── PERFORMANCE_TRIAGE_RUNBOOK.md
└── INCIDENT_SIMULATION_REPORT.md`,
    requiredConcepts: [
      { name: 'System Performance & Load Average', lessonId: 'c-21-01', academyRoute: '/linux' },
      { name: 'Processes & Process States', lessonId: 'c-11-01', academyRoute: '/linux' },
      { name: 'Disks and Storage', lessonId: 'c-14-01', academyRoute: '/linux' },
      { name: 'Filesystem & Troubleshooting', lessonId: 'c-24-01', academyRoute: '/linux' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 21: System Performance', route: '/cloudstack/linux?concept=c-21-01' },
        { title: 'Chapter 11: Processes & Signals', route: '/cloudstack/linux?concept=c-11-01' },
        { title: 'Chapter 24: Troubleshooting & Diagnostics', route: '/cloudstack/linux?concept=c-24-01' }
      ],
      officialDocs: [
        { title: 'Brendan Gregg - Linux Performance Analysis and Tools', url: 'https://www.brendangregg.com/linuxperf.html' },
        { title: 'sysstat Documentation', url: 'https://github.com/sysstat/sysstat' }
      ],
      referenceMaterial: ['Systems Performance: Enterprise and the Cloud by Brendan Gregg'],
      usefulCommands: [
        'uptime',
        'vmstat 1 5',
        'iostat -xz 1 5',
        'sar -u 1 5',
        'lsof -p <PID>',
        'lsof +L1',
        'strace -c -p <PID>',
        'dmesg -T | grep -i oom'
      ]
    },
    recommendedApproach: [
      '1. Review Brendan Gregg\'s Linux Performance 60-Second Checklist.',
      '2. Install sysstat, lsof, htop, and iotop.',
      '3. Enable sysstat historical accounting in /etc/default/sysstat.',
      '4. Launch a controlled CPU load script and observe load average versus %usr in top.',
      '5. Run vmstat 1 to examine run-queue length in the r column.',
      '6. Launch a heavy I/O workload and observe the b (blocked) column and %wa.',
      '7. Use iostat -xz 1 to identify which block device is at 100% utilization.',
      '8. Simulate an application holding open an unlinked (deleted) log file and reclaim disk space using lsof +L1.',
      '9. Use strace to inspect a spinning process and identify system call bottlenecks.',
      '10. Author PERFORMANCE_TRIAGE_RUNBOOK.md and INCIDENT_SIMULATION_REPORT.md.'
    ],
    importantConsiderations: [
      'What does a high load average with low CPU percentage indicate about system bottlenecks?',
      'Why does deleting a large log file with rm fail to free disk space if a process still holds it open?',
      'What are the dangers of running strace on high-throughput database or payment processes?'
    ],
    commonPitfalls: [
      'Assuming 100% CPU utilization is always a bug, when it may simply indicate full hardware efficiency.',
      'Mistaking cached RAM for unavailable memory in free -m output.',
      'Killing processes with kill -9 before attempting graceful shutdown with SIGTERM (kill -15).'
    ],
    optionalEnhancements: {
      beginner: ['Configure atop to record daily system activity logs.'],
      intermediate: ['Write a bash watchdog script that alerts when load average exceeds CPU count by 2x.'],
      advanced: ['Use perf top to profile kernel and user-space CPU instruction hotspots.'],
      expert: ['Trace file I/O latency using eBPF tools (biolatency or biosnoop).']
    },
    completionChecklist: [
      'sysstat package installed, enabled, and logging metrics',
      'CPU, memory, and I/O bottlenecks diagnosed using vmstat and iostat',
      'Process states (R, S, D, Z) identified and documented',
      'strace utilized to inspect live process system call frequencies',
      'Leaked deleted files identified with lsof +L1 and mitigated',
      'OOM killer log signature verified in dmesg',
      'PERFORMANCE_TRIAGE_RUNBOOK.md completed',
      'INCIDENT_SIMULATION_REPORT.md compiled'
    ]
  },
  {
    id: 'linux-07',
    code: 'LINUX-07',
    title: 'Production Web Server Stack with Reverse Proxy & SSL/TLS',
    academy: 'linux',
    difficulty: 'Advanced+',
    estimatedTime: '12-16 hours',
    technologies: ['Nginx', 'Gunicorn / Node.js', 'systemd', 'SSL/TLS (OpenSSL)', 'Log Rotation', 'Security Headers'],
    overview: 'Architect and deploy an enterprise three-tier web application stack on Linux, featuring an unprivileged backend service managed by systemd, Nginx reverse proxy with TLS termination, logrotate maintenance, and OWASP security headers.',
    tags: ['linux', 'production', 'nginx', 'reverse-proxy', 'ssl-tls', 'logrotate', 'owasp'],
    projectOverview: {
      projectName: 'Production Web Server Stack with Reverse Proxy & SSL/TLS',
      academy: 'linux',
      difficulty: 'Advanced+',
      estimatedEffort: '12-16 hours',
      technologies: ['Nginx Reverse Proxy', 'OpenSSL TLS', 'systemd Service', 'logrotate', 'OWASP Headers'],
      shortDescription: 'Build an enterprise-grade production Linux web stack featuring Nginx reverse proxying to a systemd backend daemon, TLS encryption, log rotation, and security headers.'
    },
    scenario: 'Your company is taking an internal microservice and promoting it to an external customer-facing API. You must engineer the complete Linux hosting architecture: the application must run as an isolated systemd daemon binding to localhost, fronted by Nginx handling TLS termination, rate-limiting, and compression.',
    problemStatement: 'Running Python/Node application servers directly exposed to the internet is dangerous: they lack robust SSL/TLS termination, cannot efficiently serve static files, lack slowloris DDoS protection, and do not rotate logs. An architectural reverse proxy stack is required.',
    projectObjective: [
      'Deploy backend API application managed by systemd, listening exclusively on 127.0.0.1:5000',
      'Configure Nginx reverse proxy terminating TLS and passing traffic via proxy_pass',
      'Generate and install a strong TLS certificate with modern cipher suites and HTTP/2',
      'Configure automated log rotation via /etc/logrotate.d/ to prevent disk exhaustion',
      'Inject OWASP recommended security headers (HSTS, CSP, X-Frame-Options)'
    ],
    whatYouNeedToBuild: {
      description: 'A complete production Linux web serving platform with reverse proxy, SSL termination, systemd backend, and log management.',
      diagram: `Client HTTPS (Port 443)
          │
          ▼
    [Nginx Reverse Proxy]
    ├── SSL/TLS Termination (Modern Ciphers, HTTP/2)
    ├── OWASP Headers (HSTS, CSP, X-Content-Type-Options)
    ├── Static Asset Caching (/var/www/static/)
    └── Rate Limiting (limit_req_zone)
          │
          ▼ proxy_pass http://127.0.0.1:5000
    [Backend Application (Python/Node)]
    ├── Managed by: /etc/systemd/system/api.service
    ├── Runs as: unprivileged user 'api-user'
    └── Logs rotated via: /etc/logrotate.d/api-service`
    },
    requirements: {
      functional: [
        'HTTPS client requests on port 443 must be securely reverse-proxied to backend on port 5000',
        'HTTP port 80 requests must automatically redirect to HTTPS (301 Moved Permanently)',
        'Backend daemon must be invisible to external network interfaces (bound only to 127.0.0.1)'
      ],
      technical: [
        'Configure Nginx proxy_set_header for Host, X-Real-IP, and X-Forwarded-Proto',
        'Generate TLS private key (2048-bit RSA or ECDSA P-256) and certificate',
        'Deploy logrotate configuration keeping 14 days of compressed logs'
      ],
      security: [
        'Enforce TLSv1.2 and TLSv1.3 only (disable SSLv3, TLSv1.0, TLSv1.1)',
        'Configure Strict-Transport-Security (HSTS), X-Frame-Options DENY, and X-Content-Type-Options nosniff'
      ]
    },
    architecture: {
      summary: 'Tiered Linux application serving architecture separating public edge proxy, local loopback IPC, application runtime, and operational log management.',
      diagram: `Public Ingress (eth0:443) ──> Nginx (TLS + Caching) ──(127.0.0.1:5000)──> Backend App (systemd) ──> Logrotate Storage`,
      components: [
        { name: 'Nginx Edge Proxy', role: 'TLS termination, reverse proxy, and static file server', technologies: ['Nginx', 'OpenSSL'] },
        { name: 'systemd Service (api.service)', role: 'Supervisor managing the unprivileged backend application process', technologies: ['systemd'] },
        { name: 'Backend Application', role: 'API service processing dynamic business logic', technologies: ['Python / Node.js'] },
        { name: 'Logrotate Subsystem', role: 'Periodic log compression, archiving, and truncation', technologies: ['logrotate / cron'] }
      ]
    },
    technologyRequirements: {
      required: ['Linux OS (Ubuntu 22.04 LTS)', 'Nginx', 'OpenSSL', 'systemd', 'logrotate'],
      optional: ['Certbot for automated Let\'s Encrypt certificates'],
      outOfScope: ['Distributed Kubernetes ingress controllers']
    },
    functionalRequirements: [
      'Create and start backend service listening on 127.0.0.1:5000 managed by systemd',
      'Generate TLS certificate and private key using openssl req',
      'Configure Nginx server block listening on 443 ssl http2 with proxy_pass http://127.0.0.1:5000',
      'Configure HTTP to HTTPS redirect on port 80',
      'Configure logrotate rule in /etc/logrotate.d/api-service with daily, rotate 14, compress, and delaycompress',
      'Test logrotate execution using logrotate -d /etc/logrotate.d/api-service'
    ],
    technicalRequirements: [
      'Validate TLS configuration with openssl s_client -connect 127.0.0.1:443',
      'Inspect HTTP response headers with curl -I https://localhost --insecure to verify security headers',
      'Verify backend is not listening on 0.0.0.0 using ss -tuln'
    ],
    securityRequirements: [
      'Ensure private key permissions are mode 600 and readable only by root',
      'Verify backend service runs as user api-user with NoNewPrivileges=true'
    ],
    constraints: [
      'Do not bind the backend application directly to external IP interfaces',
      'Do not allow plaintext HTTP traffic to access the API without redirecting'
    ],
    expectedOutcome: 'A production-grade, hardened Linux web hosting environment featuring reverse proxying, TLS encryption, systemd process supervision, and automated log maintenance.',
    deliverables: [
      'Nginx reverse proxy configuration with TLS and security headers',
      'systemd unit file /etc/systemd/system/api.service',
      'Logrotate configuration /etc/logrotate.d/api-service',
      'PRODUCTION_STACK_VERIFICATION.md detailing curl header inspection, SSL handshake logs, and logrotate test output'
    ],
    suggestedProjectStructure: `/etc/nginx/sites-available/
└── api.production.conf
/etc/ssl/
├── certs/api.crt
└── private/api.key
/etc/systemd/system/
└── api.service
/etc/logrotate.d/
└── api-service
PRODUCTION_STACK_VERIFICATION.md`,
    requiredConcepts: [
      { name: 'Services and systemd', lessonId: 'c-12-01', academyRoute: '/linux' },
      { name: 'Linux Networking', lessonId: 'c-15-01', academyRoute: '/linux' },
      { name: 'Logging and Observability', lessonId: 'c-20-01', academyRoute: '/linux' },
      { name: 'Linux Security & Hardening', lessonId: 'c-22-01', academyRoute: '/linux' },
      { name: 'Linux for Developers', lessonId: 'c-26-01', academyRoute: '/linux' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 12: Services & systemd', route: '/cloudstack/linux?concept=c-12-01' },
        { title: 'Chapter 15: Linux Networking', route: '/cloudstack/linux?concept=c-15-01' },
        { title: 'Chapter 20: Logging & Logrotate', route: '/cloudstack/linux?concept=c-20-01' }
      ],
      officialDocs: [
        { title: 'Mozilla SSL Configuration Generator', url: 'https://ssl-config.mozilla.org/' },
        { title: 'Nginx Reverse Proxy Guide', url: 'https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/' }
      ],
      referenceMaterial: ['OWASP Secure Headers Project'],
      usefulCommands: [
        'openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/api.key -out /etc/ssl/certs/api.crt',
        'nginx -t',
        'systemctl reload nginx',
        'curl -I -k https://127.0.0.1',
        'openssl s_client -connect 127.0.0.1:443 -tls1_2',
        'sudo logrotate -d /etc/logrotate.d/api-service'
      ]
    },
    recommendedApproach: [
      '1. Create the backend application script and test standalone on 127.0.0.1:5000.',
      '2. Create system user api-user and configure /etc/systemd/system/api.service.',
      '3. Start and enable api.service; confirm socket binding via ss -tuln | grep 5000.',
      '4. Generate a TLS key and certificate using openssl req.',
      '5. Set secure permissions on private key (chmod 600 /etc/ssl/private/api.key).',
      '6. Configure Nginx virtual host with SSL termination, modern cipher suites, and proxy_pass.',
      '7. Inject OWASP security headers (HSTS, CSP, X-Frame-Options) into Nginx config.',
      '8. Configure HTTP port 80 to redirect to HTTPS.',
      '9. Author /etc/logrotate.d/api-service and verify using logrotate -d (dry-run).',
      '10. Verify end-to-end stack using curl and openssl s_client, then document in PRODUCTION_STACK_VERIFICATION.md.'
    ],
    importantConsiderations: [
      'Why is proxy_set_header X-Forwarded-Proto $scheme necessary when terminating SSL at Nginx?',
      'What happens if logrotate does not signal the backend process (e.g. via postrotate or copytruncate) after rotating active log files?',
      'Why should TLS private keys always reside in /etc/ssl/private with restricted mode 600 permissions?'
    ],
    commonPitfalls: [
      'Binding the backend application to 0.0.0.0:5000, allowing attackers to bypass Nginx and connect directly.',
      'Failing to include copytruncate in logrotate for applications that keep file handles open continuously.',
      'Configuring HSTS with long max-age during development, causing browsers to permanently refuse non-HTTPS connections.'
    ],
    optionalEnhancements: {
      beginner: ['Enable HTTP/2 support in Nginx listen directive.'],
      intermediate: ['Configure Nginx client body size limit (client_max_body_size 10M).'],
      advanced: ['Configure OCSP Stapling in Nginx for faster SSL handshake validation.'],
      expert: ['Set up automated certificate renewal with Certbot and test renewal hooks.']
    },
    completionChecklist: [
      'Backend daemon running under systemd as unprivileged user',
      'Backend verified listening exclusively on 127.0.0.1:5000',
      'TLS certificates generated and secured in /etc/ssl/',
      'Nginx configured with proxy_pass, modern TLS, and HTTP/2',
      'Port 80 automatically redirects to port 443 HTTPS',
      'OWASP security headers verified in curl -I output',
      'Logrotate configuration authored and dry-run validated',
      'PRODUCTION_STACK_VERIFICATION.md published'
    ]
  },
  {
    id: 'linux-08',
    code: 'LINUX-08',
    title: 'High-Availability Linux Architecture & Load Balancing',
    academy: 'linux',
    difficulty: 'Expert',
    estimatedTime: '14-18 hours',
    technologies: ['Keepalived', 'VRRP (Virtual Router Redundancy)', 'HAProxy', 'Health Checks', 'Failover Testing'],
    overview: 'Design, implement, and validate a high-availability two-node Linux load balancing cluster using Keepalived and VRRP for virtual IP failover, fronting a pool of backend web servers with active health checking.',
    tags: ['linux', 'high-availability', 'keepalived', 'vrrp', 'haproxy', 'clustering', 'failover'],
    projectOverview: {
      projectName: 'High-Availability Linux Architecture & Load Balancing',
      academy: 'linux',
      difficulty: 'Expert',
      estimatedEffort: '14-18 hours',
      technologies: ['Keepalived', 'VRRP Protocol', 'HAProxy', 'Virtual IP (VIP)', 'Health Checks'],
      shortDescription: 'Build an enterprise high-availability load balancing tier using Keepalived and HAProxy, delivering sub-second virtual IP failover and zero-downtime application routing.'
    },
    scenario: 'Your platform serves critical healthcare telemetry. A single load balancer represents a single point of failure (SPOF) that violates service level agreements (SLAs). You have been assigned to architect and deploy a dual-node active/passive high-availability load balancing cluster using Keepalived and HAProxy.',
    problemStatement: 'If a single web server or load balancer crashes, all user traffic fails. Redundancy requires shared virtual IP failover: if node A crashes, node B must instantly assume the virtual IP without human intervention and continue routing client requests.',
    projectObjective: [
      'Deploy two Linux load balancer nodes (LB1 - Master, LB2 - Backup)',
      'Configure Keepalived with Virtual Router Redundancy Protocol (VRRP) to manage a shared Virtual IP (VIP: 192.168.1.100)',
      'Deploy and configure HAProxy on both nodes to balance traffic across multiple backend web servers',
      'Implement health check scripts in Keepalived to automatically yield the VIP if HAProxy fails',
      'Execute deliberate failover simulations and verify zero-downtime transition'
    ],
    whatYouNeedToBuild: {
      description: 'A redundant dual-node Linux cluster managing a floating Virtual IP with active health checking and traffic distribution.',
      diagram: `                 Client Requests ──> [Virtual IP: 192.168.1.100]
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
             [LB Node 1 (MASTER)]                        [LB Node 2 (BACKUP)]
             ├── Keepalived (Priority 101)               ├── Keepalived (Priority 100)
             └── HAProxy (Active)                        └── HAProxy (Standby VIP)
                       │                                           │
                       └─────────────────────┬─────────────────────┘
                                             │
                                   [Backend Web Pool]
                                   ├── Web Server 1 (192.168.1.10)
                                   └── Web Server 2 (192.168.1.11)`
    },
    requirements: {
      functional: [
        'Virtual IP (VIP) must reside on LB1 under normal operations',
        'If LB1 is powered down or Keepalived stopped, LB2 must assume the VIP in < 2 seconds',
        'If HAProxy service fails on LB1, Keepalived health check script must detect failure and trigger VIP failover',
        'HAProxy must balance traffic round-robin between backend servers'
      ],
      technical: [
        'Enable net.ipv4.ip_nonlocal_bind = 1 in sysctl to allow binding to unassigned VIP',
        'Configure Keepalived vrrp_instance with priority 101 on LB1 and 100 on LB2',
        'Deploy vrrp_script checking killall -0 haproxy'
      ],
      security: [
        'Secure VRRP heartbeat communications using authentication blocks with strong passphrases',
        'Ensure firewall allows VRRP multicast traffic (protocol 112)'
      ]
    },
    architecture: {
      summary: 'High-availability clustering architecture combining VRRP multicast state heartbeats, floating virtual IP aliasing, and Layer 7 reverse proxying.',
      diagram: `VRRP Multicast (224.0.0.18) <── Keepalived Heartbeat ──> Floating VIP Interface ──> HAProxy TCP/HTTP Engine`,
      components: [
        { name: 'VRRP Engine (Keepalived)', role: 'Multicast clustering daemon managing virtual IP failover state machine', technologies: ['Keepalived', 'VRRP v2/v3'] },
        { name: 'Floating Virtual IP', role: 'Virtual network address mapped to active node interface', technologies: ['Linux IP Alias / ARP'] },
        { name: 'HAProxy Layer 7 Proxy', role: 'High-performance load balancer distributing HTTP requests', technologies: ['HAProxy'] },
        { name: 'Health Check Watchdog', role: 'Periodic script verifying local service availability', technologies: ['Bash / systemd'] }
      ]
    },
    technologyRequirements: {
      required: ['Linux OS (2 nodes: Ubuntu 22.04 LTS or Debian 12)', 'Keepalived', 'HAProxy'],
      optional: ['2 backend web servers (can be lightweight Python/Nginx instances)'],
      outOfScope: ['BGP Anycast routing']
    },
    functionalRequirements: [
      'Configure net.ipv4.ip_nonlocal_bind = 1 on both load balancer nodes',
      'Install and configure HAProxy on LB1 and LB2 balancing across backends',
      'Install and configure Keepalived on LB1 (MASTER, priority 101) and LB2 (BACKUP, priority 100)',
      'Add chk_haproxy script to Keepalived reducing priority on service failure',
      'Verify VIP bound to interface on LB1 using ip addr show',
      'Simulate failover: stop Keepalived on LB1; verify LB2 claims VIP; curl VIP continuously during transition'
    ],
    technicalRequirements: [
      'Observe VRRP state changes in journalctl -u keepalived -f',
      'Inspect gratuitous ARP announcements during failover',
      'HAProxy statistics page enabled on port 8404'
    ],
    securityRequirements: [
      'Configure firewall to permit VRRP protocol (proto vrrp or protocol 112)',
      'Protect HAProxy statistics dashboard with authentication'
    ],
    constraints: [
      'Do not allow both nodes to claim the VIP simultaneously (split-brain condition)',
      'Do not disable VRRP authentication'
    ],
    expectedOutcome: 'A resilient, enterprise high-availability Linux load balancing cluster capable of sub-second automatic failover during hardware or service faults.',
    deliverables: [
      'LB1 Keepalived configuration (/etc/keepalived/keepalived.conf)',
      'LB2 Keepalived configuration (/etc/keepalived/keepalived.conf)',
      'HAProxy load balancing configuration (/etc/haproxy/haproxy.cfg)',
      'HA_FAILOVER_REPORT.md documenting failover latency, test commands, and split-brain prevention'
    ],
    suggestedProjectStructure: `/etc/keepalived/
├── keepalived.conf (on LB1 & LB2)
└── check_haproxy.sh
/etc/haproxy/
└── haproxy.cfg
HA_FAILOVER_REPORT.md`,
    requiredConcepts: [
      { name: 'Linux Networking & Sockets', lessonId: 'c-15-01', academyRoute: '/linux' },
      { name: 'Services and systemd', lessonId: 'c-12-01', academyRoute: '/linux' },
      { name: 'Production Linux Architectures', lessonId: 'c-29-01', academyRoute: '/linux' },
      { name: 'Security & Firewalls', lessonId: 'c-22-01', academyRoute: '/linux' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 15: Linux Networking', route: '/cloudstack/linux?concept=c-15-01' },
        { title: 'Chapter 29: Production Linux Architectures', route: '/cloudstack/linux?concept=c-29-01' }
      ],
      officialDocs: [
        { title: 'Keepalived User Guide', url: 'https://www.keepalived.org/doc/' },
        { title: 'HAProxy Configuration Manual', url: 'https://www.haproxy.org/download/2.6/doc/configuration.txt' }
      ],
      referenceMaterial: ['High Availability Cluster Design Patterns'],
      usefulCommands: [
        'ip addr show eth0',
        'sudo sysctl -w net.ipv4.ip_nonlocal_bind=1',
        'sudo systemctl restart keepalived haproxy',
        'sudo journalctl -u keepalived -f',
        'sudo fail2ban-client status'
      ]
    },
    recommendedApproach: [
      '1. Provision or designate two Linux instances (LB1: 192.168.1.11, LB2: 192.168.1.12).',
      '2. Enable net.ipv4.ip_nonlocal_bind in /etc/sysctl.d/99-haproxy.conf on both nodes.',
      '3. Install Keepalived and HAProxy on both nodes.',
      '4. Configure HAProxy with frontend bound to VIP:80 and backend pool of web servers.',
      '5. Author /etc/keepalived/check_haproxy.sh to test HAProxy process health.',
      '6. Configure /etc/keepalived/keepalived.conf on LB1 as state MASTER, priority 101.',
      '7. Configure /etc/keepalived/keepalived.conf on LB2 as state BACKUP, priority 100.',
      '8. Start both services and verify LB1 acquires the virtual IP (192.168.1.100).',
      '9. Run a continuous curl loop against the VIP from a client workstation.',
      '10. Stop Keepalived on LB1; observe immediate VIP transition to LB2 with zero dropped requests; document findings.'
    ],
    importantConsiderations: [
      'What causes a "split-brain" scenario in Keepalived, and how does multicast network connectivity prevent it?',
      'Why is net.ipv4.ip_nonlocal_bind necessary for HAProxy on the backup node before it possesses the VIP?',
      'How does VRRP preempt mode affect failback behavior when a recovered master comes back online?'
    ],
    commonPitfalls: [
      'Firewalls blocking VRRP multicast traffic (protocol 112), causing both nodes to assume they are MASTER.',
      'Forgetting to configure health check scripts, causing Keepalived to hold the VIP even after HAProxy has crashed.',
      'Using identical VRRP router IDs across different clusters on the same Layer 2 broadcast domain.'
    ],
    optionalEnhancements: {
      beginner: ['Configure Keepalived email notifications upon state change.'],
      intermediate: ['Configure non-preempt mode (nopreempt) so a recovered node does not immediately take back the VIP.'],
      advanced: ['Implement SSL termination with ALPN and HTTP/2 on the HAProxy layer.'],
      expert: ['Configure connection synchronization using conntrackd to preserve active TCP connections during failover.']
    },
    completionChecklist: [
      'Dual Linux load balancer instances configured with nonlocal binding',
      'HAProxy installed and configured on both nodes',
      'Keepalived configured on LB1 (Master) and LB2 (Backup) with shared VIP',
      'HAProxy health check script integrated into Keepalived',
      'Virtual IP verified on LB1 during normal state',
      'Simulated node failure demonstrates automated failover to LB2 in under 2 seconds',
      'Continuous client curl requests confirm zero downtime',
      'HA_FAILOVER_REPORT.md authored'
    ]
  },
  {
    id: 'linux-09',
    code: 'LINUX-09',
    title: 'Linux Storage Operations, LVM & Automated Backup Architecture',
    academy: 'linux',
    difficulty: 'Expert / Production',
    estimatedTime: '14-18 hours',
    technologies: ['LVM (Logical Volume Manager)', 'RAID / mdadm', 'Filesystems (ext4/XFS)', 'LVM Snapshots', 'Rsync / Cron'],
    overview: 'Design and operate enterprise Linux storage infrastructure utilizing Logical Volume Management (LVM), software RAID arrays, dynamic volume expansion without unmounting, atomic LVM snapshots, and automated off-site backup pipelines.',
    tags: ['linux', 'storage', 'lvm', 'raid', 'snapshots', 'backups', 'cron', 'xfs'],
    projectOverview: {
      projectName: 'Linux Storage Operations, LVM & Automated Backup Architecture',
      academy: 'linux',
      difficulty: 'Expert / Production',
      estimatedEffort: '14-18 hours',
      technologies: ['LVM (pv, vg, lv)', 'mdadm RAID', 'Filesystems (ext4/xfs)', 'LVM Snapshots', 'Rsync'],
      shortDescription: 'Architect a storage operations platform managing software RAID, dynamic LVM volume growth without downtime, consistent volume snapshots, and automated encrypted backups.'
    },
    scenario: 'Your database partition (/var/lib/postgresql) is 92% full and projected to exhaust disk space within 48 hours. The server cannot be taken offline for maintenance. You must add new block storage devices, configure LVM storage pools, dynamically extend the volume group and logical volume online without unmounting, and establish atomic snapshot backups.',
    problemStatement: 'Static partition tables (fdisk/parted) cannot grow across physical disks without destructive repartitioning and downtime. Production operations require Logical Volume Management (LVM) for online volume expansion and snapshot-based consistent backups.',
    projectObjective: [
      'Initialize Physical Volumes (PVs), assemble Volume Groups (VGs), and allocate Logical Volumes (LVs)',
      'Format and mount an LVM volume using XFS or ext4 filesystem with persistent /etc/fstab entries',
      'Perform live online storage expansion: add a new PV, extend the VG, and expand the LV and filesystem without unmounting',
      'Create an atomic LVM snapshot volume to capture a point-in-time consistent database backup',
      'Automate nightly incremental backups using rsync, GPG encryption, and scheduled cron jobs'
    ],
    whatYouNeedToBuild: {
      description: 'An enterprise LVM storage architecture with online resizing, atomic snapshot capabilities, and an automated backup pipeline.',
      diagram: `Physical Disks: [/dev/sdb (20GB)]   [/dev/sdc (20GB)]
                           │                   │
                           ▼ (pvcreate)        ▼ (pvcreate)
Physical Volumes:        [PV 1]              [PV 2]
                           │                   │
                           └─────────┬─────────┘
                                     ▼ (vgcreate / vgextend)
Volume Group:                  [vg_data (40GB)]
                                     │
                   ┌─────────────────┴─────────────────┐
                   ▼ (lvcreate)                        ▼ (lvcreate -s)
Logical Volume:  [lv_database (30GB)]            [lv_snapshot (5GB)]
                   │ (Mounted on /data)                │ (Point-in-time backup)
                   ▼                                   ▼
Filesystem:     [XFS (Online Resized)]           [Rsync & GPG to Backup Server]`
    },
    requirements: {
      functional: [
        'Database volume mounted on /data must be expanded from 10GB to 25GB while actively being written to',
        'Zero filesystem corruption and zero downtime during the volume expansion',
        'LVM snapshot must be created, mounted read-only, backed up via rsync, and cleanly destroyed'
      ],
      technical: [
        'Use pvcreate, vgcreate, lvcreate, lvextend -r (or resize2fs / xfs_growfs)',
        'Configure persistent mount in /etc/fstab using UUID, not device paths',
        'Automate backup script in /usr/local/bin/lvm-snapshot-backup.sh via cron'
      ],
      security: [
        'Backup archives must be encrypted with GPG symmetric/asymmetric keys before transmission',
        'Restrict backup script execution permissions to root (chmod 700)'
      ]
    },
    architecture: {
      summary: 'Three-tiered Linux storage abstraction architecture spanning raw block storage devices, LVM kernel device-mapper layer, and virtual filesystem (VFS).',
      diagram: `Raw Block Devices (/dev/sd*) ──> Physical Volumes ──> Volume Group ──> Logical Volume (Device Mapper) ──> Filesystem (VFS)`,
      components: [
        { name: 'Device Mapper Layer', role: 'Kernel framework mapping physical block ranges to virtual logical devices', technologies: ['Linux dm-mod'] },
        { name: 'Volume Group (vg_data)', role: 'Aggregated pool of physical extents (PE) acting as a virtual disk pool', technologies: ['LVM2'] },
        { name: 'Logical Volume (lv_database)', role: 'Partition-like block device supporting online resizing and snapshots', technologies: ['LVM2'] },
        { name: 'Snapshot Mechanism', role: 'Copy-on-write (COW) metadata tracking modified blocks since snapshot creation', technologies: ['LVM COW'] }
      ]
    },
    technologyRequirements: {
      required: ['Linux OS with LVM2 utilities', 'Second block device or loop devices (/dev/loop*)', 'XFS or ext4'],
      optional: ['mdadm for software RAID 1/RAID 5 array creation'],
      outOfScope: ['Hardware SAN Fiber Channel fabric switching']
    },
    functionalRequirements: [
      'Create 2 simulated block devices using truncate and losetup if physical disks unavailable',
      'Initialize PVs, create volume group vg_storage, and create logical volume lv_data (10GB)',
      'Format with ext4 or XFS and mount to /mnt/storage with fstab UUID entry',
      'Simulate high usage; extend lv_data to 18GB online using lvextend -L +8G -r',
      'Create a 2GB COW snapshot lv_data_snap',
      'Mount snapshot read-only to /mnt/snapshot and archive contents to /backups/data.tar.gz',
      'Remove snapshot using lvremove -y /dev/vg_storage/lv_data_snap'
    ],
    technicalRequirements: [
      'Verify volume expansion using df -hT /mnt/storage',
      'Confirm zero errors in dmesg during online expansion',
      'Configure daily cron job in /etc/cron.d/storage-backup'
    ],
    securityRequirements: [
      'Ensure /etc/fstab options include noexec or nodev if storage holds user-uploaded files'
    ],
    constraints: [
      'Do not unmount the filesystem during the lvextend operation',
      'Never allow the LVM snapshot volume to reach 100% COW usage (which drops the snapshot)'
    ],
    expectedOutcome: 'Complete operational mastery of enterprise Linux storage management, online dynamic volume scaling, and zero-downtime snapshot backup automation.',
    deliverables: [
      'Configured LVM storage infrastructure mounted persistently via /etc/fstab',
      'Automated snapshot backup script /usr/local/bin/lvm-snapshot-backup.sh',
      'Scheduled cron configuration /etc/cron.d/storage-backup',
      'STORAGE_OPERATIONS_MANUAL.md documenting volume creation, online expansion, and disaster recovery'
    ],
    suggestedProjectStructure: `/usr/local/bin/
└── lvm-snapshot-backup.sh
/etc/cron.d/
└── storage-backup
/mnt/
├── storage/
└── snapshot/
STORAGE_OPERATIONS_MANUAL.md`,
    requiredConcepts: [
      { name: 'Disks and Storage', lessonId: 'c-14-01', academyRoute: '/linux' },
      { name: 'Filesystem Troubleshooting', lessonId: 'c-24-01', academyRoute: '/linux' },
      { name: 'Cron & Scheduling', lessonId: 'c-23-01', academyRoute: '/linux' },
      { name: 'Linux Administration', lessonId: 'c-25-01', academyRoute: '/linux' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 14: Disks, Partitions & LVM', route: '/cloudstack/linux?concept=c-14-01' },
        { title: 'Chapter 23: Cron & Scheduling', route: '/cloudstack/linux?concept=c-23-01' },
        { title: 'Chapter 24: Filesystem Troubleshooting', route: '/cloudstack/linux?concept=c-24-01' }
      ],
      officialDocs: [
        { title: 'Red Hat Enterprise Linux LVM Administrator Guide', url: 'https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_and_managing_logical_volumes/' },
        { title: 'XFS User Guide', url: 'https://xfs.org/' }
      ],
      referenceMaterial: ['Storage Administration for Linux Engineers'],
      usefulCommands: [
        'pvcreate /dev/sdb',
        'vgcreate vg_data /dev/sdb',
        'lvcreate -L 10G -n lv_database vg_data',
        'mkfs.ext4 /dev/vg_data/lv_database',
        'lvextend -L +10G -r /dev/vg_data/lv_database',
        'lvcreate -L 2G -s -n lv_snap /dev/vg_data/lv_database',
        'lvremove /dev/vg_data/lv_snap'
      ]
    },
    recommendedApproach: [
      '1. Identify available block storage devices using lsblk and fdisk -l.',
      '2. Initialize physical volumes with pvcreate.',
      '3. Assemble volume group vg_data with vgcreate.',
      '4. Allocate logical volume lv_database with lvcreate.',
      '5. Format logical volume with ext4 or XFS.',
      '6. Create mount directory /data and add persistent entry to /etc/fstab using blkid UUID.',
      '7. Test mount with mount -a and verify using df -h.',
      '8. Simulate online expansion: execute lvextend -L +10G -r /dev/vg_data/lv_database while running continuous file writes.',
      '9. Create copy-on-write snapshot lv_snap, mount read-only, and verify consistent snapshot view.',
      '10. Author /usr/local/bin/lvm-snapshot-backup.sh, configure cron schedule, and author STORAGE_OPERATIONS_MANUAL.md.'
    ],
    importantConsiderations: [
      'Why is using UUID instead of device names (/dev/sda1) in /etc/fstab mandatory in modern Linux?',
      'How does the -r flag in lvextend automatically resize both the underlying block device and the filesystem?',
      'What happens if an LVM snapshot runs out of allocated space while tracking active writes?'
    ],
    commonPitfalls: [
      'Resizing the logical volume without resizing the filesystem (forgetting resize2fs or xfs_growfs).',
      'Attempting to shrink an XFS filesystem (XFS does not support shrinking; only ext4 does).',
      'Leaving LVM snapshots active indefinitely, which severely degrades write performance over time.'
    ],
    optionalEnhancements: {
      beginner: ['Configure LVM automatic volume extension monitoring via /etc/lvm/lvm.conf.'],
      intermediate: ['Configure software RAID 1 mirror using mdadm across two disks before adding to LVM.'],
      advanced: ['Implement thin provisioning (thin pools) to allow overcommitting disk space.'],
      expert: ['Set up automated offsite backup synchronization to an AWS S3 or MinIO bucket via rclone.']
    },
    completionChecklist: [
      'Physical volumes and Volume Group created and verified with pvs and vgs',
      'Logical Volume formatted and mounted persistently via /etc/fstab using UUID',
      'Online filesystem expansion executed without unmounting or downtime',
      'LVM snapshot created and verified containing point-in-time state',
      'Backup script /usr/local/bin/lvm-snapshot-backup.sh authored and tested',
      'Daily cron job registered in /etc/cron.d/',
      'STORAGE_OPERATIONS_MANUAL.md published'
    ]
  },
  {
    id: 'linux-10',
    code: 'LINUX-10',
    title: 'Enterprise Linux Platform Architecture & Site Reliability Operations',
    academy: 'linux',
    difficulty: 'Production Grade',
    estimatedTime: '16-24 hours',
    technologies: ['Linux Kernel Tuning', 'systemd Orchestration', 'Auditd / SIEM', 'Network Namespaces', 'Disaster Recovery'],
    overview: 'The pinnacle Linux engineering project: architect, harden, automate, and operate an enterprise multi-tier Linux application platform featuring automated kernel security profiles, network namespaces, auditd compliance, disaster recovery runbooks, and SRE operational tooling.',
    tags: ['linux', 'production-grade', 'sre', 'kernel-tuning', 'auditd', 'namespaces', 'enterprise'],
    projectOverview: {
      projectName: 'Enterprise Linux Platform Architecture & Site Reliability Operations',
      academy: 'linux',
      difficulty: 'Production Grade',
      estimatedEffort: '16-24 hours',
      technologies: ['Linux Kernel Subsystems', 'Network Namespaces (ip netns)', 'Auditd / Audit Rules', 'systemd', 'SRE Tooling'],
      shortDescription: 'Engineer a mission-critical, enterprise Linux hosting platform combining kernel performance tuning, network namespace isolation, SOC 2 compliance auditing, and automated disaster recovery.'
    },
    scenario: 'You are the Lead Linux Systems Architect for a financial core platform processing mission-critical payment authorizations. The platform must operate under strict regulatory compliance (PCI-DSS / SOC 2), withstand catastrophic network and service faults, achieve sub-millisecond kernel network latency, and maintain comprehensive audit trails.',
    problemStatement: 'Enterprise infrastructure demands far more than basic web server setups. It requires deep kernel TCP stack tuning, process isolation using Linux network namespaces, immutable system auditing via auditd, zero-downtime operational runbooks, and proven disaster recovery procedures.',
    projectObjective: [
      'Tune Linux kernel parameters for high-throughput, low-latency networking via /etc/sysctl.d/99-enterprise-platform.conf',
      'Implement process network isolation using Linux network namespaces (ip netns) and veth virtual ethernet pairs',
      'Configure enterprise security auditing via auditd (/etc/audit/rules.d/audit.rules) tracking file modifications and privileged executions',
      'Deploy multi-tier systemd application services with automated health watchdogs and sandboxing',
      'Author and execute a complete enterprise Disaster Recovery (DR) and business continuity drill'
    ],
    whatYouNeedToBuild: {
      description: 'An enterprise-grade Linux production platform integrating tuned kernel parameters, network namespace isolation, auditd compliance logging, and SRE operational runbooks.',
      diagram: `Enterprise Linux Platform Architecture
├── Kernel Subsystem Tuning (/etc/sysctl.d/99-enterprise-platform.conf)
│   ├── TCP BBR congestion control
│   ├── Increased ephemeral port range (1024 - 65535)
│   └── Optimized socket receive/transmit buffers (rmem/wmem)
│
├── Process Isolation via Network Namespaces
│   ├── Default Namespace (Host Management / SSH)
│   └── 'isolated-app' Namespace (veth0 <──> veth1 bridge, dedicated routing table)
│
├── Security & Compliance Auditing (Auditd)
│   ├── Watch: /etc/passwd, /etc/shadow, /etc/sudoers
│   └── Execve audit: All root command invocations logged to /var/log/audit/
│
└── Disaster Recovery & SRE Operations
    ├── Automated health check watchdog script
    └── Comprehensive DR restoration runbook (RTO < 15 min, RPO < 1 hour)`
    },
    requirements: {
      functional: [
        'Kernel must utilize BBR congestion control and support 100,000+ concurrent TCP connections',
        'Isolated application must run inside a dedicated network namespace with private IP routing',
        'Auditd must generate tamper-evident audit events whenever sensitive files or binaries are executed',
        'Platform must recover from simulated total service and configuration failure in under 15 minutes'
      ],
      technical: [
        'Verify BBR congestion control via sysctl net.ipv4.tcp_congestion_control',
        'Use ip netns add, ip link add type veth, and iptables NAT to establish namespace networking',
        'Load audit rules using auditctl -R /etc/audit/rules.d/audit.rules and verify with ausearch'
      ],
      security: [
        'Immutable audit rules (append -e 2 at end of audit.rules to lock configuration until reboot)',
        'Zero root logins permitted across the platform; strict sudo logging'
      ]
    },
    architecture: {
      summary: 'Comprehensive enterprise Linux architecture spanning kernel ring 0 parameters, user-space namespace virtualization, POSIX auditing, and automated service supervision.',
      diagram: `Kernel Subsystems (TCP BBR, VFS, cgroups, namespaces)
                      │
   ┌──────────────────┴──────────────────┐
   ▼                                     ▼
[Host Namespace (Management)]     [App Namespace (ip netns)]
   ├── OpenSSH (Port 2222)           ├── Isolated Microservice
   ├── Auditd Daemon                 └── veth Virtual Interface
   └── systemd PID 1                 (NAT routed via iptables)`,
      components: [
        { name: 'Kernel Optimization Layer', role: 'Optimized network stack, buffer allocations, and BBR scheduler', technologies: ['sysctl', 'TCP BBR'] },
        { name: 'Network Namespace Isolation', role: 'Virtual network stack providing isolated interfaces, routing tables, and firewall rules', technologies: ['Linux Namespaces'] },
        { name: 'Audit Subsystem (auditd)', role: 'Kernel-level event auditor logging security-sensitive syscalls to disk', technologies: ['auditd', 'libaudit'] },
        { name: 'SRE Automation Suite', role: 'Watchdog daemons, health metric collectors, and automated DR scripts', technologies: ['systemd', 'Bash'] }
      ]
    },
    technologyRequirements: {
      required: ['Linux OS (Ubuntu 22.04 LTS or RHEL 9)', 'auditd', 'iproute2 (ip netns)', 'sysstat'],
      optional: ['tcpdump for namespace packet capture verification'],
      outOfScope: ['Bare-metal hypervisor installation (ESXi)']
    },
    functionalRequirements: [
      'Configure /etc/sysctl.d/99-enterprise-platform.conf with BBR, somaxconn=65535, file-max=2097152',
      'Create network namespace isolated-net and link to host via veth-host / veth-guest pair',
      'Configure IP addresses (10.200.1.1/24 on host, 10.200.1.2/24 on guest) and enable IP forwarding with NAT',
      'Run application inside namespace using ip netns exec isolated-net and verify external connectivity',
      'Configure auditd rules watching /etc/sudoers and tracking execution of /usr/bin/chmod',
      'Simulate unauthorized file modification and inspect audit trace with ausearch -k sudoers-change'
    ],
    technicalRequirements: [
      'Document network namespace routing table and iptables masquerade rules',
      'Verify auditd service status with systemctl status auditd',
      'Produce comprehensive PLATFORM_DISASTER_RECOVERY_RUNBOOK.md'
    ],
    securityRequirements: [
      'Audit log permissions must be restricted to root:root (mode 600)',
      'Ensure kernel refuses core dumps for setuid executables (fs.suid_dumpable = 0)'
    ],
    constraints: [
      'Do not use full Docker/Kubernetes container engines: the project requires mastering raw Linux kernel primitives (namespaces, cgroups, veth)',
      'All kernel tuning must persist across reboots via drop-in configuration files'
    ],
    expectedOutcome: 'A production-grade, highly resilient, tuned Linux operating platform meeting enterprise PCI/SOC 2 compliance standards with verified network namespace isolation and disaster recovery readiness.',
    deliverables: [
      'Kernel configuration /etc/sysctl.d/99-enterprise-platform.conf',
      'Network namespace setup script /usr/local/bin/setup-namespaces.sh',
      'Audit rules configuration /etc/audit/rules.d/enterprise-compliance.rules',
      'PLATFORM_DISASTER_RECOVERY_RUNBOOK.md detailing recovery procedures, RTO/RPO targets, and compliance verification',
      'SRE_OPERATIONAL_CHECKLIST.md covering daily, weekly, and monthly operational cadences'
    ],
    suggestedProjectStructure: `/etc/sysctl.d/
└── 99-enterprise-platform.conf
/etc/audit/rules.d/
└── enterprise-compliance.rules
/usr/local/bin/
├── setup-namespaces.sh
└── health-watchdog.sh
PLATFORM_DISASTER_RECOVERY_RUNBOOK.md
SRE_OPERATIONAL_CHECKLIST.md`,
    requiredConcepts: [
      { name: 'Production Linux', lessonId: 'c-29-01', academyRoute: '/linux' },
      { name: 'Advanced Linux & Namespaces', lessonId: 'c-28-01', academyRoute: '/linux' },
      { name: 'Linux Security & Auditing', lessonId: 'c-22-01', academyRoute: '/linux' },
      { name: 'System Performance', lessonId: 'c-21-01', academyRoute: '/linux' },
      { name: 'Real-World Linux Projects', lessonId: 'c-30-01', academyRoute: '/linux' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 28: Advanced Linux & Namespaces', route: '/cloudstack/linux?concept=c-28-01' },
        { title: 'Chapter 29: Production Linux Operations', route: '/cloudstack/linux?concept=c-29-01' },
        { title: 'Chapter 30: Real-World Linux Projects', route: '/cloudstack/linux?concept=c-30-01' }
      ],
      officialDocs: [
        { title: 'Linux Kernel Documentation - Networking sysctl', url: 'https://www.kernel.org/doc/Documentation/networking/ip-sysctl.txt' },
        { title: 'Red Hat Enterprise Linux Security Hardening Guide - Auditd', url: 'https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/security_hardening/auditing-the-system' }
      ],
      referenceMaterial: [
        'Google Site Reliability Engineering (SRE) Handbook',
        'PCI-DSS Linux Server Configuration Standard'
      ],
      usefulCommands: [
        'sudo sysctl --system',
        'sudo ip netns add isolated-net',
        'sudo ip link add veth-host type veth peer name veth-guest',
        'sudo ip link set veth-guest netns isolated-net',
        'sudo ip netns exec isolated-net ip addr add 10.200.1.2/24 dev veth-guest',
        'sudo auditctl -l',
        'sudo ausearch -k sudoers-change'
      ]
    },
    recommendedApproach: [
      '1. Review enterprise compliance objectives and system baseline metrics.',
      '2. Author /etc/sysctl.d/99-enterprise-platform.conf tuning file descriptors, backlog queues, and TCP BBR.',
      '3. Apply sysctl parameters and verify values using sysctl -a.',
      '4. Author /usr/local/bin/setup-namespaces.sh creating an isolated network namespace with veth pair.',
      '5. Configure iptables NAT masquerading to grant outbound internet to the namespace.',
      '6. Launch a test application inside the namespace and verify isolation from host loopback sockets.',
      '7. Configure auditd with /etc/audit/rules.d/enterprise-compliance.rules tracking sensitive file modifications.',
      '8. Generate test events and verify detection in ausearch and aureport.',
      '9. Conduct a simulated platform disaster drill (service crash, configuration deletion) and record recovery timing.',
      '10. Publish PLATFORM_DISASTER_RECOVERY_RUNBOOK.md and SRE_OPERATIONAL_CHECKLIST.md.'
    ],
    importantConsiderations: [
      'How do Linux network namespaces provide foundational process isolation without the overhead of hardware virtualization?',
      'Why is auditd logging critical for non-repudiation in enterprise regulatory compliance audits?',
      'What are the trade-offs between RTO (Recovery Time Objective) and RPO (Recovery Point Objective) during storage disasters?'
    ],
    commonPitfalls: [
      'Applying auditd rules with -e 2 during development, preventing any further rule changes until host reboot.',
      'Forgetting to enable IP forwarding (net.ipv4.ip_forward = 1) on the host, preventing network namespaces from accessing the gateway.',
      'Oversizing kernel socket buffers beyond available physical RAM, risking sudden OOM crashes under high load.'
    ],
    optionalEnhancements: {
      beginner: ['Create an automated health watchdog script running via systemd timer.'],
      intermediate: ['Forward auditd events to a remote centralized Syslog or SIEM server using audisp-remote.'],
      advanced: ['Build a rootless namespace container runtime using unshare and cgroups v2.'],
      expert: ['Benchmark network throughput between namespaces using iperf3 and optimize MTU and offloading.']
    },
    completionChecklist: [
      'Enterprise sysctl tuning profile deployed with TCP BBR enabled',
      'Network namespace created and connected via veth pair and NAT',
      'Application executed and verified inside isolated namespace',
      'Auditd configured with rules watching sensitive files and privilege escalation',
      'ausearch verifies tamper-evident event detection',
      'Disaster recovery drill executed and timed (RTO < 15 minutes achieved)',
      'PLATFORM_DISASTER_RECOVERY_RUNBOOK.md completed',
      'SRE_OPERATIONAL_CHECKLIST.md published'
    ]
  }
];

// Add legacy fields for backward compatibility
const enrichedCapstones = linuxCapstones.map((cap) => {
  return {
    ...cap,
    objectives: cap.projectObjective,
    startingState: {
      description: `Linux production server environment for ${cap.title}`,
      environment: 'Linux Server (Ubuntu 22.04 LTS / Debian 12 / POSIX Bash)',
      startingFiles: {
        'SETUP.md': `# ${cap.title}\n\n${cap.overview}\n`,
        'system-info.sh': '#!/bin/bash\nuname -a\ncat /etc/os-release\n'
      }
    },
    tasks: cap.functionalRequirements.map((req, idx) => ({
      id: `task-${idx + 1}`,
      title: req,
      objective: req,
      commandSnippet: cap.resources.usefulCommands[idx % cap.resources.usefulCommands.length] || 'uname -a',
      expectedOutput: 'Action completed successfully.',
      verificationCriteria: req
    })),
    failureScenarios: [
      {
        id: 'fail-1',
        title: cap.commonPitfalls[0] || 'Service or configuration fault',
        symptom: 'Service fails to bind, crashes, or permission denied.',
        rootCause: 'Incorrect permissions or invalid configuration file syntax.',
        diagnosticCommand: 'journalctl -xe --no-pager | tail -n 20',
        fixCommand: 'sudo systemctl daemon-reload && sudo systemctl restart',
        verification: 'Service status returns active (running).'
      },
      {
        id: 'fail-2',
        title: cap.commonPitfalls[1] || 'Network or firewall block',
        symptom: 'Connection refused or request times out.',
        rootCause: 'Firewall dropping packets or process listening on wrong interface.',
        diagnosticCommand: 'sudo ufw status verbose && ss -tuln',
        fixCommand: 'sudo ufw allow && sudo systemctl reload',
        verification: 'Socket listening and responsive to curl.'
      }
    ],
    validationChecks: cap.completionChecklist.map((check, idx) => ({
      id: `val-${idx + 1}`,
      label: check,
      verificationCommand: 'systemctl status || uname -a',
      points: Math.round(100 / cap.completionChecklist.length)
    })),
    scoreMax: 100
  };
});

const outPath = path.join(__dirname, '../data/linuxCapstones.ts');
const fileContent = `import { CapstoneProject } from '../types';\n\nexport const LINUX_CAPSTONES: CapstoneProject[] = ${JSON.stringify(enrichedCapstones, null, 2)};\n`;

fs.writeFileSync(outPath, fileContent, 'utf-8');
console.log(`Successfully generated 10 Linux Capstones at ${outPath}`);
