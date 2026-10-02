import { CapstoneProject } from '../types';

export const GIT_CAPSTONES: CapstoneProject[] = [
  {
    "id": "git-01",
    "code": "GIT-01",
    "title": "Personal Project Version Control",
    "academy": "git",
    "difficulty": "Beginner",
    "estimatedTime": "4-6 hours",
    "technologies": [
      "Git CLI",
      "GitHub / GitLab",
      "Markdown"
    ],
    "overview": "Initialize, configure, and maintain a clean personal project repository with atomic commits, structured commit messages, and a production-grade .gitignore.",
    "tags": [
      "git",
      "cli",
      "version-control",
      "initialization",
      "commits"
    ],
    "projectOverview": {
      "projectName": "Personal Project Version Control",
      "academy": "git",
      "difficulty": "Beginner",
      "estimatedEffort": "4-6 hours",
      "technologies": [
        "Git CLI",
        "GitHub / GitLab",
        "Markdown"
      ],
      "shortDescription": "Initialize and maintain a clean project repository from scratch using atomic commits, structured commit messages, and an exhaustive .gitignore."
    },
    "scenario": "You have joined a software consultancy that requires all developers to establish clean version control hygiene from day one. You have been assigned to take an unversioned multi-file utility script project and establish an auditable, reproducible Git repository with professional commit message conventions and ignored runtime artifacts.",
    "problemStatement": "The current utility script directory contains raw source code, temporary test logs, virtual environment binaries, and API secret files mixed together without version history. Developers frequently overwrite each other's changes or accidentally commit sensitive keys. Your task is to establish a pristine repository baseline.",
    "projectObjective": [
      "Initialize a clean Git repository with proper user identity and configuration",
      "Establish a comprehensive .gitignore file preventing tracking of credentials, build artifacts, and OS files",
      "Create structured atomic commits following the Conventional Commits specification",
      "Publish the repository to a remote Git hosting provider with an expressive README and license"
    ],
    "whatYouNeedToBuild": {
      "description": "A versioned project directory with pristine working tree, clear commit log history, configured remotes, and excluded runtime noise.",
      "diagram": "[Unversioned Directory]\n         │\n         ▼ (git init & config)\n[Git Working Tree] ──> [.gitignore Filter] ──> [Staging Area] ──> [Local Commit History] ──> [Remote (origin/main)]"
    },
    "requirements": {
      "functional": [
        "Repository must track all essential source files while completely ignoring build outputs and sensitive files",
        "Commit history must demonstrate logical, atomic increments rather than a single bulk commit",
        "Repository must be pushed to a remote repository with a synchronized default branch (main)"
      ],
      "technical": [
        "Use git version 2.30+ commands",
        "Configure user.name and user.email locally within the repository",
        "Enforce Conventional Commit message format (feat:, fix:, chore:, docs:)"
      ],
      "security": [
        "Ensure no environment files (.env) or private API tokens are committed",
        "Verify .gitignore actively ignores secret files before staging",
        "Use SSH keys or personal access tokens for authenticated remote operations"
      ]
    },
    "architecture": {
      "summary": "Local working tree with staging area, commit DAG, and remote tracking branch.",
      "diagram": "Working Directory ──(git add)──> Staging Index ──(git commit)──> Local Repo (.git) ──(git push)──> Remote (GitHub)",
      "components": [
        {
          "name": "Working Tree",
          "role": "Local filesystem files edited by developer",
          "technologies": [
            "Filesystem"
          ]
        },
        {
          "name": "Index (Staging)",
          "role": "Preparation area for atomic snapshots",
          "technologies": [
            "Git Index"
          ]
        },
        {
          "name": "Commit History",
          "role": "Immutable DAG of project snapshots",
          "technologies": [
            "Git Commit Graph"
          ]
        },
        {
          "name": "Remote Origin",
          "role": "Off-site backup and collaboration target",
          "technologies": [
            "GitHub / GitLab"
          ]
        }
      ]
    },
    "technologyRequirements": {
      "required": [
        "Git CLI 2.30+",
        "Markdown for documentation",
        "Remote Git Provider (GitHub/GitLab/Gitea)"
      ],
      "optional": [
        "git-cliff or commitlint for message validation"
      ],
      "outOfScope": [
        "Complex CI/CD pipelines",
        "Multi-service deployment"
      ]
    },
    "functionalRequirements": [
      "Git repository initialized with default branch named main",
      ".gitignore configured to block *.log, .env*, build/, node_modules/, and .DS_Store",
      "Minimum of 5 atomic commits reflecting distinct milestones (docs, scaffolding, core logic, tests, ignore)",
      "Clean git status with zero untracked runtime artifacts",
      "Remote origin connected and push successful"
    ],
    "technicalRequirements": [
      "Repository must contain an expressive README.md explaining project purpose and execution instructions",
      "Project history must be linear without unneeded merge bubbles",
      "Commit log must pass formatting validation according to Conventional Commits"
    ],
    "securityRequirements": [
      "Zero secrets committed into Git index or historical reflog",
      "Correct file permissions (non-executable scripts unless intended as binaries)"
    ],
    "constraints": [
      "Do not perform a single blanket \"git add .\" without verifying .gitignore rules first",
      "Do not use generic commit messages such as \"update\", \"wip\", or \"changes\"",
      "Do not commit compiled binaries or vendor dependencies"
    ],
    "expectedOutcome": "A professional, auditable repository ready for team sharing with clean commit logs, properly isolated environment secrets, and complete project documentation.",
    "deliverables": [
      "Initialized Git repository with .git directory",
      "Production-grade .gitignore tailored to project stack",
      "README.md containing architecture overview and usage guidelines",
      "Commit history showcasing atomic, conventional commit messages",
      "Remote repository URL with synchronized main branch"
    ],
    "suggestedProjectStructure": "project-root/\n├── .git/\n├── .gitignore\n├── README.md\n├── LICENSE\n├── package.json (or pyproject.toml / requirements.txt)\n├── src/\n│   ├── index.js (or main.py)\n│   └── utils.js\n└── tests/\n    └── test_index.js",
    "requiredConcepts": [
      {
        "name": "Git Mental Model & Philosophy",
        "lessonId": "c-01-01",
        "academyRoute": "/git"
      },
      {
        "name": "Initializing Repositories",
        "lessonId": "c-03-01",
        "academyRoute": "/git"
      },
      {
        "name": "Staging Hygiene & .gitignore",
        "lessonId": "c-06-02",
        "academyRoute": "/git"
      },
      {
        "name": "Atomic Commits",
        "lessonId": "c-08-01",
        "academyRoute": "/git"
      }
    ],
    "resources": {
      "academyLessons": [
        {
          "title": "Chapter 01: Git Mental Model & Philosophy",
          "route": "/cloudstack/git?concept=c-01-01"
        },
        {
          "title": "Chapter 03: Initializing Repositories",
          "route": "/cloudstack/git?concept=c-03-01"
        },
        {
          "title": "Chapter 06: Staging Hygiene & .gitignore",
          "route": "/cloudstack/git?concept=c-06-02"
        }
      ],
      "officialDocs": [
        {
          "title": "Git Documentation: git-init",
          "url": "https://git-scm.com/docs/git-init"
        },
        {
          "title": "Conventional Commits 1.0.0",
          "url": "https://www.conventionalcommits.org/"
        }
      ],
      "referenceMaterial": [
        "GitHub gitignore collection repository",
        "Pro Git Book: Chapter 2 - Git Basics"
      ],
      "usefulCommands": [
        "git init -b main",
        "git config user.name \"Your Name\"",
        "git status -u",
        "git add -p",
        "git commit -m \"feat: add user authentication\""
      ]
    },
    "recommendedApproach": [
      "1. Analyze all files in the current folder and categorize them into source vs transient artifacts.",
      "2. Craft an exhaustive .gitignore file covering dependencies, secrets, build artifacts, and OS cache.",
      "3. Initialize the Git repository with default branch main.",
      "4. Configure local user name and email settings for this project.",
      "5. Add and commit .gitignore first to ensure rules are active immediately.",
      "6. Create a comprehensive README.md with project title, prerequisites, and setup instructions.",
      "7. Stage core source files in logical atomic units and author descriptive conventional commits.",
      "8. Add test files in a dedicated test commit.",
      "9. Connect a remote repository on GitHub/GitLab and push the main branch.",
      "10. Verify remote state and check git log to ensure linear history."
    ],
    "importantConsiderations": [
      "What happens if a sensitive file is committed and pushed before being added to .gitignore?",
      "How does an atomic commit history aid future debugging with git bisect?",
      "Why is it critical to explicitly configure user.name and user.email per project when using shared workstations?"
    ],
    "commonPitfalls": [
      "Adding files to .gitignore after they have already been staged, requiring index untracking.",
      "Creating monolithic commits combining bug fixes, documentation changes, and refactoring.",
      "Using vague commit messages that fail to convey the intent or context of changes."
    ],
    "optionalEnhancements": {
      "beginner": [
        "Add a pre-commit hook that checks for trailing whitespace."
      ],
      "intermediate": [
        "Install commitlint with Husky to automatically validate Conventional Commits."
      ],
      "advanced": [
        "Configure a GitHub Action to verify repository linting on push."
      ],
      "expert": [
        "Implement GPG commit signing and verify signed badge on remote commits."
      ]
    },
    "completionChecklist": [
      "Git repository successfully initialized with main branch",
      "Local repository user.name and user.email configured",
      ".gitignore created and verified against secrets and transient logs",
      "README.md authored with clear project documentation",
      "Minimum of 5 atomic commits created using Conventional Commits syntax",
      "Remote origin configured and pushed successfully",
      "Git status reports working tree clean"
    ],
    "objectives": [
      "Initialize a clean Git repository with proper user identity and configuration",
      "Establish a comprehensive .gitignore file preventing tracking of credentials, build artifacts, and OS files",
      "Create structured atomic commits following the Conventional Commits specification",
      "Publish the repository to a remote Git hosting provider with an expressive README and license"
    ],
    "startingState": {
      "description": "Project repository directory for Personal Project Version Control",
      "environment": "Developer Workstation (Git 2.40+ CLI)",
      "startingFiles": {
        "README.md": "# Personal Project Version Control\n\nInitialize, configure, and maintain a clean personal project repository with atomic commits, structured commit messages, and a production-grade .gitignore.\n",
        ".gitignore": "node_modules/\n*.log\n.env\n.DS_Store\n"
      }
    },
    "tasks": [
      {
        "id": "task-1",
        "title": "Git repository initialized with default branch named main",
        "objective": "Git repository initialized with default branch named main",
        "commandSnippet": "git init -b main",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Git repository initialized with default branch named main"
      },
      {
        "id": "task-2",
        "title": ".gitignore configured to block *.log, .env*, build/, node_modules/, and .DS_Store",
        "objective": ".gitignore configured to block *.log, .env*, build/, node_modules/, and .DS_Store",
        "commandSnippet": "git config user.name \"Your Name\"",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": ".gitignore configured to block *.log, .env*, build/, node_modules/, and .DS_Store"
      },
      {
        "id": "task-3",
        "title": "Minimum of 5 atomic commits reflecting distinct milestones (docs, scaffolding, core logic, tests, ignore)",
        "objective": "Minimum of 5 atomic commits reflecting distinct milestones (docs, scaffolding, core logic, tests, ignore)",
        "commandSnippet": "git status -u",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Minimum of 5 atomic commits reflecting distinct milestones (docs, scaffolding, core logic, tests, ignore)"
      },
      {
        "id": "task-4",
        "title": "Clean git status with zero untracked runtime artifacts",
        "objective": "Clean git status with zero untracked runtime artifacts",
        "commandSnippet": "git add -p",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Clean git status with zero untracked runtime artifacts"
      },
      {
        "id": "task-5",
        "title": "Remote origin connected and push successful",
        "objective": "Remote origin connected and push successful",
        "commandSnippet": "git commit -m \"feat: add user authentication\"",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Remote origin connected and push successful"
      }
    ],
    "failureScenarios": [
      {
        "id": "fail-1",
        "title": "Adding files to .gitignore after they have already been staged, requiring index untracking.",
        "symptom": "Git refuses operation due to unstaged modifications or conflicts.",
        "rootCause": "Attempting branch switch, rebase, or merge with dirty working tree.",
        "diagnosticCommand": "git status",
        "fixCommand": "git stash save \"temporary-work\" && git status",
        "verification": "Working tree clean, operation proceeds."
      },
      {
        "id": "fail-2",
        "title": "Creating monolithic commits combining bug fixes, documentation changes, and refactoring.",
        "symptom": "Commit author or branch lineage violates project standard.",
        "rootCause": "Incorrect configuration or wrong base branch.",
        "diagnosticCommand": "git log -n 1",
        "fixCommand": "git commit --amend",
        "verification": "Commit conforms to requirements."
      }
    ],
    "validationChecks": [
      {
        "id": "val-1",
        "label": "Git repository successfully initialized with main branch",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-2",
        "label": "Local repository user.name and user.email configured",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-3",
        "label": ".gitignore created and verified against secrets and transient logs",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-4",
        "label": "README.md authored with clear project documentation",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-5",
        "label": "Minimum of 5 atomic commits created using Conventional Commits syntax",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-6",
        "label": "Remote origin configured and pushed successfully",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-7",
        "label": "Git status reports working tree clean",
        "verificationCommand": "git status",
        "points": 14
      }
    ],
    "scoreMax": 100
  },
  {
    "id": "git-02",
    "code": "GIT-02",
    "title": "Feature Branch Workflow",
    "academy": "git",
    "difficulty": "Beginner+",
    "estimatedTime": "6-8 hours",
    "technologies": [
      "Git CLI",
      "Branching",
      "Fast-Forward Merges",
      "GitHub PRs"
    ],
    "overview": "Establish an isolated feature branch development workflow, create isolated feature branches, author scoped commits, and merge changes cleanly into the main integration branch.",
    "tags": [
      "git",
      "branching",
      "feature-branch",
      "merge",
      "pr"
    ],
    "projectOverview": {
      "projectName": "Feature Branch Workflow",
      "academy": "git",
      "difficulty": "Beginner+",
      "estimatedEffort": "6-8 hours",
      "technologies": [
        "Git CLI",
        "Branching",
        "Pull Requests",
        "Git Log"
      ],
      "shortDescription": "Implement a structured feature branch workflow, maintaining an immaculate main branch while developing features in isolation."
    },
    "scenario": "Your development team is transitioning from committing directly to the main branch to an isolated feature branch strategy. You have been tasked with delivering two separate enhancements (a user profile validator and an export utility) using dedicated feature branches without contaminating the integration line.",
    "problemStatement": "Developers previously committed untested work directly to main, causing broken main builds and blocking release deployments. The team needs a proven workflow demonstrating feature isolation, branch naming standards, and clean merge strategies.",
    "projectObjective": [
      "Establish standardized feature branch naming conventions (feature/xxx, bugfix/xxx)",
      "Develop multiple distinct features in isolated branches without cross-contamination",
      "Inspect diffs between feature branches and main prior to integration",
      "Perform clean merges into main and properly retire completed branches"
    ],
    "whatYouNeedToBuild": {
      "description": "A multi-branch Git workflow history showing isolated branch lifecycles, clear branch divergence, and clean merges.",
      "diagram": "main:         ●───────────────●───────────────────────● (integrated)\n               \\             /                       /\nfeature/auth:   ●─────●─────●                       /\n                       \\                           /\nfeature/export:         ●───────────────●─────────●"
    },
    "requirements": {
      "functional": [
        "Main branch remains stable and testable at all times",
        "Features are built across separate feature/user-profile and feature/data-export branches",
        "Each feature must be merged into main with documented commit history"
      ],
      "technical": [
        "Use git switch / git checkout -b with descriptive names",
        "Use git diff main..feature/xxx to review proposed changes",
        "Delete merged branches locally and remotely after successful integration"
      ],
      "security": [
        "Verify branch permissions and ensure no experimental secrets leak into feature branches"
      ]
    },
    "architecture": {
      "summary": "Branch lifecycle architecture spanning main baseline, isolated feature branches, and integration merges.",
      "diagram": "main [HEAD] ──(branch)──> feature/profile ──(commits)──> review ──(merge)──> main updated",
      "components": [
        {
          "name": "main branch",
          "role": "Production-ready baseline",
          "technologies": [
            "Git Reference"
          ]
        },
        {
          "name": "feature/user-profile",
          "role": "Feature isolation branch for profile validation",
          "technologies": [
            "Git Reference"
          ]
        },
        {
          "name": "feature/data-export",
          "role": "Feature isolation branch for reporting exporter",
          "technologies": [
            "Git Reference"
          ]
        },
        {
          "name": "Merge Engine",
          "role": "Fast-forward or 3-way merge integrator",
          "technologies": [
            "Git Merge"
          ]
        }
      ]
    },
    "technologyRequirements": {
      "required": [
        "Git CLI 2.30+",
        "Remote Git repository (GitHub/GitLab)"
      ],
      "optional": [
        "GitHub CLI (gh) for branch and PR management"
      ],
      "outOfScope": [
        "Automated CI/CD deployments"
      ]
    },
    "functionalRequirements": [
      "Create feature/user-profile branch from main and implement validation utility",
      "Create feature/data-export branch from main and implement export utility",
      "Author at least 2 distinct commits in each feature branch",
      "Merge feature/user-profile into main using fast-forward or merge commit",
      "Merge feature/data-export into main and verify no regression"
    ],
    "technicalRequirements": [
      "Verify commit log with git log --oneline --graph --all",
      "Ensure git branch --merged lists branches ready for pruning",
      "Delete feature branches after successful integration"
    ],
    "securityRequirements": [
      "Ensure test data files used in feature development do not contain live user credentials"
    ],
    "constraints": [
      "Never commit code directly to main while feature branches are active",
      "Do not merge a feature branch without inspecting its diff against main first",
      "Maintain clear separation: do not bundle data export commits into the user profile branch"
    ],
    "expectedOutcome": "A clean, understandable Git commit graph demonstrating parallel feature isolation, structured integration into main, and post-merge branch cleanup.",
    "deliverables": [
      "Repository with completed merge history visible via git log --graph",
      "BRANCHING_GUIDE.md detailing branch naming rules and merge checklist",
      "Pruned branch state where temporary feature branches have been deleted"
    ],
    "suggestedProjectStructure": "project/\n├── .git/\n├── BRANCHING_GUIDE.md\n├── src/\n│   ├── index.js\n│   ├── profileValidator.js (from feature/user-profile)\n│   └── dataExporter.js (from feature/data-export)\n└── tests/\n    ├── profileValidator.test.js\n    └── dataExporter.test.js",
    "requiredConcepts": [
      {
        "name": "Git Branching Essentials",
        "lessonId": "c-10-03",
        "academyRoute": "/git"
      },
      {
        "name": "Merging Strategies",
        "lessonId": "c-11-04",
        "academyRoute": "/git"
      },
      {
        "name": "Git Log & Commit Visualization",
        "lessonId": "c-09-02",
        "academyRoute": "/git"
      }
    ],
    "resources": {
      "academyLessons": [
        {
          "title": "Chapter 10: Git Branching Essentials",
          "route": "/cloudstack/git?concept=c-10-03"
        },
        {
          "title": "Chapter 11: Merging Strategies",
          "route": "/cloudstack/git?concept=c-11-04"
        }
      ],
      "officialDocs": [
        {
          "title": "Git Branching - Basic Branching and Merging",
          "url": "https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging"
        }
      ],
      "referenceMaterial": [
        "Atlassian Git Feature Branch Workflow Guide"
      ],
      "usefulCommands": [
        "git switch -c feature/user-profile",
        "git diff main..feature/user-profile",
        "git merge --no-ff feature/user-profile",
        "git branch -d feature/user-profile"
      ]
    },
    "recommendedApproach": [
      "1. Review the initial state of the main branch and ensure working tree is clean.",
      "2. Create and switch to feature/user-profile branch.",
      "3. Implement user profile validator logic and commit with clear messages.",
      "4. Switch back to main and create feature/data-export branch.",
      "5. Implement data export logic and commit to that branch.",
      "6. Use git log --graph --all to visualize the diverging branch lines.",
      "7. Switch to main and merge feature/user-profile.",
      "8. Inspect diff of feature/data-export against newly updated main.",
      "9. Merge feature/data-export into main.",
      "10. Verify application functionality and delete merged feature branches."
    ],
    "importantConsiderations": [
      "What are the advantages of using --no-ff (no fast-forward) merge commits when preserving feature history?",
      "Why should local feature branches be deleted after being merged into the integration line?",
      "How does feature branch isolation make it easier to discard an aborted prototype without affecting main?"
    ],
    "commonPitfalls": [
      "Accidentally committing changes intended for a feature branch directly into main.",
      "Creating a new feature branch from an unmerged feature branch instead of starting from main.",
      "Forgetting to delete stale local and remote branches after merging."
    ],
    "optionalEnhancements": {
      "beginner": [
        "Use git branch -vv to inspect tracking branches and ahead/behind counts."
      ],
      "intermediate": [
        "Create a GitHub Pull Request with a structured PR template and review comments."
      ],
      "advanced": [
        "Enforce branch protection rules on GitHub requiring PR reviews before merging."
      ],
      "expert": [
        "Configure automated branch deletion upon PR merge in repository settings."
      ]
    },
    "completionChecklist": [
      "feature/user-profile created, developed, and committed in isolation",
      "feature/data-export created, developed, and committed in isolation",
      "git log --graph confirms divergent branch history",
      "Both feature branches successfully integrated into main",
      "Working tree verified clean and all tests passing on main",
      "Merged feature branches deleted locally and remotely"
    ],
    "objectives": [
      "Establish standardized feature branch naming conventions (feature/xxx, bugfix/xxx)",
      "Develop multiple distinct features in isolated branches without cross-contamination",
      "Inspect diffs between feature branches and main prior to integration",
      "Perform clean merges into main and properly retire completed branches"
    ],
    "startingState": {
      "description": "Project repository directory for Feature Branch Workflow",
      "environment": "Developer Workstation (Git 2.40+ CLI)",
      "startingFiles": {
        "README.md": "# Feature Branch Workflow\n\nEstablish an isolated feature branch development workflow, create isolated feature branches, author scoped commits, and merge changes cleanly into the main integration branch.\n",
        ".gitignore": "node_modules/\n*.log\n.env\n.DS_Store\n"
      }
    },
    "tasks": [
      {
        "id": "task-1",
        "title": "Create feature/user-profile branch from main and implement validation utility",
        "objective": "Create feature/user-profile branch from main and implement validation utility",
        "commandSnippet": "git switch -c feature/user-profile",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Create feature/user-profile branch from main and implement validation utility"
      },
      {
        "id": "task-2",
        "title": "Create feature/data-export branch from main and implement export utility",
        "objective": "Create feature/data-export branch from main and implement export utility",
        "commandSnippet": "git diff main..feature/user-profile",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Create feature/data-export branch from main and implement export utility"
      },
      {
        "id": "task-3",
        "title": "Author at least 2 distinct commits in each feature branch",
        "objective": "Author at least 2 distinct commits in each feature branch",
        "commandSnippet": "git merge --no-ff feature/user-profile",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Author at least 2 distinct commits in each feature branch"
      },
      {
        "id": "task-4",
        "title": "Merge feature/user-profile into main using fast-forward or merge commit",
        "objective": "Merge feature/user-profile into main using fast-forward or merge commit",
        "commandSnippet": "git branch -d feature/user-profile",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Merge feature/user-profile into main using fast-forward or merge commit"
      },
      {
        "id": "task-5",
        "title": "Merge feature/data-export into main and verify no regression",
        "objective": "Merge feature/data-export into main and verify no regression",
        "commandSnippet": "git switch -c feature/user-profile",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Merge feature/data-export into main and verify no regression"
      }
    ],
    "failureScenarios": [
      {
        "id": "fail-1",
        "title": "Accidentally committing changes intended for a feature branch directly into main.",
        "symptom": "Git refuses operation due to unstaged modifications or conflicts.",
        "rootCause": "Attempting branch switch, rebase, or merge with dirty working tree.",
        "diagnosticCommand": "git status",
        "fixCommand": "git stash save \"temporary-work\" && git status",
        "verification": "Working tree clean, operation proceeds."
      },
      {
        "id": "fail-2",
        "title": "Creating a new feature branch from an unmerged feature branch instead of starting from main.",
        "symptom": "Commit author or branch lineage violates project standard.",
        "rootCause": "Incorrect configuration or wrong base branch.",
        "diagnosticCommand": "git log -n 1",
        "fixCommand": "git commit --amend",
        "verification": "Commit conforms to requirements."
      }
    ],
    "validationChecks": [
      {
        "id": "val-1",
        "label": "feature/user-profile created, developed, and committed in isolation",
        "verificationCommand": "git status",
        "points": 17
      },
      {
        "id": "val-2",
        "label": "feature/data-export created, developed, and committed in isolation",
        "verificationCommand": "git status",
        "points": 17
      },
      {
        "id": "val-3",
        "label": "git log --graph confirms divergent branch history",
        "verificationCommand": "git status",
        "points": 17
      },
      {
        "id": "val-4",
        "label": "Both feature branches successfully integrated into main",
        "verificationCommand": "git status",
        "points": 17
      },
      {
        "id": "val-5",
        "label": "Working tree verified clean and all tests passing on main",
        "verificationCommand": "git status",
        "points": 17
      },
      {
        "id": "val-6",
        "label": "Merged feature branches deleted locally and remotely",
        "verificationCommand": "git status",
        "points": 17
      }
    ],
    "scoreMax": 100
  },
  {
    "id": "git-03",
    "code": "GIT-03",
    "title": "Team Collaboration & Remote Synchronization",
    "academy": "git",
    "difficulty": "Lower Intermediate",
    "estimatedTime": "8-10 hours",
    "technologies": [
      "Git Remotes",
      "Tracking Branches",
      "Upstream Pulls",
      "Rebase vs Merge"
    ],
    "overview": "Simulate realistic multi-engineer collaboration across remote repositories, tracking branches, synchronized fetches, and non-conflicting remote integration.",
    "tags": [
      "git",
      "remotes",
      "fetch",
      "pull",
      "tracking-branches",
      "collaboration"
    ],
    "projectOverview": {
      "projectName": "Team Collaboration & Remote Synchronization",
      "academy": "git",
      "difficulty": "Lower Intermediate",
      "estimatedEffort": "8-10 hours",
      "technologies": [
        "Git Remotes",
        "Remote Tracking Branches",
        "Fetch / Pull / Push",
        "GitHub"
      ],
      "shortDescription": "Simulate a distributed engineering team working against a shared remote repository with upstream branch tracking and synchronized updates."
    },
    "scenario": "You are working in a two-developer distributed team. Your teammate has pushed modifications to the remote repository while you were simultaneously drafting features locally. You need to safely synchronize remote updates, inspect incoming changes without disturbing your working state, and push your integrated work back upstream.",
    "problemStatement": "Developers often execute blind \"git pull\" commands that create messy accidental merge commits or unexpectedly clobber local modifications. The team needs a disciplined collaboration routine separating fetch from merge/rebase and maintaining clear upstream visibility.",
    "projectObjective": [
      "Simulate a multi-contributor remote environment using two local clone directories or multiple remotes",
      "Inspect incoming remote commits using git fetch and remote tracking branches (origin/main) without merging",
      "Evaluate differences between local branch and remote tracking branch using git log and git diff",
      "Integrate upstream modifications cleanly using both merge and rebase techniques"
    ],
    "whatYouNeedToBuild": {
      "description": "A synchronized multi-developer Git topology demonstrating fetch inspection, remote branch tracking, and upstream push.",
      "diagram": "Developer A Clone ──(git push)──> Central Remote (origin/main)\n                                          │\n                                    (git fetch)\n                                          │\nDeveloper B Clone ──[origin/main tracking branch] ──(rebase/merge)──> Local main"
    },
    "requirements": {
      "functional": [
        "Simulate concurrent development from two distinct contributor identities",
        "Execute git fetch to inspect teammate commits before applying them",
        "Push local changes to remote without force-pushing or overwriting remote history"
      ],
      "technical": [
        "Use git remote -v, git remote show origin, and git branch -a",
        "Compare origin/main with local main via git log HEAD..origin/main",
        "Use git pull --rebase to maintain linear commit history where appropriate"
      ],
      "security": [
        "Ensure remote authentication uses scoped SSH keys or personal access tokens"
      ]
    },
    "architecture": {
      "summary": "Centralized remote hub architecture with distributed local clones and tracking branch abstractions.",
      "diagram": "Local HEAD ──[Working Tree] <──> [origin/main Ref] <──(network)──> [Remote Bare Repo]",
      "components": [
        {
          "name": "Remote Hub",
          "role": "Central source of truth repository on GitHub/GitLab",
          "technologies": [
            "Bare Repo"
          ]
        },
        {
          "name": "origin/main Ref",
          "role": "Local read-only bookmark of remote state updated via fetch",
          "technologies": [
            "Git Remote Tracking"
          ]
        },
        {
          "name": "Local main",
          "role": "Active development branch with local commit increments",
          "technologies": [
            "Git Reference"
          ]
        }
      ]
    },
    "technologyRequirements": {
      "required": [
        "Git CLI 2.30+",
        "Remote Git host (GitHub, GitLab, or local bare repository)"
      ],
      "optional": [
        "Git GUI tools for remote graph inspection"
      ],
      "outOfScope": [
        "Complex rebase conflict resolution (covered in GIT-04)"
      ]
    },
    "functionalRequirements": [
      "Create and configure a remote repository \"central-app\"",
      "Create two local clones: \"workstation-alice\" and \"workstation-bob\"",
      "Push commit from Alice to central remote",
      "From Bob's clone, run git fetch and inspect Alice's commit without merging",
      "Integrate Alice's change into Bob's local branch and successfully push Bob's subsequent feature"
    ],
    "technicalRequirements": [
      "Demonstrate difference between git fetch origin and git pull",
      "Demonstrate inspect command: git log HEAD..origin/main --oneline",
      "Configure git config pull.rebase true to avoid unnecessary merge bubbles"
    ],
    "securityRequirements": [
      "Verify that credentials are not embedded into remote repository URLs"
    ],
    "constraints": [
      "Do not use git push --force under any circumstances",
      "Do not use git pull without first knowing what commits are waiting on origin/main"
    ],
    "expectedOutcome": "Complete mastery of distributed Git synchronization, ensuring safe team collaboration without accidental history overwrites or unnecessary merge commits.",
    "deliverables": [
      "Two simulated developer directories synchronized with remote",
      "TEAM_SYNC_PLAYBOOK.md documenting safe fetch, diff, and integration workflows",
      "Commit log verifying integrated contributions from multiple authors"
    ],
    "suggestedProjectStructure": "collab-workspace/\n├── central-remote/ (or GitHub repo)\n├── developer-alice/\n│   ├── .git/\n│   └── src/\n└── developer-bob/\n    ├── .git/\n    └── src/",
    "requiredConcepts": [
      {
        "name": "Remotes & Network Primitives",
        "lessonId": "c-13-04",
        "academyRoute": "/git"
      },
      {
        "name": "Fetch, Pull & Tracking Branches",
        "lessonId": "c-15-01",
        "academyRoute": "/git"
      },
      {
        "name": "Merge vs Rebase",
        "lessonId": "c-12-03",
        "academyRoute": "/git"
      }
    ],
    "resources": {
      "academyLessons": [
        {
          "title": "Chapter 13: Remotes & Network Primitives",
          "route": "/cloudstack/git?concept=c-13-04"
        },
        {
          "title": "Chapter 15: Fetch, Pull & Tracking Branches",
          "route": "/cloudstack/git?concept=c-15-01"
        }
      ],
      "officialDocs": [
        {
          "title": "Git Basics - Working with Remotes",
          "url": "https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes"
        }
      ],
      "referenceMaterial": [
        "GitHub Flow Guide",
        "Effective Git for Teams"
      ],
      "usefulCommands": [
        "git remote -v",
        "git fetch origin",
        "git log --oneline HEAD..origin/main",
        "git diff HEAD origin/main",
        "git pull --rebase origin main"
      ]
    },
    "recommendedApproach": [
      "1. Initialize a central remote repository (or bare Git repository).",
      "2. Clone the central repository into two separate folders representing Alice and Bob.",
      "3. In Alice's clone, configure author name Alice and commit a new configuration file.",
      "4. Push Alice's commit to the central remote.",
      "5. Switch to Bob's clone, who has made local commits in a separate file.",
      "6. Run git fetch origin in Bob's clone to update origin/main without touching Bob's working tree.",
      "7. Run git log HEAD..origin/main to inspect what Alice pushed.",
      "8. Run git diff HEAD origin/main to inspect code modifications.",
      "9. Execute git rebase origin/main (or git pull --rebase) to place Bob's work on top of Alice's.",
      "10. Push Bob's integrated branch to the central remote and verify both commit records."
    ],
    "importantConsiderations": [
      "Why is git fetch followed by inspection safer than an immediate git pull?",
      "What is the semantic difference between origin/main and main in your local repository?",
      "When should a team prefer rebase over merge for pulling upstream changes?"
    ],
    "commonPitfalls": [
      "Running git pull blindly when local unstaged changes exist, resulting in messy stash requirements.",
      "Pushing rejected non-fast-forward updates with --force, overwriting teammates' commits.",
      "Confusion between local branches and remote-tracking branches."
    ],
    "optionalEnhancements": {
      "beginner": [
        "Set git config --global pull.rebase true as developer standard."
      ],
      "intermediate": [
        "Configure a Git alias (git upstream-diff) to quickly compare local with remote."
      ],
      "advanced": [
        "Set up a local bare repository as an upstream staging mirror."
      ],
      "expert": [
        "Simulate a 3-way concurrent team workflow with Alice, Bob, and Charlie."
      ]
    },
    "completionChecklist": [
      "Central remote established and cloned by two simulated contributors",
      "Alice successfully commits and pushes changes to central remote",
      "Bob executes git fetch and inspects remote changes prior to integration",
      "Bob uses git log HEAD..origin/main and git diff to review Alice's changes",
      "Bob successfully integrates remote changes and pushes upstream",
      "Central repository history shows valid contributions from both authors"
    ],
    "objectives": [
      "Simulate a multi-contributor remote environment using two local clone directories or multiple remotes",
      "Inspect incoming remote commits using git fetch and remote tracking branches (origin/main) without merging",
      "Evaluate differences between local branch and remote tracking branch using git log and git diff",
      "Integrate upstream modifications cleanly using both merge and rebase techniques"
    ],
    "startingState": {
      "description": "Project repository directory for Team Collaboration & Remote Synchronization",
      "environment": "Developer Workstation (Git 2.40+ CLI)",
      "startingFiles": {
        "README.md": "# Team Collaboration & Remote Synchronization\n\nSimulate realistic multi-engineer collaboration across remote repositories, tracking branches, synchronized fetches, and non-conflicting remote integration.\n",
        ".gitignore": "node_modules/\n*.log\n.env\n.DS_Store\n"
      }
    },
    "tasks": [
      {
        "id": "task-1",
        "title": "Create and configure a remote repository \"central-app\"",
        "objective": "Create and configure a remote repository \"central-app\"",
        "commandSnippet": "git remote -v",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Create and configure a remote repository \"central-app\""
      },
      {
        "id": "task-2",
        "title": "Create two local clones: \"workstation-alice\" and \"workstation-bob\"",
        "objective": "Create two local clones: \"workstation-alice\" and \"workstation-bob\"",
        "commandSnippet": "git fetch origin",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Create two local clones: \"workstation-alice\" and \"workstation-bob\""
      },
      {
        "id": "task-3",
        "title": "Push commit from Alice to central remote",
        "objective": "Push commit from Alice to central remote",
        "commandSnippet": "git log --oneline HEAD..origin/main",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Push commit from Alice to central remote"
      },
      {
        "id": "task-4",
        "title": "From Bob's clone, run git fetch and inspect Alice's commit without merging",
        "objective": "From Bob's clone, run git fetch and inspect Alice's commit without merging",
        "commandSnippet": "git diff HEAD origin/main",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "From Bob's clone, run git fetch and inspect Alice's commit without merging"
      },
      {
        "id": "task-5",
        "title": "Integrate Alice's change into Bob's local branch and successfully push Bob's subsequent feature",
        "objective": "Integrate Alice's change into Bob's local branch and successfully push Bob's subsequent feature",
        "commandSnippet": "git pull --rebase origin main",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Integrate Alice's change into Bob's local branch and successfully push Bob's subsequent feature"
      }
    ],
    "failureScenarios": [
      {
        "id": "fail-1",
        "title": "Running git pull blindly when local unstaged changes exist, resulting in messy stash requirements.",
        "symptom": "Git refuses operation due to unstaged modifications or conflicts.",
        "rootCause": "Attempting branch switch, rebase, or merge with dirty working tree.",
        "diagnosticCommand": "git status",
        "fixCommand": "git stash save \"temporary-work\" && git status",
        "verification": "Working tree clean, operation proceeds."
      },
      {
        "id": "fail-2",
        "title": "Pushing rejected non-fast-forward updates with --force, overwriting teammates' commits.",
        "symptom": "Commit author or branch lineage violates project standard.",
        "rootCause": "Incorrect configuration or wrong base branch.",
        "diagnosticCommand": "git log -n 1",
        "fixCommand": "git commit --amend",
        "verification": "Commit conforms to requirements."
      }
    ],
    "validationChecks": [
      {
        "id": "val-1",
        "label": "Central remote established and cloned by two simulated contributors",
        "verificationCommand": "git status",
        "points": 17
      },
      {
        "id": "val-2",
        "label": "Alice successfully commits and pushes changes to central remote",
        "verificationCommand": "git status",
        "points": 17
      },
      {
        "id": "val-3",
        "label": "Bob executes git fetch and inspects remote changes prior to integration",
        "verificationCommand": "git status",
        "points": 17
      },
      {
        "id": "val-4",
        "label": "Bob uses git log HEAD..origin/main and git diff to review Alice's changes",
        "verificationCommand": "git status",
        "points": 17
      },
      {
        "id": "val-5",
        "label": "Bob successfully integrates remote changes and pushes upstream",
        "verificationCommand": "git status",
        "points": 17
      },
      {
        "id": "val-6",
        "label": "Central repository history shows valid contributions from both authors",
        "verificationCommand": "git status",
        "points": 17
      }
    ],
    "scoreMax": 100
  },
  {
    "id": "git-04",
    "code": "GIT-04",
    "title": "Merge Conflict Resolution & History Surgery",
    "academy": "git",
    "difficulty": "Intermediate",
    "estimatedTime": "8-12 hours",
    "technologies": [
      "Git Merge",
      "Conflict Markers",
      "Git Rerere",
      "Interactive Rebase",
      "Git Mergetool"
    ],
    "overview": "Diagnose, deconstruct, and resolve complex overlapping merge conflicts across parallel feature branches, maintaining semantic code correctness and leveraging Git rerere.",
    "tags": [
      "git",
      "merge-conflicts",
      "rerere",
      "interactive-rebase",
      "conflict-resolution"
    ],
    "projectOverview": {
      "projectName": "Merge Conflict Resolution & History Surgery",
      "academy": "git",
      "difficulty": "Intermediate",
      "estimatedEffort": "8-12 hours",
      "technologies": [
        "Git Merge",
        "Conflict Markers",
        "Interactive Rebase",
        "Git Rerere"
      ],
      "shortDescription": "Master the art of resolving conflicting concurrent file modifications, preserving code correctness, and configuring Git rerere for automated reuse."
    },
    "scenario": "Two engineering pods have refactored the central database configuration and application routing files in parallel branches. When attempting to merge feature/database-refactor into main, Git halts with severe conflict markers across multiple shared modules. You have been appointed lead integrator to resolve the conflicts cleanly.",
    "problemStatement": "Unresolved or improperly resolved merge conflicts cause code regressions, syntax errors, and destroyed business logic. Engineers frequently accept incorrect conflict hunks or panic and abort. You must systematically dissect three-way merge conflicts and establish conflict prevention patterns.",
    "projectObjective": [
      "Trigger deliberate overlapping merge conflicts in configuration and source code files",
      "Interpret standard Git three-way conflict markers (<<<<<<<, =======, >>>>>>>) and base snapshots",
      "Resolve conflicts preserving logic from both contributor branches",
      "Enable and test Git rerere (reuse recorded resolution) to automatically resolve repeated rebase conflicts"
    ],
    "whatYouNeedToBuild": {
      "description": "A controlled conflict scenario with successful conflict reconciliation, clean commit audit, and recorded rerere cache.",
      "diagram": "Common Ancestor (Commit A)\n        /                     \\\nBranch 1 (DB Pooling)      Branch 2 (SSL Encryption)\n        \\                     /\n      <<<<<<< HEAD (DB Pooling)\n      =======\n      >>>>>>> feature/ssl (SSL Encryption)\n                     │\n         [Manual Conflict Resolution]\n                     │\n                     ▼\n          Merged & Verified Code"
    },
    "requirements": {
      "functional": [
        "Application must compile and pass all automated tests after conflict resolution",
        "Both database connection pooling (from Branch 1) and SSL TLS encryption (from Branch 2) must be preserved in the resolved file",
        "Git rerere must be demonstrated recording and reapplying resolution"
      ],
      "technical": [
        "Use git config --global rerere.enabled true",
        "Use git checkout --conflict=diff3 to inspect base ancestor in conflict markers",
        "Complete the merge using git commit after staging resolved files"
      ],
      "security": [
        "Ensure neither branch's security patches (such as sanitization filters) are dropped during conflict resolution"
      ]
    },
    "architecture": {
      "summary": "Three-way merge graph with conflict marker anatomy and rerere resolution database.",
      "diagram": "Base Ancestor ──> Our Version (HEAD) vs Their Version (MERGE_HEAD) ──> Merged Result (.git/rr-cache)",
      "components": [
        {
          "name": "Common Ancestor",
          "role": "The merge base commit shared by both branches",
          "technologies": [
            "Git Object"
          ]
        },
        {
          "name": "Conflict Markers",
          "role": "POSIX diff3 formatting highlighting divergent code blocks",
          "technologies": [
            "Git Diff3"
          ]
        },
        {
          "name": "Git Rerere",
          "role": "Resolution recorder caching merge decisions for re-use",
          "technologies": [
            "Git rr-cache"
          ]
        }
      ]
    },
    "technologyRequirements": {
      "required": [
        "Git CLI 2.30+",
        "Code editor with conflict highlighting or diff tool"
      ],
      "optional": [
        "VS Code / Meld / KDiff3 visual mergetool"
      ],
      "outOfScope": [
        "Automated semantic AI merge resolvers"
      ]
    },
    "functionalRequirements": [
      "Create base branch with initial config.json and server.js",
      "Branch feature/pooling modifies config.json (adds max_pool: 20)",
      "Branch feature/ssl modifies config.json on the exact same lines (adds ssl_mode: verify-full)",
      "Attempt merge on main, encountering CONFLICT (content) in config.json",
      "Inspect diff3 output and combine both settings into a valid JSON object",
      "Stage and finalize merge commit"
    ],
    "technicalRequirements": [
      "Demonstrate git status during conflicted state",
      "Demonstrate git rerere diff and git rerere status",
      "Verify resolved syntax with automated test suite or JSON validator"
    ],
    "securityRequirements": [
      "Audit resolved configuration to guarantee ssl_mode is not accidentally removed in favor of connection pool"
    ],
    "constraints": [
      "Do not discard either feature's functionality: both features must coexist in the final file",
      "Do not commit unresolved <<<<<<< markers into the repository",
      "Do not use git merge -X ours or -X theirs as a blind shortcut"
    ],
    "expectedOutcome": "A successfully integrated codebase where conflicting enhancements from both branches coexist seamlessly, verified by tests, with rerere caching active.",
    "deliverables": [
      "Repository with resolved merge commit in git log",
      "CONFLICT_RESOLUTION_REPORT.md detailing how conflicts were diagnosed and resolved",
      "Demonstration of git rerere automatically re-applying the resolution"
    ],
    "suggestedProjectStructure": "conflict-lab/\n├── .git/\n│   └── rr-cache/\n├── CONFLICT_RESOLUTION_REPORT.md\n├── config.json\n├── server.js\n└── test.sh",
    "requiredConcepts": [
      {
        "name": "Merge Strategies & Conflict Markers",
        "lessonId": "c-11-04",
        "academyRoute": "/git"
      },
      {
        "name": "Rebase & History Rewriting",
        "lessonId": "c-12-03",
        "academyRoute": "/git"
      },
      {
        "name": "Advanced Diagnostics & Diff3",
        "lessonId": "c-24-03",
        "academyRoute": "/git"
      }
    ],
    "resources": {
      "academyLessons": [
        {
          "title": "Chapter 11: Merge Strategies & Conflict Markers",
          "route": "/cloudstack/git?concept=c-11-04"
        },
        {
          "title": "Chapter 12: Rebase & History Rewriting",
          "route": "/cloudstack/git?concept=c-12-03"
        }
      ],
      "officialDocs": [
        {
          "title": "Git Tools - Advanced Merging",
          "url": "https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging"
        },
        {
          "title": "Git Tools - Rerere",
          "url": "https://git-scm.com/book/en/v2/Git-Tools-Rerere"
        }
      ],
      "referenceMaterial": [
        "Resolving Git Conflicts: A Developer Handbook"
      ],
      "usefulCommands": [
        "git config --global merge.conflictStyle diff3",
        "git config --global rerere.enabled true",
        "git status",
        "git diff --check",
        "git merge --continue",
        "git merge --abort"
      ]
    },
    "recommendedApproach": [
      "1. Configure Git conflictStyle to diff3 for maximum visibility into common ancestor.",
      "2. Enable git rerere in repository configuration.",
      "3. Create baseline commit on main with initial config.json.",
      "4. Create branch feature/pooling and add connection pool parameters to config.json.",
      "5. Switch back to main and create branch feature/ssl modifying the exact same lines.",
      "6. Switch to main, merge feature/pooling (clean fast-forward).",
      "7. Attempt to merge feature/ssl, triggering conflict.",
      "8. Inspect the conflict using git status and code editor.",
      "9. Edit config.json to reconcile both changes and eliminate conflict markers.",
      "10. Run test script to verify syntax, stage resolved file, and finalize merge."
    ],
    "importantConsiderations": [
      "How does the diff3 conflict style differ from the standard 2-way conflict display?",
      "Why is git rerere especially valuable when performing complex interactive rebases with multiple conflicting commits?",
      "What are the dangers of accepting \"ours\" or \"theirs\" without inspecting the underlying semantic intent?"
    ],
    "commonPitfalls": [
      "Leaving leftover conflict markers (>>>>>>>) in source files, breaking compilers or runtimes.",
      "Resolving conflicts in isolation without running integration tests to verify combined behavior.",
      "Executing git merge --abort in frustration without diagnosing what actually clashed."
    ],
    "optionalEnhancements": {
      "beginner": [
        "Configure a visual mergetool such as VS Code (code --wait)."
      ],
      "intermediate": [
        "Simulate an interactive rebase conflict across 3 sequential commits."
      ],
      "advanced": [
        "Inspect the contents of .git/rr-cache to observe how Git records conflict fingerprints."
      ],
      "expert": [
        "Write a pre-commit hook that rejects any commit containing \"<<<<<<<\" or \">>>>>>>\"."
      ]
    },
    "completionChecklist": [
      "diff3 conflict style enabled and tested",
      "Git rerere enabled and verified in config",
      "Simulated conflict triggered between feature/pooling and feature/ssl",
      "Conflict resolved manually, preserving both pool and SSL configuration",
      "Automated test or lint command confirms zero syntax errors",
      "Merge finalized with clean commit message",
      "Rerere cache verified recording the resolution"
    ],
    "objectives": [
      "Trigger deliberate overlapping merge conflicts in configuration and source code files",
      "Interpret standard Git three-way conflict markers (<<<<<<<, =======, >>>>>>>) and base snapshots",
      "Resolve conflicts preserving logic from both contributor branches",
      "Enable and test Git rerere (reuse recorded resolution) to automatically resolve repeated rebase conflicts"
    ],
    "startingState": {
      "description": "Project repository directory for Merge Conflict Resolution & History Surgery",
      "environment": "Developer Workstation (Git 2.40+ CLI)",
      "startingFiles": {
        "README.md": "# Merge Conflict Resolution & History Surgery\n\nDiagnose, deconstruct, and resolve complex overlapping merge conflicts across parallel feature branches, maintaining semantic code correctness and leveraging Git rerere.\n",
        ".gitignore": "node_modules/\n*.log\n.env\n.DS_Store\n"
      }
    },
    "tasks": [
      {
        "id": "task-1",
        "title": "Create base branch with initial config.json and server.js",
        "objective": "Create base branch with initial config.json and server.js",
        "commandSnippet": "git config --global merge.conflictStyle diff3",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Create base branch with initial config.json and server.js"
      },
      {
        "id": "task-2",
        "title": "Branch feature/pooling modifies config.json (adds max_pool: 20)",
        "objective": "Branch feature/pooling modifies config.json (adds max_pool: 20)",
        "commandSnippet": "git config --global rerere.enabled true",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Branch feature/pooling modifies config.json (adds max_pool: 20)"
      },
      {
        "id": "task-3",
        "title": "Branch feature/ssl modifies config.json on the exact same lines (adds ssl_mode: verify-full)",
        "objective": "Branch feature/ssl modifies config.json on the exact same lines (adds ssl_mode: verify-full)",
        "commandSnippet": "git status",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Branch feature/ssl modifies config.json on the exact same lines (adds ssl_mode: verify-full)"
      },
      {
        "id": "task-4",
        "title": "Attempt merge on main, encountering CONFLICT (content) in config.json",
        "objective": "Attempt merge on main, encountering CONFLICT (content) in config.json",
        "commandSnippet": "git diff --check",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Attempt merge on main, encountering CONFLICT (content) in config.json"
      },
      {
        "id": "task-5",
        "title": "Inspect diff3 output and combine both settings into a valid JSON object",
        "objective": "Inspect diff3 output and combine both settings into a valid JSON object",
        "commandSnippet": "git merge --continue",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Inspect diff3 output and combine both settings into a valid JSON object"
      },
      {
        "id": "task-6",
        "title": "Stage and finalize merge commit",
        "objective": "Stage and finalize merge commit",
        "commandSnippet": "git merge --abort",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Stage and finalize merge commit"
      }
    ],
    "failureScenarios": [
      {
        "id": "fail-1",
        "title": "Leaving leftover conflict markers (>>>>>>>) in source files, breaking compilers or runtimes.",
        "symptom": "Git refuses operation due to unstaged modifications or conflicts.",
        "rootCause": "Attempting branch switch, rebase, or merge with dirty working tree.",
        "diagnosticCommand": "git status",
        "fixCommand": "git stash save \"temporary-work\" && git status",
        "verification": "Working tree clean, operation proceeds."
      },
      {
        "id": "fail-2",
        "title": "Resolving conflicts in isolation without running integration tests to verify combined behavior.",
        "symptom": "Commit author or branch lineage violates project standard.",
        "rootCause": "Incorrect configuration or wrong base branch.",
        "diagnosticCommand": "git log -n 1",
        "fixCommand": "git commit --amend",
        "verification": "Commit conforms to requirements."
      }
    ],
    "validationChecks": [
      {
        "id": "val-1",
        "label": "diff3 conflict style enabled and tested",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-2",
        "label": "Git rerere enabled and verified in config",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-3",
        "label": "Simulated conflict triggered between feature/pooling and feature/ssl",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-4",
        "label": "Conflict resolved manually, preserving both pool and SSL configuration",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-5",
        "label": "Automated test or lint command confirms zero syntax errors",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-6",
        "label": "Merge finalized with clean commit message",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-7",
        "label": "Rerere cache verified recording the resolution",
        "verificationCommand": "git status",
        "points": 14
      }
    ],
    "scoreMax": 100
  },
  {
    "id": "git-05",
    "code": "GIT-05",
    "title": "Semantic Release Management & Tagging",
    "academy": "git",
    "difficulty": "Intermediate+",
    "estimatedTime": "8-12 hours",
    "technologies": [
      "Annotated Tags",
      "GPG Signing",
      "Semantic Versioning (SemVer)",
      "Release Branches",
      "Changelogs"
    ],
    "overview": "Design and execute a formal release management procedure utilizing Semantic Versioning (SemVer 2.0.0), cryptographically signed annotated tags, release branches, and automated changelogs.",
    "tags": [
      "git",
      "tags",
      "semver",
      "release-management",
      "gpg-signing",
      "changelog"
    ],
    "projectOverview": {
      "projectName": "Semantic Release Management & Tagging",
      "academy": "git",
      "difficulty": "Intermediate+",
      "estimatedEffort": "8-12 hours",
      "technologies": [
        "Git Tags",
        "SemVer 2.0.0",
        "GPG Signing",
        "Release Branches"
      ],
      "shortDescription": "Implement an enterprise release management framework using annotated tags, release branches, Semantic Versioning, and cryptographic verification."
    },
    "scenario": "Your SaaS company is launching an enterprise version of its API gateway. Customers require audited releases following Semantic Versioning (vMAJOR.MINOR.PATCH), signed git tags to verify artifact provenance, and formal release notes detailing breaking changes and security fixes.",
    "problemStatement": "Developers currently tag arbitrary commits with unannotated lightweight tags like \"v1\", \"v2-final\", \"v2-final-fix\". There is no record of who cut the release, what changed, or whether commits were altered post-release. The company needs a repeatable, auditable release playbook.",
    "projectObjective": [
      "Establish a formal release branching and tagging procedure according to SemVer 2.0.0",
      "Create and manage annotated tags containing detailed release messages and author metadata",
      "Sign tags cryptographically with GPG/SSH keys and verify signature authenticity",
      "Manage maintenance patch releases using dedicated release branches (e.g. release/v1.2)"
    ],
    "whatYouNeedToBuild": {
      "description": "A release-managed repository featuring annotated signed tags, a release branch for hotfixing, and generated CHANGELOG.md.",
      "diagram": "main:          ●──────●──────● (v1.0.0 Tag) ────────●─────● (v1.1.0 Tag)\n                               │                     │\nrelease/v1.0:                  └──● (Hotfix commit)  │\n                                  │                  │\n                                (v1.0.1 Tag)         ▼\n                                             [CHANGELOG.md]"
    },
    "requirements": {
      "functional": [
        "Repository must contain at least three releases: v1.0.0 (initial), v1.0.1 (maintenance hotfix), and v1.1.0 (minor feature)",
        "Each release must be marked with an annotated tag containing release notes and signed verification",
        "A comprehensive CHANGELOG.md must accurately document all changes grouped by version"
      ],
      "technical": [
        "Use git tag -a -m \"...\" and git tag -s for signed releases",
        "Use git describe --tags to inspect nearest release distance",
        "Push tags to remote explicitly using git push origin <tagname>"
      ],
      "security": [
        "Verify that release tags cannot be modified or moved without signature invalidation"
      ]
    },
    "architecture": {
      "summary": "Release lifecycle architecture separating stable releases, maintenance branches, and development trunk.",
      "diagram": "Commit DAG ──(git tag -a)──> Annotated Tag Object (.git/refs/tags) ──(GPG Sign)──> Cryptographic Provenance",
      "components": [
        {
          "name": "Annotated Tag Object",
          "role": "Immutable Git object storing author, date, message, and commit pointer",
          "technologies": [
            "Git Object"
          ]
        },
        {
          "name": "GPG/SSH Signature",
          "role": "Cryptographic proof of release author authenticity",
          "technologies": [
            "OpenGPG / SSH"
          ]
        },
        {
          "name": "Release Branch",
          "role": "Dedicated branch for backporting patches to older major/minor versions",
          "technologies": [
            "Git Branch"
          ]
        },
        {
          "name": "CHANGELOG.md",
          "role": "Customer-facing audit ledger of features, fixes, and deprecations",
          "technologies": [
            "Markdown"
          ]
        }
      ]
    },
    "technologyRequirements": {
      "required": [
        "Git CLI 2.30+",
        "GPG or SSH signing key",
        "Markdown editor"
      ],
      "optional": [
        "git-cliff or standard-version CLI for changelog generation"
      ],
      "outOfScope": [
        "Automated container registry distribution"
      ]
    },
    "functionalRequirements": [
      "Tag v1.0.0 on main with annotated notes detailing initial capabilities",
      "Cut branch release/v1.0 to simulate an ongoing LTS release",
      "Apply an emergency bugfix to release/v1.0, tag as v1.0.1, and backport to main",
      "Implement a non-breaking feature on main, author CHANGELOG.md, and tag as v1.1.0",
      "Verify all tags using git tag -v or git describe"
    ],
    "technicalRequirements": [
      "Inspect tag object details using git show v1.0.0",
      "Demonstrate git describe output from a commit ahead of v1.0.0",
      "Push tags to remote using git push origin --tags"
    ],
    "securityRequirements": [
      "Ensure tags are signed and signatures are verified with git verify-tag"
    ],
    "constraints": [
      "Do not use lightweight tags (git tag <name> without -a or -s) for official releases",
      "Do not delete or force-move a published release tag",
      "Follow SemVer rules strictly: no breaking changes in v1.1.0"
    ],
    "expectedOutcome": "A production-grade release management workflow guaranteeing auditable release provenance, automated changelogs, and stable maintenance patching.",
    "deliverables": [
      "Repository containing signed annotated tags: v1.0.0, v1.0.1, v1.1.0",
      "LTS maintenance branch release/v1.0",
      "Standardized CHANGELOG.md adhering to Keep a Changelog format",
      "RELEASE_PLAYBOOK.md detailing step-by-step instructions for cutting releases"
    ],
    "suggestedProjectStructure": "release-repo/\n├── .git/\n├── CHANGELOG.md\n├── RELEASE_PLAYBOOK.md\n├── package.json\n└── src/\n    ├── app.js\n    └── version.js",
    "requiredConcepts": [
      {
        "name": "Tags, Releases & Stashing",
        "lessonId": "c-18-04",
        "academyRoute": "/git"
      },
      {
        "name": "Release Automation",
        "lessonId": "c-31-08",
        "academyRoute": "/git"
      },
      {
        "name": "Branching Models",
        "lessonId": "c-10-03",
        "academyRoute": "/git"
      }
    ],
    "resources": {
      "academyLessons": [
        {
          "title": "Chapter 18: Tags, Releases & Stashing",
          "route": "/cloudstack/git?concept=c-18-04"
        },
        {
          "title": "Chapter 31: Release Automation",
          "route": "/cloudstack/git?concept=c-31-08"
        }
      ],
      "officialDocs": [
        {
          "title": "Semantic Versioning 2.0.0 Specification",
          "url": "https://semver.org/"
        },
        {
          "title": "Git Basics - Tagging",
          "url": "https://git-scm.com/book/en/v2/Git-Basics-Tagging"
        },
        {
          "title": "Keep a Changelog",
          "url": "https://keepachangelog.com/"
        }
      ],
      "referenceMaterial": [
        "Google Release Engineering Standards"
      ],
      "usefulCommands": [
        "git tag -a v1.0.0 -m \"Release v1.0.0: Initial enterprise launch\"",
        "git tag -s v1.0.1 -m \"Hotfix v1.0.1: Security patch for auth token\"",
        "git show v1.0.0",
        "git tag -v v1.0.1",
        "git describe --tags --long",
        "git push origin --tags"
      ]
    },
    "recommendedApproach": [
      "1. Review SemVer 2.0.0 rules and define version schema for the project.",
      "2. Configure a local GPG or SSH key for Git commit and tag signing.",
      "3. Assemble the v1.0.0 codebase on main and update package version.",
      "4. Author CHANGELOG.md with initial features.",
      "5. Create an annotated, signed tag v1.0.0 with detailed release notes.",
      "6. Create maintenance branch release/v1.0 from tag v1.0.0.",
      "7. Simulate a critical bug report against v1.0.0.",
      "8. Fix the bug on release/v1.0, update CHANGELOG, and tag v1.0.1.",
      "9. Cherry-pick or merge the bugfix commit back into main.",
      "10. Add a new minor feature on main and tag v1.1.0."
    ],
    "importantConsiderations": [
      "What is the structural difference inside .git between a lightweight tag and an annotated tag?",
      "Why is moving a tag that has already been pushed to a remote considered a severe anti-pattern?",
      "How does git describe allow continuous integration systems to generate dynamic build numbers?"
    ],
    "commonPitfalls": [
      "Using lightweight tags without metadata, losing who created the tag and why.",
      "Bumping the MAJOR version for simple backward-compatible additions.",
      "Forgetting to push tags to remote using --tags or explicit tag names."
    ],
    "optionalEnhancements": {
      "beginner": [
        "Generate an automatic release archive using git archive --format=zip."
      ],
      "intermediate": [
        "Automate changelog drafting using git-cliff based on Conventional Commits."
      ],
      "advanced": [
        "Configure a GitHub Action to automatically publish a GitHub Release when a tag is pushed."
      ],
      "expert": [
        "Implement automated SemVer bumping using semantic-release in CI."
      ]
    },
    "completionChecklist": [
      "GPG or SSH signing configured in Git",
      "Annotated tag v1.0.0 created on main with release notes",
      "Maintenance branch release/v1.0 created and active",
      "Hotfix commit created on release/v1.0 and tagged as v1.0.1",
      "Hotfix backported to main to prevent regression",
      "New feature added to main and tagged as v1.1.0",
      "CHANGELOG.md adheres to Keep a Changelog guidelines",
      "git tag -v validates all signatures successfully"
    ],
    "objectives": [
      "Establish a formal release branching and tagging procedure according to SemVer 2.0.0",
      "Create and manage annotated tags containing detailed release messages and author metadata",
      "Sign tags cryptographically with GPG/SSH keys and verify signature authenticity",
      "Manage maintenance patch releases using dedicated release branches (e.g. release/v1.2)"
    ],
    "startingState": {
      "description": "Project repository directory for Semantic Release Management & Tagging",
      "environment": "Developer Workstation (Git 2.40+ CLI)",
      "startingFiles": {
        "README.md": "# Semantic Release Management & Tagging\n\nDesign and execute a formal release management procedure utilizing Semantic Versioning (SemVer 2.0.0), cryptographically signed annotated tags, release branches, and automated changelogs.\n",
        ".gitignore": "node_modules/\n*.log\n.env\n.DS_Store\n"
      }
    },
    "tasks": [
      {
        "id": "task-1",
        "title": "Tag v1.0.0 on main with annotated notes detailing initial capabilities",
        "objective": "Tag v1.0.0 on main with annotated notes detailing initial capabilities",
        "commandSnippet": "git tag -a v1.0.0 -m \"Release v1.0.0: Initial enterprise launch\"",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Tag v1.0.0 on main with annotated notes detailing initial capabilities"
      },
      {
        "id": "task-2",
        "title": "Cut branch release/v1.0 to simulate an ongoing LTS release",
        "objective": "Cut branch release/v1.0 to simulate an ongoing LTS release",
        "commandSnippet": "git tag -s v1.0.1 -m \"Hotfix v1.0.1: Security patch for auth token\"",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Cut branch release/v1.0 to simulate an ongoing LTS release"
      },
      {
        "id": "task-3",
        "title": "Apply an emergency bugfix to release/v1.0, tag as v1.0.1, and backport to main",
        "objective": "Apply an emergency bugfix to release/v1.0, tag as v1.0.1, and backport to main",
        "commandSnippet": "git show v1.0.0",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Apply an emergency bugfix to release/v1.0, tag as v1.0.1, and backport to main"
      },
      {
        "id": "task-4",
        "title": "Implement a non-breaking feature on main, author CHANGELOG.md, and tag as v1.1.0",
        "objective": "Implement a non-breaking feature on main, author CHANGELOG.md, and tag as v1.1.0",
        "commandSnippet": "git tag -v v1.0.1",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Implement a non-breaking feature on main, author CHANGELOG.md, and tag as v1.1.0"
      },
      {
        "id": "task-5",
        "title": "Verify all tags using git tag -v or git describe",
        "objective": "Verify all tags using git tag -v or git describe",
        "commandSnippet": "git describe --tags --long",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Verify all tags using git tag -v or git describe"
      }
    ],
    "failureScenarios": [
      {
        "id": "fail-1",
        "title": "Using lightweight tags without metadata, losing who created the tag and why.",
        "symptom": "Git refuses operation due to unstaged modifications or conflicts.",
        "rootCause": "Attempting branch switch, rebase, or merge with dirty working tree.",
        "diagnosticCommand": "git status",
        "fixCommand": "git stash save \"temporary-work\" && git status",
        "verification": "Working tree clean, operation proceeds."
      },
      {
        "id": "fail-2",
        "title": "Bumping the MAJOR version for simple backward-compatible additions.",
        "symptom": "Commit author or branch lineage violates project standard.",
        "rootCause": "Incorrect configuration or wrong base branch.",
        "diagnosticCommand": "git log -n 1",
        "fixCommand": "git commit --amend",
        "verification": "Commit conforms to requirements."
      }
    ],
    "validationChecks": [
      {
        "id": "val-1",
        "label": "GPG or SSH signing configured in Git",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-2",
        "label": "Annotated tag v1.0.0 created on main with release notes",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-3",
        "label": "Maintenance branch release/v1.0 created and active",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-4",
        "label": "Hotfix commit created on release/v1.0 and tagged as v1.0.1",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-5",
        "label": "Hotfix backported to main to prevent regression",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-6",
        "label": "New feature added to main and tagged as v1.1.0",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-7",
        "label": "CHANGELOG.md adheres to Keep a Changelog guidelines",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-8",
        "label": "git tag -v validates all signatures successfully",
        "verificationCommand": "git status",
        "points": 13
      }
    ],
    "scoreMax": 100
  },
  {
    "id": "git-06",
    "code": "GIT-06",
    "title": "Git Flow vs. Trunk-Based Development Architectural Benchmark",
    "academy": "git",
    "difficulty": "Advanced",
    "estimatedTime": "10-14 hours",
    "technologies": [
      "Git Flow",
      "Trunk-Based Development",
      "Feature Flags",
      "Short-Lived Branches",
      "CI Gatekeeping"
    ],
    "overview": "Implement, evaluate, and benchmark two competing branching methodologies—Git Flow and Trunk-Based Development—measuring deployment velocity, merge complexity, and team scalability.",
    "tags": [
      "git",
      "git-flow",
      "trunk-based",
      "branching-models",
      "feature-flags",
      "architecture"
    ],
    "projectOverview": {
      "projectName": "Git Flow vs. Trunk-Based Development Architectural Benchmark",
      "academy": "git",
      "difficulty": "Advanced",
      "estimatedEffort": "10-14 hours",
      "technologies": [
        "Git Flow",
        "Trunk-Based Development",
        "Feature Flags",
        "Git Hooks"
      ],
      "shortDescription": "Construct parallel implementations of Git Flow and Trunk-Based Development to conduct an empirical comparative benchmark on merge friction and lead time."
    },
    "scenario": "Your engineering department is debating whether to abandon traditional Git Flow in favor of Trunk-Based Development. Leadership has tasked you with building an architectural benchmark that simulates both models across 3 sprints, evaluating developer cognitive load, merge overhead, and deployment readiness.",
    "problemStatement": "Long-lived branches in Git Flow frequently lead to \"merge hell\" during end-of-sprint integration, while teams unfamiliar with Trunk-Based Development fear broken trunk builds and unvetted production code. An empirical, hands-on comparison is required to guide organizational policy.",
    "projectObjective": [
      "Construct a Git Flow repository structure with master, develop, feature/*, release/*, and hotfix/* branches",
      "Construct a Trunk-Based Development repository structure with short-lived branch lifecycles and feature toggles",
      "Simulate the delivery of 3 concurrent features and 1 emergency production hotfix in both models",
      "Compile an Architecture Decision Record (ADR) analyzing trade-offs in merge frequency, conflict rate, and lead time"
    ],
    "whatYouNeedToBuild": {
      "description": "Two prototype repositories showcasing Git Flow and Trunk-Based Development respectively, backed by an Architecture Decision Record (ADR).",
      "diagram": "Git Flow Architecture:\nmain ───────● (v1.0.0) ─────────────────────────● (v1.1.0) ───● (v1.1.1)\n             \\                                 /             /\ndevelop ──────●─────●───────●──────●──────────●─────────────●\n               \\   /         \\    /          /\nfeature/*       ●─●           ●──●          /\n                                           /\nrelease/* ────────────────────────────────●\n\nTrunk-Based Architecture:\nmain (trunk) ──●───●───────●───●───────●───●───────● (continuous delivery)\n                \\ /         \\ /         \\ /\nshort-lived:     ●           ●           ● (<= 24 hours lifecycle, gated with feature flags)"
    },
    "requirements": {
      "functional": [
        "Git Flow repo must demonstrate strict branch separation and two-way merges (release into main AND develop)",
        "Trunk-Based repo must demonstrate trunk merges with code gated behind application feature flag switches",
        "Both models must demonstrate emergency hotfix delivery"
      ],
      "technical": [
        "Enforce no-ff merges in Git Flow for audit history preservation",
        "Enforce squash-and-merge or fast-forward in Trunk-Based Development",
        "Include feature flag configuration demonstrating inactive dark launches"
      ],
      "security": [
        "Branch protection on main and develop in Git Flow",
        "Branch protection with mandatory CI status checks on trunk in TBD"
      ]
    },
    "architecture": {
      "summary": "Comparative architectural evaluation of multi-branch vs single-trunk delivery.",
      "diagram": "Git Flow: Multi-Layer Isolation (Low Velocity, High Gatekeeping)\nVS\nTrunk-Based: Single Stream + Continuous Integration (High Velocity, Flag Governance)",
      "components": [
        {
          "name": "Git Flow develop",
          "role": "Perpetual pre-production integration branch",
          "technologies": [
            "Git Branch"
          ]
        },
        {
          "name": "Git Flow release/*",
          "role": "Temporary stabilization branch for QA bugfixing",
          "technologies": [
            "Git Branch"
          ]
        },
        {
          "name": "Trunk (main)",
          "role": "Single source of truth with daily releases",
          "technologies": [
            "Git Trunk"
          ]
        },
        {
          "name": "Feature Flag Config",
          "role": "Runtime decoupling of deployment from release",
          "technologies": [
            "JSON / Env Config"
          ]
        }
      ]
    },
    "technologyRequirements": {
      "required": [
        "Git CLI 2.30+",
        "GitHub / GitLab repositories (2 distinct repos)"
      ],
      "optional": [
        "git-flow AVH edition CLI helper"
      ],
      "outOfScope": [
        "Full microservices production deployment"
      ]
    },
    "functionalRequirements": [
      "Deliver Feature X and Feature Y in both repositories",
      "Perform simulated v1.0.0 release in both repositories",
      "Apply an emergency Hotfix 1.0.1 in both repositories"
    ],
    "technicalRequirements": [
      "Document git log --graph comparison of both repository DAGs",
      "Author ADR-001-BRANCHING-STRATEGY.md detailing findings and recommendations"
    ],
    "securityRequirements": [
      "Audit access control policies for release cutting in both models"
    ],
    "constraints": [
      "In Trunk-Based model, no branch may remain active for more than 3 simulated commits",
      "In Git Flow, hotfix must be merged back into BOTH main and develop"
    ],
    "expectedOutcome": "A comprehensive, evidence-based architectural comparison equipping your team to select and govern the optimal Git workflow.",
    "deliverables": [
      "Repository 1: Complete Git Flow implementation with full branch tree",
      "Repository 2: Complete Trunk-Based Development implementation with feature flags",
      "ADR-001-BRANCHING-STRATEGY.md comparing merge overhead, CI/CD compatibility, and lead time"
    ],
    "suggestedProjectStructure": "branching-benchmark/\n├── git-flow-prototype/\n│   ├── .git/\n│   └── src/\n├── trunk-based-prototype/\n│   ├── .git/\n│   ├── flags.config.json\n│   └── src/\n└── ADR-001-BRANCHING-STRATEGY.md",
    "requiredConcepts": [
      {
        "name": "Branching Basics",
        "lessonId": "c-10-03",
        "academyRoute": "/git"
      },
      {
        "name": "Merge Strategies",
        "lessonId": "c-11-04",
        "academyRoute": "/git"
      },
      {
        "name": "Rebase vs Merge",
        "lessonId": "c-12-03",
        "academyRoute": "/git"
      },
      {
        "name": "Release Automation",
        "lessonId": "c-31-08",
        "academyRoute": "/git"
      }
    ],
    "resources": {
      "academyLessons": [
        {
          "title": "Chapter 10: Git Branching Models",
          "route": "/cloudstack/git?concept=c-10-03"
        },
        {
          "title": "Chapter 11: Fast-Forward vs Recursive Merges",
          "route": "/cloudstack/git?concept=c-11-04"
        }
      ],
      "officialDocs": [
        {
          "title": "Trunk-Based Development Guide",
          "url": "https://trunkbaseddevelopment.com/"
        },
        {
          "title": "A Successful Git Branching Model (Vincent Driessen)",
          "url": "https://nvie.com/posts/a-successful-git-branching-model/"
        }
      ],
      "referenceMaterial": [
        "Martin Fowler: Branch by Abstraction",
        "DORA Metrics on Trunk-Based Development"
      ],
      "usefulCommands": [
        "git merge --no-ff develop",
        "git log --graph --oneline --all",
        "git cherry-pick"
      ]
    },
    "recommendedApproach": [
      "1. Create repository A (git-flow) and initialize main and develop branches.",
      "2. Spin up feature/billing branch from develop, commit, and merge back to develop with --no-ff.",
      "3. Create release/v1.0.0 from develop, commit stabilization bugfix, and merge to both main and develop.",
      "4. Cut hotfix/v1.0.1 from main, apply fix, and merge to both main and develop.",
      "5. Create repository B (trunk-based) with a single main trunk.",
      "6. Implement feature/billing with a feature flag (ENABLED: false), merge to trunk within 1 day.",
      "7. Toggle feature flag in configuration to activate feature in production.",
      "8. Compare commit graphs, number of merge operations, and risk profiles in ADR-001."
    ],
    "importantConsiderations": [
      "Why does Trunk-Based Development require higher automated test coverage than Git Flow?",
      "How do feature flags allow decoupling code deployment from business release?",
      "Why do long-lived release branches in Git Flow increase technical debt?"
    ],
    "commonPitfalls": [
      "Forgetting to merge release or hotfix branches back into develop in Git Flow, causing regressions.",
      "Treating Trunk-Based Development as \"everyone commits directly to main without PRs or tests\"."
    ],
    "optionalEnhancements": {
      "beginner": [
        "Add automated branch naming linting via Git hooks."
      ],
      "intermediate": [
        "Integrate a lightweight runtime feature flag library."
      ],
      "advanced": [
        "Simulate branch-by-abstraction for a major database interface migration."
      ],
      "expert": [
        "Benchmark DORA deployment frequency metrics across both workflow prototypes."
      ]
    },
    "completionChecklist": [
      "Git Flow repository created with main, develop, and feature branches",
      "Git Flow release branch cut, stabilized, and merged into main and develop",
      "Git Flow hotfix branch applied to main and backported to develop",
      "Trunk-Based repository created with short-lived branch integration",
      "Feature flag implemented to decouple deployment from release in TBD",
      "Both repository graphs inspected and documented with git log --graph",
      "ADR-001-BRANCHING-STRATEGY.md completed with trade-off matrix"
    ],
    "objectives": [
      "Construct a Git Flow repository structure with master, develop, feature/*, release/*, and hotfix/* branches",
      "Construct a Trunk-Based Development repository structure with short-lived branch lifecycles and feature toggles",
      "Simulate the delivery of 3 concurrent features and 1 emergency production hotfix in both models",
      "Compile an Architecture Decision Record (ADR) analyzing trade-offs in merge frequency, conflict rate, and lead time"
    ],
    "startingState": {
      "description": "Project repository directory for Git Flow vs. Trunk-Based Development Architectural Benchmark",
      "environment": "Developer Workstation (Git 2.40+ CLI)",
      "startingFiles": {
        "README.md": "# Git Flow vs. Trunk-Based Development Architectural Benchmark\n\nImplement, evaluate, and benchmark two competing branching methodologies—Git Flow and Trunk-Based Development—measuring deployment velocity, merge complexity, and team scalability.\n",
        ".gitignore": "node_modules/\n*.log\n.env\n.DS_Store\n"
      }
    },
    "tasks": [
      {
        "id": "task-1",
        "title": "Deliver Feature X and Feature Y in both repositories",
        "objective": "Deliver Feature X and Feature Y in both repositories",
        "commandSnippet": "git merge --no-ff develop",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Deliver Feature X and Feature Y in both repositories"
      },
      {
        "id": "task-2",
        "title": "Perform simulated v1.0.0 release in both repositories",
        "objective": "Perform simulated v1.0.0 release in both repositories",
        "commandSnippet": "git log --graph --oneline --all",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Perform simulated v1.0.0 release in both repositories"
      },
      {
        "id": "task-3",
        "title": "Apply an emergency Hotfix 1.0.1 in both repositories",
        "objective": "Apply an emergency Hotfix 1.0.1 in both repositories",
        "commandSnippet": "git cherry-pick",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Apply an emergency Hotfix 1.0.1 in both repositories"
      }
    ],
    "failureScenarios": [
      {
        "id": "fail-1",
        "title": "Forgetting to merge release or hotfix branches back into develop in Git Flow, causing regressions.",
        "symptom": "Git refuses operation due to unstaged modifications or conflicts.",
        "rootCause": "Attempting branch switch, rebase, or merge with dirty working tree.",
        "diagnosticCommand": "git status",
        "fixCommand": "git stash save \"temporary-work\" && git status",
        "verification": "Working tree clean, operation proceeds."
      },
      {
        "id": "fail-2",
        "title": "Treating Trunk-Based Development as \"everyone commits directly to main without PRs or tests\".",
        "symptom": "Commit author or branch lineage violates project standard.",
        "rootCause": "Incorrect configuration or wrong base branch.",
        "diagnosticCommand": "git log -n 1",
        "fixCommand": "git commit --amend",
        "verification": "Commit conforms to requirements."
      }
    ],
    "validationChecks": [
      {
        "id": "val-1",
        "label": "Git Flow repository created with main, develop, and feature branches",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-2",
        "label": "Git Flow release branch cut, stabilized, and merged into main and develop",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-3",
        "label": "Git Flow hotfix branch applied to main and backported to develop",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-4",
        "label": "Trunk-Based repository created with short-lived branch integration",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-5",
        "label": "Feature flag implemented to decouple deployment from release in TBD",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-6",
        "label": "Both repository graphs inspected and documented with git log --graph",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-7",
        "label": "ADR-001-BRANCHING-STRATEGY.md completed with trade-off matrix",
        "verificationCommand": "git status",
        "points": 14
      }
    ],
    "scoreMax": 100
  },
  {
    "id": "git-07",
    "code": "GIT-07",
    "title": "Large Team Monorepo & Submodules Architecture",
    "academy": "git",
    "difficulty": "Advanced+",
    "estimatedTime": "12-16 hours",
    "technologies": [
      "Git Submodules",
      "Monorepos",
      "Sparse Checkout",
      "Git LFS",
      "CODEOWNERS"
    ],
    "overview": "Manage enterprise multi-project repositories using Git Submodules, sparse checkout, shallow clones, and granular CODEOWNERS review permissions.",
    "tags": [
      "git",
      "monorepo",
      "submodules",
      "sparse-checkout",
      "codeowners",
      "git-lfs"
    ],
    "projectOverview": {
      "projectName": "Large Team Monorepo & Submodules Architecture",
      "academy": "git",
      "difficulty": "Advanced+",
      "estimatedEffort": "12-16 hours",
      "technologies": [
        "Git Submodules",
        "Sparse Checkout",
        "CODEOWNERS",
        "Shallow Clones"
      ],
      "shortDescription": "Architect a multi-component enterprise repository combining shared library submodules, selective sparse checkout, and granular team ownership."
    },
    "scenario": "Your organization runs 3 distinct client applications (Web, Mobile Backend, Admin Portal) that depend on a shared core authentication and cryptographic library. Engineering wants the library versioned independently while allowing applications to link to pinned, auditable commits.",
    "problemStatement": "Developers currently copy-paste shared authentication code across 3 separate repositories, causing severe security drift and desynchronized bugfixes. Furthermore, the combined codebase is becoming bloated with binary design assets, slowing down developer clones.",
    "projectObjective": [
      "Structure an independent shared-core repository and link it as a Git submodule into parent applications",
      "Manage submodule pointers, update submodules, and handle detached HEAD states within submodules",
      "Configure sparse checkout to allow developers to clone and work on only their specific subsystem",
      "Establish a comprehensive CODEOWNERS configuration enforcing required reviews per directory"
    ],
    "whatYouNeedToBuild": {
      "description": "A parent application repository incorporating an independent shared-core Git submodule with sparse-checkout configuration and CODEOWNERS enforcement.",
      "diagram": "Parent App (enterprise-platform)\n├── apps/web/               ──> (Owned by @team-web)\n├── apps/api/               ──> (Owned by @team-backend)\n├── .gitmodules             ──> (Tracks shared-core commit SHA)\n└── shared/core/ (Submodule) ──> [Independent Git Repository: shared-core.git]"
    },
    "requirements": {
      "functional": [
        "Parent repository can be cloned with --recurse-submodules to instantiate complete project stack",
        "Submodule must be pinned to an explicit immutable commit hash in the parent repository index",
        "Updating shared-core in the parent repository must require an explicit submodule commit pointer bump"
      ],
      "technical": [
        "Use git submodule add <url> <path> and git submodule update --init --recursive",
        "Configure git config core.sparseCheckout true to check out only apps/web",
        "Provide valid .github/CODEOWNERS defining path-based reviewer assignments"
      ],
      "security": [
        "Verify submodules point to verified internal repository URLs, preventing submodule injection attacks"
      ]
    },
    "architecture": {
      "summary": "Composite repository architecture linking discrete Git repositories via gitlink tree entries.",
      "diagram": "Parent Repo (.git) ──gitlink──> Submodule Commit SHA ──> [External Git Repo Objects]",
      "components": [
        {
          "name": "Parent Repository",
          "role": "Orchestrating container for enterprise applications",
          "technologies": [
            "Git Repo"
          ]
        },
        {
          "name": "Submodule gitlink",
          "role": "Special tree entry storing commit SHA of submodule",
          "technologies": [
            "Git Tree Object"
          ]
        },
        {
          "name": ".gitmodules",
          "role": "Configuration file mapping submodule path to remote URL",
          "technologies": [
            "Git Config"
          ]
        },
        {
          "name": "CODEOWNERS",
          "role": "Rule engine delegating PR reviews by directory hierarchy",
          "technologies": [
            "GitHub Config"
          ]
        }
      ]
    },
    "technologyRequirements": {
      "required": [
        "Git CLI 2.30+",
        "GitHub / GitLab organization or user account"
      ],
      "optional": [
        "Git Sparse-Checkout (native git 2.25+)"
      ],
      "outOfScope": [
        "Bazel / Nx monorepo build tools"
      ]
    },
    "functionalRequirements": [
      "Create shared-core repository with version 1.0.0",
      "Add shared-core as submodule in enterprise-platform under shared/core",
      "Publish a bug fix in shared-core, and update the parent repository pointer to version 1.0.1"
    ],
    "technicalRequirements": [
      "Demonstrate cloning parent with git clone --recurse-submodules",
      "Demonstrate sparse checkout enabling a developer to download only apps/web and shared/core",
      "Validate CODEOWNERS syntax with GitHub PR review simulator"
    ],
    "securityRequirements": [
      "Ensure .gitmodules uses relative paths or HTTPS/SSH URLs without credentials"
    ],
    "constraints": [
      "Do not modify submodule files inside parent without committing and pushing in the submodule repository first",
      "Do not check out submodules on unpinned floating branch heads in production"
    ],
    "expectedOutcome": "A modular, high-scale enterprise repository setup balancing shared library reuse with performance optimizations for large distributed teams.",
    "deliverables": [
      "Repository 1: shared-core (independent library)",
      "Repository 2: enterprise-platform (parent repository with submodule)",
      ".gitmodules configuration",
      ".github/CODEOWNERS file",
      "Developer onboarding manual in MONOREPO_GUIDE.md"
    ],
    "suggestedProjectStructure": "enterprise-platform/\n├── .git/\n├── .gitmodules\n├── .github/\n│   └── CODEOWNERS\n├── MONOREPO_GUIDE.md\n├── apps/\n│   ├── web/\n│   └── api/\n└── shared/\n    └── core/ (submodule -> shared-core.git)",
    "requiredConcepts": [
      {
        "name": "Git Submodules & Subtrees",
        "lessonId": "c-27-04",
        "academyRoute": "/git"
      },
      {
        "name": "Large Repositories & Git LFS",
        "lessonId": "c-28-02",
        "academyRoute": "/git"
      },
      {
        "name": "Sparse Checkout & Partial Clones",
        "lessonId": "c-28-05",
        "academyRoute": "/git"
      }
    ],
    "resources": {
      "academyLessons": [
        {
          "title": "Chapter 27: Git Submodules & Subtrees",
          "route": "/cloudstack/git?concept=c-27-04"
        },
        {
          "title": "Chapter 28: Large Repositories & Partial Clones",
          "route": "/cloudstack/git?concept=c-28-05"
        }
      ],
      "officialDocs": [
        {
          "title": "Git Tools - Submodules",
          "url": "https://git-scm.com/book/en/v2/Git-Tools-Submodules"
        },
        {
          "title": "About Code Owners - GitHub Docs",
          "url": "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners"
        }
      ],
      "referenceMaterial": [
        "Scaling Git in Monorepos (Microsoft Engineering Blog)"
      ],
      "usefulCommands": [
        "git submodule add https://github.com/example/shared-core.git shared/core",
        "git submodule update --init --recursive",
        "git sparse-checkout set apps/web shared/core",
        "git submodule status"
      ]
    },
    "recommendedApproach": [
      "1. Initialize and publish the shared-core repository containing authentication utilities.",
      "2. Tag version v1.0.0 on shared-core.",
      "3. Initialize enterprise-platform parent repository with apps/web and apps/api structure.",
      "4. Add shared-core as a Git submodule inside shared/core.",
      "5. Inspect the generated .gitmodules file and verify gitlink tree entry.",
      "6. Commit and push the parent repository.",
      "7. Clone the parent repository to a clean directory using --recurse-submodules to verify bootstrap.",
      "8. Author .github/CODEOWNERS assigning directory ownership to different team handles.",
      "9. Apply and push a patch in shared-core, update the parent repository pointer to the new SHA.",
      "10. Document sparse checkout workflows in MONOREPO_GUIDE.md."
    ],
    "importantConsiderations": [
      "Why does Git record a submodule as a special directory mode (160000) rather than standard files?",
      "What happens when a developer pulls parent updates without running git submodule update?",
      "How does sparse checkout differ from shallow clones (--depth=1)?"
    ],
    "commonPitfalls": [
      "Editing files inside a submodule and forgetting to commit and push within the submodule directory first.",
      "Leaving submodules in a \"detached HEAD\" state when updating dependencies.",
      "Creating circular dependencies between parent repository and submodules."
    ],
    "optionalEnhancements": {
      "beginner": [
        "Configure git config diff.submodule log for detailed submodule commit diffs."
      ],
      "intermediate": [
        "Configure Git LFS (Large File Storage) for tracking design image assets."
      ],
      "advanced": [
        "Automate submodule update pull requests using GitHub Dependabot or Renovate."
      ],
      "expert": [
        "Benchmark clone times with git clone --filter=blob:none (blobless clones)."
      ]
    },
    "completionChecklist": [
      "shared-core repository initialized and versioned independently",
      "shared-core embedded into enterprise-platform via git submodule",
      ".gitmodules properly configured with relative or HTTPS paths",
      "Parent clone tested with --recurse-submodules",
      "Submodule pointer update workflow executed and verified",
      ".github/CODEOWNERS created and validated",
      "Sparse checkout demonstrated isolating apps/web"
    ],
    "objectives": [
      "Structure an independent shared-core repository and link it as a Git submodule into parent applications",
      "Manage submodule pointers, update submodules, and handle detached HEAD states within submodules",
      "Configure sparse checkout to allow developers to clone and work on only their specific subsystem",
      "Establish a comprehensive CODEOWNERS configuration enforcing required reviews per directory"
    ],
    "startingState": {
      "description": "Project repository directory for Large Team Monorepo & Submodules Architecture",
      "environment": "Developer Workstation (Git 2.40+ CLI)",
      "startingFiles": {
        "README.md": "# Large Team Monorepo & Submodules Architecture\n\nManage enterprise multi-project repositories using Git Submodules, sparse checkout, shallow clones, and granular CODEOWNERS review permissions.\n",
        ".gitignore": "node_modules/\n*.log\n.env\n.DS_Store\n"
      }
    },
    "tasks": [
      {
        "id": "task-1",
        "title": "Create shared-core repository with version 1.0.0",
        "objective": "Create shared-core repository with version 1.0.0",
        "commandSnippet": "git submodule add https://github.com/example/shared-core.git shared/core",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Create shared-core repository with version 1.0.0"
      },
      {
        "id": "task-2",
        "title": "Add shared-core as submodule in enterprise-platform under shared/core",
        "objective": "Add shared-core as submodule in enterprise-platform under shared/core",
        "commandSnippet": "git submodule update --init --recursive",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Add shared-core as submodule in enterprise-platform under shared/core"
      },
      {
        "id": "task-3",
        "title": "Publish a bug fix in shared-core, and update the parent repository pointer to version 1.0.1",
        "objective": "Publish a bug fix in shared-core, and update the parent repository pointer to version 1.0.1",
        "commandSnippet": "git sparse-checkout set apps/web shared/core",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Publish a bug fix in shared-core, and update the parent repository pointer to version 1.0.1"
      }
    ],
    "failureScenarios": [
      {
        "id": "fail-1",
        "title": "Editing files inside a submodule and forgetting to commit and push within the submodule directory first.",
        "symptom": "Git refuses operation due to unstaged modifications or conflicts.",
        "rootCause": "Attempting branch switch, rebase, or merge with dirty working tree.",
        "diagnosticCommand": "git status",
        "fixCommand": "git stash save \"temporary-work\" && git status",
        "verification": "Working tree clean, operation proceeds."
      },
      {
        "id": "fail-2",
        "title": "Leaving submodules in a \"detached HEAD\" state when updating dependencies.",
        "symptom": "Commit author or branch lineage violates project standard.",
        "rootCause": "Incorrect configuration or wrong base branch.",
        "diagnosticCommand": "git log -n 1",
        "fixCommand": "git commit --amend",
        "verification": "Commit conforms to requirements."
      }
    ],
    "validationChecks": [
      {
        "id": "val-1",
        "label": "shared-core repository initialized and versioned independently",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-2",
        "label": "shared-core embedded into enterprise-platform via git submodule",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-3",
        "label": ".gitmodules properly configured with relative or HTTPS paths",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-4",
        "label": "Parent clone tested with --recurse-submodules",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-5",
        "label": "Submodule pointer update workflow executed and verified",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-6",
        "label": ".github/CODEOWNERS created and validated",
        "verificationCommand": "git status",
        "points": 14
      },
      {
        "id": "val-7",
        "label": "Sparse checkout demonstrated isolating apps/web",
        "verificationCommand": "git status",
        "points": 14
      }
    ],
    "scoreMax": 100
  },
  {
    "id": "git-08",
    "code": "GIT-08",
    "title": "Git Disaster Recovery & Object Database Forensics",
    "academy": "git",
    "difficulty": "Expert",
    "estimatedTime": "12-16 hours",
    "technologies": [
      "Git Reflog",
      "git fsck",
      "git cat-file",
      "Dangling Blobs",
      "Lost Commits",
      "Index Recovery"
    ],
    "overview": "Execute emergency data recovery on corrupted and accidentally destroyed Git repositories using git reflog, low-level plumbing commands, git fsck, and object database forensics.",
    "tags": [
      "git",
      "reflog",
      "disaster-recovery",
      "fsck",
      "plumbing-commands",
      "forensics"
    ],
    "projectOverview": {
      "projectName": "Git Disaster Recovery & Object Database Forensics",
      "academy": "git",
      "difficulty": "Expert",
      "estimatedEffort": "12-16 hours",
      "technologies": [
        "Git Reflog",
        "Plumbing Commands",
        "git fsck",
        "git cat-file"
      ],
      "shortDescription": "Rescue deleted branches, reverse catastrophic hard resets, and restore orphaned commits using low-level Git object forensics and the reflog."
    },
    "scenario": "During a midnight production incident, a panicked engineer executed \"git reset --hard HEAD~5\" on the main branch, followed by \"git branch -D feature/critical-billing\" and an aggressive stash drop. Vital, unpushed business logic was seemingly obliterated. You are summoned to perform emergency data recovery on the local machine.",
    "problemStatement": "Most developers believe deleted branches and hard resets permanently destroy code. In Git's content-addressable object store, commits and blobs remain intact in loose object storage until garbage collection runs. You must locate the orphaned SHA-1 pointers and restore the repository to full integrity.",
    "projectObjective": [
      "Simulate catastrophic local repository destruction (hard resets, deleted branches, dropped stashes)",
      "Use git reflog to trace the chronological history of HEAD and branch reference movements",
      "Recover deleted branches and reset commits by rebuilding branch pointers to lost SHA hashes",
      "Employ git fsck --lost-found and git cat-file to recover uncommitted staged files and dangling blobs"
    ],
    "whatYouNeedToBuild": {
      "description": "A forensic recovery procedure demonstrating 100% data rescue from destroyed branches, stashes, and index states.",
      "diagram": "Catastrophic Incident (git reset --hard & git branch -D)\n                 │\n                 ▼\n[Orphaned Commits in .git/objects] <── Dangling, detached from DAG\n                 │\n                 ▼ (git reflog & git fsck --lost-found)\nLocate SHA-1: e4b21a8... ──(git cat-file -p / git branch recover-branch)──> FULLY RESTORED"
    },
    "requirements": {
      "functional": [
        "Successfully recover all 5 lost commits discarded by git reset --hard",
        "Restore the deleted feature/critical-billing branch with full history intact",
        "Recover uncommitted content that was dropped via git stash drop"
      ],
      "technical": [
        "Use git reflog, git reflog show <ref>, and git fsck --unreachable",
        "Use plumbing commands: git cat-file -t and git cat-file -p to inspect raw Git objects",
        "Create new branch pointers targeting recovered commit hashes"
      ],
      "security": [
        "Verify SHA integrity and ensure no malicious tampering during object surgery"
      ]
    },
    "architecture": {
      "summary": "Git content-addressable object store architecture with loose object headers, refs, and the reflog journal.",
      "diagram": "HEAD Journal (.git/logs/HEAD) ──> Object Store (.git/objects/[0-9a-f]{2}/) ──> Recovered References",
      "components": [
        {
          "name": "Reflog Journal",
          "role": "Local chronological log of where HEAD and branch refs pointed",
          "technologies": [
            "Git Reflog"
          ]
        },
        {
          "name": "Loose Object Store",
          "role": "Zlib-compressed sha1-hashed commits, trees, and blobs",
          "technologies": [
            "Git Objects"
          ]
        },
        {
          "name": "Plumbing Utilities",
          "role": "Low-level inspection tools (cat-file, fsck, mktag)",
          "technologies": [
            "Git Internals"
          ]
        }
      ]
    },
    "technologyRequirements": {
      "required": [
        "Git CLI 2.30+ on Linux or macOS or WSL2"
      ],
      "optional": [
        "zlib-flate or python for manual object decompression"
      ],
      "outOfScope": [
        "Physical hard drive platter magnetic recovery"
      ]
    },
    "functionalRequirements": [
      "Create sandbox repo with 10 commits across 2 branches and 1 stash entry",
      "Execute deliberate destructive sequence: git reset --hard HEAD~5, delete branch, drop stash",
      "Use git reflog to identify HEAD@{n} state prior to reset and recreate branch",
      "Use git fsck --lost-found to find dangling blobs from the dropped stash",
      "Inspect recovered objects using git cat-file -p and verify data integrity"
    ],
    "technicalRequirements": [
      "Author RECOVERY_RUNBOOK.md documenting the diagnostic and restoration procedure",
      "Verify recovered branch matches exact pre-incident commit hashes"
    ],
    "securityRequirements": [
      "Ensure backup snapshot of the damaged .git folder is created prior to starting recovery"
    ],
    "constraints": [
      "Do not run git gc --prune=now before recovery (which would purge loose unreferenced objects)",
      "Do not attempt blind force-pulling from remote which could overwrite local reflogs"
    ],
    "expectedOutcome": "Complete recovery of all lost commits, branches, and dropped stashes, backed by a production incident post-mortem and forensic recovery runbook.",
    "deliverables": [
      "Restored Git repository with zero commit loss",
      "RECOVERY_RUNBOOK.md explaining reflog navigation and dangling object salvage",
      "INCIDENT_POSTMORTEM.md analyzing how to prevent accidental destructive resets"
    ],
    "suggestedProjectStructure": "forensics-lab/\n├── .git/\n│   ├── logs/\n│   └── lost-found/\n├── RECOVERY_RUNBOOK.md\n├── INCIDENT_POSTMORTEM.md\n└── scripts/\n    └── test_recovered_build.sh",
    "requiredConcepts": [
      {
        "name": "The Git Object Database",
        "lessonId": "c-02-05",
        "academyRoute": "/git"
      },
      {
        "name": "Reflog & Emergency Undos",
        "lessonId": "c-23-13",
        "academyRoute": "/git"
      },
      {
        "name": "Reset, Revert & Checkout",
        "lessonId": "c-07-04",
        "academyRoute": "/git"
      },
      {
        "name": "Git Internals & Plumbing",
        "lessonId": "c-33-01",
        "academyRoute": "/git"
      }
    ],
    "resources": {
      "academyLessons": [
        {
          "title": "Chapter 02: Git Object Store",
          "route": "/cloudstack/git?concept=c-02-05"
        },
        {
          "title": "Chapter 23: Reflog & Emergency Recovery",
          "route": "/cloudstack/git?concept=c-23-13"
        },
        {
          "title": "Chapter 33: Git Plumbing Commands",
          "route": "/cloudstack/git?concept=c-33-01"
        }
      ],
      "officialDocs": [
        {
          "title": "Git Internals - Git Objects",
          "url": "https://git-scm.com/book/en/v2/Git-Internals-Git-Objects"
        },
        {
          "title": "Git Tools - Revision Selection (Reflog)",
          "url": "https://git-scm.com/book/en/v2/Git-Tools-Revision-Selection#_reflog_shortnames"
        }
      ],
      "referenceMaterial": [
        "Oh Shit, Git!?! Data Recovery Cheat Sheet"
      ],
      "usefulCommands": [
        "git reflog",
        "git reflog show HEAD",
        "git fsck --lost-found --unreachable",
        "git cat-file -p <SHA>",
        "git cat-file -t <SHA>",
        "git branch <new-branch-name> <commit-SHA>"
      ]
    },
    "recommendedApproach": [
      "1. Take an immediate tarball backup of the entire .git directory before touching anything.",
      "2. Run git reflog to review all recent movements of the HEAD pointer.",
      "3. Identify the exact commit SHA right before the disastrous git reset --hard was executed.",
      "4. Create a rescue branch pointing directly to that SHA (git branch rescue-main <SHA>).",
      "5. Query the reflog for the deleted branch: git reflog show feature/critical-billing (or inspect HEAD@{n}).",
      "6. Re-create the deleted branch pointing to its last known commit.",
      "7. Execute git fsck --lost-found to dump all unreferenced commits and dangling blobs into .git/lost-found/.",
      "8. Inspect the rescued blobs using git cat-file -p to locate the dropped stash code.",
      "9. Verify complete file trees and run tests on all restored branches.",
      "10. Document the incident and publish RECOVERY_RUNBOOK.md."
    ],
    "importantConsiderations": [
      "How long does Git retain reflog entries and loose unreferenced objects by default before pruning?",
      "Why does git reset --hard NOT delete the commit objects from the .git/objects directory immediately?",
      "What is the difference between an unreferenced commit and a dangling blob?"
    ],
    "commonPitfalls": [
      "Running git gc --prune=now or git prune immediately after a mistake, permanently deleting loose objects.",
      "Panic-cloning a fresh repository and discarding the only local disk holding the reflog history.",
      "Failing to back up the .git directory before attempting complex object surgery."
    ],
    "optionalEnhancements": {
      "beginner": [
        "Create an automated alias: git undo to revert the last HEAD movement."
      ],
      "intermediate": [
        "Write a bash script that iterates over .git/lost-found/other/ and searches for specific lost strings."
      ],
      "advanced": [
        "Decompress a raw loose object using Python's zlib module and inspect the header format."
      ],
      "expert": [
        "Simulate and recover from a corrupted index file (.git/index) using git read-tree."
      ]
    },
    "completionChecklist": [
      "Full backup snapshot of .git directory preserved before forensics",
      "Destructive incident simulated (hard reset, deleted branch, dropped stash)",
      "Reflog inspected and pre-incident commit hashes identified",
      "main branch restored to pre-reset state with all 5 commits intact",
      "feature/critical-billing branch restored using recovered commit SHA",
      "git fsck --lost-found used to identify dropped stash content",
      "All source files and tests verified functioning with zero regression",
      "RECOVERY_RUNBOOK.md and INCIDENT_POSTMORTEM.md authored"
    ],
    "objectives": [
      "Simulate catastrophic local repository destruction (hard resets, deleted branches, dropped stashes)",
      "Use git reflog to trace the chronological history of HEAD and branch reference movements",
      "Recover deleted branches and reset commits by rebuilding branch pointers to lost SHA hashes",
      "Employ git fsck --lost-found and git cat-file to recover uncommitted staged files and dangling blobs"
    ],
    "startingState": {
      "description": "Project repository directory for Git Disaster Recovery & Object Database Forensics",
      "environment": "Developer Workstation (Git 2.40+ CLI)",
      "startingFiles": {
        "README.md": "# Git Disaster Recovery & Object Database Forensics\n\nExecute emergency data recovery on corrupted and accidentally destroyed Git repositories using git reflog, low-level plumbing commands, git fsck, and object database forensics.\n",
        ".gitignore": "node_modules/\n*.log\n.env\n.DS_Store\n"
      }
    },
    "tasks": [
      {
        "id": "task-1",
        "title": "Create sandbox repo with 10 commits across 2 branches and 1 stash entry",
        "objective": "Create sandbox repo with 10 commits across 2 branches and 1 stash entry",
        "commandSnippet": "git reflog",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Create sandbox repo with 10 commits across 2 branches and 1 stash entry"
      },
      {
        "id": "task-2",
        "title": "Execute deliberate destructive sequence: git reset --hard HEAD~5, delete branch, drop stash",
        "objective": "Execute deliberate destructive sequence: git reset --hard HEAD~5, delete branch, drop stash",
        "commandSnippet": "git reflog show HEAD",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Execute deliberate destructive sequence: git reset --hard HEAD~5, delete branch, drop stash"
      },
      {
        "id": "task-3",
        "title": "Use git reflog to identify HEAD@{n} state prior to reset and recreate branch",
        "objective": "Use git reflog to identify HEAD@{n} state prior to reset and recreate branch",
        "commandSnippet": "git fsck --lost-found --unreachable",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Use git reflog to identify HEAD@{n} state prior to reset and recreate branch"
      },
      {
        "id": "task-4",
        "title": "Use git fsck --lost-found to find dangling blobs from the dropped stash",
        "objective": "Use git fsck --lost-found to find dangling blobs from the dropped stash",
        "commandSnippet": "git cat-file -p <SHA>",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Use git fsck --lost-found to find dangling blobs from the dropped stash"
      },
      {
        "id": "task-5",
        "title": "Inspect recovered objects using git cat-file -p and verify data integrity",
        "objective": "Inspect recovered objects using git cat-file -p and verify data integrity",
        "commandSnippet": "git cat-file -t <SHA>",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Inspect recovered objects using git cat-file -p and verify data integrity"
      }
    ],
    "failureScenarios": [
      {
        "id": "fail-1",
        "title": "Running git gc --prune=now or git prune immediately after a mistake, permanently deleting loose objects.",
        "symptom": "Git refuses operation due to unstaged modifications or conflicts.",
        "rootCause": "Attempting branch switch, rebase, or merge with dirty working tree.",
        "diagnosticCommand": "git status",
        "fixCommand": "git stash save \"temporary-work\" && git status",
        "verification": "Working tree clean, operation proceeds."
      },
      {
        "id": "fail-2",
        "title": "Panic-cloning a fresh repository and discarding the only local disk holding the reflog history.",
        "symptom": "Commit author or branch lineage violates project standard.",
        "rootCause": "Incorrect configuration or wrong base branch.",
        "diagnosticCommand": "git log -n 1",
        "fixCommand": "git commit --amend",
        "verification": "Commit conforms to requirements."
      }
    ],
    "validationChecks": [
      {
        "id": "val-1",
        "label": "Full backup snapshot of .git directory preserved before forensics",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-2",
        "label": "Destructive incident simulated (hard reset, deleted branch, dropped stash)",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-3",
        "label": "Reflog inspected and pre-incident commit hashes identified",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-4",
        "label": "main branch restored to pre-reset state with all 5 commits intact",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-5",
        "label": "feature/critical-billing branch restored using recovered commit SHA",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-6",
        "label": "git fsck --lost-found used to identify dropped stash content",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-7",
        "label": "All source files and tests verified functioning with zero regression",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-8",
        "label": "RECOVERY_RUNBOOK.md and INCIDENT_POSTMORTEM.md authored",
        "verificationCommand": "git status",
        "points": 13
      }
    ],
    "scoreMax": 100
  },
  {
    "id": "git-09",
    "code": "GIT-09",
    "title": "Enterprise Repository Governance & Hook Automation",
    "academy": "git",
    "difficulty": "Expert / Production",
    "estimatedTime": "14-18 hours",
    "technologies": [
      "Client Hooks",
      "Server Hooks",
      "GPG Commit Signing",
      "Commitlint",
      "Branch Protection Matrix"
    ],
    "overview": "Architect an enterprise Git governance system enforcing cryptographic commit signing, automated commit linting, secret scanning hooks, and branch protection policies.",
    "tags": [
      "git",
      "governance",
      "hooks",
      "gpg-signing",
      "secret-scanning",
      "compliance"
    ],
    "projectOverview": {
      "projectName": "Enterprise Repository Governance & Hook Automation",
      "academy": "git",
      "difficulty": "Expert / Production",
      "estimatedEffort": "14-18 hours",
      "technologies": [
        "Git Hooks",
        "GPG Verification",
        "Secret Scanning",
        "Branch Protection Rules"
      ],
      "shortDescription": "Construct an automated compliance framework for enterprise Git repositories preventing secret leaks, enforcing signed commits, and standardizing commit messages."
    },
    "scenario": "Your financial technology enterprise is preparing for SOC 2 Type II and ISO 27001 audits. Auditors require mathematical proof that all code committed to production repositories is cryptographically signed by authorized personnel, free of plaintext secrets, and compliant with Conventional Commits.",
    "problemStatement": "Engineers routinely commit API secrets, push unsigned commits from personal laptops, and write meaningless commit messages (\"asdf\", \"fix\"). Remotes lack pre-receive validation, allowing non-compliant code to pollute upstream branches. You must implement defense-in-depth governance.",
    "projectObjective": [
      "Configure client-side pre-commit and commit-msg hooks for developer workstation enforcement",
      "Configure server-side pre-receive hooks blocking unsigned commits or unformatted messages",
      "Implement automated secret scanning (detect-secrets or trufflehog) in the pre-commit lifecycle",
      "Enforce mandatory GPG/SSH commit signature verification on the central repository"
    ],
    "whatYouNeedToBuild": {
      "description": "An end-to-end repository governance suite combining local pre-commit hooks, server pre-receive validation, and cryptographic signature policies.",
      "diagram": "Developer Machine:\n[Code Edit] ──> [pre-commit Hook: Secret Scan] ──> [commit-msg Hook: Lint] ──> [GPG Sign] ──(git push)──┐\n                                                                                                        │\nRemote Repository:                                                                                      ▼\n[Target Branch (main)] <── [Branch Protection: Approved PR] <── [pre-receive Hook: Verify GPG Signature]"
    },
    "requirements": {
      "functional": [
        "Commits containing private keys, AWS tokens, or password strings must be blocked at pre-commit",
        "Non-conventional commit messages must be rejected with informative error messages",
        "Server pre-receive hook must reject any push containing unsigned commits on protected branches"
      ],
      "technical": [
        "Use native .git/hooks/ or core.hooksPath directory",
        "Implement pre-commit, commit-msg, and pre-receive shell scripts",
        "Configure GPG commit signing with git config commit.gpgsign true"
      ],
      "security": [
        "Cryptographic non-repudiation: all commits attributable to verified team public keys",
        "Zero API secrets allowed past the client staging filter"
      ]
    },
    "architecture": {
      "summary": "Multi-tiered governance architecture spanning developer pre-commit filters and server pre-receive gates.",
      "diagram": "Client Workstation Hook (.git/hooks/pre-commit) ──> Client Sign (GPG) ──> Server Gate (.git/hooks/pre-receive) ──> Canonical Tree",
      "components": [
        {
          "name": "Client pre-commit Hook",
          "role": "Fast linting and regex secret scanner before commit creation",
          "technologies": [
            "Shell Script",
            "Regex"
          ]
        },
        {
          "name": "Client commit-msg Hook",
          "role": "Conventional Commits syntax validator",
          "technologies": [
            "Shell Script / Node"
          ]
        },
        {
          "name": "Server pre-receive Hook",
          "role": "Server-side authoritative firewall inspecting commit objects before accepting push",
          "technologies": [
            "Git Plumbing"
          ]
        },
        {
          "name": "GPG Keyring",
          "role": "Public key infrastructure for author identity verification",
          "technologies": [
            "GnuPG / SSH"
          ]
        }
      ]
    },
    "technologyRequirements": {
      "required": [
        "Git CLI 2.30+",
        "Bash / POSIX shell for hooks",
        "GPG or SSH for signing"
      ],
      "optional": [
        "pre-commit framework (Python) or Husky (Node.js)"
      ],
      "outOfScope": [
        "Full identity federation with Okta SAML"
      ]
    },
    "functionalRequirements": [
      "Create shared .githooks/ directory tracked in version control and bind via core.hooksPath",
      "Implement pre-commit hook scanning for patterns: AWS_KEY, PRIVATE KEY, postgres://",
      "Implement commit-msg hook enforcing ^(feat|fix|docs|style|refactor|test|chore)(\\(.+\\))?: .+$",
      "Implement bare repository pre-receive hook verifying git verify-commit on pushed SHAs",
      "Test violation cases: attempt pushing an unsigned commit and verify rejection"
    ],
    "technicalRequirements": [
      "Pre-receive hook must iterate through newrev and oldrev commit range",
      "All hook scripts must be executable (chmod +x) and handle spaces in file paths"
    ],
    "securityRequirements": [
      "Hooks must run in an unbypassable mode on the server side (client --no-verify cannot bypass server hooks)"
    ],
    "constraints": [
      "Do not rely solely on client-side hooks, as developers can bypass them using git commit -n",
      "Server hooks must execute in under 3 seconds to avoid blocking developer pushes"
    ],
    "expectedOutcome": "A certified compliant enterprise Git repository environment enforcing signed commits, secret prevention, and auditable history standards.",
    "deliverables": [
      "Version-controlled .githooks/ suite (pre-commit, commit-msg)",
      "Server-side pre-receive hook script ready for bare repo or GitLab/GitHub Enterprise",
      "GOVERNANCE_COMPLIANCE_SPEC.md detailing SOC 2 / ISO audit alignment",
      "Test script demonstrating rejection of invalid commits and acceptance of compliant commits"
    ],
    "suggestedProjectStructure": "enterprise-governance/\n├── .git/\n├── .githooks/\n│   ├── pre-commit\n│   ├── commit-msg\n│   └── post-merge\n├── server-hooks/\n│   └── pre-receive\n├── GOVERNANCE_COMPLIANCE_SPEC.md\n├── setup-hooks.sh\n└── src/\n    └── index.js",
    "requiredConcepts": [
      {
        "name": "Git Hooks & Lifecycle Automation",
        "lessonId": "c-20-04",
        "academyRoute": "/git"
      },
      {
        "name": "Cryptographic Commit Signing",
        "lessonId": "c-29-01",
        "academyRoute": "/git"
      },
      {
        "name": "Branch Protection & Server Gatekeeping",
        "lessonId": "c-30-03",
        "academyRoute": "/git"
      }
    ],
    "resources": {
      "academyLessons": [
        {
          "title": "Chapter 20: Git Hooks & Automation",
          "route": "/cloudstack/git?concept=c-20-04"
        },
        {
          "title": "Chapter 29: Commit Signing & Verification",
          "route": "/cloudstack/git?concept=c-29-01"
        },
        {
          "title": "Chapter 30: Enterprise Repository Governance",
          "route": "/cloudstack/git?concept=c-30-03"
        }
      ],
      "officialDocs": [
        {
          "title": "Customizing Git - Git Hooks",
          "url": "https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks"
        },
        {
          "title": "Managing Commit Signature Verification",
          "url": "https://docs.github.com/en/authentication/managing-commit-signature-verification"
        }
      ],
      "referenceMaterial": [
        "CIS Benchmark for Software Version Control Systems"
      ],
      "usefulCommands": [
        "git config core.hooksPath .githooks",
        "git config user.signingkey <GPG_KEY_ID>",
        "git config commit.gpgsign true",
        "git log --show-signature -n 3",
        "git verify-commit <commit-SHA>"
      ]
    },
    "recommendedApproach": [
      "1. Generate a dedicated GPG or SSH signing key for developer identity.",
      "2. Configure local Git client to sign all commits automatically.",
      "3. Create .githooks directory in repository root and configure core.hooksPath.",
      "4. Author .githooks/pre-commit with regex checks blocking known secret patterns.",
      "5. Author .githooks/commit-msg validating Conventional Commits format.",
      "6. Test client hooks by attempting to commit a dummy AWS secret and an invalid message.",
      "7. Initialize a local bare repository (origin) to simulate a central enterprise server.",
      "8. Author hooks/pre-receive inside the bare repository checking signatures of incoming revisions.",
      "9. Attempt pushing an unsigned commit to bare repository and verify server rejection.",
      "10. Push a signed, compliant commit and verify server acceptance."
    ],
    "importantConsiderations": [
      "Why is client-side hook validation insufficient for enterprise compliance without server-side verification?",
      "How does core.hooksPath simplify distributing Git hooks across an entire engineering team?",
      "What are the performance implications of inspecting deep commit trees during a pre-receive hook?"
    ],
    "commonPitfalls": [
      "Assuming client-side hooks are secure, unaware that git commit --no-verify bypasses them completely.",
      "Hardcoding absolute paths inside hook scripts, breaking execution on teammates' machines.",
      "Failing to mark hook scripts as executable (chmod +x), causing Git to silently ignore them on UNIX."
    ],
    "optionalEnhancements": {
      "beginner": [
        "Add a post-commit hook that prints a motivational or metrics summary."
      ],
      "intermediate": [
        "Integrate detect-secrets baseline file into the pre-commit workflow."
      ],
      "advanced": [
        "Write a pre-receive hook that validates Jira issue ticket numbers in commit messages."
      ],
      "expert": [
        "Set up automated policy enforcement with OPA (Open Policy Agent) for Git commits."
      ]
    },
    "completionChecklist": [
      "GPG signing key created and bound to Git author configuration",
      "Version-controlled .githooks/ directory configured via core.hooksPath",
      "pre-commit hook successfully blocks simulated credentials and secrets",
      "commit-msg hook successfully enforces Conventional Commits standard",
      "Bare repository created with executable server-side pre-receive hook",
      "Unsigned commits successfully rejected at the server boundary",
      "Signed compliant commits accepted and integrated into canonical tree",
      "GOVERNANCE_COMPLIANCE_SPEC.md authored for SOC 2 audit readiness"
    ],
    "objectives": [
      "Configure client-side pre-commit and commit-msg hooks for developer workstation enforcement",
      "Configure server-side pre-receive hooks blocking unsigned commits or unformatted messages",
      "Implement automated secret scanning (detect-secrets or trufflehog) in the pre-commit lifecycle",
      "Enforce mandatory GPG/SSH commit signature verification on the central repository"
    ],
    "startingState": {
      "description": "Project repository directory for Enterprise Repository Governance & Hook Automation",
      "environment": "Developer Workstation (Git 2.40+ CLI)",
      "startingFiles": {
        "README.md": "# Enterprise Repository Governance & Hook Automation\n\nArchitect an enterprise Git governance system enforcing cryptographic commit signing, automated commit linting, secret scanning hooks, and branch protection policies.\n",
        ".gitignore": "node_modules/\n*.log\n.env\n.DS_Store\n"
      }
    },
    "tasks": [
      {
        "id": "task-1",
        "title": "Create shared .githooks/ directory tracked in version control and bind via core.hooksPath",
        "objective": "Create shared .githooks/ directory tracked in version control and bind via core.hooksPath",
        "commandSnippet": "git config core.hooksPath .githooks",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Create shared .githooks/ directory tracked in version control and bind via core.hooksPath"
      },
      {
        "id": "task-2",
        "title": "Implement pre-commit hook scanning for patterns: AWS_KEY, PRIVATE KEY, postgres://",
        "objective": "Implement pre-commit hook scanning for patterns: AWS_KEY, PRIVATE KEY, postgres://",
        "commandSnippet": "git config user.signingkey <GPG_KEY_ID>",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Implement pre-commit hook scanning for patterns: AWS_KEY, PRIVATE KEY, postgres://"
      },
      {
        "id": "task-3",
        "title": "Implement commit-msg hook enforcing ^(feat|fix|docs|style|refactor|test|chore)(\\(.+\\))?: .+$",
        "objective": "Implement commit-msg hook enforcing ^(feat|fix|docs|style|refactor|test|chore)(\\(.+\\))?: .+$",
        "commandSnippet": "git config commit.gpgsign true",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Implement commit-msg hook enforcing ^(feat|fix|docs|style|refactor|test|chore)(\\(.+\\))?: .+$"
      },
      {
        "id": "task-4",
        "title": "Implement bare repository pre-receive hook verifying git verify-commit on pushed SHAs",
        "objective": "Implement bare repository pre-receive hook verifying git verify-commit on pushed SHAs",
        "commandSnippet": "git log --show-signature -n 3",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Implement bare repository pre-receive hook verifying git verify-commit on pushed SHAs"
      },
      {
        "id": "task-5",
        "title": "Test violation cases: attempt pushing an unsigned commit and verify rejection",
        "objective": "Test violation cases: attempt pushing an unsigned commit and verify rejection",
        "commandSnippet": "git verify-commit <commit-SHA>",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Test violation cases: attempt pushing an unsigned commit and verify rejection"
      }
    ],
    "failureScenarios": [
      {
        "id": "fail-1",
        "title": "Assuming client-side hooks are secure, unaware that git commit --no-verify bypasses them completely.",
        "symptom": "Git refuses operation due to unstaged modifications or conflicts.",
        "rootCause": "Attempting branch switch, rebase, or merge with dirty working tree.",
        "diagnosticCommand": "git status",
        "fixCommand": "git stash save \"temporary-work\" && git status",
        "verification": "Working tree clean, operation proceeds."
      },
      {
        "id": "fail-2",
        "title": "Hardcoding absolute paths inside hook scripts, breaking execution on teammates' machines.",
        "symptom": "Commit author or branch lineage violates project standard.",
        "rootCause": "Incorrect configuration or wrong base branch.",
        "diagnosticCommand": "git log -n 1",
        "fixCommand": "git commit --amend",
        "verification": "Commit conforms to requirements."
      }
    ],
    "validationChecks": [
      {
        "id": "val-1",
        "label": "GPG signing key created and bound to Git author configuration",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-2",
        "label": "Version-controlled .githooks/ directory configured via core.hooksPath",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-3",
        "label": "pre-commit hook successfully blocks simulated credentials and secrets",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-4",
        "label": "commit-msg hook successfully enforces Conventional Commits standard",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-5",
        "label": "Bare repository created with executable server-side pre-receive hook",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-6",
        "label": "Unsigned commits successfully rejected at the server boundary",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-7",
        "label": "Signed compliant commits accepted and integrated into canonical tree",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-8",
        "label": "GOVERNANCE_COMPLIANCE_SPEC.md authored for SOC 2 audit readiness",
        "verificationCommand": "git status",
        "points": 13
      }
    ],
    "scoreMax": 100
  },
  {
    "id": "git-10",
    "code": "GIT-10",
    "title": "Production Software Release & Zero-Downtime Recovery Platform",
    "academy": "git",
    "difficulty": "Production Grade",
    "estimatedTime": "16-24 hours",
    "technologies": [
      "Git Architecture",
      "Cherry-Pick Backports",
      "Automated SemVer",
      "Merge Queues",
      "Release Rollback Matrix"
    ],
    "overview": "Design, execute, and govern the ultimate enterprise Git release engineering platform, featuring multi-track maintenance branches, automated SemVer release orchestrations, surgical cherry-pick hotfixes, signed release tags, and automated rollbacks.",
    "tags": [
      "git",
      "production-grade",
      "release-engineering",
      "cherry-pick",
      "semver",
      "disaster-recovery",
      "enterprise"
    ],
    "projectOverview": {
      "projectName": "Production Software Release & Zero-Downtime Recovery Platform",
      "academy": "git",
      "difficulty": "Production Grade",
      "estimatedEffort": "16-24 hours",
      "technologies": [
        "Git Architecture",
        "SemVer 2.0.0",
        "Cherry-Pick Operations",
        "Signed Tags",
        "Release Rollback"
      ],
      "shortDescription": "The pinnacle Git engineering project: engineer an enterprise multi-tier release lifecycle, zero-downtime hotfix backporting, and disaster recovery platform."
    },
    "scenario": "You are the Principal Release Engineer for an enterprise cloud platform processing millions of transactions per day. The platform maintains two active Long-Term Support (LTS) versions (v2.4 and v2.5) while actively developing the v3.0 trunk. A zero-day security flaw is discovered that impacts all versions. You must coordinate release candidates, cut signed emergency patches, backport the fix across multiple divergent branches without introducing regressions, and maintain complete audit traceability.",
    "problemStatement": "In complex multi-version software platforms, hotfixing cannot simply occur on the main trunk. Changes must be surgically ported to older LTS release lines without pulling along unreleased features. Furthermore, if a release fails in production, the team must be capable of executing an immediate, auditable rollback without destroying commit history.",
    "projectObjective": [
      "Architect a multi-version enterprise Git lifecycle with active trunk, release branches, and maintenance tags",
      "Cut release candidates (v3.0.0-rc.1) and perform stabilization bugfixing",
      "Execute surgical cherry-pick backporting of critical security hotfixes across divergent maintenance lines",
      "Implement an immutable release rollback protocol using git revert rather than destructive resets",
      "Deliver complete release engineering documentation, changelogs, and an incident runbook"
    ],
    "whatYouNeedToBuild": {
      "description": "A comprehensive, multi-branch, multi-release enterprise Git topology simulating trunk development, active LTS releases, surgical backporting, and emergency rollback.",
      "diagram": "main (v3.0 trunk):   ●──────●────────● (v3.0.0-rc.1) ───────────●─────● (v3.0.0 Final)\n                                        \\                                   ▲ (Backport)\nrelease/v2.5 (LTS):    ●──────●──────────● (v2.5.0) ──● (v2.5.1 Hotfix) ────┤\n                                                     ▲                      │\nrelease/v2.4 (LTS):    ●──────●──────────● (v2.4.0) ──┴ (v2.4.8 Hotfix) ────┘\n                                                     [Cherry-pick security patch e5f8a2]\n\nRollback Procedure:\nProduction v3.0.0 ──(Fault Detected)──> git revert -m 1 <Merge-SHA> ──> Clean v3.0.1 Rollback Release"
    },
    "requirements": {
      "functional": [
        "Maintain three concurrent version streams: trunk (v3.0.0), LTS-1 (v2.5.x), and LTS-2 (v2.4.x)",
        "Apply emergency security patch to v2.4, cherry-pick to v2.5, and backport to trunk without conflicts",
        "Simulate a failed deployment of a breaking feature on trunk and execute a non-destructive git revert rollback"
      ],
      "technical": [
        "Use git cherry-pick -x to record original commit provenance in backported messages",
        "Use git revert --no-edit to cleanly neutralize problematic commits without rewriting history",
        "Sign all official release tags with GPG/SSH keys and generate comprehensive changelogs"
      ],
      "security": [
        "All release tags must be signed, non-repudiable, and verified against team public keys",
        "Security patch commit must be independently auditable across all three branches"
      ]
    },
    "architecture": {
      "summary": "High-availability enterprise release topology supporting multi-track maintenance, cherry-pick backports, and non-destructive rollbacks.",
      "diagram": "Trunk (Continuous Integration) <── Cherry-Pick Engine ──> Maintenance Branches (LTS) ──> Signed Release Distribution",
      "components": [
        {
          "name": "Active Trunk (main)",
          "role": "Rapid innovation branch targeting next major version (v3.0)",
          "technologies": [
            "Git Branch"
          ]
        },
        {
          "name": "LTS Release Branches",
          "role": "Stabilized branches receiving only critical security and bug fixes",
          "technologies": [
            "Git Branches"
          ]
        },
        {
          "name": "Cherry-Pick Engine",
          "role": "Surgical commit transplanter maintaining provenance (-x flag)",
          "technologies": [
            "Git Plumbing"
          ]
        },
        {
          "name": "Rollback Governor",
          "role": "Purely additive revert orchestrator preserving history graph",
          "technologies": [
            "Git Revert"
          ]
        }
      ]
    },
    "technologyRequirements": {
      "required": [
        "Git CLI 2.30+",
        "GPG or SSH signing infrastructure",
        "Markdown for runbooks"
      ],
      "optional": [
        "GitHub Actions or GitLab CI pipeline triggers for automated releases"
      ],
      "outOfScope": [
        "Third-party binary package repositories (npm, PyPI, Docker Hub)"
      ]
    },
    "functionalRequirements": [
      "Initialize repository with baseline application code representing v2.4.0",
      "Create release/v2.4 branch and tag v2.4.0 (signed)",
      "Add enhancements to main, create release/v2.5 branch, and tag v2.5.0 (signed)",
      "Add further enhancements on main targeting v3.0.0-rc.1",
      "Author security patch commit on release/v2.4, tag v2.4.1",
      "Cherry-pick the security patch to release/v2.5 (tag v2.5.1) and to main",
      "Simulate a faulty merge on main and revert it using git revert -m 1",
      "Tag v3.0.0 final with full release verification"
    ],
    "technicalRequirements": [
      "Verify git log --graph --all reveals clean branch topology and backport tags",
      "Confirm cherry-picked commit messages include \"(cherry picked from commit ...)\" notes",
      "Confirm rollback commit leaves pristine working state identical to pre-failure commit"
    ],
    "securityRequirements": [
      "Ensure zero secrets are committed during rapid hotfix cycle",
      "All release tags validated with git tag -v"
    ],
    "constraints": [
      "Never use git reset --hard on shared or published branches to fix an issue: all rollbacks must be additive (git revert)",
      "Do not merge the entire release/v2.4 branch into v2.5 or main: only surgical cherry-picks are permitted to avoid backward dependency leakage"
    ],
    "expectedOutcome": "A world-class, battle-tested Git release engineering framework capable of maintaining multiple enterprise releases, executing zero-downtime hotfix backports, and performing rapid history-preserving rollbacks.",
    "deliverables": [
      "Enterprise Git repository with complete multi-branch and multi-tag release history",
      "Four signed release tags: v2.4.0, v2.4.1, v2.5.0, v2.5.1, v3.0.0-rc.1, v3.0.0",
      "ENTERPRISE_RELEASE_MANUAL.md detailing branching rules, tagging, and backport standards",
      "INCIDENT_ROLLBACK_RUNBOOK.md specifying exact procedures for production revert operations",
      "CHANGELOG.md documenting changes across all version lines"
    ],
    "suggestedProjectStructure": "enterprise-release-platform/\n├── .git/\n├── CHANGELOG.md\n├── ENTERPRISE_RELEASE_MANUAL.md\n├── INCIDENT_ROLLBACK_RUNBOOK.md\n├── package.json\n└── src/\n    ├── app.js\n    ├── auth.js (security patched)\n    └── config.js",
    "requiredConcepts": [
      {
        "name": "Tags, Releases & Stashing",
        "lessonId": "c-18-04",
        "academyRoute": "/git"
      },
      {
        "name": "Advanced Cherry-Picking & Porting",
        "lessonId": "c-24-03",
        "academyRoute": "/git"
      },
      {
        "name": "Release Automation & SemVer",
        "lessonId": "c-31-08",
        "academyRoute": "/git"
      },
      {
        "name": "Git Revert & Safe Rollbacks",
        "lessonId": "c-07-04",
        "academyRoute": "/git"
      },
      {
        "name": "Git Architecture & Object Graphs",
        "lessonId": "c-35-12",
        "academyRoute": "/git"
      }
    ],
    "resources": {
      "academyLessons": [
        {
          "title": "Chapter 18: Tags, Releases & Stashing",
          "route": "/cloudstack/git?concept=c-18-04"
        },
        {
          "title": "Chapter 24: Cherry-Picking & Patch Management",
          "route": "/cloudstack/git?concept=c-24-03"
        },
        {
          "title": "Chapter 31: Release Automation",
          "route": "/cloudstack/git?concept=c-31-08"
        },
        {
          "title": "Chapter 35: Enterprise Git Architecture",
          "route": "/cloudstack/git?concept=c-35-12"
        }
      ],
      "officialDocs": [
        {
          "title": "Git Cherry-Pick Documentation",
          "url": "https://git-scm.com/docs/git-cherry-pick"
        },
        {
          "title": "Git Revert Documentation",
          "url": "https://git-scm.com/docs/git-revert"
        },
        {
          "title": "Semantic Versioning 2.0.0",
          "url": "https://semver.org/"
        }
      ],
      "referenceMaterial": [
        "Linux Kernel Release and Maintenance Process",
        "Google Chromium Branch and Release Lifecycle"
      ],
      "usefulCommands": [
        "git cherry-pick -x <commit-SHA>",
        "git revert -m 1 <merge-commit-SHA>",
        "git tag -s v2.4.1 -m \"Security patch for auth token vulnerability\"",
        "git log --graph --oneline --all",
        "git diff v2.4.0..v2.4.1"
      ]
    },
    "recommendedApproach": [
      "1. Initialize repository with baseline code and tag initial LTS release v2.4.0 with GPG signature.",
      "2. Create release/v2.4 maintenance branch.",
      "3. Advance main with features targeting v2.5, cut release/v2.5, and tag v2.5.0.",
      "4. Advance main with features targeting v3.0, and cut pre-release tag v3.0.0-rc.1.",
      "5. Simulate an emergency zero-day vulnerability discovery in the authentication module.",
      "6. Checkout release/v2.4, author fix, test, and tag v2.4.1.",
      "7. Switch to release/v2.5 and execute git cherry-pick -x <SHA> to port the fix, then tag v2.5.1.",
      "8. Switch to main and cherry-pick the fix into the v3.0 development trunk.",
      "9. Simulate a broken merge on main, diagnose the faulty commit, and execute git revert -m 1.",
      "10. Verify test suite across all branches, tag v3.0.0, and publish comprehensive release documentation."
    ],
    "importantConsiderations": [
      "Why is git cherry-pick -x crucial for enterprise audits when tracking vulnerabilities across versions?",
      "Why should production rollbacks always use git revert rather than git reset --hard?",
      "How does merging a reverted branch later in time create subtle issues if not properly re-reverted?"
    ],
    "commonPitfalls": [
      "Merging older release branches directly into trunk, accidentally dragging legacy deprecated code into new architectures.",
      "Forgetting the -x flag during cherry-picks, losing trace of the original commit hash.",
      "Executing destructive resets on shared branches, desynchronizing team workstations."
    ],
    "optionalEnhancements": {
      "beginner": [
        "Create an automated shell script that validates all tags are signed before pushing."
      ],
      "intermediate": [
        "Generate automated release notes using git log --no-merges v2.4.0..v2.4.1."
      ],
      "advanced": [
        "Build a GitHub Actions workflow that automatically backports PRs with label backport-v2.5."
      ],
      "expert": [
        "Implement an automated canary release verification pipeline using Git commit statuses."
      ]
    },
    "completionChecklist": [
      "Multi-branch release architecture initialized (main, release/v2.4, release/v2.5)",
      "Signed tags created for v2.4.0, v2.5.0, and v3.0.0-rc.1",
      "Emergency security fix authored on release/v2.4 and tagged v2.4.1",
      "Security patch cherry-picked with -x to release/v2.5 and tagged v2.5.1",
      "Security patch backported cleanly into main trunk",
      "Faulty merge on main safely rolled back using non-destructive git revert -m 1",
      "Final production tag v3.0.0 created and verified with git tag -v",
      "ENTERPRISE_RELEASE_MANUAL.md and INCIDENT_ROLLBACK_RUNBOOK.md authored"
    ],
    "objectives": [
      "Architect a multi-version enterprise Git lifecycle with active trunk, release branches, and maintenance tags",
      "Cut release candidates (v3.0.0-rc.1) and perform stabilization bugfixing",
      "Execute surgical cherry-pick backporting of critical security hotfixes across divergent maintenance lines",
      "Implement an immutable release rollback protocol using git revert rather than destructive resets",
      "Deliver complete release engineering documentation, changelogs, and an incident runbook"
    ],
    "startingState": {
      "description": "Project repository directory for Production Software Release & Zero-Downtime Recovery Platform",
      "environment": "Developer Workstation (Git 2.40+ CLI)",
      "startingFiles": {
        "README.md": "# Production Software Release & Zero-Downtime Recovery Platform\n\nDesign, execute, and govern the ultimate enterprise Git release engineering platform, featuring multi-track maintenance branches, automated SemVer release orchestrations, surgical cherry-pick hotfixes, signed release tags, and automated rollbacks.\n",
        ".gitignore": "node_modules/\n*.log\n.env\n.DS_Store\n"
      }
    },
    "tasks": [
      {
        "id": "task-1",
        "title": "Initialize repository with baseline application code representing v2.4.0",
        "objective": "Initialize repository with baseline application code representing v2.4.0",
        "commandSnippet": "git cherry-pick -x <commit-SHA>",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Initialize repository with baseline application code representing v2.4.0"
      },
      {
        "id": "task-2",
        "title": "Create release/v2.4 branch and tag v2.4.0 (signed)",
        "objective": "Create release/v2.4 branch and tag v2.4.0 (signed)",
        "commandSnippet": "git revert -m 1 <merge-commit-SHA>",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Create release/v2.4 branch and tag v2.4.0 (signed)"
      },
      {
        "id": "task-3",
        "title": "Add enhancements to main, create release/v2.5 branch, and tag v2.5.0 (signed)",
        "objective": "Add enhancements to main, create release/v2.5 branch, and tag v2.5.0 (signed)",
        "commandSnippet": "git tag -s v2.4.1 -m \"Security patch for auth token vulnerability\"",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Add enhancements to main, create release/v2.5 branch, and tag v2.5.0 (signed)"
      },
      {
        "id": "task-4",
        "title": "Add further enhancements on main targeting v3.0.0-rc.1",
        "objective": "Add further enhancements on main targeting v3.0.0-rc.1",
        "commandSnippet": "git log --graph --oneline --all",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Add further enhancements on main targeting v3.0.0-rc.1"
      },
      {
        "id": "task-5",
        "title": "Author security patch commit on release/v2.4, tag v2.4.1",
        "objective": "Author security patch commit on release/v2.4, tag v2.4.1",
        "commandSnippet": "git diff v2.4.0..v2.4.1",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Author security patch commit on release/v2.4, tag v2.4.1"
      },
      {
        "id": "task-6",
        "title": "Cherry-pick the security patch to release/v2.5 (tag v2.5.1) and to main",
        "objective": "Cherry-pick the security patch to release/v2.5 (tag v2.5.1) and to main",
        "commandSnippet": "git cherry-pick -x <commit-SHA>",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Cherry-pick the security patch to release/v2.5 (tag v2.5.1) and to main"
      },
      {
        "id": "task-7",
        "title": "Simulate a faulty merge on main and revert it using git revert -m 1",
        "objective": "Simulate a faulty merge on main and revert it using git revert -m 1",
        "commandSnippet": "git revert -m 1 <merge-commit-SHA>",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Simulate a faulty merge on main and revert it using git revert -m 1"
      },
      {
        "id": "task-8",
        "title": "Tag v3.0.0 final with full release verification",
        "objective": "Tag v3.0.0 final with full release verification",
        "commandSnippet": "git tag -s v2.4.1 -m \"Security patch for auth token vulnerability\"",
        "expectedOutput": "Action completed successfully.",
        "verificationCriteria": "Tag v3.0.0 final with full release verification"
      }
    ],
    "failureScenarios": [
      {
        "id": "fail-1",
        "title": "Merging older release branches directly into trunk, accidentally dragging legacy deprecated code into new architectures.",
        "symptom": "Git refuses operation due to unstaged modifications or conflicts.",
        "rootCause": "Attempting branch switch, rebase, or merge with dirty working tree.",
        "diagnosticCommand": "git status",
        "fixCommand": "git stash save \"temporary-work\" && git status",
        "verification": "Working tree clean, operation proceeds."
      },
      {
        "id": "fail-2",
        "title": "Forgetting the -x flag during cherry-picks, losing trace of the original commit hash.",
        "symptom": "Commit author or branch lineage violates project standard.",
        "rootCause": "Incorrect configuration or wrong base branch.",
        "diagnosticCommand": "git log -n 1",
        "fixCommand": "git commit --amend",
        "verification": "Commit conforms to requirements."
      }
    ],
    "validationChecks": [
      {
        "id": "val-1",
        "label": "Multi-branch release architecture initialized (main, release/v2.4, release/v2.5)",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-2",
        "label": "Signed tags created for v2.4.0, v2.5.0, and v3.0.0-rc.1",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-3",
        "label": "Emergency security fix authored on release/v2.4 and tagged v2.4.1",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-4",
        "label": "Security patch cherry-picked with -x to release/v2.5 and tagged v2.5.1",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-5",
        "label": "Security patch backported cleanly into main trunk",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-6",
        "label": "Faulty merge on main safely rolled back using non-destructive git revert -m 1",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-7",
        "label": "Final production tag v3.0.0 created and verified with git tag -v",
        "verificationCommand": "git status",
        "points": 13
      },
      {
        "id": "val-8",
        "label": "ENTERPRISE_RELEASE_MANUAL.md and INCIDENT_ROLLBACK_RUNBOOK.md authored",
        "verificationCommand": "git status",
        "points": 13
      }
    ],
    "scoreMax": 100
  }
];
