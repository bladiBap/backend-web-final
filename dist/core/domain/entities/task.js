"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(id, title, details, startDate, endDate, isCompleted, users) {
        this.id = id;
        this.title = title;
        this.details = details;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isCompleted = isCompleted;
        this.users = users;
    }
}
exports.Task = Task;
