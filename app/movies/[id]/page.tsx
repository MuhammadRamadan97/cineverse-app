// app/movies/[id]/page.tsx
import { MovieDetails } from '@/lib/types';
import Image from 'next/image';
import WatchlistButton from '@/components/WatchlistButton';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const TMDB_POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function getMovieDetails(id: string): Promise<MovieDetails> {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
        throw new Error('TMDB_API_KEY is not defined in environment variables');
    }
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch movie details');
    }
    return res.json();
}

// ✅ Fix here: correct parameter structure
export default async function MovieDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const movie = await getMovieDetails(params.id);

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="relative h-96">
                <Image
                    src={`${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`}
                    alt={movie.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="opacity-30"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 py-8 -mt-48 relative">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-shrink-0">
                        <Image
                            src={`${TMDB_POSTER_BASE_URL}${movie.poster_path}`}
                            alt={movie.title}
                            width={300}
                            height={450}
                            className="rounded-lg shadow-2xl"
                        />
                    </div>
                    <div className="flex-grow pt-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
                        <p className="text-lg text-gray-300 italic mb-4">{movie.tagline}</p>
                        <div className="flex items-center space-x-4 mb-4">
                            <span className="text-amber-400 font-bold text-lg">
                                ★ {movie.vote_average.toFixed(1)} / 10
                            </span>
                            <span>•</span>
                            <span>{movie.release_date.substring(0, 4)}</span>
                            <span>•</span>
                            <span>{formatRuntime(movie.runtime)}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {movie.genres.map((genre) => (
                                <span key={genre.id} className="bg-gray-700 px-3 py-1 text-sm rounded-full">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
                        <p className="text-gray-300 leading-relaxed max-w-2xl">{movie.overview}</p>

                        <div className="mt-8">
                            <WatchlistButton movie={movie} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
