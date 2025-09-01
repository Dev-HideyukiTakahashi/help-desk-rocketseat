import { Router } from 'express';
import { sessionRoutes } from './session-routes';

const routes = Router();
routes.use('/sessions', sessionRoutes);

export { routes };
