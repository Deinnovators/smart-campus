import React, { FC, Fragment, ReactNode } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Head from 'next/head';
import { api } from '@webportal/services';
import { ModuleRegistry } from 'database';
import { GetServerSideProps } from 'next';
import { useAppTheme } from '@webportal/libs/hooks';
import { ArrowRight } from '@mui/icons-material';

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
          <Box display='flex' alignItems='center'>
            {stoppages.map((st, i) => {
              const isActive = st === 'Terminal';
              return (
                <Fragment key={i}>
                  <Typography
                    color={isActive ? 'green' : undefined}
                    fontSize={isActive ? 24 : undefined}
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
      <OutlineBox title='Upcoming'></OutlineBox>
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
