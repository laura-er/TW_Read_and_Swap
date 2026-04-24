import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import type { Book, BookCondition, BookGenre } from '@/types';

interface EditBookModalProps { book: Book; onClose: () => void; onSave: (updated: Partial<Book>) => void; }
const CONDITIONS: BookCondition[] = ['new', 'good', 'fair', 'worn'];
const GENRES: BookGenre[] = ['fiction', 'non-fiction', 'mystery', 'sci-fi', 'fantasy', 'romance', 'biography', 'history', 'self-help', 'other'];
interface BookDraft { title: string; author: string; genre: BookGenre; condition: BookCondition; description: string; isAvailable: boolean; }

export function EditBookModal({ book, onClose, onSave }: EditBookModalProps) {
    const { t } = useLanguage();
    const [draft, setDraft] = useState<BookDraft>({ title: book.title, author: book.author, genre: book.genre as BookGenre, condition: book.condition, description: book.description, isAvailable: book.isAvailable });
    const inputClass = 'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]';
    const handleBlur = (field: keyof Pick<BookDraft, 'title' | 'author' | 'description'>) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { setDraft((prev) => ({ ...prev, [field]: e.target.value })); };
    const handleSubmit = () => { onSave(draft); onClose(); };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[var(--color-text)]">{t.books.edit} Book</h2>
                    <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"><X className="h-5 w-5" /></button>
                </div>
                <div className="flex flex-col gap-3">
                    <div><label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">{t.addBook.bookTitle}</label><input className={inputClass} defaultValue={draft.title} onBlur={handleBlur('title')} /></div>
                    <div><label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">{t.addBook.author}</label><input className={inputClass} defaultValue={draft.author} onBlur={handleBlur('author')} /></div>
                    <div><label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">{t.books.genre}</label><select className={inputClass} value={draft.genre} onChange={(e) => setDraft((prev) => ({ ...prev, genre: e.target.value as BookGenre }))}>{GENRES.map((g) => <option key={g} value={g}>{g}</option>)}</select></div>
                    <div><label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">{t.books.condition}</label><select className={inputClass} value={draft.condition} onChange={(e) => setDraft((prev) => ({ ...prev, condition: e.target.value as BookCondition }))}>{CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                    <div><label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">{t.addBook.description}</label><textarea className={`${inputClass} resize-none`} rows={3} defaultValue={draft.description} onBlur={handleBlur('description')} /></div>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={draft.isAvailable} onChange={(e) => setDraft((prev) => ({ ...prev, isAvailable: e.target.checked }))} className="accent-[var(--color-accent)] h-4 w-4" /><span className="text-sm text-[var(--color-text)]">Available for swap</span></label>
                </div>
                <div className="flex gap-2 mt-2">
                    <Button variant="secondary" size="sm" className="flex-1" onClick={onClose}>{t.common.cancel}</Button>
                    <Button size="sm" className="flex-1" onClick={handleSubmit}>{t.common.save}</Button>
                </div>
            </div>
        </div>
    );
}
