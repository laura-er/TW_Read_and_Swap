import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBook } from '@/hooks/useBooks';
import { useAuth } from '@/context/AuthContext';
import type { Review } from '@/types';
import { BookDetailSimilarBooks } from '@/components/client/book-detail/BookDetailSimilarBooks';
import { useBooks } from '@/hooks/useBooks';
import { BookDetailCover } from '@/components/client/book-detail/BookDetailCover';
import { BookDetailInfo } from '@/components/client/book-detail/BookDetailInfo';
import { BookDetailReviewStats } from '@/components/client/book-detail/BookDetailReviewStats';
import { BookDetailReviewList } from '@/components/client/book-detail/BookDetailReviewList';
import { BookDetailAddReview } from '@/components/client/book-detail/BookDetailAddReview';
import { BookDetailNotFound } from '@/components/client/book-detail/BookDetailNotFound';

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { book } = useBook(id ?? '');
  const { books } = useBooks();
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

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
    setShowReviewForm(false);
  }

  if (!book) {
    return <BookDetailNotFound />;
  }

  const averageRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : book.rating?.toFixed(1) ?? 'N/A';

  const reviewCount = reviews.length + (book.reviewCount ?? 0);

  return (
      <div className="bg-(--color-bg) min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 py-8 pt-24 md:pt-10">

          {/* Back Button */}
          <Link
              to="/books"
              className="inline-flex items-center gap-2 text-(--color-text) hover:text-(--color-accent) mb-8 px-4 py-3 bg-(--color-surface) backdrop-blur-xl rounded-xl shadow-lg hover:shadow-xl border border-(--color-border) transition-all duration-300 hover:-translate-y-0.5 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-semibold">Back to Books</span>
          </Link>

          {/* Main 3-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

            {/* Left — sticky cover */}
            <BookDetailCover book={book} />

            {/* Right — info + reviews */}
            <div className="lg:col-span-2 space-y-6">

              <BookDetailInfo
                  book={book}
                  averageRating={averageRating}
                  reviewCount={reviewCount}
              />
              
              {/* Review stats */}
              <BookDetailReviewStats
                  reviews={reviews}
                  baseRating={book.rating}
                  baseReviewCount={book.reviewCount}
              />

              {/* Add Review button */}
              {isAuthenticated && (
                  <div className="bg-(--color-surface) p-6 rounded-2xl shadow-xl border border-(--color-border)">
                    <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="w-full bg-(--color-accent) hover:bg-(--color-accent-hover) text-white py-4 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 justify-center group"
                    >
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      {showReviewForm ? 'Cancel' : 'Add Review'}
                    </button>
                  </div>
              )}

              {/* Review form */}
              {showReviewForm && isAuthenticated && (
                  <BookDetailAddReview onSubmit={handleAddReview} />
              )}

              {/* Reviews list */}
              <BookDetailReviewList reviews={reviews} />

              {/* Sign in prompt */}
              {!isAuthenticated && (
                  <div className="bg-(--color-surface) rounded-2xl border border-dashed border-(--color-border) p-5 text-center">
                    <p className="text-sm text-(--color-text-muted)">
                      <Link to="/sign-in" className="font-semibold text-(--color-accent) hover:underline">
                        Sign in
                      </Link>
                      {' '}to leave a review
                    </p>
                  </div>
              )}
            </div>
          </div>
          {/* Similar Books */}
          <BookDetailSimilarBooks currentBook={book} allBooks={books} />
        </div>
      </div>
  );
}
