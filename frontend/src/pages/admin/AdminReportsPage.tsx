import { useState } from 'react';
import type { ReportStatus } from '@/types/admin';
import { ReportsTable } from '@/components/admin/reports/ReportsTable';
import { useReports } from '@/context/ReportsContext';
import { useNotifications } from '@/context/NotificationsContext';

const DEMO_USER_ID = 'user1';

export function AdminReportsPage() {
    const { reports, updateStatus } = useReports();
    const { addNotification } = useNotifications();
    const [statusFilter, setStatusFilter] = useState<ReportStatus | 'all'>('all');

    // Doar reports de tip user
    const userReports = reports.filter((r) => r.type === 'user');
    const openCount = userReports.filter((r) => r.status === 'open').length;

    const filtered = userReports.filter(
        (r) => statusFilter === 'all' || r.status === statusFilter
    );

    function handleResolve(id: string, note: string, action: string) {
        if (action === 'warning' || action === 'ban_user') {
            addNotification({
                userId: DEMO_USER_ID,
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
                    Reported Users
                </h1>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    {openCount} open report{openCount !== 1 ? 's' : ''} require attention
                </p>
            </div>

            <div className="flex justify-end mb-4">
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
