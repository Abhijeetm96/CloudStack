import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '..', 'src', 'devops', 'data', 'chapters');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 50 Chapters Definitions with all subchapters from the specification
const CHAPTERS_METADATA = [
  // LEVEL 01: FOUNDATION (Chapters 1-6)
  {
    num: 1,
    title: 'DevOps Fundamentals',
    levelId: 'level-01-foundation',
    levelName: 'LEVEL 01: FOUNDATION',
    levelNum: 1,
    fileGroup: 'level01_foundation',
    summary: 'The cultural, technical, and architectural philosophies that bridge software engineering and operations into continuous delivery loops.',
    targetTech: ['Culture', 'CALMS', 'Automation', 'CI/CD Flow'],
    subchapters: [
      '1.1 What is DevOps?',
      '1.2 Why DevOps Exists',
      '1.3 Problems DevOps Solves',
      '1.4 Traditional Development vs DevOps',
      '1.5 Development and Operations Collaboration',
      '1.6 DevOps Culture',
      '1.7 DevOps Principles',
      '1.8 CALMS Framework',
      '1.9 Continuous Improvement',
      '1.10 Automation Mindset',
      '1.11 Feedback Loops',
      '1.12 DevOps Lifecycle',
      '1.13 DevOps Roles',
      '1.14 DevOps Engineer Responsibilities',
      '1.15 DevOps vs SysAdmin',
      '1.16 DevOps vs SRE',
      '1.17 DevOps vs Platform Engineering',
      '1.18 DevOps vs Cloud Engineering',
      '1.19 DevOps Toolchain',
      '1.20 DevOps Maturity Levels'
    ]
  },
  {
    num: 2,
    title: 'Software Development Lifecycle',
    levelId: 'level-01-foundation',
    levelName: 'LEVEL 01: FOUNDATION',
    levelNum: 1,
    fileGroup: 'level01_foundation',
    summary: 'Engineering workflows from initial backlog planning through automated build, testing, delivery, deployment, and live production telemetry.',
    targetTech: ['Agile', 'Kanban', 'Scrum', 'Value Stream Mapping'],
    subchapters: [
      '2.1 SDLC Fundamentals',
      '2.2 Planning',
      '2.3 Requirements',
      '2.4 Development',
      '2.5 Code Review',
      '2.6 Testing',
      '2.7 Build',
      '2.8 Packaging',
      '2.9 Release',
      '2.10 Deployment',
      '2.11 Operations',
      '2.12 Monitoring',
      '2.13 Feedback',
      '2.14 Continuous Improvement',
      '2.15 Agile and DevOps',
      '2.16 Scrum and DevOps',
      '2.17 Kanban and DevOps',
      '2.18 DevOps Value Stream',
      '2.19 Bottleneck Identification',
      '2.20 Value Stream Mapping'
    ]
  },
  {
    num: 3,
    title: 'Source Control and Collaboration',
    levelId: 'level-01-foundation',
    levelName: 'LEVEL 01: FOUNDATION',
    levelNum: 1,
    fileGroup: 'level01_foundation',
    summary: 'Integrating Git version control plumbing, branch governance, code reviews, and Git-based automation into continuous delivery pipelines.',
    targetTech: ['Git', 'Trunk-Based Development', 'GitHub', 'CODEOWNERS', 'SemVer'],
    academyRef: 'git',
    subchapters: [
      '3.1 Source Control in DevOps',
      '3.2 Git in the DevOps Lifecycle',
      '3.3 Repository Strategies',
      '3.4 Branching Strategies',
      '3.5 Trunk-Based Development',
      '3.6 Feature Branch Workflow',
      '3.7 GitFlow',
      '3.8 Pull Requests',
      '3.9 Code Reviews',
      '3.10 Protected Branches',
      '3.11 Commit Standards',
      '3.12 Semantic Versioning',
      '3.13 Release Tags',
      '3.14 Release Branches',
      '3.15 Monorepo vs Polyrepo',
      '3.16 Repository Security',
      '3.17 CODEOWNERS',
      '3.18 Change Management',
      '3.19 Git Hooks',
      '3.20 Git-Based Automation'
    ]
  },
  {
    num: 4,
    title: 'Linux and DevOps Environments',
    levelId: 'level-01-foundation',
    levelName: 'LEVEL 01: FOUNDATION',
    levelNum: 1,
    fileGroup: 'level01_foundation',
    summary: 'Operating system primitives, systemd service supervision, environment parity, process isolation, and production Linux troubleshooting.',
    targetTech: ['Linux', 'systemd', 'Bash', 'SSH', 'Cron', 'Permissions'],
    academyRef: 'linux',
    subchapters: [
      '4.1 Linux in DevOps',
      '4.2 Development Environment',
      '4.3 Test Environment',
      '4.4 Staging Environment',
      '4.5 Production Environment',
      '4.6 Environment Parity',
      '4.7 Environment Configuration',
      '4.8 Linux Process Management',
      '4.9 Linux Services',
      '4.10 Systemd',
      '4.11 Logs',
      '4.12 File Permissions',
      '4.13 Users and Groups',
      '4.14 SSH',
      '4.15 Shell Automation',
      '4.16 Environment Variables',
      '4.17 Cron and Scheduled Automation',
      '4.18 Resource Monitoring',
      '4.19 Linux Troubleshooting',
      '4.20 Production Server Basics'
    ]
  },
  {
    num: 5,
    title: 'Networking for DevOps',
    levelId: 'level-01-foundation',
    levelName: 'LEVEL 01: FOUNDATION',
    levelNum: 1,
    fileGroup: 'level01_foundation',
    summary: 'Cloud and data center network architecture: TCP/IP sockets, DNS resolution hierarchies, TLS handshakes, reverse proxies, and load balancers.',
    targetTech: ['DNS', 'TLS', 'NGINX', 'HAProxy', 'CIDR', 'iptables'],
    subchapters: [
      '5.1 Networking Fundamentals',
      '5.2 IP Addresses',
      '5.3 IPv4 vs IPv6',
      '5.4 Subnets',
      '5.5 CIDR',
      '5.6 Routing',
      '5.7 DNS',
      '5.8 DNS Resolution',
      '5.9 HTTP',
      '5.10 HTTPS',
      '5.11 TLS',
      '5.12 TCP',
      '5.13 UDP',
      '5.14 Ports',
      '5.15 Firewalls',
      '5.16 Proxies',
      '5.17 Reverse Proxies',
      '5.18 Load Balancers',
      '5.19 NAT',
      '5.20 VPN',
      '5.21 Private Networks',
      '5.22 Public Networks',
      '5.23 Service Discovery',
      '5.24 Network Troubleshooting',
      '5.25 DevOps Network Architecture'
    ]
  },
  {
    num: 6,
    title: 'Build Automation',
    levelId: 'level-01-foundation',
    levelName: 'LEVEL 01: FOUNDATION',
    levelNum: 1,
    fileGroup: 'level01_foundation',
    summary: 'Deterministic compilation, dependency lockfiles, hermetic build sandboxes, layer caching, and reproducible binary artifact packaging.',
    targetTech: ['Build Automation', 'Make', 'Bazel', 'Docker BuildKit', 'Lockfiles'],
    simulatorId: 'build-pipeline',
    subchapters: [
      '6.1 What is Build Automation?',
      '6.2 Why Builds Must Be Automated',
      '6.3 Build Pipelines',
      '6.4 Build Dependencies',
      '6.5 Dependency Management',
      '6.6 Build Artifacts',
      '6.7 Artifact Naming',
      '6.8 Versioning',
      '6.9 Reproducible Builds',
      '6.10 Build Caching',
      '6.11 Build Parallelization',
      '6.12 Build Optimization',
      '6.13 Build Failures',
      '6.14 Build Isolation',
      '6.15 Build Environment Management',
      '6.16 Artifact Integrity',
      '6.17 Artifact Promotion',
      '6.18 Build Automation Patterns',
      '6.19 Build Security',
      '6.20 Production Build Architecture'
    ]
  },

  // LEVEL 02: CONTINUOUS INTEGRATION (Chapters 7-11)
  {
    num: 7,
    title: 'Continuous Integration',
    levelId: 'level-02-ci',
    levelName: 'LEVEL 02: CONTINUOUS INTEGRATION',
    levelNum: 2,
    fileGroup: 'level02_ci',
    summary: 'Validating code changes continuously through automated triggers, testing suites, runner elasticity, and fail-fast quality gates.',
    targetTech: ['CI Pipelines', 'Runners', 'Unit/Integration Tests', 'Test Parallelization'],
    simulatorId: 'ci-pipeline',
    capstoneId: 'devops-01',
    subchapters: [
      '7.1 What is CI?',
      '7.2 Why CI Matters',
      '7.3 CI Workflow',
      '7.4 CI Pipeline Architecture',
      '7.5 Trigger Strategies',
      '7.6 Push-Based CI',
      '7.7 Pull Request CI',
      '7.8 Scheduled CI',
      '7.9 Manual CI',
      '7.10 Automated Testing',
      '7.11 Unit Testing',
      '7.12 Integration Testing',
      '7.13 Regression Testing',
      '7.14 Test Parallelization',
      '7.15 Test Reports',
      '7.16 Build Artifacts',
      '7.17 CI Caching',
      '7.18 CI Runners',
      '7.19 Self-Hosted Runners',
      '7.20 Hosted Runners',
      '7.21 CI Failure Handling',
      '7.22 CI Security',
      '7.23 CI Pipeline Optimization',
      '7.24 CI at Scale'
    ]
  },
  {
    num: 8,
    title: 'Continuous Delivery',
    levelId: 'level-02-ci',
    levelName: 'LEVEL 02: CONTINUOUS INTEGRATION',
    levelNum: 2,
    fileGroup: 'level02_ci',
    summary: 'Moving validated artifacts smoothly toward production with automated promotion gates, staging verification, and deployment rollbacks.',
    targetTech: ['Continuous Delivery', 'Release Gates', 'Automated Promotion', 'Rollbacks'],
    simulatorId: 'cd-pipeline',
    subchapters: [
      '8.1 Continuous Delivery',
      '8.2 Continuous Deployment',
      '8.3 Delivery vs Deployment',
      '8.4 Deployment Pipelines',
      '8.5 Artifact Promotion',
      '8.6 Environment Promotion',
      '8.7 Development to Staging',
      '8.8 Staging to Production',
      '8.9 Manual Approval',
      '8.10 Automated Approval Gates',
      '8.11 Deployment Policies',
      '8.12 Release Readiness',
      '8.13 Release Candidates',
      '8.14 Release Management',
      '8.15 Deployment Automation',
      '8.16 Deployment Failure Handling',
      '8.17 Rollbacks',
      '8.18 Release Traceability',
      '8.19 Production Release Controls',
      '8.20 Continuous Delivery Architecture'
    ]
  },
  {
    num: 9,
    title: 'CI/CD Pipeline Design',
    levelId: 'level-02-ci',
    levelName: 'LEVEL 02: CONTINUOUS INTEGRATION',
    levelNum: 2,
    fileGroup: 'level02_ci',
    summary: 'Constructing robust declarative pipeline DAGs, managing secrets, parameters, parallel worker pools, and reusable workflow templates.',
    targetTech: ['YAML Pipelines', 'DAGs', 'Secrets Injection', 'Pipeline Caching'],
    simulatorId: 'deployment-pipeline',
    subchapters: [
      '9.1 CI/CD Pipeline Fundamentals',
      '9.2 Pipeline Stages',
      '9.3 Pipeline Jobs',
      '9.4 Pipeline Steps',
      '9.5 Pipeline Dependencies',
      '9.6 Parallel Jobs',
      '9.7 Conditional Jobs',
      '9.8 Manual Gates',
      '9.9 Pipeline Variables',
      '9.10 Pipeline Parameters',
      '9.11 Secrets',
      '9.12 Credentials',
      '9.13 Artifacts',
      '9.14 Caching',
      '9.15 Pipeline Templates',
      '9.16 Reusable Pipelines',
      '9.17 Pipeline Libraries',
      '9.18 Pipeline Notifications',
      '9.19 Pipeline Observability',
      '9.20 Pipeline Security',
      '9.21 Pipeline Performance',
      '9.22 Pipeline Failure Recovery',
      '9.23 Multi-Environment Pipelines',
      '9.24 Multi-Repository Pipelines',
      '9.25 Enterprise CI/CD Architecture'
    ]
  },
  {
    num: 10,
    title: 'CI/CD Platforms',
    levelId: 'level-02-ci',
    levelName: 'LEVEL 02: CONTINUOUS INTEGRATION',
    levelNum: 2,
    fileGroup: 'level02_ci',
    summary: 'Comparative architecture of industry CI/CD runners: GitHub Actions, Jenkins master-agent topologies, GitLab CI, Tekton, and Argo Workflows.',
    targetTech: ['GitHub Actions', 'Jenkins', 'GitLab CI', 'Tekton', 'Argo Workflows'],
    subchapters: [
      '10.1 Jenkins',
      '10.2 GitHub Actions',
      '10.3 GitLab CI/CD',
      '10.4 Azure DevOps Pipelines',
      '10.5 AWS CodePipeline',
      '10.6 Buildkite',
      '10.7 CircleCI',
      '10.8 Argo Workflows',
      '10.9 Tekton',
      '10.10 CI/CD Platform Comparison',
      '10.11 Hosted vs Self-Hosted CI',
      '10.12 Runner Architecture',
      '10.13 Agent Architecture',
      '10.14 Pipeline-as-Code',
      '10.15 Shared Pipeline Libraries',
      '10.16 CI/CD Platform Security',
      '10.17 CI/CD Platform Scaling',
      '10.18 Selecting a CI/CD Platform'
    ]
  },
  {
    num: 11,
    title: 'Artifact Management',
    levelId: 'level-02-ci',
    levelName: 'LEVEL 02: CONTINUOUS INTEGRATION',
    levelNum: 2,
    fileGroup: 'level02_ci',
    summary: 'Storing, securing, versioning, and promoting binary packages and container images across OCI registries and package repositories.',
    targetTech: ['JFrog Artifactory', 'Nexus', 'GHCR', 'Cosign', 'OCI Specs'],
    capstoneId: 'devops-04',
    subchapters: [
      '11.1 What is an Artifact?',
      '11.2 Artifact Types',
      '11.3 Artifact Repositories',
      '11.4 Container Registries',
      '11.5 Package Registries',
      '11.6 Binary Repositories',
      '11.7 Artifact Versioning',
      '11.8 Artifact Immutability',
      '11.9 Artifact Promotion',
      '11.10 Artifact Retention',
      '11.11 Artifact Metadata',
      '11.12 Artifact Integrity',
      '11.13 Artifact Signing',
      '11.14 Artifact Security',
      '11.15 Dependency Management',
      '11.16 Artifact Lifecycle',
      '11.17 Repository Architecture'
    ]
  },

  // LEVEL 03: CONTAINERIZED DELIVERY (Chapters 12, 17, 18)
  {
    num: 12,
    title: 'Docker and Containerized Delivery',
    levelId: 'level-03-containers',
    levelName: 'LEVEL 03: CONTAINERIZED DELIVERY',
    levelNum: 3,
    fileGroup: 'level03_containers',
    summary: 'Integrating container runtimes into CI pipelines: multi-stage builds, vulnerability scanning, image minimization, and ephemeral test environments.',
    targetTech: ['Docker', 'Multi-Stage Builds', 'Trivy', 'BuildKit', 'Compose'],
    academyRef: 'docker',
    capstoneId: 'devops-03',
    subchapters: [
      '12.1 Containers in DevOps',
      '12.2 Container-Based CI',
      '12.3 Container Image Builds',
      '12.4 Dockerfiles in CI/CD',
      '12.5 Multi-Stage Builds',
      '12.6 Image Tagging',
      '12.7 Image Versioning',
      '12.8 Container Registries',
      '12.9 Image Promotion',
      '12.10 Image Scanning',
      '12.11 Container Security',
      '12.12 Container Testing',
      '12.13 Container Deployment',
      '12.14 Docker Compose in Development',
      '12.15 Containerized CI Runners',
      '12.16 Container Build Optimization',
      '12.17 Container Release Strategy',
      '12.18 Production Container Pipeline'
    ]
  },
  {
    num: 17,
    title: 'Deployment Strategies',
    levelId: 'level-03-containers',
    levelName: 'LEVEL 03: CONTAINERIZED DELIVERY',
    levelNum: 3,
    fileGroup: 'level03_containers',
    summary: 'Executing zero-downtime releases via Rolling updates, Blue-Green environment switches, Canary traffic splitting, and Feature Flags.',
    targetTech: ['Blue-Green', 'Canary', 'Rolling', 'Feature Flags', 'Istio Traffic Splitting'],
    simulatorId: 'blue-green',
    subchapters: [
      '17.1 Deployment Fundamentals',
      '17.2 Rolling Deployment',
      '17.3 Recreate Deployment',
      '17.4 Blue-Green Deployment',
      '17.5 Canary Deployment',
      '17.6 A/B Deployment',
      '17.7 Shadow Deployment',
      '17.8 Feature Flags',
      '17.9 Progressive Delivery',
      '17.10 Automated Rollback',
      '17.11 Deployment Gates',
      '17.12 Deployment Health Checks',
      '17.13 Risk-Based Deployment',
      '17.14 Zero-Downtime Deployment',
      '17.15 Database Deployment Strategies',
      '17.16 Production Deployment Architecture'
    ]
  },
  {
    num: 18,
    title: 'Release Management',
    levelId: 'level-03-containers',
    levelName: 'LEVEL 03: CONTAINERIZED DELIVERY',
    levelNum: 3,
    fileGroup: 'level03_containers',
    summary: 'Orchestrating releases: semantic tags, changelog automation, release trains, emergency hotfixes, and audit governance.',
    targetTech: ['Semantic Release', 'Release Trains', 'Hotfix Branching', 'Change Governance'],
    subchapters: [
      '18.1 Releases',
      '18.2 Release Planning',
      '18.3 Release Versioning',
      '18.4 Semantic Versioning',
      '18.5 Release Branches',
      '18.6 Release Candidates',
      '18.7 Release Notes',
      '18.8 Release Approval',
      '18.9 Release Automation',
      '18.10 Release Artifacts',
      '18.11 Release Promotion',
      '18.12 Rollbacks',
      '18.13 Hotfixes',
      '18.14 Emergency Releases',
      '18.15 Release Audit Trails',
      '18.16 Release Governance',
      '18.17 Production Release Management'
    ]
  },

  // LEVEL 04: CLOUD + ORCHESTRATION (Chapters 13, 14, 15, 16, 19)
  {
    num: 13,
    title: 'Infrastructure as Code',
    levelId: 'level-04-cloud-orchestration',
    levelName: 'LEVEL 04: CLOUD + ORCHESTRATION',
    levelNum: 4,
    fileGroup: 'level04_cloud_orchestration',
    summary: 'Automating declarative infrastructure provisioning with Terraform, state lock management, drift detection, and automated IaC pull request checks.',
    targetTech: ['Terraform', 'OpenTofu', 'Remote State', 'Drift Detection', 'TFLint'],
    academyRef: 'terraform',
    simulatorId: 'iac-provisioning',
    capstoneId: 'devops-06',
    subchapters: [
      '13.1 Infrastructure as Code',
      '13.2 Why IaC Matters',
      '13.3 Declarative Infrastructure',
      '13.4 Imperative vs Declarative',
      '13.5 Infrastructure Version Control',
      '13.6 Terraform in DevOps',
      '13.7 IaC Pipeline',
      '13.8 Terraform Plan',
      '13.9 Terraform Apply',
      '13.10 Infrastructure Testing',
      '13.11 Infrastructure Validation',
      '13.12 Infrastructure Drift',
      '13.13 State Management',
      '13.14 Remote State',
      '13.15 Infrastructure Security',
      '13.16 Infrastructure Approval',
      '13.17 Infrastructure Rollback',
      '13.18 Multi-Environment Infrastructure',
      '13.19 Infrastructure CI/CD',
      '13.20 Production IaC Workflow'
    ]
  },
  {
    num: 14,
    title: 'Configuration Management',
    levelId: 'level-04-cloud-orchestration',
    levelName: 'LEVEL 04: CLOUD + ORCHESTRATION',
    levelNum: 4,
    fileGroup: 'level04_cloud_orchestration',
    summary: 'Converging servers toward desired states using Ansible playbooks, idempotent tasks, Jinja templates, and configuration drift reconciliation.',
    targetTech: ['Ansible', 'Idempotency', 'Jinja2', 'Ansible Vault', 'Inventory'],
    subchapters: [
      '14.1 Configuration Management',
      '14.2 Configuration Drift',
      '14.3 Desired State',
      '14.4 Configuration as Code',
      '14.5 Environment Configuration',
      '14.6 Application Configuration',
      '14.7 Infrastructure Configuration',
      '14.8 Ansible in DevOps',
      '14.9 Configuration Templates',
      '14.10 Secrets in Configuration',
      '14.11 Configuration Validation',
      '14.12 Configuration Testing',
      '14.13 Configuration Deployment',
      '14.14 Configuration Rollback',
      '14.15 Configuration Security',
      '14.16 Configuration Management at Scale'
    ]
  },
  {
    num: 15,
    title: 'Cloud DevOps',
    levelId: 'level-04-cloud-orchestration',
    levelName: 'LEVEL 04: CLOUD + ORCHESTRATION',
    levelNum: 4,
    fileGroup: 'level04_cloud_orchestration',
    summary: 'Engineering resilient cloud solutions: VPC peering, availability zones, managed compute, object storage, and cloud IAM least-privilege policies.',
    targetTech: ['AWS', 'VPC', 'EC2', 'S3', 'IAM', 'Multi-AZ'],
    subchapters: [
      '15.1 Cloud Fundamentals',
      '15.2 IaaS',
      '15.3 PaaS',
      '15.4 SaaS',
      '15.5 Public Cloud',
      '15.6 Private Cloud',
      '15.7 Hybrid Cloud',
      '15.8 Multi-Cloud',
      '15.9 Cloud Regions',
      '15.10 Availability Zones',
      '15.11 Cloud Networking',
      '15.12 Cloud Compute',
      '15.13 Cloud Storage',
      '15.14 Cloud Databases',
      '15.15 Cloud IAM',
      '15.16 Cloud Security',
      '15.17 Cloud Automation',
      '15.18 Cloud Deployment',
      '15.19 Cloud Cost Management',
      '15.20 Cloud DevOps Architecture'
    ]
  },
  {
    num: 16,
    title: 'Kubernetes and Container Orchestration',
    levelId: 'level-04-cloud-orchestration',
    levelName: 'LEVEL 04: CLOUD + ORCHESTRATION',
    levelNum: 4,
    fileGroup: 'level04_cloud_orchestration',
    summary: 'Deploying microservices onto Kubernetes clusters: Deployments, Services, Ingress controllers, Helm charts, autoscaling, and health probes.',
    targetTech: ['Kubernetes', 'Helm', 'Ingress', 'HPA', 'ConfigMaps'],
    academyRef: 'kubernetes',
    capstoneId: 'devops-08',
    subchapters: [
      '16.1 Why Orchestration?',
      '16.2 Kubernetes in DevOps',
      '16.3 Container Deployment',
      '16.4 Kubernetes Deployment Pipelines',
      '16.5 Configuration Management',
      '16.6 Secrets',
      '16.7 Services',
      '16.8 Ingress',
      '16.9 Health Checks',
      '16.10 Rolling Deployments',
      '16.11 Rollbacks',
      '16.12 Scaling',
      '16.13 Autoscaling',
      '16.14 Resource Management',
      '16.15 Kubernetes CI/CD',
      '16.16 GitOps',
      '16.17 Kubernetes Security',
      '16.18 Production Kubernetes Delivery'
    ]
  },
  {
    num: 19,
    title: 'GitOps',
    levelId: 'level-04-cloud-orchestration',
    levelName: 'LEVEL 04: CLOUD + ORCHESTRATION',
    levelNum: 4,
    fileGroup: 'level04_cloud_orchestration',
    summary: 'Pull-based declarative reconciliation: managing Kubernetes state with Git as the single source of truth using Argo CD and Flux.',
    targetTech: ['Argo CD', 'Flux v2', 'Git as Single Source of Truth', 'Drift Sync'],
    simulatorId: 'gitops',
    capstoneId: 'devops-09',
    subchapters: [
      '19.1 What is GitOps?',
      '19.2 Git as Source of Truth',
      '19.3 Desired State',
      '19.4 Declarative Infrastructure',
      '19.5 GitOps Workflow',
      '19.6 Pull-Based Deployment',
      '19.7 Push vs Pull Deployment',
      '19.8 GitOps Repository Structure',
      '19.9 Environment Repositories',
      '19.10 Configuration Repositories',
      '19.11 Argo CD',
      '19.12 Flux',
      '19.13 GitOps Secrets',
      '19.14 GitOps Security',
      '19.15 GitOps Rollbacks',
      '19.16 GitOps Drift Detection',
      '19.17 GitOps Multi-Environment',
      '19.18 Production GitOps Architecture'
    ]
  },

  // LEVEL 05: DEVSECOPS (Chapters 20, 21)
  {
    num: 20,
    title: 'DevOps Security / DevSecOps',
    levelId: 'level-05-devsecops',
    levelName: 'LEVEL 05: DEVSECOPS',
    levelNum: 5,
    fileGroup: 'level05_devsecops',
    summary: 'Shifting security left into pipelines: SAST code analysis, DAST scans, container vulnerability checks, secret scanning, and software bill of materials (SBOM).',
    targetTech: ['Trivy', 'Gitleaks', 'SonarQube', 'Cosign', 'SBOM', 'SLSA'],
    simulatorId: 'devsecops',
    capstoneId: 'devops-07',
    subchapters: [
      '20.1 What is DevSecOps?',
      '20.2 Security Shift Left',
      '20.3 Secure SDLC',
      '20.4 Security in CI',
      '20.5 Dependency Scanning',
      '20.6 SAST',
      '20.7 DAST',
      '20.8 Container Scanning',
      '20.9 IaC Security',
      '20.10 Secret Scanning',
      '20.11 Credential Management',
      '20.12 Supply Chain Security',
      '20.13 Software Bill of Materials',
      '20.14 SBOM',
      '20.15 Artifact Signing',
      '20.16 Image Signing',
      '20.17 Vulnerability Management',
      '20.18 Security Gates',
      '20.19 Security Policies',
      '20.20 Runtime Security',
      '20.21 Least Privilege',
      '20.22 Zero Trust',
      '20.23 DevSecOps Pipeline',
      '20.24 Production DevSecOps Architecture'
    ]
  },
  {
    num: 21,
    title: 'Secrets and Identity Management',
    levelId: 'level-05-devsecops',
    levelName: 'LEVEL 05: DEVSECOPS',
    levelNum: 5,
    fileGroup: 'level05_devsecops',
    summary: 'Eliminating hardcoded credentials using HashiCorp Vault, cloud secret stores, dynamic ephemeral tokens, and workload identity federation.',
    targetTech: ['HashiCorp Vault', 'AWS Secrets Manager', 'OIDC', 'Workload Identity', 'SOPS'],
    subchapters: [
      '21.1 Why Secrets Matter',
      '21.2 API Keys',
      '21.3 Passwords',
      '21.4 Certificates',
      '21.5 Tokens',
      '21.6 Environment Variables',
      '21.7 Secret Managers',
      '21.8 HashiCorp Vault',
      '21.9 Cloud Secret Managers',
      '21.10 CI/CD Credentials',
      '21.11 Workload Identity',
      '21.12 IAM',
      '21.13 RBAC',
      '21.14 Least Privilege',
      '21.15 Credential Rotation',
      '21.16 Secret Auditing',
      '21.17 Secret Leakage Prevention',
      '21.18 Production Secret Architecture'
    ]
  },

  // LEVEL 06: OBSERVABILITY + SRE (Chapters 22-28)
  {
    num: 22,
    title: 'Observability',
    levelId: 'level-06-observability-sre',
    levelName: 'LEVEL 06: OBSERVABILITY + SRE',
    levelNum: 6,
    fileGroup: 'level06_observability_sre',
    summary: 'The three pillars of telemetry: Prometheus metrics, structured logs, and OpenTelemetry distributed traces for rapid diagnostic insight.',
    targetTech: ['OpenTelemetry', 'Prometheus', 'Grafana', 'Jaeger', 'Loki'],
    subchapters: [
      '22.1 What is Observability?',
      '22.2 Monitoring vs Observability',
      '22.3 The Three Pillars',
      '22.4 Metrics',
      '22.5 Logs',
      '22.6 Traces',
      '22.7 Events',
      '22.8 Application Monitoring',
      '22.9 Infrastructure Monitoring',
      '22.10 Container Monitoring',
      '22.11 Kubernetes Monitoring',
      '22.12 CI/CD Monitoring',
      '22.13 Pipeline Metrics',
      '22.14 Deployment Metrics',
      '22.15 Dashboards',
      '22.16 Alerts',
      '22.17 Alert Fatigue',
      '22.18 Prometheus',
      '22.19 Grafana',
      '22.20 OpenTelemetry',
      '22.21 Centralized Logging',
      '22.22 Production Observability Architecture'
    ]
  },
  {
    num: 23,
    title: 'Logging',
    levelId: 'level-06-observability-sre',
    levelName: 'LEVEL 06: OBSERVABILITY + SRE',
    levelNum: 6,
    fileGroup: 'level06_observability_sre',
    summary: 'Log forwarding, JSON structuring, redaction of sensitive customer data, retention tiering, and index optimization.',
    targetTech: ['Fluent Bit', 'Logstash', 'OpenSearch', 'Loki', 'Structured JSON'],
    subchapters: [
      '23.1 Why Logging Matters',
      '23.2 Log Levels',
      '23.3 Structured Logging',
      '23.4 Application Logs',
      '23.5 System Logs',
      '23.6 Container Logs',
      '23.7 CI/CD Logs',
      '23.8 Centralized Logging',
      '23.9 Log Aggregation',
      '23.10 Log Storage',
      '23.11 Log Retention',
      '23.12 Log Search',
      '23.13 Log Correlation',
      '23.14 Sensitive Data in Logs',
      '23.15 Logging Security',
      '23.16 Production Logging Architecture'
    ]
  },
  {
    num: 24,
    title: 'Monitoring and Alerting',
    levelId: 'level-06-observability-sre',
    levelName: 'LEVEL 06: OBSERVABILITY + SRE',
    levelNum: 6,
    fileGroup: 'level06_observability_sre',
    summary: 'Detecting production incidents with Prometheus alerting rules, Google Golden Signals, RED/USE methods, and PagerDuty routing.',
    targetTech: ['Prometheus Alertmanager', 'Golden Signals', 'RED Method', 'USE Method', 'PagerDuty'],
    simulatorId: 'monitoring-alerting',
    subchapters: [
      '24.1 Monitoring Fundamentals',
      '24.2 Infrastructure Metrics',
      '24.3 Application Metrics',
      '24.4 Business Metrics',
      '24.5 Golden Signals',
      '24.6 RED Method',
      '24.7 USE Method',
      '24.8 Health Checks',
      '24.9 Liveness',
      '24.10 Readiness',
      '24.11 Alert Rules',
      '24.12 Alert Severity',
      '24.13 Notification Channels',
      '24.14 Alert Routing',
      '24.15 Alert Suppression',
      '24.16 Alert Escalation',
      '24.17 Alert Runbooks',
      '24.18 Monitoring Production Systems'
    ]
  },
  {
    num: 25,
    title: 'Site Reliability Engineering',
    levelId: 'level-06-observability-sre',
    levelName: 'LEVEL 06: OBSERVABILITY + SRE',
    levelNum: 6,
    fileGroup: 'level06_observability_sre',
    summary: 'Applying software engineering principles to operations: Service Level Indicators (SLIs), Objectives (SLOs), Error Budgets, and toil elimination.',
    targetTech: ['SLIs', 'SLOs', 'Error Budgets', 'Toil Elimination', 'On-Call Operations'],
    subchapters: [
      '25.1 What is SRE?',
      '25.2 DevOps vs SRE',
      '25.3 Reliability',
      '25.4 Availability',
      '25.5 Durability',
      '25.6 Scalability',
      '25.7 SLIs',
      '25.8 SLOs',
      '25.9 SLAs',
      '25.10 Error Budgets',
      '25.11 Reliability Targets',
      '25.12 Incident Management',
      '25.13 On-Call',
      '25.14 Runbooks',
      '25.15 Playbooks',
      '25.16 Toil',
      '25.17 Reducing Toil',
      '25.18 Capacity Planning',
      '25.19 Reliability Engineering',
      '25.20 Production SRE Practices'
    ]
  },
  {
    num: 26,
    title: 'Incident Management',
    levelId: 'level-06-observability-sre',
    levelName: 'LEVEL 06: OBSERVABILITY + SRE',
    levelNum: 6,
    fileGroup: 'level06_observability_sre',
    summary: 'War-room command, triage, stakeholder communications, mitigation, recovery, and blameless postmortem root cause analyses (RCA).',
    targetTech: ['Incident Commander', 'Blameless Postmortems', 'PagerDuty', 'RCA', 'Corrective Actions'],
    simulatorId: 'incident-response',
    subchapters: [
      '26.1 What is an Incident?',
      '26.2 Incident Severity',
      '26.3 Incident Detection',
      '26.4 Alert Triage',
      '26.5 Incident Response',
      '26.6 Incident Roles',
      '26.7 Incident Commander',
      '26.8 Communication',
      '26.9 Escalation',
      '26.10 Mitigation',
      '26.11 Recovery',
      '26.12 Root Cause Analysis',
      '26.13 Postmortems',
      '26.14 Blameless Postmortems',
      '26.15 Corrective Actions',
      '26.16 Preventive Actions',
      '26.17 Incident Documentation',
      '26.18 Incident Automation',
      '26.19 Production Incident Workflow'
    ]
  },
  {
    num: 27,
    title: 'Disaster Recovery and Business Continuity',
    levelId: 'level-06-observability-sre',
    levelName: 'LEVEL 06: OBSERVABILITY + SRE',
    levelNum: 6,
    fileGroup: 'level06_observability_sre',
    summary: 'Protecting against catastrophic failures: Recovery Point Objective (RPO), Recovery Time Objective (RTO), multi-region active-active failover, and backup restores.',
    targetTech: ['RPO/RTO', 'Velero', 'Multi-Region Replication', 'DNS Failover'],
    simulatorId: 'failure-recovery',
    subchapters: [
      '27.1 Disaster Recovery',
      '27.2 Business Continuity',
      '27.3 Failure Domains',
      '27.4 Backups',
      '27.5 Backup Strategies',
      '27.6 Restore Strategies',
      '27.7 RPO',
      '27.8 RTO',
      '27.9 High Availability',
      '27.10 Fault Tolerance',
      '27.11 Disaster Recovery Testing',
      '27.12 Database Recovery',
      '27.13 Infrastructure Recovery',
      '27.14 Application Recovery',
      '27.15 Regional Failure',
      '27.16 Multi-Region Architecture',
      '27.17 Disaster Recovery Automation',
      '27.18 Production DR Architecture'
    ]
  },
  {
    num: 28,
    title: 'Performance and Scalability',
    levelId: 'level-06-observability-sre',
    levelName: 'LEVEL 06: OBSERVABILITY + SRE',
    levelNum: 6,
    fileGroup: 'level06_observability_sre',
    summary: 'Benchmarking and profiling systems: CPU/memory saturation, load testing with k6, horizontal autoscaling, and bottleneck mitigation.',
    targetTech: ['k6', 'Locust', 'Cluster Autoscaler', 'eBPF Profiling', 'Bottlenecks'],
    subchapters: [
      '28.1 Performance Fundamentals',
      '28.2 Bottlenecks',
      '28.3 CPU',
      '28.4 Memory',
      '28.5 Disk',
      '28.6 Network',
      '28.7 Application Performance',
      '28.8 Database Performance',
      '28.9 Container Performance',
      '28.10 CI/CD Performance',
      '28.11 Pipeline Optimization',
      '28.12 Horizontal Scaling',
      '28.13 Vertical Scaling',
      '28.14 Autoscaling',
      '28.15 Load Testing',
      '28.16 Stress Testing',
      '28.17 Capacity Planning',
      '28.18 Performance Monitoring',
      '28.19 Production Scaling'
    ]
  },

  // LEVEL 07: PLATFORM ENGINEERING (Chapters 29-36)
  {
    num: 29,
    title: 'Cost Optimization',
    levelId: 'level-07-platform-engineering',
    levelName: 'LEVEL 07: PLATFORM ENGINEERING',
    levelNum: 7,
    fileGroup: 'level07_platform_engineering',
    summary: 'FinOps fundamentals: resource rightsizing, spot instances, ephemeral environment teardown, and Kubernetes cost monitoring with Kubecost.',
    targetTech: ['Kubecost', 'FinOps', 'Spot Instances', 'CloudWatch Cost Allocation'],
    subchapters: [
      '29.1 DevOps and Cost',
      '29.2 Cloud Cost Fundamentals',
      '29.3 Infrastructure Cost',
      '29.4 Compute Cost',
      '29.5 Storage Cost',
      '29.6 Network Cost',
      '29.7 CI/CD Cost',
      '29.8 Build Cost',
      '29.9 Container Cost',
      '29.10 Kubernetes Cost',
      '29.11 Resource Rightsizing',
      '29.12 Autoscaling and Cost',
      '29.13 Idle Resource Detection',
      '29.14 Cost Monitoring',
      '29.15 Cost Allocation',
      '29.16 FinOps Fundamentals',
      '29.17 Production Cost Optimization'
    ]
  },
  {
    num: 30,
    title: 'Platform Engineering',
    levelId: 'level-07-platform-engineering',
    levelName: 'LEVEL 07: PLATFORM ENGINEERING',
    levelNum: 7,
    fileGroup: 'level07_platform_engineering',
    summary: 'Building internal developer platforms (IDP), establishing Golden Paths, self-service infrastructure abstractions, and improving developer velocity.',
    targetTech: ['Platform APIs', 'Golden Paths', 'Developer Experience', 'Self-Service'],
    subchapters: [
      '30.1 What is Platform Engineering?',
      '30.2 DevOps vs Platform Engineering',
      '30.3 Internal Developer Platforms',
      '30.4 Developer Experience',
      '30.5 Self-Service Infrastructure',
      '30.6 Golden Paths',
      '30.7 Platform APIs',
      '30.8 Developer Portals',
      '30.9 Service Catalogs',
      '30.10 Templates',
      '30.11 Platform Automation',
      '30.12 Platform Security',
      '30.13 Platform Observability',
      '30.14 Platform Reliability',
      '30.15 Platform Governance',
      '30.16 Platform Engineering Architecture'
    ]
  },
  {
    num: 31,
    title: 'Internal Developer Platforms',
    levelId: 'level-07-platform-engineering',
    levelName: 'LEVEL 07: PLATFORM ENGINEERING',
    levelNum: 7,
    fileGroup: 'level07_platform_engineering',
    summary: 'Architecting developer portals with Spotify Backstage, service catalogs, software templates, and automated environment provisioning.',
    targetTech: ['Backstage', 'Service Catalog', 'Software Templates', 'Score'],
    subchapters: [
      '31.1 IDP Fundamentals',
      '31.2 Developer Self-Service',
      '31.3 Application Templates',
      '31.4 Infrastructure Templates',
      '31.5 Service Catalog',
      '31.6 Environment Provisioning',
      '31.7 Deployment Automation',
      '31.8 Secrets Integration',
      '31.9 Observability Integration',
      '31.10 Developer Portals',
      '31.11 Backstage',
      '31.12 Platform APIs',
      '31.13 Platform Governance',
      '31.14 Golden Paths',
      '31.15 Production IDP Architecture'
    ]
  },
  {
    num: 32,
    title: 'Automation and Scripting',
    levelId: 'level-07-platform-engineering',
    levelName: 'LEVEL 07: PLATFORM ENGINEERING',
    levelNum: 7,
    fileGroup: 'level07_platform_engineering',
    summary: 'Industrial-grade automation using Bash scripts, Python SDKs, PowerShell modules, CLI utilities, and event-driven automation daemons.',
    targetTech: ['Bash', 'Python SDK', 'PowerShell', 'CLI Automation', 'Self-Healing Daemons'],
    subchapters: [
      '32.1 Automation Fundamentals',
      '32.2 Bash Automation',
      '32.3 Python Automation',
      '32.4 PowerShell',
      '32.5 CLI Automation',
      '32.6 API Automation',
      '32.7 Scheduled Automation',
      '32.8 Event-Driven Automation',
      '32.9 Infrastructure Automation',
      '32.10 Deployment Automation',
      '32.11 Operational Automation',
      '32.12 Self-Healing Automation',
      '32.13 Automation Security',
      '32.14 Automation Testing',
      '32.15 Production Automation'
    ]
  },
  {
    num: 33,
    title: 'Testing in DevOps',
    levelId: 'level-07-platform-engineering',
    levelName: 'LEVEL 07: PLATFORM ENGINEERING',
    levelNum: 7,
    fileGroup: 'level07_platform_engineering',
    summary: 'The comprehensive test pyramid: unit, integration, consumer-driven contract tests with Pact, smoke checks, and infrastructure testing with Terratest.',
    targetTech: ['Test Pyramid', 'Pact', 'Terratest', 'k6', 'Smoke Tests'],
    capstoneId: 'devops-02',
    subchapters: [
      '33.1 Testing Strategy',
      '33.2 Test Pyramid',
      '33.3 Unit Testing',
      '33.4 Integration Testing',
      '33.5 System Testing',
      '33.6 End-to-End Testing',
      '33.7 Regression Testing',
      '33.8 Smoke Testing',
      '33.9 Contract Testing',
      '33.10 Performance Testing',
      '33.11 Load Testing',
      '33.12 Security Testing',
      '33.13 Infrastructure Testing',
      '33.14 Container Testing',
      '33.15 Kubernetes Testing',
      '33.16 Pipeline Testing',
      '33.17 Test Automation',
      '33.18 Test Environments',
      '33.19 Production Testing'
    ]
  },
  {
    num: 34,
    title: 'Databases in DevOps',
    levelId: 'level-07-platform-engineering',
    levelName: 'LEVEL 07: PLATFORM ENGINEERING',
    levelNum: 7,
    fileGroup: 'level07_platform_engineering',
    summary: 'Managing database lifecycle in CI/CD: version-controlled migrations with Flyway, expand-contract zero-downtime schemas, and automated snapshot restores.',
    targetTech: ['Flyway', 'Liquibase', 'PostgreSQL', 'Expand-Contract Pattern'],
    subchapters: [
      '34.1 Databases and DevOps',
      '34.2 Database Deployment',
      '34.3 Database Migrations',
      '34.4 Schema Versioning',
      '34.5 Migration Automation',
      '34.6 Backups',
      '34.7 Restore',
      '34.8 Database Monitoring',
      '34.9 Database Security',
      '34.10 Database Secrets',
      '34.11 Database High Availability',
      '34.12 Database Scaling',
      '34.13 Database Rollbacks',
      '34.14 Zero-Downtime Migrations',
      '34.15 Production Database Operations'
    ]
  },
  {
    num: 35,
    title: 'Microservices and DevOps',
    levelId: 'level-07-platform-engineering',
    levelName: 'LEVEL 07: PLATFORM ENGINEERING',
    levelNum: 7,
    fileGroup: 'level07_platform_engineering',
    summary: 'Operating distributed microservice meshes: API gateways, service discovery, circuit breakers, distributed context propagation, and independent deployment cycles.',
    targetTech: ['API Gateway', 'Envoy', 'Circuit Breakers', 'Distributed Tracing', 'Service Mesh'],
    subchapters: [
      '35.1 Microservices Fundamentals',
      '35.2 Monolith vs Microservices',
      '35.3 Service Boundaries',
      '35.4 Service Communication',
      '35.5 API Gateways',
      '35.6 Service Discovery',
      '35.7 Configuration',
      '35.8 Secrets',
      '35.9 Independent Deployment',
      '35.10 Versioning',
      '35.11 Distributed Systems',
      '35.12 Distributed Tracing',
      '35.13 Failure Handling',
      '35.14 Circuit Breakers',
      '35.15 Retry Strategies',
      '35.16 Microservice Observability',
      '35.17 Microservice CI/CD',
      '35.18 Production Microservice Architecture'
    ]
  },
  {
    num: 36,
    title: 'API and DevOps Integration',
    levelId: 'level-07-platform-engineering',
    levelName: 'LEVEL 07: PLATFORM ENGINEERING',
    levelNum: 7,
    fileGroup: 'level07_platform_engineering',
    summary: 'Interconnecting toolchains through REST APIs, signed webhooks, mutual TLS, event dispatchers, and rate-limited automation brokers.',
    targetTech: ['REST APIs', 'Webhooks', 'mTLS', 'API Rate Limiting', 'Event-Driven Webhooks'],
    subchapters: [
      '36.1 APIs in DevOps',
      '36.2 REST APIs',
      '36.3 Webhooks',
      '36.4 API Authentication',
      '36.5 API Tokens',
      '36.6 API Automation',
      '36.7 CI/CD APIs',
      '36.8 Cloud APIs',
      '36.9 Infrastructure APIs',
      '36.10 Monitoring APIs',
      '36.11 Event-Driven Automation',
      '36.12 API Security',
      '36.13 API Rate Limits',
      '36.14 Production API Automation'
    ]
  },

  // LEVEL 08: ADVANCED DEVOPS (Chapters 37-45)
  {
    num: 37,
    title: 'Policy as Code',
    levelId: 'level-08-advanced-devops',
    levelName: 'LEVEL 08: ADVANCED DEVOPS',
    levelNum: 8,
    fileGroup: 'level08_advanced_devops',
    summary: 'Codifying security and governance guardrails using Open Policy Agent (OPA), Rego rules, Kyverno admission controllers, and Conftest pipeline tests.',
    targetTech: ['OPA', 'Rego', 'Kyverno', 'Gatekeeper', 'Conftest'],
    subchapters: [
      '37.1 What is Policy as Code?',
      '37.2 Why Policy as Code?',
      '37.3 Infrastructure Policies',
      '37.4 Security Policies',
      '37.5 Compliance Policies',
      '37.6 Deployment Policies',
      '37.7 Admission Policies',
      '37.8 Open Policy Agent',
      '37.9 Policy Enforcement',
      '37.10 Policy Testing',
      '37.11 Policy Versioning',
      '37.12 Policy Automation',
      '37.13 Production Governance'
    ]
  },
  {
    num: 38,
    title: 'Compliance and Governance',
    levelId: 'level-08-advanced-devops',
    levelName: 'LEVEL 08: ADVANCED DEVOPS',
    levelNum: 8,
    fileGroup: 'level08_advanced_devops',
    summary: 'Automating regulatory audits (SOC 2, ISO 27001, HIPAA) with cryptographic change logs, automated evidence collection, and strict separation of duties.',
    targetTech: ['SOC 2', 'Audit Trails', 'Separation of Duties', 'Compliance as Code'],
    subchapters: [
      '38.1 DevOps Governance',
      '38.2 Change Management',
      '38.3 Audit Trails',
      '38.4 Access Control',
      '38.5 Separation of Duties',
      '38.6 Compliance Automation',
      '38.7 Security Policies',
      '38.8 Infrastructure Policies',
      '38.9 Deployment Policies',
      '38.10 Evidence Collection',
      '38.11 Audit Automation',
      '38.12 Compliance as Code',
      '38.13 Production Governance'
    ]
  },
  {
    num: 39,
    title: 'Software Supply Chain Security',
    levelId: 'level-08-advanced-devops',
    levelName: 'LEVEL 08: ADVANCED DEVOPS',
    levelNum: 8,
    fileGroup: 'level08_advanced_devops',
    summary: 'Defending against dependency confusion, typo-squatting, and malicious build tampering using SLSA frameworks, in-toto attestations, and Cosign signatures.',
    targetTech: ['SLSA Level 3', 'Sigstore', 'Cosign', 'in-toto', 'Syft SBOM'],
    subchapters: [
      '39.1 Software Supply Chain',
      '39.2 Supply Chain Threats',
      '39.3 Dependency Security',
      '39.4 Dependency Pinning',
      '39.5 Dependency Scanning',
      '39.6 SBOM',
      '39.7 Artifact Signing',
      '39.8 Image Signing',
      '39.9 Provenance',
      '39.10 Build Integrity',
      '39.11 Trusted Builds',
      '39.12 SLSA',
      '39.13 Software Supply Chain Attacks',
      '39.14 Supply Chain Security Architecture'
    ]
  },
  {
    num: 40,
    title: 'Advanced CI/CD Architectures',
    levelId: 'level-08-advanced-devops',
    levelName: 'LEVEL 08: ADVANCED DEVOPS',
    levelNum: 8,
    fileGroup: 'level08_advanced_devops',
    summary: 'Scaling build systems for enterprise scale: affected-based monorepo graphs, dynamic parallel matrices, ephemeral runners, and cross-repo orchestration.',
    targetTech: ['Monorepo DAGs', 'Dynamic Matrix', 'Reusable Workflows', 'Runner Auto-Scaling'],
    subchapters: [
      '40.1 Enterprise CI/CD',
      '40.2 Multi-Repository Pipelines',
      '40.3 Monorepo Pipelines',
      '40.4 Multi-Application Pipelines',
      '40.5 Multi-Environment Pipelines',
      '40.6 Multi-Cloud Pipelines',
      '40.7 Parallel Pipelines',
      '40.8 Dynamic Pipelines',
      '40.9 Reusable Pipelines',
      '40.10 Pipeline Templates',
      '40.11 Pipeline Governance',
      '40.12 Pipeline Security',
      '40.13 Pipeline Observability',
      '40.14 Pipeline Scaling',
      '40.15 Enterprise CI/CD Architecture'
    ]
  },
  {
    num: 41,
    title: 'Multi-Environment DevOps',
    levelId: 'level-08-advanced-devops',
    levelName: 'LEVEL 08: ADVANCED DEVOPS',
    levelNum: 8,
    fileGroup: 'level08_advanced_devops',
    summary: 'Maintaining consistency across Development, Test, QA, Staging, and Production while isolating secrets, credentials, and network topologies.',
    targetTech: ['Environment Promotion', 'Configuration Isolation', 'Ephemeral Staging', 'Drift Gates'],
    simulatorId: 'multi-env-deployment',
    capstoneId: 'devops-05',
    subchapters: [
      '41.1 Environment Strategy',
      '41.2 Development',
      '41.3 Testing',
      '41.4 QA',
      '41.5 Staging',
      '41.6 Production',
      '41.7 Environment Promotion',
      '41.8 Environment Isolation',
      '41.9 Configuration Management',
      '41.10 Secrets Management',
      '41.11 Infrastructure Differences',
      '41.12 Deployment Gates',
      '41.13 Environment Drift',
      '41.14 Environment Automation',
      '41.15 Production Environment Architecture'
    ]
  },
  {
    num: 42,
    title: 'Multi-Cloud and Hybrid DevOps',
    levelId: 'level-08-advanced-devops',
    levelName: 'LEVEL 08: ADVANCED DEVOPS',
    levelNum: 8,
    fileGroup: 'level08_advanced_devops',
    summary: 'Bridging AWS, GCP, Azure, and on-premises datacenters: cloud abstraction, wireguard mesh interconnects, unified IAM federation, and cross-cloud failover.',
    targetTech: ['Hybrid Cloud', 'Multi-Cloud', 'Cloud Portability', 'WireGuard', 'Anthos/Arc'],
    subchapters: [
      '42.1 Multi-Cloud Fundamentals',
      '42.2 Hybrid Cloud',
      '42.3 Cloud Abstraction',
      '42.4 Cloud Provider Differences',
      '42.5 Multi-Cloud Networking',
      '42.6 Multi-Cloud Identity',
      '42.7 Multi-Cloud Infrastructure',
      '42.8 Multi-Cloud CI/CD',
      '42.9 Multi-Cloud Monitoring',
      '42.10 Multi-Cloud Security',
      '42.11 Cloud Portability',
      '42.12 Vendor Lock-In',
      '42.13 Multi-Cloud Disaster Recovery',
      '42.14 Production Multi-Cloud Architecture'
    ]
  },
  {
    num: 43,
    title: 'DevOps Troubleshooting',
    levelId: 'level-08-advanced-devops',
    levelName: 'LEVEL 08: ADVANCED DEVOPS',
    levelNum: 8,
    fileGroup: 'level08_advanced_devops',
    summary: 'Systematic diagnosis of production and delivery failures: pipeline stalls, network DNS timeouts, CrashLoopBackOff pods, and connection pool exhaustion.',
    targetTech: ['strace', 'tcpdump', 'kubectl debug', 'journalctl', 'Diagnostic Methodology'],
    subchapters: [
      '43.1 Troubleshooting Methodology',
      '43.2 Pipeline Failures',
      '43.3 Build Failures',
      '43.4 Test Failures',
      '43.5 Deployment Failures',
      '43.6 Container Failures',
      '43.7 Network Failures',
      '43.8 DNS Failures',
      '43.9 Authentication Failures',
      '43.10 Infrastructure Failures',
      '43.11 Kubernetes Failures',
      '43.12 Performance Problems',
      '43.13 Resource Exhaustion',
      '43.14 Configuration Errors',
      '43.15 Secret Problems',
      '43.16 Certificate Problems',
      '43.17 Monitoring Problems',
      '43.18 Production Debugging',
      '43.19 Root Cause Analysis'
    ]
  },
  {
    num: 44,
    title: 'DevOps Design Patterns',
    levelId: 'level-08-advanced-devops',
    levelName: 'LEVEL 08: ADVANCED DEVOPS',
    levelNum: 8,
    fileGroup: 'level08_advanced_devops',
    summary: 'Time-tested architectural patterns: Immutable Infrastructure, GitOps reconciliation, Strangler Fig application migrations, and Golden Paths.',
    targetTech: ['Immutable Infrastructure', 'GitOps Pattern', 'Progressive Delivery', 'Self-Healing'],
    subchapters: [
      '44.1 Immutable Infrastructure',
      '44.2 Infrastructure as Code',
      '44.3 Pipeline as Code',
      '44.4 Configuration as Code',
      '44.5 GitOps',
      '44.6 Progressive Delivery',
      '44.7 Blue-Green Deployment',
      '44.8 Canary Deployment',
      '44.9 Self-Healing Systems',
      '44.10 Declarative Systems',
      '44.11 Event-Driven Automation',
      '44.12 Pull-Based Automation',
      '44.13 Golden Paths',
      '44.14 Platform Engineering Patterns',
      '44.15 Production Architecture Patterns'
    ]
  },
  {
    num: 45,
    title: 'DevOps Anti-Patterns',
    levelId: 'level-08-advanced-devops',
    levelName: 'LEVEL 08: ADVANCED DEVOPS',
    levelNum: 8,
    fileGroup: 'level08_advanced_devops',
    summary: 'Identifying and eliminating engineering antipatterns: snowflake servers, long-lived feature branches, hardcoded secrets, alert fatigue, and tool sprawl.',
    targetTech: ['Snowflakes', 'Tool Sprawl', 'Alert Fatigue', 'Long-Lived Branches'],
    subchapters: [
      '45.1 Manual Deployments',
      '45.2 Snowflake Servers',
      '45.3 Configuration Drift',
      '45.4 Hardcoded Secrets',
      '45.5 Mutable Infrastructure',
      '45.6 Long-Lived Branches',
      '45.7 Giant Pipelines',
      '45.8 Fragile Pipelines',
      '45.9 No Rollback Strategy',
      '45.10 No Monitoring',
      '45.11 Alert Fatigue',
      '45.12 Over-Automation',
      '45.13 Under-Automation',
      '45.14 Excessive Tooling',
      '45.15 Tool Sprawl',
      '45.16 Overengineering',
      '45.17 Production Anti-Patterns'
    ]
  },

  // LEVEL 09: ENTERPRISE DEVOPS (Chapters 46-49)
  {
    num: 46,
    title: 'DevOps Metrics',
    levelId: 'level-09-enterprise-devops',
    levelName: 'LEVEL 09: ENTERPRISE DEVOPS',
    levelNum: 9,
    fileGroup: 'level09_enterprise_devops',
    summary: 'Quantifying software delivery velocity and stability using DORA metrics: Deployment Frequency, Lead Time for Changes, Change Failure Rate, and MTTR.',
    targetTech: ['DORA Metrics', 'Lead Time', 'MTTR', 'Change Failure Rate', 'Deployment Frequency'],
    subchapters: [
      '46.1 Why Metrics Matter',
      '46.2 Engineering Metrics',
      '46.3 Deployment Frequency',
      '46.4 Lead Time for Changes',
      '46.5 Change Failure Rate',
      '46.6 Mean Time to Recovery',
      '46.7 Mean Time Between Failures',
      '46.8 Cycle Time',
      '46.9 Pipeline Duration',
      '46.10 Build Success Rate',
      '46.11 Deployment Success Rate',
      '46.12 Incident Metrics',
      '46.13 Reliability Metrics',
      '46.14 Developer Experience Metrics',
      '46.15 Platform Metrics',
      '46.16 Business Metrics',
      '46.17 DORA Metrics',
      '46.18 Metrics Interpretation',
      '46.19 Avoiding Metric Gaming'
    ]
  },
  {
    num: 47,
    title: 'DevOps Documentation',
    levelId: 'level-09-enterprise-devops',
    levelName: 'LEVEL 09: ENTERPRISE DEVOPS',
    levelNum: 9,
    fileGroup: 'level09_enterprise_devops',
    summary: 'Treating documentation as code: Architecture Decision Records (ADRs), operational runbooks, disaster recovery playbooks, and automated living docs.',
    targetTech: ['Documentation as Code', 'ADRs', 'Runbooks', 'Markdown', 'Mermaid Diagrams'],
    subchapters: [
      '47.1 Why Documentation Matters',
      '47.2 README',
      '47.3 Architecture Documentation',
      '47.4 Architecture Decision Records',
      '47.5 Runbooks',
      '47.6 Playbooks',
      '47.7 Deployment Documentation',
      '47.8 Disaster Recovery Documentation',
      '47.9 Incident Documentation',
      '47.10 API Documentation',
      '47.11 Infrastructure Documentation',
      '47.12 Operational Documentation',
      '47.13 Documentation Automation',
      '47.14 Documentation as Code'
    ]
  },
  {
    num: 48,
    title: 'Production Operations',
    levelId: 'level-09-enterprise-devops',
    levelName: 'LEVEL 09: ENTERPRISE DEVOPS',
    levelNum: 9,
    fileGroup: 'level09_enterprise_devops',
    summary: 'The operational rituals of live systems: Production Readiness Reviews (PRR), on-call rotations, scheduled maintenance windows, and safe rollout controls.',
    targetTech: ['Production Readiness Review', 'On-Call', 'Change Advisory', 'Maintenance Windows'],
    subchapters: [
      '48.1 Production Readiness',
      '48.2 Production Checklist',
      '48.3 Deployment Readiness',
      '48.4 Security Readiness',
      '48.5 Monitoring Readiness',
      '48.6 Backup Readiness',
      '48.7 Disaster Recovery Readiness',
      '48.8 Scaling Readiness',
      '48.9 Incident Readiness',
      '48.10 Operational Readiness',
      '48.11 Runbooks',
      '48.12 On-Call',
      '48.13 Change Management',
      '48.14 Production Releases',
      '48.15 Production Troubleshooting',
      '48.16 Production Maintenance',
      '48.17 Production Architecture Review'
    ]
  },
  {
    num: 49,
    title: 'DevOps Architecture',
    levelId: 'level-09-enterprise-devops',
    levelName: 'LEVEL 09: ENTERPRISE DEVOPS',
    levelNum: 9,
    fileGroup: 'level09_enterprise_devops',
    summary: 'Holistic system design uniting multi-tier applications, cloud VPC infrastructure, container orchestration, zero-trust security, and high-availability topologies.',
    targetTech: ['Enterprise Architecture', 'High Availability', 'Multi-Region Topology', 'Zero Trust'],
    subchapters: [
      '49.1 DevOps Architecture Fundamentals',
      '49.2 Application Architecture',
      '49.3 Infrastructure Architecture',
      '49.4 CI/CD Architecture',
      '49.5 Cloud Architecture',
      '49.6 Container Architecture',
      '49.7 Kubernetes Architecture',
      '49.8 Observability Architecture',
      '49.9 Security Architecture',
      '49.10 Networking Architecture',
      '49.11 Multi-Environment Architecture',
      '49.12 Multi-Cloud Architecture',
      '49.13 High Availability Architecture',
      '49.14 Disaster Recovery Architecture',
      '49.15 Enterprise DevOps Architecture'
    ]
  },

  // LEVEL 10: PRODUCTION DEVOPS (Chapter 50)
  {
    num: 50,
    title: 'End-to-End Production DevOps',
    levelId: 'level-10-production-devops',
    levelName: 'LEVEL 10: PRODUCTION DEVOPS',
    levelNum: 10,
    fileGroup: 'level10_production_devops',
    summary: 'The ultimate synthesis: uniting Git, Linux, Docker, CI/CD, Terraform, Kubernetes, Helm, Argo CD, Vault, Prometheus, and PagerDuty into an enterprise delivery platform.',
    targetTech: ['Git', 'Linux', 'Docker', 'CI/CD', 'Terraform', 'Kubernetes', 'ArgoCD', 'Vault', 'Prometheus'],
    simulatorId: 'production-release',
    capstoneId: 'ultimate-01',
    subchapters: [
      '50.1 Complete DevOps Lifecycle',
      '50.2 Developer to Production Flow',
      '50.3 Git to CI',
      '50.4 CI to Artifact',
      '50.5 Artifact to Deployment',
      '50.6 Infrastructure Provisioning',
      '50.7 Container Deployment',
      '50.8 Kubernetes Deployment',
      '50.9 Security Integration',
      '50.10 Observability Integration',
      '50.11 Monitoring and Alerting',
      '50.12 Incident Management',
      '50.13 Rollback',
      '50.14 Disaster Recovery',
      '50.15 Scaling',
      '50.16 Cost Optimization',
      '50.17 Governance',
      '50.18 Production Readiness',
      '50.19 Enterprise DevOps Architecture',
      '50.20 Final End-to-End DevOps Workflow'
    ]
  }
];

// Helper to sanitize strings for TS export
function cleanTitle(str) {
  return str.replace(/^[0-9.]+\s*/, '').trim();
}

// Generate topic-specific 20 pedagogical dimensions
function generateLesson(chMeta, subStr, subIndex) {
  const code = subStr.split(' ')[0];
  const title = cleanTitle(subStr);
  const chPad = String(chMeta.num).padStart(2, '0');
  const subPad = String(subIndex + 1).padStart(2, '0');
  const id = `devops-${chPad}-${subPad}`;

  // Topic classification
  const tLower = title.toLowerCase();
  const cTitle = chMeta.title.toLowerCase();

  // Difficulty tiering
  let difficulty = 'Intermediate';
  if (chMeta.num <= 4 || subIndex <= 2) difficulty = 'Beginner';
  else if (chMeta.num >= 37 || title.includes('Architecture') || title.includes('Enterprise')) difficulty = 'Expert';
  else if (chMeta.num === 50) difficulty = 'Production';
  else if (chMeta.num >= 20) difficulty = 'Advanced';

  // Cross-academy relationships
  const relatedConcepts = [];
  if (tLower.includes('git') || tLower.includes('branch') || tLower.includes('pr') || tLower.includes('commit') || tLower.includes('trunk') || cTitle.includes('source control')) {
    relatedConcepts.push({
      name: 'Git Version Control & Branching',
      academy: 'git',
      route: '/cloudstack/git?concept=branching',
      linkText: 'Master Git Branching & Workflows in Git Academy →',
      relationship: 'Core source code version control, pull requests, and commit standards for CI triggers'
    });
  }
  if (tLower.includes('linux') || tLower.includes('systemd') || tLower.includes('process') || tLower.includes('permission') || tLower.includes('ssh') || tLower.includes('bash') || tLower.includes('cron') || cTitle.includes('linux')) {
    relatedConcepts.push({
      name: 'Linux Systems & Process Supervision',
      academy: 'linux',
      route: '/cloudstack/linux?concept=systemd',
      linkText: 'Deep-dive into Linux Systemd & Shell Engineering in Linux Academy →',
      relationship: 'Underlying operating system substrate hosting container runtimes, runners, and background daemons'
    });
  }
  if (tLower.includes('docker') || tLower.includes('container') || tLower.includes('image') || tLower.includes('compose') || tLower.includes('multi-stage') || cTitle.includes('docker') || cTitle.includes('container')) {
    relatedConcepts.push({
      name: 'Docker Containerization & Image Engineering',
      academy: 'docker',
      route: '/cloudstack/docker?concept=dk68-04-multi-stage-build-implementation',
      linkText: 'Explore Multi-Stage Dockerfile Optimization in Docker Academy →',
      relationship: 'Packaging software dependencies and runtime into immutable OCI container artifacts'
    });
  }
  if (tLower.includes('kubernetes') || tLower.includes('k8s') || tLower.includes('pod') || tLower.includes('ingress') || tLower.includes('helm') || tLower.includes('orchestration') || cTitle.includes('kubernetes')) {
    relatedConcepts.push({
      name: 'Kubernetes Workloads & Service Networking',
      academy: 'kubernetes',
      route: '/cloudstack/kubernetes?concept=deployments',
      linkText: 'Explore Kubernetes Deployments & Ingress in Kubernetes Academy →',
      relationship: 'Declarative workload scheduling, traffic routing, rolling deployment controllers, and autoscaling'
    });
  }
  if (tLower.includes('terraform') || tLower.includes('iac') || tLower.includes('state') || tLower.includes('provision') || cTitle.includes('infrastructure as code')) {
    relatedConcepts.push({
      name: 'Terraform Declarative Provisioning',
      academy: 'terraform',
      route: '/cloudstack/terraform?concept=state',
      linkText: 'Master Terraform State & HCL Modules in Terraform Academy →',
      relationship: 'Automating immutable cloud infrastructure provisioning with remote state locking'
    });
  }

  // Always at least 2 related concepts
  if (relatedConcepts.length < 2) {
    relatedConcepts.push({
      name: 'DevOps Continuous Delivery Pipeline',
      academy: 'devops',
      route: '/cloudstack/devops?concept=ch08-continuous-delivery',
      linkText: 'Explore Continuous Delivery Pipelines in DevOps Academy →',
      relationship: 'Automating progressive deployment verification and release gates'
    });
  }
  if (relatedConcepts.length < 3) {
    relatedConcepts.push({
      name: 'Site Reliability Engineering Telemetry',
      academy: 'devops',
      route: '/cloudstack/devops?concept=ch22-observability',
      linkText: 'Explore Observability & Telemetry in DevOps Academy →',
      relationship: 'Monitoring production health signals to trigger automated canary evaluation and rollbacks'
    });
  }

  // Generate realistic configuration/syntax snippet
  let syntaxLanguage = 'yaml';
  let syntaxFile = 'pipeline.yml';
  let syntaxCode = '';
  let syntaxExplanation = '';

  if (tLower.includes('terraform') || tLower.includes('iac') || cTitle.includes('infrastructure')) {
    syntaxLanguage = 'hcl';
    syntaxFile = 'main.tf';
    syntaxCode = `terraform {
  required_version = ">= 1.7.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40"
    }
  }
  backend "s3" {
    bucket         = "production-terraform-state-backend"
    key            = "devops/infrastructure/v1.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock-table"
    encrypt        = true
  }
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Environment = "production"
    ManagedBy   = "Terraform"
  }
}`;
    syntaxExplanation = 'Declares remote state with DynamoDB locking to prevent concurrent mutation, and defines a hardened VPC network.';
  } else if (tLower.includes('docker') || tLower.includes('container') || cTitle.includes('docker')) {
    syntaxLanguage = 'dockerfile';
    syntaxFile = 'Dockerfile';
    syntaxCode = `# Build Stage: Compile and test in a full SDK container
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline
COPY . .
RUN npm run build && npm run test:ci

# Production Runtime Stage: Distroless minimal runner
FROM gcr.io/distroless/nodejs20-debian12:nonroot
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER nonroot:nonroot
EXPOSE 8080
ENV NODE_ENV=production
CMD ["dist/server.js"]`;
    syntaxExplanation = 'Multi-stage Dockerfile that isolates build tools from the final distroless runtime container, minimizing attack surface and CVEs.';
  } else if (tLower.includes('kubernetes') || tLower.includes('k8s') || tLower.includes('helm') || cTitle.includes('kubernetes') || cTitle.includes('gitops')) {
    syntaxLanguage = 'yaml';
    syntaxFile = 'deployment.yaml';
    syntaxCode = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-service
  namespace: production
  labels:
    app.kubernetes.io/name: payment-service
    app.kubernetes.io/part-of: checkout-platform
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
  selector:
    matchLabels:
      app: payment-service
  template:
    metadata:
      labels:
        app: payment-service
    spec:
      containers:
      - name: payment-api
        image: ghcr.io/organization/payment-api:v2.4.1@sha256:7c91a8...
        ports:
        - containerPort: 8080
        readinessProbe:
          httpGet:
            path: /healthz/ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
        resources:
          limits:
            cpu: "1000m"
            memory: "1Gi"
          requests:
            cpu: "250m"
            memory: "256Mi"`;
    syntaxExplanation = 'Production-grade Kubernetes Deployment with zero-downtime rolling update strategy, immutable SHA256 image digest, and health probes.';
  } else if (tLower.includes('ansible') || cTitle.includes('configuration')) {
    syntaxLanguage = 'yaml';
    syntaxFile = 'playbook.yml';
    syntaxCode = `- name: Converge Production Host to Hardened State
  hosts: production_nodes
  become: yes
  vars:
    app_version: "2.1.0"
  tasks:
    - name: Ensure systemd supervisor is running
      ansible.builtin.systemd:
        name: secure-agent
        state: started
        enabled: yes

    - name: Apply kernel network parameters
      ansible.posix.sysctl:
        name: net.ipv4.ip_forward
        value: '1'
        sysctl_set: yes
        state: present
        reload: yes`;
    syntaxExplanation = 'Idempotent Ansible playbook converging host state and systemd services with declared desired configuration.';
  } else if (tLower.includes('prometheus') || tLower.includes('alert') || tLower.includes('monitor') || cTitle.includes('monitoring')) {
    syntaxLanguage = 'yaml';
    syntaxFile = 'alerts.rules.yml';
    syntaxCode = `groups:
  - name: production-slos
    rules:
      - alert: HighHttpErrorRate5xx
        expr: (sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))) * 100 > 1.0
        for: 2m
        labels:
          severity: critical
          team: platform-core
        annotations:
          summary: "HTTP 5xx error budget burn rate exceeded (current: {{ $value | printf '%.2f' }}%)"
          runbook_url: "https://wiki.internal/runbooks/high-error-rate"`;
    syntaxExplanation = 'Prometheus alerting rule evaluating SLO error budget burn rate over a 5-minute sliding window with PagerDuty integration.';
  } else if (tLower.includes('bash') || tLower.includes('linux') || tLower.includes('script') || cTitle.includes('automation')) {
    syntaxLanguage = 'bash';
    syntaxFile = 'deploy-gate.sh';
    syntaxCode = `#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

echo "=== Verifying Cluster Readiness before Rollout ==="
TARGET_ENV="\${1:-staging}"
CLUSTER_HEALTH=$(curl -s -f "https://api.\${TARGET_ENV}.internal/healthz" || echo "UNHEALTHY")

if [[ "\${CLUSTER_HEALTH}" != "OK" ]]; then
  echo "Error: Target cluster \${TARGET_ENV} reported unhealthy: \${CLUSTER_HEALTH}" >&2
  exit 1
fi

echo "✓ Cluster verified healthy. Proceeding with deployment execution."`;
    syntaxExplanation = 'Defensive Bash script using strict error handling (set -euo pipefail) to validate health before executing promotion commands.';
  } else {
    // Default GitHub Actions CI/CD Pipeline
    syntaxLanguage = 'yaml';
    syntaxFile = '.github/workflows/pipeline.yml';
    syntaxCode = `name: Production Delivery Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read
  packages: write
  id-token: write

jobs:
  verify:
    name: Verify & Validate
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Commit
        uses: actions/checkout@v4

      - name: Setup Node Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Deterministic Dependencies
        run: npm ci

      - name: Run Linters & Security Tests
        run: |
          npm run lint
          npm run test:coverage`;
    syntaxExplanation = 'Automated declarative CI workflow executing deterministic installs, linting, and automated tests with least-privilege token permissions.';
  }

  // Structured pedagogical content generator
  const whatIsIt = `${title} is a core operational and engineering capability within the modern software delivery lifecycle. In the context of ${chMeta.title}, it establishes the automated contracts, architectural controls, and operational feedback loops required to safely move code from developer check-ins to production workloads with zero friction and maximum reliability.`;

  const simpleExplanation = `Imagine a modern automobile factory: instead of building each car by hand and hoping the brakes work after delivery, an automated assembly line inspects every component at every station. ${title} is that automated quality check and transmission system for software. It guarantees that every change is validated, packaged immutably, and verified before customer traffic touches it.`;

  const whyNeeded = `Without ${title}, software teams face high defect escape rates, manual deployment anxiety, long cycle times, and operational blind spots. Implementing this practice enables organizations to lower change failure rate (CFR), accelerate lead time for changes, and maintain compliance through verifiable, repeatable automation.`;

  const whereUsed = `Deployed across CI/CD build engines (GitHub Actions, GitLab CI, Jenkins), container runtimes, Kubernetes clusters, cloud infrastructure providers (AWS, GCP, Azure), and site reliability telemetry backends.`;

  const whenToUse = [
    `When establishing automated, auditable continuous delivery pipelines across distributed microservice teams.`,
    `When seeking to eliminate manual toil, human configuration drift, and undocumented deployment handoffs.`,
    `When scaling engineering organizations where multiple teams merge features into shared production environments daily.`,
    `When meeting strict SOC 2, ISO 27001, or financial regulatory auditability requirements.`
  ];

  const whenNotToUse = [
    `For throwaway, one-off proof-of-concept scripts that will never run in production or handle sensitive data.`,
    `When applied as dogmatic bureaucracy without understanding team bottlenecks or measuring DORA delivery metrics.`,
    `When over-engineering tooling before establishing basic version control and reproducible build foundations.`
  ];

  const howItWorks = `${title} operates through an event-driven lifecycle:
1. **Trigger & Ingestion**: Changes are detected via Git webhooks, API dispatches, or scheduled cron routines.
2. **Context & Execution**: An isolated runtime runner pulls configuration, authenticates via short-lived OIDC workload identity, and executes predefined tasks.
3. **Validation & Gating**: Automated test suites, vulnerability scanners, and policy-as-code engines inspect artifacts against strict compliance gates.
4. **Promotion & Telemetry**: Validated states are promoted to downstream environments with real-time metrics and distributed tracing sent to monitoring systems.`;

  const terminology = [
    {
      term: `${title} Engine`,
      definition: `The computational controller or agent pool responsible for scheduling and executing automation jobs.`
    },
    {
      term: 'Idempotency',
      definition: 'The mathematical property where executing an operation multiple times produces the exact same outcome without unintended side-effects.'
    },
    {
      term: 'Telemetry Feedback Loop',
      definition: 'Real-time metrics, logs, and traces gathered from production runtime to validate deployment health and inform upstream developers.'
    },
    {
      term: 'Declarative Desired State',
      definition: 'Specifying what the system should look like in version-controlled code rather than writing manual imperative execution steps.'
    }
  ];

  const variations = [
    {
      name: 'Cloud-Managed SaaS Implementation',
      description: 'Fully hosted controllers offering zero infrastructure maintenance, automatic scaling, and built-in secret integration.'
    },
    {
      name: 'Self-Hosted / Ephemeral Runner Topology',
      description: 'Running dedicated worker agents inside private VPC subnets to access internal databases and build cache nodes.'
    },
    {
      name: 'GitOps Declarative Reconciler',
      description: 'Continuously polling Git repositories to automatically converge cluster states with zero outbound pipeline push credentials.'
    }
  ];

  const realWorldExamples = [
    `**Netflix**: Utilizing automated delivery pipelines and Spinnaker to execute automated canary analyses across thousands of microservices daily.`,
    `**GitHub**: Deploying GitHub.com to production dozens of times a day using merge queues, ephemeral test environments, and branch deployment chatops.`,
    `**Stripe**: Enforcing strict hermetic builds and automated policy gates to process billions in financial transactions with zero downtime.`
  ];

  const architectureDiagram = `[Developer Commit]
       │
       ▼ (Git Webhook)
┌──────────────────────────────────────────────┐
│  CI/CD Orchestrator                          │
│  ├── 1. Hermetic Sandbox Runner             │
│  ├── 2. Compile / Build & Dependency Cache   │
│  ├── 3. Automated Unit & Integration Tests   │
│  └── 4. Security Scan & Policy Gate          │
└──────────────────────────────────────────────┘
       │
       ▼ (Signed Artifact)
┌──────────────────────────────────────────────┐
│  Target Cluster / Cloud Infrastructure       │
│  ├── Blue/Green or Canary Ingress Router     │
│  ├── Kubernetes Deployment Controller        │
│  └── Prometheus / OpenTelemetry Telemetry    │
└──────────────────────────────────────────────┘
       │
       ▼ (Healthy Metrics)
[Production Live Traffic Serving 100%]`;

  const commonMistakes = [
    {
      mistake: 'Hardcoding sensitive API tokens or passwords directly in pipeline configuration or code repositories.',
      fix: 'Use HashiCorp Vault or cloud Secrets Manager with OpenID Connect (OIDC) workload identity federation.'
    },
    {
      mistake: 'Treating staging environments as snowflakes with manual modifications that diverge from production parity.',
      fix: 'Provision all environments identically using declarative Infrastructure as Code (Terraform) and unified container images.'
    },
    {
      mistake: 'Failing to establish automated rollback triggers when new releases degrade latency or trigger HTTP 5xx errors.',
      fix: 'Integrate deployment health probes with Prometheus alerts to automatically revert traffic upon error budget breach.'
    }
  ];

  const securityConsiderations = [
    'Always enforce the principle of least privilege (PoLP) on CI/CD runner service accounts and cloud IAM roles.',
    'Cryptographically sign all build artifacts and container images using Cosign and verify SLSA provenance before production deployment.',
    'Never allow untrusted pull requests from public forks to access production environment secrets or internal network runners.'
  ];

  const productionConsiderations = [
    'Implement aggressive caching for language package managers (npm, pip, maven) and container layers to keep pipeline feedback loops under 5 minutes.',
    'Ensure all deployment controllers support graceful connection draining and preStop lifecycle hooks to achieve zero-downtime releases.',
    'Establish automated budget alerting and idle resource reaping to prevent runaway cloud compute and build runner costs.'
  ];

  const prerequisites = [
    'Basic familiarity with command-line interfaces and version control systems.',
    'Understanding of client-server network architectures (HTTP/HTTPS, TCP/IP).',
    'Working knowledge of container concepts and declarative configuration formats (YAML/JSON).'
  ];

  const handsOnScenario = {
    title: `Configuring and Verifying ${title}`,
    scenario: `You are tasked with implementing ${title} for a mission-critical payments service that requires high availability, automated safety checks, and deterministic promotion across staging and production.`,
    goal: `Construct an end-to-end automated pipeline configuration that validates code quality, executes hermetic tests, signs the resulting artifact, and deploys it safely.`,
    steps: [
      `Inspect the project structure and configure the declarative configuration file in your repository.`,
      `Set up environment variables and configure secret injection using temporary token federation.`,
      `Trigger the workflow using a test commit and inspect real-time runner execution logs.`,
      `Simulate an upstream failure to verify that the automated failure gate halts deployment immediately.`
    ]
  };

  const practicalChallenge = {
    task: `Write a robust configuration snippet that validates ${title}, verifies container image integrity, and triggers an automated alert if execution exceeds 300 seconds.`,
    hint: `Combine timeout-minutes with strict exit code validation and post-failure notification webhooks.`,
    solution: `# Production-grade verification step
- name: Verify ${title} Health
  timeout-minutes: 5
  run: |
    echo "Running compliance checks..."
    ./scripts/verify-compliance.sh --strict
    echo "Checks passed successfully."`
  };

  const keyTakeaways = [
    `${title} is essential for eliminating human error, accelerating delivery velocity, and lowering change failure rates.`,
    `Declarative configuration stored in version control ensures repeatability, auditability, and team transparency.`,
    `Automated health checks, telemetry feedback loops, and automated rollback strategies guarantee production resilience.`,
    `Security and compliance must be shifted left directly into the engineering workflow rather than audited after the fact.`
  ];

  return {
    id,
    chapterNumber: chMeta.num,
    subchapterCode: code,
    title,
    level: chMeta.levelId,
    difficulty,
    estimatedMinutes: 15,
    whatIsIt,
    simpleExplanation,
    whyNeeded,
    whereUsed,
    whenToUse,
    whenNotToUse,
    howItWorks,
    terminology,
    syntaxOrConfig: {
      language: syntaxLanguage,
      filename: syntaxFile,
      code: syntaxCode,
      explanation: syntaxExplanation
    },
    variations,
    realWorldExamples,
    architectureDiagram,
    commonMistakes,
    securityConsiderations,
    productionConsiderations,
    relatedConcepts,
    prerequisites,
    handsOnScenario,
    practicalChallenge,
    keyTakeaways,
    simulatorId: chMeta.simulatorId
  };
}

// Generate level file contents
function generateLevelFile(levelId, chapters) {
  const codeBlocks = [];

  codeBlocks.push(`import { DevOpsChapter } from '../../types/devopsCurriculumTypes';\n`);
  codeBlocks.push(`export const CHAPTERS_${levelId.replace(/-/g, '_').toUpperCase()}: DevOpsChapter[] = [`);

  for (const ch of chapters) {
    const subchapters = ch.subchapters.map((sub, idx) => {
      const lesson = generateLesson(ch, sub, idx);
      const code = sub.split(' ')[0];
      const title = cleanTitle(sub);
      return {
        id: lesson.id,
        code,
        title,
        lesson
      };
    });

    const chObj = {
      id: `ch${String(ch.num).padStart(2, '0')}-${ch.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      number: ch.num,
      title: ch.title,
      levelId: ch.levelId,
      levelName: ch.levelName,
      levelNumber: ch.levelNum,
      summary: ch.summary,
      targetTechnologies: ch.targetTech,
      simulatorId: ch.simulatorId,
      capstoneId: ch.capstoneId,
      subchapters
    };

    codeBlocks.push(JSON.stringify(chObj, null, 2) + ',');
  }

  codeBlocks.push(`];\n`);
  return codeBlocks.join('\n');
}

// Group chapters by fileGroup
const GROUPS = {
  level01_foundation: [],
  level02_ci: [],
  level03_containers: [],
  level04_cloud_orchestration: [],
  level05_devsecops: [],
  level06_observability_sre: [],
  level07_platform_engineering: [],
  level08_advanced_devops: [],
  level09_enterprise_devops: [],
  level10_production_devops: []
};

CHAPTERS_METADATA.forEach(ch => {
  GROUPS[ch.fileGroup].push(ch);
});

// Write all 10 level files
for (const [groupName, groupChapters] of Object.entries(GROUPS)) {
  const filePath = path.join(targetDir, `${groupName}.ts`);
  const content = generateLevelFile(groupName, groupChapters);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Wrote ${filePath} (${groupChapters.length} chapters, ${groupChapters.reduce((acc, c) => acc + c.subchapters.length, 0)} subchapters)`);
}

// Write chapters index.ts
const indexContent = `import { DevOpsChapter } from '../../types/devopsCurriculumTypes';
import { CHAPTERS_LEVEL01_FOUNDATION } from './level01_foundation';
import { CHAPTERS_LEVEL02_CI } from './level02_ci';
import { CHAPTERS_LEVEL03_CONTAINERS } from './level03_containers';
import { CHAPTERS_LEVEL04_CLOUD_ORCHESTRATION } from './level04_cloud_orchestration';
import { CHAPTERS_LEVEL05_DEVSECOPS } from './level05_devsecops';
import { CHAPTERS_LEVEL06_OBSERVABILITY_SRE } from './level06_observability_sre';
import { CHAPTERS_LEVEL07_PLATFORM_ENGINEERING } from './level07_platform_engineering';
import { CHAPTERS_LEVEL08_ADVANCED_DEVOPS } from './level08_advanced_devops';
import { CHAPTERS_LEVEL09_ENTERPRISE_DEVOPS } from './level09_enterprise_devops';
import { CHAPTERS_LEVEL10_PRODUCTION_DEVOPS } from './level10_production_devops';

export const ALL_DEVOPS_50_CHAPTERS: DevOpsChapter[] = [
  ...CHAPTERS_LEVEL01_FOUNDATION,
  ...CHAPTERS_LEVEL02_CI,
  ...CHAPTERS_LEVEL03_CONTAINERS,
  ...CHAPTERS_LEVEL04_CLOUD_ORCHESTRATION,
  ...CHAPTERS_LEVEL05_DEVSECOPS,
  ...CHAPTERS_LEVEL06_OBSERVABILITY_SRE,
  ...CHAPTERS_LEVEL07_PLATFORM_ENGINEERING,
  ...CHAPTERS_LEVEL08_ADVANCED_DEVOPS,
  ...CHAPTERS_LEVEL09_ENTERPRISE_DEVOPS,
  ...CHAPTERS_LEVEL10_PRODUCTION_DEVOPS,
].sort((a, b) => a.number - b.number);

export {
  CHAPTERS_LEVEL01_FOUNDATION,
  CHAPTERS_LEVEL02_CI,
  CHAPTERS_LEVEL03_CONTAINERS,
  CHAPTERS_LEVEL04_CLOUD_ORCHESTRATION,
  CHAPTERS_LEVEL05_DEVSECOPS,
  CHAPTERS_LEVEL06_OBSERVABILITY_SRE,
  CHAPTERS_LEVEL07_PLATFORM_ENGINEERING,
  CHAPTERS_LEVEL08_ADVANCED_DEVOPS,
  CHAPTERS_LEVEL09_ENTERPRISE_DEVOPS,
  CHAPTERS_LEVEL10_PRODUCTION_DEVOPS,
};
`;

fs.writeFileSync(path.join(targetDir, 'index.ts'), indexContent, 'utf8');
console.log('✓ Wrote index.ts');
console.log('All 50 chapters curriculum generated successfully!');
