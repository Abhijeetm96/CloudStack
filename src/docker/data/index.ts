import { DockerChapter, DockerSubchapterLesson } from '../types/dockerCurriculumTypes';
import { DOCKER_CURRICULUM_SPEC } from './curriculumStructure';
import { CHAPTER_01 } from './chapters/chapter01';
import { CHAPTER_02 } from './chapters/chapter02';
import { CHAPTER_03 } from './chapters/chapter03';
import { CHAPTER_04 } from './chapters/chapter04';
import { CHAPTER_05 } from './chapters/chapter05';
import { CHAPTER_06 } from './chapters/chapter06';
import { CHAPTER_07 } from './chapters/chapter07';
import { CHAPTER_08 } from './chapters/chapter08';
import { CHAPTER_09 } from './chapters/chapter09';
import { CHAPTER_10 } from './chapters/chapter10';
import { CHAPTER_11 } from './chapters/chapter11';
import { CHAPTER_12 } from './chapters/chapter12';
import { CHAPTER_13 } from './chapters/chapter13';
import { CHAPTER_14 } from './chapters/chapter14';
import { CHAPTER_15 } from './chapters/chapter15';
import { CHAPTER_16 } from './chapters/chapter16';
import { CHAPTER_17 } from './chapters/chapter17';
import { CHAPTER_18 } from './chapters/chapter18';
import { CHAPTER_19 } from './chapters/chapter19';
import { CHAPTER_20 } from './chapters/chapter20';
import { CHAPTER_21 } from './chapters/chapter21';
import { CHAPTER_22 } from './chapters/chapter22';
import { CHAPTER_23 } from './chapters/chapter23';
import { CHAPTER_24 } from './chapters/chapter24';
import { CHAPTER_25 } from './chapters/chapter25';
import { CHAPTER_26 } from './chapters/chapter26';
import { CHAPTER_27 } from './chapters/chapter27';
import { CHAPTER_28 } from './chapters/chapter28';
import { CHAPTER_29 } from './chapters/chapter29';
import { CHAPTER_30 } from './chapters/chapter30';
import { CHAPTER_31 } from './chapters/chapter31';
import { CHAPTER_32 } from './chapters/chapter32';
import { CHAPTER_33 } from './chapters/chapter33';
import { CHAPTER_34 } from './chapters/chapter34';
import { CHAPTER_35 } from './chapters/chapter35';
import { CHAPTER_36 } from './chapters/chapter36';
import { CHAPTER_37 } from './chapters/chapter37';
import { CHAPTER_38 } from './chapters/chapter38';
import { CHAPTER_39 } from './chapters/chapter39';
import { CHAPTER_40 } from './chapters/chapter40';
import { CHAPTER_41 } from './chapters/chapter41';
import { CHAPTER_42 } from './chapters/chapter42';
import { CHAPTER_43 } from './chapters/chapter43';
import { CHAPTER_44 } from './chapters/chapter44';
import { CHAPTER_45 } from './chapters/chapter45';
import { CHAPTER_46 } from './chapters/chapter46';
import { CHAPTER_47 } from './chapters/chapter47';
import { CHAPTER_48 } from './chapters/chapter48';
import { CHAPTER_49 } from './chapters/chapter49';
import { CHAPTER_50 } from './chapters/chapter50';
import { CHAPTER_51 } from './chapters/chapter51';
import { CHAPTER_52 } from './chapters/chapter52';
import { CHAPTER_53 } from './chapters/chapter53';
import { CHAPTER_54 } from './chapters/chapter54';
import { CHAPTER_55 } from './chapters/chapter55';
import { CHAPTER_56 } from './chapters/chapter56';
import { CHAPTER_57 } from './chapters/chapter57';
import { CHAPTER_58 } from './chapters/chapter58';
import { CHAPTER_59 } from './chapters/chapter59';
import { CHAPTER_60 } from './chapters/chapter60';
import { CHAPTER_61 } from './chapters/chapter61';
import { CHAPTER_62 } from './chapters/chapter62';
import { CHAPTER_63 } from './chapters/chapter63';
import { CHAPTER_64 } from './chapters/chapter64';
import { CHAPTER_65 } from './chapters/chapter65';
import { CHAPTER_66 } from './chapters/chapter66';
import { CHAPTER_67 } from './chapters/chapter67';
import { CHAPTER_68 } from './chapters/chapter68';

export const ALL_DOCKER_CHAPTERS: DockerChapter[] = [
  CHAPTER_01,
  CHAPTER_02,
  CHAPTER_03,
  CHAPTER_04,
  CHAPTER_05,
  CHAPTER_06,
  CHAPTER_07,
  CHAPTER_08,
  CHAPTER_09,
  CHAPTER_10,
  CHAPTER_11,
  CHAPTER_12,
  CHAPTER_13,
  CHAPTER_14,
  CHAPTER_15,
  CHAPTER_16,
  CHAPTER_17,
  CHAPTER_18,
  CHAPTER_19,
  CHAPTER_20,
  CHAPTER_21,
  CHAPTER_22,
  CHAPTER_23,
  CHAPTER_24,
  CHAPTER_25,
  CHAPTER_26,
  CHAPTER_27,
  CHAPTER_28,
  CHAPTER_29,
  CHAPTER_30,
  CHAPTER_31,
  CHAPTER_32,
  CHAPTER_33,
  CHAPTER_34,
  CHAPTER_35,
  CHAPTER_36,
  CHAPTER_37,
  CHAPTER_38,
  CHAPTER_39,
  CHAPTER_40,
  CHAPTER_41,
  CHAPTER_42,
  CHAPTER_43,
  CHAPTER_44,
  CHAPTER_45,
  CHAPTER_46,
  CHAPTER_47,
  CHAPTER_48,
  CHAPTER_49,
  CHAPTER_50,
  CHAPTER_51,
  CHAPTER_52,
  CHAPTER_53,
  CHAPTER_54,
  CHAPTER_55,
  CHAPTER_56,
  CHAPTER_57,
  CHAPTER_58,
  CHAPTER_59,
  CHAPTER_60,
  CHAPTER_61,
  CHAPTER_62,
  CHAPTER_63,
  CHAPTER_64,
  CHAPTER_65,
  CHAPTER_66,
  CHAPTER_67,
  CHAPTER_68,
];

export const ALL_DOCKER_LESSONS: DockerSubchapterLesson[] = ALL_DOCKER_CHAPTERS.flatMap(ch => ch.lessons);

export const DOCKER_STATS = {
  totalChapters: ALL_DOCKER_CHAPTERS.length,
  totalLessons: ALL_DOCKER_LESSONS.length,
  beginnerLessons: ALL_DOCKER_LESSONS.filter(l => l.difficulty === 'Beginner').length,
  intermediateLessons: ALL_DOCKER_LESSONS.filter(l => l.difficulty === 'Intermediate').length,
  advancedLessons: ALL_DOCKER_LESSONS.filter(l => l.difficulty === 'Advanced').length,
  expertLessons: ALL_DOCKER_LESSONS.filter(l => l.difficulty === 'Expert').length,
};

import { DOCKER_CAPSTONES } from '../../platform/capstones/data/dockerCapstones';

export function getDockerLessonById(id: string): DockerSubchapterLesson | undefined {
  const direct = ALL_DOCKER_LESSONS.find(l => l.id === id);
  if (direct) return direct;

  if (id.startsWith('docker-')) {
    const cap = DOCKER_CAPSTONES.find(c => c.id.toLowerCase() === id.toLowerCase());
    if (cap) {
      const idx = DOCKER_CAPSTONES.indexOf(cap);
      return {
        id: cap.id,
        chapterNumber: 68,
        chapterTitle: 'DOCKER CAPSTONE',
        subchapterNumber: `68.${idx + 1}`,
        subchapterTitle: cap.title,
        category: 'Hands-on Projects',
        trackGroup: 'Hands-on Projects',
        difficulty: (cap.difficulty as any) || 'Expert',
        definition: cap.overview || cap.projectOverview?.shortDescription || '',
        beginnerExplanation: cap.overview || '',
        technicalExplanation: cap.projectOverview?.shortDescription || cap.overview,
        whyItExists: cap.scenario || '',
        problemSolved: cap.problemStatement || '',
        dockerRelevance: 'Production Capstone Lab',
        analogy: '',
        mentalModel: cap.projectOverview?.shortDescription || cap.overview,
        terminology: [],
        syntax: cap.code,
        syntaxBreakdown: [],
        variations: [],
        simplestExample: `docker ${cap.id}`,
        practicalExample: `docker ${cap.id}`,
        realWorldExample: cap.scenario || '',
        productionExample: cap.scenario || '',
        whenToUse: cap.projectObjective || [],
        whenNotToUse: [],
        commonMistakes: [],
        commonMisconceptions: [],
        securityConsiderations: (Array.isArray(cap.requirements?.security) ? cap.requirements.security : []) as string[],
        performanceConsiderations: [],
        operationalConsiderations: [],
        troubleshooting: [],
        bestPractices: (Array.isArray(cap.requirements?.technical) ? cap.requirements.technical : []) as string[],
        antiPatterns: [],
        relatedConcepts: cap.tags || [],
        relatedCommands: [],
        expectedOutput: 'Production Capstone project loaded.',
        outputExplanation: [],
        guidedExercise: {
          title: cap.title,
          objective: cap.overview,
          steps: cap.projectObjective || [],
          initialSnippet: cap.code,
          solution: cap.code,
        },
        challenge: {
          scenario: cap.scenario || '',
          goal: cap.title,
          testVerification: 'verify',
          hint: 'Follow the architecture blueprint',
        },
        knowledgeCheck: {
          question: `What is the primary objective of ${cap.title}?`,
          options: [cap.overview, 'Ignore best practices', 'Use legacy tools', 'None of the above'],
          correctIndex: 0,
          explanation: cap.overview,
        },
        summary: cap.overview,
      };
    }
  }
  return undefined;
}

export function searchDockerLessons(query: string): DockerSubchapterLesson[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  return ALL_DOCKER_LESSONS.filter(l =>
    l.subchapterTitle.toLowerCase().includes(q) ||
    l.chapterTitle.toLowerCase().includes(q) ||
    l.definition.toLowerCase().includes(q) ||
    l.syntax.toLowerCase().includes(q) ||
    l.relatedCommands.some(c => c.toLowerCase().includes(q)) ||
    l.relatedConcepts.some(c => c.toLowerCase().includes(q))
  );
}

export { DOCKER_CURRICULUM_SPEC } from './curriculumStructure';
export * from '../types/dockerCurriculumTypes';
