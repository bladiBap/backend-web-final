import { UserRepository } from "../../../repositories/userRepository";
import { User } from "../../entities/user";

export class UpdateUser {
    constructor(private userRepository: UserRepository) { }

    async execute(data: { idInt: number, name: string; lastname: string; phone: string; email: string, password: string, dateOfBirth: Date }): Promise<User> {
        const user = await this.userRepository.findById(data.idInt);
        if (!user) {
            throw new Error("User not found");
        }
        const updatedUser = new User(
            data.name,
            data.lastname,
            data.phone,
            data.email,
            data.password,
            data.dateOfBirth,
            user.tasks,
            user.id
        );
        return await this.userRepository.update(data.idInt, updatedUser);
    }
}