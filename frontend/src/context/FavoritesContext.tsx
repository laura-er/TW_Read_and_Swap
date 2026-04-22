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

    const loadFavorites = () => {
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
    };

    useEffect(() => {
        loadFavorites();
    }, [user]);

    const isFavorite = (bookId: string) => favorites.includes(bookId);

    const toggleFavorite = async (bookId: string) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        if (isFavorite(bookId)) {
            const favId = favoriteIds[bookId];
            if (!favId) {
                // favId lipseste — reincarcam favoritele si incercam din nou
                await axiosInstance.get(`/api/favorites/user/${user!.id}`)
                    .then(res => {
                        const map: Record<string, number> = {};
                        const bookIds: string[] = [];
                        res.data.forEach((f: any) => {
                            map[String(f.bookId)] = f.id;
                            bookIds.push(String(f.bookId));
                        });
                        setFavoriteIds(map);
                        setFavorites(bookIds);
                        const id = map[bookId];
                        if (id) {
                            axiosInstance.delete(`/api/favorites/${id}`)
                                .then(() => {
                                    setFavorites(prev => prev.filter(i => i !== bookId));
                                    setFavoriteIds(prev => { const n = { ...prev }; delete n[bookId]; return n; });
                                })
                                .catch(() => {});
                        }
                    })
                    .catch(() => {});
                return;
            }
            await axiosInstance.delete(`/api/favorites/${favId}`);
            setFavorites(prev => prev.filter(id => id !== bookId));
            setFavoriteIds(prev => { const n = { ...prev }; delete n[bookId]; return n; });
        } else {
            await axiosInstance.post('/api/favorites', { bookId: Number(bookId) });
            // reincarcam favoritele pentru a obtine ID-ul corect
            await axiosInstance.get(`/api/favorites/user/${user!.id}`)
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

