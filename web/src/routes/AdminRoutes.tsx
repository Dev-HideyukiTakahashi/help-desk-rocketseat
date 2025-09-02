import { Route, Routes } from 'react-router';
import { AdminDashboard } from '../pages/AdminDashboard';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
    </Routes>
  );
}
