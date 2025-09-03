import { Route, Routes } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { AddTicket } from '../pages/AddTicket';
import { NotFound } from '../pages/NotFound';
import { Ticket } from '../pages/Ticket';

export function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Ticket />} />
        <Route path="/tickets" element={<AddTicket />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
