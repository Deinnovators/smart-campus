import { FC, ReactNode } from 'react';
import Container, { ContainerProps } from '@mui/material/Container';
import { NavbarProps, Navbar } from '@webportal/components/navs/Navbar';
import { createStyles, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useAppCurrentTheme } from '@webportal/libs/hooks';
import { Box } from '@mui/material';

interface PageWrapperProps extends NavbarProps {
  children?: ReactNode;
  containerProps?: ContainerProps;
}

function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}>
      {'Copyright © '}
      <Link component={NextLink} color='inherit' href='/'>
        HSTU Portal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  containerProps = {},
  ...props
}) => {
  return (
    <Container {...containerProps}>
      <Navbar {...props} />
      <Box sx={{ marginTop: 10 }} />
      {children}
      <footer>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </footer>
    </Container>
  );
};
