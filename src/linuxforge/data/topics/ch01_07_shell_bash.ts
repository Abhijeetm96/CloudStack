import { LinuxTopic } from '../unifiedLinuxData';

export const MODULE_07_SHELL_BASH: LinuxTopic = {
  id: 'ch01-07-shell-bash',
  number: '01.7',
  title: 'Shell & Bash Automation',
  iconName: 'TerminalSquare',
  description:
    'Shell mechanics and scripting automation: I/O streams & redirection (stdin, stdout, stderr, |, >, >>, tee), environment & arguments (PATH, export, $?, $0..$9), and robust script programming (if/else, loops, functions, case, set -euo pipefail).',
  concepts: [
    {
      id: 'linux-shell-streams-pipes',
      command: 'ls /var/log > output.txt 2> error.log; cmd 2>&1 | tee combined.log; echo "Today is $(date +%Y-%m-%d)"',
      title: 'Streams, Pipes & Redirection: stdin, stdout, stderr, |, $(cmd)',
      topicId: 'ch01-07-shell-bash',
      topicNumber: '01.7',
      topicTitle: 'Shell & Bash Automation',
      subtitle: 'File descriptors 0, 1, and 2, stream redirection operators, pipelines, and command substitution',
      badges: ['Streams', 'Pipes', 'Core Shell'],
      quote:
        'Programs that communicate through standard streams can be linked together like Lego blocks to build complex data processing systems.',
      difficulty: 'Beginner',
      whatIsIt:
        'Every process launched in a Linux shell is automatically provisioned with three standard I/O streams referenced by integer file descriptors (FDs): **FD 0 (stdin)** for standard input, **FD 1 (stdout)** for standard output, and **FD 2 (stderr)** for standard error diagnostics. The shell allows precise stream redirection: `>` overwrites stdout to a file; `>>` appends stdout; `2>` redirects errors; `2>&1` or `&>` combines stderr into stdout; and `<` feeds file contents into stdin. The **Pipe (`|`)** connects the stdout of one program directly into the stdin of another through an in-memory kernel circular buffer. Finally, **Command Substitution (`$(command)`)** executes a command in a subshell and substitutes its standard output directly into a command string.',
      inSimpleWords:
        'Every program has one mouth for normal speech (stdout), one mouth for crying for help (stderr), and one ear for listening (stdin). Redirection (`>`) directs speech into a file. A pipe (`|`) connects one program’s mouth directly to another program’s ear. `$(date)` runs a command and pastes the answer into your sentence.',
      whyDoYouNeedIt:
        'Silence noisy commands in automated scripts (`cmd > /dev/null 2>&1`), capture error logs separately from business data, and pass dynamic outputs into variables (`IMAGE_ID=$(docker build -q .)`).',
      realWorldAnalogy:
        'A plumbing system: Water (data) flows through pipes (`|`) from one filter to the next. Valves (`>`) redirect the clean water into a tank (file), while waste pipes (`2>`) redirect dirty water to the sewer.',
      withoutVsWith: {
        without: {
          title: 'Without Standard Streams and Pipes (Monolithic File Dumping)',
          items: [
            'Every program must write intermediate results to temporary disk files',
            'High disk I/O latency and leftover temporary scratch files littering the drive',
            'Cannot combine independent command-line tools dynamically',
          ],
          outcome: 'Slow, disk-bound scripts with high disk wear and complex cleanup boilerplate.',
        },
        with: {
          title: 'With Linux Standard Streams and In-Memory Pipes',
          items: [
            'Data streams directly between processes in RAM at memory bus speeds (GB/s)',
            'Clean separation between normal output (FD 1) and operational errors (FD 2)',
            'Clean command substitution ($(cmd)) enables dynamic configuration templating',
          ],
          outcome: 'Lightning-fast stream pipelines and modular, reusable command chains.',
        },
      },
      blockDiagram: {
        title: 'Linux Standard Streams Architecture',
        subtitle: 'File Descriptors 0 (stdin), 1 (stdout), 2 (stderr), Pipes, and Redirection',
        nodes: [
          { id: 'fd0', label: 'FD 0: stdin', simpleDef: 'Standard Input', techDef: 'Keyboard or incoming pipe stream read by process', badge: 'stdin (0)', color: '#38bdf8' },
          { id: 'fd-proc', label: 'Running Process', simpleDef: 'Executes application logic', techDef: 'Reads from FD 0, writes results to FD 1, writes errors to FD 2', badge: 'Process', color: '#10b981' },
          { id: 'fd1', label: 'FD 1: stdout', simpleDef: 'Standard Output', techDef: 'Redirected with > or >>, or piped to next process with |', badge: 'stdout (1)', color: '#06b6d4' },
          { id: 'fd2', label: 'FD 2: stderr', simpleDef: 'Standard Error', techDef: 'Diagnostic error stream; separated from data with 2> or 2>&1', badge: 'stderr (2)', color: '#ef4444' },
        ],
      },
      terms: [
        { term: '2>&1', simple: 'Sends standard error to the same place as standard output.', technical: 'Duplicates file descriptor 2 to file descriptor 1 using the dup2() syscall.' },
        { term: 'tee', simple: 'Splits output so you see it on the screen AND save it to a file at the same time.', technical: 'Reads from standard input and writes simultaneously to standard output and one or more files.' },
        { term: 'Command Substitution $(...)', simple: 'Runs a command and replaces it with the output text.', technical: 'Executes command in a subshell, captures its stdout, and strips trailing newlines.' },
      ],
      whenToUse: [
        'Saving output to a log file: `app > /var/log/app.log 2>&1`',
        'Watching command output on screen while saving to disk: `make build | tee build.log`',
        'Passing dynamic timestamps into backup filenames: `tar -czf backup-$(date +%F).tar.gz /data`',
        'Filtering data across tools: `cat access.log | grep 404 | wc -l`',
      ],
      whenNotToUse: [
        'Never use single `>` when appending to log files; single `>` truncates and wipes the file clean immediately',
      ],
      syntaxCode: 'ls -la > files.txt\napp >> app.log 2>&1\nfind / -name "*.conf" 2>/dev/null\ncat names.txt | sort | uniq\nCURRENT_HOST=$(hostname)',
      syntaxTokens: [
        { token: '>', role: 'Operator', explanation: 'Redirect and overwrite stdout to file' },
        { token: '>>', role: 'Operator', explanation: 'Redirect and append stdout to file' },
        { token: '2>&1', role: 'Operator', explanation: 'Merge stderr into stdout stream' },
        { token: '|', role: 'Pipe', explanation: 'Connect stdout of left process to stdin of right process' },
        { token: '$(...)', role: 'Substitution', explanation: 'Subshell command substitution' },
      ],
      variations: [
        { syntax: 'cmd &> all.log', title: 'Combined Redirection', whatItDoes: 'Bash shortcut to redirect both stdout and stderr', whenToUse: 'Modern Bash scripts' },
        { syntax: 'cmd < input.txt', title: 'Input Redirection', whatItDoes: 'Feeds file contents into stdin of command', whenToUse: 'Importing SQL dumps: mysql < db.sql' },
        { syntax: 'cat << "EOF"', title: 'Here-Document', whatItDoes: 'Multi-line inline text block redirected to stdin', whenToUse: 'Generating config files inside bash scripts' },
      ],
      internalFlow: [
        { step: 1, title: 'Shell Creates Pipe Buffer', desc: 'Shell calls pipe() syscall creating a 64KB kernel circular ring buffer', why: 'Prepares inter-process pipe', techDetail: 'Returns read FD and write FD in kernel VFS' },
        { step: 2, title: 'dup2() Syscall Reassignment', desc: 'Shell forks child processes and calls dup2() on file descriptors', why: 'Rewires stdout and stdin', techDetail: 'Points FD 1 of left process to pipe write end, and FD 0 of right process to pipe read end' },
        { step: 3, title: 'Parallel Streaming Execution', desc: 'Both processes execute in parallel; writer pushes bytes and reader consumes', why: 'High-throughput stream', techDetail: 'Kernel automatically pauses writer if pipe buffer fills (SIGPIPE on reader close)' },
      ],
      sandbox: {
        initialCommands: ['# Test redirection and command substitution\necho "Logged at $(date)" > /tmp/forge_test.log\ncat /tmp/forge_test.log'],
        guidedSteps: [
          { instruction: 'Redirect echo output into /tmp/forge_test.log', command: 'echo "Hello Linux" > /tmp/forge_test.log', hint: 'Use > to redirect' },
          { instruction: 'Append another line using >>', command: 'echo "Second Line" >> /tmp/forge_test.log', hint: 'Use >> to append' },
          { instruction: 'Inspect the resulting file', command: 'cat /tmp/forge_test.log', hint: 'Run cat /tmp/forge_test.log' },
        ],
        targetTask: 'Practice stream redirection with > and >>',
        solutionCommands: ['echo "Hello Linux" > /tmp/forge_test.log', 'echo "Second Line" >> /tmp/forge_test.log'],
      },
      commonMistakes: [
        { mistake: 'Using > instead of >> on active application logs', whyWrong: 'Single > truncates the file to 0 bytes immediately upon execution, erasing all historical logs.', correctWay: 'Always use >> to append data to existing log files.' },
        { mistake: 'Writing sudo cmd > /root/secret.txt and wondering why permission is denied', whyWrong: 'The shell opens the redirect file before running sudo; your unprivileged shell attempts to open /root/secret.txt and fails.', correctWay: 'Use echo "data" | sudo tee /root/secret.txt or sudo bash -c "echo ... > file".' },
      ],
      challenge: {
        question: 'What is the numeric file descriptor for standard error (stderr) in Linux?',
        options: [
          { label: '2', isCorrect: true, explanation: 'FD 0 is stdin, FD 1 is stdout, and FD 2 is stderr.' },
          { label: '1', isCorrect: false, explanation: 'FD 1 is stdout.' },
          { label: '0', isCorrect: false, explanation: 'FD 0 is stdin.' },
          { label: '3', isCorrect: false, explanation: 'FD 3 is typically the first custom file descriptor opened by the application.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['<cmd> > <file>', '<cmd> >> <file>', '<cmd> 2> <error_file>', '<cmd> > <file> 2>&1', '<cmd1> | <cmd2>', 'VAR=$(<cmd>)'],
        bestPractices: [
          'Use command substitution $(cmd) instead of legacy backticks `cmd` for cleaner nesting',
          'Use tee -a to append to protected root files: echo "setting" | sudo tee -a /etc/sysctl.conf',
        ],
      },
    },
    {
      id: 'linux-bash-environment-vars',
      command: 'echo $PATH; export APP_ENV=production; echo "Script: $0, Args: $#, All: $@, Exit: $?"',
      title: 'Environment Variables, PATH & Shell Arguments: $?, $0..$9',
      topicId: 'ch01-07-shell-bash',
      topicNumber: '01.7',
      topicTitle: 'Shell & Bash Automation',
      subtitle: 'Process environment inheritance, command lookup resolution, positional parameters, and exit codes',
      badges: ['Environment', 'PATH', 'Positional Args'],
      quote:
        'Exit code 0 means success; anything from 1 to 255 represents an error. Always inspect $? to verify command success.',
      difficulty: 'Intermediate',
      whatIsIt:
        'Processes in Linux inherit execution settings from their environment variables. `export VAR=value` promotes a local shell variable to an environment variable, propagating it down to all child processes spawned by that shell. The most vital variable is **`$PATH`**: a colon-delimited list of directories searched in order whenever a command name is typed without a path. Positional parameters allow scripts to parse inputs: `$0` is the script name, `$1` to `$9` are input arguments, `$#` is the total argument count, and `$@` is the array of all arguments. Finally, **`$?` (Exit Code)** captures the termination status of the most recently executed foreground command: `0` indicates success, while non-zero (`1` to `255`) represents error conditions.',
      inSimpleWords:
        '`export` makes a variable available to programs you run. `$PATH` is the list of folders your computer checks to find programs. `$1`, `$2` are the inputs you passed to your script. `$?` tells you whether the last command succeeded (`0`) or failed (not `0`).',
      whyDoYouNeedIt:
        'Configuring 12-factor apps via environment variables (`DATABASE_URL`, `PORT`), writing robust CI/CD scripts that check `if [ $? -ne 0 ]`, and adding custom binary directories to `$PATH` (`export PATH=$PATH:/opt/bin`).',
      realWorldAnalogy:
        'A worker on a construction site: The worker’s toolbelt is `$PATH` (where they look for tools). The blueprint is the environment variables. The worker’s thumbs-up or thumbs-down at the end of the day is the exit code `$?` (thumbs up = 0, thumbs down = 1).',
      withoutVsWith: {
        without: {
          title: 'Without Environment Variables and Exit Codes',
          items: [
            'Database passwords and API keys hardcoded insecurely in source code repositories',
            'Scripts continue running blindly after a command fails, corrupting downstream state',
            'Must type full absolute path (/usr/bin/python3) for every single command',
          ],
          outcome: 'Leaked credentials, catastrophic deployment failures, and tedious scripting.',
        },
        with: {
          title: 'With Linux Environment Variables and Exit Codes',
          items: [
            'Clean 12-factor application configuration injected securely at runtime via export',
            'Instant failure detection using exit code validation (set -e or if [ $? -eq 0 ])',
            'Universal binary resolution through standardized $PATH traversal',
          ],
          outcome: 'Secure, dynamic configurations and bulletproof automated script logic.',
        },
      },
      blockDiagram: {
        title: '$PATH Resolution & Positional Parameter Architecture',
        subtitle: 'How the shell resolves binary names via $PATH and passes arguments to child processes',
        nodes: [
          { id: 'env-path', label: '$PATH Traversal', simpleDef: '/usr/local/bin:/usr/bin:/bin', techDef: 'Shell searches directories sequentially from left to right; first match executes', badge: '$PATH', color: '#38bdf8' },
          { id: 'env-args', label: 'Arguments: $1, $2, $@', simpleDef: 'Inputs passed to script', techDef: 'Populates argv[] array; $# contains argc count', badge: 'Positional Args', color: '#10b981' },
          { id: 'env-export', label: 'export VAR=val', simpleDef: 'Inherited by child processes', techDef: 'Adds key-value pair to process environ pointer passed to execve()', badge: 'Environment', color: '#06b6d4' },
          { id: 'env-status', label: 'Exit Code ($?)', simpleDef: '0 = Success, >0 = Error', techDef: 'WEXITSTATUS returned from waitpid(); 0 is EXIT_SUCCESS', badge: 'Exit Code $?', color: '#f59e0b' },
        ],
      },
      terms: [
        { term: 'export', simple: 'Shares a variable with all future commands and child processes.', technical: 'Marks a shell variable for export to the environment of subsequently executed child commands.' },
        { term: 'Exit Code 0 vs Non-Zero', simple: 'In Linux, 0 means perfect success; any non-zero number (1-255) means an error occurred.', technical: 'Standard POSIX exit convention; 0 is EXIT_SUCCESS, 1 is general catchall error, 127 is command not found.' },
        { term: '$@ vs $*', simple: '"$@" preserves each argument with spaces intact as separate words.', technical: '"$@" expands each positional parameter as a separate quoted word; "$*" expands all into a single string.' },
      ],
      whenToUse: [
        'Adding software to your shell PATH: `export PATH="$PATH:/usr/local/go/bin"`',
        'Testing whether a command succeeded in bash: `if [ $? -eq 0 ]; then echo "Success"; fi`',
        'Passing arguments cleanly into a wrapper script: `exec target_binary "$@"`',
      ],
      whenNotToUse: [
        'Do not store secrets in environment variables on shared multi-tenant machines without caution; any user with ps permissions might read `/proc/<PID>/environ` if permissions are lax',
      ],
      syntaxCode: 'export NODE_ENV="production"\necho $PATH\necho "Exit code was: $?"\ncat script.sh\n# Inside script:\necho "Script: $0, First arg: $1, Total: $#"',
      syntaxTokens: [
        { token: 'export', role: 'Built-in', explanation: 'Export variable to child process environments' },
        { token: '$PATH', role: 'Variable', explanation: 'Colon-separated list of executable search paths' },
        { token: '$?', role: 'Special Variable', explanation: 'Exit status of the most recent foreground command' },
        { token: '$@', role: 'Special Variable', explanation: 'Array of all positional parameters passed to script' },
      ],
      variations: [
        { syntax: 'printenv', title: 'Print Environment', whatItDoes: 'Displays all currently exported environment variables', whenToUse: 'Debugging container env' },
        { syntax: 'which nginx', title: 'Locate in PATH', whatItDoes: 'Returns the exact binary path resolved by $PATH', whenToUse: 'Verifying active binary version' },
      ],
      internalFlow: [
        { step: 1, title: 'Command Typed into Shell', desc: 'User types "python3" without an absolute path', why: 'Needs binary location', techDetail: 'Shell splits $PATH on colons into directory list' },
        { step: 2, title: 'Directory Stat Traversal', desc: 'Shell checks access(/usr/local/bin/python3, X_OK), then /usr/bin', why: 'Finds executable', techDetail: 'First matching executable file stops search (cached in shell hash table)' },
        { step: 3, title: 'Child Inherits environ', desc: 'Shell forks and passes environ pointer array to execve()', why: 'Propagates variables', techDetail: 'Child process inspects getenv() to read APP_ENV' },
      ],
      sandbox: {
        initialCommands: ['# Check your current PATH and test exit codes\necho "Current PATH: $PATH"\nls /etc/hosts > /dev/null\necho "Exit code of successful command: $?"'],
        guidedSteps: [
          { instruction: 'Print the current $PATH variable', command: 'echo $PATH', hint: 'Run echo $PATH' },
          { instruction: 'Test exit code of a non-existent command', command: 'ls /nonexistent_directory 2>/dev/null; echo $?', hint: 'Notice non-zero exit code' },
        ],
        targetTask: 'Inspect $PATH and verify command exit codes with echo $?',
        solutionCommands: ['echo $PATH', 'ls /nonexistent_directory 2>/dev/null; echo $?'],
      },
      commonMistakes: [
        { mistake: 'Setting a variable without export and expecting child scripts to read it (e.g. PORT=8080 then ./app)', whyWrong: 'Without export, the variable remains local to that specific shell process and is never passed to child processes.', correctWay: 'Use export PORT=8080 or pass it inline on the same command line: PORT=8080 ./app.' },
        { mistake: 'Overwriting PATH completely: export PATH=/opt/bin', whyWrong: 'Erases /bin and /usr/bin from the search path, instantly breaking standard commands like ls, cp, and cat.', correctWay: 'Always append or prepend to existing PATH: export PATH="$PATH:/opt/bin".' },
      ],
      challenge: {
        question: 'What does an exit code of 0 mean when returned by a Linux command ($?)?',
        options: [
          { label: 'The command completed successfully with zero errors', isCorrect: true, explanation: 'In Unix convention, exit code 0 represents EXIT_SUCCESS.' },
          { label: 'The command failed and produced 0 output', isCorrect: false, explanation: 'Failure returns non-zero values (1-255).' },
          { label: 'The command was killed by SIGKILL', isCorrect: false, explanation: 'Killed by signal returns 128 + signal number (137 for SIGKILL).' },
          { label: 'The command is still running in the background', isCorrect: false, explanation: '$? is only populated once a command terminates.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['export <VAR>=<val>', 'printenv', 'echo $PATH', 'echo $?', 'echo "$@"'],
        bestPractices: [
          'Always quote "$@" when passing arguments to prevent word splitting on spaces',
          'Use export PATH="/custom/bin:$PATH" to ensure custom binaries take precedence over system defaults',
        ],
      },
    },
    {
      id: 'linux-bash-scripting-control',
      command: 'cat << "EOF" > deploy.sh\n#!/usr/bin/env bash\nset -euo pipefail\nif [ "$1" == "prod" ]; then echo "Deploying Prod"; fi\nEOF',
      title: 'Bash Scripting & Logic: if/else, loops, functions, case & set -euo pipefail',
      topicId: 'ch01-07-shell-bash',
      topicNumber: '01.7',
      topicTitle: 'Shell & Bash Automation',
      subtitle: 'Defensive bash scripting, robust control flow, modular functions, pattern branching, and safety flags',
      badges: ['Scripting', 'Automation', 'Defensive Bash'],
      quote:
        'Always start production bash scripts with set -euo pipefail: never allow a script to silently ignore errors or unset variables.',
      difficulty: 'Intermediate',
      whatIsIt:
        'Bash scripting transforms one-off terminal commands into robust, automated infrastructure code. The standard script header begins with the shebang `#!/usr/bin/env bash` followed immediately by the **Unofficial Bash Strict Mode**: `set -euo pipefail` (`-e` exits on any error, `-u` exits on unset variables, and `-o pipefail` prevents pipeline errors from being masked). Core programming primitives include conditionals (`if [[ condition ]]; then ... elif ... else ... fi`), pattern branching (`case "$VAR" in pattern) ... ;; esac`), looping constructs (`for item in "${ARRAY[@]}"; do ... done` and `while read -r line; do ... done`), and reusable modular functions returning status codes.',
      inSimpleWords:
        'A bash script is a text file of commands that run in order. `set -euo pipefail` makes the script stop immediately if anything goes wrong (preventing disasters). `if/else` makes decisions, `case` matches options, `for` repeats tasks, and `functions` organize reusable blocks of code.',
      whyDoYouNeedIt:
        'Every CI/CD runner (GitHub Actions, GitLab CI) and Kubernetes entrypoint script is written in Bash. Writing defensive bash scripts prevents partially deployed releases and accidental deletion of files.',
      realWorldAnalogy:
        'A pilot’s pre-flight checklist: `set -euo pipefail` is the emergency abort rule (if any warning light turns red, abort immediately). `if/else` checks fuel and weather. Loops inspect every engine in sequence.',
      withoutVsWith: {
        without: {
          title: 'Without Strict Mode and Defensive Scripting (Default Bash)',
          items: [
            'Script continues running after critical build failures, deploying broken empty code',
            'Unset variable in rm -rf "${DIR}/*" evaluates to rm -rf "/*" and destroys root disk',
            'Piping failures (failed_cmd | sort) are masked as successful because sort exited 0',
          ],
          outcome: 'Silent data loss, corrupted server state, and catastrophic automated script bugs.',
        },
        with: {
          title: 'With set -euo pipefail and Structured Control Flow',
          items: [
            'Script terminates instantly the moment any command, variable, or pipe segment fails',
            'Clear error messages point directly to the exact line number that broke',
            'Clean, modular functions with local variable scoping and explicit return codes',
          ],
          outcome: 'Bulletproof, self-documenting production automation.',
        },
      },
      blockDiagram: {
        title: 'Defensive Bash Execution Pipeline: set -euo pipefail',
        subtitle: 'The safety net preventing silent failures, masked errors, and unbound variables',
        nodes: [
          { id: 'b-shebang', label: '#!/usr/bin/env bash', simpleDef: 'Shebang line', techDef: 'Executes script using the bash binary found in user environment $PATH', badge: 'Interpreter', color: '#38bdf8' },
          { id: 'b-strict', label: 'set -euo pipefail', simpleDef: 'Strict Mode', techDef: '-e (exit on error), -u (exit on unset var), -o pipefail (fail if any pipe fails)', badge: 'Safety Guard', color: '#ef4444' },
          { id: 'b-control', label: 'Control Flow (if / case / for)', simpleDef: 'Decision logic', techDef: 'Evaluates test conditions [[ ]], pattern branches, and array loops', badge: 'Logic', color: '#10b981' },
          { id: 'b-func', label: 'Modular Functions', simpleDef: 'Reusable blocks', techDef: 'Local variable scoping (local var=val) with explicit return status', badge: 'Functions', color: '#06b6d4' },
        ],
      },
      terms: [
        { term: 'set -e (errexit)', simple: 'Stops the script immediately if any command fails.', technical: 'Causes shell to exit immediately if any simple command exits with a non-zero status.' },
        { term: 'set -u (nounset)', simple: 'Treats unset or unassigned variables as an error and exits.', technical: 'Causes shell to exit when attempting to expand an unset variable, preventing rm -rf $EMPTY_VAR/* disasters.' },
        { term: 'pipefail', simple: 'Returns the exit code of the LAST FAILED command in a pipeline, not just the last one.', technical: 'Pipeline status is the value of the last (rightmost) command to exit with a non-zero status.' },
      ],
      whenToUse: [
        'Writing any deployment or provisioning script: start with `set -euo pipefail`',
        'Parsing command-line flags with `case "$1" in -h|--help) ... ;; esac`',
        'Iterating through files safely: `for file in /path/*.log; do ... done`',
      ],
      whenNotToUse: [
        'Avoid `set -e` in interactive login shells; an accidental typo will close your terminal window!',
      ],
      syntaxCode: '#!/usr/bin/env bash\nset -euo pipefail\n\nlog() {\n  echo "[$(date +%T)] $1"\n}\n\nif [[ "$1" == "prod" ]]; then\n  log "Production deployment"\nfi',
      syntaxTokens: [
        { token: '#!/usr/bin/env bash', role: 'Shebang', explanation: 'Specifies the script interpreter' },
        { token: 'set -euo pipefail', role: 'Strict Mode', explanation: 'Enforces strict error checking and unset variable prevention' },
        { token: '[[ ... ]]', role: 'Conditional', explanation: 'Extended test bracket supporting regex and string equality' },
      ],
      variations: [
        { syntax: 'while IFS= read -r line; do ... done < file.txt', title: 'Safe Line Reading', whatItDoes: 'Reads file line-by-line without stripping whitespace or backslashes', whenToUse: 'Parsing structured text files' },
        { syntax: 'case "$ENV" in dev) ... ;; prod) ... ;; *) exit 1 ;; esac', title: 'Case Matching', whatItDoes: 'Branches execution based on pattern matching', whenToUse: 'Multi-environment switching' },
      ],
      internalFlow: [
        { step: 1, title: 'Kernel Reads Shebang (#!)', desc: 'Kernel execve() reads first 2 bytes (0x23 0x21) and extracts interpreter path', why: 'Finds interpreter', techDetail: 'Invokes /usr/bin/env bash passing script path as argv[1]' },
        { step: 2, title: 'set -euo pipefail Configuration', desc: 'Bash configures internal execution flags (ERREXIT, NOUNSET, PIPEFAIL)', why: 'Activates safeguards', techDetail: 'Modifies shell internal signal trap and evaluation loop' },
        { step: 3, title: 'Control Flow & Loop Execution', desc: 'Bash parses AST (Abstract Syntax Tree) executing statements sequentially', why: 'Runs script logic', techDetail: 'Evaluates test constructs [[ ]] natively without spawning external test binary' },
      ],
      sandbox: {
        initialCommands: ['# Test a basic bash loop with strict mode\nbash -c "set -euo pipefail; for i in 1 2 3; do echo \\"Item: $i\\"; done"'],
        guidedSteps: [
          { instruction: 'Run a bash script with strict mode', command: 'bash -c "set -euo pipefail; echo \\"Strict mode active\\""', hint: 'Test set -euo pipefail' },
          { instruction: 'Test how unset variables fail with set -u', command: 'bash -c "set -u; echo \\$UNSET_VAR" 2>/dev/null; echo "Trapped with code $?"', hint: 'Notice non-zero exit code' },
        ],
        targetTask: 'Execute a bash loop using set -euo pipefail',
        solutionCommands: ['bash -c "set -euo pipefail; for i in 1 2 3; do echo \\"Item: $i\\"; done"'],
      },
      commonMistakes: [
        { mistake: 'Writing scripts without set -euo pipefail', whyWrong: 'Scripts will silently ignore failed commands, corrupting files or deploying broken builds unnoticed.', correctWay: 'Make set -euo pipefail the mandatory second line in 100% of your shell scripts.' },
        { mistake: 'Using legacy single brackets [ $VAR == "test" ] unquoted', whyWrong: 'If $VAR is empty, bash throws a syntax error "unary operator expected".', correctWay: 'Use modern double brackets [[ "$VAR" == "test" ]] which safely handle empty strings.' },
      ],
      challenge: {
        question: 'What is the specific danger that `set -u` protects against in bash scripts?',
        options: [
          { label: 'It causes the script to abort immediately if it encounters an unset or unassigned variable, preventing disasters like `rm -rf "${DIR}/"*`', isCorrect: true, explanation: 'If DIR is empty/unset, set -u halts execution before rm can wipe the root filesystem.' },
          { label: 'It prevents unauthorized users from running the script', isCorrect: false, explanation: 'set -u is an error-checking flag, not an access control system.' },
          { label: 'It automatically exports all variables to child processes', isCorrect: false, explanation: 'set -a exports variables; set -u prevents unbound variables.' },
          { label: 'It runs the script with root privileges', isCorrect: false, explanation: 'set -u does not alter execution privileges.' },
        ],
      },
      reference: {
        syntaxCheatSheet: ['#!/usr/bin/env bash', 'set -euo pipefail', 'if [[ "$1" == "val" ]]; then ... fi', 'for x in "${list[@]}"; do ... done', 'case "$x" in a) ... ;; esac'],
        bestPractices: [
          'Use local keyword for all variables inside functions to prevent polluting global scope',
          'Run shellcheck on your scripts to automatically catch 50+ common syntax and safety bugs',
        ],
      },
    },
  ],
};
