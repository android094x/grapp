import StarRating from './StarRating';

const Review = ({
  data,
}: {
  data: {
    review: string;
    score: number;
    userEmail: string;
    createdAt: Date;
  };
}) => {
  return (
    <div>
      <p>{data.review}</p>
      <hr className='py-1' />
      <div className='flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0'>
        <StarRating rating={data.score} />
        <span className='flex justify-between sm:justify-start items-center space-x-2 text-sm'>
          <h5 className='font-bold text-xs font-press-start-2p text-houm-orange'>
            {data.userEmail}
          </h5>
          <span className='italic'>
            {new Date(data.createdAt).toLocaleString()}
          </span>
        </span>
      </div>
    </div>
  );
};

export default Review;
