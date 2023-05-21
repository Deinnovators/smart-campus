import { Test, TestingModule } from '@nestjs/testing';
import { ClassRoutineController } from './class-routine.controller';

describe('ClassRoutineController', () => {
  let controller: ClassRoutineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassRoutineController],
    }).compile();

    controller = module.get<ClassRoutineController>(ClassRoutineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
