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
  | 'Intermediate'
  | 'Advanced'
  | 'Production'
  | 'Expert';

export interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  iconName?: string;
  description: string;
  technologies: string[];
  status?: 'active' | 'degraded' | 'healthy' | 'standby';
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface CapstoneArchitecture {
  summary: string;
  nodes: ArchitectureNode[];
  edges?: ArchitectureEdge[];
  flowDescription: string;
}

export interface CapstoneTask {
  id: string;
  title: string;
  objective: string;
  commandSnippet: string;
  expectedOutput: string;
  verificationCriteria: string;
  hints: string[];
  explanation: string;
}

export interface FailureScenario {
  id: string;
  title: string;
  symptom: string;
  rootCause: string;
  diagnosticCommand: string;
  fixCommand: string;
  verification: string;
  preventativeMeasures: string;
}

export interface ValidationCheck {
  id: string;
  label: string;
  verificationCommand: string;
  points: number;
}

export interface CapstoneProject {
  id: string;
  code: string; // e.g. "GIT-01", "LINUX-03", "K8S-04", "ULTIMATE-01"
  title: string;
  academy: CapstoneAcademy;
  difficulty: CapstoneDifficulty;
  estimatedTime: string;
  overview: string;
  objectives: string[];
  requirements: string[];
  startingState: {
    description: string;
    environment: string;
    startingFiles?: Record<string, string>;
  };
  architecture: CapstoneArchitecture;
  tasks: CapstoneTask[];
  failureScenarios: FailureScenario[];
  validationChecks: ValidationCheck[];
  expectedOutcome: string;
  scoreMax: number;
  tags: string[];
}

export interface CapstoneProgress {
  projectId: string;
  completed: boolean;
  score: number;
  completedTasks: string[];
  resolvedFailures: string[];
  lastVisitedTimestamp: number;
}
