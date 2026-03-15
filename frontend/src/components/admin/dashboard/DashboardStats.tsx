import type { AdminStats } from '@/types/admin';

interface StatCardProps {
    label: string;
    value: number;
    icon: string;
    accent?: boolean;
}

function StatCard({ label, value, icon, accent = false }: StatCardProps) {
    return (
        <div className={`rounded-xl border border-[var(--color-border)] p-5 flex items-center gap-4 ${accent ? 'bg-[var(--color-accent)]/10' : 'bg-[var(--color-surface)]'}`}>
            <span className="text-2xl">{icon}</span>
            <div>
                <p className="text-2xl font-bold text-[var(--color-text)]">{value}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
            </div>
        </div>
    );
}

interface DashboardStatsProps {
    stats: AdminStats;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <StatCard label="Total Books" value={stats.totalBooks} icon="📚" />
            <StatCard label="Total Users" value={stats.totalUsers} icon="👥" />
            <StatCard label="Pending Swaps" value={stats.pendingSwaps} icon="🔄" accent />
            <StatCard label="Completed Swaps" value={stats.completedSwaps} icon="✅" />
            <StatCard label="Open Reports" value={stats.openReports} icon="⚑" accent />
            <StatCard label="Banned Users" value={stats.bannedUsers} icon="🚫" />
        </div>
    );
}