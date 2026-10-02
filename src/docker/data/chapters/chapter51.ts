import { DockerChapter } from '../../types/dockerCurriculumTypes';
import { buildDockerLesson } from '../lessonGenerator';
import { DOCKER_CURRICULUM_SPEC } from '../curriculumStructure';

const chapterDef = DOCKER_CURRICULUM_SPEC.find(c => c.number === 51)!;

export const CHAPTER_51: DockerChapter = {
  number: chapterDef.number,
  id: chapterDef.id,
  title: chapterDef.title,
  trackGroup: chapterDef.trackGroup,
  description: chapterDef.description,
  lessons: chapterDef.subchapters.map((sub, idx) => buildDockerLesson(chapterDef, sub, idx))
};
