// componentes/MovieCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/lib/types";

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <Link href={`/movies/${movie.id}`}>
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-amber-400/50 transtition-shadow duration-300">
                <div className="relative h-96">

                    <Image
                        src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        priority={true}
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-bold text-white">{movie.title}</h3>
                    <p className="text-sm text-gray-400">{movie.release_date.substring(0, 4)}</p>
                </div>
            </div>
        </Link>
    )
}