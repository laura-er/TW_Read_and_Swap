import { useParams, Link } from 'react-router-dom';
import { Calendar, Flag, BookOpen, ArrowLeft, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { BookCard } from '@/components/client/BookCard';
import { ReportModal } from '@/components/shared/ReportModal';
import axiosInstance from '@/api/axiosInstance';
import type { Book } from '@/types';

export function PublicProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { user: currentUser, isAdmin } = useAuth();
    const { t } = useLanguage();
    const [showReport, setShowReport] = useState(false);
    const [profileUser, setProfileUser] = useState<any>(null);
    const [userBooks, setUserBooks] = useState<Book[]>([]);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!username) return;
        setLoading(true); setNotFound(false); setProfileUser(null); setUserBooks([]);
        axiosInstance.get(`/api/users/by-username/${username}`)
            .then(res => { setProfileUser(res.data); return axiosInstance.get(`/api/books/owner/${res.data.id}`); })
            .then(res => { setUserBooks(res.data.map((b: any) => ({ ...b, id: String(b.id), ownerId: String(b.ownerId), rating: (b.rating != null && b.rating > 0) ? b.rating : undefined, reviewCount: b.reviewCount ?? 0, createdAt: b.createdAt ?? new Date().toISOString() }))); })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [username]);

    if (loading) return <main className="min-h-screen flex items-center justify-center"><div className="text-center"><div className="w-12 h-12 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin mx-auto mb-4" /><p className="text-sm text-[var(--color-text-muted)]">{t.common.loading}</p></div></main>;

    if (notFound || !profileUser) return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-sm px-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}><span className="text-3xl">👤</span></div>
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)] mb-2">User not found</h1>
                <p className="text-sm text-[var(--color-text-muted)] mb-6">This profile doesn't exist or has been removed.</p>
                <Link to="/books" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white transition-all" style={{ background: 'var(--color-accent)' }}><ArrowLeft className="h-4 w-4" />{t.books.backToBooks}</Link>
            </div>
        </main>
    );

    if (currentUser?.username === profileUser?.username) return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="text-4xl mb-4">🪞</p>
                <p className="text-[var(--color-text-muted)] text-sm mb-4">This is your own profile.</p>
                <Link to="/profile" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white" style={{ background: 'var(--color-accent)' }}>Go to your profile →</Link>
            </div>
        </main>
    );

    const initials = `${profileUser.firstName?.[0] ?? ''}${profileUser.lastName?.[0] ?? ''}`.toUpperCase();
    const availableBooks = userBooks.filter(b => b.isAvailable).length;
    const avgRating = userBooks.length > 0 ? (userBooks.reduce((sum, b) => sum + (b.rating ?? 0), 0) / userBooks.length).toFixed(1) : '—';

    return (
        <main className="container mx-auto px-4 py-8 max-w-5xl">
            {showReport && <ReportModal targetId={String(profileUser.id)} targetName={profileUser.username} onClose={() => setShowReport(false)} />}
            <Link to="/books" className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] mb-6 transition-colors"><ArrowLeft className="h-3.5 w-3.5" /> {t.books.backToBooks}</Link>
            <div className="mb-8 rounded-3xl overflow-hidden shadow-sm" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
                <div className="relative h-40 overflow-hidden" style={{ background: 'linear-gradient(135deg, #9a4a1e 0%, #c4724e 50%, #e8a882 100%)' }}>
                    <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-20" style={{ background: 'white' }} />
                    <div className="absolute top-4 right-20 w-16 h-16 rounded-full opacity-10" style={{ background: 'white' }} />
                    <div className="absolute -bottom-4 left-1/3 w-24 h-24 rounded-full opacity-10" style={{ background: 'white' }} />
                    <div className="absolute bottom-4 right-6 text-white/20 text-6xl select-none">📚</div>
                </div>
                <div className="px-6 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div className="flex items-end gap-5">
                            <div className="-mt-14 flex-shrink-0 relative">
                                <div className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-[var(--color-surface)]" style={{ background: 'linear-gradient(135deg, var(--color-accent), #c4724e)' }}>
                                    <span className="font-['Playfair_Display'] text-3xl font-bold text-white">{initials}</span>
                                </div>
                            </div>
                            <div className="pb-1">
                                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)]">{profileUser.firstName} {profileUser.lastName}</h1>
                                <p className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>@{profileUser.username}</p>
                                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Joined {new Date(profileUser.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                        {!isAdmin && (
                            <button onClick={() => setShowReport(true)} className="self-start sm:self-auto flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-colors" style={{ borderColor: 'rgba(239,68,68,0.3)', color: '#ef4444' }} onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.05)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                                <Flag className="h-3.5 w-3.5" /> Report User
                            </button>
                        )}
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                        {[
                            { icon: <BookOpen className="h-4 w-4" />, value: userBooks.length, label: t.profile.booksListed },
                            { icon: <span className="text-sm">✅</span>, value: availableBooks, label: t.books.available },
                            { icon: <Star className="h-4 w-4" />, value: avgRating, label: 'Avg Rating' },
                        ].map(({ icon, value, label }) => (
                            <div key={label} className="rounded-2xl p-3 flex flex-col items-center gap-1 text-center" style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}>
                                <div style={{ color: 'var(--color-accent)' }}>{icon}</div>
                                <p className="font-['Playfair_Display'] text-xl font-bold text-[var(--color-text)]">{value}</p>
                                <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="font-['Playfair_Display'] text-xl font-bold text-[var(--color-text)]">Books by <span style={{ color: 'var(--color-accent)' }}>@{profileUser.username}</span></h2>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{userBooks.length === 0 ? 'No books listed yet' : `${userBooks.length} book${userBooks.length !== 1 ? 's' : ''} available for swapping`}</p>
                </div>
                {userBooks.length > 0 && <span className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>{availableBooks} {t.books.available.toLowerCase()}</span>}
            </div>
            {userBooks.length === 0 ? (
                <div className="rounded-3xl p-16 text-center" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-surface-alt)' }}><BookOpen className="h-8 w-8 text-[var(--color-text-muted)]" /></div>
                    <p className="font-['Playfair_Display'] text-lg font-bold text-[var(--color-text)] mb-1">No books yet</p>
                    <p className="text-sm text-[var(--color-text-muted)]">This user hasn't listed any books for swapping.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{userBooks.map((book) => <BookCard key={book.id} book={book} />)}</div>
            )}
        </main>
    );
}