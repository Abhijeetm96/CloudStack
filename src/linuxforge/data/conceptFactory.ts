import { UniversalLinuxConcept, ConceptDifficulty, SyntaxToken, ConceptVariation, ConceptTerm, InternalStep, CommonMistake, BlockDiagramNode } from './unifiedLinuxData';

export interface LinuxConceptInput {
  id: string;
  subChapterNumber: string;
  title: string;
  command: string;
  topicId: string;
  topicNumber: string;
  topicTitle: string;
  subtitle?: string;
  badges?: string[];
  quote?: string;
  difficulty?: ConceptDifficulty;
  whatIsIt?: string;
  inSimpleWords?: string;
  whyDoYouNeedIt?: string;
  realWorldScenario?: string;
  realWorldAnalogy?: string;
  mentalModel?: string | { concept: string; analogy: string; keyTakeaway: string };
  withoutVsWith?: {
    without: { title: string; items: string[]; outcome: string };
    with: { title: string; items: string[]; outcome: string };
  };
  blockDiagram?: {
    title: string;
    subtitle: string;
    nodes: BlockDiagramNode[];
  };
  terms?: ConceptTerm[];
  syntaxCode?: string;
  syntaxTokens?: SyntaxToken[];
  variations?: (ConceptVariation | { command: string; description: string; useCase?: string; syntax?: string; title?: string; whatItDoes?: string; whenToUse?: string })[];
  internalFlow?: (InternalStep | { step?: number; title?: string; desc?: string; description?: string; why?: string; techDetail?: string; purpose?: string; technicalDetail?: string })[];
  whatChanges?: string[];
  whatDoesNotChange?: string[];
  beforeAfter?: {
    before: string;
    after: string;
    explanation: string;
  };
  expectedOutput?: string;
  commonMistakes?: CommonMistake[];
  safeRecovery?: string | { failureScenario: string; quickFix: string; rootCauseAnalysis?: string };
  proTips?: string[];
  whenToUse?: string[];
  whenNotToUse?: string[];
  sandbox?: {
    initialCommands?: string[];
    starterCommand?: string;
    guidedSteps?: { instruction: string; command: string; hint: string }[];
    targetTask?: string;
    solutionCommands?: string[];
    hint?: string;
  };
  challenge?: {
    question: string;
    options: { label: string; isCorrect: boolean; explanation: string }[];
  };
  reference?: {
    officialDocUrl?: string;
    syntaxCheatSheet?: string[];
    commonErrors?: { error: string; remedy: string }[];
    options?: { flag: string; description: string }[];
    bestPractices?: string[];
  };
  summary?: string;
}

export function parseCommandTokens(cmd: string): SyntaxToken[] {
  const parts = cmd.split(/\s+/).filter(Boolean);
  if (!parts.length) {
    return [{ token: 'command', role: 'command', explanation: 'Linux system executable or shell builtin' }];
  }

  const tokens = parts.map((part, index) => {
    if (index === 0) {
      return { token: part, role: 'command', explanation: `Core executable utility (${part})` };
    }
    if (part.startsWith('--')) {
      return { token: part, role: 'flag', explanation: `Long option modifier (${part})` };
    }
    if (part.startsWith('-')) {
      return { token: part, role: 'flag', explanation: `Short option flag altering execution mode (${part})` };
    }
    if (part === '|' || part === '>' || part === '>>' || part === '<' || part === '&&' || part === '||' || part === ';') {
      return { token: part, role: 'operator', explanation: `Shell stream redirection or logical operator (${part})` };
    }
    if (part.startsWith('/') || part.startsWith('./') || part.startsWith('~') || part.includes('.')) {
      return { token: part, role: 'path', explanation: `Target filesystem file or directory path (${part})` };
    }
    return { token: part, role: 'argument', explanation: `Positional argument or parameter passed to command (${part})` };
  });

  if (tokens.length === 1) {
    tokens.push({
      token: '[options]',
      role: 'flag',
      explanation: `Optional flags and argument modifiers for ${tokens[0].token}`
    });
  }

  return tokens;
}

export function buildLinuxConcept(input: LinuxConceptInput): UniversalLinuxConcept {
  const {
    id,
    subChapterNumber,
    title,
    command,
    topicId,
    topicNumber,
    topicTitle,
  } = input;

  const cleanCmd = command.trim();
  const defaultTokens = parseCommandTokens(cleanCmd);
  const primaryCmd = cleanCmd.split(/\s+/)[0] || 'bash';

  const defaultBadges = input.badges && input.badges.length > 0 
    ? input.badges 
    : ['Linux', 'System', topicTitle.split(' ')[0] || 'Core'];

  const defaultDifficulty: ConceptDifficulty = input.difficulty || 'Beginner';

  const defaultWhatIsIt = input.whatIsIt || 
    `${title} is a fundamental component of Linux system architecture and POSIX engineering. In the context of ${topicTitle}, it governs how operators, system services, and processes inspect and control Linux resources.`;

  const defaultInSimpleWords = input.inSimpleWords || 
    `In plain words, ${title} gives you the exact mechanism to manage and monitor system behavior without guesswork. When you run "${cleanCmd}", Linux executes predictable kernel and filesystem operations.`;

  const defaultWhy = input.whyDoYouNeedIt || 
    `Linux relies on explicit, deterministic tools for predictability and automation. ${title} ensures administrators have fine-grained control, scriptability, and transparent observability into the running operating system.`;

  const defaultScenario = input.realWorldScenario || 
    `You are managing a fleet of production Linux servers or troubleshooting a containerized backend. You need to inspect, modify, or verify ${title} to ensure high availability, zero latency spikes, and strict security compliance.`;

  const mentalModelString = typeof input.mentalModel === 'object' && input.mentalModel !== null
    ? `${input.mentalModel.concept}: ${input.mentalModel.analogy} (Key takeaway: ${input.mentalModel.keyTakeaway})`
    : (input.mentalModel || '');

  const defaultAnalogy = input.realWorldAnalogy || 
    mentalModelString || 
    `Think of ${title} like an instrument panel gauge and control switch in an industrial power plant. It provides instant telemetry and direct mechanical control over the facility.`;

  const defaultMentalModel = mentalModelString || defaultAnalogy;

  const defaultWithoutWith = input.withoutVsWith || {
    without: {
      title: `Operating Without Understanding ${title}`,
      items: [
        'Unpredictable server behavior and unexplained permission or network errors',
        'Inability to automate server setups or reproduce configuration states',
        'Blind debugging through trial and error causing downtime'
      ],
      outcome: 'System outages, security vulnerabilities, and brittle manual server management.'
    },
    with: {
      title: `Operating With Mastery of ${title}`,
      items: [
        'Deterministic control and deep root-cause troubleshooting capabilities',
        'Production-grade automation scripts and infrastructure as code',
        'Fast recovery from system failures with verifiable state transitions'
      ],
      outcome: 'Resilient, secure, and fully auditable Linux systems.'
    }
  };

  let defaultDiagram = input.blockDiagram;
  if (!defaultDiagram || !defaultDiagram.nodes || defaultDiagram.nodes.length < 3) {
    if (defaultDiagram && defaultDiagram.nodes && defaultDiagram.nodes.length > 0) {
      const existing = [...defaultDiagram.nodes];
      const additionalLabels = [
        { label: 'Linux Kernel VFS / Sched', simple: 'Hardware abstraction and driver mediation', tech: 'Syscall table, memory management, and interrupt handling', badge: 'Kernel Ring 0', color: '#10b981' },
        { id: 'hw', label: 'Hardware / Storage / NIC', simple: 'Physical subsystem and registers', tech: 'Direct device register IO and interrupt controller', badge: 'Physical', color: '#f59e0b' }
      ];
      while (existing.length < 3) {
        const extra = additionalLabels[existing.length - 1] || additionalLabels[0];
        existing.push({
          id: `sys-${existing.length + 1}`,
          label: extra.label,
          simpleDef: extra.simple,
          techDef: extra.tech,
          badge: extra.badge,
          color: extra.color
        });
      }
      defaultDiagram = {
        title: defaultDiagram.title || `${title} Architecture & System Flow`,
        subtitle: defaultDiagram.subtitle || 'System components and execution layers involved:',
        nodes: existing
      };
    } else {
      defaultDiagram = {
        title: `${title} Architecture & System Flow`,
        subtitle: 'System components and execution layers involved:',
        nodes: [
          { id: 'user', label: 'User / Shell', simpleDef: 'Interactive bash terminal or automated cron script', techDef: 'Unprivileged Ring 3 execution launching command', badge: 'User Space', color: '#38bdf8' },
          { id: 'subsys', label: `${title} Engine`, simpleDef: `Coordinates ${primaryCmd} actions within ${topicTitle}`, techDef: 'POSIX API abstraction layer and system utilities', badge: 'Subsystem', color: '#a855f7' },
          { id: 'kernel', label: 'Linux Kernel VFS / Sched', simpleDef: 'Memory, device drivers, and access control', techDef: 'Ring 0 privileged supervisor syscall handling', badge: 'Kernel Ring 0', color: '#10b981' },
          { id: 'hw', label: 'Hardware / Storage', simpleDef: 'Physical NVMe SSDs, NICs, and CPU cores', techDef: 'Underlying hardware register and interrupt controllers', badge: 'Physical', color: '#f59e0b' }
        ]
      };
    }
  }

  const defaultTerms: ConceptTerm[] = input.terms && input.terms.length >= 2 ? input.terms : [
    { term: title, simple: `The core Linux concept under ${topicTitle}.`, technical: `System interface and mechanism for managing ${topicTitle.toLowerCase()}.` },
    { term: primaryCmd, simple: `The primary terminal utility used to operate ${title}.`, technical: `Standard POSIX or GNU binary executable installed in /bin, /usr/bin, or kernel builtin.` }
  ];

  const rawVariations = (input.variations || []).map((v: any) => {
    if (v.syntax) {
      return v as ConceptVariation;
    }
    return {
      syntax: v.command || cleanCmd,
      title: v.description?.slice(0, 40) || `Usage for ${cleanCmd}`,
      whatItDoes: v.description || `Alternative usage for ${cleanCmd}`,
      whenToUse: v.useCase || `Specific operational context for ${cleanCmd}`
    } as ConceptVariation;
  });

  const defaultVariations: ConceptVariation[] = rawVariations.length >= 2 
    ? [...rawVariations]
    : rawVariations.length === 1
      ? [
          rawVariations[0],
          {
            syntax: `${cleanCmd} --help`,
            title: 'Help & Flags Manual',
            whatItDoes: 'Displays official syntax specification and parameter list',
            whenToUse: 'When verifying valid option flags'
          }
        ]
      : [
          { syntax: cleanCmd, title: `Standard Usage`, whatItDoes: `Executes standard ${title} operation`, whenToUse: `Normal day-to-day administrative workflow` },
          { syntax: `${cleanCmd} --help`, title: `Help & Flags Manual`, whatItDoes: `Displays official parameter specification`, whenToUse: `When discovering advanced runtime flags` }
        ];

  const rawFlow = (input.internalFlow && input.internalFlow.length > 0) ? input.internalFlow : [
    { step: 1, title: 'Command Ingestion', desc: `Shell parses "${cleanCmd}" and resolves binary path`, why: 'Command validation', techDetail: 'fork() and execve() invoke binary from $PATH' },
    { step: 2, title: 'Kernel Privilege & Syscall', desc: `Invokes corresponding kernel system calls for ${title}`, why: 'Hardware and resource mediation', techDetail: 'Transitions CPU from Ring 3 to Ring 0 via syscall table' },
    { step: 3, title: 'State Output & Exit Code', desc: 'Returns formatted output to stdout and sets exit code 0', why: 'Deterministic status confirmation', techDetail: 'Pipes stdout buffer to terminal emulator and updates process table' }
  ];

  const defaultFlow: InternalStep[] = rawFlow.map((f: any, idx: number) => {
    const descText = f.desc || f.description || `Execute execution step ${idx + 1} for ${title}`;
    return {
      step: f.step || idx + 1,
      title: f.title || `Phase ${idx + 1}`,
      desc: descText,
      why: f.why || f.purpose || `Ensure deterministic system transition during ${title}`,
      techDetail: f.techDetail || f.technicalDetail || descText
    };
  });

  while (defaultFlow.length < 3) {
    const nextIdx = defaultFlow.length + 1;
    defaultFlow.push({
      step: nextIdx,
      title: `Step ${nextIdx}: System State Verification`,
      desc: `Linux kernel verifies system call return code and updates process state tables.`,
      why: 'Ensure operational integrity',
      techDetail: 'System call return code evaluated and error status handled via errno register'
    });
  }

  const defaultWhatChanges = input.whatChanges && input.whatChanges.length > 0 ? input.whatChanges : [
    `System context or resource state for ${title} updates according to executed parameters.`
  ];

  const defaultWhatDoesNotChange = input.whatDoesNotChange && input.whatDoesNotChange.length > 0 ? input.whatDoesNotChange : [
    `Unrelated kernel subsystems, isolated user accounts, and immutable kernel memory remain unchanged.`
  ];

  const defaultBeforeAfter = input.beforeAfter || {
    before: `# System state prior to command execution\n$ ${cleanCmd}`,
    after: `# Transformed state after successful execution\n${input.expectedOutput || '[OK] Operation applied cleanly with exit status 0.'}`,
    explanation: `Executing ${cleanCmd} transitioned the system state predictably without unintended side effects.`
  };

  const rawMistakes = (input.commonMistakes && input.commonMistakes.length >= 2) ? input.commonMistakes : [
    {
      mistake: `Running "${cleanCmd}" without verifying target paths or parameters`,
      whyWrong: 'Can affect unintended files, processes, or system configurations.',
      correctWay: `Always double-check target arguments and test in non-production environments first.`,
      safeRecovery: 'Review recent shell history, inspect log files in /var/log, or revert configuration backups.'
    },
    {
      mistake: `Running "${cleanCmd}" with sudo when superuser privileges are not needed`,
      whyWrong: 'Violates the principle of least privilege and risks creating files owned by root that standard tools cannot modify.',
      correctWay: 'Run commands as your normal user, prefixing with sudo only when explicitly modifying system-wide protected resources.',
      safeRecovery: 'If files were mistakenly created with root ownership, restore permissions with "sudo chown -R $USER:$USER <path>".'
    }
  ];

  const defaultMistakes: CommonMistake[] = rawMistakes.map(m => ({
    mistake: m.mistake,
    whyWrong: m.whyWrong || (m as any).whyItHappens || 'Can lead to unexpected behavior or system instability.',
    correctWay: m.correctWay || (m as any).howToFix || 'Follow standard POSIX practices and double check arguments.',
    safeRecovery: m.safeRecovery || (m as any).safeRecovery || 'Revert changes or inspect system logs in /var/log.'
  }));

  const defaultSafeRecovery = typeof input.safeRecovery === 'object' && input.safeRecovery !== null
    ? `Failure Scenario: ${input.safeRecovery.failureScenario} | Quick Fix: ${input.safeRecovery.quickFix}${input.safeRecovery.rootCauseAnalysis ? ` | Root Cause: ${input.safeRecovery.rootCauseAnalysis}` : ''}`
    : (input.safeRecovery || 
       `If an unexpected error occurs during ${title} operations, check terminal stderr output, inspect /var/log/syslog or journalctl -xe, and restore verified config backups.`);

  const rawSandbox = input.sandbox as any;
  const targetTask = rawSandbox?.targetTask || `Master the execution and behavior of "${cleanCmd}".`;
  const solutionCommands = rawSandbox?.solutionCommands && rawSandbox.solutionCommands.length > 0
    ? rawSandbox.solutionCommands
    : [cleanCmd];
  const initialCommands = rawSandbox?.initialCommands && rawSandbox.initialCommands.length > 0
    ? rawSandbox.initialCommands
    : rawSandbox?.starterCommand
      ? [rawSandbox.starterCommand]
      : [cleanCmd, `${cleanCmd} --help`];

  const rawGuidedSteps = rawSandbox?.guidedSteps && Array.isArray(rawSandbox.guidedSteps)
    ? [...rawSandbox.guidedSteps]
    : [];

  if (rawGuidedSteps.length === 0) {
    rawGuidedSteps.push({
      instruction: `Execute "${cleanCmd}" in the terminal simulator`,
      command: cleanCmd,
      hint: rawSandbox?.hint || `Type "${cleanCmd}" and press Enter`
    });
    rawGuidedSteps.push({
      instruction: `Verify parameters and options using --help`,
      command: solutionCommands[1] || `${cleanCmd} --help`,
      hint: `Run "${solutionCommands[1] || cleanCmd + ' --help'}"`
    });
  } else if (rawGuidedSteps.length === 1) {
    rawGuidedSteps.push({
      instruction: `Verify parameters and options using --help`,
      command: solutionCommands[1] || `${cleanCmd} --help`,
      hint: `Run "${cleanCmd} --help"`
    });
  }

  const defaultSandbox = {
    targetTask,
    solutionCommands,
    initialCommands,
    guidedSteps: rawGuidedSteps
  };

  const defaultChallenge = input.challenge || {
    question: `What is the primary role of "${cleanCmd}" in Linux systems administration?`,
    options: [
      { label: `To operate and inspect ${title} predictably`, isCorrect: true, explanation: `Correct! ${cleanCmd} is specifically built to handle ${title} according to POSIX and Linux standards.` },
      { label: `To format all connected hard drives immediately`, isCorrect: false, explanation: `Incorrect; destructive formatting uses mkfs.` },
      { label: `To bypass kernel security and privilege rings`, isCorrect: false, explanation: `Linux kernel privilege rings cannot be bypassed with standard userland tools.` },
      { label: `To shut down power to the motherboard`, isCorrect: false, explanation: `System shutdown is handled by poweroff or systemctl poweroff.` }
    ]
  };

  const defaultReference = input.reference || {
    officialDocUrl: `https://man7.org/linux/man-pages/man1/${primaryCmd}.1.html`,
    syntaxCheatSheet: [
      `${cleanCmd} # Standard execution`,
      `${cleanCmd} --help # Quick options syntax`
    ],
    bestPractices: [
      `Always test commands in isolated staging environments or containers first`,
      `Inspect exit codes using echo $? after running automation scripts`
    ]
  };

  const rawTokens = input.syntaxTokens && input.syntaxTokens.length > 0 ? input.syntaxTokens : defaultTokens;
  const finalTokens: SyntaxToken[] = rawTokens.length >= 2
    ? [...rawTokens]
    : [
        ...rawTokens,
        {
          token: '[options]',
          role: 'flag',
          explanation: `Optional flags and argument modifiers for ${rawTokens[0]?.token || 'command'}`
        }
      ];

  return {
    id,
    subChapterNumber,
    title,
    command: cleanCmd,
    topicId,
    topicNumber,
    topicTitle,
    subtitle: input.subtitle || `Master ${title} for production Linux administration and systems control`,
    badges: defaultBadges,
    difficulty: defaultDifficulty,
    quote: input.quote || `In Linux, understanding ${title} gives you complete, predictable mastery over system behavior.`,
    whatIsIt: defaultWhatIsIt,
    inSimpleWords: defaultInSimpleWords,
    whyDoYouNeedIt: defaultWhy,
    realWorldScenario: defaultScenario,
    realWorldAnalogy: defaultAnalogy,
    mentalModel: defaultMentalModel,
    withoutVsWith: defaultWithoutWith,
    blockDiagram: defaultDiagram,
    terms: defaultTerms,
    syntaxCode: input.syntaxCode || cleanCmd,
    syntaxTokens: finalTokens,
    variations: defaultVariations,
    internalFlow: defaultFlow,
    whatChanges: defaultWhatChanges,
    whatDoesNotChange: defaultWhatDoesNotChange,
    beforeAfter: defaultBeforeAfter,
    expectedOutput: input.expectedOutput || '[OK] Command exited with code 0',
    commonMistakes: defaultMistakes,
    safeRecovery: defaultSafeRecovery,
    whenToUse: input.whenToUse || [`When configuring, troubleshooting, or automating ${topicTitle.toLowerCase()}`],
    whenNotToUse: input.whenNotToUse || [`When higher-level declarative configuration management handles this automatically`],
    sandbox: defaultSandbox,
    challenge: defaultChallenge,
    reference: defaultReference,
    summary: input.summary || `${title} (${cleanCmd}) is an essential tool in your Linux engineering toolkit. Understanding its syntax, internal execution flow, and failure recovery allows you to operate Linux servers with senior-level confidence.`
  };
}
