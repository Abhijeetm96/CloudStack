export type ConceptDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface SyntaxToken {
  token: string;
  role: string;
  explanation: string;
}

export interface ConceptVariation {
  syntax: string;
  title: string;
  whatItDoes: string;
  whenToUse: string;
  example?: string;
}

export interface ConceptTerm {
  term: string;
  simple: string;
  technical: string;
  analogy?: string;
  related?: string[];
}

export interface InternalStep {
  step: number;
  title: string;
  desc: string;
  why: string;
  techDetail: string;
}

export interface CommonMistake {
  mistake: string;
  whyWrong?: string;
  correctWay?: string;
  safeRecovery?: string;
  whyItHappens?: string;
  howToFix?: string;
}

export interface BlockDiagramNode {
  id: string;
  label: string;
  simpleDef: string;
  techDef: string;
  badge?: string;
  color?: string;
}

export interface BlockDiagramData {
  title: string;
  subtitle: string;
  nodes: BlockDiagramNode[];
}

export interface WithoutVsWithData {
  without: {
    title: string;
    items: string[];
    outcome: string;
  };
  with: {
    title: string;
    items: string[];
    outcome: string;
  };
}

export interface BeforeAfterState {
  before: string;
  after: string;
  explanation: string;
}

export interface UniversalLinuxConcept {
  id: string;
  command: string;
  title: string;
  subChapterNumber?: string;
  topicId: string;
  topicNumber: string;
  topicTitle: string;
  subtitle: string;
  badges: string[];
  quote: string;
  difficulty: ConceptDifficulty;

  // Level 1: Understand & Mental Model
  whatIsIt: string;
  inSimpleWords: string;
  whyDoYouNeedIt: string;
  realWorldScenario?: string;
  realWorldAnalogy: string;
  mentalModel?: string;

  // Extended Teaching Sequence Fields
  withoutVsWith: WithoutVsWithData;
  blockDiagram: BlockDiagramData;
  terms: ConceptTerm[];
  whenToUse: string[];
  whenNotToUse: string[];

  // System State Transitions
  whatChanges?: string[];
  whatDoesNotChange?: string[];
  beforeAfter?: BeforeAfterState;
  expectedOutput?: string;
  summary?: string;

  // Level 2: Syntax & Token Breakdown
  syntaxCode: string;
  syntaxTokens: SyntaxToken[];

  // Level 3: Variations & Internal Execution Flow
  variations: ConceptVariation[];
  internalFlow: InternalStep[];

  // Level 4: Practice & Sandbox
  sandbox: {
    initialCommands: string[];
    guidedSteps: {
      instruction: string;
      command: string;
      hint: string;
    }[];
    targetTask: string;
    solutionCommands: string[];
  };

  // Level 5: Mistakes, Recovery & Quiz
  commonMistakes: CommonMistake[];
  safeRecovery?: string;
  challenge: {
    question: string;
    options: { label: string; isCorrect: boolean; explanation: string }[];
  };

  // Level 6: Reference & Man Pages
  reference: {
    officialDocUrl?: string;
    syntaxCheatSheet?: string[];
    commonErrors?: { error: string; remedy: string }[];
    options?: { flag: string; description: string }[];
    bestPractices?: string[];
  };
}

export interface LinuxTopic {
  id: string;
  number: string;
  title: string;
  iconName: string;
  description: string;
  concepts: UniversalLinuxConcept[];
}
