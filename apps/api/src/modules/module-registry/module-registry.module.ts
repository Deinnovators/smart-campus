import { Module } from '@nestjs/common';
import { ModuleRegistryService } from './module-registry.service';
import { ModuleRegistryController } from './module-registry.controller';
import { PersistenceModule } from '@api/modules/persistance/persistance.module';

@Module({
  imports: [PersistenceModule],
  controllers: [ModuleRegistryController],
  providers: [ModuleRegistryService],
})
export class ModuleRegistryModule {}
