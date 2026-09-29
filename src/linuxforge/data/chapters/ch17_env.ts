import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 17: ENVIRONMENT & SHELL CONFIGURATION (17.1 to 17.13)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_17: LinuxTopic = {
  id: 'ch-17',
  number: '17',
  title: 'Environment & Shell Configuration',
  iconName: 'Settings',
  description: 'Master shell runtime environments: environment variables, export, $PATH resolution, startup file cascades (~/.bashrc vs /etc/profile), login vs non-login shells, aliases, and prompt customizing ($PS1).',
  concepts: [
    buildLinuxConcept({
      id: 'c-17-01',
      subChapterNumber: '17.1',
      command: 'printenv | head -n 10',
      title: 'Environment Variables Concepts',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment & Shell Configuration',
      subtitle: 'Dynamic key-value pairs inherited by child processes to parameterize behavior without recompilation',
      badges: ['Environment', 'Variables', 'Core'],
      difficulty: 'Beginner',
      quote: 'Environment variables are the invisible DNA of Linux processes: passed from parent to child to define how programs behave.',
      whatIsIt: 'In Linux and POSIX systems, Environment Variables are dynamic named key-value pairs maintained in a process\'s memory address space. When a parent process spawns a child process using fork() and execve(), the child automatically inherits a copy of the parent\'s exported environment block. This provides a universal, language-agnostic mechanism to configure applications (e.g. database credentials, runtime modes, API tokens, locale settings) without hardcoding values in code.',
      inSimpleWords: 'Global settings for your programs. Instead of editing code every time you switch between testing and production, you set a variable like "ENV=production" and all your apps read it automatically.',
      whyDoYouNeedIt: 'Twelve-Factor App architecture mandates storing configuration in the environment. Docker containers, Kubernetes Pods, and cloud serverless workloads are configured almost exclusively via environment variables.',
      realWorldScenario: 'You are deploying a web application to production. Instead of baking the database password into the Git repository, the deployment script injects "DATABASE_URL=postgres://user:secret@db.internal:5432/app" into the process environment at launch.',
      realWorldAnalogy: 'Writing instructions on the outside of a shipping box: the delivery driver (operating system) can read where to go without opening or altering the items inside the box.',
      withoutVsWith: {
        without: {
          title: 'Hardcoded Configuration in Code',
          items: ['Sensitive passwords and API keys accidentally committed to public Git repos', 'Need to recompile or rebuild container images for every staging/production environment', 'Inflexible shell scripts unable to adapt to different user home directories'],
          outcome: 'Severe security leaks and brittle, non-portable applications.'
        },
        with: {
          title: 'Dynamic Environment Variable Architecture',
          items: ['Strict separation of application code from runtime configuration', 'Seamless inheritance down the process tree (Parent Shell -> Script -> Binary)', 'Universal compatibility with Docker, Kubernetes, and cloud secrets managers'],
          outcome: 'Portable, secure, Twelve-Factor compliant applications.'
        }
      },
      blockDiagram: {
        title: 'Environment Variable Inheritance Flow',
        subtitle: 'How child processes inherit exported variables:',
        nodes: [
          { id: 'parent', label: 'Parent Process (Bash)', simpleDef: 'Login Shell', techDef: 'Maintains char **environ pointer in process memory', badge: 'Parent', color: '#38bdf8' },
          { id: 'export', label: 'export APP_ENV=prod', simpleDef: 'Marks for export', techDef: 'Sets variable attribute flag in bash symbol table', badge: 'Export', color: '#10b981' },
          { id: 'fork', label: 'fork() + execve()', simpleDef: 'Spawns child program', techDef: 'Kernel copies environ block into child address space', badge: 'Syscall', color: '#a855f7' },
          { id: 'child', label: 'Child Process (Node.js/Python)', simpleDef: 'Inherits APP_ENV', techDef: 'Reads getenv("APP_ENV") -> "prod"', badge: 'Child', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Environment Variable', simple: 'A global setting that any program running in this terminal can read.', technical: 'Null-terminated KEY=VALUE string residing in process environ memory array.' },
        { term: 'Shell Variable', simple: 'A local variable that only this specific shell knows about; child programs cannot see it.', technical: 'Internal bash symbol table entry not marked with export attribute.' }
      ],
      syntaxCode: 'printenv | head -n 10',
      syntaxTokens: [
        { token: 'printenv', role: 'command', explanation: 'Print all or specific environment variables' },
        { token: '| head -n 10', role: 'argument', explanation: 'Limit output display to the first 10 exported variables' }
      ],
      variations: [
        { command: 'printenv', description: 'Print all exported environment variables currently in scope' },
        { command: 'printenv USER', description: 'Print value of specific variable (USER) without $ sign' },
        { command: 'env', description: 'Run a program in a modified environment or print exported variables' }
      ],
      expectedOutput: 'SHELL=/bin/bash\nPWD=/home/ubuntu\nLOGNAME=ubuntu\nHOME=/home/ubuntu\nLANG=en_US.UTF-8\nUSER=ubuntu\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
      commonMistakes: [
        { mistake: 'Setting a variable without "export" and wondering why child scripts cannot see it', whyWrong: 'Without "export", the variable is a private shell variable; child processes will inherit an empty value.', correctWay: 'Always use "export VAR=value" when child programs need to read it.' },
        { mistake: 'Adding spaces around the equals sign (e.g. VAR = value)', whyWrong: 'Bash interprets "VAR" as a command name and "=" as an argument, throwing "command not found".', correctWay: 'Never put spaces around the equals sign: "VAR=value".' }
      ],
      safeRecovery: 'To check if a variable is visible to child processes, run "bash -c \'echo $YOUR_VAR\'".'
    }),

    buildLinuxConcept({
      id: 'c-17-02',
      subChapterNumber: '17.2',
      command: 'env | grep -E "USER|SHELL|PATH"',
      title: 'Viewing Environment Variables (env, printenv, set)',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment & Shell Configuration',
      subtitle: 'The inspection trio: understanding the differences between env, printenv, and the set builtin',
      badges: ['env', 'printenv', 'set', 'Inspection'],
      difficulty: 'Beginner',
      quote: 'Know what your shell knows: printenv inspects exported variables; set reveals every hidden shell function and local token.',
      whatIsIt: 'Linux provides three distinct commands for inspecting variables: 1) "printenv" is an external binary that prints exported environment variables (optionally taking a variable name as argument: printenv HOME); 2) "env" is both an environment viewer and a utility to execute commands in a modified environment (e.g. env VAR=1 command); 3) "set" is a shell builtin that prints EVERYTHING: exported environment variables, private local shell variables, and shell functions.',
      inSimpleWords: 'The three tools to check your settings. "printenv" and "env" show what other apps can see. "set" shows you everything, including the shell\'s private personal notes.',
      whyDoYouNeedIt: 'When debugging why a Python script or cron job cannot find a binary, running "env" inside the script reveals the exact environment inherited by that process.',
      realWorldScenario: 'A scheduled cron job fails with "command not found". You add "* * * * * env > /tmp/cron_env.txt" to crontab to discover cron runs with a minimal PATH (/usr/bin:/bin) missing /usr/local/bin.',
      realWorldAnalogy: 'Looking at what someone has in their pockets (printenv) vs reading their entire private personal diary (set).',
      withoutVsWith: {
        without: {
          title: 'Blind Runtime Environment Guesswork',
          items: ['Assuming cron jobs or systemd services inherit the user\'s interactive bash PATH', 'Confusion over whether a variable is exported or merely local to the shell', 'Unable to inspect active shell function definitions'],
          outcome: 'Failed automation scripts and unexplained missing variable errors.'
        },
        with: {
          title: 'Targeted Environment Auditing',
          items: ['Instant verification of exported variables using "printenv <KEY>"', 'Comparing interactive shell environments vs headless service environments', 'Precise inspection of local shell variables and functions with "set"'],
          outcome: 'Rapid debugging of automated jobs and absolute environment clarity.'
        }
      },
      blockDiagram: {
        title: 'env vs printenv vs set Scope',
        subtitle: 'Scope comparison of the three inspection tools:',
        nodes: [
          { id: 'env', label: 'env / printenv', simpleDef: 'Exported Variables Only', techDef: 'Displays key-value pairs residing in char **environ array', badge: 'Exported Only', color: '#10b981' },
          { id: 'set', label: 'set (Shell Builtin)', simpleDef: 'Exported + Local + Functions', techDef: 'Prints entire bash symbol table: local vars, arrays, and functions', badge: 'Full Scope', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'printenv', simple: 'A command to view one or all exported environment variables.', technical: 'Core utility reading getenv() / environ directly from process address space.' },
        { term: 'set', simple: 'A shell builtin that displays both local and exported variables plus shell functions.', technical: 'Bash builtin command listing all active shell parameters, options, and declared functions.' }
      ],
      syntaxCode: 'env | grep -E "USER|SHELL|PATH"',
      syntaxTokens: [
        { token: 'env', role: 'command', explanation: 'Print exported environment or run command in modified environment' },
        { token: '| grep -E', role: 'operator', explanation: 'Pipe to extended regular expression search' },
        { token: '"USER|SHELL|PATH"', role: 'argument', explanation: 'Filter for key core system environment variables' }
      ],
      variations: [
        { command: 'printenv PATH', description: 'Print value of $PATH variable directly without trailing newline issues' },
        { command: 'env -i bash', description: 'Spawn a completely clean, blank shell with zero inherited environment variables' },
        { command: 'set | grep "^BASH_"', description: 'Inspect internal Bash shell runtime state variables' }
      ],
      expectedOutput: 'SHELL=/bin/bash\nUSER=ubuntu\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
      commonMistakes: [
        { mistake: 'Typing "printenv $PATH" instead of "printenv PATH"', whyWrong: 'If you type "$PATH", the shell expands it first, so printenv tries to look up the expanded string as a variable name!', correctWay: 'Pass the raw variable name without dollar sign: "printenv PATH".' },
        { mistake: 'Running "set" on a busy terminal and drowning in 500 lines of bash functions', whyWrong: 'set dumps all shell completion functions; piping without grep creates massive output spam.', correctWay: 'Use "printenv" or pipe "set | head -n 30" when exploring variables.' }
      ],
      safeRecovery: 'To check a specific variable quickly, run "echo \"$VARIABLE_NAME\"".'
    }),

    buildLinuxConcept({
      id: 'c-17-03',
      subChapterNumber: '17.3',
      command: 'export MY_VAR="production" && echo $MY_VAR',
      title: 'Setting and Exporting Variables (export, unset)',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment & Shell Configuration',
      subtitle: 'The export attribute: promoting local shell variables into inherited environment blocks',
      badges: ['export', 'unset', 'Variables'],
      difficulty: 'Beginner',
      quote: 'export is the passport stamp: it marks a variable so it can cross the border into child processes.',
      whatIsIt: 'In Bash, assigning "FOO=bar" creates a local shell variable: it exists only in the current running shell process. To make it visible to child processes, scripts, and commands executed from that shell, you must "export" it. The "export" command marks the variable with the export attribute in the shell\'s symbol table. Conversely, "unset" removes the variable completely from both the shell and the environment.',
      inSimpleWords: 'Assigning without export is a private whisper to the current window. Using "export" announces the variable out loud so every script you run in that window hears it.',
      whyDoYouNeedIt: 'When you configure cloud tools (AWS_REGION=us-east-1) or development runtimes (NODE_ENV=production), you must export them so CLI tools like "aws" or "node" can read the settings.',
      realWorldScenario: 'You are running a database migration script "python migrate.py". If you only type "DB_HOST=10.0.1.5", Python cannot see it and crashes. Typing "export DB_HOST=10.0.1.5" allows Python to connect successfully.',
      realWorldAnalogy: 'Writing a note on a personal sticky pad (local variable) vs posting it on the company announcement bulletin board (exported variable).',
      withoutVsWith: {
        without: {
          title: 'Setting Unexported Variables (VAR=val)',
          items: ['Child scripts and programs fail because getenv("VAR") returns NULL', 'Developers confused why "echo $VAR" works in shell but fails inside their script', 'Need to re-type variables repeatedly for every command execution'],
          outcome: 'Broken scripts and confusing runtime behavior.'
        },
        with: {
          title: 'Exporting Variables with export',
          items: ['Automatic propagation down through all subprocesses and background jobs', 'Clean unsetting with "unset VAR" to scrub secrets from memory after use', 'Ability to set temporary one-shot variables: VAR=val ./script.sh'],
          outcome: 'Seamless script parameterization and precise memory hygiene.'
        }
      },
      blockDiagram: {
        title: 'Local vs Exported Memory Scope',
        subtitle: 'What happens when you spawn a child script:',
        nodes: [
          { id: 'local', label: 'LOCAL_VAR="abc"', simpleDef: 'Unexported', techDef: 'Stored in Bash internal hash table only; omitted from execve environ', badge: 'Private', color: '#ef4444' },
          { id: 'exp', label: 'export EXP_VAR="xyz"', simpleDef: 'Exported', techDef: 'Marked with EXPORT flag; included in char **environ passed to execve', badge: 'Public', color: '#10b981' },
          { id: 'exec', label: './child_script.sh', simpleDef: 'Child Process', techDef: 'Reads EXP_VAR="xyz"; CANNOT see LOCAL_VAR', badge: 'Subprocess', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'export', simple: 'A shell command that makes a variable available to all child programs.', technical: 'Bash builtin setting the export attribute on shell variables for passing to child environments.' },
        { term: 'unset', simple: 'Deletes a variable completely from memory.', technical: 'Bash builtin removing variables or functions from the shell symbol table.' }
      ],
      syntaxCode: 'export MY_VAR="production" && echo $MY_VAR',
      syntaxTokens: [
        { token: 'export', role: 'command', explanation: 'Mark names for automatic export to the environment of subsequently executed commands' },
        { token: 'MY_VAR="production"', role: 'argument', explanation: 'Key-value variable definition (no spaces around =)' },
        { token: '&&', role: 'operator', explanation: 'Logical AND operator' },
        { token: 'echo $MY_VAR', role: 'command', explanation: 'Dereference and print the exported variable value' }
      ],
      variations: [
        { command: 'export KEY="value"', description: 'Define and export variable in one step' },
        { command: 'KEY="value"; export KEY', description: 'Define local variable first, then export it' },
        { command: 'unset KEY', description: 'Completely delete and unexport the variable from memory' },
        { command: 'APP_PORT=8080 ./server', description: 'One-shot inline export: passes APP_PORT only to ./server without altering current shell' }
      ],
      expectedOutput: 'production',
      commonMistakes: [
        { mistake: 'Trying to export a variable from a child script and expecting it to persist in parent terminal', whyWrong: 'Environment variables flow DOWN to children, never UP to parents! A child script cannot alter parent environment.', correctWay: 'Use "source ./script.sh" or ". ./script.sh" to execute the script inside the current shell process.' },
        { mistake: 'Putting a dollar sign on the left side: export $MY_VAR="val"', whyWrong: 'The dollar sign expands the variable first, resulting in syntax errors or corrupted variable assignments.', correctWay: 'Never use "$" when assigning or exporting: "export MY_VAR=\'val\'".' }
      ],
      safeRecovery: 'To wipe an exported secret variable immediately after use, run "unset <VARIABLE_NAME>".'
    }),

    buildLinuxConcept({
      id: 'c-17-04',
      subChapterNumber: '17.4',
      command: 'echo "PATH: $PATH" && echo "HOME: $HOME"',
      title: 'Common System Variables ($PATH, $HOME, $USER, $SHELL, $PWD)',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment & Shell Configuration',
      subtitle: 'The core POSIX standard variables governing user identity, paths, and shell defaults',
      badges: ['PATH', 'HOME', 'USER', 'Core'],
      difficulty: 'Beginner',
      quote: 'These 5 variables are the bedrock of Linux: every script, compiler, and shell relies on them continuously.',
      whatIsIt: 'POSIX and Linux define a collection of standard environment variables populated automatically during login: 1) $PATH (colon-separated list of directories searched for executable binaries); 2) $HOME (absolute path to current user\'s home directory); 3) $USER or $LOGNAME (current logged-in username); 4) $SHELL (path to the user\'s default login shell, e.g. /bin/bash); and 5) $PWD (Print Working Directory: current active working directory updated by cd).',
      inSimpleWords: 'The 5 essential GPS coordinates of Linux. They tell programs who you are ($USER), where your home is ($HOME), what shell you are running ($SHELL), where you are standing right now ($PWD), and where to find executable tools ($PATH).',
      whyDoYouNeedIt: 'Shell scripts and Makefiles use these variables to locate user data (~/ maps to $HOME) and determine user privileges without hardcoding paths like "/home/john".',
      realWorldScenario: 'You are writing an automation script that creates backup archives in the user\'s home directory. Writing "DEST=\"$HOME/backups\"" ensures the script works identically for root (/root/backups), ubuntu (/home/ubuntu/backups), or alice (/home/alice/backups).',
      realWorldAnalogy: 'Your personal identification card: stating your name, home address, default language, and current location.',
      withoutVsWith: {
        without: {
          title: 'Hardcoded Paths (/home/ubuntu)',
          items: ['Scripts crash when executed by a different user account or on a different server', 'Security risks when hardcoding specific user IDs into shared automation', 'Inability to dynamically locate system tools across different distros'],
          outcome: 'Fragile, non-portable scripts that break on other machines.'
        },
        with: {
          title: 'Referencing Standard System Variables',
          items: ['Universal script portability across Ubuntu, Debian, RHEL, Arch, and Alpine', 'Dynamic directory targeting using $HOME and $PWD', 'Automatic command discovery via standardized $PATH hierarchy'],
          outcome: 'Portable, resilient, and enterprise-standard shell automation.'
        }
      },
      blockDiagram: {
        title: 'Core System Variables Matrix',
        subtitle: 'Key variables populated at login:',
        nodes: [
          { id: 'path', label: '$PATH', simpleDef: 'Tool directory list', techDef: 'Colon-separated binary lookup list (/usr/bin:/bin)', badge: 'Execution', color: '#38bdf8' },
          { id: 'home', label: '$HOME', simpleDef: 'Home folder path', techDef: 'User personal filesystem root (/home/username)', badge: 'Filesystem', color: '#10b981' },
          { id: 'user', label: '$USER', simpleDef: 'Login username', techDef: 'Effective username matching /etc/passwd record', badge: 'Identity', color: '#a855f7' },
          { id: 'pwd', label: '$PWD', simpleDef: 'Current folder', techDef: 'Current working directory tracked by bash internal chdir()', badge: 'Location', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: '$PATH', simple: 'A list of folders where Linux looks when you type a command name.', technical: 'Colon-separated string of directories searched sequentially by the shell to resolve command binaries.' },
        { term: '$HOME', simple: 'The path to your personal home directory (~).', technical: 'Environment variable defining the primary user directory where dotfiles and personal files live.' }
      ],
      syntaxCode: 'echo "PATH: $PATH" && echo "HOME: $HOME"',
      syntaxTokens: [
        { token: 'echo', role: 'command', explanation: 'Print text and expanded variables to standard output' },
        { token: '"PATH: $PATH"', role: 'argument', explanation: 'String expanding the $PATH environment variable' },
        { token: '&&', role: 'operator', explanation: 'Execute next command sequentially' },
        { token: 'echo "HOME: $HOME"', role: 'command', explanation: 'String expanding the $HOME environment variable' }
      ],
      variations: [
        { command: 'echo "User: $USER, Shell: $SHELL, PWD: $PWD"', description: 'Display user identity, shell, and working directory in one line' },
        { command: 'echo $PATH | tr ":" "\\n"', description: 'Format $PATH into a clean, vertical line-by-line list for easy reading' }
      ],
      expectedOutput: 'PATH: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\nHOME: /home/ubuntu',
      commonMistakes: [
        { mistake: 'Assuming $SHELL reflects the shell currently running in the active terminal', whyWrong: '$SHELL reflects your default login shell in /etc/passwd; if you launch zsh from bash, $SHELL remains /bin/bash.', correctWay: 'Inspect "echo $0" to see the currently running active shell process.' },
        { mistake: 'Modifying $HOME manually in a script', whyWrong: 'Changing $HOME can cause configuration files, history, and SSH keys to write to unintended locations.', correctWay: 'Treat $HOME as an immutable reference path set by login.' }
      ],
      safeRecovery: 'To view all standard variables formatted cleanly, run "env | sort | head -n 20".'
    }),

    buildLinuxConcept({
      id: 'c-17-05',
      subChapterNumber: '17.5',
      command: 'export PATH="$HOME/.local/bin:$PATH"',
      title: 'Modifying the $PATH Variable',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment & Shell Configuration',
      subtitle: 'Extending binary lookup paths: prepending custom toolchains, pip/cargo directories, and avoiding footguns',
      badges: ['PATH', 'Binaries', 'Toolchain'],
      difficulty: 'Beginner',
      quote: 'When you type "ls", Linux does not search the whole hard drive: it checks directories in $PATH from left to right.',
      whatIsIt: 'When you type a command without an absolute path (like "python3" instead of "/usr/bin/python3"), the shell splits the $PATH environment variable by colons (":") and checks each directory in order from left to right. The first matching executable found is executed. When installing modern user-space tools (via pip, cargo, npm, or go), binaries land in ~/.local/bin or ~/go/bin. To run these tools by name, administrators prepend the new directory: export PATH="$HOME/.local/bin:$PATH".',
      inSimpleWords: 'Adding a new folder to Linux\'s shortcut list. If you install a custom program in your personal folder, adding it to $PATH lets you launch it just by typing its name from anywhere.',
      whyDoYouNeedIt: 'Modern developer tools (Rust/cargo, Python/pip, Go, Terraform) install CLI binaries into custom user directories. Without updating $PATH, you get "command not found" even though the program is installed.',
      realWorldScenario: 'You install AWS CLI or Poetry using pipx. The binary installs to ~/.local/bin. You add \'export PATH=\"$HOME/.local/bin:$PATH\"\' to ~/.bashrc, allowing you to run "poetry" directly from any folder.',
      realWorldAnalogy: 'Adding a new contact to your phone\'s favorites list so you can call them with one tap instead of dialing the full 10-digit number.',
      withoutVsWith: {
        without: {
          title: 'Unmodified Default $PATH',
          items: ['Must type full path (/home/ubuntu/.local/bin/mytool) every time you run user-installed tools', '"command not found" errors immediately after installing packages via pip or cargo', 'Build scripts failing because required compilers are not in standard system folders'],
          outcome: 'Typing friction, broken toolchains, and developer frustration.'
        },
        with: {
          title: 'Configured $PATH with Custom Toolchains',
          items: ['Instant command execution: type "mytool" from any directory on the system', 'Left-to-right precedence allowing newer local tools to override outdated distro binaries', 'Clean, persistent integration defined once in ~/.bashrc'],
          outcome: 'Streamlined developer workflow and instant command discovery.'
        }
      },
      blockDiagram: {
        title: '$PATH Resolution Order (Left to Right)',
        subtitle: 'How Linux resolves the command "python3":',
        nodes: [
          { id: 'dir1', label: '1. $HOME/.local/bin', simpleDef: 'Checks personal tools', techDef: 'Checks /home/user/.local/bin/python3 (Matches! -> EXECUTES)', badge: 'Match 1', color: '#10b981' },
          { id: 'dir2', label: '2. /usr/local/bin', simpleDef: 'Checks admin tools', techDef: 'Skipped because earlier match was found', badge: 'Skipped', color: '#64748b' },
          { id: 'dir3', label: '3. /usr/bin', simpleDef: 'Checks distro tools', techDef: 'Default system python3 ignored in favor of custom version', badge: 'Shadowed', color: '#64748b' }
        ]
      },
      terms: [
        { term: 'Prepending', simple: 'Adding a folder to the FRONT of $PATH ($NEW:$PATH) so your custom tool runs first.', technical: 'Placing custom directory at index 0 so it takes precedence over default system directories.' },
        { term: 'which / type', simple: 'Commands that tell you which exact file path runs when you type a command name.', technical: '"type -a cmd" inspects builtins, aliases, and file paths searched via $PATH.' }
      ],
      syntaxCode: 'export PATH="$HOME/.local/bin:$PATH"',
      syntaxTokens: [
        { token: 'export', role: 'command', explanation: 'Promote variable change to environment' },
        { token: 'PATH=', role: 'argument', explanation: 'Target environment variable name' },
        { token: '"$HOME/.local/bin:$PATH"', role: 'path', explanation: 'Prepend ~/.local/bin followed by colon separator and existing $PATH contents' }
      ],
      variations: [
        { command: 'export PATH="$HOME/.local/bin:$PATH"', description: 'Prepend directory to $PATH (takes highest priority)' },
        { command: 'export PATH="$PATH:/opt/custom/bin"', description: 'Append directory to end of $PATH (fallback priority)' },
        { command: 'which python3', description: 'Show the exact binary path currently resolved by $PATH' }
      ],
      expectedOutput: '(Executes silently; verify with "echo $PATH | grep \'.local/bin\'")',
      commonMistakes: [
        { mistake: 'Overwriting $PATH without including existing $PATH (e.g. export PATH="/my/dir")', whyWrong: 'You just wiped out /usr/bin and /bin! Every command (ls, cat, sudo, cp) will immediately fail with "command not found"!', correctWay: 'ALWAYS include ":$PATH" (e.g. export PATH="/my/dir:$PATH").' },
        { mistake: 'Adding "." (current directory) to $PATH', whyWrong: 'Having "." in $PATH is a critical security vulnerability: if you cd into /tmp and type "ls", a malicious script named "ls" could execute as root.', correctWay: 'NEVER put "." in $PATH; execute local scripts explicitly with "./script.sh".' }
      ],
      safeRecovery: 'If you accidentally broke your $PATH and commands won\'t run, restore standard system PATH with: "export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin".'
    }),

    buildLinuxConcept({
      id: 'c-17-06',
      subChapterNumber: '17.6',
      command: 'ls -la ~/.bashrc /etc/profile',
      title: 'Shell Startup Files Lifecycle (/etc/profile, ~/.bash_profile, ~/.bashrc)',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment & Shell Configuration',
      subtitle: 'The initialization cascade: system-wide vs user configs, and login vs non-login execution order',
      badges: ['bashrc', 'profile', 'Startup', 'Lifecycle'],
      difficulty: 'Intermediate',
      quote: 'Understanding the shell startup cascade solves the classic mystery: why did my environment variable work in SSH but fail in cron?',
      whatIsIt: 'When Bash starts, it executes specific startup script files depending on how it was invoked. System-wide settings reside in /etc/profile and /etc/bash.bashrc (or /etc/bashrc on RHEL), followed by modular drop-ins in /etc/profile.d/*.sh. User-specific settings reside in the user\'s home directory: ~/.bash_profile (or ~/.profile) for Login Shells, and ~/.bashrc for Interactive Non-Login Shells. Standard practice has ~/.bash_profile source ~/.bashrc so settings apply in both modes.',
      inSimpleWords: 'The morning routine for your terminal. When you open a terminal window or log in via SSH, Linux reads these files one by one to set up your prompt, load your shortcuts, and prepare your environment.',
      whyDoYouNeedIt: 'You need to know where to put aliases, environment variables, and functions so they are available when you log in, without breaking automated non-interactive scripts or SSH remote commands.',
      realWorldScenario: 'You added an alias to ~/.bash_profile and wonder why it doesn\'t work in new terminal tabs inside VS Code. VS Code opens non-login shells, which read ~/.bashrc instead. Moving the alias to ~/.bashrc fixes it everywhere.',
      realWorldAnalogy: 'A company handbook: /etc/profile is the company-wide dress code for all employees; ~/.bashrc is how you organize your own personal desk drawers.',
      withoutVsWith: {
        without: {
          title: 'Blind Startup Script Editing',
          items: ['Variables disappearing when switching between SSH logins and desktop terminal tabs', 'Putting heavy, interactive echo scripts in ~/.bashrc that break scp and rsync transfers', 'Accidentally breaking shell initialization for all users by corrupting /etc/profile'],
          outcome: 'Inconsistent environments and broken remote copy tools.'
        },
        with: {
          title: 'Clean Startup File Architecture',
          items: ['Aliases and shell functions placed cleanly in ~/.bashrc', 'Environment variables exported consistently across all login modes', 'Modular system-wide configurations managed cleanly in /etc/profile.d/*.sh'],
          outcome: 'Predictable, consistent shell environments across all terminal types.'
        }
      },
      blockDiagram: {
        title: 'Bash Startup Initialization Order',
        subtitle: 'File execution cascade for interactive login shells:',
        nodes: [
          { id: 'etc_prof', label: '1. /etc/profile', simpleDef: 'System-wide login', techDef: 'Executes system-wide environment & runs /etc/profile.d/*.sh', badge: 'System Login', color: '#38bdf8' },
          { id: 'usr_prof', label: '2. ~/.bash_profile or ~/.profile', simpleDef: 'User personal login', techDef: 'Checks for ~/.bash_profile, then ~/.bash_login, then ~/.profile (first found wins)', badge: 'User Login', color: '#10b981' },
          { id: 'usr_rc', label: '3. ~/.bashrc (Sourced)', simpleDef: 'User interactive config', techDef: '~/.bash_profile explicitly sources ~/.bashrc to load aliases/functions', badge: 'User RC', color: '#a855f7' }
        ]
      },
      terms: [
        { term: '~/.bashrc', simple: 'The main configuration file for your interactive Bash terminal.', technical: 'Run Commands file executed for interactive non-login shells (and sourced by login shells).' },
        { term: '/etc/profile.d/', simple: 'A folder where applications drop system-wide environment scripts.', technical: 'Drop-in directory containing *.sh scripts sourced automatically by /etc/profile.' }
      ],
      syntaxCode: 'ls -la ~/.bashrc /etc/profile',
      syntaxTokens: [
        { token: 'ls -la', role: 'command', explanation: 'List directory entries with detailed file attributes' },
        { token: '~/.bashrc', role: 'path', explanation: 'User-specific bash runtime configuration file' },
        { token: '/etc/profile', role: 'path', explanation: 'System-wide login initialization script' }
      ],
      variations: [
        { command: 'ls -la ~/.bash* ~/.profile', description: 'List all user shell configuration files in home directory' },
        { command: 'source ~/.bashrc', description: 'Reload ~/.bashrc immediately into current active shell without reopening terminal' },
        { command: 'ls /etc/profile.d/', description: 'List modular system-wide shell scripts' }
      ],
      expectedOutput: '-rw-r--r-- 1 root   root    581 Jan  1  2024 /etc/profile\n-rw-r--r-- 1 ubuntu ubuntu 3771 Sep 30 00:00 /home/ubuntu/.bashrc',
      commonMistakes: [
        { mistake: 'Adding interactive commands (like "echo Hello" or neofetch) at the very top of ~/.bashrc', whyWrong: 'Printing text during non-interactive sessions breaks scp, sftp, and rsync with "protocol mismatch" errors!', correctWay: 'Keep echo statements guarded behind "[ -z \"$PS1\" ] && return" checks.' },
        { mistake: 'Rebooting the server just to apply changes made to ~/.bashrc', whyWrong: 'Bash files only load when a shell opens; rebooting the server is completely unnecessary.', correctWay: 'Run "source ~/.bashrc" to reload settings instantly in your active shell.' }
      ],
      safeRecovery: 'If a typo in ~/.bashrc makes your shell crash on startup, log in via "ssh -t user@host bash --noprofile --norc" to fix the file.'
    }),

    buildLinuxConcept({
      id: 'c-17-07',
      subChapterNumber: '17.7',
      command: 'echo $-',
      title: 'Login vs Non-Login Shells',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment & Shell Configuration',
      subtitle: 'Distinguishing shell invocation modes: the initial login authentication shell vs spawned subshells',
      badges: ['Login', 'Non-Login', 'Invocation'],
      difficulty: 'Intermediate',
      quote: 'A login shell asks for your identity and reads /etc/profile; a non-login shell inherits the environment and skips straight to work.',
      whatIsIt: 'Bash operates in one of two major modes: 1) A Login Shell is the initial shell session created after a successful user authentication (e.g. logging in via SSH, virtual console TTY, or "su - user"). In login mode, bash names itself with a leading hyphen (e.g. "-bash" in ps) and executes /etc/profile and ~/.bash_profile; 2) A Non-Login Shell is any subshell spawned after login (e.g. opening a new tab in a terminal emulator, running a subshell script, or typing "bash"). Non-login shells skip profile files and execute ~/.bashrc directly.',
      inSimpleWords: 'A Login Shell is when you walk through the main entrance of a building and show your security badge. A Non-Login Shell is when you are already inside the building and simply walk from one room into another.',
      whyDoYouNeedIt: 'Understanding this distinction prevents bugs where variables work when you SSH in, but fail when launching GUI terminal tabs or executing remote SSH commands (ssh user@host "cmd").',
      realWorldScenario: 'An Ansible deployment task executes commands remotely via SSH non-login mode. It fails because pyenv or nvm path exports were placed in ~/.bash_profile instead of ~/.bashrc. Moving the path exports to ~/.bashrc resolves the issue.',
      realWorldAnalogy: 'Checking into a hotel at the front desk (Login Shell) vs walking into the hotel fitness center with your already-issued room key (Non-Login Shell).',
      withoutVsWith: {
        without: {
          title: 'Confusion Over Shell Invocation Modes',
          items: ['Variables configured in ~/.profile missing in GUI terminal windows', 'Automated remote SSH scripts failing due to missing PATH settings', 'Unaware of how "su user" differs fundamentally from "su - user"'],
          outcome: 'Inconsistent behavior across different terminal launch methods.'
        },
        with: {
          title: 'Mastering Login vs Non-Login Execution',
          items: ['Precise placement of environment exports in ~/.bashrc sourced by both modes', 'Correct use of "su - user" to simulate full authentic login environments', 'Deterministic automation execution across interactive and non-interactive workflows'],
          outcome: 'Rock-solid environment reproducibility across all session types.'
        }
      },
      blockDiagram: {
        title: 'Login vs Non-Login Invocation',
        subtitle: 'How Bash identifies its operating mode:',
        nodes: [
          { id: 'ssh', label: 'SSH / Console Login', simpleDef: 'Login Shell', techDef: 'Process name: "-bash" (leading hyphen). Reads /etc/profile & ~/.bash_profile', badge: 'Login Mode', color: '#10b981' },
          { id: 'tab', label: 'New Terminal Tab / "bash"', simpleDef: 'Non-Login Shell', techDef: 'Process name: "bash" (no hyphen). Skips profile, reads ~/.bashrc', badge: 'Non-Login Mode', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'Login Shell', simple: 'The first shell that starts when you enter your password or key to log in.', technical: 'First process spawned after authentication; reads profile initialization files.' },
        { term: 'su vs su -', simple: '"su -" gives you a full clean login shell; plain "su" keeps your current old environment.', technical: '"su -" invokes a login shell simulating full login; "su" retains caller environment variables.' }
      ],
      syntaxCode: 'echo $-',
      syntaxTokens: [
        { token: 'echo', role: 'command', explanation: 'Print to standard output' },
        { token: '$-', role: 'argument', explanation: 'Special Bash parameter displaying all currently enabled shell flag options (e.g. "himBH")' }
      ],
      variations: [
        { command: 'shopt login_shell', description: 'Query whether current shell is a login shell (on or off)' },
        { command: 'echo $0', description: 'Display shell process name (starts with "-" if it is a login shell, e.g. "-bash")' },
        { command: 'su - username', description: 'Switch user and initialize a complete, fresh login shell environment' }
      ],
      expectedOutput: 'login_shell off',
      commonMistakes: [
        { mistake: 'Using "su root" instead of "su - root"', whyWrong: 'Plain "su root" keeps your regular user\'s PATH and environment, leading to permission and binary lookup bugs.', correctWay: 'Always use "su - root" (or "sudo -i") for a clean, authentic root login shell.' },
        { mistake: 'Putting aliases in ~/.bash_profile instead of ~/.bashrc', whyWrong: 'Aliases in ~/.bash_profile will NOT be available in newly spawned subshells or desktop terminal tabs.', correctWay: 'Place aliases inside ~/.bashrc.' }
      ],
      safeRecovery: 'To test whether your current shell is a login shell, run "shopt login_shell".'
    }),

    buildLinuxConcept({
      id: 'c-17-08',
      subChapterNumber: '17.8',
      command: '[ -t 0 ] && echo "interactive" || echo "non-interactive"',
      title: 'Interactive vs Non-Interactive Shells',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment & Shell Configuration',
      subtitle: 'TTY detection: human terminal sessions with prompts vs automated scripts reading stdin',
      badges: ['Interactive', 'TTY', 'Scripts'],
      difficulty: 'Intermediate',
      quote: 'An interactive shell talks to a human; a non-interactive shell executes a script without prompts or terminal noise.',
      whatIsIt: 'In addition to the login distinction, a shell is either Interactive or Non-Interactive: 1) An Interactive Shell is connected to a human user via a terminal (TTY/PTY). It displays a prompt ($PS1), enables job control (Ctrl+C, Ctrl+Z), records command history, and allows tab-completion; 2) A Non-Interactive Shell is spawned to execute a shell script (e.g. bash myscript.sh) or automated pipeline. It has no controlling terminal, displays no prompt, disables job control, and exits immediately when the script finishes.',
      inSimpleWords: 'Interactive is when a human is sitting at the keyboard typing. Non-interactive is when Linux is running a script in the background by itself with no human watching.',
      whyDoYouNeedIt: 'Automation scripts and cron jobs run non-interactively. If your script prompts for user confirmation (read -p) in a non-interactive shell, it will freeze or fail.',
      realWorldScenario: 'You are writing a deployment script that runs both locally and on headless GitHub Actions CI/CD runners. You use "[ -t 0 ]" to detect whether a human is present to answer prompts or if the script must run non-interactively with default answers.',
      realWorldAnalogy: 'Having a live conversation with a customer service agent (interactive) vs sending an automated email contact form (non-interactive).',
      withoutVsWith: {
        without: {
          title: 'Assuming All Shells Have Terminals',
          items: ['Scripts freezing in CI/CD pipelines waiting for human keyboard input that never comes', 'Terminal escape color codes corrupting automated log files', 'Interactive prompts breaking automated cron jobs'],
          outcome: 'Hanging CI/CD pipelines and broken background automation.'
        },
        with: {
          title: 'TTY-Aware Shell Scripting',
          items: ['Programmatic terminal detection using "[ -t 0 ]" or checking for "i" in "$-"', 'Graceful automated fallback to non-interactive mode in CI/CD and cron', 'Suppressing prompts and colored escape codes when stdout is redirected to a file'],
          outcome: 'Bulletproof automation that runs cleanly anywhere.'
        }
      },
      blockDiagram: {
        title: 'TTY Terminal Detection',
        subtitle: 'How scripts detect human interactive terminals:',
        nodes: [
          { id: 'tty_check', label: '[ -t 0 ] (Is stdin a TTY?)', simpleDef: 'Checks file descriptor 0', techDef: 'isatty(0) system call checks if fd 0 is a character device', badge: 'Detection', color: '#38bdf8' },
          { id: 'human', label: 'If True: Human at Keyboard', simpleDef: 'Interactive Session', techDef: 'Displays colored prompts, enables tab completion, accepts input', badge: 'Interactive', color: '#10b981' },
          { id: 'bot', label: 'If False: Script / Pipe / Cron', simpleDef: 'Automated Runner', techDef: 'Suppresses prompts, disables colors, assumes non-interactive defaults', badge: 'Non-Interactive', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'TTY / PTY', simple: 'Teletype / Pseudo-Terminal: the virtual screen device connecting your keyboard to Linux.', technical: 'Bidirectional character device driver connecting a terminal emulator to a shell.' },
        { term: '$- flags (includes "i")', simple: 'If the letter "i" appears in "$-", the shell is running in interactive mode.', technical: 'Special parameter containing active shell option flags; "i" signifies interactive.' }
      ],
      syntaxCode: '[ -t 0 ] && echo "interactive" || echo "non-interactive"',
      syntaxTokens: [
        { token: '[ -t 0 ]', role: 'command', explanation: 'Test whether file descriptor 0 (standard input) is open and associated with a terminal' },
        { token: '&& echo "interactive"', role: 'operator', explanation: 'Output "interactive" if stdin is a live TTY terminal' },
        { token: '|| echo "non-interactive"', role: 'operator', explanation: 'Fallback output if stdin is a pipe, file, or background script' }
      ],
      variations: [
        { command: '[[ $- == *i* ]] && echo "Interactive" || echo "Non-interactive"', description: 'Check if shell is interactive using bash option string' },
        { command: 'tty', description: 'Print the filename of the terminal connected to standard input (e.g. /dev/pts/0)' }
      ],
      expectedOutput: 'interactive',
      commonMistakes: [
        { mistake: 'Adding "read -p" user confirmation prompts in scripts intended for cron or CI/CD', whyWrong: 'In non-interactive environments, stdin is closed or redirected, causing "read" to fail or hang.', correctWay: 'Add a "-y" or "--non-interactive" flag to scripts that bypasses confirmation prompts.' },
        { mistake: 'Forgetting that top of ~/.bashrc guards against non-interactive execution', whyWrong: 'Ubuntu\'s default ~/.bashrc has "[ -z \"$PS1\" ] && return" at line 5; code added above that line runs everywhere, code below runs only for humans.', correctWay: 'Place interactive aliases below the guard check.' }
      ],
      safeRecovery: 'To check terminal type anytime, run "tty". If it outputs "not a tty", the session is non-interactive.'
    }),

    buildLinuxConcept({
      id: 'c-17-09',
      subChapterNumber: '17.9',
      command: 'alias ll=\'ls -la\' && alias ll',
      title: 'Shell Aliases (alias, unalias)',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment & Shell Configuration',
      subtitle: 'Command shortcuts: simplifying repetitive flags, safety guardrails (rm -i), and unaliasing',
      badges: ['alias', 'Productivity', 'Shortcuts'],
      difficulty: 'Beginner',
      quote: 'An alias is your personal shorthand: replace tedious 50-character commands with an intuitive 2-letter keystroke.',
      whatIsIt: 'The "alias" command allows operators to define custom command abbreviations and shorthand shortcuts inside the shell. When the shell parses a command, it checks the first word against its internal alias table; if a match is found, the word is replaced by the defined string before execution. Aliases are commonly used for convenience (e.g. alias k=kubectl), adding safety flags (e.g. alias rm="rm -i"), or enabling colored output by default (e.g. alias grep="grep --color=auto").',
      inSimpleWords: 'A nickname for a command. Instead of typing "ls -la --color=auto" fifty times a day, you create an alias so you only have to type "ll".',
      whyDoYouNeedIt: 'Typing efficiency and muscle memory. In Kubernetes administration, typing "k get pods" instead of "kubectl get pods" saves thousands of keystrokes every week.',
      realWorldScenario: 'You frequently administer Git repositories. You set "alias gs=\'git status\'" and "alias gp=\'git pull\'", accelerating your daily command line development speed significantly.',
      realWorldAnalogy: 'Text message shorthand: typing "BRB" instead of "Be right back".',
      withoutVsWith: {
        without: {
          title: 'Manual Full Command Typing',
          items: ['Typing repetitive command flag combinations (ls -la --color=auto) hundreds of times daily', 'Accidental catastrophic deletions because safety flags (rm -i) were omitted', 'High typing friction and slower operational speed'],
          outcome: 'Typing fatigue, slower velocity, and higher error risk.'
        },
        with: {
          title: 'Streamlined Navigation with Aliases',
          items: ['Instant 2-letter shortcuts for complex commands (ll, gs, k, dc)', 'Built-in safety guardrails (alias rm="rm -i") prompting before destructive overwrites', 'Personalized shell environment tailored to your exact workflow'],
          outcome: 'Maximum typing velocity, fewer typos, and improved safety.'
        }
      },
      blockDiagram: {
        title: 'Shell Alias Expansion',
        subtitle: 'How Bash expands aliases before execution:',
        nodes: [
          { id: 'input', label: 'User types: "ll"', simpleDef: 'Short command', techDef: 'Shell scanner reads first token "ll"', badge: 'Input', color: '#38bdf8' },
          { id: 'lookup', label: 'Alias Table Lookup', simpleDef: 'Checks alias list', techDef: 'Matches "ll" in bash alias hash table', badge: 'Lookup', color: '#10b981' },
          { id: 'expand', label: 'Expanded: "ls -la"', simpleDef: 'Replaces with full command', techDef: 'Replaces token with "ls -la" and passes to parser', badge: 'Expansion', color: '#a855f7' },
          { id: 'exec', label: 'Executes /bin/ls -la', simpleDef: 'Runs binary', techDef: 'fork() and execve() execute ls binary with flags', badge: 'Execution', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'alias', simple: 'A shell shortcut that replaces one word with another command string.', technical: 'Bash builtin defining word replacement rules during early lexical analysis.' },
        { term: 'unalias', simple: 'Removes an existing alias so the command behaves normally again.', technical: 'Bash builtin deleting specified name from internal alias hash table.' }
      ],
      syntaxCode: 'alias ll=\'ls -la\' && alias ll',
      syntaxTokens: [
        { token: 'alias', role: 'command', explanation: 'Define or display aliases' },
        { token: 'll=\'ls -la\'', role: 'argument', explanation: 'Map shortcut name "ll" to command string "ls -la" (no spaces around =)' },
        { token: '&&', role: 'operator', explanation: 'Execute next command sequentially' },
        { token: 'alias ll', role: 'command', explanation: 'Print the definition of the newly created "ll" alias' }
      ],
      variations: [
        { command: 'alias', description: 'List all currently defined aliases in the active shell session' },
        { command: 'alias k="kubectl"', description: 'Create shorthand for Kubernetes CLI' },
        { command: 'unalias ll', description: 'Remove the "ll" alias' },
        { command: '\\ls', description: 'Bypass alias: prefixing with backslash forces raw binary execution, ignoring aliases' }
      ],
      expectedOutput: 'alias ll=\'ls -la\'',
      commonMistakes: [
        { mistake: 'Adding spaces around the equals sign in alias definitions (e.g. alias ll = "ls -la")', whyWrong: 'Bash will treat "ll" and "=" as separate arguments and throw a syntax error.', correctWay: 'Write with zero spaces: "alias ll=\'ls -la\'".' },
        { mistake: 'Expecting aliases defined in a terminal to exist in shell scripts', whyWrong: 'By default, non-interactive shell scripts disable alias expansion completely.', correctWay: 'Use shell functions or full command paths inside bash scripts.' }
      ],
      safeRecovery: 'To run a raw command and temporarily bypass any alias overriding it, prefix it with a backslash: "\\rm file.txt".'
    }),

    buildLinuxConcept({
      id: 'c-17-10',
      subChapterNumber: '17.10',
      command: 'grep -n "alias" ~/.bashrc | head -n 5',
      title: 'Persistent Configuration in ~/.bashrc',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment & Shell Configuration',
      subtitle: 'Making customizations permanent: organizing aliases, functions, exports, and history rules',
      badges: ['bashrc', 'Persistence', 'Config'],
      difficulty: 'Beginner',
      quote: 'If you type a command into your terminal, it dies when you close the window. Put it in ~/.bashrc and it lives forever.',
      whatIsIt: 'Commands run directly in a terminal only exist in that specific session\'s memory. To make environment variables, aliases, custom functions, and prompt customizations permanent across all future terminal sessions, you must add them to your user\'s "~/.bashrc" configuration file. Every time an interactive bash shell opens, it executes ~/.bashrc from top to bottom, restoring your personalized preferences.',
      inSimpleWords: 'Your personal settings notebook. Anything you write in this file stays saved permanently, so every time you open a new terminal window, your shortcuts and settings are ready to go.',
      whyDoYouNeedIt: 'Without ~/.bashrc, you would have to manually re-type your custom $PATH, aliases, and environment variables every single time you open a new terminal tab or SSH session.',
      realWorldScenario: 'You work with Docker and Kubernetes every day. You append "alias k=kubectl", "alias d=docker", and "export PATH=\"$HOME/bin:$PATH\"" to the bottom of ~/.bashrc so your development environment is instantly ready on every login.',
      realWorldAnalogy: 'Adjusting the driver\'s seat and mirrors in your personal car: you set them once, and they stay in your preferred position every time you get in.',
      withoutVsWith: {
        without: {
          title: 'Transient In-Memory Configurations',
          items: ['All custom aliases and variables erased the moment you close the terminal', 'Wasting 5 minutes re-configuring your environment on every new login', 'Inconsistent environments between different terminal windows'],
          outcome: 'Repetitive configuration friction and lost preferences.'
        },
        with: {
          title: 'Persistent Architecture in ~/.bashrc',
          items: ['Permanent, automatic restoration of all custom aliases and functions', 'Consistent developer experience across all terminal tabs and SSH sessions', 'Version-controllable "dotfiles" that can be synced across new server setups'],
          outcome: 'Zero configuration friction and instant personalized productivity.'
        }
      },
      blockDiagram: {
        title: 'Persistent Shell Configuration Flow',
        subtitle: 'From ~/.bashrc file edit to active shell session:',
        nodes: [
          { id: 'edit', label: '1. Edit ~/.bashrc', simpleDef: 'Add custom settings', techDef: 'echo "alias k=kubectl" >> ~/.bashrc writes to disk', badge: 'Disk', color: '#38bdf8' },
          { id: 'reload', label: '2. source ~/.bashrc', simpleDef: 'Reload immediately', techDef: 'Parses file into running shell without closing window', badge: 'Active Session', color: '#10b981' },
          { id: 'persist', label: '3. Future Terminal Sessions', simpleDef: 'Loads on every boot', techDef: 'Spawned shells execute ~/.bashrc automatically at startup', badge: 'Permanent', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'source (or .)', simple: 'A command that reloads a configuration file into your current terminal immediately.', technical: 'Bash builtin executing commands from a file in the current shell environment.' },
        { term: 'Dotfiles', simple: 'Configuration files starting with a dot (like .bashrc) that are hidden by default.', technical: 'Hidden user configuration files stored in $HOME used to customize Unix tools.' }
      ],
      syntaxCode: 'grep -n "alias" ~/.bashrc | head -n 5',
      syntaxTokens: [
        { token: 'grep -n', role: 'command', explanation: 'Search pattern and display matching line numbers' },
        { token: '"alias"', role: 'argument', explanation: 'Target keyword to locate' },
        { token: '~/.bashrc', role: 'path', explanation: 'Target user configuration file' },
        { token: '| head -n 5', role: 'argument', explanation: 'Limit output to first 5 matches' }
      ],
      variations: [
        { command: 'echo "alias myip=\'curl ipinfo.io/ip\'" >> ~/.bashrc', description: 'Safely append a new persistent alias to the end of ~/.bashrc' },
        { command: 'source ~/.bashrc', description: 'Reload ~/.bashrc immediately into current active shell' },
        { command: 'nano ~/.bashrc', description: 'Open ~/.bashrc in text editor for manual editing' }
      ],
      expectedOutput: '79:# some more ls aliases\n80:alias ll=\'ls -alF\'\n81:alias la=\'ls -A\'\n82:alias l=\'ls -CF\'',
      commonMistakes: [
        { mistake: 'Using a single ">" instead of double ">>" when adding to ~/.bashrc', whyWrong: 'A single ">" will completely overwrite and erase your entire ~/.bashrc file!', correctWay: 'ALWAYS use double ">>" to append safely to existing files.' },
        { mistake: 'Adding heavy slow network calls (like checking for updates) to ~/.bashrc', whyWrong: 'Slow network calls in ~/.bashrc will make every single new terminal tab take 5 seconds to open.', correctWay: 'Keep ~/.bashrc ultra-lean and local-only for sub-millisecond shell startup.' }
      ],
      safeRecovery: 'If you accidentally destroy your ~/.bashrc, restore the default factory template from "/etc/skel/.bashrc" using "cp /etc/skel/.bashrc ~/.bashrc".'
    }),

    buildLinuxConcept({
      id: 'c-17-11',
      subChapterNumber: '17.11',
      command: 'shopt -s autocd 2>/dev/null || shopt | head -n 5',
      title: 'Shell Options (set, shopt)',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment & Shell Configuration',
      subtitle: 'Tuning Bash internal behaviors: shopt quality-of-life toggles and "set -euo pipefail" script safety',
      badges: ['shopt', 'set', 'Shell Options'],
      difficulty: 'Intermediate',
      quote: 'set -euo pipefail is the golden rule of bash scripting: turn silent failures into immediate, safe terminations.',
      whatIsIt: 'Bash behavior is controlled by two configuration mechanisms: 1) "shopt" (Shell Options) manages quality-of-life interactive features like "autocd" (type a directory name to cd into it automatically), "globstar" (enables recursive ** globbing), and "cdspell" (minor typo autocorrection); 2) "set -o" manages core POSIX shell execution flags. In production bash scripting, the canonical safety header is "set -euo pipefail" (-e exits on errors, -u treats unset variables as errors, -o pipefail catches piped failures).',
      inSimpleWords: 'The settings menu for Bash. You can turn on cool features like auto-correcting directory typos, or turn on safety switches that stop your scripts from doing damage if an error happens.',
      whyDoYouNeedIt: 'Default bash will happily continue running a script even if a command fails, leading to disasters like "rm -rf $DIR/*" where an unset $DIR variable becomes "rm -rf /*". "set -u" completely prevents this disaster.',
      realWorldScenario: 'You are writing an infrastructure cleanup script. Adding "set -euo pipefail" at line 1 guarantees that if any command fails or any variable is undefined, the script aborts immediately before executing any destructive operations.',
      realWorldAnalogy: 'Installing emergency circuit breakers and an automatic kill switch on industrial factory machinery.',
      withoutVsWith: {
        without: {
          title: 'Default Loose Shell Behavior',
          items: ['Scripts continue executing blindly after critical command failures', 'Unset variables expand to empty strings, causing catastrophic unintended file deletions', 'Pipeline failures hidden: "failing_cmd | true" returns exit code 0'],
          outcome: 'Silent errors, corrupted data, and catastrophic script accidents.'
        },
        with: {
          title: 'Strict Production Mode (set -euo pipefail)',
          items: ['Immediate script termination upon any non-zero exit code (-e)', 'Immediate abort if an unset/undefined variable is dereferenced (-u)', 'Pipeline errors caught: returns failure code if any piped step fails (pipefail)'],
          outcome: 'Fail-fast safety, bulletproof automation, and predictable scripts.'
        }
      },
      blockDiagram: {
        title: 'The "set -euo pipefail" Safety Shield',
        subtitle: 'What the 3 essential script flags do:',
        nodes: [
          { id: 'e', label: 'set -e (errexit)', simpleDef: 'Exit on error', techDef: 'Exit immediately if any command returns a non-zero exit status', badge: 'Error Exit', color: '#ef4444' },
          { id: 'u', label: 'set -u (nounset)', simpleDef: 'Treat unset vars as error', techDef: 'Treat unset variables and parameters as an error, exiting immediately', badge: 'No Unset', color: '#f59e0b' },
          { id: 'pipe', label: 'set -o pipefail', simpleDef: 'Catch pipe errors', techDef: 'Return value of pipeline is the status of the last command to exit with non-zero', badge: 'Pipe Safety', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'shopt', simple: 'Shell Options: toggles advanced Bash-specific features on or off.', technical: 'Bash builtin controlling optional shell behavior flags via -s (set) or -u (unset).' },
        { term: 'pipefail', simple: 'Ensures that if ANY command in a pipeline fails, the whole pipeline is considered a failure.', technical: 'Shell option causing pipeline return status to reflect the rightmost non-zero exit code.' }
      ],
      syntaxCode: 'shopt -s autocd 2>/dev/null || shopt | head -n 5',
      syntaxTokens: [
        { token: 'shopt', role: 'command', explanation: 'Set and unset shell option flags' },
        { token: '-s', role: 'option', explanation: 'Enable (set) specified shell option' },
        { token: 'autocd', role: 'argument', explanation: 'Option allowing directory traversal without typing "cd"' },
        { token: '|| shopt | head -n 5', role: 'operator', explanation: 'Fallback to list current shell options' }
      ],
      variations: [
        { command: 'shopt', description: 'List all available Bash shell options and their active on/off status' },
        { command: 'shopt -s cdspell', description: 'Enable automatic minor typo and capitalization correction for cd' },
        { command: 'shopt -s globstar', description: 'Enable recursive directory pattern matching with "**"' }
      ],
      expectedOutput: 'autocd         \ton\ncdspell        \toff\ncheckwinsize   \ton\ncmdhist        \ton\ncompat31       \toff',
      commonMistakes: [
        { mistake: 'Writing production bash scripts without "set -euo pipefail"', whyWrong: 'Without these flags, a failed "cd /tmp/backups" followed by "rm -rf *" will delete files in your root directory!', correctWay: 'Make "set -euo pipefail" the first line of every bash script you write.' },
        { mistake: 'Confusing "shopt" with "set"', whyWrong: '"set" is standard POSIX flags; "shopt" is Bash-specific extended configuration.', correctWay: 'Use "set" for POSIX script safety, "shopt" for interactive Bash conveniences.' }
      ],
      safeRecovery: 'To disable strict error exit in an interactive session, run "set +e".'
    }),

    buildLinuxConcept({
      id: 'c-17-12',
      subChapterNumber: '17.12',
      command: 'echo "Current PS1: $PS1"',
      title: 'Customizing the Shell Prompt ($PS1)',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment & Shell Configuration',
      subtitle: 'The primary prompt string: escape codes, git branch status, colors, and prompt engineering',
      badges: ['PS1', 'Prompt', 'Colors'],
      difficulty: 'Intermediate',
      quote: 'A senior engineer\'s prompt tells a story: red for production, green for dev, and the active Git branch always visible.',
      whatIsIt: 'The primary command line prompt is controlled by the "$PS1" (Prompt String 1) environment variable. Bash evaluates $PS1 every time it prepares to display a prompt for user input. It supports special backslash-escaped characters such as: "\\u" (username), "\\h" (hostname), "\\w" (current working directory), "\\t" (24-hour time), and "\\$" ("#" for root, "$" for regular users). Using ANSI escape sequences, operators can color-code prompts (e.g. bold red for production servers to prevent accidental commands).',
      inSimpleWords: 'The text that appears before your blinking cursor. You can customize it to show your username, what folder you are in, what time it is, and even color it bright red when logged into production servers.',
      whyDoYouNeedIt: 'Accidental commands on production servers cause catastrophic outages. Making the prompt bright red with "[PROD]" on production servers alerts engineers instantly to exercise extreme caution.',
      realWorldScenario: 'You administer 100 cloud instances. On staging servers, you set PS1 to green. On production servers, you set PS1 to bright bold red. You never accidentally drop a production database thinking you were in staging.',
      realWorldAnalogy: 'Wearing a bright fluorescent safety vest when working on an active construction site.',
      withoutVsWith: {
        without: {
          title: 'Generic Default Prompt',
          items: ['Identical "user@host:~$" prompt on both dev and production servers', 'Accidentally executing destructive database commands on live production', 'Need to run "pwd" or "git branch" repeatedly to know where you are standing'],
          outcome: 'Accidental production outages and lost operational context.'
        },
        with: {
          title: 'Context-Aware Engineered Prompt',
          items: ['Bright visual indicators differentiating production vs development environments', 'Current Git branch and dirty status displayed directly in the prompt', 'Exit status indicator turning the prompt arrow red if the previous command failed'],
          outcome: 'Zero production confusion, immediate context, and high situational awareness.'
        }
      },
      blockDiagram: {
        title: 'PS1 Escape Sequence Breakdown',
        subtitle: 'Decoding a production prompt: "\\[\\e[32m\\]\\u@\\h:\\[\\e[34m\\]\\w\\[\\e[0m\\]\\$ ":',
        nodes: [
          { id: 'u', label: '\\u', simpleDef: 'Username', techDef: 'Expands to current effective username', badge: 'User', color: '#38bdf8' },
          { id: 'h', label: '\\h', simpleDef: 'Hostname', techDef: 'Expands to hostname up to the first dot', badge: 'Host', color: '#10b981' },
          { id: 'w', label: '\\w', simpleDef: 'Full Path', techDef: 'Expands to $PWD with $HOME abbreviated as ~', badge: 'Path', color: '#a855f7' },
          { id: 'dollar', label: '\\$', simpleDef: 'Privilege Symbol', techDef: 'Prints "#" if root (UID 0), "$" for unprivileged user', badge: 'Privilege', color: '#ef4444' }
        ]
      },
      terms: [
        { term: '$PS1', simple: 'Prompt String 1: the main text displayed at the start of your terminal command line.', technical: 'Primary prompt string variable parsed by bash for escape sequences and expansions.' },
        { term: '\\[ and \\]', simple: 'Special brackets used to wrap color codes so the cursor doesn\'t glitch when you type long commands.', technical: 'Informs Readline library that enclosed characters are non-printing for line wrapping calculation.' }
      ],
      syntaxCode: 'echo "Current PS1: $PS1"',
      syntaxTokens: [
        { token: 'echo', role: 'command', explanation: 'Print to standard output' },
        { token: '"Current PS1: $PS1"', role: 'argument', explanation: 'Print the raw escape code string of the active PS1 prompt' }
      ],
      variations: [
        { command: 'export PS1="\\u@\\h:\\w\\$ "', description: 'Set clean standard user@host:path prompt' },
        { command: 'export PS1="\\[\\033[01;31m\\][PROD] \\u@\\h:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ "', description: 'Set bold red "[PROD]" alert prompt for production servers' }
      ],
      expectedOutput: 'Current PS1: \\[\\e]0;\\u@\\h: \\w\\a\\]${debian_chroot:+($debian_chroot)}\\[\\033[01;32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ ',
      commonMistakes: [
        { mistake: 'Omitting "\\[" and "\\]" around ANSI color codes in PS1', whyWrong: 'Bash will miscalculate the screen line length, causing backspace and arrow keys to scramble terminal text!', correctWay: 'ALWAYS wrap non-printing color escape codes in "\\[" and "\\]".' },
        { mistake: 'Setting a complex script in PS1 that runs slow commands on every keystroke', whyWrong: 'Running a slow git or network command in PS1 will make your terminal lag on every press of the Enter key.', correctWay: 'Keep prompt calculations lean or use pre-compiled prompt engines like Starship.' }
      ],
      safeRecovery: 'If your prompt becomes scrambled, reset it to the default immediately with: "export PS1=\'\\u@\\h:\\w\\$ \'".'
    }),

    buildLinuxConcept({
      id: 'c-17-13',
      subChapterNumber: '17.13',
      command: 'echo "HISTSIZE: $HISTSIZE"',
      title: 'Command History Configuration (HISTSIZE, HISTFILESIZE, HISTCONTROL)',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment & Shell Configuration',
      subtitle: 'Auditing past commands: buffer sizes, ignoring duplicates, timestamps, and space-prefix hiding',
      badges: ['History', 'HISTSIZE', 'Audit'],
      difficulty: 'Beginner',
      quote: 'Your shell history is your operational memory: configure timestamps and history size so you never forget how you solved a bug.',
      whatIsIt: 'Bash tracks previously executed commands in memory and writes them to ~/.bash_history upon shell exit. Three primary environment variables govern this behavior: 1) "HISTSIZE" controls how many commands are kept in active RAM memory; 2) "HISTFILESIZE" controls how many lines are stored in ~/.bash_history on disk; 3) "HISTCONTROL=ignoredups:ignorespace" prevents duplicate consecutive commands from flooding history and allows operators to hide commands containing sensitive passwords simply by starting the command with a leading space.',
      inSimpleWords: 'The memory of everything you ever typed. You can configure it to remember 50,000 commands, record the exact date and time each command was run, and keep secrets out of history.',
      whyDoYouNeedIt: 'Post-incident analysis requires knowing: "Who ran what command at 3:15 AM?" Configuring HISTTIMEFORMAT transforms raw history into an indisputable, timestamped audit log.',
      realWorldScenario: 'You are investigating an outage where a database was accidentally dropped. Because you configured "HISTTIMEFORMAT=\"%F %T \"", running "history" proves the command was executed at 14:22:01 UTC by user deploy.',
      realWorldAnalogy: 'A security camera video log with timestamp overlays recorded onto a high-capacity digital DVR.',
      withoutVsWith: {
        without: {
          title: 'Default Minimal History Configuration',
          items: ['Limited to 500 lines; valuable past commands discarded after a few weeks', 'No timestamps, making it impossible to know when a command was executed during post-mortems', 'Duplicate entries (e.g. 50 "ls" in a row) wiping out meaningful history'],
          outcome: 'Lost operational memory and difficult incident post-mortems.'
        },
        with: {
          title: 'Configured Enterprise History',
          items: ['High capacity (HISTSIZE=50000, HISTFILESIZE=100000) preserving years of commands', 'Accurate timestamps (HISTTIMEFORMAT="%F %T ") for security compliance audits', 'Secret protection: typing a leading space hides commands from ~/.bash_history'],
          outcome: 'Indisputable audit trails, instant knowledge recall, and password privacy.'
        }
      },
      blockDiagram: {
        title: 'Bash History Lifecycle',
        subtitle: 'From live terminal buffer to persistent disk file:',
        nodes: [
          { id: 'ram', label: 'In-Memory History Buffer', simpleDef: 'Active terminal RAM', techDef: 'Circular array of up to $HISTSIZE command strings', badge: 'RAM Buffer', color: '#38bdf8' },
          { id: 'ctrl', label: 'HISTCONTROL Filter', simpleDef: 'Privacy & duplicate filter', techDef: 'ignorespace hides commands starting with " "; ignoredups drops repeats', badge: 'Filter', color: '#10b981' },
          { id: 'disk', label: '~/.bash_history File', simpleDef: 'Persistent disk file', techDef: 'Appended upon session close, capped at $HISTFILESIZE lines', badge: 'Disk File', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'HISTCONTROL=ignorespace', simple: 'If you type a space before a command (" mysql -psecret"), it won\'t be saved in history.', technical: 'Instructs Readline to discard lines beginning with whitespace from the history list.' },
        { term: 'HISTTIMEFORMAT', simple: 'A setting that adds exact dates and times to the "history" command output.', technical: 'strftime format string used by history builtin to timestamp executed commands.' }
      ],
      syntaxCode: 'echo "HISTSIZE: $HISTSIZE"',
      syntaxTokens: [
        { token: 'echo', role: 'command', explanation: 'Print to standard output' },
        { token: '"HISTSIZE: $HISTSIZE"', role: 'argument', explanation: 'Expand the HISTSIZE variable showing in-memory history capacity' }
      ],
      variations: [
        { command: 'export HISTTIMEFORMAT="%F %T "', description: 'Enable human-readable timestamps (YYYY-MM-DD HH:MM:SS) in history output' },
        { command: 'export HISTCONTROL=ignoreboth', description: 'Ignore both duplicate commands and commands starting with a leading space' },
        { command: 'history | tail -n 20', description: 'View the last 20 executed commands' },
        { command: 'history -c && history -w', description: 'Clear the in-memory history buffer and write empty state to disk' }
      ],
      expectedOutput: 'HISTSIZE: 1000',
      commonMistakes: [
        { mistake: 'Typing sensitive passwords or API keys directly in commands without a leading space', whyWrong: 'The password is written in plaintext to ~/.bash_history, visible to anyone who inspects the file.', correctWay: 'Configure HISTCONTROL=ignorespace and start sensitive commands with a leading space (e.g. " export TOKEN=xyz").' },
        { mistake: 'Having multiple terminal windows open and losing history from one window when closing the other', whyWrong: 'By default, the last closed window overwrites the history file on disk.', correctWay: 'Add "shopt -s histappend" and "PROMPT_COMMAND=\'history -a\'" to append commands immediately.' }
      ],
      safeRecovery: 'To prevent saving your current terminal session to history, run "unset HISTFILE".'
    })
  ]
};
