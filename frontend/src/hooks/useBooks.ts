import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import type { Book } from '@/types';

export function useBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axiosInstance.get('/api/books')
            .then((res) => {
                const mapped = res.data.map((b: any) => ({
                    ...b,
                    id: String(b.id),
                    ownerId: String(b.ownerId),
                    rating: (b.rating != null && b.rating > 0) ? b.rating : undefined,
                    reviewCount: b.reviewCount ?? 0,
                    createdAt: b.createdAt ?? new Date().toISOString(),
                }));
                setBooks(mapped);
            })
            .catch(() => setError('Failed to load books'))
            .finally(() => setIsLoading(false));
    }, []);

    return {
        books,
        isLoading,
        error,
        totalPages: 1,
    };
}

export function useBook(id: string) {
    const [book, setBook] = useState<Book | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        axiosInstance.get(`/api/books/${id}`)
            .then((res) => {
                setBook({
                    ...res.data,
                    id: String(res.data.id),
                    ownerId: String(res.data.ownerId),
                    rating: (res.data.rating != null && res.data.rating > 0) ? res.data.rating : undefined,
                    reviewCount: res.data.reviewCount ?? 0,
                    createdAt: res.data.createdAt ?? new Date().toISOString(),
                });
            })
            .catch(() => setError('Book not found'))
            .finally(() => setIsLoading(false));
    }, [id]);

    return { book, isLoading, error };
}