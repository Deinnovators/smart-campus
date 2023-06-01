import {
  AlternateEmail,
  Domain,
  LocalPhone,
  School,
} from '@mui/icons-material';
import { Avatar, Box, Button, Card, Typography } from '@mui/material';
import { Spacer } from '@webportal/components/Spacer';
import { getUserImageUrl } from '@webportal/libs/utils/string.utils';
import { User } from 'database';
import Image from 'next/image';
import React from 'react';

export interface UserOverviewProps {
  user?: User;
  primaryBtnTitle?: string;
  onPrimaryBtnClick?: () => void;
  primaryBtnError?: boolean;
}

const avatarSize = 200;

export const UserOverview: React.FC<UserOverviewProps> = ({
  user,
  primaryBtnTitle,
  onPrimaryBtnClick,
  primaryBtnError,
}) => {
  return (
    <Card>
      <Box p={2}>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Avatar
            variant='circular'
            sx={{ width: avatarSize, height: avatarSize }}>
            <Image
              src={getUserImageUrl(user?.avatar)}
              alt={`${user?.name}-avatar`}
              fill
            />
          </Avatar>
        </Box>
        <Spacer />
        <Typography variant='h6'>{user?.name}</Typography>
        <Typography variant='subtitle1'>{user?.role}</Typography>
        <Typography variant='subtitle1' sx={{ my: 2 }}>
          {user?.bio}
        </Typography>
        <Spacer />
        {primaryBtnTitle ? (
          <Button
            fullWidth
            variant='outlined'
            onClick={onPrimaryBtnClick}
            color={primaryBtnError ? 'error' : 'primary'}>
            {primaryBtnTitle}
          </Button>
        ) : null}
        <DetailsRow Icon={AlternateEmail} title={user?.email} />
        <DetailsRow Icon={LocalPhone} title={user?.mobile} />
        <DetailsRow Icon={School} title={user?.department?.name} />
        <DetailsRow Icon={Domain} title={user?.faculty?.name} />
      </Box>
    </Card>
  );
};

const DetailsRow = ({ Icon, title }: any) => {
  if (!title) return null;
  return (
    <Box my={2} display='flex' alignItems='center'>
      <Icon />
      <Spacer space={1} direction='horinzontal' />
      <Typography variant='subtitle2'>{title}</Typography>
    </Box>
  );
};
