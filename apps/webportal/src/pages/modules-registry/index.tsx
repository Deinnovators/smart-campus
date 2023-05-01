import React from 'react';
import {
  Box,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { api } from '@webportal/services';
import { ModuleRegistry } from 'database';
import { GetServerSideProps } from 'next';
import { Edit, Delete } from '@mui/icons-material';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const modules = await api.modules.getAllModules({
    headers: {
      [api.authHeaderKey]: `${api.authTokenType} ${ctx.req.cookies.token}`,
    },
  });
  return {
    props: {
      modules,
    },
  };
};

export default function ModulesRegistry({
  modules,
}: {
  modules: ModuleRegistry[];
}) {
  return (
    <Container>
      <Head>
        <title>Modules Registry</title>
      </Head>
      <Box display='flex' justifyContent='center' alignItems='center' py={4}>
        <Typography variant='h4'>Modules</Typography>
      </Box>
      <Table>
        <TableHead>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Parent Url</TableCell>
          <TableCell>Image</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Action</TableCell>
        </TableHead>
        <TableBody>
          {modules.map(module => {
            return (
              <TableRow key={module.id}>
                <TableCell>{module.id}</TableCell>
                <TableCell>{module.name}</TableCell>
                <TableCell>{module.parentUrl ?? 'null'}</TableCell>
                <TableCell>
                  <Image
                    src={module.icon}
                    width={80}
                    height={80}
                    alt={`${module.name}-image`}
                  />
                </TableCell>
                <TableCell>{module.status}</TableCell>
                <TableCell>
                  <Box>
                    <IconButton>
                      <Edit />
                    </IconButton>
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
}
