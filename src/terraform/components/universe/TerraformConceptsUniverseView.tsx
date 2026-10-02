import React, { useMemo } from 'react';
import { ALL_TERRAFORM_CHAPTERS, ALL_TERRAFORM_LESSONS } from '../../data';
import {
  StandardConceptsUniverse,
  UniverseConceptItem,
  UniverseTopicFilter,
  CurriculumPackFilter,
} from '../../../platform/layout/StandardConceptsUniverse';
import { Layers } from 'lucide-react';

export interface TerraformConceptsUniverseViewProps {
  onSelectLesson: (lessonId: string) => void;
}

export const TerraformConceptsUniverseView: React.FC<TerraformConceptsUniverseViewProps> = ({
  onSelectLesson,
}) => {
  // Convert all 50 chapters to universe filters
  const topics: UniverseTopicFilter[] = useMemo(() => {
    return ALL_TERRAFORM_CHAPTERS.map((ch) => ({
      id: ch.id,
      number: String(ch.number).padStart(2, '0'),
      title: ch.title,
    }));
  }, []);

  // Standard 6-Pack Curriculum groupings for 50 chapters
  const curriculumPacks: CurriculumPackFilter[] = useMemo(
    () => [
      { id: 'all', title: 'All Chapters (1-50)', range: [1, 50] },
      { id: 'pack-1', title: 'Pack 1: Foundations & Architecture (1-8)', range: [1, 8] },
      { id: 'pack-2', title: 'Pack 2: Language, State & Modules (9-17)', range: [9, 17] },
      { id: 'pack-3', title: 'Pack 3: Workspaces, Imports & Testing (18-26)', range: [18, 26] },
      { id: 'pack-4', title: 'Pack 4: Production, SRE & Multi-Cloud (27-35)', range: [27, 35] },
      { id: 'pack-5', title: 'Pack 5: Security, Enterprise & CI/CD (36-44)', range: [36, 44] },
      { id: 'pack-6', title: 'Pack 6: Architecture Mastery & Projects (45-50)', range: [45, 50] },
    ],
    []
  );

  // Convert all 694 Terraform lessons into standard universe concept items
  const concepts: UniverseConceptItem[] = useMemo(() => {
    return ALL_TERRAFORM_LESSONS.map((lesson) => ({
      id: lesson.id,
      command:
        lesson.commandOrConcept ||
        lesson.syntax.split('\n')[0] ||
        `terraform ${lesson.title.toLowerCase()}`,
      title: lesson.title,
      subtitle: lesson.beginnerDefinition || lesson.whatIsIt,
      subChapterNumber: lesson.subchapterNumber,
      badges: [lesson.category, lesson.difficulty, `Ch ${lesson.chapterNumber}`],
      topicId: lesson.chapterId || `ch-${String(lesson.chapterNumber).padStart(2, '0')}`,
      topicNumber: String(lesson.chapterNumber).padStart(2, '0'),
      topicTitle: lesson.chapterTitle,
      difficulty: lesson.difficulty,
      whatIsIt: lesson.whatIsIt || lesson.beginnerDefinition,
      whyDoWeNeedIt: lesson.whyExists || lesson.whyTerraformNeedsIt,
      variations: lesson.syntaxVariations?.map((v) => ({
        title: v.title,
        syntax: v.code,
        whatItDoes: v.explanation,
        whenToUse: v.whenToUse,
      })),
      scenarios: lesson.knowledgeCheck?.map((kc, idx) => ({
        id: `${lesson.id}-kc-${idx}`,
        title: `${lesson.title} Knowledge Check`,
        context: lesson.simpleExplanation,
        question: kc.question,
        options: kc.options.map((opt, oIdx) => ({
          label: opt,
          command: opt,
          isCorrect: oIdx === kc.correctIndex,
          explanation: kc.explanation,
        })),
      })),
      mistakes:
        lesson.commonMistakes?.map((m) => ({
          mistake: m.mistake,
          whyWrong: m.whyWrong,
          correctWay: m.fix,
        })) || [],
      comparisons:
        lesson.comparisonWithSimilar?.map((c) => ({
          itemA: lesson.title,
          itemB: c.concept,
          difference: c.difference,
        })) || [],
    }));
  }, []);

  return (
    <StandardConceptsUniverse
      academyName="Terraform"
      totalConceptCount={ALL_TERRAFORM_LESSONS.length}
      topics={topics}
      concepts={concepts}
      curriculumPacks={curriculumPacks}
      accentColor="#c084fc"
      accentGradient="linear-gradient(135deg, #844fba 0%, #6366f1 100%)"
      brandIcon={Layers}
      onLaunchLesson={onSelectLesson}
    />
  );
};

export default TerraformConceptsUniverseView;
