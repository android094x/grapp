import * as React from 'react';
import axios from 'axios';

import Card from '../../components/Card';

import type { GamesType, ResultsType } from '../../types';
import { useSession } from 'next-auth/react';

const AboutUsPage = () => {
  const [games, setGames] = React.useState<ResultsType[]>();

  React.useEffect(() => {
    const fetchGames = async () => {
      const { data } = await axios.get(`/api/games`);

      setGames(data.data.results);
    };

    fetchGames();
  }, []);
  return (
    <>
      <section
        className='w-full h-56 flex justify-center items-center relative'
        style={{
          background: 'url(/images/games-banner.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='top-0 left-0 absolute bg-black bg-opacity-70 h-56 w-full' />
        <div className='z-10 flex flex-col items-center space-y-2'>
          <h2 className='font-press-start-2p text-white text-xl sm:text-2xl md:text-4xl lg:text-6xl'>
            Games List
          </h2>
          <p className='text-white text-sm md:text-xl'>
            From{' '}
            <a href='https://rawg.io/' target='_blank' rel='noreferrer'>
              rawg.io
            </a>
          </p>
        </div>
      </section>
      <section className='flex flex-col lg:flex-row container mx-auto py-9 min-h-screen'>
        <div className='w-full lg:w-1/4 bg-red-200'>filter</div>
        <div className='container mx-auto w-full lg:w-3/4 grid gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center'>
          {games && games.map((game) => <Card key={game.id} {...game} />)}
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;
