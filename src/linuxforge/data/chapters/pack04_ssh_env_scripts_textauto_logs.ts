import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 16: SSH AND REMOTE ACCESS (16.1 to 16.16)
// ============================================================================
export const CHAPTER_16: LinuxTopic = {
  id: 'ch-16',
  number: '16',
  title: 'SSH and Remote Access',
  iconName: 'Lock',
  description: 'Master secure remote system administration: SSH keypairs (Ed25519), SSH agent, config files, rsync, and tunnels.',
  concepts: [
    buildLinuxConcept({
      id: 'c-16-01',
      subChapterNumber: '16.1',
      command: 'ssh -V',
      title: 'What is SSH?',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Secure Shell: encrypted transport layer protocol replacing insecure plaintext protocols like Telnet and rlogin',
      badges: ['Security', 'SSH', 'Crypto', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-16-02',
      subChapterNumber: '16.2',
      command: 'systemctl status sshd',
      title: 'SSH Architecture',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Client/Server model: ssh client connects to remote OpenSSH daemon (sshd) listening on port 22',
      badges: ['Architecture', 'Daemon'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-16-03',
      subChapterNumber: '16.3',
      command: 'ssh -p 22 ubuntu@192.168.1.50',
      title: 'ssh',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'The primary CLI client connecting local terminals to authenticated remote shell environments',
      badges: ['ssh', 'Remote', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-16-04',
      subChapterNumber: '16.4',
      command: 'ssh -i ~/.ssh/id_ed25519 deploy@server.internal',
      title: 'Remote Login',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Logging into remote nodes specifying custom ports (-p), identity files (-i), or remote execution',
      badges: ['Remote', 'Login'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-16-05',
      subChapterNumber: '16.5',
      command: 'ls -la ~/.ssh',
      title: 'SSH Keys',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Asymmetric cryptographic keypairs providing passwordless, brute-force-proof authentication',
      badges: ['Keys', 'Crypto', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-16-06',
      subChapterNumber: '16.6',
      command: 'cat ~/.ssh/id_ed25519.pub',
      title: 'Public vs Private Keys',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Private key stays locked with chmod 600 locally; public key (.pub) is placed on servers',
      badges: ['Crypto', 'Security', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-16-07',
      subChapterNumber: '16.7',
      command: 'ssh-keygen -t ed25519 -C "admin@company.com"',
      title: 'ssh-keygen',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Generate high-security Ed25519 or RSA-4096 cryptographic keypairs with passphrases',
      badges: ['ssh-keygen', 'Ed25519', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-16-08',
      subChapterNumber: '16.8',
      command: 'ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server.internal',
      title: 'ssh-copy-id',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Automatically append local public key to remote user\'s authorized_keys with correct permissions',
      badges: ['Automation', 'Keys'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-16-09',
      subChapterNumber: '16.9',
      command: 'chmod 700 ~/.ssh && chmod 600 ~/.ssh/id_*',
      title: '~/.ssh',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'The user SSH configuration directory requiring strict permissions (700 dir, 600 private keys)',
      badges: ['Permissions', 'Security'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-16-10',
      subChapterNumber: '16.10',
      command: 'cat ~/.ssh/authorized_keys',
      title: 'authorized_keys',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Server-side file listing all public keys permitted to log into this user account',
      badges: ['Security', 'Server'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-16-11',
      subChapterNumber: '16.11',
      command: 'cat ~/.ssh/known_hosts',
      title: 'known_hosts',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Client database of verified remote host public key fingerprints preventing Man-in-the-Middle attacks',
      badges: ['Security', 'MITM'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-16-12',
      subChapterNumber: '16.12',
      command: 'cat ~/.ssh/config',
      title: 'SSH Config',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Define aliases (e.g. "ssh prod"), custom hostnames, usernames, ports, and ProxyJump bastion bastions',
      badges: ['Config', 'Productivity', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-16-13',
      subChapterNumber: '16.13',
      command: 'scp build.tar.gz user@server.internal:/var/www/',
      title: 'scp',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Secure Copy: transfer files between computers over encrypted SSH connection',
      badges: ['Transfers', 'scp'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-16-14',
      subChapterNumber: '16.14',
      command: 'rsync -avzP --delete ./dist/ user@prod:/var/www/html/',
      title: 'rsync',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Remote Sync: ultra-efficient delta transfer synchronizing only changed byte blocks over SSH',
      badges: ['rsync', 'Sync', 'DevOps', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-16-15',
      subChapterNumber: '16.15',
      command: 'ssh -L 5432:localhost:5432 user@prod-db',
      title: 'SSH Port Forwarding',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'SSH Tunnels: forward local ports to remote services through encrypted bastion hosts',
      badges: ['Tunnels', 'Networking'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-16-16',
      subChapterNumber: '16.16',
      command: 'ssh -vvv user@server.internal',
      title: 'SSH Troubleshooting',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Diagnose "Permission denied (publickey)" using verbose debug output (-vvv) and checking permissions',
      badges: ['Troubleshooting', 'Triage', 'Core'],
      difficulty: 'Intermediate'
    })
  ]
};

// ============================================================================
// CHAPTER 17: ENVIRONMENT VARIABLES (17.1 to 17.14)
// ============================================================================
export const CHAPTER_17: LinuxTopic = {
  id: 'ch-17',
  number: '17',
  title: 'Environment Variables',
  iconName: 'Code2',
  description: 'Manage process runtime context: export, PATH resolution, dotfiles (.bashrc/.profile), and shell persistence.',
  concepts: [
    buildLinuxConcept({
      id: 'c-17-01',
      subChapterNumber: '17.1',
      command: 'printenv | head -n 15',
      title: 'What is an Environment Variable?',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'Dynamic key-value pairs stored in process memory passed to child processes via execve()',
      badges: ['Environment', 'Processes', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-17-02',
      subChapterNumber: '17.2',
      command: 'printenv PATH',
      title: 'printenv',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'Print specific environment variables or dump the complete process environment list',
      badges: ['CLI', 'Inspection'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-17-03',
      subChapterNumber: '17.3',
      command: 'env -i NODE_ENV=production node app.js',
      title: 'env',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'Execute programs in a modified or sanitized (-i clean) environment without altering parent shell',
      badges: ['CLI', 'Sanitization'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-17-04',
      subChapterNumber: '17.4',
      command: 'export API_KEY="live_sec_99182"',
      title: 'export',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'Promote a shell variable to an exported environment variable inherited by all child processes',
      badges: ['export', 'Shell', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-17-05',
      subChapterNumber: '17.5',
      command: 'echo $PATH',
      title: 'PATH',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'Colon-separated list of directories searched left-to-right whenever an unqualified command is typed',
      badges: ['PATH', 'Crucial', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-17-06',
      subChapterNumber: '17.6',
      command: 'echo $HOME',
      title: 'HOME',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'Absolute path to current user profile home directory (e.g. /home/ubuntu)',
      badges: ['Variables', 'Paths'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-17-07',
      subChapterNumber: '17.7',
      command: 'echo $USER',
      title: 'USER',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'Contains the current logged-in username evaluated by prompt strings and scripts',
      badges: ['Variables', 'User'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-17-08',
      subChapterNumber: '17.8',
      command: 'echo $SHELL',
      title: 'SHELL',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'The path to user default login shell binary (/bin/bash, /bin/zsh) defined in /etc/passwd',
      badges: ['Variables', 'Shell'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-17-09',
      subChapterNumber: '17.9',
      command: 'PORT=8080 ./server',
      title: 'Setting Variables',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'Syntax rules: no spaces around equals sign (NAME="value"), case-sensitivity, and quoting',
      badges: ['Syntax', 'Variables'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-17-10',
      subChapterNumber: '17.10',
      command: 'DATABASE_URL="postgres://..." npm start',
      title: 'Temporary Variables',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'Prefixing a single command with environment variables without persisting them in current shell',
      badges: ['Inline', 'Temporary'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-17-11',
      subChapterNumber: '17.11',
      command: 'echo "export PATH=$PATH:/opt/bin" >> ~/.bashrc',
      title: 'Persistent Variables',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'Saving environment variables in startup scripts so they reload across reboot and re-login',
      badges: ['Persistence', 'Dotfiles'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-17-12',
      subChapterNumber: '17.12',
      command: 'source ~/.bashrc',
      title: '.bashrc',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'User per-interactive shell startup file: defines aliases, functions, prompts (PS1), and exports',
      badges: ['Bash', 'Dotfiles', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-17-13',
      subChapterNumber: '17.13',
      command: 'cat ~/.profile',
      title: '.profile',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'Executed once upon initial login by login shells (SSH session start or physical console)',
      badges: ['Login', 'Dotfiles'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-17-14',
      subChapterNumber: '17.14',
      command: 'env -i which command || echo $PATH',
      title: 'Environment Troubleshooting',
      topicId: 'ch-17',
      topicNumber: '17',
      topicTitle: 'Environment Variables',
      subtitle: 'Solving "Command not found", subshell variable loss, and differences between cron and interactive shells',
      badges: ['Troubleshooting', 'Triage', 'Core'],
      difficulty: 'Intermediate'
    })
  ]
};

// ============================================================================
// CHAPTER 18: SHELL SCRIPTING (18.1 to 18.21)
// ============================================================================
export const CHAPTER_18: LinuxTopic = {
  id: 'ch-18',
  number: '18',
  title: 'Shell Scripting',
  iconName: 'FileCode',
  description: 'Automate tasks with Bash: shebangs, conditionals, loops, functions, arguments, arithmetic, and strict error handling (set -e).',
  concepts: [
    buildLinuxConcept({
      id: 'c-18-01',
      subChapterNumber: '18.1',
      command: 'ls -l *.sh',
      title: 'Why Shell Scripts?',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Automating repetitive administrative workflows, deployment pipelines, and log processing tasks',
      badges: ['Automation', 'Scripting', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-02',
      subChapterNumber: '18.2',
      command: 'chmod +x backup.sh && ./backup.sh',
      title: 'Creating a Script',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'The 3-step cycle: write script in text editor, add execute bit (chmod +x), execute via ./script.sh',
      badges: ['Scripting', 'Workflow'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-03',
      subChapterNumber: '18.3',
      command: 'head -n 1 backup.sh',
      title: 'Shebang',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: '#!/usr/bin/env bash: tells the Linux kernel which interpreter binary to launch for script execution',
      badges: ['Shebang', 'Kernel', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-04',
      subChapterNumber: '18.4',
      command: 'TARGET_DIR="/var/backups"',
      title: 'Variables',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Assigning variables without spaces, string interpolation ("$VAR"), and curly-brace syntax (${VAR})',
      badges: ['Variables', 'Syntax'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-05',
      subChapterNumber: '18.5',
      command: 'read -p "Enter environment [dev/prod]: " ENV',
      title: 'User Input',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Interactive script inputs using read builtin with custom prompts (-p) and silent passwords (-s)',
      badges: ['Input', 'read'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-06',
      subChapterNumber: '18.6',
      command: 'CURRENT_DATE=$(date +%Y%m%d)',
      title: 'Command Substitution',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Capturing command output into variables using modern $(command) syntax (replacing legacy backticks)',
      badges: ['Substitution', 'Syntax', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-07',
      subChapterNumber: '18.7',
      command: 'exit 1',
      title: 'Exit Codes',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Terminating scripts with meaningful exit status codes to inform calling CI/CD pipelines',
      badges: ['ExitCodes', 'CI/CD'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-08',
      subChapterNumber: '18.8',
      command: 'if [[ -f config.env ]]; then echo "Config found"; fi',
      title: 'if',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Conditional branching evaluating file tests (-f, -d), string equality (==), or numeric comparisons (-eq)',
      badges: ['Conditionals', 'FlowControl', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-09',
      subChapterNumber: '18.9',
      command: 'elif [[ "$ENV" == "staging" ]]; then deploy_staging',
      title: 'elif',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Else-If conditional ladder evaluating sequential conditions until a true branch is reached',
      badges: ['Conditionals', 'Branching'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-10',
      subChapterNumber: '18.10',
      command: 'else echo "Unknown environment"; exit 1',
      title: 'else',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Fallback execution block executed when all prior if/elif conditions evaluate to false',
      badges: ['Conditionals', 'Fallback'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-11',
      subChapterNumber: '18.11',
      command: 'for srv in srv1 srv2 srv3; do ping -c 1 $srv; done',
      title: 'for Loops',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Iterating over lists of items, globbed filenames, or sequence ranges ({1..10})',
      badges: ['Loops', 'Iteration', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-12',
      subChapterNumber: '18.12',
      command: 'while IFS= read -r line; do echo "Line: $line"; done < file.txt',
      title: 'while Loops',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Looping until a condition becomes false, commonly used for line-by-line file reading',
      badges: ['Loops', 'Streams'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-13',
      subChapterNumber: '18.13',
      command: 'case "$1" in start) start_srv;; stop) stop_srv;; *) echo "Usage: $0 {start|stop}";; esac',
      title: 'case',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Pattern-matching switch statement ideal for CLI subcommands and init scripts',
      badges: ['PatternMatching', 'Switch'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-18-14',
      subChapterNumber: '18.14',
      command: 'log_info() { echo "[$(date)] INFO: $*"; }',
      title: 'Functions',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Modularizing reusable logic with local variables (local VAR) and isolated scopes',
      badges: ['Functions', 'Modularity'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-18-15',
      subChapterNumber: '18.15',
      command: './deploy.sh production v2.4',
      title: 'Arguments',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Receiving parameters passed on the CLI into positional variables inside scripts',
      badges: ['Parameters', 'Arguments'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-16',
      subChapterNumber: '18.16',
      command: 'echo "Arg 1: $1, Arg 2: $2, Total: $#, All: $@"',
      title: '$1 $2 $@',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Positional variables: $1/$2 (arguments), $# (count), $@ (all arguments as separate words), and $0 (script name)',
      badges: ['SpecialVars', 'Arguments', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-17',
      subChapterNumber: '18.17',
      command: 'echo "${FILENAME%.txt}.bak"',
      title: 'String Operations',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Pure parameter expansion: length (${#STR}), trimming prefixes (${STR#*x}), and suffixes (${STR%x*})',
      badges: ['Strings', 'Expansion'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-18-18',
      subChapterNumber: '18.18',
      command: 'TOTAL=$((COUNT * 2 + 10))',
      title: 'Arithmetic',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Evaluating integer arithmetic natively using $((expression)) without external expr calls',
      badges: ['Math', 'Arithmetic'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-18-19',
      subChapterNumber: '18.19',
      command: 'trap "rm -f $TEMP_FILE; exit" INT TERM EXIT',
      title: 'Error Handling',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Signal traps (trap) cleaning up temporary files upon script interrupts or unexpected errors',
      badges: ['Trap', 'Cleanup', 'Safety'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-18-20',
      subChapterNumber: '18.20',
      command: 'set -euo pipefail',
      title: 'set -e',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'The Gold Standard Unofficial Bash Strict Mode: exit on error (-e), unset vars (-u), and pipe errors',
      badges: ['StrictMode', 'BestPractices', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-18-21',
      subChapterNumber: '18.21',
      command: 'bash -x ./script.sh',
      title: 'Debugging Scripts',
      topicId: 'ch-18',
      topicNumber: '18',
      topicTitle: 'Shell Scripting',
      subtitle: 'Execution trace mode (-x) printing every line and evaluated variable before running it',
      badges: ['Debugging', 'Trace', 'Core'],
      difficulty: 'Beginner'
    })
  ]
};

// ============================================================================
// CHAPTER 19: TEXT PROCESSING & AUTOMATION (19.1 to 19.10)
// ============================================================================
export const CHAPTER_19: LinuxTopic = {
  id: 'ch-19',
  number: '19',
  title: 'Text Processing & Automation',
  iconName: 'Sparkles',
  description: 'Combine regular expressions, pipes, sed, awk, and xargs into production automation pipelines and log parsers.',
  concepts: [
    buildLinuxConcept({
      id: 'c-19-01',
      subChapterNumber: '19.1',
      command: 'grep -P "^(error|fatal):" app.log',
      title: 'Regular Expressions',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'POSIX and PCRE regex engines: patterns matching complex strings in system logs and streams',
      badges: ['Regex', 'Text', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-19-02',
      subChapterNumber: '19.2',
      command: 'cat /var/log/syslog | grep "sshd" | grep "Failed"',
      title: 'grep + pipes',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Progressive filtering pipelines narrowing down massive multi-gigabyte logs in seconds',
      badges: ['Pipes', 'Pipelines'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-19-03',
      subChapterNumber: '19.3',
      command: 'sed -i "s/10.0.0.1/10.0.0.2/g" /etc/hosts',
      title: 'sed Automation',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Batch automated configuration updates across server fleets without interactive editors',
      badges: ['sed', 'Automation'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-19-04',
      subChapterNumber: '19.4',
      command: 'awk \'{total += $5} END {print "Total bytes: " total}\' access.log',
      title: 'awk Automation',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Generating analytics reports, summarizing bandwidth consumption, and computing stats',
      badges: ['awk', 'Analytics'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-19-05',
      subChapterNumber: '19.5',
      command: 'find /var/crash -type f | xargs -P 4 gzip',
      title: 'xargs',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Parallel worker automation (-P) processing file lists across multi-core CPUs simultaneously',
      badges: ['Parallel', 'xargs', 'Performance'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-19-06',
      subChapterNumber: '19.6',
      command: 'tar -czf "backup-$(date +%F).tar.gz" /etc',
      title: 'Command Substitution',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Injecting dynamic dates, hostnames, or git commit hashes into file and directory names',
      badges: ['Automation', 'Substitution'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-19-07',
      subChapterNumber: '19.7',
      command: 'for f in *.jpg; do mv "$f" "${f%.jpg}_optimized.jpg"; done',
      title: 'Batch Operations',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Looping through thousands of files to batch rename, transcode, or convert in one command',
      badges: ['Batch', 'Renaming'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-19-08',
      subChapterNumber: '19.8',
      command: 'awk \'{print $9}\' access.log | sort | uniq -c | sort -rn',
      title: 'Log Processing',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'HTTP status code breakdown: counting 200s, 404s, and 500 server errors from raw access logs',
      badges: ['Logs', 'Observability'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-19-09',
      subChapterNumber: '19.9',
      command: 'find /tmp -type f -mtime +7 -delete',
      title: 'Automated File Management',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Automated retention policies: automatically purging log files older than 7 days',
      badges: ['Retention', 'Cleanup'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-19-10',
      subChapterNumber: '19.10',
      command: './server_audit.sh',
      title: 'Practical Automation Scripts',
      topicId: 'ch-19',
      topicNumber: '19',
      topicTitle: 'Text Processing & Automation',
      subtitle: 'Complete production server health-check scripts generating automated daily Slack or email reports',
      badges: ['Production', 'DevOps', 'Core'],
      difficulty: 'Intermediate'
    })
  ]
};

// ============================================================================
// CHAPTER 20: LOGGING & SYSTEM OBSERVABILITY (20.1 to 20.12)
// ============================================================================
export const CHAPTER_20: LinuxTopic = {
  id: 'ch-20',
  number: '20',
  title: 'Logging & System Observability',
  iconName: 'Activity',
  description: 'Understand Linux telemetry: /var/log, syslog, journald, dmesg kernel rings, logrotate, and resource monitoring.',
  concepts: [
    buildLinuxConcept({
      id: 'c-20-01',
      subChapterNumber: '20.1',
      command: 'ls -lh /var/log',
      title: 'Linux Logs',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'Logging & System Observability',
      subtitle: 'The primary audit trail of the operating system recording security events, hardware faults, and services',
      badges: ['Logs', 'Observability', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-20-02',
      subChapterNumber: '20.2',
      command: 'tail -n 25 /var/log/auth.log',
      title: '/var/log',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'Logging & System Observability',
      subtitle: 'Standard directory holding system logs (syslog, auth.log, dmesg, nginx, dpkg.log)',
      badges: ['Directory', 'FHS'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-20-03',
      subChapterNumber: '20.3',
      command: 'logger -p local0.notice "Deployment initiated"',
      title: 'syslog',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'Logging & System Observability',
      subtitle: 'Standard logging protocol dividing messages by Facilities (auth, cron, daemon) and Severities (emerg to debug)',
      badges: ['syslog', 'Protocol'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-20-04',
      subChapterNumber: '20.4',
      command: 'journalctl -p err..emerg -b',
      title: 'journalctl',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'Logging & System Observability',
      subtitle: 'Query systemd journald binary database by priority (-p err), current boot (-b), or time intervals',
      badges: ['journalctl', 'systemd', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-20-05',
      subChapterNumber: '20.5',
      command: 'cat /proc/kmsg | head -n 10',
      title: 'Kernel Logs',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'Logging & System Observability',
      subtitle: 'Low-level Ring 0 messages emitted by memory managers, network hardware, and device drivers',
      badges: ['Kernel', 'Logs'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-20-06',
      subChapterNumber: '20.6',
      command: 'dmesg -T | grep -i "oom-killer"',
      title: 'dmesg',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'Logging & System Observability',
      subtitle: 'Display kernel ring buffer logs with human-readable timestamps (-T) to detect hardware and OOM kills',
      badges: ['dmesg', 'Kernel', 'OOM', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-20-07',
      subChapterNumber: '20.7',
      command: 'tail -f /var/log/nginx/error.log',
      title: 'Application Logs',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'Logging & System Observability',
      subtitle: 'Userland service logs recording application crashes, 502 Bad Gateway responses, and slow queries',
      badges: ['Apps', 'Debugging'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-20-08',
      subChapterNumber: '20.8',
      command: 'cat /etc/logrotate.conf',
      title: 'Log Rotation',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'Logging & System Observability',
      subtitle: 'Preventing disk overflow by automatically compressing (.gz), rotating, and deleting stale log files',
      badges: ['logrotate', 'Storage'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-20-09',
      subChapterNumber: '20.9',
      command: 'mpstat 1 3',
      title: 'Monitoring CPU',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'Logging & System Observability',
      subtitle: 'Tracking CPU utilization percentage: user space (%usr), kernel space (%sys), idle, and I/O wait (%iowait)',
      badges: ['CPU', 'Observability'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-20-10',
      subChapterNumber: '20.10',
      command: 'free -m',
      title: 'Monitoring Memory',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'Logging & System Observability',
      subtitle: 'Analyzing MemAvailable vs MemFree and understanding page cache and slab memory reclaim',
      badges: ['RAM', 'Memory'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-20-11',
      subChapterNumber: '20.11',
      command: 'iostat -xz 1 3',
      title: 'Monitoring Disk',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'Logging & System Observability',
      subtitle: 'Measuring disk I/O latency, throughput (MB/s), and device saturation (%util)',
      badges: ['DiskIO', 'iostat'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-20-12',
      subChapterNumber: '20.12',
      command: 'sar -n DEV 1 3',
      title: 'Monitoring Network',
      topicId: 'ch-20',
      topicNumber: '20',
      topicTitle: 'Logging & System Observability',
      subtitle: 'Tracking packet transmission rates (rxpck/s, txpck/s), bandwidth, and dropped frame counters',
      badges: ['Network', 'sar'],
      difficulty: 'Intermediate'
    })
  ]
};

export const PACK_04_CHAPTERS: LinuxTopic[] = [
  CHAPTER_16,
  CHAPTER_17,
  CHAPTER_18,
  CHAPTER_19,
  CHAPTER_20,
];
