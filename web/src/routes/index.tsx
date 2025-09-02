import { BrowserRouter } from 'react-router';
import { AuthRoutes } from './AuthRoutes';

export function Routes() {
  function Route() {
    return <AuthRoutes />;
  }

  return (
    <BrowserRouter>
      <Route />
    </BrowserRouter>
  );
}
