import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import Head from 'next/head';
import { cookieService } from '@webportal/services';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
export default function CreateFaculty() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [deanId, setDeanId] = useState(0);
  const [deanMessage, setDeanMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);

  const getAllUsers = async () => {
    try {
      const url = 'http://localhost:1337/api/v1/users';
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      setUsers(response.data);
      const teachers = response.data.filter(user => user.role === 'teacher');
      setAllTeachers(teachers);
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleDeanIdChange = event => {
    setDeanId(event.target.value);
  };

  const handleDeanMessageChange = event => {
    setDeanMessage(event.target.value);
  };
  const createFaculty = async () => {
    try {
      const url = 'http://localhost:1337/api/v1/faculty';
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const body = {
        name: name,
        deanId: deanId,
        deanMessage: deanMessage,
      };
      const response = await axios.post(url, body, { headers });
      toast('success', 'Faculty Created Successfully');
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };

  const handleCreateFaculty = event => {
    event.preventDefault();
    createFaculty();
    router.push('/faculty');
  };
  useEffect(() => {
    getAllUsers();
  }, [1]);
  return (
    <Container>
      <Head>
        <title>Create Faculty</title>
      </Head>
      <Grid
        container
        component={Paper}
        spacing={2}
        style={{
          padding: '24px',
          marginTop: '24px',
          marginBottom: '24px',
        }}>
        <Grid item xs={12}>
          <form onSubmit={handleCreateFaculty}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Dean ID</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={deanId}
                label='Age'
                onChange={handleDeanIdChange}>
                {allTeachers.map(teacher => {
                  return <MenuItem value={teacher.id}>{teacher.id}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <TextField
              label='Faculty Name'
              variant='outlined'
              margin='normal'
              fullWidth
              value={name}
              onChange={handleNameChange}
            />

            <TextField
              label='Dean Message'
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              rows={4}
              value={deanMessage}
              onChange={handleDeanMessageChange}
            />
            <div>
              <Button
                style={{ display: 'block', marginTop: '24px' }}
                variant='contained'
                color='primary'
                type='submit'>
                Add Faculty
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
