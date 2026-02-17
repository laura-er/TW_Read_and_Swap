export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  condition: 'new' | 'good' | 'fair' | 'worn';
  coverUrl: string;
  description: string;
  ownerId: string;
  isAvailable: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
}

export type BookCondition = Book['condition'];

export type BookGenre =
  | 'fiction'
  | 'non-fiction'
  | 'mystery'
  | 'sci-fi'
  | 'fantasy'
  | 'romance'
  | 'biography'
  | 'history'
  | 'self-help'
  | 'other';
