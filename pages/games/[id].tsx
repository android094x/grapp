import * as React from 'react';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import safeJsonStringify from 'safe-json-stringify';
import ReactLoading from 'react-loading';

import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import type { Review } from '@prisma/client';

import Pagination from '../../components/Pagination';
import ReviewComponent from '../../components/Review';
import ReviewForm from '../../components/ReviewForm';
import GameInfo from '../../components/GameInfo';
import Banner from '../../components/Banner';
import { ResultsType } from '../../types';

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

const GamePage = ({ game }: { game: ResultsType }) => {
  const { data: session } = useSession();
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const { data, status } = await axios.get('/api/reviews/get', {
        params: {
          rawgId: `${game.id}`,
        },
      });
      if (status === 200) {
        setReviews(data.data);
        setLoading(false);
      }
    };

    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  return (
    <>
      <Banner title={game.name} imageUrl={game.background_image_additional} />
      <GameInfo game={game} />
      <section className='container mx-auto pb-10 space-y-6 px-4 lg:px-10 xl:px-0'>
        <h4 className='text-houm-orange font-bold text-lg mb-4'>Reviews</h4>
        {(reviews.length && session) || (reviews.length && !session) ? (
          <>
            {!loading ? (
              <Pagination
                RenderComponent={ReviewComponent}
                data={reviews}
                dataLimit={5}
              />
            ) : (
              <div className='w-full flex justify-center'>
                <ReactLoading
                  type='spin'
                  color='#FF452B'
                  height={64}
                  width={64}
                />
              </div>
            )}
          </>
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
              <ReviewForm
                game={{ id: `${game.id}`, name: game.name }}
                setReviews={setReviews}
              />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default GamePage;
