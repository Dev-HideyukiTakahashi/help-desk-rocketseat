import { Route, Routes } from 'react-router';
import { ClientDashboard } from '../pages/ClientDashboard';

export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ClientDashboard />} />
    </Routes>
  );
}
