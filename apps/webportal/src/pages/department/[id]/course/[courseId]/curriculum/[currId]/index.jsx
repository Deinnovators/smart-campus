import React, { Fragment, useEffect, useState } from 'react';
import { cookieService } from '@webportal/services';
import { useRouter } from 'next/router';
import axios from 'axios';
import Toast from '@webportal/libs/utils/Toast';
import Head from 'next/head';
import {
  Button,
  Paper,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from '@mui/material';
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ViewCurriculum = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  useEffect(() => {
    getCurriculum();
  }, []);

  const getCurriculum = async () => {
    try {
      const url =
        'http://localhost:1337/api/v1/curriculum/' + router.query.currId;
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      Toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <Fragment>
      <Head>
        <title>Curriculum </title>
      </Head>
      <Container>
        <Box sx={{ p: 3, mt: 8 }}>
          <Typography variant='h5' sx={{ mb: 4 }}>
            Curriculum
          </Typography>

          <Accordion sx={{ p: 1, mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6'>Prerequisites</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{data?.curriculum?.prerequisites}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ p: 1, mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6'>Textbook</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{data?.curriculum?.textbook}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ p: 1, mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6'>Syllabus</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{data?.curriculum?.syllabus}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ p: 1, mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6'>Assignments</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{data?.curriculum?.assignments}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ p: 1, mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6'>Textbook</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{data?.curriculum?.textbook}</Typography>
            </AccordionDetails>
          </Accordion>

          <Button
            onClick={() => {
              localStorage.setItem('curriculum', JSON.stringify(data));
              router.push(router.asPath + '/update');
            }}
            sx={{ mt: 2 }}
            variant='contained'
            autoFocus>
            {'update curriculum'}
          </Button>
        </Box>
      </Container>{' '}
    </Fragment>
  );
};

export default ViewCurriculum;
