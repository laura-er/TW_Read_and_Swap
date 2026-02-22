import type { ActivityItem } from '@/types/admin';
import { formatDate } from '@/utils/formatDate';

const typeLabel: Record<ActivityItem['type'], { label: string; color: string }> = {
    book_added:     { label: 'Book Added',  color: 'text-blue-500' },
    swap_completed: { label: 'Swap Done',   color: 'text-green-500' },
    user_joined:    { label: 'New User',    color: 'text-[var(--color-accent)]' },
    report_filed:   { label: 'Report',      color: 'text-yellow-500' },
    user_banned:    { label: 'User Banned', color: 'text-red-500' },
};

interface ActivityFeedProps {
    items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
    return (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--color-border)]">
                <h2 className="font-['Playfair_Display'] text-base font-semibold text-[var(--color-text)]">
                    Recent Activity
                </h2>
            </div>
            <table className="w-full text-sm">
                <thead className="bg-[var(--color-surface-alt)]">
                <tr>
                    <th className="text-left px-5 py-2.5 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Type</th>
                    <th className="text-left px-5 py-2.5 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Description</th>
                    <th className="text-left px-5 py-2.5 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">User</th>
                    <th className="text-left px-5 py-2.5 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">When</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]/50 transition-colors">
                        <td className="px-5 py-3">
                <span className={`font-medium ${typeLabel[item.type].color}`}>
                  {typeLabel[item.type].label}
                </span>
                        </td>
                        <td className="px-5 py-3 text-[var(--color-text)]">{item.description}</td>
                        <td className="px-5 py-3 text-[var(--color-text-muted)]">@{item.user}</td>
                        <td className="px-5 py-3 text-[var(--color-text-muted)] whitespace-nowrap">
                            {formatDate(item.timestamp)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}