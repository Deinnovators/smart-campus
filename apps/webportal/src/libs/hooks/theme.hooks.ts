import { AppThemeContext } from '@dashboard/libs/contexts/theme.context';
import { useContext } from 'react';

export const useAppTheme = () => useContext(AppThemeContext);

export const useAppCurrentTheme = () => {
  const { theme } = useContext(AppThemeContext);
  return theme;
};

export const useAppThemeMode = () => {
  const { mode } = useContext(AppThemeContext);
  return mode;
};

export const useAppThemeToggler = () => {
  const { toggleTheme } = useContext(AppThemeContext);
  return toggleTheme;
};
