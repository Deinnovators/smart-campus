import { Module } from '@nestjs/common';
import { AppController } from '@api/app.controller';
import { AppService } from '@api/app.service';
import { UsersModule } from '@api/modules/users/users.module';
import { AuthModule } from '@api/modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@api/guards/jwt-auth.guard';
import { RolesGuard } from '@api/guards/roles.guard';
import { ModuleRegistryModule } from './modules/module-registry/module-registry.module';

@Module({
  imports: [UsersModule, AuthModule, ModuleRegistryModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
