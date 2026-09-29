import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 13: PACKAGE MANAGEMENT & SOFTWARE INSTALLATION (13.1 to 13.17)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_13: LinuxTopic = {
  id: 'ch-13',
  number: '13',
  title: 'Package Management',
  iconName: 'Package',
  description: 'Master package ecosystems: apt, dnf, dpkg, rpm, repository configurations, shared libraries (ldd/ldconfig), compiling from source, and security patching.',
  concepts: [
    buildLinuxConcept({
      id: 'c-13-01',
      subChapterNumber: '13.1',
      command: 'apt list --installed | head -n 10',
      title: 'Package Management Concepts',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Precompiled software archives, metadata, checksums, and automated dependency resolution',
      badges: ['Packages', 'Core', 'Fundamentals'],
      difficulty: 'Beginner',
      quote: 'A package manager is the operating system\'s curated app store and librarian: it resolves dependencies, verifies cryptographic signatures, and tracks every file on disk.',
      whatIsIt: 'A Linux package manager is a software suite that automates the installation, upgrading, configuration, and removal of computer programs for an operating system. Rather than compiling source code by hand or downloading untrusted binaries from the web, Linux uses curated packages (like .deb or .rpm) containing pre-compiled binaries, config files, documentation, and metadata specifying prerequisites.',
      inSimpleWords: 'Think of it as the Linux App Store. When you want an app, you tell the package manager. It downloads the app, checks that it has not been tampered with, downloads all helper libraries it needs to run, and installs everything neatly.',
      whyDoYouNeedIt: 'Without package management, you would have to track down dozens of shared C libraries, verify GPG signatures manually, and risk overwriting system files. Package managers ensure clean uninstalls and guarantee system stability.',
      realWorldScenario: 'You need to install PostgreSQL on a fleet of 50 production servers. Instead of building from source on each machine, a single package manager command fetches the vetted, tested binary and its dependencies across all nodes in seconds.',
      realWorldAnalogy: 'Ordering a flat-pack furniture set that comes with all necessary screws, bolts, wrenches, and instructions included, rather than forging your own metal parts from raw ore.',
      withoutVsWith: {
        without: {
          title: 'Installing Software Manually',
          items: ['Compiling source code manually on every server', 'Hunting down missing library dependencies one by one (Dependency Hell)', 'No database tracking which files belong to which application on disk'],
          outcome: 'Brittle servers, broken libraries, and orphaned files scattered across /usr/local.'
        },
        with: {
          title: 'Using a Package Manager',
          items: ['Deterministic, cryptographically verified binary distribution', 'Automatic dependency resolution and tree calculation', 'Accurate registry of every single file placed on the filesystem'],
          outcome: 'Repeatable deployments, effortless upgrades, and instantaneous clean uninstallation.'
        }
      },
      blockDiagram: {
        title: 'Package Management Workflow',
        subtitle: 'From remote mirror to local filesystem installation:',
        nodes: [
          { id: 'repo', label: 'Remote Repository', simpleDef: 'Online software warehouse', techDef: 'HTTP mirror hosting signed .deb or .rpm archives', badge: 'Mirror', color: '#38bdf8' },
          { id: 'meta', label: 'Metadata & Index', simpleDef: 'Catalog of available software', techDef: 'Packages.gz / repodata containing versions & dependencies', badge: 'Catalog', color: '#a855f7' },
          { id: 'resolver', label: 'High-Level Manager (apt/dnf)', simpleDef: 'Calculates what extra files you need', techDef: 'Dependency graph solver and transaction manager', badge: 'Resolver', color: '#10b981' },
          { id: 'lowlevel', label: 'Low-Level Installer (dpkg/rpm)', simpleDef: 'Unpacks files to disk', techDef: 'Archive unpacker and file inventory maintainer', badge: 'Engine', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Dependency', simple: 'A helper library or program that another application needs to work.', technical: 'A shared library (.so) or package declared in the Requires/Depends field of package metadata.' },
        { term: 'Repository', simple: 'A remote server storing thousands of approved software packages.', technical: 'HTTP/HTTPS server hosting packages, release metadata, and GPG release signatures.' }
      ],
      syntaxCode: 'apt list --installed | head -n 10',
      syntaxTokens: [
        { token: 'apt', role: 'command', explanation: 'High-level Debian/Ubuntu package management tool' },
        { token: 'list', role: 'argument', explanation: 'List packages based on criteria' },
        { token: '--installed', role: 'option', explanation: 'Filter only packages currently present on the system' },
        { token: '| head -n 10', role: 'argument', explanation: 'Limit output display to the first 10 installed items' }
      ],
      variations: [
        { command: 'apt list --installed', description: 'List all packages currently installed on the host' },
        { command: 'apt list --upgradable', description: 'List packages that have newer versions available in configured repositories' },
        { command: 'dpkg -l', description: 'Query low-level dpkg database for installed package states' }
      ],
      expectedOutput: 'Listing...\nadduser/jammy,jammy,now 3.118ubuntu5 all [installed]\napt/jammy-updates,now 2.4.11 amd64 [installed]\nbase-files/jammy-updates,now 12ubuntu4.4 amd64 [installed]\nbash/jammy,now 5.1-6ubuntu1 amd64 [installed]',
      commonMistakes: [
        { mistake: 'Trying to install without updating repository metadata first', whyWrong: 'Your local index might be outdated, pointing to package versions that no longer exist on mirrors.', correctWay: 'Run "sudo apt update" before running "sudo apt install <package>".' },
        { mistake: 'Mixing packages from incompatible Linux distributions', whyWrong: 'Installing an RPM package on Debian or forcing an incompatible PPA can corrupt core glibc libraries.', correctWay: 'Use repositories intended strictly for your exact distribution release codename.' }
      ],
      safeRecovery: 'If package state becomes inconsistent, run "sudo apt --fix-broken install" or "sudo dpkg --configure -a" to repair pending transactions.'
    }),

    buildLinuxConcept({
      id: 'c-13-02',
      subChapterNumber: '13.2',
      command: 'cat /etc/os-release',
      title: 'Debian/Ubuntu vs RedHat/Fedora Package Ecosystems',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'The two dominant packaging families: DEB (.deb / apt / dpkg) versus RPM (.rpm / dnf / rpm)',
      badges: ['Debian', 'RedHat', 'Architecture'],
      difficulty: 'Beginner',
      quote: 'Linux distributions divide into two grand packaging dynasties: the Debian lineage (.deb) and the Red Hat lineage (.rpm).',
      whatIsIt: 'The enterprise Linux world is divided into two primary packaging ecosystems: Debian-derived systems (Ubuntu, Debian, Linux Mint) which use Debian packages (.deb) managed by apt and dpkg; and Red Hat-derived systems (RHEL, Rocky Linux, AlmaLinux, Fedora) which use Red Hat Package Manager (.rpm) managed by dnf and rpm.',
      inSimpleWords: 'Just like Android uses .apk and Windows uses .exe/.msi, Ubuntu uses .deb and Red Hat uses .rpm. They accomplish the exact same goal using different internal formats and commands.',
      whyDoYouNeedIt: 'As a Linux engineer, you will manage both Debian/Ubuntu servers and Red Hat/Rocky enterprise instances. Knowing the direct command equivalents is essential for multi-cloud administration.',
      realWorldScenario: 'You are moving from an AWS Ubuntu EC2 instance to a Rocky Linux 9 enterprise on-prem cluster. Knowing that "apt install" maps to "dnf install" and "dpkg -l" maps to "rpm -qa" lets you operate seamlessly.',
      realWorldAnalogy: 'Metric vs Imperial tools: a 10mm socket and a 3/8-inch socket serve the same purpose, but you must know which one fits the machine you are repairing.',
      withoutVsWith: {
        without: {
          title: 'Not Knowing Ecosystem Differences',
          items: ['Typing "apt install" on a Red Hat server and receiving "command not found"', 'Attempting to download and force a .deb file onto CentOS or Rocky Linux', 'Confusion over configuration file locations and package naming differences'],
          outcome: 'Failed deployment scripts, broken server automation, and frustration.'
        },
        with: {
          title: 'Mastering Both Packaging Ecosystems',
          items: ['Fluently translating administrative commands across all enterprise distros', 'Writing cross-platform Ansible playbooks using native package modules', 'Understanding release cycles: LTS Debian/Ubuntu vs Enterprise RHEL lifecycles'],
          outcome: 'True platform independence and high-level enterprise infrastructure proficiency.'
        }
      },
      blockDiagram: {
        title: 'Linux Distribution Packaging Lineage',
        subtitle: 'Debian family vs Red Hat family comparison:',
        nodes: [
          { id: 'deb_high', label: 'Debian/Ubuntu High-Level', simpleDef: 'apt / apt-get', techDef: 'APT solver resolving .deb dependencies', badge: 'Debian APT', color: '#ef4444' },
          { id: 'deb_low', label: 'Debian Low-Level Engine', simpleDef: 'dpkg', techDef: 'Debian archive unpacker (.deb)', badge: 'dpkg', color: '#f87171' },
          { id: 'rpm_high', label: 'Red Hat/Fedora High-Level', simpleDef: 'dnf / yum', techDef: 'DNF (Dandified YUM) libsolv SAT solver', badge: 'RHEL DNF', color: '#38bdf8' },
          { id: 'rpm_low', label: 'Red Hat Low-Level Engine', simpleDef: 'rpm', techDef: 'RPM archive unpacker (.rpm)', badge: 'rpm', color: '#60a5fa' }
        ]
      },
      terms: [
        { term: 'DEB', simple: 'Package format used by Debian and Ubuntu.', technical: 'ar archive containing control.tar.gz metadata and data.tar.xz payload.' },
        { term: 'RPM', simple: 'Package format used by Red Hat, Fedora, and Rocky.', technical: 'Binary archive containing lead, signature, header, and cpio archive payload.' }
      ],
      syntaxCode: 'cat /etc/os-release',
      syntaxTokens: [
        { token: 'cat', role: 'command', explanation: 'Display file contents' },
        { token: '/etc/os-release', role: 'path', explanation: 'Standard system identification file containing OS name, ID, and ID_LIKE' }
      ],
      variations: [
        { command: 'cat /etc/os-release', description: 'Display standardized operating system identification variables' },
        { command: 'hostnamectl', description: 'Display system architecture, OS version, and kernel details' }
      ],
      expectedOutput: 'NAME="Ubuntu"\nVERSION="22.04.4 LTS (Jammy Jellyfish)"\nID=ubuntu\nID_LIKE=debian\nPRETTY_NAME="Ubuntu 22.04.4 LTS"',
      commonMistakes: [
        { mistake: 'Trying to install an RPM package on Ubuntu using dpkg', whyWrong: 'dpkg does not understand RPM header structures; the formats are incompatible without conversion tools like alien.', correctWay: 'Install the native .deb version or use the official distribution repository.' },
        { mistake: 'Assuming package names are identical across ecosystems', whyWrong: 'Apache HTTP server is named "apache2" on Debian/Ubuntu, but "httpd" on RHEL/CentOS.', correctWay: 'Search the package index first using "apt-cache search" or "dnf search".' }
      ],
      safeRecovery: 'If you are unsure what distro you are on, run "cat /etc/os-release" before running any package commands.'
    }),

    buildLinuxConcept({
      id: 'c-13-03',
      subChapterNumber: '13.3',
      command: 'apt-cache search nginx',
      title: 'apt & apt-cache',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Debian/Ubuntu high-level repository querying and package cache inspection',
      badges: ['apt', 'Debian', 'Search'],
      difficulty: 'Beginner',
      quote: 'Before you install, discover: apt-cache lets you interrogate the repository catalog without downloading a single byte of software.',
      whatIsIt: 'apt (Advanced Package Tool) and apt-cache are tools used on Debian-based distributions to search, inspect, and interrogate the local cache of package metadata. While "apt install" mutates system state, "apt-cache" and "apt search" are safe read-only queries that help you find software packages and view their declared dependencies.',
      inSimpleWords: 'It is the search bar of the package manager. Before installing a program, you use it to find the exact name of the package and see what other libraries it requires.',
      whyDoYouNeedIt: 'You often know you need a tool (like Python Redis bindings) but do not know the exact package name ("python3-redis"). apt-cache search surfaces matching packages instantly from the local database.',
      realWorldScenario: 'You are setting up an SSL certificate bot and need to find the correct plugin for Nginx. Running "apt-cache search certbot nginx" immediately identifies "python3-certbot-nginx".',
      realWorldAnalogy: 'Searching a library\'s card catalog to find a book\'s call number and shelf location before going to find it.',
      withoutVsWith: {
        without: {
          title: 'Guessing Package Names',
          items: ['Trial and error running "apt install" on guessed names', 'Installing the wrong package or missing optional extensions', 'Wasting time browsing web forums for exact distro-specific names'],
          outcome: 'Failed installations and incorrect package configurations.'
        },
        with: {
          title: 'Searching Local Metadata Cache',
          items: ['Instant regex and keyword searches across 60,000+ packages', 'Deep inspection of package dependencies via "apt-cache depends"', 'Comparing version availability across multiple repository mirrors'],
          outcome: 'Accurate package selection and comprehensive dependency awareness.'
        }
      },
      blockDiagram: {
        title: 'apt-cache Query Engine',
        subtitle: 'Local index query without remote network latency:',
        nodes: [
          { id: 'query', label: 'User Query', simpleDef: 'apt-cache search <keyword>', techDef: 'Keyword or regex search pattern', badge: 'Query', color: '#38bdf8' },
          { id: 'cache', label: '/var/cache/apt/pkgcache.bin', simpleDef: 'Local binary cache file', techDef: 'Mmap-backed binary cache of repository index', badge: 'Local Cache', color: '#10b981' },
          { id: 'results', label: 'Matched Packages', simpleDef: 'Name + One-line description', techDef: 'Package records matching name or short description', badge: 'Results', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Package Cache', simple: 'A local copy of the list of all packages available online.', technical: 'Binary mmap database stored in /var/cache/apt/ derived from /var/lib/apt/lists/.' },
        { term: 'Reverse Dependency', simple: 'Other packages that depend on this specific package.', technical: 'Packages that list the target in their Depends or Pre-Depends stanzas (queried via rdepends).' }
      ],
      syntaxCode: 'apt-cache search nginx',
      syntaxTokens: [
        { token: 'apt-cache', role: 'command', explanation: 'Tool to query the APT software package cache' },
        { token: 'search', role: 'argument', explanation: 'Search for regex pattern across package names and descriptions' },
        { token: 'nginx', role: 'argument', explanation: 'Target software search string' }
      ],
      variations: [
        { command: 'apt-cache search nginx', description: 'Search package names and descriptions for "nginx"' },
        { command: 'apt-cache show nginx', description: 'Display complete package metadata: description, version, dependencies, size' },
        { command: 'apt-cache depends nginx', description: 'List all direct dependencies required by nginx' }
      ],
      expectedOutput: 'nginx - small, powerful, scalable web/proxy server\nnginx-common - small, powerful, scalable web/proxy server - common files\nnginx-core - nginx web/proxy server (standard version)\nnginx-full - nginx web/proxy server (standard version with extra modules)',
      commonMistakes: [
        { mistake: 'Assuming apt-cache queries the live internet on every run', whyWrong: 'It queries your local /var/lib/apt/lists cache. If you haven\'t run "apt update" in months, results will be stale.', correctWay: 'Run "sudo apt update" regularly to refresh the local package cache.' },
        { mistake: 'Running apt-cache with sudo', whyWrong: 'apt-cache only reads local files and does not modify the system; running it with sudo is unnecessary privilege elevation.', correctWay: 'Run "apt-cache" or "apt search" as a regular unprivileged user.' }
      ],
      safeRecovery: 'If your apt cache is corrupted, delete the lists with "sudo rm -rf /var/lib/apt/lists/*" and rebuild with "sudo apt update".'
    }),

    buildLinuxConcept({
      id: 'c-13-04',
      subChapterNumber: '13.4',
      command: 'sudo apt update && sudo apt install -y nginx',
      title: 'Installing, Removing, and Upgrading Packages with apt',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'The full lifecycle: update, install, upgrade, remove, purge, and autoremove',
      badges: ['apt', 'Install', 'Admin'],
      difficulty: 'Beginner',
      quote: 'Mastering the apt lifecycle is the bedrock of Debian system administration: update index, apply patches, purge dead config.',
      whatIsIt: 'apt provides the full lifecycle commands for system software. "apt update" refreshes repository index catalogs; "apt install" fetches and configures packages; "apt upgrade" updates installed packages to their newest versions; "apt remove" uninstalls binaries while preserving configuration files; and "apt purge" removes both binaries and their configuration files completely.',
      inSimpleWords: '"apt update" checks what is new. "apt install" installs. "apt remove" uninstalls the app but keeps your settings. "apt purge" uninstalls the app AND erases all settings.',
      whyDoYouNeedIt: 'You must maintain servers over years of operation: provisioning new tools, applying security patches, and reclaiming disk space by purging decommissioned services and old kernel images.',
      realWorldScenario: 'You are spinning up an Nginx server, then testing changes, and finally deciding to replace it with Caddy. You run "sudo apt purge nginx" to ensure no old Nginx configuration files conflict with port 80.',
      realWorldAnalogy: 'Moving out of an apartment: "remove" is moving your furniture out but leaving the lease file on the shelf. "purge" is vacating completely and shredding the paperwork.',
      withoutVsWith: {
        without: {
          title: 'Unstructured Software Installation',
          items: ['Scattered configuration files lingering after uninstalls', 'Unpatched vulnerabilities remaining due to lack of standard upgrade workflows', 'Disk space consumed by hundreds of unused dependency libraries'],
          outcome: 'Configuration bloat, security holes, and cluttered disks.'
        },
        with: {
          title: 'Structured apt Lifecycle Management',
          items: ['Predictable installation with automatic dependency resolution', 'Clean removals with "purge" and "autoremove" cleaning orphaned libraries', 'Atomic transactions ensuring broken packages can be rolled back or repaired'],
          outcome: 'Clean, lean, and auditable production servers.'
        }
      },
      blockDiagram: {
        title: 'apt Package Lifecycle',
        subtitle: 'The standard Debian/Ubuntu administrative workflow:',
        nodes: [
          { id: 'update', label: '1. apt update', simpleDef: 'Download latest package lists', techDef: 'Fetches InRelease & Packages files from mirrors', badge: 'Sync', color: '#38bdf8' },
          { id: 'install', label: '2. apt install <pkg>', simpleDef: 'Download & install package + deps', techDef: 'Calculates DAG, downloads .deb, invokes dpkg -i', badge: 'Deploy', color: '#10b981' },
          { id: 'upgrade', label: '3. apt upgrade', simpleDef: 'Upgrade all installed packages', techDef: 'Upgrades packages without removing existing ones', badge: 'Patch', color: '#a855f7' },
          { id: 'autoremove', label: '4. apt autoremove', simpleDef: 'Clean up orphaned dependencies', techDef: 'Removes packages installed as dependencies that are no longer needed', badge: 'Cleanup', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Purge', simple: 'Completely remove a package AND all its configuration files.', technical: 'Removes binaries and deletes /etc/ configuration files associated with the package.' },
        { term: 'Autoremove', simple: 'Remove libraries that were installed automatically but are no longer needed.', technical: 'Removes packages marked as "auto-installed" when no manually installed package depends on them.' }
      ],
      syntaxCode: 'sudo apt update && sudo apt install -y nginx',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with root administrative privileges' },
        { token: 'apt', role: 'command', explanation: 'Debian/Ubuntu package manager' },
        { token: 'update', role: 'argument', explanation: 'Download current package lists from configured repositories' },
        { token: '&&', role: 'operator', explanation: 'Logical AND operator: only run the next command if update succeeds' },
        { token: 'install', role: 'argument', explanation: 'Download and install the specified package' },
        { token: '-y', role: 'option', explanation: 'Automatic yes to prompts: assume yes and non-interactive' },
        { token: 'nginx', role: 'argument', explanation: 'Target package name' }
      ],
      variations: [
        { command: 'sudo apt update', description: 'Refresh repository metadata index from remote servers' },
        { command: 'sudo apt install -y curl git htop', description: 'Install multiple packages in a single non-interactive transaction' },
        { command: 'sudo apt remove nginx', description: 'Uninstall nginx binaries while preserving /etc/nginx configuration files' },
        { command: 'sudo apt purge nginx', description: 'Uninstall nginx AND delete /etc/nginx and all configuration files' },
        { command: 'sudo apt autoremove -y', description: 'Remove orphaned dependency packages that are no longer referenced' }
      ],
      expectedOutput: 'Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease\nGet:2 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [119 kB]\nReading package lists... Done\nBuilding dependency tree... Done\nThe following NEW packages will be installed:\n  nginx nginx-common nginx-core\nSetting up nginx (1.18.0-6ubuntu14.4) ...\nProcessing triggers for systemd ...',
      commonMistakes: [
        { mistake: 'Running "apt upgrade" without running "apt update" first', whyWrong: 'Upgrade checks the local database; if the database is old, upgrade will find zero new versions.', correctWay: 'Always run "sudo apt update" immediately before "sudo apt upgrade".' },
        { mistake: 'Using "apt remove" and expecting configuration files in /etc to be deleted', whyWrong: 'remove intentionally leaves config files behind in case you reinstall later.', correctWay: 'Use "sudo apt purge <package>" if you want config files permanently purged.' }
      ],
      safeRecovery: 'If an installation is interrupted or locked, kill orphaned apt processes, run "sudo dpkg --configure -a", and retry with "sudo apt install -f".'
    }),

    buildLinuxConcept({
      id: 'c-13-05',
      subChapterNumber: '13.5',
      command: 'ls /etc/apt/sources.list.d/',
      title: 'Managing Repositories (/etc/apt/sources.list & sources.list.d)',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Configuring official mirrors, third-party PPAs, and modular repository sources',
      badges: ['apt', 'Repositories', 'Config'],
      difficulty: 'Intermediate',
      quote: 'Repositories are the supply chain of your operating system. What you put in sources.list determines what code can run as root.',
      whatIsIt: 'Debian and Ubuntu define where packages are downloaded from using repository definition files. The primary configuration file is /etc/apt/sources.list, but modern systems place third-party repository configurations inside /etc/apt/sources.list.d/*.list or the newer deb822-style *.sources files. Each entry defines package type (deb or deb-src), mirror URL, release codename (e.g. jammy), and repository components (main, restricted, universe, multiverse).',
      inSimpleWords: 'It is the list of book warehouses your package manager knows about. When you need Docker or Kubernetes, you add their official repository URL to this directory so apt knows where to download them.',
      whyDoYouNeedIt: 'Enterprise software like Docker, Kubernetes, HashiCorp Terraform, and PostgreSQL maintain their own official repositories with newer versions than those in the default Ubuntu archive.',
      realWorldScenario: 'You are deploying Docker on Ubuntu. Ubuntu\'s default repo has an older version named docker.io. You add the official Docker repository to /etc/apt/sources.list.d/docker.list along with Docker\'s GPG signing key to install the latest docker-ce.',
      realWorldAnalogy: 'Adding a specialized wholesale vendor to your procurement system so your company can buy equipment directly from the manufacturer.',
      withoutVsWith: {
        without: {
          title: 'Relying Only on Default Repositories',
          items: ['Stuck on outdated software versions shipped years ago with the OS release', 'Manually downloading .deb binaries via browser and installing with dpkg', 'No automatic security updates for third-party software tools'],
          outcome: 'Outdated developer tools, security gaps, and manual update overhead.'
        },
        with: {
          title: 'Configuring Third-Party Repositories',
          items: ['Direct access to latest stable releases from vendors (Docker, NodeSource, HashiCorp)', 'Cryptographic GPG verification ensuring vendor authenticity', 'Third-party software upgrades automatically alongside OS packages via "apt upgrade"'],
          outcome: 'Current, secure software with automated vendor-backed patch management.'
        }
      },
      blockDiagram: {
        title: 'APT Repository Structure',
        subtitle: 'Breakdown of a sources.list repository line:',
        nodes: [
          { id: 'type', label: 'deb', simpleDef: 'Binary package archive', techDef: 'Specifies precompiled binaries (deb-src for source)', badge: 'Type', color: '#38bdf8' },
          { id: 'url', label: 'http://archive.ubuntu.com/ubuntu', simpleDef: 'Mirror server location', techDef: 'Base HTTP/HTTPS repository URL', badge: 'Mirror', color: '#10b981' },
          { id: 'distro', label: 'jammy', simpleDef: 'Ubuntu version codename', techDef: 'Distribution release suite/codename', badge: 'Release', color: '#a855f7' },
          { id: 'components', label: 'main restricted universe', simpleDef: 'Licensing & support areas', techDef: 'Archive components: main (free/supported), universe (community)', badge: 'Area', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'sources.list.d', simple: 'A folder where each extra repository gets its own clean configuration file.', technical: 'Modular drop-in directory parsed by apt; files must end in .list or .sources.' },
        { term: 'Universe', simple: 'Community-maintained open source software in Ubuntu.', technical: 'Ubuntu component for community-maintained free and open-source software without canonical SLA support.' }
      ],
      syntaxCode: 'ls /etc/apt/sources.list.d/',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory contents' },
        { token: '/etc/apt/sources.list.d/', role: 'path', explanation: 'Directory containing modular repository definition files' }
      ],
      variations: [
        { command: 'ls /etc/apt/sources.list.d/', description: 'List third-party repository definition files' },
        { command: 'cat /etc/apt/sources.list', description: 'View the primary default repository configuration' },
        { command: 'cat /etc/apt/sources.list.d/*.list', description: 'Inspect all active third-party repository URLs' }
      ],
      expectedOutput: 'docker.list\nhashicorp.list\nnodesource.list',
      commonMistakes: [
        { mistake: 'Adding random PPAs without verifying author credibility', whyWrong: 'Anyone can build a PPA; adding an untrusted PPA gives the author root code execution on your server during updates.', correctWay: 'Only add official vendor repositories and verify their GPG signing keys.' },
        { mistake: 'Hardcoding incorrect distribution codenames (e.g. using "focal" on "jammy")', whyWrong: 'Causes dependency conflicts and binary ABI mismatches across glibc versions.', correctWay: 'Use "$(lsb_release -cs)" to dynamically interpolate the current release codename.' }
      ],
      safeRecovery: 'If a broken repository blocks apt update, remove its file from /etc/apt/sources.list.d/ and re-run "sudo apt update".'
    }),

    buildLinuxConcept({
      id: 'c-13-06',
      subChapterNumber: '13.6',
      command: 'dnf check-update',
      title: 'dnf & yum (RHEL, Rocky, Alma, Fedora)',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Next-generation Dandified YUM package manager for enterprise Red Hat ecosystems',
      badges: ['dnf', 'yum', 'RHEL'],
      difficulty: 'Beginner',
      quote: 'DNF replaced YUM with libsolv SAT solving: faster dependency resolution, cleaner transactions, and lower memory footprint.',
      whatIsIt: 'DNF (Dandified YUM) is the default package manager for modern RPM-based distributions including Red Hat Enterprise Linux 8/9, Rocky Linux, AlmaLinux, CentOS Stream, and Fedora. DNF replaces the legacy YUM (Yellowdog Updater, Modified). It uses libsolv to calculate SAT-based dependency graphs, offering significantly faster performance, reduced memory usage, and robust rollback capabilities via dnf history.',
      inSimpleWords: 'DNF is the RHEL counterpart to Ubuntu\'s apt. It finds, downloads, and installs .rpm packages, while handling all dependencies automatically.',
      whyDoYouNeedIt: 'RHEL and enterprise clones power the majority of financial and corporate infrastructure. DNF is the primary tool used by SREs to administer these production systems.',
      realWorldScenario: 'You are auditing a fleet of Rocky Linux 9 database servers for kernel vulnerabilities. Running "dnf check-update --security" reports exactly which security patches are pending.',
      realWorldAnalogy: 'Upgrading from an old index card catalog system to a high-speed computerized database query engine.',
      withoutVsWith: {
        without: {
          title: 'Legacy Package Management (Old YUM)',
          items: ['Sluggish Python-based dependency resolution on large repositories', 'High memory usage causing OOM kills on low-memory 512MB/1GB VPS instances', 'Limited transaction logging and rollback capabilities'],
          outcome: 'Slow package installs, OOM crashes, and difficult disaster recovery.'
        },
        with: {
          title: 'Modern DNF Package Management',
          items: ['C-based libsolv dependency calculation with microsecond speed', 'Transaction history tracking with "dnf history undo" for instant rollbacks', 'Dedicated security filtering: dnf update --security'],
          outcome: 'Rock-solid enterprise stability, rapid CI/CD image builds, and audit compliance.'
        }
      },
      blockDiagram: {
        title: 'DNF Architecture',
        subtitle: 'How DNF manages enterprise RPM packages:',
        nodes: [
          { id: 'dnf_cli', label: 'dnf CLI', simpleDef: 'Command line interface', techDef: 'Python 3 CLI wrapper exposing commands and plugins', badge: 'Frontend', color: '#38bdf8' },
          { id: 'libsolv', label: 'libsolv (SAT Solver)', simpleDef: 'Superfast logic engine', techDef: 'C library solving boolean satisfiability for dependencies', badge: 'Solver', color: '#10b981' },
          { id: 'librpm', label: 'librpm', simpleDef: 'RPM database reader', techDef: 'Low-level C library reading /var/lib/rpm database', badge: 'Engine', color: '#a855f7' },
          { id: 'history', label: 'DNF History DB', simpleDef: 'Audit record of all changes', techDef: 'SQLite database recording every transaction for rollback', badge: 'Audit', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'DNF', simple: 'The modern package manager for Red Hat, Fedora, and Rocky Linux.', technical: 'Dandified YUM: package manager using hawkey and libsolv for dependency resolution.' },
        { term: 'dnf history', simple: 'A timeline showing every package you ever installed, upgraded, or removed.', technical: 'SQLite transaction journal allowing admins to inspect and undo past operations.' }
      ],
      syntaxCode: 'dnf check-update',
      syntaxTokens: [
        { token: 'dnf', role: 'command', explanation: 'Dandified YUM package manager' },
        { token: 'check-update', role: 'argument', explanation: 'Check for available package updates without installing them (returns exit code 100 if updates exist)' }
      ],
      variations: [
        { command: 'dnf check-update', description: 'Check for available updates without applying them' },
        { command: 'dnf search nginx', description: 'Search repository packages for keyword' },
        { command: 'dnf info nginx', description: 'Display package summary, version, size, and repository source' }
      ],
      expectedOutput: 'Last metadata expiration check: 0:14:22 ago on Tue 30 Sep 2026.\n\ncurl.x86_64               7.76.1-26.el9_4    baseos\nopenssl.x86_64            1:3.0.7-27.el9_4   baseos\nsystemd.x86_64            252-32.el9_4       baseos',
      commonMistakes: [
        { mistake: 'Assuming "yum" and "dnf" are different programs on RHEL 8/9', whyWrong: 'On RHEL 8/9, /usr/bin/yum is simply a symbolic link pointing to /usr/bin/dnf.', correctWay: 'Use "dnf" directly as the modern command standard.' },
        { mistake: 'Running dnf check-update in a bash script and thinking exit code 100 means an error', whyWrong: 'check-update returns exit code 100 deliberately to indicate that updates are available.', correctWay: 'Check for exit code 0 (no updates) or 100 (updates available); only code 1 indicates an actual error.' }
      ],
      safeRecovery: 'If DNF metadata is out of sync or corrupt, clean all cache with "sudo dnf clean all" and rebuild with "sudo dnf makecache".'
    }),

    buildLinuxConcept({
      id: 'c-13-07',
      subChapterNumber: '13.7',
      command: 'sudo dnf install -y httpd',
      title: 'Installing and Managing Packages with dnf',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Installing, updating, removing, and transaction rollbacks using dnf history',
      badges: ['dnf', 'Install', 'Admin'],
      difficulty: 'Beginner',
      quote: 'The superpower of DNF is transaction undo: if an update breaks your server, dnf history undo lets you step back in time.',
      whatIsIt: 'Installing and managing packages with DNF mirrors apt concepts but offers enterprise-grade transaction safety. Commands include "dnf install <package>", "dnf upgrade", "dnf remove <package>", and "dnf history". The history command lists every transaction with an ID, allowing administrators to view changes (dnf history info <id>) or undo an entire transaction including all installed dependencies (dnf history undo <id>).',
      inSimpleWords: 'You use "dnf install" to install software. If you install 50 packages by accident, "dnf history undo" lets you reverse the entire operation in one command.',
      whyDoYouNeedIt: 'In enterprise production, change control and rollback capabilities are mandatory. If a software installation causes an outage, an SRE must be able to roll back the exact transaction instantly.',
      realWorldScenario: 'You install a monitoring agent on an enterprise database node, but it introduces an incompatible OpenSSL library. You run "sudo dnf history undo last" to cleanly restore the system to its pre-installation state.',
      realWorldAnalogy: 'Pressing Ctrl+Z on your entire operating system\'s package installation history.',
      withoutVsWith: {
        without: {
          title: 'Managing Packages Without Transaction History',
          items: ['Manual uninstallation of packages leaving orphaned dependencies behind', 'No record of which admin installed what package and on what date', 'Fear of applying upgrades due to inability to reliably roll back'],
          outcome: 'Accumulation of unneeded packages and risky, high-stress upgrade windows.'
        },
        with: {
          title: 'Managing Packages With DNF History',
          items: ['Full audit trail of every transaction with timestamp and user ID', 'Atomic undo and redo operations reversing full dependency trees', 'Clean uninstalls automatically removing unused dependencies (clean_requirements_on_remove)'],
          outcome: 'Fearless package management, easy rollbacks, and complete audit compliance.'
        }
      },
      blockDiagram: {
        title: 'DNF History Rollback Flow',
        subtitle: 'Inspecting and reverting an installation transaction:',
        nodes: [
          { id: 'install', label: '1. dnf install httpd', simpleDef: 'Installs httpd + 8 dependencies', techDef: 'Creates Transaction #14 in history DB', badge: 'Action', color: '#38bdf8' },
          { id: 'history', label: '2. dnf history', simpleDef: 'Shows list of past actions', techDef: 'Queries SQLite history journal', badge: 'Audit', color: '#10b981' },
          { id: 'undo', label: '3. dnf history undo 14', simpleDef: 'Reverses transaction #14', techDef: 'Removes httpd AND the 8 dependencies cleanly', badge: 'Rollback', color: '#ef4444' }
        ]
      },
      terms: [
        { term: 'dnf history undo', simple: 'A command that reverses a specific past installation or upgrade.', technical: 'Reverses the RPM state delta recorded in the DNF transaction database for a given transaction ID.' },
        { term: 'Package Group', simple: 'A bundle of related packages installed with a single command (e.g. "Development Tools").', technical: 'Comps XML grouping of mandatory, default, and optional packages in RPM repositories.' }
      ],
      syntaxCode: 'sudo dnf install -y httpd',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with administrative root privileges' },
        { token: 'dnf', role: 'command', explanation: 'Dandified YUM package manager' },
        { token: 'install', role: 'argument', explanation: 'Install specified package' },
        { token: '-y', role: 'option', explanation: 'Automatically answer yes to confirmation prompts' },
        { token: 'httpd', role: 'argument', explanation: 'Target package name (Apache HTTP Server on RHEL)' }
      ],
      variations: [
        { command: 'sudo dnf install -y httpd', description: 'Install Apache HTTP server and its dependencies' },
        { command: 'sudo dnf upgrade -y', description: 'Upgrade all installed packages to latest available versions' },
        { command: 'sudo dnf remove httpd', description: 'Remove httpd and unneeded dependencies' },
        { command: 'dnf history', description: 'Display recent package transaction history table' },
        { command: 'sudo dnf history undo last -y', description: 'Revert the most recent package management operation' }
      ],
      expectedOutput: 'Dependencies resolved.\n================================================================================\n Package            Architecture    Version             Repository         Size\n================================================================================\nInstalling:\n httpd              x86_64          2.4.57-8.el9        appstream         47 k\nInstalling dependencies:\n apr                x86_64          1.7.0-12.el9        appstream        123 k\n httpd-core         x86_64          2.4.57-8.el9        appstream        1.4 M\n\nTransaction Summary\n================================================================================\nInstall  3 Packages\nComplete!',
      commonMistakes: [
        { mistake: 'Searching for "apache2" on RHEL/Rocky', whyWrong: 'Debian calls the Apache web server "apache2", but Red Hat systems name it "httpd".', correctWay: 'Run "sudo dnf install httpd" on RHEL/Rocky/Fedora systems.' },
        { mistake: 'Running "dnf update" without understanding that it is an alias for "dnf upgrade"', whyWrong: 'In DNF, "update" and "upgrade" perform the exact same operation (unlike APT where update only refreshes metadata).', correctWay: 'Use "dnf check-update" to see changes, and "dnf upgrade" to apply them.' }
      ],
      safeRecovery: 'If a package installation breaks a service, run "dnf history" to identify the transaction ID, then "sudo dnf history undo <id>".'
    }),

    buildLinuxConcept({
      id: 'c-13-08',
      subChapterNumber: '13.8',
      command: 'ls /etc/yum.repos.d/',
      title: 'Managing RPM Repositories (/etc/yum.repos.d/)',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Configuring .repo files, baseurl mirrors, gpgcheck flags, and EPEL',
      badges: ['Repositories', 'RHEL', 'EPEL'],
      difficulty: 'Intermediate',
      quote: 'In the Red Hat world, every repo is an INI-style .repo file in /etc/yum.repos.d/ with strict cryptographic signature checks.',
      whatIsIt: 'In Red Hat, Rocky, Alma, and Fedora, package repositories are configured using INI-style files located in /etc/yum.repos.d/*.repo. Each repository stanza defines a unique section header [repo-id], a human-readable name, the mirror URL (baseurl or metalink), an enabled flag (enabled=1 or 0), and cryptographic GPG verification settings (gpgcheck=1 and gpgkey=url). The most famous third-party repository is EPEL (Extra Packages for Enterprise Linux).',
      inSimpleWords: 'This directory contains text files that tell DNF where to find software. Each file defines a website URL where packages live and includes the security key used to verify that the files are genuine.',
      whyDoYouNeedIt: 'RHEL base repositories are intentionally minimal. To install common tools like htop, nginx, or certbot on RHEL/Rocky, you must enable EPEL or add vendor .repo files.',
      realWorldScenario: 'You are provisioning a Rocky Linux server and need htop, which is not in the base OS. You run "sudo dnf install epel-release" which automatically drops /etc/yum.repos.d/epel.repo onto the system, unlocking thousands of packages.',
      realWorldAnalogy: 'Adding a new verified catalog to your corporate vendor ordering directory.',
      withoutVsWith: {
        without: {
          title: 'Restricted to Base OS Repositories',
          items: ['Missing standard engineering utilities (htop, fail2ban, certbot, wireguard)', 'Forced to compile missing tools from raw source code without security patches', 'No automated dependency management for extra utilities'],
          outcome: 'Limited tooling and unmaintainable hand-compiled binaries.'
        },
        with: {
          title: 'Managing Verified .repo Files & EPEL',
          items: ['Instant access to thousands of vetted enterprise packages via EPEL', 'Automated GPG signature validation blocking tampered or forged packages', 'Fine-grained control to enable/disable specific repositories per command'],
          outcome: 'Rich enterprise toolchains with guaranteed supply-chain integrity.'
        }
      },
      blockDiagram: {
        title: 'RPM .repo Configuration Anatomy',
        subtitle: 'Key directives inside an /etc/yum.repos.d/*.repo file:',
        nodes: [
          { id: 'header', label: '[epel]', simpleDef: 'Unique repository ID', techDef: 'Repository section identifier used by DNF CLI flags', badge: 'ID', color: '#38bdf8' },
          { id: 'name', label: 'name=Extra Packages', simpleDef: 'Human-readable description', techDef: 'Descriptive string displayed during DNF operations', badge: 'Name', color: '#10b981' },
          { id: 'url', label: 'baseurl=https://...', simpleDef: 'Download address', techDef: 'HTTP/HTTPS URL or mirrorlist pointing to repodata/', badge: 'URL', color: '#a855f7' },
          { id: 'gpg', label: 'gpgcheck=1', simpleDef: 'Enforce cryptographic check', techDef: 'Verifies RSA/GPG signature before package installation', badge: 'Security', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'EPEL', simple: 'Extra Packages for Enterprise Linux, maintained by the Fedora Project.', technical: 'High-quality repository of additional packages for RHEL and compatible clones.' },
        { term: 'gpgcheck', simple: 'A setting that stops package installation if the author signature does not match.', technical: 'Enforces cryptographic verification of RPM package headers against imported GPG keys.' }
      ],
      syntaxCode: 'ls /etc/yum.repos.d/',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory contents' },
        { token: '/etc/yum.repos.d/', role: 'path', explanation: 'Standard directory containing all RPM repository configuration files' }
      ],
      variations: [
        { command: 'ls /etc/yum.repos.d/', description: 'List all configured repository files on the system' },
        { command: 'dnf repolist', description: 'List all currently enabled repositories and their package counts' },
        { command: 'sudo dnf config-manager --set-enabled crb', description: 'Enable the CodeReady Builder repository on RHEL/Rocky' }
      ],
      expectedOutput: 'rocky.repo  rocky-extras.repo  epel.repo  epel-testing.repo',
      commonMistakes: [
        { mistake: 'Setting gpgcheck=0 in production repositories', whyWrong: 'Disabling gpgcheck allows an attacker executing a man-in-the-middle attack to inject malicious binaries with root privileges.', correctWay: 'Always keep gpgcheck=1 and configure the correct gpgkey URL.' },
        { mistake: 'Manually editing .repo files with typos in the baseurl', whyWrong: 'A syntax error in any .repo file will cause DNF commands to fail or throw warnings.', correctWay: 'Use "dnf config-manager" or validate syntax after editing.' }
      ],
      safeRecovery: 'If a repository is broken or unreachable, disable it temporarily with "sudo dnf config-manager --set-disabled <repo-id>".'
    }),

    buildLinuxConcept({
      id: 'c-13-09',
      subChapterNumber: '13.9',
      command: 'dpkg -l | head -n 15',
      title: 'dpkg (Low-level Debian Package Manager)',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'The foundational tool that unpacks, inspects, and registers .deb archives',
      badges: ['dpkg', 'Debian', 'Low-Level'],
      difficulty: 'Intermediate',
      quote: 'APT is the project manager that orders the materials; dpkg is the laborer who actually hammers the files into place on disk.',
      whatIsIt: 'dpkg is the low-level backend package manager for Debian and Ubuntu. While apt connects to remote networks and resolves complex dependencies, dpkg operates strictly on local .deb files and the local package status database (/var/lib/dpkg/status). dpkg does NOT download packages from the internet and cannot automatically resolve missing dependencies; it simply unpacks files, executes pre/post-install scripts, and registers installed files.',
      inSimpleWords: 'dpkg is the mechanical engine inside apt. It does the physical work of unzipping the package and copying the files to the right folders on your hard drive.',
      whyDoYouNeedIt: 'When you download an internal corporate .deb package or an offline software archive, you install it with dpkg. You also use dpkg to inspect which package owns a specific broken binary on disk.',
      realWorldScenario: 'You downloaded an enterprise VPN client "anyconnect.deb" directly from your company portal. Because it is not in an online repository, you install it using "sudo dpkg -i anyconnect.deb".',
      realWorldAnalogy: 'A manual screwdriver vs a smart automated assembly line: dpkg drives the screw into place, but doesn\'t tell you which screw to buy.',
      withoutVsWith: {
        without: {
          title: 'Relying Exclusively on High-Level apt',
          items: ['Unable to install local offline .deb files without network connectivity', 'Cannot inspect raw package contents before installation', 'Stuck when package database scripts lock up during partial installs'],
          outcome: 'Inability to perform offline installations or low-level database repair.'
        },
        with: {
          title: 'Mastering Low-Level dpkg',
          items: ['Install standalone local .deb files directly with "dpkg -i"', 'Inspect which package owns any file on disk with "dpkg -S /path/to/file"', 'Fix corrupted installations using "sudo dpkg --configure -a"'],
          outcome: 'Complete control over package archives and system recovery capabilities.'
        }
      },
      blockDiagram: {
        title: 'dpkg Package State Flags',
        subtitle: 'Understanding the first two columns of "dpkg -l" output:',
        nodes: [
          { id: 'col1', label: 'Desired State (Col 1)', simpleDef: 'What the system wants', techDef: 'u: Unknown, i: Install, r: Remove, p: Purge, h: Hold', badge: 'Desired', color: '#38bdf8' },
          { id: 'col2', label: 'Current Status (Col 2)', simpleDef: 'What is actually on disk', techDef: 'n: Not, c: Config-files, i: Installed, U: Unpacked, F: Failed', badge: 'Status', color: '#10b981' },
          { id: 'ii', label: '"ii" Status', simpleDef: 'Healthy Installed State', techDef: 'Desired: Install (i) + Current: Installed (i) = Healthy', badge: 'Healthy', color: '#a855f7' },
          { id: 'rc', label: '"rc" Status', simpleDef: 'Removed but config left', techDef: 'Removed (r) + Config-files remaining (c)', badge: 'Residual', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'dpkg -i', simple: 'Install a local .deb file directly from your current directory.', technical: 'Unpacks, runs pre-installation scripts, writes files, and runs post-installation scripts.' },
        { term: 'dpkg -S', simple: 'Find out which package installed a particular file on your system.', technical: 'Searches /var/lib/dpkg/info/*.list files to match a filename or path to its owning package.' }
      ],
      syntaxCode: 'dpkg -l | head -n 15',
      syntaxTokens: [
        { token: 'dpkg', role: 'command', explanation: 'Debian package manager backend utility' },
        { token: '-l', role: 'option', explanation: 'List packages and their installation status codes' },
        { token: '| head -n 15', role: 'argument', explanation: 'Pipe output to display first 15 lines' }
      ],
      variations: [
        { command: 'dpkg -l | grep -i nginx', description: 'Check the exact installation status of nginx packages' },
        { command: 'sudo dpkg -i package.deb', description: 'Install a local Debian package archive' },
        { command: 'dpkg -S /bin/ls', description: 'Identify which installed package provided the /bin/ls binary' },
        { command: 'sudo dpkg --configure -a', description: 'Resume and repair any half-configured package installations' }
      ],
      expectedOutput: 'Desired=Unknown/Install/Remove/Purge/Hold\n| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend\n|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)\n||/ Name           Version         Architecture Description\n+++-==============-===============-============-=================================\nii  adduser        3.118ubuntu5    all          add and remove users and groups\nii  apt            2.4.11          amd64        commandline package manager',
      commonMistakes: [
        { mistake: 'Running "dpkg -i package.deb" and expecting it to download missing dependencies', whyWrong: 'dpkg does not have network capability; it will fail with an error if dependencies are missing.', correctWay: 'Follow up a failed dpkg install with "sudo apt install -f" to download missing dependencies, or use "apt install ./package.deb".' },
        { mistake: 'Ignoring "rc" packages in dpkg -l output', whyWrong: '"rc" indicates the package was removed but lingering config files are still on disk.', correctWay: 'Purge remaining config files with "sudo dpkg --purge <package>".' }
      ],
      safeRecovery: 'If dpkg aborts due to an interrupted script, run "sudo dpkg --configure -a" to finish configuration.'
    }),

    buildLinuxConcept({
      id: 'c-13-10',
      subChapterNumber: '13.10',
      command: 'rpm -qa | head -n 15',
      title: 'rpm (Low-level RPM Package Manager)',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'The core Red Hat database engine, package querying, and file ownership verification',
      badges: ['rpm', 'RHEL', 'Low-Level'],
      difficulty: 'Intermediate',
      quote: 'RPM is the ledger of the Red Hat operating system: query what is installed, verify file checksums, and detect unauthorized tampering.',
      whatIsIt: 'rpm is the low-level package manager and database engine for Red Hat, CentOS, Rocky Linux, and Fedora. Like dpkg, rpm does not resolve network dependencies. Its true power lies in auditing: the RPM database (/var/lib/rpm) stores cryptographic checksums, sizes, and permissions of every file on the system. Running "rpm -V" compares live files on disk against this database to instantly detect tampered or corrupted files.',
      inSimpleWords: 'rpm is the low-level worker that installs .rpm files. It also acts as an inspector: it remembers every file it installed and can tell you if someone modified or deleted a system file.',
      whyDoYouNeedIt: 'During security incident response on RHEL servers, "rpm -Va" is one of the first commands an SRE runs to detect whether a rootkit or attacker replaced standard binaries (like /bin/login or /usr/sbin/sshd).',
      realWorldScenario: 'A developer suspects a shared library in /lib64 was overwritten by an accidental manual script. Running "rpm -qf /lib64/libssl.so.3" identifies the package, and "rpm -V openssl-libs" confirms if the file checksum matches the vendor release.',
      realWorldAnalogy: 'A tamper-evident seal on a container: if anyone scratches, alters, or replaces the contents, the seal inspection immediately reveals the change.',
      withoutVsWith: {
        without: {
          title: 'No Cryptographic File Audit Capability',
          items: ['Inability to detect if system binaries were modified by malware', 'No way to discover which package installed an unknown file on disk', 'Guessing which files were corrupted during disk faults'],
          outcome: 'Undetected compromise and difficult integrity verification.'
        },
        with: {
          title: 'Using Low-Level RPM Verification',
          items: ['Instant file ownership lookup with "rpm -qf /path/to/file"', 'System-wide integrity verification with "rpm -V <package>" checking MD5/SHA256', 'Extracting files from an .rpm archive without installing using rpm2cpio'],
          outcome: 'Rapid incident triage, indisputable audit integrity, and quick forensic recovery.'
        }
      },
      blockDiagram: {
        title: 'RPM Verification Engine (rpm -V)',
        subtitle: 'Comparing live disk files against the signed RPM database:',
        nodes: [
          { id: 'db', label: '/var/lib/rpm Database', simpleDef: 'Original vendor file signatures', techDef: 'Berkeley DB / BDB / SQLite database of signed package metadata', badge: 'Baseline', color: '#38bdf8' },
          { id: 'checker', label: 'rpm -V <package>', simpleDef: 'Integrity scanner', techDef: 'Compares size, MD5/SHA256 hash, mtime, permissions', badge: 'Auditor', color: '#10b981' },
          { id: 'output', label: 'Audit Flags (S.5....T)', simpleDef: 'Flags differences', techDef: 'S: Size changed, 5: MD5 hash changed, T: mtime changed', badge: 'Flags', color: '#ef4444' }
        ]
      },
      terms: [
        { term: 'rpm -qf', simple: 'Find out which package owns a specific file on your disk.', technical: 'Queries the RPM database for the file path provided and prints the package NEVRA.' },
        { term: 'rpm -V', simple: 'Verify that files on disk haven\'t been modified since installation.', technical: 'Compares file attributes (size, permissions, hash, mtime) against the RPM header.' }
      ],
      syntaxCode: 'rpm -qa | head -n 15',
      syntaxTokens: [
        { token: 'rpm', role: 'command', explanation: 'Red Hat Package Manager utility' },
        { token: '-q', role: 'option', explanation: 'Query mode' },
        { token: 'a', role: 'option', explanation: 'All installed packages' },
        { token: '| head -n 15', role: 'argument', explanation: 'Pipe output to display first 15 lines' }
      ],
      variations: [
        { command: 'rpm -qa', description: 'Query and list all installed packages on the system' },
        { command: 'rpm -qf /usr/bin/bash', description: 'Find which RPM package installed the /usr/bin/bash binary' },
        { command: 'rpm -ql httpd', description: 'List every file installed by the httpd package' },
        { command: 'rpm -V httpd', description: 'Verify httpd files against database to detect modifications' }
      ],
      expectedOutput: 'setup-2.13.7-9.el9.noarch\nfilesystem-3.16-2.el9.x86_64\nbasesystem-11-13.el9.noarch\nglbc-common-2.34-60.el9.x86_64\nglibc-2.34-60.el9.x86_64',
      commonMistakes: [
        { mistake: 'Trying to install an RPM with "rpm -i" and failing on dependencies', whyWrong: 'rpm does not resolve dependencies from remote mirrors; it will simply exit with an error.', correctWay: 'Use "sudo dnf install ./package.rpm" so DNF resolves and downloads all prerequisites.' },
        { mistake: 'Panic when "rpm -V" reports changes to /etc/ configuration files', whyWrong: 'Configuration files are expected to change when configured by an admin; look for changes in binary directories like /usr/bin or /usr/sbin.', correctWay: 'Focus on binary verification flags (marked without the "c" config flag).' }
      ],
      safeRecovery: 'If the RPM database becomes locked or corrupt, remove lock files with "sudo rm -f /var/lib/rpm/__db*" and run "sudo rpm --rebuilddb".'
    }),

    buildLinuxConcept({
      id: 'c-13-11',
      subChapterNumber: '13.11',
      command: 'snap list',
      title: 'Snap, Flatpak, and AppImage: Modern Universal Formats',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Containerized, sandboxed, and cross-distribution packaging formats',
      badges: ['Snap', 'Flatpak', 'Sandboxing'],
      difficulty: 'Intermediate',
      quote: 'Universal packages bundle dependencies inside an isolated container, eliminating distribution-specific library conflicts.',
      whatIsIt: 'Traditional package managers share global libraries in /usr/lib. If App A needs OpenSSL 1.1 and App B needs OpenSSL 3.0, conflict occurs. Modern universal packaging formats solve this: Snap (Canonical/Ubuntu) mounts read-only squashfs images with AppArmor sandboxing; Flatpak (Red Hat/freedesktop) uses bubblewrap and OSTree for desktop application isolation; and AppImage bundles everything into a single self-executing portable binary without installation.',
      inSimpleWords: 'Instead of sharing files with the rest of the OS, universal packages bundle the application and all its helper libraries inside a self-contained box. They work on any Linux distribution without conflicts.',
      whyDoYouNeedIt: 'You need to run modern tools (like Certbot, MicroK8s, or the latest VS Code) on older LTS servers where the base system libraries are too old to compile the software directly.',
      realWorldScenario: 'You are deploying Let\'s Encrypt Certbot. Canonical and the EFF now recommend installing Certbot via Snap ("sudo snap install --classic certbot") to guarantee it always has the latest cryptography dependencies and automated auto-renewals.',
      realWorldAnalogy: 'Shipping a pre-assembled computer in a box vs mailing 50 individual electronic components and expecting the buyer to solder them together.',
      withoutVsWith: {
        without: {
          title: 'Conflicting System-Wide Libraries',
          items: ['Dependency conflicts preventing newer software from running on older OS versions', 'Complex compilation from source required for cutting-edge tools', 'Applications having unfettered root access to all system files without sandboxing'],
          outcome: 'Library version lock-in and security risks.'
        },
        with: {
          title: 'Universal Containerized Packages',
          items: ['Complete dependency isolation running independently of host glibc versions', 'AppArmor and seccomp sandboxing limiting application filesystem access', 'Seamless automated background updates with instant rollback capability'],
          outcome: 'Frictionless distribution-agnostic software delivery.'
        }
      },
      blockDiagram: {
        title: 'Universal Packaging Architecture',
        subtitle: 'Comparing Snap, Flatpak, and AppImage:',
        nodes: [
          { id: 'snap', label: 'Snap (Canonical)', simpleDef: 'Squashfs image mounted via loopback', techDef: 'systemd + AppArmor + loop-mounted read-only squashfs image', badge: 'Servers/Desktops', color: '#38bdf8' },
          { id: 'flatpak', label: 'Flatpak (Freedesktop)', simpleDef: 'Desktop sandbox engine', techDef: 'OSTree + Bubblewrap unprivileged user namespaces + Portal APIs', badge: 'Desktop', color: '#10b981' },
          { id: 'appimage', label: 'AppImage', simpleDef: 'Single executable file', techDef: 'Self-mounting ISO9660/SquashFS binary executing via FUSE', badge: 'Portable', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'Snap', simple: 'A containerized software package developed by Canonical that works across Linux distros.', technical: 'Read-only squashfs filesystem mounted under /snap/ and sandboxed with AppArmor.' },
        { term: 'Sandboxing', simple: 'Restricting an application so it cannot touch files outside its approved sandbox.', technical: 'Isolating process permissions using kernel namespaces, cgroups, and seccomp/AppArmor policies.' }
      ],
      syntaxCode: 'snap list',
      syntaxTokens: [
        { token: 'snap', role: 'command', explanation: 'Canonical Snap package management utility' },
        { token: 'list', role: 'argument', explanation: 'List installed snap packages and revision numbers' }
      ],
      variations: [
        { command: 'snap list', description: 'List all currently installed snap packages' },
        { command: 'sudo snap install --classic certbot', description: 'Install Certbot with classic host system access confinement' },
        { command: 'flatpak list', description: 'List all installed Flatpak desktop applications' }
      ],
      expectedOutput: 'Name      Version    Rev    Tracking       Publisher     Notes\ncore20    20230801   2015   latest/stable  canonical\\*   base\nsnapd     2.60.4     20093  latest/stable  canonical\\*   snapd\ncertbot   2.8.0      3645   latest/stable  certbot-dev   classic',
      commonMistakes: [
        { mistake: 'Forgetting the "--classic" flag when installing CLI developer tools via Snap', whyWrong: 'Strict confinement prevents tools like compilers or certbot from accessing host system files.', correctWay: 'Use "snap install --classic <tool>" when the application requires full host access.' },
        { mistake: 'Running Snaps inside unprivileged Docker containers without loop devices', whyWrong: 'Snapd requires kernel loopback mounting and AppArmor modules, which fail inside typical containers.', correctWay: 'Use native apt/dnf packages inside container images rather than Snaps.' }
      ],
      safeRecovery: 'If a snap update causes issues, revert to the previous revision instantly with "sudo snap revert <snap-name>".'
    }),

    buildLinuxConcept({
      id: 'c-13-12',
      subChapterNumber: '13.12',
      command: 'make --version',
      title: 'Building Software from Source (./configure, make, make install)',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'The classic GNU build system: compiling C/C++ source code into native machine binaries',
      badges: ['Compiling', 'Source', 'Make'],
      difficulty: 'Intermediate',
      quote: 'When no package exists, you build from source: configure the environment, compile with make, and install to /usr/local.',
      whatIsIt: 'Building software from source is the foundational method for creating executable binaries from human-readable code (usually C or C++). The universal GNU Autotools workflow consists of three steps: 1) "./configure" checks the host for required header files and generates the Makefile; 2) "make" invokes the compiler (gcc/clang) to build object files and link binaries; 3) "sudo make install" copies the finished binaries and libraries to /usr/local.',
      inSimpleWords: 'Instead of buying a pre-baked cake, you buy flour, sugar, and eggs, and bake it yourself in your own oven. This lets you customize the recipe with special flags.',
      whyDoYouNeedIt: 'You need this when you require custom compile-time modules (e.g. compiling Nginx with custom third-party Lua modules) or when running specialized open-source tools not packaged for your distribution.',
      realWorldScenario: 'You are benchmarking Redis performance and need to compile with jemalloc memory allocator optimizations and specific CPU architecture flags. Compiling from source gives you peak hardware performance.',
      realWorldAnalogy: 'Tailoring a custom bespoke suit to fit your exact measurements rather than buying one off the rack.',
      withoutVsWith: {
        without: {
          title: 'Only Using Pre-Built Binaries',
          items: ['Limited to the compile-time options chosen by the distribution maintainer', 'Unable to enable experimental or high-performance modules', 'Stuck waiting months for new releases to be packaged'],
          outcome: 'Inflexible software features and suboptimal performance.'
        },
        with: {
          title: 'Building from Source',
          items: ['Ability to enable or disable any compile-time flag (--with-http_v2_module)', 'Targeting specific CPU instructions (-march=native) for maximum speed', 'Installing custom software cleanly isolated in /usr/local'],
          outcome: 'Complete architectural control and peak hardware optimization.'
        }
      },
      blockDiagram: {
        title: 'GNU Build Pipeline',
        subtitle: 'The three universal compilation steps:',
        nodes: [
          { id: 'config', label: '1. ./configure', simpleDef: 'Checks your system & sets options', techDef: 'Shell script checking headers, libraries, and creating Makefile', badge: 'Preflight', color: '#38bdf8' },
          { id: 'make', label: '2. make -j$(nproc)', simpleDef: 'Compiles code with all CPU cores', techDef: 'Executes compiler (gcc) building .o object files and linking ELF', badge: 'Compile', color: '#10b981' },
          { id: 'install', label: '3. sudo make install', simpleDef: 'Copies files to /usr/local/bin', techDef: 'Installs binaries to /usr/local/bin, man pages, and headers', badge: 'Deploy', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'Makefile', simple: 'A text file containing recipes for how to build and link the program.', technical: 'Dependency graph definition parsed by the make utility to drive parallel compiler invocations.' },
        { term: 'build-essential', simple: 'The meta-package on Ubuntu containing gcc, g++, and make.', technical: 'Package installing gcc, g++, make, libc6-dev, and dpkg-dev necessary for compilation.' }
      ],
      syntaxCode: 'make --version',
      syntaxTokens: [
        { token: 'make', role: 'command', explanation: 'GNU build automation tool' },
        { token: '--version', role: 'option', explanation: 'Display installed make version and copyright details' }
      ],
      variations: [
        { command: 'make --version', description: 'Verify that GNU Make is installed on the host' },
        { command: './configure --prefix=/usr/local', description: 'Inspect system and configure build target directory' },
        { command: 'make -j$(nproc)', description: 'Compile the project utilizing all available CPU cores in parallel' },
        { command: 'sudo make install', description: 'Copy compiled binaries and man pages into destination directories' }
      ],
      expectedOutput: 'GNU Make 4.3\nBuilt for x86_64-pc-linux-gnu\nCopyright (C) 1988-2020 Free Software Foundation, Inc.\nLicense GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>',
      commonMistakes: [
        { mistake: 'Running "make" with a single core on a multi-core machine', whyWrong: 'Default "make" uses only 1 CPU core, making compilation take 10x longer than necessary.', correctWay: 'Run "make -j$(nproc)" to utilize all CPU cores simultaneously.' },
        { mistake: 'Running "sudo make install" without tracking files with checkinstall', whyWrong: 'make install drops unindexed files into /usr/local, making it impossible for apt to track or uninstall them.', correctWay: 'Use "checkinstall" or document the build directory to run "make uninstall" later.' }
      ],
      safeRecovery: 'If ./configure fails due to missing libraries, read config.log to identify the exact missing header and install its "-dev" package (e.g. libssl-dev).'
    }),

    buildLinuxConcept({
      id: 'c-13-13',
      subChapterNumber: '13.13',
      command: 'ldd /bin/bash',
      title: 'Managing Dependencies and Shared Libraries (ldd, ldconfig)',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Dynamic linking: inspecting shared objects (.so), ld.so cache, and LD_LIBRARY_PATH',
      badges: ['Libraries', 'ldd', 'Kernel'],
      difficulty: 'Intermediate',
      quote: 'Dynamic linking lets 100 programs share a single copy of libc in RAM. ldd reveals the dynamic library dependency tree.',
      whatIsIt: 'In Linux, most programs are dynamically linked: rather than bundling library code inside every binary, they link against Shared Objects (.so files) stored in /lib, /usr/lib, or /usr/local/lib. When an executable launches, the kernel dynamic linker (ld-linux.so) loads required .so files into memory using a precompiled cache (/etc/ld.so.cache). "ldd" prints the shared objects required by an executable. "ldconfig" rebuilds the cache when new libraries are added.',
      inSimpleWords: 'Instead of every app bringing its own copy of common tools, they share one common library stored in a central folder. "ldd" tells you which shared libraries a program needs to run.',
      whyDoYouNeedIt: 'When a custom binary or third-party tool crashes with "error while loading shared libraries: libxyz.so: cannot open shared object file", ldd immediately pinpoints the exact missing file.',
      realWorldScenario: 'You copied a proprietary binary compiled on Ubuntu 20.04 to an Ubuntu 22.04 server, and it fails to start. Running "ldd ./my_app" shows "libssl.so.1.1 => not found", revealing that the system has OpenSSL 3.0 installed instead of 1.1.',
      realWorldAnalogy: 'A restaurant kitchen where chefs share a common spice rack instead of each cook carrying their own private suitcase of spices.',
      withoutVsWith: {
        without: {
          title: 'Blind Shared Library Troubleshooting',
          items: ['Confusing "cannot open shared object" runtime crashes', 'Guessing which library version a compiled binary expects', 'Manually rebooting servers trying to make newly installed libraries discoverable'],
          outcome: 'Prolonged application outages and trial-and-error debugging.'
        },
        with: {
          title: 'Inspecting with ldd and ldconfig',
          items: ['Instant identification of missing or incompatible shared libraries with ldd', 'Fast dynamic linker cache regeneration with "sudo ldconfig"', 'Targeted runtime library redirection using LD_LIBRARY_PATH for testing'],
          outcome: 'Pinpoint troubleshooting of binary execution failures and ABI conflicts.'
        }
      },
      blockDiagram: {
        title: 'Linux Dynamic Linker Architecture',
        subtitle: 'How an ELF binary resolves shared libraries at runtime:',
        nodes: [
          { id: 'binary', label: 'ELF Executable (/bin/bash)', simpleDef: 'Program you want to run', techDef: 'ELF binary with DT_NEEDED header entries', badge: 'Binary', color: '#38bdf8' },
          { id: 'linker', label: 'ld-linux.so (Dynamic Linker)', simpleDef: 'The runtime library loader', techDef: 'Kernel invokes ld-linux.so before entering main()', badge: 'Linker', color: '#10b981' },
          { id: 'cache', label: '/etc/ld.so.cache', simpleDef: 'Pre-indexed library map', techDef: 'Binary cache generated by ldconfig indexing library paths', badge: 'Cache', color: '#a855f7' },
          { id: 'libs', label: 'Shared Objects (.so)', simpleDef: 'libc.so, libtinfo.so', techDef: 'Memory-mapped shared object files mapped into process address space', badge: 'Libraries', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'ldd', simple: 'A command that lists all shared libraries a program depends on.', technical: 'List Dynamic Dependencies: simulates dynamic loader resolution and prints mapped addresses.' },
        { term: 'ldconfig', simple: 'A command that updates the system\'s list of where shared libraries live.', technical: 'Creates necessary links and cache to the most recent shared libraries found in /etc/ld.so.conf.' }
      ],
      syntaxCode: 'ldd /bin/bash',
      syntaxTokens: [
        { token: 'ldd', role: 'command', explanation: 'List dynamic dependencies for an executable' },
        { token: '/bin/bash', role: 'path', explanation: 'Path to target binary being inspected' }
      ],
      variations: [
        { command: 'ldd /bin/bash', description: 'Display all shared library dependencies for the bash binary' },
        { command: 'ldd /usr/bin/curl | grep -i ssl', description: 'Inspect which SSL library curl is dynamically linked against' },
        { command: 'sudo ldconfig', description: 'Rebuild /etc/ld.so.cache after installing new shared libraries' }
      ],
      expectedOutput: '\tlinux-vdso.so.1 (0x00007ffca7bfb000)\n\tlibtinfo.so.6 => /lib/x86_64-linux-gnu/libtinfo.so.6 (0x00007fb1b4f42000)\n\tlibc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007fb1b4d19000)\n\t/lib64/ld-linux-x86-64.so.2 (0x00007fb1b509d000)',
      commonMistakes: [
        { mistake: 'Running ldd on untrusted third-party binaries from strangers', whyWrong: 'ldd may invoke the binary\'s dynamic linker, which can execute code embedded in malicious ELF files.', correctWay: 'Use "objdump -p <binary> | grep NEEDED" to safely inspect dependencies of untrusted binaries.' },
        { mistake: 'Copying a new .so file into /usr/local/lib and forgetting to run ldconfig', whyWrong: 'The dynamic linker reads the compiled /etc/ld.so.cache, not the raw filesystem.', correctWay: 'Always execute "sudo ldconfig" after adding shared libraries to library directories.' }
      ],
      safeRecovery: 'If a program cannot find a library located in a non-standard folder, test it temporarily with "LD_LIBRARY_PATH=/path/to/libs ./binary".'
    }),

    buildLinuxConcept({
      id: 'c-13-14',
      subChapterNumber: '13.14',
      command: 'systemctl status unattended-upgrades',
      title: 'Automating Security Updates (unattended-upgrades, dnf-automatic)',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Production patch management: automated zero-day patching without breaking changes',
      badges: ['Security', 'Patching', 'Automation'],
      difficulty: 'Intermediate',
      quote: 'Unattended upgrades turn zero-day vulnerabilities into non-events by patching CVEs automatically while you sleep.',
      whatIsIt: 'Production servers connected to the internet must be patched continuously to protect against known Common Vulnerabilities and Exposures (CVEs). Automating this process ensures critical security patches are installed without human delay. Debian and Ubuntu achieve this via "unattended-upgrades", while Red Hat and Rocky Linux utilize "dnf-automatic". Both tools can be configured to install ONLY security-designated updates while holding back feature releases that might cause regressions.',
      inSimpleWords: 'An automatic night-shift updater for your server. While you are sleeping, it checks for emergency security fixes and installs them automatically, keeping hackers out.',
      whyDoYouNeedIt: 'Security advisories for OpenSSL or SSH (like OpenSSH RegreSSHion) require immediate remediation across thousands of cloud servers. Automated patch pipelines ensure compliance and minimize vulnerability windows.',
      realWorldScenario: 'A critical remote code execution flaw is announced in OpenSSL at 2:00 AM on a Saturday. By 2:30 AM, your unattended-upgrades daemon has fetched the patched package, installed it, and restarted affected services automatically.',
      realWorldAnalogy: 'Automatic overnight software updates on your smartphone that patch security bugs without deleting your personal photos or changing your app layout.',
      withoutVsWith: {
        without: {
          title: 'Manual Ad-Hoc Security Patching',
          items: ['Servers remain vulnerable for weeks or months waiting for manual admin maintenance windows', 'High risk of zero-day exploits hitting internet-facing services', 'Inconsistent patch levels across server clusters creating compliance failures'],
          outcome: 'Severe security exposure and failed SOC2/ISO27001 audits.'
        },
        with: {
          title: 'Automated Security Upgrades',
          items: ['Vulnerabilities patched within hours of vendor security release', 'Strict filtering restricts updates only to CVE security advisories', 'Automated email alerts and reboot scheduling during maintenance windows'],
          outcome: 'Hardened infrastructure, minimized attack surface, and hands-free compliance.'
        }
      },
      blockDiagram: {
        title: 'Automated Security Patch Pipeline',
        subtitle: 'How unattended-upgrades protects production systems:',
        nodes: [
          { id: 'timer', label: 'systemd Timer', simpleDef: 'Daily scheduled trigger', techDef: 'apt-daily-upgrade.timer fires daily', badge: 'Timer', color: '#38bdf8' },
          { id: 'filter', label: 'Origin Filter', simpleDef: 'Only accepts security updates', techDef: 'Allowed-Origins { "${distro_id}:${distro_codename}-security"; }', badge: 'Filter', color: '#10b981' },
          { id: 'install', label: 'Safe Execution', simpleDef: 'Installs patches cleanly', techDef: 'Executes non-interactive dpkg transaction with lock checking', badge: 'Deploy', color: '#a855f7' },
          { id: 'reboot', label: 'Reboot Handler', simpleDef: 'Reboots at 4:00 AM if needed', techDef: 'Automatic-Reboot "true" with Automatic-Reboot-Time "04:00"', badge: 'Reboot', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'unattended-upgrades', simple: 'A Debian/Ubuntu service that installs security updates automatically in the background.', technical: 'Python package querying security repository origins and applying updates non-interactively.' },
        { term: 'dnf-automatic', simple: 'The Red Hat/Rocky equivalent service for automated background patching.', technical: 'systemd timer and DNF plugin that downloads and applies security errata.' }
      ],
      syntaxCode: 'systemctl status unattended-upgrades',
      syntaxTokens: [
        { token: 'systemctl', role: 'command', explanation: 'Systemd service management command' },
        { token: 'status', role: 'argument', explanation: 'Display runtime status and logs for specified unit' },
        { token: 'unattended-upgrades', role: 'argument', explanation: 'Target automatic patching service unit' }
      ],
      variations: [
        { command: 'systemctl status unattended-upgrades', description: 'Verify that unattended-upgrades is active and running' },
        { command: 'sudo unattended-upgrades --dry-run --debug', description: 'Simulate an unattended upgrade run and inspect debug output' },
        { command: 'cat /var/log/unattended-upgrades/unattended-upgrades.log', description: 'View audit log of all automatically installed security patches' }
      ],
      expectedOutput: '● unattended-upgrades.service - Unattended Upgrades Shutdown\n     Loaded: loaded (/lib/systemd/system/unattended-upgrades.service; enabled; vendor preset: enabled)\n     Active: active (running) since Tue 2026-09-30 00:00:01 UTC; 50min ago\n       Docs: man:unattended-upgrades(8)',
      commonMistakes: [
        { mistake: 'Enabling automatic reboots in the middle of peak customer business hours', whyWrong: 'Servers will reboot unexpectedly at 2:00 PM if a kernel patch requires it, causing user downtime.', correctWay: 'Configure "Unattended-Upgrade::Automatic-Reboot-Time "03:00";" to reboot safely off-peak.' },
        { mistake: 'Allowing all package updates instead of strictly security updates', whyWrong: 'Feature updates can introduce breaking API or configuration changes that break production apps.', correctWay: 'Keep Allowed-Origins restricted to security repositories only.' }
      ],
      safeRecovery: 'Test automatic upgrade configuration syntax safely anytime using "sudo unattended-upgrades --dry-run".'
    }),

    buildLinuxConcept({
      id: 'c-13-15',
      subChapterNumber: '13.15',
      command: 'apt-key list 2>/dev/null || gpg --list-keys',
      title: 'Package Integrity & GPG Key Verification',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Cryptographic supply chain security: GPG public keys, signed releases, and /etc/apt/keyrings',
      badges: ['Security', 'GPG', 'Signatures'],
      difficulty: 'Intermediate',
      quote: 'Never trust, always verify: GPG signatures guarantee that the package you install was built by the author and untouched in transit.',
      whatIsIt: 'Linux package repositories use asymmetric GPG (GNU Privacy Guard) cryptography to protect the software supply chain. Maintainers sign package release manifests with a private key. The package manager validates this signature using the vendor\'s public key stored on the local system. Modern Debian/Ubuntu systems store these public keys securely in /etc/apt/keyrings/, while Red Hat imports them into the RPM keyring via "rpm --import".',
      inSimpleWords: 'A digital wax seal. When you download software from Docker or Ubuntu, your system uses a mathematical key to prove the file was not altered by hackers or internet providers along with way.',
      whyDoYouNeedIt: 'Without GPG signature verification, an attacker on a coffee shop Wi-Fi or compromised DNS could spoof an update mirror and send you backdoored binaries that execute as root during installation.',
      realWorldScenario: 'You are adding the official Kubernetes repository. You download the Kubernetes GPG public key, save it to /etc/apt/keyrings/kubernetes-apt-keyring.gpg, and link it in the repository line so apt will refuse any altered packages.',
      realWorldAnalogy: 'Checking the tamper-evident hologram seal on a high-value medicine bottle before taking the medication.',
      withoutVsWith: {
        without: {
          title: 'Unauthenticated Package Installation',
          items: ['Vulnerable to Man-in-the-Middle (MITM) package tampering', 'Accepting unverified third-party binaries from untrusted mirrors', 'No way to prove whether a package was built by the authentic vendor'],
          outcome: 'Severe supply chain compromise and rootkit exposure.'
        },
        with: {
          title: 'GPG Key Signature Verification',
          items: ['Cryptographic verification of SHA256 hashes against signed release manifests', 'Immediate rejection of any modified or corrupt package archives', 'Isolated keyrings in /etc/apt/keyrings/ preventing key cross-contamination'],
          outcome: 'Guaranteed supply chain integrity and tamper-proof deployments.'
        }
      },
      blockDiagram: {
        title: 'GPG Package Verification Chain',
        subtitle: 'Validating software integrity before root installation:',
        nodes: [
          { id: 'vendor', label: 'Vendor Build System', simpleDef: 'Builds package & signs it', techDef: 'Signs InRelease file using vendor GPG private key', badge: 'Origin', color: '#38bdf8' },
          { id: 'download', label: 'Download over HTTP', simpleDef: 'Downloads signed manifest', techDef: 'Fetches InRelease, Packages.xz, and .deb archive', badge: 'Network', color: '#10b981' },
          { id: 'keyring', label: '/etc/apt/keyrings/vendor.gpg', simpleDef: 'Stored public key', techDef: 'Local armored or de-armored GPG public key', badge: 'Validator', color: '#a855f7' },
          { id: 'verify', label: 'Cryptographic Check', simpleDef: 'Matches signature & hash', techDef: 'APT verifies RSA/Ed25519 signature before calling dpkg', badge: 'Integrity', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'GPG (GNU Privacy Guard)', simple: 'Open-source implementation of PGP used to sign and verify packages.', technical: 'Public-key cryptography system providing cryptographic signature and encryption services.' },
        { term: 'keyrings directory', simple: 'The modern safe directory (/etc/apt/keyrings) where third-party public keys are kept.', technical: 'Dedicated secure directory replacing the deprecated global /etc/apt/trusted.gpg database.' }
      ],
      syntaxCode: 'apt-key list 2>/dev/null || gpg --list-keys',
      syntaxTokens: [
        { token: 'apt-key', role: 'command', explanation: 'Legacy Debian package keyring query tool' },
        { token: 'list', role: 'argument', explanation: 'List trusted public keys' },
        { token: '2>/dev/null', role: 'operator', explanation: 'Redirect stderr deprecation warnings' },
        { token: '|| gpg --list-keys', role: 'operator', explanation: 'Fallback to gpg command if apt-key is absent' }
      ],
      variations: [
        { command: 'ls -l /etc/apt/keyrings/', description: 'Inspect modern third-party public keyring files' },
        { command: 'rpm -q gpg-pubkey --qf "%{NAME}-%{VERSION}-%{RELEASE}: %{SUMMARY}\\n"', description: 'List all imported GPG keys in Red Hat RPM keyring' },
        { command: 'gpg --show-keys /etc/apt/keyrings/docker.gpg', description: 'Inspect fingerprint and validity of a downloaded GPG key' }
      ],
      expectedOutput: '/etc/apt/keyrings/docker.gpg\n----------------------------\npub   rsa4096 2017-02-22 [SCEA]\n      9DC858229FC7DD38854AE2D88D81803C0EBFCD88\nuid           Docker Release (CE deb) <docker@docker.com>',
      commonMistakes: [
        { mistake: 'Using "apt-key add" on modern Ubuntu 22.04+ systems', whyWrong: 'apt-key add is deprecated because it adds keys to a global ring, allowing any key to sign packages from any repo.', correctWay: 'Download keys directly into /etc/apt/keyrings/ and bind them via "signed-by" in sources.list.' },
        { mistake: 'Piping curl directly to apt-key (curl | sudo apt-key add -) blindly', whyWrong: 'Executing piped remote keys without inspecting fingerprints bypasses supply-chain security verification.', correctWay: 'Inspect key fingerprints before importing into system keyrings.' }
      ],
      safeRecovery: 'If apt complains "NO_PUBKEY <KEY_ID>", import the missing key into /etc/apt/keyrings/ or re-fetch from the official vendor portal.'
    }),

    buildLinuxConcept({
      id: 'c-13-16',
      subChapterNumber: '13.16',
      command: 'dpkg -L curl || rpm -ql curl',
      title: 'Inspecting Installed Files (dpkg -L, rpm -ql)',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Auditing package footprints: discovering binaries, config files, systemd units, and man pages',
      badges: ['Auditing', 'dpkg', 'rpm'],
      difficulty: 'Beginner',
      quote: 'Never guess where a package placed its configuration: ask the package database for an exact inventory of every file on disk.',
      whatIsIt: 'When a package manager installs software, it registers an inventory of every single file, directory, and symlink placed on the filesystem. "dpkg -L <package>" on Debian/Ubuntu and "rpm -ql <package>" on Red Hat list this entire file inventory. This allows you to instantly find the package\'s configuration files in /etc, binary paths in /usr/bin, systemd service units in /lib/systemd/system, and log locations.',
      inSimpleWords: 'The package packing slip. It gives you the complete itemized receipt of every file that was copied onto your system when the application was installed.',
      whyDoYouNeedIt: 'You install a complex daemon (like Bind9 or HAProxy) but do not know the exact path to its configuration file or where its systemd unit lives. Instead of using "find", querying the package database gives you the exact paths instantly.',
      realWorldScenario: 'You install Nginx on a new distro. You are not sure if the main config is at /etc/nginx/nginx.conf or /etc/nginx/conf/nginx.conf. Running "dpkg -L nginx-core | grep /etc" shows the exact paths in under 100 milliseconds.',
      realWorldAnalogy: 'Checking the packing slip inside a shipment box to verify every item and find the instruction manual.',
      withoutVsWith: {
        without: {
          title: 'Blindly Searching Filesystem',
          items: ['Wasting time running slow "find / -name filename" scans', 'Editing the wrong configuration file from an older obsolete installation', 'Not knowing what documentation or sample configs came with the package'],
          outcome: 'Wasted troubleshooting time and misconfiguration mistakes.'
        },
        with: {
          title: 'Querying Installed File Inventory',
          items: ['Instant listing of every binary, config, and systemd unit from local DB', 'Locating sample configuration files in /usr/share/doc/<package>/examples', 'Verifying if expected plugins or manual pages were included'],
          outcome: 'Instant navigation to configuration files and accurate system knowledge.'
        }
      },
      blockDiagram: {
        title: 'Package File Footprint',
        subtitle: 'Where package files typically land across the filesystem:',
        nodes: [
          { id: 'bin', label: '/usr/bin & /usr/sbin', simpleDef: 'Executable binaries', techDef: 'Compiled ELF binaries or wrapper scripts', badge: 'Binaries', color: '#38bdf8' },
          { id: 'etc', label: '/etc/<package>/', simpleDef: 'Configuration files', techDef: 'System-wide host-specific configuration files', badge: 'Config', color: '#10b981' },
          { id: 'systemd', label: '/lib/systemd/system/', simpleDef: 'Service unit files', techDef: 'systemd service and timer unit definitions', badge: 'Services', color: '#a855f7' },
          { id: 'share', label: '/usr/share/doc/', simpleDef: 'Documentation & samples', techDef: 'Copyright, changelog, and example configuration files', badge: 'Docs', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'dpkg -L', simple: 'List all files installed on your system by a specific Debian package.', technical: 'Reads /var/lib/dpkg/info/<package>.list and outputs all recorded file paths.' },
        { term: 'rpm -ql', simple: 'List all files installed on your system by a specific RPM package.', technical: 'Queries the RPM database header records for all file entries associated with the package.' }
      ],
      syntaxCode: 'dpkg -L curl || rpm -ql curl',
      syntaxTokens: [
        { token: 'dpkg -L', role: 'command', explanation: 'List files installed by Debian package' },
        { token: 'curl', role: 'argument', explanation: 'Target package name' },
        { token: '||', role: 'operator', explanation: 'Fallback operator if first command fails or is not found' },
        { token: 'rpm -ql curl', role: 'command', explanation: 'List files installed by RPM package' }
      ],
      variations: [
        { command: 'dpkg -L nginx-core | grep /etc/', description: 'List only the configuration files installed by nginx on Debian/Ubuntu' },
        { command: 'rpm -qc httpd', description: 'List only the configuration files installed by httpd on RHEL/Rocky' },
        { command: 'rpm -qd httpd', description: 'List only the documentation files and man pages installed by httpd' }
      ],
      expectedOutput: '/.\n/usr\n/usr/bin\n/usr/bin/curl\n/usr/share\n/usr/share/man\n/usr/share/man/man1\n/usr/share/man/man1/curl.1.gz',
      commonMistakes: [
        { mistake: 'Running dpkg -L on a package that is not installed', whyWrong: 'dpkg -L only checks packages currently registered in the local status database; it errors on uninstalled packages.', correctWay: 'Use "apt-file list <package>" or "dnf repoquery -l <package>" to inspect files of uninstalled packages.' },
        { mistake: 'Assuming dynamic files (logs, databases) are listed in dpkg -L', whyWrong: 'dpkg -L only lists files created during package extraction, not runtime logs created later by daemons.', correctWay: 'Inspect log directories in /var/log/ for runtime output.' }
      ],
      safeRecovery: 'If you want to view contents of an uninstalled .deb file, use "dpkg -c package.deb" to inspect it before installing.'
    }),

    buildLinuxConcept({
      id: 'c-13-17',
      subChapterNumber: '13.17',
      command: 'sudo apt clean && sudo apt autoremove',
      title: 'Cleaning Package Cache (apt clean, dnf clean)',
      topicId: 'ch-13',
      topicNumber: '13',
      topicTitle: 'Package Management',
      subtitle: 'Reclaiming disk space: purging downloaded archive caches and orphaned dependencies',
      badges: ['Storage', 'apt', 'Cleanup'],
      difficulty: 'Beginner',
      quote: 'A neglected package cache is a silent disk eater: cleaning /var/cache/apt can reclaim gigabytes on production partitions.',
      whatIsIt: 'When you install packages, package managers download binary archives (.deb or .rpm files) to a local cache directory (/var/cache/apt/archives/ or /var/cache/dnf/) before unpacking them. Over months of upgrades, these downloaded archives accumulate, consuming gigabytes of disk space. "apt clean" and "dnf clean all" safely wipe these cached archive files. Combining this with "autoremove" clears orphaned libraries and old kernel images.',
      inSimpleWords: 'Deleting the installer files after the software is already installed. Once an app is on your disk, you do not need to keep the setup file in your download folder.',
      whyDoYouNeedIt: 'Small root partitions or cloud VPS instances with 20GB disks frequently run out of space during automated upgrades. Routine cache cleaning prevents emergency disk-full outages.',
      realWorldScenario: 'An alert triggers because the root partition / on a production worker is at 94% capacity. Running "sudo apt clean && sudo apt autoremove --purge -y" immediately frees 4.2 GB of disk space in 10 seconds without stopping any running services.',
      realWorldAnalogy: 'Throwing away the empty cardboard shipping boxes and bubble wrap after unpacking your new television.',
      withoutVsWith: {
        without: {
          title: 'Uncleaned Package Archives',
          items: ['Hundreds of obsolete .deb/.rpm archives filling /var/cache', 'Old unused kernel versions clogging up the /boot partition', 'Server crashes during updates because disk space hits 100% capacity'],
          outcome: 'Disk-full outages, broken package states, and emergency alerts.'
        },
        with: {
          title: 'Routine Package Maintenance',
          items: ['Reclaiming gigabytes of disk space instantly with "clean"', 'Purging orphaned dependency libraries and old kernels with "autoremove"', 'Predictable disk utilization across cloud and container hosts'],
          outcome: 'Healthy disk headroom, clean storage, and uninterrupted uptime.'
        }
      },
      blockDiagram: {
        title: 'Cache Cleanup Targets',
        subtitle: 'Where disk space is recovered during cleanup:',
        nodes: [
          { id: 'cache', label: '/var/cache/apt/archives/', simpleDef: 'Downloaded .deb files', techDef: 'apt clean deletes all cached .deb archives in this directory', badge: 'Archive Cache', color: '#ef4444' },
          { id: 'orphans', label: 'Orphaned Libraries', simpleDef: 'Unneeded helper libraries', techDef: 'apt autoremove removes packages with no remaining reverse dependencies', badge: 'Libraries', color: '#38bdf8' },
          { id: 'kernels', label: 'Old Kernels in /boot', simpleDef: 'Older Linux kernel images', techDef: 'autoremove --purge safely removes old vmlinuz and initrd images', badge: 'Kernel', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'apt clean', simple: 'Deletes all downloaded .deb installer files from /var/cache/apt/archives/.', technical: 'Removes all .deb package files from the package cache directory without affecting installed software.' },
        { term: 'dnf clean all', simple: 'Cleans cached packages, metadata, and database headers on Red Hat systems.', technical: 'Removes cached packages and delta RPMs, metadata expire files, and SQLite cache.' }
      ],
      syntaxCode: 'sudo apt clean && sudo apt autoremove',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with root administrative privileges' },
        { token: 'apt', role: 'command', explanation: 'Debian/Ubuntu package manager' },
        { token: 'clean', role: 'argument', explanation: 'Remove downloaded package archive files from /var/cache/apt/archives/' },
        { token: '&&', role: 'operator', explanation: 'Execute next command if clean succeeds' },
        { token: 'autoremove', role: 'argument', explanation: 'Remove orphaned dependency packages no longer required by any installed application' }
      ],
      variations: [
        { command: 'sudo apt clean', description: 'Delete all downloaded .deb files from the local archive cache' },
        { command: 'sudo apt autoclean', description: 'Only delete cached .deb files that can no longer be downloaded (obsolete versions)' },
        { command: 'sudo apt autoremove --purge -y', description: 'Remove orphaned packages AND wipe their lingering configuration files' },
        { command: 'sudo dnf clean all', description: 'Remove all cached packages and repository metadata on RHEL/Rocky' }
      ],
      expectedOutput: 'Reading package lists... Done\nBuilding dependency tree... Done\n0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.\n(Cached .deb files in /var/cache/apt/archives successfully wiped)',
      commonMistakes: [
        { mistake: 'Worrying that "apt clean" will uninstall your software', whyWrong: 'apt clean only removes temporary installer .deb files; your installed applications and settings remain untouched.', correctWay: 'Run apt clean freely whenever you need to reclaim disk space.' },
        { mistake: 'Manually deleting files from /boot when it fills up', whyWrong: 'Manual deletion can break grub bootloader configurations and leave dpkg database in a corrupted state.', correctWay: 'Use "sudo apt autoremove --purge" to safely remove older kernel packages.' }
      ],
      safeRecovery: 'If you ever need to re-download a cleared package without reinstalling, run "apt download <package>".'
    })
  ]
};
