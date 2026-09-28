import { LinuxTopic, UniversalLinuxConcept } from '../unifiedLinuxData';
import { MODULE_01_FUNDAMENTALS } from './ch01_01_fundamentals';
import { MODULE_02_FILES_DIRS } from './ch01_02_files_dirs';
import { MODULE_03_TEXT_PROCESSING } from './ch01_03_text_processing';
import { MODULE_04_PERMISSIONS } from './ch01_04_permissions';
import { MODULE_05_PROCESSES } from './ch01_05_processes';
import { MODULE_06_SERVICES } from './ch01_06_services';
import { MODULE_07_SHELL_BASH } from './ch01_07_shell_bash';
import { MODULE_08_TROUBLESHOOTING } from './ch01_08_troubleshooting';

export type { LinuxTopic, UniversalLinuxConcept };

/**
 * Chapter 01: Linux & System Fundamentals (Exact 8-Module Alignment)
 * 01.1 Linux Fundamentals
 * 01.2 Files & Directories
 * 01.3 File Content & Text Processing
 * 01.4 Permissions
 * 01.5 Processes
 * 01.6 Services
 * 01.7 Shell & Bash
 * 01.8 Linux Troubleshooting
 */
export const LINUX_8_MODULES: LinuxTopic[] = [
  MODULE_01_FUNDAMENTALS,
  MODULE_02_FILES_DIRS,
  MODULE_03_TEXT_PROCESSING,
  MODULE_04_PERMISSIONS,
  MODULE_05_PROCESSES,
  MODULE_06_SERVICES,
  MODULE_07_SHELL_BASH,
  MODULE_08_TROUBLESHOOTING,
];

// Aliases for compatibility
export const LINUX_CHAPTER_01_MODULES = LINUX_8_MODULES;
export const LINUX_15_TOPICS = LINUX_8_MODULES;
export const LINUX_TOPICS = LINUX_8_MODULES;

export const TOTAL_LINUX_TOPICS = LINUX_8_MODULES.length;

export const ALL_LINUX_CONCEPTS: UniversalLinuxConcept[] = LINUX_8_MODULES.flatMap(
  (topic) => topic.concepts
);

export const TOTAL_LINUX_CONCEPTS = ALL_LINUX_CONCEPTS.length;

export function getAllLinuxConcepts(): UniversalLinuxConcept[] {
  return ALL_LINUX_CONCEPTS;
}

export function getLinuxConceptById(id: string): UniversalLinuxConcept | undefined {
  return ALL_LINUX_CONCEPTS.find((c) => c.id === id);
}

export function getLinuxTopicById(id: string): LinuxTopic | undefined {
  return LINUX_8_MODULES.find((t) => t.id === id);
}

export function getLinuxTopicForConcept(conceptId: string): LinuxTopic | undefined {
  return LINUX_8_MODULES.find((t) => t.concepts.some((c) => c.id === conceptId));
}
