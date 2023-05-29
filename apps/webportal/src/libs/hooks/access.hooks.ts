import { useCurrentUser } from '@webportal/libs/hooks/auth.hooks';
import { User } from 'database';

export const useAdminAccess = (): boolean => {
  const user = useCurrentUser();
  return user?.role === 'admin' || user?.role === 'superadmin';
};

export const useAdminOrUserAccess = (user?: User): boolean => {
  const currentUser = useCurrentUser();
  return (
    user?.role === 'admin' ||
    user?.role === 'superadmin' ||
    user?.id === currentUser?.id
  );
};
