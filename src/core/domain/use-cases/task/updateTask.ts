import { TaskRepository } from "../../../repositories/taskRepository";
import { Task } from "../../entities/task";

export class UpdateTask {
    constructor(private taskRepository: TaskRepository) { }

    async execute(data: { idInt: number; title: string; details: string; startDate: Date; endDate: Date; isCompleted: boolean }): Promise<Task> {
        const task = await this.taskRepository.findById(data.idInt);
        if (!task) {
            throw new Error("Task not found");
        }
        const updatedTask = new Task(
            data.title,
            data.details,
            data.startDate,
            data.endDate,
            data.isCompleted,
            task.users,
            task.id
        );
        return await this.taskRepository.update(data.idInt, updatedTask);
    }
}