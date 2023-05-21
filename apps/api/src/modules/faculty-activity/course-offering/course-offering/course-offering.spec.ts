import { Test, TestingModule } from '@nestjs/testing';
import { CourseOfferingService } from './course-offering.service';

describe('CourseOffering', () => {
  let provider: CourseOfferingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseOfferingService],
    }).compile();

    provider = module.get<CourseOfferingService>(CourseOfferingService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
