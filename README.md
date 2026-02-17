# Read & Swap — Frontend

Book-swapping platform built with React 19 + Vite + TypeScript + Tailwind CSS v4.

## Tech Stack

- **React 19** + **Vite 6**
- **TypeScript 5**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **React Router v7**

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── app/            # Router, App root, main entry
├── layouts/        # ClientLayout, AdminLayout, AuthLayout
├── pages/
│   ├── client/     # All user-facing pages
│   ├── auth/       # Sign in, Sign up
│   └── admin/      # Admin dashboard & future admin pages
├── components/
│   ├── ui/         # Generic primitives (Button, Input, Card, Badge, Avatar, Modal)
│   ├── client/     # Client-specific components (Navbar, BookCard, ReviewCard, SwapRequestCard)
│   └── admin/      # Admin-specific components (Sidebar, AdminBookRow)
├── context/        # AuthContext, ThemeContext
├── hooks/          # useAuth, useBooks, useSwapRequests
├── types/          # TypeScript interfaces (Book, User, SwapRequest)
└── utils/          # formatDate helpers
```

## Routes

| Path | Layout | Page |
|------|--------|------|
| `/` | Client | HomePage |
| `/books` | Client | BookCatalogPage |
| `/books/:id` | Client | BookDetailPage |
| `/books/add` | Client | AddBookPage *(auth required)* |
| `/profile` | Client | ProfilePage *(auth required)* |
| `/profile/edit` | Client | EditProfilePage *(auth required)* |
| `/profile/share` | Client | ShareProfilePage *(auth required)* |
| `/profile/:username` | Client | ProfilePage (public) |
| `/favorites` | Client | FavoritesPage *(auth required)* |
| `/swaps` | Client | SwapRequestPage *(auth required)* |
| `/sign-in` | Auth | SignInPage |
| `/sign-up` | Auth | SignUpPage |
| `/admin` | Admin | AdminDashboardPage *(admin role required)* |

## Theme

Two themes (light/dark) via CSS variables on `:root` and `.dark` class on `<html>`.
Toggle is available in Navbar (client) and Sidebar (admin).
Preference is persisted in `localStorage`.

## Next Steps

- Implement `ProtectedRoute` component for auth-gated and role-gated routes
- Connect hooks (`useBooks`, `useSwapRequests`, `useAuth`) to your API
- Add React Query or SWR for server state management
- Build out page content using existing component primitives
