import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 03: NAVIGATING LINUX (03.1 to 03.11)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_03: LinuxTopic = {
  id: 'ch-03',
  number: '03',
  title: 'Navigating Linux',
  iconName: 'Compass',
  description: 'Traverse directories effortlessly with pwd, ls, cd, shortcuts, tab completion, command history, and discovery.',
  concepts: [
    buildLinuxConcept({
      id: 'c-03-01',
      subChapterNumber: '03.1',
      command: 'pwd',
      title: 'pwd',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Print Working Directory: output current absolute location in the directory tree',
      badges: ['Navigation', 'Core', 'Builtin'],
      difficulty: 'Beginner',
      quote: 'Before you can decide where to go, you must know exactly where you are standing.',
      whatIsIt: 'pwd ("Print Working Directory") outputs the full absolute path of your current working directory starting from root "/". It exists both as a shell builtin (in Bash/Zsh) and as a standalone POSIX core utility binary (/bin/pwd).',
      inSimpleWords: 'Think of pwd as your Linux GPS location. When you are deep inside nested folders and lose track of where you are, typing "pwd" shows your exact address.',
      whyDoYouNeedIt: 'Knowing your working directory prevents executing destructive commands in the wrong folder. It is also essential for capturing paths in shell scripts and resolving symbolic links.',
      realWorldScenario: 'You are preparing to run "rm -rf build/". Before running a command that permanently deletes files, you run "pwd" to verify you are inside "/home/deploy/project" and not accidentally in "/root" or "/var".',
      realWorldAnalogy: 'Looking at the "YOU ARE HERE" red dot on a shopping mall directory map.',
      withoutVsWith: {
        without: {
          title: 'Navigating Blindly Without pwd',
          items: ['Executing commands without knowing which folder you are modifying', 'Accidentally wiping out production files in the wrong directory', 'Writing fragile relative paths in automated deployment scripts'],
          outcome: 'Disastrous accidental deletions and unpredictable script errors.'
        },
        with: {
          title: 'Navigating With pwd Awareness',
          items: ['Instant spatial orientation in the single-rooted filesystem tree', 'Verifying canonical physical paths behind symlinks with pwd -P', 'Capturing reliable script paths using CURRENT_DIR=$(pwd)'],
          outcome: 'Safe, deterministic operations and bulletproof script execution.'
        }
      },
      blockDiagram: {
        title: 'Filesystem Tree Navigation Anchor',
        subtitle: 'pwd inspects process task_struct->fs->pwd pointer:',
        nodes: [
          { id: 'proc', label: 'Active Shell Process', simpleDef: 'Bash shell holding current working directory state', techDef: 'task_struct with fs_struct cwd dentry pointer', badge: 'Process', color: '#38bdf8' },
          { id: 'vfs', label: 'VFS Path Resolver', simpleDef: 'Traverses parent dentries back to root inode', techDef: 'Virtual Filesystem dentry tree upward traversal', badge: 'Kernel', color: '#10b981' },
          { id: 'stdout', label: 'Terminal Output', simpleDef: 'Prints canonical path string to screen', techDef: 'Writes /var/log/nginx to file descriptor 1', badge: 'Stdout', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Current Working Directory (CWD)', simple: 'The folder your terminal is currently looking inside.', technical: 'The dentry pointer in the task_struct structure of the calling process.' },
        { term: 'Symbolic Link Resolution', simple: 'Whether pwd reports the shortcut path or the real target folder.', technical: 'pwd -L (logical, following symlinks) vs pwd -P (physical, resolving underlying mount).' }
      ],
      syntaxCode: 'pwd [OPTIONS]',
      syntaxTokens: [
        { token: 'pwd', role: 'command', explanation: 'Print working directory' },
        { token: '[options]', role: 'flag', explanation: 'Optional flags: -L (logical, default) or -P (physical)' }
      ],
      variations: [
        { syntax: 'pwd -P', title: 'Physical Path Resolution', whatItDoes: 'Resolves all symlinks to show the underlying real directory path', whenToUse: 'When navigating folders created by docker, k8s, or symlink managers' },
        { syntax: 'pwd -L', title: 'Logical Path (Default)', whatItDoes: 'Prints the path including any symbolic links traversed', whenToUse: 'When preserving user mental model of folder structure' }
      ],
      beforeAfter: {
        before: '$ cd /var/mail\n$ pwd',
        after: '/var/mail\n$ pwd -P\n/var/spool/mail',
        explanation: 'pwd shows the logical symlink (/var/mail), while pwd -P reveals the true underlying target (/var/spool/mail).'
      },
      expectedOutput: '/home/ubuntu',
      whatChanges: ['Queries in-memory process environment ($PWD).'],
      whatDoesNotChange: ['Filesystem and working directory remain unchanged.'],
      safeRecovery: 'pwd is 100% read-only and completely safe.',
      commonMistakes: [
        { mistake: 'Assuming pwd changes your directory', whyItHappens: 'Confusing "print" with "change".', howToFix: 'pwd only prints where you are. Use "cd" to change directories.' },
        { mistake: 'Hardcoding paths in scripts without capturing $(pwd)', whyItHappens: 'Assuming the user will always invoke the script from the project root.', howToFix: 'Use "SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)" inside bash scripts.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-03-02',
      subChapterNumber: '03.2',
      command: 'ls -la',
      title: 'ls',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'List directory contents with permissions, ownership, size, and modification timestamps',
      badges: ['Navigation', 'Files', 'Core'],
      difficulty: 'Beginner',
      quote: 'ls is the primary eyesight of the Linux engineer; without it, you are typing in the dark.',
      whatIsIt: 'ls ("List") is the quintessential Unix core utility that lists files and subdirectories. By combining flags like -l (long format), -a (all including hidden dotfiles), -h (human-readable sizes), and -t (sort by time), ls reveals permissions, hard link counts, owners, file sizes, and timestamps.',
      inSimpleWords: 'Opening a folder in Windows or Mac shows icons with filenames and dates. Typing "ls -la" in Linux shows the exact same information in a clean, high-density text table.',
      whyDoYouNeedIt: 'You need ls constantly to verify whether a file was created, inspect permissions before executing scripts, find hidden configuration files, and check file sizes.',
      realWorldScenario: 'You cloned a Git repository, but the terminal shows an empty folder when you type "ls". Running "ls -la" immediately reveals ".git", ".env", and ".gitignore"—they were hidden because Linux treats files starting with a dot as hidden.',
      realWorldAnalogy: 'Turning on the lights in a storage warehouse. Instantly you see every shelf, box, label, and lock in the room.',
      terms: [
        { term: 'Long Listing Format (-l)', simple: 'The detailed view showing permissions, owner, size, and date.', technical: 'Outputs 7 columns: file type/permissions, links, user, group, byte size, mtime, and name.' },
        { term: 'Hidden File', simple: 'A file starting with a dot (.) hidden from ordinary view.', technical: 'Any file whose filename begins with ASCII 46 (.), omitted by default getdents64 filtering in ls.' }
      ],
      syntaxCode: 'ls [FLAGS] [PATH...]',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List directory contents' },
        { token: '-la', role: 'flag', explanation: 'Combine -l (long detailed format) and -a (all files including hidden)' }
      ],
      variations: [
        { syntax: 'ls -lh', title: 'Human Readable Sizes', whatItDoes: 'Displays file sizes in KB, MB, or GB (e.g. 14M instead of 14680064 bytes)', whenToUse: 'When auditing large files' },
        { syntax: 'ls -lt', title: 'Sort by Modification Time', whatItDoes: 'Sorts newest files to the top', whenToUse: 'When checking which log file was modified most recently' },
        { syntax: 'ls -R', title: 'Recursive Listing', whatItDoes: 'Lists files in the current folder and every subfolder recursively', whenToUse: 'Quick recursive inspection' }
      ],
      beforeAfter: {
        before: '$ ls\nbuild package.json src',
        after: '$ ls -la\ntotal 32\ndrwxr-xr-x 5 dev dev 4096 Sep 28 10:00 .\ndrwxr-xr-x 3 dev dev 4096 Sep 28 09:00 ..\n-rw-r--r-- 1 dev dev  240 Sep 28 09:30 .env\ndrwxr-xr-x 8 dev dev 4096 Sep 28 09:30 .git\n-rw-r--r-- 1 dev dev 1200 Sep 28 10:00 package.json',
        explanation: 'Note how "ls -la" reveals the hidden ".env" secrets file and Git version database that "ls" hid.'
      },
      expectedOutput: 'drwxr-xr-x dev dev .env',
      whatChanges: ['Calls getdents64 syscall to read directory stream.'],
      whatDoesNotChange: ['Filesystem contents and access times are unaffected (stat only).'],
      safeRecovery: 'ls is 100% read-only and safe.',
      commonMistakes: [
        { mistake: 'Thinking an empty directory has 0 entries', whyItHappens: 'Every directory in Linux contains at least two entries: "." (itself) and ".." (its parent).', howToFix: 'Use "ls -la" to see the fundamental "." and ".." pointers.' },
        { mistake: 'Parsing the output of "ls" inside shell scripts', whyItHappens: 'Filenames containing spaces, newlines, or asterisks break script parsing.', howToFix: 'Never parse "ls" in scripts; use bash globs or "find -print0 | xargs -0".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-03-03',
      subChapterNumber: '03.3',
      command: 'cd /var/log',
      title: 'cd',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Change Directory: navigate into directories using absolute or relative paths',
      badges: ['Navigation', 'Shell', 'Builtin'],
      difficulty: 'Beginner',
      quote: 'cd cannot exist as a separate program binary; it must be a shell builtin to change your shell\'s memory state.',
      whatIsIt: 'cd ("Change Directory") shifts your shell\'s current working directory to a new target path. Because a child process cannot modify the memory state of its parent process in POSIX operating systems, cd is implemented as a shell builtin directly inside Bash, Zsh, and Dash.',
      inSimpleWords: 'Double-clicking a folder in a graphical interface opens that folder. In the Linux terminal, typing "cd foldername" steps inside that folder.',
      whyDoYouNeedIt: 'All relative paths and terminal commands operate within your active working directory. cd allows you to move into project folders, configuration directories, and log vaults smoothly.',
      realWorldScenario: 'You are investigating an Nginx crash. Rather than typing "/var/log/nginx/error.log" repeatedly, you type "cd /var/log/nginx". Now you can run "tail -f error.log", "less access.log", and "grep 500 error.log" effortlessly.',
      realWorldAnalogy: 'Walking from your living room into the kitchen. In the kitchen, you can reach for the refrigerator and stove without walking across the whole house.',
      terms: [
        { term: 'Shell Builtin', simple: 'A command built directly into the terminal program rather than stored on disk.', technical: 'A function executed in the address space of the current shell process without fork()/execve().' },
        { term: 'chdir() syscall', simple: 'The kernel command that officially updates your active folder.', technical: 'The POSIX system call updating task_struct->fs->pwd to the inode of the target directory.' }
      ],
      syntaxCode: 'cd [DIRECTORY_PATH]',
      syntaxTokens: [
        { token: 'cd', role: 'command', explanation: 'Change current working directory' },
        { token: '/var/log', role: 'path', explanation: 'Target directory destination path' }
      ],
      variations: [
        { syntax: 'cd', title: 'Return Home', whatItDoes: 'Navigates directly to your user home directory ($HOME)', whenToUse: 'When cd is typed with zero arguments' },
        { syntax: 'cd -', title: 'Toggle Previous Directory', whatItDoes: 'Switches back to the directory you were in before the last cd command', whenToUse: 'When bouncing between two directories' },
        { syntax: 'cd ..', title: 'Step Up One Level', whatItDoes: 'Moves into the parent directory', whenToUse: 'When ascending the directory tree' }
      ],
      beforeAfter: {
        before: '$ pwd\n/home/ubuntu\n$ cd /var/log',
        after: '$ pwd\n/var/log',
        explanation: 'The shell successfully moves its current working directory into /var/log.'
      },
      expectedOutput: '[Directory changed, prompt updates to /var/log]',
      whatChanges: ['Updates process current working directory and updates $PWD and $OLDPWD variables.'],
      whatDoesNotChange: ['Filesystem contents remain unchanged.'],
      safeRecovery: 'If you ever find yourself lost in a strange directory, type "cd" or "cd ~" to immediately return home safely.',
      commonMistakes: [
        { mistake: 'Trying to find the executable binary with "which cd"', whyItHappens: 'Not realizing cd is a shell builtin.', howToFix: 'Run "type cd" to verify: "cd is a shell builtin".' },
        { mistake: 'Typing "cd filename.txt"', whyItHappens: 'Attempting to cd into a regular file instead of a directory.', howToFix: 'cd only works on directories. Linux will report "Not a directory".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-03-04',
      subChapterNumber: '03.4',
      command: 'cd /etc/nginx/sites-available',
      title: 'Absolute Navigation',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Navigating by specifying the full path from the filesystem root "/"',
      badges: ['Navigation', 'Paths'],
      difficulty: 'Beginner',
      quote: 'An absolute path works every time, from anywhere, without ambiguity.',
      whatIsIt: 'Absolute navigation means providing a path starting with the root slash "/" (e.g. "cd /etc/nginx/sites-available"). No matter where your terminal is currently positioned—whether in /home/user or /tmp—the destination resolved by Linux is guaranteed to be identical.',
      inSimpleWords: 'Absolute navigation is like mailing a letter with the full postal code, state, city, and street address. The postal service will deliver it correctly whether you drop it in a mailbox in New York or Tokyo.',
      whyDoYouNeedIt: 'Production scripts, cron jobs, and CI/CD pipelines must always use absolute navigation. If a script relies on relative assumptions, running it from another directory will cause it to target the wrong files.',
      realWorldScenario: 'You are writing an automated Ansible playbook or Bash bootstrap script that restarts Nginx after copying website templates. You specify "cd /var/www/mywebsite" or "rm -rf /var/www/mywebsite/cache" to guarantee safe, deterministic targets.',
      realWorldAnalogy: 'Typing a full website URL ("https://github.com/torvalds/linux") into your browser address bar instead of clicking a relative "next page" button.',
      terms: [
        { term: 'Root-Relative Resolution', simple: 'The kernel starting its directory search from inode 2.', technical: 'VFS resolving path tokens sequentially starting at the process root dentry (task_struct->fs->root).' },
        { term: 'Path Invariance', simple: 'The path never changes meaning regardless of where you are.', technical: 'The destination invariant property of absolute paths independent of the calling process CWD.' }
      ],
      syntaxCode: 'cd /absolute/path/to/directory',
      syntaxTokens: [
        { token: 'cd', role: 'command', explanation: 'Change directory builtin' },
        { token: '/etc/nginx/sites-available', role: 'path', explanation: 'Absolute path starting at root slash /' }
      ],
      variations: [
        { syntax: 'ls -l /var/log/nginx', title: 'Absolute Inspection', whatItDoes: 'Lists files in /var/log/nginx without changing your current directory', whenToUse: 'When you want to inspect a remote folder without leaving your workspace' }
      ],
      beforeAfter: {
        before: '$ pwd\n/tmp\n$ cd /etc/nginx/sites-available',
        after: '$ pwd\n/etc/nginx/sites-available',
        explanation: 'Jumps directly across the filesystem tree in a single step.'
      },
      expectedOutput: '[Working directory becomes /etc/nginx/sites-available]',
      whatChanges: ['Updates working directory.'],
      whatDoesNotChange: ['Files remain intact.'],
      safeRecovery: 'Use "cd -" to jump back immediately to your starting directory.',
      commonMistakes: [
        { mistake: 'Forgetting the leading forward slash (e.g. typing "cd etc/nginx" instead of "/etc/nginx")', whyItHappens: 'Typing too quickly.', howToFix: 'If you are not already in "/", you will get "No such file or directory". Always prepend "/" for absolute paths.' },
        { mistake: 'Typing backslashes like Windows (e.g. cd \\etc\\nginx)', whyItHappens: 'Muscle memory from DOS/Windows.', howToFix: 'Linux paths strictly use forward slashes ("/"). Backslashes are escape characters.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-03-05',
      subChapterNumber: '03.5',
      command: 'cd ../../var/log',
      title: 'Relative Navigation',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Navigating based on your current location using ".", "..", and child directory names',
      badges: ['Navigation', 'Paths'],
      difficulty: 'Beginner',
      quote: 'Relative navigation saves keystrokes by moving in relation to where you currently stand.',
      whatIsIt: 'Relative navigation means specifying a path without a leading slash. The path is calculated starting from your current working directory. You can step into subfolders ("cd src/components"), ascend to parents ("cd .."), or hop sideways across directory branches ("cd ../sibling-folder").',
      inSimpleWords: 'Instead of saying "Go to Earth, North America, USA, California, San Francisco, 100 Market St", relative navigation simply says "Walk down the hall and turn right into Room 302".',
      whyDoYouNeedIt: 'When developing software projects, code repositories must be portable. Referencing "./config/app.json" or "../assets/logo.png" ensures your project works whether cloned in /home/user/project or /var/www/project.',
      realWorldScenario: 'You are working inside "/home/deploy/app/src/backend". You need to inspect the frontend code in the sibling directory. Instead of typing the long path "/home/deploy/app/src/frontend", you type "cd ../frontend".',
      realWorldAnalogy: 'Stepping into the adjacent bedroom from the hallway rather than walking outside to the front gate and re-entering the house.',
      terms: [
        { term: 'Parent Directory (..)', simple: 'The folder containing the current folder.', technical: 'Hard link in the directory table pointing to the inode of the parent directory.' },
        { term: 'Current Directory (.)', simple: 'The directory you are currently standing inside.', technical: 'Hard link pointing directly to the directory\'s own inode.' }
      ],
      syntaxCode: 'cd [../PATH | SUBFOLDER]',
      syntaxTokens: [
        { token: 'cd', role: 'command', explanation: 'Change working directory' },
        { token: '../../var/log', role: 'path', explanation: 'Relative path ascending two levels and descending into var/log' }
      ],
      variations: [
        { syntax: 'cd ..', title: 'Ascend One Level', whatItDoes: 'Moves up to the direct parent folder', whenToUse: 'When stepping out of a subdirectory' },
        { syntax: 'cd ../..', title: 'Ascend Two Levels', whatItDoes: 'Steps up two folder tiers at once', whenToUse: 'Quick traversal up deep trees' }
      ],
      beforeAfter: {
        before: '$ pwd\n/home/deploy/app/src\n$ cd ../dist',
        after: '$ pwd\n/home/deploy/app/dist',
        explanation: 'Steps up from "src" to "app" and into the sibling folder "dist".'
      },
      expectedOutput: '[Current directory changes to target relative path]',
      whatChanges: ['Working directory updates.'],
      whatDoesNotChange: ['Files remain intact.'],
      safeRecovery: 'Use "cd -" to revert to the previous directory if you stepped into the wrong folder.',
      commonMistakes: [
        { mistake: 'Typing "cd ..."', whyItHappens: 'Thinking three dots steps up two levels.', howToFix: 'Linux only recognizes ".." (parent) and "." (current). For two levels, type "cd ../..".' },
        { mistake: 'Forgetting space between cd and .. (e.g. typing "cd..")', whyItHappens: 'Windows command prompt permits "cd..", but Linux requires a space: "cd ..".', howToFix: 'Always include a space: "cd ..".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-03-06',
      subChapterNumber: '03.6',
      command: 'ls -a',
      title: '. and ..',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Current directory (.) and parent directory (..) pointers present in every folder',
      badges: ['Navigation', 'Inodes'],
      difficulty: 'Beginner',
      quote: '. and .. are not decorative conventions; they are literal hard link entries recorded inside every filesystem directory block.',
      whatIsIt: 'In every Linux filesystem, every single directory contains two mandatory directory entries: "." (a hard link pointing to the directory itself) and ".." (a hard link pointing to its parent directory). In the root directory "/", ".." points to "/" itself.',
      inSimpleWords: '"." means "right here". ".." means "one level up". Linux creates these two entries automatically the instant any directory is created.',
      whyDoYouNeedIt: 'You use "." to execute programs in your current directory ("./script.sh") and ".." to navigate upwards ("cd .."). They are also how Linux tracks folder hard link counts.',
      realWorldScenario: 'You compile a C program or write a script named "run.sh". You type "run.sh" and Linux says "command not found". Why? For security, Linux does not search the current directory by default. You must explicitly specify "./run.sh" to tell the shell to execute the file right here.',
      realWorldAnalogy: 'The "You Are Here" locator pin (.) and the "Back" button on your web browser (..).',
      terms: [
        { term: 'Dot (.)', simple: 'Refers to the current directory.', technical: 'Directory entry pointing to the inode of the containing directory.' },
        { term: 'Dot-Dot (..)', simple: 'Refers to the parent directory.', technical: 'Directory entry pointing to the inode of the parent directory.' }
      ],
      syntaxCode: './[SCRIPT_NAME]',
      syntaxTokens: [
        { token: './', role: 'path', explanation: 'Explicit relative path prefix targeting current directory' },
        { token: 'deploy.sh', role: 'command', explanation: 'Executable script in active folder' }
      ],
      variations: [
        { syntax: 'ls -ldi . ..', title: 'Inspect Inodes of . and ..', whatItDoes: 'Prints the distinct inode numbers of current and parent directories', whenToUse: 'When verifying hard link structure' }
      ],
      beforeAfter: {
        before: '$ ls -ld .\ndrwxr-xr-x 2 dev dev 4096 Sep 28 10:00 .',
        after: '$ ls -ld ..\ndrwxr-xr-x 5 dev dev 4096 Sep 28 09:00 ..',
        explanation: 'Confirms "." and ".." represent distinct directory inode objects.'
      },
      expectedOutput: 'drwxr-xr-x . (current)\ndrwxr-xr-x .. (parent)',
      whatChanges: ['Reads directory entry pointers.'],
      whatDoesNotChange: ['Pointers are immutable.'],
      safeRecovery: 'Read-only examination.',
      commonMistakes: [
        { mistake: 'Trying to delete "." or ".." with rm', whyItHappens: 'Accidental wildcard expansion.', howToFix: 'POSIX kernels explicitly forbid unlinking "." and "..". Linux will return an error preventing corruption.' },
        { mistake: 'Running "script.sh" instead of "./script.sh"', whyItHappens: 'Expecting current folder to be in $PATH.', howToFix: 'Always prefix with "./" for local executables to prevent Trojan horse attacks.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-03-07',
      subChapterNumber: '03.7',
      command: 'cd ~',
      title: '~ Home Directory',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'The tilde shortcut expanding to the active user home path ($HOME)',
      badges: ['Navigation', 'Shortcuts'],
      difficulty: 'Beginner',
      quote: 'The tilde ~ is shell shorthand for home: no matter what user you are logged in as, ~ always takes you to your personal workspace.',
      whatIsIt: 'In Linux shells, the tilde character "~" is automatically expanded by the shell (via Tilde Expansion) to the absolute path of the current user\'s home directory (e.g. "/home/ubuntu" or "/home/dev"). Typing "~username" expands to that specific user\'s home directory (e.g. "~bob" -> "/home/bob").',
      inSimpleWords: 'Think of "~" as the universal "Home" button on a smartphone or game console. No matter how deep you are in unfamiliar subfolders, "~" teleports you back to your personal desk.',
      whyDoYouNeedIt: 'Using "~" allows you to write scripts and documentation that work for any user. Writing "~/.ssh/authorized_keys" works whether the user is named "alice", "bob", or "ubuntu", avoiding broken hardcoded paths.',
      realWorldScenario: 'You are configuring SSH keys for server login. You run "cat ~/.ssh/id_ed25519.pub". The shell automatically translates "~" to "/home/deploy/.ssh/id_ed25519.pub", letting you access your keys instantly.',
      realWorldAnalogy: 'The "Home" key on a keyboard or the "Return Home" button on a GPS navigation unit.',
      terms: [
        { term: 'Tilde Expansion', simple: 'The shell replacing ~ with the full path of your home folder.', technical: 'POSIX shell word expansion replacing a leading unquoted tilde with the value of $HOME.' },
        { term: '$HOME', simple: 'The environment variable storing your home folder path.', technical: 'Environment variable assigned by login process (login, sshd) from the 6th field of /etc/passwd.' }
      ],
      syntaxCode: 'cd ~',
      syntaxTokens: [
        { token: 'cd', role: 'command', explanation: 'Change working directory' },
        { token: '~', role: 'path', explanation: 'Tilde shortcut expanding to current user $HOME' }
      ],
      variations: [
        { syntax: 'ls -la ~/.ssh', title: 'Inspect User SSH Keys', whatItDoes: 'Lists keys in your personal SSH configuration folder', whenToUse: 'When checking remote server authentication keys' },
        { syntax: 'echo ~', title: 'Print Expanded Tilde', whatItDoes: 'Demonstrates how the shell expands ~ to /home/username', whenToUse: 'Testing tilde expansion' }
      ],
      beforeAfter: {
        before: '$ pwd\n/var/log/journal/8934fa\n$ cd ~',
        after: '$ pwd\n/home/deploy',
        explanation: 'Instantly teleports the user from deep system log directories back to their personal home workspace.'
      },
      expectedOutput: '/home/deploy',
      whatChanges: ['Working directory updates to $HOME.'],
      whatDoesNotChange: ['User files remain unchanged.'],
      safeRecovery: 'Safe and instant.',
      commonMistakes: [
        { mistake: 'Quoting the tilde character (e.g. cd "~" or cd \'~\')', whyItHappens: 'Quoting disables shell tilde expansion, causing the shell to search for a literal directory named "~".', howToFix: 'Leave the tilde unquoted: "cd ~" or "cd ~/projects".' },
        { mistake: 'Assuming "~" expands when used in non-shell programming languages', whyItHappens: 'Python or Node.js do not expand "~" in path strings by default.', howToFix: 'Use os.path.expanduser("~") in Python or os.homedir() in Node.js.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-03-08',
      subChapterNumber: '03.8',
      command: 'read -e -p "Tab to auto-complete: "',
      title: 'Tab Completion',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Save typing and eliminate path typos with readline automatic completion',
      badges: ['Productivity', 'Bash'],
      difficulty: 'Beginner',
      quote: 'If you type out full paths by hand in Linux, you are working too hard; let the Tab key finish your thoughts.',
      whatIsIt: 'Tab Completion (powered by the GNU Readline library in Bash) is the terminal feature that automatically completes command names, filenames, directory paths, and options when you press the Tab key. If multiple matches exist, pressing Tab twice shows all possible options.',
      inSimpleWords: 'It is predictive text for the command line. Type "cd /v" and hit Tab $\rightarrow$ the terminal instantly types "cd /var/". Type "l" and hit Tab $\rightarrow$ it becomes "cd /var/log/".',
      whyDoYouNeedIt: 'Tab completion prevents frustrating typos, accelerates your command-line workflow by 5x, and acts as an instant discovery tool to see what files exist without running "ls".',
      realWorldScenario: 'You need to restart a systemd service with a long name like "systemd-networkd-wait-online.service". You type "sudo systemctl restart systemd-net" and press Tab $\rightarrow$ Bash autocompletes the exact service name error-free.',
      realWorldAnalogy: 'Autofill search suggestions on Google or code auto-completion (IntelliSense) in an IDE.',
      terms: [
        { term: 'GNU Readline', simple: 'The library that handles keystrokes and line editing in bash.', technical: 'Software library providing emacs/vi line-editing modes, history recall, and programmable completion.' },
        { term: 'Double-Tab', simple: 'Pressing Tab twice to display all possible matches when ambiguous.', technical: 'Triggering readline rl_complete() to display candidate list on multiple prefix matches.' }
      ],
      syntaxCode: 'command /pa[TAB]',
      syntaxTokens: [
        { token: 'command', role: 'command', explanation: 'Any system executable' },
        { token: '/pa[TAB]', role: 'path', explanation: 'Partial path completed by pressing the Tab key' }
      ],
      variations: [
        { syntax: 'systemctl res[TAB]', title: 'Command Completion', whatItDoes: 'Autocompletes systemctl subcommands (e.g. restart)', whenToUse: 'When you cannot remember exact flag spellings' }
      ],
      beforeAfter: {
        before: '$ cd /etc/ng[Press Tab]',
        after: '$ cd /etc/nginx/',
        explanation: 'Bash auto-completes the unique directory name and appends the trailing forward slash.'
      },
      expectedOutput: '[Autocompleted text in command line buffer]',
      whatChanges: ['Fills shell readline input buffer.'],
      whatDoesNotChange: ['No commands executed until Enter is pressed.'],
      safeRecovery: 'Pressing Tab never executes a command; it only types text into your prompt.',
      commonMistakes: [
        { mistake: 'Pressing Tab and nothing happens', whyItHappens: 'Multiple files match the prefix, or a typo was typed earlier in the path.', howToFix: 'Press Tab a SECOND time to view candidate matches, or check your path spelling.' },
        { mistake: 'Trying to Tab complete files you do not have read permissions to see', whyItHappens: 'Readline needs read permissions on the directory to list matching files.', howToFix: 'Use sudo or check directory permissions.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-03-09',
      subChapterNumber: '03.9',
      command: 'history | tail -n 15',
      title: 'Command History',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Inspect prior executed commands, replay with "!", and reverse search with Ctrl+R',
      badges: ['History', 'Bash', 'Productivity'],
      difficulty: 'Beginner',
      quote: 'Those who do not remember their command history are condemned to retype long commands forever.',
      whatIsIt: 'The history subsystem records every command executed in your shell session and persists them across logouts to "~/.bash_history". You can view past commands with "history", replay the previous command with "!!", rerun command #42 with "!42", and perform an instant interactive reverse search by pressing "Ctrl+R".',
      inSimpleWords: 'Think of history as your shell\'s memory. Every command you have typed over the last year is stored in a log. With Ctrl+R, you can find that complex docker command you ran three weeks ago in two seconds.',
      whyDoYouNeedIt: 'Linux engineers frequently execute complex multi-pipe commands with dozens of flags. History prevents having to memorize or re-type them from scratch.',
      realWorldScenario: 'Two days ago, you configured a complicated database migration command with 8 arguments. You press Ctrl+R, type "migration", and the entire 80-character command reappears on your prompt ready to execute.',
      realWorldAnalogy: 'Browser history or recent calls on your smartphone.',
      terms: [
        { term: 'Ctrl+R (Reverse Search)', simple: 'Interactive search through your past commands as you type letters.', technical: 'Readline reverse-i-search mode incrementally searching backward through history buffer.' },
        { term: 'Bang-Bang (!!)', simple: 'Reruns the immediate previous command.', technical: 'History expansion token expanding to the preceding command line.' }
      ],
      syntaxCode: 'history [COUNT]',
      syntaxTokens: [
        { token: 'history', role: 'command', explanation: 'Display the command history list with line numbers' },
        { token: '| tail -n 15', role: 'operator', explanation: 'Filter to show only the 15 most recent commands' }
      ],
      variations: [
        { syntax: 'sudo !!', title: 'Rerun as Sudo', whatItDoes: 'Repeats the last failed command with sudo prepended', whenToUse: 'When you forget sudo on a privileged command' },
        { syntax: 'history -c', title: 'Clear Current Session History', whatItDoes: 'Clears the in-memory history list', whenToUse: 'When sanitizing shell memory' }
      ],
      beforeAfter: {
        before: '$ apt install nginx\nE: Could not open lock file - Permission denied\n$ sudo !!',
        after: '$ sudo apt install nginx\n[Reading package lists... Done]',
        explanation: '"sudo !!" instantly reapplies the failed command with root privileges.'
      },
      expectedOutput: ' 1042  docker compose up -d\n 1043  systemctl status nginx',
      whatChanges: ['Reads history buffer.'],
      whatDoesNotChange: ['System state is unaffected.'],
      safeRecovery: 'History is read-only. Be cautious when re-executing commands with "!" to avoid re-running unintended lines.',
      commonMistakes: [
        { mistake: 'Typing sensitive passwords in the terminal that get saved in ~/.bash_history', whyItHappens: 'Passing passwords as command line arguments.', howToFix: 'Start the command with a leading space (if HISTCONTROL=ignorespace is set) or clean ~/.bash_history.' },
        { mistake: 'Re-running "rm" commands blindly with "!!"', whyItHappens: 'Accidentally deleting the wrong files because the previous command was unexpected.', howToFix: 'Type "!:p" to preview the history expansion before executing it.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-03-10',
      subChapterNumber: '03.10',
      command: 'clear',
      title: 'clear',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Reset the terminal viewport canvas (or Ctrl+L) without wiping scrollback memory',
      badges: ['Terminal', 'Productivity'],
      difficulty: 'Beginner',
      quote: 'A cluttered terminal breeds confusion; clear gives you a fresh mental canvas in one keystroke.',
      whatIsIt: 'clear sends standard ANSI/VT100 terminal escape sequences (ESC [ 2 J and ESC [ H) to wipe the visible screen buffer and reposition the cursor at the top-left corner (row 1, column 1). It does NOT delete your previous commands; you can still scroll up in your terminal emulator to view prior output.',
      inSimpleWords: 'Typing "clear" (or pressing Ctrl+L) is like wiping clean a classroom chalkboard so you have a fresh slate to write on.',
      whyDoYouNeedIt: 'After long outputs (e.g. running compiler builds, container logs, or large cat commands), the terminal becomes visually overwhelming. Clearing the screen restores mental clarity.',
      realWorldScenario: 'You are monitoring a log file and need to distinguish past errors from new ones during a live test. You hit Ctrl+L to clear the screen, trigger the test, and observe the new error lines appear cleanly on a blank terminal.',
      realWorldAnalogy: 'Wiping a chalkboard or turning to a clean page in a notebook.',
      terms: [
        { term: 'ANSI Escape Code', simple: 'Special invisible control codes sent to terminal screens to format colors and cursor positions.', technical: 'In-band signaling standard (ISO/IEC 6429) for cursor control and screen buffer manipulation.' },
        { term: 'Ctrl+L', simple: 'The keyboard shortcut equivalent to typing clear.', technical: 'Readline redraw-current-line function signaling clear-screen escape sequence.' }
      ],
      syntaxCode: 'clear',
      syntaxTokens: [
        { token: 'clear', role: 'command', explanation: 'Clear the terminal screen viewport' },
        { token: '[options]', role: 'flag', explanation: 'Optional flag -x (do not clear scrollback buffer)' }
      ],
      variations: [
        { syntax: 'clear -x', title: 'Preserve Scrollback', whatItDoes: 'Clears only the visible screen without clearing scrollback memory', whenToUse: 'When you want a clean view but need to scroll up later' },
        { syntax: 'reset', title: 'Hard Terminal Reset', whatItDoes: 'Reinitializes broken terminal modes after viewing binary files', whenToUse: 'When your terminal displays garbled alien characters' }
      ],
      beforeAfter: {
        before: '[50 lines of noisy build output cluttering terminal]\n$ clear',
        after: '$ \n[Cursor at top-left, clean terminal viewport]',
        explanation: 'The terminal screen is wiped clean, restoring cursor to top position.'
      },
      expectedOutput: '[Screen clears, cursor at top-left]',
      whatChanges: ['Sends ANSI escape sequences to stdout.'],
      whatDoesNotChange: ['System state, filesystem, and shell variables are untouched.'],
      safeRecovery: '100% safe. Scroll up with your mouse wheel if you need to view prior text.',
      commonMistakes: [
        { mistake: 'Panicking that "clear" erased past work', whyItHappens: 'Thinking the terminal deleted command output.', howToFix: 'Simply scroll up with your mouse wheel or Shift+PageUp to see your prior text.' },
        { mistake: 'Typing clear when the terminal is completely frozen by a binary file', whyItHappens: 'Dumping binary files scrambles the terminal driver character set.', howToFix: 'Type "reset" and hit Enter to reinitialize the terminal driver.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-03-11',
      subChapterNumber: '03.11',
      command: 'tree -L 2',
      title: 'File and Directory Discovery',
      topicId: 'ch-03',
      topicNumber: '03',
      topicTitle: 'Navigating Linux',
      subtitle: 'Visual tree exploration and spatial discovery of nested directory structures',
      badges: ['Discovery', 'Tree'],
      difficulty: 'Beginner',
      quote: 'tree turns flat path strings into a living structural map of your architecture.',
      whatIsIt: 'tree is a recursive directory listing program that produces a visual depth-indented hierarchy of files and folders. By using options like -L (limit depth), -d (directories only), and -I (ignore patterns like node_modules), tree gives engineers an instant architectural blueprint of any codebase or filesystem branch.',
      inSimpleWords: 'Instead of listing files in a flat boring list, tree draws visual tree branches with lines, showing exactly which files belong inside which subfolders.',
      whyDoYouNeedIt: 'When onboarding onto a new project or inspecting a server directory, running tree provides immediate mental clarity on how the project is organized.',
      realWorldScenario: 'You clone a large microservice project with hundreds of folders. Running "tree -L 2 -d" gives you a clean two-level structural overview of the controllers, models, configs, and assets in 1 second.',
      realWorldAnalogy: 'An organization chart showing the CEO at the top branching down to department heads, managers, and individual team members.',
      terms: [
        { term: 'Depth Limit (-L)', simple: 'Tells tree how many levels deep into folders to explore.', technical: 'Parameter restricting recursive traversal to max_depth levels to prevent runaway output.' },
        { term: 'Ignore Pattern (-I)', simple: 'Skips huge folders you do not care about (like node_modules or .git).', technical: 'Regex or wildcard pattern excluded from directory descent.' }
      ],
      syntaxCode: 'tree [OPTIONS] [DIRECTORY]',
      syntaxTokens: [
        { token: 'tree', role: 'command', explanation: 'List contents of directories in a tree-like format' },
        { token: '-L 2', role: 'flag', explanation: 'Limit directory recursion depth to 2 levels' }
      ],
      variations: [
        { syntax: 'tree -d -L 2', title: 'Directories Only', whatItDoes: 'Hides files and visualizes only the folder skeleton', whenToUse: 'When analyzing high-level architecture' },
        { syntax: 'tree -I "node_modules|.git"', title: 'Exclude Heavy Folders', whatItDoes: 'Prunes vendor and version control trees from visualization', whenToUse: 'In web and Node.js projects' }
      ],
      beforeAfter: {
        before: '$ tree -L 2\n[Traversing directory tree...]',
        after: '.\n├── backend\n│   ├── Dockerfile\n│   ├── main.go\n│   └── config\n├── frontend\n│   ├── package.json\n│   └── src\n└── README.md\n\n4 directories, 4 files',
        explanation: 'Provides a clean visual blueprint of the project architecture.'
      },
      expectedOutput: '├── backend\n└── frontend\n4 directories, 4 files',
      whatChanges: ['Recursively traverses directory inodes.'],
      whatDoesNotChange: ['Filesystem is unmodified.'],
      safeRecovery: 'If tree starts dumping thousands of files, press Ctrl+C to cancel.',
      commonMistakes: [
        { mistake: 'Running "tree" without depth limits in a root or node_modules directory', whyItHappens: 'Traversing 200,000 files locks the terminal for minutes.', howToFix: 'Always include "-L 2" or "-L 3" to restrict depth.' },
        { mistake: 'Assuming tree is always pre-installed on minimal server images', whyItHappens: 'Minimal cloud images omit tree to save disk space.', howToFix: 'Install it via "sudo apt install tree" or use "find . -maxdepth 2" as a built-in alternative.' }
      ]
    })
  ]
};
