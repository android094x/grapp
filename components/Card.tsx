import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  id: number;
  name: string;
  background_image: string;
  slug: string;
  metacritic: number;
  rating: number;
  parent_platforms: {
    platform: {
      slug: string;
    };
  }[];
}

const Card = (props: CardProps) => {
  return (
    <>
      <div className='flex justify-center relative w-[270px] h-[420px] lg:w-[250px] lg:h-[370px] rounded-xl overflow-hidden'>
        <Image
          src={
            props?.background_image
              ? props.background_image
              : '/images/image-not-found.jpg'
          }
          layout='fill'
          objectFit='cover'
          alt={`${props.name} background image`}
        />
        <div className='top-0 left-0 absolute bg-black bg-opacity-40 h-full w-full' />
        <div
          className='absolute z-10 w-11/12 bg-gray-300 bg-opacity-25 bottom-5 rounded-xl text-white p-2'
          style={{ backdropFilter: 'blur(5px)' }}
        >
          <div className='flex justify-between mb-2'>
            <h2 className='font-bold text-lg w-3/4'>
              <u>{props.name}</u>
            </h2>
            <div className='flex items-center space-x-1'>
              <Image
                src='/images/metacritic-icon.svg'
                width={20}
                height={20}
                alt='Metacritic Icon'
              />
              <span className='text-sm font-bold'>{props.metacritic}</span>
            </div>
          </div>

          <div className='flex justify-between items-center text-xs'>
            <h3 className='text-sm'>
              Rating: <span>{props.rating}/5</span>
            </h3>
            <div className='flex items-center space-x-2'>
              <h4>Platforms:</h4>
              <div className='flex items-center'>
                {props.parent_platforms
                  ?.filter(
                    ({ platform }) =>
                      platform.slug === 'pc' ||
                      platform.slug === 'playstation' ||
                      platform.slug === 'xbox'
                  )
                  ?.map(({ platform }) => (
                    <Image
                      src={`/images/${platform.slug}-icon.svg`}
                      width={16}
                      height={16}
                      alt={`${platform.slug} icon`}
                      key={platform.slug}
                    />
                  ))}
              </div>
            </div>
          </div>
          <Link href={`/games/${props.id}`}>
            <a className='flex justify-center border border-white rounded-full py-1 mt-2 hover:text-houm-orange hover:border-houm-orange transition-colors duration-200 ease-out'>
              Check out!
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
