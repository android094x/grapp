import * as React from 'react';
import axios from 'axios';

import StarRating from './StarRating';
import { Review } from '@prisma/client';
import { useSession } from 'next-auth/react';

type ComponentProps = {
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  game: { id: string; name: string };
};

const ReviewForm = ({ setReviews, game }: ComponentProps) => {
  const { data: session } = useSession();
  const [review, setReview] = React.useState<string>('');
  const [rating, setRating] = React.useState(0);

  const handleSubmitReview = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { data, status } = await axios.post('/api/reviews/create', {
      review,
      score: rating,
      userEmail: session?.user?.email,
      gameId: game.id,
      gameName: game.name,
    });

    if (status === 200) {
      setReview('');
      setReviews((prevState) => [data.data, ...prevState]);
    }
  };

  return (
    <form onSubmit={handleSubmitReview}>
      <label htmlFor='review' className='w-full'>
        <textarea
          value={review}
          name='review'
          id='review'
          onChange={(e) => setReview(e.target.value)}
          className='outline-none border border-houm-gray focus:border-houm-orange rounded-md w-full h-24 p-2'
        />
      </label>
      <div className='w-full flex justify-between'>
        <StarRating rating={rating} setRating={setRating} />
        <button
          type='submit'
          className='outline-none rounded-full border border-houm-gray hover:border-houm-orange hover:text-houm-orange px-4 py-2 transition-colors duration-200 ease-out'
        >
          Submit review!
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
