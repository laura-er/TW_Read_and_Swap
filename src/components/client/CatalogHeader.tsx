interface CatalogHeaderProps {
    totalBooks: number;
}

export function CatalogHeader({ totalBooks }: CatalogHeaderProps) {
    return (
        <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4">
                Book Catalog
            </h1>
            <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
                Discover your next great read from our collection of{' '}
                <span className="font-bold text-[var(--color-text)]">{totalBooks}</span> amazing books
            </p>
        </div>
    );
}