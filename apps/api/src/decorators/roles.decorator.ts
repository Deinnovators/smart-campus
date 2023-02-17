import { SetMetadata } from '@nestjs/common';
import { Roles } from 'database';

export const AccessRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
