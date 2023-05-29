import React, { FC, useState } from 'react';
import { ThemeToggler } from '@webportal/components';
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useCurrentUser, useLogout } from '@webportal/libs/hooks';
import { Box } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { authRoutes } from '@webportal/constants/route.constants';
import { getUserImageUrl } from '@webportal/libs/utils/string.utils';

export interface NavbarProps {
  showUserAvatar?: boolean;
}

export const Navbar: FC<NavbarProps> = ({ showUserAvatar = true }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useCurrentUser();
  const logout = useLogout();
  const theme = useTheme();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const router = useRouter();

  const handleClose = () => {
    setAnchorEl(null);
  };

  // console.log('show user avatar', isPublic, showUserAvatar);

  return (
    <AppBar elevation={3}>
      <Toolbar>
        <Typography
          variant='h6'
          component={Link}
          color={theme.palette.text.primary}
          href='/'
          sx={{ flexGrow: 1 }}>
          HSTU Portal
        </Typography>
        <ThemeToggler />
        {showUserAvatar ? (
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
                      src={getUserImageUrl(user?.avatar)}
                      fill
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
              <MenuItem
                onClick={() => {
                  handleClose();
                  router.push(`${authRoutes.profile}/${user?.id}`);
                }}>
                Profile
              </MenuItem>
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
