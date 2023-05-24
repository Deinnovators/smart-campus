import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import toast from '@webportal/libs/utils/Toast';
import { cookieService } from '@webportal/services';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
const Course = () => {
  const [courseDetails, setCourseDetails] = useState({});
  const [distributedCourse, setDistributedCourse] = useState([]);
  const [departments, setDepartments] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getCourseDetails();
    getDepartments();
  }, [1]);

  async function getCourseDetails() {
    setLoading(true);
    try {
      const url = `http://localhost:1337/api/v1/course/${router.query.courseId}`;
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        console.log(response);
        setCourseDetails(response.data[0]);
        getDistributionDetails(response.data[0].CourseOffering);
      }
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  }

  async function getDistributionDetails(CourseOffering) {
    let newArr = [...distributedCourse];

    for (let i = 0; i < CourseOffering.length; i++) {
      try {
        const url = `http://localhost:1337/api/v1/course-distribution/${CourseOffering[i]?.courseDistributionId}`;
        const token = cookieService.get('token');
        if (!token) throw new Error('No user token found');
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(url, { headers });
        if (response.status === 200) {
          newArr.push(response.data);
        }
      } catch (error) {
        toast(
          'error',
          error?.response?.data?.message || 'Something went wrong',
        );
      }
      if (i === CourseOffering.length - 1) {
        setDistributedCourse(newArr);
        setLoading(false);
      }
    }
  }

  async function getDepartments() {
    try {
      const url = 'http://localhost:1337/api/v1/departments';
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        console.log(response);
        const newObj = {};

        response.data.forEach(obj => {
          newObj[obj.id] = obj.name;
        });

        setDepartments(newObj);
      }
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <Container>
      <Head>
        <title>Course</title>
      </Head>
      <Grid container spacing={2}>
        {loading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '90vh',
              width: '100%',
            }}>
            <CircularProgress />
          </div>
        )}
        {!loading && courseDetails.length === 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '90vh',
              width: '100%',
            }}>
            <Typography variant='h6'>No data available.</Typography>
          </div>
        )}
      </Grid>

      {!loading && Object.keys(courseDetails).length > 0 && (
        <Fragment>
          <Grid
            container
            spacing={2}
            component={Paper}
            style={{ marginTop: '24px' }}>
            <React.Fragment key={courseDetails.id}>
              <Grid item xs={12}>
                <Typography variant='h4'>Basic Information</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='h6'>Name:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='h6'>{courseDetails.name}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='h6'>Code:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='h6'>{courseDetails.code}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='h6'>Credit:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='h6'>{courseDetails.credit}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='h6'>Type:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='h6'>{courseDetails.type}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='h6'>Department Name:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='h6'>
                  {courseDetails.department.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='h6'>Description:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='h6'>
                  {courseDetails.description}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='h6'>CreatedAt:</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='h6'>
                  {courseDetails.createdAt.slice(0, 10)}
                </Typography>
              </Grid>{' '}
              <Grid item xs={3}>
                <Typography variant='h6'>UpdatedAt:</Typography>
              </Grid>
              <Grid item xs={9} style={{ marginBottom: '24px' }}>
                <Typography variant='h6'>
                  {courseDetails.updatedAt.slice(0, 10)}
                </Typography>
              </Grid>
            </React.Fragment>
          </Grid>

          <Grid
            container
            spacing={2}
            component={Paper}
            style={{ marginTop: '24px' }}>
            {' '}
            <Grid item xs={8} style={{ marginBottom: '24px' }}>
              <Typography variant='h4'>Course Distributed To</Typography>
            </Grid>
            <Grid
              item
              xs={4}
              style={{ marginBottom: '24px', paddingLeft: '60px' }}>
              <Button variant='contained' onClick={handleClickOpen}>
                <AddIcon /> Create New Distribution
              </Button>
            </Grid>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Academic Year</TableCell>
                    <TableCell>Section</TableCell>
                    <TableCell>Semester</TableCell>
                    <TableCell>Teacher ID</TableCell>
                    <TableCell>Updated At</TableCell>
                    <TableCell>Created At</TableCell>
                  </TableRow>
                </TableHead>
                {distributedCourse.map((dt, index) => (
                  <TableBody>
                    <TableRow key={index}>
                      <TableCell>{++index}</TableCell>
                      <TableCell>{departments[dt.departmentId]}</TableCell>

                      <TableCell>{dt.academicYear}</TableCell>
                      <TableCell>{dt.section}</TableCell>
                      <TableCell>{dt.semester}</TableCell>
                      <TableCell>{dt.courseOfferings[0].teacherId}</TableCell>

                      <TableCell>
                        {dt.courseOfferings[0].createdAt.slice(0, 10)}
                      </TableCell>
                      <TableCell>
                        {dt.courseOfferings[0].updatedAt.slice(0, 10)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
          </Grid>

          <Grid
            container
            spacing={2}
            component={Paper}
            style={{ marginTop: '24px' }}>
            {' '}
            <Grid item xs={12} style={{ marginBottom: '24px' }}>
              <Typography variant='h4'>Course Curriculum Krte hbe</Typography>
            </Grid>
          </Grid>
        </Fragment>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Distribution</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new distribution enter the following information below.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Course;
