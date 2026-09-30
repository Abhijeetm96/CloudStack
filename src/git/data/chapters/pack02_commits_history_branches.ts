import { buildGitConcept } from '../conceptFactory';
import { AcademyTopic } from '../unifiedAcademyData';

// ============================================================================
// CHAPTER 07: COMMITS (07.1 to 07.18)
// ============================================================================
export const CHAPTER_07: AcademyTopic = {
  id: 'ch-07',
  number: '07',
  title: 'Commits',
  description: 'Understand commits as snapshots, commit hashes, parent pointers, atomic commits, amend, and writing great commit messages.',
  iconName: 'GitCommit',
  conceptCount: 18,
  concepts: [
    buildGitConcept({
      id: 'c-07-01', subChapterNumber: '07.1', command: 'git commit', title: 'What is a Commit?',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'The fundamental unit of version history: an immutable cryptographically hashed snapshot',
      badges: ['Beginner', 'Foundations', 'Core'],
      whatIsIt: 'A commit is an immutable checkpoint recording the complete snapshot of staged files at a specific moment in time.',
    }),
    buildGitConcept({
      id: 'c-07-02', subChapterNumber: '07.2', command: 'git cat-file -p HEAD^{tree}', title: 'Commit as Snapshot',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Why Git stores complete root trees instead of differential delta patches',
      whatIsIt: 'Every commit points to a top-level tree object representing the full state of every file in the repository.',
    }),
    buildGitConcept({
      id: 'c-07-03', subChapterNumber: '07.3', command: 'git commit', title: 'git commit',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Create a new commit snapshot from the staged index',
      whatIsIt: '`git commit` packages the contents of the staging area into a new commit object, advances current branch, and updates HEAD.',
      syntaxCode: 'git commit',
    }),
    buildGitConcept({
      id: 'c-07-04', subChapterNumber: '07.4', command: 'git log -1 --pretty=%B', title: 'Commit Messages',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Explaining the "why" behind changes for future engineers and yourself',
      whatIsIt: 'A commit message records human intent. The code shows *what* changed; the commit message explains *why* it was changed.',
    }),
    buildGitConcept({
      id: 'c-07-05', subChapterNumber: '07.5', command: 'git commit -m "feat: add user authentication"', title: 'git commit -m',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Supplying a one-line commit message directly from the command line',
      syntaxCode: 'git commit -m "<message>"',
    }),
    buildGitConcept({
      id: 'c-07-06', subChapterNumber: '07.6', command: 'git commit -m "title" -m "detailed description body"', title: 'Multi-line Commit Messages',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Writing 50/72 character formatted messages with title, body paragraph, and issue references',
      whatIsIt: 'Senior commit format: 50-character imperative title line, blank line, followed by wrapped 72-column explanatory body.',
    }),
    buildGitConcept({
      id: 'c-07-07', subChapterNumber: '07.7', command: 'git cat-file -p HEAD', title: 'What a Commit Contains',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Tree SHA, parent commit SHA, author name/email/date, committer metadata, and message',
      whatIsIt: 'A commit object in `.git/objects` contains exactly 5 fields: `tree`, `parent`, `author`, `committer`, and the commit message string.',
    }),
    buildGitConcept({
      id: 'c-07-08', subChapterNumber: '07.8', command: 'git rev-parse HEAD^', title: 'Parent Commit',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'The predecessor commit hash creating the backwards chain of history',
      whatIsIt: 'Every commit (except initial root commit) points backward to its parent commit. Merge commits have two or more parents.',
    }),
    buildGitConcept({
      id: 'c-07-09', subChapterNumber: '07.9', command: 'git rev-parse HEAD', title: 'Commit Hash',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'The 40-character hexadecimal SHA-1 checksum uniquely identifying the commit',
      whatIsIt: 'Cryptographic hash generated from the commit\'s content, tree, parents, author, and timestamp. If anything changes, the hash changes.',
    }),
    buildGitConcept({
      id: 'c-07-10', subChapterNumber: '07.10', command: 'git log -1 --format="%an <%ae>"', title: 'Author',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Distinguishing the original Author who wrote code from the Committer who applied it',
      whatIsIt: 'Author is the person who originally wrote the patch. Committer is the person who committed it (relevant when cherry-picking or rebasing).',
    }),
    buildGitConcept({
      id: 'c-07-11', subChapterNumber: '07.11', command: 'git log -1 --format="%ad %cd"', title: 'Timestamp',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Author date vs Commit date and timezone offsets in UNIX epochs',
      whatIsIt: 'Author date preserves when the code was written; Commit date updates whenever the commit is rebased, amended, or cherry-picked.',
    }),
    buildGitConcept({
      id: 'c-07-12', subChapterNumber: '07.12', command: 'git log', title: 'Commit History',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Navigating chronological chains of commits',
      whatIsIt: 'Follows parent pointers backwards from HEAD to the initial commit.',
    }),
    buildGitConcept({
      id: 'c-07-13', subChapterNumber: '07.13', command: 'git commit -m "fix(auth): prevent session fixation on password reset"', title: 'Good Commit Messages',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Conventional Commits standard: feat:, fix:, docs:, refactor:, test:, chore:',
      whatIsIt: 'Best practice: Use imperative mood ("fix bug" not "fixed bug"), prefix with conventional type, explain the motivation.',
    }),
    buildGitConcept({
      id: 'c-07-14', subChapterNumber: '07.14', command: '# anti-pattern', title: 'Bad Commit Messages',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Vague messages ("update", "fixed stuff", "wip") and how they damage team productivity',
      whatIsIt: 'Messages like "wip", "asdf", "fix", or "done" make `git log` and bisecting useless for coworkers and your future self.',
    }),
    buildGitConcept({
      id: 'c-07-15', subChapterNumber: '07.15', command: 'git commit', title: 'Atomic Commits',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'One logical change per commit: making code reviews easy and reverts safe',
      whatIsIt: 'An atomic commit does one thing completely: all tests pass, the build succeeds, and it can be reverted independently without collateral damage.',
    }),
    buildGitConcept({
      id: 'c-07-16', subChapterNumber: '07.16', command: 'git commit --amend', title: 'Amend Commit',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Updating the tip commit with additional changes or an updated commit message',
      whatIsIt: 'Replaces the most recent commit with a brand new commit incorporating currently staged changes or a revised message.',
    }),
    buildGitConcept({
      id: 'c-07-17', subChapterNumber: '07.17', command: 'git commit --amend --no-edit', title: 'git commit --amend',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Adding a forgotten file or typo fix to the last commit without changing message',
      syntaxCode: 'git commit --amend --no-edit',
      whenNotToUse: ['NEVER amend commits that have already been pushed to a shared team branch.'],
    }),
    buildGitConcept({
      id: 'c-07-18', subChapterNumber: '07.18', command: 'git commit --allow-empty -m "ci: trigger rebuild"', title: 'Empty Commits',
      topicId: 'ch-07', topicNumber: '07', topicTitle: 'Commits',
      subtitle: 'Creating commits without file tree modifications to trigger CI workflows or milestone tags',
      whatIsIt: '`git commit --allow-empty` records a commit with no tree differences, useful for triggering CI/CD pipelines without dummy code changes.',
      syntaxCode: 'git commit --allow-empty -m "trigger deploy"',
    }),
  ],
};

// ============================================================================
// CHAPTER 08: GIT HISTORY (08.1 to 08.15)
// ============================================================================
export const CHAPTER_08: AcademyTopic = {
  id: 'ch-08',
  number: '08',
  title: 'Git History',
  description: 'Inspect commit logs, graphs, diff stats, commit navigation with HEAD~ and HEAD^, git show, git blame, and binary search with git bisect.',
  iconName: 'History',
  conceptCount: 15,
  concepts: [
    buildGitConcept({
      id: 'c-08-01', subChapterNumber: '08.1', command: 'git log', title: 'git log',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'Display the commit logs following parent pointers backward from HEAD',
      syntaxCode: 'git log',
    }),
    buildGitConcept({
      id: 'c-08-02', subChapterNumber: '08.2', command: 'git log --oneline', title: 'git log --oneline',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'Compact single-line output: 7-character short SHA plus commit title',
      syntaxCode: 'git log --oneline',
    }),
    buildGitConcept({
      id: 'c-08-03', subChapterNumber: '08.3', command: 'git log --graph --oneline --all', title: 'git log --graph',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'ASCII visual graph showing branch splits, merges, and diverging paths',
      syntaxCode: 'git log --graph --oneline --decorate',
    }),
    buildGitConcept({
      id: 'c-08-04', subChapterNumber: '08.4', command: 'git log --stat', title: 'git log --stat',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'Display file modification lists and insertion/deletion line counters per commit',
      syntaxCode: 'git log --stat',
    }),
    buildGitConcept({
      id: 'c-08-05', subChapterNumber: '08.5', command: 'git show HEAD', title: 'git show',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'Inspect metadata and full patch diff for a specific commit, tag, or blob',
      syntaxCode: 'git show <commit-hash>',
    }),
    buildGitConcept({
      id: 'c-08-06', subChapterNumber: '08.6', command: 'git rev-parse --short HEAD', title: 'Commit Hashes',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'Full 40-char SHA vs 7-char short abbreviation and collision safety',
      whatIsIt: 'Git requires at least 4 characters to disambiguate a commit hash; standard tools use 7 to 12 characters.',
    }),
    buildGitConcept({
      id: 'c-08-07', subChapterNumber: '08.7', command: 'git log --parents', title: 'Parents',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'First parent (mainline branch) vs second parent (merged branch) in merge nodes',
      whatIsIt: 'Understanding merge commits: Parent 1 is the branch you were on when merging; Parent 2 is the branch you merged in.',
    }),
    buildGitConcept({
      id: 'c-08-08', subChapterNumber: '08.8', command: 'git status (HEAD)', title: 'HEAD',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'The reference pointer representing your current location in history',
      whatIsIt: 'HEAD is the symbolic pointer to the current commit snapshot your working directory reflects.',
    }),
    buildGitConcept({
      id: 'c-08-09', subChapterNumber: '08.9', command: 'git show HEAD^', title: 'HEAD^',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'Caret syntax: referencing the first parent commit (HEAD^2 for second parent)',
      syntaxCode: 'git show HEAD^',
    }),
    buildGitConcept({
      id: 'c-08-10', subChapterNumber: '08.10', command: 'git show HEAD~3', title: 'HEAD~',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'Tilde syntax: stepping backwards N generations down the direct ancestor line',
      syntaxCode: 'git show HEAD~<n>',
    }),
    buildGitConcept({
      id: 'c-08-11', subChapterNumber: '08.11', command: 'git checkout <hash>', title: 'Commit Navigation',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'Time traveling to historical commits and understanding detached HEAD',
      whatIsIt: 'Checking out an older commit allows you to run, build, and test the project exactly as it existed at that moment in time.',
    }),
    buildGitConcept({
      id: 'c-08-12', subChapterNumber: '08.12', command: 'git log -S "stripe_key"', title: 'History Investigation',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'Pickaxe search (-S): find commits that added or removed specific code strings',
      syntaxCode: 'git log -S "<string>"',
    }),
    buildGitConcept({
      id: 'c-08-13', subChapterNumber: '08.13', command: 'git log -L :function_name:file.ts', title: 'Finding When Something Changed',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'Tracking line-range and function evolution across all historical commits',
      syntaxCode: 'git log -L 10,25:src/auth.ts',
    }),
    buildGitConcept({
      id: 'c-08-14', subChapterNumber: '08.14', command: 'git blame -L 15,30 src/index.ts', title: 'git blame',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'Annotate each line of a file with the commit hash, author, and date that last edited it',
      syntaxCode: 'git blame <file>',
    }),
    buildGitConcept({
      id: 'c-08-15', subChapterNumber: '08.15', command: 'git bisect start', title: 'git bisect',
      topicId: 'ch-08', topicNumber: '08', topicTitle: 'Git History',
      subtitle: 'Binary search debugging: pinpointing the exact regression commit in O(log N) steps',
      badges: ['Advanced', 'Debugging', 'Superpower'],
      syntaxCode: 'git bisect start && git bisect bad && git bisect good <commit>',
    }),
  ],
};

// ============================================================================
// CHAPTER 09: UNDOING CHANGES (09.1 to 09.15)
// ============================================================================
export const CHAPTER_09: AcademyTopic = {
  id: 'ch-09',
  number: '09',
  title: 'Undoing Changes',
  description: 'Master the senior recovery doctrine: Where is the mistake? Uncommitted (restore), Staged (restore --staged), Committed local (reset), Pushed shared (revert), and Reflog.',
  iconName: 'Undo2',
  conceptCount: 15,
  concepts: [
    buildGitConcept({
      id: 'c-09-01', subChapterNumber: '09.1', command: 'git restore <file>', title: 'Undo Unstaged Changes',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'Discarding uncommitted modifications in the working tree to match the index',
      whatIsIt: 'Replaces uncommitted modifications in your working tree with the version recorded in the index or HEAD.',
      realWorldScenario: 'CRITICAL TEACHING RULE: Ask: "Where is the mistake?" 1. UNCOMMITTED? 2. COMMITTED? 3. PUSHED? 4. SHARED? Here, changes are UNCOMMITTED in working tree: run `git restore <file>`.',
    }),
    buildGitConcept({
      id: 'c-09-02', subChapterNumber: '09.2', command: 'git restore <file>', title: 'git restore',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'The modern safe command for restoring working tree files',
      syntaxCode: 'git restore <file>',
    }),
    buildGitConcept({
      id: 'c-09-03', subChapterNumber: '09.3', command: 'git restore --staged <file>', title: 'Unstage Files',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'Taking accidentally added files out of the staging index while keeping disk edits',
      syntaxCode: 'git restore --staged <file>',
    }),
    buildGitConcept({
      id: 'c-09-04', subChapterNumber: '09.4', command: 'git restore --staged <file>', title: 'git restore --staged',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'Modern replacement for `git reset HEAD <file>`',
      syntaxCode: 'git restore --staged <path>',
    }),
    buildGitConcept({
      id: 'c-09-05', subChapterNumber: '09.5', command: 'git reset HEAD~1', title: 'Undo Last Commit',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'Rolling back the most recent local commit node',
      whatIsIt: 'Moves the current branch pointer backward one commit. Depending on flag (--soft, --mixed, --hard), changes are preserved or discarded.',
    }),
    buildGitConcept({
      id: 'c-09-06', subChapterNumber: '09.6', command: 'git reset', title: 'git reset',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'The 3-stage reset engine: altering HEAD, Index, and Working Tree',
      syntaxCode: 'git reset [--soft | --mixed | --hard] <target-commit>',
    }),
    buildGitConcept({
      id: 'c-09-07', subChapterNumber: '09.7', command: 'git reset --soft HEAD~1', title: 'Soft Reset',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'Moves HEAD pointer backward; keeps all changes staged in the index',
      whatIsIt: '`--soft` rewinds commit history but leaves all modified files staged in the index ready to re-commit with a new message.',
      syntaxCode: 'git reset --soft HEAD~1',
    }),
    buildGitConcept({
      id: 'c-09-08', subChapterNumber: '09.8', command: 'git reset --mixed HEAD~1', title: 'Mixed Reset',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'Default reset: moves HEAD backward; unstages files into working directory',
      whatIsIt: 'The default reset mode. Rewinds commit history and unstages files, keeping your edits safe on disk in the working directory.',
      syntaxCode: 'git reset HEAD~1',
    }),
    buildGitConcept({
      id: 'c-09-09', subChapterNumber: '09.9', command: 'git reset --hard HEAD~1', title: 'Hard Reset',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'DANGEROUS: moves HEAD backward and overwrites index and working tree',
      badges: ['Destructive', 'Caution'],
      whatIsIt: 'Destroys all uncommitted edits and forces the working tree and index to match target commit. Any uncommitted work is lost.',
      syntaxCode: 'git reset --hard HEAD~1',
      whenNotToUse: ['Never use if you have unsaved or uncommitted work you care about.'],
    }),
    buildGitConcept({
      id: 'c-09-10', subChapterNumber: '09.10', command: 'git revert <commit-hash>', title: 'git revert',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'Safe public undo: creates a new commit that records the exact inverse diff',
      badges: ['Essential', 'Safe for Public History'],
      whatIsIt: '`git revert` does not rewrite history; it calculates the inverse diff of the target commit and records a new commit undoing it.',
      syntaxCode: 'git revert <commit-hash>',
    }),
    buildGitConcept({
      id: 'c-09-11', subChapterNumber: '09.11', command: 'git reset vs git revert', title: 'Reset vs Revert',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'The golden rule: Reset rewrites history (local only); Revert adds history (public/shared)',
      whatIsIt: 'Rule of thumb: If the commit has NOT been pushed to GitHub, use `git reset`. If the commit HAS been pushed or shared, use `git revert`.',
    }),
    buildGitConcept({
      id: 'c-09-12', subChapterNumber: '09.12', command: 'git log origin/main..HEAD', title: 'Local vs Shared History',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'The point of no return: why rewriting pushed history breaks team workflows',
      whatIsIt: 'Explains non-fast-forward push rejections and why force pushing breaks coworkers\' clones who based work on the original commits.',
    }),
    buildGitConcept({
      id: 'c-09-13', subChapterNumber: '09.13', command: 'git status', title: 'Recovering Mistakes',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'Triage flowchart for recovering from accidental resets, deleted branches, and bad merges',
      whatIsIt: 'Senior diagnostic workflow to recover code from any state using stash, reflog, and object database inspection.',
    }),
    buildGitConcept({
      id: 'c-09-14', subChapterNumber: '09.14', command: 'git reflog', title: 'Reflog',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'Git\'s ultimate safety net: the chronological journal of every HEAD movement',
      whatIsIt: 'The reflog records every commit HEAD has ever pointed to on your machine for the last 90 days, even deleted branches and hard resets.',
    }),
    buildGitConcept({
      id: 'c-09-15', subChapterNumber: '09.15', command: 'git reflog && git branch rescue <hash>', title: 'git reflog',
      topicId: 'ch-09', topicNumber: '09', topicTitle: 'Undoing Changes',
      subtitle: 'Rescuing commits after accidental `git reset --hard` or deleted branches',
      syntaxCode: 'git reflog',
    }),
  ],
};

// ============================================================================
// CHAPTER 10: BRANCHES (10.1 to 10.16)
// ============================================================================
export const CHAPTER_10: AcademyTopic = {
  id: 'ch-10',
  number: '10',
  title: 'Branches',
  description: 'Understand branch pointers, creating/listing/deleting branches, `git switch`, detached HEAD, feature branches, and tracking branches.',
  iconName: 'GitBranch',
  conceptCount: 16,
  concepts: [
    buildGitConcept({
      id: 'c-10-01', subChapterNumber: '10.1', command: 'git branch', title: 'Why Branches Exist',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'Isolating feature experiments and bugfixes from stable production code',
      whatIsIt: 'Branches provide isolated workspaces where you can make commits without affecting `main` until the feature is reviewed and tested.',
    }),
    buildGitConcept({
      id: 'c-10-02', subChapterNumber: '10.2', command: 'cat .git/refs/heads/main', title: 'Branch Mental Model',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'Branches are simply 41-byte text files holding a commit hash—not heavy copies',
      whatIsIt: 'In Git, a branch is not a container of files. It is a lightweight, moveable pointer (a sticky note) pointing to a commit hash.',
    }),
    buildGitConcept({
      id: 'c-10-03', subChapterNumber: '10.3', command: 'git branch', title: 'git branch',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'List, create, or delete branches in your repository',
      syntaxCode: 'git branch [options] [branch-name]',
    }),
    buildGitConcept({
      id: 'c-10-04', subChapterNumber: '10.4', command: 'git branch feature-payment', title: 'Creating Branches',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'Creating a new branch pointer pointing to current HEAD commit',
      syntaxCode: 'git branch <branch-name>',
    }),
    buildGitConcept({
      id: 'c-10-05', subChapterNumber: '10.5', command: 'git branch -a', title: 'Listing Branches',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'Viewing local branches and remote-tracking mirrors (-a flag)',
      syntaxCode: 'git branch -a',
    }),
    buildGitConcept({
      id: 'c-10-06', subChapterNumber: '10.6', command: 'git branch -d feature-login', title: 'Deleting Branches',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'Safe deletion (-d) for merged branches vs force deletion (-D) for unmerged work',
      syntaxCode: 'git branch -d <branch-name>',
    }),
    buildGitConcept({
      id: 'c-10-07', subChapterNumber: '10.7', command: 'git rev-parse feature', title: 'Branch Pointer',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'How branch pointers automatically advance when new commits are created',
      whatIsIt: 'When you commit on an active branch, Git creates the commit and updates the branch pointer file to point to the new SHA.',
    }),
    buildGitConcept({
      id: 'c-10-08', subChapterNumber: '10.8', command: 'cat .git/HEAD', title: 'HEAD',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'Symbolic reference pointing to the currently active branch name',
      whatIsIt: 'HEAD normally contains `ref: refs/heads/<branch>`. Git uses this to know which branch pointer to advance on commit.',
    }),
    buildGitConcept({
      id: 'c-10-09', subChapterNumber: '10.9', command: 'git switch main', title: 'Switching Branches',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'Updating working tree files and HEAD to match target branch tip',
      whatIsIt: 'Swapping branches updates your disk files to match the snapshot at the target branch tip and points HEAD to it.',
    }),
    buildGitConcept({
      id: 'c-10-10', subChapterNumber: '10.10', command: 'git switch -c feature-oauth', title: 'git switch',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'The modern command dedicated exclusively to branch switching and creation',
      syntaxCode: 'git switch -c <new-branch>',
    }),
    buildGitConcept({
      id: 'c-10-11', subChapterNumber: '10.11', command: 'git checkout <branch>', title: 'git checkout',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'Historical branch switcher (split into `git switch` and `git restore` in Git 2.23)',
      syntaxCode: 'git checkout -b <branch>',
    }),
    buildGitConcept({
      id: 'c-10-12', subChapterNumber: '10.12', command: 'git checkout <commit-hash>', title: 'Detached HEAD',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'When HEAD points directly to a commit hash instead of a named branch',
      badges: ['Warning', 'Demystified'],
      whatIsIt: 'In detached HEAD, any new commits you make are not attached to a branch pointer and risk being garbage collected unless you create a branch.',
      safeRecovery: 'Create a branch to save work: `git switch -c rescue-branch`.',
    }),
    buildGitConcept({
      id: 'c-10-13', subChapterNumber: '10.13', command: 'git branch -vv', title: 'Tracking Branches',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'Binding a local branch to an upstream remote branch (e.g. main -> origin/main)',
      whatIsIt: 'Enables shorthand `git push` and `git pull` without specifying remote and branch names every time.',
      syntaxCode: 'git push -u origin <branch>',
    }),
    buildGitConcept({
      id: 'c-10-14', subChapterNumber: '10.14', command: 'git branch', title: 'Branch Naming',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'Production conventions: feature/JIRA-123-desc, fix/issue-456, release/v2.1',
      whatIsIt: 'Best practice: Use descriptive prefixes: `feat/`, `fix/`, `chore/`, `refactor/` with ticket IDs.',
    }),
    buildGitConcept({
      id: 'c-10-15', subChapterNumber: '10.15', command: 'git switch -c feat/checkout-api', title: 'Feature Branches',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'Short-lived branches for isolated development of a single user story or bug',
      whatIsIt: 'Feature branches isolate developer work. Once tested and approved via PR, they are merged into main and deleted.',
    }),
    buildGitConcept({
      id: 'c-10-16', subChapterNumber: '10.16', command: 'git switch main', title: 'Main Branch',
      topicId: 'ch-10', topicNumber: '10', topicTitle: 'Branches',
      subtitle: 'The primary trunk of production truth and deployment source',
      whatIsIt: 'The canonical branch representing production-ready code. Protected with required status checks and code reviews.',
    }),
  ],
};

// ============================================================================
// CHAPTER 11: MERGING (11.1 to 11.14)
// ============================================================================
export const CHAPTER_11: AcademyTopic = {
  id: 'ch-11',
  number: '11',
  title: 'Merging',
  description: 'Understand Fast-Forward merges, 3-way merges, merge commits, conflict markers, resolving conflicts, and merge strategies.',
  iconName: 'GitMerge',
  conceptCount: 14,
  concepts: [
    buildGitConcept({
      id: 'c-11-01', subChapterNumber: '11.1', command: 'git merge <branch>', title: 'Why Merge Exists',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'Reconciling divergent branch histories back into a unified lineage',
      whatIsIt: 'Merging brings work completed on another branch into your currently checked out branch.',
    }),
    buildGitConcept({
      id: 'c-11-02', subChapterNumber: '11.2', command: 'git merge --ff-only feature', title: 'Fast-Forward Merge',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'Linear pointer advancement when no divergent commits exist on target branch',
      whatIsIt: 'If `main` has no new commits since the feature branched off, Git simply moves the `main` pointer forward to the feature tip. No new commit is created.',
      syntaxCode: 'git merge --ff-only <branch>',
    }),
    buildGitConcept({
      id: 'c-11-03', subChapterNumber: '11.3', command: 'git merge --no-ff feature', title: 'Three-Way Merge',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'Finding the Common Ancestor (merge base) to combine divergent commits',
      whatIsIt: 'When both branches have new commits, Git locates the common ancestor (merge base), compares both branch tips against it, and calculates a combined snapshot.',
    }),
    buildGitConcept({
      id: 'c-11-04', subChapterNumber: '11.4', command: 'git merge feature', title: 'git merge',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'The primary command for integrating branches together',
      syntaxCode: 'git merge [options] <branch>',
    }),
    buildGitConcept({
      id: 'c-11-05', subChapterNumber: '11.5', command: 'git log -1 --merges', title: 'Merge Commit',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'A special commit node with two parent hashes recording the merge point',
      whatIsIt: 'A merge commit ties two independent histories together with two parent pointers: Parent 1 (current branch) and Parent 2 (merged branch).',
    }),
    buildGitConcept({
      id: 'c-11-06', subChapterNumber: '11.6', command: 'git status', title: 'Merge Conflicts',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'When Git cannot automatically reconcile edits made to the same lines',
      whatIsIt: 'Occurs when both branches modified the exact same lines of code differently since their common ancestor.',
    }),
    buildGitConcept({
      id: 'c-11-07', subChapterNumber: '11.7', command: 'cat conflicting-file.ts', title: 'Conflict Markers',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'Reading `<<<<<<< HEAD`, `=======`, and `>>>>>>> feature` in conflicting files',
      whatIsIt: 'Git writes visual markers into the file: `<<<<<<< HEAD` (your version) `=======` (separator) `>>>>>>> branch` (incoming version).',
    }),
    buildGitConcept({
      id: 'c-11-08', subChapterNumber: '11.8', command: 'code conflicting-file.ts', title: 'Resolving Conflicts',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'Senior developer guide to choosing, combining, or rewriting conflicting code',
      whatIsIt: 'Open the file, delete the conflict markers, edit the code to the desired reconciled state, and save.',
    }),
    buildGitConcept({
      id: 'c-11-09', subChapterNumber: '11.9', command: 'git status', title: 'git status During Conflict',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'Identifying "both modified" files and unmerged paths',
      whatIsIt: '`git status` lists files under "Unmerged paths:" labeled as "both modified", "added by us", or "deleted by them".',
    }),
    buildGitConcept({
      id: 'c-11-10', subChapterNumber: '11.10', command: 'git add resolved-file.ts', title: 'git add After Resolution',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'Marking conflicting files as resolved by staging them in the index',
      whatIsIt: 'Running `git add <file>` tells Git: "I have manually verified and resolved this conflict; it is ready to commit."',
      syntaxCode: 'git add <resolved-file>',
    }),
    buildGitConcept({
      id: 'c-11-11', subChapterNumber: '11.11', command: 'git commit -m "Merge branch feature"', title: 'git commit After Resolution',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'Finalizing the merge commit to complete the integration',
      syntaxCode: 'git commit',
    }),
    buildGitConcept({
      id: 'c-11-12', subChapterNumber: '11.12', command: 'git merge --abort', title: 'Abort Merge',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'Safe escape hatch: restoring working tree and HEAD to pre-merge state',
      badges: ['Safety Net'],
      whatIsIt: 'If a merge gets too complicated or unexpected conflicts appear, `git merge --abort` immediately rolls back to clean pre-merge state.',
      syntaxCode: 'git merge --abort',
    }),
    buildGitConcept({
      id: 'c-11-13', subChapterNumber: '11.13', command: 'git merge -s ort', title: 'Merge Strategies',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'Understanding merge algorithms: ort (modern default), recursive, octopus, and ours',
      whatIsIt: '`ort` (Ostensibly Recursive\'s Twin) is the modern default merge algorithm in Git, offering superior rename detection and speed.',
    }),
    buildGitConcept({
      id: 'c-11-14', subChapterNumber: '11.14', command: 'git status', title: 'Common Merge Mistakes',
      topicId: 'ch-11', topicNumber: '11', topicTitle: 'Merging',
      subtitle: 'Accidentally committing conflict markers, merging wrong branch, and ghost changes',
      whatIsIt: 'Always run tests and `git diff --staged` before completing a merge commit to guarantee no `<<<<<<<` markers were committed.',
    }),
  ],
};

// ============================================================================
// CHAPTER 12: REBASE (12.1 to 12.14)
// ============================================================================
export const CHAPTER_12: AcademyTopic = {
  id: 'ch-12',
  number: '12',
  title: 'Rebase',
  description: 'Understand rebase mental model, linear history, interactive rebase (squash, fixup, reword), conflict handling, and the Golden Rule of Rebase.',
  iconName: 'RefreshCw',
  conceptCount: 14,
  concepts: [
    buildGitConcept({
      id: 'c-12-01', subChapterNumber: '12.1', command: 'git rebase main', title: 'Why Rebase Exists',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'Keeping commit history clean, linear, and free of noisy merge commits',
      whatIsIt: 'Rebasing replays your feature commits on top of the newest commit of the base branch, giving the appearance that you started work today.',
    }),
    buildGitConcept({
      id: 'c-12-02', subChapterNumber: '12.2', command: 'git rebase main', title: 'Rebase Mental Model',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'Lifting commits off the tree, fast-forwarding the base, and re-applying patches one-by-one',
      whatIsIt: 'Git temporarily shelves your commits as patch files, resets your branch to target base commit, and applies each patch sequentially.',
    }),
    buildGitConcept({
      id: 'c-12-03', subChapterNumber: '12.3', command: 'git rebase main', title: 'git rebase',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'Reapply commits on top of another base tip',
      syntaxCode: 'git rebase <base-branch>',
    }),
    buildGitConcept({
      id: 'c-12-04', subChapterNumber: '12.4', command: 'git rebase -i HEAD~4', title: 'Interactive Rebase',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'The ultimate commit curation tool: reorder, squash, edit, drop, and reword',
      badges: ['Advanced', 'Curriculum Core'],
      syntaxCode: 'git rebase -i <commit-base>',
    }),
    buildGitConcept({
      id: 'c-12-05', subChapterNumber: '12.5', command: 'git rebase -i', title: 'Reordering Commits',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'Changing chronological sequence of commits by swapping lines in the todo list',
      whatIsIt: 'In the interactive rebase editor, swapping the order of lines reorders the commits on the branch.',
    }),
    buildGitConcept({
      id: 'c-12-06', subChapterNumber: '12.6', command: 'pick -> squash / fixup', title: 'Squashing',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'Combining multiple small "wip" commits into a single cohesive feature commit',
      whatIsIt: '`squash` merges the commit into previous commit and prompts to combine messages; `fixup` discards the squashed commit\'s message.',
    }),
    buildGitConcept({
      id: 'c-12-07', subChapterNumber: '12.7', command: 'edit <commit>', title: 'Editing Commits',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'Pausing the rebase playback to modify files or split a historical commit in two',
      whatIsIt: 'Setting an action to `edit` pauses Git at that exact commit so you can amend files, run tests, or split commits.',
    }),
    buildGitConcept({
      id: 'c-12-08', subChapterNumber: '12.8', command: 'drop <commit>', title: 'Dropping Commits',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'Completely removing a faulty commit from the branch history',
      whatIsIt: 'Deleting a line or marking it `drop` removes that commit entirely when replaying history.',
    }),
    buildGitConcept({
      id: 'c-12-09', subChapterNumber: '12.9', command: 'git status', title: 'Rebase Conflicts',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'Resolving conflicts patch-by-patch during rebase replay',
      whatIsIt: 'If a commit fails to apply cleanly, rebase pauses. Resolve the conflict markers in the file and stage with `git add`.',
    }),
    buildGitConcept({
      id: 'c-12-10', subChapterNumber: '12.10', command: 'git rebase --continue', title: 'Continue Rebase',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'Proceeding to the next commit in the rebase todo list after resolving conflicts',
      syntaxCode: 'git rebase --continue',
    }),
    buildGitConcept({
      id: 'c-12-11', subChapterNumber: '12.11', command: 'git rebase --abort', title: 'Abort Rebase',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'Canceling rebase and restoring branch tip to original SHA',
      syntaxCode: 'git rebase --abort',
    }),
    buildGitConcept({
      id: 'c-12-12', subChapterNumber: '12.12', command: 'git rebase vs git merge', title: 'Rebase vs Merge',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'Linear history vs preserving true chronological merge topology',
      whatIsIt: 'Rebase creates a clean straight line of history; Merge creates a true non-destructive graph showing when work was integrated.',
    }),
    buildGitConcept({
      id: 'c-12-13', subChapterNumber: '12.13', command: '# golden rule', title: 'When NOT to Rebase',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'The Golden Rule of Rebase: Never rebase commits that exist outside your repository',
      badges: ['Important', 'Golden Rule'],
      whatIsIt: 'Never rebase shared branches (like `main`). Rebasing creates new commit SHAs, which forces coworkers into messy duplicate merges.',
    }),
    buildGitConcept({
      id: 'c-12-14', subChapterNumber: '12.14', command: 'git push --force-with-lease', title: 'Shared History Risk',
      topicId: 'ch-12', topicNumber: '12', topicTitle: 'Rebase',
      subtitle: 'Understanding upstream divergence and using `--force-with-lease` safely',
      whatIsIt: 'If you rebase a private feature branch that was pushed, update it with `git push --force-with-lease` so you do not overwrite colleagues\' new commits.',
      syntaxCode: 'git push --force-with-lease origin <branch>',
    }),
  ],
};

export const PACK_02_CHAPTERS: AcademyTopic[] = [
  CHAPTER_07,
  CHAPTER_08,
  CHAPTER_09,
  CHAPTER_10,
  CHAPTER_11,
  CHAPTER_12,
];
