import { useState } from 'react';
import { mockBooks } from '@/data/mockBooks';
import { mockAdminUsers } from '@/data/mockAdminData';
import type { Book } from '@/types';
import type { AdminUser } from '@/types/admin';
import { AdminTabs } from '@/components/admin/AdminTabs';
import { AdminSearchBar } from '@/components/admin/books-users/AdminSearchBar';
import { AdminBooksTable } from '@/components/admin/books-users/AdminBooksTable';
import { AdminUsersTable } from '@/components/admin/books-users/AdminUsersTable';

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
    const [activeTab, setActiveTab] = useState<ActiveTab>('books');
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState<Book[]>(mockBooks);
    const [users, setUsers] = useState<AdminUser[]>(mockAdminUsers);

    const filteredBooks = books.filter(
        (b) =>
            b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.author.toLowerCase().includes(search.toLowerCase()),
    );

    const filteredUsers = users.filter(
        (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.username.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()),
    );

    function handleDeleteBook(id: string) {
        setBooks((prev) => prev.filter((b) => b.id !== id));
    }

    function handleDeleteUser(id: string) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    }

    function handleBanUser(id: string) {
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isBanned: true } : u)));
    }

    function handleUnbanUser(id: string) {
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isBanned: false } : u)));
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
        { key: 'books', label: `Books (${books.length})` },
        { key: 'users', label: `Users (${users.length})` },
    ];

    return (
        <main>
            <div className="mb-6">
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)]">
                    Books & Users
                </h1>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    Manage all books and user accounts
                </p>
            </div>

            <AdminTabs
                tabs={tabs}
                active={activeTab}
                onChange={(tab) => { setActiveTab(tab); setSearch(''); }}
            />

            {activeTab === 'books' && (
                <>
                    <AdminSearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Search by title or author…"
                        onExport={handleExportBooks}
                    />
                    <AdminBooksTable books={filteredBooks} onDelete={handleDeleteBook} />
                </>
            )}

            {activeTab === 'users' && (
                <>
                    <AdminSearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Search by name, username or email…"
                        onExport={handleExportUsers}
                    />
                    <AdminUsersTable
                        users={filteredUsers}
                        onBan={handleBanUser}
                        onUnban={handleUnbanUser}
                        onDelete={handleDeleteUser}
                    />
                </>
            )}
        </main>
    );
}