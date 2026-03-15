import type { Book } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface AdminBookRowProps {
  book: Book;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function AdminBookRow({ book, onEdit, onDelete }: AdminBookRowProps) {
  return (
    <tr className="border-b border-[var(--color-border)] hover:bg-[var(--color-surface-alt)]/50 transition-colors">
      {/* Cover + title */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-11 rounded overflow-hidden bg-[var(--color-surface-alt)] flex-shrink-0">
            {book.coverUrl && (
              <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-text)] line-clamp-1">{book.title}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{book.author}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-[var(--color-text-muted)]">{book.genre}</td>
      <td className="px-4 py-3">
        <Badge variant={book.isAvailable ? 'success' : 'default'}>
          {book.isAvailable ? 'Available' : 'Swapped'}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <Badge variant="accent">{book.condition}</Badge>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit?.(book.id)}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => onDelete?.(book.id)}>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
