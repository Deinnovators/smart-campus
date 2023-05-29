import { UsersService } from '@api/modules/users/users.service';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'database';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ where: { email } });
    if (!user) return null;
    const { password, ...result } = user;
    const passwordValid = await bcrypt.compare(pass, password);
    if (!passwordValid) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Password is not valid',
      });
    }
    return result;
  }

  async login(user: User) {
    return {
      jwt: this.jwtService.sign({ user }),
      user,
    };
  }
}
