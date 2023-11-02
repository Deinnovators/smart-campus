import { ArrowForward } from '@mui/icons-material';
import { Box, Card, Typography } from '@mui/material';
import { BusNumber } from '@webportal/components/BusNumber';
import {
  getAndSeperatedName,
  getSpaceSeperatedName,
} from '@webportal/libs/utils/string.utils';
import { TransportSchedule } from 'database';
import dayjs from 'dayjs';
import React from 'react';

interface UpcomingCardProps {
  schedule: TransportSchedule;
}

export const UpcomingCard: React.FC<UpcomingCardProps> = ({ schedule }) => {
  return (
    <Card sx={{ padding: 2, mr: 2, mb: 2, width: '48%' }}>
      <Box display='flex' alignItems='center'>
        <BusNumber
          busNumber={schedule.transport.busNumber}
          size={48}
          sizeRatio={0.35}
        />
        <Box ml={2}>
          <Typography variant='h6' color='green'>
            {dayjs(schedule.time).format('hh:mma')}
          </Typography>
          <Box display='flex' alignItems='center'>
            <Typography variant='body2'>
              {getSpaceSeperatedName(schedule.stoppages[0])}
            </Typography>
            <ArrowForward fontSize='small' sx={{ mx: 1 }} />
            <Typography variant='body2'>
              {getSpaceSeperatedName(
                schedule.stoppages[schedule.stoppages.length - 1],
              )}
            </Typography>
          </Box>
          <Typography variant='body2'>
            For:{' '}
            <Typography variant='body2' component='span' color='tomato'>
              {getAndSeperatedName(schedule.tripName)}
            </Typography>
          </Typography>
          {schedule.scheduleDay && (
            <Typography variant='body2'>On: {schedule.scheduleDay}</Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
};
