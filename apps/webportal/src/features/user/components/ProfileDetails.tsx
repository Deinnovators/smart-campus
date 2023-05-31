import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Spacer } from '@webportal/components';
import { AddressCard } from '@webportal/features/user/components/AddressCard';
import { ForeignAddressCard } from '@webportal/features/user/components/ForeignAddressCard';
import { User } from 'database';
import dayjs from 'dayjs';
import React from 'react';

export interface ProfileDetailsProps {
  user?: User;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  return (
    <Box>
      <Card>
        <Box p={2}>
          <Typography variant='h6'>Personal Informations</Typography>
          <Table sx={{ border: 0 }}>
            <TableBody>
              <DetailRow value={user?.nationality} title='Nationality' />
              <DetailRow value={user?.sex} capitalize title='Sex' />
              <DetailRow
                value={
                  user?.dateOfBirth &&
                  dayjs(user?.dateOfBirth).format('DD/MM/YYYY')
                }
                title='Date of birth'
              />
            </TableBody>
          </Table>
        </Box>
      </Card>
      <Spacer space='small' />
      {user?.nationalityType === 'foreign' ? (
        <ForeignAddressCard
          RowComponent={DetailRow}
          address={user.foreignAddress}
        />
      ) : (
        <AddressCard address={user?.address} RowComponent={DetailRow} />
      )}
    </Box>
  );
};

const DetailRow = ({ title, value, capitalize }: any) => {
  if (!value) return null;
  return (
    <TableRow>
      <TableCell width={'30%'} sx={{ border: 'none' }}>
        <Typography>{title}: </Typography>
      </TableCell>
      <TableCell sx={{ border: 'none' }}>
        <Typography sx={{ textTransform: capitalize ? 'capitalize' : 'none' }}>
          {value}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default ProfileDetails;
