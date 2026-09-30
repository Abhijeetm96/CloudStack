import React, { useMemo } from 'react';
import { useDocker } from '../../context/DockerContext';
import { DOCKER_14_TOPICS, DOCKER_UNIVERSAL_CONCEPTS } from '../../data/unifiedDockerData';
import { ensureFullConceptData } from '../../data/conceptDataEnricher';
import {
  StandardConceptsUniverse,
  UniverseConceptItem,
  UniverseTopicFilter,
} from '../../../platform/layout/StandardConceptsUniverse';
import { Container } from 'lucide-react';

export const DockerConceptsUniverseView: React.FC = () => {
  const { setMode, setActiveConceptId, setActiveTopicId } = useDocker();

  // Convert topics to universe filters
  const topics: UniverseTopicFilter[] = useMemo(() => {
    return DOCKER_14_TOPICS.map((t) => ({
      id: t.id,
      number: t.number,
      title: t.title,
    }));
  }, []);

  // Convert all 42 concepts to standard universe items
  const concepts: UniverseConceptItem[] = useMemo(() => {
    return DOCKER_14_TOPICS.flatMap((t) =>
      t.concepts.map((cRef) => {
        const raw = DOCKER_UNIVERSAL_CONCEPTS[cRef.id] || {
          id: cRef.id,
          topicId: t.id,
          topicNumber: t.number,
          topicTitle: t.title,
          title: cRef.title,
          command: cRef.command,
          difficulty: cRef.difficulty,
          shortDesc: cRef.shortDesc,
        };
        const full = ensureFullConceptData(raw as any);

        return {
          id: full.id,
          command: full.command,
          title: full.title,
          subtitle: full.subtitle || cRef.shortDesc,
          topicId: t.id,
          topicNumber: t.number,
          topicTitle: t.title,
          difficulty: full.difficulty,
          whatIsIt: full.whatIsIt,
          whyDoWeNeedIt: full.whyDoYouNeedIt,
          variations: full.variations,
          scenarios: full.scenarios?.map((s) => ({
            id: s.id,
            title: s.title,
            context: s.context,
            question: s.question,
            options: s.options,
          })),
          mistakes: full.commonMistakes?.map((m) => ({
            mistake: m.mistake,
            whyWrong: m.whyWrong,
            correctWay: m.correctWay,
          })),
        };
      })
    );
  }, []);

  const handleLaunchLesson = (conceptId: string) => {
    setActiveConceptId(conceptId);
    const parentTopic = DOCKER_14_TOPICS.find((t) => t.concepts.some((c) => c.id === conceptId));
    if (parentTopic) {
      setActiveTopicId(parentTopic.id);
    }
    setMode('academy');
  };

  return (
    <StandardConceptsUniverse
      academyName="Docker"
      totalConceptCount={42}
      topics={topics}
      concepts={concepts}
      accentColor="#38bdf8"
      accentGradient="linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)"
      brandIcon={Container}
      onLaunchLesson={handleLaunchLesson}
    />
  );
};
