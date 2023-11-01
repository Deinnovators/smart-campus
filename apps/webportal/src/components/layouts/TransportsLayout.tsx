import { Box, Tab, Tabs } from '@mui/material';
import {
  PageWrapper,
  PageWrapperProps,
} from '@webportal/components/layouts/PageWrapper';
import { authRoutes } from '@webportal/constants/route.constants';
import { useRouter } from 'next/router';
import React from 'react';

interface TransportsLayoutProps extends PageWrapperProps {
  currentRoute?: string;
}

export const TransportsLayout: React.FC<TransportsLayoutProps> = ({
  children,
  currentRoute,
  ...props
}) => {
  const router = useRouter();
  return (
    <PageWrapper {...props}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          onChange={(_, val) => {
            router.push(val);
          }}
          value={currentRoute}
          aria-label='basic tabs example'>
          <Tab value={authRoutes.transports} label='Ongoing & Upcoming' />
          <Tab value={authRoutes.drivers} label='Drivers' />
          <Tab label='Item Three' />
        </Tabs>
      </Box>
      {children}
    </PageWrapper>
  );
};
