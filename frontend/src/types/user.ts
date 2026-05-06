export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  bio: string;
  location: string;
  city?: string;
  latitude?: number | null;
  longitude?: number | null;
  joinedAt: string;
  role: 'user' | 'admin';
  token?: string;
  booksCount?: number;
  swapsCompleted?: number;
  favoritesCount?: number;
  phone?: string; 
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