export interface LinuxExecutionResult {
  stdout: string[];
  stderr: string[];
  exitCode: number;
}

export interface MockFileSystemNode {
  type: 'file' | 'dir';
  permissions: string;
  owner: string;
  group: string;
  size: number;
  modified: string;
  content?: string;
  children?: Record<string, MockFileSystemNode>;
}

export class LinuxSimulator {
  private currentPath: string = '/home/forge';
  private currentUser: string = 'forge';
  private hostname: string = 'linuxforge-sre-01';

  private fileSystem: Record<string, MockFileSystemNode> = {
    '/': {
      type: 'dir',
      permissions: 'drwxr-xr-x',
      owner: 'root',
      group: 'root',
      size: 4096,
      modified: 'Sep 29 00:00',
      children: {
        'bin': { type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', group: 'root', size: 4096, modified: 'Sep 29 00:00' },
        'etc': {
          type: 'dir',
          permissions: 'drwxr-xr-x',
          owner: 'root',
          group: 'root',
          size: 4096,
          modified: 'Sep 29 00:00',
          children: {
            'passwd': { type: 'file', permissions: '-rw-r--r--', owner: 'root', group: 'root', size: 1420, modified: 'Sep 29 00:00', content: 'root:x:0:0:root:/root:/bin/bash\nforge:x:1000:1000:LinuxForge User:/home/forge:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nnginx:x:101:101:nginx:/var/cache/nginx:/usr/sbin/nologin' },
            'hostname': { type: 'file', permissions: '-rw-r--r--', owner: 'root', group: 'root', size: 18, modified: 'Sep 29 00:00', content: 'linuxforge-sre-01\n' },
            'resolv.conf': { type: 'file', permissions: '-rw-r--r--', owner: 'root', group: 'root', size: 75, modified: 'Sep 29 00:00', content: 'nameserver 1.1.1.1\nnameserver 8.8.8.8\nsearch production.internal\n' },
            'fstab': { type: 'file', permissions: '-rw-r--r--', owner: 'root', group: 'root', size: 312, modified: 'Sep 29 00:00', content: 'UUID=a8f9-4b12 / ext4 defaults,noatime 0 1\nUUID=c123-99ab /data ext4 defaults 0 2\n' },
          },
        },
        'home': {
          type: 'dir',
          permissions: 'drwxr-xr-x',
          owner: 'root',
          group: 'root',
          size: 4096,
          modified: 'Sep 29 00:00',
          children: {
            'forge': {
              type: 'dir',
              permissions: 'drwxr-xr-x',
              owner: 'forge',
              group: 'forge',
              size: 4096,
              modified: 'Sep 29 00:00',
              children: {
                '.bashrc': { type: 'file', permissions: '-rw-r--r--', owner: 'forge', group: 'forge', size: 3771, modified: 'Sep 29 00:00', content: 'export PATH=$PATH:/usr/local/bin\nalias ll="ls -la"\n' },
                'deploy.sh': { type: 'file', permissions: '-rwxr-xr-x', owner: 'forge', group: 'forge', size: 184, modified: 'Sep 29 00:00', content: '#!/usr/bin/env bash\necho "Deploying v2.4 to production..."\nsystemctl restart nginx\necho "Deployment complete."\n' },
                'app.log': { type: 'file', permissions: '-rw-r--r--', owner: 'forge', group: 'forge', size: 8520, modified: 'Sep 29 00:00', content: '2026-09-29T00:01:10Z [INFO] Server started on :8080\n2026-09-29T00:02:15Z [INFO] Handled GET /api/v1/health status=200\n2026-09-29T00:05:22Z [WARN] Database pool connection latency: 42ms\n2026-09-29T00:09:40Z [ERROR] Failed to query cache: connection reset by peer\n2026-09-29T00:10:01Z [INFO] Cache reconnected successfully\n' },
                'notes.txt': { type: 'file', permissions: '-rw-r--r--', owner: 'forge', group: 'forge', size: 94, modified: 'Sep 29 00:00', content: 'LinuxForge SRE Curriculum:\n- Systemd service units\n- Kernel sysctl parameters\n- eBPF observability\n' },
              },
            },
          },
        },
        'var': {
          type: 'dir',
          permissions: 'drwxr-xr-x',
          owner: 'root',
          group: 'root',
          size: 4096,
          modified: 'Sep 29 00:00',
          children: {
            'log': {
              type: 'dir',
              permissions: 'drwxr-xr-x',
              owner: 'root',
              group: 'root',
              size: 4096,
              modified: 'Sep 29 00:00',
              children: {
                'syslog': { type: 'file', permissions: '-rw-r-----', owner: 'syslog', group: 'adm', size: 65430, modified: 'Sep 29 00:00', content: 'Sep 29 00:00:01 linuxforge CRON[4821]: (root) CMD (test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily ))\nSep 29 00:01:15 linuxforge systemd[1]: Started Nginx HTTP and reverse proxy server.\n' },
                'auth.log': { type: 'file', permissions: '-rw-r-----', owner: 'syslog', group: 'adm', size: 12400, modified: 'Sep 29 00:00', content: 'Sep 29 00:00:12 linuxforge sshd[1204]: Accepted publickey for forge from 192.168.1.44 port 54820 ssh2: ED25519\n' },
              },
            },
          },
        },
      },
    },
  };

  public execute(commandLine: string): LinuxExecutionResult {
    const trimmed = commandLine.trim();
    if (!trimmed) {
      return { stdout: [], stderr: [], exitCode: 0 };
    }

    // Handle sudo prefix transparently
    const cmdWithoutSudo = trimmed.startsWith('sudo ') ? trimmed.slice(5).trim() : trimmed;
    const parts = cmdWithoutSudo.split(/\s+/);
    const cmd = parts[0];
    const args = parts.slice(1);

    // Common Linux Command Handlers
    switch (cmd) {
      case 'pwd':
        return { stdout: [this.currentPath], stderr: [], exitCode: 0 };

      case 'whoami':
        return { stdout: [trimmed.startsWith('sudo') ? 'root' : this.currentUser], stderr: [], exitCode: 0 };

      case 'id':
        if (trimmed.startsWith('sudo')) {
          return { stdout: ['uid=0(root) gid=0(root) groups=0(root)'], stderr: [], exitCode: 0 };
        }
        return { stdout: ['uid=1000(forge) gid=1000(forge) groups=1000(forge),4(adm),27(sudo),100(users)'], stderr: [], exitCode: 0 };

      case 'hostname':
        return { stdout: [this.hostname], stderr: [], exitCode: 0 };

      case 'uname':
        if (args.includes('-a')) {
          return { stdout: ['Linux linuxforge-sre-01 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux'], stderr: [], exitCode: 0 };
        }
        if (args.includes('-r')) {
          return { stdout: ['6.8.0-45-generic'], stderr: [], exitCode: 0 };
        }
        return { stdout: ['Linux'], stderr: [], exitCode: 0 };

      case 'nproc':
        return { stdout: ['8'], stderr: [], exitCode: 0 };

      case 'uptime':
        return { stdout: [' 01:15:22 up 14 days,  6:42,  2 users,  load average: 0.34, 0.42, 0.38'], stderr: [], exitCode: 0 };

      case 'ls': {
        const showAll = args.some(a => a.includes('a'));
        const showLong = args.some(a => a.includes('l'));

        if (showLong) {
          const lines = [
            'total 24',
            showAll ? 'drwxr-xr-x 4 forge forge 4096 Sep 29 00:00 .' : null,
            showAll ? 'drwxr-xr-x 3 root  root  4096 Sep 29 00:00 ..' : null,
            showAll ? '-rw-r--r-- 1 forge forge 3771 Sep 29 00:00 .bashrc' : null,
            '-rw-r--r-- 1 forge forge 8520 Sep 29 00:00 app.log',
            '-rwxr-xr-x 1 forge forge  184 Sep 29 00:00 deploy.sh',
            '-rw-r--r-- 1 forge forge   94 Sep 29 00:00 notes.txt',
          ].filter(Boolean) as string[];
          return { stdout: lines, stderr: [], exitCode: 0 };
        }
        return {
          stdout: ['app.log  deploy.sh  notes.txt' + (showAll ? '  .bashrc' : '')],
          stderr: [],
          exitCode: 0,
        };
      }

      case 'cat': {
        const file = args[0];
        if (!file) {
          return { stdout: [], stderr: ['cat: missing operand'], exitCode: 1 };
        }
        if (file === '/etc/hostname' || file === 'hostname') {
          return { stdout: ['linuxforge-sre-01'], stderr: [], exitCode: 0 };
        }
        if (file === '/etc/resolv.conf') {
          return { stdout: ['nameserver 1.1.1.1', 'nameserver 8.8.8.8', 'search production.internal'], stderr: [], exitCode: 0 };
        }
        if (file === '/proc/version') {
          return { stdout: ['Linux version 6.8.0-45-generic (buildd@lcy02-amd64-074) (gcc-13) #45-Ubuntu SMP PREEMPT_DYNAMIC'], stderr: [], exitCode: 0 };
        }
        if (file.includes('meminfo') || file === '/proc/meminfo') {
          return {
            stdout: [
              'MemTotal:       16384000 kB',
              'MemFree:         4125820 kB',
              'MemAvailable:   12845600 kB',
              'Buffers:          451200 kB',
              'Cached:          8268580 kB',
              'SwapTotal:       4194300 kB',
              'SwapFree:        4194300 kB',
            ],
            stderr: [],
            exitCode: 0,
          };
        }
        if (file === 'notes.txt') {
          return { stdout: ['LinuxForge SRE Curriculum:', '- Systemd service units', '- Kernel sysctl parameters', '- eBPF observability'], stderr: [], exitCode: 0 };
        }
        if (file === 'deploy.sh') {
          return { stdout: ['#!/usr/bin/env bash', 'echo "Deploying v2.4 to production..."', 'systemctl restart nginx', 'echo "Deployment complete."'], stderr: [], exitCode: 0 };
        }
        if (file === 'app.log') {
          return {
            stdout: [
              '2026-09-29T00:01:10Z [INFO] Server started on :8080',
              '2026-09-29T00:02:15Z [INFO] Handled GET /api/v1/health status=200',
              '2026-09-29T00:05:22Z [WARN] Database pool connection latency: 42ms',
              '2026-09-29T00:09:40Z [ERROR] Failed to query cache: connection reset by peer',
              '2026-09-29T00:10:01Z [INFO] Cache reconnected successfully',
            ],
            stderr: [],
            exitCode: 0,
          };
        }
        return { stdout: [`Contents of ${file}`], stderr: [], exitCode: 0 };
      }

      case 'free':
        return {
          stdout: [
            '               total        used        free      shared  buff/cache   available',
            'Mem:           15.6G        2.8G        4.1G        184M        8.7G       12.2G',
            'Swap:           4.0G          0B        4.0G',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'vmstat':
        return {
          stdout: [
            'procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----',
            ' r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st',
            ' 1  0      0 4125820 451200 8268580    0    0    12    45  140  310  4  2 94  0  0',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'df':
        return {
          stdout: [
            'Filesystem      Size  Used Avail Use% Mounted on',
            '/dev/nvme0n1p2  100G   24G   72G  25% /',
            'udev            7.8G     0  7.8G   0% /dev',
            'tmpfs           1.6G  1.4M  1.6G   1% /run',
            '/dev/nvme0n1p1  512M  6.1M  506M   2% /boot/efi',
            '/dev/sda1       500G  120G  355G  26% /data',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'systemctl': {
        const sub = args[0] || 'status';
        const target = args[1] || 'nginx';
        if (sub === 'status') {
          return {
            stdout: [
              `● ${target}.service - The NGINX HTTP and reverse proxy server`,
              `     Loaded: loaded (/lib/systemd/system/${target}.service; enabled; vendor preset: enabled)`,
              `     Active: active (running) since Tue 2026-09-29 00:01:15 UTC; 1h 14min ago`,
              `    Process: 1042 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCCESS)`,
              `   Main PID: 1044 (nginx)`,
              `      Tasks: 9 (limit: 18985)`,
              `     Memory: 24.8M`,
              `        CPU: 1.204s`,
              `     CGroup: /system.slice/${target}.service`,
              `             ├─1044 "nginx: master process /usr/sbin/nginx"`,
              `             └─1045 "nginx: worker process"`,
            ],
            stderr: [],
            exitCode: 0,
          };
        }
        return { stdout: [`[OK] systemctl ${sub} ${target} executed successfully.`], stderr: [], exitCode: 0 };
      }

      case 'dmesg':
        return {
          stdout: [
            '[    0.000000] Linux version 6.8.0-45-generic',
            '[    0.142011] Command line: BOOT_IMAGE=/vmlinuz-6.8.0-45-generic root=/dev/nvme0n1p2 ro quiet splash',
            '[    1.204123] Memory: 16182100K/16777216K available',
            '[    2.100412] nvme nvme0: 8/0/0 default/read/poll queues',
            '[    3.412890] systemd[1]: Starting systemd-udevd version 255.4',
            '[   12.189020] eth0: Link is Up - 10000Mbps/Full - flow control rx/tx',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'ps':
        if (args.some(a => a.includes('aux') || a.includes('-ef'))) {
          return {
            stdout: [
              'USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND',
              'root           1  0.0  0.1 168240 12840 ?        Ss   00:00   0:02 /sbin/init',
              'root         340  0.0  0.1  45120  8400 ?        Ss   00:00   0:00 /lib/systemd/systemd-journald',
              'root         820  0.0  0.0  14500  4200 ?        Ss   00:00   0:00 /usr/sbin/sshd -D',
              'forge       1204  0.0  0.0  16840  6100 ?        S    00:00   0:00 sshd: forge@pts/0',
              'forge       1205  0.0  0.0  11200  4900 pts/0    Ss   00:00   0:00 bash',
              'www-data    1044  0.1  0.2 120400 32400 ?        S    00:01   0:01 nginx: master process',
              'forge       2410  0.0  0.0  10400  2800 pts/0    R+   01:15   0:00 ps aux',
            ],
            stderr: [],
            exitCode: 0,
          };
        }
        return {
          stdout: [
            '  PID TTY          TIME CMD',
            ' 1205 pts/0    00:00:00 bash',
            ' 2411 pts/0    00:00:00 ps',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'ip': {
        const sub = args[0] || 'a';
        if (sub === 'a' || sub === 'addr') {
          return {
            stdout: [
              '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000',
              '    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00',
              '    inet 127.0.0.1/8 scope host lo',
              '       valid_lft forever preferred_lft forever',
              '2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000',
              '    link/ether 02:42:0a:00:00:02 brd ff:ff:ff:ff:ff:ff',
              '    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0',
              '       valid_lft forever preferred_lft forever',
            ],
            stderr: [],
            exitCode: 0,
          };
        }
        if (sub === 'r' || sub === 'route') {
          return {
            stdout: [
              'default via 192.168.1.1 dev eth0 proto static onlink',
              '192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100',
            ],
            stderr: [],
            exitCode: 0,
          };
        }
        return { stdout: [`[ip ${args.join(' ')}]`], stderr: [], exitCode: 0 };
      }

      case 'ss':
        return {
          stdout: [
            'Netid  State   Recv-Q  Send-Q   Local Address:Port    Peer Address:Port  Process',
            'tcp    LISTEN  0       128            0.0.0.0:22           0.0.0.0:*      users:(("sshd",pid=820,fd=3))',
            'tcp    LISTEN  0       511            0.0.0.0:80           0.0.0.0:*      users:(("nginx",pid=1044,fd=6))',
            'tcp    LISTEN  0       511            0.0.0.0:443          0.0.0.0:*      users:(("nginx",pid=1044,fd=7))',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'ufw':
        return {
          stdout: [
            'Status: active',
            'Logging: on (low)',
            'Default: deny (incoming), allow (outgoing), disabled (routed)',
            'New profiles: skip',
            '',
            'To                         Action      From',
            '--                         ------      ----',
            '22/tcp (OpenSSH)           ALLOW IN    Anywhere',
            '80,443/tcp (Nginx Full)    ALLOW IN    Anywhere',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'iptables':
        return {
          stdout: [
            'Chain INPUT (policy DROP 0 packets, 0 bytes)',
            ' pkts bytes target     prot opt in     out     source               destination',
            ' 4520  380K ACCEPT     all  --  lo     *       0.0.0.0/0            0.0.0.0/0',
            ' 8910  920K ACCEPT     all  --  *      *       0.0.0.0/0            0.0.0.0/0            ctstate RELATED,ESTABLISHED',
            '  142 8520 ACCEPT     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:22',
            ' 2100  145K ACCEPT     tcp  --  *      *       0.0.0.0/0            0.0.0.0/0            tcp dpt:443',
            'Chain FORWARD (policy DROP 0 packets, 0 bytes)',
            'Chain OUTPUT (policy ACCEPT 12000 packets, 1400K bytes)',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'sysctl':
        if (args.includes('vm.swappiness')) {
          return { stdout: ['vm.swappiness = 10'], stderr: [], exitCode: 0 };
        }
        if (args.includes('net.ipv4.ip_forward')) {
          return { stdout: ['net.ipv4.ip_forward = 1'], stderr: [], exitCode: 0 };
        }
        return { stdout: ['fs.file-max = 2097152', 'vm.swappiness = 10', 'net.ipv4.ip_forward = 1', 'net.core.somaxconn = 65535'], stderr: [], exitCode: 0 };

      case 'strace':
        return {
          stdout: [
            '% time     seconds  usecs/call     calls    errors syscall',
            '------ ----------- ----------- --------- --------- ----------------',
            ' 45.12    0.000412          24        17           openat',
            ' 28.15    0.000257          18        14           newfstatat',
            ' 12.40    0.000113          12         9           getdents64',
            '  8.12    0.000074           9         8           mmap',
            '  6.21    0.000056          14         4           close',
            '------ ----------- ----------- --------- --------- ----------------',
            '100.00    0.000912                    52           total',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'bpftrace':
        return {
          stdout: [
            'Attaching 1 probe...',
            'Tracing execve system calls. Hit Ctrl-C to end.',
            'TIME     PID    COMM             FILENAME',
            '00:01:14 4812   nginx            /usr/sbin/nginx',
            '00:01:15 4814   sh               /bin/sh',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'grep':
        return {
          stdout: [
            '2026-09-29T00:09:40Z [ERROR] Failed to query cache: connection reset by peer',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'head':
        return {
          stdout: [
            'root:x:0:0:root:/root:/bin/bash',
            'daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin',
            'bin:x:2:2:bin:/bin:/usr/sbin/nologin',
            'sys:x:3:3:sys:/dev:/usr/sbin/nologin',
            'forge:x:1000:1000:LinuxForge User:/home/forge:/bin/bash',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'tail':
        if (args.includes('-f') || args.includes('-F')) {
          return {
            stdout: [
              '2026-09-29T00:10:01Z [INFO] Cache reconnected successfully',
              '2026-09-29T00:11:05Z [INFO] HTTP GET /api/v1/status 200 4ms',
              '2026-09-29T00:12:18Z [INFO] Worker healthcheck OK',
              '[Following stream... (press Ctrl+C to interrupt)]',
            ],
            stderr: [],
            exitCode: 0,
          };
        }
        return {
          stdout: [
            'systemd-resolve:x:102:103:systemd-resolve:/run/systemd:/usr/sbin/nologin',
            'messagebus:x:103:104::/nonexistent:/usr/sbin/nologin',
            'sshd:x:104:65534::/run/sshd:/usr/sbin/nologin',
            'forge:x:1000:1000:LinuxForge User:/home/forge:/bin/bash',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'less':
      case 'more':
        return {
          stdout: [
            ':/etc/passwd (press q to quit)',
            'root:x:0:0:root:/root:/bin/bash',
            'daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin',
            'forge:x:1000:1000:LinuxForge User:/home/forge:/bin/bash',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'file':
        if (args.some(a => a.includes('bash'))) {
          return { stdout: ['/bin/bash: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, stripped'], stderr: [], exitCode: 0 };
        }
        return { stdout: [`${args[0] || 'file'}: ASCII text, with very long lines`], stderr: [], exitCode: 0 };

      case 'stat':
        return {
          stdout: [
            `  File: ${args[0] || '/etc/passwd'}`,
            '  Size: 1420       Blocks: 8          IO Block: 4096   regular file',
            'Device: 10302h/66306d Inode: 262145      Links: 1',
            'Access: (0644/-rw-r--r--)  Uid: (    0/    root)   Gid: (    0/    root)',
            'Access: 2026-09-29 00:00:00.000000000 +0000',
            'Modify: 2026-09-29 00:00:00.000000000 +0000',
            'Change: 2026-09-29 00:00:00.000000000 +0000',
            ' Birth: 2026-09-29 00:00:00.000000000 +0000',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'find':
        return {
          stdout: [
            '/var/log/syslog',
            '/var/log/auth.log',
            '/var/log/nginx/access.log',
            '/var/log/nginx/error.log',
            '/var/log/dpkg.log',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'locate':
        return {
          stdout: [
            '/etc/nginx/nginx.conf',
            '/etc/nginx/conf.d/default.conf',
            '/usr/share/nginx/html/index.html',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'tree':
        return {
          stdout: [
            '/etc',
            '├── nginx',
            '│   ├── conf.d',
            '│   └── nginx.conf',
            '├── ssh',
            '│   ├── sshd_config',
            '│   └── ssh_host_ed25519_key.pub',
            '├── systemd',
            '│   └── system',
            '├── hosts',
            '├── os-release',
            '└── passwd',
            '',
            '4 directories, 6 files',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'wc':
        if (args.includes('-l')) {
          return { stdout: ['46 /etc/passwd'], stderr: [], exitCode: 0 };
        }
        return { stdout: ['  46  102 1420 /etc/passwd'], stderr: [], exitCode: 0 };

      case 'cut':
        return {
          stdout: [
            'root',
            'daemon',
            'bin',
            'sys',
            'forge',
            'www-data',
            'nginx',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'sort':
        return {
          stdout: [
            'bin',
            'daemon',
            'forge',
            'nginx',
            'root',
            'sys',
            'www-data',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'uniq':
        return {
          stdout: [
            '   1 bin',
            '   1 daemon',
            '   1 forge',
            '   1 root',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'tr':
        return {
          stdout: ['HELLO LINUXFORGE USER'],
          stderr: [],
          exitCode: 0,
        };

      case 'awk':
        return {
          stdout: [
            'root /bin/bash',
            'daemon /usr/sbin/nologin',
            'forge /bin/bash',
            'nginx /usr/sbin/nologin',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'sed':
        return {
          stdout: ['[OK] stream transformation applied.'],
          stderr: [],
          exitCode: 0,
        };

      case 'xargs':
        return {
          stdout: ['[xargs: processed incoming arguments successfully]'],
          stderr: [],
          exitCode: 0,
        };

      case 'umask':
        if (args.length === 0) {
          return { stdout: ['0022'], stderr: [], exitCode: 0 };
        }
        if (args.includes('-S')) {
          return { stdout: ['u=rwx,g=rx,o=rx'], stderr: [], exitCode: 0 };
        }
        return { stdout: [`[OK] umask set to ${args[0]}`], stderr: [], exitCode: 0 };

      case 'kill':
      case 'killall':
      case 'pkill':
        return {
          stdout: [`[OK] Sent signal to ${args.join(' ')}`],
          stderr: [],
          exitCode: 0,
        };

      case 'jobs':
        return {
          stdout: [
            '[1]+  Running                 nohup ./deploy.sh > deploy.log 2>&1 &',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'fg':
      case 'bg':
        return {
          stdout: ['[1]+ ./deploy.sh'],
          stderr: [],
          exitCode: 0,
        };

      case 'nohup':
        return {
          stdout: ['nohup: ignoring input and redirecting stderr to stdout to "nohup.out"'],
          stderr: [],
          exitCode: 0,
        };

      case 'journalctl':
        return {
          stdout: [
            'Sep 29 00:01:15 linuxforge systemd[1]: Starting Nginx HTTP and reverse proxy server...',
            'Sep 29 00:01:15 linuxforge nginx[1042]: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok',
            'Sep 29 00:01:15 linuxforge nginx[1042]: nginx: configuration file /etc/nginx/nginx.conf test is successful',
            'Sep 29 00:01:15 linuxforge systemd[1]: Started Nginx HTTP and reverse proxy server.',
            'Sep 29 00:09:40 linuxforge myapp[1120]: [ERROR] Failed to query cache: connection reset by peer',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'ulimit':
        if (args.includes('-n')) {
          return { stdout: ['1024'], stderr: [], exitCode: 0 };
        }
        return { stdout: ['unlimited'], stderr: [], exitCode: 0 };

      case 'lsof':
        return {
          stdout: [
            'COMMAND   PID     USER   FD   TYPE DEVICE SIZE/OFF   NODE NAME',
            'systemd     1     root  cwd    DIR  103,2     4096      2 /',
            'nginx    1044     root    6u  IPv4  24820      0t0    TCP *:80 (LISTEN)',
            'nginx    1044     root    7u  IPv4  24821      0t0    TCP *:443 (LISTEN)',
            'sshd      820     root    3u  IPv4  19240      0t0    TCP *:22 (LISTEN)',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'echo':
        return {
          stdout: [args.join(' ').replace(/["']/g, '')],
          stderr: [],
          exitCode: 0,
        };

      case 'bash':
      case 'sh':
        return {
          stdout: ['[script execution output]'],
          stderr: [],
          exitCode: 0,
        };

      case 'chmod':
      case 'chown':
      case 'chgrp':
      case 'mkdir':
      case 'touch':
      case 'rm':
      case 'cp':
      case 'mv':
        return {
          stdout: [`[OK] ${cmd} ${args.join(' ')} completed successfully.`],
          stderr: [],
          exitCode: 0,
        };

      case 'curl':
        return {
          stdout: [
            'HTTP/1.1 200 OK',
            'Server: nginx/1.24.0',
            'Date: Tue, 29 Sep 2026 00:01:15 GMT',
            'Content-Type: application/json',
            'Content-Length: 48',
            'Connection: keep-alive',
            '',
            '{"status":"healthy","uptime":"99.98%","env":"prod"}',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'ping':
        return {
          stdout: [
            `PING ${args[0] || '8.8.8.8'} (${args[0] || '8.8.8.8'}) 56(84) bytes of data.`,
            `64 bytes from ${args[0] || '8.8.8.8'}: icmp_seq=1 ttl=118 time=12.4 ms`,
            `64 bytes from ${args[0] || '8.8.8.8'}: icmp_seq=2 ttl=118 time=11.8 ms`,
            `--- ${args[0] || '8.8.8.8'} ping statistics ---`,
            '2 packets transmitted, 2 received, 0% packet loss, time 1001ms',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'dig':
        return {
          stdout: [
            `; <<>> DiG 9.18.28 <<>> ${args.join(' ')}`,
            ';; Got answer:',
            ';; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 4821',
            ';; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1',
            '',
            ';; QUESTION SECTION:',
            `;${args[0] || 'example.com'}.            IN      A`,
            '',
            ';; ANSWER SECTION:',
            `${args[0] || 'example.com'}.     300     IN      A       93.184.216.34`,
            '',
            ';; Query time: 14 msec',
            ';; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'nslookup':
        return {
          stdout: [
            'Server:         127.0.0.53',
            'Address:        127.0.0.53#53',
            '',
            'Non-authoritative answer:',
            `Name:   ${args[0] || 'example.com'}`,
            'Address: 93.184.216.34',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'traceroute':
        return {
          stdout: [
            `traceroute to ${args[0] || '1.1.1.1'}, 30 hops max, 60 byte packets`,
            ' 1  _gateway (192.168.1.1)  0.342 ms  0.288 ms  0.274 ms',
            ' 2  10.0.0.1 (10.0.0.1)  2.140 ms  2.080 ms  2.040 ms',
            ' 3  one.one.one.one (1.1.1.1)  11.240 ms  11.180 ms  11.090 ms',
          ],
          stderr: [],
          exitCode: 0,
        };

      case 'nmap':
        return {
          stdout: [
            `Starting Nmap 7.94 at 2026-09-29 00:00 UTC`,
            `Nmap scan report for ${args[0] || 'localhost'} (127.0.0.1)`,
            'Host is up (0.00014s latency).',
            'PORT     STATE SERVICE',
            '22/tcp   open  ssh',
            '80/tcp   open  http',
            '443/tcp  open  https',
            'Nmap done: 1 IP address scanned in 0.12 seconds',
          ],
          stderr: [],
          exitCode: 0,
        };

      default:
        return {
          stdout: [`[linuxforge ~]$ ${trimmed}`],
          stderr: [],
          exitCode: 0,
        };
    }
  }
}

export const defaultLinuxSimulator = new LinuxSimulator();
