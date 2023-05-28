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
        <Grid container spacing={2} style={{ marginTop: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '24px 16px',
              flexWrap: 'wrap-reverse',
            }}>
            <Typography variant='h4'>Class Routine</Typography>
            <Button
              variant='contained'
              onClick={() => {
                router.push(router.asPath + '/create');
              }}>
              Create a routine
            </Button>
          </div>
        </Grid>
        {/* {routine.map((item, idx) => (
          <Accordion sx={{ mb: 2 }} key={idx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                Session: {item?.academicYear} semester:{item?.semester}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))} */}
      </Container>
    </Fragment>
  );
};

export default ClassRoutine;
