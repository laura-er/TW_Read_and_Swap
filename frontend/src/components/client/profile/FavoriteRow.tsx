import { Link } from 'react-router-dom';
import { Eye, Star, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Book } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import axiosInstance from '@/api/axiosInstance';

export function FavoriteRow({ book, isLast, onRemove }: { book: Book; isLast: boolean; onRemove: (id: string) => void }) {
    const { t } = useLanguage();
    const [ownerName, setOwnerName] = useState<string>('');
    const [ownerInitial, setOwnerInitial] = useState<string>('?');

    useEffect(() => {
        if (!book.ownerId) return;
        axiosInstance.get(`/api/users/${book.ownerId}`)
            .then(res => {
                const full = `${res.data.firstName} ${res.data.lastName}`.trim();
                setOwnerName(full || res.data.username || book.ownerId);
                setOwnerInitial((full || res.data.username || book.ownerId)[0].toUpperCase());
            })
            .catch(() => { setOwnerName(book.ownerId); setOwnerInitial(book.ownerId[0]?.toUpperCase() ?? '?'); });
    }, [book.ownerId]);

    return (
        <tr style={{ borderBottom: isLast ? 'none' : '1px solid var(--lib-border)' }} className="group transition-colors">
            <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={book.coverUrl} alt={book.title} className="h-14 w-10 flex-shrink-0 rounded object-cover shadow-sm" /><div className="min-w-0"><p className="truncate font-semibold" style={{ color: 'var(--lib-text)' }}>{book.title}</p><p className="truncate text-xs" style={{ color: 'var(--lib-text-muted)' }}>{book.author}</p></div></div></td>
            <td className="hidden px-4 py-3 md:table-cell"><span className="rounded-md px-2 py-0.5 text-xs capitalize" style={{ border: '1px solid var(--lib-border)', color: 'var(--lib-text-muted)' }}>{book.genre}</span></td>
            <td className="hidden px-4 py-3 sm:table-cell">{book.rating !== undefined ? <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /><span className="text-sm font-medium" style={{ color: 'var(--lib-text)' }}>{book.rating}</span></div> : <span className="text-xs" style={{ color: 'var(--lib-text-muted)' }}>—</span>}</td>
            <td className="hidden px-4 py-3 lg:table-cell"><div className="flex items-center gap-2"><div className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: 'var(--color-accent)', opacity: 0.15, color: 'var(--color-accent)' }}>{ownerInitial}</div><span className="text-sm" style={{ color: 'var(--lib-text-muted)' }}>{ownerName || '...'}</span></div></td>
            <td className="px-4 py-3 text-center"><span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: book.isAvailable ? 'rgba(64,145,108,0.15)' : 'var(--lib-stats)', color: book.isAvailable ? '#40916c' : 'var(--lib-text-faint)' }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: book.isAvailable ? '#40916c' : 'var(--lib-text-faint)' }} />{book.isAvailable ? t.books.available : t.books.unavailable}</span></td>
            <td className="px-4 py-3"><div className="flex items-center justify-end gap-1"><Link to={`/books/${book.id}`} className="rounded-lg p-2 transition-colors" style={{ color: 'var(--lib-text-muted)' }} title={t.books.viewDetails}><Eye className="h-4 w-4" /></Link>{book.isAvailable && <Link to={`/swap/${book.id}`} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-colors" style={{ background: 'var(--color-accent)' }}>Swap</Link>}<button onClick={() => onRemove(book.id)} className="rounded-lg p-2 transition-colors hover:text-red-500" style={{ color: 'var(--lib-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }} title="Remove"><Trash2 className="h-4 w-4" /></button></div></td>
        </tr>
    );
}
