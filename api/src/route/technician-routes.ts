import { Router } from 'express';
import { TechnicianController } from '../controller/technician-controller';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { verifyAuthorization } from '../middleware/verify-authorization';

const technicianRoutes = Router();
const technicianController = new TechnicianController();

// middlewares
technicianRoutes.use(ensureAuthenticated);

// routes
technicianRoutes.get('/', verifyAuthorization(['ADMIN']), technicianController.index);
technicianRoutes.post('/', verifyAuthorization(['ADMIN']), technicianController.create);
technicianRoutes.put('/:id', verifyAuthorization(['TECHNICIAN']), technicianController.update);
technicianRoutes.get('/:id', verifyAuthorization(['TECHNICIAN']), technicianController.show);
technicianRoutes.patch(
  '/:id',
  verifyAuthorization(['TECHNICIAN']),
  technicianController.updatePassword,
);

export { technicianRoutes };
