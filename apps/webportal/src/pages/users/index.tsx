import React, { useCallback, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { api } from '@webportal/services';
import { User } from 'database';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { authRoutes } from '@webportal/constants/route.constants';
import Link from 'next/link';
import { AddUserForm } from '@webportal/libs/forms/users/AddUserForm';
import { getUserImageUrl } from '@webportal/libs/utils/string.utils';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const users = await api.users.getUsers(
    {
      take: 20,
    },
    {
      headers: {
        [api.authHeaderKey]: `${api.authTokenType} ${ctx.req.cookies.token}`,
      },
    },
  );
  return {
    props: {
      users,
    },
  };
};

export default function UsersModule(props: { users: User[] }) {
  const [users, setUsers] = useState<User[]>(props.users);
  const [currentEditableUser, setCurrentEditableUser] = useState<User>();

  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);

  const onUserAddSuccess = useCallback((user: User) => {
    setUsers(prev => [...prev, user]);
    setIsAddModalVisible(false);
  }, []);

  const onDeleteSuccess = useCallback((id: number) => {
    setUsers(prev => {
      const usr = [...prev];
      const index = usr.findIndex(m => m.id === id);
      if (index > -1) {
        usr.splice(index, 1);
      }
      return usr;
    });
  }, []);

  return (
    <Container>
      <Head>
        <title>Users</title>
      </Head>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        py={4}>
        <Typography variant='h4'>Users</Typography>
        <Button onClick={() => setIsAddModalVisible(true)} variant='contained'>
          Add New
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Avatar>
                    <Image
                      src={getUserImageUrl(user.avatar)}
                      alt={`${user.name}-avatar`}
                      fill
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobile}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Link href={`${authRoutes.profile}/${user.id}`}>
                    <Button variant='contained'>View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Modal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}>
        <Box
          position='absolute'
          top='50%'
          left={'50%'}
          sx={{ transform: 'translate(-50%, -50%)' }}
          width={500}>
          <AddUserForm onSuccess={onUserAddSuccess} />
        </Box>
      </Modal>
    </Container>
  );
}
