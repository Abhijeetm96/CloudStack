import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 24: FILESYSTEM & SYSTEM TROUBLESHOOTING (24.1 to 24.13)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_24: LinuxTopic = {
  id: 'ch-24',
  number: '24',
  title: 'Filesystem & System Troubleshooting',
  iconName: 'Wrench',
  description: 'Senior sysadmin incident triage: boot issues, disk full emergencies, permission denied, crash-looping services, and network breaks.',
  concepts: [
    buildLinuxConcept({
      id: 'c-24-01',
      subChapterNumber: '24.1',
      command: 'journalctl -xb',
      title: 'Boot Problems',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Recovering from GRUB errors, corrupted initramfs, missing root UUIDs, and Emergency Mode prompts',
      badges: ['Boot', 'Emergency', 'GRUB', 'Core'],
      difficulty: 'Advanced',
      quote: 'When Linux drops to an Emergency Mode shell, stay calm: read journalctl -xb to see which mount failed.',
      whatIsIt: 'Boot failure occurs when the Linux startup chain is interrupted between the bootloader (GRUB), the initial ramdisk (initramfs), root partition mounting, and systemd target activation. Common boot failures include: 1) Missing or invalid disk UUID in `/etc/fstab` (causing systemd to stall and drop to Emergency Mode); 2) Corrupted filesystem requiring manual fsck; 3) Broken kernel modules or missing storage drivers in initramfs; 4) GRUB configuration corruption. Running `journalctl -xb` from the emergency shell displays the exact kernel and systemd error log for the failed boot.',
      inSimpleWords: 'What to do when your computer refuses to turn on. Instead of panicking at the black emergency screen, you type "journalctl -xb" to read the exact error message that caused the boot failure.',
      whyDoYouNeedIt: 'A simple typo in /etc/fstab (e.g. adding a secondary disk mount with bad syntax) will prevent the entire server from booting after a restart. Knowing how to triage emergency mode saves the server.',
      realWorldScenario: 'An administrator adds a new EBS volume to /etc/fstab on an AWS instance without the "nofail" option. Upon reboot, the volume is not attached, and the server stalls indefinitely at boot. Connecting via serial console drops into emergency maintenance mode. The admin runs "journalctl -xb", spots "Timed out waiting for device /dev/xvdf", edits /etc/fstab to add "nofail", and boots successfully.',
      realWorldAnalogy: 'A car dashboard displaying a "Check Engine" light: instead of kicking the tire, you plug in an OBD-II scanner to read the exact fault code.',
      withoutVsWith: {
        without: {
          title: 'Blindly Power-Cycling and Panicking',
          items: ['Repeated hard reboots exacerbating filesystem corruption', 'Assuming the entire server is destroyed and wiping the machine', 'No visibility into which specific unit or mount caused the halt'],
          outcome: 'Unnecessary data loss and hours of panicked downtime.'
        },
        with: {
          title: 'Methodical Emergency Shell Triage',
          items: ['Direct diagnosis using "journalctl -xb" filtered for error priority (-p 3)', 'Fixing invalid fstab entries in single-user mode', 'Regenerating initramfs with "update-initramfs -u" after driver changes'],
          outcome: 'Server recovered and booted cleanly in under 5 minutes.'
        }
      },
      blockDiagram: {
        title: 'Linux Boot Sequence & Failure Points',
        subtitle: 'The 4 stages of the Linux boot pipeline:',
        nodes: [
          { id: 'grub', label: '1. UEFI / GRUB', simpleDef: 'Bootloader', techDef: 'Loads kernel binary (vmlinuz) and initial ramdisk (initrd.img) into RAM', badge: 'Bootloader', color: '#10b981' },
          { id: 'initramfs', label: '2. initramfs / Dracut', simpleDef: 'Temporary Root FS', techDef: 'Loads storage/RAID drivers and mounts real root partition by UUID', badge: 'Early Kernel', color: '#38bdf8' },
          { id: 'systemd', label: '3. systemd (PID 1)', simpleDef: 'Service Initialization', techDef: 'Parses /etc/fstab, mounts filesystems, reaches default.target (or emergency.target)', badge: 'Systemd PID 1', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Emergency Mode', simple: 'A minimal root rescue shell Linux drops you into when a critical boot step fails.', technical: 'systemd emergency.target providing minimal single-user root shell with root mounted read-only.' },
        { term: 'nofail', simple: 'An fstab mount option that tells Linux: "If this hard drive is missing, keep booting anyway".', technical: 'Mount flag preventing systemd from halting boot if the specified device is not present.' }
      ],
      syntaxCode: 'journalctl -xb',
      syntaxTokens: [
        { token: 'journalctl', role: 'command', explanation: 'Query the systemd journal' },
        { token: '-x', role: 'flag', explanation: 'Include explanatory help text and catalog metadata for log messages' },
        { token: '-b', role: 'flag', explanation: 'Show messages from the current (or failed) boot only' }
      ],
      variations: [
        { command: 'journalctl -xb -p 3', description: 'Filter emergency boot log to show only error, critical, and alert messages' },
        { command: 'systemctl default', description: 'Attempt to resume normal booting after fixing configuration in emergency mode' }
      ],
      expectedOutput: '-- Journal begins at Tue 2026-09-01, ends at Wed 2026-09-30. --\nSep 30 01:00:12 linuxforge systemd[1]: Timed out waiting for device /dev/disk/by-uuid/a1b2-c3d4.\nSep 30 01:00:12 linuxforge systemd[1]: Dependency failed for /mnt/data.\nSep 30 01:00:12 linuxforge systemd[1]: Dependency failed for Local File Systems.\nSep 30 01:00:12 linuxforge systemd[1]: Reached target Emergency Mode.',
      commonMistakes: [
        { mistake: 'Adding non-root disk mounts to /etc/fstab without the "nofail" option', whyWrong: 'If an external USB drive or cloud volume is detached, systemd considers it a fatal error and aborts the entire boot!', correctWay: 'Always add "nofail,x-systemd.device-timeout=5s" for non-essential disk mounts.' },
        { mistake: 'Trying to edit files in emergency mode while root is mounted read-only', whyWrong: 'Editors like nano will throw "Read-only file system" errors.', correctWay: 'Remount root with read-write permissions first: "mount -o remount,rw /".' }
      ],
      safeRecovery: 'If root is read-only in emergency shell, run "mount -o remount,rw /" before editing /etc/fstab.'
    }),

    buildLinuxConcept({
      id: 'c-24-02',
      subChapterNumber: '24.2',
      command: 'df -h && df -i && lsof +L1',
      title: 'Disk Full',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Triaging 100% disk usage: finding large deleted unlinked files held open by running processes (lsof +L1)',
      badges: ['Storage', 'DiskFull', 'Triage', 'Core'],
      difficulty: 'Intermediate',
      quote: '"No space left on device" can mean zero disk blocks, zero inodes, or deleted files held open by running processes.',
      whatIsIt: 'A 100% disk full incident crashes databases, halts logging, and causes services to fail. In Linux, "No space left on device" happens in three distinct scenarios: 1) Block Exhaustion: storage space is full (`df -h`); 2) Inode Exhaustion: millions of tiny files consumed all inode numbers even though gigabytes of space remain (`df -i`); 3) Unlinked Open File Locks: a large log file was deleted with `rm`, but a running process (nginx/java) still holds the open file descriptor. In Linux POSIX semantics, disk blocks are NOT freed until the process closes the file descriptor (`lsof +L1`).',
      inSimpleWords: 'Fixing a full hard drive. Sometimes you delete a huge file with "rm", but the hard drive still shows 100% full! This happens because a running program is still holding onto the file. "lsof +L1" finds the ghost file.',
      whyDoYouNeedIt: 'Junior engineers run `rm large.log` during an outage and are baffled when `df -h` still shows 100% full. Senior engineers know to inspect `lsof +L1` and truncate the file or restart the process holding the file descriptor.',
      realWorldScenario: 'A production API server crashes with "No space left on device". The engineer runs "rm /var/log/app.log.1", but "df -h" still shows 100% used. The engineer runs "lsof +L1" and discovers Node.js has held the deleted 40GB file open for 3 days. Truncating the open file descriptor in `/proc/[pid]/fd/` frees the 40GB instantly without downtime.',
      realWorldAnalogy: 'Throwing away an office document into the shredder (rm), but a coworker still has the document open on their computer screen (open file descriptor).',
      withoutVsWith: {
        without: {
          title: 'Deleting Files Blindly and Rebooting',
          items: ['Deleting files with "rm" without freeing disk space due to open file handles', 'Ignoring inode exhaustion (df -i) and wondering why empty drives throw "No space left"', 'Rebooting production servers needlessly to force file descriptor releases'],
          outcome: 'Prolonged service downtime and database transaction aborts.'
        },
        with: {
          title: 'Senior Triad Triage (df -h, df -i, lsof +L1)',
          items: ['Checking both block space (df -h) and inode exhaustion (df -i)', 'Instant detection of deleted unlinked ghost files with "lsof +L1"', 'Safely truncating open files with ": > file" without restarting running services'],
          outcome: 'Immediate recovery of disk space within 60 seconds with zero service restarts.'
        }
      },
      blockDiagram: {
        title: 'Linux File Deletion & Inode Freeing Lifecycle',
        subtitle: 'Why disk space is not freed until all open file descriptors close:',
        nodes: [
          { id: 'dentry', label: '1. rm file.log (unlink)', simpleDef: 'Removes Directory Entry', techDef: 'unlink() deletes dentry in directory; decrements inode link count to 0', badge: 'Unlink', color: '#10b981' },
          { id: 'fd', label: '2. Process Holds Open FD', simpleDef: 'Active File Descriptor', techDef: 'Process task_struct maintains open struct file reference to inode', badge: 'Open FD', color: '#ef4444' },
          { id: 'free', label: '3. Close FD -> Blocks Freed', simpleDef: 'Free Storage', techDef: 'When process exits or closes FD, inode refcount drops to 0; VFS frees block pointers', badge: 'Blocks Reclaimed', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'Inode Exhaustion', simple: 'Running out of file index numbers. Even if you have 50GB of free space, you cannot create a new file if inodes are at 100%.', technical: 'Filesystem inode table reaching 100% capacity due to millions of small files (common in mail spools or cache directories).' },
        { term: 'Unlinked Open File', simple: 'A deleted file whose space is still locked because a running program is actively writing to it.', technical: 'Inode with i_nlink == 0 but f_count > 0 held open in process file descriptor table.' }
      ],
      syntaxCode: 'df -h && df -i && lsof +L1',
      syntaxTokens: [
        { token: 'df -h', role: 'command', explanation: 'Report human-readable disk block usage' },
        { token: 'df -i', role: 'command', explanation: 'Report inode allocation percentages per mounted filesystem' },
        { token: 'lsof +L1', role: 'command', explanation: 'List open files with link count less than 1 (deleted files still held by processes)' }
      ],
      variations: [
        { command: 'sudo du -ahx / | sort -rh | head -n 20', description: 'Find the top 20 largest individual files and folders on the root filesystem' },
        { command: ': > /path/to/large.log', description: 'Truncate an active log file to zero bytes in place without breaking open file descriptors' }
      ],
      expectedOutput: 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/root        50G   50G     0 100% /\n\nCOMMAND   PID USER   FD   TYPE DEVICE   SIZE/OFF NLINK NODE NAME\njava     4210 root    4w   REG  259,1 42102140120     0 8421 /var/log/app.log (deleted)',
      commonMistakes: [
        { mistake: 'Using "rm" to delete active log files being written to by running daemons', whyWrong: 'The daemon keeps writing to the invisible file descriptor; disk space is NOT freed, and new logs cannot be created!', correctWay: 'Truncate the file in place with ": > /var/log/app.log" or "truncate -s 0 /var/log/app.log".' },
        { mistake: 'Forgetting to check "df -i" when "df -h" shows 30% used', whyWrong: 'If an application generates millions of empty session files, inodes hit 100% and disk operations fail with "No space left on device".', correctWay: 'Always run "df -i" alongside "df -h".' }
      ],
      safeRecovery: 'To immediately reclaim space from a deleted open file without restarting the process, truncate its descriptor: ": > /proc/[PID]/fd/[FD]".'
    }),

    buildLinuxConcept({
      id: 'c-24-03',
      subChapterNumber: '24.3',
      command: 'namei -m /var/www/html/index.html',
      title: 'Permission Denied',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Using namei -m to trace directory traversal permissions step-by-step from root to leaf file',
      badges: ['Permissions', 'namei', 'Traversal', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Permission denied on a file usually means permission denied on a parent directory: namei -m reveals the broken link.',
      whatIsIt: 'In Linux filesystem semantics, to access a target file, a user or process must possess Execute (`x`) permission on EVERY SINGLE parent directory in the path leading from `/` down to the target file. If any single directory in the chain lacks `x` permission for the executing user or group, access is denied immediately with "Permission denied", regardless of the permissions on the target file itself (even if the file is chmod 777). `namei -m` walks the path element by element, displaying exact ownership and mode bits for every segment.',
      inSimpleWords: 'Why you get "Permission Denied" even when a file is chmod 777. If any folder along the way is locked (missing the "x" execute permission), you cannot walk through the hallway to reach the room.',
      whyDoYouNeedIt: 'Instead of guessing which directory is blocking your web server or script, `namei -m` prints the full path ladder in one second, highlighting the exact directory that has missing permissions.',
      realWorldScenario: 'A developer deploys a static site into `/home/developer/site/index.html`. Nginx returns "403 Forbidden". The file has `chmod 644`. Running `namei -m /home/developer/site/index.html` shows `/home/developer` has permissions `drwxr-x---`. Nginx (running as www-data) cannot traverse into `/home/developer`, causing the 403 error. Adding execute permission (`chmod o+x /home/developer`) fixes the issue immediately.',
      realWorldAnalogy: 'A hallway of locked security doors: having the key to the final office safe does you no good if the front lobby door is deadbolted shut.',
      withoutVsWith: {
        without: {
          title: 'Frantic "chmod 777" on the Target File',
          items: ['Setting dangerous 777 permissions on application files without solving the error', 'Confusion over why root can read the file but service accounts cannot', 'Spending hours inspecting application configs instead of directory permissions'],
          outcome: 'Security compromises and failed deployments.'
        },
        with: {
          title: 'Surgical Path Traversal Auditing with namei -m',
          items: ['Clear ladder diagram showing permissions on every parent directory', 'Instant identification of the single missing execute (+x) bit', 'Maintaining secure 644/755 permissions without resort to chmod 777'],
          outcome: 'Immediate resolution of permission errors in under 30 seconds.'
        }
      },
      blockDiagram: {
        title: 'Directory Traversal Ladder (Path Resolution)',
        subtitle: 'The kernel checks execute (x) bit at every directory level:',
        nodes: [
          { id: 'root', label: '/ (drwxr-xr-x)', simpleDef: 'Root Directory', techDef: 'Root directory has execute bit for others (o+x) -> PASS', badge: 'Traversal OK', color: '#10b981' },
          { id: 'parent', label: '/home/user (drwx------)', simpleDef: 'User Directory', techDef: 'Others lack execute bit (---) -> KERNEL DENIES TRAVERSAL (EACCES)', badge: 'Blocked Here', color: '#ef4444' },
          { id: 'file', label: 'file.html (-rwxrwxrwx)', simpleDef: 'Target File', techDef: 'File permissions never evaluated because traversal failed upstream', badge: 'Never Reached', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'Directory Execute (+x)', simple: 'On a directory, the "x" bit does not mean running a program; it means permission to ENTER and walk through the folder.', technical: 'Permission bit required to traverse a directory node during VFS path lookup.' },
        { term: 'EACCES', simple: 'The internal Linux error code that means "Permission Denied".', technical: 'POSIX error errno 13 returned when process credentials lack access rights.' }
      ],
      syntaxCode: 'namei -m /var/www/html/index.html',
      syntaxTokens: [
        { token: 'namei', role: 'command', explanation: 'Follow a pathname until a terminal point is found' },
        { token: '-m', role: 'flag', explanation: 'Display the mode bits of each file/directory contained in the path' },
        { token: '/var/www/html/index.html', role: 'path', explanation: 'Full pathname to inspect for traversal permission breaks' }
      ],
      variations: [
        { command: 'namei -om /path/to/target', description: 'Display owner, group, and mode bits for every path component' },
        { command: 'sudo -u www-data test -r /path/to/file && echo "Readable" || echo "Blocked"', description: 'Directly test whether a specific service account can read the target path' }
      ],
      expectedOutput: 'f: /var/www/html/index.html\n drwxr-xr-x root root /\n drwxr-xr-x root root var\n drwxr-xr-x root root www\n drwxr-xr-x root root html\n -rw-r--r-- www-data www-data index.html',
      commonMistakes: [
        { mistake: 'Changing permissions on only the leaf file when experiencing permission denied', whyWrong: 'If any parent directory lacks "x" permission, the user cannot reach the leaf file regardless of its permissions.', correctWay: 'Inspect the full path ladder using "namei -m".' },
        { mistake: 'Setting "chmod -R 777" across the entire filesystem to fix access', whyWrong: 'Destroys Linux security, breaks SSH keys (which require 0600), and renders sudo unusable.', correctWay: 'Grant only the specific missing group or other read/execute bits.' }
      ],
      safeRecovery: 'To make a directory traversable without granting write access, run "chmod +x /path/to/directory".'
    }),

    buildLinuxConcept({
      id: 'c-24-04',
      subChapterNumber: '24.4',
      command: 'type -a command_name',
      title: 'Command Not Found',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Resolving missing package binaries, path exports, unquoted spaces, and non-executable script permissions',
      badges: ['PATH', 'Troubleshooting', 'type', 'Core'],
      difficulty: 'Beginner',
      quote: '"command not found" is a roadmap: either the binary is not installed, not in $PATH, or missing execution permissions.',
      whatIsIt: 'The ubiquitous "command not found" error occurs when the shell parses command input, scans the colon-delimited directories listed in the `$PATH` environment variable from left to right, and fails to locate an executable file matching the command name. Troubleshooting follows a structured 4-step checklist: 1) Typo check: verify spelling and capitalization; 2) Path check: verify binary location via `type -a` or `find /usr -name binary`; 3) Permission check: ensure the file has the executable bit (`chmod +x`); 4) Shebang check: if executing a script, verify the interpreter listed in `#!/path/to/interpreter` exists.',
      inSimpleWords: 'Why the terminal says "command not found". It means the computer looked through all its normal program folders and couldn\'t find what you asked for. You just need to install it, fix your spelling, or add its folder to your PATH.',
      whyDoYouNeedIt: 'New packages installed via npm, pip, go, or cargo often install binaries into user home directories (e.g. `~/.cargo/bin`) that are not in the default `$PATH`. Understanding `type -a` resolves this in seconds.',
      realWorldScenario: 'An engineer installs Node.js via NVM and writes a shell script containing `node app.js`. Running the script as a systemd service fails with "node: command not found". The engineer uses `which node` to find `/home/user/.nvm/versions/node/v20/bin/node` and updates the systemd unit to use the absolute binary path.',
      realWorldAnalogy: 'Searching your toolbox for a Phillips screwdriver: if it is not in the top drawer (standard $PATH), you need to look in your storage cabinet (custom directory) or go to the hardware store (install package).',
      withoutVsWith: {
        without: {
          title: 'Frantic Reinstallations and Guesswork',
          items: ['Repeatedly running "apt install" for software that is already installed', 'Assuming the operating system is corrupted', 'Unable to explain why commands work in bash but fail in scripts'],
          outcome: 'Wasted time reinstalling working software.'
        },
        with: {
          title: 'Systematic Binary Location Triage',
          items: ['Instant inspection of aliases, builtins, and binaries using "type -a"', 'Verifying script shebang interpreters directly', 'Exporting missing directories to ~/.bashrc PATH cleanly'],
          outcome: 'Fast resolution of missing command errors.'
        }
      },
      blockDiagram: {
        title: 'Shell Command Lookup Sequence',
        subtitle: 'The 4 stages the shell evaluates when you type a command:',
        nodes: [
          { id: 'alias', label: '1. Aliases & Functions', simpleDef: 'Shell Shortcuts', techDef: 'Checks shell internal memory for declared aliases and shell functions', badge: 'Shell Memory', color: '#10b981' },
          { id: 'builtin', label: '2. Builtins (cd, echo)', simpleDef: 'Builtin Code', techDef: 'Checks internal shell builtins compiled directly into bash', badge: 'Builtin', color: '#38bdf8' },
          { id: 'path', label: '3. $PATH Directories', simpleDef: 'Scans PATH', techDef: 'Scans /usr/local/bin:/usr/bin:/bin for executable matching name; if found -> execve()', badge: 'Path Lookup', color: '#f59e0b' },
          { id: 'error', label: '4. command-not-found', simpleDef: 'Error Handler', techDef: 'Invokes /usr/lib/command-not-found helper or prints error exit code 127', badge: 'Error 127', color: '#ef4444' }
        ]
      },
      terms: [
        { term: 'Exit Code 127', simple: 'The standard Linux exit code number that specifically means "Command Not Found".', technical: 'POSIX standard return code indicating shell cannot locate target command.' },
        { term: 'Shebang Line', simple: 'The first line of a script (like #!/bin/bash) telling Linux which program to use to run the script.', technical: 'Two-byte magic number (0x23 0x21) followed by interpreter path parsed by kernel execve().' }
      ],
      syntaxCode: 'type -a command_name',
      syntaxTokens: [
        { token: 'type', role: 'command', explanation: 'Shell builtin describing how command name would be interpreted' },
        { token: '-a', role: 'flag', explanation: 'Display all locations containing an executable named command_name' },
        { token: 'command_name', role: 'argument', explanation: 'Target command name to investigate' }
      ],
      variations: [
        { command: 'which command_name', description: 'Locate a command in the user\'s active $PATH' },
        { command: 'dpkg -S /path/to/binary', description: 'Look up which Debian/Ubuntu package installed a specific binary file' }
      ],
      expectedOutput: 'command_name is /usr/local/bin/command_name\ncommand_name is /usr/bin/command_name',
      commonMistakes: [
        { mistake: 'Typing a script name without "./" (e.g. typing "myscript.sh" in current directory)', whyWrong: 'For security reasons, Linux NEVER includes the current working directory (".") in $PATH. The shell cannot find it!', correctWay: 'Prefix local scripts with "./" (e.g. "./myscript.sh").' },
        { mistake: 'Windows CRLF line endings in shell scripts', whyWrong: 'If written in Windows Notepad, the shebang ends with \r\n, causing the kernel to look for "/bin/bash\r", failing with "no such file or directory"!', correctWay: 'Convert line endings to Unix format using "dos2unix myscript.sh".' }
      ],
      safeRecovery: 'If you know a binary is on disk, find its path using "sudo find / -name binary_name -type f 2>/dev/null".'
    }),

    buildLinuxConcept({
      id: 'c-24-05',
      subChapterNumber: '24.5',
      command: 'journalctl -xeu nginx.service',
      title: 'Service Not Starting',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Diagnosing systemd unit crash loops: syntax errors in config files, port conflicts, and permission bugs',
      badges: ['Services', 'systemd', 'journalctl', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Never guess why a service failed: journalctl -xeu prints the exact line number where the application crashed.',
      whatIsIt: 'When a systemd service fails to start or enters a `crash-loop` (`activating (auto-restart)` or `failed`), `systemctl status` only shows the last few lines of output. Running `journalctl -xeu service_name` provides deep diagnostic telemetry: `-u` filters logs exclusively for that unit, `-b` isolates the current boot, and `-e` jumps immediately to the end of the log buffer. The top three causes of service startup failure are: 1) Syntax errors in configuration files (e.g. missing semicolon); 2) Port conflicts (another process already listening on the required TCP port); 3) Permission denials on socket or log directories.',
      inSimpleWords: 'How to fix a crashed program. Instead of wondering why Nginx or Docker won\'t start, you run "journalctl -xeu" to read the exact error message the program printed before it died.',
      whyDoYouNeedIt: 'System administrators manage dozens of background services. Knowing how to instantly pull service logs with journalctl makes service troubleshooting fast and stress-free.',
      realWorldScenario: 'An administrator updates an Nginx site configuration and runs "systemctl restart nginx", which fails with "Job for nginx.service failed". Running "journalctl -xeu nginx.service" immediately reveals: "nginx: [emerg] "server" directive is not allowed here in /etc/nginx/sites-enabled/site.conf:14". The admin fixes line 14 and restarts successfully.',
      realWorldAnalogy: 'Reading the receipt or error printout from a printer that jammed: it tells you whether it ran out of paper, ran out of ink, or has a mechanical jam.',
      withoutVsWith: {
        without: {
          title: 'Blindly Restarting Failed Services',
          items: ['Running "systemctl restart" 10 times hoping the service magically starts', 'Searching generic online forums without reading the actual local error', 'Overwriting working configurations with random internet snippets'],
          outcome: 'Hours of wasted downtime on simple 1-line configuration typos.'
        },
        with: {
          title: 'Direct Root-Cause Analysis via journalctl',
          items: ['Instant access to the daemon\'s stderr crash messages', 'Exact file and line number identifying the syntax error', 'Spotting port binding conflicts (Address already in use) immediately'],
          outcome: 'Service restored and fully operational within 60 seconds.'
        }
      },
      blockDiagram: {
        title: 'Service Crash Diagnosis Flow',
        subtitle: 'The 3-stage triage workflow for failed systemd services:',
        nodes: [
          { id: 'status', label: '1. systemctl status unit', simpleDef: 'Check State', techDef: 'Identifies exit code (e.g. exit-code, status=1/FAILURE) and process PID', badge: 'State Check', color: '#10b981' },
          { id: 'journal', label: '2. journalctl -xeu unit', simpleDef: 'Inspect Crash Log', techDef: 'Displays stderr output, configuration validation errors, or exception traces', badge: 'Log Forensics', color: '#ef4444' },
          { id: 'port', label: '3. ss -tulpn | grep port', simpleDef: 'Port Conflict Check', techDef: 'Verifies whether another process already bound the target TCP/UDP port', badge: 'Network Check', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'Crash Loop', simple: 'When a service dies immediately upon startup, and systemd keeps trying to restart it forever.', technical: 'Service repeatedly exiting with non-zero status triggering Restart=always policy.' },
        { term: 'EADDRINUSE', simple: 'The error message that means "Another program is already using this network port".', technical: 'POSIX socket error indicating local TCP/UDP port is already bound to another socket.' }
      ],
      syntaxCode: 'journalctl -xeu nginx.service',
      syntaxTokens: [
        { token: 'journalctl', role: 'command', explanation: 'Query systemd logging journal' },
        { token: '-x', role: 'flag', explanation: 'Add explanatory help catalog text to error messages' },
        { token: '-e', role: 'flag', explanation: 'Jump immediately to the end of the log pager' },
        { token: '-u nginx.service', role: 'flag', explanation: 'Filter output strictly for the specified systemd unit' }
      ],
      variations: [
        { command: 'sudo nginx -t', description: 'Test Nginx configuration files for syntax errors directly without restarting' },
        { command: 'sudo ss -tulpn | grep :80', description: 'Check which process is currently holding port 80' }
      ],
      expectedOutput: 'Sep 30 01:25:10 linuxforge nginx[4210]: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)\nSep 30 01:25:10 linuxforge nginx[4210]: nginx: configuration test failed\nSep 30 01:25:10 linuxforge systemd[1]: nginx.service: Control process exited, code=exited, status=1/FAILURE\nSep 30 01:25:10 linuxforge systemd[1]: Failed to start A high performance web server and a reverse proxy server.',
      commonMistakes: [
        { mistake: 'Restarting a service without testing its configuration first', whyWrong: 'If there is a syntax error, the running service is terminated and cannot start back up, creating instant downtime!', correctWay: 'Always run config test tools first (e.g. "nginx -t", "sshd -t", "apachectl configtest").' },
        { mistake: 'Forgetting to run "systemctl daemon-reload" after editing service unit files', whyWrong: 'Systemd will continue running the old in-memory unit definition until reloaded.', correctWay: 'Run "sudo systemctl daemon-reload" whenever modifying files in /etc/systemd/system/.' }
      ],
      safeRecovery: 'If port 80 is blocked by another process, identify and kill the blocker with "sudo fuser -k 80/tcp".'
    }),

    buildLinuxConcept({
      id: 'c-24-06',
      subChapterNumber: '24.6',
      command: 'top -b -n 1 | head -n 15',
      title: 'High CPU',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Identifying runaway loop algorithms, CPU crypto miners, and high I/O wait thread locks',
      badges: ['CPU', 'Saturation', 'top', 'Triage'],
      difficulty: 'Beginner',
      quote: 'High CPU is a signal: isolate whether the bottleneck is user application math (%usr) or kernel lock contention (%sys).',
      whatIsIt: 'High CPU utilization indicates that processes are demanding more compute cycles than the system\'s CPU cores can service concurrently. Triage requires classifying the CPU consumption type: 1) High `%usr`: an application (Java, Python, Node, Go) is executing an intensive algorithm, an infinite loop, or unauthorized crypto mining; 2) High `%sys`: processes are thrashing the kernel with excessive syscalls (rapid context switches, page faults, or lock contention); 3) High `%iowait`: CPU is waiting on saturated storage disks. Sorting by `%CPU` in `top` or `ps` pinpoints the offending process immediately.',
      inSimpleWords: 'Finding what is maxing out your processor. You take a quick snapshot to see which program is hogging 100% of the CPU so you can fix it or kill it.',
      whyDoYouNeedIt: 'Runaway processes degrade server performance for all other applications. Knowing how to capture batch snapshots of high-CPU tasks lets you diagnose problems in scripts and monitoring alerts.',
      realWorldScenario: 'An automated testing worker goes from normal load to 100% CPU on all 16 cores. Running `ps aux --sort=-%cpu | head -n 5` reveals a headless Chrome browser instance stuck in an infinite JavaScript `while(true)` loop. The engineer kills the process and reports the bug to the frontend team.',
      realWorldAnalogy: 'A car engine revving at 6,000 RPM: you need to look at the tachometer and gearbox to see if you are in neutral or if the accelerator pedal is stuck.',
      withoutVsWith: {
        without: {
          title: 'Blindly Rebooting the Server',
          items: ['Rebooting machines without finding the runaway code or PID', 'The runaway process starts right back up after boot and spikes CPU again', 'No evidence captured for software developers to fix the bug'],
          outcome: 'Recurring outages and developer frustration.'
        },
        with: {
          title: 'Targeted Runaway Process Containment',
          items: ['Instant identification of the offending PID and command line', 'Classifying user space computation vs kernel context switching', 'Attaching strace or gdb to analyze the stuck loop before terminating'],
          outcome: 'Immediate system recovery and permanent software bug fixes.'
        }
      },
      blockDiagram: {
        title: 'CPU Saturation Diagnosis Hierarchy',
        subtitle: 'Classifying the nature of high CPU utilization:',
        nodes: [
          { id: 'usr_mode', label: '%usr > 80% (Application Code)', simpleDef: 'Code Hotspot', techDef: 'Runaway loop, JSON serialization, regex backtrack, or crypto miner in user space', badge: 'App Bound', color: '#10b981' },
          { id: 'sys_mode', label: '%sys > 40% (Kernel Space)', simpleDef: 'Syscall Contention', techDef: 'Excessive context switches, socket churn, page table allocation, or lock spinlocks', badge: 'Kernel Bound', color: '#ef4444' },
          { id: 'wa_mode', label: '%iowait > 20% (Storage Stall)', simpleDef: 'Disk Bottleneck', techDef: 'CPU is actually idle waiting on saturated block storage (check iostat)', badge: 'Disk Bound', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Infinite Loop', simple: 'A programming bug where code repeats forever without stopping, consuming 100% of a CPU core.', technical: 'Loop construct whose termination condition is never satisfied, pinning thread execution.' },
        { term: 'strace', simple: 'A tool that lets you watch all the system calls a running program is making in real time.', technical: 'Diagnostic utility tracing system calls and signals using ptrace kernel interface.' }
      ],
      syntaxCode: 'top -b -n 1 | head -n 15',
      syntaxTokens: [
        { token: 'top', role: 'command', explanation: 'Process activity monitor' },
        { token: '-b', role: 'flag', explanation: 'Batch mode: output text stream without clearing terminal screen' },
        { token: '-n 1', role: 'flag', explanation: 'Number of iterations: capture exactly one refresh cycle' },
        { token: '| head -n 15', role: 'operator', explanation: 'Display header summary and top 10 CPU-consuming processes' }
      ],
      variations: [
        { command: 'ps aux --sort=-%cpu | head -n 10', description: 'List top 10 processes consuming the most CPU percentage' },
        { command: 'sudo strace -p PID -c', description: 'Profile system call frequency and time on a specific high-CPU process' }
      ],
      expectedOutput: 'top - 01:30:15 up 2 days,  4:12,  1 user,  load average: 8.12, 6.45, 3.10\nTasks: 185 total,   2 running, 183 sleeping,   0 stopped,   0 zombie\n%Cpu(s): 92.4 us,  5.1 sy,  0.0 ni,  2.1 id,  0.2 wa,  0.0 hi,  0.2 si,  0.0 st\nMiB Mem :  15952.1 total,   4120.4 free,   8120.2 used,   3711.5 buff/cache\n\n  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n 4210 appuser   20   0 1845120 420100  32100 R  98.5   2.6  42:15.12 node worker.js\n 1205 postgres  20   0 2410200 890120  45100 S   3.2   5.5  12:10.05 postgres',
      commonMistakes: [
        { mistake: 'Killing runaway processes immediately with "kill -9" before inspecting them', whyWrong: 'You destroy all debug evidence! Developers won\'t know what function was stuck.', correctWay: 'Run "strace -p PID" or take a thread dump (e.g. jstack for Java) before killing the process.' },
        { mistake: 'Confusing %iowait with CPU computation', whyWrong: '%iowait means the CPU is doing ZERO work and waiting on slow disks; killing user processes won\'t fix slow disk latency.', correctWay: 'Inspect storage queues with "iostat -xz 1".' }
      ],
      safeRecovery: 'To throttle a runaway process without killing it, pause it with "kill -STOP PID" (resume with "kill -CONT PID").'
    }),

    buildLinuxConcept({
      id: 'c-24-07',
      subChapterNumber: '24.7',
      command: 'dmesg -T | grep -i "invoked oom-killer"',
      title: 'High Memory',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Investigating Out-Of-Memory (OOM) killer incidents, memory leaks, and tuning vm.swappiness',
      badges: ['Memory', 'OOM', 'Kernel', 'Core'],
      difficulty: 'Intermediate',
      quote: 'When Linux runs out of memory, it doesn\'t crash: the kernel OOM killer executes the biggest process to save the OS.',
      whatIsIt: 'When physical RAM and swap space are completely exhausted and the kernel is unable to allocate another page, the Linux kernel invokes the Out-Of-Memory Killer (`OOM Killer`). The kernel evaluates every running task and assigns an `oom_score` based on resident memory footprint (RSS) and process priority. The process with the highest score is abruptly terminated with SIGKILL (`Out of memory: Killed process [PID] [name]`). Correlating application crashes with `dmesg -T | grep -i oom` proves whether a process crashed due to code bugs or was sacrificed by the kernel.',
      inSimpleWords: 'What happens when your RAM is 100% full. The Linux kernel acts like an emergency doctor: it shoots the biggest, most memory-hungry program in the head to prevent the whole computer from freezing.',
      whyDoYouNeedIt: 'Applications like Java, Node.js, and databases suddenly disappear from the process table with zero error messages in their application logs. Checking dmesg confirms the kernel OOM killer was responsible.',
      realWorldScenario: 'A team notices their Elasticsearch database vanished overnight. There are no crash traces in the Elasticsearch log file. The SRE runs "dmesg -T | grep -i oom" and spots the exact kernel record: "Out of memory: Killed process 3840 (java), anon-rss:12401200kB". The team adjusts the JVM heap size to fit within host memory limits.',
      realWorldAnalogy: 'A sinking boat that is taking on too much weight: the captain throws the heaviest cargo overboard to keep the boat from sinking to the bottom.',
      withoutVsWith: {
        without: {
          title: 'Unexplained Application Disappearances',
          items: ['Assuming application software crashed due to unknown bugs', 'Endless debugging of application code when the host simply lacked RAM', 'Zero visibility into kernel memory allocation pressure'],
          outcome: 'Confusion over sudden process terminations and recurring outages.'
        },
        with: {
          title: 'Definitive OOM Killer Verification',
          items: ['Exact timestamp and PID confirmation from kernel dmesg ring buffer', 'Protecting mission-critical daemons with oom_score_adj=-1000', 'Tuning memory limits, swap space, and application heap allocations'],
          outcome: 'Reliable service stability and elimination of surprise OOM kills.'
        }
      },
      blockDiagram: {
        title: 'Linux OOM Killer Evaluation Flow',
        subtitle: 'How the kernel selects and sacrifices processes during memory starvation:',
        nodes: [
          { id: 'pressure', label: '1. Memory Starvation', simpleDef: 'RAM + Swap Exhausted', techDef: 'Kernel page allocator fails to reclaim pages from page cache or swap', badge: 'Starvation', color: '#ef4444' },
          { id: 'score', label: '2. oom_badness() Scoring', simpleDef: 'Score Calculation', techDef: 'Calculates points based on RSS size + oom_score_adj (-1000 to +1000)', badge: 'Scoring Engine', color: '#f59e0b' },
          { id: 'kill', label: '3. SIGKILL Termination', simpleDef: 'Sacrifice Process', techDef: 'Sends SIGKILL (kill -9) to highest-scoring task; reclaims physical memory pages', badge: 'Killed by Kernel', color: '#38bdf8' }
        ]
      },
      terms: [
        { term: 'oom_score_adj', simple: 'A setting from -1000 to +1000 that tells Linux whether it is allowed to kill this program during an emergency.', technical: 'Procfs tuneable (/proc/[pid]/oom_score_adj); -1000 makes a process immune to OOM killing.' },
        { term: 'Memory Leak', simple: 'A software bug where a program allocates memory and forgets to free it, steadily consuming more RAM until it crashes.', technical: 'Failure to release unreferenced heap memory, resulting in monotonically increasing RSS.' }
      ],
      syntaxCode: 'dmesg -T | grep -i "invoked oom-killer"',
      syntaxTokens: [
        { token: 'dmesg', role: 'command', explanation: 'Read kernel ring buffer' },
        { token: '-T', role: 'flag', explanation: 'Print human-readable real calendar timestamps' },
        { token: '| grep -i "invoked oom-killer"', role: 'operator', explanation: 'Filter for kernel Out-Of-Memory killer invocation events' }
      ],
      variations: [
        { command: 'cat /proc/$(pgrep mysqld)/oom_score', description: 'Check the current OOM vulnerability score of the running MySQL daemon' },
        { command: 'echo -1000 | sudo tee /proc/$(pgrep sshd)/oom_score_adj', description: 'Protect the SSH daemon from ever being killed by the OOM killer' }
      ],
      expectedOutput: '[Wed Sep 30 01:35:22 2026] node invoked oom-killer: gfp_mask=0x1100cca(GFP_HIGHUSER_MOVABLE), order=0, oom_score_adj=0\n[Wed Sep 30 01:35:22 2026] Out of memory: Killed process 4210 (node) total-vm:4851200kB, anon-rss:3612400kB, file-rss:0kB, shmem-rss:0kB, UID:1001 pgtables:8200kB oom_score_adj:0',
      commonMistakes: [
        { mistake: 'Restarting a memory-leaking application without setting memory bounds', whyWrong: 'The application will steadily consume RAM and trigger another OOM kill in a few hours.', correctWay: 'Configure cgroup memory limits (MemoryMax in systemd) or fix the code leak.' },
        { mistake: 'Thinking "available" RAM is free RAM', whyWrong: '"available" includes reclaimable page cache; applications cannot allocate it all instantaneously without page eviction latency.', correctWay: 'Monitor RSS growth rate over time with "pidstat -r 1".' }
      ],
      safeRecovery: 'To protect a critical database daemon from being OOM killed, set "OOMScoreAdjust=-1000" in its systemd service unit.'
    }),

    buildLinuxConcept({
      id: 'c-24-08',
      subChapterNumber: '24.8',
      command: 'ip route get 8.8.8.8',
      title: 'Network Failure',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Diagnosing link downs, missing default gateways, subnet mask mismatches, and MTU packet drops',
      badges: ['Network', 'Routing', 'iproute2', 'Core'],
      difficulty: 'Intermediate',
      quote: 'When the network is broken, test from Layer 1 up: link state, IP address, default gateway, and MTU size.',
      whatIsIt: 'Network connectivity failures in Linux require a structured Layer 1 through Layer 4 diagnostic sequence: 1) Physical/Link Layer: check interface state (`ip link show`) to verify the link is UP and not NO-CARRIER; 2) Network Layer (IP): check IP assignment (`ip addr show`) and default gateway route (`ip route get 8.8.8.8`); 3) Path Layer (ICMP): test ping to local gateway then public IP; 4) Transport Layer (TCP/UDP): test socket connectivity using `nc -zv host port` or `curl -v`. Running `ip route get <target>` tells you immediately if the kernel has a valid routing path.',
      inSimpleWords: 'How to fix network connection drops. You check if the virtual cable is plugged in (link UP), if you have an IP address, if you have a default gateway router to the outside world, and if packets can reach the target.',
      whyDoYouNeedIt: 'Engineers often waste time debugging DNS or application code when the actual issue is a missing default gateway route or an interface stuck in DOWN state.',
      realWorldScenario: 'A newly provisioned cloud server cannot connect to the internet to download packages. Running "ip route get 8.8.8.8" returns "RTNETLINK answers: Network is unreachable". The engineer realizes DHCP failed to assign a default gateway. Running "sudo ip route add default via 192.168.1.1 dev eth0" restores full internet connectivity immediately.',
      realWorldAnalogy: 'Making a phone call: 1) Check if phone has battery, 2) Check if you have cellular signal bars, 3) Dial the area code, 4) Confirm the other person picks up.',
      withoutVsWith: {
        without: {
          title: 'Random Pinging and DNS Blame',
          items: ['Assuming "ping google.com" failure is always a DNS problem', 'Unaware of link state (NO-CARRIER or DOWN)', 'Blindly modifying /etc/resolv.conf when routing is broken'],
          outcome: 'Prolonged network outages and misdiagnosed infrastructure issues.'
        },
        with: {
          title: 'Layer-by-Layer Network Diagnostics',
          items: ['Checking link and carrier state with "ip link show"', 'Verifying kernel routing tables with "ip route get <IP>"', 'Testing specific TCP ports with "nc -zv" or "curl"'],
          outcome: 'Exact network bottleneck identified and resolved within 60 seconds.'
        }
      },
      blockDiagram: {
        title: 'Linux Network Diagnostics Ladder (OSI Layers)',
        subtitle: 'The 4-stage systematic network triage sequence:',
        nodes: [
          { id: 'l1', label: '1. Link Layer (ip link)', simpleDef: 'Cable & Carrier State', techDef: 'Checks interface UP flag and carrier presence; verifies MTU size', badge: 'Layer 1/2', color: '#10b981' },
          { id: 'l2', label: '2. IP & Routing (ip route)', simpleDef: 'IP & Gateway Route', techDef: 'Checks assigned CIDR IP address and verifies default gateway via ip route get', badge: 'Layer 3', color: '#38bdf8' },
          { id: 'l3', label: '3. Transport (nc / curl)', simpleDef: 'Port Connectivity', techDef: 'Sends TCP SYN packet to verify port 80/443 reaches listening socket through firewalls', badge: 'Layer 4', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Default Gateway', simple: 'The router IP address your computer sends all internet-bound traffic to.', technical: 'Kernel routing table entry (default via X.X.X.X) used when no specific subnet route matches destination.' },
        { term: 'NO-CARRIER', simple: 'The network interface has no signal: the cable is unplugged or virtual switch is disconnected.', technical: 'Network interface flag indicating absence of physical carrier signal on link.' }
      ],
      syntaxCode: 'ip route get 8.8.8.8',
      syntaxTokens: [
        { token: 'ip route', role: 'command', explanation: 'Linux iproute2 routing table management' },
        { token: 'get', role: 'argument', explanation: 'Query kernel route lookup for specific destination' },
        { token: '8.8.8.8', role: 'argument', explanation: 'Target destination IP to route test' }
      ],
      variations: [
        { command: 'ip link show eth0', description: 'Inspect link state (UP/DOWN, MTU, MAC address, carrier state)' },
        { command: 'nc -zv 192.168.1.100 80', description: 'Test if remote TCP port 80 is open and accepting connections' }
      ],
      expectedOutput: '8.8.8.8 via 192.168.1.1 dev eth0 src 192.168.1.15 uid 1000\n    cache',
      commonMistakes: [
        { mistake: 'Relying solely on ping to test network connectivity', whyWrong: 'Many enterprise firewalls and cloud security groups block ICMP echo (ping) completely while TCP ports 80/443 work perfectly!', correctWay: 'Test the actual application port using "nc -zv <host> <port>" or "curl -Iv <url>".' },
        { mistake: 'Forgetting MTU size mismatches across VPN tunnels', whyWrong: 'Standard Ethernet MTU is 1500; VPN encapsulation reduces usable MTU to ~1420. Large packets drop silently (Path MTU Black Hole)!', correctWay: 'Test with "ping -M do -s 1472 <IP>" to detect MTU fragmentation issues.' }
      ],
      safeRecovery: 'If an interface was accidentally downed, bring it back up with "sudo ip link set dev eth0 up".'
    }),

    buildLinuxConcept({
      id: 'c-24-09',
      subChapterNumber: '24.9',
      command: 'systemd-resolve --status || resolvectl status',
      title: 'DNS Failure',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Troubleshooting "Could not resolve host": /etc/resolv.conf, systemd-resolved stub listeners, and UDP 53 firewall blocks',
      badges: ['DNS', 'Resolv', 'systemd-resolved', 'Core'],
      difficulty: 'Intermediate',
      quote: '"It\'s not DNS. There\'s no way it\'s DNS. It was DNS." — The universal systems administration maxim.',
      whatIsIt: 'DNS resolution translates human-readable hostnames (e.g. `api.github.com`) into routable IP addresses. On modern Linux systems, DNS resolution is handled either directly via `/etc/resolv.conf` or mediated by the local caching stub resolver `systemd-resolved` (listening on 127.0.0.53:53). When commands fail with "Could not resolve host" or "Temporary failure in name resolution", the breakdown is typically: 1) Missing or invalid `nameserver` lines in `/etc/resolv.conf`; 2) `systemd-resolved` service stopped; 3) Outbound UDP port 53 traffic blocked by egress firewall rules; 4) Search domain search list loop.',
      inSimpleWords: 'Fixing "Could not resolve host" errors. If your computer cannot find website names, it is because its address book (DNS nameserver) is missing, blocked, or turned off.',
      whyDoYouNeedIt: 'Over 50% of application connectivity bugs stem from DNS misconfigurations. Understanding how `/etc/resolv.conf` connects to nameservers resolves these issues in seconds.',
      realWorldScenario: 'A containerized microservice fails to connect to an external payment gateway with "getaddrinfo ENOTFOUND". Testing `ping 8.8.8.8` works (routing is fine), but `dig google.com` times out. Inspecting `resolvectl status` reveals no DNS servers were assigned by DHCP. Adding `nameserver 1.1.1.1` to `/etc/resolv.conf` restores instant name resolution.',
      realWorldAnalogy: 'Trying to look up a phone number: if your phone book has the pages ripped out or the operator line is dead, you cannot place the call even if your telephone line works.',
      withoutVsWith: {
        without: {
          title: 'Blindly Editing /etc/resolv.conf Only to Have It Overwritten',
          items: ['Editing /etc/resolv.conf manually, only for DHCP or NetworkManager to overwrite it 5 minutes later', 'Assuming internet is down when only DNS lookup is failing', 'Unable to inspect upstream DNS server latency'],
          outcome: 'Recurring DNS outages and persistent application timeouts.'
        },
        with: {
          title: 'Structured DNS Triage with dig and resolvectl',
          items: ['Testing direct nameserver response with "dig @8.8.8.8 domain"', 'Configuring persistent DNS in netplan or systemd-resolved', 'Verifying DNS query latency and cache hit ratios'],
          outcome: 'Robust, cached, and permanent DNS resolution.'
        }
      },
      blockDiagram: {
        title: 'Linux DNS Resolution Architecture',
        subtitle: 'How an application resolves a hostname into an IP address:',
        nodes: [
          { id: 'app', label: '1. App: getaddrinfo()', simpleDef: 'Lookup Request', techDef: 'Glibc resolver reads /etc/nsswitch.conf (hosts: files dns myhostname)', badge: 'Glibc Call', color: '#10b981' },
          { id: 'stub', label: '2. /etc/resolv.conf (127.0.0.53)', simpleDef: 'Local Stub Resolver', techDef: 'Queries systemd-resolved local cache on loopback stub socket', badge: 'Local Cache', color: '#38bdf8' },
          { id: 'upstream', label: '3. Upstream DNS (UDP 53)', simpleDef: 'Internet DNS Server', techDef: 'Queries upstream nameserver (e.g. 8.8.8.8 or corporate DNS) over UDP port 53', badge: 'Upstream DNS', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Stub Resolver', simple: 'A small local DNS helper (like systemd-resolved at 127.0.0.53) that caches answers so your computer doesn\'t have to ask the internet repeatedly.', technical: 'Local caching daemon listening on 127.0.0.53 proxying queries to upstream servers.' },
        { term: 'Port 53', simple: 'The standard network port used for DNS lookups (usually UDP).', technical: 'Well-known port for Domain Name System protocol traffic.' }
      ],
      syntaxCode: 'systemd-resolve --status || resolvectl status',
      syntaxTokens: [
        { token: 'resolvectl', role: 'command', explanation: 'Control and inspect systemd-resolved resolver service' },
        { token: 'status', role: 'argument', explanation: 'Show current per-interface DNS servers and domain search lists' }
      ],
      variations: [
        { command: 'dig @8.8.8.8 google.com +short', description: 'Query Google DNS directly, bypassing local OS resolver to test if upstream DNS works' },
        { command: 'cat /etc/resolv.conf', description: 'View active nameserver configuration and search domain directives' }
      ],
      expectedOutput: 'Global\n         Protocols: -LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported\n  resolv.conf mode: stub\n\nLink 2 (eth0)\n    Current Scopes: DNS\n         Protocols: +DefaultRoute +LLMNR -mDNS -DNSOverTLS DNSSEC=no/unsupported\nCurrent DNS Server: 1.1.1.1\n       DNS Servers: 1.1.1.1 8.8.8.8',
      commonMistakes: [
        { mistake: 'Manually editing /etc/resolv.conf when it is a symlink to systemd-resolved', whyWrong: 'Your changes will be automatically overwritten by NetworkManager, netplan, or DHCP upon the next lease renewal!', correctWay: 'Configure DNS permanently in netplan (/etc/netplan/*.yaml) or /etc/systemd/resolved.conf.' },
        { mistake: 'Forgetting that /etc/hosts overrides DNS', whyWrong: 'If an old test IP is hardcoded in /etc/hosts for a domain, Linux will use that stale IP forever regardless of DNS updates!', correctWay: 'Check /etc/hosts before debugging external DNS records.' }
      ],
      safeRecovery: 'To immediately test if DNS is working, run "getent hosts google.com".'
    }),

    buildLinuxConcept({
      id: 'c-24-10',
      subChapterNumber: '24.10',
      command: 'sudo dpkg --configure -a && sudo apt install -f',
      title: 'Broken Packages',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Repairing interrupted package manager locks, corrupted dpkg status files, and unresolved dependencies',
      badges: ['apt', 'dpkg', 'Repair', 'Maintenance', 'Core'],
      difficulty: 'Intermediate',
      quote: 'When apt throws lock errors or dependency hell, follow the repair protocol: configure pending, fix broken, clean cache.',
      whatIsIt: 'Package manager failures happen when an installation is interrupted (power loss, network drop, or Ctrl+C), leaving packages in a half-configured or unpacked state. The symptoms include: 1) "Could not get lock /var/lib/dpkg/lock-frontend" (another apt process running or stale lockfile); 2) "Unmet dependencies. Try \'apt --fix-broken install\'"; 3) Sub-process `/usr/bin/dpkg` returned an error code. The definitive recovery sequence: finish interrupted configurations (`dpkg --configure -a`), resolve missing dependencies (`apt install -f`), and clear corrupted package caches.',
      inSimpleWords: 'How to fix broken installs. If your computer lost internet halfway through an update and says "apt is locked" or "unmet dependencies", these two commands resume and repair the broken install.',
      whyDoYouNeedIt: 'A broken package halts all subsequent package updates across the entire system. Knowing how to safely clear stale locks and repair dependencies gets updates flowing again.',
      realWorldScenario: 'An administrator runs "sudo apt upgrade", but their SSH connection drops mid-installation. When reconnecting, running any apt command fails with "E: dpkg was interrupted, you must manually run \'sudo dpkg --configure -a\' to correct the problem". Running the command safely finishes configuring the unpacked packages.',
      realWorldAnalogy: 'An interrupted assembly line: before building new cars, workers walk the line to finish tightening the half-installed bolts on the cars currently stuck in the middle.',
      withoutVsWith: {
        without: {
          title: 'Deleting Lock Files Blindly While Processes Run',
          items: ['Running "rm /var/lib/dpkg/lock" while an unattended-upgrades process is actively writing to disk', 'Corrupting the /var/lib/dpkg/status database permanently', 'Unable to install security patches or new packages'],
          outcome: 'Package database corruption requiring manual status file surgery.'
        },
        with: {
          title: 'Methodical Package Manager Recovery',
          items: ['Verifying if background processes are running with "fuser" before touching locks', 'Safely completing pending configuration scripts with "dpkg --configure -a"', 'Fixing broken dependency trees automatically with "apt install -f"'],
          outcome: 'Pristine package database restored without data corruption.'
        }
      },
      blockDiagram: {
        title: 'dpkg / apt Repair Pipeline',
        subtitle: 'The 3-step healing sequence for corrupted package managers:',
        nodes: [
          { id: 'step1', label: '1. dpkg --configure -a', simpleDef: 'Finish Configuration', techDef: 'Executes postinst scripts for all unpacked but unconfigured packages', badge: 'Step 1', color: '#10b981' },
          { id: 'step2', label: '2. apt install -f', simpleDef: 'Fix Dependencies', techDef: 'Calculates dependency graph and downloads missing required library packages', badge: 'Step 2', color: '#38bdf8' },
          { id: 'step3', label: '3. apt update && clean', simpleDef: 'Refresh & Clean Cache', techDef: 'Refreshes repository indexes and purges incomplete .deb archives from cache', badge: 'Step 3', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'dpkg --configure -a', simple: 'Tells Linux to finish configuring any half-installed programs that got interrupted.', technical: 'Re-runs post-installation scripts on all packages in the Unpacked or Half-Configured states.' },
        { term: 'apt install -f (--fix-broken)', simple: 'Tells Linux to automatically find and install any missing pieces of software needed to fix broken programs.', technical: 'Attempts to correct a system with broken dependencies in place by installing missing requirements.' }
      ],
      syntaxCode: 'sudo dpkg --configure -a && sudo apt install -f',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with administrative privileges' },
        { token: 'dpkg --configure -a', role: 'command', explanation: 'Configure all unpacked but unconfigured packages' },
        { token: '&&', role: 'operator', explanation: 'Logical AND: proceed only if first command succeeds' },
        { token: 'apt install -f', role: 'command', explanation: 'Fix broken dependencies by downloading missing packages' }
      ],
      variations: [
        { command: 'sudo fuser -v /var/lib/dpkg/lock-frontend', description: 'Identify which active process is currently holding the apt lock' },
        { command: 'sudo apt clean && sudo apt update', description: 'Delete all downloaded .deb files from cache and refresh package metadata' }
      ],
      expectedOutput: 'Setting up openssl (3.0.2-0ubuntu1.15) ...\nProcessing triggers for libc-bin (2.35-0ubuntu3.8) ...\nReading package lists... Done\nBuilding dependency tree... Done\n0 upgraded, 0 newly installed, 0 to remove.',
      commonMistakes: [
        { mistake: 'Deleting /var/lib/dpkg/lock while another apt process is actually running', whyWrong: 'Two apt processes running simultaneously will corrupt the dpkg database!', correctWay: 'Use "fuser /var/lib/dpkg/lock-frontend" to see if a real process (like unattended-upgrades) is running, and wait for it to finish.' },
        { mistake: 'Forcing package removal with --force-all', whyWrong: 'Forces removal of shared system libraries (like glibc), bricking the entire operating system!', correctWay: 'Resolve dependencies cleanly using "apt install -f".' }
      ],
      safeRecovery: 'If apt cache metadata is corrupted, delete the lists cache and re-update: "sudo rm -rf /var/lib/apt/lists/* && sudo apt update".'
    }),

    buildLinuxConcept({
      id: 'c-24-11',
      subChapterNumber: '24.11',
      command: 'sudo fsck -f /dev/sdb1',
      title: 'Filesystem Problems',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Repairing corrupted ext4/XFS filesystems using fsck and analyzing read-only mount remounts',
      badges: ['fsck', 'Storage', 'Corruption', 'Recovery'],
      difficulty: 'Advanced',
      quote: 'Never run fsck on a mounted filesystem: unmount first or boot into rescue mode to prevent catastrophic corruption.',
      whatIsIt: 'Filesystem corruption occurs due to unexpected power loss, hardware storage failures (bad sectors on SSD/HDD), or kernel crashes while write buffers are dirty. When the Linux kernel detects filesystem metadata inconsistency (corrupted superblock, orphan inodes, or double-allocated blocks), its default safety behavior is to instantly remount the filesystem as Read-Only (`Remounting filesystem read-only`) to prevent further data corruption. `fsck` (File System Consistency Check) inspects and repairs metadata structures.',
      inSimpleWords: 'Fixing a corrupted disk drive. If power cuts out while your computer is saving files, the disk table can get scrambled. "fsck" scans the drive, repairs the table, and recovers lost file fragments.',
      whyDoYouNeedIt: 'When your server suddenly says "Read-only file system", you cannot save files or start services. Knowing how to safely unmount and run fsck restores the drive to healthy read-write status.',
      realWorldScenario: 'A hypervisor power failure forces an ungraceful shutdown of a Linux VM. Upon booting, MySQL fails to start because `/var/lib/mysql` was remounted read-only due to ext4 journal errors. The administrator stops MySQL, unmounts `/dev/sdb1`, runs `sudo fsck -y /dev/sdb1` to replay the journal and fix block pointers, and remounts read-write, restoring the database.',
      realWorldAnalogy: 'A librarian repairing torn catalog index cards after an earthquake so books can be checked out again.',
      withoutVsWith: {
        without: {
          title: 'Running fsck on an Actively Mounted Disk',
          items: ['Running fsck on a live mounted filesystem causing catastrophic structural data loss', 'Ignoring read-only remount warnings until data is permanently corrupted', 'Assuming physical hardware is dead when only the journal was dirty'],
          outcome: 'Irreversible data loss and corrupted storage partitions.'
        },
        with: {
          title: 'Safe Filesystem Integrity Repair',
          items: ['Always unmounting partitions before executing fsck repair', 'Replaying ext4 journal transactions cleanly to restore consistency', 'Recovering lost orphan file blocks into the "lost+found" directory'],
          outcome: 'Filesystem restored to 100% integrity with zero data loss.'
        }
      },
      blockDiagram: {
        title: 'fsck 5-Pass Verification Sequence',
        subtitle: 'The 5 verification passes performed by e2fsck:',
        nodes: [
          { id: 'p1', label: 'Pass 1: Inodes & Blocks', simpleDef: 'Inode Integrity', techDef: 'Checks inode table, size, block counts, and invalid block pointers', badge: 'Pass 1', color: '#10b981' },
          { id: 'p2', label: 'Pass 2: Directory Structure', simpleDef: 'Directory Hierarchy', techDef: 'Verifies directory entries (. and ..) and ensures filenames are valid', badge: 'Pass 2', color: '#38bdf8' },
          { id: 'p3', label: 'Pass 3-5: Connectivity & Bitmaps', simpleDef: 'Free Space & Bitmaps', techDef: 'Connects unreferenced inodes to /lost+found; updates block/inode allocation bitmaps', badge: 'Pass 3-5', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Superblock', simple: 'The most important block on a hard drive containing the filesystem type, size, status, and metadata pointers.', technical: 'Crucial filesystem metadata block containing geometry, feature flags, and block counts.' },
        { term: 'lost+found', simple: 'A special recovery folder at the root of a partition where fsck puts orphan files it rescued that lost their original names.', technical: 'Directory where e2fsck links unreferenced inodes that were disconnected from directory tree.' }
      ],
      syntaxCode: 'sudo fsck -f /dev/sdb1',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with administrative privileges' },
        { token: 'fsck', role: 'command', explanation: 'File system consistency check and interactive repair utility' },
        { token: '-f', role: 'flag', explanation: 'Force checking even if the filesystem is marked as "clean"' },
        { token: '/dev/sdb1', role: 'argument', explanation: 'Target block device partition to inspect' }
      ],
      variations: [
        { command: 'sudo fsck -y /dev/sdb1', description: 'Run fsck non-interactively, automatically answering YES to all repair prompts' },
        { command: 'sudo tune2fs -l /dev/sdb1 | grep "Filesystem state"', description: 'Check whether an ext4 filesystem is currently marked "clean" or "has errors"' }
      ],
      expectedOutput: 'e2fsck 1.46.5 (30-Dec-2021)\nPass 1: Checking inodes, blocks, and sizes\nPass 2: Checking directory structure\nPass 3: Checking directory connectivity\nPass 4: Checking reference counts\nPass 5: Checking group summary information\n/dev/sdb1: 12450/1310720 files (0.2% non-contiguous), 421005/5242880 blocks',
      commonMistakes: [
        { mistake: 'Running fsck on an actively mounted read-write filesystem', whyWrong: 'The kernel and fsck will fight over block structures, destroying file data permanently!', correctWay: 'Always unmount the filesystem first ("umount /dev/sdb1") or boot from a Live CD.' },
        { mistake: 'Running fsck on an XFS filesystem', whyWrong: 'fsck is for ext2/ext3/ext4. Running fsck on XFS does nothing or refers you to xfs_repair.', correctWay: 'Use "xfs_repair /dev/sdb1" for XFS partitions.' }
      ],
      safeRecovery: 'If root has errors, force fsck on next boot safely by running "sudo touch /forcefsck" (or passing "fsck.mode=force" to kernel boot args).'
    }),

    buildLinuxConcept({
      id: 'c-24-12',
      subChapterNumber: '24.12',
      command: 'grep -Ei "fail|error|crit" /var/log/syslog | tail -n 25',
      title: 'Log Investigation',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Mastering log forensics: correlating timestamps across application logs, syslog, and kernel dmesg',
      badges: ['Forensics', 'Logs', 'Syslog', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Log forensics is timeline reconstruction: align timestamps across syslog, auth.log, and application errors.',
      whatIsIt: 'Log forensics is the foundation of Linux incident troubleshooting. Linux centralizes logs in `/var/log/` and the systemd journal database (`/var/log/journal/`). Key log files include: 1) `/var/log/syslog` (or `messages` on RHEL): general system events; 2) `/var/log/auth.log` (or `secure`): user logins, sudo commands, and SSH attempts; 3) `/var/log/kern.log` (and `dmesg`): kernel hardware and driver events; 4) Daemon logs: `/var/log/nginx/`, `/var/log/mysql/`. Forensic triage correlates exact timestamps across these disparate files to reconstruct the chain of events.',
      inSimpleWords: 'How to read the system history books. When something went wrong at 2:15 PM, you search through all the log files for that exact minute to see what happened first, second, and third.',
      whyDoYouNeedIt: 'Applications don\'t fail in isolation; a web server error at 02:15:02 might be the direct result of a kernel Out-Of-Memory kill at 02:15:00. Log correlation reveals cause and effect.',
      realWorldScenario: 'A web app crashes during a flash sale. The application log simply says "Database connection lost". Checking `/var/log/syslog` at the exact same timestamp reveals the network interface driver reset due to a hardware firmware bug, explaining why the database connection dropped.',
      realWorldAnalogy: 'Detectives reviewing timestamped security camera footage from three different angles to reconstruct a crime scene.',
      withoutVsWith: {
        without: {
          title: 'Looking at a Single Log in Isolation',
          items: ['Blaming the web framework when the underlying kernel driver failed', 'Missing the initial trigger event that caused cascading service failures', 'Scrolling manually through 100,000 lines of unformatted text'],
          outcome: 'Superficial bug fixes that fail to address the true root cause.'
        },
        with: {
          title: 'Multi-Source Timestamp Correlation',
          items: ['Filtering high-severity events across system, auth, and kernel logs', 'Using journalctl with precision time windows (--since / --until)', 'Reconstructing the exact chronological failure chain'],
          outcome: 'Definitive root-cause discovery and permanent resolution.'
        }
      },
      blockDiagram: {
        title: 'Linux Log Forensics Aggregation',
        subtitle: 'The primary log streams converging during an incident investigation:',
        nodes: [
          { id: 'kernel', label: 'Kernel Ring Buffer (dmesg)', simpleDef: 'Hardware & Memory', techDef: 'Hardware faults, link state changes, OOM killer invocations, driver crashes', badge: 'Kernel Ring 0', color: '#10b981' },
          { id: 'syslog', label: 'System Log (/var/log/syslog)', simpleDef: 'System Services', techDef: 'systemd unit transitions, cron executions, daemon crashes, and syslog events', badge: 'OS Services', color: '#38bdf8' },
          { id: 'app', label: 'Application Logs (/var/log/app/)', simpleDef: 'Application Traces', techDef: 'HTTP request status codes, database stack traces, and API error payloads', badge: 'Application', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Syslog Severity', simple: 'A number from 0 (Emergency) to 7 (Debug) indicating how critical a log message is.', technical: 'Standard RFC 5424 severity level (0=Emerg, 1=Alert, 2=Crit, 3=Err, 4=Warning, 5=Notice, 6=Info, 7=Debug).' },
        { term: 'journalctl --since', simple: 'A command flag that lets you view logs starting from a specific time (e.g. --since "10 minutes ago").', technical: 'Journal query flag filtering records after the specified timestamp or relative duration.' }
      ],
      syntaxCode: 'grep -Ei "fail|error|crit" /var/log/syslog | tail -n 25',
      syntaxTokens: [
        { token: 'grep', role: 'command', explanation: 'Search file for patterns' },
        { token: '-Ei', role: 'flag', explanation: 'Extended regular expression (-E) and case-insensitive matching (-i)' },
        { token: '"fail|error|crit"', role: 'argument', explanation: 'Pattern matching common failure keyword signatures' },
        { token: '/var/log/syslog', role: 'path', explanation: 'System log file to inspect' }
      ],
      variations: [
        { command: 'journalctl -p 3 -xb', description: 'Show all messages with priority Error (3) or higher for the current boot' },
        { command: 'journalctl --since "2026-09-30 01:00:00" --until "2026-09-30 01:15:00"', description: 'Isolate logs strictly within a 15-minute incident window' }
      ],
      expectedOutput: 'Sep 30 01:14:12 linuxforge systemd[1]: Failed to start nginx.service.\nSep 30 01:14:15 linuxforge kernel: [ 4512.12] Out of memory: Killed process 4210 (node).\nSep 30 01:14:20 linuxforge sshd[4300]: error: PAM: Authentication failure for illegal user admin',
      commonMistakes: [
        { mistake: 'Grepping through raw compressed .gz log files with standard "grep"', whyWrong: 'Standard grep will error or output binary garbage on rotated .gz files!', correctWay: 'Use "zgrep" to search compressed logs (e.g. zgrep "error" /var/log/syslog.*.gz).' },
        { mistake: 'Assuming server clocks are synchronized when correlating logs across multiple machines', whyWrong: 'If server A is 30 seconds ahead of server B, your timeline reconstruction will be completely backwards!', correctWay: 'Ensure NTP/systemd-timesyncd is synchronized across all hosts.' }
      ],
      safeRecovery: 'To monitor all incoming system errors live in real time, run "journalctl -f -p 3".'
    }),

    buildLinuxConcept({
      id: 'c-24-13',
      subChapterNumber: '24.13',
      command: 'echo "Isolate -> Hypothesize -> Test -> Verify -> Document"',
      title: 'Troubleshooting Methodology',
      topicId: 'ch-24',
      topicNumber: '24',
      topicTitle: 'Filesystem & System Troubleshooting',
      subtitle: 'Senior Engineer Problem Solving: avoid random guessing; follow structured scientific root-cause elimination',
      badges: ['Methodology', 'SRE', 'BestPractices', 'Core'],
      difficulty: 'Intermediate',
      quote: 'Novices change 5 things at once and have no idea what fixed the bug; senior engineers test one hypothesis at a time.',
      whatIsIt: 'Troubleshooting complex Linux systems is a scientific discipline, not an intuitive art. Senior SREs and sysadmins follow a structured 5-stage troubleshooting methodology: 1) Isolate: clearly define what is broken, what is still working, and when the change occurred; 2) Hypothesize: formulate testable hypotheses based on observed telemetry (logs, metrics, resource saturation); 3) Test: make ONE small, reversible change designed specifically to validate or refute the hypothesis; 4) Verify: confirm whether the change fixed the problem without side effects; 5) Document: record root cause, post-mortem, and automated preventive guardrails.',
      inSimpleWords: 'How senior engineers solve problems without panicking. You don\'t change random settings hoping for magic. You act like a scientist: look at facts, make a theory, test one thing at a time, verify it worked, and write it down.',
      whyDoYouNeedIt: 'During high-pressure production outages, panic leads to "shotgun debugging" (changing 10 configs simultaneously), which often introduces new bugs and destroys forensic evidence. A structured methodology guarantees fast resolution.',
      realWorldScenario: 'An e-commerce checkout service begins returning 500 errors. Instead of rebooting servers or changing database passwords, the senior engineer follows the methodology: 1) Isolate: only the checkout endpoint fails; 2) Hypothesize: checking logs reveals redis connection timeouts; 3) Test: test connection with `redis-cli ping`; 4) Verify: redis is out of memory; expanding redis maxmemory resolves the issue; 5) Document: add alert for redis memory usage.',
      realWorldAnalogy: 'A medical doctor diagnosing an illness: they do not prescribe 10 different medicines at once; they run tests, eliminate possibilities, and administer the targeted treatment.',
      withoutVsWith: {
        without: {
          title: 'Shotgun Debugging and Panic',
          items: ['Changing 10 configuration files at once in desperation', 'No idea which change actually resolved the issue', 'Introducing new security holes and architectural drift during outages'],
          outcome: 'Unstable systems, recurring incidents, and high engineer stress.'
        },
        with: {
          title: 'Scientific Methodical Root-Cause Elimination',
          items: ['Disciplined, one-variable-at-a-time testing', 'Preserving forensic logs and evidence for thorough post-mortems', 'Creating automated regression tests and monitoring to prevent recurrence'],
          outcome: 'Rapid MTTR, stable infrastructure, and continuous operational learning.'
        }
      },
      blockDiagram: {
        title: 'The 5-Stage Scientific Troubleshooting Loop',
        subtitle: 'The disciplined cycle of senior systems troubleshooting:',
        nodes: [
          { id: 'isolate', label: '1. Isolate the Boundary', simpleDef: 'Define Problem', techDef: 'What changed? When did it start? What components are unaffected?', badge: 'Boundary', color: '#10b981' },
          { id: 'hypothesize', label: '2. Formulate Hypothesis', simpleDef: 'Analyze Data', techDef: 'Review logs, metrics, and network captures to propose single cause', badge: 'Hypothesis', color: '#38bdf8' },
          { id: 'test_verify', label: '3. Test, Verify & Document', simpleDef: 'Targeted Fix', techDef: 'Apply single reversible fix, verify telemetry, and document in post-mortem', badge: 'Resolution', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'MTTR (Mean Time To Resolution)', simple: 'The average amount of time it takes to fix a problem and bring systems back online.', technical: 'Key site reliability engineering metric measuring efficiency of incident response.' },
        { term: 'Post-Mortem', simple: 'A written document created after an outage explaining what went wrong, how it was fixed, and how to prevent it from ever happening again.', technical: 'Blameless incident review documenting timeline, root cause, and action items.' }
      ],
      syntaxCode: 'echo "Isolate -> Hypothesize -> Test -> Verify -> Document"',
      syntaxTokens: [
        { token: 'echo', role: 'command', explanation: 'Output the structured troubleshooting methodology workflow steps' },
        { token: '"Isolate -> ..."', role: 'argument', explanation: 'The 5-phase scientific engineering troubleshooting framework' }
      ],
      variations: [
        { command: 'history | tail -n 25', description: 'Review recent shell commands executed by operators before the incident began' },
        { command: 'git diff /etc', description: 'Check if /etc configuration files were recently modified (if versioned with etckeeper)' }
      ],
      expectedOutput: 'Isolate -> Hypothesize -> Test -> Verify -> Document',
      commonMistakes: [
        { mistake: 'Changing multiple variables simultaneously during an outage', whyWrong: 'You won\'t know which change fixed the issue, or which change introduced a new hidden bug!', correctWay: 'Change one single variable, test its impact, and revert if it doesn\'t solve the problem.' },
        { mistake: 'Skipping the documentation / post-mortem step once systems are back up', whyWrong: 'Without root-cause documentation and preventive guardrails, the exact same outage WILL happen again next month.', correctWay: 'Always conduct a blameless post-mortem within 48 hours of an incident.' }
      ],
      safeRecovery: 'When starting incident triage, always ask: "What changed recently? (deployments, config edits, cloud changes)".'
    })
  ]
};
