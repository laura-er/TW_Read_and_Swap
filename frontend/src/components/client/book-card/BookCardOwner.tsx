import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import axiosInstance from '@/api/axiosInstance';

export function BookCardOwner({ ownerId }: { ownerId: string }) {
    const { t } = useLanguage();
    const [username, setUsername] = useState<string | null>(null);
    useEffect(() => {
        if (!ownerId) return;
        axiosInstance.get(`/api/users/${ownerId}`).then(res => setUsername(res.data.username)).catch(() => setUsername(null));
    }, [ownerId]);
    return (
        <div className="pt-3 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0"><span className="text-[var(--color-accent)] font-bold text-sm">{(username ?? ownerId).charAt(0).toUpperCase()}</span></div>
                <span className="text-xs">{t.books.ownedBy}{' '}{username ? <Link to={`/profile/${username}`} className="font-semibold text-[var(--color-accent)] hover:underline">@{username}</Link> : <span className="font-semibold text-[var(--color-text)]">{ownerId}</span>}</span>
            </div>
        </div>
    );
}
