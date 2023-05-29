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
export default function CreateFaculty() {
  const [name, setName] = useState('');
  const [deanId, setDeanId] = useState(0);
  const [deanMessage, setDeanMessage] = useState('');
  const [users, setUsers] = useState([]);

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

  const handleCreateFaculty = event => {
    event.preventDefault();
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
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
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
