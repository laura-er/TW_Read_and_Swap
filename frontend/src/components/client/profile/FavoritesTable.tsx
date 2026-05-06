import type { Book } from '@/types';
import { FavoriteRow } from './FavoriteRow';
import { useLanguage } from '@/context/LanguageContext';

export function FavoritesTable({ books, onRemove }: { books: Book[]; onRemove: (id: string) => void }) {
    const { t } = useLanguage();
    return (
        <div className="overflow-hidden rounded-[20px]" style={{ background: 'var(--lib-card)', border: '1px solid var(--lib-border)', backdropFilter: 'blur(16px)' }}>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[520px]">
                    <thead><tr className="border-b border-[var(--color-border)] text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                        <th className="px-4 py-3">{t.profile.bookCol}</th>
                        <th className="hidden px-4 py-3 md:table-cell">{t.profile.genreCol}</th>
                        <th className="hidden px-4 py-3 sm:table-cell">{t.profile.ratingCol}</th>
                        <th className="hidden px-4 py-3 lg:table-cell">{t.profile.ownerCol}</th>
                        <th className="px-4 py-3 text-center">{t.profile.statusCol}</th>
                        <th className="px-4 py-3 text-right">{t.profile.actionsCol}</th>
                    </tr></thead>
                    <tbody>{books.map((book, i) => <FavoriteRow key={book.id} book={book} isLast={i === books.length - 1} onRemove={onRemove} />)}</tbody>
                </table>
            </div>
        </div>
    );
}
