import { TaskRepository } from "../../../repositories/taskRepository";
import { Task } from "../../entities/task";

export class CreateTask {
    constructor(private taskRepository: TaskRepository) { }

    async execute(data: { title: string; details: string; startDate: Date; endDate: Date, isCompleted : boolean }): Promise<Task> {
        const newTask = new Task(
            data.title,
            data.details,
            data.startDate,
            data.endDate,
            data.isCompleted,
            []
        );
        return await this.taskRepository.save(newTask);
    }
}