import { db } from '../database/connection';
import { Task } from '../../core/domain/entities/task';
import { TaskRepository } from '../../core/repositories/taskRepository';

export class TaskRepositoryImpl implements TaskRepository {

    async save(task: Task): Promise<Task> {
        const newTask = await db.task.create({
            data: {
                title: task.title,
                details: task.details,
                startDate: task.startDate,
                endDate: task.endDate,
                isCompleted: task.isCompleted,
            },
            include: {
                users: true,
            }
        });
        return newTask;
    }

    async update(id: number, task: Task): Promise<Task> {
        const updatedTask = await db.task.update({
            where: { id },
            data: {
                title: task.title,
                details: task.details,
                startDate: task.startDate,
                endDate: task.endDate,
                isCompleted: task.isCompleted,
            },
            include: {
                users: true,
            }
        });
        return updatedTask;
    }

    async findAll(): Promise<Task[]> {
        return await db.task.findMany({
            include: {
                users: true,
            }
        });
    }

    async findById(id: number): Promise<Task | null> {
        return await db.task.findUnique({
            where: { id },
            include: {
                users: true,
            }
        });
    }

    async delete(id: number): Promise<void> {
        await db.userTask.deleteMany({
            where: { task_id: id },
        });
        await db.task.delete({
            where: { id },
        });
    }

    async assignUserToTask(taskId: number, userIds: number[]): Promise<Task> {
        return await db.$transaction(async (db: any) => {
            // 1. Eliminar todos los usuarios previamente asignados a esta tarea
            await db.userTask.deleteMany({
                where: { task_id: taskId }
            });

            // 2. Crear nuevas asignaciones de usuarios a la tarea
            const userOnTaskData = userIds.map((userId) => ({
                task_id: taskId,
                user_id: userId
            }));

            await db.userTask.createMany({
                data: userOnTaskData
            });

            // 3. Retornar la tarea con los nuevos usuarios asignados
            const updatedTask = await db.task.findUnique({
                where: { id: taskId },
                include: { users: true }
            });

            if (!updatedTask) {
                throw new Error('Task not found');
            }

            return updatedTask;
        });
    }
}