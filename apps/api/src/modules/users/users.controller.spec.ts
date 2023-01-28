import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '@api/modules/users/users.controller';
import { PersistenceModule } from '@api/modules/persistance/persistance.module';
import { UsersService } from '@api/modules/users/users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PersistenceModule],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
