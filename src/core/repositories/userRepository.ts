import { User } from "../domain/entities/user";

export interface UserRepository {
    save(user: User): Promise<User>;
    update(id: number, user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    delete(id: number): Promise<void>;
}