import { User } from '../../core/domain/entities/user';
import { UserRepository } from '../../core/repositories/userRepository';
import { db } from '../database/connection';

export class UserRepositoryImpl implements UserRepository {
    async save(user: User): Promise<User> {
        const newUser = await db.user.create({
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

    async update(id: number, user: User): Promise<User> {
        const updatedUser = await db.user.update({
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

    async findAll(): Promise<User[]> {
        return await db.user.findMany({
            include: {
                tasks: true,
            },
        });
    }

    async findById(id: number): Promise<User | null> {
        return await db.user.findUnique({
            where: { id },
            include: {
                tasks: true,
            },
        });
    }

    async delete(id: number): Promise<void> {
        await db.userTask.deleteMany({
            where: { user_id: id },
        });
        await db.user.delete({
            where: { id },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await db.user.findUnique({
            where: { email },
            include: {
                tasks: true
            }
        })
    }
}