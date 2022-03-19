import { useMemo, useRef, useState } from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

const AutocompleteItem = ({
  id,
  name,
  background_image,
}: {
  id: number;
  name: string;
  background_image: string;
}) => {
  return (
    <li>
      <Link href={`/games/${id}`}>
        <a className='hover:bg-houm-orange flex items-center gap-4 p-4'>
          <figure className='flex justify-center relative w-[100px] h-[100px]'>
            <Image
              src={
                background_image
                  ? background_image
                  : '/images/image-not-found.jpg'
              }
              layout='fill'
              objectFit='cover'
              alt={`${name} background image`}
            />
          </figure>
          <h3 className='text-xl font-semibold'>{name}</h3>
        </a>
      </Link>
    </li>
  );
};

export default function Search(props: any) {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Search for any game!',
        onStateChange: ({ state }: any) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: 'games-next-api',
            getItems: ({ query }) => {
              if (!!query) {
                return axios
                  .get(`/api/games-search`, {
                    params: {
                      term: query,
                    },
                  })
                  .then(({ data }) => data.data.results);
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  });
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <form ref={formRef} className='mb-20 w-full' {...formProps}>
      <label className='w-full flex justify-center relative'>
        <input
          ref={inputRef}
          className='flex w-full lg:w-3/4 py-1 px-3 rounded-full text-xl outline-none focus:border-houm-orange border-2'
          {...inputProps}
        />
        {autocompleteState.isOpen && (
          <div
            className='w-full lg:w-3/4 max-h-60 absolute left-1/2 -translate-x-1/2 mt-16 top-0 bg-white overflow-y-scroll rounded-lg shadow-lg z-10'
            ref={panelRef}
            {...autocomplete.getPanelProps()}
          >
            {autocompleteState.collections.map((collection, index) => {
              const { items }: any = collection;
              console.log({ items });
              return (
                <section key={`section-${index}`}>
                  {items.length > 0 && (
                    <ul {...autocomplete.getListProps()}>
                      {items.map((item: any) => (
                        <AutocompleteItem key={item.id} {...item} />
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </label>
    </form>
  );
}
