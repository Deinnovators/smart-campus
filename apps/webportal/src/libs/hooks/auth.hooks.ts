import { useCallback, useEffect, useState } from 'react';
import { api, cookieService } from '@webportal/services';
import { User } from 'database';
import { useRouter } from 'next/router';
import { publicRoutes } from '@webportal/constants';

export const useLogin = () => {
  const route = useRouter();
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const data = await api.auth.login(email, password);
        cookieService.set('token', data.jwt);
        cookieService.set('user', JSON.stringify(data.user));
        return route.replace('/');
      } catch (error) {}
    },
    [route],
  );

  return login;
};

export const useLogout = () => {
  const route = useRouter();
  const logout = useCallback(() => {
    cookieService.remove('token');
    cookieService.remove('user');
    return route.replace(publicRoutes.login);
  }, [route]);

  return logout;
};

export const useCurrentUser = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const usr = cookieService.get('user');
    if (usr) {
      setUser(JSON.parse(usr));
    }
  }, []);

  return user;
};
