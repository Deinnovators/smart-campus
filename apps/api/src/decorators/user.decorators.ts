import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Roles, User as UserType } from 'database';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const http = context.switchToHttp();
    return http.getRequest().user as UserType;
  },
);

export const CurrentUserRole = createParamDecorator(
  (_, context: ExecutionContext) => {
    const http = context.switchToHttp();
    return http.getRequest().user?.role as Roles;
  },
);
