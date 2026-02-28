import { Bell, CheckCheck } from 'lucide-react';
import { useNotifications } from '@/context/NotificationsContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

const typeStyles = {
    warning: { bg: 'bg-yellow-50 border-yellow-200', icon: '⚠️', label: 'Warning', labelColor: 'text-yellow-700' },
    info:    { bg: 'bg-blue-50 border-blue-200',     icon: 'ℹ️', label: 'Info',    labelColor: 'text-blue-700'   },
    ban:     { bg: 'bg-red-50 border-red-200',       icon: '🚫', label: 'Ban',     labelColor: 'text-red-700'    },
};

interface MessagesTabProps {
    userId: string;
}

export function MessagesTab({ userId }: MessagesTabProps) {
    const { notifications, markAsRead, markAllAsRead } = useNotifications();
    const { user } = useAuth();

    // Matching flexibil: user1 == 1, user2 == 2 etc
    const messages = notifications.filter((n) => {
        return n.userId === userId
            || n.userId === user?.id
            || n.userId === userId.replace('user', '')
            || `user${n.userId}` === userId;
    });

    const hasUnread = messages.some((m) => !m.isRead);

    if (messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Bell className="w-12 h-12 text-[var(--color-text-muted)] opacity-30" />
                <p className="text-[var(--color-text-muted)] text-sm">No messages yet</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {hasUnread && (
                <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => markAllAsRead(userId)}>
                        <CheckCheck className="w-4 h-4 mr-1" />
                        Mark all as read
                    </Button>
                </div>
            )}
            {messages.map((msg) => {
                const style = typeStyles[msg.type];
                return (
                    <div
                        key={msg.id}
                        onClick={() => !msg.isRead && markAsRead(msg.id)}
                        className={`relative flex gap-4 p-4 rounded-xl border cursor-pointer transition-opacity ${style.bg} ${msg.isRead ? 'opacity-60' : 'opacity-100'}`}
                    >
                        {!msg.isRead && (
                            <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                        )}
                        <span className="text-2xl">{style.icon}</span>
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold uppercase ${style.labelColor}`}>{style.label}</span>
                                <span className="text-xs text-[var(--color-text-muted)]">
                                    {new Date(msg.createdAt).toLocaleDateString('en-US', {
                                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            <p className="text-sm font-semibold text-[var(--color-text)]">{msg.title}</p>
                            <p className="text-sm text-[var(--color-text-muted)]">{msg.message}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
