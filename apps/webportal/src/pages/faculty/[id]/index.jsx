import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Tab,
  Tabs,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from '@mui/system';
import { useEffect } from 'react';
import { cookieService } from '@webportal/services';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BriefCard } from '@webportal/components/BriefCard';
import { MessageCard } from '@webportal/components/MessageCard';
import Link from 'next/link';

export default function SingleFaculty() {
  const router = useRouter();
  const { id } = router.query;
  const [facultyInformation, setFacultyInformation] = useState({});
  const [dean, setDean] = useState('');
  const [departments, setDepartments] = useState([]);
  const [value, setValue] = useState(0);
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [agreeToDelete, setAgreeToDelete] = useState(false);
  const [deanMessage, setDeanMessage] = useState(
    facultyInformation && facultyInformation.deanMessage,
  );
  const [facultyTeachers, setFacultyTeachers] = useState([]);
  const [deanId, setDeanId] = useState('');
  const handleUpdateFaculty = e => {
    e.preventDefault();
    updateFaculty();
    router.push('/faculty');
  };
  const updateFaculty = async () => {
    try {
      const url = `http://localhost:1337/api/v1/faculty/${id}`;
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const body = {
        // deanId: deanId,
        deanMessage: deanMessage,
      };
      const response = await axios.patch(url, body, { headers });
      toast('success', 'Faculty updated successfully');
    } catch (error) {
      toast('error', 'Something went wrong');
    }
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
      const teachers = response.data.filter(
        user =>
          user.role === 'teacher' && facultyInformation.name === user.faculty,
      );
      setFacultyTeachers(teachers);
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  const handleChange = (event, newValue) => {
    getFacultyInformation();
    setValue(newValue);
  };
  const handleDeanIdChange = event => {
    setDeanId(event.target.value);
  };

  const handleDeanMessageChange = e => {
    setDeanMessage(e.target.value);
  };

  const handleAddDepartment = event => {
    event.preventDefault();
    const departmentName = event.target.elements.departmentName.value;
    setDepartments([...departments, departmentName]);
    event.target.reset();
  };
  const handleDeleteFaculty = e => {
    e.preventDefault();
    setDialogueOpen(true);
  };
  const handleClose = bool => {
    setDialogueOpen(false);
    if (bool) {
      deleteFaculty();
    }
  };
  useEffect(() => {
    getFacultyInformation();
    getDean();
    getAllTeachersOfFaculty();
  }, []);
  const getFacultyInformation = async () => {
    try {
      const url = `http://localhost:1337/api/v1/faculty/${id}`;
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        setFacultyInformation(response.data);
        setDepartments(response.data.departments);
      }
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  const getDean = async () => {
    try {
      const url = `http://localhost:1337/api/v1/users/${facultyInformation.deanId}`;
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        setDean(response?.data?.name);
      }
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  const deleteFaculty = async () => {
    try {
      const url = `http://localhost:1337/api/v1/faculty/${id}`;
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(url, { headers });
      router.push('/faculty');
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <Container>
      <Head>
        <title>Faculty</title>
      </Head>
      <div>
        <Tabs value={value} onChange={handleChange} aria-label='Tabs example'>
          <Tab label='Details' />
          <Tab label='Update Information' />
        </Tabs>
        <Typography>
          {value === 0 && (
            <div>
              {' '}
              <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                <Grid
                  container
                  component={Paper}
                  spacing={2}
                  style={{
                    padding: '24px',
                    marginTop: '24px',
                    marginBottom: '24px',
                  }}>
                  <Grid item xs={6}>
                    <BriefCard name='Department' value='33' />
                  </Grid>
                  <Grid item xs={6}>
                    <BriefCard name='Degree' value='33' />
                  </Grid>
                  <Grid item xs={6}>
                    <BriefCard name='Teacher' value='33' />
                  </Grid>
                  <Grid item xs={6}>
                    <BriefCard name='Student' value='33' />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Paper}
                  spacing={2}
                  style={{
                    padding: '16px',
                    marginTop: '24px',
                    marginBottom: '24px',
                  }}>
                  <Grid item xs={12}>
                    <Typography variant='h5' gutterBottom textColor='secondary'>
                      Welcome Message from The Dean
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <MessageCard
                      message={facultyInformation.deanMessage}
                      name={dean}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  component={Paper}
                  spacing={2}
                  style={{
                    padding: '16px',
                    marginTop: '24px',
                    marginBottom: '24px',
                  }}>
                  <Grid item xs={12}>
                    <Typography variant='h5' gutterBottom textColor='secondary'>
                      Departments
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {departments.map(department => (
                      <Link
                        key={department.id}
                        href={`/department/${department.id}`}
                        passHref>
                        <Typography
                          style={{
                            textDecoration: 'none',
                            cursor: 'pointer',
                          }}
                          variant='subtitle1'>
                          {department.name}
                        </Typography>
                      </Link>
                    ))}
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
          {value === 1 && (
            <div style={{ marginTop: '24px' }}>
              {' '}
              <form onSubmit={handleUpdateFaculty}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Dean ID</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    disabled={true}
                    value={facultyInformation.deanId}
                    label='Dean ID'
                    onChange={handleDeanIdChange}>
                    {facultyTeachers.map(teacher => {
                      return (
                        <MenuItem value={teacher.id}>{teacher.id}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <TextField
                  label='Name'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  value={facultyInformation.name}
                  disabled={true}
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
                <div
                  style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                  <Button
                    style={{ display: 'block' }}
                    variant='contained'
                    color='primary'
                    type='submit'>
                    Save
                  </Button>
                  <Button
                    style={{ display: 'block' }}
                    variant='contained'
                    color='secondary'
                    onClick={handleDeleteFaculty}>
                    Delete
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Typography>
      </div>
      <Dialog
        open={dialogueOpen}
        // onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{'Delete Faculty'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure to Delete the faculty?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Disagree</Button>
          <Button onClick={() => handleClose(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
