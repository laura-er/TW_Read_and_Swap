type Tab = 'received' | 'sent' | 'completed';

interface SwapTabsProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    receivedCount: number;
    sentCount: number;
    completedCount: number;
}

export function SwapTabs({ activeTab, onTabChange, receivedCount, sentCount, completedCount }: SwapTabsProps) {
    const tabs: { key: Tab; label: string; count: number; activeColor: string }[] = [
        { key: 'received',  label: 'Received', count: receivedCount,  activeColor: '#4a90d9' },
        { key: 'sent',      label: 'Sent',     count: sentCount,      activeColor: '#40916c' },
        { key: 'completed', label: 'Completed',count: completedCount, activeColor: 'var(--color-accent)' },
    ];

    return (
        <div style={{
            display: 'flex', gap: '4px', marginBottom: '20px',
            padding: '4px', borderRadius: '16px',
            background: 'var(--navbar-bg)', border: '1px solid var(--navbar-border)',
            backdropFilter: 'blur(12px)',
        }}>
            {tabs.map(({ key, label, count, activeColor }) => (
                <button
                    key={key}
                    onClick={() => onTabChange(key)}
                    style={{
                        flex: 1, padding: '8px 12px', borderRadius: '12px',
                        fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer',
                        transition: 'all 0.15s',
                        background: activeTab === key ? activeColor : 'transparent',
                        color: activeTab === key ? 'white' : 'var(--navbar-text-muted)',
                    }}
                >
                    {label} ({count})
                </button>
            ))}
        </div>
    );
}