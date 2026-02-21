import { BookOpen, ArrowLeftRight, Heart } from 'lucide-react';
import type { User } from '@/types';

interface ProfileStatsProps {
    user: User;
    favoritesCount: number;
}

export function ProfileStats({ user, favoritesCount }: ProfileStatsProps) {
    return (
        <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-[var(--color-surface-alt)] p-4 text-center">
                <div className="flex items-center justify-center text-[var(--color-accent)]">
                    <BookOpen className="h-5 w-5" />
                </div>
                <p className="mt-1 text-2xl font-bold text-[var(--color-text)]">{user.booksCount ?? 0}</p>
                <p className="text-xs text-[var(--color-text-muted)]">Books Listed</p>
            </div>
            <div className="rounded-xl bg-[var(--color-surface-alt)] p-4 text-center">
                <div className="flex items-center justify-center text-[var(--color-accent)]">
                    <ArrowLeftRight className="h-5 w-5" />
                </div>
                <p className="mt-1 text-2xl font-bold text-[var(--color-text)]">{user.swapsCompleted ?? 0}</p>
                <p className="text-xs text-[var(--color-text-muted)]">Swaps Done</p>
            </div>
            <div className="rounded-xl bg-[var(--color-surface-alt)] p-4 text-center">
                <div className="flex items-center justify-center text-red-500">
                    <Heart className="h-5 w-5" />
                </div>
                <p className="mt-1 text-2xl font-bold text-[var(--color-text)]">{favoritesCount}</p>
                <p className="text-xs text-[var(--color-text-muted)]">Favorites</p>
            </div>
        </div>
    );
}
