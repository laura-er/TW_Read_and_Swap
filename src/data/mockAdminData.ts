import type { AdminStats, ActivityItem, ReportedIssue, AdminUser } from '@/types/admin';

export const mockAdminStats: AdminStats = {
    totalBooks: 48,
    totalUsers: 134,
    pendingSwaps: 12,
    completedSwaps: 87,
    openReports: 5,
    bannedUsers: 3,
};

export const mockActivityFeed: ActivityItem[] = [
    { id: 'a1', type: 'book_added', description: 'Added "The Midnight Library"', user: 'alice_reads', timestamp: '2025-02-22T10:14:00Z' },
    { id: 'a2', type: 'swap_completed', description: 'Swap completed for "Dune"', user: 'bob_pages', timestamp: '2025-02-22T09:45:00Z' },
    { id: 'a3', type: 'user_joined', description: 'New user registered', user: 'carol_books', timestamp: '2025-02-22T08:30:00Z' },
    { id: 'a4', type: 'report_filed', description: 'Book reported as damaged', user: 'dan_reader', timestamp: '2025-02-21T22:10:00Z' },
    { id: 'a5', type: 'book_added', description: 'Added "Atomic Habits"', user: 'eva_lit', timestamp: '2025-02-21T20:05:00Z' },
    { id: 'a6', type: 'user_banned', description: 'User banned for spam', user: 'admin', timestamp: '2025-02-21T18:00:00Z' },
    { id: 'a7', type: 'swap_completed', description: 'Swap completed for "1984"', user: 'frank_reads', timestamp: '2025-02-21T15:30:00Z' },
    { id: 'a8', type: 'report_filed', description: 'User reported for harassment', user: 'grace_b', timestamp: '2025-02-21T12:00:00Z' },
];

// targetId pentru reports de tip 'user' e 'user1' — userul logat in demo
export const mockReports: ReportedIssue[] = [
    { id: 'r1', type: 'book', status: 'open', reason: 'Book condition is much worse than described', reportedBy: 'alice_reads', targetId: '3', targetName: 'To Kill a Mockingbird', createdAt: '2025-02-21T22:10:00Z' },
    { id: 'r2', type: 'user', status: 'open', reason: 'Sending unsolicited messages', reportedBy: 'carol_books', targetId: 'user1', targetName: 'user (alice_reads)', createdAt: '2025-02-21T12:00:00Z' },
    { id: 'r3', type: 'book', status: 'resolved', reason: 'Spam listing — duplicate book', reportedBy: 'bob_pages', targetId: '7', targetName: 'The Alchemist', createdAt: '2025-02-20T09:00:00Z' },
    { id: 'r4', type: 'user', status: 'open', reason: 'Did not complete agreed swap', reportedBy: 'eva_lit', targetId: 'user1', targetName: 'user (alice_reads)', createdAt: '2025-02-19T14:20:00Z' },
    { id: 'r5', type: 'book', status: 'open', reason: 'Inappropriate cover image', reportedBy: 'grace_b', targetId: '12', targetName: 'Mystery Novel', createdAt: '2025-02-18T11:30:00Z' },
];

export const mockAdminUsers: AdminUser[] = [
    { id: 'user1', name: 'Alice Johnson', username: 'alice_reads', email: 'alice@example.com', avatarUrl: '', role: 'user', joinedAt: '2024-01-15', booksCount: 8, swapsCompleted: 14, isBanned: false },
    { id: 'user2', name: 'Bob Martinez', username: 'bob_pages', email: 'bob@example.com', avatarUrl: '', role: 'user', joinedAt: '2024-02-20', booksCount: 5, swapsCompleted: 9, isBanned: false },
    { id: 'user3', name: 'Carol Smith', username: 'carol_books', email: 'carol@example.com', avatarUrl: '', role: 'user', joinedAt: '2024-03-10', booksCount: 12, swapsCompleted: 22, isBanned: false },
    { id: 'user4', name: 'Dan Reader', username: 'dan_reader', email: 'dan@example.com', avatarUrl: '', role: 'user', joinedAt: '2024-04-05', booksCount: 3, swapsCompleted: 2, isBanned: false },
    { id: 'user5', name: 'Eva Literatura', username: 'eva_lit', email: 'eva@example.com', avatarUrl: '', role: 'user', joinedAt: '2024-05-01', booksCount: 7, swapsCompleted: 11, isBanned: false },
    { id: 'user6', name: 'Frank Reader', username: 'frank_reads', email: 'frank@example.com', avatarUrl: '', role: 'user', joinedAt: '2024-06-18', booksCount: 2, swapsCompleted: 1, isBanned: true },
    { id: 'user7', name: 'Grace Books', username: 'grace_b', email: 'grace@example.com', avatarUrl: '', role: 'admin', joinedAt: '2024-01-01', booksCount: 0, swapsCompleted: 0, isBanned: false },
];
