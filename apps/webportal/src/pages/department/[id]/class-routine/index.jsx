import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Toast from '@webportal/libs/utils/Toast';
import { cookieService } from '@webportal/services';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Container, Grid, Paper } from '@mui/material';
import ClassRoutineTable from '../../../../components/ClassRoutineTable';
import EditIcon from '@mui/icons-material/Edit';

const ClassRoutine = () => {
  const router = useRouter();
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    getCurriculum();
  }, [1]);

  const getCurriculum = async () => {
    try {
      const url =
        'http://localhost:1337/api/v1/class-routine/department/' +
        router.query.id;
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        console.log(response.data);
        setRoutine(response.data);
      }
    } catch (error) {
      Toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <Fragment>
      <Container sx={{ p: 2 }}>
        <Grid container style={{ marginTop: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '24px 0px',
              flexWrap: 'wrap-reverse',
            }}>
            <Typography variant='h4'>Class Routine</Typography>
            <Button
              variant='contained'
              onClick={() => {
                router.push(router.asPath + '/create');
              }}>
              Create routine
            </Button>
          </div>
        </Grid>
        {routine.length > 0 ? (
          routine.map((item, idx) => (
            <Accordion sx={{ mb: 2 }} key={idx}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {' '}
                  <Typography>
                    Level: {item?.level} Semester: {item?.semester} Session:{' '}
                    {item?.session}
                  </Typography>
                  <EditIcon
                    sx={{ cursor: 'pointer', mr: 2 }}
                    onClick={() => {
                      localStorage.setItem('routineData', JSON.stringify(item));
                      router.push(router.asPath + '/update');
                    }}
                  />
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <ClassRoutineTable
                  routineData={item}
                  viewConditionalSection={false}
                />
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography variant='h6' sx={{ my: 10 }}>
            No routine found for this department. Please create one.
          </Typography>
        )}
      </Container>
    </Fragment>
  );
};

export default ClassRoutine;
