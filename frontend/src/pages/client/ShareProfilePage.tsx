import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useSwaps } from '@/context/SwapContext';
import { useFavorites } from '@/context/FavoritesContext';
import { ShareProfilePreview } from '@/components/client/share-profile/ShareProfilePreview';
import { ShareLinkBox } from '@/components/client/share-profile/ShareLinkBox';
import { SocialShareButtons } from '@/components/client/share-profile/SocialShareButtons';
import axiosInstance from '@/api/axiosInstance';
import type { User } from '@/types';

export function ShareProfilePage() {
    const { user } = useAuth();
    const { t } = useLanguage();
    const { incoming, outgoing } = useSwaps();
    const { favorites } = useFavorites();
    const [booksCount, setBooksCount] = useState(0);

    useEffect(() => {
        if (!user?.id) return;
        axiosInstance.get(`/api/books/owner/${user.id}`)
            .then(res => setBooksCount(res.data.length))
            .catch(() => {});
    }, [user?.id]);

    const swapsCompleted = useMemo(() =>
        [...incoming, ...outgoing].filter(s => s.status === 'accepted').length,
        [incoming, outgoing]
    );

    if (!user) return null;

    const enrichedUser: User = {
        ...user,
        booksCount,
        swapsCompleted,
        favoritesCount: favorites.length,
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-10">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/profile" className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"><ArrowLeft className="h-4 w-4" />{t.editProfile.backToProfile}</Link>
                <div className="h-4 w-px bg-[var(--color-border)]" />
                <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)]">{t.share.title}</h1>
            </div>
            <div className="flex flex-col gap-5">
                <ShareProfilePreview user={enrichedUser} />
                <ShareLinkBox username={user.username} />
                <SocialShareButtons username={user.username} />
            </div>
        </div>
    );
}

