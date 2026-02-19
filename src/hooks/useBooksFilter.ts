import { useState, useMemo } from 'react';
import type { Book } from '@/types';

interface UseBooksFilterResult {
    searchTerm: string;
    selectedGenre: string;
    selectedCondition: string;
    availableOnly: boolean;
    filteredBooks: Book[];
    setSearchTerm: (v: string) => void;
    setSelectedGenre: (v: string) => void;
    setSelectedCondition: (v: string) => void;
    toggleAvailableOnly: () => void;
    clearFilters: () => void;
}

export function useBooksFilter(books: Book[]): UseBooksFilterResult {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [selectedCondition, setSelectedCondition] = useState('All');
    const [availableOnly, setAvailableOnly] = useState(false);

    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            const matchesSearch =
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
            const matchesCondition = selectedCondition === 'All' || book.condition === selectedCondition;
            const matchesAvailability = !availableOnly || book.isAvailable;
            return matchesSearch && matchesGenre && matchesCondition && matchesAvailability;
        });
    }, [books, searchTerm, selectedGenre, selectedCondition, availableOnly]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedGenre('All');
        setSelectedCondition('All');
        setAvailableOnly(false);
    };

    return {
        searchTerm,
        selectedGenre,
        selectedCondition,
        availableOnly,
        filteredBooks,
        setSearchTerm,
        setSelectedGenre,
        setSelectedCondition,
        toggleAvailableOnly: () => setAvailableOnly((prev) => !prev),
        clearFilters,
    };
}