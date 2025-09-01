import { Router } from 'express';
import { sessionRoutes } from './session-routes';
import { technicianRoutes } from './technician-routes';

const routes = Router();

//routes
routes.use('/sessions', sessionRoutes);
routes.use('/technicians', technicianRoutes);

export { routes };
