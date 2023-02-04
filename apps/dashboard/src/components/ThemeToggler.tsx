import { useAppTheme } from '@dashboard/libs/hooks/theme.hooks';
import { DarkMode, LightMode } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';

export const ThemeToggler = () => {
  const { mode, toggleTheme } = useAppTheme();
  if (mode === 'light') {
    return (
      <IconButton onClick={toggleTheme}>
        <LightMode className=' text-4xl' />
      </IconButton>
    );
  }
  return (
    <IconButton onClick={toggleTheme}>
      <DarkMode className=' text-4xl' />
    </IconButton>
  );
};
