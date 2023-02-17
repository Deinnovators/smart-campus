import { Theme } from '@mui/system';
import { createContext } from 'react';

export type AppThemeMode = 'light' | 'dark';

export interface IAppThemeContext {
  theme: Theme;
  mode: AppThemeMode;
  toggleTheme: () => void;
}

export const AppThemeContext = createContext<IAppThemeContext>({
  theme: undefined!,
  mode: 'light',
  toggleTheme: () => {},
});
