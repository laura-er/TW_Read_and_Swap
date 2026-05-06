import type { AdminStats } from '@/types/admin';
import { useLanguage } from '@/context/LanguageContext';

function StatCard({ label, value, icon, accent = false }: { label: string; value: number; icon: string; accent?: boolean }) {
    return (
        <div className={`rounded-xl border border-[var(--color-border)] p-5 flex items-center gap-4 ${accent ? 'bg-[var(--color-accent)]/10' : 'bg-[var(--color-surface)]'}`}>
            <span className="text-2xl">{icon}</span>
            <div><p className="text-2xl font-bold text-[var(--color-text)]">{value}</p><p className="text-xs text-[var(--color-text-muted)]">{label}</p></div>
        </div>
    );
}

export function DashboardStats({ stats }: { stats: AdminStats }) {
    const { t } = useLanguage();
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <StatCard label={t.admin.totalBooks}      value={stats.totalBooks}     icon="📚" />
            <StatCard label={t.admin.totalUsers}      value={stats.totalUsers}     icon="👥" />
            <StatCard label={t.admin.pendingSwaps}    value={stats.pendingSwaps}   icon="🔄" accent />
            <StatCard label={t.admin.completedSwaps}  value={stats.completedSwaps} icon="✅" />
            <StatCard label={t.admin.openReports}     value={stats.openReports}    icon="⚑" accent />
            <StatCard label={t.admin.bannedUsers}     value={stats.bannedUsers}    icon="🚫" />
        </div>
    );
}
