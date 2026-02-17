import { createBrowserRouter } from 'react-router-dom';

import { ClientLayout } from '@/layouts/ClientLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AuthLayout } from '@/layouts/AuthLayout';

// Client pages
import { HomePage } from '@/pages/client/HomePage';
import { BookCatalogPage } from '@/pages/client/BookCatalogPage';
import { BookDetailPage } from '@/pages/client/BookDetailPage';
import { ProfilePage } from '@/pages/client/ProfilePage';
import { EditProfilePage } from '@/pages/client/EditProfilePage';
import { ShareProfilePage } from '@/pages/client/ShareProfilePage';
import { AddBookPage } from '@/pages/client/AddBookPage';
import { FavoritesPage } from '@/pages/client/FavoritesPage';
import { SwapRequestPage } from '@/pages/client/SwapRequestPage';

// Auth pages
import { SignInPage } from '@/pages/auth/SignInPage';
import { SignUpPage } from '@/pages/auth/SignUpPage';

// Admin pages
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';

export const router = createBrowserRouter([
  // ─── Client routes ───────────────────────────────────────
  {
    element: <ClientLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/books', element: <BookCatalogPage /> },
      { path: '/books/:id', element: <BookDetailPage /> },

      // TODO: wrap protected routes with <ProtectedRoute />
      { path: '/books/add', element: <AddBookPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/profile/edit', element: <EditProfilePage /> },
      { path: '/profile/share', element: <ShareProfilePage /> },
      { path: '/profile/:username', element: <ProfilePage /> },
      { path: '/favorites', element: <FavoritesPage /> },
      { path: '/swaps', element: <SwapRequestPage /> },
    ],
  },

  // ─── Auth routes ─────────────────────────────────────────
  {
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
    ],
  },

  // ─── Admin routes (role: admin) ──────────────────────────
  {
    element: <AdminLayout />,
    children: [
      // TODO: wrap with <ProtectedRoute requiredRole="admin" />
      { path: '/admin', element: <AdminDashboardPage /> },
      // Future admin pages: /admin/books, /admin/users, /admin/swaps, /admin/reports
    ],
  },
]);
