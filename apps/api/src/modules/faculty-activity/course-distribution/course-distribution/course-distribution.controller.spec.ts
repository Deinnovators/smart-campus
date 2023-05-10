import { CourseDistributionController } from '@api/modules/faculty-activity/course-distribution/course-distribution/course-distribution.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('CourseDistributionController', () => {
  let controller: CourseDistributionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseDistributionController],
    }).compile();

    controller = module.get<CourseDistributionController>(
      CourseDistributionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
