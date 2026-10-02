// Generator script for DevOps Capstones 01 through 10
const fs = require('fs');
const path = require('path');

const devopsCapstones = [
  {
    id: 'devops-01',
    code: 'DEVOPS-01',
    title: 'Basic CI Pipeline',
    academy: 'devops',
    difficulty: 'Beginner',
    estimatedTime: '4-6 hours',
    technologies: ['GitHub Actions / GitLab CI', 'YAML Pipelines', 'Node.js / Python', 'Linters'],
    overview: 'Design and configure a foundational Continuous Integration (CI) pipeline that triggers on code pushes and pull requests, checks out source code, sets up the runtime environment, installs dependencies, and runs code style linters.',
    tags: ['devops', 'ci', 'github-actions', 'yaml', 'linting', 'automation'],
    projectOverview: {
      projectName: 'Basic CI Pipeline',
      academy: 'devops',
      difficulty: 'Beginner',
      estimatedEffort: '4-6 hours',
      technologies: ['GitHub Actions', 'YAML Workflow', 'Node.js / Python', 'ESLint / Flake8'],
      shortDescription: 'Construct a foundational GitHub Actions CI pipeline executing automated linting, dependency verification, and syntax checks on every pull request.'
    },
    scenario: 'Your engineering organization has suffered from developers pushing code with syntax errors, unformatted code, and missing package dependencies directly to the default branch. You must implement an automated gatekeeper: a Continuous Integration (CI) workflow that automatically runs on every pull request and blocks merges if checks fail.',
    problemStatement: 'Manual code reviews often miss syntax errors, broken imports, or missing dependencies. Without automated CI checks, broken code reaches the integration branch, stopping other engineers from working. A repeatable, automated lint and verification pipeline is required.',
    projectObjective: [
      'Create a declarative CI workflow file (.github/workflows/ci.yml)',
      'Configure triggers for push and pull_request events on the main branch',
      'Set up an isolated virtual runner environment with specific language runtimes',
      'Execute automated linting and syntax validation commands',
      'Provide clear status checks on pull requests indicating pass or failure'
    ],
    whatYouNeedToBuild: {
      description: 'A GitHub Actions CI workflow that triggers automatically on code commits and gates pull requests based on linting and syntax checks.',
      diagram: `Developer Git Push / Pull Request
                 │
                 ▼ (Webhook Event)
   [GitHub Actions Virtual Runner (ubuntu-latest)]
   ├── Step 1: actions/checkout@v4 (Clone repo)
   ├── Step 2: actions/setup-node@v4 (Configure Node 20 / Python 3.11)
   ├── Step 3: Install dependencies (npm ci / pip install)
   └── Step 4: Run code linter & syntax check (npm run lint)
                 │
                 ▼
         [GitHub Status Check: PASSED / FAILED]`
    },
    requirements: {
      functional: [
        'CI workflow must trigger on every push and pull request targeting the main branch',
        'Workflow must check out the exact commit SHA that triggered the run',
        'Workflow must fail immediately with a non-zero exit code if linting errors exist'
      ],
      technical: [
        'Write workflow in standard YAML syntax under .github/workflows/ci.yml',
        'Use npm ci instead of npm install for deterministic dependency resolution',
        'Pin GitHub Actions to major versions (e.g. actions/checkout@v4)'
      ],
      security: [
        'Set minimal required repository permissions: permissions: contents: read',
        'Do not commit sensitive tokens into pipeline definitions'
      ]
    },
    architecture: {
      summary: 'Event-driven CI pipeline architecture listening to Git webhook events, instantiating ephemeral cloud runner VMs, and executing deterministic validation stages.',
      diagram: `Git Event ──> GitHub Webhook ──> Workflow Runner VM ──> Setup Runtime ──> Lint Step ──> Status API`,
      components: [
        { name: 'Workflow Specification (.github/workflows/ci.yml)', role: 'Declarative definition of jobs, steps, triggers, and runner environments', technologies: ['YAML'] },
        { name: 'Hosted Runner', role: 'Ephemeral Ubuntu Linux virtual machine executing pipeline steps', technologies: ['GitHub Actions Runner'] },
        { name: 'Language Linter', role: 'Static analysis tool enforcing formatting and syntax correctness', technologies: ['ESLint / Prettier / Flake8'] }
      ]
    },
    technologyRequirements: {
      required: ['GitHub repository', 'GitHub Actions runner', 'Node.js or Python application with linter configured'],
      optional: ['act tool for running GitHub Actions workflows locally'],
      outOfScope: ['Docker container publishing', 'Cloud production deployment']
    },
    functionalRequirements: [
      'Create working application with package.json (or pyproject.toml) and linting script',
      'Create .github/workflows/ci.yml with on: [push, pull_request]',
      'Define job lint-and-validate on ubuntu-latest',
      'Configure steps: checkout, setup runtime, dependency install, and lint',
      'Test successful pipeline run on valid code',
      'Introduce deliberate linting error in a branch, open a PR, and verify pipeline fails and blocks merge'
    ],
    technicalRequirements: [
      'Verify workflow execution time is under 2 minutes',
      'Ensure workflow status badge renders correctly in README.md'
    ],
    securityRequirements: [
      'Ensure pipeline does not execute untrusted pull request code with write permissions'
    ],
    constraints: [
      'Do not allow a failing linter to be ignored (continue-on-error: true is prohibited)',
      'Do not use npm install which can introduce non-deterministic package upgrades'
    ],
    expectedOutcome: 'A reliable, automated Continuous Integration pipeline gating code integration with automated linting and syntax validation.',
    deliverables: [
      'Application source code with linter configuration (.eslintrc.json or pyproject.toml)',
      'GitHub Actions workflow file (.github/workflows/ci.yml)',
      'README.md displaying CI status badge',
      'CI_FOUNDATION_REPORT.md documenting pipeline triggers, run logs, and simulated failure test'
    ],
    suggestedProjectStructure: `.github/
└── workflows/
    └── ci.yml
src/
│   └── index.js
package.json
.eslintrc.json
README.md
CI_FOUNDATION_REPORT.md`,
    requiredConcepts: [
      { name: 'CI/CD Concepts & Pipelines', lessonId: 'mod-09-1', academyRoute: '/devops' },
      { name: 'GitHub Actions Workflows', lessonId: 'mod-09-2', academyRoute: '/devops' },
      { name: 'Continuous Integration Principles', lessonId: 'mod-09-3', academyRoute: '/devops' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 09: CI/CD Pipelines & Automation', route: '/cloudstack/devops?concept=mod-09-1' },
        { title: 'Chapter 09: Workflow Syntax & Runners', route: '/cloudstack/devops?concept=mod-09-2' }
      ],
      officialDocs: [
        { title: 'GitHub Actions Quickstart', url: 'https://docs.github.com/en/actions/quickstart' },
        { title: 'Workflow syntax for GitHub Actions', url: 'https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions' }
      ],
      referenceMaterial: ['Continuous Delivery: Reliable Software Releases (Humble & Farley)'],
      usefulCommands: [
        'git checkout -b feature/test-ci',
        'git push origin feature/test-ci',
        'gh pr create --title "Test CI" --body "Testing workflow"',
        'gh run list',
        'gh run view'
      ]
    },
    recommendedApproach: [
      '1. Initialize a Git repository with a simple Node.js or Python web service.',
      '2. Install and configure a linter (e.g. eslint --init) and add a "lint" script to package.json.',
      '3. Test running the linter locally using npm run lint.',
      '4. Create the .github/workflows directory in the repository root.',
      '5. Author ci.yml with on: [push, pull_request] and steps for checkout, setup, install, and lint.',
      '6. Commit and push to GitHub, then observe the workflow execution in the Actions tab.',
      '7. Generate a status badge in markdown and embed it in README.md.',
      '8. Create a feature branch with a syntax error, push, and confirm the pipeline fails.',
      '9. Fix the error, push, and confirm the pipeline turns green.',
      '10. Document configuration and verification in CI_FOUNDATION_REPORT.md.'
    ],
    importantConsiderations: [
      'Why is using npm ci preferred over npm install in CI automation pipelines?',
      'How does setting permissions: contents: read adhere to the principle of least privilege in GitHub Actions?',
      'What is the difference between running on push versus running on pull_request events?'
    ],
    commonPitfalls: [
      'Using npm install in CI, which modifies package-lock.json and causes non-reproducible builds.',
      'Forgetting to configure working-directory when source code lives in a subdirectory.',
      'Writing long, unreadable single-line shell scripts instead of separating them into distinct named steps.'
    ],
    optionalEnhancements: {
      beginner: ['Add automated code formatting check using Prettier.'],
      intermediate: ['Configure dependency caching using actions/setup-node cache: "npm".'],
      advanced: ['Enforce branch protection rules on GitHub requiring the CI status check to pass before merging.'],
      expert: ['Run CI locally before pushing using the open-source "act" CLI utility.']
    },
    completionChecklist: [
      'Application project initialized with linter configured and functional',
      '.github/workflows/ci.yml created with push and pull_request triggers',
      'Dependency installation uses deterministic package lock commands',
      'Pipeline runs and succeeds on clean code',
      'Deliberate syntax error triggers pipeline failure as expected',
      'README.md updated with live CI status badge',
      'CI_FOUNDATION_REPORT.md completed'
    ]
  },
  {
    id: 'devops-02',
    code: 'DEVOPS-02',
    title: 'Automated Testing Pipeline with Matrix Builds',
    academy: 'devops',
    difficulty: 'Beginner+',
    estimatedTime: '6-8 hours',
    technologies: ['GitHub Actions Matrix', 'Unit Testing (Jest / Pytest)', 'Code Coverage (Codecov)', 'Test Artifacts'],
    overview: 'Expand a CI pipeline into a comprehensive automated testing workflow, utilizing matrix strategies to test across multiple runtime versions and operating systems, collecting test reports, and enforcing code coverage thresholds.',
    tags: ['devops', 'testing', 'matrix-builds', 'code-coverage', 'jest', 'pytest', 'artifacts'],
    projectOverview: {
      projectName: 'Automated Testing Pipeline with Matrix Builds',
      academy: 'devops',
      difficulty: 'Beginner+',
      estimatedEffort: '6-8 hours',
      technologies: ['GitHub Actions Matrix', 'Jest or Pytest', 'Coverage Reporters', 'actions/upload-artifact'],
      shortDescription: 'Build an automated testing pipeline evaluating unit and integration tests across a matrix of Node/Python versions and uploading coverage artifacts.'
    },
    scenario: 'Your application is published as a shared library used across various teams running Node.js versions 18, 20, and 22 on both Ubuntu Linux and macOS. A recent update passed on Node 22 but crashed on Node 18 due to unsupported ES module features. You must build a matrix testing pipeline verifying compatibility across all supported environments.',
    problemStatement: 'Testing in a single environment creates blind spots. Real-world software must run across multiple runtime versions and operating systems. Manually repeating tests on different machines is slow and error-prone. A parallel matrix build pipeline is needed.',
    projectObjective: [
      'Configure a matrix strategy (strategy: matrix) executing parallel test jobs across multiple runtime versions',
      'Execute unit and integration tests with coverage reporting enabled',
      'Upload test coverage reports as build artifacts using actions/upload-artifact',
      'Fail the pipeline if test coverage drops below an agreed threshold (e.g. 80%)'
    ],
    whatYouNeedToBuild: {
      description: 'A multi-dimensional CI testing workflow running test suites in parallel across multiple runtime versions and exporting test artifacts.',
      diagram: `Pull Request Trigger
         │
         ▼
[GitHub Actions Matrix Engine]
├── Job 1: Node 18 on ubuntu-latest ──> [Run Tests & Coverage] ──> PASS/FAIL
├── Job 2: Node 20 on ubuntu-latest ──> [Run Tests & Coverage] ──> PASS/FAIL
└── Job 3: Node 22 on ubuntu-latest ──> [Run Tests & Coverage] ──> PASS/FAIL
         │
         ▼ (Combine Results)
[Coverage Artifact Published] ──> Coverage Report (.coverage / lcov-report)`
    },
    requirements: {
      functional: [
        'Test jobs must run in parallel across Node.js 18, 20, and 22 (or Python 3.10, 3.11, 3.12)',
        'If any single version in the matrix fails, the pull request status must be marked as failed',
        'HTML/LCOV test coverage reports must be generated and uploaded as downloadable artifacts'
      ],
      technical: [
        'Define strategy: matrix: node-version: [18, 20, 22]',
        'Use ${{ matrix.node-version }} variable in setup steps',
        'Use actions/upload-artifact@v4 to preserve coverage reports'
      ],
      security: [
        'Set artifact retention period to 7 days to avoid unnecessary storage consumption'
      ]
    },
    architecture: {
      summary: 'Parallelized matrix testing architecture spawning concurrent isolated runner environments executing test suites and aggregating build artifacts.',
      diagram: `PR Event ──> Matrix Dispatcher ──> [Runner A: v18] | [Runner B: v20] | [Runner C: v22] ──> Artifact Storage`,
      components: [
        { name: 'Matrix Engine', role: 'Workflow orchestrator computing Cartesian product of operating systems and runtimes', technologies: ['GitHub Actions Matrix'] },
        { name: 'Test Runner', role: 'Test harness executing assertion suites and timing performance', technologies: ['Jest / Vitest / Pytest'] },
        { name: 'Coverage Reporter', role: 'Instrumentation tool calculating statement, branch, and function coverage percentages', technologies: ['c8 / Istanbul / coverage.py'] },
        { name: 'Artifact Store', role: 'Archival storage for test logs and HTML coverage dashboards', technologies: ['actions/upload-artifact'] }
      ]
    },
    technologyRequirements: {
      required: ['GitHub repository with Actions', 'Unit testing framework (Jest, Vitest, or Pytest)'],
      optional: ['Codecov or Coveralls integration'],
      outOfScope: ['End-to-End browser Selenium testing']
    },
    functionalRequirements: [
      'Author application with at least 5 unit tests covering utility functions',
      'Create .github/workflows/test.yml with matrix strategy across 3 runtime versions',
      'Configure test command to generate coverage reports (--coverage)',
      'Upload coverage directory using actions/upload-artifact',
      'Verify all 3 matrix jobs run in parallel and report status on GitHub',
      'Introduce a failing test case in a branch and confirm the exact matrix job fails'
    ],
    technicalRequirements: [
      'Configure fail-fast: false so all matrix versions complete even if one fails',
      'Verify uploaded artifact can be downloaded and viewed in a browser'
    ],
    securityRequirements: [
      'Ensure test fixtures do not contain live API keys or production database credentials'
    ],
    constraints: [
      'Do not hardcode a single runtime version in the test workflow',
      'Do not disable test assertion checks to force a passing build'
    ],
    expectedOutcome: 'A high-velocity, parallelized matrix testing pipeline verifying software correctness across multiple runtimes with automated coverage artifact collection.',
    deliverables: [
      'Application source code with unit test suite',
      'Matrix workflow file (.github/workflows/test.yml)',
      'Generated coverage report artifact',
      'MATRIX_TESTING_REPORT.md detailing matrix execution times, test results, and coverage metrics'
    ],
    suggestedProjectStructure: `.github/
└── workflows/
    └── test.yml
src/
│   ├── math.js
│   └── math.test.js
package.json
MATRIX_TESTING_REPORT.md`,
    requiredConcepts: [
      { name: 'GitHub Actions Matrix Builds', lessonId: 'mod-09-2', academyRoute: '/devops' },
      { name: 'Automated Testing in CI', lessonId: 'mod-09-3', academyRoute: '/devops' },
      { name: 'Artifacts & Release Management', lessonId: 'mod-09-4', academyRoute: '/devops' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 09: Matrix Strategies & Parallelism', route: '/cloudstack/devops?concept=mod-09-2' },
        { title: 'Chapter 09: Automated Testing & Coverage', route: '/cloudstack/devops?concept=mod-09-3' }
      ],
      officialDocs: [
        { title: 'Using a matrix for your jobs', url: 'https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs' },
        { title: 'Storing workflow data as artifacts', url: 'https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts' }
      ],
      referenceMaterial: ['Google Testing Blog: Test Sizes and Flakiness'],
      usefulCommands: [
        'npm test -- --coverage',
        'pytest --cov=src tests/',
        'gh run list --workflow=test.yml',
        'gh run download <run-id>'
      ]
    },
    recommendedApproach: [
      '1. Implement a core business logic module and write corresponding unit tests.',
      '2. Configure testing script with coverage flag in package.json (npm test -- --coverage).',
      '3. Verify tests pass locally and check coverage output table.',
      '4. Author .github/workflows/test.yml specifying strategy.matrix.node-version: [18, 20, 22].',
      '5. Add actions/setup-node with node-version: ${{ matrix.node-version }}.',
      '6. Add step to execute npm test.',
      '7. Add actions/upload-artifact step uploading coverage/ directory.',
      '8. Commit, push, and inspect the 3 parallel job executions in GitHub Actions.',
      '9. Download and inspect the coverage report artifact from the summary page.',
      '10. Document findings in MATRIX_TESTING_REPORT.md.'
    ],
    importantConsiderations: [
      'What is the purpose of fail-fast: false in a matrix testing strategy?',
      'How does caching dependencies across matrix jobs reduce runner execution minutes?',
      'Why is code coverage a helpful quality indicator, but not a guarantee of bug-free code?'
    ],
    commonPitfalls: [
      'Leaving fail-fast enabled (default), which cancels all remaining matrix jobs as soon as one fails, hiding errors on other versions.',
      'Uploading artifacts with identical names across parallel jobs without appending the matrix variable, causing overwrite conflicts.',
      'Writing flaky tests that depend on system time or network availability.'
    ],
    optionalEnhancements: {
      beginner: ['Add OS matrix: os: [ubuntu-latest, macos-latest] for cross-platform validation.'],
      intermediate: ['Integrate Codecov automated PR comment badges.'],
      advanced: ['Enforce a minimum code coverage check (e.g. fail if coverage < 85%).'],
      expert: ['Implement test splitting across parallel runners using pytest-split or jest-split.']
    },
    completionChecklist: [
      'Unit test suite created with assertion coverage',
      'Matrix workflow authored targeting 3 distinct runtime versions',
      'All matrix jobs execute concurrently on GitHub Actions',
      'fail-fast: false configured and verified',
      'Coverage report generated and uploaded as a downloadable artifact',
      'Failing test case verified breaking the pipeline',
      'MATRIX_TESTING_REPORT.md published'
    ]
  },
  {
    id: 'devops-03',
    code: 'DEVOPS-03',
    title: 'Docker CI Pipeline with BuildKit & Security Scanning',
    academy: 'devops',
    difficulty: 'Lower Intermediate',
    estimatedTime: '8-10 hours',
    technologies: ['GitHub Actions', 'Docker Buildx', 'BuildKit Caching', 'Trivy Scanner', 'Dockerfile'],
    overview: 'Build an automated container CI pipeline that compiles application code into Docker images, leverages Docker Buildx with GitHub Actions caching, and gates PRs with automated container CVE vulnerability scanning.',
    tags: ['devops', 'docker', 'buildx', 'caching', 'trivy', 'vulnerability-scan'],
    projectOverview: {
      projectName: 'Docker CI Pipeline with BuildKit & Security Scanning',
      academy: 'devops',
      difficulty: 'Lower Intermediate',
      estimatedEffort: '8-10 hours',
      technologies: ['Docker Buildx', 'GitHub Actions', 'BuildKit Caching', 'Trivy Scanner'],
      shortDescription: 'Construct a containerized CI pipeline compiling Docker images with BuildKit layer caching and automated vulnerability gatekeeping using Trivy.'
    },
    scenario: 'Your platform team is containerizing all services. Developers currently build Docker images manually on local machines without caching, leading to 15-minute build times and unverified images containing critical CVE vulnerabilities. You must construct a standardized container CI workflow in GitHub Actions.',
    problemStatement: 'Building Docker images in CI without caching downloads all base image layers and packages on every run, resulting in slow builds. Furthermore, deploying images without automated security scanning introduces vulnerable packages into production. An automated Buildx and security-gated pipeline is required.',
    projectObjective: [
      'Configure Docker Buildx and QEMU inside GitHub Actions runners',
      'Implement GitHub Actions cache backend (cache-from: type=gha, cache-to: type=gha,mode=max)',
      'Build the Docker container image without pushing to an external registry',
      'Execute an automated vulnerability scan using Trivy against the freshly built image',
      'Fail the CI build if any Critical or High CVEs are detected'
    ],
    whatYouNeedToBuild: {
      description: 'An automated container CI pipeline building optimized Docker images with layer caching and vulnerability gates.',
      diagram: `Code Commit / PR
       │
       ▼
[GitHub Actions Runner]
├── 1. Setup Docker Buildx
├── 2. Build Container Image (BuildKit + GitHub Actions Cache)
│      ├── Cache Hit: Layer reused in 0.2s!
│      └── Output: local image (my-app:test)
├── 3. Trivy Vulnerability Scanner
│      ├── Scans OS packages & dependencies
│      └── Evaluation: High/Critical CVE count
       │
       ├─► [CVEs Found > 0] ──> FAIL PIPELINE & Block PR
       └─► [CVEs = 0]       ──> PASS PIPELINE (Ready for Registry)`
    },
    requirements: {
      functional: [
        'Docker image must build automatically on every pull request',
        'Subsequent builds with unchanged Dockerfile layers must demonstrate significant speedup via GHA cache',
        'Trivy scanner must scan the local image and fail the job if critical CVEs are present'
      ],
      technical: [
        'Use docker/setup-buildx-action@v3 and docker/build-push-action@v5',
        'Configure load: true to load the built image into the local Docker daemon for scanning',
        'Use aquasecurity/trivy-action@master with exit-code: 1 and severity: CRITICAL,HIGH'
      ],
      security: [
        'Zero critical CVE vulnerabilities permitted in the final container image',
        'Do not store or expose registry credentials in this non-publishing verification stage'
      ]
    },
    architecture: {
      summary: 'Secure container CI architecture integrating BuildKit builder instances, remote cache synchronization, and static container image vulnerability analysis.',
      diagram: `Source Code ──> Buildx Engine (GHA Cache) ──> Local Image Tar ──> Trivy Security Engine ──> Verdict (Pass/Fail)`,
      components: [
        { name: 'Docker Buildx Action', role: 'Initializes dedicated BuildKit container runner with advanced caching support', technologies: ['Buildx'] },
        { name: 'GHA Cache Backend', role: 'Stores intermediate build layer blobs in GitHub Actions cache storage', technologies: ['type=gha'] },
        { name: 'Trivy Scanner Action', role: 'Vulnerability scanner checking base OS and application manifest against CVE databases', technologies: ['Trivy'] }
      ]
    },
    technologyRequirements: {
      required: ['GitHub repository', 'Dockerfile with multi-stage build', 'GitHub Actions runner'],
      optional: ['Docker Scout alternative scanner'],
      outOfScope: ['Pushing image to public registry (covered in DEVOPS-04)']
    },
    functionalRequirements: [
      'Create multi-stage Dockerfile for a sample web application',
      'Create .github/workflows/docker-ci.yml triggering on pull_request',
      'Configure Buildx with GHA caching enabled',
      'Build image with tag my-app:${{ github.sha }} and load into local runner daemon',
      'Scan image with Trivy action and configure SARIF or table output',
      'Demonstrate cache hit on second run reducing build time by at least 50%',
      'Test security gate: add an outdated vulnerable package and confirm pipeline fails'
    ],
    technicalRequirements: [
      'Verify build times before and after caching in workflow summary',
      'Ensure Trivy output displays table of scanned packages'
    ],
    securityRequirements: [
      'Confirm Dockerfile specifies non-root USER and minimal base image (alpine / distroless)'
    ],
    constraints: [
      'Do not push the image to a container registry during PR validation',
      'Do not set exit-code: 0 on Trivy, which would allow critical CVEs to pass undetected'
    ],
    expectedOutcome: 'A fast, cached container CI pipeline providing automated security verification and preventing vulnerable Docker images from entering the codebase.',
    deliverables: [
      'Multi-stage Dockerfile adhering to security standards',
      'GitHub Actions workflow (.github/workflows/docker-ci.yml)',
      'DOCKER_CI_BENCHMARK.md detailing build time comparisons with/without cache and Trivy scan logs'
    ],
    suggestedProjectStructure: `.github/
└── workflows/
    └── docker-ci.yml
Dockerfile
.dockerignore
src/
└── app.js
DOCKER_CI_BENCHMARK.md`,
    requiredConcepts: [
      { name: 'Continuous Integration with Docker', lessonId: 'mod-09-3', academyRoute: '/devops' },
      { name: 'Docker Buildx & Caching', lessonId: 'mod-04-11', academyRoute: '/devops' },
      { name: 'Image Vulnerability Scanning', lessonId: 'mod-04-10', academyRoute: '/devops' },
      { name: 'DevSecOps Principles', lessonId: 'mod-16-1', academyRoute: '/devops' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 09: Container CI Pipelines', route: '/cloudstack/devops?concept=mod-09-3' },
        { title: 'Chapter 04: Docker Production & Buildx', route: '/cloudstack/devops?concept=mod-04-11' },
        { title: 'Chapter 16: DevSecOps & Image Scanning', route: '/cloudstack/devops?concept=mod-16-1' }
      ],
      officialDocs: [
        { title: 'Docker Build Push Action', url: 'https://github.com/docker/build-push-action' },
        { title: 'Trivy GitHub Action Documentation', url: 'https://github.com/aquasecurity/trivy-action' }
      ],
      referenceMaterial: ['OWASP Container Security Verification Standard (CSVS)'],
      usefulCommands: [
        'docker buildx build --load -t test-image .',
        'trivy image --severity HIGH,CRITICAL test-image',
        'gh run view --log'
      ]
    },
    recommendedApproach: [
      '1. Author a secure, multi-stage Dockerfile for the application.',
      '2. Test building the image locally and scan with Trivy CLI.',
      '3. Create .github/workflows/docker-ci.yml with pull_request trigger.',
      '4. Add docker/setup-buildx-action step.',
      '5. Add docker/build-push-action with load: true, cache-from: type=gha, and cache-to: type=gha,mode=max.',
      '6. Add aquasecurity/trivy-action step targeting the built image with severity: CRITICAL,HIGH.',
      '7. Commit and open a PR; observe initial build time and Trivy scan report.',
      '8. Push a minor cosmetic commit to the PR and observe accelerated build time from cache.',
      '9. Verify Trivy gates the pipeline when a vulnerable package is added.',
      '10. Document benchmark results in DOCKER_CI_BENCHMARK.md.'
    ],
    importantConsiderations: [
      'Why is mode=max necessary when saving Buildx cache to GitHub Actions (type=gha)?',
      'Why must load: true be set when scanning images locally with Trivy before pushing to a registry?',
      'How does layer caching differ between local development and ephemeral CI runners?'
    ],
    commonPitfalls: [
      'Forgetting load: true in build-push-action, causing the subsequent Trivy scan step to fail with "image not found".',
      'Using latest image tags in the Dockerfile FROM instruction, breaking cache reproducibility.',
      'Setting cache-to on pull_request events in repos where PR branches cannot write to the default branch cache scope.'
    ],
    optionalEnhancements: {
      beginner: ['Upload Trivy scan results in SARIF format to GitHub Security Code Scanning tab.'],
      intermediate: ['Add hadolint step to lint the Dockerfile syntax before building.'],
      advanced: ['Build multi-platform images (linux/amd64 and linux/arm64) using QEMU in CI.'],
      expert: ['Generate a Software Bill of Materials (SBOM) using Syft action and attach as artifact.']
    },
    completionChecklist: [
      'Secure multi-stage Dockerfile created and tested',
      'GitHub Actions workflow authored with Buildx and GHA caching',
      'Image successfully built and loaded into runner daemon',
      'GHA cache hit verified accelerating subsequent builds',
      'Trivy scanner action configured with exit-code: 1 on Critical/High CVEs',
      'Security gate verified failing on vulnerable image',
      'DOCKER_CI_BENCHMARK.md published'
    ]
  }
];

// Append remaining 7 projects for DevOps (04 to 10)
const remainingDevOpsCapstones = [
  {
    id: 'devops-04',
    code: 'DEVOPS-04',
    title: 'Docker Registry Automation & Semantic Tagging Pipeline',
    academy: 'devops',
    difficulty: 'Intermediate',
    estimatedTime: '8-12 hours',
    technologies: ['GitHub Container Registry (GHCR)', 'Docker Hub', 'Semantic Tagging', 'OCI Annotations', 'Automated Promotion'],
    overview: 'Build an automated container delivery pipeline that publishes versioned Docker images to GitHub Container Registry (GHCR), enforcing immutable Semantic Versioning (SemVer), Git commit SHA tags, and OCI image metadata annotations.',
    tags: ['devops', 'registry', 'ghcr', 'docker-publish', 'semver', 'oci-annotations'],
    projectOverview: {
      projectName: 'Docker Registry Automation & Semantic Tagging Pipeline',
      academy: 'devops',
      difficulty: 'Intermediate',
      estimatedEffort: '8-12 hours',
      technologies: ['GHCR', 'Docker Buildx', 'SemVer Tagging', 'docker/metadata-action'],
      shortDescription: 'Construct an automated container publishing pipeline that pushes immutable SemVer and commit SHA tagged images to GitHub Container Registry.'
    },
    scenario: 'Your production release engineering team suffered an outage because a deployment pulled an image tagged "latest" that had just been overwritten by an unstable experimental build. Management has mandated that the "latest" tag be banned for production deployments and replaced with strict immutable SemVer tags (v1.2.3) and Git commit SHA tagging.',
    problemStatement: 'Using mutable tags like "latest" makes it impossible to know what code is actually running in production and prevents reliable rollbacks. An automated publishing pipeline is required that tags images with immutable SemVer identifiers and Git commit hashes.',
    projectObjective: [
      'Authenticate pipeline securely to GitHub Container Registry (ghcr.io) using GITHUB_TOKEN',
      'Use docker/metadata-action to automatically extract SemVer tags, branch names, and commit SHAs',
      'Build and push multi-tagged images to GHCR only upon merge to main or Git tag creation',
      'Embed OCI standard metadata annotations (source URL, revision, licenses) into the image manifest',
      'Verify that published images can be pulled and run from any authenticated environment'
    ],
    whatYouNeedToBuild: {
      description: 'An automated container publishing pipeline that pushes versioned images to GHCR with rich OCI annotations.',
      diagram: `Git Event (Push to main OR Git Tag: v1.2.0)
                 │
                 ▼
[GitHub Actions Runner]
├── 1. docker/metadata-action extracts tags:
│      ├── ghcr.io/org/app:v1.2.0 (SemVer)
│      ├── ghcr.io/org/app:v1.2 (Minor floating)
│      └── ghcr.io/org/app:sha-e4b21a8 (Immutable SHA)
├── 2. Authenticate to ghcr.io (GITHUB_TOKEN)
└── 3. Build & Push Image via Buildx
                 │
                 ▼
[GitHub Container Registry (GHCR)]
└── OCI Image Manifest with OpenContainers labels & multi-tags`
    },
    requirements: {
      functional: [
        'Pushing to main branch must publish image tagged with sha-<commit_hash> and main',
        'Pushing a Git tag (v*.*.*) must publish image tagged with SemVer version numbers',
        'Pull requests must only build and test the image without pushing to the registry'
      ],
      technical: [
        'Use docker/login-action@v3 authenticating to ghcr.io',
        'Use docker/metadata-action@v5 to dynamically compute tags and OCI labels',
        'Set push: ${{ github.event_name != \'pull_request\' }}'
      ],
      security: [
        'Configure least-privilege token permissions: permissions: packages: write, contents: read',
        'Do not store credentials in plaintext'
      ]
    },
    architecture: {
      summary: 'Automated artifact publishing architecture translating Git events into versioned OCI container images with cryptographic digests.',
      diagram: `Git Tag (v1.0.0) ──> metadata-action ──> Buildx Engine ──(ghcr.io login)──> GHCR Storage`,
      components: [
        { name: 'Metadata Extractor', role: 'Computes standardized Docker tags and OCI labels from Git context', technologies: ['docker/metadata-action'] },
        { name: 'Container Registry (GHCR)', role: 'Enterprise artifact repository storing image blobs and manifests', technologies: ['GitHub Packages'] },
        { name: 'OCI Manifest Annotations', role: 'Standardized metadata embedded directly into container headers', technologies: ['OpenContainers Spec'] }
      ]
    },
    technologyRequirements: {
      required: ['GitHub repository', 'GitHub Container Registry (GHCR)', 'Docker Engine'],
      optional: ['Docker Hub account as secondary mirror'],
      outOfScope: ['Production Kubernetes deployment (covered in DEVOPS-05)']
    },
    functionalRequirements: [
      'Create .github/workflows/publish.yml triggering on push to main and tags v*.*.*',
      'Configure metadata-action generating type=semver, type=sha, and type=ref,event=branch',
      'Authenticate to ghcr.io using GITHUB_TOKEN',
      'Build and push image to ghcr.io/${{ github.repository }}',
      'Create Git release tag v1.0.0 and push to trigger release workflow',
      'Verify image appears in GitHub Packages with tags: v1.0.0, v1.0, 1, and sha-<hash>',
      'Pull and run published image locally: docker run --rm -p 8080:8080 ghcr.io/...'
    ],
    technicalRequirements: [
      'Inspect remote image labels: docker buildx imagetools inspect ghcr.io/...',
      'Confirm OCI labels: org.opencontainers.image.source and org.opencontainers.image.revision are present'
    ],
    securityRequirements: [
      'Ensure package visibility settings in GitHub match intended access policy (private or public)'
    ],
    constraints: [
      'Never deploy using the latest tag in production environments',
      'Do not allow pull requests from forks to push images to the registry'
    ],
    expectedOutcome: 'A production-grade container publishing pipeline that generates immutably tagged, traceable Docker images on GitHub Container Registry.',
    deliverables: [
      'Publishing workflow configuration (.github/workflows/publish.yml)',
      'Published container package visible in GitHub Packages',
      'REGISTRY_AUTOMATION_PLAYBOOK.md documenting tagging strategies, authentication, and pulling instructions'
    ],
    suggestedProjectStructure: `.github/
└── workflows/
    └── publish.yml
Dockerfile
src/
└── server.js
REGISTRY_AUTOMATION_PLAYBOOK.md`,
    requiredConcepts: [
      { name: 'Private & Cloud Registries', lessonId: 'mod-05-1', academyRoute: '/devops' },
      { name: 'Image Management & Tagging', lessonId: 'mod-05-2', academyRoute: '/devops' },
      { name: 'Image Versioning & SemVer', lessonId: 'mod-05-3', academyRoute: '/devops' },
      { name: 'CI/CD Pipelines & Automation', lessonId: 'mod-09-1', academyRoute: '/devops' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 05: Container Registries & Artifacts', route: '/cloudstack/devops?concept=mod-05-1' },
        { title: 'Chapter 05: Image Versioning & SemVer', route: '/cloudstack/devops?concept=mod-05-3' },
        { title: 'Chapter 09: CI/CD Pipelines', route: '/cloudstack/devops?concept=mod-09-1' }
      ],
      officialDocs: [
        { title: 'Working with the Container registry (GHCR)', url: 'https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry' },
        { title: 'Docker Metadata Action', url: 'https://github.com/docker/metadata-action' }
      ],
      referenceMaterial: ['OCI Image Format Specification'],
      usefulCommands: [
        'git tag v1.0.0 && git push origin v1.0.0',
        'echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin',
        'docker pull ghcr.io/org/app:v1.0.0'
      ]
    },
    recommendedApproach: [
      '1. Review repository permissions in GitHub Actions settings (ensure "Read and write permissions" for packages).',
      '2. Create .github/workflows/publish.yml with push triggers for branches and tags.',
      '3. Add docker/metadata-action step defining flavor: latest=false and tagging rules.',
      '4. Add docker/login-action step authenticating to ghcr.io using GITHUB_TOKEN.',
      '5. Add docker/build-push-action using tags and labels output from metadata-action.',
      '6. Commit and push to main; verify commit SHA tagged image is published.',
      '7. Cut an annotated Git tag: git tag -a v1.0.0 -m "Release v1.0.0" and push to remote.',
      '8. Observe tag workflow building and publishing v1.0.0, v1.0, and 1.',
      '9. Pull the image locally and verify container startup and OCI labels.',
      '10. Document publishing workflow in REGISTRY_AUTOMATION_PLAYBOOK.md.'
    ],
    importantConsiderations: [
      'Why is tagging images with the Git commit SHA the gold standard for traceability in Continuous Delivery?',
      'How does docker/metadata-action prevent accidental overwriting of stable release tags?',
      'Why should production deployment manifests reference images by immutable SHA256 digest rather than tags?'
    ],
    commonPitfalls: [
      'Failing to grant packages: write permission to GITHUB_TOKEN, resulting in "403 Forbidden" errors on docker push.',
      'Publishing images with latest tag on every commit, masking regressions.',
      'Allowing untrusted pull requests from external forks to execute publish steps.'
    ],
    optionalEnhancements: {
      beginner: ['Configure automated deletion of untagged container image versions via GitHub Actions.'],
      intermediate: ['Publish images to both GHCR and Docker Hub concurrently in the same workflow.'],
      advanced: ['Cryptographically sign the published image with Sigstore Cosign keyless signing.'],
      expert: ['Implement automatic promotion: tag as :staging on main, promote to :production on approval.']
    },
    completionChecklist: [
      'GitHub Container Registry authentication configured via GITHUB_TOKEN',
      'docker/metadata-action configured with SemVer and commit SHA rules',
      'Workflow pushes only on main push or tag creation, not pull requests',
      'Git tag v1.0.0 created and pushed',
      'Image successfully published to GHCR with correct tags',
      'OCI annotations verified on remote manifest',
      'Image pulled and executed successfully on a clean host',
      'REGISTRY_AUTOMATION_PLAYBOOK.md published'
    ]
  },
  {
    id: 'devops-05',
    code: 'DEVOPS-05',
    title: 'CI/CD Application Deployment Pipeline (SSH / Webhook)',
    academy: 'devops',
    difficulty: 'Intermediate+',
    estimatedTime: '10-14 hours',
    technologies: ['CI/CD Deployment', 'SSH / SCP Deployment', 'Docker Compose', 'GitHub Secrets', 'Zero-Downtime Reload'],
    overview: 'Design and automate an end-to-end Continuous Delivery (CD) pipeline that builds container images, authenticates to a remote staging server over encrypted SSH, updates configuration, and deploys services with automated rollback on failure.',
    tags: ['devops', 'cd', 'deployment', 'ssh-deploy', 'docker-compose', 'rollback'],
    projectOverview: {
      projectName: 'CI/CD Application Deployment Pipeline (SSH / Webhook)',
      academy: 'devops',
      difficulty: 'Intermediate+',
      estimatedEffort: '10-14 hours',
      technologies: ['GitHub Actions CD', 'SSH Keys / SCP', 'Docker Compose', 'Deployment Rollback'],
      shortDescription: 'Build an automated Continuous Delivery pipeline that deploys containerized applications to a remote Linux host over SSH with health validation and automatic rollback.'
    },
    scenario: 'Your engineering team has automated CI testing, but deployments are still executed manually: an engineer SSHs into the server, edits compose files, pulls images, and restarts services. This causes human errors, forgotten environment variables, and downtime during deployments. You must automate the deployment pipeline.',
    problemStatement: 'Manual deployments lack repeatability, audit logs, automated rollback, and consistency. A secure Continuous Delivery pipeline is required that connects to the destination host, executes zero-downtime container replacement, validates application health, and rolls back if an error occurs.',
    projectObjective: [
      'Configure secure SSH key-based authentication from GitHub Actions to a target Linux server using GitHub Secrets',
      'Automate the deployment pipeline (.github/workflows/deploy.yml) triggered upon merge to main',
      'Transfer production compose.yaml and environment configurations securely',
      'Execute atomic service updates using docker compose pull and docker compose up -d',
      'Implement post-deployment health verification with automated rollback if the new version fails'
    ],
    whatYouNeedToBuild: {
      description: 'An automated Continuous Delivery workflow deploying containerized applications to a remote Linux server with automated health verification and rollback.',
      diagram: `Merge to main Branch
         │
         ▼
[GitHub Actions CD Workflow]
├── 1. Build & Push Image to Registry
├── 2. Establish SSH Session to Server (SSH Private Key Secret)
├── 3. Transfer updated compose.yaml
├── 4. Execute Remote Command:
│      docker compose pull && docker compose up -d --remove-orphans
├── 5. Health Check Verification:
│      curl -f http://server/healthz (Retries: 5)
         │
         ├─► [Health Check PASS] ──> Deployment Successful! (Slack Notification)
         └─► [Health Check FAIL] ──> Trigger Rollback: Revert to previous image tag`
    },
    requirements: {
      functional: [
        'Deploy workflow must automatically execute upon merging code into the main branch',
        'Application must be updated to the new commit SHA without manual terminal access on the server',
        'If the new application fails the /healthz probe, the pipeline must automatically restore the previous working version'
      ],
      technical: [
        'Store SERVER_HOST, SERVER_USER, and SERVER_SSH_KEY in GitHub Secrets',
        'Use appleboy/ssh-action or native ssh-agent for remote command execution',
        'Verify zero plaintext secrets leaked into CI workflow logs'
      ],
      security: [
        'Create a dedicated deployer user on the target server with restricted sudo/docker access',
        'Do not permit root SSH access from the CI pipeline'
      ]
    },
    architecture: {
      summary: 'Continuous Delivery architecture mediating between cloud CI build engines and target infrastructure hosts via encrypted SSH channels.',
      diagram: `GitHub Actions Runner ──(SSH Key Auth)──> Target Linux Server ──> Docker Engine (Pulls Image & Updates Containers)`,
      components: [
        { name: 'CD Pipeline Runner', role: 'Workflow orchestrator executing deployment scripts and health evaluations', technologies: ['GitHub Actions'] },
        { name: 'Encrypted Secrets Store', role: 'Cryptographically sealed storage for SSH private keys and server IPs', technologies: ['GitHub Secrets'] },
        { name: 'Target Linux Host', role: 'Production/staging server executing Docker Compose workloads', technologies: ['Ubuntu Linux', 'Docker Engine'] },
        { name: 'Health Watchdog', role: 'Post-deploy validation probe verifying HTTP 200 readiness', technologies: ['curl / Bash'] }
      ]
    },
    technologyRequirements: {
      required: ['GitHub repository', 'Target Linux host (VPS, Cloud VM, or local VM)', 'Docker Engine & Compose on host'],
      optional: ['Watchtower or webhook agent alternative'],
      outOfScope: ['Full GitOps Argo CD clusters (covered in DEVOPS-08/10)']
    },
    functionalRequirements: [
      'Create dedicated deploy user on the target server with docker group access',
      'Generate SSH key pair: add public key to ~/.ssh/authorized_keys on server; add private key to GitHub Secrets',
      'Author .github/workflows/deploy.yml executing deployment sequence on push to main',
      'Pipeline transfers compose.yaml, pulls latest images, and restarts service',
      'Pipeline tests /healthz endpoint with 5 retries',
      'Simulate bad deployment (broken healthz) and verify pipeline detects failure and triggers rollback'
    ],
    technicalRequirements: [
      'Verify host SSH fingerprint using known_hosts in CI runner to prevent MITM attacks',
      'Measure total deployment downtime (must be < 3 seconds)'
    ],
    securityRequirements: [
      'Ensure deployer user cannot write to /etc/sudoers or read other users\' home directories'
    ],
    constraints: [
      'Never store SSH private keys directly in the Git repository',
      'Do not disable host key checking (StrictHostKeyChecking=no is prohibited in production)'
    ],
    expectedOutcome: 'A fully automated, hands-off Continuous Delivery deployment pipeline with verified health checks and automated rollback protection.',
    deliverables: [
      'Deployment workflow configuration (.github/workflows/deploy.yml)',
      'Server-side compose.yaml and rollback scripts',
      'DEPLOYMENT_AUTOMATION_RUNBOOK.md detailing SSH setup, secret management, and rollback troubleshooting'
    ],
    suggestedProjectStructure: `.github/
└── workflows/
    └── deploy.yml
compose.yaml
scripts/
├── deploy.sh
└── rollback.sh
DEPLOYMENT_AUTOMATION_RUNBOOK.md`,
    requiredConcepts: [
      { name: 'Continuous Deployment & Delivery', lessonId: 'mod-09-3', academyRoute: '/devops' },
      { name: 'Release Management & Promotion', lessonId: 'mod-09-4', academyRoute: '/devops' },
      { name: 'SSH and Remote Access', lessonId: 'mod-01-4', academyRoute: '/devops' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 09: CD Pipelines & Automation', route: '/cloudstack/devops?concept=mod-09-3' },
        { title: 'Chapter 09: Release Management', route: '/cloudstack/devops?concept=mod-09-4' }
      ],
      officialDocs: [
        { title: 'Deploying with GitHub Actions', url: 'https://docs.github.com/en/actions/deployment/about-deployments/about-continuous-deployment' },
        { title: 'appleboy/ssh-action', url: 'https://github.com/appleboy/ssh-action' }
      ],
      referenceMaterial: ['Continuous Delivery Pipelines in Practice (Dave Farley)'],
      usefulCommands: [
        'ssh-keygen -t ed25519 -C "github-actions-deploy"',
        'ssh -i id_ed25519 deploy@server "docker compose ps"',
        'docker compose up -d --no-deps --build app'
      ]
    },
    recommendedApproach: [
      '1. Provision target Linux host and verify Docker Engine is operational.',
      '2. Create an unprivileged user deploy and add to the docker group.',
      '3. Generate an ED25519 SSH key pair specifically for CI deployment.',
      '4. Store the private key, server IP, and user in GitHub Repository Secrets.',
      '5. Author .github/workflows/deploy.yml with build-and-push followed by deploy job.',
      '6. Use appleboy/ssh-action or native ssh commands to execute docker compose pull && up.',
      '7. Include a health check loop in the deployment script testing http://localhost:8080/healthz.',
      '8. Include rollback logic reverting to the previous image tag if health checks fail.',
      '9. Test successful deployment by pushing a new commit to main.',
      '10. Test rollback by intentionally deploying a broken image tag and verifying recovery.'
    ],
    importantConsiderations: [
      'Why is ED25519 preferred over legacy RSA keys for SSH authentication in CI pipelines?',
      'How does StrictHostKeyChecking prevent Man-in-the-Middle (MITM) attacks during automated SSH deployments?',
      'What are the advantages of container healthcheck gates over simple process existence checks?'
    ],
    commonPitfalls: [
      'Running deployment commands as the root user on the remote host.',
      'Failing to specify timeout and retries on health checks, failing prematurely while the app is still initializing.',
      'Leaving stale container orphans on the host without --remove-orphans.'
    ],
    optionalEnhancements: {
      beginner: ['Send deployment notification messages to a Slack/Discord webhook.'],
      intermediate: ['Implement blue-green container deployment using Nginx upstream reloading.'],
      advanced: ['Create an immutable deployment record using GitHub Deployment API and Environments.'],
      expert: ['Replace direct SSH access with a pull-based agent (e.g. Watchtower or Argo CD).']
    },
    completionChecklist: [
      'Dedicated deployer user created on remote host with Docker permissions',
      'SSH key pair created and private key stored in GitHub Secrets',
      '.github/workflows/deploy.yml authored and active',
      'Automated deployment executed successfully on merge to main',
      'Application updated without manual SSH terminal commands',
      'Post-deployment health check verifies service availability',
      'Automated rollback tested and verified recovering previous version',
      'DEPLOYMENT_AUTOMATION_RUNBOOK.md published'
    ]
  },
  {
    id: 'devops-06',
    code: 'DEVOPS-06',
    title: 'Infrastructure as Code CI/CD Pipeline (Terraform & Ansible)',
    academy: 'devops',
    difficulty: 'Advanced',
    estimatedTime: '10-14 hours',
    technologies: ['Terraform CLI', 'GitHub Actions', 'TFLint / Trivy IaC', 'Remote State', 'Ansible Playbooks', 'OIDC Cloud Auth'],
    overview: 'Design, implement, and govern an automated Infrastructure as Code (IaC) CI/CD pipeline using Terraform and Ansible, featuring automated linting, security scanning, pull-request plan generation, and gated production apply workflows.',
    tags: ['devops', 'iac', 'terraform', 'ansible', 'ci-cd', 'tflint', 'github-actions'],
    projectOverview: {
      projectName: 'Infrastructure as Code CI/CD Pipeline (Terraform & Ansible)',
      academy: 'devops',
      difficulty: 'Advanced',
      estimatedEffort: '10-14 hours',
      technologies: ['Terraform', 'Ansible', 'GitHub Actions', 'TFLint', 'Trivy IaC'],
      shortDescription: 'Construct an automated Infrastructure as Code pipeline executing terraform fmt, linting, security scanning, PR speculative plans, and gated production apply.'
    },
    scenario: 'Engineers on your platform team have been running "terraform apply" directly from their laptops using personal cloud administrator credentials. Last week, an engineer accidentally destroyed a production VPC because their local workspace state was out of sync. Management has declared that all infrastructure changes must be driven through an audited IaC CI/CD pipeline.',
    problemStatement: 'Running Terraform locally causes state lock conflicts, credential sprawl, unvetted infrastructure changes, and broken drift detection. Infrastructure changes must be reviewed as code, validated by static linters, previewed on pull requests, and applied strictly through an automated CI pipeline.',
    projectObjective: [
      'Build an automated Terraform CI/CD pipeline (.github/workflows/terraform.yml)',
      'Enforce code formatting (terraform fmt -check) and syntax validation (terraform validate)',
      'Perform static analysis and security scanning on IaC manifests using TFLint and Trivy',
      'Generate speculative terraform plan output and post it as an automated comment on pull requests',
      'Execute terraform apply strictly upon merge to the main branch with manual approval gating'
    ],
    whatYouNeedToBuild: {
      description: 'An automated IaC delivery pipeline that reviews, plans, scans, and applies Terraform and Ansible configurations.',
      diagram: `Pull Request Created / Updated
                 │
                 ▼
[GitHub Actions IaC Runner]
├── 1. terraform fmt -check (Style enforcement)
├── 2. tflint & trivy (Security scan for misconfigurations: e.g. open S3 buckets)
├── 3. terraform plan -no-color (Speculative execution)
└── 4. Post Plan Summary as PR Comment for Peer Review
                 │
                 ▼ (PR Approved & Merged to main)
[Production Apply Stage]
├── 1. Acquire Remote State Lock
├── 2. terraform apply -auto-approve
└── 3. Run Ansible Playbook for Post-Provisioning Configuration`
    },
    requirements: {
      functional: [
        'Every PR modifying infrastructure code must receive an automated comment displaying the terraform plan diff',
        'IaC manifests containing security anti-patterns (e.g. 0.0.0.0/0 on port 22) must fail CI',
        'terraform apply must only execute on the main branch, never on PR branches'
      ],
      technical: [
        'Use hashicorp/setup-terraform action',
        'Configure remote state backend (AWS S3 + DynamoDB, Azure Blob, or Terraform Cloud/Local Backend)',
        'Use actions/github-script to post plan output as a PR comment'
      ],
      security: [
        'Authenticate to cloud provider using short-lived OIDC tokens (no long-lived cloud keys)',
        'Ensure plan files containing sensitive variables are not uploaded publicly'
      ]
    },
    architecture: {
      summary: 'Infrastructure delivery architecture separating speculative planning during pull request review from authoritative state mutations on main.',
      diagram: `PR Branch ──> IaC Lint & Security ──> Speculative Plan ──> Review Gate ──> Merge to main ──> Authoritative Apply ──> Cloud State`,
      components: [
        { name: 'Terraform Engine', role: 'Declarative resource graph compiler managing cloud infrastructure lifecycle', technologies: ['Terraform CLI'] },
        { name: 'TFLint & Trivy IaC', role: 'Linter and security scanner checking provider best practices and compliance', technologies: ['TFLint', 'Trivy'] },
        { name: 'PR Plan Commenter', role: 'Automation script posting execution diffs directly onto GitHub pull requests', technologies: ['GitHub Script'] },
        { name: 'Ansible Engine', role: 'Configuration management tool bootstrapping software on newly provisioned VMs', technologies: ['Ansible'] }
      ]
    },
    technologyRequirements: {
      required: ['GitHub repository', 'Terraform CLI 1.5+', 'GitHub Actions runner', 'Cloud account or LocalStack/Docker provider'],
      optional: ['LocalStack for simulated AWS cloud testing'],
      outOfScope: ['Full Pulumi C# development']
    },
    functionalRequirements: [
      'Author Terraform configuration creating basic infrastructure (VPC, Subnet, VM or Docker resources)',
      'Create .github/workflows/terraform.yml with fmt, validate, and tflint steps',
      'Add security scanning step using aquasecurity/trivy-action with scan-type: config',
      'Configure terraform plan step capturing output to a file',
      'Add step posting plan output to the PR using actions/github-script',
      'Configure apply job running only on push to main with environment protection'
    ],
    technicalRequirements: [
      'Ensure remote state backend uses state locking',
      'Verify pipeline handles clean destruction or incremental updates'
    ],
    securityRequirements: [
      'Confirm zero plaintext credentials in .tf files or workflow YAML',
      'Verify cloud permissions for the CI role follow least-privilege principles'
    ],
    constraints: [
      'Never run terraform apply on PR branches',
      'Do not commit .terraform/ directories or *.tfstate files to Git'
    ],
    expectedOutcome: 'A fully audited, secure Infrastructure as Code CI/CD pipeline preventing infrastructure drift, credential leakage, and unreviewed production changes.',
    deliverables: [
      'Terraform configuration files (main.tf, variables.tf, outputs.tf)',
      'CI/CD workflow configuration (.github/workflows/terraform.yml)',
      'TFLint configuration (.tflint.hcl)',
      'IAC_PIPELINE_DOCUMENTATION.md detailing pipeline architecture, state locking, and PR review workflow'
    ],
    suggestedProjectStructure: `.github/
└── workflows/
    └── terraform.yml
terraform/
├── main.tf
├── variables.tf
├── outputs.tf
├── .tflint.hcl
└── .gitignore
IAC_PIPELINE_DOCUMENTATION.md`,
    requiredConcepts: [
      { name: 'Infrastructure as Code Concepts', lessonId: 'mod-10-1', academyRoute: '/devops' },
      { name: 'Terraform Fundamentals', lessonId: 'mod-10-2', academyRoute: '/devops' },
      { name: 'CI/CD Pipelines & Automation', lessonId: 'mod-09-1', academyRoute: '/devops' },
      { name: 'DevSecOps & IaC Security', lessonId: 'mod-16-1', academyRoute: '/devops' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 10: Infrastructure as Code & Terraform', route: '/cloudstack/devops?concept=mod-10-1' },
        { title: 'Chapter 09: CI/CD Pipelines', route: '/cloudstack/devops?concept=mod-09-1' },
        { title: 'Chapter 16: DevSecOps & Security Scanning', route: '/cloudstack/devops?concept=mod-16-1' }
      ],
      officialDocs: [
        { title: 'Automate Terraform with GitHub Actions', url: 'https://developer.hashicorp.com/terraform/tutorials/automation/github-actions' },
        { title: 'TFLint Documentation', url: 'https://github.com/terraform-linters/tflint' }
      ],
      referenceMaterial: ['Terraform Up & Running (Yevgeniy Brikman)'],
      usefulCommands: [
        'terraform fmt -check',
        'terraform validate',
        'tflint --init && tflint',
        'terraform plan -out=tfplan',
        'terraform apply -auto-approve tfplan'
      ]
    },
    recommendedApproach: [
      '1. Structure the Terraform project with main.tf, variables.tf, and outputs.tf.',
      '2. Configure .gitignore to exclude .terraform, *.tfstate, and *.tfvars.',
      '3. Create .tflint.hcl and test running tflint locally.',
      '4. Author .github/workflows/terraform.yml with fmt, validate, and security scan steps.',
      '5. Configure hashicorp/setup-terraform action with terraform_version.',
      '6. Add terraform plan step writing output to a log file.',
      '7. Implement PR commenting step using actions/github-script to display the plan diff.',
      '8. Add apply job conditioned on github.ref == "refs/heads/main" and github.event_name == "push".',
      '9. Test by opening a PR: review the automated plan comment, merge, and verify apply runs.',
      '10. Document pipeline procedures in IAC_PIPELINE_DOCUMENTATION.md.'
    ],
    importantConsiderations: [
      'Why is speculative planning on pull requests essential for peer review before infrastructure changes?',
      'How does remote state locking prevent two concurrent CI pipelines from corrupting the Terraform state?',
      'Why is OIDC (OpenID Connect) authentication preferred over storing long-lived cloud access keys in GitHub Secrets?'
    ],
    commonPitfalls: [
      'Running terraform apply on uncommitted local files instead of through the authoritative CI pipeline.',
      'Exposing sensitive output values (passwords, private keys) in the public PR comment.',
      'Forgetting to configure a state lock backend (DynamoDB or equivalent), leading to state file corruption.'
    ],
    optionalEnhancements: {
      beginner: ['Add automated cost estimation to the PR comment using Infracost.'],
      intermediate: ['Configure GitHub Environment protection requiring manual team lead approval before apply executes.'],
      advanced: ['Implement automated drift detection running on a nightly cron schedule.'],
      expert: ['Integrate Checkov policy-as-code to enforce custom organizational security rules.']
    },
    completionChecklist: [
      'Terraform configuration authored with remote state backend',
      'TFLint and Trivy IaC security scanning configured',
      'GitHub Actions workflow authored with fmt, validate, and plan',
      'Automated plan output posted as a PR comment verified',
      'Apply job executes exclusively on main branch merge',
      'Zero credentials committed to version control',
      'State locking verified preventing race conditions',
      'IAC_PIPELINE_DOCUMENTATION.md published'
    ]
  },
  {
    id: 'devops-07',
    code: 'DEVOPS-07',
    title: 'Secure DevSecOps Pipeline & Software Supply Chain Security',
    academy: 'devops',
    difficulty: 'Advanced+',
    estimatedTime: '12-16 hours',
    technologies: ['DevSecOps', 'SAST (Semgrep)', 'SCA (Dependency-Check)', 'Secret Scanning (Trufflehog)', 'SBOM (Syft)', 'Cosign Signing'],
    overview: 'Design, implement, and govern a multi-layered DevSecOps pipeline adhering to the SLSA security framework, featuring Static Application Security Testing (SAST), Software Composition Analysis (SCA), pre-commit secret scanning, SBOM generation, and cryptographic artifact signing.',
    tags: ['devops', 'devsecops', 'sast', 'sca', 'sbom', 'cosign', 'supply-chain-security', 'slsa'],
    projectOverview: {
      projectName: 'Secure DevSecOps Pipeline & Software Supply Chain Security',
      academy: 'devops',
      difficulty: 'Advanced+',
      estimatedEffort: '12-16 hours',
      technologies: ['Semgrep (SAST)', 'TruffleHog (Secrets)', 'Syft (SBOM)', 'Cosign (Sigstore)', 'Trivy (SCA)'],
      shortDescription: 'Construct an enterprise DevSecOps pipeline enforcing SAST, dependency vulnerability scanning, secret detection, SBOM generation, and image signing.'
    },
    scenario: 'Following a major software supply chain attack in the industry, your CISO mandated that all deployment pipelines must implement defense-in-depth security: code must pass static security analysis (SAST), dependencies must be scanned for known CVEs (SCA), no plaintext secrets may exist in Git, a Software Bill of Materials (SBOM) must be published, and containers must be cryptographically signed.',
    problemStatement: 'Modern software relies on hundreds of third-party open-source packages. Vulnerabilities can be introduced through source code flaws, compromised dependencies, or tampered container images. A comprehensive DevSecOps pipeline is required to catch security flaws before code reaches production.',
    projectObjective: [
      'Integrate Static Application Security Testing (SAST) using Semgrep to detect OWASP Top 10 code flaws',
      'Implement Software Composition Analysis (SCA) with Trivy to identify vulnerable third-party libraries',
      'Execute automated secret scanning using TruffleHog to detect committed credentials or tokens',
      'Generate a standardized Software Bill of Materials (SBOM) in SPDX/CycloneDX format using Syft',
      'Cryptographically sign the container image and SBOM using Sigstore Cosign'
    ],
    whatYouNeedToBuild: {
      description: 'An enterprise DevSecOps pipeline enforcing automated security gates across every stage of the software delivery lifecycle.',
      diagram: `Developer Git Push
         │
         ▼
[DevSecOps Pipeline Gating Engine]
├── Gate 1: Secret Scanning (TruffleHog) ──> Block if API Keys/Tokens detected
├── Gate 2: SAST Static Code Analysis (Semgrep) ──> Block if SQL Injection/XSS found
├── Gate 3: SCA Dependency Scanner (Trivy/npm audit) ──> Block if Critical CVEs found
├── Gate 4: Build Container & Generate SBOM (Syft - CycloneDX JSON)
└── Gate 5: Sign Image & Attestation (Sigstore Cosign OIDC)
         │
         ▼
[Certified Secure Artifact] ──> Published to Registry with Cryptographic Proof`
    },
    requirements: {
      functional: [
        'Pipeline must fail immediately if high-entropy secrets (AWS keys, private keys, database URLs) are detected',
        'Pipeline must detect and report code-level vulnerabilities (e.g. SQL injection, command execution)',
        'Every published container image must be accompanied by an attached, verifiable SBOM and cryptographic signature'
      ],
      technical: [
        'Use trufflesecurity/trufflehog-action',
        'Use returntocorp/semgrep-action with p/ci ruleset',
        'Generate SBOM using anchore/sbom-action (Syft)',
        'Sign with sigstore/cosign-installer'
      ],
      security: [
        'Enforce SLSA (Supply-chain Levels for Software Artifacts) Level 2+ requirements',
        'Cosign keyless signing using GitHub OIDC identity tokens'
      ]
    },
    architecture: {
      summary: 'Comprehensive software supply chain security architecture incorporating shift-left code analysis, dependency auditing, artifact provenance, and cryptographic non-repudiation.',
      diagram: `Source -> [TruffleHog: Secrets] -> [Semgrep: SAST] -> [Trivy: SCA] -> [Docker Build] -> [Syft: SBOM] -> [Cosign: Sign] -> Registry`,
      components: [
        { name: 'Secret Scanner (TruffleHog)', role: 'Detects over 800+ credential types across git history and pull requests', technologies: ['TruffleHog'] },
        { name: 'SAST Engine (Semgrep)', role: 'Fast, lightweight static analysis scanning source files for semantic vulnerabilities', technologies: ['Semgrep'] },
        { name: 'SBOM Generator (Syft)', role: 'CLI tool extracting comprehensive catalog of installed packages into CycloneDX format', technologies: ['Syft'] },
        { name: 'Signing Engine (Cosign)', role: 'Sigstore utility signing OCI containers and attaching provenance attestations', technologies: ['Cosign'] }
      ]
    },
    technologyRequirements: {
      required: ['GitHub repository', 'GitHub Actions with OIDC enabled', 'GHCR container registry'],
      optional: ['DefectDojo for centralized vulnerability management'],
      outOfScope: ['Hardware security module (HSM) physical integration']
    },
    functionalRequirements: [
      'Author application with sample security test cases',
      'Create .github/workflows/devsecops.yml executing TruffleHog, Semgrep, and Trivy',
      'Configure Semgrep with ruleset p/default and p/owasp-top-ten',
      'Build container and generate SBOM using anchore/sbom-action',
      'Sign image and attach SBOM using cosign attach and cosign sign',
      'Test secret prevention: commit a dummy secret string in a branch and confirm TruffleHog blocks the PR',
      'Test SAST: add an intentional SQL concatenation vulnerability and confirm Semgrep fails the build'
    ],
    technicalRequirements: [
      'Export and verify SBOM in CycloneDX JSON format',
      'Verify signature on the published image using cosign verify'
    ],
    securityRequirements: [
      'Configure workflow permissions with id-token: write for OIDC signing',
      'Ensure security scan results are uploaded to GitHub Security tab via SARIF'
    ],
    constraints: [
      'Do not allow any Critical or High security findings to pass unaddressed',
      'Do not suppress scanner warnings with arbitrary inline ignore comments without justification'
    ],
    expectedOutcome: 'A fortified DevSecOps pipeline delivering mathematical proof of software integrity, zero credentials in code, and verified supply chain provenance.',
    deliverables: [
      'DevSecOps workflow file (.github/workflows/devsecops.yml)',
      'Semgrep configuration ruleset (.semgrep.yml)',
      'Generated and signed SBOM artifact (sbom.cyclonedx.json)',
      'DEVSECOPS_COMPLIANCE_AUDIT.md detailing SLSA compliance, scanner findings, and verification logs'
    ],
    suggestedProjectStructure: `.github/
└── workflows/
    └── devsecops.yml
.semgrep.yml
src/
│   ├── app.js
│   └── db.js
Dockerfile
DEVSECOPS_COMPLIANCE_AUDIT.md`,
    requiredConcepts: [
      { name: 'DevSecOps & Supply Chain Security', lessonId: 'mod-16-1', academyRoute: '/devops' },
      { name: 'Image Security & Vulnerabilities', lessonId: 'mod-04-10', academyRoute: '/devops' },
      { name: 'CI/CD Pipelines & Automation', lessonId: 'mod-09-1', academyRoute: '/devops' },
      { name: 'Security & Compliance Auditing', lessonId: 'mod-16-2', academyRoute: '/devops' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 16: DevSecOps & Supply Chain Security', route: '/cloudstack/devops?concept=mod-16-1' },
        { title: 'Chapter 04: Docker Security & Scanning', route: '/cloudstack/devops?concept=mod-04-10' },
        { title: 'Chapter 09: CI/CD Automation', route: '/cloudstack/devops?concept=mod-09-1' }
      ],
      officialDocs: [
        { title: 'SLSA Framework Overview', url: 'https://slsa.dev/' },
        { title: 'Semgrep Documentation', url: 'https://semgrep.dev/docs/' },
        { title: 'Sigstore Cosign Documentation', url: 'https://docs.sigstore.dev/cosign/overview/' }
      ],
      referenceMaterial: ['NIST Secure Software Development Framework (SSDF) SP 800-218'],
      usefulCommands: [
        'semgrep --config auto .',
        'trufflehog git file://. --since-commit HEAD~1',
        'syft dir:. -o cyclonedx-json=sbom.json',
        'cosign sign --yes <image_ref>',
        'cosign verify <image_ref>'
      ]
    },
    recommendedApproach: [
      '1. Review organizational security baselines and OWASP Top 10 vulnerabilities.',
      '2. Install Semgrep and TruffleHog locally to test scanning commands.',
      '3. Create .github/workflows/devsecops.yml with security validation steps.',
      '4. Add TruffleHog secret scan step scanning full Git commit history.',
      '5. Add Semgrep SAST step scanning source code and exporting SARIF.',
      '6. Add Trivy SCA step scanning dependency manifests (package-lock.json).',
      '7. Add Docker build step producing the container image.',
      '8. Add Syft action generating a CycloneDX SBOM from the built image.',
      '9. Add Cosign keyless signing step signing both the image and the SBOM attestation.',
      '10. Verify verification commands with cosign verify and author DEVSECOPS_COMPLIANCE_AUDIT.md.'
    ],
    importantConsiderations: [
      'Why is secret scanning in CI essential even if developers are supposed to use local pre-commit hooks?',
      'What is an SBOM, and why do enterprise customers and government regulations (Executive Order 14028) require it?',
      'How does keyless signing with Sigstore Fulcio and Rekor eliminate the headache of managing private PGP keys?'
    ],
    commonPitfalls: [
      'Running TruffleHog only on the latest commit instead of the entire PR branch history, allowing secrets to hide in earlier commits.',
      'Generating an SBOM after pushing the image instead of attaching it during the build step.',
      'Failing to configure SARIF uploads, leaving security findings hidden in raw terminal logs.'
    ],
    optionalEnhancements: {
      beginner: ['Configure automated Dependabot or Renovate dependency update pull requests.'],
      intermediate: ['Attach a SLSA provenance attestation using the slsa-framework/slsa-github-generator.'],
      advanced: ['Block merges if license compliance checks find AGPL/GPL dependencies in commercial code.'],
      expert: ['Deploy a Kubernetes admission controller (Kyverno or OPA Gatekeeper) enforcing that only Cosign-signed images can run.']
    },
    completionChecklist: [
      'TruffleHog secret scanning active and verified blocking credential leaks',
      'Semgrep SAST scanning active and verified flagging code flaws',
      'Trivy SCA scanning dependencies for known CVEs',
      'Docker image built and scanned',
      'Software Bill of Materials (SBOM) generated in CycloneDX format',
      'Cosign keyless signing executed and verified',
      'SARIF security reports integrated into GitHub Security tab',
      'DEVSECOPS_COMPLIANCE_AUDIT.md completed'
    ]
  },
  {
    id: 'devops-08',
    code: 'DEVOPS-08',
    title: 'Multi-Environment CI/CD with GitOps Promotion (Dev, Staging, Prod)',
    academy: 'devops',
    difficulty: 'Expert',
    estimatedTime: '14-18 hours',
    technologies: ['GitOps', 'Multi-Environment Promotion', 'GitHub Environments', 'Argo CD / Helm', 'Branching / Tag Strategy'],
    overview: 'Design and implement an enterprise multi-environment Continuous Delivery pipeline with progressive GitOps promotion across Development, Staging, and Production tiers, featuring manual approval gates, automated smoke tests, and rollback triggers.',
    tags: ['devops', 'gitops', 'multi-environment', 'promotion', 'argo-cd', 'helm', 'environments'],
    projectOverview: {
      projectName: 'Multi-Environment CI/CD with GitOps Promotion (Dev, Staging, Prod)',
      academy: 'devops',
      difficulty: 'Expert',
      estimatedEffort: '14-18 hours',
      technologies: ['GitHub Environments', 'GitOps Architecture', 'Argo CD / Manifest Repo', 'Manual Approvals'],
      shortDescription: 'Architect a multi-environment delivery pipeline promoting containerized workloads progressively through Dev, Staging, and Production with approval gates and GitOps synchronization.'
    },
    scenario: 'Your engineering organization needs to eliminate ad-hoc deployments across its three environments: Development, Staging, and Production. Currently, developers deploy experimental branches directly to staging, breaking QA tests, while production deployments lack audit trails. You must build an automated, progressive GitOps promotion pipeline.',
    problemStatement: 'Direct deployments from feature branches bypass integration testing and create configuration drift between environments. An enterprise delivery platform requires structured promotion: commits deploy automatically to Dev, trigger automated smoke tests before advancing to Staging, and require formal peer approval before releasing to Production.',
    projectObjective: [
      'Configure GitHub Environments for Development, Staging, and Production with environment-specific secrets',
      'Enforce Required Reviewers protection rules on the Production environment',
      'Implement progressive promotion: build once, promote the identical immutable image digest across all tiers',
      'Structure a declarative GitOps repository separating application code from environment manifests',
      'Execute automated integration smoke tests in Staging before opening the Production release gate'
    ],
    whatYouNeedToBuild: {
      description: 'A multi-environment promotion pipeline advancing container images through Dev, Staging, and Production with automated validation and human sign-off.',
      diagram: `Merge to main Branch
         │
         ▼ (Build & Publish Immutable Digest @sha256:...)
[1. Deploy to Development Environment] (Automated, continuous)
         │
         ▼ (Automated API Health & Smoke Tests)
[2. Deploy to Staging Environment] (Automated pre-production testing)
         │
         ▼
[3. Production Gatekeeper: Required Reviewer Approval]
         │ (Lead Engineer / Product Owner Sign-off)
         ▼
[4. Deploy to Production Environment] (Zero-downtime rolling release)`
    },
    requirements: {
      functional: [
        'Every commit on main must automatically deploy to Development and run smoke tests',
        'Upon passing smoke tests, code must automatically promote to Staging',
        'Deploying to Production must halt and require explicit manual authorization in GitHub UI',
        'The exact same container image digest (@sha256) must be promoted through all environments'
      ],
      technical: [
        'Configure GitHub Environments: development, staging, production',
        'Use environment: production with protected reviewers in workflow YAML',
        'Separate configuration variables per environment (DEV_DB_URL, STAGING_DB_URL, PROD_DB_URL)'
      ],
      security: [
        'Production secrets must be inaccessible from Development and Staging jobs',
        'Audit trail must record who approved the production deployment and when'
      ]
    },
    architecture: {
      summary: 'Progressive delivery pipeline architecture enforcing environment boundary isolation, immutable artifact promotion, and human-in-the-loop governance.',
      diagram: `Build Artifact (Digest) ──> Dev Tier ──(Smoke Test)──> Staging Tier ──(Approval Gate)──> Production Tier`,
      components: [
        { name: 'GitHub Environments', role: 'Role-based deployment target isolating environment secrets and approval policies', technologies: ['GitHub Environments'] },
        { name: 'Progressive Pipeline Runner', role: 'Multi-stage workflow orchestrating sequential environment deployments', technologies: ['GitHub Actions'] },
        { name: 'Smoke Test Suite', role: 'Synthetic end-to-end integration tests verifying API availability and database connectivity', technologies: ['curl / Postman / Newman'] },
        { name: 'GitOps Manifest Engine', role: 'Declarative configuration specifying target image digest per environment', technologies: ['YAML / Helm / Kustomize'] }
      ]
    },
    technologyRequirements: {
      required: ['GitHub repository with GitHub Actions', '3 target environments (can be simulated via Docker networks or directories)'],
      optional: ['Argo CD or Flux controller for Kubernetes-native GitOps'],
      outOfScope: ['Physical bare-metal data center cabling']
    },
    functionalRequirements: [
      'Configure GitHub repository Environments: development, staging, and production',
      'Add Required Reviewers protection rule on production environment',
      'Create .github/workflows/multi-env-deploy.yml with sequential jobs: build, deploy-dev, smoke-test-dev, deploy-staging, smoke-test-staging, deploy-prod',
      'Pass immutable image tag across all deployment stages',
      'Run smoke tests in staging verifying HTTP 200 and database responses',
      'Verify workflow pauses at deploy-prod waiting for human review',
      'Approve production deployment and verify successful completion'
    ],
    technicalRequirements: [
      'Document environment URL outputs in GitHub Actions deployment history',
      'Verify rollback capability: re-running an older workflow run successfully deploys that past version'
    ],
    securityRequirements: [
      'Ensure developer accounts cannot self-approve their own production deployments if strict separation of duties is configured'
    ],
    constraints: [
      'Do not rebuild the container image between environments (build once, promote everywhere)',
      'Do not allow production deployments to proceed if staging smoke tests fail'
    ],
    expectedOutcome: 'An enterprise multi-environment delivery pipeline delivering zero-drift progressive promotion across Dev, Staging, and Production with certified audit trails.',
    deliverables: [
      'Multi-environment workflow configuration (.github/workflows/multi-env-deploy.yml)',
      'Environment manifest configurations (dev.compose.yaml, staging.compose.yaml, prod.compose.yaml)',
      'Automated smoke test script (smoke-test.sh)',
      'PROMOTION_STRATEGY_RUNBOOK.md detailing environment topology, approval procedures, and rollback protocols'
    ],
    suggestedProjectStructure: `.github/
└── workflows/
    └── multi-env-deploy.yml
environments/
├── dev/
│   └── compose.yaml
├── staging/
│   └── compose.yaml
└── production/
    └── compose.yaml
scripts/
└── smoke-test.sh
PROMOTION_STRATEGY_RUNBOOK.md`,
    requiredConcepts: [
      { name: 'Release Management & Promotion', lessonId: 'mod-09-4', academyRoute: '/devops' },
      { name: 'Continuous Deployment & Delivery', lessonId: 'mod-09-3', academyRoute: '/devops' },
      { name: 'GitOps Synchronization', lessonId: 'mod-17-1', academyRoute: '/devops' },
      { name: 'Site Reliability Engineering', lessonId: 'mod-24-1', academyRoute: '/devops' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 09: Release Management & Environments', route: '/cloudstack/devops?concept=mod-09-4' },
        { title: 'Chapter 17: GitOps & Progressive Delivery', route: '/cloudstack/devops?concept=mod-17-1' },
        { title: 'Chapter 24: SRE & Production Operations', route: '/cloudstack/devops?concept=mod-24-1' }
      ],
      officialDocs: [
        { title: 'Using environments for deployment - GitHub Docs', url: 'https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment' },
        { title: 'GitOps Principles (OpenGitOps)', url: 'https://opengitops.dev/' }
      ],
      referenceMaterial: ['Accelerate: Building and Scaling High Performing Technology Organizations (Forsgren, Humble, Kim)'],
      usefulCommands: [
        'gh workflow run multi-env-deploy.yml',
        'gh run view --web',
        'curl -f -s http://staging.internal/api/healthz'
      ]
    },
    recommendedApproach: [
      '1. Create the three GitHub Environments (development, staging, production) in repository settings.',
      '2. Configure required reviewers and deployment branches on production.',
      '3. Structure environment configuration folders (dev, staging, production).',
      '4. Author the build job compiling the container image and generating its digest hash.',
      '5. Author deploy-dev job targeting development environment and updating dev container.',
      '6. Author smoke test step executing synthetic API queries against dev.',
      '7. Author deploy-staging job promoting the identical image digest to staging.',
      '8. Author deploy-prod job referencing environment: production.',
      '9. Test pipeline: observe automatic progression through dev and staging, then inspect the approval prompt.',
      '10. Approve production release, verify zero-downtime rollout, and author PROMOTION_STRATEGY_RUNBOOK.md.'
    ],
    importantConsiderations: [
      'Why is the "build once, promote everywhere" principle fundamental to reliable Continuous Delivery?',
      'How do GitHub Environments isolate production credentials from developers with write access to feature branches?',
      'What are the trade-offs between automated canary deployments and manual production approval gates?'
    ],
    commonPitfalls: [
      'Rebuilding Docker images from source in each environment stage, producing slightly different binary dependencies.',
      'Failing to run automated smoke tests in staging before opening the production approval gate.',
      'Allowing hotfixes to be applied directly to production without backporting them through dev and staging.'
    ],
    optionalEnhancements: {
      beginner: ['Add automated deployment status comments on the associated GitHub issue or PR.'],
      intermediate: ['Implement automated canary traffic shifting (10% -> 50% -> 100%) using Traefik or Nginx.'],
      advanced: ['Integrate Argo CD to manage the Kubernetes GitOps synchronization of environment manifests.'],
      expert: ['Set up automated rollback triggered by Prometheus error rate alerts during production deployments.']
    },
    completionChecklist: [
      'GitHub Environments (dev, staging, prod) created with distinct secrets',
      'Production environment configured with Required Reviewer protection rules',
      'Multi-stage pipeline authored with progressive promotion sequencing',
      'Single immutable container digest promoted across all environments',
      'Automated smoke test suite validates staging health before production',
      'Manual approval gate successfully holds production deployment until sign-off',
      'Production deployment succeeds after approval',
      'PROMOTION_STRATEGY_RUNBOOK.md published'
    ]
  },
  {
    id: 'devops-09',
    code: 'DEVOPS-09',
    title: 'Production Deployment Platform & SRE Observability Suite',
    academy: 'devops',
    difficulty: 'Expert / Production',
    estimatedTime: '16-20 hours',
    technologies: ['Prometheus & Grafana', 'OpenTelemetry (OTel)', 'Alertmanager', 'SLO / SLI Metrics', 'Incident Management', 'Blackbox Exporter'],
    overview: 'Architect and deploy an enterprise Site Reliability Engineering (SRE) observability platform, instrumenting distributed application telemetry, Service Level Objectives (SLOs), error budget alerting, synthetic health probes, and incident management.',
    tags: ['devops', 'sre', 'observability', 'prometheus', 'grafana', 'opentelemetry', 'sli-slo', 'alertmanager'],
    projectOverview: {
      projectName: 'Production Deployment Platform & SRE Observability Suite',
      academy: 'devops',
      difficulty: 'Expert / Production',
      estimatedEffort: '16-20 hours',
      technologies: ['Prometheus', 'Grafana', 'Alertmanager', 'Blackbox Exporter', 'OpenTelemetry'],
      shortDescription: 'Deploy an enterprise SRE observability platform defining Service Level Indicators (SLIs), monitoring Error Budgets, and routing automated alerts to incident responders.'
    },
    scenario: 'Your production microservice platform experienced a 45-minute customer outage that went undetected because basic CPU/RAM alerts stayed green while application HTTP 500 error rates skyrocketed. Leadership has mandated that the engineering team transition from infrastructure alerts to customer-centric SRE principles: Service Level Objectives (SLOs), Service Level Indicators (SLIs), and multi-window burn rate alerts.',
    problemStatement: 'Monitoring only server resource metrics (CPU, disk) fails to detect user-facing software failures. SRE best practices require measuring the Four Golden Signals (Latency, Traffic, Errors, Saturation), tracking Error Budget consumption, and alerting only on actionable, high-severity degradations.',
    projectObjective: [
      'Instrument applications with Prometheus client metrics exporting HTTP request count, duration, and error codes',
      'Deploy Prometheus, Alertmanager, Grafana, and Blackbox Exporter using Docker Compose',
      'Formulate concrete SLIs and SLOs (e.g. 99.9% of requests must return HTTP 200 in < 250ms over 30 days)',
      'Configure Alertmanager multi-window multi-burn-rate alert rules',
      'Deploy Blackbox Exporter for external synthetic probing of production HTTP endpoints'
    ],
    whatYouNeedToBuild: {
      description: 'An enterprise SRE observability platform monitoring Golden Signals, calculating Error Budget burn, and managing automated alert routing.',
      diagram: `Synthetic Probe (Blackbox Exporter) ──┐
                                          │
User Traffic ──> [Application Microservice (:3000)]
                 └── Exports: /metrics (Prometheus Client Library)
                           │
                           ▼ (Scrapes every 15s)
                 [Prometheus TSDB Server (:9090)]
                 ├── SLI Engine: Rate of 200s vs total requests
                 ├── Error Budget Calculation (99.9% SLO)
                 └── Multi-Burn-Rate Alert Rules
                           │
         ┌─────────────────┴─────────────────┐
         ▼ (Alert Triggered)                 ▼ (Visual Dashboards)
[Alertmanager (:9093)]              [Grafana Dashboard (:3000)]
├── Deduplication & Grouping        ├── Four Golden Signals Dashboard
└── Routes to Webhook / PagerDuty   └── Live Error Budget Gauge (100% -> 0%)`
    },
    requirements: {
      functional: [
        'Application must export Prometheus formatted metrics (/metrics) for request latency histograms and response codes',
        'Prometheus must evaluate error burn rates and fire alerts when error budget depletion exceeds critical thresholds',
        'Grafana must render an executive SRE dashboard showing current SLI compliance and remaining Error Budget'
      ],
      technical: [
        'Define alert rules in /etc/prometheus/alert.rules.yml using PromQL',
        'Configure Alertmanager routing in alertmanager.yml with group_by, group_wait, and repeat_interval',
        'Deploy Prometheus Blackbox Exporter testing external HTTP status and SSL certificate expiry'
      ],
      security: [
        'Protect Grafana and Alertmanager management interfaces with strong authentication',
        'Do not expose Prometheus scrape endpoints to unauthorized external networks'
      ]
    },
    architecture: {
      summary: 'Site Reliability Engineering telemetry architecture integrating application-level instrumentation, synthetic external probes, time-series analysis, and automated notification routing.',
      diagram: `App Metrics + Blackbox Probes ──> Prometheus Time-Series Core ──> Alertmanager Engine ──> Incident Notification`,
      components: [
        { name: 'Prometheus Server', role: 'Time-series database collecting metrics and evaluating PromQL SLI expressions', technologies: ['Prometheus'] },
        { name: 'Alertmanager', role: 'Alert deduplication, grouping, silencing, and notification routing engine', technologies: ['Alertmanager'] },
        { name: 'Blackbox Exporter', role: 'Endpoint prober verifying external availability and TLS certificate health', technologies: ['Blackbox Exporter'] },
        { name: 'SRE Grafana Suite', role: 'Executive and operational dashboards visualizing Error Budget burn and latency percentiles', technologies: ['Grafana'] }
      ]
    },
    technologyRequirements: {
      required: ['Docker Engine with Compose v2', 'Prometheus', 'Grafana', 'Alertmanager', 'Blackbox Exporter'],
      optional: ['k6 or locust for load and error simulation'],
      outOfScope: ['Proprietary SaaS monitoring tools (Datadog/NewRelic)']
    },
    functionalRequirements: [
      'Deploy sample web service exporting http_requests_total and http_request_duration_seconds',
      'Create compose.yaml running web, prometheus, alertmanager, grafana, and blackbox-exporter',
      'Configure prometheus.yml to scrape web:3000/metrics and blackbox-exporter:9115',
      'Author alert rules in alert.rules.yml evaluating 14.4x burn rate (2% budget in 1 hour)',
      'Launch simulated traffic generator introducing 5% HTTP 500 errors',
      'Observe alert firing in Prometheus /alerts and received by Alertmanager',
      'Verify Grafana dashboard displays Error Budget drop and latency percentiles (p50, p95, p99)'
    ],
    technicalRequirements: [
      'Document PromQL SLI calculation: sum(rate(http_requests_total{status=~"2.."}[5m])) / sum(rate(http_requests_total[5m]))',
      'Verify Alertmanager webhook notification payload receives firing alert'
    ],
    securityRequirements: [
      'Ensure webhook notification channels use authenticated endpoints or token headers'
    ],
    constraints: [
      'Do not set alert thresholds based on arbitrary static numbers (e.g. "alert if > 10 errors")',
      'All alert triggers must be derived mathematically from the defined SLO target'
    ],
    expectedOutcome: 'An enterprise-grade SRE observability platform providing mathematical visibility into customer reliability, Error Budget consumption, and actionable incident alerts.',
    deliverables: [
      'Observability stack compose.yaml',
      'Prometheus configuration and alert rules (prometheus.yml, alert.rules.yml)',
      'Alertmanager routing configuration (alertmanager.yml)',
      'Exported Grafana SRE Dashboard JSON',
      'SRE_OBSERVABILITY_SLO_MANUAL.md documenting SLI equations, error budget policies, and incident response procedures'
    ],
    suggestedProjectStructure: `sre-observability/
├── compose.yaml
├── prometheus/
│   ├── prometheus.yml
│   └── alert.rules.yml
├── alertmanager/
│   └── alertmanager.yml
├── blackbox/
│   └── blackbox.yml
├── grafana/
│   └── dashboards/sre-dashboard.json
├── app/
│   └── server.js
└── SRE_OBSERVABILITY_SLO_MANUAL.md`,
    requiredConcepts: [
      { name: 'Site Reliability Engineering (SRE)', lessonId: 'mod-24-1', academyRoute: '/devops' },
      { name: 'SLIs, SLOs & Error Budgets', lessonId: 'mod-24-2', academyRoute: '/devops' },
      { name: 'Full-Stack Observability', lessonId: 'mod-14-1', academyRoute: '/devops' },
      { name: 'Metrics, Logs & Alerting', lessonId: 'mod-14-2', academyRoute: '/devops' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 24: SRE & Incident Management', route: '/cloudstack/devops?concept=mod-24-1' },
        { title: 'Chapter 24: SLIs, SLOs & Error Budgets', route: '/cloudstack/devops?concept=mod-24-2' },
        { title: 'Chapter 14: Full-Stack Observability', route: '/cloudstack/devops?concept=mod-14-1' }
      ],
      officialDocs: [
        { title: 'Google SRE Book - Monitoring Distributed Systems', url: 'https://sre.google/sre-book/monitoring-distributed-systems/' },
        { title: 'Google SRE Book - Alerting on SLOs', url: 'https://sre.google/workbook/alerting-on-slos/' },
        { title: 'Prometheus Alerting Rules', url: 'https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/' }
      ],
      referenceMaterial: ['The Site Reliability Workbook (Betsy Beyer et al.)'],
      usefulCommands: [
        'curl http://localhost:9090/api/v1/rules',
        'curl http://localhost:9093/api/v2/alerts',
        'promtool check config prometheus/prometheus.yml',
        'promtool check rules prometheus/alert.rules.yml'
      ]
    },
    recommendedApproach: [
      '1. Instrument the web application with prometheus-client tracking request counts and latency histograms.',
      '2. Define the SLO: 99.9% availability and 95% of requests < 200ms over 30 days.',
      '3. Calculate the Error Budget (0.1% allowable failures).',
      '4. Author PromQL SLI expressions and test in Prometheus expression browser.',
      '5. Author alert.rules.yml defining multi-window burn rate alert rules (1-hour and 6-hour windows).',
      '6. Configure Alertmanager to group and route alerts to a webhook endpoint or log receiver.',
      '7. Configure Blackbox Exporter to probe the external health of the API.',
      '8. Build an SRE dashboard in Grafana showing Golden Signals, SLI percentage, and remaining Error Budget.',
      '9. Run a failure injection script introducing 500 errors to verify alert firing and budget burn.',
      '10. Author SRE_OBSERVABILITY_SLO_MANUAL.md with incident triage runbooks.'
    ],
    importantConsiderations: [
      'Why is alerting on Multi-Window Multi-Burn-Rate superior to simple static threshold alerting?',
      'How does an Error Budget empower engineering teams to balance release velocity against platform stability?',
      'What are the Four Golden Signals defined by Google SRE, and how do they map to Prometheus metrics?'
    ],
    commonPitfalls: [
      'Creating hundreds of low-value alerts that trigger alert fatigue and cause engineers to ignore real incidents.',
      'Using the wrong PromQL rate interval (e.g. rate[1m] with a 1m scrape interval, causing jagged or missing data).',
      'Alerting on CPU or memory utilization instead of user-impacting latency and error rates.'
    ],
    optionalEnhancements: {
      beginner: ['Configure automated alert silencing in Alertmanager during scheduled maintenance windows.'],
      intermediate: ['Integrate PagerDuty or Opsgenie webhook for simulated on-call escalation.'],
      advanced: ['Implement OpenTelemetry distributed tracing (Jaeger) alongside Prometheus metrics.'],
      expert: ['Build an automated Error Budget policy that halts CI/CD deployments when budget reaches 0%.']
    },
    completionChecklist: [
      'Application instrumented with Prometheus metrics (/metrics)',
      'Prometheus, Alertmanager, Grafana, and Blackbox Exporter deployed via Compose',
      'SLI and SLO mathematically defined and documented',
      'Multi-window multi-burn-rate alert rules authored and validated with promtool',
      'Alertmanager routing verified sending alert notifications',
      'Grafana SRE dashboard visualizes Four Golden Signals and Error Budget',
      'Failure injection test confirms alert firing and budget depletion',
      'SRE_OBSERVABILITY_SLO_MANUAL.md completed'
    ]
  },
  {
    id: 'devops-10',
    code: 'DEVOPS-10',
    title: 'End-to-End Enterprise DevOps Platform Architecture',
    academy: 'devops',
    difficulty: 'Production Grade',
    estimatedTime: '16-24 hours',
    technologies: ['GitOps (Argo CD)', 'Infrastructure as Code (Terraform)', 'Kubernetes / Containers', 'DevSecOps', 'Observability (Prometheus/Grafana)', 'Disaster Recovery'],
    overview: 'The pinnacle DevOps engineering project: architect, build, automate, and operate an end-to-end enterprise platform combining Infrastructure as Code, automated DevSecOps CI pipelines, GitOps continuous delivery, multi-cluster Kubernetes orchestration, full-stack observability, and automated disaster recovery.',
    tags: ['devops', 'production-grade', 'gitops', 'enterprise', 'terraform', 'kubernetes', 'argo-cd', 'devsecops'],
    projectOverview: {
      projectName: 'End-to-End Enterprise DevOps Platform Architecture',
      academy: 'devops',
      difficulty: 'Production Grade',
      estimatedEffort: '16-24 hours',
      technologies: ['GitOps (Argo CD)', 'Terraform', 'Kubernetes', 'GitHub Actions', 'Prometheus & Grafana'],
      shortDescription: 'The master DevOps capstone: architect an enterprise-grade platform integrating IaC provisioning, secure CI pipelines, GitOps continuous delivery, and full-stack observability.'
    },
    scenario: 'You have been hired as Principal Platform Architect for a global fintech enterprise migrating from legacy virtual machines to a modern cloud-native platform. You must architect and deliver the entire end-to-end engineering ecosystem: cloud infrastructure provisioned via Terraform, automated DevSecOps CI pipelines compiling signed container images, GitOps continuous delivery via Argo CD, and full-stack SRE observability.',
    problemStatement: 'Modern enterprise engineering demands seamless integration across the entire DevOps lifecycle. Fragmented pipelines, manual infrastructure steps, and disconnected monitoring cause deployment friction, security vulnerabilities, and prolonged downtime. A unified, fully automated platform is required.',
    projectObjective: [
      'Provision cloud infrastructure and Kubernetes cluster foundations using Infrastructure as Code (Terraform)',
      'Implement an automated DevSecOps CI pipeline (GitHub Actions) executing linting, unit testing, SAST, SCA, and signed container publishing',
      'Deploy and configure GitOps continuous delivery (Argo CD) synchronizing application manifests from a dedicated GitOps repository',
      'Implement an SRE observability suite (Prometheus, Grafana, Alertmanager) monitoring cluster and application health',
      'Execute a disaster recovery drill: simulate complete cluster deletion and reconstruct the entire platform from code in under 20 minutes'
    ],
    whatYouNeedToBuild: {
      description: 'A complete, production-grade enterprise DevOps platform spanning infrastructure provisioning, continuous integration, GitOps continuous delivery, and observability.',
      diagram: `Developer Commits Source Code ──> [App Repo]
                                            │
                                            ▼
                       [GitHub Actions DevSecOps CI Pipeline]
                       ├── Lint & Unit Tests
                       ├── SAST (Semgrep) & Secret Scan (TruffleHog)
                       ├── Buildx Multi-Arch Container Build
                       ├── Trivy CVE Gate & Syft SBOM Generation
                       └── Push & Cosign Sign ──> [Container Registry (GHCR)]
                                                        │
                      (Automated PR bumps tag)          │
                                                        ▼
Developer Commits Manifest ──> [GitOps Manifest Repo (Helm/Kustomize)]
                                            │
                                            ▼ (Continuous Reconciliation)
                       [Argo CD GitOps Controller]
                                            │
                                            ▼ (Deploys to Cluster)
                       [Kubernetes Production Cluster]
                       ├── Ingress Controller (TLS Termination)
                       ├── Scaled Microservice Replicas (Zero-Downtime)
                       ├── Secrets Management (Vault / SealedSecrets)
                       └── Full-Stack Telemetry (Prometheus & Grafana)`
    },
    requirements: {
      functional: [
        'Pushing a code change to the application repository must automatically build, scan, sign, and update the GitOps repository',
        'Argo CD must automatically reconcile and deploy the new image digest to the Kubernetes cluster within 60 seconds',
        'In the event of total cluster loss, the platform must be entirely reproducible via terraform apply and GitOps sync in < 20 minutes'
      ],
      technical: [
        'Use Terraform for infrastructure provisioning (VPC, compute/cluster resources)',
        'Use GitHub Actions for CI and Argo CD / Flux for GitOps CD',
        'Implement zero-downtime rolling updates with readiness and liveness probes'
      ],
      security: [
        'Enforce SLSA Level 3 supply chain security: all images cryptographically signed with Cosign',
        'Enforce Kubernetes Pod Security Standards (restricted profile)'
      ]
    },
    architecture: {
      summary: 'Unified enterprise DevOps ecosystem integrating declarative IaC, automated supply-chain-secure CI, pull-based GitOps deployment, and cloud-native observability.',
      diagram: `Code Repo ──> DevSecOps CI ──> GHCR Registry <── Argo CD Controller <── Manifest Repo ──> K8s Cluster`,
      components: [
        { name: 'Terraform IaC Layer', role: 'Automates provisioning of network, storage, and cluster resources', technologies: ['Terraform CLI'] },
        { name: 'DevSecOps CI Suite', role: 'Validates code quality, scans for vulnerabilities, and signs container artifacts', technologies: ['GitHub Actions', 'Cosign'] },
        { name: 'GitOps Controller (Argo CD)', role: 'Continuous delivery operator ensuring live cluster matches desired Git state', technologies: ['Argo CD', 'Kustomize'] },
        { name: 'Kubernetes Workload Tier', role: 'High-availability container runtime executing resilient application pods', technologies: ['Kubernetes', 'Ingress-Nginx'] },
        { name: 'SRE Observability Tier', role: 'Full-stack monitoring engine tracking Golden Signals and SLI metrics', technologies: ['Prometheus', 'Grafana'] }
      ]
    },
    technologyRequirements: {
      required: ['Terraform 1.5+', 'Kubernetes (Minikube, Kind, k3s, or Cloud EKS/GKE)', 'Argo CD', 'GitHub Actions', 'Docker Engine'],
      optional: ['HashiCorp Vault for dynamic secret leasing'],
      outOfScope: ['Legacy bare-metal mainframe systems']
    },
    functionalRequirements: [
      'Provision local or cloud Kubernetes cluster using Terraform IaC scripts',
      'Deploy Argo CD controller into the cluster and configure GitOps application definition',
      'Configure application CI pipeline building, scanning, and signing container images',
      'Configure automated GitOps manifest update upon successful image publication',
      'Observe Argo CD synchronizing and rolling out the new deployment',
      'Execute continuous load test during deployment to verify zero dropped requests',
      'Simulate disaster: destroy cluster and recreate from Terraform + GitOps in under 20 minutes'
    ],
    technicalRequirements: [
      'Document end-to-end lead time from git commit to live production rollout',
      'Verify Argo CD self-healing: manually delete a pod or deployment and observe automated restoration'
    ],
    securityRequirements: [
      'Kubernetes workloads must run with runAsNonRoot: true and readOnlyRootFilesystem: true',
      'Zero plaintext secrets stored in the GitOps manifest repository'
    ],
    constraints: [
      'Never execute kubectl apply manually for production workloads (all changes must flow through GitOps)',
      'Do not bypass CI security gates under any circumstances'
    ],
    expectedOutcome: 'A world-class, enterprise-grade cloud platform uniting Infrastructure as Code, DevSecOps supply chain security, GitOps continuous delivery, and full-stack observability.',
    deliverables: [
      'Terraform infrastructure provisioning modules',
      'Application source code and DevSecOps CI workflow (.github/workflows/ci-cd.yml)',
      'GitOps manifest repository (deployment.yaml, service.yaml, kustomization.yaml)',
      'Argo CD Application manifest (application.yaml)',
      'ENTERPRISE_DEVOPS_PLATFORM_SPECIFICATION.md detailing architecture, supply chain security, GitOps workflows, and DR drill logs',
      'PLATFORM_DISASTER_RECOVERY_POSTMORTEM.md detailing the simulated cluster reconstruction drill'
    ],
    suggestedProjectStructure: `enterprise-devops-platform/
├── infrastructure/ (Terraform)
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── app-source/
│   ├── .github/workflows/ci-cd.yml
│   ├── Dockerfile
│   └── src/
├── gitops-manifests/
│   ├── base/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── kustomization.yaml
│   └── overlays/production/
├── argocd/
│   └── application.yaml
├── ENTERPRISE_DEVOPS_PLATFORM_SPECIFICATION.md
└── PLATFORM_DISASTER_RECOVERY_POSTMORTEM.md`,
    requiredConcepts: [
      { name: 'GitOps Synchronization & Argo CD', lessonId: 'mod-17-1', academyRoute: '/devops' },
      { name: 'Infrastructure as Code & Terraform', lessonId: 'mod-10-1', academyRoute: '/devops' },
      { name: 'DevSecOps & Supply Chain Security', lessonId: 'mod-16-1', academyRoute: '/devops' },
      { name: 'CI/CD Pipelines & Automation', lessonId: 'mod-09-1', academyRoute: '/devops' },
      { name: 'Site Reliability Engineering & Monitoring', lessonId: 'mod-24-1', academyRoute: '/devops' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 17: GitOps & Argo CD', route: '/cloudstack/devops?concept=mod-17-1' },
        { title: 'Chapter 10: Infrastructure as Code (Terraform)', route: '/cloudstack/devops?concept=mod-10-1' },
        { title: 'Chapter 16: DevSecOps & Supply Chain Security', route: '/cloudstack/devops?concept=mod-16-1' },
        { title: 'Chapter 09: CI/CD Pipelines & Automation', route: '/cloudstack/devops?concept=mod-09-1' },
        { title: 'Chapter 24: SRE & Observability', route: '/cloudstack/devops?concept=mod-24-1' }
      ],
      officialDocs: [
        { title: 'Argo CD Documentation', url: 'https://argo-cd.readthedocs.io/en/stable/' },
        { title: 'OpenGitOps Standard', url: 'https://opengitops.dev/' },
        { title: 'The CNCF Cloud Native Interactive Landscape', url: 'https://landscape.cncf.io/' }
      ],
      referenceMaterial: ['Cloud Native DevOps with Kubernetes (John Arundel & Justin Domingus)'],
      usefulCommands: [
        'terraform apply -auto-approve',
        'kubectl apply -n argocd -f argocd/application.yaml',
        'argocd app get my-platform-app',
        'argocd app sync my-platform-app',
        'cosign verify ghcr.io/org/app:latest'
      ]
    },
    recommendedApproach: [
      '1. Review enterprise platform requirements, compliance standards, and RTO/RPO targets.',
      '2. Author Terraform infrastructure code provisioning Kubernetes cluster and networking.',
      '3. Apply Terraform code and verify healthy cluster nodes using kubectl get nodes.',
      '4. Install Argo CD into the cluster and expose the web console.',
      '5. Author the application source code, Dockerfile, and GitHub Actions DevSecOps workflow.',
      '6. Configure the CI pipeline to build, scan, sign, and push images to GHCR.',
      '7. Author the GitOps manifest repository with Kustomize deployment and service YAMLs.',
      '8. Configure Argo CD Application manifest to track the GitOps repository.',
      '9. Verify automated sync: push code change, observe CI build, watch Argo CD reconcile pods in cluster.',
      '10. Execute disaster recovery drill: wipe cluster, run terraform apply + Argo CD sync, record recovery timing in ENTERPRISE_DEVOPS_PLATFORM_SPECIFICATION.md.'
    ],
    importantConsiderations: [
      'Why is separating application source code repositories from GitOps manifest repositories recommended by CNCF best practices?',
      'How does pull-based GitOps (Argo CD) provide higher security than push-based CI deployment scripts?',
      'What are the critical architectural components required to achieve sub-20-minute total disaster recovery?'
    ],
    commonPitfalls: [
      'Allowing CI pipelines to directly execute kubectl apply from runner VMs, exposing cluster administrative credentials.',
      'Storing unencrypted secrets in the GitOps repository without SealedSecrets or external secrets operators.',
      'Neglecting to test disaster recovery procedures against a completely clean environment.'
    ],
    optionalEnhancements: {
      beginner: ['Configure Argo CD notifications to Slack on sync failure.'],
      intermediate: ['Integrate SealedSecrets or External Secrets Operator with AWS Secrets Manager.'],
      advanced: ['Implement automated canary progressive delivery using Argo Rollouts and Prometheus metrics.'],
      expert: ['Deploy a Service Mesh (Istio) enforcing mutual TLS (mTLS) and fine-grained authorization policies.']
    },
    completionChecklist: [
      'Terraform provisions cluster infrastructure cleanly',
      'Argo CD installed and configured as GitOps controller',
      'DevSecOps CI pipeline enforces linting, testing, SAST, SCA, and Cosign signing',
      'Images published with immutable digests to GHCR',
      'GitOps manifest repository structured with Kustomize',
      'Argo CD automatically synchronizes and updates running pods upon commit',
      'Full disaster recovery drill executed (total recovery in < 20 minutes verified)',
      'ENTERPRISE_DEVOPS_PLATFORM_SPECIFICATION.md and PLATFORM_DISASTER_RECOVERY_POSTMORTEM.md published'
    ]
  }
];

const allDevOpsCapstones = [...devopsCapstones, ...remainingDevOpsCapstones];

// Add legacy fields for backward compatibility
const enrichedCapstones = allDevOpsCapstones.map((cap) => {
  return {
    ...cap,
    objectives: cap.projectObjective,
    startingState: {
      description: `CI/CD and DevOps environment for ${cap.title}`,
      environment: 'DevOps Platform (GitHub Actions / Linux / Docker / Cloud CLI)',
      startingFiles: {
        'ci.yml': `# ${cap.title}\nname: CI Pipeline\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n`,
        'README.md': `# ${cap.title}\n\n${cap.overview}\n`
      }
    },
    tasks: cap.functionalRequirements.map((req, idx) => ({
      id: `task-${idx + 1}`,
      title: req,
      objective: req,
      commandSnippet: cap.resources.usefulCommands[idx % cap.resources.usefulCommands.length] || 'git status',
      expectedOutput: 'Action completed successfully.',
      verificationCriteria: req
    })),
    failureScenarios: [
      {
        id: 'fail-1',
        title: cap.commonPitfalls[0] || 'Pipeline execution failure',
        symptom: 'GitHub Actions workflow fails with exit code 1.',
        rootCause: 'Failing linter, syntax error, or unhandled exception in pipeline step.',
        diagnosticCommand: 'gh run view --log-failed',
        fixCommand: 'git commit -am "fix: resolve pipeline issue" && git push',
        verification: 'Pipeline turns green.'
      },
      {
        id: 'fail-2',
        title: cap.commonPitfalls[1] || 'Security scan or credential rejection',
        symptom: 'Security scanner fails job due to detected vulnerability or exposed secret.',
        rootCause: 'Outdated dependency or high-entropy secret detected.',
        diagnosticCommand: 'trivy image --severity HIGH,CRITICAL <image>',
        fixCommand: 'npm update && git commit -am "chore: patch dependencies"',
        verification: 'Security scan passes cleanly.'
      }
    ],
    validationChecks: cap.completionChecklist.map((check, idx) => ({
      id: `val-${idx + 1}`,
      label: check,
      verificationCommand: 'git status',
      points: Math.round(100 / cap.completionChecklist.length)
    })),
    scoreMax: 100
  };
});

const outPath = path.join(__dirname, '../data/devopsCapstones.ts');
const fileContent = `import { CapstoneProject } from '../types';\n\nexport const DEVOPS_CAPSTONES: CapstoneProject[] = ${JSON.stringify(enrichedCapstones, null, 2)};\n`;

fs.writeFileSync(outPath, fileContent, 'utf-8');
console.log(`Successfully generated 10 DevOps Capstones at ${outPath}`);
