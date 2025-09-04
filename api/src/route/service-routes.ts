import { Router } from 'express';
import { ServiceController } from '../controller/service-controller';

const serviceRoutes = Router();
const serviceController = new ServiceController();

serviceRoutes.get('/', serviceController.index);
serviceRoutes.post('/', serviceController.create);
serviceRoutes.put('/:id', serviceController.update);

export { serviceRoutes };
