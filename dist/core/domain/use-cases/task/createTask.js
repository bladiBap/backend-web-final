"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTask = void 0;
const task_1 = require("../../entities/task");
class CreateTask {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute(data) {
        const newTask = new task_1.Task(
        // generate a random id
        Math.floor(Math.random() * 1000000), data.title, data.details, data.startDate, data.endDate, false, []);
        return await this.taskRepository.save(newTask);
    }
}
exports.CreateTask = CreateTask;
