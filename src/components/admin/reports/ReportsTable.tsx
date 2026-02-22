import type { ReportedIssue, ReportStatus } from '@/types/admin';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/utils/formatDate';

const statusVariant: Record<ReportStatus, 'warning' | 'success' | 'default'> = {
    open: 'warning',
    resolved: 'success',
    dismissed: 'default',
};

interface ReportsTableProps {
    reports: ReportedIssue[];
    onResolve: (id: string) => void;
    onDismiss: (id: string) => void;
}

export function ReportsTable({ reports, onResolve, onDismiss }: ReportsTableProps) {
    return (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-[var(--color-surface-alt)]">
                <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Target</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Reason</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Reported by</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3"></th>
                </tr>
                </thead>
                <tbody>
                {reports.map((r) => (
                    <tr key={r.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]/50 transition-colors">
                        <td className="px-4 py-3">
                            <Badge variant={r.type === 'book' ? 'info' : 'accent'} className="capitalize">
                                {r.type}
                            </Badge>
                        </td>
                        <td className="px-4 py-3 font-medium text-[var(--color-text)]">{r.targetName}</td>
                        <td className="px-4 py-3 text-[var(--color-text-muted)] max-w-xs">
                            <span className="line-clamp-2">{r.reason}</span>
                        </td>
                        <td className="px-4 py-3 text-[var(--color-text-muted)]">@{r.reportedBy}</td>
                        <td className="px-4 py-3 text-[var(--color-text-muted)] whitespace-nowrap">
                            {formatDate(r.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                            <Badge variant={statusVariant[r.status]} className="capitalize">{r.status}</Badge>
                        </td>
                        <td className="px-4 py-3">
                            {r.status === 'open' && (
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="primary" onClick={() => onResolve(r.id)}>Resolve</Button>
                                    <Button size="sm" variant="ghost" onClick={() => onDismiss(r.id)}>Dismiss</Button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {reports.length === 0 && (
                <p className="text-center py-10 text-[var(--color-text-muted)]">No reports found.</p>
            )}
        </div>
    );
}