import { Route, Routes } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { Tickets } from '../pages/Tickets';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Tickets />} />
      </Route>
    </Routes>
  );
}
