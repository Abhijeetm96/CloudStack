import { buildCommitForgeConcept } from '../conceptFactory';
import { AcademyTopic } from '../unifiedAcademyData';

// ============================================================================
// CHAPTER 25: CI/CD WITH DOCKER (25.1 to 25.12)
// ============================================================================
export const CHAPTER_25: AcademyTopic = {
  id: 'ch-25',
  number: '25',
  title: 'CI/CD with Docker',
  description: 'Containerized CI/CD: multi-stage Dockerfiles, caching layers with Buildx, vulnerability scanning with Trivy, and pushing to registries.',
  iconName: 'Boxes',
  conceptCount: 12,
  concepts: [
    buildCommitForgeConcept({
      id: 'c-25-01', subChapterNumber: '25.1', command: 'docker build', title: 'Why Containers in CI/CD?',
      topicId: 'ch-25', topicNumber: '25', topicTitle: 'CI/CD with Docker',
      subtitle: 'Eliminating environment disparity: the exact image tested in CI runs in production',
      badges: ['DevOps Standard'],
      whatIsIt: 'Containers bundle code, runtime, system libraries, and configs into one immutable artifact, solving "it worked in CI but broke on the server".',
    }),
    buildCommitForgeConcept({
      id: 'c-25-02', subChapterNumber: '25.2', command: 'docker build -t app:v1 .', title: 'Docker Build',
      topicId: 'ch-25', topicNumber: '25', topicTitle: 'CI/CD with Docker',
      subtitle: 'Compiling Dockerfiles into immutable OCI container images inside CI pipelines',
      syntaxCode: 'docker build -t my-app:${{ github.sha }} .',
    }),
    buildCommitForgeConcept({
      id: 'c-25-03', subChapterNumber: '25.3', command: 'cat Dockerfile', title: 'Dockerfile',
      topicId: 'ch-25', topicNumber: '25', topicTitle: 'CI/CD with Docker',
      subtitle: 'Best practices for CI Dockerfiles: non-root users, .dockerignore, and layer ordering',
      whatIsIt: 'Structuring instructions (FROM, WORKDIR, COPY package*.json, RUN npm ci, COPY ., CMD) to maximize layer caching.',
    }),
    buildCommitForgeConcept({
      id: 'c-25-04', subChapterNumber: '25.4', command: 'docker buildx build', title: 'Build Image',
      topicId: 'ch-25', topicNumber: '25', topicTitle: 'CI/CD with Docker',
      subtitle: 'Leveraging Docker Buildx and BuildKit for parallel step execution',
      syntaxCode: 'docker buildx build --platform linux/amd64,linux/arm64 -t app:latest .',
    }),
    buildCommitForgeConcept({
      id: 'c-25-05', subChapterNumber: '25.5', command: 'docker tag app:latest ghcr.io/org/app:1.2.0', title: 'Tag Image',
      topicId: 'ch-25', topicNumber: '25', topicTitle: 'CI/CD with Docker',
      subtitle: 'Applying semantic tags, commit SHAs, and branch names to container images',
      syntaxCode: 'docker tag app ghcr.io/org/app:${{ github.sha }}',
    }),
    buildCommitForgeConcept({
      id: 'c-25-06', subChapterNumber: '25.6', command: 'docker login ghcr.io', title: 'Registry',
      topicId: 'ch-25', topicNumber: '25', topicTitle: 'CI/CD with Docker',
      subtitle: 'Authenticating CI runners to remote container registries (GHCR, Docker Hub, ECR)',
      whatIsIt: 'Using `${{ secrets.GITHUB_TOKEN }}` to authenticate silently and push built images.',
    }),
    buildCommitForgeConcept({
      id: 'c-25-07', subChapterNumber: '25.7', command: 'docker push ghcr.io/org/app:v1', title: 'Push Image',
      topicId: 'ch-25', topicNumber: '25', topicTitle: 'CI/CD with Docker',
      subtitle: 'Uploading image layers to registry storage for Kubernetes or ECS deployment',
      syntaxCode: 'docker push ghcr.io/org/app:v1',
    }),
    buildCommitForgeConcept({
      id: 'c-25-08', subChapterNumber: '25.8', command: 'trivy image my-app:v1', title: 'Image Scanning',
      topicId: 'ch-25', topicNumber: '25', topicTitle: 'CI/CD with Docker',
      subtitle: 'Auditing OS packages and dependencies for CVE vulnerabilities in CI',
      badges: ['Security Core'],
      whatIsIt: 'Running Trivy or Grype in CI to reject container images containing critical unpatched vulnerabilities.',
      syntaxCode: 'uses: aquasecurity/trivy-action@master\nwith:\n  image-ref: my-app:${{ github.sha }}',
    }),
    buildCommitForgeConcept({
      id: 'c-25-09', subChapterNumber: '25.9', command: 'docker run --rm my-app npm test', title: 'Container Tests',
      topicId: 'ch-25', topicNumber: '25', topicTitle: 'CI/CD with Docker',
      subtitle: 'Running test suites directly inside the generated production container',
      whatIsIt: 'Validates that the image starts cleanly and passes all health assertions before publishing to registries.',
    }),
    buildCommitForgeConcept({
      id: 'c-25-10', subChapterNumber: '25.10', command: 'cache-from: type=gha', title: 'Build Cache',
      topicId: 'ch-25', topicNumber: '25', topicTitle: 'CI/CD with Docker',
      subtitle: 'Using GitHub Actions cache backend (`type=gha`) for ultra-fast Docker layer caching',
      syntaxCode: 'cache-from: type=gha\ncache-to: type=gha,mode=max',
    }),
    buildCommitForgeConcept({
      id: 'c-25-11', subChapterNumber: '25.11', command: 'FROM node:20 AS builder ... FROM alpine', title: 'Multi-Stage Builds',
      topicId: 'ch-25', topicNumber: '25', topicTitle: 'CI/CD with Docker',
      subtitle: 'Shrinking production image sizes by 90%: separating build compilers from slim runtimes',
      badges: ['Senior Skill'],
      whatIsIt: 'Compile in a heavy build stage; copy only the compiled binary into a minimal distroless or Alpine runtime.',
    }),
    buildCommitForgeConcept({
      id: 'c-25-12', subChapterNumber: '25.12', command: 'docker/build-push-action@v5', title: 'GitHub Actions + Docker',
      topicId: 'ch-25', topicNumber: '25', topicTitle: 'CI/CD with Docker',
      subtitle: 'The official Docker build-push-action workflow blueprint',
      syntaxCode: 'uses: docker/build-push-action@v5\nwith:\n  push: true\n  tags: ghcr.io/org/app:latest',
    }),
  ],
};

// ============================================================================
// CHAPTER 26: ARTIFACTS & CONTAINER REGISTRIES (26.1 to 26.14)
// ============================================================================
export const CHAPTER_26: AcademyTopic = {
  id: 'ch-26',
  number: '26',
  title: 'Artifacts & Container Registries',
  description: 'Manage build artifacts, binaries, Docker images, GitHub Container Registry (ghcr.io), semantic versioning, immutable tags, and promotion pipelines.',
  iconName: 'Package',
  conceptCount: 14,
  concepts: [
    buildCommitForgeConcept({
      id: 'c-26-01', subChapterNumber: '26.1', command: 'artifact', title: 'What is an Artifact?',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'The compiled, packaged, immutable output of a CI pipeline ready for deployment',
      whatIsIt: 'An artifact is a deployable package generated by CI: a Docker image, tarball, Go binary, or npm package.',
    }),
    buildCommitForgeConcept({
      id: 'c-26-02', subChapterNumber: '26.2', command: 'actions/upload-artifact@v4', title: 'Build Artifacts',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'Retaining and sharing build results across CI stages and release downloads',
      whatIsIt: 'Artifacts are uploaded to GitHub cloud storage and can be retained for 1 to 90 days.',
    }),
    buildCommitForgeConcept({
      id: 'c-26-03', subChapterNumber: '26.3', command: 'go build -o server', title: 'Binary Artifacts',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'Self-contained executable binaries (Go, Rust, C++) with zero external runtime dependencies',
      whatIsIt: 'Compiling cross-platform static binaries uploaded to GitHub Releases for distribution.',
    }),
    buildCommitForgeConcept({
      id: 'c-26-04', subChapterNumber: '26.4', command: 'zip -r build.zip dist/', title: 'ZIP Artifacts',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'Compressed distribution bundles used for AWS Lambda, Azure App Service, and static hosting',
      whatIsIt: 'Packaging web bundles into `.zip` archives for serverless function deployments.',
    }),
    buildCommitForgeConcept({
      id: 'c-26-05', subChapterNumber: '26.5', command: 'docker images', title: 'Docker Images',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'Layered OCI image specifications containing root filesystem and entrypoint metadata',
      whatIsIt: 'The standard container artifact format understood by Docker, Kubernetes, Podman, and Nomad.',
    }),
    buildCommitForgeConcept({
      id: 'c-26-06', subChapterNumber: '26.6', command: 'registry.hub.docker.com', title: 'Package Registries',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'Centralized servers storing, versioning, and distributing software packages and images',
      whatIsIt: 'Registries store images securely, provide rate limiting, access control, and vulnerability scanning.',
    }),
    buildCommitForgeConcept({
      id: 'c-26-07', subChapterNumber: '26.7', command: 'hub.docker.com', title: 'Docker Hub',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'The world\'s largest public container registry and base image repository',
      whatIsIt: 'Hosts official images for Ubuntu, Node, Python, Redis, Postgres, and millions of community images.',
    }),
    buildCommitForgeConcept({
      id: 'c-26-08', subChapterNumber: '26.8', command: 'ghcr.io/owner/repo:v1', title: 'GitHub Container Registry',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'Seamless GitHub integration with zero external credentials needed via GITHUB_TOKEN',
      badges: ['Modern Practice'],
      whatIsIt: '`ghcr.io` integrates directly with GitHub permissions: push images using GITHUB_TOKEN without third-party Docker Hub accounts.',
    }),
    buildCommitForgeConcept({
      id: 'c-26-09', subChapterNumber: '26.9', command: 'ghcr.io/app:v1.2.3', title: 'Image Tags',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'Pointers to specific manifest digests: versions, branch names, and commit hashes',
      whatIsIt: 'Image tags identify specific builds. Remember: tags are mutable pointers; digest SHAs are immutable.',
    }),
    buildCommitForgeConcept({
      id: 'c-26-10', subChapterNumber: '26.10', command: 'MAJOR.MINOR.PATCH', title: 'Semantic Versioning',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'The SemVer specification: Breaking changes (Major), Features (Minor), Fixes (Patch)',
      whatIsIt: 'Guarantees contract compatibility: bumping Major indicates breaking API changes.',
    }),
    buildCommitForgeConcept({
      id: 'c-26-11', subChapterNumber: '26.11', command: 'image:v1.2.0 (never overwrite)', title: 'Immutable Versions',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'Why production images must never have their tags overwritten after release',
      whatIsIt: 'If you overwrite `v1.2.0`, Kubernetes rollbacks break and debugging crashes becomes impossible.',
    }),
    buildCommitForgeConcept({
      id: 'c-26-12', subChapterNumber: '26.12', command: ':latest (danger in prod)', title: 'latest',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'Why `:latest` is dangerous in production and how it causes silent deployment failures',
      badges: ['Anti-Pattern in Prod'],
      whatIsIt: '`:latest` is not a magic keyword; it is simply a convention tag. Different servers pulling `:latest` get different images if it was updated.',
    }),
    buildCommitForgeConcept({
      id: 'c-26-13', subChapterNumber: '26.13', command: 'app@sha256:4b9a1...', title: 'SHA Tags',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'Pinning images by cryptographic content digest for 100% reproducible deployments',
      syntaxCode: 'image: ghcr.io/org/app:sha-${{ github.sha }}',
    }),
    buildCommitForgeConcept({
      id: 'c-26-14', subChapterNumber: '26.14', command: 'promote artifact: dev -> staging -> prod', title: 'Artifact Promotion',
      topicId: 'ch-26', topicNumber: '26', topicTitle: 'Artifacts & Container Registries',
      subtitle: 'Promoting the exact binary that passed staging into production without recompiling',
      badges: ['Senior Architecture'],
      whatIsIt: 'Golden rule: Build once, promote anywhere. Never recompile code for production; promote the tested staging artifact.',
    }),
  ],
};

// ============================================================================
// CHAPTER 27: CI/CD SECURITY (27.1 to 27.15)
// ============================================================================
export const CHAPTER_27: AcademyTopic = {
  id: 'ch-27',
  number: '27',
  title: 'CI/CD Security',
  description: 'Harden your pipelines: secret management, keyless OIDC authentication, least-privilege token permissions, SAST, DAST, and supply chain security.',
  iconName: 'ShieldCheck',
  conceptCount: 15,
  concepts: [
    buildCommitForgeConcept({
      id: 'c-27-01', subChapterNumber: '27.1', command: 'secrets.API_KEY', title: 'Secrets',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Sensitive credentials: API keys, database passwords, private keys, and auth tokens',
      whatIsIt: 'Secrets must be injected into CI at runtime and never committed into Git repositories or printed in log output.',
    }),
    buildCommitForgeConcept({
      id: 'c-27-02', subChapterNumber: '27.2', command: 'env: { VAR: "value" }', title: 'Environment Variables',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Non-sensitive configuration parameters (ports, URLs, feature flags)',
      whatIsIt: 'Distinguishing public environment variables from confidential secrets.',
    }),
    buildCommitForgeConcept({
      id: 'c-27-03', subChapterNumber: '27.3', command: 'vault / gsm / aws-secrets', title: 'Secret Management',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Centralizing secret rotation using HashiCorp Vault, AWS Secrets Manager, or Doppler',
      whatIsIt: 'Enterprise pipelines pull ephemeral credentials on the fly from dedicated secret managers rather than static strings.',
    }),
    buildCommitForgeConcept({
      id: 'c-27-04', subChapterNumber: '27.4', command: '${{ secrets.DATABASE_URL }}', title: 'GitHub Secrets',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Repository and organization encrypted secrets using Libsodium public-key cryptography',
      whatIsIt: 'GitHub encrypts secrets before saving. Once saved, they can only be read by Actions workflows, never by users.',
    }),
    buildCommitForgeConcept({
      id: 'c-27-05', subChapterNumber: '27.5', command: 'environment: production', title: 'Environment Secrets',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Restricting access to production credentials until manual reviewer approval is granted',
      whatIsIt: 'Secrets bound to an Environment are invisible until all environment protection rules (approvals, branch filters) pass.',
    }),
    buildCommitForgeConcept({
      id: 'c-27-06', subChapterNumber: '27.6', command: 'permissions: id-token: write', title: 'OIDC',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'OpenID Connect: Keyless authentication with AWS, Azure, and GCP without long-lived keys',
      badges: ['Senior Security', 'Modern Standard'],
      whatIsIt: 'Eliminates permanent cloud credentials. GitHub issues a short-lived cryptographically signed JWT token that AWS validates directly.',
      syntaxCode: 'permissions:\n  id-token: write\n  contents: read',
    }),
    buildCommitForgeConcept({
      id: 'c-27-07', subChapterNumber: '27.7', command: 'permissions: contents: read', title: 'Least Privilege',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Restricting runner permissions to only what is strictly required to execute the job',
      whatIsIt: 'Default to read-only access. Never grant write permissions across the whole workflow when only one step needs it.',
    }),
    buildCommitForgeConcept({
      id: 'c-27-08', subChapterNumber: '27.8', command: 'permissions: { packages: write }', title: 'Token Permissions',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Configuring fine-grained scopes on `GITHUB_TOKEN` (contents, pull-requests, issues, packages)',
      syntaxCode: 'permissions:\n  contents: read\n  packages: write',
    }),
    buildCommitForgeConcept({
      id: 'c-27-09', subChapterNumber: '27.9', command: 'npm audit', title: 'Dependency Security',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Auditing third-party libraries for known vulnerabilities, backdoors, and malware',
      whatIsIt: 'Fails CI builds if open-source dependencies have published critical CVE vulnerabilities.',
      syntaxCode: 'run: npm audit --audit-level=high',
    }),
    buildCommitForgeConcept({
      id: 'c-27-10', subChapterNumber: '27.10', command: 'gitleaks detect', title: 'Secret Scanning',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Preventing credential leaks using regex pattern matching and entropy analysis in CI',
      whatIsIt: 'Scans every commit diff for AWS keys, private SSH keys, and GitHub tokens before merging.',
      syntaxCode: 'uses: gitleaks/gitleaks-action@v2',
    }),
    buildCommitForgeConcept({
      id: 'c-27-11', subChapterNumber: '27.11', command: 'dependabot.yml', title: 'Dependency Scanning',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Automated Dependabot alerts and automated Pull Requests with security version patches',
      whatIsIt: 'GitHub continuously monitors dependencies against the Advisory Database and opens automated PRs to patch security flaws.',
    }),
    buildCommitForgeConcept({
      id: 'c-27-12', subChapterNumber: '27.12', command: 'codeql-action', title: 'SAST',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Static Application Security Testing: analyzing source code for SQLi, XSS, and buffer overflows',
      whatIsIt: 'Static analysis (e.g. GitHub CodeQL, Semgrep) scans AST syntax trees to detect security flaws without running the app.',
      syntaxCode: 'uses: github/codeql-action/analyze@v3',
    }),
    buildCommitForgeConcept({
      id: 'c-27-13', subChapterNumber: '27.13', command: 'owasp/zap-action', title: 'DAST',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Dynamic Application Security Testing: attacking running staging endpoints with simulated exploits',
      whatIsIt: 'Fuzzes live web endpoints in staging with SQL injection payloads and malicious HTTP requests to verify defense.',
    }),
    buildCommitForgeConcept({
      id: 'c-27-14', subChapterNumber: '27.14', command: 'trivy fs .', title: 'Container Scanning',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Auditing base container OS layers (Debian, Alpine) and runtime libraries for CVEs',
      whatIsIt: 'Inspects installed RPM/DEB/APK packages in container images for known Common Vulnerabilities and Exposures.',
    }),
    buildCommitForgeConcept({
      id: 'c-27-15', subChapterNumber: '27.15', command: 'cosign sign / sbom', title: 'Supply Chain Security',
      topicId: 'ch-27', topicNumber: '27', topicTitle: 'CI/CD Security',
      subtitle: 'Cryptographic provenance: Software Bill of Materials (SBOM) and Sigstore Cosign image signing',
      badges: ['Zero Trust'],
      whatIsIt: 'Guarantees that images running in production were built by your CI pipeline and have not been tampered with.',
    }),
  ],
};

// ============================================================================
// CHAPTER 28: TESTING IN CI/CD (28.1 to 28.11)
// ============================================================================
export const CHAPTER_28: AcademyTopic = {
  id: 'ch-28',
  number: '28',
  title: 'Testing in CI/CD',
  description: 'The testing pyramid in automation: unit, integration, end-to-end, coverage enforcement, flaky test triage, parallelization, and required checks.',
  iconName: 'CheckCircle',
  conceptCount: 11,
  concepts: [
    buildCommitForgeConcept({
      id: 'c-28-01', subChapterNumber: '28.1', command: 'npm test', title: 'Unit Testing',
      topicId: 'ch-28', topicNumber: '28', topicTitle: 'Testing in CI/CD',
      subtitle: 'Fast, isolated assertions validating individual pure functions and business logic modules',
      whatIsIt: 'The base of the test pyramid: runs thousands of tests in seconds with zero network or database dependencies.',
    }),
    buildCommitForgeConcept({
      id: 'c-28-02', subChapterNumber: '28.2', command: 'npm run test:api', title: 'Integration Testing',
      topicId: 'ch-28', topicNumber: '28', topicTitle: 'Testing in CI/CD',
      subtitle: 'Verifying multiple components interacting together: API endpoints, databases, and caches',
      whatIsIt: 'Tests database queries, ORM migrations, and HTTP routing with real or ephemeral service containers.',
    }),
    buildCommitForgeConcept({
      id: 'c-28-03', subChapterNumber: '28.3', command: 'npx playwright test', title: 'End-to-End Testing',
      topicId: 'ch-28', topicNumber: '28', topicTitle: 'Testing in CI/CD',
      subtitle: 'Automating headless browser user flows (Playwright/Cypress) simulating real customer journeys',
      whatIsIt: 'Validates critical business funnels: user login -> add item to cart -> checkout -> payment success.',
    }),
    buildCommitForgeConcept({
      id: 'c-28-04', subChapterNumber: '28.4', command: 'vitest run --coverage', title: 'Test Coverage',
      topicId: 'ch-28', topicNumber: '28', topicTitle: 'Testing in CI/CD',
      subtitle: 'Calculating percentage of lines, branches, and functions exercised by automated tests',
      whatIsIt: 'Produces coverage metrics (LCOV) and visualizes untested branches in pull request reviews.',
    }),
    buildCommitForgeConcept({
      id: 'c-28-05', subChapterNumber: '28.5', command: 'dorny/test-reporter@v1', title: 'Test Reports',
      topicId: 'ch-28', topicNumber: '28', topicTitle: 'Testing in CI/CD',
      subtitle: 'Publishing JUnit XML test summaries directly into the GitHub PR Checks tab',
      whatIsIt: 'Displays failed assertions and stack traces directly on the Pull Request without digging through raw logs.',
    }),
    buildCommitForgeConcept({
      id: 'c-28-06', subChapterNumber: '28.6', command: 'retry flaky tests', title: 'Flaky Tests',
      topicId: 'ch-28', topicNumber: '28', topicTitle: 'Testing in CI/CD',
      subtitle: 'Diagnosing and eradicating intermittent test failures caused by race conditions and timing bugs',
      whatIsIt: 'Flaky tests destroy developer trust in CI. High performing teams quarantine and fix flaky tests immediately.',
    }),
    buildCommitForgeConcept({
      id: 'c-28-07', subChapterNumber: '28.7', command: 'jest --shard=1/4', title: 'Test Parallelization',
      topicId: 'ch-28', topicNumber: '28', topicTitle: 'Testing in CI/CD',
      subtitle: 'Sharding large test suites across 10 runners to slash execution time from 40m down to 4m',
      syntaxCode: 'strategy:\n  matrix:\n    shard: [1/4, 2/4, 3/4, 4/4]',
    }),
    buildCommitForgeConcept({
      id: 'c-28-08', subChapterNumber: '28.8', command: 'matrix: { browser: [chromium, firefox, webkit] }', title: 'Test Matrix',
      topicId: 'ch-28', topicNumber: '28', topicTitle: 'Testing in CI/CD',
      subtitle: 'Multi-dimensional testing across browsers, databases, and OS environments',
      whatIsIt: 'Validates that web apps render identically across Chrome, Firefox, and Safari engines in CI.',
    }),
    buildCommitForgeConcept({
      id: 'c-28-09', subChapterNumber: '28.9', command: 'exit code 1', title: 'Test Failures',
      topicId: 'ch-28', topicNumber: '28', topicTitle: 'Testing in CI/CD',
      subtitle: 'How test runners signal failure to CI engines via non-zero exit codes',
      whatIsIt: 'A single failed test assertion terminates the process with exit code 1, immediately halting the pipeline.',
    }),
    buildCommitForgeConcept({
      id: 'c-28-10', subChapterNumber: '28.10', command: 'quality gate threshold', title: 'Quality Gates',
      topicId: 'ch-28', topicNumber: '28', topicTitle: 'Testing in CI/CD',
      subtitle: 'Hard rules blocking PR merge: 0 lint errors, >80% coverage, 0 critical CVEs',
      badges: ['Engineering Standards'],
      whatIsIt: 'Automated rules enforcing architectural quality and preventing technical debt from accumulating.',
    }),
    buildCommitForgeConcept({
      id: 'c-28-11', subChapterNumber: '28.11', command: 'required status check', title: 'Required Checks',
      topicId: 'ch-28', topicNumber: '28', topicTitle: 'Testing in CI/CD',
      subtitle: 'Configuring GitHub branch protection to require green CI before the Merge button activates',
      whatIsIt: 'Enforces that the "test" and "lint" workflows must report Success before GitHub allows merging into main.',
    }),
  ],
};

export const PACK_05_CHAPTERS: AcademyTopic[] = [
  CHAPTER_25,
  CHAPTER_26,
  CHAPTER_27,
  CHAPTER_28,
];
