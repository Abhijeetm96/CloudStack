import React from 'react';
import {
  Compass,
  GitFork,
  Layers,
  History,
  Camera,
  Disc,
  Boxes,
  FolderTree,
  Laptop,
  Server,
  Hash,
  Binary,
  Download,
  Package,
  Sliders,
  Settings,
  User,
  Mail,
  KeyRound,
  Key,
  ShieldCheck,
  Award,
  Edit3,
  FileEdit,
  Terminal,
  WrapText,
  ArrowLeftRight,
  Zap,
  Sparkles,
  PlusSquare,
  Copy,
  HardDrive,
  LayoutTemplate,
  GitBranch,
  Eye,
  Activity,
  List,
  CheckSquare,
  FileQuestion,
  FilePlus,
  FileX,
  EyeOff,
  ShieldAlert,
  Filter,
  GitCompare,
  Split,
  CheckCheck,
  Type,
  FileText,
  Maximize2,
  Columns,
  BarChart2,
  PieChart,
  PlusCircle,
  Scissors,
  Trash2,
  FileMinus,
  Move,
  FolderInput,
  RotateCcw,
  Undo2,
  GitCommit,
  Save,
  MessageSquare,
  AlignLeft,
  Tag,
  SquareDot,
  Play,
  UserCheck,
  Clock,
  ListOrdered,
  FileSearch,
  Crosshair,
  Search,
  BarChart,
  Undo,
  AlertTriangle,
  StepBack,
  Trash,
  LifeBuoy,
  CornerDownRight,
  XCircle,
  Edit2,
  Cloud,
  Share2,
  GitMerge,
  FastForward,
  ArrowRight,
  AlertCircle,
  Minimize2,
  ArrowRightCircle,
  Hammer,
  Target,
  Milestone,
  Shield,
  AlertOctagon,
  Link,
  Plus,
  Upload,
  CloudUpload,
  Anchor,
  Send,
  CloudDownload,
  ArrowDownCircle,
  RefreshCw,
  GitPullRequest,
  CircleDot,
  LayoutGrid,
  MessageCircle,
  Users,
  FolderPlus,
  FolderGit2,
  Database,
  Rocket,
  Repeat,
  Bug,
  TestTube,
  TestTubes,
  FlaskConical,
  CheckCircle2,
  Bookmark,
  Flag,
  Radio,
  Megaphone,
  ScrollText,
  ToggleRight,
  Shuffle,
  Bot,
  PlayCircle,
  Cpu,
  Workflow,
  BookOpen,
  Network,
  FolderDown,
  FileCheck,
  FileDiff,
  Calendar,
  Code,
  Wrench,
  Globe,
  Archive,
  Building,
  FileCode,
  Webhook,
  Lock,
  Grid,
  Monitor,
  Container,
  Gauge,
  Trophy,
  LucideIcon,
} from 'lucide-react';

export interface ConceptIconInput {
  id?: string;
  command?: string;
  title?: string;
  subtitle?: string;
  subChapterNum?: string;
  subChapterNumber?: string;
  topicId?: string;
}

/**
 * Curated map of specific, highly relevant and unique icons for Git Academy concepts.
 */
export const EXACT_GIT_CONCEPT_ICONS: Record<string, LucideIcon> = {
  // Chapter 01: Version Control Fundamentals
  'c-01-01': Compass, // What is Version Control?
  'c-01-02': History, // The Problem Before Git
  'c-01-03': Laptop, // Centralized vs Distributed
  'c-01-04': Camera, // Snapshots vs Deltas
  'c-01-05': FolderTree, // The Three Trees Architecture
  'c-01-06': Disc, // Working Directory vs Git Directory
  'c-01-07': Binary, // Content-Addressable Storage (SHA-1 / SHA-256)
  'c-01-08': Network, // The Directed Acyclic Graph (DAG)
  'c-01-09': ShieldCheck, // Data Integrity & Immutability
  'c-01-10': ArrowLeftRight, // Local-First Philosophy
  'c-01-11': GitBranch, // Why Branching is Cheap
  'c-01-12': Server, // How Git Communicates with Remotes
  'c-01-13': Terminal, // Git Plumbing vs Porcelain
  'c-01-14': WrapText, // Common VCS Terminology Primer
  'c-01-15': Sparkles, // How to Think in Git (The Mental Model)

  // Chapter 02: Installation & Configuration
  'c-02-01': Download, // Installing Git
  'c-02-02': Settings, // The Three Git Config Scopes
  'c-02-03': User, // Setting Your Identity
  'c-02-04': FileEdit, // Choosing Your Default Editor
  'c-02-05': GitBranch, // Configuring Default Branch Name
  'c-02-06': WrapText, // Line Ending Handling (core.autocrlf)
  'c-02-07': KeyRound, // Setting Up SSH Keys
  'c-02-08': Key, // Connecting SSH Key to GitHub
  'c-02-09': Award, // GPG Commit Signing Setup
  'c-02-10': Sliders, // Configuring Credential Helpers
  'c-02-11': Zap, // Creating Essential Git Aliases
  'c-02-12': GitCompare, // Configuring Merge & Diff Tools
  'c-02-13': Sliders, // Core Pager & Color Settings
  'c-02-14': ShieldAlert, // Safe Directories & Multi-User Environments
  'c-02-15': CheckSquare, // Auditing Your Git Configuration

  // Chapter 03: Creating & Initializing Repositories
  'c-03-01': PlusSquare, // git init
  'c-03-02': HardDrive, // Deep Dive: Inside the .git Folder
  'c-03-03': Server, // Initializing Bare Repositories
  'c-03-04': LayoutTemplate, // Initializing with a Template Directory
  'c-03-05': FolderDown, // git clone
  'c-03-06': Download, // Shallow Clones (git clone --depth)
  'c-03-07': GitBranch, // Single Branch Clones
  'c-03-08': Boxes, // Cloning Repositories with Submodules
  'c-03-09': Copy, // Mirror Clones
  'c-03-10': Link, // Cloning via HTTPS vs SSH
  'c-03-11': FolderPlus, // Converting an Existing Project to Git
  'c-03-12': CheckCircle2, // Verifying Repository Health

  // Chapter 04: Inspection & Status
  'c-04-01': Eye, // git status
  'c-04-02': List, // Short Format Status (git status -s)
  'c-04-03': FileQuestion, // Understanding Untracked Files
  'c-04-04': FileCheck, // Understanding Modified & Staged Files
  'c-04-05': Layers, // Branch Ahead/Behind Counters
  'c-04-06': FileX, // The .gitignore File
  'c-04-07': Filter, // Advanced .gitignore Patterns
  'c-04-08': Shield, // Global gitignore Configuration
  'c-04-09': FileSearch, // Debugging Ignore Rules (git check-ignore)
  'c-04-10': EyeOff, // .git/info/exclude
  'c-04-11': Sparkles, // Diagnosing Dirty Working Trees

  // Chapter 05: Differences & Comparison
  'c-05-01': GitCompare, // What is a Diff?
  'c-05-02': FileDiff, // git diff (Working Directory vs Staging)
  'c-05-03': CheckCheck, // git diff --staged (Staging vs HEAD)
  'c-05-04': Split, // Comparing Across Branches
  'c-05-05': History, // Comparing Specific Commits
  'c-05-06': BarChart2, // Diff Summary (git diff --stat)
  'c-05-07': Type, // Word-by-Word Diff (git diff --word-diff)
  'c-05-08': FileText, // Scoping Diffs to Specific Paths
  'c-05-09': Columns, // Three-Dot vs Two-Dot Diffs
  'c-05-10': Maximize2, // Launching Graphical Diff Tools (git difftool)
  'c-05-11': WrapText, // Ignoring Whitespace Changes
  'c-05-12': Search, // Searching Within Diffs (git diff -S)

  // Chapter 06: Staging & Index
  'c-06-01': CheckSquare, // The Role of the Staging Area
  'c-06-02': PlusCircle, // git add
  'c-06-03': FolderPlus, // Staging Directories and Glob Patterns
  'c-06-04': Scissors, // Interactive Patch Staging (git add -p)
  'c-06-05': Sliders, // Interactive Staging (git add -i)
  'c-06-06': FilePlus, // Adding Only Tracked Files (git add -u)
  'c-06-07': Trash2, // Staging File Deletions (git rm)
  'c-06-08': FileMinus, // Removing from Index Only (git rm --cached)
  'c-06-09': Move, // Renaming and Moving Files (git mv)
  'c-06-10': RotateCcw, // Unstaging Changes (git restore --staged)
  'c-06-11': Undo2, // Legacy Unstaging (git reset HEAD <file>)
  'c-06-12': Database, // How the Staging Area Works Internally
  'c-06-13': Sparkles, // The Principle of Atomic Staging
  'c-06-14': ShieldAlert, // Fixing Accidentally Staged Secrets
  'c-06-15': CheckCircle2, // Validating the Index State

  // Chapter 07: Commits & Snapshots
  'c-07-01': GitCommit, // What is a Commit?
  'c-07-02': Save, // Anatomy of a Git Commit Object
  'c-07-03': MessageSquare, // Writing Professional Commit Messages
  'c-07-04': Tag, // Conventional Commits Standard
  'c-07-05': Sparkles, // Atomic Commits
  'c-07-06': Edit3, // Amending the Most Recent Commit
  'c-07-07': SquareDot, // Creating Empty Commits
  'c-07-08': UserCheck, // Overriding Author Information
  'c-07-09': Clock, // Setting Commit Dates
  'c-07-10': Award, // Signing Commits with GPG or SSH
  'c-07-11': CheckCheck, // Verifying Signed Commits
  'c-07-12': FileCheck, // Bypassing Pre-Commit Hooks
  'c-07-13': ListOrdered, // Commit Hash Anatomy
  'c-07-14': History, // The Root Commit
  'c-07-15': AlertTriangle, // Undoing a Commit Without Losing Changes
  'c-07-16': ShieldCheck, // Commit Hygiene and Best Practices
  'c-07-17': Users, // Co-Authored Commits
  'c-07-18': Zap, // Automating Commits Safely

  // Chapter 08: History & Exploration
  'c-08-01': Clock, // git log Fundamentals
  'c-08-02': ListOrdered, // Compact History (git log --oneline)
  'c-08-03': Network, // Visualizing Commit Graph (git log --graph)
  'c-08-04': Filter, // Custom Log Formatting
  'c-08-05': FileSearch, // Viewing File Changes with History
  'c-08-06': Calendar, // Filtering History by Date
  'c-08-07': User, // Filtering History by Author
  'c-08-08': Search, // Searching Commit Messages (git log --grep)
  'c-08-09': Code, // Searching Code Changes (git log -S / -G)
  'c-08-10': FileText, // History of a Specific File
  'c-08-11': GitBranch, // Comparing History Across Branches
  'c-08-12': Users, // Contributor Summaries (git shortlog)
  'c-08-13': UserCheck, // Line-by-Line Authorship (git blame)
  'c-08-14': Eye, // Advanced git blame
  'c-08-15': Crosshair, // Binary Search Debugging (git bisect)
  'c-08-16': Zap, // Automating git bisect (git bisect run)
  'c-08-17': Shield, // Ignoring Commits in Blame
  'c-08-18': Activity, // History Statistics & Code Churn

  // Chapter 09: Undoing Changes & Recovery
  'c-09-01': RotateCcw, // The Landscape of Undoing in Git
  'c-09-02': Undo, // Discarding Working Directory Changes (git restore)
  'c-09-03': FileMinus, // Legacy Discarding (git checkout -- <file>)
  'c-09-04': RotateCcw, // Unstaging Files (git restore --staged)
  'c-09-05': Undo2, // Soft Reset (git reset --soft)
  'c-09-06': Sliders, // Mixed Reset (git reset --mixed)
  'c-09-07': AlertTriangle, // Hard Reset (git reset --hard)
  'c-09-08': ShieldAlert, // Safety Rules: When NEVER to git reset
  'c-09-09': History, // Reverting Commits (git revert)
  'c-09-10': StepBack, // Reverting a Merge Commit
  'c-09-11': Trash, // Cleaning Untracked Files (git clean)
  'c-09-12': LifeBuoy, // The Git Reflog (git reflog)
  'c-09-13': Clock, // Recovering Deleted Commits via Reflog
  'c-09-14': GitBranch, // Recovering Deleted Branches
  'c-09-15': ShieldCheck, // Emergency Triage: The "Undo Decision Tree"

  // Chapter 10: Branching Strategies
  'c-10-01': GitBranch, // What is a Branch?
  'c-10-02': Disc, // How Branches Work Under the Hood
  'c-10-03': PlusCircle, // Creating Branches (git branch <name>)
  'c-10-04': List, // Listing Local and Remote Branches
  'c-10-05': ArrowLeftRight, // Switching Branches (git switch)
  'c-10-06': CornerDownRight, // Legacy Branch Switching (git checkout)
  'c-10-07': Plus, // Creating and Switching in One Command
  'c-10-08': Trash2, // Deleting Branches Safely (git branch -d)
  'c-10-09': AlertTriangle, // Force Deleting Branches (git branch -D)
  'c-10-10': Edit2, // Renaming Branches (git branch -m)
  'c-10-11': Cloud, // Tracking Remote Branches
  'c-10-12': Share2, // Setting Upstream Branches
  'c-10-13': Anchor, // Detached HEAD State: Understanding & Fixing
  'c-10-14': Sparkles, // Creating Orphan Branches (git switch --orphan)
  'c-10-15': Tag, // Branch Naming Conventions & Best Practices
  'c-10-16': CheckCircle2, // Branch Cleanup and Pruning Stale Branches

  // Chapter 11: Merging
  'c-11-01': GitMerge, // What is Merging?
  'c-11-02': FastForward, // Fast-Forward Merges
  'c-11-03': ArrowRight, // Forcing a Merge Commit (--no-ff)
  'c-11-04': Layers, // Three-Way Merges (Recursive / Ort)
  'c-11-05': Minimize2, // Squash Merging (git merge --squash)
  'c-11-06': AlertCircle, // What Causes a Merge Conflict?
  'c-11-07': FileSearch, // Anatomy of Conflict Markers
  'c-11-08': Wrench, // Resolving Merge Conflicts Step by Step
  'c-11-09': XCircle, // Aborting a Merge (git merge --abort)
  'c-11-10': CheckSquare, // Continuing a Merge (git merge --continue)
  'c-11-11': Sliders, // Merge Strategies: ours vs theirs
  'c-11-12': Sparkles, // Reuse Recorded Resolution (git rerere)
  'c-11-13': ShieldCheck, // Conflict Prevention Best Practices
  'c-11-14': Activity, // Merge vs Rebase: The Definitive Comparison

  // Chapter 12: Rebasing
  'c-12-01': Workflow, // What is Rebasing?
  'c-12-02': ArrowRightCircle, // How Rebase Rewrites History
  'c-12-03': GitCommit, // Standard Rebase (git rebase <upstream>)
  'c-12-04': Sliders, // Interactive Rebase (git rebase -i)
  'c-12-05': Hammer, // Reorder, Reword, and Drop Commits
  'c-12-06': Layers, // Squashing and Fixing Up Commits
  'c-12-07': Scissors, // Splitting a Commit via Interactive Rebase
  'c-12-08': Terminal, // Executing Commands During Rebase (exec)
  'c-12-09': AlertCircle, // Resolving Conflicts During a Rebase
  'c-12-10': XCircle, // Aborting and Continuing a Rebase
  'c-12-11': Target, // Rebasing Onto Another Base (git rebase --onto)
  'c-12-12': Shield, // The Golden Rule of Rebasing
  'c-12-13': LifeBuoy, // Recovering from a Broken Rebase
  'c-12-14': CheckCircle2, // Autosquash Workflow (git commit --fixup)

  // Chapter 13: Remotes & Topology
  'c-13-01': Server, // What is a Remote Repository?
  'c-13-02': Globe, // Centralized vs Distributed Topologies
  'c-13-03': Link, // Viewing Remote Configurations (git remote -v)
  'c-13-04': Plus, // Adding Remotes (git remote add)
  'c-13-05': Sliders, // Renaming and Removing Remotes
  'c-13-06': KeyRound, // Changing Remote URLs (HTTPS to SSH)
  'c-13-07': Eye, // Inspecting Remotes (git remote show)
  'c-13-08': Network, // Forking Workflow: Origin vs Upstream
  'c-13-09': Scissors, // Pruning Deleted Remote Branches (git remote prune)
  'c-13-10': Cloud, // Refspecs: How Remote Mappings Work Under the Hood
  'c-13-11': Server, // Working with Multiple Remotes Simultaneously
  'c-13-12': ShieldAlert, // Remote Security: Authentication & Permissions
  'c-13-13': CheckCircle2, // Diagnosing Remote Connectivity Issues

  // Chapter 14: Pushing
  'c-14-01': Upload, // What Happens During a Push?
  'c-14-02': CloudUpload, // git push Basics
  'c-14-03': Anchor, // Pushing with Upstream Tracking (git push -u)
  'c-14-04': AlertTriangle, // Force Pushing: When and Why
  'c-14-05': ShieldCheck, // Safe Force Pushing (--force-with-lease)
  'c-14-06': Send, // Pushing Specific Branches
  'c-14-07': Layers, // Pushing All Branches (git push --all)
  'c-14-08': Tag, // Pushing Tags to Remote
  'c-14-09': Trash2, // Deleting Remote Branches
  'c-14-10': XCircle, // Handling "Non-Fast-Forward" Push Rejections
  'c-14-11': Sliders, // Push Options and Server Hooks
  'c-14-12': Shield, // Branch Protection Rules and Push Rejections

  // Chapter 15: Fetching & Pulling
  'c-15-01': Download, // git fetch: Inspecting Before Integrating
  'c-15-02': CloudDownload, // Fetching Specific Branches and All Remotes
  'c-15-03': ArrowDownCircle, // git pull: Fetch + Merge in One Step
  'c-15-04': Workflow, // git pull --rebase: Keeping a Linear History
  'c-15-05': Settings, // Configuring Default Pull Behavior (pull.rebase)
  'c-15-06': Scissors, // Auto-Pruning During Fetch (fetch.prune)
  'c-15-07': Archive, // Handling Conflicts During git pull
  'c-15-08': RefreshCw, // Auto-Stash on Pull (rebase.autoStash)
  'c-15-09': Eye, // Inspecting What Changed After Fetch
  'c-15-10': ShieldCheck, // Fetch vs Pull: Professional Best Practices

  // Chapter 16: GitHub Fundamentals
  'c-16-01': Globe, // What is GitHub?
  'c-16-02': FolderPlus, // Creating Repositories on GitHub
  'c-16-03': KeyRound, // Personal Access Tokens and SSH Authentication
  'c-16-04': GitPullRequest, // Pull Requests: Anatomy and Purpose
  'c-16-05': MessageSquare, // Opening a Pull Request
  'c-16-06': CheckSquare, // Code Reviews: Requesting, Reviewing, Approving
  'c-16-07': Edit3, // Suggesting Changes Inline
  'c-16-08': RefreshCw, // Addressing Review Comments and Updating PRs
  'c-16-09': CircleDot, // GitHub Issues: Tracking Bugs and Features
  'c-16-10': Tag, // Issue Labels, Assignees, and Milestones
  'c-16-11': Link, // Linking Issues to Pull Requests (Closes #123)
  'c-16-12': Milestone, // Milestones: Grouping Work by Deadlines
  'c-16-13': LayoutGrid, // GitHub Projects: Kanban and Table Boards
  'c-16-14': MessageCircle, // GitHub Discussions: Team Conversations
  'c-16-15': Sparkles, // Repository README, LICENSE, and Community Files

  // Chapter 17: GitHub Advanced Collaboration
  'c-17-01': GitFork, // The Forking Workflow: Open Source Collaboration
  'c-17-02': RefreshCw, // Syncing a Fork with Upstream
  'c-17-03': ShieldCheck, // Protected Branches: Enforcing Quality Gates
  'c-17-04': Users, // CODEOWNERS: Automatic Reviewer Assignment
  'c-17-05': Clock, // Draft Pull Requests: Work-in-Progress Collaboration
  'c-17-06': ListOrdered, // Merge Queues: Preventing Broken Main Branches
  'c-17-07': Layers, // Merge Types on GitHub: Merge, Squash, Rebase
  'c-17-08': Sliders, // Repository Settings: Permissions and Visibility
  'c-17-09': Building, // Organization vs Personal Accounts
  'c-17-10': Bot, // GitHub Apps and Deploy Keys
  'c-17-11': ShieldAlert, // Managing Secrets and Environment Variables
  'c-17-12': CheckCircle2, // Collaboration Etiquette and Best Practices

  // Chapter 18: Advanced Git Tools
  'c-18-01': Archive, // git stash: Saving Work Temporarily
  'c-18-02': Package, // Stashing Untracked and Ignored Files
  'c-18-03': List, // Managing Multiple Stashes (list, pop, apply, drop)
  'c-18-04': Tag, // Git Tags: Lightweight vs Annotated Tags
  'c-18-05': Bookmark, // Tagging Releases and Signing Tags
  'c-18-06': Crosshair, // git cherry-pick: Applying Specific Commits
  'c-18-07': Split, // Cherry-Picking Ranges and Handling Conflicts
  'c-18-08': Layers, // git worktree: Multiple Working Directories
  'c-18-09': Terminal, // Managing and Cleaning Worktrees
  'c-18-10': FolderPlus, // Git Submodules: Embedding Repositories
  'c-18-11': RefreshCw, // Updating and Cloning Repos with Submodules
  'c-18-12': FolderTree, // Git Subtree: An Alternative to Submodules
  'c-18-13': History, // Rewriting History with git filter-repo
  'c-18-14': ShieldAlert, // Removing Sensitive Files from Entire History
  'c-18-15': Sparkles, // Git Attributes (.gitattributes): LF, Diff, Merge
  'c-18-16': CheckCircle2, // Advanced Git Configuration Pro Tips

  // Chapter 19: Git Internals & Plumbing
  'c-19-01': Database, // How Git Stores Data: Object Database
  'c-19-02': FileText, // Blob Objects: File Content Storage
  'c-19-03': FolderTree, // Tree Objects: Directory Structure Storage
  'c-19-04': GitCommit, // Commit Objects: Snapshot Metadata Storage
  'c-19-05': Tag, // Tag Objects: Annotated Tag Storage
  'c-19-06': Binary, // Inspecting Objects with git cat-file
  'c-19-07': Hash, // Hashing Content with git hash-object
  'c-19-08': Disc, // References (Refs): How Branches & Tags Point
  'c-19-09': Anchor, // The HEAD Reference: Symbolic vs Direct
  'c-19-10': Boxes, // Packfiles and Index Files: Compression in Git
  'c-19-11': Sparkles, // Garbage Collection: git gc and git prune
  'c-19-12': FileCode, // Index File Format (.git/index)
  'c-19-13': Server, // Git Protocols: Local, HTTP, SSH, Git
  'c-19-14': Cpu, // Building a Commit Manually Using Only Plumbing

  // Chapter 20: Triage & Emergency Fixes
  'c-20-01': LifeBuoy, // The Emergency Triage Framework
  'c-20-02': Undo2, // "I Committed to the Wrong Branch!"
  'c-20-03': RotateCcw, // "I Committed Sensitive Data (API Key, Password)!"
  'c-20-04': Trash, // "I Accidental Deleted My Branch!"
  'c-20-05': History, // "My Hard Reset Destroyed My Work!"
  'c-20-06': AlertCircle, // "I'm Stuck in the Middle of a Merge Conflict!"
  'c-20-07': Workflow, // "My Rebase Went Completely Haywire!"
  'c-20-08': Anchor, // "I'm in Detached HEAD and Lost My Changes!"
  'c-20-09': HardDrive, // "My Repo is 2GB Because Someone Committed a Zip!"
  'c-20-10': CloudUpload, // "git push Rejected: Non-Fast-Forward Error!"
  'c-20-11': Scissors, // "I Have Corrupted Objects in My Repository!"
  'c-20-12': WrapText, // "Line Endings Broke Every File as Modified!"
  'c-20-13': Server, // "Submodule is in Broken/Conflicted State!"
  'c-20-14': ShieldCheck, // Prevention Checklist: Never Face an Emergency Again

  // Chapter 21: CI/CD Fundamentals
  'c-21-01': Activity, // What is Continuous Integration (CI)?
  'c-21-02': Rocket, // Continuous Delivery vs Continuous Deployment
  'c-21-03': RefreshCw, // The Build-Test-Deploy Feedback Loop
  'c-21-04': CheckCheck, // Shift-Left Philosophy: Catching Bugs Early
  'c-21-05': Package, // What is a Build Artifact?
  'c-21-06': Server, // CI/CD Ecosystem Landscape
  'c-21-07': Cpu, // Cloud vs Self-Hosted CI Infrastructure
  'c-21-08': Sliders, // Environment Parity: Dev, Staging, Production
  'c-21-09': ShieldAlert, // Security in CI/CD: The Software Supply Chain
  'c-21-10': BarChart, // DORA Metrics: Measuring Delivery Performance
  'c-21-11': Zap, // Fast Builds: The Cost of Slow Pipelines
  'c-21-12': GitBranch, // Branching Models for CI/CD
  'c-21-13': CheckCircle2, // Designing Your First Pipeline: A Blueprint

  // Chapter 22: Pipeline Architecture
  'c-22-01': Workflow, // Anatomy of a Pipeline: Stages, Jobs, Steps
  'c-22-02': Network, // Directed Acyclic Graph (DAG) Pipelines
  'c-22-03': Layers, // Sequential vs Parallel Job Execution
  'c-22-04': ArrowRight, // Passing Data Between Jobs
  'c-22-05': Sliders, // Conditional Execution: when, if, needs
  'c-22-06': Play, // Pipeline Triggers: Events, Schedules, Manual
  'c-22-07': Server, // Runners and Execution Environments
  'c-22-08': Boxes, // Containerized Pipeline Steps
  'c-22-09': ListOrdered, // Concurrency Control and Queue Management
  'c-22-10': Clock, // Timeout and Failure Handling Strategies
  'c-22-11': Repeat, // Pipeline Retries and Flaky Step Mitigation
  'c-22-12': Sliders, // Environment Variables and Configuration Injection
  'c-22-13': Package, // Artifact Retention and Lifecycle Management
  'c-22-14': Megaphone, // Pipeline Notifications: Slack, Email, Discord
  'c-22-15': ShieldCheck, // Pipeline Governance and Compliance Gates

  // Chapter 23: GitHub Actions Deep Dive
  'c-23-01': Terminal, // GitHub Actions Architecture and Mental Model
  'c-23-02': FileCode, // The Workflow File (.github/workflows/*.yml)
  'c-23-03': PlayCircle, // Workflow Triggers (on: push, pull_request)
  'c-23-04': Calendar, // Scheduled Triggers (cron syntax)
  'c-23-05': Sliders, // Manual Triggers (workflow_dispatch)
  'c-23-06': Webhook, // Webhook and Repository Dispatch Triggers
  'c-23-07': Server, // Runners: ubuntu-latest, windows, macos
  'c-23-08': Cpu, // Self-Hosted Runners: Setup and Security
  'c-23-09': CheckSquare, // Steps: Uses vs Run
  'c-23-10': Sparkles, // Using Community Actions from Marketplace
  'c-23-11': KeyRound, // Action Contexts and Expressions (${{ }})
  'c-23-12': Sliders, // Environment Variables (env) at All Scopes
  'c-23-13': Lock, // Encrypted Secrets and Environment Secrets
  'c-23-14': Key, // GITHUB_TOKEN: Permissions and Capabilities
  'c-23-15': Zap, // Dependency Caching with actions/cache
  'c-23-16': Package, // Storing Artifacts with actions/upload-artifact
  'c-23-17': Download, // Downloading Artifacts with actions/download-artifact
  'c-23-18': Grid, // Matrix Builds: Testing Across Versions & OS
  'c-23-19': Sliders, // Matrix Include, Exclude, and Fail-Fast
  'c-23-20': Network, // Job Dependencies: needs Keyword
  'c-23-21': Filter, // Conditional Jobs and Steps (if: expressions)
  'c-23-22': ListOrdered, // Concurrency Groups: Canceling Outdated Runs
  'c-23-23': Clock, // Job Timeouts and Status Checks (always(), failure())
  'c-23-24': Workflow, // Reusable Workflows (workflow_call)
  'c-23-25': Boxes, // Composite Actions: Packaging Multi-Step Logic
  'c-23-26': ShieldAlert, // Security Best Practices: Pinning Actions to SHA
  'c-23-27': Bug, // Debugging Workflows: Runner SSH and Debug Logs
  'c-23-28': CheckCircle2, // Production-Grade Workflow Complete Walkthrough

  // Chapter 24: Practical CI Workflows
  'c-24-01': Sparkles, // Automated Code Linting (ESLint, Flake8)
  'c-24-02': WrapText, // Code Formatting Enforcement (Prettier, Black)
  'c-24-03': FileCheck, // Type Checking in CI (TypeScript, MyPy)
  'c-24-04': TestTube, // Running Unit Tests in CI
  'c-24-05': TestTubes, // Running Integration Tests with Service Containers
  'c-24-06': BarChart2, // Code Coverage Reporting and PR Badges
  'c-24-07': Target, // Coverage Threshold Enforcement (Fail Below 80%)
  'c-24-08': Package, // Build Verification: Ensuring Artifacts Compile
  'c-24-09': Zap, // Optimizing CI Speed: Parallelizing Test Suites
  'c-24-10': ShieldCheck, // Complete Pull Request Quality Check Pipeline

  // Chapter 25: Docker in CI/CD
  'c-25-01': Boxes, // Why Containers in CI/CD?
  'c-25-02': Cpu, // Building Docker Images in GitHub Actions
  'c-25-03': Layers, // Multi-Stage Dockerfile Optimization for CI
  'c-25-04': FastForward, // Docker Layer Caching with BuildKit
  'c-25-05': Database, // Caching Images with GitHub Actions Cache / Registry
  'c-25-06': Play, // Testing Applications Inside Containers
  'c-25-07': LayoutGrid, // Multi-Service Testing with Docker Compose in CI
  'c-25-08': Server, // Service Containers in GitHub Actions (services:)
  'c-25-09': Globe, // Cross-Platform Container Builds (buildx / QEMU)
  'c-25-10': ShieldAlert, // Container Security Scanning in CI (Trivy, Grype)
  'c-25-11': Package, // Slim Container Images: Distroless and Alpine
  'c-25-12': CheckCircle2, // Production Docker CI Pipeline: Build, Scan, Cache

  // Chapter 26: Artifacts & Container Registries
  'c-26-01': CloudUpload, // Container Registries Overview: Docker Hub, GHCR, ECR
  'c-26-02': Package, // Authenticating and Pushing to GitHub Packages (GHCR)
  'c-26-03': Tag, // Container Image Tagging Strategies (SemVer, SHA, Latest)
  'c-26-04': Cloud, // Pushing to Docker Hub via GitHub Actions
  'c-26-05': Server, // Pushing to AWS ECR via OIDC Authentication
  'c-26-06': ShieldCheck, // Container Image Signing with Cosign / Sigstore
  'c-26-07': Award, // Generating and Attesting SLSA Provenance
  'c-26-08': ScrollText, // Software Bill of Materials (SBOM) Generation
  'c-26-09': Package, // Publishing NPM / PyPI Packages from CI
  'c-26-10': HardDrive, // Publishing Binary Release Assets (Go, Rust, C++)
  'c-26-11': Scissors, // Registry Cleanup and Image Retention Policies
  'c-26-12': CheckCircle2, // Multi-Registry Publishing Strategy
  'c-26-13': Lock, // Vulnerability Gates: Block Pushing Vulnerable Images
  'c-26-14': Sparkles, // Complete Artifact Publishing Pipeline

  // Chapter 27: Security & Compliance in CI/CD
  'c-27-01': ShieldAlert, // Secret Scanning: Preventing Leaked Credentials
  'c-27-02': Search, // Static Application Security Testing (SAST)
  'c-27-03': Bot, // Dependency Scanning with Dependabot
  'c-27-04': Shield, // Dependency Review Action in Pull Requests
  'c-27-05': Bug, // Dynamic Application Security Testing (DAST) in CI
  'c-27-06': Lock, // Infrastructure as Code (IaC) Scanning (Checkov, tfsec)
  'c-27-07': KeyRound, // OpenID Connect (OIDC): Cloud Access Without Secrets
  'c-27-08': ShieldCheck, // Least Privilege Principle for GITHUB_TOKEN
  'c-27-09': FileCode, // Hardening GitHub Actions Workflows Against Injection
  'c-27-10': Network, // Supply Chain Security: Protecting Against Compromised Actions
  'c-27-11': ScrollText, // Compliance Auditing: Generating Audit Reports
  'c-27-12': Award, // Signed Commits and Verified Identity Enforcement
  'c-27-13': FileCheck, // License Compliance: Scanning Third-Party Dependencies
  'c-27-14': Shield, // Complete DevSecOps Pipeline Blueprint

  // Chapter 28: Automated Testing & Quality Gates
  'c-28-01': TestTube, // The Testing Pyramid in Modern CI/CD
  'c-28-02': PlayCircle, // Unit Testing Strategies and Parallel Execution
  'c-28-03': TestTubes, // Integration Testing with Mocked vs Real Services
  'c-28-04': Monitor, // End-to-End Testing in CI (Playwright, Cypress)
  'c-28-05': Shuffle, // Headless Browser Testing in GitHub Actions
  'c-28-06': Activity, // Performance and Load Testing in CI (k6, Lighthouse)
  'c-28-07': GitCompare, // Visual Regression Testing (Percy, Chromatic)
  'c-28-08': Award, // Contract Testing with Pact
  'c-28-09': Target, // Mutation Testing: Testing Your Tests
  'c-28-10': ShieldCheck, // Quality Gates: Defining Non-Negotiable Pass/Fail Criteria
  'c-28-11': CheckCheck, // Branch Protection Integration with Quality Gates
  'c-28-12': RefreshCw, // Handling Flaky Tests: Auto-Retry vs Quarantine
  'c-28-13': BarChart2, // Test Analytics: Tracking Test Times and Failures Over Time
  'c-28-14': Sparkles, // Complete Enterprise Testing Pipeline Blueprint

  // Chapter 29: Continuous Deployment & Environments
  'c-29-01': Globe, // Continuous Deployment vs Continuous Delivery
  'c-29-02': LayoutGrid, // GitHub Environments: Staging, Pre-Prod, Production
  'c-29-03': Users, // Required Reviewers and Environment Protection Rules
  'c-29-04': Clock, // Wait Timers and Scheduled Deployment Windows
  'c-29-05': Lock, // Environment-Specific Secrets and Configuration
  'c-29-06': KeyRound, // Deploying to AWS via OIDC (Zero-Secret Deployment)
  'c-29-07': Cloud, // Deploying to Google Cloud (GCP) via Workload Identity
  'c-29-08': Server, // Deploying to Microsoft Azure via Federated Credentials
  'c-29-09': Rocket, // Deploying to PaaS (Vercel, Render, Railway, Fly.io)
  'c-29-10': Terminal, // Deploying via SSH / Ansible to Virtual Machines
  'c-29-11': Layers, // Deploying to Kubernetes Clusters (kubectl, Helm)
  'c-29-12': Activity, // Deployment Status Tracking and GitHub Deployment API
  'c-29-13': Undo2, // Automated Rollback Strategies on Deployment Failure
  'c-29-14': ShieldCheck, // Production Deployment Complete Checklist

  // Chapter 30: Modern Deployment Strategies
  'c-30-01': Play, // Big Bang Deployments: Risks and Why We Avoid Them
  'c-30-02': RefreshCw, // Rolling Deployments: Incremental Instance Updates
  'c-30-03': ArrowLeftRight, // Blue-Green Deployments: Zero-Downtime Switching
  'c-30-04': PieChart, // Canary Deployments: Traffic Splitting and Risk Mitigation
  'c-30-05': ToggleRight, // Feature Flags: Decoupling Deployment from Release
  'c-30-06': Eye, // Dark Launches and Shadow Traffic
  'c-30-07': RotateCcw, // Automated Health Checks and Instant Rollback Triggers
  'c-30-08': Database, // Database Migrations in Zero-Downtime Deployments
  'c-30-09': Layers, // Expand-Contract Pattern for Breaking Schema Changes
  'c-30-10': ShieldAlert, // Smoke Testing in Production Post-Deployment
  'c-30-11': Cpu, // Progressive Delivery with Argo Rollouts and Flagger
  'c-30-12': Activity, // Metrics-Driven Automated Canary Analysis
  'c-30-13': Sliders, // Traffic Routing via Load Balancers and Ingress Controllers
  'c-30-14': CheckCircle2, // Choosing the Right Deployment Strategy Matrix

  // Chapter 31: Release Automation & Changelogs
  'c-31-01': Tag, // The Release Process: From Code to Consumer
  'c-31-02': Milestone, // Semantic Versioning (SemVer 2.0.0) Deep Dive
  'c-31-03': MessageSquare, // Conventional Commits as the Foundation of Automation
  'c-31-04': ScrollText, // Automated Changelog Generation from Commits
  'c-31-05': Bot, // Google's release-please: Automated Release PRs
  'c-31-06': Sparkles, // semantic-release: Fully Autonomous Versioning & Publishing
  'c-31-07': Rocket, // Creating GitHub Releases with Assets via Actions
  'c-31-08': Award, // Generating Release Notes with GitHub AI Summaries
  'c-31-09': Bookmark, // Tag-Triggered Workflows: on: push: tags: 'v*'
  'c-31-10': Send, // Notifying Stakeholders: Slack, Email, Webhooks on Release
  'c-31-11': HardDrive, // Publishing Release Binaries across Multiple Architectures
  'c-31-12': RotateCcw, // Hotfix Releases: Patching Production Directly
  'c-31-13': ShieldCheck, // Complete Release Automation Pipeline Walkthrough

  // Chapter 32: CI/CD Troubleshooting & Debugging
  'c-32-01': LifeBuoy, // The CI/CD Troubleshooting Mental Model
  'c-32-02': FileSearch, // Reading and Interpreting GitHub Actions Run Logs
  'c-32-03': Bug, // Enabling Step Debug and Runner Diagnostic Logging
  'c-32-04': Terminal, // Interactive Debugging: SSH into a Live Runner
  'c-32-05': AlertTriangle, // Common Error: Action or Step Permission Denied
  'c-32-06': Lock, // Common Error: Secret Not Found or Secret Empty
  'c-32-07': Zap, // Common Error: Cache Misses and Cache Corruption
  'c-32-08': Network, // Common Error: Network Timeouts and Registry Rate Limits
  'c-32-09': HardDrive, // Common Error: Out of Disk Space on Runner
  'c-32-10': Cpu, // Common Error: Out of Memory (OOM) Killed Steps
  'c-32-11': Repeat, // Diagnosing Flaky Tests and Race Conditions in CI
  'c-32-12': RefreshCw, // Docker-in-Docker (DinD) and Socket Binding Issues
  'c-32-13': Clock, // Stuck Jobs, Deadlocks, and Timeout Recovery
  'c-32-14': ShieldCheck, // CI Incident Response: Runbook and Post-Mortem Template

  // Chapter 33: Advanced GitHub Actions Patterns
  'c-33-01': Workflow, // Reusable Workflows vs Composite Actions vs Custom Actions
  'c-33-02': Repeat, // Authoring Reusable Workflows with Inputs and Outputs
  'c-33-03': Lock, // Passing Secrets Securely to Reusable Workflows
  'c-33-04': Boxes, // Authoring Composite Actions (action.yml)
  'c-33-05': Container, // Authoring Docker Container Actions
  'c-33-06': Terminal, // Authoring JavaScript / TypeScript Actions
  'c-33-07': Grid, // Dynamic Matrix Generation via Job Outputs
  'c-33-08': Sliders, // Sharing State Across Matrix Jobs
  'c-33-09': Network, // Cross-Repository Workflow Triggering (repository_dispatch)
  'c-33-10': Bot, // Event-Driven Automation: Comment-Triggered Workflows
  'c-33-11': Sparkles, // Building Custom ChatOps with GitHub Actions
  'c-33-12': Code, // GitHub Script (actions/github-script): Inline API Scripting
  'c-33-13': CheckCircle2, // Publishing and Versioning Custom Actions to Marketplace

  // Chapter 34: Enterprise Production CI/CD
  'c-34-01': Building, // Enterprise CI/CD Governance: Centralized vs Autonomous
  'c-34-02': FolderTree, // Monorepo CI: Path-Filtering (paths / paths-ignore)
  'c-34-03': Layers, // Turborepo, Nx, and Bazel Integration with GitHub Actions
  'c-34-04': Server, // Scaling Self-Hosted Runner Fleets with Kubernetes (ARC)
  'c-34-05': ShieldAlert, // Ephemeral Runners: Preventing Lateral Attack Movements
  'c-34-06': Gauge, // CI Cost Optimization: Reducing Runner Minutes and Bandwidth
  'c-34-07': BarChart2, // Analytics and Metrics: Tracking Pipeline Health at Scale
  'c-34-08': Lock, // Organization-Level Workflow Templates and Starter Workflows
  'c-34-09': ShieldCheck, // Required Workflows: Enforcing Global Security Checks
  'c-34-10': ScrollText, // Audit Logs, Compliance Reporting, and Retention
  'c-34-11': Sliders, // Disaster Recovery for CI/CD Infrastructure
  'c-34-12': CheckCircle2, // Enterprise CI/CD Maturity Model and Roadmap

  // Chapter 35: Real-World Capstone Projects
  'c-35-01': Rocket, // Capstone 1: Next.js Fullstack Monorepo CI/CD
  'c-35-02': Cpu, // Capstone 2: Python / FastAPI Microservice with Docker
  'c-35-03': Server, // Capstone 3: Go CLI Binary Multi-Arch Cross-Compilation
  'c-35-04': Layers, // Capstone 4: Kubernetes Helm GitOps Delivery Pipeline
  'c-35-05': Package, // Capstone 5: Open-Source TypeScript Library with SemVer
  'c-35-06': ShieldAlert, // Capstone 6: Enterprise DevSecOps Hardened Pipeline
  'c-35-07': ArrowLeftRight, // Capstone 7: Zero-Downtime Blue-Green Deployment
  'c-35-08': PieChart, // Capstone 8: Automated Canary Traffic Shifting with Metrics
  'c-35-09': Globe, // Capstone 9: Multi-Region Cloud Infrastructure with Terraform
  'c-35-10': LayoutGrid, // Capstone 10: Serverless Microservices Deployment
  'c-35-11': Bot, // Capstone 11: Production ChatOps & Incident Bot
  'c-35-12': Trophy, // Capstone 12: Autonomous Self-Healing Enterprise Pipeline
};

function getSemanticIconForConcept(concept: ConceptIconInput): LucideIcon {
  const id = (concept.id || '').toLowerCase();
  if (EXACT_GIT_CONCEPT_ICONS[id]) {
    return EXACT_GIT_CONCEPT_ICONS[id];
  }

  const cmd = (concept.command || '').trim().toLowerCase();
  const title = (concept.title || '').toLowerCase();
  const sub = (concept.subtitle || '').toLowerCase();
  const allText = `${cmd} ${title} ${sub}`;

  // 1. CI/CD & GitHub Actions Specific
  if (allText.includes('action') || allText.includes('workflow')) {
    if (allText.includes('secret')) return Lock;
    if (allText.includes('matrix')) return Grid;
    if (allText.includes('cache')) return Zap;
    if (allText.includes('artifact')) return Package;
    if (allText.includes('runner')) return Server;
    if (allText.includes('cron') || allText.includes('schedule')) return Calendar;
    if (allText.includes('reusable')) return Repeat;
    return Workflow;
  }

  // 2. Docker & Containers
  if (allText.includes('docker') || allText.includes('container') || allText.includes('image')) {
    if (allText.includes('build')) return Cpu;
    if (allText.includes('registry') || allText.includes('ghcr') || allText.includes('hub')) return CloudUpload;
    if (allText.includes('compose')) return LayoutGrid;
    if (allText.includes('security') || allText.includes('scan')) return ShieldAlert;
    return Boxes;
  }

  // 3. Security & Quality Gates
  if (allText.includes('security') || allText.includes('sast') || allText.includes('cve') || allText.includes('vulnerability')) return ShieldAlert;
  if (allText.includes('sign') || allText.includes('gpg') || allText.includes('cosign') || allText.includes('provenance')) return ShieldCheck;
  if (allText.includes('secret') || allText.includes('credential') || allText.includes('token') || allText.includes('ssh')) return KeyRound;
  if (allText.includes('lint') || allText.includes('prettier') || allText.includes('eslint') || allText.includes('format')) return Sparkles;
  if (allText.includes('test') || allText.includes('jest') || allText.includes('pytest') || allText.includes('coverage')) return TestTube;

  // 4. Deployment & Releases
  if (allText.includes('deploy') || allText.includes('production') || allText.includes('canary') || allText.includes('blue-green')) return Rocket;
  if (allText.includes('release') || allText.includes('semver') || allText.includes('changelog') || allText.includes('tag')) return Milestone;

  // 5. Git Commands
  if (cmd.includes('commit') || allText.includes('commit')) {
    if (allText.includes('amend')) return Edit3;
    if (allText.includes('empty')) return SquareDot;
    if (allText.includes('message') || allText.includes('conventional')) return MessageSquare;
    return GitCommit;
  }

  if (cmd.includes('branch') || allText.includes('branch')) {
    if (allText.includes('delete') || allText.includes('prune')) return Trash2;
    if (allText.includes('rename')) return Edit2;
    if (allText.includes('upstream') || allText.includes('tracking')) return Share2;
    return GitBranch;
  }

  if (cmd.includes('switch') || cmd.includes('checkout') || allText.includes('switch') || allText.includes('checkout')) {
    if (allText.includes('detached')) return Anchor;
    return ArrowLeftRight;
  }

  if (cmd.includes('merge') || allText.includes('merge')) {
    if (allText.includes('conflict')) return AlertCircle;
    if (allText.includes('squash')) return Minimize2;
    if (allText.includes('fast-forward')) return FastForward;
    return GitMerge;
  }

  if (cmd.includes('rebase') || allText.includes('rebase')) {
    if (allText.includes('interactive') || allText.includes('-i')) return Sliders;
    if (allText.includes('onto')) return Target;
    if (allText.includes('conflict')) return AlertOctagon;
    return Workflow;
  }

  if (cmd.includes('push') || allText.includes('push')) {
    if (allText.includes('force')) return AlertTriangle;
    if (allText.includes('upstream')) return Anchor;
    return Upload;
  }

  if (cmd.includes('pull') || allText.includes('pull')) {
    if (allText.includes('rebase')) return Workflow;
    return ArrowDownCircle;
  }

  if (cmd.includes('fetch') || allText.includes('fetch')) return Download;
  if (cmd.includes('clone') || allText.includes('clone')) return FolderDown;
  if (cmd.includes('init') || allText.includes('init')) return Sparkles;
  if (cmd.includes('status') || allText.includes('status')) return Eye;
  if (cmd.includes('diff') || allText.includes('diff')) return GitCompare;
  if (cmd.includes('add') || allText.includes('staging')) {
    if (allText.includes('patch')) return Scissors;
    return PlusCircle;
  }
  if (cmd.includes('reset') || allText.includes('reset')) return Undo2;
  if (cmd.includes('restore') || allText.includes('restore')) return RotateCcw;
  if (cmd.includes('revert') || allText.includes('revert')) return History;
  if (cmd.includes('stash') || allText.includes('stash')) return Archive;
  if (cmd.includes('cherry-pick') || allText.includes('cherry-pick')) return Crosshair;
  if (cmd.includes('worktree') || allText.includes('worktree')) return Layers;
  if (cmd.includes('submodule') || allText.includes('submodule')) return FolderTree;
  if (cmd.includes('remote') || allText.includes('remote')) return Server;
  if (cmd.includes('blame') || allText.includes('blame')) return UserCheck;
  if (cmd.includes('bisect') || allText.includes('bisect')) return Crosshair;
  if (cmd.includes('log') || cmd.includes('reflog') || allText.includes('log') || allText.includes('history')) return Clock;
  if (allText.includes('internal') || allText.includes('object') || allText.includes('cat-file') || allText.includes('blob')) return Database;

  // 6. Generic Fallbacks based on keywords
  if (allText.includes('config') || allText.includes('setting')) return Settings;
  if (allText.includes('user') || allText.includes('author') || allText.includes('team')) return Users;
  if (allText.includes('file') || allText.includes('ignore')) return FileText;
  if (allText.includes('clean') || allText.includes('garbage')) return Sparkles;
  if (allText.includes('error') || allText.includes('triage') || allText.includes('emergency')) return LifeBuoy;
  if (allText.includes('pr') || allText.includes('pull request') || allText.includes('review')) return GitPullRequest;
  if (allText.includes('issue') || allText.includes('ticket')) return CircleDot;
  if (allText.includes('capstone') || allText.includes('project')) return Rocket;

  return Terminal;
}

/**
 * Returns the exact LucideIcon component for any Git Academy concept
 */
export function getGitConceptIconComponent(concept: ConceptIconInput): LucideIcon {
  return getSemanticIconForConcept(concept);
}

/**
 * Renders the matching Lucide icon element for a Git Academy concept
 */
export function getGitConceptIcon(
  concept: ConceptIconInput,
  size = 14,
  color?: string
): React.ReactElement {
  const IconComp = getGitConceptIconComponent(concept);
  return React.createElement(IconComp, { size, ...(color ? { color } : {}) });
}
