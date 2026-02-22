import type { AdminUser } from '@/types/admin';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface AdminUsersTableProps {
    users: AdminUser[];
    onBan: (id: string) => void;
    onUnban: (id: string) => void;
    onDelete: (id: string) => void;
}

export function AdminUsersTable({ users, onBan, onUnban, onDelete }: AdminUsersTableProps) {
    return (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-[var(--color-surface-alt)]">
                <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">User</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Role</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Books</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Swaps</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">Status</th>
                    <th className="px-4 py-3"></th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]/50 transition-colors">
                        <td className="px-4 py-3">
                            <div>
                                <p className="font-medium text-[var(--color-text)]">{user.name}</p>
                                <p className="text-xs text-[var(--color-text-muted)]">@{user.username} · {user.email}</p>
                            </div>
                        </td>
                        <td className="px-4 py-3">
                            <Badge variant={user.role === 'admin' ? 'accent' : 'default'}>{user.role}</Badge>
                        </td>
                        <td className="px-4 py-3 text-[var(--color-text)]">{user.booksCount}</td>
                        <td className="px-4 py-3 text-[var(--color-text)]">{user.swapsCompleted}</td>
                        <td className="px-4 py-3">
                            <Badge variant={user.isBanned ? 'danger' : 'success'}>
                                {user.isBanned ? 'Banned' : 'Active'}
                            </Badge>
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                                {user.isBanned ? (
                                    <Button size="sm" variant="secondary" onClick={() => onUnban(user.id)}>Unban</Button>
                                ) : (
                                    <Button size="sm" variant="ghost" onClick={() => onBan(user.id)}>Ban</Button>
                                )}
                                <Button size="sm" variant="danger" onClick={() => onDelete(user.id)}>Delete</Button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {users.length === 0 && (
                <p className="text-center py-10 text-[var(--color-text-muted)]">No users found.</p>
            )}
        </div>
    );
}