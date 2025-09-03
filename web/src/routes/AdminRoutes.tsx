import { Route, Routes } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { Client } from '../pages/admin/Client';
import { Service } from '../pages/admin/Service';
import { Technician } from '../pages/admin/Technician';
import { NotFound } from '../pages/NotFound';
import { Ticket } from '../pages/Ticket';

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Ticket />} />
        <Route path="/technicians" element={<Technician />} />
        <Route path="/clients" element={<Client />} />
        <Route path="/services" element={<Service />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
