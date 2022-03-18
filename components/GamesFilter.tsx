import * as React from 'react';

type ComponentProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearchGameByName: () => void;
};

const GamesFilterComponent = ({
  searchTerm,
  setSearchTerm,
  handleSearchGameByName,
}: ComponentProps) => {
  const [genres] = React.useState([
    'Action',
    'Adventure',
    'Indie',
    'RPG',
    'Strategy',
    'Shooter',
  ]);

  const [platforms] = React.useState(['PC', 'Playstation', 'Xbox']);
  const [stores] = React.useState(['Steam', 'Playstation Store', 'Xbox Store']);
  const [tags] = React.useState(['Single player', 'Multiplayer']);

  return (
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
      <div className='lg:w-10/12 space-y-6'>
        <h3 className='font-bold text-houm-gray text-lg text-center'>
          Filters
        </h3>
        <div>
          <h4>Genres</h4>
          <div className='flex flex-col'>
            {genres.map((genre) => (
              <label className='inline-flex items-center mt-3' key={genre}>
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-orange-600'
                />
                <span className='ml-2 text-gray-700'>{genre}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h4>Platforms</h4>
          <div className='flex flex-col'>
            {platforms.map((platform) => (
              <label className='inline-flex items-center mt-3' key={platform}>
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-orange-600'
                />
                <span className='ml-2 text-gray-700'>{platform}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h4>Stores</h4>
          <div className='flex flex-col'>
            {stores.map((platform) => (
              <label className='inline-flex items-center mt-3' key={platform}>
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-orange-600'
                />
                <span className='ml-2 text-gray-700'>{platform}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h4>Tags</h4>
          <div className='flex flex-col'>
            {tags.map((tag) => (
              <label className='inline-flex items-center mt-3' key={tag}>
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-orange-600'
                />
                <span className='ml-2 text-gray-700'>{tag}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <button
        type='button'
        className='rounded-full py-2 px-4 border hover:border-houm-orange hover:bg-houm-orange hover:text-white border-houm-orange bg-white text-houm-orange transition-colors duration-200 ease-out'
      >
        Apply filters
      </button>
    </div>
  );
};

export default GamesFilterComponent;
