import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface BanEntry {
    userId: string;
    duration: string;
    reason: string;
    message: string;
    bannedAt: string;
    expiresAt: string | null; // null = permanent
}

interface BanContextType {
    bans: BanEntry[];
    banUser: (userId: string, duration: string, reason: string, message: string) => void;
    unbanUser: (userId: string) => void;
    isUserBanned: (userId: string) => boolean;
    getBan: (userId: string) => BanEntry | null;
}

const STORAGE_KEY = 'app_bans';
const BanContext = createContext<BanContextType | null>(null);

function calcExpiresAt(duration: string): string | null {
    if (duration === 'permanent') return null;
    const now = new Date();
    const days = parseInt(duration); // '1d' -> 1, '7d' -> 7 etc.
    now.setDate(now.getDate() + days);
    return now.toISOString();
}

export function BanProvider({ children }: { children: ReactNode }) {
    const [bans, setBans] = useState<BanEntry[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch { return []; }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bans));
    }, [bans]);

    // Auto-expire bans
    useEffect(() => {
        const now = new Date().toISOString();
        setBans(prev => prev.filter(b => b.expiresAt === null || b.expiresAt > now));
    }, []);

    function banUser(userId: string, duration: string, reason: string, message: string) {
        const entry: BanEntry = {
            userId,
            duration,
            reason,
            message,
            bannedAt: new Date().toISOString(),
            expiresAt: calcExpiresAt(duration),
        };
        setBans(prev => [...prev.filter(b => b.userId !== userId), entry]);
    }

    function unbanUser(userId: string) {
        setBans(prev => prev.filter(b => b.userId !== userId));
    }

    function isUserBanned(userId: string): boolean {
        const ban = bans.find(b => b.userId === userId);
        if (!ban) return false;
        if (ban.expiresAt === null) return true;
        return ban.expiresAt > new Date().toISOString();
    }

    function getBan(userId: string): BanEntry | null {
        const ban = bans.find(b => b.userId === userId);
        if (!ban) return null;
        if (ban.expiresAt !== null && ban.expiresAt <= new Date().toISOString()) return null;
        return ban;
    }

    return (
        <BanContext.Provider value={{ bans, banUser, unbanUser, isUserBanned, getBan }}>
            {children}
        </BanContext.Provider>
    );
}

export function useBan() {
    const ctx = useContext(BanContext);
    if (!ctx) throw new Error('useBan must be used inside BanProvider');
    return ctx;
}