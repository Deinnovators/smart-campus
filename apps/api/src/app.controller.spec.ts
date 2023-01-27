import { Test, TestingModule } from '@nestjs/testing';
import { appRunningStatus } from '@api/app.constant';
import { PersistenceModule } from '@api/persistance/persistance.module';
import { AppController } from '@api/app.controller';
import { AppService } from '@api/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PersistenceModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it(`should return "${appRunningStatus}"`, () => {
      expect(appController.getHello()).toBe(appRunningStatus);
    });
  });
});
