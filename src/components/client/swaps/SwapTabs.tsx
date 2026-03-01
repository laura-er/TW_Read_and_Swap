type Tab = 'received' | 'sent' | 'completed';

interface SwapTabsProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    receivedCount: number;
    sentCount: number;
    completedCount: number;
}

export function SwapTabs({ activeTab, onTabChange, receivedCount, sentCount, completedCount }: SwapTabsProps) {
    const tabs: { key: Tab; label: string; count: number; activeClass: string }[] = [
        { key: 'received',  label: 'Requests Received', count: receivedCount,  activeClass: 'bg-blue-500 text-white' },
        { key: 'sent',      label: 'Requests Sent',     count: sentCount,      activeClass: 'bg-[#40916c] text-white' },
        { key: 'completed', label: 'Completed',          count: completedCount, activeClass: 'bg-orange-400 text-white' },
    ];

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            {tabs.map(({ key, label, count, activeClass }) => (
                <button
                    key={key}
                    onClick={() => onTabChange(key)}
                    className={[
                        'py-2.5 px-4 rounded-xl text-sm font-semibold transition-all border',
                        activeTab === key
                            ? `${activeClass} border-transparent`
                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-alt)] bg-[var(--color-surface)] border-[var(--color-border)]',
                    ].join(' ')}
                >
                    {label} ({count})
                </button>
            ))}
        </div>
    );
}
