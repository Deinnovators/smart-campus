import React, { ReactElement } from 'react';
import { ModuleCard, PageWrapper } from '@webportal/components';
import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCurrentUser, useLogout } from '@webportal/libs/hooks';
import Image from 'next/image';
import { Edit, Logout } from '@mui/icons-material';
import Head from 'next/head';
import { api } from '@webportal/services';
import { ModuleRegistry } from 'database';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    const modules = await api.modules.getParents(
      {},
      {
        headers: {
          [api.authHeaderKey]: `${api.authTokenType} ${ctx.req.cookies.token}`,
        },
      },
    );
    return {
      props: {
        modules,
      },
    };
  } catch (error) {
    return {
      props: {
        modules: [],
      },
    };
  }
};
export default function Dashboard(props: { modules: ModuleRegistry[] }) {
  const user = useCurrentUser();
  const logout = useLogout();

  return (
    <Container>
      <Head>
        <title>HSTU Portal</title>
      </Head>
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

      <Divider style={{ margin: '1rem 0' }} />

      <Box display='flex' flexWrap='wrap' justifyContent='center'>
        {props.modules.map(module => {
          return (
            <Box key={module.id}>
              <ModuleCard module={module} key={module.id} />
            </Box>
          );
        })}
      </Box>
    </Container>
  );
}

Dashboard.getLayout = (page: ReactElement) => (
  <PageWrapper showUserAvatar={false}>{page}</PageWrapper>
);
