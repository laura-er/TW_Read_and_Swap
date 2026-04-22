import { useParams, Link } from 'react-router-dom';
import { Calendar, Flag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '@/components/ui/Avatar';
import { BookCard } from '@/components/client/BookCard';
import { ReportModal } from '@/components/shared/ReportModal';
import axiosInstance from '@/api/axiosInstance';
import type { Book } from '@/types';

export function PublicProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { user: currentUser } = useAuth();
    const [showReport, setShowReport] = useState(false);
    const [profileUser, setProfileUser] = useState<any>(null);
    const [userBooks, setUserBooks] = useState<Book[]>([]);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!username) return;
        setLoading(true);
        axiosInstance.get(`/api/users/by-username/${username}`)
            .then(res => {
                setProfileUser(res.data);
                return axiosInstance.get(`/api/books/owner/${res.data.id}`);
            })
            .then(res => {
                setUserBooks(res.data.map((b: any) => ({
                    ...b,
                    id: String(b.id),
                    ownerId: String(b.ownerId),
                    rating: b.rating ?? 0,
                    reviewCount: b.reviewCount ?? 0,
                    createdAt: b.createdAt ?? new Date().toISOString(),
                })));
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [username]);

    if (loading) return (
        <main className="container mx-auto px-4 py-16 max-w-4xl text-center">
            <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>
        </main>
    );

    if (notFound || !profileUser) return (
        <main className="container mx-auto px-4 py-16 max-w-4xl text-center">
            <p className="text-5xl mb-4">👤</p>
            <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">User not found</h1>
            <Link to="/books" className="text-sm text-[var(--color-accent)] hover:underline">Back to Books</Link>
        </main>
    );

    if (currentUser?.username === profileUser?.username) return (
        <main className="container mx-auto px-4 py-16 max-w-4xl text-center">
            <p className="text-[var(--color-text-muted)] text-sm">
                This is your profile.{' '}
                <Link to="/profile" className="text-[var(--color-accent)] hover:underline">Go to your profile</Link>
            </p>
        </main>
    );

    return (
        <main className="container mx-auto px-4 py-8 max-w-4xl">
            {showReport && (
                <ReportModal
                    targetId={String(profileUser.id)}
                    targetName={profileUser.username}
                    type="user"
                    onClose={() => setShowReport(false)}
                />
            )}
            <div className="mb-6 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                <div className="h-24 bg-gradient-to-r from-[var(--color-accent)]/80 to-[var(--color-accent)]/30" />
                <div className="px-6 pb-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-end gap-4">
                            <div className="-mt-10 flex-shrink-0 ring-4 ring-[var(--color-surface)] rounded-full">
                                <Avatar src="" name={`${profileUser.firstName} ${profileUser.lastName}`} size="xl" />
                            </div>
                            <div className="pb-1">
                                <h1 className="text-xl font-bold text-[var(--color-text)]">
                                    {profileUser.firstName} {profileUser.lastName}
                                </h1>
                                <p className="text-sm text-[var(--color-text-muted)]">@{profileUser.username}</p>
                                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Joined {new Date(profileUser.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <span>{userBooks.length} books</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowReport(true)}
                            className="flex items-center gap-2 self-end pb-1 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                        >
                            <Flag className="h-4 w-4" /> Report User
                        </button>
                    </div>
                </div>
            </div>
            <h2 className="text-lg font-bold text-[var(--color-text)] mb-4">Books by @{profileUser.username}</h2>
            {userBooks.length === 0 ? (
                <p className="text-sm text-[var(--color-text-muted)]">No books listed yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {userBooks.map((book) => <BookCard key={book.id} book={book} />)}
                </div>
            )}
        </main>
    );
}