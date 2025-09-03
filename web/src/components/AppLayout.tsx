import { MainLayout } from './MainLayout';
import { SidebarLayout } from './SidebarLayout';

export function AppLayout() {
  return (
    <div className="grid grid-cols-[200px_1fr] w-full min-h-screen bg-gray-100">
      <SidebarLayout />
      <MainLayout />
    </div>
  );
}
