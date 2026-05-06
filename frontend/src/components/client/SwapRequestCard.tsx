import type { SwapRequestPopulated } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useFormatDate } from '@/utils/useFormatDate';
import { useLanguage } from '@/context/LanguageContext';

interface SwapRequestCardProps {
  swap: SwapRequestPopulated;
  currentUserId: string;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
}

const statusVariant: Record<string, 'warning' | 'success' | 'danger' | 'default'> = {
  pending: 'warning',
  accepted: 'success',
  declined: 'danger',
  completed: 'default',
};

export function SwapRequestCard({ swap, currentUserId, onAccept, onDecline }: SwapRequestCardProps) {
  const { t } = useLanguage();
  const { formatRelative } = useFormatDate();
  const isOwner = swap.ownerId === currentUserId;
  const otherUser = isOwner ? swap.requester : swap.owner;

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <Avatar src={otherUser.avatarUrl} name={otherUser.name} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-sm text-[var(--color-text)]">{otherUser.name}</span>
          <Badge variant={statusVariant[swap.status]}>{swap.status}</Badge>
        </div>
        <p className="text-xs text-[var(--color-text-muted)] mb-2">
          {isOwner ? t.swaps.theyWant : t.swaps.youRequested}{' '}
          <span className="font-medium text-[var(--color-text)]">{swap.bookRequested.title}</span>{' '}
          · {isOwner ? t.swaps.theyOffered : t.swaps.youOffered}{' '}
          <span className="font-medium text-[var(--color-text)]">{swap.bookOffered.title}</span>
        </p>
        <span className="text-xs text-[var(--color-text-muted)]">{formatRelative(swap.createdAt)}</span>
        {isOwner && swap.status === 'pending' && (
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="primary" onClick={() => onAccept?.(swap.id)}>{t.swaps.accept}</Button>
            <Button size="sm" variant="secondary" onClick={() => onDecline?.(swap.id)}>{t.swaps.decline}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
