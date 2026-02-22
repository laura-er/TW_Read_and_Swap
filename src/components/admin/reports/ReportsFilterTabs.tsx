import type { ReportType } from '@/types/admin';

type FilterTab = 'all' | ReportType;

interface ReportsFilterTabsProps {
    active: FilterTab;
    onChange: (tab: FilterTab) => void;
    counts: { all: number; book: number; user: number };
}

export function ReportsFilterTabs({ active, onChange, counts }: ReportsFilterTabsProps) {
    const tabs: { key: FilterTab; label: string }[] = [
        { key: 'all',  label: `All (${counts.all})` },
        { key: 'book', label: `Books (${counts.book})` },
        { key: 'user', label: `Users (${counts.user})` },
    ];

    return (
        <div className="flex gap-1 p-1 rounded-lg bg-[var(--color-surface-alt)] w-fit">
            {tabs.map(({ key, label }) => (
                <button
                    key={key}
                    onClick={() => onChange(key)}
                    className={[
                        'px-4 py-1.5 rounded-md text-sm font-medium transition-colors',
                        active === key
                            ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm'
                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
                    ].join(' ')}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}