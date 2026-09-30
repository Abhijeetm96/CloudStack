import { describe, it, expect } from 'vitest';
import {
  DEVOPS_29_CHAPTERS,
  DEVOPS_10_TRACKS,
  DEVOPS_LEARNING_TRACKS,
  GET_DEVOPS_STATS,
} from '../devops/data/devopsCurriculumData';

describe('DevOps & Cloud Engineering Academy Master Curriculum Audit', () => {
  it('verifies all 29 requested chapters exist with strictly sequential numbering (1 to 29)', () => {
    expect(DEVOPS_29_CHAPTERS.length).toBe(29);

    DEVOPS_29_CHAPTERS.forEach((ch, idx) => {
      expect(ch.number).toBe(idx + 1);
      expect(ch.id).toBeTruthy();
      expect(ch.title).toBeTruthy();
      expect(ch.summary).toBeTruthy();
      expect(ch.category).toBeTruthy();
      expect(ch.subModules.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('verifies all 29 chapter titles match the master syllabus verbatim', () => {
    const expectedTitles = [
      'LINUX & SYSTEM FUNDAMENTALS',
      'NETWORKING FUNDAMENTALS',
      'GIT & VERSION CONTROL',
      'DOCKER & CONTAINERIZATION',
      'CONTAINER REGISTRIES & ARTIFACTS',
      'KUBERNETES FUNDAMENTALS',
      'KUBERNETES NETWORKING',
      'KUBERNETES ADVANCED',
      'CI/CD & AUTOMATION',
      'INFRASTRUCTURE AS CODE',
      'CLOUD FUNDAMENTALS',
      'CLOUD NETWORKING',
      'DATABASES FOR DEVOPS',
      'OBSERVABILITY & MONITORING',
      'SRE & PRODUCTION ENGINEERING',
      'DEVOPS SECURITY & DEVSECOPS',
      'GITOPS & CONTINUOUS DELIVERY',
      'ADVANCED CONTAINER ORCHESTRATION',
      'PLATFORM ENGINEERING',
      'CLOUD-NATIVE APPLICATION ARCHITECTURE',
      'AUTOMATION & SCRIPTING',
      'ARTIFACTS, PACKAGING & RELEASE ENGINEERING',
      'TESTING & QUALITY ENGINEERING',
      'DISASTER RECOVERY & BUSINESS CONTINUITY',
      'COST OPTIMIZATION',
      'REAL-WORLD DEVOPS PROJECTS',
      'TROUBLESHOOTING ACADEMY',
      'DEVOPS INTERVIEW & CAREER PREPARATION',
      'CAPSTONE',
    ];

    DEVOPS_29_CHAPTERS.forEach((ch, idx) => {
      expect(ch.title.toUpperCase()).toBe(expectedTitles[idx]);
    });
  });

  it('verifies all 10 Learning Path tracks are defined and cover all 29 chapters', () => {
    expect(DEVOPS_10_TRACKS.length).toBe(10);
    expect(DEVOPS_LEARNING_TRACKS.length).toBe(10);

    const coveredChapters = new Set<number>();

    DEVOPS_10_TRACKS.forEach((track) => {
      expect(track.id).toBeTruthy();
      expect(track.title).toBeTruthy();
      expect(track.description).toBeTruthy();
      expect(track.chapterNumbers.length).toBeGreaterThan(0);
      expect(track.color).toBeTruthy();
      expect(track.iconName).toBeTruthy();

      track.chapterNumbers.forEach((num) => {
        expect(num).toBeGreaterThanOrEqual(1);
        expect(num).toBeLessThanOrEqual(29);
        coveredChapters.add(num);
      });
    });

    // All 29 chapters must be mapped into the 10 tracks
    expect(coveredChapters.size).toBe(29);
  });

  it('verifies every submodule contains non-empty topics and summaries', () => {
    let totalSubmodules = 0;
    let totalTopics = 0;

    DEVOPS_29_CHAPTERS.forEach((ch) => {
      ch.subModules.forEach((sub) => {
        totalSubmodules++;
        expect(sub.id).toBeTruthy();
        expect(sub.title).toBeTruthy();
        expect(sub.code).toBeTruthy();
        expect(sub.topics.length).toBeGreaterThanOrEqual(2);
        totalTopics += sub.topics.length;
      });
    });

    expect(totalSubmodules).toBeGreaterThanOrEqual(160);
    expect(totalTopics).toBeGreaterThanOrEqual(700);

    const stats = GET_DEVOPS_STATS();
    expect(stats.totalChapters).toBe(29);
    expect(stats.totalSubmodules).toBe(totalSubmodules);
    expect(stats.totalTopics).toBe(totalTopics);
    expect(stats.totalTracks).toBe(10);
  });

  it('verifies live Forge integrations route to active interactive academies', () => {
    const ch01 = DEVOPS_29_CHAPTERS.find((c) => c.number === 1);
    expect(ch01?.liveAction?.route).toBe('/linuxforge');

    const ch03 = DEVOPS_29_CHAPTERS.find((c) => c.number === 3);
    expect(ch03?.liveAction?.route).toBe('/git');

    const ch04 = DEVOPS_29_CHAPTERS.find((c) => c.number === 4);
    expect(ch04?.liveAction?.route).toBe('/docker');

    const ch06 = DEVOPS_29_CHAPTERS.find((c) => c.number === 6);
    expect(ch06?.liveAction?.route).toBe('/kubernetes');

    const ch07 = DEVOPS_29_CHAPTERS.find((c) => c.number === 7);
    expect(ch07?.liveAction?.route).toBe('/kubernetes');

    const ch08 = DEVOPS_29_CHAPTERS.find((c) => c.number === 8);
    expect(ch08?.liveAction?.route).toBe('/kubernetes');
  });

  it('verifies key topics from the user syllabus are accurately present', () => {
    const allTopics = DEVOPS_29_CHAPTERS.flatMap((c) =>
      c.subModules.flatMap((s) => [s.title, ...s.topics])
    );

    const hasTopic = (term: string) => allTopics.some((t) => t.toLowerCase().includes(term.toLowerCase()));

    // Verify samples from Linux
    expect(hasTopic('Kernel vs operating system')).toBe(true);
    expect(hasTopic('/proc')).toBe(true);
    expect(hasTopic('xargs')).toBe(true);
    expect(hasTopic('umask')).toBe(true);
    expect(hasTopic('SIGKILL')).toBe(true);
    expect(hasTopic('journalctl')).toBe(true);
    expect(hasTopic('File descriptor limits')).toBe(true);

    // Verify samples from Networking
    expect(hasTopic('CIDR')).toBe(true);
    expect(hasTopic('handshake')).toBe(true);
    expect(hasTopic('Reverse proxy')).toBe(true);
    expect(hasTopic('Sticky sessions')).toBe(true);

    // Verify samples from Git
    expect(hasTopic('Three-way merge')).toBe(true);
    expect(hasTopic('git reflog')).toBe(true);
    expect(hasTopic('Git worktree')).toBe(true);

    // Verify samples from Docker
    expect(hasTopic('containerd')).toBe(true);
    expect(hasTopic('Multi-stage builds')).toBe(true);
    expect(hasTopic('Distroless')).toBe(true);

    // Verify samples from Kubernetes
    expect(hasTopic('etcd')).toBe(true);
    expect(hasTopic('StatefulSet')).toBe(true);
    expect(hasTopic('NetworkPolicy')).toBe(true);
    expect(hasTopic('CrashLoopBackOff')).toBe(true);

    // Verify samples from IaC & Automation
    expect(hasTopic('Infrastructure drift')).toBe(true);
    expect(hasTopic('State locking')).toBe(true);
    expect(hasTopic('Ansible')).toBe(true);

    // Verify samples from Cloud & Observability
    expect(hasTopic('Multi-region architecture')).toBe(true);
    expect(hasTopic('Transit Gateway')).toBe(true);
    expect(hasTopic('PromQL')).toBe(true);
    expect(hasTopic('OpenTelemetry')).toBe(true);

    // Verify samples from SRE & Security
    expect(hasTopic('Error budget')).toBe(true);
    expect(hasTopic('Postmortem')).toBe(true);
    expect(hasTopic('Zero trust')).toBe(true);
    expect(hasTopic('SBOM')).toBe(true);

    // Verify samples from GitOps & Advanced
    expect(hasTopic('Argo CD')).toBe(true);
    expect(hasTopic('eBPF')).toBe(true);
    expect(hasTopic('Backstage')).toBe(true);

    // Verify samples from Projects & Capstone
    expect(hasTopic('pipeline')).toBe(true);
    expect(hasTopic('Production Incident Simulation')).toBe(true);
    expect(hasTopic('Production Simulation')).toBe(true);
  });
});
