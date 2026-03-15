import type { Book } from '@/types';
import { Badge } from '@/components/ui/Badge';

const conditionVariant: Record<Book['condition'], 'success' | 'info' | 'warning' | 'danger'> = {
    new: 'success',
    good: 'info',
    fair: 'warning',
    worn: 'danger',
};

export function SwapBookInfo({ book }: { book: Book }) {
    return (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sticky top-24">
            <h2 className="font-['Playfair_Display'] text-lg font-bold text-[var(--color-text)] mb-4">
                Book You're Requesting
            </h2>
            <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h3 className="font-bold text-[var(--color-text)]">{book.title}</h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-3">{book.author}</p>
            <div className="flex flex-col gap-2 text-sm border-t border-[var(--color-border)] pt-3">
                <div className="flex justify-between items-center">
                    <span className="text-[var(--color-text-muted)]">Condition</span>
                    <Badge variant={conditionVariant[book.condition]}>{book.condition}</Badge>
                </div>
                <div className="flex justify-between">
                    <span className="text-[var(--color-text-muted)]">Genre</span>
                    <span className="text-[var(--color-text)] font-medium capitalize">{book.genre}</span>
                </div>
            </div>
        </div>
    );
}
