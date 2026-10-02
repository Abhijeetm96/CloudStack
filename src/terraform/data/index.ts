import { TerraformChapter, UniversalTerraformLesson } from '../types/terraformTypes';

import { chapter01 } from './chapters/chapter01';
import { chapter02 } from './chapters/chapter02';
import { chapter03 } from './chapters/chapter03';
import { chapter04 } from './chapters/chapter04';
import { chapter05 } from './chapters/chapter05';
import { chapter06 } from './chapters/chapter06';
import { chapter07 } from './chapters/chapter07';
import { chapter08 } from './chapters/chapter08';
import { chapter09 } from './chapters/chapter09';
import { chapter10 } from './chapters/chapter10';
import { chapter11 } from './chapters/chapter11';
import { chapter12 } from './chapters/chapter12';
import { chapter13 } from './chapters/chapter13';
import { chapter14 } from './chapters/chapter14';
import { chapter15 } from './chapters/chapter15';
import { chapter16 } from './chapters/chapter16';
import { chapter17 } from './chapters/chapter17';
import { chapter18 } from './chapters/chapter18';
import { chapter19 } from './chapters/chapter19';
import { chapter20 } from './chapters/chapter20';
import { chapter21 } from './chapters/chapter21';
import { chapter22 } from './chapters/chapter22';
import { chapter23 } from './chapters/chapter23';
import { chapter24 } from './chapters/chapter24';
import { chapter25 } from './chapters/chapter25';
import { chapter26 } from './chapters/chapter26';
import { chapter27 } from './chapters/chapter27';
import { chapter28 } from './chapters/chapter28';
import { chapter29 } from './chapters/chapter29';
import { chapter30 } from './chapters/chapter30';
import { chapter31 } from './chapters/chapter31';
import { chapter32 } from './chapters/chapter32';
import { chapter33 } from './chapters/chapter33';
import { chapter34 } from './chapters/chapter34';
import { chapter35 } from './chapters/chapter35';
import { chapter36 } from './chapters/chapter36';
import { chapter37 } from './chapters/chapter37';
import { chapter38 } from './chapters/chapter38';
import { chapter39 } from './chapters/chapter39';
import { chapter40 } from './chapters/chapter40';
import { chapter41 } from './chapters/chapter41';
import { chapter42 } from './chapters/chapter42';
import { chapter43 } from './chapters/chapter43';
import { chapter44 } from './chapters/chapter44';
import { chapter45 } from './chapters/chapter45';
import { chapter46 } from './chapters/chapter46';
import { chapter47 } from './chapters/chapter47';
import { chapter48 } from './chapters/chapter48';
import { chapter49 } from './chapters/chapter49';
import { chapter50 } from './chapters/chapter50';

export {
  chapter01, chapter02, chapter03, chapter04, chapter05,
  chapter06, chapter07, chapter08, chapter09, chapter10,
  chapter11, chapter12, chapter13, chapter14, chapter15,
  chapter16, chapter17, chapter18, chapter19, chapter20,
  chapter21, chapter22, chapter23, chapter24, chapter25,
  chapter26, chapter27, chapter28, chapter29, chapter30,
  chapter31, chapter32, chapter33, chapter34, chapter35,
  chapter36, chapter37, chapter38, chapter39, chapter40,
  chapter41, chapter42, chapter43, chapter44, chapter45,
  chapter46, chapter47, chapter48, chapter49, chapter50
};

export const ALL_TERRAFORM_CHAPTERS: TerraformChapter[] = [
  chapter01, chapter02, chapter03, chapter04, chapter05,
  chapter06, chapter07, chapter08, chapter09, chapter10,
  chapter11, chapter12, chapter13, chapter14, chapter15,
  chapter16, chapter17, chapter18, chapter19, chapter20,
  chapter21, chapter22, chapter23, chapter24, chapter25,
  chapter26, chapter27, chapter28, chapter29, chapter30,
  chapter31, chapter32, chapter33, chapter34, chapter35,
  chapter36, chapter37, chapter38, chapter39, chapter40,
  chapter41, chapter42, chapter43, chapter44, chapter45,
  chapter46, chapter47, chapter48, chapter49, chapter50
];

export const ALL_TERRAFORM_LESSONS: UniversalTerraformLesson[] = ALL_TERRAFORM_CHAPTERS.flatMap(
  (ch) => ch.subchapters
);

export const TERRAFORM_LESSON_MAP: Map<string, UniversalTerraformLesson> = new Map(
  ALL_TERRAFORM_LESSONS.map((l) => [l.id, l])
);

export function getTerraformLessonById(id: string): UniversalTerraformLesson | undefined {
  return TERRAFORM_LESSON_MAP.get(id);
}

export function getNextTerraformLesson(currentId: string): UniversalTerraformLesson | null {
  const index = ALL_TERRAFORM_LESSONS.findIndex((l) => l.id === currentId);
  if (index >= 0 && index < ALL_TERRAFORM_LESSONS.length - 1) {
    return ALL_TERRAFORM_LESSONS[index + 1];
  }
  return null;
}

export function getPrevTerraformLesson(currentId: string): UniversalTerraformLesson | null {
  const index = ALL_TERRAFORM_LESSONS.findIndex((l) => l.id === currentId);
  if (index > 0) {
    return ALL_TERRAFORM_LESSONS[index - 1];
  }
  return null;
}

export interface TerraformSearchResult {
  lesson: UniversalTerraformLesson;
  matchedField: string;
  matchedSnippet: string;
}

export function searchTerraformLessons(query: string, limit = 20): TerraformSearchResult[] {
  const cleanQ = query.trim().toLowerCase();
  if (!cleanQ) return [];

  const results: TerraformSearchResult[] = [];

  for (const lesson of ALL_TERRAFORM_LESSONS) {
    if (lesson.title.toLowerCase().includes(cleanQ)) {
      results.push({ lesson, matchedField: 'Title', matchedSnippet: lesson.title });
    } else if (lesson.commandOrConcept.toLowerCase().includes(cleanQ)) {
      results.push({ lesson, matchedField: 'Concept', matchedSnippet: lesson.commandOrConcept });
    } else if (lesson.beginnerDefinition.toLowerCase().includes(cleanQ)) {
      results.push({ lesson, matchedField: 'Definition', matchedSnippet: lesson.beginnerDefinition.slice(0, 100) + '...' });
    } else if (lesson.syntax.toLowerCase().includes(cleanQ)) {
      results.push({ lesson, matchedField: 'Syntax', matchedSnippet: lesson.syntax.slice(0, 80) });
    } else if (lesson.relatedCommands.some((c) => c.toLowerCase().includes(cleanQ))) {
      results.push({ lesson, matchedField: 'Command', matchedSnippet: lesson.relatedCommands.join(', ') });
    } else if (lesson.troubleshooting.some((t) => t.symptom.toLowerCase().includes(cleanQ) || t.cause.toLowerCase().includes(cleanQ))) {
      results.push({ lesson, matchedField: 'Troubleshooting', matchedSnippet: 'Troubleshooting guide match' });
    }

    if (results.length >= limit) break;
  }

  return results;
}
