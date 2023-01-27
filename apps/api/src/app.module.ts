import { Module } from '@nestjs/common';
import { PersistenceModule } from '@api/persistance/persistance.module';
import { AppController } from '@api/app.controller';
import { AppService } from '@api/app.service';
import { AuthModule } from '@api/auth/auth.module';
import { UsersModule } from '@api/users/users.module';

@Module({
  imports: [PersistenceModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
