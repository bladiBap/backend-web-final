import express from "express";

import { TaskController } from "../application/controllers/taskController";
import { UserController } from "../application/controllers/userController";
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());


// Routes
const taskController = new TaskController();
const userController = new UserController();

// Routes for tasks
app.get('/api/tasks', (req, res) => taskController.getAllTasks(req, res));
app.post('/api/tasks', (req, res) => taskController.createTask(req, res));
app.get('/api/tasks/:id', (req, res) => taskController.getTaskById(req, res));
app.put('/api/tasks/:id', (req, res) => taskController.updateTask(req, res));
app.delete('/api/tasks/:id', (req, res) => taskController.deleteTask(req, res));
app.post('/api/tasks/assign', (req, res) => taskController.assignUserToTask(req, res));

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

console.log("Server on port", process.env.PORT || 4000);

export default app;