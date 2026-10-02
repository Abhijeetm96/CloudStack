import React, { useMemo } from 'react';
import { useDocker } from '../../context/DockerContext';
import { ALL_DOCKER_CHAPTERS, ALL_DOCKER_LESSONS } from '../../data';
import {
  StandardConceptsUniverse,
  UniverseConceptItem,
  UniverseTopicFilter,
  CurriculumPackFilter,
} from '../../../platform/layout/StandardConceptsUniverse';
import { Container } from 'lucide-react';

export const DockerConceptsUniverseView: React.FC = () => {
  const { setMode, setActiveConceptId, setActiveTopicId } = useDocker();

  // Convert all 68 chapters to universe filters
  const topics: UniverseTopicFilter[] = useMemo(() => {
    return ALL_DOCKER_CHAPTERS.map((ch) => ({
      id: ch.id,
      number: String(ch.number).padStart(2, '0'),
      title: ch.title,
    }));
  }, []);

  // Standard 6-Pack Curriculum groupings for 68 chapters
  const curriculumPacks: CurriculumPackFilter[] = useMemo(
    () => [
      { id: 'all', title: 'All Chapters (1-68)', range: [1, 68] },
      { id: 'pack-1', title: 'Pack 1: Foundations (1-10)', range: [1, 10] },
      { id: 'pack-2', title: 'Pack 2: Images & Storage (11-20)', range: [11, 20] },
      { id: 'pack-3', title: 'Pack 3: Networking & CLI (21-30)', range: [21, 30] },
      { id: 'pack-4', title: 'Pack 4: Linux Internals (31-40)', range: [31, 40] },
      { id: 'pack-5', title: 'Pack 5: Operations & Security (41-55)', range: [41, 55] },
      { id: 'pack-6', title: 'Pack 6: Cloud Native & Mastery (56-68)', range: [56, 68] },
    ],
    []
  );

  // Convert all 1,038 Docker lessons into standard universe concept items
  const concepts: UniverseConceptItem[] = useMemo(() => {
    return ALL_DOCKER_LESSONS.map((lesson) => ({
      id: lesson.id,
      command: lesson.syntax.split('\n')[0] || `docker ${lesson.subchapterTitle.toLowerCase()}`,
      title: lesson.subchapterTitle,
      subtitle: lesson.definition,
      subChapterNumber: lesson.subchapterNumber,
      badges: [lesson.trackGroup, lesson.difficulty, `Ch ${lesson.chapterNumber}`],
      topicId: `ch-${String(lesson.chapterNumber).padStart(2, '0')}`,
      topicNumber: String(lesson.chapterNumber).padStart(2, '0'),
      topicTitle: lesson.chapterTitle,
      difficulty: lesson.difficulty,
      whatIsIt: lesson.definition,
      whyDoWeNeedIt: lesson.whyItExists,
      variations: lesson.variations?.map((v) => ({
        title: v,
        syntax: v,
        whatItDoes: v,
        whenToUse: 'When configuring container runtime parameters',
      })),
      scenarios: [
        {
          id: `${lesson.id}-scenario`,
          title: `${lesson.subchapterTitle} Challenge`,
          context: lesson.challenge?.scenario || lesson.problemSolved,
          question: lesson.challenge?.goal || 'How do you execute this container task?',
          options: [
            {
              label: lesson.challenge?.testVerification || lesson.syntax.split('\n')[0] || 'docker run',
              command: lesson.challenge?.testVerification || lesson.syntax.split('\n')[0] || 'docker run',
              isCorrect: true,
              explanation: lesson.technicalExplanation,
            },
            {
              label: lesson.dangerousExample || 'docker run --privileged ...',
              command: lesson.dangerousExample || 'docker run --privileged ...',
              isCorrect: false,
              explanation: lesson.commonMistakes?.[0] || 'This can introduce stability or isolation issues.',
            },
          ],
        },
      ],
      mistakes: lesson.commonMistakes?.map((m) => ({
        mistake: m,
        whyWrong: lesson.commonMisconceptions?.[0] || 'Violates Docker container isolation principles.',
        correctWay: lesson.safeExample || lesson.syntax.split('\n')[0] || 'Follow standard declarative Docker patterns',
      })) || [],
    }));
  }, []);

  const handleLaunchLesson = (conceptId: string) => {
    setActiveConceptId(conceptId);
    const parentCh = ALL_DOCKER_CHAPTERS.find((ch) => ch.lessons.some((l) => l.id === conceptId));
    if (parentCh) {
      setActiveTopicId(parentCh.id);
    }
    setMode('academy');
  };

  return (
    <StandardConceptsUniverse
      academyName="Docker"
      totalConceptCount={ALL_DOCKER_LESSONS.length}
      topics={topics}
      concepts={concepts}
      curriculumPacks={curriculumPacks}
      accentColor="#38bdf8"
      accentGradient="linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)"
      brandIcon={Container}
      onLaunchLesson={handleLaunchLesson}
    />
  );
};

export default DockerConceptsUniverseView;
