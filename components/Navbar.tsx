import Link from "next/link";
import { FilmIcon } from '@heroicons/react/24/solid';
import SearchBar from "./SearchBar";

export default function Navbar() {
    return (
        <nav className="bg-gray-900 shadow-lg" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and App Name */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2 text-white">
                            <FilmIcon className="h-8 w-8 text-amber-400" />
                            <span className="text-xl font-bold">CineVerse</span>
                        </Link>
                    </div>

                    <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                        <SearchBar />
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                href="/"
                                className="text-gray-300 hover-bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/watchlist"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Watchlist
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}