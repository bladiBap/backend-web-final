import { Request, Response } from 'express';
import { MisionRepositoryImpl } from '../../../infrastructure/repositories/mision/misionRepositoryImpl';
import { CreateMision } from '../../../core/domain/use-cases/mision/createMision';
import { UpdateMision } from '../../../core/domain/use-cases/mision/updateMision';
import { DeleteMision } from '../../../core/domain/use-cases/mision/deleteMision';
import { GetMisionById } from '../../../core/domain/use-cases/mision/getMisionById';
import { GetAllMision } from '../../../core/domain/use-cases/mision/getAllMision';

export class MisionController {

    private misionRepository = new MisionRepositoryImpl();

    async getAllMision(req: Request, res: Response): Promise<void> {
        console.log('getAllMision');
        console.log(this.misionRepository);
        const misionClass = new GetAllMision(this.misionRepository);
        const misiones = await misionClass.execute();
        res.json(misiones);
    }

    async getMisionById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const misionClass = new GetMisionById(this.misionRepository);
        const mision = await misionClass.execute(idInt);
        if (!mision) {
            res.status(404).json({ message: 'Mision not found' });
            return;
        }
        res.json(mision);
    }

    async createMision(req: Request, res: Response): Promise<void> {
        const { nombre, descripcion, objetivo, por_puntos, recompensa, fk_powerup } = req.body;
        if (!nombre || !descripcion || !objetivo || por_puntos === null || por_puntos === undefined || !recompensa || !fk_powerup) {
            res.status(400).json({ message: 'Los campos nombre, descripcion, objetivo, por_puntos, recompensa y fk_powerup son requeridos.' });
            return;
        }
        const createMision = new CreateMision(this.misionRepository);
        const mision = await createMision.execute({ nombre, descripcion, objetivo, por_puntos, recompensa, fk_powerup });
        res.json(mision);
    }

    async updateMision(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const misionClass = new GetMisionById(this.misionRepository);
        const mision = await misionClass.execute(idInt);
        if (!mision) {
            res.status(404).json({ message: 'Mision not found' });
            return;
        }
        const { nombre, descripcion, objetivo, por_puntos, recompensa, fk_powerup } = req.body;
        if (!nombre || !descripcion || !objetivo || por_puntos === null || por_puntos === undefined || !recompensa || !fk_powerup) {
            res.status(400).json({ message: 'Los campos nombre, descripcion, objetivo, por_puntos, recompensa y fk_powerup son requeridos.' });
            return;
        }
        const updateMision = new UpdateMision(this.misionRepository);
        const updatedMision = await updateMision.execute({ idInt, nombre, descripcion, objetivo, por_puntos, recompensa, fk_powerup });
        res.json(updatedMision);
    }

    async deleteSoftMision(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const idInt = Number(id);
        const misionClass = new GetMisionById(this.misionRepository);
        const mision = await misionClass.execute(idInt);
        if (!mision) {
            res.status(404).json({ message: 'Mision not found' });
            return;
        }
        const deleteMision = new DeleteMision(this.misionRepository);
        await deleteMision.executeSoft(idInt);
        res.json({ message: 'Mision deleted successfully' });
    }

    // async getAllTasks(req: Request, res: Response): Promise<void> {
    //     const tasks = await this.taskRepository.findAll();
    //     res.json(tasks);
    // }

    // async createTask(req: Request, res: Response): Promise<void> {
    //     const { title, details, startDate, endDate, isCompleted } = req.body;
    //     if (!title || title.trim() === '') {
    //         res.status(400).json({ message: 'El título no puede estar vacío.' });
    //         return;
    //     }
    //     const start = new Date(startDate);
    //     const end = new Date(endDate);

    //     if (start > end) {
    //         res.status(400).json({ message: 'La fecha de inicio no puede ser mayor que la fecha de finalización.' });
    //         return;
    //     }
    //     const createTask = new CreateTask(this.taskRepository);
    //     const task = await createTask.execute({ title, details, startDate, endDate, isCompleted });
    //     res.json(task);
    // }

    // async getTaskById(req: Request, res: Response): Promise<void> {
    //     const { id } = req.params;
    //     const task = await this.taskRepository.findById(Number(id));
    //     if (!task) {
    //         res.status(404).json({ message: 'Task not found' });
    //         return;
    //     }
    //     res.json(task);
    // }

    // async updateTask(req: Request, res: Response): Promise<void> {
    //     const { id } = req.params;
    //     const idInt = Number(id);
    //     const task = await this.taskRepository.findById(Number(id));
    //     if (!task) {
    //         res.status(404).json({ message: 'Task not found' });
    //         return;
    //     }
    //     const { title, details, startDate, endDate, isCompleted } = req.body;
    //     if (!title || title.trim() === '') {
    //         res.status(400).json({ message: 'El título no puede estar vacío.' });
    //         return;
    //     }
    //     const start = new Date(startDate);
    //     const end = new Date(endDate);

    //     if (start > end) {
    //         res.status(400).json({ message: 'La fecha de inicio no puede ser mayor que la fecha de finalización.' });
    //         return;
    //     }
    //     const updateTask = new UpdateTask(this.taskRepository);
    //     const updatedTask = await updateTask.execute({ idInt, title, details, startDate, endDate, isCompleted });
    //     res.json(updatedTask);
    // }

    // async deleteTask(req: Request, res: Response): Promise<void> {
    //     const { id } = req.params;
    //     const idInt = Number(id);
    //     const task = await this.taskRepository.findById(Number(id));

    //     if (!task) {
    //         res.status(404).json({ message: 'Task not found' });
    //         return;
    //     }

    //     const deleteTask = new DeleteTask(this.taskRepository);
    //     await deleteTask.execute(idInt);
    //     res.json({ message: 'Task deleted successfully' });
    // }

    // async markTaskAsCompleted(req: Request, res: Response): Promise<void> {
    //     const { id } = req.params;
    //     const idInt = Number(id);
    //     const task = await this.taskRepository.findById(Number(id));

    //     if (!task) {
    //         res.status(404).json({ message: 'Task not found' });
    //         return;
    //     }

    //     const updateTask = new UpdateTask(this.taskRepository);
    //     const updatedTask = await updateTask.execute({ idInt, ...task, isCompleted: true });
    //     res.json(updatedTask);
    // }

    // async assignUserToTask(req: Request, res: Response): Promise<void> {
    //     const { taskId, userIds } = req.body;
    //     const task = await this.taskRepository.findById(taskId);

    //     if (!task) {
    //         res.status(404).json({ message: 'Task not found' });
    //         return;
    //     }
    //     try {
    //         const assignTask = new AssignUserToTask(this.taskRepository);
    //         const updatedTask = await assignTask.execute(taskId, userIds);
    //         res.json(updatedTask);
    //     } catch (e) {
    //         res.status(500).json({ message: 'Internal server error' });
    //     }
    // }
}