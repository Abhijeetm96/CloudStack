const fs = require('fs');
const path = require('path');

const gitCapstones = [
  {
    id: 'git-01',
    code: 'GIT-01',
    title: 'Personal Project Version Control',
    academy: 'git',
    difficulty: 'Beginner',
    estimatedTime: '4-6 hours',
    technologies: ['Git', 'CLI', 'GitHub', 'Markdown'],
    overview: 'Initialize, configure, and maintain a clean personal project repository with atomic commits, structured commit messages, and a production-grade .gitignore.',
    tags: ['git', 'cli', 'version-control', 'initialization', 'commits'],
    projectOverview: {
      projectName: 'Personal Project Version Control',
      academy: 'git',
      difficulty: 'Beginner',
      estimatedEffort: '4-6 hours',
      technologies: ['Git CLI', 'GitHub / GitLab', 'Markdown'],
      shortDescription: 'Initialize and maintain a clean project repository from scratch using atomic commits, structured commit messages, and an exhaustive .gitignore.'
    },
    scenario: 'You have joined a software consultancy that requires all developers to establish clean version control hygiene from day one. You have been assigned to take an unversioned multi-file utility script project and establish an auditable, reproducible Git repository with professional commit message conventions and ignored runtime artifacts.',
    problemStatement: 'The current utility script directory contains raw source code, temporary test logs, virtual environment binaries, and API secret files mixed together without version history. Developers frequently overwrite each other\'s changes or accidentally commit sensitive keys. Your task is to establish a pristine repository baseline.',
    projectObjective: [
      'Initialize a clean Git repository with proper user identity and configuration',
      'Establish a comprehensive .gitignore file preventing tracking of credentials, build artifacts, and OS files',
      'Create structured atomic commits following the Conventional Commits specification',
      'Publish the repository to a remote Git hosting provider with an expressive README and license'
    ],
    whatYouNeedToBuild: {
      description: 'A versioned project directory with pristine working tree, clear commit log history, configured remotes, and excluded runtime noise.',
      diagram: `[Unversioned Directory]
         │
         ▼ (git init & config)
[Git Working Tree] ──> [.gitignore Filter] ──> [Staging Area] ──> [Local Commit History] ──> [Remote (origin/main)]`
    },
    requirements: {
      functional: [
        'Repository must track all essential source files while completely ignoring build outputs and sensitive files',
        'Commit history must demonstrate logical, atomic increments rather than a single bulk commit',
        'Repository must be pushed to a remote repository with a synchronized default branch (main)'
      ],
      technical: [
        'Use git version 2.30+ commands',
        'Configure user.name and user.email locally within the repository',
        'Enforce Conventional Commit message format (feat:, fix:, chore:, docs:)'
      ],
      security: [
        'Ensure no environment files (.env) or private API tokens are committed',
        'Verify .gitignore actively ignores secret files before staging',
        'Use SSH keys or personal access tokens for authenticated remote operations'
      ]
    },
    architecture: {
      summary: 'Local working tree with staging area, commit DAG, and remote tracking branch.',
      diagram: `Working Directory ──(git add)──> Staging Index ──(git commit)──> Local Repo (.git) ──(git push)──> Remote (GitHub)`,
      components: [
        { name: 'Working Tree', role: 'Local filesystem files edited by developer', technologies: ['Filesystem'] },
        { name: 'Index (Staging)', role: 'Preparation area for atomic snapshots', technologies: ['Git Index'] },
        { name: 'Commit History (HEAD)', role: 'Immutable DAG of project snapshots', technologies: ['Git Object Store'] },
        { name: 'Remote Origin', role: 'Centralized collaborative repository upstream', technologies: ['GitHub / GitLab'] }
      ]
    },
    technologyRequirements: {
      required: ['Git CLI 2.30+', 'Remote Git Hosting Provider (GitHub/GitLab)'],
      optional: ['Git Credential Manager', 'GPG Commit Signing'],
      outOfScope: ['Automated CI/CD Webhooks', 'Third-party Git GUI wrappers']
    },
    functionalRequirements: [
      'Git repository initializes without tracking extraneous operating system artifacts (.DS_Store, Thumbs.db)',
      'Commit log displays at least 5 discrete, understandable milestones',
      'Remote repository reflects identical commit history and branch status'
    ],
    technicalRequirements: [
      'Initialize repository using git init -b main',
      'Provide comprehensive .gitignore with comments dividing sections (Dependencies, Environment, Build)',
      'Construct informative README.md explaining project setup and usage'
    ],
    securityRequirements: [
      'Zero plaintext credentials or tokens in git status or git log',
      'Include a .env.example file demonstrating expected config variables without real values'
    ],
    constraints: [
      'Do not use git add . without inspecting git status first',
      'Do not use generic commit messages such as "update files" or "fix bug"',
      'Do not force push to remote repository'
    ],
    expectedOutcome: 'A professional-grade open-source or internal repository initialized according to industry best practices, ready for safe team onboarding and ongoing feature work.',
    deliverables: [
      'Configured Git repository (.git)',
      'Production-ready .gitignore file',
      'Well-documented README.md and LICENSE',
      '.env.example template',
      'Verified clean git status and published remote repository'
    ],
    suggestedProjectStructure: `my-project/
├── .git/
├── .gitignore
├── .env.example
├── LICENSE
├── README.md
├── src/
│   └── app.py (or index.js)
└── tests/
    └── test_app.py`,
    requiredConcepts: [
      { name: 'Git Basics & Architecture', lessonId: 'c-01-01', academyRoute: '/git' },
      { name: 'git init & git config', lessonId: 'c-03-01', academyRoute: '/git' },
      { name: 'git add & Staging Area', lessonId: 'c-06-02', academyRoute: '/git' },
      { name: 'git commit & Message Standards', lessonId: 'c-07-03', academyRoute: '/git' },
      { name: 'git status & git diff', lessonId: 'c-04-01', academyRoute: '/git' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 01: Git Mental Model & Philosophy', route: '/cloudstack/git?concept=c-01-01' },
        { title: 'Chapter 03: Initializing Repositories', route: '/cloudstack/git?concept=c-03-01' },
        { title: 'Chapter 06: Staging Hygiene & .gitignore', route: '/cloudstack/git?concept=c-06-02' }
      ],
      officialDocs: [
        { title: 'Pro Git Book: Getting Started with Git', url: 'https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup' },
        { title: 'GitHub Docs: Ignoring files', url: 'https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files' }
      ],
      referenceMaterial: ['Conventional Commits 1.0.0 Specification', 'gitignore.io template collection'],
      usefulCommands: ['git status', 'git log --oneline --graph', 'git diff --staged', 'git check-ignore -v <path>']
    },
    recommendedApproach: [
      '1. Review the existing project files and identify which categories are build artifacts, temporary logs, or secrets.',
      '2. Initialize Git on the root folder with the default branch set to main.',
      '3. Set local Git config parameters for your name and email.',
      '4. Author a strict .gitignore file tailored to your programming language runtime.',
      '5. Stage files in logical groupings (e.g. project scaffolding, core source, documentation).',
      '6. Create atomic commits with Conventional Commit prefixes (e.g. chore(scaffold): initialize repo).',
      '7. Link a remote repository on GitHub and push the main branch upstream.',
      '8. Validate by cloning into a separate temporary directory and checking that no secret or build artifact was leaked.'
    ],
    importantConsiderations: [
      'Why is it vital to never commit sensitive keys, even in initial temporary commits?',
      'Why does git add -p (patch staging) lead to higher code quality than git add .?',
      'How does setting core.autocrlf prevent annoying diff noise between Windows and Linux/macOS developers?'
    ],
    commonPitfalls: [
      'Adding files to .gitignore after they were already tracked by Git (requiring git rm --cached).',
      'Committing real API secrets in initial commit history where they persist forever in Git packfiles.',
      'Using vague commit messages that hinder debugging with git bisect.'
    ],
    optionalEnhancements: {
      beginner: ['Add a pre-commit hook that checks for trailing whitespace.'],
      intermediate: ['Configure GPG commit signing and verify signed badge on GitHub.'],
      advanced: ['Set up Git LFS (Large File Storage) for binary graphic assets.'],
      expert: ['Implement custom Git aliases and global ignore templates across all local repositories.']
    },
    completionChecklist: [
      'Git repository is initialized with default branch named main',
      'Local repository configuration has name and email verified',
      'Comprehensive .gitignore excludes node_modules, build, .env, and OS files',
      'At least 5 atomic commits created using Conventional Commits syntax',
      '.env.example provided with placeholder keys',
      'README.md details purpose, installation, and usage',
      'Remote repository linked and pushed successfully',
      'Fresh clone verified in a separate directory without errors'
    ]
  },
  {
    id: 'git-02',
    code: 'GIT-02',
    title: 'Feature Branch Workflow',
    academy: 'git',
    difficulty: 'Beginner+',
    estimatedTime: '6-8 hours',
    technologies: ['Git', 'Branching', 'GitHub PRs', 'Code Review'],
    overview: 'Implement a structured feature-branch workflow with isolated work streams, branch naming conventions, pull requests, and clean branch integration.',
    tags: ['git', 'branching', 'pull-requests', 'feature-branches', 'workflows'],
    projectOverview: {
      projectName: 'Feature Branch Workflow',
      academy: 'git',
      difficulty: 'Beginner+',
      estimatedEffort: '6-8 hours',
      technologies: ['Git CLI', 'GitHub Pull Requests', 'Branch Protection'],
      shortDescription: 'Implement an isolated feature branching workflow ensuring main remains deployable while new capabilities are developed in parallel.'
    },
    scenario: 'Your engineering organization is shifting away from direct commits to main. Multiple developers need to deliver bug fixes and features concurrently without trampling on stable releases. You are tasked with demonstrating a clean feature-branch development cycle for an e-commerce shopping cart module.',
    problemStatement: 'Direct commits to the main branch resulted in a broken staging build because an unfinished checkout feature was merged halfway through development. The team needs an enforced branching model where features live on separate branches and are reviewed before merging.',
    projectObjective: [
      'Create and manage isolated feature branches from main using clear naming conventions',
      'Implement multiple independent features concurrently and switch context seamlessly',
      'Push feature branches upstream and open pull requests with detailed descriptions',
      'Simulate a code review process and merge feature branches into main cleanly'
    ],
    whatYouNeedToBuild: {
      description: 'A Git workflow demonstrating branching, parallel development, pull request reviews, and clean merge operations back into main.',
      diagram: `main:           ●──────────────●──────────────● (Release)
                 \\            /              /
feature/auth:     ●────●────●'              /
                   \\                       /
feature/cart:       ●─────────●──────────●'`
    },
    requirements: {
      functional: [
        'Main branch must remain stable and deployable at all times',
        'Features must be developed on branches prefixed with feature/ or fix/',
        'Changes must be merged back to main only through reviewed pull requests'
      ],
      technical: [
        'Use git checkout -b or git switch -c for branch creation',
        'Use git branch -d to delete merged branches locally and remotely',
        'Verify commit history using git log --graph --oneline'
      ],
      security: [
        'Establish branch protection rule preventing direct pushes to main',
        'Require pull request approvals before merging'
      ]
    },
    architecture: {
      summary: 'Hierarchical branching model with protected trunk and ephemeral feature branches.',
      diagram: `main [Protected Trunk] ──> feature/cart [Ephemeral Branch] ──> Pull Request ──> Merge into main`,
      components: [
        { name: 'main branch', role: 'Production-ready stable branch', technologies: ['Git Branch'] },
        { name: 'feature/ branches', role: 'Short-lived feature isolation branches', technologies: ['Git Branch'] },
        { name: 'Pull Request', role: 'Collaborative code review and diff inspection gate', technologies: ['GitHub PR'] }
      ]
    },
    technologyRequirements: {
      required: ['Git CLI 2.30+', 'GitHub / GitLab repository'],
      optional: ['GitHub CLI (gh)'],
      outOfScope: ['Complex rebase squash rewriting (covered in later capstones)']
    },
    functionalRequirements: [
      'Develop at least two distinct features (e.g. user authentication and shopping cart calculation) on separate branches',
      'Demonstrate clean switching between branches using git switch without losing uncommitted progress'
    ],
    technicalRequirements: [
      'Enforce naming pattern: feature/<ticket-id>-<short-description>',
      'Keep branches focused with fewer than 5 commits per feature PR',
      'Delete feature branch after merge to prevent branch clutter'
    ],
    securityRequirements: [
      'Do not include credentials in branch names or commit logs',
      'Verify that branch protection prevents unauthorized direct push to main'
    ],
    constraints: [
      'Never commit directly to main once branch protection is active',
      'Do not merge unreviewed branches'
    ],
    expectedOutcome: 'A demonstrable Git repository showcasing multiple feature branches developed, peer-reviewed, merged into main, and cleanly retired.',
    deliverables: [
      'Repository with at least 2 merged feature branches and pull requests',
      'Documented branch naming guidelines in CONTRIBUTING.md',
      'Clear, readable git log graph showing parallel branch convergence'
    ],
    suggestedProjectStructure: `ecommerce-app/
├── CONTRIBUTING.md
├── README.md
├── src/
│   ├── auth.js (from feature/auth)
│   └── cart.js (from feature/cart)
└── tests/
    ├── auth.test.js
    └── cart.test.js`,
    requiredConcepts: [
      { name: 'Branching Basics', lessonId: 'c-10-03', academyRoute: '/git' },
      { name: 'git switch & git checkout', lessonId: 'c-10-10', academyRoute: '/git' },
      { name: 'git merge Strategies', lessonId: 'c-11-04', academyRoute: '/git' },
      { name: 'Pull Requests & Code Review', lessonId: 'c-14-02', academyRoute: '/git' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 10: Git Branching Essentials', route: '/cloudstack/git?concept=c-10-03' },
        { title: 'Chapter 11: Merging Strategies', route: '/cloudstack/git?concept=c-11-04' }
      ],
      officialDocs: [
        { title: 'Git Branching - Basic Branching and Merging', url: 'https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging' }
      ],
      referenceMaterial: ['GitHub Flow Guide', 'Atlassian Git Feature Branch Workflow'],
      usefulCommands: ['git switch -c feature/name', 'git branch -a', 'git branch -d feature/name', 'git log --graph --decorate --oneline']
    },
    recommendedApproach: [
      '1. Review CONTRIBUTING.md requirements for branch naming conventions.',
      '2. Ensure your local main branch is synchronized with upstream origin/main.',
      '3. Create and switch to feature/user-auth branch.',
      '4. Implement the feature code and test suite, making focused atomic commits.',
      '5. Push feature/user-auth to origin and open a Pull Request.',
      '6. While the PR is awaiting review, switch back to main and create feature/cart-summary.',
      '7. Implement the cart feature, commit, push, and open a second PR.',
      '8. Review, approve, and merge both PRs sequentially on GitHub.',
      '9. Pull updated main locally and clean up obsolete local and remote feature branches.'
    ],
    importantConsiderations: [
      'Why is it vital to pull latest main before creating a new feature branch?',
      'How does fast-forward merge differ from three-way recursive merge in commit history?',
      'When should a feature branch be deleted versus retained?'
    ],
    commonPitfalls: [
      'Creating a new feature branch while standing on an existing feature branch instead of main.',
      'Leaving dirty working tree files behind when switching branches without stashing.',
      'Accumulating dozens of stale branches locally that have already been deleted on remote.'
    ],
    optionalEnhancements: {
      beginner: ['Create an issue template on GitHub that auto-links pull requests.'],
      intermediate: ['Configure GitHub Actions to automatically run linter checks on open PRs.'],
      advanced: ['Implement branch auto-deletion upon PR merge in GitHub settings.'],
      expert: ['Set up CODEOWNERS file enforcing mandatory domain expert reviews.']
    },
    completionChecklist: [
      'Branching model established with feature/ naming conventions',
      'Branch protection configured on main branch',
      'Feature 1 developed on isolated branch with dedicated commits',
      'Feature 2 developed in parallel without cross-contamination',
      'Pull requests opened with clear summary of changes and testing steps',
      'Both pull requests merged cleanly into main',
      'Obsolete feature branches deleted locally and remotely',
      'Main branch updated locally and verified clean'
    ]
  },
  {
    id: 'git-03',
    code: 'GIT-03',
    title: 'Team Collaboration & Distributed Remotes',
    academy: 'git',
    difficulty: 'Lower Intermediate',
    estimatedTime: '8-10 hours',
    technologies: ['Git', 'Remotes', 'Upstream Sync', 'Forks', 'SSH'],
    overview: 'Configure distributed developer remotes, manage forks, synchronize with central upstream repositories, and collaborate across multiple contributor workstations.',
    tags: ['git', 'collaboration', 'remotes', 'forks', 'fetch', 'pull'],
    projectOverview: {
      projectName: 'Team Collaboration & Distributed Remotes',
      academy: 'git',
      difficulty: 'Lower Intermediate',
      estimatedEffort: '8-10 hours',
      technologies: ['Git Remote Management', 'Forking Workflow', 'SSH Key Auth'],
      shortDescription: 'Simulate multi-engineer distributed collaboration across central, fork, and developer workstation remotes.'
    },
    scenario: 'You are leading a distributed engineering squad working across different time zones. Developers contribute from personal forks and push to a canonical central repository. You must establish remote synchronization protocols, teach fetch versus pull, and verify tracking branches.',
    problemStatement: 'Developers are experiencing divergence between their local branches and upstream main, leading to accidental merge loops and overwritten coworker commits when pulling naively.',
    projectObjective: [
      'Configure origin and upstream remote pointers accurately',
      'Demonstrate the exact behavioral difference between git fetch and git pull',
      'Set up remote tracking branches and prune deleted remote branches',
      'Synchronize personal fork with upstream without creating redundant merge commits'
    ],
    whatYouNeedToBuild: {
      description: 'A multi-remote environment connecting contributor forks to canonical upstream repository with synchronized branch pointers.',
      diagram: `[Upstream Central Repo]
         ▲
         │ (PR / Sync)
[Developer Fork (origin)] <─── (git push) ─── [Local Workstation]
         ▲                                           │
         └───────────── (git fetch upstream) ────────┘`
    },
    requirements: {
      functional: [
        'Developer workstation can fetch updates from upstream while pushing to personal fork',
        'Upstream main changes are merged cleanly into local working branch without git pull --force'
      ],
      technical: [
        'Configure remote URLs with git remote add upstream <url>',
        'Use git fetch upstream followed by git merge upstream/main or git rebase upstream/main',
        'Use git remote prune origin to remove deleted tracking references'
      ],
      security: [
        'Enforce SSH key authentication with passphrase protection for remote access',
        'Restrict direct push access on upstream repository to team leads'
      ]
    },
    architecture: {
      summary: 'Triangular forking workflow for open-source and large enterprise collaboration.',
      diagram: `Upstream (Canonical) ──Fork──> Origin (User Repo) ──Clone──> Local Workspace ──Fetch──> Upstream`,
      components: [
        { name: 'Upstream Remote', role: 'Official golden repository managed by platform leads', technologies: ['GitHub'] },
        { name: 'Origin Remote', role: 'Personal developer fork with full write permissions', technologies: ['GitHub Fork'] },
        { name: 'Local Clone', role: 'Workstation working copy with dual remote tracking', technologies: ['Git CLI'] }
      ]
    },
    technologyRequirements: {
      required: ['Git CLI 2.30+', 'Two distinct Git repositories (Upstream & Fork)'],
      optional: ['SSH Agent / Keychain'],
      outOfScope: ['Self-hosted GitLab server installation']
    },
    functionalRequirements: [
      'Demonstrate pushing a feature to origin and issuing a pull request to upstream',
      'Synchronize local main with new commits pushed directly to upstream by another developer'
    ],
    technicalRequirements: [
      'Maintain exact tracking branch references in .git/config',
      'Use git branch -vv to audit local tracking branches against remote counterparts'
    ],
    securityRequirements: [
      'Audit git remote -v to guarantee remotes use secure protocols (git@ or https:// with tokens)'
    ],
    constraints: [
      'Never push secret credentials to personal forks, even public ones',
      'Do not use git pull without configuring pull.rebase or pull.ff options'
    ],
    expectedOutcome: 'A fully configured distributed Git setup allowing seamless synchronization between contributor forks and central enterprise repositories.',
    deliverables: [
      'Configured dual-remote Git repository (origin and upstream)',
      'Documentation detailing sync workflow in TEAM_SYNC.md',
      'Demonstrated PR merged from fork to upstream repository'
    ],
    suggestedProjectStructure: `team-project/
├── .git/
├── TEAM_SYNC.md
├── README.md
└── src/
    └── shared_module.py`,
    requiredConcepts: [
      { name: 'Remote Repositories', lessonId: 'c-13-04', academyRoute: '/git' },
      { name: 'git fetch vs git pull', lessonId: 'c-15-01', academyRoute: '/git' },
      { name: 'Tracking Branches', lessonId: 'c-15-02', academyRoute: '/git' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 13: Remotes & Network Primitives', route: '/cloudstack/git?concept=c-13-04' },
        { title: 'Chapter 15: Fetch, Pull & Tracking Branches', route: '/cloudstack/git?concept=c-15-01' }
      ],
      officialDocs: [
        { title: 'Git Basics - Working with Remotes', url: 'https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes' }
      ],
      referenceMaterial: ['GitHub Docs: Syncing a fork', 'Git Tracking Branches Deep Dive'],
      usefulCommands: ['git remote -v', 'git fetch upstream', 'git merge upstream/main', 'git branch -vv']
    },
    recommendedApproach: [
      '1. Create a fork of the central upstream repository on GitHub.',
      '2. Clone your personal fork to your workstation (defaulting to origin).',
      '3. Add the central repository as a secondary remote named upstream.',
      '4. Simulate an upstream change by pushing a commit to the upstream repository.',
      '5. On your workstation, fetch upstream changes without modifying working files.',
      '6. Inspect upstream/main using git log and compare with local main.',
      '7. Integrate upstream/main into local main using fast-forward merge.',
      '8. Push synchronized local main to origin main to keep your fork updated.'
    ],
    importantConsiderations: [
      'Why is git fetch safer than git pull when starting work in the morning?',
      'What happens if origin and upstream have diverging histories on the same branch?',
      'How does setting pull.rebase = true keep commit histories linear?'
    ],
    commonPitfalls: [
      'Confusing origin (your fork) with upstream (the canonical source of truth).',
      'Blindly running git pull and generating accidental merge commits that pollute project history.'
    ],
    optionalEnhancements: {
      beginner: ['Configure git config --global fetch.prune true.'],
      intermediate: ['Set up GitHub CLI gh repo sync command automation.'],
      advanced: ['Create a multi-remote pre-push hook validating branch sync status.'],
      expert: ['Implement signed SSH commit verification across all developer workstations.']
    },
    completionChecklist: [
      'Fork created and cloned locally as origin',
      'Upstream remote added and verified with git remote -v',
      'Simulated upstream commits fetched cleanly without workspace breakage',
      'Local main synchronized with upstream/main',
      'Fork main synchronized with local main via push',
      'Tracking branches verified with git branch -vv',
      'Team synchronization guide documented in TEAM_SYNC.md'
    ]
  },
  {
    id: 'git-04',
    code: 'GIT-04',
    title: 'Merge Conflict Resolution',
    academy: 'git',
    difficulty: 'Intermediate',
    estimatedTime: '8-12 hours',
    technologies: ['Git', 'Merge Conflicts', 'Interactive Rebase', 'Diff3', 'Mergerepo'],
    overview: 'Master conflicting file changes, 3-way merge inspection, conflict markers, interactive commit history rebasing, and squash cleanup.',
    tags: ['git', 'merge-conflicts', 'rebase', 'interactive-rebase', 'squash'],
    projectOverview: {
      projectName: 'Merge Conflict Resolution',
      academy: 'git',
      difficulty: 'Intermediate',
      estimatedEffort: '8-12 hours',
      technologies: ['Git Merge', 'Git Rebase -i', 'Diff3 Conflict Style', 'Merge Tools'],
      shortDescription: 'Diagnose and resolve complex multi-file merge conflicts and clean messy commit histories using interactive rebasing.'
    },
    scenario: 'Two engineering pods concurrently refactored the central database configuration and authentication service. When attempting to merge Pod A\'s changes into main after Pod B has already deployed, catastrophic merge conflicts occur across multiple files. You must resolve the conflict without dropping either pod\'s changes.',
    problemStatement: 'A feature branch has 12 messy "wip", "typo fix", and "more fixes" commits, and conflicts with recent changes on main across 3 critical source files. Automated merging is aborted by Git. You must clean the commit history and resolve all conflict markers correctly.',
    projectObjective: [
      'Configure Git with diff3 conflict style for 3-way context inspection',
      'Understand and parse <<<<<<< HEAD, ||||||| merged common ancestors, and >>>>>>> conflict markers',
      'Resolve conflicts manually and verify application test integrity post-resolution',
      'Use git rebase -i to squash, reword, and reorder messy exploratory commits into clean logical units'
    ],
    whatYouNeedToBuild: {
      description: 'A reproducible conflict scenario resolved cleanly, resulting in a single clean squashed feature commit integrated onto main without syntax or test regressions.',
      diagram: `Conflict Point:
main:      ●────●────● (Pod B refactor)
                  \\
feature:           ●────●────●────● (Pod A - conflicts on database.js)
                      │
                      ▼ (Interactive Rebase & Conflict Resolution)
result:    ●────●────●────● [Clean Linear History with Both Features]`
    },
    requirements: {
      functional: [
        'Merged result must preserve Pod B\'s connection pool improvements AND Pod A\'s SSL security enhancements',
        'Application test suite must pass with 100% success after conflict resolution',
        'Commit history must be cleaned into at most 2 cohesive, descriptive commits'
      ],
      technical: [
        'Enable merge.conflictStyle = diff3 or zdiff3',
        'Use git rebase -i HEAD~N to squash messy intermediate commits',
        'Use git rerere (reuse recorded resolution) to eliminate repetitive conflict solving'
      ],
      security: [
        'Ensure no conflict marker residue (<<<<<<<, =======, >>>>>>>) is committed into codebase'
      ]
    },
    architecture: {
      summary: 'Three-way merge base resolution comparing base ancestor, our branch, and their branch.',
      diagram: `Common Ancestor (Base) ──┬──> HEAD (main) ─────────┐
                               └──> Inbound (feature) ───┴──> Resolved Merge`,
      components: [
        { name: 'Common Ancestor', role: 'Original commit from which both branches diverged', technologies: ['Git Tree'] },
        { name: 'Ours (HEAD)', role: 'Current branch version already on destination', technologies: ['Git Commit'] },
        { name: 'Theirs (Inbound)', role: 'Incoming branch changes to be integrated', technologies: ['Git Commit'] },
        { name: 'Resolved File', role: 'Human-curated synthesis of both changes', technologies: ['Working Tree'] }
      ]
    },
    technologyRequirements: {
      required: ['Git CLI 2.30+', 'Diff tool / Text Editor with Git diff integration'],
      optional: ['VS Code merge editor / Vimdiff', 'git rerere cache'],
      outOfScope: ['Third-party binary merge automators']
    },
    functionalRequirements: [
      'Simulate a deliberate conflict by editing identical lines in two branches',
      'Resolve the conflict, mark resolved with git add, and finalize merge/rebase'
    ],
    technicalRequirements: [
      'Demonstrate aborting a failed rebase with git rebase --abort',
      'Demonstrate continuing a resolved rebase with git rebase --continue',
      'Squash 5+ exploratory commits into 1 production-ready feature commit'
    ],
    securityRequirements: [
      'Run grep -rn "<<<<<<<" . before committing to verify zero leftover conflict markers'
    ],
    constraints: [
      'Do not choose "accept ours" or "accept theirs" blindly; both changes must be synthesized',
      'Do not force push to shared public branches'
    ],
    expectedOutcome: 'Complete confidence and mastery in deconstructing, analyzing, and resolving severe code conflicts and delivering clean linear Git histories.',
    deliverables: [
      'Repository containing conflict simulation and documented resolution steps',
      'Clean git log showing squashed, descriptive commit history',
      'Step-by-step resolution case study in CONFLICT_RESOLUTION.md'
    ],
    suggestedProjectStructure: `conflict-lab/
├── CONFLICT_RESOLUTION.md
├── README.md
├── config/
│   └── database.js (resolved)
└── tests/
    └── db.test.js`,
    requiredConcepts: [
      { name: 'Merge Conflicts & 3-Way Diffs', lessonId: 'c-11-04', academyRoute: '/git' },
      { name: 'Git Rebase Primitives', lessonId: 'c-12-03', academyRoute: '/git' },
      { name: 'Interactive Rebase (-i)', lessonId: 'c-12-03', academyRoute: '/git' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 11: Merge Strategies & Conflict Markers', route: '/cloudstack/git?concept=c-11-04' },
        { title: 'Chapter 12: Rebase & History Rewriting', route: '/cloudstack/git?concept=c-12-03' }
      ],
      officialDocs: [
        { title: 'Git Branching - Rebasing', url: 'https://git-scm.com/book/en/v2/Git-Branching-Rebasing' },
        { title: 'Git Tools - Advanced Merging', url: 'https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging' }
      ],
      referenceMaterial: ['Atlassian: Merging vs Rebasing Guide', 'Git rerere Documentation'],
      usefulCommands: ['git rebase -i HEAD~5', 'git status', 'git rebase --continue', 'git rebase --abort']
    },
    recommendedApproach: [
      '1. Enable diff3 conflict style globally: git config --global merge.conflictStyle diff3.',
      '2. Create a base branch with a configuration file containing server port and database host.',
      '3. On branch feature-a, update the database host and add connection pooling.',
      '4. On branch feature-b (from base), update the same database host to a cluster URL and add SSL options.',
      '5. Merge feature-a into main.',
      '6. Switch to feature-b and execute git rebase main to trigger deliberate conflicts.',
      '7. Examine the 3 sections in the conflict markers: <<<<<<<, |||||||, >>>>>>>.',
      '8. Synthesize both changes into a valid configuration file.',
      '9. Stage resolved file with git add config/database.js and run git rebase --continue.',
      '10. Perform interactive rebase on feature-b to squash any leftover checkpoint commits into one clean commit.'
    ],
    importantConsiderations: [
      'Why does diff3 provide essential context that standard 2-way conflict markers lack?',
      'Why must you never rebase commits that have already been published and shared on public branches?',
      'How does git rerere save engineering hours during complex release merges?'
    ],
    commonPitfalls: [
      'Accidentally committing git conflict marker syntax into production builds.',
      'Using git rebase without checking git status first and losing orientation.',
      'Running git checkout --theirs on files where both changes needed to be merged together.'
    ],
    optionalEnhancements: {
      beginner: ['Enable git rerere (git config --global rerere.enabled true).'],
      intermediate: ['Configure a visual merge tool like VS Code or Meld.'],
      advanced: ['Write a pre-commit git hook that automatically blocks commits containing <<<<<<< markers.'],
      expert: ['Demonstrate resolving conflicts during a multi-commit cherry-pick sequence.']
    },
    completionChecklist: [
      'diff3 conflict style enabled in Git configuration',
      'Deliberate multi-file conflict generated across two branches',
      '3-way conflict markers parsed and understood',
      'Both pod features preserved in final synthesized code',
      'Test suite executes with 100% success after resolution',
      'Messy intermediate commits squashed using git rebase -i',
      'Zero conflict markers remaining in repository',
      'Case study documented in CONFLICT_RESOLUTION.md'
    ]
  },
  {
    id: 'git-05',
    code: 'GIT-05',
    title: 'Release Management & Semantic Versioning',
    academy: 'git',
    difficulty: 'Intermediate+',
    estimatedTime: '8-12 hours',
    technologies: ['Git Tags', 'SemVer 2.0.0', 'GPG Signing', 'Changelogs', 'Releases'],
    overview: 'Establish an immutable software release pipeline using Semantic Versioning (SemVer), cryptographically signed annotated tags, release branches, and automated changelogs.',
    tags: ['git', 'tags', 'semver', 'release-management', 'gpg-signing', 'changelog'],
    projectOverview: {
      projectName: 'Release Management & Semantic Versioning',
      academy: 'git',
      difficulty: 'Intermediate+',
      estimatedEffort: '8-12 hours',
      technologies: ['Git Annotated Tags', 'GPG Signing', 'Semantic Versioning', 'Release Branches'],
      shortDescription: 'Implement an immutable release lifecycle tagging milestones with cryptographic signatures and generating automated changelog releases.'
    },
    scenario: 'Your platform has achieved version 1.0.0 and is distributed to enterprise customers. Customers report regression issues when untagged commits are deployed. The CTO requires all deployments to map directly to immutable, GPG-signed annotated Git tags compliant with SemVer 2.0.0.',
    problemStatement: 'Developers currently use lightweight tags (git tag v1.0) without cryptographic signatures, release notes, or author metadata. As a result, build artifacts cannot be traced back to exact commit SHAs, leading to compliance failures in security audits.',
    projectObjective: [
      'Distinguish lightweight tags from annotated and cryptographically signed tags',
      'Apply Semantic Versioning rules (MAJOR.MINOR.PATCH) based on breaking changes and bugfixes',
      'Configure GPG commit and tag signing with verified status',
      'Establish release branches (release/v1.1.0) and generate automated release notes'
    ],
    whatYouNeedToBuild: {
      description: 'A versioned repository featuring SemVer tags, GPG signature verification, release branch lifecycle, and CHANGELOG.md.',
      diagram: `main:          ●──────●──────● (v1.0.0 Tag [GPG Signed])
                        \\
release/v1.1:            ●──────● (v1.1.0-rc1) ──> (v1.1.0 Tag)`
    },
    requirements: {
      functional: [
        'Every published production release must correspond to a signed annotated tag',
        'Release notes must list bug fixes, new features, and breaking changes separately',
        'Hotfixes must be backported to active release branches'
      ],
      technical: [
        'Use git tag -a -s <tagname> -m "<message>"',
        'Verify signatures with git tag -v <tagname>',
        'Maintain CHANGELOG.md adhering to Keep a Changelog standards'
      ],
      security: [
        'Generate and link a 4096-bit RSA or Ed25519 GPG signing key',
        'Never delete or overwrite an existing release tag on remote'
      ]
    },
    architecture: {
      summary: 'Immutable tag object pointer referencing commit SHA with cryptographic signature.',
      diagram: `Tag Object (v1.2.0) ──> [Commit SHA] ──> [Tree Object]
  ├── Tagger: Name <email>
  ├── Date & Message
  └── GPG Signature (pgp-sig)`,
      components: [
        { name: 'Annotated Tag', role: 'Full Git object stored in .git/objects', technologies: ['Git Object Store'] },
        { name: 'GPG Keypair', role: 'Cryptographic proof of engineering identity', technologies: ['GnuPG / OpenPGP'] },
        { name: 'Release Branch', role: 'Stabilization branch for hardening before final tag', technologies: ['Git Branch'] }
      ]
    },
    technologyRequirements: {
      required: ['Git CLI 2.30+', 'GnuPG (gpg) tool'],
      optional: ['standard-version / conventional-changelog'],
      outOfScope: ['Docker image building (covered in Docker/DevOps)']
    },
    functionalRequirements: [
      'Create tag v1.0.0, apply patch bugfix for v1.0.1, and introduce minor feature for v1.1.0',
      'Verify that git describe accurately outputs the latest tag and commit offset'
    ],
    technicalRequirements: [
      'Publish tags to remote using git push origin <tagname> (avoiding git push --tags in production)',
      'Construct CHANGELOG.md covering at least three distinct version milestones'
    ],
    securityRequirements: [
      'Verify tag signature with git tag -v and ensure Good signature output'
    ],
    constraints: [
      'Do not use lightweight tags (without -a or -s) for official releases',
      'Never move an existing tag to a different commit once pushed to remote'
    ],
    expectedOutcome: 'An enterprise-grade release pipeline guaranteeing traceable, cryptographically verified software versions.',
    deliverables: [
      'Repository containing signed annotated tags v1.0.0, v1.0.1, and v1.1.0',
      'Comprehensive CHANGELOG.md',
      'Documented release SOP in RELEASE_PROCESS.md'
    ],
    suggestedProjectStructure: `product-repo/
├── .git/
├── CHANGELOG.md
├── RELEASE_PROCESS.md
├── package.json (or pyproject.toml / VERSION)
└── src/
    └── index.js`,
    requiredConcepts: [
      { name: 'Git Tagging Primitives', lessonId: 'c-18-04', academyRoute: '/git' },
      { name: 'Release Management', lessonId: 'c-31-08', academyRoute: '/git' },
      { name: 'Cryptographic Signing', lessonId: 'c-23-24', academyRoute: '/git' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 18: Tags, Releases & Stashing', route: '/cloudstack/git?concept=c-18-04' },
        { title: 'Chapter 31: Release Automation', route: '/cloudstack/git?concept=c-31-08' }
      ],
      officialDocs: [
        { title: 'Git Basics - Tagging', url: 'https://git-scm.com/book/en/v2/Git-Basics-Tagging' },
        { title: 'Semantic Versioning 2.0.0 Specification', url: 'https://semver.org/' }
      ],
      referenceMaterial: ['Keep a Changelog Guide', 'GitHub Docs: Managing Releases'],
      usefulCommands: ['git tag -s v1.0.0 -m "Release 1.0.0"', 'git tag -v v1.0.0', 'git describe --tags', 'git push origin v1.0.0']
    },
    recommendedApproach: [
      '1. Generate a GPG key: gpg --full-generate-key and export to your Git config.',
      '2. Configure user.signingkey in local Git repository.',
      '3. Stabilize codebase on main and prepare initial release notes in CHANGELOG.md.',
      '4. Cut annotated signed tag: git tag -s v1.0.0 -m "Release v1.0.0 - Initial production launch".',
      '5. Verify tag integrity with git tag -v v1.0.0.',
      '6. Push tag explicitly: git push origin v1.0.0.',
      '7. Simulate a patch bug fix on a release branch, cherry-pick to main, and cut v1.0.1.',
      '8. Simulate a minor feature addition and release v1.1.0 following strict SemVer rules.'
    ],
    importantConsiderations: [
      'Why is git push --tags dangerous in large teams compared to explicit git push origin <tag>?',
      'What is the consequence of breaking API compatibility in a minor release according to SemVer?',
      'How does git describe enable build tooling to inject dynamic commit versions into binaries?'
    ],
    commonPitfalls: [
      'Tagging the wrong commit due to working tree discrepancies.',
      'Forgetting to push tags to the remote repository after creating them locally.',
      'Rewriting tags that other developers or build agents have already pulled.'
    ],
    optionalEnhancements: {
      beginner: ['Create automated GitHub Releases linking to tag assets.'],
      intermediate: ['Integrate standard-version to bump version numbers and update CHANGELOG automatically.'],
      advanced: ['Configure GitHub tag protection rules preventing tag deletion or force-pushing.'],
      expert: ['Set up automated release build validation via GitHub Actions on tag push events.']
    },
    completionChecklist: [
      'GPG signing key configured and validated with Git',
      'v1.0.0 signed annotated tag created and pushed',
      'v1.0.1 patch release created on release branch and merged',
      'v1.1.0 minor feature release created and tagged',
      'Signatures verified using git tag -v',
      'CHANGELOG.md maintained with separate categories for changes',
      'Release SOP documented in RELEASE_PROCESS.md',
      'git describe outputs accurate tag distance string'
    ]
  },
  {
    id: 'git-06',
    code: 'GIT-06',
    title: 'Git Flow vs Trunk-Based Development Comparison',
    academy: 'git',
    difficulty: 'Advanced',
    estimatedTime: '10-14 hours',
    technologies: ['Git Flow', 'Trunk-Based Development', 'Feature Flags', 'Branch Policies'],
    overview: 'Architect and benchmark the two dominant enterprise branching models: Git Flow (develop, release, hotfix) versus Trunk-Based Development with short-lived branches and feature flags.',
    tags: ['git', 'git-flow', 'trunk-based-development', 'branching-models', 'feature-flags'],
    projectOverview: {
      projectName: 'Git Flow vs Trunk-Based Development Comparison',
      academy: 'git',
      difficulty: 'Advanced',
      estimatedEffort: '10-14 hours',
      technologies: ['Git Flow Architecture', 'Trunk-Based Development', 'Release Hardening', 'Feature Flags'],
      shortDescription: 'Build parallel reference repositories implementing both Git Flow and Trunk-Based Development and evaluate deployment velocity and merge complexity.'
    },
    scenario: 'Your enterprise engineering organization is debating whether to keep traditional Git Flow (with develop, release, hotfix, and master branches) or migrate to high-velocity Trunk-Based Development (TBD) with daily trunk merges. As Staff Engineer, you must prototype both models, simulate release cycles, and deliver an architectural decision record (ADR).',
    problemStatement: 'Git Flow is causing "merge hell" during monthly release stabilization periods where long-lived develop and release branches diverge. Management wants faster continuous deployment, but QA fears releasing unvetted code without traditional release branches.',
    projectObjective: [
      'Construct a complete Git Flow repository with main, develop, feature/*, release/*, and hotfix/* branches',
      'Construct a Trunk-Based Development repository using main, short-lived (<24h) branches, and feature flags',
      'Simulate parallel feature delivery, scheduled release, and emergency hotfix in both models',
      'Produce an Architectural Decision Record (ADR) analyzing lead time, conflict frequency, and operational overhead'
    ],
    whatYouNeedToBuild: {
      description: 'Two fully functional Git repositories demonstrating Git Flow and Trunk-Based Development through simulated sprints and hotfixes.',
      diagram: `Model A: Git Flow
main:        ●────────────────────────● (v1.0.0) ──────────● (v1.0.1 Hotfix)
              \\                      /                    /
hotfix:        \\                    /          ●─────────'
                \\                  /
release:         \\       ●────────' (v1.0.0-rc)
                  \\     /
develop:           ●───●──────●──────● (Ongoing integration)
                    \\ /      /
feature:             ●──────'

Model B: Trunk-Based Development
trunk (main): ●──●──●──●──●──●──●──●──●──●──● (Daily short-lived merges & Feature Flags)`
    },
    requirements: {
      functional: [
        'Git Flow repo must demonstrate strict branch separation and two-way merges (release into main AND develop)',
        'Trunk-Based repo must demonstrate trunk merges with code gated behind application feature flag switches',
        'Both models must demonstrate emergency hotfix delivery'
      ],
      technical: [
        'Enforce no-ff merges in Git Flow for audit history preservation',
        'Enforce squash-and-merge or fast-forward in Trunk-Based Development',
        'Include feature flag configuration demonstrating inactive dark launches'
      ],
      security: [
        'Branch protection on main and develop in Git Flow',
        'Branch protection with mandatory CI status checks on trunk in TBD'
      ]
    },
    architecture: {
      summary: 'Comparative architectural evaluation of multi-branch vs single-trunk delivery.',
      diagram: `Git Flow: Multi-Layer Isolation (Low Velocity, High Gatekeeping)
VS
Trunk-Based: Single Stream + Continuous Integration (High Velocity, Flag Governance)`,
      components: [
        { name: 'Git Flow develop', role: 'Perpetual pre-production integration branch', technologies: ['Git Branch'] },
        { name: 'Git Flow release/*', role: 'Temporary stabilization branch for QA bugfixing', technologies: ['Git Branch'] },
        { name: 'Trunk (main)', role: 'Single source of truth with daily releases', technologies: ['Git Trunk'] },
        { name: 'Feature Flag Config', role: 'Runtime decoupling of deployment from release', technologies: ['JSON / Env Config'] }
      ]
    },
    technologyRequirements: {
      required: ['Git CLI 2.30+', 'GitHub / GitLab repositories (2 distinct repos)'],
      optional: ['git-flow AVH edition CLI helper'],
      outOfScope: ['Full microservices production deployment']
    },
    functionalRequirements: [
      'Deliver Feature X and Feature Y in both repositories',
      'Perform simulated v1.0.0 release in both repositories',
      'Apply an emergency Hotfix 1.0.1 in both repositories'
    ],
    technicalRequirements: [
      'Document git log --graph comparison of both repository DAGs',
      'Author ADR-001-BRANCHING-STRATEGY.md detailing findings and recommendations'
    ],
    securityRequirements: [
      'Audit access control policies for release cutting in both models'
    ],
    constraints: [
      'In Trunk-Based model, no branch may remain active for more than 3 simulated commits',
      'In Git Flow, hotfix must be merged back into BOTH main and develop'
    ],
    expectedOutcome: 'A comprehensive, evidence-based architectural comparison equipping your team to select and govern the optimal Git workflow.',
    deliverables: [
      'Repository 1: Complete Git Flow implementation with full branch tree',
      'Repository 2: Complete Trunk-Based Development implementation with feature flags',
      'ADR-001-BRANCHING-STRATEGY.md comparing merge overhead, CI/CD compatibility, and lead time'
    ],
    suggestedProjectStructure: `branching-benchmark/
├── git-flow-prototype/
│   ├── .git/
│   └── src/
├── trunk-based-prototype/
│   ├── .git/
│   ├── flags.config.json
│   └── src/
└── ADR-001-BRANCHING-STRATEGY.md`,
    requiredConcepts: [
      { name: 'Branching Basics', lessonId: 'c-10-03', academyRoute: '/git' },
      { name: 'Merge Strategies', lessonId: 'c-11-04', academyRoute: '/git' },
      { name: 'Rebase vs Merge', lessonId: 'c-12-03', academyRoute: '/git' },
      { name: 'Release Automation', lessonId: 'c-31-08', academyRoute: '/git' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 10: Git Branching Models', route: '/cloudstack/git?concept=c-10-03' },
        { title: 'Chapter 11: Fast-Forward vs Recursive Merges', route: '/cloudstack/git?concept=c-11-04' }
      ],
      officialDocs: [
        { title: 'Trunk-Based Development Guide', url: 'https://trunkbaseddevelopment.com/' },
        { title: 'A Successful Git Branching Model (Vincent Driessen)', url: 'https://nvie.com/posts/a-successful-git-branching-model/' }
      ],
      referenceMaterial: ['Martin Fowler: Branch by Abstraction', 'DORA Metrics on Trunk-Based Development'],
      usefulCommands: ['git merge --no-ff develop', 'git log --graph --oneline --all', 'git cherry-pick']
    },
    recommendedApproach: [
      '1. Create repository A (git-flow) and initialize main and develop branches.',
      '2. Spin up feature/billing branch from develop, commit, and merge back to develop with --no-ff.',
      '3. Create release/v1.0.0 from develop, commit stabilization bugfix, and merge to both main and develop.',
      '4. Cut hotfix/v1.0.1 from main, apply fix, and merge to both main and develop.',
      '5. Create repository B (trunk-based) with a single main trunk.',
      '6. Implement feature/billing with a feature flag (ENABLED: false), merge to trunk within 1 day.',
      '7. Toggle feature flag in configuration to activate feature in production.',
      '8. Compare commit graphs, number of merge operations, and risk profiles in ADR-001.'
    ],
    importantConsiderations: [
      'Why does Trunk-Based Development require higher automated test coverage than Git Flow?',
      'How do feature flags allow decoupling code deployment from business release?',
      'Why do long-lived release branches in Git Flow increase technical debt?'
    ],
    commonPitfalls: [
      'Forgetting to merge release or hotfix branches back into develop in Git Flow, causing regressions.',
      'Treating Trunk-Based Development as "everyone commits directly to main without PRs or tests".'
    ],
    optionalEnhancements: {
      beginner: ['Add automated branch naming linting via Git hooks.'],
      intermediate: ['Integrate a lightweight runtime feature flag library.'],
      advanced: ['Simulate branch-by-abstraction for a major database interface migration.'],
      expert: ['Benchmark DORA deployment frequency metrics across both workflow prototypes.']
    },
    completionChecklist: [
      'Git Flow repository created with main, develop, and feature branches',
      'Git Flow release branch cut, stabilized, and merged into main and develop',
      'Git Flow hotfix branch applied to main and backported to develop',
      'Trunk-Based repository created with short-lived branch integration',
      'Feature flag implemented to decouple deployment from release in TBD',
      'Both repository graphs inspected and documented with git log --graph',
      'ADR-001-BRANCHING-STRATEGY.md completed with trade-off matrix'
    ]
  },
  {
    id: 'git-07',
    code: 'GIT-07',
    title: 'Large Team Monorepo & Submodules Architecture',
    academy: 'git',
    difficulty: 'Advanced+',
    estimatedTime: '12-16 hours',
    technologies: ['Git Submodules', 'Monorepos', 'Sparse Checkout', 'Git LFS', 'CODEOWNERS'],
    overview: 'Manage enterprise multi-project repositories using Git Submodules, sparse checkout, shallow clones, and granular CODEOWNERS review permissions.',
    tags: ['git', 'monorepo', 'submodules', 'sparse-checkout', 'codeowners', 'git-lfs'],
    projectOverview: {
      projectName: 'Large Team Monorepo & Submodules Architecture',
      academy: 'git',
      difficulty: 'Advanced+',
      estimatedEffort: '12-16 hours',
      technologies: ['Git Submodules', 'Sparse Checkout', 'CODEOWNERS', 'Shallow Clones'],
      shortDescription: 'Architect a multi-component enterprise repository combining shared library submodules, selective sparse checkout, and granular team ownership.'
    },
    scenario: 'Your organization runs 3 distinct client applications (Web, Mobile Backend, Admin Portal) that depend on a shared core authentication and cryptographic library. Engineering wants the library versioned independently while allowing applications to link to pinned, auditable commits.',
    problemStatement: 'Developers currently copy-paste shared authentication code across 3 separate repositories, causing severe security drift and desynchronized bugfixes. Furthermore, the combined codebase is becoming bloated with binary design assets, slowing down developer clones.',
    projectObjective: [
      'Structure an independent shared-core repository and link it as a Git submodule into parent applications',
      'Manage submodule pointers, update submodules, and handle detached HEAD states within submodules',
      'Configure sparse checkout to allow developers to clone and work on only their specific subsystem',
      'Establish a comprehensive CODEOWNERS configuration enforcing required reviews per directory'
    ],
    whatYouNeedToBuild: {
      description: 'A parent application repository incorporating an independent shared-core Git submodule with sparse-checkout configuration and CODEOWNERS enforcement.',
      diagram: `Parent App (enterprise-platform)
├── apps/web/               ──> (Owned by @team-web)
├── apps/api/               ──> (Owned by @team-backend)
├── .gitmodules             ──> (Tracks shared-core commit SHA)
└── shared/core/ (Submodule) ──> [Independent Git Repository: shared-core.git]`
    },
    requirements: {
      functional: [
        'Parent repository can be cloned with --recurse-submodules to instantiate complete project stack',
        'Submodule must be pinned to an explicit immutable commit hash in the parent repository index',
        'Updating shared-core in the parent repository must require an explicit submodule commit pointer bump'
      ],
      technical: [
        'Use git submodule add <url> <path> and git submodule update --init --recursive',
        'Configure git config core.sparseCheckout true to check out only apps/web',
        'Provide valid .github/CODEOWNERS defining path-based reviewer assignments'
      ],
      security: [
        'Verify submodules point to verified internal repository URLs, preventing submodule injection attacks'
      ]
    },
    architecture: {
      summary: 'Composite repository architecture linking discrete Git repositories via gitlink tree entries.',
      diagram: `Parent Repo (.git) ──gitlink──> Submodule Commit SHA ──> [External Git Repo Objects]`,
      components: [
        { name: 'Parent Repository', role: 'Orchestrating container for enterprise applications', technologies: ['Git Repo'] },
        { name: 'Submodule gitlink', role: 'Special tree entry storing commit SHA of submodule', technologies: ['Git Tree Object'] },
        { name: '.gitmodules', role: 'Configuration file mapping submodule path to remote URL', technologies: ['Git Config'] },
        { name: 'CODEOWNERS', role: 'Rule engine delegating PR reviews by directory hierarchy', technologies: ['GitHub Config'] }
      ]
    },
    technologyRequirements: {
      required: ['Git CLI 2.30+', 'GitHub / GitLab organization or user account'],
      optional: ['Git Sparse-Checkout (native git 2.25+)'],
      outOfScope: ['Bazel / Nx monorepo build tools']
    },
    functionalRequirements: [
      'Create shared-core repository with version 1.0.0',
      'Add shared-core as submodule in enterprise-platform under shared/core',
      'Publish a bug fix in shared-core, and update the parent repository pointer to version 1.0.1'
    ],
    technicalRequirements: [
      'Demonstrate cloning parent with git clone --recurse-submodules',
      'Demonstrate sparse checkout enabling a developer to download only apps/web and shared/core',
      'Validate CODEOWNERS syntax with GitHub PR review simulator'
    ],
    securityRequirements: [
      'Ensure .gitmodules uses relative paths or HTTPS/SSH URLs without credentials'
    ],
    constraints: [
      'Do not modify submodule files inside parent without committing and pushing in the submodule repository first',
      'Do not check out submodules on unpinned floating branch heads in production'
    ],
    expectedOutcome: 'A modular, high-scale enterprise repository setup balancing shared library reuse with performance optimizations for large distributed teams.',
    deliverables: [
      'Repository 1: shared-core (independent library)',
      'Repository 2: enterprise-platform (parent repository with submodule)',
      '.gitmodules configuration',
      '.github/CODEOWNERS file',
      'Developer onboarding manual in MONOREPO_GUIDE.md'
    ],
    suggestedProjectStructure: `enterprise-platform/
├── .git/
├── .gitmodules
├── .github/
│   └── CODEOWNERS
├── MONOREPO_GUIDE.md
├── apps/
│   ├── web/
│   └── api/
└── shared/
    └── core/ (submodule -> shared-core.git)`
  }
];

console.log('Writing git capstones...');
