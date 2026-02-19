import { Badge } from '@/components/ui/Badge';
import type { Book } from '@/types';

interface CatalogResultsBarProps {
    filtered: number;
    total: number;
    allBooks: Book[];
}

export function CatalogResultsBar({ filtered, total, allBooks }: CatalogResultsBarProps) {
    const availableCount = allBooks.filter((b) => b.isAvailable).length;
    const swappedCount = allBooks.filter((b) => !b.isAvailable).length;

    return (
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <p className="text-sm text-[var(--color-text-muted)]">
                Showing{' '}
                <span className="font-bold text-lg text-[var(--color-text)]">{filtered}</span>
                {' '}of{' '}
                <span className="font-semibold text-[var(--color-text)]">{total}</span> books
            </p>

            <div className="flex gap-2">
                <Badge variant="success">{availableCount} Available</Badge>
                <Badge variant="default">{swappedCount} Swapped</Badge>
            </div>
        </div>
    );
}