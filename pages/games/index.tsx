import * as React from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import Card from '../../components/Card';

import type { GamesType, ResultsType } from '../../types';
import { useSession } from 'next-auth/react';
import Banner from '../../components/Banner';

const AboutUsPage = () => {
  const [games, setGames] = React.useState<ResultsType[]>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      const { data, status } = await axios.get(`/api/games`);

      if (status === 200) {
        setGames(data.data.results);
      }
      setLoading(false);
    };

    fetchGames();
  }, []);
  return (
    <>
      <Banner title='Games List' imageUrl='/images/games-banner.jpg'>
        <p className='text-white text-sm md:text-xl'>
          From{' '}
          <a href='https://rawg.io/' target='_blank' rel='noreferrer'>
            rawg.io
          </a>
        </p>
      </Banner>
      <section className='flex flex-col lg:flex-row container mx-auto py-9 min-h-screen'>
        <div className='w-full lg:w-1/4'>filter</div>
        {!loading ? (
          <div className='container mx-auto w-full lg:w-3/4 grid gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center'>
            {games && games.map((game) => <Card key={game.id} {...game} />)}
          </div>
        ) : (
          <div className='w-full h-full items-center flex justify-center'>
            <ReactLoading type='spin' color='#FF452B' height={64} width={64} />
          </div>
        )}
      </section>
    </>
  );
};

export default AboutUsPage;
