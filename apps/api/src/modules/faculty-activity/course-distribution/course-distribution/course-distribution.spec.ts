import { CourseDistributionService } from '@api/modules/faculty-activity/course-distribution/course-distribution/course-distribution.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('CourseDistribution', () => {
  let provider: CourseDistributionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseDistributionService],
    }).compile();

    provider = module.get<CourseDistributionService>(CourseDistributionService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
