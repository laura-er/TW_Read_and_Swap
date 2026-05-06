import type { ActivityItem } from '@/types/admin';
import { useLanguage } from '@/context/LanguageContext';
import { useFormatDate } from '@/utils/useFormatDate';

// Translate description strings coming from the backend
function translateDescription(description: string, type: string, language: string): string {
    if (language !== 'ro') return description;

    // user joined: "FirstName LastName joined"
    if (type === 'user_joined') {
        return description.replace(' joined', ' s-a înregistrat');
    }

    // book added: "Title by Author"  →  "Title de Author"
    if (type === 'book_added') {
        return description.replace(' by ', ' de ');
    }

    // swap requested: 'Swap request for "Title"'
    if (type === 'swap_requested') {
        return description.replace('Swap request for ', 'Cerere swap pentru ');
    }

    // swap completed: 'Swap completed for "Title"'
    if (type === 'swap_completed') {
        return description.replace('Swap completed for ', 'Swap completat pentru ');
    }

    // report filed: 'Report filed: reason'
    if (type === 'report_filed') {
        return description.replace('Report filed: ', 'Raport depus: ');
    }

    return description;
}

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
    const { t, language } = useLanguage();
    const { formatFull } = useFormatDate();

    const typeLabel: Record<string, { label: string; color: string }> = {
        book_added:      { label: language === 'ro' ? 'Carte nouă'      : 'New book',        color: 'text-blue-500' },
        swap_completed:  { label: language === 'ro' ? 'Swap completat'  : 'Swap completed',  color: 'text-green-500' },
        swap_requested:  { label: language === 'ro' ? 'Cerere swap'     : 'Swap request',    color: 'text-cyan-500' },
        user_joined:     { label: language === 'ro' ? 'Utilizator nou'  : 'New user',        color: 'text-[var(--color-accent)]' },
        report_filed:    { label: language === 'ro' ? 'Raport depus'    : 'Report filed',    color: 'text-yellow-500' },
        user_banned:     { label: language === 'ro' ? 'Utilizator banat': 'User banned',     color: 'text-red-500' },
    };

    return (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
            <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
                <h2 className="font-['Playfair_Display'] text-base font-semibold text-[var(--color-text)]">{t.admin.recentActivity}</h2>
            </div>
            <table className="w-full text-sm">
                <thead className="bg-[var(--color-surface-alt)]"><tr>
                    <th className="text-left px-5 py-2.5 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{t.admin.type}</th>
                    <th className="text-left px-5 py-2.5 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{language === 'ro' ? 'Descriere' : 'Description'}</th>
                    <th className="text-left px-5 py-2.5 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{t.admin.users}</th>
                    <th className="text-left px-5 py-2.5 text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">{t.admin.date}</th>
                </tr></thead>
                <tbody>{( items ?? []).map(item => (
                    <tr key={item.id} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]/50 transition-colors">
                        <td className="px-5 py-3">
                            <span className={`font-medium ${(typeLabel[item.type] ?? typeLabel['book_added']).color}`}>
                                {(typeLabel[item.type] ?? { label: item.type }).label}
                            </span>
                        </td>
                        <td className="px-5 py-3 text-[var(--color-text)]">
                            {translateDescription(item.description, item.type, language)}
                        </td>
                        <td className="px-5 py-3 text-[var(--color-text-muted)]">@{item.user}</td>
                        <td className="px-5 py-3 text-[var(--color-text-muted)] whitespace-nowrap">{formatFull(item.timestamp)}</td>
                    </tr>
                ))}</tbody>
            </table>
        </div>
    );
}
