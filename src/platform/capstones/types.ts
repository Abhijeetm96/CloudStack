export type CapstoneAcademy =
  | 'git'
  | 'linux'
  | 'docker'
  | 'devops'
  | 'terraform'
  | 'kubernetes'
  | 'cross-academy';

export type CapstoneDifficulty =
  | 'Beginner'
  | 'Beginner+'
  | 'Lower Intermediate'
  | 'Intermediate'
  | 'Intermediate+'
  | 'Advanced'
  | 'Advanced+'
  | 'Expert'
  | 'Expert / Production'
  | 'Production'
  | 'Production Grade';

export type CapstoneBriefStatus = 'not_started' | 'in_progress' | 'completed';

export interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  iconName?: string;
  description?: string;
  technologies?: string[];
  status?: 'active' | 'degraded' | 'healthy' | 'standby';
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface CapstoneProjectOverview {
  projectName: string;
  academy: CapstoneAcademy;
  difficulty: CapstoneDifficulty;
  estimatedEffort: string;
  technologies: string[];
  shortDescription: string;
}

export interface CapstoneWhatYouNeedToBuild {
  description: string;
  diagram?: string;
}

export interface CapstoneRequirements {
  functional: string[];
  technical: string[];
  security: string[];
  operational?: string[];
}

export interface CapstoneArchitecture {
  summary: string;
  diagram: string; // ASCII or visual architecture diagram
  nodes?: ArchitectureNode[];
  edges?: ArchitectureEdge[];
  flowDescription?: string;
  components?: Array<{
    name: string;
    role: string;
    technologies: string[];
    description?: string;
  }>;
}

export interface CapstoneTechnologyRequirements {
  required: string[];
  optional: string[];
  outOfScope: string[];
}

export interface CapstoneConceptLink {
  name: string;
  lessonId?: string;
  lessonTitle?: string;
  academyRoute?: string;
}

export interface CapstoneResourceItem {
  title: string;
  url?: string;
  route?: string;
  description?: string;
}

export interface CapstoneResources {
  academyLessons: CapstoneResourceItem[];
  officialDocs: CapstoneResourceItem[];
  referenceMaterial: string[];
  usefulCommands: string[];
}

export interface CapstoneOptionalEnhancements {
  beginner: string[];
  intermediate: string[];
  advanced: string[];
  expert: string[];
}

// Backward-compatibility interfaces for legacy types
export interface CapstoneTask {
  id: string;
  title: string;
  objective: string;
  commandSnippet?: string;
  expectedOutput?: string;
  verificationCriteria?: string;
  hints?: string[];
  explanation?: string;
}

export interface FailureScenario {
  id: string;
  title: string;
  symptom: string;
  rootCause: string;
  diagnosticCommand?: string;
  fixCommand?: string;
  verification?: string;
  preventativeMeasures?: string;
}

export interface ValidationCheck {
  id: string;
  label: string;
  verificationCommand?: string;
  points?: number;
}

export interface CapstoneProject {
  id: string;
  code: string; // e.g. "GIT-01", "DOCKER-05", "K8S-10"
  title: string;
  academy: CapstoneAcademy;
  difficulty: CapstoneDifficulty;
  estimatedTime: string;
  technologies: string[];
  overview: string;
  tags: string[];

  // ==========================================
  // THE 22 STANDARD ENGINEERING BRIEF SECTIONS
  // ==========================================
  // 01. Project Overview
  projectOverview: CapstoneProjectOverview;

  // 02. Real-World Scenario
  scenario: string;

  // 03. Problem Statement
  problemStatement: string;

  // 04. Project Objective
  projectObjective: string[];

  // 05. What You Need To Build
  whatYouNeedToBuild: CapstoneWhatYouNeedToBuild;

  // 06. Requirements
  requirements: CapstoneRequirements;

  // 07. Architecture
  architecture: CapstoneArchitecture;

  // 08. Technology Requirements
  technologyRequirements: CapstoneTechnologyRequirements;

  // 09. Functional Requirements
  functionalRequirements: string[];

  // 10. Technical Requirements
  technicalRequirements: string[];

  // 11. Security Requirements
  securityRequirements: string[];

  // 12. Constraints
  constraints: string[];

  // 13. Expected Outcome
  expectedOutcome: string;

  // 14. Deliverables
  deliverables: string[];

  // 15. Suggested Project Structure
  suggestedProjectStructure: string;

  // 16. Required Concepts (linked to Academy lessons)
  requiredConcepts: CapstoneConceptLink[];

  // 17. Resources
  resources: CapstoneResources;

  // 18. Recommended Approach (high-level only)
  recommendedApproach: string[];

  // 19. Important Considerations
  importantConsiderations: string[];

  // 20. Common Pitfalls
  commonPitfalls: string[];

  // 21. Optional Enhancements (Beginner, Intermediate, Advanced, Expert)
  optionalEnhancements: CapstoneOptionalEnhancements;

  // 22. Completion Checklist (manual learner self-check)
  completionChecklist: string[];

  // ==========================================
  // Optional legacy fields for backward compatibility
  // ==========================================
  objectives?: string[];
  startingState?: {
    description: string;
    environment: string;
    startingFiles?: Record<string, string>;
  };
  tasks?: CapstoneTask[];
  failureScenarios?: FailureScenario[];
  validationChecks?: ValidationCheck[];
  scoreMax?: number;
}

export interface CapstoneBriefProgress {
  projectId: string;
  status: CapstoneBriefStatus;
  checkedChecklistIndices: number[];
  startedAt?: number;
  completedAt?: number;
  lastVisitedTimestamp: number;
}

// Legacy Progress interface for backward compatibility
export interface CapstoneProgress {
  projectId: string;
  completed: boolean;
  score?: number;
  completedTasks?: string[];
  resolvedFailures?: string[];
  lastVisitedTimestamp: number;
}
