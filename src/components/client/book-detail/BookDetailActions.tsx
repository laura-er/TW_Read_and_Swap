import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

interface BookDetailActionsProps {
    bookId: string;
    isAvailable: boolean;
    isAuthenticated: boolean;
    ownerId: string;
}

export function BookDetailActions({ bookId, isAvailable, isAuthenticated, ownerId }: BookDetailActionsProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-(--color-border)">

            {/* Owner */}
            <div className="flex items-center gap-3">
                <Avatar name={ownerId} size="md" />
                <div>
                    <p className="text-xs text-(--color-text-muted)">Owned by</p>
                    <p className="text-sm font-semibold text-(--color-text)">{ownerId}</p>
                </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
                {isAvailable ? (
                    isAuthenticated ? (
                        <Link
                            to={`/swap/${bookId}`}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-(--color-accent) hover:bg-(--color-accent-hover) text-white text-sm font-semibold transition-all duration-200 shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            Request Swap
                        </Link>
                    ) : (
                        <Link
                            to="/sign-in"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-(--color-accent) hover:bg-(--color-accent-hover) text-white text-sm font-semibold transition-all duration-200 shadow-sm"
                        >
                            Sign in to Swap
                        </Link>
                    )
                ) : (
                    <Button disabled variant="secondary" size="md" className="opacity-50 cursor-not-allowed">
                        Not Available
                    </Button>
                )}
            </div>
        </div>
    );
}

