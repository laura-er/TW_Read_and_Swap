import { createBrowserRouter } from 'react-router-dom';

import { ClientLayout } from '@/layouts/ClientLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';

import { HomePage } from '@/pages/client/HomePage';
import { BookCatalogPage } from '@/pages/client/BookCatalogPage';
import { BookDetailPage } from '@/pages/client/BookDetailPage';
import { ProfilePage } from '@/pages/client/ProfilePage';
import { EditProfilePage } from '@/pages/client/EditProfilePage';
import { ShareProfilePage } from '@/pages/client/ShareProfilePage';
import { AddBookPage } from '@/pages/client/AddBookPage';
import { FavoritesPage } from '@/pages/client/FavoritesPage';
import { SwapRequestPage } from '@/pages/client/SwapRequestPage';

import { SignInPage } from '@/pages/auth/SignInPage';
import { SignUpPage } from '@/pages/auth/SignUpPage';

import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';

export const router = createBrowserRouter([

  // ─── Client routes ───────────────────────────────────────
  {
    element: <ClientLayout />,
    children: [

      // Publice
      { path: '/', element: <HomePage /> },
      { path: '/books', element: <BookCatalogPage /> },
      { path: '/books/:id', element: <BookDetailPage /> },

      // Protejate — doar utilizatori autentificați
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/books/add', element: <AddBookPage /> },
          { path: '/profile', element: <ProfilePage /> },
          { path: '/profile/edit', element: <EditProfilePage /> },
          { path: '/profile/share', element: <ShareProfilePage /> },
          { path: '/profile/:username', element: <ProfilePage /> },
          { path: '/favorites', element: <FavoritesPage /> },
          { path: '/swaps', element: <SwapRequestPage /> },
        ],
      },
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

  // ─── Admin routes ────────────────────────────────────────
  {
    element: <AdminLayout />,
    children: [
      {
        element: <ProtectedRoute requiredRole="admin" />,
        children: [
          { path: '/admin', element: <AdminDashboardPage /> },
        ],
      },
    ],
  },
]);
