import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { SwapRequest, SwapStatus } from '@/types';
import axiosInstance from '@/api/axiosInstance';
import { useAuth } from '@/context/AuthContext';

interface SwapContextValue {
    incoming: SwapRequest[];
    outgoing: SwapRequest[];
    isLoading: boolean;
    updateStatus: (id: string, status: SwapStatus) => Promise<void>;
    removeSwap: (id: string) => Promise<void>;
    refresh: () => void;
}

const SwapContext = createContext<SwapContextValue | null>(null);

export function SwapProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [incoming, setIncoming] = useState<SwapRequest[]>([]);
    const [outgoing, setOutgoing] = useState<SwapRequest[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tick, setTick] = useState(0);

    const refresh = () => setTick(t => t + 1);

    useEffect(() => {
        if (!user) {
            setIncoming([]);
            setOutgoing([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        const userId = Number(user.id);

        const ownerPromise = axiosInstance.get(`/api/swaps/owner/${userId}`)
            .then(res => res.data.map((s: any) => ({ ...s, id: String(s.id) })))
            .catch(() => []);

        const requesterPromise = axiosInstance.get(`/api/swaps/requester/${userId}`)
            .then(res => res.data.map((s: any) => ({ ...s, id: String(s.id) })))
            .catch(() => []);

        Promise.all([ownerPromise, requesterPromise])
            .then(([ownData, reqData]) => {
                setIncoming(ownData);
                setOutgoing(reqData);
            })
            .catch(() => {
                setIncoming([]);
                setOutgoing([]);
            })
            .finally(() => setIsLoading(false));
    }, [user, tick]);

    const updateStatus = async (id: string, status: SwapStatus) => {
        await axiosInstance.put(`/api/swaps/${id}/status`, { status });
        refresh();
    };

    const removeSwap = async (id: string) => {
        await axiosInstance.delete(`/api/swaps/${id}`);
        refresh();
    };

    return (
        <SwapContext.Provider value={{ incoming, outgoing, isLoading, updateStatus, removeSwap, refresh }}>
            {children}
        </SwapContext.Provider>
    );
}

export function useSwaps(): SwapContextValue {
    const ctx = useContext(SwapContext);
    if (!ctx) throw new Error('useSwaps must be used inside SwapProvider');
    return ctx;
}
