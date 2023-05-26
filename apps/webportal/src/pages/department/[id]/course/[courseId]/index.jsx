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
import ForwardIcon from '@mui/icons-material/Forward';

const Course = () => {
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCourseDetails();
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
        // getDistributionDetails(response.data[0].CourseOffering);
        setLoading(false);
      }
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  }

  console.log(courseDetails, router);
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '24px 16px',
                flexWrap: 'wrap-reverse',
              }}>
              <Typography variant='h4'>Basic Information</Typography>
              <Button
                variant='contained'
                onClick={() =>
                  router.push(router.asPath + '/offer-and-distribute')
                }>
                create Offer and distribution <ForwardIcon />
              </Button>
            </div>
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
              <Typography variant='h6'>{courseDetails.description}</Typography>
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
          </Grid>

          <Grid
            container
            spacing={2}
            component={Paper}
            style={{ marginTop: '24px' }}>
            {' '}
            <Grid item xs={12} style={{ marginBottom: '24px' }}>
              <Typography variant='h4'>Course Distributed To</Typography>
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
                {courseDetails.CourseOffering.map((dt, index) => (
                  <TableBody>
                    <TableRow key={index}>
                      <TableCell>{++index}</TableCell>
                      <TableCell>
                        {dt.CourseDistribution.department.name}
                      </TableCell>

                      <TableCell>
                        {dt.CourseDistribution.academicYear}
                      </TableCell>
                      <TableCell>{dt.CourseDistribution.section}</TableCell>
                      <TableCell>{dt.CourseDistribution.semester}</TableCell>
                      <TableCell>{dt.teacher.name}</TableCell>

                      <TableCell>{dt.createdAt.slice(0, 10)}</TableCell>
                      <TableCell>{dt.updatedAt.slice(0, 10)}</TableCell>
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
    </Container>
  );
};

export default Course;
