// components/SearchBar.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/search?query=${query}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center">
            <input type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie..."
                className="px-4 py-2 rounded-1-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
                type="submit"
                className="p-2 bg-amber-500 rounded-r-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
                <MagnifyingGlassIcon className="h-6 w-6 text-white" />
            </button>
        </form>
    )
}