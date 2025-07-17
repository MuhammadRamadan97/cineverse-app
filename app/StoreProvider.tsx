// app/StoreProvider.tsx
'use client';
import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../lib/store';
import { hydrateState, startHydration } from '@/lib/feautres/watchlist/watchlistSlice';

const LOCAL_STORAGE_KEY = 'watchlistState';

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();

        // DISPATCH START HYDRATION ACTION
        storeRef.current.dispatch(startHydration());

        // Try to load the saved state from localStorage
        try {
            const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                // Dispatch the hydrate action to restore the state
                storeRef.current.dispatch(hydrateState(parsedState));
            }
        } catch (e) {
            console.error('Could not load state from localStorage', e);
        }
    }

    useEffect(() => {
        // This function will be called whenever the Redux state changes
        const handleStoreChange = () => {
            if (storeRef.current) {
                const state = storeRef.current.getState().watchlist;
                // Save the watchlist state to localStorage
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
            }
        };

        // Subscribe to store changes
        const unsubscribe = storeRef.current?.subscribe(handleStoreChange);

        // Unsubscribe on component unmount
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}