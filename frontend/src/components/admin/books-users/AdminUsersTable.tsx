import { useState } from 'react';
import type { AdminUser } from '@/types/admin';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { ConfirmDeleteUserModal } from './ConfirmDeleteUserModal';
import { BanUserModal } from './BanUserModal';

interface Props {
    users: AdminUser[];
    onBan: (id: string, duration: string, reason: string, message: string) => void;
    onUnban: (id: string) => void;
    onDelete: (id: string) => void;
}

export function AdminUsersTable({ users, onBan, onUnban, onDelete }: Props) {
    const { user: currentUser } = useAuth();
    const { t } = useLanguage();

    const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
    const [banTarget, setBanTarget] = useState<AdminUser | null>(null);

    return (
        <>
            <ConfirmDeleteUserModal
                isOpen={!!deleteTarget}
                userName={deleteTarget?.name ?? ''}
                onConfirm={() => deleteTarget && onDelete(deleteTarget.id)}
                onClose={() => setDeleteTarget(null)}
            />
            <BanUserModal
                isOpen={!!banTarget}
                userName={banTarget?.name ?? ''}
                onConfirm={(duration, reason, message) => banTarget && onBan(banTarget.id, duration, reason, message)}
                onClose={() => setBanTarget(null)}
            />

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
                <table className="w-full text-sm table-fixed">
                    <thead className="bg-[var(--color-surface-alt)]"><tr>
                        <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide w-[28%]">User</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide w-[8%]">Role</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide w-[8%]">Books</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide w-[8%]">Swaps</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide w-[10%]">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide w-[8%]">Ban</th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide w-[8%]">{t.admin.deleteUser.split(' ')[0]}</th>
                    </tr></thead>
                    <tbody>{users.map((user) => {
                        const isCurrentAdmin = user.id === currentUser?.id;
                        const isAdmin = user.role === 'admin';
                        return (
                            <tr key={user.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]/50 transition-colors">
                                <td className="px-4 py-3"><div><p className="font-medium text-[var(--color-text)]">{user.name}{isCurrentAdmin && <span className="ml-2 text-xs font-normal text-[var(--color-text-muted)]">(you)</span>}</p><p className="text-xs text-[var(--color-text-muted)]">@{user.username} · {user.email}</p></div></td>
                                <td className="px-4 py-3"><Badge variant={isAdmin ? 'accent' : 'default'}>{user.role}</Badge></td>
                                <td className="px-4 py-3 text-[var(--color-text)]">{isAdmin ? '—' : user.booksCount}</td>
                                <td className="px-4 py-3 text-[var(--color-text)]">{isAdmin ? '—' : user.swapsCompleted}</td>
                                <td className="px-4 py-3">{isAdmin ? <span className="text-xs text-[var(--color-text-muted)]">—</span> : <Badge variant={user.isBanned ? 'danger' : 'success'}>{user.isBanned ? 'Banned' : 'Active'}</Badge>}</td>
                                <td className="px-4 py-3">{!isAdmin && (user.isBanned
                                    ? <Button size="sm" variant="secondary" onClick={() => onUnban(user.id)}>Unban</Button>
                                    : <Button size="sm" variant="secondary" onClick={() => setBanTarget(user)}>Ban</Button>
                                )}</td>
                                <td className="px-4 py-3">{!isAdmin && <Button size="sm" variant="danger" onClick={() => setDeleteTarget(user)}>{t.common.delete}</Button>}</td>
                            </tr>
                        );
                    })}</tbody>
                </table>
                {users.length === 0 && <p className="text-center py-10 text-[var(--color-text-muted)]">No users found.</p>}
            </div>
        </>
    );
}