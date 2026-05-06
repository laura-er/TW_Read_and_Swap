import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flag } from 'lucide-react';
import type { SwapRequest } from '@/types';
import { useFormatDate } from '@/utils/useFormatDate';
import { useLanguage } from '@/context/LanguageContext';
import { ReportModal } from '@/components/shared/ReportModal';
import axiosInstance from '@/api/axiosInstance';

interface SwapHistoryTabProps { swaps: SwapRequest[]; currentUserId: string; }

function SwapHistoryCard({ swap, currentUserId }: { swap: SwapRequest; currentUserId: string }) {
    const { t } = useLanguage();
    const { formatRelative } = useFormatDate();
    const isOwner = String(swap.ownerId) === String(currentUserId);
    const otherUserId = isOwner ? swap.requesterId : swap.ownerId;
    const [otherUsername, setOtherUsername] = useState<string>(`User #${otherUserId}`);
    const [bookOfferedTitle, setBookOfferedTitle] = useState<string>(`Book #${swap.bookOfferedId}`);
    const [bookRequestedTitle, setBookRequestedTitle] = useState<string>(`Book #${swap.bookRequestedId}`);
    const [showReport, setShowReport] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/api/users/${otherUserId}`).then(res => setOtherUsername(res.data.username ?? `User #${otherUserId}`)).catch(() => {});
        axiosInstance.get(`/api/books/${swap.bookOfferedId}`).then(res => setBookOfferedTitle(res.data.title ?? `Book #${swap.bookOfferedId}`)).catch(() => {});
        axiosInstance.get(`/api/books/${swap.bookRequestedId}`).then(res => setBookRequestedTitle(res.data.title ?? `Book #${swap.bookRequestedId}`)).catch(() => {});
    }, [swap.bookOfferedId, swap.bookRequestedId, otherUserId]);

    return (
        <div className="rounded-2xl p-5" style={{ background: 'var(--lib-card)', border: '1px solid var(--lib-border)', backdropFilter: 'blur(16px)' }}>
            {showReport && <ReportModal targetId={otherUserId} targetName={otherUsername} onClose={() => setShowReport(false)} />}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-sm font-semibold text-[var(--color-text)]">{t.profile.with} {otherUsername}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{formatRelative(swap.updatedAt)}</p>
                </div>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-[var(--color-accent)] text-white">{t.swaps.accepted}</span>
            </div>
            <div className="flex items-center gap-3">
                <Link to={`/books/${swap.bookRequestedId}`} className="flex-1 flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-[var(--color-accent)] transition-all" style={{ background: 'var(--lib-stats)' }}>
                    <div className="min-w-0"><p className="text-xs text-[var(--color-text-muted)] mb-0.5">{isOwner ? t.profile.youGave : t.profile.youReceived}</p><p className="text-sm font-semibold text-[var(--color-text)] truncate">{bookRequestedTitle}</p></div>
                </Link>
                <svg className="w-5 h-5 shrink-0 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                <Link to={`/books/${swap.bookOfferedId}`} className="flex-1 flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-[var(--color-accent)] transition-all" style={{ background: 'var(--lib-stats)' }}>
                    <div className="min-w-0"><p className="text-xs text-[var(--color-text-muted)] mb-0.5">{isOwner ? t.profile.youReceived : t.profile.youGave}</p><p className="text-sm font-semibold text-[var(--color-text)] truncate">{bookOfferedTitle}</p></div>
                </Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px', marginTop: '10px', borderTop: '1px solid var(--lib-border)' }}>
                <button onClick={() => setShowReport(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#c0392b', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                    <Flag size={13} /> {t.swaps.reportUser}
                </button>
            </div>
        </div>
    );
}

export function SwapHistoryTab({ swaps, currentUserId }: SwapHistoryTabProps) {
    const { t } = useLanguage();
    const completed = swaps.filter((s) => s.status === 'accepted');
    if (completed.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-[20px] py-16 text-center" style={{ background: 'var(--lib-card)', border: '1px solid var(--lib-border)', backdropFilter: 'blur(16px)' }}>
                <div className="mb-4" style={{ color: 'var(--lib-text-faint)', opacity: 0.5 }}><svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg></div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold" style={{ color: 'var(--lib-text)' }}>{t.profile.swapHistoryTitle}</h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--lib-text-muted)' }}>{t.profile.noSwapHistory}</p>
            </div>
        );
    }
    return <div className="flex flex-col gap-4">{completed.map((swap) => <SwapHistoryCard key={swap.id} swap={swap} currentUserId={currentUserId} />)}</div>;
}
