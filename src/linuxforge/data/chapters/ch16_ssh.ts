import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 16: SSH AND REMOTE ACCESS (16.1 to 16.16)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_16: LinuxTopic = {
  id: 'ch-16',
  number: '16',
  title: 'SSH and Remote Access',
  iconName: 'Lock',
  description: 'Master secure remote system administration: cryptographic keypairs (Ed25519), SSH agent, config files, daemon hardening (sshd_config), rsync over SSH, and TCP port forwarding/tunneling.',
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
      difficulty: 'Beginner',
      quote: 'SSH turned remote administration into an impenetrable encrypted channel: passwords and commands can never be sniffed off the wire.',
      whatIsIt: 'SSH (Secure Shell) is a cryptographic network protocol for operating network services securely over an unsecure network. Designed in 1995 to replace plaintext protocols like Telnet, rsh, and rlogin (which broadcast passwords over the wire in plain ASCII), SSH provides strong client-server authentication, confidentiality via symmetric encryption (AES-GCM, ChaCha20-Poly1305), and message integrity verification via cryptographic MACs or AEAD ciphers.',
      inSimpleWords: 'An armored digital tunnel connecting your computer to a remote server. Everything you type—including your passwords and private data—is scrambled into unbreakable code so hackers on the Wi-Fi cannot spy on you.',
      whyDoYouNeedIt: 'Cloud computing and remote servers exist across the public internet. SSH is the universal gateway used by DevOps engineers and SREs to log into servers, execute scripts, and automate deployments worldwide.',
      realWorldScenario: 'You are working from a coffee shop on public Wi-Fi. An attacker running a packet sniffer tries to intercept your terminal session to a production AWS server. Because you are using SSH with ChaCha20 encryption, the attacker sees only meaningless random noise.',
      realWorldAnalogy: 'Writing a letter in an unbreakable secret code inside a tamper-proof armored briefcase instead of sending a plaintext postcard through the public mail.',
      withoutVsWith: {
        without: {
          title: 'Using Plaintext Remote Protocols (Telnet)',
          items: ['Passwords and usernames transmitted in cleartext visible to any network sniffer', 'Vulnerable to session hijacking and man-in-the-middle packet injection', 'No cryptographic proof of remote server authenticity'],
          outcome: 'Immediate credential theft and complete server compromise.'
        },
        with: {
          title: 'Operating Over Modern SSH',
          items: ['End-to-end symmetric encryption (AES-256-GCM / ChaCha20-Poly1305)', 'Cryptographic host key verification preventing man-in-the-middle attacks', 'Secure tunneling of arbitrary TCP ports and X11 forwarding'],
          outcome: 'Ironclad security, confidential communication, and protected cloud infrastructure.'
        }
      },
      blockDiagram: {
        title: 'SSH Protocol Layer Architecture',
        subtitle: 'The 3 core protocol layers of RFC 4251:',
        nodes: [
          { id: 'trans', label: '1. Transport Layer (RFC 4253)', simpleDef: 'Encryption & Host Verification', techDef: 'Key exchange (Diffie-Hellman / Curve25519), server auth, encryption & MAC', badge: 'Encryption', color: '#38bdf8' },
          { id: 'auth', label: '2. User Auth Layer (RFC 4252)', simpleDef: 'Logging in the user', techDef: 'Authenticates client via publickey (Ed25519/RSA), password, or GSSAPI', badge: 'Auth', color: '#10b981' },
          { id: 'conn', label: '3. Connection Layer (RFC 4254)', simpleDef: 'Multiplexed channels', techDef: 'Multiplexes interactive shell sessions, sftp, and TCP tunnels over 1 connection', badge: 'Channels', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'OpenSSH', simple: 'The open-source suite of SSH tools used by 99% of Linux systems worldwide.', technical: 'OpenBSD project providing ssh, sshd, scp, sftp, ssh-keygen, and ssh-agent.' },
        { term: 'Host Key', simple: 'A cryptographic identity card that proves the remote server is who it claims to be.', technical: 'Asymmetric keypair stored in /etc/ssh/ssh_host_* used to prevent MITM spoofing.' }
      ],
      syntaxCode: 'ssh -V',
      syntaxTokens: [
        { token: 'ssh', role: 'command', explanation: 'OpenSSH SSH client utility' },
        { token: '-V', role: 'option', explanation: 'Display OpenSSH version and OpenSSL library information to stderr' }
      ],
      variations: [
        { command: 'ssh -V', description: 'Display OpenSSH client version and linked SSL/crypto libraries' },
        { command: 'which ssh sshd ssh-keygen scp sftp', description: 'Verify presence of all OpenSSH suite binaries on system' }
      ],
      expectedOutput: 'OpenSSH_8.9p1 Ubuntu-3ubuntu0.6, OpenSSL 3.0.2 15 Mar 2022',
      commonMistakes: [
        { mistake: 'Thinking "ssh -v" (lowercase) prints the version', whyWrong: 'Lowercase "-v" enables verbose debug mode for connections; uppercase "-V" prints the version string.', correctWay: 'Use "ssh -V" to check the OpenSSH version.' },
        { mistake: 'Using obsolete Telnet or rsh on internal networks believing "the intranet is safe"', whyWrong: 'Internal networks are frequently traversed by lateral malware movements and insider threats.', correctWay: 'Always enforce SSH everywhere, even inside private VPCs and home labs.' }
      ],
      safeRecovery: 'If ssh is not installed, install the client package with "sudo apt install openssh-client" or "sudo dnf install openssh-clients".'
    }),

    buildLinuxConcept({
      id: 'c-16-02',
      subChapterNumber: '16.2',
      command: 'systemctl status sshd',
      title: 'SSH Architecture',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'The client/daemon relationship: OpenSSH client connecting to daemon listener (sshd) on port 22',
      badges: ['Architecture', 'sshd', 'Daemon'],
      difficulty: 'Beginner',
      quote: 'SSH is a client-server architecture: ssh is your browser, sshd is the web server listening on port 22.',
      whatIsIt: 'The SSH architecture operates as a client-daemon model. On the target machine, the OpenSSH Daemon ("sshd") runs as a background systemd service listening on TCP port 22 (or a hardened alternative port). On the operator\'s machine, the "ssh" client initiates a TCP handshake, performs a cryptographic Diffie-Hellman or Elliptic Curve (Curve25519) key exchange to establish an ephemeral session key, verifies the server\'s host key, authenticates the user, and allocates a pseudo-terminal (pty).',
      inSimpleWords: 'Your laptop runs the "ssh" client. The remote cloud server runs the "sshd" daemon. When you knock on port 22, sshd answers, checks your ID, and opens the door to a terminal screen.',
      whyDoYouNeedIt: 'Understanding the client/daemon division is essential for troubleshooting. If you cannot connect, you must identify: is sshd crashed on the server, is port 22 blocked by a cloud firewall, or is your client sending the wrong key?',
      realWorldScenario: 'A newly launched Linux server is not accepting connections. You check the server console and run "systemctl status sshd" to discover the SSH service was never enabled or failed to bind because port 22 was occupied.',
      realWorldAnalogy: 'A security guard (sshd) standing at the door of a VIP lounge. Guests (ssh client) show their badge, the guard checks their credentials, and lets them in.',
      withoutVsWith: {
        without: {
          title: 'Not Knowing SSH Daemon Architecture',
          items: ['Confusing client config (~/.ssh/config) with server daemon config (/etc/ssh/sshd_config)', 'Blaming network firewalls when sshd is simply inactive on the host', 'Unaware of how session pseudo-terminals (pty) are allocated'],
          outcome: 'Prolonged connection troubleshooting and misdirected fixes.'
        },
        with: {
          title: 'Mastering SSH Client/Daemon Architecture',
          items: ['Clear separation of client settings (~/.ssh/) vs server settings (/etc/ssh/)', 'Fast verification of sshd process status, sockets, and journald logs', 'Seamless configuration of non-standard ports and multi-daemon setups'],
          outcome: 'Instant triage of remote access issues and hardened server deployments.'
        }
      },
      blockDiagram: {
        title: 'SSH Client-Daemon Handshake',
        subtitle: 'Connection establishment flow:',
        nodes: [
          { id: 'client', label: 'ssh client (Laptop)', simpleDef: 'You typing commands', techDef: 'OpenSSH client initiates TCP syn to port 22', badge: 'Client', color: '#38bdf8' },
          { id: 'kex', label: 'Key Exchange & Session Key', simpleDef: 'Agrees on secret encryption', techDef: 'ECDH Curve25519 generates ephemeral symmetric key', badge: 'Crypto', color: '#10b981' },
          { id: 'sshd', label: 'sshd daemon (Server:22)', simpleDef: 'Listener on remote server', techDef: 'Master sshd process forks child worker per connection', badge: 'Daemon', color: '#a855f7' },
          { id: 'pty', label: 'Pseudo-Terminal (pty) & Shell', simpleDef: 'Your remote bash screen', techDef: 'Allocates /dev/pts/X and spawns user\'s default shell', badge: 'Shell', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'sshd', simple: 'Secure Shell Daemon: the background service running on the server waiting for logins.', technical: 'The daemon program for ssh providing secure encrypted communications between hosts.' },
        { term: 'Pseudo-Terminal (pty)', simple: 'A virtual terminal session that makes remote commands behave just like a local screen.', technical: 'Pair of bidirectional character devices (master/slave) emulating an interactive terminal.' }
      ],
      syntaxCode: 'systemctl status sshd',
      syntaxTokens: [
        { token: 'systemctl', role: 'command', explanation: 'systemd service management utility' },
        { token: 'status', role: 'argument', explanation: 'Query runtime status, process PID, and recent logs' },
        { token: 'sshd', role: 'argument', explanation: 'OpenSSH server daemon service unit (named "ssh" on Debian/Ubuntu, "sshd" on RHEL)' }
      ],
      variations: [
        { command: 'systemctl status ssh || systemctl status sshd', description: 'Inspect SSH daemon status across Debian/Ubuntu or RHEL' },
        { command: 'sudo systemctl restart sshd', description: 'Restart the SSH daemon to apply configuration changes' },
        { command: 'sudo ss -tulpn | grep -E "ssh|:22"', description: 'Verify that sshd is listening on TCP port 22' }
      ],
      expectedOutput: '● ssh.service - OpenBSD Secure Shell server\n     Loaded: loaded (/lib/systemd/system/ssh.service; enabled; vendor preset: enabled)\n     Active: active (running) since Tue 2026-09-30 00:00:00 UTC; 1h ago\n   Main PID: 782 (sshd)\n      Tasks: 1 (limit: 4616)\n     Memory: 4.8M',
      commonMistakes: [
        { mistake: 'Typing "systemctl status sshd" on Ubuntu and getting "Unit sshd.service could not be found"', whyWrong: 'Debian and Ubuntu historically name the service "ssh.service", whereas Red Hat names it "sshd.service".', correctWay: 'Use "systemctl status ssh" on Debian/Ubuntu, or check both.' },
        { mistake: 'Restarting sshd and fearing existing SSH connections will be severed', whyWrong: 'sshd forks an independent worker process for each active session; restarting sshd does NOT disconnect active users.', correctWay: 'Restart sshd safely with "sudo systemctl restart ssh" anytime.' }
      ],
      safeRecovery: 'If sshd fails to start after editing configuration, test the syntax with "sudo sshd -t" to pinpoint config errors.'
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
      difficulty: 'Beginner',
      quote: 'ssh user@host: the single command that puts you in the driver\'s seat of any server in the world.',
      whatIsIt: 'The "ssh" command is the client program used to log into a remote machine and execute commands. The standard invocation format is "ssh [options] [user@]hostname". If the username is omitted, ssh defaults to the current local username. By default, ssh connects to destination port 22 over TCP. Once authenticated, ssh allocates an interactive pseudo-terminal, redirecting keyboard input and terminal output seamlessly over the encrypted tunnel.',
      inSimpleWords: 'The magic telephone call. You type "ssh user@192.168.1.50", press Enter, enter your password or key, and suddenly your keyboard is typing commands directly on the remote server.',
      whyDoYouNeedIt: 'Whether managing a single cloud VPS, a fleet of 500 Kubernetes nodes, or a Raspberry Pi in your living room, ssh is the primary vehicle for Linux system administration.',
      realWorldScenario: 'You are deploying an update to an Ubuntu server hosted in Frankfurt. You open your local Mac or Linux laptop terminal and type "ssh deploy@frankfurt.mycompany.com". In 1 second, you have a live shell on the Frankfurt host.',
      realWorldAnalogy: 'Remote desktop for the command line: plugging a 5,000-mile invisible keyboard cable into a server in Germany.',
      withoutVsWith: {
        without: {
          title: 'Physical Console Access Only',
          items: ['Walking into noisy data centers in person to plug in physical monitor and keyboard', 'Inability to administer cloud instances hosted thousands of miles away', 'No programmatic terminal scripting or remote execution capability'],
          outcome: 'Impossible cloud operations and high operational latency.'
        },
        with: {
          title: 'Instant Remote Shell with ssh',
          items: ['Sub-second interactive terminal access to any server globally', 'Support for single-command remote execution (ssh user@host "uptime")', 'Encrypted X11 graphical forwarding and stream redirection'],
          outcome: 'Effortless remote server management and global cloud agility.'
        }
      },
      blockDiagram: {
        title: 'ssh Command Syntax Breakdown',
        subtitle: 'Key components of the standard ssh invocation:',
        nodes: [
          { id: 'ssh', label: 'ssh', simpleDef: 'OpenSSH Client', techDef: 'Executes OpenSSH client binary', badge: 'Command', color: '#38bdf8' },
          { id: 'port', label: '-p 22', simpleDef: 'Target Port', techDef: 'Specifies destination TCP port (defaults to 22)', badge: 'Port Flag', color: '#10b981' },
          { id: 'user', label: 'ubuntu@', simpleDef: 'Remote Username', techDef: 'Login account identity on target machine', badge: 'User', color: '#a855f7' },
          { id: 'host', label: '192.168.1.50', simpleDef: 'Destination IP or Domain', techDef: 'Target hostname or IPv4/IPv6 destination', badge: 'Host', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'known_hosts', simple: 'A file (~/.ssh/known_hosts) where your computer remembers the fingerprints of servers you visited.', technical: 'Client-side database mapping hostnames/IPs to verified public host keys.' },
        { term: 'StrictHostKeyChecking', simple: 'A security setting that warns or blocks you if a remote server\'s identity key changed.', technical: 'SSH client policy preventing MITM attacks by verifying host keys against known_hosts.' }
      ],
      syntaxCode: 'ssh -p 22 ubuntu@192.168.1.50',
      syntaxTokens: [
        { token: 'ssh', role: 'command', explanation: 'OpenSSH client program' },
        { token: '-p 22', role: 'option', explanation: 'Specify destination port (port 22)' },
        { token: 'ubuntu@192.168.1.50', role: 'argument', explanation: 'Target user account and remote host address' }
      ],
      variations: [
        { command: 'ssh user@192.168.1.50', description: 'Connect to remote host on default port 22' },
        { command: 'ssh -p 2222 user@server.com', description: 'Connect to remote host on custom non-standard port 2222' },
        { command: 'ssh user@server.com "uptime && df -h"', description: 'Execute remote commands non-interactively and return output to local terminal' }
      ],
      expectedOutput: 'Welcome to Ubuntu 22.04.4 LTS (GNU/Linux 5.15.0-94-generic x86_64)\n * Documentation:  https://help.ubuntu.com\n * Management:     https://landscape.canonical.com\nLast login: Tue Sep 30 00:00:00 2026 from 192.168.1.100\nubuntu@server:~$ ',
      commonMistakes: [
        { mistake: 'Using uppercase "-P" instead of lowercase "-p" for the port in ssh', whyWrong: 'ssh uses lowercase "-p" for port (unlike scp which uses uppercase "-P").', correctWay: 'Remember: "ssh -p <port>" but "scp -P <port>".' },
        { mistake: 'Accepting an unknown host key fingerprint blindly without verifying', whyWrong: 'If an attacker is spoofing the server on public Wi-Fi, accepting a false key enables a Man-in-the-Middle attack.', correctWay: 'Verify the fingerprint against cloud provider console output on first connection.' }
      ],
      safeRecovery: 'If your SSH session hangs due to a dropped network connection, press "Enter", then "~", then "." (tilde followed by dot) to kill the hung client immediately.'
    }),

    buildLinuxConcept({
      id: 'c-16-04',
      subChapterNumber: '16.4',
      command: 'ssh -i ~/.ssh/id_ed25519 deploy@server.internal',
      title: 'Remote Login',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Explicit private key selection (-i), verbose debugging (-v), and non-interactive batch mode (-o BatchMode=yes)',
      badges: ['Remote', 'Keys', 'Debugging'],
      difficulty: 'Beginner',
      quote: 'When connection issues arise, ssh -v is your flashlight: it reveals every cipher negotiation and key offer step by step.',
      whatIsIt: 'Logging into remote servers often requires passing specific flags to manage identity and connection behavior. The "-i <identity_file>" flag forces ssh to authenticate using a specific private key rather than guessing default keys in ~/.ssh/. Adding "-v" (or "-vvv") enables verbose debugging output, printing every stage of the handshake. For automated bash scripts and CI/CD pipelines, "-o BatchMode=yes" instructs ssh to fail immediately rather than pausing interactively for a password prompt.',
      inSimpleWords: 'Advanced login tricks. You can tell SSH exactly which private key file to unlock the door with, or turn on diagnostic mode (-v) to see why a login is failing.',
      whyDoYouNeedIt: 'You manage personal GitHub repos, AWS cloud servers, and client databases—each requiring different SSH keys. The "-i" flag ensures you present the correct key for each target.',
      realWorldScenario: 'An automated deployment script fails on Jenkins with "Permission denied (publickey)". Running "ssh -v -i /secrets/deploy_key deploy@app.prod" reveals that the client offered the wrong key format, allowing immediate remediation.',
      realWorldAnalogy: 'Carrying a keyring with 10 keys: instead of trying all 10 keys one by one, "-i" pulls out the exact key labeled "Front Door".',
      withoutVsWith: {
        without: {
          title: 'Blind Connection Failures',
          items: ['Cryptic "Permission denied (publickey)" errors with zero explanation', 'SSH trying 5 wrong keys until the server locks out the connection ("Too many authentication failures")', 'CI/CD automation scripts hanging indefinitely waiting for human password input'],
          outcome: 'Failed automation, account lockouts, and frustrating debugging.'
        },
        with: {
          title: 'Explicit Identity & Diagnostics',
          items: ['Explicit key selection with "-i" guaranteeing correct key presentation', 'Comprehensive handshake tracing with "-v" / "-vvv" debugging', 'Non-interactive script safety with "-o BatchMode=yes -o ConnectTimeout=5"'],
          outcome: 'Reliable CI/CD pipelines, zero key lockouts, and instant diagnostic clarity.'
        }
      },
      blockDiagram: {
        title: 'Verbose SSH Handshake Trace (-v)',
        subtitle: 'Key diagnostic stages revealed by ssh -v:',
        nodes: [
          { id: 'dns', label: '1. Connecting to IP:22', simpleDef: 'TCP Connect', techDef: 'debug1: Connecting to server.internal [10.0.1.50] port 22', badge: 'Network', color: '#38bdf8' },
          { id: 'kex', label: '2. KEX & Host Key', simpleDef: 'Verify server', techDef: 'debug1: Host \'server.internal\' is known and matches the ED25519 host key', badge: 'Verify Host', color: '#10b981' },
          { id: 'keys', label: '3. Offering Public Key', simpleDef: 'Offering your key', techDef: 'debug1: Offering public key: /home/user/.ssh/id_ed25519 ED25519', badge: 'Identity', color: '#a855f7' },
          { id: 'auth', label: '4. Authentication Accepted', simpleDef: 'Access granted!', techDef: 'debug1: Authentication succeeded (publickey). Allocated pty.', badge: 'Success', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Identity File (-i)', simple: 'The private key file on your computer used to prove who you are.', technical: 'Selects a file from which the identity (private key) for public key authentication is read.' },
        { term: 'BatchMode', simple: 'A setting that tells SSH to never ask for a password (essential for scripts).', technical: 'If set to "yes", passphrase/password querying will be disabled; fails immediately if authentication cannot proceed.' }
      ],
      syntaxCode: 'ssh -i ~/.ssh/id_ed25519 deploy@server.internal',
      syntaxTokens: [
        { token: 'ssh', role: 'command', explanation: 'OpenSSH client program' },
        { token: '-i ~/.ssh/id_ed25519', role: 'option', explanation: 'Path to specific private key identity file' },
        { token: 'deploy@server.internal', role: 'argument', explanation: 'Remote user account and target host' }
      ],
      variations: [
        { command: 'ssh -i ~/.ssh/custom_key user@host', description: 'Authenticate using specific private key' },
        { command: 'ssh -v user@host', description: 'Verbose mode: print detailed debug information about the connection' },
        { command: 'ssh -o BatchMode=yes -o ConnectTimeout=5 user@host "uptime"', description: 'Execute command with strict 5s timeout and zero interactive prompts for automation' }
      ],
      expectedOutput: 'Authenticated to server.internal ([10.0.1.50]:22) using "publickey".\nLast login: Tue Sep 30 00:00:00 2026 from 10.0.0.5\ndeploy@server:~$ ',
      commonMistakes: [
        { mistake: 'Passing the public key (.pub) to "-i" instead of the private key', whyWrong: 'The "-i" flag requires your PRIVATE key file; passing the .pub file will cause authentication to fail.', correctWay: 'Pass the private key without the .pub extension (e.g. -i ~/.ssh/id_ed25519).' },
        { mistake: 'Leaving private key file permissions open (e.g. chmod 644 or 777)', whyWrong: 'SSH will refuse to use the private key with "WARNING: UNPROTECTED PRIVATE KEY FILE!" and ignore it.', correctWay: 'Always lock private keys to root/user only: "chmod 600 ~/.ssh/id_ed25519".' }
      ],
      safeRecovery: 'If SSH refuses a key due to bad permissions, fix it immediately with "chmod 600 ~/.ssh/id_ed25519 && chmod 700 ~/.ssh".'
    }),

    buildLinuxConcept({
      id: 'c-16-05',
      subChapterNumber: '16.5',
      command: 'ssh -o PreferredAuthentications=publickey user@host',
      title: 'Authentication Methods',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Comparing Public Key, Password, Host-based, and Keyboard-Interactive (MFA/2FA) authentication',
      badges: ['Authentication', 'MFA', 'Security'],
      difficulty: 'Intermediate',
      quote: 'Passwords are weak and brute-forceable; public key authentication with asymmetric cryptography is the enterprise baseline.',
      whatIsIt: 'OpenSSH supports multiple authentication mechanisms defined in the SSH-USERAUTH protocol. The most common methods are: 1) "publickey" (asymmetric cryptography: client proves possession of private key matching a public key in ~/.ssh/authorized_keys); 2) "password" (plaintext password verified against /etc/shadow); 3) "keyboard-interactive" (PAM-driven challenges, commonly used for Two-Factor Authentication like Google Authenticator or Duo); and 4) "gssapi-with-mic" (Kerberos enterprise single sign-on).',
      inSimpleWords: 'The different types of ID cards SSH accepts. You can use a password, a high-security digital cryptographic key, or a 6-digit phone security code (2FA/MFA).',
      whyDoYouNeedIt: 'Industry security standards (SOC2, PCI-DSS, ISO27001) mandate disabling password authentication entirely on production servers in favor of SSH keys combined with multi-factor authentication (MFA).',
      realWorldScenario: 'You are setting up high-security bastion jump hosts for a financial institution. You configure sshd to require BOTH publickey AND keyboard-interactive (PAM Duo 2FA) authentication before granting access.',
      realWorldAnalogy: 'Entering a high-security bank vault: requiring both a physical physical key (public key) and an iris scan or mobile OTP token (keyboard-interactive).',
      withoutVsWith: {
        without: {
          title: 'Password-Only Authentication',
          items: ['Vulnerable to 24/7 internet dictionary brute-force attacks filling /var/log/auth.log', 'Users reuse weak, easily guessed passwords across multiple servers', 'Vulnerable to credential harvesting via phishing'],
          outcome: 'Constant brute-force attempts and high compromise risk.'
        },
        with: {
          title: 'Public Key + MFA Authentication',
          items: ['Mathematically impossible to brute-force (2^256 keyspace for Ed25519)', 'Private keys never leave the client laptop; never transmitted over network', 'Multi-factor authentication (2FA) preventing access even if laptop is stolen'],
          outcome: 'Zero brute-force vulnerability and enterprise compliance.'
        }
      },
      blockDiagram: {
        title: 'Public Key Authentication Math',
        subtitle: 'Challenge-Response authentication flow:',
        nodes: [
          { id: 'req', label: '1. Client Requests Auth', simpleDef: 'I want to log in as "ubuntu"', techDef: 'Sends username and public key fingerprint', badge: 'Request', color: '#38bdf8' },
          { id: 'chal', label: '2. Server Issues Challenge', simpleDef: 'Encrypts random secret', techDef: 'Server generates random nonce, encrypts with user\'s authorized public key', badge: 'Challenge', color: '#10b981' },
          { id: 'sign', label: '3. Client Signs Challenge', simpleDef: 'Decrypts with private key', techDef: 'Client decrypts nonce with private key, signs with signature, sends back', badge: 'Proof', color: '#a855f7' },
          { id: 'succ', label: '4. Verified & Logged In', simpleDef: 'Math matches: Access granted!', techDef: 'Server verifies signature with public key; grants login without password', badge: 'Access', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'authorized_keys', simple: 'The file on the server (~/.ssh/authorized_keys) listing public keys allowed to log in.', technical: 'Line-separated list of approved public keys per user account parsed by sshd.' },
        { term: 'Keyboard-Interactive', simple: 'A prompt where the server asks you questions, like entering a 2FA phone code.', technical: 'Generic authentication mechanism passing PAM prompts (passwords, OTP tokens) to user.' }
      ],
      syntaxCode: 'ssh -o PreferredAuthentications=publickey user@host',
      syntaxTokens: [
        { token: 'ssh', role: 'command', explanation: 'OpenSSH client program' },
        { token: '-o PreferredAuthentications=publickey', role: 'option', explanation: 'Force client to try only public key authentication, bypassing passwords' },
        { token: 'user@host', role: 'argument', explanation: 'Target user and host' }
      ],
      variations: [
        { command: 'ssh -o PreferredAuthentications=publickey user@host', description: 'Enforce public key authentication strictly' },
        { command: 'ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no user@host', description: 'Force password authentication fallback for emergency testing' }
      ],
      expectedOutput: '(Logs in successfully without prompting for a password if public key is in authorized_keys)',
      commonMistakes: [
        { mistake: 'Believing that copying your private key to the server makes authentication work', whyWrong: 'The private key stays on your local laptop; ONLY the public key (.pub) is placed on the server!', correctWay: 'Keep private keys private on your laptop; copy public keys to ~/.ssh/authorized_keys on the server.' },
        { mistake: 'Forgetting that ~/.ssh/authorized_keys file permissions must be 600', whyWrong: 'sshd\'s StrictModes feature will silently reject keys if permissions are too loose.', correctWay: 'Run "chmod 600 ~/.ssh/authorized_keys" on the remote server.' }
      ],
      safeRecovery: 'To test which authentication methods a remote server accepts, run "ssh -v user@host" and look for "Authentications that can continue".'
    }),

    buildLinuxConcept({
      id: 'c-16-06',
      subChapterNumber: '16.6',
      command: 'ssh-keygen -t ed25519 -C "admin@company.com"',
      title: 'SSH Key Pairs (ssh-keygen)',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Modern elliptic curve cryptography: generating Ed25519 vs RSA keys with passphrases',
      badges: ['ssh-keygen', 'Ed25519', 'Crypto'],
      difficulty: 'Beginner',
      quote: 'Ed25519 is the modern gold standard: shorter keys, faster signatures, and mathematically immune to RSA timing attacks.',
      whatIsIt: 'The "ssh-keygen" command generates asymmetric cryptographic keypairs consisting of a Private Key (which must remain secret on your laptop) and a Public Key (which ends in .pub and is shared with servers). While legacy RSA 2048/4096-bit keys are still widespread, the modern standard is Ed25519 (Edwards-curve Digital Signature Algorithm). Ed25519 provides superior security (equivalent to ~3000-bit RSA), compact 68-character keys, blazing fast signature verification, and protection against cache-timing attacks.',
      inSimpleWords: 'Making a digital padlock and key. The public key is the padlock you put on your server doors. The private key is the physical key that stays in your pocket to unlock them.',
      whyDoYouNeedIt: 'Generating an SSH keypair is the first task every software engineer, DevOps specialist, and cloud administrator performs on day one at any tech company.',
      realWorldScenario: 'You are onboarding onto a new engineering team. You run "ssh-keygen -t ed25519 -C \'alice@company.com\'", protect it with a strong passphrase, and upload the generated .pub file to GitHub and AWS IAM.',
      realWorldAnalogy: 'Buying a high-security lock set: you install the lock cylinder on your front door (public key) and keep the brass key on your personal keychain (private key).',
      withoutVsWith: {
        without: {
          title: 'Using Legacy RSA or No Passphrase',
          items: ['Using obsolete 1024-bit RSA keys vulnerable to factoring attacks', 'Generating keys without a passphrase leaving them unprotected if laptop is stolen', 'Slow signature generation on embedded or low-power hardware'],
          outcome: 'Security vulnerability and credential compromise risks.'
        },
        with: {
          title: 'Generating Ed25519 with Passphrase',
          items: ['State-of-the-art Curve25519 elliptic-curve security standard', 'Strong passphrase encryption (AES-256-CTR) protecting private key at rest', 'Compact, easy-to-paste public keys starting with "ssh-ed25519"'],
          outcome: 'Maximum cryptographic security and streamlined key management.'
        }
      },
      blockDiagram: {
        title: 'Asymmetric Key Pair Generation',
        subtitle: 'The two files produced by ssh-keygen:',
        nodes: [
          { id: 'priv', label: 'Private Key (~/.ssh/id_ed25519)', simpleDef: 'NEVER SHARE THIS', techDef: '256-bit secret key encrypted with your passphrase; permissions 600', badge: 'Secret', color: '#ef4444' },
          { id: 'math', label: 'Elliptic Curve Math', simpleDef: 'One-way mathematical relation', techDef: 'Ed25519 scalar multiplication derives public point from secret scalar', badge: 'Math', color: '#38bdf8' },
          { id: 'pub', label: 'Public Key (~/.ssh/id_ed25519.pub)', simpleDef: 'SHARE EVERYWHERE', techDef: 'Public key string safe to paste into authorized_keys, GitHub, AWS', badge: 'Public', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'Ed25519', simple: 'The modern, super-secure elliptic curve standard for SSH keys.', technical: 'EdDSA signature scheme using SHA-512 and Curve25519.' },
        { term: 'Passphrase', simple: 'A password that encrypts your private key on your laptop\'s hard drive.', technical: 'Passphrase used with KDF (Key Derivation Function: bcrypt) to encrypt private key file.' }
      ],
      syntaxCode: 'ssh-keygen -t ed25519 -C "admin@company.com"',
      syntaxTokens: [
        { token: 'ssh-keygen', role: 'command', explanation: 'Authentication key generation and management tool' },
        { token: '-t ed25519', role: 'option', explanation: 'Specify key type (modern Edwards-curve 25519)' },
        { token: '-C "admin@company.com"', role: 'option', explanation: 'Comment field appended to public key for easy identification' }
      ],
      variations: [
        { command: 'ssh-keygen -t ed25519 -C "user@work"', description: 'Generate modern Ed25519 keypair with comment' },
        { command: 'ssh-keygen -t rsa -b 4096 -C "legacy@server"', description: 'Generate strong 4096-bit RSA key for older legacy systems' },
        { command: 'ssh-keygen -p -f ~/.ssh/id_ed25519', description: 'Change the passphrase of an existing private key without regenerating' },
        { command: 'ssh-keygen -l -f ~/.ssh/id_ed25519.pub', description: 'Display fingerprint and bit length of public key' }
      ],
      expectedOutput: 'Generating public/private ed25519 key pair.\nEnter file in which to save the key (/home/user/.ssh/id_ed25519): \nEnter passphrase (empty for no passphrase): \nEnter same passphrase again: \nYour identification has been saved in /home/user/.ssh/id_ed25519\nYour public key has been saved in /home/user/.ssh/id_ed25519.pub\nThe key fingerprint is:\nSHA256:abc123def456ghi789jkl012mno345pqr678stu901v admin@company.com',
      commonMistakes: [
        { mistake: 'Leaving the passphrase empty because typing it every time is annoying', whyWrong: 'An unencrypted private key can be copied by malicious scripts or anyone with physical access to your laptop.', correctWay: 'Use a strong passphrase and use "ssh-agent" so you only have to type it once per reboot.' },
        { mistake: 'Generating keys with outdated 1024-bit DSA or RSA', whyWrong: 'DSA and 1024-bit RSA are cryptographically broken and disabled by default in modern OpenSSH.', correctWay: 'Always use "-t ed25519" (or "-t rsa -b 4096" for legacy systems).' }
      ],
      safeRecovery: 'To view your public key string anytime to copy it, run "cat ~/.ssh/id_ed25519.pub".'
    }),

    buildLinuxConcept({
      id: 'c-16-07',
      subChapterNumber: '16.7',
      command: 'ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server',
      title: 'Copying Keys (ssh-copy-id)',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Automated public key deployment: appending keys and setting strict 700/600 permissions',
      badges: ['ssh-copy-id', 'Deployment', 'Keys'],
      difficulty: 'Beginner',
      quote: 'ssh-copy-id is the error-free installer: it connects, creates ~/.ssh, appends the key, and locks down permissions.',
      whatIsIt: '"ssh-copy-id" is a helper script that automates the installation of your local public key onto a remote server\'s ~/.ssh/authorized_keys file. Doing this manually is error-prone: administrators often overwrite the existing authorized_keys file (using > instead of >>), introduce Windows newline carriage returns, or leave directory permissions too open (causing sshd StrictModes to reject logins). ssh-copy-id performs all checks safely and sets chmod 700 on ~/.ssh and chmod 600 on authorized_keys.',
      inSimpleWords: 'A one-click installer for your digital key. It copies your public key onto the remote server and makes sure the security permissions are set correctly so everything works on the first try.',
      whyDoYouNeedIt: 'Once you generate an SSH key, you must put it on the server. ssh-copy-id installs it in 3 seconds without having to log in manually or copy-paste text.',
      realWorldScenario: 'You provisioned a new cloud server and have temporary password access. You run "ssh-copy-id -i ~/.ssh/id_ed25519.pub ubuntu@192.168.1.50". From that second forward, you can log in without typing the password.',
      realWorldAnalogy: 'Handing a copy of your apartment key to the property manager so they can install the lock before you arrive.',
      withoutVsWith: {
        without: {
          title: 'Manual Key Copy-Pasting',
          items: ['Accidentally overwriting other team members\' keys using ">" instead of ">>"', 'Permission errors (chmod 777) causing sshd to silently reject the key', 'Line wrapping or trailing spaces corrupting the cryptographic string'],
          outcome: 'Authentication failures, lockouts, and lost team access.'
        },
        with: {
          title: 'Automated Deployment with ssh-copy-id',
          items: ['Safe appending (>>) preventing accidental key overwrites', 'Automatic enforcement of secure permissions: 700 on ~/.ssh and 600 on authorized_keys', 'Idempotent: prevents duplicate key entries if run multiple times'],
          outcome: 'Error-free key deployment in seconds.'
        }
      },
      blockDiagram: {
        title: 'ssh-copy-id Automation Steps',
        subtitle: 'What ssh-copy-id executes on the remote host:',
        nodes: [
          { id: 'read', label: '1. Reads Local .pub', simpleDef: 'Picks up your public key', techDef: 'Reads ~/.ssh/id_ed25519.pub', badge: 'Local', color: '#38bdf8' },
          { id: 'mkdir', label: '2. Creates ~/.ssh (700)', simpleDef: 'Creates folder safely', techDef: 'ssh host "mkdir -p ~/.ssh && chmod 700 ~/.ssh"', badge: 'Remote Dir', color: '#10b981' },
          { id: 'append', label: '3. Appends Key (600)', simpleDef: 'Appends to authorized_keys', techDef: 'Appends key string to ~/.ssh/authorized_keys && chmod 600', badge: 'Append', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'ssh-copy-id', simple: 'A command that automatically copies your public key to a remote server.', technical: 'Shell script wrapper connecting over SSH to safely append keys and fix permissions.' },
        { term: 'StrictModes', simple: 'A security feature in sshd that refuses keys if ~/.ssh is readable by other users.', technical: 'sshd_config directive enforcing strict ownership and permissions on user SSH files.' }
      ],
      syntaxCode: 'ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server',
      syntaxTokens: [
        { token: 'ssh-copy-id', role: 'command', explanation: 'Install public keys onto a remote machine\'s authorized_keys' },
        { token: '-i ~/.ssh/id_ed25519.pub', role: 'option', explanation: 'Specify public key file to copy' },
        { token: 'user@server', role: 'argument', explanation: 'Target user account and remote destination host' }
      ],
      variations: [
        { command: 'ssh-copy-id user@server', description: 'Copy default public key to remote host' },
        { command: 'ssh-copy-id -i ~/.ssh/id_ed25519.pub -p 2222 user@server', description: 'Copy key to a server listening on custom port 2222' }
      ],
      expectedOutput: '/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/user/.ssh/id_ed25519.pub"\n/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed\n/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- confirming with user\nuser@server\'s password: \n\nNumber of key(s) added: 1\n\nNow try logging into the machine, with:   "ssh \'user@server\'"\nand check to make sure that only the key(s) you wanted were added.',
      commonMistakes: [
        { mistake: 'Passing the private key (id_ed25519) to ssh-copy-id instead of the .pub key', whyWrong: 'Although ssh-copy-id tries to append .pub automatically, passing private keys risks confusion.', correctWay: 'Always specify the public key: -i ~/.ssh/id_ed25519.pub.' },
        { mistake: 'Trying to use ssh-copy-id when password authentication is already disabled on the server', whyWrong: 'ssh-copy-id requires an initial working authentication method (like password) to install the key.', correctWay: 'If passwords are disabled, add the key via cloud-init, provider console, or asking an existing admin.' }
      ],
      safeRecovery: 'If ssh-copy-id is not available on your system, run: "cat ~/.ssh/id_ed25519.pub | ssh user@host \'mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys\'".'
    }),

    buildLinuxConcept({
      id: 'c-16-08',
      subChapterNumber: '16.8',
      command: 'cat ~/.ssh/config',
      title: '~/.ssh/config',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'The client configuration powerhouse: shortcuts, custom ports, key bindings, and ProxyJump bastions',
      badges: ['Config', 'ProxyJump', 'Productivity'],
      difficulty: 'Intermediate',
      quote: 'A well-crafted ~/.ssh/config turns a 60-character command with ports and keys into a 5-letter shortcut.',
      whatIsIt: 'The client-side configuration file "~/.ssh/config" allows operators to define nicknames, connection parameters, identity files, and routing rules for remote hosts. Instead of typing "ssh -p 2222 -i ~/.ssh/prod_rsa -J jump.corp.com ubuntu@10.0.1.50", an entry in ~/.ssh/config allows you to simply type "ssh prod-db". It supports wildcards (Host *.internal), ProxyJump (transparent bastion tunneling), LocalForward, and connection multiplexing (ControlMaster).',
      inSimpleWords: 'Your personal phone address book for servers. Instead of remembering IP addresses, non-standard ports, and key paths, you give each server a simple nickname like "web" or "db".',
      whyDoYouNeedIt: 'In cloud environments, backend database servers reside on private subnets without public IPs. A single ProxyJump directive in ~/.ssh/config lets you connect straight through a bastion jump-host seamlessly.',
      realWorldScenario: 'You administer a production Kubernetes node behind a corporate jump host. Your ~/.ssh/config defines "ProxyJump bastion.corp.com" for all 10.* servers. You type "ssh k8s-worker-1" and SSH tunnels through the bastion automatically in 1 second.',
      realWorldAnalogy: 'Setting up a speed-dial contact on your phone: pressing "1" dials an international number with country codes and extensions automatically.',
      withoutVsWith: {
        without: {
          title: 'Manual Full-Length SSH Commands',
          items: ['Typing 80-character commands specifying ports, users, keys, and bastion flags every time', 'Memorizing dozens of raw cloud IP addresses and port numbers', 'Copying private keys onto intermediate jump-host servers (massive security violation)'],
          outcome: 'Wasted time, typing fatigue, and dangerous security compromises.'
        },
        with: {
          title: 'Managing with ~/.ssh/config',
          items: ['Single-word nicknames (ssh prod, ssh db, ssh staging)', 'Seamless transparent ProxyJump tunneling through bastions without agent forwarding', 'Automated ControlMaster socket multiplexing reducing connection time to 10ms'],
          outcome: 'Maximum engineer productivity and zero-effort secure bastion traversal.'
        }
      },
      blockDiagram: {
        title: 'ProxyJump Bastion Traversal',
        subtitle: 'How ProxyJump connects through a jump-host to a private database:',
        nodes: [
          { id: 'laptop', label: 'Local Laptop', simpleDef: 'You type "ssh prod-db"', techDef: 'Reads ~/.ssh/config Host prod-db stanza', badge: 'Client', color: '#38bdf8' },
          { id: 'jump', label: 'Bastion (bastion.corp.com)', simpleDef: 'Public Jump Host', techDef: 'ProxyJump opens stdio forward channel to private IP', badge: 'Bastion', color: '#f59e0b' },
          { id: 'db', label: 'Private DB (10.0.1.50:22)', simpleDef: 'Private subnet target', techDef: 'End-to-end encryption negotiated directly between Laptop and DB', badge: 'Target', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'ProxyJump (-J)', simple: 'Tells SSH to automatically hop through a middleman server (bastion) to reach a private server.', technical: 'Client-side port forwarding chaining standard I/O through intermediate SSH daemons.' },
        { term: 'ControlMaster', simple: 'Shares a single network connection across multiple terminal tabs to speed up SSH logins.', technical: 'Multiplexes multiple SSH sessions over a single persistent UNIX domain socket.' }
      ],
      syntaxCode: 'cat ~/.ssh/config',
      syntaxTokens: [
        { token: 'cat', role: 'command', explanation: 'Display file contents' },
        { token: '~/.ssh/config', role: 'path', explanation: 'User-specific OpenSSH client configuration file' }
      ],
      variations: [
        { command: 'cat ~/.ssh/config', description: 'View current client SSH configuration entries' },
        { command: 'ssh -F /path/to/custom_config hostname', description: 'Specify alternative configuration file instead of default' }
      ],
      expectedOutput: 'Host prod-web\n    HostName 203.0.113.10\n    User ubuntu\n    Port 2222\n    IdentityFile ~/.ssh/id_ed25519\n\nHost prod-db\n    HostName 10.0.1.50\n    User postgres\n    ProxyJump prod-web\n    IdentityFile ~/.ssh/id_ed25519',
      commonMistakes: [
        { mistake: 'Leaving ~/.ssh/config permissions as world-writable (e.g. 777 or 666)', whyWrong: 'OpenSSH will ignore the config file completely if other users can write to it.', correctWay: 'Lock file permissions with "chmod 600 ~/.ssh/config".' },
        { mistake: 'Using tabs or incorrect indentation under "Host"', whyWrong: 'While OpenSSH config allows whitespace, messy formatting can cause directives to apply to the wrong Host block.', correctWay: 'Indent directives 4 spaces under each "Host <nickname>" line.' }
      ],
      safeRecovery: 'To test which config directives apply to a specific host, run "ssh -G <nickname>".'
    }),

    buildLinuxConcept({
      id: 'c-16-09',
      subChapterNumber: '16.9',
      command: 'sudo grep -E "^(PermitRootLogin|PasswordAuthentication)" /etc/ssh/sshd_config',
      title: 'Securing SSH (sshd_config)',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Server-side hardening: the master /etc/ssh/sshd_config security baseline',
      badges: ['Hardening', 'sshd_config', 'Security'],
      difficulty: 'Intermediate',
      quote: 'Securing sshd_config is the first 5 minutes of any server\'s life: lock the root account, kill passwords, and demand keys.',
      whatIsIt: '/etc/ssh/sshd_config is the master configuration file for the OpenSSH daemon. Hardening this file is the single most critical security baseline task on any internet-facing Linux server. Core hardening rules include: 1) PermitRootLogin no (prevents direct root login, enforcing audit trails via sudo); 2) PasswordAuthentication no (disables all password logins, eliminating brute-force attacks); 3) MaxAuthTries 3 (mitigates key-fuzzing); and 4) X11Forwarding no (reduces graphical attack surface).',
      inSimpleWords: 'The master rulebook for the server\'s security guard. It tells the server: "Never let root log in directly, reject all passwords, and only allow verified cryptographic keys."',
      whyDoYouNeedIt: 'Within 30 seconds of booting an internet-facing cloud server, automated botnets begin attacking port 22 with millions of dictionary password guesses. A hardened sshd_config renders these attacks completely harmless.',
      realWorldScenario: 'You are deploying a financial payments processing node. Security compliance requires passing CIS Benchmarks. You configure "PermitRootLogin no" and "PasswordAuthentication no" in /etc/ssh/sshd_config.d/99-hardened.conf, instantly achieving compliance.',
      realWorldAnalogy: 'Replacing a standard front door lock with a biometric fingerprint scanner and removing the mailbox slot so intruders cannot pick the lock.',
      withoutVsWith: {
        without: {
          title: 'Default Permissive sshd Configuration',
          items: ['Root logins allowed directly over the internet without individual accountability', 'Passwords enabled, exposing the server to continuous brute-force attacks', 'Massive log bloat in /var/log/auth.log from thousands of failed bot attempts'],
          outcome: 'High risk of credential stuffing compromise and audit failure.'
        },
        with: {
          title: 'Hardened Production sshd Configuration',
          items: ['Direct root login completely blocked (engineers log in as themselves and sudo)', 'Password authentication disabled 100% (only cryptographic keys accepted)', 'Strict authentication limits (MaxAuthTries 3) dropping brute-force connections instantly'],
          outcome: 'Zero brute-force vulnerability, full user auditability, and CIS compliance.'
        }
      },
      blockDiagram: {
        title: 'sshd Hardening Checklist',
        subtitle: 'The 4 essential production directives:',
        nodes: [
          { id: 'root', label: 'PermitRootLogin no', simpleDef: 'No direct root login', techDef: 'Enforces individual user accountability; requires sudo elevation', badge: 'CIS 5.2.10', color: '#ef4444' },
          { id: 'pass', label: 'PasswordAuthentication no', simpleDef: 'No passwords allowed', techDef: 'Forces asymmetric publickey authentication exclusively', badge: 'CIS 5.2.11', color: '#10b981' },
          { id: 'tries', label: 'MaxAuthTries 3', simpleDef: 'Drop after 3 failures', techDef: 'Disconnects sessions attempting more than 3 failed key offers', badge: 'Rate Limit', color: '#38bdf8' },
          { id: 'empty', label: 'PermitEmptyPasswords no', simpleDef: 'Block blank passwords', techDef: 'Rejects login attempts for accounts without set passwords', badge: 'Baseline', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'sshd_config', simple: 'The configuration file on the server that controls how SSH behaves.', technical: 'System-wide OpenSSH daemon configuration file parsed at service startup.' },
        { term: 'PermitRootLogin', simple: 'A setting that controls whether the "root" superuser can log in directly over SSH.', technical: 'sshd directive accepting "yes", "prohibit-password", or "no".' }
      ],
      syntaxCode: 'sudo grep -E "^(PermitRootLogin|PasswordAuthentication)" /etc/ssh/sshd_config',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with root administrative privileges' },
        { token: 'grep -E', role: 'command', explanation: 'Extended regular expression pattern search' },
        { token: '"^(PermitRootLogin|PasswordAuthentication)"', role: 'argument', explanation: 'Regex matching active (uncommented) core hardening directives' },
        { token: '/etc/ssh/sshd_config', role: 'path', explanation: 'Target OpenSSH daemon configuration file' }
      ],
      variations: [
        { command: 'sudo sshd -t', description: 'Test /etc/ssh/sshd_config syntax for errors before restarting daemon (CRITICAL!)' },
        { command: 'sudo sshd -T | grep -E "permitrootlogin|passwordauthentication"', description: 'Display live runtime effective values of hardening parameters' },
        { command: 'sudo systemctl reload ssh', description: 'Safely reload sshd configuration without disconnecting active sessions' }
      ],
      expectedOutput: 'PermitRootLogin no\nPasswordAuthentication no',
      commonMistakes: [
        { mistake: 'Restarting sshd after editing config without testing with "sshd -t"', whyWrong: 'A typo in sshd_config will prevent sshd from starting, permanently locking you out of the server.', correctWay: 'ALWAYS run "sudo sshd -t" to validate syntax before restarting sshd!' },
        { mistake: 'Closing your current active SSH session before testing your changes in a new terminal', whyWrong: 'If your new config has an issue, closing your only active shell means you are permanently locked out.', correctWay: 'Keep your existing session open and open a second terminal tab to test logging in.' }
      ],
      safeRecovery: 'ALWAYS keep your existing terminal session open when editing sshd_config. Test logging in from a second terminal window before disconnecting!'
    }),

    buildLinuxConcept({
      id: 'c-16-10',
      subChapterNumber: '16.10',
      command: 'sudo grep "PasswordAuthentication no" /etc/ssh/sshd_config.d/*.conf /etc/ssh/sshd_config 2>/dev/null',
      title: 'Disabling Password Authentication',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Eliminating brute-force vectors: enforcing public key-only access and drop-in configuration files',
      badges: ['Hardening', 'Passwords', 'Keys Only'],
      difficulty: 'Intermediate',
      quote: 'When you set PasswordAuthentication no, dictionary bot attacks bounce off your server like raindrops on armor.',
      whatIsIt: 'Disabling password authentication ensures that no user can authenticate to the OpenSSH daemon by entering an account password. When "PasswordAuthentication no" and "KbdInteractiveAuthentication no" are configured, sshd will strictly demand a verified public key matching an entry in ~/.ssh/authorized_keys. Modern Linux systems (Ubuntu 22.04+, RHEL 9+) support modular drop-in configuration files located in /etc/ssh/sshd_config.d/*.conf, avoiding manual edits to the main file.',
      inSimpleWords: 'Removing the keyhole from your front door. Since nobody can enter a password, automated hacking bots can try passwords all day and night—the server won\'t even listen.',
      whyDoYouNeedIt: 'Over 95% of server compromises on cloud providers (AWS, DigitalOcean, Linode) occur due to weak passwords targeted by automated bots. Disabling passwords eradicates this entire attack class.',
      realWorldScenario: 'You spin up a public cloud server. Checking /var/log/auth.log reveals 15,000 failed password attempts from Russian and Chinese botnets in 2 hours. You disable password authentication; the log entries vanish completely.',
      realWorldAnalogy: 'Welding the keyhole shut and requiring everyone to use a digital keycard.',
      withoutVsWith: {
        without: {
          title: 'Password Authentication Enabled',
          items: ['Constant CPU and log spam from automated dictionary brute-force attacks', 'Risk of users choosing weak passwords like "Summer2026!"', 'Vulnerable to credential dumps and credential stuffing attacks'],
          outcome: 'High server compromise probability and continuous alert noise.'
        },
        with: {
          title: 'Password Authentication Disabled',
          items: ['Zero vulnerability to password guessing or dictionary attacks', 'Access restricted exclusively to pre-authorized cryptographic keyholders', 'Compliance with SOC2, ISO27001, and HIPAA access control mandates'],
          outcome: 'Total elimination of password attack vectors.'
        }
      },
      blockDiagram: {
        title: 'Modular Drop-In Configuration Flow',
        subtitle: 'Modern sshd_config.d configuration hierarchy:',
        nodes: [
          { id: 'dropin', label: '/etc/ssh/sshd_config.d/50-cloud.conf', simpleDef: 'Drop-in config snippet', techDef: 'Overrides base settings: PasswordAuthentication no', badge: 'Drop-in', color: '#10b981' },
          { id: 'main', label: '/etc/ssh/sshd_config', simpleDef: 'Main configuration file', techDef: 'Includes "Include /etc/ssh/sshd_config.d/*.conf" at top', badge: 'Master Config', color: '#38bdf8' },
          { id: 'daemon', label: 'sshd Service', simpleDef: 'Enforces key-only policy', techDef: 'Rejects USERAUTH password requests with SSH_MSG_USERAUTH_FAILURE', badge: 'Enforcement', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'sshd_config.d', simple: 'A folder where you can drop clean custom settings without editing the main file.', technical: 'Drop-in configuration directory parsed via "Include" directive in OpenSSH 8.2+.' },
        { term: 'KbdInteractiveAuthentication', simple: 'Modern name for ChallengeResponseAuthentication in OpenSSH.', technical: 'Controls PAM keyboard-interactive password queries; must also be disabled alongside password auth.' }
      ],
      syntaxCode: 'sudo grep "PasswordAuthentication no" /etc/ssh/sshd_config.d/*.conf /etc/ssh/sshd_config 2>/dev/null',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with administrative root privileges' },
        { token: 'grep', role: 'command', explanation: 'Pattern search tool' },
        { token: '"PasswordAuthentication no"', role: 'argument', explanation: 'Search string ensuring password authentication is disabled' },
        { token: '/etc/ssh/sshd_config.d/*.conf', role: 'path', explanation: 'Drop-in configuration directory files' }
      ],
      variations: [
        { command: 'sudo grep -ri "passwordauthentication" /etc/ssh/', description: 'Audit all files in /etc/ssh for password authentication directives' },
        { command: 'echo "PasswordAuthentication no" | sudo tee /etc/ssh/sshd_config.d/99-disable-passwords.conf', description: 'Create clean modular drop-in file to disable password logins' },
        { command: 'sudo sshd -t && sudo systemctl reload ssh', description: 'Validate syntax and reload SSH daemon safely' }
      ],
      expectedOutput: '/etc/ssh/sshd_config.d/50-cloud-init.conf:PasswordAuthentication no',
      commonMistakes: [
        { mistake: 'Disabling password authentication BEFORE verifying that your SSH key works', whyWrong: 'If your key is broken or missing from authorized_keys, you will be permanently locked out.', correctWay: 'Test logging in with your key in a separate terminal before disabling passwords!' },
        { mistake: 'Setting "PasswordAuthentication no" in the main file while a drop-in in sshd_config.d overrides it with "yes"', whyWrong: 'Directives parsed first win; modern Ubuntu checks sshd_config.d/*.conf first.', correctWay: 'Verify runtime settings with "sudo sshd -T | grep passwordauthentication".' }
      ],
      safeRecovery: 'Always verify effective settings with "sudo sshd -T | grep passwordauthentication" to confirm it outputs "no".'
    }),

    buildLinuxConcept({
      id: 'c-16-11',
      subChapterNumber: '16.11',
      command: 'sudo grep "^Port " /etc/ssh/sshd_config || echo "Port 22"',
      title: 'Changing SSH Port',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Noise reduction: moving SSH off default port 22 to eliminate 99% of automated internet scan logs',
      badges: ['Port', 'Hardening', 'SELinux'],
      difficulty: 'Intermediate',
      quote: 'Changing the SSH port is not encryption, but it is the ultimate silencer: it cuts bot scan noise by 99.9%.',
      whatIsIt: 'By default, sshd listens on TCP port 22. Because port 22 is universally known, automated internet-wide scanners (Shodan, Censys, botnets) hammer it continuously. Moving SSH to a high non-standard port (such as 2222 or 22022) does not make the server mathematically more secure, but it eliminates 99.9% of automated scanner log noise. When changing ports on SELinux systems (RHEL/Rocky), the new port must be explicitly labeled with "semanage port".',
      inSimpleWords: 'Changing your door number from "Front Door" to "Side Gate". Serious attackers might still find it if they scan every port, but automated drive-by spammers will pass right by without noticing.',
      whyDoYouNeedIt: 'Cleaning up /var/log/auth.log makes genuine security incidents visible instead of being buried under 50,000 automated failed bot connection attempts every day.',
      realWorldScenario: 'Your security monitoring tool fires 500 alerts a day about failed port 22 logins. You change the port to 2222, update firewall rules, and the alert volume drops to zero immediately.',
      realWorldAnalogy: 'Taking your name off the public building directory: legitimate visitors who know your apartment number can still visit, but random door-to-door salesmen won\'t knock.',
      withoutVsWith: {
        without: {
          title: 'Running on Default Port 22',
          items: ['Constant barrage of automated botnet scans filling system logs with gigabytes of noise', 'Higher CPU utilization handling TCP connection handshakes from internet bots', 'Higher risk if a new OpenSSH pre-auth vulnerability (e.g. regreSSHion) is discovered'],
          outcome: 'Log pollution and exposure to widespread automated exploit scans.'
        },
        with: {
          title: 'Running on Non-Standard High Port',
          items: ['99.9% reduction in automated scan attempts and log noise', 'Clean, actionable security logs where real anomalies stand out immediately', 'Extra barrier requiring attackers to execute time-consuming full-range port scans'],
          outcome: 'Quiet, clean logs and reduced automated attack exposure.'
        }
      },
      blockDiagram: {
        title: 'Changing SSH Port Safely',
        subtitle: 'The 4 mandatory steps to prevent accidental lockout:',
        nodes: [
          { id: 'fw', label: '1. Open New Port in Firewall', simpleDef: 'Allow port 2222', techDef: 'sudo ufw allow 2222/tcp or firewall-cmd --add-port=2222/tcp', badge: 'Firewall', color: '#ef4444' },
          { id: 'selinux', label: '2. Label in SELinux (RHEL)', simpleDef: 'Authorize in SELinux', techDef: 'sudo semanage port -a -t ssh_port_t -p tcp 2222', badge: 'SELinux', color: '#f59e0b' },
          { id: 'conf', label: '3. Edit sshd_config', simpleDef: 'Set "Port 2222"', techDef: 'Add Port 2222 and validate with sudo sshd -t', badge: 'Config', color: '#38bdf8' },
          { id: 'test', label: '4. Test in New Tab', simpleDef: 'Verify before disconnecting', techDef: 'ssh -p 2222 user@host from a second terminal window', badge: 'Validation', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'Security Through Obscurity', simple: 'Hiding something instead of securing it (good as a second layer, bad as a sole defense).', technical: 'Relying on the secrecy of the design or configuration as the main method of providing security.' },
        { term: 'semanage port', simple: 'A Red Hat command to tell SELinux that a service is allowed to use a non-standard port.', technical: 'SELinux policy management tool modifying network port context definitions.' }
      ],
      syntaxCode: 'sudo grep "^Port " /etc/ssh/sshd_config || echo "Port 22"',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with root administrative privileges' },
        { token: 'grep "^Port "', role: 'command', explanation: 'Search for active Port directive in sshd_config' },
        { token: '|| echo "Port 22"', role: 'operator', explanation: 'Fallback output indicating default port 22 if unconfigured' }
      ],
      variations: [
        { command: 'sudo ss -tulpn | grep ssh', description: 'Check which port(s) sshd is currently actively listening on' },
        { command: 'sudo ufw allow 2222/tcp', description: 'Allow traffic on new port in Ubuntu UFW firewall BEFORE changing sshd' },
        { command: 'ssh -p 2222 user@server', description: 'Connect to remote server on the newly configured custom port' }
      ],
      expectedOutput: 'Port 22',
      commonMistakes: [
        { mistake: 'Changing the port in sshd_config without opening the port in the firewall first', whyWrong: 'sshd will bind to the new port, but UFW, firewalld, or AWS Security Group will block it, locking you out.', correctWay: 'ALWAYS allow the new port in your firewall FIRST before restarting sshd.' },
        { mistake: 'Changing the port on RHEL/Rocky without updating SELinux policy', whyWrong: 'SELinux will block sshd from binding to any port not labeled "ssh_port_t", causing sshd to crash on restart.', correctWay: 'Run "sudo semanage port -a -t ssh_port_t -p tcp <new_port>" on SELinux systems.' }
      ],
      safeRecovery: 'Keep your current session open while testing: "ssh -p 2222 user@localhost" to verify the new port works before logging out.'
    }),

    buildLinuxConcept({
      id: 'c-16-12',
      subChapterNumber: '16.12',
      command: 'sudo grep "^AllowUsers" /etc/ssh/sshd_config 2>/dev/null || echo "All users allowed"',
      title: 'Restricting Users',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Whitelisting access: AllowUsers, AllowGroups, and denying daemon service accounts',
      badges: ['Access Control', 'AllowUsers', 'Security'],
      difficulty: 'Intermediate',
      quote: 'Principle of Least Privilege: only named administrative users and groups should ever be allowed through the SSH gate.',
      whatIsIt: 'By default, any user account that exists on a Linux system (in /etc/passwd) with a valid shell can attempt an SSH login. Restricting access using "AllowUsers" or "AllowGroups" in /etc/ssh/sshd_config establishes an explicit whitelist: only accounts matching the directive are permitted to authenticate; all other users are rejected immediately before credential verification. You can also restrict by source IP, such as "AllowUsers deploy@192.168.1.*".',
      inSimpleWords: 'A guest list at the door. Even if an account exists on the computer (like the "ftp" or "www-data" service accounts), only the people whose names are on the guest list are allowed to log in via SSH.',
      whyDoYouNeedIt: 'Linux creates dozens of system service accounts (games, daemon, bin, sync, www-data). Explicitly restricting SSH access ensures that even if an attacker compromises a service account, they cannot log in over SSH.',
      realWorldScenario: 'You manage a corporate server with 50 local system accounts, but only 2 human SREs need SSH access. You add "AllowGroups ssh-admins" to sshd_config. Only members of that specific group can connect.',
      realWorldAnalogy: 'A secure office building where janitors have keys to utility closets, but only executives with special badges can open the front entrance after hours.',
      withoutVsWith: {
        without: {
          title: 'Unrestricted User SSH Access',
          items: ['Any service account or forgotten test user can be targeted for remote login', 'No centralized group-based access governance', 'Unable to restrict specific users to specific corporate office IP addresses'],
          outcome: 'Expanded attack surface and potential unauthorized account access.'
        },
        with: {
          title: 'Restricted Access Whitelist',
          items: ['Explicit group-based access control (AllowGroups ssh-users)', 'Service and daemon accounts permanently locked out from remote SSH access', 'CIDR-based location restrictions (AllowUsers alice@10.0.0.0/8)'],
          outcome: 'Strict Principle of Least Privilege and hardened access control.'
        }
      },
      blockDiagram: {
        title: 'SSH User Whitelist Evaluation',
        subtitle: 'Evaluation order of OpenSSH access directives:',
        nodes: [
          { id: 'deny_u', label: '1. DenyUsers', simpleDef: 'Check user blacklist', techDef: 'If username matches DenyUsers -> REJECT', badge: 'Blacklist', color: '#ef4444' },
          { id: 'allow_u', label: '2. AllowUsers', simpleDef: 'Check user whitelist', techDef: 'If AllowUsers configured and user NOT matched -> REJECT', badge: 'Whitelist', color: '#10b981' },
          { id: 'deny_g', label: '3. DenyGroups', simpleDef: 'Check group blacklist', techDef: 'If user group matches DenyGroups -> REJECT', badge: 'Blacklist', color: '#ef4444' },
          { id: 'allow_g', label: '4. AllowGroups', simpleDef: 'Check group whitelist', techDef: 'If AllowGroups configured and user NOT in group -> REJECT', badge: 'Whitelist', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'AllowUsers', simple: 'A setting that specifies exactly which usernames are allowed to log in via SSH.', technical: 'sshd_config pattern list specifying usernames and optional host patterns allowed access.' },
        { term: 'AllowGroups', simple: 'A setting that allows any user belonging to a specific Linux group to log in.', technical: 'Directs sshd to check primary and supplementary group memberships for authorization.' }
      ],
      syntaxCode: 'sudo grep "^AllowUsers" /etc/ssh/sshd_config 2>/dev/null || echo "All users allowed"',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with administrative root privileges' },
        { token: 'grep "^AllowUsers"', role: 'command', explanation: 'Search for active AllowUsers whitelist in sshd_config' },
        { token: '|| echo "All users allowed"', role: 'operator', explanation: 'Fallback message indicating no user whitelist is active' }
      ],
      variations: [
        { command: 'sudo grep -E "^(AllowUsers|AllowGroups)" /etc/ssh/sshd_config', description: 'Inspect active user and group whitelists' },
        { command: 'echo "AllowGroups ssh-users" | sudo tee -a /etc/ssh/sshd_config', description: 'Restrict SSH access strictly to members of the "ssh-users" group' }
      ],
      expectedOutput: 'All users allowed',
      commonMistakes: [
        { mistake: 'Adding "AllowUsers alice" and forgetting to include your own username', whyWrong: 'AllowUsers is an exclusive whitelist; the moment you add one user, all unlisted users (including yourself) are locked out!', correctWay: 'Always include your current active username in the AllowUsers list.' },
        { mistake: 'Misspelling a username in AllowUsers and locking the admin out', whyWrong: 'OpenSSH matches names strictly; a typo means nobody can log in.', correctWay: 'Test with "sudo sshd -t" and verify user account exists in /etc/passwd first.' }
      ],
      safeRecovery: 'If you get locked out by an AllowUsers typo, log in via cloud web console, edit /etc/ssh/sshd_config, and restart sshd.'
    }),

    buildLinuxConcept({
      id: 'c-16-13',
      subChapterNumber: '16.13',
      command: 'scp -P 22 file.tar.gz user@remote:/tmp/',
      title: 'scp',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Secure Copy Protocol: copying files securely over SSH encrypted tunnels',
      badges: ['scp', 'Transfer', 'Files'],
      difficulty: 'Beginner',
      quote: 'scp is the classic remote copy: copy files between servers with the familiarity of cp and the security of SSH.',
      whatIsIt: '"scp" (Secure Copy) is a traditional command-line utility used to securely transfer files and directories between hosts over an encrypted SSH connection. Syntax mirrors the classic "cp" command: "scp source destination", where remote locations are prefixed with "user@host:path". Modern OpenSSH (version 9.0+) uses the SFTP protocol under the hood for scp operations rather than the legacy, vulnerable scp/rcp protocol, ensuring safer filename handling and path sanitization.',
      inSimpleWords: 'A copy command that works over the internet. You use it to copy a file from your laptop directly into a folder on your remote cloud server, encrypted and safe.',
      whyDoYouNeedIt: 'Transferring tarballs, configuration files, SSL certificates, or database dumps to and from remote Linux servers is a daily administrative task.',
      realWorldScenario: 'You generated a new SSL certificate bundle on your local workstation and need to push it to a remote Nginx server. You run "scp cert.pem user@web.prod:/etc/nginx/ssl/" to deliver it in 2 seconds.',
      realWorldAnalogy: 'Sending a file by secure courier in a locked briefcase directly to an office across the country.',
      withoutVsWith: {
        without: {
          title: 'Using Insecure FTP or USB Sticks',
          items: ['Passwords and file contents transmitted in cleartext over FTP', 'Manual uploading through web portals with file size limits', 'No command-line scriptability for automated file delivery'],
          outcome: 'Data exposure, slow transfers, and broken automation.'
        },
        with: {
          title: 'Transferring with scp',
          items: ['End-to-end SSH encryption protecting sensitive files and tokens', 'Recursive directory copying with "-r" flag', 'Full preservation of file modification times and permissions with "-p"'],
          outcome: 'Secure, fast, and scriptable remote file transfers.'
        }
      },
      blockDiagram: {
        title: 'scp Syntax Anatomy',
        subtitle: 'Key components of the scp command:',
        nodes: [
          { id: 'scp', label: 'scp', simpleDef: 'Secure Copy Tool', techDef: 'OpenSSH copy utility (executes SFTP subsystem in modern versions)', badge: 'Command', color: '#38bdf8' },
          { id: 'port', label: '-P 22 (Uppercase!)', simpleDef: 'Port specification', techDef: 'Note: uppercase -P (unlike lowercase -p in ssh)', badge: 'Port Flag', color: '#ef4444' },
          { id: 'src', label: 'file.tar.gz', simpleDef: 'Source file on laptop', techDef: 'Local or remote source path', badge: 'Source', color: '#10b981' },
          { id: 'dest', label: 'user@remote:/tmp/', simpleDef: 'Destination path', techDef: 'Remote host user, IP, and target directory', badge: 'Destination', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'scp', simple: 'Secure Copy: copies files between computers over an encrypted SSH connection.', technical: 'Utility transferring files using SSH data stream and SFTP protocol.' },
        { term: 'scp -r', simple: 'Recursive mode: copies an entire folder and all files inside it.', technical: 'Recursively traverses directory tree and transfers all files and subdirectories.' }
      ],
      syntaxCode: 'scp -P 22 file.tar.gz user@remote:/tmp/',
      syntaxTokens: [
        { token: 'scp', role: 'command', explanation: 'Secure copy utility' },
        { token: '-P 22', role: 'option', explanation: 'Specify remote port (NOTE: uppercase P for scp)' },
        { token: 'file.tar.gz', role: 'path', explanation: 'Local source file to upload' },
        { token: 'user@remote:/tmp/', role: 'path', explanation: 'Remote destination host and directory path' }
      ],
      variations: [
        { command: 'scp file.txt user@remote:/home/user/', description: 'Upload local file to remote home directory' },
        { command: 'scp user@remote:/var/log/syslog ./syslog.log', description: 'Download remote file to local current directory' },
        { command: 'scp -r ./my_folder user@remote:/var/www/', description: 'Recursively upload an entire directory' },
        { command: 'scp -P 2222 file.txt user@remote:/tmp/', description: 'Transfer file over non-standard port 2222' }
      ],
      expectedOutput: 'file.tar.gz                     100%   45MB  15.2MB/s   00:03',
      commonMistakes: [
        { mistake: 'Typing lowercase "-p" for the port in scp (e.g. scp -p 2222 file user@host:)', whyWrong: 'In scp, lowercase "-p" means "preserve timestamps and permissions"; uppercase "-P" specifies the port!', correctWay: 'Use uppercase "-P" when specifying a port with scp.' },
        { mistake: 'Using scp for massive gigabyte syncs instead of rsync', whyWrong: 'If an scp transfer interrupts at 99%, it cannot resume and must restart from 0%; rsync can resume instantly.', correctWay: 'Use rsync for large file transfers and directory synchronization.' }
      ],
      safeRecovery: 'If scp stalls on large files, cancel with Ctrl+C and switch to "rsync -P" for resumable transfer.'
    }),

    buildLinuxConcept({
      id: 'c-16-14',
      subChapterNumber: '16.14',
      command: 'sftp user@remote',
      title: 'sftp',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'Secure File Transfer Protocol: interactive remote filesystem navigation, uploading, and downloading',
      badges: ['sftp', 'FTP', 'Interactive'],
      difficulty: 'Beginner',
      quote: 'sftp is the interactive remote file browser: explore directories, rename files, and transfer data over SSH.',
      whatIsIt: '"sftp" (SSH File Transfer Protocol) provides an interactive, FTP-like shell environment over an encrypted SSH connection. Unlike scp (which executes a one-shot copy and exits), sftp opens an interactive session allowing operators to navigate remote directories (cd, ls, pwd), manage local files (lcd, lls, lpwd), upload files (put), and download files (get). It also powers graphical FTP clients like FileZilla and Cyberduck securely over port 22.',
      inSimpleWords: 'An interactive file manager inside your terminal. You can browse remote folders, look around, upload files with "put", and download files with "get", all securely encrypted.',
      whyDoYouNeedIt: 'When you need to explore a remote directory to find a file before downloading it, sftp provides an interactive prompt without spawning a full interactive bash shell.',
      realWorldScenario: 'You are downloading log archives from an appliance that does not allow interactive shell access. The vendor enabled the SFTP subsystem only; you connect with "sftp audit@appliance" to browse and download logs safely.',
      realWorldAnalogy: 'A virtual FTP client like FileZilla running directly in your terminal.',
      withoutVsWith: {
        without: {
          title: 'Using Legacy Insecure FTP',
          items: ['FTP credentials and data transferred completely unencrypted', 'Firewall connection issues with FTP active/passive port negotiation', 'Separate server daemons (vsftpd) requiring configuration and maintenance'],
          outcome: 'Security vulnerabilities and complex firewall configurations.'
        },
        with: {
          title: 'Operating Over sftp',
          items: ['Uses the existing OpenSSH port 22 daemon with zero extra services required', 'Interactive commands for both local (lls, lpwd) and remote (ls, pwd) systems', 'Safe chroot jail support locking users to specific directories'],
          outcome: 'Encrypted, unified, and firewall-friendly file management.'
        }
      },
      blockDiagram: {
        title: 'sftp Local vs Remote Commands',
        subtitle: 'The "l" prefix executes commands on your local machine:',
        nodes: [
          { id: 'rem', label: 'Remote Commands (ls, cd, pwd)', simpleDef: 'Operates on remote server', techDef: 'Queries remote SFTP subsystem on server', badge: 'Remote', color: '#38bdf8' },
          { id: 'loc', label: 'Local Commands (lls, lcd, lpwd)', simpleDef: 'Operates on your laptop', techDef: 'Prefixed with "l": inspects local working directory', badge: 'Local', color: '#10b981' },
          { id: 'xfer', label: 'put / get', simpleDef: 'Upload / Download', techDef: 'put pushes local file to remote; get pulls remote file to local', badge: 'Transfer', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'sftp', simple: 'Secure File Transfer Protocol: interactive file browsing and transfer over SSH.', technical: 'Binary protocol (RFC draft) providing remote file access, transfer, and management.' },
        { term: 'ChrootDirectory', simple: 'A jail setting in sshd that locks an SFTP user into their home directory so they cannot see other files.', technical: 'Directs sshd to call chroot() to isolate SFTP users inside a specific filesystem tree.' }
      ],
      syntaxCode: 'sftp user@remote',
      syntaxTokens: [
        { token: 'sftp', role: 'command', explanation: 'OpenSSH secure file transfer program' },
        { token: 'user@remote', role: 'argument', explanation: 'Target user account and remote host destination' }
      ],
      variations: [
        { command: 'sftp user@remote', description: 'Open interactive SFTP shell session to remote host' },
        { command: 'sftp -P 2222 user@remote', description: 'Connect over non-standard port 2222' },
        { command: 'sftp -b batchfile.txt user@remote', description: 'Execute a batch list of SFTP commands non-interactively' }
      ],
      expectedOutput: 'Connected to remote.\nsftp> pwd\nRemote working directory: /home/user\nsftp> ls\nbackup.sql  data.csv  logs/\nsftp> ',
      commonMistakes: [
        { mistake: 'Confusing sftp with FTPS (FTP over SSL)', whyWrong: 'sftp runs over SSH port 22; FTPS is legacy FTP wrapped in TLS on ports 21/990.', correctWay: 'Use sftp on port 22 for native Linux SSH infrastructure.' },
        { mistake: 'Trying to run bash shell commands like "grep" inside the sftp prompt', whyWrong: 'sftp is a file transfer subsystem, not a full bash shell; it only supports file commands like ls, get, put.', correctWay: 'Use ssh to run shell commands, or use "get" to download files locally first.' }
      ],
      safeRecovery: 'To exit the sftp prompt at any time, type "bye", "exit", or "quit".'
    }),

    buildLinuxConcept({
      id: 'c-16-15',
      subChapterNumber: '16.15',
      command: 'rsync -avz -e "ssh -p 22" ./data/ user@remote:/backup/data/',
      title: 'rsync over SSH',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      subtitle: 'The delta-transfer algorithm: high-speed, bandwidth-efficient incremental directory synchronization',
      badges: ['rsync', 'Backup', 'Sync'],
      difficulty: 'Intermediate',
      quote: 'rsync only transfers the differences: if a 10GB file changes by 1 kilobyte, rsync transmits only that 1 kilobyte.',
      whatIsIt: '"rsync" (Remote Sync) is a fast, versatile tool for copying and synchronizing files remotely or locally. Its defining feature is the rolling-checksum Delta-Transfer Algorithm: rsync breaks files into chunks, compares checksums between source and destination, and transfers ONLY the bytes that have changed. Running rsync over SSH ("-e ssh") combines rsync\'s delta efficiency with SSH\'s end-to-end encryption. The canonical flag combination is "-avz" (Archive, Verbose, Compress).',
      inSimpleWords: 'The smartest copy tool in Linux. If you copy a giant 10GB movie folder and it gets interrupted halfway through, rsync picks up right where it stopped without starting over. If you change one sentence in a document, it only sends that one sentence.',
      whyDoYouNeedIt: 'Production backups, website deployments, and disaster recovery replication rely on rsync over SSH. Transferring 500GB of database backups every night is only possible because rsync only transfers the daily delta.',
      realWorldScenario: 'You are deploying a website with 10,000 images and HTML files. You run "rsync -avz --delete ./dist/ user@prod:/var/www/html/". It syncs the 5 files you edited in 0.8 seconds and leaves the other 9,995 unchanged files untouched.',
      realWorldAnalogy: 'Updating an encyclopedia: instead of printing and mailing all 20 volumes every year, the publisher mails a 2-page list of errata to paste into the existing books.',
      withoutVsWith: {
        without: {
          title: 'Copying with scp or cp',
          items: ['Re-transmits every gigabyte from scratch on every run, wasting hours of bandwidth', 'Interrupted transfers must restart from 0% with no resume capability', 'Deleted source files remain orphaned on destination without sync mirroring'],
          outcome: 'Wasted bandwidth, slow deployments, and cluttered backup storage.'
        },
        with: {
          title: 'Synchronizing with rsync over SSH',
          items: ['Delta-transfer algorithm transmitting only modified bytes within files', 'Resumable transfers with "-P" (--partial --progress)', 'Exact mirroring with "--delete" pruning stale remote files'],
          outcome: 'Sub-second deployments, minimal bandwidth consumption, and exact mirrors.'
        }
      },
      blockDiagram: {
        title: 'rsync Delta Transfer Algorithm',
        subtitle: 'How rsync avoids transferring identical data:',
        nodes: [
          { id: 'src', label: 'Local Source File (10GB)', simpleDef: 'File with 1KB edit', techDef: 'Calculates MD5/Adler-32 block checksums', badge: 'Source', color: '#38bdf8' },
          { id: 'delta', label: 'Delta Engine over SSH', simpleDef: 'Compares checksums', techDef: 'Transmits only the mismatched 1KB delta block over encrypted SSH tunnel', badge: 'Delta', color: '#10b981' },
          { id: 'dst', label: 'Remote Dest File (10GB)', simpleDef: 'Reconstructs file', techDef: 'Reassembles final file combining unchanged blocks with new delta', badge: 'Destination', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'rsync -a (Archive)', simple: 'Preserves permissions, owners, timestamps, symlinks, and directory structure.', technical: 'Meta-flag equivalent to -rlptgoD (recursive, links, perms, times, group, owner, devices).' },
        { term: 'Trailing Slash (/ on source)', simple: 'CRITICAL: "data/" copies contents inside; "data" copies the folder itself.', technical: 'Trailing slash on source dictates whether destination receives child items or enclosing directory.' }
      ],
      syntaxCode: 'rsync -avz -e "ssh -p 22" ./data/ user@remote:/backup/data/',
      syntaxTokens: [
        { token: 'rsync', role: 'command', explanation: 'Remote file and directory synchronization utility' },
        { token: '-avz', role: 'option', explanation: 'Archive mode (-a), Verbose output (-v), Compress data during transfer (-z)' },
        { token: '-e "ssh -p 22"', role: 'option', explanation: 'Specify SSH as remote shell transport on port 22' },
        { token: './data/', role: 'path', explanation: 'Source directory with trailing slash (copies contents inside data/)' },
        { token: 'user@remote:/backup/data/', role: 'path', explanation: 'Remote target destination directory' }
      ],
      variations: [
        { command: 'rsync -avz ./data/ user@remote:/backup/data/', description: 'Standard archive sync over SSH' },
        { command: 'rsync -avzP ./bigfile.iso user@remote:/tmp/', description: 'Transfer with live progress bar and partial resume support' },
        { command: 'rsync -avz --delete ./website/ user@remote:/var/www/', description: 'Mirror directory: delete remote files that no longer exist locally' },
        { command: 'rsync -avzn ./data/ user@remote:/data/', description: 'Dry run (-n): simulate sync without touching any files on disk' }
      ],
      expectedOutput: 'sending incremental file list\n./\napp.js\nstyles.css\n\nsent 1,240 bytes  received 48 bytes  858.67 bytes/sec\ntotal size is 45,210  speedup is 35.10',
      commonMistakes: [
        { mistake: 'Omitting or adding a trailing slash on the source directory by mistake', whyWrong: '"rsync -a ./data /dest" creates /dest/data; "rsync -a ./data/ /dest" copies files directly into /dest.', correctWay: 'Remember: trailing slash means "copy the contents of this folder".' },
        { mistake: 'Running "--delete" without doing a dry run (-n) first', whyWrong: 'If your source path is wrong, "--delete" will wipe out all existing remote files!', correctWay: 'Always test with "rsync -avzn --delete ..." first to preview what would be deleted.' }
      ],
      safeRecovery: 'Always simulate destructive syncs first using the dry-run flag: "rsync -avzn --delete ...".'
    }),

    buildLinuxConcept({
      id: 'c-16-16',
      subChapterNumber: '16.16',
      command: 'ssh -L 8080:localhost:80 user@remote-jump',
      title: 'SSH Port Forwarding / Tunneling',
      subtitle: 'Encrypted traffic tunneling: Local forwarding (-L), Remote forwarding (-R), and Dynamic SOCKS5 proxy (-D)',
      topicId: 'ch-16',
      topicNumber: '16',
      topicTitle: 'SSH and Remote Access',
      badges: ['Tunneling', 'Forwarding', 'SOCKS5'],
      difficulty: 'Intermediate',
      quote: 'SSH tunneling is the poor man\'s VPN: forward any local TCP port through an encrypted tunnel directly into a private remote network.',
      whatIsIt: 'SSH Port Forwarding multiplexes arbitrary TCP connections through an encrypted SSH tunnel. Three types exist: 1) Local Port Forwarding (-L [local_port]:host:[remote_port]): forwards a port on your local laptop to an internal host reachable by the remote server; 2) Remote Port Forwarding (-R [remote_port]:host:[local_port]): exposes a port on your local laptop to the remote server; and 3) Dynamic Port Forwarding (-D [port]): creates a local SOCKS5 proxy that routes application traffic through the remote host dynamically.',
      inSimpleWords: 'Building a private secret pipe. If a database is locked inside a private cloud network, SSH tunneling lets you connect your local laptop tools directly to that database as if it were running on your own computer.',
      whyDoYouNeedIt: 'Production databases (PostgreSQL, Redis) should NEVER be exposed to the public internet. SSH tunneling allows an SRE to securely connect a local GUI tool (DBeaver, RedisInsight) to a private database through a bastion host.',
      realWorldScenario: 'An AWS RDS database (10.0.1.50:5432) has no public IP. You run "ssh -L 5432:10.0.1.50:5432 user@bastion.company.com". You point your local DBeaver database tool to "localhost:5432", and all queries flow securely through the bastion tunnel.',
      realWorldAnalogy: 'Laying an encrypted garden hose through a closed security fence to pump water directly to your garden.',
      withoutVsWith: {
        without: {
          title: 'Exposing Internal Ports to Public Internet',
          items: ['Opening database ports (3306, 5432) to the public internet, inviting automated attacks', 'Complex full-tunnel corporate VPN clients that break local routing and slow internet', 'Inability to test local development webhooks from public API providers'],
          outcome: 'Severe security exposure and clumsy VPN management.'
        },
        with: {
          title: 'Using Targeted SSH Tunnels',
          items: ['Databases remain 100% private with zero public IP exposure', 'Instant point-to-point encrypted tunnels with a single command (-L)', 'Dynamic SOCKS5 browsing (-D 1080) for testing internal cloud web portals'],
          outcome: 'Zero public attack surface, targeted access, and instant encrypted routing.'
        }
      },
      blockDiagram: {
        title: 'Local Port Forwarding (-L)',
        subtitle: 'Mapping localhost:8080 to remote private server:80:',
        nodes: [
          { id: 'app', label: 'Local App / Browser', simpleDef: 'Connects to localhost:8080', techDef: 'Local process connects to 127.0.0.1:8080', badge: 'Local Client', color: '#38bdf8' },
          { id: 'ssh', label: 'Local SSH Client (-L)', simpleDef: 'Encrypts into tunnel', techDef: 'Intercepts port 8080 and transmits frames over SSH TCP session', badge: 'Tunnel', color: '#10b981' },
          { id: 'sshd', label: 'Remote Bastion (sshd)', simpleDef: 'Decrypts & forwards', techDef: 'Remote sshd opens TCP socket to internal destination 10.0.1.20:80', badge: 'Bastion', color: '#a855f7' },
          { id: 'target', label: 'Internal Web / DB', simpleDef: 'Private destination', techDef: 'Private service receives connection from bastion IP', badge: 'Target', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Local Forwarding (-L)', simple: 'Binds a port on your laptop and forwards traffic to a remote server destination.', technical: 'Listens on local port; forwards connection data over SSH channel to remote target host:port.' },
        { term: 'Dynamic Forwarding (-D)', simple: 'Turns SSH into a full SOCKS5 web proxy so your browser surfs through the server.', technical: 'Allocates local port acting as SOCKS4/SOCKS5 proxy server routing arbitrary application traffic.' }
      ],
      syntaxCode: 'ssh -L 8080:localhost:80 user@remote-jump',
      syntaxTokens: [
        { token: 'ssh', role: 'command', explanation: 'OpenSSH client program' },
        { token: '-L 8080:localhost:80', role: 'option', explanation: 'Local port forwarding syntax: [local_bind_port]:[target_host]:[target_port]' },
        { token: 'user@remote-jump', role: 'argument', explanation: 'Intermediate SSH server acting as tunnel endpoint' }
      ],
      variations: [
        { command: 'ssh -N -L 5432:10.0.1.50:5432 user@bastion', description: 'Forward local port 5432 to private DB; -N specifies no remote shell needed' },
        { command: 'ssh -N -D 1080 user@bastion', description: 'Create local SOCKS5 proxy on port 1080 to route browser traffic through remote host' },
        { command: 'ssh -N -R 8000:localhost:3000 user@remote-vps', description: 'Remote forwarding: expose local dev server on port 3000 to public remote port 8000' }
      ],
      expectedOutput: '(ssh -N runs silently maintaining the tunnel in the foreground; terminate with Ctrl+C)',
      commonMistakes: [
        { mistake: 'Forgetting "-N" when running tunnels and accidentally executing an unneeded shell', whyWrong: 'Without "-N", ssh allocates a shell prompt; if you exit the shell, the tunnel dies immediately.', correctWay: 'Use "ssh -N -L ..." when you only want a background/dedicated tunnel.' },
        { mistake: 'Trying to bind to a local port below 1024 without root privileges', whyWrong: 'Ports 1 to 1023 are privileged system ports; non-root users cannot bind to them (e.g. -L 80:dest:80 fails).', correctWay: 'Use high local ports (e.g. -L 8080:dest:80).' }
      ],
      safeRecovery: 'To stop a port-forwarding tunnel running in the background, find its PID with "pgrep -f \'ssh -L\'" and kill it with "kill <pid>".'
    })
  ]
};
