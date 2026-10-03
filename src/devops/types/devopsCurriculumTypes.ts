export type DevOpsLevelId =
  | 'level-01-foundation'
  | 'level-02-ci'
  | 'level-03-containers'
  | 'level-04-cloud-orchestration'
  | 'level-05-devsecops'
  | 'level-06-observability-sre'
  | 'level-07-platform-engineering'
  | 'level-08-advanced-devops'
  | 'level-09-enterprise-devops'
  | 'level-10-production-devops';

export type DevOpsDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Production';

export interface DevOpsTerminology {
  term: string;
  definition: string;
}

export interface DevOpsSyntaxConfig {
  language: string;
  code: string;
  explanation: string;
  filename?: string;
}

export interface DevOpsVariation {
  name: string;
  description: string;
}

export interface DevOpsMistake {
  mistake: string;
  fix: string;
}

export interface DevOpsRelatedConcept {
  name: string;
  academy?: 'git' | 'linux' | 'docker' | 'kubernetes' | 'terraform' | 'devops';
  route?: string;
  linkText?: string;
  relationship: string;
}

export interface DevOpsHandsOnScenario {
  title: string;
  scenario: string;
  goal: string;
  steps: string[];
}

export interface DevOpsPracticalChallenge {
  task: string;
  hint: string;
  solution: string;
}

export interface DevOpsLesson {
  id: string; // e.g. 'devops-01-01'
  chapterNumber: number; // 1 to 50
  subchapterCode: string; // '1.1', '1.2', etc.
  title: string;
  level: DevOpsLevelId;
  difficulty: DevOpsDifficulty;
  estimatedMinutes: number;

  // 20 Pedagogical Dimensions
  whatIsIt: string;
  simpleExplanation: string;
  whyNeeded: string;
  whereUsed: string;
  whenToUse: string[];
  whenNotToUse: string[];
  howItWorks: string;
  terminology: DevOpsTerminology[];
  syntaxOrConfig?: DevOpsSyntaxConfig;
  variations: DevOpsVariation[];
  realWorldExamples: string[];
  architectureDiagram?: string;
  commonMistakes: DevOpsMistake[];
  securityConsiderations: string[];
  productionConsiderations: string[];
  relatedConcepts: DevOpsRelatedConcept[];
  prerequisites: string[];
  handsOnScenario: DevOpsHandsOnScenario;
  practicalChallenge: DevOpsPracticalChallenge;
  keyTakeaways: string[];

  // Simulator link if this concept has a simulator
  simulatorId?: string;
}

export interface DevOpsSubchapter {
  id: string;
  code: string; // '1.1'
  title: string;
  lesson: DevOpsLesson;
}

export interface DevOpsChapter {
  id: string; // 'ch01-devops-fundamentals'
  number: number; // 1 to 50
  title: string;
  levelId: DevOpsLevelId;
  levelName: string;
  levelNumber: number; // 1 to 10
  summary: string;
  targetTechnologies: string[];
  subchapters: DevOpsSubchapter[];
  simulatorId?: string;
  capstoneId?: string;
}

export interface DevOpsLevel {
  id: DevOpsLevelId;
  levelNumber: number;
  name: string;
  subtitle: string;
  chapterRange: string; // 'Chapters 1-6'
  chapterNumbers: number[];
  color: string;
  iconName: string;
}

export interface DevOpsProgressState {
  completedLessonIds: string[];
  activeLessonId: string;
  activeChapterNumber: number;
  lastVisitedTimestamp: number;
}
