import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { BriefCard } from '@webportal/components/BriefCard';
import { cookieService } from '@webportal/services';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
export default function DepartmentModule() {
  const [departments, setDepartments] = useState([]);
  const [role, setRole] = useState('');
  useEffect(() => {
    getRole();
    getAllDepartments();
  }, [1]);
  const getAllDepartments = async () => {
    try {
      const url = 'http://localhost:1337/api/v1/departments';
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        setDepartments(response.data);
      }
    } catch (error) {
      // toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  const getRole = async () => {
    try {
      const url = 'http://localhost:1337/api/v1/auth/profile';
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        setRole(response.data.role);
      }
    } catch (error) {
      // toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <Container>
      <Head>
        <title>Modules Registry</title>
      </Head>
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Grid
          container
          component={Paper}
          spacing={2}
          style={{
            padding: '24px',
            marginTop: '24px',
            marginBottom: '24px',
          }}>
          <Grid item xs={6}>
            <BriefCard name='Department' value={departments.length} />
          </Grid>
          <Grid item xs={6}>
            <BriefCard name='Degree' value={departments.length} />
          </Grid>
        </Grid>
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
            {departments.map(department => {
              return (
                <Link
                  key={department.id}
                  href={`/department/${department.id}`}
                  passHref>
                  <Typography
                    style={{
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                    variant='subtitle1'>
                    {department.name}
                  </Typography>
                </Link>
              );
            })}
          </Grid>
        </Grid>

        {role === 'admin' || role === 'superadmin' ? (
          <Button
            variant='contained'
            color='primary'
            style={{ marginTop: '1rem' }}
            href='/department/new'>
            Add New Departement
          </Button>
        ) : null}
      </div>
    </Container>
  );
}
