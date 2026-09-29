import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 05: VIEWING AND EDITING FILES (05.1 to 05.12)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_05: LinuxTopic = {
  id: 'ch-05',
  number: '05',
  title: 'Viewing and Editing Files',
  iconName: 'FileText',
  description: 'Inspect, paginate, stream, audit, and edit text files with cat, less, head, tail, nano, and vim.',
  concepts: [
    buildLinuxConcept({
      id: 'c-05-01',
      subChapterNumber: '05.1',
      command: 'cat /etc/hosts',
      title: 'cat',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Concatenate and print file contents directly to standard output stream',
      badges: ['Viewing', 'Stream', 'Core'],
      difficulty: 'Beginner',
      quote: 'cat is designed to concatenate files together into a stream; viewing short files is just a convenient byproduct.',
      whatIsIt: 'cat (short for "concatenate") reads files sequentially and writes their contents to standard output (stdout). When supplied with multiple file arguments, it glues them together end-to-end. Flags like "-n" print line numbers, while "-A" reveals invisible control and newline characters.',
      inSimpleWords: 'Typing "cat filename" dumps the entire contents of that file onto your screen in one second. It is perfect for quickly reading short files like configs or keys.',
      whyDoYouNeedIt: 'You need cat to inspect configuration files, concatenate multi-part archive chunks, output file streams into pipes, and append text files together.',
      realWorldScenario: 'You are deploying an SSL/TLS certificate. Your certificate authority provided your domain certificate (domain.crt) and an intermediate bundle (intermediate.crt). Nginx requires a unified certificate chain. You execute "cat domain.crt intermediate.crt > fullchain.pem".',
      realWorldAnalogy: 'Taping several printed pages together into one continuous scroll.',
      withoutVsWith: {
        without: {
          title: 'Opening Files Without cat',
          items: ['Launching heavy interactive text editors just to read 5 lines', 'Risking accidental keystroke edits inside production configs', 'Inability to pipe file content into stream filters'],
          outcome: 'Slow workflows, risk of accidental config corruption, and inability to stream data.'
        },
        with: {
          title: 'Using cat Correctly',
          items: ['Instant terminal output with zero editor overhead', 'Combining multiple files into unified bundles with redirection', 'Auditing invisible carriage returns (\\r\\n) with cat -A'],
          outcome: 'Rapid file reading, clean concatenation, and seamless shell pipeline integration.'
        }
      },
      blockDiagram: {
        title: 'cat Data Flow Pipeline',
        subtitle: 'Sequential stream read to stdout file descriptor 1:',
        nodes: [
          { id: 'file1', label: 'File 1 Data', simpleDef: 'First source file', techDef: 'Input fd from open(file1)', badge: 'Input', color: '#38bdf8' },
          { id: 'file2', label: 'File 2 Data', simpleDef: 'Second source file', techDef: 'Input fd from open(file2)', badge: 'Input', color: '#a855f7' },
          { id: 'cat', label: 'cat Process', simpleDef: 'Reads blocks sequentially and writes to stdout', techDef: 'read(buf, 4096) -> write(1, buf)', badge: 'Core', color: '#10b981' },
          { id: 'stdout', label: 'Terminal / Target', simpleDef: 'Screen or redirected destination file', techDef: 'STDOUT_FILENO (fd 1)', badge: 'Output', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Concatenation', simple: 'Joining two or more things end-to-end.', technical: 'Sequential stream piping of multiple file inputs into a single output descriptor.' },
        { term: 'Useless Use of Cat (UUOC)', simple: 'Using cat when a command can read the file directly.', technical: 'Anti-pattern like "cat file | grep pattern" instead of the faster "grep pattern file".' }
      ],
      syntaxCode: 'cat [OPTIONS] [FILE...]',
      syntaxTokens: [
        { token: 'cat', role: 'command', explanation: 'Concatenate and print files' },
        { token: '/etc/hosts', role: 'path', explanation: 'File to read and print to screen' }
      ],
      variations: [
        { syntax: 'cat -n /etc/fstab', title: 'Display Line Numbers', whatItDoes: 'Numbers all output lines starting from 1', whenToUse: 'When referencing specific config line numbers' },
        { syntax: 'cat -A script.sh', title: 'Show Non-Printing Characters', whatItDoes: 'Visualizes tabs (^I) and Windows CRLF carriage returns (^M$)', whenToUse: 'When debugging mysterious script syntax errors' }
      ],
      beforeAfter: {
        before: '$ cat /etc/hostname\n[Reading hostname file...]',
        after: 'prod-api-server-01',
        explanation: 'Dumps the single line containing the system hostname directly to stdout.'
      },
      expectedOutput: '127.0.0.1 localhost\n127.0.1.1 prod-host',
      whatChanges: ['Reads file bytes into stdout buffer.'],
      whatDoesNotChange: ['File contents and permissions are unmodified.'],
      safeRecovery: 'If cat accidentally starts dumping a huge 5GB file, immediately press Ctrl+C to cancel.',
      commonMistakes: [
        { mistake: 'Running "cat" on a 10GB log file and locking up the terminal', whyItHappens: 'cat tries to output all 10GB at once, freezing your terminal window.', howToFix: 'Use "less", "head", or "tail" for large files; reserve "cat" for short files.' },
        { mistake: 'Running "cat file.txt > file.txt" attempting to overwrite', whyItHappens: 'The shell truncates the file with ">" before cat even reads it, wiping your file to 0 bytes!', howToFix: 'Never redirect cat output into the same file being read.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-05-02',
      subChapterNumber: '05.2',
      command: 'less /var/log/syslog',
      title: 'less',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Modern interactive terminal pager with bidirectional scrolling and fast regex search',
      badges: ['Pager', 'Viewing', 'Essential'],
      difficulty: 'Beginner',
      quote: '"less is more" — less is faster than more because it does not read the entire file before starting.',
      whatIsIt: 'less is an interactive terminal pager designed to view files page-by-page. Unlike cat (which dumps everything) or more (which only scrolls forward), less supports bidirectional navigation (PageUp/PageDown, arrows, j/k vim keys), regex searching ("/pattern" for forward, "?pattern" for backward), line numbering (-N), and bookmarks.',
      inSimpleWords: 'Think of less as an e-reader for text files. You can scroll down, scroll up, search for words, jump to the end, and exit cleanly without altering the file.',
      whyDoYouNeedIt: 'Whether a log file is 10 Kilobytes or 50 Gigabytes, less opens it in 5 milliseconds because it only loads the chunk of data visible on your screen.',
      realWorldScenario: 'A production server crashes and you need to inspect a 20GB syslog file. If you run cat or nano, the server runs out of RAM and crashes. Running "less /var/log/syslog" opens the file instantly with zero memory overhead.',
      realWorldAnalogy: 'Reading a massive encyclopedia using a magnifying glass. You only need to look at one paragraph at a time, not hold the entire encyclopedia in your hand at once.',
      terms: [
        { term: 'Pager', simple: 'A program that lets you scroll through text page by page.', technical: 'Terminal application intercepting termios screen buffer to handle scrolling and viewport rendering.' },
        { term: 'Regex Search (/)', simple: 'Typing "/" followed by a word searches forward in less.', technical: 'Interactive search highlighting matches; press "n" for next match and "N" for previous.' }
      ],
      syntaxCode: 'less [OPTIONS] FILE',
      syntaxTokens: [
        { token: 'less', role: 'command', explanation: 'Interactive file pager' },
        { token: '/var/log/syslog', role: 'path', explanation: 'Target large file to page through safely' }
      ],
      variations: [
        { syntax: 'less -N /etc/nginx/nginx.conf', title: 'Display Line Numbers', whatItDoes: 'Adds line numbers to left margin of pager', whenToUse: 'When referencing code lines' },
        { syntax: 'less +F /var/log/app.log', title: 'Follow Live Stream', whatItDoes: 'Starts at end of file and follows new lines live (like tail -f)', whenToUse: 'Live log tailing with ability to Ctrl+C and scroll backward' }
      ],
      beforeAfter: {
        before: '$ less /var/log/syslog\n[Opens interactive paging canvas...]',
        after: ': /error [Searches forward for word "error"]\n[Highlights matches, press "n" for next match, "q" to quit]',
        explanation: 'Provides instant, responsive browsing through multi-gigabyte files.'
      },
      expectedOutput: '[Interactive paging view displayed. Press "q" to exit.]',
      whatChanges: ['Initializes alternate terminal screen buffer.'],
      whatDoesNotChange: ['File is opened read-only; impossible to accidentally edit or delete content.'],
      safeRecovery: 'To exit less at any time, simply press the "q" key.',
      commonMistakes: [
        { mistake: 'Not knowing how to exit less and feeling trapped', whyItHappens: 'Beginners pressing Ctrl+C or Enter frantically.', howToFix: 'Just press "q" (quit).' },
        { mistake: 'Forgetting that "G" jumps to bottom and "g" jumps to top', whyItHappens: 'Unfamiliarity with vi navigation keys.', howToFix: 'Press Shift+G to go to the end of the file; press "g" to return to the top.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-05-03',
      subChapterNumber: '05.3',
      command: 'more file.txt',
      title: 'more',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Legacy Unix pager advancing text screen-by-screen',
      badges: ['Pager', 'Legacy', 'POSIX'],
      difficulty: 'Beginner',
      quote: 'more was the original 1978 Unix pager; less was built to fix all of more\'s limitations.',
      whatIsIt: 'more is the classic Unix pager written in 1978. It reads text and pauses after filling each terminal screen, displaying a "--More--(XX%)" prompt at the bottom. The user presses the Spacebar to advance one full screen or Enter to advance one line. Unlike less, classic more cannot easily scroll backward.',
      inSimpleWords: 'more was the grandfather of less. It lets you read text page-by-page, but it only moves forward like a one-way escalator. Today, almost everyone uses "less" instead.',
      whyDoYouNeedIt: 'You will find more on legacy Unix systems, embedded routers, and minimal rescue shells where modern pagers like less might not be installed.',
      realWorldScenario: 'You are rescuing a broken minimal embedded Alpine Linux appliance with only BusyBox installed. "less" is missing, but "more" is present, allowing you to paginate dmesg hardware error logs.',
      realWorldAnalogy: 'A film projector advancing frames forward one by one.',
      terms: [
        { term: 'Terminal Viewport', simple: 'The visible grid of rows and columns in your terminal window.', technical: 'TIOCGWINSZ ioctl dimensions (e.g. 80 columns by 24 rows).' }
      ],
      syntaxCode: 'more FILE',
      syntaxTokens: [
        { token: 'more', role: 'command', explanation: 'Filter for paging through text one screen at a time' },
        { token: 'file.txt', role: 'path', explanation: 'File to page through' }
      ],
      variations: [
        { syntax: 'more -d file.txt', title: 'Display Help Prompt', whatItDoes: 'Shows "[Press space to continue, \'q\' to quit]"', whenToUse: 'Helpful for beginners' }
      ],
      beforeAfter: {
        before: '$ more /etc/services\n[Displays first 24 rows...]',
        after: '--More--(12%)\n[Press Space to see next page]',
        explanation: 'Displays percentage of file consumed as you advance.'
      },
      expectedOutput: '--More--(12%)',
      whatChanges: ['Streams text to terminal output.'],
      whatDoesNotChange: ['File remains unaltered.'],
      safeRecovery: 'Press "q" to exit more.',
      commonMistakes: [
        { mistake: 'Using more when less is available', whyItHappens: 'Habit from Windows Command Prompt (where more is standard).', howToFix: 'On Linux, always use "less" instead of "more" for superior scrolling and searching.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-05-04',
      subChapterNumber: '05.4',
      command: 'head -n 20 /var/log/nginx/access.log',
      title: 'head',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Output the first specified lines or bytes of a file or stream',
      badges: ['Viewing', 'Filtering', 'Core'],
      difficulty: 'Beginner',
      quote: 'When you only care about headers, column names, or the beginning of a file, head is your fastest tool.',
      whatIsIt: 'head outputs the beginning (the "head") of files or input streams. By default, it prints the first 10 lines. With "-n", you specify the exact number of lines; with "-c", you specify the number of bytes.',
      inSimpleWords: 'Typing "head file.txt" shows you the top 10 lines of the file. It is the quickest way to see what a CSV file\'s column headers are without opening the whole file.',
      whyDoYouNeedIt: 'Huge data files (CSV, TSV, JSONL) often have millions of rows. Opening them locks up editors. head lets you inspect the structure and headers instantly.',
      realWorldScenario: 'A data scientist gives you a 50GB dataset "users.csv". You need to know the schema before writing an ETL pipeline. You run "head -n 5 users.csv" $\rightarrow$ you see "user_id,email,created_at,role" immediately.',
      realWorldAnalogy: 'Reading the headline and opening paragraph of a newspaper article.',
      terms: [
        { term: 'Header Inspection', simple: 'Looking at the first few lines to understand column names or formats.', technical: 'Reading initial stream records before EOF without buffering the rest of the file.' }
      ],
      syntaxCode: 'head [OPTIONS] [FILE...]',
      syntaxTokens: [
        { token: 'head', role: 'command', explanation: 'Output the first part of files' },
        { token: '-n 20', role: 'flag', explanation: 'Print the first 20 lines instead of default 10' },
        { token: '/var/log/nginx/access.log', role: 'path', explanation: 'Target file to read' }
      ],
      variations: [
        { syntax: 'head -c 100 file.bin', title: 'First 100 Bytes', whatItDoes: 'Prints exactly the first 100 raw bytes', whenToUse: 'When inspecting file magic numbers' },
        { syntax: 'ps aux | head -n 10', title: 'Top 10 Processes Header', whatItDoes: 'Pipes process table and preserves the column header row', whenToUse: 'When viewing top process metrics' }
      ],
      beforeAfter: {
        before: '$ head -n 2 /etc/passwd\n[Reading top 2 lines...]',
        after: 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin',
        explanation: 'Outputs precisely the top two user account records.'
      },
      expectedOutput: 'root:x:0:0:root:/root:/bin/bash',
      whatChanges: ['Streams initial bytes to stdout.'],
      whatDoesNotChange: ['File remains unaltered.'],
      safeRecovery: '100% safe read-only tool.',
      commonMistakes: [
        { mistake: 'Typing "head -20" instead of POSIX standard "head -n 20"', whyItHappens: 'Old legacy syntax.', howToFix: 'Use "head -n 20" for maximum portability across scripts.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-05-05',
      subChapterNumber: '05.5',
      command: 'tail -n 25 /var/log/syslog',
      title: 'tail',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Output the final specified lines or bytes of a file or stream',
      badges: ['Viewing', 'Logs', 'Core'],
      difficulty: 'Beginner',
      quote: 'Errors in Linux always append to the bottom of the log; tail is how you see what just happened.',
      whatIsIt: 'tail outputs the end (the "tail") of files. By default, it prints the last 10 lines. In Linux systems, logs append new messages to the end of files, making tail the primary diagnostic command for checking recent crashes, errors, and system activity.',
      inSimpleWords: 'If a server crashed 10 seconds ago, the explanation is at the very bottom of the log file. Typing "tail -n 30 /var/log/syslog" shows the last 30 lines so you can see the crash reason instantly.',
      whyDoYouNeedIt: 'You do not want to scroll through 1,000,000 lines of old logs to see what happened 5 seconds ago. tail jumps straight to the end of the file in milliseconds.',
      realWorldScenario: 'A database query fails with a generic 500 internal server error. You SSH into the server and type "tail -n 15 /var/log/postgresql/postgresql-16-main.log". You instantly see: "FATAL: password authentication failed for user dbadmin".',
      realWorldAnalogy: 'Reading the final chapter of a book to see how the story ended.',
      terms: [
        { term: 'Lseek to End', simple: 'Jumping straight to the end of a hard disk file without reading the whole file.', technical: 'lseek(fd, 0, SEEK_END) moving file offset pointer to end of inode data blocks.' }
      ],
      syntaxCode: 'tail [OPTIONS] [FILE...]',
      syntaxTokens: [
        { token: 'tail', role: 'command', explanation: 'Output the last part of files' },
        { token: '-n 25', role: 'flag', explanation: 'Display the last 25 lines' },
        { token: '/var/log/syslog', role: 'path', explanation: 'Log file to read' }
      ],
      variations: [
        { syntax: 'tail -n +50 file.txt', title: 'Start from Line 50 to End', whatItDoes: 'Outputs everything starting from line 50 through the end of the file', whenToUse: 'When skipping headers' },
        { syntax: 'tail -n 50 /var/log/auth.log', title: 'Check Recent SSH Logins', whatItDoes: 'Displays the 50 most recent authentication events', whenToUse: 'Security incident triage' }
      ],
      beforeAfter: {
        before: '$ tail -n 2 /var/log/auth.log\n[Querying last 2 login events...]',
        after: 'Sep 28 10:14:02 prod sshd[24801]: Accepted publickey for ubuntu from 192.168.1.50\nSep 28 10:14:02 prod sshd[24801]: pam_unix(sshd:session): session opened for user ubuntu',
        explanation: 'Displays the most recent authentication events recorded at the bottom of the log file.'
      },
      expectedOutput: 'Accepted publickey for ubuntu',
      whatChanges: ['Reads trailing file bytes.'],
      whatDoesNotChange: ['File remains unchanged.'],
      safeRecovery: '100% safe read-only operation.',
      commonMistakes: [
        { mistake: 'Opening a 20GB log file in vim or nano to see the bottom', whyItHappens: 'Habit of using text editors.', howToFix: 'Always use "tail -n 50 logfile" to see the end of large log files instantly.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-05-06',
      subChapterNumber: '05.6',
      command: 'tail -f /var/log/nginx/error.log',
      title: 'tail -f',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Stream live appended file data in real time as applications write to disk',
      badges: ['Logs', 'Streaming', 'Essential'],
      difficulty: 'Beginner',
      quote: 'tail -f is the heart monitor of your server: you see events happen the exact millisecond they occur.',
      whatIsIt: 'tail -f ("follow") keeps the file open and continuously monitors it. As running applications write new lines to the file, tail immediately prints them to your terminal screen in real time. Using "-F" (capital F) follows by filename rather than file descriptor, tracking through log rotations automatically.',
      inSimpleWords: 'Imagine watching live security camera footage. As soon as someone walks past the camera, you see them move on your screen. "tail -f" is a live camera pointed at your log file.',
      whyDoYouNeedIt: 'When debugging an API, testing a web app, or monitoring a deployment, tail -f lets you trigger actions in your browser and watch the backend server logs react live.',
      realWorldScenario: 'You are submitting a checkout form on an e-commerce website that keeps throwing an error. You run "tail -f /var/log/app/payment.log" on the server. You click "Submit Payment" on your laptop and instantly watch the payment gateway timeout error stream across your terminal.',
      realWorldAnalogy: 'A stock ticker tape streaming stock price updates across the screen in real time.',
      terms: [
        { term: 'inotify', simple: 'The Linux kernel system that notifies programs when files change.', technical: 'Kernel subsystem emitting IN_MODIFY and IN_ATTRIB events to file watchers.' },
        { term: 'tail -F vs tail -f', simple: 'tail -F keeps following even if logrotate deletes and recreates the file.', technical: 'tail -F tracks filename changes via retry loops, while tail -f holds onto the original unlinked file descriptor.' }
      ],
      syntaxCode: 'tail -f [LOG_FILE]',
      syntaxTokens: [
        { token: 'tail', role: 'command', explanation: 'Output last part of file' },
        { token: '-f', role: 'flag', explanation: 'Follow: output appended data as the file grows' },
        { token: '/var/log/nginx/error.log', role: 'path', explanation: 'Active application log file to monitor live' }
      ],
      variations: [
        { syntax: 'tail -F /var/log/syslog', title: 'Follow Across Rotations', whatItDoes: 'Keeps tracking log even when logrotate archives the file and creates a new one', whenToUse: 'Production server monitoring' },
        { syntax: 'tail -f /var/log/*.log', title: 'Multi-Log Live Stream', whatItDoes: 'Follows multiple log files simultaneously, prefixing lines with file headers', whenToUse: 'When monitoring whole service stacks' }
      ],
      beforeAfter: {
        before: '$ tail -f /var/log/nginx/access.log\n[Awaiting incoming web traffic...]',
        after: '192.168.1.10 - - [28/Sep/2024:10:20:01] "GET /api/v1/health HTTP/1.1" 200 45\n192.168.1.12 - - [28/Sep/2024:10:20:03] "POST /api/v1/login HTTP/1.1" 401 22',
        explanation: 'New HTTP requests stream across your screen the exact millisecond they hit the web server.'
      },
      expectedOutput: '[Live stream of new lines as they are appended to the file]',
      whatChanges: ['Holds open file descriptor and registers inotify watch.'],
      whatDoesNotChange: ['Logs and application files are untouched.'],
      safeRecovery: 'To stop following and return to your command prompt, press Ctrl+C.',
      commonMistakes: [
        { mistake: 'Using lowercase "-f" instead of uppercase "-F" on rotated production logs', whyItHappens: 'When logrotate runs at midnight, tail -f gets stuck reading the old unlinked archive.', howToFix: 'Always use "tail -F" for long-running log monitoring.' },
        { mistake: 'Trying to exit tail -f by pressing "q" or Enter', whyItHappens: 'Confusing tail with less.', howToFix: 'Press Ctrl+C to terminate tail -f.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-05-07',
      subChapterNumber: '05.7',
      command: 'wc -l /etc/passwd',
      title: 'wc',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Word count: count newlines, words, characters, and byte sizes of files and streams',
      badges: ['Metrics', 'Auditing', 'Core'],
      difficulty: 'Beginner',
      quote: 'Whenever you need to count things in Linux, pipe into "wc -l".',
      whatIsIt: 'wc ("Word Count") reads files or standard input and counts lines (-l), words (-w), characters (-m), or raw bytes (-c). It is the universal counting tool in Linux command pipelines.',
      inSimpleWords: 'Want to know how many users exist on a server? Count lines in /etc/passwd with "wc -l". Want to know how many processes are running? Count lines from "ps aux" with "wc -l".',
      whyDoYouNeedIt: 'wc is essential in shell automation to verify file sizes, count error occurrences, validate database dumps, and monitor server capacity.',
      realWorldScenario: 'You are migrating a database with 50,000 customer records. You export the table to "customers.csv". You immediately run "wc -l customers.csv" to verify that exactly 50,001 lines (headers + 50,000 rows) were exported before starting the import.',
      realWorldAnalogy: 'The word count counter at the bottom of a Microsoft Word or Google Docs window.',
      terms: [
        { term: 'Newline Count (-l)', simple: 'Counts how many times an ASCII newline (\\n) appears in the file.', technical: 'Iterates byte buffer counting 0x0A (ASCII LF) bytes.' },
        { term: 'Byte Count (-c)', simple: 'Counts exact number of raw bytes in the file.', technical: 'Matches st_size from fstat system call.' }
      ],
      syntaxCode: 'wc [OPTIONS] [FILE...]',
      syntaxTokens: [
        { token: 'wc', role: 'command', explanation: 'Word count utility' },
        { token: '-l', role: 'flag', explanation: 'Count newlines (lines) only' },
        { token: '/etc/passwd', role: 'path', explanation: 'Target file to count' }
      ],
      variations: [
        { syntax: 'ps aux | wc -l', title: 'Count Running Processes', whatItDoes: 'Pipes process table and counts total running processes', whenToUse: 'Quick server capacity check' },
        { syntax: 'grep -c "ERROR" app.log', title: 'Count Error Occurrences', whatItDoes: 'Built-in line count for grep matches', whenToUse: 'Counting specific errors' }
      ],
      beforeAfter: {
        before: '$ wc -l /etc/passwd\n[Counting newlines...]',
        after: '38 /etc/passwd',
        explanation: 'Reports that /etc/passwd contains exactly 38 user accounts.'
      },
      expectedOutput: '38 /etc/passwd',
      whatChanges: ['Reads stream and computes metrics.'],
      whatDoesNotChange: ['Files remain intact.'],
      safeRecovery: '100% read-only and safe.',
      commonMistakes: [
        { mistake: 'Forgetting that "wc -l" counts newline characters, not visual wrapped lines', whyItHappens: 'If a file does not have a trailing newline on the last line, wc -l will be off by one.', howToFix: 'Ensure POSIX files end with a standard newline.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-05-08',
      subChapterNumber: '05.8',
      command: 'file /bin/bash',
      title: 'file',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Determine file type and binary architecture by inspecting magic number headers',
      badges: ['Inspection', 'Forensics', 'Core'],
      difficulty: 'Beginner',
      quote: 'Linux does not care about file extensions like .exe or .png; the file command inspects true binary magic bytes.',
      whatIsIt: 'In Linux, file extensions are merely descriptive conventions for humans; the operating system does not use them to determine how to handle a file. The "file" utility inspects the file\'s initial bytes (known as Magic Numbers) against the system magic database (/usr/share/misc/magic) to identify the true file type (ELF binary, JPEG, ASCII text, gzip archive).',
      inSimpleWords: 'If someone renames a malicious executable program to "photo.jpg", Windows might get confused. Linux does not care: typing "file photo.jpg" will instantly reveal: "ELF 64-bit executable", exposing the true nature of the file.',
      whyDoYouNeedIt: 'You need file to inspect unknown binary files, verify compiler output architectures (x86_64 vs ARM64), check text encodings (UTF-8 vs ASCII vs CRLF), and detect compressed archives.',
      realWorldScenario: 'You download a precompiled Go binary for Docker, but it fails to execute with "Exec format error". You run "file myapp" and discover: "ELF 64-bit LSB executable, ARM aarch64". You accidentally downloaded the ARM binary onto an Intel x86_64 server.',
      realWorldAnalogy: 'A chemical test tube that tests the liquid inside a bottle rather than trusting what is written on the paper label.',
      terms: [
        { term: 'Magic Number', simple: 'A unique sequence of bytes at the beginning of a file that identifies what kind of file it is.', technical: 'Constant byte signatures (e.g. 0x7F \'E\' \'L\' \'F\' for Linux binaries, 0xFF 0xD8 for JPEG, 0x1F 0x8B for Gzip).' },
        { term: 'ELF (Executable and Linkable Format)', simple: 'The standard binary executable file format of Linux.', technical: 'Standard binary format for object code, shared libraries, and core dumps in Unix/Linux.' }
      ],
      syntaxCode: 'file [OPTIONS] FILE...',
      syntaxTokens: [
        { token: 'file', role: 'command', explanation: 'Determine file type' },
        { token: '/bin/bash', role: 'path', explanation: 'Target file to inspect' }
      ],
      variations: [
        { syntax: 'file -b script.sh', title: 'Brief Mode', whatItDoes: 'Prints only file type description without repeating the filename', whenToUse: 'Inside shell scripts' },
        { syntax: 'file -i document.txt', title: 'MIME Type and Encoding', whatItDoes: 'Outputs MIME type (e.g. text/plain; charset=utf-8)', whenToUse: 'When configuring web server Content-Type headers' }
      ],
      beforeAfter: {
        before: '$ file /bin/bash\n[Reading magic header bytes...]',
        after: '/bin/bash: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=..., for GNU/Linux 3.2.0, stripped',
        explanation: 'Reveals exact binary architecture, dynamic linker, and compilation flags.'
      },
      expectedOutput: 'ELF 64-bit LSB executable, x86-64',
      whatChanges: ['Reads initial bytes from file.'],
      whatDoesNotChange: ['File remains untouched.'],
      safeRecovery: '100% safe read-only tool.',
      commonMistakes: [
        { mistake: 'Trusting a file extension blindly without checking with "file"', whyItHappens: 'Assuming "script.sh" is always shell script.', howToFix: 'Run "file <name>" to verify if it is ASCII text or a binary executable.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-05-09',
      subChapterNumber: '05.9',
      command: 'nano /etc/hosts',
      title: 'nano',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Beginner-friendly modeless command-line text editor with on-screen keyboard shortcuts',
      badges: ['Editor', 'Nano', 'Beginner'],
      difficulty: 'Beginner',
      quote: 'nano is the welcoming front door to terminal text editing: shortcuts are printed right on the screen.',
      whatIsIt: 'GNU nano is a simple, modeless command-line text editor. What you type appears directly on the screen (unlike modal editors like vi/vim). All essential keyboard shortcuts are permanently displayed along the bottom two lines of the screen, using the caret "^" symbol to represent the Ctrl key (e.g. "^O WriteOut" = Ctrl+O to save; "^X Exit" = Ctrl+X to quit).',
      inSimpleWords: 'If you have never edited a file in a terminal before, use nano. It feels like Notepad inside your terminal. You can use your arrow keys, type text normally, hit Ctrl+O to save, and Ctrl+X to exit.',
      whyDoYouNeedIt: 'When you are connected to a remote server over SSH and need to change one line in a config file without learning complex vim modes, nano gets the job done in 10 seconds.',
      realWorldScenario: 'You are setting up a local development hostname on a Linux server. You type "sudo nano /etc/hosts", add "127.0.0.1 myapp.local", press Ctrl+O followed by Enter to save, and press Ctrl+X to exit. Done.',
      realWorldAnalogy: 'Notepad or SimpleText for the Linux terminal.',
      terms: [
        { term: 'Modeless Editor', simple: 'An editor where typing letters always inserts text.', technical: 'Editor without distinct Command and Insert modes; keypresses map directly to character insertions.' },
        { term: 'Caret Notation (^X)', simple: 'The symbol ^ means hold down the Ctrl key.', technical: 'ASCII control character representation where ^X signifies ASCII code 24 (Ctrl+X).' }
      ],
      syntaxCode: 'nano [OPTIONS] [FILE]',
      syntaxTokens: [
        { token: 'nano', role: 'command', explanation: 'GNU nano text editor' },
        { token: '/etc/hosts', role: 'path', explanation: 'Target text file to edit' }
      ],
      variations: [
        { syntax: 'nano -l file.txt', title: 'Show Line Numbers', whatItDoes: 'Displays line numbers along the left margin', whenToUse: 'When debugging code or config files' },
        { syntax: 'nano -B file.conf', title: 'Backup on Save', whatItDoes: 'Automatically saves a backup copy (file.conf~) before overwriting', whenToUse: 'Editing critical server configurations' }
      ],
      beforeAfter: {
        before: '$ nano /etc/hosts\n[Opens nano editor interface with on-screen shortcuts]',
        after: '[Ctrl+O -> Press Enter to save -> Ctrl+X to exit]\n[Returns cleanly to bash prompt]',
        explanation: 'Saves file modifications cleanly back to the filesystem.'
      },
      expectedOutput: '[File saved and written to disk]',
      whatChanges: ['Modifies target file data blocks and updates mtime.'],
      whatDoesNotChange: ['Unrelated files are untouched.'],
      safeRecovery: 'If you make a mistake in nano and want to abandon changes without saving: press Ctrl+X, type "N" when asked to save modified buffer, and press Enter.',
      commonMistakes: [
        { mistake: 'Trying to press Ctrl+S to save in nano', whyItHappens: 'Habit from Windows/Mac. In terminal, Ctrl+S freezes terminal scrolling (XOFF flow control)!', howToFix: 'If terminal freezes, press Ctrl+Q to unfreeze. In nano, save is Ctrl+O (WriteOut).' },
        { mistake: 'Editing a root-owned file in /etc without sudo', whyItHappens: 'Forgetting sudo causes nano to report "Error writing: Permission denied" when saving.', howToFix: 'Always launch with "sudo nano /etc/file.conf".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-05-10',
      subChapterNumber: '05.10',
      command: 'vim /etc/nginx/nginx.conf',
      title: 'vim Basics',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'The ubiquitous modal powerhouse: Normal, Insert, and Command-Line modes',
      badges: ['Editor', 'Vim', 'Essential'],
      difficulty: 'Intermediate',
      quote: 'Vim is not just a text editor; it is a language of motions, verbs, and text objects.',
      whatIsIt: 'Vim (Vi IMproved) is the industry-standard modal text editor installed on virtually every Unix and Linux system on Earth. Unlike normal editors, Vim operates in distinct MODES: 1. Normal Mode (for navigating and manipulating text with keys like dd, yy, p, u), 2. Insert Mode (for typing text, entered by pressing "i"), and 3. Command-Line Mode (for saving and quitting, entered with ":").',
      inSimpleWords: 'In regular editors, pressing "d" types the letter d. In Vim\'s Normal mode, pressing "d" means "delete". To type words, you press "i" (Insert). When done typing, press Esc to return to Normal mode. To save and quit, type ":wq" and hit Enter.',
      whyDoYouNeedIt: 'Vim is the universal common denominator across every cloud server, Docker container, and air-gapped machine. Knowing basic Vim is an absolute requirement for DevOps and System Administration.',
      realWorldScenario: 'You SSH into a bare-metal server recovery console. Nano is not installed. Git commit opens Vim automatically. If you do not know how to type "i", edit, press Esc, and type ":wq", you are completely stuck.',
      realWorldAnalogy: 'Driving a manual transmission sports car. It requires learning clutch and gear coordination, but provides unmatched speed and precise vehicle control.',
      terms: [
        { term: 'Normal Mode', simple: 'The default navigation and command mode when Vim opens.', technical: 'Mode where keystrokes are interpreted as editor commands and motions (h, j, k, l, w, b).' },
        { term: 'Insert Mode', simple: 'The mode where typing keys actually inserts text into the file.', technical: 'Mode entered via i, a, o, or s where keystrokes insert characters into the active buffer.' },
        { term: ':wq', simple: 'Write (save) and Quit.', technical: 'Ex-mode command executing write-buffer followed by quit.' }
      ],
      syntaxCode: 'vim [FILE]',
      syntaxTokens: [
        { token: 'vim', role: 'command', explanation: 'Launch Vi IMproved editor' },
        { token: '/etc/nginx/nginx.conf', role: 'path', explanation: 'Target configuration file' }
      ],
      variations: [
        { syntax: ':q!', title: 'Quit Without Saving', whatItDoes: 'Forces Vim to exit discarding all unsaved edits', whenToUse: 'When you made a mistake and want to exit safely' },
        { syntax: ':set number', title: 'Toggle Line Numbers', whatItDoes: 'Displays line numbers in Vim', whenToUse: 'When navigating config errors by line number' }
      ],
      beforeAfter: {
        before: '$ vim app.py\n[Vim opens in NORMAL mode]',
        after: '[Press "i" -> make edits -> press Esc -> type ":wq" -> press Enter]\n[Edits saved to disk cleanly]',
        explanation: 'Demonstrates standard Vim modal editing cycle.'
      },
      expectedOutput: '[File written and saved to disk]',
      whatChanges: ['Modifies file contents and updates inode timestamps.'],
      whatDoesNotChange: ['Other files are untouched.'],
      safeRecovery: 'HOW TO EXIT VIM SAFELY: Press Esc three times, type ":q!" and press Enter. This discards all changes and exits immediately.',
      commonMistakes: [
        { mistake: 'Getting trapped in Vim and not knowing how to exit', whyItHappens: 'Pressing Ctrl+C or typing "quit" in Normal mode.', howToFix: 'Press Esc, type ":q!" (quit without saving) or ":wq" (save and quit), and hit Enter.' },
        { mistake: 'Typing text while still in Normal mode and accidentally deleting lines', whyItHappens: 'Forgetting to press "i" to enter Insert mode.', howToFix: 'Press "u" in Normal mode to UNDO mistakes.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-05-11',
      subChapterNumber: '05.11',
      command: 'which vi vim',
      title: 'vi vs vim',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'The 1976 Bill Joy original vs the feature-complete modern Bram Moolenaar evolution',
      badges: ['History', 'Vim', 'Vi'],
      difficulty: 'Intermediate',
      quote: 'Vi was written for 300-baud acoustic coupler modems; Vim brought syntax highlighting, undo trees, and plugins.',
      whatIsIt: 'Vi was created by Bill Joy in 1976 for the Berkeley Software Distribution (BSD). In 1991, Bram Moolenaar released Vim ("Vi IMproved"). While Vi supported only single-level undo and lacked colors, Vim added multi-level undo trees, syntax highlighting, visual block mode (Ctrl+V), split windows, and a rich plugin ecosystem. On most modern Linux systems, typing "vi" is an alias that launches Vim.',
      inSimpleWords: 'Vi was the black-and-white silent movie; Vim is the full-color 4K digital remaster. They share the same keyboard controls, but Vim gives you syntax colors and unlimited undo.',
      whyDoYouNeedIt: 'Understanding the history helps when working across minimal Linux environments (like BusyBox or embedded systems) where only original minimal Vi exists without arrow key support or syntax colors.',
      realWorldScenario: 'You log into a minimal Docker container based on Alpine. You type "vim" and get "command not found". But typing "vi" works immediately because minimal POSIX systems always include Vi.',
      realWorldAnalogy: 'An acoustic guitar versus an electric guitar with an amplifier and effects pedals.',
      terms: [
        { term: 'Syntax Highlighting', simple: 'Colorizing code keywords, strings, and comments.', technical: 'Vim regex syntax engine applying terminal color highlights based on filetype.' },
        { term: 'Visual Mode (v)', simple: 'Selecting blocks of text with cursor keys in Vim.', technical: 'Mode allowing character, line (V), or block (Ctrl+V) text object selection.' }
      ],
      syntaxCode: 'ls -l $(which vi)',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'List file info' },
        { token: '-l', role: 'flag', explanation: 'Long format' },
        { token: '$(which vi)', role: 'argument', explanation: 'Command substitution resolving binary path of vi' }
      ],
      variations: [
        { syntax: 'update-alternatives --display editor', title: 'Check Default System Editor', whatItDoes: 'Shows which editor is configured as the default /usr/bin/editor', whenToUse: 'When configuring default system editor for git and crontab' }
      ],
      beforeAfter: {
        before: '$ which vi\n/usr/bin/vi',
        after: '$ readlink -f /usr/bin/vi\n/usr/bin/vim.basic',
        explanation: 'Proves the system /usr/bin/vi binary is symlinked directly to modern Vim.'
      },
      expectedOutput: '/usr/bin/vim.basic',
      whatChanges: ['Resolves symlink pointers.'],
      whatDoesNotChange: ['System remains unaltered.'],
      safeRecovery: 'Non-destructive inspection.',
      commonMistakes: [
        { mistake: 'Assuming minimal Docker containers have full Vim installed', whyItHappens: 'Containers minimize image size by only including vi.', howToFix: 'Learn basic vi commands: they work in both vi and vim.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-05-12',
      subChapterNumber: '05.12',
      command: 'sudoedit /etc/sudoers',
      title: 'Editing Configuration Files',
      topicId: 'ch-05',
      topicNumber: '05',
      topicTitle: 'Viewing and Editing Files',
      subtitle: 'Best practices: atomic backups, sudoedit vs sudo vim, syntax linters, and service reloads',
      badges: ['Production', 'Config', 'BestPractices'],
      difficulty: 'Intermediate',
      quote: 'Amateurs edit production configs directly; senior engineers make backups, edit via temporary copies, validate syntax, and reload gracefully.',
      whatIsIt: 'Editing production configuration files demands strict discipline. The gold standard workflow consists of: 1. Backup original ("cp config config.bak"), 2. Edit safely with "sudoedit" (which edits a temporary copy as your user and only copies back if valid), 3. Validate syntax using dedicated linters (e.g. "nginx -t", "sshd -t", "visudo -c"), and 4. Gracefully reload rather than restart ("systemctl reload").',
      inSimpleWords: 'Never edit a live server configuration blindly. If you make a typo in Nginx or SSH configs and restart the service, the service crashes and you may lock yourself out of the server permanently.',
      whyDoYouNeedIt: 'One missing semicolon in /etc/sudoers or /etc/ssh/sshd_config can sever your SSH connection forever and render root escalation impossible.',
      realWorldScenario: 'You are adding an admin user to /etc/sudoers. If you edit with regular "sudo nano /etc/sudoers" and make a typo, sudo breaks permanently across the entire server. Instead, you use "sudo visudo", which parses and checks syntax before saving. If there is a syntax error, visudo refuses to save and highlights the error line.',
      realWorldAnalogy: 'A surgeon preparing a sterilized operating room with backup generators before making an incision.',
      terms: [
        { term: 'sudoedit', simple: 'A secure command that edits config files using your own user editor safely.', technical: 'sudo -e flag copying target file to temporary sandbox, invoking user $EDITOR, and committing back with atomic rename.' },
        { term: 'Syntax Linter', simple: 'A tool that checks configuration files for typos before you reload.', technical: 'Service-specific verification flags (nginx -t, apache2ctl configtest, sshd -t).' }
      ],
      syntaxCode: 'sudo visudo',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with root privileges' },
        { token: 'visudo', role: 'command', explanation: 'Safely edit /etc/sudoers with syntax validation lock' }
      ],
      variations: [
        { syntax: 'sudo nginx -t', title: 'Test Nginx Syntax', whatItDoes: 'Validates all Nginx configuration files for syntax errors', whenToUse: 'Mandatory before reloading web servers' },
        { syntax: 'sudo systemctl reload nginx', title: 'Graceful Reload', whatItDoes: 'Applies new configs without dropping active client connections', whenToUse: 'Production configuration changes' }
      ],
      beforeAfter: {
        before: '$ sudo nginx -t\n[Checking syntax...]',
        after: 'nginx: the configuration file /etc/nginx/nginx.conf syntax is ok\nnginx: configuration file /etc/nginx/nginx.conf test is successful',
        explanation: 'Confirms configuration is 100% valid before applying changes.'
      },
      expectedOutput: 'syntax is ok\ntest is successful',
      whatChanges: ['Validates configuration files in memory.'],
      whatDoesNotChange: ['Running service daemon continues uninterrupted.'],
      safeRecovery: 'If a bad config broke a service, restore your backup: "sudo cp config.bak config" and reload.',
      commonMistakes: [
        { mistake: 'Editing /etc/sudoers with regular "sudo vim /etc/sudoers"', whyItHappens: 'Not knowing visudo exists.', howToFix: 'ALWAYS use "sudo visudo" to edit sudoers; it guarantees syntax verification before saving.' },
        { mistake: 'Running "systemctl restart" instead of "systemctl reload"', whyItHappens: 'Restart drops all active client web connections; reload applies changes seamlessly with zero downtime.', howToFix: 'Use "systemctl reload" whenever possible.' }
      ]
    })
  ]
};
