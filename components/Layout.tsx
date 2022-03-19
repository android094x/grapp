import * as React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

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
      <main className='w-full min-h-screen'>{children}</main>
      {router.pathname !== '/' && (
        <footer className='w-full text-center bg-houm-gray text-white py-2'>
          Copyright © <span className='text-houm-orange'>GRAPP</span>. All
          Rights Reserved.
        </footer>
      )}
    </>
  );
};

export default Layout;
