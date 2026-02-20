import { Link } from 'react-router-dom';

interface BookCoverImageProps {
    id: string;
    title: string;
    coverUrl: string;
    isAvailable: boolean;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
}

export function BookCoverImage({
                                   id, title, coverUrl, isAvailable, isFavorite, onFavoriteToggle,
                               }: BookCoverImageProps) {
    return (
        <div className="relative w-full h-full min-h-[180px]">
            <Link to={`/books/${id}`} className="block w-full h-full">
                {coverUrl ? (
                    <img
                        src={coverUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-(--color-surface-alt)">
                        <span className="text-4xl opacity-30">📖</span>
                    </div>
                )}
            </Link>

            <button
                onClick={onFavoriteToggle}
                className="absolute top-2 right-2 bg-(--color-surface)/90 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:scale-110 transition-transform z-10"
            >
                <svg
                    className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-(--color-text-muted)'}`}
                    fill={isFavorite ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>

            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                {isAvailable ? (
                    <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow">
            Available
          </span>
                ) : (
                    <span className="bg-(--color-surface-alt) text-(--color-text-muted) px-2 py-0.5 rounded-full text-[10px] font-bold shadow">
            Unavailable
          </span>
                )}
            </div>
        </div>
    );
}

