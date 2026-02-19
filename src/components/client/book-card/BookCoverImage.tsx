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
        <div className="relative w-full h-[280px]">
            <Link to={`/books/${id}`}>
                {coverUrl ? (
                    <img
                        src={coverUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[var(--color-surface-alt)]">
                        <span className="text-5xl opacity-30">📖</span>
                    </div>
                )}
            </Link>

            {/* Favorite Button */}
            <button
                onClick={onFavoriteToggle}
                className="absolute top-3 right-3 bg-[var(--color-surface)]/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
            >
                <svg
                    className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[var(--color-text-muted)]'}`}
                    fill={isFavorite ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>

            {/* Availability Badge */}
            <div className="absolute top-3 left-3">
                {isAvailable ? (
                    <span className="flex items-center gap-1.5 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Available
          </span>
                ) : (
                    <span className="flex items-center gap-1.5 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Not Available
          </span>
                )}
            </div>
        </div>
    );
}