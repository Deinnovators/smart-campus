import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@api/modules/persistance/prisma/prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const dbmodule: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = dbmodule.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
