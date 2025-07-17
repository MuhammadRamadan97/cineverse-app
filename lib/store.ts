// lib/store.js
import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from './feautres/watchlist/watchlistSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            watchlist: watchlistReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];