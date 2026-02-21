import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBook } from '@/hooks/useBooks';
import { useAuth } from '@/context/AuthContext';
import type { Review } from '@/types';
import { BookDetailHero } from '@/components/client/book-detail/BookDetailHero';
import { BookDetailActions } from '@/components/client/book-detail/BookDetailActions';
import { BookDetailReviews } from '@/components/client/book-detail/BookDetailReviews';
import { BookDetailAddReview } from '@/components/client/book-detail/BookDetailAddReview';
import { BookDetailNotFound } from '@/components/client/book-detail/BookDetailNotFound';

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { book } = useBook(id ?? '');
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);

  function handleAddReview(rating: number, comment: string) {
    if (!book) return;
    const newReview: Review = {
      id: crypto.randomUUID(),
      bookId: book.id,
      userId: 'currentUser',
      author: {
        id: 'currentUser',
        name: 'You',
        username: 'you',
        email: '',
        avatarUrl: '',
        bio: '',
        location: '',
        joinedAt: new Date().toISOString(),
        role: 'user',
      },
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [newReview, ...prev]);
  }

  if (!book) {
    return (
        <main className="min-h-screen bg-(--color-bg) px-6 py-12 pt-20">
          <div className="container mx-auto max-w-3xl">
            <BookDetailNotFound />
          </div>
        </main>
    );
  }

  return (
      <main className="min-h-screen bg-(--color-bg) px-6 py-12 pt-20">
        <div className="container mx-auto max-w-3xl flex flex-col gap-5">

          <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-sm p-6 md:p-8">
            <BookDetailHero book={book} />
            <BookDetailActions
                bookId={book.id}
                isAvailable={book.isAvailable}
                isAuthenticated={isAuthenticated}
                ownerId={book.ownerId}
            />
          </div>

          <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-sm p-6 md:p-8">
            <BookDetailReviews reviews={reviews} book={book} />
          </div>

          {isAuthenticated ? (
              <BookDetailAddReview onSubmit={handleAddReview} />
          ) : (
              <div className="rounded-2xl border border-dashed border-(--color-border) p-5 text-center">
                <p className="text-sm text-(--color-text-muted)">
                  <a href="/sign-in" className="font-semibold text-(--color-accent) hover:underline">
                    Sign in
                  </a>
                  {' '}to leave a review
                </p>
              </div>
          )}

        </div>
      </main>
  );
}


  