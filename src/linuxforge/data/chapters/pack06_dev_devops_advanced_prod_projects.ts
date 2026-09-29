import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 26: LINUX FOR DEVELOPERS (26.1 to 26.14)
// ============================================================================
export const CHAPTER_26: LinuxTopic = {
  id: 'ch-26',
  number: '26',
  title: 'Linux for Developers',
  iconName: 'Code2',
  description: 'Master the Linux development workstation: toolchains (GCC/Clang), build systems (Make), local servers, ports, and debugging (gdb/strace).',
  concepts: [
    buildLinuxConcept({
      id: 'c-26-01',
      subChapterNumber: '26.1',
      command: 'echo "OS: $(uname -s), Shell: $SHELL, Editor: $EDITOR"',
      title: 'Development Environment',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'Configuring a fast, ergonomic developer terminal with zsh/bash, Tmux, Git, and dotfile versioning',
      badges: ['Dev', 'Environment', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-26-02',
      subChapterNumber: '26.2',
      command: 'export PATH="$HOME/.local/bin:$PATH"',
      title: 'PATH Configuration',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'Setting up language version managers (nvm, pyenv, rbenv, cargo) without colliding with system binaries',
      badges: ['PATH', 'Toolchains'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-26-03',
      subChapterNumber: '26.3',
      command: 'gcc --version && clang --version',
      title: 'Compilers',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'GNU Compiler Collection (GCC) and LLVM/Clang translating C/C++ source code into ELF executable binaries',
      badges: ['GCC', 'Compilers', 'ELF'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-26-04',
      subChapterNumber: '26.4',
      command: 'cmake --version',
      title: 'Build Tools',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'Modern cross-platform build generation systems (CMake, Meson, Ninja) orchestrating compilation graphs',
      badges: ['CMake', 'Build'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-26-05',
      subChapterNumber: '26.5',
      command: 'make -j$(nproc)',
      title: 'Make',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'GNU Make: declarative Makefiles with dependency rules and parallel multi-core compilation (-j)',
      badges: ['Make', 'Build', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-26-06',
      subChapterNumber: '26.6',
      command: 'cat .env',
      title: 'Environment Configuration',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'Managing Twelve-Factor App configuration via .env files, direnv, and secure environment isolation',
      badges: ['12Factor', 'Config'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-26-07',
      subChapterNumber: '26.7',
      command: 'pgrep -a node',
      title: 'Processes',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'Inspecting development application processes, zombie states, and graceful termination handling',
      badges: ['Processes', 'Dev'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-26-08',
      subChapterNumber: '26.8',
      command: 'lsof -i :3000',
      title: 'Ports',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'Diagnosing "Error: listen EADDRINUSE" and freeing occupied developer ports with fuser and kill',
      badges: ['Ports', 'Sockets', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-26-09',
      subChapterNumber: '26.9',
      command: 'python3 -m http.server 8000',
      title: 'Local Servers',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'Spinning up instant local HTTP file servers, reverse proxies, and test endpoints on localhost',
      badges: ['Servers', 'HTTP'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-26-10',
      subChapterNumber: '26.10',
      command: 'chmod +x gradlew && ./gradlew build',
      title: 'File Permissions',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'Managing executable bits on repository scripts, git filemode tracking, and file ownership in volume mounts',
      badges: ['Permissions', 'Git'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-26-11',
      subChapterNumber: '26.11',
      command: 'ssh -R 8080:localhost:3000 remote-bastion',
      title: 'SSH Development Workflow',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'Remote development via SSH: VS Code Remote-SSH, reverse tunneling, and cloud workstations',
      badges: ['SSH', 'RemoteDev', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-26-12',
      subChapterNumber: '26.12',
      command: 'git status -s',
      title: 'Git on Linux',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'Leveraging native Linux Git performance, GPG commit signing, and line-ending (LF) consistency',
      badges: ['Git', 'VCS', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-26-13',
      subChapterNumber: '26.13',
      command: 'npm --version && pip3 --version',
      title: 'Package Managers',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'Language-level package managers (npm, pip, cargo, gem) vs OS package managers (apt, dnf)',
      badges: ['Packages', 'Toolchains'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-26-14',
      subChapterNumber: '26.14',
      command: 'strace -e openat,read node app.js',
      title: 'Debugging Applications',
      topicId: 'ch-26',
      topicNumber: '26',
      topicTitle: 'Linux for Developers',
      subtitle: 'Deep developer troubleshooting with strace (system calls), ltrace (library calls), and gdb (core dumps)',
      badges: ['strace', 'Debugging', 'Core'],
      difficulty: 'Advanced'
    })
  ]
};

// ============================================================================
// CHAPTER 27: LINUX FOR DEVOPS (27.1 to 27.14)
// ============================================================================
export const CHAPTER_27: LinuxTopic = {
  id: 'ch-27',
  number: '27',
  title: 'Linux for DevOps',
  iconName: 'Workflow',
  description: 'DevOps & SRE infrastructure pillars: automated provisioning, containers (cgroups/namespaces), CI/CD runners, and incident response.',
  concepts: [
    buildLinuxConcept({
      id: 'c-27-01',
      subChapterNumber: '27.1',
      command: 'cloud-init status --wait',
      title: 'Linux Server Fundamentals',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'Headless cloud virtual machines in AWS/GCP, cloud-init automated provisioning, and metadata services',
      badges: ['Cloud', 'DevOps', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-27-02',
      subChapterNumber: '27.2',
      command: 'ssh -J bastion.corp prod-db-01',
      title: 'SSH',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'Automated SSH authentication, certificate authorities (SSH CA), and ProxyJump bastion access',
      badges: ['SSH', 'Bastion'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-27-03',
      subChapterNumber: '27.3',
      command: 'systemd-cgls',
      title: 'Process Management',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'Supervising production microservice processes inside cgroup control trees with auto-restart policies',
      badges: ['Processes', 'cgroups'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-27-04',
      subChapterNumber: '27.4',
      command: 'systemctl is-active --quiet nginx && echo "Healthy"',
      title: 'Service Management',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'Programmatic service state health verification in automated continuous deployment pipelines',
      badges: ['systemd', 'CI/CD'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-27-05',
      subChapterNumber: '27.5',
      command: 'bridge link show',
      title: 'Networking',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'Linux container bridge networking (docker0, cbr0), veth pairs, and iptables DNAT port forwarding',
      badges: ['Containers', 'Networking', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-27-06',
      subChapterNumber: '27.6',
      command: 'journalctl -o json-pretty -n 5',
      title: 'Logs',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'Structured JSON logging, stdout/stderr container capture, and log aggregation pipelines',
      badges: ['Logs', 'JSON'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-27-07',
      subChapterNumber: '27.7',
      command: 'curl http://localhost:9100/metrics | head -n 25',
      title: 'Monitoring',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'Prometheus Node Exporter metrics scraping: exposed Linux kernel counters for CPU, memory, and disk',
      badges: ['Prometheus', 'Metrics', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-27-08',
      subChapterNumber: '27.8',
      command: 'ansible-playbook -i inventory deploy.yml',
      title: 'Automation',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'Infrastructure as Code (IaC) with Ansible, Terraform, and Packer building immutable Linux machine images',
      badges: ['Ansible', 'IaC', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-27-09',
      subChapterNumber: '27.9',
      command: 'shellcheck deploy.sh',
      title: 'Shell Scripting',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'Linting production automation scripts with ShellCheck and handling defensive idempotency',
      badges: ['Scripting', 'ShellCheck', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-27-10',
      subChapterNumber: '27.10',
      command: 'id -u appuser',
      title: 'Users and Permissions',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'Enforcing non-root container user standards (USER 10001) for strict security compliance',
      badges: ['Security', 'Containers'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-27-11',
      subChapterNumber: '27.11',
      command: 'apt-get install --no-install-recommends -y pkg',
      title: 'Package Management',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'Minimizing Docker container image sizes using --no-install-recommends and cleaning apt caches',
      badges: ['Docker', 'Optimization'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-27-12',
      subChapterNumber: '27.12',
      command: 'runc --version || docker info',
      title: 'Containers on Linux',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'Containers are NOT virtual machines: they are ordinary Linux processes isolated by kernel features',
      badges: ['Containers', 'Docker', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-27-13',
      subChapterNumber: '27.13',
      command: 'cat /etc/gitlab-runner/config.toml',
      title: 'CI/CD Environments',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'Configuring self-hosted GitHub Actions runners, GitLab CI executors, and ephemeral build sandboxes',
      badges: ['CI/CD', 'Runners'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-27-14',
      subChapterNumber: '27.14',
      command: 'journalctl -k -b -p err',
      title: 'Production Troubleshooting',
      topicId: 'ch-27',
      topicNumber: '27',
      topicTitle: 'Linux for DevOps',
      subtitle: 'SRE War Room triage: rapid diagnosis under pressure, post-mortem generation, and root cause analysis',
      badges: ['SRE', 'IncidentResponse', 'Core'],
      difficulty: 'Advanced'
    })
  ]
};

// ============================================================================
// CHAPTER 28: ADVANCED LINUX (28.1 to 28.16)
// ============================================================================
export const CHAPTER_28: LinuxTopic = {
  id: 'ch-28',
  number: '28',
  title: 'Advanced Linux',
  iconName: 'Cpu',
  description: 'Deep kernel internals: sysctl tuning, namespaces, cgroups v2, Linux capabilities, syscalls, inodes, and file descriptors.',
  concepts: [
    buildLinuxConcept({
      id: 'c-28-01',
      subChapterNumber: '28.1',
      command: 'uname -r && cat /proc/sys/kernel/osrelease',
      title: 'Kernel Architecture',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'Monolithic modular kernel design: interrupt handlers, bottom halves, and memory mapping subsystems',
      badges: ['Kernel', 'Architecture', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-02',
      subChapterNumber: '28.2',
      command: 'lsmod && modinfo overlay',
      title: 'Kernel Modules',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'Dynamically loading (.ko) and unloading device drivers and filesystems at runtime with modprobe',
      badges: ['KernelModules', 'modprobe'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-03',
      subChapterNumber: '28.3',
      command: 'sudo sysctl -p /etc/sysctl.d/99-performance.conf',
      title: 'sysctl',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'Tuning live kernel parameters (/proc/sys/): TCP socket buffers (rmem/wmem), somaxconn, and virtual memory',
      badges: ['sysctl', 'KernelTuning', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-04',
      subChapterNumber: '28.4',
      command: 'cat /proc/$$/status | head -n 15',
      title: '/proc Deep Dive',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'Dissecting per-process metadata: /proc/[PID]/maps (memory pages), /proc/[PID]/fd/ (file descriptors), and cmdline',
      badges: ['procfs', 'Internals', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-05',
      subChapterNumber: '28.5',
      command: 'ls -la /sys/devices/system/cpu/',
      title: '/sys Deep Dive',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'sysfs kobject hierarchy: CPU frequency governors, PCI device topologies, and hardware block queue depths',
      badges: ['sysfs', 'Hardware'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-06',
      subChapterNumber: '28.6',
      command: 'lsns',
      title: 'Namespaces',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'The 8 Linux isolation namespaces: PID, Mount (mnt), Network (net), IPC, UTS, User, Cgroup, and Time',
      badges: ['Namespaces', 'Containers', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-07',
      subChapterNumber: '28.7',
      command: 'cat /sys/fs/cgroup/cgroup.controllers',
      title: 'cgroups',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'Control Groups v2: enforcing hard limits and throttle quotas on CPU (cpu.max), Memory (memory.max), and IO',
      badges: ['cgroups', 'ResourceLimits', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-08',
      subChapterNumber: '28.8',
      command: 'getpcaps $$',
      title: 'Capabilities',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'Slicing root privileges into granular capabilities: CAP_NET_BIND_SERVICE, CAP_SYS_ADMIN, CAP_CHOWN',
      badges: ['Capabilities', 'Security', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-09',
      subChapterNumber: '28.9',
      command: 'unshare --mount --net --pid --fork bash',
      title: 'Linux Namespaces + Containers',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'Building a container from scratch using unshare, pivot_root, and cgroup resource controllers',
      badges: ['Containers', 'unshare', 'Internals'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-10',
      subChapterNumber: '28.10',
      command: 'ausyscall --dump | head -n 20',
      title: 'System Calls',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'The binary API boundary: how read(), write(), openat(), mmap(), and clone() enter kernel space via software interrupts',
      badges: ['Syscalls', 'POSIX', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-11',
      subChapterNumber: '28.11',
      command: 'kill -l',
      title: 'Signals',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'Deep signal internals: sigaction handlers, signal masks (sigprocmask), and real-time POSIX signals',
      badges: ['Signals', 'Internals'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-12',
      subChapterNumber: '28.12',
      command: 'stat /',
      title: 'Filesystem Internals',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'Virtual Filesystem Switch (VFS) abstraction: superblock, inode objects, dentry cache (dcache), and file objects',
      badges: ['VFS', 'Filesystems'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-13',
      subChapterNumber: '28.13',
      command: 'ls -i /etc/passwd',
      title: 'Inodes',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'Index Nodes: data structures storing file size, disk block pointers, permissions, and timestamps (not filename)',
      badges: ['Inodes', 'Storage', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-14',
      subChapterNumber: '28.14',
      command: 'ls -l /proc/$$/fd',
      title: 'File Descriptors',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'Integer handles in process file tables indexing open files, network sockets, anonymous pipes, and eventfds',
      badges: ['FileDescriptors', 'POSIX', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-15',
      subChapterNumber: '28.15',
      command: 'ss -x',
      title: 'Sockets',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'Unix Domain Sockets (IPC) vs Network Sockets (AF_INET): high-performance zero-copy socket communication',
      badges: ['Sockets', 'IPC'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-28-16',
      subChapterNumber: '28.16',
      command: 'sudo tc qdisc show',
      title: 'Advanced Networking',
      topicId: 'ch-28',
      topicNumber: '28',
      topicTitle: 'Advanced Linux',
      subtitle: 'Traffic Control (tc), eBPF XDP high-speed packet processing, network namespaces, and overlay VXLAN tunnels',
      badges: ['AdvancedNet', 'eBPF', 'tc'],
      difficulty: 'Expert'
    })
  ]
};

// ============================================================================
// CHAPTER 29: PRODUCTION LINUX (29.1 to 29.14)
// ============================================================================
export const CHAPTER_29: LinuxTopic = {
  id: 'ch-29',
  number: '29',
  title: 'Production Linux',
  iconName: 'Server',
  description: 'Operating mission-critical Linux nodes: base hardening, zero-downtime maintenance, alerting, incident response, and SLAs.',
  concepts: [
    buildLinuxConcept({
      id: 'c-29-01',
      subChapterNumber: '29.1',
      command: 'sudo hostnamectl set-hostname prod-api-01',
      title: 'Production Server Setup',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'Baseline deployment checklist: NTP time sync (chrony), timezone UTC, swap allocation, and sysctl performance tuning',
      badges: ['Production', 'Setup', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-29-02',
      subChapterNumber: '29.2',
      command: 'sudo lynis audit system --quick',
      title: 'Server Hardening',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'Closing unnecessary listening ports, removing compiler toolchains from production, and disabling USB storage',
      badges: ['Hardening', 'Security', 'CIS'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-29-03',
      subChapterNumber: '29.3',
      command: 'sshd -t',
      title: 'SSH Security',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'Hardened sshd_config: PermitRootLogin no, PasswordAuthentication no, MaxAuthTries 3, AllowUsers whitelist',
      badges: ['SSH', 'Security', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-29-04',
      subChapterNumber: '29.4',
      command: 'sudo ufw status numbered',
      title: 'Firewall Configuration',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'Enforcing strict default-deny policies with rate limiting (ufw limit ssh) to prevent brute-force abuse',
      badges: ['Firewall', 'ufw'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-29-05',
      subChapterNumber: '29.5',
      command: 'systemctl status prometheus-node-exporter',
      title: 'Monitoring',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'Setting up continuous system telemetry: CPU saturation, memory exhaustion, disk I/O latency, and socket states',
      badges: ['Monitoring', 'Prometheus', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-29-06',
      subChapterNumber: '29.6',
      command: 'curl -s http://localhost:9093/api/v2/alerts | head -n 10',
      title: 'Alerting',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'Configuring Alertmanager rules: disk space > 85%, load average > 2x core count, high packet loss',
      badges: ['Alerting', 'SRE'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-29-07',
      subChapterNumber: '29.7',
      command: 'systemctl status rsyslog',
      title: 'Log Management',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'Centralizing server logs with TLS encryption to prevent tampering during server compromise events',
      badges: ['Logs', 'Centralization'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-29-08',
      subChapterNumber: '29.8',
      command: 'restic snapshots',
      title: 'Backup Strategy',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'Automated deduplicated encrypted backups to AWS S3/GCS with daily snapshot validation and retention',
      badges: ['Backups', 'DisasterRecovery', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-29-09',
      subChapterNumber: '29.9',
      command: 'echo "RTO (Recovery Time Objective) vs RPO (Recovery Point Objective)"',
      title: 'Disaster Recovery',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'Disaster recovery runbooks: rebuilding production nodes from scratch using automated Terraform and backups',
      badges: ['DisasterRecovery', 'Runbooks'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-29-10',
      subChapterNumber: '29.10',
      command: 'cat /etc/security/limits.d/99-app.conf',
      title: 'Resource Management',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'Configuring ulimits: nofile (open file descriptors 65536) and nproc (max user processes) for high-scale servers',
      badges: ['ulimit', 'Resources', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-29-11',
      subChapterNumber: '29.11',
      command: 'echo "Severity 1: Page On-Call -> Triage -> Mitigate -> Post-Mortem"',
      title: 'Incident Response',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'SRE incident command protocols: clear communication, fast mitigation before investigation, and blameless post-mortems',
      badges: ['SRE', 'Incidents'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-29-12',
      subChapterNumber: '29.12',
      command: 'dmesg -T | tail -n 25',
      title: 'Production Troubleshooting',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'Diagnosing silent outages: connection backlog drops (SYN cookies), silent OOM kills, and DNS timeout cascades',
      badges: ['Troubleshooting', 'SRE', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-29-13',
      subChapterNumber: '29.13',
      command: 'sudo systemctl reload nginx',
      title: 'Zero-Downtime Maintenance',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'Executing live service reloads without dropping active HTTP connections, rolling updates, and drain maneuvers',
      badges: ['ZeroDowntime', 'Maintenance', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-29-14',
      subChapterNumber: '29.14',
      command: 'tree /etc/server-docs/',
      title: 'Server Documentation',
      topicId: 'ch-29',
      topicNumber: '29',
      topicTitle: 'Production Linux',
      subtitle: 'Living architecture documentation: network topology diagrams, runbooks, and disaster recovery recovery plans',
      badges: ['Documentation', 'Operations'],
      difficulty: 'Beginner'
    })
  ]
};

// ============================================================================
// CHAPTER 30: REAL-WORLD LINUX PROJECTS (30.1 to 30.14)
// ============================================================================
export const CHAPTER_30: LinuxTopic = {
  id: 'ch-30',
  number: '30',
  title: 'Real-World Linux Projects',
  iconName: 'Sparkles',
  description: 'Apply everything: deploy Nginx, launch Node.js/Python microservices, configure PostgreSQL, automate backups, and fix broken servers.',
  concepts: [
    buildLinuxConcept({
      id: 'c-30-01',
      subChapterNumber: '30.1',
      command: 'sudo apt update && sudo apt install -y nginx curl git ufw',
      title: 'Build a Linux Web Server',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'End-to-end server setup: install packages, configure security, verify systemd service, and inspect open ports',
      badges: ['Project', 'Webserver', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-30-02',
      subChapterNumber: '30.2',
      command: 'sudo nginx -t && sudo systemctl reload nginx',
      title: 'Configure Nginx',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'Create virtual hosts in /etc/nginx/sites-available/, configure reverse proxy rules, and enable gzip compression',
      badges: ['Nginx', 'ReverseProxy', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-30-03',
      subChapterNumber: '30.3',
      command: 'sudo rsync -av --delete ./dist/ /var/www/html/',
      title: 'Deploy a Static Website',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'Deploying frontend builds to /var/www/html with correct www-data permissions and HTTP cache headers',
      badges: ['Deploy', 'StaticWeb'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-30-04',
      subChapterNumber: '30.4',
      command: 'sudo systemctl status myapp.service',
      title: 'Deploy a Node.js Application',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'Run a production Node.js service under a dedicated unprivileged user managed by a systemd unit with auto-restart',
      badges: ['NodeJS', 'systemd', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-30-05',
      subChapterNumber: '30.5',
      command: 'gunicorn --workers 3 --bind 127.0.0.1:8000 wsgi:app',
      title: 'Deploy a Python Application',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'Production Python WSGI deployment: virtualenv isolation, Gunicorn worker management, and Nginx reverse proxying',
      badges: ['Python', 'Gunicorn'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-30-06',
      subChapterNumber: '30.6',
      command: 'sudo -u postgres psql -c "SELECT version();"',
      title: 'Configure PostgreSQL',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'Installing PostgreSQL, configuring pg_hba.conf host security, tuning shared_buffers, and creating databases',
      badges: ['PostgreSQL', 'Databases', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-30-07',
      subChapterNumber: '30.7',
      command: 'ssh -i ~/.ssh/deploy_key deploy@server',
      title: 'Configure SSH Access',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'Setting up secure passwordless developer access with dedicated keypairs and sudo privilege delegation',
      badges: ['SSH', 'AccessControl'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-30-08',
      subChapterNumber: '30.8',
      command: 'sudo ufw allow 22/tcp && sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw enable',
      title: 'Configure Firewall',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'Implementing production firewall rule set: allow SSH, HTTP, HTTPS while blocking all other ingress traffic',
      badges: ['Firewall', 'Security', 'Core'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-30-09',
      subChapterNumber: '30.9',
      command: 'crontab -l | grep backup',
      title: 'Create Automated Backups',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'Writing an automated shell script dumping PostgreSQL and compressing configs with cron execution and Slack alerts',
      badges: ['Backups', 'Scripting', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-30-10',
      subChapterNumber: '30.10',
      command: 'curl -s http://localhost:9100/metrics | grep node_cpu_seconds_total | head -n 5',
      title: 'Build Monitoring',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'Installing Prometheus Node Exporter and setting up a monitoring pipeline for server telemetry',
      badges: ['Monitoring', 'Prometheus'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-30-11',
      subChapterNumber: '30.11',
      command: './parse_logs.sh /var/log/nginx/access.log',
      title: 'Build a Log Analysis Script',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'Creating an automated log analyzer using awk and sort to detect top request IPs, slowest URLs, and error surges',
      badges: ['awk', 'Analytics', 'Core'],
      difficulty: 'Intermediate'
    }),
    buildLinuxConcept({
      id: 'c-30-12',
      subChapterNumber: '30.12',
      command: './healthcheck.sh',
      title: 'Build a Server Health Check',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'Writing a production health check script verifying disk usage, memory availability, service states, and load average',
      badges: ['HealthCheck', 'Automation'],
      difficulty: 'Beginner'
    }),
    buildLinuxConcept({
      id: 'c-30-13',
      subChapterNumber: '30.13',
      command: 'systemctl --failed && dmesg -T | grep -i error',
      title: 'Troubleshoot a Broken Server',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'Live rescue scenario: diagnosing a locked server with full disk, broken symlink, and failing service units',
      badges: ['Triage', 'Rescue', 'Core'],
      difficulty: 'Advanced'
    }),
    buildLinuxConcept({
      id: 'c-30-14',
      subChapterNumber: '30.14',
      command: 'echo "Production Deployment Verified: All 30 Chapters Mastered!"',
      title: 'Production Deployment Challenge',
      topicId: 'ch-30',
      topicNumber: '30',
      topicTitle: 'Real-World Linux Projects',
      subtitle: 'The Capstone Challenge: deploy, secure, automate, and verify an end-to-end production Linux infrastructure stack',
      badges: ['Capstone', 'Mastery', 'SeniorEngineer', 'Core'],
      difficulty: 'Expert'
    })
  ]
};

export const PACK_06_CHAPTERS: LinuxTopic[] = [
  CHAPTER_26,
  CHAPTER_27,
  CHAPTER_28,
  CHAPTER_29,
  CHAPTER_30,
];
