import * as React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import axios from 'axios';
import safeJsonStringify from 'safe-json-stringify';

import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import type { Review } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const id = context.query.id;
    const { data } = await axios.get(
      `https://api.rawg.io/api/games/${id}?&key=${process.env.RAWG_API_KEY}`
    );
    return {
      props: {
        game: JSON.parse(safeJsonStringify(data)),
      },
    };
  } catch (err) {
    return {
      props: {
        message: JSON.stringify(err),
      },
    };
  }
};

const GamePage = ({ game }: { game: any }) => {
  const { data: session } = useSession();
  const [review, setReview] = React.useState<string>('');
  const [reviews, setReviews] = React.useState<Review[]>([]);

  const handleSubmitReview = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { data, status } = await axios.post('/api/reviews/create', {
      review,
      score: 4.4,
      userEmail: session?.user?.email,
      gameId: game.id,
      gameName: game.name,
    });

    if (status === 200) {
      setReview('');
      setReviews((prevState) => [data.data, ...prevState]);
    }
  };

  React.useEffect(() => {
    const fetchReviews = async () => {
      const { data, status } = await axios.get('/api/reviews/get', {
        params: {
          rawgId: `${game.id}`,
        },
      });
      if (status === 200) {
        setReviews(data.data);
      }
    };

    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  const refactorArrayOfData = (key: string) => {
    return game[key].map((item: { name: string }, idx: number) => {
      if (idx + 1 !== game[key].length) {
        return `${item.name} | `;
      }
      return `${item.name}`;
    });
  };
  return (
    <>
      <section
        className='w-full h-56 flex justify-center items-center relative'
        style={{
          background: `url(${game.background_image_additional})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='top-0 left-0 absolute bg-black bg-opacity-50 h-full w-full' />
        <div className='z-20'>
          <h1 className='font-press-start-2p text-white text-2xl'>
            {game.name}
          </h1>
        </div>
      </section>
      <section className='container mx-auto mb-5 mt-10 space-y-6 px-4 lg:px-10 xl:px-0'>
        <div className='flex flex-col lg:flex-row w-full'>
          <div className='flex justify-center w-full lg:w-2/5'>
            <figure className='w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] relative'>
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
                <span className='font-bold text-houm-dark-gray mr-2'>
                  Name:
                </span>{' '}
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
                <span className='font-bold text-houm-dark-gray mr-2'>
                  Tags:
                </span>{' '}
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
          <h4 className='text-houm-orange font-bold text-lg mb-4'>
            Description
          </h4>
          <p className='text-houm-light-gray'>{game.description_raw}</p>
        </div>
      </section>
      <section className='container mx-auto pb-10 space-y-6 px-4 lg:px-10 xl:px-0'>
        <h4 className='text-houm-orange font-bold text-lg mb-4'>Reviews</h4>
        {(reviews.length && session) || (reviews.length && !session) ? (
          reviews.map((review: Review) => (
            <div key={review.id}>
              <p>{review.review}</p>
              <hr />
              <div className='flex justify-between'>
                <span>* * * * *</span>
                <span className='flex items-center space-x-2 text-sm'>
                  <h5 className='font-bold text-xs font-press-start-2p text-houm-orange'>
                    {review.userEmail}
                  </h5>
                  <span className='italic'>
                    {new Date(review.createdAt).toLocaleString()}
                  </span>
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className='font-bold text-houm-gray text-center'>
            Be the first one in reviewing this game!
          </p>
        )}
        {!session ? (
          <div className='w-full flex justify-center items-center space-x-4'>
            <p className='text-houm-orange'>
              If you want to make a review, please login
            </p>
            <button
              type='button'
              onClick={() => signIn()}
              className='outline-none rounded-full border border-houm-gray hover:border-houm-orange hover:text-houm-orange px-4 py-2 transition-colors duration-200 ease-out'
            >
              Login!
            </button>
          </div>
        ) : (
          <>
            {reviews?.find(
              (review) => review?.userEmail === session?.user?.email
            ) ? (
              <p className='w-full text-center lg:text-left'>
                You are only allowed to make{' '}
                <span className='italic underline text-houm-orange'>
                  one review
                </span>{' '}
                per game
              </p>
            ) : (
              <form onSubmit={handleSubmitReview}>
                <label htmlFor='review' className='w-full'>
                  <textarea
                    name='review'
                    id='review'
                    onChange={(e) => setReview(e.target.value)}
                    className='outline-none border border-houm-gray focus:border-houm-orange rounded-md w-full h-24 p-2'
                  />
                </label>
                <div className='w-full flex justify-end'>
                  <button
                    type='submit'
                    className='outline-none rounded-full border border-houm-gray hover:border-houm-orange hover:text-houm-orange px-4 py-2 transition-colors duration-200 ease-out'
                  >
                    Submit review!
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default GamePage;
