import { RequestMethod, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@api/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(1337);
}
bootstrap();
