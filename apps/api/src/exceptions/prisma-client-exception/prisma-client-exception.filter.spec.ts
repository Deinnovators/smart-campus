import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';

import { PrismaClientExceptionFilter } from '@api/exceptions/prisma-client-exception/prisma-client-exception.filter';
import { DBErrorCode, Prisma } from 'database';

const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson,
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: jest.fn(),
}));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

const genericMessage = 'Test db Error';
const genericRes = {
  statusCode: HttpStatus.CONFLICT,
  dbErrorCode: DBErrorCode,
  message: 'Database Error',
  cause: genericMessage,
};

const notFoundMessage = 'Not found';
const notFoundRes = {
  statusCode: HttpStatus.NOT_FOUND,
  message: notFoundMessage,
};

describe('System header validation service', () => {
  let service: PrismaClientExceptionFilter;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaClientExceptionFilter],
    }).compile();
    service = module.get<PrismaClientExceptionFilter>(
      PrismaClientExceptionFilter,
    );
  });

  describe('Prisma client exception filter tests', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should catch and send generic db error response', () => {
      service.catch(
        new Prisma.PrismaClientKnownRequestError(genericMessage, {
          code: 'P1000',
          meta: { target: ['db'] },
          clientVersion: 'test-db',
        }),
        mockArgumentsHost,
      );
      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockStatus).toBeCalledWith(HttpStatus.CONFLICT);
      expect(mockJson).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith(genericRes);
    });
  });
  it('should catch and send not found response', () => {
    service.catch(
      new Prisma.PrismaClientKnownRequestError(notFoundMessage, {
        code: 'P2025',
        meta: { target: ['uid'] },
        clientVersion: 'test-db',
      }),
      mockArgumentsHost,
    );
    expect(mockHttpArgumentsHost).toBeCalledTimes(1);
    expect(mockHttpArgumentsHost).toBeCalledWith();
    expect(mockGetResponse).toBeCalledTimes(1);
    expect(mockGetResponse).toBeCalledWith();
    expect(mockStatus).toBeCalledTimes(1);
    expect(mockStatus).toBeCalledWith(HttpStatus.NOT_FOUND);
    expect(mockJson).toBeCalledTimes(1);
    expect(mockJson).toBeCalledWith(notFoundRes);
  });
});
