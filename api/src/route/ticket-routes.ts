import { Router } from 'express';
import { TicketController } from '../controller/ticket-controller';
import { ensureAuthenticated } from '../middleware/ensure-authenticated';
import { verifyAuthorization } from '../middleware/verify-authorization';

const ticketRoutes = Router();
const ticketController = new TicketController();

// midlewares
ticketRoutes.use(ensureAuthenticated);

ticketRoutes.post('/', verifyAuthorization(['CLIENT']), ticketController.create);
ticketRoutes.get('/', ticketController.index);
ticketRoutes.patch('/:id', ticketController.updateStatus);

export { ticketRoutes };
