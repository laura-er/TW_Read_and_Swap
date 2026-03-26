interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const btnBase: React.CSSProperties = {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '36px', height: '36px', fontSize: '13px', fontWeight: 500,
        border: '1px solid var(--navbar-border)',
        background: 'var(--navbar-bg)',
        color: 'var(--navbar-text-muted)',
        cursor: 'pointer', transition: 'all 0.15s',
        backdropFilter: 'blur(12px)',
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <div style={{ display: 'inline-flex', borderRadius: '14px', overflow: 'hidden', gap: '2px',
                padding: '4px', background: 'var(--navbar-bg)', border: '1px solid var(--navbar-border)',
                backdropFilter: 'blur(12px)' }}>

                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}
                        style={{ ...btnBase, borderRadius: '10px', border: 'none', opacity: currentPage === 0 ? 0.35 : 1 }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
                    </svg>
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                    <button key={i} onClick={() => onPageChange(i)}
                            style={{
                                ...btnBase, borderRadius: '10px', border: 'none',
                                background: i === currentPage ? 'var(--color-accent)' : 'transparent',
                                color: i === currentPage ? 'white' : 'var(--navbar-text-muted)',
                            }}>
                        {i + 1}
                    </button>
                ))}

                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}
                        style={{ ...btnBase, borderRadius: '10px', border: 'none', opacity: currentPage === totalPages - 1 ? 0.35 : 1 }}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m9 5 7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}