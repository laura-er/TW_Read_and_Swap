import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { BookCondition, BookGenre } from '@/types';

const GENRES: Array<'All' | BookGenre> = [
    'All', 'fiction', 'non-fiction', 'mystery', 'sci-fi',
    'fantasy', 'romance', 'biography', 'history', 'self-help', 'other',
];

const CONDITIONS: Array<'All' | BookCondition> = ['All', 'new', 'good', 'fair', 'worn'];

interface CatalogFiltersProps {
    searchTerm: string;
    selectedGenre: string;
    selectedCondition: string;
    availableOnly: boolean;
    onSearchChange: (value: string) => void;
    onGenreChange: (value: string) => void;
    onConditionChange: (value: string) => void;
    onAvailableToggle: () => void;
    onClearFilters: () => void;
}

export function CatalogFilters({
                                   searchTerm,
                                   selectedGenre,
                                   selectedCondition,
                                   availableOnly,
                                   onSearchChange,
                                   onGenreChange,
                                   onConditionChange,
                                   onAvailableToggle,
                                   onClearFilters,
                               }: CatalogFiltersProps) {
    return (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 mb-8">
            {/* Search */}
            <div className="mb-5">
                <Input
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    leftIcon={
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    }
                />
            </div>

            {/* Filters row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Genre */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                        Genre
                    </label>
                    <div className="relative">
                        <select
                            value={selectedGenre}
                            onChange={(e) => onGenreChange(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] outline-none transition-all focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 cursor-pointer capitalize"
                        >
                            {GENRES.map((g) => (
                                <option key={g} value={g} className="capitalize">{g}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
                    </div>
                </div>

                {/* Condition */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                        Condition
                    </label>
                    <div className="relative">
                        <select
                            value={selectedCondition}
                            onChange={(e) => onConditionChange(e.target.value)}
                            className="w-full appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] outline-none transition-all focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 cursor-pointer capitalize"
                        >
                            {CONDITIONS.map((c) => (
                                <option key={c} value={c} className="capitalize">{c}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
                    </div>
                </div>

                {/* Available toggle */}
                <div className="flex flex-col gap-1.5 justify-end">
                    <Button
                        variant={availableOnly ? 'primary' : 'secondary'}
                        onClick={onAvailableToggle}
                        className="w-full justify-center"
                    >
                        {availableOnly ? '✓ Available Only' : 'Show All'}
                    </Button>
                </div>

                {/* Clear */}
                <div className="flex flex-col gap-1.5 justify-end">
                    <Button
                        variant="ghost"
                        onClick={onClearFilters}
                        className="w-full justify-center border border-[var(--color-border)]"
                    >
                        Clear Filters
                    </Button>
                </div>
            </div>
        </div>
    );
}
