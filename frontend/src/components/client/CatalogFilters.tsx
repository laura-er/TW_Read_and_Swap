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
    onSearchChange: (v: string) => void;
    onGenreChange: (v: string) => void;
    onConditionChange: (v: string) => void;
    onAvailableToggle: () => void;
    onClearFilters: () => void;
}

const selectStyle: React.CSSProperties = {
    height: '100%',
    appearance: 'none',
    background: 'var(--navbar-bg)',
    border: '1px solid var(--navbar-border)',
    color: 'var(--navbar-text)',
    padding: '10px 32px 10px 14px',
    fontSize: '13px',
    fontWeight: 500,
    outline: 'none',
    cursor: 'pointer',
    backdropFilter: 'blur(12px)',
};

const inputStyle: React.CSSProperties = {
    flex: 1,
    background: 'var(--navbar-bg)',
    border: '1px solid var(--navbar-border)',
    borderLeft: 'none',
    borderRight: 'none',
    color: 'var(--navbar-text)',
    padding: '10px 14px',
    fontSize: '13px',
    outline: 'none',
    backdropFilter: 'blur(12px)',
    minWidth: 0,
};

export function CatalogFilters({
                                   searchTerm, selectedGenre, selectedCondition, availableOnly,
                                   onSearchChange, onGenreChange, onConditionChange, onAvailableToggle, onClearFilters,
                               }: CatalogFiltersProps) {
    const hasFilters = searchTerm || selectedGenre !== 'All' || selectedCondition !== 'All' || availableOnly;

    return (
        <div className="mb-8 flex flex-col gap-3">

            {/* Search bar */}
            <div style={{
                display: 'flex',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                border: '1px solid var(--navbar-border)',
            }}>
                {/* Genre */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                    <select value={selectedGenre} onChange={e => onGenreChange(e.target.value)}
                            style={{ ...selectStyle, borderRadius: 0, borderTop: 'none', borderBottom: 'none', borderLeft: 'none' }}>
                        {GENRES.map(g => (
                            <option key={g} value={g}>{g === 'All' ? 'All Genres' : g}</option>
                        ))}
                    </select>
                    <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--navbar-text-muted)' }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
                </div>

                {/* Input */}
                <input
                    type="search" value={searchTerm} onChange={e => onSearchChange(e.target.value)}
                    placeholder="Search by title or author..."
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.background = 'var(--color-surface)'; }}
                    onBlur={e => { e.currentTarget.style.background = 'var(--navbar-bg)'; }}
                />

                {/* Condition */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                    <select value={selectedCondition} onChange={e => onConditionChange(e.target.value)}
                            style={{ ...selectStyle, borderRadius: 0, borderTop: 'none', borderBottom: 'none', borderRight: 'none' }}>
                        {CONDITIONS.map(c => (
                            <option key={c} value={c}>{c === 'All' ? 'Any Condition' : c}</option>
                        ))}
                    </select>
                    <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--navbar-text-muted)' }}>
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
                </div>

                {/* Search btn */}
                <button type="button" style={{
                    flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '10px 18px', background: 'var(--color-accent)',
                    color: 'white', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer',
                }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M21 21l-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                </button>
            </div>

            {/* Secondary row */}
            <div className="flex items-center gap-2">
                <button onClick={onAvailableToggle}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '7px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
                            border: availableOnly ? 'none' : '1px solid var(--navbar-border)',
                            background: availableOnly ? 'var(--color-accent)' : 'var(--navbar-bg)',
                            color: availableOnly ? 'white' : 'var(--navbar-text-muted)',
                            backdropFilter: 'blur(12px)', cursor: 'pointer', transition: 'all 0.15s',
                        }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: availableOnly ? 'white' : '#40916c' }} />
                    Available Only
                </button>

                {hasFilters && (
                    <button onClick={onClearFilters}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '5px',
                                padding: '7px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: 600,
                                border: '1px solid var(--navbar-border)',
                                background: 'var(--navbar-bg)', color: 'var(--navbar-text-muted)',
                                backdropFilter: 'blur(12px)', cursor: 'pointer',
                            }}>
                        <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}