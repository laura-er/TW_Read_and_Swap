import { useState, useEffect } from 'react';
import type { AdminStats, ActivityItem } from '@/types/admin';
import { DashboardStats } from '@/components/admin/dashboard/DashboardStats';
import { ActivityFeed } from '@/components/admin/dashboard/ActivityFeed';
import { useLanguage } from '@/context/LanguageContext';
import axiosInstance from '@/api/axiosInstance';

export function AdminDashboardPage() {
    const { t } = useLanguage();
    const [stats, setStats] = useState<AdminStats>({ totalBooks: 0, totalUsers: 0, pendingSwaps: 0, completedSwaps: 0, openReports: 0, bannedUsers: 0 });
    const [activities, setActivities] = useState<ActivityItem[]>([]);

    useEffect(() => {
        axiosInstance.get('/api/books').then(res => setStats(p => ({ ...p, totalBooks: res.data.length }))).catch(() => {});
        axiosInstance.get('/api/users/list').then(res => setStats(p => ({ ...p, totalUsers: res.data.length }))).catch(() => {});
        axiosInstance.get('/api/admin/activity?limit=20')
            .then(res => setActivities(res.data))
            .catch(() => {});
    }, []);

    return (
        <main>
            <div className="mb-6">
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)]">{t.admin.dashboard}</h1>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">{t.admin.overviewActivity}</p>
            </div>
            <DashboardStats stats={stats} />
            <ActivityFeed items={activities} />
        </main>
    );
}
