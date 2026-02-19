import { useState } from 'react';
import type { Book } from '@/types';
import { Card } from '@/components/ui/Card';
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
      <Card hover padding="none" className="overflow-hidden flex flex-col h-full">
        <BookCoverImage
            id={book.id}
            title={book.title}
            coverUrl={book.coverUrl}
            isAvailable={book.isAvailable}
            isFavorite={isFavorite}
            onFavoriteToggle={() => setIsFavorite((prev) => !prev)}
        />

        <div className="p-4 flex flex-col gap-3 flex-1">
          {/* Title & Author */}
          <div>
            <h3 className="font-bold text-base text-[var(--color-text)] line-clamp-1 mb-1">
              {book.title}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)]">{book.author}</p>
          </div>

          {book.rating !== undefined && <BookRating rating={book.rating} />}

          {/* Condition & Genre */}
          <div className="flex items-center justify-between">
            <Badge variant={conditionVariant[book.condition]}>{book.condition}</Badge>
            <span className="text-xs font-semibold text-[var(--color-text-muted)] bg-[var(--color-surface-alt)] px-3 py-1 rounded-full capitalize">
            {book.genre}
          </span>
          </div>

          <BookCardActions id={book.id} isAvailable={book.isAvailable} />
          <BookCardOwner ownerId={book.ownerId} />
        </div>
      </Card>
  );
}
