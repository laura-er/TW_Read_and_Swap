import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axiosInstance from '@/api/axiosInstance';
import type { ReportedIssue, ReportStatus } from '@/types/admin';

interface ReportsContextType {
    reports: ReportedIssue[];
    isLoading: boolean;
    addReport: (report: Omit<ReportedIssue, 'id' | 'createdAt' | 'status'>) => Promise<void>;
    updateStatus: (id: string, status: ReportStatus, note?: string, action?: string) => Promise<void>;
    refresh: () => void;
}

const ReportsContext = createContext<ReportsContextType | null>(null);

export function ReportsProvider({ children }: { children: ReactNode }) {
    const [reports, setReports] = useState<ReportedIssue[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tick, setTick] = useState(0);

    const refresh = () => setTick(t => t + 1);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance.get('/api/reports')
            .then(res => {
                setReports(res.data.map((r: any) => ({
                    id: String(r.id),
                    type: r.type,
                    status: r.status,
                    reason: r.reason,
                    reportedBy: r.reportedBy,
                    targetId: String(r.targetId),
                    targetName: r.targetName,
                    resolveNote: r.resolveNote,
                    resolveAction: r.resolveAction,
                    createdAt: r.createdAt,
                })));
            })
            .catch(() => {})
            .finally(() => setIsLoading(false));
    }, [tick]);

    const addReport = async (report: Omit<ReportedIssue, 'id' | 'createdAt' | 'status'>) => {
        await axiosInstance.post('/api/reports', {
            type: report.type,
            reason: report.reason,
            targetId: Number(report.targetId),
            targetName: report.targetName,
        });
        refresh();
    };

    const updateStatus = async (id: string, status: ReportStatus, note?: string, action?: string) => {
        await axiosInstance.put(`/api/reports/${id}/resolve`, {
            status,
            resolveNote: note,
            resolveAction: action,
        });
        refresh();
    };

    return (
        <ReportsContext.Provider value={{ reports, isLoading, addReport, updateStatus, refresh }}>
            {children}
        </ReportsContext.Provider>
    );
}

export function useReports(): ReportsContextType {
    const ctx = useContext(ReportsContext);
    if (!ctx) throw new Error('useReports must be used within ReportsProvider');
    return ctx;
}