import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { KUBE_CHAPTERS } from '../../data/topics';
import {
  StandardConceptsUniverse,
  UniverseConceptItem,
  UniverseTopicFilter,
} from '../../../platform/layout/StandardConceptsUniverse';
import { Compass } from 'lucide-react';

export const PodConceptsUniverseView: React.FC = () => {
  const { setMode, setActiveConceptId } = useApp();

  // Convert chapters to universe topic filters
  const topics: UniverseTopicFilter[] = useMemo(() => {
    return KUBE_CHAPTERS.map((ch) => ({
      id: ch.id,
      number: String(ch.number).padStart(2, '0'),
      title: ch.title,
    }));
  }, []);

  // Convert all 50 concepts to standard universe items
  const concepts: UniverseConceptItem[] = useMemo(() => {
    return KUBE_CHAPTERS.flatMap((ch) =>
      ch.concepts.map((c) => {
        return {
          id: c.id,
          command: c.commandPill || `kubectl get ${c.id.replace('c-k8s-', '')}`,
          title: c.title,
          subtitle: c.description,
          topicId: ch.id,
          topicNumber: String(ch.number).padStart(2, '0'),
          topicTitle: ch.title,
          difficulty: c.difficulty,
          whatIsIt: c.whatIsIt || c.description,
          whyDoWeNeedIt: c.explanation,
          variations: c.kubectlCommands?.map((cmd) => ({
            title: cmd,
            syntax: cmd,
            whatItDoes: `Execute ${cmd} against Kubernetes API`,
          })),
          scenarios: c.quizQuestion
            ? [
                {
                  title: `${c.title} Knowledge Check`,
                  question: c.quizQuestion.question,
                  options: c.quizQuestion.options.map((opt) => ({
                    label: opt.label || opt.text,
                    command: opt.text,
                    isCorrect: opt.isCorrect,
                    explanation: opt.explanation,
                  })),
                },
              ]
            : undefined,
          mistakes: c.commonPitfalls?.map((p) => ({
            mistake: p.mistake,
            whyWrong: p.whyItHappens,
            correctWay: p.fix,
          })),
        };
      })
    );
  }, []);

  const handleLaunchLesson = (conceptId: string) => {
    setActiveConceptId(conceptId);
    setMode('academy');
  };

  return (
    <StandardConceptsUniverse
      academyName="Kubernetes"
      totalConceptCount={71}
      topics={topics}
      concepts={concepts}
      accentColor="#60a5fa"
      accentGradient="linear-gradient(135deg, #326ce5 0%, #1e40af 100%)"
      brandIcon={Compass}
      onLaunchLesson={handleLaunchLesson}
    />
  );
};
