import * as React from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

import Card from '../../components/Card';
import Banner from '../../components/Banner';

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
  const [genresString, setGenresString] = React.useState<string>('');
  const [platformsString, setPlatformsString] = React.useState<string>('');
  const [storesString, setStoresString] = React.useState<string>('');
  const [tagsString, setTagsString] = React.useState<string>('');

  const [genres, setGenres] = React.useState([
    { name: 'Action', id: 4, checked: false },
    { name: 'Adventure', id: 3, checked: false },
    { name: 'Indie', id: 51, checked: false },
    { name: 'RPG', id: 5, checked: false },
    { name: 'Strategy', id: 10, checked: false },
    { name: 'Shooter', id: 2, checked: false },
  ]);

  const [platforms, setPlatforms] = React.useState([
    { name: 'PC', id: 1, checked: false },
    { name: 'Playstation', id: 2, checked: false },
    { name: 'Xbox', id: 3, checked: false },
  ]);
  const [stores, setStores] = React.useState([
    { name: 'Steam', id: 1, checked: false },
    { name: 'Playstation Store', id: 3, checked: false },
    { name: 'Xbox Store', id: 2, checked: false },
  ]);
  const [tags, setTags] = React.useState([
    { name: 'Single player', id: 31, checked: false },
    { name: 'Multiplayer', id: 7, checked: false },
  ]);

  const [filters] = React.useState([
    { state: genres, setState: setGenres },
    { state: platforms, setState: setPlatforms },
    { state: stores, setState: setStores },
    { state: tags, setState: setTags },
  ]);

  // END Filter related states

  const fetchGames = async (page = 1, resetUrl = false, pageSize = 12) => {
    setLoading(true);
    const baseUrl = `https://api.rawg.io/api/games?`;
    let variables = [
      `page_size=${pageSize}`,
      `page=${page}`,
      debouncedTerm ? `search=${debouncedTerm}` : '',
      platformsString ? `parent_platforms=${platformsString}` : '',
      storesString ? `stores=${storesString}` : '',
      tagsString ? `tags=${tagsString}` : '',
      genresString ? `genres=${genresString}` : '',
    ];

    if (resetUrl) {
      variables = [`page_size=${pageSize}`, `page=${page}`];
    }

    const { data, status }: AxiosDataType = await axios.get('/api/games', {
      params: {
        baseUrl,
        variables,
      },
    });
    if (status === 200) {
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

  React.useEffect(() => {
    const checkedIds = genres
      .filter((genre) => genre.checked === true)
      .map((genre) => genre.id)
      .join(',');
    setGenresString(checkedIds);
  }, [genres]);

  React.useEffect(() => {
    const checkedIds = genres
      .filter((genre) => genre.checked === true)
      .map((genre) => genre.id)
      .join(',');
    setPlatformsString(checkedIds);
  }, [platforms]);

  React.useEffect(() => {
    const checkedIds = genres
      .filter((genre) => genre.checked === true)
      .map((genre) => genre.id)
      .join(',');
    setStoresString(checkedIds);
  }, [stores]);

  React.useEffect(() => {
    const checkedIds = genres
      .filter((genre) => genre.checked === true)
      .map((genre) => genre.id)
      .join(',');
    setTagsString(checkedIds);
  }, [tags]);

  const handleApplyFilters = () => {
    fetchGames();
  };

  const handleResetFilters = () => {
    filters.forEach(({ state, setState }) => {
      setState(state.map((item) => ({ ...item, checked: false })));
    });
    fetchGames(1, true, 12);
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

  const changeChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<
      React.SetStateAction<
        {
          name: string;
          id: number;
          checked: boolean;
        }[]
      >
    >
  ) => {
    setState((prevState) => {
      const newState = [...prevState];
      const foundIdx = prevState.findIndex(
        (item) => item.id === Number(event.target.value)
      );

      newState[foundIdx] = {
        ...prevState[foundIdx],
        checked: event.target.checked,
      };
      return newState;
    });
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
      <section className='flex flex-col lg:flex-row container mx-auto py-9 px-4 md:px-0 space-y-6 lg:space-y-0'>
        <div className='w-full lg:w-1/5 flex flex-col space-y-6 items-center border border-houm-light-dark rounded-sm shadow-sm py-6'>
          <div className='flex flex-col lg:w-10/12'>
            <h3 className='font-bold text-houm-gray text-lg text-center'>
              Search by game name
            </h3>
            <input
              type='text'
              value={searchTerm}
              className='outline-none border border-houm-light-gray rounded-md px-4 py-2'
              placeholder='type the game name...'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='flex flex-col items-center w-full lg:w-10/12'>
            <h3 className='font-bold text-houm-gray text-lg text-center mb-4'>
              Filters
            </h3>
            <div className='w-7/12 flex flex-col md:w-10/12 md:flex-row md:justify-center md:space-x-6 space-y-4 md:space-y-0 lg:w-full lg:flex-col lg:space-x-0 lg:space-y-4'>
              <div className=''>
                <h4>Genres</h4>
                <div className='flex flex-col'>
                  {genres.map(({ name, id, checked }) => (
                    <label
                      className='inline-flex items-center mt-3'
                      key={id}
                      htmlFor={name}
                    >
                      <input
                        type='checkbox'
                        name={name}
                        className='form-checkbox h-5 w-5 text-orange-600'
                        value={id}
                        checked={checked}
                        onChange={(e) => changeChecked(e, setGenres)}
                      />
                      <span className='ml-2 text-gray-700'>{name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className=''>
                <h4>Platforms</h4>
                <div className='flex flex-col'>
                  {platforms.map(({ name, id, checked }) => (
                    <label
                      className='inline-flex items-center mt-3'
                      key={id}
                      htmlFor={name}
                    >
                      <input
                        type='checkbox'
                        name={name}
                        className='form-checkbox h-5 w-5 text-orange-600'
                        value={id}
                        checked={checked}
                        onChange={(e) => changeChecked(e, setPlatforms)}
                      />
                      <span className='ml-2 text-gray-700'>{name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className=''>
                <h4>Stores</h4>
                <div className='flex flex-col'>
                  {stores.map(({ name, id, checked }) => (
                    <label
                      className='inline-flex items-center mt-3'
                      key={id}
                      htmlFor={name}
                    >
                      <input
                        type='checkbox'
                        name={name}
                        className='form-checkbox h-5 w-5 text-orange-600'
                        value={id}
                        checked={checked}
                        onChange={(e) => changeChecked(e, setStores)}
                      />
                      <span className='ml-2 text-gray-700'>{name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className=''>
                <h4>Tags</h4>
                <div className='flex flex-col'>
                  {tags.map(({ name, id, checked }) => (
                    <label
                      className='inline-flex items-center mt-3'
                      key={id}
                      htmlFor={name}
                    >
                      <input
                        type='checkbox'
                        name={name}
                        className='form-checkbox h-5 w-5 text-orange-600'
                        value={id}
                        checked={checked}
                        onChange={(e) => changeChecked(e, setTags)}
                      />
                      <span className='ml-2 text-gray-700'>{name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                type='button'
                className='rounded-full py-2 px-4 border hover:border-houm-orange hover:bg-houm-orange hover:text-white border-houm-orange bg-white text-houm-orange transition-colors duration-200 ease-out'
                onClick={handleApplyFilters}
              >
                Apply filters
              </button>
              <button
                type='button'
                className='rounded-full py-2 px-4 border border-houm-orange bg-houm-orange text-white hover:border-houm-orange hover:bg-white hover:text-houm-orange transition-colors duration-200 ease-out'
                onClick={handleResetFilters}
              >
                Reset filters
              </button>
            </div>
          </div>
        </div>

        {!loading ? (
          <div className='container mx-auto w-full lg:w-4/5 flex flex-col space-y-6'>
            {games.length ? (
              <>
                <div className='grid gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center'>
                  {games.map((game) => (
                    <Card key={game.id} {...game} />
                  ))}
                </div>
                <div className='w-full flex justify-center items-center space-x-4'>
                  <button type='button' onClick={handlePreviousPageClick}>
                    Previous
                  </button>
                  <button type='button' onClick={handleNextPageClick}>
                    Next
                  </button>
                </div>
              </>
            ) : (
              <span className='w-full font-press-start-2p text-center'>
                Nothing was found
              </span>
            )}
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
