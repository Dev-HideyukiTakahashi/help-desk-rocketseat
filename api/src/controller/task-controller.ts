import { Request, Response } from 'express';
import { TaskService } from '../service/task-service';

const taskService = new TaskService();

export class TaskController {
  async create(request: Request, response: Response) {
    const payload = await taskService.create();
    return response.json(payload);
  }
}
