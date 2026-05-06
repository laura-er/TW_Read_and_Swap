import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5088',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const raw = localStorage.getItem('read_swap_user');
    if (raw) {
        try {
            const user = JSON.parse(raw);
            if (user?.token) {
                config.headers['Authorization'] = `Bearer ${user.token}`;
            }
        } catch {
            // ignore
        }
    }
    return config;
});

export default axiosInstance;