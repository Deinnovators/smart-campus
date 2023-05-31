import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from '@mui/material';
import { OverlayLoader, UserOverview } from '@webportal/components';
import ProfileDetails from '@webportal/features/user/components/ProfileDetails';
import { useCurrentUser } from '@webportal/libs/hooks';
import { useAdminAccess } from '@webportal/libs/hooks/access.hooks';
import { api } from '@webportal/services';
import { User } from 'database';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

export interface UserProfileFeaturesProps {
  user: User;
}

export const UserProfileFeatures: React.FC<UserProfileFeaturesProps> = ({
  user,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const router = useRouter();
  const isAdmin = useAdminAccess();
  const currentUser = useCurrentUser();

  const deleteUser = useCallback(async () => {
    try {
      setLoading(true);
      await new Promise(res => setTimeout(res, 2000));
      await api.users.deleteUser(user.id);
      setLoading(false);
      router.replace('/users');
    } catch (error) {
      setLoading(false);
    }
  }, [router, user]);

  return (
    <Grid container spacing={4}>
      <OverlayLoader loading={loading} title='Deleting user' />
      <Grid item xs={12} md={5} lg={4}>
        <Box sx={{ marginTop: 2 }} />
        <UserOverview
          user={user}
          primaryBtnTitle={
            isAdmin && user.id !== currentUser?.id ? 'Delete User' : undefined
          }
          primaryBtnError
          onPrimaryBtnClick={() => setDialogVisible(true)}
        />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Box sx={{ marginTop: 2 }} />
        <ProfileDetails user={user} />
      </Grid>
      <Dialog open={dialogVisible} onClose={() => setDialogVisible(false)}>
        <DialogContent>
          <Typography gutterBottom>Are you sure to delete the user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogVisible(false);
              deleteUser();
            }}
            color='error'>
            Delete
          </Button>
          <Button onClick={() => setDialogVisible(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
