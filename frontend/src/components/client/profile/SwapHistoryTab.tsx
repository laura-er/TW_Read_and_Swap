import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { SwapRequest } from '@/types';
import { formatRelativeDate } from '@/utils/formatDate';
import axiosInstance from '@/api/axiosInstance';

interface SwapHistoryTabProps {
    swaps: SwapRequest[];
    currentUserId: string;
}

function SwapHistoryCard({ swap, currentUserId }: { swap: SwapRequest; currentUserId: string }) {
    const isOwner = String(swap.ownerId) === String(currentUserId);
    const otherUserId = isOwner ? swap.requesterId : swap.ownerId;

    const [otherUsername, setOtherUsername] = useState<string>(`User #${otherUserId}`);
    const [bookOfferedTitle, setBookOfferedTitle] = useState<string>(`Book #${swap.bookOfferedId}`);
    const [bookRequestedTitle, setBookRequestedTitle] = useState<string>(`Book #${swap.bookRequestedId}`);

    useEffect(() => {
        axiosInstance.get(`/api/users/${otherUserId}`)
            .then(res => setOtherUsername(res.data.username ?? `User #${otherUserId}`))
            .catch(() => {});

        axiosInstance.get(`/api/books/${swap.bookOfferedId}`)
            .then(res => setBookOfferedTitle(res.data.title ?? `Book #${swap.bookOfferedId}`))
            .catch(() => {});

        axiosInstance.get(`/api/books/${swap.bookRequestedId}`)
            .then(res => setBookRequestedTitle(res.data.title ?? `Book #${swap.bookRequestedId}`))
            .catch(() => {});
    }, [swap.bookOfferedId, swap.bookRequestedId, otherUserId]);

    return (
        <div className="rounded-2xl p-5" style={{ background: 'var(--lib-card)', border: '1px solid var(--lib-border)', backdropFilter: 'blur(16px)' }}>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-sm font-semibold text-[var(--color-text)]">
                        With {otherUsername}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">{formatRelativeDate(swap.updatedAt)}</p>
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2.5 py-1 rounded-full">Accepted</span>
            </div>
            <div className="flex items-center gap-3">
                <Link to={`/books/${swap.bookRequestedId}`}
                      className="flex-1 flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-[var(--color-accent)] transition-all"
                      style={{ background: 'var(--lib-stats)' }}>
                    <div className="min-w-0">
                        <p className="text-xs text-[var(--color-text-muted)] mb-0.5">{isOwner ? 'You gave:' : 'You received:'}</p>
                        <p className="text-sm font-semibold text-[var(--color-text)] truncate">{bookRequestedTitle}</p>
                    </div>
                </Link>
                <svg className="w-5 h-5 shrink-0 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <Link to={`/books/${swap.bookOfferedId}`}
                      className="flex-1 flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-[var(--color-accent)] transition-all"
                      style={{ background: 'var(--lib-stats)' }}>
                    <div className="min-w-0">
                        <p className="text-xs text-[var(--color-text-muted)] mb-0.5">{isOwner ? 'You received:' : 'You gave:'}</p>
                        <p className="text-sm font-semibold text-[var(--color-text)] truncate">{bookOfferedTitle}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export function SwapHistoryTab({ swaps, currentUserId }: SwapHistoryTabProps) {
    const completed = swaps.filter((s) => s.status === 'accepted');

    if (completed.length === 0) {
        return (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                </div>
                <h3 className="font-['Playfair_Display'] font-bold text-[var(--color-text)] mb-1">Swap History</h3>
                <p className="text-sm text-[var(--color-text-muted)]">Your accepted swaps will appear here.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {completed.map((swap) => (
                <SwapHistoryCard key={swap.id} swap={swap} currentUserId={currentUserId} />
            ))}
        </div>
    );
}
