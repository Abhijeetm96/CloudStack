import { CapstoneProject } from '../types';

export const ULTIMATE_CAPSTONE: CapstoneProject = {
  id: 'ultimate-01',
  code: 'ULTIMATE-01',
  title: 'Production Platform',
  academy: 'cross-academy',
  difficulty: 'Expert',
  estimatedTime: '180 mins',
  technologies: ['Git', 'Linux', 'Docker', 'DevOps CI/CD', 'Terraform', 'Kubernetes', 'Prometheus', 'Grafana'],
  overview:
    'The pinnacle capstone project uniting all six CloudStack Academies: Git, Linux, Docker, DevOps, Terraform, and Kubernetes. You start with raw application source code and engineer an entire, end-to-end production platform from scratch. You will establish Git branching and Conventional Commits, harden Linux servers, compile multi-stage secure Docker images, automate a full Jenkins/DevOps CI/CD pipeline, provision cloud VPC networking and Kubernetes infrastructure with Terraform IaC, deploy scalable microservices with Ingress, PersistentVolumes, and HPA on Kubernetes, and wire SRE monitoring and alerting. Upon successful deployment, the system triggers the "Final Incident Challenge", injecting 10 concurrent production outages that you must diagnose and restore to full health.',
  tags: ['cross-academy', 'production-platform', 'ultimate-capstone', 'git', 'linux', 'docker', 'devops', 'terraform', 'kubernetes', 'sre', 'incident-challenge'],
  projectOverview: {
    projectName: 'Production Platform',
    academy: 'cross-academy',
    difficulty: 'Expert',
    estimatedEffort: '180 mins',
    technologies: ['Git', 'Linux', 'Docker', 'DevOps CI/CD', 'Terraform', 'Kubernetes', 'Prometheus', 'Grafana'],
    shortDescription:
      'The pinnacle capstone project uniting all six CloudStack Academies: construct an end-to-end production platform from scratch, deploy resilient microservices with IaC and CI/CD, and resolve 10 catastrophic production incidents.',
  },
  scenario:
    'You are appointed Lead Platform Architect at a high-growth tech enterprise preparing for global launch. The organization has separate fragmented tools and no reproducible infrastructure. You are tasked with designing and implementing an integrated, automated, production-grade cloud platform uniting version control, Linux host hardening, container packaging, automated CI/CD pipelines, Terraform cloud provisioning, and Kubernetes orchestration, backed by comprehensive observability and incident resilience.',
  problemStatement:
    'Production releases are currently slow, error-prone, and manual. Application builds contain critical security vulnerabilities, infrastructure drifts unpredictably across environments, and zero telemetry exists to detect cascading outages. When incidents strike, mean-time-to-recovery (MTTR) stretches into hours. You must engineer an immutable, self-healing platform pipeline that eliminates manual toil and guarantees sub-minute recovery.',
  projectObjective: [
    'Establish enterprise branch protection, Conventional Commits, and SemVer release tagging in Git',
    'Harden host Linux kernel sysctl limits, unprivileged service users, and POSIX permissions',
    'Author multi-stage Docker builds with non-root security contexts and minimal attack surface',
    'Automate end-to-end CI/CD delivery pipelines with automated testing and registry promotion',
    'Provision modular, state-locked cloud infrastructure and VPC networking via Terraform IaC',
    'Deploy production Kubernetes workloads with Ingress, Service routing, PVC persistence, and HPA',
    'Wire Prometheus metrics, Grafana dashboards, and automated incident alert thresholds',
    'Diagnose and restore system health across 10 concurrent catastrophic production outage scenarios',
  ],
  whatYouNeedToBuild: {
    description:
      'An enterprise cloud platform ecosystem connecting code commit to production Kubernetes deployment, protected by automated security gates, state-locked Terraform IaC, and full telemetry.',
    diagram: `[Developer Workstation]
       │ git push
       ▼
[Git Enterprise Trunk] ──(Webhook Trigger)──> [CI/CD Automation Pipeline]
                                                     │
                                       ┌─────────────┴─────────────┐
                                       ▼                           ▼
                             [Docker Multi-Stage Build]   [Terraform IaC Apply]
                                       │                           │
                                       ▼                           ▼
                             [OCI Container Registry]    [Cloud VPC & K8s Cluster]
                                       └─────────────┬─────────────┘
                                                     ▼
                                       [Production Kubernetes]
                                     ┌───────┴───────┬───────┐
                                     ▼               ▼       ▼
                                [Ingress TLS]     [Pods]   [PVC Storage]
                                     │               │       │
                                     └───────────────┼───────┘
                                                     ▼
                                      [Prometheus & SRE Telemetry]
                                                     │
                                                     ▼
                                     [Incident Restoration Suite]`,
  },
  requirements: {
    functional: [
      'Complete end-to-end delivery pipeline from Git commit to Kubernetes live deployment',
      'Self-healing microservice tier capable of horizontal autoscaling based on CPU/memory load',
      'Persistent storage retention across pod restart cycles for database state',
      'Comprehensive incident recovery playbook resolving 10 production breakdown scenarios',
    ],
    technical: [
      'Git 2.40+, Linux kernel 6+, Docker 24+, Terraform 1.5+, Kubernetes 1.28+, Prometheus 2.45+',
      'Zero manual infrastructure provisioning; all cloud resources must be managed via Terraform',
      'Container images must be strictly non-root with read-only root filesystems where applicable',
    ],
    security: [
      'No plain-text credentials stored in version control or Docker images; use K8s Secrets or Vault',
      'Least-privilege Linux user (UID 10001) enforced inside all application containers',
      'Automated CVE scanning in CI pipeline blocking builds with critical vulnerabilities',
      'Network policies isolating internal database traffic from external public ingress',
    ],
    operational: [
      'Sub-30-second automated rollback on failed deployment healthcheck triggers',
      'High availability topology with zero single points of failure across pods and nodes',
      'Prometheus scraping interval configured to 15s with actionable alert rules',
    ],
  },
  architecture: {
    summary:
      'Universal Production Platform: Developer -> Git -> Jenkins/CI -> Tests & Security -> Docker Build -> Registry -> Terraform IaC -> Kubernetes Cluster -> Ingress -> Microservices -> Database -> Prometheus/Alerting -> Self-Healing & Incident Restoration.',
    diagram:
      'Developer Workstation ──(Git Commit)──> CI/CD Pipeline ──(Docker Build)──> Registry ──(Terraform)──> EKS/K8s Cluster ──(Ingress)──> Microservices ──(Metrics)──> Prometheus/Grafana',
    components: [
      {
        name: '1. Git Repository & Trunk',
        role: 'Source Control & Audit',
        technologies: ['Git', 'Conventional Commits'],
        description: 'Enforces branch protections, PR approvals, and SemVer release tags.',
      },
      {
        name: '2. Linux System Host',
        role: 'Compute Foundation',
        technologies: ['Linux 6.8', 'systemd', 'UFW'],
        description: 'Hardened OS kernel with sysctl tuning, unprivileged accounts, and UFW firewall.',
      },
      {
        name: '3. Docker BuildKit & Security',
        role: 'Container Packaging',
        technologies: ['Docker', 'Trivy', 'Distroless'],
        description: 'Multi-stage builds, non-root user (10001), and Trivy CVE scanning.',
      },
      {
        name: '4. DevOps CI/CD Pipeline',
        role: 'Delivery Automation',
        technologies: ['Jenkins', 'GitHub Actions'],
        description: 'Automates linting, testing, image building, registry push, and deployment.',
      },
      {
        name: '5. OCI Container Registry',
        role: 'Artifact Repository',
        technologies: ['GHCR', 'Docker Hub'],
        description: 'Stores immutable signed container images (:sha and :v1.0.0).',
      },
      {
        name: '6. Terraform IaC',
        role: 'Cloud Infrastructure',
        technologies: ['Terraform', 'Modules', 'State Lock'],
        description: 'Provisions VPC network, security groups, subnets, and K8s cluster.',
      },
      {
        name: '7. Production Kubernetes',
        role: 'Orchestration Platform',
        technologies: ['Kubernetes', 'Ingress', 'HPA', 'PVC'],
        description: 'Runs Ingress, Frontend, Backend, HPA, and persistent PostgreSQL with PVCs.',
      },
      {
        name: '8. SRE Operations & Observability',
        role: 'Telemetry & Incident Triage',
        technologies: ['Prometheus', 'Grafana', 'PagerDuty'],
        description: 'Prometheus metrics, Grafana dashboards, automated alerting, and incident response.',
      },
    ],
  },
  technologyRequirements: {
    required: [
      'Git CLI 2.40+',
      'Linux Kernel 6+ & systemd',
      'Docker Engine 24+ & BuildKit',
      'DevOps CI/CD (Jenkins / GitHub Actions)',
      'Terraform IaC 1.5+',
      'Kubernetes Orchestration 1.28+',
      'Prometheus & Grafana',
    ],
    optional: ['HashiCorp Vault', 'ArgoCD / Flux GitOps', 'OpenTelemetry Collectors'],
    outOfScope: ['Proprietary commercial APM suites', 'Direct unversioned SSH edits to production nodes'],
  },
  functionalRequirements: [
    'Repository must enforce Conventional Commits and tag releases using semantic versioning',
    'Linux host must apply hardened kernel sysctl limits and unprivileged service accounts',
    'Dockerfile must build a hardened container image with size under 150MB and non-root UID 10001',
    'Terraform configuration must provision VPC, subnets, and Kubernetes cluster outputs',
    'Kubernetes manifests must deploy Ingress, multi-replica Deployment, Service, PVC, and HPA',
    'Operational observability must collect metrics and expose synthetic health check endpoints',
    'All 10 failure incident scenarios must be triaged and resolved with verified operational status',
  ],
  technicalRequirements: [
    'Terraform configurations must pass terraform fmt and terraform validate with remote state locking',
    'Docker images must utilize multi-stage builds with alpine or distroless base images',
    'Kubernetes deployments must define explicit resource requests, limits, and readiness/liveness probes',
    'CI pipeline must execute linting, unit testing, security scanning, and container compilation',
  ],
  securityRequirements: [
    'Unprivileged user execution (UID 10001) enforced at both OS and container runtime layers',
    'All secrets injected via environment variables sourced from Kubernetes Secrets or cloud secret stores',
    'CVE scanning integrated with Trivy to fail builds on Critical CVE vulnerabilities',
    'Network security rules restricting database access exclusively to backend pods',
  ],
  constraints: [
    'Never run containers as root (UID 0)',
    'Never commit Terraform state files (*.tfstate) or secret keys to Git',
    'Never perform direct manual edits on production Kubernetes manifests or cloud consoles',
    'All changes must flow through Git commits and CI/CD pipelines',
  ],
  expectedOutcome:
    'Complete engineering and deployment of an enterprise Production Platform unifying Git, Linux, Docker, DevOps, Terraform, and Kubernetes, followed by successful triage and resolution of all 10 catastrophic production outages.',
  deliverables: [
    'Git repository with branch protection rules, .gitignore, and conventional commit history',
    'Hardened Linux sysctl configuration and user setup scripts',
    'Multi-stage Dockerfile and optimized production container image',
    'CI/CD pipeline workflow definition (Jenkinsfile or GitHub Actions YAML)',
    'Modular Terraform IaC scripts provisioning VPC networking and cluster resources',
    'Production Kubernetes manifests (Ingress, Deployment, Service, PVC, HPA)',
    'Prometheus alert rules and monitoring configuration',
    'Incident response log detailing root cause, diagnostic steps, and resolutions for all 10 incidents',
  ],
  suggestedProjectStructure: `platform-root/
├── .git/
├── .gitignore
├── README.md
├── app/
│   ├── src/
│   │   └── server.js
│   ├── package.json
│   └── Dockerfile
├── ci/
│   └── Jenkinsfile (or .github/workflows/deploy.yml)
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── terraform.tfvars.example
├── k8s/
│   ├── 00-namespace.yaml
│   ├── 01-configmap-secrets.yaml
│   ├── 02-pvc-database.yaml
│   ├── 03-backend-deployment.yaml
│   ├── 04-ingress.yaml
│   └── 05-hpa.yaml
└── monitoring/
    ├── prometheus-alerts.yaml
    └── incident-runbooks.md`,
  requiredConcepts: [
    { name: 'Git Mental Model & Conventional Commits', lessonId: 'c-01-01', academyRoute: '/git' },
    { name: 'Linux System Architecture & Hardening', lessonId: 'c-01-01', academyRoute: '/linux' },
    { name: 'Docker Multi-Stage & Container Security', lessonId: 'c-01-01', academyRoute: '/docker' },
    { name: 'CI/CD Pipelines & Release Engineering', lessonId: 'c-01-01', academyRoute: '/devops' },
    { name: 'Terraform State & Modular Infrastructure', lessonId: 'c-01-01', academyRoute: '/terraform' },
    { name: 'Kubernetes Workloads, Networking & Storage', lessonId: 'c-01-01', academyRoute: '/kubernetes' },
  ],
  resources: {
    academyLessons: [
      { title: 'Git Academy: Branching & Trunk Hygiene', route: '/cloudstack/git' },
      { title: 'Linux Academy: Kernel & User Hardening', route: '/cloudstack/linux' },
      { title: 'Docker Academy: Hardened Multi-Stage Images', route: '/cloudstack/docker' },
      { title: 'DevOps Academy: Production CI/CD Automation', route: '/cloudstack/devops' },
      { title: 'Terraform Academy: Infrastructure as Code', route: '/cloudstack/terraform' },
      { title: 'Kubernetes Academy: Production Orchestration', route: '/cloudstack/kubernetes' },
    ],
    officialDocs: [
      { title: 'Kubernetes Production Best Practices', url: 'https://kubernetes.io/docs/setup/best-practices/' },
      { title: 'Terraform Best Practices & Modules', url: 'https://developer.hashicorp.com/terraform' },
      {
        title: 'Docker Security & Best Practices',
        url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/',
      },
      { title: 'Google SRE Handbook', url: 'https://sre.google/sre-book/table-of-contents/' },
    ],
    referenceMaterial: [
      'Cloud Native Computing Foundation (CNCF) Landscape',
      'NIST Container Security Guidelines SP 800-190',
      'Conventional Commits Specification 1.0.0',
    ],
    usefulCommands: [
      'git status && git log --oneline --graph',
      'docker build -t enterprise-platform:1.0.0 .',
      'terraform init && terraform plan',
      'kubectl get pods,svc,ingress,pvc,hpa -o wide',
      'kubectl logs -l app=platform-api --tail=100 -f',
      'kubectl rollout status deployment/platform-api',
    ],
  },
  recommendedApproach: [
    '1. Establish repository baseline with .gitignore, branch protection rules, and Conventional Commits.',
    '2. Harden host Linux environment by configuring kernel sysctl parameters and creating dedicated UID 10001.',
    '3. Author a multi-stage Dockerfile that produces a minimal, non-root production container artifact.',
    '4. Define automated CI/CD pipeline steps for linting, security scanning with Trivy, and image pushing.',
    '5. Write modular Terraform code provisioning VPC, subnets, and Kubernetes cluster resources with state locking.',
    '6. Author Kubernetes manifests incorporating ConfigMaps, Secrets, Ingress, PersistentVolumes, and HPA.',
    '7. Deploy application stack to the Kubernetes cluster and verify end-to-end traffic routing through Ingress.',
    '8. Configure Prometheus metric scraping and synthetic health check probes.',
    '9. Execute Chaos / Incident challenges: systematically diagnose and restore the 10 failure scenarios.',
    '10. Verify post-incident operational recovery, document root causes, and finalize the production playbook.',
  ],
  importantConsiderations: [
    'How do you prevent cascading failure when database connectivity drops under heavy traffic?',
    'Why is immutable infrastructure preferable to live in-place server patching?',
    'How do readiness and liveness probes differ in their handling of failing pods?',
    'What are the trade-offs between horizontal pod autoscaling and vertical pod autoscaling?',
  ],
  commonPitfalls: [
    'Committing secrets or cloud provider credentials to version control.',
    'Running containers as root (UID 0) allowing potential container breakout privileges.',
    'Hardcoding environment-specific configurations inside container images rather than using ConfigMaps.',
    'Deploying pods without defining CPU and memory resource requests and limits.',
    'Failing to verify state locks before running concurrent Terraform apply runs.',
  ],
  optionalEnhancements: {
    beginner: ['Add automated linting pre-commit hooks using Husky.'],
    intermediate: ['Configure GitOps continuous delivery using ArgoCD.'],
    advanced: ['Implement mutual TLS (mTLS) service mesh encryption with Istio or Linkerd.'],
    expert: ['Implement automated canary deployments with Flagger and Prometheus metric analysis.'],
  },
  completionChecklist: [
    { id: 'chk-1', text: 'Git repository initialized with Conventional Commits, .gitignore, and SemVer release tag' },
    { id: 'chk-2', text: 'Host Linux kernel parameters tuned and non-root service account (UID 10001) verified' },
    { id: 'chk-3', text: 'Hardened multi-stage Dockerfile authored, built, and validated with Trivy scan' },
    { id: 'chk-4', text: 'CI/CD pipeline automated with testing, vulnerability gates, and container registry publishing' },
    { id: 'chk-5', text: 'Terraform IaC scripts written, formatted, and applied with remote state locking' },
    { id: 'chk-6', text: 'Kubernetes manifests deployed: Ingress, Deployments, Services, ConfigMaps, and Secrets' },
    { id: 'chk-7', text: 'Persistent volume storage and Horizontal Pod Autoscaler (HPA) configured and active' },
    { id: 'chk-8', text: 'Prometheus metrics scraping operational and alerting rules configured' },
    { id: 'chk-9', text: 'All 10 production outage scenarios triaged, root caused, and remediated in the incident challenge' },
    { id: 'chk-10', text: 'Complete project documentation and production incident playbook compiled' },
  ],
  startingState: {
    description:
      'A bare developer workstation with application source code, ready to build the complete enterprise production platform.',
    environment: 'Enterprise Cross-Academy Platform Engineering Lab',
    startingFiles: {
      'src/server.js':
        'const express = require("express");\nconst app = express();\nconst PORT = process.env.PORT || 8080;\napp.get("/health", (req, res) => res.json({ status: "healthy", uptime: process.uptime() }));\napp.get("/api/v1/data", (req, res) => res.json({ platform: "Production Platform v1.0", cloud: "Kubernetes" }));\napp.listen(PORT, () => console.log(`Platform listening on ${PORT}`));',
      'package.json':
        '{\n  "name": "enterprise-platform",\n  "version": "1.0.0",\n  "main": "src/server.js",\n  "dependencies": { "express": "^4.19.2" }\n}',
    },
  },
  tasks: [
    {
      id: 'task-1',
      title: 'Phase 1 (GIT): Repository Architecture & Branch Protection',
      objective: 'Initialize repository, establish branch standards, and create initial release commit.',
      commandSnippet:
        'git init -b main\ncat << \'EOF\' > .gitignore\nnode_modules/\n*.log\n.env\n.terraform/\n*.tfstate*\nEOF\ngit add .gitignore package.json src/\ngit commit -m "feat(platform): initialize production platform baseline v1.0.0"\ngit tag -a v1.0.0 -m "Release v1.0.0: Initial Platform Architecture"',
      expectedOutput: 'Initialized empty Git repository\nTag v1.0.0 created.',
      verificationCriteria: 'git tag -l returns v1.0.0 and .gitignore protects terraform state and node_modules.',
      hints: ['A clean .gitignore is vital to prevent Terraform state files or secrets from entering Git history.'],
      explanation: 'Establishing version control hygiene is the mandatory starting foundation of enterprise engineering.',
    },
    {
      id: 'task-2',
      title: 'Phase 2 (LINUX): Host OS Hardening & Service User Account',
      objective: 'Configure non-root service account and apply kernel sysctl optimizations.',
      commandSnippet:
        'useradd -r -u 10001 -s /bin/false appuser 2>/dev/null || true\ncat << \'EOF\' > /etc/sysctl.d/99-platform.conf\nvm.swappiness = 10\nfs.file-max = 2097152\nnet.core.somaxconn = 65535\nEOF\nsysctl --system 2>/dev/null || true\necho "Linux Host OS Hardened: Non-root user 10001 and sysctl tuning applied."',
      expectedOutput: 'Linux Host OS Hardened: Non-root user 10001 and sysctl tuning applied.',
      verificationCriteria: 'User appuser exists with UID 10001.',
      hints: ['Running workloads under dedicated unprivileged accounts is the primary defense against container breakouts.'],
      explanation: 'Kernel parameter tuning ensures maximum network throughput and memory stability under high load.',
    },
    {
      id: 'task-3',
      title: 'Phase 3 (DOCKER): Multi-Stage Hardened Container Build',
      objective: 'Author multi-stage Dockerfile with non-root user (10001) and healthcheck probe.',
      commandSnippet:
        'cat << \'EOF\' > Dockerfile\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install --omit=dev\n\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY . .\nUSER 10001:10001\nEXPOSE 8080\nHEALTHCHECK --interval=10s --timeout=3s CMD wget -qO- http://localhost:8080/health || exit 1\nCMD ["node", "src/server.js"]\nEOF\ndocker build -t enterprise-platform:1.0.0 .\ndocker images enterprise-platform:1.0.0',
      expectedOutput: 'Successfully tagged enterprise-platform:1.0.0 (size < 150MB)',
      verificationCriteria: 'docker images enterprise-platform:1.0.0 confirms image built.',
      hints: ['Multi-stage builds exclude development dependencies and compilers from the final runtime image.'],
      explanation: 'Minimizing image size reduces vulnerability surface and accelerates network transfer times in Kubernetes.',
    },
    {
      id: 'task-4',
      title: 'Phase 4 (TERRAFORM): Cloud Infrastructure as Code Provisioning',
      objective: 'Author modular Terraform code provisioning VPC, subnets, and K8s cluster outputs.',
      commandSnippet:
        'cat << \'EOF\' > main.tf\nterraform {\n  required_version = ">= 1.5.0"\n}\n\nlocals {\n  cluster_name = "production-platform-eks"\n  vpc_id       = "vpc-01a2b3c4d5e6f7"\n}\n\noutput "kubernetes_cluster_name" {\n  value = locals.cluster_name\n}\n\noutput "vpc_id" {\n  value = locals.vpc_id\n}\n\noutput "platform_infra_ready" {\n  value = true\n}\nEOF\nterraform init\nterraform apply -auto-approve',
      expectedOutput: 'Apply complete!\nOutputs:\nkubernetes_cluster_name = "production-platform-eks"\nplatform_infra_ready = true',
      verificationCriteria: 'terraform output platform_infra_ready returns true.',
      hints: ['Terraform outputs supply cluster credentials and VPC IDs to downstream Kubernetes deployment stages.'],
      explanation: 'Declarative infrastructure ensures reproducible environments that can be recreated with a single command.',
    },
    {
      id: 'task-5',
      title: 'Phase 5 (KUBERNETES): Deploy Production Microservices Stack',
      objective: 'Deploy Ingress, Deployments, Services, PVC storage, and HPA autoscaling.',
      commandSnippet:
        'cat << \'EOF\' > platform-k8s.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: platform-api\n  labels:\n    app: platform-api\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: platform-api\n  template:\n    metadata:\n      labels:\n        app: platform-api\n    spec:\n      containers:\n      - name: api\n        image: nginx:alpine\n        ports:\n        - containerPort: 8080\n        resources:\n          requests:\n            cpu: "100m"\n            memory: "128Mi"\n          limits:\n            cpu: "500m"\n            memory: "256Mi"\n        readinessProbe:\n          httpGet:\n            path: /\n            port: 8080\n          initialDelaySeconds: 5\n          periodSeconds: 5\n---\napiVersion: v1\nkind: Service\nmetadata:\n  name: platform-service\nspec:\n  ports:\n  - port: 8080\n  selector:\n    app: platform-api\nEOF\nkubectl apply -f platform-k8s.yaml',
      expectedOutput: 'deployment.apps/platform-api created\nservice/platform-service created',
      verificationCriteria: 'kubectl get deployment platform-api shows 3/3 ready.',
      hints: ['Kubernetes Services load balance requests across all ready pod replicas automatically.'],
      explanation: 'Deploying across multiple pods with resource limits guarantees high availability and prevent resource starvation.',
    },
    {
      id: 'task-6',
      title: 'Phase 6 (DEVOPS & SRE): Telemetry & Automated Health Verification',
      objective: 'Verify Prometheus scraping endpoints and synthetic health checks.',
      commandSnippet:
        'kubectl get pods,svc -l app=platform-api\necho "PLATFORM STATUS: All 8 Architecture Tiers 100% Operational."',
      expectedOutput: 'PLATFORM STATUS: All 8 Architecture Tiers 100% Operational.',
      verificationCriteria: 'Status output confirms operational status.',
      hints: ['All 3 pods are ready and the service exposes port 8080.'],
      explanation: 'The platform is now ready for the final incident response simulation challenge.',
    },
  ],
  failureScenarios: [
    {
      id: 'incident-1',
      title: '1. Bad Docker Image Deployment',
      symptom: 'Newly deployed container image crashes immediately on boot with exit code 1.',
      rootCause: 'Corrupted build artifact published with typo in startup command.',
      diagnosticCommand: 'docker logs <container-id> || kubectl logs <pod-name>',
      fixCommand: 'Rollback to previous image tag: kubectl rollout undo deployment/platform-api.',
      verification: 'Pods return to 1/1 Running state.',
      preventativeMeasures: 'Mandate automated container integration testing in CI before promoting images.',
    },
    {
      id: 'incident-2',
      title: '2. Broken Kubernetes Deployment (ImagePullBackOff)',
      symptom: 'Pods stuck in ImagePullBackOff; cannot pull registry artifact.',
      rootCause: 'Image tag typo or expired imagePullSecrets credentials.',
      diagnosticCommand: 'kubectl describe pod -l app=platform-api | grep -A 3 Events',
      fixCommand: 'Correct image tag in deployment manifest and re-apply.',
      verification: 'Pods pull image successfully and start.',
      preventativeMeasures: 'Validate that the image digest exists in registry prior to updating manifests.',
    },
    {
      id: 'incident-3',
      title: '3. Incorrect Environment Variable Injection',
      symptom: 'Application fails to connect to database: Error: connect ECONNREFUSED undefined:5432.',
      rootCause: 'DB_HOST variable omitted from ConfigMap or SecretRef.',
      diagnosticCommand: 'kubectl exec -it <pod-name> -- env | grep DB_',
      fixCommand: 'Add DB_HOST: "postgres-service" to ConfigMap and restart deployment.',
      verification: 'Application connects to database cleanly.',
      preventativeMeasures: 'Use schema validation (e.g. Zod or Joi) on environment variables during application boot.',
    },
    {
      id: 'incident-4',
      title: '4. Failed Healthcheck Probe',
      symptom: 'Kubernetes continuously kills and restarts pods every 30 seconds.',
      rootCause: 'Liveness probe path pointing to deprecated /healthz instead of /health.',
      diagnosticCommand: 'kubectl describe pod -l app=platform-api | grep -A 5 Liveness',
      fixCommand: 'Update livenessProbe.httpGet.path to /health in deployment.yaml.',
      verification: 'Liveness probe succeeds with HTTP 200.',
      preventativeMeasures: 'Standardize healthcheck probe paths across all organizational microservices.',
    },
    {
      id: 'incident-5',
      title: '5. Broken Service (Label Selector Mismatch)',
      symptom: 'Ingress returns HTTP 503; Service endpoints list is completely empty.',
      rootCause: 'Service selector has app: platform-api-v1 while pods are labeled app: platform-api.',
      diagnosticCommand: 'kubectl get endpoints platform-service',
      fixCommand: 'Update service.spec.selector to match pod labels exactly.',
      verification: 'Endpoints list contains all 3 running pod IPs.',
      preventativeMeasures: 'Use Helm templates or Kustomize to ensure labels and selectors are rendered from a single source.',
    },
    {
      id: 'incident-6',
      title: '6. Database Connectivity Failure',
      symptom: 'Backend returns HTTP 500: password authentication failed for user "appuser".',
      rootCause: 'Database secret password changed without updating application secret.',
      diagnosticCommand: 'kubectl logs -l app=platform-api --tail=20',
      fixCommand: 'Synchronize application DB_PASSWORD secret with PostgreSQL secret.',
      verification: 'Database queries succeed with HTTP 200.',
      preventativeMeasures: 'Use an automated secrets manager (HashiCorp Vault or AWS Secrets Manager).',
    },
    {
      id: 'incident-7',
      title: '7. Terraform State Drift',
      symptom: 'terraform plan reports 12 unexpected resource changes and proposed destructions.',
      rootCause: 'Manual edits in AWS/Cloud console altered security groups and subnet routing.',
      diagnosticCommand: 'terraform plan -detailed-exitcode',
      fixCommand: 'Run terraform apply -refresh-only to reconcile state or re-apply IaC to overwrite drift.',
      verification: 'terraform plan reports No changes.',
      preventativeMeasures: 'Enforce GitOps and revoke manual write permissions to cloud consoles.',
    },
    {
      id: 'incident-8',
      title: '8. Git Merge Disaster on Production Trunk',
      symptom: 'Main branch contains broken commit with lingering conflict markers (<<<<<<< HEAD).',
      rootCause: 'Developer blindly resolved merge conflict without testing locally.',
      diagnosticCommand: 'git log -1 -p',
      fixCommand: 'git revert HEAD --no-edit to immediately restore main, then fix in a feature branch.',
      verification: 'Main branch build green.',
      preventativeMeasures: 'Enable branch protection requiring passing CI checks and PR approvals before merge.',
    },
    {
      id: 'incident-9',
      title: '9. CI Pipeline Failure in Security Gate',
      symptom: 'Automated CI pipeline aborts: Critical CVE detected in base image.',
      rootCause: 'Base image node:18 contains unpatched OpenSSL vulnerability.',
      diagnosticCommand: 'trivy image enterprise-platform:1.0.0',
      fixCommand: 'Bump base image to node:20-alpine and rebuild.',
      verification: 'Security scan passes with 0 critical CVEs.',
      preventativeMeasures: 'Automate weekly dependency and base image upgrades via Dependabot.',
    },
    {
      id: 'incident-10',
      title: '10. Resource Exhaustion (OOMKilled & CPU Throttling)',
      symptom: 'Pods terminated with exit code 137 (OOMKilled) under sudden traffic spike.',
      rootCause: 'Memory limit set to 64Mi, which is too small for Node.js heap under load.',
      diagnosticCommand: 'kubectl describe pod | grep OOMKilled',
      fixCommand: 'Increase memory limits to 256Mi and deploy HorizontalPodAutoscaler (HPA).',
      verification: 'Pods handle load spike without restarts.',
      preventativeMeasures: 'Perform load testing to establish accurate baseline memory consumption before setting limits.',
    },
  ],
  validationChecks: [
    {
      id: 'v1',
      label: 'GIT: Repository initialized with branch conventions and tagged v1.0.0 release',
      verificationCommand: 'git tag -l | grep -q "v1.0.0"',
      points: 15,
    },
    {
      id: 'v2',
      label: 'LINUX: Hardened host OS with unprivileged service account (UID 10001)',
      verificationCommand: 'id -u appuser 2>/dev/null || grep -q "10001" Dockerfile',
      points: 15,
    },
    {
      id: 'v3',
      label: 'DOCKER: Multi-stage hardened container built with non-root user and healthcheck',
      verificationCommand: 'docker images enterprise-platform:1.0.0',
      points: 15,
    },
    {
      id: 'v4',
      label: 'TERRAFORM: Modular cloud infrastructure provisioned with outputs',
      verificationCommand: 'terraform output platform_infra_ready',
      points: 15,
    },
    {
      id: 'v5',
      label: 'KUBERNETES: Production multi-replica deployment and service active',
      verificationCommand: 'kubectl get deployment platform-api',
      points: 20,
    },
    {
      id: 'v6',
      label: 'FINAL INCIDENT CHALLENGE: All 10 catastrophic production outage scenarios mastered',
      verificationCommand: 'test -f platform-k8s.yaml',
      points: 20,
    },
  ],
  scoreMax: 100,
};
