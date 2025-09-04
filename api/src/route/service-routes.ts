import { Router } from 'express';
import { ServiceController } from '../controller/service-controller';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { verifyAuthorization } from '../middleware/verify-authorization';

const serviceRoutes = Router();
const serviceController = new ServiceController();

// middlewares
serviceRoutes.use(ensureAuthenticated);

// routes
serviceRoutes.get('/', serviceController.index);
serviceRoutes.post('/', verifyAuthorization(['ADMIN']), serviceController.create);
serviceRoutes.put('/:id', verifyAuthorization(['ADMIN']), serviceController.update);

export { serviceRoutes };
