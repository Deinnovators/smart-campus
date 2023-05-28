import React, { Fragment, useEffect } from 'react';
import { cookieService } from '@webportal/services';
import { useRouter } from 'next/router';
import axios from 'axios';
import Toast from '@webportal/libs/utils/Toast';
import Head from 'next/head';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Curriculum = () => {
  const router = useRouter();
  const [curriculum, setCurriculum] = React.useState({});

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
        setCurriculum(response.data);
      }
    } catch (error) {
      Toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <Fragment>
      <Head>
        <title>Curriculum</title>
      </Head>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant='h4' sx={{ my: 15 }}>
          Curriculum coming soon
        </Typography>
      </Box>
    </Fragment>
  );
};

export default Curriculum;
