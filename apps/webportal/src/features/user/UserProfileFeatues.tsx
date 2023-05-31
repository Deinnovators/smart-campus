import { Box, Grid } from '@mui/material';
import { UserOverview } from '@webportal/components';
import ProfileDetails from '@webportal/features/user/components/ProfileDetails';
import { User } from 'database';
import React from 'react';

export interface UserProfileFeaturesProps {
  user: User;
}

export const UserProfileFeatures: React.FC<UserProfileFeaturesProps> = ({
  user,
}) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={5} lg={4}>
        <Box sx={{ marginTop: 2 }} />
        <UserOverview user={user} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Box sx={{ marginTop: 2 }} />
        <ProfileDetails user={user} />
      </Grid>
    </Grid>
  );
};
