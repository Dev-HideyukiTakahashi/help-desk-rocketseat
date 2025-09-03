import { BrowserRouter } from 'react-router';
import { Loading } from '../components/Loading';
import { useAuth } from '../hooks/useAuth';
import { AdminRoutes } from './AdminRoutes';
import { AuthRoutes } from './AuthRoutes';
import { ClientRoutes } from './ClientRoutes';
import { TechnicianRoutes } from './TechnicianRoutes';

export function Routes() {
  const { session, isLoading } = useAuth();

  function Route() {
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
