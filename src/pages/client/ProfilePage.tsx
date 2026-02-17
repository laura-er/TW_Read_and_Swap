import { useParams, Link } from 'react-router-dom';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { BookCard } from '@/components/client/BookCard';

export function ProfilePage() {
  const { username } = useParams<{ username?: string }>();
  // If no username param, show current user's profile

  return (
    <main>
      {/* Profile header: avatar, name, username, location, bio, joined date */}
      {/* Stats row: books listed, swaps completed, favorites */}
      {/* Edit profile / Share profile buttons (own profile only) */}
      {/* Tabs: Books | Favorites | Swap History */}
      {/* BookCard grid for active tab */}
    </main>
  );
}
