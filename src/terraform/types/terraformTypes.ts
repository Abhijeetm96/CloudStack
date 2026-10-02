export type TerraformDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface TerraformSyntaxToken {
  token: string;
  role: 'block-type' | 'block-label' | 'argument' | 'expression' | 'identifier' | 'string' | 'operator' | 'punctuation' | 'comment' | 'flag';
  explanation: string;
}

export interface TerraformSyntaxVariation {
  title: string;
  code: string;
  explanation: string;
  whenToUse: string;
}

export interface TerraformTermItem {
  term: string;
  explanation: string;
  role?: string;
}

export interface TerraformMistakeItem {
  mistake: string;
  whyWrong: string;
  fix: string;
  prevention: string;
}

export interface TerraformMisconceptionItem {
  misconception: string;
  reality: string;
}

export interface TerraformComparisonItem {
  concept: string;
  difference: string;
  advice: string;
}

export interface TerraformTroubleshootingItem {
  symptom: string;
  cause: string;
  resolution: string;
}

export interface TerraformOutputLineExplanation {
  line: string;
  meaning: string;
}

export interface TerraformKnowledgeCheckQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TerraformCommandFlag {
  flag: string;
  argument?: string;
  description: string;
  isSafe: boolean;
}

export interface TerraformCommandDetails {
  commandSyntax: string;
  flags: TerraformCommandFlag[];
  inputOutput: string;
  safeExample: string;
  dangerousExample: string;
  lineByLineOutput: TerraformOutputLineExplanation[];
}

export interface TerraformConfigArgument {
  argument: string;
  type: string;
  required: boolean;
  description: string;
}

export interface TerraformConfigurationDetails {
  completeConfiguration: string;
  minimalConfiguration: string;
  productionConfiguration: string;
  argumentsExplained: TerraformConfigArgument[];
  dependencies: string[];
  stateImpact: string;
  planImpact: string;
  applyImpact: string;
  destroyImpact: string;
}

export interface UniversalTerraformLesson {
  id: string;
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  subchapterNumber: string;
  subchapterIndex: number;
  title: string;
  commandOrConcept: string;
  difficulty: TerraformDifficulty;
  category: string;

  // The 40 Standard Pedagogical Fields
  whatIsIt: string;                          // 1
  beginnerDefinition: string;                // 2
  simpleExplanation: string;                 // 3
  whyExists: string;                         // 4
  problemSolved: string;                     // 5
  whyTerraformNeedsIt: string;               // 6
  realWorldAnalogy: string;                  // 7
  mentalModel: {                             // 8
    metaphor: string;
    diagramText: string;
    keyInsight: string;
  };
  technicalDefinition: string;               // 9
  terminology: TerraformTermItem[];          // 10
  terminologyExplanations: string;           // 11
  syntax: string;                            // 12
  syntaxBreakdown: TerraformSyntaxToken[];   // 13
  syntaxVariations: TerraformSyntaxVariation[]; // 14
  minimalExample: {                          // 15
    code: string;
    explanation: string;
  };
  realWorldExample: {                        // 16
    code: string;
    explanation: string;
    useCase: string;
  };
  productionExample: {                       // 17
    code: string;
    explanation: string;
    architectureContext: string;
  };
  whenToUse: string[];                       // 18
  whenNotToUse: string[];                    // 19
  commonMistakes: TerraformMistakeItem[];    // 20
  commonMisconceptions: TerraformMisconceptionItem[]; // 21
  securityConsiderations: string[];          // 22
  operationalConsiderations: string[];       // 23
  costConsiderations: string[];              // 24
  whatChanges: string[];                     // 25
  whatDoesNotChange: string[];               // 26
  expectedOutput: {                          // 27
    terminalText: string;
    format?: string;
  };
  outputExplanation: TerraformOutputLineExplanation[]; // 28
  relatedConcepts: string[];                 // 29
  relatedCommands: string[];                 // 30
  comparisonWithSimilar: TerraformComparisonItem[]; // 31
  troubleshooting: TerraformTroubleshootingItem[]; // 32
  recoveryProcedure: {                       // 33
    steps: string[];
    warning?: string;
  };
  bestPractices: string[];                   // 34
  antiPatterns: Array<{                      // 35
    badPractice: string;
    impact: string;
    alternative: string;
  }>;
  guidedHandsOnExercise: {                   // 36
    task: string;
    initialCode: string;
    expectedCode: string;
    instructions: string[];
    solutionExplanation: string;
  };
  interactiveSimulatorOpportunity: {         // 37
    mode: 'plan' | 'state' | 'graph' | 'terminal' | 'drift' | 'failure';
    scenario: string;
    actionPrompt: string;
  };
  independentChallenge: {                    // 38
    scenario: string;
    objective: string;
    constraints: string[];
    verificationCriteria: string[];
  };
  knowledgeCheck: TerraformKnowledgeCheckQuestion[]; // 39
  summary: {                                 // 40
    takeaways: string[];
    keyFormula: string;
  };

  // Additional detail fields
  commandDetails?: TerraformCommandDetails;
  configurationDetails?: TerraformConfigurationDetails;
}

export interface TerraformChapterMeta {
  id: string;
  number: number;
  title: string;
  description: string;
  trackGroup: string;
  subchapterCount: number;
}

export interface TerraformChapter extends TerraformChapterMeta {
  subchapters: UniversalTerraformLesson[];
}

export interface TerraformProgressState {
  completedLessons: string[];
  completedExercises: string[];
  challengeScores: Record<string, number>;
  simulatorInteractions: number;
  lastVisitedLessonId: string | null;
  quizScores: Record<string, number>;
}
