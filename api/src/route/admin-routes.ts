import { Router } from 'express';
import { verifyAuthorization } from '../middleware/verify-authorization';
import { AdminController } from '../controller/admin-controller';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';

const adminRoutes = Router();
const adminController = new AdminController();

adminRoutes.use(ensureAuthenticated);

adminRoutes.put('/:id/technician', verifyAuthorization(['ADMIN']), adminController.update);

export { adminRoutes };
