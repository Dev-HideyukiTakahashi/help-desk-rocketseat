import { Outlet } from 'react-router';

export function MainLayout() {
  return (
    <main className="mt-3 min-h-screen md:h-auto bg-gray-600 rounded-t-lg md:rounded-tl-lg p-12 px-5">
      <Outlet />
    </main>
  );
}
