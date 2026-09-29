import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 08: SEARCHING AND TEXT PROCESSING (08.1 to 08.19)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_08: LinuxTopic = {
  id: 'ch-08',
  number: '08',
  title: 'Searching and Text Processing',
  iconName: 'Search',
  description: 'Search files and text streams with grep, find, sort, uniq, cut, tr, sed, awk, and xargs.',
  concepts: [
    buildLinuxConcept({
      id: 'c-08-01',
      subChapterNumber: '08.1',
      command: 'grep "FATAL" /var/log/syslog',
      title: 'grep',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Global Regular Expression Print: the fundamental text pattern matching engine of Linux',
      badges: ['Search', 'Regex', 'Core'],
      difficulty: 'Beginner',
      quote: 'grep was written by Ken Thompson overnight to search text files; 50 years later, it is still the king of search.',
      whatIsIt: 'grep (Global Regular Expression Print) searches files or standard input for lines matching a specified pattern and prints the matching lines to standard output. It is powered by fast Boyer-Moore and DFA regular expression search algorithms, allowing it to scan multi-gigabyte log files in seconds.',
      inSimpleWords: 'Think of grep as the "Ctrl+F" search box of the command line. You give it a word or pattern and a file, and it instantly shows every line that contains that word.',
      whyDoYouNeedIt: 'Linux servers store all system logs, configs, and metrics as text. grep is the tool you use to locate errors, filter IPs, find usernames, and audit system states.',
      realWorldScenario: 'An application crashes. The log file has 2,000,000 lines. Typing "grep \'Exception\' app.log" filters the 2,000,000 lines down to the exact 4 lines where the application threw an error.',
      realWorldAnalogy: 'Using a metal detector on a beach. It ignores all the sand (irrelevant lines) and beeps only when it finds coins (matching pattern).',
      withoutVsWith: {
        without: {
          title: 'Searching Text Without grep',
          items: ['Manually scrolling through millions of log lines in a text editor', 'Editors freezing or crashing on 5GB server log files', 'Inability to automate log error detection in scripts'],
          outcome: 'Hours of wasted time, eye strain, and missed production anomalies.'
        },
        with: {
          title: 'Searching Text With grep Mastery',
          items: ['Instant regex pattern matching across thousands of files simultaneously', 'Streaming directly through pipes without disk memory footprint', 'Returning exit code 0 on match and 1 on no-match for clean script logic'],
          outcome: 'Lightning-fast troubleshooting and automated log monitoring.'
        }
      },
      blockDiagram: {
        title: 'grep Regular Expression Processing Engine',
        subtitle: 'Boyer-Moore DFA pattern matching loop:',
        nodes: [
          { id: 'input', label: 'Input Text Stream', simpleDef: 'File or stdin stream', techDef: 'read(fd, buffer, 32768)', badge: 'Input', color: '#38bdf8' },
          { id: 'dfa', label: 'Regex Match Engine', simpleDef: 'DFA state machine evaluating regex', techDef: 'Deterministic Finite Automaton bytecode', badge: 'Regex', color: '#a855f7' },
          { id: 'filter', label: 'Line Match Filter', simpleDef: 'Selects matching lines', techDef: 'Extracts matching line between \\n boundaries', badge: 'Filter', color: '#10b981' },
          { id: 'stdout', label: 'Colorized stdout', simpleDef: 'Prints matching line with colored highlights', techDef: 'Writes to stdout (exit status 0)', badge: 'Output', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'DFA (Deterministic Finite Automaton)', simple: 'The computer math algorithm making grep search text at gigabytes per second.', technical: 'State machine executing in O(N) linear time relative to input length.' },
        { term: 'Exit Code 0 vs 1', simple: 'grep returns 0 if it found a match, and 1 if no match was found.', technical: 'POSIX status allowing "if grep -q pattern file; then ..." conditional scripting.' }
      ],
      syntaxCode: 'grep [OPTIONS] PATTERN [FILE...]',
      syntaxTokens: [
        { token: 'grep', role: 'command', explanation: 'Global regular expression print' },
        { token: '"FATAL"', role: 'argument', explanation: 'Target search pattern or regular expression' },
        { token: '/var/log/syslog', role: 'path', explanation: 'File to search' }
      ],
      variations: [
        { syntax: 'grep -v "DEBUG" app.log', title: 'Invert Match', whatItDoes: 'Prints all lines that DO NOT match pattern', whenToUse: 'Filtering out noisy debug messages' },
        { syntax: 'grep -c "ERROR" app.log', title: 'Count Matches Only', whatItDoes: 'Outputs the integer count of matching lines', whenToUse: 'Counting error frequencies' }
      ],
      beforeAfter: {
        before: '$ grep "kernel: Out of memory" /var/log/syslog\n[Scanning log entries...]',
        after: 'Sep 28 10:42:15 prod kernel: Out of memory: Kill process 18204 (java)',
        explanation: 'Instantly pinpointed the exact second the Linux kernel OOM killer terminated the Java process.'
      },
      expectedOutput: 'kernel: Out of memory: Kill process',
      whatChanges: ['Reads file stream into memory.'],
      whatDoesNotChange: ['Target files are completely untouched.'],
      safeRecovery: '100% safe read-only tool.',
      commonMistakes: [
        { mistake: 'Forgetting to quote patterns containing spaces (e.g. grep Out of memory file.log)', whyItHappens: 'Grep treats "of" and "memory" as filenames to search!', howToFix: 'Always wrap multi-word patterns in quotes: grep "Out of memory" file.log.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-02',
      subChapterNumber: '08.2',
      command: 'grep -E "^[0-9]{1,3}\\.[0-9]{1,3}" access.log',
      title: 'grep Patterns',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Basic vs Extended Regular Expressions (ERE) with anchors (^, $), quantifiers, and classes',
      badges: ['Regex', 'Patterns', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Anchors turn loose guesses into surgical strikes: ^ locks to the start of a line; $ locks to the end.',
      whatIsIt: 'grep patterns utilize Regular Expressions (regex). Basic Regular Expressions (BRE) support anchors ("^" for line start, "$" for line end) and single characters. Extended Regular Expressions (ERE, enabled with "-E" or "egrep") add modern quantifiers ("+", "?", "{n,m}") and alternation ("|") without ugly backslash escaping.',
      inSimpleWords: 'Searching for "error" finds the word anywhere on the line. Searching for "^error" only finds lines that START with error. Searching for "failed$" only finds lines that END with failed.',
      whyDoYouNeedIt: 'Real log files have noise. Using anchors and regex classes lets you surgically match IP addresses, UUIDs, HTTP status codes, and email addresses with zero false positives.',
      realWorldScenario: 'You want to find all 500-series server errors in an Nginx log. You run: "grep -E \'HTTP/1\\.[01]" 5[0-9]{2}\' access.log". It matches 500, 502, 503, and 504 errors while ignoring lines containing the number 500 elsewhere.',
      realWorldAnalogy: 'Specifying that a license plate must start with two letters and end with four numbers, rather than just containing numbers.',
      terms: [
        { term: 'Line Anchor (^ and $)', simple: '^ means start of line; $ means end of line.', technical: 'Zero-width assertions matching beginning of buffer and newline boundaries.' },
        { term: 'ERE (-E / egrep)', simple: 'Extended regular expressions supporting +, ?, |, and () without escaping.', technical: 'POSIX Extended Regular Expression syntax.' }
      ],
      syntaxCode: 'grep -E "PATTERN" [FILE]',
      syntaxTokens: [
        { token: 'grep', role: 'command', explanation: 'Pattern search' },
        { token: '-E', role: 'flag', explanation: 'Interpret pattern as Extended Regular Expression (ERE)' },
        { token: '"^[0-9]"', role: 'argument', explanation: 'Regex pattern matching lines beginning with a digit' }
      ],
      variations: [
        { syntax: 'grep "^#" /etc/ssh/sshd_config', title: 'Find Commented Lines', whatItDoes: 'Matches lines starting with a hash symbol', whenToUse: 'Auditing configuration comments' },
        { syntax: 'grep -v "^#" /etc/ssh/sshd_config | grep -v "^$"', title: 'Strip Comments & Blanks', whatItDoes: 'Displays only active, non-empty configuration directives', whenToUse: 'Reading clean configuration files' }
      ],
      beforeAfter: {
        before: '$ grep "^Port" /etc/ssh/sshd_config\n[Searching for active Port configuration...]',
        after: 'Port 2222',
        explanation: 'Matched only the active configuration line starting with "Port", ignoring "#Port 22" comments.'
      },
      expectedOutput: 'Port 2222',
      whatChanges: ['Reads file stream.'],
      whatDoesNotChange: ['Files remain untouched.'],
      safeRecovery: '100% safe read-only operation.',
      commonMistakes: [
        { mistake: 'Using +, ?, or | without the -E flag', whyItHappens: 'In standard BRE grep, + and ? are treated as literal characters unless escaped or -E is used.', howToFix: 'Always add "-E" whenever using modern regex quantifiers.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-03',
      subChapterNumber: '08.3',
      command: 'grep -i "error" /var/log/syslog',
      title: 'grep -i',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Case-insensitive matching: finds "Error", "ERROR", and "error" simultaneously',
      badges: ['Search', 'Flags', 'Core'],
      difficulty: 'Beginner',
      quote: 'Log files are inconsistent; grep -i ensures you never miss a critical error due to capitalization.',
      whatIsIt: 'The "-i" (or "--ignore-case") option instructs grep to treat uppercase and lowercase ASCII characters as identical. Searching for "error" with -i matches "error", "Error", "ERROR", "ErRoR", and any other capitalization permutation.',
      inSimpleWords: 'By default, Linux is strictly case-sensitive. If you search for "error", it will completely ignore "ERROR". Adding "-i" tells grep to ignore capitalization so you find everything.',
      whyDoYouNeedIt: 'Different software libraries log messages differently: Java logs "ERROR", Python logs "Error", and syslog records "error". grep -i catches all of them in one search.',
      realWorldScenario: 'You are investigating an authentication failure. The log might say "Failed password", "FAILED PASSWORD", or "failed password". Typing "grep -i \'failed password\' /var/log/auth.log" catches all variations.',
      realWorldAnalogy: 'Searching Google for "linux": it returns results whether websites wrote "Linux", "LINUX", or "linux".',
      terms: [
        { term: 'Case Folding', simple: 'Normalizing uppercase and lowercase letters to match identically.', technical: 'Character set case-insensitive mapping in POSIX locale.' }
      ],
      syntaxCode: 'grep -i "PATTERN" [FILE]',
      syntaxTokens: [
        { token: 'grep', role: 'command', explanation: 'Pattern search' },
        { token: '-i', role: 'flag', explanation: 'Ignore case distinctions in patterns and input data' },
        { token: '"error"', role: 'argument', explanation: 'Case-insensitive search word' }
      ],
      variations: [
        { syntax: 'grep -in "warning" app.log', title: 'Case-Insensitive with Line Numbers', whatItDoes: 'Matches case-insensitively and displays line numbers (-n)', whenToUse: 'When locating code warnings' }
      ],
      beforeAfter: {
        before: '$ grep "error" app.log\n[Finds 0 matches because log uses "ERROR"]\n$ grep -i "error" app.log',
        after: '[ERROR] Database connection lost\n[Error] Retrying in 5s...',
        explanation: 'grep -i uncovered all error lines regardless of developer casing choices.'
      },
      expectedOutput: '[ERROR] Database connection lost',
      whatChanges: ['Reads stream and folds character case.'],
      whatDoesNotChange: ['Files remain untouched.'],
      safeRecovery: '100% safe read-only operation.',
      commonMistakes: [
        { mistake: 'Forgetting that -i has a small performance penalty on 100GB files', whyItHappens: 'Case folding requires extra CPU byte comparisons.', howToFix: 'If searching exact known strings in huge datasets, omit -i for maximum raw speed.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-04',
      subChapterNumber: '08.4',
      command: 'grep -rn "DB_PASSWORD" /var/www/project/',
      title: 'grep -r',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Recursive tree traversal: search through thousands of nested files and directories',
      badges: ['Search', 'Recursive', 'Core'],
      difficulty: 'Beginner',
      quote: 'grep -rn is the senior engineer\'s instant code search engine: it searches an entire codebase in seconds.',
      whatIsIt: 'The "-r" (or "-R") option instructs grep to traverse directory trees recursively, descending into all subordinate folders and scanning every file encountered. Combined with "-n" (show line numbers) and "-I" (ignore binary files), it turns grep into a high-performance codebase and configuration search tool.',
      inSimpleWords: 'Instead of searching inside one single file, "grep -r" searches inside an entire project folder and all of its subfolders, telling you which file and line number matched.',
      whyDoYouNeedIt: 'You need grep -r to find where a configuration variable is defined in a codebase, find which virtual host serves a domain in /etc/nginx, or locate hardcoded secrets.',
      realWorldScenario: 'You need to find which Nginx configuration file is handling the domain "api.company.com". You type: "sudo grep -rn \'api.company.com\' /etc/nginx/". Instantly, it outputs: "/etc/nginx/sites-available/api.conf:4: server_name api.company.com;".',
      realWorldAnalogy: 'Searching through every book on every shelf in an entire library room for a specific quote.',
      terms: [
        { term: 'Recursive Traversal', simple: 'Searching a folder, its subfolders, and all files all the way down.', technical: 'Traversing directory inodes via ftw/nftw/openat across filesystem tree.' },
        { term: 'Ignore Binary (-I)', simple: 'Tells grep to skip compiled images and executables.', technical: 'Suppresses matching in files identified as non-text.' }
      ],
      syntaxCode: 'grep -rn "PATTERN" [DIRECTORY]',
      syntaxTokens: [
        { token: 'grep', role: 'command', explanation: 'Pattern search' },
        { token: '-rn', role: 'flag', explanation: 'Recursive directory descent (-r) and output line numbers (-n)' },
        { token: '"DB_PASSWORD"', role: 'argument', explanation: 'Search string' },
        { token: '/var/www/project/', role: 'path', explanation: 'Target directory root' }
      ],
      variations: [
        { syntax: 'grep -rnI --exclude-dir={node_modules,.git} "TODO" .', title: 'Clean Codebase Search', whatItDoes: 'Excludes heavy vendor and git directories, skips binary files', whenToUse: 'Searching software development projects' },
        { syntax: 'grep -rl "deprecated_func" src/', title: 'List Matching Filenames Only', whatItDoes: 'Prints only the names of matching files (-l) without printing lines', whenToUse: 'When piping files into refactoring tools' }
      ],
      beforeAfter: {
        before: '$ grep -rn "listen 443" /etc/nginx/\n[Scanning all configuration files...]',
        after: '/etc/nginx/sites-enabled/default:25:    listen 443 ssl default_server;\n/etc/nginx/sites-enabled/api:12:    listen 443 ssl;',
        explanation: 'Pinpoints exact files and line numbers where port 443 is configured.'
      },
      expectedOutput: '/etc/nginx/sites-enabled/default:25: listen 443',
      whatChanges: ['Recursively reads filesystem tree.'],
      whatDoesNotChange: ['Files remain intact.'],
      safeRecovery: 'Safe read-only operation. Press Ctrl+C if search traverses huge directories.',
      commonMistakes: [
        { mistake: 'Running "grep -r" in a directory with node_modules or large virtual environments', whyItHappens: 'Searching through 100,000 vendor files takes minutes.', howToFix: 'Use "--exclude-dir=node_modules" or use modern tools like ripgrep (rg).' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-05',
      subChapterNumber: '08.5',
      command: 'find /var/log -type f',
      title: 'find',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'The master filesystem tree search engine: query by name, type, size, time, and permissions',
      badges: ['Search', 'Filesystem', 'Core'],
      difficulty: 'Beginner',
      quote: 'grep searches INSIDE file contents; find searches FOR files across the filesystem directory tree.',
      whatIsIt: 'find is the canonical Unix utility for searching directory hierarchies for files and directories matching specific metadata criteria. Unlike locate (which queries a stale database), find queries the live VFS filesystem directly in real time, filtering by name (-name), type (-type), size (-size), modification time (-mtime), owner (-user), and permissions (-perm).',
      inSimpleWords: 'If grep is looking for a sentence inside a book, "find" is looking for the book itself in the library. You can find files created in the last 24 hours, files larger than 100MB, or files owned by a specific user.',
      whyDoYouNeedIt: 'You need find to discover lost files, prune old logs (e.g. delete logs older than 30 days), audit insecure world-writable files, and automate batch operations.',
      realWorldScenario: 'A server alert fires: disk usage is 98%. You need to find all files larger than 500MB on the entire system. You run: "sudo find / -type f -size +500M -exec ls -lh {} + 2> /dev/null". It instantly lists the 3 giant runaway database dump files filling the drive.',
      realWorldAnalogy: 'Searching your house for "all shoes that are black, size 10, and purchased within the last month".',
      terms: [
        { term: 'Predicate', simple: 'A search condition in find (e.g. -name, -size, -type).', technical: 'Evaluation expression returning boolean true/false for each visited inode.' },
        { term: '-exec', simple: 'Tells find to run another command on every file it discovers.', technical: 'Invokes fork/execve for discovered paths, substituting "{}" with filename.' }
      ],
      syntaxCode: 'find [START_PATH] [PREDICATES...]',
      syntaxTokens: [
        { token: 'find', role: 'command', explanation: 'Filesystem search engine' },
        { token: '/var/log', role: 'path', explanation: 'Directory root where search begins' },
        { token: '-type f', role: 'flag', explanation: 'Predicate matching regular files only (excluding directories and sockets)' }
      ],
      variations: [
        { syntax: 'find . -maxdepth 2 -type d', title: 'Limit Search Depth', whatItDoes: 'Searches only down to 2 directory levels', whenToUse: 'Restricting search scope' },
        { syntax: 'find /tmp -type f -delete', title: 'Find and Delete', whatItDoes: 'Atomically deletes matching files directly via unlinkat()', whenToUse: 'Automated cleanup cron jobs' }
      ],
      beforeAfter: {
        before: '$ find . -name "*.conf"\n[Traversing directory tree...]',
        after: './app.conf\n./config/db.conf\n./modules/auth.conf',
        explanation: 'Discovered all configuration files across all nested subdirectories.'
      },
      expectedOutput: './app.conf\n./config/db.conf',
      whatChanges: ['Traverses directory inodes in real time.'],
      whatDoesNotChange: ['Files remain intact unless -delete or -exec rm is supplied.'],
      safeRecovery: 'Never run -delete on an untested find command! Always run find WITHOUT -delete first to see what matches.',
      commonMistakes: [
        { mistake: 'Forgetting to quote wildcards in find (e.g. find . -name *.log)', whyItHappens: 'Bash expands *.log before find runs, breaking the command if multiple files exist!', howToFix: 'Always wrap wildcards in quotes: find . -name "*.log".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-06',
      subChapterNumber: '08.6',
      command: 'find /etc -name "nginx.conf"',
      title: 'find by Name',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Searching for files and directories using exact names, wildcards, and case-insensitive -iname',
      badges: ['Find', 'Search', 'Core'],
      difficulty: 'Beginner',
      quote: 'Always quote your -name pattern so the shell doesn\'t expand wildcards before find gets them.',
      whatIsIt: 'The "-name" predicate tests each filename against a shell glob pattern (*, ?, []). Matching is case-sensitive by default; using "-iname" enables case-insensitive matching (finding both "photo.JPG" and "photo.jpg").',
      inSimpleWords: 'Use "-name" when you know the name (or part of the name) of the file you are looking for. Wrapping the name in quotes with asterisks ("*nginx*") finds any file with "nginx" in its name.',
      whyDoYouNeedIt: 'Files are often stored in unexpected nested folders across the Linux filesystem. find by Name locates them in seconds.',
      realWorldScenario: 'You are deploying an SSL certificate and cannot remember where the private key was stored. You type: "sudo find /etc -name \'*.key\'". It reveals "/etc/ssl/private/mysite.key" instantly.',
      realWorldAnalogy: 'Searching for a book in a library by title.',
      terms: [
        { term: '-name', simple: 'Case-sensitive filename matching.', technical: 'Matches basename of dentry against fnmatch() pattern.' },
        { term: '-iname', simple: 'Case-insensitive filename matching.', technical: 'Case-folded basename pattern comparison.' }
      ],
      syntaxCode: 'find [PATH] -name "PATTERN"',
      syntaxTokens: [
        { token: 'find', role: 'command', explanation: 'Filesystem search' },
        { token: '/etc', role: 'path', explanation: 'Starting search directory' },
        { token: '-name "nginx.conf"', role: 'argument', explanation: 'Target filename pattern' }
      ],
      variations: [
        { syntax: 'find . -iname "*.png"', title: 'Case-Insensitive Image Search', whatItDoes: 'Matches .png, .PNG, .Png files', whenToUse: 'When handling user-uploaded assets' },
        { syntax: 'find /var/www -name "*.backup*"', title: 'Find Leaked Backups', whatItDoes: 'Finds dangerous backup files left in web roots', whenToUse: 'Web server security auditing' }
      ],
      beforeAfter: {
        before: '$ find /etc -name "sshd_config"\n[Searching /etc...]',
        after: '/etc/ssh/sshd_config',
        explanation: 'Located exact canonical path of the SSH daemon configuration file.'
      },
      expectedOutput: '/etc/ssh/sshd_config',
      whatChanges: ['Reads directory inodes.'],
      whatDoesNotChange: ['Files remain intact.'],
      safeRecovery: '100% safe read-only operation.',
      commonMistakes: [
        { mistake: 'Omitting quotes around wildcard patterns (e.g. find . -name *.txt)', whyItHappens: 'If more than one .txt file exists in current folder, Bash errors with "paths must precede expression".', howToFix: 'Always quote the pattern: find . -name "*.txt".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-07',
      subChapterNumber: '08.7',
      command: 'find /var/log -type f -name "*.log"',
      title: 'find by Type',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Filtering by POSIX file types: regular files (f), directories (d), symlinks (l), sockets (s)',
      badges: ['Find', 'POSIX', 'Inodes'],
      difficulty: 'Beginner',
      quote: 'Linux treats directories, symlinks, and sockets as files; -type isolates exactly the object type you want.',
      whatIsIt: 'The "-type" predicate filters search results by their fundamental filesystem object type: "f" for regular files, "d" for directories, "l" for symbolic links, "s" for Unix domain sockets, "p" for named pipes (FIFOs), "b" for block devices, and "c" for character devices.',
      inSimpleWords: 'If you only want folders, add "-type d". If you only want actual files, add "-type f". If you want shortcuts, add "-type l". It prevents directories from cluttering your file searches.',
      whyDoYouNeedIt: 'When changing permissions (e.g. setting files to 644 and directories to 755), you must separate directories from files using "-type d" and "-type f".',
      realWorldScenario: 'You are deploying a WordPress or Laravel website. Security standards require directories to be 755 (searchable) and files to be 644 (not executable). You run: "find /var/www -type d -exec chmod 755 {} +" and "find /var/www -type f -exec chmod 644 {} +".',
      realWorldAnalogy: 'Sorting a warehouse by room type: identifying storage closets (directories) versus boxes inside them (files).',
      terms: [
        { term: '-type f', simple: 'Matches standard regular files only.', technical: 'Matches inode mode S_IFREG.' },
        { term: '-type d', simple: 'Matches directories only.', technical: 'Matches inode mode S_IFDIR.' },
        { term: '-type l', simple: 'Matches symbolic links only.', technical: 'Matches inode mode S_IFLNK.' }
      ],
      syntaxCode: 'find [PATH] -type [f|d|l|s|p|b|c]',
      syntaxTokens: [
        { token: 'find', role: 'command', explanation: 'Filesystem search' },
        { token: '/var/log', role: 'path', explanation: 'Starting search directory' },
        { token: '-type f', role: 'flag', explanation: 'Filter to regular files only' }
      ],
      variations: [
        { syntax: 'find /var/run -type s', title: 'Find Active Unix Sockets', whatItDoes: 'Discovers active IPC sockets (docker.sock, mysql.sock)', whenToUse: 'Auditing running daemon sockets' },
        { syntax: 'find . -type l', title: 'Find All Symlinks', whatItDoes: 'Lists all symbolic links in directory tree', whenToUse: 'When auditing link structures' }
      ],
      beforeAfter: {
        before: '$ find /tmp -maxdepth 1 -type s\n[Searching for active Unix domain sockets...]',
        after: '/tmp/ssh-Xx9182/agent.1420\n/tmp/tmux-1000/default',
        explanation: 'Surgically isolated running SSH and Tmux IPC domain sockets.'
      },
      expectedOutput: '/tmp/ssh-agent.sock',
      whatChanges: ['Reads inode types.'],
      whatDoesNotChange: ['Files remain intact.'],
      safeRecovery: '100% safe read-only operation.',
      commonMistakes: [
        { mistake: 'Running "chmod -R 644" on a website directory without using find -type', whyItHappens: 'Directories lose their execute bit (+x), making them inaccessible and crashing the website with 403 Forbidden!', howToFix: 'Always use "find -type d -exec chmod 755 {} +" to protect directory traverse permissions.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-08',
      subChapterNumber: '08.8',
      command: 'find /var -type f -size +100M',
      title: 'find by Size',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Hunting disk hogs and zero-byte files using size thresholds (+100M, -50k, 0)',
      badges: ['Storage', 'Triage', 'Core'],
      difficulty: 'Beginner',
      quote: 'When the server disk is 100% full, "find -size +100M" is the emergency flare that finds the culprit.',
      whatIsIt: 'The "-size" predicate filters files based on their storage footprint on disk. Thresholds use "+" for greater than, "-" for less than, and suffixes for units: "c" for bytes, "k" for Kilobytes, "M" for Megabytes, and "G" for Gigabytes. For example, "+100M" matches files strictly larger than 100 Megabytes.',
      inSimpleWords: 'It is a metal detector tuned to find giant files. When your hard drive runs out of space, typing "find / -size +1G" finds every single file bigger than 1 Gigabyte instantly.',
      whyDoYouNeedIt: 'Bloated uncompressed log files, accidental database core dumps, and runaway test recordings consume disk space invisibly. find by Size pinpoints them immediately.',
      realWorldScenario: 'An AWS EC2 server runs out of disk space and crashes MySQL. You run: "sudo find /var/log -type f -size +500M". It reveals a single 40GB runaway file "/var/log/mail.log" caused by a spam bot loop. Truncating it restores the database in 10 seconds.',
      realWorldAnalogy: 'Searching your house for all boxes weighing more than 50 pounds.',
      terms: [
        { term: 'Size Suffixes', simple: 'k = Kilobytes, M = Megabytes, G = Gigabytes, c = Bytes.', technical: 'Units calculated against 512-byte blocks or exact bytes via st_size.' },
        { term: 'Sparse File', simple: 'A file that appears huge but takes almost zero real disk blocks.', technical: 'File with unallocated hollow holes skipped during read.' }
      ],
      syntaxCode: 'find [PATH] -type f -size [+/-][SIZE][UNIT]',
      syntaxTokens: [
        { token: 'find', role: 'command', explanation: 'Filesystem search' },
        { token: '/var', role: 'path', explanation: 'Root of search' },
        { token: '-size +100M', role: 'flag', explanation: 'Filter files strictly larger than 100 Megabytes' }
      ],
      variations: [
        { syntax: 'find . -type f -size 0 -delete', title: 'Clean Empty Files', whatItDoes: 'Finds and deletes all 0-byte orphan placeholder files', whenToUse: 'Cleaning temporary scratch folders' },
        { syntax: 'find / -type f -size +1G -exec ls -lh {} + 2>/dev/null', title: 'Top Storage Hogs', whatItDoes: 'Lists all files over 1GB with human-readable sizes', whenToUse: 'Disk full triage' }
      ],
      beforeAfter: {
        before: '$ find /var/log -type f -size +50M\n[Scanning log sizes...]',
        after: '/var/log/journal/893fa/system.journal\n/var/log/nginx/access.log',
        explanation: 'Exposed the two specific log files consuming more than 50 Megabytes of storage.'
      },
      expectedOutput: '/var/log/nginx/access.log',
      whatChanges: ['Reads st_size inode attributes.'],
      whatDoesNotChange: ['Files remain intact.'],
      safeRecovery: '100% safe read-only operation.',
      commonMistakes: [
        { mistake: 'Forgetting the "+" sign (e.g. typing "-size 100M" instead of "+100M")', whyItHappens: '"100M" without plus or minus means EXACTLY 100 Megabytes; almost no file is exactly that size!', howToFix: 'Always include "+" for larger than ("+100M") or "-" for smaller than ("-100M").' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-09',
      subChapterNumber: '08.9',
      command: 'find /var/log -type f -mtime +30',
      title: 'find by Time',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Temporal queries: find files modified (-mtime), changed (-ctime), or accessed (-atime)',
      badges: ['Find', 'Timestamps', 'Maintenance'],
      difficulty: 'Intermediate',
      quote: 'find by time is the foundation of automated data lifecycle and retention policies.',
      whatIsIt: 'find evaluates file timestamps across three dimensions: Modification Time (-mtime: file content changed), Change Time (-ctime: inode metadata or permissions changed), and Access Time (-atime: file was read). Suffixes use days for -mtime/-ctime/-atime (e.g. "+30" = older than 30 days) or minutes for -mmin/-cmin/-amin (e.g. "-15" = modified within the last 15 minutes).',
      inSimpleWords: 'Want to know which files were changed today? Use "-mmin -60" (last 60 minutes). Want to delete old backup archives that are older than 90 days? Use "-mtime +90".',
      whyDoYouNeedIt: 'Automated server maintenance depends on time-based finding: cleaning old session files, rotating database dumps, and investigating hacked files modified during a security breach.',
      realWorldScenario: 'You are investigating an intrusion that occurred 30 minutes ago. You need to know which files on the server were created or modified during that attack window. You run: "sudo find /etc /var/www -type f -mmin -45". It immediately reveals a web-shell backdoor uploaded 20 minutes ago.',
      realWorldAnalogy: 'Searching your house security camera footage for any motion detected in the last 2 hours.',
      terms: [
        { term: '-mtime (Days)', simple: 'File content modification age in 24-hour periods.', technical: 'Compares (current_time - st_mtime) / 86400 against specified threshold.' },
        { term: '-mmin (Minutes)', simple: 'File content modification age in minutes.', technical: 'Compares (current_time - st_mtime) / 60 against threshold.' }
      ],
      syntaxCode: 'find [PATH] -type f -mtime [+/-][DAYS]',
      syntaxTokens: [
        { token: 'find', role: 'command', explanation: 'Filesystem search' },
        { token: '/var/log', role: 'path', explanation: 'Directory root' },
        { token: '-mtime +30', role: 'flag', explanation: 'Filter files modified more than 30 days ago' }
      ],
      variations: [
        { syntax: 'find /var/backups -name "*.tar.gz" -mtime +90 -delete', title: 'Automated 90-Day Retention Pruning', whatItDoes: 'Deletes backups older than 90 days automatically', whenToUse: 'Backup rotation cron jobs' },
        { syntax: 'find . -type f -mmin -10', title: 'Recently Modified Files', whatItDoes: 'Finds files modified in the last 10 minutes', whenToUse: 'Live debugging of file writers' }
      ],
      beforeAfter: {
        before: '$ find /var/log -name "*.gz" -mtime +60\n[Querying archive timestamps...]',
        after: '/var/log/syslog.4.gz\n/var/log/auth.log.5.gz',
        explanation: 'Identified compressed log archives older than 60 days ready for archival or deletion.'
      },
      expectedOutput: '/var/log/syslog.4.gz',
      whatChanges: ['Reads st_mtime from inodes.'],
      whatDoesNotChange: ['Files remain intact.'],
      safeRecovery: 'Always test without -delete first to verify which files match the time filter.',
      commonMistakes: [
        { mistake: 'Confusing "+30" (older than 30 days) with "-30" (newer than 30 days)', whyItHappens: 'Plus vs minus sign confusion.', howToFix: 'Remember: "+" means MORE than X days old; "-" means LESS than X days old (recent).' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-10',
      subChapterNumber: '08.10',
      command: 'locate nginx.conf',
      title: 'locate',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Sub-millisecond indexed file searching querying the mlocate / plocate database',
      badges: ['Search', 'Indexed', 'Fast'],
      difficulty: 'Beginner',
      quote: 'find walks the physical disk; locate queries a pre-indexed database at lightning speed.',
      whatIsIt: 'locate (provided by plocate or mlocate) performs instant sub-millisecond file searches by querying a pre-built indexed database (/var/lib/mlocate/mlocate.db or /var/lib/plocate/plocate.db) rather than walking the physical disk tree. The database is updated nightly via cron using the "updatedb" command.',
      inSimpleWords: 'Typing "find / -name file" can take 20 seconds because it scans every single folder on your hard drive. "locate file" takes 0.01 seconds because it looks up the name in an instant index, just like the Google search index.',
      whyDoYouNeedIt: 'When you need to quickly locate installed documentation, sample configurations, or binary paths on large systems without waiting for disk traversals.',
      realWorldScenario: 'You are setting up SSL and need the default OpenSSL configuration template. Typing "locate openssl.cnf" instantly outputs "/etc/ssl/openssl.cnf" and "/usr/lib/ssl/openssl.cnf" in 2 milliseconds.',
      realWorldAnalogy: 'Looking up a word in a book index at the back versus reading every page of the book from start to finish.',
      terms: [
        { term: 'updatedb', simple: 'The command that crawls the disk and refreshes the locate search index.', technical: 'Utility that scans mounted local filesystems and compiles an io_uring-compressed database.' }
      ],
      syntaxCode: 'locate [PATTERN]',
      syntaxTokens: [
        { token: 'locate', role: 'command', explanation: 'Find files by name via pre-indexed database' },
        { token: 'nginx.conf', role: 'argument', explanation: 'Target filename pattern' }
      ],
      variations: [
        { syntax: 'sudo updatedb', title: 'Refresh Search Database', whatItDoes: 'Crawls filesystems immediately to index newly created files', whenToUse: 'When searching for files created today' },
        { syntax: 'locate -i "readme.md"', title: 'Case-Insensitive Locate', whatItDoes: 'Matches README, Readme, and readme files', whenToUse: 'General documentation search' }
      ],
      beforeAfter: {
        before: '$ locate postgresql.conf\n[Querying plocate index... (0.003s)]',
        after: '/etc/postgresql/16/main/postgresql.conf\n/usr/share/postgresql/16/postgresql.conf.sample',
        explanation: 'Instant query returned canonical configuration paths with zero disk seek delay.'
      },
      expectedOutput: '/etc/postgresql/16/main/postgresql.conf',
      whatChanges: ['Reads index database file in /var/lib.'],
      whatDoesNotChange: ['Filesystem is unmodified.'],
      safeRecovery: '100% safe read-only tool.',
      commonMistakes: [
        { mistake: 'Creating a file 10 minutes ago and wondering why "locate" cannot find it', whyItHappens: 'locate uses a cached database updated once a day; newly created files are not in the index yet.', howToFix: 'Run "sudo updatedb" to refresh the index, or use "find".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-11',
      subChapterNumber: '08.11',
      command: 'which python3',
      title: 'which',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Locating the exact executable binary that the shell launches from $PATH',
      badges: ['CLI', 'Environment', 'Core'],
      difficulty: 'Beginner',
      quote: 'which answers the question: "When I type this command, what exact binary file on my disk executes?"',
      whatIsIt: 'which searches the colon-separated directory paths listed in your user\'s active "$PATH" environment variable in strict left-to-right order, printing the first matching executable binary path found. If the command does not exist in $PATH, it returns exit code 1.',
      inSimpleWords: 'When you type "python3", your computer might have three different versions installed (system Python, Anaconda, virtualenv). "which python3" tells you the exact full path of the one your terminal will run.',
      whyDoYouNeedIt: 'You need which to verify virtual environment activations, check binary paths for systemd service units, and debug "command not found" errors.',
      realWorldScenario: 'You install Node.js via NVM (Node Version Manager). You type "node -v" and see v16 instead of v20. You run "which node" and discover your shell is invoking "/usr/bin/node" (the old system node) instead of "~/.nvm/versions/node/v20/bin/node".',
      realWorldAnalogy: 'Calling "Doctor Smith" and seeing which specific doctor in the hospital directory answers the page.',
      terms: [
        { term: '$PATH Search', simple: 'The ordered list of folders Linux checks when you run a command.', technical: 'Colon-delimited list of directories traversed sequentially by the shell to resolve execve targets.' }
      ],
      syntaxCode: 'which [COMMAND_NAME]',
      syntaxTokens: [
        { token: 'which', role: 'command', explanation: 'Locate a command in $PATH' },
        { token: 'python3', role: 'argument', explanation: 'Command name to resolve' }
      ],
      variations: [
        { syntax: 'which -a node', title: 'Find All Matches in PATH', whatItDoes: 'Prints every matching binary found across all $PATH directories', whenToUse: 'When diagnosing duplicate package installs' }
      ],
      beforeAfter: {
        before: '$ which git\n[Searching $PATH directories...]',
        after: '/usr/bin/git',
        explanation: 'Confirms typing "git" launches the executable binary at /usr/bin/git.'
      },
      expectedOutput: '/usr/bin/git',
      whatChanges: ['Scans directories in $PATH.'],
      whatDoesNotChange: ['Files remain intact.'],
      safeRecovery: '100% safe read-only inspection.',
      commonMistakes: [
        { mistake: 'Running "which" on a shell builtin like "cd" and getting no output', whyItHappens: 'which only finds physical disk binaries; cd is built into Bash memory.', howToFix: 'Use "type cd" instead of "which cd" to inspect builtins.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-12',
      subChapterNumber: '08.12',
      command: 'whereis nginx',
      title: 'whereis',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Comprehensive package locator: finds binary executables, source files, and man pages at once',
      badges: ['CLI', 'Discovery', 'Core'],
      difficulty: 'Beginner',
      quote: 'whereis gives you the complete package trifecta: binary, configuration, and manual page.',
      whatIsIt: 'whereis locates the binary executable, source files, and manual page files for a specified command by scanning standard system directories (/bin, /sbin, /usr/bin, /usr/share/man, /etc). Unlike which (which only finds the first executable in $PATH), whereis finds all related artifacts.',
      inSimpleWords: 'If "which" only points to the program itself, "whereis" points to the program, its manual page, and its configuration folders in one clean output line.',
      whyDoYouNeedIt: 'When learning a new tool, running "whereis tool" instantly gives you where the binary is installed, where its configs live, and where its man page is located.',
      realWorldScenario: 'You are auditing an Nginx installation. You run "whereis nginx". It outputs: "nginx: /usr/sbin/nginx /etc/nginx /usr/share/nginx /usr/share/man/man8/nginx.8.gz". In one second, you know where the binary, configs, web root, and manuals are located.',
      realWorldAnalogy: 'A phone directory giving you a person\'s home address, office address, and phone number on one card.',
      terms: [
        { term: 'Standard System Directories', simple: 'The well-known FHS folders where Linux stores programs and manuals.', technical: 'Hardcoded standard system paths searched by whereis independent of user $PATH.' }
      ],
      syntaxCode: 'whereis [COMMAND]',
      syntaxTokens: [
        { token: 'whereis', role: 'command', explanation: 'Locate binary, source, and manual page files for a command' },
        { token: 'nginx', role: 'argument', explanation: 'Target program name' }
      ],
      variations: [
        { syntax: 'whereis -b nginx', title: 'Binary Path Only', whatItDoes: 'Restricts search to executable binaries only', whenToUse: 'When you only want the executable location' },
        { syntax: 'whereis -m nginx', title: 'Manual Pages Only', whatItDoes: 'Restricts search to man page paths', whenToUse: 'When auditing documentation paths' }
      ],
      beforeAfter: {
        before: '$ whereis tar\n[Scanning standard binary and manual directories...]',
        after: 'tar: /usr/bin/tar /etc/tar.conf /usr/share/man/man1/tar.1.gz',
        explanation: 'Outputs the binary location, config file, and manual page location in one output.'
      },
      expectedOutput: 'tar: /usr/bin/tar /usr/share/man/man1/tar.1.gz',
      whatChanges: ['Scans system directory indexes.'],
      whatDoesNotChange: ['System remains intact.'],
      safeRecovery: '100% safe read-only tool.',
      commonMistakes: [
        { mistake: 'Expecting whereis to find custom scripts in your home directory', whyItHappens: 'whereis only searches standard root system directories, not your personal $HOME.', howToFix: 'Use "which" or "find ~ -name script.sh".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-13',
      subChapterNumber: '08.13',
      command: 'sort -k2 -n -r scores.txt',
      title: 'sort',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Order text lines alphabetically, numerically, by specific columns, or in reverse',
      badges: ['Sorting', 'Text', 'Core'],
      difficulty: 'Beginner',
      quote: 'sort is the unsung backbone of Unix data pipelines: ordering text makes deduplication and searching instant.',
      whatIsIt: 'sort reads lines from files or standard input and outputs them in sorted order. It supports alphabetical sorting, numeric sorting (-n: ensuring 10 comes AFTER 2, unlike alphabetical where 10 comes before 2), reverse sorting (-r), human-readable metric size sorting (-h), and specific column/field sorting (-k).',
      inSimpleWords: 'Give sort a jumbled list of names, numbers, or dates, and it lines them up neatly in order. It is required before using "uniq" to count duplicate lines.',
      whyDoYouNeedIt: 'You need sort to rank web traffic (top IP addresses), organize database CSV exports, and find the largest files on a server.',
      realWorldScenario: 'You are auditing disk usage across user homes. You run "du -sh /home/* | sort -h -r | head -n 5". sort -h parses the human sizes (12G, 400M, 2K) and ranks the top 5 largest user workspaces at the top.',
      realWorldAnalogy: 'Sorting a deck of playing cards into numerical and suit order.',
      terms: [
        { term: 'Numeric Sort (-n)', simple: 'Sorts by mathematical value rather than alphabetical characters.', technical: 'Compares string prefixes as arithmetic numbers (e.g. 2 < 10).' },
        { term: 'Key Column (-k)', simple: 'Tells sort which column number to base the sorting on.', technical: 'Defines the sorting field boundary based on whitespace or -t delimiter.' }
      ],
      syntaxCode: 'sort [OPTIONS] [FILE...]',
      syntaxTokens: [
        { token: 'sort', role: 'command', explanation: 'Sort lines of text' },
        { token: '-k2', role: 'flag', explanation: 'Sort by field column 2' },
        { token: '-n', role: 'flag', explanation: 'Compare according to numerical value' },
        { token: '-r', role: 'flag', explanation: 'Reverse the result of comparisons' }
      ],
      variations: [
        { syntax: 'sort -u names.txt', title: 'Sort and Deduplicate', whatItDoes: 'Sorts and outputs only unique lines (built-in uniq)', whenToUse: 'Quick unique list generation' },
        { syntax: 'sort -t: -k3 -n /etc/passwd', title: 'Sort /etc/passwd by UID', whatItDoes: 'Splits on colon (-t:) and sorts numerically by UID (field 3)', whenToUse: 'System user audits' }
      ],
      beforeAfter: {
        before: '$ cat numbers.txt\n10\n2\n1\n100\n$ sort -n numbers.txt',
        after: '1\n2\n10\n100',
        explanation: 'Numeric sort (-n) correctly sorted mathematically; default alpha sort would have put 100 before 2.'
      },
      expectedOutput: '1\n2\n10\n100',
      whatChanges: ['Reads lines and sorts in memory/scratch buffer.'],
      whatDoesNotChange: ['Input file is completely unmodified.'],
      safeRecovery: '100% safe read-only stream filter.',
      commonMistakes: [
        { mistake: 'Sorting numbers without the "-n" flag', whyItHappens: 'Alphabetical sort puts "100" and "10" before "2" because "1" comes before "2" in ASCII!', howToFix: 'Always include "-n" when sorting numbers.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-14',
      subChapterNumber: '08.14',
      command: 'sort ips.txt | uniq -c',
      title: 'uniq',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Filter or count adjacent duplicate lines from an input stream',
      badges: ['Text', 'Duplicates', 'Core'],
      difficulty: 'Beginner',
      quote: 'uniq only compares ADJACENT lines; you must ALWAYS pipe through sort before uniq.',
      whatIsIt: 'uniq filters out adjacent duplicate lines from a text stream. Using "-c", it prefixes lines with the number of occurrences. Using "-d", it shows only duplicated lines. Using "-u", it shows only truly unique lines that appeared exactly once. Because it only compares adjacent consecutive lines, input MUST be sorted first.',
      inSimpleWords: 'If you have a list where "apple" appears 50 times and "banana" appears 10 times, "sort | uniq -c" tells you: "50 apple, 10 banana". It is the easiest way to count frequencies.',
      whyDoYouNeedIt: 'You need uniq to count web traffic hits per IP, tally HTTP status error frequencies (how many 404s vs 500s), and deduplicate email lists.',
      realWorldScenario: 'Your web server is suffering a DDoS attack. You need to know which IPs are hammering your server. You run: "awk \'{print $1}\' access.log | sort | uniq -c | sort -nr | head -n 5". In 2 seconds, you see an IP with 25,000 requests, ready to block in the firewall.',
      realWorldAnalogy: 'Tallying election votes. You sort ballots by candidate name first, then count each stack.',
      terms: [
        { term: 'Adjacent Matching', simple: 'Comparing only neighboring lines in sequence.', technical: 'Streaming algorithm comparing current line buffer with previous line buffer in O(1) space.' },
        { term: 'Count Flag (-c)', simple: 'Prefixes each unique line with its occurrence count.', technical: 'Outputs occurrence integer formatted into left-hand column.' }
      ],
      syntaxCode: 'sort file.txt | uniq [OPTIONS]',
      syntaxTokens: [
        { token: 'sort file.txt', role: 'command', explanation: 'Sort lines so identical lines are adjacent' },
        { token: '|', role: 'operator', explanation: 'Stream pipe' },
        { token: 'uniq', role: 'command', explanation: 'Filter duplicate lines' },
        { token: '-c', role: 'flag', explanation: 'Prefix lines by the number of occurrences' }
      ],
      variations: [
        { syntax: 'sort list.txt | uniq -d', title: 'Show Only Duplicates', whatItDoes: 'Outputs only lines that appeared more than once', whenToUse: 'Finding duplicate database records' },
        { syntax: 'sort list.txt | uniq -u', title: 'Show Only Unique Singles', whatItDoes: 'Outputs only lines that appeared strictly once', whenToUse: 'Finding unique records' }
      ],
      beforeAfter: {
        before: '$ cat fruits.txt\napple\nbanana\napple\n$ sort fruits.txt | uniq -c',
        after: '  2 apple\n  1 banana',
        explanation: 'Lines were sorted together, allowing uniq to count that apple occurred twice.'
      },
      expectedOutput: '2 apple\n1 banana',
      whatChanges: ['Filters duplicate stream lines.'],
      whatDoesNotChange: ['Original file is untouched.'],
      safeRecovery: '100% safe read-only operation.',
      commonMistakes: [
        { mistake: 'Running "uniq" directly on an unsorted file', whyItHappens: 'If duplicate lines are separated by other lines, uniq will NOT count them together!', howToFix: 'ALWAYS run "sort" immediately before "uniq": "sort file | uniq".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-15',
      subChapterNumber: '08.15',
      command: 'cut -d: -f1,7 /etc/passwd',
      title: 'cut',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Extract specific delimited columns, fields, or character byte ranges from lines',
      badges: ['Text', 'Extraction', 'Core'],
      difficulty: 'Beginner',
      quote: 'cut is the laser scalpel for delimited tables: pick the column you want and discard the rest.',
      whatIsIt: 'cut removes sections from each line of files or standard input. Using "-d" (delimiter) and "-f" (fields), it slices delimited data (CSV, TSV, colon-delimited files like /etc/passwd) and extracts only the specified column numbers. Using "-c", it extracts exact character byte positions.',
      inSimpleWords: 'Think of a table with 10 columns. You only care about Column 1 (Username) and Column 7 (Login Shell). "cut -d: -f1,7 /etc/passwd" slices out just those two columns, throwing the rest away.',
      whyDoYouNeedIt: 'You need cut in shell scripts to parse system configuration databases (/etc/passwd, /etc/group), extract IP addresses from ifconfig/ip output, and process CSV spreadsheets.',
      realWorldScenario: 'You need a clean list of all usernames on a Linux machine. /etc/passwd stores 7 fields per line separated by colons. You run: "cut -d: -f1 /etc/passwd". You receive a pristine list of usernames with zero extra clutter.',
      realWorldAnalogy: 'Cutting a specific column out of a newspaper table with scissors.',
      terms: [
        { term: 'Delimiter (-d)', simple: 'The character that separates columns (e.g. colon, comma, tab).', technical: 'Single-byte character used to delimit fields (default is TAB).' },
        { term: 'Field List (-f)', simple: 'The column numbers you want to extract (e.g. -f1,3 or -f2-4).', technical: 'Comma or hyphen-separated list of field indices starting from 1.' }
      ],
      syntaxCode: 'cut -d[DELIM] -f[FIELDS] [FILE]',
      syntaxTokens: [
        { token: 'cut', role: 'command', explanation: 'Remove sections from each line of files' },
        { token: '-d:', role: 'flag', explanation: 'Use colon (:) as the field delimiter character' },
        { token: '-f1,7', role: 'flag', explanation: 'Select only fields 1 and 7' },
        { token: '/etc/passwd', role: 'path', explanation: 'Target file' }
      ],
      variations: [
        { syntax: 'cut -c 1-10 log.txt', title: 'Cut First 10 Characters', whatItDoes: 'Extracts exact character positions 1 through 10', whenToUse: 'Fixed-width log timestamps' },
        { syntax: 'cut -d\',\' -f2 customers.csv', title: 'Extract CSV Column', whatItDoes: 'Extracts second column from comma-separated file', whenToUse: 'CSV data parsing' }
      ],
      beforeAfter: {
        before: '$ head -n 1 /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\n$ cut -d: -f1,7 /etc/passwd | head -n 1',
        after: 'root:/bin/bash',
        explanation: 'Extracted only field 1 (username) and field 7 (shell), dropping fields 2-6.'
      },
      expectedOutput: 'root:/bin/bash',
      whatChanges: ['Extracts field characters to stdout.'],
      whatDoesNotChange: ['Source file is untouched.'],
      safeRecovery: '100% safe read-only operation.',
      commonMistakes: [
        { mistake: 'Trying to use cut with multi-character or variable space delimiters (e.g. ps aux | cut -d\' \' -f2)', whyItHappens: 'cut treats each individual space as a separate delimiter, breaking on multiple spaces!', howToFix: 'Use "awk \'{print $2}\'" when columns are separated by multiple variable spaces.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-16',
      subChapterNumber: '08.16',
      command: 'cat windows_file.txt | tr -d \'\\r\' > linux_file.txt',
      title: 'tr',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Translate, squeeze, or delete individual characters from standard input streams',
      badges: ['Text', 'Translation', 'Core'],
      difficulty: 'Beginner',
      quote: 'tr does not modify files; it operates purely on character streams in flight.',
      whatIsIt: 'tr ("Translate") reads standard input and transforms individual characters by mapping Set1 characters to Set2 characters, deleting specified characters with "-d", or collapsing repeated identical characters into a single character with "-s" ("squeeze").',
      inSimpleWords: 'Think of tr as a character-by-character search-and-replace machine. It can replace every lowercase letter with uppercase, or delete all annoying carriage returns (\\r) from Windows files.',
      whyDoYouNeedIt: 'You need tr to fix Windows CRLF line endings that break shell scripts, replace spaces with underscores in filenames, and clean text streams.',
      realWorldScenario: 'A shell script written on Windows fails on Linux with: "bash: ./script.sh: \\r: command not found". Windows uses Carriage Return + Line Feed (\\r\\n) while Linux uses only Line Feed (\\n). You run: "tr -d \'\\r\' < script.sh > script_fixed.sh". The script executes flawlessly.',
      realWorldAnalogy: 'A currency exchange counter swapping individual euro coins for dollar coins.',
      terms: [
        { term: 'CRLF (\\r\\n)', simple: 'Windows line ending containing invisible carriage return (\\r) and newline (\\n).', technical: 'ASCII 0x0D followed by 0x0A; breaks POSIX shell parsers expecting pure LF (0x0A).' },
        { term: 'Squeeze (-s)', simple: 'Collapsing multiple duplicate spaces into a single space.', technical: 'Replaces sequences of repeated identical characters with a single character occurrence.' }
      ],
      syntaxCode: 'tr [OPTIONS] SET1 [SET2]',
      syntaxTokens: [
        { token: 'tr', role: 'command', explanation: 'Translate, squeeze, or delete characters' },
        { token: '-d \'\\r\'', role: 'flag', explanation: 'Delete all carriage return characters from stream' }
      ],
      variations: [
        { syntax: 'echo "hello   world" | tr -s \' \'', title: 'Squeeze Multiple Spaces', whatItDoes: 'Replaces 3 spaces with a single space ("hello world")', whenToUse: 'Normalizing whitespace' },
        { syntax: 'echo "hello" | tr \'a-z\' \'A-Z\'', title: 'Convert to Uppercase', whatItDoes: 'Maps all lowercase ASCII characters to uppercase', whenToUse: 'String normalization' }
      ],
      beforeAfter: {
        before: '$ cat -A broken.sh\n#!/bin/bash^M$\necho "hi"^M$\n$ tr -d \'\\r\' < broken.sh | cat -A',
        after: '#!/bin/bash$\necho "hi"$',
        explanation: 'Invisible Windows ^M carriage returns were stripped cleanly from the stream.'
      },
      expectedOutput: '#!/bin/bash',
      whatChanges: ['Transforms characters in stream.'],
      whatDoesNotChange: ['Input file is opened read-only.'],
      safeRecovery: '100% safe stream translation.',
      commonMistakes: [
        { mistake: 'Trying to run "tr \'a\' \'b\' file.txt" with a filename argument', whyItHappens: 'tr NEVER accepts filenames as arguments; it strictly reads from stdin!', howToFix: 'Feed the file with redirection: "tr \'a\' \'b\' < file.txt".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-17',
      subChapterNumber: '08.17',
      command: 'sed -i \'s/DEBUG=True/DEBUG=False/g\' config.py',
      title: 'sed',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Stream Editor: automated find-and-replace, line deletion, and non-interactive text transformation',
      badges: ['sed', 'Automation', 'Essential'],
      difficulty: 'Intermediate',
      quote: 'sed allows you to edit 10,000 files in one second without opening a text editor.',
      whatIsIt: 'sed (Stream Editor) is a non-interactive text editor that reads streams or files, applies scripted editing commands to each line (such as substitution "s/find/replace/g", line deletion "d", or insertion "i"), and outputs the transformed stream. With "-i" ("in-place"), sed modifies the file directly on disk.',
      inSimpleWords: 'Instead of opening a file in nano, pressing Ctrl+F to find a word, typing the replacement, and saving, sed does that entire find-and-replace operation automatically from your command line.',
      whyDoYouNeedIt: 'sed is the gold standard for automated configuration management. Docker entrypoints, Ansible playbooks, and deployment scripts use sed to inject database passwords, toggle debug flags, and update server URLs automatically.',
      realWorldScenario: 'You are deploying an app to production. You must change "DEBUG=True" to "DEBUG=False" across 20 configuration files. You run: "sed -i \'s/DEBUG=True/DEBUG=False/g\' *.conf". All 20 files are updated in 100 milliseconds.',
      realWorldAnalogy: 'The "Replace All" button in a word processor running automatically at the speed of light.',
      terms: [
        { term: 's/find/replace/g', simple: 'The substitution command: substitute "find" with "replace" globally (g).', technical: 'Syntax: s = substitute, delimiter = /, pattern = regex, replacement = string, g = all occurrences on line.' },
        { term: 'In-Place Editing (-i)', simple: 'Modifies the file directly on your hard drive.', technical: 'Writes transformed stream to temporary file and atomically renames over original inode.' }
      ],
      syntaxCode: 'sed [OPTIONS] \'s/FIND/REPLACE/FLAGS\' [FILE]',
      syntaxTokens: [
        { token: 'sed', role: 'command', explanation: 'Stream editor' },
        { token: '-i', role: 'flag', explanation: 'In-place edit (modifies original file on disk)' },
        { token: '\'s/DEBUG=True/DEBUG=False/g\'', role: 'argument', explanation: 'Substitute command script with global flag' },
        { token: 'config.py', role: 'path', explanation: 'Target file' }
      ],
      variations: [
        { syntax: 'sed -i.bak \'s/old/new/g\' app.conf', title: 'In-Place Edit with Backup', whatItDoes: 'Creates app.conf.bak before editing original file', whenToUse: 'Safe production config edits' },
        { syntax: 'sed \'/^#/d\' /etc/hosts', title: 'Delete Comment Lines', whatItDoes: 'The "d" command deletes all lines matching pattern "^#"', whenToUse: 'Stripping comments from output' }
      ],
      beforeAfter: {
        before: '$ cat env.txt\nENV=development\n$ sed -i \'s/development/production/g\' env.txt',
        after: '$ cat env.txt\nENV=production',
        explanation: 'File content was updated in-place without human editor interaction.'
      },
      expectedOutput: 'ENV=production',
      whatChanges: ['With -i, overwrites target file on disk.'],
      whatDoesNotChange: ['Unmatched lines remain completely untouched.'],
      safeRecovery: 'ALWAYS use "sed -i.bak" to create an automatic backup copy before performing in-place edits.',
      commonMistakes: [
        { mistake: 'Forgetting the trailing "g" in s/find/replace/g', whyItHappens: 'Without "g", sed only replaces the FIRST occurrence on each line, leaving remaining occurrences unchanged!', howToFix: 'Always include "g" for global replacement across the line.' },
        { mistake: 'Using slash delimiters when your search string contains slashes (e.g. URLs)', whyItHappens: 'Slashes confuse sed syntax: s/http://site.com/http://new.com/g fails!', howToFix: 'Use any other delimiter character: sed \'s|http://site.com|http://new.com|g\'.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-18',
      subChapterNumber: '08.18',
      command: 'awk \'{print $1, $9}\' /var/log/nginx/access.log',
      title: 'awk',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'The full Turing-complete pattern scanning and column processing language (Aho, Weinberger, Kernighan)',
      badges: ['awk', 'Analytics', 'Programming'],
      difficulty: 'Intermediate',
      quote: 'awk is not merely a command; it is an entire C-like programming language built specifically for processing columns of data.',
      whatIsIt: 'awk (named after creators Alfred Aho, Peter Weinberger, and Brian Kernighan) is a specialized, Turing-complete pattern-directed programming language designed for processing column-formatted text. It automatically splits each line into whitespace-separated positional variables ($1, $2, $3... up to $NF for the last column, with $0 representing the whole line). It supports variables, math, if-statements, associative arrays, and BEGIN/END blocks.',
      inSimpleWords: 'awk is like a lightweight spreadsheet engine for the command line. If you have data in columns (like logs, process tables, or reports), awk lets you print Column 1 and Column 9, calculate sums, and filter numbers with ease.',
      whyDoYouNeedIt: 'When cut is too simple (cannot handle variable spaces) and Python is too heavy, awk solves complex reporting and log extraction in one elegant line.',
      realWorldScenario: 'You need to calculate the average response size in bytes from an Nginx log where bytes are in Column 10. You type: "awk \'{sum += $10; count++} END {print sum/count}\' access.log". In 1 second, awk processes 500,000 lines and prints the average.',
      realWorldAnalogy: 'Writing a formula in an Excel column (=SUM or =AVERAGE) applied across every row of a spreadsheet.',
      terms: [
        { term: 'Field Variables ($1, $2, $NF)', simple: '$1 = Column 1; $NF = Number of Fields (the last column); $0 = entire line.', technical: 'Built-in record field tokens split automatically on FS (Field Separator, default whitespace).' },
        { term: 'BEGIN and END Blocks', simple: 'Code that runs once before reading files (BEGIN) and once after finishing all lines (END).', technical: 'Action blocks executed before the first input record is read and after EOF.' }
      ],
      syntaxCode: 'awk \'PATTERN { ACTION }\' [FILE]',
      syntaxTokens: [
        { token: 'awk', role: 'command', explanation: 'Pattern scanning and processing language' },
        { token: '\'{print $1, $9}\'', role: 'argument', explanation: 'Action block printing column 1 and column 9' },
        { token: '/var/log/nginx/access.log', role: 'path', explanation: 'Target log file' }
      ],
      variations: [
        { syntax: 'awk -F: \'{print $1, $3}\' /etc/passwd', title: 'Custom Delimiter (-F)', whatItDoes: 'Splits on colon (-F:) to extract username ($1) and UID ($3)', whenToUse: 'Colon, comma, or pipe delimited files' },
        { syntax: 'awk \'$9 >= 500 {print $1, $7, $9}\' access.log', title: 'Conditional Column Filter', whatItDoes: 'Prints IP, URL, and Status Code ONLY if status code ($9) >= 500', whenToUse: 'Web server error analysis' }
      ],
      beforeAfter: {
        before: '$ ps aux | head -n 2\nUSER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1 168400 12800 ?        Ss   10:00   0:01 /sbin/init\n$ ps aux | awk \'{print $1, $2, $11}\' | head -n 2',
        after: 'USER PID COMMAND\nroot 1 /sbin/init',
        explanation: 'awk cleanly extracted columns 1, 2, and 11 across multiple variable spaces.'
      },
      expectedOutput: 'root 1 /sbin/init',
      whatChanges: ['Processes stream in memory.'],
      whatDoesNotChange: ['Input files remain completely untouched.'],
      safeRecovery: '100% safe read-only data extraction language.',
      commonMistakes: [
        { mistake: 'Forgetting curly braces around awk actions (e.g. awk \'print $1\' file)', whyItHappens: 'awk requires actions to be wrapped in { ... } blocks.', howToFix: 'Always wrap actions in braces: awk \'{print $1}\' file.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-08-19',
      subChapterNumber: '08.19',
      command: 'find . -name "*.bak" | xargs rm',
      title: 'xargs',
      topicId: 'ch-08',
      topicNumber: '08',
      topicTitle: 'Searching and Text Processing',
      subtitle: 'Build and execute command lines from standard input streams in high-throughput batches',
      badges: ['xargs', 'Pipelines', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Pipes send data to standard input; xargs converts standard input into command-line arguments.',
      whatIsIt: 'xargs reads items from standard input (separated by spaces, tabs, or newlines) and executes a specified command using those items as command-line arguments. It automatically splits massive lists into manageable batches to prevent hitting the kernel ARG_MAX buffer limit, and can run parallel processes across CPU cores using "-P".',
      inSimpleWords: 'Some commands (like rm, kill, or chmod) refuse to read from pipes; they demand arguments. "xargs" takes text streaming out of a pipe and turns it into arguments for that command.',
      whyDoYouNeedIt: 'If find locates 50,000 files, typing "rm $(find ...)" crashes with "Argument list too long". "find ... | xargs rm" solves this because xargs batches the files into safe chunks of 1,000 files per run.',
      realWorldScenario: 'You need to delete 200,000 expired cache files safely. You run: "find /var/cache -type f -name \'*.cache\' -print0 | xargs -0 -P 4 -n 500 rm". xargs uses 4 parallel CPU workers (-P 4) to batch and delete 500 files at a time without breaking ARG_MAX limits.',
      realWorldAnalogy: 'A conveyor belt that packs individual loose items into boxes before loading them onto a delivery truck.',
      terms: [
        { term: 'ARG_MAX', simple: 'The Linux kernel limit on how many arguments a single command can accept.', technical: 'Kernel parameter (/proc/sys/fs/arg_max) restricting execve argument and environment buffer.' },
        { term: '-print0 and -0 (Null Delimiter)', simple: 'Using null bytes (\\0) instead of spaces so filenames with spaces do not break.', technical: 'Safe pairing preventing word-splitting vulnerabilities on spaces or newlines in filenames.' }
      ],
      syntaxCode: 'command_producing_stream | xargs [OPTIONS] TARGET_COMMAND',
      syntaxTokens: [
        { token: 'find . -name "*.bak"', role: 'command', explanation: 'Generates list of filenames' },
        { token: '|', role: 'operator', explanation: 'Stream pipe' },
        { token: 'xargs', role: 'command', explanation: 'Build and execute command line arguments' },
        { token: 'rm', role: 'command', explanation: 'Target command receiving arguments' }
      ],
      variations: [
        { syntax: 'find . -type f -print0 | xargs -0 grep "SECRET"', title: 'Safe Space-Resistant Search', whatItDoes: 'Separates files with null bytes (-0) ensuring filenames with spaces work safely', whenToUse: 'Production scripts handling user files' },
        { syntax: 'cat urls.txt | xargs -n 1 -P 8 curl -O', title: 'Parallel Downloads', whatItDoes: 'Downloads URLs using 8 parallel worker threads (-P 8)', whenToUse: 'High-throughput batch operations' }
      ],
      beforeAfter: {
        before: '$ find /tmp/test -type f\n/tmp/test/a.tmp\n/tmp/test/b.tmp\n$ find /tmp/test -type f | xargs rm',
        after: '$ ls /tmp/test\n[All temporary files unlinked cleanly in one batch]',
        explanation: 'xargs converted the find stream into arguments: "rm /tmp/test/a.tmp /tmp/test/b.tmp".'
      },
      expectedOutput: '[Command executed with batched arguments]',
      whatChanges: ['Executes target command with converted argument vectors.'],
      whatDoesNotChange: ['Shell environment is untouched.'],
      safeRecovery: 'Use "xargs -p" to prompt for confirmation before executing each batch during sensitive operations.',
      commonMistakes: [
        { mistake: 'Using xargs on filenames containing spaces without "-0"', whyItHappens: 'A file named "my photo.jpg" gets split into two arguments: "my" and "photo.jpg"!', howToFix: 'ALWAYS use "find -print0 | xargs -0" whenever processing filenames.' }
      ]
    })
  ]
};
