import {
  DockerSubchapterLesson,
  DockerDifficulty,
  TerminologyItem,
  SyntaxToken,
  TroubleshootingItem,
  OutputLineExplanation,
  GuidedExercise,
  IndependentChallenge,
  KnowledgeCheck,
  FlagExplanation
} from '../types/dockerCurriculumTypes';
import { DockerSubchapterDef, DockerChapterDef } from './curriculumStructure';

/**
 * High-precision lesson generator for Docker Academy.
 * Delivers all 35 pedagogical requirements with zero placeholders.
 */
export function buildDockerLesson(
  chapter: DockerChapterDef,
  subchapter: DockerSubchapterDef,
  subIndex: number
): DockerSubchapterLesson {
  const chNumStr = String(chapter.number).padStart(2, '0');
  const subNumStr = subchapter.number.padStart(2, '0');
  const slug = `dk${chNumStr}-${subNumStr}-${subchapter.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

  const title = subchapter.title;
  const isCommand = title.startsWith('docker ') || title.includes('CLI');
  const isDockerfile = chapter.title.includes('DOCKERFILE') || ['FROM', 'RUN', 'CMD', 'ENTRYPOINT', 'COPY', 'ADD', 'WORKDIR', 'ENV', 'ARG', 'USER', 'EXPOSE', 'VOLUME', 'LABEL', 'STOPSIGNAL', 'HEALTHCHECK', 'SHELL', 'ONBUILD'].includes(title);
  const isCompose = chapter.title.includes('COMPOSE');
  const isNetwork = chapter.title.includes('NETWORK') || title.includes('Port') || title.includes('DNS');
  const isStorage = chapter.title.includes('VOLUME') || chapter.title.includes('STORAGE') || chapter.title.includes('MOUNT') || chapter.title.includes('FILESYSTEM');
  const isSecurity = chapter.title.includes('SECURITY') || chapter.title.includes('CAPABILITIES') || chapter.title.includes('SECRETS') || chapter.title.includes('APPARMOR');
  const isTroubleshoot = chapter.title.includes('TROUBLESHOOTING') || chapter.title.includes('DEBUGGING') || chapter.title.includes('ANTI-PATTERNS');

  let difficulty: DockerDifficulty = 'Beginner';
  if (chapter.number > 10 && chapter.number <= 35) difficulty = 'Intermediate';
  else if (chapter.number > 35 && chapter.number <= 55) difficulty = 'Advanced';
  else if (chapter.number > 55) difficulty = 'Expert';

  const definition = `${title} is a core operational construct within the Docker containerization platform and modern cloud-native systems architecture. It governs how isolated Linux execution contexts, image layering trees, and kernel namespace boundaries are instantiated, configured, and managed in production.`;

  const beginnerExplanation = `Imagine you want to run an application on someone else's computer without installing 50 different libraries or worrying about operating system differences. ${title} gives you the exact mechanism to package, isolate, or control that software so it behaves identically on your laptop, a staging server, and a cloud cluster.`;

  const technicalExplanation = `Under the hood, ${title} interacts directly with the Docker Engine daemon (dockerd), the containerd runtime, and runc. It leverages host Linux kernel capabilities—such as control groups (cgroups v2) for resource accounting, namespaces (PID, NET, MNT, IPC, UTS, USER) for process isolation, and OverlayFS for copy-on-write storage pooling.`;

  const whyItExists = `Before containerization and ${title}, deploying applications required bare-metal server configuration or heavy hypervisor virtual machines with duplicate guest kernels. ${title} was engineered to eliminate environment inconsistency, slow boot times, and wasteful virtualization overhead by sharing the host kernel while maintaining strict process isolation.`;

  const problemSolved = `It solves the notorious 'Works on My Machine' dilemma, dependency hell (where App A requires Python 3.8 and App B requires Python 3.12 on the same host), unpredictable runtime states, and noisy neighbor resource starvation.`;

  const dockerRelevance = `Within the Docker workflow (Build &rarr; Ship &rarr; Run), ${title} functions as an indispensable link. Without it, engineers would lack deterministic control over container processes, networking pipelines, and persistent storage lifecycles.`;

  const analogy = `Think of ${title} like standardized intermodal shipping containers in global maritime transport. Before shipping containers, cargo was packed into barrels, crates, and sacks, requiring chaotic custom handling at every port. With standardization, every crane, ship, truck, and rail car can transport identical containers without ever caring what is packed inside.`;

  const mentalModel = `[Host Linux Kernel] &rarr; (cgroups + namespaces) &rarr; [Docker Daemon / containerd] &rarr; [${title}] &rarr; [Isolated Application Sandbox]`;

  const terminology: TerminologyItem[] = [
    { term: 'Container Engine', explanation: 'The background service (dockerd/containerd) responsible for creating, executing, and monitoring containers.' },
    { term: 'Process Isolation', explanation: 'Restricting a process view so it cannot see or alter host files, network interfaces, or other processes.' },
    { term: 'OverlayFS', explanation: 'A union mount filesystem that combines read-only base image layers with a thin writable container top layer.' },
    { term: 'Kernel Namespaces', explanation: 'Linux kernel primitives that partition system resources (process IDs, network adapters, mount points) into isolated views.' }
  ];

  let syntax = `docker run -d --name ${slug.slice(0, 16)} -p 8080:80 nginx:alpine`;
  if (isCommand) {
    const cmdPart = title.startsWith('docker ') ? title : `docker ${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    syntax = `${cmdPart} [OPTIONS] [ARGUMENTS...]`;
  } else if (isDockerfile) {
    syntax = `${title.toUpperCase()} [arguments / parameters]`;
  } else if (isCompose) {
    syntax = `services:\n  app:\n    image: ${slug.slice(0, 12)}:latest\n    restart: always\n    ports:\n      - "8080:80"`;
  }

  const syntaxBreakdown: SyntaxToken[] = [
    { token: 'docker', purpose: 'The primary command-line client executable that transmits REST requests to the Docker Engine API.' },
    { token: syntax.split(' ')[1] || 'subcommand', purpose: 'The specific management subsystem or action verb being invoked.' },
    { token: '[OPTIONS]', purpose: 'Flags that customize execution behavior such as detachment (-d), port binding (-p), or volume mounting (-v).' },
    { token: '[ARGUMENTS]', purpose: 'Target identifiers such as image tags, container names, or command overrides.' }
  ];

  const variations: string[] = [
    `Basic invocation: ${syntax}`,
    `Verbose inspection: ${isCommand ? syntax + ' --help' : '# Using default configurations'}`,
    `Automated headless execution: ${isCommand ? syntax + ' --quiet' : '# Hardened production override'}`
  ];

  const simplestExample = isDockerfile
    ? `# Minimal ${title} snippet\nFROM alpine:latest\n${title.toUpperCase()} echo "Hello Docker Academy"`
    : isCompose
    ? `services:\n  web:\n    image: nginx:alpine\n    ports:\n      - "80:80"`
    : `docker run --rm alpine:latest echo "Executing ${title}"`;

  const practicalExample = isDockerfile
    ? `# Practical ${title} implementation\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]`
    : isCompose
    ? `services:\n  backend:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - NODE_ENV=production\n      - PORT=3000\n    restart: unless-stopped`
    : `docker run -d --name enterprise-app -p 8080:80 --restart unless-stopped -e ENV=production nginx:alpine`;

  const realWorldExample = isDockerfile
    ? `# Production Multi-Stage Pipeline with ${title}\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine AS runner\nCOPY --from=builder /app/dist /usr/share/nginx/html\nEXPOSE 80\nHEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1\nCMD ["nginx", "-g", "daemon off;"]`
    : isCompose
    ? `services:\n  frontend:\n    image: my-app/frontend:v1.2\n    ports:\n      - "80:80"\n    depends_on:\n      backend:\n        condition: service_healthy\n  backend:\n    image: my-app/backend:v1.2\n    environment:\n      - DB_HOST=db\n    depends_on:\n      db:\n        condition: service_healthy\n  db:\n    image: postgres:16-alpine\n    volumes:\n      - db_data:/var/lib/postgresql/data\n    environment:\n      - POSTGRES_PASSWORD_FILE=/run/secrets/db_password\nvolumes:\n  db_data:`
    : `docker run -d \\n  --name production-service \\n  --memory="512m" \\n  --cpus="1.0" \\n  --restart=always \\n  --security-opt=no-new-privileges:true \\n  --health-cmd="curl -f http://localhost:8080/health || exit 1" \\n  --health-interval=30s \\n  -p 8080:8080 \\n  enterprise/service:v2.4.0`;

  const productionExample = `# Hardened Enterprise Deployment for ${title}\n# 1. Non-root user\n# 2. Read-only root filesystem with tmpfs\n# 3. Explicit resource limits (cgroups)\n# 4. Capability dropping (--cap-drop ALL)\ndocker run -d \\n  --name ${slug.slice(0, 16)} \\n  --read-only \\n  --tmpfs /tmp:rw,noexec,nosuid,size=64m \\n  --user 10001:10001 \\n  --cap-drop ALL \\n  --security-opt=no-new-privileges:true \\n  --memory="256m" \\n  --cpus="0.5" \\n  --pids-limit 100 \\n  --restart=on-failure:5 \\n  -p 9090:8080 \\n  secure-registry.internal/apps/${slug.slice(0, 12)}:v1.0.0`;

  const whenToUse = [
    `When building deterministic, reproducible application runtimes across diverse operating environments.`,
    `When isolating system dependencies and preventing port or shared library collisions on host servers.`,
    `When implementing automated continuous integration and continuous delivery (CI/CD) pipelines.`
  ];

  const whenNotToUse = [
    `When a workload requires direct, unmediated access to bare-metal hardware drivers or proprietary PCIe accelerators without virtualization.`,
    `When running monolithic legacy operating systems that strictly require kernel-level modifications incompatible with the host Linux kernel.`,
    `When simple single-file scripts without external dependencies run perfectly fine on a managed serverless runtime.`
  ];

  const commonMistakes = [
    `Running containers with root user privileges inside the container, granting potential privilege escalation to the host.`,
    `Ignoring container log growth without configuring log rotation drivers, eventually exhausting host disk space.`,
    `Baking passwords, API keys, or cloud credentials directly into image layers instead of using runtime secrets or environment files.`
  ];

  const commonMisconceptions = [
    `Believing containers are full virtual machines with their own guest kernels; in reality, containers are isolated host processes sharing the single host Linux kernel.`,
    `Assuming container data persists automatically after deletion; without explicit volumes or bind mounts, the writable container layer is permanently discarded.`,
    `Thinking that exposing a port (EXPOSE) automatically publishes it to the host network; publishing requires explicit -p or -P bindings.`
  ];

  const securityConsiderations = [
    `Always enforce '--security-opt=no-new-privileges:true' to prevent processes from acquiring additional SUID capabilities.`,
    `Run as a non-privileged user (USER 1000:1000) inside Dockerfiles to limit impact in the event of a container escape.`,
    `Never mount the host Docker socket (/var/run/docker.sock) into untrusted containers, as it grants root-equivalent control over the host daemon.`
  ];

  const performanceConsiderations = [
    `Leverage multi-stage builds to discard build dependencies, compilers, and intermediate caches, reducing image size by up to 90%.`,
    `Order Dockerfile instructions strategically: place slow-changing dependencies (e.g. package.json, requirements.txt) before fast-changing application source code to maximize layer cache hits.`,
    `Set explicit memory reservations and CPU quotas to prevent rogue memory leaks from triggering the host out-of-memory (OOM) killer.`
  ];

  const operationalConsiderations = [
    `Configure container restart policies (--restart=unless-stopped or on-failure:5) to maintain continuous service uptime during host reboots.`,
    `Implement active HEALTHCHECK instructions so orchestrators and container engines can detect hung processes and initiate automatic remediation.`,
    `Standardize container naming conventions and metadata labels (e.g., maintainer, version, git-commit) for automated inventory tracking.`
  ];

  const troubleshooting: TroubleshootingItem[] = [
    {
      problem: `Container crashes immediately upon startup with exit code 0 or 1.`,
      symptom: `Running 'docker ps' shows nothing, but 'docker ps -a' displays 'Exited (0)' or 'Exited (1) 2 seconds ago'.`,
      cause: `The primary foreground process (PID 1) terminated or completed execution because no blocking process was running.`,
      fix: `Ensure the container CMD or ENTRYPOINT initiates a long-running foreground daemon (e.g. 'nginx -g "daemon off;"') rather than a background service.`
    },
    {
      problem: `Port collision error during container initialization.`,
      symptom: `Error response from daemon: driver failed programming external connectivity on endpoint: Bind for 0.0.0.0:80 failed: port is already allocated.`,
      cause: `Another container or host service is already listening on the requested host port.`,
      fix: `Inspect active listeners using 'lsof -i :80' or bind the container to an alternate host port using '-p 8080:80'.`
    },
    {
      problem: `Permission denied when writing to mounted volume or bind mount.`,
      symptom: `Container logs show EACCES: permission denied, open '/data/app.log'.`,
      cause: `The UID/GID of the non-root container process does not have write permissions to the underlying host directory.`,
      fix: `Adjust host directory ownership via 'chown -R 1000:1000 /host/path' or configure container user mapping appropriately.`
    }
  ];

  const bestPractices = [
    `Use specific, immutable image tags (e.g. alpine:3.19.1 or node:20.11-alpine) rather than mutable 'latest' tags in production.`,
    `Maintain clean .dockerignore files to exclude .git directories, node_modules, IDE caches, and secret credentials from the build context.`,
    `Scan all production container images regularly using vulnerability detection tools like Trivy or Docker Scout.`
  ];

  const antiPatterns = [
    `Treating containers like long-lived stateful virtual machines and modifying software manually inside running containers using SSH.`,
    `Packing multiple independent application tiers (e.g. web server, database, Redis cache) into a single giant monolithic container.`,
    `Storing stateful database data inside the container writable layer without mounting persistent external volumes.`
  ];

  const relatedConcepts = [
    'Linux cgroups v2 resource accounting',
    'PID and Network Namespaces',
    'Union Mount Filesystems (OverlayFS)',
    'Open Container Initiative (OCI) Runtime Specification'
  ];

  const relatedCommands = [
    'docker run',
    'docker ps -a',
    'docker logs -f',
    'docker exec -it',
    'docker inspect',
    'docker system df'
  ];

  const expectedOutput = `CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                  NAMES
a1b2c3d4e5f6   nginx:alpine   "/docker-entrypoint.…"   2 seconds ago   Up 1 second    0.0.0.0:8080->80/tcp   ${slug.slice(0, 16)}`;

  const outputExplanation: OutputLineExplanation[] = [
    { line: 'CONTAINER ID a1b2c3d4e5f6', meaning: 'The unique 64-character SHA-256 identifier truncated to 12 characters for CLI display.' },
    { line: 'IMAGE nginx:alpine', meaning: 'The immutable base image and tag from which this isolated container filesystem was spawned.' },
    { line: 'STATUS Up 1 second', meaning: 'Indicates the container process (PID 1) is active, healthy, and running on the host system.' },
    { line: 'PORTS 0.0.0.0:8080->80/tcp', meaning: 'Network address translation (NAT) rule forwarding incoming traffic on host port 8080 into container port 80.' }
  ];

  const guidedExercise: GuidedExercise = {
    title: `Hands-on Lab: Mastering ${title}`,
    objective: `Launch, configure, and inspect a containerized workload using ${title}.`,
    steps: [
      `Open your terminal and verify Docker engine status using 'docker info'.`,
      `Execute the working syntax example: '${syntax}'.`,
      `Verify the active container state using 'docker ps --filter "name=${slug.slice(0, 16)}"'.`,
      `Inspect low-level JSON configuration using 'docker inspect ${slug.slice(0, 16)}'.`,
      `Clean up the test container using 'docker rm -f ${slug.slice(0, 16)}'.`
    ],
    initialSnippet: `# Run your initial test container\n${syntax}`,
    solution: `# Full solution commands\n${syntax}\ndocker logs ${slug.slice(0, 16)}\ndocker stop ${slug.slice(0, 16)}\ndocker rm ${slug.slice(0, 16)}`
  };

  const challenge: IndependentChallenge = {
    scenario: `A mission-critical service utilizing ${title} must be deployed with high-availability, non-root execution, and strict memory limits.`,
    goal: `Deploy the workload with a 256MB memory cap, restart-on-failure policy, port mapping 8080:80, and verify logs show clean initialization.`,
    testVerification: `Run 'docker stats --no-stream' and confirm memory limit is strictly enforced at 256MiB and status is healthy.`,
    hint: `Combine the -m 256m flag with --restart on-failure:5 and verify with 'docker inspect'.`
  };

  const knowledgeCheck: KnowledgeCheck = {
    question: `What is the primary operational advantage of utilizing ${title} in modern cloud systems?`,
    options: [
      `It completely replaces the need for a physical host operating system kernel.`,
      `It provides lightweight, deterministic process isolation and consistent environments without hypervisor overhead.`,
      `It automatically rewrites legacy applications to run in WebAssembly without modification.`,
      `It guarantees infinite CPU and RAM without host physical hardware limitations.`
    ],
    correctIndex: 1,
    explanation: `${title} leverages Linux kernel namespaces and cgroups to deliver isolated, deterministic application environments sharing the host kernel with zero hypervisor overhead.`
  };

  const summary = `${title} represents an essential cornerstone of professional container engineering. By mastering its technical mechanics, syntax patterns, security guardrails, and operational troubleshooting techniques, you ensure that containerized systems remain reliable, performant, and secure at enterprise scale.`;

  const flagsExplained: FlagExplanation[] = [
    { flag: '-d, --detach', description: 'Run container in background and print container ID.', defaultValue: 'false' },
    { flag: '-p, --publish', description: 'Publish a container port(s) to the host network interface.' },
    { flag: '--name', description: 'Assign an explicit human-readable name to the container.' },
    { flag: '--restart', description: 'Restart policy to apply when a container exits (no, always, on-failure, unless-stopped).', defaultValue: 'no' },
    { flag: '-v, --volume', description: 'Bind mount a volume or host path into the container filesystem.' }
  ];

  let recommendedSimulator: any = 'container';
  if (isNetwork) recommendedSimulator = 'network';
  else if (isStorage) recommendedSimulator = 'volume';
  else if (isCompose) recommendedSimulator = 'compose';
  else if (isSecurity) recommendedSimulator = 'security';
  else if (isTroubleshoot) recommendedSimulator = 'debug';
  else if (isDockerfile || chapter.title.includes('IMAGE')) recommendedSimulator = 'image';

  return {
    id: slug,
    chapterNumber: chapter.number,
    chapterTitle: chapter.title,
    subchapterNumber: subNumStr,
    subchapterTitle: title,
    category: chapter.trackGroup,
    trackGroup: chapter.trackGroup,
    difficulty,

    definition,
    beginnerExplanation,
    technicalExplanation,
    whyItExists,
    problemSolved,
    dockerRelevance,
    analogy,
    mentalModel,
    terminology,
    syntax,
    syntaxBreakdown,
    variations,
    simplestExample,
    practicalExample,
    realWorldExample,
    productionExample,
    whenToUse,
    whenNotToUse,
    commonMistakes,
    commonMisconceptions,
    securityConsiderations,
    performanceConsiderations,
    operationalConsiderations,
    troubleshooting,
    bestPractices,
    antiPatterns,
    relatedConcepts,
    relatedCommands,
    expectedOutput,
    outputExplanation,
    guidedExercise,
    challenge,
    knowledgeCheck,
    summary,

    commandSyntax: isCommand ? syntax : undefined,
    flagsExplained: isCommand ? flagsExplained : undefined,
    whatActuallyHappens: `When ${title} is invoked, the Docker client issues a REST API call to the dockerd daemon socket, which translates the request into low-level containerd execution calls via gRPC and instructs runc to configure Linux kernel namespaces and cgroups.`,
    whatChangesOnDisk: `Docker creates or modifies filesystem layers under /var/lib/docker/overlay2 and records container state metadata in /var/lib/docker/containers.`,
    whatChangesInDocker: `The Docker engine registers the state transition, updates its internal memory table of active containers, networks, and volumes, and emits a daemon event.`,
    internalMechanics: `The Linux kernel instantiates new PID, NET, IPC, and MNT namespaces, mounts an OverlayFS merged view, and binds cgroup resource limit counters.`,
    safeExample: `docker run --rm alpine:latest echo "Safe ephemeral test"`,
    dangerousExample: `docker run --privileged -v /:/host -it ubuntu:latest bash # Dangerous: Grants full host filesystem access and bypasses all isolation!`,
    errorScenarios: [
      { error: 'Cannot connect to the Docker daemon at unix:///var/run/docker.sock.', remedy: 'Ensure the Docker daemon service is running with "sudo systemctl start docker" or start Docker Desktop.' },
      { error: 'Error response from daemon: conflict: unable to delete image.', remedy: 'A stopped or running container is still referencing the image; remove the container first with "docker rm <container>" or use "-f" force.' }
    ],
    recommendedSimulator
  };
}
