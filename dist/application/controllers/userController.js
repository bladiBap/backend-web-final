"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userRepositoryImpl_1 = require("../../infrastructure/repositories/userRepositoryImpl");
const createUser_1 = require("../../core/domain/use-cases/user/createUser");
const updateUser_1 = require("../../core/domain/use-cases/user/updateUser");
const deleteUser_1 = require("../../core/domain/use-cases/user/deleteUser");
class UserController {
    constructor() {
        this.userRepository = new userRepositoryImpl_1.UserRepositoryImpl();
    }
    async getAllUsers(req, res) {
        const users = await this.userRepository.findAll();
        res.json(users);
    }
    async createUser(req, res) {
        const { name, lastname, phone, email, password, dateOfBirth } = req.body;
        const createUser = new createUser_1.CreateUser(this.userRepository);
        const user = await createUser.execute({ name, lastname, phone, email, password, dateOfBirth });
        res.json(user);
    }
    async getUserById(req, res) {
        const { id } = req.params;
        const user = await this.userRepository.findById(Number(id));
        res.json(user);
    }
    async updateUser(req, res) {
        const { id } = req.params;
        const idInt = Number(id);
        const { name, lastname, phone, email, password, dateOfBirth } = req.body;
        const updateUser = new updateUser_1.UpdateUser(this.userRepository);
        const updatedUser = await updateUser.execute({ idInt, name, lastname, phone, email, password, dateOfBirth });
        res.json(updatedUser);
    }
    async deleteUser(req, res) {
        const { id } = req.params;
        const idInt = Number(id);
        const deleteUser = new deleteUser_1.DeleteUser(this.userRepository);
        await deleteUser.execute(idInt);
        res.json({ message: 'User deleted successfully' });
    }
}
exports.UserController = UserController;
