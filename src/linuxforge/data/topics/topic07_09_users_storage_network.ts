import { LinuxTopic } from '../unifiedLinuxData';

export const TOPIC_07_09: LinuxTopic[] = [
  // =========================================================================
  // TOPIC 07: USERS, GROUPS & AUTHENTICATION
  // =========================================================================
  {
    id: 'topic-07',
    number: '07',
    title: 'Users, Groups & sudo',
    iconName: 'Users',
    description: 'User accounts, group administration, shadow password hashes, and sudoers privilege escalation.',
    concepts: [
      {
        id: 'c-user-administration',
        command: 'useradd -m -s /bin/bash deployer',
        title: 'User & Group Administration',
        topicId: 'topic-07',
        topicNumber: '07',
        topicTitle: 'Users, Groups & sudo',
        subtitle: 'Creating human and system service accounts (useradd, usermod, userdel, groupadd).',
        badges: ['Intermediate', 'Security', 'User Management'],
        quote: 'Never share the root password—create individual human user accounts with sudo privileges and dedicated service accounts.',
        difficulty: 'Intermediate',
        whatIsIt: 'The administrative commands for managing Linux user accounts and group memberships: `useradd` (creates accounts with home directories and shells), `usermod` (modifies group memberships like adding users to the `docker` or `sudo` group), and `userdel`.',
        inSimpleWords: 'Creating accounts for your team members (`useradd -m`), adding them to groups (`usermod -aG sudo username`), and locking or deleting accounts when someone leaves the team.',
        whyDoYouNeedIt: 'Ensures individual accountability in audit logs, enforces separation of duties, and provides unprivileged service identities for background software.',
        realWorldAnalogy: 'Issuing personalized employee security badges instead of leaving the master front door key taped under the welcome mat.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT INDIVIDUAL USER ACCOUNTS (Shared Root Password)',
            items: [
              'All 10 developers log in as root with the same password',
              'When someone runs rm -rf in error, audit logs only show "root" (zero accountability)',
              'Revoking access requires changing the root password on 50 servers simultaneously',
              'Services running as root can be hijacked to compromise the entire host',
            ],
            outcome: '🚨 Zero accountability, compliance audit failure, and severe security risk',
          },
          with: {
            title: 'WITH DISCIPLINED ACCOUNT MANAGEMENT',
            items: [
              'Individual accounts with personal SSH keys and audit trails in /var/log/auth.log',
              'Group-based access control (e.g. docker group, sudo group)',
              'System service accounts (nginx, postgres) have disabled login shells (/usr/sbin/nologin)',
              'Revoking a developer’s access is as simple as locking their single account',
            ],
            outcome: '🛡️ SOC2/ISO compliance, clean audit trails, and strict access governance',
          },
        },
        blockDiagram: {
          title: 'Linux User Account Architecture',
          subtitle: 'Click any component to inspect user account creation parameters:',
          nodes: [
            { id: 'user-id', label: 'User Identity (UID & Username)', simpleDef: 'The unique name and integer identifying the user.', techDef: 'Numeric UID (0 = root, 1-999 = system accounts, 1000+ = human accounts).', badge: 'UID', color: '#38bdf8' },
            { id: 'user-home', label: 'Home Directory (/home/username)', simpleDef: 'Personal folder created with -m flag.', techDef: 'Path populated from /etc/skel template directory during useradd -m.', badge: 'Home Dir', color: '#10b981' },
            { id: 'user-shell', label: 'Default Login Shell (/bin/bash)', simpleDef: 'The shell launched when the user logs in.', techDef: 'Shell path recorded in /etc/passwd (e.g. /bin/bash or /usr/sbin/nologin).', badge: 'Shell', color: '#a855f7' },
            { id: 'user-groups', label: 'Primary & Secondary Groups', simpleDef: 'The groups granting permissions (sudo, docker).', techDef: 'Primary GID in /etc/passwd; supplementary groups in /etc/group.', badge: 'Groups', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'useradd -m', simple: 'Creates the user AND automatically sets up their /home/username directory.', technical: 'Copies default dotfiles (.bashrc, .profile) from /etc/skel into new home directory.', analogy: 'Moving into a furnished apartment with default furniture already inside.' },
          { term: 'usermod -aG [group]', simple: 'Adds user to a supplementary group without removing them from existing groups.', technical: 'Append (-a) flag ensures existing supplementary group memberships are preserved.', analogy: 'Adding an extra access sticker to your existing security badge.' },
          { term: '/usr/sbin/nologin', simple: 'A fake shell that rejects login attempts, used for service accounts.', technical: 'Executable that prints an error message and exits with status 1, preventing interactive logins.', analogy: 'A door with a sign that says "Staff Service Hatch Only - No Entry".' },
        ],
        whenToUse: [
          '✓ When provisioning an account for a new team engineer (useradd -m -s /bin/bash alice)',
          '✓ When granting a developer access to run Docker without sudo (usermod -aG docker alice)',
          '✓ When creating a non-login daemon service account (useradd -r -s /usr/sbin/nologin appuser)',
        ],
        whenNotToUse: [
          '✕ Never run "usermod -G" without the "-a" append flag (omitting -a removes the user from all other groups!)',
        ],
        syntaxCode: 'usermod -aG sudo,docker developer',
        syntaxTokens: [
          { token: 'usermod', role: 'Command', explanation: 'Modify user account settings.' },
          { token: '-a', role: 'Flag', explanation: 'Append: adds user to supplementary group without removing others.' },
          { token: '-G sudo,docker', role: 'Groups', explanation: 'Target supplementary groups to grant.' },
          { token: 'developer', role: 'Target User', explanation: 'Account name being modified.' },
        ],
        variations: [
          { syntax: 'useradd -m -s /bin/bash bob', title: 'Create Human User', whatItDoes: 'Creates bob with /home/bob and bash shell.', whenToUse: 'Onboarding an engineer.' },
          { syntax: 'useradd -r -s /usr/sbin/nologin prometheus', title: 'Create System Account', whatItDoes: 'Creates system user without home or login shell.', whenToUse: 'Installing background services.' },
          { syntax: 'passwd bob', title: 'Set/Change Password', whatItDoes: 'Sets or updates user password hash.', whenToUse: 'Account setup or password rotation.' },
          { syntax: 'userdel -r bob', title: 'Delete Account & Home', whatItDoes: 'Deletes user account and wipes their home directory.', whenToUse: 'Offboarding an engineer.' },
        ],
        internalFlow: [
          { step: 1, title: 'Verify Root Authority', desc: 'Kernel checks process has CAP_SYS_ADMIN privileges.', why: 'Account creation is restricted to root.', techDetail: 'Verifies euid == 0' },
          { step: 2, title: 'Allocate Next UID', desc: 'useradd checks /etc/login.defs for UID_MIN (1000) and finds next free UID.', why: 'Assigns unique numeric identity.', techDetail: 'Reads /etc/passwd to find max(UID) + 1' },
          { step: 3, title: 'Write Account Records', desc: 'Appends record to /etc/passwd, shadow hash to /etc/shadow, and group to /etc/group.', why: 'Persists user identity files.', techDetail: 'Uses lock files (.lock) to prevent race conditions' },
          { step: 4, title: 'Populate Home from /etc/skel', desc: 'Creates /home/username and copies files from /etc/skel.', why: 'Sets up default user shell environment.', techDetail: 'mkdir() and chown() to new UID:GID' },
        ],
        sandbox: {
          initialCommands: [
            'id',
            'groups',
            'getent passwd $USER',
          ],
          guidedSteps: [
            { instruction: 'Inspect your active user ID, GID, and group memberships', command: 'id', hint: 'Run id' },
            { instruction: 'List the names of all groups your user belongs to', command: 'groups', hint: 'Run groups' },
            { instruction: 'Query the user account entry from /etc/passwd', command: 'getent passwd $USER', hint: 'Run getent passwd $USER' },
          ],
          targetTask: 'Examine user identity and group memberships.',
          solutionCommands: [
            'id',
            'groups',
            'getent passwd $USER',
          ],
        },
        commonMistakes: [
          { mistake: 'Running "usermod -G docker user" and forgetting the "-a" flag.', whyWrong: 'Without "-a", usermod REPLACES all existing groups with "docker". The user gets removed from sudo and loses admin access!', correctWay: 'Always use the "-aG" combination together: "usermod -aG docker user".' },
          { mistake: 'Creating a service account with a regular login shell like /bin/bash.', whyWrong: 'If credentials leak, an attacker can log into an interactive shell.', correctWay: 'Service accounts should always use "-s /usr/sbin/nologin".' },
        ],
        challenge: {
          question: 'What dangerous mistake occurs if you run "usermod -G sudo alice" without the "-a" flag?',
          options: [
            { label: 'Alice is added to sudo, but stripped from all her other secondary groups (like docker, developer)', isCorrect: true, explanation: 'Correct! -G without -a overwrites the entire list of supplementary groups.' },
            { label: 'The command fails with a syntax error', isCorrect: false, explanation: 'Incorrect.' },
            { label: 'Alice is permanently deleted', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man8/useradd.8.html',
          syntaxCheatSheet: [
            'useradd -m -s /bin/bash [USER]     # Create human user with home directory',
            'useradd -r -s /usr/sbin/nologin ...# Create system daemon account',
            'usermod -aG [GROUP] [USER]        # Add user to supplementary group (CRITICAL: use -aG)',
            'userdel -r [USER]                 # Delete user and their home directory',
            'id [USER]                         # View UID, GID, and groups for a user',
          ],
          bestPractices: [
            'Always verify with "id [username]" immediately after running usermod -aG to ensure proper group assignment.',
          ],
        },
      },
      {
        id: 'c-auth-files',
        command: 'sudo grep -E "^(root|deployer):" /etc/shadow',
        title: 'Core Auth Files: passwd & shadow',
        topicId: 'topic-07',
        topicNumber: '07',
        topicTitle: 'Users, Groups & sudo',
        subtitle: 'Anatomy of /etc/passwd (public descriptors), /etc/shadow (salted password hashes), and /etc/group.',
        badges: ['Intermediate', 'Security', 'Authentication'],
        quote: 'Password hashes were moved from /etc/passwd to /etc/shadow in the 1980s so regular users could not crack them.',
        difficulty: 'Intermediate',
        whatIsIt: 'The three core files that store Linux identity and authentication: `/etc/passwd` (world-readable user metadata), `/etc/shadow` (root-only secure password hashes with cryptographic salt), and `/etc/group` (group definitions).',
        inSimpleWords: '`/etc/passwd` is the public directory of all users on the computer (anyone can read it to see usernames and home folders). `/etc/shadow` is the locked bank vault that only root can open: it contains the secret, scrambled password hashes so hackers cannot steal them.',
        whyDoYouNeedIt: 'Understanding these files is mandatory for security auditing, Linux certifications (RHCSA/LPIC), and understanding how PAM (Pluggable Authentication Modules) validates logins.',
        realWorldAnalogy: '`/etc/passwd` is the company telephone directory posted on the lobby wall; `/etc/shadow` is the HR safe containing employee social security numbers and background checks.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT SHADOW PASSWORD SEPARATION',
            items: [
              'Password hashes stored directly in world-readable /etc/passwd',
              'Any unprivileged user or web application vulnerability can download hashes and crack them offline (John the Ripper / Hashcat)',
              'No account expiration or password aging policies',
            ],
            outcome: '🚨 Instant password compromise via local offline dictionary attacks',
          },
          with: {
            title: 'WITH /etc/shadow VAULT PROTECTION',
            items: [
              '/etc/shadow has permissions 0640 or 0600 (readable ONLY by root)',
              'Modern SHA-512 ($6$) or yescrypt ($y$) cryptographic salts prevent rainbow table attacks',
              'Built-in password expiration tracking (days since epoch, max age, warning days)',
              '/etc/passwd holds dummy "x" marker in password column',
            ],
            outcome: '🔒 Cryptographically resilient credentials protected from unprivileged processes',
          },
        },
        blockDiagram: {
          title: '/etc/passwd and /etc/shadow Field Mapping',
          subtitle: 'Click any colon-delimited field to inspect its strict schema definition:',
          nodes: [
            { id: 'field-user', label: 'Field 1: Username', simpleDef: 'Login name string (e.g. root, bob).', techDef: 'ASCII username matching regex standard.', badge: 'Field 1', color: '#38bdf8' },
            { id: 'field-pass', label: 'Field 2: Password Marker (x)', simpleDef: '"x" indicates password hash is stored in /etc/shadow.', techDef: 'Historically contained hash; now strictly "x" to point to shadow file.', badge: 'Field 2', color: '#a855f7' },
            { id: 'field-uid', label: 'Field 3 & 4: UID & GID', simpleDef: 'Numeric User ID and primary Group ID.', techDef: '32-bit integers representing kernel task identity.', badge: 'Field 3/4', color: '#10b981' },
            { id: 'field-paths', label: 'Field 6 & 7: Home & Shell', simpleDef: '/home/bob and /bin/bash.', techDef: 'Initial cwd and execve target upon authentication success.', badge: 'Field 6/7', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: '/etc/shadow', simple: 'The root-only file where scrambled password hashes live.', technical: 'Permissions -rw-r----- root:shadow. Contains username, salted hash, and expiration dates.', analogy: 'A biometric vault.' },
          { term: 'Cryptographic Salt ($6$ / $y$)', simple: 'Random characters added to a password before hashing so identical passwords produce completely different hashes.', technical: 'Unique per-user salt prepended to password to defeat pre-computed rainbow table attacks.', analogy: 'A pinch of unique seasoning added to every dish.' },
          { term: 'Password Lock (! or *)', simple: 'A bang (!) or asterisk (*) in /etc/shadow blocks password login.', technical: 'Prefixing hash with ! or * invalidates password evaluation, disabling password authentication.', analogy: 'Putting a padlock on a keyhole.' },
        ],
        whenToUse: [
          '✓ When checking which shell is assigned to a user (grep username /etc/passwd)',
          '✓ When verifying whether an account password is locked (sudo grep username /etc/shadow)',
          '✓ When auditing UID 0 accounts (only root should ever have UID 0!)',
        ],
        whenNotToUse: [
          '✕ Never edit /etc/passwd or /etc/shadow directly in a text editor (use vipw and vigr to prevent corrupting lock files)',
        ],
        syntaxCode: 'grep "^root:" /etc/passwd',
        syntaxTokens: [
          { token: 'grep', role: 'Command', explanation: 'Filter file.' },
          { token: '"^root:"', role: 'Pattern', explanation: 'Line starting with "root:".' },
          { token: '/etc/passwd', role: 'Target File', explanation: 'World-readable account file.' },
        ],
        variations: [
          { syntax: 'sudo vipw', title: 'Safely Edit /etc/passwd', whatItDoes: 'Opens /etc/passwd with file locking and syntax verification.', whenToUse: 'Safe manual account maintenance.' },
          { syntax: 'sudo vipw -s', title: 'Safely Edit /etc/shadow', whatItDoes: 'Opens /etc/shadow with file locking.', whenToUse: 'Manual password expiration changes.' },
          { syntax: "awk -F: '$3 == 0 {print $1}' /etc/passwd", title: 'Audit UID 0 Accounts', whatItDoes: 'Finds all accounts with superuser root privileges.', whenToUse: 'Security incident investigations.' },
        ],
        internalFlow: [
          { step: 1, title: 'User Enters Password', desc: 'Login prompt receives plaintext password from user.', why: 'User attempts authentication.', techDetail: 'Terminal disables echo' },
          { step: 2, title: 'Fetch Salt from /etc/shadow', desc: 'PAM authentication module reads the user\'s salt string from /etc/shadow.', why: 'Salt is needed to compute identical hash.', techDetail: 'pam_unix.so reads shadow hash' },
          { step: 3, title: 'Compute Cryptographic Hash', desc: 'Kernel/libc hashes user input with the salt using SHA-512 or yescrypt.', why: 'Produces hash string for comparison.', techDetail: 'crypt(input, salt)' },
          { step: 4, title: 'Compare in Constant Time', desc: 'Compares computed hash with stored shadow hash in constant time.', why: 'Matches credentials while preventing timing attacks.', techDetail: 'If match, spawns user shell defined in /etc/passwd' },
        ],
        sandbox: {
          initialCommands: [
            'head -n 3 /etc/passwd',
            'cut -d: -f1,3,7 /etc/passwd | head -n 5',
          ],
          guidedSteps: [
            { instruction: 'Inspect the first 3 lines of the world-readable /etc/passwd file', command: 'head -n 3 /etc/passwd', hint: 'Run head -n 3 /etc/passwd' },
            { instruction: 'Extract username, UID, and shell using cut', command: 'cut -d: -f1,3,7 /etc/passwd | head -n 5', hint: 'Run cut -d: -f1,3,7 /etc/passwd | head -n 5' },
          ],
          targetTask: 'Inspect user descriptors in /etc/passwd and understand field schemas.',
          solutionCommands: [
            'head -n 3 /etc/passwd',
            'cut -d: -f1,3,7 /etc/passwd | head -n 5',
          ],
        },
        commonMistakes: [
          { mistake: 'Opening /etc/passwd or /etc/shadow with "vim" or "nano" simultaneously across multiple terminals.', whyWrong: 'Can overwrite and corrupt the account database, locking all users out of the server.', correctWay: 'Always use "vipw" and "vipw -s", which enforce strict file locks.' },
          { mistake: 'Creating a secondary account with UID 0.', whyWrong: 'Any account with UID 0 has full root powers, creating backdoor risks.', correctWay: 'Only the "root" account should have UID 0; give regular accounts sudo access instead.' },
        ],
        challenge: {
          question: 'Why does the second field of /etc/passwd contain an "x" (e.g. "root:x:0:0:...") on modern Linux systems?',
          options: [
            { label: 'It indicates that the encrypted password hash is stored safely in /etc/shadow', isCorrect: true, explanation: 'Correct! The "x" is a pointer indicating credentials reside in the protected /etc/shadow file.' },
            { label: 'It means the user has no password', isCorrect: false, explanation: 'Incorrect.' },
            { label: 'It means the account has expired', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man5/passwd.5.html',
          syntaxCheatSheet: [
            'cat /etc/passwd        # Inspect all user account descriptors',
            'cat /etc/group         # Inspect group definitions',
            'sudo cat /etc/shadow   # Inspect shadow password hashes (root only)',
            'sudo vipw              # Safely edit /etc/passwd with file locking',
            'sudo vipw -s           # Safely edit /etc/shadow with file locking',
          ],
          bestPractices: [
            'Ensure /etc/shadow permissions are strictly 0640 or 0600 owned by root:shadow.',
          ],
        },
      },
      {
        id: 'c-sudo-visudo',
        command: 'sudo -i',
        title: 'Privilege Escalation: sudo & visudo',
        topicId: 'topic-07',
        topicNumber: '07',
        topicTitle: 'Users, Groups & sudo',
        subtitle: 'Granular administrative privileges, the /etc/sudoers file, visudo syntax checking, and NOPASSWD directives.',
        badges: ['Intermediate', 'Security', 'sudo'],
        quote: 'Never edit /etc/sudoers with a regular text editor—always use visudo to prevent syntax errors that lock you out of root.',
        difficulty: 'Intermediate',
        whatIsIt: '`sudo` (Superuser Do) allows approved users to run commands with root privileges while logging every action. The `/etc/sudoers` file defines who can run what, and `visudo` is the dedicated safe editor that locks the file and validates syntax before saving.',
        inSimpleWords: 'Instead of logging in as root all day (which is dangerous), you log in as yourself and type `sudo command` whenever you need administrator privileges. `visudo` is the safety tool used to grant sudo powers: it checks your spelling so you don\'t accidentally lock yourself out.',
        whyDoYouNeedIt: 'Sudo provides an immutable audit trail in `/var/log/auth.log`, enables timed password caching (15 minutes), and allows granular command restrictions without giving away full root control.',
        realWorldAnalogy: 'A security guard with a master key ring. Instead of handing the master key to an employee forever, the guard unlocks a specific room for them, logs their name in a visitor registry, and relocks the door.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT SUDO (Direct Root Login & su)',
            items: [
              'Developers must know the shared master root password',
              'Zero logging: root commands are anonymous with no record of who typed them',
              'Accidental typos like rm -rf / immediately destroy the live system',
              'A syntax error in /etc/sudoers locks every administrator out of the server permanently',
            ],
            outcome: '🚨 Broken servers, unidentifiable rogue actions, and permanent lockouts',
          },
          with: {
            title: 'WITH SUDO & VISUDO BEST PRACTICES',
            items: [
              'Users authenticate with their OWN personal password, not the root password',
              'Every sudo invocation is logged with username, timestamp, and exact command in /var/log/auth.log',
              'visudo syntax checking prevents corrupting the sudoers file',
              'Granular rules: allow developers to restart Nginx without granting full root shell access',
            ],
            outcome: '🛡️ Granular access control, complete audit trails, and zero lockout risk',
          },
        },
        blockDiagram: {
          title: 'sudo Authorization & Sudoers Evaluation Flow',
          subtitle: 'Click any component to inspect sudo security policy checks:',
          nodes: [
            { id: 'sudo-cmd', label: 'User Types sudo [cmd]', simpleDef: 'User requests elevated execution.', techDef: 'Process starts with SUID root binary /usr/bin/sudo.', badge: 'Invocation', color: '#38bdf8' },
            { id: 'sudo-auth', label: 'Password Verification (PAM)', simpleDef: 'Checks user\'s own password (cached 15m).', techDef: 'PAM pam_authenticate() queries shadow hash of calling user.', badge: 'PAM Auth', color: '#10b981' },
            { id: 'sudo-policy', label: '/etc/sudoers Policy Check', simpleDef: 'Checks if user or their group is permitted.', techDef: 'Parses /etc/sudoers and /etc/sudoers.d/* for matching User_Spec.', badge: 'Policy Match', color: '#a855f7' },
            { id: 'sudo-exec', label: 'Execute with Root EUID', simpleDef: 'Executes command as root and logs to auth.log.', techDef: 'Sets EUID=0, EGID=0, writes syslog notice, and calls execve().', badge: 'Root Exec', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'visudo', simple: 'The ONLY safe command to edit /etc/sudoers.', technical: 'Locks the sudoers file against concurrent edits and parses syntax with bison grammar before saving.', analogy: 'A spell-checker that refuses to save your document if it contains an error.' },
          { term: '%sudo or %wheel', simple: 'The percent sign (%) means this rule applies to an entire GROUP of users.', technical: 'Group specification in sudoers syntax granting sudo powers to all members of the group.', analogy: 'A pass that applies to all employees in the IT department.' },
          { term: 'NOPASSWD:', simple: 'Allows a specific script or command to run via sudo without asking for a password.', technical: 'Tag in sudoers entry bypassing password authentication for specific command paths.', analogy: 'An automated toll pass that lets emergency vehicles through without stopping.' },
        ],
        whenToUse: [
          '✓ When granting a user administrator powers (usermod -aG sudo [username])',
          '✓ When adding a specific automated deployment script to /etc/sudoers.d/deploy',
          '✓ When safely editing sudoers rules (sudo visudo)',
        ],
        whenNotToUse: [
          '✕ NEVER edit /etc/sudoers directly with nano or vim (a single syntax error will lock you out of root!)',
        ],
        syntaxCode: 'sudo visudo',
        syntaxTokens: [
          { token: 'sudo', role: 'Command', explanation: 'Run with elevated privileges.' },
          { token: 'visudo', role: 'Safety Utility', explanation: 'Safely edit sudoers file with locking and syntax validation.' },
        ],
        variations: [
          { syntax: 'sudo -i', title: 'Interactive Root Shell', whatItDoes: 'Simulates complete login as root with root environment and home.', whenToUse: 'Performing extended system maintenance.' },
          { syntax: 'sudo -l', title: 'List Privileges', whatItDoes: 'Lists all commands the current user is allowed to execute via sudo.', whenToUse: 'Checking your active administrative permissions.' },
          { syntax: 'sudo -u www-data cmd', title: 'Run as Specific User', whatItDoes: 'Executes command as www-data instead of root.', whenToUse: 'Testing service account permissions.' },
        ],
        internalFlow: [
          { step: 1, title: 'Verify SUID Binary', desc: 'User invokes /usr/bin/sudo (which has SUID root bit 4755).', why: 'sudo needs root privileges to inspect shadow files.', techDetail: 'Kernel sets EUID=0 on sudo process' },
          { step: 2, title: 'Authenticate User', desc: 'Prompts user for their password and checks PAM auth.', why: 'Verifies user identity.', techDetail: 'Caches timestamp in /run/sudo/ts/[user]' },
          { step: 3, title: 'Evaluate /etc/sudoers Rules', desc: 'Parses /etc/sudoers matching user or groups against rule table.', why: 'Determines if command is authorized.', techDetail: 'Checks command whitelist and restrictions' },
          { step: 4, title: 'Audit Log & Execve', desc: 'Logs entry to /var/log/auth.log and executes target binary.', why: 'Provides forensic audit trail.', techDetail: 'syslog(LOG_AUTH, "COMMAND=...") and execve()' },
        ],
        sandbox: {
          initialCommands: [
            'sudo -l',
            'whoami',
            'sudo whoami',
          ],
          guidedSteps: [
            { instruction: 'List your sudo privileges with sudo -l', command: 'sudo -l', hint: 'Run sudo -l' },
            { instruction: 'Check your current user identity', command: 'whoami', hint: 'Run whoami' },
            { instruction: 'Check elevated identity when run through sudo', command: 'sudo whoami', hint: 'Run sudo whoami' },
          ],
          targetTask: 'Verify sudo privileges and understand elevated execution.',
          solutionCommands: [
            'sudo -l',
            'whoami',
            'sudo whoami',
          ],
        },
        commonMistakes: [
          { mistake: 'Editing /etc/sudoers directly with "nano /etc/sudoers".', whyWrong: 'If you make a single typo (like a missing colon), sudo stops working immediately and NO ONE can use sudo to fix it!', correctWay: 'Always use "sudo visudo", which tests syntax and refuses to save if an error exists.' },
          { mistake: 'Granting "ALL=(ALL) NOPASSWD: ALL" to human developers.', whyWrong: 'Defeats security: malware running under that user can take over root without prompting.', correctWay: 'Require passwords for humans; use NOPASSWD only for specific automated scripts.' },
        ],
        challenge: {
          question: 'Why MUST you always use "visudo" instead of a regular text editor to edit /etc/sudoers?',
          options: [
            { label: 'visudo locks the file against concurrent edits and checks syntax before saving, preventing accidental permanent root lockouts', isCorrect: true, explanation: 'Correct! visudo verifies syntax grammar, preventing fatal errors that break sudo.' },
            { label: 'visudo encrypts the sudoers file so hackers cannot read it', isCorrect: false, explanation: 'Incorrect.' },
            { label: 'visudo is the only tool that can open files in /etc', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man8/visudo.8.html',
          syntaxCheatSheet: [
            'sudo [COMMAND]        # Execute single command with root privileges',
            'sudo -i               # Open interactive root login shell',
            'sudo -l               # List permitted sudo commands for current user',
            'sudo visudo           # Safely edit /etc/sudoers',
            'sudo -u [USER] [CMD]  # Run command as a specific user instead of root',
          ],
          bestPractices: [
            'Place custom sudo rules in modular files inside /etc/sudoers.d/ instead of editing /etc/sudoers directly.',
          ],
        },
      },
    ],
  },

  // =========================================================================
  // TOPIC 08: LINUX STORAGE & FILESYSTEM MANAGEMENT
  // =========================================================================
  {
    id: 'topic-08',
    number: '08',
    title: 'Storage, Disks & Filesystems',
    iconName: 'Database',
    description: 'Block devices (lsblk), partitioning (fdisk), mkfs filesystems, mount, /etc/fstab, df, du, and LVM.',
    concepts: [
      {
        id: 'c-storage-block-devices',
        command: 'lsblk -f',
        title: 'Block Devices & Partitions',
        topicId: 'topic-08',
        topicNumber: '08',
        topicTitle: 'Storage, Disks & Filesystems',
        subtitle: 'Inspecting physical and virtual disks (lsblk, fdisk -l, parted) and partition tables (GPT vs MBR).',
        badges: ['Intermediate', 'Storage', 'Hardware'],
        quote: 'In Linux, disks and partitions are represented as block special files in /dev (e.g. /dev/sda, /dev/nvme0n1p1).',
        difficulty: 'Intermediate',
        whatIsIt: 'Block devices represent non-volatile physical or virtual storage drives (NVMe, SSDs, HDDs, EBS volumes) that read and write data in fixed-size blocks (typically 512 bytes or 4KB). Partition tables (GPT or MBR) divide physical disks into logical slices called partitions.',
        inSimpleWords: 'When you plug in a new hard drive or cloud volume, Linux detects it as a device like `/dev/sdb` or `/dev/nvme0n1`. `lsblk` displays your disks and partitions like a family tree, showing you which partitions exist and where they are plugged in.',
        whyDoYouNeedIt: 'Cloud and DevOps engineers frequently attach new EBS/cloud disks, resize volumes, and partition storage for databases and Kubernetes persistent volumes.',
        realWorldAnalogy: 'A raw plot of land (Block Device) that a surveyor divides into numbered residential lots (Partitions) before builders lay the concrete foundations (Filesystems).',
        withoutVsWith: {
          without: {
            title: 'WITHOUT BLOCK DEVICE VISIBILITY',
            items: [
              'Attaching a new 500GB cloud disk but being unable to find its device name',
              'Accidentally formatting the operating system drive (/dev/sda) instead of the data drive (/dev/sdb)',
              'Hitting the 2TB disk limit of legacy MBR partition tables',
              'Unmounted disks sitting idle while server reports disk full errors',
            ],
            outcome: '💥 Accidental root disk destruction and wasted cloud storage spend',
          },
          with: {
            title: 'WITH DISK & PARTITION MASTERY',
            items: [
              'lsblk -f clearly displays device names, UUIDs, filesystem types, and mount points',
              'Modern GPT (GUID Partition Table) supports disks up to 9.4 Zettabytes and 128 partitions',
              'Verify partition alignment for optimal NVMe flash performance',
              'Target disk operations with 100% confidence',
            ],
            outcome: '⚡ Confident storage provisioning, zero data loss, and seamless cloud scaling',
          },
        },
        blockDiagram: {
          title: 'Linux Block Device Storage Hierarchy',
          subtitle: 'Click any storage layer to inspect device naming and partition structure:',
          nodes: [
            { id: 'blk-hw', label: 'Physical Storage (NVMe / SATA / EBS)', simpleDef: 'The physical flash drive or cloud block storage volume.', techDef: 'Non-volatile hardware controller communicating over PCIe (NVMe) or AHCI (SATA).', badge: 'Hardware', color: '#f59e0b' },
            { id: 'blk-dev', label: 'Raw Block Device (/dev/nvme0n1 or /dev/sda)', simpleDef: 'The special block device file in /dev representing the whole disk.', techDef: 'Block special device node created by udev (major/minor numbers).', badge: 'Raw Disk', color: '#38bdf8' },
            { id: 'blk-part', label: 'Partition Table (/dev/nvme0n1p1, p2)', simpleDef: 'The sliced partitions dividing the disk.', techDef: 'GPT (GUID Partition Table) with primary and backup partition headers.', badge: 'Partition', color: '#a855f7' },
            { id: 'blk-fs', label: 'Formatted Filesystem (ext4 / xfs)', simpleDef: 'The filesystem holding directories and files.', techDef: 'Superblock, inode tables, and data block groups mounted into the VFS tree.', badge: 'Mounted FS', color: '#10b981' },
          ],
        },
        terms: [
          { term: 'lsblk', simple: 'Lists all storage block devices in a clear tree format.', technical: 'Queries sysfs (/sys/block/) and udev database to display block device tree.', analogy: 'A blueprint showing all rooms in a building.' },
          { term: 'GPT vs MBR', simple: 'GPT is the modern standard (handles huge disks); MBR is legacy (limited to 2TB).', technical: 'GUID Partition Table (UEFI standard, 128 partitions, 64-bit LBA) vs Master Boot Record (legacy, 4 primary partitions, 32-bit LBA).', analogy: 'Modern digital blueprint vs a paper index card.' },
          { term: 'Block Device (/dev/sdX)', simple: 'A storage drive that transfers data in chunks (blocks) rather than single characters.', technical: 'Device file with S_IFBLK type supporting random access and buffer cache in kernel.', analogy: 'A shipping crate holding standardized boxes.' },
        ],
        whenToUse: [
          '✓ When verifying that a newly attached cloud disk is recognized by the OS (lsblk)',
          '✓ When partitioning a new drive using gdisk or parted',
          '✓ When checking UUIDs of storage partitions before mounting (lsblk -f)',
        ],
        whenNotToUse: [
          '✕ Never run fdisk or mkfs on a device if you are not 100% certain it is the intended secondary disk!',
        ],
        syntaxCode: 'lsblk -f',
        syntaxTokens: [
          { token: 'lsblk', role: 'Command', explanation: 'List block devices.' },
          { token: '-f', role: 'Flag', explanation: 'Filesystems: display filesystem type (ext4, xfs), label, and UUID.' },
        ],
        variations: [
          { syntax: 'lsblk', title: 'Default Tree View', whatItDoes: 'Shows device names, sizes, type (disk/part), and mount points.', whenToUse: 'Quick disk size check.' },
          { syntax: 'sudo fdisk -l', title: 'Detailed Partition Tables', whatItDoes: 'Dumps partition sector start/end, disk identifiers, and partition models.', whenToUse: 'Low-level partition analysis.' },
          { syntax: 'sudo parted -l', title: 'Parted Partition List', whatItDoes: 'Displays GPT partition labels, alignment, and partition types.', whenToUse: 'Modern GPT disk management.' },
        ],
        internalFlow: [
          { step: 1, title: 'Kernel Detects Hardware', desc: 'PCIe or USB bus signals new storage device; kernel loads driver.', why: 'Initializes controller communication.', techDetail: 'nvme or ahci driver probes device' },
          { step: 2, title: 'udev Creates Device Node', desc: 'udev daemon reads kernel uevent and creates /dev/nvme0n1 block device.', why: 'Provides user-space access point.', techDetail: 'mknod() creates block device file in /dev' },
          { step: 3, title: 'Kernel Reads Partition Table', desc: 'Kernel reads sector 0-33 to parse GPT partition boundaries.', why: 'Detects partitions /dev/nvme0n1p1, p2.', techDetail: 'Populates sysfs entries in /sys/block/' },
          { step: 4, title: 'lsblk Formats Output', desc: 'lsblk queries libblkid and sysfs to render formatted tree.', why: 'Displays storage hierarchy to user.', techDetail: 'Parses /sys/dev/block/ attributes' },
        ],
        sandbox: {
          initialCommands: [
            'lsblk',
            'lsblk -f',
          ],
          guidedSteps: [
            { instruction: 'Inspect block storage devices in tree format', command: 'lsblk', hint: 'Run lsblk' },
            { instruction: 'Inspect block devices with filesystem types and UUIDs', command: 'lsblk -f', hint: 'Run lsblk -f' },
          ],
          targetTask: 'Examine disk layout and partition structures using lsblk.',
          solutionCommands: [
            'lsblk',
            'lsblk -f',
          ],
        },
        commonMistakes: [
          { mistake: 'Formatting "/dev/sda" instead of "/dev/sda1".', whyWrong: '/dev/sda represents the entire raw drive; /dev/sda1 represents partition 1. Formatting the raw drive wipes the partition table!', correctWay: 'Format specific partitions like /dev/sda1, or use whole disks only if managed by LVM.' },
          { mistake: 'Relying on transient device node names like /dev/sdb instead of UUIDs in /etc/fstab.', whyWrong: 'Kernel device discovery order can shift on reboot (e.g. /dev/sdb becoming /dev/sdc), causing boot failure or mounting the wrong filesystem.', correctWay: 'Always query `blkid` and mount filesystems using permanent UUID identifiers (`UUID=... /data ext4 defaults 0 2`).' },
        ],
        challenge: {
          question: 'What is the maximum disk size limit supported by the legacy MBR partition scheme?',
          options: [
            { label: '2 Terabytes (2TB)', isCorrect: true, explanation: 'Correct! 32-bit sector addressing in MBR caps partition size at 2TB.' },
            { label: '500 Gigabytes', isCorrect: false, explanation: 'Incorrect.' },
            { label: '100 Terabytes', isCorrect: false, explanation: 'Incorrect. GPT is required for disks over 2TB.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man8/lsblk.8.html',
          syntaxCheatSheet: [
            'lsblk                  # View all disks and partitions in tree view',
            'lsblk -f               # View filesystems, labels, and UUIDs',
            'sudo fdisk -l          # Low-level partition layout and sector counts',
            'sudo blkid             # Print UUIDs and filesystem signatures',
          ],
          bestPractices: [
            'Always verify with lsblk -f before running mkfs to double-check that you are targeting an unformatted secondary partition.',
          ],
        },
      },
      {
        id: 'c-filesystems-mkfs-mount',
        command: 'sudo mount -o defaults,noatime /dev/sdb1 /mnt/data',
        title: 'Filesystem Creation & Mounting: fstab',
        topicId: 'topic-08',
        topicNumber: '08',
        topicTitle: 'Storage, Disks & Filesystems',
        subtitle: 'Formatting with mkfs (ext4, xfs), mounting drives, and persistent boot configuration in /etc/fstab.',
        badges: ['Intermediate', 'Storage', 'Filesystems'],
        quote: 'A hard drive is just raw magnetic or flash sectors until mkfs formats it with an organized filesystem.',
        difficulty: 'Intermediate',
        whatIsIt: 'Formatting raw storage partitions with a filesystem (`mkfs.ext4`, `mkfs.xfs`), attaching that filesystem into the Linux directory tree (`mount`), and configuring persistent mounting across reboots via `/etc/fstab` using UUIDs.',
        inSimpleWords: 'Formatting a partition (`mkfs.ext4`) draws the lanes, folders, and filing cabinets onto an empty hard drive. Mounting (`mount`) connects that hard drive to a specific folder (like `/mnt/data`) so you can access it. `/etc/fstab` makes sure the drive mounts automatically every time the computer boots.',
        whyDoYouNeedIt: 'Attaching persistent storage disks in AWS/GCP/Azure, provisioning database volumes, and preventing servers from hanging on reboot due to missing fstab entries.',
        realWorldAnalogy: 'Formatting is like printing lines in a blank notebook; mounting is placing that notebook onto a designated bookshelf in the library so people can read it.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT PROPER MOUNTING & FSTAB CONFIGURATION',
            items: [
              'Using unstable device names like /dev/sdb1 in /etc/fstab (reboots can randomly rename drives to /dev/sdc1!)',
              'A typo in /etc/fstab drops the entire server into Emergency Recovery Mode on reboot',
              'Drives unmount on reboot, causing database services to crash',
              'Performance degradation from default "atime" updates on every file read',
            ],
            outcome: '🚨 Boot failures, emergency shell lockouts, and unmounted database drives',
          },
          with: {
            title: 'WITH UUID-BASED FSTAB & OPTIMIZED MOUNT OPTIONS',
            items: [
              'UUIDs (Universally Unique Identifiers) guarantee 100% reliable disk mounting regardless of bus changes',
              'Mount options like "noatime" eliminate disk write overhead on file reads',
              '"nofail" option ensures server boots cleanly even if an external cloud disk is temporarily detached',
              'Test fstab with "mount -a" before rebooting to catch syntax errors safely',
            ],
            outcome: '🛡️ Rock-solid reboots, high I/O throughput, and reliable persistent storage',
          },
        },
        blockDiagram: {
          title: 'Linux Mount Process & VFS Attachment Architecture',
          subtitle: 'Click any component to inspect filesystem mounting into the root tree:',
          nodes: [
            { id: 'mnt-block', label: 'Partition with UUID (/dev/sdb1)', simpleDef: 'The formatted block storage partition.', techDef: 'Block device containing ext4/xfs superblock, inode table, and data blocks.', badge: 'Storage', color: '#38bdf8' },
            { id: 'mnt-point', label: 'Mount Point Directory (/mnt/data)', simpleDef: 'The empty folder in the Linux tree where the drive attaches.', techDef: 'Existing directory whose inode is overlaid by the mounted filesystem root inode.', badge: 'Mount Point', color: '#10b981' },
            { id: 'mnt-fstab', label: '/etc/fstab Configuration Table', simpleDef: 'The master configuration table read at boot time.', techDef: 'Static filesystem table parsed by systemd-fstab-generator during boot.', badge: 'fstab Spec', color: '#a855f7' },
            { id: 'mnt-vfs', label: 'Virtual Filesystem (VFS)', simpleDef: 'The unified Linux tree presenting files seamlessly.', techDef: 'Kernel VFS mount table providing unified POSIX API across all filesystems.', badge: 'Unified VFS', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'UUID (Universally Unique Identifier)', simple: 'A 128-bit unique fingerprint permanently burned into the filesystem.', technical: 'Filesystem superblock UUID that never changes even if drive is moved to a different controller.', analogy: 'A vehicle VIN number that stays identical even if the license plate changes.' },
          { term: '/etc/fstab', simple: 'The configuration file listing all filesystems to mount on boot.', technical: '6-column configuration file: Device/UUID, MountPoint, FSType, Options, Dump, Pass.', analogy: 'A seating chart for all your hard drives at the dinner table.' },
          { term: 'mount -a', simple: 'Mounts all filesystems listed in /etc/fstab that are not currently mounted.', technical: 'Crucial test command used after editing fstab to verify syntax without rebooting.', analogy: 'Testing a light switch before closing the electrical panel.' },
        ],
        whenToUse: [
          '✓ When formatting a newly created partition (sudo mkfs.ext4 /dev/nvme0n1p1)',
          '✓ When mounting a disk temporarily (sudo mount /dev/sdb1 /mnt/data)',
          '✓ When configuring permanent boot mounting in /etc/fstab',
        ],
        whenNotToUse: [
          '✕ Never reboot a server after editing /etc/fstab without testing it first using "sudo mount -a"!',
        ],
        syntaxCode: 'sudo mount -o defaults,noatime UUID=3a7b-8c9d /mnt/data',
        syntaxTokens: [
          { token: 'mount', role: 'Command', explanation: 'Mount a filesystem.' },
          { token: '-o defaults,noatime', role: 'Mount Options', explanation: 'Standard options with noatime (disables updating file access timestamps for performance).' },
          { token: 'UUID=3a7b-8c9d', role: 'Device Identifier', explanation: 'Immutable filesystem UUID.' },
          { token: '/mnt/data', role: 'Mount Point', explanation: 'Target directory in root tree.' },
        ],
        variations: [
          { syntax: 'sudo mkfs.ext4 -L DataDisk /dev/sdb1', title: 'Format as ext4 with Label', whatItDoes: 'Creates ext4 filesystem and assigns label.', whenToUse: 'Preparing new storage partition.' },
          { syntax: 'sudo mkfs.xfs -f /dev/sdb1', title: 'Format as XFS', whatItDoes: 'Formats with high-performance XFS (default on RHEL).', whenToUse: 'High-throughput database partitions.' },
          { syntax: 'sudo umount /mnt/data', title: 'Unmount Filesystem', whatItDoes: 'Detaches filesystem safely from mount point.', whenToUse: 'Safely disconnecting storage.' },
          { syntax: 'sudo mount -a', title: 'Test /etc/fstab Syntax', whatItDoes: 'Mounts all fstab entries; prints errors if syntax is invalid.', whenToUse: 'Mandatory verification before rebooting.' },
        ],
        internalFlow: [
          { step: 1, title: 'Read Superblock', desc: 'mount reads sector 0-1024 of partition to verify filesystem magic number (e.g. 0xEF53 for ext4).', why: 'Validates filesystem integrity.', techDetail: 'read() reads superblock metadata' },
          { step: 2, title: 'Verify Mount Point', desc: 'Checks that /mnt/data directory exists and is accessible.', why: 'Must have valid target inode.', techDetail: 'stat("/mnt/data")' },
          { step: 3, title: 'Kernel mount() Syscall', desc: 'Invokes mount() syscall with source, target, fstype, and flags.', why: 'Links filesystem into kernel VFS mount table.', techDetail: 'mount(source, target, "ext4", MS_NOATIME, NULL)' },
          { step: 4, title: 'VFS Inode Overlay', desc: 'Kernel overlays /mnt/data inode pointer with mounted filesystem root inode.', why: 'Files on disk are now visible inside /mnt/data.', techDetail: 'Updates struct vfsmount dentry tree' },
        ],
        sandbox: {
          initialCommands: [
            'findmnt --types ext4,xfs',
            'cat /etc/fstab | grep -v "^#" | grep -v "^$"',
          ],
          guidedSteps: [
            { instruction: 'Inspect currently mounted ext4 and xfs filesystems', command: 'findmnt --types ext4,xfs', hint: 'Run findmnt --types ext4,xfs' },
            { instruction: 'Examine active boot mount entries in /etc/fstab', command: 'cat /etc/fstab | grep -v "^#" | grep -v "^$"', hint: 'Run cat /etc/fstab | grep -v "^#" | grep -v "^$"' },
          ],
          targetTask: 'Examine mounted filesystems and fstab boot configurations.',
          solutionCommands: [
            'findmnt --types ext4,xfs',
            'cat /etc/fstab | grep -v "^#" | grep -v "^$"',
          ],
        },
        commonMistakes: [
          { mistake: 'Using device names like "/dev/sdb1" instead of "UUID=..." in /etc/fstab.', whyWrong: 'Linux disk naming is dynamic. If a drive fails or cables are rearranged, /dev/sdb can become /dev/sdc, causing the wrong disk to mount or boot failure!', correctWay: 'Always use "UUID=..." from "blkid" or "lsblk -f".' },
          { mistake: 'Rebooting after editing /etc/fstab without running "mount -a".', whyWrong: 'If there is a typo in fstab, the machine will fail to boot and drop into emergency mode requiring physical console access.', correctWay: 'Always run "sudo mount -a" immediately after editing fstab. If it returns 0 errors, your fstab is safe!' },
        ],
        challenge: {
          question: 'What command must you ALWAYS run after modifying /etc/fstab to verify there are no syntax errors before rebooting?',
          options: [
            { label: 'sudo mount -a', isCorrect: true, explanation: 'Correct! "mount -a" parses /etc/fstab and attempts to mount all filesystems, catching syntax errors safely.' },
            { label: 'sudo reboot', isCorrect: false, explanation: 'Incorrect. Rebooting without testing can brick your server if fstab has a syntax error.' },
            { label: 'sudo fdisk -l', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man5/fstab.5.html',
          syntaxCheatSheet: [
            'sudo mkfs.ext4 [DEV]            # Format partition as ext4',
            'sudo mount [DEV] [MOUNTPOINT]   # Mount partition to directory',
            'sudo umount [MOUNTPOINT]        # Safely unmount partition',
            'sudo mount -a                   # Test all fstab entries (CRITICAL)',
            'findmnt                         # Interactive tree of mounted filesystems',
          ],
          bestPractices: [
            'In /etc/fstab, always add "nofail" to non-root cloud disks (e.g. "defaults,nofail,noatime") so the server boots cleanly even if an attached volume is missing.',
          ],
        },
      },
      {
        id: 'c-storage-df-du',
        command: 'df -hT && du -sh *',
        title: 'Storage & Inode Forensics: df & du',
        topicId: 'topic-08',
        topicNumber: '08',
        topicTitle: 'Storage, Disks & Filesystems',
        subtitle: 'Diagnosing disk space exhaustion (df -h), inode exhaustion (df -i), and finding large folders (du -sh).',
        badges: ['Intermediate', 'Storage', 'Troubleshooting'],
        quote: 'A disk can be "full" even when it has 500GB of free space if it runs out of Inodes.',
        difficulty: 'Intermediate',
        whatIsIt: 'The primary storage troubleshooting tools: `df` (disk free) displays filesystem capacity, free space, and inode consumption; `du` (disk usage) measures file space usage within directory trees to identify the files and folders consuming disk space.',
        inSimpleWords: '`df -h` tells you: "How full is the entire hard drive?". `du -sh *` tells you: "Which specific folder inside this directory is eating up all my gigabytes?". `df -i` checks if you ran out of file numbers (inodes), which happens when millions of tiny files are created.',
        whyDoYouNeedIt: 'Resolving production "No space left on device" emergencies, finding runaway log files, and debugging ghost deleted files held open by running processes.',
        realWorldAnalogy: '`df` is the fuel gauge on your car dashboard telling you how many gallons remain in the tank. `du` is looking under the seats and in the trunk to find which heavy suitcases are weighing the car down.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT STORAGE FORENSIC MASTERY',
            items: [
              'Server reports "No space left on device" but df says 80% free (baffled by Inode exhaustion!)',
              'Deleting a 50GB log file with rm, but df still shows 100% full (ghost deleted file held open by process)',
              'Randomly deleting files hoping to free up space',
              'Databases crashing due to unmonitored disk filling',
            ],
            outcome: '😵 Extended downtime, unexplained disk errors, and panic deletions',
          },
          with: {
            title: 'WITH SYSTEMATIC DISK & INODE FORENSICS',
            items: [
              'df -hT reveals capacity and filesystem types across all mount points instantly',
              'df -i detects Inode exhaustion immediately',
              'lsof +L1 reveals deleted files still consuming space because a process holds them open',
              'du -sh * | sort -h identifies the top space-consuming folders in seconds',
            ],
            outcome: '⚡ 60-second root cause diagnosis and permanent disk stability',
          },
        },
        blockDiagram: {
          title: 'Disk Space vs Inode Exhaustion & Ghost Files',
          subtitle: 'Click any component to inspect how space vs inodes are consumed:',
          nodes: [
            { id: 'fs-blocks', label: 'Disk Data Blocks (df -h)', simpleDef: 'The physical gigabytes of storage space on the disk.', techDef: 'Storage block capacity. Consumed by large files (videos, databases, logs).', badge: 'Byte Storage', color: '#38bdf8' },
            { id: 'fs-inodes', label: 'Filesystem Inode Table (df -i)', simpleDef: 'The fixed number of file identity cards allocated at format time.', techDef: 'Pre-allocated inode array. Consumed when millions of tiny files exist (cache, sessions).', badge: 'Inode Table', color: '#f59e0b' },
            { id: 'fs-ghost', label: 'Ghost Deleted Files (lsof +L1)', simpleDef: 'Files deleted with rm but still held open by a running process.', techDef: 'Inode link_count=0, but open file descriptor in process keeps blocks allocated.', badge: 'Ghost Hold', color: '#ef4444' },
          ],
        },
        terms: [
          { term: 'df -h', simple: 'Disk Free in human-readable units (GB, MB).', technical: 'Invokes statvfs() system call to read filesystem block metrics from superblock.', analogy: 'A gas gauge on a car.' },
          { term: 'df -i (Inode Exhaustion)', simple: 'Checks how many file passport numbers are left.', technical: 'Displays total and free inodes. Ext4 has a fixed inode count; running out prevents creating any new file.', analogy: 'Running out of blank passport pages even if you have money in your wallet.' },
          { term: 'Ghost Deleted File', simple: 'A deleted file whose disk space is NOT freed because a program still has it open.', technical: 'Occurs when unlink() drops link count to 0, but process still holds open file descriptor.', analogy: 'Throwing away a lease while the tenant is still living in the apartment.' },
        ],
        whenToUse: [
          '✓ When diagnosing "No space left on device" errors (df -h && df -i)',
          '✓ When finding which directories are eating disk space (du -sh /var/* | sort -h)',
          '✓ When space is not freed after deleting a large log file (lsof +L1)',
        ],
        whenNotToUse: [
          '✕ Do not run "du /" across the entire root filesystem without --exclude=/proc (procfs contains virtual files that cause infinite loops or errors)',
        ],
        syntaxCode: 'df -hT && du -sh /var/log/* | sort -h',
        syntaxTokens: [
          { token: 'df -hT', role: 'Capacity Check', explanation: 'Human-readable disk free with filesystem types.' },
          { token: 'du -sh', role: 'Usage Measurement', explanation: 'Summary size for each directory entry in human units.' },
          { token: 'sort -h', role: 'Sorter', explanation: 'Human-numeric sort (sorts K, M, G in ascending order).' },
        ],
        variations: [
          { syntax: 'df -i', title: 'Check Inode Usage', whatItDoes: 'Shows percent of inodes used on each filesystem.', whenToUse: 'When df -h shows free space but files cannot be created.' },
          { syntax: 'sudo lsof +L1', title: 'Find Ghost Deleted Files', whatItDoes: 'Finds deleted files held open by running processes.', whenToUse: 'When rm didn\'t free disk space.' },
          { syntax: 'du -ah --max-depth=1 /var | sort -rh | head -n 10', title: 'Top 10 Folders', whatItDoes: 'Finds the 10 largest folders inside /var.', whenToUse: 'Hunting down runaway disk usage.' },
        ],
        internalFlow: [
          { step: 1, title: 'df Invokes statvfs()', desc: 'df queries kernel for superblock block counts (f_blocks, f_bfree).', why: 'Reads instant filesystem statistics.', techDetail: 'statvfs() system call executes in <1ms' },
          { step: 2, title: 'du Traverses Directory Tree', desc: 'du recursively crawls directories, stat-ing each file to sum file sizes.', why: 'Computes real folder space usage.', techDetail: 'Uses fts() or nftw() directory traversal' },
          { step: 3, title: 'Calculate Human Units', desc: 'Formats byte counts into powers of 1024 (KiB, MiB, GiB).', why: 'Human readability.', techDetail: 'Divided by 1024^N' },
          { step: 4, title: 'Sort & Output', desc: 'Piped through sort -h to display largest directories at the bottom.', why: 'Directs admin focus to largest directories.', techDetail: 'stdout print' },
        ],
        sandbox: {
          initialCommands: [
            'df -h',
            'df -i',
            'du -sh /var/log',
          ],
          guidedSteps: [
            { instruction: 'Inspect filesystem disk capacity with df -h', command: 'df -h', hint: 'Run df -h' },
            { instruction: 'Inspect inode utilization with df -i', command: 'df -i', hint: 'Run df -i' },
            { instruction: 'Calculate the total size of /var/log with du -sh', command: 'du -sh /var/log', hint: 'Run du -sh /var/log' },
          ],
          targetTask: 'Diagnose storage capacity and inode usage.',
          solutionCommands: [
            'df -h',
            'df -i',
            'du -sh /var/log',
          ],
        },
        commonMistakes: [
          { mistake: 'Deleting a huge active log file with "rm log.txt" and wondering why df still shows 100% full.', whyWrong: 'If Nginx or another process still holds log.txt open, the disk space will NOT be freed until the process is restarted or truncated!', correctWay: 'Truncate the file in place with "true > log.txt" or restart the service holding it open.' },
          { mistake: 'Forgetting to check "df -i" when receiving "No space left on device".', whyWrong: 'You can have 500GB of free disk space, but if you have millions of tiny 1-byte files (like PHP sessions or mail spools), you hit 100% inode capacity and cannot create files!', correctWay: 'Always check both df -h and df -i during storage incidents.' },
        ],
        challenge: {
          question: 'You delete a 50GB log file using "rm server.log", but "df -h" still shows 100% disk usage. What is the cause?',
          options: [
            { label: 'A running process still has the file open, so the kernel keeps the data blocks allocated until the process closes the file descriptor', isCorrect: true, explanation: 'Correct! The blocks are only freed when the link count reaches 0 AND all open file descriptors are closed.' },
            { label: 'The file is in the trash bin', isCorrect: false, explanation: 'Incorrect. Linux rm has no trash bin.' },
            { label: 'Linux needs to be rebooted to notice deleted files', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man1/df.1.html',
          syntaxCheatSheet: [
            'df -h                 # Disk free in human units (GB/MB)',
            'df -i                 # Inode usage percentage',
            'du -sh [DIR]          # Total disk usage summary of directory',
            'du -sh * | sort -h    # Rank immediate folders by size',
            'sudo lsof +L1         # Find deleted files still held open by processes',
            ': > file.log          # Truncate file in place without unlinking inode',
          ],
          bestPractices: [
            'When clearing a huge log file held by a running service, truncate it in place with ": > file.log" instead of rm to free space immediately.',
          ],
        },
      },
    ],
  },

  // =========================================================================
  // TOPIC 09: NETWORKING & SOCKET OPERATIONS
  // =========================================================================
  {
    id: 'topic-09',
    number: '09',
    title: 'Networking, Sockets & DNS',
    iconName: 'Network',
    description: 'Modern iproute2 (ip addr, ip route), listening sockets (ss -tulpn), DNS (/etc/resolv.conf, dig), and curl.',
    concepts: [
      {
        id: 'c-network-ip-interfaces',
        command: 'ip addr show',
        title: 'Network Interfaces: ip addr & ip link',
        topicId: 'topic-09',
        topicNumber: '09',
        topicTitle: 'Networking, Sockets & DNS',
        subtitle: 'Replacing legacy ifconfig with modern iproute2 (ip addr, ip link, CIDR subnet masks).',
        badges: ['Intermediate', 'Networking', 'iproute2'],
        quote: 'ifconfig was deprecated over 15 years ago—modern Linux systems exclusively use the ip tool from iproute2.',
        difficulty: 'Intermediate',
        whatIsIt: 'The modern `iproute2` suite command `ip` manages network interfaces (`ip link`), IP addresses (`ip addr`), and link states. It interacts directly with the Linux kernel Netlink socket interface, replacing obsolete legacy tools like `ifconfig` and `route`.',
        inSimpleWords: '`ip addr` shows you all the network cards on your computer, their IP addresses (like `192.168.1.50`), and their MAC addresses. `ip link set dev eth0 up` turns a network card on or off.',
        whyDoYouNeedIt: 'Every cloud server, virtual machine, and Docker container relies on `ip` commands to verify IP assignments, inspect MTU sizes, and debug network interface issues.',
        realWorldAnalogy: 'Inspecting your house\'s electrical panel. `ip link` shows which circuit breakers are flipped on; `ip addr` shows the voltage and device assigned to each circuit.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT MODERN IPROUTE2 TOOLS (Using Obsolete ifconfig)',
            items: [
              'ifconfig is not installed on modern cloud Linux distributions (command not found)',
              'ifconfig fails to show secondary IP addresses and modern VLAN tags',
              'Cannot inspect modern Linux virtual ethernet (veth) and bridge pairs',
              'Old shell scripts break on modern Debian, Ubuntu, and RHEL releases',
            ],
            outcome: '🚫 "ifconfig: command not found" errors and incomplete network visibility',
          },
          with: {
            title: 'WITH MODERN IPROUTE2 MASTERY (ip addr & ip link)',
            items: [
              'ip addr displays primary and secondary IP addresses in standard CIDR notation (/24, /16)',
              'Inspect link state (UP/DOWN), MAC address, and MTU (Maximum Transmission Unit)',
              'Works universally across every modern Linux cloud distribution and container',
              'Manipulates virtual bridges, veth pairs, and wireguard interfaces seamlessly',
            ],
            outcome: '🌐 Fast, universal, and authoritative network interface diagnostics',
          },
        },
        blockDiagram: {
          title: 'Linux Kernel Netlink & Interface Subsystem',
          subtitle: 'Click any component to inspect how ip interacts with kernel netdevices:',
          nodes: [
            { id: 'net-ip-cmd', label: 'ip addr Utility', simpleDef: 'The user-space command you type in terminal.', techDef: 'iproute2 CLI utility communicating via AF_NETLINK socket.', badge: 'CLI', color: '#38bdf8' },
            { id: 'net-netlink', label: 'Kernel Netlink Socket (rtnetlink)', simpleDef: 'The high-speed messaging bridge inside the kernel.', techDef: 'NETLINK_ROUTE IPC socket protocol for querying and modifying network state.', badge: 'Netlink IPC', color: '#a855f7' },
            { id: 'net-dev', label: 'Kernel Network Device (struct net_device)', simpleDef: 'The driver representing eth0, ens3, or lo.', techDef: 'Kernel net_device abstraction managing RX/TX ring buffers and packet queuing.', badge: 'Net Device', color: '#10b981' },
          ],
        },
        terms: [
          { term: 'CIDR Notation (/24, /16)', simple: 'A shorthand way to write subnet masks (e.g. 192.168.1.0/24 means 256 IP addresses).', technical: 'Classless Inter-Domain Routing prefix length denoting the number of leading 1 bits in the netmask.', analogy: 'A zip code defining the size of a postal zone.' },
          { term: 'Loopback Interface (lo / 127.0.0.1)', simple: 'The internal virtual network adapter that talks only to your own computer.', technical: 'Software-only interface routing packets entirely within host memory without touching physical wires.', analogy: 'Talking to yourself in the mirror.' },
          { term: 'MTU (Maximum Transmission Unit)', simple: 'The maximum size of a single network packet (usually 1500 bytes).', technical: 'Maximum payload size in bytes that can be transferred in a single physical link layer frame.', analogy: 'The maximum package dimensions accepted by the post office.' },
        ],
        whenToUse: [
          '✓ When checking the server\'s private and public IP addresses (ip -br addr)',
          '✓ When troubleshooting network link failures (ip link show)',
          '✓ When debugging container virtual ethernet pairs (veth) and bridges',
        ],
        whenNotToUse: [
          '✕ Never rely on ifconfig in modern scripts or Dockerfiles (ifconfig is deprecated)',
        ],
        syntaxCode: 'ip -br addr show',
        syntaxTokens: [
          { token: 'ip', role: 'Command', explanation: 'iproute2 network configuration tool.' },
          { token: '-br', role: 'Brief Flag', explanation: 'Brief table format: prints one clean line per interface.' },
          { token: 'addr', role: 'Object', explanation: 'Network address management.' },
          { token: 'show', role: 'Action', explanation: 'Display active addresses.' },
        ],
        variations: [
          { syntax: 'ip -br addr', title: 'Brief Table Format', whatItDoes: 'Displays interface, state (UP/DOWN), and IP on a single line.', whenToUse: 'Quickest human check of network IPs.' },
          { syntax: 'ip link show', title: 'Link Layer Only', whatItDoes: 'Shows MAC addresses, MTU, and packet drop stats.', whenToUse: 'Hardware layer troubleshooting.' },
          { syntax: 'sudo ip link set eth0 down', title: 'Disable Interface', whatItDoes: 'Takes network interface offline.', whenToUse: 'Hardware maintenance or isolation.' },
        ],
        internalFlow: [
          { step: 1, title: 'Open Netlink Socket', desc: 'ip creates an AF_NETLINK socket communicating with NETLINK_ROUTE.', why: 'Kernel network IPC protocol.', techDetail: 'socket(AF_NETLINK, SOCK_RAW, NETLINK_ROUTE)' },
          { step: 2, title: 'Send RTM_GETADDR Request', desc: 'Sends message payload requesting list of all interface IP assignments.', why: 'Queries kernel netdevice tables.', techDetail: 'sendto() with struct nlmsghdr' },
          { step: 3, title: 'Kernel Returns Interface Data', desc: 'Kernel populates netlink response with interface names, IPs, and flags.', why: 'Transfers network state to user space.', techDetail: 'recvmsg() receives multi-part netlink response' },
          { step: 4, title: 'Format & Print Table', desc: 'ip parses attributes and renders clean colored terminal output.', why: 'Displays network configuration to user.', techDetail: 'write(1, buffer, len)' },
        ],
        sandbox: {
          initialCommands: [
            'ip -br addr',
            'ip link show lo',
          ],
          guidedSteps: [
            { instruction: 'Inspect all network interfaces in brief format', command: 'ip -br addr', hint: 'Run ip -br addr' },
            { instruction: 'Examine the loopback interface (lo) link state', command: 'ip link show lo', hint: 'Run ip link show lo' },
          ],
          targetTask: 'Inspect network interfaces and IP addresses using iproute2.',
          solutionCommands: [
            'ip -br addr',
            'ip link show lo',
          ],
        },
        commonMistakes: [
          { mistake: 'Trying to install "net-tools" (ifconfig) on modern servers instead of using "ip".', whyWrong: 'ifconfig lacks support for modern Linux networking primitives and is excluded from minimal container images.', correctWay: 'Adopt "ip addr" and "ip link" natively.' },
          { mistake: 'Assigning a temporary IP with `ip addr add` and expecting it to persist across reboots.', whyWrong: '`ip addr add` communicates with the live kernel memory via Netlink; changes are lost upon system reboot.', correctWay: 'Persist network configuration using Netplan (`/etc/netplan/`) on Ubuntu or NetworkManager (`nmcli` / keyfiles) on RHEL.' },
        ],
        challenge: {
          question: 'Which modern command completely replaces the legacy "ifconfig" command across all modern Linux systems?',
          options: [
            { label: 'ip addr', isCorrect: true, explanation: 'Correct! "ip addr" (or "ip a") is the modern standard replacement for ifconfig.' },
            { label: 'netstat', isCorrect: false, explanation: 'Incorrect. netstat was replaced by ss.' },
            { label: 'route', isCorrect: false, explanation: 'Incorrect. route was replaced by ip route.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man8/ip.8.html',
          syntaxCheatSheet: [
            'ip -br addr           # Brief table: interface, state, and IP address',
            'ip addr show          # Detailed IP configuration with broadcast and scopes',
            'ip link show          # MAC addresses and MTU sizes',
            'sudo ip link set [DEV] up/down # Enable or disable a network interface',
          ],
          bestPractices: [
            'Use "ip -br addr" for human reading; it prints a clean 3-column table that fits on any screen.',
          ],
        },
      },
      {
        id: 'c-network-routes-dns',
        command: 'ip route show && curl -Iv https://example.com',
        title: 'Routing, DNS & Connectivity: curl & dig',
        topicId: 'topic-09',
        topicNumber: '09',
        topicTitle: 'Networking, Sockets & DNS',
        subtitle: 'Default gateways (ip route), DNS resolution (/etc/resolv.conf, dig), and HTTP testing with curl.',
        badges: ['Intermediate', 'Networking', 'DNS'],
        quote: 'It’s not always DNS—but 90% of the time in cloud production outages, it’s DNS.',
        difficulty: 'Intermediate',
        whatIsIt: 'The tools and configurations governing how packets leave your machine: routing tables (`ip route` and default gateways), domain name resolution (`/etc/resolv.conf`, `/etc/hosts`, `dig`, `nslookup`), and end-to-end HTTP/API connectivity testing with `curl`.',
        inSimpleWords: 'When your server wants to talk to google.com, two things happen: First, DNS (`/etc/resolv.conf` or `dig`) translates the name "google.com" into an IP address like `142.250.190.46`. Second, the routing table (`ip route`) sends those packets out through your router (the default gateway). `curl` tests if the website is actually responding.',
        whyDoYouNeedIt: 'Debugging cloud connectivity, verifying egress NAT gateways, troubleshooting failed external API calls, and verifying DNS records.',
        realWorldAnalogy: 'DNS is the phone contacts app converting a friend’s name into their phone number. The routing table is the road map telling your car which highway exit to take to get to their house.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT NETWORK ROUTING & DNS TRIAGE SKILLS',
            items: [
              'Applications fail with "Could not resolve host" and developers have no idea where DNS is configured',
              'Packets dropped because the default gateway route is missing',
              'Blaming external API vendors when the problem is an internal DNS misconfiguration',
              'No way to verify SSL/TLS handshakes or HTTP status codes from the terminal',
            ],
            outcome: '🚫 Cloud connectivity lockouts, API failure, and prolonged downtime',
          },
          with: {
            title: 'WITH SYSTEMATIC NETWORK TRIAGE',
            items: [
              'ip route show confirms default gateway reachability in 2 seconds',
              'dig +short verifies DNS lookup speed and authoritative answer records',
              '/etc/hosts allows local overriding of domain names for testing',
              'curl -Iv inspects TLS certificates, timing breakdowns, and HTTP headers',
            ],
            outcome: '⚡ Instant network bottleneck isolation and verified cloud connectivity',
          },
        },
        blockDiagram: {
          title: 'Linux Network Packet Egress & DNS Resolution Pipeline',
          subtitle: 'Click any step to inspect how a network request is resolved and routed:',
          nodes: [
            { id: 'dns-hosts', label: '1. /etc/hosts Lookup', simpleDef: 'Checks local static domain overrides.', techDef: 'nsswitch.conf "hosts: files dns" checks local /etc/hosts file first.', badge: 'Local Override', color: '#38bdf8' },
            { id: 'dns-resolver', label: '2. /etc/resolv.conf (DNS Query)', simpleDef: 'Sends UDP 53 DNS query to nameserver.', techDef: 'Queries upstream nameserver IP (e.g. 8.8.8.8 or 127.0.0.53 systemd-resolved).', badge: 'DNS Server', color: '#10b981' },
            { id: 'route-table', label: '3. Kernel Routing Table (ip route)', simpleDef: 'Finds default gateway for destination IP.', techDef: 'FIB (Forwarding Information Base) longest prefix match selects default via gateway.', badge: 'Gateway Route', color: '#a855f7' },
            { id: 'curl-http', label: '4. TCP Handshake & HTTP (curl)', simpleDef: 'Sends TCP SYN to port 443 and initiates TLS.', techDef: 'TCP 3-way handshake followed by TLS 1.3 negotiation and HTTP request.', badge: 'Connection', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'Default Gateway (default via ...)', simple: 'The router IP that handles all internet-bound traffic.', technical: 'The 0.0.0.0/0 route in the kernel routing table where non-local packets are forwarded.', analogy: 'The front door of your house through which you leave to go outside.' },
          { term: '/etc/resolv.conf', simple: 'The configuration file specifying which DNS servers your computer asks.', technical: 'Resolver configuration file containing "nameserver" IP directives.', analogy: 'The phone number of directory assistance.' },
          { term: 'curl -Iv', simple: 'Sends HTTP HEAD request with verbose debugging details.', technical: 'Outputs TLS certificate handshake, server headers, and HTTP status code without downloading body.', analogy: 'Knocking on the door to see if someone is home.' },
        ],
        whenToUse: [
          '✓ When checking why a server cannot access the internet (ip route show)',
          '✓ When testing if a DNS domain name resolves correctly (dig +short api.github.com)',
          '✓ When testing an API endpoint and inspecting HTTP response headers (curl -I https://api.company.com)',
        ],
        whenNotToUse: [
          '✕ Never edit /etc/resolv.conf manually if it is managed by systemd-resolved or NetworkManager (changes will be overwritten on reboot)',
        ],
        syntaxCode: 'dig +short google.com && ip route show',
        syntaxTokens: [
          { token: 'dig', role: 'DNS Tool', explanation: 'Domain Information Groper for querying DNS nameservers.' },
          { token: '+short', role: 'Flag', explanation: 'Only print IP address answers without verbose comments.' },
          { token: 'ip route show', role: 'Routing Tool', explanation: 'Displays active kernel routing table.' },
        ],
        variations: [
          { syntax: 'ip route show', title: 'View Routing Table', whatItDoes: 'Displays default gateway and interface routing rules.', whenToUse: 'Gateway reachability verification.' },
          { syntax: 'dig +short example.com', title: 'DNS Resolution', whatItDoes: 'Returns the IP address for a domain.', whenToUse: 'Verifying DNS propagation.' },
          { syntax: 'curl -sS -o /dev/null -w "%{http_code}\\n" https://url', title: 'Check HTTP Status Code', whatItDoes: 'Returns only the numeric HTTP code (e.g. 200, 404, 500).', whenToUse: 'Health check scripts.' },
        ],
        internalFlow: [
          { step: 1, title: 'Name Resolution', desc: 'Application calls getaddrinfo() which checks /etc/hosts and /etc/resolv.conf.', why: 'Translates domain to IP address.', techDetail: 'Queries DNS nameserver over UDP port 53' },
          { step: 2, title: 'Route Selection', desc: 'Kernel checks routing table for matching subnet; falls back to default gateway.', why: 'Decides which network card to send packet through.', techDetail: 'Longest prefix match algorithm' },
          { step: 3, title: 'ARP / Neighbor Resolution', desc: 'Kernel broadcasts ARP request to resolve gateway MAC address.', why: 'Ethernet frames require physical MAC addresses.', techDetail: 'Populates kernel ARP neighbor table' },
          { step: 4, title: 'TCP Connection Established', desc: 'curl sends TCP SYN packet to target IP and completes handshake.', why: 'Transfers application data.', techDetail: 'TCP state transitions to ESTABLISHED' },
        ],
        sandbox: {
          initialCommands: [
            'ip route show',
            'cat /etc/resolv.conf | grep nameserver',
          ],
          guidedSteps: [
            { instruction: 'Examine the active kernel routing table and default gateway', command: 'ip route show', hint: 'Run ip route show' },
            { instruction: 'Inspect configured DNS nameservers in /etc/resolv.conf', command: 'cat /etc/resolv.conf | grep nameserver', hint: 'Run cat /etc/resolv.conf | grep nameserver' },
          ],
          targetTask: 'Inspect routing tables and DNS configuration files.',
          solutionCommands: [
            'ip route show',
            'cat /etc/resolv.conf | grep nameserver',
          ],
        },
        commonMistakes: [
          { mistake: 'Assuming "ping domain.com" failing means the server is down.', whyWrong: 'Many cloud providers and enterprise firewalls block ICMP ping packets for security, while HTTP/HTTPS on port 80/443 works perfectly!', correctWay: 'Use "curl -Iv https://domain.com" or "nc -zv domain.com 443" to test specific TCP service ports.' },
          { mistake: 'Editing `/etc/resolv.conf` manually on modern systemd-resolved Linux systems and wondering why changes are overwritten.', whyWrong: 'systemd-resolved manages /etc/resolv.conf dynamically as a symlink to `/run/systemd/resolve/stub-resolv.conf`.', correctWay: 'Configure DNS nameservers via `resolvectl dns <if> <IP>` or inside Netplan / NetworkManager profiles.' },
        ],
        challenge: {
          question: 'What does the route "default via 192.168.1.1 dev eth0" in "ip route show" represent?',
          options: [
            { label: 'The default gateway router that handles all external internet-bound traffic', isCorrect: true, explanation: 'Correct! The default gateway routes all traffic not destined for the local subnet.' },
            { label: 'The DNS nameserver IP address', isCorrect: false, explanation: 'Incorrect. DNS servers are configured in /etc/resolv.conf.' },
            { label: 'A static IP assigned to the eth0 network card', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man8/ip-route.8.html',
          syntaxCheatSheet: [
            'ip route show         # View active routing table and default gateway',
            'dig [DOMAIN]          # Detailed DNS query output',
            'dig +short [DOMAIN]   # Terse DNS answer IP only',
            'curl -Iv [URL]        # Inspect HTTP response headers and TLS details',
            'cat /etc/resolv.conf  # Active nameservers configuration',
          ],
          bestPractices: [
            'When an external API call fails, test both DNS resolution (dig) and HTTP reachability (curl -Iv) to isolate the failure layer.',
          ],
        },
      },
      {
        id: 'c-network-sockets-ss',
        command: 'sudo ss -tulpn',
        title: 'Listening Sockets & Ports: ss',
        topicId: 'topic-09',
        topicNumber: '09',
        topicTitle: 'Networking, Sockets & DNS',
        subtitle: 'Replacing legacy netstat with modern ss: TCP (-t), UDP (-u), listening (-l), process names (-p), numeric (-n).',
        badges: ['Intermediate', 'Networking', 'Sockets'],
        quote: 'ss dumps socket statistics directly from kernel memory in milliseconds, whereas netstat parses slow /proc files.',
        difficulty: 'Intermediate',
        whatIsIt: 'The `ss` (Socket Statistics) command is the modern, high-speed utility for inspecting network ports, listening daemon sockets, and established network connections. It replaces the deprecated legacy `netstat` tool.',
        inSimpleWords: '`ss -tulpn` shows you every program currently listening for connections on your machine. For example, it will tell you: "Nginx is listening on port 80 (PID 1420)" or "PostgreSQL is listening on port 5432 (PID 890)".',
        whyDoYouNeedIt: 'Debugging "Port already in use" errors, verifying that newly started web servers or databases are listening, and detecting unauthorized rogue network backdoors.',
        realWorldAnalogy: 'Walking down an office hallway and checking which service windows are currently open, with signs telling you which clerk is sitting behind each window.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT MODERN SOCKET INSPECTION (Using netstat)',
            items: [
              'netstat takes 30 seconds to parse millions of connections from /proc/net/tcp, stalling the server',
              'Cannot tell which process ID (PID) is occupying port 8080 when your application fails to start',
              'netstat is deprecated and missing on modern minimal server installations',
            ],
            outcome: '🐌 Slow diagnostics and "Address already in use" confusion',
          },
          with: {
            title: 'WITH SS SOCKET MASTERY (ss -tulpn)',
            items: [
              'ss queries the kernel sock_diag subsystem via Netlink in sub-milliseconds',
              '-tulpn reveals exact protocol (TCP/UDP), listening state, port number, and process PID',
              'Identify port conflicts in seconds and terminate conflicting rogue processes',
              'Track active connections and socket buffer memory statistics',
            ],
            outcome: '⚡ Sub-second port conflict resolution and complete socket visibility',
          },
        },
        blockDiagram: {
          title: 'Linux Kernel Socket Diag & ss Architecture',
          subtitle: 'Click any component to inspect how ss queries listening sockets from the kernel:',
          nodes: [
            { id: 'ss-cli', label: 'ss -tulpn Command', simpleDef: 'The command requesting socket information.', techDef: 'User-space utility opening NETLINK_INET_DIAG socket.', badge: 'CLI Tool', color: '#38bdf8' },
            { id: 'ss-kernel-diag', label: 'Kernel sock_diag Netlink Subsystem', simpleDef: 'Kernel module holding the master socket table in RAM.', techDef: 'Kernel subsystem directly serializing inet_sock hash tables into netlink response.', badge: 'Kernel Diag', color: '#10b981' },
            { id: 'ss-process-match', label: 'Process PID Resolution', simpleDef: 'Links the open socket file descriptor to a specific process PID.', techDef: 'Scans /proc/[pid]/fd to map socket inode number to process name and PID.', badge: 'Process Mapper', color: '#a855f7' },
          ],
        },
        terms: [
          { term: 'ss -tulpn', simple: 'The universal mnemonic: TCP (-t), UDP (-u), Listening (-l), Process names (-p), Numeric ports (-n).', technical: 'Filters for TCP/UDP listening sockets, disabling DNS reverse lookups (-n) for speed, with PID attribution (-p).', analogy: 'A comprehensive directory of all open phone lines in a building.' },
          { term: '0.0.0.0 vs 127.0.0.1', simple: '0.0.0.0 means listening to the entire world; 127.0.0.1 means listening ONLY to local programs on this computer.', technical: 'INADDR_ANY (binds to all network interfaces) vs Loopback (isolated to local host network namespace).', analogy: 'A public speaker on a stage vs whispering to yourself.' },
          { term: 'TIME_WAIT', simple: 'A closed TCP connection waiting in the background to ensure no leftover packets get mixed up.', technical: 'TCP state ensuring remote host received final ACK (typically lasts 60 seconds).', analogy: 'Holding the elevator door for a few seconds after someone exits.' },
        ],
        whenToUse: [
          '✓ When an app fails with "bind: Address already in use" (sudo ss -tulpn | grep 8080)',
          '✓ When verifying whether your web server is listening on port 80/443',
          '✓ When checking for active incoming database connections (ss -t state established \'( dport = :5432 or sport = :5432 )\')',
        ],
        whenNotToUse: [
          '✕ Never run ss without "-n" on high-traffic servers (reverse DNS lookups will cause severe lag)',
        ],
        syntaxCode: 'sudo ss -tulpn',
        syntaxTokens: [
          { token: 'ss', role: 'Command', explanation: 'Socket statistics tool.' },
          { token: '-t', role: 'Flag', explanation: 'TCP sockets.' },
          { token: '-u', role: 'Flag', explanation: 'UDP sockets.' },
          { token: '-l', role: 'Flag', explanation: 'Listening sockets only (exclude established client streams).' },
          { token: '-p', role: 'Flag', explanation: 'Process: show process name and PID.' },
          { token: '-n', role: 'Flag', explanation: 'Numeric: show port numbers instead of resolving service names (80 vs http).' },
        ],
        variations: [
          { syntax: 'sudo ss -tulpn | grep :80', title: 'Check Port 80', whatItDoes: 'Checks which process is bound to port 80.', whenToUse: 'Resolving web server startup conflicts.' },
          { syntax: 'ss -s', title: 'Socket Summary', whatItDoes: 'Prints summary stats (total established, closed, TCP/UDP sockets).', whenToUse: 'High-level server socket health checks.' },
          { syntax: 'ss -t state established', title: 'Established Connections', whatItDoes: 'Lists all active connected TCP streams.', whenToUse: 'Auditing active client sessions.' },
        ],
        internalFlow: [
          { step: 1, title: 'Open Netlink Diag Socket', desc: 'ss opens AF_NETLINK socket with NETLINK_INET_DIAG protocol.', why: 'Direct kernel communication.', techDetail: 'socket(AF_NETLINK, SOCK_RAW, NETLINK_INET_DIAG)' },
          { step: 2, title: 'Dump Listening Sockets', desc: 'Kernel streams TCP and UDP listening sockets from internal hash tables.', why: 'Fast in-memory dump.', techDetail: 'Dumps struct inet_diag_msg records' },
          { step: 3, title: 'Map Inode to PID', desc: 'If -p flag is passed, ss scans /proc/*/fd to identify which process holds the socket inode.', why: 'Identifies owning program name and PID.', techDetail: 'Maps socket:[inode] to PID' },
          { step: 4, title: 'Print Formatted Table', desc: 'Renders Netid, State, Local Address:Port, Peer Address:Port, and Process.', why: 'Displays clean output to user.', techDetail: 'stdout print' },
        ],
        sandbox: {
          initialCommands: [
            'ss -s',
            'ss -tln',
          ],
          guidedSteps: [
            { instruction: 'View high-level summary of active sockets on the system', command: 'ss -s', hint: 'Run ss -s' },
            { instruction: 'List listening TCP sockets with numeric port numbers', command: 'ss -tln', hint: 'Run ss -tln' },
          ],
          targetTask: 'Inspect active and listening network sockets with ss.',
          solutionCommands: [
            'ss -s',
            'ss -tln',
          ],
        },
        commonMistakes: [
          { mistake: 'Running "ss -tulpn" without "sudo".', whyWrong: 'Without root permissions, ss cannot inspect other users\' /proc/*/fd descriptors, so the Process (PID/Name) column is blank!', correctWay: 'Always run "sudo ss -tulpn" when you need to see which PID owns the port.' },
          { mistake: 'Binding an internal database to 0.0.0.0 instead of 127.0.0.1.', whyWrong: 'Binding to 0.0.0.0 exposes the database port to the entire public internet!', correctWay: 'Bind local-only services to 127.0.0.1 or use private network interfaces.' },
        ],
        challenge: {
          question: 'What does the "ss" flag combination "-tulpn" stand for?',
          options: [
            { label: 'TCP (-t), UDP (-u), Listening (-l), Process (-p), and Numeric (-n)', isCorrect: true, explanation: 'Correct! -tulpn displays all listening TCP and UDP sockets with PIDs and numeric ports.' },
            { label: 'Total (-t), User (-u), Log (-l), Print (-p), Network (-n)', isCorrect: false, explanation: 'Incorrect.' },
            { label: 'Terminal (-t), Unix (-u), Local (-l), PID (-p), Null (-n)', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man8/ss.8.html',
          syntaxCheatSheet: [
            'sudo ss -tulpn        # List all listening TCP/UDP ports with process names',
            'ss -s                 # Summary of active socket counts',
            'ss -t state established # List active established TCP connections',
            'sudo ss -tulpn | grep :[PORT] # Find which process is using a specific port',
          ],
          bestPractices: [
            'When debugging "Address already in use", run "sudo ss -tulpn | grep :PORT" to find the PID and kill it cleanly.',
          ],
        },
      },
    ],
  },
];
