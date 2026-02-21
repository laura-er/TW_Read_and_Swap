import { Avatar } from '@/components/ui/Avatar';

interface BookDetailOwnerProps {
    ownerId: string;
}

export function BookDetailOwner({ ownerId }: BookDetailOwnerProps) {
    return (
        <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-(--color-text-muted) mb-4">
                Book Owner
            </h3>
            <div className="flex items-center gap-4">
                <Avatar name={ownerId} size="lg" />
                <div>
                    <p className="font-semibold text-(--color-text)">{ownerId}</p>
                    <p className="text-xs text-(--color-text-muted) mt-0.5">Member of Read &amp; Swap</p>
                </div>
            </div>
        </div>
    );
}
