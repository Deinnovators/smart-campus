export const publicRoutes = {
  login: '/login',
};

export const publicRoutesArray = Object.keys(publicRoutes).map(
  k => publicRoutes[k as keyof typeof publicRoutes],
);

export const authRoutes = {
  profile: '/profile',
};
