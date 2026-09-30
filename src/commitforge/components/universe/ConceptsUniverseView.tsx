import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  COMMITFORGE_35_CHAPTERS,
  TOTAL_COMMITFORGE_CONCEPTS,
} from '../../data/unifiedAcademyData';
import {
  StandardConceptsUniverse,
  UniverseConceptItem,
  UniverseTopicFilter,
  CurriculumPackFilter,
} from '../../../platform/layout/StandardConceptsUniverse';
import { syncUrlWithMode } from '../../../platform/routing/urlRouter';
import { GitBranch } from 'lucide-react';

const COMMITFORGE_CURRICULUM_PACKS: CurriculumPackFilter[] = [
  { id: 'all', title: 'All 35 Chapters', range: [1, 35] },
  { id: 'pack-1', title: 'Pack 1: Foundations (01-05)', range: [1, 5] },
  { id: 'pack-2', title: 'Pack 2: Commits & Branches (06-10)', range: [6, 10] },
  { id: 'pack-3', title: 'Pack 3: Collab & Internals (11-15)', range: [11, 15] },
  { id: 'pack-4', title: 'Pack 4: CI/CD Foundations (16-20)', range: [16, 20] },
  { id: 'pack-5', title: 'Pack 5: Docker & Security (21-25)', range: [21, 25] },
  { id: 'pack-6', title: 'Pack 6: Deploy & Releases (26-30)', range: [26, 30] },
  { id: 'pack-7', title: 'Pack 7: Capstones & SRE (31-35)', range: [31, 35] },
];

export const ConceptsUniverseView: React.FC = () => {
  const { setMode, setActiveLessonConcept, setAcademyTab } = useApp();

  // Convert all 35 chapters to universe topic filters
  const topics: UniverseTopicFilter[] = useMemo(() => {
    return COMMITFORGE_35_CHAPTERS.map((t) => ({
      id: t.id,
      number: t.number,
      title: t.title,
    }));
  }, []);

  // Convert all 481 CommitForge concepts to standard universe items
  const concepts: UniverseConceptItem[] = useMemo(() => {
    return COMMITFORGE_35_CHAPTERS.flatMap((t) =>
      t.concepts.map((c) => {
        // Build scenarios
        const scenarios =
          c.scenarios && c.scenarios.length > 0
            ? c.scenarios.map((s: any) => ({
                id: s.id,
                title: s.title,
                context: s.context || s.whenToUse,
                question: s.question || s.title,
                options: s.options?.map((opt: any) => ({
                  label: opt.label,
                  command: opt.command || opt.label,
                  isCorrect: opt.isCorrect,
                  explanation: opt.explanation,
                })),
              }))
            : c.challenge
            ? [
                {
                  title: `${c.title} Knowledge Check`,
                  context: c.realWorldScenario || c.inSimpleWords,
                  question: (c.challenge as any).question || (c.challenge as any).title,
                  options: (c.challenge as any).options?.map((opt: any) => ({
                    label: opt.label,
                    command: opt.label,
                    isCorrect: opt.isCorrect,
                    explanation: opt.explanation,
                  })),
                },
              ]
            : undefined;

        // Build mistakes
        const mistakes =
          c.commonMistakes?.map((m: any) => ({
            mistake: m.mistake,
            whyWrong:
              m.whyWrong ||
              m.whyItHappens ||
              'Can cause uncommitted work to be lost or history to diverge.',
            correctWay:
              m.correctWay ||
              m.fix ||
              m.howToFix ||
              'Follow standard safe Git practices.',
          })) || [];

        // Build comparisons
        const comparisons =
          c.commandComparisons?.map((comp: any) => ({
            itemA: comp.commandA,
            itemB: comp.commandB,
            difference: `${comp.aspect}: ${comp.descriptionA} vs ${comp.descriptionB}`,
          })) ||
          (c.withoutVsWith
            ? [
                {
                  itemA: c.withoutVsWith.without.title,
                  itemB: c.withoutVsWith.with.title,
                  difference: `${c.withoutVsWith.without.outcome} ➔ ${c.withoutVsWith.with.outcome}`,
                },
              ]
            : undefined);

        return {
          id: c.id,
          command: c.command,
          title: c.title,
          subtitle: c.subtitle || c.shortDesc || c.inSimpleWords,
          subChapterNumber: c.subChapterNum || c.subChapterNumber,
          badges: c.badges,
          topicId: t.id,
          topicNumber: t.number,
          topicTitle: t.title,
          difficulty: c.difficulty || 'Beginner',
          whatIsIt: c.whatIsIt || c.inSimpleWords,
          whyDoWeNeedIt: c.whyDoYouNeedIt,
          variations: c.variations?.map((v: any) => ({
            title: v.title,
            syntax: v.syntax || v.snippet,
            whatItDoes: v.whatItDoes || v.desc,
            example: v.example,
            whenToUse: v.whenToUse,
            warning: v.warning,
          })),
          scenarios,
          mistakes,
          comparisons,
        };
      })
    );
  }, []);

  const handleLaunchLesson = (conceptId: string) => {
    setActiveLessonConcept(conceptId);
    setMode('learn');
    if (setAcademyTab) {
      setAcademyTab('Learn');
    }
    syncUrlWithMode('learn', conceptId);
  };

  return (
    <div
      className="concepts-universe-view-container"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <StandardConceptsUniverse
        academyName="Git & CI/CD"
        totalConceptCount={TOTAL_COMMITFORGE_CONCEPTS}
        topics={topics}
        concepts={concepts}
        accentColor="#f05033"
        accentGradient="linear-gradient(135deg, #f05033 0%, #dc2626 100%)"
        brandIcon={GitBranch}
        curriculumPacks={COMMITFORGE_CURRICULUM_PACKS}
        onLaunchLesson={handleLaunchLesson}
      />
    </div>
  );
};
