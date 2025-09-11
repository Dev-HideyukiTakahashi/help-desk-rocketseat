import { Route, Routes } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { NotFound } from '../pages/NotFound';
import { Ticket } from '../pages/Ticket';
import { TicketDetails } from '../pages/TicketDetails';

export function TechnicianRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Ticket />} />
        <Route path="/ticket" element={<TicketDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
