import { useSession } from 'next-auth/react';
import Link from 'next/link';

const HeroBG = () => {
  const { data: session } = useSession();
  return (
    <>
      <section
        className='w-full h-screen flex justify-center items-center relative'
        style={{
          background: 'url(/images/hero-bg2.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='top-0 left-0 absolute bg-black bg-opacity-50 h-screen w-full' />
        <div className='z-10 flex flex-col items-center space-y-4'>
          <h2 className='font-press-start-2p text-white text-xl sm:text-2xl md:text-4xl lg:text-6xl'>
            {' '}
            Welcome{' '}
            <span className='text-houm-orange'>
              {session?.user ? session?.user?.name?.split(' ')[0] : 'Stranger'}
            </span>
            !
          </h2>
          <p className='text-white text-sm md:text-xl'>
            This is a web app where you can search & review{' '}
            <span className='text-houm-orange font-bold'>any</span> game you
            want!
          </p>
          <Link href='/games'>
            <a className='bg-houm-orange text-2xl px-8 py-4 rounded-full text-white hover:bg-houm-dark-orange transition-all duration-200 ease-out hover:scale-110 hover:skew-x-6'>
              Start here!
            </a>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HeroBG;
