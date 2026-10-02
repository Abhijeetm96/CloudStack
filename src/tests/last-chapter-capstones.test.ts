import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// Import curriculum chapters from all 6 sections
import { GIT_35_CHAPTERS } from '../git/data/unifiedAcademyData';
import { LINUX_30_CHAPTERS } from '../linuxforge/data/topics/index';
import { ALL_DOCKER_CHAPTERS } from '../docker/data/index';
import { DEVOPS_29_CHAPTERS } from '../devops/data/devopsCurriculumData';
import { ALL_TERRAFORM_CHAPTERS } from '../terraform/data';
import { KUBE_CHAPTERS } from '../kubernetes/data/topics';

// Import capstone datasets
import { GIT_CAPSTONES } from '../platform/capstones/data/gitCapstones';
import { LINUX_CAPSTONES } from '../platform/capstones/data/linuxCapstones';
import { DOCKER_CAPSTONES } from '../platform/capstones/data/dockerCapstones';
import { DEVOPS_CAPSTONES } from '../platform/capstones/data/devopsCapstones';
import { TERRAFORM_CAPSTONES } from '../platform/capstones/data/terraformCapstones';
import { KUBERNETES_CAPSTONES } from '../platform/capstones/data/kubernetesCapstones';

describe('Real-World Capstone Projects in Last Chapter of Every Section Audit', () => {
  it('Section 1 (Git): Last chapter is Chapter 35 and has 4 rich capstones', () => {
    const lastChapter = GIT_35_CHAPTERS[GIT_35_CHAPTERS.length - 1];
    expect(lastChapter.id).toBe('ch-35');
    expect(parseInt(lastChapter.number, 10)).toBe(35);
    expect(GIT_CAPSTONES.length).toBe(4);

    GIT_CAPSTONES.forEach((cap) => {
      expect(cap.id).toBeDefined();
      expect(cap.code).toMatch(/^GIT-/);
      expect(cap.tasks.length).toBeGreaterThanOrEqual(3);
      expect(cap.objectives.length).toBeGreaterThanOrEqual(3);
      expect(cap.validationChecks.length).toBeGreaterThanOrEqual(3);
      expect(cap.failureScenarios.length).toBeGreaterThanOrEqual(2);
      expect(cap.expectedOutcome).toBeDefined();
    });
  });

  it('Section 2 (Linux): Last chapter is Chapter 30 and has 5 rich capstones', () => {
    const lastChapter = LINUX_30_CHAPTERS[LINUX_30_CHAPTERS.length - 1];
    expect(lastChapter.number).toBe('30');
    expect(LINUX_CAPSTONES.length).toBe(5);

    LINUX_CAPSTONES.forEach((cap) => {
      expect(cap.id).toBeDefined();
      expect(cap.code).toMatch(/^LINUX-/);
      expect(cap.tasks.length).toBeGreaterThanOrEqual(3);
      expect(cap.objectives.length).toBeGreaterThanOrEqual(3);
      expect(cap.validationChecks.length).toBeGreaterThanOrEqual(3);
      expect(cap.failureScenarios.length).toBeGreaterThanOrEqual(2);
      expect(cap.expectedOutcome).toBeDefined();
    });
  });

  it('Section 3 (Docker): Last chapter is Chapter 68 and has 5 rich capstones', () => {
    const lastChapter = ALL_DOCKER_CHAPTERS[ALL_DOCKER_CHAPTERS.length - 1];
    expect(lastChapter.number).toBe(68);
    expect(DOCKER_CAPSTONES.length).toBe(5);

    DOCKER_CAPSTONES.forEach((cap) => {
      expect(cap.id).toBeDefined();
      expect(cap.code).toMatch(/^DOCKER-/);
      expect(cap.tasks.length).toBeGreaterThanOrEqual(3);
      expect(cap.objectives.length).toBeGreaterThanOrEqual(3);
      expect(cap.validationChecks.length).toBeGreaterThanOrEqual(3);
      expect(cap.failureScenarios.length).toBeGreaterThanOrEqual(2);
      expect(cap.expectedOutcome).toBeDefined();
    });
  });

  it('Section 4 (DevOps): Last chapter is Chapter 29 and has 5 rich capstones', () => {
    const lastChapter = DEVOPS_29_CHAPTERS[DEVOPS_29_CHAPTERS.length - 1];
    expect(lastChapter.number).toBe(29);
    expect(DEVOPS_CAPSTONES.length).toBe(5);

    DEVOPS_CAPSTONES.forEach((cap) => {
      expect(cap.id).toBeDefined();
      expect(cap.code).toMatch(/^DEVOPS-/);
      expect(cap.tasks.length).toBeGreaterThanOrEqual(3);
      expect(cap.objectives.length).toBeGreaterThanOrEqual(3);
      expect(cap.validationChecks.length).toBeGreaterThanOrEqual(3);
      expect(cap.failureScenarios.length).toBeGreaterThanOrEqual(2);
      expect(cap.expectedOutcome).toBeDefined();
    });
  });

  it('Section 5 (Terraform): Last chapter is Chapter 50 and has 5 rich capstones', () => {
    const lastChapter = ALL_TERRAFORM_CHAPTERS[ALL_TERRAFORM_CHAPTERS.length - 1];
    expect(lastChapter.number).toBe(50);
    expect(TERRAFORM_CAPSTONES.length).toBe(5);

    TERRAFORM_CAPSTONES.forEach((cap) => {
      expect(cap.id).toBeDefined();
      expect(cap.code).toMatch(/^TERRAFORM-/);
      expect(cap.tasks.length).toBeGreaterThanOrEqual(3);
      expect(cap.objectives.length).toBeGreaterThanOrEqual(3);
      expect(cap.validationChecks.length).toBeGreaterThanOrEqual(3);
      expect(cap.failureScenarios.length).toBeGreaterThanOrEqual(2);
      expect(cap.expectedOutcome).toBeDefined();
    });
  });

  it('Section 6 (Kubernetes): Last chapter is Chapter 15 and has 6 rich capstones', () => {
    const lastChapter = KUBE_CHAPTERS[KUBE_CHAPTERS.length - 1];
    expect(lastChapter.number).toBe(15);
    expect(KUBERNETES_CAPSTONES.length).toBe(6);

    KUBERNETES_CAPSTONES.forEach((cap) => {
      expect(cap.id).toBeDefined();
      expect(cap.code).toMatch(/^K8S-/);
      expect(cap.tasks.length).toBeGreaterThanOrEqual(3);
      expect(cap.objectives.length).toBeGreaterThanOrEqual(3);
      expect(cap.validationChecks.length).toBeGreaterThanOrEqual(3);
      expect(cap.failureScenarios.length).toBeGreaterThanOrEqual(2);
      expect(cap.expectedOutcome).toBeDefined();
    });
  });

  it('Verifies UI components directly embed Capstones in the last chapter for all 6 sections', () => {
    // 1. Kubernetes Chapter 15
    const kubeFile = fs.readFileSync(
      path.resolve(__dirname, '../kubernetes/components/academy/PodAcademyView.tsx'),
      'utf-8'
    );
    expect(kubeFile).toContain('KUBERNETES_CAPSTONES');
    expect(kubeFile).toContain('currentChapter?.number === 15');
    expect(kubeFile).toContain('Kubernetes Academy Capstone Projects (Chapter 15)');

    // 2. Terraform Chapter 50
    const tfFile = fs.readFileSync(
      path.resolve(__dirname, '../terraform/components/TerraformLessonView.tsx'),
      'utf-8'
    );
    expect(tfFile).toContain('TERRAFORM_CAPSTONES');
    expect(tfFile).toContain('lesson.chapterNumber === 50');
    expect(tfFile).toContain('Terraform Academy Capstone Projects (Chapter 50)');

    // 3. Docker Chapter 68
    const dockerFile = fs.readFileSync(
      path.resolve(__dirname, '../docker/components/simulators/UniversalDockerLessonView.tsx'),
      'utf-8'
    );
    expect(dockerFile).toContain('DOCKER_CAPSTONES');
    expect(dockerFile).toContain("concept.topicNumber === '68'");
    expect(dockerFile).toContain('Docker Academy Capstone Projects (Chapter 68)');

    // 4. Linux Chapter 30
    const linuxFile = fs.readFileSync(
      path.resolve(__dirname, '../linuxforge/components/academy/LinuxTeachingEngine.tsx'),
      'utf-8'
    );
    expect(linuxFile).toContain('LINUX_CAPSTONES');
    expect(linuxFile).toContain("concept.topicNumber === '30'");
    expect(linuxFile).toContain('Linux Academy Capstone Projects (Chapter 30)');

    // 5. Git Chapter 35
    const gitFile = fs.readFileSync(
      path.resolve(__dirname, '../git/components/academy/UniversalConceptView.tsx'),
      'utf-8'
    );
    expect(gitFile).toContain('GIT_CAPSTONES');
    expect(gitFile).toContain('chNum === 35');
    expect(gitFile).toContain('Git Academy Capstone Projects (Chapter 35)');

    // 6. DevOps Chapter 29
    const devopsFile = fs.readFileSync(
      path.resolve(__dirname, '../devops/components/DevOpsAcademyMasterView.tsx'),
      'utf-8'
    );
    expect(devopsFile).toContain('DEVOPS_CAPSTONES');
    expect(devopsFile).toContain('ch.number === 29');
    expect(devopsFile).toContain('DevOps Academy Capstone Projects (Chapter 29)');
  });
});
