"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTask = void 0;
// model UserTask {
//     user      User   @relation(fields: [user_id], references: [id])
//     task      Task  @relation(fields: [task_id], references: [id])
//     user_id   Int
//     task_id   Int
//     @@id([user_id, task_id])
//   }
class UserTask {
    constructor(user, task) {
        this.user = user;
        this.task = task;
    }
}
exports.UserTask = UserTask;
