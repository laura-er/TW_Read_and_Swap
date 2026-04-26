import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useReports } from '@/context/ReportsContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import type { ReportType } from '@/types/admin';

interface ReportModalProps { targetId: string; targetName: string; type: ReportType; onClose: () => void; }

export function ReportModal({ targetId, targetName, type, onClose }: ReportModalProps) {
    const { addReport } = useReports();
    const { user } = useAuth();
    const { t } = useLanguage();
    const [selectedReason, setSelectedReason] = useState('');
    const [details, setDetails] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const reasons = type === 'book' ? t.report.reasonsBook : t.report.reasonsUser;
    const otherLabel = reasons[reasons.length - 1];

    function handleSubmit() {
        if (!selectedReason) { setError(t.report.selectReason); return; }
        addReport({ type, targetId, targetName, reason: selectedReason === otherLabel && details.trim() ? details.trim() : selectedReason, reportedBy: user?.username ?? 'anonymous' });
        setSubmitted(true);
    }

    if (submitted) return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[var(--color-surface)] rounded-2xl shadow-xl w-full max-w-sm mx-4 p-8 flex flex-col items-center gap-4 text-center">
                <span className="text-5xl">✅</span>
                <h2 className="text-lg font-bold text-[var(--color-text)]">{t.report.reportSubmitted}</h2>
                <p className="text-sm text-[var(--color-text-muted)]">{t.report.reviewSoon}</p>
                <Button variant="primary" size="sm" onClick={onClose}>{t.common.close}</Button>
            </div>
        </div>, document.body
    );

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[var(--color-surface)] rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <Flag className="w-5 h-5 text-red-500" />
                    <div>
                        <h2 className="text-lg font-bold text-[var(--color-text)]">{type === 'book' ? t.report.reportBook : t.report.reportUser}</h2>
                        <p className="text-sm text-[var(--color-text-muted)]">{targetName}</p>
                    </div>
                </div>
                <div className="h-px bg-[var(--color-border)]" />
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[var(--color-text)]">{t.report.reason}</label>
                    <div className="flex flex-col gap-2">
                        {reasons.map((reason) => (
                            <label key={reason} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ${selectedReason === reason ? 'border-red-400 bg-red-50' : 'border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]'}`}>
                                <input type="radio" name="reason" value={reason} checked={selectedReason === reason} onChange={() => { setSelectedReason(reason); setError(''); }} className="accent-red-500" />
                                <span className="text-sm text-[var(--color-text)]">{reason}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {selectedReason === otherLabel && (
                    <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder={t.report.placeholder} rows={3} className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-sm text-[var(--color-text)] resize-none focus:outline-none focus:ring-2 focus:ring-red-400/40" />
                )}
                {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm" onClick={onClose}>{t.report.cancel}</Button>
                    <Button size="sm" onClick={handleSubmit} className="bg-red-500 hover:bg-red-600 text-white">{t.report.submit}</Button>
                </div>
            </div>
        </div>, document.body
    );
}