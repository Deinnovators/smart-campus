import { Call } from '@mui/icons-material';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { TransportsLayout } from '@webportal/components';
import { authRoutes } from '@webportal/constants/route.constants';
import { api } from '@webportal/services';
import { DriverNumbers } from 'database';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { ReactElement } from 'react';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const drivers = await api.transports.getDrivers({
    headers: {
      [api.authHeaderKey]: `${api.authTokenType} ${ctx.req.cookies.token}`,
    },
  });
  return {
    props: {
      drivers,
    },
  };
};

export default function Drivers({ drivers }: { drivers: DriverNumbers[] }) {
  return (
    <Box mt={4}>
      <Head>
        <title>Transport::Driver&apos;s number</title>
      </Head>
      <Typography sx={{ my: 2 }} variant='h6'>
        HSTU Driver&apos;s Number
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Mobile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((d, index) => {
              return (
                <TableRow key={d.name + index}>
                  <TableCell>{d.name}</TableCell>
                  <TableCell align='center'>
                    <Box
                      component='a'
                      href={`tel:${d.mobile}`}
                      display='flex'
                      alignItems='center'>
                      <Call sx={{ mr: 1 }} />
                      {d.mobile}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

Drivers.getLayout = (page: ReactElement) => {
  return (
    <TransportsLayout currentRoute={authRoutes.drivers}>
      {page}
    </TransportsLayout>
  );
};
