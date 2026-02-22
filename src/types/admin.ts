export interface AdminStats {
    totalBooks: number;
    totalUsers: number;
    pendingSwaps: number;
    completedSwaps: number;
    openReports: number;
    bannedUsers: number;
}

export interface ActivityItem {
    id: string;
    type: 'book_added' | 'swap_completed' | 'user_joined' | 'report_filed' | 'user_banned';
    description: string;
    user: string;
    timestamp: string;
}

export type ReportType = 'book' | 'user';
export type ReportStatus = 'open' | 'resolved' | 'dismissed';

export interface ReportedIssue {
    id: string;
    type: ReportType;
    status: ReportStatus;
    reason: string;
    reportedBy: string;
    targetId: string;
    targetName: string;
    createdAt: string;
}

export interface AdminUser {
    id: string;
    name: string;
    username: string;
    email: string;
    avatarUrl: string;
    role: 'user' | 'admin';
    joinedAt: string;
    booksCount: number;
    swapsCompleted: number;
    isBanned: boolean;
}