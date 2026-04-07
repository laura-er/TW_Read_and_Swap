import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useAuth } from '@/context/AuthContext';

interface FavoritesContextValue {
    favorites: string[];
    isFavorite: (bookId: string) => boolean;
    toggleFavorite: (bookId: string) => Promise<void>;
    showLoginModal: boolean;
    closeLoginModal: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const { user, isAuthenticated } = useAuth();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [favoriteIds, setFavoriteIds] = useState<Record<string, number>>({});
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        if (!user) {
            setFavorites([]);
            setFavoriteIds({});
            return;
        }
        axiosInstance.get(`/api/favorites/user/${user.id}`)
            .then(res => {
                const map: Record<string, number> = {};
                const bookIds: string[] = [];
                res.data.forEach((f: any) => {
                    map[String(f.bookId)] = f.id;
                    bookIds.push(String(f.bookId));
                });
                setFavoriteIds(map);
                setFavorites(bookIds);
            })
            .catch(() => {});
    }, [user]);

    const isFavorite = (bookId: string) => favorites.includes(bookId);

    const toggleFavorite = async (bookId: string) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        if (isFavorite(bookId)) {
            const favId = favoriteIds[bookId];
            await axiosInstance.delete(`/api/favorites/${favId}`);
            setFavorites(prev => prev.filter(id => id !== bookId));
            setFavoriteIds(prev => { const n = { ...prev }; delete n[bookId]; return n; });
        } else {
            const res = await axiosInstance.post('/api/favorites', { bookId: Number(bookId) });
            setFavorites(prev => [...prev, bookId]);
            if (res.data?.id) {
                setFavoriteIds(prev => ({ ...prev, [bookId]: res.data.id }));
            }
        }
    };

    return (
        <FavoritesContext.Provider value={{
            favorites, isFavorite, toggleFavorite,
            showLoginModal, closeLoginModal: () => setShowLoginModal(false),
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites(): FavoritesContextValue {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider');
    return ctx;
}