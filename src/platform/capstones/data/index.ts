import { CapstoneProject, CapstoneAcademy, CapstoneDifficulty } from '../types';
import { GIT_CAPSTONES } from './gitCapstones';
import { LINUX_CAPSTONES } from './linuxCapstones';
import { DOCKER_CAPSTONES } from './dockerCapstones';
import { DEVOPS_CAPSTONES } from './devopsCapstones';
import { TERRAFORM_CAPSTONES } from './terraformCapstones';
import { KUBERNETES_CAPSTONES } from './kubernetesCapstones';
import { ULTIMATE_CAPSTONE } from './ultimateCapstone';

export {
  GIT_CAPSTONES,
  LINUX_CAPSTONES,
  DOCKER_CAPSTONES,
  DEVOPS_CAPSTONES,
  TERRAFORM_CAPSTONES,
  KUBERNETES_CAPSTONES,
  ULTIMATE_CAPSTONE,
};

export const ALL_CAPSTONES: CapstoneProject[] = [
  ...GIT_CAPSTONES,
  ...LINUX_CAPSTONES,
  ...DOCKER_CAPSTONES,
  ...DEVOPS_CAPSTONES,
  ...TERRAFORM_CAPSTONES,
  ...KUBERNETES_CAPSTONES,
  ULTIMATE_CAPSTONE,
];

export const TOTAL_CAPSTONE_PROJECTS = ALL_CAPSTONES.length; // Exactly 31

export const CAPSTONE_COUNTS_BY_ACADEMY: Record<CapstoneAcademy, number> = {
  git: GIT_CAPSTONES.length, // 4
  linux: LINUX_CAPSTONES.length, // 5
  docker: DOCKER_CAPSTONES.length, // 5
  devops: DEVOPS_CAPSTONES.length, // 5
  terraform: TERRAFORM_CAPSTONES.length, // 5
  kubernetes: KUBERNETES_CAPSTONES.length, // 6
  'cross-academy': 1, // 1
};

export function getAllCapstones(): CapstoneProject[] {
  return ALL_CAPSTONES;
}

export function getCapstonesByAcademy(academy: CapstoneAcademy): CapstoneProject[] {
  if (academy === 'cross-academy') {
    return [ULTIMATE_CAPSTONE];
  }
  return ALL_CAPSTONES.filter((p) => p.academy === academy);
}

export function getCapstoneById(id: string): CapstoneProject | undefined {
  return ALL_CAPSTONES.find((p) => p.id === id || p.code.toLowerCase() === id.toLowerCase());
}

export function searchCapstones(query: string): CapstoneProject[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_CAPSTONES;

  return ALL_CAPSTONES.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.overview.toLowerCase().includes(q) ||
      p.academy.toLowerCase().includes(q) ||
      p.difficulty.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export function filterCapstonesByDifficulty(difficulty: CapstoneDifficulty): CapstoneProject[] {
  return ALL_CAPSTONES.filter((p) => p.difficulty === difficulty);
}
