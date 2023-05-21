import React, { useState } from 'react';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Button,
} from '@mui/material';
import Head from 'next/head';
import { Container } from '@mui/system';
import { Edit, Delete } from '@mui/icons-material';

import Link from 'next/link';

const faculties = [
  {
    id: 1,
    name: 'Faculty of Engineering',
    deanMessage: 'Welcome to Faculty of Science',

    departments: [
      {
        id: 1,
        name: 'Department of Computer Science',
      },
      {
        id: 2,
        name: 'Department of Computer Science',
      },
      {
        id: 3,
        name: 'Department of Computer Science',
      },
    ],
  },
  {
    id: 2,
    name: 'Faculty of Science',
    deanMessage: 'Welcome to Faculty of Science',

    departments: [
      {
        id: 1,
        name: 'Department of Computer Science',
      },
      {
        id: 2,
        name: 'Department of Computer Science',
      },
      {
        id: 3,
        name: 'Department of Computer Science',
      },
    ],
  },
  {
    id: 3,
    name: 'Faculty of Arts',
    deanMessage: 'Welcome to Faculty of Science',

    departments: [
      {
        id: 1,
        name: 'Department of Computer Science',
      },
      {
        id: 2,
        name: 'Department of Computer Science',
      },
      {
        id: 3,
        name: 'Department of Computer Science',
      },
    ],
  },
];

export default function FacultyModule() {
  const [expanded, setExpanded] = useState(false);
  const handleAccordionChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Container>
      <Head>
        <title>Faculty</title>
      </Head>
      <div>
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Typography variant='h4' gutterBottom>
            Faculties
          </Typography>
          {faculties.map(faculty => (
            <Accordion
              key={faculty.id}
              expanded={expanded === faculty.id}
              onChange={handleAccordionChange(faculty.id)}>
              <AccordionSummary
                style={{ display: 'flex', alignItems: 'center' }}
                expandIcon={<span className='material-icons'></span>}>
                <Typography style={{ flexGrow: 1 }} variant='h5'>
                  {faculty.name}
                </Typography>

                <Link key={'1'} href={`/faculty/edit/${faculty.id}`} passHref>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </Link>
                <IconButton>
                  <Delete />
                </IconButton>
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
          <Button
            variant='contained'
            color='primary'
            style={{ marginTop: '1rem' }}
            component={Link}
            href='/faculty/new'>
            Add New Faculty
          </Button>
        </div>
      </div>
    </Container>
  );
}
