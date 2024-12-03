"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("../application/controllers/taskController");
const userController_1 = require("../application/controllers/userController");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middlewares
app.use(express_1.default.json());
// Routes
const taskController = new taskController_1.TaskController();
const userController = new userController_1.UserController();
// Routes for tasks
app.get('/api/tasks', (req, res) => taskController.getAllTasks(req, res));
app.post('/api/tasks', (req, res) => taskController.createTask(req, res));
app.get('/api/tasks/:id', (req, res) => taskController.getTaskById(req, res));
app.put('/api/tasks/:id', (req, res) => taskController.updateTask(req, res));
app.delete('/api/tasks/:id', (req, res) => taskController.deleteTask(req, res));
// Routes for users
app.get('/api/users', (req, res) => userController.getAllUsers(req, res));
app.post('/api/users', (req, res) => userController.createUser(req, res));
app.get('/api/users/:id', (req, res) => userController.getUserById(req, res));
app.put('/api/users/:id', (req, res) => userController.updateUser(req, res));
app.delete('/api/users/:id', (req, res) => userController.deleteUser(req, res));
// Server setup
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// app.listen(process.env.PORT || 4000);
console.log("Server on port", process.env.PORT || 4000);
exports.default = app;
