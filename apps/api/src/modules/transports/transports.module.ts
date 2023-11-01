import { Module } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { TransportsController } from './transports.controller';
import { PersistenceModule } from '@api/modules/persistance/persistance.module';

@Module({
  imports: [PersistenceModule],
  providers: [TransportsService],
  controllers: [TransportsController],
})
export class TransportsModule {}
