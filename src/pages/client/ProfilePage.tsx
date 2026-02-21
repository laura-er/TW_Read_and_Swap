import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSwaps } from '@/context/SwapContext';
import { mockBooks } from '@/data/mockBooks';
import type { Book } from '@/types';
import { ProfileBanner } from '@/components/client/profile/ProfileBanner';
import { ProfileStats } from '@/components/client/profile/ProfileStats';
import { ProfileTabs } from '@/components/client/profile/ProfileTabs';
import { FavoritesTab } from '@/components/client/profile/FavoritesTab';
import { ProfileEmptyState } from '@/components/client/profile/ProfileEmptyState';
import { SwapHistoryTab } from '@/components/client/profile/SwapHistoryTab';
import type { ProfileTab } from '@/components/client/profile/ProfileTabs';

const initialFavorites: Book[] = mockBooks.slice(0, 6);
const CURRENT_USER_ID = 'user1'; // TODO: replace with useAuth

export function ProfilePage() {
    const { user } = useAuth();
    const { swaps } = useSwaps();
    const [activeTab, setActiveTab] = useState<ProfileTab>('Favorites');
    const [favorites, setFavorites] = useState<Book[]>(initialFavorites);

    if (!user) return null;

    return (
        <main className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                <ProfileBanner user={user} isOwnProfile={true} />
                <div className="px-6 pb-6">
                    <ProfileStats user={user} favoritesCount={favorites.length} />
                </div>
            </div>

            <div className="mb-6">
                <ProfileTabs active={activeTab} onChange={setActiveTab} />
            </div>

            {activeTab === 'Favorites' && (
                <FavoritesTab favorites={favorites} onRemove={(id) => setFavorites((p) => p.filter((b) => b.id !== id))} />
            )}

            {activeTab === 'My Books' && (
                <ProfileEmptyState
                    icon={<BookOpen className="h-12 w-12" />}
                    title="My Books"
                    description="Books you've listed for swapping will appear here."
                />
            )}

            {activeTab === 'Swap History' && (
                <SwapHistoryTab swaps={swaps} currentUserId={CURRENT_USER_ID} />
            )}
        </main>
    );
}
