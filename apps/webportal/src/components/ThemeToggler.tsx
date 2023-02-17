import { useAppTheme } from '@webportal/libs/hooks/theme.hooks';
import { DarkMode, LightMode } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React, { FC } from 'react';

export const ThemeToggler: FC = () => {
  const { mode, toggleTheme } = useAppTheme();
  if (mode === 'light') {
    return (
      <Tooltip title='Toggle Light/Dark'>
        <IconButton onClick={toggleTheme}>
          <LightMode />
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <Tooltip title='Toggle Light/Dark'>
      <IconButton onClick={toggleTheme}>
        <DarkMode />
      </IconButton>
    </Tooltip>
  );
};
