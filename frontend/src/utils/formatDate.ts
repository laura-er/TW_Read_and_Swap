export function formatDate(dateString: string | null | undefined, locale = 'ro-RO'): string {
    if (!dateString) return '—';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '—';
    return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

export function formatRelativeDate(dateString: string | null | undefined, locale = 'ro-RO'): string {
    if (!dateString) return '—';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '—';
    const diff = Date.now() - date.getTime();
    const days = Math.floor(diff / 86400000);
    if (locale === 'ro-RO' || locale === 'ro') {
        if (days === 0) return 'Azi';
        if (days === 1) return 'Ieri';
        if (days < 7) return `Acum ${days} zile`;
        if (days < 30) return `Acum ${Math.floor(days / 7)} săptămâni`;
    } else {
        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    }
    return formatDate(dateString, locale);
}