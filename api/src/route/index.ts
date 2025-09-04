import { Router } from 'express';
import { clientRoutes } from './client-routes';
import { serviceRoutes } from './service-routes';
import { sessionRoutes } from './session-routes';
import { taskRoutes } from './task-routes';
import { technicianRoutes } from './technician-routes';

const routes = Router();

//routes
routes.use('/sessions', sessionRoutes);
routes.use('/technicians', technicianRoutes);
routes.use('/clients', clientRoutes);
routes.use('/tasks', taskRoutes);
routes.use('/services', serviceRoutes);

export { routes };
