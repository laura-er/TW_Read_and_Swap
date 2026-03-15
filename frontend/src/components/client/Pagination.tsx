interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center mt-8">
            <nav aria-label="Books pagination">
                <div className="inline-flex rounded-xl -space-x-px" role="group">

                    {/* Prev */}
                    <button
                        type="button"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="inline-flex items-center justify-center w-9 h-9 bg-(--color-surface) border border-(--color-border) rounded-l-xl text-(--color-text-muted) hover:bg-(--color-surface-alt) hover:text-(--color-text) disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-(--color-accent)/30"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => onPageChange(i)}
                            className={`inline-flex items-center justify-center w-9 h-9 border border-(--color-border) text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-(--color-accent)/30 ${
                                i === currentPage
                                    ? 'bg-(--color-accent) text-white border-(--color-accent) z-10'
                                    : 'bg-(--color-surface) text-(--color-text-muted) hover:bg-(--color-surface-alt) hover:text-(--color-text)'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        type="button"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                        className="inline-flex items-center justify-center w-9 h-9 bg-(--color-surface) border border-(--color-border) rounded-r-xl text-(--color-text-muted) hover:bg-(--color-surface-alt) hover:text-(--color-text) disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-(--color-accent)/30"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
                        </svg>
                    </button>

                </div>
            </nav>
        </div>
    );
}

