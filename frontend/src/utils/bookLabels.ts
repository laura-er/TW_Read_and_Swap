import type { Translations } from '@/i18n/en';

export function genreLabel(genre: string, t: Translations): string {
    const map: Record<string, string> = {
        fiction: t.books.genreFiction,
        'non-fiction': t.books.genreNonFiction,
        mystery: t.books.genreMystery,
        'sci-fi': t.books.genreSciFi,
        fantasy: t.books.genreFantasy,
        romance: t.books.genreRomance,
        biography: t.books.genreBiography,
        history: t.books.genreHistory,
        'self-help': t.books.genreSelfHelp,
        other: t.books.genreOther,
    };
    return map[genre] ?? genre;
}

export function conditionLabel(condition: string, t: Translations): string {
    const map: Record<string, string> = {
        new: t.books.conditionNew,
        good: t.books.conditionGood,
        fair: t.books.conditionFair,
        worn: t.books.conditionWorn,
    };
    return map[condition] ?? condition;
}