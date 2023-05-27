import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { useRouter } from 'next/router';
import Toast from '@webportal/libs/utils/Toast';
import { cookieService } from '@webportal/services';
import axios from 'axios';
import { DataThresholding } from '@mui/icons-material';

const steps = ['Create a distribution', 'Create an offerings', 'Finish'];
const OfferAndDistribute = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    courseId: +router.query.courseId,
    teacherId: '',
  });
  const [distributionValues, setDistributionValues] = useState({
    academicYear: '',
    semester: '',
    section: '',
    departmentId: +router.query.id,
  });
  const year = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  const semester = ['one', 'two'];
  const section = ['a', 'b', 'c'];
  const [teachers, setTeachers] = useState([]);

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [courseDistributionId, setCourseDistributionId] = useState(null);

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  useEffect(() => {
    getTeachers();
  }, []);

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
  const createOffer = async (index: number) => {
    let url = 'http://localhost:1337/api/v1/course-distribution';

    let body: any = distributionValues;

    if (index === 1) {
      url = 'http://localhost:1337/api/v1/course-offerings';
      body = {
        ...values,
        courseDistributionId: courseDistributionId,
      };
    } else if (index === 2) {
      router.push(router.asPath.replace('/offer-and-distribute', ''));
      return;
    }
    try {
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(url, body, { headers });
      if (response.status === 201) {
        if (index === 0) {
          setCourseDistributionId(response.data.id);
        }
        Toast(
          'success',
          index === 0
            ? 'Distribution created successfully. Now you can create a offer '
            : 'Offer created successfully',
        );

        handleNext();
      }
    } catch (error) {
      Toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };

  const checkDisable = () => {
    let bool = false;
    if (
      activeStep === 0 &&
      (distributionValues.academicYear === '' ||
        distributionValues.semester === '' ||
        distributionValues.section === '')
    ) {
      bool = true;
    } else if (
      activeStep === 1 &&
      (values.courseId === '' || values.teacherId === '')
    ) {
      bool = true;
    }
    return bool;
  };

  return (
    <Box sx={{ width: '100%', marginTop: '10%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        {activeStep === 0 ? (
          <Box>
            {' '}
            <Typography variant='h5' sx={{ p: 6, pb: 0 }}>
              Create Distribution
            </Typography>
            <Grid container spacing={2} sx={{ width: '100%', p: 6 }}>
              <Grid item xs={12}>
                <FormControl sx={{ mb: 2, width: '100%' }}>
                  {' '}
                  <InputLabel id='SemesterLabel'>Semester</InputLabel>
                  <Select
                    labelId='SemesterLabel'
                    id='Semester'
                    label='Semester'
                    value={distributionValues.semester}
                    onChange={e =>
                      setDistributionValues({
                        ...distributionValues,
                        semester: e.target.value,
                      })
                    }>
                    {semester.map((dt, idx) => (
                      <MenuItem value={dt} key={idx}>
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
                    value={distributionValues.section}
                    onChange={e =>
                      setDistributionValues({
                        ...distributionValues,
                        section: e.target.value,
                      })
                    }>
                    {section.map((dt, idx) => (
                      <MenuItem value={dt} key={idx}>
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
                    value={distributionValues.academicYear}
                    onChange={e =>
                      setDistributionValues({
                        ...distributionValues,
                        academicYear: e.target.value.toString(),
                      })
                    }>
                    {year.map((dt, idx) => (
                      <MenuItem value={dt} key={idx}>
                        {dt}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        ) : activeStep === 1 ? (
          <Box>
            {' '}
            <Typography variant='h5' sx={{ p: 6, pb: 0 }}>
              Create Offer
            </Typography>
            <Grid container spacing={2} sx={{ width: '100%', p: 6 }}>
              <Grid item xs={12}>
                <TextField
                  required
                  id='courseId'
                  disabled
                  label='Course Id'
                  variant='outlined'
                  sx={{ width: '100%' }}
                  value={values.courseId}
                  // onChange={e =>
                  //   setValues({ ...values, courseId: e.target.value })
                  // }
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
                    value={values.teacherId}
                    onChange={e =>
                      setValues({ ...values, teacherId: e.target.value })
                    }>
                    {teachers.length > 0 &&
                      teachers.map((teacher, idx) => (
                        <MenuItem value={teacher?.id} key={idx}>
                          {teacher?.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{
              my: 5,
              display: 'flex',
              justifyContent: 'center',
              p: 10,
              pb: 1,
            }}>
            <Typography variant='h4'>Successfully Created.</Typography>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            pt: 2,
            justifyContent: 'center',
          }}>
          <Button
            onClick={() => {
              createOffer(activeStep);
            }}
            disabled={checkDisable()}
            variant='contained'>
            {activeStep === 0
              ? 'Create Distribution'
              : activeStep === 1
              ? 'Create Offer'
              : 'Go to course details'}
          </Button>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default OfferAndDistribute;
