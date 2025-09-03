import { Outlet } from 'react-router';

export function MainLayout() {
  return (
    <main className="mt-3 bg-gray-600 rounded-tl-lg p-12">
      <Outlet />
    </main>
  );
}
