import { Module } from '@nestjs/common';
import { UsersService } from '@api/modules/users/users.service';
import { PersistenceModule } from '@api/modules/persistance/persistance.module';
import { UsersController } from '@api/modules/users/users.controller';

@Module({
  imports: [PersistenceModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
