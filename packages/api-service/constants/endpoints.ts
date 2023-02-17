export const endpoints = {
  auth: {
    base: '/auth',
    login: '/auth/login',
    register: '/auth/register',
  },
};

export type Endpoints = typeof endpoints;
