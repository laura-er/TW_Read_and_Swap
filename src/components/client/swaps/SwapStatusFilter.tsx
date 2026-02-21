import type { SwapStatus } from '@/types';

type FilterStatus = 'all' | SwapStatus;

interface SwapStatusFilterProps {
    active: FilterStatus;
    onChange: (status: FilterStatus) => void;
}

const filters: { key: FilterStatus; label: string; activeClass: string }[] = [
    { key: 'all', label: 'All', activeClass: 'bg-[var(--color-accent)] text-white' },
    { key: 'pending', label: 'Pending', activeClass: 'bg-yellow-500 text-white' },
    { key: 'accepted', label: 'Accepted', activeClass: 'bg-green-500 text-white' },
    { key: 'declined', label: 'Declined', activeClass: 'bg-red-500 text-white' },
];

export function SwapStatusFilter({ active, onChange }: SwapStatusFilterProps) {
    return (
        <div className="flex flex-wrap items-center gap-2 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] mb-6">
            <span className="text-sm font-medium text-[var(--color-text-muted)] mr-1">Filter:</span>
            {filters.map(({ key, label, activeClass }) => (
                <button
                    key={key}
                    onClick={() => onChange(key)}
                    className={[
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                        active === key
                            ? activeClass
                            : 'bg-[var(--color-surface-alt)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
                    ].join(' ')}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
