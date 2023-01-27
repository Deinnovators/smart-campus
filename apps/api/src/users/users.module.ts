import { Module } from '@nestjs/common';
import { UsersService } from '@api/users/users.service';
import { UsersController } from '@api/users/users.controller';
import { PersistenceModule } from '@api/persistance/persistance.module';

@Module({
  imports: [PersistenceModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
