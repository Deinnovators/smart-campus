import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Paper } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { cookieService } from '@webportal/services';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function CreateCourse() {
  const router = useRouter();
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseCredit, setCourseCredit] = useState('');
  const [courseType, setCourseType] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const createCourse = async () => {
    try {
      const url = 'http://localhost:1337/api/v1/course';
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const body = {
        name: courseName,
        code: courseCode,
        credit: parseFloat(courseCredit),
        description: courseDescription,
        type: courseType,
        departmentId: parseInt(router.query.id),
      };
      const response = await axios.post(url, body, { headers });
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  const handleNameChange = event => {
    setCourseName(event.target.value);
  };
  const handleCodeChange = event => {
    setCourseCode(event.target.value);
  };
  const handleCreditChange = event => {
    setCourseCredit(event.target.value);
  };
  const handleTypeChange = event => {
    setCourseType(event.target.value);
  };
  const handleDescriptionChange = event => {
    setCourseDescription(event.target.value);
  };
  const handleAddCourse = event => {
    event.preventDefault();
    createCourse();
    router.push('/department');
  };
  return (
    <Container>
      <Head>
        <title>Create Course</title>
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
          <form onSubmit={handleAddCourse}>
            <TextField
              label=' Course Name'
              variant='outlined'
              margin='normal'
              fullWidth
              value={courseName}
              onChange={handleNameChange}
            />
            <TextField
              label='Course Code'
              variant='outlined'
              margin='normal'
              fullWidth
              value={courseCode}
              onChange={handleCodeChange}
            />
            <TextField
              label='Course Credit'
              variant='outlined'
              margin='normal'
              fullWidth
              value={courseCredit}
              onChange={handleCreditChange}
            />

            <TextField
              label='Course Description'
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              rows={4}
              value={courseDescription}
              onChange={handleDescriptionChange}
            />
            <TextField
              label='Course Type'
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              value={courseType}
              onChange={handleTypeChange}
            />
            <TextField
              label='Department ID'
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              value={router.query.id}
              disabled={true}
            />
            <div>
              <Button
                style={{ display: 'block', marginTop: '24px' }}
                variant='contained'
                color='primary'
                type='submit'>
                Create Course
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
