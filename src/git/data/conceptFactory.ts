import {
  UniversalConcept,
  ConceptDifficulty,
  SyntaxToken,
  ConceptVariation,
  ScenarioQuestion,
  CommandComparisonItem,
  ActionStageState,
  ConceptPracticeChallenge,
  ConceptReference,
} from './unifiedAcademyData';

export interface GitConceptInput {
  id: string;
  subChapterNumber: string; // e.g. "01.1", "23.4"
  command: string;
  title: string;
  topicId: string; // e.g. "ch-01", "ch-23"
  topicNumber: string; // e.g. "01", "23"
  topicTitle: string;
  subtitle?: string;
  shortDesc?: string;
  badges?: string[];
  difficulty?: ConceptDifficulty;
  quote?: string;

  // Level 1: Understand
  whatIsIt?: string;
  inSimpleWords?: string;
  whyDoYouNeedIt?: string;
  realWorldAnalogy?: string;
  realWorldScenario?: string;
  terms?: { term: string; simple: string; technical: string }[];

  // Level 2: Syntax
  syntaxCode?: string;
  syntaxTokens?: SyntaxToken[];

  // Level 3: Action & Visual
  actionStage?: {
    before?: Partial<ActionStageState>;
    running?: Partial<ActionStageState>;
    after?: Partial<ActionStageState>;
  };

  // Level 4: Explore
  variations?: ConceptVariation[];
  scenarios?: ScenarioQuestion[];
  commandComparisons?: CommandComparisonItem[];
  commonMistakes?: { mistake: string; whyItHappens: string; fix: string }[];
  whenToUse?: string[];
  whenNotToUse?: string[];
  expectedOutput?: string;
  safeRecovery?: { failureScenario: string; quickFix: string; rootCauseAnalysis?: string } | string;

  // Level 5: Practice & Challenge
  sandbox?: {
    initialCommands?: string[];
    guidedSteps?: { instruction: string; command: string; hint: string }[];
    targetTask?: string;
    hints?: string[];
    solutionCommands?: string[];
  };
  challenge?: Partial<ConceptPracticeChallenge>;

  // Level 6: Reference
  reference?: Partial<ConceptReference>;
  summary?: string;

  // CI/CD Specific Enhancements
  isCiCd?: boolean;
  pipelineStage?: 'commit' | 'build' | 'test' | 'scan' | 'package' | 'staging' | 'deploy' | 'production' | 'rollback';
  yamlConfig?: string;
}

export function parseGitOrYamlTokens(code: string, isCiCd?: boolean): SyntaxToken[] {
  if (isCiCd || code.includes(':') || code.includes('runs-on') || code.includes('uses:')) {
    // YAML token parsing
    const lines = code.split('\n').filter(Boolean);
    const tokens: SyntaxToken[] = [];
    for (const line of lines.slice(0, 5)) {
      const match = line.trim().match(/^([a-zA-Z0-9_-]+):(.*)$/);
      if (match) {
        const key = match[1];
        const val = match[2].trim();
        tokens.push({
          token: key,
          role: 'YAML Directive',
          explanation: `Workflow key configuring ${key}${val ? ` (value: ${val})` : ''}`,
        });
      }
    }
    if (tokens.length > 0) return tokens;
  }

  // CLI token parsing
  const parts = code.split(/\s+/).filter(Boolean);
  if (!parts.length) {
    return [{ token: 'git', role: 'command', explanation: 'Core version control binary' }];
  }

  return parts.map((part, idx) => {
    if (idx === 0 && part === 'git') {
      return { token: 'git', role: 'Binary', explanation: 'Invokes the Git distributed version control system' };
    }
    if (idx === 1 && !part.startsWith('-')) {
      return { token: part, role: 'Subcommand', explanation: `Directs Git to execute the ${part} operation` };
    }
    if (part.startsWith('--')) {
      return { token: part, role: 'Long Flag', explanation: `Explicit option altering subcommand behavior (${part})` };
    }
    if (part.startsWith('-')) {
      return { token: part, role: 'Short Flag', explanation: `Concise modifier flag (${part})` };
    }
    if (part === '&&' || part === '|' || part === '>') {
      return { token: part, role: 'Shell Operator', explanation: `Chains or redirects command streams` };
    }
    return { token: part, role: 'Argument / Target', explanation: `Target branch, file path, remote or message value (${part})` };
  });
}

export function buildGitConcept(input: GitConceptInput): UniversalConcept & {
  subChapterNumber: string;
  realWorldScenario?: string;
  terms?: { term: string; simple: string; technical: string }[];
  whenToUse?: string[];
  whenNotToUse?: string[];
  expectedOutput?: string;
  safeRecovery?: { failureScenario: string; quickFix: string; rootCauseAnalysis?: string } | string;
  summary?: string;
  isCiCd?: boolean;
  pipelineStage?: string;
  yamlConfig?: string;
} {
  const isCiCd = input.isCiCd || parseInt(input.topicNumber, 10) >= 21;
  const syntaxCode = input.syntaxCode || (isCiCd ? `${input.command}` : input.command.startsWith('git') || input.command.startsWith('#') ? input.command : `git ${input.command}`);
  const syntaxTokens = input.syntaxTokens || parseGitOrYamlTokens(syntaxCode, isCiCd);

  const defaultBadges = input.badges || [
    input.difficulty || 'Beginner',
    isCiCd ? 'CI/CD' : 'Git Core',
    `§ ${input.subChapterNumber}`,
  ];

  const beforeState: ActionStageState = {
    label: input.actionStage?.before?.label || 'Pre-Execution State',
    description: input.actionStage?.before?.description || `Ready to execute \`${syntaxCode}\`. Repository is clean or has pending changes.`,
    workingDirectory: input.actionStage?.before?.workingDirectory || [{ name: isCiCd ? 'ci.yml' : 'main.js', status: 'modified' }],
    stagingArea: input.actionStage?.before?.stagingArea || [],
    commandPill: syntaxCode,
    historyCommits: input.actionStage?.before?.historyCommits || [{ hash: 'a1b2c3d', message: 'feat: previous stable commit' }],
    whatChanged: input.actionStage?.before?.whatChanged || ['Nothing has changed yet.'],
    whatDidNotChange: input.actionStage?.before?.whatDidNotChange || ['All files and repository pointers remain unchanged.'],
  };

  const runningState: ActionStageState = {
    label: input.actionStage?.running?.label || 'Execution State',
    description: input.actionStage?.running?.description || `Running \`${syntaxCode}\`... Processing object database and updating references.`,
    workingDirectory: input.actionStage?.running?.workingDirectory || beforeState.workingDirectory,
    stagingArea: input.actionStage?.running?.stagingArea || beforeState.stagingArea,
    commandPill: syntaxCode,
    historyCommits: input.actionStage?.running?.historyCommits || beforeState.historyCommits,
    whatChanged: input.actionStage?.running?.whatChanged || ['Command parsed by engine.'],
    whatDidNotChange: input.actionStage?.running?.whatDidNotChange || ['Remote mirrors not yet updated.'],
  };

  const afterState: ActionStageState = {
    label: input.actionStage?.after?.label || 'Post-Execution State',
    description: input.actionStage?.after?.description || `Successfully applied \`${syntaxCode}\`. State transitioned cleanly.`,
    workingDirectory: input.actionStage?.after?.workingDirectory || [],
    stagingArea: input.actionStage?.after?.stagingArea || [],
    commandPill: syntaxCode,
    historyCommits: input.actionStage?.after?.historyCommits || [
      { hash: 'e5f6g7h', message: `Update: ${input.title}`, isNew: true },
      { hash: 'a1b2c3d', message: 'feat: previous stable commit' },
    ],
    whatChanged: input.actionStage?.after?.whatChanged || [
      `State updated according to ${input.title}.`,
      'Internal pointer or index updated.',
    ],
    whatDidNotChange: input.actionStage?.after?.whatDidNotChange || [
      'Unrelated branches and remote repositories remained untouched until pushed.',
    ],
  };

  const variations: ConceptVariation[] = input.variations || [
    {
      title: 'Standard Invocation',
      syntax: syntaxCode,
      whatItDoes: `Executes the canonical ${input.title} flow with sensible defaults.`,
      whenToUse: 'Daily interactive developer workflows.',
      whenNotToUse: 'Non-interactive CI scripts needing strict automation flags.',
      example: syntaxCode,
    },
    {
      title: 'Verbose / Diagnostic Flag',
      syntax: `${syntaxCode} -v`,
      whatItDoes: 'Emits detailed diagnostic output explaining internal actions step-by-step.',
      whenToUse: 'When debugging unexpected state or verifying network transmissions.',
      example: `${syntaxCode} --verbose`,
    },
  ];

  const commonMistakes = input.commonMistakes || [
    {
      mistake: `Running \`${syntaxCode}\` from the wrong directory or branch.`,
      whyItHappens: 'Forgetting to verify `git status` or current branch before executing modifications.',
      fix: 'Always check `git status` or `git branch --show-current` first.',
    },
    {
      mistake: 'Assuming local commands immediately update the remote GitHub repository.',
      whyItHappens: 'Confusing local Git state with remote hosting servers.',
      fix: 'Remember that Git is distributed: local commits require `git push` to reach GitHub.',
    },
  ];

  const scenarios: ScenarioQuestion[] = input.scenarios || [
    {
      id: `scen-${input.id}-01`,
      title: `When to use ${input.title}`,
      context: `You are collaborating on a team feature branch and need to apply ${input.title}.`,
      question: `What is the recommended best practice when executing this step?`,
      options: [
        {
          label: `Execute \`${syntaxCode}\` and verify state immediately`,
          command: syntaxCode,
          isCorrect: true,
          explanation: `Correct. Running the standard command and immediately inspecting with \`git status\` or pipeline logs ensures clean state.`,
        },
        {
          label: `Force override everything with destructive flags`,
          command: `${syntaxCode} --force --hard`,
          isCorrect: false,
          explanation: `Dangerous: Force flags discard uncommitted work and can overwrite team history.`,
        },
      ],
    },
  ];

  const defaultSandbox = {
    initialCommands: input.sandbox?.initialCommands || [
      isCiCd ? 'cat .github/workflows/ci.yml' : 'git status',
    ],
    guidedSteps: input.sandbox?.guidedSteps || [
      {
        instruction: `Inspect current status and prepare for ${input.title}.`,
        command: isCiCd ? 'cat .github/workflows/ci.yml' : 'git status',
        hint: 'Observe the current working directory or pipeline configuration.',
      },
      {
        instruction: `Execute ${input.title} using the canonical command.`,
        command: syntaxCode,
        hint: `Type \`${syntaxCode}\` to perform the operation.`,
      },
    ],
    targetTask: input.sandbox?.targetTask || `Execute \`${syntaxCode}\` to successfully accomplish ${input.title}.`,
    hints: input.sandbox?.hints || [
      `Check your syntax carefully: \`${syntaxCode}\``,
      'Review output to ensure no errors were reported.',
    ],
    solutionCommands: input.sandbox?.solutionCommands || [syntaxCode],
  };

  const defaultChallenge: ConceptPracticeChallenge = {
    title: input.challenge?.title || `Practical Challenge: ${input.title}`,
    objective: input.challenge?.objective || `Apply ${input.title} in a realistic multi-step developer scenario.`,
    instructions: input.challenge?.instructions || [
      `1. Review the scenario goal.`,
      `2. Execute \`${syntaxCode}\`.`,
      `3. Verify the final state.`,
    ],
    hints: input.challenge?.hints || [
      `Remember the core command: \`${syntaxCode}\``,
    ],
    solutionExplanation: input.challenge?.solutionExplanation || `Executing \`${syntaxCode}\` transitions the state safely without data loss.`,
    safeFailure: input.challenge?.safeFailure || {
      mistakeTitle: 'Accidental Premature Execution',
      mistakeCommand: `${syntaxCode} --incomplete`,
      whatHappened: 'The command was run before changes were properly prepared.',
      whatWasNotLost: 'Your commit history and working tree files remain fully intact.',
      recoveryCommand: 'git status',
      recoveryExplanation: 'Run `git status` to see what is pending and proceed cleanly.',
    },
  };

  const defaultReference: ConceptReference = {
    synopsis: input.reference?.synopsis || `${syntaxCode} — ${input.subtitle || input.title}`,
    officialDocUrl: input.reference?.officialDocUrl || (isCiCd ? 'https://docs.github.com/en/actions' : `https://git-scm.com/docs/${syntaxCode.split(' ')[1] || 'git'}`),
    syntaxCheatSheet: input.reference?.syntaxCheatSheet || [
      syntaxCode,
      `${syntaxCode} --help`,
    ],
    commonErrors: input.reference?.commonErrors || [
      {
        error: 'fatal: not a git repository (or any of the parent directories): .git',
        remedy: 'Run `git init` or change directory (`cd`) to a valid Git repository root.',
      },
    ],
    options: input.reference?.options || [
      { flag: '--help', description: 'Display complete official manual page and usage syntax.' },
    ],
  };

  return {
    id: input.id,
    subChapterNumber: input.subChapterNumber,
    command: input.command,
    title: input.title,
    topicId: input.topicId,
    topicNumber: input.topicNumber,
    topicTitle: input.topicTitle,
    subtitle: input.subtitle || `${input.title} in professional software engineering`,
    shortDesc: input.shortDesc || input.subtitle || input.inSimpleWords || `${input.title} in modern development`,
    subChapterNum: input.subChapterNumber,
    badges: defaultBadges,
    difficulty: input.difficulty || 'Beginner',
    quote: input.quote || `Understanding ${input.title} gives you complete control over your code lifecycle.`,

    // Level 1: Understand
    whatIsIt: input.whatIsIt || `${input.title} is a core mechanism in ${input.topicTitle} that enables teams to manage code, review changes, and automate delivery reliably.`,
    inSimpleWords: input.inSimpleWords || `In simple terms, ${input.title} solves the question: "How do I safely handle this development step without risking code loss or confusion?"`,
    whyDoYouNeedIt: input.whyDoYouNeedIt || `Without ${input.title}, developers face manual friction, untracked modifications, inconsistent releases, and high defect rates in production.`,
    realWorldAnalogy: input.realWorldAnalogy || `Like a safety checkpoint on an aerospace flight line, ensuring every component is verified before the aircraft takes off.`,
    realWorldScenario: input.realWorldScenario || `You are shipping an update to production with multiple engineers. You use ${input.title} to guarantee that your contribution integrates cleanly without breaking existing services.`,
    terms: input.terms || [
      { term: input.title, simple: 'The core operation being learned.', technical: 'The concrete CLI command or CI configuration directive.' },
    ],

    // Level 2: Syntax
    syntaxCode,
    syntaxTokens,

    // Level 3: Action Stage
    actionStage: {
      before: beforeState,
      running: runningState,
      after: afterState,
    },

    // Level 4: Explore
    variations,
    scenarios,
    commandComparisons: input.commandComparisons,
    commonMistakes,
    whenToUse: input.whenToUse || [`When executing tasks related to ${input.title}.`],
    whenNotToUse: input.whenNotToUse || ['When destructive force flags could wipe out unpushed or shared team work.'],
    expectedOutput: input.expectedOutput || `[success] Applied ${input.title} cleanly.`,
    safeRecovery: input.safeRecovery || {
      failureScenario: 'Command failed or produced unexpected changes.',
      quickFix: 'Run `git status` or view CI pipeline run logs to diagnose the exact issue.',
      rootCauseAnalysis: 'Usually caused by uncommitted working tree conflicts or missing environment configurations.',
    },

    // Level 5: Practice & Challenge
    sandbox: defaultSandbox,
    challenge: defaultChallenge,

    // Level 6: Reference
    reference: defaultReference,
    summary: input.summary || `${input.title} establishes a rock-solid foundation for reliable software delivery.`,

    // CI/CD Specific
    isCiCd,
    pipelineStage: input.pipelineStage || (isCiCd ? 'build' : undefined),
    yamlConfig: input.yamlConfig,
  };
}
