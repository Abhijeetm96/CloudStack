import { ALL_CAPSTONES } from './data';
import { CapstoneProject } from './types';

/**
 * Resolves any project ID, concept slug, or numerical subtopic into the matching CapstoneProject.
 */
export function findCapstone(
  academyProjects: CapstoneProject[],
  idOrConcept?: string,
  academy?: string
): CapstoneProject | undefined {
  if (!idOrConcept) return undefined;

  const needle = idOrConcept.toLowerCase().trim();

  // 1. Exact match in current academy projects
  let found = academyProjects.find(
    (p) => p.id.toLowerCase() === needle || p.code?.toLowerCase() === needle
  );
  if (found) return found;

  // 2. Exact match in all capstones
  found = ALL_CAPSTONES.find(
    (p) => p.id.toLowerCase() === needle || p.code?.toLowerCase() === needle
  );
  if (found) return found;

  // 3. Known chapter subchapter slug mappings
  const slugToIdMap: Record<string, string> = {
    // Docker Chapter 68
    'dk68-01-git-repository-setup': 'docker-01',
    'dk68-02-production-dockerfile-design': 'docker-01',
    'dk68-03-buildkit-optimization': 'docker-02',
    'dk68-04-multi-stage-build-implementation': 'docker-02',
    'dk68-05-container-security-scanning': 'docker-06',
    'dk68-06-docker-image-tagging-retention': 'docker-06',
    'dk68-07-private-registry-publishing': 'docker-07',
    'dk68-08-docker-compose-orchestration': 'docker-03',
    'dk68-09-isolated-multi-tier-networking': 'docker-05',
    'dk68-10-persistent-database-volume-engine': 'docker-04',
    'dk68-11-active-healthcheck-handlers': 'docker-08',

    // Kubernetes Chapter 15
    'c-should-you-manage-cluster': 'k8s-01',
    'c-control-plane-management': 'k8s-02',
    'c-worker-nodes-lifecycle': 'k8s-03',
    'c-multicluster-management': 'k8s-04',
    'c-cluster-operations-admin': 'k8s-05',
  };

  if (slugToIdMap[needle]) {
    const targetId = slugToIdMap[needle];
    const match = academyProjects.find((p) => p.id === targetId) || ALL_CAPSTONES.find((p) => p.id === targetId);
    if (match) return match;
  }

  // 4. Numeric pattern match: e.g. 'docker-04', 'dk68-04', 'ch50-02', 'c-15-3'
  const numMatch = needle.match(/(?:ch|dk|lnx|git|tf|k8s|devops|docker)?\d*[-_](\d{1,2})/);
  if (numMatch && numMatch[1]) {
    const num = parseInt(numMatch[1], 10);
    if (num >= 1 && num <= academyProjects.length) {
      return academyProjects[num - 1];
    }
  }

  // 5. Keyword search in titles
  const cleanNeedle = needle.replace(/^[a-z0-9]+-/, '').replace(/-/g, ' ');
  found = academyProjects.find((p) =>
    p.title.toLowerCase().includes(cleanNeedle) ||
    cleanNeedle.includes(p.title.toLowerCase())
  );
  if (found) return found;

  return undefined;
}
