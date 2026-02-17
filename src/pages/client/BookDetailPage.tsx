import { useParams } from 'react-router-dom';
import { ReviewCard } from '@/components/client/ReviewCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <main>
      {/* Back button */}
      {/* Book hero: cover image + title, author, genre, condition badge, rating */}
      {/* Request Swap button (if authenticated and available) */}
      {/* Owner info card */}
      {/* Description */}
      {/* Reviews section with ReviewCard list */}
      {/* Add review form (if authenticated) */}
    </main>
  );
}
