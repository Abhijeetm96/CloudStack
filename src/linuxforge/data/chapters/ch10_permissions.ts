import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 10: FILE PERMISSIONS (10.1 to 10.16)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_10: LinuxTopic = {
  id: 'ch-10',
  number: '10',
  title: 'File Permissions',
  iconName: 'Lock',
  description: 'Master the POSIX security matrix: read/write/execute bits, octal and symbolic chmod, chown, umask, SUID, SGID, and the Sticky Bit.',
  concepts: [
    buildLinuxConcept({
      id: 'c-10-01',
      subChapterNumber: '10.1',
      command: 'ls -l /etc/shadow',
      title: 'Why Permissions Exist',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'The foundational security perimeter enforcing confidentiality, integrity, and isolation',
      badges: ['Security', 'Permissions', 'Core'],
      difficulty: 'Beginner',
      quote: 'Without file permissions, any website visitor or rogue script could read your database passwords and wipe your operating system.',
      whatIsIt: 'POSIX File Permissions are the foundational security controls enforced by the Linux kernel. Every filesystem inode stores 12 permission mode bits: 9 standard bits controlling Read (r), Write (w), and Execute (x) across three security tiers (Owner, Group, Others), and 3 special bits (SUID, SGID, Sticky Bit). The kernel inspects these bits on every open(), read(), write(), and execve() system call.',
      inSimpleWords: 'Think of permissions as locks on hotel room doors. The guest has the key to their room (Owner). The cleaning staff has access to a group of rooms (Group). But strangers passing by in the hallway (Others) are completely locked out.',
      whyDoYouNeedIt: 'Permissions guarantee multi-user privacy, protect system configuration files from unauthorized tampering, and prevent non-executable documents from executing malicious code.',
      realWorldScenario: 'A server hosts a web application and a database. If /etc/shadow had no permissions, a compromised web script could read password hashes and crack admin credentials. Strict permissions (0640) ensure only root can access the file.',
      realWorldAnalogy: 'Bank security zones: teller counters (user), shared cash counting room (group), and public lobby (others).',
      withoutVsWith: {
        without: {
          title: 'A System Without Permissions',
          items: ['Every user can view and edit everyone else\'s files', 'Any program can overwrite the Linux kernel and system binaries', 'Malware in a downloaded photo can execute and take over the system'],
          outcome: 'Zero privacy, rampant malware execution, and total data compromise.'
        },
        with: {
          title: 'Linux POSIX Permission Architecture',
          items: ['Strict mathematical boundaries between Owner, Group, and Others', 'Kernel enforces permission checks at hardware supervisor speed', 'Granular control over reading, writing, and execution rights'],
          outcome: 'Bulletproof multi-user isolation, process sandboxing, and compliance.'
        }
      },
      blockDiagram: {
        title: 'POSIX 10-Character Permission String Breakdown',
        subtitle: 'Decoded from filesystem inode st_mode:',
        nodes: [
          { id: 'type', label: 'File Type (d / - / l)', simpleDef: 'First character: regular file (-), directory (d), link (l)', techDef: 'Inode S_IFMT mode mask', badge: 'Type', color: '#38bdf8' },
          { id: 'user', label: 'Owner (rwx)', simpleDef: 'Read, Write, Execute for owning user', techDef: 'Bits 8, 7, 6 (octal 0700)', badge: 'Owner', color: '#10b981' },
          { id: 'group', label: 'Group (r-x)', simpleDef: 'Read, Write, Execute for owning group', techDef: 'Bits 5, 4, 3 (octal 0070)', badge: 'Group', color: '#a855f7' },
          { id: 'other', label: 'Others (r--)', simpleDef: 'Read, Write, Execute for everyone else', techDef: 'Bits 2, 1, 0 (octal 0007)', badge: 'World', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Mode Bits (st_mode)', simple: 'The binary bits stored in the file\'s metadata controlling access.', technical: '16-bit integer in the inode struct encoding file type and 12 permission bits.' },
        { term: 'EACCES (Permission Denied)', simple: 'The error Linux returns when you try to access a file you do not have permission for.', technical: 'POSIX error code returned when credential check fails against inode mode.' }
      ],
      syntaxCode: 'ls -l [FILE]',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List file info' },
        { token: '-l', role: 'flag', explanation: 'Long format outputting 10-character permission string' },
        { token: '/etc/shadow', role: 'path', explanation: 'Target security file' }
      ],
      variations: [
        { syntax: 'stat -c "%a %n" /etc/shadow', title: 'Numeric Octal Mode', whatItDoes: 'Outputs permissions as 3-digit octal number (e.g. 640)', whenToUse: 'When auditing permission numbers' },
        { syntax: 'stat -c "%A %U:%G %n" file.txt', title: 'Human Readable Ownership & Mode', whatItDoes: 'Displays formatted permission string, owner, and group cleanly', whenToUse: 'Script permission auditing' }
      ],
      beforeAfter: {
        before: '$ ls -l /etc/shadow\n[Reading security file mode bits...]',
        after: '-rw-r----- 1 root shadow 1240 Sep 28 10:00 /etc/shadow',
        explanation: 'Owner (root) can read/write; Group (shadow) can read; Others have zero permissions (---).'
      },
      expectedOutput: '-rw-r----- root shadow',
      whatChanges: ['Queries inode mode bits.'],
      whatDoesNotChange: ['File remains intact.'],
      safeRecovery: '100% safe read-only inspection.',
      commonMistakes: [
        { mistake: 'Fixing permission denied errors with "chmod 777" blindly', whyItHappens: 'Frustration with permission errors.', howToFix: 'NEVER use 777 in production! It gives every user and rogue script full write and execute control. Fix the owner (chown) or group instead.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-02',
      subChapterNumber: '10.2',
      command: 'chmod u+r private.txt',
      title: 'Read Permission',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'The "r" bit (octal 4): reading file contents vs listing directory entries',
      badges: ['Permissions', 'Read', 'Core'],
      difficulty: 'Beginner',
      quote: 'Read permission on a file lets you open it; read permission on a directory lets you list its filenames.',
      whatIsIt: 'The Read Permission ("r", octal value 4) grants permission to inspect data. On a Regular File, it permits opening the file with O_RDONLY and reading its contents via read() system calls (e.g. cat, grep, less). On a Directory, it grants permission to read the directory dentry list via getdents64() (e.g. running "ls" to see what files exist).',
      inSimpleWords: 'Read means "look with your eyes". If you have read permission on a file, you can read the text inside. If you have read permission on a folder, you can see the list of files in that folder.',
      whyDoYouNeedIt: 'You need read permissions to run applications, serve web pages via Nginx, and inspect logs.',
      realWorldScenario: 'An Nginx web server returns "403 Forbidden" when visitors request "index.html". You inspect the file and see "-rw-r----- 1 ubuntu ubuntu". The "others" tier has no read bit! You run "chmod o+r index.html", allowing Nginx to read and serve the file to visitors.',
      realWorldAnalogy: 'Looking through a glass display case at museum artifacts. You can see the artifact (read), but cannot touch it or move it.',
      terms: [
        { term: 'Read Bit (r = 4)', simple: 'The permission allowing viewing of data.', technical: 'Bit value 4 in octal triplet; grants read syscalls on files and getdents on directories.' }
      ],
      syntaxCode: 'chmod [WHO]+r [TARGET]',
      syntaxTokens: [
        { token: 'chmod', role: 'command', explanation: 'Change file mode bits' },
        { token: 'u+r', role: 'flag', explanation: 'Add read (+r) to user/owner (u)' },
        { token: 'private.txt', role: 'path', explanation: 'Target file' }
      ],
      variations: [
        { syntax: 'chmod a+r public.txt', title: 'Grant Read to Everyone', whatItDoes: 'Adds read permission for user, group, and others (a = all)', whenToUse: 'Publishing public website assets' },
        { syntax: 'chmod o-r secret.txt', title: 'Revoke Read from Others', whatItDoes: 'Removes read permission from others/world', whenToUse: 'Securing private files' }
      ],
      beforeAfter: {
        before: '$ ls -l doc.txt\n---------- 1 dev dev 1024 Sep 28 10:00 doc.txt\n$ cat doc.txt\ncat: doc.txt: Permission denied\n$ chmod u+r doc.txt',
        after: '$ ls -l doc.txt\n-r-------- 1 dev dev 1024 Sep 28 10:00 doc.txt\n$ cat doc.txt\n[File contents display successfully]',
        explanation: 'Adding the read bit (u+r) enabled cat to read file data blocks.'
      },
      expectedOutput: '-r-------- doc.txt',
      whatChanges: ['Sets read bit in inode st_mode.'],
      whatDoesNotChange: ['File content is untouched.'],
      safeRecovery: 'Revoke with "chmod u-r filename".',
      commonMistakes: [
        { mistake: 'Giving read permission on a directory without execute permission', whyItHappens: 'With only "r" on a folder, you can list filenames with ls, but you CANNOT cd into it or read file metadata!', howToFix: 'Directories always need BOTH read and execute: chmod 755 or chmod +rx.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-03',
      subChapterNumber: '10.3',
      command: 'chmod u+w script.py',
      title: 'Write Permission',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'The "w" bit (octal 2): modifying file contents vs creating/deleting files in directories',
      badges: ['Permissions', 'Write', 'Core'],
      difficulty: 'Beginner',
      quote: 'Deleting a file does NOT depend on write permission on the file; it depends on write permission on the DIRECTORY.',
      whatIsIt: 'The Write Permission ("w", octal value 2) grants permission to modify data. On a Regular File, it allows opening with O_WRONLY/O_RDWR, modifying contents, truncating, and appending. On a Directory, it allows CREATING new files, RENAMING files, and DELETING (unlinking) files within that directory.',
      inSimpleWords: 'Write means "change or delete". On a file, it lets you edit the text. On a folder, write permission gives you the power to create new files or throw existing files into the trash!',
      whyDoYouNeedIt: 'Applications need write permission to write to logs, databases need write permission to save records, and developers need write permission to save code edits.',
      realWorldScenario: 'A junior admin makes a file read-only ("chmod 444 file.txt") thinking it can never be deleted. But the parent directory has write permissions ("chmod 777 /folder"). A user simply types "rm file.txt" and it is deleted! Why? Because deleting a file modifies the parent directory\'s table, not the file itself.',
      realWorldAnalogy: 'Having a pencil with an eraser to edit words on a document.',
      terms: [
        { term: 'Write Bit (w = 2)', simple: 'The permission to edit files or add/delete files in a directory.', technical: 'Bit value 2 in octal triplet; grants write(), ftruncate(), and directory unlink/mkdir calls.' }
      ],
      syntaxCode: 'chmod [WHO]+w [TARGET]',
      syntaxTokens: [
        { token: 'chmod', role: 'command', explanation: 'Change file mode bits' },
        { token: 'u+w', role: 'flag', explanation: 'Add write (+w) to user/owner (u)' },
        { token: 'script.py', role: 'path', explanation: 'Target file' }
      ],
      variations: [
        { syntax: 'chmod u-w readonly.txt', title: 'Make File Read-Only', whatItDoes: 'Protects file from accidental editing or overwrites', whenToUse: 'Protecting critical configuration templates' },
        { syntax: 'chmod g+w /var/www/uploads', title: 'Grant Group Write to Directory', whatItDoes: 'Allows web server group to upload new files into directory', whenToUse: 'Web application upload folders' }
      ],
      beforeAfter: {
        before: '$ ls -l config.py\n-r--r--r-- 1 dev dev 500 Sep 28 10:00 config.py\n$ echo "NEW" >> config.py\nbash: config.py: Permission denied\n$ chmod u+w config.py',
        after: '$ ls -l config.py\n-rw-r--r-- 1 dev dev 500 Sep 28 10:00 config.py\n$ echo "NEW" >> config.py\n[Edit succeeds]',
        explanation: 'Adding the write bit enabled the shell to open the file in write/append mode.'
      },
      expectedOutput: '-rw-r--r-- config.py',
      whatChanges: ['Sets write bit in inode.'],
      whatDoesNotChange: ['File content is untouched.'],
      safeRecovery: 'Revoke write with "chmod u-w filename".',
      commonMistakes: [
        { mistake: 'Assuming that making a file read-only prevents someone from deleting it', whyItHappens: 'Deletion is controlled by the DIRECTORY\'s write permission, not the file\'s write permission!', howToFix: 'To prevent deletion, remove write permission from the containing directory or use "chattr +i".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-04',
      subChapterNumber: '10.4',
      command: 'chmod +x deploy.sh',
      title: 'Execute Permission',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'The "x" bit (octal 1): running binaries/scripts vs traversing into directories',
      badges: ['Permissions', 'Execute', 'Core'],
      difficulty: 'Beginner',
      quote: 'Linux refuses to run any script or program unless its execute bit is explicitly turned on.',
      whatIsIt: 'The Execute Permission ("x", octal value 1) has two critical meanings: On a Regular File, it grants permission to execute the file as a program via the execve() system call (compiled binaries or shell scripts). On a Directory, it grants Traverse (Search) permission, allowing a process to cd into the directory, pass through it, and access inodes within it.',
      inSimpleWords: 'Just naming a file "script.sh" does not mean Linux will run it. You must explicitly give it permission to run with "chmod +x script.sh". On a folder, execute permission is the key that lets you step inside the room (cd).',
      whyDoYouNeedIt: 'Security: Windows runs any file ending in .exe or .bat, making it easy for viruses to execute. Linux refuses to execute ANY file unless you explicitly set the execute bit.',
      realWorldScenario: 'You write a shell script "deploy.sh". You try to run "./deploy.sh" and Linux says: "bash: ./deploy.sh: Permission denied". You run "chmod +x deploy.sh", turning on the execute bit. Now "./deploy.sh" runs cleanly.',
      realWorldAnalogy: 'An ignition key that allows an engine to crank to life.',
      terms: [
        { term: 'Execute Bit (x = 1)', simple: 'Permission to run a program or enter a folder.', technical: 'Bit value 1 in octal triplet; checked by kernel sys_execve() and lookup_fast() in directory traversal.' },
        { term: 'Directory Traverse', simple: 'The ability to pass through a folder to reach files inside it.', technical: 'Evaluating path resolution through a directory dentry; requires execute bit on every parent directory in the path.' }
      ],
      syntaxCode: 'chmod +x [SCRIPT_OR_BINARY]',
      syntaxTokens: [
        { token: 'chmod', role: 'command', explanation: 'Change file mode bits' },
        { token: '+x', role: 'flag', explanation: 'Add execute permission for everyone' },
        { token: 'deploy.sh', role: 'path', explanation: 'Target script file' }
      ],
      variations: [
        { syntax: 'chmod u+x run.py', title: 'Owner Only Execute', whatItDoes: 'Allows only the file owner to execute the script', whenToUse: 'Private personal automation scripts' },
        { syntax: 'chmod -R +X /var/www', title: 'Smart Execute (+X)', whatItDoes: 'Adds execute ONLY to directories and already-executable files', whenToUse: 'Fixing directory traversal safely without making all files executable' }
      ],
      beforeAfter: {
        before: '$ ls -l script.sh\n-rw-r--r-- 1 dev dev 240 Sep 28 10:00 script.sh\n$ ./script.sh\nbash: ./script.sh: Permission denied\n$ chmod +x script.sh',
        after: '$ ls -l script.sh\n-rwxr-xr-x 1 dev dev 240 Sep 28 10:00 script.sh\n$ ./script.sh\nDeployment initiated...',
        explanation: 'Adding +x turned the file executable, allowing execve() to load and run it.'
      },
      expectedOutput: '-rwxr-xr-x script.sh',
      whatChanges: ['Sets execute bit in inode st_mode.'],
      whatDoesNotChange: ['File content is untouched.'],
      safeRecovery: 'Revoke with "chmod -x filename".',
      commonMistakes: [
        { mistake: 'Removing execute permission from a directory (e.g. chmod 644 directory)', whyItHappens: 'Thinking 644 is a good permission for everything.', howToFix: 'WITHOUT "x", YOU CANNOT "cd" INTO A DIRECTORY! Directories must always have execute: chmod 755.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-05',
      subChapterNumber: '10.5',
      command: 'ls -l /var/www/html/index.html',
      title: 'User / Group / Others',
      topicId: 'ch-10',
      topicNumber: '09',
      topicTitle: 'File Permissions',
      subtitle: 'The three concentric security rings: User (owner), Group (collaborators), and Others (world)',
      badges: ['Permissions', 'SecurityTiers', 'Core'],
      difficulty: 'Beginner',
      quote: 'Linux evaluates permissions in strict order: If you are the Owner, only Owner bits apply; Group and Other bits are ignored.',
      whatIsIt: 'POSIX permissions divide all system entities into three distinct security classes: 1. User/Owner ("u"): the specific account that owns the file, 2. Group ("g"): all members of the group owning the file, and 3. Others/World ("o"): every other account on the system. The kernel evaluates access in strict precedence: if the process UID matches the file owner, ONLY owner permissions are checked; if owner denies access, group and other permissions are never checked.',
      inSimpleWords: 'There are 3 circles of trust. Circle 1: The Owner (You). Circle 2: Your Team (Group). Circle 3: The Public (Everyone else). You can set different rules for each circle.',
      whyDoYouNeedIt: 'This three-tier separation allows you to share files with your immediate teammates (Group) without exposing sensitive documents to the rest of the company (Others).',
      realWorldScenario: 'You create a confidential project plan. You set permissions: Owner can read/write (rw-), Group "managers" can read (r--), and Others have zero access (---). Permissions string: "-rw-r-----". Managers can review it, while unauthorized employees cannot read a single byte.',
      realWorldAnalogy: 'A document shared on Google Drive: Owner (Editor), Department (Viewers), Public (No Access).',
      terms: [
        { term: 'Owner Evaluation Order', simple: 'The first matching category determines your permissions.', technical: 'POSIX access algorithm: if (uid == inode->uid) check_owner(); else if (in_group) check_group(); else check_other();' }
      ],
      syntaxCode: 'chmod [u|g|o|a][+|-|=][r|w|x] FILE',
      syntaxTokens: [
        { token: 'chmod', role: 'command', explanation: 'Change file mode bits' },
        { token: 'u=rw,g=r,o=', role: 'flag', explanation: 'Explicit assignment for user (rw), group (r), and others (none)' },
        { token: 'FILE', role: 'path', explanation: 'Target file' }
      ],
      variations: [
        { syntax: 'chmod go-rwx secret.key', title: 'Lockdown File to Owner Only', whatItDoes: 'Removes all read, write, and execute permissions from group and others', whenToUse: 'Securing SSH private keys and SSL certificates' }
      ],
      beforeAfter: {
        before: '$ ls -l secret.txt\n-rw-rw-rw- 1 dev dev 100 Sep 28 10:00 secret.txt\n$ chmod go-rwx secret.txt',
        after: '-rw------- 1 dev dev 100 Sep 28 10:00 secret.txt',
        explanation: 'Group and Others were completely stripped of all access.'
      },
      expectedOutput: '-rw------- secret.txt',
      whatChanges: ['Modifies group and other permission bits in inode.'],
      whatDoesNotChange: ['Owner permissions are untouched.'],
      safeRecovery: 'Restore with "chmod g+r,o+r filename".',
      commonMistakes: [
        { mistake: 'Assuming that if Group has read permission, the Owner can read even if Owner permissions are "---"', whyItHappens: 'Thinking permissions are additive.', howToFix: 'Permissions are NOT additive! If Owner is "---", the owner gets Permission Denied even if Group is "rwx"!' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-06',
      subChapterNumber: '10.6',
      command: 'chmod 755 deploy.sh',
      title: 'chmod',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Change Mode: the universal command for altering file and directory permission bits',
      badges: ['chmod', 'Permissions', 'Core'],
      difficulty: 'Beginner',
      quote: 'chmod is the master key for permission control: use octal numbers or symbolic letters.',
      whatIsIt: 'chmod ("Change Mode") invokes the chmod() or fchmodat() system calls to update the 12 permission mode bits stored inside a file or directory inode. Only the file\'s owner or the root superuser can change its permissions. chmod accepts permissions in two formats: Numeric (Octal, e.g. 755, 644) and Symbolic (e.g. u+x, go-w).',
      inSimpleWords: 'chmod is the command you type whenever Linux says "Permission denied" or when you need to make a script executable. It lets you tighten or loosen the security locks on any file you own.',
      whyDoYouNeedIt: 'You need chmod to make scripts runnable (+x), secure private keys (600), protect configuration files (644), and set up shared group folders (775).',
      realWorldScenario: 'You generate a new SSH key: "id_rsa". SSH refuses to connect, warning: "Permissions 0644 for id_rsa are too open! It is required that your private key files are NOT accessible by others". You run "chmod 600 id_rsa". SSH connects successfully.',
      realWorldAnalogy: 'Changing the combination lock or key requirements on a safe.',
      terms: [
        { term: 'chmod() Syscall', simple: 'The kernel operation updating inode st_mode.', technical: 'POSIX system call verifying calling process EUID == inode->i_uid or CAP_FOWNER.' },
        { term: 'Recursive (-R)', simple: 'Applies permission changes to an entire directory tree.', technical: 'Traverses directory hierarchy applying chmod to all child inodes.' }
      ],
      syntaxCode: 'chmod [OPTIONS] MODE FILE...',
      syntaxTokens: [
        { token: 'chmod', role: 'command', explanation: 'Change file mode bits' },
        { token: '755', role: 'flag', explanation: 'Octal mode: owner=7 (rwx), group=5 (r-x), others=5 (r-x)' },
        { token: 'deploy.sh', role: 'path', explanation: 'Target file' }
      ],
      variations: [
        { syntax: 'chmod -R 755 /var/www/html', title: 'Recursive Mode Change', whatItDoes: 'Applies 755 permissions to directory and all files inside it', whenToUse: 'Standard web folder setup' },
        { syntax: 'chmod 600 ~/.ssh/id_rsa', title: 'Secure Private Key', whatItDoes: 'Grants read/write only to owner; denies all others', whenToUse: 'Mandatory for SSH private keys' }
      ],
      beforeAfter: {
        before: '$ ls -l script.sh\n-rw-r--r-- 1 dev dev 500 Sep 28 10:00 script.sh\n$ chmod 755 script.sh',
        after: '$ ls -l script.sh\n-rwxr-xr-x 1 dev dev 500 Sep 28 10:00 script.sh',
        explanation: 'Permissions updated from 644 to 755, enabling execution.'
      },
      expectedOutput: '-rwxr-xr-x script.sh',
      whatChanges: ['Updates 12 mode bits in inode.'],
      whatDoesNotChange: ['File content and timestamps are unmodified.'],
      safeRecovery: 'Reset to standard defaults: files to 644 (chmod 644 file) and directories to 755 (chmod 755 dir).',
      commonMistakes: [
        { mistake: 'Trying to run chmod on a file you do not own without sudo', whyItHappens: 'Only the file owner or root can change permissions.', howToFix: 'Use sudo or ask the file owner to run chmod.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-07',
      subChapterNumber: '10.7',
      command: 'chmod 644 /etc/nginx/nginx.conf',
      title: 'Numeric Permissions',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'The 3-digit octal mathematical formula: Read=4, Write=2, Execute=1',
      badges: ['Octal', 'Permissions', 'Core'],
      difficulty: 'Beginner',
      quote: 'Numeric permissions are simple binary arithmetic: 4 + 2 + 1 = 7. Memorize 4, 2, 1 and you master chmod.',
      whatIsIt: 'Numeric (Octal) permissions represent the 9 standard permission bits as three base-8 octal digits (0-7), one digit for each tier (Owner, Group, Others). Each digit is the mathematical sum of its active permission weights: Read = 4 (binary 100), Write = 2 (binary 010), Execute = 1 (binary 001). Adding them produces unique combinations from 0 (none) to 7 (rwx).',
      inSimpleWords: 'Just add three numbers: 4 for Read, 2 for Write, 1 for Execute. Want Read and Write? 4 + 2 = 6. Want Read, Write, and Execute? 4 + 2 + 1 = 7. Want only Read? 4. That is why 755 means: Owner=7 (rwx), Group=5 (r-x), Others=5 (r-x).',
      whyDoYouNeedIt: 'Octal numbers are the universal standard in Linux documentation, Ansible playbooks, Dockerfiles, and production sysadmin commands.',
      realWorldScenario: 'You are deploying a web configuration. Standard security policy mandates: Owner can read/write (4+2=6), Group can read (4), Others can read (4). You immediately type "chmod 644 config.conf".',
      realWorldAnalogy: 'Weighing coins on a balance scale where each denomination (4, 2, 1) adds up to an exact unique weight.',
      terms: [
        { term: 'Octal Triplet', simple: 'The 3-digit number representing User, Group, and Other permissions.', technical: 'Base-8 representation of the 9 low-order st_mode permission bits.' },
        { term: 'Common Octal Modes', simple: '644 (standard files), 755 (scripts & dirs), 600 (private keys), 700 (private dirs).', technical: 'Industry standard POSIX permission templates for secure operations.' }
      ],
      syntaxCode: 'chmod [OCTAL_TRIPLET] FILE',
      syntaxTokens: [
        { token: 'chmod', role: 'command', explanation: 'Change file mode' },
        { token: '644', role: 'flag', explanation: '6 (owner=4+2), 4 (group=4), 4 (others=4)' },
        { token: '/etc/nginx/nginx.conf', role: 'path', explanation: 'Target configuration file' }
      ],
      variations: [
        { syntax: 'chmod 600 ~/.ssh/authorized_keys', title: 'Private User Keys (600)', whatItDoes: 'Owner=rw (6), Group=none (0), Others=none (0)', whenToUse: 'Mandatory for SSH authorized_keys and id_rsa' },
        { syntax: 'chmod 755 /usr/local/bin/myscript', title: 'Standard Executable (755)', whatItDoes: 'Owner=rwx (7), Group=rx (5), Others=rx (5)', whenToUse: 'Standard shared binary programs' }
      ],
      beforeAfter: {
        before: '$ stat -c "%a %A" file.txt\n777 -rwxrwxrwx\n$ chmod 644 file.txt',
        after: '$ stat -c "%a %A" file.txt\n644 -rw-r--r--',
        explanation: 'Hardened insecure 777 mode down to production standard 644.'
      },
      expectedOutput: '644 -rw-r--r--',
      whatChanges: ['Overwrites all 9 permission bits with exact octal values.'],
      whatDoesNotChange: ['File contents are unmodified.'],
      safeRecovery: 'Non-destructive. Re-apply any octal mode as needed.',
      commonMistakes: [
        { mistake: 'Typing "chmod 777" on files in production', whyItHappens: 'Quick fix for permission errors.', howToFix: '777 allows any compromised local user to overwrite files. Use 644 for files, 755 for directories.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-08',
      subChapterNumber: '10.8',
      command: 'chmod u=rw,go=r document.txt',
      title: 'Symbolic Permissions',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Targeted character syntax using roles (u,g,o,a), operators (+,-,=), and modes (r,w,x)',
      badges: ['Symbolic', 'chmod', 'Core'],
      difficulty: 'Beginner',
      quote: 'Octal overrides all 9 bits at once; symbolic chmod lets you tweak just one bit while leaving others untouched.',
      whatIsIt: 'Symbolic permissions use readable letters to modify permissions incrementally without calculating octal math. Syntax follows: WHO (u=user, g=group, o=others, a=all) + OPERATOR (+ to add, - to remove, = to set explicitly) + PERMISSION (r=read, w=write, x=execute). For example, "chmod g+w file" adds write to the group while leaving owner and others completely unchanged.',
      inSimpleWords: 'Octal is like replacing the entire lock. Symbolic is like adding or removing a single key. "u+x" means "add execute for user". "go-w" means "take away write from group and others".',
      whyDoYouNeedIt: 'When you only want to make a file executable ("chmod +x script.sh"), symbolic chmod does so without overwriting existing read/write bits.',
      realWorldScenario: 'You have 100 scripts with various existing permissions (some 644, some 600). You need all of them to be executable by their owners. Typing "chmod u+x *.sh" makes every script executable for the owner without altering any other permissions.',
      realWorldAnalogy: 'Adding a single key to your existing keychain without replacing the whole keychain.',
      terms: [
        { term: 'Who Operators (u, g, o, a)', simple: 'u = user/owner, g = group, o = others, a = all (everyone).', technical: 'Target class selector in POSIX symbolic mode grammar.' },
        { term: 'Action Operators (+, -, =)', simple: '+ adds a permission, - removes a permission, = sets exact permissions.', technical: 'Bitwise OR (+), bitwise AND-NOT (-), or bitwise assignment (=).' }
      ],
      syntaxCode: 'chmod [WHO][OP][PERM] FILE',
      syntaxTokens: [
        { token: 'chmod', role: 'command', explanation: 'Change file mode' },
        { token: 'u=rw,go=r', role: 'flag', explanation: 'Set user=rw, group=r, others=r' },
        { token: 'document.txt', role: 'path', explanation: 'Target file' }
      ],
      variations: [
        { syntax: 'chmod +x script.sh', title: 'Add Execute to All', whatItDoes: 'Adds execute bit to user, group, and others (respecting umask)', whenToUse: 'Making scripts runnable' },
        { syntax: 'chmod go-w file.txt', title: 'Revoke Write from Group & Others', whatItDoes: 'Removes write permission from group and world', whenToUse: 'Hardening files against unauthorized edits' }
      ],
      beforeAfter: {
        before: '$ ls -l script.py\n-rw-rw-r-- 1 dev dev 400 Sep 28 10:00 script.py\n$ chmod +x script.py',
        after: '$ ls -l script.py\n-rwxrwxr-x 1 dev dev 400 Sep 28 10:00 script.py',
        explanation: 'Execute bits (+x) were added to all three tiers while preserving existing read/write bits.'
      },
      expectedOutput: '-rwxrwxr-x script.py',
      whatChanges: ['Modifies specific selected mode bits in inode.'],
      whatDoesNotChange: ['Unselected mode bits remain exactly as they were.'],
      safeRecovery: 'Non-destructive. Flip bits back with opposite operator (- or +).',
      commonMistakes: [
        { mistake: 'Typing "chmod +w file" and accidentally giving write permission to everyone on the system', whyItHappens: 'Bare "+w" applies to ALL (user, group, others) modified by umask.', howToFix: 'Specify who: use "chmod u+w file" if you only want the owner to have write access.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-09',
      subChapterNumber: '10.9',
      command: 'sudo chown -R www-data:www-data /var/www/html',
      title: 'chown',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Change Ownership: transfer file and directory owner UIDs and group GIDs',
      badges: ['chown', 'Ownership', 'Admin'],
      difficulty: 'Beginner',
      quote: 'Only root can give away file ownership in Linux; regular users cannot "give away" files.',
      whatIsIt: 'chown ("Change Owner") modifies the user owner (UID) and optionally the group owner (GID) of files and directories using the chown() or fchownat() system calls. In Linux POSIX security, only the root superuser can change file ownership (unprivileged users are forbidden from giving files away to prevent storage quota evasion).',
      inSimpleWords: 'chown changes WHO owns a file. If user "alice" created a file, typing "sudo chown bob file.txt" transfers legal ownership to "bob". You can also change the group at the same time: "sudo chown bob:developers file.txt".',
      whyDoYouNeedIt: 'When web servers (Nginx/Apache), databases, or containers need to manage files created by root or other users, chown grants ownership to the service account.',
      realWorldScenario: 'You extract a WordPress zip file as root into "/var/www/html". Because files are owned by root, WordPress cannot upload images or auto-update plugins. You run: "sudo chown -R www-data:www-data /var/www/html". WordPress can now manage its files seamlessly.',
      realWorldAnalogy: 'Transferring the legal deed of a house from Seller to Buyer at city hall.',
      terms: [
        { term: 'User:Group Syntax', simple: 'The colon separates the new owner from the new group (user:group).', technical: 'Format parsed by chown to set both i_uid and i_gid in inode struct.' },
        { term: 'Quota Evasion Prevention', simple: 'Why regular users cannot give files away in Linux.', technical: 'POSIX security restriction preventing users from transferring large files to other accounts to bypass disk quotas.' }
      ],
      syntaxCode: 'sudo chown [OPTIONS] USER[:GROUP] FILE...',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Root privileges (mandatory for chown)' },
        { token: 'chown', role: 'command', explanation: 'Change file owner and group' },
        { token: '-R', role: 'flag', explanation: 'Operate recursively on directories and their contents' },
        { token: 'www-data:www-data', role: 'argument', explanation: 'New owner user : new owner group' },
        { token: '/var/www/html', role: 'path', explanation: 'Target directory tree' }
      ],
      variations: [
        { syntax: 'sudo chown alex file.txt', title: 'Change Owner Only', whatItDoes: 'Changes user ownership while keeping existing group', whenToUse: 'Transferring file to new user' },
        { syntax: 'sudo chown :developers file.txt', title: 'Change Group Only', whatItDoes: 'Leading colon changes only the group (shorthand for chgrp)', whenToUse: 'Updating team group ownership' }
      ],
      beforeAfter: {
        before: '$ ls -l /var/www/html/app.js\n-rw-r--r-- 1 root root 1200 Sep 28 10:00 app.js\n$ sudo chown www-data:www-data /var/www/html/app.js',
        after: '$ ls -l /var/www/html/app.js\n-rw-r--r-- 1 www-data www-data 1200 Sep 28 10:00 app.js',
        explanation: 'Ownership successfully transferred from root to service user www-data.'
      },
      expectedOutput: '-rw-r--r-- www-data www-data app.js',
      whatChanges: ['Updates inode st_uid and st_gid.'],
      whatDoesNotChange: ['File content and permission bits are unmodified.'],
      safeRecovery: 'Transfer ownership back to the original user with "sudo chown user:group filename".',
      commonMistakes: [
        { mistake: 'Running chown without sudo as a regular user and getting "Operation not permitted"', whyItHappens: 'Regular users are strictly forbidden from changing file owners in Linux.', howToFix: 'Always prefix chown with "sudo".' },
        { mistake: 'Using a dot instead of a colon (e.g. chown user.group file)', whyItHappens: 'Legacy BSD syntax; breaks if usernames contain dots.', howToFix: 'Always use colon syntax: "user:group".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-10',
      subChapterNumber: '10.10',
      command: 'chgrp developers project_notes.md',
      title: 'chgrp',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Change Group ownership: assign files to collaborative group security circles',
      badges: ['chgrp', 'Groups', 'Permissions'],
      difficulty: 'Beginner',
      quote: 'Regular users CAN run chgrp: you can assign your files to any group you belong to.',
      whatIsIt: 'chgrp ("Change Group") modifies only the Group ownership (GID) of files and directories. While changing user ownership requires root, an unprivileged user CAN change group ownership of files they own, provided they are an active member of the destination group.',
      inSimpleWords: 'If you create a file, it starts with your private group. "chgrp developers file.txt" shares group ownership with the "developers" group so your teammates can collaborate on it.',
      whyDoYouNeedIt: 'You need chgrp when sharing project files with teammates without needing sudo or root privileges.',
      realWorldScenario: 'You are working on a shared codebase. You create a file "api_spec.md". By default, it is owned by your private group "alice:alice". You run "chgrp engineering api_spec.md". Now everyone in the engineering group can read and edit the specification.',
      realWorldAnalogy: 'Moving a project folder from your personal desk to the department conference room table.',
      terms: [
        { term: 'Group Ownership Transfer', simple: 'Assigning a file to a group you belong to.', technical: 'Invokes chown() system call updating only i_gid; allowed if caller is file owner and member of target GID.' }
      ],
      syntaxCode: 'chgrp [OPTIONS] GROUP FILE...',
      syntaxTokens: [
        { token: 'chgrp', role: 'command', explanation: 'Change group ownership' },
        { token: 'developers', role: 'argument', explanation: 'Target group name' },
        { token: 'project_notes.md', role: 'path', explanation: 'Target file' }
      ],
      variations: [
        { syntax: 'chgrp -R analytics /data/reports', title: 'Recursive Group Change', whatItDoes: 'Changes group ownership for directory and all nested files', whenToUse: 'Shared team data folders' }
      ],
      beforeAfter: {
        before: '$ ls -l doc.md\n-rw-rw-r-- 1 alex alex 200 Sep 28 10:00 doc.md\n$ chgrp developers doc.md',
        after: '$ ls -l doc.md\n-rw-rw-r-- 1 alex developers 200 Sep 28 10:00 doc.md',
        explanation: 'Group ownership transitioned from private group "alex" to team group "developers".'
      },
      expectedOutput: '-rw-rw-r-- alex developers doc.md',
      whatChanges: ['Updates inode st_gid.'],
      whatDoesNotChange: ['User owner and permission mode bits are untouched.'],
      safeRecovery: 'Change back to your private group with "chgrp $(id -gn) filename".',
      commonMistakes: [
        { mistake: 'Trying to chgrp to a group you are not a member of', whyItHappens: 'Linux returns "Operation not permitted" unless you belong to that group or use sudo.', howToFix: 'Join the group first or use sudo.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-11',
      subChapterNumber: '10.11',
      command: 'umask 022',
      title: 'umask',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'The User Mask filter: determines default permissions for newly created files and directories',
      badges: ['umask', 'Security', 'Permissions'],
      difficulty: 'Intermediate',
      quote: 'umask does not give permissions; it subtracts (masks out) permissions from newly created files.',
      whatIsIt: 'umask (User Mask) is a 4-digit octal filter that determines the default permissions assigned to newly created files and directories. Linux filesystems start with maximum base permissions: 666 (rw-rw-rw-) for files and 777 (rwxrwxrwx) for directories. The umask bits are subtracted via bitwise NOT-AND (base & ~umask). A standard umask of 022 produces files with mode 644 (666 - 022) and directories with mode 755 (777 - 022).',
      inSimpleWords: 'Think of umask as a stencil or sunglasses. If the default light is 100%, umask filters out specific rays. A umask of 027 filters out write for the group, and blocks EVERYTHING for others, making new files private automatically.',
      whyDoYouNeedIt: 'umask prevents human error: you don\'t have to remember to chmod every new file you create. It automatically enforces your security baseline across all applications.',
      realWorldScenario: 'You are working on a high-security financial server. You set "umask 077" in /etc/profile. Whenever any user or service creates a file, its permissions are automatically 600 (-rw-------), completely invisible and inaccessible to all other users.',
      realWorldAnalogy: 'A cookie cutter that cuts away dough to leave behind only the desired shape.',
      terms: [
        { term: 'Base Permissions', simple: 'Files start at 666 (no execute); directories start at 777.', technical: 'Maximum POSIX mode requested by open(O_CREAT) before umask filtering.' },
        { term: 'Bitwise Masking', simple: 'Effective Mode = Base AND (NOT umask).', technical: 'Mode calculation: mode = base_mode & ~current_umask.' }
      ],
      syntaxCode: 'umask [OCTAL_MASK]',
      syntaxTokens: [
        { token: 'umask', role: 'command', explanation: 'Set or display file mode creation mask' },
        { token: '022', role: 'argument', explanation: 'Mask subtracting group write (2) and other write (2)' }
      ],
      variations: [
        { syntax: 'umask -S', title: 'Display Symbolic Mask', whatItDoes: 'Prints readable effective default mode (e.g. u=rwx,g=rx,o=rx)', whenToUse: 'Checking active default mask' },
        { syntax: 'umask 077', title: 'Maximum Paranoia Mode (077)', whatItDoes: 'Masks all group and other permissions (new files = 600, dirs = 700)', whenToUse: 'High-security multi-tenant servers' }
      ],
      beforeAfter: {
        before: '$ umask\n0022\n$ touch default_file.txt\n$ ls -l default_file.txt',
        after: '-rw-r--r-- 1 dev dev 0 Sep 28 10:00 default_file.txt\n[666 base minus 022 umask = 644]',
        explanation: 'The 022 umask automatically masked out group and other write bits.'
      },
      expectedOutput: '0022',
      whatChanges: ['Updates process umask in task_struct->fs->umask.'],
      whatDoesNotChange: ['Existing files on disk are completely unaffected.'],
      safeRecovery: 'Reset to standard default: "umask 022".',
      commonMistakes: [
        { mistake: 'Thinking umask can add the execute bit (+x) to newly created files', whyItHappens: 'Files start with base 666 (no execute bits); umask can only SUBTRACT permissions, never add them!', howToFix: 'Files always require an explicit "chmod +x" to become executable.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-12',
      subChapterNumber: '10.12',
      command: 'ls -l /usr/bin/passwd',
      title: 'Special Permissions',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'The 3 high-order security bits: SUID (4000), SGID (2000), and Sticky Bit (1000)',
      badges: ['SpecialBits', 'SUID', 'SGID', 'StickyBit'],
      difficulty: 'Intermediate',
      quote: 'Beyond read, write, and execute lie three special bits that power the entire Linux security architecture.',
      whatIsIt: 'In addition to the 9 standard rwx bits, Linux filesystem inodes support 3 High-Order Special Permission Bits: 1. SUID (Set User ID, octal 4000: executes with file owner\'s privileges), 2. SGID (Set Group ID, octal 2000: executes with file group\'s privileges or inherits directory group), and 3. Sticky Bit (octal 1000: prevents non-owners from deleting files in shared directories).',
      inSimpleWords: 'Standard permissions say who can open a file. Special permissions give superpowers: SUID lets a normal user run a program with root powers temporarily; SGID ensures shared team folders keep the same group; the Sticky Bit protects public folders like /tmp.',
      whyDoYouNeedIt: 'Without SUID, a regular user could never change their password (because normal users cannot write to /etc/shadow). /usr/bin/passwd has SUID set, granting temporary root powers to write the password safely.',
      realWorldScenario: 'You inspect "/usr/bin/passwd" with "ls -l": "-rwsr-xr-x 1 root root". Notice the "s" in place of "x"! That "s" is the SUID bit: it allows any human user to execute the binary and modify /etc/shadow with root authority.',
      realWorldAnalogy: 'A notary public stamp. An unprivileged citizen cannot certify a legal deed, but using the official notary stamp (SUID) grants that legal power temporarily.',
      terms: [
        { term: 'SUID (SetUID, 4000)', simple: 'Program runs with the identity of the file owner, not the person executing it.', technical: 'Sets process EUID to inode i_uid during execve.' },
        { term: 'SGID (SetGID, 2000)', simple: 'Program runs with group identity, or directory forces child files to inherit group.', technical: 'Sets EGID or forces child inode i_gid to match parent directory i_gid.' },
        { term: 'Sticky Bit (1000)', simple: 'Only file owners can delete their own files in this shared directory.', technical: 'Restricts unlink/rename in directory to file owner or root.' }
      ],
      syntaxCode: 'chmod [4|2|1][755] [TARGET]',
      syntaxTokens: [
        { token: 'chmod', role: 'command', explanation: 'Change mode bits' },
        { token: '4755', role: 'flag', explanation: '4 (SUID) + 755 (rwxr-xr-x)' },
        { token: '/usr/bin/passwd', role: 'path', explanation: 'Target binary' }
      ],
      variations: [
        { syntax: 'find / -perm -4000 -type f 2>/dev/null', title: 'Audit All SUID Binaries', whatItDoes: 'Discovers all SUID root binaries on the entire filesystem', whenToUse: 'Security hardening and privilege escalation audits' }
      ],
      beforeAfter: {
        before: '$ ls -l /usr/bin/passwd\n-rwsr-xr-x 1 root root 68208 Sep 28 10:00 /usr/bin/passwd',
        after: '[Note "s" in owner execute position: SUID bit is active]',
        explanation: 'Proves unprivileged users can execute passwd with root effective privileges.'
      },
      expectedOutput: '-rwsr-xr-x root root /usr/bin/passwd',
      whatChanges: ['Modifies high-order special mode bits in inode.'],
      whatDoesNotChange: ['Standard permissions remain unchanged.'],
      safeRecovery: 'Remove SUID with "chmod u-s binary".',
      commonMistakes: [
        { mistake: 'Setting SUID on shell scripts (#/bin/bash)', whyItHappens: 'Hoping to make a script run as root.', howToFix: 'The Linux kernel explicitly IGNORES the SUID bit on shell scripts for security reasons! Use sudoers instead.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-13',
      subChapterNumber: '10.13',
      command: 'chmod u+s /usr/local/bin/custom_admin',
      title: 'SUID',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Set User ID (octal 4000): execute binaries with the effective privileges of the file owner',
      badges: ['SUID', 'Privilege', 'Security'],
      difficulty: 'Intermediate',
      quote: 'SUID is a double-edged sword: it enables vital system tools like passwd, but a vulnerable SUID binary gives attackers instant root.',
      whatIsIt: 'Set User ID (SUID, octal 4000) is a special permission bit applicable to compiled binary executables. When an unprivileged user executes an SUID binary owned by root, the kernel sets the process\'s Effective User ID (EUID) to root (UID 0) rather than the calling user\'s UID. In "ls -l", it displays as a lowercase "s" in the owner\'s execute slot (or capital "S" if owner execute is missing).',
      inSimpleWords: 'Imagine a special pen locked in an office. When you hold that pen, whatever paper you sign has the authority of the CEO. That is SUID: while you are running that program, you possess the powers of the file owner.',
      whyDoYouNeedIt: 'Essential system commands like "passwd", "sudo", "su", and "ping" (historically for raw ICMP sockets) require SUID root to perform privileged kernel operations for normal users.',
      realWorldScenario: 'An attacker gains access to a web server as unprivileged user "www-data". The attacker runs "find / -perm -4000 2>/dev/null" to search for custom SUID binaries. If an administrator set SUID on a vulnerable binary or text editor (like vim or bash), the attacker can spawn a root shell instantly.',
      realWorldAnalogy: 'A guest at a luxury hotel holding a temporary master keycard handed to them by the manager to unlock their floor.',
      terms: [
        { term: 'EUID (Effective User ID)', simple: 'The identity the kernel checks when granting permissions to a running process.', technical: 'Process credential attribute determining permission checking; differs from real UID (RUID) under SUID.' },
        { term: 'Capital "S"', simple: 'Warning indicating SUID is set on a file that lacks regular execute permission.', technical: 'Visual indicator that SUID (4000) is active but owner execute bit (0100) is missing.' }
      ],
      syntaxCode: 'chmod u+s [COMPILED_BINARY]',
      syntaxTokens: [
        { token: 'chmod', role: 'command', explanation: 'Change mode' },
        { token: 'u+s', role: 'flag', explanation: 'Add Set User ID bit to owner class' },
        { token: 'binary', role: 'path', explanation: 'Target compiled executable' }
      ],
      variations: [
        { syntax: 'chmod 4755 binary', title: 'Octal SUID Assignment', whatItDoes: 'Sets SUID (4) and rwxr-xr-x (755)', whenToUse: 'Binary packaging' },
        { syntax: 'chmod u-s binary', title: 'Revoke SUID', whatItDoes: 'Strips SUID bit from file', whenToUse: 'Security hardening' }
      ],
      beforeAfter: {
        before: '$ ls -l helper\n-rwxr-xr-x 1 root root 15000 Sep 28 10:00 helper\n$ sudo chmod u+s helper',
        after: '$ ls -l helper\n-rwsr-xr-x 1 root root 15000 Sep 28 10:00 helper',
        explanation: 'Note the "s" in the owner execute position: SUID is now active.'
      },
      expectedOutput: '-rwsr-xr-x helper',
      whatChanges: ['Sets SUID bit (04000) in inode.'],
      whatDoesNotChange: ['Binary code is untouched.'],
      safeRecovery: 'Revoke immediately with "sudo chmod u-s binary".',
      commonMistakes: [
        { mistake: 'Setting SUID on a text editor (e.g. chmod u+s /bin/nano)', whyItHappens: 'Trying to let users edit a single file easily.', howToFix: 'Giving SUID to nano or vim allows ANY user to open /etc/shadow or root SSH keys and edit them! Use sudoers with specific commands instead.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-14',
      subChapterNumber: '10.14',
      command: 'chmod g+s /var/www/shared_project',
      title: 'SGID',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Set Group ID (octal 2000): force new child files in a directory to inherit the parent folder\'s group',
      badges: ['SGID', 'Collaboration', 'Core'],
      difficulty: 'Intermediate',
      quote: 'SGID on a directory is the magic glue of team collaboration: all new files inherit the team group automatically.',
      whatIsIt: 'Set Group ID (SGID, octal 2000) has two distinct behaviors: On Executables, it executes with the Effective Group ID of the file. On Directories, it enforces Group Inheritance: every new file or subfolder created inside the directory automatically inherits the Group ownership of the parent directory, rather than the primary group of the user who created it.',
      inSimpleWords: 'Normally, when Alice creates a file in a shared folder, it gets owned by "alice:alice", and Bob cannot edit it. Setting SGID on the folder forces every new file to be owned by "engineering", so both Alice and Bob can collaborate seamlessly.',
      whyDoYouNeedIt: 'SGID is mandatory for shared project directories, code repositories, and collaborative team file shares.',
      realWorldScenario: 'You configure a shared website directory: "/var/www/site". You assign it to group "webdevs" and set the SGID bit: "sudo chmod 2775 /var/www/site". When developer Priya creates "header.html", the file is automatically owned by group "webdevs", allowing developer Alex to edit it immediately.',
      realWorldAnalogy: 'A company stationery tray. Any document written on company stationery automatically bears the department company logo, no matter who wrote it.',
      terms: [
        { term: 'Group Inheritance', simple: 'New files automatically get the parent folder\'s group.', technical: 'Kernel VFS mechanism copying parent directory inode i_gid to new child inode i_gid.' },
        { term: '2775 Mode', simple: 'The standard permission for shared collaboration folders.', technical: 'Octal 2 (SGID) + 775 (rwxrwxr-x).' }
      ],
      syntaxCode: 'chmod g+s [DIRECTORY]',
      syntaxTokens: [
        { token: 'chmod', role: 'command', explanation: 'Change mode' },
        { token: 'g+s', role: 'flag', explanation: 'Add SGID bit to group class' },
        { token: '/var/www/shared_project', role: 'path', explanation: 'Target collaboration directory' }
      ],
      variations: [
        { syntax: 'chmod 2775 /shared/folder', title: 'Set SGID with Full Team Permissions', whatItDoes: 'Enforces SGID and full rwx for owner and group', whenToUse: 'Setting up new team folders' }
      ],
      beforeAfter: {
        before: '$ ls -ld /var/www/shared\ndrwxrwxr-x 2 root developers 4096 Sep 28 10:00 /var/www/shared\n$ sudo chmod g+s /var/www/shared',
        after: '$ ls -ld /var/www/shared\ndrwxrwsr-x 2 root developers 4096 Sep 28 10:00 /var/www/shared',
        explanation: 'Note the "s" in the group execute position: SGID group inheritance is active.'
      },
      expectedOutput: 'drwxrwsr-x /var/www/shared',
      whatChanges: ['Sets SGID bit (02000) on directory inode.'],
      whatDoesNotChange: ['Existing files inside the folder are not retroactively changed.'],
      safeRecovery: 'Revoke SGID with "chmod g-s directory".',
      commonMistakes: [
        { mistake: 'Setting SGID on a directory and expecting existing old files to change group', whyItHappens: 'SGID only affects FUTURE new files created after the bit is set.', howToFix: 'Update existing files manually with "chgrp -R teamgroup directory" first.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-15',
      subChapterNumber: '10.15',
      command: 'chmod +t /shared_scratch',
      title: 'Sticky Bit',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'The deletion protection bit (octal 1000): restrict unlinking and renaming in shared folders to file owners',
      badges: ['StickyBit', 'Security', 'Core'],
      difficulty: 'Intermediate',
      quote: 'The Sticky Bit turns public folders into secure lockers: everyone can store files, but only you can delete yours.',
      whatIsIt: 'The Sticky Bit (octal 1000) applies to shared directories (most notably /tmp and /var/tmp). When the Sticky Bit is set on a world-writable directory (mode 1777: "drwxrwxrwt"), the Linux kernel enforces an exception to standard write permissions: a file in that directory can ONLY be deleted or renamed by the file\'s owner, the directory\'s owner, or root.',
      inSimpleWords: 'Without the sticky bit, anyone with write access to a shared folder could delete everyone else\'s files! The sticky bit protects shared public folders so malicious users cannot delete your files.',
      whyDoYouNeedIt: 'Every multi-user Linux system requires /tmp to be world-writable. Without the sticky bit, any normal user could delete database socket files (/tmp/mysql.sock) or wipe another user\'s compile cache.',
      realWorldScenario: 'You inspect /tmp with "ls -ld /tmp". You see: "drwxrwxrwt". The trailing "t" proves the sticky bit is active. User Bob can create files in /tmp, but if Bob tries to run "rm alice_data.tmp", Linux blocks Bob with "Operation not permitted".',
      realWorldAnalogy: 'Public airport luggage storage lockers. Anyone can put luggage in a locker, but only the person holding the key can open and remove that luggage.',
      terms: [
        { term: 'Mode 1777', simple: 'The canonical permission for public temporary folders.', technical: 'Octal 1 (Sticky Bit) + 777 (rwxrwxrwx) displayed as drwxrwxrwt.' },
        { term: 'Trailing "t"', simple: 'The visual symbol in ls -ld showing the sticky bit is active.', technical: 'Lowercase "t" indicates sticky bit + execute; capital "T" indicates sticky bit without execute.' }
      ],
      syntaxCode: 'chmod +t [DIRECTORY]',
      syntaxTokens: [
        { token: 'chmod', role: 'command', explanation: 'Change mode' },
        { token: '+t', role: 'flag', explanation: 'Add Sticky Bit (octal 1000)' },
        { token: '/shared_scratch', role: 'path', explanation: 'Target public directory' }
      ],
      variations: [
        { syntax: 'chmod 1777 /tmp', title: 'Restore Canonical /tmp Permissions', whatItDoes: 'Applies Sticky Bit (1) and world rwx (777)', whenToUse: 'Repairing broken /tmp permissions' }
      ],
      beforeAfter: {
        before: '$ ls -ld /public\ndrwxrwxrwx 2 root root 4096 Sep 28 10:00 /public\n$ sudo chmod +t /public',
        after: '$ ls -ld /public\ndrwxrwxrwt 2 root root 4096 Sep 28 10:00 /public',
        explanation: 'Note the trailing "t": non-owners are now strictly barred from deleting each other\'s files.'
      },
      expectedOutput: 'drwxrwxrwt /public',
      whatChanges: ['Sets sticky bit (01000) in inode st_mode.'],
      whatDoesNotChange: ['Files inside directory are untouched.'],
      safeRecovery: 'Remove with "chmod -t directory".',
      commonMistakes: [
        { mistake: 'Removing the sticky bit from /tmp by running "chmod 777 /tmp"', whyItHappens: 'Forgetting the leading 1 (1777).', howToFix: 'Always maintain "chmod 1777 /tmp". Without it, any user can delete other users\' active session sockets!' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-10-16',
      subChapterNumber: '10.16',
      command: 'namei -l /var/www/html/index.html',
      title: 'Permission Troubleshooting',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Surgical diagnostic methodology: traverse parent directory paths, namei, and access auditing',
      badges: ['Troubleshooting', 'Diagnostics', 'Triage'],
      difficulty: 'Intermediate',
      quote: '90% of "Permission Denied" errors on a file are actually caused by a missing execute bit on a PARENT directory.',
      whatIsIt: 'Permission Troubleshooting is the diagnostic science of resolving "Permission Denied" (EACCES) errors. When an application cannot access a file, inexperienced administrators immediately chmod 777 the file. Senior engineers use tools like "namei -l" to inspect every single directory component along the entire path from root "/" down to the file, ensuring that every parent folder has the execute ("x") bit enabled for the calling user.',
      inSimpleWords: 'If a file has full read permissions (644), why does Nginx say "Permission denied"? Because a parent folder two levels up (/home/user) does not let Nginx walk through it! "namei -l" shows you the permissions of every door along the hallway.',
      whyDoYouNeedIt: 'It eliminates guessing and stops engineers from dangerously setting 777 on production files.',
      realWorldScenario: 'You set up a web server to serve files from "/home/developer/mysite/index.html". The file has 644 permissions. Nginx returns 403 Forbidden. You run "namei -l /home/developer/mysite/index.html" and discover: "/home/developer" has permissions "drwxr-x---". Nginx (user www-data) cannot pass through /home/developer! Fixing the parent folder permissions solves the issue.',
      realWorldAnalogy: 'You have the key to your office door on the 10th floor, but the ground floor lobby doors are locked. You cannot reach your office even though you have the office key.',
      terms: [
        { term: 'namei', simple: 'A tool that prints the permissions of every folder along a file path.', technical: 'Utility that follows path resolution and prints type, permissions, owner, and group for each segment.' },
        { term: 'Parent Traverse Prerequisite', simple: 'You must have "x" on every folder leading up to the file.', technical: 'POSIX path resolution requires execute (search) bit on every directory dentry in the path.' }
      ],
      syntaxCode: 'namei -l [FULL_PATH_TO_FILE]',
      syntaxTokens: [
        { token: 'namei', role: 'command', explanation: 'Follow a pathname until a terminal point is found' },
        { token: '-l', role: 'flag', explanation: 'Use long listing format showing permissions, owner, and group' },
        { token: '/var/www/html/index.html', role: 'path', explanation: 'Target problematic file path' }
      ],
      variations: [
        { syntax: 'sudo -u www-data test -r /var/www/index.html ; echo $?', title: 'Test Read as Specific User', whatItDoes: 'Simulates reading file as unprivileged service user (0=success, 1=denied)', whenToUse: 'Verifying service permissions without restarting daemons' }
      ],
      beforeAfter: {
        before: '$ namei -l /home/dev/site/index.html\n[Analyzing parent path permissions...]',
        after: 'f: /home/dev/site/index.html\ndrwxr-xr-x root root /\ndrwxr-xr-x root root home\ndrwx------ dev  dev  dev       <-- BOTTLENECK: others have no execute!\ndrwxr-xr-x dev  dev  site\n-rw-r--r-- dev  dev  index.html',
        explanation: 'namei instantly isolated the exact parent folder (/home/dev) blocking access.'
      },
      expectedOutput: 'drwxr-xr-x /home/dev',
      whatChanges: ['Traverses path inodes.'],
      whatDoesNotChange: ['System remains intact.'],
      safeRecovery: 'Add execute to blocking parent directory: "chmod o+x /home/dev".',
      commonMistakes: [
        { mistake: 'Running "chmod 777 file.txt" when the block is in a parent directory', whyItHappens: 'File-level permissions cannot override a locked parent directory.', howToFix: 'Always check the full path with "namei -l" first.' }
      ]
    })
  ]
};
