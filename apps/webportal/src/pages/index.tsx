import React, { ReactElement } from 'react';
import { ModuleCard, PageWrapper, UserOverview } from '@webportal/components';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useCurrentUser } from '@webportal/libs/hooks';
import Head from 'next/head';
import { api } from '@webportal/services';
import { ModuleRegistry } from 'database';
import { GetServerSideProps } from 'next';
import { authRoutes } from '@webportal/constants/route.constants';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  return (
    <Container>
      <Head>
        <title>HSTU Portal</title>
      </Head>
      <Typography>
        This is a test to chek if ontinuous deployment is working{' '}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5} lg={4}>
          <Box sx={{ marginTop: 2 }} />
          <UserOverview
            user={user}
            primaryBtnTitle='View Profile'
            onPrimaryBtnClick={() => {
              router.push(`${authRoutes.profile}/me`);
            }}
          />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <Box display='flex' flexWrap='wrap'>
            {props.modules.map(module => {
              return (
                <Box key={module.id}>
                  <ModuleCard module={module} key={module.id} />
                </Box>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

Dashboard.getLayout = (page: ReactElement) => <PageWrapper>{page}</PageWrapper>;
