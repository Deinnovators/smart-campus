import { useState, FC, useCallback, useEffect } from 'react';
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
      contrastText: 'white',
    },
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      ...green,
      contrastText: 'white',
    },
    background: {
      default: '#0A1829',
      paper: '#0A1829',
    },
  },
});

const localThemeKey = 'themeMode';

export const AppThemeProvider: FC<any> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const [mode, setMode] = useState<AppThemeMode>('light');

  useEffect(() => {
    const localThemeMode = localStorage.getItem(localThemeKey);
    if (!localThemeMode) {
      return;
    }
    setTheme(localThemeMode === 'dark' ? darkTheme : lightTheme);
    setMode(localThemeMode as AppThemeMode);
  }, []);

  const toggleTheme = useCallback(() => {
    if (mode === 'dark') {
      setMode('light');
      setTheme(lightTheme);
      localStorage.setItem(localThemeKey, 'light');
    } else {
      setMode('dark');
      setTheme(darkTheme);
      localStorage.setItem(localThemeKey, 'dark');
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
