import { TaskRepository } from "../../../repositories/taskRepository";
import { Task } from "../../entities/task";

export class AssignUserToTask {
    constructor(private taskRepository: TaskRepository) { }

    async execute(taskId: string, userId: number[]): Promise<Task> {
        return await this.taskRepository.assignUserToTask(Number(taskId), userId);
    }
}
