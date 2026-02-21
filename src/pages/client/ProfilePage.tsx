import { useState } from 'react';
import { BookOpen, ArrowLeftRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockBooks } from '@/data/mockBooks';
import type { Book } from '@/types';
import { ProfileBanner } from '@/components/client/profile/ProfileBanner';
import { ProfileStats } from '@/components/client/profile/ProfileStats';
import { ProfileTabs } from '@/components/client/profile/ProfileTabs';
import { FavoritesTab } from '@/components/client/profile/FavoritesTab';
import { ProfileEmptyState } from '@/components/client/profile/ProfileEmptyState';
import type { ProfileTab } from '@/components/client/profile/ProfileTabs';

// Mock: primele 6 carti ca favorite
const initialFavorites: Book[] = mockBooks.slice(0, 6);

export function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ProfileTab>('Favorites');
  const [favorites, setFavorites] = useState<Book[]>(initialFavorites);

  if (!user) return null;

  const handleRemoveFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((b) => b.id !== id));
  };

  return (
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Banner + Stats */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <ProfileBanner user={user} isOwnProfile={true} />
          <div className="px-6 pb-6">
            <ProfileStats user={user} favoritesCount={favorites.length} />
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <ProfileTabs active={activeTab} onChange={setActiveTab} />
        </div>

        {/* Tab Content */}
        {activeTab === 'Favorites' && (
            <FavoritesTab favorites={favorites} onRemove={handleRemoveFavorite} />
        )}

        {activeTab === 'My Books' && (
            <ProfileEmptyState
                icon={<BookOpen className="h-12 w-12" />}
                title="My Books"
                description="Books you've listed for swapping will appear here."
            />
        )}

        {activeTab === 'Swap History' && (
            <ProfileEmptyState
                icon={<ArrowLeftRight className="h-12 w-12" />}
                title="Swap History"
                description="Your completed swaps will appear here."
            />
        )}
      </main>
  );
}

