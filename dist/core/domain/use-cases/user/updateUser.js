"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
const user_1 = require("../../entities/user");
class UpdateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const user = await this.userRepository.findById(data.idInt);
        if (!user) {
            throw new Error("User not found");
        }
        const updatedUser = new user_1.User(user.id, data.name, data.lastname, data.phone, data.email, data.password, data.dateOfBirth, user.tasks);
        return await this.userRepository.update(data.idInt, updatedUser);
    }
}
exports.UpdateUser = UpdateUser;
