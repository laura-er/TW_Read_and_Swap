import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flag } from 'lucide-react';
import type { SwapRequest } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ReportModal } from '@/components/shared/ReportModal';
import { formatRelativeDate } from '@/utils/formatDate';
import { useLanguage } from '@/context/LanguageContext';
import axiosInstance from '@/api/axiosInstance';

type StatusVariant = 'warning' | 'success' | 'danger' | 'default';
const statusVariant: Record<string, StatusVariant> = { pending: 'warning', accepted: 'success', rejected: 'danger', cancelled: 'default' };

interface SwapCardProps { swap: SwapRequest; currentUserId: string; onAccept?: (id: string) => void; onDecline?: (id: string) => void; onCancel?: (id: string) => void; }

export function SwapCard({ swap, currentUserId, onAccept, onDecline, onCancel }: SwapCardProps) {
    const { t } = useLanguage();
    const isOwner = String(swap.ownerId) === String(currentUserId);
    const otherUserId = isOwner ? swap.requesterId : swap.ownerId;
    const [otherUsername, setOtherUsername] = useState<string>(`User #${otherUserId}`);
    const [bookOfferedTitle, setBookOfferedTitle] = useState<string>(`Book #${swap.bookOfferedId}`);
    const [bookRequestedTitle, setBookRequestedTitle] = useState<string>(`Book #${swap.bookRequestedId}`);
    const [showReport, setShowReport] = useState(false);

    const statusLabel: Record<string, string> = { pending: t.swaps.pending, accepted: t.swaps.accepted, rejected: t.swaps.declined, cancelled: t.swaps.cancelled };

    useEffect(() => {
        axiosInstance.get(`/api/users/${otherUserId}`).then(res => setOtherUsername(res.data.username ?? `User #${otherUserId}`)).catch(() => {});
        axiosInstance.get(`/api/books/${swap.bookOfferedId}`).then(res => setBookOfferedTitle(res.data.title ?? `Book #${swap.bookOfferedId}`)).catch(() => {});
        axiosInstance.get(`/api/books/${swap.bookRequestedId}`).then(res => setBookRequestedTitle(res.data.title ?? `Book #${swap.bookRequestedId}`)).catch(() => {});
    }, [swap.bookOfferedId, swap.bookRequestedId, otherUserId]);

    const bookPanelStyle: React.CSSProperties = { flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '14px', background: 'var(--color-surface-alt)', border: '1px solid transparent', transition: 'border-color 0.15s', textDecoration: 'none' };

    return (
        <div style={{ borderRadius: '20px', border: '1px solid var(--navbar-border)', background: 'var(--navbar-bg)', backdropFilter: 'blur(12px)', padding: '20px' }}>
            {showReport && <ReportModal targetId={otherUserId} targetName={otherUsername} type="user" onClose={() => setShowReport(false)} />}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--navbar-text)' }}>{isOwner ? `${t.swaps.from} ${otherUsername}` : `${t.swaps.to} ${otherUsername}`}</p>
                    <p style={{ fontSize: '11px', color: 'var(--navbar-text-muted)' }}>{formatRelativeDate(swap.createdAt)}</p>
                </div>
                <Badge variant={statusVariant[swap.status] ?? 'default'}>{statusLabel[swap.status] ?? swap.status}</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Link to={`/books/${swap.bookRequestedId}`} style={bookPanelStyle} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}>
                    <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: '11px', color: 'var(--navbar-text-muted)', marginBottom: '2px' }}>{isOwner ? t.swaps.theyWant : t.swaps.youRequested}</p>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--navbar-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{bookRequestedTitle}</p>
                    </div>
                </Link>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0, color: 'var(--color-accent)' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                <Link to={`/books/${swap.bookOfferedId}`} style={bookPanelStyle} onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')} onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}>
                    <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: '11px', color: 'var(--navbar-text-muted)', marginBottom: '2px' }}>{isOwner ? t.swaps.theyOffered : t.swaps.youOffered}</p>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--navbar-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{bookOfferedTitle}</p>
                    </div>
                </Link>
            </div>
            {swap.message && <div style={{ borderRadius: '12px', padding: '10px 12px', marginBottom: '12px', background: 'var(--color-surface)', border: '1px solid var(--navbar-border)' }}><p style={{ fontSize: '12px', color: 'var(--navbar-text-muted)' }}>{swap.message}</p></div>}
            {swap.status === 'pending' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                    {isOwner ? (
                        <><Button size="sm" variant="primary" className="flex-1 justify-center" onClick={() => onAccept?.(swap.id)}>{t.swaps.accept}</Button><Button size="sm" variant="secondary" className="flex-1 justify-center" onClick={() => onDecline?.(swap.id)}>{t.swaps.decline}</Button></>
                    ) : (
                        <Button size="sm" variant="danger" className="flex-1 justify-center" onClick={() => onCancel?.(swap.id)}>{t.swaps.cancelRequest}</Button>
                    )}
                </div>
            )}
            {swap.status === 'accepted' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px', borderTop: '1px solid var(--navbar-border)' }}>
                    <button onClick={() => setShowReport(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#c0392b', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                        <Flag size={13} /> {t.swaps.reportUser}
                    </button>
                </div>
            )}
        </div>
    );
}
