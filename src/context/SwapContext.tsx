import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { SwapRequestPopulated, SwapStatus } from '@/types';
import { mockSwapRequests } from '@/data/mockSwapRequests';

interface SwapContextValue {
    swaps: SwapRequestPopulated[];
    updateStatus: (id: string, status: SwapStatus) => void;
    removeSwap: (id: string) => void;
}

const SwapContext = createContext<SwapContextValue | null>(null);

export function SwapProvider({ children }: { children: ReactNode }) {
    const [swaps, setSwaps] = useState<SwapRequestPopulated[]>(mockSwapRequests);

    const updateStatus = (id: string, status: SwapStatus) =>
        setSwaps((prev) => prev.map((s) => (s.id === id ? { ...s, status: status === 'accepted' ? 'completed' : status } : s)));

    const removeSwap = (id: string) =>
        setSwaps((prev) => prev.filter((s) => s.id !== id));

    return (
        <SwapContext.Provider value={{ swaps, updateStatus, removeSwap }}>
            {children}
        </SwapContext.Provider>
    );
}

export function useSwaps(): SwapContextValue {
    const ctx = useContext(SwapContext);
    if (!ctx) throw new Error('useSwaps must be used inside SwapProvider');
    return ctx;
}
