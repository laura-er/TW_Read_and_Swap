import { useLanguage } from '@/context/LanguageContext';
import { formatRelativeDate, formatDate } from './formatDate';

export function useFormatDate() {
    const { language } = useLanguage();
    const locale = language === 'ro' ? 'ro-RO' : 'en-GB';
    return {
        formatRelative: (d: string | null | undefined) => formatRelativeDate(d, locale),
        formatFull: (d: string | null | undefined) => formatDate(d, locale),
    };
}