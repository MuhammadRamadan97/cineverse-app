// app/watchlist/page.tsx
'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';

export default function WatchlistPage() {
    const { movies, status } = useSelector((state: RootState) => state.watchlist);

    // If we're not yet hydrated, show a loading indicator
    if (status !== 'hydrated') {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-white text-2xl font-bold">Loading Watchlist...</div>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-amber-400">My Watchlist</h1>
            {movies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-lg text-white">Your watchlist is empty.</p>
                    <Link href="/" className="mt-4 inline-block text-amber-400 hover:underline">
                        Find some movies to add!
                    </Link>
                </div>
            )}
        </main>
    );
}