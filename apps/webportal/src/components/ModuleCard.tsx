import { Box, Card, Typography } from '@mui/material';
import { getModuleImageUrl } from '@webportal/libs/utils/string.utils';
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
      <Card sx={{ margin: 2, padding: 1 }}>
        <Box height={180} width={180} position='relative' overflow='hidden'>
          <Image src={getModuleImageUrl(module.icon)} fill alt={module.name} />
        </Box>
        <Typography py={1} style={{ textAlign: 'center' }} variant='h6'>
          {module.name}
        </Typography>
      </Card>
    </Link>
  );
};
