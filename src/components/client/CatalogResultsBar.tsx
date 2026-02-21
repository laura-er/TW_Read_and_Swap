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
            <p className="text-sm text-(--color-text-muted)">
                Showing{' '}
                <span className="font-bold text-base text-(--color-text)">{filtered}</span>
                {' '}of{' '}
                <span className="font-semibold text-(--color-text)">{total}</span> books
            </p>
            <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-(--color-text-muted)">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            {availableCount} available
        </span>
                <span className="w-px h-3 bg-(--color-border)" />
                <span className="flex items-center gap-1.5 text-xs font-semibold text-(--color-text-muted)">
          <span className="w-2 h-2 rounded-full bg-(--color-border) inline-block" />
                    {swappedCount} swapped
        </span>
            </div>
        </div>
    );
}
