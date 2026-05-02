import { useState } from 'react';
import type { Book } from '@/types';
import type { AdminUser } from '@/types/admin';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import { genreLabel, conditionLabel } from '@/utils/bookLabels';
import { ConfirmDeleteBookModal } from './ConfirmDeleteBookModal';

export function AdminBooksTable({ books, users, onDelete }: { books: Book[]; users: AdminUser[]; onDelete: (id: string, ownerId: string, bookTitle: string, ownerName: string, reason: string) => void; }) {
    const { t } = useLanguage();
    const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);

    const getOwner = (ownerId: string): AdminUser | undefined => users.find(u => u.id === ownerId);

    return (
        <>
            <ConfirmDeleteBookModal
                isOpen={!!deleteTarget}
                bookTitle={deleteTarget?.title ?? ''}
                ownerName={deleteTarget ? (getOwner(deleteTarget.ownerId)?.name ?? `User #${deleteTarget.ownerId}`) : ''}
                onConfirm={(reason) => {
                    if (!deleteTarget) return;
                    const owner = getOwner(deleteTarget.ownerId);
                    onDelete(deleteTarget.id, deleteTarget.ownerId, deleteTarget.title, owner?.name ?? `User #${deleteTarget.ownerId}`, reason);
                }}
                onClose={() => setDeleteTarget(null)}
            />
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[var(--color-surface-alt)]"><tr>
                        <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{t.admin.bookCol}</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Proprietar</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{t.admin.genreCol}</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{t.admin.conditionCol}</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Status</th>
                        <th className="px-4 py-3"></th>
                    </tr></thead>
                    <tbody>{books.map(book => {
                        const owner = getOwner(book.ownerId);
                        return (
                            <tr key={book.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]/50 transition-colors">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-11 rounded overflow-hidden bg-[var(--color-surface-alt)] flex-shrink-0">
                                            {book.coverUrl && <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--color-text)] line-clamp-1">{book.title}</p>
                                            <p className="text-xs text-[var(--color-text-muted)]">{book.author}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    {owner ? <div><p className="text-sm text-[var(--color-text)] font-medium">{owner.name}</p><p className="text-xs text-[var(--color-text-muted)]">@{owner.username}</p></div> : <span className="text-xs text-[var(--color-text-muted)]">—</span>}
                                </td>
                                <td className="px-4 py-3 text-[var(--color-text-muted)]">{genreLabel(book.genre, t)}</td>
                                <td className="px-4 py-3"><Badge variant="accent">{conditionLabel(book.condition, t)}</Badge></td>
                                <td className="px-4 py-3"><Badge variant={book.isAvailable ? 'success' : 'default'}>{book.isAvailable ? t.admin.available : t.admin.swapped}</Badge></td>
                                <td className="px-4 py-3"><Button size="sm" variant="danger" onClick={() => setDeleteTarget(book)}>{t.books.delete}</Button></td>
                            </tr>
                        );
                    })}</tbody>
                </table>
                {books.length === 0 && <p className="text-center py-10 text-[var(--color-text-muted)]">{t.common.noData}</p>}
            </div>
        </>
    );
}