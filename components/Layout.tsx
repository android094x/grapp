import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from './Header';
import HeroBG from './Hero';

interface ComponentProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ComponentProps) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>GRAPP | Games Review App</title>
        <meta name='description' content='Website to search and review games' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      {router.pathname === '/' && <HeroBG />}
      <main className='w-full'>{children}</main>
      {router.pathname !== '/' && <footer>footer</footer>}
    </>
  );
};

export default Layout;
