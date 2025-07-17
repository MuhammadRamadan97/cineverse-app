// lib/features/watchlist/watchlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie } from '@/lib/types';

interface WatchlistState {
    movies: Movie[];
    status: 'idle' | 'hydrating' | 'hydrated';

}

const initialState: WatchlistState = {
    movies: [],
    status: 'idle',
};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        startHydration: (state) => {
            state.status = 'hydrating';
        },
        hydrateState: (state, action: PayloadAction<WatchlistState>) => {
            state.movies = action.payload.movies;
            state.status = 'hydrated';
        },
        addMovie: (state, action: PayloadAction<Movie>) => {
            // Add movie only if it's not already in the list
            const movieExists = state.movies.find((movie) => movie.id === action.payload.id);
            if (!movieExists) {
                state.movies.push(action.payload);
            }
        },
        removeMovie: (state, action: PayloadAction<number>) => {
            // Filter out the movie with the matching id
            state.movies = state.movies.filter((movie) => movie.id !== action.payload);
        },
    },
});

export const { addMovie, removeMovie, hydrateState, startHydration } = watchlistSlice.actions;

export default watchlistSlice.reducer;