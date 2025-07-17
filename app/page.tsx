// app/page.tsx
import MovieCard from '@/components/MovieCard';
import { Movie, TmdbApiResponse } from '@/lib/types';

// This function fetches data directly on the server.
async function getPopularMovies(): Promise<Movie[]> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('TMDB_API_KEY is not defined');
  }

  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  const res = await fetch(url);
  if (!res.ok) {
    // This will be caught by the nearest `error.js` Error Boundary
    throw new Error('Failed to fetch popular movies');
  }
  const data: TmdbApiResponse = await res.json();
  return data.results;
}

// The page component is now an async function
export default async function HomePage() {
  const movies = await getPopularMovies();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-amber-400">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}