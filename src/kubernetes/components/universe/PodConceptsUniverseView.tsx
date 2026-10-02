import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { KUBE_CHAPTERS } from '../../data/topics';
import {
  StandardConceptsUniverse,
  UniverseConceptItem,
  UniverseTopicFilter,
  CurriculumPackFilter,
} from '../../../platform/layout/StandardConceptsUniverse';
import { Compass } from 'lucide-react';

const KUBE_CURRICULUM_PACKS: CurriculumPackFilter[] = [
  { id: 'all', title: 'All Chapters (1–15)', range: [1, 15] },
  { id: 'pack-1', title: 'Pack 1: Foundations & Architecture (Ch 1–3)', range: [1, 3] },
  { id: 'pack-2', title: 'Pack 2: Workloads & Config (Ch 4–6)', range: [4, 6] },
  { id: 'pack-3', title: 'Pack 3: Governance & Observability (Ch 7–9)', range: [7, 9] },
  { id: 'pack-4', title: 'Pack 4: Autoscaling & Storage (Ch 10–12)', range: [10, 12] },
  { id: 'pack-5', title: 'Pack 5: Deployments & Operations (Ch 13–15)', range: [13, 15] },
];

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

  // Convert all 71 concepts across 15 chapters to standard universe items
  const concepts: UniverseConceptItem[] = useMemo(() => {
    return KUBE_CHAPTERS.flatMap((ch) =>
      ch.concepts.map((c) => {
        return {
          id: c.id,
          command: c.commandPill || `kubectl get ${c.id.replace('c-k8s-', '')}`,
          title: c.title,
          subtitle: c.description,
          subChapterNumber: c.number,
          badges: [ch.category, c.difficulty, c.badge || `Ch ${ch.number}`],
          topicId: ch.id,
          topicNumber: String(ch.number).padStart(2, '0'),
          topicTitle: ch.title,
          difficulty: c.difficulty,
          whatIsIt: c.whatIsIt || c.description,
          whyDoWeNeedIt: c.inSimpleWords || c.explanation,
          variations: [
            ...(c.kubectlCommands?.map((cmd) => ({
              title: cmd,
              syntax: cmd,
              whatItDoes: `Execute ${cmd} against Kubernetes API`,
              example: cmd,
            })) || []),
            ...(c.yamlSnippet
              ? [
                  {
                    title: `${c.title} Manifest`,
                    syntax: c.yamlSnippet,
                    whatItDoes: `Declarative YAML definition for ${c.title}`,
                    example: `kubectl apply -f manifest.yaml`,
                  },
                ]
              : []),
          ],
          comparisons: c.dockerBridge
            ? [
                {
                  itemA: `Docker: ${c.dockerBridge.dockerEquivalent}`,
                  itemB: `K8s: ${c.dockerBridge.k8sEquivalent}`,
                  difference: `${c.dockerBridge.keyDifference} ${c.dockerBridge.whyK8sApproach}`,
                },
              ]
            : undefined,
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
      curriculumPacks={KUBE_CURRICULUM_PACKS}
      onLaunchLesson={handleLaunchLesson}
    />
  );
};
