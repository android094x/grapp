import * as React from 'react';
import Image from 'next/image';
import { ResultsType } from '../types';

const GameInfo = ({ game }: { game: ResultsType }) => {
  const refactorArrayOfData = (key: 'tags' | 'developers' | 'genres') => {
    return game[key].map((item: { name: string }, idx: number) => {
      if (idx + 1 !== game[key].length) {
        return `${item.name} | `;
      }
      return `${item.name}`;
    });
  };

  return (
    <section className='container mx-auto mb-5 mt-10 space-y-6 px-4 lg:px-10 xl:px-0'>
      <div className='flex flex-col lg:flex-row w-full'>
        <div className='flex justify-center w-full lg:w-2/5'>
          <figure className='w-[450px] h-[350px] lg:w-[500px] lg:h-[400px] relative'>
            <Image
              src={game.background_image}
              alt=''
              layout='fill'
              objectFit='cover'
            />
          </figure>
        </div>
        <div className='w-full lg:w-3/5 mt-4 lg:mt-0'>
          <h4 className='text-houm-orange font-bold text-lg mb-4'>
            General game information
          </h4>
          <ul className='space-y-3 text-houm-light-gray '>
            <li className='flex items-center'>
              <span className='font-bold text-houm-dark-gray mr-2'>Name:</span>{' '}
              {game.name}
            </li>
            <li className='flex items-center'>
              <span className='font-bold text-houm-dark-gray mr-2'>
                Genres:
              </span>{' '}
              {refactorArrayOfData('genres')}
            </li>
            <li className='flex items-center'>
              <span className='font-bold text-houm-dark-gray mr-2'>
                Developed by:
              </span>{' '}
              {refactorArrayOfData('developers')}
            </li>
            <li className='flex items-center'>
              <span className='font-bold text-houm-dark-gray mr-2'>
                Metacritic Score:
              </span>{' '}
              {game.metacritic}
              <Image
                src='/images/metacritic-icon.svg'
                width={20}
                height={20}
                alt='Metacritic Icon'
              />{' '}
            </li>
            <li className='flex items-center'>
              <span className='font-bold text-houm-dark-gray mr-2'>Tags:</span>{' '}
              {refactorArrayOfData('tags')}
            </li>
            <li className='flex items-center'>
              <span className='font-bold text-houm-dark-gray mr-2'>
                Platforms:
              </span>
              {game.parent_platforms
                .filter(
                  ({ platform }: { platform: { slug: string } }) =>
                    platform.slug === 'pc' ||
                    platform.slug === 'playstation' ||
                    platform.slug === 'xbox'
                )
                .map(({ platform }: { platform: { slug: string } }) => (
                  <span className='pr-2' key={platform.slug}>
                    <Image
                      src={`/images/${platform.slug}-icon.svg`}
                      width={24}
                      height={24}
                      alt={`${platform.slug} icon`}
                    />
                  </span>
                ))}
            </li>
          </ul>
        </div>
      </div>
      <div className='w-full'>
        <h4 className='text-houm-orange font-bold text-lg mb-4'>Description</h4>
        <p className='text-houm-light-gray'>{game.description_raw}</p>
      </div>
    </section>
  );
};

export default GameInfo;
