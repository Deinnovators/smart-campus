export const publicRoutes = {
  login: '/login',
};

export const publicRoutesArray = Object.keys(publicRoutes).map(
  k => publicRoutes[k as keyof typeof publicRoutes],
);

const transports = '/transports';

export const authRoutes = {
  profile: '/profile',
  transports: transports,
  drivers: transports + '/drivers',
};
