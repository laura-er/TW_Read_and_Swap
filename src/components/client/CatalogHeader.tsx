interface CatalogHeaderProps {
    totalBooks: number;
}

export function CatalogHeader({ totalBooks }: CatalogHeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-(--color-text) leading-tight">
                Book Catalog
            </h1>
            <p className="text-sm text-(--color-text-muted) mt-1.5">
                Discover your next great read —{' '}
                <span className="font-semibold text-(--color-text)">{totalBooks}</span> books available
            </p>
            <div className="mt-5 h-px bg-gradient-to-r from-(--color-accent)/30 via-(--color-border) to-transparent" />
        </div>
    );
}

