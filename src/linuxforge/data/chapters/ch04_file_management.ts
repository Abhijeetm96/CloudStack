import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 04: FILE MANAGEMENT (04.1 to 04.13)
// Deep Senior Engineer Curriculum Implementation
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
      badges: ['Files', 'Creation', 'Core'],
      difficulty: 'Beginner',
      quote: 'touch does not mean "create a file"; its primary Unix purpose is to update file timestamps without altering contents.',
      whatIsIt: 'touch updates the access time (atime) and modification time (mtime) of an existing file to the current system time using the utimensat() system call. If the target file does not exist, touch creates a new empty file (0 bytes) with standard default permissions governed by umask.',
      inSimpleWords: 'Think of touch as a digital date-stamp. If you stamp an existing sheet of paper, you update the timestamp on it without erasing anything. If you stamp an empty desk, a blank piece of paper materializes with today\'s date.',
      whyDoYouNeedIt: 'You need touch to create empty configuration placeholders, touch sentinel/lock files in automation scripts, and artificially update file timestamps to trigger build tools like Make.',
      realWorldScenario: 'A build system uses Make to compile code. It only recompiles files whose source code timestamp is newer than the binary. To force a recompile of a single module without changing code, you run "touch module.c".',
      realWorldAnalogy: 'Tapping a digital clock to reset the last-seen timestamp on a visitor badge.',
      withoutVsWith: {
        without: {
          title: 'Creating Files Without touch',
          items: ['Opening text editors just to create a placeholder', 'Using echo "" > file which accidentally writes a 1-byte newline', 'Inability to trigger timestamp-sensitive build caches'],
          outcome: 'Clunky workflows, non-empty placeholder files, and broken build caches.'
        },
        with: {
          title: 'Using touch Correctly',
          items: ['Instant 0-byte file allocation', 'Updating atime and mtime atomically without opening file descriptors', 'Testing write permissions on directories cleanly'],
          outcome: 'Clean automation scripts and deterministic build pipeline triggers.'
        }
      },
      blockDiagram: {
        title: 'touch Filesystem Inode Interaction',
        subtitle: 'touch interacts with filesystem metadata tables:',
        nodes: [
          { id: 'check', label: 'Inode Lookup', simpleDef: 'Checks if filename exists in directory dentry', techDef: 'Path resolution via namei()', badge: 'VFS', color: '#38bdf8' },
          { id: 'branch', label: 'Existence Branch', simpleDef: 'File exists vs does not exist', techDef: 'Inode NULL check', badge: 'Branch', color: '#a855f7' },
          { id: 'update', label: 'File Exists: Update mtime', simpleDef: 'Updates timestamp without touching file data blocks', techDef: 'utimensat() syscall', badge: 'Timestamp', color: '#10b981' },
          { id: 'create', label: 'File Missing: Allocate Inode', simpleDef: 'Allocates new 0-byte inode with current umask', techDef: 'open(O_CREAT|O_WRONLY) syscall', badge: 'Creation', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'mtime (Modification Time)', simple: 'The timestamp when file contents were last changed.', technical: 'Inode st_mtime field updated on write system calls.' },
        { term: 'atime (Access Time)', simple: 'The timestamp when a file was last read.', technical: 'Inode st_atime field updated on read system calls (managed by relatime/noatime mount options).' }
      ],
      syntaxCode: 'touch [OPTIONS] FILE...',
      syntaxTokens: [
        { token: 'touch', role: 'command', explanation: 'Update file timestamps or create empty file' },
        { token: 'app.config', role: 'argument', explanation: 'Target filename to create or touch' }
      ],
      variations: [
        { syntax: 'touch -c file.txt', title: 'Do Not Create Missing File', whatItDoes: 'Only updates timestamps if file already exists; suppresses file creation', whenToUse: 'When you only want to touch existing files safely' },
        { syntax: 'touch -t 202401011200 file.txt', title: 'Set Explicit Timestamp', whatItDoes: 'Sets exact date and time (YYYYMMDDhhmm)', whenToUse: 'When backdating timestamps in test suites' }
      ],
      beforeAfter: {
        before: '$ ls -l app.config\nls: cannot access \'app.config\': No such file or directory\n$ touch app.config',
        after: '$ ls -l app.config\n-rw-r--r-- 1 dev dev 0 Sep 28 10:00 app.config',
        explanation: 'A clean 0-byte file is created with permissions 644 derived from system umask.'
      },
      expectedOutput: '-rw-r--r-- dev dev 0 app.config',
      whatChanges: ['Creates directory entry and allocates inode, or updates inode st_mtime.'],
      whatDoesNotChange: ['If file exists, existing file contents are 100% preserved.'],
      safeRecovery: 'Non-destructive. If you accidentally touched an existing file, its contents are completely safe; only its timestamp updated.',
      commonMistakes: [
        { mistake: 'Using "echo > file.txt" instead of "touch file.txt" to create empty files', whyItHappens: 'Thinking echo creates empty files.', howToFix: '"echo > file.txt" writes a newline character (size 1 byte). Use "touch" or ": > file.txt" for true 0-byte files.' },
        { mistake: 'Assuming touch can create parent directories automatically', whyItHappens: 'Typing "touch path/to/nested/file.txt" when "nested" does not exist.', howToFix: 'Create directories first with "mkdir -p path/to/nested" before touching the file.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-04-02',
      subChapterNumber: '04.2',
      command: 'mkdir -p project/{src,bin,docs}',
      title: 'mkdir',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Create new directories and nested folder hierarchies with brace expansion',
      badges: ['Directories', 'Creation', 'Core'],
      difficulty: 'Beginner',
      quote: 'Never run mkdir multiple times; the -p flag and brace expansion build entire directory structures in one shot.',
      whatIsIt: 'mkdir ("Make Directory") invokes the mkdir() system call to create a new directory node on the filesystem. By default, it errors if parent directories do not exist or if the target directory already exists. Using "-p" ("parents") creates missing parent folders automatically and avoids errors if the folder already exists.',
      inSimpleWords: 'Typing "mkdir myfolder" creates a new folder. Adding "-p" allows you to build deeply nested folders (e.g. "mkdir -p a/b/c/d") in a single breath without creating each level manually.',
      whyDoYouNeedIt: 'Every software project, logging pipeline, and server installation requires creating directory structures. Understanding mkdir -p is mandatory for writing idempotent automation scripts.',
      realWorldScenario: 'You are deploying a web service via a CI/CD script. If you run "mkdir /var/log/myapp", the second run crashes your build with "File exists". Changing the script to "mkdir -p /var/log/myapp" makes it idempotent (safe to run repeatedly).',
      realWorldAnalogy: 'Erecting modular walls in an office building to create new meeting rooms and corridors.',
      terms: [
        { term: 'Parent Flag (-p)', simple: 'Creates missing parent folders and ignores "already exists" errors.', technical: 'Ensures idempotent directory creation by calling mkdir for each path component if not present.' },
        { term: 'Brace Expansion', simple: 'Shell syntax {a,b,c} that multiplies arguments automatically.', technical: 'Bash word expansion generating comma-separated permutations before passing them to the command.' }
      ],
      syntaxCode: 'mkdir [OPTIONS] DIRECTORY...',
      syntaxTokens: [
        { token: 'mkdir', role: 'command', explanation: 'Create new directory' },
        { token: '-p', role: 'flag', explanation: 'Create parent directories as needed without erroring if existing' },
        { token: 'project/{src,bin,docs}', role: 'path', explanation: 'Brace expansion generating project/src, project/bin, project/docs' }
      ],
      variations: [
        { syntax: 'mkdir -m 700 secret_dir', title: 'Create with Custom Mode', whatItDoes: 'Creates directory with strict owner-only permissions (700) immediately', whenToUse: 'When creating private key or SSL certificate storage directories' },
        { syntax: 'mkdir -v build', title: 'Verbose Creation', whatItDoes: 'Prints confirmation message for each directory created', whenToUse: 'In audit logs and interactive shells' }
      ],
      beforeAfter: {
        before: '$ ls project\nls: cannot access \'project\': No such file or directory\n$ mkdir -p project/{src,bin,docs}',
        after: '$ tree project\nproject\n├── bin\n├── docs\n└── src\n3 directories, 0 files',
        explanation: 'Creates the parent folder and all three child subfolders in a single atomic shell command.'
      },
      expectedOutput: 'project/src\nproject/bin\nproject/docs',
      whatChanges: ['Allocates directory inodes and creates dentry records in parent directory.'],
      whatDoesNotChange: ['Existing files in parent folders are untouched.'],
      safeRecovery: 'If you created the wrong directory, delete it safely with "rmdir directory" (if empty) or "rm -r directory".',
      commonMistakes: [
        { mistake: 'Forgetting the -p flag in automated deployment scripts', whyItHappens: 'Second execution of the script fails with "mkdir: cannot create directory: File exists".', howToFix: 'Always include "-p" in scripts: "mkdir -p /path/to/dir".' },
        { mistake: 'Putting spaces inside brace expansion (e.g. mkdir {src, bin, docs})', whyItHappens: 'Bash treats spaces as argument delimiters, breaking brace expansion.', howToFix: 'Never put spaces after commas in braces: {src,bin,docs}.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-04-03',
      subChapterNumber: '04.3',
      command: 'cp -r src/ backup/',
      title: 'cp',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Copy files and recursive directories preserving permissions and metadata',
      badges: ['Copy', 'Files', 'Core'],
      difficulty: 'Beginner',
      quote: 'When copying production files, use -a (archive) to preserve permissions, ownership, and timestamps intact.',
      whatIsIt: 'cp ("Copy") duplicates files and directories. When copying a file, it reads data blocks from the source inode and writes them into a newly allocated target inode. To copy directories and their contents, you must supply the recursive flag (-r) or the archive flag (-a).',
      inSimpleWords: 'Typing "cp file1.txt file2.txt" makes an exact duplicate copy of a file. If you edit file2.txt later, file1.txt remains untouched because they are completely separate files on your disk.',
      whyDoYouNeedIt: 'You need cp for creating configuration backups before edits, replicating assets, and migrating directories.',
      realWorldScenario: 'You are modifying /etc/ssh/sshd_config. Before touching a single line, you execute "sudo cp -a /etc/ssh/sshd_config /etc/ssh/sshd_config.bak". If your edits lock you out, you have a flawless backup with identical permissions.',
      realWorldAnalogy: 'Photocopying a document. You produce an identical paper copy with the exact same text, but writing on the photocopy does not change the original.',
      terms: [
        { term: 'Archive Mode (-a)', simple: 'Copies everything recursively and preserves exact ownership, permissions, and dates.', technical: 'Equivalent to -dR --preserve=all, copying symlinks as symlinks and preserving file metadata.' },
        { term: 'Recursive (-r / -R)', simple: 'Copies a folder and all its subfolders and files.', technical: 'Traverses directory tree copying dentries and allocating new inodes recursively.' }
      ],
      syntaxCode: 'cp [OPTIONS] SOURCE... DESTINATION',
      syntaxTokens: [
        { token: 'cp', role: 'command', explanation: 'Copy files and directories' },
        { token: '-r', role: 'flag', explanation: 'Copy directories recursively' },
        { token: 'src/', role: 'path', explanation: 'Source directory to copy' },
        { token: 'backup/', role: 'path', explanation: 'Target destination directory' }
      ],
      variations: [
        { syntax: 'cp -a /etc /var/backups/etc', title: 'Archive System Config', whatItDoes: 'Preserves ownership, permissions, and symlinks', whenToUse: 'When taking disaster-recovery system backups' },
        { syntax: 'cp -i file.txt destination/', title: 'Interactive Overwrite Prompt', whatItDoes: 'Asks for confirmation before overwriting an existing destination file', whenToUse: 'When copying files manually in sensitive directories' },
        { syntax: 'cp -u src/* dest/', title: 'Update Copy Only', whatItDoes: 'Only copies files that are newer than the destination files', whenToUse: 'When syncing build artifacts' }
      ],
      beforeAfter: {
        before: '$ ls backup\nls: cannot access \'backup\': No such file or directory\n$ cp -r src/ backup/',
        after: '$ ls backup\napp.js styles.css index.html',
        explanation: 'All files from src/ are duplicated into the newly created backup/ directory.'
      },
      expectedOutput: '[Files duplicated into destination]',
      whatChanges: ['Allocates new inodes and writes duplicate data blocks in destination.'],
      whatDoesNotChange: ['Source files are completely untouched.'],
      safeRecovery: 'cp does not modify source files. If you copied to the wrong place, remove the duplicated files in the destination.',
      commonMistakes: [
        { mistake: 'Running "cp folder1 folder2" without -r', whyItHappens: 'Forgetting that directories require recursive mode.', howToFix: 'Linux will report "cp: -r not specified; omitting directory". Always add "-r" or "-a".' },
        { mistake: 'Copying files as root without -a, changing file ownership to root', whyItHappens: 'Regular cp assigns ownership to whoever executes the copy.', howToFix: 'Use "cp -a" to preserve original user ownership.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-04-04',
      subChapterNumber: '04.4',
      command: 'mv old-name.txt new-name.txt',
      title: 'mv',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Move files across directories or rename files atomically within the same filesystem',
      badges: ['Move', 'Rename', 'Core'],
      difficulty: 'Beginner',
      quote: 'Renaming and moving are the exact same operation in Linux: updating a directory entry pointer.',
      whatIsIt: 'mv ("Move") moves files and directories from one path to another, or renames them. If the move is within the same filesystem, mv is an instantaneous atomic operation using the rename() system call—zero data blocks are copied; only directory pointer names change. If moving across separate filesystems, mv copies data and deletes the source.',
      inSimpleWords: 'In Windows, "rename" and "move" feel like two different concepts. In Linux, they are identical. Renaming "app.js" to "app.ts" is simply moving the file to a new name.',
      whyDoYouNeedIt: 'Because mv on the same filesystem is atomic (happens in microseconds regardless of whether the file is 1 Kilobyte or 100 Gigabytes), it is used in production for zero-downtime deployments and log rotations.',
      realWorldScenario: 'You are deploying a new website version. You extract the code into "/var/www/release_v2". Then you execute an atomic move: "mv -T /var/www/release_v2 /var/www/active". Web traffic transitions instantly with zero 404 errors during the cutover.',
      realWorldAnalogy: 'Changing the label on a physical folder in a filing cabinet. You do not retype all 500 pages inside; you simply write a new name on the outside tab.',
      terms: [
        { term: 'Atomic Rename', simple: 'A move that happens instantaneously with zero intermediate partial state.', technical: 'rename() system call updating dentry pointer in directory block without I/O copy.' },
        { term: 'Cross-Device Move', simple: 'Moving a file to a different disk drive or partition.', technical: 'Kernel performs fallback copy (read/write) followed by unlinking the source inode.' }
      ],
      syntaxCode: 'mv [OPTIONS] SOURCE DESTINATION',
      syntaxTokens: [
        { token: 'mv', role: 'command', explanation: 'Move or rename files and directories' },
        { token: 'old-name.txt', role: 'path', explanation: 'Source file to be renamed or moved' },
        { token: 'new-name.txt', role: 'path', explanation: 'Target filename or destination directory' }
      ],
      variations: [
        { syntax: 'mv -i file.txt /destination/', title: 'Interactive Safety Prompt', whatItDoes: 'Prompts before overwriting an existing destination file', whenToUse: 'When manually organizing sensitive files' },
        { syntax: 'mv -n file.txt /destination/', title: 'No-Clobber Flag', whatItDoes: 'Silently refuses to overwrite an existing destination file', whenToUse: 'In bulk organization scripts to prevent data loss' }
      ],
      beforeAfter: {
        before: '$ ls\nserver-draft.py\n$ mv server-draft.py server.py',
        after: '$ ls\nserver.py',
        explanation: 'The file is atomically renamed without copying data blocks.'
      },
      expectedOutput: '[File renamed/moved instantly]',
      whatChanges: ['Updates directory entry. Inode number remains identical if on same filesystem.'],
      whatDoesNotChange: ['Data blocks on disk are not moved or re-written.'],
      safeRecovery: 'If you accidentally moved a file to the wrong name, run "mv wrong-name right-name" to restore it.',
      commonMistakes: [
        { mistake: 'Moving a file into a directory that does not exist', whyItHappens: 'Typing "mv file.txt /var/log/myapps/" when "myapps" folder was not created yet.', howToFix: 'Linux will rename "file.txt" into a flat file named "myapps". Check directory existence first.' },
        { mistake: 'Accidentally overwriting an existing destination file without warning', whyItHappens: 'mv silently overwrites destination files by default.', howToFix: 'Use "mv -i" (interactive) or alias "mv" to "mv -i" in your ~/.bashrc for interactive safety.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-04-05',
      subChapterNumber: '04.5',
      command: 'rm target.log',
      title: 'rm',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Permanently unlink and delete files from the filesystem hierarchy',
      badges: ['Delete', 'Files', 'Caution'],
      difficulty: 'Beginner',
      quote: 'Linux has no Trash Can or Recycle Bin; when you type rm, the filesystem unlinks the file immediately and permanently.',
      whatIsIt: 'rm ("Remove") removes directory entries by calling the unlink() system call. When a file\'s hard link count drops to zero and no running process holds an open file descriptor to it, the Linux kernel marks its inode and data storage blocks as free space available for reuse.',
      inSimpleWords: 'There is no "undo" button. Once you hit Enter on an rm command, the file is gone. Always double-check what you are deleting before pressing Enter.',
      whyDoYouNeedIt: 'You need rm to prune obsolete logs, delete build artifacts, clean temporary files, and maintain server disk space.',
      realWorldScenario: 'An automated testing pipeline creates 500MB of temporary test result files in every run. The script concludes with "rm -f test_results_*.xml" to free up storage space for future test suites.',
      realWorldAnalogy: 'Dropping a paper document directly into an industrial cross-cut paper shredder. There is no recycling bin to fish it out from.',
      terms: [
        { term: 'unlink() syscall', simple: 'The system command that removes a filename pointer to a file.', technical: 'Decrements inode i_nlink counter; frees data blocks when i_nlink == 0 and open_count == 0.' },
        { term: 'Force Flag (-f)', simple: 'Deletes files without asking for confirmation, ignoring non-existent files.', technical: 'Overrides write-protected prompts and suppresses error exit codes on missing targets.' }
      ],
      syntaxCode: 'rm [OPTIONS] FILE...',
      syntaxTokens: [
        { token: 'rm', role: 'command', explanation: 'Remove files or directories' },
        { token: 'target.log', role: 'path', explanation: 'Target filename to unlink and delete permanently' }
      ],
      variations: [
        { syntax: 'rm -i file.txt', title: 'Interactive Confirmation', whatItDoes: 'Prompts "remove regular file \'file.txt\'?" before deleting', whenToUse: 'When manually deleting important files' },
        { syntax: 'rm -f cache.dat', title: 'Force Deletion', whatItDoes: 'Deletes without prompting and ignores missing files', whenToUse: 'In automated cleanup scripts' }
      ],
      beforeAfter: {
        before: '$ ls\napp.log server.py\n$ rm app.log',
        after: '$ ls\nserver.py',
        explanation: 'app.log is unlinked from the directory and its storage blocks are released.'
      },
      expectedOutput: '[File unlinked and deleted]',
      whatChanges: ['Decrements inode link count. Deletes directory entry.'],
      whatDoesNotChange: ['Other files remain untouched.'],
      safeRecovery: 'CAUTION: Linux has no undelete command. If a file was accidentally deleted while a running service held it open, you can recover data from /proc/<PID>/fd/.',
      commonMistakes: [
        { mistake: 'Assuming deleted files can be restored from a graphical Trash bin', whyItHappens: 'Coming from macOS or Windows GUI environments.', howToFix: 'The CLI rm command deletes directly; always keep git commits or backups before running rm.' },
        { mistake: 'Using "rm -f *" in the wrong directory', whyItHappens: 'Forgetting to check pwd before deleting.', howToFix: 'Always type "pwd" or "ls" first to verify your location.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-04-06',
      subChapterNumber: '04.6',
      command: 'rm -r obsolete_project/',
      title: 'rm -r',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Recursively delete directories and all subordinate files and subfolders',
      badges: ['Delete', 'Recursive', 'Danger'],
      difficulty: 'Beginner',
      quote: 'rm -r is the single most dangerous command in Linux; one wrong space can wipe an entire operating system.',
      whatIsIt: 'rm -r (or rm -R) instructs rm to traverse directory trees recursively, descending into all child subdirectories and unlinking every file, socket, symlink, and folder encountered. Combined with -f ("rm -rf"), it removes entire directory trees silently without asking for confirmation.',
      inSimpleWords: 'Regular "rm" refuses to touch folders to protect you from accidents. "rm -r" gives rm permission to bulldoze a folder and everything inside it, all the way to the bottom.',
      whyDoYouNeedIt: 'Cleaning up build directories (e.g. "rm -rf dist/" or "rm -rf node_modules/") requires deleting thousands of nested files at once.',
      realWorldScenario: 'A developer writes a cleanup script: "rm -rf $BUILD_DIR/*". But $BUILD_DIR was accidentally unset or empty. The command expanded to "rm -rf /*", which began erasing the entire production server root filesystem. Modern Linux versions include --preserve-root protections, but understanding this danger is vital.',
      realWorldAnalogy: 'Demolishing an entire building down to its foundation versus throwing away a single piece of junk mail.',
      terms: [
        { term: 'Recursive Deletion', simple: 'Deleting a folder, all its subfolders, and every file inside them.', technical: 'Post-order depth-first traversal unlinking files before rmdir on directory inodes.' },
        { term: '--preserve-root', simple: 'Built-in Linux safety shield refusing to delete "/" directly.', technical: 'GNU coreutils safeguard preventing rm from operating on root directory inode.' }
      ],
      syntaxCode: 'rm -r [OPTIONS] DIRECTORY...',
      syntaxTokens: [
        { token: 'rm', role: 'command', explanation: 'Remove files or directories' },
        { token: '-r', role: 'flag', explanation: 'Recursive directory traversal and deletion' },
        { token: 'obsolete_project/', role: 'path', explanation: 'Target directory tree to demolish' }
      ],
      variations: [
        { syntax: 'rm -ri old_dir/', title: 'Safe Recursive Delete', whatItDoes: 'Prompts before descending into each directory and file', whenToUse: 'When cleaning mixed folders carefully' },
        { syntax: 'rm -rf node_modules/', title: 'Forced Recursive Cleanup', whatItDoes: 'Deletes thousands of files without confirmation prompts', whenToUse: 'Purging package manager build trees' }
      ],
      beforeAfter: {
        before: '$ tree old_dir\nold_dir\n├── a.txt\n└── sub\n    └── b.txt\n$ rm -r old_dir/',
        after: '$ ls old_dir\nls: cannot access \'old_dir\': No such file or directory',
        explanation: 'All nested files, subdirectories, and the parent folder are eradicated.'
      },
      expectedOutput: '[Directory tree completely removed]',
      whatChanges: ['Frees all inodes and data blocks in the directory hierarchy.'],
      whatDoesNotChange: ['Files outside the target directory are untouched.'],
      safeRecovery: 'Data deleted by rm -r cannot be undone. Restore from backup or git repository.',
      commonMistakes: [
        { mistake: 'Adding accidental spaces before wildcards (e.g. "rm -rf / tmp/trash" instead of "/tmp/trash")', whyItHappens: 'Typo putting a space after slash.', howToFix: 'The space makes "/" the first argument, triggering disaster. Double-check spaces before hitting Enter.' },
        { mistake: 'Using variables without quoting in rm commands (e.g. rm -rf $DIR/*)', whyItHappens: 'If $DIR is empty, command becomes "rm -rf /*".', howToFix: 'Always check variable existence: [[ -n "$DIR" ]] && rm -rf "$DIR".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-04-07',
      subChapterNumber: '04.7',
      command: 'ln -s /var/www/site /home/user/site-link',
      title: 'ln',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Create symbolic shortcuts or hard link pointers connecting files together',
      badges: ['Links', 'Inodes', 'Core'],
      difficulty: 'Beginner',
      quote: 'ln lets one physical file exist in multiple places across the filesystem simultaneously.',
      whatIsIt: 'ln ("Link") creates links between files. Without flags, it creates a Hard Link (a new directory entry pointing to the exact same inode). With "-s", it creates a Symbolic Link (soft link), which is a special pointer file containing the text path to the target file.',
      inSimpleWords: 'A symbolic link is like a desktop shortcut in Windows. It is a tiny pointer saying "the real file is over there". A hard link is like having two different names on the same mailbox; both names point to the exact same physical box.',
      whyDoYouNeedIt: 'Links are used everywhere in Linux: pointing /bin to /usr/bin, enabling Nginx websites by linking "sites-available" to "sites-enabled", and managing library version aliases (libssl.so -> libssl.so.3).',
      realWorldScenario: 'You are configuring Nginx. Your website configuration is stored in "/etc/nginx/sites-available/mysite.conf". To activate the site, you create a symlink: "sudo ln -s /etc/nginx/sites-available/mysite.conf /etc/nginx/sites-enabled/mysite.conf".',
      realWorldAnalogy: 'A web bookmark (symbolic link) versus a person with two legal names (hard link).',
      terms: [
        { term: 'Symbolic Link (Symlink)', simple: 'A shortcut file storing the path to another file.', technical: 'Special file with inode type S_IFLNK containing target path string in data payload or fast-symlink inode area.' },
        { term: 'Hard Link', simple: 'A second name pointing to the exact same physical inode.', technical: 'Directory entry pointing directly to an existing inode number; shares identical permissions and data blocks.' }
      ],
      syntaxCode: 'ln -s TARGET LINK_NAME',
      syntaxTokens: [
        { token: 'ln', role: 'command', explanation: 'Create link between files' },
        { token: '-s', role: 'flag', explanation: 'Create symbolic (soft) link instead of hard link' },
        { token: '/var/www/site', role: 'path', explanation: 'Target existing source file or directory' },
        { token: '/home/user/site-link', role: 'path', explanation: 'New symlink file to create' }
      ],
      variations: [
        { syntax: 'ln target.txt hardlink.txt', title: 'Create Hard Link', whatItDoes: 'Creates an additional directory entry pointing to target.txt\'s inode', whenToUse: 'When you need backup names that survive source file deletion' },
        { syntax: 'ln -sf new_target link', title: 'Force Overwrite Symlink', whatItDoes: 'Atomically updates link to point to new target', whenToUse: 'When updating active deployment version pointers' }
      ],
      beforeAfter: {
        before: '$ ls site-link\nls: cannot access \'site-link\': No such file or directory\n$ ln -s /var/log/nginx site-link',
        after: '$ ls -l site-link\nlrwxrwxrwx 1 dev dev 14 Sep 28 10:00 site-link -> /var/log/nginx',
        explanation: 'Note the "l" file type and arrow pointing to target directory.'
      },
      expectedOutput: 'lrwxrwxrwx site-link -> /var/log/nginx',
      whatChanges: ['Creates new symlink inode or increments hardlink inode count.'],
      whatDoesNotChange: ['Target file contents are unchanged.'],
      safeRecovery: 'To remove a symlink, run "rm link_name". This deletes only the shortcut; the target file remains 100% safe.',
      commonMistakes: [
        { mistake: 'Reversing target and link name arguments (ln -s link_name target)', whyItHappens: 'Confusing source and destination order.', howToFix: 'Rule: "ln -s TARGET LINK_NAME" (same order as cp source destination).' },
        { mistake: 'Running "rm -rf link_name/" with a trailing slash', whyItHappens: 'Trailing slash tells Linux to delete the CONTENTS of the target directory!', howToFix: 'Never include trailing slashes when removing symlinks: run "rm link_name".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-04-08',
      subChapterNumber: '04.8',
      command: 'ls -l /etc/nginx/sites-enabled/',
      title: 'Symbolic Links',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Soft pointers that reference files across different drives and directories',
      badges: ['Symlinks', 'Navigation', 'FHS'],
      difficulty: 'Beginner',
      quote: 'A symlink stores a path, not data blocks; if you delete the target, the symlink becomes a dangling orphan.',
      whatIsIt: 'A Symbolic Link (Soft Link) is a special file whose content is simply a path string pointing to another file or directory. Symlinks can span across different disk partitions, point to directories, and even point to files that do not exist yet (or have been deleted).',
      inSimpleWords: 'Think of a symlink as a paper signpost pointing down a road. If the house at the end of the road burns down, the signpost is still standing, but it points to nothing (a broken or dangling symlink).',
      whyDoYouNeedIt: 'Symlinks allow you to maintain clean paths (e.g. "/usr/bin/python" -> "/usr/bin/python3.12") while updating underlying software versions seamlessly.',
      realWorldScenario: 'You are deploying software versions (v1.0, v1.1). You set up a symlink "/var/www/current" pointing to "/var/www/v1.0". When v1.1 is tested and ready, you update the symlink to point to v1.1 instantly with zero downtime.',
      realWorldAnalogy: 'A URL redirect or a desktop shortcut icon.',
      terms: [
        { term: 'Broken / Dangling Link', simple: 'A symlink pointing to a target file that was deleted or renamed.', technical: 'A symlink where open() returns ENOENT because the target path does not resolve.' },
        { term: 'readlink', simple: 'Command that prints where a symlink points.', technical: 'POSIX utility invoking readlink() system call to read link target text payload.' }
      ],
      syntaxCode: 'readlink -f [SYMLINK]',
      syntaxTokens: [
        { token: 'readlink', role: 'command', explanation: 'Print value of a symbolic link' },
        { token: '-f', role: 'flag', explanation: 'Canonicalize by following every symlink recursively' }
      ],
      variations: [
        { syntax: 'find . -xtype l', title: 'Find Broken Symlinks', whatItDoes: 'Searches directory tree and lists all broken/dangling symlinks', whenToUse: 'When auditing system health' }
      ],
      beforeAfter: {
        before: '$ readlink /bin\nusr/bin',
        after: '$ readlink -f /bin/sh\n/usr/bin/dash',
        explanation: 'Resolves the symlink chain showing /bin/sh ultimately points to Dash shell.'
      },
      expectedOutput: 'lrwxrwxrwx link -> target',
      whatChanges: ['Reads link payload.'],
      whatDoesNotChange: ['Targets are untouched.'],
      safeRecovery: 'Delete broken symlinks with "rm broken_link". Target is unaffected.',
      commonMistakes: [
        { mistake: 'Creating a relative symlink from the wrong directory', whyItHappens: 'Relative symlinks are relative to the LINK\'S location, not where you type the command.', howToFix: 'Use absolute paths or cd into the target folder before linking.' },
        { mistake: 'Trying to edit symlink permissions with chmod', whyItHappens: 'chmod follows the symlink and modifies the TARGET file permissions.', howToFix: 'Symlinks themselves always have permissions 777 (lrwxrwxrwx); permissions are checked on the target.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-04-09',
      subChapterNumber: '04.9',
      command: 'ls -li file1.txt file2.txt',
      title: 'Hard Links',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Multiple directory entries referencing the identical inode and disk storage blocks',
      badges: ['HardLinks', 'Inodes', 'Storage'],
      difficulty: 'Intermediate',
      quote: 'A file is not deleted when you delete its name; it is only deleted when its last hard link is gone.',
      whatIsIt: 'A Hard Link is an additional directory entry (filename) pointing directly to an existing inode number on the SAME filesystem. Unlike symlinks, both filenames are equal peers: they share the exact same permissions, size, modification timestamps, and data blocks. If you delete one hard link, the data remains fully intact through the remaining link.',
      inSimpleWords: 'Imagine a bank account. You have a debit card, and your spouse has a debit card for the same joint account. If your spouse closes their card, the bank account does not vanish; your card still accesses 100% of the money.',
      whyDoYouNeedIt: 'Hard links are used by backup tools (like rsnapshot, Time Machine, and Docker image caches) to deduplicate storage. If 50 backup snapshots contain the same 1GB database file, hard linking stores it once on disk while appearing in all 50 snapshot folders.',
      realWorldScenario: 'You want to back up a 5GB file without consuming another 5GB of hard disk space. You create a hard link: "ln database.db /backup/database.db". Both paths point to the same 5GB on disk; zero extra disk space is consumed.',
      realWorldAnalogy: 'Two separate phone numbers that ring the exact same physical desk phone.',
      terms: [
        { term: 'Link Count (i_nlink)', simple: 'The counter showing how many filenames point to this file.', technical: 'Counter stored in the inode structure decremented on unlink() and incremented on link().' },
        { term: 'Cross-Filesystem Restriction', simple: 'Hard links cannot cross different hard drives or partitions.', technical: 'Inodes are only unique within a single filesystem superblock; inode 42 on sda1 is completely different from inode 42 on sdb1.' }
      ],
      syntaxCode: 'ln SOURCE TARGET',
      syntaxTokens: [
        { token: 'ln', role: 'command', explanation: 'Create link' },
        { token: 'SOURCE', role: 'path', explanation: 'Existing file to link to' },
        { token: 'TARGET', role: 'path', explanation: 'New hard link filename' }
      ],
      variations: [
        { syntax: 'ls -i file.txt', title: 'Inspect Inode Number', whatItDoes: 'Prints the filesystem inode integer for the file', whenToUse: 'When proving two files are hard linked' }
      ],
      beforeAfter: {
        before: '$ ls -l file1.txt\n-rw-r--r-- 1 dev dev 1024 Sep 28 10:00 file1.txt\n$ ln file1.txt file2.txt',
        after: '$ ls -li file1.txt file2.txt\n142385 -rw-r--r-- 2 dev dev 1024 Sep 28 10:00 file1.txt\n142385 -rw-r--r-- 2 dev dev 1024 Sep 28 10:00 file2.txt',
        explanation: 'Both files share identical inode 142385, and link count increased to 2.'
      },
      expectedOutput: '142385 ... 2 dev dev file1.txt',
      whatChanges: ['Increments inode i_nlink counter and creates directory entry.'],
      whatDoesNotChange: ['Zero additional disk data blocks are allocated.'],
      safeRecovery: 'To delete a hard link, run "rm linkname". The file remains accessible through any other remaining hard links.',
      commonMistakes: [
        { mistake: 'Trying to hard link a directory', whyItHappens: 'Linux forbids hard linking directories to prevent infinite filesystem loops.', howToFix: 'Use symbolic links (ln -s) when linking directories.' },
        { mistake: 'Trying to hard link across two different partitions (e.g. from /home to /var)', whyItHappens: 'Inodes are partition-specific.', howToFix: 'Use symbolic links (-s) for cross-partition links.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-04-10',
      subChapterNumber: '04.10',
      command: 'ls *.log',
      title: 'Wildcards',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Pattern matching with asterisks (*), question marks (?), and square brackets ([])',
      badges: ['Wildcards', 'Pattern', 'Bash'],
      difficulty: 'Beginner',
      quote: 'Wildcards allow you to target hundreds of matching files in a single concise pattern.',
      whatIsIt: 'Wildcards are special characters interpreted by the shell to match patterns of filenames. The asterisk "*" matches zero or more characters. The question mark "?" matches exactly one character. Square brackets "[abc]" match any single character enclosed within the brackets.',
      inSimpleWords: '"*.log" means "any file ending in .log". "file?.txt" matches "file1.txt" and "fileA.txt", but not "file12.txt". It lets you batch-process files without typing each name.',
      whyDoYouNeedIt: 'You need wildcards to delete all temporary files ("rm *.tmp"), compress all images ("tar -czf imgs.tar.gz *.png"), or find log files from specific dates.',
      realWorldScenario: 'You have 10,000 files in an upload directory. You only want to inspect files from server nodes 1 through 3. You type "ls node[1-3]*.csv". The shell filters and presents only matching files.',
      realWorldAnalogy: 'Searching a digital address book for "Sm*" to find Smith, Smyth, Small, and Smart.',
      terms: [
        { term: 'Asterisk (*)', simple: 'Matches any number of characters (including zero).', technical: 'Wildcard expansion matching arbitrary string sequences except leading dot.' },
        { term: 'Question Mark (?)', simple: 'Matches exactly one single character.', technical: 'Wildcard token matching any single arbitrary ASCII/UTF-8 character.' }
      ],
      syntaxCode: 'ls [PATTERN]',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List matching files' },
        { token: '*.log', role: 'argument', explanation: 'Pattern matching all filenames ending in .log' }
      ],
      variations: [
        { syntax: 'ls file[0-9].txt', title: 'Digit Range Match', whatItDoes: 'Matches file0.txt through file9.txt', whenToUse: 'When targeting numbered sequence files' },
        { syntax: 'ls [!a]*.txt', title: 'Negated Match', whatItDoes: 'Matches files NOT starting with letter a', whenToUse: 'Filtering out specific prefixes' }
      ],
      beforeAfter: {
        before: '$ ls\naccess.log error.log server.py data.csv\n$ ls *.log',
        after: 'access.log error.log',
        explanation: 'Only files matching the *.log wildcard pattern are returned.'
      },
      expectedOutput: 'access.log\nerror.log',
      whatChanges: ['Shell expands pattern into matching file arguments.'],
      whatDoesNotChange: ['Files remain unaltered.'],
      safeRecovery: 'Wildcard listing is read-only. Test patterns with "echo *.log" before running "rm *.log".',
      commonMistakes: [
        { mistake: 'Assuming wildcards match hidden dotfiles by default', whyItHappens: 'Typing "rm *" leaves behind .env and .git files.', howToFix: 'The leading dot must be matched explicitly (e.g. ".*") or enable "shopt -s dotglob".' },
        { mistake: 'Using unquoted wildcards with commands that perform their own matching (like find)', whyItHappens: 'Bash expands the wildcard before find even runs.', howToFix: 'Quote wildcards for find: find . -name "*.log".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-04-11',
      subChapterNumber: '04.11',
      command: 'echo app_{v1,v2,v3}.js',
      title: 'Globbing',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Pathname expansion performed by the shell before executing commands',
      badges: ['Globbing', 'Bash', 'Expansion'],
      difficulty: 'Beginner',
      quote: 'Commands never see your asterisks; the shell expands the glob into real filenames before the program ever runs.',
      whatIsIt: 'Globbing (short for Global Pattern Matching) is the shell process that converts wildcards (*, ?, [...]) into actual filenames. When you type "rm *.log", your shell (Bash) scans the filesystem directory, finds all matching files, and replaces "*.log" with "a.log b.log c.log" before launching the "rm" program.',
      inSimpleWords: 'Think of the shell as your personal assistant. When you say "bring me the red binders", the assistant walks to the shelf, grabs binder 1, 2, and 3, and hands all three to you.',
      whyDoYouNeedIt: 'Understanding globbing explains why "rm *.log" fails with "Argument list too long" if you have 500,000 files, and why quoting protects patterns from premature shell expansion.',
      realWorldScenario: 'You are writing an automation script to clean images: "rm /tmp/*.png". If no PNG files exist, Bash passes the literal string "/tmp/*.png" to rm, causing an error: "No such file". Enabling "shopt -s nullglob" in your script fixes this.',
      realWorldAnalogy: 'A mailroom clerk sorting and expanding "All Department Heads" into 12 individual envelope addresses before delivery.',
      terms: [
        { term: 'Pathname Expansion', simple: 'The official POSIX term for shell globbing.', technical: 'Phase of shell command line processing following word splitting and brace expansion.' },
        { term: 'nullglob', simple: 'Shell setting that makes non-matching globs vanish instead of staying as text.', technical: 'Bash shell option (shopt -s nullglob) expanding unmatched patterns to empty list.' }
      ],
      syntaxCode: 'echo [GLOB_PATTERN]',
      syntaxTokens: [
        { token: 'echo', role: 'command', explanation: 'Display expanded arguments' },
        { token: '*.txt', role: 'argument', explanation: 'Glob pattern expanded by shell' }
      ],
      variations: [
        { syntax: 'shopt -s globstar; ls **/*.js', title: 'Recursive Globstar', whatItDoes: 'Matches files across all nested subdirectories recursively using **', whenToUse: 'When targeting files across deep project trees' }
      ],
      beforeAfter: {
        before: '$ echo *.py\n[Shell expands glob pattern against directory...]',
        after: 'api.py db.py main.py test.py',
        explanation: 'Proves the shell expands the pattern into individual filename arguments.'
      },
      expectedOutput: 'api.py db.py main.py',
      whatChanges: ['Shell builds argument vector (argv).'],
      whatDoesNotChange: ['Filesystem is unmodified.'],
      safeRecovery: 'Use "echo" to test any glob pattern before executing destructive commands.',
      commonMistakes: [
        { mistake: 'Running rm on a glob with 200,000 files and getting "Argument list too long"', whyItHappens: 'Exceeding Linux kernel ARG_MAX buffer limit.', howToFix: 'Use find with delete: "find . -name \'*.log\' -delete".' },
        { mistake: 'Thinking commands like ls or rm implement globbing themselves', whyItHappens: 'The shell does 100% of the glob expansion before the program starts.', howToFix: 'Always remember: quoting ("*.log") stops shell expansion.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-04-12',
      subChapterNumber: '04.12',
      command: 'touch "my document.pdf"',
      title: 'File Naming',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'POSIX conventions, case sensitivity, special characters, and escaping spaces',
      badges: ['Filenames', 'POSIX', 'BestPractices'],
      difficulty: 'Beginner',
      quote: 'In Linux, "File.txt", "file.txt", and "FILE.TXT" are three completely different files.',
      whatIsIt: 'Linux filesystems (ext4, XFS) are strictly Case-Sensitive and permit any byte in a filename except the null byte (\\0) and the directory separator forward slash (/). However, standard POSIX engineering conventions mandate avoiding spaces, special shell characters ($ & ; | * ? !), and leading hyphens (-) to prevent script errors.',
      inSimpleWords: 'Windows thinks "README.txt" and "readme.txt" are the exact same file. Linux knows they are two completely different files. Also, while Linux lets you name a file with spaces, doing so forces you to quote the name every single time.',
      whyDoYouNeedIt: 'Violating Linux file naming best practices causes shell scripts to break, automated backups to fail, and files starting with "-" to trick commands into treating filenames as command options.',
      realWorldScenario: 'A user creates a file named "-rf". A novice administrator types "rm *". The shell expands "-rf" as the first argument, turning into "rm -rf", deleting unintended files! Understanding file escaping prevents this vulnerability.',
      realWorldAnalogy: 'Capital letters in passwords. Changing a lowercase letter to uppercase makes it an entirely different key.',
      terms: [
        { term: 'Case Sensitivity', simple: 'Uppercase and lowercase letters are treated as distinct.', technical: 'Binary byte comparison of filename strings in directory dentry hashes.' },
        { term: 'Double Hyphen Terminator (--)', simple: 'Tells commands that no more flag options follow.', technical: 'POSIX standard option argument delimiter separating command flags from filenames.' }
      ],
      syntaxCode: 'rm -- -filename-starting-with-dash.txt',
      syntaxTokens: [
        { token: 'rm', role: 'command', explanation: 'Remove command' },
        { token: '--', role: 'flag', explanation: 'End of command options indicator' },
        { token: '-filename.txt', role: 'argument', explanation: 'Filename starting with a hyphen treated as argument not flag' }
      ],
      variations: [
        { syntax: 'touch file\\ with\\ spaces.txt', title: 'Escape Spaces with Backslash', whatItDoes: 'Creates file with literal spaces using backslash escaping', whenToUse: 'When spaces cannot be avoided' },
        { syntax: 'touch "file with spaces.txt"', title: 'Quote Filename', whatItDoes: 'Protects spaces using double quotes', whenToUse: 'Standard readable scripting practice' }
      ],
      beforeAfter: {
        before: '$ touch File.txt file.txt FILE.TXT',
        after: '$ ls\nFILE.TXT  File.txt  file.txt',
        explanation: 'Confirms Linux stores all three distinct files concurrently.'
      },
      expectedOutput: 'FILE.TXT\nFile.txt\nfile.txt',
      whatChanges: ['Allocates distinct inodes for each case permutation.'],
      whatDoesNotChange: ['Files remain isolated.'],
      safeRecovery: 'If you created a file starting with a dash, delete or move it with "rm -- -filename" or "rm ./-filename".',
      commonMistakes: [
        { mistake: 'Creating filenames with spaces on production servers', whyItHappens: 'Habit from desktop office files.', howToFix: 'Always use underscores or hyphens: "user_report_2024.pdf".' },
        { mistake: 'Trying to delete a file named "-file" with "rm -file"', whyItHappens: 'rm thinks "-file" is an unknown command flag (-f -i -l -e).', howToFix: 'Use "rm -- -file" or "rm ./-file".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-04-13',
      subChapterNumber: '04.13',
      command: 'shred -u secret.key',
      title: 'Safe File Deletion',
      topicId: 'ch-04',
      topicNumber: '04',
      topicTitle: 'File Management',
      subtitle: 'Trash bin alternatives, confirmation aliases, and cryptographic data shredding',
      badges: ['Security', 'Shred', 'Safety'],
      difficulty: 'Intermediate',
      quote: 'Regular rm only deletes pointers; shred overwrites magnetic and flash data blocks with random bits.',
      whatIsIt: 'Standard "rm" does not erase data blocks from disk; it merely unlinks the inode pointer, leaving raw data recoverable via forensic tools. Safe file deletion encompasses two needs: 1. Operational safety (using aliases like "rm -i" or trash-cli to prevent human accidents), and 2. Cryptographic security (using "shred" or "srm" to overwrite data blocks with random noise before unlinking).',
      inSimpleWords: 'Throwing a document in the trash (rm) means anyone can take it out and read it. Shredding a document (shred) puts it through a high-security paper shredder so it can never be pieced back together.',
      whyDoYouNeedIt: 'When retiring database servers, decommissioning SSH private keys, or handling GDPR sensitive data, regular rm is insufficient. Cryptographic shredding ensures forensic recovery is impossible.',
      realWorldScenario: 'You are rotating server root SSH keys. You create the new key and need to destroy the old private key file. You execute "shred -u -z -n 5 id_rsa". Shred overwrites the file 5 times with random bits, overwrites once with zeros to hide shredding, and then unlinks the file.',
      realWorldAnalogy: 'Overwriting a chalkboard with random scribbles and washing it with bleach before throwing it away.',
      terms: [
        { term: 'shred', simple: 'A tool that overwrites a file with random patterns to destroy data permanently.', technical: 'Utility repeatedly overwriting target blocks to thwart magnetic and hardware data recovery.' },
        { term: 'trash-cli', simple: 'A command-line trash can that moves files to ~/.local/share/Trash instead of deleting.', technical: 'FreeDesktop.org Trash specification CLI implementation allowing safe file restoration.' }
      ],
      syntaxCode: 'shred [OPTIONS] FILE...',
      syntaxTokens: [
        { token: 'shred', role: 'command', explanation: 'Overwrite a file to hide its contents, and optionally delete it' },
        { token: '-u', role: 'flag', explanation: 'Truncate and remove file after overwriting' },
        { token: 'secret.key', role: 'path', explanation: 'Target sensitive file to obliterate' }
      ],
      variations: [
        { syntax: 'shred -u -z -n 3 secret.pem', title: 'Secure Shred with Zero Pass', whatItDoes: 'Overwrites 3 times with random bits, once with zeros (-z), and removes (-u)', whenToUse: 'When destroying cryptographic private keys' },
        { syntax: 'trash-put file.txt', title: 'Send to Trash Can', whatItDoes: 'Moves file to trash can instead of permanent deletion', whenToUse: 'Safe everyday interactive file removal' }
      ],
      beforeAfter: {
        before: '$ cat secret.key\nSUPER_SECRET_PRIVATE_TOKEN_9921\n$ shred -u -z secret.key',
        after: '$ cat secret.key\ncat: secret.key: No such file or directory',
        explanation: 'Data blocks were overwritten with random entropy before unlinking, preventing forensic recovery.'
      },
      expectedOutput: '[File overwritten and securely unlinked]',
      whatChanges: ['Overwrites raw data blocks on storage device.'],
      whatDoesNotChange: ['Other files are unaffected.'],
      safeRecovery: 'Shredded files can NEVER be recovered. Be 100% certain before running shred.',
      commonMistakes: [
        { mistake: 'Assuming shred works reliably on copy-on-write filesystems (Btrfs, ZFS) or wear-leveled SSDs', whyItHappens: 'Copy-on-write writes new blocks instead of overwriting existing ones.', howToFix: 'Use full-disk encryption (LUKS) to protect SSDs and copy-on-write storage.' },
        { mistake: 'Aliasing rm to "rm -rf" for convenience', whyItHappens: 'Lazy typing removes all safety prompts.', howToFix: 'Never alias rm to include -f; use trash-cli or "rm -i" for safety.' }
      ]
    })
  ]
};
