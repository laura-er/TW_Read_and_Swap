interface CatalogHeaderProps {
    totalBooks: number;
}

export function CatalogHeader({ totalBooks }: CatalogHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-px" style={{ background: 'var(--color-accent)' }} />
                <span className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: 'var(--color-accent)' }}>Browse</span>
            </div>
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold"
                style={{ color: 'var(--color-text)' }}>
                Book Catalog
            </h1>
            <p className="text-sm mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
                Discover your next great read —{' '}
                <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{totalBooks}</span> books available
            </p>
        </div>
    );
}