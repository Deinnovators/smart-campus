import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '@api/modules/auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@api/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@api/modules/auth/auth.constants';
import { JwtStrategy } from '@api/modules/auth/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
