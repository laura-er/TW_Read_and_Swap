import { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Book } from '@/types';
import { FavoritesSearch } from './FavoritesSearch';
import { FavoritesTable } from './FavoritesTable';
import { ProfileEmptyState } from './ProfileEmptyState';

interface FavoritesTabProps {
    favorites: Book[];
    onRemove: (id: string) => void;
}

export function FavoritesTab({ favorites, onRemove }: FavoritesTabProps) {
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
                    title="No favorites found"
                    description={
                        search
                            ? 'Try a different search term'
                            : 'Browse books and add some to your favorites!'
                    }
                />
            ) : (
                <FavoritesTable books={filtered} onRemove={onRemove} />
            )}
        </>
    );
}