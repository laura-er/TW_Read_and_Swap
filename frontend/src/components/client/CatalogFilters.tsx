import { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import type { BookCondition, BookGenre } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

const GENRES: Array<'All' | BookGenre> = ['All', 'fiction', 'non-fiction', 'mystery', 'sci-fi', 'fantasy', 'romance', 'biography', 'history', 'self-help', 'other'];
const CONDITIONS: Array<'All' | BookCondition> = ['All', 'new', 'good', 'fair', 'worn'];

interface CatalogFiltersProps { searchTerm: string; selectedGenre: string; selectedCondition: string; availableOnly: boolean; onSearchChange: (v: string) => void; onGenreChange: (v: string) => void; onConditionChange: (v: string) => void; onAvailableToggle: () => void; onClearFilters: () => void; }
interface CustomDropdownProps { value: string; options: string[]; getLabel: (v: string) => string; onChange: (v: string) => void; minWidth?: string; }

function CustomDropdown({ value, options, getLabel, onChange, minWidth }: CustomDropdownProps) {
    const [open, setOpen] = useState(false);
    const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const updatePos = useCallback(() => { if (buttonRef.current) { const rect = buttonRef.current.getBoundingClientRect(); setMenuPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX, width: rect.width }); } }, []);
    const handleOpen = () => { updatePos(); setOpen(o => !o); };
    useEffect(() => {
        if (!open) return;
        function handleClickOutside(e: MouseEvent) { if (menuRef.current && !menuRef.current.contains(e.target as Node) && buttonRef.current && !buttonRef.current.contains(e.target as Node)) setOpen(false); }
        function handleScroll() { updatePos(); }
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, true);
        return () => { document.removeEventListener('mousedown', handleClickOutside); window.removeEventListener('scroll', handleScroll, true); };
    }, [open, updatePos]);
    const menu = open ? ReactDOM.createPortal(
        <div ref={menuRef} style={{ position: 'absolute', top: menuPos.top, left: menuPos.left, width: menuPos.width, background: '#eee1cd', border: '1px solid var(--navbar-border)', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', zIndex: 99999, padding: '4px', overflow: 'hidden', fontFamily: 'inherit' }}>
            {options.map(opt => (
                <button key={opt} type="button" onMouseDown={e => { e.preventDefault(); onChange(opt); setOpen(false); }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '3px 10px', fontSize: '13px', fontFamily: 'inherit', fontWeight: 400, color: 'var(--navbar-text, #1c1510)', background: opt === value ? 'rgba(0,0,0,0.09)' : 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.06)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = opt === value ? 'rgba(0,0,0,0.09)' : 'transparent'; }}>
                    {getLabel(opt)}
                </button>
            ))}
        </div>, document.body
    ) : null;
    return (
        <div style={{ position: 'relative', flexShrink: 0, alignSelf: 'stretch', display: 'flex' }}>
            <button ref={buttonRef} type="button" onClick={handleOpen} style={{ display: 'flex', alignItems: 'center', background: 'var(--navbar-bg)', border: 'none', color: 'var(--navbar-text)', padding: '10px 32px 10px 14px', fontSize: '13px', fontFamily: 'inherit', fontWeight: 500, outline: 'none', cursor: 'pointer', backdropFilter: 'blur(12px)', whiteSpace: 'nowrap', minWidth: minWidth ?? 'auto', width: '100%', position: 'relative' }}>
                {getLabel(value)}
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: `translateY(-50%) rotate(${open ? '180deg' : '0deg'})`, transition: 'transform 0.15s', pointerEvents: 'none', color: 'var(--navbar-text-muted)' }}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
            </button>
            {menu}
        </div>
    );
}

const inputStyle: React.CSSProperties = { flex: 1, background: 'var(--navbar-bg)', border: 'none', color: 'var(--navbar-text)', padding: '10px 14px', fontSize: '13px', outline: 'none', backdropFilter: 'blur(12px)', minWidth: 0 };

export function CatalogFilters({ searchTerm, selectedGenre, selectedCondition, availableOnly, onSearchChange, onGenreChange, onConditionChange, onAvailableToggle, onClearFilters }: CatalogFiltersProps) {
    const { t } = useLanguage();
    const hasFilters = searchTerm || selectedGenre !== 'All' || selectedCondition !== 'All' || availableOnly;

    const genreLabel = (v: string) => {
        if (v === 'All') return t.books.allGenres;
        const map: Record<string, string> = { fiction: t.books.genreFiction, 'non-fiction': t.books.genreNonFiction, mystery: t.books.genreMystery, 'sci-fi': t.books.genreSciFi, fantasy: t.books.genreFantasy, romance: t.books.genreRomance, biography: t.books.genreBiography, history: t.books.genreHistory, 'self-help': t.books.genreSelfHelp, other: t.books.genreOther };
        return map[v] ?? v;
    };

    const conditionLabel = (v: string) => {
        if (v === 'All') return t.books.allConditions;
        const map: Record<string, string> = { new: t.books.conditionNew, good: t.books.conditionGood, fair: t.books.conditionFair, worn: t.books.conditionWorn };
        return map[v] ?? v;
    };

    return (
        <div className="mb-8 flex flex-col gap-3">
            <div style={{ display: 'flex', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid var(--navbar-border)', overflow: 'hidden' }}>
                <CustomDropdown value={selectedGenre} options={GENRES as string[]} getLabel={genreLabel} onChange={onGenreChange} minWidth="120px" />
                <div style={{ width: '1px', background: 'var(--navbar-border)', flexShrink: 0 }} />
                <input type="search" value={searchTerm} onChange={e => onSearchChange(e.target.value)} placeholder={t.books.searchPlaceholder} style={inputStyle} onFocus={e => { e.currentTarget.style.background = 'var(--color-surface)'; }} onBlur={e => { e.currentTarget.style.background = 'var(--navbar-bg)'; }} />
                <div style={{ width: '1px', background: 'var(--navbar-border)', flexShrink: 0 }} />
                <CustomDropdown value={selectedCondition} options={CONDITIONS as string[]} getLabel={conditionLabel} onChange={onConditionChange} minWidth="130px" />
                <div style={{ width: '1px', background: 'var(--navbar-border)', flexShrink: 0 }} />
                <button type="button" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', background: 'var(--color-accent)', color: 'white', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    {t.common.search}
                </button>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={onAvailableToggle} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, border: availableOnly ? 'none' : '1px solid var(--navbar-border)', background: availableOnly ? 'var(--color-accent)' : 'var(--navbar-bg)', color: availableOnly ? 'white' : 'var(--navbar-text-muted)', backdropFilter: 'blur(12px)', cursor: 'pointer', transition: 'all 0.15s' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: availableOnly ? 'white' : '#40916c' }} />
                    {t.books.available} {t.books.availableOnly}
                </button>
                {hasFilters && (
                    <button onClick={onClearFilters} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: 600, border: '1px solid var(--navbar-border)', background: 'var(--navbar-bg)', color: 'var(--navbar-text-muted)', backdropFilter: 'blur(12px)', cursor: 'pointer' }}>
                        <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        {t.books.clearFilters}
                    </button>
                )}
            </div>
        </div>
    );
}