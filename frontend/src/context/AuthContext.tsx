import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/types';

const SESSION_KEY = 'read_swap_user';

interface AuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUser(): User | null {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        return raw ? (JSON.parse(raw) as User) : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(loadUser);

    const login = (u: User) => {
        setUser(u);
        localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: user !== null,
            isAdmin: user?.role === 'admin',
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}