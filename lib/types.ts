// lib/types.ts
export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
}

export interface TmdbApiResponse {
    results: Movie[];
}

export interface MoviDetails extends Movie {
    backdrop_path: string;
    genres: { id: number; name: string }[];
    runtime: number;
    tagline: string;
}