import { SetMetadata } from '@nestjs/common';
import { Roles as RolesType } from 'database';

export const Roles = (...roles: RolesType[]) => SetMetadata('roles', roles);
