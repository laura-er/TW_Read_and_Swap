import { useBooks } from '@/hooks/useBooks';
import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { useLanguage } from '@/context/LanguageContext';

export function StatsBar() {
    const { books } = useBooks();
    const { t } = useLanguage();
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        axiosInstance.get('/api/users/count').then((res) => setUserCount(res.data)).catch(() => setUserCount(0));
    }, []);

    const stats = [
        { value: `${books.length}+`, label: t.stats.booksAvailable, icon: '📚' },
        { value: `${userCount}+`,    label: t.stats.activeReaders,  icon: '👥' },
        { value: '1,200+',           label: t.stats.swapsCompleted, icon: '🔄' },
        { value: '15+',              label: t.stats.genres,          icon: '🏷️' },
    ];

    return (
        <section style={{ background: 'var(--lib-stats)', backdropFilter: 'blur(14px)', borderTop: '1px solid var(--lib-border)', borderBottom: '1px solid var(--lib-border)' }}>
            <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-2 md:grid-cols-4">
                {stats.map(({ value, label, icon }, i) => (
                    <div key={label} className="flex flex-col items-center text-center px-6 py-2" style={{ borderLeft: i > 0 ? '1px solid var(--lib-border)' : 'none' }}>
                        <span className="text-xl mb-1">{icon}</span>
                        <p className="font-['Playfair_Display'] text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>{value}</p>
                        <p className="text-xs mt-1 tracking-wide uppercase" style={{ color: 'var(--lib-text-faint)' }}>{label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
