import React from 'react';
import { Box, Typography } from '@mui/material';

interface BusNumberProps {
  busNumber: number | string;
  size?: number;
  sizeRatio?: number;
}

export const BusNumber: React.FC<BusNumberProps> = ({
  busNumber,
  size = 32,
  sizeRatio = 0.45,
}) => {
  return (
    <Box
      border={2}
      height={size}
      width={size}
      borderRadius={size / 2}
      display='flex'
      justifyContent='center'
      alignItems='center'>
      <Typography fontWeight='bold' fontSize={size * sizeRatio} variant='body2'>
        {busNumber}
      </Typography>
    </Box>
  );
};
