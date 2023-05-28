import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Paper } from '@mui/material';
import Head from 'next/head';
export default function CreateCourse() {
  console.log('hello');
  const handleAddCourse = event => {};
  return (
    <Container>
      <Head>
        <title>Create Course</title>
      </Head>
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
          <form onSubmit={handleAddCourse}>
            <TextField
              label=' Course Name'
              variant='outlined'
              margin='normal'
              fullWidth
              //   value={name}
              //   onChange={handleNameChange}
            />
            <TextField
              label='Course Code'
              variant='outlined'
              margin='normal'
              fullWidth
              //   value={name}
              //   onChange={handleNameChange}
            />
            <TextField
              label='Course Credit'
              variant='outlined'
              margin='normal'
              fullWidth
              //   value={name}
              //   onChange={handleNameChange}
            />

            <TextField
              label='Course Description'
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              rows={4}
              //   value={deanMessage}
              //   onChange={handleDeanMessageChange}
            />
            <TextField
              label='Course Type'
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              rows={4}
              //   value={deanMessage}
              //   onChange={handleDeanMessageChange}
            />
            <TextField
              label='Department ID'
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              rows={4}
              //   value={deanMessage}
              //   onChange={handleDeanMessageChange}
            />
            <div>
              <Button
                style={{ display: 'block', marginTop: '24px' }}
                variant='contained'
                color='primary'
                type='submit'>
                Add Faculty
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
