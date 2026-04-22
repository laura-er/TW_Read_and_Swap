import { useState } from 'react';
import { useSwaps } from '@/context/SwapContext';
import { useAuth } from '@/context/AuthContext';
import { SwapStatsBar } from '@/components/client/swaps/SwapStatsBar';
import { SwapTabs } from '@/components/client/swaps/SwapTabs';
import { SwapStatusFilter } from '@/components/client/swaps/SwapStatusFilter';
import { SwapCard } from '@/components/client/swaps/SwapCard';
import { SwapEmptyState } from '@/components/client/swaps/SwapEmptyState';
import type { SwapStatus } from '@/types';

type Tab = 'received' | 'sent' | 'completed';
type FilterStatus = 'all' | SwapStatus;

export function SwapRequestPage() {
    const { user } = useAuth();
    const { incoming, outgoing, updateStatus, removeSwap } = useSwaps();
    const [activeTab, setActiveTab] = useState<Tab>('received');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

    const currentUserId = user?.id ?? '';

    // Received = swap-uri primite care sunt pending sau rejected
    const received = incoming.filter(s =>
        s.status === 'pending' || s.status === 'rejected'
    );

    // Sent = swap-uri trimise care sunt pending, rejected sau cancelled
    const sent = outgoing.filter(s =>
        s.status === 'pending' || s.status === 'rejected' || s.status === 'cancelled'
    );

    // Accepted = swap-uri acceptate
    const accepted = [...incoming, ...outgoing].filter(s => s.status === 'accepted');

    const activeList = activeTab === 'received' ? received
        : activeTab === 'sent' ? sent
            : accepted;

    const filtered = activeTab === 'completed'
        ? accepted
        : activeList.filter(s => filterStatus === 'all' || s.status === filterStatus);

    const handleCancel = async (id: string) => {
        await updateStatus(id, 'cancelled');
    };

    return (
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
            <div className="mb-8">
                <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[var(--color-text)] mb-1">
                    My Swaps
                </h1>
                <p className="text-sm text-[var(--color-text-muted)]">Manage your book swap requests</p>
            </div>

            <SwapStatsBar
                receivedCount={received.length}
                sentCount={sent.length}
                completedCount={accepted.length}
            />
            <SwapTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                receivedCount={received.length}
                sentCount={sent.length}
                completedCount={accepted.length}
            />

            {activeTab !== 'completed' && (
                <SwapStatusFilter active={filterStatus} onChange={setFilterStatus} />
            )}

            <div className="flex flex-col gap-4">
                {filtered.length === 0 ? (
                    <SwapEmptyState tab={activeTab === 'completed' ? 'received' : activeTab} />
                ) : (
                    filtered.map((swap) => (
                        <SwapCard
                            key={swap.id}
                            swap={swap}
                            currentUserId={currentUserId}
                            onAccept={(id) => updateStatus(id, 'accepted')}
                            onDecline={(id) => updateStatus(id, 'rejected')}
                            onCancel={handleCancel}
                        />
                    ))
                )}
            </div>
        </div>
    );
}