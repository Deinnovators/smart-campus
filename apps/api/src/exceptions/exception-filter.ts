import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known request errors from Prisma
      const statusCode =
        error.code === 'P2025' ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST;

      return response.status(statusCode).json({
        statusCode,
        message: error.message,
      });
    } else {
      // Handle other types of errors
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}
