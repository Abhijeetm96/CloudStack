import { TERRAFORM_CURRICULUM_SPEC } from '../curriculumStructure';
import { buildTerraformLesson } from '../lessonGenerator';
import { TerraformChapter } from '../../types/terraformTypes';

const spec = TERRAFORM_CURRICULUM_SPEC[44];

export const chapter45: TerraformChapter = {
  id: spec.id,
  number: spec.number,
  title: spec.title,
  description: spec.description,
  trackGroup: spec.trackGroup,
  subchapterCount: spec.subchapters.length,
  subchapters: spec.subchapters.map((sub, idx) => buildTerraformLesson(spec, sub, idx + 1))
};

export default chapter45;
