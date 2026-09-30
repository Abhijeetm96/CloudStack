import React, { useMemo } from 'react';
import { useLinux } from '../../context/LinuxContext';
import { LINUX_30_CHAPTERS, TOTAL_LINUX_CONCEPTS } from '../../data/topics';
import {
  StandardConceptsUniverse,
  UniverseConceptItem,
  UniverseTopicFilter,
} from '../../../platform/layout/StandardConceptsUniverse';
import { Terminal } from 'lucide-react';

export const LinuxConceptsUniverseView: React.FC = () => {
  const { setMode, setActiveConceptId, setActiveTopicId } = useLinux();

  // Convert all 30 chapters to universe filters
  const topics: UniverseTopicFilter[] = useMemo(() => {
    return LINUX_30_CHAPTERS.map((t) => ({
      id: t.id,
      number: t.number,
      title: t.title,
    }));
  }, []);

  // Convert all 436 Linux concepts to standard universe items
  const concepts: UniverseConceptItem[] = useMemo(() => {
    return LINUX_30_CHAPTERS.flatMap((t) =>
      t.concepts.map((c) => ({
        id: c.id,
        command: c.command,
        title: c.title,
        subtitle: c.subtitle,
        subChapterNumber: c.subChapterNumber,
        badges: c.badges,
        topicId: t.id,
        topicNumber: t.number,
        topicTitle: t.title,
        difficulty: c.difficulty,
        whatIsIt: c.whatIsIt,
        whyDoWeNeedIt: c.whyDoYouNeedIt,
        variations: c.variations,
        scenarios: c.challenge
          ? [
              {
                title: `${c.title} Knowledge Check`,
                context: c.realWorldScenario || c.inSimpleWords,
                question: c.challenge.question,
                options: c.challenge.options?.map((opt) => ({
                  label: opt.label,
                  command: opt.label,
                  isCorrect: opt.isCorrect,
                  explanation: opt.explanation,
                })),
              },
            ]
          : undefined,
        mistakes:
          c.commonMistakes?.map((m) => ({
            mistake: m.mistake,
            whyWrong: m.whyWrong || m.whyItHappens || 'Can cause unexpected behavior or errors',
            correctWay: m.correctWay || m.howToFix || 'Follow standard system practices',
          })) || [],
        comparisons: c.withoutVsWith
          ? [
              {
                itemA: c.withoutVsWith.without.title,
                itemB: c.withoutVsWith.with.title,
                difference: `${c.withoutVsWith.without.outcome} ➔ ${c.withoutVsWith.with.outcome}`,
              },
            ]
          : undefined,
      }))
    );
  }, []);

  const handleLaunchLesson = (conceptId: string) => {
    setActiveConceptId(conceptId);
    const parentTopic = LINUX_30_CHAPTERS.find((t) => t.concepts.some((c) => c.id === conceptId));
    if (parentTopic) {
      setActiveTopicId(parentTopic.id);
    }
    setMode('academy');
  };

  return (
    <StandardConceptsUniverse
      academyName="Linux"
      totalConceptCount={TOTAL_LINUX_CONCEPTS}
      topics={topics}
      concepts={concepts}
      accentColor="#06b6d4"
      accentGradient="linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
      brandIcon={Terminal}
      onLaunchLesson={handleLaunchLesson}
    />
  );
};
