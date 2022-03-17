import * as React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({
  rating,
  setRating = null,
}: {
  rating: number;
  setRating?: React.Dispatch<React.SetStateAction<number>> | null;
}) => {
  const [hover, setHover] = React.useState(0);

  if (setRating !== null) {
    return (
      <div className='flex'>
        {[...Array(5)].map((_, idx) => {
          const ratingValue = idx + 1;
          return (
            <label key={ratingValue}>
              <input
                type='radio'
                name='rating'
                className='hidden'
                onClick={() => setRating(ratingValue)}
              />
              <FaStar
                className='cursor-pointer'
                color={ratingValue <= (hover || rating) ? '#FF452B' : '#424242'}
                size={24}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              />
            </label>
          );
        })}
      </div>
    );
  }
  return (
    <div className='flex'>
      {[...Array(5)].map((_, idx) => {
        const ratingValue = idx + 1;
        return (
          <label key={ratingValue}>
            <input type='radio' name='rating' className='hidden' />
            <FaStar
              color={ratingValue <= (hover || rating) ? '#FF452B' : '#424242'}
              size={16}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
