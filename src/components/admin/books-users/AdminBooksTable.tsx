import type { Book } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface AdminBooksTableProps {
    books: Book[];
    onDelete: (id: string) => void;
}

export function AdminBooksTable({ books, onDelete }: AdminBooksTableProps) {
    return (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-[var(--color-surface-alt)]">
                <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Book</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Genre</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Condition</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3"></th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]/50 transition-colors">
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-11 rounded overflow-hidden bg-[var(--color-surface-alt)] flex-shrink-0">
                                    {book.coverUrl && (
                                        <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium text-[var(--color-text)] line-clamp-1">{book.title}</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">{book.author}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-3 text-[var(--color-text-muted)] capitalize">{book.genre}</td>
                        <td className="px-4 py-3"><Badge variant="accent">{book.condition}</Badge></td>
                        <td className="px-4 py-3">
                            <Badge variant={book.isAvailable ? 'success' : 'default'}>
                                {book.isAvailable ? 'Available' : 'Swapped'}
                            </Badge>
                        </td>
                        <td className="px-4 py-3">
                            <Button size="sm" variant="danger" onClick={() => onDelete(book.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {books.length === 0 && (
                <p className="text-center py-10 text-[var(--color-text-muted)]">No books found.</p>
            )}
        </div>
    );
}