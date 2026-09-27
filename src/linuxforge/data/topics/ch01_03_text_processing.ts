import { LinuxTopic } from '../unifiedLinuxData';

export const MODULE_03_TEXT_PROCESSING: LinuxTopic = {
  id: 'ch01-03-text-processing',
  number: '01.3',
  title: 'File Content & Text Processing',
  iconName: 'FileText',
  description:
    'Text streams and data extraction: viewing & paging (cat, less, more, head, tail), data filtering & transforms (sort, uniq, wc, cut, tr), and stream powerhouses (grep, sed, awk, xargs).',
  concepts: [
    {
      id: 'linux-viewing-paging',
      command: 'cat -n /etc/hosts; head -n 5 /etc/passwd; tail -f -n 20 /var/log/syslog; less /var/log/messages',
      title: 'File Inspection & Paging: cat, less, more, head, tail',
      topicId: 'ch01-03-text-processing',
      topicNumber: '01.3',
      topicTitle: 'File Content & Text Processing',
      subtitle: 'Stream concatenation, interactive scrolling buffers, headers, and live log tailing',
      badges: ['Viewing', 'Paging', 'Logging'],
      quote: 'Never cat a 50GB production log file: learn less and tail -f to inspect streams without freezing your terminal.',
      difficulty: 'Beginner',
      whatIsIt:
        'Inspecting file contents without opening heavy GUI editors is fundamental to Linux. `cat` (concatenate) prints entire files to standard output or merges multiple files. For large files, interactive pagers like `less` (and its historic predecessor `more`) allow backward and forward scrolling, regex pattern searching (`/pattern`), and jump navigation (`G` for end, `1G` for start) without loading the entire file into memory. For targeted inspection, `head -n <N>` views the first N lines of headers, while `tail -n <N>` views the last N lines. `tail -f` (follow) monitors streaming log files in real time as new lines are appended by background daemons.',
      inSimpleWords:
        '`cat` dumps the whole file onto your screen, `head` peeks at the top few lines, `tail` checks the bottom few lines, `tail -f` watches live log updates like a TV broadcast, and `less` lets you scroll through huge files smoothly without crashing.',
      whyDoYouNeedIt:
        'When an application throws an error in Kubernetes or on a Linux VM, you immediately run `tail -f -n 100 app.log` to watch the stack trace in real time as user requests hit the server.',
      realWorldAnalogy:
        '`cat` is dumping a 500-page book onto your desk in one avalanche; `less` is reading an e-reader where you turn pages forward and backward; `tail -f` is watching the ticker at the bottom of a news channel.',
      withoutVsWith: {
        without: {
          title: 'Without Smart Pagers and Tail (Running cat on Huge Files)',
          items: [
            'Running cat on a 10GB log file locks up the terminal session and exhausts memory buffers',
            'Cannot search backwards or jump to specific error timestamps easily',
            'No way to watch live log writes in real time as background services run',
          ],
          outcome: 'Terminal hangs, corrupted screen buffers, and missed live error events.',
        },
        with: {
          title: 'With Linux Pagers (less) and Live Tailing (tail -f)',
          items: [
            'less opens multi-gigabyte files instantly because it only loads visible terminal rows into memory',
            'Fast regex searching forward (/pattern) and backward (?pattern) inside less',
            'tail -f streams new log events live as they are committed to disk by the kernel',
          ],
          outcome: 'Effortless log triage on multi-gigabyte production systems without latency.',
        },
      },
      blockDiagram: {
        title: 'File Viewing Pipeline: In-Memory Pager vs Streaming Follow',
        subtitle: 'How less reads chunks via pread() while tail -f tracks inode growth via inotify',
        nodes: [
          { id: 'view-disk', label: 'Log File on Disk', simpleDef: 'Disk file (e.g. /var/log/syslog)', techDef: 'Growing filesystem inode receiving append writes', badge: 'Disk File', color: '#38bdf8' },
          { id: 'view-cat', label: 'cat (Stream Dump)', simpleDef: 'Reads whole stream to stdout', techDef: 'read() / write() loop until EOF reached', badge: 'Full Dump', color: '#f59e0b' },
          { id: 'view-less', label: 'less (Buffered Pager)', simpleDef: 'Interactive viewport window', techDef: 'Reads viewport chunks on demand using lseek() / pread()', badge: 'Interactive', color: '#06b6d4' },
          { id: 'view-tail', label: 'tail -f (inotify Follow)', simpleDef: 'Watches live append events', techDef: 'Registers inotify kernel watch to print new bytes immediately', badge: 'Live Stream', color: '#10b981' },
        ],
      },
      terms: [
        { term: 'tail -f (Follow)', simple: 'Keeps the file open and prints new lines as they are added.', technical: 'Watches the file descriptor or filename using inotify to output appended data in real time.' },
        { term: 'less', simple: 'A terminal pager that lets you scroll up and down through files.', technical: 'An interactive pager that does not read the entire file before starting, enabling fast startup on large files.' },
        { term: 'inotify', simple: 'The Linux kernel subsystem that alerts programs when files change.', technical: 'Linux kernel subsystem that extends filesystems to notice changes to files and report them to applications.' },
      ],
      whenToUse: [
        'Quickly checking small config files: `cat /etc/resolv.conf`',
        'Watching live web server traffic: `tail -f /var/log/nginx/access.log`',
        'Exploring massive system or application logs interactively: `less /var/log/syslog`',
      ],
      whenNotToUse: [
        'Never run `cat` or `more` on multi-gigabyte files; always use `less`',
        'Avoid `tail -f` without `--retry` if the log file is being rotated by logrotate',
      ],
      syntaxCode: 'cat /etc/os-release\nhead -n 10 /var/log/dpkg.log\ntail -n 25 /var/log/auth.log\ntail -f /var/log/syslog\nless /var/log/syslog',
      syntaxTokens: [
        { token: 'cat -n', role: 'Flag', explanation: 'Number all output lines' },
        { token: 'head -n 5', role: 'Flag', explanation: 'Print the first 5 lines of the file' },
        { token: 'tail -n 20', role: 'Flag', explanation: 'Print the last 20 lines of the file' },
        { token: 'tail -f', role: 'Flag', explanation: 'Output appended data as the file grows' },
      ],
      variations: [
        { syntax: 'tail -F logfile', title: 'Follow with Retry', whatItDoes: 'Keeps tracking the file even if logrotate renames and recreates it', whenToUse: 'Production log monitoring' },
        { syntax: 'head -n -5 file', title: 'Omit Bottom', whatItDoes: 'Prints all lines except the last 5', whenToUse: 'Trimming trailing footers' },
        { syntax: 'less +F file', title: 'Live Pager', whatItDoes: 'Starts less in follow mode (press Ctrl+C to scroll back)', whenToUse: 'Viewing live logs with search capability' },
      ],
      internalFlow: [
        { step: 1, title: 'Process Opens Target File', desc: 'tail calls openat() with O_RDONLY', why: 'Acquires file descriptor', techDetail: 'Kernel assigns next available file descriptor integer (e.g. FD 3)' },
        { step: 2, title: 'Seek to End (tail)', desc: 'tail uses lseek() with SEEK_END to jump to file end', why: 'Skips historical data', techDetail: 'Reads backwards to find the last N newline bytes' },
        { step: 3, title: 'Kernel inotify Watch', desc: 'For tail -f, calls inotify_add_watch() for IN_MODIFY events', why: 'Waits efficiently for writes', techDetail: 'Process sleeps on poll(); kernel wakes it immediately when disk blocks are committed' },
      ],
      sandbox: {
        initialCommands: ['# Read the first 5 lines of /etc/passwd\nhead -n 5 /etc/passwd'],
        guidedSteps: [
          { instruction: 'Inspect the top 5 lines of /etc/passwd', command: 'head -n 5 /etc/passwd', hint: 'Run head -n 5' },
          { instruction: 'Inspect the bottom 5 lines of /etc/passwd', command: 'tail -n 5 /etc/passwd', hint: 'Run tail -n 5' },
        ],
        targetTask: 'View the top 5 lines of /etc/passwd with head -n 5',
        solutionCommands: ['head -n 5 /etc/passwd'],
      },
      commonMistakes: [
        { mistake: 'Opening a 20GB log file with vim or nano to view errors', whyWrong: 'vim and nano read the entire file into RAM, often triggering an Out-Of-Memory (OOM) panic on production servers.', correctWay: 'Always use less or tail -n 100 for large files; less only maps the active viewport.' },
        { mistake: 'Using tail -f instead of tail -F on rotated log files', whyWrong: 'When logrotate runs, it moves the file inode; tail -f remains stuck listening to the old dead file.', correctWay: 'Use tail -F (capital F) which follows by filename and re-opens the file upon log rotation.' },
      ],
      challenge: {
        question: 'What is the primary operational advantage of less over cat when inspecting large files?',
        options: [
          { label: 'less loads only the visible terminal buffer on demand, preventing high memory usage and terminal freezing', isCorrect: true, explanation: 'less starts immediately without reading the whole file, enabling smooth scrolling and instant search.' },
          { label: 'less compresses the file using gzip in RAM', isCorrect: false, explanation: 'less does not compress data.' },
          { label: 'less can only view files smaller than 1MB', isCorrect: false, explanation: 'less is specifically designed for huge files.' },
          { label: 'less automatically fixes syntax errors in the file', isCorrect: false, explanation: 'less is a read-only viewer, not a syntax validator.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['cat -n <file>', 'head -n 10 <file>', 'tail -n 50 <file>', 'tail -F <file>', 'less <file>'],
        bestPractices: [
          'Inside less: press / to search forward, ? to search backward, n for next match, G for end, q to exit',
          'Use tail -F instead of tail -f in production to survive log rotation',
        ],
      },
    },
    {
      id: 'linux-filtering-transforming',
      command: 'cut -d: -f1,7 /etc/passwd | sort | uniq -c; wc -l /etc/passwd; echo "hello world" | tr "a-z" "A-Z"',
      title: 'Data Extraction & Transformation: sort, uniq, wc, cut, tr',
      topicId: 'ch01-03-text-processing',
      topicNumber: '01.3',
      topicTitle: 'File Content & Text Processing',
      subtitle: 'Tabular slicing, sorting algorithms, duplicate tallying, word counts, and character translation',
      badges: ['Text Processing', 'Core Shell', 'Data Pipelines'],
      quote: 'Combine cut, sort, and uniq -c to turn raw text files into instantaneous operational metrics without writing Python.',
      difficulty: 'Intermediate',
      whatIsIt:
        'Linux follows the Unix philosophy: text streams are the universal interface. `cut` extracts delimited columns or byte ranges (e.g. `cut -d: -f1` on `/etc/passwd`). `sort` re-orders lines alphabetically or numerically (`-n`), reversely (`-r`), or by specific columns (`-k`). `uniq` detects and collapses adjacent matching lines, and with `-c` calculates exact frequency counts. `wc` counts newline counts (`-l`), word counts (`-w`), and byte counts (`-c`). Finally, `tr` (translate) translates, replaces, or deletes specific characters from standard input (e.g. uppercase to lowercase conversion, replacing tabs with commas).',
      inSimpleWords:
        '`cut` slices out specific columns like scissors, `sort` puts rows in alphabetical or numerical order, `uniq -c` counts how many times each item repeats, `wc` counts lines and words, and `tr` swaps or deletes specific characters.',
      whyDoYouNeedIt:
        'In cybersecurity and DevOps forensics, you can count the top 10 IP addresses attacking your server in seconds: `awk \'{print $1}\' access.log | sort | uniq -c | sort -nr | head -n 10`.',
      realWorldAnalogy:
        'An Excel spreadsheet pipeline: `cut` deletes unneeded columns, `sort` organizes by value, `uniq -c` generates a pivot table summary, and `wc` counts total rows.',
      withoutVsWith: {
        without: {
          title: 'Without Unix Text Processors (Writing Custom Python/Node Scripts)',
          items: [
            'Requires writing, packaging, and deploying custom scripts just to count IP addresses in a log',
            'High memory overhead loading millions of lines into scripting language heaps',
            'Slow one-off triage during critical incident response',
          ],
          outcome: 'Slow incident response and excessive boilerplate code for simple data extraction.',
        },
        with: {
          title: 'With Linux Text Utilities (cut | sort | uniq -c)',
          items: [
            'Single one-line pipeline executed directly in terminal calculates analytics in seconds',
            'Streams data through C-optimized standard pipes with minimal RAM consumption',
            'Standard across every Unix server without installing external runtimes',
          ],
          outcome: 'Instant forensic analysis and robust automated shell pipelines.',
        },
      },
      blockDiagram: {
        title: 'Unix Text Filtering & Aggregation Pipeline',
        subtitle: 'Chaining cut -> sort -> uniq -c -> sort -nr for instantaneous metric calculation',
        nodes: [
          { id: 'pipe-raw', label: 'Raw Log File', simpleDef: 'Unfiltered access log lines', techDef: 'Lines formatted with IP, timestamp, method, endpoint, status', badge: 'Input', color: '#38bdf8' },
          { id: 'pipe-cut', label: 'cut -d" " -f1', simpleDef: 'Extracts IP address column', techDef: 'Tokenizes stream on delimiter and emits selected field', badge: 'Filter', color: '#06b6d4' },
          { id: 'pipe-sort', label: 'sort', simpleDef: 'Sorts IPs alphabetically', techDef: 'Required step: uniq only collapses ADJACENT duplicate lines', badge: 'Sort', color: '#10b981' },
          { id: 'pipe-uniq', label: 'uniq -c', simpleDef: 'Counts occurrences of each IP', techDef: 'Aggregates duplicate runs and outputs count prefix', badge: 'Aggregate', color: '#f59e0b' },
          { id: 'pipe-top', label: 'sort -nr | head -n 5', simpleDef: 'Ranks top 5 attacking IPs', techDef: 'Sorts numerically descending and takes top rows', badge: 'Top Metrics', color: '#ef4444' },
        ],
      },
      terms: [
        { term: 'uniq Adjacent Requirement', simple: 'uniq only checks lines that are right next to each other.', technical: 'uniq compares consecutive lines; you MUST sort the stream before passing it to uniq to catch all duplicates.' },
        { term: 'wc -l', simple: 'Counts the number of newline characters in a file or stream.', technical: 'Reads through stream counting ASCII 0x0A (LF) characters.' },
        { term: 'tr', simple: 'Translate command that replaces or removes characters from standard input.', technical: 'Translates, squeezes, and/or deletes characters from standard input, writing to standard output.' },
      ],
      whenToUse: [
        'Finding the top 10 HTTP status codes in access logs: `cut -d" " -f9 access.log | sort | uniq -c | sort -nr`',
        'Counting total registered users: `wc -l /etc/passwd`',
        'Converting uppercase text to lowercase in shell scripts: `echo "$VAR" | tr "[:upper:]" "[:lower:]"`',
      ],
      whenNotToUse: [
        'Do not use `cut` when delimiters are multiple variable spaces; use `awk` instead because `cut` treats adjacent spaces as separate delimiters',
      ],
      syntaxCode: 'cut -d: -f1 /etc/passwd\nsort -n numbers.txt\ncat log.txt | sort | uniq -c\nwc -l /var/log/syslog\necho "HELLO" | tr "A-Z" "a-z"',
      syntaxTokens: [
        { token: 'cut -d: -f1', role: 'Flags', explanation: '-d specifies delimiter (colon), -f specifies field index (1)' },
        { token: 'sort -nr', role: 'Flags', explanation: '-n sorts numerically (1, 2, 10 instead of 1, 10, 2), -r reverses order' },
        { token: 'uniq -c', role: 'Flag', explanation: 'Prefix lines by the number of occurrences' },
        { token: 'wc -l', role: 'Flag', explanation: 'Print the newline count' },
      ],
      variations: [
        { syntax: 'sort -u file', title: 'Sort & Unique', whatItDoes: 'Sorts and removes duplicates in a single process', whenToUse: 'Deduplicating lists without counting' },
        { syntax: 'tr -d "\\r"', title: 'Strip Windows CRLF', whatItDoes: 'Removes carriage returns from Windows scripts', whenToUse: 'Fixing ^M carriage return errors' },
        { syntax: 'tr -s " "', title: 'Squeeze Spaces', whatItDoes: 'Replaces repeated spaces with a single space', whenToUse: 'Cleaning tabular data for cut' },
      ],
      internalFlow: [
        { step: 1, title: 'cut Slices Delimiters', desc: 'cut reads stdin line-by-line, splitting on -d delimiter', why: 'Filters fields', techDetail: 'Scans for delimiter byte and writes requested field bytes directly to stdout' },
        { step: 2, title: 'sort Buffers & Compares', desc: 'sort buffers incoming lines and executes quicksort/merge-sort', why: 'Orders entries', techDetail: 'Uses disk spillover if stream exceeds sort buffer size (-S)' },
        { step: 3, title: 'uniq Compares Adjacent Lines', desc: 'uniq maintains previous line in memory and compares with current line', why: 'Collapses duplicates', techDetail: 'Increments counter if identical; flushes formatted count string when line changes' },
      ],
      sandbox: {
        initialCommands: ['# Extract usernames and login shells from /etc/passwd\ncut -d: -f1,7 /etc/passwd | sort | head -n 6'],
        guidedSteps: [
          { instruction: 'Extract the first column (username) from /etc/passwd', command: 'cut -d: -f1 /etc/passwd', hint: 'Use cut -d: -f1' },
          { instruction: 'Count total lines in /etc/passwd', command: 'wc -l /etc/passwd', hint: 'Use wc -l' },
        ],
        targetTask: 'Extract usernames from /etc/passwd and sort them',
        solutionCommands: ['cut -d: -f1 /etc/passwd | sort'],
      },
      commonMistakes: [
        { mistake: 'Running uniq -c without sorting first', whyWrong: 'uniq only checks consecutive lines; if identical lines are scattered throughout the file, uniq will not group them.', correctWay: 'Always pipe into sort before piping into uniq: cat file | sort | uniq -c.' },
        { mistake: 'Using sort without -n on numbers', whyWrong: 'Alphabetical sorting orders 10, 100 before 2 (like words in a dictionary).', correctWay: 'Use sort -n for numerical values, or sort -nr for descending numbers.' },
      ],
      challenge: {
        question: 'Why does the command `cat access.log | uniq -c` often fail to count total duplicates accurately?',
        options: [
          { label: 'Because uniq only collapses adjacent duplicate lines; the input must be sorted first with sort', isCorrect: true, explanation: 'uniq compares consecutive lines only. Unsorted lines will appear as separate entries.' },
          { label: 'Because uniq cannot read data from a pipe', isCorrect: false, explanation: 'uniq works natively with standard input pipes.' },
          { label: 'Because uniq only works on numbers, not text', isCorrect: false, explanation: 'uniq works on arbitrary text lines.' },
          { label: 'Because cat corrupts the newline characters', isCorrect: false, explanation: 'cat preserves exact newline bytes.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['cut -d<char> -f<num> <file>', 'sort -nr <file>', 'sort | uniq -c', 'wc -l <file>', 'tr "a-z" "A-Z"'],
        bestPractices: [
          'Fix Windows line endings in scripts: tr -d "\\r" < win.sh > linux.sh',
          'Use sort -k 2 -n to sort tabular data specifically by the second column',
        ],
      },
    },
    {
      id: 'linux-grep-sed-awk-xargs',
      command: 'grep -rn "ERROR" /var/log | awk \'{print $1, $NF}\' | sed \'s/ERROR/CRITICAL/g\' | xargs -I{} echo "ALERT: {}"',
      title: 'Stream Powerhouses: grep, sed, awk, xargs',
      topicId: 'ch01-03-text-processing',
      topicNumber: '01.3',
      topicTitle: 'File Content & Text Processing',
      subtitle: 'Pattern matching, non-interactive stream editing, programmable field extraction, and argument piping',
      badges: ['Regex', 'sed', 'awk', 'xargs'],
      quote: 'Master grep, sed, awk, and xargs, and you will command Linux text streams with surgical precision.',
      difficulty: 'Intermediate',
      whatIsIt:
        'The four powerhouses of Unix text automation are `grep`, `sed`, `awk`, and `xargs`. `grep` (Global Regular Expression Print) searches streams and files for regex patterns with flags for recursion (`-r`), line numbers (`-n`), case-insensitivity (`-i`), inverted match (`-v`), and extended regex (`-E`). `sed` (Stream Editor) transforms text non-interactively using search-and-replace expressions (`s/search/replace/g`) and in-place file modifications (`-i`). `awk` is a complete Turing-complete programming language structured around patterns and action blocks (`pattern { action }`), excelling at whitespace-delimited columnar processing. Finally, `xargs` bridges standard output into command line arguments, executing commands across hundreds of items with batching and concurrency support (`-P`).',
      inSimpleWords:
        '`grep` finds lines matching patterns, `sed` finds and replaces text inside streams or files, `awk` extracts and calculates columns, and `xargs` takes a list of outputs and feeds them into another command as arguments.',
      whyDoYouNeedIt:
        'Finding and updating configuration parameters across 50 servers in CI/CD, extracting memory metrics from `/proc`, or batch deleting thousands of dangling Docker images (`docker images -q -f dangling=true | xargs -r docker rmi`) depends on these four tools.',
      realWorldAnalogy:
        '`grep` is a metal detector finding coins on a beach; `sed` is a find-and-replace stamp replacing old addresses with new ones; `awk` is an accountant analyzing columns in a ledger; and `xargs` is a conveyor belt loading packages into delivery trucks.',
      withoutVsWith: {
        without: {
          title: 'Without Advanced Stream Tools (Manual Editing or Naive Loops)',
          items: [
            'Opening 50 config files in nano one-by-one to change a database IP address',
            'Shell for-loops on file lists hit ARG_MAX argument limits or break on spaces',
            'No way to compute averages or column sums without installing heavy runtimes',
          ],
          outcome: 'Hours of error-prone manual editing and broken shell automation.',
        },
        with: {
          title: 'With grep, sed, awk, and xargs',
          items: [
            'Single sed -i command updates settings across hundreds of files in 100 milliseconds',
            'awk computes column sums and memory usage in one line: awk \'{sum += $1} END {print sum}\'',
            'xargs batches command execution safely and supports multi-core parallel processing (-P 4)',
          ],
          outcome: 'Instantaneous mass-updates and high-performance stream processing.',
        },
      },
      blockDiagram: {
        title: 'The Big Four Text Processing Architecture',
        subtitle: 'How grep filters, sed transforms, awk processes tabular logic, and xargs converts to arguments',
        nodes: [
          { id: 't4-grep', label: 'grep -E (Filter)', simpleDef: 'Finds matching regex lines', techDef: 'Emits only lines matching regular expression pattern', badge: 'Regex Match', color: '#38bdf8' },
          { id: 't4-sed', label: 'sed (Stream Editor)', simpleDef: 'Replaces or deletes text', techDef: 'Applies s/regex/replacement/g pattern substitutions per line', badge: 'Transform', color: '#06b6d4' },
          { id: 't4-awk', label: 'awk (Column Language)', simpleDef: 'Processes columnar data', techDef: 'Splits on whitespace, provides $1..$NF variables, variables, and math', badge: 'Data Logic', color: '#10b981' },
          { id: 't4-xargs', label: 'xargs (Arg Builder)', simpleDef: 'Converts stdout into arguments', techDef: 'Constructs argument lists for target command; manages ARG_MAX limits', badge: 'Arg Pipeline', color: '#f59e0b' },
        ],
      },
      terms: [
        { term: 'xargs -I{}', simple: 'Replaces {} with each individual item from standard input.', technical: 'Defines {} as a replacement string, executing the target command once per input item.' },
        { term: 'sed -i', simple: 'Edits the file directly in-place on disk instead of printing to screen.', technical: 'Creates a temporary file, writes transformed output, and atomically renames over the original file.' },
        { term: 'awk NF and NR', simple: 'NF is the Number of Fields (columns); NR is the Number of Records (rows/lines).', technical: 'Built-in awk variables: NF represents field count in current line ($NF is last field); NR is current line number.' },
      ],
      whenToUse: [
        'Searching all files recursively for a string: `grep -rn "DB_PASSWORD" /etc/`',
        'Updating configuration in-place: `sed -i "s/PORT=3000/PORT=8080/g" config.env`',
        'Summing memory usage from ps: `ps aux | awk \'{sum += $6} END {print sum / 1024, "MB"}\'`',
        'Batch killing or removing resources: `find . -name "*.bak" | xargs -r rm -f`',
      ],
      whenNotToUse: [
        'Never run `sed -i` on production config files without making an automatic backup copy first (`sed -i.bak ...`)',
        'Do not pipe filenames with spaces into `xargs` without `-print0` on find and `-0` on xargs',
      ],
      syntaxCode: 'grep -rn "ERROR" /var/log/\nsed -i \'s/http:/https:/g\' site.conf\nawk -F: \'{print $1, $3}\' /etc/passwd\nfind . -name "*.tmp" | xargs -r rm -f',
      syntaxTokens: [
        { token: 'grep -rn', role: 'Flags', explanation: '-r (recursive directory search), -n (show line numbers)' },
        { token: 'sed -i s/A/B/g', role: 'Expression', explanation: 'Substitute A with B globally in-place' },
        { token: 'awk -F: \'{print $1}\'', role: 'Expression', explanation: 'Split fields on colon and print field 1' },
        { token: 'xargs -r', role: 'Flag', explanation: 'Do not run target command if input is empty' },
      ],
      variations: [
        { syntax: 'grep -v "DEBUG"', title: 'Invert Match', whatItDoes: 'Excludes lines containing pattern', whenToUse: 'Filtering noisy debug logs' },
        { syntax: 'sed -n "10,20p" file', title: 'Print Range', whatItDoes: 'Prints only lines 10 through 20', whenToUse: 'Extracting specific log blocks' },
        { syntax: 'xargs -P 4 -n 1 cmd', title: 'Parallel Execution', whatItDoes: 'Runs up to 4 concurrent worker processes', whenToUse: 'Speeding up batch downloads or processing' },
      ],
      internalFlow: [
        { step: 1, title: 'grep Compiles Regex', desc: 'grep parses pattern into deterministic finite automaton (DFA)', why: 'Maximum search throughput', techDetail: 'Uses Boyer-Moore string search or DFA regex engine in glibc' },
        { step: 2, title: 'sed Evaluates Stream Buffer', desc: 'sed reads line into pattern space, evaluates substitution commands', why: 'Transforms text', techDetail: 'Writes transformed pattern space to output buffer or temp file' },
        { step: 3, title: 'awk Splits Fields', desc: 'awk tokenizes line by FS (Field Separator), populating $1..$NF', why: 'Populates columnar variables', techDetail: 'Executes action blocks for lines satisfying matching pattern' },
        { step: 4, title: 'xargs Assembles Execve Args', desc: 'xargs chunks incoming lines into argv strings under system ARG_MAX', why: 'Executes target binary', techDetail: 'Invokes execve() with batched argument array' },
      ],
      sandbox: {
        initialCommands: ['# Extract usernames and user IDs from /etc/passwd using awk\nawk -F: \'{print $1, "has UID", $3}\' /etc/passwd | head -n 5'],
        guidedSteps: [
          { instruction: 'Print usernames and UIDs from /etc/passwd using awk', command: 'awk -F: \'{print $1, $3}\' /etc/passwd', hint: 'Use awk -F:' },
          { instruction: 'Search for "root" in /etc/passwd using grep', command: 'grep "root" /etc/passwd', hint: 'Run grep "root" /etc/passwd' },
        ],
        targetTask: 'Extract usernames and UIDs with awk and search for root with grep',
        solutionCommands: ['awk -F: \'{print $1, $3}\' /etc/passwd', 'grep "root" /etc/passwd'],
      },
      commonMistakes: [
        { mistake: 'Running sed -i without testing the regex output first', whyWrong: 'An unintended regex mistake can corrupt or wipe all matching lines across critical configuration files.', correctWay: 'Always test without -i first, or use sed -i.bak to create an automatic backup before overwriting.' },
        { mistake: 'Passing filenames with spaces to xargs without -0', whyWrong: 'xargs splits on whitespace by default; a file named "my doc.pdf" will be treated as two separate files ("my" and "doc.pdf").', correctWay: 'Use find -print0 | xargs -0 to safely delimit filenames by null bytes.' },
      ],
      challenge: {
        question: 'What does the built-in awk variable $NF represent?',
        options: [
          { label: 'The value of the very last field in the current line', isCorrect: true, explanation: 'NF is the number of fields; therefore $NF accesses the content of that last field.' },
          { label: 'The total number of lines in the entire file', isCorrect: false, explanation: 'NR represents the current record/line count.' },
          { label: 'The filename being processed', isCorrect: false, explanation: 'FILENAME stores the current filename in awk.' },
          { label: 'A null field marker', isCorrect: false, explanation: '$NF refers to the final column data.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['grep -rn "<pattern>" <dir>', 'sed -i "s/<old>/<new>/g" <file>', 'awk -F: \'{print $1, $NF}\' <file>', 'xargs -I{} <cmd> {}'],
        bestPractices: [
          'Use grep -E (or egrep) for extended regex with | (OR) and + (one or more)',
          'Always use find -print0 | xargs -0 when handling arbitrary user-generated files',
        ],
      },
    },
  ],
};
