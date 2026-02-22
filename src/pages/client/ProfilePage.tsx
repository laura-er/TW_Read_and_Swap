import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, Plus } from 'lucide-react';
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
import { BookCard } from '@/components/client/BookCard';
import type { ProfileTab } from '@/components/client/profile/ProfileTabs';

const initialFavorites: Book[] = mockBooks.slice(0, 6);
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

    useEffect(() => {
        if (tabParam === 'favorites' && tabsRef.current) {
            setTimeout(() => {
                tabsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    }, [tabParam]);
    const [favorites, setFavorites] = useState<Book[]>(initialFavorites);

    if (!user) return null;

    const myBooks = mockBooks.filter((b) => b.ownerId === user.id);

    return (
        <main className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                <ProfileBanner user={user} isOwnProfile={true} />
                <div className="px-6 pb-6">
                    <ProfileStats user={user} favoritesCount={favorites.length} />
                </div>
            </div>

            <div className="mb-6" ref={tabsRef}>
                <ProfileTabs active={activeTab} onChange={setActiveTab} />
            </div>

            {activeTab === 'Favorites' && (
                <div id="favorites-section">
                    <FavoritesTab favorites={favorites} onRemove={(id) => setFavorites((p) => p.filter((b) => b.id !== id))} />
                </div>
            )}

            {activeTab === 'My Books' && (
                myBooks.length === 0 ? (
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
                            <p className="text-sm text-[var(--color-text-muted)]">{myBooks.length} book{myBooks.length !== 1 ? 's' : ''} listed</p>
                            <Link
                                to="/books/add"
                                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                Add Book
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {myBooks.map((book) => (
                                <BookCard key={book.id} book={book} />
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
