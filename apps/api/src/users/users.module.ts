import { Module } from '@nestjs/common';
import { UsersService } from '@api/users/users.service';
import { PersistenceModule } from '@api/persistance/persistance.module';

@Module({
  imports: [PersistenceModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
