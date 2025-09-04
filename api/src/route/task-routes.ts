import { Router } from 'express';
import { TaskController } from '../controller/task-controller';

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post('/', taskController.create);

export { taskRoutes };
