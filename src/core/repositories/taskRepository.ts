import { Task } from "../domain/entities/task";

export interface TaskRepository {
    save(task: Task): Promise<Task>;
    update(id: number, task: Task): Promise<Task>;
    findAll(): Promise<Task[]>;
    findById(id: number): Promise<Task | null>;
    delete(id: number): Promise<void>;
    assignUserToTask(taskId: number, userIds: number[]): Promise<Task>;
}