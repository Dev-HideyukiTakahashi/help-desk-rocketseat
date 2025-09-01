import { Router } from 'express';
import { TechnicianController } from '../controller/technician-controller';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { verifyAuthorization } from '../middleware/verify-authorization';

const technicianRoutes = Router();
const technicianController = new TechnicianController();

// middlewares
technicianRoutes.use(ensureAuthenticated);
technicianRoutes.use(verifyAuthorization(['ADMIN']));

// routes
technicianRoutes.post('/', technicianController.create);

export { technicianRoutes };
