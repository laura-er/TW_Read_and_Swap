import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';

interface FavoritesContextValue {
    favorites: string[];
    isFavorite: (id: string) => boolean;
    toggleFavorite: (id: string) => void;
    showLoginModal: boolean;
    closeLoginModal: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const isFavorite = (id: string) => favorites.includes(id);

    const toggleFavorite = (id: string) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };

    const closeLoginModal = () => setShowLoginModal(false);

    return (
        <FavoritesContext.Provider
            value={{ favorites, isFavorite, toggleFavorite, showLoginModal, closeLoginModal }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites(): FavoritesContextValue {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider');
    return ctx;
}
