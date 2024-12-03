"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const user_1 = require("../../entities/user");
class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const newUser = new user_1.User(Math.floor(Math.random() * 1000000), data.name, data.lastname, data.phone, data.email, data.password, data.dateOfBirth, []);
        return await this.userRepository.save(newUser);
    }
}
exports.CreateUser = CreateUser;
