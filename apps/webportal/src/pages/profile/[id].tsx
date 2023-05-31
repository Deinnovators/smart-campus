import React from 'react';
import { Box, Container } from '@mui/material';
import Head from 'next/head';
import { api } from '@webportal/services';
import { User } from 'database';
import { GetServerSideProps } from 'next';
import { UserProfileFeatures } from '@webportal/features/user/UserProfileFeatues';

export const getServerSideProps: GetServerSideProps = async ctx => {
  let user: User;
  const id = ctx.params?.id;
  const config = {
    headers: {
      [api.authHeaderKey]: `${api.authTokenType} ${ctx.req.cookies.token}`,
    },
  };
  if (id === 'me') {
    user = await api.auth.getProfile(config);
  } else {
    user = await api.users.getUserById(ctx.params?.id as string, config);
  }
  return {
    props: {
      user,
    },
  };
};

export default function UserProfile({ user }: { user: User }) {
  return (
    <Container>
      <Head>
        <title>Profile</title>
      </Head>
      <UserProfileFeatures user={user} />
    </Container>
  );
}
