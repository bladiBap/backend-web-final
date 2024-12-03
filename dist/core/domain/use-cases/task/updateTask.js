"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTask = void 0;
const task_1 = require("../../entities/task");
class UpdateTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(data) {
        const task = await this.taskRepository.findById(data.idInt);
        if (!task) {
            throw new Error("Task not found");
        }
        const updatedTask = new task_1.Task(task.id, data.title, data.details, data.startDate, data.endDate, data.isCompleted, task.users);
        return await this.taskRepository.update(data.idInt, updatedTask);
    }
}
exports.UpdateTask = UpdateTask;
