import React, { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import Head from 'next/head';
export default function CreateFaculty() {
  const [name, setName] = useState('');
  const [deanId, setDeanId] = useState(0);
  const [deanMessage, setDeanMessage] = useState('');
  const [departments, setDepartments] = useState([]);
  const handleNameChange = event => {
    setName(event.target.value);
  };
  const handleDeanIdChange = event => {
    setDeanId(event.target.value);
  };

  const handleDeanMessageChange = event => {
    setDeanMessage(event.target.value);
  };

  const handleAddDepartment = event => {};
  return (
    <Container>
      <Head>
        <title>Modules Registry</title>
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
          <form onSubmit={handleAddDepartment}>
            <Select
              labelId='demo-simple-select-standard-label'
              id='demo-simple-select-standard-label'
              value={deanId}
              onChange={handleDeanIdChange}
              label='DeanID'>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <TextField
              label='Name'
              variant='outlined'
              margin='normal'
              fullWidth
              value={name}
              onChange={handleNameChange}
            />

            <TextField
              label='Dean Message'
              variant='outlined'
              margin='normal'
              fullWidth
              multiline
              rows={4}
              value={deanMessage}
              onChange={handleDeanMessageChange}
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
