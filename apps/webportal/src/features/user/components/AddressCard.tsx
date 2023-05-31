import { Add, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  IconButton,
  Modal,
  Table,
  TableBody,
  Typography,
} from '@mui/material';
import { AddAddressForm } from '@webportal/libs/forms/users/address/AddAddressForm';
import { EditAddressForm } from '@webportal/libs/forms/users/address/EditAddressForm';
import { User } from 'database';
import React, { useState } from 'react';

export interface AddressCardProps {
  RowComponent: React.FC<any>;
  user?: User;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  user: defaultUser,
  RowComponent,
}) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(defaultUser);

  const onSuccess = (u: User) => {
    setIsEditModalVisible(false);
    setIsAddModalVisible(false);
    setUser(u);
  };

  if (!user) return null;

  const address = user.address;

  return (
    <Card>
      <Box p={2}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6'>Address</Typography>
          <IconButton
            onClick={() => {
              if (address) {
                setIsEditModalVisible(true);
              } else {
                setIsAddModalVisible(true);
              }
            }}>
            {address ? <Edit /> : <Add />}
          </IconButton>
        </Box>
        <Table>
          <TableBody>
            <RowComponent value={address?.village} title='Village' />
            <RowComponent value={address?.union} title='Union' />
            <RowComponent value={address?.upazilla} title='Upazilla' />
            <RowComponent value={address?.district} title='District' />
            <RowComponent value={address?.division} title='Division' />
            <RowComponent value={address?.zip} title='Zip code' />
          </TableBody>
        </Table>
      </Box>
      <Modal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}>
        <Box
          position='absolute'
          top='50%'
          left={'50%'}
          sx={{ transform: 'translate(-50%, -50%)' }}
          width={500}>
          <AddAddressForm user={user} onSuccess={onSuccess} />
        </Box>
      </Modal>
      <Modal
        open={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}>
        <Box
          position='absolute'
          top='50%'
          left={'50%'}
          sx={{ transform: 'translate(-50%, -50%)' }}
          width={500}>
          <EditAddressForm user={user} onSuccess={onSuccess} />
        </Box>
      </Modal>
    </Card>
  );
};
