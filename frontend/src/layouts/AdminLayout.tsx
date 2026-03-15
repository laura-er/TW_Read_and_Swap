import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/admin/Sidebar';

// TODO: Wrap with ProtectedRoute that checks user.role === 'admin'
export function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-[var(--color-bg)]">
      <Sidebar />
      <div className="flex-1 pl-60">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
