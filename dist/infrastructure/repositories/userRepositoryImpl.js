"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
const connection_1 = require("../database/connection");
class UserRepositoryImpl {
    async save(user) {
        const newUser = await connection_1.db.user.create({
            data: {
                name: user.name,
                lastname: user.lastname,
                phone: user.phone,
                email: user.email,
                password: user.password,
                dateOfBirth: user.dateOfBirth,
            },
            include: {
                tasks: true,
            }
        });
        return newUser;
    }
    async update(id, user) {
        const updatedUser = await connection_1.db.user.update({
            where: { id },
            data: {
                name: user.name,
                lastname: user.lastname,
                phone: user.phone,
                email: user.email,
                password: user.password,
                dateOfBirth: user.dateOfBirth,
            },
            include: {
                tasks: true,
            }
        });
        return updatedUser;
    }
    async findAll() {
        return await connection_1.db.user.findMany({
            include: {
                tasks: true,
            },
        });
    }
    async findById(id) {
        return await connection_1.db.user.findUnique({
            where: { id },
            include: {
                tasks: true,
            },
        });
    }
    async delete(id) {
        await connection_1.db.user.delete({
            where: { id },
        });
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
