import { describe, it, expect } from 'vitest';
import { findCapstone } from '../platform/capstones/capstoneUtils';
import { DOCKER_CAPSTONES } from '../platform/capstones/data/dockerCapstones';
import { KUBERNETES_CAPSTONES } from '../platform/capstones/data/kubernetesCapstones';
import { GIT_CAPSTONES } from '../platform/capstones/data/gitCapstones';
import { LINUX_CAPSTONES } from '../platform/capstones/data/linuxCapstones';
import { TERRAFORM_CAPSTONES } from '../platform/capstones/data/terraformCapstones';
import { DEVOPS_CAPSTONES } from '../platform/capstones/data/devopsCapstones';

describe('Capstone Resolution Audit across all 6 sections', () => {
  it('resolves dk68-04-multi-stage-build-implementation to docker-02', () => {
    const resolved = findCapstone(DOCKER_CAPSTONES, 'dk68-04-multi-stage-build-implementation', 'docker');
    expect(resolved).toBeDefined();
    expect(resolved?.id).toBe('docker-02');
  });

  it('resolves docker-04 directly to docker-04', () => {
    const resolved = findCapstone(DOCKER_CAPSTONES, 'docker-04', 'docker');
    expect(resolved).toBeDefined();
    expect(resolved?.id).toBe('docker-04');
  });

  it('resolves c-should-you-manage-cluster to k8s-01', () => {
    const resolved = findCapstone(KUBERNETES_CAPSTONES, 'c-should-you-manage-cluster', 'kubernetes');
    expect(resolved).toBeDefined();
    expect(resolved?.id).toBe('k8s-01');
  });

  it('resolves git, linux, terraform, and devops capstones correctly', () => {
    expect(findCapstone(GIT_CAPSTONES, 'git-01', 'git')?.id).toBe('git-01');
    expect(findCapstone(LINUX_CAPSTONES, 'linux-03', 'linux')?.id).toBe('linux-03');
    expect(findCapstone(TERRAFORM_CAPSTONES, 'terraform-05', 'terraform')?.id).toBe('terraform-05');
    expect(findCapstone(DEVOPS_CAPSTONES, 'devops-10', 'devops')?.id).toBe('devops-10');
  });
});
