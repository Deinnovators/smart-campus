import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import Head from 'next/head';
export default function CreateDepartment() {
  const [name, setName] = useState('');
  const [deanId, setDeanId] = useState(0);
  const [deanMessage, setDeanMessage] = useState('');
  const [departments, setDepartments] = useState<any[]>([]);
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };
  const handleDeanIdChange = (event: any) => {
    setDeanId(event.target.value);
  };

  const handleDeanMessageChange = (event: any) => {
    setDeanMessage(event.target.value);
  };

  const handleAddDepartment = (event: any) => {
    event.preventDefault();
    const departmentName: any = event.target.elements.departmentName.value;
    setDepartments([...departments, departmentName]);
    event.target.reset();
  };
  return (
    <Container>
      <Head>
        <title>Modules Registry</title>
      </Head>
      <form onSubmit={handleAddDepartment}>
        <TextField
          label='Name'
          variant='outlined'
          margin='normal'
          fullWidth
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          label='Dean ID'
          variant='outlined'
          margin='normal'
          type='number'
          fullWidth
          value={deanId}
          onChange={handleDeanIdChange}
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
            style={{ display: 'block' }}
            variant='contained'
            color='primary'
            type='submit'>
            Add Faculty
          </Button>
        </div>
      </form>
    </Container>
  );
}
