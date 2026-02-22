import { useState } from 'react';
import { mockReports } from '@/data/mockAdminData';
import type { ReportedIssue, ReportType, ReportStatus } from '@/types/admin';
import { ReportsTable } from '@/components/admin/reports/ReportsTable';
import { ReportsFilterTabs } from '@/components/admin/reports/ReportsFilterTabs';

type FilterTab = 'all' | ReportType;

export function AdminReportsPage() {
    const [reports, setReports] = useState<ReportedIssue[]>(mockReports);
    const [filterTab, setFilterTab] = useState<FilterTab>('all');
    const [statusFilter, setStatusFilter] = useState<ReportStatus | 'all'>('all');

    function updateStatus(id: string, status: ReportStatus) {
        setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
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
                onResolve={(id) => updateStatus(id, 'resolved')}
                onDismiss={(id) => updateStatus(id, 'dismissed')}
            />
        </main>
    );
}