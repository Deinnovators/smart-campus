import React, { FC, Fragment, ReactNode } from 'react';
import {
  Box,
  Card,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { api } from '@webportal/services';
import { ModuleRegistry } from 'database';
import { GetServerSideProps } from 'next';
import { useAppTheme } from '@webportal/libs/hooks';
import {
  ArrowForward,
  ArrowRight,
  ArrowRightOutlined,
  Call,
  PhoneAndroid,
} from '@mui/icons-material';
import Map from '@webportal/components/Map/Map';
import { drivers } from '@webportal/constants/data.constants';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const modules = await api.modules.getAllModules({
    headers: {
      [api.authHeaderKey]: `${api.authTokenType} ${ctx.req.cookies.token}`,
    },
  });
  return {
    props: {
      modules,
    },
  };
};
const stoppages = [
  'Campus',
  'College Mor',
  'Terminal',
  'Moharaja Mor',
  'Shahi Mosjid Mor',
  'Shahid Minar Mor',
  'Sadar Hospital',
  'Boro Math',
];

export default function Transports(props: { modules: ModuleRegistry[] }) {
  const { theme } = useAppTheme();
  return (
    <Container>
      <Head>
        <title>Transports</title>
      </Head>

      <OutlineBox title='Ongoing'>
        <Box display='flex' alignItems='center' mb={2}>
          <Box
            mr={2}
            border={2}
            height={38}
            width={38}
            borderRadius={19}
            display='flex'
            justifyContent='center'
            alignItems='center'>
            <Typography variant='h6'>13</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            {stoppages.map((st, i) => {
              const isActive = st === 'Terminal';
              return (
                <Fragment key={i}>
                  <Typography
                    color={isActive ? 'green' : undefined}
                    fontSize={isActive ? 18 : undefined}
                    fontWeight={isActive ? 'bold' : undefined}>
                    {st}
                  </Typography>
                  {i < stoppages.length - 1 ? <ArrowRight /> : null}
                </Fragment>
              );
            })}
          </Box>
        </Box>
        <Box display='flex' alignItems='center' mb={2}>
          <Box
            mr={2}
            border={2}
            height={38}
            width={38}
            borderRadius={19}
            display='flex'
            justifyContent='center'
            alignItems='center'>
            <Typography variant='h6'>09</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            {stoppages.map((st, i) => {
              const isActive = st === 'Moharaja Mor';
              return (
                <Fragment key={i}>
                  <Typography
                    color={isActive ? 'green' : undefined}
                    fontSize={isActive ? 18 : undefined}
                    fontWeight={isActive ? 'bold' : undefined}>
                    {st}
                  </Typography>
                  {i < stoppages.length - 1 ? <ArrowRight /> : null}
                </Fragment>
              );
            })}
          </Box>
        </Box>
        <Box display='flex' alignItems='center' mb={2}>
          <Box
            mr={2}
            border={2}
            height={38}
            width={38}
            borderRadius={19}
            display='flex'
            justifyContent='center'
            alignItems='center'>
            <Typography variant='h6'>17</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            {stoppages.reverse().map((st, i) => {
              const isActive = st === 'College Mor';
              return (
                <Fragment key={i}>
                  <Typography
                    color={isActive ? 'green' : undefined}
                    fontSize={isActive ? 18 : undefined}
                    fontWeight={isActive ? 'bold' : undefined}>
                    {st}
                  </Typography>
                  {i < stoppages.length - 1 ? <ArrowRight /> : null}
                </Fragment>
              );
            })}
          </Box>
        </Box>
        <Box display='flex' alignItems='center'>
          <Box
            mr={2}
            border={2}
            height={38}
            width={38}
            borderRadius={19}
            display='flex'
            justifyContent='center'
            alignItems='center'>
            <Typography variant='h6'>19</Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            {stoppages.map((st, i) => {
              const isActive = st === 'Terminal';
              return (
                <Fragment key={i}>
                  <Typography
                    color={isActive ? 'green' : undefined}
                    fontSize={isActive ? 18 : undefined}
                    fontWeight={isActive ? 'bold' : undefined}>
                    {st}
                  </Typography>
                  {i < stoppages.length - 1 ? <ArrowRight /> : null}
                </Fragment>
              );
            })}
          </Box>
        </Box>
      </OutlineBox>
      <OutlineBox title='Upcoming'>
        <Box display='flex'>
          <Card sx={{ padding: 2 }}>
            <Box display='flex' alignItems='center'>
              <Box
                mr={2}
                border={2}
                height={38}
                width={38}
                borderRadius={19}
                display='flex'
                justifyContent='center'
                alignItems='center'>
                <Typography variant='h6'>19</Typography>
              </Box>
              <Box>
                <Typography variant='h6' color='green'>
                  At 2:30 pm
                </Typography>
                <Box display='flex' alignItems='center'>
                  <Typography variant='body2'>Boro Math</Typography>
                  <ArrowForward fontSize='small' sx={{ mx: 1 }} />
                  <Typography variant='body2'>Campus</Typography>
                </Box>
              </Box>
            </Box>
          </Card>
          <Card sx={{ padding: 2, ml: 2 }}>
            <Box display='flex' alignItems='center'>
              <Box
                mr={2}
                border={2}
                height={38}
                width={38}
                borderRadius={19}
                display='flex'
                justifyContent='center'
                alignItems='center'>
                <Typography variant='h6'>17</Typography>
              </Box>
              <Box>
                <Typography variant='h6' color='green'>
                  At 2:30 pm
                </Typography>
                <Box display='flex' alignItems='center'>
                  <Typography variant='body2'>Boro Math</Typography>
                  <ArrowForward fontSize='small' sx={{ mx: 1 }} />
                  <Typography variant='body2'>Campus</Typography>
                </Box>
              </Box>
            </Box>
          </Card>
          <Card sx={{ padding: 2, ml: 2 }}>
            <Box display='flex' alignItems='center'>
              <Box
                mr={2}
                border={2}
                height={38}
                width={38}
                borderRadius={19}
                display='flex'
                justifyContent='center'
                alignItems='center'>
                <Typography variant='h6'>09</Typography>
              </Box>
              <Box>
                <Typography variant='h6' color='green'>
                  At 3:00 pm
                </Typography>
                <Box display='flex' alignItems='center'>
                  <Typography variant='body2'>Campus</Typography>
                  <ArrowForward fontSize='small' sx={{ mx: 1 }} />
                  <Typography variant='body2'>Boro Math</Typography>
                </Box>
              </Box>
            </Box>
          </Card>
          <Card sx={{ padding: 2, ml: 2 }}>
            <Box display='flex' alignItems='center'>
              <Box
                mr={2}
                border={2}
                height={38}
                width={38}
                borderRadius={19}
                display='flex'
                justifyContent='center'
                alignItems='center'>
                <Typography variant='h6'>13</Typography>
              </Box>
              <Box>
                <Typography variant='h6' color='green'>
                  At 3:00 pm
                </Typography>
                <Box display='flex' alignItems='center'>
                  <Typography variant='body2'>Campus</Typography>
                  <ArrowForward fontSize='small' sx={{ mx: 1 }} />
                  <Typography variant='body2'>Boro Math</Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
      </OutlineBox>

      <Box my={8}>
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
      </Box>
    </Container>
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
      mt={12}
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
