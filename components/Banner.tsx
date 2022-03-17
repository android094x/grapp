const Banner = ({
  title,
  children,
  imageUrl,
}: {
  title: string;
  children?: React.ReactNode;
  imageUrl: string;
}) => {
  return (
    <section
      className='w-full h-56 flex justify-center items-center relative'
      style={{
        background: `url(${imageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='top-0 left-0 absolute bg-black bg-opacity-70 h-56 w-full' />
      <div className='z-10 flex flex-col items-center space-y-2'>
        <h2 className='font-press-start-2p text-white text-xl sm:text-2xl'>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Banner;
