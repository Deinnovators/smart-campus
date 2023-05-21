import { ClassRoutineService } from '@api/modules/faculty-activity/class-routines/class-routine/class-routine.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ClassRoutine', () => {
  let provider: ClassRoutineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassRoutineService],
    }).compile();

    provider = module.get<ClassRoutineService>(ClassRoutineService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
