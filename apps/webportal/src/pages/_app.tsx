import { PageWrapper } from '@webportal/components';
import { AppThemeProvider } from '@webportal/libs/providers/theme.provider';
import '@webportal/styles/globals.css';
import { Inter } from '@next/font/google';
import { ReactElement, useEffect } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({ Component, pageProps }: any) {
  useEffect(() => {
    if (document !== undefined) {
      document.body.className = `${inter.variable} font-sans`;
    }
  }, []);
  const getLayout =
    Component.getLayout ||
    ((page: ReactElement) => <PageWrapper>{page}</PageWrapper>);
  return (
    <AppThemeProvider>
      {getLayout(<Component {...pageProps} />)}
    </AppThemeProvider>
  );
}
