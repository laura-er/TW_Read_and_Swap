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

interface BookDetailHeroProps {
    book: Book;
}

export function BookDetailHero({ book }: BookDetailHeroProps) {
    return (
        <div className="flex flex-col">

            {/* Cover image — full width top, ca în referință */}
            <Link to={`/books/${book.id}`} className="block mb-6">
                <div className="relative rounded-xl overflow-hidden border border-(--color-border) w-full h-64 md:h-80">
                    {book.coverUrl ? (
                        <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-(--color-surface-alt)">
                            <span className="text-6xl opacity-20">📖</span>
                        </div>
                    )}
                    {/* Availability badge peste imagine */}
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
            </Link>

            {/* Content sub imagine */}
            <div className="flex flex-col gap-4">

                {/* Rating + score — ca în referință */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                                key={i}
                                className={`w-5 h-5 ${book.rating !== undefined && i < Math.floor(book.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-(--color-border) text-(--color-border)'}`}
                                viewBox="0 0 24 24"
                            >
                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                            </svg>
                        ))}
                    </div>
                    {book.rating !== undefined && (
                        <span className="bg-(--color-accent)/10 border border-(--color-accent)/20 text-(--color-accent) text-xs font-semibold px-2 py-0.5 rounded-md">
              {book.rating.toFixed(1)} out of 5
            </span>
                    )}
                    {book.reviewCount !== undefined && (
                        <span className="text-xs text-(--color-text-muted)">({book.reviewCount} reviews)</span>
                    )}
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-(--color-text) leading-snug">
                    {book.title}
                </h1>

                {/* Author */}
                <p className="text-sm text-(--color-text-muted) font-medium -mt-2">by {book.author}</p>

                {/* Genre + Condition */}
                <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center bg-(--color-accent)/10 border border-(--color-accent)/20 text-(--color-accent) text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
            {book.genre}
          </span>
                    <Badge variant={conditionVariant[book.condition]}>{book.condition}</Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-(--color-text-muted) leading-relaxed">
                    {book.description}
                </p>

                {/* Added date */}
                <p className="text-xs text-(--color-text-muted)">
                    Added{' '}
                    <span className="font-semibold text-(--color-text)">
            {new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            }).format(new Date(book.createdAt))}
          </span>
                </p>
            </div>
        </div>
    );
}

