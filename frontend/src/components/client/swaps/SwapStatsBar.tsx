interface SwapStatsBarProps {
    receivedCount: number;
    sentCount: number;
    completedCount: number;
}

export function SwapStatsBar({ receivedCount, sentCount, completedCount }: SwapStatsBarProps) {
    const stats = [
        { label: 'Received', value: receivedCount, color: '#4a90d9' },
        { label: 'Sent',     value: sentCount,     color: '#40916c' },
        { label: 'Accepted',  value: completedCount, color: 'var(--color-accent)' },
    ];

    return (
        <div className="grid grid-cols-3 gap-3 mb-8">
            {stats.map(({ label, value, color }) => (
                <div key={label} style={{
                    borderRadius: '16px',
                    border: '1px solid var(--navbar-border)',
                    background: 'var(--navbar-bg)',
                    backdropFilter: 'blur(12px)',
                    padding: '16px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                }}>
                    <div style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        background: color, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', flexShrink: 0,
                    }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>{value}</span>
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--navbar-text)' }}>{label}</p>
                </div>
            ))}
        </div>
    );
}