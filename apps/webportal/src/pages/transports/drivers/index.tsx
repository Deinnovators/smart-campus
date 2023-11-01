import { TransportsLayout } from '@webportal/components';
import { authRoutes } from '@webportal/constants/route.constants';
import { api } from '@webportal/services';
import { GetServerSideProps } from 'next';
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

export default function Drivers({}) {
  return <div />;
}

Drivers.getLayout = (page: ReactElement) => {
  return (
    <TransportsLayout currentRoute={authRoutes.drivers}>
      {page}
    </TransportsLayout>
  );
};
