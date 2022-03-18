import * as React from 'react';

type ComponentProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  // setPlatforms: React.Dispatch<React.SetStateAction<string>>;
  // setStores: React.Dispatch<React.SetStateAction<string>>;
  // setTags: React.Dispatch<React.SetStateAction<string>>;
  // setGenres: React.Dispatch<React.SetStateAction<string>>;
};

const GamesFilterComponent = ({
  searchTerm,
  setSearchTerm,
}: // setGenres,
// setPlatforms,
// setStores,
// setTags,
ComponentProps) => {
  const [genres] = React.useState([
    { name: 'Action', id: 4 },
    { name: 'Adventure', id: 3 },
    { name: 'Indie', id: 51 },
    { name: 'RPG', id: 5 },
    { name: 'Strategy', id: 10 },
    { name: 'Shooter', id: 2 },
  ]);

  const [platforms] = React.useState([
    { name: 'PC', id: 1 },
    { name: 'Playstation', id: 2 },
    { name: 'Xbox', id: 3 },
  ]);
  const [stores] = React.useState([
    { name: 'Steam', id: 1 },
    { name: 'Playstation Store', id: 3 },
    { name: 'Xbox Store', id: 2 },
  ]);
  const [tags] = React.useState([
    { name: 'Single player', id: 31 },
    { name: 'Multiplayer', id: 7 },
  ]);

  // const setCheckedState = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   setState: React.Dispatch<React.SetStateAction<number[]>>
  // ) => {
  //   const id = Number(event.target.value);
  //   const checked = event.target.checked;

  //   let ids = checkedGenres;
  //   if (checked && !checkedGenres.some((val) => val === id)) {
  //     ids.push(id);
  //     setCheckedGenres(ids);
  //   }
  //   if (!checked && checkedGenres.some((val) => val === id)) {
  //     const idx = ids.findIndex((val) => val === id);
  //     const left = ids.slice(0, idx);
  //     const right = ids.slice(idx + 1);
  //     ids = left.concat(right);
  //     setCheckedGenres(ids);
  //   }
  // };

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
      <div className='flex flex-col items-center w-full lg:w-10/12'>
        <h3 className='font-bold text-houm-gray text-lg text-center mb-4'>
          Filters
        </h3>
        <div className='w-7/12 flex flex-col md:w-10/12 md:flex-row md:justify-center md:space-x-6 space-y-4 md:space-y-0 lg:w-full lg:flex-col lg:space-x-0 lg:space-y-4'>
          <div className=''>
            <h4>Genres</h4>
            <div className='flex flex-col'>
              {genres.map(({ name, id }) => (
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
                  />
                  <span className='ml-2 text-gray-700'>{name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className=''>
            <h4>Platforms</h4>
            <div className='flex flex-col'>
              {platforms.map(({ name, id }) => (
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
                  />
                  <span className='ml-2 text-gray-700'>{name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className=''>
            <h4>Stores</h4>
            <div className='flex flex-col'>
              {stores.map(({ name, id }) => (
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
                  />
                  <span className='ml-2 text-gray-700'>{name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className=''>
            <h4>Tags</h4>
            <div className='flex flex-col'>
              {tags.map(({ name, id }) => (
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
                  />
                  <span className='ml-2 text-gray-700'>{name}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            type='button'
            className='rounded-full py-2 px-4 border hover:border-houm-orange hover:bg-houm-orange hover:text-white border-houm-orange bg-white text-houm-orange transition-colors duration-200 ease-out'
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesFilterComponent;
