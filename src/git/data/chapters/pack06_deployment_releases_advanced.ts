import { buildGitConcept } from '../conceptFactory';
import { AcademyTopic } from '../unifiedAcademyData';

// ============================================================================
// CHAPTER 29: DEPLOYMENT (29.1 to 29.14)
// ============================================================================
export const CHAPTER_29: AcademyTopic = {
  id: 'ch-29',
  number: '29',
  title: 'Deployment',
  description: 'Understand software deployment: environments (dev, test, staging, prod), pipelines, secrets, approval gates, health checks, and automated rollbacks.',
  iconName: 'Server',
  conceptCount: 14,
  concepts: [
    buildGitConcept({
      id: 'c-29-01', subChapterNumber: '29.1', command: 'deploy', title: 'What is Deployment?',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: 'The process of delivering tested software into target environments where users can access it',
      whatIsIt: 'Deployment installs the built artifact onto servers or serverless platforms and configures routing so traffic reaches the new version.',
    }),
    buildGitConcept({
      id: 'c-29-02', subChapterNumber: '29.2', command: 'environments: [dev, test, staging, prod]', title: 'Deployment Environments',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: 'The multi-tier promotion ladder ensuring zero untested code touches customer data',
      whatIsIt: 'Isolated infrastructure rings: Development -> Testing (QA) -> Staging (Pre-prod) -> Production (Live users).',
    }),
    buildGitConcept({
      id: 'c-29-03', subChapterNumber: '29.3', command: 'env: development', title: 'Development',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: 'Rapid iteration sandbox for active feature coding with hot reloading and verbose logs',
      whatIsIt: 'The first environment where code runs outside developer laptops, connected to test databases.',
    }),
    buildGitConcept({
      id: 'c-29-04', subChapterNumber: '29.4', command: 'env: testing', title: 'Testing',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: 'Automated integration testing and QA verification with sanitized mock datasets',
      whatIsIt: 'Runs automated regression test suites and performance benchmarks against deployed endpoints.',
    }),
    buildGitConcept({
      id: 'c-29-05', subChapterNumber: '29.5', command: 'env: staging', title: 'Staging',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: '100% production mirror: identical cloud topology, database sizing, and CDN routing',
      whatIsIt: 'The final dry run: if code passes staging, it is guaranteed to work in production.',
    }),
    buildGitConcept({
      id: 'c-29-06', subChapterNumber: '29.6', command: 'env: production', title: 'Production',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: 'The live customer-facing environment handling real money, transactions, and user traffic',
      badges: ['Production Critical'],
      whatIsIt: 'High-availability infrastructure with redundancy across multiple availability zones and auto-scaling.',
    }),
    buildGitConcept({
      id: 'c-29-07', subChapterNumber: '29.7', command: 'deploy-pipeline.yml', title: 'Deployment Pipeline',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: 'Automated workflow that orchestrates artifact deployment, smoke tests, and routing shifts',
      whatIsIt: 'Fetches certified artifact -> updates cloud targets -> runs health checks -> flips traffic.',
    }),
    buildGitConcept({
      id: 'c-29-08', subChapterNumber: '29.8', command: 'ssh user@prod "docker pull && docker restart"', title: 'Manual Deployment',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: 'Why manual deployments lead to human error, outages, and audit compliance violations',
      whatIsIt: 'Manual steps cannot be audited, lack automated rollbacks, and cause outages when commands are mistyped.',
    }),
    buildGitConcept({
      id: 'c-29-09', subChapterNumber: '29.9', command: 'git push -> automated deploy', title: 'Automated Deployment',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: 'Zero human keystrokes: pipelines execute deterministic deployment steps safely',
      whatIsIt: 'Guarantees repeatability, auditable git logs, and automated rollback upon health failure.',
    }),
    buildGitConcept({
      id: 'c-29-10', subChapterNumber: '29.10', command: 'NODE_ENV=production', title: 'Environment Variables',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: 'Twelve-Factor App rule III: store config in the environment, not in source code',
      whatIsIt: 'Applications read database hosts, cache endpoints, and ports from environment variables.',
    }),
    buildGitConcept({
      id: 'c-29-11', subChapterNumber: '29.11', command: 'secrets.AWS_ROLE_ARN', title: 'Deployment Secrets',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: 'Production infrastructure credentials injected securely at deployment runtime',
      whatIsIt: 'Scoped strictly to deployment jobs: developers cannot read production database passwords.',
    }),
    buildGitConcept({
      id: 'c-29-12', subChapterNumber: '29.12', command: 'environment: { name: prod, reviewers: [leads] }', title: 'Deployment Approval',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: 'Four-eyes principle: requiring senior engineering sign-off before production deploy',
      whatIsIt: 'GitHub Actions pauses workflow and alerts designated on-call reviewers before production deployment begins.',
    }),
    buildGitConcept({
      id: 'c-29-13', subChapterNumber: '29.13', command: 'kubectl rollout undo', title: 'Rollback',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: 'Immediately reverting to the previous known good artifact when an outage occurs',
      badges: ['Emergency Response'],
      whatIsIt: 'Rollbacks must take seconds, not hours: redeploying the previous immutable container image tag.',
    }),
    buildGitConcept({
      id: 'c-29-14', subChapterNumber: '29.14', command: '500 Internal Server Error', title: 'Deployment Failure',
      topicId: 'ch-29', topicNumber: '29', topicTitle: 'Deployment',
      subtitle: 'Diagnosing failed migrations, crashing pods (CrashLoopBackOff), and memory leaks',
      whatIsIt: 'Detecting deployment failures early via automated smoke tests and readiness health probes.',
    }),
  ],
};

// ============================================================================
// CHAPTER 30: DEPLOYMENT STRATEGIES (30.1 to 30.10)
// ============================================================================
export const CHAPTER_30: AcademyTopic = {
  id: 'ch-30',
  number: '30',
  title: 'Deployment Strategies',
  description: 'Zero-downtime deployment strategies: Rolling, Blue-Green, Canary, Recreate, Feature Flags, readiness/liveness health probes, and rollback execution.',
  iconName: 'Activity',
  conceptCount: 10,
  concepts: [
    buildGitConcept({
      id: 'c-30-01', subChapterNumber: '30.1', command: 'rolling update', title: 'Rolling Deployment',
      topicId: 'ch-30', topicNumber: '30', topicTitle: 'Deployment Strategies',
      subtitle: 'Gradually replacing old server instances with new ones one-by-one with zero downtime',
      whatIsIt: 'Updates 25% of server pods at a time: service capacity remains stable while new version takes over.',
    }),
    buildGitConcept({
      id: 'c-30-02', subChapterNumber: '30.2', command: 'blue-green rollout', title: 'Blue-Green Deployment',
      topicId: 'ch-30', topicNumber: '30', topicTitle: 'Deployment Strategies',
      subtitle: 'Two identical environments: Blue (active live) and Green (idle staging) with instant router flip',
      badges: ['Enterprise Pattern'],
      whatIsIt: 'Deploy version 2 to Green. Run smoke tests on Green. Flip router from Blue to Green. Instant rollback if needed by flipping back.',
    }),
    buildGitConcept({
      id: 'c-30-03', subChapterNumber: '30.3', command: 'canary rollout: 5%', title: 'Canary Deployment',
      topicId: 'ch-30', topicNumber: '30', topicTitle: 'Deployment Strategies',
      subtitle: 'Routing 5% of real user traffic to new version to measure error rates before 100% rollout',
      whatIsIt: 'Minimizes blast radius: if a memory leak or crash occurs, only 5% of users notice before automated rollback cancels it.',
    }),
    buildGitConcept({
      id: 'c-30-04', subChapterNumber: '30.4', command: 'recreate update', title: 'Recreate Deployment',
      topicId: 'ch-30', topicNumber: '30', topicTitle: 'Deployment Strategies',
      subtitle: 'Terminate old version before starting new version (brief planned downtime)',
      whatIsIt: 'Required when breaking database schema migrations cannot support two versions of code running simultaneously.',
    }),
    buildGitConcept({
      id: 'c-30-05', subChapterNumber: '30.5', command: 'feature_flags.is_enabled("new_checkout")', title: 'Feature Flags',
      topicId: 'ch-30', topicNumber: '30', topicTitle: 'Deployment Strategies',
      subtitle: 'Decoupling code deployment from feature release using runtime toggles',
      whatIsIt: 'Deploy code to production dark (disabled). Turn on feature for 10% of users via cloud dashboard without redeploying.',
    }),
    buildGitConcept({
      id: 'c-30-06', subChapterNumber: '30.6', command: 'zero-downtime deployment', title: 'Zero-Downtime Deployment',
      topicId: 'ch-30', topicNumber: '30', topicTitle: 'Deployment Strategies',
      subtitle: 'Architectural rules for 24/7 services: backward compatible APIs and database migrations',
      whatIsIt: 'Never drop a database column in the same release you stop using it: use expand-and-contract database migration patterns.',
    }),
    buildGitConcept({
      id: 'c-30-07', subChapterNumber: '30.7', command: 'GET /healthz -> 200 OK', title: 'Health Checks',
      topicId: 'ch-30', topicNumber: '30', topicTitle: 'Deployment Strategies',
      subtitle: 'Automated HTTP endpoints queried by load balancers to detect healthy instances',
      whatIsIt: 'Load balancers remove instances returning 500 or failing to respond within 2 seconds from the active routing pool.',
    }),
    buildGitConcept({
      id: 'c-30-08', subChapterNumber: '30.8', command: 'readinessProbe: httpGet: /ready', title: 'Readiness',
      topicId: 'ch-30', topicNumber: '30', topicTitle: 'Deployment Strategies',
      subtitle: 'Signals whether the application is ready to accept incoming customer requests',
      whatIsIt: 'Verifies database connections and cache warm-up before Kubernetes allows customer traffic into the container.',
    }),
    buildGitConcept({
      id: 'c-30-09', subChapterNumber: '30.9', command: 'livenessProbe: httpGet: /live', title: 'Liveness',
      topicId: 'ch-30', topicNumber: '30', topicTitle: 'Deployment Strategies',
      subtitle: 'Detecting deadlocked or hanging processes and triggering automated container restarts',
      whatIsIt: 'If an app deadlocks and stops responding to liveness probes, the container orchestrator automatically kills and restarts it.',
    }),
    buildGitConcept({
      id: 'c-30-10', subChapterNumber: '30.10', command: 'automated rollback on error_rate > 1%', title: 'Rollback Strategy',
      topicId: 'ch-30', topicNumber: '30', topicTitle: 'Deployment Strategies',
      subtitle: 'The golden rule: Rollbacks must be automated, tested, and instant',
      whatIsIt: 'Pre-scripted rollback runbooks ensuring zero panic during production incidents.',
    }),
  ],
};

// ============================================================================
// CHAPTER 31: RELEASE MANAGEMENT (31.1 to 31.11)
// ============================================================================
export const CHAPTER_31: AcademyTopic = {
  id: 'ch-31',
  number: '31',
  title: 'Release Management',
  description: 'Manage software releases: semantic versioning, git tags, automated release notes, changelogs, release pipelines, and hotfix branches.',
  iconName: 'Tag',
  conceptCount: 11,
  concepts: [
    buildGitConcept({
      id: 'c-31-01', subChapterNumber: '31.1', command: 'release v2.0.0', title: 'What is a Release?',
      topicId: 'ch-31', topicNumber: '31', topicTitle: 'Release Management',
      subtitle: 'A formal milestone package of software delivered to users or deployment environments',
      whatIsIt: 'A release bundles tested software with release notes, changelogs, and binary artifacts bound to a Git tag.',
    }),
    buildGitConcept({
      id: 'c-31-02', subChapterNumber: '31.2', command: 'v2.1.4', title: 'Version Numbers',
      topicId: 'ch-31', topicNumber: '31', topicTitle: 'Release Management',
      subtitle: 'Communicating change impact and compatibility expectations to consumers',
      whatIsIt: 'Standardized version numbering schema helping developers understand whether an upgrade is safe.',
    }),
    buildGitConcept({
      id: 'c-31-03', subChapterNumber: '31.3', command: 'MAJOR.MINOR.PATCH', title: 'Semantic Versioning',
      topicId: 'ch-31', topicNumber: '31', topicTitle: 'Release Management',
      subtitle: 'SemVer 2.0.0 rules: Major (breaking API), Minor (new feature), Patch (bugfix)',
      badges: ['Standard'],
      whatIsIt: 'The universal contract between software developers and API consumers.',
    }),
    buildGitConcept({
      id: 'c-31-04', subChapterNumber: '31.4', command: 'git tag -a v1.5.0 -m "Release v1.5.0"', title: 'Git Tags',
      topicId: 'ch-31', topicNumber: '31', topicTitle: 'Release Management',
      subtitle: 'The cryptographic anchor in Git history marking the exact commit of a release',
      syntaxCode: 'git tag -a v1.0.0 -m "Release 1.0.0" && git push origin v1.0.0',
    }),
    buildGitConcept({
      id: 'c-31-05', subChapterNumber: '31.5', command: 'Release Notes (Features, Fixes, Breaking)', title: 'Release Notes',
      topicId: 'ch-31', topicNumber: '31', topicTitle: 'Release Management',
      subtitle: 'Human-readable documentation highlighting key user-facing improvements and migration guides',
      whatIsIt: 'Informs users and API consumers what changed, how to upgrade, and any deprecation notices.',
    }),
    buildGitConcept({
      id: 'c-31-06', subChapterNumber: '31.6', command: 'cat CHANGELOG.md', title: 'Changelog',
      topicId: 'ch-31', topicNumber: '31', topicTitle: 'Release Management',
      subtitle: 'Keep a Changelog standard: Added, Changed, Deprecated, Removed, Fixed, Security',
      whatIsIt: 'Chronological markdown document maintained in the root of the repository for developer transparency.',
    }),
    buildGitConcept({
      id: 'c-31-07', subChapterNumber: '31.7', command: 'gh release create v1.0.0', title: 'GitHub Releases',
      topicId: 'ch-31', topicNumber: '31', topicTitle: 'Release Management',
      subtitle: 'Publishing releases with attached binary assets, zip archives, and automated release notes',
      syntaxCode: 'gh release create v1.0.0 --generate-notes',
    }),
    buildGitConcept({
      id: 'c-31-08', subChapterNumber: '31.8', command: 'release-pipeline.yml', title: 'Release Pipelines',
      topicId: 'ch-31', topicNumber: '31', topicTitle: 'Release Management',
      subtitle: 'Automated CI/CD workflows triggered on git tag push to compile and publish artifacts',
      syntaxCode: 'on:\n  push:\n    tags: ["v*"]',
    }),
    buildGitConcept({
      id: 'c-31-09', subChapterNumber: '31.9', command: 'binaries, packages, container images', title: 'Release Artifacts',
      topicId: 'ch-31', topicNumber: '31', topicTitle: 'Release Management',
      subtitle: 'Packaging final deployable bundles, npm packages, PyPI wheels, and container digests',
      whatIsIt: 'The certified deliverables produced by the release pipeline.',
    }),
    buildGitConcept({
      id: 'c-31-10', subChapterNumber: '31.10', command: 'npx semantic-release', title: 'Automated Releases',
      topicId: 'ch-31', topicNumber: '31', topicTitle: 'Release Management',
      subtitle: 'Fully automated versioning, changelog generation, and publishing from Conventional Commits',
      badges: ['Senior Automation'],
      whatIsIt: 'Semantic-release parses commit history, bumps version, creates Git tag, updates changelog, and publishes with zero manual steps.',
    }),
    buildGitConcept({
      id: 'c-31-11', subChapterNumber: '31.11', command: 'git switch -c hotfix/v1.0.1 v1.0.0', title: 'Hotfix Releases',
      topicId: 'ch-31', topicNumber: '31', topicTitle: 'Release Management',
      subtitle: 'Fast-track emergency patch workflow for critical production incidents',
      whatIsIt: 'Branching directly from the production release tag, applying minimal patch, and releasing v1.0.1 immediately.',
    }),
  ],
};

// ============================================================================
// CHAPTER 32: CI/CD TROUBLESHOOTING (32.1 to 32.14)
// ============================================================================
export const CHAPTER_32: AcademyTopic = {
  id: 'ch-32',
  number: '32',
  title: 'CI/CD Troubleshooting',
  description: 'Senior troubleshooting doctrine: diagnosing pipeline failures, build errors, test timeouts, permission issues, missing secrets, Docker build breaks, and health check crashes.',
  iconName: 'AlertTriangle',
  conceptCount: 14,
  concepts: [
    buildGitConcept({
      id: 'c-32-01', subChapterNumber: '32.1', command: 'gh run view --log-failed', title: 'Pipeline Failed',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'Systematic triage methodology: which stage failed, why did it fail, and how to reproduce locally',
      badges: ['Triage Doctrine'],
      whatIsIt: 'Step 1: Identify the exact step with non-zero exit code. Step 2: Read stdout/stderr. Step 3: Reproduce in clean local container.',
    }),
    buildGitConcept({
      id: 'c-32-02', subChapterNumber: '32.2', command: 'tsc / webpack error', title: 'Build Failed',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'Debugging TypeScript compiler errors, missing asset imports, and bundler syntax breaks',
      whatIsIt: 'Common cause: local machine had cached global types or lax compiler settings that CI\'s strict mode rejected.',
    }),
    buildGitConcept({
      id: 'c-32-03', subChapterNumber: '32.3', command: 'Jest / Vitest assertion failure', title: 'Test Failed',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'Isolating regression assertions, unhandled promise rejections, and test timeouts in CI',
      whatIsIt: 'Check timezone differences (UTC in CI vs local timezone) and timing differences on slower CI runner hardware.',
    }),
    buildGitConcept({
      id: 'c-32-04', subChapterNumber: '32.4', command: 'npm ERR! 404 Not Found', title: 'Dependency Failure',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'Unpinned dependency breakages, npm lockfile mismatches, and private registry auth errors',
      whatIsIt: 'Always use `npm ci` with a checked-in `package-lock.json` to prevent downstream dependency updates from breaking builds.',
    }),
    buildGitConcept({
      id: 'c-32-05', subChapterNumber: '32.5', command: 'Resource not accessible by integration (403)', title: 'Permission Failure',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'Resolving `GITHUB_TOKEN` permission errors by adding explicit `permissions:` block in YAML',
      whatIsIt: 'GitHub Actions default tokens have read-only permissions on newer repos. Add explicit permissions in workflow YAML.',
    }),
    buildGitConcept({
      id: 'c-32-06', subChapterNumber: '32.6', command: 'secret is empty string', title: 'Secret Missing',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'Diagnosing missing repository secrets, fork secret restrictions, and typo mismatches',
      whatIsIt: 'GitHub intentionally does NOT pass secrets to workflows triggered by pull requests from public forks to prevent credential theft.',
    }),
    buildGitConcept({
      id: 'c-32-07', subChapterNumber: '32.7', command: 'undefined env var', title: 'Wrong Environment Variable',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'Debugging typos in env variable keys, scope boundaries, and missing fallback defaults',
      whatIsIt: 'Workflow-level vs job-level vs step-level env scoping errors: verify where the variable was defined.',
    }),
    buildGitConcept({
      id: 'c-32-08', subChapterNumber: '32.8', command: 'ERROR [internal] load metadata', title: 'Docker Build Failure',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'Triage for Dockerfile step crashes: missing files, architecture mismatches, and out-of-disk errors',
      whatIsIt: 'Check `.dockerignore` to ensure necessary source files were not accidentally excluded from the build context.',
    }),
    buildGitConcept({
      id: 'c-32-09', subChapterNumber: '32.9', command: 'denied: requested access to the resource is denied', title: 'Registry Authentication Failure',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'Fixing `docker login` failures with GHCR and Docker Hub in CI runners',
      whatIsIt: 'Ensure package permissions (`packages: write`) are granted to `GITHUB_TOKEN` in the workflow file.',
    }),
    buildGitConcept({
      id: 'c-32-10', subChapterNumber: '32.10', command: 'deploy step exit 1', title: 'Deployment Failure',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'Diagnosing failed cloud API calls, bad IAM roles, and target cluster connection timeouts',
      whatIsIt: 'Check cloud provider IAM role trust policies and OIDC audience claims.',
    }),
    buildGitConcept({
      id: 'c-32-11', subChapterNumber: '32.11', command: 'CrashLoopBackOff / 502 Bad Gateway', title: 'Health Check Failure',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'Application crashes immediately on boot: missing DB migration, wrong port, unhandled exception',
      whatIsIt: 'The container started but failed HTTP health check within the timeout window, triggering orchestrator restart.',
    }),
    buildGitConcept({
      id: 'c-32-12', subChapterNumber: '32.12', command: 'roll back to previous version', title: 'Rollback',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'The fastest recovery during production incident: restore previous verified green release',
      whatIsIt: 'Never try to "fix-forward" under pressure during an active customer outage. Roll back first; debug safely later.',
    }),
    buildGitConcept({
      id: 'c-32-13', subChapterNumber: '32.13', command: 'ACTIONS_RUNNER_DEBUG: true', title: 'Reading Pipeline Logs',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'Enabling debug logging (`ACTIONS_STEP_DEBUG: true`) and analyzing raw console logs',
      whatIsIt: 'Setting repository secret `ACTIONS_STEP_DEBUG` to `true` reveals verbose internal shell tracing.',
    }),
    buildGitConcept({
      id: 'c-32-14', subChapterNumber: '32.14', command: 'tmate / ssh to runner', title: 'Debugging Failed Jobs',
      topicId: 'ch-32', topicNumber: '32', topicTitle: 'CI/CD Troubleshooting',
      subtitle: 'Using `action-tmate` to SSH directly into a live failing GitHub Actions runner VM',
      badges: ['Senior Superpower'],
      whatIsIt: 'Pauses the failing job and prints an SSH connection string so you can inspect disk and environment variables interactively.',
    }),
  ],
};

// ============================================================================
// CHAPTER 33: ADVANCED CI/CD (33.1 to 33.13)
// ============================================================================
export const CHAPTER_33: AcademyTopic = {
  id: 'ch-33',
  number: '33',
  title: 'Advanced CI/CD',
  description: 'Enterprise pipelines: DAGs, reusable workflows, monorepos, path filters, dynamic matrixes, composite actions, and parent/child pipelines.',
  iconName: 'GitFork',
  conceptCount: 13,
  concepts: [
    buildGitConcept({
      id: 'c-33-01', subChapterNumber: '33.1', command: 'parallel execution', title: 'Parallel Jobs',
      topicId: 'ch-33', topicNumber: '33', topicTitle: 'Advanced CI/CD',
      subtitle: 'Executing lint, test, security, and build concurrently to minimize wall-clock runtime',
      whatIsIt: 'Independent jobs run on separate runner machines simultaneously, reducing total pipeline duration.',
    }),
    buildGitConcept({
      id: 'c-33-02', subChapterNumber: '33.2', command: 'needs: [jobA, jobB]', title: 'Job Dependencies',
      topicId: 'ch-33', topicNumber: '33', topicTitle: 'Advanced CI/CD',
      subtitle: 'Modeling multi-job fan-out and fan-in workflows',
      whatIsIt: 'Fan-out: build once -> run 5 test jobs in parallel. Fan-in: wait for all 5 test jobs -> deploy once.',
    }),
    buildGitConcept({
      id: 'c-33-03', subChapterNumber: '33.3', command: 'DAG visualization', title: 'DAG Pipelines',
      topicId: 'ch-33', topicNumber: '33', topicTitle: 'Advanced CI/CD',
      subtitle: 'Directed Acyclic Graphs: optimizing execution path so fast tracks deploy without waiting for slow jobs',
      whatIsIt: 'Non-linear pipeline topologies where docs can deploy without waiting for backend integration test suites.',
    }),
    buildGitConcept({
      id: 'c-33-04', subChapterNumber: '33.4', command: 'workflow_call', title: 'Reusable Workflows',
      topicId: 'ch-33', topicNumber: '33', topicTitle: 'Advanced CI/CD',
      subtitle: 'Centralizing organization-wide security, compliance, and deployment pipelines',
      whatIsIt: 'Child repositories call shared centralized workflows with inputs and secrets, guaranteeing company standards.',
    }),
    buildGitConcept({
      id: 'c-33-05', subChapterNumber: '33.5', command: 'using: composite', title: 'Composite Actions',
      topicId: 'ch-33', topicNumber: '33', topicTitle: 'Advanced CI/CD',
      subtitle: 'Packaging recurring multi-step shell patterns into clean custom actions',
      whatIsIt: 'Combines multiple run steps into a single reusable action without writing JavaScript.',
    }),
    buildGitConcept({
      id: 'c-33-06', subChapterNumber: '33.6', command: 'monorepo CI', title: 'Monorepos',
      topicId: 'ch-33', topicNumber: '33', topicTitle: 'Advanced CI/CD',
      subtitle: 'Managing CI across 50 packages in one repository without rebuilding unaffected apps',
      whatIsIt: 'Integrating Turborepo, Nx, or Bazel with GitHub Actions for incremental caching and task hashing.',
    }),
    buildGitConcept({
      id: 'c-33-07', subChapterNumber: '33.7', command: 'paths: ["services/auth/**"]', title: 'Path-Based Workflows',
      topicId: 'ch-33', topicNumber: '33', topicTitle: 'Advanced CI/CD',
      subtitle: 'Triggering workflows only when specific subdirectories or files are modified',
      syntaxCode: 'on:\n  push:\n    paths:\n      - "apps/web/**"',
    }),
    buildGitConcept({
      id: 'c-33-08', subChapterNumber: '33.8', command: 'if: github.ref == \'refs/heads/main\'', title: 'Conditional Jobs',
      topicId: 'ch-33', topicNumber: '33', topicTitle: 'Advanced CI/CD',
      subtitle: 'Executing steps or jobs only when branch, author, or commit message conditions are met',
      syntaxCode: 'if: github.event_name == \'push\' && github.ref == \'refs/heads/main\'',
    }),
    buildGitConcept({
      id: 'c-33-09', subChapterNumber: '33.9', command: 'fromJSON(needs.setup.outputs.matrix)', title: 'Dynamic Matrices',
      topicId: 'ch-33', topicNumber: '33', topicTitle: 'Advanced CI/CD',
      subtitle: 'Generating matrix jobs on the fly based on which packages were modified in the commit diff',
      badges: ['Senior Skill'],
      whatIsIt: 'A setup job determines changed packages and outputs a JSON array consumed by the downstream test matrix.',
    }),
    buildGitConcept({
      id: 'c-33-10', subChapterNumber: '33.10', command: 'parent / child workflows', title: 'Parent/Child Pipelines',
      topicId: 'ch-33', topicNumber: '33', topicTitle: 'Advanced CI/CD',
      subtitle: 'Orchestrating multi-repository coordination and downstream trigger events',
      whatIsIt: 'A core platform build triggers downstream microservice compatibility test suites across separate repos.',
    }),
    buildGitConcept({
      id: 'c-33-11', subChapterNumber: '33.11', command: 'repository_dispatch', title: 'Multi-Project Pipelines',
      topicId: 'ch-33', topicNumber: '33', topicTitle: 'Advanced CI/CD',
      subtitle: 'Triggering workflows across separate repositories using `repository_dispatch` webhooks',
      syntaxCode: 'on:\n  repository_dispatch:\n    types: [deploy-event]',
    }),
    buildGitConcept({
      id: 'c-33-12', subChapterNumber: '33.12', command: 'deployment gates', title: 'Deployment Gates',
      topicId: 'ch-33', topicNumber: '33', topicTitle: 'Advanced CI/CD',
      subtitle: 'Automated verification gates: canary error rates, Datadog alerts, and performance metrics',
      whatIsIt: 'Halts deployment if production latency spikes above 200ms or 5xx errors exceed 0.1% during canary rollout.',
    }),
    buildGitConcept({
      id: 'c-33-13', subChapterNumber: '33.13', command: 'environment protection rules', title: 'Environment Protection',
      topicId: 'ch-33', topicNumber: '33', topicTitle: 'Advanced CI/CD',
      subtitle: 'Restricting production environment deployments to certified release tags and approved teams',
      whatIsIt: 'Protects the live production environment from rogue runs or experimental branch builds.',
    }),
  ],
};

// ============================================================================
// CHAPTER 34: PRODUCTION CI/CD (34.1 to 34.12)
// ============================================================================
export const CHAPTER_34: AcademyTopic = {
  id: 'ch-34',
  number: '34',
  title: 'Production CI/CD',
  description: 'Enterprise production grade CI/CD: architecture, branch protection, security gates, artifact promotion, staging verification, monitoring, and post-deployment validation.',
  iconName: 'Shield',
  conceptCount: 12,
  concepts: [
    buildGitConcept({
      id: 'c-34-01', subChapterNumber: '34.1', command: 'production architecture', title: 'Production Pipeline Architecture',
      topicId: 'ch-34', topicNumber: '34', topicTitle: 'Production CI/CD',
      subtitle: 'The gold standard: PR CI -> Security Scan -> Build Once -> Staging -> Approvals -> Prod -> Smoke Test',
      badges: ['Mastery Core'],
      whatIsIt: 'The end-to-end production architecture connecting every developer commit to automated, reliable delivery.',
    }),
    buildGitConcept({
      id: 'c-34-02', subChapterNumber: '34.2', command: 'branch protection: main', title: 'Branch Protection',
      topicId: 'ch-34', topicNumber: '34', topicTitle: 'Production CI/CD',
      subtitle: 'Locking down main: 2 required reviews, CODEOWNERS approval, signed commits, green CI',
      whatIsIt: 'Prevents direct pushes and guarantees every production change went through thorough peer audit.',
    }),
    buildGitConcept({
      id: 'c-34-03', subChapterNumber: '34.3', command: 'required checks: lint, test, sec', title: 'Required Checks',
      topicId: 'ch-34', topicNumber: '34', topicTitle: 'Production CI/CD',
      subtitle: 'Strict status check enforcement: failing 1 unit test blocks the entire release',
      whatIsIt: 'Guarantees that broken code can never be merged by accident.',
    }),
    buildGitConcept({
      id: 'c-34-04', subChapterNumber: '34.4', command: 'security gate: 0 critical CVEs', title: 'Security Gates',
      topicId: 'ch-34', topicNumber: '34', topicTitle: 'Production CI/CD',
      subtitle: 'Automated blocking of releases containing vulnerabilities, secrets, or license violations',
      whatIsIt: 'Automates security compliance: no image ships with high/critical CVEs.',
    }),
    buildGitConcept({
      id: 'c-34-05', subChapterNumber: '34.5', command: 'promote image digest', title: 'Artifact Promotion',
      topicId: 'ch-34', topicNumber: '34', topicTitle: 'Production CI/CD',
      subtitle: 'Certifying and retagging the exact container digest validated in staging',
      whatIsIt: 'Ensures zero binary differences between what was tested in staging and what serves production traffic.',
    }),
    buildGitConcept({
      id: 'c-34-06', subChapterNumber: '34.6', command: 'e2e smoke tests on staging', title: 'Staging Validation',
      topicId: 'ch-34', topicNumber: '34', topicTitle: 'Production CI/CD',
      subtitle: 'Automated end-to-end user flows and migration verification on pre-prod infrastructure',
      whatIsIt: 'Verifies database migrations ran cleanly and external API integrations succeed.',
    }),
    buildGitConcept({
      id: 'c-34-07', subChapterNumber: '34.7', command: 'approval gate', title: 'Production Approval',
      topicId: 'ch-34', topicNumber: '34', topicTitle: 'Production CI/CD',
      subtitle: 'Formal change management approval by Release Manager or On-Call Lead',
      whatIsIt: 'Ensures production releases happen during agreed maintenance windows or customer low-traffic periods.',
    }),
    buildGitConcept({
      id: 'c-34-08', subChapterNumber: '34.8', command: 'cd workflow', title: 'Automated Deployment',
      topicId: 'ch-34', topicNumber: '34', topicTitle: 'Production CI/CD',
      subtitle: 'Declarative GitOps continuous deployment via ArgoCD, Flux, or cloud deployment pipelines',
      whatIsIt: 'Git is the single source of truth: updating image tag in git automatically rolls out to Kubernetes.',
    }),
    buildGitConcept({
      id: 'c-34-09', subChapterNumber: '34.9', command: 'datadog / prometheus metrics', title: 'Monitoring Deployment',
      topicId: 'ch-34', topicNumber: '34', topicTitle: 'Production CI/CD',
      subtitle: 'Observing HTTP 5xx error rates, P99 response latencies, and CPU metrics during rollout',
      whatIsIt: 'Real-time telemetry alerting the deployment engine to anomalies within 30 seconds of rollout.',
    }),
    buildGitConcept({
      id: 'c-34-10', subChapterNumber: '34.10', command: 'automated canary rollback', title: 'Rollback',
      topicId: 'ch-34', topicNumber: '34', topicTitle: 'Production CI/CD',
      subtitle: 'Automated circuit breaker: instant traffic diversion back to previous stable release',
      whatIsIt: 'If latency spikes >500ms or 5xx errors exceed 0.5%, traffic automatically reverts to previous version.',
    }),
    buildGitConcept({
      id: 'c-34-11', subChapterNumber: '34.11', command: 'incident response runbook', title: 'Incident Response',
      topicId: 'ch-34', topicNumber: '34', topicTitle: 'Production CI/CD',
      subtitle: 'Senior engineer protocol: mitigate customer impact first, investigate root cause second',
      whatIsIt: 'Roles: Incident Commander, Communications Lead, Operations Lead. Post-mortem blameless reviews.',
    }),
    buildGitConcept({
      id: 'c-34-12', subChapterNumber: '34.12', command: 'curl -f https://app.com/healthz', title: 'Post-Deployment Verification',
      topicId: 'ch-34', topicNumber: '34', topicTitle: 'Production CI/CD',
      subtitle: 'Synthetic user checks, SSL certificate verification, and monitoring confirmation',
      whatIsIt: 'Closing the deployment loop: verifying live customer traffic flows smoothly before declaring success.',
    }),
  ],
};

export const PACK_06_CHAPTERS: AcademyTopic[] = [
  CHAPTER_29,
  CHAPTER_30,
  CHAPTER_31,
  CHAPTER_32,
  CHAPTER_33,
  CHAPTER_34,
];
