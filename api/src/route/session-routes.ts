import { Router } from 'express';
import { SessionController } from '../controller/session-controller';

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post('/', sessionController.login);

export { sessionRoutes };
