import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockBooks } from '@/data/mockBooks';
import { Button } from '@/components/ui/Button';
import { AddBookForm } from '@/components/client/add-book/AddBookForm';
import { BookPreviewCard } from '@/components/client/add-book/BookPreviewCard';
import type { AddBookFields, AddBookErrors } from '@/components/client/add-book/AddBookForm';
import type { Book } from '@/types';

const DEFAULT_FIELDS: AddBookFields = {
  title: '',
  author: '',
  genre: 'fiction',
  condition: 'good',
  description: '',
  coverUrl: '',
};

function validate(fields: AddBookFields): AddBookErrors {
  const errors: AddBookErrors = {};
  if (!fields.title.trim()) errors.title = 'Title is required.';
  if (!fields.author.trim()) errors.author = 'Author is required.';
  return errors;
}

export function AddBookPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fields, setFields] = useState<AddBookFields>(DEFAULT_FIELDS);
  const [errors, setErrors] = useState<AddBookErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (updated: Partial<AddBookFields>) => {
    setFields((prev) => ({ ...prev, ...updated }));
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);

    // TODO: replace with real API call
    await new Promise((r) => setTimeout(r, 800));

    const newBook: Book = {
      id: String(Date.now()),
      ...fields,
      ownerId: user?.id ?? 'unknown',
      isAvailable: true,
      createdAt: new Date().toISOString(),
    };
    mockBooks.unshift(newBook);

    setIsLoading(false);
    navigate('/books');
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/books"
          className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>
        <div className="h-4 w-px bg-[var(--color-border)]" />
        <h1 className="font-['Playfair_Display'] text-2xl font-bold text-[var(--color-text)]">
          Add a Book
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <AddBookForm fields={fields} errors={errors} onChange={handleChange} />
        <BookPreviewCard
          title={fields.title}
          author={fields.author}
          genre={fields.genre}
          condition={fields.condition}
          coverUrl={fields.coverUrl}
          description={fields.description}
        />
        <div className="flex items-center justify-end gap-3">
          <Link to="/books">
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button type="submit" isLoading={isLoading}>
            List Book
          </Button>
        </div>
      </form>
    </div>
  );
}
