import { SessionProvider } from 'next-auth/react';

import { AnimatePresence } from 'framer-motion';

import Layout from '../components/Layout';

import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
