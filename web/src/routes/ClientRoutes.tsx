import { Route, Routes } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { AddTicket } from '../pages/AddTicket';
import { NotFound } from '../pages/NotFound';
import { Ticket } from '../pages/Ticket';
import { TicketDetails } from '../pages/TicketDetails';

export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Ticket />} />
        <Route path="/ticket/new" element={<AddTicket />} />
        <Route path="/ticket" element={<TicketDetails />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
