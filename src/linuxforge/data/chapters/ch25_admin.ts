import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 25: LINUX ADMINISTRATION (25.1 to 25.10)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_25: LinuxTopic = {
  id: 'ch-25',
  number: '25',
  title: 'Linux Administration',
  iconName: 'Server',
  description: 'Enterprise operations: identity governance, package baselines, storage provisioning, security auditing, and disaster recovery.',
  concepts: [
    buildLinuxConcept({
      id: 'c-25-01',
      subChapterNumber: '25.1',
      command: 'sudo useradd -D',
      title: 'User Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Enterprise user lifecycle: automated onboarding, SSH key provisioning, password aging, and offboarding',
      badges: ['Administration', 'Users', 'Identity', 'Core'],
      difficulty: 'Intermediate',
      quote: 'User management in production is identity lifecycle: prompt onboarding, least privilege access, and instantaneous offboarding.',
      whatIsIt: 'User management in enterprise Linux governs identity, authentication, and access control across the server fleet. It spans the complete user lifecycle: 1) Account creation using `useradd` with standardized home directory skeletons (`/etc/skel/`) and default shells (`/bin/bash`); 2) Password aging and rotation policies configured in `/etc/login.defs` and managed via `chage`; 3) Automated public key provisioning into `~/.ssh/authorized_keys`; 4) Account offboarding via `passwd -l` (locking passwords), expiring accounts (`chage -E 0`), and killing active sessions (`pkill -u [user]`).',
      inSimpleWords: 'Managing who has an account on the server. How to add new engineers, give them SSH keys, set password rules, and immediately disable accounts when an employee leaves the company.',
      whyDoYouNeedIt: 'Improper user management leads to orphaned user accounts, shared passwords, and security breaches when former contractors or employees retain access.',
      realWorldScenario: 'An employee leaves the engineering team. The enterprise offboarding playbook executes: 1) Lock account: `sudo usermod -L -e 1 username`; 2) Terminate active sessions: `sudo pkill -KILL -u username`; 3) Archive home directory: `sudo tar -czf /backups/home_username.tar.gz /home/username`; 4) Remove user and home: `sudo userdel -r username`.',
      realWorldAnalogy: 'Issuing and revoking employee security badges: when someone is hired they receive a badge and office key; when they leave, HR deactivates the badge immediately.',
      withoutVsWith: {
        without: {
          title: 'Manual Ad-Hoc User Creation',
          items: ['Engineers sharing a single shared admin account without accountability', 'Forgotten former employee accounts remaining active for years', 'Weak or non-expiring passwords violating security compliance'],
          outcome: 'Severe security audit failures and unauthorized access vulnerabilities.'
        },
        with: {
          title: 'Standardized Identity Lifecycle Management',
          items: ['Automated provisioning with secure defaults from /etc/skel/', 'Strict password aging and expiry policies enforced with chage', 'Immediate, scriptable offboarding eliminating lingering access'],
          outcome: '100% compliance with SOC 2 / ISO 27001 identity governance.'
        }
      },
      blockDiagram: {
        title: 'Linux User Lifecycle Flow',
        subtitle: 'The 4 stages of enterprise account management:',
        nodes: [
          { id: 'provision', label: '1. Provision (useradd -m)', simpleDef: 'Create Account', techDef: 'Allocates UID/GID, clones /etc/skel/ to /home/user, assigns shell', badge: 'Onboarding', color: '#10b981' },
          { id: 'auth_pol', label: '2. Govern (chage & sudoers)', simpleDef: 'Enforce Policies', techDef: 'Sets password expiration, maximum age, and sudo privilege group', badge: 'Governance', color: '#38bdf8' },
          { id: 'offboard', label: '3. Deprovision (usermod -L / userdel)', simpleDef: 'Deactivate & Archive', techDef: 'Locks shadow entry, terminates active processes, archives and deletes data', badge: 'Offboarding', color: '#ef4444' }
        ]
      },
      terms: [
        { term: 'chage', simple: 'A tool that changes password expiration dates and forces users to update passwords periodically.', technical: 'CLI utility modifying password aging fields in /etc/shadow.' },
        { term: '/etc/skel', simple: 'A blueprint folder: every file placed in /etc/skel is automatically copied into new users\' home folders.', technical: 'Template skeleton directory populated into newly created home directories by useradd -m.' }
      ],
      syntaxCode: 'sudo useradd -D',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with administrative privileges' },
        { token: 'useradd', role: 'command', explanation: 'Create a new user or update default new user information' },
        { token: '-D', role: 'flag', explanation: 'Display or change default user creation configuration parameters' }
      ],
      variations: [
        { command: 'sudo chage -l username', description: 'List password expiration dates, inactive limits, and aging details for a user' },
        { command: 'sudo usermod -L username', description: 'Lock a user account immediately, preventing password authentication' }
      ],
      expectedOutput: 'GROUP=100\nHOME=/home\nINACTIVE=-1\nEXPIRE=\nSHELL=/bin/bash\nSKEL=/etc/skel\nCREATE_MAIL_SPOOL=no',
      commonMistakes: [
        { mistake: 'Running "useradd" without "-m" on Debian/Ubuntu', whyWrong: 'Without "-m", useradd does NOT create a home directory! The user will log in to "/" with no personal settings.', correctWay: 'Always use "useradd -m -s /bin/bash username" or use the friendly "adduser" interactive script.' },
        { mistake: 'Deleting a user with "userdel" without "-r"', whyWrong: 'Leaves the user\'s home directory and files behind on disk with an orphaned UID number.', correctWay: 'Use "userdel -r username" to remove home directory and mail spool cleanly.' }
      ],
      safeRecovery: 'If you locked a user account by accident, unlock it with "sudo usermod -U username".'
    }),

    buildLinuxConcept({
      id: 'c-25-02',
      subChapterNumber: '25.2',
      command: 'getent group sudo',
      title: 'Group Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Role-Based Access Control (RBAC) mapping functional developer roles to filesystem and service permissions',
      badges: ['RBAC', 'Groups', 'Permissions', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Never assign permissions to individual users: assign permissions to groups, and assign users to groups.',
      whatIsIt: 'Group management implements Role-Based Access Control (RBAC) in Linux. Instead of granting permissions directly to individual user accounts, administrators define functional groups (e.g. `developers`, `dbadmins`, `docker`, `sudo`). Shared project directories use group ownership combined with the `setgid` bit (chmod 2775), ensuring that all newly created files automatically inherit the parent directory\'s group ownership. Secondary groups are managed via `usermod -aG [group] [user]` or `gpasswd`.',
      inSimpleWords: 'Organizing users into teams. Instead of changing permissions for 20 people individually, you create a "developers" group, give the group access to the folder, and add the developers to that group.',
      whyDoYouNeedIt: 'Managing individual permissions for every user becomes impossible as teams scale. Groups allow instantaneous onboarding and offboarding: adding a user to a group grants all necessary permissions in one command.',
      realWorldScenario: 'A software company deploys Docker on its staging server. Instead of giving developers full root sudo access, the administrator runs `sudo usermod -aG docker alice`, allowing Alice to communicate with the Docker daemon socket without granting her permission to reconfigure network interfaces or delete system files.',
      realWorldAnalogy: 'Departments in a company: all members of the Accounting department automatically get keycard access to the payroll printer room.',
      withoutVsWith: {
        without: {
          title: 'Ad-Hoc Individual File Ownership',
          items: ['Constantly running chown for individual users across shared folders', 'Files created by Alice cannot be edited by Bob in the same team directory', 'Giving developers full root access because group permissions were not set up'],
          outcome: 'Administrative chaos and dangerous over-privileged access.'
        },
        with: {
          title: 'Clean Role-Based Access Control (RBAC)',
          items: ['Collaborative directories using group ownership and setgid (2775)', 'Granting functional privileges cleanly via group membership (docker, sudo, www-data)', 'Auditing group members instantly with "getent group <groupname>"'],
          outcome: 'Scalable, secure, and easily auditable permission governance.'
        }
      },
      blockDiagram: {
        title: 'Linux Group RBAC Architecture',
        subtitle: 'How group membership grants access to shared resources:',
        nodes: [
          { id: 'users', label: '1. Users (Alice / Bob)', simpleDef: 'Individual Accounts', techDef: 'Primary UID with supplementary group memberships in /etc/group', badge: 'Identities', color: '#10b981' },
          { id: 'group', label: '2. Functional Group (devs)', simpleDef: 'Role Group', techDef: 'Group ID (GID 1050) defined in /etc/group with member list', badge: 'Role (RBAC)', color: '#38bdf8' },
          { id: 'resource', label: '3. Shared Resource (/opt/app)', simpleDef: 'Collaborative Dir', techDef: 'Directory mode 2775 (setgid + group write) owned by :devs', badge: 'Shared Dir', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Supplementary Group', simple: 'Additional groups a user belongs to beyond their primary personal group.', technical: 'Secondary GID memberships listed in the supplementary groups array in process credentials.' },
        { term: 'setgid on Directory (2775)', simple: 'A magic folder setting that forces every new file created inside to inherit the folder\'s group.', technical: 'Mode bit 2000 causing files created within directory to inherit parent directory GID instead of creator primary GID.' }
      ],
      syntaxCode: 'getent group sudo',
      syntaxTokens: [
        { token: 'getent', role: 'command', explanation: 'Get entries from administrative databases (files, LDAP, SSSD)' },
        { token: 'group', role: 'argument', explanation: 'Target database: /etc/group' },
        { token: 'sudo', role: 'argument', explanation: 'Group name to look up and display members for' }
      ],
      variations: [
        { command: 'sudo usermod -aG docker username', description: 'Append a user to a supplementary group (NEVER omit the -a flag!)' },
        { command: 'groups username', description: 'Display all groups that a specific user currently belongs to' }
      ],
      expectedOutput: 'sudo:x:27:ubuntu,alice,bob',
      commonMistakes: [
        { mistake: 'Running "usermod -G group user" without the "-a" (append) flag', whyWrong: 'WITHOUT "-a", usermod REMOVES the user from all their other supplementary groups (including sudo!), stripping their admin rights!', correctWay: 'ALWAYS use "-aG" together: "sudo usermod -aG group user".' },
        { mistake: 'Expecting newly added group membership to take effect in existing terminal sessions', whyWrong: 'Group memberships are loaded once during login authentication.', correctWay: 'The user must log out and log back in, or run "newgrp groupname" in their current shell.' }
      ],
      safeRecovery: 'If you just added yourself to a group, apply it to your current shell immediately without logging out by running "newgrp groupname".'
    }),

    buildLinuxConcept({
      id: 'c-25-03',
      subChapterNumber: '25.3',
      command: 'apt-mark showhold',
      title: 'Package Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Locking critical production packages (apt-mark hold) to prevent unexpected major-version breaking updates',
      badges: ['Packages', 'apt-mark', 'Stability', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Never let automated updates upgrade your production database or kernel without explicit change control.',
      whatIsIt: 'Enterprise package management requires balancing security updates against operational stability. While automated security patches protect servers from CVEs, upgrading major database engines (PostgreSQL, MySQL), container runtimes, or kernel packages during unattended updates risks breaking application schemas or network drivers. `apt-mark hold [package]` pins a package at its current version, preventing `apt upgrade` from touching it until an administrator explicitly unholds it during a scheduled maintenance window.',
      inSimpleWords: 'Freezing critical software versions. You tell Linux: "Do not touch or upgrade my database, even if there is a new version available, until I test it myself".',
      whyDoYouNeedIt: 'Accidental database version upgrades (e.g. PostgreSQL 14 upgrading automatically to 16) can shut down your database because data files require manual migration tools.',
      realWorldScenario: 'A company runs a mission-critical PostgreSQL 15 database. The sysadmin runs `sudo apt-mark hold postgresql-15`. When standard nightly security upgrades run, all operating system packages are updated, but PostgreSQL is safely skipped, ensuring 100% database uptime and avoiding unexpected schema breaks.',
      realWorldAnalogy: 'Putting a "Do Not Disturb" sign on your hotel room door: the cleaning staff cleans the rest of the hallway but leaves your room exactly as you left it.',
      withoutVsWith: {
        without: {
          title: 'Uncontrolled Package Upgrades',
          items: ['Database engines automatically upgrading and refusing to start due to data directory format changes', 'Kernel upgrades breaking third-party proprietary hardware drivers unexpectedly', 'Surprise outages caused by breaking API changes in minor library updates'],
          outcome: 'Unplanned outages and emergency middle-of-the-night database migrations.'
        },
        with: {
          title: 'Controlled Package Version Pinning',
          items: ['Critical daemons pinned safely with "apt-mark hold"', 'General OS and security updates proceed cleanly without touching pinned services', 'Planned, rehearsed version upgrades executed during maintenance windows'],
          outcome: 'Maximum security posture combined with absolute operational stability.'
        }
      },
      blockDiagram: {
        title: 'Package Version Pinning Architecture',
        subtitle: 'How apt-mark hold protects packages during upgrades:',
        nodes: [
          { id: 'upgrade', label: '1. apt upgrade Command', simpleDef: 'Upgrade Request', techDef: 'Reads remote repository indexes and calculates candidate upgrade packages', badge: 'Upgrade Engine', color: '#10b981' },
          { id: 'hold_check', label: '2. Check /var/lib/dpkg/status', simpleDef: 'Hold Verification', techDef: 'Checks package status flags for "hold" attribute set by apt-mark', badge: 'Pin Filter', color: '#38bdf8' },
          { id: 'verdict', label: '3. Upgrade or Skip', simpleDef: 'Action Taken', techDef: 'Normal packages upgrade; pinned packages are reported as "kept back" and untouched', badge: 'Safe Result', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'apt-mark hold', simple: 'A command that locks a package so it cannot be updated or upgraded.', technical: 'Sets package selection state to "hold" in dpkg database, preventing automatic upgrade.' },
        { term: 'Packages Kept Back', simple: 'A message from apt meaning: "These programs were not updated because they are on hold or require new libraries".', technical: 'Notification indicating packages skipped due to hold status or phased rollout.' }
      ],
      syntaxCode: 'apt-mark showhold',
      syntaxTokens: [
        { token: 'apt-mark', role: 'command', explanation: 'Utility to set various settings on packages' },
        { token: 'showhold', role: 'argument', explanation: 'Print list of all packages currently held back from updates' }
      ],
      variations: [
        { command: 'sudo apt-mark hold nginx', description: 'Lock the Nginx package at its current version to prevent updates' },
        { command: 'sudo apt-mark unhold nginx', description: 'Release the lock on Nginx, allowing it to be upgraded again' }
      ],
      expectedOutput: 'postgresql-15\npostgresql-client-15\nlinux-image-generic',
      commonMistakes: [
        { mistake: 'Holding packages indefinitely and forgetting about them for years', whyWrong: 'Pinned packages eventually accumulate critical security CVEs and become vulnerable.', correctWay: 'Document all held packages and schedule periodic manual upgrade reviews.' },
        { mistake: 'Running "apt-get dist-upgrade" assuming it overrides holds', whyWrong: 'dist-upgrade respects held packages, but may remove dependencies needed by held packages if conflicts exist.', correctWay: 'Always review proposed removals before confirming apt operations.' }
      ],
      safeRecovery: 'To see which packages are held and release one, run "apt-mark showhold" followed by "sudo apt-mark unhold <package>".'
    }),

    buildLinuxConcept({
      id: 'c-25-04',
      subChapterNumber: '25.4',
      command: 'systemctl daemon-reload',
      title: 'Service Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Standard operating procedures for managing high-availability system daemons and health checks',
      badges: ['systemd', 'Operations', 'Services', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Reload before restart: reloading updates configuration in memory without terminating active client connections.',
      whatIsIt: 'Enterprise service management centers around systemd operating procedures: 1) Configuration modification: whenever unit files in `/etc/systemd/system/` are created or edited, `systemctl daemon-reload` must be executed to instruct PID 1 to rescan unit files and rebuild the dependency tree; 2) Zero-downtime updates: using `systemctl reload` sends SIGHUP to daemons (Nginx, PostgreSQL, HAProxy) to reload configuration without terminating active client TCP sockets; 3) Enabling persistence: `systemctl enable --now` configures symlinks into `/etc/systemd/system/multi-user.target.wants/` for boot survival.',
      inSimpleWords: 'How to manage production programs properly. You learn how to tell Linux to reload its settings without kicking off connected website users, and how to make sure programs restart automatically if the server reboots.',
      whyDoYouNeedIt: 'Using "restart" when "reload" was sufficient drops active customer shopping carts and web connections. Knowing the difference guarantees zero-downtime operations.',
      realWorldScenario: 'An administrator updates SSL certificates for a high-traffic web application. Instead of running `systemctl restart nginx` (which terminates 10,000 active customer checkout streams), they run `sudo systemctl reload nginx`. Nginx spins up new worker processes with the new SSL certs while old workers finish existing requests cleanly.',
      realWorldAnalogy: 'Swapping flight crew members on an airplane at the gate while passengers stay comfortably seated, rather than evacuating the plane down the emergency slides.',
      withoutVsWith: {
        without: {
          title: 'Disruptive Restarts and Forgotten Boot Links',
          items: ['Dropping thousands of active web connections by running "restart" unnecessarily', 'Editing unit files and wondering why changes are ignored (missing daemon-reload)', 'Services failing to start after reboots because "enable" was never run'],
          outcome: 'Unnecessary downtime and customer-facing connection drops.'
        },
        with: {
          title: 'Graceful Zero-Downtime Service Operations',
          items: ['Seamless in-flight configuration reloads via SIGHUP (systemctl reload)', 'Automatic boot-time startup verified with "systemctl is-enabled"', 'Always syncing systemd memory state with "systemctl daemon-reload"'],
          outcome: 'Zero-downtime maintenance and high-availability operations.'
        }
      },
      blockDiagram: {
        title: 'systemctl reload vs restart Mechanics',
        subtitle: 'Comparing zero-downtime reload vs destructive restart:',
        nodes: [
          { id: 'reload', label: 'systemctl reload (SIGHUP)', simpleDef: 'Zero Downtime', techDef: 'Sends SIGHUP; master process re-reads config and spawns new workers; zero dropped sockets', badge: 'Graceful', color: '#10b981' },
          { id: 'restart', label: 'systemctl restart (SIGTERM -> Start)', simpleDef: 'Full Reboot', techDef: 'Sends SIGTERM/SIGKILL; terminates process; closes all open network connections and starts fresh', badge: 'Disruptive', color: '#ef4444' },
          { id: 'daemon', label: 'systemctl daemon-reload', simpleDef: 'Sync PID 1 Memory', techDef: 'Forces systemd PID 1 to re-read all unit files from disk into memory', badge: 'Systemd Internal', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'daemon-reload', simple: 'A command that tells systemd: "I edited a service file on the hard drive; please re-read it into memory".', technical: 'Instructs systemd manager to reload all unit files and re-create entire dependency tree.' },
        { term: 'Graceful Reload', simple: 'Updating a program\'s settings while it is running without interrupting connected users.', technical: 'Master process parsing updated configuration and executing hot-reloading of child worker threads.' }
      ],
      syntaxCode: 'systemctl daemon-reload',
      syntaxTokens: [
        { token: 'systemctl', role: 'command', explanation: 'Systemd service and unit management utility' },
        { token: 'daemon-reload', role: 'argument', explanation: 'Reload systemd manager configuration, scanning for new or changed units' }
      ],
      variations: [
        { command: 'sudo systemctl reload nginx', description: 'Gracefully reload Nginx configuration without dropping active connections' },
        { command: 'systemctl is-enabled nginx', description: 'Verify whether a service is configured to automatically launch upon server boot' }
      ],
      expectedOutput: '# (No output on success: exit code 0 indicates systemd successfully re-scanned all unit files)',
      commonMistakes: [
        { mistake: 'Forgetting to run "daemon-reload" after modifying a .service file', whyWrong: 'Systemd will print a warning and continue executing the old configuration from memory!', correctWay: 'Always execute "sudo systemctl daemon-reload" immediately after saving unit edits.' },
        { mistake: 'Using "restart" when "reload" is supported by the application', whyWrong: 'Restart severs active TCP connections and causes brief application downtime.', correctWay: 'Use "sudo systemctl reload <service>" whenever updating config files.' }
      ],
      safeRecovery: 'If a service gets stuck in "deactivating" state during a restart, force kill it with "sudo systemctl kill -s SIGKILL <service>".'
    }),

    buildLinuxConcept({
      id: 'c-25-05',
      subChapterNumber: '25.5',
      command: 'sudo lvextend -r -L +10G /dev/vg0/data',
      title: 'Storage Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Online filesystem expansion with LVM (lvextend -r) without requiring server reboots or downtime',
      badges: ['Storage', 'LVM', 'Expansion', 'Core'],
      difficulty: 'Advanced',
      quote: 'LVM turns physical disks into elastic liquid storage: resize partitions online while databases run at full speed.',
      whatIsIt: 'Logical Volume Manager (LVM) abstracts physical hard drives into an elastic storage pool. In LVM architecture: 1) Physical Volumes (`PV`: raw disks or partitions like `/dev/sdb`); 2) Volume Groups (`VG`: pools of storage aggregating multiple PVs); 3) Logical Volumes (`LV`: virtual partitions formatted with filesystems like ext4 or XFS). The command `lvextend -r -L +10G /dev/vg0/data` demonstrates the peak of modern Linux administration: expanding a logical volume by 10GB AND simultaneously resizing the underlying ext4/XFS filesystem online (`-r` flag) with ZERO reboots and ZERO downtime.',
      inSimpleWords: 'Growing your hard drive on the fly. With LVM, you don\'t have to turn off your computer to expand storage. You run one command, and your hard drive instantly gets 10GB bigger while programs are still running.',
      whyDoYouNeedIt: 'Without LVM, when a disk partition runs out of space, you must boot into rescue mode, unmount the drive, repartition with fdisk, and hope nothing corrupts. LVM makes resizing instant and risk-free.',
      realWorldScenario: 'A production PostgreSQL database volume reaches 92% capacity on Friday afternoon. Instead of scheduling an emergency maintenance outage, the sysadmin adds a new 50GB cloud disk to the volume group and runs `sudo lvextend -r -L +50G /dev/vg_prod/lv_postgres`. The filesystem expands instantly while transactions execute continuously with zero errors.',
      realWorldAnalogy: 'Pouring water from multiple water bottles into a single large pitcher: you can pour glasses of any size from the pitcher, and add more water bottles whenever you want.',
      withoutVsWith: {
        without: {
          title: 'Rigid Legacy Disk Partitions',
          items: ['Hard partitions locked to fixed physical disk sectors', 'Resizing partitions requires unmounting and scheduling server downtime', 'Unable to span a single filesystem across multiple physical hard drives'],
          outcome: 'Frequent disk full emergencies and painful maintenance windows.'
        },
        with: {
          title: 'Elastic Storage Pools with LVM',
          items: ['Online, zero-downtime volume and filesystem expansion with "-r"', 'Aggregating multiple physical SSDs into a single unified storage pool', 'Creating instant point-in-time LVM snapshots for safe backups'],
          outcome: 'Infinite storage flexibility with 100% operational uptime.'
        }
      },
      blockDiagram: {
        title: 'LVM 3-Tier Storage Hierarchy',
        subtitle: 'How LVM bridges physical disks to formatted filesystems:',
        nodes: [
          { id: 'pv', label: '1. Physical Volumes (PV)', simpleDef: 'Raw Disks', techDef: 'Disks initialized with pvcreate (e.g. /dev/sdb, /dev/sdc)', badge: 'Physical Layer', color: '#10b981' },
          { id: 'vg', label: '2. Volume Group (VG)', simpleDef: 'Storage Pool', techDef: 'Unified storage pool aggregating all PV physical extents (PE)', badge: 'Pool Layer', color: '#38bdf8' },
          { id: 'lv', label: '3. Logical Volume (LV + FS)', simpleDef: 'Virtual Partition', techDef: 'Allocated volume formatted with ext4/XFS; resized on the fly with lvextend -r', badge: 'Filesystem', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Physical Extent (PE)', simple: 'The tiny Lego blocks (usually 4MB each) that LVM uses to build storage volumes.', technical: 'Smallest allocatable chunk of storage managed within an LVM Volume Group.' },
        { term: 'lvextend -r', simple: 'The magic flag (-r) that resizes the actual filesystem (ext4/XFS) at the exact same time it resizes the LVM volume.', technical: 'Combines lvextend with automatic resize2fs (ext4) or xfs_growfs (XFS) invocation.' }
      ],
      syntaxCode: 'sudo lvextend -r -L +10G /dev/vg0/data',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with administrative privileges' },
        { token: 'lvextend', role: 'command', explanation: 'Extend the size of a logical volume' },
        { token: '-r', role: 'flag', explanation: 'Resize underlying filesystem automatically along with the logical volume' },
        { token: '-L +10G', role: 'flag', explanation: 'Increase size by 10 gigabytes' },
        { token: '/dev/vg0/data', role: 'path', explanation: 'Path to target logical volume device' }
      ],
      variations: [
        { command: 'sudo vgs', description: 'Display summary of Volume Groups and how much free unallocated space remains' },
        { command: 'sudo lvs', description: 'List all Logical Volumes, their sizes, and volume group memberships' }
      ],
      expectedOutput: '  Size of logical volume vg0/data changed from 20.00 GiB (5120 extents) to 30.00 GiB (7680 extents).\n  Logical volume vg0/data successfully resized.\nresize2fs 1.46.5 (30-Dec-2021)\nFilesystem at /dev/mapper/vg0-data is mounted on /data; on-line resizing required\nold_desc_blocks = 3, new_desc_blocks = 4\nThe filesystem on /dev/mapper/vg0-data is now 7864320 (4k) blocks long.',
      commonMistakes: [
        { mistake: 'Running "lvextend" without the "-r" flag', whyWrong: 'The LVM volume grows, but the filesystem inside stays the old size! You won\'t see the new free space in "df -h".', correctWay: 'Always include the "-r" flag: "lvextend -r -L +10G ...".' },
        { mistake: 'Trying to shrink an XFS filesystem', whyWrong: 'XFS filesystems can be grown online, but they can NEVER be shrunk! Attempting to shrink will fail.', correctWay: 'Grow XFS volumes conservatively; only ext4 supports shrinking (and requires unmounting).' }
      ],
      safeRecovery: 'If you ran lvextend without -r, manually resize ext4 with "sudo resize2fs /dev/vg0/data" or XFS with "sudo xfs_growfs /mountpoint".'
    }),

    buildLinuxConcept({
      id: 'c-25-06',
      subChapterNumber: '25.6',
      command: 'nmcli device status || networkctl',
      title: 'Network Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Enterprise network configuration using NetworkManager (nmcli) or systemd-networkd',
      badges: ['Networking', 'nmcli', 'NetworkManager', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Modern Linux network management is declarative: manage profiles with nmcli or netplan rather than hacking interfaces files.',
      whatIsIt: 'Enterprise network configuration has evolved beyond deprecated scripts (`/etc/network/interfaces`) into declarative managers: 1) `NetworkManager` (standard on RHEL, Fedora, CentOS, and desktop Ubuntu), operated via the `nmcli` command-line tool; 2) `systemd-networkd`, managed via `networkctl`; 3) `Netplan` (standard on Ubuntu Server), which translates declarative YAML files in `/etc/netplan/*.yaml` into backend configurations. `nmcli` allows dynamic configuration of static IPs, VLAN tagging, network bonding/teaming, and DNS settings without restarting the OS.',
      inSimpleWords: 'Configuring network settings the modern way. Instead of editing fragile text files, you use "nmcli" or "netplan" to set static IP addresses, gateways, and DNS servers cleanly.',
      whyDoYouNeedIt: 'Network settings must survive server reboots. Using modern tools like nmcli or netplan ensures that network configurations are validated, persistent, and standardized.',
      realWorldScenario: 'An administrator configures a static IP on a newly installed enterprise database server. Instead of guessing syntax in deprecated files, they execute: `sudo nmcli con mod eth0 ipv4.addresses 192.168.1.50/24 ipv4.gateway 192.168.1.1 ipv4.dns "1.1.1.1 8.8.8.8" ipv4.method manual` and `sudo nmcli con up eth0`, permanently locking in the configuration.',
      realWorldAnalogy: 'Using your phone\'s network settings menu to configure static Wi-Fi settings instead of rewriting the phone\'s internal firmware code.',
      withoutVsWith: {
        without: {
          title: 'Editing Deprecated /etc/network/interfaces',
          items: ['Network configurations breaking silently during distribution upgrades', 'Typing "ip addr add" commands that disappear the moment the server reboots', 'Confusion over whether NetworkManager or systemd-networkd is in control'],
          outcome: 'Lost network connectivity and non-persistent configuration changes.'
        },
        with: {
          title: 'Declarative Network Management with nmcli / netplan',
          items: ['Clean persistent network profiles saved to /etc/NetworkManager/system-connections/', 'Automatic connection fallback if configuration syntax is invalid', 'Instant status inspection with "nmcli device status" or "networkctl"'],
          outcome: 'Rock-solid, reboot-persistent enterprise network configuration.'
        }
      },
      blockDiagram: {
        title: 'Modern Linux Network Control Stack',
        subtitle: 'The management layers configuring Linux kernel networking:',
        nodes: [
          { id: 'frontend', label: '1. Frontend (nmcli / netplan)', simpleDef: 'Admin Interface', techDef: 'CLI or declarative YAML file defining IP, route, and DNS intent', badge: 'Admin Layer', color: '#10b981' },
          { id: 'daemon', label: '2. Daemon (NetworkManager / networkd)', simpleDef: 'Network Engine', techDef: 'Manages DHCP leases, link events, and generates runtime configurations', badge: 'Daemon Engine', color: '#38bdf8' },
          { id: 'kernel', label: '3. Kernel Netlink & iproute2', simpleDef: 'Kernel Network Stack', techDef: 'Issues RTM_NEWADDR / RTM_NEWROUTE netlink messages to configure Linux kernel', badge: 'Kernel Ring 0', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'nmcli', simple: 'The command-line tool used to control NetworkManager on Linux.', technical: 'Command-line tool for controlling NetworkManager and reporting network status.' },
        { term: 'Netplan', simple: 'Ubuntu\'s modern network configuration tool that uses clean YAML files in /etc/netplan/.', technical: 'Declarative network configuration utility reading YAML and generating backend config for networkd or NetworkManager.' }
      ],
      syntaxCode: 'nmcli device status || networkctl',
      syntaxTokens: [
        { token: 'nmcli device status', role: 'command', explanation: 'Query NetworkManager for status and connection profile of all physical/virtual network devices' },
        { token: '||', role: 'operator', explanation: 'Fallback operator: execute networkctl if NetworkManager is not installed' },
        { token: 'networkctl', role: 'command', explanation: 'Query systemd-networkd link states and operational status' }
      ],
      variations: [
        { command: 'sudo netplan apply', description: 'Apply declarative network configuration defined in /etc/netplan/*.yaml on Ubuntu' },
        { command: 'nmcli connection show', description: 'List all configured persistent network connection profiles' }
      ],
      expectedOutput: 'DEVICE  TYPE      STATE      CONNECTION\neth0    ethernet  connected  Wired connection 1\nlo      loopback  unmanaged  --',
      commonMistakes: [
        { mistake: 'Using "sudo ip addr add" and expecting it to persist across reboots', whyWrong: '"ip addr" commands modify kernel memory only; the IP address disappears completely upon reboot!', correctWay: 'Configure the IP persistently in nmcli or /etc/netplan/*.yaml.' },
        { mistake: 'Indentation errors in netplan YAML files', whyWrong: 'YAML is strictly whitespace-sensitive; using tabs instead of spaces will cause "netplan apply" to crash.', correctWay: 'Use exactly 2 spaces per indentation level and test with "sudo netplan try".' }
      ],
      safeRecovery: 'When testing risky netplan changes on Ubuntu, use "sudo netplan try": it automatically rolls back changes if you don\'t confirm within 120 seconds.'
    }),

    buildLinuxConcept({
      id: 'c-25-07',
      subChapterNumber: '25.7',
      command: 'sudo lynis audit system',
      title: 'Security Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Running Lynis automated security audits, compliance scanning, and CIS benchmark verification',
      badges: ['Security', 'Audit', 'Lynis', 'CIS', 'Core'],
      difficulty: 'Advanced',
      quote: 'You cannot protect what you have not audited: automated compliance scanning reveals vulnerabilities before attackers do.',
      whatIsIt: 'Enterprise security management requires proactive, automated compliance audits against established industry hardening standards (such as CIS Benchmarks, NIST, and HIPAA). `Lynis` is the premier open-source battle-tested security auditing tool for Linux systems. Running `sudo lynis audit system` conducts hundreds of automated checks across 24 security domains: bootloader security, kernel hardening (sysctl), password policies, permissions on sensitive files, firewall configurations, SSH settings, and vulnerable packages, outputting a Hardening Index score along with actionable remediation suggestions.',
      inSimpleWords: 'A full medical checkup for your server\'s security. Lynis scans everything—passwords, firewalls, permissions, open ports—and gives you a report card with a score and exact instructions on how to fix weaknesses.',
      whyDoYouNeedIt: 'Security compliance auditors will grade your infrastructure. Running Lynis proactively identifies missing security headers, stale accounts, and weak kernel settings before an official audit.',
      realWorldScenario: 'Before launching an online banking backend into production, the lead SRE runs "sudo lynis audit system". Lynis awards a Hardening Index of 62/100 and suggests: disabling core dumps, setting `fs.suid_dumpable=0`, restricting permissions on `/boot/grub/grub.cfg`, and disabling legacy USB storage drivers. After applying the fixes, the score rises to 88/100.',
      realWorldAnalogy: 'A professional home security inspector walking through your house, checking door deadbolts, testing smoke alarms, inspecting window latches, and giving you a punch-list of fixes.',
      withoutVsWith: {
        without: {
          title: 'Blind Assumption of Security Hardening',
          items: ['Assuming default OS installations are secure out of the box', 'Unknown world-writable files and dangerous SUID binaries left on disk', 'Failing enterprise SOC 2 and ISO 27001 regulatory security audits'],
          outcome: 'Failed compliance audits and hidden security vulnerabilities.'
        },
        with: {
          title: 'Automated Continuous CIS Compliance',
          items: ['Automated scanning against CIS and NIST hardening benchmarks', 'Quantifiable Hardening Index score tracking security improvements over time', 'Concrete remediation commands provided for every identified weakness'],
          outcome: 'Enterprise-grade security posture and effortless audit compliance.'
        }
      },
      blockDiagram: {
        title: 'Lynis Security Audit Engine',
        subtitle: 'The scanning domains evaluated during a system audit:',
        nodes: [
          { id: 'kernel_scan', label: '1. Kernel & Bootloader', simpleDef: 'Core Integrity', techDef: 'Inspects sysctl network parameters, core dumps, ASLR, and GRUB password protection', badge: 'Kernel Hardening', color: '#10b981' },
          { id: 'auth_scan', label: '2. Identity & Access', simpleDef: 'Users & Permissions', techDef: 'Audits /etc/shadow password aging, sudoers policies, SUID binaries, and root login', badge: 'Access Control', color: '#38bdf8' },
          { id: 'report', label: '3. Hardening Index & Fixes', simpleDef: 'Actionable Report', techDef: 'Outputs score (0-100), warning list, and suggestions log in /var/log/lynis-report.dat', badge: 'Audit Report', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'CIS Benchmarks', simple: 'A world-standard checklist of security settings that every secure Linux server should follow.', technical: 'Center for Internet Security consensus-based configuration best practices for hardening OS platforms.' },
        { term: 'Hardening Index', simple: 'A score from 0 to 100 given by Lynis telling you how secure your server is.', technical: 'Metric reflecting the percentage of passed security and compliance checks.' }
      ],
      syntaxCode: 'sudo lynis audit system',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with administrative root privileges' },
        { token: 'lynis', role: 'command', explanation: 'Security auditing and system hardening tool' },
        { token: 'audit system', role: 'argument', explanation: 'Perform comprehensive security scan of the entire operating system' }
      ],
      variations: [
        { command: 'sudo lynis audit system --quick', description: 'Run full security scan non-interactively without waiting for user keypresses' },
        { command: 'grep -E "suggestion|warning" /var/log/lynis.log | head -n 20', description: 'Review the top 20 recommendations and warnings generated by Lynis scan' }
      ],
      expectedOutput: '  -[ Lynis 3.0.8 Results ]-\n\n  Great, no warnings found.\n\n  Suggestions (38):\n  ----------------------------\n  * Set a password on GRUB bootloader to prevent tampering [BOOT-5122]\n  * Configure minimum password age in /etc/login.defs [AUTH-9286]\n  * Set net.ipv4.conf.all.rp_filter to 1 in sysctl [KRNL-5622]\n\n  Hardening index : 74 [############        ]\n  Tests performed : 284\n  Plugins enabled : 1',
      commonMistakes: [
        { mistake: 'Attempting to reach a 100/100 Hardening Index on every machine', whyWrong: 'A 100 score requires extreme measures (like disabling all compilers and USB ports) that may break developer workstations or CI runners.', correctWay: 'Target a realistic benchmark score (e.g. 75-85) that balances security with operational usability.' },
        { mistake: 'Running Lynis without reading the suggestions log in /var/log/lynis.log', whyWrong: 'The terminal summary only shows high-level test names; the log contains the exact configuration lines to apply.', correctWay: 'Always inspect /var/log/lynis.log for detailed remediation guidance.' }
      ],
      safeRecovery: 'To view only the critical warnings from the last Lynis scan, run "grep WARNING /var/log/lynis.log".'
    }),

    buildLinuxConcept({
      id: 'c-25-08',
      subChapterNumber: '25.8',
      command: 'logrotate -d /etc/logrotate.d/nginx',
      title: 'Log Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Configuring centralized log forwarding (rsyslog/Fluentd/Promtail) to Grafana Loki or Elasticsearch',
      badges: ['Observability', 'Logs', 'logrotate', 'Core'],
      difficulty: 'Intermediate',
      quote: 'An unrotated log file will eventually fill 100% of your disk: logrotate is your insurance policy.',
      whatIsIt: 'Log management encompasses log rotation, compression, retention, and centralized aggregation. Without rotation, daemons writing continuous logs will fill storage partitions to 100%. `logrotate` automates this process: rotating active log files on a schedule (daily/weekly), compressing historical logs (`gzip`), removing expired archives, and signaling daemons via `postrotate` scripts (sending SIGHUP to reopen log handles). In modern cloud environments, local logs are forwarded off-host in real time using tools like Promtail (to Grafana Loki), Fluentd, or Rsyslog.',
      inSimpleWords: 'Keeping log files from eating your hard drive. Every night, Linux archives yesterday\'s log, compresses it to save space, and deletes logs older than 30 days so your disk never fills up.',
      whyDoYouNeedIt: 'Neglected log files are the #1 cause of sudden "Disk Full" production emergencies. Testing logrotate with the `-d` (dry-run) flag ensures rotation rules execute cleanly before the disk fills up.',
      realWorldScenario: 'An e-commerce API server generates 15GB of access logs per day. The administrator configures `/etc/logrotate.d/app` with `daily`, `rotate 14`, `compress`, and `delaycompress`. Every night at midnight, the active log is renamed, compressed to 1.2GB, and archives older than 14 days are automatically pruned, keeping total disk usage strictly below 20GB.',
      realWorldAnalogy: 'Filing away last month\'s paper bills into an archived banker\'s box in the storage room and shredding boxes older than 7 years.',
      withoutVsWith: {
        without: {
          title: 'Uncontrolled Log File Accumulation',
          items: ['Log files growing to 200GB and abruptly crashing production databases', 'Attempting to open a 50GB file with nano and crashing the server memory', 'Zero compliance retention policy for legal and security records'],
          outcome: 'Disk space exhaustion and service downtime.'
        },
        with: {
          title: 'Automated Log Lifecycle with logrotate',
          items: ['Automatic daily rotation and gzip compression saving 90% disk space', 'Predictable retention caps (e.g. rotate 30 deletes files after 30 days)', 'Zero-downtime log reopening using postrotate signals'],
          outcome: 'Predictable storage consumption and reliable audit retention.'
        }
      },
      blockDiagram: {
        title: 'logrotate Lifecycle Execution',
        subtitle: 'The 4-stage rotation cycle executed by logrotate:',
        nodes: [
          { id: 'rename', label: '1. Rename Active Log', simpleDef: 'Rotate File', techDef: 'Renames /var/log/nginx/access.log to access.log.1', badge: 'Rename', color: '#10b981' },
          { id: 'signal', label: '2. postrotate Signal', simpleDef: 'Reopen File Handle', techDef: 'Sends SIGHUP or USR1 signal to daemon instructing it to recreate access.log', badge: 'Signal Daemon', color: '#38bdf8' },
          { id: 'compress', label: '3. Compress & Purge', simpleDef: 'Compress Old Logs', techDef: 'Compresses access.log.2 to .gz; deletes archives exceeding "rotate N" retention limit', badge: 'Prune Storage', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'delaycompress', simple: 'A setting that waits until the NEXT rotation to compress a log file, ensuring programs finish writing to it safely.', technical: 'Postpones compression of the previous log file to the next rotation cycle.' },
        { term: 'Dry Run (-d)', simple: 'Testing logrotate in simulation mode: it tells you what it WOULD do without actually touching any files.', technical: 'Debug flag running logrotate logic without modifying files or executing scripts.' }
      ],
      syntaxCode: 'logrotate -d /etc/logrotate.d/nginx',
      syntaxTokens: [
        { token: 'logrotate', role: 'command', explanation: 'System log rotation, compression, and removal utility' },
        { token: '-d', role: 'flag', explanation: 'Debug mode: simulate rotation process without making actual changes to files' },
        { token: '/etc/logrotate.d/nginx', role: 'path', explanation: 'Specific application logrotate configuration rule to test' }
      ],
      variations: [
        { command: 'sudo logrotate -f /etc/logrotate.d/nginx', description: 'Force immediate rotation of logs, ignoring schedule intervals' },
        { command: 'cat /var/lib/logrotate/status', description: 'Inspect timestamp records showing when each log file was last rotated' }
      ],
      expectedOutput: 'reading config file /etc/logrotate.d/nginx\n\nHandling 1 logs\n\nrotating pattern: /var/log/nginx/*.log  after 1 days (14 rotations)\nempty log files are not rotated, old logs are removed\nconsidering log /var/log/nginx/access.log\n  log does not need rotating (log has been already rotated)\nconsidering log /var/log/nginx/error.log\n  log does not need rotating (log has been already rotated)',
      commonMistakes: [
        { mistake: 'Forgetting the "postrotate" signal block when rotating logs', whyWrong: 'Without SIGHUP/USR1, the daemon keeps writing to the renamed file descriptor (access.log.1), leaving the new access.log completely empty!', correctWay: 'Always include a postrotate block telling the daemon to reopen its log files.' },
        { mistake: 'Testing logrotate with "-f" (force) in production unnecessarily', whyWrong: 'Forces immediate rotation, splitting active logs prematurely and creating fragmented log files.', correctWay: 'Always use debug mode "-d" to test syntax safely.' }
      ],
      safeRecovery: 'If logrotate encounters permission errors, verify that directory ownership matches the "su user group" directive in the config.'
    }),

    buildLinuxConcept({
      id: 'c-25-09',
      subChapterNumber: '25.9',
      command: 'restic backup /var/data',
      title: 'Backup Management',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'The 3-2-1 backup rule: encrypted off-site deduplicated snapshots using Restic or Borg Backup',
      badges: ['Backups', 'DisasterRecovery', 'Restic', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Nobody cares about backups; people only care about restores: test your restores regularly.',
      whatIsIt: 'Enterprise backup management follows the golden `3-2-1 Backup Rule`: maintain 3 copies of data, across 2 different storage media types, with 1 copy stored securely off-site (cloud or remote datacenter). Modern Linux backup engineering has replaced primitive `tar` scripts with deduplicating, encrypted snapshot managers like `Restic` and `BorgBackup`. These tools chunk files into cryptographic hashes, storing only changed data blocks, providing client-side AES-256 encryption, and supporting cloud storage backends (AWS S3, Backblaze B2, Azure Blob) natively.',
      inSimpleWords: 'Backing up your data properly. Modern tools like Restic encrypt your files so hackers cannot read them, only upload the small pieces that changed (deduplication), and store them safely in the cloud.',
      whyDoYouNeedIt: 'Ransomware, hardware drive crashes, and accidental deletions are inevitable. Having automated, immutable off-site backups guarantees that a business can recover from disaster.',
      realWorldScenario: 'A ransomware attacker gains access to an internal server and encrypts the filesystem. Because the company uses Restic with an append-only S3 bucket policy, the attacker cannot delete or encrypt historical snapshots. The SRE provisions a fresh Linux server and runs `restic restore latest --target /`, restoring the entire production database in 25 minutes with zero ransom paid.',
      realWorldAnalogy: 'Making photocopies of important family documents, putting one in a fireproof home safe, and keeping another in a bank deposit box across town.',
      withoutVsWith: {
        without: {
          title: 'Unencrypted Flat Tar Backups on the Same Drive',
          items: ['Backups stored on the same physical hard drive as the data (dies when disk dies)', 'Unencrypted backup archives exposing passwords if leaked', 'Full backups running nightly, wasting terabytes of bandwidth and storage'],
          outcome: 'Total data loss upon hardware failure or ransomware attack.'
        },
        with: {
          title: 'Modern Deduplicated Snapshots with Restic',
          items: ['Client-side AES-256 encryption before leaving the server', 'Block-level deduplication uploading only modified bytes', 'Direct integration with immutable cloud object storage (S3/B2)'],
          outcome: 'Bulletproof disaster recovery and rapid recovery times.'
        }
      },
      blockDiagram: {
        title: 'Restic Deduplicated Backup Architecture',
        subtitle: 'How Restic chunks, encrypts, and deduplicates file data:',
        nodes: [
          { id: 'source', label: '1. Source Files (/var/data)', simpleDef: 'Files to Back Up', techDef: 'Scans directory trees, splits files into dynamic Content-Defined Chunks (CDC)', badge: 'Local FS', color: '#10b981' },
          { id: 'crypto', label: '2. Deduplicate & Encrypt', simpleDef: 'Deduplication Engine', techDef: 'Checks chunk hashes against index; encrypts new chunks with AES-256-CTR + Poly1305', badge: 'Crypto Engine', color: '#38bdf8' },
          { id: 'repo', label: '3. Remote Repo (S3 / B2)', simpleDef: 'Off-Site Repository', techDef: 'Stores encrypted blob packs in off-site bucket; maintains immutable snapshot tree', badge: 'Cloud Target', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Deduplication', simple: 'A technology that ensures that if 100 files have identical data, it only stores one copy, saving 90% disk space.', technical: 'Storing unique content chunks once and referencing them across multiple snapshots.' },
        { term: '3-2-1 Rule', simple: 'The universal backup rule: 3 copies of data, 2 different storage types, 1 copy off-site.', technical: 'Industry standard data protection architecture for business continuity.' }
      ],
      syntaxCode: 'restic backup /var/data',
      syntaxTokens: [
        { token: 'restic', role: 'command', explanation: 'Fast, secure, efficient backup program' },
        { token: 'backup', role: 'argument', explanation: 'Create a new snapshot of specified directories' },
        { token: '/var/data', role: 'path', explanation: 'Target directory to scan, deduplicate, and back up' }
      ],
      variations: [
        { command: 'restic snapshots', description: 'List all existing point-in-time backup snapshots in the repository' },
        { command: 'restic restore latest --target /restore/dir', description: 'Restore the most recent snapshot into a target directory' }
      ],
      expectedOutput: 'repository a1b2c3d4 opened (version 2, compression level auto)\n[0:05] 100.00%  12.450 GiB / 12.450 GiB  4210 / 4210 items  0 errors  ETA 0:00\n\nsnapshot 9876fedc saved',
      commonMistakes: [
        { mistake: 'Never testing a restore until disaster strikes', whyWrong: 'You might discover the backup was empty, corrupted, or missing encryption keys when it is too late!', correctWay: 'Automate test restores into an isolated sandbox environment every month.' },
        { mistake: 'Leaving repository encryption passwords in plain text shell scripts', whyWrong: 'Any attacker who reads the script can decrypt and tamper with all your backups.', correctWay: 'Inject the RESTIC_PASSWORD via environment variables from a secure secrets manager.' }
      ],
      safeRecovery: 'To verify repository health and block integrity, run "restic check".'
    }),

    buildLinuxConcept({
      id: 'c-25-10',
      subChapterNumber: '25.10',
      command: 'needrestart -b',
      title: 'System Maintenance',
      topicId: 'ch-25',
      topicNumber: '25',
      topicTitle: 'Linux Administration',
      subtitle: 'Executing patch maintenance windows: kernel livepatching, detecting stale processes with needrestart, and reboots',
      badges: ['Maintenance', 'needrestart', 'Patching', 'SRE', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Updating packages is only half the job: the security patch does not protect you until the process is restarted.',
      whatIsIt: 'System maintenance execution ensures applied security updates actually take effect in running processes. When shared C libraries (`openssl`, `glibc`, `systemd`) or kernel packages are updated, processes running in memory continue executing the OLD, vulnerable code mapped in their virtual address space. `needrestart` inspects running processes, comparing in-memory mapped libraries against updated on-disk binaries, reporting: 1) Which services need restarting; 2) Whether the Linux kernel was upgraded and requires a system reboot; 3) Whether CPU microcode updates are pending.',
      inSimpleWords: 'Making sure updates actually take effect. When you update software, the old version is still running in RAM. "needrestart" tells you which services need to be restarted to use the new security fix.',
      whyDoYouNeedIt: 'Organizations falsely believe they are protected after running `apt upgrade`. If Nginx has been running for 6 months, an OpenSSL update does NOT protect Nginx until Nginx is restarted.',
      realWorldScenario: 'An administrator updates OpenSSL to patch a critical zero-day exploit. Running `needrestart -b` flags that `nginx`, `sshd`, and `postfix` are all still running the old vulnerable libssl library in RAM. The administrator restarts the services, locking in the security patch immediately.',
      realWorldAnalogy: 'Buying replacement filters for your home air purifier: buying the filters does nothing to clean the air until you actually open the machine and install them.',
      withoutVsWith: {
        without: {
          title: 'False Sense of Security After Upgrades',
          items: ['Running "apt upgrade" but leaving vulnerable libraries active in RAM for months', 'Unaware of which specific services need restarting after package updates', 'Unexpected reboots during business hours due to uncoordinated kernel updates'],
          outcome: 'Vulnerabilities persist in memory despite being marked patched.'
        },
        with: {
          title: 'Structured Maintenance Window Verification',
          items: ['Instant detection of stale in-memory libraries using needrestart', 'Automated restarting of unprivileged services via batch mode (-b)', 'Clear notification when a true kernel reboot is mandatory'],
          outcome: '100% verified security patch deployment across all running processes.'
        }
      },
      blockDiagram: {
        title: 'needrestart Detection Mechanism',
        subtitle: 'How needrestart detects stale in-memory libraries:',
        nodes: [
          { id: 'maps', label: '1. Scan /proc/[pid]/maps', simpleDef: 'Memory Mappings', techDef: 'Reads memory-mapped files and shared object (.so) libraries for all active processes', badge: 'Process RAM', color: '#10b981' },
          { id: 'disk', label: '2. Compare with On-Disk Inodes', simpleDef: 'File Inode Comparison', techDef: 'Detects mapped files marked "(deleted)" indicating package manager replaced the on-disk file', badge: 'Inode Check', color: '#ef4444' },
          { id: 'verdict', label: '3. Service Restart Queue', simpleDef: 'Restart Recommendation', techDef: 'Identifies systemd units needing restart (systemctl restart <unit>) or flags kernel reboot', badge: 'Action List', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'Stale Library Mapping', simple: 'When a program is still running an old version of code in RAM even though a new version was installed on disk.', technical: 'Process maintaining open memory mapping to an unlinked inode replaced by package manager.' },
        { term: 'needrestart -b', simple: 'Batch mode: runs the check automatically without popping up interactive blue menus.', technical: 'Non-interactive batch mode outputting status codes for scripts and automation.' }
      ],
      syntaxCode: 'needrestart -b',
      syntaxTokens: [
        { token: 'needrestart', role: 'command', explanation: 'Check which daemons should be restarted after library updates' },
        { token: '-b', role: 'flag', explanation: 'Batch mode: non-interactive execution suitable for scripts and automation' }
      ],
      variations: [
        { command: 'sudo needrestart -u NeedRestart::UI::stdio', description: 'Run needrestart using standard terminal text output rather than full-screen dialogs' },
        { command: '[ -f /var/run/reboot-required ] && cat /var/run/reboot-required.pkgs', description: 'List packages that triggered a mandatory reboot notification on Ubuntu/Debian' }
      ],
      expectedOutput: 'Scanning processes...\nScanning candidates...\nScanning processor microcode...\nScanning linux images...\n\nRunning processes: 185\nKernel status: NEEDRESTART_KSTAT_REBOOT: 1 (kernel upgrade pending)\nServices to be restarted:\n  systemctl restart nginx.service\n  systemctl restart cron.service',
      commonMistakes: [
        { mistake: 'Assuming updating a package updates running processes automatically', whyWrong: 'Linux processes keep their old code in RAM until restarted!', correctWay: 'Always restart the affected service or run "needrestart" after updates.' },
        { mistake: 'Rebooting the entire server when only one unprivileged service needed restarting', whyWrong: 'Causes unnecessary system-wide downtime for all customers and services.', correctWay: 'Restart only the specific flagged service (e.g. systemctl restart nginx).' }
      ],
      safeRecovery: 'To check if a server reboot is strictly required after updates, run "[ -f /var/run/reboot-required ] && echo \'Reboot needed\' || echo \'No reboot needed\'".'
    })
  ]
};
