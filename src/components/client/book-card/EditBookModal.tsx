import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Book, BookCondition, BookGenre } from '@/types';

interface EditBookModalProps {
    book: Book;
    onClose: () => void;
    onSave: (updated: Partial<Book>) => void;
}

const CONDITIONS: BookCondition[] = ['new', 'good', 'fair', 'worn'];
const GENRES: BookGenre[] = [
    'fiction', 'non-fiction', 'mystery', 'sci-fi', 'fantasy',
    'romance', 'biography', 'history', 'self-help', 'other',
];

export function EditBookModal({ book, onClose, onSave }: EditBookModalProps) {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [genre, setGenre] = useState<BookGenre>(book.genre as BookGenre);
    const [condition, setCondition] = useState<BookCondition>(book.condition);
    const [description, setDescription] = useState(book.description);
    const [isAvailable, setIsAvailable] = useState(book.isAvailable);

    const inputClass =
        'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]';

    const handleSubmit = () => {
        onSave({ title, author, genre, condition, description, isAvailable });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-[var(--color-text)]">Edit Book</h2>
                    <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <div>
                        <label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">Title</label>
                        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">Author</label>
                        <input className={inputClass} value={author} onChange={(e) => setAuthor(e.target.value)} />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">Genre</label>
                        <select className={inputClass} value={genre} onChange={(e) => setGenre(e.target.value as BookGenre)}>
                            {GENRES.map((g) => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">Condition</label>
                        <select className={inputClass} value={condition} onChange={(e) => setCondition(e.target.value as BookCondition)}>
                            {CONDITIONS.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-[var(--color-text-muted)] mb-1 block">Description</label>
                        <textarea
                            className={`${inputClass} resize-none`}
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isAvailable}
                            onChange={(e) => setIsAvailable(e.target.checked)}
                            className="accent-[var(--color-accent)] h-4 w-4"
                        />
                        <span className="text-sm text-[var(--color-text)]">Available for swap</span>
                    </label>
                </div>

                <div className="flex gap-2 mt-2">
                    <Button variant="secondary" size="sm" className="flex-1" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button size="sm" className="flex-1" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}
