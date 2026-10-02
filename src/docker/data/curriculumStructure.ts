/**
 * DOCKER ACADEMY COMPLETE CURRICULUM SPECIFICATION
 * 68 Chapters · 1038 Subchapters
 */

export interface DockerSubchapterDef {
  number: string;
  title: string;
  commandOrConcept?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category?: string;
}

export interface DockerChapterDef {
  number: number;
  id: string;
  title: string;
  trackGroup: string;
  description: string;
  subchapters: DockerSubchapterDef[];
}

export const DOCKER_CURRICULUM_SPEC: DockerChapterDef[] = [
  {
    "number": 1,
    "id": "ch-01",
    "title": "CONTAINER FUNDAMENTALS",
    "trackGroup": "Foundations & Concepts",
    "description": "The paradigm shift from monolithic virtual machines to lightweight, isolated Linux container processes.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is a Container?",
        "commandOrConcept": "What is a Container?",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "02",
        "title": "Why Containers Exist",
        "commandOrConcept": "Why Containers Exist",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "03",
        "title": "The \"Works on My Machine\" Problem",
        "commandOrConcept": "The \"Works on My Machine\" Problem",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "04",
        "title": "Application Dependencies",
        "commandOrConcept": "Application Dependencies",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "05",
        "title": "Environment Consistency",
        "commandOrConcept": "Environment Consistency",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "06",
        "title": "Containers vs Processes",
        "commandOrConcept": "Containers vs Processes",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "07",
        "title": "Containers vs Virtual Machines",
        "commandOrConcept": "Containers vs Virtual Machines",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "08",
        "title": "Bare Metal vs Virtual Machines vs Containers",
        "commandOrConcept": "Bare Metal vs Virtual Machines vs Containers",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "09",
        "title": "Containers vs Sandboxes",
        "commandOrConcept": "Containers vs Sandboxes",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "10",
        "title": "Container Isolation",
        "commandOrConcept": "Container Isolation",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "11",
        "title": "Container Portability",
        "commandOrConcept": "Container Portability",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "12",
        "title": "Container Lifecycle",
        "commandOrConcept": "Container Lifecycle",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "13",
        "title": "Ephemeral Infrastructure",
        "commandOrConcept": "Ephemeral Infrastructure",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "14",
        "title": "Immutable Infrastructure",
        "commandOrConcept": "Immutable Infrastructure",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "15",
        "title": "Containerized Applications",
        "commandOrConcept": "Containerized Applications",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "16",
        "title": "Container Architecture",
        "commandOrConcept": "Container Architecture",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "17",
        "title": "Container Mental Model",
        "commandOrConcept": "Container Mental Model",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "18",
        "title": "Real-World Container Use Cases",
        "commandOrConcept": "Real-World Container Use Cases",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      }
    ]
  },
  {
    "number": 2,
    "id": "ch-02",
    "title": "DOCKER FUNDAMENTALS",
    "trackGroup": "Foundations & Concepts",
    "description": "The complete architectural anatomy of Docker Core, daemon, containerd, runc, and CLI.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is Docker?",
        "commandOrConcept": "What is Docker?",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "02",
        "title": "Why Docker?",
        "commandOrConcept": "Why Docker?",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "03",
        "title": "Docker History",
        "commandOrConcept": "Docker History",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "04",
        "title": "Docker Architecture",
        "commandOrConcept": "Docker Architecture",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "05",
        "title": "Docker Client",
        "commandOrConcept": "Docker Client",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "06",
        "title": "Docker Engine",
        "commandOrConcept": "Docker Engine",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "07",
        "title": "Docker Daemon",
        "commandOrConcept": "Docker Daemon",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "08",
        "title": "Docker CLI",
        "commandOrConcept": "Docker CLI",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "09",
        "title": "Docker Registry",
        "commandOrConcept": "Docker Registry",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "10",
        "title": "Docker Hub",
        "commandOrConcept": "Docker Hub",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "11",
        "title": "Docker Objects",
        "commandOrConcept": "Docker Objects",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "12",
        "title": "Images",
        "commandOrConcept": "Images",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "13",
        "title": "Containers",
        "commandOrConcept": "Containers",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "14",
        "title": "Networks",
        "commandOrConcept": "Networks",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "15",
        "title": "Volumes",
        "commandOrConcept": "Volumes",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "16",
        "title": "Plugins",
        "commandOrConcept": "Plugins",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "17",
        "title": "Docker Events",
        "commandOrConcept": "Docker Events",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "18",
        "title": "Docker API",
        "commandOrConcept": "Docker API",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "19",
        "title": "Docker Workflow",
        "commandOrConcept": "Docker Workflow",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      }
    ]
  },
  {
    "number": 3,
    "id": "ch-03",
    "title": "DOCKER INSTALLATION AND SETUP",
    "trackGroup": "Foundations & Concepts",
    "description": "Setting up Docker on Linux, macOS, and Windows with WSL2, socket configuration, and permissions.",
    "subchapters": [
      {
        "number": "01",
        "title": "Docker Installation Overview",
        "commandOrConcept": "Docker Installation Overview",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "02",
        "title": "Docker Desktop",
        "commandOrConcept": "Docker Desktop",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "03",
        "title": "Docker Engine",
        "commandOrConcept": "Docker Engine",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "04",
        "title": "Docker Engine on Linux",
        "commandOrConcept": "Docker Engine on Linux",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "05",
        "title": "Docker Desktop on Windows",
        "commandOrConcept": "Docker Desktop on Windows",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "06",
        "title": "Docker Desktop on macOS",
        "commandOrConcept": "Docker Desktop on macOS",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "07",
        "title": "WSL2",
        "commandOrConcept": "WSL2",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "08",
        "title": "Docker Desktop Virtualization",
        "commandOrConcept": "Docker Desktop Virtualization",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "09",
        "title": "Docker Daemon",
        "commandOrConcept": "Docker Daemon",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "10",
        "title": "Docker Socket",
        "commandOrConcept": "Docker Socket",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "11",
        "title": "Docker Context",
        "commandOrConcept": "Docker Context",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "12",
        "title": "Verify Installation",
        "commandOrConcept": "Verify Installation",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "13",
        "title": "docker version",
        "commandOrConcept": "docker version",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "14",
        "title": "docker info",
        "commandOrConcept": "docker info",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "15",
        "title": "Docker Configuration",
        "commandOrConcept": "Docker Configuration",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "16",
        "title": "Docker Data Directory",
        "commandOrConcept": "Docker Data Directory",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "17",
        "title": "Docker Storage Location",
        "commandOrConcept": "Docker Storage Location",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "18",
        "title": "Docker Service Management",
        "commandOrConcept": "Docker Service Management",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "19",
        "title": "Starting Docker",
        "commandOrConcept": "Starting Docker",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "20",
        "title": "Stopping Docker",
        "commandOrConcept": "Stopping Docker",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "21",
        "title": "Restarting Docker",
        "commandOrConcept": "Restarting Docker",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "22",
        "title": "Docker Permissions",
        "commandOrConcept": "Docker Permissions",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "23",
        "title": "Linux Docker Group",
        "commandOrConcept": "Linux Docker Group",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "24",
        "title": "Post-installation Configuration",
        "commandOrConcept": "Post-installation Configuration",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      },
      {
        "number": "25",
        "title": "Troubleshooting Installation",
        "commandOrConcept": "Troubleshooting Installation",
        "difficulty": "Beginner",
        "category": "Foundations & Concepts"
      }
    ]
  },
  {
    "number": 4,
    "id": "ch-04",
    "title": "DOCKER CLI FUNDAMENTALS",
    "trackGroup": "CLI & Operations",
    "description": "Command grammar, subcommands, formatting, JSON filtering, Go templates, and environment variables.",
    "subchapters": [
      {
        "number": "01",
        "title": "Docker CLI Overview",
        "commandOrConcept": "Docker CLI Overview",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "02",
        "title": "Docker Command Structure",
        "commandOrConcept": "Docker Command Structure",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "03",
        "title": "docker --help",
        "commandOrConcept": "docker --help",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "04",
        "title": "Global Options",
        "commandOrConcept": "Global Options",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "05",
        "title": "Command Options",
        "commandOrConcept": "Command Options",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "06",
        "title": "Subcommands",
        "commandOrConcept": "Subcommands",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "07",
        "title": "Command Arguments",
        "commandOrConcept": "Command Arguments",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "08",
        "title": "Command Output",
        "commandOrConcept": "Command Output",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "09",
        "title": "Exit Codes",
        "commandOrConcept": "Exit Codes",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "10",
        "title": "CLI Formatting",
        "commandOrConcept": "CLI Formatting",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "11",
        "title": "CLI Filtering",
        "commandOrConcept": "CLI Filtering",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "12",
        "title": "CLI Quiet Mode",
        "commandOrConcept": "CLI Quiet Mode",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "13",
        "title": "CLI JSON Output",
        "commandOrConcept": "CLI JSON Output",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "14",
        "title": "CLI Templates",
        "commandOrConcept": "CLI Templates",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "15",
        "title": "CLI Environment Variables",
        "commandOrConcept": "CLI Environment Variables",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "16",
        "title": "Docker Context",
        "commandOrConcept": "Docker Context",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "17",
        "title": "Docker CLI Configuration",
        "commandOrConcept": "Docker CLI Configuration",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      }
    ]
  },
  {
    "number": 5,
    "id": "ch-05",
    "title": "RUNNING CONTAINERS",
    "trackGroup": "CLI & Operations",
    "description": "The comprehensive mechanics of docker run: detached mode, interactive TTY, port bindings, and capabilities.",
    "subchapters": [
      {
        "number": "01",
        "title": "docker run",
        "commandOrConcept": "docker run",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "02",
        "title": "Image Selection",
        "commandOrConcept": "Image Selection",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "03",
        "title": "Container Naming",
        "commandOrConcept": "Container Naming",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "04",
        "title": "Foreground Containers",
        "commandOrConcept": "Foreground Containers",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "05",
        "title": "Detached Containers",
        "commandOrConcept": "Detached Containers",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "06",
        "title": "Interactive Containers",
        "commandOrConcept": "Interactive Containers",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "07",
        "title": "TTY",
        "commandOrConcept": "TTY",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "08",
        "title": "STDIN",
        "commandOrConcept": "STDIN",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "09",
        "title": "STDOUT",
        "commandOrConcept": "STDOUT",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "10",
        "title": "STDERR",
        "commandOrConcept": "STDERR",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "11",
        "title": "Port Mapping",
        "commandOrConcept": "Port Mapping",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "12",
        "title": "Environment Variables",
        "commandOrConcept": "Environment Variables",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "13",
        "title": "Container Hostname",
        "commandOrConcept": "Container Hostname",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "14",
        "title": "Container Restart Policies",
        "commandOrConcept": "Container Restart Policies",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "15",
        "title": "Container Labels",
        "commandOrConcept": "Container Labels",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "16",
        "title": "Container Working Directory",
        "commandOrConcept": "Container Working Directory",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "17",
        "title": "Container User",
        "commandOrConcept": "Container User",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "18",
        "title": "Container Capabilities",
        "commandOrConcept": "Container Capabilities",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "19",
        "title": "Container Entrypoint",
        "commandOrConcept": "Container Entrypoint",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "20",
        "title": "Container Command",
        "commandOrConcept": "Container Command",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "21",
        "title": "Container Resource Limits",
        "commandOrConcept": "Container Resource Limits",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "22",
        "title": "Container Networking Options",
        "commandOrConcept": "Container Networking Options",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "23",
        "title": "Container Volume Options",
        "commandOrConcept": "Container Volume Options",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "24",
        "title": "Container Security Options",
        "commandOrConcept": "Container Security Options",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "25",
        "title": "docker run Lifecycle",
        "commandOrConcept": "docker run Lifecycle",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "26",
        "title": "Practical docker run Examples",
        "commandOrConcept": "Practical docker run Examples",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      }
    ]
  },
  {
    "number": 6,
    "id": "ch-06",
    "title": "CONTAINER LIFECYCLE",
    "trackGroup": "CLI & Operations",
    "description": "States, signal propagation (SIGTERM vs SIGKILL), restart policies, and graceful teardown.",
    "subchapters": [
      {
        "number": "01",
        "title": "Container Creation",
        "commandOrConcept": "Container Creation",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "02",
        "title": "Container Starting",
        "commandOrConcept": "Container Starting",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "03",
        "title": "Running State",
        "commandOrConcept": "Running State",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "04",
        "title": "Paused State",
        "commandOrConcept": "Paused State",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "05",
        "title": "Stopped State",
        "commandOrConcept": "Stopped State",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "06",
        "title": "Restarting",
        "commandOrConcept": "Restarting",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "07",
        "title": "Killing",
        "commandOrConcept": "Killing",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "08",
        "title": "Removing",
        "commandOrConcept": "Removing",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "09",
        "title": "Exited Containers",
        "commandOrConcept": "Exited Containers",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "10",
        "title": "Dead Containers",
        "commandOrConcept": "Dead Containers",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "11",
        "title": "Container Exit Codes",
        "commandOrConcept": "Container Exit Codes",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "12",
        "title": "SIGTERM",
        "commandOrConcept": "SIGTERM",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "13",
        "title": "SIGKILL",
        "commandOrConcept": "SIGKILL",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "14",
        "title": "Graceful Shutdown",
        "commandOrConcept": "Graceful Shutdown",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "15",
        "title": "Container Restart Policies",
        "commandOrConcept": "Container Restart Policies",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "16",
        "title": "Container Lifecycle Diagram",
        "commandOrConcept": "Container Lifecycle Diagram",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      },
      {
        "number": "17",
        "title": "Container Lifecycle Troubleshooting",
        "commandOrConcept": "Container Lifecycle Troubleshooting",
        "difficulty": "Beginner",
        "category": "CLI & Operations"
      }
    ]
  },
  {
    "number": 7,
    "id": "ch-07",
    "title": "DOCKER IMAGES",
    "trackGroup": "Images & Storage",
    "description": "Layer architecture, content-addressable storage, digests, tags, dangling layer identification, and cleanup.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is a Docker Image?",
        "commandOrConcept": "What is a Docker Image?",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "02",
        "title": "Image Architecture",
        "commandOrConcept": "Image Architecture",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "03",
        "title": "Image Layers",
        "commandOrConcept": "Image Layers",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "04",
        "title": "Read-Only Layers",
        "commandOrConcept": "Read-Only Layers",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "05",
        "title": "Image Metadata",
        "commandOrConcept": "Image Metadata",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "06",
        "title": "Image IDs",
        "commandOrConcept": "Image IDs",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "07",
        "title": "Image Tags",
        "commandOrConcept": "Image Tags",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "08",
        "title": "Image Digests",
        "commandOrConcept": "Image Digests",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "09",
        "title": "Image References",
        "commandOrConcept": "Image References",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "10",
        "title": "Image Names",
        "commandOrConcept": "Image Names",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "11",
        "title": "Image Repositories",
        "commandOrConcept": "Image Repositories",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "12",
        "title": "Pulling Images",
        "commandOrConcept": "Pulling Images",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "13",
        "title": "Listing Images",
        "commandOrConcept": "Listing Images",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "14",
        "title": "Inspecting Images",
        "commandOrConcept": "Inspecting Images",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "15",
        "title": "Removing Images",
        "commandOrConcept": "Removing Images",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "16",
        "title": "Tagging Images",
        "commandOrConcept": "Tagging Images",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "17",
        "title": "Retagging Images",
        "commandOrConcept": "Retagging Images",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "18",
        "title": "Image History",
        "commandOrConcept": "Image History",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "19",
        "title": "Dangling Images",
        "commandOrConcept": "Dangling Images",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "20",
        "title": "Intermediate Images",
        "commandOrConcept": "Intermediate Images",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "21",
        "title": "Image Cleanup",
        "commandOrConcept": "Image Cleanup",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "22",
        "title": "Image Immutability",
        "commandOrConcept": "Image Immutability",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "23",
        "title": "Image Reproducibility",
        "commandOrConcept": "Image Reproducibility",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      }
    ]
  },
  {
    "number": 8,
    "id": "ch-08",
    "title": "DOCKER REGISTRIES",
    "trackGroup": "Images & Storage",
    "description": "Docker Hub, private registries (GHCR, ECR, Harbor), authentication, distribution, and garbage collection.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is a Container Registry?",
        "commandOrConcept": "What is a Container Registry?",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "02",
        "title": "Registry Architecture",
        "commandOrConcept": "Registry Architecture",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "03",
        "title": "Docker Hub",
        "commandOrConcept": "Docker Hub",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "04",
        "title": "Public Registries",
        "commandOrConcept": "Public Registries",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "05",
        "title": "Private Registries",
        "commandOrConcept": "Private Registries",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "06",
        "title": "Repository Structure",
        "commandOrConcept": "Repository Structure",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "07",
        "title": "Image Tags",
        "commandOrConcept": "Image Tags",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "08",
        "title": "Image Digests",
        "commandOrConcept": "Image Digests",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "09",
        "title": "docker login",
        "commandOrConcept": "docker login",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "10",
        "title": "Authentication",
        "commandOrConcept": "Authentication",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "11",
        "title": "docker pull",
        "commandOrConcept": "docker pull",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "12",
        "title": "docker push",
        "commandOrConcept": "docker push",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "13",
        "title": "docker tag",
        "commandOrConcept": "docker tag",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "14",
        "title": "Registry Permissions",
        "commandOrConcept": "Registry Permissions",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "15",
        "title": "Private Registry Security",
        "commandOrConcept": "Private Registry Security",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "16",
        "title": "Registry Storage",
        "commandOrConcept": "Registry Storage",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "17",
        "title": "Registry Garbage Collection",
        "commandOrConcept": "Registry Garbage Collection",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "18",
        "title": "Image Retention",
        "commandOrConcept": "Image Retention",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      },
      {
        "number": "19",
        "title": "Registry Best Practices",
        "commandOrConcept": "Registry Best Practices",
        "difficulty": "Beginner",
        "category": "Images & Storage"
      }
    ]
  },
  {
    "number": 9,
    "id": "ch-09",
    "title": "DOCKERFILES",
    "trackGroup": "Build & Packaging",
    "description": "Deep breakdown of every Dockerfile instruction from FROM to STOPSIGNAL and ONBUILD.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is a Dockerfile?",
        "commandOrConcept": "What is a Dockerfile?",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "02",
        "title": "Dockerfile Structure",
        "commandOrConcept": "Dockerfile Structure",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "03",
        "title": "Build Context",
        "commandOrConcept": "Build Context",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "04",
        "title": "FROM",
        "commandOrConcept": "FROM",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "05",
        "title": "RUN",
        "commandOrConcept": "RUN",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "06",
        "title": "CMD",
        "commandOrConcept": "CMD",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "07",
        "title": "ENTRYPOINT",
        "commandOrConcept": "ENTRYPOINT",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "08",
        "title": "COPY",
        "commandOrConcept": "COPY",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "09",
        "title": "ADD",
        "commandOrConcept": "ADD",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "10",
        "title": "WORKDIR",
        "commandOrConcept": "WORKDIR",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "11",
        "title": "ENV",
        "commandOrConcept": "ENV",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "12",
        "title": "ARG",
        "commandOrConcept": "ARG",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "13",
        "title": "USER",
        "commandOrConcept": "USER",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "14",
        "title": "EXPOSE",
        "commandOrConcept": "EXPOSE",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "15",
        "title": "VOLUME",
        "commandOrConcept": "VOLUME",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "16",
        "title": "LABEL",
        "commandOrConcept": "LABEL",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "17",
        "title": "STOPSIGNAL",
        "commandOrConcept": "STOPSIGNAL",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "18",
        "title": "HEALTHCHECK",
        "commandOrConcept": "HEALTHCHECK",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "19",
        "title": "SHELL",
        "commandOrConcept": "SHELL",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "20",
        "title": "ONBUILD",
        "commandOrConcept": "ONBUILD",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "21",
        "title": "Dockerfile Comments",
        "commandOrConcept": "Dockerfile Comments",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "22",
        "title": "Instruction Ordering",
        "commandOrConcept": "Instruction Ordering",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "23",
        "title": "Dockerfile Best Practices",
        "commandOrConcept": "Dockerfile Best Practices",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "24",
        "title": "Dockerfile Anti-Patterns",
        "commandOrConcept": "Dockerfile Anti-Patterns",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      }
    ]
  },
  {
    "number": 10,
    "id": "ch-10",
    "title": "BUILDING IMAGES",
    "trackGroup": "Build & Packaging",
    "description": "BuildKit engine, build context transmission, secret mounts, ssh forwarding, and multi-platform compilation.",
    "subchapters": [
      {
        "number": "01",
        "title": "docker build",
        "commandOrConcept": "docker build",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "02",
        "title": "Build Context",
        "commandOrConcept": "Build Context",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "03",
        "title": "Build Output",
        "commandOrConcept": "Build Output",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "04",
        "title": "Image Tags",
        "commandOrConcept": "Image Tags",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "05",
        "title": "Build Arguments",
        "commandOrConcept": "Build Arguments",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "06",
        "title": "Build Cache",
        "commandOrConcept": "Build Cache",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "07",
        "title": "Cache Hits",
        "commandOrConcept": "Cache Hits",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "08",
        "title": "Cache Misses",
        "commandOrConcept": "Cache Misses",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "09",
        "title": "Layer Creation",
        "commandOrConcept": "Layer Creation",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "10",
        "title": "BuildKit",
        "commandOrConcept": "BuildKit",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "11",
        "title": "Buildx",
        "commandOrConcept": "Buildx",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "12",
        "title": "Build Progress",
        "commandOrConcept": "Build Progress",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "13",
        "title": "Build Secrets",
        "commandOrConcept": "Build Secrets",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "14",
        "title": "SSH Mounts",
        "commandOrConcept": "SSH Mounts",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "15",
        "title": "Build Outputs",
        "commandOrConcept": "Build Outputs",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "16",
        "title": "Local Builds",
        "commandOrConcept": "Local Builds",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "17",
        "title": "Remote Builds",
        "commandOrConcept": "Remote Builds",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "18",
        "title": "Multi-Platform Builds",
        "commandOrConcept": "Multi-Platform Builds",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "19",
        "title": "Reproducible Builds",
        "commandOrConcept": "Reproducible Builds",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      },
      {
        "number": "20",
        "title": "Build Troubleshooting",
        "commandOrConcept": "Build Troubleshooting",
        "difficulty": "Beginner",
        "category": "Build & Packaging"
      }
    ]
  },
  {
    "number": 11,
    "id": "ch-11",
    "title": "IMAGE LAYERS AND BUILD CACHE",
    "trackGroup": "Build & Packaging",
    "description": "Maximizing layer cache reuse, package manager cache mounts, layer ordering, and build optimization.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is a Layer?",
        "commandOrConcept": "What is a Layer?",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "02",
        "title": "Layer Architecture",
        "commandOrConcept": "Layer Architecture",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "03",
        "title": "Layer Creation",
        "commandOrConcept": "Layer Creation",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "04",
        "title": "Layer Reuse",
        "commandOrConcept": "Layer Reuse",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "05",
        "title": "Cache Mechanics",
        "commandOrConcept": "Cache Mechanics",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "06",
        "title": "Cache Invalidation",
        "commandOrConcept": "Cache Invalidation",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "07",
        "title": "Cache Ordering",
        "commandOrConcept": "Cache Ordering",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "08",
        "title": "Dependency Installation",
        "commandOrConcept": "Dependency Installation",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "09",
        "title": "Source Code Layers",
        "commandOrConcept": "Source Code Layers",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "10",
        "title": "Package Manager Cache",
        "commandOrConcept": "Package Manager Cache",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "11",
        "title": "Build Cache Optimization",
        "commandOrConcept": "Build Cache Optimization",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "12",
        "title": "Cache Mounts",
        "commandOrConcept": "Cache Mounts",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "13",
        "title": "External Cache",
        "commandOrConcept": "External Cache",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "14",
        "title": "Registry Cache",
        "commandOrConcept": "Registry Cache",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "15",
        "title": "CI Build Cache",
        "commandOrConcept": "CI Build Cache",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "16",
        "title": "Layer Debugging",
        "commandOrConcept": "Layer Debugging",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "17",
        "title": "Build Performance Optimization",
        "commandOrConcept": "Build Performance Optimization",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      }
    ]
  },
  {
    "number": 12,
    "id": "ch-12",
    "title": "MULTI-STAGE BUILDS",
    "trackGroup": "Build & Packaging",
    "description": "The builder pattern, minimal distroless and scratch runtime images for Go, Node, Python, and Java.",
    "subchapters": [
      {
        "number": "01",
        "title": "Why Multi-Stage Builds?",
        "commandOrConcept": "Why Multi-Stage Builds?",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "02",
        "title": "Build Stage",
        "commandOrConcept": "Build Stage",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "03",
        "title": "Runtime Stage",
        "commandOrConcept": "Runtime Stage",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "04",
        "title": "Multiple FROM Instructions",
        "commandOrConcept": "Multiple FROM Instructions",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "05",
        "title": "Named Build Stages",
        "commandOrConcept": "Named Build Stages",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "06",
        "title": "COPY --from",
        "commandOrConcept": "COPY --from",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "07",
        "title": "Builder Pattern",
        "commandOrConcept": "Builder Pattern",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "08",
        "title": "Compiled Applications",
        "commandOrConcept": "Compiled Applications",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "09",
        "title": "Node.js Applications",
        "commandOrConcept": "Node.js Applications",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "10",
        "title": "Python Applications",
        "commandOrConcept": "Python Applications",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "11",
        "title": "Go Applications",
        "commandOrConcept": "Go Applications",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "12",
        "title": "Java Applications",
        "commandOrConcept": "Java Applications",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "13",
        "title": "Minimal Runtime Images",
        "commandOrConcept": "Minimal Runtime Images",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "14",
        "title": "Scratch",
        "commandOrConcept": "Scratch",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "15",
        "title": "Distroless Images",
        "commandOrConcept": "Distroless Images",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "16",
        "title": "Multi-Stage Security",
        "commandOrConcept": "Multi-Stage Security",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "17",
        "title": "Multi-Stage Optimization",
        "commandOrConcept": "Multi-Stage Optimization",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "18",
        "title": "Production Multi-Stage Patterns",
        "commandOrConcept": "Production Multi-Stage Patterns",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      }
    ]
  },
  {
    "number": 13,
    "id": "ch-13",
    "title": "DOCKERIGNORE",
    "trackGroup": "Build & Packaging",
    "description": "Protecting secrets, slimming context transfer from gigabytes to megabytes, and glob patterns.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is .dockerignore?",
        "commandOrConcept": "What is .dockerignore?",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "02",
        "title": "Why .dockerignore?",
        "commandOrConcept": "Why .dockerignore?",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "03",
        "title": "Build Context Size",
        "commandOrConcept": "Build Context Size",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "04",
        "title": "Ignore Patterns",
        "commandOrConcept": "Ignore Patterns",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "05",
        "title": "Glob Patterns",
        "commandOrConcept": "Glob Patterns",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "06",
        "title": "Excluding Git",
        "commandOrConcept": "Excluding Git",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "07",
        "title": "Excluding Dependencies",
        "commandOrConcept": "Excluding Dependencies",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "08",
        "title": "Excluding Secrets",
        "commandOrConcept": "Excluding Secrets",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "09",
        "title": "Excluding Build Artifacts",
        "commandOrConcept": "Excluding Build Artifacts",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "10",
        "title": "Dockerignore Best Practices",
        "commandOrConcept": "Dockerignore Best Practices",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      },
      {
        "number": "11",
        "title": "Dockerignore Security",
        "commandOrConcept": "Dockerignore Security",
        "difficulty": "Intermediate",
        "category": "Build & Packaging"
      }
    ]
  },
  {
    "number": 14,
    "id": "ch-14",
    "title": "CONTAINER FILESYSTEM",
    "trackGroup": "Images & Storage",
    "description": "Copy-on-write, writable container top layer, read-only root layers, and docker diff forensics.",
    "subchapters": [
      {
        "number": "01",
        "title": "Container Filesystem",
        "commandOrConcept": "Container Filesystem",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "02",
        "title": "Writable Container Layer",
        "commandOrConcept": "Writable Container Layer",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "03",
        "title": "Read-Only Image Layers",
        "commandOrConcept": "Read-Only Image Layers",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "04",
        "title": "Copy-on-Write",
        "commandOrConcept": "Copy-on-Write",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "05",
        "title": "File Changes",
        "commandOrConcept": "File Changes",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "06",
        "title": "docker diff",
        "commandOrConcept": "docker diff",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "07",
        "title": "Container Filesystem Persistence",
        "commandOrConcept": "Container Filesystem Persistence",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "08",
        "title": "Ephemeral Data",
        "commandOrConcept": "Ephemeral Data",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "09",
        "title": "Container Data Lifecycle",
        "commandOrConcept": "Container Data Lifecycle",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "10",
        "title": "Filesystem Troubleshooting",
        "commandOrConcept": "Filesystem Troubleshooting",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      }
    ]
  },
  {
    "number": 15,
    "id": "ch-15",
    "title": "DOCKER VOLUMES",
    "trackGroup": "Images & Storage",
    "description": "Managed named volumes, driver ecosystems, backup, restore, migration, and persistent data.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is a Volume?",
        "commandOrConcept": "What is a Volume?",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "02",
        "title": "Why Volumes?",
        "commandOrConcept": "Why Volumes?",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "03",
        "title": "Named Volumes",
        "commandOrConcept": "Named Volumes",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "04",
        "title": "Anonymous Volumes",
        "commandOrConcept": "Anonymous Volumes",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "05",
        "title": "docker volume create",
        "commandOrConcept": "docker volume create",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "06",
        "title": "docker volume ls",
        "commandOrConcept": "docker volume ls",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "07",
        "title": "docker volume inspect",
        "commandOrConcept": "docker volume inspect",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "08",
        "title": "docker volume rm",
        "commandOrConcept": "docker volume rm",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "09",
        "title": "Volume Mounting",
        "commandOrConcept": "Volume Mounting",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "10",
        "title": "Volume Drivers",
        "commandOrConcept": "Volume Drivers",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "11",
        "title": "Volume Permissions",
        "commandOrConcept": "Volume Permissions",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "12",
        "title": "Volume Backup",
        "commandOrConcept": "Volume Backup",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "13",
        "title": "Volume Restore",
        "commandOrConcept": "Volume Restore",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "14",
        "title": "Volume Migration",
        "commandOrConcept": "Volume Migration",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "15",
        "title": "Volume Security",
        "commandOrConcept": "Volume Security",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "16",
        "title": "Volume Cleanup",
        "commandOrConcept": "Volume Cleanup",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "17",
        "title": "Production Volume Patterns",
        "commandOrConcept": "Production Volume Patterns",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      }
    ]
  },
  {
    "number": 16,
    "id": "ch-16",
    "title": "BIND MOUNTS",
    "trackGroup": "Images & Storage",
    "description": "Host path mounting, live code reload in development, permission mapping, and security boundaries.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is a Bind Mount?",
        "commandOrConcept": "What is a Bind Mount?",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "02",
        "title": "Bind Mount vs Volume",
        "commandOrConcept": "Bind Mount vs Volume",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "03",
        "title": "Host Path",
        "commandOrConcept": "Host Path",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "04",
        "title": "Container Path",
        "commandOrConcept": "Container Path",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "05",
        "title": "Read-Only Bind Mounts",
        "commandOrConcept": "Read-Only Bind Mounts",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "06",
        "title": "Development Bind Mounts",
        "commandOrConcept": "Development Bind Mounts",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "07",
        "title": "Source Code Mounting",
        "commandOrConcept": "Source Code Mounting",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "08",
        "title": "Configuration Mounting",
        "commandOrConcept": "Configuration Mounting",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "09",
        "title": "Permission Problems",
        "commandOrConcept": "Permission Problems",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "10",
        "title": "Security Risks",
        "commandOrConcept": "Security Risks",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "11",
        "title": "Bind Mount Performance",
        "commandOrConcept": "Bind Mount Performance",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "12",
        "title": "Production Considerations",
        "commandOrConcept": "Production Considerations",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      }
    ]
  },
  {
    "number": 17,
    "id": "ch-17",
    "title": "TMPFS MOUNTS",
    "trackGroup": "Images & Storage",
    "description": "In-memory ephemeral storage for ultra-high performance and sensitive temporary token handling.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is tmpfs?",
        "commandOrConcept": "What is tmpfs?",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "02",
        "title": "Memory-Backed Storage",
        "commandOrConcept": "Memory-Backed Storage",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "03",
        "title": "tmpfs Syntax",
        "commandOrConcept": "tmpfs Syntax",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "04",
        "title": "tmpfs vs Volumes",
        "commandOrConcept": "tmpfs vs Volumes",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "05",
        "title": "tmpfs vs Bind Mounts",
        "commandOrConcept": "tmpfs vs Bind Mounts",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "06",
        "title": "Temporary Data",
        "commandOrConcept": "Temporary Data",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "07",
        "title": "Sensitive Temporary Data",
        "commandOrConcept": "Sensitive Temporary Data",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "08",
        "title": "Performance",
        "commandOrConcept": "Performance",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "09",
        "title": "Limitations",
        "commandOrConcept": "Limitations",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      },
      {
        "number": "10",
        "title": "Production Use Cases",
        "commandOrConcept": "Production Use Cases",
        "difficulty": "Intermediate",
        "category": "Images & Storage"
      }
    ]
  },
  {
    "number": 18,
    "id": "ch-18",
    "title": "DOCKER NETWORKING FUNDAMENTALS",
    "trackGroup": "Networking",
    "description": "Linux veth pairs, network namespaces, default bridge, user-defined bridges, and DNS resolution.",
    "subchapters": [
      {
        "number": "01",
        "title": "Container Networking",
        "commandOrConcept": "Container Networking",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "02",
        "title": "Network Namespace",
        "commandOrConcept": "Network Namespace",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "03",
        "title": "Container IP Addresses",
        "commandOrConcept": "Container IP Addresses",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "04",
        "title": "Virtual Ethernet Interfaces",
        "commandOrConcept": "Virtual Ethernet Interfaces",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "05",
        "title": "Docker Bridge",
        "commandOrConcept": "Docker Bridge",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "06",
        "title": "Default Bridge Network",
        "commandOrConcept": "Default Bridge Network",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "07",
        "title": "User-Defined Bridge Networks",
        "commandOrConcept": "User-Defined Bridge Networks",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "08",
        "title": "Network Isolation",
        "commandOrConcept": "Network Isolation",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "09",
        "title": "Container-to-Container Communication",
        "commandOrConcept": "Container-to-Container Communication",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "10",
        "title": "Host-to-Container Communication",
        "commandOrConcept": "Host-to-Container Communication",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "11",
        "title": "Container-to-Internet Communication",
        "commandOrConcept": "Container-to-Internet Communication",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "12",
        "title": "DNS Resolution",
        "commandOrConcept": "DNS Resolution",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "13",
        "title": "Port Publishing",
        "commandOrConcept": "Port Publishing",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "14",
        "title": "Network Troubleshooting",
        "commandOrConcept": "Network Troubleshooting",
        "difficulty": "Intermediate",
        "category": "Networking"
      }
    ]
  },
  {
    "number": 19,
    "id": "ch-19",
    "title": "DOCKER NETWORK DRIVERS",
    "trackGroup": "Networking",
    "description": "Deep comparison of bridge, host, none, overlay, macvlan, and ipvlan drivers.",
    "subchapters": [
      {
        "number": "01",
        "title": "Bridge",
        "commandOrConcept": "Bridge",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "02",
        "title": "Host",
        "commandOrConcept": "Host",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "03",
        "title": "None",
        "commandOrConcept": "None",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "04",
        "title": "Overlay",
        "commandOrConcept": "Overlay",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "05",
        "title": "Macvlan",
        "commandOrConcept": "Macvlan",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "06",
        "title": "IPvlan",
        "commandOrConcept": "IPvlan",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "07",
        "title": "Custom Network Drivers",
        "commandOrConcept": "Custom Network Drivers",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "08",
        "title": "Network Driver Selection",
        "commandOrConcept": "Network Driver Selection",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "09",
        "title": "Network Isolation",
        "commandOrConcept": "Network Isolation",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "10",
        "title": "Network Security",
        "commandOrConcept": "Network Security",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "11",
        "title": "Network Performance",
        "commandOrConcept": "Network Performance",
        "difficulty": "Intermediate",
        "category": "Networking"
      }
    ]
  },
  {
    "number": 20,
    "id": "ch-20",
    "title": "DOCKER NETWORK COMMANDS",
    "trackGroup": "Networking",
    "description": "Full operational suite: network create, connect, disconnect, inspect, IPAM subnets, and gateways.",
    "subchapters": [
      {
        "number": "01",
        "title": "docker network ls",
        "commandOrConcept": "docker network ls",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "02",
        "title": "docker network create",
        "commandOrConcept": "docker network create",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "03",
        "title": "docker network inspect",
        "commandOrConcept": "docker network inspect",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "04",
        "title": "docker network connect",
        "commandOrConcept": "docker network connect",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "05",
        "title": "docker network disconnect",
        "commandOrConcept": "docker network disconnect",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "06",
        "title": "docker network rm",
        "commandOrConcept": "docker network rm",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "07",
        "title": "Network Containers",
        "commandOrConcept": "Network Containers",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "08",
        "title": "Network Aliases",
        "commandOrConcept": "Network Aliases",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "09",
        "title": "Network Subnets",
        "commandOrConcept": "Network Subnets",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "10",
        "title": "Network Gateways",
        "commandOrConcept": "Network Gateways",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "11",
        "title": "Network IPAM",
        "commandOrConcept": "Network IPAM",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "12",
        "title": "Network Troubleshooting",
        "commandOrConcept": "Network Troubleshooting",
        "difficulty": "Intermediate",
        "category": "Networking"
      }
    ]
  },
  {
    "number": 21,
    "id": "ch-21",
    "title": "DOCKER DNS AND SERVICE DISCOVERY",
    "trackGroup": "Networking",
    "description": "Embedded 127.0.0.11 DNS resolver, container name resolution, network aliases, and search domains.",
    "subchapters": [
      {
        "number": "01",
        "title": "Docker Embedded DNS",
        "commandOrConcept": "Docker Embedded DNS",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "02",
        "title": "Container Name Resolution",
        "commandOrConcept": "Container Name Resolution",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "03",
        "title": "Network Aliases",
        "commandOrConcept": "Network Aliases",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "04",
        "title": "Service Discovery",
        "commandOrConcept": "Service Discovery",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "05",
        "title": "DNS Resolution",
        "commandOrConcept": "DNS Resolution",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "06",
        "title": "DNS Configuration",
        "commandOrConcept": "DNS Configuration",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "07",
        "title": "Custom DNS Servers",
        "commandOrConcept": "Custom DNS Servers",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "08",
        "title": "Hostname",
        "commandOrConcept": "Hostname",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "09",
        "title": "/etc/hosts",
        "commandOrConcept": "/etc/hosts",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "10",
        "title": "DNS Troubleshooting",
        "commandOrConcept": "DNS Troubleshooting",
        "difficulty": "Intermediate",
        "category": "Networking"
      }
    ]
  },
  {
    "number": 22,
    "id": "ch-22",
    "title": "PORTS AND TRAFFIC",
    "trackGroup": "Networking",
    "description": "Exposing vs publishing ports, ephemeral ports, TCP/UDP mapping, IPv4/IPv6 binding, and port conflicts.",
    "subchapters": [
      {
        "number": "01",
        "title": "Container Ports",
        "commandOrConcept": "Container Ports",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "02",
        "title": "Published Ports",
        "commandOrConcept": "Published Ports",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "03",
        "title": "EXPOSE",
        "commandOrConcept": "EXPOSE",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "04",
        "title": "-p",
        "commandOrConcept": "-p",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "05",
        "title": "-P",
        "commandOrConcept": "-P",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "06",
        "title": "Host Port",
        "commandOrConcept": "Host Port",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "07",
        "title": "Container Port",
        "commandOrConcept": "Container Port",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "08",
        "title": "TCP",
        "commandOrConcept": "TCP",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "09",
        "title": "UDP",
        "commandOrConcept": "UDP",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "10",
        "title": "Port Ranges",
        "commandOrConcept": "Port Ranges",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "11",
        "title": "IPv4",
        "commandOrConcept": "IPv4",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "12",
        "title": "IPv6",
        "commandOrConcept": "IPv6",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "13",
        "title": "Port Conflicts",
        "commandOrConcept": "Port Conflicts",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "14",
        "title": "Port Security",
        "commandOrConcept": "Port Security",
        "difficulty": "Intermediate",
        "category": "Networking"
      },
      {
        "number": "15",
        "title": "Troubleshooting Ports",
        "commandOrConcept": "Troubleshooting Ports",
        "difficulty": "Intermediate",
        "category": "Networking"
      }
    ]
  },
  {
    "number": 23,
    "id": "ch-23",
    "title": "DOCKER ENVIRONMENT VARIABLES",
    "trackGroup": "Configuration & Security",
    "description": "ENV vs ARG, run-time overrides, --env-file parsing, process environment inheritance, and security.",
    "subchapters": [
      {
        "number": "01",
        "title": "Environment Variables",
        "commandOrConcept": "Environment Variables",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "02",
        "title": "ENV",
        "commandOrConcept": "ENV",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "03",
        "title": "docker run -e",
        "commandOrConcept": "docker run -e",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "04",
        "title": "--env-file",
        "commandOrConcept": "--env-file",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "05",
        "title": "Build ARG vs ENV",
        "commandOrConcept": "Build ARG vs ENV",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "06",
        "title": "Environment Variable Scope",
        "commandOrConcept": "Environment Variable Scope",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "07",
        "title": "Environment Variables in Applications",
        "commandOrConcept": "Environment Variables in Applications",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "08",
        "title": "Configuration Management",
        "commandOrConcept": "Configuration Management",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "09",
        "title": "Secrets vs Environment Variables",
        "commandOrConcept": "Secrets vs Environment Variables",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "10",
        "title": "Environment Best Practices",
        "commandOrConcept": "Environment Best Practices",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      }
    ]
  },
  {
    "number": 24,
    "id": "ch-24",
    "title": "DOCKER SECRETS",
    "trackGroup": "Configuration & Security",
    "description": "Managing API keys and DB credentials securely via secret mounts, tmpfs, and Swarm secrets.",
    "subchapters": [
      {
        "number": "01",
        "title": "What are Secrets?",
        "commandOrConcept": "What are Secrets?",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "02",
        "title": "Why Secrets?",
        "commandOrConcept": "Why Secrets?",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "03",
        "title": "Secrets vs Environment Variables",
        "commandOrConcept": "Secrets vs Environment Variables",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "04",
        "title": "Docker Swarm Secrets",
        "commandOrConcept": "Docker Swarm Secrets",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "05",
        "title": "Secret Mounts",
        "commandOrConcept": "Secret Mounts",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "06",
        "title": "Secret Files",
        "commandOrConcept": "Secret Files",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "07",
        "title": "Secret Permissions",
        "commandOrConcept": "Secret Permissions",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "08",
        "title": "Secret Rotation",
        "commandOrConcept": "Secret Rotation",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "09",
        "title": "Secret Security",
        "commandOrConcept": "Secret Security",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      },
      {
        "number": "10",
        "title": "Secret Management Best Practices",
        "commandOrConcept": "Secret Management Best Practices",
        "difficulty": "Intermediate",
        "category": "Configuration & Security"
      }
    ]
  },
  {
    "number": 25,
    "id": "ch-25",
    "title": "CONTAINER PROCESSES",
    "trackGroup": "Linux Internals",
    "description": "PID 1 responsibilities, zombie process reaping, signal forwarding, exec vs shell form, and init systems.",
    "subchapters": [
      {
        "number": "01",
        "title": "PID 1",
        "commandOrConcept": "PID 1",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "02",
        "title": "Container Main Process",
        "commandOrConcept": "Container Main Process",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "03",
        "title": "Process Signals",
        "commandOrConcept": "Process Signals",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "04",
        "title": "Signal Handling",
        "commandOrConcept": "Signal Handling",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "05",
        "title": "Zombie Processes",
        "commandOrConcept": "Zombie Processes",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "06",
        "title": "Reaping Processes",
        "commandOrConcept": "Reaping Processes",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "07",
        "title": "ENTRYPOINT",
        "commandOrConcept": "ENTRYPOINT",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "08",
        "title": "CMD",
        "commandOrConcept": "CMD",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "09",
        "title": "Process Managers",
        "commandOrConcept": "Process Managers",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "10",
        "title": "exec vs shell form",
        "commandOrConcept": "exec vs shell form",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "11",
        "title": "Graceful Shutdown",
        "commandOrConcept": "Graceful Shutdown",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "12",
        "title": "Process Troubleshooting",
        "commandOrConcept": "Process Troubleshooting",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      }
    ]
  },
  {
    "number": 26,
    "id": "ch-26",
    "title": "DOCKER EXEC AND INTERACTIVE DEBUGGING",
    "trackGroup": "CLI & Operations",
    "description": "Attaching interactive shells, executing one-off forensics commands, and debugging distroless images.",
    "subchapters": [
      {
        "number": "01",
        "title": "docker exec",
        "commandOrConcept": "docker exec",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "02",
        "title": "Interactive Shell",
        "commandOrConcept": "Interactive Shell",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "03",
        "title": "TTY",
        "commandOrConcept": "TTY",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "04",
        "title": "sh",
        "commandOrConcept": "sh",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "05",
        "title": "bash",
        "commandOrConcept": "bash",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "06",
        "title": "Executing Commands",
        "commandOrConcept": "Executing Commands",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "07",
        "title": "Inspecting Processes",
        "commandOrConcept": "Inspecting Processes",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "08",
        "title": "Inspecting Files",
        "commandOrConcept": "Inspecting Files",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "09",
        "title": "Inspecting Environment",
        "commandOrConcept": "Inspecting Environment",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "10",
        "title": "Debugging Running Containers",
        "commandOrConcept": "Debugging Running Containers",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "11",
        "title": "Debugging Minimal Images",
        "commandOrConcept": "Debugging Minimal Images",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "12",
        "title": "Debugging Without Shells",
        "commandOrConcept": "Debugging Without Shells",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      }
    ]
  },
  {
    "number": 27,
    "id": "ch-27",
    "title": "DOCKER LOGGING",
    "trackGroup": "CLI & Operations",
    "description": "Logging drivers (json-file, syslog, journald, Fluentd, cloud), log rotation, and stream debugging.",
    "subchapters": [
      {
        "number": "01",
        "title": "Container Logs",
        "commandOrConcept": "Container Logs",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "02",
        "title": "stdout",
        "commandOrConcept": "stdout",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "03",
        "title": "stderr",
        "commandOrConcept": "stderr",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "04",
        "title": "docker logs",
        "commandOrConcept": "docker logs",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "05",
        "title": "docker logs -f",
        "commandOrConcept": "docker logs -f",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "06",
        "title": "Tail Logs",
        "commandOrConcept": "Tail Logs",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "07",
        "title": "Timestamped Logs",
        "commandOrConcept": "Timestamped Logs",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "08",
        "title": "Log Drivers",
        "commandOrConcept": "Log Drivers",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "09",
        "title": "json-file",
        "commandOrConcept": "json-file",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "10",
        "title": "local",
        "commandOrConcept": "local",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "11",
        "title": "syslog",
        "commandOrConcept": "syslog",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "12",
        "title": "journald",
        "commandOrConcept": "journald",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "13",
        "title": "Fluentd",
        "commandOrConcept": "Fluentd",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "14",
        "title": "GELF",
        "commandOrConcept": "GELF",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "15",
        "title": "Splunk",
        "commandOrConcept": "Splunk",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "16",
        "title": "Cloud Logging",
        "commandOrConcept": "Cloud Logging",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "17",
        "title": "Log Rotation",
        "commandOrConcept": "Log Rotation",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "18",
        "title": "Logging Architecture",
        "commandOrConcept": "Logging Architecture",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "19",
        "title": "Logging Security",
        "commandOrConcept": "Logging Security",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "20",
        "title": "Logging Troubleshooting",
        "commandOrConcept": "Logging Troubleshooting",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      }
    ]
  },
  {
    "number": 28,
    "id": "ch-28",
    "title": "DOCKER INSPECT AND METADATA",
    "trackGroup": "CLI & Operations",
    "description": "Querying low-level container, image, and network JSON schemas with Go format templates.",
    "subchapters": [
      {
        "number": "01",
        "title": "docker inspect",
        "commandOrConcept": "docker inspect",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "02",
        "title": "Container Metadata",
        "commandOrConcept": "Container Metadata",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "03",
        "title": "Image Metadata",
        "commandOrConcept": "Image Metadata",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "04",
        "title": "Network Metadata",
        "commandOrConcept": "Network Metadata",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "05",
        "title": "Volume Metadata",
        "commandOrConcept": "Volume Metadata",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "06",
        "title": "JSON Output",
        "commandOrConcept": "JSON Output",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "07",
        "title": "Go Templates",
        "commandOrConcept": "Go Templates",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "08",
        "title": "Filtering Inspect Output",
        "commandOrConcept": "Filtering Inspect Output",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "09",
        "title": "Inspecting Configuration",
        "commandOrConcept": "Inspecting Configuration",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "10",
        "title": "Inspecting Mounts",
        "commandOrConcept": "Inspecting Mounts",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "11",
        "title": "Inspecting Networks",
        "commandOrConcept": "Inspecting Networks",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "12",
        "title": "Inspecting Environment",
        "commandOrConcept": "Inspecting Environment",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      },
      {
        "number": "13",
        "title": "Inspect Troubleshooting",
        "commandOrConcept": "Inspect Troubleshooting",
        "difficulty": "Intermediate",
        "category": "CLI & Operations"
      }
    ]
  },
  {
    "number": 29,
    "id": "ch-29",
    "title": "DOCKER STATS AND RESOURCE MANAGEMENT",
    "trackGroup": "Performance & Optimization",
    "description": "Live CPU, memory, block I/O, network bandwidth metrics, and tuning container CPU/RAM quotas.",
    "subchapters": [
      {
        "number": "01",
        "title": "Container Resource Usage",
        "commandOrConcept": "Container Resource Usage",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "02",
        "title": "docker stats",
        "commandOrConcept": "docker stats",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "03",
        "title": "CPU Usage",
        "commandOrConcept": "CPU Usage",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "04",
        "title": "Memory Usage",
        "commandOrConcept": "Memory Usage",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "05",
        "title": "Network Usage",
        "commandOrConcept": "Network Usage",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "06",
        "title": "Block I/O",
        "commandOrConcept": "Block I/O",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "07",
        "title": "PIDs",
        "commandOrConcept": "PIDs",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "08",
        "title": "CPU Limits",
        "commandOrConcept": "CPU Limits",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "09",
        "title": "Memory Limits",
        "commandOrConcept": "Memory Limits",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "10",
        "title": "Memory Reservations",
        "commandOrConcept": "Memory Reservations",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "11",
        "title": "Swap",
        "commandOrConcept": "Swap",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "12",
        "title": "CPU Shares",
        "commandOrConcept": "CPU Shares",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "13",
        "title": "CPU Quotas",
        "commandOrConcept": "CPU Quotas",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "14",
        "title": "CPU Pinning",
        "commandOrConcept": "CPU Pinning",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "15",
        "title": "Device Limits",
        "commandOrConcept": "Device Limits",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "16",
        "title": "Resource Monitoring",
        "commandOrConcept": "Resource Monitoring",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      },
      {
        "number": "17",
        "title": "Resource Troubleshooting",
        "commandOrConcept": "Resource Troubleshooting",
        "difficulty": "Intermediate",
        "category": "Performance & Optimization"
      }
    ]
  },
  {
    "number": 30,
    "id": "ch-30",
    "title": "CGROUPS AND RESOURCE CONTROL",
    "trackGroup": "Linux Internals",
    "description": "Linux control groups v1 and v2, CFS scheduler enforcement, memory pressure, and OOM killer mechanics.",
    "subchapters": [
      {
        "number": "01",
        "title": "What are cgroups?",
        "commandOrConcept": "What are cgroups?",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "02",
        "title": "Why cgroups?",
        "commandOrConcept": "Why cgroups?",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "03",
        "title": "CPU Control",
        "commandOrConcept": "CPU Control",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "04",
        "title": "Memory Control",
        "commandOrConcept": "Memory Control",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "05",
        "title": "I/O Control",
        "commandOrConcept": "I/O Control",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "06",
        "title": "PID Limits",
        "commandOrConcept": "PID Limits",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "07",
        "title": "cgroups v1",
        "commandOrConcept": "cgroups v1",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "08",
        "title": "cgroups v2",
        "commandOrConcept": "cgroups v2",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "09",
        "title": "Docker and cgroups",
        "commandOrConcept": "Docker and cgroups",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "10",
        "title": "Resource Enforcement",
        "commandOrConcept": "Resource Enforcement",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "11",
        "title": "OOM Killer",
        "commandOrConcept": "OOM Killer",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "12",
        "title": "Resource Troubleshooting",
        "commandOrConcept": "Resource Troubleshooting",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      }
    ]
  },
  {
    "number": 31,
    "id": "ch-31",
    "title": "LINUX NAMESPACES AND CONTAINER ISOLATION",
    "trackGroup": "Linux Internals",
    "description": "The 7 Linux isolation namespaces: PID, NET, MNT, IPC, UTS, USER, and CGROUP.",
    "subchapters": [
      {
        "number": "01",
        "title": "Linux Namespaces",
        "commandOrConcept": "Linux Namespaces",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "02",
        "title": "PID Namespace",
        "commandOrConcept": "PID Namespace",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "03",
        "title": "Network Namespace",
        "commandOrConcept": "Network Namespace",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "04",
        "title": "Mount Namespace",
        "commandOrConcept": "Mount Namespace",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "05",
        "title": "IPC Namespace",
        "commandOrConcept": "IPC Namespace",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "06",
        "title": "UTS Namespace",
        "commandOrConcept": "UTS Namespace",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "07",
        "title": "User Namespace",
        "commandOrConcept": "User Namespace",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "08",
        "title": "Namespace Isolation",
        "commandOrConcept": "Namespace Isolation",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "09",
        "title": "Container Isolation Model",
        "commandOrConcept": "Container Isolation Model",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "10",
        "title": "Namespace Troubleshooting",
        "commandOrConcept": "Namespace Troubleshooting",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      }
    ]
  },
  {
    "number": 32,
    "id": "ch-32",
    "title": "OVERLAY FILESYSTEMS",
    "trackGroup": "Linux Internals",
    "description": "Overlay2 driver internals: lowerdir, upperdir, merged, workdir, whiteout files, and CoW performance.",
    "subchapters": [
      {
        "number": "01",
        "title": "Union Filesystems",
        "commandOrConcept": "Union Filesystems",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "02",
        "title": "OverlayFS",
        "commandOrConcept": "OverlayFS",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "03",
        "title": "overlay2",
        "commandOrConcept": "overlay2",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "04",
        "title": "Lower Layers",
        "commandOrConcept": "Lower Layers",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "05",
        "title": "Upper Layer",
        "commandOrConcept": "Upper Layer",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "06",
        "title": "Merged Layer",
        "commandOrConcept": "Merged Layer",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "07",
        "title": "Copy-on-Write",
        "commandOrConcept": "Copy-on-Write",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "08",
        "title": "Image Layer Storage",
        "commandOrConcept": "Image Layer Storage",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "09",
        "title": "Container Writable Layer",
        "commandOrConcept": "Container Writable Layer",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "10",
        "title": "Storage Performance",
        "commandOrConcept": "Storage Performance",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      },
      {
        "number": "11",
        "title": "Overlay Troubleshooting",
        "commandOrConcept": "Overlay Troubleshooting",
        "difficulty": "Intermediate",
        "category": "Linux Internals"
      }
    ]
  },
  {
    "number": 33,
    "id": "ch-33",
    "title": "DOCKER COMPOSE FUNDAMENTALS",
    "trackGroup": "Docker Compose",
    "description": "Multi-container application orchestration specification, compose.yaml schema, and core directives.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is Docker Compose?",
        "commandOrConcept": "What is Docker Compose?",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "02",
        "title": "Why Compose?",
        "commandOrConcept": "Why Compose?",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "03",
        "title": "Compose Architecture",
        "commandOrConcept": "Compose Architecture",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "04",
        "title": "compose.yaml",
        "commandOrConcept": "compose.yaml",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "05",
        "title": "Services",
        "commandOrConcept": "Services",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "06",
        "title": "Images",
        "commandOrConcept": "Images",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "07",
        "title": "Build",
        "commandOrConcept": "Build",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "08",
        "title": "Ports",
        "commandOrConcept": "Ports",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "09",
        "title": "Volumes",
        "commandOrConcept": "Volumes",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "10",
        "title": "Networks",
        "commandOrConcept": "Networks",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "11",
        "title": "Environment",
        "commandOrConcept": "Environment",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "12",
        "title": "Dependencies",
        "commandOrConcept": "Dependencies",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "13",
        "title": "Restart Policies",
        "commandOrConcept": "Restart Policies",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "14",
        "title": "Healthchecks",
        "commandOrConcept": "Healthchecks",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "15",
        "title": "Profiles",
        "commandOrConcept": "Profiles",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "16",
        "title": "Compose Commands",
        "commandOrConcept": "Compose Commands",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      }
    ]
  },
  {
    "number": 34,
    "id": "ch-34",
    "title": "DOCKER COMPOSE CONFIGURATION",
    "trackGroup": "Docker Compose",
    "description": "Advanced Compose patterns: depends_on conditions, extensions, YAML anchors, and override files.",
    "subchapters": [
      {
        "number": "01",
        "title": "Compose File Structure",
        "commandOrConcept": "Compose File Structure",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "02",
        "title": "Services",
        "commandOrConcept": "Services",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "03",
        "title": "Networks",
        "commandOrConcept": "Networks",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "04",
        "title": "Volumes",
        "commandOrConcept": "Volumes",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "05",
        "title": "Configs",
        "commandOrConcept": "Configs",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "06",
        "title": "Secrets",
        "commandOrConcept": "Secrets",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "07",
        "title": "Environment Variables",
        "commandOrConcept": "Environment Variables",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "08",
        "title": "Environment Files",
        "commandOrConcept": "Environment Files",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "09",
        "title": "Build Configuration",
        "commandOrConcept": "Build Configuration",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "10",
        "title": "Healthchecks",
        "commandOrConcept": "Healthchecks",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "11",
        "title": "depends_on",
        "commandOrConcept": "depends_on",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "12",
        "title": "Restart Policies",
        "commandOrConcept": "Restart Policies",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "13",
        "title": "Resource Limits",
        "commandOrConcept": "Resource Limits",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "14",
        "title": "Profiles",
        "commandOrConcept": "Profiles",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "15",
        "title": "Extensions",
        "commandOrConcept": "Extensions",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "16",
        "title": "YAML Anchors",
        "commandOrConcept": "YAML Anchors",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "17",
        "title": "Compose Overrides",
        "commandOrConcept": "Compose Overrides",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "18",
        "title": "Compose Best Practices",
        "commandOrConcept": "Compose Best Practices",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      }
    ]
  },
  {
    "number": 35,
    "id": "ch-35",
    "title": "DOCKER COMPOSE WORKFLOWS",
    "trackGroup": "Docker Compose",
    "description": "Full lifecycle operations: up, down, watch (hot code sync), run vs exec, and config validation.",
    "subchapters": [
      {
        "number": "01",
        "title": "docker compose up",
        "commandOrConcept": "docker compose up",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "02",
        "title": "docker compose down",
        "commandOrConcept": "docker compose down",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "03",
        "title": "docker compose start",
        "commandOrConcept": "docker compose start",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "04",
        "title": "docker compose stop",
        "commandOrConcept": "docker compose stop",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "05",
        "title": "docker compose restart",
        "commandOrConcept": "docker compose restart",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "06",
        "title": "docker compose ps",
        "commandOrConcept": "docker compose ps",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "07",
        "title": "docker compose logs",
        "commandOrConcept": "docker compose logs",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "08",
        "title": "docker compose exec",
        "commandOrConcept": "docker compose exec",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "09",
        "title": "docker compose run",
        "commandOrConcept": "docker compose run",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "10",
        "title": "docker compose build",
        "commandOrConcept": "docker compose build",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "11",
        "title": "docker compose pull",
        "commandOrConcept": "docker compose pull",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "12",
        "title": "docker compose push",
        "commandOrConcept": "docker compose push",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "13",
        "title": "docker compose config",
        "commandOrConcept": "docker compose config",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "14",
        "title": "docker compose watch",
        "commandOrConcept": "docker compose watch",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "15",
        "title": "Compose Development Workflow",
        "commandOrConcept": "Compose Development Workflow",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      },
      {
        "number": "16",
        "title": "Compose Production Considerations",
        "commandOrConcept": "Compose Production Considerations",
        "difficulty": "Intermediate",
        "category": "Docker Compose"
      }
    ]
  },
  {
    "number": 36,
    "id": "ch-36",
    "title": "MULTI-CONTAINER APPLICATIONS",
    "trackGroup": "Docker Compose",
    "description": "Designing microservice stacks: frontend, API gateways, workers, queues, Redis, and databases.",
    "subchapters": [
      {
        "number": "01",
        "title": "Application Containers",
        "commandOrConcept": "Application Containers",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "02",
        "title": "Database Containers",
        "commandOrConcept": "Database Containers",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "03",
        "title": "Cache Containers",
        "commandOrConcept": "Cache Containers",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "04",
        "title": "Reverse Proxy Containers",
        "commandOrConcept": "Reverse Proxy Containers",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "05",
        "title": "Frontend Containers",
        "commandOrConcept": "Frontend Containers",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "06",
        "title": "Backend Containers",
        "commandOrConcept": "Backend Containers",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "07",
        "title": "Message Queue Containers",
        "commandOrConcept": "Message Queue Containers",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "08",
        "title": "Service Discovery",
        "commandOrConcept": "Service Discovery",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "09",
        "title": "Network Architecture",
        "commandOrConcept": "Network Architecture",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "10",
        "title": "Data Persistence",
        "commandOrConcept": "Data Persistence",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "11",
        "title": "Configuration",
        "commandOrConcept": "Configuration",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "12",
        "title": "Healthchecks",
        "commandOrConcept": "Healthchecks",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "13",
        "title": "Startup Ordering",
        "commandOrConcept": "Startup Ordering",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "14",
        "title": "Failure Handling",
        "commandOrConcept": "Failure Handling",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      },
      {
        "number": "15",
        "title": "Complete Multi-Container Application",
        "commandOrConcept": "Complete Multi-Container Application",
        "difficulty": "Advanced",
        "category": "Docker Compose"
      }
    ]
  },
  {
    "number": 37,
    "id": "ch-37",
    "title": "DATABASE CONTAINERS",
    "trackGroup": "Storage & Persistence",
    "description": "Running Postgres, MySQL, MongoDB, and Redis in containers: init scripts, persistence, backups, and traps.",
    "subchapters": [
      {
        "number": "01",
        "title": "PostgreSQL Container",
        "commandOrConcept": "PostgreSQL Container",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "02",
        "title": "MySQL Container",
        "commandOrConcept": "MySQL Container",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "03",
        "title": "MongoDB Container",
        "commandOrConcept": "MongoDB Container",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "04",
        "title": "Redis Container",
        "commandOrConcept": "Redis Container",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "05",
        "title": "Database Persistence",
        "commandOrConcept": "Database Persistence",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "06",
        "title": "Database Volumes",
        "commandOrConcept": "Database Volumes",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "07",
        "title": "Database Initialization",
        "commandOrConcept": "Database Initialization",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "08",
        "title": "Environment Configuration",
        "commandOrConcept": "Environment Configuration",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "09",
        "title": "Database Networking",
        "commandOrConcept": "Database Networking",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "10",
        "title": "Database Backups",
        "commandOrConcept": "Database Backups",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "11",
        "title": "Database Restore",
        "commandOrConcept": "Database Restore",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "12",
        "title": "Database Security",
        "commandOrConcept": "Database Security",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "13",
        "title": "Database Container Anti-Patterns",
        "commandOrConcept": "Database Container Anti-Patterns",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      }
    ]
  },
  {
    "number": 38,
    "id": "ch-38",
    "title": "DOCKER HEALTHCHECKS",
    "trackGroup": "Production Operations",
    "description": "HEALTHCHECK instruction, probe intervals, retries, start periods, and status monitoring.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is a Healthcheck?",
        "commandOrConcept": "What is a Healthcheck?",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "02",
        "title": "Why Healthchecks?",
        "commandOrConcept": "Why Healthchecks?",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "03",
        "title": "HEALTHCHECK Dockerfile Instruction",
        "commandOrConcept": "HEALTHCHECK Dockerfile Instruction",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "04",
        "title": "Compose Healthchecks",
        "commandOrConcept": "Compose Healthchecks",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "05",
        "title": "Health Status",
        "commandOrConcept": "Health Status",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "06",
        "title": "Healthy",
        "commandOrConcept": "Healthy",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "07",
        "title": "Unhealthy",
        "commandOrConcept": "Unhealthy",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "08",
        "title": "Starting",
        "commandOrConcept": "Starting",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "09",
        "title": "Healthcheck Commands",
        "commandOrConcept": "Healthcheck Commands",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "10",
        "title": "Retry",
        "commandOrConcept": "Retry",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "11",
        "title": "Timeout",
        "commandOrConcept": "Timeout",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "12",
        "title": "Start Period",
        "commandOrConcept": "Start Period",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "13",
        "title": "Healthcheck Best Practices",
        "commandOrConcept": "Healthcheck Best Practices",
        "difficulty": "Advanced",
        "category": "Production Operations"
      }
    ]
  },
  {
    "number": 39,
    "id": "ch-39",
    "title": "DOCKER SECURITY FUNDAMENTALS",
    "trackGroup": "Security & Hardening",
    "description": "Daemon attack surface, non-root user execution, read-only root filesystems, and least privilege.",
    "subchapters": [
      {
        "number": "01",
        "title": "Container Security",
        "commandOrConcept": "Container Security",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "02",
        "title": "Image Security",
        "commandOrConcept": "Image Security",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "03",
        "title": "Host Security",
        "commandOrConcept": "Host Security",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "04",
        "title": "Docker Daemon Security",
        "commandOrConcept": "Docker Daemon Security",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "05",
        "title": "Docker Socket Security",
        "commandOrConcept": "Docker Socket Security",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "06",
        "title": "Root Containers",
        "commandOrConcept": "Root Containers",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "07",
        "title": "Non-Root Containers",
        "commandOrConcept": "Non-Root Containers",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "08",
        "title": "USER",
        "commandOrConcept": "USER",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "09",
        "title": "Capabilities",
        "commandOrConcept": "Capabilities",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "10",
        "title": "Privileged Containers",
        "commandOrConcept": "Privileged Containers",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "11",
        "title": "Read-Only Root Filesystem",
        "commandOrConcept": "Read-Only Root Filesystem",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "12",
        "title": "No-New-Privileges",
        "commandOrConcept": "No-New-Privileges",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "13",
        "title": "Security Profiles",
        "commandOrConcept": "Security Profiles",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "14",
        "title": "Secrets",
        "commandOrConcept": "Secrets",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "15",
        "title": "Resource Limits",
        "commandOrConcept": "Resource Limits",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "16",
        "title": "Security Best Practices",
        "commandOrConcept": "Security Best Practices",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "17",
        "title": "Threat Modeling",
        "commandOrConcept": "Threat Modeling",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      }
    ]
  },
  {
    "number": 40,
    "id": "ch-40",
    "title": "LINUX CAPABILITIES AND DOCKER SECURITY",
    "trackGroup": "Security & Hardening",
    "description": "Granular root privileges: CAP_NET_ADMIN, CAP_SYS_ADMIN, --cap-drop ALL, and hardening.",
    "subchapters": [
      {
        "number": "01",
        "title": "Linux Capabilities",
        "commandOrConcept": "Linux Capabilities",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "02",
        "title": "Default Capabilities",
        "commandOrConcept": "Default Capabilities",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "03",
        "title": "Dropping Capabilities",
        "commandOrConcept": "Dropping Capabilities",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "04",
        "title": "Adding Capabilities",
        "commandOrConcept": "Adding Capabilities",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "05",
        "title": "CAP_NET_ADMIN",
        "commandOrConcept": "CAP_NET_ADMIN",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "06",
        "title": "CAP_SYS_ADMIN",
        "commandOrConcept": "CAP_SYS_ADMIN",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "07",
        "title": "Capability Risks",
        "commandOrConcept": "Capability Risks",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "08",
        "title": "--cap-drop",
        "commandOrConcept": "--cap-drop",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "09",
        "title": "--cap-add",
        "commandOrConcept": "--cap-add",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "10",
        "title": "Least Privilege",
        "commandOrConcept": "Least Privilege",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "11",
        "title": "Capability Troubleshooting",
        "commandOrConcept": "Capability Troubleshooting",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      }
    ]
  },
  {
    "number": 41,
    "id": "ch-41",
    "title": "APPARMOR AND SELINUX",
    "trackGroup": "Security & Hardening",
    "description": "Mandatory Access Control (MAC) systems, default docker-default profile, and label confinement.",
    "subchapters": [
      {
        "number": "01",
        "title": "Linux Security Modules",
        "commandOrConcept": "Linux Security Modules",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "02",
        "title": "AppArmor",
        "commandOrConcept": "AppArmor",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "03",
        "title": "SELinux",
        "commandOrConcept": "SELinux",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "04",
        "title": "Docker AppArmor",
        "commandOrConcept": "Docker AppArmor",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "05",
        "title": "Docker SELinux",
        "commandOrConcept": "Docker SELinux",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "06",
        "title": "Security Profiles",
        "commandOrConcept": "Security Profiles",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "07",
        "title": "Profile Configuration",
        "commandOrConcept": "Profile Configuration",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "08",
        "title": "Profile Troubleshooting",
        "commandOrConcept": "Profile Troubleshooting",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "09",
        "title": "Production Security",
        "commandOrConcept": "Production Security",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      }
    ]
  },
  {
    "number": 42,
    "id": "ch-42",
    "title": "IMAGE SECURITY",
    "trackGroup": "Security & Hardening",
    "description": "Vulnerability scanners (Trivy, Docker Scout), CVE remediation, SBOM generation, and cosign signing.",
    "subchapters": [
      {
        "number": "01",
        "title": "Image Vulnerabilities",
        "commandOrConcept": "Image Vulnerabilities",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "02",
        "title": "CVEs",
        "commandOrConcept": "CVEs",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "03",
        "title": "Base Image Security",
        "commandOrConcept": "Base Image Security",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "04",
        "title": "Image Scanning",
        "commandOrConcept": "Image Scanning",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "05",
        "title": "Trivy",
        "commandOrConcept": "Trivy",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "06",
        "title": "Docker Scout",
        "commandOrConcept": "Docker Scout",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "07",
        "title": "Dependency Vulnerabilities",
        "commandOrConcept": "Dependency Vulnerabilities",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "08",
        "title": "OS Package Vulnerabilities",
        "commandOrConcept": "OS Package Vulnerabilities",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "09",
        "title": "SBOM",
        "commandOrConcept": "SBOM",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "10",
        "title": "Image Signing",
        "commandOrConcept": "Image Signing",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "11",
        "title": "Image Provenance",
        "commandOrConcept": "Image Provenance",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "12",
        "title": "Trusted Images",
        "commandOrConcept": "Trusted Images",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "13",
        "title": "Minimal Images",
        "commandOrConcept": "Minimal Images",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "14",
        "title": "Image Security Pipeline",
        "commandOrConcept": "Image Security Pipeline",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      }
    ]
  },
  {
    "number": 43,
    "id": "ch-43",
    "title": "DOCKER SUPPLY CHAIN SECURITY",
    "trackGroup": "Security & Hardening",
    "description": "SLSA attestations, build provenance, reproducible builds, and verifying digital cryptographic signatures.",
    "subchapters": [
      {
        "number": "01",
        "title": "Software Supply Chain",
        "commandOrConcept": "Software Supply Chain",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "02",
        "title": "Base Image Trust",
        "commandOrConcept": "Base Image Trust",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "03",
        "title": "Dependency Trust",
        "commandOrConcept": "Dependency Trust",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "04",
        "title": "Image Provenance",
        "commandOrConcept": "Image Provenance",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "05",
        "title": "SBOM",
        "commandOrConcept": "SBOM",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "06",
        "title": "Image Signing",
        "commandOrConcept": "Image Signing",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "07",
        "title": "Content Trust Concepts",
        "commandOrConcept": "Content Trust Concepts",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "08",
        "title": "Vulnerability Scanning",
        "commandOrConcept": "Vulnerability Scanning",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "09",
        "title": "Build Attestations",
        "commandOrConcept": "Build Attestations",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "10",
        "title": "Build Provenance",
        "commandOrConcept": "Build Provenance",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "11",
        "title": "Supply Chain Attack Scenarios",
        "commandOrConcept": "Supply Chain Attack Scenarios",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      },
      {
        "number": "12",
        "title": "Secure Image Pipeline",
        "commandOrConcept": "Secure Image Pipeline",
        "difficulty": "Advanced",
        "category": "Security & Hardening"
      }
    ]
  },
  {
    "number": 44,
    "id": "ch-44",
    "title": "DOCKER PERFORMANCE",
    "trackGroup": "Performance & Optimization",
    "description": "Minimizing image size, tuning storage driver I/O, optimizing CPU scheduling, and fast boot times.",
    "subchapters": [
      {
        "number": "01",
        "title": "Container Performance",
        "commandOrConcept": "Container Performance",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      },
      {
        "number": "02",
        "title": "CPU Performance",
        "commandOrConcept": "CPU Performance",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      },
      {
        "number": "03",
        "title": "Memory Performance",
        "commandOrConcept": "Memory Performance",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      },
      {
        "number": "04",
        "title": "Disk Performance",
        "commandOrConcept": "Disk Performance",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      },
      {
        "number": "05",
        "title": "Network Performance",
        "commandOrConcept": "Network Performance",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      },
      {
        "number": "06",
        "title": "Image Size",
        "commandOrConcept": "Image Size",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      },
      {
        "number": "07",
        "title": "Build Performance",
        "commandOrConcept": "Build Performance",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      },
      {
        "number": "08",
        "title": "Startup Performance",
        "commandOrConcept": "Startup Performance",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      },
      {
        "number": "09",
        "title": "OverlayFS Performance",
        "commandOrConcept": "OverlayFS Performance",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      },
      {
        "number": "10",
        "title": "Volume Performance",
        "commandOrConcept": "Volume Performance",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      },
      {
        "number": "11",
        "title": "Logging Performance",
        "commandOrConcept": "Logging Performance",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      },
      {
        "number": "12",
        "title": "Compose Performance",
        "commandOrConcept": "Compose Performance",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      },
      {
        "number": "13",
        "title": "Performance Troubleshooting",
        "commandOrConcept": "Performance Troubleshooting",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      },
      {
        "number": "14",
        "title": "Performance Optimization",
        "commandOrConcept": "Performance Optimization",
        "difficulty": "Advanced",
        "category": "Performance & Optimization"
      }
    ]
  },
  {
    "number": 45,
    "id": "ch-45",
    "title": "DOCKER STORAGE",
    "trackGroup": "Storage & Persistence",
    "description": "Detailed storage drivers: overlay2 vs devicemapper vs btrfs vs zfs, and disk usage auditing.",
    "subchapters": [
      {
        "number": "01",
        "title": "Docker Storage Architecture",
        "commandOrConcept": "Docker Storage Architecture",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "02",
        "title": "Storage Drivers",
        "commandOrConcept": "Storage Drivers",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "03",
        "title": "overlay2",
        "commandOrConcept": "overlay2",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "04",
        "title": "Device Mapper",
        "commandOrConcept": "Device Mapper",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "05",
        "title": "Btrfs",
        "commandOrConcept": "Btrfs",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "06",
        "title": "ZFS",
        "commandOrConcept": "ZFS",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "07",
        "title": "Volume Storage",
        "commandOrConcept": "Volume Storage",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "08",
        "title": "Bind Mount Storage",
        "commandOrConcept": "Bind Mount Storage",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "09",
        "title": "Container Writable Layer",
        "commandOrConcept": "Container Writable Layer",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "10",
        "title": "Storage Cleanup",
        "commandOrConcept": "Storage Cleanup",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "11",
        "title": "Disk Usage",
        "commandOrConcept": "Disk Usage",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "12",
        "title": "docker system df",
        "commandOrConcept": "docker system df",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "13",
        "title": "docker system prune",
        "commandOrConcept": "docker system prune",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      },
      {
        "number": "14",
        "title": "Storage Troubleshooting",
        "commandOrConcept": "Storage Troubleshooting",
        "difficulty": "Advanced",
        "category": "Storage & Persistence"
      }
    ]
  },
  {
    "number": 46,
    "id": "ch-46",
    "title": "DOCKER SYSTEM MANAGEMENT",
    "trackGroup": "Production Operations",
    "description": "Routine maintenance: system prune, disk reclamation, event streaming, and daemon telemetry.",
    "subchapters": [
      {
        "number": "01",
        "title": "docker system df",
        "commandOrConcept": "docker system df",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "02",
        "title": "docker system events",
        "commandOrConcept": "docker system events",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "03",
        "title": "docker system info",
        "commandOrConcept": "docker system info",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "04",
        "title": "docker system prune",
        "commandOrConcept": "docker system prune",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "05",
        "title": "Image Cleanup",
        "commandOrConcept": "Image Cleanup",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "06",
        "title": "Container Cleanup",
        "commandOrConcept": "Container Cleanup",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "07",
        "title": "Volume Cleanup",
        "commandOrConcept": "Volume Cleanup",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "08",
        "title": "Network Cleanup",
        "commandOrConcept": "Network Cleanup",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "09",
        "title": "Disk Management",
        "commandOrConcept": "Disk Management",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "10",
        "title": "Docker Daemon Management",
        "commandOrConcept": "Docker Daemon Management",
        "difficulty": "Advanced",
        "category": "Production Operations"
      },
      {
        "number": "11",
        "title": "Docker Resource Management",
        "commandOrConcept": "Docker Resource Management",
        "difficulty": "Advanced",
        "category": "Production Operations"
      }
    ]
  },
  {
    "number": 47,
    "id": "ch-47",
    "title": "DOCKER DEBUGGING",
    "trackGroup": "Diagnostics & Troubleshooting",
    "description": "20-point diagnostic methodology: why containers exit, port conflicts, DNS timeouts, and OOM kills.",
    "subchapters": [
      {
        "number": "01",
        "title": "Container Won't Start",
        "commandOrConcept": "Container Won't Start",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "02",
        "title": "Container Immediately Exits",
        "commandOrConcept": "Container Immediately Exits",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "03",
        "title": "Image Pull Failure",
        "commandOrConcept": "Image Pull Failure",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "04",
        "title": "Build Failure",
        "commandOrConcept": "Build Failure",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "05",
        "title": "Port Conflict",
        "commandOrConcept": "Port Conflict",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "06",
        "title": "Network Failure",
        "commandOrConcept": "Network Failure",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "07",
        "title": "DNS Failure",
        "commandOrConcept": "DNS Failure",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "08",
        "title": "Volume Permission Failure",
        "commandOrConcept": "Volume Permission Failure",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "09",
        "title": "Container Permission Failure",
        "commandOrConcept": "Container Permission Failure",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "10",
        "title": "Application Failure",
        "commandOrConcept": "Application Failure",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "11",
        "title": "Healthcheck Failure",
        "commandOrConcept": "Healthcheck Failure",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "12",
        "title": "Resource Exhaustion",
        "commandOrConcept": "Resource Exhaustion",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "13",
        "title": "Out of Memory",
        "commandOrConcept": "Out of Memory",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "14",
        "title": "Disk Full",
        "commandOrConcept": "Disk Full",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "15",
        "title": "CPU Throttling",
        "commandOrConcept": "CPU Throttling",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "16",
        "title": "Container Connectivity",
        "commandOrConcept": "Container Connectivity",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "17",
        "title": "Log Analysis",
        "commandOrConcept": "Log Analysis",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "18",
        "title": "docker inspect Debugging",
        "commandOrConcept": "docker inspect Debugging",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "19",
        "title": "docker exec Debugging",
        "commandOrConcept": "docker exec Debugging",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "20",
        "title": "Complete Debugging Workflow",
        "commandOrConcept": "Complete Debugging Workflow",
        "difficulty": "Advanced",
        "category": "Diagnostics & Troubleshooting"
      }
    ]
  },
  {
    "number": 48,
    "id": "ch-48",
    "title": "DOCKER DEVELOPMENT WORKFLOW",
    "trackGroup": "Developer Workflows",
    "description": "Hot code reloading, dev containers, VS Code integration, and ephemeral test databases.",
    "subchapters": [
      {
        "number": "01",
        "title": "Local Development",
        "commandOrConcept": "Local Development",
        "difficulty": "Advanced",
        "category": "Developer Workflows"
      },
      {
        "number": "02",
        "title": "Development Containers",
        "commandOrConcept": "Development Containers",
        "difficulty": "Advanced",
        "category": "Developer Workflows"
      },
      {
        "number": "03",
        "title": "Source Code Mounting",
        "commandOrConcept": "Source Code Mounting",
        "difficulty": "Advanced",
        "category": "Developer Workflows"
      },
      {
        "number": "04",
        "title": "Hot Reloading",
        "commandOrConcept": "Hot Reloading",
        "difficulty": "Advanced",
        "category": "Developer Workflows"
      },
      {
        "number": "05",
        "title": "File Synchronization",
        "commandOrConcept": "File Synchronization",
        "difficulty": "Advanced",
        "category": "Developer Workflows"
      },
      {
        "number": "06",
        "title": "Docker Compose Development",
        "commandOrConcept": "Docker Compose Development",
        "difficulty": "Advanced",
        "category": "Developer Workflows"
      },
      {
        "number": "07",
        "title": "Debugging Applications",
        "commandOrConcept": "Debugging Applications",
        "difficulty": "Advanced",
        "category": "Developer Workflows"
      },
      {
        "number": "08",
        "title": "IDE Integration",
        "commandOrConcept": "IDE Integration",
        "difficulty": "Advanced",
        "category": "Developer Workflows"
      },
      {
        "number": "09",
        "title": "VS Code Dev Containers",
        "commandOrConcept": "VS Code Dev Containers",
        "difficulty": "Advanced",
        "category": "Developer Workflows"
      },
      {
        "number": "10",
        "title": "Environment Management",
        "commandOrConcept": "Environment Management",
        "difficulty": "Advanced",
        "category": "Developer Workflows"
      },
      {
        "number": "11",
        "title": "Development Databases",
        "commandOrConcept": "Development Databases",
        "difficulty": "Advanced",
        "category": "Developer Workflows"
      },
      {
        "number": "12",
        "title": "Development Workflow Best Practices",
        "commandOrConcept": "Development Workflow Best Practices",
        "difficulty": "Advanced",
        "category": "Developer Workflows"
      }
    ]
  },
  {
    "number": 49,
    "id": "ch-49",
    "title": "DOCKER CI/CD",
    "trackGroup": "CI/CD & DevOps",
    "description": "Building images in GitHub Actions, GitLab CI, and Jenkins with immutable semantic tags and cache mounts.",
    "subchapters": [
      {
        "number": "01",
        "title": "Docker in CI",
        "commandOrConcept": "Docker in CI",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "02",
        "title": "Docker in CD",
        "commandOrConcept": "Docker in CD",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "03",
        "title": "Building Images in CI",
        "commandOrConcept": "Building Images in CI",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "04",
        "title": "Testing Images",
        "commandOrConcept": "Testing Images",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "05",
        "title": "Image Scanning",
        "commandOrConcept": "Image Scanning",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "06",
        "title": "Image Tagging",
        "commandOrConcept": "Image Tagging",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "07",
        "title": "Image Versioning",
        "commandOrConcept": "Image Versioning",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "08",
        "title": "Registry Push",
        "commandOrConcept": "Registry Push",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "09",
        "title": "Git SHA Tags",
        "commandOrConcept": "Git SHA Tags",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "10",
        "title": "Semantic Versioning",
        "commandOrConcept": "Semantic Versioning",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "11",
        "title": "Latest Tag",
        "commandOrConcept": "Latest Tag",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "12",
        "title": "Immutable Tags",
        "commandOrConcept": "Immutable Tags",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "13",
        "title": "Build Cache in CI",
        "commandOrConcept": "Build Cache in CI",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "14",
        "title": "Multi-Platform Builds",
        "commandOrConcept": "Multi-Platform Builds",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "15",
        "title": "Docker Buildx",
        "commandOrConcept": "Docker Buildx",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "16",
        "title": "Docker Build Cloud",
        "commandOrConcept": "Docker Build Cloud",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "17",
        "title": "GitHub Actions",
        "commandOrConcept": "GitHub Actions",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "18",
        "title": "GitLab CI",
        "commandOrConcept": "GitLab CI",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "19",
        "title": "Jenkins + Docker",
        "commandOrConcept": "Jenkins + Docker",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      },
      {
        "number": "20",
        "title": "Complete Docker CI/CD Pipeline",
        "commandOrConcept": "Complete Docker CI/CD Pipeline",
        "difficulty": "Advanced",
        "category": "CI/CD & DevOps"
      }
    ]
  },
  {
    "number": 50,
    "id": "ch-50",
    "title": "DOCKER BUILDX AND MULTI-PLATFORM BUILDS",
    "trackGroup": "Build & Packaging",
    "description": "QEMU emulation, native arm64/amd64 builders, registry cache exporters, and multi-arch manifests.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is Buildx?",
        "commandOrConcept": "What is Buildx?",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "02",
        "title": "BuildKit",
        "commandOrConcept": "BuildKit",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "03",
        "title": "Build Drivers",
        "commandOrConcept": "Build Drivers",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "04",
        "title": "Builder Instances",
        "commandOrConcept": "Builder Instances",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "05",
        "title": "Multi-Platform Builds",
        "commandOrConcept": "Multi-Platform Builds",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "06",
        "title": "linux/amd64",
        "commandOrConcept": "linux/amd64",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "07",
        "title": "linux/arm64",
        "commandOrConcept": "linux/arm64",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "08",
        "title": "Cross Compilation",
        "commandOrConcept": "Cross Compilation",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "09",
        "title": "QEMU",
        "commandOrConcept": "QEMU",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "10",
        "title": "Build Cache",
        "commandOrConcept": "Build Cache",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "11",
        "title": "Registry Cache",
        "commandOrConcept": "Registry Cache",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "12",
        "title": "Build Secrets",
        "commandOrConcept": "Build Secrets",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "13",
        "title": "SSH Forwarding",
        "commandOrConcept": "SSH Forwarding",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "14",
        "title": "Build Attestations",
        "commandOrConcept": "Build Attestations",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "15",
        "title": "Provenance",
        "commandOrConcept": "Provenance",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "16",
        "title": "SBOM Generation",
        "commandOrConcept": "SBOM Generation",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      },
      {
        "number": "17",
        "title": "Production Build Pipelines",
        "commandOrConcept": "Production Build Pipelines",
        "difficulty": "Advanced",
        "category": "Build & Packaging"
      }
    ]
  },
  {
    "number": 51,
    "id": "ch-51",
    "title": "DOCKER CONTEXTS",
    "trackGroup": "CLI & Operations",
    "description": "Seamlessly switching CLI control between local Docker Desktop, remote cloud VMs, and SSH sockets.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is a Docker Context?",
        "commandOrConcept": "What is a Docker Context?",
        "difficulty": "Advanced",
        "category": "CLI & Operations"
      },
      {
        "number": "02",
        "title": "Default Context",
        "commandOrConcept": "Default Context",
        "difficulty": "Advanced",
        "category": "CLI & Operations"
      },
      {
        "number": "03",
        "title": "Creating Contexts",
        "commandOrConcept": "Creating Contexts",
        "difficulty": "Advanced",
        "category": "CLI & Operations"
      },
      {
        "number": "04",
        "title": "Switching Contexts",
        "commandOrConcept": "Switching Contexts",
        "difficulty": "Advanced",
        "category": "CLI & Operations"
      },
      {
        "number": "05",
        "title": "Remote Docker Hosts",
        "commandOrConcept": "Remote Docker Hosts",
        "difficulty": "Advanced",
        "category": "CLI & Operations"
      },
      {
        "number": "06",
        "title": "SSH Context",
        "commandOrConcept": "SSH Context",
        "difficulty": "Advanced",
        "category": "CLI & Operations"
      },
      {
        "number": "07",
        "title": "Docker Desktop Context",
        "commandOrConcept": "Docker Desktop Context",
        "difficulty": "Advanced",
        "category": "CLI & Operations"
      },
      {
        "number": "08",
        "title": "Context Security",
        "commandOrConcept": "Context Security",
        "difficulty": "Advanced",
        "category": "CLI & Operations"
      },
      {
        "number": "09",
        "title": "Context Troubleshooting",
        "commandOrConcept": "Context Troubleshooting",
        "difficulty": "Advanced",
        "category": "CLI & Operations"
      },
      {
        "number": "10",
        "title": "Multi-Host Docker Management",
        "commandOrConcept": "Multi-Host Docker Management",
        "difficulty": "Advanced",
        "category": "CLI & Operations"
      }
    ]
  },
  {
    "number": 52,
    "id": "ch-52",
    "title": "DOCKER API AND AUTOMATION",
    "trackGroup": "Automation & SDKs",
    "description": "Interacting with the Engine Unix socket via REST, curl, Python docker-py, and Node.js SDKs.",
    "subchapters": [
      {
        "number": "01",
        "title": "Docker API",
        "commandOrConcept": "Docker API",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      },
      {
        "number": "02",
        "title": "Docker Engine API",
        "commandOrConcept": "Docker Engine API",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      },
      {
        "number": "03",
        "title": "Unix Socket",
        "commandOrConcept": "Unix Socket",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      },
      {
        "number": "04",
        "title": "REST API",
        "commandOrConcept": "REST API",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      },
      {
        "number": "05",
        "title": "API Authentication",
        "commandOrConcept": "API Authentication",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      },
      {
        "number": "06",
        "title": "API Security",
        "commandOrConcept": "API Security",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      },
      {
        "number": "07",
        "title": "API Containers",
        "commandOrConcept": "API Containers",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      },
      {
        "number": "08",
        "title": "API Images",
        "commandOrConcept": "API Images",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      },
      {
        "number": "09",
        "title": "API Networks",
        "commandOrConcept": "API Networks",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      },
      {
        "number": "10",
        "title": "API Volumes",
        "commandOrConcept": "API Volumes",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      },
      {
        "number": "11",
        "title": "API Automation",
        "commandOrConcept": "API Automation",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      },
      {
        "number": "12",
        "title": "Docker SDKs",
        "commandOrConcept": "Docker SDKs",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      },
      {
        "number": "13",
        "title": "Python Docker SDK",
        "commandOrConcept": "Python Docker SDK",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      },
      {
        "number": "14",
        "title": "Node.js Docker SDK",
        "commandOrConcept": "Node.js Docker SDK",
        "difficulty": "Advanced",
        "category": "Automation & SDKs"
      }
    ]
  },
  {
    "number": 53,
    "id": "ch-53",
    "title": "DOCKER PLUGINS AND EXTENSIONS",
    "trackGroup": "Extensibility",
    "description": "Extending engine capabilities with custom volume drivers, network plugins, and authz middleware.",
    "subchapters": [
      {
        "number": "01",
        "title": "Docker Plugins",
        "commandOrConcept": "Docker Plugins",
        "difficulty": "Advanced",
        "category": "Extensibility"
      },
      {
        "number": "02",
        "title": "Volume Plugins",
        "commandOrConcept": "Volume Plugins",
        "difficulty": "Advanced",
        "category": "Extensibility"
      },
      {
        "number": "03",
        "title": "Network Plugins",
        "commandOrConcept": "Network Plugins",
        "difficulty": "Advanced",
        "category": "Extensibility"
      },
      {
        "number": "04",
        "title": "Authorization Plugins",
        "commandOrConcept": "Authorization Plugins",
        "difficulty": "Advanced",
        "category": "Extensibility"
      },
      {
        "number": "05",
        "title": "Docker Desktop Extensions",
        "commandOrConcept": "Docker Desktop Extensions",
        "difficulty": "Advanced",
        "category": "Extensibility"
      },
      {
        "number": "06",
        "title": "Extension Architecture",
        "commandOrConcept": "Extension Architecture",
        "difficulty": "Advanced",
        "category": "Extensibility"
      },
      {
        "number": "07",
        "title": "Extension Security",
        "commandOrConcept": "Extension Security",
        "difficulty": "Advanced",
        "category": "Extensibility"
      },
      {
        "number": "08",
        "title": "Plugin Management",
        "commandOrConcept": "Plugin Management",
        "difficulty": "Advanced",
        "category": "Extensibility"
      },
      {
        "number": "09",
        "title": "Plugin Troubleshooting",
        "commandOrConcept": "Plugin Troubleshooting",
        "difficulty": "Advanced",
        "category": "Extensibility"
      }
    ]
  },
  {
    "number": 54,
    "id": "ch-54",
    "title": "DOCKER SWARM",
    "trackGroup": "Clustering & Orchestration",
    "description": "Native clustering, Raft consensus manager nodes, ingress routing mesh, and rolling updates.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is Docker Swarm?",
        "commandOrConcept": "What is Docker Swarm?",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "02",
        "title": "Swarm Architecture",
        "commandOrConcept": "Swarm Architecture",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "03",
        "title": "Manager Nodes",
        "commandOrConcept": "Manager Nodes",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "04",
        "title": "Worker Nodes",
        "commandOrConcept": "Worker Nodes",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "05",
        "title": "Swarm Initialization",
        "commandOrConcept": "Swarm Initialization",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "06",
        "title": "Joining a Swarm",
        "commandOrConcept": "Joining a Swarm",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "07",
        "title": "Leaving a Swarm",
        "commandOrConcept": "Leaving a Swarm",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "08",
        "title": "Nodes",
        "commandOrConcept": "Nodes",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "09",
        "title": "Services",
        "commandOrConcept": "Services",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "10",
        "title": "Tasks",
        "commandOrConcept": "Tasks",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "11",
        "title": "Replicas",
        "commandOrConcept": "Replicas",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "12",
        "title": "Scaling Services",
        "commandOrConcept": "Scaling Services",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "13",
        "title": "Rolling Updates",
        "commandOrConcept": "Rolling Updates",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "14",
        "title": "Rollbacks",
        "commandOrConcept": "Rollbacks",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "15",
        "title": "Overlay Networks",
        "commandOrConcept": "Overlay Networks",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "16",
        "title": "Routing Mesh",
        "commandOrConcept": "Routing Mesh",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "17",
        "title": "Secrets",
        "commandOrConcept": "Secrets",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "18",
        "title": "Configs",
        "commandOrConcept": "Configs",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "19",
        "title": "Swarm Security",
        "commandOrConcept": "Swarm Security",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "20",
        "title": "Swarm Troubleshooting",
        "commandOrConcept": "Swarm Troubleshooting",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "21",
        "title": "Swarm vs Kubernetes",
        "commandOrConcept": "Swarm vs Kubernetes",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      }
    ]
  },
  {
    "number": 55,
    "id": "ch-55",
    "title": "DOCKER ORCHESTRATION",
    "trackGroup": "Clustering & Orchestration",
    "description": "The principles of scheduling, service discovery, self-healing, desired state, and fleet management.",
    "subchapters": [
      {
        "number": "01",
        "title": "Why Orchestration?",
        "commandOrConcept": "Why Orchestration?",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "02",
        "title": "Single Container vs Multi-Container",
        "commandOrConcept": "Single Container vs Multi-Container",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "03",
        "title": "Scheduling",
        "commandOrConcept": "Scheduling",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "04",
        "title": "Service Discovery",
        "commandOrConcept": "Service Discovery",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "05",
        "title": "Scaling",
        "commandOrConcept": "Scaling",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "06",
        "title": "Load Balancing",
        "commandOrConcept": "Load Balancing",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "07",
        "title": "Self-Healing",
        "commandOrConcept": "Self-Healing",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "08",
        "title": "Rolling Updates",
        "commandOrConcept": "Rolling Updates",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "09",
        "title": "Rollbacks",
        "commandOrConcept": "Rollbacks",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "10",
        "title": "Desired State",
        "commandOrConcept": "Desired State",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "11",
        "title": "Docker Swarm",
        "commandOrConcept": "Docker Swarm",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "12",
        "title": "Kubernetes",
        "commandOrConcept": "Kubernetes",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "13",
        "title": "Orchestration Concepts",
        "commandOrConcept": "Orchestration Concepts",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      },
      {
        "number": "14",
        "title": "Docker's Role in Modern Orchestration",
        "commandOrConcept": "Docker's Role in Modern Orchestration",
        "difficulty": "Advanced",
        "category": "Clustering & Orchestration"
      }
    ]
  },
  {
    "number": 56,
    "id": "ch-56",
    "title": "DOCKER AND KUBERNETES",
    "trackGroup": "Ecosystem & Cloud",
    "description": "Deprecating dockershim, understanding CRI, containerd, building images for K8s, and Compose migration.",
    "subchapters": [
      {
        "number": "01",
        "title": "Docker vs Kubernetes",
        "commandOrConcept": "Docker vs Kubernetes",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "02",
        "title": "Container Runtime",
        "commandOrConcept": "Container Runtime",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "03",
        "title": "OCI",
        "commandOrConcept": "OCI",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "04",
        "title": "containerd",
        "commandOrConcept": "containerd",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "05",
        "title": "CRI",
        "commandOrConcept": "CRI",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "06",
        "title": "Docker Engine",
        "commandOrConcept": "Docker Engine",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "07",
        "title": "Kubernetes Container Runtime",
        "commandOrConcept": "Kubernetes Container Runtime",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "08",
        "title": "Building Images for Kubernetes",
        "commandOrConcept": "Building Images for Kubernetes",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "09",
        "title": "Docker Compose to Kubernetes",
        "commandOrConcept": "Docker Compose to Kubernetes",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "10",
        "title": "Image Registries",
        "commandOrConcept": "Image Registries",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "11",
        "title": "Kubernetes Image Pulling",
        "commandOrConcept": "Kubernetes Image Pulling",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "12",
        "title": "Docker and Kubernetes Workflow",
        "commandOrConcept": "Docker and Kubernetes Workflow",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "13",
        "title": "Transitioning from Docker to Kubernetes",
        "commandOrConcept": "Transitioning from Docker to Kubernetes",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      }
    ]
  },
  {
    "number": 57,
    "id": "ch-57",
    "title": "DOCKER AND CLOUD",
    "trackGroup": "Ecosystem & Cloud",
    "description": "Serverless container runtimes: AWS ECS, Fargate, Azure Container Apps, and Google Cloud Run.",
    "subchapters": [
      {
        "number": "01",
        "title": "Containers in Cloud",
        "commandOrConcept": "Containers in Cloud",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "02",
        "title": "AWS ECS",
        "commandOrConcept": "AWS ECS",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "03",
        "title": "AWS EKS",
        "commandOrConcept": "AWS EKS",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "04",
        "title": "AWS Fargate",
        "commandOrConcept": "AWS Fargate",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "05",
        "title": "Azure Container Instances",
        "commandOrConcept": "Azure Container Instances",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "06",
        "title": "Azure Container Apps",
        "commandOrConcept": "Azure Container Apps",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "07",
        "title": "Azure AKS",
        "commandOrConcept": "Azure AKS",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "08",
        "title": "Google Cloud Run",
        "commandOrConcept": "Google Cloud Run",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "09",
        "title": "Google Kubernetes Engine",
        "commandOrConcept": "Google Kubernetes Engine",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "10",
        "title": "Cloud Container Registries",
        "commandOrConcept": "Cloud Container Registries",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "11",
        "title": "Container Deployment Patterns",
        "commandOrConcept": "Container Deployment Patterns",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "12",
        "title": "Cloud Networking",
        "commandOrConcept": "Cloud Networking",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      },
      {
        "number": "13",
        "title": "Cloud Container Security",
        "commandOrConcept": "Cloud Container Security",
        "difficulty": "Expert",
        "category": "Ecosystem & Cloud"
      }
    ]
  },
  {
    "number": 58,
    "id": "ch-58",
    "title": "PRODUCTION DOCKER",
    "trackGroup": "Production Operations",
    "description": "The battle-tested production checklist: non-root users, minimal footprints, quotas, and disaster recovery.",
    "subchapters": [
      {
        "number": "01",
        "title": "Production Image Design",
        "commandOrConcept": "Production Image Design",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "02",
        "title": "Production Dockerfile",
        "commandOrConcept": "Production Dockerfile",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "03",
        "title": "Non-Root Containers",
        "commandOrConcept": "Non-Root Containers",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "04",
        "title": "Minimal Images",
        "commandOrConcept": "Minimal Images",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "05",
        "title": "Resource Limits",
        "commandOrConcept": "Resource Limits",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "06",
        "title": "Healthchecks",
        "commandOrConcept": "Healthchecks",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "07",
        "title": "Logging",
        "commandOrConcept": "Logging",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "08",
        "title": "Monitoring",
        "commandOrConcept": "Monitoring",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "09",
        "title": "Networking",
        "commandOrConcept": "Networking",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "10",
        "title": "Storage",
        "commandOrConcept": "Storage",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "11",
        "title": "Secrets",
        "commandOrConcept": "Secrets",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "12",
        "title": "Security",
        "commandOrConcept": "Security",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "13",
        "title": "Image Scanning",
        "commandOrConcept": "Image Scanning",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "14",
        "title": "Registry Management",
        "commandOrConcept": "Registry Management",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "15",
        "title": "Backup",
        "commandOrConcept": "Backup",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "16",
        "title": "Disaster Recovery",
        "commandOrConcept": "Disaster Recovery",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "17",
        "title": "High Availability",
        "commandOrConcept": "High Availability",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "18",
        "title": "Production Troubleshooting",
        "commandOrConcept": "Production Troubleshooting",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "19",
        "title": "Production Checklist",
        "commandOrConcept": "Production Checklist",
        "difficulty": "Expert",
        "category": "Production Operations"
      }
    ]
  },
  {
    "number": 59,
    "id": "ch-59",
    "title": "DOCKER ARCHITECTURE PATTERNS",
    "trackGroup": "Production Operations",
    "description": "Container design patterns: sidecar, ambassador, adapter, reverse proxy, and twelve-factor microservices.",
    "subchapters": [
      {
        "number": "01",
        "title": "Single Container Application",
        "commandOrConcept": "Single Container Application",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "02",
        "title": "Multi-Container Application",
        "commandOrConcept": "Multi-Container Application",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "03",
        "title": "Sidecar Pattern",
        "commandOrConcept": "Sidecar Pattern",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "04",
        "title": "Ambassador Pattern",
        "commandOrConcept": "Ambassador Pattern",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "05",
        "title": "Adapter Pattern",
        "commandOrConcept": "Adapter Pattern",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "06",
        "title": "Init Container Concepts",
        "commandOrConcept": "Init Container Concepts",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "07",
        "title": "Reverse Proxy Pattern",
        "commandOrConcept": "Reverse Proxy Pattern",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "08",
        "title": "Worker Pattern",
        "commandOrConcept": "Worker Pattern",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "09",
        "title": "Queue Worker Architecture",
        "commandOrConcept": "Queue Worker Architecture",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "10",
        "title": "Microservices Architecture",
        "commandOrConcept": "Microservices Architecture",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "11",
        "title": "Twelve-Factor Applications",
        "commandOrConcept": "Twelve-Factor Applications",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "12",
        "title": "Containerized Monolith",
        "commandOrConcept": "Containerized Monolith",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "13",
        "title": "Containerized Microservices",
        "commandOrConcept": "Containerized Microservices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "14",
        "title": "Event-Driven Containers",
        "commandOrConcept": "Event-Driven Containers",
        "difficulty": "Expert",
        "category": "Production Operations"
      }
    ]
  },
  {
    "number": 60,
    "id": "ch-60",
    "title": "REAL-WORLD PROJECTS",
    "trackGroup": "Hands-on Projects",
    "description": "Step-by-step practical containerization of Node, Python, Java, Go, databases, full-stacks, and swarm.",
    "subchapters": [
      {
        "number": "01",
        "title": "Run Your First Container",
        "commandOrConcept": "Run Your First Container",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "02",
        "title": "Containerize a Static Website",
        "commandOrConcept": "Containerize a Static Website",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "03",
        "title": "Containerize a Node.js Application",
        "commandOrConcept": "Containerize a Node.js Application",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "04",
        "title": "Containerize a Python Application",
        "commandOrConcept": "Containerize a Python Application",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "05",
        "title": "Containerize a Java Application",
        "commandOrConcept": "Containerize a Java Application",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "06",
        "title": "Containerize a Go Application",
        "commandOrConcept": "Containerize a Go Application",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "07",
        "title": "Build a Database Container",
        "commandOrConcept": "Build a Database Container",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "08",
        "title": "Build a Redis Application",
        "commandOrConcept": "Build a Redis Application",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "09",
        "title": "Build a Full-Stack Application",
        "commandOrConcept": "Build a Full-Stack Application",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "10",
        "title": "Build a Reverse Proxy",
        "commandOrConcept": "Build a Reverse Proxy",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "11",
        "title": "Build a Multi-Container Application",
        "commandOrConcept": "Build a Multi-Container Application",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "12",
        "title": "Build with Docker Compose",
        "commandOrConcept": "Build with Docker Compose",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "13",
        "title": "Build a Production Dockerfile",
        "commandOrConcept": "Build a Production Dockerfile",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "14",
        "title": "Build a Multi-Stage Image",
        "commandOrConcept": "Build a Multi-Stage Image",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "15",
        "title": "Build a Secure Image",
        "commandOrConcept": "Build a Secure Image",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "16",
        "title": "Build a CI Pipeline",
        "commandOrConcept": "Build a CI Pipeline",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "17",
        "title": "Build a Docker Registry Workflow",
        "commandOrConcept": "Build a Docker Registry Workflow",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "18",
        "title": "Deploy a Container to Cloud",
        "commandOrConcept": "Deploy a Container to Cloud",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "19",
        "title": "Build a Docker Swarm Application",
        "commandOrConcept": "Build a Docker Swarm Application",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "20",
        "title": "Docker + Kubernetes Project",
        "commandOrConcept": "Docker + Kubernetes Project",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "21",
        "title": "Complete Production Application",
        "commandOrConcept": "Complete Production Application",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      }
    ]
  },
  {
    "number": 61,
    "id": "ch-61",
    "title": "DOCKER INTERNALS",
    "trackGroup": "Linux Internals",
    "description": "From dockerd to containerd, runc, OCI manifests, snapshots, and raw kernel interaction.",
    "subchapters": [
      {
        "number": "01",
        "title": "Docker Engine Internals",
        "commandOrConcept": "Docker Engine Internals",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "02",
        "title": "dockerd",
        "commandOrConcept": "dockerd",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "03",
        "title": "containerd",
        "commandOrConcept": "containerd",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "04",
        "title": "runc",
        "commandOrConcept": "runc",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "05",
        "title": "OCI",
        "commandOrConcept": "OCI",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "06",
        "title": "Docker Client",
        "commandOrConcept": "Docker Client",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "07",
        "title": "Docker API",
        "commandOrConcept": "Docker API",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "08",
        "title": "Image Manifest",
        "commandOrConcept": "Image Manifest",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "09",
        "title": "Image Configuration",
        "commandOrConcept": "Image Configuration",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "10",
        "title": "Content Addressable Storage",
        "commandOrConcept": "Content Addressable Storage",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "11",
        "title": "Image Layers",
        "commandOrConcept": "Image Layers",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "12",
        "title": "Containerd Snapshots",
        "commandOrConcept": "Containerd Snapshots",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "13",
        "title": "OverlayFS",
        "commandOrConcept": "OverlayFS",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "14",
        "title": "Namespaces",
        "commandOrConcept": "Namespaces",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "15",
        "title": "cgroups",
        "commandOrConcept": "cgroups",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "16",
        "title": "Capabilities",
        "commandOrConcept": "Capabilities",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "17",
        "title": "Seccomp",
        "commandOrConcept": "Seccomp",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "18",
        "title": "AppArmor",
        "commandOrConcept": "AppArmor",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "19",
        "title": "Docker Network Internals",
        "commandOrConcept": "Docker Network Internals",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "20",
        "title": "Docker Storage Internals",
        "commandOrConcept": "Docker Storage Internals",
        "difficulty": "Expert",
        "category": "Linux Internals"
      }
    ]
  },
  {
    "number": 62,
    "id": "ch-62",
    "title": "OCI AND CONTAINER STANDARDS",
    "trackGroup": "Linux Internals",
    "description": "The Open Container Initiative: runtime-spec, image-spec, distribution-spec, and interoperability.",
    "subchapters": [
      {
        "number": "01",
        "title": "What is OCI?",
        "commandOrConcept": "What is OCI?",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "02",
        "title": "OCI Runtime Specification",
        "commandOrConcept": "OCI Runtime Specification",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "03",
        "title": "OCI Image Specification",
        "commandOrConcept": "OCI Image Specification",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "04",
        "title": "OCI Distribution Specification",
        "commandOrConcept": "OCI Distribution Specification",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "05",
        "title": "runc",
        "commandOrConcept": "runc",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "06",
        "title": "containerd",
        "commandOrConcept": "containerd",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "07",
        "title": "Container Runtime Architecture",
        "commandOrConcept": "Container Runtime Architecture",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "08",
        "title": "Image Compatibility",
        "commandOrConcept": "Image Compatibility",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "09",
        "title": "Registry Compatibility",
        "commandOrConcept": "Registry Compatibility",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "10",
        "title": "Docker and OCI",
        "commandOrConcept": "Docker and OCI",
        "difficulty": "Expert",
        "category": "Linux Internals"
      },
      {
        "number": "11",
        "title": "Kubernetes and OCI",
        "commandOrConcept": "Kubernetes and OCI",
        "difficulty": "Expert",
        "category": "Linux Internals"
      }
    ]
  },
  {
    "number": 63,
    "id": "ch-63",
    "title": "DOCKER ADVANCED SECURITY",
    "trackGroup": "Security & Hardening",
    "description": "Rootless Docker mode, user namespace remapping, container escape vectors, and auditing.",
    "subchapters": [
      {
        "number": "01",
        "title": "Rootless Docker",
        "commandOrConcept": "Rootless Docker",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "02",
        "title": "Rootless Containers",
        "commandOrConcept": "Rootless Containers",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "03",
        "title": "User Namespaces",
        "commandOrConcept": "User Namespaces",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "04",
        "title": "Seccomp",
        "commandOrConcept": "Seccomp",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "05",
        "title": "AppArmor",
        "commandOrConcept": "AppArmor",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "06",
        "title": "SELinux",
        "commandOrConcept": "SELinux",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "07",
        "title": "Capabilities",
        "commandOrConcept": "Capabilities",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "08",
        "title": "Privileged Mode",
        "commandOrConcept": "Privileged Mode",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "09",
        "title": "Read-Only Filesystems",
        "commandOrConcept": "Read-Only Filesystems",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "10",
        "title": "No New Privileges",
        "commandOrConcept": "No New Privileges",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "11",
        "title": "Resource Restrictions",
        "commandOrConcept": "Resource Restrictions",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "12",
        "title": "Docker Socket Security",
        "commandOrConcept": "Docker Socket Security",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "13",
        "title": "Supply Chain Security",
        "commandOrConcept": "Supply Chain Security",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "14",
        "title": "Image Signing",
        "commandOrConcept": "Image Signing",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "15",
        "title": "SBOM",
        "commandOrConcept": "SBOM",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "16",
        "title": "Provenance",
        "commandOrConcept": "Provenance",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "17",
        "title": "Container Escape Concepts",
        "commandOrConcept": "Container Escape Concepts",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "18",
        "title": "Container Security Auditing",
        "commandOrConcept": "Container Security Auditing",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      },
      {
        "number": "19",
        "title": "Production Security Architecture",
        "commandOrConcept": "Production Security Architecture",
        "difficulty": "Expert",
        "category": "Security & Hardening"
      }
    ]
  },
  {
    "number": 64,
    "id": "ch-64",
    "title": "DOCKER TROUBLESHOOTING MASTERCLASS",
    "trackGroup": "Diagnostics & Troubleshooting",
    "description": "Exhaustive resolution guide for all 24 failure categories across build, runtime, storage, and networking.",
    "subchapters": [
      {
        "number": "01",
        "title": "Container Startup Failure",
        "commandOrConcept": "Container Startup Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "02",
        "title": "Image Failure",
        "commandOrConcept": "Image Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "03",
        "title": "Dockerfile Failure",
        "commandOrConcept": "Dockerfile Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "04",
        "title": "Build Context Failure",
        "commandOrConcept": "Build Context Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "05",
        "title": "Cache Problems",
        "commandOrConcept": "Cache Problems",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "06",
        "title": "Registry Authentication Failure",
        "commandOrConcept": "Registry Authentication Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "07",
        "title": "Registry Push Failure",
        "commandOrConcept": "Registry Push Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "08",
        "title": "Network Failure",
        "commandOrConcept": "Network Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "09",
        "title": "DNS Failure",
        "commandOrConcept": "DNS Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "10",
        "title": "Port Failure",
        "commandOrConcept": "Port Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "11",
        "title": "Volume Failure",
        "commandOrConcept": "Volume Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "12",
        "title": "Permission Failure",
        "commandOrConcept": "Permission Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "13",
        "title": "Process Failure",
        "commandOrConcept": "Process Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "14",
        "title": "Signal Failure",
        "commandOrConcept": "Signal Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "15",
        "title": "Healthcheck Failure",
        "commandOrConcept": "Healthcheck Failure",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "16",
        "title": "CPU Problems",
        "commandOrConcept": "CPU Problems",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "17",
        "title": "Memory Problems",
        "commandOrConcept": "Memory Problems",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "18",
        "title": "Storage Problems",
        "commandOrConcept": "Storage Problems",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "19",
        "title": "Logging Problems",
        "commandOrConcept": "Logging Problems",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "20",
        "title": "Compose Problems",
        "commandOrConcept": "Compose Problems",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "21",
        "title": "Buildx Problems",
        "commandOrConcept": "Buildx Problems",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "22",
        "title": "Swarm Problems",
        "commandOrConcept": "Swarm Problems",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "23",
        "title": "Security Problems",
        "commandOrConcept": "Security Problems",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      },
      {
        "number": "24",
        "title": "Production Incidents",
        "commandOrConcept": "Production Incidents",
        "difficulty": "Expert",
        "category": "Diagnostics & Troubleshooting"
      }
    ]
  },
  {
    "number": 65,
    "id": "ch-65",
    "title": "DOCKER BEST PRACTICES",
    "trackGroup": "Production Operations",
    "description": "Golden standards for building, running, networking, storing, monitoring, and maintaining containers.",
    "subchapters": [
      {
        "number": "01",
        "title": "Image Best Practices",
        "commandOrConcept": "Image Best Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "02",
        "title": "Dockerfile Best Practices",
        "commandOrConcept": "Dockerfile Best Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "03",
        "title": "Container Best Practices",
        "commandOrConcept": "Container Best Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "04",
        "title": "Networking Best Practices",
        "commandOrConcept": "Networking Best Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "05",
        "title": "Storage Best Practices",
        "commandOrConcept": "Storage Best Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "06",
        "title": "Security Best Practices",
        "commandOrConcept": "Security Best Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "07",
        "title": "Logging Best Practices",
        "commandOrConcept": "Logging Best Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "08",
        "title": "Resource Best Practices",
        "commandOrConcept": "Resource Best Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "09",
        "title": "Compose Best Practices",
        "commandOrConcept": "Compose Best Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "10",
        "title": "CI/CD Best Practices",
        "commandOrConcept": "CI/CD Best Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "11",
        "title": "Registry Best Practices",
        "commandOrConcept": "Registry Best Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "12",
        "title": "Production Best Practices",
        "commandOrConcept": "Production Best Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "13",
        "title": "Development Best Practices",
        "commandOrConcept": "Development Best Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "14",
        "title": "Team Collaboration Practices",
        "commandOrConcept": "Team Collaboration Practices",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "15",
        "title": "Infrastructure Standards",
        "commandOrConcept": "Infrastructure Standards",
        "difficulty": "Expert",
        "category": "Production Operations"
      }
    ]
  },
  {
    "number": 66,
    "id": "ch-66",
    "title": "DOCKER ANTI-PATTERNS",
    "trackGroup": "Production Operations",
    "description": "19 dangerous mistakes: running as root, monolithic containers, ignoring signals, and socket mounts.",
    "subchapters": [
      {
        "number": "01",
        "title": "Running Everything as Root",
        "commandOrConcept": "Running Everything as Root",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "02",
        "title": "Using Huge Base Images",
        "commandOrConcept": "Using Huge Base Images",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "03",
        "title": "Using latest Everywhere",
        "commandOrConcept": "Using latest Everywhere",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "04",
        "title": "Storing Secrets in Images",
        "commandOrConcept": "Storing Secrets in Images",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "05",
        "title": "Storing Secrets in Dockerfiles",
        "commandOrConcept": "Storing Secrets in Dockerfiles",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "06",
        "title": "Baking Environment Configuration into Images",
        "commandOrConcept": "Baking Environment Configuration into Images",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "07",
        "title": "Using Containers as Virtual Machines",
        "commandOrConcept": "Using Containers as Virtual Machines",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "08",
        "title": "One Giant Container",
        "commandOrConcept": "One Giant Container",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "09",
        "title": "Unnecessary Process Managers",
        "commandOrConcept": "Unnecessary Process Managers",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "10",
        "title": "Ignoring Signals",
        "commandOrConcept": "Ignoring Signals",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "11",
        "title": "Ignoring Healthchecks",
        "commandOrConcept": "Ignoring Healthchecks",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "12",
        "title": "Ignoring Resource Limits",
        "commandOrConcept": "Ignoring Resource Limits",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "13",
        "title": "Using Host Networking Unnecessarily",
        "commandOrConcept": "Using Host Networking Unnecessarily",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "14",
        "title": "Mounting Docker Socket",
        "commandOrConcept": "Mounting Docker Socket",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "15",
        "title": "Ignoring Image Scanning",
        "commandOrConcept": "Ignoring Image Scanning",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "16",
        "title": "Ignoring Layer Optimization",
        "commandOrConcept": "Ignoring Layer Optimization",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "17",
        "title": "Ignoring Logs",
        "commandOrConcept": "Ignoring Logs",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "18",
        "title": "Ignoring Backups",
        "commandOrConcept": "Ignoring Backups",
        "difficulty": "Expert",
        "category": "Production Operations"
      },
      {
        "number": "19",
        "title": "Manual Production Changes",
        "commandOrConcept": "Manual Production Changes",
        "difficulty": "Expert",
        "category": "Production Operations"
      }
    ]
  },
  {
    "number": 67,
    "id": "ch-67",
    "title": "DOCKER CERTIFICATION-STYLE KNOWLEDGE",
    "trackGroup": "Assessment & Mastery",
    "description": "DCA (Docker Certified Associate) style scenarios, architecture trade-offs, and debugging quizzes.",
    "subchapters": [
      {
        "number": "01",
        "title": "Container Fundamentals Assessment",
        "commandOrConcept": "Container Fundamentals Assessment",
        "difficulty": "Expert",
        "category": "Assessment & Mastery"
      },
      {
        "number": "02",
        "title": "Images Assessment",
        "commandOrConcept": "Images Assessment",
        "difficulty": "Expert",
        "category": "Assessment & Mastery"
      },
      {
        "number": "03",
        "title": "Dockerfile Assessment",
        "commandOrConcept": "Dockerfile Assessment",
        "difficulty": "Expert",
        "category": "Assessment & Mastery"
      },
      {
        "number": "04",
        "title": "Networking Assessment",
        "commandOrConcept": "Networking Assessment",
        "difficulty": "Expert",
        "category": "Assessment & Mastery"
      },
      {
        "number": "05",
        "title": "Storage Assessment",
        "commandOrConcept": "Storage Assessment",
        "difficulty": "Expert",
        "category": "Assessment & Mastery"
      },
      {
        "number": "06",
        "title": "Compose Assessment",
        "commandOrConcept": "Compose Assessment",
        "difficulty": "Expert",
        "category": "Assessment & Mastery"
      },
      {
        "number": "07",
        "title": "Security Assessment",
        "commandOrConcept": "Security Assessment",
        "difficulty": "Expert",
        "category": "Assessment & Mastery"
      },
      {
        "number": "08",
        "title": "CLI Assessment",
        "commandOrConcept": "CLI Assessment",
        "difficulty": "Expert",
        "category": "Assessment & Mastery"
      },
      {
        "number": "09",
        "title": "Troubleshooting Assessment",
        "commandOrConcept": "Troubleshooting Assessment",
        "difficulty": "Expert",
        "category": "Assessment & Mastery"
      },
      {
        "number": "10",
        "title": "Production Assessment",
        "commandOrConcept": "Production Assessment",
        "difficulty": "Expert",
        "category": "Assessment & Mastery"
      },
      {
        "number": "11",
        "title": "Scenario-Based Questions",
        "commandOrConcept": "Scenario-Based Questions",
        "difficulty": "Expert",
        "category": "Assessment & Mastery"
      },
      {
        "number": "12",
        "title": "Command-Based Questions",
        "commandOrConcept": "Command-Based Questions",
        "difficulty": "Expert",
        "category": "Assessment & Mastery"
      },
      {
        "number": "13",
        "title": "Architecture Questions",
        "commandOrConcept": "Architecture Questions",
        "difficulty": "Expert",
        "category": "Assessment & Mastery"
      }
    ]
  },
  {
    "number": 68,
    "id": "ch-68",
    "title": "DOCKER CAPSTONE",
    "trackGroup": "Hands-on Projects",
    "description": "The ultimate production end-to-end pipeline: Git -> Dockerfile -> Multi-stage -> Scan -> Compose -> Production.",
    "subchapters": [
      {
        "number": "01",
        "title": "Git Repository Setup",
        "commandOrConcept": "Git Repository Setup",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "02",
        "title": "Production Dockerfile Design",
        "commandOrConcept": "Production Dockerfile Design",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "03",
        "title": "BuildKit Optimization",
        "commandOrConcept": "BuildKit Optimization",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "04",
        "title": "Multi-Stage Build Implementation",
        "commandOrConcept": "Multi-Stage Build Implementation",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "05",
        "title": "Container Security Scanning",
        "commandOrConcept": "Container Security Scanning",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "06",
        "title": "Docker Image Tagging & Retention",
        "commandOrConcept": "Docker Image Tagging & Retention",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "07",
        "title": "Private Registry Publishing",
        "commandOrConcept": "Private Registry Publishing",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "08",
        "title": "Docker Compose Orchestration",
        "commandOrConcept": "Docker Compose Orchestration",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "09",
        "title": "Isolated Multi-Tier Networking",
        "commandOrConcept": "Isolated Multi-Tier Networking",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "10",
        "title": "Persistent Database Volume Engine",
        "commandOrConcept": "Persistent Database Volume Engine",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "11",
        "title": "Active Healthcheck Handlers",
        "commandOrConcept": "Active Healthcheck Handlers",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "12",
        "title": "Production Logging Architecture",
        "commandOrConcept": "Production Logging Architecture",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "13",
        "title": "Resource Quotas & Monitoring",
        "commandOrConcept": "Resource Quotas & Monitoring",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "14",
        "title": "Automated CI/CD Image Pipeline",
        "commandOrConcept": "Automated CI/CD Image Pipeline",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      },
      {
        "number": "15",
        "title": "Zero-Downtime Production Deployment",
        "commandOrConcept": "Zero-Downtime Production Deployment",
        "difficulty": "Expert",
        "category": "Hands-on Projects"
      }
    ]
  }
];
