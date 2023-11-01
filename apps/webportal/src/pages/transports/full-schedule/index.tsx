import { Box, Card, Typography } from '@mui/material';
import { TransportsLayout, UpcomingCard } from '@webportal/components';
import Map from '@webportal/components/Map/Map';
import { authRoutes } from '@webportal/constants/route.constants';
import { api } from '@webportal/services';
import { Prisma, TransportSchedule, TripKind } from 'database';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { ReactElement } from 'react';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const schedules = await api.transports.getAllSchedules({
    headers: {
      [api.authHeaderKey]: `${api.authTokenType} ${ctx.req.cookies.token}`,
    },
  });
  const regular = schedules.filter(sc => sc.tripKind === TripKind.Regular);
  const special = schedules.filter(sc => sc.tripKind === TripKind.Special);
  return {
    props: {
      regular,
      special,
    },
  };
};

export default function FullSchedule({
  regular,
  special,
}: {
  regular: TransportSchedule[];
  special: TransportSchedule[];
}) {
  return (
    <Box mt={4}>
      <Head>
        <title>Transport::Full Schedule</title>
      </Head>
      <Typography sx={{ my: 2 }} variant='h6'>
        Regular
      </Typography>
      <Box display='flex' flexWrap='wrap'>
        {regular.map(sc => {
          return (
            <UpcomingCard schedule={sc} key={sc.id.toString() + sc.createdAt} />
          );
        })}
      </Box>
      <Typography sx={{ my: 2 }} variant='h6'>
        Special
      </Typography>
      <Box display='flex' flexWrap='wrap'>
        {special.map(sc => {
          return (
            <UpcomingCard schedule={sc} key={sc.id.toString() + sc.createdAt} />
          );
        })}
      </Box>
    </Box>
  );
}

FullSchedule.getLayout = (page: ReactElement) => {
  return (
    <TransportsLayout currentRoute={authRoutes.fullSchedule}>
      {page}
    </TransportsLayout>
  );
};
