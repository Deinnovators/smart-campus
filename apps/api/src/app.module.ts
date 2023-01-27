import { Module } from '@nestjs/common';
import { AppController } from '@api/app.controller';
import { AppService } from '@api/app.service';
import { UsersModule } from '@api/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
