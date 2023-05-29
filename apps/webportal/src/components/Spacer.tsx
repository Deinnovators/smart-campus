import { Box } from '@mui/material';
import React from 'react';

export interface SpacerProps {
  space?: 'tiny' | 'small' | 'medium' | 'large' | number;
  direction?: 'vertical' | 'horinzontal';
}

export const Spacer: React.FC<SpacerProps> = ({
  space = 'tiny',
  direction = 'vertical',
}) => {
  let responsiveSpace;
  switch (space) {
    case 'small':
      responsiveSpace = 4;
      break;

    case 'medium':
      responsiveSpace = 6;
      break;

    case 'large':
      responsiveSpace = 8;
      break;

    default:
      responsiveSpace = 2;
  }

  if (typeof space === 'number') {
    responsiveSpace = space;
  }

  return (
    <Box
      my={direction === 'vertical' ? responsiveSpace : 0}
      mx={direction === 'horinzontal' ? responsiveSpace : 0}
    />
  );
};
