import { LinuxTopic } from '../unifiedLinuxData';

export const MODULE_02_FILES_DIRS: LinuxTopic = {
  id: 'ch01-02-files-dirs',
  number: '01.2',
  title: 'Files & Directories',
  iconName: 'FolderGit2',
  description:
    'Core filesystem operations: navigation (pwd, cd, ls), file metadata (file, stat), atomic CRUD (mkdir, touch, cp, mv, rm), and deep hierarchy search (find, locate, tree).',
  concepts: [
    {
      id: 'linux-navigation-inspection',
      command: 'pwd; ls -lah; file /bin/bash; stat /etc/passwd',
      title: 'Navigation & Inspection: pwd, ls, cd, file, stat',
      topicId: 'ch01-02-files-dirs',
      topicNumber: '01.2',
      topicTitle: 'Files & Directories',
      subtitle: 'Path mechanics, directory traversal, MIME detection, and inode timestamp analysis',
      badges: ['Core Shell', 'Filesystem', 'Metadata'],
      quote: 'Navigation is not just moving between folders; it is understanding inode metadata and resolving symlinks.',
      difficulty: 'Beginner',
      whatIsIt:
        'Filesystem navigation and file inspection form the daily foundation of Linux operations. `pwd` displays the current working directory (logical or physical via `-P`). `cd` switches directories using relative paths, absolute paths, home shortcut (`~`), or previous directory (`-`). `ls` inspects directory entries with flags for long-format (`-l`), hidden files (`-a`), human-readable sizes (`-h`), time sorting (`-t`), and recursion (`-R`). For in-depth inspection, `file` examines magic numbers to identify real binary formats regardless of file extensions, while `stat` displays low-level filesystem inode metadata, including Access, Modify, and Change (atime, mtime, ctime) timestamps.',
      inSimpleWords:
        '`pwd` answers "where am I?", `cd` changes your location, `ls` lists what is around you, `file` tells you what kind of file it truly is (even if someone renamed it `.txt`), and `stat` shows exact creation timestamps and owner IDs.',
      whyDoYouNeedIt:
        'In production incident triage, you must quickly inspect directory structures, determine if a binary is dynamically or statically linked (`file`), and check the exact second a configuration file was tampered with (`stat`).',
      realWorldAnalogy:
        'Navigating an archive building: `pwd` is checking your room number, `cd` is walking through hallways, `ls` is looking at the boxes on the shelves, `file` is testing the substance inside a box, and `stat` is checking the archive security log for who opened the box and when.',
      withoutVsWith: {
        without: {
          title: 'Without Deep Inspection Tools (Relying Only on File Extensions)',
          items: [
            'Attacker renames a malicious ELF executable to photo.jpg and tricks administrators',
            'Cannot determine whether a file was modified or had its permissions changed',
            'No visibility into inode numbers or physical block allocation',
          ],
          outcome: 'Blindness to malicious file masquerading and untraceable configuration changes.',
        },
        with: {
          title: 'With Linux Inspection Tools (file & stat)',
          items: [
            'file reads binary magic bytes to uncover ELF executables, tarballs, and scripts accurately',
            'stat reveals separate Access (atime), Modify (mtime), and Inode Change (ctime) timestamps',
            'Shows exact inode number and hard link count to detect linked files',
          ],
          outcome: 'Immediate file authenticity verification and precise forensic timeline tracking.',
        },
      },
      blockDiagram: {
        title: 'Linux Inode & Directory Entry Architecture',
        subtitle: 'How directories point to Inodes, and how stat/file extract metadata and magic numbers',
        nodes: [
          { id: 'dir-entry', label: 'Directory Entry (dentry)', simpleDef: 'Filename pointing to Inode #', techDef: 'Maps human-readable string to kernel Inode number', badge: 'Filename', color: '#38bdf8' },
          { id: 'inode', label: 'Filesystem Inode', simpleDef: 'Metadata container', techDef: 'Stores permissions, owner, size, atime/mtime/ctime, and data block pointers', badge: 'stat', color: '#06b6d4' },
          { id: 'data-blocks', label: 'Data Blocks', simpleDef: 'Actual file content on disk', techDef: 'Physical sectors containing bytes inspected by file command for magic numbers', badge: 'file', color: '#10b981' },
        ],
      },
      terms: [
        { term: 'mtime vs ctime', simple: 'mtime is when file contents changed; ctime is when file metadata/permissions changed.', technical: 'mtime (modification time) updates on write(); ctime (change time) updates on chmod(), chown(), or link().' },
        { term: 'Magic Number', simple: 'Special signature bytes at the start of a file identifying its format.', technical: 'Initial header bytes checked by the file command (e.g. 0x7F454C46 for Linux ELF binaries).' },
        { term: 'Inode', simple: 'The index number and data structure holding all file metadata.', technical: 'Filesystem data structure storing file attributes and disk block addresses, excluding filename.' },
      ],
      whenToUse: [
        'Inspecting whether a script is executable and who owns it (`ls -l`)',
        'Verifying true file format of downloaded container artifacts or binaries (`file app`)',
        'Forensic analysis of when an `/etc/hosts` or `/etc/sudoers` file was modified (`stat /etc/sudoers`)',
      ],
      whenNotToUse: [
        'Do not parse the text output of `ls` in automated shell scripts; use shell globbing (`for f in *; do`) instead',
      ],
      syntaxCode: 'pwd\ncd /var/log && pwd\nls -lah\nfile /bin/ls\nstat /etc/passwd',
      syntaxTokens: [
        { token: 'pwd', role: 'Command', explanation: 'Print name of current working directory' },
        { token: 'cd -', role: 'Shortcut', explanation: 'Switches back to previous directory ($OLDPWD)' },
        { token: 'ls -lah', role: 'Flags', explanation: '-l (long format), -a (all hidden files), -h (human readable sizes like 4K, 12M)' },
        { token: 'stat', role: 'Command', explanation: 'Display detailed file and filesystem status' },
      ],
      variations: [
        { syntax: 'ls -lt', title: 'Sort by Time', whatItDoes: 'Lists newest files first', whenToUse: 'Finding recent log files' },
        { syntax: 'ls -lhS', title: 'Sort by Size', whatItDoes: 'Lists largest files first', whenToUse: 'Finding files filling disk' },
        { syntax: 'pwd -P', title: 'Physical Path', whatItDoes: 'Resolves all symbolic links to real physical directory', whenToUse: 'Working inside symlinked repos' },
      ],
      internalFlow: [
        { step: 1, title: 'Process Calls stat() Syscall', desc: 'Process requests metadata for /etc/passwd', why: 'Reads inode without reading contents', techDetail: 'Kernel executes newfstatat() syscall with pathname' },
        { step: 2, title: 'VFS Inode Lookup', desc: 'VFS resolves path dentry to inode struct in memory', why: 'Fetches inode attributes', techDetail: 'Retrieves i_mode, i_uid, i_size, i_atime, i_mtime, i_ctime' },
        { step: 3, title: 'Magic Byte Read (file)', desc: 'For `file`, kernel reads first 512 bytes from data blocks', why: 'Identifies file header', techDetail: 'Compares magic bytes against /usr/share/misc/magic.mgc database' },
      ],
      sandbox: {
        initialCommands: ['# Check current working directory\npwd\nls -la /var/log | head -n 8'],
        guidedSteps: [
          { instruction: 'Print current directory path', command: 'pwd', hint: 'Run pwd' },
          { instruction: 'Inspect the /etc/passwd file metadata with stat', command: 'stat /etc/passwd', hint: 'Run stat /etc/passwd' },
          { instruction: 'Detect the binary format of /bin/bash', command: 'file /bin/bash', hint: 'Run file /bin/bash' },
        ],
        targetTask: 'Check your current directory and inspect /etc/passwd metadata using stat',
        solutionCommands: ['pwd', 'stat /etc/passwd'],
      },
      commonMistakes: [
        { mistake: 'Relying solely on file extensions to verify security', whyWrong: 'Linux ignores extensions; an executable binary can be named script.txt and run directly if chmod +x is set.', correctWay: 'Always use file <filename> to verify true file architecture and MIME type.' },
        { mistake: 'Parsing ls output with awk in shell scripts', whyWrong: 'Filenames containing spaces, newlines, or special characters break word splitting.', correctWay: 'Use bash globs like for file in /path/*.log or find -print0.' },
      ],
      challenge: {
        question: 'Which timestamp in stat updates when you change a file’s permissions via chmod without altering its content?',
        options: [
          { label: 'ctime (Change Time)', isCorrect: true, explanation: 'ctime records changes to inode metadata such as permissions, owner, or link count.' },
          { label: 'mtime (Modification Time)', isCorrect: false, explanation: 'mtime only updates when the file’s actual data contents are written.' },
          { label: 'atime (Access Time)', isCorrect: false, explanation: 'atime updates when a process reads the file contents.' },
          { label: 'dtime (Deletion Time)', isCorrect: false, explanation: 'dtime is an internal ext4 deletion marker, not a standard stat timestamp.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['pwd', 'cd -', 'ls -lah', 'ls -lt', 'file <file>', 'stat <file>'],
        bestPractices: [
          'Use stat -c %Y <file> in scripts to get the epoch modification timestamp',
          'Use file -b --mime-type <file> in automated upload pipelines to reject spoofed files',
        ],
      },
    },
    {
      id: 'linux-file-management-crud',
      command: 'mkdir -p /tmp/demo/{app,logs} && touch /tmp/demo/app/main.py && cp -r /tmp/demo /tmp/backup && rm -rf /tmp/backup',
      title: 'File & Directory CRUD: mkdir, touch, cp, mv, rm',
      topicId: 'ch01-02-files-dirs',
      topicNumber: '01.2',
      topicTitle: 'Files & Directories',
      subtitle: 'Directory creation, timestamp touching, recursive copies, atomic moves, and safe deletions',
      badges: ['CRUD', 'Core Shell', 'Filesystem'],
      quote: 'rm -rf is unforgiving: on Linux there is no Recycle Bin. Understand atomic operations before you execute.',
      difficulty: 'Beginner',
      whatIsIt:
        'File and directory CRUD is the backbone of script writing and container image building. `mkdir -p` creates nested directory trees without erroring if they exist. `touch` creates empty 0-byte files or updates existing timestamps without modifying content. `cp -r` recursively copies directory hierarchies with options to preserve timestamps, ownership, and mode (`-p` or `-a`). `mv` performs atomic renames on the same filesystem (instantaneous metadata pointer update) or relocates files across partitions. Finally, `rm -rf` forcefully deletes files and directory trees recursively, bypassing prompts.',
      inSimpleWords:
        '`mkdir` makes folders, `touch` creates new files, `cp` copies them, `mv` renames or moves them, and `rm` permanently deletes them.',
      whyDoYouNeedIt:
        'Every Dockerfile, CI/CD pipeline, and automation script builds environments using these commands. Knowing how `cp -a` preserves permissions or why `mv` is atomic on the same filesystem prevents data corruption.',
      realWorldAnalogy:
        'Managing a physical filing cabinet: `mkdir` labels new folders, `touch` drops in a blank index card, `cp` runs a paper through the photocopier, `mv` slides a folder into another drawer, and `rm` puts papers into a high-powered paper shredder.',
      withoutVsWith: {
        without: {
          title: 'Without Atomic Moves and Preservation Flags (cp -r instead of cp -a)',
          items: [
            'Copied files lose original user permissions and timestamps, breaking services',
            'Non-atomic file updates leave half-written configurations exposed to running servers',
            'mkdir fails if parent directory does not already exist',
          ],
          outcome: 'Failed deployments and services crashing from corrupted permissions.',
        },
        with: {
          title: 'With Linux Standard CRUD Flags (mkdir -p, cp -a, mv atomic)',
          items: [
            'mkdir -p automatically creates all intermediate parent directories idempotently',
            'cp -a (archive) preserves links, ownership, permissions, and timestamps',
            'mv performs instantaneous atomic inode pointer swaps on the same mount',
          ],
          outcome: 'Flawless automated deployments with zero downtime configuration swapping.',
        },
      },
      blockDiagram: {
        title: 'Atomic Move (mv) vs Copy (cp) Mechanics',
        subtitle: 'Why mv is instant on the same filesystem vs cp allocating new disk blocks',
        nodes: [
          { id: 'crud-source', label: 'Source File', simpleDef: 'Original dentry & inode', techDef: 'Dentry pointing to Inode 1042', badge: 'Source', color: '#38bdf8' },
          { id: 'crud-mv', label: 'mv (Same Mount)', simpleDef: 'Only updates directory pointer', techDef: 'Atomic rename() syscall: unlinks old dentry, creates new dentry pointing to SAME inode', badge: 'Atomic & Instant', color: '#10b981' },
          { id: 'crud-cp', label: 'cp (Copy)', simpleDef: 'Allocates new inode & copies blocks', techDef: 'Reads data blocks and writes to newly allocated inode blocks on disk', badge: 'Full I/O', color: '#f59e0b' },
        ],
      },
      terms: [
        { term: 'Atomic Rename', simple: 'Renaming a file happens instantaneously without any partial state.', technical: 'The rename() syscall re-links the inode to a new dentry atomically within the filesystem journal.' },
        { term: 'touch', simple: 'Creates an empty file or refreshes the timestamp of an existing file.', technical: 'Uses utimensat() system call to update the access and modification times of a file.' },
        { term: 'cp -a (Archive)', simple: 'Copies everything while preserving all permissions, owners, and links.', technical: 'Equivalent to -dR --preserve=all; preserves file mode, ownership, timestamps, and symlinks.' },
      ],
      whenToUse: [
        'Creating multi-level application directories safely in scripts: `mkdir -p /app/data/{cache,db}`',
        'Cloning configuration or data directories while preserving exact owners and mode: `cp -a /source /dest`',
        'Zero-downtime config deploy: write to `/etc/app.conf.tmp` then `mv -f /etc/app.conf.tmp /etc/app.conf`',
      ],
      whenNotToUse: [
        'Never run `rm -rf /` or `rm -rf $DIR/*` without verifying that `$DIR` is not empty or unset',
      ],
      syntaxCode: 'mkdir -p /tmp/app/{conf,logs}\ntouch /tmp/app/conf/app.env\ncp -a /tmp/app /tmp/app_backup\nmv /tmp/app/conf/app.env /tmp/app/conf/prod.env\nrm -rf /tmp/app_backup',
      syntaxTokens: [
        { token: 'mkdir -p', role: 'Flag', explanation: 'Creates parent directories as needed without erroring if they exist' },
        { token: 'cp -a', role: 'Flag', explanation: 'Archive mode: preserves all attributes, timestamps, and recursive links' },
        { token: 'rm -rf', role: 'Flags', explanation: '-r (recursive directories), -f (force without prompting)' },
      ],
      variations: [
        { syntax: 'mkdir -p a/b/c', title: 'Nested Directory', whatItDoes: 'Creates full tree a/b/c idempotently', whenToUse: 'CI/CD pipeline directory prep' },
        { syntax: 'cp -u src dest', title: 'Update Copy', whatItDoes: 'Copies only when source file is newer than destination', whenToUse: 'Incremental sync' },
        { syntax: 'rm -i file', title: 'Interactive Delete', whatItDoes: 'Prompts confirmation before deleting each file', whenToUse: 'Dangerous manual cleanup' },
      ],
      internalFlow: [
        { step: 1, title: 'mkdir -p Invokes mkdirat()', desc: 'Kernel checks directory existence and creates missing inode entries', why: 'Creates directory tree', techDetail: 'Allocates directory inode with S_IFDIR flag in VFS' },
        { step: 2, title: 'touch Invokes openat() with O_CREAT', desc: 'If file does not exist, kernel creates 0-byte file', why: 'Instantiates file', techDetail: 'If file exists, invokes utimensat() to update mtime to current CLOCK_REALTIME' },
        { step: 3, title: 'mv Executes rename() Syscall', desc: 'If source and destination are on the same filesystem, only directory pointers change', why: 'Atomic operation', techDetail: 'No disk blocks copied; instantaneous pointer update in directory block' },
      ],
      sandbox: {
        initialCommands: ['# Create nested test directories and files\nmkdir -p /tmp/forge_lab/{src,bin}\ntouch /tmp/forge_lab/src/main.sh\nls -la /tmp/forge_lab/src'],
        guidedSteps: [
          { instruction: 'Create nested directories /tmp/forge_lab/src', command: 'mkdir -p /tmp/forge_lab/src', hint: 'Use mkdir -p' },
          { instruction: 'Create a new empty file main.sh', command: 'touch /tmp/forge_lab/src/main.sh', hint: 'Use touch' },
          { instruction: 'Copy the directory to /tmp/forge_lab_backup', command: 'cp -r /tmp/forge_lab /tmp/forge_lab_backup', hint: 'Use cp -r' },
        ],
        targetTask: 'Create a directory tree and file using mkdir -p and touch',
        solutionCommands: ['mkdir -p /tmp/forge_lab/src', 'touch /tmp/forge_lab/src/main.sh'],
      },
      commonMistakes: [
        { mistake: 'Using rm -rf with an unset environment variable: rm -rf $DATA_DIR/*', whyWrong: 'If $DATA_DIR is unset, the command evaluates to rm -rf /* which destroys the entire operating system.', correctWay: 'Always use parameter expansion guards: rm -rf "${DATA_DIR:?}/"* or check if directory exists first.' },
        { mistake: 'Using cp -r instead of cp -a when copying system files', whyWrong: 'cp -r resets ownership to the executing user and resets timestamps to right now.', correctWay: 'Always use cp -a to preserve permissions, ownership, and timestamps when cloning configs.' },
      ],
      challenge: {
        question: 'Why is moving a 100 GB file with mv instantaneous when both source and destination are on the same filesystem?',
        options: [
          { label: 'Because it only updates the directory entry pointer to the existing inode without copying data blocks', isCorrect: true, explanation: 'The rename() syscall simply repoints the directory entry; no physical disk blocks are moved.' },
          { label: 'Because the Linux kernel compresses the 100 GB file in RAM', isCorrect: false, explanation: 'No compression or data movement occurs.' },
          { label: 'Because it creates a symbolic link instead of moving the file', isCorrect: false, explanation: 'mv moves the actual file pointer, it does not create a symlink.' },
          { label: 'Because modern SSDs copy at infinite speed', isCorrect: false, explanation: 'Disk throughput is irrelevant because zero disk block copies are performed.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['mkdir -p /path/to/dir', 'touch <file>', 'cp -a <src> <dst>', 'mv <src> <dst>', 'rm -rf <path>'],
        bestPractices: [
          'Use atomic file replacement (write temp file, then mv to real path) for production configs',
          'Add set -u in bash scripts so unset variables in rm -rf fail immediately rather than wiping /',
        ],
      },
    },
    {
      id: 'linux-file-search-discovery',
      command: 'find /var/log -type f -name "*.log" -mtime -7; locate nginx.conf; tree -L 2 /etc',
      title: 'Deep File Discovery & Hierarchy: find, locate, tree',
      topicId: 'ch01-02-files-dirs',
      topicNumber: '01.2',
      topicTitle: 'Files & Directories',
      subtitle: 'Real-time filesystem traversal, indexed database search, and ASCII directory trees',
      badges: ['Search', 'Discovery', 'SysAdmin'],
      quote: 'find is the Swiss Army knife of Linux search: it can filter by name, size, owner, time, and execute commands in one shot.',
      difficulty: 'Intermediate',
      whatIsIt:
        'Finding files quickly in sprawling production environments requires mastering real-time traversal and indexed search. `find` conducts a live, real-time traversal through directory trees, allowing complex filtering by filename (`-name`, `-iname`), file type (`-type f`, `-type d`, `-type l`), size (`-size +100M`), permissions (`-perm 644`), and modification time (`-mtime -7` for last 7 days). Crucially, `find` can execute commands on matching files using `-exec <cmd> {} +`. In contrast, `locate` queries an indexed database (`mlocate.db` updated via `updatedb`) for lightning-fast results across millions of files. Finally, `tree` outputs clean, hierarchical visual diagrams of directory structures.',
      inSimpleWords:
        '`find` walks through directories in real time looking for files matching specific rules, `locate` checks a pre-built phonebook database for instant name lookups, and `tree` draws a graphical map of your folders.',
      whyDoYouNeedIt:
        'When a disk hits 100% capacity, running `find / -type f -size +1G` instantly locates the runaway log file. When cleaning logs older than 30 days in a cron job, `find /var/log -mtime +30 -delete` does it safely.',
      realWorldAnalogy:
        '`find` is a detective physically searching every room in a building looking for red jackets larger than size XL; `locate` is searching the building registry computer index; `tree` is looking at the architect’s blueprint diagram.',
      withoutVsWith: {
        without: {
          title: 'Without Powerful Search Tools (Clicking or ls Searching)',
          items: [
            'Manual directory traversal across thousands of nested folders takes hours',
            'Cannot filter files by age, modification date, or size thresholds',
            'Cannot automatically execute cleanup or archiving on matching items',
          ],
          outcome: 'Unmanageable log sprawl and slow incident troubleshooting.',
        },
        with: {
          title: 'With Linux find, locate, and tree',
          items: [
            'Single one-liner finds and purges logs older than 14 days',
            'locate finds config files in milliseconds across millions of paths',
            'tree provides instant visualization of codebase and configuration directory layouts',
          ],
          outcome: 'Instant filesystem discovery and automated storage hygiene.',
        },
      },
      blockDiagram: {
        title: 'Search Mechanisms: find (Live Traversal) vs locate (Index DB)',
        subtitle: 'Comparing real-time filesystem directory walking against indexed mlocate database query',
        nodes: [
          { id: 'search-query', label: 'Search Request ("*.log")', simpleDef: 'Target search criteria', techDef: 'Glob pattern, size criteria, or inode modification time', badge: 'Query', color: '#38bdf8' },
          { id: 'search-find', label: 'find (Live Walk)', simpleDef: 'Traverses real disk dentries', techDef: 'Uses getdents64() syscalls to walk directory trees in real time; always 100% accurate', badge: 'Real-Time', color: '#10b981' },
          { id: 'search-locate', label: 'locate (Indexed DB)', simpleDef: 'Searches /var/lib/mlocate/mlocate.db', techDef: 'Instant B-tree lookup in cached database; requires updatedb cron to stay fresh', badge: 'Cached & Instant', color: '#06b6d4' },
          { id: 'search-tree', label: 'tree (Visual Mapper)', simpleDef: 'Renders directory tree in ASCII', techDef: 'Recursive directory traversal formatted with branch glyphs and depth limits (-L)', badge: 'Visual', color: '#f59e0b' },
        ],
      },
      terms: [
        { term: 'find -exec {} +', simple: 'Runs a command on all found files in batches for maximum speed.', technical: 'Replaces {} with paths and terminates with +; passes multiple arguments to a single command invocation like xargs.' },
        { term: 'updatedb', simple: 'Updates the indexed database used by the locate command.', technical: 'Cron or systemd timer job that scans local filesystems and writes /var/lib/mlocate/mlocate.db.' },
        { term: 'tree -L <depth>', simple: 'Limits directory tree display to a specific depth level.', technical: 'Restricts recursion level to prevent terminal flooding in deeply nested hierarchies.' },
      ],
      whenToUse: [
        'Finding files larger than 100MB on a full disk: `find / -type f -size +100M -exec ls -lh {} +`',
        'Finding files with insecure 777 permissions: `find /var/www -type f -perm 0777`',
        'Purging archived logs older than 30 days: `find /var/log/app -name "*.gz" -mtime +30 -delete`',
      ],
      whenNotToUse: [
        'Avoid running `locate` for files created 2 minutes ago; the database has not refreshed yet (`updatedb` needed)',
        'Never run `find /` without nice or on high-load production databases without testing I/O impact',
      ],
      syntaxCode: 'find /var/log -type f -name "*.log"\nfind . -type f -size +50M\nlocate nginx.conf\ntree -L 2 /etc',
      syntaxTokens: [
        { token: 'find', role: 'Command', explanation: 'Search for files in a directory hierarchy' },
        { token: '-type f', role: 'Flag', explanation: 'Filter by regular files only (d = directory, l = symlink)' },
        { token: '-name "*.log"', role: 'Pattern', explanation: 'Case-sensitive glob pattern (must be quoted to prevent shell expansion)' },
        { token: '-mtime -7', role: 'Filter', explanation: 'Modified within the last 7 days (+7 means older than 7 days)' },
      ],
      variations: [
        { syntax: 'find . -name "*.tmp" -delete', title: 'Find & Delete', whatItDoes: 'Deletes matching files directly in kernel', whenToUse: 'Automated disk cleanup' },
        { syntax: 'find /etc -type f -name "*.conf" | wc -l', title: 'Count Matches', whatItDoes: 'Counts number of config files', whenToUse: 'Audit scripts' },
        { syntax: 'tree -d -L 1 /', title: 'Directory Tree', whatItDoes: 'Shows only top-level directories in root', whenToUse: 'FHS visual audit' },
      ],
      internalFlow: [
        { step: 1, title: 'find Traverses Dentries', desc: 'find opens starting directory via openat() and calls getdents64()', why: 'Reads directory contents', techDetail: 'Paginates through kernel directory entries in chunks' },
        { step: 2, title: 'Inode Filtering', desc: 'For each entry, evaluates inode flags against user arguments (-type, -size, -mtime)', why: 'Applies predicates', techDetail: 'Avoids stat() call if file type is already returned in dentry d_type field' },
        { step: 3, title: 'Executes Command Action', desc: 'If -exec or -delete is specified, executes action on matched paths', why: 'Processes results', techDetail: 'Forks child processes or invokes unlinkat() directly for -delete' },
      ],
      sandbox: {
        initialCommands: ['# Find all log files under /var/log\nfind /var/log -type f -name "*.log" | head -n 5'],
        guidedSteps: [
          { instruction: 'Find regular files named *.log', command: 'find /var/log -type f -name "*.log"', hint: 'Use find with -type f and -name' },
          { instruction: 'Inspect directory tree of /etc with depth 1', command: 'tree -L 1 /etc', hint: 'Run tree -L 1 /etc' },
        ],
        targetTask: 'Find all .log files in /var/log using find',
        solutionCommands: ['find /var/log -type f -name "*.log"'],
      },
      commonMistakes: [
        { mistake: 'Forgetting to quote glob patterns in find: find . -name *.log', whyWrong: 'The shell expands *.log before find runs; if multiple log files exist in current directory, find fails with syntax error.', correctWay: 'Always quote the pattern: find . -name "*.log".' },
        { mistake: 'Using locate to find a file you just created 5 seconds ago', whyWrong: 'locate checks mlocate.db which is usually only updated once daily by a system cron.', correctWay: 'Run sudo updatedb first, or use find for real-time search.' },
      ],
      challenge: {
        question: 'Which find command correctly and safely deletes all files ending in .bak that have not been modified for over 30 days?',
        options: [
          { label: 'find /var/backups -type f -name "*.bak" -mtime +30 -delete', isCorrect: true, explanation: '-type f ensures only files are matched, -mtime +30 checks for age > 30 days, and -delete removes them safely.' },
          { label: 'find /var/backups -name *.bak -mtime -30 -rm', isCorrect: false, explanation: 'Pattern is unquoted, -mtime -30 means less than 30 days, and -rm is not a valid find flag.' },
          { label: 'locate *.bak | rm -rf', isCorrect: false, explanation: 'Piping locate output directly to rm -rf does not pass arguments without xargs and ignores file age.' },
          { label: 'find /var/backups -delete -name "*.bak"', isCorrect: false, explanation: 'In find, order matters: placing -delete before -name would delete everything before checking the name!' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['find <dir> -type f -name "<glob>"', 'find <dir> -size +100M', 'find <dir> -mtime +30', 'locate <file>', 'tree -L <depth>'],
        bestPractices: [
          'Always run find without -delete first to review what files will be targeted before deleting',
          'Use -exec <cmd> {} + instead of -exec <cmd> {} \\; to batch arguments and reduce fork overhead',
        ],
      },
    },
  ],
};
