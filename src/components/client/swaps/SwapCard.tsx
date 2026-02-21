import { Link } from 'react-router-dom';
import type { SwapRequestPopulated } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { formatRelativeDate } from '@/utils/formatDate';

type StatusVariant = 'warning' | 'success' | 'danger' | 'default';

const statusVariant: Record<string, StatusVariant> = {
    pending: 'warning',
    accepted: 'success',
    declined: 'danger',
    completed: 'default',
};

interface SwapCardProps {
    swap: SwapRequestPopulated;
    currentUserId: string;
    onAccept?: (id: string) => void;
    onDecline?: (id: string) => void;
    onCancel?: (id: string) => void;
    onComplete?: (id: string) => void;
}

export function SwapCard({ swap, currentUserId, onAccept, onDecline, onCancel, onComplete }: SwapCardProps) {
    const isOwner = swap.ownerId === currentUserId;
    const otherUser = isOwner ? swap.requester : swap.owner;

    return (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            {/* User + status */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Avatar src={otherUser.avatarUrl} name={otherUser.name} size="sm" />
                    <div>
                        <p className="text-sm font-semibold text-[var(--color-text)]">{otherUser.name}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">{formatRelativeDate(swap.createdAt)}</p>
                    </div>
                </div>
                <Badge variant={statusVariant[swap.status]}>{swap.status}</Badge>
            </div>

            {/* Books exchange */}
            <div className="flex items-center gap-3 mb-4">
                <Link to={`/books/${swap.bookRequested.id}`} className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-alt)] hover:border-[var(--color-accent)] border border-transparent transition-all">
                    <img src={swap.bookRequested.coverUrl} alt={swap.bookRequested.title} className="w-10 h-14 object-cover rounded-lg" />
                    <div className="min-w-0">
                        <p className="text-xs text-[var(--color-text-muted)] mb-0.5">{isOwner ? 'They want:' : 'You requested:'}</p>
                        <p className="text-sm font-semibold text-[var(--color-text)] truncate">{swap.bookRequested.title}</p>
                        <p className="text-xs text-[var(--color-text-muted)] truncate">{swap.bookRequested.author}</p>
                    </div>
                </Link>

                <svg className="w-5 h-5 shrink-0 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>

                <Link to={`/books/${swap.bookOffered.id}`} className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-alt)] hover:border-[var(--color-accent)] border border-transparent transition-all">
                    <img src={swap.bookOffered.coverUrl} alt={swap.bookOffered.title} className="w-10 h-14 object-cover rounded-lg" />
                    <div className="min-w-0">
                        <p className="text-xs text-[var(--color-text-muted)] mb-0.5">{isOwner ? 'They offered:' : 'You offered:'}</p>
                        <p className="text-sm font-semibold text-[var(--color-text)] truncate">{swap.bookOffered.title}</p>
                        <p className="text-xs text-[var(--color-text-muted)] truncate">{swap.bookOffered.author}</p>
                    </div>
                </Link>
            </div>

            {/* Message */}
            {swap.message && (
                <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-3 mb-4">
                    <p className="text-xs text-[var(--color-text-muted)]">{swap.message}</p>
                </div>
            )}

            {/* Actions — pending */}
            {swap.status === 'pending' && (
                <div className="flex gap-2">
                    {isOwner ? (
                        <>
                            <Button size="sm" variant="primary" className="flex-1 justify-center" onClick={() => onAccept?.(swap.id)}>
                                Accept
                            </Button>
                            <Button size="sm" variant="secondary" className="flex-1 justify-center" onClick={() => onDecline?.(swap.id)}>
                                Decline
                            </Button>
                        </>
                    ) : (
                        <Button size="sm" variant="danger" className="flex-1 justify-center" onClick={() => onCancel?.(swap.id)}>
                            Cancel Request
                        </Button>
                    )}
                </div>
            )}

            {/* Actions — accepted */}
            {swap.status === 'accepted' && (
                <Button size="sm" variant="primary" className="w-full justify-center" onClick={() => onComplete?.(swap.id)}>
                    ✓ Mark as Completed
                </Button>
            )}
        </div>
    );
}
