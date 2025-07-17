// components/WatchlistButton.tsx
'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { addMovie, removeMovie } from '@/lib/feautres/watchlist/watchlistSlice';
import { MoviDetails } from '@/lib/types';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast';


export default function WatchlistButton({ movie }: { movie: MoviDetails }) {
    const dispatch = useDispatch();
    const watchlist = useSelector((state: RootState) => state.watchlist.movies);

    const isMovieInWatchlist = watchlist.some((item) => item.id === movie.id);

    const handleToggleWatchlist = () => {
        if (isMovieInWatchlist) {
            dispatch(removeMovie(movie.id));
            // Add a toast notification for removing
            toast.error(`${movie.title} removed from watchlist`);
        } else {
            // We only need the properties defined in the Movie type for the watchlist
            const movieToAdd = {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                overview: movie.overview,
            };
            dispatch(addMovie(movieToAdd));
            // Add a toast notification for adding
            toast.success(`${movie.title} added to watchlist`);
        }
    };

    return (
        <button
            onClick={handleToggleWatchlist}
            className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-lg font-bold text-white transition hover:bg-amber-600"
        >
            {isMovieInWatchlist ? (
                <>
                    <HeartIconSolid className="h-6 w-6" />
                    <span>Remove from Watchlist</span>
                </>
            ) : (
                <>
                    <HeartIconOutline className="h-6 w-6" />
                    <span>Add to Watchlist</span>
                </>
            )}
        </button>
    );
}