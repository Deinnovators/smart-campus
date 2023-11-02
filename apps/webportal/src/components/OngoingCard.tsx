import { Box, Card, Typography } from '@mui/material';
import { BusNumber } from '@webportal/components/BusNumber';
import {
  getAndSeperatedName,
  getSpaceSeperatedName,
} from '@webportal/libs/utils/string.utils';
import { Trip } from 'database';
import dayjs from 'dayjs';
import React from 'react';

interface OngoingCardProps {
  trip: Trip;
}

export const OngoingCard: React.FC<OngoingCardProps> = ({ trip }) => {
  const currentStopIndex = trip.schedule.stoppages.findIndex(
    s => s === trip.nextStop,
  );
  return (
    <Card sx={{ padding: 2, mr: 2, mb: 2, width: '48%' }}>
      <Box display='flex' alignItems='center'>
        <BusNumber
          busNumber={trip.schedule.transport.busNumber}
          size={48}
          sizeRatio={0.35}
        />
        <Box display='flex' flexDirection='column' ml={2}>
          <Typography variant='body2'>
            For:{' '}
            <Typography variant='body2' component='span' color='tomato'>
              {getAndSeperatedName(trip.schedule.tripName)}
            </Typography>
          </Typography>
          <Typography variant='body2'>
            From: {getSpaceSeperatedName(trip.schedule.stoppages[0])}
          </Typography>
          <Typography variant='body2'>
            Prev Stop:{' '}
            {getSpaceSeperatedName(
              trip.schedule.stoppages[currentStopIndex - 1],
            )}{' '}
            <Typography color='GrayText' variant='caption'>
              (Left at: {dayjs(trip.prevLeftAt).format('hh:mma')})
            </Typography>
          </Typography>
          <Typography variant='body2'>
            Next:{' '}
            <Typography
              variant='body2'
              component='span'
              color='green'
              fontWeight='bold'>
              {getSpaceSeperatedName(trip.nextStop!)}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
