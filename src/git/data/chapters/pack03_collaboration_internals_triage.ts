import { buildGitConcept } from '../conceptFactory';
import { AcademyTopic } from '../unifiedAcademyData';

// ============================================================================
// CHAPTER 13: REMOTES (13.1 to 13.13)
// ============================================================================
export const CHAPTER_13: AcademyTopic = {
  id: 'ch-13',
  number: '13',
  title: 'Remotes',
  description: 'Manage remote server bookmarks, origin pointers, SSH vs HTTPS protocols, upstream forks, and remote-tracking branch mirrors.',
  iconName: 'Globe',
  conceptCount: 13,
  concepts: [
    buildGitConcept({
      id: 'c-13-01', subChapterNumber: '13.1', command: 'git remote -v', title: 'What is a Remote?',
      topicId: 'ch-13', topicNumber: '13', topicTitle: 'Remotes',
      subtitle: 'A named bookmark pointing to a URL of another copy of your repository',
      whatIsIt: 'A remote is a short nickname (like `origin`) pointing to a remote server URL where your project is mirrored.',
    }),
    buildGitConcept({
      id: 'c-13-02', subChapterNumber: '13.2', command: 'git remote -v', title: 'Local vs Remote Repository',
      topicId: 'ch-13', topicNumber: '13', topicTitle: 'Remotes',
      subtitle: 'Understanding distributed decentralization: your laptop vs team servers',
      whatIsIt: 'Both local and remote are full Git repositories. Remote servers are typically bare repositories with no working directory.',
    }),
    buildGitConcept({
      id: 'c-13-03', subChapterNumber: '13.3', command: 'git remote show origin', title: 'origin',
      topicId: 'ch-13', topicNumber: '13', topicTitle: 'Remotes',
      subtitle: 'The standard default nickname given to the remote repository you cloned from',
      whatIsIt: '`origin` is not a keyword or special server; it is simply the default convention nickname Git assigns to your primary clone source.',
    }),
    buildGitConcept({
      id: 'c-13-04', subChapterNumber: '13.4', command: 'git remote', title: 'git remote',
      topicId: 'ch-13', topicNumber: '13', topicTitle: 'Remotes',
      subtitle: 'List, inspect, add, rename, and delete remote server connections',
      syntaxCode: 'git remote [-v]',
    }),
    buildGitConcept({
      id: 'c-13-05', subChapterNumber: '13.5', command: 'git remote add origin https://github.com/user/repo.git', title: 'Add Remote',
      topicId: 'ch-13', topicNumber: '13', topicTitle: 'Remotes',
      subtitle: 'Linking a newly initialized local repository to a remote GitHub URL',
      syntaxCode: 'git remote add <name> <url>',
    }),
    buildGitConcept({
      id: 'c-13-06', subChapterNumber: '13.6', command: 'git remote remove staging', title: 'Remove Remote',
      topicId: 'ch-13', topicNumber: '13', topicTitle: 'Remotes',
      subtitle: 'Deleting a stale or deprecated remote pointer from your configuration',
      syntaxCode: 'git remote remove <name>',
    }),
    buildGitConcept({
      id: 'c-13-07', subChapterNumber: '13.7', command: 'git remote rename upstream origin', title: 'Rename Remote',
      topicId: 'ch-13', topicNumber: '13', topicTitle: 'Remotes',
      subtitle: 'Changing the local nickname of a remote repository bookmark',
      syntaxCode: 'git remote rename <old> <new>',
    }),
    buildGitConcept({
      id: 'c-13-08', subChapterNumber: '13.8', command: 'git remote set-url origin git@github.com:user/repo.git', title: 'Remote URLs',
      topicId: 'ch-13', topicNumber: '13', topicTitle: 'Remotes',
      subtitle: 'Updating fetch and push URLs in `.git/config`',
      syntaxCode: 'git remote set-url <name> <new-url>',
    }),
    buildGitConcept({
      id: 'c-13-09', subChapterNumber: '13.9', command: 'https://github.com/user/repo.git', title: 'HTTPS',
      topicId: 'ch-13', topicNumber: '13', topicTitle: 'Remotes',
      subtitle: 'Authenticating over HTTPS using Personal Access Tokens (PAT) and credential helpers',
      whatIsIt: 'HTTPS URLs use port 443 and require GitHub Personal Access Tokens (PATs) instead of account passwords.',
    }),
    buildGitConcept({
      id: 'c-13-10', subChapterNumber: '13.10', command: 'git@github.com:user/repo.git', title: 'SSH',
      topicId: 'ch-13', topicNumber: '13', topicTitle: 'Remotes',
      subtitle: 'Keypair cryptographic authentication (ed25519) without typing passwords',
      whatIsIt: 'SSH uses public-private keypairs (`ssh-keygen -t ed25519`) stored in `~/.ssh/id_ed25519` for silent, passwordless authentication.',
    }),
    buildGitConcept({
      id: 'c-13-11', subChapterNumber: '13.11', command: 'git branch -r', title: 'Remote Tracking Branches',
      topicId: 'ch-13', topicNumber: '13', topicTitle: 'Remotes',
      subtitle: 'Local read-only cached mirrors of remote branch states (e.g. `origin/main`)',
      whatIsIt: 'Remote-tracking branches live inside `.git/refs/remotes/origin/`. You cannot checkout or commit to them directly; they update when you fetch.',
    }),
    buildGitConcept({
      id: 'c-13-12', subChapterNumber: '13.12', command: 'git log origin/main', title: 'origin/main',
      topicId: 'ch-13', topicNumber: '13', topicTitle: 'Remotes',
      subtitle: 'The reference indicating the last known commit on `main` at `origin`',
      whatIsIt: 'Represents the snapshot of `main` on the server the last time you communicated with `origin`.',
    }),
    buildGitConcept({
      id: 'c-13-13', subChapterNumber: '13.13', command: 'git remote add upstream https://github.com/original-org/repo.git', title: 'upstream',
      topicId: 'ch-13', topicNumber: '13', topicTitle: 'Remotes',
      subtitle: 'Convention for referencing the authoritative parent repository in fork workflows',
      whatIsIt: 'When you fork a repository, `origin` points to your personal fork, and `upstream` points to the main company or open-source repository.',
    }),
  ],
};

// ============================================================================
// CHAPTER 14: PUSHING (14.1 to 14.12)
// ============================================================================
export const CHAPTER_14: AcademyTopic = {
  id: 'ch-14',
  number: '14',
  title: 'Pushing',
  description: 'Transmit local commits to remote servers, set tracking relationships (-u), push tags, force push safely with --force-with-lease, and resolve push rejections.',
  iconName: 'UploadCloud',
  conceptCount: 12,
  concepts: [
    buildGitConcept({
      id: 'c-14-01', subChapterNumber: '14.1', command: 'git push', title: 'Why Push Exists',
      topicId: 'ch-14', topicNumber: '14', topicTitle: 'Pushing',
      subtitle: 'Publishing your private local commits to team remote repositories',
      whatIsIt: 'Push sends your local object database commits and advances the branch pointer on the remote server.',
    }),
    buildGitConcept({
      id: 'c-14-02', subChapterNumber: '14.2', command: 'git push', title: 'git push',
      topicId: 'ch-14', topicNumber: '14', topicTitle: 'Pushing',
      subtitle: 'Upload local branch commits to the corresponding remote branch',
      syntaxCode: 'git push [remote] [branch]',
    }),
    buildGitConcept({
      id: 'c-14-03', subChapterNumber: '14.3', command: 'git push origin feature-login', title: 'Push a Branch',
      topicId: 'ch-14', topicNumber: '14', topicTitle: 'Pushing',
      subtitle: 'Creating or updating a named branch on the remote server',
      syntaxCode: 'git push origin <branch>',
    }),
    buildGitConcept({
      id: 'c-14-04', subChapterNumber: '14.4', command: 'git push -u origin main', title: 'Push -u',
      topicId: 'ch-14', topicNumber: '14', topicTitle: 'Pushing',
      subtitle: 'Setting upstream tracking link so future `git push` and `git pull` need no arguments',
      syntaxCode: 'git push -u origin <branch>',
    }),
    buildGitConcept({
      id: 'c-14-05', subChapterNumber: '14.5', command: 'git branch -vv', title: 'Tracking Relationships',
      topicId: 'ch-14', topicNumber: '14', topicTitle: 'Pushing',
      subtitle: 'How Git tracks how many commits local is "ahead" or "behind" remote',
      whatIsIt: 'Inspect tracking with `git branch -vv`: shows `[origin/main: ahead 2, behind 1]`.',
    }),
    buildGitConcept({
      id: 'c-14-06', subChapterNumber: '14.6', command: 'git push origin --tags', title: 'Push Tags',
      topicId: 'ch-14', topicNumber: '14', topicTitle: 'Pushing',
      subtitle: 'Transmitting release tags to the remote repository',
      whatIsIt: 'Regular `git push` does not push tags by default. Use `git push origin <tagname>` or `git push origin --tags`.',
      syntaxCode: 'git push origin --tags',
    }),
    buildGitConcept({
      id: 'c-14-07', subChapterNumber: '14.7', command: 'git push --force origin feature', title: 'Force Push',
      topicId: 'ch-14', topicNumber: '14', topicTitle: 'Pushing',
      subtitle: 'DANGEROUS: Overwriting the remote branch pointer with your local history',
      badges: ['Destructive', 'High Risk'],
      whatIsIt: 'Forces the remote server to accept your branch even if it is not a fast-forward, erasing coworkers\' commits.',
      whenNotToUse: ['Never force push to main, staging, or shared team branches.'],
    }),
    buildGitConcept({
      id: 'c-14-08', subChapterNumber: '14.8', command: 'git push --force-with-lease origin feature', title: '--force-with-lease',
      topicId: 'ch-14', topicNumber: '14', topicTitle: 'Pushing',
      subtitle: 'The professional safe force push: refuses to overwrite if remote has unseen commits',
      badges: ['Best Practice', 'Senior Skill'],
      whatIsIt: 'Checks that the remote branch has not been updated by someone else since your last fetch before forcing.',
      syntaxCode: 'git push --force-with-lease origin <branch>',
    }),
    buildGitConcept({
      id: 'c-14-09', subChapterNumber: '14.9', command: 'git push (error: failed to push some refs)', title: 'Push Rejected',
      topicId: 'ch-14', topicNumber: '14', topicTitle: 'Pushing',
      subtitle: 'Why Git rejects pushes and how to diagnose non-fast-forward errors',
      whatIsIt: 'Git rejects your push when someone else pushed commits to the remote branch that you do not have locally yet.',
    }),
    buildGitConcept({
      id: 'c-14-10', subChapterNumber: '14.10', command: 'git pull --rebase origin main', title: 'Non-Fast-Forward',
      topicId: 'ch-14', topicNumber: '14', topicTitle: 'Pushing',
      subtitle: 'Understanding divergent commit histories between local and remote',
      whatIsIt: 'The remote branch cannot be fast-forwarded to your commit because your history diverged from remote tip.',
    }),
    buildGitConcept({
      id: 'c-14-11', subChapterNumber: '14.11', command: 'git fetch && git status', title: 'Remote Behind',
      topicId: 'ch-14', topicNumber: '14', topicTitle: 'Pushing',
      subtitle: 'Understanding ahead/behind metrics and resolving out-of-sync branches',
      whatIsIt: 'How to bring your local branch up to date: fetch, inspect diff, and rebase or merge before pushing.',
    }),
    buildGitConcept({
      id: 'c-14-12', subChapterNumber: '14.12', command: 'git status', title: 'Safe Push Practices',
      topicId: 'ch-14', topicNumber: '14', topicTitle: 'Pushing',
      subtitle: 'Branch protection rules, linear history requirements, and CI verification',
      whatIsIt: 'Senior team rules: enforce protected branches on GitHub, never force push to production trunks.',
    }),
  ],
};

// ============================================================================
// CHAPTER 15: FETCHING & PULLING (15.1 to 15.10)
// ============================================================================
export const CHAPTER_15: AcademyTopic = {
  id: 'ch-15',
  number: '15',
  title: 'Fetching & Pulling',
  description: 'Download remote commits safely with `git fetch`, integrate with `git pull`, pull with merge vs rebase, and synchronize diverged branches.',
  iconName: 'DownloadCloud',
  conceptCount: 10,
  concepts: [
    buildGitConcept({
      id: 'c-15-01', subChapterNumber: '15.1', command: 'git fetch origin', title: 'git fetch',
      topicId: 'ch-15', topicNumber: '15', topicTitle: 'Fetching & Pulling',
      subtitle: 'Download commits, files, and refs from remote without modifying your working tree',
      badges: ['Essential', 'Safe'],
      whatIsIt: '`git fetch` contacts the remote server and downloads new commits and branches into your local repository, updating `origin/*` tracking refs without touching your code.',
      syntaxCode: 'git fetch [remote]',
    }),
    buildGitConcept({
      id: 'c-15-02', subChapterNumber: '15.2', command: 'git pull origin main', title: 'git pull',
      topicId: 'ch-15', topicNumber: '15', topicTitle: 'Fetching & Pulling',
      subtitle: 'Fetch from remote and immediately integrate changes into current local branch',
      syntaxCode: 'git pull [options] [remote] [branch]',
    }),
    buildGitConcept({
      id: 'c-15-03', subChapterNumber: '15.3', command: 'git fetch vs git pull', title: 'Fetch vs Pull',
      topicId: 'ch-15', topicNumber: '15', topicTitle: 'Fetching & Pulling',
      subtitle: 'The golden equation: `git pull = git fetch + git merge`',
      whatIsIt: '`fetch` is safe and read-only; it lets you inspect what coworkers did. `pull` actively attempts to merge or rebase those changes into your current files.',
    }),
    buildGitConcept({
      id: 'c-15-04', subChapterNumber: '15.4', command: 'git log HEAD..origin/main', title: 'Remote Tracking Branches',
      topicId: 'ch-15', topicNumber: '15', topicTitle: 'Fetching & Pulling',
      subtitle: 'Reviewing incoming commits before merging them into your branch',
      whatIsIt: 'After `git fetch`, run `git log HEAD..origin/main` to see exactly what incoming commits will be integrated.',
    }),
    buildGitConcept({
      id: 'c-15-05', subChapterNumber: '15.5', command: 'git pull --no-rebase', title: 'Pull with Merge',
      topicId: 'ch-15', topicNumber: '15', topicTitle: 'Fetching & Pulling',
      subtitle: 'Default pull: creates a merge commit if local and remote branches have diverged',
      whatIsIt: 'Integrates remote commits by generating a 3-way merge commit when divergence exists.',
      syntaxCode: 'git pull --no-rebase',
    }),
    buildGitConcept({
      id: 'c-15-06', subChapterNumber: '15.6', command: 'git pull --rebase', title: 'Pull with Rebase',
      topicId: 'ch-15', topicNumber: '15', topicTitle: 'Fetching & Pulling',
      subtitle: 'Senior developer default: replays local commits on top of incoming remote commits',
      badges: ['Best Practice', 'Clean History'],
      whatIsIt: 'Keeps branch history clean and linear without cluttering logs with "Merge branch \'main\' of github.com".',
      syntaxCode: 'git pull --rebase',
    }),
    buildGitConcept({
      id: 'c-15-07', subChapterNumber: '15.7', command: 'git status', title: 'Pull Conflicts',
      topicId: 'ch-15', topicNumber: '15', topicTitle: 'Fetching & Pulling',
      subtitle: 'Resolving conflicts when incoming remote changes overlap with unpushed local commits',
      whatIsIt: 'If remote changes conflict with local commits during pull, Git halts. Resolve markers, stage, and continue.',
    }),
    buildGitConcept({
      id: 'c-15-08', subChapterNumber: '15.8', command: 'git stash && git pull && git stash pop', title: 'Pull Rejected',
      topicId: 'ch-15', topicNumber: '15', topicTitle: 'Fetching & Pulling',
      subtitle: 'Error: "Your local changes to the following files would be overwritten by merge"',
      whatIsIt: 'Happens when you have uncommitted edits on disk that conflict with incoming files. Fix: `git stash`, `git pull`, `git stash pop`.',
    }),
    buildGitConcept({
      id: 'c-15-09', subChapterNumber: '15.9', command: 'git log --left-right --graph --cherry-pick --oneline HEAD...origin/main', title: 'Diverged Branches',
      topicId: 'ch-15', topicNumber: '15', topicTitle: 'Fetching & Pulling',
      subtitle: 'Understanding when local and remote both have unique commits',
      whatIsIt: 'Visualizing divergence: Local is ahead by 2 commits, remote is ahead by 3 commits.',
    }),
    buildGitConcept({
      id: 'c-15-10', subChapterNumber: '15.10', command: 'git pull --rebase origin main', title: 'Synchronizing Local and Remote',
      topicId: 'ch-15', topicNumber: '15', topicTitle: 'Fetching & Pulling',
      subtitle: 'The daily synchronization routine: fetch, rebase, test, and push',
      whatIsIt: 'Start of day / pre-PR workflow: pull the latest main, rebase feature branch, run tests, push.',
    }),
  ],
};

// ============================================================================
// CHAPTER 16: GITHUB & COLLABORATION (16.1 to 16.15)
// ============================================================================
export const CHAPTER_16: AcademyTopic = {
  id: 'ch-16',
  number: '16',
  title: 'GitHub & Collaboration',
  description: 'Forks, Pull Requests, Code Reviews, inline suggestions, approvals, branch protection rules, CODEOWNERS, and releases.',
  iconName: 'Users',
  conceptCount: 15,
  concepts: [
    buildGitConcept({
      id: 'c-16-01', subChapterNumber: '16.1', command: 'github.com', title: 'GitHub',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'The cloud collaboration platform for Git repositories, code review, and CI/CD',
      whatIsIt: 'GitHub hosts Git repos and adds web UI, code search, permissions, PRs, and Actions.',
    }),
    buildGitConcept({
      id: 'c-16-02', subChapterNumber: '16.2', command: 'gh repo view', title: 'Repository',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'Public vs private cloud repositories, stars, forks, and settings',
      whatIsIt: 'A hosted project space on GitHub containing code, commit history, wikis, and issue tracking.',
    }),
    buildGitConcept({
      id: 'c-16-03', subChapterNumber: '16.3', command: 'gh org view', title: 'Organization',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'Enterprise teams, shared repository access, SSO, and billing management',
      whatIsIt: 'GitHub Organizations allow companies to manage multiple repositories, teams, and access policies centrally.',
    }),
    buildGitConcept({
      id: 'c-16-04', subChapterNumber: '16.4', command: 'gh repo fork', title: 'Fork',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'A complete copy of a repository hosted in your personal GitHub account',
      whatIsIt: 'Forking copies an open source repository to your own account so you can make changes freely and submit Pull Requests.',
    }),
    buildGitConcept({
      id: 'c-16-05', subChapterNumber: '16.5', command: 'git clone <url>', title: 'Clone',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'Downloading the repository from GitHub to your local filesystem',
      whatIsIt: 'Downloads the repository, sets up the remote connection, and checks out the default branch.',
    }),
    buildGitConcept({
      id: 'c-16-06', subChapterNumber: '16.6', command: 'gh issue create', title: 'Issues',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'Tracking bugs, tasks, enhancements, and questions with labels and milestones',
      whatIsIt: 'GitHub Issues track bugs and feature requests, linkable directly to commits and Pull Requests.',
    }),
    buildGitConcept({
      id: 'c-16-07', subChapterNumber: '16.7', command: 'gh pr create', title: 'Pull Requests',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'Proposing that changes from your feature branch be merged into the target branch',
      badges: ['Collaboration Core'],
      whatIsIt: 'A Pull Request (PR) is a GitHub mechanism to notify team members about code changes ready for review and automated CI testing.',
    }),
    buildGitConcept({
      id: 'c-16-08', subChapterNumber: '16.8', command: 'gh pr review', title: 'Code Review',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'Peer examination of code to catch bugs, improve readability, and verify architecture',
      whatIsIt: 'The collaborative process where team members review diffs, test edge cases, and ask questions before merging.',
    }),
    buildGitConcept({
      id: 'c-16-09', subChapterNumber: '16.9', command: 'gh pr comment', title: 'Review Comments',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'Inline diff comments, suggested batch changes, and conversation threads',
      whatIsIt: 'Leaving comments on specific lines of code in the PR diff, with one-click suggestion commits.',
    }),
    buildGitConcept({
      id: 'c-16-10', subChapterNumber: '16.10', command: 'gh pr review --approve', title: 'Approvals',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'Submitting formal approval to satisfy branch protection requirements',
      whatIsIt: 'Signals that the reviewer has audited the code and agrees it is safe to merge into production.',
    }),
    buildGitConcept({
      id: 'c-16-11', subChapterNumber: '16.11', command: 'gh pr review --request-changes', title: 'Requested Changes',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'Blocking a PR until identified issues, security flaws, or bugs are addressed',
      whatIsIt: 'Prevents merging until the author makes the requested fixes and requests re-review.',
    }),
    buildGitConcept({
      id: 'c-16-12', subChapterNumber: '16.12', command: 'gh pr merge --squash', title: 'Merge Strategies',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'GitHub PR merge options: Create a merge commit, Squash and merge, or Rebase and merge',
      whatIsIt: 'Squash & merge condenses all PR commits into one clean commit on main; Rebase & merge maintains individual commits linearly.',
    }),
    buildGitConcept({
      id: 'c-16-13', subChapterNumber: '16.13', command: 'gh api repos/{owner}/{repo}/branches/main/protection', title: 'Protected Branches',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'Enforcing required reviews, passing CI status checks, and signed commits',
      badges: ['Production Security'],
      whatIsIt: 'Branch protection rules ensure no developer (not even admins) can push directly to main without an approved PR and green CI.',
    }),
    buildGitConcept({
      id: 'c-16-14', subChapterNumber: '16.14', command: 'cat .github/CODEOWNERS', title: 'CODEOWNERS',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'Automatically assigning required team reviewers based on modified file paths',
      whatIsIt: 'A file mapping file paths (e.g. `/security/` or `*.go`) to required GitHub usernames or teams.',
    }),
    buildGitConcept({
      id: 'c-16-15', subChapterNumber: '16.15', command: 'gh release create v1.0.0', title: 'GitHub Releases',
      topicId: 'ch-16', topicNumber: '16', topicTitle: 'GitHub & Collaboration',
      subtitle: 'Packaging software artifacts, release notes, and changelogs bound to Git tags',
      whatIsIt: 'GitHub Releases tie a Git tag to compiled binary downloads, release notes, and automated changelogs.',
    }),
  ],
};

// ============================================================================
// CHAPTER 17: TEAM GIT WORKFLOW (17.1 to 17.12)
// ============================================================================
export const CHAPTER_17: AcademyTopic = {
  id: 'ch-17',
  number: '17',
  title: 'Team Git Workflow',
  description: 'Compare Feature Branch Workflow, GitHub Flow, GitFlow, and Trunk-Based Development, plus PR conventions and release trains.',
  iconName: 'GitPullRequest',
  conceptCount: 12,
  concepts: [
    buildGitConcept({
      id: 'c-17-01', subChapterNumber: '17.1', command: 'git switch -c feat/my-feature', title: 'Feature Branch Workflow',
      topicId: 'ch-17', topicNumber: '17', topicTitle: 'Team Git Workflow',
      subtitle: 'Every new feature developed on its own dedicated branch and merged via PR',
      whatIsIt: 'All feature development takes place on a dedicated branch instead of directly on main, ensuring main remains stable.',
    }),
    buildGitConcept({
      id: 'c-17-02', subChapterNumber: '17.2', command: 'git switch -c fix/login-redirect', title: 'GitHub Flow',
      topicId: 'ch-17', topicNumber: '17', topicTitle: 'Team Git Workflow',
      subtitle: 'Lightweight branch-based workflow: branch from main, PR, review, merge, deploy immediately',
      whatIsIt: 'A simple, highly popular workflow ideal for web services and continuous deployment: anything on main is deployable at all times.',
    }),
    buildGitConcept({
      id: 'c-17-03', subChapterNumber: '17.3', command: 'git branch (develop, release, hotfix)', title: 'Git Flow',
      topicId: 'ch-17', topicNumber: '17', topicTitle: 'Team Git Workflow',
      subtitle: 'The classic enterprise workflow: master, develop, feature, release, and hotfix branches',
      whatIsIt: 'A strict branching model designed around scheduled software releases (mobile apps, desktop software).',
    }),
    buildGitConcept({
      id: 'c-17-04', subChapterNumber: '17.4', command: 'git switch main', title: 'Trunk-Based Development',
      topicId: 'ch-17', topicNumber: '17', topicTitle: 'Team Git Workflow',
      subtitle: 'Modern high-performing engineering standard: short-lived branches (<1 day) merged to trunk',
      badges: ['DORA Standard', 'Modern Practice'],
      whatIsIt: 'Developers merge small batches of code to main multiple times a day, relying on automated CI and feature flags.',
    }),
    buildGitConcept({
      id: 'c-17-05', subChapterNumber: '17.5', command: 'gh pr create', title: 'Pull Request Workflow',
      topicId: 'ch-17', topicNumber: '17', topicTitle: 'Team Git Workflow',
      subtitle: 'The complete lifecycle of a PR from draft to green CI and production merge',
      whatIsIt: 'Step-by-step lifecycle: Branch -> Commit -> Open Draft PR -> CI Runs -> Code Review -> Approval -> Squash & Merge.',
    }),
    buildGitConcept({
      id: 'c-17-06', subChapterNumber: '17.6', command: 'git branch feat/PROJ-102-cart-api', title: 'Branch Naming',
      topicId: 'ch-17', topicNumber: '17', topicTitle: 'Team Git Workflow',
      subtitle: 'Standardized branch prefixes across teams: feat/, fix/, docs/, chore/',
      whatIsIt: 'Conventions preventing branch sprawl and enabling automated Jira/Linear issue linking.',
    }),
    buildGitConcept({
      id: 'c-17-07', subChapterNumber: '17.7', command: 'git commit -m "feat(api): add rate limiting"', title: 'Commit Conventions',
      topicId: 'ch-17', topicNumber: '17', topicTitle: 'Team Git Workflow',
      subtitle: 'Conventional Commits: type(scope): subject with breaking change indicators',
      whatIsIt: 'Automates semantic versioning (major, minor, patch) based on commit prefix tags.',
    }),
    buildGitConcept({
      id: 'c-17-08', subChapterNumber: '17.8', command: 'gh pr review', title: 'Code Review Workflow',
      topicId: 'ch-17', topicNumber: '17', topicTitle: 'Team Git Workflow',
      subtitle: 'Turnaround SLAs, constructive feedback culture, and automated lint bots',
      whatIsIt: 'How high-performing teams conduct code reviews within 4 hours to maintain high deployment velocity.',
    }),
    buildGitConcept({
      id: 'c-17-09', subChapterNumber: '17.9', command: 'git rebase main', title: 'Handling Conflicts',
      topicId: 'ch-17', topicNumber: '17', topicTitle: 'Team Git Workflow',
      subtitle: 'Proactive conflict resolution strategies before merging PRs',
      whatIsIt: 'Rebasing your feature branch against main frequently keeps conflicts small and easy to resolve.',
    }),
    buildGitConcept({
      id: 'c-17-10', subChapterNumber: '17.10', command: 'git fetch origin main && git rebase origin/main', title: 'Keeping Branches Updated',
      topicId: 'ch-17', topicNumber: '17', topicTitle: 'Team Git Workflow',
      subtitle: 'The developer daily sync: avoiding the dreaded 2-month merge conflict nightmare',
      whatIsIt: 'How long-lived branches diverge and how daily rebasing prevents architectural drift.',
    }),
    buildGitConcept({
      id: 'c-17-11', subChapterNumber: '17.11', command: 'git rebase -i / gh pr merge --squash', title: 'Squashing',
      topicId: 'ch-17', topicNumber: '17', topicTitle: 'Team Git Workflow',
      subtitle: 'Why teams squash feature PRs into single atomic commits on the trunk',
      whatIsIt: 'Squashing keeps the main branch history clean: 1 commit per completed feature, making git revert trivial.',
    }),
    buildGitConcept({
      id: 'c-17-12', subChapterNumber: '17.12', command: 'git switch -c release/v2.4.0', title: 'Release Branches',
      topicId: 'ch-17', topicNumber: '17', topicTitle: 'Team Git Workflow',
      subtitle: 'Hardening releases, bug fixes during stabilization, and cherry-picking back to main',
      whatIsIt: 'Branches dedicated to release stabilization for quarterly or mobile app store release trains.',
    }),
  ],
};

// ============================================================================
// CHAPTER 18: ADVANCED GIT (18.1 to 18.16)
// ============================================================================
export const CHAPTER_18: AcademyTopic = {
  id: 'ch-18',
  number: '18',
  title: 'Advanced Git',
  description: 'Master tags, cherry-pick, stash, worktrees, submodules, and client/server Git hooks for automated quality gates.',
  iconName: 'Sparkles',
  conceptCount: 16,
  concepts: [
    buildGitConcept({
      id: 'c-18-01', subChapterNumber: '18.1', command: 'git tag', title: 'Tags',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Permanent named pointers to specific commits marking releases and milestones',
      whatIsIt: 'Tags are references that never move. Unlike branches which advance with new commits, tags remain forever locked to one commit.',
    }),
    buildGitConcept({
      id: 'c-18-02', subChapterNumber: '18.2', command: 'git tag -a v1.0.0 -m "Release v1.0.0"', title: 'Annotated Tags',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Full tag objects in `.git/objects` storing tagger name, email, date, and message',
      badges: ['Best Practice'],
      whatIsIt: 'Recommended for public releases. Stored as full objects with GPG signing support.',
      syntaxCode: 'git tag -a <tagname> -m "<message>"',
    }),
    buildGitConcept({
      id: 'c-18-03', subChapterNumber: '18.3', command: 'git tag v1.0.0-rc1', title: 'Lightweight Tags',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Simple bookmark file storing only a 40-character commit SHA',
      whatIsIt: 'A simple reference file in `.git/refs/tags/` with no extra metadata. Used for private temporary bookmarks.',
      syntaxCode: 'git tag <tagname>',
    }),
    buildGitConcept({
      id: 'c-18-04', subChapterNumber: '18.4', command: 'git tag -l "v1.*"', title: 'git tag',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'List, verify, search, or delete release tags',
      syntaxCode: 'git tag -l [pattern]',
    }),
    buildGitConcept({
      id: 'c-18-05', subChapterNumber: '18.5', command: 'git cherry-pick <commit-hash>', title: 'Cherry-Pick',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Selectively applying a single commit from another branch without merging the branch',
      badges: ['Hotfix Essential'],
      whatIsIt: 'Copies the patch introduced by a specific commit on another branch and creates a brand new commit on current branch.',
    }),
    buildGitConcept({
      id: 'c-18-06', subChapterNumber: '18.6', command: 'git cherry-pick <commit-hash>', title: 'git cherry-pick',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Hotfixing production by porting a single bugfix commit from main to release branch',
      syntaxCode: 'git cherry-pick <commit-hash>',
    }),
    buildGitConcept({
      id: 'c-18-07', subChapterNumber: '18.7', command: 'git stash', title: 'Stash',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Temporarily shelving uncommitted dirty working tree changes onto a stack',
      whatIsIt: 'Takes your modified tracked files and staged changes and saves them on a stack of unfinished changes that you can reapply anytime.',
    }),
    buildGitConcept({
      id: 'c-18-08', subChapterNumber: '18.8', command: 'git stash push -m "WIP: navbar styling"', title: 'git stash',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Shelving changes to immediately switch branches or pull incoming updates',
      syntaxCode: 'git stash [push -m "<message>"]',
    }),
    buildGitConcept({
      id: 'c-18-09', subChapterNumber: '18.9', command: 'git stash pop', title: 'stash pop',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Reapplying the most recently stashed changes and removing them from the stack',
      syntaxCode: 'git stash pop',
    }),
    buildGitConcept({
      id: 'c-18-10', subChapterNumber: '18.10', command: 'git stash apply stash@{1}', title: 'stash apply',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Reapplying stashed changes while preserving the stash on the stack',
      syntaxCode: 'git stash apply [stash@{n}]',
    }),
    buildGitConcept({
      id: 'c-18-11', subChapterNumber: '18.11', command: 'git stash branch feature-rescue', title: 'stash branch',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Creating a new branch from the stash to resolve conflicts cleanly',
      syntaxCode: 'git stash branch <new-branch>',
    }),
    buildGitConcept({
      id: 'c-18-12', subChapterNumber: '18.12', command: 'git worktree list', title: 'Worktrees',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Check out multiple branches simultaneously into separate directories on disk',
      badges: ['Senior Superpower'],
      whatIsIt: 'Allows you to have two or more working trees attached to the same repository database, eliminating branch-switching rebuild delays.',
    }),
    buildGitConcept({
      id: 'c-18-13', subChapterNumber: '18.13', command: 'git worktree add ../hotfix-dir hotfix-branch', title: 'git worktree',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Fixing an urgent production bug in a separate folder without stashing your ongoing work',
      syntaxCode: 'git worktree add <path> <branch>',
    }),
    buildGitConcept({
      id: 'c-18-14', subChapterNumber: '18.14', command: 'git submodule add https://github.com/lib/core.git libs/core', title: 'Submodules',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Embedding other Git repositories as subdirectories pinned to exact commit hashes',
      syntaxCode: 'git submodule update --init --recursive',
    }),
    buildGitConcept({
      id: 'c-18-15', subChapterNumber: '18.15', command: 'ls .git/hooks', title: 'Git Hooks',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Client and server shell scripts triggered automatically by Git lifecycle events',
      whatIsIt: 'Scripts in `.git/hooks/` that run before commit (`pre-commit`), on commit message (`commit-msg`), or before push (`pre-push`).',
    }),
    buildGitConcept({
      id: 'c-18-16', subChapterNumber: '18.16', command: 'npx husky init', title: 'Custom Git Hooks',
      topicId: 'ch-18', topicNumber: '18', topicTitle: 'Advanced Git',
      subtitle: 'Automating linting, formatting, secret scanning, and Conventional Commits with Husky',
      whatIsIt: 'Modern teams share hooks via package managers (Husky, pre-commit) to enforce zero broken code on commit.',
    }),
  ],
};

// ============================================================================
// CHAPTER 19: GIT INTERNALS (19.1 to 19.14)
// ============================================================================
export const CHAPTER_19: AcademyTopic = {
  id: 'ch-19',
  number: '19',
  title: 'Git Internals',
  description: 'Demystify Git under the hood: Blobs, Trees, Commits, Tags, SHA hashes, packfiles, garbage collection, and plumbing vs porcelain.',
  iconName: 'Cpu',
  conceptCount: 14,
  concepts: [
    buildGitConcept({
      id: 'c-19-01', subChapterNumber: '19.1', command: 'git cat-file -s <hash>', title: 'Git Objects',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: 'The four immutable object primitives: blob, tree, commit, and tag',
      whatIsIt: 'Every piece of data stored in Git is one of 4 object types stored in `.git/objects/`.',
    }),
    buildGitConcept({
      id: 'c-19-02', subChapterNumber: '19.2', command: 'git hash-object -w file.txt', title: 'Blob',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: 'Binary Large Object: raw file contents stripped of filename and permissions',
      whatIsIt: 'A blob stores file contents only. Git prepends `blob <size>\0` and hashes with SHA-1.',
    }),
    buildGitConcept({
      id: 'c-19-03', subChapterNumber: '19.3', command: 'git ls-tree HEAD', title: 'Tree',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: 'Directory representation mapping filenames, file modes, and child blob/tree SHAs',
      whatIsIt: 'A tree corresponds to a directory. It lists entries: file mode (e.g. 100644), type, SHA-1, and filename.',
    }),
    buildGitConcept({
      id: 'c-19-04', subChapterNumber: '19.4', command: 'git cat-file -p HEAD', title: 'Commit Object',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: 'Plain text object containing tree SHA, parent SHAs, author, committer, and message',
      whatIsIt: 'A commit ties a top-level tree to its parent commit(s) with human author attribution.',
    }),
    buildGitConcept({
      id: 'c-19-05', subChapterNumber: '19.5', command: 'git cat-file -p refs/tags/v1.0.0', title: 'Annotated Tag Object',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: 'Permanent pointer object with tagger metadata, optional GPG cryptographic signature',
      whatIsIt: 'An object that points to a commit, with tagger metadata, date, and message.',
    }),
    buildGitConcept({
      id: 'c-19-06', subChapterNumber: '19.6', command: 'git hash-object --stdin', title: 'SHA Hash',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: 'Cryptographic content addressing: SHA-1 (160-bit) and SHA-256 (Object Format Transition)',
      whatIsIt: 'Ensures data integrity: any corruption or modification changes the hash instantly.',
    }),
    buildGitConcept({
      id: 'c-19-07', subChapterNumber: '19.7', command: 'ls .git/objects', title: 'Object Database',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: 'Content-addressable store: 2-character directory fanout and 38-character filenames',
      whatIsIt: 'Zlib compressed files stored in `.git/objects/xx/yyy...` indexed by content hash.',
    }),
    buildGitConcept({
      id: 'c-19-08', subChapterNumber: '19.8', command: 'cat .git/refs/heads/main', title: 'References',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: 'Simple human-readable files inside `.git/refs/` storing 40-character commit hashes',
      whatIsIt: 'Branches and tags are just text files containing a commit SHA. Renaming a branch renames a file.',
    }),
    buildGitConcept({
      id: 'c-19-09', subChapterNumber: '19.9', command: 'cat .git/HEAD', title: 'HEAD',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: 'Symbolic reference pointing to a ref path (`ref: refs/heads/main`) or commit SHA',
      whatIsIt: 'Tells Git where you are. When you switch branches, Git rewrites the text in `.git/HEAD`.',
    }),
    buildGitConcept({
      id: 'c-19-10', subChapterNumber: '19.10', command: 'git ls-files --stage', title: 'Index',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: 'Binary cache file `.git/index` holding staged state, file stats, and merge conflict stages (0-3)',
      whatIsIt: 'Binary format storing mtime, ctime, file size, SHA, and stage level for fast status diffing.',
    }),
    buildGitConcept({
      id: 'c-19-11', subChapterNumber: '19.11', command: 'ls .git/objects/pack', title: 'Packfiles',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: 'Delta compression: packing thousands of loose objects into `.pack` and `.idx` files',
      whatIsIt: 'Saves disk space and network bandwidth by storing files as sliding window delta differences.',
    }),
    buildGitConcept({
      id: 'c-19-12', subChapterNumber: '19.12', command: 'git gc --prune=now', title: 'Garbage Collection',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: '`git gc` packs loose objects and removes unreferenced dangling commits past grace period',
      whatIsIt: 'Compresses history, packs loose objects, and prunes commits older than 90 days not in any reflog.',
      syntaxCode: 'git gc',
    }),
    buildGitConcept({
      id: 'c-19-13', subChapterNumber: '19.13', command: 'git fsck --full', title: 'git fsck',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: 'File system check: audits connectivity and cryptographic validity of all objects',
      badges: ['Diagnostics'],
      whatIsIt: 'Verifies SHA checksums of all objects and finds dangling commits and blobs.',
      syntaxCode: 'git fsck',
    }),
    buildGitConcept({
      id: 'c-19-14', subChapterNumber: '19.14', command: 'git rev-parse HEAD (plumbing) vs git status (porcelain)', title: 'Plumbing vs Porcelain',
      topicId: 'ch-19', topicNumber: '19', topicTitle: 'Git Internals',
      subtitle: 'High-level user commands (porcelain) vs low-level scriptable building blocks (plumbing)',
      whatIsIt: 'Porcelain (status, commit, checkout) is for humans. Plumbing (cat-file, hash-object, write-tree) is for scripts and tools.',
    }),
  ],
};

// ============================================================================
// CHAPTER 20: GIT TROUBLESHOOTING (20.1 to 20.14)
// ============================================================================
export const CHAPTER_20: AcademyTopic = {
  id: 'ch-20',
  number: '20',
  title: 'Git Troubleshooting',
  description: 'Emergency rescue workflows: accidentally deleted commits, lost branches, detached HEAD, push rejections, committed secrets, and corrupted repos.',
  iconName: 'ShieldAlert',
  conceptCount: 14,
  concepts: [
    buildGitConcept({
      id: 'c-20-01', subChapterNumber: '20.1', command: 'git reflog && git branch rescue <hash>', title: 'Accidentally Deleted Commit',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'Rescuing commits after an accidental `git reset --hard` using the reflog journal',
      badges: ['Emergency Rescue'],
      whatIsIt: 'Even if you ran `git reset --hard`, the commit exists in `.git/objects` and the reflog. Find the hash with `git reflog` and create a branch.',
      safeRecovery: '`git reflog` -> note the commit before reset -> `git branch recover-work <hash>`.',
    }),
    buildGitConcept({
      id: 'c-20-02', subChapterNumber: '20.2', command: 'git reflog | grep "checkout: moving"', title: 'Lost Branch',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'Recovering a branch deleted with `git branch -D`',
      whatIsIt: 'Deleting a branch only deletes the 41-byte text pointer file. The commits remain safe in the reflog for up to 90 days.',
      safeRecovery: 'Find the branch tip SHA in `git reflog` and run `git branch <branch-name> <hash>`.',
    }),
    buildGitConcept({
      id: 'c-20-03', subChapterNumber: '20.3', command: 'git switch -c rescue-branch', title: 'Detached HEAD',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'Escaping detached HEAD state without losing uncommitted or committed work',
      whatIsIt: 'If you made commits in detached HEAD, create a branch pointer right now: `git switch -c new-branch`.',
    }),
    buildGitConcept({
      id: 'c-20-04', subChapterNumber: '20.4', command: 'git merge --abort', title: 'Merge Conflict',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'Systematic conflict resolution checklist: diff3, aborting, and staging clean code',
      whatIsIt: 'If conflict resolution goes wrong, `git merge --abort` resets cleanly to pre-merge state with zero lost code.',
    }),
    buildGitConcept({
      id: 'c-20-05', subChapterNumber: '20.5', command: 'git rebase --abort', title: 'Rebase Conflict',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'Managing multi-commit rebase conflict cascades and using `--abort`',
      whatIsIt: 'During rebase conflicts, resolve and run `git rebase --continue`. If overwhelmed, run `git rebase --abort`.',
    }),
    buildGitConcept({
      id: 'c-20-06', subChapterNumber: '20.6', command: 'git pull --rebase origin main', title: 'Push Rejected',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'Resolving non-fast-forward rejection without destructive force pushing',
      whatIsIt: 'Fetch latest changes, rebase your local commits on top, verify tests, and push cleanly.',
    }),
    buildGitConcept({
      id: 'c-20-07', subChapterNumber: '20.7', command: 'ssh -T git@github.com', title: 'Authentication Failure',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'Debugging SSH key permissions (403/Permission Denied) and Personal Access Tokens',
      whatIsIt: 'Check SSH connectivity with `ssh -T git@github.com`, or update credential helper tokens.',
    }),
    buildGitConcept({
      id: 'c-20-08', subChapterNumber: '20.8', command: 'git remote -v && git remote set-url origin <new-url>', title: 'Wrong Remote',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'Fixing typos or switching remote URLs between personal fork and company upstream',
      syntaxCode: 'git remote set-url origin <correct-url>',
    }),
    buildGitConcept({
      id: 'c-20-09', subChapterNumber: '20.9', command: 'git branch -m <correct-name>', title: 'Wrong Branch',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'What to do when you committed code to main instead of a feature branch',
      badges: ['Common Pitfall'],
      whatIsIt: 'Fix: Create feature branch at current commit (`git branch feat`), then reset main backward (`git reset --hard HEAD~1`).',
    }),
    buildGitConcept({
      id: 'c-20-10', subChapterNumber: '20.10', command: 'git reflog origin/<branch>', title: 'Accidental Force Push',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'Recovering remote commits after an accidental `git push --force`',
      whatIsIt: 'Check if any coworker still has the old commit SHA in their local clone or reflog, and push it back.',
    }),
    buildGitConcept({
      id: 'c-20-11', subChapterNumber: '20.11', command: 'git-filter-repo / BFG Repo-Cleaner', title: 'Accidentally Committed Secret',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'Critical security response: rotate compromised credentials immediately, purge Git history',
      badges: ['High Priority Security'],
      whatIsIt: 'RULE 1: Immediately rotate/revoke the leaked API key or secret! RULE 2: Purge from Git history using `git-filter-repo`.',
    }),
    buildGitConcept({
      id: 'c-20-12', subChapterNumber: '20.12', command: 'git lfs install', title: 'Large File Problems',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'Fixing 100MB+ push failures and integrating Git Large File Storage (Git LFS)',
      whatIsIt: 'GitHub blocks files >100MB. Use `git lfs track "*.zip"` and replace large binaries in history.',
    }),
    buildGitConcept({
      id: 'c-20-13', subChapterNumber: '20.13', command: 'git fsck --lost-found', title: 'Corrupted Repository',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'Recovering corrupted zlib objects after unexpected machine crash or power cut',
      whatIsIt: 'Using `git fsck` to identify zero-byte corrupt objects and restoring from a remote clone or backup.',
    }),
    buildGitConcept({
      id: 'c-20-14', subChapterNumber: '20.14', command: 'git reflog', title: 'Reflog Recovery',
      topicId: 'ch-20', topicNumber: '20', topicTitle: 'Git Troubleshooting',
      subtitle: 'Mastering Git\'s time machine to undo the undo and recover any state from the past 90 days',
      whatIsIt: 'The ultimate senior developer superpower: as long as a commit was created on your machine, it can be rescued.',
    }),
  ],
};

export const PACK_03_CHAPTERS: AcademyTopic[] = [
  CHAPTER_13,
  CHAPTER_14,
  CHAPTER_15,
  CHAPTER_16,
  CHAPTER_17,
  CHAPTER_18,
  CHAPTER_19,
  CHAPTER_20,
];
