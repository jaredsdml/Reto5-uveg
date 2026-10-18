export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface MovieDetail extends Movie {
  tagline: string;
  runtime: number;
  genres: { id: number; name: string }[];
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
}