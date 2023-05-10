import { CourseDistribution } from '@api/modules/faculty-activity/course-distribution/course-distribution/course-distribution.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CourseDistribution', () => {
  let provider: CourseDistribution;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseDistribution],
    }).compile();

    provider = module.get<CourseDistribution>(CourseDistribution);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
