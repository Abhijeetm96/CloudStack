export type DevOpsTrackCategory =
  | 'foundation'
  | 'containerization'
  | 'orchestration'
  | 'automation'
  | 'cloud'
  | 'operations'
  | 'security'
  | 'advanced'
  | 'engineering'
  | 'career';

export interface DevOpsSubModule {
  id: string;
  code: string;
  title: string;
  topics: string[];
}

export interface DevOpsChapter {
  id: string;
  number: number;
  chapterCode: string;
  title: string;
  category: DevOpsTrackCategory;
  trackName: string;
  summary: string;
  targetTech: string[];
  subModules: DevOpsSubModule[];
  status: 'live' | 'curriculum';
  liveAction?: {
    type: 'route' | 'mode';
    route: string;
    label: string;
    badge: string;
    description: string;
  };
}

export interface DevOpsLearningTrack {
  id: string;
  trackNumber: number;
  title: string;
  chapterNumbers: number[];
  description: string;
  color: string;
  iconName: string;
}

export const DEVOPS_10_TRACKS: DevOpsLearningTrack[] = [
  {
    id: 'track-foundation',
    trackNumber: 1,
    title: 'FOUNDATION',
    chapterNumbers: [1, 2, 3],
    description: 'Linux systems engineering, computer networking protocols, and Git version control plumbing.',
    color: '#06b6d4',
    iconName: 'Terminal',
  },
  {
    id: 'track-containerization',
    trackNumber: 2,
    title: 'CONTAINERIZATION',
    chapterNumbers: [4, 5],
    description: 'Docker image building, multi-stage optimization, runtime isolation, and OCI artifact registries.',
    color: '#38bdf8',
    iconName: 'Container',
  },
  {
    id: 'track-orchestration',
    trackNumber: 3,
    title: 'ORCHESTRATION',
    chapterNumbers: [6, 7, 8],
    description: 'Kubernetes control plane, workload controllers, CNI networking, ingress, and advanced scheduling.',
    color: '#a855f7',
    iconName: 'Boxes',
  },
  {
    id: 'track-automation',
    trackNumber: 4,
    title: 'AUTOMATION',
    chapterNumbers: [9, 10],
    description: 'Continuous Integration / Continuous Delivery pipelines and declarative Infrastructure as Code (Terraform & Ansible).',
    color: '#ec4899',
    iconName: 'Workflow',
  },
  {
    id: 'track-cloud',
    trackNumber: 5,
    title: 'CLOUD',
    chapterNumbers: [11, 12, 13],
    description: 'Hyperscaler compute architectures (AWS, Azure, GCP), cloud VPC networks, and high-availability database operations.',
    color: '#3b82f6',
    iconName: 'Cloud',
  },
  {
    id: 'track-operations',
    trackNumber: 6,
    title: 'OPERATIONS',
    chapterNumbers: [14, 15, 24],
    description: 'Full-stack telemetry (Prometheus, Grafana, OpenTelemetry), Site Reliability Engineering, and Business Continuity DR.',
    color: '#10b981',
    iconName: 'Activity',
  },
  {
    id: 'track-security',
    trackNumber: 7,
    title: 'SECURITY',
    chapterNumbers: [16],
    description: 'DevSecOps pipelines, container vulnerability scanning, secrets leasing (Vault), and software supply chain security (SBOM).',
    color: '#ef4444',
    iconName: 'ShieldCheck',
  },
  {
    id: 'track-advanced',
    trackNumber: 8,
    title: 'ADVANCED CLOUD-NATIVE',
    chapterNumbers: [17, 18, 19, 20],
    description: 'GitOps synchronization (Argo CD/Flux), Service Mesh (Istio/mTLS), Platform Engineering, and Distributed Systems.',
    color: '#8b5cf6',
    iconName: 'Layers',
  },
  {
    id: 'track-engineering',
    trackNumber: 9,
    title: 'ENGINEERING',
    chapterNumbers: [21, 22, 23, 25],
    description: 'Advanced Python/Bash scripting, release engineering, automated quality testing, and FinOps cloud cost optimization.',
    color: '#f59e0b',
    iconName: 'Code2',
  },
  {
    id: 'track-career',
    trackNumber: 10,
    title: 'CAREER & CAPSTONE',
    chapterNumbers: [26, 27, 28, 29],
    description: 'Real-world end-to-end projects, interactive production troubleshooting incident simulations, interview prep, and master capstone.',
    color: '#14b8a6',
    iconName: 'Award',
  },
];

export const DEVOPS_29_CHAPTERS: DevOpsChapter[] = [
  // CHAPTER 01
  {
    id: 'ch01-linux',
    number: 1,
    chapterCode: 'CHAPTER 01',
    title: 'LINUX & SYSTEM FUNDAMENTALS',
    category: 'foundation',
    trackName: 'FOUNDATION',
    summary:
      'The bedrock of modern servers: Linux architecture, FHS hierarchy, text manipulation, permission matrices, systemd service management, bash automation, and performance triage.',
    targetTech: ['Linux Kernel 6.8', 'systemd', 'GNU coreutils', 'Bash', 'procfs'],
    status: 'live',
    liveAction: {
      type: 'route',
      route: '/linuxforge',
      label: 'Launch LinuxForge',
      badge: 'Interactive Academy Live',
      description: '8 Deep Modules, 24 Comprehensive Concepts, and in-browser POSIX terminal simulator.',
    },
    subModules: [
      {
        id: 'mod-01-1',
        code: '01.1',
        title: 'Linux Fundamentals',
        topics: [
          'What is Linux?',
          'Linux distributions (Debian, RHEL, Arch, Alpine)',
          'Kernel vs operating system',
          'User space vs kernel space (Ring 3 vs Ring 0)',
          'Linux filesystem hierarchy (FHS)',
          '/etc (Host static configuration)',
          '/var (Variable runtime state & logs)',
          '/home (User workspaces)',
          '/usr (Secondary read-only binaries & libraries)',
          '/opt (Third-party application software)',
          '/tmp (Ephemeral scratch storage)',
          '/proc (procfs: virtual process telemetry)',
          '/sys (sysfs: modern kernel device model)',
          '/dev (devtmpfs: physical & virtual hardware nodes)',
        ],
      },
      {
        id: 'mod-01-2',
        code: '01.2',
        title: 'Files & Directories',
        topics: [
          'pwd (Print working directory)',
          'ls (File listing with -l, -a, -h, -t, -R)',
          'cd (Path traversal, ~, -, relative vs absolute)',
          'mkdir (Directory creation with -p)',
          'touch (Timestamp update & 0-byte creation)',
          'cp (Copy files & recursive trees with -r, -a)',
          'mv (Atomic rename and path relocation)',
          'rm (File & recursive tree deletion with -rf)',
          'find (Real-time traversal by name, type, size, mtime)',
          'locate (Indexed mlocate database lookup via updatedb)',
          'file (MIME & binary ELF magic number inspection)',
          'stat (Low-level inode timestamps: atime, mtime, ctime)',
          'tree (ASCII visual directory hierarchy)',
        ],
      },
      {
        id: 'mod-01-3',
        code: '01.3',
        title: 'File Content & Text Processing',
        topics: [
          'cat (Stream concatenation and printing)',
          'less (Interactive buffered terminal pager)',
          'more (Legacy forward-only pager)',
          'head (Header inspection with -n)',
          'tail (Footer inspection & live follow with -n, -f, -F)',
          'grep (Pattern matching with regex, -r, -n, -v, -E)',
          'sort (Alphabetical, numerical -n, and column sorting)',
          'uniq (Collapsing adjacent duplicate lines with -c)',
          'wc (Counting lines -l, words -w, and bytes -c)',
          'cut (Column slicing by delimiter -d and fields -f)',
          'awk (Pattern scanning and columnar processing language)',
          'sed (Non-interactive stream editor for search-and-replace)',
          'tr (Character translation, squeeze, and deletion)',
          'xargs (Converting standard input to batched command arguments)',
        ],
      },
      {
        id: 'mod-01-4',
        code: '01.4',
        title: 'Permissions',
        topics: [
          'Users (UIDs and /etc/passwd)',
          'Groups (GIDs and /etc/group)',
          'Owner (User ownership)',
          'Read permission (r = 4)',
          'Write permission (w = 2)',
          'Execute permission (x = 1; files vs directory traversal)',
          'chmod (Changing file mode bits)',
          'chown (Changing user and group ownership)',
          'chgrp (Changing primary group ownership)',
          'umask (Default creation mask calculation: 666 / 777 base)',
          'Numeric permissions (Octal 755, 644, 600 notation)',
          'Symbolic permissions (u+x, go-w, a=r notation)',
          'sudo (Privilege elevation via /etc/sudoers and visudo)',
        ],
      },
      {
        id: 'mod-01-5',
        code: '01.5',
        title: 'Processes',
        topics: [
          'Process fundamentals (Memory space, file descriptors)',
          'PID (Process Identifier)',
          'PPID (Parent Process Identifier)',
          'ps (Process snapshot: ps aux, ps -ef --forest)',
          'top (Real-time system tasks and resource monitor)',
          'htop (Interactive colorized process tree viewer)',
          'kill (Dispatching POSIX signals to PIDs)',
          'killall (Killing processes by exact binary name)',
          'pkill (Pattern-matching signal dispatch)',
          'Signals (Asynchronous software interrupts)',
          'SIGTERM (Signal 15: Graceful termination request)',
          'SIGKILL (Signal 9: Uncatchable forceful termination)',
          'SIGHUP (Signal 1: Hangup and daemon configuration reload)',
          'Background processes (Asynchronous execution with &)',
          'Foreground processes (Controlling terminal input/output)',
          'Jobs (Managing shell-internal jobs via jobs, fg, bg)',
          'nohup (Shielding commands from SIGHUP on SSH logout)',
        ],
      },
      {
        id: 'mod-01-6',
        code: '01.6',
        title: 'Services',
        topics: [
          'systemd (PID 1 system and service manager)',
          'systemctl (Control interface for systemd units)',
          'Starting services (systemctl start)',
          'Stopping services (systemctl stop)',
          'Restarting services (systemctl restart vs reload)',
          'Enabling services (systemctl enable --now for boot persistence)',
          'Service status (Inspecting active state, PID, memory, logs)',
          'Journal logs (systemd-journald structured binary logs)',
          'journalctl (Querying logs with -u, -f, -xe, -p err, --since)',
        ],
      },
      {
        id: 'mod-01-7',
        code: '01.7',
        title: 'Shell & Bash',
        topics: [
          'Shell fundamentals (Command interpretation and execution)',
          'Bash (Bourne-Again Shell syntax and built-ins)',
          'Environment variables (Process environment and inheritance)',
          'PATH (Colon-delimited executable search path)',
          'Variables (Local vs exported environment variables)',
          'Arguments ($0 script, $1..$9 positional, $# count, $@ all)',
          'Exit codes ($? zero success vs non-zero error)',
          'stdin (File descriptor 0)',
          'stdout (File descriptor 1)',
          'stderr (File descriptor 2)',
          'Pipes (| in-memory stream connection)',
          'Redirection (>, >>, 2>, 2>&1, <, <<EOF)',
          'Command substitution ($(command) subshell output expansion)',
          'Shell scripting (Shebang #!/usr/bin/env bash, set -euo pipefail)',
          'if/else (Conditional testing [[ condition ]])',
          'loops (for item in list; while read -r line)',
          'functions (Modular functions with local scoping)',
          'case statements (Pattern matching switch branches)',
        ],
      },
      {
        id: 'mod-01-8',
        code: '01.8',
        title: 'Linux Troubleshooting',
        topics: [
          'CPU usage (Load averages, uptime, vmstat, top profiling)',
          'Memory usage (free -h, buff/cache, available, OOM killer dmesg)',
          'Disk usage (df -h capacity, du -sh directory profiling)',
          'Disk I/O (iostat -xz, %util saturation, await latency, iotop)',
          'Process investigation (State D uninterruptible sleep, zombie Z tasks)',
          'Log investigation (journalctl -xe, /var/log/syslog, auth.log)',
          'Service failures (systemctl --failed, unit syntax validation)',
          'Permission failures (EACCES forensics, directory x bits, ACLs)',
          'File descriptor limits (ulimit -n, /proc/sys/fs/file-nr, lsof)',
          'Resource exhaustion (Fork bombs, PID limits, swap thrashing)',
        ],
      },
    ],
  },

  // CHAPTER 02
  {
    id: 'ch02-networking',
    number: 2,
    chapterCode: 'CHAPTER 02',
    title: 'NETWORKING FUNDAMENTALS',
    category: 'foundation',
    trackName: 'FOUNDATION',
    summary:
      'Computer networking for DevOps: OSI vs TCP/IP models, CIDR subnetting, DNS resolution pipelines, HTTP/HTTPS specs, TLS handshakes, reverse proxies, and socket diagnostics (ss, ip, tcpdump).',
    targetTech: ['TCP/IP', 'DNS', 'HTTP/2 & HTTP/3', 'TLS 1.3', 'iproute2', 'tcpdump'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-02-1',
        code: '02.1',
        title: 'Networking Basics',
        topics: ['What is a network?', 'LAN', 'WAN', 'Internet', 'Client', 'Server', 'Packets', 'Frames', 'Network interfaces'],
      },
      {
        id: 'mod-02-2',
        code: '02.2',
        title: 'IP Addressing',
        topics: ['IPv4', 'IPv6', 'Public IP', 'Private IP (RFC 1918)', 'Loopback', 'localhost', 'Subnet', 'CIDR notation (/24, /16)', 'Subnet mask', 'Default gateway'],
      },
      {
        id: 'mod-02-3',
        code: '02.3',
        title: 'TCP/IP',
        topics: ['OSI 7-layer model', 'TCP/IP 4-layer model', 'TCP (Transmission Control Protocol)', 'UDP (User Datagram Protocol)', 'TCP 3-way handshake (SYN, SYN-ACK, ACK)', 'Ports (0-65535)', 'Sockets (IP:Port tuple)', 'Connection states (LISTEN, ESTABLISHED, TIME_WAIT, CLOSE_WAIT)'],
      },
      {
        id: 'mod-02-4',
        code: '02.4',
        title: 'DNS',
        topics: ['What is DNS?', 'DNS resolution pipeline', 'Domain names (FQDN)', 'A record', 'AAAA record', 'CNAME', 'MX', 'TXT', 'NS', 'PTR', 'TTL (Time To Live)', 'Recursive DNS', 'Authoritative DNS', 'DNS caching (/etc/resolv.conf, systemd-resolved)'],
      },
      {
        id: 'mod-02-5',
        code: '02.5',
        title: 'HTTP',
        topics: ['HTTP fundamentals', 'HTTP request structure', 'HTTP response structure', 'HTTP methods (GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD)', 'Headers', 'Cookies', 'Sessions', 'Status codes (2xx Success, 3xx Redirect, 4xx Client Error, 5xx Server Error)'],
      },
      {
        id: 'mod-02-6',
        code: '02.6',
        title: 'HTTPS & TLS',
        topics: ['HTTP vs HTTPS', 'TLS 1.3 encryption', 'Certificates (X.509)', 'Certificate Authorities (CA, Let\'s Encrypt)', 'Public/private keys (RSA, ECC)', 'TLS handshake protocol', 'Certificate validation & chains', 'Symmetric vs asymmetric encryption'],
      },
      {
        id: 'mod-02-7',
        code: '02.7',
        title: 'Networking Tools',
        topics: ['ping (ICMP echo)', 'curl (HTTP client)', 'wget', 'traceroute (Hop-by-hop latency)', 'tracepath', 'dig (DNS queries)', 'nslookup', 'host', 'ss (Socket statistics: ss -tulpn)', 'netstat', 'ip (ip addr, ip route, ip link)', 'tcpdump (Packet capture)', 'nmap (Port scanning)'],
      },
      {
        id: 'mod-02-8',
        code: '02.8',
        title: 'Proxies & Load Balancing',
        topics: ['Reverse proxy', 'Forward proxy', 'Load balancer architecture', 'Layer 4 load balancing (TCP/UDP)', 'Layer 7 load balancing (HTTP path/header routing)', 'Health checks', 'Round robin', 'Least connections', 'Sticky sessions (Cookie affinity)'],
      },
      {
        id: 'mod-02-9',
        code: '02.9',
        title: 'Networking Troubleshooting',
        topics: ['DNS failure (NXDOMAIN, timeout)', 'Connection refused (Daemon not listening or port blocked)', 'Connection timeout (Firewall DROP or blackhole)', 'Port unreachable', 'Routing problems (Missing default gateway)', 'TLS errors (Certificate expired, mismatch)', 'HTTP 502/504 Bad Gateway / Gateway Timeout', 'Packet loss forensics', 'Latency bottleneck analysis'],
      },
    ],
  },

  // CHAPTER 03
  {
    id: 'ch03-git',
    number: 3,
    chapterCode: 'CHAPTER 03',
    title: 'GIT & VERSION CONTROL',
    category: 'foundation',
    trackName: 'FOUNDATION',
    summary:
      'Distributed version control mastery: internal object models (Blob, Tree, Commit, Tag), three-way merges, interactive rebasing, reflog forensics, and enterprise collaboration.',
    targetTech: ['Git 2.45+', 'SHA-1/SHA-256 DAG', 'Conventional Commits', 'Semantic Versioning'],
    status: 'live',
    liveAction: {
      type: 'route',
      route: '/git',
      label: 'Launch Git Academy',
      badge: 'Interactive Academy Live',
      description: '18 Topics, 75 Concepts, interactive DAG visualizer, and virtual repository simulator.',
    },
    subModules: [
      {
        id: 'mod-03-1',
        code: '03.1',
        title: 'Git Fundamentals',
        topics: ['What is Git?', 'Why version control?', 'Repository structure (.git)', 'Working tree', 'Staging area (index)', 'Commit object', 'HEAD pointer', 'Branch pointers', 'Remote repositories', 'origin convention'],
      },
      {
        id: 'mod-03-2',
        code: '03.2',
        title: 'Git Basics',
        topics: ['git init', 'git clone', 'git status', 'git add (staging changes)', 'git commit (-m, --amend)', 'git log (--oneline, --graph)', 'git diff (working vs staged)', 'git show (commit inspection)'],
      },
      {
        id: 'mod-03-3',
        code: '03.3',
        title: 'Git Branching',
        topics: ['git branch (listing, creating, deleting)', 'git switch (modern branch switching)', 'git checkout', 'Creating branches (-b)', 'Deleting branches (-d, -D)', 'Renaming branches (-m)', 'Tracking branches (upstream tracking)'],
      },
      {
        id: 'mod-03-4',
        code: '03.4',
        title: 'Git Remotes',
        topics: ['git remote (add, -v)', 'git fetch (downloading objects without merging)', 'git pull (fetch + merge)', 'git push (publishing commits)', 'upstream vs origin', 'remote-tracking branches (origin/main)'],
      },
      {
        id: 'mod-03-5',
        code: '03.5',
        title: 'Git Merging',
        topics: ['git merge', 'Fast-forward merge', 'Three-way merge (common ancestor)', 'Merge conflicts (conflict markers)', 'Conflict resolution strategies', 'Abort merge (git merge --abort)'],
      },
      {
        id: 'mod-03-6',
        code: '03.6',
        title: 'Git Rebase',
        topics: ['What is rebase?', 'Interactive rebase (git rebase -i)', 'Rebase workflow (pick, squash, reword, drop)', 'Rebase vs merge trade-offs', 'Rebase conflicts', 'Abort rebase (git rebase --abort)'],
      },
      {
        id: 'mod-03-7',
        code: '03.7',
        title: 'Git Undo & Recovery',
        topics: ['git restore (un-staging and discarding working tree)', 'git reset (--soft, --mixed, --hard)', 'git revert (safe public commit inversion)', 'git reflog (commit journal forensics)', 'Recovering deleted commits and branches', 'Undoing local changes', 'Undoing commits', 'Undoing pushed commits safely'],
      },
      {
        id: 'mod-03-8',
        code: '03.8',
        title: 'Advanced Git',
        topics: ['Cherry-pick (git cherry-pick)', 'Stash (git stash push, pop, list)', 'Tags (lightweight tags)', 'Annotated tags (git tag -a)', 'Git hooks (pre-commit, commit-msg)', 'Git aliases', 'Git worktree (simultaneous branch checkouts)', 'Git bisect (binary search bug hunting)', 'Git blame', 'Git submodules', 'Git LFS (Large File Storage)'],
      },
      {
        id: 'mod-03-9',
        code: '03.9',
        title: 'Git Collaboration',
        topics: ['Fork workflows', 'Pull request (PR) mechanics', 'Code review best practices', 'Branch protection rules', 'Protected branches', 'Conventional commits (feat:, fix:, chore:)', 'Semantic versioning (SemVer: MAJOR.MINOR.PATCH)'],
      },
    ],
  },

  // CHAPTER 04
  {
    id: 'ch04-docker',
    number: 4,
    chapterCode: 'CHAPTER 04',
    title: 'DOCKER & CONTAINERIZATION',
    category: 'containerization',
    trackName: 'CONTAINERIZATION',
    summary:
      'Container fundamentals from kernel cgroups and namespaces to multi-stage Dockerfiles, image layer caching, bridge networks, and production Compose orchestration.',
    targetTech: ['Docker Engine', 'containerd', 'runc', 'BuildKit', 'Docker Compose'],
    status: 'live',
    liveAction: {
      type: 'route',
      route: '/docker',
      label: 'Launch Docker Academy',
      badge: 'Interactive Academy Live',
      description: '14 Topics, 42 Concepts, container sandbox, and Compose orchestration visualizer.',
    },
    subModules: [
      {
        id: 'mod-04-1',
        code: '04.1',
        title: 'Container Fundamentals',
        topics: ['What is a container?', 'Why containers?', 'Containers vs Virtual Machines', 'Container lifecycle', 'Images vs containers', 'Docker architecture (Client, Daemon, Registry)', 'Docker Engine', 'containerd runtime', 'runc low-level runner', 'OCI (Open Container Initiative) specs'],
      },
      {
        id: 'mod-04-2',
        code: '04.2',
        title: 'Docker Basics',
        topics: ['docker version', 'docker info', 'docker run (-d, -p, --name)', 'docker ps (-a)', 'docker stop', 'docker start', 'docker restart', 'docker rm (-f)', 'docker kill'],
      },
      {
        id: 'mod-04-3',
        code: '04.3',
        title: 'Interactive Containers',
        topics: ['docker exec (-it)', 'docker attach', 'Interactive shell inside container', 'STDIN allocation (-i)', 'STDOUT and STDERR streaming', 'Detached mode (-d)'],
      },
      {
        id: 'mod-04-4',
        code: '04.4',
        title: 'Images',
        topics: ['Docker images', 'Image layers (read-only stacked layers)', 'Image IDs & SHA-256 digests', 'Image tags', 'Image history (docker history)', 'docker pull', 'docker push', 'docker inspect', 'docker rmi', 'Image caching mechanics'],
      },
      {
        id: 'mod-04-5',
        code: '04.5',
        title: 'Dockerfiles',
        topics: ['FROM (Base image)', 'RUN (Build-time execution)', 'COPY vs ADD', 'WORKDIR', 'ENV vs ARG', 'EXPOSE (Port metadata)', 'USER (Non-root user)', 'CMD vs ENTRYPOINT', 'HEALTHCHECK', 'LABEL'],
      },
      {
        id: 'mod-04-6',
        code: '04.6',
        title: 'Docker Builds',
        topics: ['docker build (-t .)', 'Build context & .dockerignore', 'Build cache invalidation', 'Layer caching optimization', 'Build arguments (--build-arg)', 'BuildKit backend', 'buildx multi-platform builds', 'Multi-stage builds (Builder -> Minimal runtime)'],
      },
      {
        id: 'mod-04-7',
        code: '04.7',
        title: 'Storage',
        topics: ['Container ephemeral filesystem (OverlayFS)', 'Volumes (docker volume create)', 'Named volumes', 'Anonymous volumes', 'Bind mounts (-v $(pwd):/app)', 'tmpfs mounts (RAM storage)', 'Persistent data patterns'],
      },
      {
        id: 'mod-04-8',
        code: '04.8',
        title: 'Networking',
        topics: ['Bridge network (default bridge)', 'Host network (--net=host)', 'None network (isolated)', 'Custom user-defined bridge networks', 'Port publishing (-p 80:80)', 'Container embedded DNS resolution', 'Container-to-container communication by container name'],
      },
      {
        id: 'mod-04-9',
        code: '04.9',
        title: 'Docker Compose',
        topics: ['compose.yaml specification', 'Services definition', 'Networks configuration', 'Volumes configuration', 'Environment variables (.env file interpolation)', 'depends_on conditions (service_healthy)', 'Health checks in compose', 'Profiles', 'docker compose up (-d)', 'docker compose down (-v)', 'docker compose logs (-f)', 'docker compose exec'],
      },
      {
        id: 'mod-04-10',
        code: '04.10',
        title: 'Docker Security',
        topics: ['Root user risks in containers', 'Non-root containers (USER 1000:1000)', 'Read-only root filesystem (--read-only)', 'Linux capabilities (--cap-drop ALL --cap-add NET_BIND_SERVICE)', 'Seccomp default profile', 'AppArmor confinement', 'Docker secrets', 'Image vulnerability scanning (Trivy, Docker Scout)', 'Vulnerability management'],
      },
      {
        id: 'mod-04-11',
        code: '04.11',
        title: 'Docker Production',
        topics: ['Image size optimization', 'Minimal images (Alpine, Chainguard)', 'Distroless images (GoogleContainerTools/distroless)', 'Multi-stage build pipelines', 'Logging drivers (json-file, syslog, awslogs)', 'Resource limits (--memory, --cpus)', 'Restart policies (unless-stopped, always)', 'Production health checks'],
      },
    ],
  },

  // CHAPTER 05
  {
    id: 'ch05-registries',
    number: 5,
    chapterCode: 'CHAPTER 05',
    title: 'CONTAINER REGISTRIES & ARTIFACTS',
    category: 'containerization',
    trackName: 'CONTAINERIZATION',
    summary:
      'Enterprise artifact repositories: Docker Hub, GHCR, AWS ECR, immutable tagging, image digests, retention policies, and multi-environment promotion.',
    targetTech: ['Docker Hub', 'GHCR', 'AWS ECR', 'Google Artifact Registry', 'Harbor'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-05-1',
        code: '05.1',
        title: 'Container Registries',
        topics: ['Docker Hub', 'GitHub Container Registry (GHCR)', 'AWS ECR (Elastic Container Registry)', 'Google Artifact Registry (GAR)', 'Azure Container Registry (ACR)', 'Private on-premises registries (Harbor)'],
      },
      {
        id: 'mod-05-2',
        code: '05.2',
        title: 'Image Management',
        topics: ['docker login (Authentication tokens)', 'docker tag (Namespacing: registry/repo:tag)', 'docker push', 'docker pull', 'Image naming conventions', 'Image tags', 'Image immutable digests (@sha256:...)'],
      },
      {
        id: 'mod-05-3',
        code: '05.3',
        title: 'Image Versioning',
        topics: ['The danger of "latest" tag in production', 'Semantic versioning for images (v1.2.3)', 'Git SHA commit tags (commit-hash tagging)', 'Immutable tags policy', 'Release tags & release branches'],
      },
      {
        id: 'mod-05-4',
        code: '05.4',
        title: 'Artifact Management',
        topics: ['Container images as OCI artifacts', 'Software packages & binary artifacts', 'Helm charts stored as OCI artifacts', 'Artifact repository architectures', 'Artifact lifecycle retention policies', 'Artifact promotion pipelines (Dev -> Staging -> Prod)'],
      },
    ],
  },

  // CHAPTER 06
  {
    id: 'ch06-kubernetes-fundamentals',
    number: 6,
    chapterCode: 'CHAPTER 06',
    title: 'KUBERNETES FUNDAMENTALS',
    category: 'orchestration',
    trackName: 'ORCHESTRATION',
    summary:
      'Core container orchestration: Control Plane (API Server, etcd, Scheduler) and Worker Nodes (kubelet, kube-proxy), Pod lifecycles, Deployments, Services, ConfigMaps, and Volumes.',
    targetTech: ['Kubernetes 1.30+', 'kubectl', 'etcd', 'kubelet', 'CoreDNS'],
    status: 'live',
    liveAction: {
      type: 'route',
      route: '/kubernetes',
      label: 'Launch Kubernetes Academy',
      badge: 'Interactive Academy Live',
      description: '15 Chapters, 71 Concepts, interactive cluster simulator, and manifest generator.',
    },
    subModules: [
      {
        id: 'mod-06-1',
        code: '06.1',
        title: 'Kubernetes Introduction',
        topics: ['What is Kubernetes (K8s)?', 'Why Kubernetes?', 'Docker alone vs Kubernetes orchestration', 'Kubernetes cluster architecture', 'Control plane overview', 'Worker node overview'],
      },
      {
        id: 'mod-06-2',
        code: '06.2',
        title: 'Kubernetes Components',
        topics: ['kube-apiserver (REST API gateway & validation)', 'etcd (Distributed, consistent key-value datastore)', 'kube-scheduler (Pod placement node filter & scoring)', 'kube-controller-manager (Reconciliation control loops)', 'kubelet (Node agent & CRI supervisor)', 'kube-proxy (iptables/IPVS service routing rules)', 'Container runtime (CRI: containerd, CRI-O)'],
      },
      {
        id: 'mod-06-3',
        code: '06.3',
        title: 'Pods',
        topics: ['What is a Pod? (Smallest deployable unit)', 'Pod lifecycle states (Pending, Running, Succeeded, Failed)', 'Multi-container Pods (Shared network & localhost)', 'Init containers (Sequential pre-flight tasks)', 'Sidecar containers (Logging, proxying, monitoring)', 'Pod networking (Unique IP per Pod)'],
      },
      {
        id: 'mod-06-4',
        code: '06.4',
        title: 'YAML & Manifests',
        topics: ['YAML syntax & best practices', 'apiVersion specification', 'kind (Resource type)', 'metadata (name, namespace, labels, annotations)', 'spec (Desired state declaration)', 'labels (Key-value tags for queries)', 'selectors (matchLabels query filters)', 'annotations (Non-identifying metadata & tooling config)'],
      },
      {
        id: 'mod-06-5',
        code: '06.5',
        title: 'Deployments',
        topics: ['Deployment controller', 'ReplicaSet (Pod count guarantee)', 'Replicas specification', 'Rolling updates (maxSurge, maxUnavailable)', 'Rollbacks (kubectl rollout undo)', 'Deployment strategies (RollingUpdate vs Recreate)'],
      },
      {
        id: 'mod-06-6',
        code: '06.6',
        title: 'Services',
        topics: ['ClusterIP (Internal cluster virtual IP)', 'NodePort (Exposing port 30000-32767 on all nodes)', 'LoadBalancer (Cloud provider load balancer integration)', 'Service discovery mechanics', 'Kubernetes CoreDNS resolution', 'Service selectors', 'Endpoints and EndpointSlices'],
      },
      {
        id: 'mod-06-7',
        code: '06.7',
        title: 'Configuration',
        topics: ['ConfigMaps (Plain text configuration)', 'Secrets (Base64-encoded credentials, TLS certs)', 'Injecting as environment variables (env, envFrom)', 'Secret & ConfigMap volume mounting', 'Dynamic configuration reload patterns'],
      },
      {
        id: 'mod-06-8',
        code: '06.8',
        title: 'Storage',
        topics: ['Pod Volumes (emptyDir, hostPath)', 'PersistentVolume (PV: Cluster storage resource)', 'PersistentVolumeClaim (PVC: Developer storage request)', 'StorageClass (CSI provisioner and parameters)', 'Dynamic storage provisioning', 'Stateful workloads data persistence'],
      },
      {
        id: 'mod-06-9',
        code: '06.9',
        title: 'Namespaces',
        topics: ['Namespace (Virtual cluster partitioning)', 'Resource isolation boundaries', 'Resource quotas (ResourceQuota on CPU/RAM)', 'LimitRange (Default min/max per container)'],
      },
      {
        id: 'mod-06-10',
        code: '06.10',
        title: 'Health & Lifecycle',
        topics: ['Liveness probe (Restarting crashed containers)', 'Readiness probe (Removing unready Pods from service traffic)', 'Startup probe (Shielding slow-starting legacy apps)', 'Graceful shutdown (SIGTERM, terminationGracePeriodSeconds)', 'Lifecycle hooks (preStop, postStart)'],
      },
    ],
  },

  // CHAPTER 07
  {
    id: 'ch07-k8s-networking',
    number: 7,
    chapterCode: 'CHAPTER 07',
    title: 'KUBERNETES NETWORKING',
    category: 'orchestration',
    trackName: 'ORCHESTRATION',
    summary:
      'Kubernetes networking: Pod-to-Pod communication, CNI plugins (Calico, Cilium, Flannel), Service Discovery, Ingress Controllers, and NetworkPolicies.',
    targetTech: ['Calico', 'Cilium eBPF', 'Flannel', 'Ingress NGINX', 'NetworkPolicy'],
    status: 'live',
    liveAction: {
      type: 'route',
      route: '/kubernetes',
      label: 'Explore Kubernetes Academy Networking',
      badge: 'Integrated into Kubernetes Academy',
      description: 'Comprehensive CNI and Ingress chapters inside Kubernetes Academy.',
    },
    subModules: [
      {
        id: 'mod-07-1',
        code: '07.1',
        title: 'Kubernetes Networking Model',
        topics: ['Pod IP allocation', 'Node IP network', 'Service IP (ClusterIP virtual CIDR)', 'Cluster networking without NAT', 'Container-to-container networking via loopback'],
      },
      {
        id: 'mod-07-2',
        code: '07.2',
        title: 'Service Discovery',
        topics: ['CoreDNS architecture in kube-system', 'Service DNS naming convention (<svc>.<ns>.svc.cluster.local)', 'Headless services (ClusterIP: None)', 'EndpointSlices scalability model'],
      },
      {
        id: 'mod-07-3',
        code: '07.3',
        title: 'Ingress',
        topics: ['Ingress resource specification', 'Ingress Controller (NGINX, Traefik, ALB)', 'Routing rules (HTTP/HTTPS layer 7)', 'Host-based routing (api.example.com)', 'Path-based routing (/v1 vs /v2)', 'TLS termination with cert-manager'],
      },
      {
        id: 'mod-07-4',
        code: '07.4',
        title: 'Network Policies',
        topics: ['NetworkPolicy resource', 'Ingress rules (Allowed incoming traffic)', 'Egress rules (Allowed outgoing traffic)', 'Pod selectors filtering', 'Namespace selectors filtering (Zero-trust isolation)'],
      },
      {
        id: 'mod-07-5',
        code: '07.5',
        title: 'CNI (Container Network Interface)',
        topics: ['What is CNI?', 'Calico (BGP routing and IPAM)', 'Cilium (eBPF-powered routing and observability)', 'Flannel (Simple VXLAN overlay)', 'CNI plugin architecture and node setup'],
      },
    ],
  },

  // CHAPTER 08
  {
    id: 'ch08-k8s-advanced',
    number: 8,
    chapterCode: 'CHAPTER 08',
    title: 'KUBERNETES ADVANCED',
    category: 'orchestration',
    trackName: 'ORCHESTRATION',
    summary:
      'Advanced orchestration: StatefulSets, DaemonSets, Jobs, Node Affinity, Taints & Tolerations, Autoscaling (HPA/VPA/KEDA), Helm packages, and RBAC security.',
    targetTech: ['Helm 3', 'HPA', 'Cluster Autoscaler', 'RBAC', 'StatefulSet'],
    status: 'live',
    liveAction: {
      type: 'route',
      route: '/kubernetes',
      label: 'Explore Kubernetes Academy Advanced',
      badge: 'Integrated into Kubernetes Academy',
      description: 'Advanced scheduling, Helm packaging, and RBAC security modules.',
    },
    subModules: [
      {
        id: 'mod-08-1',
        code: '08.1',
        title: 'Workload Controllers',
        topics: ['StatefulSet (Ordered deployment, stable network IDs & persistent PVCs)', 'DaemonSet (One Pod per node: logging, monitoring)', 'Job (Run-to-completion batch tasks)', 'CronJob (Scheduled cron tasks in cluster)', 'ReplicaSet controller internals'],
      },
      {
        id: 'mod-08-2',
        code: '08.2',
        title: 'Scheduling',
        topics: ['nodeSelector (Simple key-value node match)', 'Node affinity & anti-affinity (required vs preferred)', 'Pod affinity & anti-affinity (co-locating or spreading Pods)', 'Taints (Repelling Pods from specialized nodes)', 'Tolerations (Allowing specific Pods on tainted nodes)', 'Topology spread constraints (Multi-zone balance)'],
      },
      {
        id: 'mod-08-3',
        code: '08.3',
        title: 'Resource Management',
        topics: ['CPU requests (Guaranteed scheduling reservation)', 'CPU limits (CFS quota throttling ceiling)', 'Memory requests (Guaranteed RAM allocation)', 'Memory limits (Hard ceiling triggering OOMKilled)', 'QoS classes (Guaranteed, Burstable, BestEffort)', 'ResourceQuota enforcement'],
      },
      {
        id: 'mod-08-4',
        code: '08.4',
        title: 'Autoscaling',
        topics: ['Horizontal Pod Autoscaler (HPA: CPU/Memory/Custom metrics)', 'Vertical Pod Autoscaler (VPA: Right-sizing requests)', 'Cluster Autoscaler (Cloud node scaling)', 'Metrics Server architecture'],
      },
      {
        id: 'mod-08-5',
        code: '08.5',
        title: 'Helm',
        topics: ['What is Helm? (Kubernetes package manager)', 'Charts anatomy (Chart.yaml, templates/)', 'Go template syntax ({{ .Values.replicaCount }})', 'values.yaml configuration overrides', 'Helm Releases', 'Helm Repositories', 'helm upgrade', 'helm rollback'],
      },
      {
        id: 'mod-08-6',
        code: '08.6',
        title: 'Kubernetes Security',
        topics: ['RBAC (Role-Based Access Control)', 'Roles & ClusterRoles', 'RoleBindings & ClusterRoleBindings', 'ServiceAccounts (Workload identity)', 'Pod Security Standards (Privileged, Baseline, Restricted)', 'SecurityContext (runAsNonRoot, readOnlyRootFilesystem, capabilities)', 'Secrets management & KMS encryption', 'NetworkPolicies enforcement'],
      },
      {
        id: 'mod-08-7',
        code: '08.7',
        title: 'Kubernetes Troubleshooting',
        topics: ['kubectl get', 'kubectl describe (Events inspection)', 'kubectl logs (-f, --previous)', 'kubectl exec (-it -- sh)', 'kubectl events (-A)', 'CrashLoopBackOff root-cause triage', 'ImagePullBackOff (Auth / tag failures)', 'Pending Pods (Resource starvation, taints)', 'OOMKilled forensics', 'Failed probes remediation'],
      },
    ],
  },

  // CHAPTER 09
  {
    id: 'ch09-cicd',
    number: 9,
    chapterCode: 'CHAPTER 09',
    title: 'CI/CD & AUTOMATION',
    category: 'automation',
    trackName: 'AUTOMATION',
    summary:
      'Continuous Integration & Continuous Delivery: GitHub Actions workflows, matrix builds, release gates, Blue-Green / Canary strategies, and OIDC pipeline security.',
    targetTech: ['GitHub Actions', 'GitLab CI', 'OIDC', 'Docker Buildx', 'Cosign'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-09-1',
        code: '09.1',
        title: 'CI/CD Fundamentals',
        topics: ['What is CI?', 'What is CD?', 'Continuous Integration vs Continuous Delivery vs Continuous Deployment', 'Build phase', 'Test phase', 'Package phase', 'Deploy phase'],
      },
      {
        id: 'mod-09-2',
        code: '09.2',
        title: 'CI Pipeline',
        topics: ['Source code checkout', 'Dependency installation & caching', 'Automated compilation & build', 'Unit testing execution', 'Integration testing', 'Security vulnerability scanning (SAST/SCA)', 'Artifact creation & publishing'],
      },
      {
        id: 'mod-09-3',
        code: '09.3',
        title: 'GitHub Actions',
        topics: ['Workflows (.github/workflows/*.yaml)', 'Trigger events (push, pull_request, workflow_dispatch)', 'Jobs & execution order', 'Steps (uses vs run)', 'Runners (GitHub-hosted vs self-hosted)', 'Actions ecosystem', 'Repository Secrets & Environment Secrets', 'Variables', 'Matrix builds (testing across OS and Node/Python versions)', 'Environments & manual approval protection'],
      },
      {
        id: 'mod-09-4',
        code: '09.4',
        title: 'Pipeline Design',
        topics: ['Pipeline stages organization', 'Job dependencies (needs: [test, build])', 'Parallel job execution', 'Conditional jobs (if: github.ref == \'refs/heads/main\')', 'Artifact upload/download (actions/upload-artifact)', 'Dependency caching (actions/cache)', 'Manual approvals', 'Deployment gates & health verification'],
      },
      {
        id: 'mod-09-5',
        code: '09.5',
        title: 'Deployment Strategies',
        topics: ['Rolling deployment', 'Blue-Green deployment (Zero-downtime router switch)', 'Canary deployment (Progressive 5% -> 25% -> 100% traffic shift)', 'Recreate deployment', 'Feature flags (Decoupling deployment from release)'],
      },
      {
        id: 'mod-09-6',
        code: '09.6',
        title: 'CI/CD Security',
        topics: ['Secret management in pipelines', 'OIDC (OpenID Connect for passwordless cloud auth)', 'Principle of least privilege for runner tokens', 'Dependency security auditing', 'Software supply chain security', 'Cryptographically signed artifacts (Cosign)'],
      },
    ],
  },

  // CHAPTER 10
  {
    id: 'ch10-iac',
    number: 10,
    chapterCode: 'CHAPTER 10',
    title: 'INFRASTRUCTURE AS CODE',
    category: 'automation',
    trackName: 'AUTOMATION',
    summary:
      'Declarative cloud provisioning with Terraform (Providers, Resources, State locking, Remote S3/DynamoDB backends, Modules) and Configuration Management with Ansible.',
    targetTech: ['Terraform 1.9+', 'OpenTofu', 'AWS Provider', 'Ansible 2.16+', 'YAML'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-10-1',
        code: '10.1',
        title: 'IaC Fundamentals',
        topics: ['What is Infrastructure as Code?', 'Declarative vs imperative provisioning', 'Desired state vs actual state', 'Infrastructure drift detection', 'Idempotency in cloud management'],
      },
      {
        id: 'mod-10-2',
        code: '10.2',
        title: 'Terraform',
        topics: ['Providers (AWS, Azure, Google, Kubernetes)', 'Resources (aws_instance, aws_vpc)', 'Data sources (Fetching existing cloud resources)', 'Variables (input variables, validation)', 'Outputs (Returning provisioned endpoints)', 'Locals (DRY expressions)', 'Modules (Reusable architecture blocks)', 'State file (.tfstate)', 'Backend configuration', 'terraform init', 'terraform plan (Predictive diff)', 'terraform apply', 'terraform destroy'],
      },
      {
        id: 'mod-10-3',
        code: '10.3',
        title: 'Terraform State',
        topics: ['Local state risks', 'Remote state (AWS S3, Azure Blob, Terraform Cloud)', 'State locking (DynamoDB to prevent concurrent writes)', 'State drift detection', 'terraform state inspection (list, show, rm)', 'Importing existing infrastructure (terraform import)', 'Disaster state recovery'],
      },
      {
        id: 'mod-10-4',
        code: '10.4',
        title: 'Terraform Modules',
        topics: ['Module folder structure (main.tf, variables.tf, outputs.tf)', 'Module inputs', 'Module outputs', 'Module composition (Calling child modules)', 'Module versioning & Git module sources'],
      },
      {
        id: 'mod-10-5',
        code: '10.5',
        title: 'Infrastructure Automation',
        topics: ['Automated provisioning workflows', 'Cloud Networking (VPCs, Subnets, Gateways)', 'Compute clusters (EC2, Auto Scaling Groups)', 'Cloud Storage (S3 buckets, lifecycle rules)', 'IAM Roles & policies', 'Cloud Databases (RDS, Aurora)', 'Kubernetes cluster infrastructure (EKS, GKE)'],
      },
      {
        id: 'mod-10-6',
        code: '10.6',
        title: 'Ansible',
        topics: ['Inventory files (hosts, groups, dynamic inventory)', 'Playbooks (YAML automation definitions)', 'Tasks & handlers', 'Ansible modules (apt, systemd, template, copy)', 'Variables & facts', 'Handlers (Notified service restarts)', 'Ansible Roles (Reusable configuration blueprints)', 'Jinja2 templates', 'Ansible Vault (Encrypted secrets)'],
      },
    ],
  },

  // CHAPTER 11
  {
    id: 'ch11-cloud-fundamentals',
    number: 11,
    chapterCode: 'CHAPTER 11',
    title: 'CLOUD FUNDAMENTALS',
    category: 'cloud',
    trackName: 'CLOUD',
    summary:
      'Hyperscaler architectures: IaaS/PaaS/SaaS models, AWS core services (EC2, S3, VPC, IAM, RDS), Microsoft Azure, Google Cloud Platform, and High Availability designs.',
    targetTech: ['AWS', 'Microsoft Azure', 'Google Cloud Platform (GCP)', 'Multi-Region HA'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-11-1',
        code: '11.1',
        title: 'Cloud Computing',
        topics: ['What is cloud computing?', 'IaaS vs PaaS vs SaaS', 'Public cloud', 'Private cloud', 'Hybrid cloud architecture', 'Multi-cloud strategy'],
      },
      {
        id: 'mod-11-2',
        code: '11.2',
        title: 'AWS Fundamentals',
        topics: ['Regions & Availability Zones (AZs)', 'EC2 (Elastic Compute Cloud instances)', 'AMI (Amazon Machine Images)', 'EBS (Elastic Block Store volumes)', 'S3 (Simple Storage Service buckets)', 'VPC (Virtual Private Cloud)', 'IAM (Identity and Access Management)', 'RDS (Relational Database Service)', 'ECS (Elastic Container Service)', 'EKS (Elastic Kubernetes Service)', 'CloudWatch (Metrics & logs)', 'Route 53 (Managed DNS)', 'Elastic Load Balancing (ALB/NLB)'],
      },
      {
        id: 'mod-11-3',
        code: '11.3',
        title: 'Microsoft Azure',
        topics: ['Azure Regions & Geographies', 'Resource Groups', 'Virtual Machines (VMs)', 'Blob Storage (Containers, tiers)', 'Virtual Networks (VNets)', 'AKS (Azure Kubernetes Service)', 'ACR (Azure Container Registry)', 'Azure Monitor & Log Analytics', 'Azure Load Balancer'],
      },
      {
        id: 'mod-11-4',
        code: '11.4',
        title: 'Google Cloud (GCP)',
        topics: ['GCP Projects & Folders', 'Compute Engine (VMs)', 'Cloud Storage (GCS)', 'VPC (Global virtual networks)', 'GKE (Google Kubernetes Engine)', 'Artifact Registry', 'Cloud Run (Serverless containers)', 'Cloud Monitoring & Logging'],
      },
      {
        id: 'mod-11-5',
        code: '11.5',
        title: 'Cloud Architecture',
        topics: ['High availability (Multi-AZ redundancy)', 'Fault tolerance', 'Scalability (Vertical vs horizontal auto-scaling)', 'Disaster recovery strategies (Pilot light, Warm standby, Multi-region active-active)', 'Multi-region architectures', 'Cost optimization fundamentals'],
      },
    ],
  },

  // CHAPTER 12
  {
    id: 'ch12-cloud-networking',
    number: 12,
    chapterCode: 'CHAPTER 12',
    title: 'CLOUD NETWORKING',
    category: 'cloud',
    trackName: 'CLOUD',
    summary:
      'Cloud enterprise networks: VPC subnets, Internet/NAT Gateways, Security Groups vs NACLs, Application/Network Load Balancers, Route 53, and VPN/Direct Connect hybrid transit.',
    targetTech: ['AWS VPC', 'Transit Gateway', 'ALB/NLB', 'Route 53', 'Security Groups'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-12-1',
        code: '12.1',
        title: 'Virtual Networks',
        topics: ['VPC creation & CIDR block planning', 'Subnetting strategy', 'Public subnets (Internet-routable)', 'Private subnets (Isolated database & compute)', 'Route tables & routes', 'Internet Gateway (IGW)', 'NAT Gateway (Outbound internet for private subnets)'],
      },
      {
        id: 'mod-12-2',
        code: '12.2',
        title: 'Cloud Security',
        topics: ['Security Groups (Stateful instance-level firewalls)', 'Network ACLs (NACLs: Stateless subnet-level firewalls)', 'Cloud Firewalls (AWS WAF, Network Firewall)', 'IAM Policies & Roles', 'Service Accounts & Workload Identity'],
      },
      {
        id: 'mod-12-3',
        code: '12.3',
        title: 'Load Balancing',
        topics: ['Application Load Balancer (ALB: Layer 7 HTTP/HTTPS routing)', 'Network Load Balancer (NLB: Layer 4 ultra-low latency TCP/UDP)', 'Internal load balancers (Private backend traffic)', 'External internet-facing load balancers'],
      },
      {
        id: 'mod-12-4',
        code: '12.4',
        title: 'Cloud DNS',
        topics: ['Hosted Zones (Public vs Private Route 53)', 'DNS records (A, CNAME, Alias records)', 'Routing policies (Simple, Weighted, Latency-based, Failover, Geolocation)', 'Route 53 Health checks & automated failover'],
      },
      {
        id: 'mod-12-5',
        code: '12.5',
        title: 'Private Connectivity',
        topics: ['VPN (IPsec tunnels)', 'Site-to-Site VPN', 'Direct Connect / ExpressRoute (Dedicated physical fiber)', 'PrivateLink / VPC Endpoints (Private access to S3/APIs without NAT)', 'VPC Peering', 'Transit Gateway (Hub-and-spoke multi-VPC routing)'],
      },
    ],
  },

  // CHAPTER 13
  {
    id: 'ch13-databases',
    number: 13,
    chapterCode: 'CHAPTER 13',
    title: 'DATABASES FOR DEVOPS',
    category: 'cloud',
    trackName: 'CLOUD',
    summary:
      'Database reliability and operations: PostgreSQL relational databases, Redis caching & Pub/Sub, MongoDB document stores, automated backups, replication, failover, and containerized state.',
    targetTech: ['PostgreSQL 16', 'Redis 7', 'MongoDB', 'WAL Replication', 'PgBouncer'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-13-1',
        code: '13.1',
        title: 'Database Fundamentals',
        topics: ['Relational databases (RDBMS: ACID guarantees)', 'NoSQL databases (CAP theorem trade-offs)', 'SQL basics', 'Tables', 'Rows', 'Columns', 'Indexes (B-Tree, Hash indexes)', 'Transactions (BEGIN, COMMIT, ROLLBACK)'],
      },
      {
        id: 'mod-13-2',
        code: '13.2',
        title: 'PostgreSQL',
        topics: ['PostgreSQL architecture', 'Schemas & tables', 'User management & role permissions', 'Indexes & query plan optimization (EXPLAIN ANALYZE)', 'Transactions & MVCC', 'Automated WAL archiving & logical backups'],
      },
      {
        id: 'mod-13-3',
        code: '13.3',
        title: 'Redis',
        topics: ['In-memory key-value data structures', 'Caching strategies (Cache-aside, Write-through)', 'TTL (Time To Live expiry)', 'Persistence modes (RDB snapshots vs AOF append-only log)', 'Pub/Sub messaging'],
      },
      {
        id: 'mod-13-4',
        code: '13.4',
        title: 'MongoDB',
        topics: ['Document database concepts', 'Collections & BSON documents', 'Secondary indexing', 'Replica sets & automatic primary election'],
      },
      {
        id: 'mod-13-5',
        code: '13.5',
        title: 'Database Operations',
        topics: ['Automated database backups (pg_dump, snapshot)', 'Disaster point-in-time restore (PITR)', 'Streaming replication (Primary-Replica)', 'High availability architectures', 'Automated failover (Patroni)', 'Database schema migrations (Flyway, Liquibase, Prisma)', 'Connection pooling (PgBouncer)'],
      },
      {
        id: 'mod-13-6',
        code: '13.6',
        title: 'Databases in Containers',
        topics: ['Running PostgreSQL in Docker', 'Running Redis in Docker', 'Running MongoDB in Docker', 'Persistent storage volume mounts', 'Container database backup automation', 'Container networking for database isolation'],
      },
    ],
  },

  // CHAPTER 14
  {
    id: 'ch14-observability',
    number: 14,
    chapterCode: 'CHAPTER 14',
    title: 'OBSERVABILITY & MONITORING',
    category: 'operations',
    trackName: 'OPERATIONS',
    summary:
      'The Three Pillars of Observability: Prometheus metrics & PromQL, Grafana visualization dashboards, centralized logging (Loki, Fluent Bit), distributed tracing (OpenTelemetry, Jaeger), and Alertmanager.',
    targetTech: ['Prometheus', 'Grafana', 'OpenTelemetry (OTel)', 'Loki', 'Alertmanager'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-14-1',
        code: '14.1',
        title: 'Observability Fundamentals',
        topics: ['Monitoring (Known unknowns) vs Observability (Unknown unknowns)', 'Metrics (Aggregated numerical time-series)', 'Logs (Discrete timestamped event records)', 'Traces (Request journey across distributed services)', 'Events', 'Telemetry collection architectures'],
      },
      {
        id: 'mod-14-2',
        code: '14.2',
        title: 'Metrics',
        topics: ['Counter metrics (Monotonically increasing)', 'Gauge metrics (Values that rise and fall)', 'Histogram metrics (Bucketed observations for latency)', 'Percentiles (p50, p95, p99 latency SLA measurement)', 'RED method (Rate, Errors, Duration for microservices)', 'USE method (Utilization, Saturation, Errors for hardware/nodes)'],
      },
      {
        id: 'mod-14-3',
        code: '14.3',
        title: 'Prometheus',
        topics: ['Prometheus pull-based architecture', 'Scrape targets & service discovery', 'Metrics scraping interval', 'Exporters (node_exporter, kube-state-metrics)', 'PromQL syntax (rate(), sum(), histogram_quantile())', 'Prometheus Alert rules', 'Alertmanager routing and deduplication'],
      },
      {
        id: 'mod-14-4',
        code: '14.4',
        title: 'Grafana',
        topics: ['Grafana dashboards configuration', 'Visual panels (Time series, Stat, Bar gauge, Heatmap)', 'Queries design against Prometheus & Loki', 'Dashboard variables for multi-cluster/namespace filtering', 'Grafana alerts', 'Data sources integration'],
      },
      {
        id: 'mod-14-5',
        code: '14.5',
        title: 'Logging',
        topics: ['Application logs vs System logs', 'Structured JSON logging best practices', 'Log aggregation pipeline architecture', 'Grafana Loki (LogQL query language)', 'Elasticsearch / OpenSearch', 'Fluent Bit log forwarding & parsing daemon'],
      },
      {
        id: 'mod-14-6',
        code: '14.6',
        title: 'Distributed Tracing',
        topics: ['OpenTelemetry (OTel standard)', 'Spans (Single operation unit)', 'Traces (DAG of spans representing a request)', 'Trace context propagation (W3C traceparent headers)', 'Jaeger visualization UI', 'Grafana Tempo high-scale trace storage'],
      },
      {
        id: 'mod-14-7',
        code: '14.7',
        title: 'Alerting',
        topics: ['Alert rule definition best practices', 'Alert severity levels (Critical, Warning, Info)', 'Notification channels (PagerDuty, Slack, Email, Webhooks)', 'Alert fatigue elimination', 'Incident escalation policies'],
      },
    ],
  },

  // CHAPTER 15
  {
    id: 'ch15-sre',
    number: 15,
    chapterCode: 'CHAPTER 15',
    title: 'SRE & PRODUCTION ENGINEERING',
    category: 'operations',
    trackName: 'OPERATIONS',
    summary:
      'Site Reliability Engineering: SLAs, SLIs, SLOs, Error Budgets, Incident Management, Blameless Postmortems, Capacity Planning, and Production Readiness Reviews.',
    targetTech: ['Error Budgets', 'SLI/SLO Math', 'PagerDuty', 'Blameless Postmortems'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-15-1',
        code: '15.1',
        title: 'SRE Fundamentals',
        topics: ['What is Site Reliability Engineering (SRE)?', 'SRE vs DevOps relationship (Class SRE implements interface DevOps)', 'Reliability definition', 'Availability (99.9% "three nines" vs 99.99%)', 'Scalability engineering'],
      },
      {
        id: 'mod-15-2',
        code: '15.2',
        title: 'Service Level Concepts',
        topics: ['SLA (Service Level Agreement: legal/contractual penalty commitment)', 'SLI (Service Level Indicator: empirical quantitative measurement)', 'SLO (Service Level Objective: internal reliability target, e.g. 99.9%)', 'Error budget calculation & burn rate policies'],
      },
      {
        id: 'mod-15-3',
        code: '15.3',
        title: 'Reliability',
        topics: ['High availability patterns', 'Fault tolerance', 'Redundancy (N+1, 2N)', 'Automated failover', 'Graceful degradation (Circuit breakers, load shedding)'],
      },
      {
        id: 'mod-15-4',
        code: '15.4',
        title: 'Incident Management',
        topics: ['Incident definition', 'Severity levels (Sev-1 Critical, Sev-2 Major, Sev-3 Minor)', 'Detection via alerts', 'Incident commander response role', 'Escalation paths', 'Mitigation before root cause', 'Resolution verification', 'Blameless postmortem culture and action items'],
      },
      {
        id: 'mod-15-5',
        code: '15.5',
        title: 'Production Readiness',
        topics: ['Production Readiness Review (PRR) checklists', 'Health checks validation', 'Monitoring & dashboards audit', 'Logging completeness', 'Alerting coverage', 'Backups verification & restore drill', 'Disaster recovery plan', 'Capacity planning', 'Security posture audit'],
      },
      {
        id: 'mod-15-6',
        code: '15.6',
        title: 'Performance Engineering',
        topics: ['Load testing (k6, Locust, Apache JMeter)', 'Stress testing (Finding the breaking point)', 'Bottleneck identification', 'CPU profiling (Flamegraphs, pprof)', 'Memory profiling (Heap dumps, leak analysis)', 'Latency distribution analysis'],
      },
    ],
  },

  // CHAPTER 16
  {
    id: 'ch16-devsecops',
    number: 16,
    chapterCode: 'CHAPTER 16',
    title: 'DEVOPS SECURITY & DEVSECOPS',
    category: 'security',
    trackName: 'SECURITY',
    summary:
      'Shifting security left: Static Application Security Testing (SAST), Software Composition Analysis (SCA), HashiCorp Vault secrets management, container CVE scanning, and SBOM supply-chain security.',
    targetTech: ['HashiCorp Vault', 'Trivy', 'Cosign', 'SBOM', 'SonarQube'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-16-1',
        code: '16.1',
        title: 'Security Fundamentals',
        topics: ['CIA triad (Confidentiality, Integrity, Availability)', 'Authentication (AuthN)', 'Authorization (AuthZ)', 'Encryption in transit vs encryption at rest', 'Principle of least privilege (PoLP)', 'Zero trust network architecture'],
      },
      {
        id: 'mod-16-2',
        code: '16.2',
        title: 'Secrets Management',
        topics: ['API keys & database passwords handling', 'The danger of hardcoded secrets in Git', 'Environment variables trade-offs', 'HashiCorp Vault (Dynamic secrets, leasing, transit encryption)', 'AWS Secrets Manager / Azure Key Vault', 'Automated secret rotation'],
      },
      {
        id: 'mod-16-3',
        code: '16.3',
        title: 'Container Security',
        topics: ['Image vulnerability scanning (Trivy, Grype)', 'CVE severity scoring (CVSS)', 'Non-root execution (USER directive)', 'Linux capabilities stripping', 'Read-only container root filesystems', 'Seccomp system call filtering', 'AppArmor security profiles'],
      },
      {
        id: 'mod-16-4',
        code: '16.4',
        title: 'Kubernetes Security',
        topics: ['RBAC least privilege auditing', 'ServiceAccounts scoping', 'Pod Security Admission (PSA)', 'NetworkPolicies default-deny', 'K8s Secrets encryption at rest with KMS', 'Admission control webhooks (OPA Gatekeeper, Kyverno)'],
      },
      {
        id: 'mod-16-5',
        code: '16.5',
        title: 'Supply Chain Security',
        topics: ['Software Bill of Materials (SBOM: CycloneDX, SPDX)', 'Dependency scanning & vulnerability alerts', 'Container image cryptographic signing (Sigstore / Cosign)', 'Binary artifact signing', 'Provenance attestations', 'SLSA framework (Supply-chain Levels for Software Artifacts)'],
      },
      {
        id: 'mod-16-6',
        code: '16.6',
        title: 'DevSecOps Pipeline',
        topics: ['SAST (Static Application Security Testing: Semgrep, SonarQube)', 'DAST (Dynamic Application Security Testing: OWASP ZAP)', 'SCA (Software Composition Analysis: Snyk, Dependabot)', 'Container scanning in CI', 'IaC security scanning (tfsec, checkov, Trivy)', 'Secret scanning (git-leaks, TruffleHog)', 'Security quality gates breaking CI on critical CVEs'],
      },
    ],
  },

  // CHAPTER 17
  {
    id: 'ch17-gitops',
    number: 17,
    chapterCode: 'CHAPTER 17',
    title: 'GITOPS & CONTINUOUS DELIVERY',
    category: 'advanced',
    trackName: 'ADVANCED CLOUD-NATIVE',
    summary:
      'Git as the single source of truth: Argo CD and Flux controllers, automated state reconciliation, drift detection, ApplicationSets, and secure GitOps architecture.',
    targetTech: ['Argo CD', 'Flux v2', 'Kustomize', 'Helm', 'GitOps Operator'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-17-1',
        code: '17.1',
        title: 'GitOps Fundamentals',
        topics: ['What is GitOps?', 'Desired state declaration in Git', 'Git as the single source of truth', 'Declarative infrastructure and application manifests', 'Automated reconciliation loops'],
      },
      {
        id: 'mod-17-2',
        code: '17.2',
        title: 'Argo CD',
        topics: ['Argo CD architecture & Custom Resource Definitions (CRDs)', 'Application CRD', 'ApplicationSet (Multi-cluster & multi-tenant automation)', 'Sync strategies (Manual vs Auto-sync with prune)', 'Health status monitoring', 'Drift detection (Out of Sync alerts)', 'Automated self-healing', 'Rollback to Git commit SHA'],
      },
      {
        id: 'mod-17-3',
        code: '17.3',
        title: 'Flux',
        topics: ['Flux v2 architecture (GitOps Toolkit controllers)', 'GitRepository & OCIRepository sources', 'Kustomization CRD', 'HelmRelease controller', 'Flux reconciliation workflow'],
      },
      {
        id: 'mod-17-4',
        code: '17.4',
        title: 'GitOps Architecture',
        topics: ['Git repository structure (App repo vs Config repo separation)', 'CI pipeline pushing container image and updating manifest repo', 'Container registry integration', 'Kubernetes cluster running GitOps agent', 'In-cluster pull-based security model', 'Reconciliation loop mechanics'],
      },
      {
        id: 'mod-17-5',
        code: '17.5',
        title: 'GitOps Security',
        topics: ['Repository permissions & branch protection', 'Deployment credentials isolation (No CI access to cluster)', 'Secrets management in GitOps (Sealed Secrets, External Secrets Operator)', 'Multi-environment folder and branch separation'],
      },
    ],
  },

  // CHAPTER 18
  {
    id: 'ch18-orchestration-advanced',
    number: 18,
    chapterCode: 'CHAPTER 18',
    title: 'ADVANCED CONTAINER ORCHESTRATION',
    category: 'advanced',
    trackName: 'ADVANCED CLOUD-NATIVE',
    summary:
      'Kubernetes internals: API Server admission & request flow, Informers & workqueues, CRI runtimes, eBPF Cilium networking, Service Mesh (Istio mTLS), and Argo Rollouts.',
    targetTech: ['Kubernetes Internals', 'eBPF', 'Istio', 'Argo Rollouts', 'CRI-O'],
    status: 'live',
    liveAction: {
      type: 'route',
      route: '/kubernetes',
      label: 'Explore Kubernetes Academy Internals',
      badge: 'Integrated into Kubernetes Academy',
      description: 'Deep dive into Kubernetes internals and runtime mechanics.',
    },
    subModules: [
      {
        id: 'mod-18-1',
        code: '18.1',
        title: 'Kubernetes Internals',
        topics: ['API server request pipeline (AuthN -> AuthZ -> Mutating Webhook -> Validation -> etcd)', 'Scheduler filtering and scoring algorithms', 'Controller Manager reconciliation loops', 'SharedIndexInformers & DeltaFIFO workqueues', 'Optimistic concurrency control via resourceVersion in etcd'],
      },
      {
        id: 'mod-18-2',
        code: '18.2',
        title: 'Container Runtime',
        topics: ['containerd architecture and gRPC API', 'runc low-level OCI specification executor', 'CRI (Container Runtime Interface) specification', 'Image runtime pulling and layer un-tarring', 'Rootless containers in production'],
      },
      {
        id: 'mod-18-3',
        code: '18.3',
        title: 'Advanced Networking',
        topics: ['CNI chaining architecture', 'eBPF (Extended Berkeley Packet Filter) kernel bytecode', 'Cilium eBPF kube-proxy replacement', 'High-performance eBPF NetworkPolicies', 'Service mesh data plane architecture'],
      },
      {
        id: 'mod-18-4',
        code: '18.4',
        title: 'Service Mesh',
        topics: ['What is a service mesh?', 'Sidecar proxy model (Envoy proxy)', 'Data plane vs Control plane (Istio / Linkerd)', 'Traffic management (VirtualService, DestinationRule)', 'Automatic mutual TLS (mTLS) encryption', 'Automatic retries and timeouts', 'Circuit breakers & outlier detection', 'Service mesh distributed observability'],
      },
      {
        id: 'mod-18-5',
        code: '18.5',
        title: 'Advanced Deployment',
        topics: ['Canary deployment automation', 'Blue-Green deployment automation', 'Progressive delivery concepts', 'Argo Rollouts (Automated metric analysis)', 'Feature flags and traffic splitting (Flagger)'],
      },
    ],
  },

  // CHAPTER 19
  {
    id: 'ch19-platform-engineering',
    number: 19,
    chapterCode: 'CHAPTER 19',
    title: 'PLATFORM ENGINEERING',
    category: 'advanced',
    trackName: 'ADVANCED CLOUD-NATIVE',
    summary:
      'Internal Developer Platforms (IDP): Developer Experience (DevEx), self-service infrastructure, Spotify Backstage developer portals, service catalogs, and Golden Paths.',
    targetTech: ['Backstage', 'Internal Developer Platform (IDP)', 'Dev Containers', 'Golden Paths'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-19-1',
        code: '19.1',
        title: 'Platform Engineering',
        topics: ['What is platform engineering?', 'Internal Developer Platform (IDP)', 'Developer experience (DevEx) metrics', 'Self-service cloud infrastructure', 'Golden paths vs paved roads'],
      },
      {
        id: 'mod-19-2',
        code: '19.2',
        title: 'Developer Portals',
        topics: ['Spotify Backstage architecture', 'Software service catalog', 'Scaffolder software templates', 'Software ownership & TechDocs', 'API documentation aggregation'],
      },
      {
        id: 'mod-19-3',
        code: '19.3',
        title: 'Platform Automation',
        topics: ['Self-service app deployment workflows', 'Automated ephemeral environment provisioning', 'Standardized application templates', 'Modular infrastructure modules (Crossplane / Terraform)'],
      },
      {
        id: 'mod-19-4',
        code: '19.4',
        title: 'Developer Experience',
        topics: ['Local development workflows', 'Dev containers (VS Code remote containers)', 'Preview environments per Pull Request', 'Standardized organization CI/CD workflows', 'Developer CLI tooling'],
      },
    ],
  },

  // CHAPTER 20
  {
    id: 'ch20-cloud-native-architecture',
    number: 20,
    chapterCode: 'CHAPTER 20',
    title: 'CLOUD-NATIVE APPLICATION ARCHITECTURE',
    category: 'advanced',
    trackName: 'ADVANCED CLOUD-NATIVE',
    summary:
      'Distributed systems engineering: Monolith to Microservices, Event-Driven Architectures, Message Queues (Kafka, RabbitMQ), API Gateways, and CAP Theorem consistency.',
    targetTech: ['Microservices', 'Apache Kafka', 'RabbitMQ', 'API Gateway', 'CAP Theorem'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-20-1',
        code: '20.1',
        title: 'Application Architecture',
        topics: ['Monolithic architecture', 'Modular monolith', 'Microservices architecture', 'Event-driven architecture (EDA)', 'Serverless architecture (AWS Lambda, Cloud Run)'],
      },
      {
        id: 'mod-20-2',
        code: '20.2',
        title: 'Microservices',
        topics: ['Domain-Driven Design (DDD) service boundaries', 'Dynamic service discovery', 'API gateways pattern', 'Distributed configuration management', 'Distributed systems trade-offs', 'Failure handling & fault isolation'],
      },
      {
        id: 'mod-20-3',
        code: '20.3',
        title: 'APIs',
        topics: ['REST API design principles', 'HTTP APIs', 'API authentication (JWT, OAuth 2.0)', 'API authorization (RBAC, ABAC)', 'Rate limiting & throttling algorithms (Token bucket)', 'API versioning strategies', 'API gateway proxies (Kong, Envoy)'],
      },
      {
        id: 'mod-20-4',
        code: '20.4',
        title: 'Messaging',
        topics: ['Message queues vs Event streaming', 'Pub/Sub communication pattern', 'Apache Kafka (Partitions, consumer groups, offsets)', 'RabbitMQ (Exchanges, queues, routing keys)', 'Event-driven distributed systems'],
      },
      {
        id: 'mod-20-5',
        code: '20.5',
        title: 'Distributed Systems',
        topics: ['CAP theorem (Consistency, Availability, Partition tolerance)', 'Strong consistency vs Eventual consistency', 'Distributed transactions & Saga pattern', 'Idempotency in API and event processing', 'Distributed consensus (Raft, Paxos)'],
      },
    ],
  },

  // CHAPTER 21
  {
    id: 'ch21-automation-scripting',
    number: 21,
    chapterCode: 'CHAPTER 21',
    title: 'AUTOMATION & SCRIPTING',
    category: 'engineering',
    trackName: 'ENGINEERING',
    summary:
      'Production automation: Advanced Bash scripting, Python for DevOps (boto3, requests, PyYAML), JSON/YAML CLI parsing (jq, yq), Makefiles, and scheduled cron jobs.',
    targetTech: ['Python 3.12', 'Bash', 'jq', 'yq', 'Make', 'boto3'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-21-1',
        code: '21.1',
        title: 'Bash Automation',
        topics: ['Shell script structuring', 'Dynamic variables & parameter expansion', 'Modular functions & return values', 'Conditionals & regex evaluations', 'Looping through files and API streams', 'Positional arguments handling', 'Exit code handling', 'Robust error trapping (trap INT TERM EXIT)'],
      },
      {
        id: 'mod-21-2',
        code: '21.2',
        title: 'Python for DevOps',
        topics: ['Python fundamentals for sysadmins', 'Filesystem operations & paths (pathlib)', 'Calling REST APIs with requests', 'JSON parsing and schema validation', 'YAML parsing and generation (PyYAML)', 'HTTP client automation', 'Automated cloud provisioning scripts (boto3)', 'Building interactive CLI tools (Click, Typer)'],
      },
      {
        id: 'mod-21-3',
        code: '21.3',
        title: 'CLI Automation',
        topics: ['Unix pipelines mastery', 'xargs argument construction', 'jq (JSON stream filtering and transformation)', 'yq (YAML stream manipulation in CI/CD)', 'curl automation with authentication headers', 'Makefiles for task automation'],
      },
      {
        id: 'mod-21-4',
        code: '21.4',
        title: 'Task Automation',
        topics: ['GNU Make build recipes', 'Modern task runners (Taskfile, Just)', 'Linux Cron scheduling syntax', 'Systemd timer units', 'End-to-end automation workflows'],
      },
    ],
  },

  // CHAPTER 22
  {
    id: 'ch22-release-engineering',
    number: 22,
    chapterCode: 'CHAPTER 22',
    title: 'ARTIFACTS, PACKAGING & RELEASE ENGINEERING',
    category: 'engineering',
    trackName: 'ENGINEERING',
    summary:
      'Software release lifecycle: package managers (npm, pip, Maven), artifact repositories (Nexus, Artifactory), Semantic Versioning, release changelogs, and lockfiles.',
    targetTech: ['SemVer', 'JFrog Artifactory', 'npm / pip', 'Changelogs', 'Lockfiles'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-22-1',
        code: '22.1',
        title: 'Package Management',
        topics: ['npm (JavaScript packaging & node_modules)', 'pip (Python wheels & virtual environments)', 'Maven (Java pom.xml & jars)', 'Gradle (Kotlin/Groovy build automation)', 'NuGet (.NET packaging)'],
      },
      {
        id: 'mod-22-2',
        code: '22.2',
        title: 'Artifact Repositories',
        topics: ['Enterprise artifact storage (JFrog Artifactory, Sonatype Nexus)', 'Artifact semantic versioning', 'Retention and disk cleanup policies', 'Artifact promotion gates'],
      },
      {
        id: 'mod-22-3',
        code: '22.3',
        title: 'Release Engineering',
        topics: ['Release branch workflows (release/vX.Y)', 'Release tags & GitHub Releases', 'Automated changelog generation (semantic-release)', 'Semantic versioning enforcement', 'Automated release pipelines'],
      },
      {
        id: 'mod-22-4',
        code: '22.4',
        title: 'Software Supply Chain',
        topics: ['Direct and transitive dependencies', 'Deterministic lock files (package-lock.json, poetry.lock)', 'Software Bill of Materials (SBOM) generation', 'Provenance tracking', 'Cryptographic artifact signing'],
      },
    ],
  },

  // CHAPTER 23
  {
    id: 'ch23-testing',
    number: 23,
    chapterCode: 'CHAPTER 23',
    title: 'TESTING & QUALITY ENGINEERING',
    category: 'engineering',
    trackName: 'ENGINEERING',
    summary:
      'Automated quality gates: Unit, Integration, End-to-End testing, Infrastructure testing (Terratest, kubeval), and automated test execution in CI pipelines.',
    targetTech: ['Terratest', 'k6', 'Playwright', 'Jest / Pytest', 'kube-score'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-23-1',
        code: '23.1',
        title: 'Testing Fundamentals',
        topics: ['Unit testing', 'Integration testing', 'End-to-end (E2E) testing', 'Smoke testing in deployment pipelines', 'Regression test suites'],
      },
      {
        id: 'mod-23-2',
        code: '23.2',
        title: 'Infrastructure Testing',
        topics: ['Terraform automated testing (Terratest in Go)', 'Kubernetes manifest validation (kubeval, kube-score)', 'Container testing (Container Structure Tests)'],
      },
      {
        id: 'mod-23-3',
        code: '23.3',
        title: 'Application Testing',
        topics: ['REST API contract testing', 'Performance load testing (k6 scripts in CI)', 'Automated security testing'],
      },
      {
        id: 'mod-23-4',
        code: '23.4',
        title: 'Test Automation',
        topics: ['Test pipelines in CI/CD', 'Ephemeral test environments', 'Automated test report generation', 'Parallel test execution runners', 'Test artifacts preservation'],
      },
    ],
  },

  // CHAPTER 24
  {
    id: 'ch24-disaster-recovery',
    number: 24,
    chapterCode: 'CHAPTER 24',
    title: 'DISASTER RECOVERY & BUSINESS CONTINUITY',
    category: 'operations',
    trackName: 'OPERATIONS',
    summary:
      'Enterprise resilience: RPO (Recovery Point Objective) and RTO (Recovery Time Objective), automated backup strategies, regional failover, and disaster recovery drills.',
    targetTech: ['Velero', 'AWS Backup', 'RPO / RTO', 'Cross-Region Replication'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-24-1',
        code: '24.1',
        title: 'Disaster Recovery',
        topics: ['What is disaster recovery?', 'Backups vs true disaster recovery', 'RPO (Recovery Point Objective: max allowable data loss in time)', 'RTO (Recovery Time Objective: max allowable downtime in time)'],
      },
      {
        id: 'mod-24-2',
        code: '24.2',
        title: 'Backup Strategies',
        topics: ['Database continuous WAL archiving & snapshots', 'Storage volume block-level snapshots', 'Object storage versioning and cross-region replication (CRR)', 'Kubernetes cluster state backups with Velero'],
      },
      {
        id: 'mod-24-3',
        code: '24.3',
        title: 'High Availability',
        topics: ['Multi-zone compute redundancy', 'Automated DNS and load balancer failover', 'Multi-zone database clustering', 'Multi-region active-passive vs active-active architecture'],
      },
      {
        id: 'mod-24-4',
        code: '24.4',
        title: 'Disaster Scenarios',
        topics: ['Individual server hardware failure', 'Database primary node crash', 'Cloud hyperscaler region outage', 'Data corruption remediation', 'Accidental resource deletion triage', 'Ransomware and security incident response'],
      },
      {
        id: 'mod-24-5',
        code: '24.5',
        title: 'Recovery',
        topics: ['Point-in-time database restoration', 'Automated DNS failover execution', 'Testing recovery runbooks', 'Simulated disaster recovery drills (GameDays)'],
      },
    ],
  },

  // CHAPTER 25
  {
    id: 'ch25-finops',
    number: 25,
    chapterCode: 'CHAPTER 25',
    title: 'COST OPTIMIZATION',
    category: 'engineering',
    trackName: 'ENGINEERING',
    summary:
      'Cloud FinOps: Right-sizing instances, Spot/Preemptible instances, Reserved Instances (RIs), Kubernetes overprovisioning remediation (Karpenter/Kubecost), and cost alerts.',
    targetTech: ['FinOps', 'Kubecost', 'AWS Cost Explorer', 'Karpenter', 'Spot Instances'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-25-1',
        code: '25.1',
        title: 'Cloud Cost Fundamentals',
        topics: ['Compute hourly costs', 'Storage tier pricing (Hot, Cool, Archive, Deep Archive)', 'Network egress data transfer costs (Cross-AZ & Internet)', 'Managed cloud service pricing models'],
      },
      {
        id: 'mod-25-2',
        code: '25.2',
        title: 'Cost Optimization',
        topics: ['Right-sizing VM instance families', 'Autoscaling down during off-peak hours', 'Savings Plans and Reserved Capacity (1-3 year commitments)', 'Spot / Preemptible instances for batch & stateless workloads', 'Storage lifecycle rules (Automated transitions)', 'Orphaned disk and unattached Elastic IP cleanup'],
      },
      {
        id: 'mod-25-3',
        code: '25.3',
        title: 'Kubernetes Cost',
        topics: ['Overprovisioning of CPU and memory requests', 'Measuring idle cluster capacity', 'Cluster node right-sizing with Karpenter', 'Cluster auto-scaling efficiency', 'Pod-level cost allocation with Kubecost'],
      },
      {
        id: 'mod-25-4',
        code: '25.4',
        title: 'FinOps',
        topics: ['FinOps framework principles', 'Cost allocation tags (Owner, Project, Environment)', 'Cost visibility & executive dashboards', 'Budget thresholds and automated anomaly alerts', 'Unit economics (Cost per customer transaction)'],
      },
    ],
  },

  // CHAPTER 26
  {
    id: 'ch26-real-world-projects',
    number: 26,
    chapterCode: 'CHAPTER 26',
    title: 'REAL-WORLD DEVOPS PROJECTS',
    category: 'career',
    trackName: 'CAREER & CAPSTONE',
    summary:
      '8 production-grade engineering capstone projects: Containerize a multi-tier web app, automated CI/CD pipeline, production Kubernetes cluster, Terraform cloud platform, and GitOps delivery.',
    targetTech: ['Docker', 'GitHub Actions', 'Kubernetes', 'Helm', 'Terraform', 'Argo CD'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-26-1',
        code: '26.1',
        title: 'Project 1: Containerize a Web Application',
        topics: ['Multi-stage Dockerfile creation', 'Minimal production image optimization', 'Running containerized service', 'Custom bridge network setup', 'Persistent data volume mount', 'Multi-container Docker Compose definition'],
      },
      {
        id: 'mod-26-2',
        code: '26.2',
        title: 'Project 2: Production CI/CD Pipeline',
        topics: ['Git branching strategy', 'GitHub Actions automated workflow', 'Unit & integration test stage', 'Docker Buildx image compilation', 'Pushing to GitHub Container Registry', 'Automated staging environment deployment'],
      },
      {
        id: 'mod-26-3',
        code: '26.3',
        title: 'Project 3: Kubernetes Application Deployment',
        topics: ['Deployment with zero-downtime rolling update', 'ClusterIP & LoadBalancer Service', 'ConfigMap for application settings', 'Secret for encrypted credentials', 'Ingress controller host and path routing', 'PersistentVolumeClaim for storage'],
      },
      {
        id: 'mod-26-4',
        code: '26.4',
        title: 'Project 4: Production Kubernetes Platform',
        topics: ['Helm chart authoring and packaging', 'Ingress NGINX with cert-manager automated TLS', 'Prometheus monitoring and Grafana dashboards', 'Fluent Bit centralized logging', 'Horizontal Pod Autoscaler (HPA)'],
      },
      {
        id: 'mod-26-5',
        code: '26.5',
        title: 'Project 5: Terraform Cloud Infrastructure',
        topics: ['Multi-AZ VPC network with public and private subnets', 'Internet Gateway and NAT Gateway routing', 'Compute cluster instances with Auto Scaling', 'Managed RDS PostgreSQL database', 'Application Load Balancer (ALB)', 'IAM least-privilege roles'],
      },
      {
        id: 'mod-26-6',
        code: '26.6',
        title: 'Project 6: Full End-to-End DevOps Pipeline',
        topics: ['Git monorepo structure', 'CI automated lint, test, and container build', 'Container registry scanning', 'Terraform-provisioned infrastructure', 'Kubernetes cluster deployment', 'GitOps deployment with Argo CD', 'Prometheus monitoring alerts'],
      },
      {
        id: 'mod-26-7',
        code: '26.7',
        title: 'Project 7: Production Incident Simulation',
        topics: ['Application crash triage', 'Kubernetes Pod CrashLoopBackOff investigation', 'PostgreSQL database connection pool exhaustion', 'Network connection refused diagnosis', 'High CPU saturation profiling', 'High memory leak identification', 'DNS resolution failure triage', 'Rollback and postmortem write-up'],
      },
      {
        id: 'mod-26-8',
        code: '26.8',
        title: 'Project 8: Complete Cloud-Native Platform',
        topics: ['Full-stack microservices application', 'Docker containers', 'Kubernetes cluster orchestration', 'Terraform Infrastructure as Code', 'GitHub Actions CI/CD', 'Argo CD GitOps synchronization', 'Prometheus & Grafana observability', 'Trivy & Vault security', 'Automated disaster recovery backups'],
      },
    ],
  },

  // CHAPTER 27
  {
    id: 'ch27-troubleshooting',
    number: 27,
    chapterCode: 'CHAPTER 27',
    title: 'TROUBLESHOOTING ACADEMY',
    category: 'career',
    trackName: 'CAREER & CAPSTONE',
    summary:
      'Production problem solver: Interactive simulations of Linux kernel crashes, Docker container exit codes, Kubernetes CrashLoopBackOff/OOMKilled, CI/CD pipeline failures, and 3 AM outages.',
    targetTech: ['Universal Problem Solver', 'Debug Engine', 'Root-Cause Analysis', 'Incident Triage'],
    status: 'live',
    liveAction: {
      type: 'route',
      route: '/solver',
      label: 'Open Problem Solver',
      badge: 'Interactive Diagnostic Engine',
      description: 'Search, diagnose, and resolve production failures across Linux, Docker, K8s, and CI/CD.',
    },
    subModules: [
      {
        id: 'mod-27-1',
        code: '27.1',
        title: 'Linux Problems',
        topics: ['High CPU saturation (100% CPU lockups)', 'Memory exhaustion & OOM Killer triggers', 'Disk 100% full (Blocks vs Inodes)', 'Process crashing & segfaults', 'Permission denied (EACCES & execute bits)', 'Service unavailable & failed units'],
      },
      {
        id: 'mod-27-2',
        code: '27.2',
        title: 'Docker Problems',
        topics: ['Container exits immediately with code 0 or 1', 'Image not found in registry', 'Port conflict (Address already in use: 0.0.0.0:80)', 'Volume data persistence missing', 'Container network unreachable', 'Permission denied in mounted volumes'],
      },
      {
        id: 'mod-27-3',
        code: '27.3',
        title: 'Kubernetes Problems',
        topics: ['Pending Pod (Insufficient CPU/RAM, unschedulable)', 'CrashLoopBackOff (App exit, missing env, bad command)', 'ImagePullBackOff (Auth, typos, private registry)', 'OOMKilled (Exit code 137, memory limit too low)', 'Failed liveness and readiness probes', 'Service unavailable (Empty Endpoints, mismatched labels)', 'Ingress 502 / 504 gateway failures', 'CoreDNS lookup failures'],
      },
      {
        id: 'mod-27-4',
        code: '27.4',
        title: 'CI/CD Problems',
        topics: ['Pipeline build step failure', 'Authentication failure to cloud/registry', 'Build tool compilation error', 'Unit test failure breaking deployment', 'Deployment step timeout', 'Secret masking and expansion failures'],
      },
      {
        id: 'mod-27-5',
        code: '27.5',
        title: 'Cloud Problems',
        topics: ['EC2 instance unreachable via SSH', 'DNS propagation and lookup failure', 'IAM permission denied (403 Access Denied)', 'Security Group blocking inbound traffic', 'Load balancer health check failures', 'EBS storage volume detachment issues'],
      },
      {
        id: 'mod-27-6',
        code: '27.6',
        title: 'Production Incidents',
        topics: ['Total application customer-facing outage', 'Database connection pool starvation', 'Memory leak slow degradation', 'Sudden CPU spike caused by bad query', 'Viral traffic spike exceeding auto-scaler', 'Expired SSL/TLS certificate disaster', 'Accidental secret leak in public repo', 'Failed canary deployment rollback'],
      },
    ],
  },

  // CHAPTER 28
  {
    id: 'ch28-interviews',
    number: 28,
    chapterCode: 'CHAPTER 28',
    title: 'DEVOPS INTERVIEW & CAREER PREPARATION',
    category: 'career',
    trackName: 'CAREER & CAPSTONE',
    summary:
      'SRE & DevOps interview preparation: Deep architectural questions, system design interviews, Linux internals, Git edge cases, Kubernetes debugging, and live scenario defense.',
    targetTech: ['System Design', 'Interview Q&A', 'Behavioral Scenarios', 'Whiteboard Architecture'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-28-1',
        code: '28.1',
        title: 'Linux Interview',
        topics: ['Process management (fork/exec, PID 1, zombies)', 'Permissions model and special bits (SUID/SGID/Sticky)', 'Linux networking tools and routing tables', 'System troubleshooting methodology (USE and RED methods)'],
      },
      {
        id: 'mod-28-2',
        code: '28.2',
        title: 'Git Interview',
        topics: ['Branching strategies in enterprise', 'Merge vs Rebase internal mechanics', 'Interactive rebase squashing', 'Reset (--soft vs --mixed vs --hard)', 'Revert safe public rollback', 'Cherry-pick and reflog forensics'],
      },
      {
        id: 'mod-28-3',
        code: '28.3',
        title: 'Docker Interview',
        topics: ['Images vs Containers', 'Linux cgroups and namespaces under the hood', 'Bridge vs Host networking trade-offs', 'Volume vs Bind mount persistence', 'Optimizing Dockerfiles for layer caching and minimal size'],
      },
      {
        id: 'mod-28-4',
        code: '28.4',
        title: 'Kubernetes Interview',
        topics: ['Pod lifecycle & probe mechanics', 'Deployments vs StatefulSets vs DaemonSets', 'Services & CoreDNS resolution flow', 'Ingress controller architectures', 'ConfigMaps and Secrets mounting', 'RBAC least privilege design'],
      },
      {
        id: 'mod-28-5',
        code: '28.5',
        title: 'Cloud Interview',
        topics: ['AWS/Azure/GCP core architectural components', 'VPC subnetting and private routing', 'IAM roles vs users vs policies', 'Object storage vs Block storage vs File storage', 'Compute scaling mechanisms', 'Designing for High Availability (Multi-AZ)'],
      },
      {
        id: 'mod-28-6',
        code: '28.6',
        title: 'CI/CD Interview',
        topics: ['Designing zero-downtime deployment pipelines', 'Deployment strategies: Rolling, Blue-Green, Canary', 'Secure secret injection in automated runners', 'Automated rollback triggers'],
      },
      {
        id: 'mod-28-7',
        code: '28.7',
        title: 'SRE Interview',
        topics: ['Defining meaningful SLIs, SLOs, and SLAs', 'Error budget calculation and burn-rate policies', 'Incident response and incident commander protocol', 'Conducting blameless postmortems'],
      },
      {
        id: 'mod-28-8',
        code: '28.8',
        title: 'Scenario-Based Interviews',
        topics: ['Diagnosing a 3 AM customer outage live', 'Fixing a Kubernetes cluster with all nodes in NotReady state', 'Executing a clean deployment rollback under pressure', 'PostgreSQL database write failure recovery', 'Security breach containment and credential revocation', 'Scaling an infrastructure platform 10x for Black Friday'],
      },
    ],
  },

  // CHAPTER 29
  {
    id: 'ch29-capstone',
    number: 29,
    chapterCode: 'CHAPTER 29',
    title: 'CAPSTONE',
    category: 'career',
    trackName: 'CAREER & CAPSTONE',
    summary:
      'The ultimate synthesis: Build, provision, secure, deploy, monitor, stress-test, and recover a complete cloud-native microservices platform from bare code to multi-region production.',
    targetTech: ['Full Forge Suite Integration', 'Production Simulation', 'Live Incident Drill', 'Final Certification'],
    status: 'curriculum',
    subModules: [
      {
        id: 'mod-29-1',
        code: '29.1',
        title: 'Build a Production Application',
        topics: ['Application architecture design', 'Git repository setup with branch protections', 'Multi-stage Dockerfile containerization'],
      },
      {
        id: 'mod-29-2',
        code: '29.2',
        title: 'Infrastructure',
        topics: ['Terraform declarative infrastructure modules', 'Cloud networking (VPC, Subnets, Gateways)', 'Compute cluster provisioning', 'Managed database deployment', 'Storage buckets with retention policies'],
      },
      {
        id: 'mod-29-3',
        code: '29.3',
        title: 'Kubernetes',
        topics: ['Production Kubernetes cluster initialization', 'Namespace partitioning and ResourceQuotas', 'Workload Deployments and StatefulSets', 'ClusterIP and LoadBalancer Services', 'Ingress routing with TLS automation', 'Secrets and ConfigMaps management', 'Persistent storage volume claims'],
      },
      {
        id: 'mod-29-4',
        code: '29.4',
        title: 'CI/CD',
        topics: ['GitHub Actions automated CI pipeline', 'Automated linting and unit testing', 'Docker Buildx image compilation and caching', 'Publishing to container registry with Cosign signing', 'Automated deployment triggering'],
      },
      {
        id: 'mod-29-5',
        code: '29.5',
        title: 'GitOps',
        topics: ['Argo CD controller configuration', 'Git configuration repository setup', 'Declarative Kubernetes manifests', 'Automated synchronization and self-healing'],
      },
      {
        id: 'mod-29-6',
        code: '29.6',
        title: 'Observability',
        topics: ['Prometheus metrics collection', 'Grafana operational dashboards', 'Centralized log aggregation with Loki', 'Distributed tracing with OpenTelemetry', 'Alertmanager alert rules and notification channels'],
      },
      {
        id: 'mod-29-7',
        code: '29.7',
        title: 'Security',
        topics: ['Container image vulnerability scanning', 'HashiCorp Vault secret leasing', 'RBAC least-privilege enforcement', 'NetworkPolicies zero-trust isolation', 'End-to-end TLS encryption'],
      },
      {
        id: 'mod-29-8',
        code: '29.8',
        title: 'Reliability',
        topics: ['Horizontal Pod Autoscaler (HPA)', 'Liveness and readiness probes', 'Automated database backups', 'Disaster recovery failover plan'],
      },
      {
        id: 'mod-29-9',
        code: '29.9',
        title: 'Production Simulation Drill',
        topics: ['Deploy complete application stack', 'Generate realistic synthetic user traffic', 'Simulate unexpected node and pod failure', 'Investigate incident via Grafana and logs', 'Fix root cause and patch deployment', 'Execute rollback if needed', 'Restore service and verify SLO recovery', 'Author comprehensive blameless postmortem'],
      },
    ],
  },
];

export const TOTAL_DEVOPS_CHAPTERS = DEVOPS_29_CHAPTERS.length;
export const TOTAL_DEVOPS_SUBMODULES = DEVOPS_29_CHAPTERS.reduce(
  (acc, ch) => acc + ch.subModules.length,
  0
);
export const TOTAL_DEVOPS_TOPICS = DEVOPS_29_CHAPTERS.reduce(
  (acc, ch) => acc + ch.subModules.reduce((subAcc, sm) => subAcc + sm.topics.length, 0),
  0
);

export const DEVOPS_LEARNING_TRACKS = DEVOPS_10_TRACKS;

export function GET_DEVOPS_STATS() {
  return {
    totalChapters: TOTAL_DEVOPS_CHAPTERS,
    totalSubmodules: TOTAL_DEVOPS_SUBMODULES,
    totalTopics: TOTAL_DEVOPS_TOPICS,
    totalTracks: DEVOPS_10_TRACKS.length,
  };
}
