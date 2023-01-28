import { Module } from '@nestjs/common';
import { AppController } from '@api/app.controller';
import { AppService } from '@api/app.service';
import { UsersModule } from '@api/modules/users/users.module';
import { AuthModule } from '@api/modules/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
