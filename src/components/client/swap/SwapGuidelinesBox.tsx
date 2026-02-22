export function SwapGuidelinesBox() {
    return (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
            <h3 className="text-sm font-bold text-[var(--color-text)] mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Swap Guidelines
            </h3>
            <ul className="text-xs text-[var(--color-text-muted)] space-y-1 list-disc list-inside">
                <li>Be respectful and honest in your communication</li>
                <li>Provide accurate descriptions of your book's condition</li>
                <li>Respond promptly to messages from other users</li>
                <li>Confirm the swap details before proceeding</li>
            </ul>
        </div>
    );
}
