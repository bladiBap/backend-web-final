import { UserRepository } from "../../../repositories/userRepository";

export class DeleteUser {
    constructor(private userRepository: UserRepository) { }

    async execute(id: number): Promise<void> {
        return await this.userRepository.delete(id);
    }
}