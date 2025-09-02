import { BrowserRouter } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { AdminRoutes } from './AdminRoutes';
import { AuthRoutes } from './AuthRoutes';
import { ClientRoutes } from './ClientRoutes';
import { TechnicianRoutes } from './TechnicianRoutes';

export function Routes() {
  function Route() {
    const { session, isLoading } = useAuth();
    switch (session?.user.role) {
      case 'ADMIN':
        return <AdminRoutes />;
      case 'CLIENT':
        return <ClientRoutes />;
      case 'TECHNICIAN':
        return <TechnicianRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
