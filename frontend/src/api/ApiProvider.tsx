import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

interface ApiContextValue {
    isBackendUp: boolean;
    checkHealth: () => void;
}

const ApiContext = createContext<ApiContextValue | null>(null);

export function ApiProvider({ children }: { children: ReactNode }) {
    const [isBackendUp, setIsBackendUp] = useState(true);
    const navigate = useNavigate();

    const checkHealth = useCallback(() => {
        axiosInstance.get('/api/health/check')
            .then(() => {
                setIsBackendUp(true);
                navigate('/');
            })
            .catch(() => {
                setIsBackendUp(false);
                navigate('/500');
            });
    }, [navigate]);

    useEffect(() => {
        checkHealth();
    }, []);

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (!error.response) {
                setIsBackendUp(false);
                navigate('/500');
            }
            return Promise.reject(error);
        }
    );

    return (
        <ApiContext.Provider value={{ isBackendUp, checkHealth }}>
            {children}
        </ApiContext.Provider>
    );
}

export function useApiContext(): ApiContextValue {
    const ctx = useContext(ApiContext);
    if (!ctx) throw new Error('useApiContext must be used inside ApiProvider');
    return ctx;
}

