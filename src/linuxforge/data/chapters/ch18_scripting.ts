import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 18: SHELL SCRIPTING FUNDAMENTALS (18.1 to 18.17)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_18: LinuxTopic = {
  id: 'ch-18',
  number: '18',
  title: 'Shell Scripting Fundamentals',
  iconName: 'Code',
  description: 'Master enterprise Bash scripting: shebangs (#!/bin/bash), positional parameters ($1, $@), test operators ([ vs [[), loops, functions, exit codes, traps, subshells, arrays, and debugging (bash -x).',
  concepts: [
    buildLinuxConcept({
      id: 'c-18-01',
      subChapterNumber: '18.1',
      command: 'cat << \'EOF\' > /tmp/hello.sh && chmod +x /tmp/hello.sh && /tmp/hello.sh',
      title: 'What is a Shell Script?',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Executable text files containing sequences of shell commands interpreted by the kernel',
      badges: ['Scripting', 'Automation', 'Core'],
      difficulty: 'Beginner',
      quote: 'A shell script is an automated checklist that never gets tired, never skips a step, and executes in milliseconds.',
      whatIsIt: 'A shell script is an executable plain-text file containing a sequence of commands for a Linux shell (such as Bash, sh, or Zsh) to execute. Rather than typing 20 individual commands into a terminal one by one to deploy a service or perform a backup, a script packages these commands into a single repeatable, automated program. Shell scripts excel at gluing together independent Linux command-line utilities (grep, awk, curl, systemctl, tar) into cohesive automated workflows.',
      inSimpleWords: 'A recipe card for your computer. You write down all the steps once in a text file, and whenever you want those steps performed, you tell Linux to run the file.',
      whyDoYouNeedIt: 'Shell scripting is the foundation of DevOps automation. CI/CD pipelines, container entrypoint scripts (entrypoint.sh), system maintenance cron jobs, and cloud-init server bootstrap routines are written in shell scripts.',
      realWorldScenario: 'Every night at 2:00 AM, you need to dump a PostgreSQL database, compress the file with gzip, upload it to an AWS S3 bucket, and send a Slack notification. A 20-line bash script automates this completely without human intervention.',
      realWorldAnalogy: 'Writing a checklist for an airplane pilot: instead of trying to remember 50 instrument toggles from memory, the pilot follows the checklist step by step.',
      withoutVsWith: {
        without: {
          title: 'Manual Repetitive Administration',
          items: ['Typing the same 15 commands by hand for every server deployment', 'Human typing errors during high-stress outages causing accidental downtime', 'Inability to schedule complex multi-step procedures overnight'],
          outcome: 'Human error, operational fatigue, and high maintenance costs.'
        },
        with: {
          title: 'Automated Shell Scripting',
          items: ['100% repeatable, deterministic execution with identical results every time', 'Self-documenting operational procedures checked into Git repositories', 'Autonomous overnight execution via systemd timers and cron jobs'],
          outcome: 'Flawless automation, rapid deployments, and zero human operational toil.'
        }
      },
      blockDiagram: {
        title: 'Shell Script Execution Architecture',
        subtitle: 'From text file to kernel process execution:',
        nodes: [
          { id: 'file', label: '1. Script File (script.sh)', simpleDef: 'Plain text commands', techDef: 'Text file with #!/bin/bash header and execution bit (chmod +x)', badge: 'Source', color: '#38bdf8' },
          { id: 'kernel', label: '2. Kernel execve()', simpleDef: 'Reads the shebang', techDef: 'Kernel parses magic bytes "#!" and spawns /bin/bash binary', badge: 'Kernel', color: '#10b981' },
          { id: 'subshell', label: '3. Child Subshell Process', simpleDef: 'Dedicated Bash instance', techDef: 'Isolated bash process parses syntax, runs commands sequentially', badge: 'Interpreter', color: '#a855f7' },
          { id: 'exit', label: '4. Exit Code ($?)', simpleDef: 'Returns 0 for success', techDef: 'Sets exit status code (0 = success, 1-255 = error) back to parent', badge: 'Status', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Script', simple: 'A text file containing Linux commands to be run automatically.', technical: 'Interpreted program executed line-by-line by a command language interpreter.' },
        { term: 'Interpreter', simple: 'The program (like /bin/bash) that reads and runs the lines in your script.', technical: 'Executable responsible for parsing syntax and managing runtime state.' }
      ],
      syntaxCode: 'cat << \'EOF\' > /tmp/hello.sh && chmod +x /tmp/hello.sh && /tmp/hello.sh',
      syntaxTokens: [
        { token: 'cat << \'EOF\' > /tmp/hello.sh', role: 'command', explanation: 'Create script file using a heredoc block' },
        { token: '&&', role: 'operator', explanation: 'Execute next command if previous succeeded' },
        { token: 'chmod +x /tmp/hello.sh', role: 'command', explanation: 'Grant execute permissions on the script' },
        { token: '/tmp/hello.sh', role: 'path', explanation: 'Execute the newly created script' }
      ],
      variations: [
        { command: 'bash script.sh', description: 'Run script directly via bash interpreter without needing execute permissions' },
        { command: './script.sh', description: 'Run executable script from current directory using its embedded shebang' }
      ],
      expectedOutput: 'Hello, CommitForge Linux Engineer!',
      commonMistakes: [
        { mistake: 'Trying to run "./script.sh" without granting execute permissions first', whyWrong: 'Linux prevents execution by default, returning "bash: ./script.sh: Permission denied".', correctWay: 'Run "chmod +x script.sh" before running directly.' },
        { mistake: 'Editing shell scripts on Windows and getting "^M: bad interpreter" errors', whyWrong: 'Windows uses CRLF line endings; Linux requires LF. The hidden carriage return \\r breaks the shebang.', correctWay: 'Convert line endings to Unix LF using "dos2unix script.sh" or inside your code editor.' }
      ],
      safeRecovery: 'If a script throws "^M: bad interpreter", fix line endings with "sed -i \'s/\\r$//\' script.sh" or "dos2unix script.sh".'
    }),

    buildLinuxConcept({
      id: 'c-18-02',
      subChapterNumber: '18.2',
      command: 'head -n 1 /etc/profile',
      title: 'The Shebang Line (#!/bin/bash vs #!/bin/sh)',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'The magic 2-byte header: kernel interpreter resolution, portability, and bashisms',
      badges: ['Shebang', 'Bash', 'POSIX', 'sh'],
      difficulty: 'Beginner',
      quote: 'The shebang is not a comment to the kernel: "#!" is magic bytes 0x23 0x21 telling the operating system what binary to launch.',
      whatIsIt: 'The very first line of an executable script must begin with a Shebang (or Hashbang: "#!"). When you run "./script.sh", the kernel\'s execve() system call reads the first two bytes (0x23 0x21). If it detects "#!", it halts binary execution and instead spawns the interpreter path specified on that line (e.g. #!/bin/bash), passing the script path as an argument. Crucially, "#!/bin/sh" points to a strict POSIX-compatible shell (dash on Ubuntu), which lacks modern Bash features ("bashisms" like [[ ]], arrays, and <<<).',
      inSimpleWords: 'The instruction manual on page 1. It tells Linux: "Do not try to run this as machine code; open it using the Bash program located at /bin/bash."',
      whyDoYouNeedIt: 'If you write advanced Bash features (arrays, regex match [[ =~ ]]) but use "#!/bin/sh", your script will crash with syntax errors on Ubuntu because /bin/sh is Dash, not Bash.',
      realWorldScenario: 'A developer writes a deployment script using Bash arrays and tests it on macOS. In production on Ubuntu, it crashes with "Syntax error: \'(\' unexpected" because the shebang was set to "#!/bin/sh" instead of "#!/bin/bash".',
      realWorldAnalogy: 'Specifying the language of a document at the top of the page so the translator knows whether to use their English, French, or Spanish dictionary.',
      withoutVsWith: {
        without: {
          title: 'Missing or Inaccurate Shebang Line',
          items: ['Script runs using whatever random shell the caller happens to be using (zsh, dash, fish)', 'Mysterious syntax errors when Bash-specific syntax runs under strict POSIX dash', 'Script fails to execute directly when invoked via cron or systemd'],
          outcome: 'Unpredictable execution errors across different distributions.'
        },
        with: {
          title: 'Explicit, Intentional Shebang',
          items: ['Guaranteed execution under the exact intended interpreter binary (#!/bin/bash)', 'Portable environment resolution using #!/usr/bin/env bash across BSD/Linux', 'Zero ambiguity between strict POSIX scripts (#!/bin/sh) vs feature-rich Bash'],
          outcome: '100% deterministic, portable, and reliable script interpretation.'
        }
      },
      blockDiagram: {
        title: 'Shebang Resolution Mechanics',
        subtitle: 'What happens inside kernel execve():',
        nodes: [
          { id: 'magic', label: 'Magic Bytes: 0x23 0x21 ("#!")', simpleDef: 'Kernel detects script', techDef: 'sys_execve inspects first 2 bytes of file header', badge: 'Magic Number', color: '#ef4444' },
          { id: 'path', label: 'Path: /bin/bash', simpleDef: 'Target Interpreter', techDef: 'Kernel parses absolute path up to newline \\n', badge: 'Interpreter', color: '#38bdf8' },
          { id: 'exec', label: 'Executes: /bin/bash ./script.sh', simpleDef: 'Spawns interpreter', techDef: 'Kernel launches /bin/bash with script as argv[1]', badge: 'Process', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'Shebang (#!)', simple: 'The first two characters on line 1 of a script telling Linux which program to run it with.', technical: 'Magic byte sequence 0x23 0x21 parsed by kernel binfmt_script handler.' },
        { term: 'Bashism', simple: 'A non-standard command or syntax that only works in Bash, not in basic POSIX sh.', technical: 'Syntax extensions exclusive to GNU Bash (e.g. [[ ]], arrays, process substitution).' }
      ],
      syntaxCode: 'head -n 1 /etc/profile',
      syntaxTokens: [
        { token: 'head -n 1', role: 'command', explanation: 'Read and display the very first line of the file' },
        { token: '/etc/profile', role: 'path', explanation: 'System-wide startup script to inspect' }
      ],
      variations: [
        { command: 'head -n 1 /etc/profile', description: 'Inspect shebang line of system profile script' },
        { command: 'which bash', description: 'Verify absolute path to bash binary on the system (usually /bin/bash or /usr/bin/bash)' }
      ],
      expectedOutput: '# /etc/profile: system-wide .profile file for the Bourne shell (sh(1))',
      commonMistakes: [
        { mistake: 'Putting a blank line or a comment before the shebang line', whyWrong: 'The shebang MUST be on the absolute first two bytes of line 1; if it is on line 2, the kernel treats it as a comment.', correctWay: 'Ensure "#!/bin/bash" starts at line 1, column 1 with no preceding lines or spaces.' },
        { mistake: 'Using "#!/bin/sh" and using modern bash arrays or [[ ]]', whyWrong: 'On Debian/Ubuntu, /bin/sh points to dash, which does not support arrays or [[ ]], causing syntax crashes.', correctWay: 'Always use "#!/bin/bash" or "#!/usr/bin/env bash" when writing Bash scripts.' }
      ],
      safeRecovery: 'Use "#!/usr/bin/env bash" for maximum cross-platform portability across Linux, macOS, and FreeBSD.'
    }),

    buildLinuxConcept({
      id: 'c-18-03',
      subChapterNumber: '18.3',
      command: 'chmod +x script.sh',
      title: 'Making Scripts Executable (chmod +x)',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'The execution bit: granting the kernel permission to invoke files as binary programs',
      badges: ['chmod', 'Permissions', 'Execution'],
      difficulty: 'Beginner',
      quote: 'Linux does not care about file extensions: a .sh file is just dead text until you grant it the +x execute bit.',
      whatIsIt: 'In Linux, file extensions (like .sh, .py, or .exe) are purely human-readable conventions; the operating system kernel completely ignores them. A file cannot be executed directly as a program (e.g. "./script.sh") unless its inode has the "execute" permission bit ("x") enabled. Running "chmod +x <script>" flips this bit, instructing the kernel that this file is authorized to be loaded and executed by execve().',
      inSimpleWords: 'Turning the ignition key. Without the "+x" permission, Linux treats your script like a static reading book. Once you give it "+x", Linux treats it like a real software application.',
      whyDoYouNeedIt: 'Every new script you create with touch, nano, or vim starts with default 644 (read/write only) permissions. You must make it executable before running it in production or cron.',
      realWorldScenario: 'You pull a new deployment script from a Git repository onto a production server. You type "./deploy.sh" and receive "Permission denied". Running "chmod +x deploy.sh" unlocks execution immediately.',
      realWorldAnalogy: 'Getting a driver\'s license: you may have a car in the garage (the script), but you cannot legally drive it on the road until you get the license (+x bit).',
      withoutVsWith: {
        without: {
          title: 'Unexecutable Text File (-rw-r--r--)',
          items: ['Direct execution fails with "bash: ./script.sh: Permission denied"', 'Cannot be triggered directly by systemd service ExecStart directives', 'Fails when scheduled inside crontab'],
          outcome: 'Failed automation and permission errors.'
        },
        with: {
          title: 'Executable Program (-rwxr-xr-x)',
          items: ['Direct execution by typing "./script.sh"', 'Seamless invocation by systemd, cron, and CI/CD pipelines', 'Behaves identically to compiled C binaries on the system'],
          outcome: 'Fully autonomous executable program.'
        }
      },
      blockDiagram: {
        title: 'chmod +x Permission Transformation',
        subtitle: 'Flipping the execution bits on the file inode:',
        nodes: [
          { id: 'before', label: 'Before: -rw-r--r-- (644)', simpleDef: 'Read & Write Only', techDef: 'Execute bit 0; kernel sys_execve returns EACCES (Permission Denied)', badge: 'Blocked', color: '#ef4444' },
          { id: 'chmod', label: 'chmod +x script.sh', simpleDef: 'Flips execution bit', techDef: 'Invokes chmod() syscall modifying st_mode on inode', badge: 'Command', color: '#38bdf8' },
          { id: 'after', label: 'After: -rwxr-xr-x (755)', simpleDef: 'Executable Program', techDef: 'Execute bit 1; kernel permits execution via shebang interpreter', badge: 'Executable', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'chmod +x', simple: 'A command that gives everyone permission to run this file as a program.', technical: 'Adds the execute mode bit (S_IXUSR | S_IXGRP | S_IXOTH) to target file permissions.' },
        { term: 'Permission Denied', simple: 'An error meaning you are trying to run a file that doesn\'t have the execute bit set.', technical: 'EACCES error returned by the kernel when execve() is invoked on a non-executable file.' }
      ],
      syntaxCode: 'chmod +x script.sh',
      syntaxTokens: [
        { token: 'chmod', role: 'command', explanation: 'Change file mode bits (permissions)' },
        { token: '+x', role: 'option', explanation: 'Add execute permission flag for user, group, and others' },
        { token: 'script.sh', role: 'path', explanation: 'Target shell script filename' }
      ],
      variations: [
        { command: 'chmod +x script.sh', description: 'Grant execute permission to user, group, and world' },
        { command: 'chmod 755 script.sh', description: 'Explicit octal mode: rwx for owner, r-x for group and others' },
        { command: 'chmod u+x script.sh', description: 'Grant execute permission ONLY to the file owner (user)' }
      ],
      expectedOutput: '(chmod executes silently upon success; verify with "ls -l script.sh")',
      commonMistakes: [
        { mistake: 'Running "chmod 777 script.sh" thinking it is required to run the script', whyWrong: '777 makes the script world-writable; any untrusted local user can modify your script and inject malware.', correctWay: 'Use "chmod 755" or "chmod +x" instead of dangerous 777.' },
        { mistake: 'Trying to run "script.sh" without "./" when it is in the current directory', whyWrong: 'Linux does not search the current directory for security reasons; it will say "command not found".', correctWay: 'Type "./script.sh" to explicitly tell the shell to look in the current folder.' }
      ],
      safeRecovery: 'If you want to run a script temporarily without changing its permissions, invoke it through bash: "bash script.sh".'
    }),

    buildLinuxConcept({
      id: 'c-18-04',
      subChapterNumber: '18.4',
      command: 'echo "$0 is running"',
      title: 'Script Variables and Positional Parameters ($0, $1, $#, $@)',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Capturing command line arguments: $0 (script name), $1-$9 (arguments), $# (count), and $@ (all args)',
      badges: ['Parameters', 'Arguments', 'CLI'],
      difficulty: 'Beginner',
      quote: 'Positional parameters make scripts reusable: write one backup script and pass different database names as $1.',
      whatIsIt: 'When a shell script is executed with command line arguments (e.g. "./backup.sh mysql production"), the shell automatically populates special Positional Parameters: 1) "$0" holds the name or path of the script itself; 2) "$1", "$2", "$3"... hold the individual positional arguments; 3) "$#" holds the total count of passed arguments; 4) "$@" expands to all arguments as separate quoted words ("$1" "$2"...); and 5) "$*" expands to all arguments merged into a single string.',
      inSimpleWords: 'How a script accepts inputs. When you run "./deploy.sh web 3", $1 becomes "web", $2 becomes "3", and $# tells you that 2 arguments were provided.',
      whyDoYouNeedIt: 'Without arguments, you would have to write 50 separate hardcoded scripts for 50 servers. Positional parameters let you write one smart script that adapts to whatever input you give it.',
      realWorldScenario: 'You write a user creation script "create_user.sh". You run "./create_user.sh alice developers". The script reads $1 ("alice") and $2 ("developers") to create the account and assign group memberships automatically.',
      realWorldAnalogy: 'Filling in the blanks on a pre-printed tax form: the form structure is identical for everyone, but the names and numbers change based on what you write in the boxes.',
      withoutVsWith: {
        without: {
          title: 'Hardcoded Rigid Scripts',
          items: ['Creating 20 duplicate scripts for 20 different servers or environments', 'Need to open a text editor every time you want to change an IP or target filename', 'Zero flexibility for integration into automated CI/CD pipelines'],
          outcome: 'Code duplication, high maintenance overhead, and brittle automation.'
        },
        with: {
          title: 'Dynamic Parameterized Scripts',
          items: ['Single reusable script accepting dynamic targets via arguments ($1, $2)', 'Argument validation: verify argument counts using "if [ $# -lt 2 ]"', 'Safe loop processing over all arguments using "for arg in \"$@\""'],
          outcome: 'Clean, reusable, and DRY (Don\'t Repeat Yourself) automation.'
        }
      },
      blockDiagram: {
        title: 'Positional Parameter Mapping',
        subtitle: 'How arguments map when running "./backup.sh mysql prod 5":',
        nodes: [
          { id: 'zero', label: '$0: "./backup.sh"', simpleDef: 'Script Name', techDef: 'Command invocation name / path', badge: '$0', color: '#38bdf8' },
          { id: 'one', label: '$1: "mysql"', simpleDef: 'First Argument', techDef: 'First positional parameter', badge: '$1', color: '#10b981' },
          { id: 'two', label: '$2: "prod"', simpleDef: 'Second Argument', techDef: 'Second positional parameter', badge: '$2', color: '#a855f7' },
          { id: 'three', label: '$3: "5"', simpleDef: 'Third Argument', techDef: 'Third positional parameter', badge: '$3', color: '#f59e0b' },
          { id: 'meta', label: '$#: 3  |  $@: all args', simpleDef: 'Count & All Items', techDef: '$# = 3 total arguments; "$@" preserves word boundaries', badge: 'Metadata', color: '#ec4899' }
        ]
      },
      terms: [
        { term: 'Positional Parameter', simple: 'Variables numbered $1, $2, $3 holding the words you typed after the script name.', technical: 'Special shell parameters assigned from command-line arguments upon invocation.' },
        { term: '"$@" vs "$*"', simple: '"$@" keeps words separate ("arg 1" "arg 2"); "$*" mashes them into one string.', technical: '"$@" expands to separate positional parameters; "$*" expands to a single string separated by IFS.' }
      ],
      syntaxCode: 'echo "$0 is running"',
      syntaxTokens: [
        { token: 'echo', role: 'command', explanation: 'Print text to terminal' },
        { token: '"$0 is running"', role: 'argument', explanation: 'String expanding $0 (name of the currently running script or shell)' }
      ],
      variations: [
        { command: 'echo "Script: $0, First arg: $1, Total args: $#"', description: 'Display script name, first parameter, and total parameter count' },
        { command: 'for arg in "$@"; do echo "Arg: $arg"; done', description: 'Iterate safely over all passed arguments preserving spaces' },
        { command: 'shift', description: 'Pop and discard $1, shifting $2 into $1, $3 into $2, and so on' }
      ],
      expectedOutput: 'bash is running',
      commonMistakes: [
        { mistake: 'Accessing arguments past 9 without curly braces (e.g. $10)', whyWrong: 'Bash parses $10 as "$1" followed by a literal "0"! For arguments 10 and above, you must use curly braces.', correctWay: 'Use "${10}", "${11}" for parameters past 9.' },
        { mistake: 'Using unquoted $@ instead of "$@"', whyWrong: 'Unquoted $@ splits arguments containing spaces into multiple broken pieces.', correctWay: 'ALWAYS double-quote "$@" to preserve whitespace inside arguments.' }
      ],
      safeRecovery: 'Always validate arguments at the top of scripts: "[ $# -eq 0 ] && { echo \"Usage: $0 <target>\"; exit 1; }".'
    }),

    buildLinuxConcept({
      id: 'c-18-05',
      subChapterNumber: '18.5',
      command: 'read -p "Enter environment: " ENV',
      title: 'User Input (read)',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Interactive scripting: prompts (-p), silent password entry (-s), and read timeouts (-t)',
      badges: ['read', 'Input', 'Interactive'],
      difficulty: 'Beginner',
      quote: 'The read builtin turns scripts into conversations: ask the user for input, capture passwords silently, or set timeout limits.',
      whatIsIt: 'The "read" shell builtin reads a single line of text from standard input (the keyboard) and splits the words into shell variables. It is the primary mechanism for creating interactive setup scripts. Key options include: "-p" (displays a prompt message before reading), "-s" (silent mode: suppresses terminal echo, mandatory when prompting for passwords), "-t <seconds>" (timeout: proceeds with defaults if user does not answer within N seconds), and "-r" (raw mode: prevents backslashes from acting as escape characters).',
      inSimpleWords: 'How a script asks you a question. It pauses, prints "What is your name?", waits for you to type your answer, and stores your answer in a variable.',
      whyDoYouNeedIt: 'Interactive installation wizards and safety confirmation dialogs ("Are you sure you want to delete production? [y/N]") rely on the read command.',
      realWorldScenario: 'You are writing an admin tool to reset customer passwords. You use "read -s -p \'Enter new password: \' PASS" so the password is never displayed on the screen where someone walking past could see it.',
      realWorldAnalogy: 'A bank ATM asking you to type your PIN on the keypad without displaying the numbers on the screen.',
      withoutVsWith: {
        without: {
          title: 'Non-Interactive Scripts with Hardcoded Input',
          items: ['Sensitive passwords typed in cleartext or visible in terminal command history', 'Accidental execution of destructive operations without a confirmation prompt', 'Scripts hanging indefinitely if input is expected but no human is present'],
          outcome: 'Security exposure and accidental destructive actions.'
        },
        with: {
          title: 'Interactive User Input with read',
          items: ['Secure silent password entry (-s) preventing screen shoulder-surfing', 'Interactive confirmation safeguards ("Type YES to proceed")', 'Automated timeout fallbacks (-t 10) preventing scripts from hanging forever'],
          outcome: 'Safe interactive wizards and protected credential handling.'
        }
      },
      blockDiagram: {
        title: 'read Flags Anatomy',
        subtitle: 'The essential flags for the read builtin:',
        nodes: [
          { id: 'p', label: '-p "Prompt: "', simpleDef: 'Displays question', techDef: 'Prints prompt string to stderr before reading', badge: 'Prompt', color: '#38bdf8' },
          { id: 's', label: '-s (Silent)', simpleDef: 'Hides typed characters', techDef: 'Disables terminal echo (termios ECHO flag) for passwords', badge: 'Security', color: '#ef4444' },
          { id: 'r', label: '-r (Raw)', simpleDef: 'Preserves backslashes', techDef: 'Disables backslash escaping so paths like C:\\dir stay intact', badge: 'Raw', color: '#10b981' },
          { id: 't', label: '-t 10 (Timeout)', simpleDef: 'Timeout in seconds', techDef: 'Returns non-zero exit code if user does not answer in time', badge: 'Timeout', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'read', simple: 'A shell command that waits for the user to type something and saves it in a variable.', technical: 'Bash builtin reading one line from standard input and assigning fields to variables.' },
        { term: 'read -r', simple: 'Raw mode: always use "-r" to stop backslashes from disappearing in your input.', technical: 'Disables backslash escape interpretation during line reading.' }
      ],
      syntaxCode: 'read -p "Enter environment: " ENV',
      syntaxTokens: [
        { token: 'read', role: 'command', explanation: 'Read a line from standard input' },
        { token: '-p "Enter environment: "', role: 'option', explanation: 'Output prompt string without trailing newline before reading' },
        { token: 'ENV', role: 'argument', explanation: 'Target variable name where input text will be stored' }
      ],
      variations: [
        { command: 'read -r -p "Enter username: " USERNAME', description: 'Prompt user safely in raw mode' },
        { command: 'read -s -p "Enter Secret Password: " PASSWORD', description: 'Prompt for sensitive password with keyboard echo suppressed' },
        { command: 'read -t 5 -p "Proceed? (y/n): " CONFIRM || CONFIRM="n"', description: 'Prompt with 5-second timeout; defaults to "n" if unanswered' }
      ],
      expectedOutput: '(read waits interactively for keyboard input)',
      commonMistakes: [
        { mistake: 'Omitting "-r" when reading file paths with read', whyWrong: 'Without "-r", backslashes in input will be eaten as escape characters, corrupting paths.', correctWay: 'Make "read -r" your default habit whenever using read.' },
        { mistake: 'Forgetting to print a newline after "read -s"', whyWrong: 'Silent mode does not echo Enter; subsequent terminal output will appear glued to the same line.', correctWay: 'Add "echo" immediately after "read -s" to print a clean newline.' }
      ],
      safeRecovery: 'If a script freezes waiting on read, press Ctrl+C to cancel execution and return to the shell.'
    }),

    buildLinuxConcept({
      id: 'c-18-06',
      subChapterNumber: '18.6',
      command: 'if [ 1 -eq 1 ]; then echo "True"; fi',
      title: 'Conditional Statements: if, elif, else',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Branching logic: making decisions based on command exit codes and test evaluations',
      badges: ['Conditionals', 'if/else', 'Logic'],
      difficulty: 'Beginner',
      quote: 'In Bash, "if" does not evaluate true or false: it checks whether a command succeeded with exit code 0.',
      whatIsIt: 'Conditional statements in Bash allow scripts to make intelligent decisions and branch execution paths. Crucially, the "if" statement in Bash does not evaluate boolean expressions like Python or C; instead, it executes a command and tests its Exit Status Code ($?). If the command exits with 0 (success), the "then" block executes; if it returns non-zero (failure), execution jumps to "elif", "else", or finishes at "fi".',
      inSimpleWords: 'A fork in the road for your script. "If the file exists, copy it. Else, show an error message."',
      whyDoYouNeedIt: 'Real-world servers encounter unexpected conditions: full disks, missing files, or network drops. Conditional logic allows scripts to handle errors gracefully instead of crashing blindly.',
      realWorldScenario: 'You are writing an automated backup script. You use "if ping -c 1 backup-server >/dev/null; then rsync ...; else echo \'Backup server offline\' >&2; exit 1; fi" to verify network connectivity before starting a transfer.',
      realWorldAnalogy: 'Checking the weather before leaving your house: if it is raining, take an umbrella; else, wear sunglasses.',
      withoutVsWith: {
        without: {
          title: 'Linear Unconditional Scripts',
          items: ['Scripts blindly attempt operations that are doomed to fail (e.g. mounting unplugged disks)', 'Cascading catastrophic errors: deleting files after a failed backup step', 'Zero error handling or diagnostic feedback to operators'],
          outcome: 'Unreliable, dangerous scripts that fail unpredictably.'
        },
        with: {
          title: 'Defensive Conditional Branching',
          items: ['Pre-flight validation: check prerequisites before running destructive steps', 'Graceful fallbacks: switch to secondary mirrors if primary download fails', 'Clear, actionable error logging and meaningful exit codes'],
          outcome: 'Resilient, self-healing, and enterprise-grade shell automation.'
        }
      },
      blockDiagram: {
        title: 'Bash if/elif/else Execution Flow',
        subtitle: 'Exit code branching logic:',
        nodes: [
          { id: 'if_cmd', label: 'if [ condition ]; then', simpleDef: 'Test condition', techDef: 'Executes command and evaluates exit code ($?)', badge: 'Condition', color: '#38bdf8' },
          { id: 'zero', label: 'Exit 0 (Success) -> "then"', simpleDef: 'Runs success block', techDef: 'Executes statements inside "then" branch', badge: 'True (0)', color: '#10b981' },
          { id: 'nonzero', label: 'Exit != 0 (Fail) -> "else"', simpleDef: 'Runs fallback block', techDef: 'Executes statements inside "elif" or "else" branch', badge: 'False (1+)', color: '#ef4444' },
          { id: 'fi', label: 'fi (End of statement)', simpleDef: 'Rejoins main script', techDef: 'Terminates if block ("if" spelled backwards)', badge: 'Close', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'Exit Code 0', simple: 'In Linux shells, 0 means SUCCESS (the opposite of C or Python!).', technical: 'POSIX exit status 0 indicates clean, error-free command termination.' },
        { term: 'fi', simple: 'The word used to close an "if" block in Bash ("if" spelled backwards).', technical: 'Closing reserved keyword for if conditional constructs.' }
      ],
      syntaxCode: 'if [ 1 -eq 1 ]; then echo "True"; fi',
      syntaxTokens: [
        { token: 'if', role: 'command', explanation: 'Conditional construct keyword' },
        { token: '[ 1 -eq 1 ]', role: 'argument', explanation: 'Test expression checking if integer 1 equals 1' },
        { token: '; then', role: 'operator', explanation: 'Delimiter followed by then keyword' },
        { token: 'echo "True"', role: 'command', explanation: 'Commands executed if test returns exit code 0' },
        { token: '; fi', role: 'operator', explanation: 'Closing delimiter for the if construct' }
      ],
      variations: [
        { command: 'if [ -f /etc/passwd ]; then echo "Found"; fi', description: 'Check if file exists and is a regular file' },
        { command: 'if grep -q "root" /etc/passwd; then echo "Found root"; fi', description: 'Direct command test: branches directly on grep\'s exit code without using brackets!' },
        { command: 'if [ $# -eq 0 ]; then echo "Missing arg"; exit 1; fi', description: 'Validate argument count at script start' }
      ],
      expectedOutput: 'True',
      commonMistakes: [
        { mistake: 'Forgetting the spaces inside brackets: if [1 -eq 1] or if [ 1 -eq 1]', whyWrong: '"[" is actually an executable command! It requires a space after "[" and before "]" to separate arguments.', correctWay: 'ALWAYS leave spaces: "if [ 1 -eq 1 ]; then".' },
        { mistake: 'Using "==" for number comparisons inside single brackets [ $A == 5 ]', whyWrong: 'Single brackets use "-eq" for numbers and "=" for strings; "==" can cause unexpected syntax errors in POSIX sh.', correctWay: 'Use "[ $A -eq 5 ]" for numbers, or switch to double brackets "[[ $A -eq 5 ]]".' }
      ],
      safeRecovery: 'Remember that you can test any command directly with if: "if ping -c 1 8.8.8.8; then ... fi" needs no brackets!'
    }),

    buildLinuxConcept({
      id: 'c-18-07',
      subChapterNumber: '18.7',
      command: '[ -f /etc/passwd ] && echo "File exists"',
      title: 'Test Operators: Strings, Numbers, Files (test, [ ], [[ ]])',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'The test expression matrix: file tests (-f, -d, -s), strings (-z, -n), numbers (-eq, -lt), and modern [[ ]]',
      badges: ['test', 'Operators', 'Logic'],
      difficulty: 'Intermediate',
      quote: 'Single brackets [ ] are POSIX compatible; double brackets [[ ]] are modern Bash power with regex and no word-splitting bugs.',
      whatIsIt: 'Testing conditions in shell scripts uses the "test" utility, also written as "[ expr ]", or modern Bash double brackets "[[ expr ]]". Three categories of test operators exist: 1) File tests: "-f" (regular file), "-d" (directory), "-e" (exists), "-s" (non-empty), "-r/-w/-x" (readable, writable, executable); 2) String tests: "-z" (string is empty), "-n" (string is not empty), "=" and "!=" (equality); 3) Numeric tests: "-eq" (equal), "-ne" (not equal), "-lt" (less than), "-gt" (greater than), "-le", "-ge". Modern "[[ ]]" adds regex matching ("=~") and prevents word-splitting crashes on empty variables.',
      inSimpleWords: 'The comparison symbols. You use them to check: "Does this folder exist?", "Is this password empty?", or "Is this number greater than 100?".',
      whyDoYouNeedIt: 'Defensive programming requires testing files before reading them and checking variables before using them to prevent script crashes.',
      realWorldScenario: 'Before attempting to parse an application configuration file, your startup script checks "if [[ -f /etc/app.conf && -s /etc/app.conf ]]" to confirm the file exists and is not 0 bytes.',
      realWorldAnalogy: 'Inspecting a piece of mail: checking if the envelope is sealed (-e), addressed to a real name (-n), and actually has a letter inside (-s).',
      withoutVsWith: {
        without: {
          title: 'Using Fragile Single Brackets [ ]',
          items: ['Script crashes with "[: too many arguments" if a string variable contains spaces', 'Empty variables cause syntax errors: "[ $VAR = "test" ]" becomes "[ = "test" ]"', 'No native regular expression matching support'],
          outcome: 'Fragile scripts that break on unexpected input.'
        },
        with: {
          title: 'Using Modern Double Brackets [[ ]]',
          items: ['No word-splitting crashes on spaces or empty variables even when unquoted', 'Native regex matching using the "=~" operator (e.g. [[ $IP =~ ^[0-9.]+$ ]])', 'Logical AND (&&) and OR (||) supported cleanly inside the brackets'],
          outcome: 'Robust, crash-proof, and modern Bash logic.'
        }
      },
      blockDiagram: {
        title: 'Core Test Operators Cheat Sheet',
        subtitle: 'The essential test flags every engineer must know:',
        nodes: [
          { id: 'f', label: '-f / -d / -s', simpleDef: 'File Tests', techDef: '-f: regular file, -d: directory, -s: file size > 0 bytes', badge: 'Files', color: '#38bdf8' },
          { id: 'z', label: '-z / -n', simpleDef: 'String Tests', techDef: '-z: string length is 0 (empty), -n: string length > 0 (not empty)', badge: 'Strings', color: '#10b981' },
          { id: 'eq', label: '-eq / -lt / -gt', simpleDef: 'Number Tests', techDef: 'Integer comparisons: -eq (equal), -lt (less), -gt (greater)', badge: 'Numbers', color: '#a855f7' },
          { id: 'regex', label: '=~ (Regex)', simpleDef: 'Pattern Match (in [[ ]])', techDef: 'POSIX Extended Regular Expression evaluation within [[ ]]', badge: 'Regex', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: '-z "$VAR"', simple: 'Checks if a variable is completely empty or undefined.', technical: 'True if string length is zero (empty string test).' },
        { term: '[[ $STR =~ regex ]]', simple: 'Checks if a string matches a regular expression pattern.', technical: 'Bash conditional command executing regex match; submatches stored in BASH_REMATCH array.' }
      ],
      syntaxCode: '[ -f /etc/passwd ] && echo "File exists"',
      syntaxTokens: [
        { token: '[ -f /etc/passwd ]', role: 'command', explanation: 'Test expression checking if /etc/passwd exists and is a regular file' },
        { token: '&&', role: 'operator', explanation: 'Short-circuit AND operator: execute right side only if left test succeeds' },
        { token: 'echo "File exists"', role: 'command', explanation: 'Output confirmation message' }
      ],
      variations: [
        { command: '[ -d /var/log ] && echo "Directory exists"', description: 'Test if path exists and is a directory' },
        { command: '[ -z "$UNSET_VAR" ] && echo "Variable is empty"', description: 'Test if a variable is empty or undefined' },
        { command: '[[ "192.168.1.1" =~ ^[0-9]+ ]] && echo "Matches IP pattern"', description: 'Regular expression matching inside modern double brackets' }
      ],
      expectedOutput: 'File exists',
      commonMistakes: [
        { mistake: 'Using "<" or ">" for numeric comparisons inside single brackets: [ $A < 10 ]', whyWrong: 'In single brackets, "<" is interpreted as shell file redirection, corrupting or creating files on disk!', correctWay: 'Use "-lt" and "-gt" in single brackets, or use "(( A < 10 ))" for arithmetic.' },
        { mistake: 'Forgetting to quote variables in single brackets: [ -z $VAR ]', whyWrong: 'If $VAR is unset, the command expands to "[ -z ]" which evaluates to TRUE incorrectly!', correctWay: 'Always double quote: "[ -z \"$VAR\" ]" or use "[[ -z $VAR ]]".' }
      ],
      safeRecovery: 'Use double brackets "[[ ... ]]" whenever writing Bash scripts to eliminate 90% of variable quoting bugs.'
    }),

    buildLinuxConcept({
      id: 'c-18-08',
      subChapterNumber: '18.8',
      command: 'for i in 1 2 3; do echo "Node-$i"; done',
      title: 'Loops: for Loops',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Iterating over collections: list iteration, brace expansions ({1..10}), C-style loops, and globbing',
      badges: ['Loops', 'for', 'Iteration'],
      difficulty: 'Beginner',
      quote: 'A for loop turns 1 operation into 1,000: iterate over server lists, files, or numbers in 3 lines of code.',
      whatIsIt: 'The "for" loop in Bash iterates over a list of items, executing the code block between "do" and "done" once for each element. Bash supports multiple for-loop syntaxes: 1) Word list iteration: "for item in $LIST; do ...; done"; 2) Integer brace expansion: "for i in {1..10}; do ...; done"; 3) Filename globbing: "for file in /var/log/*.log; do ...; done"; and 4) C-style arithmetic loops: "for ((i=0; i<10; i++)); do ...; done".',
      inSimpleWords: 'Repeat this action for each item in my list. "For every server in my list, ping it." "For every picture in this folder, make a backup."',
      whyDoYouNeedIt: 'Batch operations are the bread and butter of DevOps. Renaming 500 files, pinging 30 IP addresses, or restarting 10 Docker containers is accomplished with a simple for loop.',
      realWorldScenario: 'You need to check if 10 microservices are healthy. You run: "for port in 8080 8081 8082 8083; do nc -zv localhost $port; done" to test all 10 endpoints in 2 seconds.',
      realWorldAnalogy: 'A postal delivery worker walking down a street: for every house on the block, place mail in the mailbox.',
      withoutVsWith: {
        without: {
          title: 'Copy-Pasting Commands Repeatedly',
          items: ['Typing the same command 50 times with slightly different file names or numbers', 'Editing 50 lines by hand whenever a parameter changes', 'High likelihood of missing an item or introducing typos'],
          outcome: 'Repetitive strain, high error rate, and slow execution.'
        },
        with: {
          title: 'Automated Iteration with for Loops',
          items: ['Single concise 3-line loop processing hundreds of items automatically', 'Brace expansion ({1..100}) for generating numerical sequences instantly', 'Safe filename globbing processing files without command substitution subshells'],
          outcome: 'Massive time savings, zero typos, and automated batch processing.'
        }
      },
      blockDiagram: {
        title: 'for Loop Execution Flow',
        subtitle: 'Iteration through an element list:',
        nodes: [
          { id: 'init', label: 'for item in A B C', simpleDef: 'List of items', techDef: 'Assigns next element from word list to variable $item', badge: 'List', color: '#38bdf8' },
          { id: 'body', label: 'do ... done', simpleDef: 'Action block', techDef: 'Executes commands using current value of $item', badge: 'Loop Body', color: '#10b981' },
          { id: 'next', label: 'More items left?', simpleDef: 'Check remaining', techDef: 'If items remain -> loop; if exhausted -> proceed to next line', badge: 'Condition', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'Brace Expansion ({1..5})', simple: 'A fast way to generate a list of numbers or letters: {1..5} becomes "1 2 3 4 5".', technical: 'Early shell expansion generating arbitrary strings before parameter expansion.' },
        { term: 'Globbing in Loops', simple: 'Using "*.log" in a loop to process every log file in a folder.', technical: 'Pathname expansion matching filesystem dentries directly into the loop word list.' }
      ],
      syntaxCode: 'for i in 1 2 3; do echo "Node-$i"; done',
      syntaxTokens: [
        { token: 'for i in 1 2 3', role: 'command', explanation: 'Loop header declaring iterator variable "i" and items list' },
        { token: '; do', role: 'operator', explanation: 'Start of loop body block' },
        { token: 'echo "Node-$i"', role: 'command', explanation: 'Command executed for each iteration' },
        { token: '; done', role: 'operator', explanation: 'Closing delimiter for the for loop construct' }
      ],
      variations: [
        { command: 'for i in {1..5}; do echo "Count: $i"; done', description: 'Iterate through numerical range 1 to 5' },
        { command: 'for file in /var/log/*.log; do [ -f "$file" ] && gzip "$file"; done', description: 'Compress all .log files safely using filename globbing' },
        { command: 'for ((i=0; i<5; i++)); do echo "Index: $i"; done', description: 'C-style loop with initialization, condition, and increment' }
      ],
      expectedOutput: 'Node-1\nNode-2\nNode-3',
      commonMistakes: [
        { mistake: 'Parsing "ls" output in a for loop: for file in $(ls *.txt)', whyWrong: 'If any filename contains a space, newline, or glob character, the loop will break the filename into multiple broken pieces!', correctWay: 'Iterate over globs directly: "for file in *.txt; do".' },
        { mistake: 'Forgetting quotes around "$file" inside the loop body', whyWrong: 'Files with spaces will cause subsequent commands (e.g. rm $file) to treat each word as a separate file.', correctWay: 'Always double quote the loop variable: "rm \"$file\"".' }
      ],
      safeRecovery: 'If a for loop runs out of control or loops infinitely, press Ctrl+C to terminate execution immediately.'
    }),

    buildLinuxConcept({
      id: 'c-18-09',
      subChapterNumber: '18.9',
      command: 'while read line; do echo "$line"; done < /etc/issue',
      title: 'Loops: while and until Loops',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Condition-driven iteration: line-by-line file processing, infinite daemon loops, and until polling',
      badges: ['Loops', 'while', 'until', 'Files'],
      difficulty: 'Intermediate',
      quote: 'The while read loop is the universal data pipeline: stream gigabyte files line-by-line with zero memory bloat.',
      whatIsIt: 'While "for" loops iterate over known lists, "while" and "until" loops iterate based on dynamic conditions: 1) "while [ condition ]" executes as long as the condition returns exit code 0 (success); 2) "until [ condition ]" executes as long as the condition returns non-zero (fails), stopping the moment it succeeds; 3) The canonical "while IFS= read -r line; do ... done < file.txt" pattern is the industry standard for streaming and parsing text files line-by-line without loading the entire file into RAM.',
      inSimpleWords: '"Keep doing this until I say stop." A while loop keeps running as long as a condition is true (e.g. while the server is still booting, keep waiting).',
      whyDoYouNeedIt: 'Polling for asynchronous cloud events (waiting for an AWS EC2 instance to reach "running" state) or processing a 1-million-line CSV file requires a while loop.',
      realWorldScenario: 'You are waiting for a Kubernetes pod to become ready during a deployment script. You write: "until kubectl get pod my-app | grep -q Running; do sleep 2; done" to poll cleanly until ready.',
      realWorldAnalogy: 'Boiling water: keep checking the pot until bubbles appear; the moment bubbles appear, drop the pasta in.',
      withoutVsWith: {
        without: {
          title: 'Memory-Heavy File Reading',
          items: ['Reading 10GB files using "for line in $(cat file)" crashes the shell with Out-Of-Memory', 'Fixed arbitrary "sleep 60" pauses that waste time or fail if operations take 61 seconds', 'Unable to stream live incoming data from pipes'],
          outcome: 'OOM crashes, brittle timing races, and wasted deployment time.'
        },
        with: {
          title: 'Streaming with while read and Polling',
          items: ['Constant O(1) memory usage: stream multi-gigabyte log files line-by-line smoothly', 'Dynamic polling with "until": proceed the exact second a service is healthy', 'Infinite background daemon loops (while true; do work; sleep 5; done)'],
          outcome: 'Minimal memory footprint, zero wasted time, and robust cloud polling.'
        }
      },
      blockDiagram: {
        title: 'Streaming "while read" Architecture',
        subtitle: 'Memory-safe line-by-line streaming from file redirection:',
        nodes: [
          { id: 'file', label: 'Input File (data.txt)', simpleDef: 'Redirected at bottom (<)', techDef: 'Redirects file descriptor 0 to file', badge: 'Input Stream', color: '#38bdf8' },
          { id: 'read', label: 'read -r line', simpleDef: 'Pulls exactly 1 line', techDef: 'Reads bytes up to \\n into $line; returns 0 (EOF returns 1)', badge: 'Streamer', color: '#10b981' },
          { id: 'body', label: 'Process Line ($line)', simpleDef: 'Do work on current line', techDef: 'Executes loop body with minimal RAM usage', badge: 'Worker', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'while loop', simple: 'Repeats a block of code as long as the test condition remains successful (exit code 0).', technical: 'Evaluates command list condition before each iteration; executes body if status is 0.' },
        { term: 'until loop', simple: 'Repeats a block of code UNTIL the condition succeeds (runs while failing).', technical: 'Evaluates command list condition; executes body as long as status is non-zero.' }
      ],
      syntaxCode: 'while read line; do echo "$line"; done < /etc/issue',
      syntaxTokens: [
        { token: 'while read line', role: 'command', explanation: 'Execute read builtin; loop continues until end of file (EOF)' },
        { token: '; do', role: 'operator', explanation: 'Start of loop body' },
        { token: 'echo "$line"', role: 'command', explanation: 'Process the current line variable' },
        { token: '; done', role: 'operator', explanation: 'End of loop body' },
        { token: '< /etc/issue', role: 'path', explanation: 'Redirect file contents into loop standard input' }
      ],
      variations: [
        { command: 'while IFS= read -r line; do echo "$line"; done < file.txt', description: 'Production standard: preserve leading/trailing whitespace (IFS=) and raw backslashes (-r)' },
        { command: 'until ping -c 1 192.168.1.1 >/dev/null 2>&1; do sleep 1; done', description: 'Poll router until it comes online, then proceed immediately' },
        { command: 'while true; do date; sleep 2; done', description: 'Infinite daemon loop running every 2 seconds' }
      ],
      expectedOutput: 'Ubuntu 22.04.4 LTS \\n \\l',
      commonMistakes: [
        { mistake: 'Piping into while: "cat file | while read line; do COUNT=$((COUNT+1)); done"', whyWrong: 'Piping creates a subshell! When the loop finishes, the subshell dies and $COUNT is reset to 0 in parent!', correctWay: 'Redirect at the end of the loop: "while read line; do ...; done < file".' },
        { mistake: 'Creating a while loop without a sleep or exit condition', whyWrong: 'An unconstrained "while true; do ...; done" without sleep will consume 100% of a CPU core instantly.', correctWay: 'Always add "sleep 1" or a clear break condition inside polling loops.' }
      ],
      safeRecovery: 'If a while loop runs in an infinite loop, press Ctrl+C to terminate it immediately.'
    }),

    buildLinuxConcept({
      id: 'c-18-10',
      subChapterNumber: '18.10',
      command: 'case "$ENV" in prod) echo "Production";; *) echo "Unknown";; esac',
      title: 'Case Statements (Pattern Matching)',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Multi-branch pattern matching: clean alternatives to messy nested if/elif ladders',
      badges: ['case', 'Pattern Matching', 'Logic'],
      difficulty: 'Intermediate',
      quote: 'When an if/elif ladder reaches 5 branches, refactor to case: cleaner syntax, glob pattern matching, and effortless CLI flag parsing.',
      whatIsIt: 'The "case" statement in Bash provides multi-way branching by matching an expression against globbing patterns (e.g. *.tar.gz, [yY]*, prod|production). Instead of writing 10 consecutive "if [ \"$1\" = \"start\" ] ... elif [ \"$1\" = \"stop\" ]" blocks, a case statement evaluates the target word cleanly against each pattern clause, executing the commands under the first matching pattern until double semicolons (";;") are reached. "case" is universally used to parse command-line arguments ($1) and CLI flags.',
      inSimpleWords: 'A switchboard. If the user says "start", do this. If they say "stop", do that. If they say "restart", do something else. If they say anything else (*), show help.',
      whyDoYouNeedIt: 'System init scripts, CLI tool routers (docker, git subcommands), and menu systems are built around case statements to handle user input cleanly.',
      realWorldScenario: 'You are writing a service management CLI script "service.sh". A case statement parses $1: "start" launches the daemon, "stop" kills the PID, "status" queries systemctl, and "*" prints the help usage menu.',
      realWorldAnalogy: 'An automated phone menu: "Press 1 for Sales, Press 2 for Support, or press any other key to speak to the operator (*)".',
      withoutVsWith: {
        without: {
          title: 'Spaghetti if/elif Ladders',
          items: ['15 deeply nested if/elif statements that are difficult to read and maintain', 'Complex boolean checks repeated on every single branch', 'Higher chance of bracket spacing typos and syntax bugs'],
          outcome: 'Cluttered, unreadable scripts and difficult maintenance.'
        },
        with: {
          title: 'Clean Declarative case Statements',
          items: ['Elegant, structured pattern matching using intuitive syntax', 'Built-in support for multiple options using pipes: start|restart|reload)', 'Catch-all wildcard fallback: *) handling invalid user inputs gracefully'],
          outcome: 'Readable, professional, and easily maintainable CLI script routers.'
        }
      },
      blockDiagram: {
        title: 'case Statement Routing',
        subtitle: 'Pattern matching flow against user argument:',
        nodes: [
          { id: 'input', label: 'case "$1" in', simpleDef: 'Target input word', techDef: 'Evaluates word against pattern clauses sequentially', badge: 'Input', color: '#38bdf8' },
          { id: 'p1', label: 'start) ... ;;', simpleDef: 'Matches "start"', techDef: 'Executes start logic; ;; terminates evaluation', badge: 'Branch 1', color: '#10b981' },
          { id: 'p2', label: 'stop) ... ;;', simpleDef: 'Matches "stop"', techDef: 'Executes stop logic; ;; terminates evaluation', badge: 'Branch 2', color: '#a855f7' },
          { id: 'fall', label: '*) ... ;;', simpleDef: 'Wildcard fallback', techDef: 'Catches all unhandled inputs (displays usage instructions)', badge: 'Fallback', color: '#ef4444' }
        ]
      },
      terms: [
        { term: ';; (Double Semicolon)', simple: 'Tells Bash that this branch is finished and to exit the case statement.', technical: 'Terminator token indicating end of command list for the matching pattern clause.' },
        { term: 'esac', simple: 'The word that ends a case statement ("case" spelled backwards!).', technical: 'Closing reserved keyword for case conditional constructs.' }
      ],
      syntaxCode: 'case "$ENV" in prod) echo "Production";; *) echo "Unknown";; esac',
      syntaxTokens: [
        { token: 'case "$ENV" in', role: 'command', explanation: 'Target expression being evaluated against patterns' },
        { token: 'prod) echo "Production";;', role: 'argument', explanation: 'Pattern "prod" followed by commands and closing double semicolon' },
        { token: '*) echo "Unknown";;', role: 'argument', explanation: 'Wildcard fallback pattern matching any other string' },
        { token: 'esac', role: 'operator', explanation: 'Closing delimiter ("case" backwards)' }
      ],
      variations: [
        { command: 'case "$1" in start|run) echo "Starting";; stop) echo "Stopping";; *) echo "Usage: $0 {start|stop}";; esac', description: 'Standard multi-pattern CLI argument router' },
        { command: 'case "$ANSWER" in [yY]|[yY][eE][sS]) echo "Confirmed";; *) echo "Cancelled";; esac', description: 'Case-insensitive yes/no confirmation matcher' }
      ],
      expectedOutput: 'Unknown',
      commonMistakes: [
        { mistake: 'Forgetting the double semicolon ";;" at the end of a pattern branch', whyWrong: 'Omitting ";;" causes syntax error: "syntax error near unexpected token" when parsing the next pattern.', correctWay: 'Always end every pattern branch with ";;".' },
        { mistake: 'Omitting the catch-all wildcard pattern "*)"', whyWrong: 'If user enters unexpected input and there is no "*)" handler, the script exits silently without informing the user what valid commands exist.', correctWay: 'Always include a "*)" pattern that prints usage instructions and exits with code 1.' }
      ],
      safeRecovery: 'Always include "*)" at the bottom of case statements: "*) echo \"Usage: $0 {start|stop|status}\"; exit 1;;".'
    }),

    buildLinuxConcept({
      id: 'c-18-11',
      subChapterNumber: '18.11',
      command: 'my_func() { echo "Executed $1"; }; my_func "Hello"',
      title: 'Functions in Bash',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Modular code reuse: declaring functions, local variable scoping, and return codes',
      badges: ['Functions', 'Modularity', 'Scoping'],
      difficulty: 'Intermediate',
      quote: 'Functions make scripts modular and testable: encapsulate logic, isolate variables with "local", and return exit codes.',
      whatIsIt: 'Functions in Bash allow developers to group commands into named, reusable blocks that can be executed like standard commands. Defined using "func_name() { ... }", functions accept positional parameters ($1, $2) independently of the main script\'s arguments. Crucially, variables declared inside functions are global by default unless explicitly scoped with the "local" keyword. Functions return an integer status code (0-255) using "return <code >", or return string data by printing to stdout.',
      inSimpleWords: 'Mini-programs inside your script. Instead of copy-pasting the same 10 lines of logging or error-checking code five times, you put it in a function and call it by name.',
      whyDoYouNeedIt: 'Large production bash scripts (100+ lines) become unreadable spaghetti without functions. Encapsulating logging (log_info, log_error) and database queries keeps code clean and testable.',
      realWorldScenario: 'You are writing an automation script that interacts with an API. You create a helper function "log_msg() { echo \"[$(date +%T)] $1\"; }". Throughout your script, calling "log_msg \'Starting backup\'" generates standardized timestamped logs.',
      realWorldAnalogy: 'A shortcut button on a microwave: instead of manually typing temperature, power level, and time, you press "Popcorn" (the function).',
      withoutVsWith: {
        without: {
          title: 'Monolithic Copy-Pasted Code',
          items: ['Same 10 lines of error-checking duplicated 15 times across the script', 'Bug fixes require hunting down every copy-pasted instance and updating it', 'Global variable collisions: helper loops overwrite main loop counter variables'],
          outcome: 'Spaghetti code, accidental variable overwrites, and painful maintenance.'
        },
        with: {
          title: 'Modular Function Architecture',
          items: ['Reusable, single-responsibility functions (log_info, check_disk, send_alert)', 'Strict variable encapsulation using "local my_var" preventing global pollution', 'Independent parameter passing: function receives its own clean $1, $2 arguments'],
          outcome: 'DRY, professional, and easily testable shell automation.'
        }
      },
      blockDiagram: {
        title: 'Function Execution and Local Scoping',
        subtitle: 'Why "local" prevents catastrophic variable collisions:',
        nodes: [
          { id: 'global', label: 'Main Script: i=10', simpleDef: 'Global $i = 10', techDef: 'Global symbol table entry used by main control loop', badge: 'Global Scope', color: '#38bdf8' },
          { id: 'func', label: 'my_func() { local i=0; ... }', simpleDef: 'Local $i = 0', techDef: '"local" scopes $i to function stack frame only', badge: 'Function Stack', color: '#10b981' },
          { id: 'safe', label: 'After func: i is STILL 10!', simpleDef: 'Protected from overwrite', techDef: 'Function exit pops stack; global $i remains completely untouched', badge: 'Protected', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'local variable', simple: 'A variable created inside a function that vanishes when the function finishes.', technical: 'Restricts variable visibility and lifetime to the declaring function and its children.' },
        { term: 'return vs exit', simple: '"return" exits the function; "exit" kills the entire script completely.', technical: '"return" terminates function execution and sets $?; "exit" terminates the entire shell process.' }
      ],
      syntaxCode: 'my_func() { echo "Executed $1"; }; my_func "Hello"',
      syntaxTokens: [
        { token: 'my_func()', role: 'command', explanation: 'Function declaration name' },
        { token: '{ echo "Executed $1"; }', role: 'argument', explanation: 'Function body enclosed in curly braces' },
        { token: ';', role: 'operator', explanation: 'Command separator' },
        { token: 'my_func "Hello"', role: 'command', explanation: 'Function invocation passing "Hello" as $1' }
      ],
      variations: [
        { command: 'log_info() { echo "[INFO] $(date +%T): $1"; }', description: 'Standard reusable timestamped logging helper' },
        { command: 'check_root() { if [ "$EUID" -ne 0 ]; then echo "Must run as root" >&2; return 1; fi; }', description: 'Pre-flight check function returning exit status code' }
      ],
      expectedOutput: 'Executed Hello',
      commonMistakes: [
        { mistake: 'Forgetting the "local" keyword inside functions: my_func() { i=0; }', whyWrong: 'Without "local", "i" becomes global! If the outer script has "for i in {1..100}", the function will corrupt your loop counter.', correctWay: 'ALWAYS declare variables inside functions with "local var_name=value".' },
        { mistake: 'Trying to return a string using "return \'my_result\'"', whyWrong: '"return" only accepts numbers (0-255) for status codes; passing a string causes a numeric argument required error.', correctWay: 'Return data by printing with echo, and capture it with command substitution: RESULT=$(my_func).' }
      ],
      safeRecovery: 'Always declare variables inside functions with "local": "local my_var=\"value\"".'
    }),

    buildLinuxConcept({
      id: 'c-18-12',
      subChapterNumber: '18.12',
      command: 'exit 0',
      title: 'Exit Codes and Error Handling (exit, $?, trap)',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Deterministic process communication: exit statuses (0=success, 1-255=error) and cleanup traps',
      badges: ['Exit Codes', 'Error Handling', 'trap'],
      difficulty: 'Intermediate',
      quote: 'In Linux, every program speaks a number when it dies: 0 means perfection; any number from 1 to 255 is an error code.',
      whatIsIt: 'Every process that terminates in Linux returns an integer Exit Status Code (between 0 and 255) to its parent process, accessible via the special shell parameter "$?". A code of 0 universally signifies success; any non-zero code (1 to 255) indicates a specific failure. The "exit <code>" command terminates the script with that code. The "trap" command registers cleanup handlers that execute automatically when the script exits or receives signals (like SIGINT/Ctrl+C or SIGTERM), ensuring temporary files are always deleted.',
      inSimpleWords: 'How a program reports its report card. When a script finishes, it leaves behind a number. If the number is 0, everything went great. If it is 1, something broke. "trap" is the automatic cleanup crew that deletes temporary files even if the script crashes.',
      whyDoYouNeedIt: 'CI/CD pipelines (GitHub Actions, GitLab CI) determine whether a build step passed or failed exclusively by checking the script\'s exit code. Returning 0 tells CI to proceed; returning 1 halts the pipeline.',
      realWorldScenario: 'Your script creates a 5GB temporary scratch folder in /tmp. If a user presses Ctrl+C halfway through, the 5GB folder remains orphaned forever. Adding \'trap "rm -rf $TMP_DIR" EXIT\' guarantees the folder is wiped clean even on aborts.',
      realWorldAnalogy: 'A restaurant kitchen: even if the kitchen catches fire or the chef has an emergency (script failure), the automated fire suppression system (trap) activates automatically to clean up.',
      withoutVsWith: {
        without: {
          title: 'Blind Exit Codes and Orphaned Temp Files',
          items: ['Script fails internally but returns exit code 0, tricking CI/CD into deploying broken builds', 'Orphaned /tmp files consuming disk space when scripts are cancelled via Ctrl+C', 'No distinction between different failure modes (network vs permission vs file missing)'],
          outcome: 'Silent build pipeline failures and disk clutter.'
        },
        with: {
          title: 'Explicit Exit Codes & Automated Traps',
          items: ['Accurate, deterministic exit codes (exit 0 for success, exit 1 for bad input, exit 2 for network)', 'Automated cleanup traps (trap "rm -f $LOCK" EXIT) guaranteeing zero disk leaks', 'Instant pipeline failure alerting in Jenkins, GitHub Actions, and cron'],
          outcome: 'Reliable CI/CD pipelines, clean filesystems, and clear failure debugging.'
        }
      },
      blockDiagram: {
        title: 'The "trap EXIT" Safety Net',
        subtitle: 'How trap guarantees cleanup on any exit:',
        nodes: [
          { id: 'trap', label: 'trap "cleanup" EXIT INT TERM', simpleDef: 'Registers signal handler', techDef: 'Registers callback with kernel signal handling subsystem', badge: 'Register', color: '#38bdf8' },
          { id: 'run', label: 'Script Execution', simpleDef: 'Script does work', techDef: 'Creates /tmp/temp_data.csv and processes database queries', badge: 'Active Work', color: '#10b981' },
          { id: 'event', label: 'Event: Normal Exit OR Crash (Ctrl+C)', simpleDef: 'Termination event', techDef: 'Process receives SIGINT, SIGTERM, or reaches exit call', badge: 'Trigger', color: '#f59e0b' },
          { id: 'clean', label: 'trap handler executes: rm -rf /tmp/temp*', simpleDef: 'Cleaned up automatically!', techDef: 'Handler executes reliably before process memory is freed', badge: 'Guaranteed Cleanup', color: '#a855f7' }
        ]
      },
      terms: [
        { term: '$? (Exit Status)', simple: 'Holds the exit number of the command that ran just before this one.', technical: 'Special shell parameter expanding to the exit status of the last executed foreground pipeline.' },
        { term: 'trap', simple: 'A command that tells Linux: "Run this cleanup command whenever this script exits or is killed."', technical: 'Bash builtin defining actions to be taken upon receipt of specified signals or script exit.' }
      ],
      syntaxCode: 'exit 0',
      syntaxTokens: [
        { token: 'exit', role: 'command', explanation: 'Terminate the shell script process immediately' },
        { token: '0', role: 'argument', explanation: 'Exit status code indicating successful completion' }
      ],
      variations: [
        { command: 'echo $?', description: 'Display the exit status code of the immediately preceding command' },
        { command: 'exit 1', description: 'Terminate script with general error status' },
        { command: 'trap \'rm -f /tmp/lock.pid\' EXIT', description: 'Register automated cleanup handler executed whenever script terminates' }
      ],
      expectedOutput: '(Script terminates immediately; in terminal, "echo $?" outputs 0)',
      commonMistakes: [
        { mistake: 'Running another command before checking "$?"', whyWrong: '"$?" updates on EVERY command! If you run "echo $?" twice, the second echo prints the exit status of the first echo (which is 0!).', correctWay: 'Save it immediately: "STATUS=$?; if [ $STATUS -ne 0 ]; then ...".' },
        { mistake: 'Letting a script finish without an explicit "exit" statement', whyWrong: 'If omitted, the script exit code defaults to the exit code of the last command that ran (which might have been an error).', correctWay: 'End scripts explicitly with "exit 0" upon clean completion.' }
      ],
      safeRecovery: 'Always add a cleanup trap for temporary files: \'TEMP=$(mktemp); trap "rm -f $TEMP" EXIT\'.'
    }),

    buildLinuxConcept({
      id: 'c-18-13',
      subChapterNumber: '18.13',
      command: 'CURRENT_DATE=$(date +%F) && echo $CURRENT_DATE',
      title: 'Command Substitution ($(command) vs `command`)',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Capturing command output into variables: modern $() nesting vs deprecated backticks',
      badges: ['Substitution', 'Output Capture', 'Syntax'],
      difficulty: 'Beginner',
      quote: 'Backticks are 1970s legacy: modern shell scripting uses $(command) for clean nesting and effortless readability.',
      whatIsIt: 'Command Substitution allows the output of a command to replace the command itself, capturing stdout directly into a shell variable or embedding it into another command. Two syntaxes exist: 1) The modern POSIX standard: "$(command)"; and 2) The legacy backtick syntax: "`command`". Backticks are considered deprecated practice because they cannot be nested without complex backslash escaping (`cmd1 \\`cmd2\\``) and are visually indistinguishable from single quotes (\'). The "$()" syntax nests cleanly to unlimited depths: $(cmd1 $(cmd2)).',
      inSimpleWords: 'Catching the output of a command in a bucket. Instead of printing the date to the screen, you catch the date and store it in a variable so you can use it to name a backup file.',
      whyDoYouNeedIt: 'Dynamic scripting requires calculating values at runtime: generating filenames with current dates, querying IP addresses, or counting lines in a file.',
      realWorldScenario: 'You are writing an automated backup script. You run: "BACKUP_FILE=\"backup-$(hostname)-$(date +%Y%m%d).tar.gz\"". The variable expands dynamically to "backup-web01-20260930.tar.gz".',
      realWorldAnalogy: 'Placing a cup under a coffee machine to catch the coffee, rather than letting it pour onto the kitchen counter.',
      withoutVsWith: {
        without: {
          title: 'Using Obsolete Backticks (`cmd`)',
          items: ['Easily confused visually with single quotes (\'), causing syntax bugs', 'Nesting multiple commands requires convoluted escaping: \\`cmd \\`sub\\`\\`', 'Difficult to read and maintain in large production scripts'],
          outcome: 'Visual confusion, escaping headaches, and syntax errors.'
        },
        with: {
          title: 'Modern POSIX Substitution ($(cmd))',
          items: ['Clean, unambiguous syntax visually distinct from all quote types', 'Effortless nesting to any depth: $(cat $(find . -name "*.txt"))', 'Standardized across all modern POSIX shells (bash, zsh, dash, ksh)'],
          outcome: 'Readable, clean, and modern shell automation.'
        }
      },
      blockDiagram: {
        title: 'Command Substitution Mechanics',
        subtitle: 'Capturing standard output into process memory:',
        nodes: [
          { id: 'sub', label: 'Subshell Execution', simpleDef: 'Spawns subshell', techDef: 'Bash forks subshell; connects stdout to an internal anonymous pipe', badge: 'Subshell', color: '#38bdf8' },
          { id: 'cmd', label: 'date +%F', simpleDef: 'Executes utility', techDef: 'Binary writes "2026-09-30\\n" to pipe', badge: 'Command', color: '#10b981' },
          { id: 'strip', label: 'Trailing Newline Stripping', simpleDef: 'Cleans whitespace', techDef: 'Bash strips trailing newline characters automatically', badge: 'Sanitize', color: '#a855f7' },
          { id: 'assign', label: 'VAR="2026-09-30"', simpleDef: 'Saved in variable', techDef: 'Assigns captured string to variable in parent shell', badge: 'Variable', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Command Substitution', simple: 'Running a command inside $() and using its output as text.', technical: 'Shell expansion replacing a command string with its standard output.' },
        { term: 'Subshell', simple: 'A child copy of the shell that runs in the background to execute the inner command.', technical: 'Child process spawned via fork() to evaluate commands enclosed in $() or ().' }
      ],
      syntaxCode: 'CURRENT_DATE=$(date +%F) && echo $CURRENT_DATE',
      syntaxTokens: [
        { token: 'CURRENT_DATE=', role: 'argument', explanation: 'Target variable assignment' },
        { token: '$(date +%F)', role: 'command', explanation: 'Execute "date +%F" in a subshell and return its output' },
        { token: '&&', role: 'operator', explanation: 'Execute next command if assignment succeeded' },
        { token: 'echo $CURRENT_DATE', role: 'command', explanation: 'Print the captured variable value' }
      ],
      variations: [
        { command: 'HOST=$(hostname -f)', description: 'Capture fully qualified domain name into variable' },
        { command: 'IP=$(curl -s https://ifconfig.me)', description: 'Capture public IP from remote web service' },
        { command: 'FILES=$(find . -type f -name "*.sh")', description: 'Capture list of matching files into a variable' }
      ],
      expectedOutput: '2026-09-30',
      commonMistakes: [
        { mistake: 'Confusing command substitution $(cmd) with variable expansion ${var}', whyWrong: '"$(cmd)" runs an executable program; "${var}" reads a variable value. Using ${date} will fail.', correctWay: 'Use parentheses "$()" for commands; curly braces "${}" for variables.' },
        { mistake: 'Forgetting that command substitution strips ALL trailing newlines', whyWrong: 'If an output had 3 empty lines at the end, $() will strip them completely.', correctWay: 'Be aware of newline trimming when capturing raw multiline formatting.' }
      ],
      safeRecovery: 'Always quote the assignment if output might contain spaces: \'OUTPUT="$(my_cmd)"\'.'
    }),

    buildLinuxConcept({
      id: 'c-18-14',
      subChapterNumber: '18.14',
      command: 'echo $((5 * 10))',
      title: 'Arithmetic Operations ($((a + b)), let, bc)',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Math in the shell: integer arithmetic expansion ($(( ))), let, expr, and arbitrary-precision floating point with bc',
      badges: ['Math', 'Arithmetic', 'bc'],
      difficulty: 'Beginner',
      quote: 'Bash is built for text, but $(( )) handles fast integer math natively; when you need decimals, pipe to bc.',
      whatIsIt: 'By default, the Linux shell treats all variables as text strings (e.g. "5" + "5" = "55" or error). To perform mathematical operations, Bash provides Arithmetic Expansion using the "$(( expression ))" syntax. Bash arithmetic natively supports 64-bit signed integers: addition (+), subtraction (-), multiplication (*), integer division (/), modulo (%), and exponentiation (**). Because Bash CANNOT perform floating-point math (decimals like 3.14), floating-point calculations must be piped to the external arbitrary-precision calculator utility "bc".',
      inSimpleWords: 'Doing math in Linux. You use "$(( 5 + 5 ))" to calculate numbers. If you need decimal numbers (like 10.5 divided by 2), you use the "bc" calculator.',
      whyDoYouNeedIt: 'Calculating disk usage percentages, converting megabytes to gigabytes, or tracking loop iterations and timeouts requires arithmetic operations.',
      realWorldScenario: 'You are monitoring server RAM. You capture total memory in KB, divide by 1024 to get MB: "TOTAL_MB=$(( TOTAL_KB / 1024 ))", and check if free space is below 15%.',
      realWorldAnalogy: 'Using a built-in mental calculator for whole numbers, but pulling out an advanced scientific calculator (bc) when calculating sales tax with decimals.',
      withoutVsWith: {
        without: {
          title: 'Legacy Slow External Math (expr)',
          items: ['Spawning heavy external processes (expr 5 + 5) for every simple addition', 'Syntax crashes when trying to calculate decimals natively inside bash', 'Need to escape multiplication symbols (expr 5 \\* 10)'],
          outcome: 'Slow execution speed and escaping syntax errors.'
        },
        with: {
          title: 'Native Arithmetic Expansion ($(( )))',
          items: ['Instantaneous in-memory 64-bit integer evaluation directly in the shell parser', 'Clean syntax without needing to escape asterisks ($(( a * b )))', 'Precision floating-point calculations piped effortlessly to "bc -l"'],
          outcome: 'Sub-microsecond math execution and precise decimal support.'
        }
      },
      blockDiagram: {
        title: 'Integer vs Floating Point Math',
        subtitle: 'Choosing the right math engine in Bash:',
        nodes: [
          { id: 'int', label: '$(( 10 / 3 )) -> 3', simpleDef: 'Native Integer Math', techDef: 'Truncates decimals! 10 divided by 3 returns integer 3', badge: 'Integer Only', color: '#38bdf8' },
          { id: 'bc', label: 'echo "scale=2; 10/3" | bc -> 3.33', simpleDef: 'Precision Floating Point', techDef: 'Invokes bc calculator setting decimal scale to 2 digits', badge: 'Decimal (bc)', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'Arithmetic Expansion ($(( )))', simple: 'The double-parentheses syntax used to perform math in Bash.', technical: 'Shell expansion evaluating arithmetic expression and replacing it with the calculated value.' },
        { term: 'bc (Basic Calculator)', simple: 'An external command line calculator that supports decimal numbers and fractions.', technical: 'Arbitrary-precision calculator language utility supporting user-defined decimal precision.' }
      ],
      syntaxCode: 'echo $((5 * 10))',
      syntaxTokens: [
        { token: 'echo', role: 'command', explanation: 'Print result to standard output' },
        { token: '$((5 * 10))', role: 'argument', explanation: 'Arithmetic expansion multiplying integer 5 by 10' }
      ],
      variations: [
        { command: 'echo $(( 100 / 4 ))', description: 'Integer division (returns 25)' },
        { command: 'echo $(( 10 % 3 ))', description: 'Modulo operator: returns remainder of division (returns 1)' },
        { command: 'echo "scale=2; 10 / 3" | bc', description: 'Floating-point division to 2 decimal places using bc (returns 3.33)' },
        { command: '(( COUNT++ ))', description: 'Increment integer variable by 1 directly without dollar sign' }
      ],
      expectedOutput: '50',
      commonMistakes: [
        { mistake: 'Expecting $(( 10 / 4 )) to return 2.5', whyWrong: 'Bash does NOT support floating-point numbers; it truncates the decimal and returns 2!', correctWay: 'Pipe to bc for decimals: "echo \"scale=2; 10 / 4\" | bc".' },
        { mistake: 'Adding dollar signs to variables inside arithmetic expansion: $(( $A + $B ))', whyWrong: 'While it often works, it is unnecessary and causes bugs if a variable is unset; variables inside $(( )) are dereferenced automatically.', correctWay: 'Write cleanly: "$(( A + B ))".' }
      ],
      safeRecovery: 'For high-precision floating point math, always pipe to bc: "echo \'scale=4; 22 / 7\' | bc".'
    }),

    buildLinuxConcept({
      id: 'c-18-15',
      subChapterNumber: '18.15',
      command: 'VAR="commitforge" && echo ${VAR:0:6}',
      title: 'String Manipulation (Length, Substring, Replace)',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Pure Bash parameter expansion: string slicing, pattern stripping (%, #), and case modification (^^, ,,)',
      badges: ['Strings', 'Parameter Expansion', 'Bash'],
      difficulty: 'Intermediate',
      quote: 'Avoid spawning slow sed or cut processes: Bash parameter expansion slices and transforms strings in pure memory.',
      whatIsIt: 'Bash includes powerful built-in String Manipulation capabilities via Parameter Expansion ("${VAR...}"). Operating entirely in memory without spawning external subshells like sed, awk, or cut, parameter expansion can: 1) Measure string length: "${#VAR}"; 2) Extract substrings: "${VAR:offset:length}"; 3) Strip prefixes from the front: "${VAR#pattern}" (shortest) and "${VAR##pattern}" (longest); 4) Strip suffixes from the end: "${VAR%pattern}" and "${VAR%%pattern}"; 5) Search and replace: "${VAR/pattern/replacement}"; and 6) Change case: "${VAR^^}" (uppercase) and "${VAR,,}" (lowercase).',
      inSimpleWords: 'Editing text inside variables without needing extra programs. You can chop off file extensions, make text uppercase, count letters, or grab the first 5 characters instantly.',
      whyDoYouNeedIt: 'In a loop running 10,000 times, spawning "sed" or "cut" inside the loop spawns 10,000 processes, taking 15 seconds. Pure Bash parameter expansion does the same work in 0.05 seconds.',
      realWorldScenario: 'You are writing an image processing script. You have "FILE=\"photo.2026.jpg\"". Running "NAME=\"${FILE%.*}\"" extracts "photo.2026" without the extension in 0 microseconds.',
      realWorldAnalogy: 'Using a built-in scissors feature on a label maker rather than fetching a knife from the kitchen every time.',
      withoutVsWith: {
        without: {
          title: 'Spawning External Binaries (sed, cut, awk)',
          items: ['Spawning thousands of external fork() processes inside loops, causing high CPU load', 'Complex regex escaping inside pipeline chains', 'Slow execution on high-volume log and text parsing'],
          outcome: 'Sluggish script performance and high CPU overhead.'
        },
        with: {
          title: 'Native Parameter Expansion (${VAR%...})',
          items: ['Blazing-fast in-memory string operations running 100x faster than sed/cut', 'Instant extension removal (${FILE%.*}) and directory extraction (${PATH%/*})', 'Case modification (${STR^^}, ${STR,,}) built natively into the shell parser'],
          outcome: 'Microsecond string transformations and clean, readable code.'
        }
      },
      blockDiagram: {
        title: 'Parameter Expansion Mnemonic',
        subtitle: 'Remembering # (Front) vs % (Back):',
        nodes: [
          { id: 'hash', label: '# / ## Strips FRONT', simpleDef: '# is on left of keyboard (number 3)', techDef: '${FILE#*/} strips shortest match from the beginning of string', badge: 'Front Strip', color: '#38bdf8' },
          { id: 'pct', label: '% / %% Strips BACK', simpleDef: '% is on right of keyboard (number 5)', techDef: '${FILE%.*} strips shortest match from the end of string', badge: 'Back Strip', color: '#10b981' },
          { id: 'rep', label: '/ Pattern / Replace', simpleDef: 'Search and Replace', techDef: '${FILE/old/new} replaces first match; ${FILE//old/new} replaces all', badge: 'Replace', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'Parameter Expansion', simple: 'Special tricks inside ${VAR} to slice, clean up, or change text.', technical: 'Shell evaluation of parameters with operators modifying the expanded string.' },
        { term: 'Prefix/Suffix Stripping', simple: 'Chopping off file extensions (.txt) or leading folder paths (/var/log/).', technical: 'Pattern matching removal operators (#, ##, %, %%) operating on parameter values.' }
      ],
      syntaxCode: 'VAR="commitforge" && echo ${VAR:0:6}',
      syntaxTokens: [
        { token: 'VAR="commitforge"', role: 'argument', explanation: 'Assign sample text to variable' },
        { token: '&&', role: 'operator', explanation: 'Execute next command' },
        { token: 'echo ${VAR:0:6}', role: 'command', explanation: 'Extract substring starting at offset 0 for a length of 6 characters' }
      ],
      variations: [
        { command: 'FILE="/var/log/nginx/access.log" && echo ${FILE##*/}', description: 'Extract filename only (strips everything up to last slash) -> "access.log"' },
        { command: 'FILE="archive.tar.gz" && echo ${FILE%.*}', description: 'Strip last extension -> "archive.tar"' },
        { command: 'NAME="alice" && echo ${NAME^^}', description: 'Convert string to uppercase -> "ALICE"' },
        { command: 'TEXT="cat and cat" && echo ${TEXT//cat/dog}', description: 'Global search and replace all instances -> "dog and dog"' }
      ],
      expectedOutput: 'commit',
      commonMistakes: [
        { mistake: 'Using "cut" or "awk" to strip a file extension when "${FILE%.*}" does it natively', whyWrong: 'Spawning cut requires a subshell and process fork, which is 100x slower in large loops.', correctWay: 'Use "${FILE%.*}" for instant in-memory extension removal.' },
        { mistake: 'Confusing single slash (${VAR/old/new}) with double slash (${VAR//old/new})', whyWrong: 'Single slash only replaces the FIRST occurrence; double slash replaces ALL occurrences.', correctWay: 'Use double slash "//" when you want global replacement.' }
      ],
      safeRecovery: 'Mnemonic: "#" is on the left of "$" on standard keyboards (strips from left/front); "%" is on the right (strips from right/back).'
    }),

    buildLinuxConcept({
      id: 'c-18-16',
      subChapterNumber: '18.16',
      command: 'SERVERS=("web1" "web2" "db1") && echo ${SERVERS[0]}',
      title: 'Arrays in Bash',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Indexed and Associative arrays: declaring lists, appending elements, length (${#arr[@]}), and iteration',
      badges: ['Arrays', 'Data Structures', 'Bash'],
      difficulty: 'Intermediate',
      quote: 'Arrays elevate Bash into a real programming language: manage structured lists and key-value hash maps in memory.',
      whatIsIt: 'Bash supports both Indexed Arrays (ordered zero-indexed lists) and Associative Arrays (key-value hash maps declared with "declare -A"). Arrays are declared with parentheses: "MY_ARR=(\"val1\" \"val2\" \"val3\")". Elements are accessed via zero-based indices: "${MY_ARR[0]}". Special expansion forms include: "${MY_ARR[@]}" (expands to all elements as separate words), "${#MY_ARR[@]}" (returns total element count), and "${!MY_ARR[@]}" (returns the list of indices or keys).',
      inSimpleWords: 'A shopping list in a single variable. Instead of creating SERVER1, SERVER2, SERVER3, you create one list variable called SERVERS that holds all of them.',
      whyDoYouNeedIt: 'Managing lists of IP addresses, server hostnames, or command-line flags cleanly requires arrays so you can loop through them reliably.',
      realWorldScenario: 'You are writing an automated server monitoring script. You declare "HOSTS=(\"db-master\" \"db-replica\" \"cache-01\")" and use "for host in \"${HOSTS[@]}\"" to iterate through each server cleanly.',
      realWorldAnalogy: 'An egg carton with 12 slots: each slot has a number (0 to 11) holding a specific egg.',
      withoutVsWith: {
        without: {
          title: 'Managing Lists as Space-Separated Strings',
          items: ['Strings containing spaces break completely when looped over', 'No way to store key-value dictionaries natively in the shell', 'Unable to easily count items or access the Nth element directly'],
          outcome: 'Word-splitting bugs and clumsy string hacking.'
        },
        with: {
          title: 'Native Bash Arrays',
          items: ['Safe handling of elements containing spaces, commas, or special characters', 'Associative arrays (declare -A) providing instant key-value dictionary lookups', 'Dynamic appending with "+=" without string concatenation issues'],
          outcome: 'Clean, robust, and structured data handling in shell scripts.'
        }
      },
      blockDiagram: {
        title: 'Bash Array Indexing & Expansion',
        subtitle: 'Key array syntax patterns:',
        nodes: [
          { id: 'decl', label: 'ARR=("apple" "banana")', simpleDef: 'Declaration', techDef: 'Zero-indexed array: index 0 = apple, index 1 = banana', badge: 'Declare', color: '#38bdf8' },
          { id: 'access', label: '${ARR[0]}', simpleDef: 'Get 1st item', techDef: 'Dereferences element at index 0 -> "apple"', badge: 'Access', color: '#10b981' },
          { id: 'all', label: '"${ARR[@]}"', simpleDef: 'All items', techDef: 'Expands all elements preserving individual word boundaries', badge: 'All Elements', color: '#a855f7' },
          { id: 'count', label: '${#ARR[@]}', simpleDef: 'Total count', techDef: 'Returns total number of elements in array -> 2', badge: 'Count', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Indexed Array', simple: 'A list where items are numbered starting at 0, 1, 2...', technical: 'Numerically indexed array structure in Bash.' },
        { term: 'Associative Array', simple: 'A dictionary where items are looked up by a word name instead of a number.', technical: 'Hash map structure declared via "declare -A" mapping string keys to string values.' }
      ],
      syntaxCode: 'SERVERS=("web1" "web2" "db1") && echo ${SERVERS[0]}',
      syntaxTokens: [
        { token: 'SERVERS=("web1" "web2" "db1")', role: 'argument', explanation: 'Declare indexed array with 3 string elements' },
        { token: '&&', role: 'operator', explanation: 'Execute next command' },
        { token: 'echo ${SERVERS[0]}', role: 'command', explanation: 'Access and print the first element (index 0)' }
      ],
      variations: [
        { command: 'SERVERS+=("web3")', description: 'Append a new element to an existing array' },
        { command: 'echo "Total: ${#SERVERS[@]}"', description: 'Print the total number of elements in the array' },
        { command: 'declare -A PORTS=([http]=80 [https]=443) && echo ${PORTS[https]}', description: 'Declare associative array (dictionary) and access by key' }
      ],
      expectedOutput: 'web1',
      commonMistakes: [
        { mistake: 'Omitting curly braces when accessing array elements: echo $SERVERS[0]', whyWrong: 'Bash expands "$SERVERS" first (which gives element 0), followed by literal text "[0]", outputting "web1[0]"!', correctWay: 'ALWAYS use curly braces when accessing arrays: "${SERVERS[0]}".' },
        { mistake: 'Forgetting "declare -A" before creating an associative array', whyWrong: 'Without "declare -A", Bash treats keys as mathematical expressions; [http] becomes [0], overwriting values.', correctWay: 'Always execute "declare -A my_map" before assigning key-value pairs.' }
      ],
      safeRecovery: 'Always loop over arrays using: \'for item in "${MY_ARR[@]}"; do echo "$item"; done\'.'
    }),

    buildLinuxConcept({
      id: 'c-18-17',
      subChapterNumber: '18.17',
      command: 'bash -x -c \'echo "debugging"\'',
      title: 'Debugging Bash Scripts (bash -x, set -x, set -e)',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting Fundamentals',
      subtitle: 'Execution tracing: tracing command expansions, verbose mode (-v), and ShellCheck static analysis',
      badges: ['Debugging', 'Tracing', 'ShellCheck'],
      difficulty: 'Intermediate',
      quote: 'Don\'t guess what your script is doing: bash -x prints every single line, variable expansion, and subshell in real time.',
      whatIsIt: 'Debugging shell scripts requires inspecting how Bash expands variables and evaluates conditionals. The primary runtime diagnostic flag is "-x" (xtrace): running "bash -x script.sh" (or adding "set -x" inside the script) causes Bash to print every command to stderr prefixed with "+" AFTER all variable expansions, command substitutions, and globbing have occurred. "set +x" turns tracing off. For static analysis, the industry-standard linter "ShellCheck" detects hundreds of subtle bugs and security flaws before execution.',
      inSimpleWords: 'Slow-motion replay for your script. When you turn on "-x", Linux prints out every calculation and variable value as it happens, so you can see exactly where things went wrong.',
      whyDoYouNeedIt: 'When a script behaves unexpectedly or an "if" condition takes the wrong branch, "bash -x" shows you the exact expanded values the shell evaluated, exposing bugs in seconds.',
      realWorldScenario: 'A backup script fails silently with no error message. You re-run it with "bash -x backup.sh". The trace immediately reveals that "$DEST" expanded to an empty string because of a typo in the config file.',
      realWorldAnalogy: 'Turning on the "Show Formulas" mode in an Excel spreadsheet to see how every final number was calculated.',
      withoutVsWith: {
        without: {
          title: 'Blind Trial-and-Error Debugging',
          items: ['Sprinkling dozens of temporary "echo HERE 1" and "echo HERE 2" statements across the file', 'Guessing why an if condition failed with zero visibility into expanded variables', 'Wasting hours on silent logic bugs that could be detected in seconds'],
          outcome: 'Frustrating, slow debugging and cluttered code.'
        },
        with: {
          title: 'Execution Tracing with bash -x',
          items: ['Instant line-by-line execution trace showing every expanded variable and subshell', 'Targeted debugging: wrap only suspect code blocks with "set -x" and "set +x"', 'Static analysis with ShellCheck catching quoting bugs and unportable bashisms'],
          outcome: 'Instant root-cause identification and clean, validated scripts.'
        }
      },
      blockDiagram: {
        title: 'bash -x Execution Tracing',
        subtitle: 'Comparing written source code vs what bash -x displays:',
        nodes: [
          { id: 'src', label: 'Source Code: rm -rf "$BACKUP_DIR"', simpleDef: 'What you wrote', techDef: 'Unexpanded source line in script file', badge: 'Source Code', color: '#38bdf8' },
          { id: 'xtrace', label: 'xtrace output: + rm -rf /tmp/daily', simpleDef: 'What actually runs', techDef: 'Prints expanded command to stderr prefixed with PS4 (+)', badge: 'Execution Trace', color: '#10b981' },
          { id: 'bug', label: 'If unset: + rm -rf "" (Caught!)', simpleDef: 'Catches empty vars!', techDef: 'Reveals empty parameter bug before disaster strikes', badge: 'Bug Caught', color: '#ef4444' }
        ]
      },
      terms: [
        { term: 'set -x (xtrace)', simple: 'Turns on line-by-line trace mode, showing every command and expanded variable.', technical: 'Instructs shell to print trace of commands and their arguments to stderr after expansion.' },
        { term: 'ShellCheck', simple: 'A free tool that reads your bash script and points out bugs and bad habits.', technical: 'GPLv3 static analysis tool for shell scripts warning of syntax and semantic pitfalls.' }
      ],
      syntaxCode: 'bash -x -c \'echo "debugging"\'',
      syntaxTokens: [
        { token: 'bash', role: 'command', explanation: 'GNU Bourne-Again SHell interpreter' },
        { token: '-x', role: 'option', explanation: 'Enable xtrace: print commands and their arguments as they are executed' },
        { token: '-c \'echo "debugging"\'', role: 'argument', explanation: 'Execute specified string command within traced subshell' }
      ],
      variations: [
        { command: 'bash -x script.sh', description: 'Run entire script in trace mode' },
        { command: 'bash -n script.sh', description: 'Syntax check: read script and validate syntax without executing any commands' },
        { command: 'shellcheck script.sh', description: 'Run static analysis linter to find subtle bugs, quoting issues, and antipatterns' }
      ],
      expectedOutput: '+ echo debugging\ndebugging',
      commonMistakes: [
        { mistake: 'Leaving "set -x" enabled in production scripts that process passwords or API keys', whyWrong: 'xtrace prints everything to stderr; sensitive tokens will be dumped in cleartext into CI/CD logs!', correctWay: 'Never trace sections of code that handle private keys, passwords, or secrets.' },
        { mistake: 'Testing scripts without running "bash -n" first', whyWrong: 'A syntax error on line 50 will execute lines 1-49 first before crashing halfway through!', correctWay: 'Run "bash -n script.sh" to check for syntax errors before running.' }
      ],
      safeRecovery: 'To trace only a specific problematic function, wrap it with "set -x" at the start and "set +x" at the end.'
    })
  ]
};
