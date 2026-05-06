import { useState } from 'react';
import type { ReportedIssue, ReportStatus } from '@/types/admin';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useFormatDate } from '@/utils/useFormatDate';
import { useLanguage } from '@/context/LanguageContext';
import { ResolveIssueModal } from '@/components/admin/reports/ResolveIssueModal';
import { BanUserModal } from '@/components/admin/books-users/BanUserModal';

const statusVariant: Record<ReportStatus, 'warning' | 'success' | 'default'> = {
    open: 'warning',
    resolved: 'success',
    dismissed: 'default',
};

interface ReportsTableProps {
    reports: ReportedIssue[];
    onResolve: (id: string, note: string, action: string, banDetails?: { duration: string; reason: string; message: string }) => void;
    onDismiss: (id: string) => void;
}

export function ReportsTable({ reports, onResolve, onDismiss }: ReportsTableProps) {
    const { t } = useLanguage();
    const { formatFull } = useFormatDate();
    const [resolving, setResolving] = useState<ReportedIssue | null>(null);
    const [banTarget, setBanTarget] = useState<ReportedIssue | null>(null);

    const statusLabel: Record<ReportStatus, string> = {
        open: t.admin.open,
        resolved: t.admin.resolved,
        dismissed: t.admin.dismissed,
    };

    return (
        <>
            {resolving && (
                <ResolveIssueModal
                    report={resolving}
                    onConfirm={(id, note, action) => { onResolve(id, note, action); setResolving(null); }}
                    onRequestBan={(report) => { setResolving(null); setBanTarget(report); }}
                    onClose={() => setResolving(null)}
                />
            )}
            <BanUserModal
                isOpen={!!banTarget}
                userName={banTarget?.targetName ?? ''}
                onConfirm={(duration, reason, message) => {
                    if (banTarget) onResolve(banTarget.id, reason, 'ban_user', { duration, reason, message });
                    setBanTarget(null);
                }}
                onClose={() => setBanTarget(null)}
            />
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[var(--color-surface-alt)]">
                        <tr>
                            <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{t.admin.type}</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{t.admin.target}</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{t.admin.reason}</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{t.admin.reportedBy}</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{t.admin.date}</th>
                            <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{t.admin.status}</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((r) => (
                            <tr key={r.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]/50 transition-colors">
                                <td className="px-4 py-3"><Badge variant="accent" className="capitalize">{t.admin.users.slice(0, -1)}</Badge></td>
                                <td className="px-4 py-3 font-medium text-[var(--color-text)]">{r.targetName}</td>
                                <td className="px-4 py-3 text-[var(--color-text-muted)] max-w-xs"><span className="line-clamp-2">{r.reason}</span></td>
                                <td className="px-4 py-3 text-[var(--color-text-muted)]">@{r.reportedBy}</td>
                                <td className="px-4 py-3 text-[var(--color-text-muted)] whitespace-nowrap">{formatFull(r.createdAt)}</td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-col gap-1">
                                        <Badge variant={statusVariant[r.status]} className="capitalize">{statusLabel[r.status]}</Badge>
                                        {r.status === 'resolved' && r.resolveNote && (
                                            <span className="text-[10px] text-[var(--color-text-muted)] italic line-clamp-1" title={r.resolveNote}>{r.resolveNote}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    {r.status === 'open' && (
                                        <div className="flex items-center gap-2">
                                            <Button size="sm" variant="primary" onClick={() => setResolving(r)}>{t.admin.resolve}</Button>
                                            <Button size="sm" variant="ghost" onClick={() => onDismiss(r.id)}>{t.admin.dismiss}</Button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {reports.length === 0 && <p className="text-center py-10 text-[var(--color-text-muted)]">{t.common.noData}</p>}
            </div>
        </>
    );
}
