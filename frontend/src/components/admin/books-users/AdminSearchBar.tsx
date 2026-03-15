import { Button } from '@/components/ui/Button';

interface AdminSearchBarProps {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    onExport?: () => void;
    exportLabel?: string;
}

export function AdminSearchBar({
                                   value,
                                   onChange,
                                   placeholder = 'Search...',
                                   onExport,
                                   exportLabel = 'Export CSV',
                               }: AdminSearchBarProps) {
    return (
        <div className="flex items-center gap-3 mb-5">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
            />
            {onExport && (
                <Button size="sm" variant="secondary" onClick={onExport}>
                    ↓ {exportLabel}
                </Button>
            )}
        </div>
    );
}