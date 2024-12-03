import { UserRepository } from "../../../repositories/userRepository";
import { User } from "../../entities/user";

export class CreateUser {
    constructor(private userRepository: UserRepository) { }

    async execute(data: { name: string; lastname: string; phone: string; email: string, password: string, dateOfBirth: Date }): Promise<User> {
        const newUser = new User(
            data.name,
            data.lastname,
            data.phone,
            data.email,
            data.password,
            data.dateOfBirth,
            []
        );
        return await this.userRepository.save(newUser);
    }
}