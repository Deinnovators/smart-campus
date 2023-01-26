import { Module } from '@nestjs/common';
import { PersistenceModule } from 'src/persistance/persistance.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PersistenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
