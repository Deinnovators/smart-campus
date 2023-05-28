import React, { useState } from 'react';
import { Card, CardContent, Typography, Fade, styled } from '@mui/material';
// import CountUp from 'react-countup';

const CustomCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgba(22, 196, 202, 0.1)',
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 4px rgba(22, 196, 202, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transform: 'scale(1.05)',
  },
}));

export const BriefCard = ({ name, value }) => {
  const [taskCount, setTaskCount] = useState(1);
  return (
    <Fade in={true} timeout={500}>
      <CustomCard>
        <CardContent>
          <Typography variant='h5' component='h2'>
            Total number of {name} : {value}
          </Typography>
        </CardContent>
      </CustomCard>
    </Fade>
  );
};
