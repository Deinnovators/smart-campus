import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import Toast from '@webportal/libs/utils/Toast';
import { cookieService } from '@webportal/services';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/system';

const Update = () => {
  const [data, setData] = useState({});
  const router = useRouter();

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('curriculum'));
    setData(data?.curriculum);
  }, []);

  const handleUpdate = async () => {
    let url = 'http://localhost:1337/api/v1/curriculum/' + router.query.currId;

    let body = {
      courseId: +router.query.courseId,
      curriculum: data,
    };

    try {
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let response = await axios.patch(url, body, { headers });
      if (response.status === 200) {
        Toast('success', 'Curriculum updated successfully.');
        setData({
          prerequisites: '',
          textbook: '',
          syllabus: '',
          assignments: '',
          exams: '',
        });
        router.push(router.asPath.replace('/update', ''));
      }
    } catch (error) {
      Toast('error', error?.response?.data?.message || 'Something went wrong');
      return;
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Curriculum Update</title>
      </Head>
      <Container>
        <Box component={Paper} sx={{ p: 3, mt: 8 }}>
          <Typography variant='h5' sx={{ mb: 4 }}>
            Update Curriculum
          </Typography>

          <TextField
            required
            id='prerequisites'
            variant='outlined'
            placeholder='Describe prerequisites'
            multiline
            rows={3}
            sx={{ width: '100%', mb: 2 }}
            value={data?.prerequisites}
            onChange={e =>
              setData({
                ...data,
                prerequisites: e.target.value,
              })
            }
          />

          <TextField
            required
            id='textbook'
            variant='outlined'
            multiline
            placeholder='Describe textbook info like author, edition etc.'
            rows={3}
            sx={{ width: '100%', mb: 2 }}
            value={data?.textbook}
            onChange={e =>
              setData({
                ...data,
                textbook: e.target.value,
              })
            }
          />
          <TextField
            required
            id='syllabus'
            variant='outlined'
            multiline
            placeholder='enter syllabus'
            rows={3}
            sx={{ width: '100%', mb: 2 }}
            value={data?.syllabus}
            onChange={e =>
              setData({
                ...data,
                syllabus: e.target.value,
              })
            }
          />
          <TextField
            required
            id='assignments'
            variant='outlined'
            placeholder='enter assignments'
            multiline
            rows={3}
            sx={{ width: '100%', mb: 2 }}
            value={data?.assignments}
            onChange={e =>
              setData({
                ...data,
                assignments: e.target.value,
              })
            }
          />
          <TextField
            required
            id='exams'
            variant='outlined'
            placeholder='enter exam details'
            multiline
            rows={3}
            sx={{ width: '100%', mb: 4 }}
            value={data?.exams}
            onChange={e =>
              setData({
                ...data,
                exams: e.target.value,
              })
            }
          />

          <Button
            onClick={() => {
              handleUpdate();
            }}
            sx={{ mt: 2 }}
            variant='contained'
            autoFocus>
            Update curriculum
          </Button>
        </Box>
      </Container>
    </Fragment>
  );
};

export default Update;
