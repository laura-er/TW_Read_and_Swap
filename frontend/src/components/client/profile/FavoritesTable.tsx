import type { Book } from '@/types';
import { FavoriteRow } from './FavoriteRow';

interface FavoritesTableProps {
    books: Book[];
    onRemove: (id: string) => void;
}

export function FavoritesTable({ books, onRemove }: FavoritesTableProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[520px]">
                    <thead>
                    <tr className="border-b border-[var(--color-border)] text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                        <th className="px-4 py-3">Book</th>
                        <th className="hidden px-4 py-3 md:table-cell">Genre</th>
                        <th className="hidden px-4 py-3 sm:table-cell">Rating</th>
                        <th className="hidden px-4 py-3 lg:table-cell">Owner</th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book, i) => (
                        <FavoriteRow
                            key={book.id}
                            book={book}
                            isLast={i === books.length - 1}
                            onRemove={onRemove}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}