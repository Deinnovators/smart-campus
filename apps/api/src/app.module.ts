import { AppController } from '@api/app.controller';
import { AppService } from '@api/app.service';
import { JwtAuthGuard } from '@api/guards/jwt-auth.guard';
import { RolesGuard } from '@api/guards/roles.guard';
import { AuthModule } from '@api/modules/auth/auth.module';
import { UsersModule } from '@api/modules/users/users.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { FacultyModule } from './modules/faculty/faculty.module';
import { ModuleRegistryModule } from './modules/module-registry/module-registry.module';

@Module({
  imports: [UsersModule, AuthModule, ModuleRegistryModule, FacultyModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {}
