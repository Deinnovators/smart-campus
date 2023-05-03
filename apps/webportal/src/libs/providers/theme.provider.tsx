import { useState, FC, useCallback, ReactNode } from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import { Theme } from '@mui/system';
import {
  AppThemeContext,
  AppThemeMode,
} from '@webportal/libs/contexts/theme.context';
import { CssBaseline } from '@mui/material';
import { green } from '@mui/material/colors';
import { cookieService } from '@webportal/services';

const fontFamily = 'var(--font-inter)';

const baseTheme = createTheme({
  typography: {
    fontFamily,
  },
});

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      ...green,
      contrastText: '#181818',
    },
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      ...green,
      contrastText: '#181818',
    },
    background: {
      default: '#0A1829',
      paper: '#0A1829',
    },
  },
});

const localThemeKey = 'themeMode';

export const AppThemeProvider: FC<{
  themeMode?: AppThemeMode;
  children: ReactNode;
}> = ({ children, themeMode }) => {
  const [mode, setMode] = useState<AppThemeMode>(themeMode ?? 'dark');
  const [theme, setTheme] = useState<Theme>(
    mode === 'light' ? lightTheme : darkTheme,
  );

  const toggleTheme = useCallback(() => {
    if (mode === 'dark') {
      setMode('light');
      setTheme(lightTheme);
      cookieService.set(localThemeKey, 'light');
    } else {
      setMode('dark');
      setTheme(darkTheme);
      cookieService.set(localThemeKey, 'dark');
    }
  }, [mode]);

  return (
    <AppThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppThemeContext.Provider>
  );
};
