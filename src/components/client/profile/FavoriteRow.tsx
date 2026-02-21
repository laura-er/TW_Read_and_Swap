import { Link } from 'react-router-dom';
import { Eye, Star, Trash2 } from 'lucide-react';
import type { Book } from '@/types';

const conditionStyle: Record<Book['condition'], string> = {
    new: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    good: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    fair: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    worn: 'bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]',
};

interface FavoriteRowProps {
    book: Book;
    isLast: boolean;
    onRemove: (id: string) => void;
}

export function FavoriteRow({ book, isLast, onRemove }: FavoriteRowProps) {
    return (
        <tr
            className={`group transition-colors hover:bg-[var(--color-surface-alt)]/50 ${
                !isLast ? 'border-b border-[var(--color-border)]' : ''
            }`}
        >
            {/* Book */}
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="h-14 w-10 flex-shrink-0 rounded object-cover shadow-sm"
                    />
                    <div className="min-w-0">
                        <p className="truncate font-semibold text-[var(--color-text)]">{book.title}</p>
                        <p className="truncate text-xs text-[var(--color-text-muted)]">{book.author}</p>
                        <span className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium md:hidden ${conditionStyle[book.condition]}`}>
                            {book.condition}
                        </span>
                    </div>
                </div>
            </td>

            {/* Genre + condition */}
            <td className="hidden px-4 py-3 md:table-cell">
                <span className="rounded-md border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-text-muted)] capitalize">
                    {book.genre}
                </span>
                <span className={`ml-1.5 rounded px-1.5 py-0.5 text-[10px] font-medium ${conditionStyle[book.condition]}`}>
                    {book.condition}
                </span>
            </td>

            {/* Rating */}
            <td className="hidden px-4 py-3 sm:table-cell">
                {book.rating !== undefined ? (
                    <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-[var(--color-text)]">{book.rating}</span>
                    </div>
                ) : (
                    <span className="text-xs text-[var(--color-text-muted)]">—</span>
                )}
            </td>

            {/* Owner */}
            <td className="hidden px-4 py-3 lg:table-cell">
                <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[10px] font-bold text-[var(--color-accent)]">
                        {book.ownerId[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-[var(--color-text-muted)]">{book.ownerId}</span>
                </div>
            </td>

            {/* Status */}
            <td className="px-4 py-3 text-center">
                <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        book.isAvailable
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]'
                    }`}
                >
                    <span
                        className={`h-1.5 w-1.5 rounded-full ${
                            book.isAvailable ? 'bg-green-500' : 'bg-[var(--color-text-muted)]'
                        }`}
                    />
                    {book.isAvailable ? 'Available' : 'Unavailable'}
                </span>
            </td>

            {/* Actions */}
            <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                    <Link
                        to={`/books/${book.id}`}
                        className="rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text)]"
                        title="View Details"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                    {book.isAvailable && (
                        <Link
                            to={`/swap/${book.id}`}
                            className="rounded-lg bg-[var(--color-accent)] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[var(--color-accent-hover)]"
                        >
                            Swap
                        </Link>
                    )}
                    