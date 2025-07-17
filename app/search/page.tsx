// app/search/page.tsx
import MovieCard from '@/components/MovieCard';
import { Movie, TmdbApiResponse } from '@/lib/types';
import Link from 'next/link';

async function searchMovies(query: string): Promise<Movie[]> {
    const apiKey = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=1`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to search movies');
    }
    const data: TmdbApiResponse = await res.json();
    return data.results;
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { query: string };
}) {
    const query = searchParams.query;
    const movies = await searchMovies(query);

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">
                Search Results for: <span className="text-amber-400">&quot;{query}&quot;</span>
            </h1>
            {movies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-lg">No movies found for your search.</p>
                    <Link href="/" className="mt-4 inline-block text-amber-400 hover:underline">
                        Back to Home
                    </Link>
                </div>
            )}
        </main>
    );
}