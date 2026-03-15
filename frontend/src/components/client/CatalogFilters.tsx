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
                                   searchTerm, selectedGenre, selectedCondition, availableOnly,
                                   onSearchChange, onGenreChange, onConditionChange, onAvailableToggle, onClearFilters,
                               }: CatalogFiltersProps) {
    return (
        <div className="mb-8 flex flex-col gap-4">

            {/* Main search bar */}
            <div className="flex shadow-md rounded-xl -space-x-px">

                {/* Genre dropdown — stânga */}
                <div className="relative flex-shrink-0">
                    <select
                        value={selectedGenre}
                        onChange={(e) => onGenreChange(e.target.value)}
                        className="h-full appearance-none rounded-l-xl border border-(--color-border) bg-(--color-surface) px-4 py-3 pr-8 text-sm font-medium text-(--color-text) outline-none transition-all focus:z-10 focus:border-(--color-accent) focus:ring-2 focus:ring-(--color-accent)/20 cursor-pointer capitalize hover:bg-(--color-surface-alt)"
                    >
                        {GENRES.map((g) => (
                            <option key={g} value={g} className="capitalize">{g === 'All' ? 'All Genres' : g}</option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-(--color-text-muted)">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
                </div>

                {/* Search input — centru */}
                <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by title or author..."
                    className="flex-1 border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-(--color-text) placeholder:text-(--color-text-muted) outline-none focus:z-10 focus:border-(--color-accent) focus:ring-2 focus:ring-(--color-accent)/20 transition-all min-w-0"
                />

                {/* Condition dropdown — dreapta inputului */}
                <div className="relative flex-shrink-0">
                    <select
                        value={selectedCondition}
                        onChange={(e) => onConditionChange(e.target.value)}
                        className="h-full appearance-none border border-(--color-border) bg-(--color-surface) px-4 py-3 pr-8 text-sm font-medium text-(--color-text) outline-none transition-all focus:z-10 focus:border-(--color-accent) focus:ring-2 focus:ring-(--color-accent)/20 cursor-pointer capitalize hover:bg-(--color-surface-alt)"
                    >
                        {CONDITIONS.map((c) => (
                            <option key={c} value={c} className="capitalize">{c === 'All' ? 'Any Condition' : c}</option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-(--color-text-muted)">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
                </div>

                {/* Search button — far right */}
                <button
                    type="button"
                    className="flex-shrink-0 inline-flex items-center gap-2 rounded-r-xl bg-(--color-accent) hover:bg-(--color-accent-hover) text-white px-5 py-3 text-sm font-semibold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-(--color-accent)/40"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M21 21l-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                </button>
            </div>

            {/* Secondary row: Available toggle + Clear */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onAvailableToggle}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                        availableOnly
                            ? 'bg-(--color-accent) border-(--color-accent) text-white shadow-sm'
                            : 'bg-(--color-surface) border-(--color-border) text-(--color-text-muted) hover:border-(--color-accent)/40 hover:text-(--color-text)'
                    }`}
                >
                    <span className={`w-2 h-2 rounded-full transition-colors ${availableOnly ? 'bg-white' : 'bg-green-500'}`} />
                    Available Only
                </button>

                {(searchTerm || selectedGenre !== 'All' || selectedCondition !== 'All' || availableOnly) && (
                    <button
                        onClick={onClearFilters}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-(--color-border) text-(--color-text-muted) hover:text-(--color-text) bg-transparent transition-all duration-200"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear filters
                    </button>
                )}
            </div>

        </div>
    );
}
