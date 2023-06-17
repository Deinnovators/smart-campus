import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Head from 'next/head';
import { cookieService } from '@webportal/services';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function CreateDepartment() {
  const [name, setName] = useState('');
  const [facultyIDS, setFacultyIDS] = useState([]);
  const [facultyId, setFacultyId] = useState('');
  const [chairmanId, setChairmanId] = useState('');
  const [chairmanMessage, setChairmanMessage] = useState('');
  const [allTeachers, setAllTeachers] = useState([]);
  const router = useRouter();
  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleChairmanMessageChange = event => {
    setChairmanMessage(event.target.value);
  };
  const facultyIdChange = event => {
    setFacultyId(event.target.value);
  };
  const chairmanIdChange = event => {
    setChairmanId(event.target.value);
  };
  console.log(
    'name facultyid chairmanid message',
    name,
    chairmanMessage,
    facultyId,
    chairmanId,
  );
  const getAllFaculties = async () => {
    try {
      const url = 'http://localhost:1337/api/v1/faculty';
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        // setFaculties(response.data);
      }
      const ids = response.data.map(faculty => faculty.id);
      setFacultyIDS(ids);
    } catch (error) {}
  };
  const getAllTeachersOfFaculty = async () => {
    try {
      const url = 'http://localhost:1337/api/v1/users';
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      const teachers = response.data.filter(res => res.role === 'teacher');
      setAllTeachers(teachers);
    } catch (error) {
      // toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  const createDepartment = async () => {
    try {
      const url = 'http://localhost:1337/api/v1/departments';
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const body = {
        name,
        chairmanMessage,
        facultyId,
        chairmanId,
      };
      const response = await axios.post(url, body, { headers });
      toast('success', 'department Created Successfully');
    } catch (error) {
      // toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  const handleAddDepartment = event => {
    event.preventDefault();
    createDepartment();
    router.push('/department');
  };
  useEffect(() => {
    getAllFaculties();
    getAllTeachersOfFaculty();
  }, [1]);

  return (
    <Container>
      <Head>
        <title>Modules Registry</title>
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
          <form onSubmit={handleAddDepartment}>
            <TextField
              label='Name'
              variant='outlined'
              margin='normal'
              fullWidth
              value={name}
              onChange={handleNameChange}
            />
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Faculty ID</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={facultyId}
                label='Faculty ID'
                onChange={facultyIdChange}>
                {facultyIDS.map(id => {
                  return <MenuItem value={id}>{id}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Chairman ID</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={chairmanId}
                label='Chairman ID'
                onChange={chairmanIdChange}>
                {allTeachers.map(teacher => {
                  return <MenuItem value={teacher.id}>{teacher.id}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <TextField
              label='Chairman Message'
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              rows={4}
              value={chairmanMessage}
              onChange={handleChairmanMessageChange}
            />
            <div>
              <Button
                style={{ display: 'block', marginTop: '24px' }}
                variant='contained'
                color='primary'
                type='submit'>
                Add Department
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
