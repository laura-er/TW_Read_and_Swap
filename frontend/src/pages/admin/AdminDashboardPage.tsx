import { mockAdminStats, mockActivityFeed } from '@/data/mockAdminData';
import { DashboardStats } from '@/components/admin/dashboard/DashboardStats';
import { ActivityFeed } from '@/components/admin/dashboard/ActivityFeed';

export function AdminDashboardPage() {
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
            <DashboardStats stats={mockAdminStats} />
            <ActivityFeed items={mockActivityFeed} />
        </main>
    );
}