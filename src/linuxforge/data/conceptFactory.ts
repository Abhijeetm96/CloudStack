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
  mentalModel?: string;
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
  variations?: ConceptVariation[];
  internalFlow?: InternalStep[];
  whatChanges?: string[];
  whatDoesNotChange?: string[];
  beforeAfter?: {
    before: string;
    after: string;
    explanation: string;
  };
  expectedOutput?: string;
  commonMistakes?: CommonMistake[];
  safeRecovery?: string;
  whenToUse?: string[];
  whenNotToUse?: string[];
  sandbox?: {
    initialCommands: string[];
    guidedSteps: { instruction: string; command: string; hint: string }[];
    targetTask: string;
    solutionCommands: string[];
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

  const defaultAnalogy = input.realWorldAnalogy || 
    input.mentalModel || 
    `Think of ${title} like an instrument panel gauge and control switch in an industrial power plant. It provides instant telemetry and direct mechanical control over the facility.`;

  const defaultMentalModel = input.mentalModel || defaultAnalogy;

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

  const defaultDiagram = input.blockDiagram || {
    title: `${title} Architecture & System Flow`,
    subtitle: 'System components and execution layers involved:',
    nodes: [
      { id: 'user', label: 'User / Shell', simpleDef: 'Interactive bash terminal or automated cron script', techDef: 'Unprivileged Ring 3 execution launching command', badge: 'User Space', color: '#38bdf8' },
      { id: 'subsys', label: `${title} Engine`, simpleDef: `Coordinates ${primaryCmd} actions within ${topicTitle}`, techDef: 'POSIX API abstraction layer and system utilities', badge: 'Subsystem', color: '#a855f7' },
      { id: 'kernel', label: 'Linux Kernel VFS / Sched', simpleDef: 'Memory, device drivers, and access control', techDef: 'Ring 0 privileged supervisor syscall handling', badge: 'Kernel Ring 0', color: '#10b981' },
      { id: 'hw', label: 'Hardware / Storage', simpleDef: 'Physical NVMe SSDs, NICs, and CPU cores', techDef: 'Underlying hardware register and interrupt controllers', badge: 'Physical', color: '#f59e0b' }
    ]
  };

  const defaultTerms: ConceptTerm[] = input.terms && input.terms.length >= 2 ? input.terms : [
    { term: title, simple: `The core Linux concept under ${topicTitle}.`, technical: `System interface and mechanism for managing ${topicTitle.toLowerCase()}.` },
    { term: primaryCmd, simple: `The primary terminal utility used to operate ${title}.`, technical: `Standard POSIX or GNU binary executable installed in /bin, /usr/bin, or kernel builtin.` }
  ];

  const defaultVariations: ConceptVariation[] = input.variations && input.variations.length > 0 ? input.variations : [
    { syntax: cleanCmd, title: `Standard Usage`, whatItDoes: `Executes standard ${title} operation`, whenToUse: `Normal day-to-day administrative workflow` },
    { syntax: `${cleanCmd} --help`, title: `Help & Flags Manual`, whatItDoes: `Displays official parameter specification`, whenToUse: `When discovering advanced runtime flags` }
  ];

  const defaultFlow: InternalStep[] = input.internalFlow && input.internalFlow.length > 0 ? input.internalFlow : [
    { step: 1, title: 'Command Ingestion', desc: `Shell parses "${cleanCmd}" and resolves binary path`, why: 'Command validation', techDetail: 'fork() and execve() invoke binary from $PATH' },
    { step: 2, title: 'Kernel Privilege & Syscall', desc: `Invokes corresponding kernel system calls for ${title}`, why: 'Hardware and resource mediation', techDetail: 'Transitions CPU from Ring 3 to Ring 0 via syscall table' },
    { step: 3, title: 'State Output & Exit Code', desc: 'Returns formatted output to stdout and sets exit code 0', why: 'Deterministic status confirmation', techDetail: 'Pipes stdout buffer to terminal emulator and updates process table' }
  ];

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

  const defaultMistakes: CommonMistake[] = input.commonMistakes && input.commonMistakes.length >= 2 ? input.commonMistakes : [
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

  const defaultSafeRecovery = input.safeRecovery || 
    `If an unexpected error occurs during ${title} operations, check terminal stderr output, inspect /var/log/syslog or journalctl -xe, and restore verified config backups.`;

  const defaultSandbox = input.sandbox || {
    initialCommands: [cleanCmd, `${cleanCmd} --help`],
    guidedSteps: [
      { instruction: `Execute "${cleanCmd}" in the terminal simulator`, command: cleanCmd, hint: `Type "${cleanCmd}" and press Enter` },
      { instruction: `Verify parameters and options using --help`, command: `${cleanCmd} --help`, hint: `Run "${cleanCmd} --help"` }
    ],
    targetTask: `Master the execution and behavior of "${cleanCmd}".`,
    solutionCommands: [cleanCmd]
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
    syntaxTokens: input.syntaxTokens || defaultTokens,
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
