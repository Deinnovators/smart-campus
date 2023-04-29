import { Box, Card, Typography } from '@mui/material';
import { ModuleRegistry } from 'database';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface ModuleCardProps {
  module: ModuleRegistry;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const link = module.url.includes('/') ? module.url : `/modules/${module.url}`;
  return (
    <Link href={link}>
      <Card>
        <Box height={200} position='relative' overflow='hidden'>
          <Image src={module.icon} fill alt={module.name} />
        </Box>
        <Typography style={{ padding: 8 }} variant='h6'>
          {module.name}
        </Typography>
      </Card>
    </Link>
  );
};
