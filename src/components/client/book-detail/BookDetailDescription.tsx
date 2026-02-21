interface BookDetailDescriptionProps {
    description: string;
}

export function BookDetailDescription({ description }: BookDetailDescriptionProps) {
    return (
        <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-(--color-text-muted) mb-3">
                About this Book
            </h3>
            <p className="text-sm text-(--color-text-muted) leading-relaxed">
                {description}
            </p>
        </div>
    );
}
