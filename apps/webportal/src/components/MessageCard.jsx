import React from 'react';
import { Card, CardContent, Typography, styled } from '@mui/material';

const CustomCard = styled(Card)(({ theme }) => ({
  width: 'fit-content',
  backgroundColor: 'black',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const SenderName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const MessageText = styled(Typography)({
  fontSize: '14px',
  lineHeight: '1.5',
});

export const MessageCard = ({ name, message }) => {
  return (
    <CustomCard>
      <CardContent>
        <SenderName variant='body1'>{name}</SenderName>
        <MessageText variant='body2'>{message}</MessageText>
      </CardContent>
    </CustomCard>
  );
};
