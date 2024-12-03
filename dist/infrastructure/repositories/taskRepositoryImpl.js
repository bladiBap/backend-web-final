"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepositoryImpl = void 0;
const connection_1 = require("../database/connection");
class TaskRepositoryImpl {
    async save(task) {
        const newTask = await connection_1.db.task.create({
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
    async update(id, task) {
        const updatedTask = await connection_1.db.task.update({
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
    async findAll() {
        return await connection_1.db.task.findMany({
            include: {
                users: true,
            }
        });
    }
    async findById(id) {
        return await connection_1.db.task.findUnique({
            where: { id },
            include: {
                users: true,
            }
        });
    }
    async delete(id) {
        await connection_1.db.task.delete({
            where: { id },
        });
    }
}
exports.TaskRepositoryImpl = TaskRepositoryImpl;
