import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 19: TEXT PROCESSING & AUTOMATION (SED & AWK) (19.1 to 19.14)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_19: LinuxTopic = {
  id: 'ch-19',
  number: '19',
  title: 'Text Processing & Automation',
  iconName: 'FileCode',
  description: 'Master stream text transformation: cut, paste, tr, sed stream editing (regex substitutions, in-place edits), and the AWK programming language (fields, records, BEGIN/END, and complex pipelines).',
  concepts: [
    buildLinuxConcept({
      id: 'c-19-01',
      subChapterNumber: '19.1',
      command: 'echo "unix text processing" | tr \'a-z\' \'A-Z\'',
      title: 'Text Processing Philosophy in Linux',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'The Unix philosophy: text streams as the universal interface connecting independent tools',
      badges: ['Unix Philosophy', 'Pipes', 'Text', 'Core'],
      difficulty: 'Beginner',
      quote: 'In Unix, plain text is the universal protocol: human-readable, easily parsed, and effortlessly chainable across programs.',
      whatIsIt: 'The Unix Philosophy, articulated by Doug McIlroy and Ken Thompson, dictates: "Write programs that do one thing and do it well. Write programs to work together. Write programs to handle text streams, because that is a universal interface." Rather than creating complex proprietary binary RPCs, Linux utilities communicate via unadorned streams of newline-delimited text passed through anonymous pipes. Utilities like cut, tr, sed, and awk operate on standard input and write to standard output, allowing limitless composability.',
      inSimpleWords: 'Everything in Linux speaks plain text. Because web server logs, system configurations, and user lists are just plain text lines, you can connect small tools together like building blocks to slice, filter, and transform data.',
      whyDoYouNeedIt: 'Data engineering, log analysis, and system auditing frequently require parsing CSVs, TSVs, JSON, or Apache access logs. Mastering text streams allows an SRE to answer questions in seconds without writing a full Python script.',
      realWorldScenario: 'An emergency alert reports high error rates. Using a single 4-stage pipeline (cat access.log | grep 500 | awk \'{print $7}\' | sort | uniq -c | sort -nr), you identify the exact API endpoint throwing 500 errors in under 3 seconds.',
      realWorldAnalogy: 'Standard shipping containers: because all cargo fits in standard metal containers (text streams), any crane, train, or ship (Linux tools) can handle them without needing custom machinery.',
      withoutVsWith: {
        without: {
          title: 'Monolithic Custom Scripting for Every Task',
          items: ['Writing 50-line Python or Go scripts for simple 1-line log parsing queries', 'Waiting for slow IDE compilation or script dependencies to install on production nodes', 'Inability to quickly slice data during live, high-stress outages'],
          outcome: 'Slow incident triage and high development overhead.'
        },
        with: {
          title: 'Composable Unix Text Pipelines',
          items: ['Instant ad-hoc analysis combining specialized CLI tools over pipes', 'Zero external runtime dependencies: every tool is built into base POSIX Linux', 'Streaming memory efficiency: processes gigabytes of data on-the-fly without swapping'],
          outcome: 'Sub-second data analysis and senior-level operational speed.'
        }
      },
      blockDiagram: {
        title: 'The Unix Text Pipeline Stream',
        subtitle: 'Data flow through chained single-purpose tools:',
        nodes: [
          { id: 'src', label: 'Raw Log Source', simpleDef: 'Lines of text', techDef: 'Streaming lines via stdin / stdout file descriptors', badge: 'Source', color: '#38bdf8' },
          { id: 'pipe1', label: 'grep "ERROR"', simpleDef: 'Filter lines', techDef: 'Pattern matching discarding non-matching lines', badge: 'Filter', color: '#10b981' },
          { id: 'pipe2', label: 'awk \'{print $9}\'', simpleDef: 'Extract column', techDef: 'Field extraction splitting by whitespace delimiter', badge: 'Transform', color: '#a855f7' },
          { id: 'pipe3', label: 'sort | uniq -c', simpleDef: 'Aggregate & count', techDef: 'Sorts tokens and counts frequency occurrences', badge: 'Aggregate', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Stream', simple: 'A continuous flow of data passing through a pipe from one program into another.', technical: 'Sequence of bytes transferred between process standard I/O streams.' },
        { term: 'Composability', simple: 'The ability to connect small simple programs together to solve huge complex tasks.', technical: 'System design property where components can be selected and assembled in various combinations.' }
      ],
      syntaxCode: 'echo "unix text processing" | tr \'a-z\' \'A-Z\'',
      syntaxTokens: [
        { token: 'echo "unix text processing"', role: 'command', explanation: 'Generate sample text stream' },
        { token: '|', role: 'operator', explanation: 'Pipe operator passing stdout of echo to stdin of tr' },
        { token: 'tr \'a-z\' \'A-Z\'', role: 'command', explanation: 'Translate lowercase character set to uppercase' }
      ],
      variations: [
        { command: 'cat /etc/passwd | cut -d: -f1', description: 'Extract list of all usernames from /etc/passwd' },
        { command: 'cat access.log | grep -v "200" | head -n 10', description: 'Filter out successful requests and inspect first 10 errors' }
      ],
      expectedOutput: 'UNIX TEXT PROCESSING',
      commonMistakes: [
        { mistake: 'Using "cat file | grep pattern" (Useless Use of Cat)', whyWrong: 'grep accepts filenames directly: "grep pattern file"; piping cat spawns an unneeded subshell and process fork.', correctWay: 'Pass the file directly: "grep pattern file".' },
        { mistake: 'Overcomplicating simple text tasks with heavy programming languages', whyWrong: 'Opening Jupyter notebooks or writing Node.js scripts just to find unique IP addresses wastes time.', correctWay: 'Use standard Unix text tools: "awk \'{print $1}\' log | sort -u".' }
      ],
      safeRecovery: 'To preview output of any long pipeline safely, pipe to "head -n 10" or "less".'
    }),

    buildLinuxConcept({
      id: 'c-19-02',
      subChapterNumber: '19.2',
      command: 'cut -d: -f1,7 /etc/passwd | head -n 5',
      title: 'cut (Extracting Columns and Fields)',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Delimited column extraction: isolating fields (-f), delimiters (-d), and byte/character slicing (-c)',
      badges: ['cut', 'Columns', 'Delimiters'],
      difficulty: 'Beginner',
      quote: 'When text is structured in delimited columns, cut is the scalpel that extracts exactly the fields you need.',
      whatIsIt: '"cut" is a core POSIX utility designed to extract sections from each line of a file or input stream. It operates in two primary modes: 1) Delimited field extraction using "-d <delimiter>" and "-f <field_list>" (e.g. cut -d: -f1 to extract column 1 of colon-separated files like /etc/passwd or cut -d, -f2 for CSVs); and 2) Fixed-width character/byte slicing using "-c <range>" (e.g. cut -c 1-10 to grab the first 10 characters of every line).',
      inSimpleWords: 'A column cutter. If you have a spreadsheet or text file separated by commas or colons, cut chops out just the columns you want and throws the rest away.',
      whyDoYouNeedIt: 'Linux configuration files (like /etc/passwd, /etc/group) and CSV exports are delimited. cut extracts usernames, UIDs, or data points in a single, fast command.',
      realWorldScenario: 'You need a clean list of all user accounts and their login shells on a server. You run "cut -d: -f1,7 /etc/passwd" to slice out fields 1 and 7 in under 5 milliseconds.',
      realWorldAnalogy: 'Using scissors to cut out only the "Phone Number" column from a printed phone directory table.',
      withoutVsWith: {
        without: {
          title: 'Manual Column Slicing',
          items: ['Opening files in spreadsheet software just to copy a single column', 'Writing multi-line split() scripts in Python or Ruby for basic delimiters', 'Slow parsing of large CSV files'],
          outcome: 'Wasted time and complex dependencies for simple column extraction.'
        },
        with: {
          title: 'Instant Column Extraction with cut',
          items: ['Sub-millisecond processing of multi-gigabyte files directly from standard input', 'Flexible field selection: single fields (-f1), ranges (-f2-4), or lists (-f1,3,7)', 'Clean integration with sort, uniq, and awk pipelines'],
          outcome: 'Rapid data extraction and streamlined scripting.'
        }
      },
      blockDiagram: {
        title: 'cut Field Extraction Breakdown',
        subtitle: 'Extracting fields 1 and 7 with colon delimiter (-d: -f1,7):',
        nodes: [
          { id: 'raw', label: 'root:x:0:0:root:/root:/bin/bash', simpleDef: '7 colon-separated fields', techDef: 'Input record with ":" delimiter', badge: 'Input', color: '#38bdf8' },
          { id: 'f1', label: 'Field 1: "root"', simpleDef: 'Username column', techDef: 'First token before first ":" delimiter', badge: 'Field 1', color: '#10b981' },
          { id: 'f7', label: 'Field 7: "/bin/bash"', simpleDef: 'Shell column', techDef: 'Seventh token after sixth ":" delimiter', badge: 'Field 7', color: '#a855f7' },
          { id: 'out', label: 'Output: "root:/bin/bash"', simpleDef: 'Joined with delimiter', techDef: 'Output fields reassembled with output delimiter', badge: 'Output', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Delimiter (-d)', simple: 'The character that separates columns (like a comma, colon, or tab).', technical: 'Character used as the field separator (defaults to TAB if unspecified).' },
        { term: 'Field (-f)', simple: 'The column number you want to extract (1, 2, 3...).', technical: 'One-based index or range of fields to select from each input line.' }
      ],
      syntaxCode: 'cut -d: -f1,7 /etc/passwd | head -n 5',
      syntaxTokens: [
        { token: 'cut', role: 'command', explanation: 'Remove sections from each line of files' },
        { token: '-d:', role: 'option', explanation: 'Use colon ":" as the field delimiter instead of default TAB' },
        { token: '-f1,7', role: 'option', explanation: 'Select only fields 1 and 7' },
        { token: '/etc/passwd', role: 'path', explanation: 'Source file to read' },
        { token: '| head -n 5', role: 'argument', explanation: 'Limit output to first 5 lines' }
      ],
      variations: [
        { command: 'cut -d, -f2 data.csv', description: 'Extract column 2 from a comma-separated CSV file' },
        { command: 'cut -c 1-8 /etc/issue', description: 'Extract characters 1 through 8 from each line' },
        { command: 'cut -d: --complement -f2 /etc/passwd', description: 'Complement mode: print all fields EXCEPT field 2' }
      ],
      expectedOutput: 'root:/bin/bash\ndaemon:/usr/sbin/nologin\nbin:/usr/sbin/nologin\nsys:/usr/sbin/nologin\nsync:/bin/sync',
      commonMistakes: [
        { mistake: 'Trying to use cut on whitespace with multiple spaces (e.g. ps aux | cut -d" " -f1)', whyWrong: 'cut treats each consecutive space as a separate empty field, breaking field numbers! Use awk for variable whitespace.', correctWay: 'Use "awk \'{print $1}\'" when columns are separated by multiple spaces.' },
        { mistake: 'Using "-c" instead of "-f" for delimited files', whyWrong: '"-c" counts raw characters, not columns; if fields vary in length, character offsets will slice words in half.', correctWay: 'Use "-f" with a delimiter ("-d") for structured tables.' }
      ],
      safeRecovery: 'If your data is separated by irregular spaces, switch from cut to awk: "awk \'{print $1, $2}\'".'
    }),

    buildLinuxConcept({
      id: 'c-19-03',
      subChapterNumber: '19.3',
      command: 'paste -d, <(echo -e "A\\nB") <(echo -e "1\\n2")',
      title: 'paste and join',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Horizontal data merging: combining side-by-side lines with paste and relational database joins with join',
      badges: ['paste', 'join', 'Merging'],
      difficulty: 'Intermediate',
      quote: 'cat merges files vertically (top-to-bottom); paste merges files horizontally (side-by-side).',
      whatIsIt: 'While "cat" stacks files vertically (concatenation), "paste" merges files horizontally side-by-side, joining corresponding lines from each file with a delimiter (default is TAB). It is ideal for combining parallel lists (e.g. list of IPs and list of hostnames into a CSV). "join" performs relational database-style INNER JOIN operations: it matches lines from two pre-sorted files on a shared common key field (like SQL "SELECT * FROM a JOIN b ON a.id = b.id").',
      inSimpleWords: '"paste" glues two lists side by side into columns. "join" acts like an SQL database join: it matches rows that share the same ID number and combines their information.',
      whyDoYouNeedIt: 'Generating CSV reports, merging performance telemetry metrics with server hostnames, or reconciling user account databases across systems.',
      realWorldScenario: 'You have a list of server hostnames in "hosts.txt" and their corresponding CPU usage numbers in "cpu.txt". Running "paste -d, hosts.txt cpu.txt > report.csv" joins them into a ready-to-chart CSV in 1 second.',
      realWorldAnalogy: 'Zipping a zipper: the teeth from the left file and right file interlock side-by-side to form a single combined strip.',
      withoutVsWith: {
        without: {
          title: 'Manual Line-by-Line Merging',
          items: ['Writing complex nested bash loops with multiple file descriptors to merge two files', 'Importing data into SQL databases or Excel just to merge two column lists', 'Slow execution and potential misalignment errors'],
          outcome: 'Complex scripts and slow reporting workflows.'
        },
        with: {
          title: 'Horizontal Merging with paste & join',
          items: ['Instant single-command horizontal column merging with customizable delimiters (-d)', 'Relational database key matching using native POSIX "join"', 'Seamless integration with Process Substitution <(cmd)'],
          outcome: 'Lightning-fast reporting and simple, elegant data pipelines.'
        }
      },
      blockDiagram: {
        title: 'paste vs join Comparison',
        subtitle: 'Two methods of horizontal data merging:',
        nodes: [
          { id: 'paste', label: 'paste -d, file1 file2', simpleDef: 'Line-by-line merge', techDef: 'Merges line N of file1 with line N of file2 regardless of contents', badge: 'paste (Positional)', color: '#38bdf8' },
          { id: 'join', label: 'join -t: file1 file2', simpleDef: 'Key-based relational match', techDef: 'Matches records sharing a common sorted key field (like SQL JOIN)', badge: 'join (Relational)', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'paste', simple: 'A command that combines multiple files side-by-side into columns.', technical: 'POSIX utility merging corresponding lines of given input files separated by TABs.' },
        { term: 'join', simple: 'A command that merges lines from two files that have matching values in a key column.', technical: 'Relational database join utility joining lines of two sorted files on a common field.' }
      ],
      syntaxCode: 'paste -d, <(echo -e "A\\nB") <(echo -e "1\\n2")',
      syntaxTokens: [
        { token: 'paste', role: 'command', explanation: 'Merge lines of files horizontally' },
        { token: '-d,', role: 'option', explanation: 'Specify comma as the joining delimiter character' },
        { token: '<(echo -e "A\\nB")', role: 'path', explanation: 'Process substitution presenting command output as a temporary file stream' },
        { token: '<(echo -e "1\\n2")', role: 'path', explanation: 'Second file stream to merge side-by-side' }
      ],
      variations: [
        { command: 'paste file1.txt file2.txt', description: 'Merge two files side by side separated by default TAB character' },
        { command: 'paste -s -d, names.txt', description: 'Serial mode (-s): convert a vertical list into a single comma-separated horizontal line' },
        { command: 'join -t: file1.sorted file2.sorted', description: 'Perform relational join on colon-delimited sorted files' }
      ],
      expectedOutput: 'A,1\nB,2',
      commonMistakes: [
        { mistake: 'Running "join" on unsorted files and getting missing matches', whyWrong: 'The "join" utility requires BOTH input files to be sorted lexicographically on the join field; unsorted files cause premature EOF.', correctWay: 'Sort files first: "join <(sort file1) <(sort file2)".' },
        { mistake: 'Confusing "cat" with "paste"', whyWrong: '"cat" stacks files vertically (file2 below file1); "paste" puts them side by side as columns.', correctWay: 'Use "paste" when you want side-by-side columns.' }
      ],
      safeRecovery: 'To turn any vertical column of text into a single comma-separated line, use: "paste -s -d, file.txt".'
    }),

    buildLinuxConcept({
      id: 'c-19-04',
      subChapterNumber: '19.4',
      command: 'echo "HELLO LINUX" | tr \'A-Z\' \'a-z\'',
      title: 'tr (Translate and Delete Characters)',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Stream character transformation: character-by-character translation, deleting (-d), and squeezing repeats (-s)',
      badges: ['tr', 'Translate', 'Clean Text'],
      difficulty: 'Beginner',
      quote: 'tr is the fastest character cleaner in Unix: convert case, delete non-printables, or squeeze duplicate spaces.',
      whatIsIt: '"tr" (Translate) is a compact, high-speed POSIX filter that translates, squeezes, or deletes characters from standard input and writes to standard output. Unlike sed (which matches full regular expression strings), tr operates strictly on single characters: it maps each character in Set1 to the corresponding character in Set2. Key operational flags include: "-d" (delete all matching characters), "-s" (squeeze: collapses consecutive identical characters into a single instance), and "-c" (complement: matches all characters NOT in the set).',
      inSimpleWords: 'A character replacer. You use it to change all uppercase letters to lowercase, delete all punctuation, or turn tabs into spaces.',
      whyDoYouNeedIt: 'Sanitizing user inputs, normalizing log strings to lowercase for case-insensitive processing, or generating random passwords from /dev/urandom.',
      realWorldScenario: 'You are generating a secure random 16-character alphanumeric password on a server. You run: "cat /dev/urandom | tr -dc \'a-zA-Z0-9\' | head -c 16; echo" to instantly filter out binary junk and keep only clean characters.',
      realWorldAnalogy: 'A typewriter where pressing the "A" key automatically strikes the letter "a" instead.',
      withoutVsWith: {
        without: {
          title: 'Using Heavy Tools for Character Replacement',
          items: ['Spawning heavy sed or python scripts just to change uppercase to lowercase', 'Struggling to clean raw binary streams from /dev/urandom', 'Clumsy multi-step regexes to remove carriage return (\\r) characters'],
          outcome: 'Slow execution and complex regexes for simple character tasks.'
        },
        with: {
          title: 'High-Speed Filtering with tr',
          items: ['Ultra-fast character mapping executed at millions of characters per second', 'Effortless Windows-to-Unix newline conversion: tr -d "\\r"', 'Squeezing multi-space output into single spaces for easy parsing (tr -s " ")'],
          outcome: 'Sub-millisecond character transformation and clean, sanitized data.'
        }
      },
      blockDiagram: {
        title: 'tr Character Mapping Mechanism',
        subtitle: '1-to-1 character translation from Set1 to Set2:',
        nodes: [
          { id: 'in', label: 'Input Stream: "ABC"', simpleDef: 'Input string', techDef: 'Bytes read from standard input file descriptor 0', badge: 'Input', color: '#38bdf8' },
          { id: 'map', label: 'Set1 (\'A-Z\') -> Set2 (\'a-z\')', simpleDef: 'Direct lookup table', techDef: '256-byte direct array lookup mapping ASCII 65-90 to 97-122', badge: 'Lookup Map', color: '#10b981' },
          { id: 'out', label: 'Output Stream: "abc"', simpleDef: 'Translated string', techDef: 'Transformed bytes written to standard output', badge: 'Output', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'tr -d (Delete)', simple: 'Deletes every occurrence of the specified characters from the text.', technical: 'Discards bytes matching characters in SET1 from the output stream.' },
        { term: 'tr -s (Squeeze)', simple: 'Shrinks repeated characters into one (e.g. turning "     " into " ").', technical: 'Replaces sequences of identical input characters with a single character instance.' }
      ],
      syntaxCode: 'echo "HELLO LINUX" | tr \'A-Z\' \'a-z\'',
      syntaxTokens: [
        { token: 'echo "HELLO LINUX"', role: 'command', explanation: 'Generate sample uppercase text' },
        { token: '|', role: 'operator', explanation: 'Pipe operator transferring stdout to stdin' },
        { token: 'tr', role: 'command', explanation: 'Translate or delete characters filter' },
        { token: '\'A-Z\'', role: 'argument', explanation: 'Set 1: source uppercase character range' },
        { token: '\'a-z\'', role: 'argument', explanation: 'Set 2: destination lowercase replacement range' }
      ],
      variations: [
        { command: 'cat dos_file.txt | tr -d "\\r" > unix_file.txt', description: 'Strip Windows carriage return characters (\\r) from text file' },
        { command: 'cat /etc/issue | tr -s " "', description: 'Squeeze multiple consecutive spaces into a single space' },
        { command: 'cat /dev/urandom | tr -dc \'A-Za-z0-9\' | head -c 12', description: 'Generate random 12-character alphanumeric password string' }
      ],
      expectedOutput: 'hello linux',
      commonMistakes: [
        { mistake: 'Trying to pass a filename directly to tr: tr a-z A-Z file.txt', whyWrong: 'tr DOES NOT accept filenames as arguments; it operates strictly on standard input!', correctWay: 'Pipe the file or use redirection: "tr a-z A-Z < file.txt" or "cat file.txt | tr a-z A-Z".' },
        { mistake: 'Trying to replace full words with tr: tr "cat" "dog"', whyWrong: 'tr replaces individual characters, not words! It will replace every "c" with "d", "a" with "o", and "t" with "g".', correctWay: 'Use "sed \'s/cat/dog/g\'" for multi-character word replacements.' }
      ],
      safeRecovery: 'Remember that tr requires input from stdin: always use "tr ... < filename" or pipe into it.'
    }),

    buildLinuxConcept({
      id: 'c-19-05',
      subChapterNumber: '19.5',
      command: 'sed --version | head -n 1',
      title: 'sed: Stream Editor Basics',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'The non-interactive stream editor: pattern spaces, hold spaces, cycle execution, and scripts',
      badges: ['sed', 'Stream Editor', 'Automation'],
      difficulty: 'Intermediate',
      quote: 'sed is the automated text editor: modify files line-by-line without ever opening an interactive screen.',
      whatIsIt: '"sed" (Stream Editor) is a non-interactive, programmable text editor developed in 1974 by Lee E. McMahon at Bell Labs. While interactive editors (like nano or vim) require a human typing keystrokes on a screen, sed reads input line-by-line, places each line into an internal temporary buffer called the Pattern Space, applies user-defined editing commands, and outputs the result to standard output. It is the universal tool for batch search-and-replace, deleting lines, inserting headers, and transforming configurations in CI/CD automation.',
      inSimpleWords: 'A robot text editor. Instead of opening a file in nano, finding a word, and typing a change by hand, you give sed a one-line command and it performs the edit across a thousand files in one second.',
      whyDoYouNeedIt: 'In automated cloud deployments (Dockerfiles, Ansible, cloud-init), there is no human sitting at a screen to edit configuration files. sed modifies settings inside /etc/nginx/nginx.conf or /etc/ssh/sshd_config programmatically.',
      realWorldScenario: 'You are spinning up a Docker container for a web app. The container startup script runs: "sed -i \"s/API_URL_PLACEHOLDER/$API_URL/g\" /var/www/index.html" to inject the dynamic cloud API URL before launching Nginx.',
      realWorldAnalogy: 'An automated laser labeling machine on a factory assembly line that burns a customized barcode onto every box as it passes by on the conveyor belt.',
      withoutVsWith: {
        without: {
          title: 'Manual Interactive Text Editing',
          items: ['Opening files manually in nano/vim on every server to tweak configuration parameters', 'Human error: accidentally deleting an adjacent line or introducing syntax typos', 'Impossible to automate inside headless Dockerfile container builds'],
          outcome: 'Slow manual configuration and broken automated builds.'
        },
        with: {
          title: 'Automated Stream Editing with sed',
          items: ['100% automated, programmatic file modifications inside CI/CD and Dockerfiles', 'Precise regex-driven pattern replacement across hundreds of files simultaneously', 'Safe dry-run previewing to terminal before committing changes to disk'],
          outcome: 'Repeatable, version-controllable infrastructure automation.'
        }
      },
      blockDiagram: {
        title: 'sed Execution Cycle',
        subtitle: 'How sed processes every line of input:',
        nodes: [
          { id: 'read', label: '1. Read Line to Pattern Space', simpleDef: 'Pulls next line', techDef: 'Reads line from stdin/file into internal pattern space buffer', badge: 'Read', color: '#38bdf8' },
          { id: 'script', label: '2. Execute sed Commands', simpleDef: 'Apply edits', techDef: 'Applies substitutions (s), deletions (d), or appends (a)', badge: 'Transform', color: '#10b981' },
          { id: 'print', label: '3. Output & Flush Buffer', simpleDef: 'Print result', techDef: 'Writes pattern space to stdout (unless suppressed with -n) and clears buffer', badge: 'Flush', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'Pattern Space', simple: 'The temporary scratchpad in RAM where sed holds the line it is currently editing.', technical: 'Working buffer holding current input line during execution cycle.' },
        { term: 'Hold Space', simple: 'A secondary storage buffer where sed can store text to be reused across lines.', technical: 'Auxiliary buffer used for multi-line advanced scripting and registers.' }
      ],
      syntaxCode: 'sed --version | head -n 1',
      syntaxTokens: [
        { token: 'sed', role: 'command', explanation: 'Stream editor utility' },
        { token: '--version', role: 'option', explanation: 'Display version and copyright information' },
        { token: '| head -n 1', role: 'argument', explanation: 'Limit output display to the primary version banner line' }
      ],
      variations: [
        { command: 'sed --version', description: 'Inspect installed GNU sed version details' },
        { command: 'sed -n \'1,5p\' /etc/passwd', description: 'Print only lines 1 through 5 (suppressing default output with -n)' }
      ],
      expectedOutput: 'sed (GNU sed) 4.8\nCopyright (C) 2020 Free Software Foundation, Inc.',
      commonMistakes: [
        { mistake: 'Forgetting that sed prints all lines by default', whyWrong: 'sed prints every line unless modified or suppressed; if you only want matching lines, you must add the "-n" flag.', correctWay: 'Use "sed -n \'/pattern/p\' file" when filtering specific lines.' },
        { mistake: 'Confusing GNU sed syntax with macOS/BSD sed syntax', whyWrong: 'macOS BSD sed requires an empty argument for in-place edits (sed -i \'\' ...), which breaks on GNU Linux.', correctWay: 'Use "sed -i \'...\'" on Linux; avoid empty quotes.' }
      ],
      safeRecovery: 'Always test sed commands without the "-i" flag first to view the output on your terminal screen before writing changes to disk.'
    }),

    buildLinuxConcept({
      id: 'c-19-06',
      subChapterNumber: '19.6',
      command: 'echo "foo bar foo" | sed \'s/foo/baz/g\'',
      title: 'sed: Find and Replace (s/old/new/g)',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'The universal substitution command: regex patterns, global flags (g), capture groups, and custom delimiters',
      badges: ['sed', 'Regex', 'Substitution'],
      difficulty: 'Beginner',
      quote: 's/find/replace/g is the most famous command in Unix: search with regular expressions and replace across streams.',
      whatIsIt: 'The substitution command "s/pattern/replacement/flags" is the most widely used feature of sed. Syntax breakdown: 1) "s" initiates the substitution command; 2) The delimiter (usually "/", but any character like "#" or "|" can be used); 3) The search pattern (POSIX regular expression); 4) The replacement text; and 5) Optional trailing flags: "g" (global: replace ALL matches on each line, not just the first), "i" (case-insensitive), or a number (replace only the Nth occurrence).',
      inSimpleWords: 'Find and replace. You tell it: "Find the word \'foo\' and replace it with \'baz\' everywhere in the text."',
      whyDoYouNeedIt: 'Renaming variables across source files, changing database hostnames in config files, or updating IP addresses is done with sed find-and-replace.',
      realWorldScenario: 'You are migrating an application from staging to production. You run: "sed -i \'s/db-staging.internal/db-prod.internal/g\' config.env" to update the database connection string instantly.',
      realWorldAnalogy: 'Using the "Replace All" dialog box in Microsoft Word or Google Docs, but running it in 2 milliseconds from the terminal.',
      withoutVsWith: {
        without: {
          title: 'Manual Text Replacement',
          items: ['Opening 20 files in a GUI editor and pressing Ctrl+H to replace strings by hand', 'Missing files or making inconsistent replacements across server fleets', 'Inability to replace strings programmatically inside automated deployment pipelines'],
          outcome: 'Slow manual work, human mistakes, and deployment bottlenecks.'
        },
        with: {
          title: 'Automated Regex Replacement with sed',
          items: ['Global replacement across thousands of files with a single command', 'Support for capture groups (\\1, \\2) to re-order and manipulate substrings', 'Custom delimiters (s#http://#https://#g) eliminating messy backslash escapes'],
          outcome: 'Instant, error-free, and automated text transformations.'
        }
      },
      blockDiagram: {
        title: 'sed Substitution Anatomy',
        subtitle: 'Decoding "s/pattern/replacement/g":',
        nodes: [
          { id: 's', label: '"s"', simpleDef: 'Substitute Command', techDef: 'Instructs sed engine to execute regex substitution', badge: 'Command', color: '#38bdf8' },
          { id: 'del', label: '"/" (Delimiter)', simpleDef: 'Separator', techDef: 'Can be replaced with any character (e.g. s#old#new#g)', badge: 'Separator', color: '#64748b' },
          { id: 'pat', label: '"foo" (Pattern)', simpleDef: 'Search regex', techDef: 'POSIX Basic Regular Expression (BRE) to match', badge: 'Search', color: '#ef4444' },
          { id: 'rep', label: '"baz" (Replacement)', simpleDef: 'New text', techDef: 'Replacement payload (can reference \\1 capture groups)', badge: 'Payload', color: '#10b981' },
          { id: 'flg', label: '"g" (Global Flag)', simpleDef: 'All occurrences', techDef: 'Replaces all matches per line (without "g", only 1st match is replaced)', badge: 'Flag', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'Global Flag (g)', simple: 'Tells sed to replace EVERY match on the line, not just the very first one.', technical: 'Instructs substitution command to continue scanning line after first match.' },
        { term: 'Custom Delimiter', simple: 'Using "#" instead of "/" so you don\'t have to escape slashes in URLs or paths.', technical: 'Any character following "s" is parsed as the delimiter for that command.' }
      ],
      syntaxCode: 'echo "foo bar foo" | sed \'s/foo/baz/g\'',
      syntaxTokens: [
        { token: 'echo "foo bar foo"', role: 'command', explanation: 'Generate sample input string with two instances of "foo"' },
        { token: '|', role: 'operator', explanation: 'Pipe operator transferring stream to sed' },
        { token: 'sed', role: 'command', explanation: 'Stream editor' },
        { token: '\'s/foo/baz/g\'', role: 'argument', explanation: 'Substitute "foo" with "baz" globally across all occurrences' }
      ],
      variations: [
        { command: 'echo "http://example.com" | sed \'s#http://#https://#g\'', description: 'Use custom "#" delimiter to avoid escaping forward slashes in URLs' },
        { command: 'echo "FOO bar" | sed \'s/foo/baz/I\'', description: 'Case-insensitive substitution using "I" flag' },
        { command: 'echo "hello world" | sed -E \'s/([a-z]+) ([a-z]+)/\\2 \\1/\'', description: 'Capture groups: swap two words using Extended Regular Expressions (-E)' }
      ],
      expectedOutput: 'baz bar baz',
      commonMistakes: [
        { mistake: 'Forgetting the "g" flag at the end: sed \'s/foo/baz/\'', whyWrong: 'Without "g", sed will only replace the FIRST match on each line, leaving all subsequent matches unchanged!', correctWay: 'Always add "g" if you want all occurrences replaced: "s/foo/baz/g".' },
        { mistake: 'Leaning Toothpick Syndrome: escaping slashes in URLs: s/http:\\/\\/site\\.com/https:\\/\\/.../', whyWrong: 'Escaping multiple slashes with backslashes makes regexes unreadable and error-prone.', correctWay: 'Switch the delimiter to "#" or "|": "s#http://site.com#https://site.com#g".' }
      ],
      safeRecovery: 'Use custom delimiters like "s#old#new#g" whenever working with file paths or URLs to avoid escaping backslashes.'
    }),

    buildLinuxConcept({
      id: 'c-19-07',
      subChapterNumber: '19.7',
      command: 'sed \'1,3d\' /etc/issue 2>/dev/null || echo "sed delete demonstration"',
      title: 'sed: Line Deletion and Insertion (d, i, a)',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Line-level editing: deleting line ranges (d), inserting before (i), and appending after (a)',
      badges: ['sed', 'Delete', 'Insert', 'Lines'],
      difficulty: 'Intermediate',
      quote: 'sed isn\'t just search and replace: delete blank lines, strip comments, and inject configuration headers in one step.',
      whatIsIt: 'In addition to substitutions, sed provides powerful line-level operations addressed by line numbers or regex patterns: 1) "d" (delete): discards matching lines from the pattern space (e.g. sed \'/^#/d\' deletes all comment lines; sed \'/^$/d\' deletes all blank lines); 2) "i" (insert): inserts text before the addressed line; and 3) "a" (append): appends text after the addressed line. Multiple commands can be chained using "-e" or semicolons.',
      inSimpleWords: 'Deleting and inserting entire lines. You can tell sed: "Delete lines 1 through 3", "Delete all blank lines", or "Add a new line after line 10".',
      whyDoYouNeedIt: 'Cleaning up configuration files by stripping out clutter (comments and empty lines) or injecting required license headers into source code files.',
      realWorldScenario: 'You need to inspect an Nginx configuration file that has 200 lines of commented-out documentation. You run "sed \'/^\\s*#/d; /^$/d\' /etc/nginx/nginx.conf" to strip all comments and blank lines, leaving only the 15 active configuration directives.',
      realWorldAnalogy: 'Using a red marker to cross out unwanted paragraphs and a green pen to write new sentences in the margins of a printed draft.',
      withoutVsWith: {
        without: {
          title: 'Manual Configuration Cleanup',
          items: ['Scrolling through 500 lines of commented documentation to find 10 active settings', 'Manually deleting lines in a text editor across 50 configuration files', 'High risk of accidentally deleting active configuration lines'],
          outcome: 'Eye fatigue, wasted time, and accidental configuration errors.'
        },
        with: {
          title: 'Automated Line Manipulation with sed',
          items: ['Instant stripping of all comments and blank lines: sed -E \'/^[[:space:]]*#/d; /^$/d\'', 'Programmatic injection of security headers into configuration blocks', 'Targeted deletion by line number range (sed \'10,20d\') or regex match'],
          outcome: 'Crystal-clear configuration visibility and automated file transformations.'
        }
      },
      blockDiagram: {
        title: 'sed Line Operations',
        subtitle: 'Key line manipulation commands:',
        nodes: [
          { id: 'd', label: 'sed \'/pattern/d\' (Delete)', simpleDef: 'Discards matching lines', techDef: 'Deletes current pattern space and immediately starts next cycle', badge: 'Delete (d)', color: '#ef4444' },
          { id: 'i', label: 'sed \'1i Header\' (Insert)', simpleDef: 'Inserts BEFORE line', techDef: 'Outputs text before writing current pattern space to stdout', badge: 'Insert (i)', color: '#10b981' },
          { id: 'a', label: 'sed \'$a Footer\' (Append)', simpleDef: 'Appends AFTER line', techDef: 'Queues text to be output after current pattern space is written', badge: 'Append (a)', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'sed "d" Command', simple: 'Deletes the current line so it does not appear in the output.', technical: 'Discards the pattern space and cycles to next input line without printing.' },
        { term: 'sed "i" / "a"', simple: '"i" inserts text before the line; "a" appends text after the line.', technical: 'Stream editor commands queuing text for insertion or appending relative to address.' }
      ],
      syntaxCode: 'sed \'1,3d\' /etc/issue 2>/dev/null || echo "sed delete demonstration"',
      syntaxTokens: [
        { token: 'sed', role: 'command', explanation: 'Stream editor utility' },
        { token: '\'1,3d\'', role: 'argument', explanation: 'Address range: delete lines 1 through 3' },
        { token: '/etc/issue', role: 'path', explanation: 'Target file to read' },
        { token: '2>/dev/null || echo "..."', role: 'operator', explanation: 'Graceful fallback handling' }
      ],
      variations: [
        { command: 'sed \'/^$/d\' file.txt', description: 'Delete all empty / blank lines from file' },
        { command: 'sed \'/^#/d\' /etc/hosts', description: 'Delete all lines starting with comment symbol "#"' },
        { command: 'sed \'1i # MANAGED BY ANSIBLE - DO NOT EDIT\' config.conf', description: 'Insert warning header at line 1 of the file' }
      ],
      expectedOutput: '(Deletes lines 1-3 of target file and prints remaining content)',
      commonMistakes: [
        { mistake: 'Running "sed \'/^#/d\'" and wondering why lines with indented comments are not deleted', whyWrong: '"^#" only matches lines where "#" is on column 1; lines with spaces before "#" (like "  # comment") will survive.', correctWay: 'Use "sed \'/^[[:space:]]*#/d\'" to match indented comments too.' },
        { mistake: 'Trying to delete a line and replace it in the same cycle without semicolons', whyWrong: 'sed commands must be separated by semicolons or separate "-e" flags.', correctWay: 'Chain commands: "sed -e \'/pattern/d\' -e \'s/old/new/g\' file".' }
      ],
      safeRecovery: 'To preview what will remain after deleting lines, run the sed command without "-i" to view output in your terminal.'
    }),

    buildLinuxConcept({
      id: 'c-19-08',
      subChapterNumber: '19.8',
      command: 'sed --help | grep -E -- "-i|--in-place"',
      title: 'sed: In-place File Editing (sed -i)',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Modifying files directly on disk: atomic temp file creation, backup extensions (sed -i.bak), and symlink safety',
      badges: ['sed -i', 'In-Place', 'Disk Edits'],
      difficulty: 'Intermediate',
      quote: 'sed -i modifies files directly on disk: always create an automatic backup with sed -i.bak before making destructive edits.',
      whatIsIt: 'By default, sed is a stream filter that reads input and writes to stdout without touching the original file on disk. The "-i" (--in-place) option instructs sed to write modifications directly back to the target file. Under the hood, sed does NOT edit the file in-place; instead, it writes output to a temporary file in the same directory and then atomically renames it over the original file (via rename syscall). Crucially, passing a suffix like "-i.bak" tells sed to save an untouched backup copy of the original file before overwriting.',
      inSimpleWords: 'Direct saving. Instead of just printing the changes to your terminal screen, "-i" actually saves the changes permanently to the file on your hard drive.',
      whyDoYouNeedIt: 'In automated deployment scripts, you need to change settings inside files on disk permanently without manually opening editors or managing temporary redirect files.',
      realWorldScenario: 'You are provisioning 100 Linux servers. You need to update the NTP time server IP in /etc/chrony.conf. You run: "sudo sed -i.bak \'s/old.pool.ntp.org/new.pool.ntp.org/g\' /etc/chrony.conf". The edit is applied instantly and /etc/chrony.conf.bak is preserved for safety.',
      realWorldAnalogy: 'Editing a document on your computer and hitting "Save" (Ctrl+S) while automatically keeping a backup copy on your desktop.',
      withoutVsWith: {
        without: {
          title: 'The Redirect Trap: sed ... file > file',
          items: ['Running "sed \'s/old/new/\' file > file" COMPLETELY WIPES AND EMPTIES THE FILE TO 0 BYTES!', 'Need to manually create temporary files: sed ... file > tmp && mv tmp file', 'No automatic safety backup if a regex typo ruins the configuration file'],
          outcome: 'Accidental file destruction and clumsy multi-step bash scripts.'
        },
        with: {
          title: 'Atomic In-Place Editing with sed -i',
          items: ['Single clean command permanently updating files on disk directly', 'Instant automated safety backups: sed -i.bak creates a pre-change copy', 'Atomic rename operations preventing partially written files if power is lost'],
          outcome: 'Clean, safe, and atomic file modifications.'
        }
      },
      blockDiagram: {
        title: 'sed -i Atomic Save Mechanism',
        subtitle: 'Why sed -i never leaves partially written files:',
        nodes: [
          { id: 'orig', label: 'Original: file.txt', simpleDef: 'Existing file on disk', techDef: 'Inode 12345 holding original text', badge: 'Source', color: '#38bdf8' },
          { id: 'bak', label: 'Backup: file.txt.bak', simpleDef: 'If -i.bak: saves copy', techDef: 'Hard link or copy created preserving original state', badge: 'Backup', color: '#10b981' },
          { id: 'temp', label: 'Temporary: sedXXXXXX', simpleDef: 'Writes changes to temp', techDef: 'Writes transformed pattern space to hidden temporary file', badge: 'Temp Write', color: '#a855f7' },
          { id: 'atom', label: 'Atomic rename()', simpleDef: 'Atomic overwrite', techDef: 'Atomic rename(temp, file.txt) replaces target instantly', badge: 'Atomic Commit', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'sed -i', simple: 'In-place mode: writes the changes directly into the file on disk.', technical: 'Option instructing sed to write output to temporary file and atomically rename over target.' },
        { term: 'The Redirect Trap', simple: 'Writing "command file > file" will empty the file because the shell truncates the file first!', technical: 'Shell output redirection (">") invokes open(O_TRUNC) before executing command.' }
      ],
      syntaxCode: 'sed --help | grep -E -- "-i|--in-place"',
      syntaxTokens: [
        { token: 'sed --help', role: 'command', explanation: 'Query sed documentation' },
        { token: '| grep -E', role: 'operator', explanation: 'Pipe to extended regular expression search' },
        { token: '"-i|--in-place"', role: 'argument', explanation: 'Filter documentation for the in-place editing flag' }
      ],
      variations: [
        { command: 'sed -i \'s/DEBUG=True/DEBUG=False/g\' settings.py', description: 'Permanently update file in-place on disk' },
        { command: 'sed -i.bak \'s/80/8080/g\' /etc/nginx/nginx.conf', description: 'Safely edit in-place while saving backup copy to /etc/nginx/nginx.conf.bak' },
        { command: 'sed -i --follow-symlinks \'s/old/new/g\' /etc/system_link', description: 'Follow symlinks and modify the destination file rather than breaking the link' }
      ],
      expectedOutput: '  -i[SUFFIX], --in-place[=SUFFIX]\n                 edit files in place (makes backup if SUFFIX supplied)',
      commonMistakes: [
        { mistake: 'Running "sed \'s/foo/bar/g\' file.txt > file.txt" (The Redirection Disaster)', whyWrong: 'The shell truncates file.txt to 0 bytes BEFORE sed even starts reading! You will erase the entire file!', correctWay: 'ALWAYS use "sed -i \'s/foo/bar/g\' file.txt".' },
        { mistake: 'Running "sed -i" on a symbolic link without "--follow-symlinks"', whyWrong: 'Because sed creates a new temporary file and renames it, the symlink is broken and replaced with a regular file.', correctWay: 'Add "--follow-symlinks" when editing symlinks in-place.' }
      ],
      safeRecovery: 'If you made an in-place editing mistake with "-i.bak", restore the original immediately: "mv file.txt.bak file.txt".'
    }),

    buildLinuxConcept({
      id: 'c-19-09',
      subChapterNumber: '19.9',
      command: 'awk --version | head -n 1',
      title: 'awk: The Text Processing Language',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'The Turing-complete stream processor: record-oriented parsing, C-like syntax, and gawk',
      badges: ['awk', 'gawk', 'Data Processing'],
      difficulty: 'Intermediate',
      quote: 'sed is an editor; awk is a full programming language created specifically to process tabular records and text data.',
      whatIsIt: '"awk" (named after its creators Alfred Aho, Peter Weinberger, and Brian Kernighan) is a full, Turing-complete pattern-scanning and data processing programming language designed in 1977. Unlike sed (which focuses on character streams and regex substitutions), awk is Record and Field oriented: it automatically splits every input line into structured fields ($1, $2, $3...) separated by whitespace or custom delimiters. awk features variables, arrays, associative hash maps, mathematical functions, if/else logic, and loops.',
      inSimpleWords: 'A mini programming language built specifically for data tables and logs. It automatically understands columns, numbers, and math, making it the ultimate tool for generating reports from logs.',
      whyDoYouNeedIt: 'When log analysis requires conditional logic, summing numbers (like calculating total bandwidth used), or filtering rows based on mathematical comparisons (status > 400), awk is infinitely faster and simpler than writing custom code.',
      realWorldScenario: 'You are analyzing an Nginx access log containing 500,000 requests. You need to calculate the total megabytes transferred today. A 1-line awk script sums column 10 (bytes sent) and prints the gigabyte total in 0.4 seconds.',
      realWorldAnalogy: 'An automated accountant who scans every receipt in a pile, adds up the totals, and prints a final financial summary.',
      withoutVsWith: {
        without: {
          title: 'Writing Heavy Python/Node Scripts for Table Data',
          items: ['Writing 30 lines of boilerplate file-opening and CSV-parsing code in Python', 'Slow startup times and memory overhead on busy production servers', 'Inability to embed analytical calculations directly inside shell pipelines'],
          outcome: 'Slow log analysis and cumbersome external scripts.'
        },
        with: {
          title: 'High-Speed Analytical Processing with awk',
          items: ['Turing-complete programming language built directly into every POSIX Linux system', 'Automatic whitespace and delimiter field splitting: $1, $2, $NF directly available', 'Built-in mathematical operations, associative arrays, and formatted printing (printf)'],
          outcome: 'Instant log calculations, sub-second reporting, and zero dependencies.'
        }
      },
      blockDiagram: {
        title: 'awk Execution Architecture',
        subtitle: 'The 3-stage awk execution pipeline:',
        nodes: [
          { id: 'begin', label: '1. BEGIN { ... }', simpleDef: 'Runs ONCE at start', techDef: 'Executes before any input lines are read (sets FS, initializes totals)', badge: 'Init', color: '#38bdf8' },
          { id: 'body', label: '2. /pattern/ { action }', simpleDef: 'Runs on EVERY line', techDef: 'Evaluates pattern on each record; splits into $1, $2... and runs block', badge: 'Record Loop', color: '#10b981' },
          { id: 'end', label: '3. END { ... }', simpleDef: 'Runs ONCE at finish', techDef: 'Executes after all input lines are consumed (prints final sum, averages)', badge: 'Report', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'awk', simple: 'A programming language designed specifically for processing text files and tabular data.', technical: 'Pattern scanning and processing language utility (GNU implementation is gawk).' },
        { term: 'Record', simple: 'A single line of text (by default, terminated by a newline character).', technical: 'Input chunk defined by Record Separator (RS, defaults to \\n).' }
      ],
      syntaxCode: 'awk --version | head -n 1',
      syntaxTokens: [
        { token: 'awk', role: 'command', explanation: 'Pattern scanning and processing language' },
        { token: '--version', role: 'option', explanation: 'Display version and copyright details' },
        { token: '| head -n 1', role: 'argument', explanation: 'Print the primary GNU Awk banner line' }
      ],
      variations: [
        { command: 'awk --version', description: 'Inspect installed GNU Awk (gawk) version' },
        { command: 'which awk gawk mawk', description: 'Verify which awk implementation is linked on the system' }
      ],
      expectedOutput: 'GNU Awk 5.1.0, API: 3.0 (GNU MPFR 4.1.0, GNU MP 6.2.1)\nCopyright (C) 1989, 1991-2020 Free Software Foundation, Inc.',
      commonMistakes: [
        { mistake: 'Using double quotes around awk scripts instead of single quotes', whyWrong: 'Double quotes cause Bash to expand "$1" and "$2" before awk ever sees them, breaking your awk script!', correctWay: 'ALWAYS enclose awk scripts in single quotes: awk \'{print $1}\'.' },
        { mistake: 'Confusing awk\'s $1 (column 1) with bash\'s $1 (script argument 1)', whyWrong: 'In bash, $1 is the first argument passed to the script; inside awk, $1 is the first column of the input line.', correctWay: 'Keep awk scripts in single quotes so bash does not expand awk\'s $1.' }
      ],
      safeRecovery: 'Always enclose awk programs in single quotes: \'awk \'{print $1}\' file\'.'
    }),

    buildLinuxConcept({
      id: 'c-19-10',
      subChapterNumber: '19.10',
      command: 'awk -F: \'{print $1, $NF}\' /etc/passwd | head -n 5',
      title: 'awk: Field Processing ($1, $2, $NF, NR)',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Column intelligence: automatic whitespace splitting, $0 (full line), $NF (last column), and NR (line number)',
      badges: ['awk', 'Fields', '$NF', 'NR'],
      difficulty: 'Beginner',
      quote: '$1 is the first column; $NF is the last column: awk navigates structured table columns with effortless precision.',
      whatIsIt: 'When awk reads an input record (line), it automatically parses it into positional field variables: 1) "$0" represents the entire unmodified line; 2) "$1", "$2", "$3"... represent the first, second, third columns; 3) "$NF" (Number of Fields) dynamically represents the VERY LAST column on the line, regardless of how many columns exist; 4) "NF" (without dollar sign) is the integer count of columns on the current line; and 5) "NR" (Number of Records) is the current line number being processed.',
      inSimpleWords: 'Automatic column counters. "$1" is column 1. "$2" is column 2. "$NF" is always the final column at the far right edge of the page, even if some lines have 5 columns and other lines have 10 columns.',
      whyDoYouNeedIt: 'In commands like "ls -l" or "ps aux", the filename or command string is always the last column, but the number of spaces varies. "$NF" extracts the last column perfectly every time.',
      realWorldScenario: 'You are inspecting a process table. You run "ps aux | awk \'{print $2, $NF}\'" to instantly extract a clean table containing only the Process ID ($2) and the executed binary path ($NF).',
      realWorldAnalogy: 'Looking at an itemized receipt: $1 is the store item name, and $NF is always the final dollar amount on the right margin.',
      withoutVsWith: {
        without: {
          title: 'Struggling with Irregular Column Offsets',
          items: ['Using "cut" on ps aux and failing because columns have different numbers of spaces', 'Inability to reliably target the last column when middle columns vary in count', 'Complex regexes needed just to isolate line numbers'],
          outcome: 'Broken column parsing and brittle text slicing.'
        },
        with: {
          title: 'Intelligent Field Processing with awk',
          items: ['Automatic collapsing of multiple consecutive whitespace spaces into clean columns', 'Dynamic last-column extraction ($NF) regardless of variable field counts', 'Built-in line numbering with NR for easy line filtering (NR > 1 skips headers)'],
          outcome: 'Bulletproof column extraction across all Linux commands.'
        }
      },
      blockDiagram: {
        title: 'awk Automatic Field Tokenization',
        subtitle: 'How awk parses: "root x 0 0 root /root /bin/bash"',
        nodes: [
          { id: 'zero', label: '$0 (Whole Line)', simpleDef: 'Entire raw string', techDef: 'Complete unparsed input record buffer', badge: '$0', color: '#64748b' },
          { id: 'f1', label: '$1: "root"', simpleDef: 'Column 1', techDef: 'First field token', badge: '$1', color: '#38bdf8' },
          { id: 'f3', label: '$3: "0"', simpleDef: 'Column 3 (UID)', techDef: 'Third field token', badge: '$3', color: '#10b981' },
          { id: 'nf', label: '$NF: "/bin/bash"', simpleDef: 'Last Column ($7)', techDef: 'Field index evaluated dynamically via NF (Number of Fields)', badge: '$NF', color: '#a855f7' }
        ]
      },
      terms: [
        { term: '$NF', simple: 'The value of the very last column on the line.', technical: 'Dereferenced field variable using NF count as the field index ($NF).' },
        { term: 'NR (Record Number)', simple: 'The current line number (line 1, line 2, line 3...).', technical: 'Built-in variable tracking total cumulative records read across all files.' }
      ],
      syntaxCode: 'awk -F: \'{print $1, $NF}\' /etc/passwd | head -n 5',
      syntaxTokens: [
        { token: 'awk', role: 'command', explanation: 'Pattern scanning and processing utility' },
        { token: '-F:', role: 'option', explanation: 'Set field separator delimiter to colon ":"' },
        { token: '\'{print $1, $NF}\'', role: 'argument', explanation: 'Action block: print first column ($1), a space, and the last column ($NF)' },
        { token: '/etc/passwd', role: 'path', explanation: 'Target file to read' },
        { token: '| head -n 5', role: 'argument', explanation: 'Limit output display to first 5 lines' }
      ],
      variations: [
        { command: 'awk \'{print $1}\' access.log', description: 'Extract IP address (column 1) from standard web server access logs' },
        { command: 'awk \'NR > 1 {print $1, $3}\'', description: 'Skip the header row (only process lines where NR is greater than 1)' },
        { command: 'awk \'{print NF, $0}\' file.txt', description: 'Print the count of words on each line followed by the line itself' }
      ],
      expectedOutput: 'root /bin/bash\ndaemon /usr/sbin/nologin\nbin /usr/sbin/nologin\nsys /usr/sbin/nologin\nsync /bin/sync',
      commonMistakes: [
        { mistake: 'Confusing "NF" with "$NF"', whyWrong: '"NF" is the NUMBER of columns (e.g. 7); "$NF" is the VALUE inside that 7th column (e.g. "/bin/bash")!', correctWay: 'Use "NF" for count, "$NF" for the actual text in the last column.' },
        { mistake: 'Forgetting the comma in print $1, $2', whyWrong: '"print $1 $2" glues the two words together with zero spaces; "print $1, $2" separates them with the output separator (space).', correctWay: 'Add a comma between fields to separate them with a space.' }
      ],
      safeRecovery: 'To skip header rows in any tabular output, start your awk script with "NR > 1 { ... }".'
    }),

    buildLinuxConcept({
      id: 'c-19-11',
      subChapterNumber: '19.11',
      command: 'awk -F: \'$3 >= 1000 {print $1, $3}\' /etc/passwd',
      title: 'awk: Pattern Matching and Actions',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Conditional processing: filtering rows by regular expression (/regex/) or numerical comparisons (field >= val)',
      badges: ['awk', 'Filtering', 'Patterns'],
      difficulty: 'Intermediate',
      quote: 'awk combines grep and cut into one: filter rows by pattern or mathematical condition, and extract columns simultaneously.',
      whatIsIt: 'The foundational structure of an awk program is: "pattern { action }". If a line matches the pattern, awk executes the action block enclosed in curly braces. Patterns can be: 1) Regular expressions: \'/error/\' matches lines containing "error"; 2) Field regex matching: \'$1 ~ /^[0-9]/\' matches lines where column 1 starts with a digit; 3) Numerical comparisons: \'$3 >= 1000\' matches lines where column 3 as an integer is greater than or equal to 1000; and 4) Compound boolean logic: \'$9 == 404 && $10 > 5000\'. If the action block is omitted, awk defaults to printing the matching line ({ print $0 }).',
      inSimpleWords: 'Filter and print in one step. Instead of running "grep" to find lines and then running "cut" to grab columns, awk does both: "Find all users whose ID is over 1000, and print their names."',
      whyDoYouNeedIt: 'Filtering system users (regular human accounts have UID >= 1000) or isolating specific HTTP status codes (HTTP 500) and printing only the request URL.',
      realWorldScenario: 'You are auditing user accounts on an Ubuntu server. System accounts have UIDs under 1000; human users have UIDs >= 1000. Running "awk -F: \'$3 >= 1000 && $3 != 65534 {print $1, $3}\' /etc/passwd" lists only human accounts.',
      realWorldAnalogy: 'A bouncer at a club door: checking IDs and only letting in guests who are 21 or older ($3 >= 21).',
      withoutVsWith: {
        without: {
          title: 'Chaining Multiple grep and cut Commands',
          items: ['Running "grep" then piping to "cut" then piping to another "grep"', 'Cannot perform numerical comparisons (grep cannot test if a number is greater than 1000)', 'Multiple subshell pipes slowing down log analysis'],
          outcome: 'Clumsy multi-pipe chains unable to evaluate numerical conditions.'
        },
        with: {
          title: 'Single-Pass Evaluation with awk',
          items: ['Unified pattern matching and column extraction in a single high-speed pass', 'Full numerical comparison operators (==, !=, <, >, <=, >=)', 'Complex boolean expressions combining regex and numbers: /POST/ && $9 == 500'],
          outcome: 'Elegant, ultra-fast, and mathematically capable data filtering.'
        }
      },
      blockDiagram: {
        title: 'awk Pattern { Action } Architecture',
        subtitle: 'How awk evaluates each line against conditions:',
        nodes: [
          { id: 'eval', label: 'Pattern Evaluation ($3 >= 1000)', simpleDef: 'Checks condition', techDef: 'Evaluates boolean expression or regular expression match', badge: 'Condition', color: '#38bdf8' },
          { id: 'match', label: 'If True: Execute { print $1, $3 }', simpleDef: 'Runs action block', techDef: 'Executes statements inside matching block for that record', badge: 'Action', color: '#10b981' },
          { id: 'nomatch', label: 'If False: Skip line silently', simpleDef: 'Skips line', techDef: 'Advances immediately to next record cycle without output', badge: 'Skip', color: '#64748b' }
        ]
      },
      terms: [
        { term: 'Pattern { Action }', simple: 'The fundamental rule of awk: "If this condition is met, do this action."', technical: 'Conditional clause governing execution of associated statement block per record.' },
        { term: '~ (Regex Match Operator)', simple: 'Checks if a specific column matches a regular expression (e.g. $1 ~ /^192/).', technical: 'Binary regex matching operator returning 1 on match and 0 on failure.' }
      ],
      syntaxCode: 'awk -F: \'$3 >= 1000 {print $1, $3}\' /etc/passwd',
      syntaxTokens: [
        { token: 'awk', role: 'command', explanation: 'Pattern scanning and processing language' },
        { token: '-F:', role: 'option', explanation: 'Set field delimiter to colon ":"' },
        { token: '\'$3 >= 1000', role: 'argument', explanation: 'Pattern: match only records where field 3 is greater than or equal to 1000' },
        { token: '{print $1, $3}\'', role: 'argument', explanation: 'Action: print field 1 (username) and field 3 (UID)' },
        { token: '/etc/passwd', role: 'path', explanation: 'Target system accounts file' }
      ],
      variations: [
        { command: 'awk \'$9 == 404 {print $7}\' access.log', description: 'Print URLs ($7) that returned HTTP 404 status ($9) from web logs' },
        { command: 'awk \'/ERROR/ {print $0}\' /var/log/syslog', description: 'Regex match: print all lines containing the word "ERROR"' },
        { command: 'awk \'$1 ~ /^192\\.168\\./ {print $1}\' access.log', description: 'Field regex match: print IPs starting with 192.168.' }
      ],
      expectedOutput: 'ubuntu 1000',
      commonMistakes: [
        { mistake: 'Putting curly braces around the pattern: awk \'{ $3 >= 1000 } { print $1 }\'', whyWrong: 'Patterns go OUTSIDE curly braces; putting it inside makes it an unexecuted statement, printing all lines!', correctWay: 'Pattern outside, action inside: "awk \'$3 >= 1000 {print $1}\'".' },
        { mistake: 'Using "=" instead of "==" for equality comparison', whyWrong: '"$9 = 404" assigns the value 404 to field 9, corrupting the data! "==" tests for equality.', correctWay: 'Always use "==" when comparing equality.' }
      ],
      safeRecovery: 'Remember that if you omit the action block, awk prints the whole line: "awk \'$3 >= 1000\' /etc/passwd".'
    }),

    buildLinuxConcept({
      id: 'c-19-12',
      subChapterNumber: '19.12',
      command: 'awk \'BEGIN {FS=":"; OFS=" -> "} {print $1, $3}\' /etc/passwd | head -n 5',
      title: 'awk: Built-in Variables and Functions (FS, OFS, length, substr)',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Mastering internal controls: Field Separators (FS, OFS), Record Separators (RS, ORS), and string functions',
      badges: ['awk', 'Variables', 'OFS', 'Functions'],
      difficulty: 'Intermediate',
      quote: 'FS controls what splits your inputs; OFS controls what formats your outputs: transform delimiters effortlessly.',
      whatIsIt: 'awk exposes built-in control variables that dictate how data is split and formatted: 1) "FS" (Field Separator, input delimiter, defaults to whitespace); 2) "OFS" (Output Field Separator, inserted between comma-separated print arguments, defaults to space); 3) "RS" (Record Separator, input line terminator, defaults to \\n); and 4) "ORS" (Output Record Separator, defaults to \\n). It also provides powerful built-in functions: "length(str)", "substr(str, start, len)", "tolower(str)", "toupper(str)", "split()", and "gsub()".',
      inSimpleWords: 'The master settings for awk. You can change the input delimiter from a colon to a comma, change how output columns are separated (e.g. into arrows " -> "), and use string functions like making text uppercase.',
      whyDoYouNeedIt: 'Converting colon-delimited files into clean CSVs or TSVs requires simply setting "BEGIN {FS=\":\"; OFS=\",\"}".',
      realWorldScenario: 'You are converting /etc/passwd into a comma-separated CSV report for an auditor. Setting "FS=\":\"; OFS=\",\"" transforms the entire file into a pristine CSV format in a single line.',
      realWorldAnalogy: 'A universal adapter plug: taking electricity in European format (FS=":") and outputting it in US format (OFS=",").',
      withoutVsWith: {
        without: {
          title: 'Manual Delimiter Wrangling',
          items: ['Using sed substitutions to replace delimiters after using cut', 'Struggling to format output columns with custom separators', 'Writing complex loops to calculate string lengths'],
          outcome: 'Multi-stage command chains and messy delimiter transformations.'
        },
        with: {
          title: 'Native Control Variables with awk',
          items: ['Instant conversion of input delimiters to custom output formats (OFS=" -> ")', 'Multi-character and regex input delimiters: FS="[,:]+"', 'Built-in string and math functions: length(), tolower(), substr(), sprintf()'],
          outcome: 'Precise formatting control and elegant single-command transformations.'
        }
      },
      blockDiagram: {
        title: 'FS vs OFS Transformation',
        subtitle: 'Converting input colons to output arrows:',
        nodes: [
          { id: 'in', label: 'Input: "root:x:0"', simpleDef: 'Colon-separated input', techDef: 'FS=":" splits input line by colons', badge: 'FS=":"', color: '#38bdf8' },
          { id: 'act', label: 'print $1, $3', simpleDef: 'Comma triggers OFS', techDef: 'Comma between arguments inserts OFS string', badge: 'Print', color: '#10b981' },
          { id: 'out', label: 'Output: "root -> 0"', simpleDef: 'Arrow-separated output', techDef: 'OFS=" -> " joins output fields seamlessly', badge: 'OFS=" -> "', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'FS (Field Separator)', simple: 'The character that separates columns in the input file (defaults to spaces/tabs).', technical: 'Built-in variable defining regular expression or character used to split records into fields.' },
        { term: 'OFS (Output Field Separator)', simple: 'The character placed between columns in the output (defaults to a single space).', technical: 'Built-in variable printed between items in a print statement separated by commas.' }
      ],
      syntaxCode: 'awk \'BEGIN {FS=":"; OFS=" -> "} {print $1, $3}\' /etc/passwd | head -n 5',
      syntaxTokens: [
        { token: 'awk', role: 'command', explanation: 'Pattern scanning and processing utility' },
        { token: '\'BEGIN {FS=":"; OFS=" -> "}', role: 'argument', explanation: 'Initialization block: set input separator to colon and output separator to arrow' },
        { token: '{print $1, $3}\'', role: 'argument', explanation: 'Action block: print fields 1 and 3 separated by OFS' },
        { token: '/etc/passwd', role: 'path', explanation: 'Target file to process' },
        { token: '| head -n 5', role: 'argument', explanation: 'Limit output display to first 5 lines' }
      ],
      variations: [
        { command: 'awk \'BEGIN {FS=":"; OFS=","} {print $1, $3, $6, $7}\' /etc/passwd', description: 'Convert /etc/passwd directly into a comma-separated CSV' },
        { command: 'awk \'{print toupper($1), length($1)}\' file.txt', description: 'Convert column 1 to uppercase and print its character length' },
        { command: 'awk \'{print substr($1, 1, 4)}\' file.txt', description: 'Extract the first 4 characters of column 1 using substr()' }
      ],
      expectedOutput: 'root -> 0\ndaemon -> 1\nbin -> 2\nsys -> 3\nsync -> 4',
      commonMistakes: [
        { mistake: 'Setting FS in the main body block instead of BEGIN', whyWrong: 'If you set FS in the main body, the first line will already be parsed using the default space separator before FS changes!', correctWay: 'Always set FS in the "BEGIN { ... }" block so it applies before line 1 is read.' },
        { mistake: 'Forgetting the comma in print when using OFS: print $1 $2', whyWrong: 'Without the comma, awk concatenates strings directly, ignoring OFS entirely!', correctWay: 'Separate fields with a comma: "print $1, $2".' }
      ],
      safeRecovery: 'Always set delimiter variables inside BEGIN: \'BEGIN { FS=":"; OFS="\\t" }\'.'
    }),

    buildLinuxConcept({
      id: 'c-19-13',
      subChapterNumber: '19.13',
      command: 'awk \'BEGIN {sum=0} {sum+=$1} END {print "Total:", sum}\' << \'EOF\'\n10\n20\n30\nEOF',
      title: 'awk: BEGIN and END Blocks',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Lifecycle hooks: pre-processing headers, state accumulation, and post-processing summary reports',
      badges: ['BEGIN/END', 'Aggregation', 'Reports'],
      difficulty: 'Intermediate',
      quote: 'BEGIN initializes the scorecard; the body counts the score; END prints the final championship trophy.',
      whatIsIt: 'In awk, "BEGIN" and "END" are special lifecycle pattern blocks: 1) The "BEGIN { ... }" block executes exactly once BEFORE any input files are opened or read. It is used to initialize variables, set delimiters (FS, OFS), and print report headers; 2) The main body block "{ ... }" executes repeatedly for EVERY line of input, accumulating sums or counting matches; 3) The "END { ... }" block executes exactly once AFTER all input lines have been processed, printing totals, averages, or final conclusions.',
      inSimpleWords: 'The opening ceremony and closing ceremony. BEGIN runs before reading any lines (to print a title). The middle runs on every line (to do the math). END runs after the whole file is finished (to print the final total).',
      whyDoYouNeedIt: 'Calculating statistical metrics from server logs—such as total bandwidth consumed, average response latency, or percentage error rate—is built with BEGIN and END blocks.',
      realWorldScenario: 'You need to know the total memory used by all Nginx worker processes. You run: "ps aux | grep nginx | awk \'BEGIN {sum=0} {sum+=$6} END {print \"Total Nginx RAM:\", sum/1024, \"MB\"}\'".',
      realWorldAnalogy: 'Running a marathon: BEGIN registers the runners, the middle counts the runners crossing checkpoints, and END awards the medals after the race finishes.',
      withoutVsWith: {
        without: {
          title: 'External Scripting for Aggregations',
          items: ['Piping numbers into heavy Python scripts just to sum a list of numbers', 'Writing multi-line bash while loops with cumbersome "$(( sum + val ))" math', 'Slow execution on multi-million line log files'],
          outcome: 'Slow log aggregations and complex multi-line scripting.'
        },
        with: {
          title: 'Streaming Aggregations with BEGIN/END',
          items: ['Instant single-line calculations of sums, averages, min/max, and percentages', 'Formatted tabular report generation with headers, data rows, and summary totals', 'Sub-second performance processing millions of log entries in pure streaming RAM'],
          outcome: 'Instant analytical power directly inside terminal pipelines.'
        }
      },
      blockDiagram: {
        title: 'awk BEGIN/Body/END Lifecycle',
        subtitle: 'The 3 phases of a complete awk aggregation program:',
        nodes: [
          { id: 'b', label: '1. BEGIN Block', simpleDef: 'Runs ONCE before input', techDef: 'Initializes counters: sum=0, count=0; prints report headers', badge: 'Preflight', color: '#38bdf8' },
          { id: 'm', label: '2. Main Body Loop', simpleDef: 'Runs on EVERY line', techDef: 'Executes for each line: sum += $1; count++', badge: 'Per Record', color: '#10b981' },
          { id: 'e', label: '3. END Block', simpleDef: 'Runs ONCE after input', techDef: 'Calculates avg = sum/count; prints final summary report', badge: 'Postflight', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'BEGIN Block', simple: 'A code block that runs before awk reads any lines of text.', technical: 'Special pattern block executed before the first input record is read.' },
        { term: 'END Block', simple: 'A code block that runs after awk has finished reading the entire file.', technical: 'Special pattern block executed after all input records have been consumed.' }
      ],
      syntaxCode: 'awk \'BEGIN {sum=0} {sum+=$1} END {print "Total:", sum}\' << \'EOF\'\n10\n20\n30\nEOF',
      syntaxTokens: [
        { token: 'awk', role: 'command', explanation: 'Pattern scanning and processing language' },
        { token: '\'BEGIN {sum=0}', role: 'argument', explanation: 'Initialization block setting sum accumulator to 0' },
        { token: '{sum+=$1}', role: 'argument', explanation: 'Body block executed for every line: add field 1 to sum' },
        { token: 'END {print "Total:", sum}\'', role: 'argument', explanation: 'Finalization block printing final accumulated total' },
        { token: '<< \'EOF\' ... EOF', role: 'operator', explanation: 'Heredoc providing sample numeric input stream' }
      ],
      variations: [
        { command: 'awk \'BEGIN {print "--- USER LIST ---"} {print $1} END {print "Total Users:", NR}\' /etc/passwd', description: 'Print formatted report with header, usernames, and final count (NR)' },
        { command: 'awk \'{sum+=$1; count++} END {print "Average:", sum/count}\' numbers.txt', description: 'Calculate arithmetic mean (average) across a file of numbers' }
      ],
      expectedOutput: 'Total: 60',
      commonMistakes: [
        { mistake: 'Writing "END" in lowercase "end"', whyWrong: 'awk keywords BEGIN and END are case-sensitive and MUST be capitalized in uppercase; lowercase "end" is treated as an ordinary variable!', correctWay: 'Always write "BEGIN" and "END" in capital letters.' },
        { mistake: 'Trying to divide by "count" in END when count is 0', whyWrong: 'If the input file was completely empty, "sum/count" triggers a division by zero error.', correctWay: 'Protect division in END: "if (count > 0) print sum/count; else print 0".' }
      ],
      safeRecovery: 'Always capitalize BEGIN and END in uppercase: \'BEGIN { ... } { ... } END { ... }\'.'
    }),

    buildLinuxConcept({
      id: 'c-19-14',
      subChapterNumber: '19.14',
      command: 'ps aux | awk \'{print $1}\' | sort | uniq -c | sort -nr | head -n 5',
      title: 'Combining Tools: Building Complex Data Pipelines',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'The master pattern: assembling ps, awk, sort, uniq, and head into high-performance analytical pipelines',
      badges: ['Pipelines', 'Analytics', 'Mastery'],
      difficulty: 'Intermediate',
      quote: 'The true power of Linux is combination: 5 simple tools chained together out-perform a 200-line custom script.',
      whatIsIt: 'The pinnacle of Linux command-line mastery is the composition of complex data processing pipelines. By chaining single-purpose utilities—grep (filtering), awk (column slicing and calculations), sort (ordering), uniq -c (frequency counting), and head (limiting)—operators can perform sophisticated data analytics on live servers in real time. The standard frequency-counting archetype "awk \'{print $col}\' | sort | uniq -c | sort -nr | head" is the universal template for top-N ranking problems.',
      inSimpleWords: 'Building a master machine out of Lego blocks. You pipe data from one tool to the next until you get the exact answer you need, like finding the top 5 IP addresses attacking your server.',
      whyDoYouNeedIt: 'During high-severity production incidents (DDoS attacks, database connection spikes, disk space alarms), an SRE must query raw server telemetry and extract top offenders within seconds.',
      realWorldScenario: 'Your web server is suffering a DDoS attack. You run: "awk \'{print $1}\' /var/log/nginx/access.log | sort | uniq -c | sort -nr | head -n 5". Within 1 second, it outputs the top 5 offending IP addresses and their request counts, allowing you to block them in the firewall.',
      realWorldAnalogy: 'An automated recycling sorting facility: one conveyor belt separates paper, the next magnets pull out steel, the optical scanner sorts glass, and the compactor packs the top materials.',
      withoutVsWith: {
        without: {
          title: 'Manual Ad-Hoc Log Searching',
          items: ['Scrolling through 500,000 log lines in a text viewer trying to spot patterns visually', 'Guessing which IP address is causing high traffic without empirical proof', 'Long resolution times during active service degradation outages'],
          outcome: 'Prolonged outages and subjective guesswork.'
        },
        with: {
          title: 'Mastering Analytical Text Pipelines',
          items: ['Definitive mathematical identification of top offenders in under 2 seconds', 'Universal pipeline template applicable to logs, process lists, network sockets, and disks', 'Zero overhead: streaming memory execution across millions of records'],
          outcome: 'Sub-second incident triage and authoritative operational telemetry.'
        }
      },
      blockDiagram: {
        title: 'The Universal Top-N Analytics Pipeline',
        subtitle: 'The 5-stage frequency counting pipeline archetype:',
        nodes: [
          { id: 'p1', label: '1. ps aux (Raw Data)', simpleDef: 'Generates process list', techDef: 'Streams raw tabular process table to stdout', badge: 'Source', color: '#38bdf8' },
          { id: 'p2', label: '2. awk \'{print $1}\'', simpleDef: 'Extracts user column', techDef: 'Isolates column 1 (username) for every process', badge: 'Extract', color: '#10b981' },
          { id: 'p3', label: '3. sort', simpleDef: 'Groups identical names', techDef: 'Sorts tokens lexicographically (mandatory before uniq)', badge: 'Sort', color: '#a855f7' },
          { id: 'p4', label: '4. uniq -c | sort -nr', simpleDef: 'Counts & ranks highest', techDef: 'uniq -c counts occurrences; sort -nr ranks descending', badge: 'Count & Rank', color: '#f59e0b' },
          { id: 'p5', label: '5. head -n 5', simpleDef: 'Top 5 offenders', techDef: 'Limits display to the top 5 highest frequency items', badge: 'Top 5', color: '#ec4899' }
        ]
      },
      terms: [
        { term: 'Top-N Pattern', simple: 'The classic formula "awk | sort | uniq -c | sort -nr | head" that finds the top offenders.', technical: 'Streaming frequency distribution analysis pattern in POSIX shell environments.' },
        { term: 'sort -nr', simple: 'Sorts numbers in reverse (largest number at the top of the screen).', technical: '-n parses numeric values; -r reverses order to descending.' }
      ],
      syntaxCode: 'ps aux | awk \'{print $1}\' | sort | uniq -c | sort -nr | head -n 5',
      syntaxTokens: [
        { token: 'ps aux', role: 'command', explanation: 'Snapshot current running processes' },
        { token: '| awk \'{print $1}\'', role: 'operator', explanation: 'Extract column 1 (username owning each process)' },
        { token: '| sort', role: 'operator', explanation: 'Sort usernames alphabetically (mandatory prerequisite for uniq)' },
        { token: '| uniq -c', role: 'operator', explanation: 'Count frequency of each unique username' },
        { token: '| sort -nr', role: 'operator', explanation: 'Sort numerically (-n) in reverse descending order (-r)' },
        { token: '| head -n 5', role: 'argument', explanation: 'Display only the top 5 highest frequency usernames' }
      ],
      variations: [
        { command: 'cat /var/log/nginx/access.log | awk \'{print $1}\' | sort | uniq -c | sort -nr | head -n 10', description: 'Find the top 10 IP addresses making requests to web server' },
        { command: 'netstat -ant 2>/dev/null | awk \'{print $6}\' | sort | uniq -c | sort -nr', description: 'Count number of TCP connections per state (ESTABLISHED, TIME_WAIT, LISTEN)' },
        { command: 'history | awk \'{print $2}\' | sort | uniq -c | sort -nr | head -n 10', description: 'Find your top 10 most frequently executed terminal commands' }
      ],
      expectedOutput: '    142 root\n     28 systemd\n     12 ubuntu\n      4 messagebus\n      2 daemon',
      commonMistakes: [
        { mistake: 'Running "uniq -c" without running "sort" first', whyWrong: '"uniq" ONLY collapses adjacent identical lines! If lines are not sorted first, uniq will fail to count duplicate occurrences.', correctWay: 'ALWAYS sort before uniq: "... | sort | uniq -c | sort -nr".' },
        { mistake: 'Using "sort -r" without "-n" when ranking numbers', whyWrong: 'Without "-n", alphabetical sorting treats "9" as bigger than "100" (because "9" > "1")!', correctWay: 'Always use "sort -nr" for numerical descending ranking.' }
      ],
      safeRecovery: 'Remember the golden top-N template: "| sort | uniq -c | sort -nr | head -n 10".'
    })
  ]
};
