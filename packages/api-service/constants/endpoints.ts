export const endpoints = {
  auth: {
    base: '/auth',
    login: '/auth/login',
    register: '/auth/register',
  },
  modules: {
    base: '/modules',
    parents: '/modules/parents',
    children: '/modules/children',
    all: '/modules/all',
  },
};

export type Endpoints = typeof endpoints;
