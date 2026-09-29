import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 06: LINUX COMMAND LINE (06.1 to 06.13)
// ============================================================================
export const CHAPTER_06: LinuxTopic = {
  id: 'ch-06',
  number: '06',
  title: 'Linux Command Line',
  iconName: 'Terminal',
  description: 'Master the Unix command line: shells, terminals, command grammar, flags, arguments, exit codes, and standard I/O streams.',
  concepts: [
    buildLinuxConcept({
      id: 'c-06-01',
      subChapterNumber: '06.1',
      command: 'echo $SHELL',
      title: 'Shell',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'The command language interpreter that reads inputs, evaluates syntax, and executes programs',
      badges: ['CLI', 'Shell', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-06-02',
      subChapterNumber: '06.2',
      command: 'tty',
      title: 'Terminal',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Terminal emulators and pseudoterminals (PTYs) providing graphical window frames for shell sessions',
      badges: ['CLI', 'TTY'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-06-03',
      subChapterNumber: '06.3',
      command: 'bash --version',
      title: 'Bash',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Bourne Again SHell: the ubiquitous default POSIX-compliant shell for Linux distributions',
      badges: ['Bash', 'Shell', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-06-04',
      subChapterNumber: '06.4',
      command: 'tar -czvf backup.tar.gz /var/log',
      title: 'Command Structure',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'The universal syntax formula: executable + options/flags + positional arguments',
      badges: ['Syntax', 'Grammar'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-06-05',
      subChapterNumber: '06.5',
      command: 'cp source.txt destination.txt',
      title: 'Arguments',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Positional parameters passing targets, filenames, directories, or values into programs',
      badges: ['Syntax', 'Parameters'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-06-06',
      subChapterNumber: '06.6',
      command: 'ls -l -a -h --color=auto',
      title: 'Options and Flags',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Short single-dash flags (-v) and long double-dash options (--verbose) modifying execution behavior',
      badges: ['Flags', 'Options'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-06-07',
      subChapterNumber: '06.7',
      command: 'help cd',
      title: 'Command Help',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Distinguishing shell builtins (help) from external filesystem binaries (man / --help)',
      badges: ['Discovery', 'Builtins'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-06-08',
      subChapterNumber: '06.8',
      command: 'man 1 ls',
      title: 'man Pages',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'The authoritative offline system documentation manual divided into 8 standardized sections',
      badges: ['Documentation', 'ManPages'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-06-09',
      subChapterNumber: '06.9',
      command: 'grep --help',
      title: '--help',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Rapid CLI flag cheat-sheet printed directly to standard output without entering a pager',
      badges: ['Help', 'QuickRef'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-06-10',
      subChapterNumber: '06.10',
      command: 'echo $?',
      title: 'Command Exit Codes',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'The return status: 0 indicates success, while non-zero (1-255) communicates specific failure reasons',
      badges: ['ExitCodes', 'Scripting', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-06-11',
      subChapterNumber: '06.11',
      command: 'echo "Standard output stream" > /dev/stdout',
      title: 'stdout',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Standard Output (File Descriptor 1): normal data output stream destined for the terminal or pipeline',
      badges: ['Streams', 'FD1', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-06-12',
      subChapterNumber: '06.12',
      command: 'ls /nonexistent 2> error.log',
      title: 'stderr',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Standard Error (File Descriptor 2): dedicated diagnostic channel separated from data pipelines',
      badges: ['Streams', 'FD2', 'Diagnostics'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-06-13',
      subChapterNumber: '06.13',
      command: 'cat < /etc/resolv.conf',
      title: 'stdin',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Standard Input (File Descriptor 0): incoming byte stream feeding data into commands',
      badges: ['Streams', 'FD0', 'Input'],
      difficulty: 'Beginner'
    })
  ]
};

// ============================================================================
// CHAPTER 07: PIPES AND REDIRECTION (07.1 to 07.14)
// ============================================================================
export const CHAPTER_07: LinuxTopic = {
  id: 'ch-07',
  number: '07',
  title: 'Pipes and Redirection',
  iconName: 'Workflow',
  description: 'Unleash the Unix philosophy: redirect streams, chain commands, combine stdout/stderr, and pipeline tools.',
  concepts: [
    buildLinuxConcept({
      id: 'c-07-01',
      subChapterNumber: '07.1',
      command: 'echo "System initialised" > status.txt',
      title: 'Output Redirection',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Diverting standard output stream from terminal screen directly into filesystem files',
      badges: ['Redirection', 'Streams'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-07-02',
      subChapterNumber: '07.2',
      command: 'date > timestamp.txt',
      title: '>',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Overwrite redirection: truncates existing file content to 0 bytes before writing new stream',
      badges: ['Operators', 'Overwrite'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-07-03',
      subChapterNumber: '07.3',
      command: 'uptime >> server_health.log',
      title: '>>',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Append redirection: preserves existing content and appends stream bytes to the end of the file',
      badges: ['Operators', 'Append'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-07-04',
      subChapterNumber: '07.4',
      command: 'mail -s "Alert" admin@internal < report.txt',
      title: 'Input Redirection',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Feeding file contents into a command standard input (stdin) channel without interactive typing',
      badges: ['Redirection', 'Input'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-07-05',
      subChapterNumber: '07.5',
      command: 'wc -l < /etc/passwd',
      title: '<',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'The left angle bracket input operator connecting a file as standard input stream',
      badges: ['Operators', 'stdin'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-07-06',
      subChapterNumber: '07.6',
      command: 'cat /var/log/syslog | grep -i "error"',
      title: 'Pipes |',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Connecting the stdout of process A directly into the stdin of process B in kernel buffer memory',
      badges: ['Pipes', 'Streams', 'UnixPhilosophy', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-07-07',
      subChapterNumber: '07.7',
      command: 'cat /etc/passwd | cut -d: -f1 | sort | uniq -c',
      title: 'Combining Commands',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Composing small, specialized utilities into powerful text and data processing assembly lines',
      badges: ['Pipelines', 'Composition'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-07-08',
      subChapterNumber: '07.8',
      command: 'echo "nameserver 1.1.1.1" | sudo tee -a /etc/resolv.conf',
      title: 'tee',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'T-splitter utility splitting a stream: writes to files while simultaneously echoing to terminal',
      badges: ['tee', 'Sudo', 'Pipes'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-07-09',
      subChapterNumber: '07.9',
      command: 'systemctl restart nginx 2> /dev/null',
      title: 'stderr Redirection',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Routing error messages using 2> to isolate diagnostics or silence unwanted warnings to /dev/null',
      badges: ['stderr', 'FD2', 'Filtering'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-07-10',
      subChapterNumber: '07.10',
      command: 'make build > build.log 2>&1',
      title: 'stdout + stderr',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Merging streams: 2>&1 or &> to capture both outputs and errors in chronological order',
      badges: ['Streams', 'Merging'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-07-11',
      subChapterNumber: '07.11',
      command: 'test -f config.env && source config.env',
      title: 'Command Chains',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Sequential and conditional command execution based on exit status codes',
      badges: ['Chaining', 'FlowControl'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-07-12',
      subChapterNumber: '07.12',
      command: 'npm run test && npm run build',
      title: '&&',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Logical AND: executes second command ONLY IF the first command succeeded with exit code 0',
      badges: ['LogicalAND', 'ShortCircuit', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-07-13',
      subChapterNumber: '07.13',
      command: 'ping -c 1 8.8.8.8 || echo "Network offline!"',
      title: '||',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Logical OR: executes fallback command ONLY IF the primary command failed with non-zero exit code',
      badges: ['LogicalOR', 'Fallback'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-07-14',
      subChapterNumber: '07.14',
      command: 'clear; ls -la; df -h',
      title: ';',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Semicolon separator: executes commands sequentially regardless of success or failure',
      badges: ['Sequential', 'Separator'],
      difficulty: 'Beginner'
    })
  ]
};

// ============================================================================
// CHAPTER 08: SEARCHING AND TEXT PROCESSING (08.1 to 08.19)
// ============================================================================
export const CHAPTER_08: LinuxTopic = {
  id: 'ch-08',
  number: '08',
  title: 'Searching and Text Processing',
  iconName: 'Search',
  description: 'Locate files, match regex patterns, cut columns, transform streams, and master grep, find, sed, and awk.',
  concepts: [
    buildLinuxConcept({
      id: 'c-08-01',
      subChapterNumber: '08.1',
      command: 'grep "connection refused" /var/log/nginx/error.log',
      title: 'grep',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Global Regular Expression Print: scan files or streams and print matching lines',
      badges: ['Search', 'Regex', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-08-02',
      subChapterNumber: '08.2',
      command: 'grep -E "^[0-9]{1,3}\\.[0-9]{1,3}" access.log',
      title: 'grep Patterns',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Extended regular expressions (grep -E): anchors (^, $), character classes, and quantifiers',
      badges: ['Regex', 'Patterns'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-08-03',
      subChapterNumber: '08.3',
      command: 'grep -i "error" /var/log/syslog',
      title: 'grep -i',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Case-insensitive pattern matching: catches ERROR, Error, and error uniformly',
      badges: ['Search', 'Flags'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-08-04',
      subChapterNumber: '08.4',
      command: 'grep -rn "DB_PASSWORD" /etc/',
      title: 'grep -r',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Recursive directory scanning with line numbers (-n) across all nested files',
      badges: ['Search', 'Recursive', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-08-05',
      subChapterNumber: '08.5',
      command: 'find /var/log -type f',
      title: 'find',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Real-time directory tree crawler searching by filesystem metadata (name, size, timestamp, perms)',
      badges: ['Search', 'Filesystem', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-08-06',
      subChapterNumber: '08.6',
      command: 'find /etc -name "*.conf"',
      title: 'find by Name',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Match filenames using wildcards (-name) or case-insensitive patterns (-iname)',
      badges: ['find', 'Filenames'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-08-07',
      subChapterNumber: '08.7',
      command: 'find /var -type d',
      title: 'find by Type',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Filtering node types: regular files (-type f), directories (-type d), symlinks (-type l)',
      badges: ['find', 'Types'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-08-08',
      subChapterNumber: '08.8',
      command: 'find /var/log -size +500M',
      title: 'find by Size',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Locating disk-space hogs (+100M, +1G) for proactive storage cleanup',
      badges: ['Storage', 'Triage'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-08-09',
      subChapterNumber: '08.9',
      command: 'find /home -mtime -2',
      title: 'find by Time',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Locate recently modified (-mtime), accessed (-atime), or permission-changed files (-ctime)',
      badges: ['Timestamps', 'Audit'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-08-10',
      subChapterNumber: '08.10',
      command: 'locate nginx.conf',
      title: 'locate',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Ultra-fast database index search (mlocate/plocate) for instantaneous filename resolution',
      badges: ['Index', 'QuickSearch'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-08-11',
      subChapterNumber: '08.11',
      command: 'which python3',
      title: 'which',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Inspect environment $PATH and return the exact binary path executed by the shell',
      badges: ['PATH', 'Discovery'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-08-12',
      subChapterNumber: '08.12',
      command: 'whereis bash',
      title: 'whereis',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Locate binary executable, manual page sources, and configuration paths simultaneously',
      badges: ['Discovery', 'Binaries'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-08-13',
      subChapterNumber: '08.13',
      command: 'sort -n -r numbers.txt',
      title: 'sort',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Sort lines alphabetically, numerically (-n), or in reverse order (-r)',
      badges: ['Sorting', 'Text'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-08-14',
      subChapterNumber: '08.14',
      command: 'sort list.txt | uniq -c',
      title: 'uniq',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Collapse or count adjacent duplicate lines (requires input to be pre-sorted)',
      badges: ['DeDuplication', 'Text'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-08-15',
      subChapterNumber: '08.15',
      command: 'cut -d: -f1,7 /etc/passwd',
      title: 'cut',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Extract specific columnar fields based on delimiter characters (-d) or byte positions',
      badges: ['Extraction', 'Columns'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-08-16',
      subChapterNumber: '08.16',
      command: 'cat text.txt | tr "[:lower:]" "[:upper:]"',
      title: 'tr',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Translate, squeeze, or delete characters from standard input streams',
      badges: ['Transformation', 'Streams'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-08-17',
      subChapterNumber: '08.17',
      command: 'sed -i "s/DEBUG=true/DEBUG=false/g" config.env',
      title: 'sed',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Stream Editor: perform programmatic in-place find-and-replace transformations on text',
      badges: ['sed', 'Automation', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-08-18',
      subChapterNumber: '08.18',
      command: 'awk -F: \'{print $1 " -> " $6}\' /etc/passwd',
      title: 'awk',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Turing-complete columnar data processing language for log reports and arithmetic transformations',
      badges: ['awk', 'Scripting', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-08-19',
      subChapterNumber: '08.19',
      command: 'find /tmp -name "*.tmp" | xargs rm',
      title: 'xargs',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Convert standard input stream lines into argument lists for commands with parallel execution (-P)',
      badges: ['xargs', 'Pipelines', 'Core'],
      difficulty: 'Intermediate'
    })
  ]
};

// ============================================================================
// CHAPTER 09: USERS AND GROUPS (09.1 to 09.17)
// ============================================================================
export const CHAPTER_09: LinuxTopic = {
  id: 'ch-09',
  number: '09',
  title: 'Users and Groups',
  iconName: 'Users',
  description: 'Understand multi-tenant Linux security: root, normal users, UIDs, GIDs, /etc/passwd, shadow hashes, and user management.',
  concepts: [
    buildLinuxConcept({
      id: 'c-09-01',
      subChapterNumber: '09.1',
      command: 'id',
      title: 'Linux Users',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Multi-tenant security boundaries identified by unique integer User IDs (UID)',
      badges: ['Users', 'Security', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-09-02',
      subChapterNumber: '09.2',
      command: 'sudo -i',
      title: 'root User',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'UID 0 superuser: unrestricted hardware and system access with absolute authority',
      badges: ['Root', 'Superuser', 'UID0'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-09-03',
      subChapterNumber: '09.3',
      command: 'id $USER',
      title: 'Normal Users',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Unprivileged accounts (UID >= 1000) restricted to personal files and authorized permissions',
      badges: ['Users', 'LeastPrivilege'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-09-04',
      subChapterNumber: '09.4',
      command: 'cat /etc/passwd',
      title: '/etc/passwd',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'World-readable colon-separated database of username, UID, primary GID, home directory, and default shell',
      badges: ['Files', 'Database', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-09-05',
      subChapterNumber: '09.5',
      command: 'sudo head -n 5 /etc/shadow',
      title: '/etc/shadow',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Restricted root-only database storing salted password hashes (SHA-512/yescrypt) and expiration policies',
      badges: ['Security', 'Passwords', 'Hashes'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-09-06',
      subChapterNumber: '09.6',
      command: 'cat /etc/group',
      title: '/etc/group',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'System database defining group names, GIDs, and comma-separated member usernames',
      badges: ['Groups', 'Database'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-09-07',
      subChapterNumber: '09.7',
      command: 'sudo useradd -m -s /bin/bash developer',
      title: 'useradd',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Low-level standard POSIX system utility for programmatic account creation in scripts',
      badges: ['UserManagement', 'Admin'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-09-08',
      subChapterNumber: '09.8',
      command: 'sudo adduser deployer',
      title: 'adduser',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Interactive friendly Perl wrapper (Debian/Ubuntu) creating home directory and prompting for password',
      badges: ['Debian', 'Interactive'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-09-09',
      subChapterNumber: '09.9',
      command: 'sudo usermod -aG docker,sudo developer',
      title: 'usermod',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Modify existing user attributes: append supplementary groups (-aG), change shell (-s), or lock accounts (-L)',
      badges: ['Admin', 'Groups', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-09-10',
      subChapterNumber: '09.10',
      command: 'sudo passwd developer',
      title: 'passwd',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'SUID binary updating user credentials and recalculating cryptographic hashes in /etc/shadow',
      badges: ['Security', 'Passwords'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-09-11',
      subChapterNumber: '09.11',
      command: 'sudo userdel -r developer',
      title: 'userdel',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Remove user accounts from /etc/passwd with optional home directory purging (-r)',
      badges: ['Admin', 'Cleanup'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-09-12',
      subChapterNumber: '09.12',
      command: 'groups',
      title: 'Groups',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Access control collections allowing multiple users to share read/write/execute permissions to files',
      badges: ['Groups', 'Permissions'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-09-13',
      subChapterNumber: '09.13',
      command: 'sudo groupadd devops',
      title: 'groupadd',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Create a new group identifier entry in /etc/group with an automatically assigned GID',
      badges: ['Admin', 'Groups'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-09-14',
      subChapterNumber: '09.14',
      command: 'sudo groupmod -n engineering devops',
      title: 'groupmod',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Modify group attributes such as renaming (-n) or assigning a fixed GID (-g)',
      badges: ['Admin', 'Groups'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-09-15',
      subChapterNumber: '09.15',
      command: 'sudo groupdel devops',
      title: 'groupdel',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Delete a group from /etc/group (fails safely if group is currently the primary group of any user)',
      badges: ['Admin', 'Cleanup'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-09-16',
      subChapterNumber: '09.16',
      command: 'id -g -n',
      title: 'Primary Groups',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'The default group ownership automatically assigned to newly created files by a user',
      badges: ['Ownership', 'Groups'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-09-17',
      subChapterNumber: '09.17',
      command: 'id -G -n',
      title: 'Supplementary Groups',
      topicId: 'ch-09',
      topicNumber: '09',
      topicTitle: 'Users and Groups',
      subtitle: 'Secondary group memberships granting additional access rights (sudo, docker, adm)',
      badges: ['AccessControl', 'Groups'],
      difficulty: 'Intermediate'
    })
  ]
};

// ============================================================================
// CHAPTER 10: FILE PERMISSIONS (10.1 to 10.16)
// ============================================================================
export const CHAPTER_10: LinuxTopic = {
  id: 'ch-10',
  number: '10',
  title: 'File Permissions',
  iconName: 'ShieldCheck',
  description: 'Control read, write, execute rights for User, Group, and Others using octal and symbolic chmod, chown, and special bits.',
  concepts: [
    buildLinuxConcept({
      id: 'c-10-01',
      subChapterNumber: '10.1',
      command: 'ls -l /etc/shadow',
      title: 'Why Permissions Exist',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Preventing unauthorized access, data tampering, and rogue program execution in multi-user systems',
      badges: ['Security', 'Foundations', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-10-02',
      subChapterNumber: '10.2',
      command: 'cat document.txt',
      title: 'Read Permission',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Read (r / 4): permits reading file bytes; on directories, allows listing folder entries with ls',
      badges: ['Permissions', 'Read'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-10-03',
      subChapterNumber: '10.3',
      command: 'echo "data" >> document.txt',
      title: 'Write Permission',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Write (w / 2): permits modifying file contents; on directories, allows creating/deleting files inside',
      badges: ['Permissions', 'Write'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-10-04',
      subChapterNumber: '10.4',
      command: './script.sh',
      title: 'Execute Permission',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Execute (x / 1): permits launching binaries/scripts; on directories, allows cd traversals',
      badges: ['Permissions', 'Execute'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-10-05',
      subChapterNumber: '10.5',
      command: 'stat -c "%A %U %G" script.sh',
      title: 'User / Group / Others',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'The 3-tier security matrix: Owner (u), Group members (g), and world Everyone else (o)',
      badges: ['Matrix', 'Security', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-10-06',
      subChapterNumber: '10.6',
      command: 'chmod 755 deploy.sh',
      title: 'chmod',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Change Mode: modify file and directory access permission bits',
      badges: ['Permissions', 'Core'],
      difficulty: 'Beginner',
      beforeAfter: {
        before: '-rw-r--r-- 1 forge forge 184 Sep 29 deploy.sh',
        after: '-rwxr-xr-x 1 forge forge 184 Sep 29 deploy.sh',
        explanation: 'chmod 755 added execute bit (x) for owner, group, and others, making script.sh runnable.'
      }
    }),
    buildLinuxConcept({
      id: 'c-10-07',
      subChapterNumber: '10.7',
      command: 'chmod 644 config.json',
      title: 'Numeric Permissions',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Octal math: 4 (read) + 2 (write) + 1 (execute). E.g., 755, 644, 700, 600',
      badges: ['Octal', 'Math', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-10-08',
      subChapterNumber: '10.8',
      command: 'chmod u+x,g-w,o=r file.txt',
      title: 'Symbolic Permissions',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Target + Operator + Mode syntax: u/g/o/a with +/-/= and r/w/x for surgical updates',
      badges: ['Symbolic', 'Syntax'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-10-09',
      subChapterNumber: '10.9',
      command: 'sudo chown -R www-data:www-data /var/www/html',
      title: 'chown',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Change Owner: assign user and group ownership of files and directory trees',
      badges: ['Ownership', 'Admin', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-10-10',
      subChapterNumber: '10.10',
      command: 'chgrp developers shared_doc.txt',
      title: 'chgrp',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Change Group: update the group ownership attribute of files without altering owner',
      badges: ['Ownership', 'Groups'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-10-11',
      subChapterNumber: '10.11',
      command: 'umask',
      title: 'umask',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'User Mask: subtraction filter determining default permissions for newly created files and folders',
      badges: ['Security', 'umask'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-10-12',
      subChapterNumber: '10.12',
      command: 'ls -l /usr/bin/passwd /tmp',
      title: 'Special Permissions',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Advanced privilege flags: SUID (4000), SGID (2000), and Sticky Bit (1000)',
      badges: ['SpecialBits', 'Security'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-10-13',
      subChapterNumber: '10.13',
      command: 'ls -l /usr/bin/sudo',
      title: 'SUID',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Set User ID (rwsr-xr-x): binary executes with privileges of the file owner (e.g. root)',
      badges: ['SUID', 'Security', 'Ring0'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-10-14',
      subChapterNumber: '10.14',
      command: 'chmod g+s /var/shared_folder',
      title: 'SGID',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Set Group ID: newly created files inherit the parent directory group ownership automatically',
      badges: ['SGID', 'Collaboration'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-10-15',
      subChapterNumber: '10.15',
      command: 'chmod +t /shared_scratch',
      title: 'Sticky Bit',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Restricted deletion flag (drwxrwxrwt): only file creator or root can delete files in shared directories',
      badges: ['StickyBit', 'Temporary'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-10-16',
      subChapterNumber: '10.16',
      command: 'ls -ld /var/www && namei -l /var/www/index.html',
      title: 'Permission Troubleshooting',
      topicId: 'ch-10',
      topicNumber: '10',
      topicTitle: 'File Permissions',
      subtitle: 'Solving "Permission Denied": parent directory traversal (execute bit), SELinux contexts, and umask',
      badges: ['Troubleshooting', 'Triage', 'Core'],
      difficulty: 'Intermediate'
    })
  ]
};

export const PACK_02_CHAPTERS: LinuxTopic[] = [
  CHAPTER_06,
  CHAPTER_07,
  CHAPTER_08,
  CHAPTER_09,
  CHAPTER_10,
];
