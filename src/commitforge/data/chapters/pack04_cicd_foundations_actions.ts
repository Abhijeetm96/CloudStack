import { buildCommitForgeConcept } from '../conceptFactory';
import { AcademyTopic } from '../unifiedAcademyData';

// ============================================================================
// CHAPTER 21: CI/CD FUNDAMENTALS (21.1 to 21.13)
// ============================================================================
export const CHAPTER_21: AcademyTopic = {
  id: 'ch-21',
  number: '21',
  title: 'CI/CD Fundamentals',
  description: 'Understand Continuous Integration, Delivery, and Deployment: the problem before CI/CD, manual testing bottlenecks, and the automated pipeline mental model.',
  iconName: 'PlayCircle',
  conceptCount: 13,
  concepts: [
    buildCommitForgeConcept({
      id: 'c-21-01', subChapterNumber: '21.1', command: 'CI/CD Overview', title: 'What is CI?',
      topicId: 'ch-21', topicNumber: '21', topicTitle: 'CI/CD Fundamentals',
      subtitle: 'Continuous Integration: automatically validating every code commit with builds and tests',
      badges: ['Foundations', 'CI/CD Core'],
      whatIsIt: 'Continuous Integration (CI) is the practice of automating the integration of code changes from multiple contributors into a single software project multiple times a day.',
      realWorldScenario: 'Developers commit code to a shared repository. An automated server checks out the code, compiles it, runs test suites, and flags any regressions within 5 minutes.',
    }),
    buildCommitForgeConcept({
      id: 'c-21-02', subChapterNumber: '21.2', command: 'CD Overview', title: 'What is CD?',
      topicId: 'ch-21', topicNumber: '21', topicTitle: 'CI/CD Fundamentals',
      subtitle: 'Continuous Delivery & Continuous Deployment: reliably shipping validated code to users',
      whatIsIt: 'Continuous Delivery ensures every build passing CI is packaged and ready to deploy at any moment. Continuous Deployment deploys it to production automatically.',
    }),
    buildCommitForgeConcept({
      id: 'c-21-03', subChapterNumber: '21.3', command: 'CI Pipeline', title: 'Continuous Integration',
      topicId: 'ch-21', topicNumber: '21', topicTitle: 'CI/CD Fundamentals',
      subtitle: 'Preventing "Integration Hell" by testing small changes early and often',
      whatIsIt: 'Automated feedback loop: Compile -> Lint -> Test -> Scan. Developers receive immediate alerts if their commit broke anything.',
    }),
    buildCommitForgeConcept({
      id: 'c-21-04', subChapterNumber: '21.4', command: 'Delivery Pipeline', title: 'Continuous Delivery',
      topicId: 'ch-21', topicNumber: '21', topicTitle: 'CI/CD Fundamentals',
      subtitle: 'Keeping software deployable at all times with one-click manual production approval',
      whatIsIt: 'Every change that passes automated tests is automatically deployed to testing or staging environments, with production requiring human sign-off.',
    }),
    buildCommitForgeConcept({
      id: 'c-21-05', subChapterNumber: '21.5', command: 'Deployment Pipeline', title: 'Continuous Deployment',
      topicId: 'ch-21', topicNumber: '21', topicTitle: 'CI/CD Fundamentals',
      subtitle: 'Full automation: every commit passing all tests is deployed to production without human intervention',
      whatIsIt: 'Used by tech giants (Netflix, Amazon, GitHub): changes reach production in minutes, protected by automated canaries and rollbacks.',
    }),
    buildCommitForgeConcept({
      id: 'c-21-06', subChapterNumber: '21.6', command: 'CI/CD Benefits', title: 'Why CI/CD Exists',
      topicId: 'ch-21', topicNumber: '21', topicTitle: 'CI/CD Fundamentals',
      subtitle: 'Shrinking feedback loops, eliminating human error, and accelerating deployment velocity',
      whatIsIt: 'High performing engineering teams deploy dozens of times per day with near-zero downtime, instead of quarterly high-stress weekend deployments.',
    }),
    buildCommitForgeConcept({
      id: 'c-21-07', subChapterNumber: '21.7', command: 'History of Releases', title: 'The Problem Before CI/CD',
      topicId: 'ch-21', topicNumber: '21', topicTitle: 'CI/CD Fundamentals',
      subtitle: 'Manual FTP uploads, "it works on my machine", and broken midnight releases',
      whatIsIt: 'Before CI/CD, engineers manually dragged files over FTP, ran tests by hand on laptops, and spent weeks debugging broken releases before launch.',
    }),
    buildCommitForgeConcept({
      id: 'c-21-08', subChapterNumber: '21.8', command: 'Manual QA', title: 'Manual Testing',
      topicId: 'ch-21', topicNumber: '21', topicTitle: 'CI/CD Fundamentals',
      subtitle: 'The scaling bottleneck of manual QA checklists and human regression testing',
      whatIsIt: 'Manual testing is slow, expensive, and inconsistent. Automated tests run 10,000 checks in 2 minutes on every single commit.',
    }),
    buildCommitForgeConcept({
      id: 'c-21-09', subChapterNumber: '21.9', command: 'Manual SSH Deploy', title: 'Manual Deployment',
      topicId: 'ch-21', topicNumber: '21', topicTitle: 'CI/CD Fundamentals',
      subtitle: 'SSHing into production servers, editing configs live, and configuration drift',
      whatIsIt: 'Manual deployments create snowflakes: servers with undocumented configuration tweaks that no one can reproduce when hardware fails.',
    }),
    buildCommitForgeConcept({
      id: 'c-21-10', subChapterNumber: '21.10', command: 'npm test', title: 'Automated Testing',
      topicId: 'ch-21', topicNumber: '21', topicTitle: 'CI/CD Fundamentals',
      subtitle: 'Unit tests, integration tests, contract tests, and end-to-end suites in CI',
      whatIsIt: 'Automated test runners execute test suites in isolated sandbox containers, ensuring zero regressions enter the mainline codebase.',
    }),
    buildCommitForgeConcept({
      id: 'c-21-11', subChapterNumber: '21.11', command: 'npm run build', title: 'Automated Builds',
      topicId: 'ch-21', topicNumber: '21', topicTitle: 'CI/CD Fundamentals',
      subtitle: 'Hermetic compilations, asset bundling, and reproducible binary generation',
      whatIsIt: 'Compiles TypeScript, bundles React apps, or builds Go binaries in clean ephemeral environments without depending on local laptop setups.',
    }),
    buildCommitForgeConcept({
      id: 'c-21-12', subChapterNumber: '21.12', command: 'kubectl / terraform', title: 'Automated Deployment',
      topicId: 'ch-21', topicNumber: '21', topicTitle: 'CI/CD Fundamentals',
      subtitle: 'Declarative infrastructure rollout to cloud providers with zero human keystrokes',
      whatIsIt: 'Pipelines push container images to registries and trigger Kubernetes rolling updates or serverless function deploys automatically.',
    }),
    buildCommitForgeConcept({
      id: 'c-21-13', subChapterNumber: '21.13', command: 'CI/CD Pipeline Flow', title: 'Pipeline Mental Model',
      topicId: 'ch-21', topicNumber: '21', topicTitle: 'CI/CD Fundamentals',
      subtitle: 'Developer -> Commit -> Repo -> Pipeline -> Build -> Test -> Package -> Deploy -> Production',
      badges: ['Architecture Core'],
      whatIsIt: 'The mental model: Software moves through a factory assembly line. Each station validates quality before handing the artifact to the next.',
    }),
  ],
};

// ============================================================================
// CHAPTER 22: CI/CD PIPELINES (22.1 to 22.15)
// ============================================================================
export const CHAPTER_22: AcademyTopic = {
  id: 'ch-22',
  number: '22',
  title: 'CI/CD Pipelines',
  description: 'Understand pipeline triggers, stages, parallel jobs, steps, runners, dependencies, artifacts, caches, secrets, and failure recovery.',
  iconName: 'GitMerge',
  conceptCount: 15,
  concepts: [
    buildCommitForgeConcept({
      id: 'c-22-01', subChapterNumber: '22.1', command: 'pipeline.yml', title: 'What is a Pipeline?',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'The automated sequence of stages and jobs that compiles, validates, and deploys code',
      whatIsIt: 'A pipeline is a top-level automated workflow defined in code (YAML) that executes when triggered by repository events.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-02', subChapterNumber: '22.2', command: 'on: [push, pull_request]', title: 'Pipeline Trigger',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'Events that kick off execution: git push, pull request, webhook, cron, or manual dispatch',
      whatIsIt: 'Defines when the pipeline should wake up and run. Common triggers: `push` to main, `pull_request`, or `schedule`.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-03', subChapterNumber: '22.3', command: 'stages: [build, test, deploy]', title: 'Pipeline Stages',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'Logical phases: TRIGGER -> BUILD -> TEST -> SECURITY -> PACKAGE -> STAGING -> PRODUCTION',
      whatIsIt: 'Pipelines group jobs into sequential stages. Stage N+1 only runs if Stage N succeeds completely.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-04', subChapterNumber: '22.4', command: 'jobs: { test: {...}, build: {...} }', title: 'Jobs',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'Independent execution units running on dedicated runner VMs or containers',
      whatIsIt: 'A job is a series of steps executing on the same runner. Jobs within the same stage can run in parallel.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-05', subChapterNumber: '22.5', command: 'steps: [ - run: npm test ]', title: 'Steps',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'Individual atomic tasks inside a job: checking out code, running shell commands, executing actions',
      whatIsIt: 'Steps execute sequentially inside the job runner and share the local filesystem environment.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-06', subChapterNumber: '22.6', command: 'runs-on: ubuntu-latest', title: 'Runners',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'The virtual machine or container host environment executing the pipeline steps',
      whatIsIt: 'GitHub-hosted runners (Ubuntu, macOS, Windows) or private self-hosted runners behind corporate firewalls.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-07', subChapterNumber: '22.7', command: 'needs: [build, test]', title: 'Dependencies',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'Directing the Directed Acyclic Graph (DAG): ensuring deploy waits for tests to pass',
      whatIsIt: 'The `needs` keyword specifies job dependencies, orchestrating complex parallel and sequential execution graphs.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-08', subChapterNumber: '22.8', command: 'actions/upload-artifact@v4', title: 'Artifacts',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'Persisting files (compiled binaries, test reports, tarballs) across jobs and runs',
      whatIsIt: 'Because runner VMs are wiped after job completion, artifacts allow sharing compiled binaries between build and deploy jobs.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-09', subChapterNumber: '22.9', command: 'actions/cache@v4', title: 'Caches',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'Speeding up pipelines by storing node_modules, pip wheels, and compiler caches',
      whatIsIt: 'Caches package manager dependencies across runs, cutting build times from 10 minutes down to 45 seconds.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-10', subChapterNumber: '22.10', command: 'env: { NODE_ENV: production }', title: 'Environment Variables',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'Configuring runtime settings, feature flags, and environment endpoints in YAML',
      whatIsIt: 'Passes configuration variables to shell commands and compiler steps without hardcoding values in source code.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-11', subChapterNumber: '22.11', command: 'secrets.PROD_API_KEY', title: 'Secrets',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'Securely injecting encrypted credentials and tokens into runners without leaking in logs',
      badges: ['Security Core'],
      whatIsIt: 'Encrypted key-value pairs stored in repository settings. CI runner automatically masks secret values in console logs.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-12', subChapterNumber: '22.12', command: 'gh run list', title: 'Pipeline Status',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'Monitoring Queued, In Progress, Success, Failure, and Cancelled run states',
      whatIsIt: 'Status badges and commit check indicators (green checkmark or red X) displayed on Pull Requests and commits.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-13', subChapterNumber: '22.13', command: 'gh run view --log-failed', title: 'Failed Pipelines',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'Diagnosing build breakages: compiler errors, failing assertions, and security alerts',
      whatIsIt: 'When a step exits with non-zero code, the job halts immediately. Downstream deploy jobs are skipped for safety.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-14', subChapterNumber: '22.14', command: 'gh run rerun --failed', title: 'Retry',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'Re-executing failed jobs or intermittent flaky network failures',
      whatIsIt: 'Allows re-running only failed jobs rather than rebuilding the entire multi-stage pipeline from scratch.',
    }),
    buildCommitForgeConcept({
      id: 'c-22-15', subChapterNumber: '22.15', command: 'environment: production', title: 'Manual Jobs',
      topicId: 'ch-22', topicNumber: '22', topicTitle: 'CI/CD Pipelines',
      subtitle: 'Requiring human approval gates before executing high-risk production deployments',
      whatIsIt: 'Paused jobs waiting for senior engineer sign-off or change control approval before deploying to live users.',
    }),
  ],
};

// ============================================================================
// CHAPTER 23: GITHUB ACTIONS (23.1 to 23.28)
// ============================================================================
export const CHAPTER_23: AcademyTopic = {
  id: 'ch-23',
  number: '23',
  title: 'GitHub Actions',
  description: 'Deep dive into GitHub Actions YAML syntax: events, jobs, steps, runners, actions (uses), shell execution (run), triggers, matrices, secrets, and reusable workflows.',
  iconName: 'Play',
  conceptCount: 28,
  concepts: [
    buildCommitForgeConcept({
      id: 'c-23-01', subChapterNumber: '23.1', command: '.github/workflows/ci.yml', title: 'What is GitHub Actions?',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'GitHub\'s native CI/CD and developer workflow automation platform',
      badges: ['Industry Standard'],
      whatIsIt: 'A continuous integration and continuous delivery (CI/CD) platform integrated directly into GitHub repositories.',
    }),
    buildCommitForgeConcept({
      id: 'c-23-02', subChapterNumber: '23.2', command: 'name: CI Workflow', title: 'Workflow',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'A configurable automated process composed of one or more jobs defined in YAML',
      whatIsIt: 'Stored as `.yml` files in `.github/workflows/`. You can have multiple workflows (e.g. `ci.yml`, `release.yml`, `triage.yml`).',
    }),
    buildCommitForgeConcept({
      id: 'c-23-03', subChapterNumber: '23.3', command: 'on: [push]', title: 'Events',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Specific GitHub activities that automatically trigger a workflow run',
      whatIsIt: 'Over 30 events: push, pull_request, release, issues, issue_comment, workflow_dispatch, and cron schedules.',
    }),
    buildCommitForgeConcept({
      id: 'c-23-04', subChapterNumber: '23.4', command: 'on:', title: 'on',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'The top-level YAML key specifying triggering conditions and branch/path filters',
      syntaxCode: 'on:\n  push:\n    branches: [main]',
    }),
    buildCommitForgeConcept({
      id: 'c-23-05', subChapterNumber: '23.5', command: 'jobs:', title: 'Jobs',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'A set of steps in a workflow that executes on the same runner',
      syntaxCode: 'jobs:\n  build:\n    runs-on: ubuntu-latest',
    }),
    buildCommitForgeConcept({
      id: 'c-23-06', subChapterNumber: '23.6', command: 'steps:', title: 'Steps',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Sequential tasks that can run shell commands or actions',
      syntaxCode: 'steps:\n  - uses: actions/checkout@v4\n  - run: npm test',
    }),
    buildCommitForgeConcept({
      id: 'c-23-07', subChapterNumber: '23.7', command: 'runs-on: ubuntu-latest', title: 'Runner',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'The execution VM: `ubuntu-latest`, `windows-latest`, `macos-latest`, or self-hosted',
      syntaxCode: 'runs-on: ubuntu-latest',
    }),
    buildCommitForgeConcept({
      id: 'c-23-08', subChapterNumber: '23.8', command: 'actions/checkout@v4', title: 'Actions',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Reusable packaged code units published on GitHub Marketplace',
      whatIsIt: 'Pre-built components created by GitHub and the community to perform common tasks without reinventing scripts.',
    }),
    buildCommitForgeConcept({
      id: 'c-23-09', subChapterNumber: '23.9', command: 'uses: actions/setup-node@v4', title: 'uses',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'YAML directive declaring which reusable action and version tag to execute',
      syntaxCode: 'uses: actions/setup-node@v4\nwith:\n  node-version: 20',
    }),
    buildCommitForgeConcept({
      id: 'c-23-10', subChapterNumber: '23.10', command: 'run: npm test', title: 'run',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Executing shell commands or multi-line bash scripts inside the runner',
      syntaxCode: 'run: |\n  npm install\n  npm test',
    }),
    buildCommitForgeConcept({
      id: 'c-23-11', subChapterNumber: '23.11', command: 'workflow.yml', title: 'Workflow YAML',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'YAML syntax rules: indentation, lists, key-values, and string literals',
      whatIsIt: 'Strict 2-space indentation rule in YAML: misaligned spaces cause workflow parse errors.',
    }),
    buildCommitForgeConcept({
      id: 'c-23-12', subChapterNumber: '23.12', command: 'mkdir -p .github/workflows', title: '.github/workflows',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'The special repository directory where GitHub discovers and runs workflows',
      syntaxCode: '.github/workflows/*.yml',
    }),
    buildCommitForgeConcept({
      id: 'c-23-13', subChapterNumber: '23.13', command: 'on: { push, pull_request }', title: 'Workflow Triggers',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Filtering triggers by branches, tags, paths, and activity types',
      syntaxCode: 'on:\n  push:\n    paths:\n      - "src/**"',
    }),
    buildCommitForgeConcept({
      id: 'c-23-14', subChapterNumber: '23.14', command: 'on: push', title: 'push',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Triggering workflows whenever commits are pushed to branches or tags',
      syntaxCode: 'on:\n  push:\n    branches: [main, develop]',
    }),
    buildCommitForgeConcept({
      id: 'c-23-15', subChapterNumber: '23.15', command: 'on: pull_request', title: 'pull_request',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Triggering workflows when PRs are opened, synchronized (new commits), or reopened',
      syntaxCode: 'on:\n  pull_request:\n    types: [opened, synchronize]',
    }),
    buildCommitForgeConcept({
      id: 'c-23-16', subChapterNumber: '23.16', command: 'on: workflow_dispatch', title: 'workflow_dispatch',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Adding a "Run workflow" button in GitHub UI for manual on-demand execution with inputs',
      syntaxCode: 'on:\n  workflow_dispatch:\n    inputs:\n      env:\n        description: "Target environment"',
    }),
    buildCommitForgeConcept({
      id: 'c-23-17', subChapterNumber: '23.17', command: 'on: schedule', title: 'schedule',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Running automated workflows on recurring cron schedules (e.g. nightly builds)',
      syntaxCode: 'on:\n  schedule:\n    - cron: "0 0 * * *"',
    }),
    buildCommitForgeConcept({
      id: 'c-23-18', subChapterNumber: '23.18', command: 'needs:', title: 'Job Dependencies',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Constructing execution order: building before testing, testing before deploying',
      whatIsIt: 'By default, jobs run concurrently in parallel. `needs:` enforces sequential dependencies.',
    }),
    buildCommitForgeConcept({
      id: 'c-23-19', subChapterNumber: '23.19', command: 'needs: [lint, test]', title: 'needs',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'The YAML keyword specifying prerequisite jobs',
      syntaxCode: 'deploy:\n  needs: [build, test]\n  runs-on: ubuntu-latest',
    }),
    buildCommitForgeConcept({
      id: 'c-23-20', subChapterNumber: '23.20', command: 'strategy: matrix', title: 'Matrix Builds',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Running a job across multiple operating systems and runtime versions simultaneously',
      syntaxCode: 'strategy:\n  matrix:\n    node: [18, 20, 22]\n    os: [ubuntu-latest, windows-latest]',
    }),
    buildCommitForgeConcept({
      id: 'c-23-21', subChapterNumber: '23.21', command: 'actions/upload-artifact@v4', title: 'Artifacts',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Persisting build output, code coverage reports, and dist folders across jobs',
      syntaxCode: 'uses: actions/upload-artifact@v4\nwith:\n  name: dist-files\n  path: dist/',
    }),
    buildCommitForgeConcept({
      id: 'c-23-22', subChapterNumber: '23.22', command: 'actions/cache@v4', title: 'Caching',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Restoring dependency directories keyed by package lockfile hashes',
      syntaxCode: 'uses: actions/cache@v4\nwith:\n  path: ~/.npm\n  key: ${{ runner.os }}-node-${{ hashFiles(\'package-lock.json\') }}',
    }),
    buildCommitForgeConcept({
      id: 'c-23-23', subChapterNumber: '23.23', command: 'env: { API_URL: ... }', title: 'Environment Variables',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Scoping environment variables at workflow, job, or step level',
      syntaxCode: 'env:\n  API_URL: https://api.prod.example.com',
    }),
    buildCommitForgeConcept({
      id: 'c-23-24', subChapterNumber: '23.24', command: '${{ secrets.GITHUB_TOKEN }}', title: 'Secrets',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Accessing repository secrets and the auto-generated `${{ secrets.GITHUB_TOKEN }}`',
      badges: ['Security Essential'],
      syntaxCode: 'env:\n  DEPLOY_KEY: ${{ secrets.PROD_SSH_KEY }}',
    }),
    buildCommitForgeConcept({
      id: 'c-23-25', subChapterNumber: '23.25', command: 'environment: production', title: 'Environments',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Targeting logical deployment environments (Development, Staging, Production)',
      syntaxCode: 'environment:\n  name: production\n  url: https://example.com',
    }),
    buildCommitForgeConcept({
      id: 'c-23-26', subChapterNumber: '23.26', command: 'protection rules', title: 'Deployment Protection',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Configuring required reviewers, wait timers, and restricted branches for environments',
      whatIsIt: 'Stops automated deployments until designated team leads review and click "Approve and deploy".',
    }),
    buildCommitForgeConcept({
      id: 'c-23-27', subChapterNumber: '23.27', command: 'workflow_call:', title: 'Reusable Workflows',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'DRY engineering: sharing centralized standard workflows across dozens of repositories',
      syntaxCode: 'uses: org/shared-workflows/.github/workflows/ci.yml@v1',
    }),
    buildCommitForgeConcept({
      id: 'c-23-28', subChapterNumber: '23.28', command: 'action.yml', title: 'Custom Actions',
      topicId: 'ch-23', topicNumber: '23', topicTitle: 'GitHub Actions',
      subtitle: 'Building custom JavaScript, Docker, or Composite run-step actions with `action.yml`',
      whatIsIt: 'Encapsulating complex multi-step scripts into reusable custom actions published to internal or public marketplaces.',
    }),
  ],
};

// ============================================================================
// CHAPTER 24: GITHUB ACTIONS PRACTICAL CI (24.1 to 24.10)
// ============================================================================
export const CHAPTER_24: AcademyTopic = {
  id: 'ch-24',
  number: '24',
  title: 'GitHub Actions Practical CI',
  description: 'Build a production Node.js CI workflow from scratch: install dependencies, lint, unit test, integration test, coverage, upload artifacts, and matrix builds.',
  iconName: 'Cpu',
  conceptCount: 10,
  concepts: [
    buildCommitForgeConcept({
      id: 'c-24-01', subChapterNumber: '24.1', command: 'npm init -y', title: 'Build a Node.js Project',
      topicId: 'ch-24', topicNumber: '24', topicTitle: 'GitHub Actions Practical CI',
      subtitle: 'Setting up the base project structure and workflow file for a Node.js application',
      whatIsIt: 'Practical hands-on guide: creating `.github/workflows/ci.yml` targeting Node.js runtimes.',
      syntaxCode: 'name: Node CI\non: [push, pull_request]',
    }),
    buildCommitForgeConcept({
      id: 'c-24-02', subChapterNumber: '24.2', command: 'npm ci', title: 'Install Dependencies',
      topicId: 'ch-24', topicNumber: '24', topicTitle: 'GitHub Actions Practical CI',
      subtitle: 'Why production CI uses `npm ci` (clean install from lockfile) instead of `npm install`',
      badges: ['Best Practice'],
      whatIsIt: '`npm ci` ensures identical, deterministic dependency trees by strictly honoring `package-lock.json` and failing on mismatch.',
      syntaxCode: 'run: npm ci',
    }),
    buildCommitForgeConcept({
      id: 'c-24-03', subChapterNumber: '24.3', command: 'npm run lint', title: 'Run Linter',
      topicId: 'ch-24', topicNumber: '24', topicTitle: 'GitHub Actions Practical CI',
      subtitle: 'Automated code quality gates: ESLint, Prettier, and TypeScript type checking',
      whatIsIt: 'Fails the build immediately if code style guidelines, unused variables, or type errors exist.',
      syntaxCode: 'run: npm run lint',
    }),
    buildCommitForgeConcept({
      id: 'c-24-04', subChapterNumber: '24.4', command: 'npm test -- --coverage', title: 'Run Unit Tests',
      topicId: 'ch-24', topicNumber: '24', topicTitle: 'GitHub Actions Practical CI',
      subtitle: 'Executing Vitest or Jest test suites inside ephemeral runner containers',
      whatIsIt: 'Runs fast, isolated unit test assertions validating business logic functions.',
      syntaxCode: 'run: npm test',
    }),
    buildCommitForgeConcept({
      id: 'c-24-05', subChapterNumber: '24.5', command: 'npm run test:e2e', title: 'Run Integration Tests',
      topicId: 'ch-24', topicNumber: '24', topicTitle: 'GitHub Actions Practical CI',
      subtitle: 'Spinning up service containers (Redis, Postgres) to test database queries and API endpoints',
      syntaxCode: 'run: npm run test:integration',
    }),
    buildCommitForgeConcept({
      id: 'c-24-06', subChapterNumber: '24.6', command: 'codecov/codecov-action@v4', title: 'Generate Coverage',
      topicId: 'ch-24', topicNumber: '24', topicTitle: 'GitHub Actions Practical CI',
      subtitle: 'Publishing LCOV/cobertura code coverage reports and enforcing minimum thresholds (e.g. >80%)',
      syntaxCode: 'uses: codecov/codecov-action@v4',
    }),
    buildCommitForgeConcept({
      id: 'c-24-07', subChapterNumber: '24.7', command: 'npm run build', title: 'Build Application',
      topicId: 'ch-24', topicNumber: '24', topicTitle: 'GitHub Actions Practical CI',
      subtitle: 'Compiling production assets, minifying bundles, and verifying build zero-error exit codes',
      syntaxCode: 'run: npm run build',
    }),
    buildCommitForgeConcept({
      id: 'c-24-08', subChapterNumber: '24.8', command: 'actions/upload-artifact@v4', title: 'Upload Artifact',
      topicId: 'ch-24', topicNumber: '24', topicTitle: 'GitHub Actions Practical CI',
      subtitle: 'Storing the compiled `dist/` directory as an artifact downloadable from GitHub UI',
      syntaxCode: 'uses: actions/upload-artifact@v4\nwith:\n  name: prod-dist\n  path: dist/',
    }),
    buildCommitForgeConcept({
      id: 'c-24-09', subChapterNumber: '24.9', command: 'actions/download-artifact@v4', title: 'Download Artifact',
      topicId: 'ch-24', topicNumber: '24', topicTitle: 'GitHub Actions Practical CI',
      subtitle: 'Retrieving the uploaded build artifact in a subsequent deployment job',
      syntaxCode: 'uses: actions/download-artifact@v4\nwith:\n  name: prod-dist',
    }),
    buildCommitForgeConcept({
      id: 'c-24-10', subChapterNumber: '24.10', command: 'strategy.matrix: [18.x, 20.x, 22.x]', title: 'Matrix Testing',
      topicId: 'ch-24', topicNumber: '24', topicTitle: 'GitHub Actions Practical CI',
      subtitle: 'Validating package compatibility across active Node.js LTS release versions',
      syntaxCode: 'strategy:\n  matrix:\n    node-version: [18.x, 20.x, 22.x]',
    }),
  ],
};

export const PACK_04_CHAPTERS: AcademyTopic[] = [
  CHAPTER_21,
  CHAPTER_22,
  CHAPTER_23,
  CHAPTER_24,
];
