import { Box, Typography, Fade, CircularProgress } from '@mui/material';
import React from 'react';

export interface OverlayLoaderProps {
  loading?: boolean;
  loaderSize?: number | string;
  title?: string;
}

export const OverlayLoader: React.FC<OverlayLoaderProps> = ({
  loading,
  loaderSize,
  title,
}) => {
  return (
    <Fade in={loading}>
      <Box
        position='fixed'
        top={0}
        bottom={0}
        left={0}
        right={0}
        zIndex={99}
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        bgcolor='rgba(0, 0, 0, 0.5)'>
        <CircularProgress size={loaderSize} />
        {title ? (
          <Typography sx={{ margin: 2 }} color='white'>
            {title}
          </Typography>
        ) : null}
      </Box>
    </Fade>
  );
};
