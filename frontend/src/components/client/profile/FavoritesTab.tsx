import { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Book } from '@/types';
import { FavoritesSearch } from './FavoritesSearch';
import { FavoritesTable } from './FavoritesTable';
import { ProfileEmptyState } from './ProfileEmptyState';
import { useLanguage } from '@/context/LanguageContext';

interface FavoritesTabProps {
    favorites: Book[];
    onRemove: (id: string) => void;
}

export function FavoritesTab({ favorites, onRemove }: FavoritesTabProps) {
    const { t } = useLanguage();
    const [search, setSearch] = useState('');

    const filtered = favorites.filter(
        (b) =>
            b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.author.toLowerCase().includes(search.toLowerCase()),
    );

    const availableCount = favorites.filter((b) => b.isAvailable).length;

    return (
        <>
            <FavoritesSearch
                search={search}
                onSearchChange={setSearch}
                availableCount={availableCount}
                totalCount={favorites.length}
            />
            {filtered.length === 0 ? (
                <ProfileEmptyState
                    icon={<Heart className="h-12 w-12" />}
                    title={t.profile.noFavsFound}
                    description={search ? t.profile.noFavsSearch : t.profile.noFavsBrowse}
                />
            ) : (
                <FavoritesTable books={filtered} onRemove={onRemove} />
            )}
        </>
    );
}
