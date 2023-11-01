import { Module } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { TransportsController } from './transports.controller';
import { PersistenceModule } from '@api/modules/persistance/persistance.module';
import { TransportGateway } from '@api/gateways/transports.gateway';

@Module({
  imports: [PersistenceModule],
  providers: [TransportsService, TransportGateway],
  controllers: [TransportsController],
})
export class TransportsModule {}
