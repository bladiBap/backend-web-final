import { TaskRepository } from "../../../repositories/taskRepository";

export class DeleteTask {
    constructor(private taskRepository: TaskRepository) { }

    async execute(id: number): Promise<void> {
        return await this.taskRepository.delete(id);
    }
}