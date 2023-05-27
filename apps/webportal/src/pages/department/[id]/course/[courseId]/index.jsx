import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Toast from '@webportal/libs/utils/Toast';

const Course = () => {
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openModal, setModal] = React.useState(false);
  const [values, setValues] = useState({
    courseId: +router.query.courseId,
    teacherId: '',
  });
  const [deleteModal, setDeleteModal] = React.useState(false);
  const year = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  const semester = ['one', 'two'];
  const section = ['a', 'b', 'c'];
  const [teachers, setTeachers] = useState([]);
  const [toUpdate, setToUpdate] = useState({});
  const [deleteId, setDeleteId] = useState({
    distributionId: '',
    offerId: '',
    confirm: false,
  });

  useEffect(() => {
    getCourseDetails();
    getTeachers();
  }, [1]);

  const getTeachers = async () => {
    try {
      const url =
        'http://localhost:1337/api/v1/departments/members/1?where%5Brole%5D=teacher';
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        setTeachers(response.data);
      }
    } catch (error) {
      Toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
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
        setCourseDetails(response.data[0]);
        setLoading(false);
      }
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  }

  const updateOffer = async () => {
    let url =
      'http://localhost:1337/api/v1/course-distribution/' +
      toUpdate?.distributionId;

    let body = {
      academicYear: toUpdate.academicYear.toString(),
      semester: toUpdate.semester,
      section: toUpdate.section,
      departmentId: +router.query.id,
    };

    try {
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(url, body, { headers });
      if (response.status === 200) {
        Toast('success', 'Distribution update successfully.');
      }
    } catch (error) {
      Toast('error', error?.response?.data?.message || 'Something went wrong');
      return;
    }

    url = 'http://localhost:1337/api/v1/course-offerings/' + toUpdate?.offerId;

    body = {
      courseId: +router.query.courseId,
      teacherId: +toUpdate.teacherId,
    };

    try {
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.patch(url, body, { headers });
      if (response.status === 200) {
        getCourseDetails();
        Toast(
          'success',

          'Offer updated successfully.',
        );
        setModal(false);
      }
    } catch (error) {
      Toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };

  const deleteOffer = async () => {
    let url =
      'http://localhost:1337/api/v1/course-distribution/' +
      deleteId?.distributionId;

    try {
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        Toast('success', 'Distribution deleted successfully.');
      }
    } catch (error) {
      Toast('error', error?.response?.data?.message || 'Something went wrong');
      return;
    }

    url = 'http://localhost:1337/api/v1/course-offerings/' + deleteId?.offerId;

    try {
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        getCourseDetails();
        Toast('success', 'Offer deleted successfully.');
        setDeleteModal(false);
      }
    } catch (error) {
      Toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
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
              <Typography variant='h6'>{courseDetails?.name}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h6'>Code:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='h6'>{courseDetails?.code}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h6'>Credit:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='h6'>{courseDetails?.credit}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h6'>Type:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='h6'>{courseDetails?.type}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h6'>Department Name:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='h6'>
                {courseDetails?.department?.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h6'>Description:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='h6'>{courseDetails?.description}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant='h6'>CreatedAt:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='h6'>
                {courseDetails?.createdAt.slice(0, 10)}
              </Typography>
            </Grid>{' '}
            <Grid item xs={3}>
              <Typography variant='h6'>UpdatedAt:</Typography>
            </Grid>
            <Grid item xs={9} style={{ marginBottom: '24px' }}>
              <Typography variant='h6'>
                {courseDetails?.updatedAt.slice(0, 10)}
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
                    <TableCell> Action</TableCell>
                  </TableRow>
                </TableHead>
                {courseDetails.CourseOffering.map((dt, index) => (
                  <TableBody>
                    <TableRow key={index}>
                      <TableCell>{++index}</TableCell>
                      <TableCell>
                        {dt?.CourseDistribution?.department?.name}
                      </TableCell>

                      <TableCell>
                        {dt?.CourseDistribution?.academicYear}
                      </TableCell>
                      <TableCell>{dt?.CourseDistribution?.section}</TableCell>
                      <TableCell>{dt?.CourseDistribution?.semester}</TableCell>
                      <TableCell>{dt?.teacher?.name}</TableCell>

                      <TableCell>{dt?.createdAt.slice(0, 10)}</TableCell>
                      <TableCell>{dt?.updatedAt.slice(0, 10)}</TableCell>
                      <TableCell>
                        <div>
                          <Button
                            id='basic-button'
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup='true'
                            variant='contained'
                            aria-expanded={open ? 'true' : undefined}
                            onClick={e => {
                              setToUpdate({
                                courseId: dt?.courseId,
                                teacherId: dt?.teacherId,
                                academicYear:
                                  dt?.CourseDistribution?.academicYear,
                                section: dt?.CourseDistribution?.section,
                                semester: dt?.CourseDistribution?.semester,
                                distributionId: dt?.courseDistributionId,
                                offerId: dt?.id,
                              });
                              handleClick(e);
                            }}>
                            action
                          </Button>
                          <Menu
                            id='basic-menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              'aria-labelledby': 'basic-button',
                            }}>
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                setModal(true);
                              }}>
                              <BorderColorIcon sx={{ mr: 2 }} /> Update
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setDeleteModal(true);
                                handleClose();
                                setDeleteId({
                                  ...deleteId,
                                  distributionId: dt?.courseDistributionId,
                                  offerId: dt?.id,
                                });
                              }}>
                              <DeleteIcon sx={{ mr: 2, color: '#ff5a5a' }} />{' '}
                              Delete
                            </MenuItem>
                          </Menu>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
          </Grid>
          <Dialog open={openModal} onClose={() => setModal(false)}>
            <DialogTitle sx={{ mb: 3 }}>
              Update offerings and distributions
            </DialogTitle>
            <DialogContent>
              {' '}
              <Grid container spacing={2} sx={{ width: '100%' }}>
                <Grid item xs={12}>
                  <FormControl sx={{ my: 2, width: '100%' }}>
                    {' '}
                    <InputLabel id='SemesterLabel'>Semester</InputLabel>
                    <Select
                      labelId='SemesterLabel'
                      id='Semester'
                      label='Semester'
                      value={toUpdate.semester}
                      onChange={e =>
                        setToUpdate({
                          ...toUpdate,
                          semester: e.target.value,
                        })
                      }>
                      {semester.map((dt, idx) => (
                        <MenuItem
                          value={dt}
                          key={idx}
                          selected={toUpdate.semester === dt ? true : false}>
                          {dt}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ my: 2, width: '100%' }}>
                    <InputLabel id='SectionLabel'>Section</InputLabel>
                    <Select
                      labelId='SectionLabel'
                      id='Section'
                      label='Section'
                      value={toUpdate.section}
                      onChange={e =>
                        setToUpdate({
                          ...toUpdate,
                          section: e.target.value,
                        })
                      }>
                      {section.map((dt, idx) => (
                        <MenuItem
                          value={dt}
                          key={idx}
                          selected={toUpdate.section === dt ? true : false}>
                          {dt}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ my: 2, width: '100%' }}>
                    <InputLabel id='AcademicYear'>Academic Year</InputLabel>
                    <Select
                      labelId='AcademicYear'
                      id='year'
                      label='Academic Year'
                      value={toUpdate.academicYear}
                      onChange={e =>
                        setToUpdate({
                          ...toUpdate,
                          academicYear: e.target.value,
                        })
                      }>
                      {year.map((dt, idx) => (
                        <MenuItem
                          value={dt}
                          key={idx}
                          selected={
                            toUpdate.academicYear === dt ? true : false
                          }>
                          {dt}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id='courseId'
                    disabled
                    label='Course Id'
                    variant='outlined'
                    sx={{ width: '100%' }}
                    value={values.courseId}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ my: 1, width: '100%' }}>
                    {' '}
                    <InputLabel id='teacherIdLabel'>
                      Assign Course Teacher
                    </InputLabel>
                    <Select
                      labelId='teacherIdLabel'
                      id='teacherId'
                      label='Assign Course Teacher'
                      value={toUpdate.teacherId}
                      onChange={e =>
                        setToUpdate({
                          ...toUpdate,
                          teacherId: e.target.value,
                        })
                      }>
                      {teachers.length > 0 &&
                        teachers.map((teacher, idx) => {
                          return (
                            <MenuItem
                              value={teacher?.id}
                              key={idx}
                              selected={
                                toUpdate.teacherId == teacher?.id ? true : false
                              }>
                              {teacher?.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setModal(false)}>Cancel</Button>
              <Button onClick={updateOffer}>update</Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={deleteModal}
            onClose={() => setDeleteModal(false)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title'>
              {'Are you sure to delete the offerings?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'></DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteModal(false)}>cancel</Button>
              <Button
                onClick={() => {
                  setDeleteId({
                    ...deleteId,
                    confirm: true,
                  });
                  deleteOffer();
                }}
                variant='contained'
                sx={{ backgroundColor: '#ff5a5a', color: '#fff' }}
                autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

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
