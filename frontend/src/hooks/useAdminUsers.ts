import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';

export function useAdminUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/api/users/list')
            .then(res => setUsers(res.data))
            .catch(() => {})
            .finally(() => setIsLoading(false));
    }, []);

    return { users, isLoading };
}