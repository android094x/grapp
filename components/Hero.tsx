import { useSession } from 'next-auth/react';
import Search from './Search';

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
            Search for <span className='text-houm-orange font-bold'>any</span>{' '}
            game you want to review
          </p>
          {/* <input
            type='text'
            className='w-3/4 py-1 px-3 rounded-full text-xl outline-none focus:border-houm-orange border-2'
          /> */}
          <Search />
        </div>
      </section>
    </>
  );
};

export default HeroBG;
