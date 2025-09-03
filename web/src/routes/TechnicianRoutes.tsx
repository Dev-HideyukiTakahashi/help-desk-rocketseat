import { Route, Routes } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { NotFound } from '../pages/NotFound';
import { Ticket } from '../pages/Ticket';

export function TechnicianRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Ticket />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
