import { Link } from 'react-router-dom';
import type { Book } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface BookCardProps {
  book: Book;
}

const conditionVariant: Record<Book['condition'], 'success' | 'info' | 'warning' | 'danger'> = {
  new: 'success',
  good: 'info',
  fair: 'warning',
  worn: 'danger',
};

export function BookCard({ book }: BookCardProps) {
  return (
    <Link to={`/books/${book.id}`} className="block group">
      <Card hover padding="none" className="overflow-hidden">
        {/* Book cover */}
        <div className="relative aspect-[2/3] bg-[var(--color-surface-alt)] overflow-hidden">
          {book.coverUrl ? (
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
              {/* Placeholder book cover */}
              <span className="text-4xl opacity-30">📖</span>
            </div>
          )}
          {/* Availability badge */}
          <div className="absolute top-2 right-2">
            <Badge variant={book.isAvailable ? 'success' : 'default'}>
              {book.isAvailable ? 'Available' : 'Swapped'}
            </Badge>
          </div>
        </div>

        {/* Book info */}
        <div className="p-3">
          <h3 className="font-semibold text-sm text-[var(--color-text)] line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] mb-2">{book.author}</p>
          <div className="flex items-center justify-between">
            <Badge variant={conditionVariant[book.condition]}>
              {book.condition}
            </Badge>
            {book.rating !== undefined && (
              <span className="text-xs text-[var(--color-text-muted)]">
                ★ {book.rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
