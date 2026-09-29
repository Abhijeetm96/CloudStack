import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 06: LINUX COMMAND LINE (06.1 to 06.13)
// Deep Senior Engineer Curriculum Implementation
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
      difficulty: 'Beginner',
      quote: 'The shell is not the operating system; it is the conversational interface between your human mind and the Linux kernel.',
      whatIsIt: 'A Shell is a command language interpreter that executes commands read from standard input devices (keyboards) or from script files. When you type a command, the shell parses the text, performs expansions (tilde, globbing, variable substitution), forks a child process, executes the requested binary via execve(), and waits for its exit code.',
      inSimpleWords: 'Think of the shell as your personal multilingual translator sitting between you and the computer\'s engine room. You speak human commands ("make a folder"), and the shell translates that into exact low-level instructions for the kernel.',
      whyDoYouNeedIt: 'GUIs limit you to buttons someone else pre-programmed. The shell gives you infinite programmable control: you can automate tasks, chain programs together, and manage servers thousands of miles away over SSH.',
      realWorldScenario: 'You need to rename 10,000 image files by prepending today\'s timestamp. In a GUI, this takes hours of manual clicking. In the shell, a one-line for-loop finishes the task in 2 seconds.',
      realWorldAnalogy: 'A court interpreter translating between an English-speaking lawyer (user) and a foreign-speaking judge (Linux kernel).',
      withoutVsWith: {
        without: {
          title: 'Managing Systems Without a Shell',
          items: ['Restricted to pre-built graphical buttons and menus', 'Zero ability to automate repetitive multi-step processes', 'Inability to administer remote headless cloud servers'],
          outcome: 'Crippled automation, slow manual clicking, and high operational overhead.'
        },
        with: {
          title: 'Operating With Shell Mastery',
          items: ['Total scriptability and composable tool pipelines', 'Direct programmatic control over processes, files, and networks', 'Seamless remote infrastructure administration via SSH and CI/CD'],
          outcome: 'Maximum automation, high-speed troubleshooting, and enterprise scalability.'
        }
      },
      blockDiagram: {
        title: 'Shell Interpreter Architecture Flow',
        subtitle: 'Command parsing and execution cycle (REPL):',
        nodes: [
          { id: 'input', label: 'User Keystrokes', simpleDef: 'Text entered on keyboard', techDef: 'Bytes read from stdin /dev/pts/0', badge: 'Input', color: '#38bdf8' },
          { id: 'parser', label: 'Shell Lexer & Expander', simpleDef: 'Splits words, expands variables and globs', techDef: 'Tokenization, parameter expansion, word splitting', badge: 'Shell', color: '#a855f7' },
          { id: 'syscall', label: 'fork() & execve()', simpleDef: 'Creates child process and loads program binary', techDef: 'Kernel clone/fork syscall and ELF binary loader', badge: 'Kernel', color: '#10b981' },
          { id: 'exit', label: 'Wait & Exit Code ($?)', simpleDef: 'Captures return status (0 = success)', techDef: 'waitpid() system call collecting exit status', badge: 'Result', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'REPL (Read-Eval-Print Loop)', simple: 'The continuous cycle of reading a command, running it, and waiting for the next.', technical: 'Interactive shell execution lifecycle reading input, parsing AST, executing, and returning prompt.' },
        { term: 'Builtin vs Binary', simple: 'A command built into the shell itself vs a standalone program stored on disk.', technical: 'Builtin executes in current shell memory (cd, exit); binary requires fork() and execve() (ls, grep).' }
      ],
      syntaxCode: 'echo $SHELL',
      syntaxTokens: [
        { token: 'echo', role: 'command', explanation: 'Print arguments to standard output' },
        { token: '$SHELL', role: 'argument', explanation: 'Environment variable storing login shell path' }
      ],
      variations: [
        { syntax: 'cat /etc/shells', title: 'List Valid Login Shells', whatItDoes: 'Displays all approved system shells (bash, zsh, sh, dash)', whenToUse: 'When verifying installed shell environments' },
        { syntax: 'chsh -s /bin/zsh', title: 'Change Default Shell', whatItDoes: 'Updates user login shell in /etc/passwd', whenToUse: 'Switching default interactive shell' }
      ],
      beforeAfter: {
        before: '$ echo $SHELL\n[Querying shell environment variable...]',
        after: '/bin/bash',
        explanation: 'Confirms GNU Bash is configured as the active user login shell.'
      },
      expectedOutput: '/bin/bash',
      whatChanges: ['Reads environment variable.'],
      whatDoesNotChange: ['System configuration is unchanged.'],
      safeRecovery: '100% safe read-only inspection.',
      commonMistakes: [
        { mistake: 'Confusing the terminal window with the shell program', whyItHappens: 'They appear together on screen.', howToFix: 'The terminal is the graphical window (glass); the shell is the interpreter running inside it (engine).' },
        { mistake: 'Editing user login shell to a non-existent path in /etc/passwd', whyItHappens: 'Typo in shell path prevents logging into the server.', howToFix: 'Always use "chsh -s $(which bash)" to ensure the binary exists.' }
      ]
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
      badges: ['CLI', 'TTY', 'Core'],
      difficulty: 'Beginner',
      quote: 'A terminal is the keyboard and screen; a shell is the program running behind the glass.',
      whatIsIt: 'Historically, a Terminal (TTY, short for TeleTYpewriter) was an electro-mechanical physical machine with a typewriter keyboard and printer connected to a mainframe over serial cables. In modern Linux, a terminal is a software Terminal Emulator (GNOME Terminal, Alacritty, iTerm2, Windows Terminal) that creates a Pseudoterminal pair (/dev/pts/X) connecting your keyboard and graphics to the shell.',
      inSimpleWords: 'Think of the terminal as the physical TV screen and keyboard. The shell is the television channel you are watching. You can watch Netflix, HBO, or YouTube (Bash, Zsh, or Python) on the exact same TV screen.',
      whyDoYouNeedIt: 'Understanding TTYs explains why background jobs lose input, why SSH sessions allocate pseudoterminals ("ssh -t"), and how programs detect whether they are outputting to a human screen or a file pipe.',
      realWorldScenario: 'You are running an SSH automation command to execute sudo: "ssh server sudo apt update". It fails with "sudo: a terminal is required to read the password". You add "-t" ("ssh -t server sudo apt update"), forcing SSH to allocate a pseudoterminal, allowing password entry.',
      realWorldAnalogy: 'A computer monitor and keyboard hardware versus the software application displayed on the screen.',
      terms: [
        { term: 'TTY (Teletypewriter)', simple: 'The device representing a terminal interface.', technical: 'Character device subsystem providing line discipline, echoing, and signal generation (Ctrl+C).' },
        { term: 'PTY (Pseudoterminal)', simple: 'A virtual software terminal pair connecting graphical emulators to shells.', technical: 'Bidirectional IPC channel consisting of a master device (/dev/ptmx) and slave device (/dev/pts/N).' }
      ],
      syntaxCode: 'tty',
      syntaxTokens: [
        { token: 'tty', role: 'command', explanation: 'Print the file name of the terminal connected to standard input' },
        { token: '[options]', role: 'flag', explanation: 'Optional flag -s (silent mode testing exit status)' }
      ],
      variations: [
        { syntax: 'w', title: 'Show Logged In Users & TTYs', whatItDoes: 'Displays who is logged in and what pseudoterminal (pts/0, pts/1) they occupy', whenToUse: 'When auditing server operator sessions' },
        { syntax: 'stty -a', title: 'Inspect Terminal Line Settings', whatItDoes: 'Outputs baud rate, row/column dimensions, and control key bindings', whenToUse: 'When debugging scrambled terminal keystrokes' }
      ],
      beforeAfter: {
        before: '$ tty\n[Querying active terminal device...]',
        after: '/dev/pts/2',
        explanation: 'Indicates the shell is connected to pseudoterminal slave number 2.'
      },
      expectedOutput: '/dev/pts/0',
      whatChanges: ['Queries stdin file descriptor 0 with isatty() and ttyname().'],
      whatDoesNotChange: ['Terminal state is untouched.'],
      safeRecovery: 'Non-destructive query.',
      commonMistakes: [
        { mistake: 'Confusing console virtual terminals (tty1-tty6) with graphical PTYs (/dev/pts/*)', whyItHappens: 'Both are called terminals.', howToFix: 'tty1-6 are raw full-screen Linux text consoles accessed via Ctrl+Alt+F1-F6; pts/* are terminal windows in desktop or SSH.' }
      ]
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
      difficulty: 'Beginner',
      quote: 'Bash is the lingua franca of Linux servers: master it once, and you can operate any cloud node on Earth.',
      whatIsIt: 'Bash (Bourne Again SHell) was written by Brian Fox in 1989 for the GNU Project as a free software replacement for Stephen Bourne\'s original Unix sh. It is fully POSIX compliant while adding command-line editing, associative arrays, history recall, process substitution (<(cmd)), and extensive arithmetic expansions.',
      inSimpleWords: 'Bash is the standard language of the Linux terminal. When you open a terminal on Ubuntu, Red Hat, Debian, or AWS EC2, you are almost always talking directly to Bash.',
      whyDoYouNeedIt: 'Cloud-init bootstrap scripts, Docker entrypoints, CI/CD pipeline runners, and production backup scripts are overwhelmingly written in Bash.',
      realWorldScenario: 'You are creating a Docker container image. You write a script "entrypoint.sh" starting with "#!/usr/bin/env bash". Because Bash is standard, your container boots predictably on any Kubernetes cluster.',
      realWorldAnalogy: 'Standard English in international aviation. Pilots and air traffic controllers worldwide speak English to ensure unambiguous communication.',
      terms: [
        { term: 'Bashism', simple: 'A feature unique to Bash that will not work in plain POSIX shells like Dash.', technical: 'Non-POSIX syntax extensions (e.g. [[ ... ]], arrays, <<<, &>) that fail when run under /bin/sh.' },
        { term: 'Shebang (#!/bin/bash)', simple: 'The first line of a script telling Linux which program runs it.', technical: 'Magic 2-byte header (0x23 0x21) parsed by kernel execve() to invoke the target interpreter.' }
      ],
      syntaxCode: 'bash [OPTIONS] [SCRIPT_FILE]',
      syntaxTokens: [
        { token: 'bash', role: 'command', explanation: 'GNU Bourne-Again SHell binary' },
        { token: '--version', role: 'flag', explanation: 'Print version information and license statement' }
      ],
      variations: [
        { syntax: 'bash -n script.sh', title: 'Syntax Check Only', whatItDoes: 'Parses script for syntax errors without executing commands', whenToUse: 'In CI/CD linters before deployment' },
        { syntax: 'bash -x script.sh', title: 'Trace Debug Mode', whatItDoes: 'Prints each command and expanded variables as they execute', whenToUse: 'Debugging failing shell scripts' }
      ],
      beforeAfter: {
        before: '$ bash --version | head -n 1\n[Querying Bash version...]',
        after: 'GNU bash, version 5.2.21(1)-release (x86_64-pc-linux-gnu)',
        explanation: 'Reports exact Bash release and host compilation architecture.'
      },
      expectedOutput: 'GNU bash, version 5.2',
      whatChanges: ['Outputs version text.'],
      whatDoesNotChange: ['Shell configuration is unmodified.'],
      safeRecovery: 'Non-destructive command.',
      commonMistakes: [
        { mistake: 'Writing Bash-specific syntax in a script with #!/bin/sh header', whyItHappens: 'On Ubuntu/Debian, /bin/sh points to Dash, which rejects bash arrays and [[ syntax.', howToFix: 'Always use "#!/usr/bin/env bash" when writing scripts using Bash features.' }
      ]
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
      badges: ['Syntax', 'Grammar', 'Core'],
      difficulty: 'Beginner',
      quote: 'Every command in Linux follows one grammar rule: Command + Options (how to do it) + Arguments (what to do it to).',
      whatIsIt: 'POSIX command grammar follows a strict tripartite structure: 1. Executable Name (the program or builtin to run), 2. Options/Flags (modifiers that alter the program\'s behavior, prefixed with "-" or "--"), and 3. Positional Arguments (the target files, paths, or strings the command acts upon).',
      inSimpleWords: 'Think of a command as a sentence. The Command is the Verb ("copy"). The Flags are Adverbs ("carefully, recursively"). The Arguments are the Noun ("these documents to that folder").',
      whyDoYouNeedIt: 'Once you understand this grammatical structure, you can decipher and construct any Linux command without memorizing thousands of separate combinations.',
      realWorldScenario: 'You encounter a complex command: "rsync -avz --exclude=\'*.tmp\' /src/ user@remote:/dest/". Breaking it down: Command is rsync, Flags are -avz and --exclude, and Arguments are source and destination paths.',
      realWorldAnalogy: 'Grammar in spoken language: Verb (eat) + Adverb (quickly) + Object (the sandwich).',
      terms: [
        { term: 'Command Name', simple: 'The executable program you want to run.', technical: 'First word on the command line, resolved against aliases, functions, builtins, and $PATH.' },
        { term: 'Positional Arguments (argv)', simple: 'The targets the command operates on.', technical: 'Array of null-terminated strings passed into the program\'s C main(int argc, char **argv).' }
      ],
      syntaxCode: 'command [OPTIONS] [ARGUMENTS]',
      syntaxTokens: [
        { token: 'tar', role: 'command', explanation: 'Core executable command (tape archive)' },
        { token: '-czvf', role: 'flag', explanation: 'Combined flags: create (-c), gzip (-z), verbose (-v), file (-f)' },
        { token: 'backup.tar.gz', role: 'argument', explanation: 'First argument: destination archive filename' },
        { token: '/var/log', role: 'path', explanation: 'Second argument: source directory path to compress' }
      ],
      variations: [
        { syntax: 'ls -l /tmp', title: 'Simple Command Structure', whatItDoes: 'Command (ls) + Option (-l) + Argument (/tmp)', whenToUse: 'Basic everyday file listing' },
        { syntax: 'grep -r "error" /var/log', title: 'Search Command Structure', whatItDoes: 'Command (grep) + Option (-r) + Argument 1 ("error") + Argument 2 (/var/log)', whenToUse: 'Recursive log search' }
      ],
      beforeAfter: {
        before: '$ tar -czvf logs.tar.gz /var/log/nginx\n[Executing archive compression...]',
        after: 'logs.tar.gz created with size 4.2MB',
        explanation: 'Applies flags (-c -z -v -f) onto source directory argument to produce output file argument.'
      },
      expectedOutput: '[Command executes structured arguments successfully]',
      whatChanges: ['Depends on executable.'],
      whatDoesNotChange: ['Shell grammar rules remain constant across all commands.'],
      safeRecovery: 'If syntax is malformed, the command returns exit code 1 or 2 and displays usage help.',
      commonMistakes: [
        { mistake: 'Putting the flag value after the wrong argument (e.g. tar -czf /var/log backup.tar.gz)', whyItHappens: 'Forgetting that -f expects the archive filename immediately following it.', howToFix: 'Ensure flag arguments directly follow the corresponding flag.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-06-05',
      subChapterNumber: '06.5',
      command: 'cp source.txt destination.txt',
      title: 'Arguments',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Operands passed into programs: source files, target paths, and payload strings',
      badges: ['CLI', 'Arguments', 'Grammar'],
      difficulty: 'Beginner',
      quote: 'Flags modify how a tool behaves; arguments are the actual objects the tool works upon.',
      whatIsIt: 'Arguments (operands) are the parameters provided to a command after any option flags. They tell the program what data to process, which files to open, which hostnames to connect to, or what text strings to match. In C programs, they arrive in the "argv" array.',
      inSimpleWords: 'When you tell a dog "Fetch the ball", "Fetch" is the command and "the ball" is the argument. In "cp fileA fileB", fileA and fileB are the arguments.',
      whyDoYouNeedIt: 'Understanding argument order (e.g. source first, destination second) prevents destructive blunders like copying an empty file over your real work.',
      realWorldScenario: 'You run "mv config.json config.json.bak". The command takes two positional arguments: Argument 1 is the existing source file, Argument 2 is the new destination name.',
      realWorldAnalogy: 'The destination address written on an envelope.',
      terms: [
        { term: 'Positional Parameter ($1, $2)', simple: 'The way shell scripts refer to the first, second, or third argument.', technical: 'Shell variable holding the Nth command line parameter ($1 for first, $2 for second, $@ for all).' },
        { term: 'Word Splitting', simple: 'How the shell breaks your typed line into separate arguments using spaces.', technical: 'Shell expansion dividing unquoted words based on the characters in $IFS (default space, tab, newline).' }
      ],
      syntaxCode: 'command [ARG1] [ARG2]...',
      syntaxTokens: [
        { token: 'cp', role: 'command', explanation: 'Executable binary' },
        { token: 'source.txt', role: 'path', explanation: 'Positional argument 1: source operand' },
        { token: 'destination.txt', role: 'path', explanation: 'Positional argument 2: target operand' }
      ],
      variations: [
        { syntax: 'echo "argument with spaces"', title: 'Quoted Argument', whatItDoes: 'Passes multiple words as a single unified argument', whenToUse: 'Whenever arguments contain spaces' },
        { syntax: 'rm file1.txt file2.txt file3.txt', title: 'Multiple Operands', whatItDoes: 'Passes three distinct arguments to one command', whenToUse: 'Batch operations' }
      ],
      beforeAfter: {
        before: '$ cat greeting.txt\nls: cannot access \'greeting.txt\': No such file\n$ echo "Hello Linux" > greeting.txt',
        after: '$ cat greeting.txt\nHello Linux',
        explanation: 'The string argument "Hello Linux" was written directly into the file.'
      },
      expectedOutput: 'Hello Linux',
      whatChanges: ['Passes argument vector to program.'],
      whatDoesNotChange: ['Shell environment is untouched.'],
      safeRecovery: 'Non-destructive unless program itself modifies files.',
      commonMistakes: [
        { mistake: 'Failing to quote arguments containing spaces (e.g. rm My Document.pdf)', whyItHappens: 'Bash treats space as argument delimiter, trying to delete "My" and "Document.pdf" separately!', howToFix: 'Always wrap strings with spaces in double quotes: rm "My Document.pdf".' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-06-06',
      subChapterNumber: '06.6',
      command: 'ls -l -a -h --color=auto',
      title: 'Options and Flags',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Short single-hyphen flags (-a) vs long double-hyphen options (--all)',
      badges: ['CLI', 'Flags', 'POSIX'],
      difficulty: 'Beginner',
      quote: 'Short flags save keystrokes in interactive terminals; long options make production scripts self-documenting.',
      whatIsIt: 'Options (flags or switches) alter how a command executes. POSIX defines Short Options using a single dash and single letter (e.g. "-l", "-a"), which can be combined together (e.g. "-la" or "-lah"). GNU standards introduced Long Options using double dashes and readable words (e.g. "--all", "--human-readable", "--color=auto").',
      inSimpleWords: 'Flags are like settings switches. "ls" lists files. Adding "-l" turns on the "long detailed view" switch. Adding "-h" turns on the "human-readable sizes" switch. You can bundle them together into "-lh".',
      whyDoYouNeedIt: 'Flags unlock the hidden superpowers of Linux tools. The same command can run silently, verbosely, recursively, or simulate an action (dry-run) simply by flipping a flag.',
      realWorldScenario: 'You are writing an automated server deployment script. Instead of using obscure single letters like "tar -czf", you write "tar --create --gzip --file=app.tar.gz". Six months later, your teammates can read the script without consulting man pages.',
      realWorldAnalogy: 'Toggling the sport mode, eco mode, or cruise control buttons in an automobile.',
      terms: [
        { term: 'Short Flag (-f)', simple: 'Single-letter switch prefixed with one hyphen.', technical: 'POSIX standard option character parsed via getopt() C library call.' },
        { term: 'Long Option (--flag)', simple: 'Descriptive word switch prefixed with two hyphens.', technical: 'GNU extension parsed via getopt_long() supporting --key=value syntax.' }
      ],
      syntaxCode: 'command -short --long=value',
      syntaxTokens: [
        { token: 'ls', role: 'command', explanation: 'Target command' },
        { token: '-l -a -h', role: 'flag', explanation: 'Short single-letter flags (can be bundled as -lah)' },
        { token: '--color=auto', role: 'flag', explanation: 'GNU long option with explicit parameter assignment' }
      ],
      variations: [
        { syntax: 'ls -lah', title: 'Bundled Short Flags', whatItDoes: 'Combines -l, -a, and -h into one concise token', whenToUse: 'Interactive typing speed' },
        { syntax: 'git commit -m "feat: login"', title: 'Flag with Value', whatItDoes: 'Passes string value directly to the -m option', whenToUse: 'Supplying mandatory option arguments' }
      ],
      beforeAfter: {
        before: '$ ls\nfile.txt\n$ ls -la',
        after: 'total 8\ndrwxr-xr-x 2 dev dev 4096 Sep 28 10:00 .\ndrwxr-xr-x 5 dev dev 4096 Sep 28 09:00 ..\n-rw-r--r-- 1 dev dev   24 Sep 28 10:00 file.txt',
        explanation: 'Flipping flags -l and -a transforms basic output into a rich permission and timestamp table.'
      },
      expectedOutput: 'drwxr-xr-x dev dev file.txt',
      whatChanges: ['Modifies runtime behavior flags in memory.'],
      whatDoesNotChange: ['Files remain intact unless destructive flags (e.g. -f) are supplied.'],
      safeRecovery: 'Non-destructive.',
      commonMistakes: [
        { mistake: 'Using a single dash for GNU long options (e.g. -help instead of --help)', whyItHappens: 'Habit from Windows DOS commands.', howToFix: 'In Linux, long options require TWO hyphens: "--help". A single dash "-help" is interpreted as four bundled short flags: -h -e -l -p!' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-06-07',
      subChapterNumber: '06.7',
      command: 'type -a ls cd grep',
      title: 'Command Help',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Discovering command types: aliases, builtins, functions, and binary paths',
      badges: ['CLI', 'Discovery', 'Core'],
      difficulty: 'Beginner',
      quote: 'Before you look for help, ask Linux: "What kind of command are you?" with type.',
      whatIsIt: 'In Linux, a command can be an Alias (shortcut like "ls --color=auto"), a Shell Builtin (internal command like "cd"), a Shell Function, or an External Binary executable stored on disk (/usr/bin/grep). The "type" command reveals exactly which category an executable belongs to and where it lives.',
      inSimpleWords: 'When you type a word in Linux, how does the terminal know what to do? "type" tells you whether the command is an alias, a shell feature, or a program stored on your hard drive.',
      whyDoYouNeedIt: 'If you try to run "man cd", you might get confused because cd does not have a separate binary on disk. Running "type cd" tells you it is a shell builtin, so you should check "help cd" instead.',
      realWorldScenario: 'You type "python" and it runs Python 2.7 instead of Python 3. You run "type -a python" and discover you have an old alias in ~/.bashrc overriding the real /usr/bin/python3 binary.',
      realWorldAnalogy: 'Looking up a company contact to see if they are an internal in-house employee or an external contractor.',
      terms: [
        { term: 'Command Precedence', simple: 'The priority order the shell uses to find commands.', technical: 'Order: 1. Aliases, 2. Special builtins, 3. Functions, 4. Regular builtins, 5. $PATH binaries.' }
      ],
      syntaxCode: 'type [OPTIONS] COMMAND...',
      syntaxTokens: [
        { token: 'type', role: 'command', explanation: 'Display information about command type' },
        { token: '-a', role: 'flag', explanation: 'Show all matching locations in precedence order' },
        { token: 'ls', role: 'argument', explanation: 'Command name to evaluate' }
      ],
      variations: [
        { syntax: 'which ls', title: 'Locate Binary in PATH', whatItDoes: 'Prints filesystem binary path (omitting builtins)', whenToUse: 'When verifying executable disk locations' },
        { syntax: 'help cd', title: 'Builtin Help', whatItDoes: 'Displays official help manual for shell builtins', whenToUse: 'When reading help for cd, read, export, or exit' }
      ],
      beforeAfter: {
        before: '$ type cd ls\n[Evaluating command origins...]',
        after: 'cd is a shell builtin\nls is aliased to `ls --color=auto\'',
        explanation: 'Reveals that cd is built into Bash while ls is wrapped by a color alias.'
      },
      expectedOutput: 'cd is a shell builtin',
      whatChanges: ['Evaluates command hash table and $PATH.'],
      whatDoesNotChange: ['System remains unaltered.'],
      safeRecovery: '100% safe read-only discovery tool.',
      commonMistakes: [
        { mistake: 'Trying to run "man" on shell builtins (e.g. man export, man cd)', whyItHappens: 'Not knowing builtins document themselves through "help".', howToFix: 'Use "help cd" or "help export" for shell builtins; use "man" for binaries.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-06-08',
      subChapterNumber: '06.8',
      command: 'man 1 chmod',
      title: 'man Pages',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'The authoritative, offline, system-installed manual pages and numbered sections',
      badges: ['Documentation', 'Man', 'Core'],
      difficulty: 'Beginner',
      quote: 'Linux manual pages are the ultimate source of truth: written by the authors who wrote the software.',
      whatIsIt: 'man ("Manual") formats and displays the official system manual pages installed locally on every Linux distribution. Man pages are divided into 8 standardized numbered sections: 1. User Commands (ls, chmod), 2. Kernel System Calls (fork, read), 3. C Library Functions (printf), 4. Special Devices (/dev/null), 5. File Formats (/etc/passwd), 6. Games, 7. Conventions and Standards, and 8. System Administration Daemons (systemd, iptables).',
      inSimpleWords: 'Every Linux command comes with its own built-in instruction manual stored offline on your computer. Typing "man chmod" opens the complete, official guide for that tool. Press "q" to exit.',
      whyDoYouNeedIt: 'You will often work in air-gapped data centers, production private clouds, or recovery consoles without internet access. Local man pages provide full documentation without needing Google.',
      realWorldScenario: 'You are writing a C application that calls the write() system call. You type "man write" and get the command-line chat program (Section 1). You type "man 2 write", specifying section 2, and get the official Linux kernel write() system call documentation.',
      realWorldAnalogy: 'The printed technical service manual in the glove compartment of a car.',
      terms: [
        { term: 'Man Sections (1 to 8)', simple: 'Numbered chapters separating user commands from kernel code and config formats.', technical: 'Standard section numbering (1=commands, 2=syscalls, 3=libfuncs, 5=formats, 8=sysadmin).' },
        { term: 'apropos (man -k)', simple: 'Search through manual descriptions by keyword.', technical: 'Queries the whatis index database for matching keywords across all man sections.' }
      ],
      syntaxCode: 'man [SECTION] COMMAND',
      syntaxTokens: [
        { token: 'man', role: 'command', explanation: 'Format and display system manual pages' },
        { token: '1', role: 'argument', explanation: 'Section 1: General User Commands' },
        { token: 'chmod', role: 'argument', explanation: 'Target command topic' }
      ],
      variations: [
        { syntax: 'man 5 passwd', title: 'File Format Documentation', whatItDoes: 'Displays schema and fields of /etc/passwd file format', whenToUse: 'When understanding config file schemas' },
        { syntax: 'apropos "firewall"', title: 'Keyword Search', whatItDoes: 'Lists all man pages mentioning firewall in their description', whenToUse: 'When you do not know the command name' }
      ],
      beforeAfter: {
        before: '$ man chmod\n[Opens manual page in less pager...]',
        after: 'CHMOD(1)               User Commands               CHMOD(1)\n\nNAME\n       chmod - change file mode bits\n\nSYNOPSIS\n       chmod [OPTION]... MODE[,MODE]... FILE...',
        explanation: 'Displays authoritative syntax, options, and descriptions directly from the system.'
      },
      expectedOutput: 'CHMOD(1) User Commands',
      whatChanges: ['Renders manual text in terminal pager.'],
      whatDoesNotChange: ['System remains intact.'],
      safeRecovery: 'Press the "q" key to exit man at any time.',
      commonMistakes: [
        { mistake: 'Panicking when stuck inside a man page', whyItHappens: 'Pressing Ctrl+C or typing exit.', howToFix: 'Man pages run inside the "less" pager. Press "q" to quit immediately.' },
        { mistake: 'Reading Section 1 when you wanted Section 5 (e.g. man crontab)', whyItHappens: 'Section 1 explains the crontab command; Section 5 explains the crontab file syntax.', howToFix: 'Use "man 5 crontab" to see the file syntax format.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-06-09',
      subChapterNumber: '06.9',
      command: 'grep --help',
      title: '--help',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Quick concise command-line option summaries without leaving your terminal prompt',
      badges: ['CLI', 'Help', 'Core'],
      difficulty: 'Beginner',
      quote: 'When man pages are too verbose, --help gives you the quick 10-second summary right on your prompt.',
      whatIsIt: '--help is the standard GNU option that prints a concise synopsis of a command\'s syntax, all available short and long flags, and typical usage examples directly to standard output, exiting immediately. Unlike man, it does not open a full-screen pager, keeping output visible on your active terminal screen.',
      inSimpleWords: 'Think of --help as a cheat sheet. If you forgot whether the flag is "-r" or "-R", typing "command --help" prints the options right above your cursor so you can glance at it while typing.',
      whyDoYouNeedIt: 'It is the fastest way to verify flag spellings without losing your active terminal context.',
      realWorldScenario: 'You are typing an rsync command and cannot remember the flag to delete files on the destination that no longer exist on source. You run "rsync --help | grep delete" and instantly find: "--delete: delete extraneous files from dest dirs".',
      realWorldAnalogy: 'A quick reference card taped next to a machine tool.',
      terms: [
        { term: 'Usage Statement', simple: 'The first line of help showing standard command argument order.', technical: 'Canonical synopsis line (e.g. Usage: grep [OPTION]... PATTERNS [FILE]...).' }
      ],
      syntaxCode: 'command --help',
      syntaxTokens: [
        { token: 'grep', role: 'command', explanation: 'Target command' },
        { token: '--help', role: 'flag', explanation: 'Standard option requesting usage synopsis and flag reference' }
      ],
      variations: [
        { syntax: 'docker --help', title: 'Subcommand Help', whatItDoes: 'Lists all available Docker subcommands and categories', whenToUse: 'When exploring tool features' },
        { syntax: 'command -h', title: 'Short Help Flag', whatItDoes: 'Some tools support -h as alias for --help', whenToUse: 'Quick option check' }
      ],
      beforeAfter: {
        before: '$ grep --help | head -n 6\n[Querying tool usage synopsis...]',
        after: 'Usage: grep [OPTION]... PATTERNS [FILE]...\nSearch for PATTERNS in each FILE.\nExample: grep -i \'hello world\' menu.h main.c\nPATTERNS can contain multiple patterns separated by newlines.',
        explanation: 'Prints concise grammar synopsis and practical examples directly to stdout.'
      },
      expectedOutput: 'Usage: grep [OPTION]... PATTERNS [FILE]...',
      whatChanges: ['Outputs text to stdout and exits with code 0.'],
      whatDoesNotChange: ['No files or settings are modified.'],
      safeRecovery: '100% safe read-only query.',
      commonMistakes: [
        { mistake: 'Assuming every command supports -h for help', whyItHappens: 'Some commands (like ls) use -h for --human-readable!', howToFix: 'Always use "--help" (two hyphens); it is universally standard across GNU tools.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-06-10',
      subChapterNumber: '06.10',
      command: 'echo $?',
      title: 'Command Exit Codes',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'The universal communication integer: 0 for SUCCESS, non-zero (1-255) for FAILURE',
      badges: ['ExitCodes', 'Bash', 'Automation'],
      difficulty: 'Beginner',
      quote: 'In Linux programming, 0 means SUCCESS; everything else is an error code.',
      whatIsIt: 'Every single program or script executed in Linux terminates by returning an 8-bit integer (0 to 255) called the Exit Code (or Return Status) to the operating system via the exit() system call. By universal Unix convention, an exit code of 0 strictly means SUCCESS. Any non-zero exit code (1 to 255) signifies an error or failure.',
      inSimpleWords: 'When a command finishes running, it silently whispers a number to Linux. If it whispers "0", it says "I succeeded perfectly!". If it whispers "1" or "127", it says "Something went wrong!". You check this number by typing "echo $?".',
      whyDoYouNeedIt: 'Computers cannot read human error messages; they rely on exit codes. Automated scripts, CI/CD pipelines (GitHub Actions), and logical operators (&&, ||) depend entirely on exit codes to know whether to proceed or abort.',
      realWorldScenario: 'Your CI/CD pipeline runs unit tests: "pytest tests/". If all tests pass, pytest exits with code 0, and the pipeline deploys to production. If one test fails, pytest exits with code 1, and the CI/CD pipeline immediately halts deployment.',
      realWorldAnalogy: 'A green thumbs-up (0) versus a red flag with an error code number (1-255).',
      terms: [
        { term: 'Exit Status ($?)', simple: 'The special variable holding the return number of the last command.', technical: 'Shell parameter holding the exit status of the most recently executed foreground pipeline.' },
        { term: 'Exit 127', simple: 'Command not found.', technical: 'Standard shell exit code indicating the executable binary does not exist in $PATH.' },
        { term: 'Exit 126', simple: 'Permission denied / cannot execute.', technical: 'Standard shell exit code indicating the file was found but lacks execute (+x) permissions.' }
      ],
      syntaxCode: 'echo $?',
      syntaxTokens: [
        { token: 'echo', role: 'command', explanation: 'Display output' },
        { token: '$?', role: 'argument', explanation: 'Special shell variable holding exit code of last command' }
      ],
      variations: [
        { syntax: 'ls /nonexistent; echo $?', title: 'Inspect Failure Code', whatItDoes: 'Runs failing command and prints non-zero exit code (e.g. 2)', whenToUse: 'When verifying error handling in scripts' },
        { syntax: 'exit 1', title: 'Terminate Script with Error', whatItDoes: 'Exits shell script intentionally with failure code', whenToUse: 'When validation checks fail inside bash scripts' }
      ],
      beforeAfter: {
        before: '$ ping -c 1 8.8.8.8 > /dev/null\n$ echo $?',
        after: '0\n[0 proves network packet succeeded]\n$ ping -c 1 192.0.2.1 > /dev/null\n$ echo $?\n1\n[1 proves host was unreachable]',
        explanation: 'Demonstrates programmatic success (0) versus failure (1) detection via $?.'
      },
      expectedOutput: '0',
      whatChanges: ['Reads special shell parameter $?.'],
      whatDoesNotChange: ['System remains intact.'],
      safeRecovery: 'Non-destructive inspection.',
      commonMistakes: [
        { mistake: 'Running another command before checking "$?"', whyItHappens: '"$?" only stores the exit code of the IMMEDIATE previous command; running anything else overwrites it.', howToFix: 'Save the exit code into a variable immediately: "STATUS=$?".' },
        { mistake: 'Assuming 1 means true like in C or Python programming', whyItHappens: 'In programming languages, 1 is truthy. In POSIX shell, 0 is SUCCESS (truthy) and non-zero is failure.', howToFix: 'Remember: 0 = Zero errors.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-06-11',
      subChapterNumber: '06.11',
      command: 'echo "Process completed successfully" > output.txt',
      title: 'stdout',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Standard Output (File Descriptor 1): the default data stream for normal program results',
      badges: ['Streams', 'stdout', 'Core'],
      difficulty: 'Beginner',
      quote: 'stdout is File Descriptor 1: the standard channel where programs emit their normal results.',
      whatIsIt: 'Standard Output (stdout) is one of the three standard POSIX I/O streams opened automatically for every process. It is assigned File Descriptor 1 (fd 1). By default, stdout is connected to your terminal screen, displaying normal command output. Using redirection operators (">", ">>", or "|"), stdout can be saved to files or piped to other programs.',
      inSimpleWords: 'When a command does what you asked it to do, it writes the result to stdout. If you don\'t redirect it, stdout appears on your screen.',
      whyDoYouNeedIt: 'Separating stdout from errors (stderr) ensures that automation scripts can capture clean data payloads without mixing in warnings or error traces.',
      realWorldScenario: 'You run an API client that outputs JSON. You redirect stdout: "curl https://api.site.com/data > payload.json". The clean data is written to the file; progress bars and connection warnings do not contaminate your JSON file.',
      realWorldAnalogy: 'The primary speaker in an intercom system broadcasting announcements to the audience.',
      terms: [
        { term: 'File Descriptor 1 (fd 1)', simple: 'The numeric ID representing standard output in Linux.', technical: 'Index 1 in the process open file descriptor table (struct files_struct) pointing to vfs file.' },
        { term: 'Stream Redirection (>)', simple: 'Diverting stdout from your screen into a file.', technical: 'dup2() system call replacing fd 1 with an open file descriptor targeting a file.' }
      ],
      syntaxCode: 'command > output.txt',
      syntaxTokens: [
        { token: 'command', role: 'command', explanation: 'Any program producing standard output' },
        { token: '>', role: 'operator', explanation: 'Redirect stdout (fd 1) to target file, truncating existing content' },
        { token: 'output.txt', role: 'path', explanation: 'Destination file path' }
      ],
      variations: [
        { syntax: 'command 1> file.txt', title: 'Explicit FD 1 Redirection', whatItDoes: 'Identical to ">"; explicitly specifies file descriptor 1', whenToUse: 'When making scripts maximally explicit' },
        { syntax: 'command >> file.txt', title: 'Append stdout', whatItDoes: 'Appends data to end of file without erasing existing content', whenToUse: 'Adding records to log files' }
      ],
      beforeAfter: {
        before: '$ date > today.txt\n[Diverting stdout stream to file...]',
        after: '$ cat today.txt\nSat Sep 28 10:30:00 UTC 2024',
        explanation: 'Output was redirected from terminal screen directly into today.txt.'
      },
      expectedOutput: '[Output redirected into file]',
      whatChanges: ['Writes data bytes into target file.'],
      whatDoesNotChange: ['Original program code is unchanged.'],
      safeRecovery: 'If you accidentally overwritten a file with ">", restore from backup. Use ">>" to append safely.',
      commonMistakes: [
        { mistake: 'Confusing overwrite (>) with append (>>)', whyItHappens: 'Using single ">" wipes out all previous file contents.', howToFix: 'Use ">>" if you want to keep existing data and add to the bottom.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-06-12',
      subChapterNumber: '06.12',
      command: 'ls /nonexistent 2> error.log',
      title: 'stderr',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Standard Error (File Descriptor 2): the dedicated unbuffered channel for diagnostic alerts',
      badges: ['Streams', 'stderr', 'Core'],
      difficulty: 'Beginner',
      quote: 'stderr is File Descriptor 2: error messages belong in a dedicated stream so they never corrupt your data.',
      whatIsIt: 'Standard Error (stderr) is the second output stream opened for every process, assigned File Descriptor 2 (fd 2). While stdout conveys normal results, stderr is strictly reserved for diagnostic messages, warnings, and errors. Unlike stdout, stderr is unbuffered by default so error messages appear on screen immediately even if a program crashes.',
      inSimpleWords: 'Imagine a worker who delivers clean packages to your front door (stdout). If an emergency happens, the worker blows a loud whistle (stderr). Even if you send the packages to a storage warehouse, you still want to hear the whistle on your screen.',
      whyDoYouNeedIt: 'If errors were mixed into stdout, a script parsing numbers or JSON would crash when an unexpected warning appeared. By separating stderr, errors stay visible on your screen even when output is redirected into a file.',
      realWorldScenario: 'You run a backup script: "tar -czf backup.tar.gz /var/data > /dev/null". You silence stdout. But one file was corrupt: tar writes the error to stderr (fd 2), so the error still appears boldly on your screen for you to fix.',
      realWorldAnalogy: 'The red emergency dashboard warning light in a car, independent of the digital GPS navigation screen.',
      terms: [
        { term: 'File Descriptor 2 (fd 2)', simple: 'The numeric ID representing standard error in Linux.', technical: 'Process file descriptor 2 dedicated to unbuffered diagnostic telemetry.' },
        { term: '2> Redirection', simple: 'Directing error messages into an error log file.', technical: 'Shell syntax redirecting file descriptor 2 specifically.' }
      ],
      syntaxCode: 'command 2> errors.log',
      syntaxTokens: [
        { token: 'command', role: 'command', explanation: 'Program executing actions' },
        { token: '2>', role: 'operator', explanation: 'Redirect file descriptor 2 (stderr) to file' },
        { token: 'errors.log', role: 'path', explanation: 'Destination error log file' }
      ],
      variations: [
        { syntax: 'command 2> /dev/null', title: 'Silence Error Messages', whatItDoes: 'Discards all warnings and error output into the black hole', whenToUse: 'When searching through folders with permission denied errors' },
        { syntax: 'command > out.log 2>&1', title: 'Merge stdout and stderr', whatItDoes: 'Combines normal output and errors into one unified log file', whenToUse: 'Cron job and daemon log archives' }
      ],
      beforeAfter: {
        before: '$ ls /root 2> errors.txt\n[Terminal displays nothing; errors diverted]',
        after: '$ cat errors.txt\nls: cannot open directory \'/root\': Permission denied',
        explanation: 'Permission denied error was captured cleanly in errors.txt without cluttering screen.'
      },
      expectedOutput: 'ls: cannot open directory: Permission denied',
      whatChanges: ['Writes error stream to file descriptor 2 target.'],
      whatDoesNotChange: ['Normal stdout is unaffected.'],
      safeRecovery: 'Non-destructive redirection.',
      commonMistakes: [
        { mistake: 'Forgetting the "2" when redirecting errors (e.g. typing "> errors.log")', whyItHappens: 'Single ">" redirects stdout (1), so errors still leak onto your screen!', howToFix: 'Always type "2>" to redirect errors.' }
      ]
    }),

    buildLinuxConcept({
      id: 'c-06-13',
      subChapterNumber: '06.13',
      command: 'mail -s "Alert" admin@site.com < message.txt',
      title: 'stdin',
      topicId: 'ch-06',
      topicNumber: '06',
      topicTitle: 'Linux Command Line',
      subtitle: 'Standard Input (File Descriptor 0): feeding data streams into running programs',
      badges: ['Streams', 'stdin', 'Core'],
      difficulty: 'Beginner',
      quote: 'stdin is File Descriptor 0: the open doorway where programs consume incoming data streams.',
      whatIsIt: 'Standard Input (stdin) is the primary input stream opened for every Linux process, assigned File Descriptor 0 (fd 0). By default, stdin reads keystrokes typed by the user at the terminal keyboard. Using the input redirection operator ("<") or pipes ("|"), stdin can read from files, network sockets, or previous commands.',
      inSimpleWords: 'When a program asks a question or waits for data, it listens on stdin. You can type the answers on your keyboard, or you can point stdin at a file using "<" so the program reads the file automatically.',
      whyDoYouNeedIt: 'stdin allows batch automation: rather than manually typing data into interactive prompts, you feed input files directly into programs.',
      realWorldScenario: 'You need to restore a PostgreSQL database from a backup file. You run: "psql -U dbuser mydatabase < backup.sql". psql consumes the SQL queries directly through its stdin stream, executing thousands of transactions in seconds.',
      realWorldAnalogy: 'The input conveyor belt feeding raw materials into a factory machine.',
      terms: [
        { term: 'File Descriptor 0 (fd 0)', simple: 'The numeric ID representing standard input in Linux.', technical: 'Process table file descriptor 0 connected by default to terminal master/slave PTY.' },
        { term: 'Here-Doc (<<EOF)', simple: 'Feeding multi-line text into stdin directly within a script.', technical: 'Inline redirection stream reading script lines up to a delimiter token.' }
      ],
      syntaxCode: 'command < input_file.txt',
      syntaxTokens: [
        { token: 'command', role: 'command', explanation: 'Program consuming input stream' },
        { token: '<', role: 'operator', explanation: 'Redirect stdin (fd 0) to read from file' },
        { token: 'input_file.txt', role: 'path', explanation: 'Source file containing data payload' }
      ],
      variations: [
        { syntax: 'cat <<EOF > config.txt\nkey=value\nEOF', title: 'Here-Document Redirection', whatItDoes: 'Writes multiple lines into a file until EOF delimiter is reached', whenToUse: 'Generating configuration files in scripts' },
        { syntax: 'read -p "Username: " USERNAME', title: 'Read Variable from stdin', whatItDoes: 'Prompts user and captures typed input into shell variable', whenToUse: 'Interactive shell scripts' }
      ],
      beforeAfter: {
        before: '$ wc -l < /etc/passwd\n[Reading passwd file via stdin file descriptor 0...]',
        after: '38',
        explanation: 'Note: because input was fed through stdin, wc outputs only the number (38) without printing the filename!'
      },
      expectedOutput: '38',
      whatChanges: ['Connects file data stream to process stdin fd 0.'],
      whatDoesNotChange: ['Input file is opened read-only; completely unmodified.'],
      safeRecovery: '100% safe read-only operation.',
      commonMistakes: [
        { mistake: 'Reversing input (<) and output (>) operators', whyItHappens: 'Typing "cat > file" instead of "cat < file" wipes out your file!', howToFix: 'Rule: "<" reads FROM file (arrow points left into command); ">" writes TO file (arrow points right into file).' }
      ]
    })
  ]
};
