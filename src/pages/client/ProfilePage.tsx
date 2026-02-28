import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSwaps } from '@/context/SwapContext';
import { mockBooks } from '@/data/mockBooks';
import { ProfileBanner } from '@/components/client/profile/ProfileBanner';
import { ProfileStats } from '@/components/client/profile/ProfileStats';
import { ProfileTabs } from '@/components/client/profile/ProfileTabs';
import { FavoritesTab } from '@/components/client/profile/FavoritesTab';
import { ProfileEmptyState } from '@/components/client/profile/ProfileEmptyState';
import { SwapHistoryTab } from '@/components/client/profile/SwapHistoryTab';
import { BookCard } from '@/components/client/BookCard';
import type { ProfileTab } from '@/components/client/profile/ProfileTabs';
import { useFavorites } from '@/context/FavoritesContext';
import type { Book } from '@/types';

const CURRENT_USER_ID = 'user1';

export function ProfilePage() {
    const { user } = useAuth();
    const { swaps } = useSwaps();
    const [searchParams] = useSearchParams();
    const tabParam = searchParams.get('tab');
    const initialTab: ProfileTab = tabParam
        ? ((tabParam.charAt(0).toUpperCase() + tabParam.slice(1)) as ProfileTab)
        : 'Favorites';
    const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);
    const tabsRef = useRef<HTMLDivElement>(null);
    
    const [userBooks, setUserBooks] = useState<Book[]>(
        mockBooks.filter((b) => b.ownerId === (user?.id ?? CURRENT_USER_ID))
    );

    useEffect(() => {
        if (tabParam === 'favorites' && tabsRef.current) {
            setTimeout(() => {
                tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    }, [tabParam]);

    const { favorites: favoriteIds, toggleFavorite } = useFavorites();

    const favorites = useMemo(
        () => mockBooks.filter((b) => favoriteIds.includes(b.id)),
        [favoriteIds]
    );

    const handleDeleteBook = (id: string) => {
        // TODO: apel la backend pentru ștergere
        setUserBooks((prev) => prev.filter((b) => b.id !== id));
    };

    if (!user) return null;

    return (
        <main className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                <ProfileBanner user={user} isOwnProfile={true} />
                <div className="px-6 pb-6">
                    <ProfileStats favoritesCount={favorites.length} swapsCount={swaps.filter((s) => s.status === 'completed').length} booksCount={userBooks.length} />
                </div>
            </div>

            <div className="mb-6" ref={tabsRef}>
                <ProfileTabs active={activeTab} onChange={setActiveTab} userId={user.id} />
            </div>

            {activeTab === 'Favorites' && (
                <div id="favorites-section">
                    <FavoritesTab
                        favorites={favorites}
                        onRemove={(id) => toggleFavorite(id)}
                    />
                </div>
            )}

            {activeTab === 'My Books' && (
                userBooks.length === 0 ? (
                    <ProfileEmptyState
                        icon={<BookOpen className="h-12 w-12" />}
                        title="No books listed yet"
                        description="Books you've listed for swapping will appear here."
                        action={
                            <Link
                                to="/books/add"
                                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                Add your first book
                            </Link>
                        }
                    />
                ) : (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[var(--color-text-muted)]">
                                {userBooks.length} book{userBooks.length !== 1 ? 's' : ''} listed
                            </p>
                            <Link
                                to="/books/add"
                                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                Add Book
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {userBooks.map((book) => (
                                <BookCard key={book.id} book={book} onDelete={handleDeleteBook} showOwnerActions={true} />
                            ))}
                        </div>
                    </div>
                )
            )}

            {activeTab === 'Swap History' && (
                <SwapHistoryTab swaps={swaps} currentUserId={CURRENT_USER_ID} />
            )}
        </main>
    );
}
