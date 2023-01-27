import '@dashboard/styles/globals.css';
import { Inter } from '@next/font/google';

import { AppProps } from 'next/app';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
