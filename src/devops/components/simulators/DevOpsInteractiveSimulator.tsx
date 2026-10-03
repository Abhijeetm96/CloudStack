import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Terminal,
  Activity,
  Shield,
  GitBranch,
  Layers,
  ArrowRight,
  Server,
  Zap,
} from 'lucide-react';

export type SimulatorType =
  | 'ci-pipeline'
  | 'cd-pipeline'
  | 'build-pipeline'
  | 'deployment-pipeline'
  | 'blue-green'
  | 'canary'
  | 'rollback'
  | 'iac-provisioning'
  | 'gitops'
  | 'incident-response'
  | 'monitoring-alerting'
  | 'failure-recovery'
  | 'devsecops'
  | 'multi-env-deployment'
  | 'production-release';

interface SimulatorStage {
  id: string;
  name: string;
  command: string;
  durationMs: number;
  logs: string[];
}

interface SimulatorConfig {
  title: string;
  description: string;
  stages: SimulatorStage[];
  canaryTraffic?: boolean;
  blueGreenSwitch?: boolean;
  allowFailureInjection?: boolean;
}

const SIMULATOR_CONFIGS: Record<SimulatorType, SimulatorConfig> = {
  'ci-pipeline': {
    title: 'Continuous Integration (CI) Pipeline Simulator',
    description: 'Simulates webhook ingestion, runner provisioning, deterministic dependency hydration, automated testing, and coverage gating.',
    allowFailureInjection: true,
    stages: [
      {
        id: 'checkout',
        name: 'Git Checkout',
        command: 'git fetch --depth=1 origin refs/pull/42/merge && git checkout FETCH_HEAD',
        durationMs: 1200,
        logs: ['Cloning repo into isolated workspace...', 'Checking out merge commit 7a8f9c1...', 'Verified clean working tree.'],
      },
      {
        id: 'deps',
        name: 'Dependency Cache & Install',
        command: 'npm ci --prefer-offline',
        durationMs: 1600,
        logs: ['Restoring cache: npm-linux-x64-sha256-4b9...', 'Cache hit 98% (482 packages restored in 210ms)', 'Auditing package-lock.json integrity... zero discrepancies.'],
      },
      {
        id: 'lint',
        name: 'Lint & Format Verification',
        command: 'npm run lint -- --max-warnings=0',
        durationMs: 1400,
        logs: ['Executing ESLint v8.57 across 142 source files...', 'Checking Prettier formatting standards...', 'All 142 files adhere to production formatting rules.'],
      },
      {
        id: 'unit-tests',
        name: 'Parallel Unit Test Suites',
        command: 'vitest run --coverage --threads=4',
        durationMs: 2000,
        logs: ['Spawning 4 worker threads...', 'Running 54 test files (342 test specs)...', 'Test coverage: 94.2% lines, 91.8% branches.', 'Test suites: 54 passed, 0 failed.'],
      },
      {
        id: 'security-scan',
        name: 'SAST & Secret Audit',
        command: 'gitleaks detect && semgrep --config=p/ci',
        durationMs: 1800,
        logs: ['Scanning commit diff for leaked API keys...', 'No plaintext secrets detected.', 'Semgrep static analysis: 0 high, 0 critical security issues.'],
      },
      {
        id: 'artifact-package',
        name: 'Compile & Stage Artifact',
        command: 'npm run build && tar -czf build.tar.gz dist/',
        durationMs: 1500,
        logs: ['Bundling production chunks via Vite...', 'Generated 1.2MB optimized bundle.', 'Archived artifact build.tar.gz (SHA256: 9e32a...) ready for delivery.'],
      },
    ],
  },
  'cd-pipeline': {
    title: 'Continuous Delivery (CD) Pipeline Simulator',
    description: 'Simulates artifact promotion across environments with automated smoke gates and approval controls.',
    stages: [
      {
        id: 'fetch-artifact',
        name: 'Download Certified Artifact',
        command: 'cosign verify ghcr.io/org/app:v2.4.0 && docker pull',
        durationMs: 1200,
        logs: ['Verifying Cosign cryptographic signature...', 'Verified signed by key id: prod-signer-2026', 'Pulling OCI artifact layers from GHCR.'],
      },
      {
        id: 'deploy-staging',
        name: 'Deploy to Staging Cluster',
        command: 'kubectl apply -n staging -f k8s/staging/',
        durationMs: 1800,
        logs: ['Configuring staging namespace...', 'Rolling update deployment app-server (2 replicas)...', 'Pods healthy: staging-app-server-79d5f-q8xk4 ready.'],
      },
      {
        id: 'smoke-tests',
        name: 'Automated Smoke & Contract Tests',
        command: 'newman run postman/staging_smoke.json --reporters cli',
        durationMs: 1600,
        logs: ['Executing 24 API smoke test cases against staging endpoints...', 'Validating OAuth2 handshake and database query latency...', 'All staging assertions passed.'],
      },
      {
        id: 'prod-approval',
        name: 'Automated Production Policy Gate',
        command: 'opa eval --data policies/release.rego "data.release.allow"',
        durationMs: 1400,
        logs: ['Evaluating change advisory policy rules...', 'Rule check: No active P1 incidents in production: PASS', 'Rule check: Inside allowable maintenance window: PASS', 'Policy result: ALLOW.'],
      },
      {
        id: 'deploy-production',
        name: 'Production Rollout',
        command: 'kubectl rollout restart deployment/app-server -n production',
        durationMs: 2200,
        logs: ['Initiating production rolling update (6 replicas)...', 'Surge pods +2, draining old version...', 'Readiness probes 200 OK on /healthz.', 'Rollout successfully completed.'],
      },
    ],
  },
  'build-pipeline': {
    title: 'Hermetic Build & Package Simulator',
    description: 'Deterministic build execution with BuildKit caching, isolated compilation sandboxes, and reproducible digest hashing.',
    stages: [
      {
        id: 'env-sandbox',
        name: 'Initialize Hermetic Sandbox',
        command: 'bwrap --ro-bind / / --tmpfs /tmp --dev /dev ./build-agent',
        durationMs: 1200,
        logs: ['Creating isolated mount namespaces...', 'Unmounting host networking for hermetic compilation...', 'Sandbox verified immutable.'],
      },
      {
        id: 'cache-mount',
        name: 'Mount Distributed Build Cache',
        command: 'buildctl build --frontend dockerfile.v0 --import-cache type=gha',
        durationMs: 1500,
        logs: ['Querying remote BuildKit cache registry...', 'Layer 1 cached: node:20-alpine base (sha256:4d8...)', 'Layer 2 cached: package dependencies (sha256:79c...)'],
      },
      {
        id: 'compile',
        name: 'Deterministic Source Compilation',
        command: 'SOURCE_DATE_EPOCH=1700000000 tsc -b && esbuild',
        durationMs: 1900,
        logs: ['Normalizing filesystem timestamps to SOURCE_DATE_EPOCH...', 'Compiling TypeScript project with incremental cache...', 'Tree-shaking unused exports: 84 modules pruned.'],
      },
      {
        id: 'reproducible-digest',
        name: 'Calculate Reproducible SHA256 Digest',
        command: 'sha256sum dist/app.bundle.js',
        durationMs: 1200,
        logs: ['Hashing binary bundle...', 'Digest: 4c92a91f49b78a9c402bb848123fa4031d4590c', 'Matches bit-for-bit with secondary independent build agent.'],
      },
    ],
  },
  'deployment-pipeline': {
    title: 'Enterprise Deployment Pipeline Simulator',
    description: 'Full multi-stage pipeline with branch conditions, matrix parallelism, and dynamic credential exchange.',
    stages: [
      {
        id: 'oidc-auth',
        name: 'OIDC Cloud Credential Minting',
        command: 'actions/credentials --audience https://sts.amazonaws.com',
        durationMs: 1200,
        logs: ['Exchanging GitHub Actions JWT with AWS STS...', 'Role assumed: arn:aws:iam::123456789012:role/GitHubWorkflowsRole', 'Temporary session tokens minted (valid 60m).'],
      },
      {
        id: 'matrix-build',
        name: 'Parallel Cross-Platform Matrix',
        command: 'docker buildx build --platform linux/amd64,linux/arm64 -t app:v1.2 .',
        durationMs: 2200,
        logs: ['Building [linux/amd64]: complete in 1.4s', 'Building [linux/arm64]: complete in 1.8s', 'Multi-arch manifest list created.'],
      },
      {
        id: 'push-registry',
        name: 'Push to Secure Container Registry',
        command: 'docker push ghcr.io/company/app:v1.2',
        durationMs: 1500,
        logs: ['Uploading layers to ghcr.io...', 'Layers mounted from cache.', 'Image pushed with immutable digest sha256:39f1...'],
      },
      {
        id: 'deploy-cluster',
        name: 'GitOps Manifest Trigger',
        command: 'gh workflow run trigger-gitops.yml -f tag=v1.2',
        durationMs: 1600,
        logs: ['Dispatching repository dispatch event to fleet repository...', 'Fleet repository updated manifest /deployments/production/app.yaml', 'Argo CD triggered automatic synchronization.'],
      },
    ],
  },
  'blue-green': {
    title: 'Blue-Green Zero-Downtime Deployment Simulator',
    description: 'Maintains two identical environments (Blue and Green). Routes 100% traffic instantly at load balancer level after pre-flight warming.',
    blueGreenSwitch: true,
    stages: [
      {
        id: 'verify-blue',
        name: 'Active Blue Environment Running (v1.0)',
        command: 'curl -s https://api.prod.example.com/version',
        durationMs: 1200,
        logs: ['Blue environment actively serving 100% live traffic.', 'Version returned: v1.0.4. Healthy: 6/6 pods running.'],
      },
      {
        id: 'deploy-green',
        name: 'Provision & Warm Standby Green (v2.0)',
        command: 'kubectl apply -n prod-green -f k8s/green-deployment.yaml',
        durationMs: 2000,
        logs: ['Spawning 6 green pods with v2.0 image...', 'Executing pre-warming synthetic queries...', 'Green pods warmed and caches populated.'],
      },
      {
        id: 'health-check-green',
        name: 'Verify Green Health Probes',
        command: 'curl -s -f http://green-service.prod-green:8080/healthz/ready',
        durationMs: 1400,
        logs: ['Green readiness checks: 200 OK.', 'Database connection pool responsive (3ms avg latency).', 'Green environment declared 100% ready.'],
      },
      {
        id: 'traffic-switch',
        name: 'Switch Load Balancer Target to Green',
        command: 'kubectl patch service prod-router -p \'{"spec":{"selector":{"env":"green"}}}\'',
        durationMs: 1600,
        logs: ['Patching ALB / Ingress service target selector...', 'Traffic instantaneously switched from Blue -> Green.', '0 dropped TCP packets, 0 HTTP 5xx errors.'],
      },
      {
        id: 'drain-blue',
        name: 'Gracefully Drain Blue Connections',
        command: 'kubectl scale deployment prod-blue --replicas=0',
        durationMs: 1500,
        logs: ['Allowing active Blue TCP connections 30s to terminate...', 'All Blue requests completed.', 'Blue scaled to 0 or placed on standby for rapid rollback.'],
      },
    ],
  },
  'canary': {
    title: 'Progressive Canary Rollout Simulator',
    description: 'Increments traffic routed to new revision (10% -> 25% -> 50% -> 100%) while observing automated Prometheus error budgets.',
    canaryTraffic: true,
    allowFailureInjection: true,
    stages: [
      {
        id: 'canary-10',
        name: 'Route 10% Traffic to Canary v2.0',
        command: 'kubectl patch virtualservice checkout --type json -p \'[{"op":"replace","path":"/spec/http/0/route/1/weight","value":10}]\'',
        durationMs: 2000,
        logs: ['Routing 10% user traffic to Canary v2.0...', 'Observing latency & error metrics for 60s...', 'Canary HTTP 5xx rate: 0.02% (threshold < 0.5%). Proceeding.'],
      },
      {
        id: 'canary-25',
        name: 'Scale Canary Traffic to 25%',
        command: 'kubectl patch virtualservice checkout --type json -p \'[{"op":"replace","path":"/spec/http/0/route/1/weight","value":25}]\'',
        durationMs: 2000,
        logs: ['Traffic increased to 25%...', 'Prometheus P99 latency: 42ms on v2.0 vs 45ms on v1.0.', 'Canary error rate stable at 0.01%.'],
      },
      {
        id: 'canary-50',
        name: 'Scale Canary Traffic to 50%',
        command: 'kubectl patch virtualservice checkout --type json -p \'[{"op":"replace","path":"/spec/http/0/route/1/weight","value":50}]\'',
        durationMs: 2000,
        logs: ['Traffic increased to 50%...', 'Observing database connection pool saturation...', 'No pool exhaustion detected.'],
      },
      {
        id: 'canary-100',
        name: 'Promote Canary to 100% Full Rollout',
        command: 'kubectl patch virtualservice checkout --type json -p \'[{"op":"replace","path":"/spec/http/0/route/1/weight","value":100}]\'',
        durationMs: 1800,
        logs: ['100% traffic shifted to v2.0.', 'Canary marked fully stable.', 'Old baseline pods decommissioned.'],
      },
    ],
  },
  'rollback': {
    title: 'Automated Rollback & Self-Healing Simulator',
    description: 'Detects live production anomalies and triggers automatic traffic rollback to the previous known good revision.',
    stages: [
      {
        id: 'detect-anomaly',
        name: 'Detect Critical Error Budget Burn',
        command: 'alert: HighHttp5xxRate > 2.0% fired by Alertmanager',
        durationMs: 1500,
        logs: ['Prometheus alert firing: HTTP 500 error rate spiked to 4.2%!', 'SLO error budget burning at 14x normal rate.', 'Automated rollback controller triggered.'],
      },
      {
        id: 'divert-traffic',
        name: 'Instantaneously Divert Traffic to Baseline',
        command: 'kubectl patch virtualservice api-gateway -p \'{"spec":{"routes":[{"destination":"v1-stable","weight":100}]}}\'',
        durationMs: 1400,
        logs: ['Diverting 100% traffic immediately back to v1-stable...', 'Ingress routing table updated.', 'Incoming traffic hitting healthy v1 replicas.'],
      },
      {
        id: 'verify-recovery',
        name: 'Verify Telemetry Recovery',
        command: 'promql "sum(rate(http_requests_total{status=~"5.."}[1m]))"',
        durationMs: 1600,
        logs: ['HTTP 5xx rate plummeted back to 0.00%.', 'P95 response time normalized to 38ms.', 'Service reliability restored within 12 seconds.'],
      },
      {
        id: 'quarantine',
        name: 'Quarantine Defective Replicas for Postmortem',
        command: 'kubectl scale deployment/api-gateway-v2 --replicas=1 && kubectl label pod -l version=v2 quarantine=true',
        durationMs: 1500,
        logs: ['Preserved 1 isolated pod with memory heap dump and logs for RCA.', 'Pushed forensic snapshot to S3 diagnostic bucket.', 'Notified on-call team with diagnostic link.'],
      },
    ],
  },
  'iac-provisioning': {
    title: 'Terraform Infrastructure as Code Simulator',
    description: 'Simulates declarative cloud provisioning: remote state locking, plan generation, drift inspection, and resource apply.',
    stages: [
      {
        id: 'state-lock',
        name: 'Acquire Remote State Lock (DynamoDB)',
        command: 'terraform init && terraform state pull',
        durationMs: 1400,
        logs: ['Locking state lock in DynamoDB table terraform-locks...', 'Lock acquired by execution ID c78-devops-run.', 'Loaded remote state from s3://prod-terraform-state/vpc.tfstate.'],
      },
      {
        id: 'plan',
        name: 'Generate Execution Plan (terraform plan)',
        command: 'terraform plan -out=tfplan -detailed-exitcode',
        durationMs: 2200,
        logs: ['Refreshing AWS cloud resource states...', 'Plan: 4 to add, 1 to change, 0 to destroy.', '+ aws_vpc.prod_vpc (10.0.0.0/16)', '+ aws_subnet.prod_private_a (10.0.1.0/24)', '+ aws_subnet.prod_private_b (10.0.2.0/24)', '+ aws_nat_gateway.gw_a'],
      },
      {
        id: 'security-compliance',
        name: 'Evaluate tfsec & Checkov Policies',
        command: 'checkov -f tfplan.json --framework terraform',
        durationMs: 1600,
        logs: ['Scanning 5 declared cloud resources against CIS AWS Benchmark...', 'Passed: VPC Flow Logs enabled.', 'Passed: No public subnets with unrestricted 0.0.0.0/0 ingress.', 'Security scan: 0 violations.'],
      },
      {
        id: 'apply',
        name: 'Apply Cloud Changes (terraform apply)',
        command: 'terraform apply -input=false tfplan',
        durationMs: 2400,
        logs: ['aws_vpc.prod_vpc: Creating...', 'aws_vpc.prod_vpc: Creation complete after 6s [id=vpc-091a2b]', 'aws_nat_gateway.gw_a: Creation complete after 12s [id=nat-0418e]', 'Apply complete! Resources: 4 added, 1 changed, 0 destroyed.', 'Releasing DynamoDB lock... lock released.'],
      },
    ],
  },
  'gitops': {
    title: 'GitOps Declarative Reconciliation Simulator (Argo CD)',
    description: 'Declarative cluster management: Git commit triggers reconciliation loop, detects drift, and converges Kubernetes desired state.',
    stages: [
      {
        id: 'git-commit',
        name: 'Commit Desired State to Git Repo',
        command: 'git commit -m "chore(prod): bump payment image to v2.6.0" && git push',
        durationMs: 1200,
        logs: ['Pushed commit 41a9bc to https://github.com/company/fleet-gitops.git (branch main).', 'Git webhook delivered to Argo CD API server.'],
      },
      {
        id: 'drift-detect',
        name: 'Argo CD Detects Manifest Drift',
        command: 'argocd app diff payment-production',
        durationMs: 1800,
        logs: ['Comparing Git desired state with live Kubernetes etcd...', 'Out of Sync detected!', '- image: ghcr.io/org/payment:v2.5.2 (Live State)', '+ image: ghcr.io/org/payment:v2.6.0 (Desired State in Git)'],
      },
      {
        id: 'sync-reconcile',
        name: 'Declarative Sync & Reconciliation',
        command: 'argocd app sync payment-production --prune',
        durationMs: 2200,
        logs: ['Sync phase: PreSync hooks executing database migrations...', 'Sync phase: Updating Kubernetes Deployment manifest...', 'Kubernetes controller initiating rolling replacement.'],
      },
      {
        id: 'health-synced',
        name: 'Cluster Converged: Synced & Healthy',
        command: 'argocd app wait payment-production --health',
        durationMs: 1400,
        logs: ['All 6 pods reported healthy status.', 'Application status: Synced | Health: Healthy.', 'Zero manual kubectl edit needed. Single source of truth preserved.'],
      },
    ],
  },
  'incident-response': {
    title: 'Incident Response & Triage Simulator',
    description: 'Simulates high-severity production incident: automated alert page, incident commander assignment, mitigation, and postmortem authoring.',
    stages: [
      {
        id: 'page-received',
        name: 'Critical Page Dispatched to On-Call',
        command: 'pagerduty incident trigger --severity P1 --title "Database Connection Exhaustion"',
        durationMs: 1200,
        logs: ['Alertmanager triggered PagerDuty P1 notification.', 'On-call primary acknowledged page within 45 seconds.', 'Automated Slack incident channel created: #inc-2026-10-04-db-exhaustion.'],
      },
      {
        id: 'triage-commander',
        name: 'Incident Commander Appointed & Status Page Updated',
        command: 'incident command appoint @sarah && statuspage update "Investigating elevated latency"',
        durationMs: 1600,
        logs: ['Sarah appointed Incident Commander.', 'Public status page updated: "Investigating checkout degradation".', 'Engineering war room assembled with DBRE, Platform, and SRE.'],
      },
      {
        id: 'mitigation',
        name: 'Execute Mitigation Playbook',
        command: 'kubectl scale deployment checkout-api --replicas=12 && pgbouncer reload',
        durationMs: 2000,
        logs: ['Identified stuck connection pool in PgBouncer.', 'Executed runbook RB-DB-04: reset idle client connections.', 'Connection saturation dropped from 99% to 24%.'],
      },
      {
        id: 'resolution-postmortem',
        name: 'Resolution & Blameless Postmortem Action Items',
        command: 'incident resolve && create-postmortem --template blameless',
        durationMs: 1600,
        logs: ['Latency returned to 24ms. Status page updated: "All Systems Operational".', 'Blameless postmortem scheduled for 14:00 UTC.', 'Action item AI-1: configure connection pool circuit breaker in PgBouncer.'],
      },
    ],
  },
  'monitoring-alerting': {
    title: 'Prometheus & Alertmanager Telemetry Simulator',
    description: 'Prometheus metrics evaluation, sliding window rate calculations, alert suppression, and notification routing.',
    stages: [
      {
        id: 'scrape',
        name: 'Prometheus Scrapes /metrics Endpoints',
        command: 'curl -s http://service-backend:9090/metrics | grep http_requests_total',
        durationMs: 1200,
        logs: ['Scraped 48 endpoints across 12 pods in 14ms.', 'Ingested 1,240 time-series metrics into Prometheus TSDB.'],
      },
      {
        id: 'evaluate-promql',
        name: 'Evaluate PromQL SLO Rules',
        command: 'promql "sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m]))"',
        durationMs: 1800,
        logs: ['Evaluating rule: HighErrorRate over 5m interval...', 'Current error rate: 0.08% (Threshold: 1.00%). Status: NORMAL.'],
      },
      {
        id: 'alertmanager-route',
        name: 'Alertmanager Deduplication & Routing',
        command: 'amtool alert --alertmanager.url=http://alertmanager:9093',
        durationMs: 1400,
        logs: ['Routing tree evaluated.', 'Grouping alerts by cluster, namespace, alertname.', 'Inhibition rules active: suppressing warning alerts while critical is firing.'],
      },
    ],
  },
  'failure-recovery': {
    title: 'Disaster Recovery (DR) Multi-Region Failover Simulator',
    description: 'Simulates catastrophe in primary AWS region (us-east-1), automated Route 53 health failover to secondary (us-west-2), and DB replica promotion.',
    stages: [
      {
        id: 'region-failure',
        name: 'Catastrophic Outage in Primary Region (us-east-1)',
        command: 'aws ec2 simulate-regional-failure --region us-east-1',
        durationMs: 1500,
        logs: ['Primary region us-east-1 experiencing network blackhole.', '3 consecutive Route 53 synthetic health checks timed out.'],
      },
      {
        id: 'dns-failover',
        name: 'Route 53 DNS Automated Health Check Failover',
        command: 'route53 update-dns-routing-policy --failover SECONDARY',
        durationMs: 1800,
        logs: ['Route 53 health check marked us-east-1 UNHEALTHY.', 'Global DNS queries shifted 100% to secondary region us-west-2.', 'DNS propagation verified globally in 28 seconds.'],
      },
      {
        id: 'promote-database',
        name: 'Promote Read Replica to Standalone Primary',
        command: 'aws rds promote-read-replica --db-instance-identifier prod-db-west',
        durationMs: 2400,
        logs: ['Promoting Aurora global cross-region replica in us-west-2...', 'Replica lag was 140ms (RPO target: < 1s achieved).', 'Promoted to read/write primary successfully.'],
      },
      {
        id: 'traffic-west',
        name: 'West Coast Cluster Serving 100% Workload',
        command: 'curl -s https://api.example.com/healthz',
        durationMs: 1400,
        logs: ['Workloads receiving live traffic in us-west-2.', 'Autoscaler scaling pods from 10 -> 30 to absorb full traffic.', 'RTO achieved: 3 minutes 14 seconds (Target < 15 minutes).'],
      },
    ],
  },
  'devsecops': {
    title: 'DevSecOps Shift-Left Security Pipeline Simulator',
    description: 'Pipeline security: SAST static code analysis, Gitleaks secret scans, Trivy container CVE scans, and Cosign digital signatures.',
    stages: [
      {
        id: 'secret-scan',
        name: 'Pre-Commit Secret Scanning (Gitleaks)',
        command: 'gitleaks detect --source=. --verbose',
        durationMs: 1400,
        logs: ['Scanning 84 commits and staged files for 140+ credential types...', 'No AWS access keys, GitHub tokens, or private RSA keys found.', 'Status: CLEAN.'],
      },
      {
        id: 'sast-scan',
        name: 'Static Application Security Testing (SAST)',
        command: 'semgrep scan --config auto --error',
        durationMs: 1800,
        logs: ['Analyzing AST for SQL injection, XSS, and insecure deserialization...', 'Found 0 vulnerabilities with Severity: HIGH or CRITICAL.', 'SAST policy gate passed.'],
      },
      {
        id: 'container-scan',
        name: 'Container Image Vulnerability Scan (Trivy)',
        command: 'trivy image --severity HIGH,CRITICAL --exit-code 1 ghcr.io/org/app:v1.0',
        durationMs: 2000,
        logs: ['Pulling latest vulnerability database (NVD, GitHub Advisories)...', 'Scanning OS packages & application dependencies...', 'Vulnerabilities: 0 Critical, 0 High.', 'Container security gate passed.'],
      },
      {
        id: 'sign-provenance',
        name: 'Cosign Image Signing & SLSA Provenance',
        command: 'cosign sign --key k8s://vault/cosign-key ghcr.io/org/app:v1.0',
        durationMs: 1600,
        logs: ['Generating cryptographic signature for digest sha256:7b91...', 'Signing using hardware key in HashiCorp Vault.', 'Attaching in-toto SLSA Level 3 build provenance attestation.', 'Image certified for production deployment.'],
      },
    ],
  },
  'multi-env-deployment': {
    title: 'Multi-Environment Promotion Simulator',
    description: 'Safely promoting code across isolated development, QA, staging, and multi-region production tiers with drift validation.',
    stages: [
      {
        id: 'deploy-dev',
        name: 'Tier 1: Ephemeral Development Environment',
        command: 'helm upgrade --install dev-pr-42 ./charts/app -n dev',
        durationMs: 1400,
        logs: ['Provisioned ephemeral PR environment dev-pr-42.', 'Ran quick developer verification suite.', 'Torn down successfully after test run.'],
      },
      {
        id: 'deploy-qa',
        name: 'Tier 2: QA & Integration Testing',
        command: 'helm upgrade --install qa-app ./charts/app -n qa',
        durationMs: 1600,
        logs: ['Deployed to shared QA environment.', 'Executed automated Cypress End-to-End integration suite.', 'All 48 user journeys passed.'],
      },
      {
        id: 'deploy-staging',
        name: 'Tier 3: Staging Production Parity',
        command: 'helm upgrade --install staging-app ./charts/app -n staging',
        durationMs: 1800,
        logs: ['Staging deployment matches production infrastructure topology.', 'Synthetic load test executed at 500 RPS.', '0 memory leaks or CPU throttling detected.'],
      },
      {
        id: 'deploy-prod',
        name: 'Tier 4: Production Multi-Region Rollout',
        command: 'helm upgrade prod-app-us-east ./charts/app && helm upgrade prod-app-eu-central ./charts/app',
        durationMs: 2200,
        logs: ['Promoted verified artifact to US and EU production regions.', 'Configured localized secrets and database endpoints.', 'Global rollout completed with 100% parity.'],
      },
    ],
  },
  'production-release': {
    title: 'End-to-End Production Release Synthesis Simulator',
    description: 'The master workflow: Git push -> CI verification -> Container build -> Terraform check -> Kubernetes rolling rollout -> Prometheus verification.',
    stages: [
      {
        id: 'git-commit',
        name: 'Step 1: Git Push & Webhook Trigger',
        command: 'git push origin main (Commit: 8f92b7c)',
        durationMs: 1200,
        logs: ['Commit 8f92b7c pushed by @senior-devops.', 'Triggered GitHub Actions master release workflow #4092.'],
      },
      {
        id: 'ci-testing',
        name: 'Step 2: Automated CI Quality Gates',
        command: 'npm run lint && npm run test:ci && gitleaks detect',
        durationMs: 1800,
        logs: ['Linting: PASS | Unit Tests: 54/54 PASS | SAST: PASS | Secret Scan: PASS.', 'Quality gates passed in 1.4s.'],
      },
      {
        id: 'container-build',
        name: 'Step 3: Multi-Stage Docker Build & Trivy Scan',
        command: 'docker buildx build -t ghcr.io/org/enterprise:v3.0.0 --push . && trivy image',
        durationMs: 2000,
        logs: ['Multi-stage Docker build completed in hermetic BuildKit environment.', 'Trivy security scan: 0 CVEs.', 'Image signed with Cosign.'],
      },
      {
        id: 'infra-drift',
        name: 'Step 4: Terraform Infrastructure Verification',
        command: 'terraform plan -detailed-exitcode',
        durationMs: 1600,
        logs: ['Checking AWS cloud infrastructure for configuration drift...', 'No drift detected. Infrastructure matches code 100%.'],
      },
      {
        id: 'k8s-rollout',
        name: 'Step 5: Kubernetes Rolling Update Rollout',
        command: 'kubectl rollout restart deployment/enterprise-app -n production',
        durationMs: 2200,
        logs: ['Executing zero-downtime rolling update across 8 pods.', 'Readiness probes verified 200 OK.', 'Rollout completed with 0 seconds downtime.'],
      },
      {
        id: 'telemetry-verify',
        name: 'Step 6: Prometheus Telemetry & SLO Certification',
        command: 'promql "sum(rate(http_requests_total{status=~"2.."}[5m]))"',
        durationMs: 1600,
        logs: ['Prometheus metrics reporting 100% 2xx responses.', 'P99 latency: 22ms. Error rate: 0.00%.', 'Release Certified Production Ready!'],
      },
    ],
  },
};

interface SimulatorProps {
  simulatorType: SimulatorType;
  onClose?: () => void;
}

export const DevOpsInteractiveSimulator: React.FC<SimulatorProps> = ({ simulatorType, onClose }) => {
  const config = SIMULATOR_CONFIGS[simulatorType] || SIMULATOR_CONFIGS['ci-pipeline'];
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [failureStageIndex, setFailureStageIndex] = useState<number | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [canaryTrafficPercent, setCanaryTrafficPercent] = useState<number>(10);
  const [blueActive, setBlueActive] = useState<boolean>(true);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  // Step-by-step pipeline runner
  useEffect(() => {
    if (!isRunning || currentStageIndex < 0) return;

    if (currentStageIndex >= config.stages.length) {
      setIsRunning(false);
      setTerminalLogs(prev => [...prev, '', '========================================', '✓ ALL PIPELINE STAGES COMPLETED SUCCESSFULLY', '========================================']);
      return;
    }

    const stage = config.stages[currentStageIndex];

    // Check if failure injected on this stage
    if (failureStageIndex === currentStageIndex) {
      setIsRunning(false);
      setIsFailed(true);
      setTerminalLogs(prev => [
        ...prev,
        `[STAGE ${currentStageIndex + 1}/${config.stages.length}] RUNNING: ${stage.name}`,
        `$ ${stage.command}`,
        ...stage.logs.slice(0, 1),
        `FATAL ERROR: Injected failure in ${stage.name}! Exit code 1.`,
        'PIPELINE HALTED IMMEDIATELY. Gating blocked downstream promotion.',
      ]);
      return;
    }

    setTerminalLogs(prev => [
      ...prev,
      `[STAGE ${currentStageIndex + 1}/${config.stages.length}] RUNNING: ${stage.name}`,
      `$ ${stage.command}`,
      ...stage.logs,
      `✓ ${stage.name} passed (${(stage.durationMs / 1000).toFixed(1)}s)`,
      '',
    ]);

    const timer = setTimeout(() => {
      if (config.blueGreenSwitch && currentStageIndex === 3) {
        setBlueActive(false);
      }
      if (config.canaryTraffic) {
        setCanaryTrafficPercent(prev => Math.min(100, prev + 25));
      }
      setCurrentStageIndex(prev => prev + 1);
    }, stage.durationMs);

    return () => clearTimeout(timer);
  }, [isRunning, currentStageIndex, failureStageIndex]);

  const handleStart = () => {
    setIsFailed(false);
    setFailureStageIndex(null);
    setCurrentStageIndex(0);
    setIsRunning(true);
    setTerminalLogs([
      `Initializing ${config.title}...`,
      `Pipeline definition: ${config.stages.length} declared stages.`,
      'Agent environment: Linux x86_64 container runner.',
      '--------------------------------------------------',
    ]);
    if (config.blueGreenSwitch) setBlueActive(true);
    if (config.canaryTraffic) setCanaryTrafficPercent(10);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFailed(false);
    setFailureStageIndex(null);
    setCurrentStageIndex(-1);
    setTerminalLogs(['Simulator ready. Press "Run Simulation" to execute workflow.']);
    if (config.blueGreenSwitch) setBlueActive(true);
    if (config.canaryTraffic) setCanaryTrafficPercent(10);
  };

  const handleStep = () => {
    if (currentStageIndex < 0) {
      handleStart();
    } else if (currentStageIndex < config.stages.length) {
      setCurrentStageIndex(prev => prev + 1);
    }
  };

  const handleInjectFailure = () => {
    if (isRunning && currentStageIndex >= 0) {
      setFailureStageIndex(currentStageIndex);
    } else {
      setFailureStageIndex(1);
      handleStart();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl flex flex-col my-4">
      {/* Simulator Header */}
      <div className="bg-slate-800/80 px-5 py-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {config.title}
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Interactive Lab
              </span>
            </h3>
            <p className="text-xs text-slate-400">{config.description}</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white px-3 py-1 text-sm bg-slate-700/50 hover:bg-slate-700 rounded transition"
          >
            Close Lab
          </button>
        )}
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-slate-950/60 px-5 py-3 border-b border-slate-800 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm shadow transition ${
              isRunning
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30'
            }`}
          >
            <Play size={16} />
            {currentStageIndex >= 0 && !isFailed ? 'Running...' : 'Run Simulation'}
          </button>

          <button
            onClick={handleStep}
            disabled={isRunning || currentStageIndex >= config.stages.length}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition"
          >
            <SkipForward size={15} />
            Step Forward
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition"
          >
            <RotateCcw size={15} />
            Reset
          </button>
        </div>

        {config.allowFailureInjection && (
          <button
            onClick={handleInjectFailure}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-medium transition"
          >
            <AlertTriangle size={14} />
            Simulate Pipeline Failure
          </button>
        )}

        {/* Specialized Visual Widgets for Blue-Green or Canary */}
        {config.blueGreenSwitch && (
          <div className="flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <span className="text-slate-400">Traffic Routing:</span>
            <span
              className={`px-2 py-0.5 rounded font-bold transition-all ${
                blueActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              BLUE (v1.0)
            </span>
            <ArrowRight size={12} className="text-slate-500" />
            <span
              className={`px-2 py-0.5 rounded font-bold transition-all ${
                !blueActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              GREEN (v2.0)
            </span>
          </div>
        )}

        {config.canaryTraffic && (
          <div className="flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <span className="text-slate-400">Canary Traffic Weight:</span>
            <div className="w-24 bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
              <div
                className="bg-cyan-500 transition-all duration-500"
                style={{ width: `${canaryTrafficPercent}%` }}
              />
            </div>
            <span className="font-mono font-bold text-cyan-400">{canaryTrafficPercent}%</span>
          </div>
        )}
      </div>

      {/* Pipeline Stage Nodes Visualization */}
      <div className="p-5 bg-slate-900/90 border-b border-slate-800 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max pb-2">
          {config.stages.map((stage, idx) => {
            const isCompleted = currentStageIndex > idx;
            const isCurrent = currentStageIndex === idx && isRunning;
            const isStageFailed = isFailed && failureStageIndex === idx;

            return (
              <React.Fragment key={stage.id}>
                <div
                  className={`flex flex-col p-3 rounded-lg border transition-all duration-300 w-44 ${
                    isStageFailed
                      ? 'bg-rose-950/40 border-rose-500/80 text-rose-200'
                      : isCompleted
                      ? 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200'
                      : isCurrent
                      ? 'bg-cyan-950/40 border-cyan-400 text-cyan-100 ring-2 ring-cyan-500/30 animate-pulse'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      Step {idx + 1}
                    </span>
                    {isStageFailed ? (
                      <XCircle size={15} className="text-rose-400" />
                    ) : isCompleted ? (
                      <CheckCircle2 size={15} className="text-emerald-400" />
                    ) : isCurrent ? (
                      <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full bg-slate-700" />
                    )}
                  </div>
                  <div className="font-semibold text-xs truncate text-white">{stage.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1 truncate">
                    {stage.command}
                  </div>
                </div>

                {idx < config.stages.length - 1 && (
                  <ArrowRight
                    size={16}
                    className={`transition-colors shrink-0 ${
                      currentStageIndex > idx ? 'text-emerald-400' : 'text-slate-700'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Live Terminal Log Streamer */}
      <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 h-64 overflow-y-auto flex flex-col justify-between">
        <div className="space-y-1">
          <div className="text-slate-500 pb-2 border-b border-slate-800/80 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Terminal size={14} /> LIVE RUNNER CONSOLE LOG
            </span>
            <span className="text-[10px] text-slate-600">ansi-color 256 | stream active</span>
          </div>

          {terminalLogs.length === 0 ? (
            <div className="text-slate-600 pt-4">Terminal idle. Click "Run Simulation" above.</div>
          ) : (
            terminalLogs.map((log, index) => {
              const isError = log.includes('ERROR') || log.includes('FATAL');
              const isSuccess = log.includes('✓') || log.includes('SUCCESS');
              const isCommand = log.startsWith('$');
              const isHeader = log.startsWith('[STAGE');

              return (
                <div
                  key={index}
                  className={`leading-relaxed ${
                    isError
                      ? 'text-rose-400 font-semibold'
                      : isSuccess
                      ? 'text-emerald-400 font-semibold'
                      : isCommand
                      ? 'text-yellow-300 font-bold pl-2'
                      : isHeader
                      ? 'text-cyan-400 font-bold pt-2'
                      : 'text-slate-300 pl-4'
                  }`}
                >
                  {log}
                </div>
              );
            })
          )}
          <div ref={logsEndRef} />
        </div>
      </div>
    </div>
  );
};
