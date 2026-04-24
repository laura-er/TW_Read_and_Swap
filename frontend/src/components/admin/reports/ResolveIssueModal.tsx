import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import type { ReportedIssue } from '@/types/admin';

interface ResolveIssueModalProps { report: ReportedIssue; onConfirm: (id: string, note: string, action: string) => void; onClose: () => void; }

const ACTIONS = [
    { value: 'warning', label: '⚠️ Send warning to user' },
    { value: 'remove_content', label: '🗑️ Remove reported content' },
    { value: 'ban_user', label: '🚫 Ban reported user' },
    { value: 'no_action', label: '✅ No action needed' },
];

export function ResolveIssueModal({ report, onConfirm, onClose }: ResolveIssueModalProps) {
    const { t } = useLanguage();
    const [note, setNote] = useState('');
    const [action, setAction] = useState('');
    const [error, setError] = useState('');

    function handleConfirm() {
        if (!action) { setError('Please select an action.'); return; }
        if (!note.trim()) { setError('Please add a resolution note.'); return; }
        onConfirm(report.id, note.trim(), action);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[var(--color-surface)] rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 flex flex-col gap-4">
                <div>
                    <h2 className="text-lg font-bold text-[var(--color-text)]">{t.admin.resolveIssue}</h2>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">Reported: <span className="font-medium text-[var(--color-text)]">{report.targetName}</span></p>
                    <p className="text-sm text-[var(--color-text-muted)]">{t.admin.reason}: <span className="italic">"{report.reason}"</span></p>
                </div>
                <div className="h-px bg-[var(--color-border)]" />
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[var(--color-text)]">{t.admin.resolveAction}</label>
                    <div className="flex flex-col gap-2">
                        {ACTIONS.map((a) => (
                            <label key={a.value} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ${action === a.value ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10' : 'border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]'}`}>
                                <input type="radio" name="action" value={a.value} checked={action === a.value} onChange={() => { setAction(a.value); setError(''); }} className="accent-[var(--color-accent)]" />
                                <span className="text-sm text-[var(--color-text)]">{a.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[var(--color-text)]">{t.admin.resolveNote}</label>
                    <textarea value={note} onChange={(e) => { setNote(e.target.value); setError(''); }} placeholder="Describe what was done to resolve this issue..." rows={3} className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-sm text-[var(--color-text)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40" />
                </div>
                {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm" onClick={onClose}>{t.common.cancel}</Button>
                    <Button variant="primary" size="sm" onClick={handleConfirm}>{t.admin.submit}</Button>
                </div>
            </div>
        </div>
    );
}
