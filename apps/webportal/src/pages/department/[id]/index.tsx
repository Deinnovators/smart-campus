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
import { Label } from '@mui/icons-material';

export default function SingleDepartment() {
  const router = useRouter();
  const { id } = router.query;
  const courseNewUrl = '/department/' + id + '/course/new';
  const [departmentInformation, setDepartmentInformation] = useState({});
  const [chairman, setChairman] = useState('');
  const [departments, setDepartments] = useState([]);
  const [value, setValue] = useState(0);
  const [dialogueOpen, setDialogueOpen] = useState(false);
  const [agreeToDelete, setAgreeToDelete] = useState(false);
  const [courses, setCourses] = useState([]);
  const [role, setRole] = useState('');
  const [chairmanMessage, setChiarmanMessage] = useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChairmanMessageChange = event => {
    setChiarmanMessage(event.target.value);
  };
  const handleUpdateDepartment = event => {
    event.preventDefault();
    updateDepartment();
    router.push('/department');
  };

  const handleDeleteFaculty = e => {
    e.preventDefault();
    setDialogueOpen(true);
  };
  const handleClose = bool => {
    setDialogueOpen(false);
    if (bool) {
      deleteDepartment();
    }
  };
  const updateDepartment = async () => {
    try {
      const url = `http://localhost:1337/api/v1/departments/${id}`;
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const body = {
        chairmanMessage: chairmanMessage,
      };
      const response = await axios.patch(url, body, { headers });
      toast('success', 'Department updated successfully');
    } catch (error) {
      toast('error', 'Something went wrong');
    }
  };
  useEffect(() => {
    getDepartmentInformation();
    getChairman();
    getAllCourse();
    getRole();
  }, []);
  const getRole = async () => {
    try {
      const url = 'http://localhost:1337/api/v1/auth/profile';
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        setRole(response.data.role);
      }
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  const getAllCourse = async () => {
    try {
      const url = 'http://localhost:1337/api/v1/course';
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        setCourses(response.data);
      }
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };

  const getDepartmentInformation = async () => {
    try {
      const url = `http://localhost:1337/api/v1/departments/${id}`;
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        setDepartmentInformation(response.data);
      }
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  const getChairman = async () => {
    try {
      const url = `http://localhost:1337/api/v1/users/${departmentInformation.chairmanId}`;
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        setChairman(response?.data?.name);
      }
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  const deleteDepartment = async () => {
    try {
      const url = `http://localhost:1337/api/v1/departments/${id}`;
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(url, { headers });
      router.push('/department');
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <Container>
      <Head>
        <title>Department</title>
      </Head>
      <div>
        <Tabs value={value} onChange={handleChange} aria-label='Tabs example'>
          <Tab label='Details' />
          <Tab label='Update Information' />
          <Tab label='Courses' />
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
                    <BriefCard name='Department' value={departments.length} />
                  </Grid>
                  <Grid item xs={6}>
                    <BriefCard name='Degree' value='33' />
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
                    <Typography variant='h6' gutterBottom>
                      Welcome Message from The Chairman
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <MessageCard
                      message={departmentInformation.chairmanMessage}
                      name={chairman}
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
                    <Link href={`/department/${id}/class-routine`}>
                      See Class Routine
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </div>
          )}
          {value === 1 && (
            <div>
              {' '}
              <form onSubmit={handleUpdateDepartment}>
                <TextField
                  label='Name'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  value={departmentInformation.name}
                  // //   onChange={handleNameChange}
                  disabled={true}
                />
                <Typography>Chairman ID</Typography>
                <TextField
                  // label='Chairman ID'
                  variant='outlined'
                  margin='normal'
                  type='number'
                  fullWidth
                  value={departmentInformation.chairmanId}
                  // onChange={handleDeanIdChange}
                  disabled={true}
                />
                <Typography>Faculty ID</Typography>

                <TextField
                  // label='Faculty ID'
                  variant='outlined'
                  margin='normal'
                  type='number'
                  fullWidth
                  value={departmentInformation.facultyId}
                  // onChange={handleDeanIdChange}
                  disabled={true}
                />
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
          {value === 2 && (
            <div style={{ marginTop: '24px', marginBottom: '24px' }}>
              {courses.map(course => (
                <Link
                  key={course.id}
                  href={`/department/${id}/course/${course.id}`}
                  passHref>
                  <Typography
                    style={{
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                    variant='subtitle1'>
                    {course.name}
                  </Typography>
                </Link>
              ))}
              {role === 'admin' || role === 'superadmin' ? (
                <Link href={`/department/${String(id)}/course/new`} passHref>
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ marginTop: '1rem' }}>
                    Add New Course
                  </Button>
                </Link>
              ) : null}
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
            Are you sure to Delete the Department?
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
