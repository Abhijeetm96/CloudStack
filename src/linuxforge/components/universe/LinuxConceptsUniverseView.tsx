import React, { useMemo } from 'react';
import { useLinux } from '../../context/LinuxContext';
import { LINUX_15_TOPICS, TOTAL_LINUX_CONCEPTS } from '../../data/topics';
import {
  StandardConceptsUniverse,
  UniverseConceptItem,
  UniverseTopicFilter,
} from '../../../platform/layout/StandardConceptsUniverse';
import { Terminal } from 'lucide-react';

export const LinuxConceptsUniverseView: React.FC = () => {
  const { setMode, setActiveConceptId, setActiveTopicId } = useLinux();

  // Convert topics to universe filters
  const topics: UniverseTopicFilter[] = useMemo(() => {
    return LINUX_15_TOPICS.map((t) => ({
      id: t.id,
      number: t.number,
      title: t.title,
    }));
  }, []);

  // Convert all Linux concepts to standard universe items
  const concepts: UniverseConceptItem[] = useMemo(() => {
    return LINUX_15_TOPICS.flatMap((t) =>
      t.concepts.map((c) => ({
        id: c.id,
        command: c.command,
        title: c.title,
        subtitle: c.subtitle,
        topicId: t.id,
        topicNumber: t.number,
        topicTitle: t.title,
        difficulty: c.difficulty,
        whatIsIt: c.whatIsIt,
        whyDoWeNeedIt: c.whyDoYouNeedIt,
        variations: c.variations,
        mistakes: c.commonMistakes?.map((m) => ({
          mistake: m.mistake,
          whyWrong: m.whyWrong || m.whyItHappens || 'Can cause unexpected behavior or errors',
          correctWay: m.correctWay || m.howToFix || 'Follow standard system practices',
        })) || [],
      }))
    );
  }, []);

  const handleLaunchLesson = (conceptId: string) => {
    setActiveConceptId(conceptId);
    const parentTopic = LINUX_15_TOPICS.find((t) => t.concepts.some((c) => c.id === conceptId));
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
