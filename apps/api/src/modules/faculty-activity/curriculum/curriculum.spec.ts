import { CourseCurriculumService } from '@api/modules/faculty-activity/curriculum/curriculum.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('Curriculum', () => {
  let provider: CourseCurriculumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseCurriculumService],
    }).compile();

    provider = module.get<CourseCurriculumService>(CourseCurriculumService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
