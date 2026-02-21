import { useState } from 'react';
import type { Book } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { BookCoverImage } from './book-card/BookCoverImage';
import { BookRating } from './book-card/BookRating';
import { BookCardActions } from './book-card/BookCardActions';
import { BookCardOwner } from './book-card/BookCardOwner';

const conditionVariant: Record<Book['condition'], 'success' | 'info' | 'warning' | 'danger'> = {
    new: 'success',
    good: 'info',
    fair: 'warning',
    worn: 'danger',
};

export function BookCard({ book }: { book: Book }) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="group flex flex-row overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface) hover:border-(--color-accent)/40 hover:shadow-lg hover:shadow-(--color-accent)/5 transition-all duration-300">
            <div className="relative w-36 flex-shrink-0">
                <BookCoverImage
                    id={book.id}
                    title={book.title}
                    coverUrl={book.coverUrl}
                    isAvailable={book.isAvailable}
                    isFavorite={isFavorite}
                    onFavoriteToggle={() => setIsFavorite((prev) => !prev)}
                />
            </div>
            <div className="flex flex-col flex-1 p-4 min-w-0 gap-2">
                <div>
                    <h3 className="font-bold text-base text-(--color-text) line-clamp-1 leading-snug mb-0.5 group-hover:text-(--color-accent) transition-colors duration-200">
                        {book.title}
                    </h3>
                    <p className="text-xs text-(--color-text-muted) font-medium">{book.author}</p>
                </div>
                {book.rating !== undefined && <BookRating rating={book.rating} />}
                <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={conditionVariant[book.condition]}>{book.condition}</Badge>
                    <span className="text-xs font-semibold text-(--color-text-muted) bg-(--color-surface-alt) px-2.5 py-0.5 rounded-full capitalize">
            {book.genre}
          </span>
                </div>
                <BookCardOwner ownerId={book.ownerId} />
                <div className="mt-auto pt-1">
                    <BookCardActions id={book.id} isAvailable={book.isAvailable} />
                </div>
            </div>
        </div>
    );
}

