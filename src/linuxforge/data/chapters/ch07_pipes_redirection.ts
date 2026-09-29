import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 07: PIPES AND REDIRECTION (07.1 to 07.14)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_07: LinuxTopic = {
  id: 'ch-07',
  number: '07',
  title: 'Pipes and Redirection',
  iconName: 'GitFork',
  description: 'Connect commands, redirect standard I/O streams, multiplex with tee, and build resilient command chains.',
  concepts: [
    buildLinuxConcept({
      id: 'c-07-01',
      subChapterNumber: '07.1',
      command: 'ls -l > directory_listing.txt',
      title: 'Output Redirection',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Diverting standard output stream from the display terminal into filesystem storage',
      badges: ['Streams', 'Redirection', 'Core'],
      difficulty: 'Beginner',
      quote: 'Redirection is how Unix lets you capture live ephemeral terminal thoughts into permanent disk files.',
      whatIsIt: 'Output Redirection is the operating system mechanism that intercepts the standard output stream (fd 1) of a process before execution and binds it to a file. In POSIX shells, this is accomplished by opening the target file in the shell process and using the dup2() system call to overwrite fd 1 prior to execve().',
      inSimpleWords: 'Normally, command results appear on your terminal screen and vanish when you scroll away. Output redirection takes that exact text and saves it into a permanent file on your hard drive instead.',
      whyDoYouNeedIt: 'You need output redirection to save command reports, export database query dumps, generate configuration files, and capture cron logs.',
      realWorldScenario: 'You are auditing user accounts on a fleet of servers. You run "cut -d: -f1 /etc/passwd > server01_users.txt". Instead of printing to screen, the full list of 40 users is cleanly saved into a text file ready for scp transfer.',
      realWorldAnalogy: 'Attaching a garden hose to a water spigot. Instead of spraying water all over the ground (terminal screen), the hose directs the flow into a water barrel (file).',
      withoutVsWith: {
        without: {
          title: 'Working Without Output Redirection',
          items: ['Manually selecting and copy-pasting terminal text with a mouse', 'Losing outputs when remote SSH sessions disconnect', 'Inability to save automated cron job results'],
          outcome: 'Error-prone manual copy-pasting, lost data, and zero automated file creation.'
        },
        with: {
          title: 'Using Output Redirection Masterfully',
          items: ['Capturing millions of records directly to disk in milliseconds', 'Writing clean data files without human intervention', 'Idempotent configuration generation in Ansible and Bash'],
          outcome: 'High-speed automated workflows, zero data loss, and seamless script pipelines.'
        }
      },
      blockDiagram: {
        title: 'Output Redirection Mechanism (dup2 syscall)',
        subtitle: 'How the shell rewires stdout before running commands:',
        nodes: [
          { id: 'fork', label: '1. Shell fork()', simpleDef: 'Creates child process copy of shell', techDef: 'clone() / fork() syscall', badge: 'Process', color: '#38bdf8' },
          { id: 'open', label: '2. open(file, O_WRONLY|O_CREAT)', simpleDef: 'Opens or creates target destination file', techDef: 'Obtains new file descriptor targeting inode', badge: 'VFS', color: '#a855f7' },
          { id: 'dup2', label: '3. dup2(file_fd, 1)', simpleDef: 'Overwrites fd 1 with target file', techDef: 'Atomic file descriptor table remapping', badge: 'Kernel', color: '#10b981' },
          { id: 'exec', label: '4. execve(command)', simpleDef: 'Launches program; program writes to fd 1 unknowingly', techDef: 'Program outputs to file automatically', badge: 'Execution', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'dup2() Syscall', simple: 'The kernel operation that swaps one file stream for another.', technical: 'Duplicates an open file descriptor onto another descriptor atomically.' },
        { term: 'Truncation', simple: 'Wiping a file clean to 0 bytes before writing new data.', technical: 'O_TRUNC open flag resetting file size to zero.' }
      ],
      syntaxCode: 'command > output_file.txt',
      syntaxTokens: [
        { token: 'command', role: 'command', explanation: 'Executable producing stdout' },
        { token: '>', role: 'operator', explanation: 'Redirect stdout (fd 1) to file, truncating existing content' },
        { token: 'output_file.txt', role: 'path', explanation: 'Target output destination file' }
      ],
      variations: [
        { syntax: 'command >> file.txt', title: 'Append Redirection', whatItDoes: 'Appends data to bottom without truncating existing content', whenToUse: 'When recording continuous log events' },
        { syntax: 'command 1> file.txt', title: 'Explicit stdout Redirection', whatItDoes: 'Identical to > with explicit file descriptor 1', whenToUse: 'Formal scripts' }
      ],
      beforeAfter: {
        before: '$ date > timestamp.txt\n[Terminal displays nothing]',
        after: '$ cat timestamp.txt\nSat Sep 28 11:00:00 UTC 2024',
        explanation: 'Data stream bypassed the terminal display and was written directly into timestamp.txt.'
      },
      expectedOutput: '[Output written to file cleanly]',
      whatChanges: ['Creates or overwrites target file.'],
      whatDoesNotChange: ['Terminal screen display receives no output.'],
      safeRecovery: 'If you accidentally truncated an important file with ">", restore from backup. Use "set -o noclobber" in ~/.bashrc to prevent accidental overwrites.',
      commonMistakes: [
        { mistake: 'Redirecting a command into the same file it is reading (e.g. sort file.txt > file.txt)', whyItHappens: 'The shell truncates file.txt to 0 bytes BEFORE sort starts, wiping all your data!', howToFix: 'Redirect to a temporary file, then move it: "sort file.txt > tmp.txt && mv tmp.txt file.txt".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-07-02',
      subChapterNumber: '07.2',
      command: 'echo "server_name example.com;" > /etc/nginx/conf.d/site.conf',
      title: '>',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'The overwrite operator: truncates file to 0 bytes and writes new stdout stream',
      badges: ['Redirection', 'Overwrite', 'Core'],
      difficulty: 'Beginner',
      quote: 'Single ">" is the overwrite operator: it wipes the blackboard completely before writing new words.',
      whatIsIt: 'The single greater-than operator ">" redirects standard output (fd 1) to a file with the O_TRUNC flag. If the target file already exists, the kernel immediately zeroes its length to 0 bytes before writing the new stream. If the file does not exist, it is created with default umask permissions.',
      inSimpleWords: 'Think of ">" as an erase-and-write operation. If the file had 1,000 lines of old text, typing ">" erases all 1,000 lines and replaces them with your new output.',
      whyDoYouNeedIt: 'You need ">" when generating fresh configuration files, resetting caches, or wiping log files down to zero bytes.',
      realWorldScenario: 'A server\'s disk is 100% full because of a bloated log file. You cannot delete the file because a running service holds it open. You run: "> /var/log/app.log". The file is instantly truncated to 0 bytes, freeing disk space immediately without restarting the service.',
      realWorldAnalogy: 'Erasing a whiteboard completely with a dry sponge and writing today\'s agenda.',
      terms: [
        { term: 'O_TRUNC', simple: 'The kernel flag that instantly wipes a file clean.', technical: 'POSIX open() flag causing an existing regular file to be truncated to length zero.' },
        { term: 'noclobber', simple: 'A shell safety setting that refuses to overwrite existing files with >.', technical: 'Bash option (set -o noclobber or set -C) preventing > from overwriting existing files.' }
      ],
      syntaxCode: 'echo "text" > target_file',
      syntaxTokens: [
        { token: 'echo "text"', role: 'command', explanation: 'Produce text string' },
        { token: '>', role: 'operator', explanation: 'Overwrite and truncate destination file' },
        { token: 'target_file', role: 'path', explanation: 'Destination file path' }
      ],
      variations: [
        { syntax: '> file.log', title: 'Instant File Truncation', whatItDoes: 'Truncates file to 0 bytes without executing any program', whenToUse: 'Instant disk space emergency remediation' },
        { syntax: 'echo "text" >| file.txt', title: 'Force Overwrite Past Noclobber', whatItDoes: 'Overrides noclobber safety lock to overwrite file intentionally', whenToUse: 'Script automation with noclobber active' }
      ],
      beforeAfter: {
        before: '$ cat config.txt\nold_setting=false\n$ echo "new_setting=true" > config.txt',
        after: '$ cat config.txt\nnew_setting=true',
        explanation: 'The old contents were completely erased and replaced with the new string.'
      },
      expectedOutput: 'new_setting=true',
      whatChanges: ['Truncates file length to zero and writes new bytes.'],
      whatDoesNotChange: ['File ownership and permissions remain unchanged.'],
      safeRecovery: 'Single ">" overwrites permanently. Keep backups of critical files before overwriting.',
      commonMistakes: [
        { mistake: 'Using ">" when you intended to append (">>")', whyItHappens: 'Typing one bracket instead of two accidentally deletes historical log data.', howToFix: 'Always double-check: single ">" overwrites, double ">>" appends.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-07-03',
      subChapterNumber: '07.3',
      command: 'echo "192.168.1.50 db.internal" >> /etc/hosts',
      title: '>>',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'The append operator: preserves existing content and writes to the end of the file',
      badges: ['Redirection', 'Append', 'Core'],
      difficulty: 'Beginner',
      quote: 'Double ">>" is the append operator: it never erases; it respectfully adds new lines to the bottom.',
      whatIsIt: 'The double greater-than operator ">>" redirects standard output (fd 1) to a file with the O_APPEND flag. If the file exists, the kernel seeks to the very end of the file before every write, guaranteeing that existing contents are preserved and new data is added to the bottom. If the file does not exist, it is created.',
      inSimpleWords: 'Think of ">>" as adding a new entry to the bottom of a diary. You don\'t tear out all the old pages; you simply turn to the next blank line and write today\'s entry.',
      whyDoYouNeedIt: 'You need ">>" for appending log entries, adding hosts to /etc/hosts, appending SSH public keys to ~/.ssh/authorized_keys, and recording audit histories.',
      realWorldScenario: 'You are adding an admin\'s public SSH key to a cloud server. If you use ">", you wipe out all existing administrator keys and lock your team out! You execute: "cat new_key.pub >> ~/.ssh/authorized_keys". The new key is appended safely.',
      realWorldAnalogy: 'Adding a new line to a grocery shopping list taped to the refrigerator.',
      terms: [
        { term: 'O_APPEND', simple: 'The kernel flag that forces all writes to happen at the very end of the file.', technical: 'POSIX open() flag ensuring atomic writes to the end of file even across multiple processes.' }
      ],
      syntaxCode: 'command >> target_file',
      syntaxTokens: [
        { token: 'command', role: 'command', explanation: 'Program producing output' },
        { token: '>>', role: 'operator', explanation: 'Append stdout (fd 1) to end of destination file' },
        { token: 'target_file', role: 'path', explanation: 'Target file receiving appended lines' }
      ],
      variations: [
        { syntax: 'date >> /var/log/deployments.log', title: 'Log Deployment Timestamp', whatItDoes: 'Appends current date and time to history log', whenToUse: 'Audit tracking in CI/CD' },
        { syntax: 'cat chunk*.dat >> combined.dat', title: 'Append Multi-Part Chunks', whatItDoes: 'Glues multiple data chunks onto destination file sequentially', whenToUse: 'Reassembling split archives' }
      ],
      beforeAfter: {
        before: '$ cat notes.txt\nLine 1\n$ echo "Line 2" >> notes.txt',
        after: '$ cat notes.txt\nLine 1\nLine 2',
        explanation: 'Line 2 was appended to the bottom while Line 1 was preserved intact.'
      },
      expectedOutput: 'Line 1\nLine 2',
      whatChanges: ['Appends new bytes to end of file, expanding file size.'],
      whatDoesNotChange: ['All existing bytes prior to the append are completely preserved.'],
      safeRecovery: 'If you accidentally appended bad lines, open the file in nano or vim and delete the bottom lines.',
      commonMistakes: [
        { mistake: 'Accidentally typing ">" instead of ">>" when appending authorized_keys', whyItHappens: 'Single keystroke typo that obliterates all existing SSH keys.', howToFix: 'Double check before pressing Enter, or use ssh-copy-id which handles this safely.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-07-04',
      subChapterNumber: '07.4',
      command: 'mysql -u root -p database_name < schema.sql',
      title: 'Input Redirection',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Feeding file contents into a command\'s standard input stream (fd 0)',
      badges: ['Streams', 'stdin', 'Core'],
      difficulty: 'Beginner',
      quote: 'Input redirection feeds files into programs that expect interactive keyboard input.',
      whatIsIt: 'Input Redirection uses the less-than operator "<" to bind a program\'s standard input stream (fd 0) to a file. Instead of waiting for a human to type keystrokes at the terminal, the kernel streams bytes directly from the file into the program\'s read() system calls until End-Of-File (EOF) is reached.',
      inSimpleWords: 'Normally, programs like database clients or python scripts wait for you to type commands on your keyboard. Input redirection points the program at a file so it reads the file as if you typed every character at lightning speed.',
      whyDoYouNeedIt: 'You need input redirection to restore database backups (MySQL, PostgreSQL), feed input files into calculators (bc), and process batch text files automatically.',
      realWorldScenario: 'You are deploying a database migration containing 500 SQL tables. You run "mysql -u dbadmin -p production < migration.sql". MySQL reads all 50,000 SQL statements through stdin and finishes in 3 seconds.',
      realWorldAnalogy: 'Feeding a punch card or floppy disk into an automated computer reader.',
      terms: [
        { term: 'EOF (End of File)', simple: 'The special signal that tells a program there is no more data to read.', technical: 'Condition when read() system call returns 0 bytes, signaling stream completion.' }
      ],
      syntaxCode: 'command < input_file',
      syntaxTokens: [
        { token: 'command', role: 'command', explanation: 'Program consuming stdin stream' },
        { token: '<', role: 'operator', explanation: 'Redirect stdin (fd 0) from file' },
        { token: 'input_file', role: 'path', explanation: 'Source file to read' }
      ],
      variations: [
        { syntax: 'bc -l < calculations.txt', title: 'Feed Math to Calculator', whatItDoes: 'Calculates all math formulas stored in text file', whenToUse: 'Automated arithmetic processing' },
        { syntax: 'wc -w < essay.txt', title: 'Count Words via stdin', whatItDoes: 'Counts words without printing the filename in output', whenToUse: 'Clean script variable extraction' }
      ],
      beforeAfter: {
        before: '$ psql -d mydb < create_tables.sql\n[Streaming SQL schema into PostgreSQL...]',
        after: 'CREATE TABLE\nCREATE INDEX\nCOMMIT',
        explanation: 'All database statements from create_tables.sql were processed cleanly through stdin.'
      },
      expectedOutput: '[Input consumed from file cleanly]',
      whatChanges: ['Reads data from input file into process stdin buffer.'],
      whatDoesNotChange: ['Input file is opened read-only; 100% untouched.'],
      safeRecovery: '100% safe read-only operation.',
      commonMistakes: [
        { mistake: 'Confusing "<" with ">" and accidentally wiping the file', whyItHappens: 'Typing > wipes the file before the program can read it!', howToFix: 'Remember: arrow points toward the command ("cmd < file") to read.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-07-05',
      subChapterNumber: '07.5',
      command: 'tr \'[a-z]\' \'[A-Z]\' < input.txt',
      title: '<',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'The single less-than operator connecting files to standard input',
      badges: ['Streams', 'Redirection', 'Core'],
      difficulty: 'Beginner',
      quote: 'The < operator changes where a program listens: instead of listening to you, it listens to the file.',
      whatIsIt: 'The single "<" operator opens the specified file in read-only mode (O_RDONLY) and uses dup2() to attach its file descriptor to fd 0 of the child process. Any command that reads from standard input (tr, sort, mail, cat, bc) immediately consumes data from the file.',
      inSimpleWords: 'Commands like "tr" (translate characters) do not accept filenames as arguments; they only read from stdin. The "<" operator lets you feed files into commands like "tr" effortlessly.',
      whyDoYouNeedIt: 'Many classic Unix filters strictly read from standard input. "<" connects those tools to files on your disk.',
      realWorldScenario: 'You need to convert a text file to all uppercase letters. The "tr" command cannot take a filename argument ("tr \'a-z\' \'A-Z\' file.txt" fails). You use input redirection: "tr \'a-z\' \'A-Z\' < file.txt > uppercase.txt".',
      realWorldAnalogy: 'Plugging an audio cable from an MP3 player into a speaker instead of singing into the microphone.',
      terms: [
        { term: 'O_RDONLY', simple: 'Opening a file for reading only, preventing any modifications.', technical: 'POSIX file access flag guaranteeing the file cannot be written to or corrupted.' }
      ],
      syntaxCode: 'command < file',
      syntaxTokens: [
        { token: 'command', role: 'command', explanation: 'Target utility' },
        { token: '<', role: 'operator', explanation: 'Input redirection operator' },
        { token: 'file', role: 'path', explanation: 'Source data file' }
      ],
      variations: [
        { syntax: 'sort < unsorted.txt', title: 'Sort from stdin', whatItDoes: 'Sorts lines read from file stream', whenToUse: 'Filtering files' },
        { syntax: 'grep "admin" < /etc/group', title: 'Filter File via stdin', whatItDoes: 'Searches for pattern without passing file as argument', whenToUse: 'Stream processing' }
      ],
      beforeAfter: {
        before: '$ cat words.txt\nhello world\n$ tr \'a-z\' \'A-Z\' < words.txt',
        after: 'HELLO WORLD',
        explanation: 'The tr command consumed the file stream through stdin and output uppercase characters.'
      },
      expectedOutput: 'HELLO WORLD',
      whatChanges: ['Streams file bytes into process.'],
      whatDoesNotChange: ['Input file is completely unmodified.'],
      safeRecovery: '100% safe read-only operation.',
      commonMistakes: [
        { mistake: 'Trying to pass a filename argument to commands that only accept stdin (like tr)', whyItHappens: 'Expecting "tr a-z A-Z file.txt" to work.', howToFix: 'Use "tr a-z A-Z < file.txt".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-07-06',
      subChapterNumber: '07.6',
      command: 'ps aux | grep nginx',
      title: 'Pipes |',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'The pipe operator (|): Douglas McIlroy\'s revolutionary stream connector uniting Unix programs',
      badges: ['Pipes', 'UnixPhilosophy', 'Core'],
      difficulty: 'Beginner',
      quote: 'The Pipe is the crowning invention of Unix: it allows small, simple tools to be composed into infinite solutions.',
      whatIsIt: 'Invented by Douglas McIlroy at Bell Labs in 1973, the Pipe operator "|" creates an anonymous unidirectional inter-process communication (IPC) channel in kernel memory via the pipe() system call. It binds the standard output (fd 1) of the command on the left directly to the standard input (fd 0) of the command on the right. Both processes run concurrently in parallel, streaming data without writing a single byte to disk.',
      inSimpleWords: 'A pipe connects the output mouth of one program directly into the input ear of another program. You can connect five or ten tools together in a chain, creating complex data pipelines in one readable line.',
      whyDoYouNeedIt: 'Without pipes, every intermediate step would have to write temporary files to your hard drive, slowing down operations by 100x and wearing out disk storage. Pipes happen 100% in RAM memory at gigabytes per second.',
      realWorldScenario: 'You need to find which IP address is hitting your web server most frequently. You chain commands with pipes: "cat access.log | awk \'{print $1}\' | sort | uniq -c | sort -nr | head -n 5". In 2 seconds, you see the top 5 offending IPs streaming through RAM.',
      realWorldAnalogy: 'An assembly line conveyor belt. Worker A cuts the steel, drops it onto the belt, Worker B stamps it, drops it onto the next belt, and Worker C paints it.',
      withoutVsWith: {
        without: {
          title: 'Working Without Unix Pipes',
          items: ['Every step must write temporary files to disk (tmp1.txt, tmp2.txt)', 'Disk I/O bottlenecks slow processing by 100x', 'Cleaning up dozens of temporary scratch files manually'],
          outcome: 'Bloated disk usage, slow batch processing, and complex cleanup logic.'
        },
        with: {
          title: 'Using Unix Pipes Masterfully',
          items: ['Zero disk I/O: streaming happens directly in kernel RAM buffers', 'Both processes execute concurrently in parallel on multiple CPU cores', 'Composing small, single-purpose utilities into powerful pipelines'],
          outcome: 'Maximum execution speed, minimal memory overhead, and elegant one-liners.'
        }
      },
      blockDiagram: {
        title: 'Unix Anonymous Pipe Kernel Architecture',
        subtitle: 'Concurrent streaming via kernel ring buffer:',
        nodes: [
          { id: 'left', label: 'Left Process (ps aux)', simpleDef: 'Generates process list text', techDef: 'Writes to stdout (fd 1 bound to pipe write-end)', badge: 'Producer', color: '#38bdf8' },
          { id: 'pipe', label: 'Kernel Pipe Buffer', simpleDef: '64KB circular ring buffer in RAM', techDef: 'struct pipe_inode_info in Linux kernel memory', badge: 'Kernel RAM', color: '#10b981' },
          { id: 'right', label: 'Right Process (grep nginx)', simpleDef: 'Filters matching lines', techDef: 'Reads from stdin (fd 0 bound to pipe read-end)', badge: 'Consumer', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'pipe() Syscall', simple: 'The kernel command that creates a memory pipe buffer.', technical: 'Allocates a ring buffer (default 64KB) and returns two file descriptors: read-end and write-end.' },
        { term: 'SIGPIPE', simple: 'The signal sent to the left program if the right program closes early.', technical: 'Kernel signal terminated on broken pipe (e.g. piping into "head" which quits after 10 lines).' }
      ],
      syntaxCode: 'command1 | command2',
      syntaxTokens: [
        { token: 'command1', role: 'command', explanation: 'First command producing output stream' },
        { token: '|', role: 'operator', explanation: 'Pipe operator connecting stdout of command1 to stdin of command2' },
        { token: 'command2', role: 'command', explanation: 'Second command consuming stream' }
      ],
      variations: [
        { syntax: 'cat /var/log/syslog | grep -i error | wc -l', title: 'Multi-Stage Pipeline', whatItDoes: 'Streams log $\rightarrow$ filters errors $\rightarrow$ counts matching lines', whenToUse: 'Complex log data processing' },
        { syntax: 'ls -la /usr/bin | less', title: 'Pipe into Pager', whatItDoes: 'Pipes huge directory listing into scrollable pager', whenToUse: 'When output is too long to fit on screen' }
      ],
      beforeAfter: {
        before: '$ ps aux\n[Dumps 300 lines of running processes, scrolling past screen]\n$ ps aux | grep nginx',
        after: 'root      1402  0.0  0.1  42800  9200 ?  Ss  10:00  0:00 nginx: master process\nwww-data  1403  0.0  0.1  43200  8400 ?  S   10:00  0:00 nginx: worker process',
        explanation: 'The pipe filtered 300 noisy processes down to the exact 2 Nginx processes you cared about.'
      },
      expectedOutput: 'nginx: master process\nnginx: worker process',
      whatChanges: ['Forks concurrent processes connected by kernel pipe.'],
      whatDoesNotChange: ['Filesystem storage is completely untouched; zero temporary files created.'],
      safeRecovery: 'Pipes are completely safe in-memory streams. Press Ctrl+C to cancel pipeline execution.',
      commonMistakes: [
        { mistake: 'Trying to pipe into commands that do not accept stdin (like "ps aux | kill")', whyItHappens: 'kill expects arguments, not a stream.', howToFix: 'Use xargs to convert streams into arguments: "ps aux | grep app | awk \'{print $2}\' | xargs kill".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-07-07',
      subChapterNumber: '07.7',
      command: 'cat /var/log/nginx/access.log | cut -d\' \' -f1 | sort | uniq -c | sort -nr | head -n 10',
      title: 'Combining Commands',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Composing powerful data processing pipelines adhering to the Unix Philosophy',
      badges: ['Pipelines', 'Analytics', 'BestPractices'],
      difficulty: 'Intermediate',
      quote: 'Write programs that do one thing and do it well. Write programs to work together. — Doug McIlroy',
      whatIsIt: 'Combining commands is the practical manifestation of the Unix Philosophy. By chaining specialized, single-purpose utilities (cut, sort, uniq, grep, sed, awk, wc, head) through pipes, an engineer can perform sophisticated data aggregation, statistical analysis, and security auditing without writing complex Python or Java scripts.',
      inSimpleWords: 'Instead of building one giant, bloated program that does everything poorly, Linux gives you twenty tiny, razor-sharp tools. You snap them together like Lego bricks to solve any problem.',
      whyDoYouNeedIt: 'During high-pressure production incidents, you do not have time to write and deploy a custom script. Knowing how to combine commands lets you extract answers from logs in 30 seconds.',
      realWorldScenario: 'Your web server is running out of memory. You need to identify the top 5 memory-hungry processes. You run: "ps -eo pid,ppid,cmd,%mem --sort=-%mem | head -n 6". The combined pipeline delivers the answer instantly.',
      realWorldAnalogy: 'Snapping modular Lego blocks together to build a spaceship.',
      terms: [
        { term: 'Unix Philosophy', simple: 'The philosophy of small, sharp tools that work together via text streams.', technical: 'Software design pattern emphasizing modularity, text-based IPC streams, and separation of mechanism and policy.' },
        { term: 'Filter', simple: 'A command that reads text, transforms it, and outputs the result.', technical: 'A program designed to process stdin sequentially and emit transformed lines to stdout.' }
      ],
      syntaxCode: 'cmd1 | cmd2 | cmd3 | cmd4 > output.txt',
      syntaxTokens: [
        { token: 'cmd1', role: 'command', explanation: 'Source data generator' },
        { token: '|', role: 'operator', explanation: 'Stream connector' },
        { token: 'cmd2', role: 'command', explanation: 'Field extractor or filter' },
        { token: 'cmd3', role: 'command', explanation: 'Sorting and deduplication' },
        { token: '> output.txt', role: 'path', explanation: 'Final redirected destination file' }
      ],
      variations: [
        { syntax: 'dmesg | grep -i error | tail -n 20', title: 'Hardware Error Triage', whatItDoes: 'Extracts and shows the 20 most recent kernel hardware errors', whenToUse: 'When debugging server crashes' },
        { syntax: 'dpkg -l | grep "^ii" | wc -l', title: 'Count Installed Packages', whatItDoes: 'Counts total installed Debian packages on the system', whenToUse: 'System capacity auditing' }
      ],
      beforeAfter: {
        before: '$ cat web.log | cut -d\' \' -f1 | sort | uniq -c\n[Aggregating and counting unique IP hits...]',
        after: '  142 192.168.1.10\n 5280 203.0.113.42\n   12 10.0.0.1',
        explanation: 'Aggregated raw log lines into clean frequency counts, exposing IP 203.0.113.42 as a possible attacker.'
      },
      expectedOutput: '5280 203.0.113.42',
      whatChanges: ['Streams data through multiple concurrent process memory buffers.'],
      whatDoesNotChange: ['Original source log files remain completely unaltered.'],
      safeRecovery: '100% safe read-only analysis pipeline.',
      commonMistakes: [
        { mistake: 'Running "uniq" on unsorted data', whyItHappens: 'uniq ONLY matches adjacent consecutive lines!', howToFix: 'Always run "sort" immediately BEFORE "uniq" (e.g. sort | uniq -c).' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-07-08',
      subChapterNumber: '07.8',
      command: 'echo "deb http://repo.site.com stable main" | sudo tee /etc/apt/sources.list.d/site.list',
      title: 'tee',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'The T-splitter: duplicate standard input to both screen and file simultaneously',
      badges: ['Streams', 'tee', 'Privilege'],
      difficulty: 'Beginner',
      quote: 'tee is a plumbing T-fitting: one stream goes to your eyes, and one stream flows into the file.',
      whatIsIt: 'tee (named after the T-splitter fitting used in water plumbing) reads standard input and duplicates it to two destinations at once: it writes to standard output (displaying on your screen) AND writes to one or more files on disk. Combined with sudo ("sudo tee"), it allows non-root users to write output into root-protected files where regular shell redirection fails.',
      inSimpleWords: 'Normally, redirecting to a file ("echo text > file") makes your terminal screen silent. "tee" lets you see the output on your screen AND save it to a file at the exact same time.',
      whyDoYouNeedIt: 'Running "sudo echo text > /etc/protected.conf" FAILS with "Permission denied" because the shell handles ">" before sudo runs! Using "echo text | sudo tee /etc/protected.conf" solves this because tee runs with sudo privileges.',
      realWorldScenario: 'You are adding a new software repository to /etc/apt/sources.list.d/. Typing "sudo echo \'repo\' > /etc/apt/sources.list.d/repo.list" errors with "Permission denied". You type: "echo \'repo\' | sudo tee /etc/apt/sources.list.d/repo.list". It writes cleanly with root authorization.',
      realWorldAnalogy: 'A T-shaped water pipe joint that feeds water into a garden sprinkler while simultaneously filling an underground storage tank.',
      terms: [
        { term: 'T-Pipe Fitting', simple: 'Plumbing connector splitting one fluid stream into two branches.', technical: 'Process reading fd 0 and calling write() on both fd 1 and a specified output file fd.' },
        { term: 'tee -a (Append)', simple: 'Appends to the file instead of overwriting.', technical: 'Opens target file with O_APPEND flag.' }
      ],
      syntaxCode: 'command | sudo tee [OPTIONS] FILE',
      syntaxTokens: [
        { token: 'command', role: 'command', explanation: 'Produces data stream' },
        { token: '|', role: 'operator', explanation: 'Pipes stream to tee' },
        { token: 'sudo tee', role: 'command', explanation: 'Execute tee with superuser privileges' },
        { token: 'FILE', role: 'path', explanation: 'Destination file path' }
      ],
      variations: [
        { syntax: 'command | tee -a log.txt', title: 'Append Mode', whatItDoes: 'Appends to log.txt while displaying on screen', whenToUse: 'When monitoring builds and logging history' },
        { syntax: 'command | sudo tee /etc/file > /dev/null', title: 'Silent Root Write', whatItDoes: 'Writes to protected file without echoing text to screen', whenToUse: 'Cleaner output in automated scripts' }
      ],
      beforeAfter: {
        before: '$ sudo echo "nameserver 1.1.1.1" > /etc/resolv.conf\nbash: /etc/resolv.conf: Permission denied\n$ echo "nameserver 1.1.1.1" | sudo tee /etc/resolv.conf',
        after: 'nameserver 1.1.1.1\n[File successfully written with root privileges]',
        explanation: 'tee bypassed the shell permission restriction by executing with sudo privileges.'
      },
      expectedOutput: 'nameserver 1.1.1.1',
      whatChanges: ['Writes data bytes into target file and streams to stdout.'],
      whatDoesNotChange: ['Process environment is unmodified.'],
      safeRecovery: 'If tee overwrote the wrong file, restore from backup.',
      commonMistakes: [
        { mistake: 'Trying to use "sudo echo text > /etc/file" and wondering why it fails with Permission Denied', whyItHappens: 'The shell opens the file with YOUR unprivileged user permissions BEFORE sudo ever runs.', howToFix: 'Always use "echo text | sudo tee /etc/file".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-07-09',
      subChapterNumber: '07.9',
      command: 'find /var -name "*.conf" 2> /dev/null',
      title: 'stderr Redirection',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Capturing, logging, or silencing file descriptor 2 error streams',
      badges: ['Streams', 'stderr', 'Core'],
      difficulty: 'Beginner',
      quote: 'Do not let thousands of "Permission denied" lines drown out the one result you actually care about.',
      whatIsIt: 'stderr Redirection targets File Descriptor 2 specifically using "2>". It allows administrators to isolate warnings and error messages into a dedicated error log, or discard noisy permission warnings entirely by sending them to "/dev/null".',
      inSimpleWords: 'When searching through system directories as an unprivileged user, the terminal gets flooded with 500 lines of "Permission denied". Redirecting errors with "2> /dev/null" silences the noise so only the successful results appear on your screen.',
      whyDoYouNeedIt: 'It keeps terminal output clean and legible during diagnostics, and ensures automated scripts can log errors separately from business data.',
      realWorldScenario: 'You are searching for a lost configuration file in /var. Running "find /var -name \'app.conf\'" dumps 200 lines of "Permission denied" because you do not have root access to every folder. Adding "2> /dev/null" silences all 200 error lines, revealing the single line: "/var/www/app.conf" instantly.',
      realWorldAnalogy: 'Putting noise-canceling headphones on to block out construction jackhammers while listening to an audio lecture.',
      terms: [
        { term: '2> Redirection', simple: 'Directing error messages specifically.', technical: 'Shell redirection modifying file descriptor 2 mapping.' },
        { term: '/dev/null', simple: 'The universal black hole that discards all data written to it.', technical: 'Linux virtual character device driver discarding all write buffers and returning success.' }
      ],
      syntaxCode: 'command 2> error_destination',
      syntaxTokens: [
        { token: 'find', role: 'command', explanation: 'Search command' },
        { token: '2>', role: 'operator', explanation: 'Redirect file descriptor 2 (stderr)' },
        { token: '/dev/null', role: 'path', explanation: 'Bit-bucket device that discards data' }
      ],
      variations: [
        { syntax: 'command 2>> errors.log', title: 'Append Errors to Log', whatItDoes: 'Appends diagnostic errors to an audit log file', whenToUse: 'Background server daemons' },
        { syntax: 'command 2> /tmp/err.txt', title: 'Capture Error Log', whatItDoes: 'Saves errors into temporary file for inspection', whenToUse: 'Debugging failing commands' }
      ],
      beforeAfter: {
        before: '$ find /etc -name "hosts"\nfind: \'/etc/ssl/private\': Permission denied\nfind: \'/etc/polkit-1/localauthority\': Permission denied\n/etc/hosts\n$ find /etc -name "hosts" 2> /dev/null',
        after: '/etc/hosts',
        explanation: 'All noisy permission errors were discarded, displaying only the valid result.'
      },
      expectedOutput: '/etc/hosts',
      whatChanges: ['Diverts fd 2 stream to destination.'],
      whatDoesNotChange: ['Normal stdout (fd 1) is completely untouched.'],
      safeRecovery: '100% safe redirection.',
      commonMistakes: [
        { mistake: 'Accidentally putting a space between 2 and > (e.g. "command 2 > file")', whyItHappens: 'Bash treats "2" as an argument and ">" as stdout redirection!', howToFix: 'Never put a space: write "2>".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-07-10',
      subChapterNumber: '07.10',
      command: 'backup.sh > backup.log 2>&1',
      title: 'stdout + stderr',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Merging stream 1 and stream 2 into a single unified chronological log file',
      badges: ['Streams', 'Logging', 'Essential'],
      difficulty: 'Intermediate',
      quote: 'When logging a background server job, you must capture both stdout and stderr in chronological sequence.',
      whatIsIt: 'Merging stdout and stderr combines both File Descriptor 1 and File Descriptor 2 into the exact same destination file. The classic POSIX syntax is "> file.log 2>&1" (read as: redirect stdout to file.log, then redirect stderr (2) to wherever stdout (1) is currently pointing). Modern Bash also supports the shorthand "&> file.log".',
      inSimpleWords: 'If a command outputs both normal status messages and warning errors, you want them written into the same log file in the exact order they happened. Merging streams does this.',
      whyDoYouNeedIt: 'Cron jobs and background server daemons require merging streams. If you only redirect stdout, error messages get lost or trigger unwanted automated emails from cron.',
      realWorldScenario: 'You configure a nightly database backup cron job: "0 2 * * * /opt/backup.sh > /var/log/backup.log 2>&1". If the backup succeeds, normal output is logged. If the backup fails at 2:05 AM, the exact error trace is logged in chronological order in the same file.',
      realWorldAnalogy: 'A dual-channel audio recorder mixing both the interviewer and guest microphones onto a single unified audio track.',
      terms: [
        { term: '2>&1', simple: 'Make stream 2 (errors) point to stream 1 (output).', technical: 'dup2(1, 2) system call duplicating file descriptor 1 onto descriptor 2.' },
        { term: '&> (Bash Shorthand)', simple: 'Bash shortcut for redirecting both stdout and stderr at once.', technical: 'Non-POSIX Bash syntactic sugar equivalent to >file 2>&1.' }
      ],
      syntaxCode: 'command > output.log 2>&1',
      syntaxTokens: [
        { token: 'command', role: 'command', explanation: 'Target command' },
        { token: '> output.log', role: 'operator', explanation: 'Redirect stdout (1) to output.log' },
        { token: '2>&1', role: 'operator', explanation: 'Duplicate stdout (1) onto stderr (2)' }
      ],
      variations: [
        { syntax: 'command &> output.log', title: 'Bash Modern Shorthand', whatItDoes: 'Redirects both stdout and stderr in one concise token', whenToUse: 'Modern Bash environments' },
        { syntax: 'command &>> output.log', title: 'Append Both Streams', whatItDoes: 'Appends both stdout and stderr to existing log file', whenToUse: 'Ongoing daemon logging' }
      ],
      beforeAfter: {
        before: '$ ./deploy.sh > deploy.log 2>&1\n[Terminal silent; all outputs and errors captured]',
        after: '$ cat deploy.log\nStarting deployment...\nWARNING: Cache missing, rebuilding...\nDeployment complete.',
        explanation: 'Both normal progress lines and warning messages were preserved in chronological order.'
      },
      expectedOutput: '[All output and errors captured in destination file]',
      whatChanges: ['Writes combined stream to target file.'],
      whatDoesNotChange: ['Process execution logic is unchanged.'],
      safeRecovery: 'Non-destructive redirection.',
      commonMistakes: [
        { mistake: 'Reversing the order: "2>&1 > file.log"', whyItHappens: 'Order matters! 2>&1 redirects stderr to where stdout WAS (the screen), then > redirects stdout to the file. Result: errors still appear on screen!', howToFix: 'Always write "> file.log 2>&1" (file destination FIRST, stream merge SECOND).' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-07-11',
      subChapterNumber: '07.11',
      command: 'make && sudo make install',
      title: 'Command Chains',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'Controlling execution flow between multiple commands based on exit codes',
      badges: ['ControlFlow', 'Chains', 'Automation'],
      difficulty: 'Beginner',
      quote: 'Command chains transform isolated commands into intelligent, self-evaluating workflows.',
      whatIsIt: 'Command Chaining connects multiple distinct commands on a single line using control operators: "&&" (logical AND: run next only if previous succeeded), "||" (logical OR: run next only if previous failed), and ";" (sequential: run next regardless of success or failure).',
      inSimpleWords: 'Instead of typing command A, waiting for it to finish, and typing command B, you can link them together. You can say: "Do A, and IF it succeeds, do B. But if it fails, send an alert".',
      whyDoYouNeedIt: 'Chaining is fundamental to automation. It prevents catastrophic cascading errors (like installing broken software or migrating an uncompiled codebase).',
      realWorldScenario: 'You are compiling software from source. You type "make && sudo make install". If "make" fails because of a missing compiler library, Linux stops immediately and does NOT attempt to install broken binaries.',
      realWorldAnalogy: 'A relay race runner who only starts running when the previous runner successfully hands them the baton.',
      terms: [
        { term: 'Conditional Execution', simple: 'Running a command only if the preceding command finished with exit code 0.', technical: 'Short-circuit evaluation of command exit statuses in shell abstract syntax tree.' }
      ],
      syntaxCode: 'command1 && command2 || command3',
      syntaxTokens: [
        { token: 'command1', role: 'command', explanation: 'First command to execute' },
        { token: '&&', role: 'operator', explanation: 'Run next command only if exit code was 0' },
        { token: 'command2', role: 'command', explanation: 'Success handler command' },
        { token: '||', role: 'operator', explanation: 'Run next command if any previous failed' },
        { token: 'command3', role: 'command', explanation: 'Failure remediation command' }
      ],
      variations: [
        { syntax: 'cmd1 ; cmd2', title: 'Unconditional Sequence', whatItDoes: 'Runs cmd1, then runs cmd2 regardless of exit code', whenToUse: 'When subsequent commands do not depend on prior success' }
      ],
      beforeAfter: {
        before: '$ npm test && npm run deploy\n[Tests fail with exit code 1...]',
        after: 'Tests failed. [Deploy was safely aborted!]',
        explanation: '&& prevented broken code from being deployed to production.'
      },
      expectedOutput: '[Safe conditional flow execution]',
      whatChanges: ['Executes subsequent processes conditionally.'],
      whatDoesNotChange: ['Shell rules remain invariant.'],
      safeRecovery: 'Use && to ensure destructive commands only run if safety checks pass.',
      commonMistakes: [
        { mistake: 'Using ";" instead of "&&" when commands depend on each other (e.g. cd /tmp/build ; rm -rf *)', whyItHappens: 'If cd fails, the shell stays in your home folder and deletes everything in your home directory!', howToFix: 'ALWAYS use "&&": "cd /tmp/build && rm -rf *".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-07-12',
      subChapterNumber: '07.12',
      command: 'mkdir -p /var/log/myapp && touch /var/log/myapp/app.log',
      title: '&&',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'The logical AND operator: executes subsequent command ONLY if previous exited with 0',
      badges: ['ControlFlow', 'AND', 'Core'],
      difficulty: 'Beginner',
      quote: '&& is your ultimate safety net: it halts execution the instant an error occurs.',
      whatIsIt: 'The logical AND operator "&&" evaluates commands with short-circuit logic: the command following "&&" is executed if and only if the command preceding "&&" exited with a return status of 0 (SUCCESS). If the first command exits with any non-zero code (FAILURE), the shell skips all subsequent commands in the && chain.',
      inSimpleWords: '"Do Step 1, AND IF that worked, do Step 2". If Step 1 failed, stop right there.',
      whyDoYouNeedIt: 'You must use "&&" whenever Step 2 relies on Step 1 being complete and error-free.',
      realWorldScenario: 'You are downloading and extracting a database backup: "curl -O https://site.com/db.tar.gz && tar -xzf db.tar.gz". If the download times out or 404s, curl exits non-zero, and tar is never executed on a non-existent or corrupted file.',
      realWorldAnalogy: 'Unlocking the front door before attempting to walk into the house.',
      terms: [
        { term: 'Short-Circuit Evaluation', simple: 'Stopping early as soon as the outcome is determined.', technical: 'Logical evaluation terminating when a false (non-zero) operand renders the remainder unreachable.' }
      ],
      syntaxCode: 'command1 && command2',
      syntaxTokens: [
        { token: 'command1', role: 'command', explanation: 'Preceding command evaluated for exit code 0' },
        { token: '&&', role: 'operator', explanation: 'Logical AND operator' },
        { token: 'command2', role: 'command', explanation: 'Command executed only upon success of command1' }
      ],
      variations: [
        { syntax: 'sudo apt update && sudo apt upgrade -y', title: 'Package Update Chain', whatItDoes: 'Updates package index, and if successful, upgrades packages', whenToUse: 'Standard system administration' }
      ],
      beforeAfter: {
        before: '$ test -f config.yml && cat config.yml\n[config.yml does not exist]',
        after: '[cat is never run; prompt returns cleanly with no error]',
        explanation: '&& short-circuited and prevented cat from erroring on a missing file.'
      },
      expectedOutput: '[Executes command2 only on exit code 0]',
      whatChanges: ['Executes command2 conditionally.'],
      whatDoesNotChange: ['System remains safe.'],
      safeRecovery: 'Safe and preventative.',
      commonMistakes: [
        { mistake: 'Confusing single "&" with double "&&"', whyItHappens: 'Single "&" sends the command into the background; double "&&" is logical AND!', howToFix: 'Double-check: always use "&&" for conditional execution.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-07-13',
      subChapterNumber: '07.13',
      command: 'ping -c 1 10.0.0.1 || echo "Host unreachable, alerting on-call engineer!"',
      title: '||',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'The logical OR operator: executes subsequent command ONLY if previous failed (non-zero)',
      badges: ['ControlFlow', 'OR', 'Core'],
      difficulty: 'Beginner',
      quote: '|| is your error catcher: it executes fallback remediation the moment something goes wrong.',
      whatIsIt: 'The logical OR operator "||" executes the subsequent command if and only if the preceding command returns a non-zero exit code (FAILURE). If the first command succeeds (exit code 0), the command following "||" is short-circuited and skipped.',
      inSimpleWords: '"Try to do Step 1, OR ELSE do this fallback plan". If Step 1 worked, do nothing. If Step 1 failed, trigger the alarm or run the backup plan.',
      whyDoYouNeedIt: 'You need "||" for fallback logic, automated error notifications, and default configuration loading.',
      realWorldScenario: 'You are downloading dependencies from a primary server. If it fails, you want to failover to a mirror: "curl https://primary.site/pkg.deb -o pkg.deb || curl https://backup.site/pkg.deb -o pkg.deb".',
      realWorldAnalogy: 'If the front door is locked, ring the doorbell.',
      terms: [
        { term: 'Fallback Handler', simple: 'A command that runs only when the main attempt fails.', technical: 'Exception handling pattern via shell short-circuit logical OR.' }
      ],
      syntaxCode: 'command || fallback_command',
      syntaxTokens: [
        { token: 'command', role: 'command', explanation: 'Primary attempt command' },
        { token: '||', role: 'operator', explanation: 'Logical OR: run next only if exit code != 0' },
        { token: 'fallback_command', role: 'command', explanation: 'Remediation action' }
      ],
      variations: [
        { syntax: 'systemctl is-active --quiet nginx || sudo systemctl start nginx', title: 'Auto-Heal Service', whatItDoes: 'Checks if Nginx is active; if dead, starts it automatically', whenToUse: 'Cron health watchdog scripts' }
      ],
      beforeAfter: {
        before: '$ grep "DATABASE_URL" .env || echo "DATABASE_URL=postgres://localhost" >> .env',
        after: 'DATABASE_URL=postgres://localhost\n[Appended default variable because grep found nothing]',
        explanation: '|| executed the fallback echo command because grep exited with code 1.'
      },
      expectedOutput: '[Executes fallback only if primary command fails]',
      whatChanges: ['Executes fallback command on failure.'],
      whatDoesNotChange: ['If primary command succeeds, fallback is completely ignored.'],
      safeRecovery: 'Non-destructive fallback handler.',
      commonMistakes: [
        { mistake: 'Chaining && and || in unexpected precedence without parentheses (e.g. cmd1 && cmd2 || cmd3)', whyItHappens: 'In bash, && and || have equal precedence and evaluate strictly left-to-right.', howToFix: 'Group commands with parentheses or braces: "(cmd1 && cmd2) || cmd3".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-07-14',
      subChapterNumber: '07.14',
      command: 'echo "Step 1" ; echo "Step 2" ; echo "Step 3"',
      title: ';',
      topicId: 'ch-07',
      topicNumber: '07',
      topicTitle: 'Pipes and Redirection',
      subtitle: 'The unconditional sequential separator: executes commands one after another regardless of exit status',
      badges: ['ControlFlow', 'Sequence', 'Core'],
      difficulty: 'Beginner',
      quote: 'A semicolon is just a newline in disguise: it runs commands one after another without caring if they succeed or fail.',
      whatIsIt: 'The semicolon operator ";" serves as an unconditional sequential command separator. It instructs the shell to execute the command on the left, wait for it to terminate, and then unconditionally execute the command on the right, completely ignoring whether the first command succeeded (exit 0) or crashed (exit 1).',
      inSimpleWords: 'Typing "cmd1 ; cmd2" is the exact same thing as typing "cmd1", hitting Enter, and then typing "cmd2". It runs both, no matter what.',
      whyDoYouNeedIt: 'You use ";" when commands are completely independent of each other (e.g. printing a header, running a check, and printing a footer).',
      realWorldScenario: 'You are benchmarking command execution time. You type "date ; /opt/heavy_job.sh ; date". You want the closing date printed even if the heavy job encounters errors midway.',
      realWorldAnalogy: 'Reading a list of separate grocery items: buy bread, buy apples, buy soap. Failing to find bread does not stop you from buying apples.',
      terms: [
        { term: 'Sequential Separator', simple: 'Puts multiple commands on one line without conditions.', technical: 'Token separating complete commands in shell grammar equivalent to a newline (\\n).' }
      ],
      syntaxCode: 'command1 ; command2',
      syntaxTokens: [
        { token: 'command1', role: 'command', explanation: 'First command' },
        { token: ';', role: 'operator', explanation: 'Sequential command separator' },
        { token: 'command2', role: 'command', explanation: 'Second command executed unconditionally' }
      ],
      variations: [
        { syntax: 'clear ; ls -la', title: 'Clear and List', whatItDoes: 'Clears screen and immediately displays directory contents', whenToUse: 'Clean interactive view' }
      ],
      beforeAfter: {
        before: '$ false ; echo "I still run!"',
        after: 'I still run!',
        explanation: 'Even though "false" failed with exit code 1, the semicolon forced the echo command to run.'
      },
      expectedOutput: 'I still run!',
      whatChanges: ['Executes both commands sequentially.'],
      whatDoesNotChange: ['No conditional logic applied.'],
      safeRecovery: 'Do not use ";" if command 2 depends on command 1 succeeding (use "&&" instead).',
      commonMistakes: [
        { mistake: 'Writing "cd /tmp/folder ; rm -rf *" with a semicolon', whyItHappens: 'If the cd fails, the shell stays in your home directory and wipes all your files!', howToFix: 'NEVER use semicolon before destructive commands. Use "&&".' }
      ]
    })
  ]
};
