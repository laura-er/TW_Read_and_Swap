import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    createdAt: string;
    isRead: boolean;
    type: 'warning' | 'info' | 'ban';
}

interface NotificationsContextType {
    notifications: Notification[];
    addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: (userId: string) => void;
    getUnreadCount: (userId: string) => number;
    getUserNotifications: (userId: string) => Notification[];
}

const NotificationsContext = createContext<NotificationsContextType | null>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    function addNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) {
        const newNotification: Notification = {
            ...notification,
            id: `notif-${Date.now()}`,
            createdAt: new Date().toISOString(),
            isRead: false,
        };
        setNotifications((prev) => [newNotification, ...prev]);
    }

    function markAsRead(id: string) {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
        );
    }

    function markAllAsRead(userId: string) {
        setNotifications((prev) =>
            prev.map((n) => (n.userId === userId ? { ...n, isRead: true } : n)),
        );
    }

    function getUnreadCount(userId: string) {
        return notifications.filter((n) => n.userId === userId && !n.isRead).length;
    }

    function getUserNotifications(userId: string) {
        return notifications.filter((n) => n.userId === userId);
    }

    return (
        <NotificationsContext.Provider value={{
            notifications,
            addNotification,
            markAsRead,
            markAllAsRead,
            getUnreadCount,
            getUserNotifications,
        }}>
            {children}
        </NotificationsContext.Provider>
    );
}

export function useNotifications() {
    const ctx = useContext(NotificationsContext);
    if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider');
    return ctx;
}

