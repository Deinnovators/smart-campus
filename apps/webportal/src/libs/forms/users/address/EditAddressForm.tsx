import { Box, Card, Typography } from '@mui/material';
import { Prisma, User } from 'database';
import React, { useState } from 'react';
import { BaseAddressForm } from '@webportal/libs/forms/users/address/BaseAddressForm';
import { api } from '@webportal/services';

export interface EditAddressFormProps {
  onSuccess?: (user: User) => void;
  user: User;
}

export const EditAddressForm: React.FC<EditAddressFormProps> = ({
  onSuccess,
  user,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const editAddress = async (
    address?: Omit<Prisma.AddressCreateInput, 'user'>,
  ) => {
    try {
      setLoading(true);
      const res = await api.users.updateUser(user.id, {
        address: {
          update: address,
        },
      });
      onSuccess?.(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ padding: 4 }}>
      <Box p={2}>
        <Box pb={2} display='flex' justifyContent='center' alignItems='center'>
          <Typography variant='h6'>Edit address</Typography>
        </Box>
        <BaseAddressForm
          initialValues={user.address as any}
          onSubmit={editAddress}
          loading={loading}
        />
      </Box>
    </Card>
  );
};
