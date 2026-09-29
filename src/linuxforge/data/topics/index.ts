import { LinuxTopic, UniversalLinuxConcept } from '../unifiedLinuxData';
import { PACK_01_CHAPTERS } from '../chapters/pack01_fundamentals_to_files';
import { PACK_02_CHAPTERS } from '../chapters/pack02_cli_pipes_text_users_perms';
import { PACK_03_CHAPTERS } from '../chapters/pack03_processes_services_pkg_storage_net';
import { PACK_04_CHAPTERS } from '../chapters/pack04_ssh_env_scripts_textauto_logs';
import { PACK_05_CHAPTERS } from '../chapters/pack05_performance_security_cron_triage_admin';
import { PACK_06_CHAPTERS } from '../chapters/pack06_dev_devops_advanced_prod_projects';

export type { LinuxTopic, UniversalLinuxConcept };

/**
 * LINUXFORGE MASTER 30-CHAPTER CURRICULUM
 * 
 * Chapter 01: Linux Fundamentals (01.1 - 01.12)
 * Chapter 02: The Linux Filesystem (02.1 - 02.15)
 * Chapter 03: Navigating Linux (03.1 - 03.11)
 * Chapter 04: File Management (04.1 - 04.13)
 * Chapter 05: Viewing and Editing Files (05.1 - 05.12)
 * Chapter 06: Linux Command Line (06.1 - 06.13)
 * Chapter 07: Pipes and Redirection (07.1 - 07.14)
 * Chapter 08: Searching and Text Processing (08.1 - 08.19)
 * Chapter 09: Users and Groups (09.1 - 09.17)
 * Chapter 10: File Permissions (10.1 - 10.16)
 * Chapter 11: Processes (11.1 - 11.18)
 * Chapter 12: Services and systemd (12.1 - 12.14)
 * Chapter 13: Package Management (13.1 - 13.17)
 * Chapter 14: Disks and Storage (14.1 - 14.19)
 * Chapter 15: Linux Networking (15.1 - 15.20)
 * Chapter 16: SSH and Remote Access (16.1 - 16.16)
 * Chapter 17: Environment Variables (17.1 - 17.14)
 * Chapter 18: Shell Scripting (18.1 - 18.21)
 * Chapter 19: Text Processing & Automation (19.1 - 19.10)
 * Chapter 20: Logging & System Observability (20.1 - 20.12)
 * Chapter 21: System Performance (21.1 - 21.12)
 * Chapter 22: Linux Security (22.1 - 22.15)
 * Chapter 23: Cron & Scheduling (23.1 - 23.10)
 * Chapter 24: Filesystem & System Troubleshooting (24.1 - 24.13)
 * Chapter 25: Linux Administration (25.1 - 25.10)
 * Chapter 26: Linux for Developers (26.1 - 26.14)
 * Chapter 27: Linux for DevOps (27.1 - 27.14)
 * Chapter 28: Advanced Linux (28.1 - 28.16)
 * Chapter 29: Production Linux (29.1 - 29.14)
 * Chapter 30: Real-World Linux Projects (30.1 - 30.14)
 */
export const LINUX_30_CHAPTERS: LinuxTopic[] = [
  ...PACK_01_CHAPTERS,
  ...PACK_02_CHAPTERS,
  ...PACK_03_CHAPTERS,
  ...PACK_04_CHAPTERS,
  ...PACK_05_CHAPTERS,
  ...PACK_06_CHAPTERS,
];

// Master curriculum aliases
export const LINUX_TOPICS: LinuxTopic[] = LINUX_30_CHAPTERS;
export const LINUX_15_TOPICS: LinuxTopic[] = LINUX_30_CHAPTERS;
export const LINUX_CHAPTER_01_MODULES: LinuxTopic[] = LINUX_30_CHAPTERS;
export const LINUX_8_MODULES: LinuxTopic[] = LINUX_30_CHAPTERS.slice(0, 8);

export const TOTAL_LINUX_TOPICS: number = LINUX_30_CHAPTERS.length;

export const ALL_LINUX_CONCEPTS: UniversalLinuxConcept[] = LINUX_30_CHAPTERS.flatMap(
  (topic) => topic.concepts
);

export const TOTAL_LINUX_CONCEPTS: number = ALL_LINUX_CONCEPTS.length;

export function getAllLinuxConcepts(): UniversalLinuxConcept[] {
  return ALL_LINUX_CONCEPTS;
}

export function getLinuxConceptById(id: string): UniversalLinuxConcept | undefined {
  return ALL_LINUX_CONCEPTS.find((c) => c.id === id);
}

export function getLinuxTopicById(id: string): LinuxTopic | undefined {
  return LINUX_30_CHAPTERS.find((t) => t.id === id);
}

export function getLinuxTopicForConcept(conceptId: string): LinuxTopic | undefined {
  return LINUX_30_CHAPTERS.find((t) => t.concepts.some((c) => c.id === conceptId));
}
