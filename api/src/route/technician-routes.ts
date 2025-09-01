import { Router } from 'express';
import { TechnicianController } from '../controller/technician-controller';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';

const technicianRoutes = Router();
const technicianController = new TechnicianController();

// middlewares
technicianRoutes.use(ensureAuthenticated);

// routes
technicianRoutes.post('/', technicianController.create);

export { technicianRoutes };
