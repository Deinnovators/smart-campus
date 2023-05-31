export const endpoints = {
  auth: {
    base: '/auth',
    login: '/auth/login',
    register: '/auth/register',
    profile: '/auth/profile',
  },
  modules: {
    base: '/modules',
    parents: '/modules/parents',
    children: '/modules/children',
    all: '/modules/all',
  },
  users: {
    base: '/users',
  },
};

export type Endpoints = typeof endpoints;
