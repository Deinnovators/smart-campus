import { AppThemeProvider } from '@dashboard/libs/providers/theme.provider';
import '@dashboard/styles/globals.css';
import { Inter } from '@next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({ Component, pageProps }: any) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <AppThemeProvider>
        <Component {...pageProps} />
      </AppThemeProvider>
    </main>
  );
}
