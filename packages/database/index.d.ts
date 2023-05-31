import { Prisma } from '@prisma/client';

export * from '@prisma/client';
export const DBErrorCode: number;
export type User = Prisma.UserGetPayload<{
  include: {
    address: true;
    foreignAddress: true;
    faculty: true;
    department: true;
    chairman: true;
    dean: true;
  };
}>;
