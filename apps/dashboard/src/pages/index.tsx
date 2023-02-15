import React, { ReactElement } from 'react';
import { PageWrapper } from '@dashboard/components';
import {
  Avatar,
  Box,
  Card,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCurrentUser, useLogout } from '@dashboard/libs/hooks';
import Image from 'next/image';
import { Edit, Logout } from '@mui/icons-material';

export default function Dashboard() {
  const user = useCurrentUser();
  const logout = useLogout();

  return (
    <Container>
      <Card sx={{ padding: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: { xs: 'column', sm: 'row' },
          }}>
          <Box sx={{ display: 'flex', flex: 1 }}>
            <Avatar
              variant='rounded'
              sx={{ height: 100, width: 100, marginRight: 2 }}>
              <Image
                src={user?.avatar ?? 'https://picsum.photos/200'}
                height={100}
                width={100}
                alt='user avatar'
              />
            </Avatar>
            <Box>
              <Typography variant='h5'>{user?.name}</Typography>
              <Typography variant='subtitle2'>ID: {user?.uid}</Typography>
              <Typography variant='subtitle2'>{user?.email}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignSelf: { xs: 'flex-end', sm: 'flex-start' },
            }}>
            <Tooltip title='Edit Profile'>
              <IconButton>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title='Logout'>
              <IconButton onClick={logout}>
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}

Dashboard.getLayout = (page: ReactElement) => (
  <PageWrapper showUserAvatar={false}>{page}</PageWrapper>
);
