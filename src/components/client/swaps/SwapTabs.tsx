type Tab = 'received' | 'sent';

interface SwapTabsProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    receivedCount: number;
    sentCount: number;
}

export function SwapTabs({ activeTab, onTabChange, receivedCount, sentCount }: SwapTabsProps) {
    const tabs: { key: Tab; label: string; count: number }[] = [
        { key: 'received', label: 'Requests Received', count: receivedCount },
        { key: 'sent', label: 'Requests Sent', count: sentCount },
    ];

    return (
        <div className="flex gap-2 p-1.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-6">
            {tabs.map(({ key, label, count }) => (
                <button
                    key={key}
                    onClick={() => onTabChange(key)}
                    className={[
                        'flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all',
                        activeTab === key
                            ? 'bg-[var(--color-accent)] text-white shadow-sm'
                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-alt)]',
                    ].join(' ')}
                >
                    {label} ({count})
                </button>
            ))}
        </div>
    );
}
