import { Link } from 'react-router-dom';
import type { SwapRequestPopulated } from '@/types';
import { formatRelativeDate } from '@/utils/formatDate';
import { Avatar } from '@/components/ui/Avatar';

interface SwapHistoryTabProps {
    swaps: SwapRequestPopulated[];
    currentUserId: string;
}

export function SwapHistoryTab({ swaps, currentUserId }: SwapHistoryTabProps) {
    const completed = swaps.filter((s) => s.status === 'completed');

    if (completed.length === 0) {
        return (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                </div>
                <h3 className="font-['Playfair_Display'] font-bold text-[var(--color-text)] mb-1">Swap History</h3>
                <p className="text-sm text-[var(--color-text-muted)]">Your completed swaps will appear here.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {completed.map((swap) => {
                const isOwner = swap.ownerId === currentUserId;
                const otherUser = isOwner ? swap.requester : swap.owner;

                return (
                    <div key={swap.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Avatar src={otherUser.avatarUrl} name={otherUser.name} size="sm" />
                                <div>
                                    <p className="text-sm font-semibold text-[var(--color-text)]">{otherUser.name}</p>
                                    <p className="text-xs text-[var(--color-text-muted)]">{formatRelativeDate(swap.updatedAt)}</p>
                                </div>
                            </div>
                            <span className="text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/30 px-2.5 py-1 rounded-full">
                Completed
              </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link to={`/books/${swap.bookRequested.id}`} className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-alt)] hover:border-[var(--color-accent)] border border-transparent transition-all">
                                <img src={swap.bookRequested.coverUrl} alt={swap.bookRequested.title} className="w-9 h-12 object-cover rounded-lg" />
                                <div className="min-w-0">
                                    <p className="text-xs text-[var(--color-text-muted)] mb-0.5">{isOwner ? 'You gave:' : 'You received:'}</p>
                                    <p className="text-sm font-semibold text-[var(--color-text)] truncate">{swap.bookRequested.title}</p>
                                    <p className="text-xs text-[var(--color-text-muted)] truncate">{swap.bookRequested.author}</p>
                                </div>
                            </Link>

                            <svg className="w-5 h-5 shrink-0 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>

                            <Link to={`/books/${swap.bookOffered.id}`} className="flex-1 flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-alt)] hover:border-[var(--color-accent)] border border-transparent transition-all">
                                <img src={swap.bookOffered.coverUrl} alt={swap.bookOffered.title} className="w-9 h-12 object-cover rounded-lg" />
                                <div className="min-w-0">
                                    <p className="text-xs text-[var(--color-text-muted)] mb-0.5">{isOwner ? 'You received:' : 'You gave:'}</p>
                                    <p className="text-sm font-semibold text-[var(--color-text)] truncate">{swap.bookOffered.title}</p>
                                    <p className="text-xs text-[var(--color-text-muted)] truncate">{swap.bookOffered.author}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
