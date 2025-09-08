import { Router } from 'express';
import { ClientController } from '../controller/client-controller';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { verifyAuthorization } from '../middleware/verify-authorization';

const clientRoutes = Router();
const clientController = new ClientController();

// rotas livres
clientRoutes.post('/', clientController.create);

// rotas autenticadas
clientRoutes.use(ensureAuthenticated);
clientRoutes.put('/:id', verifyAuthorization(['ADMIN', 'CLIENT']), clientController.update);
clientRoutes.get('/', verifyAuthorization(['ADMIN']), clientController.index);
clientRoutes.get('/:id', verifyAuthorization(['ADMIN', 'CLIENT']), clientController.show);

export { clientRoutes };
