import { Box, Grid } from '@mui/material';
import { UserOverview } from '@webportal/components';
import ProfileDetails from '@webportal/features/user/components/ProfileDetails';
import { useAdminOrUserAccess } from '@webportal/libs/hooks/access.hooks';
import { User } from 'database';
import React from 'react';

export interface UserProfileFeaturesProps {
  user: User;
}

export const UserProfileFeatures: React.FC<UserProfileFeaturesProps> = ({
  user,
}) => {
  const grantEditAccess = useAdminOrUserAccess(user);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={5} lg={4}>
        <Box sx={{ marginTop: 2 }} />
        <UserOverview
          user={user}
          primaryBtnTitle={grantEditAccess ? 'Edit Profile' : ''}
        />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Box sx={{ marginTop: 2 }} />
        <ProfileDetails user={user} />
      </Grid>
    </Grid>
  );
};
