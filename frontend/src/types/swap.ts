import type { Book } from './book';
import type { User } from './user';

export interface SwapRequest {
  id: string;
  requesterId: string;
  ownerId: string;
  bookOfferedId: string;
  bookRequestedId: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SwapRequestPopulated extends SwapRequest {
  requester: User;
  owner: User;
  bookOffered: Book;
  bookRequested: Book;
}

export type SwapStatus = SwapRequest['status'];
