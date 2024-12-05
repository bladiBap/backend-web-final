import { PowerUpRepository } from "../../../repositories/powerup/powerupRepository";

export class DeletePowerup {
    constructor(
        private powerupRepository: PowerUpRepository
    ) { }

    async execute(
        id: number
    ): Promise<void> {
        return await this.powerupRepository.delete(id);
    }
}