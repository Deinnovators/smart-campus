import { Box } from '@mui/material';
import { TransportsLayout } from '@webportal/components';
import Map from '@webportal/components/Map/Map';
import { authRoutes } from '@webportal/constants/route.constants';
import { api } from '@webportal/services';
import { Trip } from 'database';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { ReactElement } from 'react';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const trips = await api.transports.getOngoingTrips({
    headers: {
      [api.authHeaderKey]: `${api.authTokenType} ${ctx.req.cookies.token}`,
    },
  });
  return {
    props: {
      trips,
    },
  };
};

export default function LiveTracking({ trips }: { trips: Trip[] }) {
  return (
    <Box mt={4}>
      <Head>
        <title>Transport::Live Tracking</title>
      </Head>
      <Box height={400} width='100%'>
        <Map trips={trips} />
      </Box>
    </Box>
  );
}

LiveTracking.getLayout = (page: ReactElement) => {
  return (
    <TransportsLayout currentRoute={authRoutes.liveTracking}>
      {page}
    </TransportsLayout>
  );
};
