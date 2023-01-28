import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles, User } from 'database';

const matchRoles = (roles: Roles[], userRole: Roles) =>
  roles.includes(userRole);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Roles[]>('roles', context.getHandler());
    if (!roles || (roles && !roles.length)) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    return matchRoles(roles, user.role);
  }
}
