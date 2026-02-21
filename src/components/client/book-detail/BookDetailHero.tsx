import { Link } from 'react-router-dom';
import type { Book } from '@/types';
import { Badge } from '@/components/ui/Badge';

const conditionVariant: Record<Book['condition'], 'success' | 'info' | 'warning' | 'danger'> = {
    new: 'success',
    good: 'info',
    fair: 'warning',
    worn: 'danger',
};

interface BookDetailHeroProps {
    book: Book;
}

export function BookDetailHero({ book }: BookDetailHeroProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-8">
            {/* Cover */}
            <div className="flex-shrink-0 mx-auto sm:mx-0 w-48 md:w-56">
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-(--color-border) aspect-[2/3]">
                    {book.coverUrl ? (
                        <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-(--color-surface-alt)">
                            <span className="text-6xl opacity-20">📖</span>
                        </div>
                    )}
                    <div className="absolute top-3 left-3">
                        {book.isAvailable ? (
                            <span className="flex items-center gap-1.5 bg-green-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Available
              </span>
                        ) : (
                            <span className="bg-black/50 backdrop-blur-sm text-white/80 px-2.5 py-1 rounded-full text-[10px] font-bold">
                Unavailable
              </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3 flex-1 justify-center">
                <Link
                    to="/books"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--color-text-muted) hover:text-(--color-accent) transition-colors w-fit"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Catalog
                </Link>

                <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center bg-(--color-accent)/10 border border-(--color-accent)/20 text-(--color-accent) text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
            {book.genre}
          </span>
                    <Badge variant={conditionVariant[book.condition]}>{book.condition}</Badge>
                </div>

                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-(--color-text) leading-tight mb-1">
                        {book.title}
                    </h1>
                    <p className="text-base text-(--color-text-muted) font-medium">by {book.author}</p>
                </div>

                {book.rating !== undefined && (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(book.rating!) ? 'fill-yellow-400 text-yellow-400' : 'fill-(--color-border) text-(--color-border)'}`}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm font-bold text-(--color-text)">{book.rating.toFixed(1)}</span>
                        {book.reviewCount !== undefined && (
                            <span className="text-sm text-(--color-text-muted)">({book.reviewCount} reviews)</span>
                        )}
                    </div>
                )}

                <p className="text-sm text-(--color-text-muted) leading-relaxed max-w-lg">
                    {book.description}
                </p>

                <p className="text-xs text-(--color-text-muted)">
                    Added{' '}
                    <span className="font-semibold text-(--color-text)">
            {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(book.createdAt))}
          </span>
                </p>
            </div>
        </div>
    );
}

