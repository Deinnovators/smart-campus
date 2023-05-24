import { PageWrapper } from '@webportal/components';
import { AppThemeProvider } from '@webportal/libs/providers/theme.provider';
import '@webportal/styles/globals.css';
import { Inter } from '@next/font/google';
import { ReactElement, ReactNode, useEffect } from 'react';
import App, { AppInitialProps, AppProps } from 'next/app';
import { AppThemeMode } from '@webportal/libs/contexts/theme.context';
import { NextPage } from 'next';
import { ToastContainer } from 'react-toastify';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

interface MyAppProps {
  themeMode: AppThemeMode;
}

type CustomAppProps = AppProps & {
  Component: NextPage & {
    getLayout: (page: ReactElement) => ReactNode;
  };
};

export default function MyApp({
  Component,
  pageProps,
  themeMode,
}: MyAppProps & CustomAppProps) {
  useEffect(() => {
    if (document !== undefined) {
      document.body.className = `${inter.variable} font-sans`;
    }
  }, []);
  const getLayout =
    Component.getLayout ||
    ((page: ReactElement) => <PageWrapper>{page}</PageWrapper>);
  return (
    <AppThemeProvider themeMode={themeMode}>
      {getLayout(<Component {...pageProps} />)}
    </AppThemeProvider>
  );
}

MyApp.getInitialProps = async (
  context: any,
): Promise<MyAppProps & AppInitialProps> => {
  const mainContext = await App.getInitialProps(context);
  const { ctx } = context;
  const themeMode = ctx?.req?.cookies?.themeMode ?? 'dark';

  return { ...mainContext, themeMode };
};
