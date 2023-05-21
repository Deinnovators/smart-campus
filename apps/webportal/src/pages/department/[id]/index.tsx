import React from 'react';
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from '@mui/system';

const departmentMembers = ['John Doe', 'Jane Smith', 'Bob Johnson'];

export default function SingleDepartment() {
  const router = useRouter();
  const { departmentId } = router.query;

  return (
    <Container>
      <Head>
        <title>Department</title>
      </Head>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <List>
            <ListItem
              button
              onClick={() => router.push(`/departments/${departmentId}`)}>
              <ListItemText primary='Details' />
            </ListItem>
            <ListItem
              button
              onClick={() =>
                router.push(`/departments/${departmentId}/members`)
              }>
              <ListItemText primary='Department Members' />
            </ListItem>
            <ListItem
              button
              onClick={() =>
                router.push(`/departments/${departmentId}/curriculum`)
              }>
              <ListItemText primary='Curriculum' />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={9}>
          <Typography variant='h4'>Department Members</Typography>
          <Box mt={2}>
            <Button variant='contained' color='primary' onClick={() => {}}>
              Add Member
            </Button>
          </Box>
          <Box mt={2}>
            <List>
              {departmentMembers.map(member => (
                <ListItem key={member}>
                  <ListItemText primary={member} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
