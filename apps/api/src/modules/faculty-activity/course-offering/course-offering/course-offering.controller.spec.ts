import { Test, TestingModule } from '@nestjs/testing';
import { CourseOfferingController } from './course-offering.controller';

describe('CourseOfferingController', () => {
  let controller: CourseOfferingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseOfferingController],
    }).compile();

    controller = module.get<CourseOfferingController>(CourseOfferingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
