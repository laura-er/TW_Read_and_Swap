import { useState } from 'react';
import type { SwapStatus } from '@/types';
import { useSwaps } from '@/context/SwapContext';
import { SwapStatsBar } from '@/components/client/swaps/SwapStatsBar';
import { SwapTabs } from '@/components/client/swaps/SwapTabs';
import { SwapStatusFilter } from '@/components/client/swaps/SwapStatusFilter';
import { SwapCard } from '@/components/client/swaps/SwapCard';
import { SwapEmptyState } from '@/components/client/swaps/SwapEmptyState';

type Tab = 'received' | 'sent';
type FilterStatus = 'all' | SwapStatus;

const CURRENT_USER_ID = 'user1'; // TODO: replace with useAuth

export function SwapRequestPage() {
    const { swaps, updateStatus, removeSwap } = useSwaps();
    const [activeTab, setActiveTab] = useState<Tab>('received');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

    const received = swaps.filter((s) => s.ownerId === CURRENT_USER_ID);
    const sent = swaps.filter((s) => s.requesterId === CURRENT_USER_ID);
    const pendingCount = swaps.filter((s) => s.status === 'pending').length;

    const activeList = activeTab === 'received' ? received : sent;
    const filtered = activeList.filter((s) => filterStatus === 'all' || s.status === filterStatus);

    return (
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
            <div className="mb-8">
                <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[var(--color-text)] mb-1">
                    My Swaps
                </h1>
                <p className="text-sm text-[var(--color-text-muted)]">Manage your book swap requests</p>
            </div>

            <SwapStatsBar receivedCount={received.length} sentCount={sent.length} pendingCount={pendingCount} />
            <SwapTabs activeTab={activeTab} onTabChange={setActiveTab} receivedCount={received.length} sentCount={sent.length} />
            <SwapStatusFilter active={filterStatus} onChange={setFilterStatus} />

            <div className="flex flex-col gap-4">
                {filtered.length === 0 ? (
                    <SwapEmptyState tab={activeTab} />
                ) : (
                    filtered.map((swap) => (
                        <SwapCard
                            key={swap.id}
                            swap={swap}
                            currentUserId={CURRENT_USER_ID}
                            onAccept={(id) => updateStatus(id, 'accepted')}
                            onDecline={(id) => updateStatus(id, 'declined')}
                            onComplete={(id) => updateStatus(id, 'completed')}
                            onCancel={removeSwap}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
