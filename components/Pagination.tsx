import * as React from 'react';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';

type PageProps = {
  data: any;
  RenderComponent: any;
  dataLimit: number;
  extraProps?: object;
};

const Pagination = ({
  data,
  RenderComponent,
  dataLimit,
  extraProps = {},
}: PageProps) => {
  const [pageCount] = React.useState(Math.ceil(data.length / dataLimit));
  const [currentPage, setCurrentPage] = React.useState(1);
  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < pageCount;

  const gotoPage = (page: number) => {
    setCurrentPage(page);
  };

  const previousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const nextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div className='flex flex-col space-y-4'>
      <>
        {getPaginatedData().map((item: any) => (
          <RenderComponent key={item.id} data={item} {...extraProps} />
        ))}
      </>
      <div
        className={` ${
          pageCount === 1 ? 'hidden' : 'flex'
        } w-full justify-center items-center py-10 space-x-2`}
      >
        <button
          type='button'
          onClick={() => gotoPage(1)}
          disabled={!canPreviousPage}
        >
          <FaAngleDoubleLeft />
        </button>
        <button
          type='button'
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <FaAngleLeft />
        </button>
        <span className='px-4'>
          Page{' '}
          <strong>
            {currentPage} of {pageCount}
          </strong>{' '}
        </span>
        <button
          type='button'
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <FaAngleRight />
        </button>
        <button
          type='button'
          onClick={() => gotoPage(pageCount)}
          disabled={!canNextPage}
        >
          <FaAngleDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
