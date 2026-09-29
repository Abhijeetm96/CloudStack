import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 09: USERS AND GROUPS (09.1 to 09.17)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_09: LinuxTopic = {
  id: 'ch-09',
  number: '09',
  title: 'Users and Groups',
  iconName: 'Users',
  description: 'Manage users, groups, UIDs, GIDs, security databases (/etc/passwd, /etc/shadow), and account lifecycles.',
  concepts: [
    buildLinuxConcept({
      id: 'c-09-01',
      subChapterNumber: '09.1',
      command: 'id',
      title: 'Linux Users',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'The multi-user security boundary: User IDs (UIDs), usernames, and process credentials',
      badges: ['Users', 'Security', 'Core'],
      difficulty: 'Beginner',
      quote: 'Linux is a multi-user operating system: every process, file, and socket has an owner.',
      whatIsIt: 'Linux is fundamentally a multi-user, multi-tenant operating system. Every entity on the system is associated with a numeric User Identifier (UID). Processes execute with the effective credentials of the user who launched them, determining what files they can read, what ports they can bind, and which kernel system calls they can invoke.',
      inSimpleWords: 'Just like every citizen in a country has an ID number, every user on a Linux system has a number called a UID. Even system services like Nginx or PostgreSQL have their own user accounts so they cannot touch each other\'s files.',
      whyDoYouNeedIt: 'User isolation is the primary defense preventing compromised applications from taking over the entire operating system.',
      realWorldScenario: 'An attacker finds a security bug in your web application. Because Nginx runs as unprivileged user "www-data" (UID 33), the attacker cannot read /etc/shadow or modify system binaries in /usr/bin.',
      realWorldAnalogy: 'Separate employee keycards in an office building. The receptionist\'s card cannot open the server room vault door.',
      withoutVsWith: {
        without: {
          title: 'Single-User Architecture',
          items: ['Every software process runs with full machine privileges', 'One bug in a web app gives total control over the hard drive', 'No accountability: cannot tell who created or modified files'],
          outcome: 'Zero security boundaries, instant catastrophic system compromise.'
        },
        with: {
          title: 'Linux Multi-User Model',
          items: ['Strict separation of privileges between users, daemons, and superuser', 'Process credentials sandboxed by Linux kernel access control', 'Full auditability tracking user actions in logs'],
          outcome: 'Multi-tenant security, least-privilege containment, and forensic accountability.'
        }
      },
      blockDiagram: {
        title: 'Linux User Credential Architecture',
        subtitle: 'Process credential validation against filesystem inodes:',
        nodes: [
          { id: 'user', label: 'User Account (UID)', simpleDef: 'Numeric identity in /etc/passwd', techDef: 'struct cred { uid_t uid, gid_t gid }', badge: 'Identity', color: '#38bdf8' },
          { id: 'proc', label: 'Running Process', simpleDef: 'Executes with user\'s active UID/GID', techDef: 'task_struct->cred in kernel memory', badge: 'Process', color: '#a855f7' },
          { id: 'inode', label: 'Filesystem Inode', simpleDef: 'Target file with owner UID and mode bits', techDef: 'inode->i_uid and inode->i_mode (rwx)', badge: 'VFS Inode', color: '#10b981' },
          { id: 'vfs', label: 'VFS Permission Check', simpleDef: 'Compares process UID with inode UID', techDef: 'generic_permission() returning 0 or -EACCES', badge: 'Decision', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'UID (User ID)', simple: 'The unique integer assigned to every Linux user account.', technical: '32-bit unsigned integer (uid_t) stored in kernel credential structures.' },
        { term: 'id command', simple: 'Displays your current username, UID, GID, and group memberships.', technical: 'Utility invoking getuid(), getgid(), and getgroups() system calls.' }
      ],
      syntaxCode: 'id [USERNAME]',
      syntaxTokens: [
        { token: 'id', role: 'command', explanation: 'Print real and effective user and group IDs' },
        { token: '[USERNAME]', role: 'argument', explanation: 'Optional username to query (defaults to current user)' }
      ],
      variations: [
        { syntax: 'whoami', title: 'Print Username Only', whatItDoes: 'Outputs the effective username string', whenToUse: 'Quick privilege check in scripts' },
        { syntax: 'id -u', title: 'Print UID Integer Only', whatItDoes: 'Outputs numeric UID (e.g. 0 for root or 1000 for regular user)', whenToUse: 'Inside scripts: [[ $(id -u) -eq 0 ]] to check root' }
      ],
      beforeAfter: {
        before: '$ id\n[Querying active process credentials...]',
        after: 'uid=1000(ubuntu) gid=1000(ubuntu) groups=1000(ubuntu),4(adm),27(sudo)',
        explanation: 'Displays user UID 1000, primary group 1000, and secondary memberships including sudo.'
      },
      expectedOutput: 'uid=1000(ubuntu) gid=1000(ubuntu) groups=1000(ubuntu),27(sudo)',
      whatChanges: ['Queries kernel process credentials.'],
      whatDoesNotChange: ['System remains unaltered.'],
      safeRecovery: '100% safe read-only inspection.',
      commonMistakes: [
        { mistake: 'Assuming Linux tracks users by their human usernames', whyItHappens: 'Humans read text names.', howToFix: 'The kernel does NOT care about usernames; it strictly tracks the integer UID. The name is just a mapping in /etc/passwd.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-02',
      subChapterNumber: '09.2',
      command: 'sudo -i',
      title: 'root User',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'The all-powerful superuser: UID 0, omnipotent permissions, and zero permission checks',
      badges: ['Root', 'UID0', 'Security'],
      difficulty: 'Beginner',
      quote: 'The root user does not have permission to do everything; the kernel simply skips permission checks for UID 0.',
      whatIsIt: 'The root account is the system administrator (superuser) in Unix-like systems, always assigned UID 0. The Linux kernel contains explicit hardcoded bypasses: whenever a process with effective UID 0 requests file access or hardware operations, standard POSIX permission checks are bypassed. Root can read/write any file, kill any process, mount filesystems, and configure network interfaces.',
      inSimpleWords: 'Root is the "God mode" user account of Linux. When you are root, Linux never asks "Are you allowed to do this?". It assumes you know what you are doing, even if you tell it to delete the operating system.',
      whyDoYouNeedIt: 'System administration (installing software, configuring networks, creating users, modifying kernel tuneables) requires superuser authority.',
      realWorldScenario: 'An administrator needs to install security patches: "apt update && apt upgrade". Normal users cannot modify /usr/bin or /lib. The administrator elevates privileges via "sudo" to execute the update as UID 0.',
      realWorldAnalogy: 'The master key held by the building superintendent that unlocks every lock, breaker box, and utility room in the complex.',
      terms: [
        { term: 'UID 0', simple: 'The special numeric ID that marks the root superuser.', technical: 'The numeric threshold checked by kernel capable() checks and CAP_SYS_ADMIN.' },
        { term: 'Principle of Least Privilege', simple: 'Only using root permissions when absolutely necessary.', technical: 'Security model dictating processes execute with minimum privileges needed to perform their function.' }
      ],
      syntaxCode: 'sudo [COMMAND]',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute a command as superuser (UID 0)' },
        { token: '-i', role: 'flag', explanation: 'Simulate full login shell as root with root environment' }
      ],
      variations: [
        { syntax: 'sudo whoami', title: 'Verify Root Escalation', whatItDoes: 'Returns "root"', whenToUse: 'Verifying sudo privileges' },
        { syntax: 'su -', title: 'Switch to Root Directly', whatItDoes: 'Prompts for root account password and switches shell to root', whenToUse: 'On distributions where root password is enabled (Debian/RHEL)' }
      ],
      beforeAfter: {
        before: '$ cat /etc/shadow\ncat: /etc/shadow: Permission denied\n$ sudo cat /etc/shadow | head -n 1',
        after: 'root:$6$rounds=656000$8x...:19800:0:99999:7:::',
        explanation: 'Elevating to root (UID 0) bypassed file permissions to read the encrypted password database.'
      },
      expectedOutput: 'root',
      whatChanges: ['Executes command with effective UID 0 (root).'],
      whatDoesNotChange: ['Your regular user account remains unprivileged.'],
      safeRecovery: 'Never stay logged in as root for everyday work. Type "exit" to leave root shells immediately.',
      commonMistakes: [
        { mistake: 'Logging in as root over SSH or running everyday web browsers as root', whyItHappens: 'Laziness to avoid typing sudo.', howToFix: 'Never enable direct root SSH login; always log in as a normal user and use sudo for specific tasks.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-03',
      subChapterNumber: '09.3',
      command: 'grep -E "^[^:]+:[^:]+:[1-9][0-9]{3}:" /etc/passwd',
      title: 'Normal Users',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Standard interactive user accounts assigned UIDs >= 1000 with bounded privileges',
      badges: ['Users', 'Security', 'Core'],
      difficulty: 'Beginner',
      quote: 'Normal users live in /home and are confined to their sandbox: they cannot harm the operating system.',
      whatIsIt: 'Normal Users are human interactive accounts created on the system (e.g. alice, bob, ubuntu). In modern Linux distributions (Debian, Ubuntu, Red Hat), normal user UIDs start at 1000 (or 500 in older distros) up to 60000. They have their own home directory in /home/username, their own primary group, and can only modify their own files.',
      inSimpleWords: 'A normal user is like a guest in a hotel. You have the key to your own room (/home/user). You can rearrange the furniture in your room, but you cannot repaint the hotel lobby or break into other guests\' rooms.',
      whyDoYouNeedIt: 'Restricting everyday development and browsing to normal user accounts ensures that accidental command typos or downloaded malware cannot destroy the host operating system.',
      realWorldScenario: 'You are adding a new developer "priya" to an engineering server. You create a normal user account with UID 1001. Priya can clone repositories, run Python code, and install local tools in /home/priya without risking server stability.',
      realWorldAnalogy: 'A tenant renting an apartment. You can hang pictures on your walls, but you cannot shut off the building\'s main water valve.',
      terms: [
        { term: 'UID Range >= 1000', simple: 'The numeric range reserved for human accounts.', technical: 'UID_MIN and UID_MAX thresholds configured in /etc/login.defs.' },
        { term: 'System User (UID 1-999)', simple: 'Accounts created for daemon services (www-data, postgres, redis).', technical: 'Unprivileged accounts with nologin shells created for background service isolation.' }
      ],
      syntaxCode: 'id [USERNAME]',
      syntaxTokens: [
        { token: 'id', role: 'command', explanation: 'Query user identity' },
        { token: 'ubuntu', role: 'argument', explanation: 'Target normal user account name' }
      ],
      variations: [
        { syntax: 'cat /etc/login.defs | grep UID_MIN', title: 'Inspect User UID Boundary', whatItDoes: 'Shows UID_MIN (typically 1000) for normal accounts', whenToUse: 'When verifying distro account policies' }
      ],
      beforeAfter: {
        before: '$ id priya\n[Querying user database...]',
        after: 'uid=1001(priya) gid=1001(priya) groups=1001(priya),100(users)',
        explanation: 'Confirms priya is configured as a standard normal user with UID 1001.'
      },
      expectedOutput: 'uid=1001(priya)',
      whatChanges: ['Reads account database.'],
      whatDoesNotChange: ['Accounts remain intact.'],
      safeRecovery: 'Read-only query.',
      commonMistakes: [
        { mistake: 'Giving every developer the root password instead of creating separate normal user accounts', whyItHappens: 'Poor security hygiene.', howToFix: 'Always create unique normal user accounts and grant granular sudo access in /etc/sudoers.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-04',
      subChapterNumber: '09.4',
      command: 'cat /etc/passwd | head -n 5',
      title: '/etc/passwd',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'The world-readable 7-field colon-separated user account registry database',
      badges: ['Users', 'Passwd', 'Core'],
      difficulty: 'Beginner',
      quote: '/etc/passwd is world-readable text: every user and process can see what accounts exist.',
      whatIsIt: '/etc/passwd is the fundamental user account database of Linux. Each line describes one user account across 7 standardized colon-separated fields: 1. Username, 2. Password placeholder ("x" meaning shadow password), 3. User ID (UID), 4. Primary Group ID (GID), 5. Comment/GECOS (User Full Name), 6. Home Directory Path ($HOME), and 7. Default Login Shell ($SHELL).',
      inSimpleWords: 'Think of /etc/passwd as the employee directory in the building lobby. It lists every account on the computer, their ID number, where their desk is (/home), and what language they speak (/bin/bash). Passwords are NOT stored here.',
      whyDoYouNeedIt: 'System commands (ls, id, ps) read /etc/passwd to translate numeric UIDs into human-readable usernames.',
      realWorldScenario: 'You are locking out a terminated employee\'s account. You edit their shell in /etc/passwd, changing field 7 from "/bin/bash" to "/usr/sbin/nologin". Even if they have valid SSH keys, Linux immediately rejects login attempts.',
      realWorldAnalogy: 'The publicly visible employee directory on an office wall listing name, employee ID, and desk number.',
      terms: [
        { term: 'Field 2 ("x")', simple: 'The letter x indicating the password is encrypted inside /etc/shadow.', technical: 'Historical password field; replaced by "x" in 1980s shadow password migration to hide hashes.' },
        { term: '/usr/sbin/nologin', simple: 'A dummy shell that politely prints a refusal message and closes connection.', technical: 'Polite reject shell returning message from /etc/nologin.txt and exiting non-zero.' }
      ],
      syntaxCode: 'cat /etc/passwd',
      syntaxTokens: [
        { token: 'cat', role: 'command', explanation: 'Read file contents' },
        { token: '/etc/passwd', role: 'path', explanation: 'Standard POSIX user database file' }
      ],
      variations: [
        { syntax: 'getent passwd username', title: 'NSS Passwd Query', whatItDoes: 'Queries passwd using Name Service Switch (supports LDAP/AD)', whenToUse: 'In enterprise corporate networks' },
        { syntax: 'cut -d: -f1,3,6 /etc/passwd', title: 'Extract User ID & Home', whatItDoes: 'Slices username, UID, and home directory fields', whenToUse: 'Quick user audit' }
      ],
      beforeAfter: {
        before: '$ head -n 1 /etc/passwd\n[Reading first account record...]',
        after: 'root:x:0:0:root:/root:/bin/bash',
        explanation: 'Field 1=root, 2=x (shadow), 3=UID 0, 4=GID 0, 5=comment, 6=/root, 7=/bin/bash.'
      },
      expectedOutput: 'root:x:0:0:root:/root:/bin/bash',
      whatChanges: ['Reads public text file.'],
      whatDoesNotChange: ['Accounts remain unaltered.'],
      safeRecovery: 'Never edit /etc/passwd directly with regular text editors; use "sudo vipw" to prevent file corruption.',
      commonMistakes: [
        { mistake: 'Thinking /etc/passwd stores passwords because of its name', whyItHappens: 'Historically it did in 1975, but passwords moved to /etc/shadow decades ago.', howToFix: 'Remember: /etc/passwd is public; encrypted hashes live in /etc/shadow.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-05',
      subChapterNumber: '09.5',
      command: 'sudo head -n 5 /etc/shadow',
      title: '/etc/shadow',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'The restricted-permission (0640/0000) vault housing salted cryptographic password hashes and aging policies',
      badges: ['Security', 'Shadow', 'Passwords'],
      difficulty: 'Intermediate',
      quote: 'Only root can read /etc/shadow; here lie the salted SHA-512 and yescrypt password hashes.',
      whatIsIt: '/etc/shadow is the secured companion database to /etc/passwd. It is readable ONLY by root (permissions 0640 or 0000) and contains the salted cryptographic hashes of user passwords, along with password aging policies across 9 colon-separated fields: 1. Username, 2. Password Hash (e.g. $6$ = SHA-512, $y$ = yescrypt), 3. Last password change date, 4. Min days between changes, 5. Max days before expiration, 6. Warning days, 7. Inactivity days, 8. Account expiration date, 9. Reserved.',
      inSimpleWords: 'If /etc/passwd is the public employee directory in the lobby, /etc/shadow is the armored bank vault in the basement locked with retinal scanners. It stores the secret scrambled password hashes and expiration dates.',
      whyDoYouNeedIt: 'If password hashes were in /etc/passwd, any unprivileged user could copy them and crack them offline with tools like John the Ripper. /etc/shadow prevents unprivileged access entirely.',
      realWorldScenario: 'A compliance audit requires that all developer passwords expire every 90 days. You inspect /etc/shadow to verify that Field 5 is set to "90" for all human accounts, enforcing password rotation.',
      realWorldAnalogy: 'The biometric security vault storing bank account master keys.',
      terms: [
        { term: 'Salted Hash', simple: 'A cryptographic hash scrambled with random bytes to thwart rainbow tables.', technical: 'Cryptographic hash (yescrypt/sha512crypt) combining password + 16 random salt characters.' },
        { term: 'Locked Account (! or *)', simple: 'An exclamation mark in field 2 disables password login.', technical: 'Prepending "!" or "*" renders the hash string invalid, preventing PAM password validation.' }
      ],
      syntaxCode: 'sudo cat /etc/shadow',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with root privileges' },
        { token: 'cat', role: 'command', explanation: 'Read file contents' },
        { token: '/etc/shadow', role: 'path', explanation: 'Restricted password shadow database' }
      ],
      variations: [
        { syntax: 'sudo chage -l username', title: 'Inspect Password Expiry', whatItDoes: 'Translates /etc/shadow aging fields into human-readable expiration dates', whenToUse: 'Checking account expiration' }
      ],
      beforeAfter: {
        before: '$ cat /etc/shadow\ncat: /etc/shadow: Permission denied\n$ sudo head -n 1 /etc/shadow',
        after: 'root:$6$rounds=656000$salt$hash...:19800:0:99999:7:::',
        explanation: 'Displays salted SHA-512 ($6$) password hash and password aging parameters.'
      },
      expectedOutput: 'root:$6$...:19800:0:99999:7:::',
      whatChanges: ['Reads secure shadow file with root privileges.'],
      whatDoesNotChange: ['Password hashes remain untouched.'],
      safeRecovery: 'Never edit /etc/shadow manually; use "passwd" or "chage" commands.',
      commonMistakes: [
        { mistake: 'Changing permissions on /etc/shadow to 644 or 777 to fix a permission error', whyItHappens: 'Severe security mistake exposing all password hashes to every user and process!', howToFix: 'Keep permissions strictly 0640 (root:shadow) or 0000.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-06',
      subChapterNumber: '09.6',
      command: 'cat /etc/group | head -n 10',
      title: '/etc/group',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'The world-readable group registry mapping group names, GIDs, and supplementary member lists',
      badges: ['Groups', 'Security', 'Core'],
      difficulty: 'Beginner',
      quote: '/etc/group maps collections of users together so permissions can be granted to teams at once.',
      whatIsIt: '/etc/group is the standard database defining group identities. Each line contains 4 colon-separated fields: 1. Group Name, 2. Group Password placeholder ("x"), 3. Group ID (GID), and 4. Comma-separated list of secondary member usernames (e.g. "sudo:x:27:ubuntu,priya").',
      inSimpleWords: 'Instead of granting permissions to 50 employees one by one, you create a Group called "engineers". You give the folder to the group, and add the employees to /etc/group.',
      whyDoYouNeedIt: 'You need /etc/group to check which users have superuser sudo rights (member of "sudo" or "wheel" group), docker execution rights ("docker" group), or access to shared project folders.',
      realWorldScenario: 'A developer cannot run Docker commands without sudo ("permission denied on /var/run/docker.sock"). You check /etc/group and notice their username is missing from the "docker" group. Adding them solves it.',
      realWorldAnalogy: 'Department rosters in an organization: Accounting, Engineering, Legal, Human Resources.',
      terms: [
        { term: 'GID (Group ID)', simple: 'The unique integer assigned to a group.', technical: '32-bit unsigned integer (gid_t) recorded in file inodes and process credential lists.' }
      ],
      syntaxCode: 'cat /etc/group',
      syntaxTokens: [
        { token: 'cat', role: 'command', explanation: 'Read file contents' },
        { token: '/etc/group', role: 'path', explanation: 'Group database file' }
      ],
      variations: [
        { syntax: 'grep "sudo" /etc/group', title: 'Find Sudoers Group Members', whatItDoes: 'Lists all users with sudo group membership', whenToUse: 'Auditing admin accounts' },
        { syntax: 'getent group docker', title: 'Query Group via NSS', whatItDoes: 'Queries group entry across local and directory services', whenToUse: 'Checking docker permissions' }
      ],
      beforeAfter: {
        before: '$ grep "^sudo:" /etc/group\n[Reading sudo group entry...]',
        after: 'sudo:x:27:ubuntu,devadmin',
        explanation: 'Field 1=sudo, 2=x, 3=GID 27, 4=members ubuntu and devadmin.'
      },
      expectedOutput: 'sudo:x:27:ubuntu',
      whatChanges: ['Reads group file.'],
      whatDoesNotChange: ['Groups are unmodified.'],
      safeRecovery: '100% safe read-only tool.',
      commonMistakes: [
        { mistake: 'Editing /etc/group with a regular text editor while someone is running useradd', whyItHappens: 'Race condition can corrupt group database.', howToFix: 'Use "sudo vigr" to safely edit groups with atomic file locks.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-07',
      subChapterNumber: '09.7',
      command: 'sudo useradd -m -s /bin/bash priya',
      title: 'useradd',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'The low-level POSIX utility for creating user accounts with explicit flags',
      badges: ['Users', 'Useradd', 'Admin'],
      difficulty: 'Beginner',
      quote: 'useradd is the raw, scriptable command: by default, it creates NO home directory unless you pass -m.',
      whatIsIt: 'useradd is the foundational low-level system utility for creating user accounts. It modifies /etc/passwd, /etc/shadow, and /etc/group directly. Unlike adduser (which is an interactive Perl script on Debian), useradd is completely non-interactive and designed for automated shell scripts and Ansible automation.',
      inSimpleWords: 'Typing "useradd -m -s /bin/bash username" creates a new user, gives them a home folder (-m), and sets their shell to Bash (-s). It is the command automation scripts use.',
      whyDoYouNeedIt: 'In DevOps automation (Dockerfiles, cloud-init scripts, CI/CD provisioning), you cannot use interactive prompts. useradd creates accounts deterministically with explicit flags.',
      realWorldScenario: 'You are writing an automated server provisioning script. You need to create an application user named "deploy" with a home folder and bash shell. You run: "sudo useradd -m -s /bin/bash -u 1050 deploy". The user is created in 10 milliseconds with zero prompts.',
      realWorldAnalogy: 'Filling out an automated electronic employee onboarding web form.',
      terms: [
        { term: 'Home Directory Flag (-m)', simple: 'Tells useradd to actually create the /home/username folder.', technical: 'Copies default skeleton dotfiles from /etc/skel into newly created /home/user inode.' },
        { term: 'Shell Flag (-s)', simple: 'Specifies the default login shell path.', technical: 'Sets field 7 in /etc/passwd to designated interpreter.' }
      ],
      syntaxCode: 'sudo useradd [OPTIONS] USERNAME',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Run with root privileges' },
        { token: 'useradd', role: 'command', explanation: 'Low-level user creation utility' },
        { token: '-m', role: 'flag', explanation: 'Create the user\'s home directory' },
        { token: '-s /bin/bash', role: 'flag', explanation: 'Set login shell to /bin/bash' },
        { token: 'priya', role: 'argument', explanation: 'New username to create' }
      ],
      variations: [
        { syntax: 'sudo useradd -r -s /usr/sbin/nologin nginx', title: 'Create System Service User', whatItDoes: 'Creates a system account (-r) with UID < 1000 and no login shell', whenToUse: 'When setting up daemon services' },
        { syntax: 'sudo useradd -m -G sudo,docker devuser', title: 'Create User with Groups', whatItDoes: 'Adds user to supplementary sudo and docker groups immediately', whenToUse: 'Provisioning admin accounts' }
      ],
      beforeAfter: {
        before: '$ id priya\nid: \'priya\': no such user\n$ sudo useradd -m -s /bin/bash priya',
        after: '$ id priya\nuid=1001(priya) gid=1001(priya) groups=1001(priya)',
        explanation: 'Allocated new UID 1001, primary group 1001, and initialized /home/priya.'
      },
      expectedOutput: '[User created in /etc/passwd and /etc/shadow]',
      whatChanges: ['Appends records to /etc/passwd and /etc/shadow. Creates /home/username directory.'],
      whatDoesNotChange: ['Existing accounts are untouched.'],
      safeRecovery: 'If you created a user with wrong settings, modify with "usermod" or delete with "userdel -r".',
      commonMistakes: [
        { mistake: 'Running "useradd username" without the "-m" flag', whyItHappens: 'Forgetting that useradd does NOT create a home directory by default!', howToFix: 'Always include "-m": "useradd -m -s /bin/bash username".' },
        { mistake: 'Forgetting to set a password after useradd', whyItHappens: 'useradd creates locked accounts by default.', howToFix: 'Run "sudo passwd username" immediately after creating the account.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-08',
      subChapterNumber: '09.8',
      command: 'sudo adduser devops',
      title: 'adduser',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'The interactive, user-friendly high-level wrapper script (Debian/Ubuntu)',
      badges: ['Users', 'Adduser', 'Interactive'],
      difficulty: 'Beginner',
      quote: 'adduser is the friendly interactive guide: it asks for passwords, names, and sets up home folders automatically.',
      whatIsIt: 'adduser is a high-level, interactive Perl wrapper around useradd (standard on Debian and Ubuntu). Unlike low-level useradd, adduser automatically creates a home directory, copies skeleton dotfiles from /etc/skel, prompts for a password immediately, and asks for user metadata (Full Name, Room Number, Phone).',
      inSimpleWords: 'If you are manually sitting at a keyboard adding a new human employee to an Ubuntu server, use "adduser". It guides you step-by-step with friendly questions.',
      whyDoYouNeedIt: 'It eliminates human error when creating accounts interactively, ensuring passwords and home folders are never forgotten.',
      realWorldScenario: 'You are on an onboarding call with a new engineer. You type "sudo adduser alex". The system asks for a password, confirms it, sets up /home/alex, and asks for Alex\'s full name. Done in 15 seconds.',
      realWorldAnalogy: 'A guided wizard onboarding questionnaire versus a raw blank command line.',
      terms: [
        { term: '/etc/skel', simple: 'The template folder containing default dotfiles (.bashrc, .profile) copied to new users.', technical: 'Skeleton directory structure duplicated into new user home directories during account creation.' }
      ],
      syntaxCode: 'sudo adduser [USERNAME]',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Root privileges' },
        { token: 'adduser', role: 'command', explanation: 'Friendly interactive account creator' },
        { token: 'devops', role: 'argument', explanation: 'New username' }
      ],
      variations: [
        { syntax: 'sudo adduser username sudo', title: 'Add User to Sudo Group', whatItDoes: 'Convenient syntax to append an existing user to the sudo group', whenToUse: 'Granting admin rights on Ubuntu' }
      ],
      beforeAfter: {
        before: '$ sudo adduser alex\n[Prompts: New password, Retype password, Full Name...]',
        after: 'Adding user `alex\' ...\nAdding new group `alex\' (1002) ...\nCreating home directory `/home/alex\' ...\nCopying files from `/etc/skel\' ...',
        explanation: 'Interactive wizard automatically handled home folder, skeleton files, and password hashing.'
      },
      expectedOutput: 'Adding user alex... Done.',
      whatChanges: ['Creates user, password hash, home directory, and group.'],
      whatDoesNotChange: ['Existing system accounts are untouched.'],
      safeRecovery: 'Delete with "sudo deluser --remove-home username".',
      commonMistakes: [
        { mistake: 'Using "adduser" inside non-interactive Dockerfiles or automated scripts', whyItHappens: 'adduser pauses waiting for human keyboard input, freezing the build!', howToFix: 'Use "useradd" with flags in automated scripts and Dockerfiles.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-09',
      subChapterNumber: '09.9',
      command: 'sudo usermod -aG sudo,docker ubuntu',
      title: 'usermod',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Modify existing user attributes: append groups (-aG), change shell (-s), or lock accounts (-L)',
      badges: ['Users', 'Usermod', 'Admin'],
      difficulty: 'Beginner',
      quote: 'ALWAYS include -a when adding groups with usermod -G; omitting -a wipes out all other groups!',
      whatIsIt: 'usermod ("User Modify") modifies existing account attributes in /etc/passwd, /etc/shadow, and /etc/group. Common operations include changing the default shell (-s), changing home directory location (-d -m), locking accounts (-L), unlocking accounts (-U), and appending supplementary groups (-aG).',
      inSimpleWords: 'Think of usermod as the account editor. Want to make a user an administrator? Add them to the sudo group with "usermod -aG sudo username". Want to temporarily lock an account? Run "usermod -L username".',
      whyDoYouNeedIt: 'You need usermod to grant permissions (adding users to docker, sudo, or kvm groups), update login shells, and lock accounts during security investigations.',
      realWorldScenario: 'A developer needs access to run Docker containers. You execute: "sudo usermod -aG docker devuser". The user logs out, logs back in, and can now launch Docker containers without sudo.',
      realWorldAnalogy: 'Updating an employee badge profile: giving them access to the executive floor and parking garage.',
      terms: [
        { term: 'Append Flag (-a)', simple: 'CRITICAL flag that adds a group without removing existing groups.', technical: 'Ensures the supplementary group list specified in -G is appended to existing groups rather than replacing them.' },
        { term: 'Account Lock (-L)', simple: 'Locks a user account so they cannot log in with a password.', technical: 'Prepends an exclamation mark (!) to the encrypted password hash in /etc/shadow.' }
      ],
      syntaxCode: 'sudo usermod [OPTIONS] USERNAME',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Root privileges' },
        { token: 'usermod', role: 'command', explanation: 'Modify a user account' },
        { token: '-aG sudo,docker', role: 'flag', explanation: 'Append (-a) to Groups (-G) sudo and docker' },
        { token: 'ubuntu', role: 'argument', explanation: 'Target user' }
      ],
      variations: [
        { syntax: 'sudo usermod -s /bin/zsh username', title: 'Change User Shell', whatItDoes: 'Changes default login shell to zsh in /etc/passwd', whenToUse: 'Customizing user shell environment' },
        { syntax: 'sudo usermod -L username', title: 'Lock User Account', whatItDoes: 'Disables password login for account', whenToUse: 'Suspended employee accounts' }
      ],
      beforeAfter: {
        before: '$ id devuser\nuid=1001(devuser) gid=1001(devuser) groups=1001(devuser)\n$ sudo usermod -aG docker devuser',
        after: '$ id devuser\nuid=1001(devuser) gid=1001(devuser) groups=1001(devuser),998(docker)',
        explanation: 'User was successfully appended to the docker group without losing existing memberships.'
      },
      expectedOutput: '[User attributes updated in /etc/group or /etc/passwd]',
      whatChanges: ['Modifies group membership or account fields.'],
      whatDoesNotChange: ['User files are untouched.'],
      safeRecovery: 'If you accidentally ran "usermod -G group" without -a and stripped a user\'s groups, add them back immediately with "sudo usermod -aG missing_group user".',
      commonMistakes: [
        { mistake: 'Running "usermod -G group user" WITHOUT the "-a" append flag', whyItHappens: 'OMITTING -a SILENTLY REMOVES THE USER FROM ALL OTHER GROUPS! If they were in sudo, they lose admin rights!', howToFix: 'ALWAYS type "-aG" together: "usermod -aG group user".' },
        { mistake: 'Expecting new group memberships to apply to existing open terminal windows', whyItHappens: 'Group memberships are assigned during LOGIN time.', howToFix: 'The user must log out and log back in, or run "newgrp groupname" in their current shell.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-10',
      subChapterNumber: '09.10',
      command: 'sudo passwd ubuntu',
      title: 'passwd',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Update user authentication authentication tokens and password aging metadata in /etc/shadow',
      badges: ['Passwords', 'Security', 'Auth'],
      difficulty: 'Beginner',
      quote: 'Running "passwd" without arguments changes your own password; root runs "passwd username" to change anyone\'s.',
      whatIsIt: 'passwd updates user authentication tokens. A regular user running "passwd" must provide their current password before entering a new password verified by PAM quality modules (pam_pwquality). Root running "sudo passwd username" can reset any user\'s password without knowing their old password.',
      inSimpleWords: 'Typing "passwd" lets you change your password. You type your old password once, and your new password twice. Notice that as you type, Linux shows zero asterisks on screen for security.',
      whyDoYouNeedIt: 'You need passwd to set passwords on newly created accounts, rotate compromised credentials, and force password resets.',
      realWorldScenario: 'An engineer forgets their server password. You log in as an administrator and type "sudo passwd engineer". You enter a temporary secure password and type "sudo chage -d 0 engineer" so they are forced to change it on their next login.',
      realWorldAnalogy: 'Changing the combination code on a briefcase or physical padlock.',
      terms: [
        { term: 'Silent Keystrokes', simple: 'Linux does not show asterisks (***) when you type passwords.', technical: 'Terminal echo mode disabled via stty (-echo) to prevent shoulder-surfing password lengths.' },
        { term: 'PAM (Pluggable Authentication Modules)', simple: 'The Linux security framework enforcing password complexity rules.', technical: 'Dynamic security library framework validating passwords against dictionary and length rules.' }
      ],
      syntaxCode: 'passwd [OPTIONS] [USERNAME]',
      syntaxTokens: [
        { token: 'passwd', role: 'command', explanation: 'Change user password' },
        { token: 'ubuntu', role: 'argument', explanation: 'Target username (root only; omitted for self)' }
      ],
      variations: [
        { syntax: 'sudo passwd -e username', title: 'Expire Password Immediately', whatItDoes: 'Forces user to choose a new password upon next login', whenToUse: 'Issuing temporary passwords' },
        { syntax: 'sudo passwd -l username', title: 'Lock Password', whatItDoes: 'Locks account password hash in /etc/shadow', whenToUse: 'Disabling password authentication' }
      ],
      beforeAfter: {
        before: '$ sudo passwd priya\nNew password: [keystrokes hidden]\nRetype new password: [keystrokes hidden]',
        after: 'passwd: password updated successfully',
        explanation: 'Cryptographic hash generated and updated in /etc/shadow.'
      },
      expectedOutput: 'passwd: password updated successfully',
      whatChanges: ['Updates encrypted hash and last-change date in /etc/shadow.'],
      whatDoesNotChange: ['Account settings in /etc/passwd remain unchanged.'],
      safeRecovery: 'If you forget your password, root can reset it with "sudo passwd username".',
      commonMistakes: [
        { mistake: 'Thinking the terminal is frozen because nothing appears when typing passwords', whyItHappens: 'Linux hides all keystrokes for security.', howToFix: 'Just type your password smoothly and press Enter.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-11',
      subChapterNumber: '09.11',
      command: 'sudo userdel -r obsolete_user',
      title: 'userdel',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Delete user accounts and safely remove their personal home workspaces and mail spools',
      badges: ['Users', 'Delete', 'Admin'],
      difficulty: 'Beginner',
      quote: 'Always use userdel -r to delete the user\'s home directory, or you leave orphan files behind.',
      whatIsIt: 'userdel removes a user account from /etc/passwd, /etc/shadow, and /etc/group. By default, it deletes only the account record, leaving the user\'s files and /home/username directory behind. Adding the "-r" ("remove") flag instructs userdel to recursively delete the user\'s home directory and mail spool.',
      inSimpleWords: 'Typing "userdel -r username" completely deletes the user from the system and removes their personal files from /home.',
      whyDoYouNeedIt: 'When offboarding employees or cleaning up temporary service accounts, userdel terminates access and cleans up storage.',
      realWorldScenario: 'An intern finishes their summer contract. You archive their project data to backup storage and run: "sudo userdel -r intern". The account is wiped from security databases and their /home directory is reclaimed.',
      realWorldAnalogy: 'Clearing an employee\'s credentials from the company keycard database and packing up their desk.',
      terms: [
        { term: 'Orphan Inode', simple: 'A file owned by a UID number whose user account was deleted.', technical: 'File on disk whose st_uid does not map to any active entry in /etc/passwd.' }
      ],
      syntaxCode: 'sudo userdel [OPTIONS] USERNAME',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Root privileges' },
        { token: 'userdel', role: 'command', explanation: 'Delete user account' },
        { token: '-r', role: 'flag', explanation: 'Remove home directory and mail spool' },
        { token: 'obsolete_user', role: 'argument', explanation: 'Username to delete' }
      ],
      variations: [
        { syntax: 'sudo userdel -f username', title: 'Force Deletion', whatItDoes: 'Forces deletion even if the user is currently logged in', whenToUse: 'Emergency account termination' }
      ],
      beforeAfter: {
        before: '$ id olduser\nuid=1005(olduser)...\n$ sudo userdel -r olduser',
        after: '$ id olduser\nid: \'olduser\': no such user',
        explanation: 'Account was removed from /etc/passwd, shadow, and /home/olduser was purged.'
      },
      expectedOutput: '[User and home directory removed]',
      whatChanges: ['Purges lines from /etc/passwd, shadow, and unlinks /home directory.'],
      whatDoesNotChange: ['Files owned by user outside /home remain (as orphan numeric UIDs).'],
      safeRecovery: 'Account deletion cannot be undone. Always take a backup of /home before running userdel -r.',
      commonMistakes: [
        { mistake: 'Running userdel without "-r", leaving orphaned files owned by a bare UID number', whyItHappens: 'If a new user later gets that recycled UID, they inherit ownership of the old user\'s files!', howToFix: 'Always use "userdel -r" or find orphan files with "find / -nouser".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-12',
      subChapterNumber: '09.12',
      command: 'groups ubuntu',
      title: 'Groups',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Organizing users into collective security principals for role-based permission sharing',
      badges: ['Groups', 'Security', 'Core'],
      difficulty: 'Beginner',
      quote: 'Permissions in Linux are granted to User, Group, and Others: Groups are how teams share access.',
      whatIsIt: 'A Group is an administrative entity that groups multiple users together under a single Group ID (GID). In the POSIX file permission matrix (Owner, Group, Others), setting group permissions (e.g. chmod 770) allows all members of that group to collaborate on files without making them readable by the rest of the world.',
      inSimpleWords: 'Think of a group as a department. If Alice, Bob, and Carol belong to the "finance" group, you can give the finance folder read-write access to the "finance" group. All three can work together, while other users are locked out.',
      whyDoYouNeedIt: 'Without groups, you would have to make shared files world-readable (chmod 777), creating catastrophic security vulnerabilities.',
      realWorldScenario: 'Your team has 5 developers who need to edit files in "/var/www/site". You create a group named "webdevs", add all 5 developers to it, and run "sudo chown -R :webdevs /var/www/site" and "sudo chmod -R 775 /var/www/site". All 5 can collaborate seamlessly.',
      realWorldAnalogy: 'A shared Slack channel or email distribution list for a specific team.',
      terms: [
        { term: 'GID (Group Identifier)', simple: 'The numeric ID assigned to the group in /etc/group.', technical: 'Kernel identifier recorded in file inodes (i_gid) and process credential lists.' }
      ],
      syntaxCode: 'groups [USERNAME]',
      syntaxTokens: [
        { token: 'groups', role: 'command', explanation: 'Print group memberships for user' },
        { token: 'ubuntu', role: 'argument', explanation: 'Username to inspect' }
      ],
      variations: [
        { syntax: 'id -Gn', title: 'Group Names Only', whatItDoes: 'Prints space-separated list of group names for active user', whenToUse: 'Script group membership checks' }
      ],
      beforeAfter: {
        before: '$ groups devuser\n[Querying group memberships...]',
        after: 'devuser : devuser sudo docker developers',
        explanation: 'Lists all primary and supplementary groups the user belongs to.'
      },
      expectedOutput: 'ubuntu : ubuntu adm sudo',
      whatChanges: ['Queries in-memory or database group memberships.'],
      whatDoesNotChange: ['System remains intact.'],
      safeRecovery: '100% safe read-only inspection.',
      commonMistakes: [
        { mistake: 'Adding a user to a group and wondering why permissions don\'t work immediately in their active terminal', whyItHappens: 'Shell processes inherit groups at login time; existing shells do not auto-update.', howToFix: 'The user must log out and back in, or run "newgrp groupname".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-13',
      subChapterNumber: '09.13',
      command: 'sudo groupadd developers',
      title: 'groupadd',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Create a new group definition with allocated GID in /etc/group',
      badges: ['Groups', 'Groupadd', 'Admin'],
      difficulty: 'Beginner',
      quote: 'groupadd establishes a new security circle: allocate a team GID in one command.',
      whatIsIt: 'groupadd creates a new group account by allocating the next available Group ID (GID) above GID_MIN (typically 1000) and recording the entry in /etc/group and /etc/gshadow.',
      inSimpleWords: 'Typing "groupadd myteam" creates a brand new group on your server so you can start adding users to it.',
      whyDoYouNeedIt: 'You need groupadd when establishing team permissions, installing software daemons, and setting up collaborative project workspaces.',
      realWorldScenario: 'You are setting up a shared analytics folder. You create a new group: "sudo groupadd analytics". Now you can add data engineers to this group and give them exclusive ownership of the data folders.',
      realWorldAnalogy: 'Creating a new department in the corporate directory.',
      terms: [
        { term: 'GID_MIN', simple: 'The lowest numeric GID assigned to human groups (typically 1000).', technical: 'Configured in /etc/login.defs to separate system groups from user groups.' }
      ],
      syntaxCode: 'sudo groupadd [OPTIONS] GROUPNAME',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Root privileges' },
        { token: 'groupadd', role: 'command', explanation: 'Create new group' },
        { token: 'developers', role: 'argument', explanation: 'Name of the new group' }
      ],
      variations: [
        { syntax: 'sudo groupadd -g 1500 engineers', title: 'Explicit GID Assignment', whatItDoes: 'Assigns exact GID number 1500', whenToUse: 'Matching GIDs across a cluster of servers' },
        { syntax: 'sudo groupadd -r appdaemon', title: 'Create System Group', whatItDoes: 'Allocates GID < 1000 for background daemons', whenToUse: 'System service configuration' }
      ],
      beforeAfter: {
        before: '$ grep "developers" /etc/group\n[Group does not exist]\n$ sudo groupadd developers',
        after: '$ grep "developers" /etc/group\ndevelopers:x:1003:',
        explanation: 'Allocated new GID 1003 and created clean group record in /etc/group.'
      },
      expectedOutput: 'developers:x:1003:',
      whatChanges: ['Appends line to /etc/group and /etc/gshadow.'],
      whatDoesNotChange: ['Existing groups and users are untouched.'],
      safeRecovery: 'Remove accidental groups with "sudo groupdel groupname".',
      commonMistakes: [
        { mistake: 'Trying to create a group that already exists', whyItHappens: 'groupadd returns error code 9: "group already exists".', howToFix: 'Check with "getent group groupname" before creating.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-14',
      subChapterNumber: '09.14',
      command: 'sudo groupmod -n engineering developers',
      title: 'groupmod',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Modify group attributes: rename group names (-n) or change numeric GIDs (-g)',
      badges: ['Groups', 'Groupmod', 'Admin'],
      difficulty: 'Beginner',
      quote: 'groupmod renames groups or changes their numeric GID across system databases.',
      whatIsIt: 'groupmod ("Group Modify") modifies the definition of a specified group in /etc/group. It allows renaming the group name (-n) or changing its numeric GID (-g).',
      inSimpleWords: 'If a department changes its name from "developers" to "engineering", "groupmod -n engineering developers" renames the group without deleting it.',
      whyDoYouNeedIt: 'You need groupmod to align GIDs across servers when mounting shared NFS storage, or during corporate reorganizations.',
      realWorldScenario: 'Two servers share an NFS storage drive. On Server A, "finance" is GID 1002. On Server B, "finance" was created as GID 1005, causing permission errors. You run "sudo groupmod -g 1002 finance" on Server B to synchronize GIDs.',
      realWorldAnalogy: 'Renaming a department sign on the office door.',
      terms: [
        { term: 'GID Synchronization', simple: 'Ensuring group numbers match across all servers in a cluster.', technical: 'Required for shared NFS/CIFS storage permissions to resolve identically.' }
      ],
      syntaxCode: 'sudo groupmod [OPTIONS] GROUP',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Root privileges' },
        { token: 'groupmod', role: 'command', explanation: 'Modify group definition' },
        { token: '-n engineering', role: 'flag', explanation: 'New group name' },
        { token: 'developers', role: 'argument', explanation: 'Old existing group name' }
      ],
      variations: [
        { syntax: 'sudo groupmod -g 1200 team', title: 'Change Numeric GID', whatItDoes: 'Updates GID integer in /etc/group', whenToUse: 'Network storage alignment' }
      ],
      beforeAfter: {
        before: '$ grep "^devs:" /etc/group\ndevs:x:1003:\n$ sudo groupmod -n engineers devs',
        after: '$ grep "^engineers:" /etc/group\nengineers:x:1003:',
        explanation: 'Group name was renamed while preserving identical GID 1003 and member lists.'
      },
      expectedOutput: 'engineers:x:1003:',
      whatChanges: ['Updates group name or GID in /etc/group.'],
      whatDoesNotChange: ['Files owned by the old GID still keep that GID number.'],
      safeRecovery: 'Non-destructive.',
      commonMistakes: [
        { mistake: 'Changing a GID with "groupmod -g" without updating existing files on disk', whyItHappens: 'File inodes store the numeric GID; changing the group definition leaves files orphaned.', howToFix: 'Run "find / -gid old_gid -exec chgrp new_gid {} +" to update disk files.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-15',
      subChapterNumber: '09.15',
      command: 'sudo groupdel obsolete_team',
      title: 'groupdel',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Remove a group definition from the system database',
      badges: ['Groups', 'Delete', 'Admin'],
      difficulty: 'Beginner',
      quote: 'Linux prevents you from deleting a group if it is currently any user\'s primary group.',
      whatIsIt: 'groupdel removes a group entry from /etc/group and /etc/gshadow. Linux enforces safety: you cannot delete a group if it is designated as the Primary Group for any existing user account.',
      inSimpleWords: 'Typing "groupdel groupname" deletes the group. If the group is still being used as someone\'s main group, Linux protects you and refuses to delete it.',
      whyDoYouNeedIt: 'You need groupdel to clean up obsolete security groups when projects or departments are retired.',
      realWorldScenario: 'A temporary vendor team completes their contract. You removed the vendor users, and now run: "sudo groupdel vendor_team" to clean up the group registry.',
      realWorldAnalogy: 'Closing a defunct department and removing it from the building registry.',
      terms: [
        { term: 'Primary Group Protection', simple: 'Safety check refusing to delete a user\'s main group.', technical: 'Kernel database validation checking field 4 of /etc/passwd before unlinking group.' }
      ],
      syntaxCode: 'sudo groupdel GROUPNAME',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Root privileges' },
        { token: 'groupdel', role: 'command', explanation: 'Delete group definition' },
        { token: 'obsolete_team', role: 'argument', explanation: 'Group to remove' }
      ],
      variations: [
        { syntax: 'sudo groupdel -f groupname', title: 'Force Delete', whatItDoes: 'Forces group removal', whenToUse: 'Disaster recovery cleanup' }
      ],
      beforeAfter: {
        before: '$ grep "oldteam" /etc/group\noldteam:x:1008:\n$ sudo groupdel oldteam',
        after: '$ grep "oldteam" /etc/group\n[Empty output; group deleted]',
        explanation: 'Group record was purged cleanly from /etc/group.'
      },
      expectedOutput: '[Group record purged from system]',
      whatChanges: ['Removes line from /etc/group and /etc/gshadow.'],
      whatDoesNotChange: ['Files on disk with that GID remain on disk as bare numbers.'],
      safeRecovery: 'Recreate the group with "sudo groupadd -g GID name" if accidentally deleted.',
      commonMistakes: [
        { mistake: 'Trying to delete a group that is still a user\'s primary group', whyItHappens: 'Linux returns: "cannot remove the primary group of user \'alice\'".', howToFix: 'Change the user\'s primary group first with "usermod -g othergroup alice", then delete.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-16',
      subChapterNumber: '09.16',
      command: 'id -gn',
      title: 'Primary Groups',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'The default group ownership automatically assigned to every new file a user creates',
      badges: ['Groups', 'Primary', 'Core'],
      difficulty: 'Beginner',
      quote: 'Whenever you create a file with touch or mkdir, its group ownership is set to your Primary Group.',
      whatIsIt: 'Every Linux user has exactly ONE Primary Group (recorded in field 4 of /etc/passwd). In modern Linux systems adhering to User Private Groups (UPG), every user is given their own private primary group with the exact same name and GID as their username (e.g. user "ubuntu" has primary group "ubuntu"). When a user creates a new file, its group ownership is automatically set to this primary group.',
      inSimpleWords: 'When you create a new file, who owns it? You do. And what group owns it? Your Primary Group does. By default, Linux creates a private group just for you so your files are private.',
      whyDoYouNeedIt: 'Understanding primary groups explains why new files are created with group ownership matching your username (e.g. "-rw-r--r-- 1 priya priya ...").',
      realWorldScenario: 'A user creates a file inside a shared company folder, but teammates cannot edit it because the file was created with the user\'s private primary group. Changing the directory\'s SGID bit forces files to inherit the shared group instead.',
      realWorldAnalogy: 'Your personal home mailbox address versus company department mailboxes.',
      terms: [
        { term: 'UPG (User Private Group)', simple: 'The Linux standard where each user gets their own private 1-person group.', technical: 'Convention where useradd creates a matching group with GID == UID to ensure safe umask 002 defaults.' }
      ],
      syntaxCode: 'id -gn',
      syntaxTokens: [
        { token: 'id', role: 'command', explanation: 'Query identity' },
        { token: '-gn', role: 'flag', explanation: 'Output primary group name only' }
      ],
      variations: [
        { syntax: 'sudo usermod -g developers username', title: 'Change Primary Group', whatItDoes: 'Changes the user\'s primary group in /etc/passwd (field 4)', whenToUse: 'Standardizing team file creation ownership' }
      ],
      beforeAfter: {
        before: '$ touch myfile.txt\n$ ls -l myfile.txt',
        after: '-rw-r--r-- 1 priya priya 0 Sep 28 12:00 myfile.txt',
        explanation: 'Note the second ownership column: "priya" is the user\'s primary group assigned automatically.'
      },
      expectedOutput: 'ubuntu',
      whatChanges: ['Queries primary GID.'],
      whatDoesNotChange: ['System remains intact.'],
      safeRecovery: '100% safe read-only inspection.',
      commonMistakes: [
        { mistake: 'Changing a user\'s primary group without migrating their existing files', whyItHappens: 'Existing files remain owned by the old group.', howToFix: 'Run "chown -R :newgroup /home/username" to update their home directory.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-09-17',
      subChapterNumber: '09.17',
      command: 'id -Gn',
      title: 'Supplementary Groups',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Secondary group memberships granting access to sudo, docker, audio, and team folders',
      badges: ['Groups', 'Supplementary', 'Permissions'],
      difficulty: 'Beginner',
      quote: 'You can only have one primary group, but you can belong to dozens of supplementary groups.',
      whatIsIt: 'Supplementary (Secondary) Groups are additional group memberships assigned to a user in /etc/group. While a user has only one primary group, they can belong to up to 65,536 supplementary groups simultaneously in modern Linux. When checking file access permissions, the kernel checks the user\'s UID, their primary GID, AND all of their supplementary GIDs.',
      inSimpleWords: 'Think of supplementary groups as special access badges on your lanyard: one badge lets you into the server room (sudo), one lets you into the parking garage (docker), and one lets you into the laboratory (developers).',
      whyDoYouNeedIt: 'Supplementary groups are the standard mechanism for granting permissions without making users full root administrators.',
      realWorldScenario: 'You want a developer to manage Docker containers without giving them full root SSH access. You add them to the supplementary "docker" group: "sudo usermod -aG docker alex". Alex can now interact with the Docker socket while remaining an unprivileged user for everything else.',
      realWorldAnalogy: 'Keys on a keychain. Your house key is primary, but you also have office keys, gym keys, and bicycle lock keys on the same ring.',
      terms: [
        { term: 'NGROUPS_MAX', simple: 'The maximum number of supplementary groups a user can belong to.', technical: 'Kernel limit (typically 65,536 on modern Linux) defined in sys/param.h.' }
      ],
      syntaxCode: 'id -Gn [USERNAME]',
      syntaxTokens: [
        { token: 'id', role: 'command', explanation: 'Display identity' },
        { token: '-Gn', role: 'flag', explanation: 'Output all supplementary group names' }
      ],
      variations: [
        { syntax: 'sudo usermod -aG sudo username', title: 'Grant Sudo via Supplementary Group', whatItDoes: 'Appends user to sudo group for administrative privileges', whenToUse: 'Delegating admin rights' }
      ],
      beforeAfter: {
        before: '$ id -Gn ubuntu\n[Listing all group memberships...]',
        after: 'ubuntu adm cdrom sudo dip plugdev lxd docker',
        explanation: 'Lists all 8 supplementary groups the ubuntu user currently belongs to.'
      },
      expectedOutput: 'ubuntu adm sudo docker',
      whatChanges: ['Queries active process credential group list.'],
      whatDoesNotChange: ['System remains intact.'],
      safeRecovery: '100% safe read-only query.',
      commonMistakes: [
        { mistake: 'Forgetting that supplementary groups are loaded into memory ONLY during login', whyItHappens: 'Adding a user to a group does not take effect in their already-open SSH terminal window.', howToFix: 'The user must log out and reconnect, or run "newgrp <groupname>" to refresh credentials in place.' }
      ]
    })
  ]
};
