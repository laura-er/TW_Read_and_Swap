interface SwapStatsBarProps {
    receivedCount: number;
    sentCount: number;
    pendingCount: number;
}

export function SwapStatsBar({ receivedCount, sentCount, pendingCount }: SwapStatsBarProps) {
    const stats = [
        { label: 'Received', value: receivedCount, bg: 'bg-blue-500' },
        { label: 'Sent',     value: sentCount,     bg: 'bg-[#40916c]' },
        { label: 'Pending',  value: pendingCount,  bg: 'bg-orange-400' },
    ];

    return (
        <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map(({ label, value, bg }) => (
                <div key={label} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bg}`}>
                        <span className="text-lg font-bold text-white">{value}</span>
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text)]">{label}</p>
                </div>
            ))}
        </div>
    );
}
