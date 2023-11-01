const TRANSPORTS = '/transports';

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
  faculty: {
    base: '/faculty',
  },
  department: {
    base: '/departments',
  },
  transports: {
    base: TRANSPORTS,
    drivers: TRANSPORTS + '/drivers',
    ongoing: TRANSPORTS + '/ongoing-upcoming',
    trips: TRANSPORTS + '/trips',
    schedules: TRANSPORTS + '/schedules',
  },
};

export type Endpoints = typeof endpoints;
