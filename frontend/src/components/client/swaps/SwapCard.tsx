import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flag } from 'lucide-react';
import type { SwapRequest } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ReportModal } from '@/components/shared/ReportModal';
import { formatRelativeDate } from '@/utils/formatDate';

type StatusVariant = 'warning' | 'success' | 'danger' | 'default';

const statusVariant: Record<string, StatusVariant> = {
    pending:   'warning',
    accepted:  'success',
    rejected:  'danger',
    cancelled: 'default',
};

const statusLabel: Record<string, string> = {
    pending:   'Pending',
    accepted:  'Accepted',
    rejected:  'Declined',
    cancelled: 'Cancelled',
};

interface SwapCardProps {
    swap: SwapRequest;
    currentUserId: string;
    onAccept?: (id: string) => void;
    onDecline?: (id: string) => void;
    onCancel?: (id: string) => void;
}

export function SwapCard({ swap, currentUserId, onAccept, onDecline, onCancel }: SwapCardProps) {
    const isOwner = swap.ownerId === currentUserId;
    const otherUserId = isOwner ? swap.requesterId : swap.ownerId;
    const [showReport, setShowReport] = useState(false);

    const bookPanelStyle: React.CSSProperties = {
        flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
        padding: '10px 12px', borderRadius: '14px',
        background: 'var(--color-surface-alt)',
        border: '1px solid transparent', transition: 'border-color 0.15s',
        textDecoration: 'none',
    };

    return (
        <div style={{
            borderRadius: '20px',
            border: '1px solid var(--navbar-border)',
            background: 'var(--navbar-bg)',
            backdropFilter: 'blur(12px)',
            padding: '20px',
        }}>
            {showReport && (
                <ReportModal
                    targetId={otherUserId}
                    targetName={`User #${otherUserId}`}
                    type="user"
                    onClose={() => setShowReport(false)}
                />
            )}

            {/* User + status */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--navbar-text)' }}>
                        {isOwner ? `From user #${swap.requesterId}` : `To user #${swap.ownerId}`}
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--navbar-text-muted)' }}>
                        {formatRelativeDate(swap.createdAt)}
                    </p>
                </div>
                <Badge variant={statusVariant[swap.status] ?? 'default'}>
                    {statusLabel[swap.status] ?? swap.status}
                </Badge>
            </div>

            {/* Books exchange */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <Link to={`/books/${swap.bookRequestedId}`} style={bookPanelStyle}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}>
                    <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: '11px', color: 'var(--navbar-text-muted)', marginBottom: '2px' }}>
                            {isOwner ? 'They want:' : 'You requested:'}
                        </p>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--navbar-text)',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            Book #{swap.bookRequestedId}
                        </p>
                    </div>
                </Link>

                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     style={{ flexShrink: 0, color: 'var(--color-accent)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>

                <Link to={`/books/${swap.bookOfferedId}`} style={bookPanelStyle}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}>
                    <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: '11px', color: 'var(--navbar-text-muted)', marginBottom: '2px' }}>
                            {isOwner ? 'They offered:' : 'You offered:'}
                        </p>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--navbar-text)',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            Book #{swap.bookOfferedId}
                        </p>
                    </div>
                </Link>
            </div>

            {/* Message */}
            {swap.message && (
                <div style={{
                    borderRadius: '12px', padding: '10px 12px', marginBottom: '12px',
                    background: 'var(--color-surface)', border: '1px solid var(--navbar-border)',
                }}>
                    <p style={{ fontSize: '12px', color: 'var(--navbar-text-muted)' }}>{swap.message}</p>
                </div>
            )}

            {/* Actions */}
            {swap.status === 'pending' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                    {isOwner ? (
                        <>
                            <Button size="sm" variant="primary" className="flex-1 justify-center"
                                    onClick={() => onAccept?.(swap.id)}>Accept</Button>
                            <Button size="sm" variant="secondary" className="flex-1 justify-center"
                                    onClick={() => onDecline?.(swap.id)}>Decline</Button>
                        </>
                    ) : (
                        <Button size="sm" variant="danger" className="flex-1 justify-center"
                                onClick={() => onCancel?.(swap.id)}>Cancel Request</Button>
                    )}
                </div>
            )}

            {swap.status === 'accepted' && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px',
                    borderTop: '1px solid var(--navbar-border)' }}>
                    <button onClick={() => setShowReport(true)}
                            style={{ display: 'flex', alignItems: 'center', gap: '5px',
                                fontSize: '12px', color: '#c0392b', background: 'none',
                                border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                        <Flag size={13} /> Report User
                    </button>
                </div>
            )}
        </div>
    );
}