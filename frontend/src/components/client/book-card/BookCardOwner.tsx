interface BookCardOwnerProps {
    ownerId: string;
}

export function BookCardOwner({ ownerId }: BookCardOwnerProps) {
    return (
        <div className="pt-3 border-t border-[var(--color-border)]">
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0">
          <span className="text-[var(--color-accent)] font-bold text-sm">
            {ownerId.charAt(0).toUpperCase()}
          </span>
                </div>
                <span className="text-xs">
          Owned by{' '}
                    <span className="font-semibold text-[var(--color-text)]">{ownerId}</span>
        </span>
            </div>
        </div>
    );
}