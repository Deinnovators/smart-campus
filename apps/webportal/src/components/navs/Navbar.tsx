import React, { FC, useState } from 'react';
import { ThemeToggler } from '@dashboard/components';
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useCurrentUser, useLogout } from '@dashboard/libs/hooks';
import { Box } from '@mui/system';

export interface NavbarProps {
  showUserAvatar?: boolean;
}

export const Navbar: FC<NavbarProps> = ({ showUserAvatar = true }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useCurrentUser();
  const logout = useLogout();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // console.log('show user avatar', isPublic, showUserAvatar);

  return (
    <AppBar elevation={3}>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          HSTU Portal
        </Typography>
        <ThemeToggler />
        {showUserAvatar || true ? (
          <Box sx={{ marginLeft: 1 }}>
            <Tooltip title='Open settings'>
              <Box
                onClick={handleMenu}
                sx={{
                  cursor: 'pointer',
                }}>
                <IconButton>
                  <Avatar sx={{ height: 24, width: 24 }}>
                    <Image
                      src={user?.avatar ?? 'https://picsum.photos/200'}
                      width={80}
                      height={80}
                      alt='user avatar'
                    />
                  </Avatar>
                </IconButton>
              </Box>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  logout();
                }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};
