import {
  UniversalDockerConcept,
  WithoutVsWithData,
  BlockDiagramData,
  InternalStep,
  CommonMistake,
  SyntaxToken,
  ConceptVariation,
  ConceptTerm,
} from './unifiedDockerData';

/**
 * 14 Distinct Docker Pedagogical Categories matching the 14 syllabus topics
 */
export type DetailedTopicCategory =
  | 'topic-01-intro'
  | 'topic-02-linux'
  | 'topic-03-setup'
  | 'topic-04-basics'
  | 'topic-05-storage'
  | 'topic-06-third-party'
  | 'topic-07-dockerfile'
  | 'topic-08-registries'
  | 'topic-09-compose'
  | 'topic-10-management'
  | 'topic-11-cli'
  | 'topic-12-security'
  | 'topic-13-devexp'
  | 'topic-14-deployment';

export function getDetailedCategory(topicNum: string): DetailedTopicCategory {
  const n = parseInt(topicNum, 10) || 1;
  switch (n) {
    case 1: return 'topic-01-intro';
    case 2: return 'topic-02-linux';
    case 3: return 'topic-03-setup';
    case 4: return 'topic-04-basics';
    case 5: return 'topic-05-storage';
    case 6: return 'topic-06-third-party';
    case 7: return 'topic-07-dockerfile';
    case 8: return 'topic-08-registries';
    case 9: return 'topic-09-compose';
    case 10: return 'topic-10-management';
    case 11: return 'topic-11-cli';
    case 12: return 'topic-12-security';
    case 13: return 'topic-13-devexp';
    case 14: return 'topic-14-deployment';
    default: return 'topic-01-intro';
  }
}

// ============================================================================
// CATEGORY SECTION 2: WHY DOES IT EXIST?
// ============================================================================
function getCategoryWhy(category: DetailedTopicCategory, title: string, cmd: string) {
  switch (category) {
    case 'topic-01-intro':
      return {
        problem: 'Software depends on specific OS libraries, runtimes, and system configurations. A program that runs on Developer A machine fails mysteriously on Developer B machine or in staging due to subtle environment discrepancies.',
        beforeDocker: 'Teams used 20-page Word setup documents, manual machine provisioning scripts, or heavy 10GB Virtual Machines that took 10 minutes to boot and consumed gigabytes of RAM.',
        dockerSolution: 'Docker bundles the application, runtime, binaries, and system libraries into an immutable, portable image that runs as an isolated user-space process sharing the host Linux kernel.',
        result: 'Sub-second startup, deterministic environments, and complete elimination of the "works on my machine" syndrome across development, CI/CD, and production.',
      };
    case 'topic-02-linux':
      return {
        problem: 'Ordinary processes run on a shared operating system where any process can inspect other processes, bind to any port, consume 100% of CPU/RAM, and access the entire root filesystem.',
        beforeDocker: 'Full hardware virtualization with hypervisors (Type 1 or Type 2) was the only way to isolate workloads, duplicating entire operating system kernels and device drivers for each task.',
        dockerSolution: 'Leverages native Linux kernel primitives: Namespaces (PID, Net, Mount, IPC, UTS, User) for view isolation, cgroups for resource quotas, and OverlayFS for copy-on-write layering.',
        result: 'Near-native bare-metal execution performance with true process, network, and storage boundaries without the overhead of guest operating systems.',
      };
    case 'topic-03-setup':
      return {
        problem: 'Docker is fundamentally a Linux technology relying on the Linux kernel. Running Linux containers on macOS and Windows laptops historically required complex manual VM configurations.',
        beforeDocker: 'Developers had to manually configure VirtualBox, vagrant files, and port forwarding bridges just to test a Linux service locally.',
        dockerSolution: 'Docker Desktop embeds a lightweight Linux VM (WSL2 on Windows, Apple Virtualization Framework on macOS) with automated socket forwarding and unified GUI/CLI integration.',
        result: 'Seamless terminal commands (e.g. "docker run") that feel completely native regardless of whether the developer uses Windows, Mac, or bare-metal Linux.',
      };
    case 'topic-04-basics':
      return {
        problem: 'Running server processes directly on host machines leaves dangling background ports, messy pidfiles, leftover temporary files, and port binding conflicts.',
        beforeDocker: 'Developers used "nohup app &", systemd user services, or background shell jobs, leading to orphaned processes and port collisions when multiple versions were tested.',
        dockerSolution: 'The "docker run", "exec", "stop", and "rm" lifecycle encapsulates process execution inside disposable sandbox containers with deterministic lifecycles and signal handling.',
        result: 'Clean, one-command process startup, background execution (-d), live interactive debugging (-it), graceful SIGTERM stops, and instant zero-residue cleanup.',
      };
    case 'topic-05-storage':
      return {
        problem: 'Containers have ephemeral filesystems. Any files written inside a container writable layer vanish permanently when the container is deleted ("docker rm").',
        beforeDocker: 'Applications stored database records and uploaded files directly in the container directory, leading to catastrophic total data loss during routine container updates or restarts.',
        dockerSolution: 'Docker Volumes and Bind Mounts bypass the container OverlayFS union layer, mounting persistent host directories directly into the container filesystem.',
        result: 'Stateful databases (Postgres, MySQL, Redis) retain 100% of records across container destruction, upgrades, and migrations with direct host I/O throughput.',
      };
    case 'topic-06-third-party':
      return {
        problem: 'Installing databases (PostgreSQL, MongoDB, Redis) directly on a developer workstation pollutes the host OS with system services, background daemons, and conflicting versions.',
        beforeDocker: 'Developers spent hours installing brew packages, apt repositories, and configuring host postgresql.conf files, frequently breaking their primary OS.',
        dockerSolution: 'Pre-built official Docker Hub images allow running complete database servers or one-off CLI utilities in isolated, disposable sandboxes with one command.',
        result: 'Launch a clean PostgreSQL 16 database in 3 seconds with "docker run -e POSTGRES_PASSWORD=secret postgres:16-alpine", use it, and delete it with zero host pollution.',
      };
    case 'topic-07-dockerfile':
      return {
        problem: 'Manually configuring containers via terminal commands is unreproducible, untracked in version control, and prone to human error.',
        beforeDocker: 'System administrators maintained manual shell scripts or bash histories that frequently broke due to upstream package repository updates.',
        dockerSolution: 'The Dockerfile provides a declarative, version-controlled recipe specifying the exact base image, dependencies, files, environment, and startup command.',
        result: 'BuildKit caches intermediate layers for ultra-fast rebuilds, and multi-stage builds produce tiny 15MB production images stripped of build tools.',
      };
    case 'topic-08-registries':
      return {
        problem: 'Compiled container images need a secure, distributed, versioned mechanism to be shared across developer machines, CI build agents, and production servers.',
        beforeDocker: 'Teams used FTP servers, heavy tarball archives transferred via SCP/rsync, or rebuilt code directly on production servers with git pull.',
        dockerSolution: 'Container Registries (Docker Hub, GHCR, AWS ECR) provide content-addressable OCI storage where image layers are deduplicated, cryptographically tagged, and pulled on demand.',
        result: 'Global, secure, authenticated image distribution where production nodes pull only new or modified image layers in seconds.',
      };
    case 'topic-09-compose':
      return {
        problem: 'Real-world microservices require coordinating 4+ containers (web, api, database, redis, queue), each needing specific ports, networks, and environment variables.',
        beforeDocker: 'Developers had to maintain long shell scripts with multiple fragile "docker run" commands and manual IP address coordination.',
        dockerSolution: 'Docker Compose defines the entire multi-service stack in a single readable "docker-compose.yml" file with automated internal DNS and dependency ordering.',
        result: 'A single command ("docker compose up -d") provisions the entire multi-tier environment, connects them to a private bridge, and enables seamless service discovery.',
      };
    case 'topic-10-management':
      return {
        problem: 'Understanding why a containerized application crashed or slowed down requires inspecting live stdout/stderr logs, CPU/RAM usage, and internal container configuration.',
        beforeDocker: 'Developers had to SSH into machines, hunt down syslog files in /var/log, and guess memory usage with top across mixed host processes.',
        dockerSolution: 'Docker CLI provides centralized log streaming ("docker logs -f"), live resource usage monitors ("docker stats"), and full JSON metadata dumps ("docker inspect").',
        result: 'Instant real-time visibility into application health, stdout/stderr streams, network IP assignments, and resource consumption.',
      };
    case 'topic-11-cli':
      return {
        problem: 'Over time, running containers and pulling images fills workstation disks with hundreds of gigabytes of dangling layers, stopped containers, and unused volumes.',
        beforeDocker: 'System administrators had to write dangerous rm -rf scripts in storage folders, often accidentally corrupting live database directories.',
        dockerSolution: 'Docker provides dedicated management subcommands: "docker image", "docker container", "docker volume", and "docker network" with safe "prune" utilities.',
        result: 'Safe, controlled management and one-command garbage collection ("docker system prune") that reclaims disk space without risking active workloads.',
      };
    case 'topic-12-security':
      return {
        problem: 'Containers sharing the host Linux kernel can introduce security vulnerabilities if processes run as root, possess dangerous Linux capabilities, or use unvetted base images.',
        beforeDocker: 'Applications ran with default root privileges; a vulnerability in a web server gave attackers complete root control over the entire physical server.',
        dockerSolution: 'Defense-in-depth container hardening: non-root users (USER 10001), read-only root filesystems, dropping kernel capabilities (--cap-drop=ALL), and CVE vulnerability scanning.',
        result: 'Even if an attacker breaches the application code, they cannot write binaries, escalate privileges, or escape the container sandbox.',
      };
    case 'topic-13-devexp':
      return {
        problem: 'Containerizing code can slow down the development feedback loop if developers must re-run "docker build" every time they change a single line of JavaScript or Python.',
        beforeDocker: 'Developers either skipped Docker during local coding or waited 45 seconds for images to rebuild on every save.',
        dockerSolution: 'Development bind mounts and "docker compose watch" sync local files instantly into the container, triggering framework hot-reloading in sub-seconds.',
        result: 'Instant live reloading inside a production-identical containerized runtime, combined with containerized automated tests and reproducible CI/CD pipelines.',
      };
    case 'topic-14-deployment':
      return {
        problem: 'A single container running on a laptop needs to scale to hundreds of replicas across a fleet of cloud servers with load balancing, automated failover, and zero downtime.',
        beforeDocker: 'Ops teams manually managed server clusters with custom scripts, leading to configuration drift, server snowflake syndrome, and risky deployments.',
        dockerSolution: 'Container Orchestrators (Docker Swarm, Kubernetes, HashiCorp Nomad, AWS ECS) ingest OCI container images and manage scheduling, scaling, and rolling updates declaratively.',
        result: 'Seamless transition from a local "docker run" command to a global enterprise microservice cluster with self-healing and automated traffic routing.',
      };
  }
}

// ============================================================================
// CATEGORY SECTION 3: REAL-WORLD DEVELOPER SCENARIO
// ============================================================================
function getCategoryScenario(category: DetailedTopicCategory, title: string, cmd: string) {
  return {
    title: `Developer Scenario: Production Rollout of ${title}`,
    setup: 'A distributed engineering team with members on macOS (Apple Silicon), Windows 11 (WSL2), and Ubuntu Linux is collaborating on a modern multi-service web application.',
    problem: `Without standardized ${title} patterns, team members experience inconsistent local environments, port collisions, and staging deployment failures.`,
    solution: `The team establishes a standard workflow using '${cmd}'. Everyone now executes the identical command, guaranteeing 100% parity across local laptops and the CI/CD pipeline.`,
    productionContext: `In staging and production, automated GitHub Actions pipelines execute '${cmd}' in headless mode, logging output to Datadog and verifying zero regressions before traffic routing.`,
  };
}

// ============================================================================
// CATEGORY SECTION 4: MENTAL MODEL & METAPHOR
// ============================================================================
function getCategoryMentalModel(category: DetailedTopicCategory, title: string) {
  switch (category) {
    case 'topic-01-intro':
    case 'topic-04-basics':
      return {
        metaphor: 'IMAGE = Blueprint / Recipe  |  CONTAINER = The Living House / Cooked Meal',
        analogy: 'An architectural blueprint sits in a filing cabinet doing nothing. When builders follow the blueprint, they construct an actual house with electricity and plumbing. An Image is the blueprint; a Container is the active house.',
        keyInsight: 'You can create 100 identical containers from a single image. Modifying a container never modifies the original image blueprint.',
      };
    case 'topic-02-linux':
    case 'topic-12-security':
      return {
        metaphor: 'NAMESPACES = Tinted Sunglasses  |  CGROUPS = Financial Budget / Meter  |  CHROOT = Padded Room',
        analogy: 'Namespaces give the container tinted glasses so it only sees its own processes and virtual network card. cgroups act like a power meter clamping its electricity and water usage. The host kernel remains the single landlord.',
        keyInsight: 'Containers are not virtual machines; they are ordinary Linux processes wearing kernel isolation earmuffs and sunglasses.',
      };
    case 'topic-05-storage':
      return {
        metaphor: 'CONTAINER STORAGE = Hotel Room Desk  |  DOCKER VOLUME = Safety Deposit Box',
        analogy: 'Any papers you leave on the desk in a hotel room get tossed out when you check out (ephemeral). But if you put your valuables in a safety deposit box at the bank, they stay there forever, ready for your next trip.',
        keyInsight: 'Always write persistent data (databases, user uploads) to Volumes, never to the container writable layer.',
      };
    case 'topic-07-dockerfile':
      return {
        metaphor: 'DOCKERFILE = Cooking Recipe  |  BUILD CACHE = Pre-chopped Ingredients',
        analogy: 'If you are making stew and haven’t changed the vegetable recipe, you reuse the pre-chopped vegetables from yesterday instead of chopping them again. BuildKit only re-runs steps from the first line that changed downward.',
        keyInsight: 'Put frequently changing code (COPY . .) at the bottom, and rarely changing dependencies (RUN npm install) at the top to maximize cache hits.',
      };
    case 'topic-08-registries':
      return {
        metaphor: 'LOCAL IMAGE = Product in Workshop  |  REGISTRY = Global Amazon Warehouse',
        analogy: 'You build a prototype in your private workshop. To sell it worldwide, you package it and ship it to an Amazon fulfillment center (Docker Hub / ECR). Anyone in the world can then download it in seconds.',
        keyInsight: 'Registries store images as content-addressable layer tarballs, so if two images share the same Ubuntu base layer, it is only stored and downloaded once.',
      };
    case 'topic-09-compose':
      return {
        metaphor: 'COMPOSE = Orchestra Conductor  |  CONTAINERS = Individual Musicians',
        analogy: 'Instead of walking up to the violinist, cellist, and drummer one by one and telling them when to play, the conductor raises a baton and conducts all instruments together in harmony.',
        keyInsight: 'One file (docker-compose.yml) and one command (docker compose up -d) spins up all your services and connects them to a private DNS network.',
      };
    default:
      return {
        metaphor: 'DOCKER ENGINE = Airport Logistics Hub  |  WORKLOAD = Standardized Shipping Container',
        analogy: 'Before standardized steel shipping containers in 1956, loading cargo required manual winches and custom pallets. Docker standardized software packaging so any cloud platform can run any application instantly.',
        keyInsight: 'Standardize the box, and the world can transport, run, and scale your code anywhere with zero surprises.',
      };
  }
}

// ============================================================================
// CATEGORY SECTION 9: WHAT CHANGES IN DOCKER STATE?
// ============================================================================
function getCategoryStateImpact(category: DetailedTopicCategory, title: string, cmd: string) {
  switch (category) {
    case 'topic-04-basics':
      return {
        stateBefore: {
          images: 1,
          containers: 0,
          volumes: 0,
          networks: 1,
          details: ['Base image cached in local Overlay2 store', 'Zero active or exited container processes', 'Default bridge network exists'],
        },
        stateAfter: {
          images: 1,
          containers: 1,
          volumes: 0,
          networks: 1,
          details: ['New container process running in detached mode', 'Assigned unique 64-char container ID and friendly name', 'Thin writable read-write layer created on top of image'],
          highlightedChanges: ['+1 Active Container Process', '+1 Ephemeral Read-Write Storage Layer', '+1 Virtual Ethernet Interface (veth)'],
        },
      };
    case 'topic-05-storage':
      return {
        stateBefore: {
          images: 1,
          containers: 1,
          volumes: 0,
          networks: 1,
          details: ['Container running with ephemeral storage only', 'No persistent host volume allocated in /var/lib/docker/volumes'],
        },
        stateAfter: {
          images: 1,
          containers: 1,
          volumes: 1,
          networks: 1,
          details: ['Named volume created on host disk', 'Container mount point bind-mounted directly to host volume directory', 'Writes bypass OverlayFS copy-on-write driver'],
          highlightedChanges: ['+1 Persistent Host Volume', 'Direct host I/O throughput active', 'Data survives container deletion'],
        },
      };
    case 'topic-07-dockerfile':
      return {
        stateBefore: {
          images: 0,
          containers: 0,
          volumes: 0,
          networks: 1,
          details: ['Local source code and Dockerfile present on workstation', 'No compiled image in local repository'],
        },
        stateAfter: {
          images: 1,
          containers: 0,
          volumes: 0,
          networks: 1,
          details: ['BuildKit completed layer assembly', 'Immutable OCI image tagged and stored in local store', 'Intermediate build containers automatically pruned'],
          highlightedChanges: ['+1 Immutable OCI Image', 'Cached layer graph generated', 'Ready for instant "docker run" or "docker push"'],
        },
      };
    default:
      return {
        stateBefore: {
          images: 1,
          containers: 0,
          volumes: 0,
          networks: 1,
          details: ['Baseline Docker daemon state', 'Workstation environment ready for command execution'],
        },
        stateAfter: {
          images: 1,
          containers: 1,
          volumes: 0,
          networks: 1,
          details: [`Executed ${cmd} successfully`, 'Docker daemon state synchronized', 'Resources isolated within Linux kernel namespaces'],
          highlightedChanges: [`State transitioned to reflect ${title}`, 'Kernel boundaries active', 'Zero host contamination'],
        },
      };
  }
}

// ============================================================================
// CATEGORY SECTION 10: WHAT DOES NOT CHANGE? (MANDATORY SECTION!)
// ============================================================================
function getCategoryStateUnchanged(category: DetailedTopicCategory, title: string, cmd: string): string[] {
  switch (category) {
    case 'topic-04-basics':
      return [
        'The underlying base Image is NEVER modified (images are 100% read-only and immutable).',
        'No persistent volume is created automatically unless you explicitly pass the -v or --mount flag.',
        'No host ports are published or reachable from your browser unless you explicitly pass -p HOST:CONTAINER.',
        'Host operating system files and environment variables outside the container remain completely untouched.',
        'Stopping a container does NOT delete it; its exited state and writable layer remain on disk until "docker rm".',
      ];
    case 'topic-05-storage':
      return [
        'Creating or mounting a Volume does NOT alter any files inside the original read-only image layers.',
        'Deleting a container with "docker rm -f" does NOT delete the Volume or any data stored inside it.',
        'Volumes are NOT automatically backed up to the cloud; they reside locally on host disk until you back them up.',
        'Bind mounts do NOT copy files into Docker internal storage; they directly point to your existing host directory.',
      ];
    case 'topic-07-dockerfile':
      return [
        'Building an image does NOT automatically start or run any containers on your machine.',
        'A failed build step does NOT corrupt or modify previously completed cached layers.',
        'Running "docker build" does NOT upload or push your code to Docker Hub or any remote registry.',
        'Files on your local host are NEVER modified during the build (Docker only reads the build context).',
      ];
    case 'topic-09-compose':
      return [
        'Running "docker compose up" does NOT rebuild images unless you explicitly pass the "--build" flag or images are missing.',
        'Running "docker compose down" does NOT delete named volumes unless you explicitly add the "-v" flag.',
        'Services on custom Compose networks are NOT exposed to the public internet unless published via "ports:".',
      ];
    case 'topic-12-security':
      return [
        'Running a container does NOT grant it root access on the host unless you dangerously pass "--privileged".',
        'A read-only container rootfs does NOT prevent writing to explicitly mounted in-memory tmpfs or volumes.',
        'Vulnerability scanning an image does NOT automatically fix the CVEs; you must bump the base image or package version.',
      ];
    default:
      return [
        `Executing '${cmd}' does NOT modify or corrupt any base container images stored in local cache.`,
        'Does NOT affect running containers in other namespaces or projects on the same host.',
        'Does NOT publish or expose network ports to the public internet without explicit configuration.',
        'Does NOT delete persistent data stored in dedicated Docker Volumes.',
      ];
  }
}

// ============================================================================
// CATEGORY SECTION 11: EXPECTED TERMINAL OUTPUT (CLICKABLE LINES)
// ============================================================================
function getCategoryExpectedOutput(category: DetailedTopicCategory, title: string, cmd: string) {
  switch (category) {
    case 'topic-04-basics':
      return [
        {
          line: 'd4b8e219a7c3f56e0129a8f4c2e6d1b8a9c0e4f2a7b6c5d4e3f2a1b0c9d8e7f6',
          type: 'data' as const,
          explanation: 'The full 64-character hexadecimal container ID returned by Docker daemon when running in detached mode (-d).',
          whyItAppears: 'Docker confirms that the container process was successfully created and started in the background.',
          whatToLookAt: 'The first 12 characters (d4b8e219a7c3) are the short container ID shown in "docker ps".',
        },
      ];
    case 'topic-07-dockerfile':
      return [
        {
          line: '[+] Building 1.2s (8/8) FINISHED                                docker:desktop-linux',
          type: 'header' as const,
          explanation: 'BuildKit header indicating build completed successfully across all 8 Dockerfile instructions.',
          whyItAppears: 'Modern Docker uses BuildKit by default for parallel, high-speed cached builds.',
          whatToLookAt: 'Look at the time elapsed (1.2s) and the total step count (8/8).',
        },
        {
          line: ' => [2/4] COPY package*.json ./                                               0.0s',
          type: 'info' as const,
          explanation: 'Step 2 completed instantly in 0.0s because the file checksum matched the local build cache.',
          whyItAppears: 'BuildKit detected CACHED status, avoiding redundant disk operations.',
          whatToLookAt: 'Confirm that dependency copy steps hit the cache to maintain fast build times.',
        },
        {
          line: ' => exporting to image                                                         0.1s',
          type: 'success' as const,
          explanation: 'BuildKit committed the final layer tarball and updated local repository references.',
          whyItAppears: 'Final assembly of the immutable OCI image snapshot.',
          whatToLookAt: 'The resulting image name and SHA256 digest.',
        },
      ];
    case 'topic-09-compose':
      return [
        {
          line: '[+] Running 3/3',
          type: 'header' as const,
          explanation: 'Docker Compose orchestration status indicator.',
          whyItAppears: 'Reports total number of services in the manifest and their operational status.',
          whatToLookAt: 'Ensure all declared services show green checkmarks.',
        },
        {
          line: ' ✔ Network myapp_default       Created                                         0.1s',
          type: 'info' as const,
          explanation: 'Compose automatically created a dedicated, private bridge network with internal DNS resolution.',
          whyItAppears: 'Every Compose project receives an isolated network so services communicate safely by name.',
          whatToLookAt: 'The network name defaults to <folder_name>_default.',
        },
        {
          line: ' ✔ Container myapp-web-1       Started                                         0.3s',
          type: 'success' as const,
          explanation: 'The web service container booted and attached to the shared network.',
          whyItAppears: 'Docker Engine started the container according to Compose specifications.',
          whatToLookAt: 'Status must show Started, not Exited or Restarting.',
        },
      ];
    default:
      return [
        {
          line: `$ ${cmd}`,
          type: 'header' as const,
          explanation: `The terminal invocation issued by the user to execute ${title}.`,
          whyItAppears: 'Standard CLI command prompt echo.',
          whatToLookAt: 'Verify syntax flags and argument order.',
        },
        {
          line: 'Status: Action completed successfully in 0.42s',
          type: 'success' as const,
          explanation: 'Docker Engine confirmed state synchronization with zero exit code errors.',
          whyItAppears: 'The daemon validated the request and updated internal state tables.',
          whatToLookAt: 'Clean return with no stderr or stack traces indicates correct execution.',
        },
      ];
  }
}

// ============================================================================
// CATEGORY SECTION 13: SAFE CONTROLLED FAILURE
// ============================================================================
function getCategorySafeFailure(category: DetailedTopicCategory, title: string, cmd: string) {
  switch (category) {
    case 'topic-04-basics':
      return {
        mistakeCommand: 'docker run -d nginx',
        mistakeTitle: 'Running a Web Server without Publishing Host Ports',
        consequence: 'The Nginx container starts happily in the background, but navigating to http://localhost in your browser gives "ERR_CONNECTION_REFUSED". You cannot access the web app!',
        diagnosticQuestion: 'Why can your laptop web browser not reach the Nginx server running inside the container?',
        diagnosticAnswer: 'By default, container network namespaces are completely isolated. Without the "-p HOST_PORT:CONTAINER_PORT" flag, Docker does not configure iptables port forwarding from your host machine.',
      };
    case 'topic-05-storage':
      return {
        mistakeCommand: 'docker run -d --name pg-test -e POSTGRES_PASSWORD=secret postgres:16',
        mistakeTitle: 'Running a Database without a Persistent Volume',
        consequence: 'You create tables and insert 5,000 customer records. Later, you run "docker stop pg-test && docker rm pg-test". When you recreate the container, ALL CUSTOMER DATA HAS PERMANENTLY VANISHED!',
        diagnosticQuestion: 'Why did all database tables disappear after deleting and recreating the container?',
        diagnosticAnswer: 'Without a named volume (-v pgdata:/var/lib/postgresql/data), database files were written to the ephemeral container writable layer. Deleting the container permanently destroyed that layer.',
      };
    case 'topic-07-dockerfile':
      return {
        mistakeCommand: 'COPY . .\nRUN npm install',
        mistakeTitle: 'Placing Source Code Copy Before Dependency Installation',
        consequence: 'Every time you change a single comment or letter in a source file, Docker invalidates the cache for all subsequent steps, forcing a 2-minute "npm install" on every single build!',
        diagnosticQuestion: 'Why does changing index.js cause Docker to redownload all npm packages from the internet?',
        diagnosticAnswer: 'Docker layer caching is sequential from top to bottom. Invalidate line N (COPY . .), and all subsequent lines (RUN npm install) must re-execute from scratch. Copy package*.json first!',
      };
    default:
      return {
        mistakeCommand: `${cmd} --invalid-flag-example`,
        mistakeTitle: `Misconfiguring Runtime Parameters for ${title}`,
        consequence: `Executing without required flags causes immediate process crash or silent state misconfiguration.`,
        diagnosticQuestion: `What went wrong when running this command without proper validation?`,
        diagnosticAnswer: `Docker requires explicit configuration for ports, volumes, and execution modes. Always check syntax flags and verify with 'docker ps' or 'docker inspect'.`,
      };
  }
}

// ============================================================================
// CATEGORY SECTION 14: STEP-BY-STEP RECOVERY (5 PROGRESSIVE HINTS)
// ============================================================================
function getCategoryRecoverySteps(category: DetailedTopicCategory, title: string, cmd: string) {
  switch (category) {
    case 'topic-04-basics':
      return {
        hint1_conceptual: 'Think about how network traffic moves from your physical laptop into the virtual container sandbox.',
        hint2_object: 'The container is listening on port 80 internally, but your host operating system has no idea how to route incoming port 8080 traffic to it.',
        hint3_commandFamily: 'Look at the "docker run" networking flags. You need the flag that publishes and maps ports.',
        hint4_syntaxStructure: 'The syntax pattern is: -p [HOST_PORT]:[CONTAINER_PORT]. Remember Outside:Inside.',
        hint5_exactCommand: 'docker run -d -p 8080:80 --name web nginx',
      };
    case 'topic-05-storage':
      return {
        hint1_conceptual: 'Data inside the container is ephemeral. You must instruct Docker to store files on the host hard drive outside the container.',
        hint2_object: 'Think about Docker storage objects. You need a managed Docker Volume or a host Bind Mount.',
        hint3_commandFamily: 'Use the volume flag with "docker run": "-v" or "--mount".',
        hint4_syntaxStructure: 'The syntax pattern is: -v [VOLUME_NAME]:[CONTAINER_DIRECTORY_PATH].',
        hint5_exactCommand: 'docker run -d -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:16',
      };
    case 'topic-07-dockerfile':
      return {
        hint1_conceptual: 'Order of instructions in a Dockerfile directly controls BuildKit caching behavior.',
        hint2_object: 'Separate the files that change rarely (package manifests) from files that change on every save (source code).',
        hint3_commandFamily: 'Use two separate COPY instructions instead of copying everything in one step.',
        hint4_syntaxStructure: '1. COPY package*.json ./  ->  2. RUN npm install  ->  3. COPY . .',
        hint5_exactCommand: 'COPY package*.json ./\nRUN npm install\nCOPY . .\nCMD ["npm", "start"]',
      };
    default:
      return {
        hint1_conceptual: `Step 1: Check the fundamentals of ${title} and examine what resource is missing or misconfigured.`,
        hint2_object: 'Step 2: Inspect the active Docker objects using "docker ps", "docker images", or "docker inspect".',
        hint3_commandFamily: `Step 3: Identify the relevant subcommand family for this operation: '${cmd.split(' ')[0]} ${cmd.split(' ')[1] || ''}'.`,
        hint4_syntaxStructure: `Step 4: Formulate the correct syntax with necessary options: ${cmd} [OPTIONS] [TARGET].`,
        hint5_exactCommand: `${cmd}`,
      };
  }
}

// ============================================================================
// CATEGORY SECTION 15: INTERACTIVE SIMULATOR CONFIG (PREDICTION PROMPT)
// ============================================================================
function getCategorySimulatorConfig(category: DetailedTopicCategory, title: string, cmd: string) {
  switch (category) {
    case 'topic-04-basics':
      return {
        mode: 'lifecycle' as const,
        initialObjects: {
          images: ['nginx:latest', 'alpine:3.19'],
          containers: [],
          volumes: [],
          networks: ['bridge'],
        },
        actionPrompt: 'You are about to launch a web server in detached mode: "docker run -d -p 8080:80 --name web nginx".',
        predictionOptions: [
          {
            text: 'A new container boots in the background, maps host port 8080 to container port 80, and prints its container ID.',
            isCorrect: true,
            explanation: 'Correct! The "-d" flag detaches the terminal, "-p 8080:80" binds the host port, and Docker outputs the 64-char container ID.',
          },
          {
            text: 'Your terminal will freeze and block your prompt with Nginx web server access logs.',
            isCorrect: false,
            explanation: 'Incorrect. Because we passed "-d" (detached mode), the container runs silently in the background, freeing your prompt immediately.',
          },
          {
            text: 'The Nginx base image is permanently modified with your container runtime data.',
            isCorrect: false,
            explanation: 'Incorrect. Docker images are strictly read-only and immutable. Container writes occur in a thin ephemeral layer.',
          },
        ],
        stateTransition: {
          triggerCommand: 'docker run -d -p 8080:80 --name web nginx',
          visualConsequence: 'A new container named "web" appears in the active containers shelf with status RUNNING and port 8080->80 mapped.',
          explanation: 'Docker daemon spawned a new isolated process namespace and programmed iptables port forwarding.',
        },
      };
    case 'topic-05-storage':
      return {
        mode: 'volumes' as const,
        initialObjects: {
          images: ['postgres:16-alpine'],
          containers: [],
          volumes: ['pgdata'],
          networks: ['bridge'],
        },
        actionPrompt: 'You run: "docker run -d --name db -v pgdata:/var/lib/postgresql/data postgres:16-alpine". What will happen to the database files?',
        predictionOptions: [
          {
            text: 'Data written by PostgreSQL will be stored directly on host storage in the "pgdata" volume, surviving container destruction.',
            isCorrect: true,
            explanation: 'Correct! The "-v pgdata:/path" bind-mounts host storage directly, providing full persistence across container lifecycles.',
          },
          {
            text: 'PostgreSQL files will disappear forever as soon as the container process stops.',
            isCorrect: false,
            explanation: 'Incorrect. Because we mounted a named volume (pgdata), the data resides safely on host disk independent of container state.',
          },
          {
            text: 'The volume will compress the database into a read-only Docker image layer.',
            isCorrect: false,
            explanation: 'Incorrect. Volumes provide direct read-write filesystem access, bypassing image layer mechanics.',
          },
        ],
        stateTransition: {
          triggerCommand: 'docker run -d --name db -v pgdata:/var/lib/postgresql/data postgres:16-alpine',
          visualConsequence: 'The container links directly to the "pgdata" volume block with an active data persistence arrow.',
          explanation: 'Host directory /var/lib/docker/volumes/pgdata/_data is mounted into container mount namespace.',
        },
      };
    default:
      return {
        mode: 'default' as const,
        initialObjects: {
          images: ['nginx:latest', 'postgres:16-alpine'],
          containers: [],
          volumes: [],
          networks: ['bridge'],
        },
        actionPrompt: `Predict the outcome of invoking '${cmd}' on the simulated Docker Engine:`,
        predictionOptions: [
          {
            text: `Docker validates the command, executes it within isolated namespaces, and updates internal system state.`,
            isCorrect: true,
            explanation: `Correct! Docker processes '${cmd}' via the daemon API and reflects the changes in the system state.`,
          },
          {
            text: 'The host operating system kernel is recompiled and restarted.',
            isCorrect: false,
            explanation: 'Incorrect. Containers share the host kernel and never reboot or modify the host OS kernel.',
          },
          {
            text: 'All other running containers on the system are immediately paused.',
            isCorrect: false,
            explanation: 'Incorrect. Containers run in isolated namespaces and operate independently of each other.',
          },
        ],
        stateTransition: {
          triggerCommand: cmd,
          visualConsequence: `Simulated engine updates state to reflect successful completion of ${title}.`,
          explanation: `The Docker daemon executed the command and emitted state change events to listeners.`,
        },
      };
  }
}

// ============================================================================
// CATEGORY SECTION 17: INDEPENDENT COMPREHENSIVE CHALLENGE
// ============================================================================
function getCategoryChallenge(category: DetailedTopicCategory, title: string, cmd: string) {
  switch (category) {
    case 'topic-04-basics':
      return {
        title: 'Master Container Execution: Background Nginx Server',
        objective: 'Start an Nginx web server in the background, name it "web-prod", and publish container port 80 to host port 8080.',
        scenario: 'Your staging server needs a fast HTTP test endpoint. You must start the official Nginx image with predictable naming and port routing.',
        requirements: [
          'Run container in detached background mode (-d)',
          'Name the container explicitly: "--name web-prod"',
          'Publish host port 8080 to container port 80: "-p 8080:80"',
          'Target the "nginx" image',
        ],
        startingState: 'Images: nginx:latest  |  Containers: 0 active',
        solutionCommand: 'docker run -d --name web-prod -p 8080:80 nginx',
        validationRegex: 'docker\\s+run.*-d.*(--name\\s+web-prod|-p\\s+8080:80).*nginx',
        hints: [
          'Start with "docker run"',
          'Add "-d" for detached mode',
          'Add "--name web-prod" for container identification',
          'Add "-p 8080:80" for port forwarding',
          'Specify "nginx" as the target image at the end',
        ],
        explanation: 'This command represents the golden standard for running web services in Docker: detached, explicitly named, and mapped to host ports.',
      };
    case 'topic-05-storage':
      return {
        title: 'Persistent Database Deployment: PostgreSQL with Volume',
        objective: 'Launch a PostgreSQL 16 container named "app-db" with password "supersecret" and persist its data in a volume named "db-data".',
        scenario: 'You are deploying a database for an e-commerce platform. It is vital that user records are never lost during container updates.',
        requirements: [
          'Run in detached mode (-d)',
          'Name container "--name app-db"',
          'Mount volume "db-data" to "/var/lib/postgresql/data"',
          'Set environment variable "POSTGRES_PASSWORD=supersecret"',
          'Target image "postgres:16-alpine"',
        ],
        startingState: 'Volumes: db-data  |  Containers: 0 active',
        solutionCommand: 'docker run -d --name app-db -v db-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=supersecret postgres:16-alpine',
        validationRegex: 'docker\\s+run.*-d.*--name\\s+app-db.*-v\\s+db-data:/var/lib/postgresql/data.*postgres',
        hints: [
          'Use "docker run -d"',
          'Name with "--name app-db"',
          'Mount volume with "-v db-data:/var/lib/postgresql/data"',
          'Pass password with "-e POSTGRES_PASSWORD=supersecret"',
          'Target "postgres:16-alpine"',
        ],
        explanation: 'Mounting the named volume guarantees that data lives safely on the host hard drive even if the container is removed.',
      };
    default:
      return {
        title: `Hands-on Mastery Challenge: ${title}`,
        objective: `Execute the authoritative Docker command to configure and run ${title} properly.`,
        scenario: `A senior engineer asks you to implement ${title} on your team staging cluster following best practices.`,
        requirements: [
          `Execute '${cmd}' with correct parameters`,
          'Ensure zero host resource leaks',
          'Validate execution with standard verification commands',
        ],
        startingState: 'Clean Docker workstation environment',
        solutionCommand: cmd,
        hints: [
          `Remember the syntax family: ${cmd.split(' ')[0]}`,
          `Check the required flags for ${title}`,
          `Execute: ${cmd}`,
        ],
        explanation: `Executing '${cmd}' completes the workflow and establishes the desired system state cleanly.`,
      };
  }
}

// ============================================================================
// MAIN ENRICHER EXPORT: ENSURES COMPLETE 17-SECTION TEACHING DATA
// ============================================================================
export function ensureFullConceptData(concept: any): UniversalDockerConcept {
  const title = concept.title || 'Docker Concept';
  const cmd = concept.command || 'docker run';
  const topicNum = concept.topicNumber || '01';
  const topicId = concept.topicId || 'topic-01';
  const detailedCat = getDetailedCategory(topicNum);

  // 1. Definition & Explanations (Header + Section 1)
  const definition = concept.definition || concept.whatIsIt || `A core Docker feature enabling ${title.toLowerCase()}.`;
  const simpleExplanation = concept.simpleExplanation || concept.inSimpleWords || `Think of ${title} as an easy way to bundle and run software safely on your computer without breaking anything else.`;
  const technicalExplanation = concept.technicalExplanation || concept.quote || `Technical implementation of ${title} utilizing Docker Engine daemon APIs and Linux kernel primitives.`;

  // 2. Section 2: Why Does It Exist?
  const why = concept.why || getCategoryWhy(detailedCat, title, cmd);

  // 3. Section 3: Real-World Developer Scenario
  const scenario = concept.scenario || concept.developerScenario || getCategoryScenario(detailedCat, title, cmd);

  // 4. Section 4: Mental Model
  const mentalModel = concept.mentalModel || getCategoryMentalModel(detailedCat, title);

  // 5. Section 5: Block Diagram
  const architectureDiagram: BlockDiagramData = concept.architectureDiagram || concept.blockDiagram || {
    title: `${title} Architecture`,
    subtitle: 'Click any component below to inspect simple and technical details:',
    nodes: [
      { id: 'host-sys', label: 'Host System / Linux Kernel', simpleDef: 'The computer hardware and operating system running Docker.', techDef: 'Host OS providing Linux kernel syscalls, cgroups v2, and OverlayFS.', badge: 'Host System', color: '#38bdf8' },
      { id: 'docker-engine', label: 'Docker Engine (dockerd & containerd)', simpleDef: 'The background service managing container lifecycles.', techDef: 'Docker daemon handling REST API requests and invoking runc via containerd.', badge: 'Docker Engine', color: '#60a5fa' },
      { id: 'concept-target', label: `${title} Runtime`, simpleDef: `The isolated container or resource configured by ${cmd}.`, techDef: `Active user-space primitives and namespace boundaries for ${title}.`, badge: 'Active Target', color: '#10b981' },
    ],
  };

  // 6. Section 6: Terminology (Clickable terms)
  const defaultTerms: ConceptTerm[] = [
    {
      term: title,
      simple: definition,
      technical: technicalExplanation,
      analogy: mentalModel.analogy,
      example: cmd,
      related: ['Docker CLI', 'Docker Daemon', 'Container'],
      commonConfusion: `Beginners often confuse ${title} with full virtual machine virtualization.`,
    },
    {
      term: 'Container',
      simple: 'A lightweight, running box that holds your application and everything it needs.',
      technical: 'An isolated Linux user-space process restricted by namespaces and cgroups.',
      analogy: 'A standardized shipping container on a cargo ship.',
      example: 'docker run -d nginx',
      related: ['Image', 'Process', 'runc'],
      commonConfusion: 'A container is NOT a mini-VM; it runs directly on the host kernel.',
    },
    {
      term: 'Image',
      simple: 'A frozen snapshot or recipe used to create containers.',
      technical: 'An immutable, read-only stack of tarball layers identified by a cryptographic SHA256 digest.',
      analogy: 'A cooking recipe or architectural blueprint.',
      example: 'docker pull postgres:16',
      related: ['Dockerfile', 'Registry', 'Layer'],
      commonConfusion: 'An image never changes once built; running containers make changes in a separate writable layer.',
    },
    {
      term: 'Docker Engine',
      simple: 'The background engine that does the actual work of running containers.',
      technical: 'A client-server application with a long-running daemon (dockerd), APIs, and CLI.',
      analogy: 'The engine under the hood of a car.',
      example: 'systemctl status docker',
      related: ['containerd', 'dockerd', 'socket'],
      commonConfusion: 'The CLI is just a remote control; the Engine daemon does all the heavy lifting.',
    },
  ];

  const rawTerms: ConceptTerm[] = concept.terms && concept.terms.length > 0 ? concept.terms : defaultTerms;
  const terms: ConceptTerm[] = rawTerms.map((t) => ({
    term: t.term,
    simple: t.simple || 'A core Docker concept.',
    technical: t.technical || 'Technical Docker primitive.',
    analogy: t.analogy || 'A modular building block in a modern cloud-native system.',
    example: t.example || cmd,
    related: t.related || ['Docker', 'Container'],
    commonConfusion: t.commonConfusion || 'Frequently misunderstood by developers transitioning from VMs.',
  }));

  // 7. Section 7: Syntax & Tokens
  const syntaxCode = concept.syntaxCode || cmd;
  const cmdParts = syntaxCode.split(' ');
  const defaultTokens: SyntaxToken[] = [
    { token: 'docker', role: 'CLI Binary', explanation: 'Invokes the Docker Command-Line Interface client.' },
    { token: cmdParts[1] || 'run', role: 'Subcommand', explanation: `The primary Docker command to manage ${title.toLowerCase()}.` },
    { token: '-d', role: 'Flag', explanation: 'Runs the container detached in the background, freeing your terminal prompt.' },
    { token: 'target:latest', role: 'Argument', explanation: 'The target image, container name, or resource identifier.' },
  ];
  const rawTokens: SyntaxToken[] = concept.syntaxTokens && concept.syntaxTokens.length > 0 ? concept.syntaxTokens : defaultTokens;
  const syntaxTokens: SyntaxToken[] = rawTokens.length >= 2
    ? rawTokens
    : [...rawTokens, ...defaultTokens.filter(dt => !rawTokens.some(rt => rt.token === dt.token))];

  // 8. Section 8: Syntax Variations
  const defaultVariations: ConceptVariation[] = [
    {
      command: cmd,
      title: 'Standard Execution',
      whatItDoes: `Executes ${title} with default runtime parameters.`,
      whenToUse: 'Quick testing and interactive terminal sessions.',
      whenNotToUse: 'Production background services needing persistence and restart guarantees.',
      risk: 'Low risk. Terminates cleanly on Ctrl+C.',
      expectedResult: 'Command runs in foreground and outputs logs to stdout.',
    },
    {
      command: `${cmd} -d`,
      title: 'Detached Background Run',
      whatItDoes: 'Runs the process silently in the background and prints the container ID.',
      whenToUse: 'Web servers, databases, and background microservices.',
      whenNotToUse: 'One-off scripts where you immediately need to see output.',
      risk: 'Requires explicit "docker logs" or "docker stop" to inspect or terminate.',
      expectedResult: 'Returns 64-char container ID and frees terminal prompt immediately.',
    },
    {
      command: `${cmd} --name my-${concept.topicNumber || 'service'}`,
      title: 'Explicit Named Identifier',
      whatItDoes: 'Assigns a predictable, human-friendly name instead of a random generated string.',
      whenToUse: 'Production scripts, CI/CD automation, and Compose references.',
      whenNotToUse: 'When launching ephemeral temporary containers where names might collide.',
      risk: 'Fails with name collision if an existing container already has this name.',
      expectedResult: 'Container registers under the custom name visible in "docker ps".',
    },
  ];

  const rawVariations: ConceptVariation[] = concept.variations && concept.variations.length > 0 ? concept.variations : defaultVariations;
  const augmentedVariations = rawVariations.length >= 2
    ? rawVariations
    : [...rawVariations, ...defaultVariations.filter(dv => !rawVariations.some(rv => (rv.command || rv.syntax || rv.title) === (dv.command || dv.title)))];

  const variations: ConceptVariation[] = augmentedVariations.map((v) => ({
    ...v,
    command: v.command || v.syntax || cmd,
    whatItDoes: v.whatItDoes || `Executes ${v.title}.`,
    whenToUse: v.whenToUse || 'Standard development workflow.',
    whenNotToUse: v.whenNotToUse || 'When explicit production flags are required.',
    risk: v.risk || 'Low risk under standard Docker sandbox.',
    expectedResult: v.expectedResult || 'Process completes and updates engine state.',
  }));

  // 9. Section 9: What Changes?
  const stateImpact = getCategoryStateImpact(detailedCat, title, cmd);
  const stateBefore = concept.stateBefore || stateImpact.stateBefore;
  const stateAfter = concept.stateAfter || stateImpact.stateAfter;

  // 10. Section 10: What Does NOT Change? (MANDATORY)
  const stateUnchanged: string[] = concept.stateUnchanged && concept.stateUnchanged.length > 0
    ? concept.stateUnchanged
    : getCategoryStateUnchanged(detailedCat, title, cmd);

  // 11. Section 11: Expected Output (Clickable Lines)
  const expectedOutput = concept.expectedOutput && concept.expectedOutput.length > 0
    ? concept.expectedOutput
    : getCategoryExpectedOutput(detailedCat, title, cmd);

  // 12. Section 12: Common Mistakes
  const defaultMistakes: CommonMistake[] = [
    {
      mistake: `Executing ${cmd} without inspecting environment state first`,
      whyWrong: 'Can cause port collisions, duplicate name errors, or unexpected resource consumption.',
      correctWay: `Run "docker ps" or "docker images" first to verify active state before invoking ${cmd}.`,
      dangerousConsequence: 'May fail silently or mask underlying service conflicts.',
    },
    {
      mistake: 'Assuming container disk changes persist automatically after removal',
      whyWrong: 'The container writable layer is ephemeral and completely destroyed when the container is removed.',
      correctWay: 'Always use dedicated named Docker Volumes for databases and stateful files.',
      dangerousConsequence: 'Catastrophic data loss when recreating containers during updates.',
    },
  ];
  const rawMistakes: CommonMistake[] = concept.commonMistakes && concept.commonMistakes.length > 0 ? concept.commonMistakes : defaultMistakes;
  const commonMistakes: CommonMistake[] = rawMistakes.length >= 2
    ? rawMistakes
    : [...rawMistakes, ...defaultMistakes.filter(dm => !rawMistakes.some(rm => rm.mistake === dm.mistake))];

  // 13. Section 13: Safe Failure
  const safeFailure = concept.safeFailure || getCategorySafeFailure(detailedCat, title, cmd);

  // 14. Section 14: Recovery (5 Progressive Hints)
  const recoverySteps = concept.recoverySteps || getCategoryRecoverySteps(detailedCat, title, cmd);

  // 15. Section 15: Interactive Simulator Config
  const simulatorConfig = concept.simulatorConfig || getCategorySimulatorConfig(detailedCat, title, cmd);

  // 16. Section 16: Terminal Sandbox Practice
  const sandbox = concept.sandbox || {
    initialCommands: ['docker ps', 'docker images'],
    guidedSteps: [
      {
        instruction: `Run the standard command for ${title}:`,
        command: cmd,
        hint: `Type: ${cmd}`,
      },
      {
        instruction: 'Inspect running containers to verify status:',
        command: 'docker ps',
        hint: 'Type: docker ps',
      },
    ],
    targetTask: `Master ${title} with ${cmd}`,
    solutionCommands: [cmd, 'docker ps'],
  };

  // 17. Section 17: Independent Challenge
  const challengeComprehensive = concept.challengeComprehensive || getCategoryChallenge(detailedCat, title, cmd);

  const defaultFlow: InternalStep[] = [
    { step: 1, title: 'CLI Command Dispatch', desc: `Docker CLI validates parameters for ${cmd}.`, why: 'Serializes input to REST API payload.', techDetail: 'POST /v1.43/containers/create' },
    { step: 2, title: 'Daemon Socket Handshake', desc: 'dockerd daemon receives request via /var/run/docker.sock.', why: 'Authenticates and checks system resources.', techDetail: 'UNIX domain socket RPC handshake' },
    { step: 3, title: 'Image Store Verification', desc: 'Daemon checks local Overlay2 store for image layers.', why: 'Ensures immutable base layers are present.', techDetail: 'Queries local content-addressable storage' },
    { step: 4, title: 'Read-Write Layer Mount', desc: 'Daemon creates thin writable container layer.', why: 'Isolates container disk changes from image.', techDetail: 'OverlayFS union mount with lowerdir & upperdir' },
    { step: 5, title: 'Kernel Namespace Isolation', desc: 'Linux kernel initializes PID, Net, Mount, and IPC namespaces.', why: 'Isolates container processes from host.', techDetail: 'Linux clone() syscall with CLONE_NEW* flags' },
  ];
  const internalFlow: InternalStep[] = concept.internalFlow && concept.internalFlow.length >= 4 ? concept.internalFlow : defaultFlow;

  const recapChecklist: string[] = concept.recapChecklist && concept.recapChecklist.length >= 2 ? concept.recapChecklist : [
    `${title} provides isolated, reproducible execution.`,
    'Always use explicit flags (-d, -p, -v) for predictable behavior.',
    'Inspect container state using "docker ps" and "docker inspect".',
  ];

  const defaultChallenge = {
    question: `What is the primary architectural purpose of ${title} in Docker?`,
    options: [
      { label: `Enables isolated, reproducible application execution via ${cmd}`, isCorrect: true, explanation: 'Correct! Docker guarantees portability and process isolation.' },
      { label: 'Reboots the host operating system kernel', isCorrect: false, explanation: 'Incorrect. Containers share the host kernel.' },
      { label: 'Deletes all application data upon container startup', isCorrect: false, explanation: 'Incorrect. Images and volumes preserve data.' },
    ],
  };
  const challenge = concept.challenge && concept.challenge.options && concept.challenge.options.length >= 2 ? concept.challenge : defaultChallenge;

  const whenToUse = concept.whenToUse || [
    `✓ When implementing ${title} in isolated development workflows`,
    '✓ When ensuring 100% reproducible application behavior across environments',
    '✓ When running microservices and background services without host pollution',
    '✓ Continuous Integration (CI) and build automation pipelines',
  ];

  const whenNotToUse = concept.whenNotToUse || [
    '✕ When attempting to persist database data without mounting a dedicated Docker Volume',
    '✕ When running legacy GUI applications requiring direct bare-metal GPU access',
    '✕ When confusing stopping a container with removing its disk state',
  ];

  return {
    ...concept,
    id: concept.id || 'docker-concept',
    command: cmd,
    title,
    topicId,
    topicNumber: topicNum,
    topicTitle: concept.topicTitle || 'Docker Fundamentals',
    subtitle: concept.subtitle || definition,
    badges: concept.badges && concept.badges.length > 0 ? concept.badges : ['Core', 'Docker', concept.difficulty || 'Intermediate'],
    difficulty: concept.difficulty || 'Intermediate',
    quote: technicalExplanation,

    // Backward compatible fields
    whatIsIt: definition,
    inSimpleWords: simpleExplanation,
    whyDoYouNeedIt: why.problem + ' ' + why.dockerSolution,
    realWorldAnalogy: mentalModel.analogy,
    syntaxCode,
    syntaxTokens,
    withoutVsWith: concept.withoutVsWith || {
      without: {
        title: `WITHOUT ${title.toUpperCase()}`,
        items: [
          'Environment drift and version conflicts across team machines',
          'Manual setup guides that take hours and break frequently',
          'Host operating system pollution with conflicting daemons and libraries',
        ],
        outcome: '💥 "Works on my machine" bugs and production rollout failures',
      },
      with: {
        title: `WITH ${title.toUpperCase()}`,
        items: [
          '100% reproducible, portable execution across macOS, Windows, Linux, and Cloud',
          'Sub-second startup by sharing the host Linux kernel without VM overhead',
          'Clean, zero-residue disposal when containers are stopped and removed',
        ],
        outcome: '🛡️ Reliable, deterministic cloud-native application lifecycle',
      },
    },
    blockDiagram: architectureDiagram,
    terms,
    variations,
    whenToUse,
    whenNotToUse,
    developerScenario: scenario,
    commonMistakes,
    internalFlow,
    recapChecklist,
    challenge,
    sandbox,

    // Exhaustive 17-Section Lesson Architecture Fields
    definition,
    simpleExplanation,
    technicalExplanation,
    why,
    scenario,
    mentalModel,
    architectureDiagram,
    stateBefore,
    stateAfter,
    stateUnchanged,
    expectedOutput,
    safeFailure,
    recoverySteps,
    simulatorConfig,
    challengeComprehensive,
  } as UniversalDockerConcept;
}
