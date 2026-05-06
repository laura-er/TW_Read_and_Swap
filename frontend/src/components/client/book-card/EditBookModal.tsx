import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { genreLabel, conditionLabel } from '@/utils/bookLabels';
import type { Book, BookCondition, BookGenre } from '@/types';

interface EditBookModalProps { book: Book; onClose: () => void; onSave: (updated: Partial<Book>) => void; }
const CONDITIONS: BookCondition[] = ['new', 'good', 'fair', 'worn'];
const GENRES: BookGenre[] = ['fiction', 'non-fiction', 'mystery', 'sci-fi', 'fantasy', 'romance', 'biography', 'history', 'self-help', 'other'];
interface BookDraft { title: string; author: string; genre: BookGenre; condition: BookCondition; description: string; isAvailable: boolean; }

function CustomSelect<T extends string>({ value, options, getLabel, onChange }: { value: T; options: T[]; getLabel: (v: T) => string; onChange: (v: T) => void; }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
        <div ref={containerRef} className="relative w-full">
            <button type="button" onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors" style={{ background: 'var(--color-surface-alt)' }}>
                <span>{getLabel(value)}</span>
                <ChevronDown className="h-4 w-4 text-[var(--color-text-muted)] transition-transform duration-150" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            {open && (
                <div className="absolute z-[9999] mt-1 w-full rounded-lg border border-[var(--color-border)] shadow-lg overflow-hidden p-1" style={{ background: 'var(--color-surface-alt)' }}>
                    {options.map(opt => (
                        <button key={opt} type="button" onMouseDown={e => { e.preventDefault(); onChange(opt as T); setOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-[var(--color-text)] rounded-lg transition-colors" style={{ background: opt === value ? 'rgba(0,0,0,0.06)' : undefined }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.06)'; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = opt === value ? 'rgba(0,0,0,0.06)' : 'transparent'; }}>
                            {getLabel(opt)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export function EditBookModal({ book, onClose, onSave }: EditBookModalProps) {
    const { t } = useLanguage();
    const [draft, setDraft] = useState<BookDraft>({ title: book.title, author: book.author, genre: book.genre as BookGenre, condition: book.condition, description: book.description, isAvailable: book.isAvailable });

    const inputClass = 'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]';

    const handleBlur = (field: keyof Pick<BookDraft, 'title' | 'author' | 'description'>) =>
        (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { setDraft((prev) => ({ ...prev, [field]: e.target.value })); };

    const handleSubmit = () => { onSave(draft); onClose(); };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4" style={{ background: 'var(--lib-card)', border: '1px solid var(--lib-border)' }}>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[var(--color-text)]">{t.books.edit}</h2>
                    <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]"><X className="h-5 w-5" /></button>
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">{t.addBook.bookTitle}</label>
                        <input className={inputClass} defaultValue={draft.title} onBlur={handleBlur('title')} />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">{t.addBook.author}</label>
                        <input className={inputClass} defaultValue={draft.author} onBlur={handleBlur('author')} />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">{t.books.genre}</label>
                        <CustomSelect value={draft.genre} options={GENRES} getLabel={(g) => genreLabel(g, t)} onChange={(g) => setDraft(prev => ({ ...prev, genre: g }))} />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">{t.books.condition}</label>
                        <CustomSelect value={draft.condition} options={CONDITIONS} getLabel={(c) => conditionLabel(c, t)} onChange={(c) => setDraft(prev => ({ ...prev, condition: c }))} />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">{t.addBook.description}</label>
                        <textarea className={`${inputClass} resize-none`} rows={3} defaultValue={draft.description} onBlur={handleBlur('description')} />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={draft.isAvailable} onChange={(e) => setDraft((prev) => ({ ...prev, isAvailable: e.target.checked }))} className="accent-[var(--color-accent)] h-4 w-4" />
                        <span className="text-sm text-[var(--color-text)]">{t.books.available}</span>
                    </label>
                </div>
                <div className="flex gap-2 mt-2 justify-center">
                    <button onClick={onClose} className="flex-1 py-2 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-alt)] text-[var(--color-text)] text-sm font-semibold transition-all duration-200">{t.common.cancel}</button>
                    <button onClick={handleSubmit} className="flex-1 py-2 px-3 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-semibold transition-all duration-200">{t.common.save}</button>
                </div>
            </div>
        </div>
        , document.body);
}