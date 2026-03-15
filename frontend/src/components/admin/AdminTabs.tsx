interface AdminTabsProps<T extends string> {
    tabs: { key: T; label: string }[];
    active: T;
    onChange: (tab: T) => void;
}

export function AdminTabs<T extends string>({ tabs, active, onChange }: AdminTabsProps<T>) {
    return (
        <div className="flex gap-1 p-1 rounded-lg bg-[var(--color-surface-alt)] w-fit mb-6">
            {tabs.map(({ key, label }) => (
                <button
                    key={key}
                    onClick={() => onChange(key)}
                    className={[
                        'px-5 py-2 rounded-md text-sm font-medium transition-colors',
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