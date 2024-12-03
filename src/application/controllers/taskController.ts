import { Request, Response } from 'express';
import { TaskRepositoryImpl } from '../../infrastructure/repositories/taskRepositoryImpl';
import { CreateTask } from '../../core/domain/use-cases/task/createTask';
import { UpdateTask } from '../../core/domain/use-cases/task/updateTask';
import { DeleteTask } from '../../core/domain/use-cases/task/deleteTask';
import { UserRepositoryImpl } from '../../infrastructure/repositories/userRepositoryImpl';
import { AssignUserToTask } from '../../core/domain/use-cases/task/assignUserToTask';

export class TaskController {

    private taskRepository = new TaskRepositoryImpl();

    async getAllTasks(req: Request, res: Response): Promise<void> {
        const tasks = await this.taskRepository.findAll();
        res.json(tasks);
    }

    async createTask(req: Request, res: Response): Promise<void> {
        const { title, details, startDate, endDate, isCompleted } = req.body;
        if (!title || title.trim() === '') {
            res.status(400).json({ message: 'El título no puede estar vacío.' });
            return;
        }
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            res.status(400).json({ message: 'La fecha de inicio no puede ser mayor que la fecha de finalización.' });
            return;
        }
        const createTask = new CreateTask(this.taskRepository);
        const task = await createTask.execute({ title, details, startDate, endDate, isCompleted });
        res.json(task);
    }

    async getTaskById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const task = await this.taskRepository.findById(Number(id));
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.json(task);
    }

    async updateTask(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const task = await this.taskRepository.findById(Number(id));
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        const { title, details, startDate, endDate, isCompleted } = req.body;
        if (!title || title.trim() === '') {
            res.status(400).json({ message: 'El título no puede estar vacío.' });
            return;
        }
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            res.status(400).json({ message: 'La fecha de inicio no puede ser mayor que la fecha de finalización.' });
            return;
        }
        const updateTask = new UpdateTask(this.taskRepository);
        const updatedTask = await updateTask.execute({ idInt, title, details, startDate, endDate, isCompleted });
        res.json(updatedTask);
    }

    async deleteTask(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const task = await this.taskRepository.findById(Number(id));

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        const deleteTask = new DeleteTask(this.taskRepository);
        await deleteTask.execute(idInt);
        res.json({ message: 'Task deleted successfully' });
    }

    async markTaskAsCompleted(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const task = await this.taskRepository.findById(Number(id));

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        const updateTask = new UpdateTask(this.taskRepository);
        const updatedTask = await updateTask.execute({ idInt, ...task, isCompleted: true });
        res.json(updatedTask);
    }

    async assignUserToTask(req: Request, res: Response): Promise<void> {
        const { taskId, userIds } = req.body;
        const task = await this.taskRepository.findById(taskId);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        try {
            const assignTask = new AssignUserToTask(this.taskRepository);
            const updatedTask = await assignTask.execute(taskId, userIds);
            res.json(updatedTask);
        } catch (e) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}