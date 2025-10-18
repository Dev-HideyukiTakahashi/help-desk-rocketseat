import multer from 'multer';
import uploadConfig from '../config/upload';
import { Router } from 'express';
import { ClientController } from '../controller/client-controller';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { verifyAuthorization } from '../middleware/verify-authorization';

const clientRoutes = Router();
const clientController = new ClientController();

const upload = multer(uploadConfig.MULTER);

// rotas livres
clientRoutes.post('/', clientController.create);

// rotas autenticadas
clientRoutes.use(ensureAuthenticated);
clientRoutes.put(
  '/:id',
  verifyAuthorization(['ADMIN', 'CLIENT']),
  upload.single('file'),
  clientController.update,
);
clientRoutes.get('/', verifyAuthorization(['ADMIN']), clientController.index);
clientRoutes.get('/:id', verifyAuthorization(['ADMIN', 'CLIENT']), clientController.show);
clientRoutes.delete('/:id', verifyAuthorization(['ADMIN']), clientController.delete);
clientRoutes.patch('/:id', verifyAuthorization(['CLIENT']), clientController.updatePassword);

export { clientRoutes };
