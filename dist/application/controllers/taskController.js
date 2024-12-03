"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const taskRepositoryImpl_1 = require("../../infrastructure/repositories/taskRepositoryImpl");
const createTask_1 = require("../../core/domain/use-cases/task/createTask");
const updateTask_1 = require("../../core/domain/use-cases/task/updateTask");
const deleteTask_1 = require("../../core/domain/use-cases/task/deleteTask");
class TaskController {
    constructor() {
        this.taskRepository = new taskRepositoryImpl_1.TaskRepositoryImpl();
    }
    async getAllTasks(req, res) {
        const tasks = await this.taskRepository.findAll();
        res.json(tasks);
    }
    async createTask(req, res) {
        const { title, details, startDate, endDate } = req.body;
        const createTask = new createTask_1.CreateTask(this.taskRepository);
        const task = await createTask.execute({ title, details, startDate, endDate });
        res.json(task);
    }
    async getTaskById(req, res) {
        const { id } = req.params;
        const task = await this.taskRepository.findById(Number(id));
        res.json(task);
    }
    async updateTask(req, res) {
        const { id } = req.params;
        const idInt = Number(id);
        const { title, details, startDate, endDate, isCompleted } = req.body;
        const updateTask = new updateTask_1.UpdateTask(this.taskRepository);
        const updatedTask = await updateTask.execute({ idInt, title, details, startDate, endDate, isCompleted });
        res.json(updatedTask);
    }
    async deleteTask(req, res) {
        const { id } = req.params;
        const idInt = Number(id);
        const deleteTask = new deleteTask_1.DeleteTask(this.taskRepository);
        await deleteTask.execute(idInt);
        res.json({ message: 'Task deleted successfully' });
    }
}
exports.TaskController = TaskController;
