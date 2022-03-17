export type GamesType = {
  data: {
    count: number;
    next: null | string;
    previous: null | string;
    results: ResultsType[];
  };
};

export type ResultsType = {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  metacritic: number;
  rating: number;
  parent_platforms: {
    platform: Generic;
  }[];
  genres: Generic[];
  stores: {
    id: number;
    store: Generic;
  }[];
  tags: Generic[];
  short_screenshots: {
    id: number;
    image: string;
  }[];
};

type Generic = {
  id: number;
  name: string;
  slug: string;
};
