import { describe, it, expect } from 'vitest';
import { LINUX_15_TOPICS, ALL_LINUX_CONCEPTS, TOTAL_LINUX_TOPICS, TOTAL_LINUX_CONCEPTS } from '../linuxforge/data/topics';
import { defaultLinuxSimulator } from '../linuxforge/data/linuxSimulatorEngine';

describe('LinuxForge Master Curriculum Audit', () => {
  it('contains exactly 8 modules matching Chapter 01 (01.1 to 01.8)', () => {
    expect(TOTAL_LINUX_TOPICS).toBe(8);
    expect(LINUX_15_TOPICS.length).toBe(8);

    const expectedNumbers = ['01.1', '01.2', '01.3', '01.4', '01.5', '01.6', '01.7', '01.8'];
    LINUX_15_TOPICS.forEach((topic, idx) => {
      expect(topic.number).toBe(expectedNumbers[idx]);
      expect(topic.title.length).toBeGreaterThan(3);
      expect(topic.description.length).toBeGreaterThan(10);
      expect(topic.concepts.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('contains all 24 comprehensive concepts covering 100% of Chapter 01 subtopics', () => {
    expect(TOTAL_LINUX_CONCEPTS).toBe(24);
    expect(ALL_LINUX_CONCEPTS.length).toBe(24);

    ALL_LINUX_CONCEPTS.forEach((concept) => {
      // Identity & metadata
      expect(concept.id).toBeTruthy();
      expect(concept.title).toBeTruthy();
      expect(concept.command).toBeTruthy();
      expect(concept.topicId).toBeTruthy();
      expect(concept.badges.length).toBeGreaterThan(0);

      // Level 1: Meaning
      expect(concept.whatIsIt.length).toBeGreaterThan(20);
      expect(concept.inSimpleWords.length).toBeGreaterThan(20);
      expect(concept.whyDoYouNeedIt.length).toBeGreaterThan(15);
      expect(concept.realWorldAnalogy.length).toBeGreaterThan(15);

      // Without vs With Matrix
      expect(concept.withoutVsWith).toBeDefined();
      expect(concept.withoutVsWith.without.items.length).toBeGreaterThanOrEqual(2);
      expect(concept.withoutVsWith.without.outcome).toBeTruthy();
      expect(concept.withoutVsWith.with.items.length).toBeGreaterThanOrEqual(2);
      expect(concept.withoutVsWith.with.outcome).toBeTruthy();

      // Block Diagram
      expect(concept.blockDiagram).toBeDefined();
      expect(concept.blockDiagram.title).toBeTruthy();
      expect(concept.blockDiagram.nodes.length).toBeGreaterThanOrEqual(3);
      concept.blockDiagram.nodes.forEach((n) => {
        expect(n.id).toBeTruthy();
        expect(n.label).toBeTruthy();
        expect(n.simpleDef).toBeTruthy();
        expect(n.techDef).toBeTruthy();
      });

      // Terms
      expect(concept.terms.length).toBeGreaterThanOrEqual(2);
      concept.terms.forEach((t) => {
        expect(t.term).toBeTruthy();
        expect(t.simple).toBeTruthy();
        expect(t.technical).toBeTruthy();
      });

      // Level 2: Syntax
      expect(concept.syntaxCode).toBeTruthy();
      expect(concept.syntaxTokens.length).toBeGreaterThanOrEqual(2);

      // Level 3: Variations & Internal Execution Flow
      expect(concept.variations.length).toBeGreaterThanOrEqual(2);
      expect(concept.internalFlow.length).toBeGreaterThanOrEqual(3);
      concept.internalFlow.forEach((f) => {
        expect(f.title).toBeTruthy();
        expect(f.desc).toBeTruthy();
        expect(f.techDetail).toBeTruthy();
        expect(f.why).toBeTruthy();
      });

      // Level 4: Sandbox & Practice
      expect(concept.sandbox).toBeDefined();
      expect(concept.sandbox.targetTask).toBeTruthy();
      expect(concept.sandbox.solutionCommands.length).toBeGreaterThan(0);
      expect(concept.sandbox.guidedSteps.length).toBeGreaterThanOrEqual(2);

      // Level 5: Mistakes & Quiz
      expect(concept.commonMistakes.length).toBeGreaterThanOrEqual(2);
      concept.commonMistakes.forEach((m) => {
        expect(m.mistake).toBeTruthy();
        expect(m.whyWrong).toBeTruthy();
        expect(m.correctWay).toBeTruthy();
      });

      expect(concept.challenge).toBeDefined();
      expect(concept.challenge.question).toBeTruthy();
      expect(concept.challenge.options.length).toBeGreaterThanOrEqual(3);
      expect(concept.challenge.options.some((o) => o.isCorrect)).toBe(true);
    });
  });

  it('verifies LinuxSimulator command evaluation fidelity', () => {
    const sim = defaultLinuxSimulator;

    const pwdRes = sim.execute('pwd');
    expect(pwdRes.exitCode).toBe(0);
    expect(pwdRes.stdout).toContain('/home/forge');

    const unameRes = sim.execute('uname -a');
    expect(unameRes.stdout[0]).toContain('Linux');
    expect(unameRes.stdout[0]).toContain('6.8.0');

    const uptimeRes = sim.execute('uptime');
    expect(uptimeRes.stdout[0]).toContain('load average:');

    const freeRes = sim.execute('free -h');
    expect(freeRes.stdout.some((l) => l.includes('Mem:'))).toBe(true);
    expect(freeRes.stdout.some((l) => l.includes('available'))).toBe(true);

    const dfRes = sim.execute('df -h');
    expect(dfRes.stdout.some((l) => l.includes('/dev/nvme0n1p2'))).toBe(true);

    const systemctlRes = sim.execute('sudo systemctl status nginx');
    expect(systemctlRes.stdout.some((l) => l.includes('active (running)'))).toBe(true);

    const ipRes = sim.execute('ip a');
    expect(ipRes.stdout.some((l) => l.includes('127.0.0.1'))).toBe(true);
    expect(ipRes.stdout.some((l) => l.includes('192.168.1.100'))).toBe(true);

    const ssRes = sim.execute('ss -tulpn');
    expect(ssRes.stdout.some((l) => l.includes('LISTEN'))).toBe(true);

    const sysctlRes = sim.execute('sysctl vm.swappiness');
    expect(sysctlRes.stdout.some((l) => l.includes('vm.swappiness'))).toBe(true);

    // Test new Chapter 01 commands
    const statRes = sim.execute('stat /etc/os-release');
    expect(statRes.stdout.some((l) => l.includes('Size:'))).toBe(true);
    expect(statRes.stdout.some((l) => l.includes('Inode:'))).toBe(true);

    const fileRes = sim.execute('file /bin/bash');
    expect(fileRes.stdout[0]).toContain('ELF 64-bit LSB');
    expect(fileRes.stdout[0]).toContain('executable');

    const treeRes = sim.execute('tree');
    expect(treeRes.stdout.some((l) => l.includes('directories'))).toBe(true);

    const wcRes = sim.execute('wc -l /etc/passwd');
    expect(wcRes.stdout[0]).toMatch(/\d+\s+\/etc\/passwd/);

    const umaskRes = sim.execute('umask');
    expect(umaskRes.stdout[0]).toBe('0022');

    const journalRes = sim.execute('journalctl -u nginx --no-pager');
    expect(journalRes.stdout.some((l) => l.includes('Started Nginx HTTP'))).toBe(true);

    const ulimitRes = sim.execute('ulimit -n');
    expect(ulimitRes.stdout[0]).toBe('1024');

    const lsofRes = sim.execute('lsof -i :80');
    expect(lsofRes.stdout.some((l) => l.includes('nginx'))).toBe(true);

    const killRes = sim.execute('kill -9 1234');
    expect(killRes.stdout[0]).toContain('[OK] Sent signal to -9 1234');

    const nohupRes = sim.execute('nohup python3 worker.py &');
    expect(nohupRes.stdout[0]).toContain('nohup: ignoring input');
  });
});
