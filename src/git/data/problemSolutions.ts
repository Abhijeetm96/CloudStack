export interface ProblemDecisionOption {
  label: string;
  actionText: string;
  recommendedCommand: string;
  explanation: string;
  targetConceptId: string;
  targetTab: 'Learn' | 'Explore' | 'Visualize' | 'Practice' | 'Reference';
}

export interface ProblemDecisionNode {
  question: string;
  options: ProblemDecisionOption[];
}

export interface ProblemSolution {
  id: string;
  problemTitle: string;
  description: string;
  keywords: string[];
  decisionTree?: ProblemDecisionNode;
  directRecommendation?: {
    recommendedCommand: string;
    explanation: string;
    targetConceptId: string;
    targetTab: 'Learn' | 'Explore' | 'Visualize' | 'Practice' | 'Reference';
  };
}

export const COMPLETE_PROBLEM_SOLUTIONS: ProblemSolution[] = [
  {
    id: 'prob-undo-commit',
    problemTitle: 'I want to undo my last commit',
    description: 'You made a commit and need to unwind it or remove it from history.',
    keywords: ['undo commit', 'revert commit', 'reset commit', 'undo last commit', 'cancel commit', 'remove commit'],
    decisionTree: {
      question: 'Has the commit already been pushed to GitHub or a shared remote repository?',
      options: [
        {
          label: 'YES — Already pushed to GitHub / remote',
          actionText: 'Use git revert (Safe for shared history)',
          recommendedCommand: 'git revert HEAD',
          explanation: 'Since the commit is public, resetting it would break your teammates\' histories. git revert safely creates a new commit that inverts the changes.',
          targetConceptId: 'c-09-10',
          targetTab: 'Explore',
        },
        {
          label: 'NO — Still only on my local computer',
          actionText: 'Use git reset (Clean local rewind)',
          recommendedCommand: 'git reset --soft HEAD~1',
          explanation: '`git reset --soft HEAD~1` removes the commit while keeping all your edited code staged in your working directory, ready for editing.',
          targetConceptId: 'c-09-07',
          targetTab: 'Practice',
        },
      ],
    },
  },
  {
    id: 'prob-unstage-file',
    problemTitle: 'I accidentally staged a file (e.g. .env or secret)',
    description: 'You ran git add on a file that shouldn\'t be in the commit.',
    keywords: ['unstage', 'unstage file', 'accidentally staged', 'remove from staging', 'staged .env', 'unadd'],
    directRecommendation: {
      recommendedCommand: 'git restore --staged <file-path>',
      explanation: 'Removes the file from the staging area immediately without deleting or modifying your code on disk.',
      targetConceptId: 'c-git-restore-staged',
      targetTab: 'Learn',
    },
  },
  {
    id: 'prob-send-github',
    problemTitle: 'I want to send my code to GitHub',
    description: 'Upload your local commits to a remote repository branch.',
    keywords: ['send to github', 'push to github', 'upload code', 'sync github', 'publish branch', 'git push'],
    directRecommendation: {
      recommendedCommand: 'git push -u origin main',
      explanation: 'Transmits local commits to the remote `main` branch and sets up tracking.',
      targetConceptId: 'c-14-02',
      targetTab: 'Learn',
    },
  },
  {
    id: 'prob-discard-changes',
    problemTitle: 'I want to discard changes in a file',
    description: 'Throw away experimental edits and revert the file back to last commit.',
    keywords: ['discard changes', 'throw away changes', 'revert file', 'undo edits', 'checkout file'],
    decisionTree: {
      question: 'Are the modifications currently staged in the index (ran `git add`)?',
      options: [
        {
          label: 'YES — The changes are already staged',
          actionText: 'Unstage first, then restore',
          recommendedCommand: 'git restore --staged <file> && git restore <file>',
          explanation: 'Unstage the file from the index, then restore the file to match HEAD.',
          targetConceptId: 'c-09-04',
          targetTab: 'Learn',
        },
        {
          label: 'NO — Edits are only in the working tree',
          actionText: 'Directly restore working tree',
          recommendedCommand: 'git restore <file>',
          explanation: 'Replaces your working tree file with the clean index version.',
          targetConceptId: 'c-09-02',
          targetTab: 'Explore',
        },
      ],
    },
  },
  {
    id: 'prob-lost-commit',
    problemTitle: 'I lost a commit or deleted the wrong branch',
    description: 'You ran hard reset or deleted a branch and need your code back.',
    keywords: ['lost commit', 'lost branch', 'deleted branch', 'recover commit', 'reflog'],
    directRecommendation: {
      recommendedCommand: 'git reflog',
      explanation: 'Git records every movement of HEAD in the reflog. Run `git reflog` to find the lost commit hash, then `git branch rescue <hash>`.',
      targetConceptId: 'c-09-15',
      targetTab: 'Learn',
    },
  },
  {
    id: 'prob-committed-secret',
    problemTitle: 'I accidentally committed a secret (API key, password, token)',
    description: 'You committed credentials or private keys and need to safely purge them without compromising production.',
    keywords: ['secret', 'api key', 'password', 'token', 'leaked secret', 'committed credentials', 'gitleaks', 'env file'],
    decisionTree: {
      question: 'Has this commit already been pushed to GitHub or a shared remote server?',
      options: [
        {
          label: 'YES — Already pushed to GitHub / remote',
          actionText: 'Revoke token immediately, then purge history',
          recommendedCommand: '1. Revoke API key at provider!\n2. git-filter-repo --path <secret-file> --invert-paths\n3. git push --force-with-lease origin <branch>',
          explanation: 'CRITICAL RULE: Once pushed, assume the secret is already compromised by automated scrapers. Revoking the credential is step #1. Then purge from Git history using git-filter-repo.',
          targetConceptId: 'c-20-11',
          targetTab: 'Learn',
        },
        {
          label: 'NO — Commit only exists locally on my machine',
          actionText: 'Rewind commit, ignore file, and recommit',
          recommendedCommand: 'git reset --soft HEAD~1 && git restore --staged <secret-file> && echo "<secret-file>" >> .gitignore && git commit -m "feat: clean commit"',
          explanation: 'Because the commit was never pushed, soft reset rewinds history safely. Add the secret to .gitignore and recommit cleanly.',
          targetConceptId: 'c-06-13',
          targetTab: 'Learn',
        },
      ],
    },
  },
  {
    id: 'prob-push-rejected',
    problemTitle: 'My push was rejected (non-fast-forward / protected branch)',
    description: 'Git returned "error: failed to push some refs" or "remote rejected".',
    keywords: ['push rejected', 'failed to push', 'non-fast-forward', 'push error', 'protected branch', 'rejected push'],
    decisionTree: {
      question: 'What is the reason reported in the error message?',
      options: [
        {
          label: 'Non-fast-forward: Remote has newer commits you do not have locally',
          actionText: 'Pull with rebase, then push',
          recommendedCommand: 'git pull --rebase origin <branch> && git push origin <branch>',
          explanation: 'Colleagues pushed commits while you were working. Rebase your commits on top of their newest commits and push cleanly.',
          targetConceptId: 'c-14-09',
          targetTab: 'Learn',
        },
        {
          label: 'Protected branch: Direct pushes to main are forbidden',
          actionText: 'Create a feature branch and open a Pull Request',
          recommendedCommand: 'git switch -c feat/my-changes && git push -u origin feat/my-changes && gh pr create',
          explanation: 'Protected branches require peer code review and passing CI. Move your commits to a feature branch and submit a PR.',
          targetConceptId: 'c-16-13',
          targetTab: 'Learn',
        },
      ],
    },
  },
  {
    id: 'prob-branch-behind',
    problemTitle: 'My branch is behind main',
    description: 'Main has moved forward with new features and your branch needs to catch up.',
    keywords: ['behind main', 'update branch', 'sync with main', 'rebase main', 'diverged', 'sync branch'],
    decisionTree: {
      question: 'Do you want to maintain a clean linear history or create an explicit merge commit?',
      options: [
        {
          label: 'Clean linear history (Recommended for feature branches)',
          actionText: 'Rebase on top of main',
          recommendedCommand: 'git fetch origin main && git rebase origin/main',
          explanation: 'Replays your feature commits on top of the latest main, eliminating messy merge bubbles.',
          targetConceptId: 'c-12-03',
          targetTab: 'Learn',
        },
        {
          label: 'Explicit merge commit (Preserve chronological timeline)',
          actionText: 'Merge main into feature branch',
          recommendedCommand: 'git fetch origin main && git merge origin/main',
          explanation: 'Creates a 3-way merge commit bringing main updates into your feature branch.',
          targetConceptId: 'c-11-04',
          targetTab: 'Learn',
        },
      ],
    },
  },
  {
    id: 'prob-merge-conflict',
    problemTitle: 'I have a merge conflict',
    description: 'Git could not automatically reconcile overlapping edits across branches.',
    keywords: ['merge conflict', 'conflict markers', 'both modified', 'resolve conflict', 'rebase conflict', 'abort merge'],
    decisionTree: {
      question: 'Do you want to resolve the conflict or abort and return to safety?',
      options: [
        {
          label: 'Resolve: I am ready to inspect and fix the conflicting lines',
          actionText: 'Edit files, remove <<<<<<< markers, stage, and commit',
          recommendedCommand: 'git status (open files, remove <<<<<<< markers) && git add <resolved-file> && git commit',
          explanation: 'Open each conflicting file, choose the correct lines, remove the <<<<<<< HEAD markers, and stage with git add.',
          targetConceptId: 'c-11-08',
          targetTab: 'Learn',
        },
        {
          label: 'Abort: This is overwhelming or wrong branch; take me back',
          actionText: 'Abort merge or rebase cleanly',
          recommendedCommand: 'git merge --abort (or git rebase --abort)',
          explanation: 'Safely restores your working tree and HEAD pointer to the exact clean state before the merge attempt.',
          targetConceptId: 'c-11-12',
          targetTab: 'Learn',
        },
      ],
    },
  },
  {
    id: 'prob-action-failed',
    problemTitle: 'My GitHub Action failed',
    description: 'A workflow run reported a red X and halted execution in CI/CD.',
    keywords: ['action failed', 'pipeline failed', 'workflow failed', 'ci failed', 'github action error', 'red check'],
    decisionTree: {
      question: 'Which stage or step reported the error in the run logs?',
      options: [
        {
          label: 'Test or Linter step failed with exit code 1',
          actionText: 'Reproduce locally and fix syntax/assertions',
          recommendedCommand: 'npm run lint && npm test',
          explanation: 'CI caught a bug before deployment. Run the exact same commands locally, fix the issues, and push an update.',
          targetConceptId: 'c-32-03',
          targetTab: 'Learn',
        },
        {
          label: 'Permission / 403 Forbidden error on GITHUB_TOKEN',
          actionText: 'Add explicit permissions block in workflow YAML',
          recommendedCommand: 'permissions:\n  contents: read\n  packages: write\n  pull-requests: write',
          explanation: 'Modern GitHub repositories default to read-only tokens. Grant explicit permissions in your .github/workflows YAML file.',
          targetConceptId: 'c-27-08',
          targetTab: 'Learn',
        },
      ],
    },
  },
  {
    id: 'prob-tests-pass-local-fail-ci',
    problemTitle: 'My tests pass locally but fail in CI',
    description: 'The code works on your laptop but turns red on the GitHub Actions runner.',
    keywords: ['works on my machine', 'pass locally fail ci', 'ci test fail', 'timezone test', 'flaky test'],
    decisionTree: {
      question: 'What is the most likely environmental difference?',
      options: [
        {
          label: 'Missing environment variables or secret configurations',
          actionText: 'Inject secrets into the job runner',
          recommendedCommand: 'env:\n  DATABASE_URL: ${{ secrets.CI_DATABASE_URL }}\n  NODE_ENV: test',
          explanation: 'Local developers often have uncommitted .env files that CI runners do not possess. Inject test secrets in workflow YAML.',
          targetConceptId: 'c-27-04',
          targetTab: 'Learn',
        },
        {
          label: 'Operating system difference: Windows/macOS vs Linux (case-sensitivity or timezone)',
          actionText: 'Fix casing and enforce UTC timezone in tests',
          recommendedCommand: 'TZ=UTC npm test',
          explanation: 'macOS and Windows filesystems are case-insensitive (`import App from "./app"` works locally but crashes on Linux CI).',
          targetConceptId: 'c-32-03',
          targetTab: 'Learn',
        },
      ],
    },
  },
  {
    id: 'prob-docker-build-fails-ci',
    problemTitle: 'My Docker build works locally but fails in CI',
    description: 'Docker build succeeds on developer laptop but fails inside the GitHub Actions runner.',
    keywords: ['docker build failed', 'docker ci failed', 'dockerignore', 'buildx error', 'container build break'],
    decisionTree: {
      question: 'What error did the Docker build step output?',
      options: [
        {
          label: 'File not found during COPY step',
          actionText: 'Check .dockerignore exclusions',
          recommendedCommand: 'cat .dockerignore',
          explanation: 'Check .dockerignore to ensure files required for the build were not excluded from the Docker build context.',
          targetConceptId: 'c-25-03',
          targetTab: 'Learn',
        },
        {
          label: 'Registry authentication failure on push (401/403)',
          actionText: 'Log in using GITHUB_TOKEN',
          recommendedCommand: 'echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin',
          explanation: 'Ensure docker login is authenticated before pushing images to GitHub Container Registry.',
          targetConceptId: 'c-25-06',
          targetTab: 'Learn',
        },
      ],
    },
  },
  {
    id: 'prob-deployment-failed',
    problemTitle: 'My deployment failed',
    description: 'The CI pipeline succeeded but the deployment stage errored or aborted.',
    keywords: ['deploy failed', 'deployment failure', 'kubernetes deploy error', 'staging failed', 'prod deploy error'],
    directRecommendation: {
      recommendedCommand: 'kubectl rollout status deployment/<app> --timeout=60s || kubectl rollout undo deployment/<app>',
      explanation: 'Verify container readiness probes. If pods are in CrashLoopBackOff, roll back immediately and inspect container logs.',
      targetConceptId: 'c-29-14',
      targetTab: 'Learn',
    },
  },
  {
    id: 'prob-prod-unhealthy',
    problemTitle: 'My production deployment is unhealthy (5xx errors / alert firing)',
    description: 'Production error rates spiked or latency exceeded SLA after deployment.',
    keywords: ['production outage', '500 error', 'crashloopbackoff', 'unhealthy production', 'rollback emergency'],
    directRecommendation: {
      recommendedCommand: 'kubectl rollout undo deployment/<app> && datadog-agent status',
      explanation: 'RULE 1: Mitigate customer outage first with instant rollback. RULE 2: Investigate logs in staging safely afterward.',
      targetConceptId: 'c-30-10',
      targetTab: 'Learn',
    },
  },
  {
    id: 'prob-pipeline-stuck',
    problemTitle: 'My pipeline is stuck or queued indefinitely',
    description: 'Workflow shows yellow spinning circle and has not started executing for 15+ minutes.',
    keywords: ['pipeline stuck', 'queued indefinitely', 'runner waiting', 'approval gate', 'workflow hanging'],
    decisionTree: {
      question: 'Is the pipeline waiting for human approval or an unavailable runner?',
      options: [
        {
          label: 'Waiting for environment approval gate',
          actionText: 'Review and approve deployment in GitHub UI',
          recommendedCommand: 'Navigate to Actions > Run > Click "Review deployments" > Approve',
          explanation: 'Environment protection rules pause deployments until designated senior on-call reviewers click Approve.',
          targetConceptId: 'c-23-26',
          targetTab: 'Learn',
        },
        {
          label: 'Runner label mismatch or concurrency lock',
          actionText: 'Verify runner tags and concurrency settings',
          recommendedCommand: 'concurrency:\n  group: ${{ github.ref }}\n  cancel-in-progress: true',
          explanation: 'Ensure `runs-on: ubuntu-latest` is valid, and use concurrency cancellation to avoid queue pileups.',
          targetConceptId: 'c-22-06',
          targetTab: 'Learn',
        },
      ],
    },
  },
];
