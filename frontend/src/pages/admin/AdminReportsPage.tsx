import { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import type { ReportStatus } from '@/types/admin';
import { ReportsTable } from '@/components/admin/reports/ReportsTable';
import { useReports } from '@/context/ReportsContext';
import { useNotifications } from '@/context/NotificationsContext';
import { useLanguage } from '@/context/LanguageContext';

function StatusDropdown({ value, options, onChange }: { value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
    const [open, setOpen] = useState(false);
    const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const updatePos = useCallback(() => { if (buttonRef.current) { const rect = buttonRef.current.getBoundingClientRect(); setMenuPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX, width: rect.width }); } }, []);
    useEffect(() => {
        if (!open) return;
        function handleClick(e: MouseEvent) { if (menuRef.current && !menuRef.current.contains(e.target as Node) && buttonRef.current && !buttonRef.current.contains(e.target as Node)) setOpen(false); }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [open]);
    const selected = options.find(o => o.value === value);
    const menu = open ? ReactDOM.createPortal(
        <div ref={menuRef} style={{ position: 'absolute', top: menuPos.top, left: menuPos.left, width: menuPos.width, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', zIndex: 99999, padding: '4px', fontFamily: 'inherit' }}>
            {options.map(opt => <button key={opt.value} type="button" onMouseDown={e => { e.preventDefault(); onChange(opt.value); setOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 10px', fontSize: '13px', fontFamily: 'inherit', fontWeight: 400, color: 'var(--color-text)', background: opt.value === value ? 'rgba(0,0,0,0.07)' : 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer' }} onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.05)'; }} onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = opt.value === value ? 'rgba(0,0,0,0.07)' : 'transparent'; }}>{opt.label}</button>)}
        </div>, document.body
    ) : null;
    return (
        <div style={{ position: 'relative' }}>
            <button ref={buttonRef} type="button" onClick={() => { updatePos(); setOpen(o => !o); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '7px 12px', fontSize: '13px', fontFamily: 'inherit', fontWeight: 400, color: 'var(--color-text)', outline: 'none', cursor: 'pointer', whiteSpace: 'nowrap', position: 'relative', minWidth: '130px' }}>
                <span style={{ flex: 1, textAlign: 'left' }}>{selected?.label}</span>
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', color: 'var(--color-text-muted)' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {menu}
        </div>
    );
}

export function AdminReportsPage() {
    const { reports, updateStatus } = useReports();
    const { addNotification } = useNotifications();
    const { t } = useLanguage();
    const [statusFilter, setStatusFilter] = useState<ReportStatus | 'all'>('all');
    const userReports = reports.filter(r => r.type === 'user');
    const openCount = userReports.filter(r => r.status === 'open').length;
    const filtered = userReports.filter(r => statusFilter === 'all' || r.status === statusFilter);

    function handleResolve(id: string, note: string, action: string) {
        const report = reports.find(r => r.id === id);
        if ((action === 'warning' || action === 'ban_user') && report) {
            addNotification({ userId: report.targetId, type: action === 'warning' ? 'warning' : 'ban', title: action === 'warning' ? 'You have received a warning' : 'Your account has been banned', message: note });
        }
        updateStatus(id, 'resolved', note, action);
    }

    const statusOptions = [
        { value: 'all',       label: t.admin.allStatuses },
        { value: 'open',      label: t.admin.open },
        { value: 'resolved',  label: t.admin.resolved },
        { value: 'dismissed', label: t.admin.dismissed },
    ];

    return (
        <main>
            <div className="mb-6">
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)]">{t.admin.reports}</h1>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">{openCount} {t.admin.openReports.toLowerCase()} {t.admin.reportsAttention}</p>
            </div>
            <div className="flex justify-end mb-4"><StatusDropdown value={statusFilter} options={statusOptions} onChange={v => setStatusFilter(v as ReportStatus | 'all')} /></div>
            <ReportsTable reports={filtered} onResolve={handleResolve} onDismiss={id => updateStatus(id, 'dismissed')} />
        </main>
    );
}
