import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import type { Book } from '@/types';
import type { AdminUser } from '@/types/admin';
import { AdminTabs } from '@/components/admin/AdminTabs';
import { AdminSearchBar } from '@/components/admin/books-users/AdminSearchBar';
import { AdminBooksTable } from '@/components/admin/books-users/AdminBooksTable';
import { AdminUsersTable } from '@/components/admin/books-users/AdminUsersTable';
import { useLanguage } from '@/context/LanguageContext';
import { useNotifications } from '@/context/NotificationsContext';
import { useBan } from '@/context/BanContext';

type ActiveTab = 'books' | 'users';

function exportToCsv(filename: string, rows: string[][]): void {
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

export function AdminBooksUsersPage() {
    const [searchParams] = useSearchParams();
    const { t } = useLanguage();
    const { addNotification } = useNotifications();
    const { banUser, unbanUser, isUserBanned } = useBan();

    const DURATION_LABELS: Record<string, string> = {
        '1d': t.admin.dur1d,
        '3d': t.admin.dur3d,
        '7d': t.admin.dur7d,
        '30d': t.admin.dur30d,
        'permanent': t.admin.durPermanent,
    };

    const [activeTab, setActiveTab] = useState<ActiveTab>(
        searchParams.get('tab') === 'users' ? 'users' : 'books'
    );

    useEffect(() => {
        setActiveTab(searchParams.get('tab') === 'users' ? 'users' : 'books');
    }, [searchParams]);

    const [search, setSearch] = useState('');
    const [books, setBooks] = useState<Book[]>([]);
    const [users, setUsers] = useState<AdminUser[]>([]);

    useEffect(() => {
        axiosInstance.get('/api/books')
            .then((res) => {
                setBooks(res.data.map((b: any) => ({
                    ...b,
                    id: String(b.id),
                    ownerId: String(b.ownerId),
                    rating: b.rating ?? 0,
                    reviewCount: b.reviewCount ?? 0,
                    createdAt: b.createdAt ?? new Date().toISOString(),
                })));
            })
            .catch(() => console.error('Failed to load books'));
    }, []);

    useEffect(() => {
        axiosInstance.get('/api/users/list')
            .then((res) => {
                setUsers(res.data.map((u: any) => ({
                    id: String(u.id),
                    name: u.firstName || u.username,
                    username: u.username,
                    email: u.email,
                    avatarUrl: '',
                    role: u.role === 'admin' ? 'admin' : 'user',
                    joinedAt: u.createdAt ?? new Date().toISOString(),
                    booksCount: 0,
                    swapsCompleted: 0,
                    isBanned: isUserBanned(String(u.id)),
                })));
            })
            .catch(() => console.error('Failed to load users'));
    }, []);

    const filteredBooks = books.filter(
        (b) =>
            b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.author.toLowerCase().includes(search.toLowerCase()),
    );

    const filteredUsers = users.map(u => ({ ...u, isBanned: isUserBanned(u.id) })).filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.username.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()),
    );

    function handleDeleteBook(id: string, ownerId: string, bookTitle: string, ownerName: string, reason: string) {
        axiosInstance.delete(`/api/books/${id}`)
            .then(() => {
                setBooks((prev) => prev.filter((b) => b.id !== id));
                addNotification({
                    userId: ownerId,
                    type: 'warning',
                    title: t.admin.notifBookDeleted.replace('{title}', bookTitle),
                    message: t.admin.notifBookDeletedMsg.replace('{reason}', reason),
                });
            })
            .catch(() => console.error('Failed to delete book'));
    }

    function handleDeleteUser(id: string) {
        axiosInstance.delete(`/api/users/${id}`)
            .then(() => setUsers((prev) => prev.filter((u) => u.id !== id)))
            .catch(() => console.error('Failed to delete user'));
    }

    function handleBanUser(id: string, duration: string, reason: string, customMessage: string) {
        banUser(id, duration, reason, customMessage);
        setUsers(prev => prev.map(u => u.id === id ? { ...u, isBanned: true } : u));
        const durationLabel = DURATION_LABELS[duration] ?? duration;
        const notifMessage = customMessage.trim()
            ? `${t.admin.notifBannedMsg.replace('{reason}', reason)} ${customMessage.trim()}`
            : t.admin.notifBannedMsg.replace('{reason}', reason);
        addNotification({
            userId: id,
            type: 'ban',
            title: t.admin.notifBanned.replace('{duration}', durationLabel),
            message: notifMessage,
        });
    }

    function handleUnbanUser(id: string) {
        unbanUser(id);
        setUsers(prev => prev.map(u => u.id === id ? { ...u, isBanned: false } : u));
        addNotification({
            userId: id,
            type: 'info',
            title: t.admin.notifUnbanned,
            message: t.admin.notifUnbannedMsg,
        });
    }

    function handleExportBooks() {
        const rows = [
            ['ID', 'Title', 'Author', 'Genre', 'Condition', 'Available'],
            ...filteredBooks.map((b) => [b.id, b.title, b.author, b.genre, b.condition, String(b.isAvailable)]),
        ];
        exportToCsv('books.csv', rows);
    }

    function handleExportUsers() {
        const rows = [
            ['ID', 'Name', 'Username', 'Email', 'Role', 'Books', 'Swaps', 'Banned'],
            ...filteredUsers.map((u) => [u.id, u.name, u.username, u.email, u.role, String(u.booksCount), String(u.swapsCompleted), String(u.isBanned)]),
        ];
        exportToCsv('users.csv', rows);
    }

    const tabs: { key: ActiveTab; label: string }[] = [
        { key: 'books', label: `${t.admin.books} (${books.length})` },
        { key: 'users', label: `${t.admin.users} (${users.length})` },
    ];

    return (
        <main>
            <div className="mb-6">
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)]">
                    {t.admin.booksAndUsers}
                </h1>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    {t.admin.manageAllBooks}
                </p>
            </div>

            <AdminTabs tabs={tabs} active={activeTab} onChange={(tab) => { setActiveTab(tab); setSearch(''); }} />

            {activeTab === 'books' && (
                <>
                    <AdminSearchBar value={search} onChange={setSearch} placeholder={t.admin.searchByTitle} onExport={handleExportBooks} exportLabel={t.admin.exportCSV} />
                    <AdminBooksTable books={filteredBooks} users={users} onDelete={handleDeleteBook} />
                </>
            )}

            {activeTab === 'users' && (
                <>
                    <AdminSearchBar value={search} onChange={setSearch} placeholder={t.admin.searchByUser} onExport={handleExportUsers} exportLabel={t.admin.exportCSV} />
                    <AdminUsersTable users={filteredUsers} onBan={handleBanUser} onUnban={handleUnbanUser} onDelete={handleDeleteUser} />
                </>
            )}
        </main>
    );
}
