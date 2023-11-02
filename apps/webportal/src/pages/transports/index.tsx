import React, { FC, ReactElement, ReactNode, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Head from 'next/head';
import { api, socket } from '@webportal/services';
import { TransportSchedule, Trip } from 'database';
import { GetServerSideProps } from 'next';
import { useAppTheme } from '@webportal/libs/hooks';
import { TransportsLayout, UpcomingCard } from '@webportal/components';
import { authRoutes } from '@webportal/constants/route.constants';
import { OngoingCard } from '@webportal/components/OngoingCard';
import useTripStore from '@webportal/zustores/trip.store';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const data = await api.transports.getOngoingUpcoming({
    headers: {
      [api.authHeaderKey]: `${api.authTokenType} ${ctx.req.cookies.token}`,
    },
  });
  return {
    props: {
      data,
    },
  };
};

export default function Transports({
  data,
}: {
  data: { ongoing: Trip[]; upcoming: TransportSchedule[] };
}) {
  const { trips, initTrips } = useTripStore();
  useEffect(() => {
    socket.init();
    initTrips(data.ongoing);

    return () => {
      if (socket.io) {
        socket.io.disconnect;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initTrips]);
  return (
    <Box>
      <Head>
        <title>Transport::Ongoing & upcoming</title>
      </Head>

      <OutlineBox title='Ongoing'>
        {!trips.length && (
          <Box justifyContent='center' alignItems='center' display='flex'>
            <Typography>No ongoing trip at this moment</Typography>
          </Box>
        )}
        <Box display='flex' flexWrap='wrap'>
          {trips.map(ong => {
            return <OngoingCard key={ong.id} trip={ong} />;
          })}
        </Box>
      </OutlineBox>
      <OutlineBox title='Upcoming'>
        {!data?.upcoming?.length && (
          <Box justifyContent='center' alignItems='center' display='flex'>
            <Typography>No upcoming trip at this moment</Typography>
          </Box>
        )}
        <Box display='flex' flexWrap='wrap'>
          {data.upcoming.map(up => {
            return (
              <UpcomingCard key={up.id.toString() + up.time} schedule={up} />
            );
          })}
        </Box>
      </OutlineBox>

      {/* 
      <Box>
        <Typography my={2} align='center' variant='h5'>
          Full Schedule
        </Typography>
        <Typography my={2} variant='h6'>
          General Trips
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>From</TableCell>
                <TableCell>Trip name</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Bus Numbers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Campus</TableCell>
                <TableCell>Students</TableCell>
                <TableCell>6:40 am</TableCell>
                <TableCell>17</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Boro Math</TableCell>
                <TableCell>Students</TableCell>
                <TableCell>7:50 am</TableCell>
                <TableCell>17</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Campus</TableCell>
                <TableCell>Students</TableCell>
                <TableCell>7:50 am</TableCell>
                <TableCell>4, 20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Campus</TableCell>
                <TableCell>Students</TableCell>
                <TableCell>7:50 am</TableCell>
                <TableCell>4, 20, 7 ,13</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Campus</TableCell>
                <TableCell>Teachers</TableCell>
                <TableCell>8:00 am</TableCell>
                <TableCell>1, 2, 3, 5, 6, 7</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shahid Minar Mor</TableCell>
                <TableCell>Employees</TableCell>
                <TableCell>8:15 am</TableCell>
                <TableCell>8</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shahid Minar Mor</TableCell>
                <TableCell>Officials</TableCell>
                <TableCell>8:20 am</TableCell>
                <TableCell>4, 20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shahid Minar Mor</TableCell>
                <TableCell>Students</TableCell>
                <TableCell>8:20 am</TableCell>
                <TableCell>Double Decker-2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shahid Minar Mor</TableCell>
                <TableCell>Students</TableCell>
                <TableCell>8:30 am</TableCell>
                <TableCell>13</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography my={2} variant='h6'>
          Special Trips
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>From</TableCell>
                <TableCell>Trip name</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Bus Numbers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Friday</TableCell>
                <TableCell>Campus</TableCell>
                <TableCell>Teachers & Officials</TableCell>
                <TableCell>9:00 am</TableCell>
                <TableCell>5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Friday</TableCell>
                <TableCell>Campus</TableCell>
                <TableCell>Employees</TableCell>
                <TableCell>9:00 am</TableCell>
                <TableCell>8</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Friday</TableCell>
                <TableCell>Boro Math</TableCell>
                <TableCell>Teachers & Officials</TableCell>
                <TableCell>9:00 am</TableCell>
                <TableCell>5</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Friday</TableCell>
                <TableCell>Boro Math</TableCell>
                <TableCell>Employees</TableCell>
                <TableCell>9:00 am</TableCell>
                <TableCell>8</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Typography my={2} align='center' variant='h5'>
          Live tracking
        </Typography>
        <Box height={500} width='100%'>
          <Map />
        </Box>
      </Box> */}
    </Box>
  );
}

const OutlineBox: FC<{ title: string; children?: ReactNode }> = ({
  children,
  title,
}) => {
  const { theme } = useAppTheme();
  return (
    <Box
      position='relative'
      mt={4}
      p={4}
      sx={{ border: '2px solid grey', borderRadius: 3 }}>
      <Box
        position='absolute'
        top={-18}
        bgcolor={theme.palette.background.paper}>
        <Typography variant='h6'>{title}</Typography>
      </Box>
      {children}
    </Box>
  );
};

Transports.getLayout = (page: ReactElement) => {
  return (
    <TransportsLayout currentRoute={authRoutes.transports}>
      {page}
    </TransportsLayout>
  );
};
