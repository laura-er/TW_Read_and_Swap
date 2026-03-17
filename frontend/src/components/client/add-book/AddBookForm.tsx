import { Input } from '@/components/ui/Input';
import type { BookCondition, BookGenre } from '@/types';

const GENRES: { value: BookGenre; label: string }[] = [
    { value: 'fiction', label: 'Fiction' },
    { value: 'non-fiction', label: 'Non-fiction' },
    { value: 'mystery', label: 'Mystery' },
    { value: 'sci-fi', label: 'Sci-Fi' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'romance', label: 'Romance' },
    { value: 'biography', label: 'Biography' },
    { value: 'history', label: 'History' },
    { value: 'self-help', label: 'Self-help' },
    { value: 'other', label: 'Other' },
];

const CONDITIONS: { value: BookCondition; label: string; desc: string }[] = [
    { value: 'new', label: 'New', desc: 'Never read, like new' },
    { value: 'good', label: 'Good', desc: 'Read once, no marks' },
    { value: 'fair', label: 'Fair', desc: 'Some wear, readable' },
    { value: 'worn', label: 'Worn', desc: 'Heavy use, still complete' },
];

export interface AddBookFields {
    title: string;
    author: string;
    genre: BookGenre;
    condition: BookCondition;
    description: string;
    coverUrl: string;
}

export type AddBookErrors = Partial<Record<keyof AddBookFields, string>>;

interface AddBookFormProps {
    fields: AddBookFields;
    errors: AddBookErrors;
    onChange: (updated: Partial<AddBookFields>) => void;
}

export function AddBookForm({ fields, errors, onChange }: AddBookFormProps) {
    const handleBlur = (field: keyof Pick<AddBookFields, 'title' | 'author' | 'coverUrl'>) =>
        (e: React.FocusEvent<HTMLInputElement>) => {
            onChange({ [field]: e.target.value });
        };

    const handleTextareaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        onChange({ description: e.target.value });
    };

    return (
        <div className="flex flex-col gap-5 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <h2 className="font-semibold text-[var(--color-text)]">Book details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="Title"
                    placeholder="e.g. The Great Gatsby"
                    defaultValue={fields.title}
                    onBlur={handleBlur('title')}
                    error={errors.title}
                />
                <Input
                    label="Author"
                    placeholder="e.g. F. Scott Fitzgerald"
                    defaultValue={fields.author}
                    onBlur={handleBlur('author')}
                    error={errors.author}
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--color-text)]">Genre</label>
                <select
                    value={fields.genre}
                    onChange={(e) => onChange({ genre: e.target.value as BookGenre })}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                >
                    {GENRES.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-text)]">Condition</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CONDITIONS.map(({ value, label, desc }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => onChange({ condition: value })}
                            className={[
                                'flex flex-col items-start p-3 rounded-xl border text-left transition-all',
                                fields.condition === value
                                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/8 text-[var(--color-accent)]'
                                    : 'border-[var(--color-border)] bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/40',
                            ].join(' ')}
                        >
                            <span className="font-semibold text-sm">{label}</span>
                            <span className="text-xs mt-0.5 opacity-80">{desc}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[var(--color-text)]">Description</label>
                <textarea
                    placeholder="Tell potential swappers what this book is about…"
                    defaultValue={fields.description}
                    onBlur={handleTextareaBlur}
                    rows={3}
                    maxLength={500}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] outline-none resize-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                />
            </div>

            <Input
                label="Cover image URL (optional)"
                placeholder="https://..."
                defaultValue={fields.coverUrl}
                onBlur={handleBlur('coverUrl')}
                hint="Paste a link to the book cover image"
            />
        </div>
    );
}
