interface AuthFormHeaderProps {
    title: string;
    subtitle: string;
}

export function AuthFormHeader({ title, subtitle }: AuthFormHeaderProps) {
    return (
        <div className="mb-6">
            <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)] mb-1">
                {title}
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">{subtitle}</p>
        </div>
    );
}
