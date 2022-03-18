import * as React from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import Card from '../../components/Card';
import Banner from '../../components/Banner';
import GamesFilterComponent from '../../components/GamesFilter';

import type { GamesType, ResultsType } from '../../types';

type AxiosDataType = {
  data: GamesType;
  status: number;
};

const GamesListPage = () => {
  const [games, setGames] = React.useState<ResultsType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [nextPage, setNextPage] = React.useState<number | null>(null);
  const [previousPage, setPreviousPage] = React.useState<number | null>(null);
  const [count, setCount] = React.useState<number>(0);

  // Filter related states
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [debouncedTerm, setDebouncedTerm] = React.useState(searchTerm);

  const fetchGames = async (page = 1, pageSize = 12) => {
    setLoading(true);
    const baseUrl = `https://api.rawg.io/api/games?`;
    const { data, status }: AxiosDataType = await axios.get('/api/games', {
      params: {
        baseUrl,
        variables: [
          `page_size=${pageSize}`,
          `page=${page}`,
          `${
            debouncedTerm ? `search=${debouncedTerm}&` : ''
          }search_exact=true&search_precise=true`,
        ],
      },
    });

    if (status === 200) {
      console.log(data);
      setGames([...data.data.results]);
      if (typeof data.data.next === 'string') {
        setNextPage(Number(data.data.next.at(-1)));
      } else {
        setNextPage(null);
      }
      if (typeof data.data.previous === 'string') {
        setPreviousPage(Number(data.data.previous.at(-1)));
      } else {
        setPreviousPage(null);
      }
      setCount(data.data.count);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchGames();
  }, []);

  React.useEffect(() => {
    console.log('next', nextPage);
  }, [nextPage]);

  React.useEffect(() => {
    console.log('prev', previousPage);
  }, [previousPage]);

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  React.useEffect(() => {
    if (debouncedTerm || debouncedTerm === '') {
      fetchGames();
    }
  }, [debouncedTerm]);

  const handleSearchGameByName = () => {
    fetchGames();
  };

  const handleNextPageClick = () => {
    if (nextPage) {
      fetchGames(nextPage);
    }
  };

  const handlePreviousPageClick = () => {
    if (previousPage) {
      fetchGames(previousPage);
    }
  };
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
      <section className='flex flex-col lg:flex-row container mx-auto py-9'>
        <GamesFilterComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchGameByName={handleSearchGameByName}
        />
        {!loading ? (
          <div className='container mx-auto w-full lg:w-4/5 flex flex-col space-y-6'>
            <div className='grid gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center'>
              {games && games.map((game) => <Card key={game.id} {...game} />)}
            </div>
            <div className='w-full flex justify-center items-center space-x-4'>
              <button type='button' onClick={handlePreviousPageClick}>
                Previous
              </button>
              <button type='button' onClick={handleNextPageClick}>
                Next
              </button>
            </div>
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

export default GamesListPage;
