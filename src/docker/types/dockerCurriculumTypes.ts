/**
 * DOCKER ACADEMY EXHAUSTIVE TYPES SPECIFICATION
 * 68 Chapters · All Subchapters · 35 Pedagogical Items
 */

export type DockerDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface TerminologyItem {
  term: string;
  explanation: string;
}

export interface SyntaxToken {
  token: string;
  purpose: string;
}

export interface TroubleshootingItem {
  problem: string;
  symptom: string;
  cause: string;
  fix: string;
}

export interface OutputLineExplanation {
  line: string;
  meaning: string;
}

export interface GuidedExercise {
  title: string;
  objective: string;
  steps: string[];
  initialSnippet: string;
  solution: string;
}

export interface IndependentChallenge {
  scenario: string;
  goal: string;
  testVerification: string;
  hint: string;
}

export interface KnowledgeCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FlagExplanation {
  flag: string;
  description: string;
  defaultValue?: string;
}

export interface ErrorScenario {
  error: string;
  remedy: string;
}

export interface DockerSubchapterLesson {
  id: string; // e.g. 'dk-01-01'
  chapterNumber: number; // 1 to 68
  chapterTitle: string;
  subchapterNumber: string; // '01', '02', etc.
  subchapterTitle: string;
  category: string;
  trackGroup: string;
  difficulty: DockerDifficulty;

  // 35 Mandatory Pedagogical Requirements
  definition: string;
  beginnerExplanation: string;
  technicalExplanation: string;
  whyItExists: string;
  problemSolved: string;
  dockerRelevance: string;
  analogy: string;
  mentalModel: string;
  terminology: TerminologyItem[];
  syntax: string;
  syntaxBreakdown: SyntaxToken[];
  variations: string[];
  simplestExample: string;
  practicalExample: string;
  realWorldExample: string;
  productionExample: string;
  whenToUse: string[];
  whenNotToUse: string[];
  commonMistakes: string[];
  commonMisconceptions: string[];
  securityConsiderations: string[];
  performanceConsiderations: string[];
  operationalConsiderations: string[];
  troubleshooting: TroubleshootingItem[];
  bestPractices: string[];
  antiPatterns: string[];
  relatedConcepts: string[];
  relatedCommands: string[];
  expectedOutput: string;
  outputExplanation: OutputLineExplanation[];
  guidedExercise: GuidedExercise;
  challenge: IndependentChallenge;
  knowledgeCheck: KnowledgeCheck;
  summary: string;

  // CLI / Command Specific Extensions
  commandSyntax?: string;
  flagsExplained?: FlagExplanation[];
  argumentsExplained?: Array<{ arg: string; purpose: string }>;
  whatActuallyHappens?: string;
  whatChangesOnDisk?: string;
  whatChangesInDocker?: string;
  internalMechanics?: string;
  safeExample?: string;
  dangerousExample?: string;
  errorScenarios?: ErrorScenario[];

  // Simulator link hint
  recommendedSimulator?: 'container' | 'image' | 'network' | 'volume' | 'compose' | 'security' | 'build' | 'debug' | 'terminal';
}

export interface DockerChapter {
  number: number;
  id: string; // 'ch-01' to 'ch-68'
  title: string;
  trackGroup: string;
  description: string;
  lessons: DockerSubchapterLesson[];
}

export interface DockerProgressRecord {
  completedLessons: string[]; // array of lesson IDs
  completedExercises: string[];
  completedChallenges: string[];
  quizScores: Record<string, boolean>;
  simulatorRuns: number;
  lastVisitedLessonId?: string;
  notes?: Record<string, string>;
}
