export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  bio: string;
  location: string;
  joinedAt: string;
  role: 'user' | 'admin';
  booksCount?: number;
  swapsCompleted?: number;
  favoritesCount?: number;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  author: User;
  rating: number;
  comment: string;
  createdAt: string;
}
