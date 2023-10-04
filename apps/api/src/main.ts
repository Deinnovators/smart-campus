import { AppModule } from '@api/app.module';
import { PrismaClientExceptionFilter } from '@api/exceptions/prisma-client-exception/prisma-client-exception.filter';
import { RequestMethod, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  /*
   * This will enable versioning for all the api endpoints
   */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  /*
   * This will add prefix to all exndpoints except `/`.
   */
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  /*
   * Using Prisma exception filter to catch all know prisma errors
   */
  const httpAdapter = app.getHttpAdapter();
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(1338);
}
bootstrap();
