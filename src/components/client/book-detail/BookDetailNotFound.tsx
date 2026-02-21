import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function BookDetailNotFound() {
    return (
        <div className="text-center py-24">
            <p className="text-7xl mb-5">📚</p>
            <h2 className="text-2xl font-bold text-(--color-text) mb-2">Book Not Found</h2>
            <p className="text-(--color-text-muted) mb-8 max-w-sm mx-auto text-sm">
                The book you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/books">
                <Button size="lg">Back to Catalog</Button>
            </Link>
        </div>
    );
}
