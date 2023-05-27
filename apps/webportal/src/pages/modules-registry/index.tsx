import React, { useCallback, useState } from 'react';
import {
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
import { ModuleRegistry } from 'database';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { AddModuleForm } from '@webportal/libs/forms';
import ModuleAction from '@webportal/features/module-registry/ModuleAction';
import { getModuleImageUrl } from '@webportal/libs/utils/string.utils';

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

export default function ModulesRegistry(props: { modules: ModuleRegistry[] }) {
  const [modules, setModules] = useState<ModuleRegistry[]>(props.modules);

  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);

  const onModuleAddSuccess = useCallback((module: ModuleRegistry) => {
    setModules(prev => [...prev, module]);
    setIsAddModalVisible(false);
  }, []);
  const onDeleteSuccess = useCallback((id: number) => {
    setModules(prev => {
      const ms = [...prev];
      const index = ms.findIndex(m => m.id === id);
      if (index > -1) {
        ms.splice(index, 1);
      }
      return ms;
    });
  }, []);

  return (
    <Container>
      <Head>
        <title>Modules Registry</title>
      </Head>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        py={4}>
        <Typography variant='h4'>Modules</Typography>
        <Button onClick={() => setIsAddModalVisible(true)} variant='contained'>
          Add New
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Url</TableCell>
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
                <TableCell>{module.url ?? 'null'}</TableCell>
                <TableCell>{module.parentUrl ?? 'null'}</TableCell>
                <TableCell>
                  <Image
                    src={getModuleImageUrl(module.icon)}
                    width={80}
                    height={80}
                    alt={`${module.name}-image`}
                  />
                </TableCell>
                <TableCell>{module.status}</TableCell>
                <TableCell>
                  <ModuleAction
                    moduleId={module.id}
                    onDeleteSuccess={onDeleteSuccess}
                  />
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
          <Card sx={{ padding: 4 }}>
            <Typography variant='h6'>Add New Module</Typography>
            <AddModuleForm onSuccess={onModuleAddSuccess} />
          </Card>
        </Box>
      </Modal>
    </Container>
  );
}
