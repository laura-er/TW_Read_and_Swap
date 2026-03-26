import { Search } from 'lucide-react';

interface FavoritesSearchProps {
    search: string;
    onSearchChange: (value: string) => void;
    availableCount: number;
    totalCount: number;
}

export function FavoritesSearch({
                                    search,
                                    onSearchChange,
                                    availableCount,
                                    totalCount,
                                }: FavoritesSearchProps) {
    return (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 rounded-[18px]" style={{ background: "var(--lib-card)", border: "1px solid var(--lib-border)", backdropFilter: "blur(16px)" }}>
            <div className="relative sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                    type="text"
                    placeholder="Search favorites..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full rounded-[12px] border py-2 pl-9 pr-4 text-sm focus:outline-none" style={{ background: "var(--lib-stats)", border: "1px solid var(--lib-border)", color: "var(--lib-text)" }}
                />
            </div>
            <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    {availableCount} available
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-text-muted)]" />
                    {totalCount - availableCount} unavailable
                </span>
            </div>
        </div>
    );
}