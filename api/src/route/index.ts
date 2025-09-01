import { Router } from 'express';
import { clientRoutes } from './client-routes';
import { sessionRoutes } from './session-routes';
import { technicianRoutes } from './technician-routes';

const routes = Router();

//routes
routes.use('/sessions', sessionRoutes);
routes.use('/technicians', technicianRoutes);
routes.use('/clients', clientRoutes);

export { routes };
