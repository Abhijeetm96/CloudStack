import { LinuxTopic } from '../unifiedLinuxData';

export const MODULE_04_PERMISSIONS: LinuxTopic = {
  id: 'ch01-04-permissions',
  number: '01.4',
  title: 'Permissions & Access Control',
  iconName: 'ShieldCheck',
  description:
    'Security & access boundaries: Linux user/group/other permissions (rwx), numeric vs symbolic modes (chmod), ownership & masks (chown, chgrp, umask), and privilege escalation (sudo, SUID, SGID, Sticky bit).',
  concepts: [
    {
      id: 'linux-permissions-model',
      command: 'ls -l /etc/shadow; chmod 755 script.sh; chmod u=rwx,go=rx script.sh',
      title: 'Linux Permissions Model: Users, Groups, Owner & rwx Modes',
      topicId: 'ch01-04-permissions',
      topicNumber: '01.4',
      topicTitle: 'Permissions & Access Control',
      subtitle: 'The 3x3 security triad: Owner, Group, Others across Read, Write, and Execute',
      badges: ['Security', 'Permissions', 'Foundations'],
      quote:
        'In Linux, security starts at the inode: 9 permission bits dictate whether a process can read, write, or enter a directory.',
      difficulty: 'Beginner',
      whatIsIt:
        'Linux is inherently a multi-user operating system. Every file and directory is bound to an Owner (user) and a Group. Access rights are evaluated across three tiers: User/Owner (`u`), Group (`g`), and Others/World (`o`). Each tier has three primary permission bits: Read (`r` = 4, allowing file inspection or directory listing), Write (`w` = 2, allowing file content modification or file creation/deletion in directories), and Execute (`x` = 1, allowing binary/script execution or traversing into a directory via `cd`). Permissions can be represented either symbolically (`rwxr-xr-x`) or in 3-digit octal numeric notation (`755`).',
      inSimpleWords:
        'Every file has three questions: What can the Owner do? What can the Group do? What can everyone else do? For each, the answers are Read (4), Write (2), and Execute (1). Add them up: 4+2+1 = 7 (everything), 4+1 = 5 (read & run), 4 = 4 (read only).',
      whyDoYouNeedIt:
        'A permissions misconfiguration is the #1 cause of web server "403 Forbidden" errors, database startup failures, and critical security breaches (such as world-readable private SSH keys or `/etc/shadow`).',
      realWorldAnalogy:
        'A bank safe deposit box: The box owner has full access (read/write/open = 7), the bank manager group has witness access (read/open = 5), and general bank customers have zero access (0).',
      withoutVsWith: {
        without: {
          title: 'Without Granular Multi-Tier Permissions (FAT32/Single-User OS)',
          items: [
            'Every running program has full read and write access to all files on disk',
            'A compromised web server process can overwrite `/etc/passwd` or kernel binaries',
            'No separation between administrative services and regular user data',
          ],
          outcome: 'Immediate total system compromise upon any web application exploit.',
        },
        with: {
          title: 'With Linux 3-Tier rwx Permission Triads',
          items: [
            'Unprivileged services (e.g. `www-data` or `nginx`) can only read designated web roots',
            'Sensitive files like private keys (`~/.ssh/id_ed25519`) refuse to work if permissions exceed `600`',
            'Kernel blocks unauthorized write attempts at the VFS level before any byte is altered',
          ],
          outcome: 'Strict principle of least privilege preventing lateral privilege escalation.',
        },
      },
      blockDiagram: {
        title: 'Linux 9-Bit File Permission Anatomy',
        subtitle: 'Breakdown of `-rwxr-xr--` into file type, Owner, Group, and Other octal values',
        nodes: [
          { id: 'perm-type', label: 'File Type (-/d/l)', simpleDef: '- = regular file, d = directory, l = symlink', techDef: 'Inode file mode bits (S_IFREG, S_IFDIR, S_IFLNK)', badge: 'Type Bit', color: '#64748b' },
          { id: 'perm-user', label: 'Owner: rwx (7)', simpleDef: 'Read (4) + Write (2) + Exec (1)', techDef: 'Permissions applied when process UID matches file UID', badge: 'u = 7', color: '#10b981' },
          { id: 'perm-group', label: 'Group: r-x (5)', simpleDef: 'Read (4) + Exec (1)', techDef: 'Permissions applied when process GID matches file GID', badge: 'g = 5', color: '#06b6d4' },
          { id: 'perm-other', label: 'Other: r-- (4)', simpleDef: 'Read only (4)', techDef: 'Permissions applied to all other processes on system', badge: 'o = 4', color: '#f59e0b' },
        ],
      },
      terms: [
        { term: 'Directory Execute Bit (x)', simple: 'Allows a user to cd into the directory and access files inside.', technical: 'Without the execute bit on a directory, you cannot search, open, or cd into that directory even if you have read (r) permission.' },
        { term: 'Octal Notation', simple: 'Calculating permissions by adding numbers: Read=4, Write=2, Exec=1.', technical: '3-bit octal representation: 7=rwx, 6=rw-, 5=r-x, 4=r--, 0=---.' },
        { term: 'Symbolic Mode', simple: 'Changing permissions using letters: u (user), g (group), o (other), +/- (add/remove).', technical: 'Syntax: [who][+|-|=][permissions], e.g. u+x or go-w.' },
      ],
      whenToUse: [
        'Restricting private SSH keys to owner only: `chmod 600 ~/.ssh/id_rsa`',
        'Making shell scripts executable: `chmod +x deploy.sh`',
        'Configuring web document roots: `chmod 755 /var/www/html`',
      ],
      whenNotToUse: [
        'Never run `chmod 777` to fix a permission error; this grants all users full write and execute access, creating a massive security vulnerability',
      ],
      syntaxCode: 'chmod 755 script.sh\nchmod 600 id_rsa\nchmod u+x,go-w app.py\nls -l /etc/passwd',
      syntaxTokens: [
        { token: 'chmod', role: 'Command', explanation: 'Change file mode bits' },
        { token: '755', role: 'Octal Mode', explanation: 'User: rwx (7), Group: r-x (5), Other: r-x (5)' },
        { token: 'u+x', role: 'Symbolic', explanation: 'Add execute permission for the Owner' },
      ],
      variations: [
        { syntax: 'chmod -R 750 /opt/app', title: 'Recursive Mode', whatItDoes: 'Applies permissions across all nested files and subdirectories', whenToUse: 'Bulk directory permission hardening' },
        { syntax: 'chmod a+r file', title: 'All Read', whatItDoes: 'Grants read access to User, Group, and Other', whenToUse: 'Making public documentation readable' },
      ],
      internalFlow: [
        { step: 1, title: 'Process Issues open() Syscall', desc: 'Process requests read, write, or execute access to target inode', why: 'Requests file operation', techDetail: 'Kernel checks effective UID (eUID) and GID (eGID) of the calling process' },
        { step: 2, title: 'Kernel Evaluates Inode Match', desc: 'If process eUID == inode UID, applies Owner bits (4..2..1)', why: 'First matching rule wins', techDetail: 'If process GID == inode GID, applies Group bits; otherwise applies Other bits' },
        { step: 3, title: 'Access Granted or EACCES', desc: 'Kernel permits operation or returns errno 13 (Permission denied)', why: 'Enforces hardware security', techDetail: 'If denied, operation aborts immediately without touching file blocks' },
      ],
      sandbox: {
        initialCommands: ['# Create a test script and inspect default permissions\necho \'echo "Forge Lab"\' > /tmp/test.sh\nls -l /tmp/test.sh'],
        guidedSteps: [
          { instruction: 'Make the script executable by the owner using chmod +x', command: 'chmod +x /tmp/test.sh', hint: 'Run chmod +x /tmp/test.sh' },
          { instruction: 'Inspect the updated permissions with ls -l', command: 'ls -l /tmp/test.sh', hint: 'Run ls -l /tmp/test.sh' },
        ],
        targetTask: 'Make /tmp/test.sh executable with chmod +x and verify with ls -l',
        solutionCommands: ['chmod +x /tmp/test.sh', 'ls -l /tmp/test.sh'],
      },
      commonMistakes: [
        { mistake: 'Running chmod 777 on application directories to resolve permission denied errors', whyWrong: 'Grants write and execution access to any local user or malicious container, allowing arbitrary code execution.', correctWay: 'Diagnose the real owner using ls -l and adjust ownership with chown or grant minimal permissions (e.g. 750 or 755).' },
        { mistake: 'Removing execute permission from a directory (e.g. chmod 644 /dir)', whyWrong: 'Without the execute bit (x) on a directory, users cannot cd into it or access any files inside it, even with read permission.', correctWay: 'Directories require execute permission (755 or 750) for traversal.' },
      ],
      challenge: {
        question: 'What exact octal permission value corresponds to: Owner can read, write, and execute; Group can read only; Others have no access?',
        options: [
          { label: '740', isCorrect: true, explanation: 'Owner: 4+2+1=7; Group: 4; Others: 0 = 740.' },
          { label: '750', isCorrect: false, explanation: '750 grants Group execute (4+1=5) as well.' },
          { label: '640', isCorrect: false, explanation: '640 denies Owner execute permission (4+2=6).' },
          { label: '755', isCorrect: false, explanation: '755 grants Group and Others read and execute.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['chmod 755 <file>', 'chmod 600 <key>', 'chmod +x <script>', 'chmod -R 750 <dir>'],
        bestPractices: [
          'Use 600 for private credentials and certificates',
          'Use 644 for public static web files and configs',
          'Use 755 for directories and executable binaries',
        ],
      },
    },
    {
      id: 'linux-ownership-umask',
      command: 'chown deploy:webapps /var/www/app; chgrp developers /opt/tools; umask 027',
      title: 'Ownership & Creation Mask: chown, chgrp, umask',
      topicId: 'ch01-04-permissions',
      topicNumber: '01.4',
      topicTitle: 'Permissions & Access Control',
      subtitle: 'Transferring user and group ownership and setting default file creation permission masks',
      badges: ['Ownership', 'Security', 'SysAdmin'],
      quote: 'umask defines what permissions are SUBTRACTED when new files or directories are created.',
      difficulty: 'Intermediate',
      whatIsIt:
        'Managing who owns files is critical in multi-tenant environments. `chown` transfers user ownership, group ownership, or both simultaneously (`chown user:group file`). `chgrp` specifically updates the group ownership. Complementing ownership is `umask` (user file-creation mode mask). Whenever any process creates a new file or directory, the kernel determines its default permissions by subtracting the umask value from the base permission: base `666` for files and `777` for directories. For example, a secure umask of `027` results in `640` for new files (owner read/write, group read, others none) and `750` for new directories.',
      inSimpleWords:
        '`chown` changes who owns the file, `chgrp` changes the owning group, and `umask` is a rule that automatically strips permissions off any newly created file so it does not start out world-readable.',
      whyDoYouNeedIt:
        'When spinning up a new web service like Nginx or Node.js, the daemon process runs under a restricted user (e.g. `www-data` or `node`). You must `chown -R www-data:www-data /app` so the process has write rights to upload folders.',
      realWorldAnalogy:
        'Transferring a car title (`chown` from old owner to new owner), registering a corporate fleet group (`chgrp`), and setting the factory safety default that locks doors automatically upon purchase (`umask`).',
      withoutVsWith: {
        without: {
          title: 'Without Controlled Ownership and Proper umask (umask 000)',
          items: [
            'All newly created files are created world-writable (666) and directories (777)',
            'Any local user on the machine can modify or delete other users’ private data',
            'Application files remain owned by root, forcing services to run dangerously with root privileges',
          ],
          outcome: 'Pervasive privilege leaks and insecure default file permissions.',
        },
        with: {
          title: 'With Strict chown and Production umask (umask 027)',
          items: [
            'Files are strictly owned by dedicated non-root service accounts',
            'New files automatically default to secure 640/750 permissions without manual intervention',
            'Group collaboration is controlled through well-defined secondary groups',
          ],
          outcome: 'Automated compliance with least-privilege security standards.',
        },
      },
      blockDiagram: {
        title: 'Default Permission Calculation via umask',
        subtitle: 'Base permissions minus umask = Effective creation permissions',
        nodes: [
          { id: 'umask-base', label: 'Base Permission', simpleDef: 'Files = 666 (rw-rw-rw-), Dirs = 777 (rwxrwxrwx)', techDef: 'Maximum permission bits requested by openat() with O_CREAT', badge: 'Base Bits', color: '#38bdf8' },
          { id: 'umask-mask', label: 'umask 027', simpleDef: 'Subtracts: Owner 0, Group 2 (w), Other 7 (rwx)', techDef: 'Bitwise mask applied: mode & ~umask', badge: 'Bitwise NOT', color: '#ef4444' },
          { id: 'umask-result', label: 'Resulting Permissions', simpleDef: 'Files = 640 (rw-r-----), Dirs = 750 (rwxr-x---)', techDef: 'Actual mode stored in newly allocated inode', badge: 'Secure Default', color: '#10b981' },
        ],
      },
      terms: [
        { term: 'umask', simple: 'A 3-digit number specifying permissions to deny by default.', technical: 'Process attribute that filters mode bits passed to openat(), mkdirat(), and mknodat().' },
        { term: 'chown user:group', simple: 'Changes both the owner and group in one command.', technical: 'Issues chown() syscall updating both i_uid and i_gid fields in the inode.' },
        { term: 'Base File Mode 666', simple: 'Linux never creates regular files with execute permissions by default for safety.', technical: 'Compilers and touch request 666 (rw-rw-rw-); the execute bit must be explicitly enabled via chmod.' },
      ],
      whenToUse: [
        'Setting up service ownership after deployment: `sudo chown -R nginx:nginx /var/www/html`',
        'Securing bash script defaults: add `umask 027` to `~/.bashrc` or system `/etc/profile`',
        'Assigning shared project directories to a development team group: `sudo chgrp -R devs /srv/project`',
      ],
      whenNotToUse: [
        'Never set umask to 000 on production systems; this makes all newly created files world-writable',
      ],
      syntaxCode: 'chown deploy:webapps /var/www/app\nchown -R www-data:www-data /var/www\nchgrp developers /opt/tools\numask 027\numask',
      syntaxTokens: [
        { token: 'chown', role: 'Command', explanation: 'Change file owner and group' },
        { token: '-R', role: 'Flag', explanation: 'Operate on files and directories recursively' },
        { token: 'deploy:webapps', role: 'Argument', explanation: 'Target user:target group syntax' },
        { token: 'umask 027', role: 'Command', explanation: 'Set creation mask to strip group write (2) and other all (7)' },
      ],
      variations: [
        { syntax: 'chown :group file', title: 'Group-only chown', whatItDoes: 'Changes only the group without altering the user owner', whenToUse: 'Quick group realignment' },
        { syntax: 'umask -S', title: 'Symbolic umask', whatItDoes: 'Displays umask in symbolic readable form (e.g. u=rwx,g=rx,o=)', whenToUse: 'Auditing active mask' },
      ],
      internalFlow: [
        { step: 1, title: 'Process Calls chown() Syscall', desc: 'Process requests UID/GID reassignment for target inode', why: 'Updates ownership', techDetail: 'Kernel verifies calling process has CAP_CHOWN capability (typically root)' },
        { step: 2, title: 'Kernel Inode Update', desc: 'Kernel writes new UID and GID to inode structure', why: 'Commits owner', techDetail: 'Clears SUID/SGID bits automatically for security unless executed by root' },
        { step: 3, title: 'umask Bitwise Calculation', desc: 'On file creation, kernel calculates: effective_mode = requested_mode & ~umask', why: 'Applies mask', techDetail: 'Masks out forbidden bits before writing i_mode to disk' },
      ],
      sandbox: {
        initialCommands: ['# Check current umask\numask\n# Inspect file ownership of /etc/hosts\nls -l /etc/hosts'],
        guidedSteps: [
          { instruction: 'Display active umask value', command: 'umask', hint: 'Run umask' },
          { instruction: 'Display umask in symbolic format', command: 'umask -S', hint: 'Run umask -S' },
        ],
        targetTask: 'Check the current umask value and its symbolic representation',
        solutionCommands: ['umask', 'umask -S'],
      },
      commonMistakes: [
        { mistake: 'Assuming standard files are created with 777 minus umask', whyWrong: 'Standard files have a base mode of 666 (no execute bits); only directories have a base mode of 777.', correctWay: 'Calculate file permissions starting from 666: 666 - 022 = 644.' },
        { mistake: 'Running chown without -R when preparing a web directory', whyWrong: 'Failing to use -R leaves all subdirectories and images owned by the previous user, causing 403 errors on nested assets.', correctWay: 'Use chown -R user:group /path to recursively update entire trees.' },
      ],
      challenge: {
        question: 'If a user has a umask of 027, what will be the permission of a newly created regular file created with touch?',
        options: [
          { label: '640 (-rw-r-----)', isCorrect: true, explanation: 'Regular file base is 666. 666 & ~027 = 640 (Owner rw, Group r, Other none).' },
          { label: '750 (-rwxr-x---)', isCorrect: false, explanation: '750 would be the permission for a newly created directory, not a regular file.' },
          { label: '644 (-rw-r--r--)', isCorrect: false, explanation: '644 results from a umask of 022, not 027.' },
          { label: '777 (-rwxrwxrwx)', isCorrect: false, explanation: '777 would only occur with umask 000 on a directory.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['chown <user>:<group> <path>', 'chown -R <user>:<group> <dir>', 'chgrp <group> <path>', 'umask <octal>'],
        bestPractices: [
          'Set umask 027 in /etc/profile for hardened multi-user production servers',
          'Always use non-root service accounts for running web servers and microservices',
        ],
      },
    },
    {
      id: 'linux-sudo-special-perms',
      command: 'sudo visudo; chmod 4755 /usr/bin/passwd; chmod 2775 /shared; chmod +t /tmp',
      title: 'Privilege Delegation & Special Bits: sudo, SUID, SGID, Sticky Bit',
      topicId: 'ch01-04-permissions',
      topicNumber: '01.4',
      topicTitle: 'Permissions & Access Control',
      subtitle: 'Controlled root elevation via sudoers, SUID execution, SGID directory inheritance, and the Sticky deletion safeguard',
      badges: ['sudo', 'SUID/SGID', 'Hardening'],
      quote: 'Never log in as root directly: delegate granular commands via sudo, and understand how SUID/SGID execute as other users.',
      difficulty: 'Advanced',
      whatIsIt:
        'Securing Linux systems requires controlled privilege elevation. `sudo` (SuperUser DO) allows authorized users to execute commands with root privileges without sharing the root password, strictly configured via `/etc/sudoers` (always edited safely with `visudo`). Beyond standard `rwx`, Linux provides three special permission bits: **SUID** (Set User ID, octal 4000) causes an executable binary to run with the privileges of the file owner (e.g. `/usr/bin/passwd` runs as root to update `/etc/shadow`); **SGID** (Set Group ID, octal 2000) causes files created inside a directory to inherit the directory’s group rather than the user’s primary group; and the **Sticky Bit** (octal 1000) prevents users from deleting or renaming files in shared directories (like `/tmp`) unless they own that specific file.',
      inSimpleWords:
        '`sudo` lets you run administrative commands safely with your own password. **SUID** lets a program borrow the owner’s superpowers while running. **SGID** on a folder makes all new files automatically belong to the folder’s group. The **Sticky Bit** on `/tmp` prevents users from deleting each other’s files.',
      whyDoYouNeedIt:
        'Every shared development server uses SGID (`chmod 2775 /var/shared`) so all team members can edit each other’s files. The Sticky Bit protects `/tmp` from malicious users deleting database socket files.',
      realWorldAnalogy:
        '`sudo` is checking out a master keycard with a signed logbook; SUID is using a voting booth computer that has special privileges to cast ballots; the Sticky Bit is a community refrigerator where anyone can put their own lunchbox in, but you can only take your own lunchbox out.',
      withoutVsWith: {
        without: {
          title: 'Without sudo and Special Permission Bits',
          items: [
            'All administrators must share and know the root password directly',
            'No audit trail of which specific person ran destructive commands',
            'Users in shared directories can delete each other’s critical files in /tmp',
          ],
          outcome: 'Zero accountability, compromised root credentials, and accidental data deletion in shared folders.',
        },
        with: {
          title: 'With sudo, visudo, and Special Bits (SUID/SGID/Sticky)',
          items: [
            'sudo logs every privileged command to /var/log/auth.log with timestamp and username',
            'SGID on shared directories ensures seamless team collaboration without permission conflicts',
            'Sticky bit ensures files in /tmp can only be unlinked by their true owner',
          ],
          outcome: 'Full compliance auditing, secure privilege elevation, and bulletproof shared directories.',
        },
      },
      blockDiagram: {
        title: 'Special Permission Bits: 4th Octal Position',
        subtitle: 'SUID (4xxx), SGID (2xxx), and Sticky Bit (1xxx) bitwise flags',
        nodes: [
          { id: 'sb-suid', label: 'SUID: 4xxx (rwsr-xr-x)', simpleDef: 'Runs as file owner (e.g. root)', techDef: 'Sets effective UID (eUID) of the process to the owner of the binary', badge: 'SUID (4000)', color: '#ef4444' },
          { id: 'sb-sgid', label: 'SGID: 2xxx (rwxrwsr-x)', simpleDef: 'Inherits directory group', techDef: 'Sets eGID or forces new files in directory to inherit directory GID', badge: 'SGID (2000)', color: '#06b6d4' },
          { id: 'sb-sticky', label: 'Sticky: 1xxx (rwxrwxrwt)', simpleDef: 'Only owner can delete file', techDef: 'Restricts unlink() and rename() in world-writable directories like /tmp', badge: 'Sticky (1000)', color: '#10b981' },
          { id: 'sb-sudo', label: 'sudoers Engine', simpleDef: 'Delegates command elevation', techDef: 'PAM authentication validating /etc/sudoers rules and logging to auth.log', badge: 'sudo', color: '#f59e0b' },
        ],
      },
      terms: [
        { term: 'visudo', simple: 'The only safe tool to edit /etc/sudoers with syntax error checking.', technical: 'Locks /etc/sudoers and checks for parsing syntax errors before saving, preventing accidental system lockout.' },
        { term: 'Sticky Bit (+t)', simple: 'Indicated by a "t" at the end of permissions (e.g. drwxrwxrwt for /tmp).', technical: 'Restricts file deletion and renaming in a directory to the file owner, directory owner, or root.' },
        { term: 'SUID Danger', simple: 'SUID on shell scripts or untrusted binaries creates severe privilege escalation risks.', technical: 'Attackers exploit SUID binaries to execute arbitrary code with root privileges; audit with find / -perm -4000.' },
      ],
      whenToUse: [
        'Safely delegating specific commands (e.g. restart nginx) to developers without giving full root',
        'Creating shared team folders where new files inherit team group: `chmod 2775 /data/team`',
        'Protecting public scratch folders from unauthorized deletion: `chmod +t /shared/scratch`',
      ],
      whenNotToUse: [
        'Never set the SUID bit on shell scripts, Python scripts, or text editors (vim, nano); this allows instant root shell breakouts',
        'Never edit `/etc/sudoers` directly with nano or vim; always use `sudo visudo`',
      ],
      syntaxCode: 'sudo visudo\nchmod 4755 /usr/bin/passwd\nchmod 2775 /var/shared\nchmod 1777 /tmp\nls -ld /tmp',
      syntaxTokens: [
        { token: 'visudo', role: 'Command', explanation: 'Safely edit /etc/sudoers with validation' },
        { token: '4755', role: 'Octal Mode', explanation: 'SUID bit (4) + Owner rwx (7) + Group r-x (5) + Other r-x (5)' },
        { token: 'chmod +t', role: 'Symbolic Mode', explanation: 'Enables sticky bit on target directory' },
      ],
      variations: [
        { syntax: 'find / -perm -4000 -type f 2>/dev/null', title: 'Audit SUID Binaries', whatItDoes: 'Finds all SUID binaries on system', whenToUse: 'Security audit and hardening' },
        { syntax: 'sudo -u www-data cmd', title: 'Run as User', whatItDoes: 'Executes command as specific non-root user', whenToUse: 'Testing service account permissions' },
        { syntax: 'sudo -l', title: 'List Privileges', whatItDoes: 'Lists allowed sudo commands for current user', whenToUse: 'Checking your sudo privileges' },
      ],
      internalFlow: [
        { step: 1, title: 'Execution of SUID Binary', desc: 'Process calls execve() on binary with SUID bit (S_ISUID)', why: 'Elevates process eUID', techDetail: 'Kernel sets process effective UID to the file owner UID rather than the calling user UID' },
        { step: 2, title: 'unlink() Check for Sticky Bit', desc: 'User attempts to delete file inside directory with Sticky bit (S_ISVTX)', why: 'Verifies deletion rights', techDetail: 'VFS verifies calling UID matches file UID, directory owner UID, or has CAP_FOWNER' },
        { step: 3, title: 'sudo PAM Authentication', desc: 'sudo prompts user for password and verifies against /etc/shadow via PAM', why: 'Authenticates user', techDetail: 'Evaluates /etc/sudoers rules; if permitted, switches eUID to 0 and logs event' },
      ],
      sandbox: {
        initialCommands: ['# Inspect the permissions on /tmp and /usr/bin/passwd\nls -ld /tmp\nls -l /usr/bin/passwd'],
        guidedSteps: [
          { instruction: 'Inspect the sticky bit on /tmp', command: 'ls -ld /tmp', hint: 'Notice the trailing "t" in permissions' },
          { instruction: 'Inspect the SUID bit on /usr/bin/passwd', command: 'ls -l /usr/bin/passwd', hint: 'Notice the "s" in the owner permissions' },
        ],
        targetTask: 'Inspect /tmp and /usr/bin/passwd to verify special permission bits',
        solutionCommands: ['ls -ld /tmp', 'ls -l /usr/bin/passwd'],
      },
      commonMistakes: [
        { mistake: 'Editing /etc/sudoers directly with vim without visudo', whyWrong: 'A single typo or missing character in /etc/sudoers locks out all administrators from sudo completely.', correctWay: 'Always use sudo visudo, which validates syntax before committing changes to disk.' },
        { mistake: 'Setting SUID on a custom bash script', whyWrong: 'Most modern Linux kernels deliberately ignore the SUID bit on shell scripts due to environment injection vulnerabilities.', correctWay: 'Use sudo with specific command whitelisting in /etc/sudoers.d/ instead of SUID scripts.' },
      ],
      challenge: {
        question: 'What does the sticky bit prevent when set on a world-writable directory like /tmp?',
        options: [
          { label: 'It prevents regular users from deleting or renaming files owned by other users', isCorrect: true, explanation: 'Only the file owner, directory owner, or root can delete or rename files in a sticky directory.' },
          { label: 'It prevents files from being read by non-root users', isCorrect: false, explanation: 'The sticky bit does not restrict read operations.' },
          { label: 'It keeps the files persistently cached in RAM', isCorrect: false, explanation: 'The sticky bit historically saved text segments in swap, but today only restricts deletion.' },
          { label: 'It prevents files from ever being deleted, even by root', isCorrect: false, explanation: 'Root can always delete any file.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['sudo visudo', 'sudo -l', 'chmod 4755 <binary>', 'chmod 2775 <dir>', 'chmod +t <dir>'],
        bestPractices: [
          'Add custom sudo rules in /etc/sudoers.d/<service> rather than editing the main /etc/sudoers',
          'Regularly audit SUID binaries with find / -perm -4000 -type f to detect backdoors',
        ],
      },
    },
  ],
};
