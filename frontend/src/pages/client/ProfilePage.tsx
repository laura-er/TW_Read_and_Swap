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
import { MessagesTab } from '@/components/client/profile/MessagesTab';
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
        setUserBooks((prev) => prev.filter((b) => b.id !== id));
    };

    if (!user) return null;

    return (
        <div className="relative -mt-8 -mx-4 sm:-mx-6 min-h-screen">
            {/* Same library bg as homepage */}
            <div
                className="fixed inset-0 -z-20 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&q=85')`,
                    filter: 'blur(4px) brightness(0.82) sepia(0.18)',
                    transform: 'scale(1.06)',
                }}
            />
            <div className="fixed inset-0 -z-10" style={{ background: 'var(--lib-overlay)' }} />

            {/* Centered content column — leaves bg visible on sides */}
            <div className="mx-auto max-w-6xl px-4 py-10">

                {/* Profile banner + stats card */}
                <div className="mb-4 rounded-[24px] overflow-hidden shadow-2xl"
                     style={{ border: '1px solid var(--lib-border)', backdropFilter: 'blur(20px)' }}>
                    <ProfileBanner user={user} isOwnProfile={true} />
                    <div style={{ background: 'var(--lib-card)', padding: '0 20px 20px' }}>
                        <ProfileStats
                            favoritesCount={favorites.length}
                            swapsCount={swaps.filter((s) => s.status === 'completed').length}
                            booksCount={userBooks.length}
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-4 rounded-[20px] overflow-hidden shadow-lg"
                     style={{
                         background: 'var(--lib-card)',
                         border: '1px solid var(--lib-border)',
                         backdropFilter: 'blur(20px)',
                     }}
                     ref={tabsRef}>
                    <ProfileTabs active={activeTab} onChange={setActiveTab} />
                </div>

                {/* Tab content */}
                {activeTab === 'Favorites' && (
                    <div id="favorites-section">
                        <FavoritesTab favorites={favorites} onRemove={(id) => toggleFavorite(id)} />
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
                                    className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add your first book
                                </Link>
                            }
                        />
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between px-1">
                                <p className="text-sm" style={{ color: 'var(--lib-text-muted)' }}>
                                    {userBooks.length} book{userBooks.length !== 1 ? 's' : ''} listed
                                </p>
                                <Link
                                    to="/books/add"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-colors"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Book
                                </Link>
                            </div>
                            <div className="flex flex-col gap-3">
                                {userBooks.map((book) => (
                                    <div key={book.id} style={{
                                        borderRadius: '20px', overflow: 'hidden',
                                        background: 'var(--lib-card)',
                                        border: '1px solid var(--lib-border)',
                                        backdropFilter: 'blur(16px)',
                                        ['--color-surface' as string]: 'var(--lib-card)',
                                        ['--color-surface-alt' as string]: 'var(--lib-stats)',
                                        ['--color-border' as string]: 'var(--lib-border)',
                                        ['--color-text' as string]: 'var(--lib-text)',
                                        ['--color-text-muted' as string]: 'var(--lib-text-muted)',
                                    } as React.CSSProperties}>
                                        <BookCard book={book} onDelete={handleDeleteBook} showOwnerActions={true} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}

                {activeTab === 'Swap History' && (
                    <SwapHistoryTab swaps={swaps} currentUserId={CURRENT_USER_ID} />
                )}

                {activeTab === 'Messages' && <MessagesTab />}
            </div>
        </div>
    );
}