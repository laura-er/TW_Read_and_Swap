import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { mockReports } from '@/data/mockAdminData';
import type { ReportedIssue, ReportStatus } from '@/types/admin';

interface ReportsContextType {
    reports: ReportedIssue[];
    addReport: (report: Omit<ReportedIssue, 'id' | 'createdAt' | 'status'>) => void;
    updateStatus: (id: string, status: ReportStatus, note?: string, action?: string) => void;
}

const ReportsContext = createContext<ReportsContextType | null>(null);

export function ReportsProvider({ children }: { children: ReactNode }) {
    const [reports, setReports] = useState<ReportedIssue[]>(mockReports);

    function addReport(report: Omit<ReportedIssue, 'id' | 'createdAt' | 'status'>) {
        const newReport: ReportedIssue = {
            ...report,
            id: `r-${Date.now()}`,
            status: 'open',
            createdAt: new Date().toISOString(),
        };
        setReports((prev) => [newReport, ...prev]);
    }

    function updateStatus(id: string, status: ReportStatus, note?: string, action?: string) {
        setReports((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, status, resolveNote: note, resolveAction: action } : r,
            ),
        );
    }

    return (
        <ReportsContext.Provider value={{ reports, addReport, updateStatus }}>
            {children}
        </ReportsContext.Provider>
    );
}

export function useReports(): ReportsContextType {
    const ctx = useContext(ReportsContext);
    if (!ctx) throw new Error('useReports must be used within ReportsProvider');
    return ctx;
}
