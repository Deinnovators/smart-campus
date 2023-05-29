import { Box, Card, Table, Typography } from '@mui/material';
import { Address } from 'database';
import React from 'react';

export interface AddressCardProps {
  RowComponent: React.FC<any>;
  address?: Address | null;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  RowComponent,
}) => {
  return (
    <Card>
      <Box p={2}>
        <Typography variant='h6'>Address</Typography>
        <Table>
          <RowComponent value={address?.village} title='Village' />
          <RowComponent value={address?.union} title='Union' />
          <RowComponent value={address?.upazilla} title='Upazilla' />
          <RowComponent value={address?.district} title='District' />
          <RowComponent value={address?.division} title='Division' />
          <RowComponent value={address?.zip} title='Zip code' />
        </Table>
      </Box>
    </Card>
  );
};
