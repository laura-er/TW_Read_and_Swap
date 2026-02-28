import { useState } from 'react';
import type { ReportType, ReportStatus } from '@/types/admin';
import { ReportsTable } from '@/components/admin/reports/ReportsTable';
import { ReportsFilterTabs } from '@/components/admin/reports/ReportsFilterTabs';
import { useReports } from '@/context/ReportsContext';
import { useNotifications } from '@/context/NotificationsContext';

type FilterTab = 'all' | ReportType;

// Normalizeaza userId: "2" -> "user2", "user2" -> "user2"
function normalizeUserId(id: string): string {
    return id.startsWith('user') ? id : `user${id}`;
}

export function AdminReportsPage() {
    const { reports, updateStatus } = useReports();
    const { addNotification } = useNotifications();
    const [filterTab, setFilterTab] = useState<FilterTab>('all');
    const [statusFilter, setStatusFilter] = useState<ReportStatus | 'all'>('all');

    function handleResolve(id: string, note: string, action: string) {
        const report = reports.find((r) => r.id === id);
        if (!report) return;

        if (report.type === 'user' && (action === 'warning' || action === 'ban_user')) {
            const userId = normalizeUserId(report.targetId);
            console.log('[Admin] Sending notification to userId:', userId);
            addNotification({
                userId,
                type: action === 'warning' ? 'warning' : 'ban',
                title: action === 'warning' ? 'You have received a warning' : 'Your account has been banned',
                message: note,
            });
        }

        updateStatus(id, 'resolved', note, action);
    }

    function handleDismiss(id: string) {
        updateStatus(id, 'dismissed');
    }

    const counts = {
        all: reports.length,
        book: reports.filter((r) => r.type === 'book').length,
        user: reports.filter((r) => r.type === 'user').length,
    };

    const openCount = reports.filter((r) => r.status === 'open').length;

    const filtered = reports.filter((r) => {
        const matchType = filterTab === 'all' || r.type === filterTab;
        const matchStatus = statusFilter === 'all' || r.status === statusFilter;
        return matchType && matchStatus;
    });

    const statusOptions: { value: ReportStatus | 'all'; label: string }[] = [
        { value: 'all', label: 'All statuses' },
        { value: 'open', label: 'Open' },
        { value: 'resolved', label: 'Resolved' },
        { value: 'dismissed', label: 'Dismissed' },
    ];

    return (
        <main>
            <div className="mb-6">
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)]">
                    Reported Issues
                </h1>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    {openCount} open report{openCount !== 1 ? 's' : ''} require attention
                </p>
            </div>

            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <ReportsFilterTabs active={filterTab} onChange={setFilterTab} counts={counts} />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as ReportStatus | 'all')}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
                >
                    {statusOptions.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            </div>

            <ReportsTable
                reports={filtered}
                onResolve={handleResolve}
                onDismiss={handleDismiss}
            />
        </main>
    );
}
