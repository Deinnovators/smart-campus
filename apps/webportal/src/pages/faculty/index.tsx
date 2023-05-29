import React, { useEffect, useState } from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import Head from 'next/head';
import { Container } from '@mui/system';
import { Edit, Delete } from '@mui/icons-material';

import Link from 'next/link';
import { cookieService } from '@webportal/services';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BriefCard } from '@webportal/components/BriefCard';

export default function FacultyModule() {
  const [expanded, setExpanded] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [role, setRole] = useState('');
  const [departments, setDepartments] = useState([]);
  const handleAccordionChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() => {
    getAllFaculties();
    getRole();
    getAllDepartments();
  }, [1]);
  const getAllFaculties = async () => {
    try {
      const url = 'http://localhost:1337/api/v1/faculty';
      const token = cookieService.get('token');
      if (!token) throw new Error('No user token found');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(url, { headers });
      if (response.status === 200) {
        setFaculties(response.data);
      }
    } catch (error) {
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
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
      toast('error', error?.response?.data?.message || 'Something went wrong');
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
      toast('error', error?.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <Container>
      <Head>
        <title>Faculty</title>
      </Head>
      <div>
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
              <BriefCard name='Faculty' value={faculties.length} />
            </Grid>
            <Grid item xs={6}>
              <BriefCard name='Department' value={departments.length} />
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
              {faculties.map(faculty => (
                <Accordion
                  key={faculty.id}
                  expanded={expanded === faculty.id}
                  onChange={handleAccordionChange(faculty.id)}>
                  <AccordionSummary
                    style={{ display: 'flex', alignItems: 'center' }}
                    expandIcon={<span className='material-icons'></span>}>
                    <Link
                      onClick={handleAccordionChange(false)}
                      key={'1'}
                      href={`/faculty/${faculty.id}`}
                      passHref>
                      <Typography style={{ flexGrow: 1 }} variant='h5'>
                        {faculty.name}
                      </Typography>
                    </Link>

                    {/* {role === 'admin' || role === 'superadmin' ? (
                      <Link
                        key={'1'}
                        href={`/faculty/edit/${faculty.id}`}
                        passHref>
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </Link>
                    ) : null}
                    {role === 'admin' || role === 'superadmin' ? (
                      <IconButton>
                        <Delete />
                      </IconButton>
                    ) : null} */}
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      {faculty.departments.map(department => (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}>
                          <div>
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
                          </div>
                          <div>
                            {' '}
                            <Link
                              key={'1'}
                              href={`/department/edit/${department.id}`}
                              passHref>
                              <IconButton>
                                <Edit />
                              </IconButton>
                            </Link>
                            <IconButton>
                              <Delete />
                            </IconButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
          {role === 'admin' || role === 'superadmin' ? (
            <Button
              variant='contained'
              color='primary'
              style={{ marginTop: '1rem' }}
              component={Link}
              href='/faculty/new'>
              Add New Faculty
            </Button>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
