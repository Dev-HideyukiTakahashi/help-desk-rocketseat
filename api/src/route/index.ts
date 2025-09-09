import { Router } from 'express';
import { clientRoutes } from './client-routes';
import { serviceRoutes } from './service-routes';
import { sessionRoutes } from './session-routes';
import { technicianRoutes } from './technician-routes';
import { ticketRoutes } from './ticket-routes';

const routes = Router();

//routes
routes.use('/sessions', sessionRoutes);
routes.use('/technicians', technicianRoutes);
routes.use('/clients', clientRoutes);
routes.use('/tickets', ticketRoutes);
routes.use('/services', serviceRoutes);

export { routes };
