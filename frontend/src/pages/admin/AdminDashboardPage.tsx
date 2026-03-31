import { useState, useEffect } from 'react';
import { mockActivityFeed } from '@/data/mockAdminData';
import type { AdminStats } from '@/types/admin';
import { DashboardStats } from '@/components/admin/dashboard/DashboardStats';
import { ActivityFeed } from '@/components/admin/dashboard/ActivityFeed';
import axiosInstance from '@/api/axiosInstance';

export function AdminDashboardPage() {
    const [stats, setStats] = useState<AdminStats>({
        totalBooks: 0,
        totalUsers: 0,
        pendingSwaps: 0,
        completedSwaps: 0,
        openReports: 0,
        bannedUsers: 0,
    });

    useEffect(() => {
        // Încarcă totalBooks din API
        axiosInstance.get('/api/books')
            .then((res) => {
                setStats((prev) => ({ ...prev, totalBooks: res.data.length }));
            })
            .catch(() => {});

        // Încarcă totalUsers din API
        axiosInstance.get('/api/users/list')
            .then((res) => {
                setStats((prev) => ({ ...prev, totalUsers: res.data.length }));
            })
            .catch(() => {});
    }, []);

    return (
        <main>
            <div className="mb-6">
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)]">
                    Dashboard
                </h1>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    Overview of platform activity
                </p>
            </div>
            <DashboardStats stats={stats} />
            <ActivityFeed items={mockActivityFeed} />
        </main>
    );
}