import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

interface EditProfileActionsProps {
  isLoading: boolean;
  saved: boolean;
}

export function EditProfileActions({ isLoading, saved }: EditProfileActionsProps) {
  return (
    <div className="flex items-center justify-between gap-3 pt-2">
      {saved && (
        <p className="text-sm text-green-500 font-medium">✓ Changes saved</p>
      )}
      <div className="flex items-center gap-3 ml-auto">
        <Link to="/profile">
          <Button variant="secondary">Cancel</Button>
        </Link>
        <Button type="submit" isLoading={isLoading}>
          Save changes
        </Button>
      </div>
    </div>
  );
}
