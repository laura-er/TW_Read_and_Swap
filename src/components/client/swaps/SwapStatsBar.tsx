interface SwapStatsBarProps {
    receivedCount: number;
    sentCount: number;
    pendingCount: number;
}

export function SwapStatsBar({ receivedCount, sentCount, pendingCount }: SwapStatsBarProps) {
    const stats = [
        { label: 'Received', value: receivedCount, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
        { label: 'Sent', value: sentCount, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
        { label: 'Pending', value: pendingCount, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
    ];

    return (
        <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map(({ label, value, color, bg }) => (
                <div key={label} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bg}`}>
                        <span className={`text-lg font-bold ${color}`}>{value}</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
                </div>
            ))}
        </div>
    );
}
