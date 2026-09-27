import { LinuxTopic } from '../unifiedLinuxData';

export const TOPIC_04_06: LinuxTopic[] = [
  // =========================================================================
  // TOPIC 04: STREAMS, PIPES & I/O REDIRECTION
  // =========================================================================
  {
    id: 'topic-04',
    number: '04',
    title: 'Streams, Pipes & Redirection',
    iconName: 'Workflow',
    description: 'Mastering stdin (0), stdout (1), stderr (2), pipelines (|), tee, and xargs command construction.',
    concepts: [
      {
        id: 'c-io-redirection',
        command: 'command > output.log 2>&1',
        title: 'Standard I/O Streams & Redirection',
        topicId: 'topic-04',
        topicNumber: '04',
        topicTitle: 'Streams, Pipes & Redirection',
        subtitle: 'File descriptors 0 (stdin), 1 (stdout), 2 (stderr), >, >>, 2>, and &>.',
        badges: ['Intermediate', 'Streams', 'Redirection'],
        quote: 'In UNIX, standard output and standard error are two separate streams traveling down the same wire.',
        difficulty: 'Intermediate',
        whatIsIt: 'Every Linux process starts with three default open file descriptors: 0 (Standard Input), 1 (Standard Output), and 2 (Standard Error). Redirection operators (`>`, `>>`, `2>`, `&>`) decouple command output from the physical terminal, sending data to files, devices (`/dev/null`), or sockets.',
        inSimpleWords: 'When a command runs, normal messages go out door #1 (stdout) and error messages go out door #2 (stderr). `>` sends normal messages to a file, `2>` sends errors to a file, and `2>&1` (or `&>`) merges errors into normal messages so everything is captured together.',
        whyDoYouNeedIt: 'Crucial for writing silent cron jobs, saving execution logs, capturing error traces, and silencing noisy background processes (`> /dev/null 2>&1`).',
        realWorldAnalogy: 'A postal sorting room: letters for delivery go into the blue bin (stdout), rejected/damaged mail goes into the red bin (stderr). You can choose to pack both bins into the same shipping crate or dump unwanted mail into the shredder (/dev/null).',
        withoutVsWith: {
          without: {
            title: 'WITHOUT STREAM REDIRECTION',
            items: [
              'Error messages flood terminal screens mixed together with clean data',
              'Automated background cron jobs spam administrator inboxes with warning banners',
              'Command output is lost forever once the terminal window closes',
              'Cannot separate machine-readable JSON data from diagnostic warning lines',
            ],
            outcome: '😵 Terminal log flooding, lost data, and unmonitored cron jobs',
          },
          with: {
            title: 'WITH STREAM REDIRECTION MASTERY',
            items: [
              'Clean separation: app.log captures output, error.log captures stack traces',
              '> /dev/null 2>&1 silences noisy background processes completely',
              '>> appends logs over days and weeks without wiping previous records',
              'Capture exit status and output cleanly in automated CI/CD pipelines',
            ],
            outcome: '📋 Clean log capture, silent background jobs, and robust automation',
          },
        },
        blockDiagram: {
          title: 'Linux 3-Stream File Descriptor Architecture',
          subtitle: 'Click any stream to inspect file descriptor numbering and destination routing:',
          nodes: [
            { id: 'stream-stdin', label: 'stdin (FD 0)', simpleDef: 'Standard Input: where the command reads keyboard or piped data.', techDef: 'File descriptor 0 connected to terminal pty or pipe read end.', badge: 'FD 0 (In)', color: '#38bdf8' },
            { id: 'stream-process', label: 'Running Process (PID)', simpleDef: 'The executing binary processing data.', techDef: 'User-space process executing logic and writing to FD 1 and FD 2.', badge: 'Process', color: '#10b981' },
            { id: 'stream-stdout', label: 'stdout (FD 1)', simpleDef: 'Standard Output: normal informational results.', techDef: 'File descriptor 1 redirected to file (>) or appended (>>).', badge: 'FD 1 (Normal)', color: '#a855f7' },
            { id: 'stream-stderr', label: 'stderr (FD 2)', simpleDef: 'Standard Error: error notices and diagnostic warnings.', techDef: 'File descriptor 2 redirected with 2> or merged via 2>&1.', badge: 'FD 2 (Errors)', color: '#ef4444' },
          ],
        },
        terms: [
          { term: 'File Descriptor (FD)', simple: 'An integer number the operating system gives a process to identify an open file or stream.', technical: 'Non-negative integer index into the process per-process file descriptor table in kernel.', analogy: 'A claim ticket for your coat at a checkroom.' },
          { term: '/dev/null', simple: 'The universal black hole of Linux: anything written here vanishes instantly.', technical: 'Special character device driver (major 1, minor 3) that discards all written data and returns EOF on read.', analogy: 'An incinerator chute.' },
          { term: 'Append (>>)', simple: 'Adds new text to the end of a file without deleting the existing content.', technical: 'Opens file with O_APPEND flag, ensuring writes atomically seek to EOF.', analogy: 'Adding another entry to a diary.' },
        ],
        whenToUse: [
          '✓ When capturing command output into a log file (app > app.log 2>&1)',
          '✓ When appending daily output to an audit file (echo "sync ok" >> audit.log)',
          '✓ When discarding unwanted warnings from verbose tools (command 2>/dev/null)',
        ],
        whenNotToUse: [
          '✕ Never use single ">" when you mean to append ">>" (single > will instantly truncate/wipe the existing file!)',
        ],
        syntaxCode: 'command > output.log 2>&1',
        syntaxTokens: [
          { token: 'command', role: 'Program', explanation: 'The executing binary.' },
          { token: '>', role: 'Redirect stdout', explanation: 'Directs file descriptor 1 to output.log (truncates file).' },
          { token: 'output.log', role: 'Target File', explanation: 'Destination file on disk.' },
          { token: '2>&1', role: 'Merge Stream', explanation: 'Redirects file descriptor 2 (stderr) into file descriptor 1 (stdout).' },
        ],
        variations: [
          { syntax: 'command >> app.log', title: 'Append Standard Output', whatItDoes: 'Appends stdout without overwriting existing data.', whenToUse: 'Continuous logging.' },
          { syntax: 'command 2> errors.log', title: 'Redirect Errors Only', whatItDoes: 'Sends stderr to errors.log; stdout still prints to terminal.', whenToUse: 'Isolating warnings and crashes.' },
          { syntax: 'command &> combined.log', title: 'Modern Stream Merge', whatItDoes: 'Bash shortcut for > combined.log 2>&1.', whenToUse: 'Modern bash/zsh scripts.' },
          { syntax: 'command > /dev/null 2>&1', title: 'Silent Execution', whatItDoes: 'Discards all output and errors completely.', whenToUse: 'Silent cron tasks.' },
        ],
        internalFlow: [
          { step: 1, title: 'Shell Opens Target File', desc: 'Shell opens output.log with O_WRONLY | O_CREAT | O_TRUNC flags.', why: 'Obtains new file descriptor (e.g. FD 3).', techDetail: 'openat(AT_FDCWD, "output.log", O_WRONLY|O_CREAT|O_TRUNC, 0666)' },
          { step: 2, title: 'Duplicate FD 1 (dup2)', desc: 'Shell invokes dup2(3, 1) replacing stdout with the file.', why: 'Points FD 1 to output.log.', techDetail: 'dup2(file_fd, 1)' },
          { step: 3, title: 'Duplicate FD 2 to FD 1', desc: 'Shell invokes dup2(1, 2) directing stderr to the same file table entry as FD 1.', why: 'Merges stream 2 into stream 1.', techDetail: 'dup2(1, 2)' },
          { step: 4, title: 'Execve Child Process', desc: 'Shell invokes execve() to run the command with inherited redirected file descriptors.', why: 'Command writes blindly to FD 1 and 2, which now go to the file.', techDetail: 'execve("/usr/bin/command", ...)' },
        ],
        sandbox: {
          initialCommands: [
            'echo "Hello Linux" > /tmp/out.txt && cat /tmp/out.txt',
            'echo "Second Line" >> /tmp/out.txt && cat /tmp/out.txt',
            'ls /nonexistent 2> /tmp/err.txt && cat /tmp/err.txt',
          ],
          guidedSteps: [
            { instruction: 'Redirect stdout to /tmp/out.txt using >', command: 'echo "Hello Linux" > /tmp/out.txt && cat /tmp/out.txt', hint: 'Run echo "Hello Linux" > /tmp/out.txt && cat /tmp/out.txt' },
            { instruction: 'Append a second line using >>', command: 'echo "Second Line" >> /tmp/out.txt && cat /tmp/out.txt', hint: 'Run echo "Second Line" >> /tmp/out.txt && cat /tmp/out.txt' },
            { instruction: 'Redirect an error stream to /tmp/err.txt using 2>', command: 'ls /nonexistent 2> /tmp/err.txt && cat /tmp/err.txt', hint: 'Run ls /nonexistent 2> /tmp/err.txt && cat /tmp/err.txt' },
          ],
          targetTask: 'Practice stream redirection (> for overwrite, >> for append, 2> for error capture).',
          solutionCommands: [
            'echo "Hello Linux" > /tmp/out.txt && cat /tmp/out.txt',
            'echo "Second Line" >> /tmp/out.txt && cat /tmp/out.txt',
            'ls /nonexistent 2> /tmp/err.txt && cat /tmp/err.txt',
          ],
        },
        commonMistakes: [
          { mistake: 'Writing "command 2>&1 > file.log" in the wrong order.', whyWrong: 'Order matters! 2>&1 copies current FD 1 (terminal). Then > file.log redirects FD 1 to file. Result: errors still go to terminal!', correctWay: 'Always specify the file redirection first: "command > file.log 2>&1".' },
          { mistake: 'Accidentally using ">" instead of ">>" on a production log file.', whyWrong: 'Single ">" immediately wipes (truncates to 0 bytes) the existing file before writing.', correctWay: 'Always double-check that you use ">>" when logging.' },
        ],
        challenge: {
          question: 'What is the numeric file descriptor number for Standard Error (stderr) in Linux?',
          options: [
            { label: '2', isCorrect: true, explanation: 'Correct! 0 = stdin, 1 = stdout, 2 = stderr.' },
            { label: '1', isCorrect: false, explanation: 'Incorrect. 1 is stdout.' },
            { label: '0', isCorrect: false, explanation: 'Incorrect. 0 is stdin.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://www.gnu.org/software/bash/manual/html_node/Redirections.html',
          syntaxCheatSheet: [
            'cmd > file           # Redirect stdout to file (overwrites)',
            'cmd >> file          # Append stdout to file',
            'cmd 2> error.log     # Redirect stderr only',
            'cmd > log 2>&1       # Merge stdout and stderr into log file',
            'cmd &> log           # Bash shorthand for merging both streams',
            'cmd > /dev/null 2>&1 # Run completely silently (discard all)',
          ],
          bestPractices: [
            'Always redirect cron tasks to a log or /dev/null to prevent unmonitored mail queues.',
          ],
        },
      },
      {
        id: 'c-pipelines',
        command: 'cat /var/log/nginx/access.log | grep " 500 " | wc -l',
        title: 'The UNIX Pipeline: Connecting Tools',
        topicId: 'topic-04',
        topicNumber: '04',
        topicTitle: 'Streams, Pipes & Redirection',
        subtitle: 'Connecting the stdout of one program directly into the stdin of another via anonymous kernel pipes (|).',
        badges: ['Intermediate', 'Pipes', 'UNIX Philosophy'],
        quote: 'Pipes are the plumbing that turns hundreds of simple single-purpose commands into an infinite combination of solutions.',
        difficulty: 'Intermediate',
        whatIsIt: 'The pipe operator (`|`) creates a unidirectional kernel data buffer connecting the standard output (stdout) of the left process directly into the standard input (stdin) of the right process, streaming data asynchronously in memory without touching the physical disk.',
        inSimpleWords: 'A pipe is like an assembly line conveyor belt. The first worker produces widgets, drops them onto the conveyor belt (`|`), and the second worker picks them up and paints them. Neither worker has to wait for all widgets to be finished; data flows smoothly through RAM.',
        whyDoYouNeedIt: 'Pipelines allow you to filter logs, count metrics, extract JSON, format text, and monitor systems by composing basic Linux utilities together.',
        realWorldAnalogy: 'An oil pipeline connecting a refinery directly to a tanker ship. Oil flows continuously through the pipe without workers needing to fill barrels, load trucks, and unpack them at the dock.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT PIPELINES (Temporary File Hell)',
            items: [
              'Must write intermediate results to temp1.txt, temp2.txt, temp3.txt on disk',
              'Slow disk I/O bottlenecks: gigabytes written and re-read on NVMe/SSD',
              'Must remember to manually clean up temp files or disk runs out of space',
              'Cannot process streaming data that has no defined end (infinite streams)',
            ],
            outcome: '⏳ Slow disk bottlenecks, cluttered disks, and clunky scripts',
          },
          with: {
            title: 'WITH UNIX IN-MEMORY PIPELINES',
            items: [
              'Zero disk I/O: bytes stream through a 64KB kernel circular ring buffer in RAM',
              'True parallel concurrency: both processes execute simultaneously on multiple CPU cores',
              'Automated flow control: if reader is slow, kernel pauses writer automatically',
              'Clean, elegant one-liner composition of single-purpose utilities',
            ],
            outcome: '⚡ Blazing fast in-memory streaming and infinite command composition',
          },
        },
        blockDiagram: {
          title: 'Linux Kernel Pipe Buffer (pipe(2)) Architecture',
          subtitle: 'Click any component to inspect how the kernel streams bytes between concurrent processes:',
          nodes: [
            { id: 'pipe-writer', label: 'Writer Process (stdout: FD 1)', simpleDef: 'The command producing text data.', techDef: 'Process issuing write(1, buf, len). Connected to write end of kernel pipe.', badge: 'Producer', color: '#38bdf8' },
            { id: 'pipe-buffer', label: 'Kernel Ring Buffer (64KB in RAM)', simpleDef: 'In-memory circular pipe holding bytes in transit.', techDef: 'Kernel pipe_inode_info buffer (default 64KB on Linux, tunable via fcntl F_SETPIPE_SZ).', badge: 'Kernel RAM Pipe', color: '#10b981' },
            { id: 'pipe-reader', label: 'Reader Process (stdin: FD 0)', simpleDef: 'The command consuming and filtering text.', techDef: 'Process issuing read(0, buf, len). Wakes automatically when buffer has bytes.', badge: 'Consumer', color: '#a855f7' },
          ],
        },
        terms: [
          { term: 'Anonymous Pipe', simple: 'A temporary memory stream connecting two running programs.', technical: 'Unidirectional FIFO communication channel created via pipe() or pipe2() syscall.', analogy: 'A pneumatic tube between two offices.' },
          { term: 'PIPE_BUF & Backpressure', simple: 'If the reading program is slow, the kernel pauses the writing program until there is room.', technical: 'Kernel blocks writer with TASK_INTERRUPTIBLE when 64KB buffer fills, providing automatic backpressure.', analogy: 'Water backing up when a hose is pinched.' },
          { term: 'SIGPIPE', simple: 'The signal sent to a writer if the reading program suddenly exits.', technical: 'Signal 13 sent when a process writes to a pipe with no active read descriptors.', analogy: 'Trying to talk into a phone when the other person hung up.' },
        ],
        whenToUse: [
          '✓ When filtering live logs for error patterns (cat log | grep "FATAL")',
          '✓ When sorting and deduplicating data (cat ips.txt | sort | uniq -c)',
          '✓ When combining tools to answer complex operational questions',
        ],
        whenNotToUse: [
          '✕ Avoid "Useless Use of Cat" (e.g. use "grep pattern file" instead of "cat file | grep pattern")',
        ],
        syntaxCode: 'grep "ERROR" /var/log/app.log | sort | uniq -c | sort -nr',
        syntaxTokens: [
          { token: 'grep "ERROR"', role: 'Filter', explanation: 'Extracts lines containing ERROR.' },
          { token: '|', role: 'Pipe Operator', explanation: 'Connects stdout of left process to stdin of right process.' },
          { token: 'sort', role: 'Sorter', explanation: 'Sorts lines alphabetically.' },
          { token: 'uniq -c', role: 'Deduplicator', explanation: 'Counts occurrences of identical adjacent lines.' },
          { token: 'sort -nr', role: 'Final Sorter', explanation: 'Sorts numerically in reverse (highest counts first).' },
        ],
        variations: [
          { syntax: 'ps aux | grep nginx', title: 'Find Process', whatItDoes: 'Filters process list for Nginx processes.', whenToUse: 'Checking if a service is running.' },
          { syntax: 'cat file.txt | tr "a-z" "A-Z"', title: 'Uppercase Stream', whatItDoes: 'Converts all text to uppercase in memory.', whenToUse: 'Text sanitization.' },
          { syntax: 'dmesg | tail -n 20', title: 'Recent Kernel Events', whatItDoes: 'Pipes full kernel ring buffer into tail for last 20 lines.', whenToUse: 'Hardware diagnostics.' },
        ],
        internalFlow: [
          { step: 1, title: 'Shell Creates Pipe', desc: 'Shell calls pipe() creating two file descriptors: pipefd[0] (read) and pipefd[1] (write).', why: 'Establishes in-memory FIFO buffer.', techDetail: 'pipe2(pipefd, O_CLOEXEC)' },
          { step: 2, title: 'Fork Left & Right Children', desc: 'Shell forks two child processes concurrently.', why: 'Both processes execute in parallel on multi-core CPU.', techDetail: 'clone(SIGCHLD) called twice' },
          { step: 3, title: 'Rewire File Descriptors', desc: 'Left child calls dup2(pipefd[1], 1); right child calls dup2(pipefd[0], 0).', why: 'Connects stdout of child A to stdin of child B.', techDetail: 'dup2() updates descriptor slots' },
          { step: 4, title: 'Stream Bytes Asynchronously', desc: 'Child A writes bytes; Child B reads bytes simultaneously.', why: 'Data processes with zero disk overhead.', techDetail: 'Synchronized via kernel circular buffer' },
        ],
        sandbox: {
          initialCommands: [
            'cat /etc/passwd | cut -d: -f1 | sort | head -n 5',
            'ps aux | grep root | wc -l',
          ],
          guidedSteps: [
            { instruction: 'Extract usernames, sort them, and view first 5 using a pipeline', command: 'cat /etc/passwd | cut -d: -f1 | sort | head -n 5', hint: 'Run cat /etc/passwd | cut -d: -f1 | sort | head -n 5' },
            { instruction: 'Count how many processes are running under root', command: 'ps aux | grep root | wc -l', hint: 'Run ps aux | grep root | wc -l' },
          ],
          targetTask: 'Construct multi-stage UNIX pipelines connecting single-purpose tools.',
          solutionCommands: [
            'cat /etc/passwd | cut -d: -f1 | sort | head -n 5',
            'ps aux | grep root | wc -l',
          ],
        },
        commonMistakes: [
          { mistake: 'Assuming commands in a pipeline run sequentially one after another.', whyWrong: 'Both commands in "cmdA | cmdB" start at the exact same millisecond in parallel!', correctWay: 'Understand that pipes are concurrent streaming channels, not batch sequences.' },
          { mistake: 'Trying to modify a file in place with "cat file | grep -v test > file".', whyWrong: 'The shell redirects "> file" FIRST, which truncates the file to 0 bytes before cat can even read it!', correctWay: 'Write to a temporary file or use tools like sponge or sed -i.' },
        ],
        challenge: {
          question: 'Where is data stored while traveling between two commands connected by a pipe (|)?',
          options: [
            { label: 'In an in-memory kernel ring buffer (RAM) with zero disk writes', isCorrect: true, explanation: 'Correct! Anonymous pipes live purely in kernel memory.' },
            { label: 'In a temporary file stored in /tmp', isCorrect: false, explanation: 'Incorrect. Pipes do not touch the disk.' },
            { label: 'On the CPU cache exclusively', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man7/pipe.7.html',
          syntaxCheatSheet: [
            'cmd1 | cmd2          # Pipe stdout of cmd1 to stdin of cmd2',
            'cmd1 | grep [PAT]    # Filter output',
            'cmd1 | sort | uniq   # Sort and deduplicate',
            'cmd1 | wc -l         # Count lines of output',
          ],
          bestPractices: [
            'Use "set -o pipefail" in bash scripts so that failures in any step of the pipeline are caught.',
          ],
        },
      },
      {
        id: 'c-tee-xargs',
        command: 'echo "10.0.0.1" | sudo tee -a /etc/hosts',
        title: 'Splitting & Arguments: tee & xargs',
        topicId: 'topic-04',
        topicNumber: '04',
        topicTitle: 'Streams, Pipes & Redirection',
        subtitle: 'Splitting streams to file and terminal (tee) and converting stdin lines into command arguments (xargs).',
        badges: ['Intermediate', 'Pipes', 'Automation'],
        quote: 'tee lets you see output and save it simultaneously; xargs turns text output into command arguments.',
        difficulty: 'Intermediate',
        whatIsIt: 'Two essential pipeline power tools: `tee` (named after a plumbing T-splitter) duplicates standard input to both standard output and one or more files simultaneously; `xargs` reads items from standard input and executes a command using those items as arguments.',
        inSimpleWords: '`tee` is like a Y-splitter cable: you plug in one headphone jack, and two people can listen at once (one stream goes to your screen, the other goes into a file). `xargs` takes a list of names from a pipe and feeds them as arguments into another command (like finding 50 files and passing all 50 to `rm`).',
        whyDoYouNeedIt: '`sudo tee` is the standard, secure way to append text to root-owned files without opening interactive text editors; `xargs` is crucial for batch automation and parallel task processing.',
        realWorldAnalogy: '`tee` is a water splitter that fills your glass while also filling a storage jug. `xargs` is a factory supervisor reading a list of orders from a clipboard and handing individual work tickets to workers.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT TEE & XARGS',
            items: [
              'Running "sudo echo 10.0.0.1 >> /etc/hosts" FAILS with Permission Denied (shell redirection runs as regular user!)',
              'Must run commands twice: once to see output on screen, once redirected to file',
              'Cannot pass lists of thousands of files to commands without hitting "Argument list too long" errors',
              'Manual copy-pasting of IDs or filenames into command arguments',
            ],
            outcome: '🔒 Sudo redirection permission errors and tedious manual argument handling',
          },
          with: {
            title: 'WITH TEE & XARGS MASTERY',
            items: [
              'echo "data" | sudo tee -a /etc/config writes cleanly to root-owned files with elevated privileges',
              'tee logs builds to disk while developers monitor compiler output live',
              'xargs -n 1 -P 4 runs parallel processing across multiple CPU cores',
              'find . -name "*.log" | xargs rm cleans thousands of files safely',
            ],
            outcome: '⚡ Elevated file writes, dual-channel logging, and high-performance batch processing',
          },
        },
        blockDiagram: {
          title: 'tee T-Splitter and xargs Argument Construction Flow',
          subtitle: 'Click any component to inspect stream splitting and argument batching:',
          nodes: [
            { id: 'tee-in', label: 'stdin Input Stream', simpleDef: 'Text arriving from upstream pipeline.', techDef: 'File descriptor 0 providing stream of bytes.', badge: 'Input', color: '#38bdf8' },
            { id: 'tee-split', label: 'tee Duplication Core', simpleDef: 'The T-splitter sending bytes to two destinations at once.', techDef: 'Reads buffer from stdin, calls write(file_fd) AND write(1, stdout).', badge: 'T-Splitter', color: '#10b981' },
            { id: 'tee-out-file', label: 'File on Disk (app.log)', simpleDef: 'Saved file copy on disk.', techDef: 'Persistent storage file opened with O_APPEND or O_TRUNC.', badge: 'Saved File', color: '#a855f7' },
            { id: 'xargs-exec', label: 'xargs Command Invocation', simpleDef: 'Executes command with batched arguments.', techDef: 'Constructs argument array char *argv[] and invokes execve() in batch.', badge: 'Batch Execution', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'tee -a', simple: 'Append mode: adds text to the end of the file instead of overwriting.', technical: 'Opens destination file with O_APPEND flag while continuing to mirror bytes to stdout.', analogy: 'A dual-port charging cable.' },
          { term: 'xargs -I {}', simple: 'Placeholder replacement: substitutes "{}" with each piped line.', technical: 'Configures replacement string token in xargs argument template.', analogy: 'A fill-in-the-blank template form.' },
          { term: 'xargs -P [N]', simple: 'Runs N tasks simultaneously in parallel across multiple CPU cores.', technical: 'Spawns up to N concurrent worker processes executing batch commands.', analogy: 'Hiring 4 workers instead of 1 to unload a delivery truck.' },
        ],
        whenToUse: [
          '✓ When appending to root-owned files with sudo (echo "nameserver 1.1.1.1" | sudo tee -a /etc/resolv.conf)',
          '✓ When monitoring a long build script while capturing full output to build.log (make | tee build.log)',
          '✓ When batch deleting or converting files found by find (find . -name "*.tmp" | xargs rm)',
        ],
        whenNotToUse: [
          '✕ Never run xargs without -0 (null delimiter) if filenames might contain spaces (use find -print0 | xargs -0)',
        ],
        syntaxCode: 'echo "worker_nodes=4" | sudo tee -a /etc/cluster.conf',
        syntaxTokens: [
          { token: 'echo "..."', role: 'Input Producer', explanation: 'Outputs text string to stdout.' },
          { token: '|', role: 'Pipe', explanation: 'Connects echo stdout to tee stdin.' },
          { token: 'sudo tee -a', role: 'Elevated Appender', explanation: 'tee runs as root, appending input to target file and printing to screen.' },
          { token: '/etc/cluster.conf', role: 'Target File', explanation: 'Root-protected destination file.' },
        ],
        variations: [
          { syntax: 'cmd | tee output.log', title: 'Mirror Output to File', whatItDoes: 'Displays output in terminal and writes to file simultaneously.', whenToUse: 'Live build monitoring.' },
          { syntax: 'find . -name "*.bak" -print0 | xargs -0 rm', title: 'Safe File Deletion with Spaces', whatItDoes: 'Handles filenames with spaces safely using NULL separators.', whenToUse: 'Batch file cleanup.' },
          { syntax: 'cat urls.txt | xargs -n 1 -P 4 curl -O', title: 'Parallel Downloads', whatItDoes: 'Downloads URLs in parallel across 4 worker processes.', whenToUse: 'Accelerating batch network tasks.' },
        ],
        internalFlow: [
          { step: 1, title: 'tee Opens Output Files', desc: 'tee opens destination file with specified flags (-a for append).', why: 'Prepares file descriptor.', techDetail: 'openat(AT_FDCWD, path, O_WRONLY|O_CREAT|O_APPEND, 0666)' },
          { step: 2, title: 'Read-Write Loop', desc: 'tee reads buffer from stdin (FD 0), writes to stdout (FD 1), and writes to file FD.', why: 'Mirrors data across both channels.', techDetail: 'write(1, buf, n); write(file_fd, buf, n)' },
          { step: 3, title: 'xargs Batches Tokens', desc: 'xargs reads newline/space-delimited words into an argument array.', why: 'Constructs CLI command invocation.', techDetail: 'Builds argv[] vector respecting ARG_MAX limit' },
          { step: 4, title: 'Execve Target Command', desc: 'xargs forks and executes target command with the populated arguments.', why: 'Runs batch processing.', techDetail: 'execve(command, argv, environ)' },
        ],
        sandbox: {
          initialCommands: [
            'echo "System Active" | tee /tmp/status.txt && cat /tmp/status.txt',
            'echo "Line 2" | tee -a /tmp/status.txt && cat /tmp/status.txt',
            'echo "file1 file2 file3" | xargs -n 1 echo "Processing:"',
          ],
          guidedSteps: [
            { instruction: 'Write and display text simultaneously with tee', command: 'echo "System Active" | tee /tmp/status.txt && cat /tmp/status.txt', hint: 'Run echo "System Active" | tee /tmp/status.txt && cat /tmp/status.txt' },
            { instruction: 'Append another line using tee -a', command: 'echo "Line 2" | tee -a /tmp/status.txt && cat /tmp/status.txt', hint: 'Run echo "Line 2" | tee -a /tmp/status.txt && cat /tmp/status.txt' },
            { instruction: 'Use xargs to process multiple space-separated arguments', command: 'echo "file1 file2 file3" | xargs -n 1 echo "Processing:"', hint: 'Run echo "file1 file2 file3" | xargs -n 1 echo "Processing:"' },
          ],
          targetTask: 'Master stream splitting with tee and argument batching with xargs.',
          solutionCommands: [
            'echo "System Active" | tee /tmp/status.txt && cat /tmp/status.txt',
            'echo "Line 2" | tee -a /tmp/status.txt && cat /tmp/status.txt',
            'echo "file1 file2 file3" | xargs -n 1 echo "Processing:"',
          ],
        },
        commonMistakes: [
          { mistake: 'Trying to run "sudo echo \'text\' >> /etc/protected.conf" and getting Permission Denied.', whyWrong: 'The shell handles the ">>" redirection BEFORE sudo runs, meaning your unprivileged user tries to write to the file!', correctWay: 'Use "echo \'text\' | sudo tee -a /etc/protected.conf". sudo runs tee, which has root privileges to write.' },
          { mistake: 'Running "xargs rm" on files with spaces in their names.', whyWrong: 'xargs splits on whitespace by default, so "My Document.pdf" gets split into "My" and "Document.pdf" causing deletion errors.', correctWay: 'Always use "find -print0 | xargs -0 rm" to delimit by NULL characters.' },
        ],
        challenge: {
          question: 'Why does "echo \'test\' | sudo tee /etc/file" succeed when "sudo echo \'test\' > /etc/file" fails with Permission Denied?',
          options: [
            { label: 'Because shell redirection (>) executes under the unprivileged user before sudo runs, whereas tee runs under sudo with root permissions', isCorrect: true, explanation: 'Correct! The shell performs redirection as the current user, but tee runs with sudo privileges.' },
            { label: 'Because tee automatically bypasses Linux kernel security permissions', isCorrect: false, explanation: 'Incorrect. tee does not bypass security; it simply runs as root.' },
            { label: 'Because /etc files can only be written by tee', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man1/tee.1.html',
          syntaxCheatSheet: [
            'cmd | tee file.log            # Write to stdout and overwrite file.log',
            'cmd | tee -a file.log         # Write to stdout and append to file.log',
            'echo "data" | sudo tee -a ... # Write to root-owned file safely',
            'cat list.txt | xargs -n 1 cmd # Pass items one by one to cmd',
            'find . -print0 | xargs -0 ... # Process files safely with NULL delimiters',
          ],
          bestPractices: [
            'Always use "sudo tee -a" when automating modifications to configuration files in /etc.',
          ],
        },
      },
    ],
  },

  // =========================================================================
  // TOPIC 05: TEXT PROCESSING & STREAM EDITING
  // =========================================================================
  {
    id: 'topic-05',
    number: '05',
    title: 'Text Processing (grep, sed, awk)',
    iconName: 'Code2',
    description: 'Mastering regular expression search (grep), stream editing (sed), and column processing (awk).',
    concepts: [
      {
        id: 'c-grep-regex',
        command: 'grep -rn "ERROR" /var/log/',
        title: 'Pattern Searching with grep',
        topicId: 'topic-05',
        topicNumber: '05',
        topicTitle: 'Text Processing (grep, sed, awk)',
        subtitle: 'Recursive search (-r), line numbers (-n), case insensitivity (-i), invert (-v), and extended regex (-E).',
        badges: ['Intermediate', 'Search', 'grep'],
        quote: 'grep is the search engine of the Linux command line.',
        difficulty: 'Intermediate',
        whatIsIt: '`grep` (Global Regular Expression Print) scans files or standard input for lines matching a pattern or regular expression, printing matching lines to the terminal with high-performance Boyer-Moore search algorithms.',
        inSimpleWords: '`grep` searches for words or patterns inside files. `grep -i "error"` finds "error", "Error", or "ERROR". `grep -rn "TODO" .` searches every file in the current folder recursively and shows you the exact line number where "TODO" appears.',
        whyDoYouNeedIt: 'Indispensable for locating error codes, tracing configuration directives, finding code references, and isolating security alerts.',
        realWorldAnalogy: 'Using Ctrl+F (or ⌘F) in a document, but supercharged with regular expressions and capable of searching 100,000 files in seconds.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT GREP FILTERING',
            items: [
              'Manually opening files one by one to find where an error was logged',
              'Scrolling through 500MB log files looking for a specific user ID',
              'No way to filter out noisy warning lines from terminal output',
              'Blind troubleshooting during production outages',
            ],
            outcome: '⏳ Hours wasted searching files manually and delayed incident resolution',
          },
          with: {
            title: 'WITH GREP PATTERN MASTERY',
            items: [
              'grep -rn searches entire repository trees in milliseconds',
              'grep -v inverts search to eliminate expected noise from logs',
              'grep -E supports powerful regex (e.g. IP addresses, UUIDs, dates)',
              'grep -A 3 -B 3 shows surrounding context lines around the match',
            ],
            outcome: '⚡ Sub-second root cause discovery and surgical log filtering',
          },
        },
        blockDiagram: {
          title: 'grep Boyer-Moore Fast String Matching Pipeline',
          subtitle: 'Click any component to inspect pattern compilation and line filtering:',
          nodes: [
            { id: 'grep-pattern', label: 'Pattern / Regex Engine', simpleDef: 'The word or regular expression you want to find.', techDef: 'Compiled DFA/NFA automaton or fast literal Boyer-Moore skip table.', badge: 'Pattern', color: '#38bdf8' },
            { id: 'grep-scan', label: 'Fast In-Memory Scanning', simpleDef: 'grep scanning disk pages through page cache.', techDef: 'Reads raw memory buffers, skipping non-matching byte ranges without per-line overhead.', badge: 'Scanner', color: '#10b981' },
            { id: 'grep-filter', label: 'Match Evaluation (-v / -i)', simpleDef: 'Filters matching lines or inverted non-matching lines.', techDef: 'Applies case folding and invert criteria, calculating line offsets.', badge: 'Filter', color: '#a855f7' },
            { id: 'grep-out', label: 'Colorized stdout Output', simpleDef: 'Prints filename, line number, and highlighted match.', techDef: 'Writes formatted output with ANSI terminal color escape sequences.', badge: 'stdout', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'grep -r / -R', simple: 'Recursive mode: searches all files inside all subdirectories.', technical: 'Recursively traverses directory trees following or avoiding symlinks (-r vs -R).', analogy: 'Searching every folder in every drawer of a desk.' },
          { term: 'grep -v (Invert)', simple: 'Invert match: prints all lines that DO NOT contain the word.', technical: 'Filters out lines matching the pattern, returning lines where regex evaluation fails.', analogy: 'A filter that removes black pebbles and keeps only white ones.' },
          { term: 'grep -E (Extended Regex)', simple: 'Enables advanced regex like | (OR), + (one or more), and {n,m}.', technical: 'Enables POSIX Extended Regular Expression syntax without backslash escaping.', analogy: 'Unlocking advanced search filters on a search engine.' },
        ],
        whenToUse: [
          '✓ When searching for error messages across all server logs (grep -rn "FATAL" /var/log/)',
          '✓ When checking if a specific configuration directive is enabled (grep -i "permitrootlogin" /etc/ssh/sshd_config)',
          '✓ When excluding comments and blank lines from config files (grep -v "^#" /etc/config | grep -v "^$")',
        ],
        whenNotToUse: [
          '✕ Never run "cat file | grep pattern" when you can just run "grep pattern file"',
        ],
        syntaxCode: 'grep -rn "DATABASE_URL" /etc/app/',
        syntaxTokens: [
          { token: 'grep', role: 'Command', explanation: 'Print lines matching pattern.' },
          { token: '-r', role: 'Flag', explanation: 'Recursive directory traversal.' },
          { token: '-n', role: 'Flag', explanation: 'Show line numbers.' },
          { token: '"DATABASE_URL"', role: 'Pattern', explanation: 'String or regex to search for.' },
          { token: '/etc/app/', role: 'Search Directory', explanation: 'Target folder.' },
        ],
        variations: [
          { syntax: 'grep -i "error" app.log', title: 'Case Insensitive', whatItDoes: 'Matches "error", "ERROR", "Error".', whenToUse: 'General search when capitalization is uncertain.' },
          { syntax: 'grep -v "^#" config.conf', title: 'Strip Comments', whatItDoes: 'Inverts match to hide lines starting with #.', whenToUse: 'Reading clean config files without comments.' },
          { syntax: 'grep -C 3 "NullPointer" app.log', title: 'Context Lines', whatItDoes: 'Prints 3 lines before and 3 lines after the match.', whenToUse: 'Reading surrounding stack traces.' },
          { syntax: 'grep -E "[0-9]{1,3}\\.[0-9]{1,3}" log.txt', title: 'Extended Regex', whatItDoes: 'Matches patterns using extended regex syntax.', whenToUse: 'Finding IP addresses, emails, or dates.' },
        ],
        internalFlow: [
          { step: 1, title: 'Compile Pattern', desc: 'grep compiles search string into regex DFA or Boyer-Moore skip table.', why: 'Optimizes search speed.', techDetail: 'Precomputes bad character shift table' },
          { step: 2, title: 'Traverse Files', desc: 'Opens target files or reads from stdin buffer.', why: 'Streams bytes into memory.', techDetail: 'openat() and read() in 32KB buffer chunks' },
          { step: 3, title: 'Scan for Match', desc: 'Executes fast byte matching algorithm over buffer.', why: 'Locates matching offsets without parsing every single character.', techDetail: 'Uses SIMD vector instructions when available' },
          { step: 4, title: 'Print Formatted Line', desc: 'Prints line number (-n), file name (-r), and matching line with color.', why: 'Presents readable match to user.', techDetail: 'write(1, match_line, len)' },
        ],
        sandbox: {
          initialCommands: [
            'grep "root" /etc/passwd',
            'grep -v "nologin" /etc/passwd | head -n 5',
            'grep -E "(bash|sh)$" /etc/passwd',
          ],
          guidedSteps: [
            { instruction: 'Search for "root" in /etc/passwd', command: 'grep "root" /etc/passwd', hint: 'Run grep "root" /etc/passwd' },
            { instruction: 'Invert search to find users who do NOT have nologin shells', command: 'grep -v "nologin" /etc/passwd | head -n 5', hint: 'Run grep -v "nologin" /etc/passwd | head -n 5' },
            { instruction: 'Use extended regex (-E) to find users ending in bash or sh', command: 'grep -E "(bash|sh)$" /etc/passwd', hint: 'Run grep -E "(bash|sh)$" /etc/passwd' },
          ],
          targetTask: 'Filter text and system files using grep pattern matching.',
          solutionCommands: [
            'grep "root" /etc/passwd',
            'grep -v "nologin" /etc/passwd | head -n 5',
            'grep -E "(bash|sh)$" /etc/passwd',
          ],
        },
        commonMistakes: [
          { mistake: 'Forgetting quotes around patterns containing spaces or special characters.', whyWrong: 'grep error: "grep error message file.log" treats "message" and "file.log" as two separate files!', correctWay: 'Always quote your search patterns: grep "error message" file.log.' },
          { mistake: 'Using -r without -n when searching codebases.', whyWrong: 'grep prints matching lines without telling you what line number to edit.', correctWay: 'Always use "grep -rn" so you know the exact line number.' },
        ],
        challenge: {
          question: 'Which grep flag prints the 3 lines of context BEFORE and 3 lines AFTER each matching line?',
          options: [
            { label: '-C 3 (or -A 3 -B 3)', isCorrect: true, explanation: 'Correct! -C (context) prints surrounding lines, or -B for Before and -A for After.' },
            { label: '-c 3', isCorrect: false, explanation: 'Incorrect. -c counts matches.' },
            { label: '-n 3', isCorrect: false, explanation: 'Incorrect. -n displays line numbers.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://www.gnu.org/software/grep/manual/grep.html',
          syntaxCheatSheet: [
            'grep -rn [PAT] [DIR]   # Recursive search with line numbers',
            'grep -i [PAT] [FILE]   # Case-insensitive search',
            'grep -v [PAT] [FILE]   # Invert match (exclude lines)',
            'grep -E "[REGEX]" ...  # Extended regular expressions',
            'grep -C 3 [PAT] [FILE] # Context: 3 lines before & after',
          ],
          bestPractices: [
            'Use "grep -v \'^#\' /etc/config | grep -v \'^$\'" to quickly inspect clean config files without comments or blank lines.',
          ],
        },
      },
      {
        id: 'c-sed-stream-editor',
        command: "sed -i 's/DEBUG=true/DEBUG=false/g' config.env",
        title: 'Stream Editing with sed',
        topicId: 'topic-05',
        topicNumber: '05',
        topicTitle: 'Text Processing (grep, sed, awk)',
        subtitle: 'Find and replace, in-place file editing (-i), line deletion, and stream transformation.',
        badges: ['Intermediate', 'Automation', 'sed'],
        quote: 'sed lets you edit files from scripts without ever opening an interactive text editor.',
        difficulty: 'Intermediate',
        whatIsIt: '`sed` (Stream Editor) parses and transforms text line-by-line using concise editing commands. Its most famous feature is search-and-replace (`s/find/replace/g`) and in-place file modification (`sed -i`).',
        inSimpleWords: '`sed` is automated find-and-replace for the terminal. If you need to change a database password in 100 configuration files, you don\'t open them in a text editor—you run `sed -i "s/oldpass/newpass/g" *.env` and it changes them all in 1 second.',
        whyDoYouNeedIt: 'Automation scripts, CI/CD pipelines, and cloud init provisioning scripts use `sed` to update configuration files dynamically during deployment.',
        realWorldAnalogy: 'A find-and-replace tool in Microsoft Word, but executed by a command line robot that can edit 500 documents while you blink.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT STREAM EDITORS (Manual File Editing)',
            items: [
              'Must open files in nano or vim on every server to change an IP address or port',
              'Automation scripts cannot update configuration settings dynamically',
              'Prone to human typo errors during manual configuration updates',
              'Cannot transform live text streams in pipelines',
            ],
            outcome: '🐌 Slow manual server configuration and broken deployment pipelines',
          },
          with: {
            title: 'WITH SED AUTOMATION',
            items: [
              'sed -i updates configuration variables directly in place in milliseconds',
              'Completely non-interactive: runs seamlessly in Dockerfiles and CI/CD pipelines',
              'Delete specific lines matching a pattern (sed \'/pattern/d\')',
              'Transform stream data on the fly inside pipelines',
            ],
            outcome: '⚡ 100% automated, reproducible configuration updates across servers',
          },
        },
        blockDiagram: {
          title: 'sed Pattern Space & Hold Space Architecture',
          subtitle: 'Click any component to inspect sed line-by-line processing:',
          nodes: [
            { id: 'sed-in', label: 'Input Line Stream', simpleDef: 'Text lines arriving from file or pipe.', techDef: 'Reads one line at a time from stdin or input file into memory.', badge: 'Input Line', color: '#38bdf8' },
            { id: 'sed-pattern-space', label: 'Pattern Space Buffer', simpleDef: 'The active scratchpad where sed modifies the current line.', techDef: 'Working memory buffer where search-and-replace and regex commands execute.', badge: 'Pattern Space', color: '#10b981' },
            { id: 'sed-cmd', label: 'Command Evaluation (s/old/new/g)', simpleDef: 'The edit instructions applied to the line.', techDef: 'Regex substitution, line deletion (d), or printing (p).', badge: 'Transform', color: '#a855f7' },
            { id: 'sed-out', label: 'Output / In-place Write (-i)', simpleDef: 'The modified line written to stdout or saved back to file.', techDef: 'Writes to stdout or atomic rename to original file when -i is set.', badge: 'Result', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'sed -i (In-place)', simple: 'Modifies the file directly on disk instead of just printing to terminal.', technical: 'Creates temporary file with edits, then atomically renames it over the original file.', analogy: 'Writing with an ink pen directly on the paper.' },
          { term: 's/find/replace/g', simple: 'Search and replace: s stands for substitute; g stands for global (all occurrences per line).', technical: 'Substitute command using delimiter (usually /) and global flag.', analogy: 'Find & Replace All.' },
          { term: 'Pattern Space', simple: 'The internal scratchpad where sed holds the line it is currently editing.', technical: 'RAM buffer storing current record during sed cycle execution.', analogy: 'The workbench where a carpenter holds the board they are cutting.' },
        ],
        whenToUse: [
          '✓ When updating configuration parameters in deployment scripts (sed -i "s/PORT=3000/PORT=8080/g" .env)',
          '✓ When deleting comment lines from output (sed \'/^#/d\' file.txt)',
          '✓ When replacing file paths (use alternate delimiters: sed "s|/var/old|/var/new|g")',
        ],
        whenNotToUse: [
          '✕ For complex tabular data calculations or column math (use awk instead of sed)',
        ],
        syntaxCode: "sed -i 's/PORT=3000/PORT=8080/g' .env",
        syntaxTokens: [
          { token: 'sed', role: 'Command', explanation: 'Stream editor.' },
          { token: '-i', role: 'Flag', explanation: 'In-place: edit file directly on disk.' },
          { token: "'s/PORT=3000/PORT=8080/g'", role: 'Expression', explanation: 'Substitute PORT=3000 with PORT=8080 globally.' },
          { token: '.env', role: 'Target File', explanation: 'Configuration file.' },
        ],
        variations: [
          { syntax: "sed 's/foo/bar/g' file.txt", title: 'Print to stdout', whatItDoes: 'Previews replacements without modifying the original file.', whenToUse: 'Testing regex before making changes.' },
          { syntax: "sed '/^#/d' file.conf", title: 'Delete Comment Lines', whatItDoes: 'Deletes lines starting with #.', whenToUse: 'Stripping comments from configs.' },
          { syntax: "sed 's|/usr/local/bin|/usr/bin|g' script.sh", title: 'Custom Delimiter (|)', whatItDoes: 'Uses | instead of / so you do not have to escape slashes.', whenToUse: 'Replacing file paths and URLs.' },
        ],
        internalFlow: [
          { step: 1, title: 'Read Line into Pattern Space', desc: 'sed reads one line from input stream into pattern space buffer.', why: 'Prepares line for modification.', techDetail: 'getline reads up to \\n delimiter' },
          { step: 2, title: 'Execute Substitution', desc: 'Regex engine matches "PORT=3000" and substitutes "PORT=8080".', why: 'Transforms text.', techDetail: 'Reconstructs pattern space string' },
          { step: 3, title: 'Write Output', desc: 'Outputs modified pattern space (either to stdout or temp file for -i).', why: 'Emits edited result.', techDetail: 'write() syscall' },
          { step: 4, title: 'Atomic Rename (-i)', desc: 'When in-place editing finishes, renames temp file over original file.', why: 'Ensures atomic crash-safe file update.', techDetail: 'rename(temp_fd, target_path)' },
        ],
        sandbox: {
          initialCommands: [
            'echo "DB_HOST=localhost" > /tmp/app.env',
            "sed 's/localhost/postgres.internal/g' /tmp/app.env",
            "sed -i 's/localhost/postgres.internal/g' /tmp/app.env && cat /tmp/app.env",
          ],
          guidedSteps: [
            { instruction: 'Create a test environment configuration file', command: 'echo "DB_HOST=localhost" > /tmp/app.env', hint: 'Run echo "DB_HOST=localhost" > /tmp/app.env' },
            { instruction: 'Preview substitution without modifying file', command: "sed 's/localhost/postgres.internal/g' /tmp/app.env", hint: 'Run sed \'s/localhost/postgres.internal/g\' /tmp/app.env' },
            { instruction: 'Apply substitution in-place with -i and verify', command: "sed -i 's/localhost/postgres.internal/g' /tmp/app.env && cat /tmp/app.env", hint: 'Run sed -i \'s/localhost/postgres.internal/g\' /tmp/app.env && cat /tmp/app.env' },
          ],
          targetTask: 'Perform automated text substitution using sed.',
          solutionCommands: [
            'echo "DB_HOST=localhost" > /tmp/app.env',
            "sed 's/localhost/postgres.internal/g' /tmp/app.env",
            "sed -i 's/localhost/postgres.internal/g' /tmp/app.env && cat /tmp/app.env",
          ],
        },
        commonMistakes: [
          { mistake: 'Forgetting the "g" flag at the end of s/old/new/.', whyWrong: 'Without "g", sed only replaces the FIRST occurrence on each line, ignoring subsequent occurrences on the same line!', correctWay: 'Always append "g" (s/old/new/g) unless you specifically want only the first match replaced.' },
          { mistake: 'Trying to escape every slash when replacing URLs like "http://example.com".', whyWrong: 'Leads to "leaning toothpick syndrome" (s/http:\\/\\/example\\.com/...).', correctWay: 'Use an alternate delimiter like pipe (|) or hash (#): sed "s|http://old|http://new|g".' },
        ],
        challenge: {
          question: 'What happens if you omit the "g" flag in the sed expression "sed \'s/cat/dog/\' file.txt"?',
          options: [
            { label: 'It replaces only the first occurrence of "cat" on each line', isCorrect: true, explanation: 'Correct! Without "g" (global), sed stops after the first substitution on each line.' },
            { label: 'It produces a syntax error', isCorrect: false, explanation: 'Incorrect. It is valid syntax.' },
            { label: 'It replaces all occurrences across the entire file', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://www.gnu.org/software/sed/manual/sed.html',
          syntaxCheatSheet: [
            "sed 's/old/new/g' file.txt     # Preview substitution to stdout",
            "sed -i 's/old/new/g' file.txt  # In-place file modification",
            "sed -i.bak 's/old/new/g' ...   # In-place with backup file creation",
            "sed '/pattern/d' file.txt      # Delete lines matching pattern",
            "sed 's|/path/one|/path/two|g'  # Use alternate delimiter for paths",
          ],
          bestPractices: [
            'Always test sed commands without -i first to preview changes in stdout before modifying production files.',
          ],
        },
      },
      {
        id: 'c-awk-text-processor',
        command: "awk -F: '$3 >= 1000 {print $1, $3, $7}' /etc/passwd",
        title: 'Column Processing with awk',
        topicId: 'topic-05',
        topicNumber: '05',
        topicTitle: 'Text Processing (grep, sed, awk)',
        subtitle: 'Field separators (-F), columnar extraction ($1, $2), pattern-action pairs, and arithmetic sums.',
        badges: ['Advanced', 'Data', 'awk'],
        quote: 'awk is not just a command—it is a complete, Turing-complete data processing programming language.',
        difficulty: 'Advanced',
        whatIsIt: '`awk` is a specialized programming language designed for processing columnar and structured text data. It automatically splits each line into fields (`$1`, `$2`, `$3`, ..., with `$0` representing the whole line) and executes pattern-action blocks (`condition { action }`).',
        inSimpleWords: 'Think of `awk` as a command-line spreadsheet. It splits text into columns (by spaces, commas, or colons). You can say: "If column 3 is greater than 1000, print column 1 and column 7", or calculate the average response time from 1,000,000 web access log rows.',
        whyDoYouNeedIt: 'Extracting specific fields from `ps`, `docker`, `kubectl`, or `/etc/passwd` output, calculating resource metrics, and generating reports from CSV/TSV log streams.',
        realWorldAnalogy: 'Writing an Excel formula (`=SUM(C:C)` or `=IF(C2>1000, A2, "")`) that automatically executes across every row of a spreadsheet at terminal speed.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT AWK (Awkward Shell Script Loops)',
            items: [
              'Writing multi-line "while read line; do ... done" bash loops that take 5 minutes to run',
              'Using cut, which fails when columns are separated by multiple variable spaces',
              'Cannot perform mathematical calculations (sums, averages) on log columns',
              'Complex python or perl scripts required for simple column extraction',
            ],
            outcome: '🐌 Slow shell loops and fragile space-delimited text parsing',
          },
          with: {
            title: 'WITH AWK COLUMNAR MASTERY',
            items: [
              'awk automatically treats any sequence of spaces as a single column separator',
              'Instant math: calculate total memory usage or average response time in one line',
              'Filter rows with boolean conditions (e.g. $9 == 500 for HTTP 500 errors)',
              'Processes 10,000,000 rows in seconds with minimal memory footprint',
            ],
            outcome: '⚡ Fast, elegant, one-line data extraction and log telemetry aggregation',
          },
        },
        blockDiagram: {
          title: 'awk Record ($0) and Field ($1, $2, ...) Splitting',
          subtitle: 'Click any component to inspect awk field splitting and conditional execution:',
          nodes: [
            { id: 'awk-record', label: 'Input Record ($0)', simpleDef: 'The complete entire line of text.', techDef: 'Full input record line assigned to special variable $0.', badge: 'Whole Line ($0)', color: '#38bdf8' },
            { id: 'awk-fs', label: 'Field Separator (FS / -F)', simpleDef: 'The delimiter splitting columns (space, comma, colon).', techDef: 'Field separator regex (FS variable, default is whitespace /[ \\t]+/).', badge: 'Separator', color: '#10b981' },
            { id: 'awk-fields', label: 'Field Variables ($1, $2, ...)', simpleDef: 'Individual columns extracted from the line.', techDef: 'Positional field variables $1, $2, ..., $NF (number of fields).', badge: 'Columns', color: '#a855f7' },
            { id: 'awk-action', label: 'Pattern { Action } Execution', simpleDef: 'Condition filtering and print blocks.', techDef: 'Executes block when condition evaluates to true (e.g. $3 > 1000).', badge: 'Action', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: '$1, $2, $NF', simple: '$1 is column 1; $2 is column 2; $NF is the VERY LAST column on the line.', technical: 'Positional field variables. NF is the total number of fields in the current record.', analogy: 'Column letters A, B, C in a spreadsheet.' },
          { term: '-F (Field Separator)', simple: 'Tells awk what character separates columns (like -F: for /etc/passwd).', technical: 'Sets FS variable specifying record delimiter.', analogy: 'Choosing whether values are separated by tabs or commas.' },
          { term: 'BEGIN and END blocks', simple: 'BEGIN runs before reading lines; END runs after reading all lines.', technical: 'Special pattern blocks executed prior to first record read and after EOF.', analogy: 'The opening credits and closing credits of a movie.' },
        ],
        whenToUse: [
          '✓ When extracting specific columns from command outputs (e.g. ps aux | awk \'{print $2, $11}\')',
          '✓ When filtering system users by UID (awk -F: \'$3 >= 1000 {print $1}\' /etc/passwd)',
          '✓ When computing sums of numbers in a column (awk \'{sum += $1} END {print sum}\' data.txt)',
        ],
        whenNotToUse: [
          '✕ For simple string replacements where sed is more concise',
        ],
        syntaxCode: "awk -F: '$3 >= 1000 {print $1, \"(UID: \" $3 \")\", $7}' /etc/passwd",
        syntaxTokens: [
          { token: 'awk', role: 'Command', explanation: 'Pattern scanning and processing language.' },
          { token: '-F:', role: 'Separator', explanation: 'Field separator set to colon (:).' },
          { token: "'$3 >= 1000", role: 'Condition', explanation: 'Only process lines where field 3 is greater than or equal to 1000.' },
          { token: "{print $1, $3, $7}'", role: 'Action Block', explanation: 'Print username ($1), UID ($3), and shell ($7).' },
        ],
        variations: [
          { syntax: "awk '{print $1}' file.txt", title: 'Print First Column', whatItDoes: 'Extracts column 1 delimited by whitespace.', whenToUse: 'Extracting IP addresses or process IDs.' },
          { syntax: "awk '{print $NF}' file.txt", title: 'Print Last Column', whatItDoes: 'Extracts the last column regardless of how many columns exist.', whenToUse: 'Extracting filenames from ls -l.' },
          { syntax: "awk '{sum += $1} END {print \"Total:\", sum}' nums.txt", title: 'Calculate Column Sum', whatItDoes: 'Sums all numbers in column 1 and prints total.', whenToUse: 'Aggregating metric totals.' },
        ],
        internalFlow: [
          { step: 1, title: 'Execute BEGIN Block', desc: 'awk executes optional BEGIN { ... } block before reading any files.', why: 'Initializes headers, counters, or custom separators.', techDetail: 'Executes before opening input file descriptors' },
          { step: 2, title: 'Read Line & Split Fields', desc: 'Reads line into $0, scans for FS delimiter, and populates $1..$NF.', why: 'Parses row into indexed columns.', techDetail: 'Tokenizes line buffer into string pointers' },
          { step: 3, title: 'Evaluate Pattern Condition', desc: 'Evaluates boolean expression (e.g. $3 >= 1000).', why: 'Determines whether action block should execute.', techDetail: 'Numeric comparison on field 3 value' },
          { step: 4, title: 'Execute Action Block', desc: 'Executes { print $1, $3 } formatting output to stdout.', why: 'Emits requested fields.', techDetail: 'Pipes formatted string to stdout' },
        ],
        sandbox: {
          initialCommands: [
            "awk -F: '{print $1, $3}' /etc/passwd | head -n 5",
            "awk -F: '$3 >= 1000 {print \"Human User:\", $1, \"UID:\", $3}' /etc/passwd",
            "echo -e '10\\n20\\n30' | awk '{sum+=$1} END {print \"Sum =\", sum}'",
          ],
          guidedSteps: [
            { instruction: 'Print username ($1) and UID ($3) from /etc/passwd', command: "awk -F: '{print $1, $3}' /etc/passwd | head -n 5", hint: "Run awk -F: '{print $1, $3}' /etc/passwd | head -n 5" },
            { instruction: 'Filter for human users with UID >= 1000', command: "awk -F: '$3 >= 1000 {print \"Human User:\", $1, \"UID:\", $3}' /etc/passwd", hint: "Run awk -F: '$3 >= 1000 {print \"Human User:\", $1, \"UID:\", $3}' /etc/passwd" },
            { instruction: 'Sum a column of numbers using awk', command: "echo -e '10\\n20\\n30' | awk '{sum+=$1} END {print \"Sum =\", sum}'", hint: "Run echo -e '10\\n20\\n30' | awk '{sum+=$1} END {print \"Sum =\", sum}'" },
          ],
          targetTask: 'Extract columns and perform conditional data filtering with awk.',
          solutionCommands: [
            "awk -F: '{print $1, $3}' /etc/passwd | head -n 5",
            "awk -F: '$3 >= 1000 {print \"Human User:\", $1, \"UID:\", $3}' /etc/passwd",
            "echo -e '10\\n20\\n30' | awk '{sum+=$1} END {print \"Sum =\", sum}'",
          ],
        },
        commonMistakes: [
          { mistake: 'Forgetting the -F flag when parsing colon-separated files like /etc/passwd.', whyWrong: 'By default, awk splits on whitespace. Without -F:, the entire line in /etc/passwd is treated as a single column ($1).', correctWay: 'Always specify -F: for colon-delimited files or -F, for CSVs.' },
          { mistake: 'Confusing $0 with $1.', whyWrong: '$0 represents the ENTIRE line, whereas $1 is only the first column.', correctWay: 'Use $1 for column 1; use $0 for whole row.' },
        ],
        challenge: {
          question: 'In awk, what does the special variable $NF represent?',
          options: [
            { label: 'The value of the very last column on the current line', isCorrect: true, explanation: 'Correct! NF is the total number of fields, so $NF accesses the last field.' },
            { label: 'The line number of the file', isCorrect: false, explanation: 'Incorrect. NR is the record/line number.' },
            { label: 'The name of the file being processed', isCorrect: false, explanation: 'Incorrect. FILENAME holds the file name.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://www.gnu.org/software/gawk/manual/gawk.html',
          syntaxCheatSheet: [
            "awk '{print $1}' [FILE]       # Print column 1 (whitespace separated)",
            "awk -F: '{print $1}' [FILE]   # Print column 1 (colon separated)",
            "awk '{print $NF}' [FILE]      # Print the last column",
            "awk '$3 > 100' [FILE]         # Print lines where column 3 > 100",
            "awk '{sum+=$1} END {print sum}' # Sum all values in column 1",
          ],
          bestPractices: [
            'Use awk whenever output columns are separated by multiple variable spaces, where cut -d" " fails.',
          ],
        },
      },
    ],
  },

  // =========================================================================
  // TOPIC 06: PROCESS MANAGEMENT & JOB CONTROL
  // =========================================================================
  {
    id: 'topic-06',
    number: '06',
    title: 'Process Management & Signals',
    iconName: 'Activity',
    description: 'Process trees (ps, top, htop), signals (SIGTERM, SIGKILL), and background job control (nohup, &).',
    concepts: [
      {
        id: 'c-process-ps-top',
        command: 'ps aux | grep nginx',
        title: 'Viewing Processes: ps & top',
        topicId: 'topic-06',
        topicNumber: '06',
        topicTitle: 'Process Management & Signals',
        subtitle: 'Process table inspection (PID, PPID, %CPU, %MEM, STAT) with ps aux, ps -ef, and top.',
        badges: ['Intermediate', 'Processes', 'Monitoring'],
        quote: 'Every running program in Linux is a process identified by a unique Process ID (PID).',
        difficulty: 'Intermediate',
        whatIsIt: 'The tools to inspect active Linux processes: `ps` takes a static snapshot of the current process table (PID, user, CPU, memory, state), while `top` and `htop` provide real-time interactive dashboards sorted by resource consumption.',
        inSimpleWords: 'Think of `ps aux` as the Windows Task Manager in text form. It lists every single program currently running on your computer, who started it, how much CPU and RAM it is eating, and its unique ID number (PID).',
        whyDoYouNeedIt: 'Detecting runaway CPU-hogging processes, finding process IDs to stop frozen programs, and verifying that services are actively running.',
        realWorldAnalogy: 'A company directory listing every active employee (Process), their badge number (PID), their department manager (PPID), and what percentage of the office supplies they are currently consuming.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT PROCESS MONITORING',
            items: [
              'A runaway infinite loop consumes 100% CPU and you have no idea which script is doing it',
              'Cannot determine whether a background database service is alive or frozen',
              'Zombie and defunct processes accumulate unnoticed, exhausting kernel PID limits',
              'Restarting servers blindly to fix mystery performance slowdowns',
            ],
            outcome: '😵 Server freezes, unmonitored runaway processes, and reboot-based debugging',
          },
          with: {
            title: 'WITH PROCESS TABLE MASTERY',
            items: [
              'ps aux reveals exact PID, memory footprint, and launch arguments instantly',
              'top highlights CPU spikes and memory leaks in real time',
              'pstree displays parent-child hierarchy to see what spawned a rogue process',
              'Targeted triage: stop or renice specific processes without rebooting the server',
            ],
            outcome: '⚡ Instant rogue process identification and 100% server control',
          },
        },
        blockDiagram: {
          title: 'Linux Process Table & Task Struct Architecture',
          subtitle: 'Click any process attribute to inspect kernel process table fields:',
          nodes: [
            { id: 'proc-pid', label: 'Process ID (PID)', simpleDef: 'The unique integer identifying the running program.', techDef: 'Kernel pid_t stored in task_struct. PID 1 is systemd (init).', badge: 'PID', color: '#38bdf8' },
            { id: 'proc-ppid', label: 'Parent Process ID (PPID)', simpleDef: 'The parent process that spawned this child.', techDef: 'PPID pointer tracking parent in process tree. Re-parented to init if parent dies.', badge: 'PPID', color: '#10b981' },
            { id: 'proc-stat', label: 'Process State (STAT)', simpleDef: 'Current state: Running (R), Sleeping (S), Zombie (Z).', techDef: 'Process state flags: R (running), S (interruptible sleep), D (uninterruptible disk sleep), Z (zombie).', badge: 'State', color: '#a855f7' },
            { id: 'proc-res', label: 'CPU & RAM Usage (%CPU, %MEM)', simpleDef: 'Percentage of hardware resources consumed.', techDef: 'Calculated from utime/stime CPU ticks and Resident Set Size (RSS) memory pages.', badge: 'Metrics', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'PID (Process ID)', simple: 'The unique identification number assigned to every process.', technical: 'Integer identifying task_struct in kernel process table (/proc/[pid]/).', analogy: 'A social security number for a program.' },
          { term: 'Zombie Process (Z)', simple: 'A dead process whose parent has not yet acknowledged its death.', technical: 'Terminated process that has released memory but still holds a slot in the kernel PID table.', analogy: 'A ghost waiting for someone to sign the death certificate.' },
          { term: 'D State (Uninterruptible Sleep)', simple: 'A process waiting on disk hardware I/O that cannot be killed even with kill -9.', technical: 'Process sleeping in kernel space waiting for disk or NFS block I/O (TASK_UNINTERRUPTIBLE).', analogy: 'A person frozen in carbonite.' },
        ],
        whenToUse: [
          '✓ When locating the PID of a service before restarting or terminating it (ps aux | grep nginx)',
          '✓ When checking system CPU and memory load in real time (top)',
          '✓ When viewing the parent-child hierarchy of spawned processes (pstree -p)',
        ],
        whenNotToUse: [
          '✕ Do not leave automated scripts parsing top output (use ps or /proc for script automation)',
        ],
        syntaxCode: 'ps aux | grep python',
        syntaxTokens: [
          { token: 'ps', role: 'Command', explanation: 'Report a snapshot of the current processes.' },
          { token: 'a', role: 'BSD Flag', explanation: 'All users: show processes belonging to all users.' },
          { token: 'u', role: 'BSD Flag', explanation: 'User-oriented format: show owner, %CPU, %MEM, start time.' },
          { token: 'x', role: 'BSD Flag', explanation: 'Include processes without a controlling terminal (daemons).' },
        ],
        variations: [
          { syntax: 'ps -ef', title: 'Standard POSIX Format', whatItDoes: 'Shows UID, PID, PPID, and command path.', whenToUse: 'Inspecting parent-child PPID relationships.' },
          { syntax: 'top -b -n 1', title: 'Batch Mode top', whatItDoes: 'Dumps a single snapshot of top to stdout.', whenToUse: 'Logging system state in cron scripts.' },
          { syntax: 'pstree -p', title: 'Process Tree', whatItDoes: 'Renders processes as a visual tree showing child branches with PIDs.', whenToUse: 'Debugging complex multi-worker services.' },
        ],
        internalFlow: [
          { step: 1, title: 'Read /proc Virtual Filesystem', desc: 'ps scans directory entries in the virtual /proc filesystem.', why: 'Every numeric folder in /proc represents an active PID.', techDetail: 'opendir("/proc") and scans numeric directory names' },
          { step: 2, title: 'Parse /proc/[pid]/stat & status', desc: 'Reads process metadata, state flags, and memory page metrics.', why: 'Gathers CPU ticks, RSS memory, and process name.', techDetail: 'Reads /proc/[pid]/stat and /proc/[pid]/cmdline' },
          { step: 3, title: 'Calculate CPU/Memory Percentages', desc: 'Computes elapsed time vs CPU ticks to calculate %CPU and %MEM.', why: 'Populates resource utilization columns.', techDetail: 'RSS pages * page_size / total_ram' },
          { step: 4, title: 'Print Formatted Table', desc: 'Sorts rows and writes process table to stdout.', why: 'Displays listing to user.', techDetail: 'write(1, table_buffer, len)' },
        ],
        sandbox: {
          initialCommands: ['ps aux | head -n 5', 'ps -ef | head -n 5', 'uptime'],
          guidedSteps: [
            { instruction: 'Inspect top processes using ps aux format', command: 'ps aux | head -n 5', hint: 'Run ps aux | head -n 5' },
            { instruction: 'Inspect processes with parent PPID using ps -ef', command: 'ps -ef | head -n 5', hint: 'Run ps -ef | head -n 5' },
            { instruction: 'Check system uptime and load average', command: 'uptime', hint: 'Run uptime' },
          ],
          targetTask: 'Inspect running system processes and monitor resource utilization.',
          solutionCommands: ['ps aux | head -n 5', 'ps -ef | head -n 5', 'uptime'],
        },
        commonMistakes: [
          { mistake: 'Trying to kill a Zombie (Z) process with "kill -9".', whyWrong: 'A Zombie is already dead! It cannot receive signals. It only exists as a slot in the PID table waiting for its parent to call wait().', correctWay: 'Kill the parent process (PPID) or restart the parent service to clear zombie slots.' },
          { mistake: 'Relying exclusively on %CPU in "top" on multi-core systems without pressing "1" or normalizing by core count.', whyWrong: 'On a 16-core system, a single-threaded loop can consume 100% of one core, which top reports as 100% CPU even though the system is only 6.25% utilized overall.', correctWay: 'Press "1" in top to see individual core breakdown or divide by the number of logical cores (nproc).' },
        ],
        challenge: {
          question: 'What does a process in "D" state in "ps" or "top" indicate?',
          options: [
            { label: 'Uninterruptible sleep: waiting on disk or network filesystem I/O (cannot be killed with kill -9)', isCorrect: true, explanation: 'Correct! Processes in D state are sleeping in the kernel waiting on hardware/NFS I/O.' },
            { label: 'Defunct zombie process', isCorrect: false, explanation: 'Incorrect. Zombies are in Z state.' },
            { label: 'Debugging mode', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man1/ps.1.html',
          syntaxCheatSheet: [
            'ps aux                # Comprehensive list of all processes with %CPU/%MEM',
            'ps -ef                # Standard listing showing UID, PID, PPID',
            'ps aux --sort=-%cpu   # Sort processes by highest CPU consumer first',
            'top                   # Interactive real-time process manager (q to exit)',
            'pstree -p             # View visual process tree with PIDs',
          ],
          bestPractices: [
            'Use "ps aux --sort=-%mem | head -n 10" to instantly find the top 10 memory-consuming processes on a sluggish server.',
          ],
        },
      },
      {
        id: 'c-signals-kill',
        command: 'kill -15 1234',
        title: 'Signals & Termination: kill & pkill',
        topicId: 'topic-06',
        topicNumber: '06',
        topicTitle: 'Process Management & Signals',
        subtitle: 'SIGTERM (15) graceful shutdown, SIGKILL (9) forced termination, SIGHUP (1), and pkill/killall.',
        badges: ['Intermediate', 'Processes', 'Signals'],
        quote: 'Always send SIGTERM (15) first to allow clean database disconnects; reserve SIGKILL (9) only as a last resort.',
        difficulty: 'Intermediate',
        whatIsIt: 'Asynchronous notifications sent by the Linux kernel to processes to inform them of events. The `kill` command transmits numeric or named signals (e.g. SIGTERM = 15, SIGKILL = 9, SIGHUP = 1) to target PIDs, while `pkill` and `killall` target processes by name.',
        inSimpleWords: 'Signals are like taps on the shoulder. `kill -15` (SIGTERM) is a polite tap saying: "Please save your work, close database connections, and shut down cleanly." `kill -9` (SIGKILL) is a ruthless guillotine: the kernel terminates the process instantly without giving it a chance to save anything.',
        whyDoYouNeedIt: 'Gracefully restarting services, terminating hung processes, reloading configuration files without dropping active user connections (SIGHUP).',
        realWorldAnalogy: 'SIGTERM (15) is asking a guest to pack their bags and head home; SIGKILL (9) is a security guard immediately throwing the guest out of the building.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT SIGNAL DISCIPLINE (Always Using kill -9)',
            items: [
              'kill -9 instantly kills databases mid-transaction, causing corrupted data files',
              'Temporary lock files and PID files left behind on disk, preventing service restarts',
              'Open network sockets left in hung TIME_WAIT states',
              'No opportunity for programs to flush memory caches to persistent storage',
            ],
            outcome: '💥 Database corruption, orphaned lock files, and data loss',
          },
          with: {
            title: 'WITH GRACEFUL SIGNAL PROTOCOLS',
            items: [
              'SIGTERM (15) allows web servers to finish processing active in-flight requests',
              'Database buffers are flushed cleanly to disk before process exit',
              'SIGHUP (1) reloads configuration files in Nginx without dropping live traffic',
              'kill -9 reserved exclusively for unresponsive, frozen rogue processes',
            ],
            outcome: '🛡️ Zero data loss, zero corrupted files, and zero-downtime reloads',
          },
        },
        blockDiagram: {
          title: 'Linux Signal Delivery Architecture',
          subtitle: 'Click any signal to inspect handling behavior and catchability:',
          nodes: [
            { id: 'sig-caller', label: 'kill Utility / Kernel', simpleDef: 'The sender issuing the signal.', techDef: 'Invokes kill(pid, sig) system call with signal number.', badge: 'Sender', color: '#38bdf8' },
            { id: 'sig-table', label: 'Kernel Signal Vector', simpleDef: 'Kernel checking permissions and queuing signal.', techDef: 'Kernel queues signal in task_struct->pending sigset_t.', badge: 'Kernel Delivery', color: '#a855f7' },
            { id: 'sig-15', label: 'SIGTERM (Signal 15)', simpleDef: 'Graceful termination: process can intercept and clean up.', techDef: 'Catchable/blockable signal triggering application signal handler.', badge: 'Catchable', color: '#10b981' },
            { id: 'sig-9', label: 'SIGKILL (Signal 9)', simpleDef: 'Forced termination: kernel destroys process instantly.', techDef: 'Non-catchable, un-blockable. Kernel reaps process unconditionally.', badge: 'Uncatchable', color: '#ef4444' },
          ],
        },
        terms: [
          { term: 'SIGTERM (Signal 15)', simple: 'The polite request to terminate cleanly.', technical: 'Default signal sent by kill. Triggers application cleanup handlers before exit.', analogy: 'Clicking "Shut Down" on your computer.' },
          { term: 'SIGKILL (Signal 9)', simple: 'The forced immediate kill command.', technical: 'Cannot be caught, blocked, or ignored. Kernel destroys the task struct immediately.', analogy: 'Pulling the power plug out of the wall.' },
          { term: 'SIGHUP (Signal 1)', simple: 'Hangup signal: traditionally when terminal disconnected, now used to reload configs.', technical: 'Sent when controlling terminal closes; adopted by Nginx/Postgres to trigger config hot-reloads.', analogy: 'Refreshing a webpage.' },
        ],
        whenToUse: [
          '✓ When stopping a service cleanly (kill -15 [PID] or systemctl stop)',
          '✓ When reloading Nginx configuration without restarting (kill -HUP [PID])',
          '✓ When terminating all worker processes by name (pkill -f "celery worker")',
        ],
        whenNotToUse: [
          '✕ Never use kill -9 as your first option (always try kill -15 first and give it 5-10 seconds to shut down)',
        ],
        syntaxCode: 'kill -15 4892',
        syntaxTokens: [
          { token: 'kill', role: 'Command', explanation: 'Send a signal to a process.' },
          { token: '-15', role: 'Signal Number', explanation: 'SIGTERM (Graceful Termination).' },
          { token: '4892', role: 'Target PID', explanation: 'Process ID to signal.' },
        ],
        variations: [
          { syntax: 'kill -9 4892', title: 'Forced Kill (SIGKILL)', whatItDoes: 'Unconditionally terminates process immediately.', whenToUse: 'Rogue frozen processes that ignore SIGTERM.' },
          { syntax: 'kill -HUP 1234', title: 'Reload Configuration (SIGHUP)', whatItDoes: 'Tells process to re-read its config file.', whenToUse: 'Zero-downtime service configuration reloads.' },
          { syntax: 'pkill -f "node server.js"', title: 'Kill by Pattern', whatItDoes: 'Kills all processes whose command line matches the pattern.', whenToUse: 'Stopping processes without searching for PIDs.' },
        ],
        internalFlow: [
          { step: 1, title: 'CLI Validates Signal & PID', desc: 'kill validates signal number and parses target PID.', why: 'Ensures target format is valid.', techDetail: 'Translates -15 to SIGTERM constant' },
          { step: 2, title: 'Issue kill() Syscall', desc: 'Invokes kill(pid, 15) system call.', why: 'Hands signal to kernel.', techDetail: 'Kernel verifies caller has CAP_KILL or matching EUID' },
          { step: 3, title: 'Kernel Queues Signal', desc: 'Kernel marks bit in target task_struct pending signal mask.', why: 'Signals are delivered when process next resumes execution.', techDetail: 'Updates task->pending.signal' },
          { step: 4, title: 'Process Signal Handler Executes', desc: 'Target process switches to its registered SIGTERM handler function.', why: 'Runs cleanup code (flushes buffers, closes sockets, calls exit(0)).', techDetail: 'Executes user-space signal trampoline' },
        ],
        sandbox: {
          initialCommands: [
            'sleep 100 &',
            'ps aux | grep sleep',
            'pkill -f "sleep 100"',
          ],
          guidedSteps: [
            { instruction: 'Start a background sleep process', command: 'sleep 100 &', hint: 'Run sleep 100 &' },
            { instruction: 'Verify the background sleep process is active', command: 'ps aux | grep sleep', hint: 'Run ps aux | grep sleep' },
            { instruction: 'Terminate the process by name using pkill', command: 'pkill -f "sleep 100"', hint: 'Run pkill -f "sleep 100"' },
          ],
          targetTask: 'Manage and terminate processes using signals.',
          solutionCommands: [
            'sleep 100 &',
            'ps aux | grep sleep',
            'pkill -f "sleep 100"',
          ],
        },
        commonMistakes: [
          { mistake: 'Always reaching for "kill -9" immediately.', whyWrong: 'Causes un-flushed disk writes, corrupted database tables, and leaves orphaned lock files.', correctWay: 'Send kill -15 first. Only if the process remains stuck after 10 seconds should you issue kill -9.' },
          { mistake: 'Confusing kill -9 (SIGKILL) with graceful termination signals.', whyWrong: 'SIGKILL bypasses application runtime hooks, preventing database connection pool drains or SSL session close notifies.', correctWay: 'Use SIGTERM (15) for graceful termination; use SIGHUP (1) for live config reloads without stopping the service.' },
        ],
        challenge: {
          question: 'Which signal CANNOT be caught, blocked, or ignored by any user-space application?',
          options: [
            { label: 'SIGKILL (Signal 9)', isCorrect: true, explanation: 'Correct! SIGKILL (and SIGSTOP) are handled directly by the kernel and cannot be caught.' },
            { label: 'SIGTERM (Signal 15)', isCorrect: false, explanation: 'Incorrect. SIGTERM can be caught by signal handlers.' },
            { label: 'SIGHUP (Signal 1)', isCorrect: false, explanation: 'Incorrect. SIGHUP is caught to reload configuration.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man7/signal.7.html',
          syntaxCheatSheet: [
            'kill -15 [PID]         # Graceful shutdown (SIGTERM)',
            'kill -9 [PID]          # Forced immediate termination (SIGKILL)',
            'kill -HUP [PID]        # Reload configuration (SIGHUP)',
            'pkill -f [PATTERN]     # Kill processes matching command line string',
            'killall [NAME]         # Kill all processes with exact binary name',
          ],
          bestPractices: [
            'In automated shutdown scripts, send SIGTERM, wait 10 seconds in a loop, and only send SIGKILL if the PID is still alive.',
          ],
        },
      },
      {
        id: 'c-jobs-background',
        command: 'nohup python3 server.py > server.log 2>&1 &',
        title: 'Background Jobs & nohup',
        topicId: 'topic-06',
        topicNumber: '06',
        topicTitle: 'Process Management & Signals',
        subtitle: 'Job control (&, jobs, fg, bg), disown, and preventing SIGHUP disconnects with nohup.',
        badges: ['Intermediate', 'Processes', 'Jobs'],
        quote: 'When you close an SSH terminal, the kernel sends SIGHUP to all child processes, terminating them—unless you use nohup.',
        difficulty: 'Intermediate',
        whatIsIt: 'Shell job control mechanisms that allow long-running commands to run in the background (`&`), manage paused jobs (`jobs`, `fg`, `bg`), and detach processes from the controlling terminal session using `nohup` or `disown` so they survive SSH disconnection.',
        inSimpleWords: 'Normally, when you start a script in your terminal, you have to wait for it to finish before you can type another command. Adding `&` at the end sends it to the background so you get your prompt back immediately. `nohup` prevents the script from dying when you close your laptop or disconnect from SSH.',
        whyDoYouNeedIt: 'Starting background servers, running long migration scripts, and preventing sudden SSH network drops from killing multi-hour tasks.',
        realWorldAnalogy: 'Ordering takeout at a restaurant: instead of standing at the counter blocking other customers, you take a buzzer number (`&`) and sit down. Even if your friend leaves the restaurant (`nohup`), the kitchen keeps cooking your food.',
        withoutVsWith: {
          without: {
            title: 'WITHOUT BACKGROUND JOB DISCIPLINE',
            items: [
              'A 4-hour database migration fails halfway through because your Wi-Fi dropped for 2 seconds',
              'Terminal prompt is held hostage by long-running processes',
              'Closing an SSH window accidentally kills production services running inside it',
            ],
            outcome: '💥 Half-finished database corruptions and dropped background jobs',
          },
          with: {
            title: 'WITH NOHUP & JOB CONTROL MASTERY',
            items: [
              'nohup ignores SIGHUP signals: processes run reliably until completion',
              'Append "&" to run heavy background tasks without blocking your shell prompt',
              'fg and bg move paused jobs between foreground and background effortlessly',
              'disown detaches active jobs from the shell process table permanently',
            ],
            outcome: '🛡️ Resilient long-running tasks that survive network drops and disconnects',
          },
        },
        blockDiagram: {
          title: 'Terminal Disconnect & SIGHUP Propagation',
          subtitle: 'Click any component to inspect what happens when an SSH session disconnects:',
          nodes: [
            { id: 'job-pty', label: 'Terminal PTY (SSH Connection)', simpleDef: 'Your active remote terminal connection.', techDef: 'Pseudoterminal master/slave pair controlling the interactive login session.', badge: 'Session PTY', color: '#38bdf8' },
            { id: 'job-bash', label: 'Parent Login Shell (bash)', simpleDef: 'The shell that spawned your background jobs.', techDef: 'Session leader process managing terminal process groups and job tables.', badge: 'Session Leader', color: '#10b981' },
            { id: 'job-sighup', label: 'SIGHUP Signal Propagation', simpleDef: 'The signal sent to kill all children when terminal closes.', techDef: 'Kernel sends SIGHUP to process group when controlling terminal drops carrier.', badge: 'Disconnect Signal', color: '#ef4444' },
            { id: 'job-nohup', label: 'nohup Shielded Process', simpleDef: 'Process configured to ignore SIGHUP signals.', techDef: 'Process sets signal handler SIG_IGN for SIGHUP, continuing execution in background.', badge: 'Immune Process', color: '#f59e0b' },
          ],
        },
        terms: [
          { term: 'nohup (No Hang Up)', simple: 'Makes a command immune to SIGHUP disconnect signals.', technical: 'Executes command with SIGHUP set to SIG_IGN and redirects default output to nohup.out.', analogy: 'An umbrella shielding you from rain.' },
          { term: 'Background Operator (&)', simple: 'Puts a command into the background immediately upon launch.', technical: 'Instructs shell not to wait for child process exit, returning control to terminal immediately.', analogy: 'Handing off a task to an assistant while you keep working.' },
          { term: 'fg and bg', simple: 'fg brings a background job to the front; bg resumes a paused job in the background.', technical: 'Manipulates shell job control table and sends SIGCONT to resume stopped jobs.', analogy: 'Swapping between active app windows on your phone.' },
        ],
        whenToUse: [
          '✓ When starting background processes in remote SSH sessions (nohup ./script.sh &)',
          '✓ When pausing an active task with Ctrl+Z and sending it to background with bg',
          '✓ When running multiple parallel tasks in automation scripts',
        ],
        whenNotToUse: [
          '✕ For production enterprise daemons (use systemd service units instead of raw nohup scripts)',
        ],
        syntaxCode: 'nohup ./backup.sh > backup.log 2>&1 &',
        syntaxTokens: [
          { token: 'nohup', role: 'Wrapper', explanation: 'Ignore SIGHUP disconnect signals.' },
          { token: './backup.sh', role: 'Command', explanation: 'Target script.' },
          { token: '> backup.log 2>&1', role: 'Redirection', explanation: 'Redirect output and errors to log.' },
          { token: '&', role: 'Background Operator', explanation: 'Run asynchronously in background.' },
        ],
        variations: [
          { syntax: 'jobs -l', title: 'List Background Jobs', whatItDoes: 'Lists active background jobs with Job ID and PID.', whenToUse: 'Monitoring background tasks in current shell.' },
          { syntax: 'fg %1', title: 'Bring Job to Foreground', whatItDoes: 'Brings job #1 back to interactive foreground control.', whenToUse: 'Interacting with a background job.' },
          { syntax: 'disown -h %1', title: 'Disown Running Job', whatItDoes: 'Detaches running job from shell so it survives logout.', whenToUse: 'Saving a job you forgot to start with nohup.' },
        ],
        internalFlow: [
          { step: 1, title: 'Set SIGHUP to Ignore', desc: 'nohup sets SIGHUP signal action to SIG_IGN in the process signal mask.', why: 'Immunity to terminal disconnects.', techDetail: 'signal(SIGHUP, SIG_IGN)' },
          { step: 2, title: 'Redirect Output Defaults', desc: 'If stdout is a terminal, redirects to nohup.out.', why: 'Prevents output from being lost.', techDetail: 'Redirects FD 1 to file' },
          { step: 3, title: 'Shell Forks in Background', desc: 'Shell forks process with & flag and does not call waitpid().', why: 'Returns prompt to user immediately.', techDetail: 'Prints [job_id] [PID]' },
          { step: 4, title: 'Terminal Closes Safely', desc: 'When user closes SSH, kernel sends SIGHUP; process ignores it and keeps running.', why: 'Guarantees process survival.', techDetail: 'Process is adopted by systemd (PID 1)' },
        ],
        sandbox: {
          initialCommands: [
            'sleep 20 &',
            'jobs',
            'kill %1',
          ],
          guidedSteps: [
            { instruction: 'Launch a background sleep job with &', command: 'sleep 20 &', hint: 'Run sleep 20 &' },
            { instruction: 'Inspect the active shell jobs table', command: 'jobs', hint: 'Run jobs' },
            { instruction: 'Terminate the background job using its job specifier', command: 'kill %1', hint: 'Run kill %1' },
          ],
          targetTask: 'Manage background jobs using job control operators (&, jobs, kill %).',
          solutionCommands: [
            'sleep 20 &',
            'jobs',
            'kill %1',
          ],
        },
        commonMistakes: [
          { mistake: 'Running a command with "&" but without "nohup" over SSH.', whyWrong: 'When you close SSH, the shell still sends SIGHUP to the background job, killing it!', correctWay: 'Always use "nohup command &" or a terminal multiplexer like tmux/screen.' },
          { mistake: 'Starting a background job without redirecting stdin/stdout and having it hang waiting for terminal input.', whyWrong: 'Interactive commands (like password prompts) placed in the background freeze with SIGTTIN until brought to foreground.', correctWay: 'Pass all non-interactive flags or redirect input (`nohup cmd < /dev/null > out.log 2>&1 &`).' },
        ],
        challenge: {
          question: 'What happens to a regular background process (started with only "&") when you disconnect from an SSH session?',
          options: [
            { label: 'The kernel sends SIGHUP upon terminal closure, terminating the background process', isCorrect: true, explanation: 'Correct! Without nohup or disown, SIGHUP kills the process when the shell exits.' },
            { label: 'The process automatically converts into a systemd service', isCorrect: false, explanation: 'Incorrect.' },
            { label: 'The process pauses and resumes when you log back in', isCorrect: false, explanation: 'Incorrect.' },
          ],
        },
        reference: {
          officialDocUrl: 'https://man7.org/linux/man-pages/man1/nohup.1.html',
          syntaxCheatSheet: [
            'cmd &                # Run command asynchronously in background',
            'jobs                 # List background jobs in current shell',
            'fg %[ID]             # Bring job into foreground',
            'bg %[ID]             # Resume paused job in background',
            'nohup cmd &          # Run immune to SIGHUP disconnects',
            'disown -h %[ID]      # Detach active job from shell',
          ],
          bestPractices: [
            'For multi-hour server maintenance or migrations, always use a terminal multiplexer (tmux) or systemd service.',
          ],
        },
      },
    ],
  },
];
