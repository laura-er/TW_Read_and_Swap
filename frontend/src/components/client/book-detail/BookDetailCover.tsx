import { useFavorites } from '@/context/FavoritesContext';
import { Link } from 'react-router-dom';
import type { Book } from '@/types';
import { Badge } from '@/components/ui/Badge';

type ConditionVariant = 'success' | 'info' | 'warning' | 'danger';

const conditionVariant: Record<Book['condition'], ConditionVariant> = {
    new: 'success',
    good: 'info',
    fair: 'warning',
    worn: 'danger',
};

interface BookDetailCoverProps {
    book: Book;
}

export function BookDetailCover({ book }: BookDetailCoverProps) {
    const { isFavorite: checkFavorite, toggleFavorite } = useFavorites();
    const isFavorite = checkFavorite(book.id);

    return (
        <div className="lg:col-span-1">
            <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) overflow-hidden lg:sticky lg:top-24 transition-all duration-300">

                {/* Cover */}
                <div className="relative group">
                    {book.coverUrl ? (
                        <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-56 flex items-center justify-center bg-(--color-surface-alt)">
                            <span className="text-5xl opacity-20">📖</span>
                        </div>
                    )}
                    <div className="absolute top-3 left-3">
                        {book.isAvailable ? (
                            <span className="flex items-center gap-1.5 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Available
              </span>
                        ) : (
                            <span className="bg-black/50 backdrop-blur-sm text-white/80 px-3 py-1.5 rounded-full text-xs font-bold">
                Unavailable
              </span>
                        )}
                    </div>
                </div>

                {/* Actions + Stats */}
                <div className="p-4 flex flex-col gap-3">

                    <button
                        onClick={() => toggleFavorite(book.id)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-(--color-border) text-(--color-text) text-sm font-semibold hover:bg-(--color-surface-alt) transition-all duration-200"
                    >
                        <svg
                            className={`w-4 h-4 transition-transform ${isFavorite ? 'fill-red-500 text-red-500' : 'fill-none text-(--color-text-muted)'}`}
                            stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>

                    {book.isAvailable ? (
                        <Link
                            to={`/swap/${book.id}`}
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-(--color-accent) hover:bg-(--color-accent-hover) text-white text-sm font-semibold transition-all duration-200 shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            Request Swap
                        </Link>
                    ) : (
                        <button disabled className="w-full py-2 px-3 rounded-lg border border-(--color-border) text-(--color-text-muted) text-sm font-semibold opacity-50 cursor-not-allowed">
                            Not Available
                        </button>
                    )}

                    {/* Stats */}
                    <div className="pt-3 border-t border-(--color-border) flex flex-col gap-1.5">
                        <div className="flex justify-between items-center px-2.5 py-1.5 bg-(--color-surface-alt) rounded-lg text-xs">
                            <span className="text-(--color-text-muted)">Condition</span>
                            <Badge variant={conditionVariant[book.condition]}>{book.condition}</Badge>
                        </div>
                        <div className="flex justify-between items-center px-2.5 py-1.5 bg-(--color-surface-alt) rounded-lg text-xs">
                            <span className="text-(--color-text-muted)">Genre</span>
                            <span className="font-semibold text-(--color-text) capitalize">{book.genre}</span>
                        </div>
                        <div className="flex justify-between items-center px-2.5 py-1.5 bg-(--color-surface-alt) rounded-lg text-xs">
                            <span className="text-(--color-text-muted)">Added</span>
                            <span className="font-semibold text-(--color-text)">
                {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(book.createdAt))}
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}