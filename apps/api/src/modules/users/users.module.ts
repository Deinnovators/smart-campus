import { Module } from '@nestjs/common';
import { UsersService } from '@api/modules/users/users.service';
import { PersistenceModule } from '@api/modules/persistance/persistance.module';

@Module({
  imports: [PersistenceModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
