import { Box, Card, Table, Typography } from '@mui/material';
import { ForeignAddress } from 'database';
import React from 'react';

export interface ForeignAddressCardProps {
  RowComponent: React.FC<any>;
  address?: ForeignAddress | null;
}

export const ForeignAddressCard: React.FC<ForeignAddressCardProps> = ({
  address,
  RowComponent,
}) => {
  return (
    <Card>
      <Box p={2}>
        <Typography variant='h6'>Address</Typography>
        <Table>
          <RowComponent value={address?.street} title='Street' />
          <RowComponent value={address?.city} title='City' />
          <RowComponent value={address?.state} title='State' />
          <RowComponent value={address?.country} title='Country' />
          <RowComponent value={address?.mobile} title='Mobile' />
          <RowComponent value={address?.zip} title='Zip code' />
        </Table>
      </Box>
    </Card>
  );
};
