import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

import { IoMenu } from 'react-icons/io5';

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);

  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onBodyClick = (e: any) => {
      if (ref.current !== null) {
        if (ref.current.contains(e.target)) return;
        setShowMobileMenu(false);
      }
    };

    document.body.addEventListener('click', onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true,
      });
    };
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      setIsScrolling((prevState): boolean => {
        if (
          !prevState &&
          (document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20)
        )
          return true;

        if (
          prevState &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        )
          return false;

        return prevState;
      });
    };

    window.addEventListener('scroll', onScroll, { capture: true });

    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
    };
  }, []);

  console.log();

  return (
    <>
      <header
        className={`flex justify-between items-center h-16 px-6 fixed z-50 w-full ${
          isScrolling
            ? 'shadow-md bg-white text-houm-dark-gray transition-all duration-500 ease-out'
            : 'bg-transparent text-white'
        }`}
      >
        <Link href='/'>
          <a className='font-press-start-2p flex lg:hidden text-houm-orange hover:text-houm-dark-orange'>
            GRAPP
          </a>
        </Link>
        <Link href='/'>
          <a className='font-press-start-2p hidden lg:flex text-houm-orange hover:text-houm-dark-orange'>
            Games Review App
          </a>
        </Link>
        <nav className=''>
          <button
            type='button'
            className='flex lg:hidden focus:outline-none'
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            ref={ref}
          >
            <IoMenu
              className={`${
                isScrolling ? 'text-houm-dark-gray' : 'text-white'
              } text-2xl`}
            />
          </button>
          {/* Desktop Menu */}
          <ul className='hidden lg:flex space-x-6'>
            <li>
              <Link href='/'>
                <a
                  className={`${
                    router.pathname === '/'
                      ? 'text-houm-orange border-b border-houm-orange'
                      : ''
                  } hover:text-houm-orange transition-colors duration-150 ease-linear`}
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href='/games'>
                <a
                  className={`${
                    router.pathname === '/games'
                      ? 'text-houm-orange border-b border-houm-orange'
                      : ''
                  } hover:text-houm-orange transition-colors duration-150 ease-linear`}
                >
                  Games
                </a>
              </Link>
            </li>
            {!session ? (
              <li>
                <button
                  type='button'
                  onClick={() => signIn()}
                  className={`${
                    router.pathname === '/login'
                      ? 'text-houm-orange border-b border-houm-orange'
                      : ''
                  } hover:text-houm-orange transition-colors duration-150 ease-linear`}
                >
                  Login/Sign Up
                </button>
              </li>
            ) : (
              <li>
                <button
                  type='button'
                  onClick={() => signOut()}
                  className={`${
                    router.pathname === '/sign-up'
                      ? 'text-houm-orange border-b border-houm-orange'
                      : ''
                  } hover:text-houm-orange transition-colors duration-150 ease-linear`}
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>

          {/* Mobile Menu */}
          <ul
            className={`${
              showMobileMenu ? 'flex' : 'hidden'
            } flex-col justify-center items-center space-y-6 absolute left-0 py-6 top-16 w-full bg-white shadow-sm lg:hidden z-50 text-houm-dark-gray`}
          >
            <li>
              <Link href='/'>
                <a className=''>Home</a>
              </Link>
            </li>
            <li>
              <Link href='/games'>
                <a className=''>Games</a>
              </Link>
            </li>
            <li>
              <Link href='/login'>
                <a className=''>Login</a>
              </Link>
            </li>
            <li>
              <Link href='/sign-up'>
                <a className=''>Sign Up</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
